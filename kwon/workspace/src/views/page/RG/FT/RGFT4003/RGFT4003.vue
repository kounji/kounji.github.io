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

				<div class="board_box">
					<dl class="info_list">
						<div>
							<dt class="ico_flag">오시는길</dt>
							<dd>
								<span>{{initFestivalListPopup.adr}} {{initFestivalListPopup.dtlAdr}}</span> <!-- 주소 -->
								<span>{{initFestivalListPopup.zip}}</span> <!-- 우편번호 -->
							</dd>
						</div>
					</dl>
				</div>

				<div class="btns_wrap half">
					<button type="button" class="btns lg primary" @click.prevent="fn_Share()">공유하기</button>
				</div>

				<!-- 이미지 있을 경우 (API 호출) -->
				<div v-if="(resFestivalListPopup.length > 0)">
				<div class="detail_img" v-for="(resFestival, index) in resFestivalListPopup" :key="index">
					<img :src="resFestival.thmnlImgUrlnm" @error="emptyImg" alt="">
				</div>
				</div>

				<!-- 이미지 없을 경우 (기본 이미지 노출) -->
				<div v-if="(resFestivalListPopup.length <= 0)">
				<div class="detail_img" >
					<img src="@/assets_v40/images/img/img_event_empty.png" alt="이미지를 불러올 수 없어요"> <!--[v4.0] 2025-01-24 alt 값 추가-->
				</div>
				</div>

				<!-- 네이버 지도 영역 -->
				<!-- <div class="map_area">
					<img src="@/assets_v40/images/img/temp_map.png" alt="" style="width: 100%;">
				</div> -->
				<!-- // -->
				
				<!-- 
					네이버맵 컴퍼넌트 파라미터 필수
					mapMode : polyLine | retina | geocoder
					mapInfoList : Y,X 좌표 리스트 | 위치정보
				-->
				<cmm-naverMap :mapInfoList.sync="mapInfoList" mapMode="geocoder"></cmm-naverMap>
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
				mapInfoList : [],
			}
		},
		mounted() {
			this.initComponent();
			
			//PFM로그 처리 화면접속이력 등록 POST
			apiService.pfmLogSend(this.$options.name);
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
				console.log("getData()===========>",config)
				apiService.call(config).then(response => {
					if(response && response.festivalList){
						this.resFestivalListPopup = response.festivalList
						console.log("resFestivalListPopup()=resFestivalListPopup==========>",this.resFestivalListPopup)
					} else {
						this.resFestivalListPopup = [];
						console.log("resFestivalListPopup()===========>",this.resFestivalListPopup)
					}
				})
			},
			initComponent() {
				this.initFestivalListPopup = this.params.resFestivalList;
				this.festivalCntzId = this.params.festivalCntzId;
				this.$nextTick(() => {
					this.mapInfoList.push(this.params.resFestivalList.adr);
					console.log("상세 페이지 mapinfoList >> ",this.mapInfoList);
				});

				console.log("this.params.resFestivalList:::::", this.params.resFestivalList);
				console.log("this.params.festivalCntzId:::::", this.params.festivalCntzId);

				// 상세 조회
				this.getData();
			},
			fn_Share() {
				console.log("공유하기 버튼 클릭")
				
				const config = {
					params: {
						title: "", 	// 웹공유 타이틀
						text: "",	// 웹공유 text
					},
				}
				modalService.webSharePopup(config).then(response => {

				})
			},
			emptyImg(e) {
            	e.target.src = new URL("@/assets_v40/images/img/img_event_empty.png", import.meta.url).href            
        	},
		},
		components: {
			CmmNaverMap,
		},
	}
</script>