/**
 * layout store
 */
import _ from 'lodash'
import constant from '@/common/config/constants'

// getters
const getters = {
	pageList: state => state.pageList || [],
	pageInfo: state => _.last(state.pageList) || {},
	pageName: (state, getters) => getters.pageInfo.name,
	pageTitle: (state, getters) => getters.pageInfo.title,
	// isMainPage: (state, getters) => (getters.pageInfo.name === constant.MAIN_PAGE || getters.pageInfo.name === constant.MAIN_TO_BE_PAGE),
	isMainPage: (state, getters) => (getters.pageInfo.name === constant.MAIN_PAGE || getters.pageInfo.name === constant.MAIN_PAGE_S || getters.pageInfo.name === constant.MAIN_PAGE_C || getters.pageInfo.name === constant.MAIN_PAGE_U),
	isAllMenu: (state, getters) => constant.ALL_MENU.some(allMenu => allMenu == getters.pageInfo.name),
	beforePageInfo: state => state.beforePageInfo || {},
	isFirstPage: (state) => (state.pageList || []).length < 2, // 히스토리가 없는경우 (첫 페이지)
	isAlreadyOpenMainPage: state => state.isAlreadyOpenMainPage, //MAMA1008 이 1번만 열렸는지 확인 처리
	mainTabLastIdx: state => state.mainTabLastIdx, //MAMA1008 탭 마지막 index
	// isTobePage: state => state.isTobePage, //TO-BE 화면
}

// actions
const actions = {
	// 페이지 이동시 호출
	setPageInfo({commit}, params) {
		commit('setPageInfo', params)
	},
	// header 에서 이전 페이지 눌렀을때
	removePageInfo({commit, getters}) {
		return new Promise((resolve) => {
			// v4
			// const pageList = getters.pageList || []
			// //const before = pageList[pageList.length -2] || {}
			// const before = pageList[pageList.length > 1 ? pageList.length - 2 : pageList.length - 1] || {} //TO-BE Header 변경에 따른 내역
			// console.log('>>> before >>> ', before)
			// const current = _.last(pageList)
			// const disabledList = [] // 페이지 리스트 중에서 disableHistory가 연속으로 있는 Array
			// let gap = -1

			// if (before.disableHistory) {
			// 	pageList
			// 		.concat()
			// 		.reverse()
			// 		.some((d, i) => {
			// 			if (i > 0 && !d.disableHistory) { 
			// 				return true
			// 			}
			// 			if (d.disableHistory) {
			// 				disabledList.push(d)
			// 			}
			// 		})
					
			// 	if (!current.disableHistory) { // 현재 페이지가 disableHistory가 없는 경우
			// 		disabledList.push(current)
			// 	}

			// 	const index = pageList.length - disabledList.length - 1
			// 	const item = pageList[index] || {}
				
			// 	if (item.name === current.name) { // 이전 페이지와 현재 페이지가 같은 경우
			// 		disabledList.push(item)
			// 		//gap = -2 //TO-BE Header 변경에 따른 내역
			// 		gap = -1
			// 	}
			// } else {
			// 	disabledList.push({})
			// }

			// commit('removePageInfo', {current, disabledList})
			// resolve(gap)


			const pageList = getters.pageList || []
			const before = pageList[pageList.length -2] || {}
			const current = _.last(pageList)
			const disabledList = [] // 페이지 리스트 중에서 disableHistory가 연속으로 있는 Array
			let gap = -1

			if (before.disableHistory) {
				pageList
					.concat()
					.reverse()
					.some((d, i) => {
						if (i > 0 && !d.disableHistory) { 
							return true
						}
						if (d.disableHistory) {
							disabledList.push(d)
						}
					})
					
				if (!current.disableHistory) { // 현재 페이지가 disableHistory가 없는 경우
					disabledList.push(current)
				}

				const index = pageList.length - disabledList.length - 1
				const item = pageList[index] || {}
				
				if (item.name === current.name) { // 이전 페이지와 현재 페이지가 같은 경우
					disabledList.push(item)
					gap = -2
				}
			} else {
				disabledList.push({})
			}

			commit('removePageInfo', {current, disabledList})
			resolve(gap)
		})
	},
	setMainFirstOpen({commit}, data){
		commit('setMainFirstOpen', data)
	},
	setMainTabLastIdx({commit}, data){
		commit('setMainTabLastIdx', data)
	},
	setTobePage({commit}, data){
		commit('setTobePage', data)
	},
	removeAllPage({commit}) {
		commit('removeAllPage')
	},
}

// mutations
const mutations = {
	setPageInfo (state, data) {
		console.log("setPageInfo",state.pageList );
		// 이전 페이지 정보
		state.beforePageInfo = _.last(state.pageList)
		// 페이지 라스트 추가
		state.pageList.push(data)
		// 50개 넘어가면 앞에서 부터 하나씩 제거
		if (state.pageList.length > 50) {
			state.pageList.shift()
		}
	},
	removePageInfo (state, data) {
		const disabledList = data.disabledList || []
		const current = data.current || {}

		state.beforePageInfo = current

		disabledList.forEach(() => { // disableHistory가 최신 페이지 정보에서 연속으로 있는 Array
			state.pageList.pop()
		})
	},
	setMainFirstOpen(state, data=true){
		state.isAlreadyOpenMainPage = data
	},
	setMainTabLastIdx(state, data){
		state.mainTabLastIdx = data
	},
	// setTobePage(state, data){
	// 	state.isTobePage = data
	// }
	removeAllPage(state){
		console.log("removeAllPage>>>>>>");
		state.pageList = [];
	}
}

// state
const state = {
	beforePageInfo: {}, // 이전 페이지 정보
	pageList: [], // 페이지 정보
	isAlreadyOpenMainPage: false, //최초에 한번만 자산수집을 위한 플래그
	mainTabLastIdx: 0, // MAMA1008 탭 마지막 index
	// isTobePage: true // TO-BE 화면
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true,
}
