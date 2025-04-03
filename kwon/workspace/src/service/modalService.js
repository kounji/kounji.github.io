/**
 * 팝업화면 개발에 필요한 공통 스크립트.
 */
import AlertPopup from '@/views/popup/common/AlertPopup.vue'
import store from '@/store'
import constant from '@/common/config/constants.js'
import appService from '@/service/appService.js'
import SelectPopup from '@/views/popup/common/SelectPopup.vue'
import SelectPopupRenderer from '@/components/renderer/SelectPopupRenderer.vue'
import JsonViewerPopup from '@/views/popup/XX/sample/JsonViewerPopup.vue'
import SlidePagePopup from '@/views/popup/common/SlidePagePopup.vue'
import SelectPopupMonth from '@/views/popup/common/SelectPopupMonth.vue'
import SlideSelectPopupYm from '@/views/popup/common/SlideSelectPopupYm.vue'
import SlideSelectPopupYear from '@/views/popup/common/SlideSelectPopupYear.vue'
import SelectSinglePopup from '@/views/popup/common/SelectSinglePopup.vue'
import CalendarPopup from '@/views/popup/common/CalendarPopup.vue'

//2025-02-04 상호금융 NH콕마이데이터 4.0 추진 개발 공유하기 팝업 추가
import webSharePopup from '@/views/popup/common/WebSharePopup.vue'

import {clearSessionTimer} from '@/utils/date'
import _ from 'lodash'

//import router from '@/common/router'

