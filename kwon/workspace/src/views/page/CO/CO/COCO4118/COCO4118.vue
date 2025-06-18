<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 오픈 사전 안내
* @ 페이지설명 : 전체메뉴 > 오픈 사전 안내
* @ 파일명     : src/views/page/CO/CO/COCO4118/COCO4118.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-05-27
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-05-27              CS541597              최초작성 (COCO1118 -> COCO4118)
*************************************************************************/
-->
<template>
	<div class="open_info2024">
		<img src="@/assets_v40/images/event/2024/open_info2024.png" alt="보다 새로워진 NH콕마이데이터(자산관리)를 만나보세요! 더 나은 서비스 제공을 위해 NH콕마이데이터(자산관리) 서비스가 아래와 같이 중단 예정이오니 이용에 참고 바랍니다. 서비스 중단일시 2025년 6월 19일(목) 00시~09시(9시간), 더 쉽고 편리해진 자산관리">
		<a href="javascript:void(0);" class="temp_test_btn" @click="fn_clickEvent"></a>
		<a href="javascript:void(0);" class="btn_close" @click="goAppHome"><span class="blind">팝업닫기</span></a>
	</div>
</template>
<style scoped>
	html {font-size:62.5%}
	body {margin:0;}
	.open_info2024 {background-color:#f2f4f6;height:100vh;position:relative;}
	.open_info2024 img {display:block;margin:0 auto;width:37.5rem;}
	.open_info2024 .btn_close {
		z-index: 900;
		display: block;
		position: fixed;
		width: 2.4rem;
		height: 2.4rem;
		background: url(@/assets_v40/images/icon/header/icon_close.png) no-repeat center/2.4rem;
		right: 1.6rem;
		top: 1.3rem;
	}
	.blind {
		position: absolute;
		display: inline-block;
		width: 1px;
		height: 1px;
		border: 0;
		margin: -1px;
		clip: rect(1px,1px,1px,1px);
		line-height: 0;
		overflow: hidden;
	}
	.temp_test_btn {display:block;position:absolute;bottom:0;right:0;width:20rem;height:15rem}

</style>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {granOpenDateCheck} from '@/utils/date'
import configService from '@/service/configService'
import appService from '@/service/appService'
import scrapingService from '@/service/scrapingService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import apiService from '@/service/apiService'

export default {
	name : "COCO4118",
	data: () => {
		return {
			btnClickCnt : 0, //버튼클릭 카운트
			isShowBanner : false
		}
	},
	computed : {
		
	},
	mounted() {
		this.initComponent()
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
	},
	mixins: [
		commonMixin,
		popupMixin
	],
	components: {      

	}		,
	methods: {
		initComponent() {
			this.isShowBanner = commonService.getOpenMenu()
		},
		goAppHome(){
			const sessionUserInfo = configService.getLoginSession() 
			if(import.meta.env.VITE_ENV !== 'R' && window.location.host.indexOf('localhost') > -1 ) {
				sessionStorage.clear()
				location.href = '/login.html'
			}else{
				if(sessionUserInfo.chnlGbn !== undefined && sessionUserInfo.chnlGbn === '002'){ //콕뱅
					modalService.toast('콕뱅크로 이동중입니다.') // 토스트 메세지
					sessionStorage.clear()
					appService.cokBankGoHome()
				}else{ //콕뱅이 아닐 경우는 모두 스뱅으로 처리
					modalService.toast('스마트뱅킹으로 이동중입니다.') // 토스트 메세지
					sessionStorage.clear()
					scrapingService.execute('SBView', 'navigateFromGNB', ['goHome()'])
				}
			}
			this.close()
		},			
		goMain(){
				modalService.toast('로그인 화면 이동중입니다.') // 토스트 메세지
				const sessionUserInfo = configService.getLoginSession() 
				const protocol	= location.protocol
				const hostname	= location.hostname
				const port		= location.port
				let url = protocol + '//' + hostname + ':' + port
				url = url + '/?cus='		+ encodeURIComponent(sessionUserInfo.cus || {} ) 
				url = url + '&chnl=' 		+ sessionUserInfo.chnl
				url = url + '&isOutAcc='
				url = url + '&cnm='
				//url = url + '&screen='		+ (sessionUserInfo.screen === undefined)? '' : sessionUserInfo.screen
				//url = url + '&lginInfVal='	+ (sessionUserInfo.lginInfVal === undefined)? '' : sessionUserInfo.lginInfVal
				//url = url + '&lginDtm='		+ (sessionUserInfo.lginDtm === undefined)? '' : sessionUserInfo.lginDtm
				url = url + '&lginInfVal='
				url = url + '&lginDtm='
				url = url + '&bypass=Y'
				//   isOutAcc // 상호 계좌 유무
				//   uid // uid
				//   cus // 고객번호
				//   cnm // 고객명
				//   chnl // 유입채널  => 스뱅 : 385, 콕뱅 : 386
				//   screen / 로그인 후 이동할 메뉴
				//   lginInfVal // 스뱅/콕뱅 로그인방식
				//   lginDtm  // 스뱅/콕뱅 로그인일시
				location.href = url

			// if(import.meta.env.VITE_ENV !== 'R' && window.location.host.indexOf('localhost') > -1 ) {
			// 	sessionStorage.clear()
			// 	location.href = '/login.html'
			// }else{
			// 	modalService.toast('로그인 화면 이동중입니다.') // 토스트 메세지
			// 	const sessionUserInfo = configService.getLoginSession() 
			// 	const protocol	= location.protocol
			// 	const hostname	= location.hostname
			// 	const port		= location.port
			// 	let url = protocol + '//' + hostname + ':' + port
			// 	url = url + '/?cus='		+ encodeURIComponent(sessionUserInfo.cus || {} ) 
			// 	url = url + '&chnl=' 		+ sessionUserInfo.chnl
			// 	url = url + '&isOutAcc='	+ (sessionUserInfo.isOutAcc === undefined)? '' : sessionUserInfo.isOutAcc
			// 	url = url + '&cnm='			+ (sessionUserInfo.cnm === undefined)? '' : sessionUserInfo.cnm
			// 	//url = url + '&screen='		+ (sessionUserInfo.screen === undefined)? '' : sessionUserInfo.screen
			// 	//url = url + '&lginInfVal='	+ (sessionUserInfo.lginInfVal === undefined)? '' : sessionUserInfo.lginInfVal
			// 	//url = url + '&lginDtm='		+ (sessionUserInfo.lginDtm === undefined)? '' : sessionUserInfo.lginDtm
			// 	url = url + '&lginInfVal='
			// 	url = url + '&lginDtm='
			// 	url = url + '&bypass=Y'
			// 	//   isOutAcc // 상호 계좌 유무
			// 	//   uid // uid
			// 	//   cus // 고객번호
			// 	//   cnm // 고객명
			// 	//   chnl // 유입채널  => 스뱅 : 385, 콕뱅 : 386
			// 	//   screen / 로그인 후 이동할 메뉴
			// 	//   lginInfVal // 스뱅/콕뱅 로그인방식
			// 	//   lginDtm  // 스뱅/콕뱅 로그인일시
			// 	sessionStorage.clear()
			// 	location.href = url
			// }
		},
		fn_clickEvent(){
			if(this.isShowBanner) {
				console.log('granOpenDateChk >>> ', granOpenDateCheck())
				if(granOpenDateCheck() || import.meta.env.VITE_ENV !== 'R'){
					this.btnClickCnt++
					if(this.btnClickCnt === 5){
						this.goMain()
					}
				}
			}
		}

	}
}
</script>