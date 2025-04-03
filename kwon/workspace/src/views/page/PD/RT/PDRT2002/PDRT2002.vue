<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 금융통통
* @ 페이지설명 : 금융과생활 > 금융통통 > 노후준비 > 예상 연금 수령액 안내
* @ 파일명     : src\views\page\PD\RT\PDRT2002\PDRT2002.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-08-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-11              CS533541              최초작성
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
				<strong class="titH3">예상 연금 수령액</strong>
			</div>
			<div class="popup_content">
				<div class="help_box">
					<strong class="helpTit">알아두세요</strong>
					<ul class="bl_dot_list one_register_list">
						<li>예상 연금은 노후준비 안내를 위해 산정한 금액으로 <span class="com_point_red">실제 연금 수령 금액과 차이가 있을 수 있습니다.</span></li>
						<li>국민연금은 현재 소득 기준으로 만 60세까지 중단없이 보험료를 납부하고 매월 연금으로 받을 경우 국민연금공단의 예상연금월액표를 기준으로 추정한 금액입니다.</li>
						<li>퇴직연금과 개인연금은 조회 시점의 평가금액을 기준으로 연금 수령 까지의 거치치간 수익은 포함되지 않았으며, 각 제도마다 산출 과정이 다르고 연금 수령방식, 물가상승률, 세금  및 수수료에 따라 변동될 수 있습니다.</li>
						<li>예상 연금에 주택연금은 포함되지 않았으며 향후 확대 예정입니다.</li>
						<li>개인 적정 노후생활비는 국민연금관리공단에서 제공하는 통계 자료에 근거한 자료입니다.</li>
					</ul>
				</div>
			</div>
			<a href="javascript:void(0);" role="button" class="btn_close"  @click.prevent="close()"><span class="">닫기</span></a>
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