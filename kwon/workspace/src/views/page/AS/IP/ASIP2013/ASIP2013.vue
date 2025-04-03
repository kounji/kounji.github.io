<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산진단 > 지표별 재무 진단 - 가계재무 - 금융자산비율 도움말
* @ 페이지설명 : 나의자산 > 자산진단 > 지표별 재무 진단 - 가계재무 - 금융자산비율 도움말
* @ 파일명     : src\views\page\AS\IP\ASIP2013\ASIP2013.vue
* @ 작성자     : 
* @ 작성일     : 2023-10-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-10-13              CS533031              최초작성
*************************************************************************/
-->
<template>
	<div>
	<!-- 슬라이드 팝업 시작 -->
	<div class="dimmed" style="display: block;" @click.prevent="close()"></div>
	<div class="popup_box renewal mydata2023">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<strong class="titH3">금융자산비율이란?</strong>
			</div>
			<div class="popup_content">
				<div class="fi_sPopup">
					<p class="info">
						가계 자산 중 금융 자산의 규모를 평가하는 지표로
						아래 항목으로 진단해요.<br>
						<span class="under_line">금융자산 ÷ 총자산</span>
					</p>

					<dl class="cont_type list">
						<dt>금융자산</dt>
						<dd>은행, P2P투자 계좌잔액 및 평가금액 합계</dd>
						<dd>금융투자 예수금액 및 계좌 평가금액 합계</dd>
						<dd>개인형IRP, 퇴직연금DC형, 연금저축계좌 평가금액 합계</dd>
						<dd>연금보험 총 납입금액</dd>
					</dl>

					<dl class="cont_type list">
						<dt>총자산</dt>
						<dd>은행, P2P투자 계좌잔액 및 평가금액 합계</dd>
						<dd>금융투자 예수금액 및 계좌 평가금액 합계</dd>
						<dd>개인형IRP, 퇴직연금DC형, 연금저축계좌 평가금액 합계</dd>
						<dd>국민연금, 연금보험 총 납입금액</dd>
					</dl>
				</div>
			
			</div>
			<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
		</div>
	</div>
	<!--// 슬라이드 팝업 종료 -->
	</div>
</template>

<script>

/*eslint-disable */    
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

export default {	
	name : "ASIP2013",
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