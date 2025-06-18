<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS 인증 확인
* @ 페이지설명 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS인증 완료 확인
* @ 파일명     : src/views/page/CO/AR/COAR4024/COAR4024.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-04-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-04-03              CS540685                 상호금융 NH콕마이데이터 4.0 추진 개발
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>PASS인증</h1>
			<a href="javascript:void(0);" role="button" class="btn_back" @click.prevent="fn_close()"><span class="blind">이전화면</span></a>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="custom_box custom_box_shadow border_no border_top_none mt-3">
					<strong class="com_pop_tit01 custom">
						인증 요청을 보냈어요<br/>
						<em class="num">PASS</em> 앱에서 인증해 주세요
					</strong>
				</div>
				<div class="custom_box custom_box7">
					<div class="bg_com_img01">
						<div class="custom_box_shadow custom_box_shadow_01">
							인증 유효시간 <em class="num">{{timeoutCount}}</em>
						</div>
					</div>
				</div>
				<div class="custom_box">
					<div class="titbox_type01 style_up mt0">
						<strong class="com_box_tit01">PASS 인증 요청이 안 왔나요?</strong>
					</div>
					<ul class="bl_dot_list one_register_list mt12">
						<li>
							<em class="num">PASS</em> 앱 실행 후 홈 화면 또는 인증서 화면에서 요청 
							내용을 확인 할 수 있습니다.
						</li>
						<li>
							<em class="num">PASS</em> 앱 알림 수신 동의가 되어 있는지 확인해 주세요.
						</li>
						<li>
							<em class="num">PASS</em> 인증서 고객센터 <strong class="num txt_black">1800-4273</strong>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="com_btnhalfbox_type02">
				<a href="javascript:void(0);" role="button" class="btn btn_grey" aria-disabled="false" @click.prevent="fn_reOAuthReq()">인증 재요청</a>
                <a href="javascript:void(0);" role="button" class="btn btn_mint" aria-disabled="false" @click.prevent="fn_oAuthConfirmPass()">인증 확인</a>
				<!-- btn_off 제거시 활성화 -->
			</div>
		</div>
		<a href="javascript:void(0);" role="button" class="btn_close" @click="fn_close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import appService from '@/service/appService'

import COAR4007 from '@/views/page/CO/AR/COAR4007/COAR4007'
import COAR2025 from '@/views/page/CO/AR/COAR2025/COAR2025'
import COAR2026 from '@/views/page/CO/AR/COAR2026/COAR2026'
import _ from 'lodash'

