<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 마이농가설정 > 자가노동비
* @ 페이지설명 : 고용노동비 등록
* @ 파일명     : src/views/page/SZ/ST/SZST2105/SZST2105.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-21              CS515729                 최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>자가노동비 관리</h1>
		</div>
		<div class="popup_content com_bg_type00">
			<div class="com_inner">
				<strong class="com_box_tit02">자가노동비 상세</strong>
			</div>
			<div class="com_inner">
				<template v-if="isCurrYearYn === false">
					<div class="com_box_type01 toggle_list_box2">
						<div data-ui-toggle="box" class="toggle_box_area active open">
							<button type="button" class="view_btn" aria-expanded="true">
								<p class="tit">{{baseYYYY}}년</p>
								<em class="open">열기</em>
								<em class="close">닫기</em>
							</button>
						</div>
						<!--2021/10/20(수) 변경-->
						<div class="view_cont toggle_list_type_01">
							<div class="com_boxarea_type01">

								<div class="com_input_type01 com_word1">
										<label for="com_inputm">남자</label>
										<input type="tel" id="com_inputm" class="com_txtleft_type02 input_right" :class="maleAmt.length > 0 ? 'focusON' : ''" 
												v-model="maleAmt" @input="fn_addComma($event, 'M')" @keyup="moveNextTag($event)" placeholder="" title="남자">

										<div class="del_txt">
											<a href="javascript:void(0);" @click="fn_delAmt('M')" class="com_btn_delete2"  v-if="maleAmt.length > 0">
												<span class="blind">삭제</span>
											</a>
											<span class="com_inputtxtright2 style01">원</span>
										</div>

								</div>
								<div class="com_input_type01 com_word1">
									<label for="com_inputw">여자</label>
									<input type="tel" id="com_inputw" class="com_txtleft_type02 input_right" :class="femaleAmt.length > 0 ? 'focusON' : ''" 
											v-model="femaleAmt" @input="fn_addComma($event, 'F')" placeholder="" title="여자">

									<div class="del_txt">
										<a href="javascript:void(0);" @click="fn_delAmt('F')" class="com_btn_delete2" v-if="femaleAmt.length > 0">
											<span class="blind">삭제</span>
										</a>
										<span class="com_inputtxtright2 style01">원</span>
									</div>
								</div>

							</div>
						</div>
						<!--2021/10/20(수) 변경-->
					</div>
				</template>
				<!--자가노동비 목록  > 0인 경우-->
				<template v-if="lbrcsList.length > 0">
					<div class="com_box_type01 toggle_list_box2" v-for="(item, idx) in lbrcsList" :key="idx">
						<!--template(Start)--> 						
						<template v-if="baseYYYY === item.basyy">    <!--현재일자의 년도 = 리스트.기준년도-->
							<div data-ui-toggle="box" class="toggle_box_area active open">
								<button type="button" class="view_btn" aria-expanded="true">
									<p class="tit">{{item.basyy}}년</p>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>
							
							<!--2021/10/20(수) 변경-->
							<div class="view_cont toggle_list_type_01">
								<div class="com_boxarea_type01">

									<div class="com_input_type01 com_word1">
										<label :for="'com_inputm'+idx">남자</label>
										<input type="tel" :id="'com_inputm'+idx" class="com_txtleft_type02 input_right" @input="fn_addComma($event, 'M')" 
												:class="maleAmt.length > 0 ? 'focusON' : ''" @keyup="moveNextTag($event)" v-model="maleAmt" placeholder="" 
												title="남자">

										<div class="del_txt">
											<a href="javascript:void(0);" class="com_btn_delete2 blur" v-on:click.prevent="fn_delAmt('M')" v-if="maleAmt.length > 0">
												<span class="blind">삭제</span>
											</a>
											<span class="com_inputtxtright2 style01">원</span>
										</div>
									</div>
									<div class="com_input_type01 com_word1">
										<label :for="'com_inputw'+idx">여자</label>
										<input type="tel" :id="'com_inputw'+idx" class="com_txtleft_type02 input_right" @input="fn_addComma($event, 'F')"  
												:class="femaleAmt.length > 0 ? 'focusON' : ''" v-model="femaleAmt" placeholder="" title="여자">

										<div class="del_txt">
											<a href="javascript:void(0);" class="com_btn_delete2 blur" v-on:click.prevent="fn_delAmt('F')" v-if="femaleAmt.length > 0">
												<span class="blind">삭제</span>
											</a>
											<span class="com_inputtxtright2 style01">원</span>
										</div>
									</div>

								</div>
							</div>
							<!--2021/10/20(수) 변경-->
						</template>
						<template v-else>
							<div data-ui-toggle="box" class="toggle_box_area">
								<button type="button" class="view_btn" aria-expanded="false">
									<p class="tit">{{item.basyy}}년</p>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>
							<ul class="view_cont toggle_list_type_01">
								<li>
									<div class="com_input_type01 com_word1">
										<label :for="'com_inputm'+idx">남자</label>
										<input type="text" :id="'com_inputm'+idx" class="com_txtleft_type02 input_right" disabled="true" 
												:value="item.maleLbrcs | numberFilter" placeholder="0" title="남자">

										<div class="del_txt"> 
											<a href="javascript:void(0);" class="com_btn_delete2 blur" style="display: none;" v-show="false">
												<span class="blind">삭제</span>
											</a> 
											<span class="com_inputtxtright2 style01">원</span> 
										</div>
									</div>
								</li>
								<li>
									<div class="com_input_type01 com_word1">
										<label :for="'com_inputw'+idx">여자</label>
										<input type="text" :id="'com_inputw'+idx" class="com_txtleft_type02 input_right" disabled="true" 
												:value="item.wmnLbrcs | numberFilter" placeholder="0" title="여자">

										<div class="del_txt">
											<a href="javascript:void(0);" class="com_btn_delete2 blur" style="display: none;" v-show="false">
												<span class="blind">삭제</span>
											</a>
											<span class="com_inputtxtright2 style01">원</span>
										</div>
									</div>
								</li>
							</ul>
						</template> <!--template(End)-->
					</div>
				</template>
				<!--자가노동비 목록이 존재하지 않을 경우-->
				<template v-else> 
					<div class="no_data_box">
						<div class="no_data_list">
							<p>조회된 정보가 없습니다.</p>
						</div>
					</div>
				</template> 
			</div>
		</div>
        <div class="popup_footer fixed ">
			<div class="btn_half_box">
				<a href="javascript:void(0);" @click="reset('1')" class="btn btn_grey">취소</a>
				<a href="javascript:void(0);" @click="fn_saveInfo()" class="btn btn_mint">저장</a>
			</div>
		</div>
		<a href="javascript:void(0);"   @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
