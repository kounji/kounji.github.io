<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS 인증 확인
* @ 페이지설명 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS인증 완료 확인
* @ 파일명     : src/views/page/CO/AR/COAR2024/COAR2024.vue
* @ 작성자     : CS528051
* @ 작성일     : 2022-07-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-18              CS528051                 최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>PASS인증</h1>
			<a href="javascript:void(0);" role="button" class="btn_back" @click.prevent="close('')"><span class="blind">이전화면</span></a>
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
                <a v-if="!isFirstStepYn" href="javascript:void(0);" role="button" class="btn btn_mint" aria-disabled="false" @click.prevent="fn_oAuthConfirmPass2()">인증 확인</a>
                <a v-else href="javascript:void(0);" role="button" class="btn btn_mint" aria-disabled="false" @click.prevent="fn_oAuthConfirm()">인증 확인</a>
				<!-- btn_off 제거시 활성화 -->
			</div>
		</div>
		<a href="javascript:void(0);" role="button" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

// PASS 인증서 선택 시 인증 동의 슬라이드 팝업 UI-CO-AR-1023 호출
import COAR2022 from '@/views/page/CO/AR/COAR2022/COAR2022' // 미존재 자산연결 팝업
import COAR2025 from '@/views/page/CO/AR/COAR2025/COAR2025'

import appService from '@/service/appService'
import {dateFormat} from '@/utils/date'
import moment from 'moment'

import COAR2007 from '@/views/page/CO/AR/COAR2007/COAR2007' // COAR0006 COAR2007
import COAR2010 from '@/views/page/CO/AR/COAR2010/COAR2010' // COAR0013 COAR2010
import COAR2026 from '@/views/page/CO/AR/COAR2026/COAR2026' // 미존재 자산연결 팝업
import _ from 'lodash'

