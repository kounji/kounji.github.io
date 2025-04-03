<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 공공 > 행정 정보 선택
* @ 페이지설명 : 공공 > 행정 정보 선택
* @ 파일명     : src/views/page/CO/AR/COAR2029/COAR2029.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-09-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-01              CS528069              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>공공 정보 연결</h1>
			<a href="javascript:void(0);" class="btn_back" @click="close()"><span class="blind">이전화면</span></a>
		</div>		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_top_type02">
				<strong class="com_pop_tit01">
					관리할 공공기관의<br/>행정정보를 선택해 주세요
				</strong>
			</div>
			<div class="com_inner">
				<div class="ipt_wrap">
					<input type="checkbox" id="checkAll" ref="checkAll" @click="fn_checkAll($event)">
					<label for="checkAll" class="new_tit_area not_border" title="전체 선택">
						<div class="state">
							<span class="on">전체선택</span>
							<!-- <span class="off">선택해제</span> -->
						</div>
					</label>
				</div>
				<div class="com_box_type01 custom_list">
					<div class="new_tit_area">
						<i class="ico_bank"></i>
						<div class="tit">
							<span>행정안전부</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(moisItem, moisIdx) in mois_list" :key="'moisOrg_'+moisIdx">
							<div class="ipt_wrap">
								<input type="checkbox" :id="'moisOrg_'+moisIdx" ref="mois" @click="fn_orgControl('mois', moisItem, $event)">
								<label :for="'moisOrg_'+moisIdx" class="bank_state_che">
									<div class="ipt_txt_flex">
										<span class="bank_name">{{moisItem.orgnm}}</span>
										<span class="icon_mint" v-if="moisItem.isCon === 1">연결중</span>
									</div>
								</label>
							</div>
						</li>
						<!-- <li>
							<div class="ipt_wrap">
								<input type="checkbox" id="checc1-03">
								<label for="checc1-03" class="bank_state_che">
									<div class="ipt_txt_flex">
										<span class="bank_name">지방세세목별과세(납세)증명서<br/>(재산세)</span>
									</div>
								</label>
							</div>
						</li> -->
					</ul>
				</div>

				<div class="com_box_type01 custom_list">
					<div class="new_tit_area">
						<i class="ico_bank"></i>
						<div class="tit">
							<span>국세청</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(ntsItem, ntsIdx) in nts_list" :key="'ntsOrg_'+ntsIdx">
							<div class="ipt_wrap">
								<input type="checkbox" :id="'ntsOrg_'+ntsIdx" ref="nts" @click="fn_orgControl('nts', ntsItem, $event)">
								<label :for="'ntsOrg_'+ntsIdx" class="bank_state_che">
									<div class="ipt_txt_flex">
										<span class="bank_name">{{ntsItem.orgnm}}</span>
										<span class="icon_mint" v-if="ntsItem.isCon === 1">연결중</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>

				<div class="com_box_type01 custom_list">
					<div class="new_tit_area">
						<i class="ico_bank"></i>
						<div class="tit">
							<span>관세청</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(customsItem, customsIdx) in customs_list" :key="'customsOrg_'+customsIdx">
							<div class="ipt_wrap">
								<input type="checkbox" :id="'customsOrg_'+customsIdx" ref="customs" @click="fn_orgControl('customs', customsItem, $event)">
								<label :for="'customsOrg_'+customsIdx" class="bank_state_che">
									<div class="ipt_txt_flex">
										<span class="bank_name">{{customsItem.orgnm}}</span>
										<span class="icon_mint" v-if="customsItem.isCon === 1">연결중</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>

				<div class="com_box_type01 custom_list">
					<div class="new_tit_area">
						<i class="ico_bank"></i>
						<div class="tit">
							<span>국민건강보험공단</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(nhisItem, nhisIdx) in nhis_list" :key="'nhisOrg_'+nhisIdx">
							<div class="ipt_wrap">
								<input type="checkbox" :id="'nhisOrg_'+nhisIdx" ref="nhis" @click="fn_orgControl('nhis', nhisItem, $event)">
								<label :for="'nhisOrg_'+nhisIdx" class="bank_state_che">
									<div class="ipt_txt_flex">
										<span class="bank_name">{{nhisItem.orgnm}}</span>
										<span class="icon_mint" v-if="nhisItem.isCon">연결중</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>
				
				<div class="com_box_type01 custom_list">
					<div class="new_tit_area">
						<i class="ico_bank"></i>
						<div class="tit">
							<span>국민연금공단</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(npsItem, npsIdx) in nps_list" :key="'npsOrg_'+npsIdx">
							<div class="ipt_wrap">
								<input type="checkbox" :id="'npsOrg_'+npsIdx" ref="nps" @click="fn_orgControl('nps', npsItem, $event)">
								<label :for="'npsOrg_'+npsIdx" class="bank_state_che">
									<div class="ipt_txt_flex">
										<span class="bank_name">{{npsItem.orgnm}}</span>
										<span class="icon_mint" v-if="npsItem.isCon === 1">연결중</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>

				<div class="com_box_type01 custom_list">
					<div class="new_tit_area">
						<i class="ico_bank"></i>
						<div class="tit">
							<span>공무원연금공단</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(gepsItem, gepsIdx) in geps_list" :key="'gepsOrg_'+gepsIdx">
							<div class="ipt_wrap">
								<input type="checkbox" :id="'gepsOrg_'+gepsIdx" ref="geps" @click="fn_orgControl('geps', gepsItem, $event)">
								<label :for="'gepsOrg_'+gepsIdx" class="bank_state_che">
									<div class="ipt_txt_flex">
										<span class="bank_name">{{gepsItem.orgnm}}</span>
										<span class="icon_mint" v-if="gepsItem.isCon === 1">연결중</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" @click="fn_openNextProcess()">{{selCnt}}개 연결하기</a>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click="closeAll()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import _ from 'lodash'

