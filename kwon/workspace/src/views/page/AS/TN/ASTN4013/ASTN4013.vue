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
			<!-- <button type="button" class="prev"><span class="blind">이전</span></button> -->
		</div>

		<div class="popup_content">
            <section class="sleep_details">
				<p class="inquiry_date">해지일 {{fnDateFormat(terminationDate)}}</p>
                <div class="board_box">
                    <h2 class="title">
                        <i :class="'ico_bank '+infOfrmnOrgC"></i><span class="blind">{{infOfrmnOrgNm}}</span>
                        {{infOfrmnOrgNm}} {{prodName}}
                    </h2>

                    <div class="outline">
                        <span class="account"><span class="blind">계좌번호</span>{{accountNum}}</span>
                        <span class="num"><span class="blind">금액</span>{{paymentAmount | numberFilter}}원</span>
                    </div>

                    <ul class="sleep_list">
                        <li><em>계좌번호</em><span>{{accountNum}}</span></li>
                        <li><em>개설일자</em><span>{{fnDateFormat(openingDate)}}</span></li>
                        <li><em>만기일자</em><span>{{fnDateFormat(maturityDate)}}</span></li>
                        <!-- <li><em>계좌 종류</em><span>{{accountType=='1'?'수시입출금':'예적금'}}</span></li> -->
                        <li><em>원금</em><span>{{accountBalance| numberFilter}}원</span></li>

						<li><em>지급이자</em><span>{{interest| numberFilter}}원</span></li>
                        <li><em>소득세</em><span>{{incomeTax| numberFilter}}원</span></li>
                        <li><em>지방소득세</em><span>{{localTax| numberFilter}}원</span></li>
                        <li><em>추징소득세</em><span>{{additionalTax| numberFilter}}원</span></li>
                        <li><em>기타세금</em><span>{{otherTax| numberFilter}}원</span></li>
                        <li><em>과징금</em><span>{{penalty| numberFilter}}원</span></li>
                        <li><em>수수료</em><span>{{transferFee| numberFilter}}원</span></li>
                        <li><em>지급액</em><span>{{paymentAmount| numberFilter}}원</span></li>
                        <li><em>잔액이전 구분</em><span>{{recipientType == 'T' ? '내 계좌이체' : '서민금융진흥원 기부'}}</span></li>
                        <template v-if="recipientType == 'T'">
                        <li><em>수취 금융회사</em><span>{{recvBankCodeNm}}</span></li>
                        <li><em>수취 계좌번호</em><span>{{recvAccountNum}}</span></li>
                        </template>
                    </ul>
                </div>
            </section>
		</div>
		<!-- 25-03-10 확인 버튼 추가 -->
		<div class="popup_footer fixed">
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" @click.prevent="close()">확인</button>
            </div>
        </div>
		<!-- //25-03-10 확인 버튼 추가 -->

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
import {mapActions} from 'vuex'
import _ from 'lodash'
import {dateFormat} from '@/utils/date'
import Template from '../../../XX/template/template.vue'

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
            terminationDate       : "", // 해지일자
            recipientType         : "", // 잔액이전 구분

            accountNum            : "", // 해지계좌번호
            accountType           : "", // 계좌종류

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
            if(!_.isEmpty(param)) {
                // 해지 후 결과 조회
                let now = new Date()
                let yyyy = now.getFullYear()
                let mm  = this.fnLpad((now.getMonth() + 1),2,"0")
                let dd  = this.fnLpad(now.getDate(),2,"0")

                this.terminationResultType = param.terminationResultType, // 해지 결과 코드 구분
                this.terminationResultCode = param.terminationResultCode, // 해지 결과 코드 구분
                this.recipientResultType   = param.recipientResultType,   // 잔고이전 결과코드 구분
                this.recipientResultCode   = param.recipientResultCode,   // 잔고이전 결과코드
                this.prodName              = param.prodName,              // 상품명
                this.accountName           = param.accountName,           // 계좌 예금주명
                this.openingDate           = param.openingDate,           // 개설 일자
                this.maturityDate          = param.maturityDate,          // 만기 일자
                this.terminationDate       = param.terminationDate,       // 해지일자
                this.accountBalance        = param.accountBalance,        // 원금(잔액)
                this.incomeTax             = param.incomeTax,             // 소득세
                this.localTax              = param.localTax,              // 지방 소득세
                this.additionalTax         = param.additionalTax,         // 추징 소득세
                this.otherTax              = param.otherTax,              // 기타 세금
                this.interest              = param.interest,              // 이자(신탁 이익)
                this.penalty               = param.penalty,               // 과징금
                this.transferFee           = param.transferFee,           // 이체 수수료
                this.paymentAmount         = param.paymentAmount,         // 지급액
                this.recipientType         = param.recipientType,         // 잔고이전 구분

                this.accountNum            = param.accountNum,            // 계좌번호
                this.accountType           = param.accountType,           // 계좌종류

                this.infOfrmnOrgC          = param.infOfrmnOrgC,          // 정보제공자기관코드
                this.infOfrmnOrgNm         = param.infOfrmnOrgNm,         // 정보제공자기관코드명
                this.recvBankCode          = param.recvBankCode,          // 수취 금융회사 코드
                this.recvAccountNum        = param.recvAccountNum         // 수취 계좌번호

            }

            this.getData()
        },

        getData() {
            const config1 = {
                url: '/as/tn/01r03',
                data: {
                    inqDsc  : '1',               // 1:기관코드->은행코드, 2:은행코드->기관코드
                    inqCd   : this.infOfrmnOrgC  // 정보제공자기관코드
                }
            }
            apiService.call(config1).then(response =>{
                this.recvBankCodeNm = response.bnkList[0].infOfrmnOrgNm   // 은행코드명
            })

        },

        fnDateFormat(dt) {
            if(_.isEmpty(dt) || dt == "00000000") {
                return "-"
            }

            let tmpDt = dt.replace(/[^0-9]/g, '');

            if(_.isEmpty(tmpDt)) {
                return "-"
            } else {
                return dateFormat(tmpDt, 'YYYY.MM.DD')
            }
            
        },
        fnLpad(v, len, pv) {
            v = v + '';
            return v.length >= len ? v : new Array(len - v.length + 1 ).join(pv) + v;
        },

    },
    components : {

    },
}

</script>