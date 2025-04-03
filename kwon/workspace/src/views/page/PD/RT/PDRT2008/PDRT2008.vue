<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 금융통통
* @ 페이지설명 : 금융과생활 > 금융통통 > 노후준비 >국민연금 임의계속가입 안내
* @ 파일명     : src\views\page\PD\RT\PDRT2008\PDRT2008.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-03              CS533541              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div> 
	<!-- 슬라이드 팝업 시작 -->
	<div class="dimmed" style="display: block;"></div>
	<div class="popup_box renewal old_age mydata2023"><!-- 0803 .mydata2023 클래스 이동-->
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<strong class="titH3">국민연금 임의계속가입</strong>
			</div>
			<div class="popup_content">
				<div class="help_box">
					<ul class="bl_dot_list one_register_list mt0">
						<li>국민연금 최소 가입 기간이 부족한 경우 임의계속가입 제도를 신청하여 65세까지 120개월을 채우면 연금으로 수령이 가능합니다.</li>
						<li>최소 가입 기간 조건이 충족되지 못한 경우 납부한 연금은 일시금으로 수령하며 일시금으로 수령 할 경우 연금으로 수령 하는 총 금액 보다 적은 금액을 지급 받습니다.</li>
						<li>120개월 가입 기간 조건은 국민연금에 한하며 퇴직연금과 개인연금은 개별 연금 수령 조건에 따라 연금 신청이 가능합니다.</li>
					</ul>
				</div>
			</div>
			<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
		</div>
	</div>
	<!--// 슬라이드 팝업 종료 -->	
	</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
export default {
    mixins: [
            commonMixin,
            popupMixin
        ]
}
</script>