<template>
	<div>
		<div>
			<h2>앱체크</h2>
			<p><button @click="testAppChk">앱체크 테스트</button></p>
			<h2>NH모바일 인증</h2>
			<p><button @click="fn_checkNhMobileCert">인증서 보유여부 ({{ nhMobileCertGbnName }})</button></p>
			<br>
			<p><button @click="getUuid">UUID 확인 :: {{ uuid }} / 자리수 :: {{ uuid.length > 0 ? uuid.length : '' }}</button></p>
			<br>
			<p><button @click="fn_getJWTNHCertToken">JWT NH모바일 인증서 토큰 발급</button></p>
			<span>
				<p>======================</p>
				<p>JWT NHMobileCert Token</p>
				<div>
					<strong>{{ resCode }}</strong>
					<strong>{{ resMsg }}</strong>
					<strong>{{ accessToken }}</strong>
				</div>
			</span>
			<br>
			<p><button @click="fn_openNHCert">NH모바일 인증서 화면 호출</button></p>
		</div>
		<h1></h1>
		<br>
		<span>=========== TO-BE 팝업 (2025) ============</span>
		<p><button @click="openSlideNHCertNoti">NH모바일인증서 미보유 안내 슬라이드</button></p>
		<br>
		<p><button @click="openSlideNHCertAgr">NH모바일인증서 약관동의 슬라이드</button></p>
		<br>		
	</div>
</template>

