/**
 * 스크래핑 (은행)
 */

import store from '@/store'
import commonService from '@/service/commonService'
import {scrapingDate} from '@/utils/date.js'
import constant from '@/common/config/constants'
import scrapingService from '@/service/scrapingService.js'
import modalService from '@/service/modalService.js'

export default {

  /***********************************************************
   *
   * 비지니스 로직
   * 
   ***********************************************************/

  // 은행 전체 계좌 조회 및 거래내역 조회
  getAllBankInfo(info) {
    const params = this.getBankParams(info)
    const jobs = [
      this.getLoginJob(params),
      this.getNormalAccountListJob(params), // 수시전계좌조회
      this.getDepositAccountListJob(params), // 예적금계좌조회
      this.getFundAccountListJob(params), // 펀드계좌조회
      this.getLogoutJob(params),
    ]
    // 스크래핑 상태 관리 스토어 dispatch
    store.dispatch('scraping/requestScraping', params)
    // 토스트 메세지 (자산 업데이트 진행중입니다.)
    modalService.toast(constant.MESSAGE.START_SCRAPING)
    //
    return scrapingService.executeAll(jobs).then(
      response => {
        console.log('은행 전체 계좌조회 res', response)
        this.getAllBalance(response, info)
      },
      error => {
        console.log('은행 전체 계좌조회 error', error)
				store.dispatch('scraping/responseScraping', params)
      }
    )
  },

  // 전체 거래 내역 조회 (수시거래내역조회, 예적금거래내역조회)
  getAllBalance(response, info) {
    const params = this.getBankParams(info)
    const jobs = []
    // 수시거래내역조회 job push
    response
      .filter(d => Array.isArray(d.demandAccountList))
      .forEach(d => {
        d.demandAccountList.forEach(c => {
          const param = {
            module: d.job.Module,
            acno: c.acno,
          }
          jobs.push(this.getNormalTransactionJob(param, -2)) // 2 개월 전
          jobs.push(this.getNormalTransactionJob(param, -1)) // 1 개월 전 
          jobs.push(this.getNormalTransactionJob(param, 0)) // 이번달
        })
      })
    // 예적금거래내역조회 job push
    response
      .filter(d => !!d.depositAccountList)
      .forEach(d => {
        d.depositAccountList.forEach(c => {
          const param = {
            module: d.job.Module,
            acno: c.acno,
          }
          jobs.push(this.getDepositTransactionJob(param, -2)) // 2 개월 전
          jobs.push(this.getDepositTransactionJob(param, -1)) // 1 개월 전 
          jobs.push(this.getDepositTransactionJob(param, 0)) // 이번달
        })
      })

    jobs.unshift(this.getLoginJob(params)) // 첫번재에 로그인 추가
    jobs.push(this.getLogoutJob(params)) // 마지막에 로그아웃 추가
    
    // 실행
    return scrapingService.executeAll(jobs).then(
      response => {
        console.log('거래 내역 조회 성공', response)
				store.dispatch('scraping/responseScraping', params)
      },
      error => {
        console.log('거래 내역 조회 실패', error)
				store.dispatch('scraping/responseScraping', params)
      }
    )
  },

  // 거래내역조회 3개월
  getTransaction(info) {
    return info.fncAcDsc === '01' // 01: 수시거래, 02: 예적금
      ? this.getNormalTransaction(info) // 수시거래내역조회
      : this.getDepositTransaction(info) // 예적금거래내역조회
  },

  // 수시거래내역조회 3개월 잡 array
  getNormalTransaction(info) {
    const params = this.getBankParams(info)
    const jobs = [
      this.getLoginJob(params),
      this.getNormalTransactionJob(params, -2), // 2 개월 전
      this.getNormalTransactionJob(params, -1), // 1 개월 전 
      this.getNormalTransactionJob(params, 0), // 이번달
      this.getLogoutJob(params),
    ]
    return scrapingService.executeAll(jobs)
  },

  // 예적금거래내역조회 3개월 잡 array
  getDepositTransaction(info) {
    const params = this.getBankParams(info)
    const jobs = [
      this.getLoginJob(params),
      this.getDepositTransactionJob(params, -2), // 2 개월 전
      this.getDepositTransactionJob(params, -1), // 1 개월 전 
      this.getDepositTransactionJob(params, 0), // 이번달
      this.getLogoutJob(params),
    ]
    return scrapingService.executeAll(jobs)
  },

  // 예적금계좌조회 (사용안함)
  getAllDepositAccount(info) {
    const params = this.getBankParams(info)
    const jobs = [
      this.getLoginJob(params),
      this.getDepositTransactionJob(params),
      this.getLogoutJob(params),
    ]
    return scrapingService.executeAll(jobs)
  },

  // 펀드계좌조회 (사용안함)
  getAllFundAccount(info) {
    const params = this.getBankParams(info)
    const jobs = [
      this.getLoginJob(params),
      this.getFundAccountListJob(params),
      this.getLogoutJob(params),
    ]
    return scrapingService.executeAll(jobs)
  },

  // 은행 파라미터
  getBankParams(info) {
    const type = info.lkgMethc === '1'
      ? constant.STORAGE.LOGIN_CERT
      : constant.STORAGE.LOGIN_FORM
    const module = info.asetAmnFncorgC
    // const data = commonService.getStorage(type)[module] || {}
    const data = commonService.getScrapingAuth(type, module)
    const params = {
      ...info,
      module: module, // 금융기관코드
      loginType: info.lkgMethc === '1' ? 'CERT' : 'ID', // 연동방법코드 1: ID, 2: CERT
      id: data.id, // 아이디
      password: data.password, //비밀번호
      certKey: data.subjectDn, // 인증서 키
      certPassword: data.aesencdata, // 인증서 비밀번호
      expireDate: data.notAfter, // 인증서 비밀번호
      asetAmnCusno: store.state.user.userInfo.asetAmnCusno, //자산관리고객번호
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
      "Class": "개인뱅킹",
      "Job": "로그인",
      "Input": {
        "로그인방식": params.loginType,
        "사용자아이디": params.id,
        "사용자비밀번호": params.password,
        "구분": 'm',
        "인증서": {
          "이름": params.certKey,
          "만료일자": params.expireDate,
          "비밀번호": params.certPassword
        }
      }
    }
    return data
  },

  // 로그아웃
  getLogoutJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "개인뱅킹",
      "Job": "로그아웃",
      "Input": {}
    }
    return data
  },

  // 수시전계좌조회
  getNormalAccountListJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "개인뱅킹",
      "Job": "수시전계좌조회",
      "Input": {}
    }
    return data
  },

  // 수시거래내역조회
  getNormalTransactionJob(params={}, gap=0) {
    const date = scrapingDate(gap)
    const data = {
      "Module": params.module,
      "Class": "개인뱅킹",
      "Job": "수시거래내역조회",
      "Input": {
        "계좌번호": params.acno,
        "조회시작일": date.startDate,
        "조회종료일": date.endDate
      }
    }
    return data
  },

  // 예적금계좌조회
  getDepositAccountListJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "개인뱅킹",
      "Job": "예적금계좌조회",
      "Input": {}
    }
    return data
  },

  // 예적금거래내역조회
  getDepositTransactionJob(params={}, gap=0) {
    const date = scrapingDate(gap)
    const data = {
      "Module": params.module,
      "Class": "개인뱅킹",
      "Job": "예적금거래내역조회",
      "Input": {
        "계좌번호": params.acno,
        "조회시작일": date.startDate,
        "조회종료일": date.endDate
      }
    }
    return data
  },

  // 펀드계좌조회
  getFundAccountListJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "개인뱅킹",
      "Job": "펀드계좌조회",
      "Input": {}
    }
    return data
  },

  // 펀드거래내역조회 (사용안함)
  // getFundTransactionParam(params={}) {
  //   return appService.execute('MFSAS', 'runSASList', params)
  // },
}