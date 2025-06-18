<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번에 > 자산 연결 중 로딩 화면
* @ 페이지설명 : 한번에 > 자산 연결 중 로딩 화면
* @ 파일명     : src/views/page/CO/AR/COAR4007/COAR4007.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-04-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-04-04              CS540685              상호금융 NH콕마이데이터 4.0 추진 개발
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01">

		<div class="popup_header">
			<h1>자산연결</h1>
		</div>

		<div class="popup_content">

			<div class="asset_load">
                <lottie-animation
                    :animationData="require('@/assets_v40/images/lottie/asset_connect.json')"
                    :loop="true"
                    :auto-play="true"
                    aria-hidden="true"
                    class="lottie"
                    background="transparent">
                </lottie-animation>
				<div class="value">
					<div class="num"><span>1</span>%</div>
					<p><span>{{consentList.length}}</span>개 기관에서 {{cusnm}}님의 자산을 가져오고 있어요.</p>
				</div>
			</div>
		</div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click="fn_close()" v-show="isShowCloseBtn"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import routerService from '@/service/routerService'
import axios from 'axios'
import {dateFormat} from '@/utils/date'
import moment from 'moment'
import _ from 'lodash'
import LottieAnimation from 'lottie-web-vue'

import COAR2025 from '@/views/page/CO/AR/COAR2025/COAR2025'

