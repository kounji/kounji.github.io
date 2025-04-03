<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 대출이자 계산기
* @ 페이지설명 : 연금절세 > 대출이자 계산기 > 상환방식 풀팝업
* @ 파일명     : src/views/page/PD/PD/PDPD4052/PDPD4052.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-03
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-03              CS541013              최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01" style="display:block;">
		<div class="popup_header">
			<h1>상환방식 안내</h1>
			<!-- [v4.0] 25-02-27 이전버튼 삭제 <button type="button" class="prev"><span class="blind">이전</span></button> -->
		</div>

		<div class="popup_content">
			<div class="loan_cal"> 
				<div class="tit_area">
					<h2 class="headline"><strong>상환방식을<br>확인해보세요.</strong></h2>
				</div> 
				<div class="loan_cal_info">
					<div class="info_area">
						<p class="sub_txt">매달 같은 금액을 갚고 싶다면?</p>
						<strong class="tit">원리금균등상환</strong>
						<div class="gray_box">
							<p class="txt">원금과 이자를 합쳐 매일 일정한 금액을 상환하는 방법이에요. 만기까지 동일한 금액으로 상환해서 자금계획이 수월해요!</p>
							<img src="@/assets_v40/images/img/img_repay_mothod01.png" alt="">
						</div>
					</div>
					<div class="info_area">
						<p class="sub_txt">원금을 매달 같은 금액으로 갚고 싶다면?</p>
						<strong class="tit">원금균등상환</strong>
						<div class="gray_box">
							<p class="txt">일정한 원금에 이자를 더해서 상환하는 방법이에요. 만기까지 매월 상환하는 금액은 다르지만, 상환금액이 줄어든다는 장점이 있어요!</p>
							<img src="@/assets_v40/images/img/img_repay_mothod02.png" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>

		
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name: "PDPD4052",
    mixins: [
        popupMixin
    ],
    methods: {

    }
}
</script>