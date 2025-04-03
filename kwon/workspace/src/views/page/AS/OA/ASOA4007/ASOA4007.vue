<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 기타
* @ 페이지설명 : 나의자산 > 자산 > 기타 금 > 금 시세 계산 슬라이드 팝업
* @ 파일명     : src/views/page/AS/OA/ASOA2007/ASOA2007.vue
* @ 작성자     : CS528205
* @ 작성일     : 2022-07-22
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-22              CS528205              최초작성 
* 2023-09-08              CS533571              마이데이터 확대개발 화면ID만 변경(ASOA1007 -> ASOA2007)
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>금 시세 계산</h1>
                    <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
                </div>
                <div class="popup_content">
                    <div class="custom_check_list">
                        <strong class="com_cont_tit01">순도</strong>
                        <ul class="com_radio_type04 h_mid">
                            <li v-for="(item, idx) in goldMprList" :key="idx">
                                <div class="btn_radio" v-on:click="changeMpr(item)">
                                    <input type="radio" :id="'radio2-'+idx" :checked="item.goldKdc === selectedGoldMpr.goldKdc">
                                    <label :for="'radio2-'+idx">
                                        <span>{{item.goldKdnm}}</span>
                                    </label>	
                                </div>	
                            </li>
                        </ul>
                        <strong class="com_cont_tit01">단위</strong>
                        <ul class="com_radio_type02">
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio3" id="radio3-2" checked v-on:click="changeUnt(0)">
                                    <label for="radio3-2">
                                        <span>그램(g)</span><!-- 2022-07-15 문구수정 -->
                                    </label>	
                                </div>	
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio3" id="radio3-3" v-on:click="changeUnt(1)">
                                    <label for="radio3-3">
                                        <span>돈</span>
                                    </label>	
                                </div>	
                            </li>
                        </ul>
                        <div class="com_input_type01 com_word1">
                            <input type="tel" id="com_input01" class="tar " value="3.75" required="" placeholder="중량을 입력하세요" title="중량을 입력" maxlength="13" @focus="fn_focusOnOff()" v-model="inputQt" @keyup="calculateVal($event)" ref="inputQt">
                            <label for="com_input01">
                                <span class="txt_label_x font_b">중량</span>
                            </label>
                            <div class="del_txt">
                                <a href="javascript:void(0);" class="com_btn_delete2" v-show="inputQt.length > 0" @click.prevent="delInputQt()"><span class="blind">삭제</span></a>
                                <span class="com_inputtxtright2">{{selectedUnt==0 ? 'g' : '돈'}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex_gray_wrap">
                        <div class="re_flex">
                            <strong class="text_info list_name">예상금액</strong>
                            <span class="list_price">
                                <em>{{calQt | numberFilter}}</em>원
                            </span>
                            <span class="clear_txt_right">
                                <span>{{fn_hanValue(calQt)}}</span><em class="unit"></em>
                            </span>
                        </div>
                    </div>
                    <!-- [v4.0] 25-02-26 면책조항 문구수정 -->
                    <div class="disclaimer_list">
                        <strong class="com_txtinfo_type01">면책조항</strong>
                        <ul class="bl_dot_list">
                            <li>농업협동조합중앙회가 제공하는 금시세정보는 금거래소의 정보를 토대로 제공되는 투자 참고 사항이며 오류가 발생하거나 지연될 수 있습니다.</li>
                            <li>제공된 정보에 의한 투자 결과에 법적 책임을 지지 않습니다.</li>
                            <li>실물 구입 시 부가가치세 10%가 부과될 수 있습니다.</li>
                            <li>VAT포함 가격이며 실제와 다를 수 있습니다.</li>
                        </ul>
                    </div>
                    <!-- //[v4.0] 25-02-26 면책조항 문구수정 -->
                </div>
                
                <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import {numberFormat} from '@/utils/number'

export default {
    name : "ASOA4007",
    data: () => {
        return {
            goldMprList         : [],   // 골드별시세정보
            selectedMprType       : 0,  // 선택된 골드시세타입.     0 : 살 때 시세, 1 : 팔 때 시세
            selectedGoldMpr     : "",   // 선택된 골드시세정보
            selectedUnt         : 0,    // 선택된 골드 단위.        0 : 그램, 1 : 돈
            inputQt             : "",   // 입력된 중량값

            calQt               : 0,    // 예상 금액

            foc_byulching   : false,
            foc_inputQt      : false,
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        // 팝업화면 초기화
        initComponent(params) {
            this.goldMprList = params.goldMprList
            this.selectedMprType = 0          // 초기값 살 때 시세
            this.selectedUnt = 0            // 초기값 그램
            this.inputQt = "3.75"           // 초기값 3.75그램 (한돈)
            this.changeMpr(this.goldMprList[0])
        },
        getDiffCss(diff) {
            if (diff > 0)
                return "raise"
            else if (diff == 0)
                return "zero"
            else 
                return "decrease"
        },
        fn_focusOnOff() {
            this.foc_byulching = false
            this.foc_inputQt = true
        },
        calculateVal(e="") {
            this.asetQtChk(e)

            let unitPrice = this.selectedGoldMpr.goldPucMpr    // 살때시세 팔때시세
            var tempQt = this.inputQt != "" ? this.inputQt.split(",").join("") : 1
            if(this.selectedUnt == '1'){    // 선택 단위가 '돈'일때 그램으로 변환 ( * 3.75)
                tempQt = parseFloat(tempQt) * 3.75
            }

            // (순도별 살 때 or 팔 때 시세(g당) X 중량(돈은 g단위로 환산) (1돈=3.75g)) + 위 결과 값의 10%(VAT)
            this.calQt = parseInt((tempQt * unitPrice) + (tempQt * unitPrice * 0.1))    

        },
        // 수량 입력 시 . , 숫자만 허용 (소수점 2자리입력가능, 소수점 제외 숫자길이 8자리)
        asetQtChk(e="") {
            let selectionStartPos = ""
            let selectionEndPos = "" 
            if(e !== undefined && e !== null && e !== "") {
                selectionStartPos = this.$refs.inputQt.selectionStart
                selectionEndPos = this.$refs.inputQt.selectionEnd
            }

            let tmpQt = this.inputQt
            // (계산전) 숫자에 포함된 쉼표 제거
            if(tmpQt.indexOf(",") != -1) tmpQt = tmpQt.split(",").join("")
            let pattern1 = /^[0-9.]*$/;
            if(!pattern1.test(tmpQt)){
                tmpQt = tmpQt.replace(/[^0-9.]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
            } else {
                if(tmpQt.length == 1){
                    if(tmpQt == '.'){
                        tmpQt = tmpQt.slice(0, -1)
                    }
                } else {
                    if(tmpQt.split(".").length > 2){
                        tmpQt = tmpQt.slice(0, -1)
                    } else {
                        if(tmpQt.split(".").length == 1){
                            //소수점이 없을 때
                            // 정수 입력 8자리 제한
                            if(tmpQt.length > 8){
                                tmpQt = tmpQt.slice(0, -1)
                            } 

                            // 첫자리 0 입력 후 소수점이 아닌 숫자를 입력할 시
                            if(tmpQt.length == 2){
                                if(tmpQt[0] == 0  && tmpQt[1] == 0){        // 두번째 자리가 0일 경우 0만 남김 00 -> 0
                                    tmpQt = tmpQt.slice(0, -1)
                                } else if(tmpQt[0] == 0 && tmpQt[1] != 0) { // 두번째 자리가 0이 아닌 숫자일 경우 숫자만 남김 01 -> 1
                                    tmpQt = tmpQt.slice(1)
                                }
                            }
                        } else {
                            if(tmpQt.length == 2){
                                if(tmpQt[0] == 0  && tmpQt[1] == 0){
                                    tmpQt = tmpQt.slice(0, -1)
                                }
                            } else {
                                // 소수점 입력시 정수부분 최대 자리수는 8자리
                                if(!Number.isInteger(tmpQt) && tmpQt.split(".")[0].length > 8) {
                                    tmpQt = tmpQt.slice(0, -1)
                                }

                                // 소수점 이하 최대 자리수는 2자리
                                let pattern2 = /^\d*[.]\d{3}$/;
                                if(pattern2.test(tmpQt)){
                                    tmpQt = tmpQt.slice(0, -1)
                                }
                            }
                        }
                    }
                }
            }

            // 입력한 최종 보유중량이 0.00일 경우 입력란 초기화
            if(tmpQt == "0.00") tmpQt = ""

            // 소수점 포함 여부에 따른 천단위 쉼표 추가
            if(tmpQt != "") {
                if(tmpQt.indexOf(".") != -1) {
                    let splitNum = tmpQt.split(".")
                    let partInteger = splitNum[0]
                    let partDecimal = "." + splitNum[1]

                    tmpQt = numberFormat(partInteger) + partDecimal
                } else {
                    tmpQt = numberFormat(tmpQt)
                }
            }

            this.inputQt = tmpQt

            if(e.keyCode === 8) {
                this.$nextTick(()=>{
                    this.$refs.inputQt.focus()
                    this.$refs.inputQt.setSelectionRange(selectionStartPos,selectionEndPos)
                })
            }
        },
        /**
         * 골드 종류 변경
         */
        changeMpr(mprInfo) {
            if (this.selectedGoldMpr == mprInfo)
                return;

            this.selectedGoldMpr = mprInfo;
            this.calculateVal()
        },
        /**
         * 유닛 변경 (그램, 돈)
         */
        changeUnt(unt) {
            if (this.selectedUnt == unt)
                return

            this.selectedUnt = unt;
            this.inputQt = this.selectedUnt == 0 ? "3.75" : "1"  // 초기화
            this.calculateVal();
        },
        fn_hanValue(amount) {
            const koreanUnits = ['', '만', '억', '조']
            let han_amount = amount   // 만원 단위 화면
            let answer = ''
            let unit = 10000
            let index = 0
            let division = Math.pow(unit, index)

            while(Math.floor(han_amount / division) > 0) {
                const mod = Math.floor(han_amount % (division * unit) / division)
                if(mod) {
                    const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    answer = `${modToString}${koreanUnits[index]} ` + answer
                }
                division = Math.pow(unit, ++index)
            }
            return (answer + "원").replace(" 원","원")
        },// 입력 텍스트 삭제
        delInputQt() {
            this.inputQt = ""
            this.calculateVal() // 입력 텍스트 삭제에 따른 환산금액 재계산
        },
    },
}
</script>