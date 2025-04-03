<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번에 > 자산 연결 중 로딩 화면
* @ 페이지설명 : 한번에 > 자산 연결 중 로딩 화면
* @ 파일명     : src/views/page/CO/AR/COAR2007/COAR2007.vue
* @ 작성자     : CS533459
* @ 작성일     : 2023-07-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-11              CS533459              마이데이터 확대 개발 적용
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="renewal_loading">
				<div class="dataLoadingArea mov">
					<div class="dataLoadingBox">
						<img src="@/assets_v40/images/loading/img_dataLoadingBg.png" class="front" alt="">
						<img src="@/assets_v40/images/loading/img_dataLoadingPaper03.png" class="paper3" alt="">
						<img src="@/assets_v40/images/loading/img_dataLoadingPaper02.png" class="paper2" alt="">
						<img src="@/assets_v40/images/loading/img_dataLoadingPaper01.png" class="paper1" alt="">
						<img src="@/assets_v40/images/loading/img_dataLoadingFront.png" alt="">
					</div>
				</div>
				<p class="loading_name">
					{{selectedCnt}}개 기관에 흩어져 있는<br><strong>{{cusnm}}님</strong>의 정보를 가져오고 있어요
				</p>
				<p class="loading_txt">잠시만 기다려 주세요 <span class="loading_dot"></span></p>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="closeAll()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
/* eslint-disable */
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import routerService from '@/service/routerService'
import {dateFormat} from '@/utils/date'
import {mapActions, mapGetters} from 'vuex'
import moment from 'moment'
import _ from 'lodash'

import COAR2008 from '@/views/page/CO/AR/COAR2008/COAR2008.vue'
import COAR2010 from '@/views/page/CO/AR/COAR2010/COAR2010.vue'
import COAR2025 from '@/views/page/CO/AR/COAR2025/COAR2025.vue'
//import MRAM1002 from '@/views/page/MR/AM/MRAM1002/MRAM1002.vue' => COAR2010 으로 합쳐짐

