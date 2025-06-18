<template>
<aside class="tabbar block" :class="getUserMode == 'S' ? 'senior' : getUserMode == 'C' ? 'youth' : ''">
		<!-- footer 2024 상호금융 NH콕마이데이터 4.0 추진 개발 UI-CO-layout.html -->
		<!-- 마케팅 팝업 : 메인에만 노출 -->
		<div class="marketing_popup_box" v-if="bannerList.length > 0" >
			<div aria-hidden="false" class="marketing_popup_inner" id="slide_popup_02">
				<div class="popup_content">
					<!-- case 1 : popup 다건 -->
					<div id="slider_01" class="slider_wrap">
						<div class="tab_cont">
							<div role="tabpanel" class="cmm-tab-panel">
								<a href="#nolink" role="button" @click.prevent="">
									<div class="slide slide02">	
										<img src="@/assets_v40/images/event/2023/img_slide_openevent2023.png" alt="" />
										<p>새로워진 콕마이데이터</p>
										<strong>웰컴백 이벤트</strong>
									</div>
								</a>
							</div>
							<div role="tabpanel" class="cmm-tab-panel">
								<a href="#nolink" role="button" @click.prevent="">
									<div class="slide slide01">
										<img src="@/assets_v40/images/newmain/img/img_slide_img01_2023.png" alt="" />
										<p>신차 견적내고</p>
										<strong class="co">대출까지 바로받자~</strong>
									</div>
								</a>
							</div>
						</div>
					</div>
					<!-- case 2 : popup 다건 -->
					<!--<div id="slider_01" class="slider_wrap slider_solo">
						<div class="tab_cont">
							<div role="tabpanel" class="cmm-tab-panel">
								<a href="#nolink" role="button">
									<div class="slide slide01">
										<img src="../../../../src/assets_v40/images/newmain/img/img_slide_img01.png" alt="" />
										<p>신차 견적내고 대출까지 바로!</p>
										<button type="button">바로가기</button>
									</div>
								</a>
							</div>
						</div>
					</div>-->
				</div>
				<a href="#nolink" class="btn_close"><span class="blind">닫기</span></a>
			</div>
		</div>
		<!--// 마케팅 팝업 : 메인에만 노출 -->

		<!--toolbar-->
		<nav>
			<!-- 큰글모드 -->
			<ul v-if="getUserMode == 'S'">
				<li :class="{on:isMainPage}"><a href="javascript:void(0);" @click.prevent="movePage('MAMA4S01')" :title="isMainPage ? '선택됨' : ''">홈</a></li>
				<li :class="{on:isActiveTab('as')}"><a href="javascript:void(0);" @click.prevent="movePage('ASTA4S01')" :title="isActiveTab('as') ? '선택됨' : ''">자산</a></li>
				<li :class="{on:isActiveTab('lc')}"><a href="javascript:void(0);" @click.prevent="movePage('LCTA4S01')" :title="isActiveTab('lc') ? '선택됨' : ''">지출</a></li>
				<li :class="{on:isActiveTab('pd')}"><a href="javascript:void(0);" @click.prevent="movePage('PDTA4S01')" :title="isActiveTab('pd') ? '선택됨' : ''">연금/절세</a></li>
			</ul>
			<!-- 청소년모드 -->
			<ul v-else-if="getUserMode == 'C'">
				<li :class="{on:isMainPage}"><a href="javascript:void(0);" @click.prevent="movePage('MAMA4C01')" :title="isMainPage ? '선택됨' : ''">홈</a></li>
				<!-- <li :class="{on:isActiveTab('as')}"><a href="javascript:void(0);" @click.prevent="movePage('ASTA4C01')" :title="isActiveTab('as') ? '선택됨' : ''">자산</a></li>
				<li :class="{on:isActiveTab('lc')}"><a href="javascript:void(0);" @click.prevent="movePage('LCTA4C01')" :title="isActiveTab('lc') ? '선택됨' : ''">지출</a></li> -->
				<li :class="{on:isActiveTab('as')}"><a href="javascript:void(0);" @click.prevent="openModalPopup('ASTA4C02')" :title="isActiveTab('as') ? '선택됨' : ''">자산</a></li>
				<li :class="{on:isActiveTab('lc')}"><a href="javascript:void(0);" @click.prevent="openModalPopup('LCTA4C02')" :title="isActiveTab('lc') ? '선택됨' : ''">지출</a></li>
			</ul>
			<!-- 일반모드 & 미가입자 -->
			<ul v-else>
				<li :class="{on:isMainPage}"><a href="javascript:void(0);" @click.prevent="movePage('MAMA4001')" :title="isMainPage ? '선택됨' : ''">홈</a></li>
				<li :class="{on:isActiveTab('as')}"><a href="javascript:void(0);" @click.prevent="movePage('ASTA4001')" :title="isActiveTab('as') ? '선택됨' : ''">자산</a></li>
				<li :class="{on:isActiveTab('lc')}"><a href="javascript:void(0);" @click.prevent="movePage('LCTA4001')" :title="isActiveTab('lc') ? '선택됨' : ''">지출</a></li>
				<li :class="{on:isActiveTab('pd')}"><a href="javascript:void(0);" @click.prevent="movePage('PDTA4001')" :title="isActiveTab('pd') ? '선택됨' : ''">연금/절세</a></li>
				<li :class="{on:isActiveTab('an')}"><a href="javascript:void(0);" @click.prevent="movePage('RETA4001')" :title="isActiveTab('an') ? '선택됨' : ''">추천</a></li>
			</ul>
		</nav>
	</aside>

