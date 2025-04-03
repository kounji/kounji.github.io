<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > NH콕마이카
* @ 페이지설명 : 금융생활 > NH콕마이카 > 부품별 교체 주기 설정
* @ 파일명     : src\views\page\PD\CA\PDCA1104\PDCA1104.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-08-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-31              CS516029              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>부품 별 교체주기 설정</h1>
		</div>

        <div class="popup_content com_bg_type00">
			<div class="com_inner com_space_type01 com_inputarea_type07 pb30">
				<div class="com_input_type01 com_word1">
                    <label for="odmtrDist"><span class="txt_label">현 주행거리</span></label>
                    <input type="tel" v-model="odmtrDist" readonly title="현 주행거리">
                    <div class="del_txt">
                        <span class="com_inputtxtright2">㎞</span>
                    </div>
                </div>
				<div class="com_input_type01 com_word1">
                    <label for="odmtrDistEstVal01"><span class="txt_label">엔진오일/오일필터</span></label>
                    <input type="tel" v-model="odmtrDistEstVal01" ref="odmtrDistEstVal01" pattern="[0-9]*" maxlength="12" @keyup="addComma('odmtrDistEstVal01', $event)" @keyup.enter="moveNextTag($event)" title="엔진오일/오일필터 교체주기 입력">
                    <div class="del_txt">
                        <span class="com_inputtxtright2">㎞</span>
                    </div>
                </div>
				<div class="com_input_type01 com_word1">
                    <label for="odmtrDistEstVal02"><span class="txt_label">에어컨 필터</span></label>
                    <input type="tel" v-model="odmtrDistEstVal02" ref="odmtrDistEstVal02" pattern="[0-9]*" maxlength="12" @keyup="addComma('odmtrDistEstVal02', $event)" @keyup.enter="moveNextTag($event)" title="에어컨 필터 교체주기 입력">
                    <div class="del_txt">
                        <span class="com_inputtxtright2">㎞</span>
                    </div>
                </div>
				<div class="com_input_type01 com_word1">
                    <label for="odmtrDistEstVal03"><span class="txt_label">에어크리너</span></label>
                    <input type="tel" v-model="odmtrDistEstVal03" ref="odmtrDistEstVal03" pattern="[0-9]*" maxlength="12" @keyup="addComma('odmtrDistEstVal03', $event)" @keyup.enter="moveNextTag($event)" title="에어크리너 교체주기 입력">
                    <div class="del_txt">
                        <span class="com_inputtxtright2">㎞</span>
                    </div>
                </div>
				<div class="com_input_type01 com_word1">
                    <label for="odmtrDistEstVal04"><span class="txt_label">브레이크오일</span></label>
                    <input type="tel" v-model="odmtrDistEstVal04" ref="odmtrDistEstVal04" pattern="[0-9]*" maxlength="12" @keyup="addComma('odmtrDistEstVal04', $event)" @keyup.enter="moveNextTag($event)" title="브레이크오일 교체주기 입력">
                    <div class="del_txt">
                        <span class="com_inputtxtright2">㎞</span>
                    </div>
                </div>
				<div class="com_input_type01 com_word1">
                    <label for="odmtrDistEstVal05"><span class="txt_label">배터리</span></label>
                    <input type="tel" v-model="odmtrDistEstVal05" ref="odmtrDistEstVal05" pattern="[0-9]*" maxlength="12" @keyup="addComma('odmtrDistEstVal05', $event)" @keyup.enter="moveNextTag($event)" title="배터리 교체주기 입력">
                    <div class="del_txt">
                        <span class="com_inputtxtright2">㎞</span>
                    </div>
                </div>
				<div class="com_input_type01 com_word1">
                    <label for="odmtrDistEstVal06"><span class="txt_label">타이어</span></label>
                    <input type="tel" v-model="odmtrDistEstVal06" ref="odmtrDistEstVal06" pattern="[0-9]*" maxlength="12" @keyup="addComma('odmtrDistEstVal06', $event)" title="타이어 교체주기 입력">
                    <div class="del_txt">
                        <span class="com_inputtxtright2">㎞</span>
                    </div>
                </div>
			</div>

			<div class="com_inner">
				<strong class="com_box_tit style01">교체기준 주행거리를 직접 설정 할 수 있어요.</strong>
				<div class="com_box_type01 com_box_list change_parts_box">
					<div class="new_tit_area">
						<div class="tit"><span>소모품 교체주기 기본값 예시</span></div>
					</div>
					<div class="cont_area">
						<strong>(교체주기 설정값 - 교체주기 제외한 거리) ÷ 월 평균 주행거리</strong>
						<div class="com_box_type02">
							<p class="com_txtinfo_type01 style01">
								교체주기 제외한 거리란?<br>
								<span>소모품을 주기마다 교체 완료한 거리에서 제외된 주행거리<br>단, 최초 교체 예정일 전이라면 ‘현 주행거리’ 로 계산</span>
							</p>
						</div>
					</div>
					<div>
						<strong>1. {{cusnm}} 운전자 정보</strong>
						<ul class="bl_dot_list">
							<li>현 주행거리: 58,000km</li>
							<li>연 평균 주행거리: 20,000km</li>
						</ul>

						<strong>2. 엔진오일 및 에이컨 필터</strong>
						<ul class="bl_dot_list">
							<li>(10,000-(58,000-50,000))÷(20,000÷12) ≒ 1.2개월</li>
							<li>당월을 포함한 익월 교체 예정일</li>
						</ul>

						<strong>3. 에어크리너</strong>
						<ul class="bl_dot_list">
							<li>(40,000-(58,000-40,000))÷(20,000÷12) ≒ 13.2개월</li>
							<li>당월을 포함한 내년 익월 교체 예정일</li>
						</ul>

						<strong>4. 브레이크오일</strong>
						<ul class="bl_dot_list">
							<li>(50,000-(58,000-50,000))÷(20,000÷12) ≒ 25.2개월</li>
						</ul>

						<strong>5. 배터리 및 타이어</strong>
						<ul class="bl_dot_list">
							<li>(60,000-58,000)÷(20,000÷12) ≒ 1.2개월</li>
							<li>당월을 포함한 익월 교체 예정일</li>
						</ul>
					</div>
					<div class="com_box_type02">
						<p class="com_txtinfo_type01">
							<span>해당 월 일자에 상관없이 월 기준으로 계산하며 현재월은 포함합니다.</span>
						</p>
					</div>
				</div>
			</div>

        </div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a @click.prevent="fn_insert()" class="btn btn_mint" href="javascript:void(0);">저장</a>
			</div>
		</div>

		<a class="btn_close" @click.prevent="close()" href="javascript:void(0);"><span class="blind">팝업닫기</span></a>
    </div>