<script>
	import commonMixin from '@/common/mixins/commonMixin'
	import modalService from '@/service/modalService'
	import appService from '@/service/appService'
	import apiService from '@/service/apiService'
	import constants from '@/common/config/constants'
	import store from '@/store'
	import _ from 'lodash'

	export default {
		name: 'SampleCert',
		data: function() {
			return {
				nhMobileCertGbn: "2",	// 1: 보유중, 2: 미보유, other: 기간만료
				uuid: "",	// uuid
				resCode: "",	// NH모바일인증서 토큰발급 응답코드
				resMsg: "",	// NH모바일인증서 토큰발급 응답메시지
				accessToken: "",	// NH모바일인증서 접근토큰
			}
		},
		mixins: [
			commonMixin,
		],
		beforeMount(){

		},
		mounted() {
			this.fn_checkNhMobileCert()	// NH모바일인증서 유효여부
		},
		computed: {
			nhMobileCertGbnName() {
				let r = "";
				switch (this.nhMobileCertGbn) {
					case "1":
						r = "보유중";
						break;
					case "2":
						r = "미보유";
						break;
					default:
						r = "기간만료";
						break;
				}
				return r;
			},
		},
		methods: {
			async testAppChk() {
				let sttVerChk = ''
				if(import.meta.env.VITE_ENV !== 'R') {
					let confirmYn = ''
					const config = {
						content : ['앱버전 체크를 실행하시겠습니까?(개발서버)'],
						title   : ""
					}
					confirmYn = await modalService.confirm(config)

					if(confirmYn !== '예') return

					let verChk = ''
					const config_ = {
						content: ['스토어 이동 테스트???'],
						title: ""
					}
					verChk = await modalService.confirm(config_)

					if(verChk === '예') sttVerChk = '3.0.00'
				}
				console.log('>>> sttVerChk >>> ', sttVerChk)
				// v4 마이데이터 서비스 이용가능 콕뱅/스뱅 앱버전 최소요구사항 확인
				const ua = navigator.userAgent.toLowerCase()
				const platform = navigator.platform.toLowerCase()
				const isTouch = 'ontouchstart' in window
				const hasTouchPoints = navigator.maxTouchPoints > 1
				const isMobileUA = /mobile|android|iphone|ipad/.test(ua)
				const isMobilePlatform = /iphone|ipad|android|arm|aarch/.test(platform)

				// 실기기에서만 동작하도록 설정
				if(isTouch && hasTouchPoints && (isMobileUA || isMobilePlatform)) {
					const userInfo = store.state.user.userInfo || {}
					const userOS = window.$SMNATIVE.getOS('I') ? 'ios' : 'android'
					let appVer = ''
					// const appVer = userInfo.chnl === '385' ? await appService.getAppVersion() : await appService.cokBankGetAppVersion()
					if(userInfo.chnl === '385') {
						await appService.getAppVersion().then(response => {
							console.log('>>>> SB getAppVersion >>>> ', response)
							let result = response.result

							try { result = JSON.parse(response.result); } catch (e) { }

							appVer = result?.versionName || ''
						})
					} else {
						await appService.cokBankGetAppVersion().then(response => {
							console.log('>>>> CB cokBankGetAppVersion >>>> ', response)
							let result = response.result

							try { result = JSON.parse(response.result); } catch (e) { }

							appVer = result?.versionName || ''
						})
					}
					let chkVer = ''
					if(userOS === 'android') {
						if(userInfo.chnl === '385') {
							// AOS 스뱅
							chkVer = sttVerChk === '' ? constants.SB_AOS_APP_VERSION : sttVerChk
						} else {
							// AOS 콕뱅
							chkVer = sttVerChk === '' ? constants.COK_AOS_APP_VERSION : sttVerChk
						}
					} else {
						if(userInfo.chnl === '385') {
							// IOS 스뱅
							chkVer = sttVerChk === '' ? constants.SB_IOS_APP_VERSION : sttVerChk
						} else {
							// IOS 콕뱅
							chkVer = sttVerChk === '' ? constants.COK_IOS_APP_VERSION : sttVerChk
						}
					}
					// const appVer = '1.9.90'
					// const chkVer = '1.9.91'
					console.log('>>> OS >>> ', userOS)
					console.log('>>> 앱버전 >>> ', appVer, ' > ', chkVer)
					const versionChk = this.compareVersions(appVer, chkVer)
					console.log('>>> 앱체크 결과 >>> ', versionChk)
					
					if(!versionChk && !_.isEmpty(appVer)) {
						await modalService.alert("업데이트 필요!!!!", "", "확인").then(() => {
							const cokAosUrl = "https://play.google.com/store/apps/details?id=nh.smart.nhcok"
							const cokIosUrl = "https://apps.apple.com/kr/app/nh%EC%BD%95%EB%B1%85%ED%81%AC-%EB%86%8D%ED%98%91/id1131147442"
							const sbAosUrl = "https://play.google.com/store/apps/details?id=nh.smart.banking"
							const sbIosUrl = "https://apps.apple.com/kr/app/nh%EC%8A%A4%EB%A7%88%ED%8A%B8%EB%B1%85%ED%82%B9/id1444712671"

							if(userOS === 'android') {
								if(userInfo.chnl === '385') {
									// AOS 스뱅
									appService.openPassMarketUrl({marketUrl : sbAosUrl})
								} else {
									// AOS 콕뱅
									appService.cokBankOpenPassMarketUrl({marketUrl : cokAosUrl})
								}
								} else {
								if(userInfo.chnl === '385') {
									// IOS 스뱅
									appService.openPassMarketUrl({marketUrl : sbIosUrl})
								} else {
									// IOS 콕뱅
									appService.cokBankOpenPassMarketUrl({marketUrl : cokIosUrl})
								}
							}

							appService.moveMain()
						})
					}
				}
			},
			// v4 버전 비교
			compareVersions(appVer, chkVer) {
				const appList = appVer.split('.').map(Number)
				const chkList = chkVer.split('.').map(Number)

				for(let i=0; i<Math.max(appList.length, chkList.length); i++) {
					const appNum = appList[i] || 0
					const chkNum = chkList[i] || 0
					if(appNum < chkNum) {
						return false
					}
				}

				return true
			},
			fn_checkNhMobileCert() {
				if (window.location.host.indexOf('localhost') > -1) {
					this.nhMobileCertGbn = "2";
				} else {
					const params = {
						"RA_CERT_DCD" : "001",
						"RQST_CHNL_DCD": this.getUserInfo('chnl') === '385'? "NHSP" : "NHSB",
					};
		
					if(this.getUserInfo('chnl') === '385') { // 스뱅
						appService.checkNHCert(params).then(response => {
							console.log('>>>> SB checkNhMobileCert >>>> ', response)
							let result = response.result.result;
							// AOS는 파싱이 필요하고, IOS는 파싱이 불필요함
							// AOS는 될거고, IOS는 catch로 빠짐
							// 스뱅만 result로 한번 더 묶여 있음
							try { result = JSON.parse(response.result.result); } catch (e) { }
		
							if (response.result.resultCode === 0 ) {
								this.nhMobileCertGbn = "1";
								// modalService.alert("존재 > " + result.CUST_NAME);
							} else {
								// 실제 사용할때는 resultCode가 '1'면 모두 '인증서가 없습니다' 팝업으로 찍으세요~
								// modalService.alert("appService::(SB)checkNHCert error > " + result.msg);
							}
							
						});
					} else { // 콕뱅
						appService.cokBankCheckNHCert(params).then(response => {
							console.log('>>>> CB checkNhMobileCert >>>> ', response)
							let result = response.result;
							// AOS는 파싱이 필요하고, IOS는 파싱이 불필요함
							// AOS는 될거고, IOS는 catch로 빠짐
							try { result = JSON.parse(response.result); } catch (e) { }
		
							if ( response.resultCode == 0 ) {
									this.nhMobileCertGbn = "1";
								// modalService.alert("존재 > " + result.CUST_NAME);
							} else {
								// 실제 사용할때는 resultCode가 '1'면 모두 '인증서가 없습니다' 팝업으로 찍으세요~
								// modalService.alert("appService::(CB)checkNHCert error > " + result.msg);
							}
						});
					}
					
				}
			},
			getUuid() {
                if(this.getUserInfo('chnl') === '385') { // 스뱅
                    appService.getUuid().then(response => {
                        let result = response.result
                        // AOS는 파싱이 필요하고, IOS는 파싱이 불필요함
                        // AOS는 될거고, IOS는 catch로 빠짐
                        try { result = JSON.parse(response.result) } catch (e) { }

                        // modalService.alert("UUID > " + result.uuid)
						this.uuid = result.uuid
                    });
                } else { // 콕뱅
                    appService.cokBankGetUuid().then(response => {
                        let result = response.result
                        // AOS는 파싱이 필요하고, IOS는 파싱이 불필요함
                        // AOS는 될거고, IOS는 catch로 빠짐
                        try { result = JSON.parse(response.result) } catch (e) { }

                        // modalService.alert("UUID > " + result.uuid)
						this.uuid = result.uuid
                    });
                }
            },
			fn_getJWTNHCertToken() {
				if(this.uuid == '') {
					modalService.alert("UUID 선조회 필요")
				}

				const config = {
					url: "/co/ar/02r03",
					data: {
						uid: this.uuid.replaceAll('-', ''),
						chn: this.getUserInfo('chnl') === '385' ? '002' : '003'
					}
				}
				apiService.call(config).then(response => {
					console.log("response >> ", response)
					this.resCode = response?.resCode
					this.resMsg = response?.resMsg
					this.accessToken = response?.accessToken?.result?.accessToken
				})
			},
			fn_openNHCert() {
				const param = {
					"type": "AC",
					"": ""
				}
			},
			openSlideNHCertNoti() {
				const config = {
					renderer: {component: COAR4037},
					params: {}
				}
				modalService.openSlidePagePopup(config)
			},
			openSlideNHCertAgr() {
				const config = {
					renderer: {component: COAR4038},
					params: {}
				}
				modalService.openSlidePagePopup(config).then(response => {
					console.log('>>> response >> ', response)
				})
			},

		},
		components: {
		}
	}
</script>