</template>

<script>
	import commonService from '@/service/commonService'
	import apiService from '@/service/apiService'
	import appService from '@/service/appService'
	import modalService from '@/service/modalService'
	import {dateFormat} from '@/utils/date'
	
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

	import {mapGetters, mapActions} from 'vuex'
	import {defineAsyncComponent} from 'vue'

	import mama2009 from '@/views/page/MA/MA/MAMA2009/MAMA2009'		//마케팅 배너 V2

	export default {
		name: 'FootersV2',
		data: () => {
            return {
				isOpenMenu    : false,	//footer menu open
				isCloseMenu   : false,  //footer menu close
				menuId        : "",
				paramMenuId   : "",
				anwAncYn      : "", 
				isShowAllMenu : false,	// all menu open

				bannerList  : [],       // 마케팅배너 목록
			}
		},
		props: {
			type: {
				type: String,
				default: ''
			},
			// mktBannerYN: { //마케팅배너 출력여부
			// 	type: String,
			// 	default: 'N'
			// }
		},
        mixins: [
            commonMixin,
            popupMixin
        ],
		computed : {
			...mapGetters('layout', [
				'isMainPage','isAlreadyOpenMainPage'
			]),				
			...mapGetters('user', [
				'isMacoYn', // 조합원 여부
				'isMacoAuthYn', //조합원 권한여부
			]),
			...mapGetters('user', [
				'isSBank', 'getUserMode'
			]),
			serviceType(){
				return import.meta.env.VITE_ENV
			}
		},
		created() {
			this.isOpenMenu = false	//footer menu open
			this.isCloseMenu = false //footer menu close
		},
		mounted() {
			const userMode = this.getScrmode()?.mode || 'N'
			this.setUserMode(userMode)

			this.paramMenuId = this.type || ""	//현재 화면ID (default)

			// if (this.mktBannerYN == 'Y') this.getMktBannerData() // 마케팅배너 조회
        },
		methods: {
			...mapActions('user', [
				'setUserMode'
			]),
			/**
             * 신규알람 체크
             */
            fn_newAlarm(){
                const config = {
                    url: '/co/co/00r06', // /co/co/00r02
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
					},
					disableLoading : true,
                }
                apiService.call(config).then(response =>{
                    this.anwAncYn = response.anwAncYn
                })
			},
			/**
			 * 메뉴 클릭 (네이티브 메뉴)
			 */
			fn_toggleNativeMenu() {
				//appService.showMenu()
				//임시로 로그아웃으로 변경 처리
				// if(import.meta.env.VITE_ENV !== 'R'){ // 'D':개발, 'T':테스트, 'R':운영
				// 	//임시로 로그아웃으로 변경 처리
				// 	sessionStorage.clear()
				// 	location.replace('/login.html')
				// } else {
				// 	appService.showMenu()
				// }

				// 'D':개발, 'T':테스트, 'R':운영
				// 개발환경이고 로컬일 경우만 로그인 페이지처리 2021-11-02
				if (import.meta.env.VITE_ENV !== 'R' && window.location.host.indexOf('localhost') > -1 )
				{
					//임시로 로그아웃으로 변경 처리
					sessionStorage.clear()
					location.replace('/login.html')
				}else{
					appService.showMenu()
				}
			},
			/**
			 * 알림함이동
			 */
			fn_openAlramPopup() {
				if(this.menuId !== "") {
					this.fn_closeSubMenu()
				}

				// const config = {
				// 	component: COCO1101
				// }
				// modalService.(() => {
				// 	this.fn_newAlarm()
				// })

			},

			/*
			* FOOTER 메뉴 열기
			*/
			fn_showSubMenu(menuId) {

				if(this.menuId !== menuId) {
					// 알림카운트 호출
					this.fn_newAlarm()
				}
				
				//메뉴세팅
				this.menuId = menuId
				this.paramMenuId = ""	//현재 화면ID clear
				this.isOpenMenu = true	//footer menu 오픈여부(한번이라도 오픈이면 true)
				this.isCloseMenu = false

				$('.footer-wrap').show()
				setTimeout(function(){
					$('.footer-contents').attr('tabindex',0).focus()
				}, 100)

				this.fn_callWebAccess("SubMenu", true)
			},

			/*
			* FOOTER 메뉴 닫기
			*/
			fn_closeSubMenu(initMenu) {

				this.isCloseMenu = true
				this.menuId = ""

				//footer 선택메뉴 display

				if(initMenu !== undefined) {
					this.paramMenuId = initMenu
				} else {
					this.paramMenuId = this.type || ""	//화면ID값 default set
				}

				$('.footer-wrap').fadeOut(300)

				this.fn_callWebAccess("SubMenu", false)
			},

			/*
			* FOOTER > 대분류 > 중분류 클릭. 화면이동
			*/
			movePage(pageId) {
				//메뉴 닫기
				// this.fn_closeSubMenu(this.menuId)
				
				// 일반/미가입자 footer 공유로 인해 모드별 분기처리
				if(this.getUserMode === 'U') {
					switch(pageId) {
						case 'MAMA4001':
							pageId = 'MAMA4U01'
							break
						case 'ASTA4001':
							pageId = 'ASTA4U01'
							break
						case 'LCTA4001':
							pageId = 'LCTA4U01'
							break
						case 'PDTA4001':
							pageId = 'PDTA4U01'
							break
						case 'RETA4001':
							this.openModalPopup('COTP0004') // 미가입자 가입필요 팝업
							return
							break
						default:
							pageId = 'MAMA4U01'
							break
					}
				}

				console.log("move page id : "+pageId);
				
				const config = {
					name: pageId
				}
				commonService.movePage(config)	//페이지이동
			},

			/*
			* 전체메뉴 이벤트 리턴
			*/
			callAllMenuCloseMRMR2001(param){
				this.isShowAllMenu = false
				$('.allmenu-wrapper .ios,.com_btn_area.all_Menu').fadeToggle(300)
				$('.custom_footer .allmenu-wrapper').removeClass('on');

				//접근성처리
				this.fn_callWebAccess("AllMenu", false)

				if (param !== undefined && param !== null) {
					let pageType = param.pageType || ""
					let pageId   = param.pageId || ""

					if(pageType === "PAGE") {

						const config = {
							name: pageId
						}
						commonService.movePage(config)

					} else if(pageType === "POPUP") {
						this.openModalPopup(pageId)
					}
				}
			},

			/*
			* 전체메뉴 오픈
			*/
			openMenuPage() {
				// if(this.menuId !== "") {
				// 	this.fn_closeSubMenu()
				// }

				this.isShowAllMenu = true

				//알람호출
				// this.$refs.mrmr1001.fn_newAlarm()

				//PFM로그 처리 화면접속이력 등록 POST
				apiService.pfmLogSend('MRMR2001')
				
				this.openModalPopup('MRMR2001')

			},

			openModalPopup(pageId) {
				let compName = ""
				console.log(pageId)
				if(pageId === "COCO1104") {
					compName = defineAsyncComponent(() => import('@/views/page/CO/CO/COCO1104/COCO1104'))	//새소식
				} else if(pageId === "MRCA4001") { // COCO1102
					// compName = MRCA4001 // COCO1102	// 서비스 해지
				} else if(pageId === "COCO1116") {
					compName = defineAsyncComponent(() => import('@/views/page/CO/CO/COCO1116/COCO1116'))	//자주하는질문
				} else if(pageId === "COCO2128") {
					compName = defineAsyncComponent(() => import('@/views/page/CO/CO/COCO2128/COCO2128'))	// 숨김내역 조회
				} else if(pageId === "COAT1103") {
					compName = defineAsyncComponent(() => import('@/views/page/CO/AT/COAT1103/COAT1103'))	//개인정보처리방침
				} else if(pageId === "COAT1104") {
					compName = defineAsyncComponent(() => import('@/views/page/CO/AT/COAT1104/COAT1104'))	//제3자제공동의
				} else if(pageId === "MRAT4001") {
					compName = defineAsyncComponent(() => import('@/views/page/MR/AT/MRAT4001/MRAT4001')) // 이용약관
				} else if(pageId === "ASCR4101") {
					compName = defineAsyncComponent(() => import('@/views/page/AS/CR/ASCR4101/ASCR4101'))	// 신용정보 조회
				} else if(pageId === "COCO1130") {
					compName = defineAsyncComponent(() => import('@/views/page/CO/CO/COCO1130/COCO1130'))	// 프로필
				} else if(pageId === "MRCO1003") {
					compName = defineAsyncComponent(() => import('@/views/page/MR/CO/MRCO1003/MRCO1003'))	// 마이데이터 서비스소개
				} else if(pageId === "MRCO1001") {
					compName = defineAsyncComponent(() => import('@/views/page/MR/CO/MRCO1001/MRCO1001'))   // 알림함(tobe)
				} else if(pageId == "COTP0004") {
					compName = defineAsyncComponent(() => import("@/views/page/CO/TP/COTP0004/COTP0004"))	// 미가입자 가입필요 팝업		
				} else if(pageId == "ASTA4C02") {
					compName = defineAsyncComponent(() => import("@/views/page/AS/TA/ASTA4C02/ASTA4C02"))	// 청소년 나의자산 소개
				} else if(pageId == "LCTA4C02") {
					compName = defineAsyncComponent(() => import("@/views/page/LC/TA/LCTA4C02/LCTA4C02"))	// 청소년 나의지출 소개
				}

				const config = {
					component: compName,
				}
				modalService.openPopup(config).then(() => {})
			},
			isActiveTab() {
				let ret = false
				for (let i = 0; i < arguments.length; i++) {
					ret = (this.menuId == arguments[i] || this.paramMenuId == arguments[i])
					if (ret) break;
				}
				return ret
			},
			/*
			 * 마케팅배너 조회
			 */
			getMktBannerData() {
				console.log('getMktBannerData #### ', this.getUserInfo('chnl'))
				const config = {
					url: '/ma/ma/03ra1', // 인터페이스ID: IF-MOB-PFM-MAA03, 서비스코드: PFMMAMA03RA1
					data: {
						"chanDsc": this.getUserInfo('chnl') == '385' ? '001' : '002', // 001: 스마트뱅크, 002: 콕뱅크
					},
					disableLoading : true,
				}
				apiService.call(config).then(response =>{
					let bannerList = response.bannerList || []
					this.bannerList = this.getListFilter(bannerList)

                    console.log('bannerListbannerListbannerListbannerListbannerListbannerList : ', bannerList)
					// console.log('bannerList1', JSON.parse(JSON.stringify(response.bannerList)))
					// console.log('bannerList2', JSON.parse(JSON.stringify(this.bannerList)))

					this.$nextTick(()=>{
						if (this.bannerList.length > 0) this.$refs.mama2009.setData(this.bannerList)
					})

				})
			},
			/*
			 * 마케팅배너 목록 필터
			 */
			getListFilter(bannerList) {
				let isExists = false
				let item = null
				let subItem = null
				let retList = []
				let basYmd = dateFormat(new Date(), "YYYYMMDD")
				let clickedList = commonService.getStorage('mktBanner' + this.getUserInfo('chnl'))
				if (!Array.isArray(clickedList)) clickedList = []
				
				for (let i = 0; i < bannerList.length; i++) {
					item = bannerList[i]
					isExists = false
					for (let j = 0; j < clickedList.length; j++) {
						subItem = clickedList[j]
						if (item.chanDsc == subItem.chanDsc && item.bnnrExpsDsVal == subItem.bnnrExpsDsVal && item.bnnrSqno == subItem.bnnrSqno && basYmd == subItem.savedDate) {
							isExists = true
							break;
						}
					}

					if (!isExists) retList.push(item)
				}

				return retList
			},
		},
		components: {
			// mrmr1001,
			mama2009
		},
	}
</script>