</template>
<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {keyupNumFormat} from '@/utils/number'
import modalService from '@/service/modalService'
import _ from 'lodash'

export default {
    name : "PDCA1104",
    data: () => {
		return {
            // input 
            mydtCusno:"", // 마이데이터고객번호
			vhcnoVal:"",  // 차량번호값
			cusnm:"",
			
			// output
			odmtrDist:0,     // 주행거리(현재)
			ttcn:0,          // 총건수
			mtncHdngList:[], // 정비항목목록

			// 주행거리설정값
			odmtrDistEstVal01:0, // 엔진오일/오일필터
			odmtrDistEstVal02:0, // 에어컨 필터
			odmtrDistEstVal03:0, // 에어크리너
			odmtrDistEstVal04:0, // 브레이크오일
			odmtrDistEstVal05:0, // 배터리
			odmtrDistEstVal06:0, // 타이어

			// input(등록/수정시)
			inputList:[]
        }
    },
    methods: {
        initComponent(params) {
            this.vhcnoVal = params.vhcnoVal || ''
			this.mydtCusno = this.getUserInfo('mydtCusno')
			this.cusnm = this.getUserInfo("cusnm")

            this.getData()
		},
		getData() {

			const config = {
				url: '/pd/ca/04r01',
				data: {"mydtCusno":this.mydtCusno // 마이데이터고객번호
                      ,"vhcnoVal": this.vhcnoVal  // 차량번호값
					}
			};
			
            apiService.call(config).then(response => {
                this.odmtrDist    = keyupNumFormat(response.odmtrDist) || 0
                this.ttcn         = response.ttcn                      || 0
				this.mtncHdngList = response.mtncHdngList              || []
				
				if(this.mtncHdngList.length > 0) {
					// 값이 존재하지 않을 경우엔 기본값으로 세팅
					this.odmtrDistEstVal01 = keyupNumFormat(_.find(this.mtncHdngList, {"carMtncHdngC":"01"}).odmtrDistEstVal) || '10,000'
					this.odmtrDistEstVal02 = keyupNumFormat(_.find(this.mtncHdngList, {"carMtncHdngC":"02"}).odmtrDistEstVal) || '10,000'
					this.odmtrDistEstVal03 = keyupNumFormat(_.find(this.mtncHdngList, {"carMtncHdngC":"03"}).odmtrDistEstVal) || '40,000'
					this.odmtrDistEstVal04 = keyupNumFormat(_.find(this.mtncHdngList, {"carMtncHdngC":"04"}).odmtrDistEstVal) || '50,000'
					this.odmtrDistEstVal05 = keyupNumFormat(_.find(this.mtncHdngList, {"carMtncHdngC":"05"}).odmtrDistEstVal) || '60,000'
					this.odmtrDistEstVal06 = keyupNumFormat(_.find(this.mtncHdngList, {"carMtncHdngC":"06"}).odmtrDistEstVal) || '60,000'
				} else {
					// 기본값
					this.odmtrDistEstVal01 = '10,000'
					this.odmtrDistEstVal02 = '10,000'
					this.odmtrDistEstVal03 = '40,000'
					this.odmtrDistEstVal04 = '50,000'
					this.odmtrDistEstVal05 = '60,000'
					this.odmtrDistEstVal06 = '60,000'
				}
            });
		},
		addComma(str, e="") {

			if(e.keyCode === 13) return false

			let selectionStartPos
			let selectionEndPos
			
            switch(str) {
                case "odmtrDistEstVal01" :

					selectionStartPos = this.$refs.odmtrDistEstVal01.selectionStart
					selectionEndPos = this.$refs.odmtrDistEstVal01.selectionEnd

                    if(this.odmtrDistEstVal01.length == 1 && this.odmtrDistEstVal01 == 0) {
                        this.odmtrDistEstVal01 = this.odmtrDistEstVal01.slice(0, -1)
                    } else {
                        this.odmtrDistEstVal01 = this.odmtrDistEstVal01.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.odmtrDistEstVal01 = this.odmtrDistEstVal01.split(",").join("")
                        this.odmtrDistEstVal01 = keyupNumFormat(this.odmtrDistEstVal01)
					}
					
					if(e.keyCode === 8) {
						this.$nextTick(()=>{
							this.$refs.odmtrDistEstVal01.focus()
							this.$refs.odmtrDistEstVal01.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}

					break

                case "odmtrDistEstVal02" :

					selectionStartPos = this.$refs.odmtrDistEstVal02.selectionStart
					selectionEndPos = this.$refs.odmtrDistEstVal02.selectionEnd

                    if(this.odmtrDistEstVal02.length == 1 && this.odmtrDistEstVal02 == 0) {
                        this.odmtrDistEstVal02 = this.odmtrDistEstVal02.slice(0, -1)
                    } else {
                        this.odmtrDistEstVal02 = this.odmtrDistEstVal02.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.odmtrDistEstVal02 = this.odmtrDistEstVal02.split(",").join("")
                        this.odmtrDistEstVal02 = keyupNumFormat(this.odmtrDistEstVal02)
					}
					
					if(e.keyCode === 8) {
						this.$nextTick(()=>{
							this.$refs.odmtrDistEstVal02.focus()
							this.$refs.odmtrDistEstVal02.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}

					break

                case "odmtrDistEstVal03" :

					selectionStartPos = this.$refs.odmtrDistEstVal03.selectionStart
					selectionEndPos = this.$refs.odmtrDistEstVal03.selectionEnd

                    if(this.odmtrDistEstVal03.length == 1 && this.odmtrDistEstVal03 == 0) {
                        this.odmtrDistEstVal03 = this.odmtrDistEstVal03.slice(0, -1)
                    } else {
                        this.odmtrDistEstVal03 = this.odmtrDistEstVal03.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.odmtrDistEstVal03 = this.odmtrDistEstVal03.split(",").join("")
                        this.odmtrDistEstVal03 = keyupNumFormat(this.odmtrDistEstVal03)
					}
					
					if(e.keyCode === 8) {
						this.$nextTick(()=>{
							this.$refs.odmtrDistEstVal03.focus()
							this.$refs.odmtrDistEstVal03.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}

					break

                case "odmtrDistEstVal04" :

					selectionStartPos = this.$refs.odmtrDistEstVal04.selectionStart
					selectionEndPos = this.$refs.odmtrDistEstVal04.selectionEnd

                    if(this.odmtrDistEstVal04.length == 1 && this.odmtrDistEstVal04 == 0) {
                        this.odmtrDistEstVal04 = this.odmtrDistEstVal04.slice(0, -1)
                    } else {
                        this.odmtrDistEstVal04 = this.odmtrDistEstVal04.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.odmtrDistEstVal04 = this.odmtrDistEstVal04.split(",").join("")
                        this.odmtrDistEstVal04 = keyupNumFormat(this.odmtrDistEstVal04)
					}
					
					if(e.keyCode === 8) {
						this.$nextTick(()=>{
							this.$refs.odmtrDistEstVal04.focus()
							this.$refs.odmtrDistEstVal04.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}

					break

                case "odmtrDistEstVal05" :

					selectionStartPos = this.$refs.odmtrDistEstVal05.selectionStart
					selectionEndPos = this.$refs.odmtrDistEstVal05.selectionEnd

                    if(this.odmtrDistEstVal05.length == 1 && this.odmtrDistEstVal05 == 0) {
                        this.odmtrDistEstVal05 = this.odmtrDistEstVal05.slice(0, -1)
                    } else {
                        this.odmtrDistEstVal05 = this.odmtrDistEstVal05.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.odmtrDistEstVal05 = this.odmtrDistEstVal05.split(",").join("")
                        this.odmtrDistEstVal05 = keyupNumFormat(this.odmtrDistEstVal05)
					}
					
					if(e.keyCode === 8) {
						this.$nextTick(()=>{
							this.$refs.odmtrDistEstVal05.focus()
							this.$refs.odmtrDistEstVal05.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}

					break

                case "odmtrDistEstVal06" :

					selectionStartPos = this.$refs.odmtrDistEstVal06.selectionStart
					selectionEndPos = this.$refs.odmtrDistEstVal06.selectionEnd

                    if(this.odmtrDistEstVal06.length == 1 && this.odmtrDistEstVal06 == 0) {
                        this.odmtrDistEstVal06 = this.odmtrDistEstVal06.slice(0, -1)
                    } else {
                        this.odmtrDistEstVal06 = this.odmtrDistEstVal06.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.odmtrDistEstVal06 = this.odmtrDistEstVal06.split(",").join("")
                        this.odmtrDistEstVal06 = keyupNumFormat(this.odmtrDistEstVal06)
					}
					
					if(e.keyCode === 8) {
						this.$nextTick(()=>{
							this.$refs.odmtrDistEstVal06.focus()
							this.$refs.odmtrDistEstVal06.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}

					break
            }
		},
		remove(value) {
			return (typeof value === "string") ? value.split(".").join("").split("-").join("").split(",").join("") : value
		},
		fn_insert() {

			const configConfirm = {
				content: ['저장하시겠습니까?'],
				title  : "",
			}

			if(this.odmtrDistEstVal01.length == 0 || this.odmtrDistEstVal01 == 0) {
				modalService.alert("엔진오일/오일필터는 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.odmtrDistEstVal02.length == 0 || this.odmtrDistEstVal02 == 0) {
				modalService.alert("에어컨 필터는 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.odmtrDistEstVal03.length == 0 || this.odmtrDistEstVal03 == 0) {
				modalService.alert("에어크리너는 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.odmtrDistEstVal04.length == 0 || this.odmtrDistEstVal04 == 0) {
				modalService.alert("브레이크오일은 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.odmtrDistEstVal05.length == 0 || this.odmtrDistEstVal05 == 0) {
				modalService.alert("배터리는 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.odmtrDistEstVal06.length == 0 || this.odmtrDistEstVal06 == 0) {
				modalService.alert("타이어는 필수입력항목입니다.").then(() => {});
				return;
			}

			// list세팅
			this.fn_setInputList()

			modalService.confirm(configConfirm).then(text => {
				if(text == "예") {

					const config = {
						url: '/pd/ca/04s01',

						data: {"mydtCusno":this.mydtCusno
								,"vhcnoVal": this.vhcnoVal
								,"mtncHdngList" : this.inputList
								}
					};
					
					apiService.call(config).then(response => {

						if(response.rspC == '0000'){
							modalService.alert("저장되었습니다.").then(() => {
								// 재조회
								this.close('reload')
							});
						} else {
							modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {
								//this.close(response);
							})
						}
					});
				}
			})
		},
		fn_setInputList() {
			
			this.inputList = []

			let input1 = {}
			input1.carMtncHdngC = '01'
			input1.odmtrDistEstVal = Number(this.remove(this.odmtrDistEstVal01))

			let input2 = {}
			input2.carMtncHdngC = '02'
			input2.odmtrDistEstVal = Number(this.remove(this.odmtrDistEstVal02))

			let input3 = {}
			input3.carMtncHdngC = '03'
			input3.odmtrDistEstVal = Number(this.remove(this.odmtrDistEstVal03))

			let input4 = {}
			input4.carMtncHdngC = '04'
			input4.odmtrDistEstVal = Number(this.remove(this.odmtrDistEstVal04))

			let input5 = {}
			input5.carMtncHdngC = '05'
			input5.odmtrDistEstVal = Number(this.remove(this.odmtrDistEstVal05))

			let input6 = {}
			input6.carMtncHdngC = '06'
			input6.odmtrDistEstVal = Number(this.remove(this.odmtrDistEstVal06))

			this.inputList.push(input1)
			this.inputList.push(input2)
			this.inputList.push(input3)
			this.inputList.push(input4)
			this.inputList.push(input5)
			this.inputList.push(input6)
		}
    },
    mounted() {
		this.initComponent(this.params)
		
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin
        ,commonMixin
    ],
}
</script>