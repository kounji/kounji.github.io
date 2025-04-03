<!--
/*************************************************************************
* @ 서비스경로 : 공통팝업 > 타기관 데이터 로딩
* @ 페이지설명 : 공통팝업 > 타기관 데이터 로딩
* @ 파일명     : src/views/page/MR/AM/MRAM4008/MRAM4008.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-26
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-26              CS541013              최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
	<div class="full_popup renewal mydata2023 other_mydata" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동--><!-- 2024-11 : 타기관마이데이터 other_mydata 추가 -->
		<div class="popup_header">    
			<h1>타기관 마이데이터</h1>
		</div>
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="renewal_loading other_loading"><!-- [v4.0] other_loading 클래스 추가 -->
				<!--[v4.0] 로티이미지로 변경 -->
				<!--
				<div class="dataLoadingArea">
					<img src="../../../../src/assets_v40/images/new/bg_loading_temp.png" class="tempImg">
				</div>
				-->
				<div class="other_loading_ani">
					<!-- <lottie-player src="@/assets_v40/images/lottie/other_data_loading.json"  loop autoplay aria-hidden="true" class="bg"></lottie-player> -->
                    <lottie-animation :animationData="require('@/assets_v40/images/lottie/other_data_loading.json')" 
                                         ref="anim"
                                         :loop="true"
                                         :auto-play="true" 
                                         aria-hidden="true" 
                                         class="bg" 
                                         >
                    </lottie-animation>
				</div>
				<!--//[v4.0] 로티이미지로 변경 -->
				<div class="loading_num">
					<strong class="counter_num txt_mint">90</strong><span>초</span>
				</div>
				<p class="loading_txt">데이터를 불러오는 중입니다.</p>
				<p class="loading_txt">잠시만 기다려주세요.</p><!--[v4.0] 마침표 추가, 점점점 애니, mt5 클래스 제거-->
			</div>
		</div>
		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import $ from 'jquery'

import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue

export default {
    name : "MRAM4008",
    data: () => {
        return {
            
        }
    },
    mounted() {
        this.timer();
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        timer () {
            var num = 90;
            setInterval(function(){
                num--;
                if(num <0){
                    num = 90;
                    $('.loading_num .counter_num').text(num);
                }else{
                    $('.loading_num .counter_num').text(num);
                }
            },1000)
        }
    },
    components : {
        LottieAnimation
    },
}
</script>