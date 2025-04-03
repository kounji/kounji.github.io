<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 카드,페이머니,선불카드 지출내역
* @ 페이지설명 : 지출 > 지출내역 > 카드,페이머니,선불카드 지출내역 검색 슬라이드팝업
* @ 파일명     : src/components/LC/LE/CMM/CmmXpsDetailSearch.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-18              CS533571                 최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click.prevent="close()"></div>
        <div class="popup_box renewal mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>조건 검색</h1>
                    <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
                </div>
                <div class="popup_content com_btn_bottom">
                    <div class="com_input_type01 mt0">
                        <label for="com_input01"></label>
                        <input v-model="prcMchtnmCnd" type="search" id="com_input01" class="" name="" value="" placeholder="가맹점명을 입력하세요" title="가맹점 찾기">
                        <a href="javascript:void(0);" class="com_btn_delete"><span class="blind">삭제</span></a>
                        <a @click.prevent="search()" href="javascript:void(0);" class="com_btn_search"><span class="blind">검색</span></a>
                    </div>

                    <!-- 카드 종류 -->
                    <div class="btn_radio_wrap" v-if="type == TYPE_CARD">
                        <strong class="titH5">카드 종류</strong>
                        <ul class="com_radio_type03">
                            <li>
                                <div class="btn_radio">
                                    <input v-model="cdTyCnd" type="radio" name="cdTyCnd" value="" id="radio1-1">
                                    <label for="radio1-1" :aria-checked="cdTyCnd == ''">
                                        <span ref="cdTyCndAll">전체</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="cdTyCnd" type="radio" name="cdTyCnd" value="01" id="radi1-2">
                                    <label for="radi1-2" :aria-checked="cdTyCnd == '01'">
                                        <span ref="cdTyCndCrd">신용</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="cdTyCnd" type="radio" name="cdTyCnd" value="02" id="radio1-3">
                                    <label for="radio1-3" :aria-checked="cdTyCnd == '02'">
                                        <span ref="cdTyCndDbt">체크</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- //카드 종류 -->

                    <!-- 결제금액 -->
                    <div class="btn_radio_wrap">
                        <strong class="titH5">결제금액</strong>
                        <ul class="com_radio_type03">
                            <li>
                                <div class="btn_radio">
                                    <input v-model="amCnd" type="radio" name="amCnd" value="" id="radio2-1">
                                    <label for="radio2-1" :aria-checked="amCnd == ''">
                                        <span ref="amCndAll">전체</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="amCnd" type="radio" name="amCnd" value="desc" id="radi2-2">
                                    <label for="radi2-2" :aria-checked="amCnd == 'desc'">
                                        <span ref="amCndDesc">높은순</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="amCnd" type="radio" name="amCnd" value="asc" id="radio2-3">
                                    <label for="radio2-3" :aria-checked="amCnd == 'asc'">
                                        <span ref="amCndAsc">낮은순</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- //결제금액 -->

                    <!-- 거래상태 -->
                    <div class="btn_radio_wrap">
                        <strong class="titH5">거래상태</strong>
                        <ul class="com_radio_type03">
                            <li>
                                <div class="btn_radio">
                                    <input v-model="stsCnd" type="radio" name="stsCnd" :value="stsCndAll" id="radio3-1">
                                    <label for="radio3-1" :aria-checked="stsCnd == stsCndAll">
                                        <span ref="stsCndAll">전체</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="stsCnd" type="radio" name="stsCnd" :value="stsCndApv" id="radi3-2">
                                    <label for="radi3-2" :aria-checked="stsCnd == stsCndApv">
                                        <span ref="stsCndApv">결제(승인)</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="stsCnd" type="radio" name="stsCnd" :value="stsCndCan" id="radio3-3">
                                    <label for="radio3-3" :aria-checked="stsCnd == stsCndCan">
                                        <span ref="stsCndCan">취소</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- //거래상태 -->
                </div>
                <div class="popup_footer">
                    <div class="btn_full_box2">
                        <a @click.prevent="search()" href="javascript:void(0);" role="button" class="btn btn_mint">조회</a>
                    </div>
                </div>
                <a @click.prevent="close()" href="javascript:void(0);" class="btn_close"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

