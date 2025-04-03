<template>
	<header id="header" v-show="isMainPage === false && pageName !== 'MRMR2001'" class="mydata2023">
		<h1>{{ pageTitle }}</h1>
		<a 
			href="javascript:void(0);"
			class="btn_back"
			role="button"
			@click.prevent="movePrev"
			v-show="!isExcludePage && isPageName">
				<span class="blind">이전화면</span>
		</a>

		<template v-if='isMenuShow === false'>
			<a 
				href="javascript:void(0);" 
				class="btn_home" 
				role="button"
				@click.prevent="moveHome"
				v-show="!isExcludePage && isLoginSuccess && isExistPageList">
					<span class="blind">홈이동</span>
			</a>
		</template>
		<template v-else>
		<!-- <a 
			href="javascript:void(0);"
			class="btn_nav" 
			role="button"
			@click.prevent="toggleNativeMenu"
			v-show="!isExcludePage && isLoginSuccess && isSBank && isExistPageList">
				<span class="blind">전체메뉴열기</span>
		</a> -->

		<a 
			href="javascript:void(0);" 
			class="btn_home" 
			role="button"
			@click.prevent="moveHome"
			v-show="!isExcludePage && isLoginSuccess && isExistPageList" :style="{right: !isExcludePage && isLoginSuccess && isSBank && isExistPageList ? '5rem' : ''}">
				<span class="blind">홈이동</span>
		</a>
		<!-- <a 
			href="javascript:void(0);"
			class="btn_nav" 
			role="button"
			@click.prevent="toggleNativeMenu"
			v-if="!isExcludePage && isLoginSuccess && isSBank && isExistPageList" style="display:block">
				<span class="blind">전체메뉴열기</span>
		</a>		 -->
		</template>

	</header>

</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'
	import appService from '@/service/appService'
	import routerService from '@/service/routerService'
	import commonService from '@/service/commonService'
	import commonMixin from '@/common/mixins/commonMixin'

	export default {
		name: 'Headers',
		data: function() {
			return {
			}
		},
		computed: {
			...mapGetters('user', [
				'isLoginSuccess', // 로그인 성공 여부
				'isSBank'			// 스뱅, 콕뱅 여부 
			]),
			...mapGetters('layout', [
				'pageTitle',
				'pageName',
				'isMainPage',
				'isFirstPage',
				'pageList'
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
			isPageName() {
				return this.pageName ? true : false
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
		mixins: [
			commonMixin
		],		
		methods: {

			...mapActions('layout', [
				'setMainTabLastIdx'
			]),
      ...mapActions('myassets', [
            'getAllMyAssetInfo'
      ]),
			/**
			 * 이전 클릭
			 */
			movePrev() {
				console.log('movePrev', this.checkMoveSmartBanking())
        console.log('pageName :::', this.pageName)

        if(this.nacfAccChg){
          this.getAllMyAssetInfo()
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
          this.getAllMyAssetInfo()
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
				]
				const hasCheck = list.includes(this.pageName)
				return hasCheck || this.isFirstPage
			}
		},
		components: {
			
		}
	}
</script>
