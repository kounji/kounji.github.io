/**
 * scraping store
 */
 
import configService from '@/service/configService'
import constant from '@/common/config/constants'
import scrapingService from '@/service/scrapingService'
import modalService from '@/service/modalService.js'

// getters
const getters = {
	targetList: state => state.targetList || [],	// 자산 스크래핑 대상기관정보
	scrapingList: state => state.scrapingList || [],	// 스크래핑 하고있는 리스트
	isRunning: state => (orgDsc, asetAmnFncorgC) => {
		// console.log('____________isRinning', Object.assign({}, state.scrapingList), {orgDsc, asetAmnFncorgC})
		const list = state.scrapingList
			.filter(d => d.orgDsc === (orgDsc || d.orgDsc))
			.filter(d => d.asetAmnFncorgC === (asetAmnFncorgC || d.asetAmnFncorgC))
		return list.length > 0
	},
	isNongHyupRunning: state => state.isNongHyupRunning,
	target: (state, getters) => asetAmnFncorgC => getters.targetList.find(d => d.asetAmnFncorgC === asetAmnFncorgC)
}

// actions
const actions = {

	// app 초기화시 실행 (main.js 에서 호출)
  initScrapingConfig({dispatch, rootGetters}) {
    return new Promise((resolve) => {

			/**
			 * 자산관리 서비스에 정상적으로 가입된 고객만 스크래핑을 실행
			 */
			const userInfo = rootGetters['user/userInfo']
			const isNormalUser = userInfo.cusTpc === '0' // 0: 정상고객
			
			// 스크래핑 대상기관정보 조회
			configService.getScrapingTarget().then(
				response => {
					dispatch('setScrapingTarget', response)

					// import.meta.env.VITE_ENV === 'R' && isNormalUser && dispatch('getAllScrapingJob')
					isNormalUser && dispatch('getAllScrapingJob')
					resolve()
					// isNormalUser && dispatch('getAllScrapingJob')
				}
			)
			
			resolve()
    })
	},

	// 전체 스크래핑
	getAllScrapingJob({getters, dispatch, commit}) {
		const targetList = getters.targetList || []
		const hasTarget = targetList.length > 0
		const promiseList = [
			dispatch('getNongHyupData'), 	// 농축협 계좌조회
			configService.saveKcdData() 	// 신용정보 조회 
		]
		
		modalService.toast(constant.MESSAGE.START_SCRAPING) // 토스트 메세지 (자산 업데이트 진행중입니다.)

		Promise.all(promiseList).then(
			() => {
				if (hasTarget) { // 스크래핑 대상기관이 있는경우 스크래핑 대상기관의(target) 전체 스크래핑을 호출
					targetList.forEach(d => scrapingService.getInfoByOrgDsc(d))
				}
				else { // 스크래핑 대상기관이 없는 경우
					modalService.toast(constant.MESSAGE.END_SCRAPING)
					commit('completeNongHyupData')
				}
			},
			() => {
				modalService.toast(constant.MESSAGE.END_SCRAPING)
				commit('completeNongHyupData')
			}
		)
	},

	// 예금 전체 조회
	// asetAmnFncorgC 값이 있으면 특정 기관만 조회
	getAllBankInfo({getters, dispatch, commit}, asetAmnFncorgC) {
		console.log('scraping.js : 예금 전체 조회')
		if (getters.targetList.length === 0 || asetAmnFncorgC === 'nonghyup' || asetAmnFncorgC === 'nongchukhyup') {
			// 토스트 메세지 (자산 업데이트 진행중입니다.)
			modalService.toast(constant.MESSAGE.START_SCRAPING)
			// 농축협 계좌 조회 dispatch
			dispatch('getNongHyupData').then(() => {
				// 토스트 메세지 (자산 업데이트 완료되었습니다.)
				modalService.toast(constant.MESSAGE.END_SCRAPING)
				//
				commit('completeNongHyupData')
			})
		}
		else {
			// 농축협 계좌 조회 dispatch
			dispatch('getNongHyupData').then(() => {
				// 스크래핑 계좌 조회
				getters.targetList
					.filter(d => d.orgDsc === '10')
					.filter(d => d.asetAmnFncorgC === (asetAmnFncorgC || d.asetAmnFncorgC)) // 파라미터에 기관코드가 넘어오면 해당 기관만 스크래핑
					.forEach(d => scrapingService.bank.getAllBankInfo(d))
				//
				commit('completeNongHyupData')
			})
		}
	},

	// 카드 전체 조회
	// asetAmnFncorgC 값이 있으면 특정 기관만 조회
	getAllCardInfo({getters}, asetAmnFncorgC) {
		console.log('scraping.js : 카드 전체 조회')
		getters.targetList
			.filter(d => d.orgDsc === '20')
			.filter(d => d.asetAmnFncorgC === (asetAmnFncorgC || d.asetAmnFncorgC))
			.forEach(d => scrapingService.card.getAllCardInfo(d))
	},

	// 증권 전체 조회
	// asetAmnFncorgC 값이 있으면 특정 기관만 조회
	getAllStockInfo({getters}, asetAmnFncorgC) {
		console.log('scraping.js : 증권 전체 조회')
		getters.targetList
			.filter(d => d.orgDsc === '30')
			.filter(d => d.asetAmnFncorgC === (asetAmnFncorgC || d.asetAmnFncorgC))
			.forEach(d => scrapingService.stock.getAllStockInfo(d))
	},

	// 보험 전체 조회
	// asetAmnFncorgC 값이 있으면 특정 기관만 조회
	getAllInsuranceInfo({getters}, asetAmnFncorgC) {
		console.log('scraping.js : 보험 전체 조회')
		getters.targetList
			.filter(d => d.orgDsc === '40')
			.filter(d => d.asetAmnFncorgC === (asetAmnFncorgC || d.asetAmnFncorgC))
			.forEach(d => scrapingService.insurance.getAllInsuranceInfo(d))
	},

	// 연금 전체 조회
	// asetAmnFncorgC 값이 있으면 특정 기관만 조회
	getAllEstimateInfo({getters}, asetAmnFncorgC) {
		console.log('scraping.js : 연금 전체 조회')
		getters.targetList
			.filter(d => d.orgDsc === '50')
			.filter(d => d.asetAmnFncorgC === (asetAmnFncorgC || d.asetAmnFncorgC))
			.forEach(d => scrapingService.pension.getAllEstimateInfo(d))
	},

	// 농협 계좌 조회
	getNongHyupData({commit}) {
		return new Promise((resolve) => {
			commit('setNongHyupData', true)
			// 농축협 계좌 조회
			configService.getNonghyupAccount().then(
				() => {
					commit('setNongHyupData', false)
					resolve()
				}
			)
		})
	},

	// 스크래핑 요청
	requestScraping({commit}, params) {
		console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ : requestScraping', params)
		commit('requestScraping', params)
	},

	// 스크래핑 완료
	responseScraping({commit, getters}, params) {
		console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ : responseScraping', params)
		commit('responseScraping', params)
		
		if ((getters.scrapingList || []).length === 0) {
			console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ : completeScraping', params)
			commit('completeScraping', params)
			// 토스트 메세지 (자산 업데이트가 완료되었습니다.)
			modalService.toast(constant.MESSAGE.END_SCRAPING)
		}
	},

	// 스크래핑 대상기관정보
	setScrapingTarget({commit}, params) {
		// configService.getScrapingTarget().then
		commit('setTargetList', params)
    // return new Promise((resolve, reject) => {
		// 	configService.getScrapingTarget().then(
		// 		response => {
		// 			console.log('자산 스크래핑 대상기관정보 :: ', response)
		// 			resolve()
		// 			commit('setTargetList', response)
		// 		},
		// 		error => reject(error)
		// 	)
		// })
	}
}

