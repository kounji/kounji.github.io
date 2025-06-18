<!--
/*************************************************************************
* @ 서비스경로 : NH지역정보 > 농촌여행
* @ 페이지설명 : NH지역정보 > 농촌여행
* @ 파일명     : src/views/page/RG/AT/RGAT4001/RGAT4001.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-10              CS541013              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view">
        <div id="content">
            <section class="local_info">
                <div class="local_banner">
                    <!-- <a href="https://www.farmstay.co.kr/search" target="_blank" title="새창열기"> -->
                    <a href="javascript:void(0);" @click.prevent="openWebBrowser('https://www.farmstay.co.kr/search')" target="_blank" title="새창열기">
                        <img src="@/assets_v40/images/banner/img_farm_banner_01.png" class="img" alt="농협 팜스테이 전통먹거리와 지역 축제를 즐겨요">
                    </a>

                    <!-- 오늘의 농사 링크 -->
                    <!-- 앱 설치 여부에 따라 앱 실행 혹은 앱 설치 화면으로 이동 -->
                    <!-- <a href="https://farm.nonghyup.com/comm/link/comm1020.do" target="_blank" title="새창열기"> -->
                    <a href="javascript:void(0);" @click.prevent="openWebBrowser('https://farm.nonghyup.com/comm/link/comm1020.do')" target="_blank" title="새창열기">
                        <img src="@/assets_v40/images/banner/img_farm_banner_02.png" class="img" alt="농협이 만든 종합영농정보 플랫폼 NH오농">
                    </a>					
                </div>
            </section>
        </div>
        <footersV2 type="" />

    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import appService from '@/service/appService'
import apiService from '@/service/apiService'

export default {
    name : "RGAT4001",
	data: () => {
        return {
            
		}
	},
    mixins: [
        popupMixin,
		commonMixin
    ],
    mounted() {
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.mydtCusno = this.getUserInfo('mydtCusno');
        },
        /**
         * 외부 브라우저 열기
         */
        openWebBrowser(url) {
            if (this.getUserInfo('chnl') === '385') {
                appService.executeBrowser(url);
            } else {
                appService.cokBankOpenPopupWebBrowser(url);
            }
        },
    },
    components: {
		Page,
        FootersV2,
	}
}
</script>