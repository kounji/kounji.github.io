<template>
	<div>
		<p><button @click="test">Test</button></p>
		<p><button @click="alerts">alert</button></p>
		<p><button @click="confirm">confirm</button></p>
		<p><button @click="openModalFull">open modal (full)</button></p>
		<p><button @click="openModalGround">open modal (ground)</button></p>
		<p><button @click="selectModalCode">select Modal (코드사용)</button></p>
		<p><button @click="selectModalList">select Modal (하드코딩)</button></p>
		<p><button @click="openModalMonthCalendar">마이농가 월 달력</button></p>
		<p><button @click="openModalCertList">공인인증서 목록</button></p>
		<a href="#" @click.prevent="test">접근성 모달</a>
		<a href="#" class="view-btn" @click.prevent="test"><p class="tit">인덕원푸르지오엘센트로</p></a>
		<p><button @click="openToast">toast</button></p>
		<div>
			<h2>Json Viewer</h2>
			<p><button @click="turnOnLoad">turn on log</button></p>
			<p><button @click="turnOffLoad">turn off log</button></p>
			<p><button @click="clearJson">clearJson</button></p>
			<p><button @click="openModalJsonViewer">Json Viewer</button></p>
		</div>
		<h1></h1>
		<p><button @click="openModalASAC03">순자산예금입출금</button></p>
		<br>
		<span>=========== TO-BE 팝업 (2025) ============</span>
		<p><button @click="openSlideNHCertNoti">NH모바일인증서 미보유 안내 슬라이드</button></p>
		<br>
		<p><button @click="openSlideNHCertAgr">NH모바일인증서 약관동의 슬라이드</button></p>
		<span>=========== TO-BE 팝업 (2021) ============</span>
		<p><button @click="openSlideCOAR2011">공동인증서 약관동의 슬라이드</button></p>
		<br>
		<p><button @click="openSlidePagePopup">슬라이드페이지팝업</button></p>
		<p><button @click="openSlidePagePopupWithComponent">슬라이드페이지-계좌-대출상품컴퍼넌트</button></p>
		<p><button @click="openMonthPop">기간설정 슬라이드</button></p>
		<p><button @click="openSlideMonthPop">년월선택 슬라이드</button></p>
		<p><button @click="openSlideMonthPopLimit">년월선택 선택 제한 슬라이드(현재월이하 ~기간월까지)</button></p>
		<p><button @click="openSlideMonthPopLimitExceptCurrentYm">년월선택 선택 제한 슬라이드(현재월미포함 ~기간월까지)</button></p>
		<p><button @click="openSlideYearPop">년선택 슬라이드</button></p>
		<p><button @click="openSlidePagePopupASCR0008">슬라이드페이지-신용정보도움말</button></p>
		<p><button @click="openSlidePagePopupLCFD0004">슬라이드페이지-수입지출카테고리</button></p>
		<p><button @click="openSlidePagePopupLCFD0005">팝업-수입지출카테고리수정</button></p>
		<br>
		<span>=========== 개인인증 팝업 ============</span>
		<br>		
		<p ref="personalAuth"><button @click="openModalPersonalAuth" >개별인증모달팝업</button></p>
	</div>
</template>