import COAR2003 from '@/views/page/CO/AR/COAR2003/COAR2003.vue'

export default {
    name : "COAR2029",
    data: () => {
        return {
			mois_cnt		: 0,	// 행정안전부 아이템 개수
			mois_list 		: [],	// 행정안전부 리스트
			selectedMois	: [],	// 선택 행정안전부 리스트
			nts_cnt			: 0,	// 국세청 아이템 개수
			nts_list		: [],	// 국세청 리스트
			selectedNts		: [],	// 선택 국세청 리스트
			customs_cnt		: 0,	// 관세청 아이템 개수
			customs_list	: [],	// 관세청 리스트
			selectedCustoms : [],	// 선택 국세청 리스트
			nhis_cnt		: 0,	// 국민건강보험공단 아이템 개수
			nhis_list		: [],	// 국민건강보험공단 리스트
			selectedNhis	: [],	// 선택 국민건강보험공단 리스트
			nps_cnt			: 0,	// 국민연금공단 아이템 개수
			nps_list		: [],	// 국민연금공단 리스트
			selectedNps		: [],	// 선택 국민연금공단 리스트
			geps_cnt		: 0,	// 공무원연금공단 아이템 개수
			geps_list		: [],	// 공무원연금공단 리스트
			selectedGeps	: [],	// 선택 공무원연금공단 리스트

			moduleList		: [],	// 다음프로세스 진행을 위한 moduleList
			selCnt			: 0,	// 선택 요소개수

			connectFlag	: "gov",	// 연결 분류 flag (자산 : aset, 공공 정보 : gov)
			
			// 개발 테스트 데이터
			testDev : {}
        }
	},
    mounted() {
		this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     
    },
    mixins: [
		commonMixin,
        popupMixin
	],
	computed:{
	},
    methods: {
        initComponent() {
            this.getData()
        },
        getData() {
			// local test data
			console.log(import.meta.env.VITE_ENV)
			this.fn_test_gov()
			/////////// 추후 테스트 관련 제거

			this.mois_list 		= this.testDev.mois_org || []
			this.mois_cnt		= this.testDev.mois_cnt || 0

			this.nts_list 		= this.testDev.nts_org || []
			this.nts_cnt		= this.testDev.nts_cnt || 0

			this.customs_list 	= this.testDev.customs_org || []
			this.customs_cnt	= this.testDev.customs_cnt || 0

			this.nhis_list 		= this.testDev.nhis_org || []
			this.nhis_cnt		= this.testDev.nhis_cnt || 0

			this.nps_list 		= this.testDev.nps_org || []
			this.nps_cnt		= this.testDev.nps_cnt || 0

			this.geps_list 		= this.testDev.geps_org || []
			this.geps_cnt		= this.testDev.geps_cnt || 0

			// 리스트 정렬 (연결중 상태인 요소 최상단)
			this.mois_list = this.sortArray(this.mois_list)
			this.nts_list = this.sortArray(this.nts_list)
			this.customs_list = this.sortArray(this.customs_list)
			this.nhis_list = this.sortArray(this.nhis_list)
			this.nps_list = this.sortArray(this.nps_list)
			this.geps_list = this.sortArray(this.geps_list)
		},


		fn_checkAll(evt) {
			let compMois 	= this.$refs['mois'],	// 행정안전부 체크 요소 목록
				compNts 	= this.$refs['nts'],	// 국세청 체크 요소 목록
				compCustoms = this.$refs['customs'],// 관세청 체크 요소 목록
				compNhis 	= this.$refs['nhis'],	// 국민건강보험공단 체크 요소 목록
				compNps 	= this.$refs['nps'],	// 국민연금공단 체크 요소 목록
				compGeps 	= this.$refs['geps']	// 공무원연금공단 체크 요소 목록

			this.selectedMois = []
			this.selectedNps = []
			this.selectedNts = []
			this.selectedNhis = []
			this.selectedCustoms = []
			this.selectedGeps = []

			for(const moisItem of compMois) {
				moisItem.checked = evt.target.checked ? true : false
			}
			for(const ntsItem of compNts) {
				ntsItem.checked = evt.target.checked ? true : false
			}
			for(const customsItem of compCustoms) {
				customsItem.checked = evt.target.checked ? true : false
			}
			for(const nhisItem of compNhis) {
				nhisItem.checked = evt.target.checked ? true : false
			}
			for(const npsItem of compNps) {
				npsItem.checked = evt.target.checked ? true : false
			}
			for(const gepsItem of compGeps) {
				gepsItem.checked = evt.target.checked ? true : false
			}

			// api를 통해 가져온 리스트 별다른 필터링 없이 사용한다는 가정
			if(evt.target.checked) {
				for(let i=0; i<this.mois_list.length; i++) {
					this.selectedMois.push(this.mois_list[i])
				}
				for(let i=0; i<this.nts_list.length; i++) {
					this.selectedNts.push(this.nts_list[i])
				}
				for(let i=0; i<this.customs_list.length; i++) {
					this.selectedCustoms.push(this.customs_list[i])
				}
				for(let i=0; i<this.nhis_list.length; i++) {
					this.selectedNhis.push(this.nhis_list[i])
				}
				for(let i=0; i<this.nps_list.length; i++) {
					this.selectedNps.push(this.nps_list[i])
				}
				for(let i=0; i<this.geps_list.length; i++) {
					this.selectedGeps.push(this.geps_list[i])
				}

				this.selCnt = this.selectedMois.length + this.selectedNts.length + this.selectedCustoms.length 
							+ this.selectedNhis.length + this.selectedNps.length + this.selectedGeps.length
			} else {
				this.selectedMois = []
				this.selectedNts = []
				this.selectedCustoms = []
				this.selectedNhis = []
				this.selectedNps = []
				this.selectedGeps = []

				this.selCnt = 0
			}
		},

		fn_orgControl(targetDsc, item, evt) {
			// 체크 타겟을 탐지하여 해당 업권의 체크 리스트에 삽입
			switch(targetDsc) {
				case "mois" :
					if(evt.target.checked) this.selectedMois.push(item)
					else {
						let objIdx = this.selectedMois.indexOf(item)
						if(objIdx > -1) this.selectedMois.splice(objIdx, 1)
					}
					break;
				case "nts" :
					if(evt.target.checked) this.selectedNts.push(item)
					else {
						let objIdx = this.selectedNts.indexOf(item)
						if(objIdx > -1) this.selectedNts.splice(objIdx, 1)
					}
					break;
				case "customs" :
					if(evt.target.checked) this.selectedCustoms.push(item)
					else {
						let objIdx = this.selectedCustoms.indexOf(item)
						if(objIdx > -1) this.selectedCustoms.splice(objIdx, 1)
					}
					break;
				case "nhis" :
					if(evt.target.checked) this.selectedNhis.push(item)
					else {
						let objIdx = this.selectedNhis.indexOf(item)
						if(objIdx > -1) this.selectedNhis.splice(objIdx, 1)
					}
					break;
				case "nps" :
					if(evt.target.checked) this.selectedNps.push(item)
					else {
						let objIdx = this.selectedNps.indexOf(item)
						if(objIdx > -1) this.selectedNps.splice(objIdx, 1)
					}
					break;
				case "geps" :
					if(evt.target.checked) this.selectedGeps.push(item)
					else {
						let objIdx = this.selectedGeps.indexOf(item)
						if(objIdx > -1) this.selectedGeps.splice(objIdx, 1)
					}
					break;
				default : break;
			}

			if(evt.target.checked) this.selCnt++
			else this.selCnt--

			// 전체선택 활성화 여부 체크
			if(this.selectedMois.length === this.mois_list.length && this.selectedNts.length === this.nts_list.length
				&& this.selectedCustoms.length === this.customs_list.length && this.selectedNhis.length === this.nhis_list.length
				&& this.selectedNps.length === this.nps_list.length && this.selectedGeps.length === this.geps_list.length) {
				
				this.$refs.checkAll.checked = true
			} else {
				this.$refs.checkAll.checked = false
			}
		},

		sortArray(objArray) {
			const list = objArray || []
			const result = _.chain(list).orderBy('isCon', 'desc').value()

			return result
		},

		// 연결하기
		fn_openNextProcess() {
			if(this.selCnt === 0) return false

			this.fn_makeModuleList()

			const config = {
				component : COAR2003,
				params : {
					connectFlag : "gov",
					moduleList : this.moduleList
				}
			}
			modalService.openPopup(config).then(() => {

			})
		},

		// 프로세스 진행을 위한 moduleList 생성
		fn_makeModuleList() {
			this.moduleList = []

			// 임시) !! orgC가 존재하지않아 임시로 orgnm으로 판별 !!
			for(let i=0; i<this.mois_list.length; i++) {
				for(const moisItem of this.selectedMois) {
					if(this.mois_list[i].orgnm === moisItem.orgnm) {
						this.moduleList.push(this.mois_list[i])
					}
				}
			}
			for(let i=0; i<this.nts_list.length; i++) {
				for(const ntsItem of this.selectedNts) {
					if(this.nts_list[i].orgnm === ntsItem.orgnm) {
						this.moduleList.push(this.nts_list[i])
					}
				}
			}
			for(let i=0; i<this.customs_list.length; i++) {
				for(const customsItem of this.selectedCustoms) {
					if(this.customs_list[i].orgnm === customsItem.orgnm) {
						this.moduleList.push(this.customs_list[i])
					}
				}
			}
			for(let i=0; i<this.nhis_list.length; i++) {
				for(const nhisItem of this.selectedNhis) {
					if(this.nhis_list[i].orgnm === nhisItem.orgnm) {
						this.moduleList.push(this.nhis_list[i])
					}
				}
			}
			for(let i=0; i<this.nps_list.length; i++) {
				for(const npsItem of this.selectedNps) {
					if(this.nps_list[i].orgnm === npsItem.orgnm) {
						this.moduleList.push(this.nps_list[i])
					}
				}
			}
			for(let i=0; i<this.geps_list.length; i++) {
				for(const gepsItem of this.selectedGeps) {
					if(this.geps_list[i].orgnm === gepsItem.orgnm) {
						this.moduleList.push(this.geps_list[i])
					}
				}
			}
		},

		fn_test_gov() {
			// 테스트 데이터 설정
			// 행안부 - 등록면허세면허분 연결중이라는 가정
			this.testDev = {
				"all_cnt" : 10,
				"mois_cnt" : 4,	// 행정안전부
				"mois_org" : [
					{"orgC": "", "orgBzrgC":"mois", "orgnm":"지방세납세증명서", "isCon":0},
					{"orgC": "", "orgBzrgC":"mois", "orgnm":"지방세납세확인서(등록면허세면허분)", "isCon":1},
					{"orgC": "", "orgBzrgC":"mois", "orgnm":"지방세세목별과세(납세)증명서(자동차세)", "isCon":0},
					{"orgC": "", "orgBzrgC":"mois", "orgnm":"지방세세목별과세(납세)증명서(재산세)", "isCon":0},
				],
				"nts_cnt" : 1,	// 국세청
				"nts_org" : [
					{"orgC":"", "orgBzrgC":"nts", "orgnm":"(국세)납세증명서", "isCon":0},
				],
				"customs_cnt" : 1,	// 관세청
				"customs_org" : [
					{"orgC":"", "orgBzrgC":"customs", "orgnm":"관세납세증명서", "isCon":0},
				],
				"nhis_cnt" : 2,	// 국민건강보험공단
				"nhis_org" : [
					{"orgC":"", "orgBzrgC":"nhis", "orgnm":"건강ㆍ장기요양보험료납부확인서(직장가입자)", "isCon":0},
					{"orgC":"", "orgBzrgC":"nhis", "orgnm":"건강ㆍ장기요양보험료납부확인서(지역가입자)", "isCon":0},
				],
				"nps_cnt" : 1,	// 국민연금공단
				"nps_org" : [
					{"orgC":"", "orgBzrgC":"nps", "orgnm":"연금산정용 가입내역확인서", "isCon":0},
				],
				"geps_cnt" : 1,	// 공무원연금공단
				"geps_org" : [
					{"orgC":"", "orgBzrgC":"geps", "orgnm":"공무원연금내역서", "isCon":0}
				]
			}
		},
		
    },
    components : {
    }
}


</script>