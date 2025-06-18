/*
상수 선언 script
*/
export default {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  UPDATE: 'update',
  DELETE: 'delete',
  COMMON: {
    VERSION: 'v1.0'
  },
  FORMAT: {
    DATE: 'YYYY.MM.DD',
    NUMBER: '0,000',
  },
  //ALERT_CONFIRM_TEXT: '확인',
  //ALERT_CANCEL_TEXT: '취소',
  ALERT_TEXT : '확인',
  ALERT_CONFIRM_TEXT: '예',
  ALERT_CANCEL_TEXT: '아니오',
  MODAL: {
    SELECT_MODAL: {
      LABEL_FIELD: 'comnCnm'
    }
  },
  STORAGE: {
    LOGIN_CERT: 'LOGIN_CERT',
    LOGIN_FORM: 'LOGIN_FORM',
  },
  MESSAGE: {
    START_SCRAPING: '자산 업데이트가 진행 중입니다.',
    END_SCRAPING: '자산 업데이트가 완료되었습니다.',
    START_GATHER_ASSETS: '자산 업데이트가 진행 중입니다.',
    END_GATHER_ASSETS: '자산 업데이트가 완료되었습니다.',
    DURING_GATHER_ASSETS: '자산 업데이트가 진행 중입니다. 잠시만 기다려주세요.',
    ERROR_GATHER_ASSETS: '자산 업데이트시 오류가 발생하였습니다.',
  },
  

  /**
   * 상호금융 NH콕마이데이터 4.0 추진 
   * 큰글씨 메인 추가 MAMA4S01
   * 청소년모드 메인 추가 MAMA4C01
   * 2025-01-01 CS540683
   */
  MAIN_PAGE: 'MAMA4001', // 통합메인 (고토화 수정)
  MAIN_PAGE_S: 'MAMA4S01', // 큰글모드 통합메인
  MAIN_PAGE_C: 'MAMA4C01', // 청소년모드 통합메인
  MAIN_PAGE_U: 'MAMA4U01', // 미가입자 통합메인 

  /**
   * 상호금융 NH콕마이데이터 4.0
   * 전체메뉴
   */
  // ALL_MENU: 'MRMR4001',
  // ALL_MENU_S: 'MRMR4S01',
  // ALL_MENU_C: 'MRMR4C01',
  ALL_MENU: [
    'MRMR4001',
    'MRMR4S01',
    'MRMR4C01',
  ],

  APP_ERROR_PAGE: 'COCO1125', // APP 오류 페이지
  SERVICE_ERROR_PAGE: 'COCO1114', // 서비스 오류 페이지
  SERVICE_READY_PAGE: 'COCO1115', // 서비스 준비 페이지 404에러
  LOADING_DURATION: 500, // 로딩바 삭제할때 지연 시간 (화면 이동시 첫번째 뜨는 로딩에만 적용) (밀리세컨)
  TOAST_DURATION: 3000, // 토스트 메뉴 hide 시간 (밀리세컨)
  SESSION_TIME: 1000*60*8, // 세션 유지 시간 5->8분 (밀리세컨)
  SB_SESSION_TIME : 1000*60*10, //스뱅 세션유지시간 10분 (밀리세컨)
  COK_SESSION_TIME : 1000*60*10, //콕뱅 세션유지시간 10분 (밀리세컨)
  DEV_SESSION_TIME : 1000*60*30, //개발서버(pfm.nonghyup.com:9090) 세션유지시간 30분 (밀리세컨)
  DEV_SESSION_TIMER : 1000*60*28, //개발서버(pfm.nonghyup.com:9090) 세션타이머 유지시간 28분 (밀리세컨)
  SESSION_EXT_CAG_TIME : 1000*60*2, //세션 연장 호출 갭 타임 (밀리세컨)
  // OAUTH : 통합인증 002 API 접근토큰발급요청 시 필요한 상수.
  OAUTH: {
    AUTH_TYPE: '1',         // 본인확인 이용 여부  [0: 본인확인기관 이용, 1: 전자서명인증사업자이용]
    CONSENT_TYPE: '1',      // 전자서명 유형       [0:전자서명 원문에 서명(본인확인기관기본값), 1:전송요구내역 해시값에 서명(전자서명인증 사업자 기본값) ]
  },
  COK_AOS_APP_VERSION : '2.0.00', // 콕뱅 마이데이터 서비스 앱 최소버전 (aos)
  COK_IOS_APP_VERSION : '2.0.00', // 콕뱅 마이데이터 서비스 앱 최소버전 (ios)
  SB_AOS_APP_VERSION : '4.0.8', // 스뱅 마이데이터 서비스 앱 최소버전 (aos)
  SB_IOS_APP_VERSION : '2.2.1', // 스뱅 마이데이터 서비스 앱 최소버전 (ios)
}