export default {
    name : "COAR4007",
    data: () => {
        return {
            WAIT_TIME_PER_ORG: 3,
            WAIT_TIME_BASE: 10,

            endDate: "",
            signDsc: "", // 1: 본인인증 기반, 2: 사설인증기관 기반
			consentList: [],
            /**
             * 본인인증 기반: {attcC, attcCext, requestList, signListOne, signListTwo, caOrgOne, caOrgTwo}
             * 사설인증기관 기반: {telcoTycd, caOrg, certTxId, signTxId, consentList}
             */
            signed: {},

            cusnm: "",
            isShowCloseBtn: false,
        }
	},

    mounted() {
        /*
        function animateCounter(selector, start, end, duration) {
            // document.addEventListener("DOMContentLoaded", () => {
                const element = document.querySelector(selector);
                if (!element) return;
                
                let startTime;
                const updateCounter = time => {
                    startTime ??= time;
                    const progress = Math.min((time - startTime) / duration, 1);
                    element.textContent = Math.floor(progress * (end - start) + start);
                    if (progress < 1) requestAnimationFrame(updateCounter);
                };
                requestAnimationFrame(updateCounter);
            // });
        }
        */
        
		this.initComponent(this.params);
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },

    mixins: [
		commonMixin,
        popupMixin
	],

	computed:{
		
	},

    methods: {
        initComponent(params = {}) {
            this.endDate = params.endDate;
			this.signDsc = params.certInfo.signDsc;
            this.consentList = params.certInfo.consentList;
            this.signed = params.certInfo.signed;

            this.fn_animateCounter(".asset_load .num span", 0, 99, (this.WAIT_TIME_BASE + (this.consentList.length * this.WAIT_TIME_PER_ORG)) * 1000);

            this.cusnm = this.getUserInfo("cusnm");

			this.getData();
        },

        getData() {
            if (this.signDsc == "1") {
                this.fn_getAccessTockenByIV();
            } else {
                this.fn_getAccessTockenByPA();
            }
		},

        fn_animateCounter(selector, start, end, duration) {
            // document.addEventListener("DOMContentLoaded", () => {
                const element = document.querySelector(selector);
                if (!element) return;
                
                let startTime;
                const updateCounter = time => {
                    startTime ??= time;
                    const progress = Math.min((time - startTime) / duration, 1);
                    let progressDegree = Math.floor(progress * (end - start) + start);
                    if (progressDegree >= 99) {
                        this.isShowCloseBtn = true;
                    }
                    element.textContent = progressDegree;
                    if (progress < 1) requestAnimationFrame(updateCounter);
                };
                requestAnimationFrame(updateCounter);
            // });
        },

        fn_getAccessTockenByIV() {
            const personList = this.signed.requestList.map((t, i) => {
                const {is_scheduled, fnd_cycle, add_cycle
                    , is_consent_trans_memo, is_consent_merchant_name_regno, is_consent_trans_category} = t.consentInfo.consent;
                
                return Object.assign({
                    "orgCode": t.orgCode,
                    "signedPersonInfoReq": this.signed.signListOne[i].signedPersonInfoReq,
                    "signedPersonInfoReq_len": this.signed.signListOne[i].signedPersonInfoReq.length,
                    "request_type": "1"
                }, {is_scheduled, fnd_cycle, add_cycle, is_consent_trans_memo, is_consent_merchant_name_regno, is_consent_trans_category});
            });
            const passwordList = this.signed.requestList.map((t, i) => ({
                "orgCode": t.orgCode,
                "signedConsent": this.signed.signListTwo[i].signedConsent,
                "password_len": this.signed.signListTwo[i].signedConsent.length,
            }));

            let config = {
				url : "/co/ar/07r03",  // MDPCOTU04SA3
				disableLoading : true,
				data : {
					"auth_type": "0",																				// 본인확인이용여부 (본인확인기관이용 : 0, 전자서명인증사업자이용 : 1)
					"request_type": "1",																				// 전송요구 타입
					"consent": JSON.stringify(this.consentList),												// 전송요구내역 TO-BE 공공기관 수집목록 저장을 위함
					"consent_len": JSON.stringify(this.consentList).length,											// consent 항목길이
					"consent_nonce": this.signed.attcCext,																	// 재전송공격방지정보 전자서명이포함된 Nonce값(Base64 url-safe인코딩)
					"consent_type": "0",																				// 전자서명 유형
					"password": JSON.stringify({"signedDataList" : passwordList, "caOrg" : this.signed.caOrgOne}),		// 전송요구내역전자서명(signedConsent)
					"password_len": JSON.stringify({"signedDataList" : passwordList, "caOrg" : this.signed.caOrgOne}).length,// password 항목길이
					"signed_person_info_req": JSON.stringify({"signedDataList" : personList, "caOrg" : this.signed.caOrgTwo}),			// 본인확인 이용동의 전자서명 CMS(Base64 url-safe인코딩)
					"signed_person_info_req_len": JSON.stringify({"signedDataList" : personList, "caOrg" : this.signed.caOrgTwo}).length,	// signedPersonInfoReq 길이 (auth_type이 0인경우에만 세팅)
					"ucpid_nonce": this.signed.attcC,																		// 전자서명이포함된 Nonce값 (auth_type이 0인경우만 사용, Base64 url-safe인코딩)
					"grant_type": "password",																		// 권한부여방식
					"mydtCusno": this.getUserInfo("mydtCusno"),													// 마이데이터고객번호
					"svcnm": "통합인증 개인신용정보 전송요구",													// 서비스명
					"tmsRqrDt": dateFormat(moment(), "YYYYMMDD"),													// 전송요청일자
					"tmsEdDt": this.endDate,																	// 전송종료일자
					"tmsObvCntn": "상세정보 전송요구를 위한 가입상품목록 조회",										// 전송목적내용
					"hldExpiDtm": this.endDate,																	// 보유만료일시
					"client_id": this.getUserInfo("svcClientId"),													// 클라이언트ID
					"selOrgAsetList": [],
				}
			};

            this.fn_call(config).then(response => {
                this.fn_close({
                    "resCode": "00000",
                    "resMessage": "성공",
                    "succOrgList": response.succ_org_list,
                });
			}).catch(onrejected => {
                let msg = "일부기관 응답지연으로 자산연결이 원활하지 않습니다. 잠시 후 연결기관관리 화면에서 연결된 기관을 확인해주세요.";
                
                modalService.alert(msg).then(text => {
                    this.closeAll();
                    routerService.moveMain();
                });
            });
        },

        fn_getAccessTockenByPA() {
            let config;

            if (!_.isEmpty(this.signed.caOrg)) {
                config = {
                    "url": "/co/ar/07r04",
                    "disableLoading" : true,
                    "data": {
                        "mydtCusno": this.getUserInfo("mydtCusno"),
                        "caOrg": this.signed.caOrg,
                        "clientId": this.getUserInfo('svcClientId'),
                        "apiSvcnm": "통합인증 개인신용정보 전송요구",
                        "tmsObvCntn": "상세정보 전송요구를 위한 자산접근 토큰요청",
                        "tmsRqrDt": dateFormat(moment(), 'YYYYMMDD'),
                        "tmsEdDt": this.endDate,
                        "hldExpiDtm": this.endDate,
                        "signTxId": this.signed.signTxId,
                        "certTxId": this.signed.certTxId,
                        "grantType": "password",
                        "consentType": "1",
                        "consent": JSON.stringify(this.consentList),
                        "mydtOutsOrgDsc": "06",
                        "acsTokenUzDsc": "2",
                    }
                };
            } else {
                config = {
                    url : "/co/ar/07r05", // "/co/ar/27r01",     // MDPCOTU03R20 :: PASS 사설인증서비스관리-전자서명결과 조회 IF-MOB-MDP-CO062
                    disableLoading : true,
                    data : {
                        "cert_tx_id": this.signed.certTxId,
                        "sign_tx_id": this.signed.signTxId,
                        "mydtCusno": this.getUserInfo("mydtCusno"),
                        "caOrg": "INPASS0000",
                        "org_code": "ZVAAAZ0000",
                        "grant_type": "password",
                        "consent_type": "1",
                        "telco_tycd": this.signed.telcoTycd,                          // 통신사 구분코드
                        "consent": JSON.stringify(this.consentList),
                        "mydtOutsOrgDsc": "06",                                     // 공동,사설인증서구분코드
                        "acsTokenUzDsc": "2",                                      // 개인정보전송용 접근토큰 요청
                        "svcnm": "통합인증 개인신용정보 전송요구", 
                        "tmsRqrDt": dateFormat(moment(), 'YYYYMMDD'),         //전송요청일자
                        "tmsEdDt": this.endDate,
                        "tmsObvCntn": "상세정보 전송요구를 위한 자산접근 토큰요청",
                        "hldExpiDtm": this.endDate,                          // 보유만료일시
                        "client_id": this.getUserInfo('svcClientId'),
                        "selOrgAsetList": [],
                    }
				};
            }

            this.fn_call(config).then(response => {
				if (response != null) {
                    let rspCode = response.rsp_code || response.rspCode;
                    if (rspCode == "40010") {
                        this.fn_returnMsgPopUpPaas(rspCode);
                    } else {
                        let succOrgList = new Array();
                        if (response.error_description.startsWith("[")) {
                            try {
                                let errorDescriptionJsonList = JSON.parse(response.error_description);
                                errorDescriptionJsonList.forEach(t => {
                                    succOrgList.push({org_code : t.org_code});
                                });
                            } catch(error) {}
                        }
                        
						this.fn_close({
                            "resCode": "00000",
                            "resMessage": "성공",
                            "succOrgList": succOrgList,
                        });
                    }
				} else {
					this.fn_returnMsgPopUpPaas('40010'); // 서명이 완료되지 않았습니다.(인증이 완료되지 않았습니다.)
				}
			}).catch(onrejected => {
                let msg = "일부기관 응답지연으로 자산연결이 원활하지 않습니다. 잠시 후 연결기관관리 화면에서 연결된 기관을 확인해주세요.";
                
                modalService.alert(msg).then(text => {
                    this.closeAll();
                    routerService.moveMain();
                });
            });
        },

        fn_returnMsgPopUpPaas(code) {
			let topMsg = "";
			let msg = "";
			let msgFlag = "";

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
                case "40010": //23.02.23 PASS 인증 미완료시 인증 재요청 버튼으로 유도하기 위한 문구 수정
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
                case "50002":
                case "50003": 
                    topMsg = "<p class='txt'>죄송합니다. 시스템 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "50008": 
                    topMsg = "<p class='txt'>죄송합니다. 시스템 점검 중입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "80010": // 정보제공자 문제로 인한 미확인 원인 코드 추가
				case "etc":
                    topMsg = "<p class='txt'>인증 요청 중 오류가 발생했습니다.</p>";
					msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/></p>";
					msgFlag = true;
                    break;
                /////// 20220802 PASS인증서_연동규격서_마이데이터사업자용_V_1_4 버전 기준으로 변경된 기획문서 NHMFM-PD-DS-03-UI 레이아웃-공통(CO)-v0.95(20220801)_취합본 31페이지 오류 코드별 메시지 반영 ///////
                default:
                    break;
            }	

            let secedeBoxHtml = topMsg + msg;
 
            let compName = COAR2025;
            const config = {
                component: compName,
                params : {
                    code : code,
                    msg  : msg,
                    msgFlag : msgFlag,
                    secedeBoxHtml : secedeBoxHtml,
                }
            };
            modalService.openPopup(config).then(response => {
                this.fn_close({
                    "resCode": code,
                    "resMessage": "실패",
                });
            });
		},

        fn_closeConnectionClose() {
            let message = "자산연결이 진행 중입니다.<br>정말 나가시겠어요?";
            const confirm_config = {
                content: [message],
                title: "",
                ALERT_CONFIRM_TEXT: "나가기",
                ALERT_CANCEL_TEXT: "계속하기"
            };
            modalService.confirm(confirm_config).then(text => {
                if (text === "나가기") {
                    this.close();
                }
            });
        },

		fn_close(response = {}) {
			this.close(response);
		},

        fn_call(userConfig) {
            return new Promise((resolve, reject) => {
                const config = apiService.mergeDefaultConfig(userConfig);
                config.headers = apiService.getEncodingHeaders(config.data);
                apiService.addLoading(userConfig);
                
                axios(config).then(
                    response => {
                        apiService.removeLoading(userConfig);
                        if (apiService.checkResponse(response)) {
                            resolve(response.data);
                        } else {
                            reject(response);
                        }
                    },
                    error => {
                        apiService.removeLoading(userConfig);
                        reject(error);
                    }
                ).catch(error => {
                    apiService.removeLoading(userConfig);
                    if (error.response) {
                        if (error.response.status === '404') {
                            routerService.moveServiceReadyError(error.response);
                            reject(error.response);
                        } else {
                            reject(error.response);
                        }
                    } else if (error.request) {
                        reject(error.request);					
                    }else{
                        reject(error.response);					
                    }
                })
            })
        },
    },

    components : {
		LottieAnimation
    },
}


</script>