export default {
    name : "COAR2007",
    data: () => {
        return {
			continueFlag	: "",	// 이어하기 전용 플래그 (이어하기 진행시 "continue")
			continueData	: {},	// 이어하기 전용 데이터

			cusnm			: "",	// 마이데이터 사용자명
			certDsc			: "",	// (필수) 인증방법구분 (공동인증 : joint, 금융인증 : finance, 패스인증 : pass)
			userAgreeInfo	: "",	// 모창) 사용자 동의 정보
			ca_org_type		: "",	// 모창) 인증서 타입
			ca_org_name		: "",	// 모창) 인증서 명
			moduleList		: [],	// 모창) 선택 기관 리스트

			// PASS 인증 관련
			cert_tx_id		: "",	// 인증기관 트랜잭션 ID
			response102		: {},	// PASS 1차인증 응답 response

			// PASS 2차인증 관련
			sign_tx_id		: "",	// 서명요청 트랜잭션 ID
			telco_tycd		: "",	// 통신사구분코드
			consentArray	: {},	// 전송요구내역 JSON Object

			// 2차 인증 관련
			caOrgOne		: "",
			caOrgTwo		: "",
			signListOne		: [],	// 전자서명 결과 리스트 1
			signListTwo		: [],	// 전자서명 결과 리스트 2
			attcC			: "",	// Nonce코드
			attcCext		: "",	// Nonce코드
			end_period		: "",	// 전송요구종료일자
			orgTotScopeList	: [],	// 연결할 기관 내 자산 통합 리스트
			selOrgAsetList	: [],	// 연결 선택 기관 내 전제 자산 리스트
			org_fail_list	: [],	// 연결 실패 기관 리스트
			selectList		: [],	// COAR2008 에서 선택한 체크 리스트
			isMramMod		: "",	// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
			isBckYn			: false,// '연결기관 관리 변경'의 기관별 자산 백업데이터 전체 유무

			tokenFlag		: "",	// 자산조회용토큰요청 처리 결과 flag (1: 처리중, 2:처리완료, 3:처리실패, 4:자산없음, 5:단건 타기관 실패)

			responseJson	: {},	// '정보제공자 업권별 목록 제공 API' 응답 파라미터
			success_cnt		: "",	// '정보제공자 업권별 목록 제공 API' 성공 기관 수
			success_org_list: [],	// '정보제공자 업권별 목록 제공 API' 성공 기관 리스트
			fail_cnt		: "",	// '정보제공자 업권별 목록 제공 API' 실패 기관 수
			fail_org_list	: [],	// '정보제공자 업권별 목록 제공 API' 실패 기관 리스트

			isFirstStepYn	: false,	// 인증 첫 단계 여부 flag

			dataForLoad : "",	// 통합인증 개인신용정보 전송요구 API 요청 파라미터

			retryFlag : false,	// 실패기관 목록요청 재시도 flag
			retryData : {},		// 실패기관 목록요청 response 데이터

			selectedCnt : 0 ,
			publicOrgList : "",
			alreadyConList : "",
			isOnlyPublic : false , //공공기관만 선택한 case 체크 용도
			isAlreadyConnect : false , //이미 연결된 기관만 선택한 case 체크 용도
        }
	},
    mounted() {
		this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     
    },
    mixins: [
		commonMixin,
        popupMixin
	],
	computed:{
		
	},
    methods: {
		...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
		]),
		...mapGetters('myassets', [
            'isMyAssetGathering'
        ]),
        initComponent(param = {}) {
			console.log(">>>>>>>>>>>> ", param)
			//////////////////////// 이어하기 사용 파라미터 /////////////////////
			this.continueFlag 	= param.continueFlag || ""
			this.continueData	= param.continueData || {}
			///////////////////////////////////////////////////////////////////

			//////////////////////// 공통 사용 파라미터 /////////////////////////
			this.certDsc 			= param.certDsc || ""
			this.userAgreeInfo 		= param.userAgreeInfo || {}
			this.ca_org_type 		= param.ca_org_type || ""
			this.signListOne		= param.signListOne || []
			this.signListTwo		= param.signListTwo || []
			this.end_period			= param.end_period || ""
			this.orgTotScopeList	= param.orgTotScopeList || []
			this.selOrgAsetList		= param.selOrgAsetList || []
			this.org_fail_list		= param.org_fail_list || []
			this.selectList			= param.selectList || []
			this.selectedCnt		= param.selectedCnt || 0
			///////////////////////////////////////////////////////////////////

			this.ca_org_name 	= param.ca_org_name || ""
			this.isFirstStepYn	= param.isFirstStepYn ? true : false
			this.moduleList		= param.moduleList || []

			this.attcC 			= param.attcC || ""
			this.attcCext 		= param.attcCext || ""
			// this.signListOne 	= param.signListOne || []
			// this.signListTwo 	= param.signListTwo || []
			this.caOrgOne 		= param.caOrgOne || ""
			this.caOrgTwo 		= param.caOrgTwo || ""

			this.dataForLoad = param.dataForLoad || {}

			this.response102 = param.response102 || {}

			this.sign_tx_id = param.sign_tx_id || ""
			this.cert_tx_id = param.cert_tx_id || ""
			this.telco_tycd = param.telco_tycd || ""
			this.consentArray = param.consentArray || {}

			this.retryFlag = param.retryFlag ? true : false
			this.retryData = param.retryData || {}

			this.isMramMod = param.isMramMod || ""
			this.isBckYn = param.isBckYn ? true : false

			this.publicOrgList = param.publicOrgList || ""
			this.isOnlyPublic = param.isOnlyPublic || false
			this.alreadyConList = param.alreadyConList || ""
			this.isAlreadyConnect = param.isAlreadyConnect || false


			if(this.retryFlag) {
				// 실패기관 목록요청 재시도
				this.getDataRetry()
			} else {
				this.getData()
			}
			
			// 개발 임시 테스트 데이터 -- 공동인증 1차
			// if(import.meta.env.VITE_ENV === 'D') {
			// 	if(this.isFirstStepYn) {
			// 		this.fn_test()
			// 	} else {
			// 		this.fn_test_complete()
			// 	}
			// }

			setInterval(this.loadingBox, 2000);
		},
		
		getDataRetry() {
			this.getAsetList(this.retryData.error_description)
		},

        getData() {
			this.cusnm = this.getUserInfo("cusnm")

			if(this.continueFlag === "continue") {
				// 이어하기 진행시
				console.log(this.continueData.error_description)
				let dataList = JSON.parse(this.continueData.error_description)
				this.ca_org_type = this.continueData.ca_org_type
				// ca_org_type 에 따른 이전 인증방법 구분
				console.log("인증타입 >> ", this.ca_org_type, " ++ ", commonService.getStorage("continueCert"+this.getUserInfo("mydtCusno")))
				if(this.getUserInfo("chnl") === "385") {
					// 스뱅일경우 (공동, 금융, pass 가능)
					if(this.ca_org_type === "05") this.certDsc = "joint"
					else if(this.ca_org_type === "06" && commonService.getStorage("continueCert"+this.getUserInfo("mydtCusno")) === "finance") {
						this.certDsc = "finance"	
					} else if(this.ca_org_type === "06" && commonService.getStorage("continueCert"+this.getUserInfo("mydtCusno")) === "pass") {
						this.certDsc = "pass"
					} else {
						this.certDsc = "joint"	// 오류로인해 이전 인증 구분이 없을경우 공동인증서 set
					}
				} else {
					// 콕뱅일경우 (공동, pass 가능)
					if(this.ca_org_type === "05") this.certDsc = "joint"
					else if(this.ca_org_type === "06") {
						this.certDsc = "pass"	
					}
				}
				// !! PASS 인증도 ca_org_type을 금융인증과 같은 구분값('06')을 사용한다 하여 추후 서비스(/co/ar/00r01) 이 변경될 여지가 있음

				for(let i=0; i<dataList.length; i++) {
					this.ca_org_name = dataList[i].caOrg
				}

				this.getAsetList(this.continueData.error_description)
			} else {
				// 이어하기 아닐시
				switch(this.certDsc) {
					case "joint" : 
						if(this.isFirstStepYn) {
							// 1차인증
							if( window.location.host.indexOf('localhost') > -1 ) {
								// 환경 :: 로컬서버일 경우 바로 COAR2008 이동
								this.fn_test()
							} else {
								// 환경 :: 운영/개발 서버일 경우 토큰 발급 및 자산 모음 진행
								this.getAsetListToken()
							}
						} else {
							// 2차인증
							if( window.location.host.indexOf('localhost') > -1 ) {
								// 환경 :: 로컬서버일 경우 바로 COAR2010 이동
								this.fn_test_complete()
							} else {
								// 환경 :: 운영/개발 서버일 경우 자산 수집 처리 후 완료화면이동
								this.fn_collectAset()
							}
						}
						break;
					//COAR2003 에서 금융인증서로 선택한 CASE
					case "finance" :
						if(this.isFirstStepYn) {
							// 1차인증
							if( window.location.host.indexOf('localhost') > -1 ) {
								//환경 :: 로컬서버일 경우 바로 COAR2008 이동
								let compName = COAR2008
								const config = {
									component : compName,
									params : {
										moduleList 		: this.moduleList,
										attcC 			: this.attcC,
										attcCext   		: this.attcCext,
										signListOne 	: this.signListOne,
										signListTwo 	: this.signListTwo,
										userAgreeInfo 	: this.userAgreeInfo,
										caOrgOne  		: this.caOrgOne,
										caOrgTwo  		: this.caOrgTwo,
										ca_org_type 	: "06",
										certDsc			: this.certDsc,
										responseJson	: this.params.responseJson,
										isMramMod		: this.isMramMod,
									}
								}
								console.log(config)
								modalService.openPopup(config).then(response => {
									console.log(response)
								})
							} else {
								// 환경 :: 운영/개발 서버일 경우 토큰 발급 및 자산 모음 진행
								commonService.setStorage("continueCert"+this.getUserInfo("mydtCusno"), "finance")
								this.getAsetListToken()
							}
						} else {
							// 2차인증
							if( window.location.host.indexOf('localhost') > -1 ) {
								// 환경 :: 로컬서버일 경우 바로 COAR2010 이동
								this.fn_test_complete()
							} else {
								// 환경 :: 운영/개발 서버일 경우 자산 수집 처리 후 완료화면이동
								this.fn_collectAset()
							}
						}
						break;
					case "pass" :
						if(this.isFirstStepYn) {
							// 1차인증
							if( window.location.host.indexOf('localhost') > -1 ) {
								// 환경 :: 로컬서버일 경우 바로 COAR2008 이동
								let compName = COAR2008
								const config = {
									component : compName,
									params : {
										moduleList 		: this.moduleList,
										attcC 			: this.attcC,
										attcCext   		: this.attcCext,
										signListOne 	: this.signListOne,
										signListTwo 	: this.signListTwo,
										userAgreeInfo 	: this.userAgreeInfo,
										caOrgOne  		: this.caOrgOne,
										caOrgTwo  		: this.caOrgTwo,
										ca_org_type 	: "06",
										certDsc			: this.certDsc,
										responseJson	: this.params.responseJson,
										isMramMod		: this.isMramMod,
										isBckYn			: this.isBckYn,
									}
								}
								console.log(config)
								modalService.openPopup(config).then(response => {
									console.log(response)
								})
							} else {
								// 환경 :: 운영/개발 서버일 경우 자산 수집 처리 후 완료화면이동
								commonService.setStorage("continueCert"+this.getUserInfo("mydtCusno"), "pass")
								this.getAsetList(this.response102.error_description)
							}
						} else {
							// 2차인증
							if( window.location.host.indexOf('localhost') > -1 ) {
								// 환경 :: 로컬서버일 경우 완료팝업으로 바로이동
							} else {
								// 환경 :: 운영/개발 서버일 경우 자산 수집 처리 후 완료화면이동
								this.fn_oAuthConfirmPass2()
							}
						}
						break;
				}

				//공공기관만 요청한 CASE 
				if(this.isOnlyPublic) this.getAsetList(this.publicOrgList)
				//이미 연결된 기관만 CASE
				if(this.isAlreadyConnect) this.getAsetList(this.alreadyConList)
			}


			if(!this.isFirstStepYn) {
				console.log(this.dataForLoad)
			}
		},
		
		// 마이데이터사업자 통합인증 자산목록 조회토큰 요청 POST
		getAsetListToken() {

			const passwordList = []
			const personList = []
			// for(let i=0; i<this.signedDataList.length; i++){
			// 	passwordList.push({"orgCode" : this.signedDataList[i].orgCode, "signedConsent" : this.signedDataList[i].signedConsent, "password_len" : this.signedDataList[i].signedConsent.length})
			// 	personList.push({"orgCode" : this.signedDataList[i].orgCode, "signedPersonInfoReq" : this.signedDataList[i].signedPersonInfoReq, "signedPersonInfoReq_len" : this.signedDataList[i].signedPersonInfoReq.length})
			// }
			// 20210707 기존 코딩 start
			for(let i=0; i<this.signListOne.length; i++){
				personList.push({"orgCode" : this.signListOne[i].orgCode, "signedPersonInfoReq" : this.signListOne[i].signedPersonInfoReq, "signedPersonInfoReq_len" : this.signListOne[i].signedPersonInfoReq.length})
			}
			// 20210707 기존 코딩 end
			for(let i=0; i<this.signListTwo.length; i++){
				passwordList.push({"orgCode" : this.signListTwo[i].orgCode, "signedConsent" : this.signListTwo[i].signedConsent, "password_len" : this.signListTwo[i].signedConsent.length})
			}
			const consentList = []
			if(this.isMramMod === '') {
				for(let i=0; i<this.moduleList.length; i++){
					consentList.push({"snd_org_code": this.moduleList[i].orgC, "rcv_org_code" : "ZVAAAZ0000", "target_info" : [{"scope" : this.moduleList[i].orgBzrgC + '.list'}]})				
				}
			} else {
				for(let i=0; i<this.moduleList.length; i++){
					consentList.push({"snd_org_code": this.moduleList[i].infOfrmnOrgC, "rcv_org_code" : "ZVAAAZ0000", "target_info" : [{"scope" : this.moduleList[i].orgBizDsc + '.list'}]})				
				}
			}
			const config = {
				//url : "/co/ar/08r01",
				url : "/co/ar/17r01",
				disableLoading : true,
				data : {
					"auth_type": "0"
					, "request_type":"0"
					// , "consent": JSON.stringify(consentList)
					// , "consent_len":JSON.stringify(consentList).length
					, "consent": null
					, "consent_len": 0
					, "consent_nonce":this.attcCext
					, "consent_type":"0"
					, "password":JSON.stringify({"signedDataList":passwordList,"caOrg":this.caOrgOne, "caOrgType":this.ca_org_type})
					, "password_len": JSON.stringify({"signedDataList":passwordList,"caOrg":this.caOrgOne, "caOrgType":this.ca_org_type}).length
					, "signed_person_info_req":JSON.stringify({"signedDataList":personList,"caOrg":this.caOrgTwo, "caOrgType":this.ca_org_type})
					, "signed_person_info_req_len":JSON.stringify({"signedDataList":personList,"caOrg":this.caOrgTwo, "caOrgType":this.ca_org_type}).length
					, "ucpid_nonce" : this.attcC
					, "grant_type":"password"
					, "mydtCusno":this.getUserInfo('mydtCusno')
					, "svcnm":"통합인증 자산목록조회토큰요청"
					, "tmsRqrDt":null
					, "tmsEdDt":null
					, "fxtmTmsYn":null
					, "tmsObvCntn":"자산목록조회용 토큰요청"
					, "bscTmsFq":null
					, "adtTmsFq":null
					// , "bscTmsFq":"1/w"
					// , "adtTmsFq":"1/w"
					, "tmsFqDsVal":null
					, "hldExpiDtm":null
					, "client_id" : this.getUserInfo('svcClientId')
				}
			}
			
			apiService.call(config).then(response => {
				console.log(response)
				if(response.error === '00000'){
					
					if(response.error_description !== '0'){
						// 갯수.
						this.getAsetList(response.error_description)
					}else{
						this.tokenFlag = "3"

						// 토큰값 validation 후 다음 프로세스 진행 여부 판단
						this.fn_runNextProcess()
					}
				}else{
					// 1: 처리중, 2:처리완료, 3:처리실패, 4:자산없음, 5:단건 타기관 실패
					this.tokenFlag = "5"

					// 토큰값 validation 후 다음 프로세스 진행 여부 판단
					this.fn_runNextProcess()
					return false
				}
            })
		},

		// 마이데이터사업자 통합인증 자산목록 조회
		getAsetList(orgList) {
			const config = {
				//url : "/co/ar/08ra2",
				//url : "/co/ar/017r1",
				url : "/co/ar/07r01",
				data : {
					mydtCusno 		: this.getUserInfo("mydtCusno"),
					orgCodeList 	: orgList	// 마이데이터사업자 통합인증 자산목록 조회토큰 요청 response.error_description (기관코드 및 업권 포함)
				},
				disableLoading : true,
			}
			apiService.call(config).then(response => {

				console.log("마이데이터사업자 통합인증 자산목록 조회 #################################### ")
				console.log(response)

				this.responseJson = response || {}
				this.success_cnt 		= this.responseJson.success_cnt || 0
				this.success_org_list 	= this.responseJson.success_org_list || []
				this.fail_cnt			= this.responseJson.fail_cnt || 0
				this.fail_org_list		= this.responseJson.fail_org_list || []

				// 실패기관코드 기반 중복 row 제거
				this.fail_org_list = _.chain(this.fail_org_list)
										.uniqBy('org_code')
										.map(d => {
											return {
												org_code : d.org_code,
												org_name : d.org_name,
												rsp_code : d.rsp_code,
												rsp_msg	 : d.rsp_msg
											}
										})
										.value()

				if(this.success_cnt === 0) {
					// 성공개수 0개
					this.tokenFlag = "4"
				} else {
					// 성공개수 0개 초과
					this.tokenFlag = "2"
				}

				this.fn_runNextProcess()
			})
		},

		// 토큰값 validation 후 다음 프로세스 진행
		fn_runNextProcess() {
			
			if(this.tokenFlag === "3" || this.tokenFlag === "5") {	// 토큰 발급 실패 또는 단건 타기관 실패일 경우
				// 조건부는 서비스 수정에 따라 변경될 여지가 있음
				let alertMsg = "기관 연결 요청이 정상적으로<br>처리되지 않았습니다.<br>잠시 후 다시 시도해 주세요."
				const confirm_config = {
					content 			: [alertMsg],
					title				: "",
					ALERT_CONFIRM_TEXT 	: "연결 시도",
					ALERT_CANCEL_TEXT 	: "취소"
				}
				modalService.confirm(confirm_config).then(text => {
					if(text === "취소") {
						this.closeAll()
					} else if(text === "연결 시도") {
						// 토근발급부터 재시도
						if(this.certDsc === "pass") this.close('retry')
						else this.getAsetListToken()
					}
				})
			} else {
				// 토큰 발급 성공일 경우
				if(this.continueFlag !== "continue") {
					// 이어하기가 아닐경우
					// 토큰발급 실패 기관 필터링 시작
					let tmpFOrg = []
					if(this.isMramMod === '') {
						for(let i=0; i<this.moduleList.length; i++) {
							if(_.findIndex(this.success_org_list, d => d.org_code === this.moduleList[i].orgC) < 0 && _.findIndex(this.fail_org_list, d => d.org_code === this.moduleList[i].orgC) < 0) {
								tmpFOrg.push({orgC : this.moduleList[i].orgC, orgBzrgC : this.moduleList[i].orgBzrgC, orgnm : this.moduleList[i].orgnm})
							}
						}
					} else {
						for(let i=0; i<this.moduleList.length; i++) {
							if(_.findIndex(this.success_org_list, d => d.org_code === this.moduleList[i].infOfrmnOrgC) < 0 && _.findIndex(this.fail_org_list, d => d.org_code === this.moduleList[i].infOfrmnOrgC) < 0) {
								tmpFOrg.push({orgC : this.moduleList[i].infOfrmnOrgC, orgBzrgC : this.moduleList[i].orgBizDsc, orgnm : this.moduleList[i].orgnm})
							}
						}
					}

					if(tmpFOrg.length > 0){
						const config_fail = {
							url : "/co/ar/08ra3",
							data : {
								mydtCusno 	: this.getUserInfo("mydtCusno"),
								org_list 	: tmpFOrg.filter(item=> item.orgBzrgC !== 'public') //공공기관은 실패기관 재 조회 대상에서 제외한다 (목록조회 토큰발급 이력이 없기떄문)
							},
							disableLoading : true,
						}
						
						apiService.call(config_fail).then(response => {
							let tempOrgFList = response.fail_org_list || []

							// this.fail_org_list = []
							for(const failItem of tempOrgFList) {
								let tmpOrgnm = ""
								if(this.isMramMod === '') {
									tmpOrgnm = _.find(this.moduleList, d => d.orgC === failItem.org_code).orgnm
								} else {
									tmpOrgnm = _.find(this.moduleList, d => d.infOfrmnOrgC === failItem.org_code).orgnm
								}
								
								let tmpOrgBzrgC = ""
								if(this.isMramMod === '') {
									tmpOrgBzrgC = _.find(this.moduleList, d => d.orgC === failItem.org_code).orgBzrgC
								} else {
									tmpOrgBzrgC = _.find(this.moduleList, d => d.infOfrmnOrgC === failItem.org_code).orgBizDsc
								}

								this.fail_org_list.push({
									org_code 	: failItem.org_code, 
									org_biz_code: tmpOrgBzrgC,
									org_name 	: tmpOrgnm,
									rsp_code 	: failItem.fail_rsp_code,
									rsp_msg		: failItem.fail_rsp_msg
								})
							}
							for(const tmpFOrgItem of tmpFOrg) {
								if(_.findIndex(tempOrgFList, d => d.org_code === tmpFOrgItem.orgC) < 0) {
									// 실패하였지만 에러코드를 받아내지 못하였을경우
									this.fail_org_list.push({
										org_code	: tmpFOrgItem.orgC,
										org_biz_code: tmpFOrgItem.orgBzrgC,
										org_name	: tmpFOrgItem.orgnm,
										rsp_code	: "99998",
										rsp_msg		: "상대기관 응답오류",
									})
								}
							}

							// 자산 목록 화면 이동
							const config = {
								component : COAR2008,
								params : {
									userAgreeInfo 	: this.userAgreeInfo,
									ca_org_type 	: this.ca_org_type,
									ca_org_name 	: this.ca_org_name,
									responseJson 	: this.responseJson,
									fail_cnt		: this.fail_org_list.length || 0,
									fail_org_list	: this.fail_org_list || [],
									certDsc 		: this.certDsc,
									moduleList 		: this.moduleList,
									tokenFlag		: this.tokenFlag,
									attcC			: this.attcC,
									attcCext		: this.attcCext,
									cert_tx_id      : this.cert_tx_id,
									sign_tx_id      : this.sign_tx_id,
									telco_tycd		: this.telco_tycd,
									end_period		: this.end_period,
									isMramMod		: this.isMramMod,	// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
								}
							}
							modalService.openPopup(config)
						})
					}else{
							// 자산 목록 화면 이동
							const config = {
								component : COAR2008,
								params : {
									userAgreeInfo 	: this.userAgreeInfo,
									ca_org_type 	: this.ca_org_type,
									ca_org_name 	: this.ca_org_name,
									responseJson 	: this.responseJson,
									fail_cnt		: this.fail_org_list.length || 0,
									fail_org_list	: this.fail_org_list || [],
									certDsc 		: this.certDsc,
									moduleList 		: this.moduleList,
									tokenFlag		: this.tokenFlag,
									attcC			: this.attcC,
									attcCext		: this.attcCext,
									cert_tx_id      : this.cert_tx_id,
									sign_tx_id      : this.sign_tx_id,
									telco_tycd		: this.telco_tycd,
									end_period		: this.end_period,
									isMramMod		: this.isMramMod,	// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
								}
							}
							modalService.openPopup(config)

					}
						
					
				} else {
					// 이어하기일 경우 (실패기관 필터링 하지않음)
					console.log("(이어하기) 여기서 목록 이동!")
					// 토큰 발급 성공일 경우
					const config = {
						component : COAR2008,
						params : {
							userAgreeInfo 	: this.userAgreeInfo,
							ca_org_type 	: this.ca_org_type,
							ca_org_name 	: this.ca_org_name,
							responseJson 	: this.responseJson,
							// fail_cnt		: this.fail_cnt,
							// fail_org_list	: this.fail_org_list,
							certDsc 		: this.certDsc,
							moduleList 		: this.moduleList,
							tokenFlag		: this.tokenFlag,
						}
					}
					console.log(config)
					modalService.openPopup(config).then(() => {
						
					})
				}
			}
		},

		// 통합인증) 개인신용정보 전송요구 API
		fn_collectAset() {
			
			const passwordList 	= []
			const personList 	= []
			
			for(let i=0; i<this.signListOne.length; i++) {
				personList.push({"orgCode" : this.signListOne[i].orgCode, "signedPersonInfoReq" : this.signListOne[i].signedPersonInfoReq, "signedPersonInfoReq_len" : this.signListOne[i].signedPersonInfoReq.length})
			}
			for(let i=0; i<this.signListTwo.length; i++) {
				passwordList.push({"orgCode" : this.signListTwo[i].orgCode, "signedConsent" : this.signListTwo[i].signedConsent, "password_len" : this.signListTwo[i].signedConsent.length})
			}
			for(let i=0; i<personList.length; i++) {
				for(let j=0; j<this.orgTotScopeList.length; j++) {
					if(personList[i].orgCode === this.orgTotScopeList[j].snd_org_code) {
						if(this.orgTotScopeList[j].is_scheduled === "true") {
							// true
							personList[i].is_scheduled = this.orgTotScopeList[j].is_scheduled
							personList[i].fnd_cycle = "1/w"
							personList[i].add_cycle = "1/w"
						} else {
							// false
							personList[i].is_scheduled = this.orgTotScopeList[j].is_scheduled
						}
						// request_type 정의
						if(this.orgTotScopeList[j].target_info.length === 1) {
							personList[i].request_type = "0"
						} else {
							personList[i].request_type = "1"
						}

						if(this.orgTotScopeList[j].org_biz_code === 'bank') {
							// 업권이 '은행'일 경우 '적요 또는 거래메모' 동의정보 삽입
							personList[i].is_consent_trans_memo = this.orgTotScopeList[j].is_consent_trans_memo
						} else if(this.orgTotScopeList[j].org_biz_code === 'card' || this.orgTotScopeList[j].org_biz_code === 'telecom') {
							// 업권이 '카드' 또는 '통신'일 경우 '가맹점명 및 사업자등록번호' 동의정보 삽입
							personList[i].is_consent_merchant_name_regno = this.orgTotScopeList[j].is_consent_merchant_name_regno
						} else if(this.orgTotScopeList[j].org_biz_code === 'efin') {
							// 업권이 '전금'일 경우 '적요 또는 거래메모', '가맹점명 및 사업자등록번호', '상품구매 카테고리' 동의정보 삽입
							personList[i].is_consent_trans_memo = this.orgTotScopeList[j].is_consent_trans_memo
							personList[i].is_consent_merchant_name_regno = this.orgTotScopeList[j].is_consent_merchant_name_regno
							personList[i].is_consent_trans_category = this.orgTotScopeList[j].is_consent_trans_category
						}
					}
				}
			}
			let configLoadingAset = {
				url : "/co/ar/07r02",  //TO-BE MDPCOTU04SA2
				//url : "/co/ar/11r01",  AS-IS  MDPCOTU04S01
				disableLoading : true,
				data : {
					"auth_type" 				: "0",																				// 본인확인이용여부 (본인확인기관이용 : 0, 전자서명인증사업자이용 : 1)
					"request_type" 				: "1",																				// 전송요구 타입
					//"consent" 					: null,																			// 전송요구내역 AS-IS
					//"consent_len" 					: 0,		
					"consent"         			: JSON.stringify(this.consentArray),												// 전송요구내역 TO-BE 공공기관 수집목록 저장을 위함
					"consent_len" 				: JSON.stringify(this.consentArray).length,											// consent 항목길이
					"consent_nonce" 			: this.attcCext,																	// 재전송공격방지정보 전자서명이포함된 Nonce값(Base64 url-safe인코딩)
					"consent_type" 				: "0",																				// 전자서명 유형
					"password" 					: JSON.stringify({"signedDataList" : passwordList, "caOrg" : this.caOrgOne}),		// 전송요구내역전자서명(signedConsent)
					"password_len" 				: JSON.stringify({"signedDataList" : passwordList, "caOrg" : this.caOrgOne}).length,// password 항목길이
					"signed_person_info_req" 	: JSON.stringify({"signedDataList" : personList, "caOrg" : this.caOrgTwo}),			// 본인확인 이용동의 전자서명 CMS(Base64 url-safe인코딩)
					"signed_person_info_req_len": JSON.stringify({"signedDataList" : personList, "caOrg" : this.caOrgTwo}).length,	// signedPersonInfoReq 길이 (auth_type이 0인경우에만 세팅)
					"ucpid_nonce" 				: this.attcC,																		// 전자서명이포함된 Nonce값 (auth_type이 0인경우만 사용, Base64 url-safe인코딩)
					"grant_type" 				: "password",																		// 권한부여방식
					"mydtCusno" 				: this.getUserInfo("mydtCusno"),													// 마이데이터고객번호
					"svcnm" 					: "통합인증 개인신용정보 전송요구",													// 서비스명
					"tmsRqrDt" 					: dateFormat(moment(), "YYYYMMDD"),													// 전송요청일자
					"tmsEdDt" 					: this.end_period,																	// 전송종료일자
					"tmsObvCntn" 				: "상세정보 전송요구를 위한 가입상품목록 조회",										// 전송목적내용
					"hldExpiDtm" 				: this.end_period,																	// 보유만료일시
					"client_id" 				: this.getUserInfo("svcClientId"),													// 클라이언트ID
					"selOrgAsetList"			: [],
				}
			}
			console.log("상세정보 전송요구 위한 가입상품목록 조회 : ", configLoadingAset)
			apiService.call(configLoadingAset).then(response => {
				if(response.rsp_code === '00000') {
					this.fn_busReset()

					const config = {
						component : COAR2010,
						params : {
							succ_org_list 	: response.succ_org_list,
							orgTotScopeList : this.orgTotScopeList,
							selectList 		: this.selectList,
							isMramMod		: this.isMramMod,
						}
					}
					modalService.openPopup(config).then(response => {
						if(response === "completeMod") {
							this.close("completeMod")
						}
					})
				} else {
					modalService.alert("인증에 실패하였습니다.").then(text => {
						if(text === "확인") {
							this.fn_busReset()
							this.closeAll()
							routerService.moveMain()
							this.getMyBizRegInfo().then(() => {
								this.getAllMyAssetInfo()
							})
						}
					})
				}
			})
		},

		// PASS 2차 인증 진행
		fn_oAuthConfirmPass2() {// 인증 확인 버튼(전자서명 결과 조회) 
			const config = {
				//url : "/co/ar/08ra5",// IF-MOB-MDP-CO060 // MDPCOTU03R18 (AS-IS)
				url : "/co/ar/27r01",     // MDPCOTU03R20 :: PASS 사설인증서비스관리-전자서명결과 조회
				disableLoading : true,
				data : {
					cert_tx_id      : this.cert_tx_id,
					sign_tx_id      : this.sign_tx_id,

					mydtCusno       : this.getUserInfo("mydtCusno"),
					caOrg           : "INPASS0000",                             // selectPresOrgCInq 조회 쿼리문 하고 연관 있음.
					org_code        : "ZVAAAZ0000",
					grant_type      : "password",
					consent_type    : "1",
					telco_tycd      : this.telco_tycd,                          // 통신사 구분코드
					consent         : JSON.stringify(this.consentArray),
					mydtOutsOrgDsc  : "06",                                     // 공동,사설인증서구분코드
					acsTokenUzDsc   : "2",                                      // 개인정보전송용 접근토큰 요청
					// 전송내역 관련 항목
					svcnm           : "통합인증 개인신용정보 전송요구", 
					tmsRqrDt        : dateFormat(moment(), 'YYYYMMDD'),         //전송요청일자
					tmsEdDt         : this.end_period,
					tmsObvCntn      : "상세정보 전송요구를 위한 가입상품목록 조회",
					hldExpiDtm      : this.end_period,                          // 보유만료일시
					client_id       : this.getUserInfo('svcClientId'),
					selOrgAsetList	: [],
					// bscTmsFq        : "1/w",
					// adtTmsFq        : "1/w",
				}
			}
			console.log(config);
			apiService.call(config).then(response => {
				console.log("======= fn_oAuthConfirmPass2 08r15  response ======= : ", response)

				if(response != null && response.rsp_code != null){
					if(response.rsp_code == "00000"){// 전자서명 결과 조회  응답코드 정상일 경우

						/**
						 * 선택기관 기관코드 별 정렬 후
						 * api 처리 결과에 따라 성공 분류
						 */
						let selectOrgList = _.chain(this.selectList)
								.uniqBy('org_code')
								.map(d => {
									return {
										org_code : d.org_code,
										org_name : d.org_name
									}
								})
								.orderBy('org_code', 'desc')
								.value()
						let succ_org_list = []
						
						for(const selItem of selectOrgList) {
							let succIdx = _.findIndex(response.signedDataList, d => d.orgCode === selItem.org_code)

							if(succIdx > -1) {
								// 토큰발급 성공 기관에 대해 성공기관 분류
								succ_org_list.push({org_code : selItem.org_code})
							}
						}

						this.fn_privateFinishPass2(succ_org_list);

					}else{
						this.fn_returnMsgPopUpPaas(response.rsp_code);// 실제 리턴 코드 확인 후 적용 (code:40001 ~ 50008)
					}  

				}else{
					this.fn_returnMsgPopUpPaas('40010'); // 서명이 완료되지 않았습니다.(인증이 완료되지 않았습니다.)
				}
			})
		},

		// 접근토큰 리셋
		fn_busReset(){
			const config = {
				url:  "/co/ar/00r02",
				data : {
                    "mydtCusno" : this.getUserInfo('mydtCusno')
				}
			}
			apiService.call(config).then(response => {
				// 금융인증, PASS 인증 관련 구분값 초기화
				commonService.removeStorage("continueCert"+this.getUserInfo("mydtCusno"))
                console.log(response)
            })
        },
		
		fn_privateFinishPass2(successOrgList){
			console.log('selectCnt   :: ', this.selectedCnt)
			console.log('successOrgList   :: ', successOrgList)
			this.fn_busReset()

            const config = {
                component: COAR2010,
                params : {
                    orgTotScopeList : this.orgTotScopeList,
					selectList      : this.selectList,
					succ_org_list	: successOrgList,
					isMramMod : this.isMramMod,
                }
            }
            modalService.openPopup(config).then(response => {
                console.log(response)
            })
        },

		// 코드별 오류 메시지(기획에서 권장)
        // PASS 앱 리턴 코드에 대응된 메시지 팝업 
        fn_returnMsgPopUpPaas(code){
			let topMsg = "";
			let msg = "";
			let msgFlag = "";

            switch(code){
                case "3103": 
                    topMsg = "<p class='txt'>발급된 PASS 인증서가 없습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>인증서 발급 후 이용해 주세요.<br/> <a href='javascript:void(0);' role='button' onclick='this.fn_openGuidePopup()'><ui>PASS 인증서 발급 안내</ui></a><br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3104": 
                    topMsg = "<p class='txt'>PASS 앱이 설치 되지 않았습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>PASS 앱 설치 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3105": 
                    topMsg = "<p class='txt'>PASS 인증 요청 중 일시적인 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3106": 
                    topMsg = "<p class='txt'>PASS 서비스에 가입하지 않은 고객입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>서비스 가입 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3107": 
                    topMsg = "<p class='txt'>PASS 인증 요청 중 일시적인 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요. <br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3108": 
                    topMsg = "<p class='txt'>죄송합니다. 지원하지 않는 단말기입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "3199": 
                    topMsg = "<p class='txt'>PASS 인증 요청 중 일시적인 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "4106":
                    topMsg = "<p class='txt'>전자서명 불일치로 인증에 실패 하였습니다.</p>"; 
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 인증 재요청 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "4107": 
                    topMsg = "<p class='txt'>인증 유효 시간이 만료 되었습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>PASS 인증 요청을 다시 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;    
                case "4110": 
                    topMsg = "<p class='txt'>인증 정보 불일치로 인증에 실패 하였습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 인증 재요청 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break; 
                case "4112": 
                    topMsg = "<p class='txt'>PASS 인증이 정상적으로 처리되지 않았습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 인증 재요청 해 주세요. <br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break; 
                case "4115": 
                    topMsg = "<p class='txt'>PASS 인증이 정상적으로 처리되지 않았습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>PASS앱에서 인증을 완료해 주세요. <br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;

                /////// 20220802 PASS인증서_연동규격서_마이데이터사업자용_V_1_4 버전 기준으로 변경된 기획문서 NHMFM-PD-DS-03-UI 레이아웃-공통(CO)-v0.95(20220801)_취합본 31페이지 오류 코드별 메시지 반영 ///////
                case "40001": 
                    topMsg = "<p class='txt'>인증 요청 중 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40002": 
                    topMsg = "<p class='txt'>인증 요청 중 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40003": 
                    topMsg = "<p class='txt'>인증 요청 중 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40020": 
                    topMsg = "<p class='txt'>통신사에 가입된 사용자가 아닙니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40021": 
                    topMsg = "<p class='txt'>죄송합니다. 지원하지 않는 단말기입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40022": 
                    topMsg = "<p class='txt'>일시 정지된 휴대폰 번호입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40023": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>PASS 서비스에 가입하지 않은 고객입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>서비스 가입 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40024": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>발급된 PASS 인증서가 없습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>인증서 발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40025": 
                    topMsg = "<p class='txt'>분실 신고된 휴대폰번호 입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40026": 
                    topMsg = "<p class='txt'>이용이 제한된 사용자 입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40027": 
                    topMsg = "<p class='txt'>정보 제공이 제한된 사용자 입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40040": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>인증서가 만료되었습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>인증서 재발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40041": 
                    topMsg = "<p class='txt'>인증서 유효기간이 도래하지 않았습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40042": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>인증서가 삭제 되었습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>인증서 재발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40043": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>인증서가 효력이 정지되었습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>인증서 재발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40044": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>유효하지 않은 인증서입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>인증서 재발급 후 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40045": // PASS 인증서 이용안내(버튼)
                    topMsg = "<p class='txt'>인증서 검증에 실패하였습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    msgFlag = true;
                    break;
                case "40010": //23.02.23 PASS 인증 미완료시 인증 재요청 버튼으로 유도하기 위한 문구 수정
                    topMsg = "<p class='txt'>인증이 완료되지 않았습니다.<br>인증 재요청 버튼을 눌러주세요.</p>";
                    msg = "<p class='txt_sub txt_gray'>PASS앱에서 인증을 완료해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40011": 
                    topMsg = "<p class='txt'>인증 요청과 일치하는 데이터가 없습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 인증 재요청 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40101": 
                    topMsg = "<p class='txt'>유효하지 않은 접근토큰 입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "40106": 
                    topMsg = "<p class='txt'>인증 유효 시간이 만료 되었습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>PASS 인증 요청을 다시 해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "50001":
                case "50002":
                case "50003": 
                    topMsg = "<p class='txt'>죄송합니다. 시스템 오류가 발생했습니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "50008": 
                    topMsg = "<p class='txt'>죄송합니다. 시스템 점검 중입니다.</p>";
                    msg = "<p class='txt_sub txt_gray'>다른 인증 방법을 이용해 주세요.<br/>PASS 고객센터<a href='tel:1800-4273' role='button'>1800-4273</a></p>";
                    break;
                case "80010": // 정보제공자 문제로 인한 미확인 원인 코드 추가
				case "etc":
                    topMsg = "<p class='txt'>인증 요청 중 오류가 발생했습니다.</p>";
					msg = "<p class='txt_sub txt_gray'>잠시 후 다시 이용해 주세요.<br/></p>";
					msgFlag = true;
                    break;
                /////// 20220802 PASS인증서_연동규격서_마이데이터사업자용_V_1_4 버전 기준으로 변경된 기획문서 NHMFM-PD-DS-03-UI 레이아웃-공통(CO)-v0.95(20220801)_취합본 31페이지 오류 코드별 메시지 반영 ///////
                default:
                    break;
            }	

            let secedeBoxHtml = topMsg + msg;
 
            let compName = COAR2025
            const config = {
                component: compName,
                params : {
                    code : code,
                    msg  : msg,
                    msgFlag : msgFlag,
                    secedeBoxHtml : secedeBoxHtml,
                }
            }
            console.log(config)
            modalService.openPopup(config).then(response => {
                console.log(response)
                this.$nextTick(()=>{
                    // 출력위치가 인증확인 화면 아닌경우 현재 화면 닫고 인증요청 화면 보이기
                    if(code != "40010"){
                        console.log("현재 페이지 닫기");
						// this.fn_setMarketUrl(this.telco_tycd); // 향후 설치화면 호출시 다시 사용
						
						// this.close(code);
						this.fn_busReset()
						this.closeAll()
						routerService.moveMain()
						this.getMyBizRegInfo().then(() => {
							this.getAllMyAssetInfo()
						})
					}else{
						this.close()
					}
                })
            })
		},
		

		loadingBox(){
			$('.dataLoadingArea').removeClass('mov');//setInterval전 첫번째 애니메이션을 위한 css삭제
			$('.dataLoadingBox').animate({'right':'50%'},500,//박스 이동
				()=>{
					setTimeout(
						()=>{
							//원래 위치로 이동
							//jQuery('.dataLoadingBox').css('right','');//박스
							$('.dataLoadingBox .paper1, .dataLoadingBox .paper2, .dataLoadingBox .paper3').css('opacity','').css('bottom','');//종이 1,2,3
						}
					,1500);
				}
			);
			setTimeout(//순차 모션
				()=>{//박스로 떨어지는 모션
					$('.dataLoadingBox .paper1').css('opacity',1).animate({'bottom':'0'},300);
				},500
			);
			setTimeout(
				()=>{
					$('.dataLoadingBox .paper2').css('opacity',1).animate({'bottom':'0'},300);
				},700
			);
			setTimeout(
				()=>{
					$('.dataLoadingBox .paper3').css('opacity',1).animate({'bottom':'0'},300);
				},900
			);
			clearTimeout();
			clearInterval(this.loadingBox);
		},

		
		fn_test_complete() {
			// 개발 테스트 완료팝업 이동 (2차인증)
			const config = {
				component : COAR2010,
				params : {
					orgTotScopeList : this.orgTotScopeList,	// 개발) 연결 기관 리스트
					org_fail_list 	: this.org_fail_list,	// 개발) 연결 실패 기관 리스트
					selectList 		: this.selectList,		// 개발) 선택 자산 리스트
					isMramMod		: this.isMramMod, //신규 , 변경 여부
				},
			}
			modalService.openPopup(config)
		},

		///////// 개발 임시 테스트 데이터를 통한 팝업 오픈
		fn_test() {
			// 개발 테스트 부 (추후 삭제)
			this.responseJson = this.params.responseJson || {}

			if(this.tokenFlag === '3') {
				let alertMsg = "기관 연결 요청이 정상적으로<br>처리되지 않았습니다.<br>잠시 후 다시 시도해 주세요."
				const confirm_config = {
					content 			: [alertMsg],
					title				: "",
					ALERT_CONFIRM_TEXT 	: "연결 시도",
					ALERT_CANCEL_TEXT 	: "취소"
				}
				modalService.confirm(confirm_config).then(text => {
					if(text === "취소") {
						this.closeAll()
					} else if(text === "연결 시도") {
						// 토근발급부터 재시도
						console.log("토큰발급부터 재시도 asis::getAsetListToken()")
					}
				})
			} else {
				// 테스트 부분 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				setTimeout(() => {
					const config = {
						component : COAR2008,
						params : {
							userAgreeInfo : this.userAgreeInfo,
							ca_org_type : this.ca_org_type,
							ca_org_name : this.ca_org_name,
							responseJson : this.responseJson,
							certDsc : this.certDsc,
							moduleList : this.moduleList,
							isMramMod : this.isMramMod,
							isBckYn : this.isBckYn,
						}
					}
					console.log(config)
					modalService.openPopup(config).then(() => {
						
					})
				}, 2000);
			}
		}
    },
    components : {
    },
	destroyed() {
		clearInterval(this.loadingBox)
	}
}


</script>