export default {

	/**
	 * 팝업 공통 서비스
	 * @param {Object} config
	 * config = {
	 * 	 component: Component
	 *   params: {},
	 * }
	 * setTimeout : 팝업 close 후 즉시 open될때 z-index 추가하기 위함
	 */
	openPopup(config) {

        let sesChk = true

        // modalService.alert(data.name)
		if(!appService.applicationSessionCheck()){
            clearSessionTimer()
            this.alert("장시간 미사용으로 종료되었습니다.<br>재로그인 해주시기 바랍니다", "세션만료","확인").then(response=>{
                console.log('세션만료 alert 처리', response)
                if (response === '확인'){
                    appService.moveMain()
                }
            })    
            sesChk = false    
        }
        

		if(event === undefined)
		{
			const modalInfo = store.getters['modal/modalList']
			if(modalInfo.length > 0)
			{
				const currentModal = document.getElementById('modal_' + modalInfo.length)
				config.target = currentModal.childNodes[0]
			}else{
				config.target = document.getElementById('main_section') || document.getElementById('content')
			}

		}else{
			config.target = event.currentTarget
		}
		return new Promise((resolve, reject) => {
			//통합인증시 팝업의 랜더링 문제로 인하여 1차 인증후 메인팝업 이외의 팝업은 제거

			if(config.component.name === 'COAR1010'){
				//COAR0023 변경시일 경우 체크
				//COAR0004 신규
				const modalInfo = store.getters['modal/modalList']
				let modalLength = modalInfo.length
				let newYn = true
				// for (let i=0; i < modalLength; i++)
				// {
				// 	if ( modalInfo[i].component.name === 'COAR0023')
				// 	{
				// 		newYn = false
				// 		break
				// 	}
				// }
				let isCORE2206 = _.findIndex(modalInfo, d => d.component.name === "CORE2206") > -1 ? true : false;	// 아파트 검색 선택
				let isCORE2201 = _.findIndex(modalInfo, d => d.component.name === "CORE2201") > -1 ? true : false;	// 직접입력

				if(!isCORE2206 && !isCORE2201) {
					// 일반 case
					while (modalLength--){
						if(newYn && modalLength == 0) break
						store.dispatch('modal/closeModal')
					}
				} else {
					// 부동산 등록 도중 대출계좌 연결 슬라이드를 통해 자산 연결 진행 시
					while (modalLength--) {
						if(isCORE2206) {
							if(modalInfo[modalLength].component.name === "CORE2206") break
						}
						if(isCORE2201) {
							if(modalInfo[modalLength].component.name === "CORE2201") break
						}


						if(newYn && modalLength == 0) break
						store.dispatch('modal/closeModal')
					}
				}
			}
            if(!sesChk){
                resolve("세션만료")
            }else{
                config.resolve = resolve
                
                setTimeout(() => {
                    store.dispatch('modal/openModal', config)
                }, 10)
            }
		})
	},

	/**
	 * 셀렉트 팝업 오픈
	 * @param {String} message : confirm 창 message
	 * @param {Array} buttons : confirm 창 button 배열
	 * @return {Promise}
	 * setTimeout : 팝업 close 후 즉시 open될때 z-index 추가하기 위함
	 */
	openSelect(config) {
		return new Promise(resolve => {
			config.component = SelectPopup
			config.resolve = resolve
			config.target = event.currentTarget
			config.renderer = config.renderer || {
				component: SelectPopupRenderer
			}

			setTimeout(() => {
				store.dispatch('modal/openModal', config)
			}, 10)
		})
	},

	/**
	 * 셀렉트 팝업 오픈(단건선택)
	 * @param {String} message : confirm 창 message
	 * @param {Array} buttons : confirm 창 button 배열
	 * @return {Promise}
	 * setTimeout : 팝업 close 후 즉시 open될때 z-index 추가하기 위함
	 */
	openSelectSingle(config) {
		return new Promise(resolve => {
			config.component = SelectSinglePopup
			config.resolve = resolve
			config.target = event.currentTarget
			config.renderer = config.renderer || {
				component: SelectPopupRenderer
			}

			setTimeout(() => {
				store.dispatch('modal/openModal', config)
			}, 10)
		})
	},

	/**
	 * To-BE 기간 셀렉트 팝업 오픈
	 * @param {String} 시작일
	 * @param {String} 종료일
	 * @return {Promise}
	 */
	openSelectMonth(config) {
		return new Promise(resolve => {
			config.component = SelectPopupMonth
			config.resolve = resolve
			config.target = event.currentTarget
			config.renderer = config.renderer || {
				component: SelectPopupRenderer
			}
			store.dispatch('modal/openModal', config)
		})
	},

	/**
	 * To-BE 년월 선택 슬라이드 팝업 오픈
	 * @param {String} 선택년월
	 * @return {Promise}
	 */
	openSlideSelectMonth(config) {
		return new Promise(resolve => {
			config.component = SlideSelectPopupYm
			config.resolve = resolve
			config.target = event.currentTarget
			config.renderer = config.renderer || {
				component: SelectPopupRenderer
			}
			store.dispatch('modal/openModal', config)
		})
	},

		/**
	 * To-BE 년월 선택 슬라이드 팝업 오픈
	 * @param {String} 선택년월
	 * @return {Promise}
	 */
	openSlideSelectYear(config) {
		return new Promise(resolve => {
			config.component = SlideSelectPopupYear
			config.resolve = resolve
			config.target = event.currentTarget
			config.renderer = config.renderer || {
				component: SelectPopupRenderer
			}
			store.dispatch('modal/openModal', config)
		})
	},

	/**
	 * 슬라이드 Page 팝업 오픈
	 * @param {String} message : confirm 창 message
	 * @param {Array} buttons : confirm 창 button 배열
	 * @return {Promise}
	 */
	openSlidePagePopup(config) {
		return new Promise(resolve => {
			config.component = SlidePagePopup
			config.resolve = resolve
			
			if(event === undefined)
			{
				const modalInfo = store.getters['modal/modalList']
				if(modalInfo.length > 0)
				{
					const currentModal = document.getElementById('modal_' + modalInfo.length)
					config.target = currentModal.childNodes[0]
				}else{
					config.target = document.getElementById('main_section') || document.getElementById('content')
				}

			}else{
				config.target = event.currentTarget
			}

			config.renderer = config.renderer || {
				component: SelectPopupRenderer
			}
			store.dispatch('modal/openModal', config)
		})
	},

	/**
	 * alert
	 * @param {Array} args : config
	 * @return {Promise}
	 */
	alert(...args) {
		console.log('alert', args)
		const userConfig = this.getUserConfig(args, 'alert')
		return new Promise(resolve => {
			const config = {
				component: AlertPopup,
				params: {
					title: userConfig.title,
					content: userConfig.content,
					buttons: userConfig.buttons,
				},
				resolve
			}
			//config.renderer = {component:'' , cdata:[]}

			const modalInfo = store.getters['modal/modalList']
			const modalLength = modalInfo.length

			let v_renderer   = null
			let v_component  = ''
			if(modalLength > 0)
			{
				v_renderer   = modalInfo[modalLength-1].renderer
				v_component = (v_renderer === undefined)? '':v_renderer.component
			}
			
			//config.renderer = {component: modalInfo[modalLength-1].component, cdata:[]}
			config.renderer = {component: v_component, cdata:[]}
			store.dispatch('modal/openModal', config)
			
		})
	},

	/**
	 * confirm
	 * @param {Array} args : config
	 * @return {Promise}
	 * 20210510 컴펌 수정
	 */
	confirm(...args) {
		/*
		const userConfig = this.getUserConfig(args, 'confirm')
		return this.alert(userConfig)
		*/
		const confirmObj = JSON.parse(JSON.stringify(args[0]))
		// let isTobePage = store.state.layout.isTobePage

		// AS-IS, TO-BE 구분
		// if(isTobePage) {
			if(confirmObj.buttons === '' || confirmObj.buttons === undefined || confirmObj.buttons === null) {
				confirmObj.buttons = [
					{text: confirmObj.ALERT_CANCEL_TEXT ||constant.ALERT_CANCEL_TEXT, class: 'btn btn_mint_gray btn_no'}, // 아니오(취소)
					{text: confirmObj.ALERT_CONFIRM_TEXT || constant.ALERT_CONFIRM_TEXT, class: 'btn btn_mint'}, // 예(확인)
				]
			} else {
				confirmObj.buttons = [
					{text: confirmObj.ALERT_CANCEL_TEXT ||constant.ALERT_CANCEL_TEXT, class: 'btn btn_grey btn_no'}, // 아니오(취소)
					{text: confirmObj.ALERT_CONFIRM_TEXT || constant.ALERT_CONFIRM_TEXT, class: 'btn btn_mint'}, // 예(확인)
				]
			}
		// } else {
			// confirmObj.buttons = [
			// 	{text: confirmObj.ALERT_CANCEL_TEXT ||constant.ALERT_CANCEL_TEXT, class: 'btn btn_grey btn_no'}, // 아니오(취소)
			// 	{text: confirmObj.ALERT_CONFIRM_TEXT || constant.ALERT_CONFIRM_TEXT, class: 'btn btn_mint'}, // 예(확인)
			// ]
		// }
		return this.alert(confirmObj)
	},

	/**
	 * getUserConfig
	 * @param {Array} args : config
	 * @return {Object}
	 */
	getUserConfig(args, type='alert') {
		const isObject = typeof args[0] === 'object'
		const alertButtons = [
			{text: args[2] || constant.ALERT_TEXT, class: 'btn btn_mint btn_no'}, // 확인
		]

		///////////////////////////// CBT /////////////////////////////
		// let isTobePage = store.state.layout.isTobePage
		let confirmButtons = []
		// if(isTobePage) {
		// 	confirmButtons = [
		// 		{text: constant.ALERT_CANCEL_TEXT, class: 'btn btn_mint_grey btn_no'}, // 아니오(취소)
		// 		{text: constant.ALERT_CONFIRM_TEXT, class: 'btn btn_mint'}, // 예(확인)
		// 	]
		// } else {
			confirmButtons = [
				{text: constant.ALERT_CANCEL_TEXT, class: 'btn btn_grey btn_no'}, // 아니오(취소)
				{text: constant.ALERT_CONFIRM_TEXT, class: 'btn btn_mint'}, // 예(확인)
			]
		// }
		/*
		<<asis>>
		const confirmButtons = [
			{text: constant.ALERT_CANCEL_TEXT, class: 'btn btn_grey btn_no'}, // 아니오(취소)
			{text: constant.ALERT_CONFIRM_TEXT, class: 'btn btn_mint'}, // 예(확인)
		]
		<<tobe>>
		const confirmButtons = [
			{text: constant.ALERT_CANCEL_TEXT, class: 'btn btn_mint_grey btn_no'}, // 아니오(취소)
			{text: constant.ALERT_CONFIRM_TEXT, class: 'btn btn_mint'}, // 예(확인)
		]
		*/
		///////////////////////////// CBT /////////////////////////////

		const buttons = type === 'alert' ? alertButtons : confirmButtons
		return isObject
			? args[0]
			: {
				content: args[0],
				title: args[1],
				buttons
			}
	},

	/**
	 * alert
	 * @param {Array} args : config
	 * @return {Promise}
	 */
	toast(message) {
		const config = {
			message
		}
		store.dispatch('modal/addToast', config)
	},

  /**
   * openModalJsonViewer
   */
  openModalJsonViewer(result) {
    const config = {
      component: JsonViewerPopup,
      params: {
        json: result
      }
		}
		return this.openPopup(config)
	},
	
	/**
   * showLoading
   */
	showLoading() {
		store.dispatch('modal/addLoading')
	},

	/**
   * hideLoading
   */
	hideLoading() {
		store.dispatch('modal/removeAllLoading')
	},

	/**
	 * calendarPopup
	 * @param {Array} args : config
	 * @return {Promise}
	 */
	calendarPopup(...args) {
		console.log('calendarPopup', args)
		return new Promise(resolve => {
			const confirmObj = JSON.parse(JSON.stringify(args[0]))
			const config = {
				component: CalendarPopup,
				params: {
					pDate	: confirmObj.pDate,
					minDate	: confirmObj.minDate,
					maxDate	: confirmObj.maxDate,
				},
				resolve
			}
			config.renderer = {component:'' , cdata:[]}
			store.dispatch('modal/openModal', config)
		})
	},

	/**
	 * 공유하기(Web Share) 팝업 webSharePopup
	 * @param {Array} config : config
	 * @return {Promise}
	 */
	webSharePopup(config) {
		console.log('webSharePopup', config)
		return new Promise(resolve => {
			config.component = webSharePopup
			config.resolve = resolve
			config.renderer = config.renderer || { component: SelectPopupRenderer }
			
			setTimeout(() => {
				store.dispatch('modal/openModal', config)
			}, 10)
		})
	}

}