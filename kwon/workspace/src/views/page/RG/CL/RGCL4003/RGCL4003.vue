<!--
/*************************************************************************
* @ 서비스경로 : NH지역정보 > 지역문화 > 시설 상세팝업
* @ 페이지설명 : NH지역정보 > 지역문화 > 시설 상세팝업
* @ 파일명     : src/views/page/RG/CL/RGCL4003/RGCL4003.vue
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
				<div class="title"> <!--[v4.0] 2025-01-24 클래스명 수정-->
					<strong>{{ params.orgnm }}</strong>
					<p>발간년도 <span>{{ params.pbcYy }}</span>년 기준</p> <!--[v4.0] 2025-02-25 텍스트 추가-->
				</div>

				<div class="board_box">
					<dl class="info_list">
						<div>
							<dt class="ico_flag">오시는 길</dt>
							<dd>{{ params.adr }}</dd>
						</div>
					</dl>
				</div>
				
				<!-- 
					네이버맵 컴퍼넌트 파라미터 필수
					mapMode : polyLine | retina | geocoder
					mapInfoList : Y,X 좌표 리스트 | 위치정보
				-->
				<cmm-naverMap :mapInfoList.sync="mapInfoList" mapMode="geocoder"></cmm-naverMap>
				<cmm-naverMap :mapInfoList.sync="mapInfoList1" mapMode="geocoder"></cmm-naverMap>

				<!-- // -->
			</section>

		</div>

		<a href="#nolink" role="button" class="btn_close" @click.prevent="closeAll()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->

</div>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import CmmNaverMap from '@/components/CmmNaverMap.vue' //네이버맵 공통컴퍼넌트

export default {
    name : "RGCL4003",
	data: () => {
        return {
			mapInfoList : [],
			mapInfoList1 : [],
		}
	},
	created() {
		this.mapInfoList.push(this.params.adr);
		console.log("상세 페이지 mapinfoList >> ", this.mapInfoList);
	},
    mounted() {
        // PFM로그 처리 화면접속이력 등록 POST
		this.initComponent();
        apiService.pfmLogSend(this.$options.name);
    },
    mixins: [
        commonMixin
		,popupMixin 
    ],
    methods: {
		initComponent() {
			this.$nextTick(() => {
				this.mapInfoList1.push(this.params.adr);
				console.log("상세 페이지 mapinfoList1 >> ", this.mapInfoList1);
			})
		},
    },
    components: {
		Page,
		CmmNaverMap,
	}
}
</script>