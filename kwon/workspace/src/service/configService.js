/**
 * 화면 개발을 위한 공통 스크립트.
 */
import apiService from './apiService'
import _ from 'lodash'
import constant from '@/common/config/constants'
import store from '@/store'
import {dateFormat} from '@/utils/date'
import {parseJson} from '@/utils/data'
import appService from './appService'

export default {

	/**
	 * 공통코드목록전체조회
	 * @return {Promise}
	 */
	getCodeList(data) {
    return new Promise((resolve, reject) => {
          const config = {
            url: '/co/co/00r01',
            data : data,
            disableLoading : true,
          }

          const params = this.parseQueryString()  // url 에 넘어온 정보
          const session = this.getLoginSession() // session에 담겨있는 정보
          const userInfo = Object.assign(session, params)

          // 고객번호 체크
          if (userInfo.cus === undefined || userInfo.cus === '') {
            reject()
          }else{
            apiService.call(config).then(response => {
              resolve(this.makeCodeGroup(response))
            }, () => reject())
          }
        })
  },

	/**
	 * 공지사항목록조회
	 * @return {Promise}
	 */
	getNoticeList(data) {
    return new Promise((resolve) => {
      const config = {
        url: '/co/0501r01',
        data
      }
      apiService.callOld(config).then(response => resolve(response))
    })
  },

	/**
	 * 공지사항상세조회
   * @param {Object} data : body 전문
	 * @return {Promise}
	 */
	getNoticeDetail(data) {
    // 공지사항 키	ofancId
    return new Promise((resolve) => {
      const config = {
        url: '/co/0502r01',
        data
      }
      apiService.callOld(config).then(response => resolve(response))
    })
  },

	/**
	 * 약관동의목록조회
   * @param {Object} data : body 전문
	 * @return {Promise}
	 */
	getTermsList(data) {
    // 자산관리약관동의종류코드	ASET_AMN_STLT_AGR_KDC
    return new Promise((resolve) => {
      const config = {
        url: '/co/0101r01',
        data
      }
      apiService.callOld(config).then(response => resolve(response))
    })
  },

	/**
	 * 약관동의상세조회
   * @param {Object} data : body 전문
	 * @return {Promise}
	 */
	getTermsDetail(data) {
    // 약관번호	stltAmnId
    return new Promise((resolve) => {
      const config = {
        url: '/co/0102r01',
        data
      }
      apiService.callOld(config).then(response => resolve(response))
    })
  },

	/**
	 * 약관동의
   * @param {Object} data : body 전문
	 * @return {Promise}
	 */
	saveTermsAgree(data) {
    // 고객번호	asetAmnCusno
    // 약관번호	stltAmnId
    // 동의여부	agrYn
    return new Promise((resolve) => {
      const config = {
        method: constant.PUT,
        url: '/co/0101i01',
        data
      }
      apiService.callOld(config).then(response => resolve(response))
    })
  },

	/**
	 * 약관검색목록조회
   * @param {Object} data : body 전문
	 * @return {Promise}
	 */
	getTermsSearchList(data) {
    return new Promise((resolve) => {
      const config = {
        url: '/co/0601r01',
        data
      }
      apiService.callOld(config).then(response => resolve(response))
    })
  },
  
  /**
	 * 리스트 형태의 코드를 comnCGrpId을 기준으로 그룹핑 해준다.
	 * @param {Object} response : 공통코드목록전체조회 response
	 * @return {Map}
	 */
  makeCodeGroup(response) {
    // const list = response.comnCAllList
    // const map = new Map()
    // _.uniqBy(list, 'comnCGrpId').forEach(d => {
    //   map.set(d.comnCGrpId, list.filter(x => x.comnCGrpId === d.comnCGrpId))
    // })
    // return map
    const list = response.comnCList
    const map = new Map()
    _.uniqBy(list, 'comnCId').forEach(d => {
      map.set(d.comnCId, list.filter(x => x.comnCId === d.comnCId))
    })
    return map
  },

  /**
	 * 스뱅 고객번호로 자산관리 고객 정보를 가져온다.
	 * @param {String} cusno : 스뱅/콕뱅 고객번호
	 * @param {String} connChanVal : 스뱅/콕뱅 구분
	 * @param {String} lginInfVal : 스뱅/콕뱅 로그인정보값
	 * @param {String} lginDtm : 스뱅/콕뱅 로그인일시
	 * @return {Object}
	 */
  getAssetUserInfo(mydtCusno, connChanVal, lginInfVal, lginDtm) {
    const config = {
      url: '/co/as/01r01',
      data: {
        mydtCusno : mydtCusno,
        connChanVal : connChanVal,
        lginInfVal : lginInfVal,
        lginDtm : lginDtm,
        disableLoading : true,
      }
    }
    //임시로 고객정보 조회처리
    return apiService.call(config)
  },

  /**
  * 농축협 계좌정보 조회
  * @param {String} mydtCusno : 마이데이타고객번호
  * @return {Object}
  */
  getNHAccountInfo(mydtCusno) {
    const config = {
      url: '/co/as/01r02',
      data: {
        mydtCusno : mydtCusno,
        disableLoading : true,
      }
    }
    //계좌정보 조회처리
    return apiService.call(config)
  },

  /**
	 * 고객번호로 마이데이터 고객 정보를 가져온다.
	 * @param {String} cusno : 스뱅|콕뱅 암호화 고객번호
	 * @return {Object}
	 */
  getMydataUserInfo(cusno="", chnlGbn) {

       console.log('chanCfc :: ', chnlGbn)
       if(cusno === "" ) {
          return ({error:"마이데이터고객정보 조회시 CRM고객번호없음"})
        }else{
          const config = {
            url: '/co/ma/01r01',
            data: {
              crmCusno : cusno,
              svcClientId : store.state.user.userInfo.svcClientId,
              chanCfc : chnlGbn,
              disableLoading : true,
            }
          }
          return apiService.call(config)
          //return apiService.callAjax(config)
        }
  },

  getMydataUserInfoTobe(cusno="", chnlGbn) {
    console.log('getMydataUserInfoTobe IN !!')
    console.log('chanCfc :: ', chnlGbn)
    if(cusno === "" ) {
       return ({error:"마이데이터고객정보 조회시 CRM고객번호없음"})
     }else{ 
       const config = {
         url: '/co/ma/04r01', //상호금융 NH콕마이데이터 4.0 추진 개발 /co/ma/02r01 => /co/ma/04r01 
         data: {
           crmCusno : cusno,
           svcClientId : store.state.user.userInfo.svcClientId,
           chanCfc : chnlGbn
         }
       }
       return apiService.call(config)
     }
  },

  /**
	 * 자산 스크래핑 대상기관정보 조회
	 * @return {Object}
	 */
  getScrapingTarget() {
    const config = {
      url: '/as/0001s02',
      disableLoading: true,
      data: {
        asetAmnCusno: store.state.user.userInfo.asetAmnCusno, // 자산관리고객번호
      }
    }
    return apiService.callOld(config)
  },

  /**
	 * 자산 스크래핑 대상기관정보 저장
	 * @return {Object}
	 */
  saveScrapingTarget(params) {
    return new Promise((resolve, reject) => {
      const config = {
        method: 'put',
        url: '/as/0001s01',
        disableLoading: true,
        data: {
          asetAmnCusno: store.state.user.userInfo.asetAmnCusno, // 자산관리고객번호
          asetAmnFncorgC: params.asetAmnFncorgC, // 자산관리금융기관코드
          tgrmColDt: dateFormat(new Date(), 'YYYYMMDD'), // 전문수집일자
          orgLink: { // 기관연동정보
            // lkgMethc: params.isCertType ? '1' : '2', // 연동방법코드 1, 2
            lkgMethc: params.lkgMethc, // 연동방법코드 1: '인증서', 2: ''
            lkgStsc: '1', // 연동상태코드 1: 성공, 0: 실패
            lkgRztC: '00000000', // 연동결과코드
          }
        }
      }
      apiService.callOld(config).then(
        () => {
          this.getScrapingTarget().then(res => {
            //
            store.dispatch('scraping/setScrapingTarget', res)
            resolve(res)
          })
        },
        error => reject(error)
      )
    })
  },

  /**
	 * 농축협 계좌 조회
	 * @return {Object}
	 */
  getNonghyupAccount() {
    return new Promise((resolve) => {
      const config = {
        url: '/as/0001s03',
        disableLoading: true,
        data: {
          asetAmnCusno: store.state.user.userInfo.asetAmnCusno, // 자산관리고객번호
          fncAcDsc: '', // 금융계좌구분코드
          acno: '', // 계좌번호
        }
      }
      apiService.callOld(config).then(
        () => resolve(),
				() => resolve(),
      )
    })
  },

  /**
	 * 신용정보 KCB 등록
	 * @return {Object}
	 */
  registKcb() {
    const config = {
      url: '/as/8001r01',
      data: {
        asetAmnCusno: store.state.user.userInfo.asetAmnCusno, // 자산관리고객번호
        kcbRgRsnc: '01', // 01:등록, 09:조회
      }
    }
    return apiService.callOld(config)
  },

  /**
   * 신용정보 url 조회
   */
  getKcbUrl() {
    const config = {
      url: '/as/8001r01',
      disableLoading: true,
      data: {
        asetAmnCusno: store.state.user.userInfo.asetAmnCusno, // 자산관리고객번호
        kcbRgRsnc: '09', // 01:등록, 09:조회
      },
    }
    return apiService.callOld(config)
  },

  /**
   * KCB 신용정보 조회 및 저장
   */
  saveKcdData() {
    return new Promise((resolve, reject) => {
      this.getKcbUrl().then(urlInfo => {
        const url = urlInfo.urlnm
        if (url) {
          appService
            .httpGet(url)
            .then(
              kcbData => {
                console.log('신용정보 url', url)
                const body = kcbData.result.responseBody || kcbData.result.requestBody
                const data = parseJson(body).data
                const config = {
                  url: '/as/8001s01',
                  method: 'put',
                  disableLoading: true,
                  data: {
                    asetAmnCusno: store.state.user.userInfo.asetAmnCusno, // 자산관리고객번호
                    asetAmnFncorgC: 'KCB', // 자산관리금융기관코드
                    tgrmColDt: dateFormat(new Date(), 'YYYYMMDD'), // 전문수집일자
                    data: data
                  }
                }
                console.log('신용정보 저장', data)
                apiService.callOld(config).then(
                  response => resolve(response),
                  error => reject(error),
                )
              },
              error => reject(error)
            )
        } else {
          resolve()
        }
      })
    })
  },

  // url queryString [{kye, value}] 로 변환
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

    /**
   * 임시로 사용 (테스트 기간에만 임시로 사용)
   */
  getLoginSession() {
    try {
			return JSON.parse(sessionStorage.getItem('userInfo')) || {}
		} catch (e) {
			console.error(e)
			return {}
		}
  },
  /**
	 * 테스트 계정 여부
	 */
  getTestMyDtNo() {
    const config = {
      url: '/co/co/25r01',
      data: {
        disableLoading : true,
      }
    }
    return apiService.call(config)
  },
}