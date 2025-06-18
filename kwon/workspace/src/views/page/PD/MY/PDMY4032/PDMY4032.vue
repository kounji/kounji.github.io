<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 도전목표챌린지 > 금융목표 > 지출목표
* @ 페이지설명 : 전체메뉴 > 도전목표챌린지 > 금융목표 > 지출목표 > 지출목표 등록
* @ 파일명     : src/views/page/PD/MY/PDMY4032/PDMY4032.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-05-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-28              CS516029                 최초작성
* 2022-07-13              CS528053                 고도화 파일명, UI 변경 및 고도화 개발(PDMY1103.vue -> PDMY2032.vue)
* 2025-02-05              CS541015                 고도화 파일명, UI 변경 및 고도화 개발(PDMY2032.vue -> PDMY4032.vue)
*************************************************************************/
-->

<template>
    <div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>지출목표</h1>
		</div>
		<div class="popup_content fixed_mygoal_top"><!-- 하단 버튼 없을때 com_no_bottom -->
			<!--[v4.0] 입력영역 수정 / 버튼 추가 / summary 추가-->
			<div class="mygoal_top_wrap">
				<div class="btns_wrap">
					<button type="button" class="stdBtn innerType01" @click="setBf1mAm()">지난 달 지출 비용 설정</button>
					<button type="button" class="stdBtn innerType01" @click="reset()">설정 초기화</button>
				</div>
				<div class="mygoal_top">
					<h1 class="pointColor green">{{currMm}}월 지출목표</h1>
					<div class="com_input_type01 com_won01">
						<input type="tel" id="com_input01" class="input_right" ref="xpsObtAm" v-model="xpsObtAm" maxlength="19" @input="addComma('xpsObtAm', '', $event)" placeholder="이번달 예산 입력" title="한달 예산">
						<!-- <p class="mygoal_price"><span class="num">{{xpsObtAm | numberFilter}}</span>만원</p> -->
						<label for="com_input01"><span class="txt_label_x">한달 예산</span></label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2 blur"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">원</span>
						</div>
					</div>
				</div>

				<ul class="list_type_2023">
					<li>
						<dl>
							<dt>지난 달 지출</dt>
							<dd><span class="num">{{xpsBf1mAm | numberFilter}}</span>원</dd>
						</dl>
						<dl>
							<dt>최근 3개월 평균 지출</dt>
							<dd><span class="num">{{avgXpsObtAm | numberFilter}}</span>원</dd>
						</dl>
					</li>
				</ul>

				<div class="gray_box_m" v-if="unClfYn == 'Y'">
					<a href="javascript:void(0);" class="link_arrow icon_notice" @click="movePopup('1')">미분류 지출의 카테고리를 지정해 주세요</a>
				</div>
			</div>
			<!--//[v4.0] 입력영역 수정 / 버튼 추가 / summary 추가-->

			<hr class="hr02">

			<div class="com_inner">
				<div class="mygoal_cont_title">
					<strong class="com_box_tit">카테고리 별 지출</strong>
					<!-- <a href="javascript:void(0);" class="link_arrow" @click="movePopup('2')">정기지출 관리</a> -->

					<div class="custom_tooltip">
						<div class="com_tooltip_type02 com_tooltip_type03">
							<a href="javascript:void(0);" class="com_btn_info" role="button">
								<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
							</a>
							<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
								<div>
									<p>정기지출 금액은 지출분석 화면에서 설정 가능합니다.</p>
									<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
								</div> 
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--[v4.0] 설정예산 계산 / 예산입력 변경-->
			<div class="com_inner mygoal_cont_wrap">
				<!-- 카테고리 -->
				<div class="mygoal_cont" v-for="(ctrgInfo, index) in categoryList" :key="index">
					<p class="sub_title" :class="ctrgInfo.asetAmnCtgrId">{{ctrgInfo.asetAmnCtgrNm}}</p>
					
					<!--!!사용시  .hide 를 삭제하고 text 를 넣어주세요. 사라질때는 hide class 추가 default 상태가 hide 있는 상태입니다. 초과시 .red-->
					<p class="reckoning" role="alert" v-if="focusIndex === index && !isTotalExceeded" aria-live="assertive">설정 가능 예산 {{setXpsObtAm | numberFilter}}만원</p>
					<p class="reckoning red" role="alert" v-if="isTotalExceeded && ctrgInfo.ctgrVarXpsAm > 0" aria-live="assertive">설정 가능 예산을 초과했어요</p>
					<div class="com_input_type01 input_title_type" :class="setXpsObtAm >= 0 ? '' : 'error'">					
						<label for="varXpsAm"></label>
						<input type="tel" id="varXpsAm" ref="varXpsAm" class="com_txtright_type01" v-model="ctrgInfo.ctgrVarXpsAm" placeholder="이번 달 예산 입력" title="이번 달 예산 입력 입력" maxlength="15" @keyup="addComma('varXpsAm', index, $event)" @focus="focusIndex = index;" @blur="focusIndex = null;">
						<div class="del_txt type01"><!-- 추후 사용을 위해 삭제하지 않음 신규코드에도 삽입 jlee -->
							<a href="javascript:void(0);" class="com_btn_delete2 blur"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">만원</span>
						</div>
					</div>

					<dl class="gray_box_m">
						<div>
							<dt>정기지출</dt>
							<dd><span class="num">{{ctrgInfo.ctgrFxtmXpsAm | numberFilter}}</span>만원</dd>
						</div>
						<div>
							<dt>지난달</dt>
							<dd><span class="num">{{ctrgInfo.ctgrBefXpsAm | numberFilter}}</span>만원</dd>
						</div>
					</dl>
				</div>
			</div>
			<!--//[v4.0] 설정예산 계산 / 예산입력 변경-->

			<hr class="hr02">

			<!--[v4.0] 목표설정 추가-->
			<div class="com_inner">
				<div class="mygoal_cont_title">
					<strong class="com_box_tit">목표 설정</strong>
					<!-- 0925 삭제 -->
					<!-- <a href="#nolink" class="link_arrow">정기지출 관리</a> -->
					<!-- //0925 삭제 -->
					
					<!-- 0925 툴팁 추가 -->
					<div class="custom_tooltip">
						<div class="com_tooltip_type02 com_tooltip_type03">
							<a href="javascript:void(0);" class="com_btn_info" role="button">
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
							<input type="radio" v-model="edYm" name="radio5" id="radio5-1" :value="999912">
							<label for="radio5-1" role="radio">
								<span>매월 자동반영</span><!-- [v4.0]문구수정 -->
							</label>
						</div>
					</li>
					<li>
						<div class="btn_radio">
							<input type="radio" v-model="edYm" name="radio5" id="radio5-2" :value=stYm>
							<label for="radio5-2" role="radio">
								<span>다음 달 초기화</span><!-- [v4.0]문구수정 -->
							</label>
						</div>
					</li>
				</ul>
			</div>
			<!--//[v4.0] 목표설정 추가-->
		</div>

		<div class="popup_footer fixed">
			<div class="btn_group">
				<a href="javascript:void(0);" role="button" @click.prevent="!saveChk ? insertExpensePerpose() : false" class="btn btn_mint" :class="saveChk ? 'btn_off' : ''">저장</a>
			</div>
		</div>
		
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close('reSelect')"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import {keyupNumFormat, numberFormat} from '@/utils/number'
import {dateFormat} from '@/utils/date'
import LCIP2005 from '@/views/page/LC/IP/LCIP2005/LCIP2005' // 지출 카테고리 변경
//import _ from 'lodash'

