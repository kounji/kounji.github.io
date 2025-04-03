<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번에 > 한번에 연결 완료
* @ 페이지설명 : 한번에 > 한번에 연결 완료
* @ 파일명     : src/views/page/CO/AR/COAR2010/COAR2010.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-30
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-30              CS528069              최초작성
* 2023-08-04              CS533459              상호금융 마이데이터 확대 개발 적용
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>{{isMramMod === '' ? "자산연결" : "연결변경"}}</h1>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner progress_wrap">
				<div class="complete">
					<div class="secede_box2">
						<p class="txt titH1">자산(공공)정보 연결이<br>완료 되었습니다</p>
					</div>
				</div>
			</div>
			<div class="com_inner">
				<div class="custom_box" v-if="org_succ_list.length > 0">
					<div class="new_tit_area flex_new_tit_area mt15">
						<strong class="tit"><span>연결 완료 기관 <em class="pointColor green">{{org_succ_list.length}}개</em></span></strong>
					</div>
				</div>

				<div class="custom_list com_box_type01 noBorder mt10" v-if="org_succ_list.length > 0">
					<div class="list_type_custom">
						<div class="list_item" v-for="(succItem, succIdx) in org_succ_list" :key="'success_'+succIdx">
							<i :class="succItem.org_code"></i>
							<strong class="tit">{{succItem.org_name}}</strong>
							<span class="ico_result suc">성공</span>
						</div>
					</div>
				</div>

				<div class="custom_box" v-if="org_fail_list.length > 0">
					<div class="new_tit_area flex_new_tit_area mt20">
						<strong class="tit"><span>연결 실패 기관 <em class="pointColor red2">{{org_fail_list.length}}개</em></span></strong>
					</div>
				</div>

				<div class="custom_list com_box_type01 noBorder mt10" v-if="org_fail_list.length > 0">
					<div class="list_type_custom">
						<div class="list_item" v-for="(failItem, failIdx) in org_fail_list" :key="'fail_'+failIdx">
							<i :class="failItem.org_code"></i>
							<strong class="tit">{{failItem.org_name}}</strong>
							<span class="ico_result fail">실패</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click="fn_assetComplete()">확인</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="fn_assetComplete()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import routerService from '@/service/routerService'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import {mapActions} from 'vuex'
import _ from 'lodash'

import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001.vue'

export default {
    name : "COAR2010",
    data: () => {
        return {
			// isDev	: false,

			orgTotScopeList : [],
			selectList		: [],
			p_succ_org_list	: [],
			selectOrgList	: [],
			isMramMod		: '',
			org_succ_list 	: [],
			org_fail_list 	: [],
        }
	},
    mounted() {
		this.initComponent(this.params)
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
		...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfoByFirst'
        ]),
        initComponent(param={}) {
			// this.isDev = import.meta.env.VITE_ENV || "D"

			this.orgTotScopeList 	= param.orgTotScopeList || []	// 
			this.selectList			= param.selectList || []
			this.p_succ_org_list	= param.succ_org_list || []		// 개인신용정보요구 api 실 결과 성공기관정보리스트
			this.isMramMod			= param.isMramMod || ''
            this.getData()
        },
        getData() {
			commonService.removeStorage("continueCert"+this.getUserInfo("mydtCusno"))

			console.log(">>>> 원본 선택 리스트 >>>> ", this.selectList)
			console.log(">>>> api 실 결과 성공기관정보리스트 >>>> ", this.p_succ_org_list)

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

			console.log(">>>> 성공 기관 필터링 처리 리스트 >>>> ", this.org_succ_list)
		},

		// 연결완료 또는 닫기 버튼 클릭
		fn_assetComplete(){
			this.getAllMyAssetInfoByFirst() // 2024.01.09,sungchul,자산요구 직후 비정기 수집
			this.getMyBizRegInfo()
			this.closeAll()
			
			// 연결완료 후 메인화면 이동
			routerService.moveMain()
		},
		
		// 자산추가 버튼 클릭
		fn_assetAdd() {
			this.fn_assetComplete()

			const config = {
				params : {},
				component : COAR2001
			}
			modalService.openPopup(config)
		},

    },
    components : {
    }
}


</script>