<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 도전목표챌린지 > 버킷리스트 > 등록완료
* @ 페이지설명 : 등록완료
* @ 파일명     : src\views\page\PD\MY\PDMY4051\PDMY4051.vue
* @ 작성자     : CS541015
* @ 작성일     : 2025-01-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-14              CS541015              최초작성
*************************************************************************/
-->
<template>

	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01" style="display:block;">
		<div class="popup_header">
			<h1>등록완료</h1>
		</div>

		<div class="popup_content">
			<!-- 버킷-내집마련 S -->
			<div class="bucket_account_done" v-show="fncObtDsc==='03'">
                <img src="@/assets_v40/images/sub/img_bucket_account_done_house.png" alt="" />
				<strong class="title">{{this.obtnm}}</strong>
				<strong>버킷 리스트 등록 완료!</strong>
                <div class="txt">당신의 꿈을 현실로 만들기 위한 여정이 시작 되었습니다.<br>앞으로 하나씩 실현해 나가는 그 순간까지,<br>함께 달려가요!</div>
            </div>
			<!-- //버킷-내집마련 E -->
			<!-- 버킷-내차구입 S -->
			<div class="bucket_account_done" v-show="fncObtDsc==='05'">
                <img src="@/assets_v40/images/sub/img_bucket_account_done_car.png" alt="" />
				<strong class="title">{{this.obtnm}}</strong>
				<strong>버킷 리스트 등록 완료!</strong>
                <div class="txt">당신의 꿈을 현실로 만들기 위한 여정이 시작 되었습니다.<br>앞으로 하나씩 실현해 나가는 그 순간까지,<br>함께 달려가요!</div>
            </div>
			<!-- //버킷-내차구입 E -->
			<!-- 버킷-여행목표 S -->
			<div class="bucket_account_done" v-show="fncObtDsc==='04'">
                <img src="@/assets_v40/images/sub/img_bucket_account_done_trip.png" alt="" />
                <strong class="title">{{this.obtnm}}</strong>
				<strong>버킷 리스트 등록 완료!</strong>
                <div class="txt">당신의 꿈을 현실로 만들기 위한 여정이 시작 되었습니다.<br>앞으로 하나씩 실현해 나가는 그 순간까지,<br>함께 달려가요!</div>

                <a href="javascript:void(0);" @click="openWebBrowser()" v-if="this.getUserInfo('chnl') === '386'">
                    <img src="@/assets_v40/images/banner/img_banner_bucket_trip.png" alt="소중한 분께 마을을 담아 외환선물하기" />
				</a>
            </div>
			<!-- //버킷-여행목표 E -->
			<!-- 버킷-여가생활 S -->
			<div class="bucket_account_done" v-show="fncObtDsc==='06'">
                <img src="@/assets_v40/images/sub/img_bucket_account_done_leisure.png" alt="" />
				<strong class="title">{{this.obtnm}}</strong>
				<strong>버킷 리스트 등록 완료!</strong>
                <div class="txt">당신의 꿈을 현실로 만들기 위한 여정이 시작 되었습니다.<br>앞으로 하나씩 실현해 나가는 그 순간까지,<br>함께 달려가요!</div>
            </div>
			<!-- //버킷-여가생활 E -->
			<!-- 버킷-자기계발 S -->
			<div class="bucket_account_done" v-show="fncObtDsc==='07'">
                <img src="@/assets_v40/images/sub/img_bucket_account_done_lang.png" alt="" />
				<strong class="title">{{this.obtnm}}</strong>
				<strong>버킷 리스트 등록 완료!</strong>
                <div class="txt">당신의 꿈을 현실로 만들기 위한 여정이 시작 되었습니다.<br>앞으로 하나씩 실현해 나가는 그 순간까지,<br>함께 달려가요!</div>
            </div>
			<!-- //버킷-자기계발 E -->
			<!-- 버킷-반려동물 S -->
			<div class="bucket_account_done" v-show="fncObtDsc==='08'">
                <img src="@/assets_v40/images/sub/img_bucket_account_done_pet.png" alt="" />
				<strong class="title">{{this.obtnm}}</strong>
				<strong>버킷 리스트 등록 완료!</strong>
                <div class="txt">당신의 꿈을 현실로 만들기 위한 여정이 시작 되었습니다.<br>앞으로 하나씩 실현해 나가는 그 순간까지,<br>함께 달려가요!</div>
            </div>
			<!-- //버킷-반려동물 E -->
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<button type="button" class="btn btn_mint" @click.prevent="popClose">확인</button>
			</div>
		</div>
		<!-- <a href="#nolink" class="btn_close"><span class="blind">팝업닫기</span></a>	 -->
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>

import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

export default {
    name : "PDMY4051",
    data: () => {
		return {
			fncObtDsc : '', // 버킷리스트 구분 코드
			obtnm     : ''  // 버킷리스트 목표 제목
        }
    },
    methods: {
		initComponent(params) {
			this.fncObtDsc = params.fncObtDsc || ''
			this.obtnm     = params.obtnm
		},
		popClose(){
			this.closeAllData('reSelect');
		},
		openWebBrowser(url) {
            appService.cokBankOpenPopupWebBrowser(url);
        },
    },
    mounted() {
		this.initComponent(this.params);
		
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],

}
</script>