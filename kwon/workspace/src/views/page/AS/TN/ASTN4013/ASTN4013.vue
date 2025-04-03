<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 해지결과안내
* @ 페이지설명 : 자산 > 숨은 자산 > 해지결과안내
* @ 파일명     : src/views/page/AS/TN/ASTN4013/ASTN4013.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-20
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-10              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>해지계좌조회</h1>
			<button type="button" class="prev"><span class="blind">이전</span></button>
		</div>

		<div class="popup_content">
            <section class="sleep_details">
				<p class="inquiry_date">해지일 2025.02.21</p>
                <div class="board_box">
                    <h2 class="title">
                        <i :class="'ico_bank '+infOfrmnOrgC"></i>
                        {{infOfrmnOrgNm}} {{prodName}}
                    </h2>

                    <div class="outline">
                        <span class="account">{{accountnum}}</span>
                        <span class="num">{{paymentAmount | numberFilter}}원</span>
                    </div>

                    <ul class="sleep_list">
						<li><em>금융기관</em><span>{{infOfrmnOrgNm}}</span></li>
                        <li><em>신규일</em><span>{{openingDate}}</span></li>
                        <li><em>만기일</em><span>{{maturityDate}}</span></li>
                        <li><em>처리구분</em><span>잔고이전</span></li>
                        <li><em>입금계좌</em><span>{{recvAccountNum}}</span></li>
                    </ul>

                    <ul class="sleep_list">
                        <li><em>원금</em><span>{{accountBalance}}원</span></li>
                        <li><em>해지이자</em><span>23,000원</span></li>
                        <li><em>세금합계</em><span>23,000원</span></li>
                        <li><em>세후이자</em><span>23,000원</span></li>
                        <li><em>이체수수료</em><span>23,000원</span></li>
                        <li><em>실수령액</em><span>23,000원</span></li>
                    </ul>
                </div>
            </section>
		</div>
		<!-- 25-03-10 확인 버튼 추가 -->
		<div class="popup_footer fixed">
            <div class="btn_full_box">
				<button type="button" class="btns lg primary">확인</button>
            </div>
        </div>
		<!-- //25-03-10 확인 버튼 추가 -->

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
import _ from 'lodash'

export default {
    name : "ASTN4013",
    data: () => {
        return {
            terminationResultType : '', // 해지 결과 코드 구분
            terminationResultCode : '', // 해지 결과 코드 구분
            recipientResultType   : '', // 잔고이전 결과코드 구분
            recipientResultCode   : '', // 잔고이전 결과코드
            prodName              : '', // 상품명
            accountName           : '', // 계좌 예금주명
            openingDate           : '', // 개설 일자
            maturityDate          : '', // 만기 일자
            accountBalance        : 0,  // 원금(잔액)
            incomeTax             : 0,  // 소득세
            localTax              : 0,  // 지방 소득세
            additionalTax         : 0,  // 추징 소득세
            otherTax              : 0,  // 기타 세금
            interest              : 0,  // 이자(신탁 이익)
            penalty               : 0,  // 과징금
            transferFee           : 0,  // 이체 수수료
            paymentAmount         : 0,  // 지급액

            infOfrmnOrgC          : '', // 정보제공자기관코드
            infOfrmnOrgNm         : '', // 정보제공자기관코드명
            recvBankCode          : '', // 수취 금융회사 코드
            recvAccountNum        : '', // 수취 계좌번호

            recvBankCodeNm        : '', // 수취 금융회사 코드명
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
            this.terminationResultType = param.terminationResultType, // 해지 결과 코드 구분
            this.terminationResultCode = param.terminationResultCode, // 해지 결과 코드 구분
            this.recipientResultType   = param.recipientResultType,   // 잔고이전 결과코드 구분
            this.recipientResultCode   = param.recipientResultCode,   // 잔고이전 결과코드
            this.prodName              = param.prodName,              // 상품명
            this.accountName           = param.accountName,           // 계좌 예금주명
            this.openingDate           = param.openingDate,           // 개설 일자
            this.maturityDate          = param.maturityDate,          // 만기 일자
            this.accountBalance        = param.accountBalance,        // 원금(잔액)
            this.incomeTax             = param.incomeTax,             // 소득세
            this.localTax              = param.localTax,              // 지방 소득세
            this.additionalTax         = param.additionalTax,         // 추징 소득세
            this.otherTax              = param.otherTax,              // 기타 세금
            this.interest              = param.interest,              // 이자(신탁 이익)
            this.penalty               = param.penalty,               // 과징금
            this.transferFee           = param.transferFee,           // 이체 수수료
            this.paymentAmount         = param.paymentAmount,         // 지급액

            this.infOfrmnOrgC          = param.infOfrmnOrgC,          // 정보제공자기관코드
            this.infOfrmnOrgNm         = param.infOfrmnOrgNm,         // 정보제공자기관코드명
            this.recvBankCode          = param.recvBankCode,          // 수취 금융회사 코드
            this.recvAccountNum        = param.recvAccountNum,        // 수취 계좌번호
            this.getData()
        },

        getData() {
            const config = {
                url: '/co/co/00r01',
                data: {
                    comnCId   : "REP_NBNK_C", // 은행코드
					delYn     : '0'           // 삭제여부
                }
            }

            apiService.call(config).then(response => {
                this.recvBankCodeNm = response.comnCList.comnCExpl // 은행명
            })
        }

    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>