<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 연결자산관리 > 만료 예정 기관 그룹핑
* @ 페이지설명 : 연결자산관리 > 만료 예정 기관 그룹핑
* @ 파일명     : src/views/page/MR/AM/MRAM4004/MRAM4004.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-04-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-04-11              CS540685              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>만료 기관 관리</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner progress_wrap">
				<strong class="titH1"><span>{{ totalForeExprCnt }}</span>개 기관의 자산 조회 기간을<br>연장해 주세요.</strong>
				<!-- 선택해제 -->
				<div class="custom_box flex_new_tit_area">
					<div class="">
					</div>
					<div class="btn_check btn_check3 checkAll">
						<input type="checkbox" name="chkAllFore" id="chkAllFore" checked="checked" @click="fn_chkForeAll($event)">
						<label for="chkAllFore">{{selectedForeList.length === totalForeExprCnt? '선택해제' : '전체선택'}}</label>
					</div>
				</div>
				<!--// 선택해제 -->
				<!-- <div class="com_top_type01">
					<div class="com_tabmenu_type03 custom_tab">
						<ul role="tablist">
							<li role="presentation" aria-controls="tab_01" :class="selTab===1 ? 'on' : ''" @click="fn_chngTab(1)"><a href="javascript:void(0);" role="tab"><span>만료 예정 기관</span></a></li>
							<li role="presentation" aria-controls="tab_02" :class="selTab===2 ? 'on' : ''" @click="fn_chngTab(2)"><a href="javascript:void(0);" role="tab"><span>만료/해제 기관</span></a></li>
						</ul>
					</div>
				</div> -->
				<!-- <div role="tabpanel" id="tab_01" class="cmm-tab-panel" :class="selTab===1 ? 'on' : ''"> -->
				<template v-if="totalForeExprCnt > 0">
					<div class="com_box_type01 bottomBtnType nonBtn" v-for="(forItem, forIdx) in itemForeExprList" :key="'foreExpr_'+forIdx">
						<div class="tit">
							<i :class="`${forItem.infOfrmnOrgC}`"><span class="blind">NH농협은행</span></i>
							<div class="btn_check">
								<input type="checkbox" name="checkall" :id="'forExpr_'+forIdx" :ref="'forExpr_'" @click="fn_checkForeExpr($event, forItem)">
								<label :for="'forExpr_'+forIdx">
									<span class="bank_name">{{forItem.orgnm}}</span>
									<span v-if="fn_dayDiff(forItem.tmsEdDt, currentDate) > 0" class="dat">연결 만료가 {{fn_dayDiff(forItem.tmsEdDt, currentDate)}}일 남았어요</span>
									<span v-else class="dat">연결이 오늘 만료돼요</span>
								</label>
							</div>
						</div>
					</div>
					<!-- <div class="com_box_type01 bottomBtnType nonBtn" v-for="(forItem, forIdx) in itemForeExprList" :key="'foreExpr_'+forIdx">
						<ul class="list_type_01">
							<li>
								<div class="ipt_wrap">
									<input type="checkbox" :id="'forExpr_'+forIdx" :ref="'forExpr_'" @click="fn_checkForeExpr($event, forItem)">
									<label :for="'forExpr_'+forIdx" class="bank_state_che">
										<i :class="'ico_bank '+forItem.infOfrmnOrgC"></i>
										<div class="ipt_txt_flex">
											<strong class="bank_name">{{forItem.orgnm}}</strong>
											<p class="ipt_p_txt">
												<template v-if="fn_dayDiff(forItem.tmsEdDt, currentDate) > 0">
													연결 만료가 <em class="com_point_darkblue">{{fn_dayDiff(forItem.tmsEdDt, currentDate)}}</em>일 남았어요
												</template>
												<template v-else>
													연결이 오늘 만료되요
												</template>
											</p>
										</div>
									</label>
								</div>
							</li>
						</ul>
					</div> -->
				</template>

				<template v-else>
					<div class="no_data_box">
						<div class="no_data_list">
							<p>조회된 정보가 없습니다.</p>
						</div>
					</div>
				</template>
				<!-- </div> -->

				<!-- <div role="tabpanel" id="tab_02" class="cmm-tab-panel" :class="selTab===2 ? 'on' : ''">
					<template v-if="bankExprList.length > 0 || cardExprList.length > 0 || investExprList.length > 0 || insuExprList.length > 0 ||
						efinExprList.length > 0 || capitalExprList.length > 0 || ginsuExprList.length > 0 || telecomExprList.length > 0 ||
						usuryExprList.length > 0 || bondExprList.length > 0 || p2pExprList.length > 0 || publicExprList.length > 0">
						<div class="ipt_wrap mb24">
							<input type="checkbox" id="chkAllExpr" ref="chkAllExpr" @click="fn_chkExprAll($event)">
							<label for="chkAllExpr" class="new_tit_area not_border">
								<div class="state">
									<span class="on">전체선택</span>
									<span class="off">선택해제</span>
								</div>
							</label>
						</div>
						<div class="com_box_type01 custom_list" v-for="(exprItem, exprIdx) in itemExprList" :key="'expr_'+exprIdx">
							<ul class="list_type_01">
								<li>
									<div class="ipt_wrap">
										<input type="checkbox" :id="'expr_'+exprIdx" ref="expr_" @click="fn_checkExpr($event, exprItem)">
										<label :for="'expr_'+exprIdx" class="bank_state_che">
											<i :class="'ico_bank '+exprItem.infOfrmnOrgC"></i>
											<div class="ipt_txt_flex">
												<strong class="bank_name">{{exprItem.orgnm}}</strong>
												<p class="ipt_p_txt">
													<template v-if="exprItem.acsTokenDusDtm !== '0'">
														만료/해제일 <em>{{exprItem.acsTokenDusDtm | dateFilter("YYYY.MM.DD")}}</em>
													</template>
													<template v-else>
														만료/해제일 <em>{{exprItem.tmsEdDt | dateFilter("YYYY.MM.DD")}}</em>
													</template>
												</p>
											</div>
										</label>
									</div>
								</li>
							</ul>
						</div>

						<ul class="bl_dot_list">
							<li>만료 또는 해제된 기관의 개인신용정보는 만료/해제일로부터 5년간 보존 됩니다.</li>
						</ul>
					</template>

					<template v-else>
						<div class="no_data_box">
							<div class="no_data_list">
								<p>조회된 정보가 없습니다.</p>
							</div>
						</div>
					</template>
				</div> -->
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click="fn_modItem()">{{selectedForeList.length}}개 기관 만료일 연장</a>
			</div>
			<!-- <div class="btn_full_box" v-if="selTab===1">
				<template v-if="totalForeExprCnt > 0">
					<a href="javascript:void(0);" role="button" class="btn btn_mint" @click="fn_modItem()">{{chkedForeCnt}}개 만료일 연장</a>
				</template>
				<template v-else>
					<a href="javascript:void(0);" role="button" class="btn btn_mint" @click="close()">확인</a>
				</template>
			</div>
			<template v-else>
				<div class="com_btnhalfbox_type02" v-if="totalForeExprCnt > 0">
					<a href="javascript:void(0);" class="btn btn_mint_gray" @click="fn_busDelete()">{{chkedForeExprCnt}}개 삭제</a>
					<a href="javascript:void(0);" class="btn btn_mint" @click="fn_busReAdd()">{{chkedForeExprCnt}}개 재연결</a>
				</div>
				<div class="btn_full_box" v-else>
					<a href="javascript:void(0);" role="button" class="btn btn_mint" @click="close()">확인</a>
				</div>
			</template> -->
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="closeThisPop()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {dayDiff, dateFormat} from '@/utils/date'
import _ from 'lodash'
import {mapActions} from 'vuex'

