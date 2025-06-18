<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 해지예상금액확인
* @ 페이지설명 : 자산 > 숨은 자산 > 해지예상금액확인
* @ 파일명     : src/views/page/AS/TN/ASTN4012/ASTN4012.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-17
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-17              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>해지예상금액확인</h1>
		</div>

		<div class="popup_content">
            <section class="close_account">
                <!-- 25-03-10 headline 추가 -->
                <p class="headline">잔액 이전이 가능한<br>해지 예상 금액이에요.</p>
                <!-- //25-03-10 headline 추가 -->
                <div class="board_box">    
                    <h3 class="title">해지 예상금액 확인</h3>        

                    <div class="assets_info">
                        <i class="ico_bank" :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgNm}}</span></i>
                        <div>
                            <strong class="org">{{infOfrmnOrgNm}}</strong>
                            <div class="account"><span class="blind">계좌번호</span>{{accountNum}}</div>
                            <strong class="num"><span class="blind">금액</span>{{accountBalance | numberFilter}}원</strong>
                        </div>
                    </div>
                    <!--
                    <details class="board_box_details">
                        <summary>
                            <span class="show"><span class="">계좌정보</span> 더보기</span>
                            <span class="hide"><span class="blind">계좌정보</span> 닫기</span>
                        </summary>
                        <div class="cont">
                            <ul class="sleep_list">
                                <li><em>지점명</em><span>-</span></li>
                                <li><em>연락처</em><span>-</span></li>
                                <li><em>개설일</em><span>{{fnDateFormat(openingDate)}}</span></li>
                                <li><em>최종입출금일</em><span>2020.02.20</span></li>
                                <li><em>비고</em><span>-</span></li>
                            </ul>
                        </div>
                    </details>
                    -->
                    
                </div>

                <div class="close_info">
                    <h2>상세내역</h2>
                    <div class="board_box">
                        <ul class="sleep_list">
                            <li><em>원금</em><span>{{accountBalance | numberFilter}}원</span></li>
                            <li><em>지급이자</em><span>{{interest | numberFilter}}원</span></li>
                            <li><em>소득세</em><span>{{incomeTax | numberFilter}}원</span></li>
                            <li><em>지방소득세</em><span>{{localTax | numberFilter}}원</span></li>
                            <li><em>추징소득세</em><span>{{additionalTax | numberFilter}}원</span></li>
                            <li><em>기타세금</em><span>{{otherTax | numberFilter}}원</span></li>
                            <li><em>과징금</em><span>{{penalty | numberFilter}}원</span></li>
                            <li><em>수수료</em><span>{{transferFee | numberFilter}}원</span></li>
                            <li><em>지급액</em><span>{{paymentAmount | numberFilter}}원</span></li><!-- 25-03-10 항목추가 -->
                        </ul>
                    </div>
                </div>

                <div class="close_info">
                    <h2>잔액 이전 방법</h2><!-- 25-03-10 문구수정 -->
                    <div class="board_box">
                        <ul class="sleep_list" v-if="recipientType == 'T'">
                            <li><em>구분</em><span>내 계좌로 이체</span></li><!-- 25-03-10 추가 -->
                            <li><em>은행</em><span>{{recvInfoOfrmnOrgCNm}}</span></li>
                            <li><em>계좌번호</em><span>{{recvAccountNum}}</span></li>
                        </ul>
                        <ul class="sleep_list" v-else>
                            <li><em>구분</em><span>서민금융진흥원 기부</span></li>
                            <li><em>기부금영수증</em><span>{{receiptYn == 'Y' ? '발급':'미발급'}}</span></li>
                        </ul>
                    </div>
                </div>


                <details class="ico_detail_noti" open>
                    <summary><strong>알아두세요</strong></summary>
                    <div class="cont">
                        <ul class="dotted_list">
                            <li>신청 후 취소 불가능합니다.</li>
                            <li>본인의 수시입출금식 계좌로 이전 가능합니다.<br>(단, 증권사 계좌의 경우 종합매매 계좌만 가능합니다.)</li>
                        </ul>
                    </div>
                </details>
            </section>
		</div>

        <div class="popup_footer fixed">
			
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" @click.prevent="fnNextPage()">잔고 이전 및 해지신청</button><!-- 25-03-10 문구수정 -->
            </div>
        </div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close({flag:recipientType})"><span class="blind">팝업닫기</span></a>
		
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import appService from '@/service/appService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import {mapActions} from 'vuex'
import {defineAsyncComponent} from 'vue'
import {dateFormat} from '@/utils/date'
import _ from 'lodash'

