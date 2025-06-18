<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 데일리 금융브리핑 > 환율알림설정
* @ 페이지설명 : 연금절세 > 데일리 금융브리핑 > 환율알림설정 > 목표가설정
* @ 파일명     : src\views\page\PD\BF\PDBF4004\PDBF4004.vue
* @ 작성자     : CS541015
* @ 작성일     : 2025-02-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-13              CS541015              최초작성
*************************************************************************/
-->

<template>
	<div>
		<!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>환율 목표가 알림 설정</h1>
                </div>
                <div class="popup_content com_btn_bottom">
                    <!--상한가-->
                    <div class="exchange_target">
                        아래 설정하신 환율보다 높아졌을 때
                        <span class="com_btn_switch sm">
                            <input type="checkbox" name="check01" v-model="maxprAncYn" id="check01" title="상한가" :disabled="removeComma(maxprSt + maxprEd) > 0 ? false : true">
                            <label for="check01" aria-hidden="true">
                                <span class="txt">선택</span>
                                <span class="on">선택</span>
                                <span role="img" class="off">해제</span>
                            </label>
                        </span>

                        <div class="exchange_krw">
                            <div class="com_input_type01">
                                <label for="txt01"></label>
                                <input type="tel" inputmode="decimal" id="txt01" class="com_txtright_type01" ref="maxprSt" v-model="maxprSt" name="" value="" placeholder="희망환율" title="상한가 원 단위" @focusout="fn_focusOff('max')" @beforeinput="fn_dot($event, 'st')" @input="fn_inputDot($event)" @keyup="addComma('maxprSt', $event)">
                            </div>
                            <span>.</span>
                            <div class="com_input_type01">
                                <label for="txt02"></label>
                                <input type="tel" inputmode="decimal" id="txt02" class="com_txtright_type01" ref="maxprEd" v-model="maxprEd" name="" value="" placeholder="" maxlength="2" title="상한가 전 단위" @focusout="fn_focusOff('max')" @beforeinput="fn_dot($event, 'ed')" @input="fn_inputDot($event)">
                            </div>
                            <span>KRW</span>
                        </div>
                    </div>

                    <!--하한가-->
                    <div class="exchange_target">
                        아래 설정하신 환율보다 낮아졌을 때

                        <span class="com_btn_switch sm">
                            <input type="checkbox" name="check02" id="check02" title="하한가" v-model="lowprAncYn" :disabled="removeComma(lowprSt + lowprEd) > 0 ? false : true">
                            <label for="check02" aria-hidden="true">
                                <span class="txt">선택</span>
                                <span class="on">선택</span>
                                <span role="img" class="off">해제</span>
                            </label>
                        </span>

                        <div class="exchange_krw">
                            <div class="com_input_type01">
                                <label for="txt01"></label>
                                <input type="tel" inputmode="decimal" id="txt03" class="com_txtright_type01" ref="lowprSt" v-model="lowprSt" name="" value="" placeholder="희망환율" title="하한가 원 단위" @focusout="fn_focusOff('low')" @beforeinput="fn_dot($event, 'st')" @input="fn_inputDot($event)" @keyup="addComma('lowprSt', $event)">
                            </div>
                            <span>.</span>
                            <div class="com_input_type01">
                                <label for="txt01"></label>
                                <input type="tel" inputmode="decimal" id="txt03" class="com_txtright_type01" ref="lowprEd" v-model="lowprEd" name="" value="" placeholder="" maxlength="2" title="하한가 전 단위" @focusout="fn_focusOff('low')" @beforeinput="fn_dot($event, 'ed')" @input="fn_inputDot($event)">
                            </div>
                            <span>KRW</span>
                        </div>
                    </div>
                </div>

                <div class="popup_footer">
                    <div class="btn_group">
                        <button type="button" class="btn btn_mint" @click.prevent="btnOff ? '' : fn_save()" :class="btnOff ? 'btn_off' : ''">저장</button>
                    </div>
                </div>
                
                <a href="javascript:void(0);" class="btn_close" @click='close()'><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {keyupNumFormat, numberFormat} from '@/utils/number'