import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002'
// import MRAM2005 from '@/views/page/MR/AM/MRAM2005/MRAM2005.vue'
// import MRAM2003 from '@/views/page/MR/AM/MRAM2003/MRAM2003.vue'
import COAR2003 from '@/views/page/CO/AR/COAR2003/COAR2003.vue'
import COAR2005 from '@/views/page/CO/AR/COAR2005/COAR2005'

export default {
	name: 'MRAM2004',
	data: () => {
		return {
			// selTab : "",	// 선택한 탭
			currentDate		: dateFormat(new Date(), 'YYYYMMDD'), //금일

			/////////// 만료 예정 기관 탭 변수 ///////////
			itemForeExprList	: [],	// 업권별 만료 예정 리스트
			selectedForeList	: [],	// 체크된 업권별 만료예정 기관 정보

			bankForeExprList 	: [],	// 은행 만료 예정 리스트
			cardForeExprList 	: [],	// 카드 만료 예정 리스트
			investForeExprList 	: [],	// 증권 만료 예정 리스트
			insuForeExprList 	: [],	// 보험 만료 예정 리스트
			efinForeExprList 	: [],	// 페이 만료 예정 리스트
			capitalForeExprList : [],	// 할부금융 만료 예정 리스트
			ginsuForeExprList 	: [],	// 보증보험 만료 예정 리스트
			telecomForeExprList : [],	// 통신 만료 예정 리스트
			usuryForeExprList 	: [],	// 대부 만료 예정 리스트
			bondForeExprList 	: [],	// 채권 만료 예정 리스트
			p2pForeExprList 	: [],	// p2p 만료 예정 리스트
			publicForeExprList	: [],	// public 만료 예정 리스트
			// chkedForeCnt		: 0,	// 체크된 만료예정기관 체크박스

			moduleList			: [],	// 만료일 변경 시 체크리스트 중 orgListForFilter를 바탕으로 필터링된 리스트
			////////////////////////////////////////////

			/////////// 만료/해제 기관 탭 변수 ///////////
			// itemExprList	: [],	// 업권별 만료/해제 기관 리스트
			// selectedExprList: [],	// 체크된 업권별 만료/해제 기관 정보

			// bankExprList	: [],	// 은행 만료/해제 기관 리스트
			// cardExprList	: [],	// 카드 만료/해제 기관 리스트
			// investExprList	: [],	// 증권 만료/해제 기관 리스트
			// insuExprList	: [],	// 보험 만료/해제 기관 리스트
			// efinExprList	: [],	// 페이 만료/해제 기관 리스트
			// capitalExprList	: [],	// 할부금융 만료/해제 기관 리스트
			// ginsuExprList	: [],	// 보증보험 만료/해제 기관 리스트
			// telecomExprList	: [],	// 통신 만료/해제 기관 리스트
			// usuryExprList	: [],	// 대부 만료/해제 기관 리스트
			// bondExprList	: [],	// 채권 만료/해제 기관 리스트
			// p2pExprList		: [],	// p2p 만료/해제 기관 리스트
			// publicExprList	: [],	// public 만료/해제 기관 리스트
			// chkedForeExprCnt	: 0,	// 체크된 만료/해제 기관 체크박스

			// filteredExprList : [],	// 선택리스트 바탕으로 만든 정보제공자 리스트

			// disconParam		: [],	// 만료/해제 기관 삭제관련 데이터 리스트
			// disconCnt		: [],	// 삭제할 만료/해제 기관 수
			isWorked		: false,// api호출 후 데이터 변동 유무
			////////////////////////////////////////////

			// 세션 체크 타이머
            sessionTimerAuthor          : null,
		}
	},
	computed: {
		totalForeExprCnt() {
			return this.bankForeExprList.length + this.cardForeExprList.length + this.investForeExprList.length + this.efinForeExprList.length
					+ this.insuForeExprList.length + this.capitalForeExprList.length + this.ginsuForeExprList.length + this.telecomForeExprList.length
					+ this.usuryForeExprList.length + this.bondForeExprList.length + this.p2pForeExprList.length + this.publicForeExprList.length
		},
		chkedForeExprCnt() {
			return this.selectedForeList.length
		}
	},
	mixins: [
		commonMixin,
		popupMixin
	],
	created() {
		
	},
	mounted() {
		this.initComponent(this.params)
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
	},
	methods: { 
		...mapActions('myassets', [
			'getMyBizRegInfo','getAllMyAssetInfo'
		]),
		fn_dayDiff(to, from){
			return dayDiff(to , from)
		},
		initComponent(param = {}) {
			this.initData()
			this.getData(param)
		},
		initData() {
			this.bankForeExprList	 = [] 
			this.cardForeExprList	 = [] 
			this.investForeExprList	 = [] 
			this.insuForeExprList	 = [] 
			this.efinForeExprList	 = [] 
			this.capitalForeExprList = [] 
			this.ginsuForeExprList	 = [] 
			this.telecomForeExprList = [] 
			this.usuryForeExprList	 = [] 
			this.bondForeExprList	 = [] 
			this.p2pForeExprList	 = [] 
			this.publicForeExprList	 = [] 
		},
		getData(param) {
			this.selTab = param.selTab || 1
			// 업권별 만료예정기관 및 만료/해제 기관 리스트 생성
			this.fn_makeForeExpr(param.bankList, this.bankForeExprList)
			this.fn_makeForeExpr(param.cardList, this.cardForeExprList)
			this.fn_makeForeExpr(param.investList, this.investForeExprList)
			this.fn_makeForeExpr(param.insuList, this.insuForeExprList)
			this.fn_makeForeExpr(param.capitalList, this.capitalForeExprList)
			this.fn_makeForeExpr(param.efinList, this.efinForeExprList)
			this.fn_makeForeExpr(param.ginsuList, this.ginsuForeExprList)
			this.fn_makeForeExpr(param.usuryList, this.usuryForeExprList)
			this.fn_makeForeExpr(param.telecomList, this.telecomForeExprList)
			this.fn_makeForeExpr(param.bondList, this.bondForeExprList)
			this.fn_makeForeExpr(param.p2pList, this.p2pForeExprList)
			this.fn_makeForeExpr(param.publicList, this.publicForeExprList)

			this.bankExprList	 = param.bankExprList	|| []
			this.cardExprList	 = param.cardExprList	|| []
			this.investExprList	 = param.investExprList	|| []
			this.insuExprList	 = param.insuExprList	|| []
			this.efinExprList	 = param.efinExprList	|| []
			this.capitalExprList = param.capitalExprList|| []	
			this.ginsuExprList	 = param.ginsuExprList	|| []
			this.telecomExprList = param.telecomExprList|| []	
			this.usuryExprList	 = param.usuryExprList	|| []
			this.bondExprList	 = param.bondExprList	|| []
			this.p2pExprList	 = param.p2pExprList	|| []	
			this.publicExprList	 = param.publicExprList	|| []	
			
			// this.fn_makeExpr()
		},

		// 탭 변경
		// fn_chngTab(tabIdx) {
		// 	this.selTab = tabIdx

		// 	// 탭 변경 시 이전 탭 정보 초기화
		// 	if(tabIdx === 1) {
		// 		// 만료/해제 기관 체크관련 정보 초기화
		// 		this.selectedExprList = []
		// 		if(this.$refs['expr_'] !== undefined && this.$refs['expr_'] !== null && this.$refs['expr_'] !== "") {
		// 			for(const refExpr of this.$refs['expr_']) {
		// 				refExpr.checked = false
		// 			}
		// 			this.$refs.chkAllExpr.checked = false
		// 		}

		// 		// this.chkedForeExprCnt = 0
		// 	} else {
		// 		// 만료 예정 기관 체크관련 정보 초기화
		// 		this.selectedForeList = []
		// 		if(this.$refs['forExpr_'] !== undefined && this.$refs['forExpr_'] !== null && this.$refs['forExpr_'] !== "") {
		// 			for(const refFore of this.$refs['forExpr_']) {
		// 				refFore.checked = false
		// 			}
		// 			this.$refs.chkAllFore.checked = false
		// 		}

		// 		this.chkedForeCnt = 0
		// 	}
		// },

		// 업권리스트를 통한 만료예정 및 만료/해제 기관 필터링
		fn_makeForeExpr(list, tmpForeList) {
			for(let i=0; i<list.length; i++) {
				if(list[i].acsTokenDusDtm === '0' && this.fn_dayDiff(list[i].tmsEdDt, this.currentDate) >= 0) {
					// 정상 상태인 기관중
					if(this.fn_dayDiff(list[i].tmsEdDt, this.currentDate) >= 0 && this.fn_dayDiff(list[i].tmsEdDt, this.currentDate) <= 30) {
						// 전송요구종료일자가 오늘로 부터 30일 이내인 상태를 만료예정으로 판단
						tmpForeList.push(list[i])
						this.itemForeExprList.push(list[i])
					}
				}
			}
		},

		// 만료/해제 기관 전체업권 리스트 생성
		// fn_makeExpr() {
		// 	if(this.bankExprList.length > 0) {
		// 		for(let i=0; i<this.bankExprList.length; i++) {
		// 			this.itemExprList.push(this.bankExprList[i])
		// 		}
		// 	}
		// 	if(this.cardExprList.length > 0) {
		// 		for(let i=0; i<this.cardExprList.length; i++) {
		// 			this.itemExprList.push(this.cardExprList[i])
		// 		}
		// 	}
		// 	if(this.investExprList.length > 0) {
		// 		for(let i=0; i<this.investExprList.length; i++) {
		// 			this.itemExprList.push(this.investExprList[i])
		// 		}
		// 	}
		// 	if(this.insuExprList.length > 0) {
		// 		for(let i=0; i<this.insuExprList.length; i++) {
		// 			this.itemExprList.push(this.insuExprList[i])
		// 		}
		// 	}
		// 	if(this.efinExprList.length > 0) {
		// 		for(let i=0; i<this.efinExprList.length; i++) {
		// 			this.itemExprList.push(this.efinExprList[i])
		// 		}
		// 	}
		// 	if(this.capitalExprList.length > 0) {
		// 		for(let i=0; i<this.capitalExprList.length; i++) {
		// 			this.itemExprList.push(this.capitalExprList[i])
		// 		}
		// 	}
		// 	if(this.ginsuExprList.length > 0) {
		// 		for(let i=0; i<this.ginsuExprList.length; i++) {
		// 			this.itemExprList.push(this.ginsuExprList[i])
		// 		}
		// 	}
		// 	if(this.telecomExprList.length > 0) {
		// 		for(let i=0; i<this.telecomExprList.length; i++) {
		// 			this.itemExprList.push(this.telecomExprList[i])
		// 		}
		// 	}
		// 	if(this.usuryExprList.length > 0) {
		// 		for(let i=0; i<this.usuryExprList.length; i++) {
		// 			this.itemExprList.push(this.usuryExprList[i])
		// 		}
		// 	}
		// 	if(this.bondExprList.length > 0) {
		// 		for(let i=0; i<this.bondExprList.length; i++) {
		// 			this.itemExprList.push(this.bondExprList[i])
		// 		}
		// 	}
		// 	if(this.p2pExprList.length > 0) {
		// 		for(let i=0; i<this.p2pExprList.length; i++) {
		// 			this.itemExprList.push(this.p2pExprList[i])
		// 		}
		// 	}
		// 	if(this.publicExprList.length > 0) {
		// 		for(let i=0; i<this.publicExprList.length; i++) {
		// 			this.itemExprList.push(this.publicExprList[i])
		// 		}
		// 	}

		// 	// 만료/해제 기관 리스트 만료일 기준 오름차순정렬
		// 	this.itemExprList = _.chain(this.itemExprList)
		// 						.orderBy('tmsEdDt', 'asc')
		// 						.value()
		// },

		// 만료예정기관 체크 이벤트
		fn_checkForeExpr(evt, item) {
			if(evt.target.checked) {
				this.selectedForeList.push(item)
			} else {
				let delIdx = _.findIndex(this.selectedForeList, d => d.infOfrmnOrgC === item.infOfrmnOrgC)
				this.selectedForeList.splice(delIdx, 1)
			}
		},

		// 만료예정기관 전체 체크 이벤트
		fn_chkForeAll() {
			let inpForeExprList = this.$refs["forExpr_"]
			if(this.selectedForeList.length !== this.totalForeExprCnt) {
				for(let i=0; i<inpForeExprList.length; i++) {
					inpForeExprList[i].checked = true
				}
				for(let i=0; i<this.itemForeExprList.length; i++) {
					if(_.findIndex(this.selectedForeList, d => d.infOfrmnOrgC === this.itemForeExprList[i].infOfrmnOrgC) > -1) continue

					this.selectedForeList.push(this.itemForeExprList[i])
				}
			} else {
				for(let i=0; i<inpForeExprList.length; i++) {
					inpForeExprList[i].checked = false
				}
				this.selectedForeList = []
			}
		},

		// 만료/해제기관 체크 이벤트
		// fn_checkExpr(evt, item) {
		// 	if(evt.target.checked) {
		// 		this.selectedExprList.push(item)

		// 		this.chkedForeExprCnt++

		// 		// 기관이 전체 선택되었을 경우 '전체선택' 체크 활성화
		// 		if(this.chkedForeExprCnt === this.itemExprList.length) this.$refs.chkAllExpr.checked = true
		// 	} else {
		// 		let delIdx = _.findIndex(this.selectedExprList, d => d.infOfrmnOrgC === item.infOfrmnOrgC)
		// 		this.selectedExprList.splice(delIdx, 1)

		// 		this.chkedForeExprCnt--

		// 		this.$refs.chkAllExpr.checked = false
		// 	}
		// },

		// // 만료/해제기관 전체 체크 이벤트
		// fn_chkExprAll(evt) {
		// 	let inpExprList = this.$refs["expr_"]

		// 	for(let i=0; i<inpExprList.length; i++) {
		// 		inpExprList[i].checked = evt.target.checked ? true : false
		// 	}

		// 	if(evt.target.checked) {
		// 		for(let i=0; i<this.itemExprList.length; i++) {
		// 			if(_.findIndex(this.selectedExprList, d => d.infOfrmnOrgC === this.itemExprList[i].infOfrmnOrgC) > -1) continue

		// 			this.selectedExprList.push(this.itemExprList[i])
		// 		}
		// 	} else {
		// 		this.selectedExprList = []
		// 	}

		// 	// this.chkedForeExprCnt = evt.target.checked ? this.itemExprList.length : 0
		// },

		// 만료일 변경 버튼 이벤트
		fn_modItem() {
			if(this.selectedForeList.length === 0) {
				modalService.alert("관리할 기관을 선택하세요.").then(() => {
					
				})
			} else {
				
				// 연결변경 로직(MRAM2001) + 기관변경 로직(COAR2005) - 선택 후 다음프로세스
				// 선택 기관 중 백업데이터가 없는 기관일 경우 자산연결프로세스 처음부터..
				this.moduleList = []
	
				for(let i=0; i<this.selectedForeList.length; i++) {
					// 1차인증 생략과정으로 인한 기관 요소 input
					this.moduleList.push( this.selectedForeList[i] )
				}
				this.moduleList = this.moduleList.map(item => {return {...item, "orgC": item.infOfrmnOrgC,"orgBzrgC" : item.orgBizDsc.toLowerCase() , "orgnm" : item.orgnm}})
				this.isBckYn = false

				// 통합인증 접근토큰 리셋
				const config_tkReset = {
					url : "/co/ar/00r02",
					data : {
						"mydtCusno" : this.getUserInfo('mydtCusno')
					}
				}
				apiService.call(config_tkReset).then(response => {
					console.log(response)
				})

				// 20240119, sungchul, 1차 생략하고 2차인증으로 넘어갈 수 있게끔 로직 변경
				console.log('만료기관 관리 - 2차인증')
                let config = {
                    "component": COAR4002,
                    "params": {
                        "isExternal": true,
                        "filteredTargetOrgList": this.moduleList
                    }
                };
                modalService.openPopup(config).then(response => {
                    this.getData();
                });
                /*
				let config = {
				component : COAR2005,
					params : {
						isMramMod		: '1',				// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
						moduleList		: this.moduleList,	// 선택한 기관 목록
						isBckYn         : this.isBckYn, 	// '연결기관 관리 변경'을 통해 넘어오고 백업자산목록 존재유무 flag 값 (true : 선택기관 전체 자산 백업목록 존재, false : 미존재)
						isOnlyPublic	: true,				// 공공기관만 (1차인증 필요 x)
					}
				}
				modalService.openPopup(config)


                modalService.openPopup(config).then(response => {
                    if(response === "completeMod") {
                        // 변경 완료시
                        this.$refs.content.scrollTop = 0
                        Object.assign(this.$data, this.$options.data())
                        if(!this.isMyAssetGathering){
                            this.getMyBizRegInfo().then(() => {
                                this.getAllMyAssetInfo().then(() => {
                                    this.initComponent()
                                })
                            })
                        }
                    }
				})
                */
			}
		},

		// 재연결 버튼 이벤트
		fn_busReAdd() {
			if(this.chkedForeExprCnt === 0) {
				modalService.alert("관리할 기관을 선택하세요.").then(() => {
					
				})
			} else if(this.chkedForeExprCnt.length + 1 > 25) {
				modalService.alert("안전하고 신속한 자산 연결을 위해<br> 최대 25개까지 선택 가능합니다.").then(() => {
					return
				})
			} else {
				// 만료/해제 재연결의 경우 인증 프로세스 처음부터 재시작
				// 정보제공자 목록 api를 통해 만료기관 선택 리스트 필터링
	
				// 접근토큰이 존재할 경우 접근토큰 리셋
				this.fn_busReset()
	
				let tmpList = []
				this.filteredExprList = []
				
				// 인증과정에서 사용될 moduleList 생성
				const config = {
					url : "/co/ar/02ra1", // /co/ar/01ra1
					data : {
						"mydtCusno" : this.getUserInfo("mydtCusno"),
						"ofrAttcMethC" : "01"
					}
				}
				apiService.call(config).then(response => {
					let bank_list = response.bank_org || [],
						card_list = response.card_org || [],
						invest_list = response.invest_org || [],
						efin_list = response.efin_org || [],
						insu_list = response.insu_org || [],
						capi_list = response.capi_org || [],
						ginsu_list = response.ginsu_org || [],
						tele_list = response.tele_org || [],
						bond_list = response.bond_org || [],
						usury_list = response.usury_org || [],
						p2p_list = response.p2p_org || [],
						public_list = response.public_org || []
					
					for(let i=0; i<this.selectedExprList.length; i++) {
						if(this.selectedExprList[i].orgBizDsc === "bank") {
							tmpList.push(_.find(bank_list, d => d.orgC === this.selectedExprList[i].infOfrmnOrgC))
						} else if(this.selectedExprList[i].orgBizDsc === "card") {
							tmpList.push(_.find(card_list, d => d.orgC === this.selectedExprList[i].infOfrmnOrgC))
						} else if(this.selectedExprList[i].orgBizDsc === "invest") {
							tmpList.push(_.find(invest_list, d => d.orgC === this.selectedExprList[i].infOfrmnOrgC))
						} else if(this.selectedExprList[i].orgBizDsc === "efin") {
							tmpList.push(_.find(efin_list, d => d.orgC === this.selectedExprList[i].infOfrmnOrgC))
						} else if(this.selectedExprList[i].orgBizDsc === "insu") {
							tmpList.push(_.find(insu_list, d => d.orgC === this.selectedExprList[i].infOfrmnOrgC))
						} else if(this.selectedExprList[i].orgBizDsc === "capital") {
							tmpList.push(_.find(capi_list, d => d.orgC === this.selectedExprList[i].infOfrmnOrgC))
						} else if(this.selectedExprList[i].orgBizDsc === "ginsu") {
							tmpList.push(_.find(ginsu_list, d => d.orgC === this.selectedExprList[i].infOfrmnOrgC))
						} else if(this.selectedExprList[i].orgBizDsc === "telecom") {
							tmpList.push(_.find(tele_list, d => d.orgC === this.selectedExprList[i].infOfrmnOrgC))
						} else if(this.selectedExprList[i].orgBizDsc === "bond") {
							tmpList.push(_.find(bond_list, d => d.orgC === this.selectedExprList[i].infOfrmnOrgC))
						} else if(this.selectedExprList[i].orgBizDsc === "usury") {
							tmpList.push(_.find(usury_list, d => d.orgC === this.selectedExprList[i].infOfrmnOrgC))
						} else if(this.selectedExprList[i].orgBizDsc === "p2p") {
							tmpList.push(_.find(p2p_list, d => d.orgC === this.selectedExprList[i].infOfrmnOrgC))
						} else if(this.selectedExprList[i].orgBizDsc === "public") {
							tmpList.push(_.find(public_list, d => d.orgC === this.selectedExprList[i].infOfrmnOrgC))
						}
					}
					
					this.filteredExprList = tmpList
	
					// 인증 프로세스 start
					const config = {
						component : COAR2003,
						params : {
							// isMramMod 	: "",
							// isMramNew 	: false,
							// connectFlag : "aset",
							moduleList 	: this.filteredExprList
						}
					}
					modalService.openPopup(config)
				})
			}

		},

		// 삭제 버튼 이벤트
		// fn_busDelete() {
		// 	if(this.chkedForeExprCnt === 0) {
		// 		modalService.alert("관리할 기관을 선택하세요.").then(() => {

		// 		})
		// 	} else {
		// 		const config_slide = {
		// 			params : {},
		// 			renderer : {
		// 				component : MRAM2003
		// 			}
		// 		}
		// 		modalService.openSlidePagePopup(config_slide).then(response => {
		// 			if(response === 'Y') {
		// 				// 체크한 기관, 업권 리스트 생성
		// 				let checkedList = []
		// 				let tmpIdx = ""
						
		// 				for(let i=0; i<this.itemExprList.length; i++) {
		// 					tmpIdx = _.findIndex(this.selectedExprList, d => d.infOfrmnOrgC === this.itemExprList[i].infOfrmnOrgC)
	
		// 					if(tmpIdx > -1) checkedList.push(this.itemExprList[i])
		// 				}
		// 				this.disconParam = []
		// 				this.disconParam = _.chain(checkedList)
		// 							.map(d => {
		// 								return {
		// 									orgC 		: d.infOfrmnOrgC,
		// 									orgnm 		: d.orgnm,
		// 									industry 	: d.orgBizDsc,
		// 									isSuccess 	: false,
		// 								}
		// 							})
		// 							.value()
	
		// 				console.log("개인신용정보 삭제! >>> ", this.disconParam)
		// 				this.disconCnt = 0
		// 				// 데이터 삭제 api 호출

		// 				this.startSessionTimerAuth()
		// 				this.fn_dataDelete()
	
		// 				// modalService.alert("개인신용정보가 삭제 되었습니다.").then(response => {
		// 				// 	console.log(response)
		// 				// })
		// 			}
		// 		})
		// 	}

		// },

		// 데이터 삭제 api
		// fn_dataDelete() {
		// 	const config = {
		// 		url : "/co/co/02sa3",
		// 		data : {
		// 			orgC 			: this.disconParam[this.disconCnt].orgC,
		// 			mydtCusno 		: this.getUserInfo("mydtCusno"),
		// 			tmsBrkDelDsc 	: "2",										// 전송내역삭제구분코드 >> "1" : 탈회, "2" : 철회
		// 			clientId 		: this.getUserInfo("svcClientId"),
		// 		}
		// 	}
		// 	apiService.call(config).then(response => {
		// 		if(response.rsp_code === "00000") {
		// 			// this.disconParam[this.disconCnt].isSuccess = true
					
		// 			// // 만료/해제 기관 리스트에서 해당 기관 삭제
		// 			// this.itemExprList.splice(_.findIndex(this.itemExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
					
		// 			// if(this.disconParam[this.disconCnt].industry === "bank") {
		// 			// 	this.bankExprList.splice(_.findIndex(this.bankExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
		// 			// } else if(this.disconParam[this.disconCnt].industry === "card") {
		// 			// 	this.cardExprList.splice(_.findIndex(this.cardExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
		// 			// } else if(this.disconParam[this.disconCnt].industry === "invest") {
		// 			// 	this.investExprList.splice(_.findIndex(this.investExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
		// 			// } else if(this.disconParam[this.disconCnt].industry === "efin") {
		// 			// 	this.efinExprList.splice(_.findIndex(this.efinExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
		// 			// } else if(this.disconParam[this.disconCnt].industry === "insu") {
		// 			// 	this.insuExprList.splice(_.findIndex(this.insuExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
		// 			// } else if(this.disconParam[this.disconCnt].industry === "ginsu") {
		// 			// 	this.ginsuExprList.splice(_.findIndex(this.ginsuExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
		// 			// } else if(this.disconParam[this.disconCnt].industry === "telecom") {
		// 			// 	this.telecomExprList.splice(_.findIndex(this.telecomExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
		// 			// } else if(this.disconParam[this.disconCnt].industry === "capital") {
		// 			// 	this.capitalExprList.splice(_.findIndex(this.capitalExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
		// 			// } else if(this.disconParam[this.disconCnt].industry === "bond") {
		// 			// 	this.bondExprList.splice(_.findIndex(this.bondExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
		// 			// } else if(this.disconParam[this.disconCnt].industry === "usury") {
		// 			// 	this.usuryExprList.splice(_.findIndex(this.usuryExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
		// 			// } else if(this.disconParam[this.disconCnt].industry === "p2p") {
		// 			// 	this.p2pExprList.splice(_.findIndex(this.p2pExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
		// 			// }

		// 			this.disconCnt++

		// 			if(this.disconParam.length == this.disconCnt) {
		// 				console.log("끝!")
		// 				clearInterval(this.sessionTimerAuthor)

		// 				// 목록 및 체크카운트 재구성
		// 				for(let i=0; i<this.$refs["expr_"].length; i++) {
		// 					this.$refs["expr_"][i].checked = false
		// 				}
		// 				this.chkedForeExprCnt = 0

		// 				modalService.alert("개인신용정보가 삭제 되었습니다.").then(() => {
		// 					/**
		// 					 * 체크한 만료/해제 기관 삭제 완료 후 리로드
		// 					 */
		// 					this.isWorked = true

		// 					// 완료 후 기관 관리 메인으로 이동
		// 					this.close("completeWork")
		// 				})
		// 			} else {
		// 				this.fn_dataDelete()
		// 			}
		// 		} else {
		// 			modalService.alert("기관 삭제에 실패하였습니다.").then(text => {
		// 				if(text == "확인") this.close("completeWork")
		// 			})
		// 		}
		// 	})
		// },

		// 접근토큰 리셋
		fn_busReset(){
			const config = {
				url:  "/co/ar/00r02",
				data : {
                    "mydtCusno" : this.getUserInfo('mydtCusno')
				}
			}
			apiService.call(config).then(response => {
                console.log(response)

            })
		},
		
		// api호출 후 데이터 변동에 따른 모창 refresh 결정
		closeThisPop() {
			if(this.isWorked) {
				this.close("completeWork")
			} else {
				this.close()
			}
		},

		startSessionTimerAuth() {
			this.sessionTimerAuthor = setInterval(() => {
				// 스뱅/콕뱅 로그인 연장 처리
				this.$store.dispatch('config/extendSession')
			}, 30*1000)
		}
	},
	components: {      
		
	},
	destroyed(){
        clearInterval(this.sessionTimerAuthor)
	}    
}
    
</script>