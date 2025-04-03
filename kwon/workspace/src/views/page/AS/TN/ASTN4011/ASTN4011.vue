<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 해지예상금액확인
* @ 페이지설명 : 자산 > 숨은 자산 > 해지예상금액확인
* @ 파일명     : src/views/page/AS/TN/ASTN4011/ASTN4011.vue
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
                        <i class="ico_bank D1AAJB0000"></i>
                        <div>
                            <strong class="org">K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크</strong>
                            <div class="account">352222302032522</div>
                            <strong class="num">3,758,000원</strong>
                        </div>
                    </div>

                    <details class="board_box_details">
                        <summary>
                            <span class="show"><span class="blind">계좌정보</span> 자세히보기</span><!-- 25-03-10 문구수정 -->
                            <span class="hide"><span class="blind">계좌정보</span> 닫기</span><!-- 25-03-10 문구수정 -->
                        </summary>
                        <div class="cont">
                            <ul class="sleep_list">
                                <li><em>지점명</em><span>-</span></li>
                                <li><em>연락처</em><span>-</span></li>
                                <li><em>개설일</em><span>2020.02.20</span></li>
                                <li><em>최종입출금일</em><span>2020.02.20</span></li>
                                <li><em>비고</em><span>-</span></li>
                            </ul>
                        </div>
                    </details>

                    
                </div>

                <div class="close_info">
                    <h2>상세내역</h2>
                    <div class="board_box">
                        <ul class="sleep_list">
                            <li><em>원금</em><span>1,234,567,891원</span></li>
                            <li><em>지급이자</em><span>10,000,000원</span></li>
                            <li><em>소득세</em><span>0원</span></li>
                            <li><em>지방소득세</em><span>0원</span></li>
                            <li><em>추징소득세</em><span>0원</span></li>
                            <li><em>기타세금</em><span>0원</span></li>
                            <li><em>과징금</em><span>0원</span></li>
                            <li><em>수수료</em><span>0원</span></li>
                            <li><em>지급액</em><span>0원</span></li><!-- 25-03-10 항목추가 -->
                        </ul>
                    </div>
                </div>

                <div class="close_info">
                    <h2>잔액 이전 방법</h2><!-- 25-03-10 문구수정 -->
                    <div class="board_box">
                        <ul class="sleep_list">
                            <li><em>구분</em><span>내 계좌로 이체</span></li><!-- 25-03-10 추가 -->
                            <li><em>은행</em><span>카카오뱅크</span></li>
                            <li><em>계좌번호</em><span>214210757669</span></li>
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

		<a href="#nolink" role="button" class="btn_close"><span class="blind">팝업닫기</span></a>
		
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import {mapActions} from 'vuex'
import {defineAsyncComponent} from 'vue'
import _ from 'lodash'

