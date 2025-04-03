// 2025 NATIVE 호출 함수 수정
/**
 * App (ios, android) 와 통신하기 위한 서비스
 */

import scrapingService from '@/service/scrapingService'
//import routerService from '@/service/routerService'
import store from '@/store'
import configService from '@/service/configService'

////////////////////////////////////////////////////////////
// app 세션 체크용 import
import moment from 'moment'
import {dateFormat} from '@/utils/date'
import constant from '@/common/config/constants'
////////////////////////////////////////////////////////////

let initSetSoftInputMode = false

export default {

  /***********************************************************
   *
   * api
   * 
   ***********************************************************/

  /**
   * 보안키패드 숨기기
   * var params = {"type":"text","maxLength":64,"title":"인증서 비밀번호","masking":1,"maxLengthOk":"Y","name":"certPasswd","length":64,"callbackFn":"callback","locale":"ko"};
   */
  hideKeyboard(params=[]) {
    return scrapingService.execute('NHCSafeKeyboard', 'hide', params)
  },

  /**
   * 전체메뉴 보이기
   */
  // showMenu() {
  //   // 
  //   // 20210302 GNB 연동 반영
  //   // 20240605 sungchul 콕뱅크 메뉴 이동 추가
  //   // 20250101, sungchul, 차세대 [스뱅/콕뱅] 전체메뉴 보기 없음
  //   //
  //   console.log('appService.showMenu Called');
  //   if ( store.state.user.userInfo.chnl == '385' ) {
  //     console.log('appService.showMenu::스뱅 메뉴 SHOW');
  //     const nowState = {
  //       IS_LOGIN: 'Y', // 로그인여부(추후 Y, N 구별 언요)
  //       SENIOR_MODE: 'N', // 큰글모드
  //       ONE_APP_TWO: "2", // 원앱투서비스 구분값 1: 은행, 2: 상호
  //       MARKET_JOONGJO: "2" // 주계좌 처리 중조구분값 : 1 농협은행, 2 지역농축협, 3 구축협, 4 가상계좌
  //     } 
  //     /* JSON.stringify(nowState) */
  //     //return scrapingService.execute('SBView', 'setView', ['GNB', JSON.stringify(nowState)])
  //     if(window.device == "android") {
  //       return scrapingService.execute('mydata.PFMView', 'setView', ['GNB', JSON.stringify(nowState)])
  //     } else {
  //       // sunhchul, 241018, 네이티브전환 웹뷰간이동 파라미터 변경
  //       // return scrapingService.execute('SBView', 'setView', ['GNB', JSON.stringify(nowState)])
        
  //       scrapingService.execute('SBView', 'setView', [{nextServiceId: "", viewMode: "READYWEB"}])

  //       const jsonParams = {
  //         nextServiceId: "",
  //         viewMode: "WEBVIEW"
  //       }
        
  //       return scrapingService.execute('SBView', 'setView', [jsonParams])
  //     }
  //   } else { // 콕뱅크
  //     console.log('appService.showMenu::콕뱅 메뉴 SHOW');
  //     return new Promise((resolve) => {
  //       const callback = response => {
  //           resolve(response)
  //       }
  //       window.$SMNATIVE.showMenu(callback)
  //     })
  //   }
    
  // },

  /**
   * 홈(메인) 화면 이동
   */
  moveMain(user) {
    console.log('스뱅으로 이동')
    //sessionStorage.clear()
    //return scrapingService.execute('SBView', 'navigateFromGNB', ['goHome()'])
    // return routerService.moveLogin()
    const userInfo = user ? user : store.state.user.userInfo || {}

    let chnl = userInfo.chnl
    // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
    // console.log('chnl ::: ', chnl)
    if(import.meta.env.VITE_ENV !== 'R' && window.location.host.indexOf('localhost') > -1 ) {
      location.href = '/login.html'
    }else{

    //   if(chnl === undefined || chnl === '')
    //   {
    //     const sessionUserInfo = configService.getLoginSession() // session에 담겨있는 정보
    //     chnl = sessionUserInfo.chnl
    //   }

      if(chnl === '386'){
        return this.cokBankGoHome()
      } else {
        return scrapingService.execute('SBView', 'navigateFromGNB', ['goHome()'])
      }

      /*
      if(chnl === '385'){
        sessionStorage.clear()
        return scrapingService.execute('SBView', 'navigateFromGNB', ['goHome()'])
      } else if(chnl === '386'){
        sessionStorage.clear()
        return this.cokBankGoHome()
      } else {
        return ''
      }
      */
     
    }
  },

  /*
  * 금융상품페이지 이동 (add 2021.11.01)
  */
  moveFinancialProductPage(urlInfo) {
    if(urlInfo === undefined || urlInfo === null || urlInfo === '') {
      return
    }
    console.log("appService.moveFinancialProductPage()", urlInfo)

    const userInfo = store.state.user.userInfo || {}

    //로칼이 아닐때만
    if(window.location.host.indexOf('localhost') === -1 ) {
      if(userInfo.chnl === '385') {
        //S-BANK
        let urlArray = unescape(urlInfo).split("&")
        let params = {}
        for (let urlParam of urlArray) {
          let item = urlParam.split("=")
          params[item[0]] = item[1]
        }

        const pageInfo = 'navigate( "SFBCA0020R", { psnFncWrsC:"' + params.psnFncWrsC + '", wrsC:"", serviceId:"", naac_dsc:"' + params.naac_dsc + '", nhType:"' + params.nhType + '"} )'

        window.fg.of.exec(function() {},"SBView","navigateFromGNB",[pageInfo]);

      } else {
        //C-BANK
        this.cokBankGoMove(urlInfo)
      }
    }
  },

  /**
   * 네이티브 로딩 보이기
   */
  showLoading() {
    return scrapingService.execute('NHCProgressView', 'show', [])
  },

  /**
   * 네이티브 로딩 숨기기
   */
  hideLoading() {
    return scrapingService.execute('NHCProgressView', 'hide', [])
  },

  /**
   * Http Request get - 네이티브 통해서 호출
   */
  httpGet(url) {
    const inputParam = {
      requestUrl: url,    // (String) 필수, 값부재시 오케스트라 결과 실패(1) 로 콜백
      requestHeader: {},  // (Object) 옵션
      requestBody: ""     // (String) 옵션
    }
    return scrapingService.execute('NHCHttp', 'get', inputParam)
  },

  /**
   * 스마트뱅킹 - 로그아웃
   */
  logoutSession() {
    return scrapingService.execute('NHCService', 'requestService', ['servlet/NSASP10002R.cmd'])
  },

  /**
   * 스마트뱅킹 - 로그인 세션 연장
   */
  extendLoginSession() {
    //return scrapingService.execute('NHCService', 'requestService', ['servlet/NSCMP2301R.cmd'])
    return scrapingService.execute('NHCService', 'extendSession', [])
  },

  /**
   * 스마트뱅킹 - 로그인 연장 팝업 호출
   */
  openPopupExtendLoginSession() {
    return scrapingService.execute('SBNativeUI', 'nativePopup', ["logoutCount", {"sessionRemainSec":60}])
  },

  /**
   * 스마트뱅킹 - 음성인식 마이크 권한확인
   */
  requestPermission(params={}) {
    return scrapingService.execute('mydata.PFMView', 'requestPermission', {"permission": "RECORD_AUDIO"})
  },
  /**
   * 스마트뱅킹 - 음성인식
  */
  showVoice(params={}) {
    return scrapingService.execute('mydata.SBPFMVoice', 'showVoice', {})
  },

  /**
   * 스마트뱅킹 - 권한 요청
   */
  exportExcel(params={}) {
    return scrapingService.execute('mydata.PFMView', 'excelExport', params)
  },

  /**
   * 공인인증서 목록 가져오기
   */
  getCertList(params=[]) {
    return scrapingService.execute('NHCJointCert', 'getCertificates', params)
  },
  /**
   * 인증서정보 보내기.
   */
  requestSign(params={}, type){
    return scrapingService.execute('mydata.PFMSign', 'requestSign', params, type)
  },
  /**
   * 네이버인증 CALL
   */
  requestSignAppToApp(params={}){
    return scrapingService.execute('mydata.PFMSign', 'requestSignAppToApp', params)
  },
    /**
   * 신규웹뷰 CALL (개별인증에서 사용)
   */
  openPopupWebView(url){
    console.log('openPopupWebView', url)
    return scrapingService.execute('mydata.PFMView', 'openPopupWebView', url)
  },
  /**
   * 개별인증 APP OPEN (개별인증에서 사용)
   */
//   openAuthAppToApp(params={}){
//     // console.log('openAuthAppToApp_scheme', scheme)
//     // console.log('openAuthAppToApp_installUrl', installUrl)
//     return scrapingService.execute('mydata.PFMView', 'authAppToApp', params)
//   },
    /**
   * 신규웹뷰 사설인증 Call
   */
  openPFMOFPFinCert(params={}){
    return scrapingService.execute('mydata.PFMSign', 'requestSignFinCert', params)
  }, 
  /**
   * PASS 신규웹뷰 사설인증 Call
   * kimhc_20220722
   */
  openPFMOFPFinCertPass(params={}){
    return scrapingService.execute('mydata.PFMSign', 'requestSignPass', params)
  },
  /**
   * NHCert 사설인증서 전자서명 요청
   * 2025.03.20, sungchul,
   */
  requestSignNHCert(params={}){
    return scrapingService.execute('mydata.PFMSign', 'requestSignNHCert', params)
  },
  /**
   * PASS 앱 설치 링크 URL 스뱅
   * kimhc_20220722
   */
  openPassMarketUrl(params={}){
    return scrapingService.execute('mydata.PFMSign', 'openMarket', params)
  },
  /**
   * 실행 플랫폼 정보 확인
   */
  getUserAgent() {
    return window.fg.of.getUserAgent()
  },

  /**
   * 앱 실행 및 스토어 이동
   */
  executeApp(params=[]) {
    return scrapingService.execute('NHCAppManager', 'launchApp', params)
  },

  /**
   * 외부 브라우저 이동
   */
  executeBrowser(params) {
    params = [{'url' : params}]
    return scrapingService.execute("NHCWeb", "openPage", params)
  },


  /**
   * 개별인증을 위한 웹뷰 팝업 열기
   * params : url 필수
   */
  executeWebViewPopup(params=[]){
    return scrapingService.execute("SBAppManager", "openFullPopup", params)
  },

  /**
   * 공인인증서 비밀번호 확인
   * var params = {subjectDN: "CN=조현철()0004043I000950335, OU=KMB, OU=personal4IB, O=yessign, C=kr", ppasswd: "StN+FVYDSj4hQv0="};
   */
  getCertPassConfirm(params={}) {
    // return scrapingService.execute('SBCert', 'getCertPassConfirm', params)
    return new Promise((resolve, reject) => {
      const callback = response => {
        response = scrapingService.parseResponse(response)
        const validResponse = scrapingService.checkResponse(response) // response 정상
        const validPassword = response.resultCode === 0 && response.result.resultCode === 'SUCCESS' // 비밀번호 인증 성공
        if (validResponse && validPassword) {
          resolve(response)
        }
        else {
          reject(response)
        }
      }
      window.fg.of.exec(
        callback,
        'NHCJointCert',
        'getCertPassConfirm',
        params
      )
    })
  },

  /**
   * 보안키패드 보이기 (비밀번호 입력시 사용)
   * var params = {"type":"text","maxLength":64,"title":"인증서 비밀번호","masking":1,"maxLengthOk":"Y","name":"certPasswd","length":64,"callbackFn":"callback","locale":"ko"};
   */
  showKeyboardForPassword(fn) {
      const params = {
        type: 'text',
        maxLength: 64,
        title: '인증서 비밀번호',
        masking: 1,
        maxLengthOk: 'Y',
        name: 'certPasswd',
        length: 64,
        callbackFn: 'callback',
        locale: 'k'
      }
      const callback = response => {
        response = scrapingService.parseResponse(response)
        fn(response)
        // const validResponse = scrapingService.checkResponse(response) // response 정상
        // const isOKButton = response.resultCode === 0 && response.result.type === '1' // 보안키패드에서 ok 버튼 클릭

        // if (validResponse && isOKButton) {
        //   resolve(response)
        // }
        // else if (!validResponse) {
        //   reject(response.errorMessage)
        // }
      }
      window.fg.of.exec(
        callback,
        'NHCSafeKeyboard',
        'show',
        params
      )
  },

  /**
   * 보안키패드 보이기(공인인증서 비밀번호/아이디 로그인 비밀번호 입력시 사용)
   * var params = {"type":"text","maxLength":64,"title":"인증서 비밀번호","masking":1,"maxLengthOk":"Y","name":"certPasswd","length":64,"callbackFn":"callback","locale":"ko"};
   */
  showKeyboard() {
    return new Promise((resolve, reject) => {
      const params = {
        type: 'text',
        maxLength: 64,
        title: '인증서 비밀번호',
        masking: 1,
        maxLengthOk: 'Y',
        name: 'certPasswd',
        length: 64,
        callbackFn: 'callback',
        locale: 'k'
      }
      const callback = response => {
        response = scrapingService.parseResponse(response)
        const validResponse = scrapingService.checkResponse(response) // response 정상
        const isOKButton = response.resultCode === 0 && response.result.type === '1' // 보안키패드에서 ok 버튼 클릭
        if (validResponse && isOKButton) {
          resolve(response)
        }
        else if (!validResponse) {
          reject(response.errorMessage)
        }
      }
      window.fg.of.exec(
        callback,
        'NHCSafeKeyboard',
        'show',
        params
      )
    })
    // return scrapingService.execute('SBSafeKeyboard', 'showKeyboard', params)
  },

  /**
	 * 스마트 뱅킹 메뉴 이동
	 * @param {*} svcId 
	 */
	moveSmartBanking(svcId) {
		window.fg.of.exec(
			"",
			"SBView",
			"navigateFromGNB",
			["navigate('"+svcId+"')"]
		);
  },

  /**
   * 스마트뱅킹 공동인증센터 메뉴 이동
   * @param {*} text 
   */
  goSmartBankingCertCenter() {
    this.moveSmartBanking("NSASP7001R")  // TOBE
  },
  
  /**
   * 금융상품 상세 페이지 이동
   */
  moveFinancialInstrument(text) {
    window.fg.of.exec(
      "",
      "SBView",
      "navigateFromGNB",
      [text]
    );
  },

  /**
	 * 안드로이드에서 키패드 입력 모드 변경 (키패드 나왔을때 남은 공간만큼 웹뷰를 줄인다)
	 */
	setSoftInputMode() {
    if (!initSetSoftInputMode) {
      initSetSoftInputMode = true
      setTimeout(() => {
        if (window.fg.of.getUserAgent() === 'android') {
          window.fg.of.exec(function() {}, "SBAppManager", "setSoftInputMode", ["in"])
        }
        window.fg.of.exec(function() {}, 'NHCProgressView', 'hide', [])
      }, 2000)
    }
  },

  /**
   * 콕뱅크 공인인증센터 바로가기
   */
  cokBankGoCertCenter() {
    let certCenterUrl = "CBCTP0000R"; 

    this.cokBankGoMove(certCenterUrl)
  },

  /**
   * 콕뱅크 공인인증서 목록 가져오기
   */
  cokBankGetCertList() {
    return new Promise((resolve) => {
      const callback = response => {
          resolve(response)
      }
      window.$SMNATIVE.getCertList(callback)
    })
  },
  /**
   * 콕뱅크 키패드 노출
   */
  cokBankShowKeyboard() {
    return new Promise((resolve, reject) => {
      const callback = response => {
        if(response.resultCode === 0){
          console.log('키보드 노출 후 확인용 resolve', response.resultCode)
          resolve(response)
        }else{
          console.log('키보드 노출 후 확인용 reject', response.resultCode)
          reject(response)
        }
          
      }
      window.$SMNATIVE.showKeyboard(callback)
    })
  },
  /**
   * 콕뱅크 인증서 비밀번호 확인.
   */
  cokBankGetCertPassConfirm(params={}) {
    return new Promise((resolve) => {
      const callback = response => {
          resolve(response)
      }
      window.$SMNATIVE.getCertPassConfirm(callback, params)
    })
  },
  /*
  * 콕뱅크 엑셀 내보내기
  * params{ title: String, data: String(base64), toastYn: String}
  * return{ Success: String }
  */
  cokBankExportExcel(params={}){
    return new Promise((resolve) => {
      const callback = response => {
          resolve(response)
      }
      window.$SMNATIVE.exportExcel(callback, params)
    })
  },
  /*
  * 콕뱅크 STT
  * params{ title: String, data: String(base64), toastYn: String}
  * return{ Success: String }
  */
  cokBankShowVoice(params={}){
    return new Promise((resolve) => {
      const callback = response => {
        if(response.result){
          jsonRes = JSON.parse(response.result)
          resolve(jsonRes)
        }else if(response.errorMessage){
          jsonRes = JSON.parse(response.errorMessage)
          reject(jsonRes)
        }          
      }
      window.$SMNATIVE.showVoice(callback)
    })
  },
  /*
  * 콕뱅크 권한 체크하기
  * params{ title: String, data: String(base64), toastYn: String}
  * return{ Success: String }
  */
  cokBankRequestPermission(params={}){
    return new Promise((resolve) => {
      const callback = response => {
          resolve(response)
      }
      window.$SMNATIVE.requestPermission(callback)
    })
  },
  /*
  * 콕뱅크 전자서명.
  */
  cokBankRequestSign(params={}){
    return new Promise((resolve) => {
      const callback = response => {
          resolve(response)
      }
      window.$SMNATIVE.requestSign(callback, params)
    })
  },
  /*
  * 로딩바 show
  */
  cokBankShowProgress(){
    return new Promise((resolve) => {
      const callback = response => {
          resolve(response)
      }
      window.$SMNATIVE.showProgress(callback)
    })
  },
  /*
  * 로딩바 hide
  */
  cokBankHideProgress(){
    return new Promise((resolve) => {
      const callback = response => {
          resolve(response)
      }
      window.$SMNATIVE.hideProgress(callback)
    })
  },
  
  /*
  * 콕뱅 홈으로.
  */
  cokBankGoHome(){
    console.log('appservice 콕뱅 서비스 호출')
    return new Promise((resolve) => {
      const callback = response => {
          resolve(response)
      }
      window.$SMNATIVE.goHome(callback)
    })
  },

  /*
  * 콕뱅 페이지 이동 처리.
  */
 cokBankGoMove(url=''){
  console.log('appservice 콕뱅 페이지 이동 서비스 호출')
    return new Promise((resolve) => {
      const callback = response => {
          resolve(response)
      }
      window.$SMNATIVE.goMove(callback, url)
    })
  },
  /*
  * 콕뱅 추가 웹뷰 호출
  */
  cokBankOpenPopupWebView(url){
    console.log('appservice 웹뷰 호출 서비스')
    return new Promise((resolve) => {
      const callback = response => {
          resolve(response)
      }
      window.$SMNATIVE.openPopupWebView(callback, url)
    })
    // console.log('openPopupWebView', url)
    // return scrapingService.execute('mydata.PFMView', 'openPopupWebView', url)
  },
  /*
  * 콕뱅 앱 호출(개별인증)
  */
 
 cokBankOpenAuthAppToApp(params={}){
  console.log('appservice 앱 호출 서비스')
  return new Promise((resolve) => {
    const callback = response => {
        resolve(response)
    }
    window.$SMNATIVE.authAppToApp(callback, params)
  })
  // console.log('openPopupWebView', url)
  // return scrapingService.execute('mydata.PFMView', 'openPopupWebView', url)
},
  /*
  * 콕뱅 외부브라우저 호출
  */
 cokBankOpenPopupWebBrowser(url){
  console.log('appservice 외부브라우저 호출 서비스')
  return new Promise((resolve) => {
    const callback = response => {
        resolve(response)
    }
    window.$SMNATIVE.openPopupWebBrowser(callback, url)
  })
 
  // console.log('openPopupWebView', url)
  // return scrapingService.execute('mydata.PFMView', 'openPopupWebView', url)
  },
  /*
  * 콕뱅 사설인증 웹뷰 호출
  */
 cokBankOpenPFMOFPFinCert(params={}){
    console.log('콕뱅 appservice 사설인증 웹뷰')
    return new Promise((resolve) => {
      const callback = response => {
          resolve(response)
      }
      window.$SMNATIVE.requestFinCert(callback, params)
      //window.$SMNATIVE.finCertRequest(callback, params)
    })
  },

 /*
  * PASS 콕뱅 사설인증 웹뷰 호출
  * kimhc_20220722
  */
  cokBankOpenPFMOFPPass(params={}){
    console.log('콕뱅 appservice 사설인증 웹뷰')
    return new Promise((resolve) => {
      const callback = response => {
          resolve(response)
      }
      window.$SMNATIVE.requestFinCertPass(callback, params)
    })
  },
  /**
   * NHCert 사설인증서 전자서명 요청
   * 2025.03.20, sungchul,
   */
  cokBankRequestSignNHCert(params={}){
    console.log('콕뱅 appservice:::cokBankRequestSignNHCert')
    return new Promise((resolve) => {
      const callback = response => {
        if(response.result){
          jsonRes = JSON.parse(response.result)
          resolve(jsonRes)
        }else if(response.errorMessage){
          jsonRes = JSON.parse(response.errorMessage)
          reject(jsonRes)
        }          
      }
      window.$SMNATIVE.requestSignNHCert(callback, params)
    })
  },

  /**
   * NHCert 사설인증서 전자서명 요청
   * 2025.03.20, sungchul,
   */
 cokBankRequestSignNHCert(params={}){
    console.log('콕뱅 appservice:::cokBankRequestSignNHCert')
    return new Promise((resolve) => {
      const callback = response => {
        if(response.result){
          jsonRes = JSON.parse(response.result)
          resolve(jsonRes)
        }else if(response.errorMessage){
          jsonRes = JSON.parse(response.errorMessage)
          reject(jsonRes)
        }          
      }
      window.$SMNATIVE.requestSignNHCert(callback, params)
    })
  },
 /*
  * PASS 앱 설치 링크 URL 
  * kimhc_20220722
  */
  cokBankOpenPassMarketUrl(params={}){
    console.log('콕뱅 PASS 앱 설치 링크 URL')
    return new Promise((resolve) => {
      const callback = response => {
          resolve(response)
      }
      window.$SMNATIVE.requestPassMarketUrl(callback, params)
    })
  },

  /*
  * 콕뱅 세션연장.
  */
 cokBankRefreshSession(){
  console.log('appservice 콕뱅 서비스 cokBankRefreshSession 호출')
  return new Promise((resolve) => {
    const callback = response => {
        resolve(response)
    }
    window.$SMNATIVE.refreshSession(callback)
  })
 },  

  /*
  * 콕뱅 햄버거 메뉴 오픈
  */
 cokShowMenu(){
  console.log('appservice 햄버거 메뉴클릭')
  return new Promise((resolve) => {
    const callback = response => {
        resolve(response)
    }
    window.$SMNATIVE.showMenu(callback)
  })
 },  

  //Application Session Check
  applicationSessionCheck(){
    console.log('######## applicationSessionCheck ############')
    const chnl = store.state.user.userInfo.chnl //스뱅 385, 콕뱅 386
    if (chnl !== undefined && store.state.user.userInfo.initialSessionTime !== undefined)
    {
      //
      const currentDate = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
      const initialSessionTime = store.state.user.userInfo.initialSessionTime
      const sessionTimeDiff = moment(currentDate).diff(initialSessionTime)
      
      let sessionTimeLimit = 0
      //SB_SESSION_TIME : 1000*60*10, //스뱅 세션유지시간 10분 (밀리세컨)
      //COK_SESSION_TIME : 1000*60*10, //콕뱅 세션유지시간 10분 (밀리세컨)
      //개발서버는 30분
      if(import.meta.env.VITE_ENV === 'D') {
        sessionTimeLimit = constant.DEV_SESSION_TIME
      }else if(chnl === '386'){
        sessionTimeLimit = constant.COK_SESSION_TIME
      }else{
        sessionTimeLimit = constant.SB_SESSION_TIME
      }

      //console.log('session time diff ',currentDate, initialSessionTime, moment(currentDate).diff(initialSessionTime), sessionTimeLimit)
      console.log('모달정보 : ', store.state.modal.modalInfo)
      //세션유지시간이 세션타임보다 길 경우 강제 로그아웃 처리
      if (sessionTimeDiff > sessionTimeLimit)
      {
        return false
      }else{
        return true  
      }
    }else{
      return true
    }
  },
  getSbAppVersion() {
    return new Promise((resolve) => {
      const callback = response => {
          response = scrapingService.parseResponse(response)
          resolve(response)
      }
      
      window.fg.of.exec(callback, "NHCApp", "getVersion", [])
    })
  },
  parseQueryString() {
    const params  = location.search.replace("?","")
    const list = params.split("&").filter(d => !!d)
    const obj = {}
    list.forEach(d => {
      const data = d.split('=')
      obj[data[0]] = decodeURIComponent(data[1])
    })
    return obj
  },
}