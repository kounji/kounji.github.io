<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산진단 > 지표별 재무 진단 - 미래준비 - 보장보험부담비율 도움말
* @ 페이지설명 : 나의자산 > 자산진단 > 지표별 재무 진단 - 미래준비 - 보장보험부담비율 도움말
* @ 파일명     : src\views\page\AS\IP\ASIP2015\ASIP2015.vue
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
				<strong class="titH3">보장보험부담비율이란?</strong>
			</div>
			<div class="popup_content">
				<div class="fi_sPopup">
					<p class="info">
						보험상품을 이용하여 미래 위험에 대한 대비 정도를 
						평가하는 지표로 아래 항목으로 진단해요.<br>
						<span class="under_line">보장성 보험료 ÷ 총소득</span>
					</p>

					<dl class="cont_type">
						<dt>보장성 보험료</dt>
						<dd>보장성보험료(연금/저축성 보험 제외) 연간 납부금액 합계</dd>
					</dl>

					<dl class="cont_type">
						<dt>총소득</dt>
						<dd>3개월 평균 건강보험료 또는 12개월 카드사용금액 기반 연간 총소득 추정액</dd>
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
	name : "ASIP2015",
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