export default {
    name : "ASTN4011",
    data: () => {
        return {
            param            : {},      // 부모로부터 넘겨받은 파라미터
            prodName         : '',      // 상품명
            accountName      : '',      // 계좌 예금주명
            openingDate      : '',      // 개설 일자
            maturityDate     : '',      // 만기 일자
            accountBalance   : 0,       // 원금(잔액)
            incomeTax        : 0,       // 소득세
            localTax         : 0,       // 지방 소득세
            additionalTax    : 0,       // 추징 소득세
            otherTax         : 0,       // 기타 세금
            interest         : 0,       // 이자(신탁 이익)
            penalty          : 0,       // 과징금
            transferFee      : 0,       // 이체 수수료
            paymentAmount    : 0,       // 지급액
                             
            apiOrgCode       : '',      // 이용기관코드
            transferType     : '',      // 처리 구분
            bankCode         : '',      // 개설 금융회사 코드
            accountNum       : '',      // 계좌 번호
            depositSequence  : '',      // 예금 회차 번호
            accountType      : '',      // 계좌 종류
            recipientType    : '',      // 잔고이전 구분
            recvBankCode     : '',      // 수취 금융회사 코드
            recvAccountNum   : '',      // 수취 계좌번호
            recvName         : '',      // 수취 예금주명
            recvBranchCode   : '',      // 수취 계좌 관리점 코드
            recvAccountMemo  : '',      // 수취 계좌 기록사항
            customerPhoneNum : '',      // 고객 전화번호
            receiptYn        : '',      // 기부금 영수증 발급 여부
            perInfoYn        : '',      // 제3자 제공동의 여부

            infOfrmnOrgC     : '',      // 정보제공자기관코드
            infOfrmnOrgNm    : ''       // 정보제공자기관코드명
            
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
            this.prodName        = this.param.prodName                // 상품명
            this.accountName     = this.param.accountName             // 계좌 예금주명
            this.openingDate     = this.param.openingDate             // 개설 일자
            this.maturityDate    = this.param.maturityDate            // 만기 일자
            this.accountBalance  = this.param.accountBalance          // 원금(잔액)
            this.incomeTax       = this.param.incomeTax               // 소득세
            this.localTax        = this.param.localTax                // 지방 소득세
            this.additionalTax   = this.param.additionalTax           // 추징 소득세
            this.otherTax        = this.param.otherTax                // 기타 세금
            this.interest        = this.param.interest                // 이자(신탁 이익)
            this.penalty         = this.param.penalty                 // 과징금
            this.transferFee     = this.param.transferFee             // 이체 수수료
            this.paymentAmount   = this.param.paymentAmount           // 지급액

            this.apiOrgCode      = this.param.apiOrgCode              // 이용기관코드
            this.bankCode        = this.param.bankCode                // 개설 금융회사 코드
            this.accountNum      = this.param.accountNum              // 계좌 번호
            this.depositSequence = this.param.depositSequence         // 예금 회차 번호
            this.accountType     = this.param.accountType             // 계좌 종류
            this.recipientType   = this.param.recipientType           // 잔고이전 구분
            this.recvBankCode    = this.param.recvBankCode            // 수취 금융회사 코드
            this.recvAccountNum  = this.param.recvAccountNum          // 수취 계좌번호
            this.recvName        = this.param.recvName                // 수취 예금주명
            this.recvBranchCode  = this.param.recvBranchCode          // 수취 계좌 관리점 코드
            this.receiptYn       = this.param.receiptYn               // 기부금 영수증 발급 여부
            this.perInfoYn       = this.param.perInfoYn               // 제3자 제공동의 여부

            this.infOfrmnOrgC    = this.param.infOfrmnOrgC            // 정보제공자기관코드
            this.infOfrmnOrgNm   = this.param.infOfrmnOrgNm           // 정보제공자기관코드명
        },

        /* 잔고 이전 및 해지신청 */
        fnNextPage() {
            // 09:00~22:00만 이용 가능
            let now = new Date()
            let sysdtm = now.getHours()+""+now.getMinutes()

            if(sysdtm < "0900" || sysdtm > "2200") {
                modalService.alert("서비스 제공시간은 09:00 ~ 22:00입니다.")
                this.close('svcOut')
                return
            }

            this.transferType = ''
            if(this.paymentAmount > 0) {
                this.transferType = 'T'
            } else if(this.paymentAmount == 0) {
                this.transferType = 'C'
            } else {
                modalService.alert("해지가 불가한 계좌입니다.<br/>해당 영업점을 찾아주세요.")
                this.close('impossible')
				return
            }

            // 예적금일 경우
            if(this.accountType == '2') {
                // KCB본인인증 모듈 호출

                // call

                // callback
                if(response.rspC == '0000') {
                    this.fnSelAuth()
                    //this.fnAgreePage()
                }
            } else {
                this.fnSelAuth()
                //this.fnAgreePage()
            }
        },
        fnSelAuth() {
            // 인증서 선택 팝업 호출
            let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4012/ASTN4012"))
            const config = {
                component: compName, 
                params   : {
                        
                    }
            }

            modalService.openPopup(config).then(response => {
                if(response == 'success') {
                    let stltList = [
                            {stltTinm : '인증서 본인확인서비스', stltCntn : ''},
                            {stltTinm : '개인정보 처리', stltCntn : ''},
                            {stltTinm : '고객식별정보 수집이용 및 위탁', stltCntn : ''},
                        ]

                    // 약관 팝업 호출
                    let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4004/ASTN4004"))
                    const config = {
                        component: compName, 
                        params   : {
                                callDsc        : 'F',
                                kbcObj         : this.param,
                                stltList       : stltList
                            }
                    }

                    modalService.openPopup(config).then(response => {
                        if(response == 'success') { // 인증서 약관 동의한 경우
                            // 최종의사확인 전자서명 호출 후 성공하면 아래 코드를 진행
                            // *계좌해지 및 잔액이전 API
                            /*
                            const config = {
                                url: '/as/tn/11r01',
                                data: {
                                    apiOrgCode       : this.apiOrgCode,       // 이용기관코드
                                    transferType     : this.transferType,     // 처리 구분
                                    bankCode         : this.bankCode,         // 개설 금융회사 코드
                                    accountNum       : this.accountNum,       // 계좌 번호
                                    depositSequence  : this.depositSequence,  // 예금 회차 번호
                                    accountType      : this.accountType,      // 계좌 종류(1:수시입출금, 2:예금)
                                    recipientType    : this.recipientType,    // 잔고이전 구분
                                    recvBankCode     : this.recvBankCode,     // 수취 금융회사 코드
                                    recvAccountNum   : this.recvAccountNum,   // 수취 계좌번호
                                    recvName         : this.recvName,         // 수취 계좌 예금주명
                                    recvBranchCode   : this.recvBranchCode,   // 수취 계좌 관리점 코드 
                                    recvAccountMemo  : this.recvAccountMemo,  // 수취 계좌 기록사항
                                    customerPhoneNum : this.customerPhoneNum, // 고객 전화번호
                                    receiptYn        : this.receiptYn,        // 기부금 영수증 발급 여부
                                    perInfoYn        : this.perInfoYn         // 제3자 제공동의 여부
                                }
                            }
                            apiService.call(config).then(response =>{
                                console.log("@@@ response=>", response)
                                if(response.rspC == '0000') { // 정상 처리
                                    let terminationResultType = response.terminationResultType // 해지 결과 코드 구분
                                    let terminationResultCode = response.terminationResultCode // 해지 결과 코드 구분
                                    let recipientResultType   = response.recipientResultType   // 잔고이전 결과코드 구분
                                    let recipientResultCode   = response.recipientResultCode   // 잔고이전 결과코드
                                    let prodName              = response.prodName              // 상품명
                                    let accountName           = response.accountName           // 계좌 예금주명
                                    let openingDate           = response.openingDate           // 개설 일자
                                    let maturityDate          = response.maturityDate          // 만기 일자
                                    let accountBalance        = response.accountBalance        // 원금(잔액)
                                    let incomeTax             = response.incomeTax             // 소득세
                                    let localTax              = response.localTax              // 지방 소득세
                                    let additionalTax         = response.additionalTax         // 추징 소득세
                                    let otherTax              = response.otherTax              // 기타 세금
                                    let interest              = response.interest              // 이자(신탁 이익)
                                    let penalty               = response.penalty               // 과징금
                                    let transferFee           = response.transferFee           // 이체 수수료
                                    let paymentAmount         = response.paymentAmount         // 지급액

                                    // 해지 비트 update

                                    if(response.terminationResultCode == '0000') { // 해지가 정상적으로 되었으면~
                                        const config = {
                                            url: '/as/tn/01r01',
                                            data: {
                                                mydtCusno  : this.getUserInfo("mydtCusno"), // 마이데이터 고객번호
                                                accountnum : this.accountNum,               // 계좌 번호
                                                
                                            }
                                        }
                                        apiService.call(config).then(response =>{
                                            if(response.rspC =- '0000') { // 해지 비트 update에 성공하면
                                                // 해지결과안내 팝업 호출
                                                let comName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4013/ASTN4013"))

                                                const config = {
                                                    component : comName,
                                                    params : {
                                                        terminationResultType : response.terminationResultType, // 해지 결과 코드 구분
                                                        terminationResultCode : response.terminationResultCode, // 해지 결과 코드 구분
                                                        recipientResultType   : response.recipientResultType,   // 잔고이전 결과코드 구분
                                                        recipientResultCode   : response.recipientResultCode,   // 잔고이전 결과코드
                                                        prodName              : response.prodName,              // 상품명
                                                        accountName           : response.accountName,           // 계좌 예금주명
                                                        openingDate           : response.openingDate,           // 개설 일자
                                                        maturityDate          : response.maturityDate,          // 만기 일자
                                                        accountBalance        : response.accountBalance,        // 원금(잔액)
                                                        incomeTax             : response.incomeTax,             // 소득세
                                                        localTax              : response.localTax,              // 지방 소득세
                                                        additionalTax         : response.additionalTax,         // 추징 소득세
                                                        otherTax              : response.otherTax,              // 기타 세금
                                                        interest              : response.interest,              // 이자(신탁 이익)
                                                        penalty               : response.penalty,               // 과징금
                                                        transferFee           : response.transferFee,           // 이체 수수료
                                                        paymentAmount         : response.paymentAmount,         // 지급액

                                                        accountnum            : this.accountNum,                // 계좌 번호
                                                        infOfrmnOrgC          : this.infOfrmnOrgC,              // 정보제공자기관코드
                                                        infOfrmnOrgNm         : this.infOfrmnOrgNm,             // 정보제공자기관코드명
                                                        recvBankCode          : this.recvBankCode,              // 수취 금융회사 코드
                                                        recvAccountNum        : this.recvAccountNum,            // 수취 계좌번호
                                                    }
                                                }

                                                modalService.openPopup(config).then(response => {

                                                })
                                            }
                                        })
                                    }


                                } else {

                                }

                            })
                            */
                        }
                    })
                }
            })
        },

    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>