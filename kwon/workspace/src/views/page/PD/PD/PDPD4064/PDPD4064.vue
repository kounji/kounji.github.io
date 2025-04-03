<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 대출 한도 계산기
* @ 페이지설명 : 연금절세 > 대출 한도 계산기 > DSR 정보팝업
* @ 파일명     : src/views/page/PD/PD/PDPD4064/PDPD4064.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-06
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-06              CS541013              최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01" style="display:block;">
		<div class="popup_header">
			<h1>DSR 정보</h1>
			<!-- [v4.0] 25-02-27 이전버튼 삭제 <button type="button" class="prev"><span class="blind">이전</span></button> -->
		</div> 

		<div class="popup_content">
			<div class="loan_cal"> 
				<div class="tit_area">
					<h2 class="headline"><strong>DSR이란?</strong></h2>
				</div> 
				<div class="info_area">
					<p class="txt">연소득 대비 연간 부담해야 할 총 부채의 원리금 비율을 뜻합니다. 2022년 7월부터 총 대출이 1억원을 초과하는 경우 개인별 DSR 40%이내에서 대출이 가능합니다. </p>
					<div class="gray_box">
						<img src="@/assets_v40/images/img/img_dsr_info.png" alt="예시-연소득 1억원일 경우 연 대출상환액 40%로 4,000만원 대출 가능">
						<strong class="s_tit">DSR 계산식</strong>
						<p class="sub_txt">신규 신청 대출의 연간 원리금 상환액 + 기존 모든 대출의 연간 원리금 상환액 / 연소득 X 100</p>
					</div>
				</div>
				<div class="info_area">
					<strong class="h_tit01">DSR 계산 시, 적용 제외 대출</strong>
					<ul class="dotted_list">
						<li>중도금대출, 이주비 대출</li>
						<li>전세자금대출</li>
						<li>주택연금대출</li>
						<li>300만원 이하 소액신용대출</li>
						<li>300만원 이하 소액 예적금담보대출, 유가증권 담보대출</li>
						<li>정책적 목적에 따라 정부, 공공기관, 지방자치단체 등과 이차보전 등 협약을 체결하여 취급하는 대출</li>
						<li>자연재해 지역에 대한 지원 등 정부정책 등에 따라 긴급하게 취급하는 대출</li>
						<li>상속 또는 채권보전을 위한 경매참가 등을 통해 불가피한 대출 채무 인수</li>
					</ul>
				</div>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name: "PDPD4064",
    mixins: [
        popupMixin
    ],
    methods: {

    }
}
</script>