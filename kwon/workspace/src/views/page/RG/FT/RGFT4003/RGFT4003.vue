nn<!--
/*************************************************************************
* @ 서비스경로 : NH 지역정보 >	지역축제 >	지역축제 상세 팝업
* @ 페이지설명 : NH지역정보 > 지역축제 > 지역축제 상세 팝업
* @ 파일명     : src/views/page/RG/FT/RGFT4003/RGFT4003.vue
* @ 작성자     : CS541601
* @ 작성일     : 2025-02-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-11             CS541601                 신규
*************************************************************************/
-->
<template>

<!-- full popup S -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>상세정보</h1>
		</div>

		<div class="popup_content">

			<section class="local_detail">
				<div class="title"> <!--[v4.0] 2025-01-24 클래스명 수정-->
					<strong>{{initFestivalListPopup.cntzTinm}}</strong>
					<p>{{initFestivalListPopup.evtStDt}} ~ {{initFestivalListPopup.evtEdDt}}</p>
				</div>
				<p class="desc" v-html="initFestivalListPopup.brfCntn"></p>

				<div v-if="initFestivalListPopup.adr" class="board_box">
					<dl class="info_list">
						<div>
							<dt class="ico_flag">오시는길</dt>
							<dd>
								<span>{{initFestivalListPopup.adr}} {{initFestivalListPopup.dtlAdr}}</span> <!-- 주소 -->
							</dd>
						</div>
						<div v-if="initFestivalListPopup.zip"> <!--[v4.0] 2025-04-24 우편번호 위치 변경-->
							<dt class="ico_course">우편번호</dt>
							<dd>{{initFestivalListPopup.zip}}</dd>
						</div>
					</dl>
				</div>

				<div class="btns_wrap half">
					<button type="button" class="btns lg primary" @click.prevent="fn_Share()">공유하기</button>
				</div>

				<!-- 이미지 있을 경우 (API 호출) -->
				<div v-if=" resFestivalListPopup.length > 0 ">
					<div class="detail_img" v-for="(resFestival, index) in resFestivalListPopup" :key="index">
						<img 
						:src="resFestival.otxtImgUrlnm" 
						@error="handleImageError(index)" 
						v-show="!errorIndexes.includes(index)" 
						alt="">
					</div>
				</div>
				
				<div v-if="!mapError && mapInfoList.length > 0" class="board_box"> <!--[v4.0] 2025-04-08 지도 UI 변경 -->
					<div class="head bg02">
						<strong>지도</strong>
						<p>지도를 확대/축소해서<br>더 상세한 위치를 확인해 보세요.</p>
					</div>
					<!-- 
						네이버맵 컴퍼넌트 파라미터 필수
						mapMode : polyLine | retina | geocoder
						mapInfoList : Y,X 좌표 리스트 | 위치정보
					-->
					<cmm-naverMap 
						:mapInfoList.sync="mapInfoList" 
						mapMode="retina" 
						@map-error="mapError = true"
					></cmm-naverMap>
				</div>
			</section>

		</div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="closeAll()"><span class="blind">팝업닫기</span></a>
	</div>
	
	<!--// full popup E -->

</template>
<script>
	import popupMixin from '@/common/mixins/popupMixin'
	import commonMixin from '@/common/mixins/commonMixin'
	import apiService from '@/service/apiService'
	import modalService from '@/service/modalService'
	import CmmNaverMap from '@/components/CmmNaverMap.vue' //네이버맵 공통컴퍼넌트

	export default {
		name : "RGFT4003",
		data: () => {
			return {
				initFestivalListPopup : [],
				resFestivalListPopup : [],
				errorIndexes: [],
				mapInfoList : [],
				mapError: false,
			}
		},
		mounted() {
			this.initComponent();
			
			//PFM로그 처리 화면접속이력 등록 POST
			apiService.pfmLogSend(this.$options.name);
		},
		computed: {
		},
		mixins: [
			popupMixin
			,commonMixin
		],
		methods: {
			getData() {
				console.log("지역정보 상세 조회!!")
			
				const config = {
					url: '/rg/ft/01r02',
					data: {
						"cntzId" : this.params.festivalCntzId,	// 축제 id
					}
				}
				apiService.call(config).then(response => {
					if(response && response.festivalList){
						this.resFestivalListPopup = response.festivalList
					} else {
						this.resFestivalListPopup = [];
					}
				})
			},
			initComponent() {
				this.initFestivalListPopup = this.params.resFestivalList;
				this.festivalCntzId = this.params.festivalCntzId;
				this.$nextTick(() => {
					this.mapInfoList.push(this.params.resFestivalList);
				});

				// 상세 조회
				this.getData();
			},
			fn_Share() {

				console.log('otxtImgUrlnm')
				console.log(this.initFestivalListPopup.otxtImgUrlnm)
				
				const config = {
					params: {
						category: 3, // 축제 카테고리 번호 3
						cntzTinm: this.initFestivalListPopup.cntzTinm, // 축제명
						otxtImgUrlnm: this.initFestivalListPopup.otxtImgUrlnm, // 이미지 url 
						evtStDt: this.initFestivalListPopup.evtStDt, // 축제 시작일
						evtEdDt: this.initFestivalListPopup.evtEdDt, // 축제 종료일
						screenId: 'RGFT4001', // 앱 랜딩시 초기 화면으로 표시할 화면ID 
					}, 
				}
				modalService.webSharePopup(config);
			},
			handleImageError(index) {
				if(!this.errorIndexes.includes(index)) {
					this.errorIndexes.push(index);
				}
			},
		},
		components: {
			CmmNaverMap,
		},
	}
</script>