export default {
    name : "COAR2024",
    data: () => {
        return {
            com_check_pho   : "",
            timeoutCount    : "",
            comCheckPho     : "",       // 통신사 구분 체크 값
            phoneHeader     : "",       // 핸드폰 앞3자리       
            phoneBody       : "",       // 핸드폰 번호
            clearIntervalTimeOut : null,

            // COAR2020화면 
            attcC           : "",
            attcCext        : "",

            moduleList      : [],
            signedDataList  : [],
            signListOne     : [],
            signListTwo     : [],
            caOrgOne        : '',
            caOrgTwo        : '',
            userAgreeInfo   : {
                "realName" : true,
                "gender" : true,
                "nationalInfo": true,
                "birthDate" : true,
                "ci" : true
            },

            // 세션 체크 타이머
            sessionTimerAuthor          : null,

            sign_app_scheme             : "",
            rsp_code                    : "",   // 세부 응답코드
            rsp_msg                     : "",   // 세부 응답메시지
            sign_ios_app_scheme_url     : "",   // iOS 인증앱의 app scheme
            sign_aos_app_scheme_url     : "",   // AOS 인증앱의 app scheme
            sign_web_url                : "",   // 앱이 실행할 인증앱 Scheme Url
            cert_tx_id                  : "",   // 인증기관 트랜잭션 ID
            sign_tx_id                  : "",   // 

            telPackageName              : "",
            oauth102RspCode             : "",    // 통합인증 101 리턴 결과코드

            content                     : [],
            schemeUrl                   : "",
            universal_link              : "",
            reqTxId                     : "",
            telcoTxId                   : "",
            certTxId                    : "",
            callbackScheme              : "",
            packageName                 : "",
            sc                          : "",
            callBackUrl                 : "",
            status                      : "",    // 안드로이드 앱: 3 아이폰 앱: 5

            callbackSchemeCokBankAnd    : "nhcokmydata",
            callbackSchemeSmartBankAnd  : "newnhsmartmydata",
            packageNameCokBankAnd       : "nh.smart.nhcok",
            packageNameSmartBankAnd     : "nh.smart.banking",
            
            // callbackSchemeCokBankIos    : "NHCOK",
            // callbackSchemeSmartBankIos  : "newsmartbankingbankid",
            callbackSchemeCokBankIos    : "nhcokmydata",
            callbackSchemeSmartBankIos  : "newnhsmartmydata",
            packageNameCokBankIos       : "com.nonghyup.nhcok",
            packageNameSmartBankIos     : "com.nonghyup.newsmartbanking",

            secedeBoxHtml               : "",

            consentList                 : [],
            contentNew                  : [],
            passContent                 : [],
            passContentPass             : [],

            response102                 : {},
            signed_consent_list         : [],

            error			            : "",
            error_description           : [],
            
            oAuthConfirmConfig          : {},       // 인증확인에 필요한 Config  
            privateFinishConfig         : {},       // COAR2018 팝업 호출에 사용되는 Config 

            paramsCOAR2021              : {},       // 화면 COAR2021에서 넘어온 값
            consentArray                : [],
            reqPage                     : "",
            isFirstStepYn               : true,     // 인증 첫 단계 여부
            selectedCnt                 : 0,
            end_period                  : "",
            selOrgAsetList              : [],       // 선택 기관 전체 자산 백업용 리스트

            msgFlag                     : false,    // 알림창 PASS 인증서 이용안내 존재 여부

            isMramMod                   : "",
            isBckYn                     : false,
            return_app_scheme_url       : "",
        }       
    },
    created(){

    },
    mounted() {

        console.log("COAR2024 this.params=", this.params);

        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)  
        this.status = window.$SMNATIVE.getOS('I')?"ios":"android";// window.$SMNATIVE.getOS('A')

        console.log("COAR2024 this.params.telco_tycd=", this.params.telco_tycd);
        
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent(param) {
            this.moduleList = param.moduleList || [];
            // this.status = this.exeStatus;
            this.status = window.$SMNATIVE.getOS('I')?"ios":"android";// window.$SMNATIVE.getOS('A')
            // 2차 PASS앱 인증
            this.paramsCOAR2021 = this.params.paramsCOAR2021 || {}; // 화면 COAR0012에서 넘어온 값
            this.isFirstStepYn = Object.keys(this.paramsCOAR2021).length >  0 ? 
                                ( this.paramsCOAR2021.isFirstStepYn ? true : false ) : ( this.params.isFirstStepYn ? true : false )
            
            // this.reqPage = this.paramsCOAR2021.reqPage;
            this.selectedCnt        = this.paramsCOAR2021.selectedCnt;
            this.end_period         = this.paramsCOAR2021.end_period;
            this.selOrgAsetList     = this.params.selOrgAsetList || []

            this.isMramMod          = this.params.isMramMod || ""
            this.isBckYn            = this.params.isBckYn ? true : false

            console.log('====== PASS로 받은 this.paramsCOAR2021  111 =======', this.paramsCOAR2021)

            if(this.getUserInfo('chnl') === '385'){
                this.return_app_scheme_url = "newnhsmartmydata";
            }else{
                this.return_app_scheme_url = "nhcokmydata";
            }

            this.getData();
        },
        getData() {
            console.log("인증단계 >>> ", this.isFirstStepYn ? "1단계" : "2단계")
            this.fn_timeOut();
            this.fn_OAuthReq();
        },
        fn_openPhoneNum(){

                const config = {
                    component : COAR2022,
                    params : {
                        mydtCusno   : "",
                        sqno        : "",
                        isUpt       : "",
                    }
                }
                // 슬라이드팝업 -> 팝업 호출 시 필수코드
                config.renderer = this.modalConfig.renderer
                modalService.openPopup(config).then(response => {
                    console.log(response);
                    this.phoneHeader = response;
                })
        },
        fn_radioCheck(flag) {// 체크 된 통신사 구분값  
            this.comCheckPho = flag;
        },
        fn_timeOut() {
            let time = 5*60; // 기준시간(1.5분)
            let min = "";   // 분
            let sec = "";   // 초

            this.clearIntervalTimeOut = setInterval(() => {

                min = parseInt(time/60);
                sec = time%60;
                this.timeoutCount = min > 0? "0" + min + ":" + (sec < 10? "0" + sec:sec) : "00:" + (sec < 10? "0" + sec:sec);
                // console.log("COAR2022 this.all=", this.timeoutCount);
                // console.log("COAR2022 this.timeoutCount=", this.timeoutCount);

                time--;

                if(time < 0){
                    this.timeoutCount = "초과";
                    console.log("COAR2022 time < 0 this.timeoutCount=", this.timeoutCount);
                    clearInterval(this.clearIntervalTimeOut);
                    // 선택 여부 체크
                    this.fn_returnMsgPopUpPaas('40106'); // 40106 서명시간이 유효시간 범위를 초과하였습니다.(인증 유효 시간이 만료 되었습니다.)
                    // modalService.alert("인증 유효시간이 만료 되었습니다.").then(() => {
                    //     clearInterval(this.clearIntervalTimeOut);
                    // })
                }
            }, 1000)
        },
        fn_reOAuthReq() {
            clearInterval(this.clearIntervalTimeOut);
            this.fn_OAuthReq();
            this.fn_timeOut();
        },
        fn_OAuthReq() {
            console.log("통합인증 요청 102 호출");

            // if(this.getUserInfo('chnl') !== '385'){
            //     modalService.alert("죄송합니다. 콕뱅크에서는<BR>공동인증서 서비스만 가능합니다.<BR><BR>금융인증서 이용을 원하실 경우<BR>NH뱅킹 앱을 이용하시기 바랍니다.")
            //     return false
            // }
            
            console.log("======= this.getNonceCode 호출 전 =======", this.getUserInfo('chnl'))
            this.getNonceCode();
        },
        getNonceCode(){             
            // 마이데이터사업자 통합인증 인증코드생성
			const config = {
				url:  "/co/ar/05r01",
				data : {
                    svcnm : "서비스명"        
                    , orgC : ""
				}
			}
			apiService.call(config).then(response => {
                console.log('사설인증 전 nonce값 확인', response)
                this.attcC = response.attcC || ''
                this.attcCext = response.attcCext || ''
                // this.fn_privateSign()
                this.fn_privateSignPass()
            })
        },
        fn_privateSignPass() {

            this.contentNew = [];
            this.passContent = [];
            this.passContentPass = [];

            //사설인증 웹뷰 세션 연장 처리
			this.startSessionTimerAuth()

            console.log('사설인증 전자서명 전')
            if(this.isMramMod === '') {
                for(let i=0; i<this.moduleList.length; i++){
                    this.contentNew.push(
                        {
                            "orgCode" : this.moduleList[i].orgC
                            ,"ucpidRequestInfo" : {
                                "userAgreement" : "금융분야 마이데이터 통합인증을 위한 인증서 본인확인서비스 이용약관, 개인정보처리, 고유식별정보 수집·이용 및 위탁에 동의합니다.", 
                                "userAgreeInfo":this.userAgreeInfo,
                                "ispUrlInfo": import.meta.env.VITE_API_URL,
                                "ucpidNonce" : this.attcC, 
                            }
                            ,"consentInfo" : {
                                "consent" : {
                                    "snd_org_code" : this.moduleList[i].orgC
                                    , "rcv_org_code" : "ZVAAAZ0000"
                                    , "is_scheduled" : "false"
                                    , "end_date":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
                                    , "purpose":"상세정보 전송요구를 위한 가입상품목록 조회"
                                    , "period":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
                                    , "target_info" : [
                                        {"scope" : this.moduleList[i].orgBzrgC + '.list'}
                                    ]
                                },
                                "consentNonce":this.attcCext
                            }
                        }
                    )
                }

                for(let i=0; i<this.moduleList.length; i++){
                    this.passContent.push( {
                            "consentDataList" : {
                                "snd_org_code" : this.moduleList[i].orgC
                                , "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "false"
                                , "end_date":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
                                , "purpose":"상세정보 전송요구를 위한 가입상품목록 조회"
                                , "period":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
                                , "target_info" : [
                                    {"scope" : this.moduleList[i].orgBzrgC + '.list'}
                                ]
                            },
                            "caOrg": "ZVAAAZ0000"
                            ,"caOrgType":"06"
                        }
                    )
                }

                for(let i=0; i<this.moduleList.length; i++){

                    this.passContentPass.push( {

                                "snd_org_code" : this.moduleList[i].orgC
                                , "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "false"
                                , "fnd_cycle" : "1/w"
                                , "add_cycle" : "1/w"
                                , "end_date":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
                                , "purpose":"상세정보 전송요구를 위한 가입상품목록 조회"
                                , "period":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
                                , "target_info" : [
                                    {"scope" : this.moduleList[i].orgBzrgC + '.list'}
                                ]
                                ,"caOrg": "ZVAAAZ0000"
                                ,"caOrgType":"06"
                                
                        }

                    )
                }
            } else {
                for(let i=0; i<this.moduleList.length; i++){
                    this.contentNew.push(
                        {
                            "orgCode" : this.moduleList[i].infOfrmnOrgC
                            ,"ucpidRequestInfo" : {
                                "userAgreement" : "금융분야 마이데이터 통합인증을 위한 인증서 본인확인서비스 이용약관, 개인정보처리, 고유식별정보 수집·이용 및 위탁에 동의합니다.", 
                                "userAgreeInfo":this.userAgreeInfo,
                                "ispUrlInfo": import.meta.env.VITE_API_URL,
                                "ucpidNonce" : this.attcC, 
                            }
                            ,"consentInfo" : {
                                "consent" : {
                                    "snd_org_code" : this.moduleList[i].infOfrmnOrgC
                                    , "rcv_org_code" : "ZVAAAZ0000"
                                    , "is_scheduled" : "false"
                                    , "end_date":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
                                    , "purpose":"상세정보 전송요구를 위한 가입상품목록 조회"
                                    , "period":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
                                    , "target_info" : [
                                        {"scope" : this.moduleList[i].orgBizDsc + '.list'}
                                    ]
                                },
                                "consentNonce":this.attcCext
                            }
                        }
                    )
                }

                for(let i=0; i<this.moduleList.length; i++){
                    this.passContent.push( {
                            "consentDataList" : {
                                "snd_org_code" : this.moduleList[i].infOfrmnOrgC
                                , "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "false"
                                , "end_date":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
                                , "purpose":"상세정보 전송요구를 위한 가입상품목록 조회"
                                , "period":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
                                , "target_info" : [
                                    {"scope" : this.moduleList[i].orgBizDsc + '.list'}
                                ]
                            },
                            "caOrg": "ZVAAAZ0000"
                            ,"caOrgType":"06"
                        }
                    )
                }

                for(let i=0; i<this.moduleList.length; i++){

                    this.passContentPass.push( {

                                "snd_org_code" : this.moduleList[i].infOfrmnOrgC
                                , "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "false"
                                , "fnd_cycle" : "1/w"
                                , "add_cycle" : "1/w"
                                , "end_date":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
                                , "purpose":"상세정보 전송요구를 위한 가입상품목록 조회"
                                , "period":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
                                , "target_info" : [
                                    {"scope" : this.moduleList[i].orgBizDsc + '.list'}
                                ]
                                ,"caOrg": "ZVAAAZ0000"
                                ,"caOrgType":"06"
                        }

                    )
                }
            }
            
            this.consentList = [];

            console.log('====== PASS로 받은 this.paramsCOAR2021 222=======', this.paramsCOAR2021)
            console.log('====== PASS 인증 단계 구분 >>> =======', this.isFirstStepYn ? "1단계" : "2단계")

            // if(this.paramsCOAR2021.reqPage === 'COAR0012'){
            if(!this.isFirstStepYn){
                // 2차인증과정
                
                console.log('====== PASS로 받은 this.paramsCOAR2021 222 this.paramsCOAR2021.consentArray =======', this.paramsCOAR2021.consentArray)
                console.log('====== PASS로 받은 this.paramsCOAR2021 222 this.paramsCOAR2021.selectList =======', this.paramsCOAR2021.selectList)
                console.log('====== PASS로 받은 this.paramsCOAR2021 222 this.paramsCOAR2021.orgTotScopeList =======', this.paramsCOAR2021.orgTotScopeList)

                this.consentArray = this.paramsCOAR2021.consentArray;

                let orgTotScopeList = [];
                orgTotScopeList = this.paramsCOAR2021.orgTotScopeList;
                for(let i=0; i<orgTotScopeList.length; i++){
    
                    this.consent = JSON.stringify({"snd_org_code": orgTotScopeList[i].snd_org_code, "rcv_org_code" : "ZVAAAZ0000", "target_info" : [{"scope" : orgTotScopeList[i].org_biz_code + '.list'}]});
                    this.consentList.push({
                        "consent_len":this.consentArray.length,
                        "consent_title": "PA인증요청102",
                        "consent": JSON.stringify(this.consentArray),
                        "tx_id": orgTotScopeList[i].snd_org_code // tx_id 아닌 다른 용도로 사용함.
                    });	
    
                }

            }else{
                // 1차인증과정
                if(this.isMramMod === '') {
                    for(let i=0; i<this.moduleList.length; i++){
        
                        this.consent = JSON.stringify({"snd_org_code": this.moduleList[i].orgC, "rcv_org_code" : "ZVAAAZ0000", "target_info" : [{"scope" : this.moduleList[i].orgBzrgC + '.list'}]});
                        this.consentList.push({
                            "consent_len":this.consent.length,
                            "consent_title": "PA인증요청102",
                            "consent": JSON.stringify(this.passContentPass),
                            "tx_id": this.moduleList[i].orgC, // tx_id 아닌 다른 용도로 사용함.
                            "orgBzrgC" : this.moduleList[i].orgBzrgC
                        });	
        
                    }
                } else {
                    for(let i=0; i<this.moduleList.length; i++){
        
                        this.consent = JSON.stringify({"snd_org_code": this.moduleList[i].infOfrmnOrgC, "rcv_org_code" : "ZVAAAZ0000", "target_info" : [{"scope" : this.moduleList[i].orgBizDsc + '.list'}]});
                        this.consentList.push({
                            "consent_len":this.consent.length,
                            "consent_title": "PA인증요청102",
                            "consent": JSON.stringify(this.passContentPass),
                            "tx_id": this.moduleList[i].infOfrmnOrgC,// tx_id 아닌 다른 용도로 사용함.
                            "orgBzrgC" : this.moduleList[i].orgBzrgC 
                        });	
        
                    }
                }

            }

            const config = {
                //url : "/co/ar/08r13",                                           // IF-MOB-MDP-CO059 // MDPCOTU03R17
                url : "/co/ar/24r01",                                             // IF-MOB-MDP-CO067 // MDPCOTU03R19
                data : {
                    mydtCusno       : this.getUserInfo("mydtCusno"),
                    // org_code           : "INPASS0000",
                    caOrg           : "INPASS0000",
                    // caOrg           : "ZYAAAU0000", // SKT
                    sign_tx_id      : "",
                    user_ci         : "",
                    real_name       : this.params.real_name,
                    phone_num       : this.params.phone_num,
                    telco_tycd      : this.params.telco_tycd,
                    request_title   : "PASS 통합인증-102 인증요청",
                    device_code     : "MO",
                    // device_code     : "PC",
                    device_browser  : "NA",
                    // device_browser  : "WB",
                    // return_app_scheme_url : "app2appdummy",
                    return_app_scheme_url : this.return_app_scheme_url,
                    //consent_type    : "0",
                    consent_type    : "1",
                    consent_cnt     : this.consentList.length,
                    consent_list    : this.consentList,

					svcnm           :"통합인증 자산목록조회토큰요청",
					tmsRqrDt        :null,
					tmsEdDt         :null,
					fxtmTmsYn       :null,
					tmsObvCntn      :"자산목록조회용 토큰요청",
					bscTmsFq        :null,
					adtTmsFq        :null,
					// , "bscTmsFq":"1/w"
					// , "adtTmsFq":"1/w"
					tmsFqDsVal      :null,
                    hldExpiDtm      :null,
					client_id       :this.getUserInfo('svcClientId'),
                }
            } 
            
            console.log(config);
            apiService.call(config).then(response => {

                if(response != null && response.rsp_code == "00000"){// 전자서명 요청 응답코드 정상일 경우

                    this.rsp_code                   = response.rsp_code;
                    this.rsp_msg                    = response.rsp_msg;
                    this.sign_ios_app_scheme_url    = response.sign_ios_app_scheme_url;
                    this.sign_aos_app_scheme_url    = response.sign_aos_app_scheme_url;
                    this.sign_web_url               = response.sign_web_url;
                    this.cert_tx_id                 = response.cert_tx_id;
                    this.sign_tx_id                 = response.sign_tx_id;

                    if(this.status=="ios"){// 아이폰 앱
                        this.sign_app_scheme = response.sign_ios_app_scheme_url; 
                        // this.sign_app_scheme = response.sign_aos_app_scheme_url; // 테스트 용
                    }else{// 안드로이드 앱
                        this.sign_app_scheme = response.sign_aos_app_scheme_url;
                    }

                    this.oauth102RspCode = "";// 값 초기화
                    let toWebViewConfig = null;
                    let callbackScheme = ""; // 스뱅 callbackScheme
                    let packageName = "";
                    
                    if(this.getUserInfo('chnl') === '385'){
                        toWebViewConfig = this.fn_telSendInfo(callbackScheme, packageName);
                        appService.openPFMOFPFinCertPass(toWebViewConfig).then(response => {
                            console.log('스뱅 사설인증 웹뷰 호출 리턴 결과 response = ',  response);
                            if(response != null){// PASS 앱 설치 안 되였을 경우
                                // this.fn_returnMsgPopUp(response.code);
                                let errorCode = "";
                                errorCode = response.result;
                                if(errorCode === "3104"){
                                    this.fn_returnMsgPopUp(errorCode);
                                }else{
                                    // this.fn_returnMsgPopUpPaas('etc'); // 미확인 원인으로 인한 미응답(성공일 경우도 있음.)
                                }
                            }else{// PASS 앱에서 리턴 결과는 없음.
                                // modalService.alert("응답 코드가 없습니다.").then(() => {})
                            }
                        })
                        .catch( error => {
                            console.log(error)
                            modalService.alert(error)
                        })
                    }else{
                        toWebViewConfig = this.fn_telSendInfo(callbackScheme, packageName);

                        let toWebViewConfigArr = [];
                        toWebViewConfigArr.push(toWebViewConfig);//콕뱅은 아이폰 Arr 처리

                        if(this.status=="ios"){// 아이폰 앱 

                            appService.cokBankOpenPFMOFPPass(toWebViewConfigArr).then(response => {
                                console.log('콕뱅 사설인증 웹뷰 호출 리턴 결과 response = ',  response)
                                if(response != null){// PASS 앱 설치 안 되였을 경우
                                    // this.fn_returnMsgPopUp(response.code);
                                    let errorCode = "";
                                    errorCode = response.result;
                                    if(errorCode === "3104"){
                                        this.fn_returnMsgPopUp(errorCode);
                                    }else{
                                        // this.fn_returnMsgPopUpPaas('etc'); // 미확인 원인으로 인한 미응답(성공일 경우도 있음.)
                                    }
                                }else{// PASS 앱에서 리턴 결과는 없음.
                                    // modalService.alert("응답 코드가 없습니다.").then(() => {})
                                }
                            })
                        }else{

                            appService.cokBankOpenPFMOFPPass(toWebViewConfig).then(response => {
                                console.log('콕뱅 사설인증 웹뷰 호출 리턴 결과 response = ',  response)
                                if(response != null){// PASS 앱 설치 안 되였을 경우
                                    // this.fn_returnMsgPopUp(response.code);
                                    let errorCode = "";
                                    errorCode = response.result;
                                    if(errorCode === "3104"){
                                        this.fn_returnMsgPopUp(errorCode);
                                    }else{
                                        // this.fn_returnMsgPopUpPaas('etc'); // 미확인 원인으로 인한 미응답(성공일 경우도 있음.)
                                    }
                                }else{// PASS 앱에서 리턴 결과는 없음.
                                    // modalService.alert("응답 코드가 없습니다.").then(() => {})
                                }
                            })
                        }
                    }
                }else if(response != null && response.rsp_code != null){
                    this.fn_returnMsgPopUpPaas(response.rsp_code);// 실제 리턴 코드 확인 후 적용 (code:40001 ~ 50008) 테스트 후 원복 해야함.
                    // this.fn_returnMsgPopUpPaas('40010'); // 테스트 용 테스트 완료 후 상단 소스로 원복
                }else{
                    // 리턴 결과 오류시
                    // this.fn_returnMsgPopUpPaas('etc'); // 미확인 원인으로 인한 미응답 
                    this.fn_returnMsgPopUpPaas('40010'); // 서명이 완료되지 않았습니다.(인증이 완료되지 않았습니다.)
                }

            })

        },
        fn_openGuidePopup() {// PASS 인증서 이용안내 COAR2026
            console.log("fn_openGuidePopup 호출!!!");
            const config = {
                component : COAR2026,
                params : {
                    telco_tycd  : "",
                    phone_num   : "",   // 핸드폰 번호  
                }
            }

            // 슬라이드팝업 -> 팝업 호출 시 필수코드
            config.renderer = this.modalConfig.renderer
            modalService.openPopup(config).then(response => {
                console.log(response);
                this.phoneHeader = response;
            })
        },
        // OS 별 앱 설치 링크 URL
		fn_setMarketUrl(key) {

			console.log("======= this.status android / ios =======",  this.status);
			console.log("======= fn_setMarketUrl key  =======",  key);

			switch(key) {
				case 'S': 
					this.schemeUrl = this.status=="android"?"https://play.google.com/store/apps/details?id=com.sktelecom.tauth"
									:(this.status=="ios"?"https://apps.apple.com/kr/app/pass-by-sk-telecom-%EA%B5%ACt%EC%9D%B8%EC%A6%9D/id1141258007":"");
					break;
				case 'K':
					this.schemeUrl = this.status=="android"?"https://play.google.com/store/apps/details?id=com.kt.ktauth"
									:(this.status=="ios"?"https://apps.apple.com/kr/app/pass-by-kt-%EA%B5%AC-kt-%EC%9D%B8%EC%A6%9D/id1134371550":"");
					break;
				case 'L':
					this.schemeUrl = this.status=="android"?"https://play.google.com/store/apps/details?id=com.lguplus.smartotp"
									:(this.status=="ios"?"https://apps.apple.com/kr/app/pass-by-u-u-%EC%9D%B8%EC%A6%9D/id1147394645":"");
					break;
				default:
					break;
			}

			const config = {
				marketUrl	: this.schemeUrl
            } 

			if(this.getUserInfo('chnl') === '385'){//스뱅
				appService.openPassMarketUrl(config).then(response => {
					console.log('스뱅 앱 설치 링크 URL 전달 웹뷰 호출 결과 리턴',  response);
				})
				.catch( error => {
					console.log(error)
					modalService.alert(error)
				})
			}else{//콕뱅
				appService.cokBankOpenPassMarketUrl(config).then(response => {
					console.log('콕뱅 앱 설치 링크 URL 전달 웹뷰 호출 결과 리턴',  response);
				})
			}
			
		},
        fn_oAuthConfirm() {// 인증 확인 버튼(전자서명 결과 조회) 
            // if(this.oauth102RspCode == "00000"){
                const config = {
                    //url : "/co/ar/08r15",                                           // IF-MOB-MDP-CO060 // MDPCOTU03R18
                    url : "/co/ar/27r01",                                           // IF-MOB-MDP-CO062 // MDPCOTU03R20
                    data : {
                        cert_tx_id      : this.cert_tx_id,
                        sign_tx_id      : this.sign_tx_id,

                        mydtCusno       : this.getUserInfo("mydtCusno"),
                        caOrg           : "INPASS0000",                             // selectPresOrgCInq 조회 쿼리문 하고 연관 있음.
                        org_code        : "ZVAAAZ0000",
                        grant_type      : "password",
                        consent_type    : "1",
                        telco_tycd      : this.telco_tycd,                          // 통신사 구분코드
                        consent         : JSON.stringify(this.passContentPass),
                        mydtOutsOrgDsc  : "06",                                     // 공동,사설인증서구분코드
                        acsTokenUzDsc   : "1",                                      // 개인정보전송용 접근토큰 요청

                        svcnm           : "자산목록조회용 토큰요청", 
                        tmsRqrDt        : dateFormat(moment(), 'YYYYMMDD'),         //전송요청일자
                        tmsEdDt         : this.end_period,
                        tmsObvCntn      : "자산목록조회용 토큰요청",
                        hldExpiDtm      : this.end_period,                          // 보유만료일시
                        client_id       : this.getUserInfo('svcClientId')
                    }
                }

                console.log(config);
                this.oAuthConfirmConfig = config
                apiService.call(config).then(response => {

                    if(response != null && response.rsp_code != null){
                        if(response.rsp_code == "00000"){// 전자서명 결과 조회  응답코드 정상일 경우

                            this.response102 = response;
                            this.error = response.error
   
                            // modalService.alert("08r15 rsp_code="+response.rsp_code).then(() => {});
                            // modalService.alert("08r15 response.error="+response.error).then(() => {});

                            // this.signedDataList = response.signedDataList || []
                            // for(let i=0; i < this.signedDataList.length; i++){
                            //     this.signListOne.push({"orgCode":this.signedDataList[i].orgCode,"signedPersonInfoReq":this.signedDataList[i].signedPersonInfoReq})
                            //     this.signListTwo.push({"orgCode":this.signedDataList[i].orgCode,"signedConsent":this.signedDataList[i].signedConsent})
                            // }
                            // this.caOrgOne = response.caOrg || ''
                            // this.caOrgTwo = response.caOrg || ''

                            this.fn_privateFinish();

                        }else{
                            this.fn_returnMsgPopUpPaas(response.rsp_code);// 실제 리턴 코드 확인 후 적용 (code:40001 ~ 50008)
                        }  

                    }else{
                        //  modalService.alert("응답 코드가 없습니다.").then(() => {});
                        // this.fn_returnMsgPopUpPaas('etc'); // 미확인 원인으로 인한 미응답
                        this.fn_returnMsgPopUpPaas('40010'); // 서명이 완료되지 않았습니다.(인증이 완료되지 않았습니다.)
                    }
                   
                })
            // }else{
            //     // 리턴 결과 오류시
            //     modalService.alert("전자서명 결과 조회에서 실패하였습니다.").then(() => {
                    
            //     })
            // }

        },
        fn_oAuthConfirmPass2() {// 인증 확인 버튼(전자서명 결과 조회) 
            const config = {
                component : COAR2007,
                params : {
                    cert_tx_id      : this.cert_tx_id,
                    sign_tx_id      : this.sign_tx_id,
                    telco_tycd      : this.telco_tycd,
                    consentArray    : this.consentArray,
                    end_period      : this.end_period,
                    orgTotScopeList : this.paramsCOAR2021.orgTotScopeList,
                    selectList      : this.paramsCOAR2021.selectList,
                    certDsc         : "pass",               // 인증방법 구분
                    isFirstStepYn   : false,                // 2차 인증 flag
                    selOrgAsetList  : this.selOrgAsetList,  // 선택기관 전체자산 백업용 리스트
                    isMramMod       : this.isMramMod,
                    selectedCnt     : _.uniqBy(this.paramsCOAR2021.selectList , 'org_code').length
                }
            }
            console.log(">>>> 2차인증 파라미터 확인 >>>> ", config)
            modalService.openPopup(config).then(response => {
                if(response === "40010") this.close(response)
            })
        

        },
        fn_privateFinish(){

            //세션타이머 종료
            // clearInterval(this.sessionTimerAuthor)

            let compName = COAR2007
            const config = {
                component: compName,
                params : {
                    moduleList      : this.moduleList,
                    attcC           : this.attcC,
                    attcCext        : this.attcCext,
                    signListOne     : this.signListOne,
                    signListTwo     : this.signListTwo,
                    userAgreeInfo   : this.userAgreeInfo,
                    caOrgOne        : this.caOrgOne,
                    caOrgTwo        : this.caOrgTwo,
                    ca_org_type     : "06",

                    // 이어하기용 변수
                    continueFlag 	: "",
                    continueData	: {},

                    certDsc         : "pass",
                    isFirstStepYn   : this.isFirstStepYn,
                    // consent         : JSON.stringify(this.contentObj), // PASS전자서명 대상 원문
                    consent         : "",
                    cert_tx_id      : this.cert_tx_id,
                    sign_tx_id      : this.sign_tx_id,
                    telco_tycd      : this.telco_tycd,
                    end_period      : this.end_period,
                    // password        : JSON.stringify(this.signed_consent_list),
                    password        : "",
                    error           : this.error,
                    error_description : this.error_description,
                    response102     : this.response102,
                    reqPassCnt      : this.moduleList.length || 0,
                    selectedCnt     : this.moduleList.length || 0,
                    isMramMod       : this.isMramMod,
                    isBckYn         : this.isBckYn,
                }
            }
            console.log(config)
            this.privateFinishConfig = config
            modalService.openPopup(config).then(response => {
                if(response === 'retry') this.close()
            })
        },
        fn_privateFinishPass2(){
            console.log('selectCnt   :: ', this.selectedCnt)
            let compName = COAR2010
            const config = {
                component: compName,
                params : {
                    orgTotScopeList : this.paramsCOAR2021.orgTotScopeList,
                    selectList      : this.paramsCOAR2021.selectList,

                }
            }
            modalService.openPopup(config).then(response => {
                console.log(response)
            })
        },
        // PASS 앱 리턴 코드에 대응된 메시지 팝업 
        fn_returnMsgPopUp(code){
            this.oauth102RspCode = code;
            switch(code){
                case "E0000": 
                    this.topMsg = "<p class='txt'>성공</p>";
                    this.msg = "<p class='txt_sub txt_gray'>성공<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3001": 
                    this.topMsg = "<p class='txt'>패스 서비스 미가입자</p>";
                    this.msg = "<p class='txt_sub txt_gray'>패스 서비스 미가입자<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3002": 
                    this.topMsg = "<p class='txt'>패스 인증서 미발급자</p>";
                    this.msg = "<p class='txt_sub txt_gray'>패스 인증서 미발급자<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3003": 
                    this.topMsg = "<p class='txt'>사용자 인증 시 취소 또는 서명 과정 중 취소</p>";
                    this.msg = "<p class='txt_sub txt_gray'>사용자 인증 시 취소 또는 서명 과정 중 취소<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3004": 
                     this.topMsg = "<p class='txt'>사용자 인증 시 인증 실패 (생체 인증 실패 등)</p>";
                    this.msg = "<p class='txt_sub txt_gray'>사용자 인증 시 인증 실패 (생체 인증 실패 등)<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3005": 
                    this.topMsg = "<p class='txt'>단말 네트워크 환경 등으로 인한 통신 실패</p>";
                    this.msg = "<p class='txt_sub txt_gray'>단말 네트워크 환경 등으로 인한 통신 실패<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3006": 
                    this.topMsg = "<p class='txt'>통신사 서버에서 에러 발생</p>";
                    this.msg = "<p class='txt_sub txt_gray'>통신사 서버에서 에러 발생<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3007":
                    this.topMsg = "<p class='txt'>인증서 Library 서명에서 에러 발생</p>";
                    this.msg = "<p class='txt_sub txt_gray'>인증서 Library 서명에서 에러 발생<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "E3999": 
                    this.topMsg = "<p class='txt'>기타 오류</p>";
                    this.msg = "<p class='txt_sub txt_gray'>기타 오류<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;  
                case "3104": // PASS 인증서 이용안내
                    this.topMsg = "<p class='txt'>PASS 앱이 설치 되지 않았습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>PASS 앱 설치 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    this.msgFlag = true;
                    break;                 
                default:
                    break;
            }
            
            this.secedeBoxHtml = this.topMsg + this.msg;
 
            let compName = COAR2025
            const config = {
                component: compName,
                params : {
                    code : code,
                    msg  : this.msg,
                    msgFlag : this.msgFlag,
                    secedeBoxHtml : this.secedeBoxHtml,
                }
            }
            console.log(config)
            console.log(code)

            modalService.openPopup(config).then(response => {
                console.log(response)
                // if(response == "3104"){
                //     this.fn_openGuidePopup();// PASS 인증서 이용안내 COAR2026
                // }

                this.$nextTick(()=>{
                    // 출력위치가 인증확인 화면 아닌경우 현재 화면 닫고 인증요청 화면 보이기
                    if(code != "40010"){
                        console.log("현재 페이지 닫기");
                        // this.fn_setMarketUrl(this.telco_tycd); // 향후 설치화면 호출시 다시 사용
                        this.close(code);
                    }
                })
            })
        },
        // 코드별 오류 메시지(기획에서 권장)
        // PASS 앱 리턴 코드에 대응된 메시지 팝업 
        fn_returnMsgPopUpPaas(code){
            this.oauth102RspCode = code;
            switch(code){
                case "3103": 
                    this.topMsg = "<p class='txt'>발급된 PASS 인증서가 없습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>인증서 발급 후 이용해 주세요.<br/> <a href='javascript:void(0);' role='button' onclick='this.fn_openGuidePopup()'><ui>PASS 인증서 발급 안내</ui></a><br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3104": 
                    this.topMsg = "<p class='txt'>PASS 앱이 설치 되지 않았습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>PASS 앱 설치 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3105": 
                    this.topMsg = "<p class='txt'>PASS 인증 요청 중 일시적인 오류가 발생했습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3106": 
                    this.topMsg = "<p class='txt'>PASS 서비스에 가입하지 않은 고객입니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>서비스 가입 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3107": 
                    this.topMsg = "<p class='txt'>PASS 인증 요청 중 일시적인 오류가 발생했습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요. <br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3108": 
                    this.topMsg = "<p class='txt'>죄송합니다. 지원하지 않는 단말기입니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3199": 
                    this.topMsg = "<p class='txt'>PASS 인증 요청 중 일시적인 오류가 발생했습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "4106":
                    this.topMsg = "<p class='txt'>전자서명 불일치로 인증에 실패 하였습니다.</p>"; 
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 인증 재요청 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "4107": 
                    this.topMsg = "<p class='txt'>인증 유효 시간이 만료 되었습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>PASS 인증 요청을 다시 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;    
                case "4110": 
                    this.topMsg = "<p class='txt'>인증 정보 불일치로 인증에 실패 하였습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 인증 재요청 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break; 
                case "4112": 
                    this.topMsg = "<p class='txt'>PASS 인증이 정상적으로 처리되지 않았습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 인증 재요청 해 주세요. <br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break; 
                case "4115": 
                    this.topMsg = "<p class='txt'>PASS 인증이 정상적으로 처리되지 않았습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>PASS앱에서 인증을 완료해 주세요. <br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;

                /////// 20220802 PASS인증서_연동규격서_마이데이터사업자용_V_1_4 버전 기준으로 변경된 기획문서 NHMFM-PD-DS-03-UI 레이아웃-공통(CO)-v0.95(20220801)_취합본 31페이지 오류 코드별 메시지 반영 ///////
                case "40001": 
                    this.topMsg = "<p class='txt'>인증 요청 중 오류가 발생했습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40002": 
                    this.topMsg = "<p class='txt'>인증 요청 중 오류가 발생했습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40003": 
                    this.topMsg = "<p class='txt'>인증 요청 중 오류가 발생했습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40020": 
                    this.topMsg = "<p class='txt'>통신사에 가입된 사용자가 아닙니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40021": 
                    this.topMsg = "<p class='txt'>죄송합니다. 지원하지 않는 단말기입니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40022": 
                    this.topMsg = "<p class='txt'>일시 정지된 휴대폰 번호입니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40023": // PASS 인증서 이용안내(버튼)
                    this.topMsg = "<p class='txt'>PASS 서비스에 가입하지 않은 고객입니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>서비스 가입 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    this.msgFlag = true;
                    break;
                case "40024": // PASS 인증서 이용안내(버튼)
                    this.topMsg = "<p class='txt'>발급된 PASS 인증서가 없습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>인증서 발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    this.msgFlag = true;
                    break;
                case "40025": 
                    this.topMsg = "<p class='txt'>분실 신고된 휴대폰번호 입니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40026": 
                    this.topMsg = "<p class='txt'>이용이 제한된 사용자 입니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40027": 
                    this.topMsg = "<p class='txt'>정보 제공이 제한된 사용자 입니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40040": // PASS 인증서 이용안내(버튼)
                    this.topMsg = "<p class='txt'>인증서가 만료되었습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>인증서 재발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    this.msgFlag = true;
                    break;
                case "40041": 
                    this.topMsg = "<p class='txt'>인증서 유효기간이 도래하지 않았습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40042": // PASS 인증서 이용안내(버튼)
                    this.topMsg = "<p class='txt'>인증서가 삭제 되었습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>인증서 재발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    this.msgFlag = true;
                    break;
                case "40043": // PASS 인증서 이용안내(버튼)
                    this.topMsg = "<p class='txt'>인증서가 효력이 정지되었습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>인증서 재발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    this.msgFlag = true;
                    break;
                case "40044": // PASS 인증서 이용안내(버튼)
                    this.topMsg = "<p class='txt'>유효하지 않은 인증서입니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>인증서 재발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    this.msgFlag = true;
                    break;
                case "40045": // PASS 인증서 이용안내(버튼)
                    this.topMsg = "<p class='txt'>인증서 검증에 실패하였습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    this.msgFlag = true;
                    break;
                case "40010": //23.02.20 PASS 인증 미완료시 인증 재요청 버튼으로 유도하기 위한 문구 수정
                    this.topMsg = "<p class='txt'>인증이 완료되지 않았습니다.<br>인증 재요청 버튼을 눌러주세요.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>PASS앱에서 인증을 완료해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40011": 
                    this.topMsg = "<p class='txt'>인증 요청과 일치하는 데이터가 없습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 인증 재요청 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40101": 
                    this.topMsg = "<p class='txt'>유효하지 않은 접근토큰 입니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40106": 
                    this.topMsg = "<p class='txt'>인증 유효 시간이 만료 되었습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>PASS 인증 요청을 다시 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "50001": 
                    this.topMsg = "<p class='txt'>죄송합니다. 시스템 오류가 발생했습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "50002": 
                    this.topMsg = "<p class='txt'>죄송합니다. 시스템 오류가 발생했습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "50003": 
                    this.topMsg = "<p class='txt'>죄송합니다. 시스템 오류가 발생했습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "50008": 
                    this.topMsg = "<p class='txt'>죄송합니다. 시스템 점검 중입니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                // case "50010": //23.02.20 중복토큰 발급으로 인한 오류 메시지 처리 문구 추가
                //     this.topMsg = "<p class='txt'>연결기관에서 제공한 정보 오류입니다.</p>";
                //     this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                //     break;
                case "etc": // 미확인 원인으로 인한 미응답 20220914 추가 
                    this.topMsg = "<p class='txt'>인증 요청 중 오류가 발생했습니다.</p>";
                    this.msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                /////// 20220802 PASS인증서_연동규격서_마이데이터사업자용_V_1_4 버전 기준으로 변경된 기획문서 NHMFM-PD-DS-03-UI 레이아웃-공통(CO)-v0.95(20220801)_취합본 31페이지 오류 코드별 메시지 반영 ///////
                default:
                    break;
            }
            
            this.secedeBoxHtml = this.topMsg + this.msg;
 
            let compName = COAR2025
            const config = {
                component: compName,
                params : {
                    code : code,
                    msg  : this.msg,
                    msgFlag : this.msgFlag,
                    secedeBoxHtml : this.secedeBoxHtml,
                }
            }
            console.log(config)
            modalService.openPopup(config).then(response => {
                console.log(response)
                this.$nextTick(()=>{
                    // 출력위치가 인증확인 화면 아닌경우 현재 화면 닫고 인증요청 화면 보이기
                    if(code != "40010"){
                        console.log("현재 페이지 닫기");
                        // this.fn_setMarketUrl(this.telco_tycd); // 향후 설치화면 호출시 다시 사용
                        this.close(code);
                    }
                })
            })
        },

        fn_telSendInfo(callbackScheme, packageName) {

            this.callbackScheme = callbackScheme;
            this.packageName = packageName;

            //파라미터 필수
            const toWebViewConfig = {
                "content"           : this.content
                , "orgCode"         : import.meta.env.VITE_PRIVATE_ORGCODE
                , "apiKey"          : import.meta.env.VITE_PRIVATE_APIKEY
                , "telPackageName"  : this.telPackageName
                , "schemeUrl"       : this.sign_app_scheme
                , "universal_link"  : this.sign_app_scheme
                // , "toNativeParam"   :   {
                //                             "universal_link"    : this.universal_link,
                //                             "reqTxId"           : this.sign_tx_id,
                //                             "telcoTxId"         : this.telcoTxId,
                //                             "certTxId"          : this.cert_tx_id,
                //                             "callbackScheme"    : this.callbackScheme,
                //                             "packageName"       : this.packageName,
                //                             "sc"                : this.sc,
                //                             "callBackUrl"       : this.callBackUrl,
                //                             "schemeUrl"         : this.schemeUrl
                //                         }

            } 

            console.log('======= fn_telSendInfo 실행 ======= ', this.getUserInfo('chnl'))
            console.log('======= fn_telSendInfo 실행 toWebViewConfig ======= ', toWebViewConfig)

            return toWebViewConfig

        },
        startSessionTimerAuth(){
			//인터벌로 변경 처리
			this.sessionTimerAuthor = setInterval(() => {

				// if(this.getUserInfo('chnl') === '385'){
				// 	// 스뱅 로그인 연장 처리
				// 	this.$store.dispatch('config/extendSession')
				// }else{
				// 	// 콕뱅 로그인 연장 처리
				// }
				
				// 스뱅/콕뱅 로그인 연장 처리
				this.$store.dispatch('config/extendSession')


//////////////////////////////// kimhc 잠시 주석 처리 테스트 완료 이후 원복 ////////////////////////////////////////////

				//pfm 로그인 연장을 위한 더미 API콜 처리
				// const config = {
				// 	url: '/co/co/00r02',
				// 	data: {
				// 	"mydtCusno" : this.getUserInfo('mydtCusno'),
				// 	}
				// }
				// apiService.call(config).then(() =>{
				// 	//알람 더미 체크
                // })
                
//////////////////////////////// kimhc 잠시 주석 처리 테스트 완료 이후 원복 ////////////////////////////////////////////


            }, 30*1000);
        },

    },
	destroyed(){
        clearInterval(this.clearIntervalTimeOut); //kimhc_20220902 테스트 완료 후 원복
        clearInterval(this.sessionTimerAuthor);
	}    
}
</script>