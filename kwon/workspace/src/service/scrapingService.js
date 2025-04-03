/**
 * 스크래핑 서비스 공통
 */

import bank from "./scraping/bank"
import card from "./scraping/card"
import stock from "./scraping/stock"
import insurance from "./scraping/insurance"
import pension from "./scraping/pension"
import realEstate from "./scraping/realEstate"
import apiService from '@/service/apiService'
import configService from '@/service/configService'
import store from '@/store'
import convert from '@/common/scraping/convert'
import {parseJson} from '@/utils/data'
import {dateFormat} from '@/utils/date'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'

const successCodeList = [
  '00000000', // 겅공
  '42110000', // 거래 결과가 없습니다.(거래내역조회 시 거래내역 없음) - 거래 결과가 없는 건은 정상으로 처리
  '80002121', // kbank 펀드계좌 조회시 에러 발생해서 예외 처리
  '80003521', // 잘못된 청구년월 입니다. 확인 후 다시 거래하십시오
  //'80004000', // 인증서명 또는 USB Pin 번호 미입력입니다. 확인 후 다시 거래하십시오.
]

export default {
	
	/***********************************************************
   *
   * 변수
   * 
   ***********************************************************/

  bank: bank,
  card: card,
  stock: stock,
  insurance: insurance,
  pension: pension,
  realEstate: realEstate,
  bPopup : false,
	
	
	/***********************************************************
   *
   * 스크래핑
   * 
   ***********************************************************/

	/**
   * 스크래핑 함수 실행
   */
  execute(moduleName, functionName, params, resultType) {
    const inputParam = functionName === 'runSASList'
			? (Array.isArray(params) ? [params] : [[params]])
			: params
    return new Promise((resolve, reject) => {
      const callback = response => {
        console.log('functionName :::::::::::::', functionName)
        console.log('response :::::::::::::', response)
        
        response = this.parseResponse(response, 'runSAS')

        if (this.checkResponse(response)) {
          resolve(response)
        }
        else {
          reject(response.errorMessage)
        }
      }
      window.fg.of.exec(
        callback,
        moduleName,
        functionName,
        inputParam
      )
    })
  },

  /**
   * 스크래핑 함수 실행
   * @param {Object | Array} params: 스크래핑 data
   * @return Promise
   */
  executeAll(params) {
    return new Promise((resolve, reject) => {
      console.log('스크래핑 : executeAll', Object.assign({}, params))
      this.setScrapingLog({'executeAll': Object.assign({}, params)})

      const resultList = []
      const paramsSize = Array.isArray(params)
        ? params.length
        : 1
      const inputParam = Array.isArray(params)
        ? [params, successCodeList]
        : [[params], successCodeList]

      // parameter 가 없으면 reject (parameter가 없는 경우는 없지만 예외 처리를 위해)
      if (paramsSize === 0) reject('param size 0')

      const callback = response => {
        console.log('')
        console.log('')
        response = this.parseResponse(response)
        console.log('스크래핑 : executeAll callBack', response)
        this.setScrapingLog({'executeAll callBack': response})
        
        // 로그인 결과 서버에 저장 (response.result.job.Job === "로그인")
        // this.saveScrapingResultForLogin(response)

        if (this.checkResponse(response)) {
          // 스크래핑 결과 서버에 저장
          this.saveScrapingResult(response.result).then(
            () => {
              resultList.push(response.result)
              console.log('스크래핑 : executeAll : success', resultList.length, paramsSize)
              this.setScrapingLog({'executeAll : success': resultList.length})
              if (resultList.length === paramsSize) resolve(resultList)
            },
            error => {
              resultList.push(error)
              console.log('스크래핑 : executeAll : error', resultList.length, paramsSize)
              this.setScrapingLog({'executeAll : error': resultList.length})
              if (resultList.length === paramsSize) resolve(resultList)
            }
          )
        }
        else {
          //var errJob = response.result.job.Job
          var errModule = response.result.job.Module
          var errCd = response.result.job.Output.ErrorCode
          var errMsg = response.result.job.Output.ErrorMessage

          // 80002210, 80002114 : 통합연금포털 id/pw 오류 : "웹 아이디를 입력하지 않으셨습니다. 확인 후 다시 거래하십시오."
          // 80004040, 80004111 : 공동인증서 재발급시 발생 오류 : "인증서 비밀번호 미입력입니다. 확인 후 다시 거래하십시오."
          // 80004041 : 공동인증서 비밀번호 변경 시 오류 : "잘못된 인증서 비밀번호입니다. 확인 후 다시 거래하십시오."
          //          : 공동인증서 갱신 시 오류 : ""
          if(errCd == '80002210' || errCd == '80002214' || errCd == '80004040' || errCd == '80004111' || errCd == '80004041') {

            if(this.bPopup == false && store.getters['layout/isMainPage']) {
              this.bPopup = true

              var popupMessage = ""
              var mvPage = ""
              var param = {}
              if(errModule == 'lifeplan' && (errCd == '80002210' || errCd == '80002214')) {
                popupMessage = "통합연금포털 " + errMsg + "\n[확인]시 통합연금포털 연결 화면으로 이동합니다."
                mvPage = 'PGAS1014'
                param.viewType = 'login'
                param.asetAmnDsc = '07'
                param.moduleList = [{
                  orgDsc: '50', // 
                  asetAmnCusno: store.state.user.userInfo.asetAmnCusno,
                  asetAmnFncorgC: 'lifeplan',
                  asetAmnFncorgCnm: '통합연금포탈',
                  bscLkgMethc: '2' // 1: CERT, 2: ID, 3: ALL
                }]
              } else {
                if(errCd == '80004040') {
                  popupMessage = "인증서 정보가 변경되었으니 확인 후 거래하시기 바랍니다. \n[확인]시 자산기관관리 화면으로 이동합니다."
                } else {
                  popupMessage = errMsg + "\n[확인]시 자산기관관리 화면으로 이동합니다."
                }
                mvPage = 'PGMR6001'
              }

              modalService.confirm(popupMessage)
                .then(text => {
                  if (text === '확인') {
                    const menu = {
                      name : mvPage
                    }
                    
                    menu.params = param;
                    commonService.movePage(menu)
                  }
              })
            }
          } 
          // else {
          //   alert("Job : " + errJob + "\n"
          //   + "Module : " + errModule + "\n"
          //   + "ErrorCode : " + errCd + "\n"
          //   + "ErrorMessage" + errMsg
          //   );
          // }
          console.log('스크래핑 : executeAll : error2', resultList.length, paramsSize)
          this.saveScrapingResultForLoginFail(response.result)
          this.setScrapingLog({'executeAll : error2': resultList.length})
          response.errorMessage = this.parseErrorMessage(response)
          reject(response)
        }
      }
      window.fg.of.exec(
        callback,
        'MFSAS',
        'runSASList',
        inputParam
      )
    })
  },

  /**
   * 오케스트라를 통해서 받은 response를 parsing 해준다.
   * 주 목적은 response.result 내용이 string으로 넘어와서 json으로 변환
   */
  parseResponse(response={}, method='runSASList') {
    let oldResult = parseJson(response.result)
    let input = oldResult.Input || {}
    let result = response.result || {}
    

    // let method = (response.request || {}).method
    if (typeof response.result === 'string') {
      result = parseJson(result)
      result = this.mergeInputToOutput(result, input)
      result = method === 'runSASList'
        ? convert.convert(result)
        : result
      result.job = oldResult
      response.result = result
    }
    console.log('스크래핑 : parseResponse End', response, oldResult)
    return response
  },

  /**
   * 스크래핑 인풋 내용을 스크래핑된 결과에 머지한다.
   * output key 변환할때 사용
   */
  mergeInputToOutput(result, input) {
    if (result.Job === "청구내역") {
      console.log('청구내역')
    }
    if (result.Job === "승인내역") {
      console.log('승인내역')
    }
    if (result.Output && result.Output.Result) {
      result.Output.Result = Object.assign({}, input, result.Output.Result)
    }
    return result
  },

  /**
   * 스크래핑 결과 (response) 체크
   * resultCode 가 있는데 0 이면 성공 아니면 실패
   * resultCode 가 없으면 성공
   */
  checkResponse(response) {
    console.log('스크래핑 : checkResponse -----------------------', response)
    this.setScrapingLog({'스크래핑 : checkResponse': response})
    const hasResultCode = Object.prototype.hasOwnProperty.call(response, 'resultCode')
    const resultCode = hasResultCode
      ? Number(response.resultCode)
      : 0
    const result = response.result || {}
    const job = result.job || {}
    const outPut = job.Output || {}
    const errorCode = outPut.ErrorCode || '00000000'
    const module = job.Module
    return resultCode === 0 && successCodeList.includes(errorCode) || (errorCode == '80004000' && module == 'lifeplan')
  },

  // 스크래핑 결과 서버에 저장
  saveScrapingResult(result) {
    return new Promise((resolve, reject) => {
      const isLogin = result.job.Job === "로그인"
      const config = isLogin
        ? this.getConfigForLogin(result)
        : this.getConfigForNormal(result)
      apiService.call(config).then(
        response => {
          console.log('스크래핑 결과 서버에 저장 성공', config, response)
          this.setScrapingLog({'스크래핑 : checkResponse': {config, response}})
          resolve(response)
        },
        error => {
          console.log('스크래핑 결과 서버에 저장 실패', error)
          this.setScrapingLog({'스크래핑 : checkResponse': error})
          reject(error)
        }
      )
    })
  },

  // 스크래핑 로그인 실패 결과 서버에 저장
  saveScrapingResultForLoginFail(result) {
    const isLogin = result.job.Job === "로그인"
    const config = this.getConfigForLogin(result, '0')
    if (isLogin) {
      apiService.call(config).then(
        response => console.log('스크래핑 로그인 실패 결과 서버에 저장 성공', response),
        error => console.log('스크래핑 로그인 실패 결과 서버에 저장 실패', error)
      )
    }
  },

  // 스크래핑 결과 서버에 저장 config (로그인 로그아웃용)
  getConfigForLogin(result={}, lkgStsc='1') {
    const job = result.job || {}
    const loginType = job.Input.로그인방식 === 'CERT' ? '1' : '2'
    const config = {
      method: 'put',
      url: '/as/0001s01',
      disableLoading: true,
      data: {
        asetAmnCusno: store.state.user.userInfo.asetAmnCusno, // 자산관리고객번호
        asetAmnFncorgC: job.Module, // 자산관리금융기관코드
        tgrmColDt: dateFormat(new Date(), 'YYYYMMDD'), // 전문수집일자
        orgLink: { // 기관연동정보
          lkgMethc: loginType, // 연동방법코드 1: '인증서', 2: ''
          lkgStsc: lkgStsc || '1', // 연동상태코드 1: 성공, 0: 실패
          lkgRztC: '00000000', // 연동결과코드
        }
      }
    }
    return config
  },

  // 스크래핑 결과 서버에 저장 config (로그인 로그아웃 이외 잡)
  getConfigForNormal(result={}) {
    const job = result.job || {}
    const config = {
      method: 'put',
      url: '/as/0001s01',
      disableLoading: true,
      data: {
        ...result,
        asetAmnCusno: store.state.user.userInfo.asetAmnCusno, // 자산관리고객번호
        asetAmnFncorgC: job.Module, // 자산관리금융기관코드
        tgrmColDt: dateFormat(new Date(), 'YYYYMMDD'), // 전문수집일자
        job: job.Job,
      }
    }
    return config
  },

  // 스크래핑 결과 서버에 저장 (로그인)
  saveScrapingResultForLogin(response) {
    const job = (response.result || {}).job || {}
    if (job.Job === '로그인') {
      const loginType = job.Input.로그인방식 === 'CERT' ? '1' : '2'
      const lkgStsc = this.checkResponse(response) ? '0' : '1'
      const params = {
        asetAmnFncorgC: job.Module, // 자산관리금융기관코드
        lkgMethc: loginType, // 연동방법코드 1, 2
        lkgStsc: lkgStsc, // 연동상태코드 0: 성공, 1: 실패
        lkgRztC: '00000000', // 연동결과코드
      }
      configService.saveScrapingTarget(params)
    }
  },

  // 스크래핑 에러 메세지 추출
  parseErrorMessage(response) {
    console.log('스크래핑 : checkResponse ------------------', response)
    this.setScrapingLog({'스크래핑 : checkResponse': response})
    const result = response.result || {}
    const job = result.job || {}
    const outPut = job.Output || {}
    return outPut.ErrorMessage || ''
  },
	
	/***********************************************************
   *
   * 업무 메소드
   * 
   ***********************************************************/

  // 스크래핑 대상기관의(target) 전체 스크래핑을 호출
  getInfoByOrgDsc(target) {
    if (target.orgDsc === '10') this.bank.getAllBankInfo(target) // 예금
    if (target.orgDsc === '20') this.card.getAllCardInfo(target) // 카드
    if (target.orgDsc === '30') this.stock.getAllStockInfo(target) // 증권
    if (target.orgDsc === '40') this.insurance.getAllInsuranceInfo(target) // 보험
    if (target.orgDsc === '50') this.pension.getAllEstimateInfo(target) // 연금
  },

  setScrapingLog(data) {
    if (sessionStorage.getItem('logDebug') === 'true') {
      const log = this.getScrapingLog()
      log.list = log.list || []
      log.list.push(data)
      sessionStorage.setItem('log', JSON.stringify(log))
    }
  },

  getScrapingLog() {
    try {
      return JSON.parse(sessionStorage.getItem('log')) || {}
    } catch (e) {
      console.error(e)
      return {}
    }
  },


	/***********************************************************
   *
   * Dummy Data
   * 
   ***********************************************************/
  bankList: [
		{value:'kbank', label:'K뱅크'},
		{value:'kbstar', label:'국민은행'},
		{value:'kdb', label:'산업은행'},
		{value:'wooribank', label:'우리은행'},
		{value:'ibk', label:'기업은행'},
		{value:'standardchartered', label:'SC은행'},
		{value:'citibank', label:'한국씨티은행'},
		{value:'hanabank', label:'KEB하나은행'},
		{value:'dgb', label:'대구은행'},
		{value:'suhyupbank', label:'수협중앙회'},
		{value:'busanbank', label:'부산은행'},
		{value:'nonghyup', label:'농협은행'},
		{value:'kjbank', label:'광주은행'},
		{value:'jejubank', label:'제주은행'},
		{value:'kfcc', label:'새마을금고중앙회'},
		{value:'jbbank', label:'전북은행'},
		{value:'cu', label:'신협중앙회'},
		{value:'knbank', label:'경남은행'},
		{value:'epostbank', label:'우체국'},
		{value:'shinhan', label:'신한은행'},
	],

  cardList: [
		{value: 'kbcard', label: '국민카드'},
		{value: 'wooricard', label: '우리카드'},
		{value: 'shinhancard', label: '신한카드'},
		{value: 'samsungcard', label: '삼성카드'},
		{value: 'nonghyupcard', label: 'NH카드'},
		{value: 'lottecard', label: '롯데카드'},
		{value: 'hyundaicard', label: '현대카드'},
		{value: 'bccard', label: '비씨카드'},
		{value: 'hanacard', label: '하나카드'},
		{value: 'citicard', label: '씨티카드'},
		{value: 'kjcard', label: '광주카드'},
		{value: 'suhyupcard', label: '수협카드'},
		{value: 'jbcard', label: '전북카드'},
		{value: 'busancard', label: '부산카드'},
		{value: 'jejucard', label: '제주카드'},
		{value: 'kdbcard', label: '산은카드'},
	],

	stockList: [
		{value: 'secNamuh', label: 'NH나무증권'},
		{value: 'secNHqv', label: 'NH투자증권'},
		{value: 'secKorea', label: '한국투자증권'},
		{value: 'secSks', label: 'SK증권'},
		{value: 'secDaishin', label: '대신증권'},
		{value: 'secMirae', label: '미래에셋대우증권'},
		{value: 'secSamsung', label: '삼성증권'},
		{value: 'secShinhan', label: '신한금융투자'},
		{value: 'secMyasset', label: '유안타증권'},
		{value: 'secKiwoom', label: '키움증권'},
		{value: 'secHanaw', label: '하나금융투자'},
		{value: 'secKB', label: 'KB증권'},
		{value: 'secKyobo', label: '교보증권'},
		{value: 'secDBfi', label: 'DB금융투자증권'},
		{value: 'secImeritz', label: '메리츠종금증권'},
		{value: 'secHanwhawm', label: '한화투자증권'},
		{value: 'secCape', label: '케이프투자증권'},
		{value: 'secEugenefn', label: '유진투자증권'},
		{value: 'secIbk', label: 'IBK투자증권'},
		{value: 'secKtb', label: 'KTB투자증권'},
		{value: 'secWoori', label: '우리종합금융'},
		{value: 'secEBest', label: '이베스트투자'},
		{value: 'secHi', label: '하이투자증권'},
		{value: 'secHmc', label: '현대차투자증권'},
		{value: 'secShinyoung', label: '신영증권'},
		{value: 'secCreon', label: '크레온증권'},
	],

	insuranceList: [
		{value: 'linalife', label: '라이나생명'},
		{value: 'kbinsure', label: 'KB손해보험(구 LIG화재)'},
		{value: 'kfccins', label: 'MG새마을금고'},
		{value: 'epostins', label: '우체국보험'},
		{value: 'samsunglife', label: '삼성생명'},
		{value: 'miraelife', label: '미래에셋생명'},
		{value: 'shinhanlife', label: '신한생명'},
		{value: 'heungkuklife', label: '흥국생명'},
		{value: 'pcalife', label: 'PCA생명'},
		{value: 'hdfire', label: '현대해상'},
		{value: 'abllife', label: 'ABL생명(구 알리안츠)'},
		{value: 'kyobolife', label: '교보생명'},
		{value: 'dylife', label: '동양생명'},
		{value: 'metlife', label: '메트라이프'},
		{value: 'hanwhalife', label: '한화생명(구 대한생명)'},
		{value: 'prudlife', label: '푸르덴셜'},
		{value: 'inglife', label: '오렌지라이프'},
		{value: 'nhlife', label: 'NH생명'},
		{value: 'kdblife', label: 'KDB생명보험'},
		{value: 'dgblife', label: 'DGB생명'},
		{value: 'dongbulife', label: 'DB생명(구 동부생명)'},
		{value: 'cblife', label: '처브라이프'},
		{value: 'lifeplanet', label: '교보라이프플래닛생명'},
		{value: 'hanalife', label: '하나생명'},
		{value: 'hdlife', label: '푸본현대생명'},
		{value: 'cardif', label: 'BNP파리바카디프생명'},
		{value: 'kbli', label: 'KB생명보험'},
		{value: 'ibki', label: 'IBK연금보험'},
		{value: 'aia', label: 'AIA생명'},
		{value: 'mggeneralins', label: 'MG손해보험'},
		{value: 'meritzfire', label: '메리츠화재'},
		{value: 'hwgeneralins', label: '한화손해보험'},
		{value: 'heungkukfire', label: '흥국화재(구 쌍용화재)'},
		{value: 'axadirect', label: '교보 AxA다이렉트'},
		{value: 'nhfire', label: 'NH손해보험'},
		{value: 'lotteins', label: '롯데손해보험'},
		{value: 'chubb', label: '에이스손해보험'},
		{value: 'aig', label: 'AIG손해보험'},
		{value: 'cardifcare', label: 'BNP파리바카디프손해'},
		{value: 'idbins', label: 'DB손해보험(구 동부화재)'},
		{value: 'samsungfire', label: '삼성화재'},
		{value: 'thekins', label: '더케이손해보험'},
		{value: 'carrotins', label: '캐롯손해보'},
	]
}