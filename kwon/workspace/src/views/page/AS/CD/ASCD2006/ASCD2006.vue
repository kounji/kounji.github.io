<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 카드 > 카드 승인정보
* @ 페이지설명 : 나의자산 > 부채 > 카드 > 카드 승인정보
* @ 파일명     : src/views/page/AS/CD/ASCD2006/ASCD2006.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-06-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-14              CS515937              최초작성
* 2022-06-27              CS533045              AS/LN/ASLN1116/ASLN1116.vue -> AS/CD/ASCD2006/ASCD2006.vue 변경
*************************************************************************/
-->
<template>
    <div>
        <div class="dimmed" style="display:block;" v-on:click.prevent="close()"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <div class="popup_header">
                    <h1>{{cardBillInfo.prcMchtnm}}
                        <span>{{ugDtm | dateFilter(ugDtmStr)}}</span>
                        <!-- <span v-if="ugDtm.length === 8">{{ugDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span>
                        <span v-else>{{ugDtm | dateFilter('YYYY.MM.DD')}}</span> -->
                    </h1>
                </div>
                <div class="popup_content h1_type02">
                    <div class="com_txt_type01">
                        <dl>
                            <dt>카드</dt>
                            <dd>
                                <span class="com_txt01">{{cdcoCdWrsnm}}</span>
                                <span class="com_number02">{{cdcoCdNo | maskingFilter('card')}}</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>이용금액</dt>
                            <dd>
                                <span class="com_number01">{{cardBillInfo.cdUgUsAm | numberFilter}}</span>
                                <em>{{(cardBillInfo.curc=='KRW')?'원':getCurcNm(cardBillInfo.curc)}}</em>
                            </dd>
                        </dl>
                        <dl>
                            <dt>수수료</dt>
                            <dd>
                                <span class="com_number01">{{cardBillInfo.cdCrdselFee | numberFilter}}</span>
                                <em>원</em>
                            </dd>
                        </dl>
                        <dl>
                            <dt>상품구분</dt>
                            <dd>
                                <span>{{getCdWrsDscNm(cardBillInfo.cdWrsDsc)}}</span>
                            </dd>
                        </dl>
                        <template v-if="cardBillInfo.cdWrsDsc == '02'">
                        <dl>
                            <dt>할부/현재회차</dt>
                            <dd>
                                <span class="num">{{cardBillInfo.allIstSc}}</span>개월/
                                <span class="num">{{cardBillInfo.nowIstSc}}</span>회차
                            </dd>
                        </dl>
                        <dl>
                            <dt>할부 결제후 잔액</dt>
                            <dd>
                                <span class="com_number01">{{cardBillInfo.istStlAfBac | numberFilter}}</span>
                                <em>원</em>
                            </dd>
                        </dl>
                        </template>
                    </div>
                </div>
                <a href="javascript:void(0);" v-on:click.prevent="close()" class="btn_close"><span class="">닫기</span></a>
            </div>
        </div>
    </div>
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

export default {
    name : "ASCD2006",
    data: () => {
        return {
            cdcoCdWrsnm     : "",  // 카드사카드상품명 
            cdcoCdNo        : "",  // 카드번호
            cardBillInfo    : [],  // 카드이용내역
            ugDtm           : "",  // 사용일시
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    computed : {
        ugDtmStr() {
            return this.ugDtm.length > 8 ? 'YYYY.MM.DD HH:mm:ss' : 'YYYY.MM.DD'
        }
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param) {
            this.cdcoCdWrsnm    = param.cdcoCdWrsnm || ''
            this.cdcoCdNo       = param.cdcoCdNo || ''
            this.cardBillInfo   = param.cardBillInfo || []
            // length check error 발생해서 따로 변수 선언 후 사용함
            this.ugDtm          = param.cardBillInfo.ugDtm || ''
        },

        // 카드-상품구분코드
        getCdWrsDscNm(cVal) {
            let cmmLnList = this.getCodeList("CD_WRS_DSC")
            for(var i=0; i<cmmLnList.length; i++) {
                if(cVal === cmmLnList[i].comnCVal) {
                    return cmmLnList[i].comnCExpl
                }
            }
        },

        // 통화코드
        getCurcNm(cVal) {
            let cmmLnList = this.getCodeList("CURC")
            for(var i=0; i<cmmLnList.length; i++) {
                if(cVal === cmmLnList[i].comnCVal) {
                    return cmmLnList[i].refCntn1
                }
            }
        },

    }
}
</script>