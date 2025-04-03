<!--
/*************************************************************************
* @ 서비스경로 : 자산연결 > 금융자산 > 한번에 > 공동인증서 선택 및 인증
* @ 페이지설명 : 공동인증서 선택 및 인증
* @ 파일명     : src/views/page/CO/AR/COAR2016/COAR2016.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-19              CS528069              최초작성
* 2023-08-07			  CS533459				상호금융 마이데이터 확대 개발 적용
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>인증서 선택</h1>
		</div>
		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<strong class="titH1">
					자산을 가져오기 위해<br>
					공동인증서를 선택해 주세요.
				</strong>
			</div>
			<div class="com_inner">
				<a href="javascript:void(0)" role="button" class="cfc_box" v-for="(certItem, certIdx) in certList" :key="'cert_'+certIdx" @click="fn_certClick(certItem)" ref="certRadio">
					<strong class="name" v-if="certItem.subjectCn">{{userName}}</strong>
					<div class="cfc_detail_box">
						<span class="class_name">발급자</span>
						<strong class="class_detail">{{certItem.issuer}}</strong>
					</div>
					<div class="cfc_detail_box">
						<span class="class_name">용도</span>
						<strong class="class_detail">{{certItem.certPolicy}}</strong>
					</div>
					<!-- <div class="cfc_detail_box">
						<span class="class_name">발급일</span>
						<strong class="class_detail">{{certItem.notBefore}}</strong>
					</div> -->
					<div class="cfc_detail_box">
						<span class="class_name">만료일</span>
						<em class="class_detail">{{certItem.notAfter}}</em>
					</div>
				</a>
				<a href="javascript:void(0)" role="button" class="cfc_box" v-show="isLocal" @click="fn_test()">
					<strong class="name">김농협</strong>
					<div class="cfc_detail_box">
						<span class="class_name">발급자</span>
						<strong class="class_detail">금융결제원</strong>
					</div>
					<div class="cfc_detail_box">
						<span class="class_name">구분</span>
						<strong class="class_detail">은행개인</strong>
					</div>
					<div class="cfc_detail_box">
						<span class="class_name">만료일</span>
						<em class="class_detail">2024.04.05</em>
					</div>
				</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="fn_close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import {dateFormat} from '@/utils/date'
import moment from 'moment'
import _ from 'lodash'
import store from '@/store'

// import COAR2008 from '@/views/page/CO/AR/COAR2008/COAR2008.vue'
import COAR2007 from '@/views/page/CO/AR/COAR2007/COAR2007.vue'

export default {
    name : "COAR2006",
    data: () => {
        return {
			certDsc			: "joint",	// (필수) 인증방법구분 (공동인증 : joint, 금융인증 : finance, 패스인증 : pass)
			moduleList   	: [],	// 선택리스트
			selectList		: [],	// 1차 인증 후 선택 기관 리스트
			certList     	: [],	// 인증서리스트
			userAgreeInfo 	: {},
			orgTotScopeList	: [],
			selOrgAsetList	: [],
			org_fail_list	: [],
			requestList  	: [],	// 전자서명 req 리스트
			
			isFirstStepYn	: true,	// 인증 첫 단계 여부 flag
			isMramMod		: '',	// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
			isBckYn			: false,// '연결기관 관리 변경'의 기관백업데이터 유무값

			////////////////////// 인증서 관련 파라미터 //////////////////////
			ca_org_name : "",	// 1차 인증시 사용했던 인증서
			ca_org_type : "",	// 1차 인증시 사용했던 인증서 타입
			signListOne : [],	// 
			signListTwo : [],	//
			caOrgOne	: "",	// 
			caOrgTwo	: "",	//
			end_period	: "",	// 
			signedDataList : [],// 서명 데이터 리스트
			////////////////////////////////////////////////////////////////

			chnl 		: "",	// 채널구분 (스뱅 : '385', 콕뱅 : '386')
			attcC		: "",	// 인증코드(Nonce코드)
			attcCext	: "",	// 인증코드(Nonce코드)

			selectCityCountry : "", // COAR2009에서 전달받은 시군구코드 (L161 (재산세) 증명서 선택 시 에만 존재함)
			consentArray 	: [],	// consent 파라미터 (추후 공공 마이데이터 수집목록 적재를 위함)
			////////////////////////////// 로컬 내 임시 테스트데이터 ///////////////////////////////
			localTestData : [],
			isLocal : window.location.host.indexOf('localhost') > -1 ? true : false,
			userName : '',

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
        initComponent(param = {}) {
			console.log(param)
			this.certDsc			= param.certDsc || "joint"
			this.moduleList         = param.moduleList || []
			this.selectList			= param.selectList || []
			this.userAgreeInfo      = param.userAgreeInfo || {}
			this.ca_org_name		= param.ca_org_name || ""
			this.orgTotScopeList	= param.orgTotScopeList || []
			this.selOrgAsetList		= param.selOrgAsetList || []
			this.org_fail_list		= param.org_fail_list || []
			this.end_period			= param.end_period || ""
			this.isFirstStepYn		= param.isFirstStepYn === '' || param.isFirstStepYn === undefined || param.isFirstStepYn === null ? true : param.isFirstStepYn
			this.isMramMod			= param.isMramMod || ""
			this.isBckYn			= param.isBckYn ? true : false
			this.selectCityCountry	= param.selectCityCountry || ""
			// 로컬 내 임시 테스트데이터
			this.localTestData = param.localTestData || []
			
			this.getData()

			// 로컬 내 정상경로 진행시 실행 메소드
			if(window.location.host.indexOf('localhost') > -1) {
				this.fn_set_locatTestData()
			}
        },
        getData() {
			this.chnl = this.getUserInfo('chnl')

			this.getNonceCode()	// 마이데이터사업자 통합인증 인증코드생성 (Nonce)
		},

		// 마이데이터사업자 통합인증 인증코드생성
		getNonceCode(){             
			const config = {
				url:  "/co/ar/05r01",
				data : {
					svcnm : "서비스명",
					orgC : ""
				}
			}
			apiService.call(config).then(response => {
                console.log(response)
                this.attcC = response.attcC || ''
                this.attcCext = response.attcCext || ''
                this.getCertList()
		
            })
		},
		
		// 핸드폰 인증서 호출
		getCertList(){              
            if(this.chnl === '385'){
                // 스뱅 
                appService.getCertList().then(response => {
                    console.log("인증서 확인용 :: ", response)
					this.certList = response.result || []
                    this.certList = this.filterCertList(this.certList) || []
                    // if(this.certList.length > 0){
                    //     for(let i=0; i<this.certList.length; i++){
                    //         this.certList[i].notAfter = dateFormat(this.certList[i].notAfter.replace(/[^0-9]/gi, ''), 'YYYY.MM.DD' )
                    //     }
                    // }
                    
                })
            }else{ 
                // 콕뱅
                console.log("콕뱅으로 접근 인증서 불러오기.")
				appService.cokBankGetCertList().then(response => {
                    console.log('콕뱅 인증서 응답값을 찍는다. :: ', response)
                    this.certList = JSON.parse(response.result) || []
                    this.certList = this.filterCertList(this.certList) || []
				})                
			}
		},

		// 인증서 필터링 (1차, 2차 인증 구분)
		filterCertList(response) {
			const isProduct = import.meta.env.VITE_ENV === 'R'	// 운영
			const certList = response || []						// APP에서 받은 인증서 리스트
			this.userName = this.getUserInfo('cusnm') || ''	// 로그인 사용자 이름
			let filterList = []

			/**
			 * 운영 & 개발 차이 :: 운영=본인 인증서만 화면표시, 개발=본인 인증서 여부 관계없이 화면표시
			 * 1차인증 & 2차인증 차이 :: 2차 인증일 경우 1차 인증에 사용한 인증서만 화면 표시
			 * --- 연결변경일 경우 제외 ---
			 * 연결변경일 경우	 - 백업데이터 Y :: 1차인증 간소화 하므로 인증서 모두보기
			 * 					- 백업데이터 N :: 간소화 하지 못하므로 1차인증에 사용한 인증서만 보이기
			 */
			if(this.isFirstStepYn || (this.isMramMod !== '' && this.isBckYn)) {	// 인증 첫 단계일시 또는 연결자산관리 메뉴의 연결변경(백업데이터 Y)일 경우
				if(isProduct) {
					// 운영
					filterList = certList
					.map(d => {
						return {
							...d,
							today: dateFormat(new Date(), 'YYYYMMDD'),
							//expireDate: (d.notAfter || '').replace(/[^0-9]/gi, '')	// '2020년 09월 11일' -> '20200911'
							expireDate: (d.notAfter || '')	// '2020년 09월 11일' 
						}
					})
					.filter(d => d.today <= d.expireDate)	// 만료된 인증서 제거
					.filter(d => (d.subjectDn || '').includes(this.userName))	// 본인 인증서 체크
				} else {
					// 개발에서는 본인인증서 상관없이 나오도록
					filterList = certList
					.map(d => {
						return {
							...d,
							today: dateFormat(new Date(), 'YYYYMMDD'),
							expireDate: (d.notAfter || '')	// '2020년 09월 11일' 
						}
					})
					.filter(d => d.today <= d.expireDate)	// 만료된 인증서 제거
				}
			} else {	// 인증 두번째 단계일시
				if(isProduct) {
					// 운영
					filterList = certList
					.map(d => {
						return {
							...d,
							today: dateFormat(new Date(), 'YYYYMMDD'),
							expireDate: (d.notAfter || '')	// '2020년 09월 11일' 
						}
					})
					.filter(d => d.today <= d.expireDate)	// 만료된 인증서 제거
					.filter(d => (d.subjectDn || '').includes(this.ca_org_name))	// !! 1차 인증시 사용했던 인증서 !!
					.filter(d => (d.subjectDn || '').includes(this.userName)) // 본인 인증서 체크
				} else {
					// 개발
					filterList = certList
                    .map(d => {
                        return {
                            ...d,
                            today: dateFormat(new Date(), 'YYYYMMDD'),
                            expireDate: (d.notAfter || '')	// '2020년 09월 11일' 
                        }
                    })
                    .filter(d => d.today <= d.expireDate) // 만료된 인증서 제거
                    .filter(d => (d.subjectDn || '').includes(this.ca_org_name)) // 1차 인증시 사용했던 인증서
				}
			}

			return filterList
		},

		// 인증서 클릭
		fn_certClick(item) {
			// 스뱅, 콕뱅 구분 : 385 -> 스뱅, 386 -> 콕뱅
			console.log(">>>> 클릭한 인증서 정보 >>> ", item)
			this.showKeyboard(item)
		},

		// 보안 키패드 보이기
		showKeyboard(item) {
            console.log('테스트테스트 스뱅 콕뱅 보안 키패드호출 start')
			if(this.chnl === "385") {
                appService.showKeyboard().then(                    
                    response => {
                        const params = {
                            subjectDn: item.subjectDn,	// 인증서 키
							password: response.result.plaintxt,	// 비밀번호
							aesencdata: response.result.aesencdata, // 스크래핑용 비밀번호
							notAfter: String(item.notAfter).replace(/[^0-9]/g, ''), // 인증서 만료일자(숫자만 추출)
						}

                        console.log(' 테스트테스트 스뱅 response : ', response.result)
                        console.log(' 테스트테스트 스뱅 subjectDn : ',  item.subjectDn)
                        console.log(' 테스트테스트 스뱅 password : ',  response.result.plaintxt)
                        console.log(' 테스트테스트 스뱅 aesencdata : ',  item.subjectDn.aesencdata)
                        console.log(' 테스트테스트 스뱅 notAfter : ',  String(item.notAfter).replace(/[^0-9]/g, ''))

						apiService.addLoading("keyboard")
                        console.log('테스트테스트 스뱅 보안 키패드호출 end')
						this.getCertPassConfirm(params, item)

					},
					() => {
                        console.log('테스트테스트 스뱅 보안 키패드호출오류 end')
					}
				)
			} else {
                
				appService.cokBankShowKeyboard().then(
					response => {
						const params = {
							subjectDn: item.subjectDn, // 인증서 키
                            password: JSON.parse(response.result).plaintxt, // 비밀번호
                            aesencdata: JSON.parse(response.result).aesencdata, // 스크래핑용 비밀번호
                            // password: response.result.plaintxt, // 비밀번호
                            // aesencdata: response.result.aesencdata, // 스크래핑용 비밀번호
                            notAfter: String(item.notAfter).replace(/[^0-9]/g, ''), // 인증서 만료일자(숫자만 추출)
						}
                        console.log(' 테스트테스트 콕뱅 response : ', response.result)
                        console.log(' 테스트테스트 콕뱅 subjectDn : ',  item.subjectDn)
                        console.log(' 테스트테스트 콕뱅 password : ',  response.result.plaintxt)
                        console.log(' 테스트테스트 콕뱅 notAfter : ',  String(item.notAfter).replace(/[^0-9]/g, ''))
                        console.log(' 테스트테스트 콕뱅 보안 키패드호출 end')
						this.getCertPassConfirm(params, item)
					},
					() => {
                        console.log('테스트테스트 콕뱅 보안 키패드호출오류 end')
					}
				)
			}
		},

		// 공동인증서 비밀번호 확인
		getCertPassConfirm(params, item) {
			console.log('인증서 비밀번호 확인 :: ', params)
			if(this.chnl === '385') {	// 스뱅
				appService.getCertPassConfirm(params).then(
					response => {
						apiService.removeLoading("keyboard")
						console.log('공인인증서 비밀번호 확인 response', response)
                        this.goSign(item, params)
					},
					() => {
						apiService.removeLoading("keyboard")
                        // appService.hideLoading()
                        console.log('공인인증서 비밀번호 에러 --------------')
                        modalService.alert('입력하신 인증서의 비밀번호가 맞지 않습니다.')
					}
				)
			} else {	// 콕뱅
				// appService.cokBankShowProgress()
				appService.cokBankGetCertPassConfirm(params).then(response =>{
                    console.log(response)
                    let resultCode = JSON.parse(response.result).resultCode
                    let resultMsg = JSON.parse(response.result).resultMsg
                    if(resultCode === 'SUCCESS'){
                        //modalService.alert("인증성공.")
                        // appService.cokBankHideProgress()
                        this.goSign(item, params)
                    }else{
                        // appService.cokBankHideProgress()
                        modalService.alert(resultMsg)
                        
                        return false
                    }
                })
			}
		},

		// 전자 서명 데이터 생성
		goSign(item, params) {
			this.requestList = []
			this.cert = item
			this.psnInfo = params
			if(this.isFirstStepYn) {
				// 통합인증 1차
				if(this.isMramMod === '') {
					for(let i=0; i<this.moduleList.length; i++) {
						this.requestList.push(
							{
								"orgCode" : this.moduleList[i].orgC
								,"ucpidRequestInfo" : {
									"ucpidNonce" : this.attcC, 
									"userAgreement" : "금융분야 마이데이터 통합인증을 위한 인증서 본인확인서비스 이용약관, 개인정보처리, 고유식별정보 수집·이용 및 위탁에 동의합니다.", 
									"ispUrlInfo": import.meta.env.VITE_API_URL,
									"userAgreeInfo":this.userAgreeInfo
								}
								,"consentInfo" : {
									"consentNonce":this.attcCext,
									"consent" : {
										"snd_org_code" : this.moduleList[i].orgC
										, "rcv_org_code" : "ZVAAAZ0000"
										, "is_scheduled" : "false"
										, "end_date":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
										, "purpose":"상세정보 전송요구를 위한 가입상품목록 조회"
										, "period":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
										, "target_info" : [
											{"scope" : this.moduleList[i].orgBzrgC + '.list'}
										]
									}
								}
							}
						)
					}
				} else {
					for(let i=0; i<this.moduleList.length; i++) {
						this.requestList.push(
							{
								"orgCode" : this.moduleList[i].infOfrmnOrgC
								,"ucpidRequestInfo" : {
									"ucpidNonce" : this.attcC, 
									"userAgreement" : "금융분야 마이데이터 통합인증을 위한 인증서 본인확인서비스 이용약관, 개인정보처리, 고유식별정보 수집·이용 및 위탁에 동의합니다.", 
									"ispUrlInfo": import.meta.env.VITE_API_URL,
									"userAgreeInfo":this.userAgreeInfo
								}
								,"consentInfo" : {
									"consentNonce":this.attcCext,
									"consent" : {
										"snd_org_code" : this.moduleList[i].infOfrmnOrgC
										, "rcv_org_code" : "ZVAAAZ0000"
										, "is_scheduled" : "false"
										, "end_date":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
										, "purpose":"상세정보 전송요구를 위한 가입상품목록 조회"
										, "period":dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
										, "target_info" : [
											{"scope" : this.moduleList[i].orgBizDsc + '.list'}
										]
									}
								}
							}
						)
					}
				}

                const requestJson = {
                    "requestList" 	: this.requestList,
                    "subjectDn"		: item.subjectDn,
                    "password"		: params.password
                }
                console.log('정보 확인용입니다.:::::',requestJson)
                this.goNative(requestJson)
				
			} else {
				// 통합인증 2차
				let consent = {}
				for(let i=0; i<this.orgTotScopeList.length; i++) {
					consent = {}
					if(this.orgTotScopeList[i].is_scheduled === "true") {
						// 정기적전송여부 true
						if(this.orgTotScopeList[i].org_biz_code === 'bank') {
							// 은행업권
							consent = {
								"snd_org_code" : this.orgTotScopeList[i].snd_org_code
								, "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "true"
                                , "fnd_cycle" : "1/w"
                                , "add_cycle" : "1/w"
                                , "end_date" : this.orgTotScopeList[i].end_period
                                , "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
                                , "period" : "99991231"
                                , "target_info" : this.orgTotScopeList[i].target_info
                                , "is_consent_trans_memo" : this.orgTotScopeList[i].is_consent_trans_memo	// 적요 또는 거래메모
							}
						} else if(this.orgTotScopeList[i].org_biz_code === 'card' || this.orgTotScopeList[i].org_biz_code === 'telecom') {
                            // 카드업권, 통신업권
                            consent = {
                                "snd_org_code" : this.orgTotScopeList[i].snd_org_code
                                , "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "true"
                                , "fnd_cycle" : "1/w"
                                , "add_cycle" : "1/w"
                                , "end_date" : this.orgTotScopeList[i].end_period
                                , "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
                                , "period" : "99991231"
                                , "target_info" : this.orgTotScopeList[i].target_info
                                , "is_consent_merchant_name_regno" : this.orgTotScopeList[i].is_consent_merchant_name_regno	// 가맹점명 및 사업자등록번호
                            }
                        } else if(this.orgTotScopeList[i].org_biz_code === 'efin'){
                            // 전금업권
                            consent = {
                                "snd_org_code" : this.orgTotScopeList[i].snd_org_code
                                , "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "true"
                                , "fnd_cycle" : "1/w"
                                , "add_cycle" : "1/w"
                                , "end_date" : this.orgTotScopeList[i].end_period
                                , "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
                                , "period" : "99991231"
                                , "target_info" : this.orgTotScopeList[i].target_info
                                , "is_consent_trans_memo" : this.orgTotScopeList[i].is_consent_trans_memo					// 적요 또는 거래메모
                                , "is_consent_merchant_name_regno" : this.orgTotScopeList[i].is_consent_merchant_name_regno	// 가맹점명 및 사업자등록번호
                                , "is_consent_trans_category" : this.orgTotScopeList[i].is_consent_trans_category			// 상품구매 카테고리
                            }
                        } else if (this.orgTotScopeList[i].org_biz_code === 'public'){

							//요청 공공기관 증명서 중  지방세세목별과세(납세)증명서(재산세) 포함 시
							if(this.orgTotScopeList[i].target_info.length < 1) continue
							for(const asetItem of this.orgTotScopeList[i].target_info[0].asset_list){
								if(asetItem.asset === 'L161' && this.selectCityCountry){
									asetItem.rpSfgvGruC = this.selectCityCountry
								}
							}

							// 공공업권
							consent = {
								"snd_org_code" : this.orgTotScopeList[i].snd_org_code
								, "rcv_org_code" : "ZVAAAZ0000"
								, "is_scheduled" : "true"
								, "fnd_cycle" : "1/m"
								, "add_cycle" : "1/m"
								, "end_date" : this.orgTotScopeList[i].end_period
								, "purpose" : "전송요구를 통한 공공마이데이터 통합조회 서비스의 이용"
								, "period" : "99991231"
								, "target_info" : this.orgTotScopeList[i].target_info
								, "orgBzrgC"  : "public"
							}
						}else {
                            // 그 외
                            consent = {
                                "snd_org_code" : this.orgTotScopeList[i].snd_org_code
                                , "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "true"
                                , "fnd_cycle" : "1/w"
                                , "add_cycle" : "1/w"
                                , "end_date" : this.orgTotScopeList[i].end_period
                                , "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
                                , "period" : "99991231"
                                , "target_info" : this.orgTotScopeList[i].target_info
                            }
                        }
					} else {
						// 정기적전송여부 false
						if(this.orgTotScopeList[i].org_biz_code === 'bank') {
							// 은행업권
							consent = {
								"snd_org_code" : this.orgTotScopeList[i].snd_org_code
								, "rcv_org_code" : "ZVAAAZ0000"
								, "is_scheduled" : "false"
								// , "fnd_cycle" : "1/w"
								// , "add_cycle" : "1/w"
								, "end_date" : this.orgTotScopeList[i].end_period
								, "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
								, "period" : "99991231"
								, "target_info" : this.orgTotScopeList[i].target_info
								, "is_consent_trans_memo" : this.orgTotScopeList[i].is_consent_trans_memo	// 적요 또는 거래메모
							}
						} else if(this.orgTotScopeList[i].org_biz_code === 'card' || this.orgTotScopeList[i].org_biz_code === 'telecom') {
                            // 카드업권 통신업권
                            consent = {
                                "snd_org_code" : this.orgTotScopeList[i].snd_org_code
                                , "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "false"
                                // , "fnd_cycle" : "1/w"
                                // , "add_cycle" : "1/w"
                                , "end_date" : this.orgTotScopeList[i].end_period
                                , "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
                                , "period" : "99991231"
                                , "target_info" : this.orgTotScopeList[i].target_info
                                , "is_consent_merchant_name_regno" : this.orgTotScopeList[i].is_consent_merchant_name_regno	// 가맹점명 및 사업자등록번호
                            }
                        } else if(this.orgTotScopeList[i].org_biz_code === 'efin'){
                            // 전금업권
                            consent = {
                                "snd_org_code" : this.orgTotScopeList[i].snd_org_code
                                , "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "false"
                                // , "fnd_cycle" : "1/w"
                                // , "add_cycle" : "1/w"
                                , "end_date" : this.orgTotScopeList[i].end_period
                                , "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
                                , "period" : "99991231"
                                , "target_info" : this.orgTotScopeList[i].target_info
                                , "is_consent_trans_memo" : this.orgTotScopeList[i].is_consent_trans_memo					// 적요 또는 거래메모
                                , "is_consent_merchant_name_regno" : this.orgTotScopeList[i].is_consent_merchant_name_regno	// 가맹점명 및 사업자등록번호
                                , "is_consent_trans_category" : this.orgTotScopeList[i].is_consent_trans_category			// 상품구매 카테고리
                            }
                        }else if (this.orgTotScopeList[i].org_biz_code === 'public'){

							//요청 공공기관 증명서 중  지방세세목별과세(납세)증명서(재산세) 포함 시
							if(this.orgTotScopeList[i].target_info.length < 1) continue
							for(const asetItem of this.orgTotScopeList[i].target_info[0].asset_list){
								if(asetItem.asset === 'L161' && this.selectCityCountry){
									asetItem.rpSfgvGruC = this.selectCityCountry
								}
							}

							// 공공업권
							consent = {
								"snd_org_code" : this.orgTotScopeList[i].snd_org_code
								, "rcv_org_code" : "ZVAAAZ0000"
								, "is_scheduled" : "false"
								//, "fnd_cycle" : "1/m"
								//, "add_cycle" : "1/m"
								, "end_date" : this.orgTotScopeList[i].end_period
								, "purpose" : "전송요구를 통한 공공마이데이터 통합조회 서비스의 이용"
								, "period" : "99991231"
								, "target_info" : this.orgTotScopeList[i].target_info
								, "orgBzrgC"  : "public"
							}

						} else {
                            // 그 외
                            consent = {
                                "snd_org_code" : this.orgTotScopeList[i].snd_org_code
                                , "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "false"
                                // , "fnd_cycle" : "1/w"
                                // , "add_cycle" : "1/w"
                                , "end_date" : this.orgTotScopeList[i].end_period
                                , "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
                                , "period" : "99991231"
                                , "target_info" : this.orgTotScopeList[i].target_info
                            }
                        }
						// // 전자서명 요청 리스트에 해당 정보 input
						/* 오류원인인듯? */
						// this.requestList.push(
						// 	{
						// 		"orgCode" : this.orgTotScopeList[i].snd_org_code
						// 		,"ucpidRequestInfo" : {
						// 			"ucpidNonce" : this.attcC, 
						// 			"userAgreement" : "금융분야 마이데이터 통합인증을 위한 인증서 본인확인서비스 이용약관, 개인정보처리, 고유식별정보 수집·이용 및 위탁에 동의합니다.", 
						// 			"ispUrlInfo": "import.meta.env.VITE_API_URL",
						// 			"userAgreeInfo":{
						// 				realName : true,
						// 				gender : true,
						// 				nationalInfo: true,
						// 				birthDate : true,
						// 				ci : true
						// 			}
						// 		}
						// 		,"consentInfo" : {
						// 			"consentNonce":this.attcCext,
						// 			"consent" : consent
						// 		}
						// 	}
						// )
					}
					// 전자서명 요청 리스트에 해당 정보 input
					this.requestList.push(
						{
							"orgCode" : this.orgTotScopeList[i].snd_org_code
							,"ucpidRequestInfo" : {
								"ucpidNonce" : this.attcC, 
								"userAgreement" : "금융분야 마이데이터 통합인증을 위한 인증서 본인확인서비스 이용약관, 개인정보처리, 고유식별정보 수집·이용 및 위탁에 동의합니다.", 
								"ispUrlInfo": import.meta.env.VITE_API_URL,
								"userAgreeInfo":{
									realName : true,
									gender : true,
									nationalInfo: true,
									birthDate : true,
									ci : true
								}
							}
							,"consentInfo" : {
								"consentNonce":this.attcCext,
								"consent" : consent
							}
						}
					)

					// 23.08.10 CS533459 공공수집목록 저장용도
					this.consentArray.push(consent)
				}
                
                const requestJson = {
                    "requestList" : this.requestList,
                    "subjectDn" : item.subjectDn,
                    "password" :  params.password
                }
                console.log("서명전에 서명받을 값을 받는 데이터 확인하겠다. :: ", requestJson)

                this.goNative(requestJson)
				
			}
		},

		// 인증서 전자서명 진행
		goNative(requestJson) {
			this.signListOne = []
			this.signListTwo = []
            console.log('테스트테스트 인증서 전자서명 콕뱅 스뱅 start')
			if(this.chnl === '385') {
				// 스뱅
				apiService.addLoading("sign")
				appService.requestSign(requestJson).then(
					response => {
						apiService.removeLoading("sign")
						console.log(response)
						this.signedDataList = response.result.signedDataList || []
						for(let i=0; i<this.signedDataList.length; i++) {
							this.signListOne.push({"orgCode":this.signedDataList[i].orgCode, "signedPersonInfoReq":this.signedDataList[i].signedPersonInfoReq})
							this.signListTwo.push({"orgCode":this.signedDataList[i].orgCode,"signedConsent":this.signedDataList[i].signedConsent})
						}
						this.caOrgOne = response.result.caOrg || ''
						this.caOrgTwo = response.result.caOrg || ''
						
						// 다음 프로세스 팝업 이동
						console.log("다음 프로세스 팝업 이동!")
						this.fn_moveNext()
					},
					() => {
						apiService.removeLoading("sign")
						console.log("전자서명시 에러 발생")
                        console.log('테스트테스트 인증서 전자서명 스타트 스뱅 end')
						modalService.alert("해당 인증서에 전자서명 실패하였습니다.")
					}
				)
			} else {
				// 콕뱅
				// appService.cokBankShowProgress()
				appService.cokBankRequestSign(requestJson).then(response =>{
					// appService.cokBankHideProgress()
					console.log(response)
					if(response.errorMessage !== undefined) {
						// 에러 상황
						modalService.alert("해당 인증서에 전자서명 실패하였습니다.")
						return false
					}
					this.signedDataList = JSON.parse(response.result).signedDataList || []
					for(let i=0; i<this.signedDataList.length; i++) {
						this.signListOne.push({"orgCode":this.signedDataList[i].orgCode,"signedPersonInfoReq":this.signedDataList[i].signedPersonInfoReq})
						this.signListTwo.push({"orgCode":this.signedDataList[i].orgCode,"signedConsent":this.signedDataList[i].signedConsent})
					}
					this.caOrgOne = JSON.parse(response.result).caOrg || ''
					this.caOrgTwo = JSON.parse(response.result).caOrg || ''

					// 다음 프로세스 팝업 이동
					console.log("다음 프로세스 팝업 이동!")
                    console.log('테스트테스트 인증서 전자서명 스타트 콕뱅 end')
					this.fn_moveNext()
				})
			}
		},

		fn_moveNext(){
			console.log('인증단계 확인', this.isFirstStepYn ? "1단계" : "2단계")
			// 공동인증서 인증
			if(this.isFirstStepYn) {
				console.log('signListOne :::::::::::::::::::::::::::', this.signListOne)
				console.log('signListTwo :::::::::::::::::::::::::::', this.signListTwo)
				let compName = COAR2007
				const config = {
					component : compName,
					params : {
						moduleList 		: this.moduleList,		// 선택 기관 리스트
						selectedCnt		: this.moduleList.length,
						attcC 			: this.attcC,
						attcCext 		: this.attcCext,
						signListOne 	: this.signListOne,
						signListTwo 	: this.signListTwo,
						userAgreeInfo 	: this.userAgreeInfo,
						caOrgOne 		: this.caOrgOne,
						caOrgTwo 		: this.caOrgTwo,
						ca_org_type 	: "05",
						certDsc			: this.certDsc,
						isFirstStepYn	: this.isFirstStepYn,
						isMramMod		: this.isMramMod,
						isBckYn			: this.isBckYn,
					}
				}
				console.log(">>> 공동인증서 인증 완료 1차 >>>", config)
				modalService.openPopup(config).then(response => {
					console.log(response)
				})
			} else {
				console.log(":::: 2차 인증 signListOne:::: ", this.signListOne)
				console.log(":::: 2차 인증 signListTwo:::: ", this.signListTwo)
				console.log(":::: 2차 인증 orgTotScopeList :::: ", this.orgTotScopeList)
				console.log(":::: 2차 인증 selOrgAsetList :::: ", this.selOrgAsetList)
				const config = {
					component : COAR2007,
					params : {
						isFirstStepYn 	: this.isFirstStepYn,
						certDsc			: this.certDsc,
						signListOne		: this.signListOne,
						signListTwo		: this.signListTwo,
						orgTotScopeList	: this.orgTotScopeList,
						selOrgAsetList	: this.selOrgAsetList,
						selectList		: this.selectList,
						selectedCnt		: _.uniqBy(this.selectList , 'org_code').length,
						org_fail_list	: this.org_fail_list,
						isMramMod		: this.isMramMod,
						consentArray	: this.consentArray,
						attcC			: this.attcC,
						attcCext		: this.attcCext,
						caOrgOne		: this.caOrgOne,
						caOrgTwo		: this.caOrgTwo,
						end_period		: this.end_period,
					}
				}
				console.log(">>> 공동인증서 인증 완료 2차 >>>", config)
				modalService.openPopup(config).then(response => {
					console.log(response)
				})
			}
		},

		fn_close() {
			sessionStorage.removeItem('conFailInfo')

			/**
			 * isMramMod
			 * ''	: 신규연결
			 * '1'	: 연결변경
			 * '2'	: 만료예정기관 만료일변경
			 */
			if(this.isMramMod === '' || this.isMramMod === '1') {
				// 신규연결 or 연결기관변경일 경우
				if(this.isMramMod === '1' && !this.isBckYn) {
					// 연결변경으로 넘어오고 자산백업데이터없어 1차인증부터 진행하였을 경우
					// 전체 팝업 close && 연결기관관리 페이지 재조회
					this.closeAll('completeMod')
				} else {
					// 그 외 case
					const currentPage = store.getters['layout/pageInfo']
					if(currentPage.name.indexOf("MRAM") > -1) {
						// 연결기관관리페이지를 통해 넘어온 경우
						this.closeAll('completeMod')
					} else {
						this.closeAllLeftMain()
					}
				}
			} else {
				this.closeAll('completeMod')
			}
		},
		
		fn_test() {
			if(this.isFirstStepYn) {
				modalService.alert("(테스트) 진행중 팝업을 통해<br> 금융상품 선택 이동").then(() => {
					const config = {
						component : COAR2007,
						params : {
							moduleList		: this.moduleList,		// 선택 기관 리스트
							selectedCnt		: this.moduleList.length,
							userAgreeInfo 	: this.userAgreeInfo,
							ca_org_type 	: this.ca_org_type,
							ca_org_name 	: this.ca_org_name,
							isFirstStepYn 	: this.isFirstStepYn,
							certDsc			: this.certDsc,
							responseJson 	: this.localTestData != {} ? this.localTestData : this.moduleList,
							isMramMod		: this.isMramMod,
							isBckYn			: this.isBckYn,
						}
					}
					modalService.openPopup(config).then(() => {
						
					})
				})
			} else {

				let consent = {}
				for(let i=0; i<this.orgTotScopeList.length; i++) {
					consent = {}
						// 정기적전송여부 true
						if(this.orgTotScopeList[i].org_biz_code === 'bank') {
							// 은행업권
							consent = {
								"snd_org_code" : this.orgTotScopeList[i].snd_org_code
								, "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "true"
                                , "fnd_cycle" : "1/w"
                                , "add_cycle" : "1/w"
                                , "end_date" : this.orgTotScopeList[i].end_period
                                , "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
                                , "period" : "99991231"
                                , "target_info" : this.orgTotScopeList[i].target_info
                                , "is_consent_trans_memo" : this.orgTotScopeList[i].is_consent_trans_memo	// 적요 또는 거래메모
							}
						} else if(this.orgTotScopeList[i].org_biz_code === 'card' || this.orgTotScopeList[i].org_biz_code === 'telecom') {
                            // 카드업권, 통신업권
                            consent = {
                                "snd_org_code" : this.orgTotScopeList[i].snd_org_code
                                , "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "true"
                                , "fnd_cycle" : "1/w"
                                , "add_cycle" : "1/w"
                                , "end_date" : this.orgTotScopeList[i].end_period
                                , "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
                                , "period" : "99991231"
                                , "target_info" : this.orgTotScopeList[i].target_info
                                , "is_consent_merchant_name_regno" : this.orgTotScopeList[i].is_consent_merchant_name_regno	// 가맹점명 및 사업자등록번호
                            }
                        } else if(this.orgTotScopeList[i].org_biz_code === 'efin'){
                            // 전금업권
                            consent = {
                                "snd_org_code" : this.orgTotScopeList[i].snd_org_code
                                , "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "true"
                                , "fnd_cycle" : "1/w"
                                , "add_cycle" : "1/w"
                                , "end_date" : this.orgTotScopeList[i].end_period
                                , "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
                                , "period" : "99991231"
                                , "target_info" : this.orgTotScopeList[i].target_info
                                , "is_consent_trans_memo" : this.orgTotScopeList[i].is_consent_trans_memo					// 적요 또는 거래메모
                                , "is_consent_merchant_name_regno" : this.orgTotScopeList[i].is_consent_merchant_name_regno	// 가맹점명 및 사업자등록번호
                                , "is_consent_trans_category" : this.orgTotScopeList[i].is_consent_trans_category			// 상품구매 카테고리
                            }
                        } else if (this.orgTotScopeList[i].org_biz_code === 'public'){

							//요청 공공기관 증명서 중  지방세세목별과세(납세)증명서(재산세) 포함 시
							if(this.orgTotScopeList[i].target_info.length < 1) continue
							for(const asetItem of this.orgTotScopeList[i].target_info[0].asset_list){
								if(asetItem.asset === 'L161' && this.selectCityCountry){
									asetItem.rpSfgvGruC = this.selectCityCountry
								}
							}

							// 공공업권
							consent = {
								"snd_org_code" : this.orgTotScopeList[i].snd_org_code
								, "rcv_org_code" : "ZVAAAZ0000"
								, "is_scheduled" : "true"
								, "fnd_cycle" : "1/m"
								, "add_cycle" : "1/m"
								, "end_date" : this.orgTotScopeList[i].end_period
								, "purpose" : "전송요구를 통한 공공마이데이터 통합조회 서비스의 이용"
								, "period" : "99991231"
								, "target_info" : this.orgTotScopeList[i].target_info
								, "orgBzrgC"  : "public"
							}
						}else {
                            // 그 외
                            consent = {
                                "snd_org_code" : this.orgTotScopeList[i].snd_org_code
                                , "rcv_org_code" : "ZVAAAZ0000"
                                , "is_scheduled" : "true"
                                , "fnd_cycle" : "1/w"
                                , "add_cycle" : "1/w"
                                , "end_date" : this.orgTotScopeList[i].end_period
                                , "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
                                , "period" : "99991231"
                                , "target_info" : this.orgTotScopeList[i].target_info
                            }
                        }

					this.consentArray.push(consent)
				}

				// 실제 2차 인증 후 성공/실패 기관 분기 필요!
				modalService.alert("(테스트) 2차인증 건너뛰고 다음이동").then(() => {
					this.signListOne = [{"gg" : "123"}]
					this.signListTwo = [{"gg" : "456"}]

					const config = {
						component : COAR2007,
						params : {
							isFirstStepYn 	: this.isFirstStepYn,
							orgTotScopeList	: this.orgTotScopeList,
							org_fail_list 	: this.org_fail_list,
							selectList		: this.selectList,
							certDsc			: this.certDsc,
							isMramMod		: this.isMramMod,
							consentArray 	: this.consentArray,
							signListOne		: this.signListOne,
							signListTwo		: this.signListTwo,
						}
					}
					modalService.openPopup(config).then(() => {
						
					})
				})
			}
		},

		fn_set_locatTestData() {
			if(_.findIndex(this.$store.state.modal.modalList, d=>d.component.name === "AuthSampleLink") === -1) {
				this.localTestData = {
					"rsp_code": "00000",
					"rsp_msg": "성공",
					"irp_cnt": 5,
					"irp_list": [
						{
							"prod_name": "개인형 IRP",
							"account_num": "0900026915311",
							"is_consent": "false",
							"org_code": "A1AABG0000",
							"org_biz_code": "bank",
							"scope": "bank.irp"
						},
						{
							"prod_name": "개인형IRP",
							"account_num": "15902012792310",
							"is_consent": "false",
							"org_code": "A1AAAD0000",
							"org_biz_code": "bank",
							"scope": "bank.irp"
						},
						{
							"prod_name": "개인형IRP",
							"account_num": "15934009032760",
							"is_consent": "false",
							"org_code": "A1AAAD0000",
							"org_biz_code": "bank",
							"scope": "bank.irp"
						},
						{
							"prod_name": "개인형IRP",
							"account_num": "15953001484312",
							"is_consent": "false",
							"org_code": "A1AAAD0000",
							"org_biz_code": "bank",
							"scope": "bank.irp"
						},
						{
							"prod_name": "퇴직연금 적립IRP",
							"account_num": "48803627394002",
							"is_consent": "false",
							"org_code": "A1AAEQ0000",
							"org_biz_code": "bank",
							"scope": "bank.irp"
						}
					],
					"bank_cnt": 14,
					"bank_list": [
						{
							"account_num": "3521686212043",
							"is_consent": "false",
							"seqno": "",
							"is_foreign_deposit": "false",
							"prod_name": "자립예탁금",
							"is_minus": "false",
							"account_type": "1001",
							"account_status": "01",
							"org_code": "A4AAAZ0000",
							"org_biz_code": "bank",
							"scope": "bank.deposit"
						},
						{
							"account_num": "0770000588193",
							"is_consent": "false",
							"seqno": "",
							"prod_name": "키움고배당에이스30증권자투자신탁제1호[채권혼합] Class C1",
							"account_type": "2001",
							"account_status": "01",
							"org_code": "A4AAAZ0000",
							"org_biz_code": "bank",
							"scope": "bank.invest"
						},
						{
							"account_num": "0770000588363",
							"is_consent": "false",
							"seqno": "",
							"prod_name": "키움장대트리플플러스증권투자신탁1호[채권혼합] Class C",
							"account_type": "2001",
							"account_status": "01",
							"org_code": "A4AAAZ0000",
							"org_biz_code": "bank",
							"scope": "bank.invest"
						},
						{
							"account_num": "0770000588403",
							"is_consent": "false",
							"seqno": "",
							"prod_name": "삼성당신을위한코리아대표그룹30증권투자신탁제1호[채권혼합] C",
							"account_type": "2001",
							"account_status": "01",
							"org_code": "A4AAAZ0000",
							"org_biz_code": "bank",
							"scope": "bank.invest"
						},
						{
							"account_num": "0770000659583",
							"is_consent": "false",
							"seqno": "",
							"prod_name": "NH-Amundi 개인MMF1호[국공채] Class C",
							"account_type": "2001",
							"account_status": "01",
							"org_code": "A4AAAZ0000",
							"org_biz_code": "bank",
							"scope": "bank.invest"
						},
						{
							"account_num": "0612108634833",
							"is_consent": "false",
							"seqno": "",
							"prod_name": "(가계일반)일반대출-가계자금",
							"account_type": "3220",
							"account_status": "01",
							"org_code": "A4AAAZ0000",
							"org_biz_code": "bank",
							"scope": "bank.loan"
						},
						{
							"account_num": "0610905567143",
							"is_consent": "false",
							"seqno": "",
							"prod_name": "(가계일반)일반대출-가계자금",
							"account_type": "3230",
							"account_status": "01",
							"org_code": "A4AAAZ0000",
							"org_biz_code": "bank",
							"scope": "bank.loan"
						},
						{
							"account_num": "3010205633911",
							"is_consent": "false",
							"seqno": "",
							"is_foreign_deposit": "false",
							"prod_name": "NH성공파트너통장",
							"is_minus": "true",
							"account_type": "1001",
							"account_status": "01",
							"org_code": "A1AABG0000",
							"org_biz_code": "bank",
							"scope": "bank.deposit bank.loan"
						},
						{
							"account_num": "3020458184411",
							"is_consent": "false",
							"seqno": "",
							"is_foreign_deposit": "false",
							"prod_name": "채움공직자우대통장",
							"is_minus": "false",
							"account_type": "1001",
							"account_status": "01",
							"org_code": "A1AABG0000",
							"org_biz_code": "bank",
							"scope": "bank.deposit"
						},
						{
							"account_num": "73002042154",
							"is_consent": "false",
							"seqno": "",
							"is_foreign_deposit": "false",
							"prod_name": "국민주통장",
							"is_minus": "false",
							"account_type": "1001",
							"account_status": "01",
							"org_code": "A1AABG0000",
							"org_biz_code": "bank",
							"scope": "bank.deposit"
						},
						{
							"account_num": "0280182899271",
							"is_consent": "false",
							"seqno": "",
							"is_foreign_deposit": "false",
							"prod_name": "NH All100플랜 연금저축펀드계좌",
							"is_minus": "false",
							"account_type": "2001",
							"account_status": "01",
							"org_code": "A1AABG0000",
							"org_biz_code": "bank",
							"scope": "bank.invest"
						},
						{
							"account_num": "0280267780541",
							"is_consent": "false",
							"seqno": "",
							"is_foreign_deposit": "false",
							"prod_name": "NH-Amundi코리아2배레버리지증권투자신탁[주식-파생형]ClassCe",
							"is_minus": "false",
							"account_type": "2001",
							"account_status": "01",
							"org_code": "A1AABG0000",
							"org_biz_code": "bank",
							"scope": "bank.invest"
						},
						{
							"account_num": "0280450302271",
							"is_consent": "false",
							"seqno": "",
							"is_foreign_deposit": "false",
							"prod_name": "한국투자중소밸류증권자투자신탁[주식]ClassC-e",
							"is_minus": "false",
							"account_type": "2001",
							"account_status": "01",
							"org_code": "A1AABG0000",
							"org_biz_code": "bank",
							"scope": "bank.invest"
						},
						{
							"account_num": "0114200785311",
							"is_consent": "false",
							"seqno": "",
							"is_foreign_deposit": "false",
							"prod_name": "(주택자금)중앙본부승인 단체대출-구입자금전환대출(당행)",
							"is_minus": "false",
							"account_type": "3290",
							"account_status": "01",
							"org_code": "A1AABG0000",
							"org_biz_code": "bank",
							"scope": "bank.loan"
						},
						// {
						// 	"account_num": "722100535010101",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "주택구입자금(3년)",
						// 	"is_minus": "false",
						// 	"account_type": "3290",
						// 	"account_status": "01",
						// 	"org_code": "A1AAAD0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "721315531010101",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "신탁(가계한도자금-자동대출)",
						// 	"is_minus": "true",
						// 	"account_type": "3210",
						// 	"account_status": "01",
						// 	"org_code": "A1AAAD0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "721110802010101",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "신탁(가계한도자금-자동대출)",
						// 	"is_minus": "true",
						// 	"account_type": "3210",
						// 	"account_status": "01",
						// 	"org_code": "A1AAAD0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "622106090002501",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "산은 예적금담보대출",
						// 	"is_minus": "true",
						// 	"account_type": "3200",
						// 	"account_status": "01",
						// 	"org_code": "A1AAAD0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "15144000846821",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "개인연금신탁",
						// 	"is_minus": "false",
						// 	"account_type": "1003",
						// 	"account_status": "01",
						// 	"org_code": "A1AAAD0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "03292003132820",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "데일리플러스 자유적금",
						// 	"is_minus": "false",
						// 	"account_type": "1003",
						// 	"account_status": "01",
						// 	"org_code": "A1AAAD0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "27475506476332",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "KDBbond 온라인 산업금융채권",
						// 	"is_minus": "false",
						// 	"account_type": "1002",
						// 	"account_status": "01",
						// 	"org_code": "A1AAAD0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "02044013688821",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "KDBdream 다모아 Account",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "02",
						// 	"org_code": "A1AAAD0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "02044012365821",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "KDBdream Account",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAAD0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "02002433996310",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "KDBdream 다모아 Account",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAAD0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "02002250590310",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "KDBdream 다모아 Account",
						// 	"is_minus": "true",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAAD0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit bank.loan"
						// },
						// {
						// 	"account_num": "08204196802019",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "저축예금(IBK급여통장)",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAEQ0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "48803627301019",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "보통예금",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAEQ0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "48803627301026",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "보통예금",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAEQ0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "48803627301041",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "보통예금",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAEQ0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "67402465414001",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "IBK D-day적금",
						// 	"is_minus": "false",
						// 	"account_type": "1003",
						// 	"account_status": "01",
						// 	"org_code": "A1AAEQ0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "67402465401012",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "보통예금",
						// 	"is_minus": "true",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAEQ0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit bank.loan"
						// },
						// {
						// 	"account_num": "16512408796001",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "KTB글로벌4차산업1등주증권(주식)Ce",
						// 	"is_minus": "false",
						// 	"account_type": "2001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAEQ0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.invest"
						// },
						// {
						// 	"account_num": "6740246543200036",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "IBK장기고정주택담보대출",
						// 	"is_minus": "false",
						// 	"account_type": "3220",
						// 	"account_status": "01",
						// 	"org_code": "A1AAEQ0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "511201026628",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "정기예금(직장인우대예금)",
						// 	"is_minus": "false",
						// 	"account_type": "1002",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "532111297899",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "true",
						// 	"prod_name": "외화보통예금(글로벌외화종합통장)",
						// 	"is_minus": "false",
						// 	"account_type": "1999",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "595119809878",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "유리글로벌거래소증권투자신탁1호(주식)A",
						// 	"is_minus": "false",
						// 	"account_type": "2001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.invest"
						// },
						// {
						// 	"account_num": "595119809996",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "유리글로벌거래소증권투자신탁1호(주식)A",
						// 	"is_minus": "false",
						// 	"account_type": "2001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.invest"
						// },
						// {
						// 	"account_num": "595119811401",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "DGB공모주플러스증권투자신탁1호(채권혼합)A",
						// 	"is_minus": "false",
						// 	"account_type": "2001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.invest"
						// },
						// {
						// 	"account_num": "595119811685",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "한국투자네비게이터증권투자신탁1호(주식)A",
						// 	"is_minus": "false",
						// 	"account_type": "2001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.invest"
						// },
						// {
						// 	"account_num": "595301000490",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "KB스타미국나스닥100인덱스증권자투자신탁(주식-파생형)C",
						// 	"is_minus": "false",
						// 	"account_type": "2001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.invest"
						// },
						// {
						// 	"account_num": "641130366997",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"prod_name": "일반자금대출(주택담보대출)",
						// 	"account_type": "3100",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "641130367025",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"prod_name": "일반자금대출(주택담보대출)",
						// 	"account_type": "3100",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "641130367032",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"prod_name": "일반자금대출(주택담보대출)",
						// 	"account_type": "3100",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "641130367049",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"prod_name": "기타가계일반자금대출",
						// 	"account_type": "3100",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "641992739618",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"prod_name": "기타가계일반자금대출",
						// 	"account_type": "3100",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "641992824858",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"prod_name": "직장인e로운대출",
						// 	"account_type": "3100",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "641992903470",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"prod_name": "DGB하이브리드모기지론",
						// 	"account_type": "3220",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHS0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "02602296631",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "샐러리맨리치예금(저축예금-어민사랑예금)",
						// 	"is_minus": "true",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit bank.loan"
						// },
						// {
						// 	"account_num": "001028185327",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "자동이체우대통장(저축예금)",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "102015697982",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "달려라-2030통장(저축예금)",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "02603043890",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "스페셜플러스예금",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "103004900968",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "Sh해우리패키지통장(스페셜플러스-해양수산인우대-예치기간별-전환)",
						// 	"is_minus": "true",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit bank.loan"
						// },
						// {
						// 	"account_num": "103006157902",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "Sh내가만든통장(스페셜플러스예금)",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "180000470322",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "true",
						// 	"prod_name": "Sh외화레인지예금",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "120014699621",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "주택청약예금",
						// 	"is_minus": "false",
						// 	"account_type": "1002",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "120047075595",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "헤이(Hey)정기예금",
						// 	"is_minus": "false",
						// 	"account_type": "1002",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "140008621011",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "Sh보고싶다!명태야적금2(정액적립식-개인)",
						// 	"is_minus": "false",
						// 	"account_type": "1003",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "140009510191",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "더플러스정액적금",
						// 	"is_minus": "false",
						// 	"account_type": "1003",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "141013781070",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "Sh월복리자유적금",
						// 	"is_minus": "false",
						// 	"account_type": "1003",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "190001811207",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"prod_name": "한국밸류10년투자증권투자신탁1호(주식)C",
						// 	"account_type": "2001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.invest"
						// },
						// {
						// 	"account_num": "190001817535",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"prod_name": "신영밸류고배당증권투자신탁(주식)C",
						// 	"account_type": "2001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.invest"
						// },
						// {
						// 	"account_num": "190002526878",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"prod_name": "신영 밸류우선주 증권자투자신탁(주식)Ce형",
						// 	"account_type": "2001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.invest"
						// },
						// {
						// 	"account_num": "190002526882",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"prod_name": "NH-Amundi 1.5배레버리지인덱스증권[주식-파생형]Ce",
						// 	"account_type": "2001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.invest"
						// },
						// {
						// 	"account_num": "190002684225",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"prod_name": "NH-Amundi 1.5배레버리지인덱스증권[주식-파생형]Ce",
						// 	"account_type": "2001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.invest"
						// },
						// {
						// 	"account_num": "190002716946",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"prod_name": "한국투자베트남그로스증권자[주식]C-e",
						// 	"account_type": "2001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAHX0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.invest"
						// },
						// {
						// 	"account_num": "100164447909",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "듀얼K  입출금통장",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAJB0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "110217597998",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "코드K자유적금",
						// 	"is_minus": "false",
						// 	"account_type": "1003",
						// 	"account_status": "01",
						// 	"org_code": "A1AAJB0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "120145337971",
						// 	"is_consent": "false",
						// 	"seqno": "0",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "코드K정기예금",
						// 	"is_minus": "false",
						// 	"account_type": "1002",
						// 	"account_status": "01",
						// 	"org_code": "A1AAJB0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "451120011977",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "자립예탁금",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "451310233889",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "정기예탁금",
						// 	"is_minus": "false",
						// 	"account_type": "1002",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "451210023257",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "정기적금",
						// 	"is_minus": "false",
						// 	"account_type": "1003",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "120730016967",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "일반대출",
						// 	"account_type": "3100",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "120730016986",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "일반대출",
						// 	"account_type": "3100",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "120730016999",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "일반대출",
						// 	"account_type": "3100",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "120710025609",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "정기예탁금범위내대출(개인)",
						// 	"account_type": "3200",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "401730011455",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "일반대출",
						// 	"account_type": "3220",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "301730013833",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "일반대출",
						// 	"account_type": "3230",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "401730009004",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "일반대출",
						// 	"account_type": "3230",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "401730015041",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "일반대출",
						// 	"account_type": "3230",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "401730019996",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "일반대출",
						// 	"account_type": "3230",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "301730015598",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "일반대출",
						// 	"account_type": "3240",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "301730019649",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "일반대출(서민금융-전자보증)",
						// 	"account_type": "3240",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "401540001215",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "농특회계융자금(여신)",
						// 	"account_type": "3240",
						// 	"account_status": "01",
						// 	"org_code": "A4AAGC0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "2010102010000421",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "2010년 1학기 취업후상환학자금_등록금",
						// 	"account_type": "3150",
						// 	"account_status": "01",
						// 	"org_code": "A1AAOV0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "2010201010042838",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "2010년 2학기 일반상환학자금_등록금",
						// 	"account_type": "3150",
						// 	"account_status": "01",
						// 	"org_code": "A1AAOV0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "2012101010660729",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "2012년 1학기 일반상환학자금_등록금",
						// 	"account_type": "3150",
						// 	"account_status": "01",
						// 	"org_code": "A1AAOV0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "100030131294",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "토스뱅크 통장",
						// 	"is_minus": "false",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAPF0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit"
						// },
						// {
						// 	"account_num": "100030180641",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "토스뱅크 통장",
						// 	"is_minus": "true",
						// 	"account_type": "1001",
						// 	"account_status": "01",
						// 	"org_code": "A1AAPF0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.deposit bank.loan"
						// },
						// {
						// 	"account_num": "800000014886",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "신용대출",
						// 	"is_minus": "false",
						// 	"account_type": "3100",
						// 	"account_status": "01",
						// 	"org_code": "A1AAPF0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "800000101801",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "신용대출",
						// 	"is_minus": "false",
						// 	"account_type": "3100",
						// 	"account_status": "01",
						// 	"org_code": "A1AAPF0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// },
						// {
						// 	"account_num": "800000103723",
						// 	"is_consent": "false",
						// 	"seqno": "",
						// 	"is_foreign_deposit": "false",
						// 	"prod_name": "신용대출",
						// 	"is_minus": "false",
						// 	"account_type": "3100",
						// 	"account_status": "01",
						// 	"org_code": "A1AAPF0000",
						// 	"org_biz_code": "bank",
						// 	"scope": "bank.loan"
						// }
					],
					"card_cnt": 3,
					"card_list": [
						{
							"card_id": "1234561234561234",
							"card_num": "test_card_1",
							"is_consent": "false",
							"card_name": "테스트카드1",
							"card_member": "",
							"card_type": "",
							"org_code": "D1AAAF0000",
							"org_biz_code": "card",
							"scope": "card.card"
						},
						{
							"card_id": "0987650987650987",
							"card_num": "test_card_2",
							"is_consent": "false",
							"card_name": "테스트카드2",
							"card_member": "",
							"card_type": "",
							"org_code": "D1AAAH0000",
							"org_biz_code": "card",
							"scope": "card.card"
						},
						{
							"card_id": "1010101010101010",
							"card_num": "test_card_3",
							"is_consent": "false",
							"card_name": "테스트카드3",
							"card_member": "",
							"card_type": "",
							"org_code": "D1AAAH0000",
							"org_biz_code": "card",
							"scope": "card.card"
						},
					],
					"invest_cnt": 1,
					"invest_list": [
						{
							"account_num": "123412341234",
							"account_name": "테스트증권1",
							"org_code": "C1AABQ0000",
							"org_biz_code": "invest"
						}
					],
					"isr_cnt": 1,
					"isr_list": [
						{
							"insu_num": "101010101010",
							"prod_name": "테스트보험1",
							"org_code": "B1AAAI0000",
							"org_biz_code": "insu"
						}
					],
					"isr_loan_cnt": 0,
					"isr_loan_list": [

					],
					"efin_ppy_cnt": 0,
					"efin_ppy_list": [

					],
					"efin_acc_cnt": 0,
					"efin_acc_list": [

					],
					"capital_cnt": 0,
					"capital_list": [

					],
					"gi_cnt": 0,
					"gi_list": [

					],
					"telecom_cnt": 0,
					"telecom_list": [

					],
					"bond_cnt": 0,
					"bond_list": [

					],
					"prepaid_cnt": 0,
					"prepaid_list": [

					],
					"p2p_cnt": 0,
					"p2p_list": [

					],
					"success_cnt": 8,
					"success_org_list": [
						{
							"org_code": "A4AAAZ0000",
							"org_name": "농업협동조합중앙회"
						},
						{
							"org_code": "A1AABG0000",
							"org_name": "농협은행 주식회사"
						},
						{
							"org_code": "A1AAAD0000",
							"org_name": "한국산업은행"
						},
						{
							"org_code": "A1AAEQ0000",
							"org_name": "중소기업은행"
						},
						// {
						// 	"org_code": "A1AAHS0000",
						// 	"org_name": "㈜대구은행"
						// },
						// {
						// 	"org_code": "A1AAHX0000",
						// 	"org_name": "수협은행"
						// },
						// {
						// 	"org_code": "A1AAJB0000",
						// 	"org_name": "주식회사 케이뱅크은행"
						// },
						// {
						// 	"org_code": "A4AAGC0000",
						// 	"org_name": "산림조합중앙회"
						// },
						// {
						// 	"org_code": "A1AAOV0000",
						// 	"org_name": "한국장학재단"
						// },
						// {
						// 	"org_code": "A1AAPF0000",
						// 	"org_name": "토스뱅크 주식회사"
						// },
						//// 여기부터 임의 데이터
						{
							"org_code": "D1AAAF0000",
							"org_name": "㈜KB국민카드"
						},
						{
							"org_code": "D1AAAH0000",
							"org_name": "주식회사 우리카드"
						},
						{
							"org_code": "C1AABQ0000",
							"org_name": "이베스트투자증권"
						},
						{
							"org_code": "B1AAAI0000",
							"org_name": "교보생명보험"
						}
					]
				}
			}
		}
    },
    components : {
    }
}


</script>