<!--
/*************************************************************************
* @ 서비스경로 : NH지역정보 > 자전거길 국토종주 > 국토종주 자전거길 > 주변시설 상세
* @ 페이지설명 : NH지역정보 > 자전거길 국토종주 > 국토종주 자전거길 > 주변시설 상세
* @ 파일명     : src/views/page/RG/BM/RGBM4007/RGBM4007.vue
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
			<a href="javascript:void(0);" class="btn_pop_view" data-popup="full_popup_01">팝업보기</a>
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
					<strong v-if="surFacInfo.eqiKdnm === '인증센터'">{{ surFacInfo.bkphNm }}</strong>
					<strong v-else>{{ surFacInfo.bkphNm + ' ' + surFacInfo.eqiKdnm }}</strong>
					<p><em>국토종주 자전거길 주변시설</em>을 소개합니다.</p>
				</div>
				<p class="date">마지막 업데이트 기준 <span>{{ surFacInfo.lschgDtm }}</span></p>

				
                <!-- 네이버 지도 영역
				<div class="map_area">
					<img src="@/assets_v40/images/img/temp_map.png" alt="" style="width: 100%;"> 
				</div>
				-->

				<div v-if="!mapError && mapInfoList.length > 0" class="board_box"> <!--[v4.0] 2025-04-08 지도 UI 변경 -->
					<div class="head bg02">
						<strong>지도</strong>
						<p>지도를 확대/축소해서<br>더 상세한 코스를 확인해 보세요.</p>
					</div>
					<!-- 네이버 지도 영역 -->
					<div>
						<cmm-naverMap
							:mapInfoList.sync="mapInfoList" 
							mapMode="retina" 
							@map-error="mapError = true"
						></cmm-naverMap>
					</div>
					<!-- // -->
				</div>

			</section>

		</div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
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
    name : "RGBM4007",
	data: () => {
        return {
            surFacInfo: {},
			mapInfoList: [],
			mapError: false,
		}
	},
	created() {
		this.surFacInfo = this.params
		console.log("mapInfoList change")
		console.log(this.mapInfoList)

	},
    mounted() {
        //this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST

		console.log('window')
		console.log(window)
		this.getData()
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin
		,popupMixin
    ],
    methods: {
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

		getData() {
			const apiConfig = {
					method : 'post',
                	url : '/rg/bm/01r03',
                	data : {
                    	bkphNm: this.params.bkphNm,
						eqiKdnm: this.params.eqiKdnm
                	},
            	}	

            apiService.call(apiConfig).then(response => {
				let tmp = response.gpsList
				tmp[0].name = this.params.bkphNm
				tmp[0].isReverse = true
				this.mapInfoList = tmp	
				console.log('get this.mapInfoList')
				console.log(this.mapInfoList)
            })

		}
    },
    components: {
		Page,
        FootersV2,
		CmmNaverMap
	}
}
</script>