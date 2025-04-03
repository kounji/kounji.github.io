<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산진단 > 지표별 재무 진단 - 미래준비 - 연금자산준비율 도움말
* @ 페이지설명 : 나의자산 > 자산진단 > 지표별 재무 진단 - 미래준비 - 연금자산준비율 도움말
* @ 파일명     : src\views\page\AS\IP\ASIP2017\ASIP2017.vue
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
				<strong class="titH3">연금자산준비율이란?</strong>
			</div>
			<div class="popup_content">
				<div class="fi_sPopup">
					<p class="info">
						총 저축 금액 중 은퇴 및 노후 대비 저축 비중을 
						평가하는 지표로 아래 항목으로 진단해요.<br>
						<span class="under_line">노후대비저축 ÷ 저축/투자액</span>
					</p>

					<dl class="cont_type">
						<dt>노후대비저축</dt>
						<dd>개인형IRP, 퇴직연금DC형, 연금저축계좌, 연금보험 및 저축성 보험 연간 납부금액, 국민연금 납입금액 합계</dd>
					</dl>

					<dl class="cont_type">
						<dt>저축/투자액</dt>
						<dd>은행, 금융투자, P2P투자, 개인형IRP, 퇴직연금DC형, 연금저축/보험, 저축성보험 계좌 연간 납부금액, 국민연금 납입금액 합계</dd>
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
	name : "ASIP2017",
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