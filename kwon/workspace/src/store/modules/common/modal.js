/**
 * config store
 */
// import types from '@/common/config/types'
import _ from 'lodash'
import constant from '@/common/config/constants'

// getters
const getters = {

  modalList: state => state.modalList || [],
  modalConfig: state => state.modalConfig,
  modalInfo: state => _.last(state.modalList) || {},
  modalComponent: state => state.modalComponent,
  modalAriaHidden: state => state.modalComponent ? 'false' : 'true',
  wrapAriaHidden: state => state.modalComponent ? 'true' : 'false',
  hasModal: state => (state.modalList || []).length > 0,
  hasLoading: state => state.isOpenLoading || (state.loadingList || []).length > 0,
  hasLoadingBackground: state => state.loadingBackground, // 로딩바 백그라운드 표시 여부
  toastList: state => state.toastList || [],
  toastMessage: state =>  (_.last(state.toastList) || {}).message,
  hasToast: state => (state.toastList || []).length > 0,

}

// actions
const actions = {
  openModal({commit}, data) {
    commit('openModal', data)
  },
  closeModal({commit}) {
    commit('closeModal')
  },
  closeAllModal({commit}) {
    commit('closeAllModal')
  },  
  // closeAllModalLeftMain({commit}) {
  //   commit('closeAllModalLeftMain')
  // },
  // 화면 이동시 호출
  openLoading({commit}) {
    commit('setLoadingBackground', true)
    commit('openLoading')
  },
  addLoading({commit}) {
    commit('addLoading')
  },
  removeLoading({commit}) {
    commit('removeLoading')
    commit('setLoadingBackground', false)
  },
  removeAllLoading({commit}) {
    commit('removeAllLoading')
  },
  setLoadingBackground({commit}, data) {
    commit('setLoadingBackground', data)
  },
  addToast({commit}, data) {
    commit('addToast', data)
    setTimeout(() => {
      commit('removeToast')
    }, constant.TOAST_DURATION)
  },
  removeToast({commit}) {
    commit('removeToast')
  },
}

// mutations
const mutations = {
  openModal(state, data) {
    // add scrol-off class on body tag
    state.modalList.length === 0 && document.body.classList.add('scroll-off')
    
    // 
    state.modalList.push(data)
    state.modalConfig = _.last(state.modalList) || {}
    state.modalComponent = state.modalConfig.component

  },
  closeModal(state) {
    // 
    state.modalList.pop()
    state.modalConfig = _.last(state.modalList) || {}
    state.modalComponent = state.modalConfig.component
    // remove scrol-off class on body tag
    state.modalList.length === 0 && document.body.classList.remove('scroll-off')

  },
  closeAllModal(state) {
    state.modalList = []
    state.modalConfig = {}
    state.modalComponent = null
    // remove scrol-off class on body tag
    state.modalList.length === 0 && document.body.classList.remove('scroll-off')

  },
  openLoading(state) {
    state.isOpenLoading = true
  },
  addLoading(state) {
    state.loadingList.push({})
  },
  removeLoading(state) {
    if (state.loadingBackground) { // 화면 진입시 최초로 열린 로딩바인 경우 loadingBackground 값이 true
      setTimeout(() => {
        state.loadingList.pop()
      }, constant.LOADING_DURATION)
    } else {
      state.loadingList.pop()
    }
    state.isOpenLoading = false
  },
  removeAllLoading(state) {
    state.loadingList = []
  },
  setLoadingBackground(state, data) {
    state.loadingBackground = data
  },
  addToast(state, data) {
    const isExist = state.toastList.find(d => d.message === data.message)
    if (!isExist) {
      state.toastList.push(data)
    }
  },
  removeToast(state) {
    state.toastList.shift()
  },
}

// state
const state = {
  modalList: [],
  modalConfig: {},
  modalComponent: null,
  isOpenLoading: false,
  loadingList: [],
  loadingBackground: false, // 로딩 백그라운드 보일지 여부
  toastList: [],
	beforeModalPageInfo: {}, // 이전 팝업 페이지 정보
	modalPageList: [], // 팝업 페이지 정보	  
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
