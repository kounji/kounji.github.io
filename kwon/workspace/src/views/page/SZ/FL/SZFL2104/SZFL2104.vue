<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 농기계임대
* @ 페이지설명 : 농기계임대 메인-맞춤검색-대출한도 검색(POP)
* @ 파일명     : src/views/page/SZ/FL/SZFL2104/SZFL2104.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-09
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-03              		                최초작성
* 2021-07-14			  CS515897				화면수정
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <!--상단(Titley)-->	
        <div class="popup_header">    
            <h1>대출한도</h1>
        </div>
        <!--상단(Titley)-->	

        <!--메인(Body)-->	
        <div class="popup_content com_bg_type00">
            <div class="com_inner">
                <p class="pop_tit">대출한도 입력</p>
                <div class="com_input_type05 com_placeholder_right">
                    <template v-if="directInput">
                        <div>
                            <label for="txt01"></label>
                            <input type="tel" id="txt01" class="com_txtright_type03" maxlength="10" v-model="directMin" :disabled="!directInput" @keyup="moveNextTag($event), addComma('directMin', $event)" ref="directMin" title="만원">
                            <span class="com_inputtxtright type00">만원</span>
                        </div>
                        <div>
                            <label for="txt02"></label>
                            <input type="tel" id="txt02" class="com_txtright_type03" maxlength="10" v-model="directMax" :disabled="!directInput" @keyup="moveNextTag($event), addComma('directMax', $event)" ref="directMax" title="만원">
                            <span class="com_inputtxtright type00">만원</span>
                        </div>				
                    </template>
                    <template v-else>
                        <div>
                            <label for="txt01"></label>
                            <input type="tel" id="txt01" class="com_txtright_type03" maxlength="10" v-model="min" readonly>
                            <span class="com_inputtxtright type00">만원</span>
                        </div>
                        <div>
                            <label for="txt02"></label>
                            <input type="tel" id="txt02" class="com_txtright_type03" maxlength="10" v-model="max" readonly>
                            <span class="com_inputtxtright type00">만원</span>
                        </div>
                    </template>
                </div>
            </div>
            <div class="com_inner com_boxarea_type03">
                <strong class="com_box_tit02">대출한도 선택</strong>
                <div class="com_box_type05" v-for="(data, index) in list" :key="index">
                    <span class="btn_radiobox">
                        <input type="radio" name="hando" :id="'hando_'+index" :value="list[index].data" @change="inputChange(index, $event)" :checked="list[index].checked">
                        <label :for="'hando_'+index">
                            <span>{{list[index].data}}</span>
                        </label>
                    </span>
                </div>
            </div>
        </div>
        <!--메인(Body)-->	

        <!--하단(버튼)-->	
        <div class="popup_footer fixed">
            <div class="btn_half_box">
                <a href="javascript:void(0);" class="btn btn_grey" @click.prevent="reset">금액 초기화</a>
                <a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" v-on:click.prevent="applyList($event)">적용</a>
            </div>
        </div>
        <!--하단(버튼)-->	

        <a href="javascript:void(0);" @click.prevent="closePopup" class="btn_close txt_cancel"><span>닫기</span></a>	
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {keyupNumFormat} from '@/utils/number'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import _ from 'lodash'

