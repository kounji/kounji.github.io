<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 오픈 사전 안내
* @ 페이지설명 : 전체메뉴 > 오픈 사전 안내
* @ 파일명     : src/views/page/CO/CO/COCO0018/COCO0018.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-11-30
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-11-30              CS515731                 최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<!--end-->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="blind">오픈예정안내</h1>
			
		</div>
		
		<div class="popup_content com_no_bottom temp_open_info"><!-- 하단 버튼 없을때 com_no_bottom -->
			<strong class="open_info_txt">
				NH콕마이데이터 서비스가<br/><span class="com_point_mint">새로운 모습</span>으로 찾아옵니다<a href="javascript:void(0);" @click="fn_clickEvent()">.</a>
			</strong>
			<p class="open_info_txt">
				더 나은 서비스 제공을 위해<br/><span class="com_point_mint">NH콕마이데이터 서비스</span>가 아래와 같이<br/>중단 되오니 이용에 참고 바랍니다.
			</p>
			<div class="img">
				<img src="@/assets/images/event/img_open_info.png" alt="서비스 중단일시 11월 14일(월) 00시 ~ 06시">
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click="goAppHome()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

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
	// import COCO0017 from '@/views/page/CO/CO/COCO0017/COCO0017' // 서비스안내

    export default {
        name : "COCO1118",
        data: () => {
            return {
				btnClickCnt : 0, //버튼클릭 카운트
				isShowBanner : false
            }
		},
		computed : {
			chkGrandOpen(){
				if(granOpenDateCheck()) 
				{
					return true
				}else{
					return false
				}
			}
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
					if(granOpenDateCheck()){
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