export default {
    name : "PDMY4032",
    data: () => {
        return {
			categoryList: [],		// 카테고리목록
			detailListIn: [],		// 카테고리 저장 목록
			varXpsAm: 0,			// 변동지출금액
			unClfYn: 'N',			// 미분류 여부
			currMm: "",				// 현재월
			xpsObtAm: 0,			// 지출목표금액(최근3개월 평균, 미분류 제외)
			avgXpsObtAm: 0,			// 최근3개월 평균 지출목표금액(미분류 포함)
			xpsBf1mAm: 0,           // 전월 지출금액
			unClfAm: 0,				// 미분류 금액
			mydtCusno: "",			// 고객번호
			insYn:"",				// 등록, 수정
			stYm:"",				// 조회월
			edYm:"",                // 목표설정년월
			//setXpsObtAm: 0,         // 설정가능예산금액
			focusIndex : null,   // 카테고리변동지출 focus YN 
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
        initComponent(param) {

			this.stYm = dateFormat(new Date(), 'YYYYMM')
			this.currMm = dateFormat(new Date(), "M")   //현재월 10월이전 1자리, 10월부턴 2자리

			this.getData(param)	
			
        },
        getData(param) {
            // 카테고리별 최근3개월 평균 조회
			this.getCategoryList()

			console.log(param)
			console.log(param)
			console.log(param)

			if (param !== undefined && param !== null && param.modifyYn == 'Y' && param.stYm !== null)
			{
				this.insYn = "U" // 수정
				this.stYm = param.stYm
			}
			else
			{
				this.subListIn = []
				this.insYn = "C" // 등록
			}
		},
		// 카테고리별 최근3개월 평균 조회
		getCategoryList() {
			const config = {

				url: '/pd/my/32r01',
				data: {
					mydtCusno: this.getUserInfo('mydtCusno'), // 마이데이터고객번호
					stYm : this.stYm
				}
			};

			apiService.call(config).then(response => {
				console.log(response)

				this.xpsObtAm = response.xpsObtAm || 0      // 지출목표금액(총합계)
				let tempCategoryList = response.subList || []
				let result = []
				tempCategoryList.reduce(function(res, value) {
					if(!res[value.asetAmnCtgrId]) {
						res[value.asetAmnCtgrId] = 
						{ 
							asetAmnCtgrId : value.asetAmnCtgrId, 
							ctgrnm : value.ctgrnm, 
							ctgrFxtmAm: 0, 
							ctgrVarAm: 0, 
							ctgrXpsObtAm: 0, 
							ctgrPreXpsAm: 0, 
							ctgrBefXpsAm: 0 
						}
						result.push(res[value.asetAmnCtgrId])
					}

					res[value.asetAmnCtgrId].ctgrFxtmAm	    += Number(value.ctgrFxtmAm)		    // 카테고리정기지출금액
					res[value.asetAmnCtgrId].ctgrVarAm	    += Number(value.ctgrVarAm)		    // 카테고리변동지출금액
					res[value.asetAmnCtgrId].ctgrXpsObtAm	+= Number(value.ctgrXpsObtAm)		// 카테고리목표금액
					res[value.asetAmnCtgrId].ctgrPreXpsAm	+= Number(value.ctgrPreXpsAm)		// 카테고리당월지출금액
					res[value.asetAmnCtgrId].ctgrBefXpsAm	+= Number(value.ctgrBefXpsAm)		// 카테고리전월지출금액

					return res
				}, {})

				for(let i=0; i < result.length; i++){
					if(result[i].asetAmnCtgrId == 'AS60000000') {
						this.unClfYn = 'Y'
						this.unClfAm = Number(result[i].avgXpsAm)	// 미분류 지출금액
					} else {
						var inputObj = {};
						inputObj.asetAmnCtgrId  = result[i].asetAmnCtgrId		    // 카테고리ID
						inputObj.asetAmnCtgrNm  = result[i].ctgrnm		            // 카테고리명
						inputObj.ctgrFxtmXpsAm	= Math.round(Number(result[i].ctgrFxtmAm) / 10000) || ''		   // 정기지출금액
						inputObj.ctgrVarXpsAm	= Math.round(Number(result[i].ctgrVarAm) / 10000) || ''	       // 변동지출금액
						inputObj.ctgrXpsObtAm	= Math.round(Number(result[i].ctgrXpsObtAm) / 10000) || ''	   // 목표금액(정기지출금액+변동지출금액)
						inputObj.ctgrPreXpsAm   = Math.round(Number(result[i].ctgrPreXpsAm) / 10000) || ''	   // 당월지출금액
						inputObj.ctgrBefXpsAm   = Math.round(Number(result[i].ctgrBefXpsAm) / 10000) || ''	   // 전월지출금액

						this.categoryList.push(inputObj)
					}
					this.xpsBf1mAm += result[i].ctgrBefXpsAm  // 지난달 지출금액
				}
				this.avgXpsObtAm	= Number(response.avgXpsTotAmt)		// 지출목표금액(미분류 포함)
				this.xpsObtAm = this.xpsObtAm > 0 ? numberFormat(this.xpsObtAm) : ''
				this.edYm = response.edYm;

				this.$nextTick(() => {
                     this.callJQueryFncExcute()
                })
			});
		},
		// 카테고리별지출목표 등록
        insertExpensePerpose() {

            this.detailListIn = []

			for(let i=0; i<this.categoryList.length; i++){

				var inputObj = {};
				inputObj.mydtCusno = this.getUserInfo('mydtCusno')
				inputObj.stYm = this.stYm
				inputObj.asetAmnCtgrId = this.categoryList[i].asetAmnCtgrId
				inputObj.xpsObtAm = Number(this.removeComma(this.categoryList[i].ctgrXpsObtAm)) * 10000
				inputObj.varXpsAm = Number(this.removeComma(this.categoryList[i].ctgrVarXpsAm)) * 10000
				inputObj.fxtmXpsAm = Number(this.removeComma(this.categoryList[i].ctgrFxtmXpsAm)) * 10000

				this.detailListIn.push(inputObj)
			}

            let config_url = ''
            let alertMsg
            if(this.insYn == "C") {
                config_url = '/pd/my/32s02'
                alertMsg = '나의 한달 예산 설정이 완료 되었습니다.'
            } else {
                config_url = '/pd/my/32u02'
                alertMsg = '나의 한달 예산 설정이 수정 되었습니다.'
            }

            const configConfirm = {
                content: [alertMsg],
                title  : "",
			}
			const config = {
				url: config_url,
				data: {"mydtCusno": this.getUserInfo('mydtCusno')
					,"stYm" : this.stYm
					,"xpsObtAm" :  Number(this.removeComma(this.xpsObtAm))
					,"edYm": this.edYm
					,"detailListIn" : this.detailListIn}
			};
			
			apiService.call(config).then(response => {

				if(response.rspCd == '0000'){
					modalService.alert(alertMsg).then(() => {
						// 전체페이지 닫기
						//this.closeAll('reSelect')
						this.closeAllData('reSelect')
					});
				} else {
					modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {
						//this.close(response);
					})
				}
			});
		},
		addComma(str, idx, e="") {
			if(e.keyCode === 13) return false

			let selectionStartPos
			let selectionEndPos

            switch(str) {
                case "varXpsAm" :
					const varXpsAms = this.$refs.varXpsAm[idx]
					selectionStartPos = varXpsAms.selectionStart
					selectionEndPos = varXpsAms.selectionEnd

                    if(varXpsAms.value.length >= 1 && varXpsAms.value == 0 || varXpsAms.value == "") {
						varXpsAms.value = 0
					} else {
						varXpsAms.value = varXpsAms.value.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
						varXpsAms.value = varXpsAms.value.split(",").join("")
						this.categoryList[idx].ctgrVarXpsAm = varXpsAms.value
						// varXpsAms.value = keyupNumFormat(varXpsAms.value)
						this.$nextTick(()=>{
							varXpsAms.value = keyupNumFormat(varXpsAms.value)
						})
					}

					if(event.keyCode === 8) {
						this.$nextTick(()=>{
							varXpsAms.focus()
							varXpsAms.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}

					break

                case "xpsObtAm" :
					const xpsObtAm = this.$refs.xpsObtAm;
					selectionStartPos = this.xpsObtAm.selectionStart
					selectionEndPos = this.xpsObtAm.selectionEnd

                    if(xpsObtAm.value.length == 1 && xpsObtAm.value == 0) {
                        xpsObtAm.value = xpsObtAm.value.slice(0, -1)
                    } else {
                        xpsObtAm.value = xpsObtAm.value.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        xpsObtAm.value = xpsObtAm.value.split(",").join("")
						this.$nextTick(()=>{
                        	xpsObtAm.value = keyupNumFormat(xpsObtAm.value)
						})
					}
					
					if(e.keyCode === 8) {
						this.$nextTick(()=>{
							xpsObtAm.focus()
							xpsObtAm.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}
					break
            }
			
		},
		removeComma(value) {
            return (typeof value === "string") ? value.split(",").join("") : value
        },
		// 팝업 호출
		movePopup(clf) {
			let compName
			let today = dateFormat(new Date(), 'YYYYMMDD')
			if(clf == '1') {
				compName = LCIP2005
			} 
			let param = {
				basDt : today
				, pBasYm : this.stYm
			}

            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(response => {
                if(response == "reSelect") {
                    this.getCategoryList()
                }
            })
		},
		setBf1mAm() {
			this.xpsObtAm = '';
			for(let i=0; i < this.categoryList.length; i++){
				this.categoryList[i].ctgrVarXpsAm = this.categoryList[i].ctgrBefXpsAm + this.categoryList[i].ctgrFxtmXpsAm		// 이전달지출금액
			}
			this.xpsObtAm = numberFormat(this.xpsBf1mAm);
		},
		reset() {
			this.xpsObtAm = '';
			for(let i=0; i<this.categoryList.length; i++){
				this.categoryList[i].ctgrVarXpsAm = '';
			}
		},
    },
	computed :{
		setXpsObtAm(){
			let tgAm = this.categoryList.reduce((acc, cur) => {
				cur.ctgrXpsObtAm = Number(cur.ctgrFxtmXpsAm) + Number(cur.ctgrVarXpsAm)
				return acc + cur.ctgrXpsObtAm
			}, 0)
			return Number(this.removeComma(this.xpsObtAm) / 10000) - tgAm;
		},
		
		saveChk() {
			let chkAm = Number(this.removeComma(this.xpsObtAm) / 10000)
			let totalXpsObtAm = this.categoryList.reduce((acc, cur) => {
				cur.ctgrXpsObtAm = Number(cur.ctgrFxtmXpsAm) + Number(cur.ctgrVarXpsAm)
				return acc + cur.ctgrXpsObtAm
			}, 0)
			if(totalXpsObtAm > chkAm || chkAm == 0){
				return true;
			} else {
				return false;
			}
		},

		isTotalExceeded(){
			return this.setXpsObtAm < 0
		}
	}
}
</script>