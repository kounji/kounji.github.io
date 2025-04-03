/**
 * 화면 진입을 위한 공통 스크립트.
 */
import router from '@/common/router'
import commonService from '@/service/commonService'
import store from '@/store'
import constant from '@/common/config/constants'

export default {
  
  /**
   * 메인 화면
   */
  moveMain() {
    // const isTobePage = store.state.layout.isTobePage ? true : false
    const userInfo = store.state.user.userInfo || {}
    const modeState = commonService.getStorage('usrInfoSet' + userInfo.chnl + userInfo.mydtCusno + 'V4')?.scrMode
    let mode = ''
    if(JSON.stringify(modeState) == '{}' || modeState == null || typeof modeState == undefined) {
      mode = 'N'
    } else {
      mode = modeState.mode
    }

    const config = {
      // name: isTobePage ? constant.MAIN_TO_BE_PAGE : constant.MAIN_PAGE, // 자산메인
      name: mode == 'S' ? constant.MAIN_PAGE_S : mode == 'C' ? constant.MAIN_PAGE_C : constant.MAIN_PAGE, // 자산메인
    }
    commonService.movePage(config)
  },
  
  /**
   * App 오류 화면
   */
  moveAppError(response) {
    const config = {
      name: constant.APP_ERROR_PAGE,
      params: {response}
    }
    commonService.movePage(config)
  },
  
  /**
   * 서비스 오류 화면
   */
  moveServiceError(response) {
    //모달화면이 존재할 경우 모달창을 닫는다.
    if (store.state.modal.modalList.length>0) {
      store.dispatch('modal/closeAllModal')
    }
    
    const config = {
      name: constant.SERVICE_ERROR_PAGE,
      params: {response}
    }
    commonService.movePage(config)
  },

    /**
   * 서비스 404 오류 화면
   */
  moveServiceReadyError(response) {
    const config = {
      name: constant.SERVICE_READY_PAGE,
      params: {response}
    }
    commonService.movePage(config)
  },

  /**
   * 이전 화면
   */
  movePrev() {
    store
      .dispatch('layout/removePageInfo')
      .then(gap => {
        console.log('gap', gap)
        router.go(gap) // history back
      })
  },
  
  /**
   * 다음 화면
   */
  moveNext(gap=1) {
    router.go(gap)
  },

  /**
   * 팝업 닫기 (안드로이드 백 버튼 누르면 실행됨)
   */
  closePopup() {
    // 2021.07.08 팝업 내 close버튼 접근 후 click event 실행
    let el = document.querySelectorAll('.btn_close')
    el[el.length-1].click()
    //store.dispatch('modal/closeModal')
  },

  /**
   * 메인화면 최초 진입시 이동할 화면
   * 고객 타입으로 페이지 분기 (userInfo.cusTpc)
   */
  getDefaultPage() {
    
    const userInfo = store.state.user.userInfo || {}
    const cusTpc = userInfo.cusTpc
    let screen = userInfo.screen
    const hasScreen = commonService.findPageItem({name: screen})
    let page = constant.MAIN_PAGE // 메인화면

    ///// NH콕마이데이터 4.0 /////
    // 모드 별 메인화면 분기처리
    const modeState = commonService.getStorage('usrInfoSet' + userInfo.chnl + userInfo.mydtCusno + 'V4')?.scrMode
    if(JSON.stringify(modeState) == '{}' || modeState == null || typeof modeState == undefined) {
      page = constant.MAIN_PAGE
    } else {
      page = modeState.mode == 'C' ? constant.MAIN_PAGE_C : modeState.mode == 'S' ? constant.MAIN_PAGE_S : constant.MAIN_PAGE
    }

    console.log('routerService getDefaultPage', cusTpc, screen, hasScreen, userInfo)
    //////////////////////////////////////////////////////
    // userInfo.cusTpc : 고객구분코드
    // 1 : 신규고객
    // 2 : 기존고객, 약관동의필요 고객 (=> 약관을 재동의 받아야하는 고객)===>(사용안함. 2021.10.22)
    // 3 : 기존고객, 일부약관동의필요 고객 (=> 재동의 하였으나 추가약관 동의 필요 고객)
    // 4 : 기존고객, 약관동의완료 고객. (정상)
    //////////////////////////////////////////////////////
    if(screen === "PGAS0001" || screen === "ASCR1101" || screen === "MREV2010" || screen === "MREV2030" || screen === "MREV2011"){  //이전 메인 화면명으로 현재 메인화면 명으로 치환 , 2023.10.13 한성철과장 요청  (MAMA1008 추가)
      //screen = "MAMA2001"
      screen = "MAMA4001" //상호금융 NH콕마이데이터 4.0 추진 개발 메인
    }

    if (cusTpc === '1') { // 미가입고객

      /////////////////// CBT ///////////////////
      //page = "COAS2001"
      page = "MAMA4U01" // 미가입자 모드
      
      /**
       * NH콕마이데이터4.0 신규
       * 미가입자 전용 페이지 이동
       */
      

      /*
      <<asis>>
      page = "COAS0001" // 서비스 소개
      <<tobe>>
      page = "COAS2001" // 서비스 소개
      */
      /////////////////// CBT ///////////////////

    }
    else if (cusTpc === '2' || cusTpc === '3') { // 약관 재동의 /일부 미동의 고객
      // page = "COAS1002" // 약관목록
      page = "COAS2104" // 약관재동의
    }
    else if (cusTpc === '4' && screen && hasScreen) { // 정상 고객 & 스뱅에서 화면 번호를 받은 경우
      page = screen
    }


    return page
  },

  
  /**
   * 샘플 화면
   */
  moveSample() {
    const config = {
      name: 'home', // 자산메인
    }
    commonService.movePage(config)
  },
  /**
   * 샘플 화면
   */
  movePilot() {
    const config = {
      name: 'PI0001', // 자산메인
    }
    commonService.movePage(config)
  },

  /* 심사용으로 만들어 놓은 LoginPage*/
  moveLogin(){
    sessionStorage.clear()
    location.href = '/login.html'
  }
}
