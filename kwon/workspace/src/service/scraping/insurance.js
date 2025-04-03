/**
 * 스크래핑 (보험)
 */

import store from '@/store'
import commonService from '@/service/commonService'
import scrapingService from '@/service/scrapingService.js'
import modalService from '@/service/modalService.js'
import constant from '@/common/config/constants'

export default {

  /***********************************************************
   *
   * 비지니스 로직
   * 
   ***********************************************************/
  
   // 보험 전체 조회
  getAllInsuranceInfo(info) {
    console.log('>>>>>>>>>>>>>>>>> ', Object.assign({}, info))
    const params = this.getInsuranceParams(info)
    const jobs = [
      this.getLoginJob(params), // 로그인
      this.getContractJob(params), // 계약내용조회
      this.getLogoutJob(params), // 로그아웃
    ]
    // 스크래핑 상태 관리 스토어 dispatch
    store.dispatch('scraping/requestScraping', params)
    // 토스트 메세지 
    modalService.toast(constant.MESSAGE.START_SCRAPING)
    // 
    return scrapingService.executeAll(jobs).then(
      response => {
        console.log('보험 전체 조회 res', response)
				store.dispatch('scraping/responseScraping', params)
      },
      error => {
        console.log('보험 전체 조회 error', error)
				store.dispatch('scraping/responseScraping', params)
      }
    )
  },

  // 보험 파라미터
  getInsuranceParams(info) {
    const type = 'LOGIN_CERT' // 인증서 고정
    const module = info.asetAmnFncorgC
    // const data = commonService.getStorage(type)[module] || {}
    const data = commonService.getScrapingAuth(type, module)
    const params = {
      ...info,
      asetAmnCusno: store.state.user.userInfo.asetAmnCusno, //자산관리고객번호
      module: info.asetAmnFncorgC, // 금융기관코드
      loginType: 'CERT', //info.lkgMethc === '1' ? 'CERT' : 'ID', // 연동방법코드 1: ID, 2: CERT
      id: '', // 아이디
      password: data.password, //비밀번호
      certKey: data.subjectDn, // 인증서 키
      certPassword: data.aesencdata, // 인증서 비밀번호
      expireDate: data.notAfter, // 인증서 비밀번호
    }
    return params
  },

  /***********************************************************
   *
   * api
   * 
   ***********************************************************/

  // 로그인
  getLoginJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "개인보험",
      "Job": "로그인",
      "Input": {
        "로그인방식": params.loginType,
        "사용자아이디": "", //params.id,
        "사용자비밀번호": "", //params.password,
        "주민등록번호": "",
        "이름": "",
        "인증서": {
          "이름": params.certKey,
          "만료일자": params.expireDate,
          "비밀번호": params.certPassword
        }
      }
    }
    return data
  },

  // 계약내용조회
  getContractJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "개인보험",
      "Job": "계약내용조회",
      "Input": {
        "조회구분": "2", // “”:기본조회, “1”:상세조회, “2”:피보험자계약 상세조회, “M”:사이버창구계약조회(미래에셋 기관만 사용) 
      }
    }
    return data
  },

  // 로그아웃
  getLogoutJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "개인보험",
      "Job": "로그아웃",
      "Input": {}
    }
    return data
  },
}