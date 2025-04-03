/*
*************************************************************************
* @ 페이지설명 : 화면개발에 필요한 공통함수 정의. BXI CALL 을 위한 axios 정의
* @ 파일명     : src/service/apiService.js
*/
import axios from 'axios'
import constant from '@/common/config/constants'
import store from '@/store'
import {uuid, stringify} from '@/utils/data'
import {dateFormat} from '@/utils/date'
//import {stringify} from '@/utils/data'
//import CryptoJS from '@/assets/js/crypto-js'
import HmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
import routerService from '@/service/routerService'
import modalService from '@/service/modalService'

// 서비스 에러시 에러페이지로 이동을 무시할 서비스 url
const ignoreUrlList = [
	'/as/in/01s02', // 보증보험 수집(Scope별) API
	'/as/ln/05s01', // 할부금융 계좌 수집(Scope별) API
	'/as/in/01s01', // 보험 수집(Scope별) API
	'/as/iv/01s01', // 금투 계좌 수집(Scope별) API
	'/as/ln/03s01', // 카드 수집(Scope별) API
	'/as/ac/01s01', // 은행 계좌 수집(Scope별) API
]

export default {

	/**
	 * axios 서비스 호출
	 * @param {Object} userConfig : 사용자가 설정한 config
	 * @return {Promise}
	 */
	call(userConfig) {
		return new Promise((resolve, reject) => {
			// config
			const config = this.mergeDefaultConfig(userConfig)
			// 무결성 체크를 위한 header 셋팅
			config.headers = this.getEncodingHeaders(config.data)
			// add loading
			this.addLoading(userConfig)
			
			console.log("API 요청 config 정보 ##############################################3")
			console.log(config)

			// http service call
			axios(config).then(
				response => {
					// remove loading
					this.removeLoading(userConfig)
					// response check
									
					if (this.checkResponse(response)) {
						//resolve(response.data.body)
						// 인프라 팀의 요청으로 2차의 모든 거래는 BODY -> DATA 20210525
						resolve(response.data)
					} else {
						this.moveErrorPage(response)
						reject(response)
					}
				},
				error => {
					// remove loading
					this.removeLoading(userConfig)
					// moveServiceError
					routerService.moveServiceError(error)
					// reject
					reject(error)
				}
			).catch(error => {
				this.removeLoading(userConfig)
				if (error.response)
				{
					console.error("api call Response Error :",error.response.data)
					console.error("api call Response Error :",error.response.status)
					console.error("api call Response Error :",error.response.headers)
					if(error.response.status === '404'){
						routerService.moveServiceReadyError(error.response)
						reject(error.response)		
					}else{
						routerService.moveServiceError(error.response)
						reject(error.response)						
					}
				} else if(error.request)
				{
					console.error("api call Request Error :",error.request)
					routerService.moveServiceError(error.request)
					reject(error.request)					
				}else{
					console.log("api call Error ",error)
					routerService.moveServiceError(error.response)
					reject(error.response)					
				}
			})
		})
	},

	/**
	 * axios OLD 서비스 호출
	 * @param {Object} userConfig : 사용자가 설정한 config
	 * @return {Promise}
	 */
	callOld(userConfig) {
		return new Promise((resolve, reject) => {

			const _self = this
			const config = this.mergeDefaultConfigOld(userConfig)
			// 무결성 체크를 위한 header 셋팅
			config.headers = this.getEncodingHeadersOld(config.data)
			
			$.ajax({
				url : "https://pfm.nonghyup.com:9000/cmyfm" + userConfig.url,
				type : "POST",
				contentType : 'application/json;charset=UTF-8',
				dataType : "json",
				data : JSON.stringify(config.data),
				success: function(response){
					// response check
					//AJAX의 경우 바로 DATA로 처리됨
					if (_self.checkResponseOld(response)) {
						resolve(response.body)
					} else {
						_self.moveErrorPage(response)
						reject(response)
					}
				},
				fail: function(error){
					console.log("error" ,error)
					reject(error)
				},
			}) 
		})
	},

	/**
	 * NH콕마이데이터4.0 신규
	 * ajax RSS 호출
	 * @param {Object} userConfig : 사용자가 설정한 config
	 * @return {Promise}
	 */
	callRSSAjax(userConfig) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: userConfig.url,
				type: "GET",
				dataType: "xml",
				success: function(response) {
					console.log('success >> ', response)
					resolve(this.xmlToJson(response))
				},
				fail: function(error){
					console.log('error >> ', error)
					reject(error)
				}
			})
		})
	},

	/**
	 * NH콕마이데이터4.0 신규
	 * axios RSS 호출
	 * @param {Object} userConfig : 사용자가 설정한 config
	 * @return {Promise}
	 */
	callRSS(userConfig) {
		return new Promise(async (resolve, reject) => {

			// const config = this.mergeDefaultConfigOld(userConfig)
			// // 무결성 체크를 위한 header 셋팅
			// config.headers = this.getEncodingHeadersOld(config.data)
			
			// $.ajax({
			// 	url : userConfig.url,
			// 	type : userConfig.type,
			// 	contentType : 'application/json;charset=UTF-8',
			// 	dataType : "xml",
			// 	// data : JSON.stringify(config.data),
			// 	success: function(response){
			// 		// response check
			// 		//AJAX의 경우 바로 DATA로 처리됨
			// 		if (this.checkResponseOld(response)) {
			// 			resolve(response.body)
			// 		} else {
			// 			this.moveErrorPage(response)
			// 			reject(response)
			// 		}
			// 	},
			// 	fail: function(error){
			// 		console.log("error" ,error)
			// 		reject(error)
			// 	},
			// }) 
			await axios.get(userConfig.url).then(
			response => {
				console.log('RSS original resonse >>> ', response)
				resolve(this.xmlToJson(response))
			},
			error => {
				console.log('error config >>> ', error)
				reject(error)
			}).catch(error => {
				console.log('error catch!!')
				if(error.response)
				{
					console.error("api call Response Error :",error.response.data)
					console.error("api call Response Error :",error.response.status)
					console.error("api call Response Error :",error.response.headers)
					if(error.response.status === '404') {
						routerService.moveServiceReadyError(error.response)
						reject(error.response)
					} else {
						routerService.moveServiceError(error.response)
						reject(error.response)
					}
				}
				else if(error.request)
				{
					console.error("api call Request Error :",error.request)
					routerService.moveServiceError(error.request)
				}
				else
				{
					console.log("api call Error ",error)
					routerService.moveServiceError(error.response)
					reject(error.response)
				}
			})
		})
	},

	/**
	 * ajax Mydata 서비스 호출
	 * @param {Object} userConfig : 사용자가 설정한 config
	 * @return {Promise}
	 */
	callMydata(userConfig) {
		return new Promise((resolve, reject) => {

			const config = this.mergeDefaultConfigOld(userConfig)
			// 무결성 체크를 위한 header 셋팅
			config.headers = this.getEncodingHeadersOld(config.data)

			const headers ={
							contentType : 'application/json;charset=UTF-8',
							}
			axios
				.post(import.meta.env.VUE_MDP_API_URL + import.meta.env.VUE_MDP_API_CONTEXT + "/co/as/0010r", config, headers)
				.then(response =>  {
					resolve(response.body)
				})
				.catch(error => {
					reject(error)
				})

		})
	},	
	/**
	 * 로딩바 추가
	 */
	addLoading(userConfig) {
		if(userConfig.flag !== 'main'){
			userConfig.disableLoading !== true && store.dispatch('modal/addLoading')
		}
		// userConfig.disableLoading !== true && store.dispatch('modal/addLoading')
	},

	/**
	 * 로딩바 삭제
	 */
	removeLoading(userConfig) {
		if(userConfig.flag !== 'main'){
			userConfig.disableLoading !== true && store.dispatch('modal/removeLoading')
		}
		// userConfig.disableLoading !== true && store.dispatch('modal/removeLoading')
		
	},

	/**
	 * check response
	 * @param {Object} response : http service response
	 * @return {Boolean}
	// 인프라 팀의 요청으로 2차의 모든 거래는 BODY -> DATA 20210525
	checkResponse(response) {
		const data = response.data || {}
		const header = data.header || {}
		const hasBody = !!data.body									// body가 있으면 true
		const isSuccess = header.rspRztDsc === '0' 	// 리턴 코드 '0' 이면 true
		return hasBody && isSuccess
	},
	 */
	checkResponse(response) {
		const data = response.data || {}
		const hasData = !!response.data							// data가 있으면 true
		if(data.rspRztDsc === undefined) data.rspRztDsc = '0'     //응답코드가 없을 경우 성공으로 강제 처리
		const isSuccess = data.rspRztDsc === '0' 	// 리턴 코드 '0' 이면 true
		return hasData && isSuccess
	},

	checkResponseOld(response) {
		const data = response || {}
		const header = data.header || {}
		const hasBody = !!data.body									// body가 있으면 true
		const isSuccess = header.rspRztDsc === '0' 	// 리턴 코드 '0' 이면 true
		return hasBody && isSuccess
	},

	/**
	 * 무결성 체크를 위해 해더 정보를 생성
	 * CryptoJS.HmacSHA256 사용
	 * @param {Object} payload
	 * @return {Object}
	 */
	getEncodingHeaders(payload) {
		// 운영이 아니면 무결성 해더 설정 하지 않음
		// 헤더정보 BXI에서 체크 20210831
		// if (import.meta.env.VITE_ENV !== 'R') {
		// 	return {}
		// }
		
		// TO-BE SERVICE 와 테스트로 적용 이후 기존처럼 개발은 무결성 헤더 설정 안함
		try {
			const userInfo = store.state.user.userInfo || {}
			const apiKey = userInfo.apiKey || ''
			const timestamp = new Date().getTime()
			const message = stringify(payload) + '^' + timestamp
			const hash = HmacSHA256(message, apiKey)
			const messageDigest = Base64.stringify(hash)
			const usrId    = userInfo.mydtCusno
			// const orgBsnDsC = userInfo.chnlGbn

			let orgBsnDsC = ''
			if(userInfo.chnlGbn === undefined || userInfo.chnlGbn === null || userInfo.chnlGbn === '')
			{
				orgBsnDsC = JSON.parse(sessionStorage.getItem('userInfo')).chnlGbn
			}else{
				orgBsnDsC = userInfo.chnlGbn
			}

			return {apiKey, timestamp, messageDigest, usrId, orgBsnDsC}
			//return {apiKey, timestamp, messageDigest, usrId}
		} 
		catch (error) {
			console.error(error)
			return {}
		}

	},

	getEncodingHeadersOld(payload) {
		// 운영이 아니면 무결성 해더 설정 하지 않음
		if (import.meta.env.VITE_ENV !== 'R') {
			return {}
		}

		try {
			const userInfo = store.state.user.userInfo || {}
			const apiKey = userInfo.apiKey || ''
			const timestamp = new Date().getTime()
			const message = stringify(payload) + '^' + timestamp
			const hash = CryptoJS.HmacSHA256(message, apiKey)
			const messageDigest = CryptoJS.enc.Base64.stringify(hash)
			return {apiKey, timestamp, messageDigest}
		} 
		catch (error) {
			console.error(error)
			return {}
		}
	},

	/**
	 * 기본 config 에 사용자가 설정한 config 를 합처서 리턴
	 * @param {Object} userConfig : 사용자가 설정한 config
	 * @return {Object}
	 */
	mergeDefaultConfig(userConfig) {

		// 인프라 팀의 요청으로 2차의 모든 거래는 헤더 없이 순수 데이터만 전송 20210525
		const config = {
			method: userConfig.method || constant.POST,
			url: userConfig.url || '',
			data: userConfig.data || {}
		}
		return config
	},

	mergeDefaultConfigOld(userConfig) {
		const guid = uuid()
		const time = dateFormat(new Date(), 'YYYYMMDDHHmmssSSS')
		const userInfo = store.state.user.userInfo || {}
		const pageInfo = store.state.layout.pageInfo || {}
		const modalConfig = store.state.modal.modalConfig || {}
		const isModal = !!store.state.modal.modalComponent
		const scrnNo = isModal ? '0000' : pageInfo.name // 모달이 있으면 모달 name 아니면 페이지 name
		const scrnCallNo = isModal ? modalConfig.name : '00'
		const data = {
			header: {
				stdTgrmVer: 1,										// 표준전문버전
				guid: guid,												// GUID (UUID)
				guidSq: 1,												// GUID순서
				firGuid: guid,										// 최초GUID
				rmsSysC: 'COP',										// 최초전송시스템코드
				rqrRspDsc: 'S',										// 요청응답구분코드
				sczDsc: 'S',											// 동기화구분코드
				scrnNo: scrnNo,										// 화면번호 (화면이 아닐경우 '0000')
				scrnCallNo: scrnCallNo,						// 화면호출번호 (팝업이 아닌경우 '00')
				firTmsSysC: 'MOB',								// 최초전송시스템코드
				fstTrmsUntBuzCd: 'AS',						// 최초전송단위업무코드
				firChanC: 'M0',										// 최초채널코드
				firTmsDtm: time,									// 최초전송일시 (yyyyMmddhhMMssSSS)
				langDsc: 'ko',										// 언어구분코드
				envDsc: import.meta.env.VITE_ENV,	// 환경구분코드 'D':개발, 'T':테스트, 'R':운영
				tmsSysC: 'MOB',										// 전송시스템코드
				tmsNodeNo: 'FEP01',								// 전송노드번호
				tmsDtm: time,											// 전송일시
				rspRztDsc: '',										// 응답결과구분코드
				usrId: userInfo.asetAmnCusno, 		// 사용자ID
			},
			body: userConfig.data || {}
		}
		
		const config = {
			method: userConfig.method || constant.POST,
			url: userConfig.url || '',
			data: data
		}

		return config
	},

	/**
	 * 서비스 에러시 에러페이지로 이동
	 * 예외 url은(ignoreUrlList) 에러 페이지로 보내지 않는다.
	 */
	moveErrorPage(response={}) {
		const config = response.config || {}
		const url = config.url || ''
		if (!ignoreUrlList.includes(url)) {
			routerService.moveServiceError(response)
		}
	},

	/**
	 * axoi sync 서비스 호출
	 * @param {Object} userConfig : 사용자가 설정한 config
	 * @return {Promise}
	 */
	async syncCall(userConfig) {
		try{
			// config
			const config = this.mergeDefaultConfig(userConfig)
			// 무결성 체크를 위한 header 셋팅
			config.headers = this.getEncodingHeaders(config.data)
			// add loading
			this.addLoading(userConfig)

			// http service call
			const result = await axios(config).then(
				response => {
					// remove loading
					this.removeLoading(userConfig)
					// response check

					if (this.checkResponse(response)) {
						return response.data
					} else {
						this.moveErrorPage(response)
						//reject(response)
					}
				},
				error => {
					// remove loading
					this.removeLoading(userConfig)
					// moveServiceError
					routerService.moveServiceError(error)
					// reject
				}
			)
			return result
		}catch(error)
		{
			console.log(error)
			routerService.moveServiceError(error)
		}
	},
	assetGather(config){
		return new Promise((resolve, reject) => {
			//비정기 자산 정보 수집처리
			modalService.toast(constant.MESSAGE.START_GATHER_ASSETS) // 토스트 메세지 (자산 업데이트 진행중입니다.)
			$.ajax({
				url : import.meta.env.VITE_API_URL + import.meta.env.VITE_API_CONTEXT + config.url,
				type : "POST",
				contentType : 'application/json;charset=UTF-8',
				dataType : "json",
				data : JSON.stringify(config.data)
			})
			.done((response)=>{
				console.log('assetGather done', response)
				modalService.toast(constant.MESSAGE.END_GATHER_ASSETS) // 토스트 메세지 (자산 업데이트 진행중입니다.)

				/////////////////////////////// CBT ////////////////////////////
				let assetConfig = {}
				assetConfig = {
					url: '/ma/ma/01r02', // '/ma/ma/01ra1',
					data: {
						"mydtCusno" : this.getUserInfo('mydtCusno'),
						"basYm" : dateFormat(new Date(), "YYYYMM"),
						"mainFlag" : '0'
					},
					flag : 'main'
				}

				this.call(assetConfig).then(response =>{
					console.log('강제이후 확인용..', response)
				})
				resolve(response.rsp_code)
			})
			.fail((error)=>{
				console.log(error)
				modalService.toast(constant.MESSAGE.ERROR_GATHER_ASSETS) // 토스트 메세지 (자산 업데이트시 오류가 발생하였습니다.)
				reject(error)
			})
		})
	},
	pfmLogSend(psAmnScid){ //PFM로그 처리 화면접속이력 등록 POST
		this.removeLoading("App")	
		const userInfo = store.state.user.userInfo || {}
		//console.log('pfmLogSend', userInfo.mydtCusno, psAmnScid)

		if (userInfo.mydtCusno !== undefined && userInfo.mydtCusno !== null && userInfo.mydtCusno !=='' &&
			psAmnScid !== undefined && psAmnScid !== null && psAmnScid !=='' )
		{
		
			let userConfig = {
								url: '/co/co/00I01',
								data: {
									"mydtCusno" : userInfo.mydtCusno,
									"psAmnScid" : psAmnScid
								}								
							}

			// config
			const config = this.mergeDefaultConfig(userConfig)
			// 무결성 체크를 위한 header 셋팅
			config.headers = this.getEncodingHeaders(config.data)
			// http service call
			axios(config).then(
				response => { console.log(response)},
				error => {console.log(error)}
			).catch(error => {console.log(error)})
		}
	},
	callWithNoPromise(userConfig){ //리턴없는 Api호출
		// config
		const config = this.mergeDefaultConfig(userConfig)
		// 무결성 체크를 위한 header 셋팅
		config.headers = this.getEncodingHeaders(config.data)
		// http service call
		axios(config).then(
			response => { console.log(response)},
			error => {console.log(error)}
		).catch(error => {console.log(error)})
	},
    getUserInfo(key) {
		const userInfo = store.state.user.userInfo || {}
		return key ? userInfo[key] : userInfo
	},

	/**
	 * xml 생성 테스트
	 */
	parseXml(data) {
		var xml, tmp
		if(!data || typeof data !== 'string') {
			return null
		}
		try{
			if(window.DOMParser) {
				tmp = new DOMParser();
				xml = tmp.parseFromString(data, "text/xml")
			} else {
				xml = new ActiveXObject("Microsoft.XMLDOM")
				xml.async = "false"
				xml.loadXML(data)
			}
		} catch(e) {
			xml = undefined
		}

		if(!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
			throw new Error("Invalid XML: " + data)
		}

		return xml
	},

	/**
	 * NH콕마이데이터4.0 신규)
	 * xml to json
	 */
	xmlToJson(xml) {
		var obj = {}

		if(xml.nodeType == 1) {
			// element
			// do attributes
			if(xml.attributes.length > 0) {
				obj["Attributes"] = {}
				for(let i=0; i<xml.attributes.length; i++) {
					let attribute = xml.attributes.item(i)
					obj["Attributes"][attribute.nodeName] = attribute.nodeValue
				}
			}
		} else if(xml.nodeType == 3) {
			// text
			obj = xml.nodeValue
		}

		let textNodes = [].slice.call(xml.childNodes).filter(function(node){
			return node.nodeType === 3
		})
		if(xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
			obj = [].slice.call(xml.childNodes).reduce(function(text, node){
				return text + node.nodeValue
			}, "")
		} else if(xml.hasChildNodes()) {
			for(let i=0; i<xml.childNodes.length; i++) {
				let item = xml.childNodes.item(i)
				let nodeName = item.nodeName
				if(typeof obj[nodeName] == "undefined") {
					obj[nodeName] = this.xmlToJson(item)
				} else {
					if(typeof obj[nodeName].push == "undefined") {
						let old = obj[nodeName]
						obj[nodeName] = []
						obj[nodeName].push(old)
					}

					obj[nodeName].push(this.xmlToJson(item))
				}
			}
		}

		return obj
	}
}