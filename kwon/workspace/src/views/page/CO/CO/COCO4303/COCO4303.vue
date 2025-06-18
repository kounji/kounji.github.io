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
		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="fn_close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>

	import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
	import modalService from '@/service/modalService'
	import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue
	
	export default {
		name : "COCO4303",
		data: () => {
			return {
				isMounted: false,
				voiceTxt: '',		// 음성인식 텍스트
				isListening : true // 임시
			}
		},
		computed: {
			
		},
		mounted() {
			this.isMounted = true
			this.initComponent()

		},
		destroyed() {
			this.isMounted = false
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
			
				this.showVoice().then( res =>{
					console.log('res :: ', res)				
					if(res){
						// (CB) 0 : 정상메시지 , 97 : 사용자종료 , 98 : 권한오류 , 99 : 일반적인 에러
						// (SB) 6 : "입력이 없습니다", (AOS) 7: 일치하는 항목이 없습니다
						let resultJson = null
						if ( this.getUserInfo('chnl') === "385" ) {
							resultJson = res.result
						} else {
							resultJson = JSON.parse(res.result)
						}

						if(resultJson.code == '0') { // 음성인식 텍스트 존재
							this.voiceTxt = resultJson.msg
							this.isListening = false

							setTimeout(()=> {
								this.close(this.voiceTxt)
                			}, 2000)

						} else if (resultJson.code == '99' || resultJson.code == '6') { // 음성인식 텍스트 없음
							modalService.alert("음성인식 시간이 초과되었어요. 음성 검색을 하시려면 마이크 버튼을 선택하세요.").then(() => {
								this.close()
							});
						} else { //resultJson.code == '97' //사용자 종료
							// 팝업 닫기(fn_close()) 수행시 closeVoice() 수행되면서 음성인식 응답이 97로 내려옴. 음성 인식 팝업은 이미 fn_close() 수행시 종료 되었기 때문에 후처리 하지 않음
							if(this.isMounted) {
								this.fn_close()
							}
						}
					}
				}).catch(error => {
					console.log('error:', error)
					this.close()
				})

            },	
			
			// 팝업 닫기 클릭 시
			fn_close() {
				this.closeVoice() // 마이크 사용 종료
				this.close()
			},

			isEmpty(value) {
            	return (value === null || value === undefined || value.length < 1) ? true : false
        	},

		},
		components : {
        	LottieAnimation
    	},
	}
</script>
