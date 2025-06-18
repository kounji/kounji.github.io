/**
* config store
*/
import store from '@/store'
import json from '@/assets/json/config.json'
import jsonV4 from '@/assets/json/configV4.json'
import types from '@/common/config/types'
import appService from '@/service/appService'
import configService from '@/service/configService'
import routerService from '@/service/routerService'

import {startSessionTimer, clearSessionTimer} from '@/utils/date'

import userService from '@/service/userService'
import {dateFormat} from '@/utils/date'
import modalService from '@/service/modalService'
import moment from 'moment'

import _ from 'lodash'
import constant from '@/common/config/constants'

// getters
const getters = {
  pages: state => state.pages,
  codeMap: state => state.code,
  device: () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    const agent = navigator.userAgent.toLowerCase();
    let type = 'mobile'
    if (!isMobile) type ='pcweb'
    if (agent.search('android') > -1) type ='android' 
    if (agent.search('iphone') > -1) type ='ios'
    return type
  },
}

// actions
const actions = {

  // 최초 앱 기동시 실행
  initAppConfig({commit}) {
    return new Promise((resolve) => {
        commit(types.CONFIG.SET_PAGES, [...json.pages, ...jsonV4.pages, ...json.sample])
        resolve()
        
        // configService.getCodeList().then(response => {
        //   commit(types.CONFIG.SET_CODE, response)
        //   }
        // )
    })
  },

  //공통코드 조회 분리
  initCommonCodeList({commit}){
    configService.getCodeList().then(response => {
      commit(types.CONFIG.SET_CODE, response)
      }
    )
  },
  // 안드로이드 Back key
  androidBackClick() {
    const hasModal = !!store.state.modal.modalComponent
    const pageList = store.state.layout.pageList || []
    const isFirstPage = pageList.length < 2
    const pageInfo = _.last(pageList) || {}
    const service = hasModal // 현재 화면이 모달인지 여부
      ? routerService.closePopup  // 팝업 닫기
      : routerService.movePrev // 해더 이전 클릭과 같은 기능
    
    // 20210316 예외처리 추가
    /*
    try {
      isFirstPage // 히스토리가 없으면 스뱅 메인화면으로 이동
      ? appService.moveMain()
      : service()
    } catch (e){
      window.fg.of.exec(function() {}, 'SBProgress', 'hideProgress', [])
    }
    */
    
    //팝업 리스트가 없을 경우만 메인서비스 호출 20210621
    // isFirstPage && !hasModal// 히스토리가 없으면 스뱅 메인화면으로 이동
    //     ? appService.moveMain()
    //     : service()

    const isMainPage = (pageInfo.name === constant.MAIN_PAGE || pageInfo.name === constant.MAIN_PAGE_S || pageInfo.name === constant.MAIN_PAGE_C)? true : false
    console.log('androidBackClick',isMainPage, isFirstPage, hasModal )
    if( (isMainPage || isFirstPage) && !hasModal)
    {
      if(!isMainPage){

        const cusTpc = store.state.user.userInfo.cusTpc
        if (cusTpc !== undefined && cusTpc === "4")
        {
          routerService.moveMain() //메뉴를 타고 들어오고 백버튼을 눌렀을 경우 메인처리
        } else {
          appService.moveMain()
        }

      }else{
        appService.moveMain()
      }
      
    }else{
      service()
    }
  },

  // 세션연장
  extendSession() {
    console.log('extendSession #######################################')
    //Application Session Check
    const chnl = store.state.user.userInfo.chnl //스뱅 385, 콕뱅 386
    const currentDate = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

    if (chnl !== undefined && store.state.user.userInfo.initialSessionTime !== undefined)
    {
      const initialSessionTime = store.state.user.userInfo.initialSessionTime
      const sessionTimeDiff = moment(currentDate).diff(initialSessionTime)
      
      let sessionTimeLimit = 0
      //SB_SESSION_TIME : 1000*60*10, //스뱅 세션유지시간 10분 (밀리세컨)
      //COK_SESSION_TIME : 1000*60*10, //콕뱅 세션유지시간 10분 (밀리세컨)
      if(import.meta.env.VITE_ENV === 'D') {
        sessionTimeLimit = constant.DEV_SESSION_TIME
      }else if(chnl === '386'){
        sessionTimeLimit = constant.COK_SESSION_TIME
      }else{
        sessionTimeLimit = constant.SB_SESSION_TIME
      }

      console.log('session time diff ',currentDate, initialSessionTime, moment(currentDate).diff(initialSessionTime), sessionTimeLimit)
      
      //세션유지시간이 세션타임보다 길 경우 강제 로그아웃 처리
      if (sessionTimeDiff > sessionTimeLimit)
      {
        //modalService.alert("세션이 만료되었습니다. 재로그인 해주시기 바랍니다.").then(()=>{
          let existsSessionAlert = false
          for (let i=0; i < store.state.modal.modalList.length; i++)
          {
            // console.log(' nsCall_logoutCountRedo ==> ', (store.state.modal.modalList[i].params.title!==undefined)?store.state.modal.modalList[i].params.title:'')
            
            if(store.state.modal.modalList[i].params && store.state.modal.modalList[i].params.title!==undefined && store.state.modal.modalList[i].params.title === '세션만료') 
            {
              existsSessionAlert = true
              break
            }
          }
      
          if (!existsSessionAlert){
            sessionStorage.clear()
            modalService.alert("장시간 미사용으로 종료되었습니다.<br>재로그인 해주시기 바랍니다", "세션만료","확인").then(response=>{
              console.log('세션만료 alert 처리', response)
              if (response === '확인'){
                clearSessionTimer()
                appService.moveMain()
              }
            })
          }
      }else{
        //세션 체크 GAP TIME 보다 클 경우 세션 연장 호출 -> 시간 체크 할 필요없이 항상 세션 연장하도록. 20220812 sbw
        // const sessionExtGapTime = constant.SESSION_EXT_CAG_TIME
        // console.log('session time Gap diff ',currentDate, initialSessionTime, moment(currentDate).diff(initialSessionTime), sessionExtGapTime)
        // if (sessionTimeDiff > sessionExtGapTime)
        // {
        //   console.log('Session EXT Func Call ####')
        //   if(chnl !== undefined && chnl === '386')
        //   {
        //     // 콕뱅 로그인 세션 연장 실행 (콕뱅 App 개발 후 주석 제거 필요)
        //     appService.cokBankRefreshSession()
        //   }else{
        //     // 스뱅 로그인 세션 연장 실행
        //     appService.extendLoginSession()
        //   }
        // }else{
        //   console.log('Session EXT Func Call Pass ####')
        // }
        console.log('Session EXT #####')
        if(chnl !== undefined && chnl === '386')
        {
          // 콕뱅 로그인 세션 연장 실행 (콕뱅 App 개발 후 주석 제거 필요)
          appService.cokBankRefreshSession()
        }else{
          // 스뱅 로그인 세션 연장 실행
          appService.extendLoginSession()
        }
      }

    }else{
      console.log('Session EXT First Func Call ####')
      //세션 연장 함수 호출
      if(chnl !== undefined && chnl === '386')
      {
        // 콕뱅 로그인 세션 연장 실행 (콕뱅 App 개발 후 주석 제거 필요)
        appService.cokBankRefreshSession()
      }else{
        // 스뱅 로그인 세션 연장 실행
        appService.extendLoginSession()
      }      
    }

    if(chnl !== undefined)
    {
      //세션연장 호출시 세션 타임 초기화
      store.state.user.userInfo.initialSessionTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    }

    //세션스토리지 등록
    const sessionUserInfo = userService.getLoginSession()
    if(sessionUserInfo !== undefined)
    {
      sessionUserInfo.initialSessionTime = store.state.user.userInfo.initialSessionTime
      sessionStorage.setItem('userInfo', JSON.stringify(sessionUserInfo))
    }

    // 타이머 초기화
    startSessionTimer()
  },

  //세션연장 호출시 세션 타임 초기화 
  //communications에서 호출 될 경우 exten체크가 안될 경우가 있기 때문 (스뱅용)
  initialSessionTime(){
    const chnl = store.state.user.userInfo.chnl //스뱅 385, 콕뱅 386
    if(chnl !== undefined)
    {
      //세션연장 호출시 세션 타임 초기화
      store.state.user.userInfo.initialSessionTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    }    
  }

}

// mutations
const mutations = {
  [types.CONFIG.SET_PAGES](state, data) {
    state.pages = data
  },
  [types.CONFIG.SET_CODE](state, data) {
    state.code = data
  },

}

// state
const state = {
  pages: [],
  code: new Map(),
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
