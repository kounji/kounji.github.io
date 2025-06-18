/**
 * 화면 진입을 위한 공통 스크립트.
 */
import router from '@/common/router'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import store from '@/store'
import constant from '@/common/config/constants'
import {isChild, isChildV4, isTolda} from '@/utils/date'
import commonMixin from '@/common/mixins/commonMixin'

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
    let screen = userInfo.screen || ''
    const hasScreen = commonService.findPageItem({name: screen})
    let page = constant.MAIN_PAGE // 메인화면
    console.log('>>>>>>> getDefaultPage >>>>>>>> ', screen)

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

    //////////////////////////////////////////////////////
    // NH콕마이데이터4.0 신규
    // 청소년고객 여부에따른 콕뱅/스뱅 전체메뉴 특정화면 진입 처리
    // 기존 메인페이지 이동 시 4.0 메인페이지 강제이동처리
    //////////////////////////////////////////////////////
    screen = screen === "MAMA2001" ? '' : screen
    if(screen && hasScreen) {
      screen = this.setScreenPage()
    }

    if (cusTpc === '1') { // 미가입고객

      /////////////////// CBT ///////////////////
      //page = "COAS2001"
      // page = "MAMA4U01" // 미가입자 모드
      
      console.log("@@@@@@@ usrBirth ->", userInfo.usrBirth)
      console.log("@@@@@@@ isTolda ->", isTolda(userInfo.usrBirth))

      commonMixin.methods.setScrmode('U') // 미가입자
      if(userInfo.tolda) {          // 청소년(만14세 ~ 만18세) 여부 확인    값이 없으면 false (not 청소년)
        page = "COGU4C01"           // 청소년모드
      } else {                      // 19세 미만 체크   값이 없으면 false (어른)
        page = "COGU4001"           // 일반모드
      }
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

    // NH콕마이데이터4.0 신규) 로그인 시 정상고객일 경우 수집자산목록 조회
    if(cusTpc === '4') {
      apiService.loginAssetGather()
    }

    return page
  },

  /**
   * NH콕마이데이터4.0 신규
   * 콕뱅/스뱅 화면ID별 이동경로 설정
   */
  setScreenPage() {
    const userInfo = store.state.user.userInfo || {}
    let screen = userInfo.screen || ''
    // 정상 고객인 경우에만 이동화면 설정
    if(userInfo.cusTpc !== '4') return screen

    if(!userInfo.tolda) { // 청소년 아닌 고객일 시에만 특정화면 선택 진입
      if(screen === "PGAS0001" || 
        screen === "ASCR4101" || 
        screen === "MREV2010" || 
        screen === "MREV2030" || 
        screen === "MREV2011" ||
        screen === "MREV2000" ||
        screen === "MRLO4001" ||
        screen === "MREV4041" ||
        screen === "OXTP0001" ||
        screen === "COCO1104" || 
        screen === "COCO4116" ||
        screen === "MAGU4001" || 
        screen === "MAGU4S01" ||
        screen === "MAGU4C01"){  //이전 메인 화면명으로 현재 메인화면 명으로 치환 , 2023.10.13 한성철과장 요청  (MAMA1008 추가)
        //screen = "MAMA2001"
        screen = "MAMA4001" //상호금융 NH콕마이데이터 4.0 추진 개발 메인
      }

      // NH콕마이데이터4.0 신규)
      // 콕뱅/스뱅 모드별 화면ID진입 시 마이데이터 모드 설정변경
      const screenValid = screen.length == 8 && (/^[a-zA-Z]{4}/).test(screen) ? true : false // 화면ID 유효성 검증
      const exceptScreen = ['MAGU4001', 'MAGU4S01', 'MAGU4C01'] // 예외화면ID (서비스 소개)
      const currentMode = commonMixin.methods.getScrmode().mode
      const modeDsc = screen[5] == 'S' ? 'S' : screen[5] == 'C' ? 'C' : 'N'
      console.log('>>>>>>> setScreenPage >>>>>>>> ', screen)
      if(screenValid && !exceptScreen.some(d => d === screen)) {
        if(currentMode !== modeDsc) {
          // modalService.alert('원할한 NH콕마이데이터(자산관리) 서비스 이용을 위해 모드가 변경됩니다.')
          store.dispatch('modal/addModAlert')

          // 화면ID 구분별 모드 설정
          if(modeDsc === 'S') {
            commonMixin.methods.setScrmode('S') // 큰글
          } else if(modeDsc === 'C') {
            commonMixin.methods.setScrmode('C') // 청소년
          } else {
            commonMixin.methods.setScrmode('N') // 일반
          }
        }
      }
    } else {  // 진입계정이 청소년일 경우 일반/큰글 화면 진입 불가처리
      const screenValid = screen.length == 8 && (/^[a-zA-Z]{4}/).test(screen) ? true : false // 화면ID 유효성 검증
      const exceptScreen = ['MAMA4C01', 'ASTA4C01', 'LCTA4C01']

      commonMixin.methods.setScrmode('C')
      if(screenValid && !exceptScreen.some(d => d === screen)) {
        // 청소년 메뉴가 아닌 메뉴진입 시 청소년메인 이동
        screen = "MAMA4C01"
      }

    }
    return screen

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