export default {
    name : "COAR4024",
    data: () => {
        return {
            consentList: [],
            endDate: "",

            status                      : "",    // 안드로이드 앱: 3 아이폰 앱: 5
            timeoutCount    : "",
            phoneHeader     : "",
            clearIntervalTimeOut : null,
            sessionTimerAuthor          : null,

            return_app_scheme_url       : "",
            sign_app_scheme             : "",
            rsp_code                    : "",   // 세부 응답코드
            rsp_msg                     : "",   // 세부 응답메시지
            cert_tx_id                  : "",   // 인증기관 트랜잭션 ID
            sign_tx_id                  : "",   // 

            resCode: "00000",
            isSuccess: false,

            isLocal : window.location.host.indexOf('localhost') > -1 ? true : false,
        }       
    },
    created(){

    },

    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)  
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent(params = {}) {
            this.consentList = params.consentList;
            this.endDate = params.endDate;

            this.status = window.$SMNATIVE.getOS('I') ? "ios" : "android";// window.$SMNATIVE.getOS('A')

            if(this.getUserInfo('chnl') === '385'){
                this.return_app_scheme_url = "newnhsmartmydata";
            }else{
                this.return_app_scheme_url = "nhcokmydata";
            }

            this.getData();
        },

        getData() {
            this.fn_OAuthReq();
        },

        fn_timeOut() {
            let time = 5*60; // 기준시간(1.5분)
            let min = "";   // 분
            let sec = "";   // 초

            this.clearIntervalTimeOut = setInterval(() => {

                min = parseInt(time/60);
                sec = time%60;
                this.timeoutCount = min > 0? "0" + min + ":" + (sec < 10? "0" + sec:sec) : "00:" + (sec < 10? "0" + sec:sec);
                time--;

                if (time < 0) {
                    this.timeoutCount = "초과";
                    clearInterval(this.clearIntervalTimeOut);
                    this.fn_returnMsgPopUpPaas('40106');
                }
            }, 1000)
        },

        fn_reOAuthReq() {
            clearInterval(this.clearIntervalTimeOut);
            this.fn_OAuthReq();
        },

        fn_OAuthReq() {
            this.fn_timeOut();
            this.fn_privateSignPass();
        },

        fn_privateSignPass() {
            //사설인증 웹뷰 세션 연장 처리
			this.startSessionTimerAuth()

            let requestList = this.consentList.map(t => ({
                "consent_len": JSON.stringify(t).length,
                "consent_title": "PA인증요청102",
                "consent": JSON.stringify(t),
                "tx_id": t.snd_org_code,
            }));

            const config = {
                url : "/co/ar/24r01", // IF-MOB-MDP-CO067 // MDPCOTU03R19
                data : {
                    mydtCusno       : this.getUserInfo("mydtCusno"),
                    caOrg           : "INPASS0000",
                    sign_tx_id      : "",
                    user_ci         : "",
                    real_name       : this.params.real_name,
                    phone_num       : this.params.phone_num,
                    telco_tycd      : this.params.telco_tycd,
                    request_title   : "PASS 통합인증-102 인증요청",
                    device_code     : "MO",
                    device_browser  : "NA",
                    return_app_scheme_url : this.return_app_scheme_url,
                    consent_type    : "1",
                    consent_cnt     : requestList.length,
                    consent_list    : requestList,

					svcnm           :"통합인증 개인신용정보 전송요구",
					tmsRqrDt        :null,
					tmsEdDt         :null,
					fxtmTmsYn       :null,
					tmsObvCntn      :"자산접근 토큰요청",
					bscTmsFq        :null,
					adtTmsFq        :null,
					tmsFqDsVal      :null,
                    hldExpiDtm      :null,
					client_id       :this.getUserInfo('svcClientId'),
                }
            } 
            
            apiService.call(config).then(response => {
                if (this.isLocal) {
                    this.cert_tx_id = this.getUserInfo("mydtCusno") + "@PASS_TEST_CERT_TX_ID::123";
                    this.sign_tx_id = this.getUserInfo("mydtCusno") + "@PASS_TEST_SIGN_TX_ID::123";
                } else {
                    if (!_.isEmpty(response) && response.rsp_code == "00000") {
                        this.rsp_code = response.rsp_code;
                        this.rsp_msg = response.rsp_msg;
                        this.cert_tx_id = response.cert_tx_id;
                        this.sign_tx_id = response.sign_tx_id;
    
                        if (this.status=="ios") {
                            this.sign_app_scheme = response.sign_ios_app_scheme_url; 
                        } else {
                            this.sign_app_scheme = response.sign_aos_app_scheme_url;
                        }
    
                        let toWebViewConfig = this.fn_telSendInfo();
                        
                        if (this.getUserInfo('chnl') === '385') {
                            appService.openPFMOFPFinCertPass(toWebViewConfig).then(response => {
                                if (response != null) {
                                    let errorCode = "";
                                    errorCode = response.result;
                                    if (errorCode === "3104") {
                                        this.fn_returnMsgPopUp(errorCode);
                                    }
                                }
                            })
                            .catch( error => {
                                modalService.alert(error);
                            });
                        } else {
                            appService.cokBankOpenPFMOFPPass((this.status=="ios" ? [toWebViewConfig] : toWebViewConfig))
                            .then(response => {
                                if (response != null) {
                                    let errorCode = response.result;
                                    if (errorCode === "3104") {
                                        this.fn_returnMsgPopUp(errorCode);
                                    }
                                }
                            });
                        }
                    } else if (response != null && response.rsp_code != null) {
                        this.fn_returnMsgPopUpPaas(response.rsp_code);
                    } else {
                        this.fn_returnMsgPopUpPaas('40010');
                    }
                }
            });
        },

        fn_openGuidePopup() {
            const config = {
                component : COAR2026,
                params : {
                    telco_tycd  : "",
                    phone_num   : "",   // 핸드폰 번호  
                }
            };

            modalService.openPopup(config).then(response => {
                this.phoneHeader = response;
            });
        },

        fn_oAuthConfirmPass() {
            const config = {
				component: COAR4007,
				params: {
					"endDate": this.endDate,
					"certInfo": {
                        "signDsc": "2",
                        "consentList": this.consentList,
                        "signed": {
                            "telcoTycd": this.params.telco_tycd,
                            "certTxId": this.cert_tx_id,
                            "signTxId": this.sign_tx_id
                        }
                    },
				}
			};

			modalService.openPopup(config).then(response => {
                if (!_.isEmpty(response)) {
                    if (response.resCode == "00000") {
                        this.fn_close(response);
                    } else {
                        if (response.resCode == "40010") {
                            // 인증 수행 안 했음. 재요청을 시도해서 pass인증 해야함.
                        } else {
                            this.fn_close(response);
                            // this.closeAll();
                            // routerService.moveMain();
                            // this.getMyBizRegInfo().then(() => {
                            //     this.getAllMyAssetInfo();
                            // });
                            // this.fn_close();
                        }
                    }
                } else {
                    this.closeAll();
                }
			});
        },

        fn_returnMsgPopUp(code) {
            let msg, topMsg, msgFlag = false;
            switch(code){
                case "E0000": 
                    topMsg = "<p class='txt'>성공</p>";
                    msg = "<p class='txt_sub txt_gray'>성공<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3001": 
                    topMsg = "<p class='txt'>패스 서비스 미가입자</p>";
                    msg = "<p class='txt_sub txt_gray'>패스 서비스 미가입자<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3002": 
                    topMsg = "<p class='txt'>패스 인증서 미발급자</p>";
                    msg = "<p class='txt_sub txt_gray'>패스 인증서 미발급자<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3003": 
                    topMsg = "<p class='txt'>사용자 인증 시 취소 또는 서명 과정 중 취소</p>";
                    msg = "<p class='txt_sub txt_gray'>사용자 인증 시 취소 또는 서명 과정 중 취소<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3004": 
                     topMsg = "<p class='txt'>사용자 인증 시 인증 실패 (생체 인증 실패 등)</p>";
                    msg = "<p class='txt_sub txt_gray'>사용자 인증 시 인증 실패 (생체 인증 실패 등)<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3005": 
                    topMsg = "<p class='txt'>단말 네트워크 환경 등으로 인한 통신 실패</p>";
                    msg = "<p class='txt_sub txt_gray'>단말 네트워크 환경 등으로 인한 통신 실패<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3006": 
                    topMsg = "<p class='txt'>통신사 서버에서 에러 발생</p>";
                    msg = "<p class='txt_sub txt_gray'>통신사 서버에서 에러 발생<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3007":
                    topMsg = "<p class='txt'>인증서 Library 서명에서 에러 발생</p>";
                    msg = "<p class='txt_sub txt_gray'>인증서 Library 서명에서 에러 발생<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3999": 
                    topMsg = "<p class='txt'>기타 오류</p>";
                    msg = "<p class='txt_sub txt_gray'>기타 오류<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;  
                case "3104": // PASS 인증서 이용안내
                    topMsg = "<p class='txt'>PASS 앱이 설치 되지 않았습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>PASS 앱 설치 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;                 
                default:
                    break;
            }
            
            let compName = COAR2025
            const config = {
                component: compName,
                params : {
                    code : code,
                    msg  : msg,
                    msgFlag : msgFlag,
                    secedeBoxHtml : topMsg + msg,
                }
            };

            modalService.openPopup(config).then(response => {
                this.$nextTick(() => {
                    if (code != "40010") {
                        this.fn_close({
                            "resCode": code,
                            "isSuccess": false,
                        });
                    }
                })
            });
        },
        
        fn_returnMsgPopUpPaas(code){
            let msg, topMsg, msgFlag = false;
            switch(code){
                case "3103": 
                    topMsg = "<p class='txt'>발급된 PASS 인증서가 없습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>인증서 발급 후 이용해 주세요.<br/> <a href='javascript:void(0);' role='button' onclick='this.fn_openGuidePopup()'><ui>PASS 인증서 발급 안내</ui></a><br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3104": 
                    topMsg = "<p class='txt'>PASS 앱이 설치 되지 않았습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>PASS 앱 설치 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3105": 
                    topMsg = "<p class='txt'>PASS 인증 요청 중 일시적인 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3106": 
                    topMsg = "<p class='txt'>PASS 서비스에 가입하지 않은 고객입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>서비스 가입 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3107": 
                    topMsg = "<p class='txt'>PASS 인증 요청 중 일시적인 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요. <br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3108": 
                    topMsg = "<p class='txt'>죄송합니다. 지원하지 않는 단말기입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3199": 
                    topMsg = "<p class='txt'>PASS 인증 요청 중 일시적인 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "4106":
                    topMsg = "<p class='txt'>전자서명 불일치로 인증에 실패 하였습니다.</p>"; 
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 인증 재요청 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "4107": 
                    topMsg = "<p class='txt'>인증 유효 시간이 만료 되었습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>PASS 인증 요청을 다시 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;    
                case "4110": 
                    topMsg = "<p class='txt'>인증 정보 불일치로 인증에 실패 하였습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 인증 재요청 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break; 
                case "4112": 
                    topMsg = "<p class='txt'>PASS 인증이 정상적으로 처리되지 않았습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 인증 재요청 해 주세요. <br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break; 
                case "4115": 
                    topMsg = "<p class='txt'>PASS 인증이 정상적으로 처리되지 않았습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>PASS앱에서 인증을 완료해 주세요. <br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;

                /////// 20220802 PASS인증서_연동규격서_마이데이터사업자용_V_1_4 버전 기준으로 변경된 기획문서 NHMFM-PD-DS-03-UI 레이아웃-공통(CO)-v0.95(20220801)_취합본 31페이지 오류 코드별 메시지 반영 ///////
                case "40001": 
                    topMsg = "<p class='txt'>인증 요청 중 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40002": 
                    topMsg = "<p class='txt'>인증 요청 중 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40003": 
                    topMsg = "<p class='txt'>인증 요청 중 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40020": 
                    topMsg = "<p class='txt'>통신사에 가입된 사용자가 아닙니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40021": 
                    topMsg = "<p class='txt'>죄송합니다. 지원하지 않는 단말기입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40022": 
                    topMsg = "<p class='txt'>일시 정지된 휴대폰 번호입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40023": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>PASS 서비스에 가입하지 않은 고객입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>서비스 가입 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40024": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>발급된 PASS 인증서가 없습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>인증서 발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40025": 
                    topMsg = "<p class='txt'>분실 신고된 휴대폰번호 입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40026": 
                    topMsg = "<p class='txt'>이용이 제한된 사용자 입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40027": 
                    topMsg = "<p class='txt'>정보 제공이 제한된 사용자 입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40040": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>인증서가 만료되었습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>인증서 재발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40041": 
                    topMsg = "<p class='txt'>인증서 유효기간이 도래하지 않았습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40042": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>인증서가 삭제 되었습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>인증서 재발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40043": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>인증서가 효력이 정지되었습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>인증서 재발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40044": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>유효하지 않은 인증서입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>인증서 재발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40045": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>인증서 검증에 실패하였습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40010": //23.02.20 PASS 인증 미완료시 인증 재요청 버튼으로 유도하기 위한 문구 수정
                    topMsg = "<p class='txt'>인증이 완료되지 않았습니다.<br>인증 재요청 버튼을 눌러주세요.</p>";
                    msg = "<p class='txt_sub txt_gray'>PASS앱에서 인증을 완료해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40011": 
                    topMsg = "<p class='txt'>인증 요청과 일치하는 데이터가 없습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 인증 재요청 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40101": 
                    topMsg = "<p class='txt'>유효하지 않은 접근토큰 입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40106": 
                    topMsg = "<p class='txt'>인증 유효 시간이 만료 되었습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>PASS 인증 요청을 다시 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "50001": 
                    topMsg = "<p class='txt'>죄송합니다. 시스템 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "50002": 
                    topMsg = "<p class='txt'>죄송합니다. 시스템 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "50003": 
                    topMsg = "<p class='txt'>죄송합니다. 시스템 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "50008": 
                    topMsg = "<p class='txt'>죄송합니다. 시스템 점검 중입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "etc":
                    topMsg = "<p class='txt'>인증 요청 중 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                default:
                    break;
            }
            
            let compName = COAR2025
            const config = {
                component: compName,
                params : {
                    code : code,
                    msg  : msg,
                    msgFlag : msgFlag,
                    secedeBoxHtml : topMsg + msg,
                }
            };
            
            modalService.openPopup(config).then(response => {
                this.$nextTick(() => {
                    if (code != "40010") {
                        this.fn_close({
                            "resCode": code,
                            "isSuccess": false,
                        });
                    }
                })
            })
        },

        fn_telSendInfo() {
            const toWebViewConfig = {
                "content"           : []
                , "orgCode"         : import.meta.env.VITE_PRIVATE_ORGCODE
                , "apiKey"          : import.meta.env.VITE_PRIVATE_APIKEY
                , "telPackageName"  : ""
                , "schemeUrl"       : this.sign_app_scheme
                , "universal_link"  : this.sign_app_scheme
            };

            return toWebViewConfig;

        },

        startSessionTimerAuth() {
			this.sessionTimerAuthor = setInterval(() => {
				this.$store.dispatch('config/extendSession');
            }, 30 * 1000);
        },

        fn_close(response = {}) {
            this.close(response);
        }

    },

	destroyed(){
        clearInterval(this.clearIntervalTimeOut);
        clearInterval(this.sessionTimerAuthor);
	}    
}
</script>