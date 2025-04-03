<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 로딩_일반로딩
* @ 페이지설명 : 공통 > 로딩_일반로딩
* @ 파일명     : src/views/page/popup/common/LoadingPopupV4.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-26
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-26              CS541013              최초작성
*************************************************************************/
-->
<template>
    <!-- 로딩 영역 -->
	<div id="loading_area">
		<!-- <lottie-player class="lottie load" src="/src/assets_v40/images/lottie/loading.json" loop autoplay></lottie-player> -->
        <lottie-animation :animationData="require('@/assets_v40/images/lottie/loading.json')" 
                                         ref="anim"
                                         :loop="true"
                                         :auto-play="true" 
                                         aria-hidden="true" 
                                         class="lottie load" 
                                         >
        </lottie-animation>
	</div>
	<!-- //로딩 영역 -->
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue

export default {
    name : "LoadingPopupV4",
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
        
    },
    components : {
        LottieAnimation
    },
}
</script>