<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 카드,페이머니,선불카드,선불 지출내역 > 상세
* @ 페이지설명 : 지출 > 지출내역 > 카드,페이머니,선불카드,선불 지출내역 > 상세 슬라이드팝업
* @ 파일명     : src/components/LC/LE/CMM/CmmXpsDetailInfo.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-19              CS533571                 최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display:block;" @click.prevent="close()"></div>
        <div class="popup_box mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <div class="popup_header">
                    <strong class="titH4">{{info.prcMchtnm}}</strong>
                    <p class="details_date">{{dtm | dateFilter(dtmFmt)}}</p>         
                </div>
                <div class="popup_content">
                    <template v-if="type == TYPE_PAY && subtype == SUBTYPE_PAYMONEY">
                        <cmm-xps-detail-info-paymoney :info="info" />
                    </template>
                    <template v-else-if="type == TYPE_PAY && subtype == SUBTYPE_PPAYCARD">
                        <cmm-xps-detail-info-ppaycard :info="info" />
                    </template>
                    <template v-else-if="type == TYPE_PPAY">
                        <cmm-xps-detail-info-ppay :info="info" />
                    </template>

                    <div class="com_notice_type02" v-if="isOverseas">
                        <p class="com_bullet com_txt_box dot">해외 이용금액(원화)은 환율 변동으로 인해 청구될 금액과 차이가 있을 수 있습니다.</p>
                    </div>
                </div>
                
                <a href="javascript:void(0);" @click.prevent="close()" class="btn_close"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import CmmXpsDetailInfoPaymoney from '@/components/LC/LE/CMM/CmmXpsDetailInfoPaymoney'
import CmmXpsDetailInfoPpaycard from '@/components/LC/LE/CMM/CmmXpsDetailInfoPpaycard'
import CmmXpsDetailInfoPpay from '@/components/LC/LE/CMM/CmmXpsDetailInfoPpay'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

const TYPE_CARD = 'CARD'                // 카드 지출내역
const TYPE_PAY = 'PAY'                  // 페이 지출내역
const SUBTYPE_PAYMONEY = 'PAYMONEY'     // 페이 - 페이머니 지출내역
const SUBTYPE_PPAYCARD = 'PPAYCARD'     // 페이 - 선불카드 지출내역
const TYPE_PPAY = 'PPAY'                // 선불 결제내역

export default {
    name : "CmmXpsDetailInfo",
    components: {
        CmmXpsDetailInfoPaymoney,
        CmmXpsDetailInfoPpaycard,
        CmmXpsDetailInfoPpay
    },
    data: () => {
        return {
            TYPE_CARD,
            TYPE_PAY,
            SUBTYPE_PAYMONEY,
            SUBTYPE_PPAYCARD,
            TYPE_PPAY,
            type : "",         // 지출내역 종류
            subtype : "",      // 지출내역 하위종류
            info : {}             // 카드승인내역
        }
    },
    props: {
        typeProp: {
            type: String,
            required: true
        },
        subtypeProp: {
            type: String,
            required: true
        }
    },
    computed : {
        // 해외 승인여부
        isOverseas() {
            if(this.type == TYPE_CARD) {
                return (this.info.stlCurc != '' && this.info.stlCurc != null && this.info.stlCurc != 'KRW')?true:false
            } else {
                return false
            }
        },
        dtmFmt() {
            let dtmFmt = ""
            if(this.type == TYPE_PAY) {
                dtmFmt = this.info.trDtm.length > 8 ? 'YYYY.MM.DD HH:mm:ss' : 'YYYY.MM.DD'
            } else if(this.type == TYPE_PPAY) {
                dtmFmt = this.info.eltfncStlDtm.length > 8 ? 'YYYY.MM.DD HH:mm:ss' : 'YYYY.MM.DD'
            } else {
                dtmFmt = 'YYYY.MM.DD HH:mm:ss'
            }

            return dtmFmt
        },
        dtm() {
            let dtm = ""
            if(this.type == TYPE_PAY) {
                dtm = this.info.trDtm
            } else if(this.type == TYPE_PPAY) {
                dtm = this.info.eltfncStlDtm
            } else {
                if(this.info.stlStsc == '03') {
                    dtm = this.info.canDtm
                } else {
                    dtm = this.info.apvDtm
                }
            }

            return dtm
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params);
    },
    methods: {
        initComponent(param) {
            this.type = this.typeProp
            this.subtype = this.subtypeProp
            if(this.type == TYPE_PPAY) {
                this.info = param.useHistoryList
            }else{
                this.info = param
            }
        }
    }
}
</script>