export default {
    name : 'SZFL2104',
    data: () => {
        return {
            min         : "",   // 대출한도 최소값
            tmp_min     : "",   // 대출한도 최소값
            max         : "",   // 대출한도 최대값
            tmp_max     : "",   // 대출한도 최대값
            selectedM   : "",   // 버튼 선택된 대출한도
            list : [
                {data : "직접 입력", min : -1, max : -1},
                {data : "1,000만원 미만", min : 0, max : 1000},
                {data : "1,000만원 ~ 2,000만원 미만", min : 1000, max : 2000},
                {data : "2,000만원 ~ 3,000만원 미만", min : 2000, max : 3000},
                {data : "3,000만원 ~ 4,000만원 미만", min : 3000, max : 4000},
                {data : "4,000만원 ~ 5,000만원 미만", min : 4000, max : 5000},
                {data : "5,000만원 ~ 6,000만원 미만", min : 5000, max : 6000},
                {data : "6,000만원 이상", min : 6000, max : -1},
            ],
            directInput : false,    // 직접입력 여부 flag
            directMin   : "",       // 직접입력 대출한도 최소값
            tmpDrtMin   : "",       // 직접입력 대출한도 최소값(저장용)
            directMax   : "",       // 직접입력 대출한도 최대값
            tmpDrtMax   : "",       // 직접입력 대출한도 최대값(저장용)
        }
    },

    mixins: [
		commonMixin,
        popupMixin
    ],

    mounted() {
         this.initComponent()

         //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },

    computed: {
        btnOnOff() {
            return (this.min || this.max) || (this.directInput) ? "" : "btn_off"
        }
    },

    methods: {
        initComponent() {
            this.getData();
        },

        getData() {
            this.directInput = this.params.directInput
            
            if(!this.directInput) { // 직접입력이 아닐경우
                this.min = this.params.lnLmtAmFrom
                this.max = this.params.lnLmtAmTo

                // 직전 선택값 불러오기
                let selData = this.list.indexOf(_.find(this.list, {min : this.min, max : this.max === "" ? -1 : this.max}))
                if(selData != -1 && !this.directInput) {
                    this.selectedM = this.list[selData].data
                    for(let i=0; i<this.list.length; i++) {
                        if(i === selData) {
                            this.list[i].checked = true
                        } else {
                            this.list[i].checked = false
                        }
                    }
                }

                this.min = this.min > 0 ? this.numberFormat(this.min) : this.min
                this.max = this.numberFormat(this.max)
            } else {    // 직접입력일 경우
                this.directMin = this.params.lnLmtAmFrom > 0 ? this.numberFormat(this.params.lnLmtAmFrom) : this.params.lnLmtAmFrom
                this.directMax = this.numberFormat(this.params.lnLmtAmTo)

                // 직접입력 radio 버튼 check
                this.selectedM = this.list[0].data
                for(let i=0; i<this.list.length; i++) {
                    if(i === 0) {
                        this.list[i].checked = true
                    } else {
                        this.list[i].checked = false
                    }
                }
            }
        },

        inputChange(index, e){
            if(e.target.value != "직접 입력") {
                this.directInput = false
                this.selectedM = e.target.value

                this.tmp_min = this.list[index].min   //(변수)tmp_min = 리스트 선택 min값

                if (this.list[index].max == -1) {
                    this.tmp_max = -1  //(변수)tmp_max = -1
                }
                else {
                    this.tmp_max = this.list[index].max   //(변수)tmp_max = 리스트 선택 max값
                }

                this.min = this.tmp_min > 0 ? this.numberFormat(this.tmp_min) : 0   //(변수)min=(변수)tmp_min
                this.max = this.numberFormat(this.tmp_max)                          //(변수)max=(변수)tmp_max
                
                // 이전 직접입력 input값 저장
                this.tmpDrtMin = this.directMin
                this.tmpDrtMax = this.directMax
                this.directMin = ""
                this.directMax = ""
            } else {
                this.directInput = true
                this.selectedM = e.target.value

                // 이전 직접입력값 불러오기
                this.directMin = this.tmpDrtMin
                this.directMax = this.tmpDrtMax

                this.tmp_min = this.directMin
                this.tmp_max = this.directMax

                this.min = this.numberFormat(this.tmp_min)   //(변수)min=(변수)tmp_min
                this.max = this.numberFormat(this.tmp_max)   //(변수)max=(변수)tmp_max
            }
        },

        //[닫기]버튼 클릭
        closePopup() {
            this.close("cancel")
        },

        ///입력값 1000단위 쉼표처리
        numberFormat(number){ 
            if(number === -1) number = ""
            return keyupNumFormat(number)
        },

        //[적용]버튼 클릭
        applyList(e){
            if(e.target.className.indexOf("btn_off") != -1) {
                return false
            }

            if(this.selectedM != "") {
                if (this.max == "") this.max = -1
                if (this.min == "") this.min = 0
            } 

            let t_min = ""
            let t_max = ""

            if(!this.directInput) {
                if (String(this.min).indexOf(",") > -1){
                    t_min = this.min.split(",").join("")
                } else {
                    t_min = this.min
                }

                if (String(this.max).indexOf(",") > -1){
                    t_max = this.max.split(",").join("")
                } else {
                    t_max = this.max
                }
            } else {
                if (String(this.directMin).indexOf(",") > -1){
                    t_min = this.directMin.split(",").join("")
                } else {
                    t_min = this.directMin
                }

                if (String(this.directMax).indexOf(",") > -1){
                    t_max = this.directMax.split(",").join("")
                } else {
                    t_max = this.directMax
                }

                t_min = Number(t_min)
                t_max = Number(t_max)
                
                if(t_min > t_max || t_min === "" || t_max === "" || (t_min === 0 && t_max === 0)) {
                    const config_alert = {
                        content: ['대출한도 금액 범위를<br>다시 확인해주세요.'],
                        buttons: [{text: "확인", class: 'btn btn_mint btn_no'}],
                    }
                    modalService.alert(config_alert)
                        return false
                }
            }

            const data = {
                name        : "SZFL2104",
                min         : t_min,
                max         : t_max,
                directInput : this.directInput
            }
            
            this.close(data)
        },

        //[초기화]버튼 클릭
        reset(){
            this.tmp_min = ""
            this.tmp_max = ""
            this.min = ""
            this.max = ""
            this.directMin = ""
            this.directMax = ""
            this.tmpDrtMin = ""
            this.tmpDrtMax = ""
            this.directInput = false

            //Radion로 선택한 부분을 초기화 
            document.querySelectorAll("input[type='radio']").forEach((value) => {
                value.checked = false
            })
        },

        // 직접입력 천단위 쉼표 추가
        addComma(comp, e="") {
            let selectionStartPos = ""
            let selectionEndPos = ""

            switch(comp) {
                case 'directMin' :
                    selectionStartPos = this.$refs.directMin.selectionStart
                    selectionEndPos = this.$refs.directMin.selectionEnd

                    this.directMin = this.directMin.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                    this.directMin = this.directMin.split(",").join("")
                    this.directMin = this.directMin == 0 ? this.directMin : keyupNumFormat(this.directMin)

                    if(e.keyCode === 8) {
                        this.$nextTick(() => {
                            this.$refs.directMin.focus()
                            this.$refs.directMin.setSelectionRange(selectionStartPos, selectionEndPos)
                        })
                    }
                    break
                case 'directMax' : 
                    selectionStartPos = this.$refs.directMax.selectionStart
                    selectionEndPos = this.$refs.directMax.selectionEnd

                    if(this.directMax.length == 1 && this.directMax == 0) {
                        this.directMax = this.directMax.slice(0, -1)
                    } else {
                        this.directMax = this.directMax.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.directMax = this.directMax.split(",").join("")
                        this.directMax = keyupNumFormat(this.directMax)
                    }

                    if(e.keyCode === 8) {
                        this.$nextTick(() => {
                            this.$refs.directMax.focus()
                            this.$refs.directMax.setSelectionRange(selectionStartPos, selectionEndPos)
                        })
                    }
                    break
            }
        }
    },

    created() {
    },

    components : {
    }
}   
</script>