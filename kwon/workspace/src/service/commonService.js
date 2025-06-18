	/**
 * 화면 개발을 위한 공통 스크립트.
 */

import router from '@/common/router'
import store from '@/store'
import constant from '@/common/config/constants'

import modalService from '@/service/modalService'
import routerService from '@/service/routerService'
import appService from '@/service/appService'
import {clearSessionTimer} from '@/utils/date'

export default {

	/**
	 * 페이지 이동
	 * @param {Object} data : 이동할 페이지 정보
	 */
	movePage(data) {
		// modalService.alert(data.name)
		if(!appService.applicationSessionCheck())
		{
			//console.log('commonService MovePage applicationSessionCheck ######', store.state.modal)
			let existsSessionAlert = false
			for (let i=0; i < store.state.modal.modalList.length; i++)
			{
				//console.log(' movePage ==> ', (store.state.modal.modalList[i].params.title!==undefined)?store.state.modal.modalList[i].params.title:'')
				if(store.state.modal.modalList[i].params.title!==undefined && store.state.modal.modalList[i].params.title === '세션만료') 
				{
					existsSessionAlert = true
					break
				}
			}

			if (!existsSessionAlert){
                sessionStorage.clear()
				modalService.alert("장시간 미사용으로 종료되었습니다.<br>재로그인 해주시기 바랍니다", "세션만료","확인").then(response=>{
					//console.log('세션만료 alert 처리', response)
					if (response === '확인'){
						clearSessionTimer()
						appService.moveMain()
					}
				})
			}

			return false
		}
		
		return new Promise((resolve, reject) => {

			const currentPage = store.getters['layout/pageInfo']
			const page = this.findPageItem(data)
			
			page.params = data.params || {}
			page.title = data.title || page.title // 화면 이동시 title이 넘어오면 넘어온 값을 사용하고 없으면 config.json 내용을 사용
			
			const isValid = this.validMovePage(page, currentPage)
			const disableHistory = !!currentPage.disableHistory // 최근에 로드된 페이지정보

			if (isValid) {
				// :: S :: 21.07.02. 헤더가 숨겨져있을경우 페이지 이동시 초기화처리
				//서브메인
				if($('#wrap').hasClass("responsive") ) {
					$('#wrap').removeClass("responsive")
				}
				// :: E :: 21.07.02. 헤더가 숨겨져있을경우 페이지 이동시 초기화처리. 

				/////////////////////////////
				// NH콕마이데이터4.0 신규 추가
				// 이동하는 페이지가 메인일 경우 스토어 내 pageList 초기화
				if(page.name == constant.MAIN_PAGE || page.name == constant.MAIN_PAGE_S || page.name == constant.MAIN_PAGE_C) {
					store.dispatch('layout/removeAllPage')
				}

				// v4 뒤로가기 시 전체메뉴 포함
				// 이전페이지, 현재페이지, 다음페이지 중 현재페이지 disableHistory: true, 이전/다음 페이지가 동일한 케이스 대응
				// const pageList = store.getters['layout/pageList']
				// const beforePage = store.getters['layout/beforePageInfo']
				// const isAllMenu = store.getters['layout/isAllMenu']
				// if(pageList.length > 1 && isAllMenu && (page.name == beforePage.name)) {
				// 	// 현재페이지가 전체메뉴 이면서 이전, 다음페이지가 동일한 경우
				// 	routerService.movePrev()
				// 	return
				// }
				/////////////////////////////

				// dispatch layout store
				store.dispatch('layout/setPageInfo', page)

				// router replace or push
				disableHistory
					? router.replace(data)
					: router.push(data).catch(error => {
						if (error.name === 'NavigationDuplicated') {
							//location.reload()
						}
					})
				
				// promise resolve
				resolve()
			} else {
				reject()
			}
		})		
	},

	/**
	 * 페이지 정보 유효성 체크
	 * @param {Object} page : 이동할 페이지 정보
	 * @param {Object} currentPage : 현제 페이지 정보
	 * @return {Boolean}
	 */
	validMovePage(page, currentPage) {
		//console.log('validMovePage : ', page, currentPage)
		// 메뉴 정보에 이동할 페이지가 있는지 체크
		if (!page) {
			console.error('페이지 정보를 찾을수 없습니다.')
			return false
		}
		// 현제 페이지와 이동할 페이지가 같은지 체크
		if (page.name === currentPage.name) {
			console.error('같은 페이지 입니다.')

			// 같은 페이지일경우 현재 페이지 스크롤 상단 set
			$('html, body').stop().animate({
				scrollTop : 0
			},700)

			return false
		}
		return true
	},

	/**
	 * 페이지 정보 유효성 체크
	 * @param {Object} page : 페이지 정보
	 * @return {Boolean}
	 */
	findPageItem(data) {
		const pages = store.state.config.pages || []
		return pages.find(d => d.name === data.name) || {}
		// return pages.find(d => d.path === data.path)
	},

	/**
	 * 팝업 공통 서비스
	 * @param {Object} config
	 * config = {
	 * 	 name: '', // vue component name
	 * 	 component: Component // vue component instance
	 *   params: {},
	 *   handler: {},
	 * }
	 */
	openPopup(config) {
		// dispatch layout store
		store.dispatch('modal/openModal', config)
	},

	/**
	 * localStorage set
	 * @param {String} key
	 * @param {Object | String} value
	 */
	setStorage(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	},

	/**
	 * localStorage set
	 * @param {String} key
	 * @return {Object}
	 */
	getStorage(key) {
		try {
			return JSON.parse(localStorage.getItem(key)) || {}
		} catch (e) {
			console.error(e)
			return {}
		}
	},

	/**
	 * localStorage remove
	 * @param {String} key
	 */
	removeStorage(key) {
		localStorage.removeItem(key)
	},

	/**
	 * get image path
	 * @param {String} path
	 * @return {String}
	 */
	getImagePath(path) {
		try {
			return require(path)
		} catch (e) {
			console.error(e)
			return ''
		}
	},
	/**
	 * 자동차, 부동산 오픈여부 주석 수정.
	 */
	getOpenMenu(){
		return store.state.user.userInfo.tobeType
	},

	/**
	 * 스크래핑 인증 정보
	 */
	getScrapingAuth(type, module) {
		const userId = store.state.user.userInfo.asetAmnCusno
		const idItem = this.getStorage(userId) || {}
		const typeItem = idItem[type] || {}
		const moduleItem = typeItem[module]
		const tempModuleItem = this.getScrapingAuthForTemp(type, module)
		return moduleItem || tempModuleItem
	},

	/**
	 * 스크래핑 인증 정보 (기존 root에 저장된 인증정보를 가저오기 위해 사용)
	 */
	getScrapingAuthForTemp(type, module) {
		const userId = store.state.user.userInfo.asetAmnCusno
		const typeItem = this.getStorage(type) || {}
		const moduleItem = typeItem[module] || {}
		const result = moduleItem.asetAmnCusno === userId
			? moduleItem
			: {}
		return result
	},
	
}