<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산진단 > 지표별 재무 진단 - 팝업 도움말
* @ 페이지설명 : 나의자산 > 자산진단 > 지표별 재무 진단 - 팝업 도움말
* @ 파일명     : src\views\page\AS\IP\ASIP2011\ASIP2011.vue
* @ 작성자     : 
* @ 작성일     : 2023-10-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-10-13              CS533031              최초작성
*************************************************************************/
-->
<template>

	<!-- 전체 팝업 시작 -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
		<div class="popup_header">
			<h1>재무설계 안내</h1>
		</div>
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="fi_info_title">
					<strong class="titH1">재무설계란 무엇일까요?</strong>
					<p class="desc">
						재무설계는 개인의 삶의 목표를 파악하고 달성하기 위해
						자신의 재무적, 비재무적 자원을 진단을 통해 적절하게 
						관리하는 일련의 과정입니다. 
					</p>
					<p class="desc">
						재무진단은 한국FP학회가 고안한 가계재무 상태평가지표와
						학회의 다수 최신 연구 논문을 기반으로 객관적으로 선정한
						각 지표를 활용합니다.
					</p>
				</div>
			</div>

			<hr class="hr02">

			<div class="com_inner fi_sub_wrap">
				<div class="fi_sub_title">
					<strong class="titH3">재무진단 기준 및 지표</strong>
					<p class="desc">
						재무진단은 아래 3가지 관점을 기준으로 총 9개의 재무 
						지표를 종합적으로 분석하여 재무 상태를 평가합니다.
					</p>
				</div>

				<div class="img_wrap">
					<img src="@/assets_v40/images/img/fi_sub_img01_2023.png" alt="가계재무의 3가지 기준 지출비율, 금융자산비율, 저축투자비율">
					<p class="img_desc">지출 수준, 저축, 투자 등으로 목표 달성 준비</p>
				</div>
				<div class="img_wrap">
					<img src="@/assets_v40/images/img/fi_sub_img02_2023.png" alt="미래준비의 3가지 기준 보장보험부담비율, 예비자금준비율, 연금자산준비율">
					<p class="img_desc">긴급 상황 및 안락한 노후생활을 위한 준비</p>
				</div>
				<div class="img_wrap">
					<img src="@/assets_v40/images/img/fi_sub_img03_2023.png" alt="가계재무의 3가지 기준 소비생활부채상환율, 부채비율, 부채상환비율">
					<p class="img_desc">부채 상환 비중을 통해 건강한 삶의 질 유지</p>
				</div>

				<p class="desc mt40">
					※ 재무 진단은 연결한 금융 자산을 기준 일부 추정치 금액을
					반영하여 평가한 결과로 참고용으로  활용하세요.
				</p>
			</div>
			
		</div>
		
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// 전체 팝업 종료 -->

</template>

<script>

/*eslint-disable */    
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

export default {	
	name : "ASIP2011",
	mixins: [
		commonMixin,
		popupMixin
	],
	data: () => {
		return {
			
		}
	},
	mounted() {
		
	}
}
</script>