</template>
<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
	import apiService from '@/service/apiService'
	import modalService from '@/service/modalService'
	import {dateFormat} from '@/utils/date'
	import {numberFormat} from '@/utils/number'

    export default {
        name : "SZST2111",
        data: () => {
            return {
                respInfo     : {},		// 응답결과
                lbrcsList    : [],		// 고용노동비목록
				baseYYYY     : "",		// 당해년도
				isCurrYearYn : false,	// 당해년도 존재여부
				maleAmt      : "",		// 자가노동비 남성
				femaleAmt    : "",		// 자가노동비 여성

				msg 		 : "",
				restMsg 	 : "",

            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        mounted() {
			this.initComponent()
			//PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },

		methods: {
			initComponent() {
                this.baseYYYY = dateFormat(new Date(), "YYYY")
				this.getData()
			},

            //**************
            // [조회]
            //***************/
			getData() {
				const config = {
                    url: '/sz/st/11r01',
                    data: {
                        "mydtCusno" : this.getUserInfo("mydtCusno"),
                        "basyy"     : this.baseYYYY
					}
                }
                apiService.call(config).then(response => {
					this.respInfo = response
					this.lbrcsList = this.respInfo.lbrcsList || []

					//당해년도 데이타 존재여부
					let currIdx = this.lbrcsList.findIndex(x => x.basyy === this.baseYYYY)   //기준년도 = (변수)현재일자의 년도
					if(currIdx > -1) {
						this.isCurrYearYn = true
						this.maleAmt   = numberFormat(this.lbrcsList[currIdx].maleLbrcs)  //남자인건비
						this.femaleAmt = numberFormat(this.lbrcsList[currIdx].wmnLbrcs)   //여자인건비
					} else {
						this.isCurrYearYn = false
					}

                    this.$nextTick(() => {
                        this.callJQueryFncExcute()
                    })
				})
			},

			// 금액입력시 천단위 , 추가
			fn_addComma(e, gbn) {

				let amt = (gbn === "M") ? this.maleAmt : this.femaleAmt
				if(amt.length == 1 && amt == 0) {
					amt = amt.slice(0, -1)
				} else {
					amt = amt.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
					amt = amt.split(",").join("")
					if(amt.length > 11) {
						amt = amt.slice(0, 10)
					}

					if(amt.length > 0) {
						amt = numberFormat(amt)
					}
				}

				//gbn : M 남, F 여
				if(gbn ==="M") {
					e.target.value = amt
					this.maleAmt = amt
				} else {
					e.target.value = amt
					this.femaleAmt = amt
				}
			},

			//입력 텍스트 삭제
			fn_delAmt(gbn) {
				//gbn : M 남, F 여
				if(gbn ==="M") {
					this.maleAmt = ""
				} else {
					this.femaleAmt = ""
				}
			},

            //**************
            // [저장]
            //***************/
            fn_saveInfo() {
				let maleAmt = this.maleAmt.split(",").join("") || '0'
				let femaleAmt = this.femaleAmt.split(",").join("") || '0'

				if(maleAmt === '0' || femaleAmt === '0') {
					modalService.alert("자가노동비를 입력하여주세요.")
					return
				}

				//자가노동비 저장
				const config = {
                    url: '/sz/st/11s01',
                    data: {
						"mydtCusno" : this.getUserInfo("mydtCusno"),
						"basyy"     : this.baseYYYY,
                        "maleLbrcs" : maleAmt,
                        "wmnLbrcs"  : femaleAmt
					}
				}
                apiService.call(config).then(response => {

					if(response.rspC == "0000") {
                        modalService.alert("저장되었습니다.").then(() => {
                            // 닫기
                            this.close()
                        });
                    }
				})
            },

			//[취소]버튼 클릭
			reset(flag) {
				this.selItem = flag

				console.log("[SZST2111]reset/flag=>>"+this.selItem)

				if (this.selItem === '1' ) {   
					this.restMsg = '자가노동비 관리'
					this.msg = this.restMsg+' 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'

					const config = {
						content: [this.msg],
						title  : "",
					}
					modalService.confirm(config).then(text => {
						if(text == "예") {
							this.close('complete')
						}
					})
				} else  if (this.selItem === '0' ) {  
					this.close('complete')
				}
			},
        }
    }
</script>