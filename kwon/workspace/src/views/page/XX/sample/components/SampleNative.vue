<template>
  <div>
		<h2>콕마이데이터 4.0</h2>
		<p>===========================================</p>
		<p><button @click="getCbAppCheck">콕뱅 앱체크</button></p>
		<p><button @click="getSbAppCheck">스뱅 앱체크</button></p>
		<p>===========================================</p>
		<p><button @click="getCertList">공인인증서 목록</button></p>
		<p><button @click="getCertPassConfirm">공인인증서 비밀번호 확인</button></p>
		<p><button @click="showKeyboard">보안키패드 보이기</button></p>
		<p><button @click="hideKeyboard">보안키패드 숨기기</button></p>
		<p><button @click="cardLogin">카드 로그인</button></p>
		<p><button @click="cardList">카드 목록조회</button></p>
		<p><button @click="cardLogout">카드 로그아웃</button></p>
		<p><button @click="showMenu">전체메뉴 보이기</button></p>
		<p><button @click="moveMain">홈(메인) 화면 이동</button></p>
		<p><button @click="showLoading">로딩바 보이기</button></p>
		<p><button @click="hideLoading">로딩바 숨기기</button></p>
		<p><button @click="extendLoginSession">스뱅 로그인 세션 연장</button></p>
		<p><button @click="logoutSession">스뱅 로그아웃</button></p>
		<p><button @click="getCertListCokBank">콕뱅공인인증서 목록</button></p>
  </div>
</template>

<script>
	import appService from '@/service/appService.js'

  export default {
    name: 'SampleNative',
		data: function() {
			return {}
		},
		mounted() {
			
		},
    methods: {
			call() {
			},
			// 콕뱅 앱체크
			getCbAppCheck() {
				appService.cokBankGetAppVersion().then(response => {
					console.log('콕뱅 앱체크 >>> ', response)
				})
			},
			// 스뱅 앱체크
			getSbAppCheck() {
				appService.getAppVersion().then(response => {
					console.log('스뱅 앱체크 >>> ', response)
				})
			},
			// 공인인증서 목록
			getCertList() {
				appService.getCertList().then(response => {
					console.log(response)
				})
			},
			// 공인인증서 비밀번호 확인
			getCertPassConfirm() {
				appService.getCertPassConfirm().then(response => {
					console.log(response)
				})
			},
			// 보안키패드 보이기(공인인증서 비밀번호/아이디 로그인 비밀번호 입력시 사용)
			showKeyboard() {
				appService.showKeyboard().then(response => {
					console.log(response)
				})
			},
			// 보안키패드 숨기기
			hideKeyboard() {
				appService.hideKeyboard().then(response => {
					console.log(response)
				})
			},
			// 카드 로그인
			cardLogin() {
				appService.cardLogin().then(response => {
					console.log(response)
				})
			},
			// 카드 목록조회
			cardList() {
				appService.cardList().then(response => {
					console.log(response)
				})
			},
			// 카드 로그아웃
			cardLogout() {
				appService.cardLogout().then(response => {
					console.log(response)
				})
			},
			// 전체메뉴 보이기
			showMenu() {
				appService.showMenu().then(response => {
					console.log(response)
				})
			},
			// 홈(메인) 화면 이동
			moveMain() {
				appService.moveMain().then(response => {
					console.log(response)
				})
			},
			// 로딩바 보이기
			showLoading() {
				appService.showLoading().then(response => {
					console.log(response)
				})
			},
			// 로딩바 숨기기
			hideLoading() {
				appService.hideLoading().then(response => {
					console.log(response)
				})
			},
			// 스뱅 로그인 세션 연장
			extendLoginSession() {
				appService.extendLoginSession().then(response => {
					console.log(response)
				})
			},
			// 스뱅 로그아웃
			logoutSession() {
				appService.logoutSession().then(response => {
					console.log(response)
				})
			},
			//콕뱅 인증서 목록 조회
			getCertListCokBank(){
				appService.cokBankGetCertList().then(response => {
					console.log(response)
				})
			}
		}
  }
</script>
