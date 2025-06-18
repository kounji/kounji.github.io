<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 약관동의
* @ 페이지설명 : 자산 > 숨은 자산 > 약관동의
* @ 파일명     : src/views/page/AS/TN/ASTN4004/ASTN4004.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-13
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-13              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01">

		<div class="popup_header">    
			<h1>이용약관동의</h1>
		</div>

		<div class="popup_content">
            <section class="sleep_account">
				<div class="tit_area">
					<h2 class="headline">계좌 해지 가능 여부 확인을 위해<br>
						이용약관에 동의해 주세요.	
					</h2>
				</div>

				<div class="agree_wrap full_view">
					<div class="check_all">
						<div class="checkbox border">
							<input type="checkbox" name="allagree1" id="stlt_all" ref="stlt_all" required="" title="전체동의" v-model="allChk" @change="fnChgAllAgree($event)">
							<button type="button" class="btn_detail ico_arrow" @click.prevent="fnOpenDtlPop('all')">전체동의<span class="blind">상세보기</span></button>
						</div>
					</div>
					<div class="view_cont">
						<ul class="agree_list">
							<li v-for="(item, idx) in stltArray" :key="idx">
								<div class="checkbox">
									<input type="checkbox" name="agree1" :title="item.stltTinm" v-model="agreeList" :value="item.stltSqno" @change="fnChgOneAgree($event, item)" :checked="item.checked">
									<button type="button" class="btn_detail ico_arrow" @click.prevent="fnOpenDtlPop(item.stltSqno)">{{item.stltTinm}}<span class="blind">상세보기</span></button>
								</div>
							</li>
						</ul>
					</div>
				</div>
            </section>
		</div>
        <div class="popup_footer fixed">
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" :disabled="!isAgree" @click.prevent="fnNextAgree(callDsc)">동의</button><!-- 활성화시 disabled 제거-->
            </div>
        </div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
		
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import {mapGetters, mapActions} from 'vuex'
import {defineAsyncComponent} from 'vue'
import _ from 'lodash'