export default {
    name : "ASTN4012",
    data: () => {
        return {
            param                : {},     // 부모로부터 넘겨받은 파라미터
            prodName             : '',     // 상품명
            accountName          : '',     // 계좌 예금주명
            openingDate          : '',     // 개설 일자
            maturityDate         : '',     // 만기 일자
            accountBalance       : 0,      // 원금(잔액)
            incomeTax            : 0,      // 소득세
            localTax             : 0,      // 지방 소득세
            additionalTax        : 0,      // 추징 소득세
            otherTax             : 0,      // 기타 세금
            interest             : 0,      // 이자(신탁 이익)
            penalty              : 0,      // 과징금
            transferFee          : 0,      // 이체 수수료
            paymentAmount        : 0,      // 지급액
            terminationId        : '',     // 거래검증ID
            signResult           : 'N',    // 금융인증서 결과값
                                 
            transferType         : '',     // 처리 구분
            bankCode             : '',     // 개설 금융회사 코드
            accountNum           : '',     // 계좌 번호
            depositSequence      : '',     // 예금 회차 번호
            accountType          : '',     // 계좌 종류
            recipientType        : '',     // 잔고이전 구분
            recvBankCode         : '',     // 수취 금융회사 코드
            recvAccountNum       : '',     // 수취 계좌번호
            recvName             : '',     // 수취 예금주명
            recvBranchCode       : '',     // 수취 계좌 관리점 코드
            recvAccountMemo      : '',     // 수취 계좌 기록사항
            customerPhoneNum     : '',     // 고객 전화번호
            receiptYn            : '',     // 기부금 영수증 발급 여부
            perInfoYn            : '',     // 제3자 제공동의 여부
                                 
            infOfrmnOrgC         : '',     // 정보제공자기관코드
            infOfrmnOrgNm        : '',     // 정보제공자기관코드명
            recvInfoOfrmnOrgC    : '',     // 수취 정보제공자기관코드
            recvInfoOfrmnOrgCNm  : '',     // 수취 정보제공자기관코드명

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
            this.getData()
        },

        getData() {
            this.prodName            = this.param.prodName                // 상품명
            this.accountName         = this.param.accountName             // 계좌 예금주명
            this.openingDate         = this.param.openingDate             // 개설 일자
            this.maturityDate        = this.param.maturityDate            // 만기 일자
            this.accountBalance      = this.param.accountBalance          // 원금(잔액)
            this.incomeTax           = this.param.incomeTax               // 소득세
            this.localTax            = this.param.localTax                // 지방 소득세
            this.additionalTax       = this.param.additionalTax           // 추징 소득세
            this.otherTax            = this.param.otherTax                // 기타 세금
            this.interest            = this.param.interest                // 이자(신탁 이익)
            this.penalty             = this.param.penalty                 // 과징금
            this.transferFee         = this.param.transferFee             // 이체 수수료
            this.paymentAmount       = this.param.paymentAmount           // 지급액

            this.terminationId       = this.param.terminationId           // 거래검증ID

            this.bankCode            = this.param.bankCode                // 개설 금융회사 코드
            this.accountNum          = this.param.accountNum              // 계좌 번호
            this.depositSequence     = this.param.depositSequence         // 예금 회차 번호
            this.accountType         = this.param.accountType             // 계좌 종류
            this.recipientType       = this.param.recipientType           // 잔고이전 구분
            this.recvBankCode        = this.param.recvBankCode            // 수취 금융회사 코드
            this.recvAccountNum      = this.param.recvAccountNum          // 수취 계좌번호
            this.recvName            = this.param.recvName                // 수취 예금주명
            this.recvBranchCode      = this.param.recvBranchCode          // 수취 계좌 관리점 코드
            this.receiptYn           = this.param.receiptYn               // 기부금 영수증 발급 여부
            this.perInfoYn           = this.param.perInfoYn               // 제3자 제공동의 여부

            this.infOfrmnOrgC        = this.param.infOfrmnOrgC            // 정보제공자기관코드
            this.infOfrmnOrgNm       = this.param.infOfrmnOrgNm           // 정보제공자기관코드명
            this.recvInfoOfrmnOrgC   = this.param.recvInfoOfrmnOrgC       // 수취 정보제공자기관코드
            this.recvInfoOfrmnOrgCNm = this.param.recvInfoOfrmnOrgCNm     // 수취 정보제공자기관코드명
        },

        /* 잔고 이전 및 해지신청 */
        fnNextPage() {
            // 09:00~22:00만 이용 가능
            let now = new Date()
            let hh  = this.fnLpad(now.getHours(),2,"0")
            let mi  = this.fnLpad(now.getMinutes(),2,"0")
            let sysdtm = hh+""+mi

            if(sysdtm < "0900" || sysdtm > "2200") {
                modalService.alert("서비스 제공시간은 09:00 ~ 22:00입니다.")
                this.closeAll()
                //this.close({flag:'svcOut'})
                return
            }

            this.transferType = ''

            if(this.paymentAmount >= 0) {
                this.customerPhoneNum = "" // 본인인증 전화번호 초기화

                if(this.isDev) {
                    // 개발서버
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
                } else {
                    // 운영은 무조건 KCB 본인인증을 진행
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
                
            } else {
                modalService.alert("지급액이 음수이므로 잔고 이전할 수 없는 계좌입니다.").then(() => {
                    this.closeAllData('refresh')
                })
                /*
                let tmpAmt = this.accountBalance-this.incomeTax-this.localTax-this.additionalTax-this.otherTax+this.interest-this.penalty // 수정할수도 있음(2025.04.02)
    
                if(tmpAmt > 0) {
                    //let confirmTxt = "잔고 이전 및 해지 신청이 어렵습니다.<br>기부로 전환하시겠어요?"

                    const config = {
                        content : ["잔고 이전 및 해지 신청이 어렵습니다.<br>기부로 전환하시겠어요?"],
                        title   : "",
                        buttons : [
                            {text: "닫기", class: 'btn btn_grey btn_no'}, // 아니오(취소)
                            {text: "기부하러가기", class: 'btn btn_mint'}, // 예(확인)
                        ]
                    };
                    modalService.alert(config).then(text => {
                        if(text === "닫기") {
                            //this.closeAll()
                            // 모든 
                        } else if(text === "기부하러가기") {
                            this.close({flag:'donation'})
                        }
                    })
                } else {
                    modalService.alert("잔고 이전 및 해지 신청이 어렵습니다.<br/>목록에서 다른 계좌를 확인해보세요.")
                    //modalService.alert("해지가 불가한 계좌입니다.<br/>해당 영업점을 찾아주세요.")
                    this.closeAll()
                    //this.close('impossible')
                    return
                }
                */
                
            }
            /* else {
                modalService.alert("잔고 이전 및 해지 신청이 어렵습니다.<br/>목록에서 다른 계좌를 확인해보세요.")
                //modalService.alert("해지가 불가한 계좌입니다.<br/>해당 영업점을 찾아주세요.")
                this.close('impossible')
				return
            }*/

            
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
                    //if (import.meta.env.VITE_ENV !== 'R' && window.location.host.indexOf('localhost') > -1 ) {
                    if (this.isDev) {
                        // 로컬 또는 개발서버인 경우 금융인증서가 작동하지 않으므로 패스하기 위해
                        modalService.confirm({content:["금융인증서 테스트를 하시겠습니까?"],title:""}).then(text => {
                            if(text == "예") {
                                this.fnFinance()
                            } else {
                                this.signResult = 'Y' // 금융인증서 결과 초기화
                                this.fnTransfer()
                            }
                        })
                    } else {
                        // 운영 서버는 금융인증서를 무조건 호출
                        this.fnFinance()
                    }

                    
                }
            })
                
        },

        fnFinance() {
            ///////////////////////////////////////////////////////////////////////////////////////////
            let now = new Date();
            let yy  = now.getFullYear()
            let mm  = this.fnLpad((now.getMonth() + 1),2,"0")
            let dd  = this.fnLpad(now.getDate(),2,"0")

            this.termsInfo.end_date = yy+mm+dd

            // 금융인증서 관련은 COAR4002, COAR4009 참고!
            let consent = {
                "snd_org_code" : this.infOfrmnOrgC,
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
                        && !_.isEmpty(signedDataList[0].signedConsent) && !_.isEmpty(caOrgOne)) {
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
                        } else {
                            
                        }

                    });
                }
            })
            ///////////////////////////////////////////////////////////////////////////////////////////
        },

        fnTransfer() {
            /*
            if(this.signResult != 'Y') {
                // 금융인증서가 정상적으로 수행되지 않음
            }
            */
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
            //  + 제공기관은 계쫘해지만 수행함, 다만 실제 해지 정산 시 지급익이 존재하는 경우 해지처리하지 않고, 해당되는 해지 결과 코드를 설정하여 응답

            // - 계좌해지 및 잔고이전 거래 - 처리 구분 'T'(계좌해지 및 잔고이전)
            //  + 계좌 잔고가 존재하는 경우
            //  + 제공기관은 계좌해지 및 잔고이전을 수행

            */
            let tmpTransfer = this.accountBalance > 0 ? true : false // true(T):계좌 잔고가 존재하는 경우, false(C):계좌 잔고가 0인 경우
            //tmpTransfer = false // 테스트
            let tmpRecvAccount = tmpTransfer && (this.recipientType == 'T') // (처리구분과 잔고이전구분이 모두 T인 경우)
            let flag = this.recipientType == 'T' ? true : false // 계좌이체면 true, 기부면 false

            const config2 = {
                url: '/as/tn/12r01',
                data: {
                    transfer_type      : tmpTransfer ? 'T':'C',                                   // 처리 구분(T:계좌 잔고가 존재하는 경우, C:계좌 잔고가 0인 경우)
                    bank_code          : this.bankCode,                                           // 개설 금융회사 코드
                    account_num        : this.accountNum,                                         // 계좌 번호
                    deposit_sequence   : this.depositSequence,                                    // 예금 회차 번호
                    account_type       : this.accountType,                                        // 계좌 종류(1:수시입출금, 2:예금)
                    recipient_type     : tmpTransfer ? this.recipientType : null,                 // 잔고이전 구분
                    recv_bank_code     : flag ? tmpTransfer ? this.recvBankCode   : null : null,  // 수취 금융회사 코드
                    recv_account_num   : flag ? tmpTransfer ? this.recvAccountNum : null : null,  // 수취 계좌번호
                    recv_name          : flag ? tmpTransfer ? this.recvName       : null : null,  // 수취 계좌 예금주명
                    recv_branch_code   : flag ? tmpTransfer ? this.recvBranchCode : null : null,  // 수취 계좌 관리점 코드
                    recv_account_memo  : tmpRecvAccount ? "계좌통합이전" : null,                   // 수취 계좌 기록사항(처리구분과 잔고이전구분이 모두 T인 경우)
                    customer_phone_num : this.customerPhoneNum,                                   // 고객 전화번호
                    receipt_yn         : !flag ? this.receiptYn : null,                           // 기부금 영수증 발급 여부
                    per_info_yn        : !flag ? this.perInfoYn : null,                           // 제3자 제공동의 여부
                    sign_type          : '01',                                                    // 전자서명 인증종류(01:금융인증서(금융결제원))
                    sign_result        : this.signResult,                                         // 전자서명 결과
                    sign_dtm           : sysdtm,                                                  // 전자서명 일시
                    termination_id     : this.terminationId,                                      // 거래검증ID
                    mydt_cusno         : this.getUserInfo("mydtCusno"),                           // 마이데이터고객번호
                    identity_num       : this.isDev ? "9002011243111" : null,               // 실명번호 테스트를 위해 세팅
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
                                recipientType         : this.recipientType,                // 잔고이전 구분
                                receiptYn             : this.receiptYn,                    // 기부영수증 발급여부

                                accountNum            : this.accountNum,                   // 계좌 번호
                                accountType           : this.accountType,                  // 계좌 종류
                                infOfrmnOrgC          : this.infOfrmnOrgC,                 // 정보제공자기관코드
                                infOfrmnOrgNm         : this.infOfrmnOrgNm,                // 정보제공자기관코드명
                                recvBankCode          : this.recvBankCode,                 // 수취 금융회사 코드
                                recvAccountNum        : this.recvAccountNum,               // 수취 계좌번호
                                recvInfoOfrmnOrgCNm   : this.recvInfoOfrmnOrgCNm           // 수취 기관코드명
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

        /* 날짜포맷형식 */
        fnDateFormat() {
            if(_.isEmpty(dt) || dt == "00000000") {
                return "-"
            }

            return dateFormat(this.openingDate, 'YYYY.MM.DD')
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