/********************************************************************
 * @업무명		: 	공통
 * @설명			:	
 * @파일명		:	commuication.js
 * @기존명		:
 *********************************************************************
 * 번호	작업자	작업일		변경내용
 *--------------------------------------------------------------------
 * 1    
 * 
 *********************************************************************/

import store from '@/store'
import {startSessionTimer, clearSessionTimer} from '@/utils/date'
import routerService from '@/service/routerService'
import appService from '@/service/appService'
import modalService from '@/service/modalService'

// 로그인 연장 팝업호출 시 (app resume 시)
window.nsCall_logoutCountRedo = function() {
//  console.log('channel window.nsCall_logoutCountRedo')
  if(!appService.applicationSessionCheck())
  {
    console.log('communication Session Log OUT applicationSessionCheck ######')
    let existsSessionAlert = false
    for (let i=0; i < store.state.modal.modalList.length; i++)
    {
      console.log(' nsCall_logoutCountRedo ==> ', (store.state.modal.modalList[i].params.title!==undefined)?store.state.modal.modalList[i].params.title:'')
      if(store.state.modal.modalList[i].params.title!==undefined && store.state.modal.modalList[i].params.title === '세션만료') 
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
  }  
}

// 로그인 연장 팝업에서 '로그아웃' 버튼 선택시 실행
window.nsCall_fn_logout = function() {
  window.fg.of.exec(function(r) {}, "NHCProgressView", "show", []); 
  window.fg.of.exec(function(r) {}, "SBView", "navigateFromGNB", ["fn_logout()"]);
}

// 로그인 연장 팝업에서 '로그인 연장' 버튼 선택시 실행
window.nsCall_logoutCountInit = function() {
  console.log('################### window.nsCall_logoutCountInit call ###################')
  //store.dispatch('config/extendSession')
  startSessionTimer()

}

// 자동로그아웃 페이지에서 '다시 로그인하기'
window.nsCall_fn_login = function() {
  window.fg.of.exec(function(r) {}, "SBView", "navigateFromGNB", ["fn_logout()"]);
}

// 전체메뉴(네이티브) 에서 메뉴 항목 클릭시 
window.nsCall_gnbMenu = function(obj) {
  var script = 'nsCall_gnbMenu(' + JSON.stringify(obj) + ');';
  window.fg.of.exec(function(r) {}, "SBView", "navigateFromGNB", [script]);
}

// 전체메뉴(네이티브) 에서 메뉴 '닫기' 클릭시 
window.nsCall_closeGNBCallback = function() {
  window.fg.of.exec(function(r) {}, "NHCProgressView", "hide", []);
}

// 안드로이드 'back key'
window.onBackPressed = function() {
  // 20210316 예외처리 추가
  // TODO: 팝업 close, 화면 history back
  /*
  try {
    console.log('안드로이드 back', store)
    store.dispatch('config/androidBackClick')
  } catch (e) {
    window.fg.of.exec(function() {}, 'NHCProgressView', 'hide', [])
  }
  */
  console.log('안드로이드 back', store)

  //가입완료/재동의완료 화면일때는 메인으로 이동 처리.
  const ignorePageList = ['COAS0007','COAS0010']  
  
  const pageName = store.getters["layout/pageName"]
  
  if(ignorePageList.indexOf(pageName) > -1) {
    routerService.moveMain()
  } else {
    store.dispatch('config/androidBackClick')
  } 
}

// 키패드가 보여지는 경우 (안드로이드만 해당)
window.onIMEIshow = function(obj) {
  // obj.DisplayHeight    // (Number): 0.000... ~ 1 사이의 값.  보여지는 화면 높이의 퍼센테이지 값(1 이 100%)
}

// 키패드가 닫히는 경우 (안드로이드만 해당)
window.onIMEIhide = function() {
  
}

// 안드로이드에서 키패드 입력 모드 변경 (키패드 나왔을때 남은 공간만큼 웹뷰를 줄인다)
// setTimeout(() => {
//   if (window.fg && window.fg.of) {
//     if (window.fg.of.getUserAgent() === 'android') {
//       window.fg.of.exec(function() {}, "SBAppManager", "setSoftInputMode", ["in"])
//     }
//     window.fg.of.exec(function() {}, 'NHCProgressView', 'hide', [])
//   }
// }, 2000)

// 콕뱅크 세션만료로 로그아웃 처리
window.cokSessionLogout = function(){
  // clearSessionTimer()
  console.log('콕뱅크 세션만료 테스트 ... ')
  clearSessionTimer()
  // appService.moveMain()
}

// 콕뱅크 세션 연장
window.cokSessionExtend = function(){
  startSessionTimer()
}

