<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > NH모바일인증서 안내
* @ 페이지설명 : NH모바일인증서 안내
* @ 파일명     : src/views/page/CO/AR/COAR4037/COAR4037.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-05-08
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-05-08              CS541597              최초작성
*************************************************************************/
-->
<template>
	<div>
		<!-- 슬라이드 팝업 시작 -->
		<div class="dimmed" style="display:block;" @click.prevent="close()"></div>
		<div class="popup_box">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01">
				<div class="popup_header">
					<h1>NH모바일인증서</h1>
				</div>
				<div class="popup_content">
					<div class="no_result nh_cer">
						<p class="text">유효한 NH모바일인증서가 없어요!<br>인증서를 발급해주세요.</p>
						<div class="bg">
							<lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_no_result.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="bg_no_result" background="transparent"></lottie-animation>
						</div>
					</div>
				</div>
				<div class="popup_footer">
					<div class="btns_wrap">
						<button type="button" class="btns lg primary" @click.prevent="fn_goCertCenter">인증서 발급하기</button>
					</div>
				</div>
				
				<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
			</div>
		</div>
		<!--// 슬라이드 팝업 종료 -->
	</div>
</template>

<script>
import appService from '@/service/appService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import LottieAnimation from 'lottie-web-vue'

export default {
    name : "COAR4037",
    data: () => {
        return {
            certDsc : "",
        }
    },
    mounted() {
		this.initComponent(this.params)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
		initComponent(param = {}) {
			this.certDsc = param.certDsc
		},
        // 인증센터 바로가기
		fn_goCertCenter() {
			
			if( !(window.location.host.indexOf('localhost') > -1) ) {
				// 로컬이 아닐경우
				if(this.getUserInfo('chnl') === "385") {
					// 스뱅
					appService.goSmartBankingCertCenter()
				} else {
					// 콕뱅
					appService.cokBankGoCertCenter()
				}
			} else {
				// 로컬일 경우
				modalService.alert("로컬일 경우 공동인증센터 바로가기 실행불가").then(() => {
				
				})
			}
		},
    },
	components: {
		LottieAnimation
	}
}
</script>