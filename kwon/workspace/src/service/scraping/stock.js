/**
 * 스크래핑 (증권)
 */

import store from '@/store'
import commonService from '@/service/commonService'
import constant from '@/common/config/constants'
import scrapingService from '@/service/scrapingService.js'
import modalService from '@/service/modalService.js'
import {firstAndToday, dateFormat} from '@/utils/date.js'

export default {

  /***********************************************************
   *
   * 비지니스 로직
   * 
   ***********************************************************/

  // 증권 전체 조회
  getAllStockInfo(info) {
    const params = this.getStockParams(info)
    const jobs = [
      this.getLoginJob(params), // 로그인
      this.getAllAccountJob(params), // 증권보유계좌조회
      this.getLogoutJob(params), // 로그아웃
    ]
    // 스크래핑 상태 관리 스토어 dispatch
    store.dispatch('scraping/requestScraping', params)
    // 토스트 메세지 
    modalService.toast(constant.MESSAGE.START_SCRAPING)
    //
    return scrapingService.executeAll(jobs).then(
      response => {
        console.log('증권 전제조회 res', response)
        this.getAllBalance(response, info)
      },
      error => {
        console.log('증권 전체조회 error', error)
				store.dispatch('scraping/responseScraping', params)
      }
    )
  },

  // 전체 잔고 조회 (위탁잔고, 펀드잔고, CMA잔고)
  getAllBalance(response, info) {
    const jobs = []
    const params = this.getStockParams(info)
    response
      .filter(d => Array.isArray(d.securitiesHoldList))
      .forEach(d => {
        d.securitiesHoldList.forEach(c => {
          const param = {
            module: d.job.Module,
            acno: c.acno,
          }
          c.ivWrsAcDsc === '01' && jobs.push(this.getConsignBalanceJob(param)) // 위탁계좌
          c.ivWrsAcDsc === '02' && jobs.push(this.getFundBalanceJob(param)) // 펀드계좌
          c.ivWrsAcDsc === '05' && jobs.push(this.getCmaBalanceJob(param)) // CMA계좌
        })
      })

    jobs.unshift(this.getLoginJob(params)) // 첫번재에 로그인 추가
    jobs.push(this.getLogoutJob(params)) // 마지막에 로그아웃 추가
    
    // 실행
    return scrapingService.executeAll(jobs).then(
      response => {
        console.log('전체 잔고 조회 res', response)
				store.dispatch('scraping/responseScraping', params)
      },
      error => {
        console.log('전체 잔고 조회 error', error)
				store.dispatch('scraping/responseScraping', params)
      }
    )
  },

  // 증권 파라미터
  getStockParams(info) {
    const type = info.lkgMethc === '1'
      ? constant.STORAGE.LOGIN_CERT
      : constant.STORAGE.LOGIN_FORM
    const module = info.asetAmnFncorgC
    // const data = commonService.getStorage(type)[module] || {}
    const data = commonService.getScrapingAuth(type, module)
    const params = {
      ...info,
      module: info.asetAmnFncorgC, // 금융기관코드
      loginType: info.lkgMethc === '1' ? 'CERT' : 'ID', // 연동방법코드 1: ID, 2: CERT
      id: data.id, // 아이디
      password: data.password, //비밀번호
      certKey: data.subjectDn, // 인증서 키
      certPassword: data.aesencdata, // 인증서 비밀번호
      expireDate: data.notAfter, // 인증서 비밀번호
      startDate: firstAndToday().startDate, // 시작일 YYYYMMDD
      endDate: firstAndToday().endDate, // 종료일 YYYYMMDD
      yyyymm: dateFormat(new Date(), 'YYYYMM'), // 오늘 기준 YYYYMM
    }
    return params
  },
   
  /***********************************************************
   *
   * api
   * 
   ***********************************************************/

  // 로그인
  getLoginJob(params=[]) {
    const data = {
      "Module": params.module,
      "Class": "증권서비스",
      "Job": "로그인",
      "Input": {
        "로그인방식": params.loginType,
        "사용자아이디": params.id,
        "사용자비밀번호": params.password,
        "인증서": {
          "이름": params.certKey,
          "만료일자": params.expireDate,
          "비밀번호": params.certPassword
        }
      }
    }
    return data
  },

  // 증권보유계좌조회
  getAllAccountJob(params=[]) {
    const data = {
      "Module": params.module,
      "Class": "증권서비스",
      "Job": "증권보유계좌조회",
      "Input": {}
    }
    return data
  },

  // 위탁잔고조회
  getConsignBalanceJob(params=[]) {
    const data = {
      "Module": params.module,
      "Class": "증권서비스",
      "Job": "위탁잔고조회",
      "Input": {
        "계좌번호": params.acno,
        "계좌비밀번호": "" // 특정 증권사는 비밀번호를 게좌별로 요구 하는곳이 있음 (계좌별로 비밀번호 요구하는 곳은 어떻게 할지 아직 정해지지 않음)
      }
    }
    return data
  },

  // 펀드잔고조회
  getFundBalanceJob(params=[]) {
    const data = {
      "Module": params.module,
      "Class": "증권서비스",
      "Job": "펀드잔고조회",
      "Input": {
        "계좌번호": params.acno,
        "계좌비밀번호": "" // 특정 증권사는 비밀번호를 게좌별로 요구 하는곳이 있음 (계좌별로 비밀번호 요구하는 곳은 어떻게 할지 아직 정해지지 않음)
      }
    }
    return data
  },

  // CMA잔고조회
  getCmaBalanceJob(params=[]) {
    const data = {
      "Module": params.module,
      "Class": "증권서비스",
      "Job": "CMA잔고조회",
      "Input": {
        "조회구분": "",
        "계좌번호": params.acno,
        "계좌비밀번호": "" 
      }
    }
    return data
  },

  // 로그아웃
  getLogoutJob(params=[]) {
    const data = {
      "Module": params.module,
      "Class": "증권서비스",
      "Job": "로그아웃",
      "Input": {}
    }
    return data
  },
}