<script>
	import modalService from '@/service/modalService'
	// import scrapingService from '@/service/scrapingService'
	// import NormalPopup from '@/views/popup/XX/sample/NormalPopup'
	// import UISZ0104 from '@/views/popup/XX/sample/UISZ0104'
	import SelectPopupCardRenderer from '@/components/renderer/SelectPopupCardRenderer'
	// import JsonViewerPopup from '@/views/popup/XX/sample/JsonViewerPopup'
	import constant from '@/common/config/constants'
	// import ACAS0003 from '@/views/popup/XX/sample/ACAS1103'
	// import SZFC0013P01 from '@/views/page/SZ/FC/SZFC2113/SZFC0013P01'
	import COCO0024 from '@/views/page/CO/CO/COCO1124/COCO1124'
	import IframePopup from '@/views/popup/common/IframePopup'
	// import ASCR0008 from '@/views/page/AS/CR/ASCR0008/ASCR0008'
	// import LCFD0004 from '@/views/page/LC/FD/LCFD0004/LCFD0004'
	// import LCFD0005 from '@/views/page/LC/FD/LCFD0005/LCFD0005'
	import COAR2011 from '@/views/page/CO/AR/COAR2011/COAR2011'
	import COAR4037 from '@/views/page/CO/AR/COAR4037/COAR4037'
	import COAR4038 from '@/views/page/CO/AR/COAR4038/COAR4038'

	export default {
		name: 'SampleModal',
		data: function() {
			return {
				html: `<span>XX</span>`,
				json: {
					bankList: [
						{value:'kbank', label:'K뱅크'},
						{value:'kbstar', label:'국민은행'},
						{value:'kdb', label:'산업은행'},
						{value:'wooribank', label:'우리은행'},
						{value:'ibk', label:'기업은행'},
						{value:'standardchartered', label:'SC은행'},
						{value:'citibank', label:'한국씨티은행'},
						{value:'hanabank', label:'KEB하나은행'},
						{value:'dgb', label:'대구은행'},
						{value:'suhyupbank', label:'수협중앙회'},
						{value:'busanbank', label:'부산은행'},
						{value:'nonghyup', label:'농협은행'},
						{value:'kjbank', label:'광주은행'},
						{value:'jejubank', label:'제주은행'},
						{value:'kfcc', label:'새마을금고중앙회'},
						{value:'jbbank', label:'전북은행'},
						{value:'cu', label:'신협중앙회'},
						{value:'knbank', label:'경남은행'},
						{value:'epostbank', label:'우체국'},
						{value:'shinhan', label:'신한은행'},
					],
				}
			}
		},
		beforeMount(){

		},
		mounted() {
			//자동 팝업 만들기
			//const button = this.$refs.personalAuth.querySelector("button")
			//if(button) button.click()
		},
		methods: {
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

			openSlideCOAR2011() {
				const config = {
					renderer: {component: COAR2011},
					params: {}
				}
				modalService.openSlidePagePopup(config)
			},


			openModalJsonViewer() {
				alert('open json viewer')
				// const config = {
				// 	component: JsonViewerPopup,
				// 	params: {
				// 		json: scrapingService.getScrapingLog()
				// 	}
				// }
				// modalService.openPopup(config).then(response => {
				// 	console.log(response)
				// })
			},
			clearJson() {
				alert('clearJson')
				sessionStorage.setItem('log', null)
			},
			turnOnLoad() {
				alert('log debug true')
				sessionStorage.setItem('logDebug', 'true')
			},
			turnOffLoad() {
				alert('log debug false')
				sessionStorage.setItem('logDebug', 'false')
			},

			test() {
				// const config = {
				// 	component: NormalPopup,
				// 	params: { // 파라미터
				// 		accrNo: '100200'
				// 	}
				// }
				// modalService.openPopup(config).then(response => {
				// 	console.log(response)
				// })
			},
			alerts() {
				// 기본
				// modalService.alert('content')

				const config = {
					content: ['등록한 정보는 저장되지 않습니다','정말로 취소하시겠습니까?'],
					title: "",
					buttons: [{text: constant.ALERT_CONFIRM_TEXT, class: 'btn btn_mint btn_no'}],
				}
				//
				modalService.alert(config)

				// 버튼명 변경
				// modalService.alert('title', 'content', 'button name')
			},
			confirm() {
				
				//기존 수정 20210510
				//modalService.confirm('content', 'title').then(text => {

				const config = {
					content: ['등록한 정보는 저장되지 않습니다','정말로 취소하시겠습니까?'],
					title  : "",
				}
				// 기본
				modalService.confirm(config).then(text => {
					// text = 확인버튼 누르면 '확인' -> 예
					// text = 취소버튼 누르면 '취소' -> 아니오
					if (text === constant.ALERT_CONFIRM_TEXT) {
						// ....
					}
					console.log(text)
				})
			},
			openModalFull() {
				// console.log('------', event)
				// const config = {
				// 	component: NormalPopup,
				// 	params: { // 파라미터
				// 		accrNo: '100200'
				// 	}
				// }
				// modalService.openPopup(config).then(response => {
				// 	console.log(response)
				// })
			},
			openModalGround() {
				// const config = {
				// 	component: NormalPopup,
				// 	params: { // 파라미터
				// 		accrNo: '100200'
				// 	}
				// }
				// modalService.openPopup(config).then(response => {
				// 	console.log(response)
				// })
			},
			selectModalCode() {
				const config = {
					params: {
						title: '기관 선택',
						code: '0051', // 기관구분코드
						selectVal: '20'
					},
				}
				modalService.openSelect(config).then(response => {
					console.log(response)
				})
			},
			selectModalList() {
				const config = {
					params: {
						title: '금종류 선택',
						list: [
							{comnCnm:'GOLD(24K)', comnCId: '', value: 'value1'},
							{comnCnm:'GOLD(18K)', comnCId: '', value: 'value2'},
							{comnCnm:'GOLD(14K)', comnCId: '', value: 'value3'},
							{comnCnm:'백금(PLATINUM)', comnCId: '', value: 'value4'},
						],
						selectVal: '20'
					},
					renderer: {
						component: SelectPopupCardRenderer,
						labelFiled: 'comnCnm',
						valueField: 'value'
					}
				}
				modalService.openSelect(config).then(response => {
					console.log(response)
				})
			},
			openModalMonthCalendar() {
				// const config = {
				// 	component: UISZ0104,
				// 	params: {
				// 		accrNo: '100200'
				// 	}
				// }
				// modalService.openPopup(config).then(response => {
				// 	console.log(response)
				// })
			},
			openModalCertList() {
				// const config = {
				// 	component: UISZ0104,
				// 	params: {
				// 		accrNo: '100200'
				// 	}
				// }
				// modalService.openPopup(config).then(response => {
				// 	console.log(response)
				// })
			},
			openToast() {
				// this.$store.dispatch('modal/addLoading')
				modalService.toast('업데이트 중입니다.')
				setTimeout(() => {
					modalService.toast('업데이트 중입니다.222')
				}, 1000)
			},
			openModalASAC03() {
				// console.log('------', event)
				// const config = {
				// 	component: ACAS0003,
				// 	params: { // 파라미터
						
				// 	}
				// }
				// modalService.openPopup(config).then(response => {
				// 	console.log(response)
				// })
			},
			openSlidePagePopup() {
				// const config = {
				// 	params: {
				// 		title: '재배지 수정',
				// 	},
				// 	renderer: {
				// 		component: SZFC0013P01
				// 	}
				// }
				// modalService.openSlidePagePopup(config).then(response => {
				// 	console.log(response)
				// })
			},
			openSlidePagePopupWithComponent() {

				const contentData1 = [{'goodsCode':'A001', 'goodsName':'대출상품A001', 'goodsPrice':100000, 'checked':true},
										{'goodsCode':'A002', 'goodsName':'대출상품A002', 'goodsPrice':200000, 'checked':true},
										{'goodsCode':'A003', 'goodsName':'대출상품A003', 'goodsPrice':300000, 'checked':false},
										{'goodsCode':'A004', 'goodsName':'대출상품A004', 'goodsPrice':400000, 'checked':false},
										{'goodsCode':'A005', 'goodsName':'대출상품A005', 'goodsPrice':500000, 'checked':false},]

				const contentData2 = [{'goodsCode':'B001', 'goodsName':'현대해상 운전자보험','checked':true},
										{'goodsCode':'B002', 'goodsName':'교보생명 운전자보험', 'checked':false},
										]
								
				const config = {
					params: {
						title: '대출상품선택',
					},
					renderer: {
						component: COCO0024,
						
						cdata : {"title":'대출/보험선택',
								"contentList":[
												{'contentGubn':'01', 
												'contentTitle':'대출선택',
												'contentData':contentData1,
												},
												{'contentGubn':'02', 
												'contentTitle':'운전자보험선택', 
												'contentData':contentData2,
												}
												]
								}
						
						/*
							cdata : {"title":'대출/보험선택',
												"contentList":[
																				{'contentGubn':'01', 
																				'contentTitle':'대출선택',
																				'contentData':[],
																				},]
										}
										*/
					}
				}

				console.log(contentData1, contentData2)
				
				modalService.openSlidePagePopup(config).then(response => {
					console.log(response)
				})
			},			
			openMonthPop() {
				//new Date().toJSON().slice(0,10).replace(/-/g,''),
				const config = {
					params: {
						title: '기간 선택',
						startDate : '20210101',
						endDate : '20210429'
					},
				}
				modalService.openSelectMonth(config).then(response => {
					console.log(response)			
				})
			},
			openSlideMonthPop(){
				const config = {
					params: {
						title: '년월 선택',
						yyyymm : '202105',
					},
				}
				modalService.openSlideSelectMonth(config).then(response => {
					console.log(response)
				})
			},
			openSlideMonthPopLimit(){
				const config = {
					params: {
						title: '년월 선택',
						yyyymm : '202106',
						limit  : 12,
					},
				}
				modalService.openSlideSelectMonth(config).then(response => {
					console.log(response)		
				})
			},
			openSlideMonthPopLimitExceptCurrentYm(){
				const config = {
					params: {
						title: '년월 선택',
						yyyymm : '202106',
						limit  : 12,
						includeCurYm : 'N'
					},
				}
				modalService.openSlideSelectMonth(config).then(response => {
					console.log(response)		
				})
			},							
			openSlideYearPop() {
				const config = {
					params: {
						title: '년도 선택',
					},
				}
				modalService.openSlideSelectYear(config).then(response => {
					console.log(response)			
				})
			},			
			openModalPersonalAuth(){
				// console.log('------', event)
				const config = {
					component: IframePopup,
					params: { // 파라미터
						title : '개별인증',
						url: 'https://pfm.nonghyup.com?req_id=dfc72149-d583-446f-ad0a-523fe1b15bd9&org_code=I1AAAZ0000&response_type=code&client_id=Qv3zzfYoAMYMXbdc0zkWvOaevq9a5Isy&redirect_uri=https%3A%2F%2Fdevelopers.mydatakorea.org%2Fmdtb%2Ftbd%2Ftts%2Fbas%2Fcallback&app_scheme=https%3A%2F%2Fdevelopers.mydatakorea.org%2Fmdtb%2Ftbd%2Ftts%2Fbas%2Fcallback&state=2222222222&user_ci=Yp%2FsCHjB+RcwE1ZtWvxXFPK1RZsxpTVGq+0LiWv70rNFRNAjSmgMMjl3SyKnuQH4Dq8SdnqGkLQkC99CFNSE7w%3D%3D&mydt_cusno=20210602131419&serial_no=202106020000054&rcv_org_code=ZVAAAZ0000'
					}
				}
				modalService.openPopup(config).then(response => {
					console.log(response)
				})
				//window.open("https://pfm.nonghyup.com/?req_id=d9282baf-db94-4b9e-8bdb-836e3b6a6c33&org_code=9876543210&response_type=code&client_id=Qv3zzfYoAMYMXbdc0zkWvOaevq9a5Isy2&redirect_uri=https%3A%2F%2Fpfm.nonghyup.com%2Fcallback.html&app_scheme=app_scheme&state=345567678&x_user_ci=x_user_ci&mydt_cusno=PV20210524161936&serial_no=test-serial-no", "blank")
			},			
			openSlidePagePopupASCR0008() {
				// const config = {
				// 	params: {
				// 		title: '신용정보도움말',
				// 	},
				// 	renderer: {
				// 		component: ASCR0008
				// 	}
				// }
				// modalService.openSlidePagePopup(config).then(response => {
				// 	console.log(response)
				// })
			},
			openSlidePagePopupLCFD0004() {
				// const config = {
				// 	params: { // 파라미터
				// 			title 		 : "자산카테고리",
				// 	},
				// 	renderer: {
				// 		component: LCFD0004,
				// 		cdata    : {
				// 					title 		 : "자산카테고리",
				// 					asetCtgrLclc : "1" ,	//자산카테고리대분류코드 1:지출, 2:마이농가
				// 					asetCtgrDsc  : "2"		//자산카테고리구분코드   1:수입, 2:지출, 3:이체
				// 					}
				// 	}
				// }

				// modalService.openSlidePagePopup(config).then(response => {
				// 	console.log(response)
				// })
			},
			openSlidePagePopupLCFD0005() {
				// const config = {
				// 	component: LCFD0005,
				// 	params: { // 파라미터
				// 		title : '자산카테고리',
				// 		asetCtgrLclc : "1" ,	//자산카테고리대분류코드 1:지출, 2:마이농가
				// 		asetCtgrDsc  : "2"		//자산카테고리구분코드   1:수입, 2:지출, 3:이체
				// 	}
				// }

				// modalService.openPopup(config).then(response => {
				// 	console.log(response)
				// })
			},				
		},
		components: {
		}
	}
</script>