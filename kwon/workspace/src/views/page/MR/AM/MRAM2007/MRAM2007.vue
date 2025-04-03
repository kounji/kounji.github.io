<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 연결자산관리 > 자산연결해제 > 연결 해제 완료
* @ 페이지설명 : 연결자산관리 > 자산연결해제 > 연결 해제 완료
* @ 파일명     : src/views/page/MR/AM/MRAM2007/MRAM2007.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-08
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-08              CS528069              최초작성
* !!!!!!!!!!!!!! 퍼블만 붙인 파일
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>연결 해제</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner progress_wrap">
				<div class="complete">
					<div class="secede_box2">
						<p class="txt titH1">연결 해제가<br>완료 되었습니다.</p>
					</div>
				</div>
			</div>
			<div class="com_inner">
				<div class="custom_list com_box_type01 noBorder mt10">
					<div class="list_type_custom">
						<div class="list_item" v-for="(disconItem, disconIdx) in disconOrgList" :key="'discon_'+disconIdx">
							<i :class="disconItem.orgC"></i>
							<strong class="bank_name tit">{{disconItem.orgnm}}</strong>
							<!-- :class="disconDsc === 'rev' ? 'icon01' : 'suc'" -->
							<span class="ico_result suc" >{{disconDsc === "rev" ? '수집 정보 보관' : '해제 완료'}}</span>
						</div>
						<!-- <div class="list_item">
							<i class="B1AABF0000"></i>
							<strong class="bank_name tit">국민연금공단</strong>
							<span class="ico_result suc">해제 완료</span>
						</div> -->
					</div>
				</div>
				<p class="stdMsg star">이미 수집된 정보는 보관되며 삭제를 원할 경우 만료&middot;해제 기관 화면에서 가능합니다. </p>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click="close('complete')">확인</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="close('complete')"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {mapActions} from 'vuex'

export default {
	name: 'MRAM2007',
	data: () => {
		return {
			disconOrgList : [],	// 연결해제/철회 기관 리스트
			disconDsc : "",	// 연결해제/철회 구분
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
		...mapActions('myassets', [
			'getMyBizRegInfo','getAllMyAssetInfo'
		]),
		initComponent(param = {}) {
			this.disconOrgList = param.orgList || []
			this.disconDsc = param.disconDsc || "del"

			this.getData(param)
		},
		getData(param) {
			console.log(param)
		},
	},
	components: {      
		
	},
	destroyed() {
		this.getMyBizRegInfo()  //연결기관정보 조회/갱신
		this.getAllMyAssetInfo()
	}
}
    
</script>