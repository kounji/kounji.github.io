<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 카드 지출내역
* @ 페이지설명 : 지출 > 지출내역 > 카드 지출내역 > 승인내역 슬라이드 팝업
* @ 파일명     : src/views/page/LC/LE/LCLE4112/LCLE4112.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-06-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-03              CS515937              최초작성
* 2025-01-31              CS540687              마이데이터 v4.0
*************************************************************************/
-->
<template>
    <div>
        <div class="dimmed" style="display:block;" @click.prevent="close()"></div>
        <div class="popup_box mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <div class="popup_header">
                    <h1 v-if="cardApvInfo.stlStsc == '03'">{{cardApvInfo.prcMchtnm}}<span>{{cardApvInfo.canDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span></h1>
                    <h1 v-else>{{cardApvInfo.prcMchtnm}}<span>{{cardApvInfo.apvDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span></h1>
                </div>
                <div class="popup_content">
                    <div class="com_txt_type01">
                        <dl>
                            <dt>이용금액</dt>
                            <dd>
                                <span class="com_number01" v-if="isOverseas">{{cardApvInfo.cdApvKrwAm | numberFilter}}</span>
                                <span class="com_number01" v-else>{{cardApvInfo.cdUgUsAm | numberFilter}}</span>
                                <em>원</em>
                            </dd>
                        </dl>
                        <dl v-if="isOverseas">
                            <dt>현지통화/금액</dt>
                            <dd>
                                <span class="com_number01">{{cardApvInfo.cdUgUsAm | numberFilterAuto('0,00.00', {precision: 2}, false)}}{{cardApvInfo.stlCurcNm}}</span>
                            </dd>
                        </dl>
                        <dl v-if="cardApvInfo.stlStsc == '03'">
                            <dt>정정후 금액</dt>
                            <dd>
                                <!-- <span class="com_number_01" v-if="cardApvInfo.stlCurc != '' && cardApvInfo.stlCurc != null && cardApvInfo.stlCurc != 'KRW'">{{cardApvInfo.crcAm | numberFilterAuto('0,00.00', {precision: 2}, false)}} {{cardApvInfo.stlCurcNm}}</span> -->
                                <span class="com_number01">{{cardApvInfo.crcAm | numberFilterAuto('0,00.00', {precision: 2}, false)}}</span>
                                <em>{{isOverseas?cardApvInfo.stlCurcNm:'원'}}</em>
                            </dd>
                        </dl>
                        <dl v-if="cardApvInfo.allIstSc > 1">
                            <dt>전체할부회차</dt>
                            <dd>
                                <span class="com_number01">{{cardApvInfo.allIstSc}}</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>승인번호</dt>
                            <dd>
                                <span class="com_number01">{{cardApvInfo.cdApvno}}</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>결제상태</dt>
                            <dd>
                                <span class="com_ricon_mint" v-if="isOverseas">해외</span>
                                <span>{{cardApvInfo.stlStscNm}}</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>결제유형</dt>
                            <dd>
                                <span>{{cardApvInfo.colCdUgDscNm}}</span>
                            </dd>
                        </dl>
                        <dl v-if="cardApvInfo.mydtMchtBzno">
                            <dt>사업자번호</dt>
                            <dd>
                                <span>{{cardApvInfo.mydtMchtBzno}}</span>
                            </dd>
                        </dl>
                    </div>
                    <div class="com_notice_type02" v-if="isOverseas">
                        <p class="com_bullet com_txt_box dot">해외 이용금액(원화)은 환율 변동으로 인해 청구될 금액과 차이가 있을 수 있습니다.</p>
                    </div>
                </div>
                <a href="javascript:void(0);" @click.prevent="close()" class="btn_close"><span class="">닫기</span></a>
            </div>
        </div>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'

    export default {
        name : "LCLE4112",
        data: () => {
            return {
                cardApvInfo : [] // 카드승인내역
            }
        },
        computed : {
            // 해외 승인여부
            isOverseas() {
                return (this.cardApvInfo.stlCurc != '' && this.cardApvInfo.stlCurc != null && this.cardApvInfo.stlCurc != 'KRW')?true:false
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        mounted() {
            this.initComponent(this.params);

            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {
            initComponent(param) {
                this.cardApvInfo = param;
            }
        }
    }
</script>