<template>
	<div>
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
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'

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
				'hasToast'
			]),
			loadingImage() {
				try {
					return require('@/assets/images/common/loading.gif')
				}
				catch (e) {
					console.error(e)
					return ''
				}
			},
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
			getModalClass(modal) {
				const type = this.getModalType(modal)
				return `cmm-layer-wrap active ${type}`
			},
			getModalAriaHidden(index) {
				const isLastModal = this.modalList.length === index + 1
				return isLastModal && this.hasModal && !this.hasLoading && !this.hasToast
					? 'false'
					: 'true'
			},
		}, 
		components: {
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

			// this.$nextTick(()=>{
			// 	if (this.modalList.length > 0)
			// 	{
			// 		const curModalDoc = document.getElementById("modal_"+ this.modalList.length)
			// 		if(curModalDoc !== undefined && curModalDoc !== null)
			// 		{
			// 			console.log('popup_header Reader')
			// 			const popupHeaderElement = curModalDoc.querySelector('.popup_header')
			// 			if ( popupHeaderElement !== undefined && popupHeaderElement !== null)
			// 			{
			// 				for(let i=0; i< popupHeaderElement.childNodes.length ;i++)
			// 				{
			// 					if( popupHeaderElement.childNodes[i].tagName === 'H1')
			// 					{
			// 						popupHeaderElement.childNodes[i].setAttribute("tabIndex","-1")
			// 						popupHeaderElement.childNodes[i].focus()
			// 						break
			// 					}

			// 				}
			// 			}
			// 		}
			// 	}
			// })

			///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// 웹 접근성 처리
			///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			if (this.modalList.length > 0)
			{
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
			}
			///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		}		
	}
</script>