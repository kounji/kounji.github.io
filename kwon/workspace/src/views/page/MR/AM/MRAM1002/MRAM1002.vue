<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 연결자산관리 > 자산연결변경
* @ 페이지설명 : 연결자산관리 > 자산연결변경
* @ 파일명     : src/views/page/MR/AM/MRAM1002/MRAM1002.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-01              CS528069              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>연결 변경</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_top_type02">
				<div class="complete">
					<div class="secede_box2">
						<p class="txt">연결 정보 변경이<br/>
							완료 되었습니다</p>
					</div>
				</div>
			</div>
			<div class="com_inner">
				<div class="custom_list com_box_type01">
					<div class="list_type_custom">
						<div class="list_item" v-for="(succItem, succIdx) in org_succ_list" :key="'success_'+succIdx">
							<i :class="succItem.org_code"></i>
							<strong class="tit">{{succItem.org_name}}</strong>
							<span class="ico_result suc">완료</span>
							<!-- <span class="ico_result fail">실패</span> -->
						</div>
						<div class="list_item" v-for="(failItem, failIdx) in org_fail_list" :key="'fail_'+failIdx">
							<i :class="failItem.org_code"></i>
							<strong class="tit">{{failItem.org_name}}</strong>
							<!-- <span class="ico_result suc">완료</span> -->
							<span class="ico_result fail">실패</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click="fn_completeCon()">확인</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="fn_completeCon()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import _ from 'lodash'

export default {
	name: 'MRAM1002',
	data: () => {
		return {
			orgTotScopeList : [],
			selectList 		: [],
			p_succ_org_list : [],
			selectOrgList 	: [],

			org_succ_list 	: [],
			org_fail_list 	: [],

			indvFlag		: false,	// 개별인증 여부 플래그
		}
	},
	computed: {
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
		initComponent(param={}) {

			this.orgTotScopeList 	= param.orgTotScopeList || []
			this.selectList			= param.selectList || []
			this.p_succ_org_list	= param.succ_org_list || []
			this.indvFlag			= param.indvFlag ? true : false

			if(!this.indvFlag) {
				// 통합인증 변경 완료로 넘어올 경우
				this.getData()
			} else {
				this.org_succ_list = []
				// 개별인증 변경 완료로 넘어올 경우
				for(const indvSuccItem of param.indv_succ_org_list) {
					this.org_succ_list.push({
						org_code : indvSuccItem.orgC,
						org_name : indvSuccItem.orgnm
					})
				}
			}
		},
		getData() {
			// 성공 리스트 필터링
			this.selectOrgList = _.chain(this.selectList)
								.uniqBy('org_code')
								.map(d => {
									return {
										org_code : d.org_code,
										org_name : d.org_name
									}
								})
								.orderBy('org_code', 'desc')
								.value()

			for(let i=0; i<this.selectOrgList.length; i++) {
				let isSucc = _.findIndex(this.p_succ_org_list, d => d.org_code === this.selectOrgList[i].org_code) > -1 ? true : false

				// 성공/실패 여부에따른 개별 리스트 push
				if(isSucc) {
					this.org_succ_list.push(this.selectOrgList[i])
				} else {
					this.org_fail_list.push(this.selectOrgList[i])
				}
			}
		},
		
		fn_completeCon() {
			this.closeAll("completeMod")
		}
	},
	components: {      
		
	},
}
    
</script>