export default {
    name : "PDBF4004",
    data: () => {
        return {
            curAncList : [],
            curc : '',
            maxpr : 0,
            lowpr : 0,
            maxprSt : '',
            maxprEd : '',
            lowprSt : '',
            lowprEd : '',
            maxprAncYn : false,
            lowprAncYn : false,
            curcCont : '',
            btnOff   : false,
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)

		// PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(params) {
            this.curc = params.curc
            this.curcCont = params.curcCont

            this.getData();
        },
        getData() {
            const config = {
                url: '/pd/bf/04r01',
                data: {
                    mydtCusno : this.getUserInfo("mydtCusno"),     // 마이데이터고객번호
                    curc      : this.curc
                }
            }
            apiService.call(config).then(response => {
                this.curAncList = response.curAncList || []
                for(let i=0; i<this.curAncList.length; i++){
                    this.maxprAncYn = this.curAncList[i].maxprAncYn == '1' ? true : false
                    this.lowprAncYn = this.curAncList[i].lowprAncYn == '1' ? true : false
                    this.maxprSt = Math.floor(Number(this.curAncList[i].maxpr)) || ''
                    this.maxprEd = Math.round((Number(this.curAncList[i].maxpr) - this.maxprSt) * 100) || ''
                    this.lowprSt = Math.floor(Number(this.curAncList[i].lowpr)) || ''
                    this.lowprEd = Math.round((Number(this.curAncList[i].lowpr) - this.lowprSt) * 100) || ''
                }
                this.maxprSt != '' ? this.maxprSt = numberFormat(this.maxprSt) : this.maxprSt = ''
                this.lowprSt != '' ? this.lowprSt = numberFormat(this.lowprSt) : this.lowprSt = ''
                this.saveChk();
                
            })
		},
        fn_save() {
            let lowprAncYn = this.lowprAncYn ? '1' : '0';
            let maxprAncYn = this.maxprAncYn ? '1' : '0';
            
            if(lowprAncYn == '1') {
                this.lowpr = Number(this.removeComma(this.lowprSt) + "." + this.lowprEd)
            } else {
                this.lowpr = '';
            }

            if(maxprAncYn == '1') {
                this.maxpr = Number(this.removeComma(this.maxprSt) + "." + this.maxprEd)
            } else {
                this.maxpr = '';
            }

            const config = {
                url : "/pd/bf/04s01",
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno"), // 고객번호
                    curc      : this.curc,
                    maxpr     : this.maxpr,
                    lowpr     : this.lowpr,
                    maxprAncYn : maxprAncYn,
                    lowprAncYn : lowprAncYn,
                }
            };
            apiService.call(config).then(response => {
                if(response.rspC == '0000'){
                    modalService.alert("저장이 완료되었습니다.").then(() => {
                        this.close('success');
                    })
            	} else {
            		modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {
            		})
            	}
            });
        },
        fn_focusOff(str){
            
            let maxpr = Number(this.removeComma(this.maxprSt) + "." + this.maxprEd)
            let lowpr = Number(this.removeComma(this.lowprSt) + "." + this.lowprEd)
            switch(str) {
                case 'max' :
                    if(maxpr > 0){
                        this.maxprAncYn = true
                        this.saveChk()
                        if(maxpr < lowpr){
                            modalService.alert("높아졌을 때 희망환율은 낮아졌을 때 희망환율보다 같거나 작을 수 없습니다.<br>입력한 값을 다시 확인해 주세요.").then(() => {
                            });
                        }
                    } else {
                        this.maxprAncYn = false
                    }
                    break;
                case 'low' :
                    if(lowpr > 0){
                        this.lowprAncYn = true
                        this.saveChk()
                        if(maxpr < lowpr){
                            modalService.alert("낮아졌을 때 희망환율은 높아졌을 때 희망환율보다 같거나 클 수 없습니다.<br>입력한 값을 다시 확인해 주세요.").then(() => {
                            });
                        }
                    } else {
                        this.lowprAncYn = false
                    }
                    break;
            }
        },
        saveChk() {
            let maxyn = this.maxprAncYn
            let lowyn = this.lowprAncYn
            let maxpr = Number(this.removeComma(this.maxprSt) + "." + this.maxprEd)
            let lowpr = Number(this.removeComma(this.lowprSt) + "." + this.lowprEd)

            if (isNaN(maxpr)) {
                maxpr = 0;
            } else if(isNaN(lowpr)){
                lowpr = 0;
            }
            
            if( maxpr != 0 && lowpr != 0 ) { //둘다입력했을경우
                maxpr > lowpr ? this.btnOff = false : this.btnOff = true;
            } else if ( maxpr != 0 || lowpr != 0 ) {  // 한개만 입력했을경우
                this.btnOff = false;    
            } else {
				this.btnOff = true;
			}
		},
        fn_dot(e, tg) {
            const val = e.data;
            if(val === '.'){
                if(tg === 'st'){
                    e.preventDefault();
                    this.$nextTick(() => {
                        const inputs  = e.target.closest('.exchange_krw').querySelectorAll('input');
                        const index   = Array.from(inputs).indexOf(e.target);
                        
                        if(index !== -1 && index < inputs.length -1) {
                            inputs[index + 1].focus();
                        }
                    })
                } else {
                    e.preventDefault();
                }
            }
        },
        fn_inputDot(e) {
            const val = e.target.value;
            if(val.includes('.')) {
                e.target.value = val.replace('.', '');
            }
        },
        removeComma(value) {
            return (typeof value === "string") ? value.split(",").join("") : value
        },
        addComma(str, e="") {
			if(e.keyCode === 13) return false

			let selectionStartPos
			let selectionEndPos

            switch(str) {
                case "maxprSt" :

					selectionStartPos = this.$refs.maxprSt.selectionStart
					selectionEndPos = this.$refs.maxprSt.selectionEnd

                    if(this.maxprSt.length == 1 && this.maxprSt == 0) {
                        this.maxprSt = this.maxprSt.slice(0, -1)
                    } else {
                        this.maxprSt = this.maxprSt.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.maxprSt = this.maxprSt.split(",").join("")
                        this.$nextTick(()=>{
                            this.maxprSt = keyupNumFormat(this.maxprSt)
                        });
					}
					
					if(e.keyCode === 8) {
						this.$nextTick(()=>{
							this.$refs.maxprSt.focus()
							this.$refs.maxprSt.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}

					break

                case "lowprSt" :

					selectionStartPos = this.$refs.lowprSt.selectionStart
					selectionEndPos = this.$refs.lowprSt.selectionEnd

                    if(this.lowprSt.length == 1 && this.lowprSt == 0) {
                        this.lowprSt = this.lowprSt.slice(0, -1)
                    } else {
                        this.lowprSt = this.lowprSt.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.lowprSt = this.lowprSt.split(",").join("")
                        this.$nextTick(()=>{
                            this.lowprSt = keyupNumFormat(this.lowprSt)
                        });
					}
					
					if(e.keyCode === 8) {
						this.$nextTick(()=>{
							this.$refs.lowprSt.focus()
							this.$refs.lowprSt.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}

					break

            }
			
		},
    },
    computed : {
        
    },
    watch: {
        maxprAncYn: function() {
            setTimeout(() => {
                this.saveChk();   
            }, 300);
        },
        lowprAncYn: function() {
            setTimeout(() => {
                this.saveChk();    
            }, 300);
            
        }
    }
}
</script>