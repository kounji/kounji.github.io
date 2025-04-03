/**
 * 스크래핑 (카드)
 */
import store from '@/store'
import commonService from '@/service/commonService'
import {firstAndToday, dateFormat, scrapingDate} from '@/utils/date.js'
import constant from '@/common/config/constants'
import scrapingService from '@/service/scrapingService.js'
import modalService from '@/service/modalService.js'

export default {

  /***********************************************************
   *
   * 비지니스 로직
   * 
   ***********************************************************/

  // 카드 전체 조회
  getAllCardInfo(info) {
    const params = this.getCardParams(info)
    const jobs = [
      this.getLoginJob(params), // 로그인
      this.getCardListJob(params), // 카드목록조회
      this.getLogoutJob(params), // 로그아웃
    ]
    // 스크래핑 상태 관리 스토어 dispatch
    store.dispatch('scraping/requestScraping', params)
    // 토스트 메세지 
    modalService.toast(constant.MESSAGE.START_SCRAPING)
    //
    return scrapingService.executeAll(jobs).then(
      response => {
        console.log('카드 카드목록조회 res', response)
        this.getAllCardDetail(response, info)
      },
      error => {
        console.log('카드 카드목록조회 error', error)
				store.dispatch('scraping/responseScraping', params)
      }
    )
  },

  // 카드 상세 조회
  getAllCardDetail(response, info) {
    console.log(response)
    const params = this.getCardParams(info)
    const jobs = []
    const cardList = []
    response
      .filter(d => (d.cardHold || {}).cardHoldDetailList) // 보유카드가 있는지 체크
      .filter(d => Array.isArray(d.cardHold.cardHoldDetailList)) // 보유카드가 있는지 체크
      .filter(d => d.cardHold.cardHoldDetailList.forEach(c => cardList.push(c)))
    
    // 보유카드
    cardList.forEach(d => {
      const param = {
        ...params,
        bccdDsnm: d.bccdDsnm || "", // BC카드 경우 카드이름
      }
      jobs.push(this.getTransactionJob(param, -2)) // 승인내역 (2 개월 전)
      jobs.push(this.getTransactionJob(param, -1)) // 승인내역 (1 개월 전)
      jobs.push(this.getTransactionJob(param, 0)) // 승인내역 (이번달)
      jobs.push(this.getChargeJob(param)) // 청구내역
      jobs.push(this.getEstimatePaymentJob(param)) // 결제예정금액
      jobs.push(this.getPerformanceJob(param)) // 실적충족내역
    })

    jobs.unshift(this.getLoginJob(params)) // 첫번재에 로그인 추가
    jobs.push(this.getLogoutJob(params)) // 마지막에 로그아웃 추가

    store.dispatch('scraping/requestScraping', params)
    return scrapingService.executeAll(jobs).then(
      response => {
        console.log('카드 상세 조회 res', response)
				store.dispatch('scraping/responseScraping', params)
      },
      error => {
        console.log('카드 상세 조회 error', error)
				store.dispatch('scraping/responseScraping', params)
      }
    )
  },

  // 카드 상세 조회
  // getAllCardDetail(response, info) {
  //   console.log(response)
  //   const params = this.getCardParams(info)
  //   const jobs = [
  //     this.getLoginJob(params), // 로그인
  //     this.getTransactionJob(params, -2), // 승인내역 (2 개월 전)
  //     this.getTransactionJob(params, -1), // 승인내역 (1 개월 전)
  //     this.getTransactionJob(params, 0), // 승인내역 (이번달)
  //     this.getChargeJob(params), // 청구내역
  //     this.getEstimatePaymentJob(params), // 결제예정금액
  //     this.getPerformanceJob(params), // 실적충족내역
  //     this.getLogoutJob(params), // 로그아웃
  //   ]
  //   store.dispatch('scraping/requestScraping', params)
  //   return scrapingService.executeAll(jobs).then(
  //     response => {
  //       console.log('카드 상세 조회 res', response)
	// 			store.dispatch('scraping/responseScraping', params)
  //     },
  //     error => {
  //       console.log('카드 상세 조회 error', error)
	// 			store.dispatch('scraping/responseScraping', params)
  //     }
  //   )
  // },

  // 카드 파라미터
  getCardParams(info) {
    const type = info.lkgMethc === '1'
      ? constant.STORAGE.LOGIN_CERT
      : constant.STORAGE.LOGIN_FORM
    const module = info.asetAmnFncorgC
    // const data = commonService.getStorage(type)[module] || {}
    const data = commonService.getScrapingAuth(type, module)
    const params = {
      ...info,
      asetAmnCusno: store.state.user.userInfo.asetAmnCusno,
      module: info.asetAmnFncorgC,
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
  getLoginJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "개인카드",
      "Job": "로그인",
      "Input": {
        "로그인방식": params.loginType,
        "사용자아이디": params.id,
        "사용자비밀번호": params.password,
        "ssotoken": "", // 삼성카드 로그인 토큰값 
        "인증서": {
          "이름": params.certKey,
          "만료일자": params.expireDate,
          "비밀번호": params.certPassword
        }
      }
    }
    return data
  },

  // 카드목록조회
  getCardListJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "개인카드",
      "Job": "카드목록조회",
      "Input": {
        "조회구분": "",
        "결제일구분": "" 
      }
    }
    return data
  },

  // 승인내역
  getTransactionJob(params={}, gap=0) {
    const date = scrapingDate(gap)
    const data = {
      "Module": params.module,
      "Class": "개인카드",
      "Job": "승인내역",
      "Input": {
        "조회시작일": date.startDate, // YYYYMMDD
        "조회종료일": date.endDate, // YYYYMMDD
        "조회구분": "", //미입력: 전체조회, 2: 카드별조회, S: 목록조회 
        "카드번호": "", //카드별조회인 경우 필수 
        "구분": params.bccdDsnm //비씨 개인만 사용 
      }
    }
    return data
  },

  // 청구내역
  getChargeJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "개인카드",
      "Job": "청구내역",
      "Input": {
        "조회구분": '', // 미입력: 전체조회, 2:카드별조회, S: 목록조회
        "사업장구분": "", // 현대카드만 사용
        "사업장번호": "", //"현대카드만 사용"
        "카드번호": "", // 조회구분 2일 경우 필수입력
        "구분": params.bccdDsnm, // 회원사 또는 명세서구분
        "청구구분": "", // N: 통합카드조회 (우리카드만 지원)
        "결제일": params.yyyymm, // YYYYMM
        "카드비밀번호": "", 
      }
    }
    return data
  },

  // 결제예정금액
  getEstimatePaymentJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "개인카드",
      "Job": "결제예정금액",
      "Input": {
        "구분": params.bccdDsnm,
        "결제일구분": "1" // “1”, 미입력 : 가까운 일자의 결제예정금액 처리,  “2” : 먼 일자의 결제예정금액, 현대, 삼성 개인만 사용 
      }
    }
    return data
  },

  // 실적충족내역
  getPerformanceJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "개인카드",
      "Job": "실적충족내역",
      "Input": {
        "조회년월": params.yyyymm // YYYYMM
      }
    }
    return data
  },

  // 로그아웃
  getLogoutJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "개인카드",
      "Job": "로그아웃",
      "Input": {}
    }
    return data
  },
}