// mutations
const mutations = {
	// 자산 스크래핑 대상기관정보
	setTargetList(state, data) {
		state.targetList = data.targetList || []
	},

	// 스크래핑 request
	requestScraping(state, data) {
		const value = {
			orgDsc: data.orgDsc, // 자산 타입
			asetAmnFncorgC: data.asetAmnFncorgC, // 금융기관코드
		}
		state.scrapingList.push(value)
	},

	// 스크래핑 response
	responseScraping(state, data) {
		const orgDsc = data.orgDsc || ''
		const asetAmnFncorgC = data.asetAmnFncorgC || ''
		state.scrapingList = state.scrapingList.filter(d => {
			if (asetAmnFncorgC) { // 모듈이 있으면 모듈만 비교
				return d.asetAmnFncorgC !== asetAmnFncorgC
			} else { // 자산타입만 비교
				return d.orgDsc !== orgDsc
			}
		})
	},

	// 모든 스크래핑 완료
	completeScraping(state, data) {
		console.log('모든 스크래핑 완료', state), data
	},

	// 농축협 계좌 조회
	setNongHyupData(state, data) {
		state.isNongHyupRunning = data
	},

	// 농축협 계좌 조회 완료
	completeNongHyupData(state) {
		state.isNongHyupRunning = false
	},
}

// state
const state = {
	targetList: [], // 자산 스크래핑 대상기관정보
	scrapingList: [], // 스크래핑 결과 상태값
	isNongHyupRunning: false, // 농협 조회중 여부
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true,
}
