<template>
	<header id="header" v-show="isOpenCheck">
		<!-- 모드변경 토글 -->
		<div class="mode_toggle" v-if="isMainPage && getUserMode != 'C'" v-show="pageName != 'COGU4001' && pageName != 'COGU4C01'">
			<input type="checkbox" title="모드선택" id="head_toggle" :checked="getUserMode == 'S'" @change="setChangeMode($event)">
			<label for="head_toggle">큰글</label>
		</div>
		<!-- 미가입, 일반, 큰글 메인 타이틀 없음 // 청소년 메인 타이틀 별도 분기 -->
		<h1 v-if="getUserMode == 'C' && isMainPage">부모님을 위한 청소년모드 <em class="point">미리보기</em></h1>
		<h1 v-else>{{ !isMainPage ? pageTitle : '' }}</h1>
		<button v-show="!isMainPage" type="button" class="prev" @click.prevent="movePrev"><span class="blind">이전</span></button>
		<div class="option" v-show="pageName != 'COGU4001' && pageName != 'COGU4C01'">
			<!-- <a v-show="cbtType" style="color: red;">디지털 전환용</a> -->
			<button v-show="isMainPage" type="button" class="bank" :class="userInfo.chnl === '385' ? 'sbank' : ''" @click.prevent="moveHome()">
				<span class="blind">{{userInfo.chnl === '385' ? '스마트뱅크': '콕뱅크'}}</span>
			</button>
			<!-- 큰글모드, 청소년모드, 미가입자 돋보기 hide -->
			<!-- 일반모드일 경우만 돋보기 show -->
			<button v-show="!isMainPage && getUserMode == 'N'" type="button" class="search" @click.prevent="fn_openPopup('COCO4301')">
				<span class="blind">검색</span>
			</button>
			<button v-show="isAllMenu && pageName == 'MRMR4001'" type="button" class="alert" :class="getNewAlarm == 'Y' ? 'new' : ''" @click.prevent="fn_openPopup('MRCO1001')">
				<span class="blind">알림</span>
			</button>
			<button v-show="!isAllMenu" type="button" class="menu" @click.prevent="goAllMenu()">
				<span class="blind">전체메뉴</span>
			</button>
		</div>
	</header>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'
	import apiService from '@/service/apiService'
	import appService from '@/service/appService'
	import routerService from '@/service/routerService'
	import commonService from '@/service/commonService'
	import modalService from '@/service/modalService'
	import commonMixin from '@/common/mixins/commonMixin'

	import {defineAsyncComponent} from 'vue'

	export default {
		name: 'HeadersV4',
		data: function() {
			return {
			}
		},
		computed: {
			...mapGetters('user', [
				'isLoginSuccess', // 로그인 성공 여부
				'isSBank',        // 스뱅, 콕뱅 여부 
				'userInfo',
				'getUserMode',
				'getNewAlarm'
			]),
			...mapGetters('layout', [
				'pageTitle',
				'pageName',
				'isMainPage',
				'isAllMenu',
				'isFirstPage',
				'pageList',
				'pageInfo'
			]),
			...mapGetters('myassets', [
				'nacfAccChg'
      		]),
			isExcludePage() {
				const list = [
					'COAS2010',	// 가입완료
					// 'COAS0010',	// 재동의완료
					'COCO1125', // 서비스 장애
					'COCO1114', // APP   오류
					'COCO1115', // 서비스 오류
					'COCO1126', // 서비스 점검

					'IC0001',		//기능적합성심사-메인
					'EXCOAS0010',	//기능적합성심사-가입완료
				]

				return list.includes(this.pageName)
			},
			isOpenCheck() {
				// 마이데이터 오픈 안내 페이지 진입 여부
				return this.pageInfo?.name !== 'COCO4118' ? true : false
			},
			isExistPageList() {
				return this.pageList.length > 0 ? true : false
			},
			isMenuShow(){
				return true
			},
			cbtType(){
				return this.getUserInfo('tobeType')
			},
		},
		watch: {
			// 모드별 통합메인 진입 시 처리
			isMainPage(value) {
				if(this.getUserInfo('ltrmUnconn') === 'Y' && !!value) {
					this.addLtrmUnconn()
					delete this.userInfo.ltrmUnconn
				}
			},
		},
		mixins: [
			commonMixin
		],		
		methods: {
			...mapActions('modal', [
				'addLtrmUnconn',
			]),
			...mapActions('layout', [
				'setMainTabLastIdx'
			]),
			...mapActions('myassets', [
				'getAllMyAssetInfo'
			]),
			...mapActions('user', [
				'setUserMode',
				'setNewAlarm'
			]),
			/**
			 * 이전 클릭
			 */
			movePrev() {
				console.log('HeadersV4 movePrev :::', this.isMainPage, this.isFirstPage)
				console.log('movePrev', this.checkMoveSmartBanking())
				console.log('pageName :::', this.pageName)

				//전체 메뉴에서 History Back 처리시 오류로 인하여 헤더 통합작업
				if ( this.isMainPage ) {
					this.moveHome()
				}

				if(this.nacfAccChg){
					//this.getAllMyAssetInfo() // v4 자동으로 자산수집 제외
					this.$store.dispatch('myassets/setNacfAccChg', false)  // 중앙회 자산 변경
				}
				
				this.checkMoveSmartBanking() 
					? appService.moveMain() // 스뱅 홈
					: routerService.movePrev()
			},

			/**
			 * 홈 클릭 (네이티브 홈)
			 */
			moveHome() {
				this.setMainTabLastIdx(0) // 메인 첫번째 페이지로
				
				if(this.nacfAccChg){
				//this.getAllMyAssetInfo() // v4 자동으로 자산수집 제외
				this.$store.dispatch('myassets/setNacfAccChg', false)  // 중앙회 자산 변경
				}

				this.isMainPage // 현재 페이지가 메인 페이지이면
					? appService.moveMain() // 스뱅 홈
					: routerService.moveMain() // 자산관리 홈
			},

			/**
			 * 메뉴 클릭 (네이티브 메뉴)
			 */
			toggleNativeMenu() {
				// 20210302 네이티브 GNB 반영을 위한 연동링크 수정
				// const config = {
				// 	component: PGCO0501
				// }
				// modalService.openPopup(config).then(response => {
				// 			const params = {
				// 				name: response,
				// 			}
				// 			commonService.movePage(params)
				// })
				
				//임시로 해당 메뉴 로그아웃으로 처리
				//2021-07-01
				//this.logout()
				
				//appService.showMenu()

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
			 * 홈
			 */
			moveMain() {
				routerService.moveMain()
			},

			/**
			 * 새로 고침
			 */
			refresh() {
				location.href = '/'
			},

			/**
			 * 로그아웃
			 */
			logout() {

				let cus = "";
				cus = this.$route.query.cus

				if (cus === undefined || cus === null)
				{
					const searchUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
					if(searchUserInfo != undefined){
						cus = searchUserInfo["cus"]
					}
				}
				
				sessionStorage.clear()
				location.replace('/login.html')
			},

			/**
			 * 개별인증
			 */
			indCert() {
				const config = {
				name: 'IC0001', // 자산메인
				}
				commonService.movePage(config)
			},

			/**
			 * sample
			 */
			moveSample() {
				routerService.moveSample()
			},

			/**
			 * pilot
			 */
			movePilot() {
				routerService.movePilot()
			},
			/**
			 * AS-IS
			 */
			moveAsIs() {
				let cus = "";
				cus = this.$route.query.cus
				if (cus === undefined || cus === null)
				{
					const searchUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
					if(searchUserInfo != undefined){
						cus = searchUserInfo["cus"]
					}
				}
				location.href = import.meta.env.VITE_AS_IS_URL + "?cus=" + cus
			},

			/**
			 * 스마트 뱅킹으로 이동
			 */
			checkMoveSmartBanking() {
				const list = [
					'COAS2001', // 서비스소개
					'COAS2009', // 약관재동의화면
					'COGU4001',	// v4 가입전 서비스소개
					'COGU4C01',	// v4 (청소년)가입전 서비스소개
				]
				const hasCheck = list.includes(this.pageName)
				return hasCheck || this.isFirstPage
			},
			/**
			 * 페이지 이동
			 */
			fn_movePage(pageId, param={}) {
				if (pageId === '') {
					modalService.alert("페이지 정보 필요")
					return
				}
				console.log("MAMA2001 Move page pageId: ", pageId)

				let params = {}
				
				// if 신차중고차 및 내차관리
				if (pageId == 'ANCA4201') {
					// if 내차관리 else 신차중고차
					if (param) {
						params = { viewSvc: 'CARCARE', vhcnoVal: param }
					} else {
						params = { viewSvc: 'CARDEAL', vhcnoVal: '' }
					}
				} else {
					params = param
				}
				// 연금진단: PDRT4001
				// 상품추천: PDPD4001
				// 신용점수: ASCR1101
				// 세금현황: PDTX2004
				// 콕부동산: ANRE4201
				// 콕마이카: ANCA4201
				const config = {
					name : pageId,
					params : params
				}
				commonService.movePage(config);
			},

			/**
			 * 전체메뉴 선택 이벤트
			 */
			goAllMenu() {
				// 가입/미가입자 구분 분기처리
				if(this.getUserMode == 'U') {
					// 미가입자
					this.fn_openPopup('COTP0004')
				} else {
					// 가입자
					if(this.getUserMode == 'S') {
						// 큰글모드 전체메뉴
						this.fn_movePage('MRMR4S01')
					} else if(this.getUserMode == 'C') {
						// 청소년모드 전체메뉴
						this.fn_movePage('MRMR4C01')
					} else {
						// 일반모드 전체메뉴
						this.fn_movePage('MRMR4001')
					}
				}
			},

			fn_openPopup(compName) {
				let compenent

				if(compName == "COCO4301") {
					compenent = defineAsyncComponent(() => import("@/views/page/CO/CO/COCO4301/COCO4301"))
				} else if(compName == "COTP0004") {
					compenent = defineAsyncComponent(() => import("@/views/page/CO/TP/COTP0004/COTP0004"))			
				} else if(compName == 'MRCO1001') {
					compenent = defineAsyncComponent(() => import("@/views/page/MR/CO/MRCO1001/MRCO1001"))
				}

				const config = {
					component: compenent,
				}
				// this.close()
				modalService.openPopup(config).then(() => {
					if(compName == 'MRCO1001') {
						this.fn_newAlarm()
					}
				})
			}, 

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

                    // 신규알람여부값 (1: 여, 0: 부) state 저장
                    // 여 => Y, 부 => N
                    this.setNewAlarm(this.anwAncYn == '1' ? 'Y' : 'N')
                })
            },

			/**
			 * 모드변경
			 */
			setChangeMode(e) {
				console.log(e.target.checked)
				const currMode = this.getScrmode()?.mode	// 현재 진입모드
				
				if(currMode == 'U') {
					// 미가입자 가입필요 팝업
					this.fn_openPopup('COTP0004')
					e.target.checked = false
				} else {
					// 변경될 모드 설정
					const uptMode = currMode == 'N' ? 'S' : 'N'

					// 일반, 큰글 모드별 상호전환 (로컬스토리지 저장)
					this.setScrmode(uptMode)

					// state 변경적용
					this.setUserMode(uptMode)

					// 토스트팝업
					modalService.toast((uptMode === 'S' ? '큰글' : '일반') + ' 모드로 설정했어요.')

					// 변경 메인 이동
					routerService.moveMain()
				}
			}
		},

		
		components: {
			
		}
	}
</script>
