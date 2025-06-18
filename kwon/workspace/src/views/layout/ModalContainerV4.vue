<template>
	<div id="modalWrap">
		<!-- 팝업 -->
		<div v-for="(modal, index) in modalList" :key="index" :id="'modal_'+(index+1)" :aria-hidden="getModalAriaHidden(index)">
			<a href="javascript:void(0);" :id="'modal_'+(index+1)+'_i'" class='pop_skip' aria-hidden="true"><span class="blind"></span></a>
			<template v-if="(modal.component.__file !== undefined && modal.component.__file.indexOf('page') > -1)">
				<transition name='modalfade' appear>
				<component :is="modal.component" />
				</transition>
			</template>
			<template v-else>
				<component :is="modal.component" />
			</template>
		</div>

		<!-- 로딩바 -->
		<div class="com_innerloading new" v-show="hasLoading">
			<div id="loading_area">
				<!-- <lottie-player class="lottie load" src="/src/assets_v40/images/lottie/loading.json" loop autoplay></lottie-player> -->
				<lottie-animation role="img" title="로딩중" :animationData="require('@/assets_v40/images/lottie/loading.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="lottie load" ></lottie-animation>
			</div>
			<!-- <div class="com_loading" :class="{'bg-none': !hasLoadingBackground}">
				<span class="blind">로딩중</span>
			</div> -->
		</div>

		<!-- 토스트 메세지 -->
		<div class="inner-wrap toast" v-show="hasToast">
			<div class="cmm-update-txt">
				<p aria-live="polite">{{ toastMessage }}</p>
			</div>
		</div>

		<!-- NH콕마이데이터4.0 신규 -->
		<!-- 장기미접속 안내 알럿 -->
		<template v-if="hasLtrmUnconn">
			<!-- 화면 내 팝업 중 최후방 노출되도록 z-index 설정 -->
			<div class="dimmed" style="display:block; z-index:800;"></div>
			<div class="center_popup" id="center_popup" style="z-index:805;">
				<div class="popup_content">
					<div class="cok_desc">
						<p class="tit">오랜만에 오신 <strong>{{userInfo.cusnm}}</strong>님!<br><em>자산 업데이트</em>가 필요해요.</p>
						<p class="txt">최신 자산 불러오고<br>나의 금융생활 한눈에 확인하세요.</p>
					</div>
				</div>
				<div class="popup_footer">
					<div class="btns_wrap">
						<button type="button" class="btns lg" @click.prevent="callPopClose(false)">다음에</button>
						<button type="button" class="btns lg primary" @click.prevent="callPopClose(true)">업데이트</button>
					</div>
				</div>
			</div>
		</template>

		<!-- 모드 강제변경 알럿 -->
		<template v-if="hasModAlert">
			<!-- 화면 내 최우선 노출되도록 z-index 설정 -->
			<div class="dimmed" style="display:block; z-index:9000;"></div>	
			<div class="center_popup" id="center_popup" style="z-index:9005;">
				<div class="popup_content">
					<p id="popup_content_detail" class="txt">
						원활한 NH콕마이데이터(자산관리) 서비스 이용을 위해 모드가 변경됩니다.<br>
					</p>
				</div>
				<div class="popup_footer">
					<div class="btns_wrap">
						<button type="button" class="btns lg primary" @click.prevent="setModAlertClose">확인</button>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	import LottieAnimation from 'lottie-web-vue'

	export default {
		name: 'ModalPage',
        data: () => {
            return {
				maxZIndex : 0
            }
        },		
		computed: {
			...mapGetters('modal', [
				'modalList',
				'modalConfig',
				'modalComponent',
				'modalAriaHidden',
				'hasModal',
				'hasLoadingBackground',
				'hasLoading',
				'toastList',
				'toastMessage',
				'hasToast',
				'hasModAlert',
				'hasLtrmUnconn'
			]),
			...mapGetters('user', [
				'userInfo',
			]),
			// 25.06.10, require 에러 제거
			// loadingImage() {
			// 	try {
			// 		return require('@/assets/images/common/loading.gif')
			// 	}
			// 	catch (e) {
			// 		console.error(e)
			// 		return ''
			// 	}
			// },
			loadingAriaHidden() {
				return this.hasLoading && !this.hasToast
					? 'false'
					: 'true'
			},
			toastAriaHidden() {
				return this.hasToast
					? 'false'
					: 'true'
			}
		},
		methods: {
			...mapActions('modal', [
				'removeModAlert',
				'removeLtrmUnconn',
			]),
			...mapActions('myassets', [
				'getUserRelogin'
			]),
			getModalClass(modal) {
				const type = this.getModalType(modal)
				return `cmm-layer-wrap active ${type}`
			},
			getModalAriaHidden(index) {
				const isLastModal = this.modalList.length === index + 1
				// return isLastModal && this.hasModal && !this.hasLoading && !this.hasToast
				return isLastModal && this.hasModal && !this.hasToast
					? 'false'
					: 'true'
			},
			setModAlertClose() {
				this.removeModAlert()
			},
			callPopClose(dsc) {
				this.removeLtrmUnconn()
				if(!!dsc) {
					// 업데이트
					this.getUserRelogin()
				}
			},
		}, 
		components: {
			LottieAnimation
		},
		mounted() {
			this.$store.subscribe((mutation) => { 
				if (mutation.type === 'modal/openModal') { 
					// this.openModal()
				}
			})
		},
		updated() {
			//이벤트 1번만 타게하기 위한 설정
			if ( window.event !== undefined) window.event.stopPropagation()

			this.maxZIndex = 0
			let zIndex = 900
			let slideChild = ""

			for(let i=0; i<this.modalList.length; i++) {
				let doc = document.getElementById("modal_"+(i+1))

				// 25.03.20) 모달 내 a태그 href # 포함 시 팝업닫기 후 뒤로가기 동작 오류 방지
				setTimeout(() => {
					let anchors = doc.querySelectorAll('a[href^="#"]')
					let d = [].forEach.call(anchors, function(anchor) {
						anchor.addEventListener('click', function(e){
							e.preventDefault()
						})
					})
				}, 10)

				// 25.04.07) 모달 내 aos back 버튼 기능 동작 시 common-ui 내 닫기버튼 동작 충돌 방지
				let closeBtn = doc.querySelectorAll('.btn_close')
				closeBtn.forEach(d => d.classList.add('gray'))


				//장착법에 의해 모달Tag에 추가된 Tag로 인한여 1번부터 체크

				// 슬라이드 팝업 내 알럿창일 경우 건너뜀
				if(doc.childNodes[1].classList === undefined) continue

				let childClass = doc.childNodes[1].classList.value

				if(i == 0) {	// 오픈하는 팝업이 하나일 경우
					if(childClass.indexOf("full_popup") != -1) {	// 풀팝업일때
						continue
					} else {										// 슬라이드 팝업 또는 일자 선택 팝업일때
						slideChild = doc.childNodes[1].childNodes
						for(let j=0; j<slideChild.length; j++) {
							if(slideChild[j].className.indexOf("dimmed") != -1) {
								zIndex += 5
								this.maxZIndex = zIndex
								slideChild[j].style.zIndex = zIndex
							} else if(slideChild[j].className.indexOf("popup_box") != -1 || slideChild[j].className.indexOf("cal_date_popup") != -1) {
								zIndex += 5
								this.maxZIndex = zIndex
								slideChild[j].style.zIndex = zIndex
							}
						}
					}
				} else {		// 오픈하는 팝업이 두 개 이상일 경우
					
					if(childClass.indexOf("full_popup") != -1 && typeof childClass != "undefined") {	// 풀팝업일때
						zIndex += 5
						this.maxZIndex = zIndex
						doc.childNodes[1].style.zIndex = zIndex
					} else {																			// 슬라이드 팝업 또는 일자 선택 팝업일때
						slideChild = doc.childNodes[1].childNodes
						for(let k=0; k<slideChild.length; k++) {
							if(slideChild[k].className.indexOf("dimmed") != -1) {
								zIndex += 5
								this.maxZIndex = zIndex
								slideChild[k].style.zIndex = zIndex
							} else if(slideChild[k].className.indexOf("popup_box") != -1 || slideChild[k].className.indexOf("cal_date_popup") != -1) {
								zIndex += 5
								this.maxZIndex = zIndex
								slideChild[k].style.zIndex = zIndex
							}
						}
					}
				}
			}

			///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// 웹 접근성 처리
			///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			if (this.modalList.length > 0)
			{
				// v4 팝업 오픈 시 페이지 inert 적용 처리
				const targetPage = document.getElementById("wrap")
				targetPage.setAttribute("inert", "")

				// v4 풀팝업 class="full_popup" aria-hidden 및 inert 적용처리
				for(let i=0; i<this.modalList.length; i++) {
					const isLastModal = this.modalList.length === i + 1
					const modalDiv = document.getElementById("modal_"+(i+1))

					if(!isLastModal) {
						modalDiv.setAttribute("inert", "")
					} else {
						modalDiv.removeAttribute("inert")
					}
					
					// 슬라이드 페이지팝업일 경우 건너뜀
					if(modalDiv.childNodes[1].classList === undefined) continue

					const chkIsFullPopup = modalDiv.childNodes[1].classList.value.indexOf('full_popup') > -1 ? true : false

					if(!chkIsFullPopup) continue

					const targetDiv = modalDiv.querySelector('.full_popup')
					if(!isLastModal) {
						targetDiv.setAttribute("aria-hidden", true)
						targetDiv.setAttribute("inert", "")
					} else {
						targetDiv.setAttribute("aria-hidden", false)
						targetDiv.removeAttribute("inert")
					}
				}

				const curModalDoc = document.getElementById("modal_"+ this.modalList.length)
				if(curModalDoc !== undefined && curModalDoc !== null)
				{
					// 풀팝업 헤더 타이틀 포커스
					const popupHeaderElement = curModalDoc.querySelector('.popup_header')
					if ( popupHeaderElement !== undefined && popupHeaderElement !== null)
					{
						for(let i=0; i< popupHeaderElement.childNodes.length ;i++)
						{
							if( popupHeaderElement.childNodes[i].tagName === 'H1')
							{
								popupHeaderElement.childNodes[i].setAttribute("tabIndex","-1")
								popupHeaderElement.childNodes[i].focus()
								break
							}
						}
					}

					// Alert& confirm Test 포커스
					const alertPopupElement = curModalDoc.querySelector('.alert_popup')
					if ( alertPopupElement !== undefined && alertPopupElement !== null)
					{
						const alertPopupContentElement = alertPopupElement.querySelector('.popup_content')
						if ( alertPopupContentElement !== undefined && alertPopupContentElement !== null)
						{	
							const alertPopupContentElementChildNodes = alertPopupContentElement.childNodes
							for(let i=0; i< alertPopupContentElementChildNodes.length ;i++)
							{
								if( alertPopupContentElementChildNodes[i].tagName === 'P' && alertPopupContentElementChildNodes[i].id === 'popup_content_detail')  
								{
									alertPopupContentElementChildNodes[i].focus()
									break
								}
							}							
						}
					}
				}
			} else {
				// v4 팝업 오픈 시 페이지 inert 해제
				const targetPage = document.getElementById("wrap")
				targetPage.removeAttribute("inert")
			}
			///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		}		
	}
</script>