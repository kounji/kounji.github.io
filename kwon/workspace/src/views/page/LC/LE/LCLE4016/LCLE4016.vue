<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 선불결제내역 > 상세정보
* @ 페이지설명 : 지출 > 지출내역 > 선불결제내역 > 상세정보 슬라이드 팝업
* @ 파일명     : src/views/page/LC/LE/LCLE4016/LCLE4016.vue
* @ 작성자     : CS540687
* @ 작성일     : 2025-02-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-04              CS540687              최초작성
*************************************************************************/
-->

<template>
    <div class = "mydata2023">
        <!-- slide popup S -->
        <div class="dimmed " style="display: block;"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>지출 목표</h1>
                    <!-- <a href="#nolink" class="btn_back"><span class="blind">이전화면</span></a> -->
                </div>
                <div class="popup_content com_btn_bottom">

                    <strong class="titH5">목표 금액</strong>
                    <div class="com_input_type01 com_won01 mt0">
                        <input type="tel" id="com_input01" :class="xpsEstAm.length>0 && foc_xpsEstAm?'focusON focusforce':''" v-model="xpsEstAm" @keyup="addComma($event)" @focus="fn_focusOnOff('xpsEstAm')" ref="xpsEstAm" value=""  maxlength="17" required="" placeholder="이번달 예산 입력" title="한달 예산">
                        <div class="del_txt">
                            <a href="javascript:void(0);" class="com_btn_delete2 blur" role="button" style="display: none;"><span class="blind">삭제</span></a>
                            <span class="com_inputtxtright2">원</span>
                        </div>
                    </div>
                    
                    <div class="mygoal_cont_title mt30">
                        <strong class="com_box_tit titH5">목표 설정</strong>                       
                        <!-- 0925 삭제 -->
                        <!-- <a href="#nolink" class="link_arrow">정기지출 관리</a> -->
                        <!-- //0925 삭제 -->
					
					<!-- 0925 툴팁 추가 -->
                        <div class="custom_tooltip">
                            <div class="com_tooltip_type02 com_tooltip_type03">
                                <a href="#nolink" class="com_btn_info" role="button">
                                    <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                </a>
                                <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                    <div>
                                        <!-- [v4.0] 25-01-17 문구수정 -->
                                        <p>
                                            매월 자동반영 시, 현재 설정한 목표 금액으로 다음달 자동 설정됩니다.<br>
                                            다음달 초기화 시, 매월1일 지출목표를 신규 등록해야 합니다.<br>(기간 : 당월 1일 ~ 당월 말일)
                                        </p>
                                        <!-- //[v4.0]  25-01-17 문구수정 -->
                                        <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <!-- //925 툴팁 추가 -->
                    </div>
                    <ul class="com_radio_type02">
                        <li>
                            <div class="btn_radio">
                                <input v-model="xpsEstDsc" type="radio" name="xpsEstDsc" id="radio5-1" value="01">
                                <label for="radio5-1" :aria-checked="xpsEstDsc == '01'">
                                    <span>매월 자동반영</span><!-- [v4.0]문구수정 -->
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="btn_radio">
                                <input v-model="xpsEstDsc" type="radio" name="xpsEstDsc" id="radio5-2" value="02">
                                <label for="radio5-2" :aria-checked="xpsEstDsc == '02'">
                                    <span>다음달 초기화</span><!-- [v4.0]문구수정 -->
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="popup_footer">
                    <div class="btn_full_box2">
                        <button @click.prevent="save()" href="javascript:void(0);" type="button" class="btn btn_mint">저장</button>
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
import modalService from '@/service/modalService'
import {keyupNumFormat} from '@/utils/number'

const TYPE_CARD = 'CARD'                // 카드 지출내역
const TYPE_PAY = 'PAY'                  // 페이 지출내역
const SUBTYPE_PAYMONEY = 'PAYMONEY'     // 페이 - 페이머니 지출내역
const SUBTYPE_PPAYCARD = 'PPAYCARD'     // 페이 - 선불카드 지출내역

export default {
    name : "LCLE4016",
    data: () => {
        return {
            TYPE_CARD,
            TYPE_PAY,
            SUBTYPE_PAYMONEY,
            SUBTYPE_PPAYCARD,
            type            : "",       // 지출내역 종류
            subtype         : "",       // 지출내역 하위종류
            inqYm           : "",
            // v4.0
            xpsEstAm        : 0,        // 지출목표금액
            xpsEstDsc       : "",       // 지출목표설정구분
            inqYm           : '',       // 기준년월
            currYm          : '',       // 현재년월
            foc_xpsEstAm    : false,
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
            console.log("initComponent() param ==>", param)
            //this.type       = param.type
            //this.subtype    = param.subtype
            this.inqYm      = param.inqYm,
            this.currYm     = param.currYm,
            this.xpsEstAm   = String(param.xpsEstAm) || "" //param.xpsEstAm,
            this.xpsEstDsc  = param.xpsEstDsc,

            this.addComma()
            
            this.$nextTick(() => {
                $(function(){
                    $("input[type='radio']:checked").siblings("label").attr("aria-checked", true)
                })
            })

            this.$refs.xpsEstAm.focus()    // 수정으로 넘어올시 별칭 포커스
        },

        // input 태그 내 천단위 쉼표추가
        addComma(e="") {
            const selectionStartPos = this.$refs.xpsEstAm.selectionStart
            const selectionEndPos = this.$refs.xpsEstAm.selectionEnd

            if(this.xpsEstAm.length == 1 && this.xpsEstAm == 0) {
                this.xpsEstAm = this.xpsEstAm.slice(0, -1)
            } else {
                this.xpsEstAm = this.xpsEstAm.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                this.xpsEstAm = this.xpsEstAm.split(",").join("")
                this.xpsEstAm = keyupNumFormat(this.xpsEstAm)
            }

            if(e.keyCode === 8) {
                this.$nextTick(() => {
                    this.$refs.xpsEstAm.focus()
                    this.$refs.xpsEstAm.setSelectionRange(selectionStartPos, selectionEndPos)
                })
            }
        },        
        // input focus on/off
        fn_focusOnOff(type) {
            switch(type) {
                case "xpsEstAm" :
                    this.foc_xpsEstAm = true
                    break
            }
        },
        // 입력 텍스트 삭제
        del(type) {
            switch(type) {
                case 'xpsEstAm':
                    this.xpsEstAm = ""
                    break
            }
        },

        // 저장
        save() {
            // 검색조건
            let params = {
                xpsEstAm    : this.xpsEstAm,
                xpsEstDsc   : this.xpsEstDsc,
                isXpsEst    : true,
            }

            console.log("params@@@@@@@@@@@@@@@@",params)

            this.close(params)
        },
    }
}
</script>
