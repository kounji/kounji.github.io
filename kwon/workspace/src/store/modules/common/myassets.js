/**
 * layout store
 * 업권 <industry> 값
   은행 bank
   카드 card
   금융투자 invest
   보험 insu
   전자금융 efin
   할부금융 capital
   보증보험 (서울보증보험) ginsu
   통신 telecom
 */ 

import apiService from '@/service/apiService'
import {dateFormat} from '@/utils/date'

// getters
const getters = {
	isMyAssetGathering: state => state.isMyAssetGathering,
	lastUpdateDtm: state => state.lastUpdateDtm || dateFormat(new Date(), "YYYY.MM.DD HH:mm:ss"),
	myAssetsBzRgCnt: state => state.myAssetsBzRgCnt || 0,	//자산연결기관건수
	myAssetInfo: state => state.myAssetInfo || {},			//메인 전체 자산 정보 2022.08.03
	myAssetsBzrgList: state => state.myAssetsBzrgList || [],	//자산연결기관목록
  nacfAccChg: state => state.nacfAccChg,
}

// actions
const actions = {
	// app 초기화시 실행 (main.js 에서 호출)
	initMyAssetGathering({dispatch, rootGetters}) {
		return new Promise((resolve) => {
			/**
			 * 자산관리 서비스에 정상적으로 가입된 고객만 전체 수집을 실행
			 */
			const userInfo = rootGetters['user/userInfo']
			const isNormalUser = userInfo.cusTpc === '4' // 4: 정상고객 - 재가입
			console.log('isNormalUser', isNormalUser, userInfo)

			isNormalUser && dispatch('getAllMyAssetInfo')
			resolve()
		})
	},
	// 2024.01.09,sungchul,자산요구 직후 비정기 수집
	getAllMyAssetInfoByFirst({commit,rootGetters}) {
		return new Promise((resolve) => {
			commit('setMyAssetGatherData', true)

			//비정기 자산 정보 수집처리
			const userInfo = rootGetters['user/userInfo']
			
			let config = {
				url : "/co/ma/01r03",
				data : {
					mydtCusno : userInfo.mydtCusno,
					org_Code  : "0000000000",
					x_api_type: "user-consent"
				}
			}

			const myBizRegInfoConfig = {
				url : '/co/am/08r02', // /co/am/05rb2
				data : {mydtCusno : userInfo.mydtCusno},
			}

			apiService.call(myBizRegInfoConfig).then((response)=>{
				commit('setMyAssetsBzrgCnt', response.bzrgCnt)

				apiService.assetGather(config).then(()=>{
					commit('completeMyAssetGatherData')
					commit('setMyAssetGatherDate')
					resolve()
				}).catch(()=>{
					commit('completeMyAssetGatherData')
				})
			})
		})
	},
	getAllMyAssetInfo({commit,rootGetters}) {
		return new Promise((resolve) => {
			commit('setMyAssetGatherData', true)

			//비정기 자산 정보 수집처리
			const userInfo = rootGetters['user/userInfo']
			
			let config = {}
			config = {
				// url : "/co/ma/01ra2,"
				url : "/co/ma/01r03",
				data : {
					mydtCusno : userInfo.mydtCusno,
					org_Code  : "0000000000",
					x_api_type: "user-refresh"
				},
				disableLoading : true,
			}
			const myBizRegInfoConfig = {
				url : '/co/am/08r02', //'/co/am/05rb2', // "/co/am/05r01",
				data : {mydtCusno : userInfo.mydtCusno},
				disableLoading : true,
			}
			apiService.call(myBizRegInfoConfig).then((response)=>{
				commit('setMyAssetsBzrgCnt', response.bzrgCnt)

				apiService.assetGather(config).then(()=>{
					commit('completeMyAssetGatherData')
					commit('setMyAssetGatherDate')
					resolve()
				}).catch(()=>{
					commit('completeMyAssetGatherData')
				})
			})
		})
	},
	/*
	* 자산연결기관정보 조회 2021.11.15
	*/
	getMyBizRegInfo({commit,rootGetters}) {
		return new Promise((resolve, reject) => {
			const userInfo = rootGetters['user/userInfo']

			const config = {
				url : "/co/am/08r01",
				data : {mydtCusno : userInfo.mydtCusno},
				disableLoading : true,
			}
			apiService.call(config).then(
				response => {
					commit('setMyAssetsBzrgList' , response.bzrgList)
					commit('setMyAssetsBzrgCnt', response.bzrgCnt)
					resolve()
				},
				error => {
					reject(error)
					console.error(error)
				}
			)
		})
	},

	/**
	 * 메인 전체 자산 정보 2022.08.03
	 */
	getMyAssetInfo({commit}, data) {
		commit('setMyAssetInfo', data)
	},
  
  //중앙회 자산 변경 상태 2022.08.03
	setNacfAccChg({commit}, data) {
    commit('setNacfAccChg', data)
  },
}

// mutations
const mutations = {

	// 자산수집 요청
	setMyAssetGatherData(state, data) {
		state.isMyAssetGathering = data
	},
	// 자산수집 완료일시
	setMyAssetGatherDate(state) {
		state.lastUpdateDtm = dateFormat(new Date(), "YYYY.MM.DD HH:mm:ss")
	},
	// 자산수집 완료
	completeMyAssetGatherData(state) {
		state.isMyAssetGathering = false
	},

	// 자산연결기관정보 2021.11.15
	setMyAssetsBzrgCnt(state, data) {
		state.myAssetsBzRgCnt = data
	},

	// 자산연결기관정보 목록 2023.08.16
	setMyAssetsBzrgList(state, data) {
		state.myAssetsBzrgList = data
	},

	/**
	 * 메인 전체 자산 정보 2022.08.03
	 */
	setMyAssetInfo(state, data) {
		state.myAssetInfo = data
	},

	/**
	 * 중앙회 자산 변경 상태 2022.08.03
	 */
	setNacfAccChg(state, data) {
		state.nacfAccChg = data
	}
}

// state
const state = {
	/*
		industry code, 
		업권 <industry> 값
		은행 bank
		카드 card
		금융투자 invest
		보험 insu
		전자금융 efin
		할부금융 capital
		보증보험 (서울보증보험) ginsu
		통신 telecom
		 [{각업종구분,기관코드}]
		 {"industryCode":null, "orgCode":null, "orgName":null}
	*/
	isMyAssetGathering: false, //자산 수집중
	lastUpdateDtm : '',
	myAssetsBzRgCnt : 0, //자산연결기관정보 2021.11.15
	
	myAssetInfo : {},           //메인 전체 자산 정보 2022.08.03
	myAssetsBzrgList : [], //자산연결기관정보 목록 2023.08.16
  nacfAccChg : false,
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true,
}