export default {
    name : "ASTN4004",
    data: () => {
        return {
            stltArray        : [],      // 약관목록 array
            allChk           : false,   // 모두 동의여부
            agreeList        : [],      // 약관 동의여부 목록
            
            param            : {},      // 부모로부터 넘겨받은 파라미터
            callDsc          : '',      // 계좌해지 가능여부 조회, 기부, KCB 구분 코드 E,D,K
            paramObj         : {},      // API용 입력 파라미터

            isAgree          : false,   // 동의 버튼 활성화 여부(고객위임여부)
            delegationDtm    : '',      // 고객위임일시

            terminationId    : '',      // key
            customerPhoneNum : '',      // 본인인증된 전화번호
            signResult       : 'N',     // 금융인증서 결과값
            orgList: [
				{"bzrgCode": "bank", "bzrgName": "은행", "scrmode": "UNSC", "isShow": true,
					"bzrgKey": "bank_org", "orgCn": 0, "orgs": [],
					"selectedOrgs": [], "selectedAssets": [], "selectedExtndScopes": []}],
            termsInfo: {
				isTermsAgree: false,
				rcv_org_code: "ZVAAAZ0000",
				is_scheduled: false,
				fnd_cycle: "",
				add_cycle: "",
				end_date: "",
				purpose: "전송요구를 통한 본인신용정보 통합조회 서비스의 이용",
				period: "99991231",
				is_consent_trans_memo: false,
				is_consent_merchant_name_regno: false,
				is_consent_trans_category: false,
				selectedRegion: "",
			},

            isDev    : import.meta.env.VITE_ENV == 'D' || window.location.host.indexOf('localhost') > -1 // 개발과 로컬
        }
    },
	computed: {
        ...mapGetters('user', [
            'userTermsAgreeList',
            'userTermsInvtInfo',
            'userRecvInfo'
        ]),
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        initComponent(param) {
            this.param = param
            this.callDsc = this.param.callDsc // E:계좌해지 가능여부 조회, D:기부, F:금융인증서

            if(this.callDsc == 'E') {
                this.paramObj = this.param.eligibilityObj
            } else if(this.callDsc == 'D') {
                this.paramObj = this.param.donationObj
            } else if(this.callDsc == 'F') {
                this.paramObj = this.param.kcbObj
            }
            
            this.getData()
            
        },

        getData() {
            this.stltArray = this.param.stltList // 약관 목록

            // sqno 채번
            this.stltArray.forEach((el, idx) => {
                el.stltSqno = idx+1
            })
        },

        /* 약관 상세보기 */
        fnOpenDtlPop(sqno, btnYn) {
            // btnYn => 체크박스 이벤트 경우 체크가 된 상태에서 해당 함수를 호출하고, 버튼 이벤트 경우 체크하지 않고 호출함
            if(this.callDsc == 'F') { // 금융인증서 약관은 상세 동의를 하지 않아도 체크가 활성화 됨
                let title   = ""    // 약관 제목
                let url     = ""    // 약관 url

                if(sqno === 1) {
                    title = "인증서 본인 확인 서비스 이용약관"
                    url="https://www.mydatacert.org/mydata/terms.html"                
                } else if(sqno === 2) {
                    title="개인정보 처리 동의"
                    url="https://www.mydatacert.org/mydata/privacy_agreement.html"
                } else {
                    title="고객식별정보 수집·이용 및 위탁 동의"
                    url="https://www.mydatacert.org/mydata/consignment_agreement.html"
                }

                let comName = defineAsyncComponent(() => import("@/views/page/CO/AR/COAR2017/COAR2017"))

                const config = {
                    component : comName,
                    params : {
                        title   : title,
                        url     : url
                    }
                }

                modalService.openPopup(config).then(response => {
                    if(response === "agree") {
                        // COAR2011
                        if(sqno == 'all') { // 전체 동의인 경우
                            this.agreeList = []
                            this.stltArray.forEach(el => this.agreeList.push(el.stltSqno))
                        } else {
                            if(this.agreeList.findIndex(el => el == sqno) < 0) this.agreeList.push(sqno)
                        }
                        
                    } else {
                        if(sqno == 'all') {
                            this.agreeList = []
                        } else {
                            let idx = this.agreeList.findIndex(el => el == sqno)
                            this.agreeList.splice(idx, 1) // 해당 약관 체크 해제
                        }

                        this.fnSetChk() // 전체 동의 체크박스 셋팅
                    }
                })
            } else {
                if(!btnYn && sqno != 'all') {
                    let idx = this.agreeList.findIndex(el => el == sqno) // 체크되어있는 약관을 버튼 이벤트로 다시 눌렀을 때 중복 데이터가 쌓이지 않게 함

                    if(idx < 0) {
                        this.agreeList.push(sqno) // 버튼 이벤트인 경우 체크박스와 동일하게 체크되게 해줌
                    }
                }

                let flag = sqno == 'all' ? true : false
                let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4005/ASTN4005"))
                const config = {
                    component : compName,
                    params : {
                        flag      : flag ? "all" : "",     // 전체여부
                        stltArray : flag ? this.stltArray : [this.stltArray[sqno-1]] // 약관 array
                    }
                }
                modalService.openPopup(config).then((response) => {
                    if(response.agreeYn == 'Y') {
                        if(response.sqno == 'all') {  // 전체 동의인 경우
                            this.agreeList = []
                            this.stltArray.forEach(el => this.agreeList.push(el.stltSqno))
                            
                        } else {                      // 개별 동의인 경우
                            //this.agreeList.push(response.sqno)
                        }
                    } else {                        // 그냥 닫은 경우
                        if(sqno == 'all') {
                            this.agreeList = []
                        } else {
                            let idx = this.agreeList.findIndex(el => el == sqno)
                            this.agreeList.splice(idx, 1) // 해당 약관 체크 해제
                            
                        }
                    }

                    this.fnSetChk() // 전체 동의 체크박스 셋팅
                })
            }
            
        },
        /* 전체 체크 세팅 */
        fnSetChk() {
            /* 동의 버튼 비활성화 여부 */
            if(this.agreeList.length == this.stltArray.length) this.isAgree = true
            else this.isAgree = false

            if(this.stltArray.length == this.agreeList.length) {
                this.allChk = true
            } else {
                this.allChk = false
            }
        },

        /* 전체 동의 */
        fnChgAllAgree(e) {
            let flag = e.target.checked

			if(flag) { // 전체 동의
                this.agreeList = []
                    this.stltArray.forEach((el)=> this.agreeList.push(el.stltSqno))
                    this.allChk = true
                /*
                if(this.callDsc != 'F') {
                    this.fnOpenDtlPop('all', true)
                } else { // 금융인증서 약관은 상세동의를 하지 않고 체크를 할 수 있음
                    this.agreeList = []
                    this.stltArray.forEach((el)=> this.agreeList.push(el.stltSqno))
                    this.allChk = true
                }
                */
			}
			else {     // 전체 동의 해제
                this.agreeList = []
			}

            this.fnSetChk()
        },

        /* 개별 동의 */
        fnChgOneAgree(e, item) {
            let chk = e.target.checked
            
            if(chk) { // 체크하려는 경우
                //if(this.callDsc != 'F') {
                    //this.fnOpenDtlPop(item.stltSqno, true)
                //} else { // 금융인증서 약관은 상세동의를 하지 않고 체크를 할 수 있음
                    this.fnSetChk()
                //}
            } else {  // 체크해제하려는 경우
                this.fnSetChk()
            }
        },
        /* 전체 동의 후 분기 처리 */
        fnNextAgree(dsc) {
            let now  = new Date();
            let yyyy = now.getFullYear()
            let mm  = this.fnLpad((now.getMonth() + 1),2,"0")
            let dd  = this.fnLpad(now.getDate(),2,"0")
            let hh  = this.fnLpad(now.getHours(),2,"0")
            let mi  = this.fnLpad(now.getMinutes(),2,"0")

            this.delegationDtm = yyyy+mm+dd+hh+mi

            // callUrl : E = 계좌해지 가능여부 조회, D = 기부, K = KCB 약관
            if(dsc == 'E') {
                if(this.isDev) { // 개발서버인 경우
                    modalService.confirm({content:["입출금 테스트를 하시겠습니까?(예:입출금, 아니오:예적금)"],title:""}).then(text => {
                        if(text == "예") {
                            this.fnCallEligibility(1)
                        } else {
                            this.fnCallEligibility(2)
                        }
                    });
                } else { // 운영서버
                    this.fnCallEligibility(1)
                }
                
                // this.fnCallEligibility(1)
            } else if(dsc == 'D') {
                this.fnCallDonation()
            } else if(dsc == 'F') {
                this.fnCallFinance()
            }
        },
        /* 계좌해지 가능여부 조회 API 호출 */
        fnCallEligibility(tmpAcntType) {
            this.accountType = tmpAcntType
            // 1:수시입출금, 2:예적금
            // 1번을 세팅하고 5006번 에러가 돌아오면 2번을 세팅해야 한다.

            //this.accountType = 2
            // *해지가능여부 조회
            const config = {
                url: '/as/tn/04r01',
                data: {
                    delegation_yn    : this.isAgree ? "Y":"",         // 고객위임여부
                    delegation_dtm   : this.delegationDtm,            // 고객위임일시
                    bank_code        : this.paramObj.bankCode,        // 개설 금융회사 코드
                    account_num      : this.paramObj.accountNum,      // 계좌 번호
                    deposit_sequence : this.paramObj.depositSequence, // 예금 회차 번호
                    account_type     : this.accountType,              // 계좌 종류
                    mydt_cusno       : this.getUserInfo("mydtCusno"), // 마이데이터고객번호
                    identity_num     : this.isDev ? "9002011243111" : null,               // 실명번호 테스트를 위해 세팅
                }
            }
            apiService.call(config).then(response =>{
                if(response.rsp_code == '0000') { // 정상 처리
                    this.terminationId = response.termination_id
                    if(this.paramObj.acNowBac > 0) {
                        // 원금이 0원보다 큰 경우는 계좌이체/기부로 이동
                        let param = {
                            accountType   : this.accountType,         // 계좌 종류
                            terminationId : response.termination_id   // 거래검증ID
                        }
                        this.close({flag:'success', param: param})
                    } else {
                        ///////////////////////////////////////////////////
                        // 개발 0원계좌 테스트용!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        ///////////////////////////////////////////////////

                        // 바로 KCB 인증과 금융인증서를 띄우고 계좌해지 및 잔고이전 API 호출
                        this.customerPhoneNum = ""
                        
                        if(this.isDev) { // 개발서버
                            modalService.confirm({content:["KCB 인증 테스트를 하시겠습니까?"],title:""}).then(text => {
                                if(text == "예") {
                                    // KCB본인인증 모듈 호출
                                    ///////////////////////////////////////////////////////////////////////////////////////////
                                    let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4009/ASTN4009"))
                                    const config = {
                                        component: compName, 
                                    }

                                    modalService.openPopup(config).then(response => {
                                        if(!_.isEmpty(response)) {
                                            if(response.flag == 'success') { // KCB 인증에 완료한 경우~
                                                this.customerPhoneNum = response.customerPhoneNum
                                                this.fnSelAuth()
                                            }
                                        }
                                    })
                                    ///////////////////////////////////////////////////////////////////////////////////////////
                                } else {
                                    this.customerPhoneNum = "01000000000"
                                    this.fnSelAuth()
                                }
                            })
                        } else { // 운영서버
                            ///////////////////////////////////////////////////
                            // 개발 0원계좌 테스트용!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            ///////////////////////////////////////////////////
                            let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4009/ASTN4009"))
                            const config = {
                                component: compName, 
                            }

                            modalService.openPopup(config).then(response => {
                                if(!_.isEmpty(response)) {
                                    if(response.flag == 'success') { // KCB 인증에 완료한 경우~
                                        this.customerPhoneNum = response.customerPhoneNum
                                        this.fnSelAuth()
                                    }
                                }
                            })
                        }
                        
                    }
                    

                } else if(response.rsp_code == '5006' && tmpAcntType == 1) { // 계좌 종료 오류 && 수시입출금
                    this.fnCallEligibility(2) // 예적금으로 재호출
                } else {
                    let rtn = {
                        flag : 'impossible',
                        msg  : response.rsp_message
                    }
                    this.close(rtn)  // 해지불가능한 경우 리턴
                }

            })
        },

        fnSelAuth() {
            // 인증서 선택 팝업 호출
            let compName = defineAsyncComponent(() => import("@/views/page/CO/AR/COAR4003/COAR4003"))
            const config = {
                component: compName, 
                params   : {
                        title        : "인증 방법 선택",
                        subTitle     : "계좌해지를 위해",
                        useCertList  : ["finance"]
                    }
            }

            modalService.openPopup(config).then(response => {
                
                if(response.certDsc == "finance") {
                    this.signResult = 'N' // 금융인증서 결과 초기화
                    if (this.isDev) { // 개발서버
                        modalService.confirm({content:["금융인증서 테스트를 하시겠습니까?"],title:""}).then(text => {
                            if(text == "예") {
                                this.fnFinance()
                            } else {
                                // 개발서버 금융인증서 테스트를 하지 않은 경우, 인증을 한 것처럼 처리
                                this.signResult = 'Y'
                                this.fnTransfer()
                            }
                        })
                    } else { // 운영서버
                        this.fnFinance()
                    }
                }
            })
                
        },

        /* 실제 금융인증서 로직 */
        fnFinance() {
            ///////////////////////////////////////////////////////////////////////////////////////////
            let now = new Date();
            let yy  = now.getFullYear()
            let mm  = this.fnLpad((now.getMonth() + 1),2,"0")
            let dd  = this.fnLpad(now.getDate(),2,"0")

            this.termsInfo.end_date = yy+mm+dd

            // 금융인증서 관련은 COAR4002, COAR4009 참고!
            let consent = {
                "snd_org_code" : this.paramObj.infOfrmnOrgC,
                "rcv_org_code" : "ZVAAAZ0000",
                "is_scheduled" : "", //termsInfo.is_scheduled.toString(),
                "end_date" : this.termsInfo.end_date,
                "period" : "99991231",
                "target_info" : [],
            };

            let consentList = []
            consentList.push(consent)

            const config2 = {
                url:  "/co/ar/05r01",
                data : {
                    svcnm : "서비스명",
                    orgC : ""
                }
            };

            apiService.call(config2).then(response => {
                const attcC = response.attcC || '';
                const attcCext = response.attcCext || '';
                
                let requestList = consentList.map(t => ({
                    "orgCode": t.snd_org_code,
                    "ucpidRequestInfo" : {
                        "ucpidNonce" : attcC,
                        "userAgreement" : "금융분야 마이데이터 통합인증을 위한 인증서 본인확인서비스 이용약관, 개인정보처리, 고유식별정보 수집·이용 및 위탁에 동의합니다.", 
                        "ispUrlInfo": import.meta.env.VITE_API_URL,
                        "userAgreeInfo":{
                            "realName" : true,
                            "gender" : true,
                            "nationalInfo": true,
                            "birthDate" : true,
                            "ci" : true
                        }
                    },
                    "consentInfo" : {
                        "consentNonce": attcCext,
                        "consent" : t
                    }
                }));

                this.startSessionTimerAuth();
                let signListOne = [], signListTwo = [];
                let caOrgOne, caOrgTwo;

                const financeConfig = {
                    "content": requestList, // {}
                    "orgCode": import.meta.env.VITE_PRIVATE_ORGCODE,
                    "apiKey" : import.meta.env.VITE_PRIVATE_APIKEY
                }
                if(this.getUserInfo("chnl") === "385") {
                    // 스뱅
                    appService.openPFMOFPFinCert(financeConfig).then(financeResponse => {
                        clearInterval(this.sessionTimerAuthor);
                        console.log("@@@ 스뱅 금융인증서 리턴 값 =>", financeResponse)
                        
                        const signedDataList = financeResponse.result.signedDataList || []
                        for(let i=0; i < signedDataList.length; i++) {
                            signListOne.push({"orgCode": signedDataList[i].orgCode, "signedPersonInfoReq": signedDataList[i].signedPersonInfoReq});
                            signListTwo.push({"orgCode": signedDataList[i].orgCode, "signedConsent": signedDataList[i].signedConsent});
                        }
                        caOrgOne = financeResponse.result.caOrg || '';
                        caOrgTwo = financeResponse.result.caOrg || '';

                        if(!_.isEmpty(signedDataList[0].orgCode) && !_.isEmpty(signedDataList[0].signedPersonInfoReq)
                        && !_.isEmpty(signedDataList[0].signedConsent) && !_.isEmpty(financeResponse.result.caOrg)) {
                            // 성공
                            this.signResult = 'Y'
                            this.fnTransfer()
                        }
                        
                    })
                    .catch(error => {
                        clearInterval(this.sessionTimerAuthor);
                        modalService.alert(error);
                    });
                } else {
                    // 콕뱅
                    appService.cokBankOpenPFMOFPFinCert(financeConfig).then(financeResponse => {
                        clearInterval(this.sessionTimerAuthor);
                        if(financeResponse.errorMessage !== undefined) {
                            return false;
                        }
                        console.log("@@@ 콕뱅 금융인증서 리턴 값 =>", financeResponse)
                        const signedDataList = JSON.parse(financeResponse.result).signedDataList || [];
                        for(let i=0; i<signedDataList.length; i++) {
                            signListOne.push({"orgCode": signedDataList[i].orgCode, "signedPersonInfoReq": signedDataList[i].signedPersonInfoReq});
                            signListTwo.push({"orgCode": signedDataList[i].orgCode, "signedConsent": signedDataList[i].signedConsent});
                        }
                        caOrgOne = JSON.parse(financeResponse.result).caOrg || '';
                        caOrgTwo = JSON.parse(financeResponse.result).caOrg || '';

                        if(!_.isEmpty(signedDataList[0].orgCode) && !_.isEmpty(signedDataList[0].signedPersonInfoReq)
                        && !_.isEmpty(signedDataList[0].signedConsent) && !_.isEmpty(caOrgOne)) {
                            // 성공
                            this.signResult = 'Y'
                            this.fnTransfer()
                        }

                    });
                }
            })
            ///////////////////////////////////////////////////////////////////////////////////////////
        },

        fnTransfer() {
            let now = new Date()
            let yy = now.getFullYear()
            let mm  = this.fnLpad((now.getMonth() + 1),2,"0")
            let dd  = this.fnLpad(now.getDate(),2,"0")
            let hh  = this.fnLpad(now.getHours(),2,"0")
            let mi  = this.fnLpad(now.getMinutes(),2,"0")
            let sysdtm = yy+mm+dd+hh+mi
            
            // ※ 계좌 잔고가 0인 경우 이미 숨은자산 목록에서 리턴 시키기 때문에 처리구분이 C인 경우가 나올 수 없음
            /* 계좌해지 및 잔액이전 API
            
            // - 계좌해지 거래 : 처리 구분 'C'(계좌해지)
            //  + 계좌 잔고가 '0인'경우
            //  + 제공기관은 계좌해지만 수행함, 다만 실제 해지 정산 시 지급익이 존재하는 경우 해지처리하지 않고, 해당되는 해지 결과 코드를 설정하여 응답

            // - 계좌해지 및 잔고이전 거래 - 처리 구분 'T'(계좌해지 및 잔고이전)
            //  + 계좌 잔고가 존재하는 경우
            //  + 제공기관은 계좌해지 및 잔고이전을 수행

            */
            const config2 = {
                url: '/as/tn/12r01',
                data: {
                    transfer_type      : 'C',                            // 처리 구분(T:계좌 잔고가 존재하는 경우, C:계좌 잔고가 0인 경우)
                    bank_code          : this.paramObj.bankCode,         // 개설 금융회사 코드
                    account_num        : this.paramObj.accountNum,       // 계좌 번호
                    deposit_sequence   : this.paramObj.depositSequence,  // 예금 회차 번호
                    account_type       : this.accountType,               // 계좌 종류(1:수시입출금, 2:예금)
                    recipient_type     : null,                           // 잔고이전 구분
                    recv_bank_code     : null,                           // 수취 금융회사 코드
                    recv_account_num   : null,                           // 수취 계좌번호
                    recv_name          : null,                           // 수취 계좌 예금주명
                    recv_branch_code   : null,                           // 수취 계좌 관리점 코드
                    recv_account_memo  : null,                           // 수취 계좌 기록사항(처리구분과 잔고이전구분이 모두 T인 경우)
                    customer_phone_num : this.customerPhoneNum,          // 고객 전화번호
                    receipt_yn         : null,                           // 기부금 영수증 발급 여부
                    per_info_yn        : null,                           // 제3자 제공동의 여부
                    sign_type          : '01',                           // 전자서명 인증종류(01:금융인증서(금융결제원))
                    sign_result        : this.signResult,                // 전자서명 결과
                    sign_dtm           : sysdtm,                         // 전자서명 일시
                    termination_id     : this.terminationId,             // 거래검증ID
                    mydt_cusno         : this.getUserInfo("mydtCusno"),  // 마이데이터고객번호
                    identity_num       : this.isDev ? "9002011243111" : null,                // 실명번호 테스트를 위해 세팅
                }
            }
            
            apiService.call(config2).then(response2 =>{
                //if(response2.rsp_code == '0000') { // 정상 처리
                    if(response2.termination_result_type == '1' && response2.termination_result_code == '0000') { // 해지가 정상적으로 되었으면~
                        // 해지결과안내 팝업 호출

                        let now = new Date()
                        let yy = now.getFullYear()
                        let mm  = this.fnLpad((now.getMonth() + 1),2,"0")
                        let dd  = this.fnLpad(now.getDate(),2,"0")

                        
                        let comName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4014/ASTN4014"))

                        const config = {
                            component : comName,
                            params : {
                                dsc                   : '02',                              // 해지완료 후 팝업 열기
                                terminationResultType : response2.termination_result_type, // 해지 결과 코드 구분
                                terminationResultCode : response2.termination_result_code, // 해지 결과 코드 구분
                                recipientResultType   : response2.recipient_result_type,   // 잔고이전 결과코드 구분
                                recipientResultCode   : response2.recipient_result_code,   // 잔고이전 결과코드
                                //terminationDtm        : yy+mm+dd,                          // 해지일자(오늘)
                                terminationDtm        : response2.api_trx_dtm.substr(0,8), // H 거래일시(밀리세컨드)
                                prodName              : response2.prod_name,               // 상품명
                                accountName           : response2.account_name,            // 계좌 예금주명
                                openingDate           : response2.opening_date,            // 개설 일자
                                maturityDate          : response2.maturity_date,           // 만기 일자
                                accountBalance        : response2.accoun_bBalance,         // 원금(잔액)
                                incomeTax             : response2.income_tax,              // 소득세
                                localTax              : response2.local_tax,               // 지방 소득세
                                additionalTax         : response2.additional_tax,          // 추징 소득세
                                otherTax              : response2.other_tax,               // 기타 세금
                                interest              : response2.interest,                // 이자(신탁 이익)
                                penalty               : response2.penalty,                 // 과징금
                                transferFee           : response2.transfer_fee,            // 이체 수수료
                                paymentAmount         : response2.payment_amount,          // 지급액
                                recipientType         : null,                              // 잔고이전 구분
                                receiptYn             : null,                              // 기부영수증 발급여부

                                accountNum            : this.paramObj.accountNum,          // 계좌 번호
                                accountType           : this.accountType,                  // 계좌 종류
                                infOfrmnOrgC          : this.paramObj.infOfrmnOrgC,        // 정보제공자기관코드
                                infOfrmnOrgNm         : this.paramObj.infOfrmnOrgNm,       // 정보제공자기관코드명
                                recvBankCode          : null,                              // 수취 금융회사 코드
                                recvAccountNum        : null,                              // 수취 계좌번호
                                recvInfoOfrmnOrgCNm   : null                               // 수취 기관코드명
                            }
                        }

                        modalService.openPopup(config).then(() => {
                            //this.getData();
                        })
                    } else {
                        modalService.alert(response2.rsp_message).then(() => {
                            this.closeAllData('refresh')
                        })
                        // 메시지 띄우고
                        // => 팝업 다 닫기
                        //this.closeAll()
                    }

                /*
                } else {
                    modalService.alert(response2.rsp_message).then(() => {
                        this.closeAll()
                    })
                    
                }
                */
                
            })
        },

        startSessionTimerAuth() {
			this.sessionTimerAuthor = setInterval(() => {
				this.$store.dispatch('config/extendSession')

				//pfm 로그인 연장을 위한 더미 API콜 처리
				const config = {
					url: '/co/co/00r06',
					data: { "mydtCusno" : this.getUserInfo('mydtCusno'), },
					disableLoading : true,
				}
				apiService.call(config).then(() =>{ });
			}, 30*1000);
		},

        /* 기부 약관 동의 */
        fnCallDonation() {
            this.close({perInfoYn: this.paramObj.receiptYn == 'Y' ? 'Y' : 'N'})
        },
        /* 금융인증서 약관 동의 */
        fnCallFinance() {
            
        },
        /* KCB 약관 동의 */
        fnCallKCB() {
            this.close('success')
        },
        fnLpad(v, len, pv) {
            v = v + '';
            return v.length >= len ? v : new Array(len - v.length + 1 ).join(pv) + v;
        },


    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>