const TYPE_CARD = 'CARD'                // 카드 지출내역
const TYPE_PAY = 'PAY'                  // 페이 지출내역
const SUBTYPE_PAYMONEY = 'PAYMONEY'     // 페이 - 페이머니 지출내역
const SUBTYPE_PPAYCARD = 'PPAYCARD'     // 페이 - 선불카드 지출내역
const TYPE_PPAY = 'PPAY'                // 선불 결제내역

export default {
    name : "CmmXpsDetailSearch",
    data: () => {
        return {
            TYPE_CARD,
            TYPE_PAY,
            SUBTYPE_PAYMONEY,
            SUBTYPE_PPAYCARD,
            TYPE_PPAY,
            type            : "",       // 지출내역 종류
            subtype         : "",       // 지출내역 하위종류
            prcMchtnmCnd    : "",       // 가맹점명 검색조건
            cdTyCnd         : null,       // 카드종류 검색조건
            amCnd           : null,       // 결제금액 검색조건
            stsCnd          : null,       // 거래상태 검색조건
            stsCndAll       : "",       // 거래상태 전체
            stsCndApv       : "",       // 거래상태 승인코드
            stsCndCan       : ""        // 거래상태 취소코드
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)
    },
    methods: {
        initComponent(param) {
            this.type = param.type
            this.subtype = param.subtype
            this.prcMchtnmCnd = param.prcMchtnmCnd
            this.cdTyCnd = param.cdTyCnd
            this.amCnd = param.amCnd
            this.stsCnd = param.stsCnd

            if(this.type == TYPE_PAY && this.subtype == SUBTYPE_PAYMONEY) {
                this.stsCndApv = '5501'
                this.stsCndCan = '5502'
            }

            if(this.type == TYPE_CARD || (this.type == TYPE_PAY && this.subtype == SUBTYPE_PPAYCARD)) {
                this.stsCndApv = '01'
                this.stsCndCan = '02'
            }

            this.$nextTick(() => {
                $(function(){
                    $("input[type='radio']:checked").siblings("label").attr("aria-checked", true)
                })
            })
        },
        // 조건검색
        search() {
            let amCndLabel = this.$refs.amCndAll.innerText
            if(this.amCnd == 'desc') {
                amCndLabel = this.$refs.amCndDesc.innerText
            }else if(this.amCnd == 'asc') {
                amCndLabel = this.$refs.amCndAsc.innerText
            }

            let stsCndLabel = this.$refs.stsCndAll.innerText
            if(this.stsCnd == this.stsCndApv) {
                stsCndLabel = this.$refs.stsCndApv.innerText
            }else if(this.stsCnd == this.stsCndCan) {
                stsCndLabel = this.$refs.stsCndCan.innerText
            }
            
            // 검색조건
            let params = {
                isSrch: true,
                prcMchtnmCnd: this.prcMchtnmCnd,
                amCnd: this.amCnd,
                amCndLabel,
                stsCnd: this.stsCnd,
                stsCndLabel
            }

            if(this.type == TYPE_CARD) {
                let cdTyCndLabel = this.$refs.cdTyCndAll.innerText
                if(this.cdTyCnd == '01') {
                    cdTyCndLabel = this.$refs.cdTyCndCrd.innerText
                }else if(this.cdTyCnd == '02') {
                    cdTyCndLabel = this.$refs.cdTyCndDbt.innerText
                }

                Object.assign(params, {
                    cdTyCnd: this.cdTyCnd,
                    cdTyCndLabel
                })
            }

            this.close(params)
        }
    }
}
</script>
