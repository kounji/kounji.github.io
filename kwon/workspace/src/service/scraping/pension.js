/**
 * 스크래핑 (연금)
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
  
   // 연금 전체 조회
  getAllEstimateInfo(info) {
    const params = this.getEstimateParams(info)
    const jobs = [
      this.getLoginJob(params), // 로그인
      this.getEstimateAmountJob(params), // 예상연금액조회
      this.getLogoutJob(params), // 로그아웃
    ]
    // 스크래핑 상태 관리 스토어 dispatch
    store.dispatch('scraping/requestScraping', params)
    // 토스트 메세지 
    modalService.toast(constant.MESSAGE.START_SCRAPING)
    //
    return scrapingService.executeAll(jobs).then(
      response => {
        console.log('연금 전체 조회 res', response)
        store.dispatch('scraping/responseScraping', params)
      },
      error => {
        console.log('연금 전체 조회 error', error)
				store.dispatch('scraping/responseScraping', params)
      }
    )
  },

  // 연금 파라미터
  getEstimateParams(info) {
    const type = constant.STORAGE.LOGIN_FORM
    const module = info.asetAmnFncorgC
    // const data = commonService.getStorage(type)[module] || {}
    const data = commonService.getScrapingAuth(type, module)
    const params = {
      ...info,
      module: info.asetAmnFncorgC, // 금융기관코드
      loginType: info.lkgMethc === '1' ? 'CERT' : 'ID', // “ID”: 아이디 로그인, “CERT”: 인증서 로그인, TODO: 받아서 처리
      id: data.id, // 아이디
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
      "Class": "연금정보조회",
      "Job": "로그인",
      "Input": {
        "로그인방식": params.loginType,
        "사용자아이디": params.id,
        "사용자비밀번호": params.password,
        "이름": "",
        "주민번호": "",
        "인증서": {
          "이름": params.certKey,
          "만료일자": params.expireDate,
          "비밀번호": params.certPassword
        }
      }
    }
    return data
  },

  // 예상연금액조회
  getEstimateAmountJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "연금정보조회",
      "Job": "예상연금액조회",
      "Input": {
        "모바일접속": "", // "미입력, 1":모바일환경 여부확인Y, "2":모바일환경 여부확인N
      }
    }
    return data
    
  },

  // 로그아웃
  getLogoutJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "연금정보조회",
      "Job": "로그아웃",
      "Input": {}
    }
    return data
  },
}