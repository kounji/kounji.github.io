<!--
/*************************************************************************
* @ 서비스경로 : 홈 > 통합검색 > 음성 검색
* @ 페이지설명 : 홈 > 통합검색 > 음성 검색
* @ 파일명     : src/views/page/CO/CO/COCO4303/COCO4303.vue
* @ 작성자     : CS541817
* @ 작성일     : 2025-03-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-06              CS541817              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">

		<div class="popup_header">
			<h1>음성검색</h1>
		</div>

		<div class="popup_content">

			<div class="message_group">
				<p class="title">찾고자 하는 <strong>검색어</strong>를<br>말씀하세요.</p>
				<div class="voice_box">
					<template v-if="isListening">  
						<p class="info">듣고 있습니다.</p>
					</template>
					<template v-else>
						<p class="info">인식되었습니다.</p>
						<span class="bubble_text">{{ voiceTxt }}</span>
					</template>
					<!-- <lottie-player src="../../../../src/assets_v40/images/lottie/bg_voice_char.json" loop="" autoplay="" aria-hidden="true" class="lottie" background="transparent"></lottie-player> [v4.0] 배경이미지 로티json으로 변경 -->
					<lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_voice_char.json')" 
									ref="anim"
									:speed="1"
									:loop="true"
									:auto-play="true" 
									aria-hidden="true" 
									class="lottie" 
									background = "transparent"
									>
					</lottie-animation>
				</div>
			</div>
			
		</div>
		<a href="#nolink" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>

	import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

	import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue
	
	export default {
		name : "COCO4303",
		data: () => {
			return {
				voiceTxt: '',		// 음성인식 텍스트
				isListening : true // 임시
			}
		},
		computed: {
			
		},
		mounted() {

			this.initComponent()

		},
		mixins: [
			popupMixin,
			commonMixin
		],
		methods: {

			initComponent() {
				this.voiceFn()
			},

			// 음성인식
			voiceFn() {
				console.log("음성인식 click...")
			
				this.showVoice().then(res=>{
					console.log('res:', res)
					if(res.msg){
						//modalService.alert(res.msg)
						this.voiceTxt = res.msg
						this.isListening = false

						setTimeout(()=> {
							this.close(this.voiceTxt)
                		}, 2000)
					}
				}).catch(error => {
					console.log('error:', error)
				})

				// 임시...
									
				// setTimeout(()=> { 
				// 	this.voiceTxt = "금융"
				// 	this.isListening = false;
				// },2000)
				
				// setTimeout(()=> {
				// 	this.close(this.voiceTxt)
                // },2000)

            },
			

		},
		components : {
        	LottieAnimation
    	},
	}
</script>
