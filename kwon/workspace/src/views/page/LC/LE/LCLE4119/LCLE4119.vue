<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 선불카드
* @ 페이지설명 : 지출 > 지출내역 > 선불카드 지출내역 슬라이드 팝업
* @ 파일명     : src/views/page/LC/LE/LCLE4119/LCLE4119.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-06-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-03              CS515937              최초작성
* 2023-08-29              CS533571              마이데이터 확대개발 화면ID만 변경(기존 LCLE1108)
* 2025-01-31              CS540687              마이데이터 v4.0
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display:block;" @click.prevent="close()"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <div class="popup_header">
                    <h1>{{cardApvInfo.prcMchtnm}}<span>{{trDtm | dateFilter(trDtmStr)}}</span></h1>          
                </div>
                <div class="popup_content"> <!-- v4 popup_content h1_type02 -->
                    <div class="com_txt_type01">
                        <dl>
                            <dt>이용금액</dt>
                            <dd>
                                <span class="com_number01" v-if="cardApvInfo.stlStsc == '03'">{{cardApvInfo.crcAm | numberFilter}}</span>
                                <span class="com_number01" v-else>{{cardApvInfo.cdUgUsAm | numberFilter}}</span>
                                <em>원</em>
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
                                <span>{{cardApvInfo.stlStscNm}}</span>
                            </dd>
                        </dl>
                        <dl v-if="cardApvInfo.mydtMchtBzno">
                            <dt>사업자등록번호</dt>
                            <dd>
                                <span class="com_number01">{{cardApvInfo.mydtMchtBzno}}</span>
                            </dd>
                        </dl>
                    </div>	
                </div>
                
                <a href="javascript:void(0);" @click.prevent="close()" class="btn_close"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'

    export default {
        name : "LCLE4119",
        data: () => {
            return {
                cardApvInfo : [],   // 선불카드승인내역
                trDtm       : "",   // 승인/정정일시
            }
        },
        computed : {
            trDtmStr() {
                return this.trDtm.length > 8 ? 'YYYY.MM.DD HH:mm:ss' : 'YYYY.MM.DD'
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
                // length check error 때문에 따로 선언해서 사용함
                if(this.cardApvInfo.stlStsc == '03') {
                    this.trDtm = this.cardApvInfo.canDtm
                }
                else { 
                    this.trDtm = this.cardApvInfo.apvDtm
                }
            }
        }
    }
</script>