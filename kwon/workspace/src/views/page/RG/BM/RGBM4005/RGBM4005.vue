<!--
/*************************************************************************
* @ 서비스경로 : NH지역정보 > 자전거길 국토종주 > 국토종주 자전거길 > 자전거길코스 상세
* @ 페이지설명 : NH지역정보 > 자전거길 국토종주 > 국토종주 자전거길 > 자전거길코스 상세
* @ 파일명     : src/views/page/RG/BM/RGBM4005/RGBM4005.vue
* @ 작성자     : CS541601
* @ 작성일     : 2025-02-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-11              CS541601              최초작성
*************************************************************************/
-->
<template>
<div>
    <!-- wrap S -->
	<div id="wrap" class="sticky-scroll">
		<div>
			<a href="#nolink" class="btn_pop_view" data-popup="full_popup_01">팝업보기</a>
		</div>    
	</div>
	<!--// wrap E -->

	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>상세정보</h1>
		</div>

		<div class="popup_content">

			<section class="local_detail">
				<div class="title">
					<strong>{{ roadInfo.bkphNm }}</strong>
					<p><em>국토종주 자전거길</em>을 소개합니다.</p>
				</div>
				<p class="date">마지막 업데이트 기준 <span>{{ roadInfo.lschgDtm }}</span></p>

                <!-- 네이버 지도 영역 -->

				<!--
				<div class="map_area">
					<img src="@/assets_v40/images/img/temp_map.png" alt="" style="width: 100%;">
					<img src="@/assets_v40/images/img/temp_map.png" alt="" style="width: 100%;">
				</div>
				-->	
				<!-- 
				네이버맵 컴퍼넌트 파라미터 필수
				mapMode : polyLine | retina
				mapInfoList
				-->
				<cmm-naverMap :mapInfoList.sync="mapInfoList" mapMode="polyLine"></cmm-naverMap>
			</section>

		</div>

		<a href="#nolink" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->

</div>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import RGCL4003 from '@/views/page/RG/CL/RGCL4003/RGCL4003' // 지역축제 상세 팝업  
import modalService  from '@/service/modalService'

import CmmNaverMap from '@/components/CmmNaverMap.vue' //네이버맵 공통컴퍼넌트

export default {
    name : "RGBM4005",
	data: () => {
        return {
            roadInfo: {},
			mapInfoList: [],
		}
	},
	computed: {
	},
	created() {
		//console.log("■■ ■ ■ ■  created", this.params);
		this.roadInfo = this.params
		this.mapInfoList = this.roadInfo.gpsList

		console.log('mapInfoList')
		console.log(this.mapInfoList)
		
	},	
    mounted() {
        //this.initComponent()
		//this.roadInfo = this.params
		//console.log("this.roadInfo", this.roadInfo)
		
        //PFM로그 처리 화면접속이력 등록 POST
        this.initComponent()
		apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        commonMixin
		,popupMixin
    ],
    methods: {
		initComponent() {
			console.log("initComponent this.roadInfo" , this.roadInfo);

			this.$nextTick(()=>{
				this.mapInfoList = this.roadInfo.gpsList;
			})
			
			//PFM로그 처리 화면접속이력 등록 POST
			apiService.pfmLogSend(this.$options.name)
		},		
		  /* 문화시설 상세 팝업 */
        fn_goPopDetailPage() {


			let compName = RGCL4003
			let param    = {};

			const config = {
				component: compName,
				params : param
			}
			modalService.openPopup(config).then(() => {})
		},

    },
    components: {
		Page,
        FootersV2,
		CmmNaverMap
	},

	watch:{
		/*
		params(){
			const vm = this;
			vm.mapInfoList = vm.params.gpsList
		}
		*/
    }	
}
</script>