/**
 * layout store
 */ 
import userService from '@/service/userService'
import {isChild, isChildV4} from '@/utils/date'

// getters
const getters = {
	userInfo: state => state.userInfo || {}, // 사용자 정보
	custNo: state => state.userInfo.custNo, // 사용자 아이디
	isMacoYn: state => state.userInfo.macoYn === '1', // 조합원 여부
	isMacoAuthYn: state => state.userInfo.macoAuthYn === '1', // 조합원 권한여부 
	isSBank : state => state.userInfo.chnl === '385',	//스뱅 385, 콕뱅 386
	mydtCusno: state => state.userInfo.mydtCusno,	// 마이데이타 고객 번호 
	initialSessionTime: state => state.userInfo.initialSessionTime, //스뱅 콕뱅 세션 연장시 세션타임 초기화값
	isChild: (state, getters) => { // 19세여부 (19세미만 체크)
		const birth = getters.userInfo.usrBirth || ''
		return isChild(birth)
	},
	isLoginSuccess: (state, getters) => {
		return getters.userInfo.cusTpc === '4' // 정상 로그인 여부
	},
	isNHAccountYn : (state, getters) => {
		return getters.userInfo.totAchldYn === '1' // 농축협계좌보유여부
	},

	//TO-Be 약관관련 Store처리
	//사용자 약관 동의 이후 기본 가입 정보
	userTermsAgreeList: state => state.userTermsInfo.agreeList || [],

	//1년내 재가입시의 권유직원/거래지점 정보
	userTermsInvtInfo: state => state.userTermsInfo.invtInfo || {},

	//정보수신동의정보 (동의여부, 이메일주소)
	userRecvInfo : state => state.userRecvInfo || {},

	/*
	* 신용정보(신용점수,신용등급) add 2021.11.22
	*/
	getMyCreditInfo : state => state.myCreditInfo || {},

	////////////////////////
	// NH콕마이데이터4.0 신규
	////////////////////////
	isChildV4: (state, getters) => { // 14세여부 (14세미만 체크)
		const birth = getters.userInfo.usrBirth || ''
		return isChildV4(birth)
	},
	/**
	 * 유저 모드 설정값
	 */
	getUserMode : state => state.userMode || 'N',
	/**
	 * 신규알람여부
	 */
	getNewAlarm : state => state.newAlarm || 'N',
}

// actions
const actions = {

  	initUserConfig({commit}) {
		return new Promise((resolve, reject) => {
			userService.initUserInfo().then(
				response => {
					commit('setUserInfo', response)
					resolve()
				},
				error => {
					reject(error)
					console.error(error)
				}
			)
		})
	},
	
	//
	setUserInfo({commit}, params) {
		commit('setUserInfo', params)
	},
	addAgreeTermInfo({commit}, params) {
		commit('addAgreeTermInfo', params)
	},
	removeAllAgreeTermInfo({commit}) {
		commit('removeAllAgreeTermInfo')
	},
	setUserTermInvtInfo({commit}, params) {
		commit('setUserTermInvtInfo', params)
	},
	setUserRecvAgrInfo({commit}, params) {
		commit('setUserRecvAgrInfo', params)
	},
	removeUserRecvAgrInfo({commit}, params) {
		commit('removeUserRecvAgrInfo', params)
	},

	/*
	* 신용정보(신용점수,신용등급) add 2021.11.22
	*/
	setMyCreditInfo({commit}, params) {
		commit('setMyCreditInfo', params)
	},

	////////////////////////
	// NH콕마이데이터4.0 신규
	////////////////////////
	/**
	 * 마이데이터 모드값 저장
	 */
	setUserMode({commit}, params) {
		commit('setUserMode', params)
	},
	/**
	 * 신규알람여부 저장
	 */
	setNewAlarm({commit}, params) {
		commit('setNewAlarm', params)
	}
}

// mutations
const mutations = {
	setUserInfo (state, data) {
		state.userInfo = data
	},
	/*
	* 약관정보 저장
	*/
	addAgreeTermInfo(state, data) {
		//약관정보 저장
		state.userTermsInfo.agreeList.push(data)
	},
	/*
	* 약관정보 초기화
	*/
	removeAllAgreeTermInfo(state) {
		//전체 초기화
		state.userTermsInfo.agreeList = []
	},

	/*
	* 재가입시 권유정보(권유자, 권유지점)
	*/
	setUserTermInvtInfo(state, data) {
		//데이터 초기화
		state.userTermsInfo.invtInfo = {}
		state.userTermsInfo.invtInfo = data
	},

	/*
	* 정보수신동의 정보(동의여부, email주소)
	*/
	setUserRecvAgrInfo(state, data) {
		state.userRecvInfo = data
	},
	removeUserRecvAgrInfo(state) {
		//전체 초기화
		state.userRecvInfo = {}
	},

	/*
	* 신용정보(신용점수,신용등급) add 2021.11.22
	*/
	setMyCreditInfo(state, data) {
		state.myCreditInfo = data
	},

	////////////////////////
	// NH콕마이데이터4.0 신규
	////////////////////////
	/**
	 * 마이데이터 모드값 저장
	 */
	setUserMode(state, data) {
		state.userMode = data
	},
	/**
	 * 신규알람여부 저장
	 */
	setNewAlarm(state, data) {
		state.newAlarm = data
	},
}

// state
const state = {
	userInfo: {},
	userTermsInfo: {
		agreeList   : [], //약관동의 항목
		invtInfo    : {}, //권유직원, 권유거래지점
	},
	userRecvInfo : {},	//정보수신동의정보
	myCreditInfo : {},	//신용정보(신용점수,신용등급) add 2021.11.22
	userMode : '',	// 마이데이터 모드
	newAlarm : '',	// 신규알람여부
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true,
}
