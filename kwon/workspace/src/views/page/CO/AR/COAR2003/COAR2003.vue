<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 인증 방법 선택
* @ 페이지설명 : 인증 방법 선택
* @ 파일명     : src/views/page/CO/AR/COAR2003/COAR2003.vue
* @ 작성자     : CS533459
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533459              마이데이터 확대개발 내용 적용
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>{{isMramMod === '' ? "자산연결" : "연결 변경"}}</h1>
			<a href="javascript:void(0);" class="btn_back" @click.prevent="close()"><span class="blind">이전화면</span></a>
		</div>
		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<strong class="titH1">
					선택한 기관을 연결하기 위해<br> 
					인증 방법을 선택해 주세요.
				</strong>
				<p class="desc">통합인증으로 모든 자산을 한 번에 연결합니다.</p>
				<div class="custom_list com_box_type01">
					<div class="list_type_custom">
						<a href="javascript:void(0)" role="button" class="list_item ico_cfc ico01" @click.prevent="fn_proceedCross()">
							<span class="tit">공동인증서</span>
							<span class="mint_badge" v-if="certGetYnGbn === '1'">보유중</span>
							<span class="icon_red" v-else-if="certGetYnGbn === '3'">기간만료</span>
							<span class="icon_red" v-else>미보유</span>
						</a>
					</div>
				</div>
				<div class="custom_list com_box_type01">
					<div class="list_type_custom">
						<a href="javascript:void(0)" role="button" class="list_item ico_cfc ico02" @click.prevent="fn_proceedFinance()">
							<span class="tit">금융인증서</span>
						</a>
					</div>
				</div>
				<div class="custom_list com_box_type01">
					<div class="list_type_custom">
						<a href="javascript:void(0)" role="button" class="list_item ico_cfc ico03" @click.prevent="fn_proceedPass()">
							<span class="tit">PASS인증서</span>
						</a>
					</div>
				</div>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="fn_close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'

import apiService from '@/service/apiService'
import appService from '@/service/appService'
import commonService from '@/service/commonService'
import {dateFormat} from '@/utils/date'
import moment from 'moment'
import _ from 'lodash'

import COAR2011 from '@/views/page/CO/AR/COAR2011/COAR2011.vue'
import COAR2018 from '@/views/page/CO/AR/COAR2018/COAR2018.vue'
import COAR2004 from '@/views/page/CO/AR/COAR2004/COAR2004.vue'
import COAR2006 from '@/views/page/CO/AR/COAR2006/COAR2006.vue'
// import COAR2008 from '@/views/page/CO/AR/COAR2008/COAR2008.vue'
// import COAR2012 from '@/views/page/CO/AR/COAR2012/COAR2012.vue'
import COAR2007 from '@/views/page/CO/AR/COAR2007/COAR2007.vue'
import COAR2021 from '@/views/page/CO/AR/COAR2021/COAR2021.vue'
import COAR2012 from '@/views/page/CO/AR/COAR2012/COAR2012.vue'
//import COAR2030 from '@/views/page/CO/AR/COAR2030/COAR2030.vue'

export default {
    name : "COAR2003",
    data: () => {
        return {
			moduleList		: [],	// 선택한 기관 리스트
			indvAbleList	: [],	// 개별인증 가능 기관 리스트
			isIndvAllYn		: false,// 선택 기관 전부 개별인증 가능여부
			isMramMod		: '',	// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
			isMramNew		: false,// '연결기관 관리 신규'를 통해 넘어온 유무 flag
			connectFlag		: "",	// 연결 타입 (자산 : aset, 공공정보 : gov)
			
			userAgreeInfo   : {		// 사용자 동의 정보 (공동인증/금융인증 프로세스 파라미터 용)
                "realName" 		: true,
                "gender" 		: true,
                "nationalInfo"	: true,
                "birthDate" 	: true,
                "ci" 			: true
            },

			certList     	: [],	// 인증서리스트
			certGetYnGbn	: "2",	// 인증서 보유 여부에 따른 구분 (1 : 보유중, 2 : 미보유, 3 : 기간만료) - 20221114 아이폰 인증서 오류 대응으로 default 미보유 설정
			isBckYn			: false,// '연결기관 관리 변경'을 통해 넘어오고 백업자산목록 존재유무 flag 값 (true : 선택기관 전체 자산 백업목록 존재, false : 미존재)

			/////////////////////// 금융인증 파라미터 ///////////////////////
			attcC			: "",	// 인증코드(Nonce코드)
			attcCext		: "",	// 인증코드(Nonce코드)
			signedDataList 	: [],
			signListOne 	: [],
			signListTwo 	: [],
			caOrgOne 		: "",
			caOrgTwo 		: "",
			///////////////////////////////////////////////////////////////

			// 세션 체크 타이머
			sessionTimerAuthor : null,

			isShowPass      : false,

			//1차인증이 스킵된 (공공기관 , 기 연결 선택 기관 CASE 가 인증방법 선택을 위한 요청 Flag 값 )
			isJustSelectCert : false,
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
			this.isMramMod	= param.isMramMod || ''			// '연결기관관리'의 변경으로 넘어온 플래그 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
			this.isMramNew	= param.isMramNew || false		// '연결기관관리'의 신규로 넘어온 플래그
			this.connectFlag= param.connectFlag || "aset"	// 연결타입 플래그 (자산 : aset, 공공정보 : gov)
			this.moduleList = param.moduleList || []		// 기관 선택목록

			this.isJustSelectCert = param.isJustSelectCert || false //1차인증이 스킵된 (공공기관 , 기 연결 선택 기관 CASE 가 인증방법 선택을 위한 요청 Flag 값 )

			if(this.isMramMod !== '') {
				this.isBckYn = param.isBckYn ? true : false
			}

			this.isShowPass = commonService.getOpenMenu()

            this.getData()
		},

		fn_close() {
			if(this.isMramMod === '' || this.isMramMod === '2') {
				// 신규연결 또는 만료일 변경일 경우
				this.closeAllLeftMain()
			} else {
				// 연결기관관리의 변경일 경우
				this.closeAll()
			}
		},

        getData() {
			// 핸드폰 인증서 호출
			this.getCertList()

			/**
			 * 선택한 기관 목록이 전부 개별인증이 가능한지 확인
			 * 1) 전부 개별인증이 가능하면 개별인증 진행 버튼 show
			 * 2) 하나라도 불가능하면 hide
			 * 20230824 -- 개별인증 제거
			 */
			//this.fn_chkIndv()
		},
		
		// 휴대폰 내 공동인증서 가져오기
        getCertList(){              
            // 핸드폰 인증서 호출.
			console.log('getCertList', this.reqPage)
			console.log('this.getUserInfo(chnl) :: ', typeof this.getUserInfo('chnl'))
            if(this.getUserInfo('chnl') === '385'){
                // 스뱅 
                appService.getCertList().then(response => {
                    console.log("인증서 확인용 :: ", response)
                    this.certList = response.result || []
                    this.certList = this.filterCertList(this.certList) || []
                    if(this.certList.length > 0){
                        for(let i=0; i<this.certList.length; i++){
                            this.certList[i].notAfter = dateFormat(this.certList[i].notAfter.replace(/[^0-9]/gi, ''), 'YYYY년 MM월 DD일' )
                        }
					}
					
					// 인증서 보유 여부 판단
					this.certGetYnGbn = (this.certList.length > 0) ? "1" : "2"
					// this.certGetYnGbn = (this.certList.length > 0) ? "2" : "1"
					
					// 전체 인증서 만료 판단
					if(this.certList.length > 0) {
						let certExprCnt = 0
						for(const certItem of this.certList) {
							if(certItem.today >= certItem.expireDate) certExprCnt++
						}
						this.certGetYnGbn = (certExprCnt === this.certList.length) ? "3" : this.certGetYnGbn
					}
                })
            }else{ 
                // 콕뱅
                console.log("콕뱅으로 접근 인증서 불러오기.")
				appService.cokBankGetCertList().then(response => {
                    console.log('콕뱅 인증서 응답값을 찍는다. :: ', response)
                    this.certList = JSON.parse(response.result) || []
					this.certList = this.filterCertList(this.certList) || []
					
					// 인증서 보유 여부 판단
					this.certGetYnGbn = (this.certList.length > 0) ? "1" : "2"
					// this.certGetYnGbn = (this.certList.length > 0) ? "2" : "1"
					
					// 전체 인증서 만료 판단
					if(this.certList.length > 0) {
						let certExprCnt = 0
						for(const certItem of this.certList) {
							if(certItem.today >= certItem.expireDate) certExprCnt++
						}
						this.certGetYnGbn = (certExprCnt === this.certList.length) ? "3" : this.certGetYnGbn
					}
				})                
			}

			//////// cert Test ///////
			if(window.location.host.indexOf('localhost') > -1) {
				this.certList = [
					// {today: dateFormat(new Date(), 'YYYYMMDD'), expireDate : '20220809'},
					// {today: dateFormat(new Date(), 'YYYYMMDD'), expireDate : '20220810'},
					// {today: dateFormat(new Date(), 'YYYYMMDD'), expireDate : '20221230'},
				]

				// 인증서 보유 여부 판단
				this.certGetYnGbn = (this.certList.length > 0) ? "1" : "2"
				
				// 전체 인증서 만료 판단
				if(this.certList.length > 0) {
					let certExprCnt = 0
					for(const certItem of this.certList) {
						if(certItem.today >= certItem.expireDate) certExprCnt++
					}
					this.certGetYnGbn = (certExprCnt === this.certList.length) ? "3" : this.certGetYnGbn
				}
			}
			//////////////////////////

			// // 인증서 보유 여부 판단
			// this.certGetYnGbn = (this.certList.length > 0) ? "1" : "2"
			
			// // 전체 인증서 만료 판단
			// if(this.certList.length > 0) {
			// 	let certExprCnt = 0
			// 	for(const certItem of this.certList) {
			// 		if(certItem.today >= certItem.expireDate) certExprCnt++
			// 	}
			// 	this.certGetYnGbn = (certExprCnt === this.certList.length) ? "3" : this.certGetYnGbn
			// }
		},
		
		// App 에서 받은 공동인증서 리스트중 본인 인증서만 필터
		filterCertList(response) { 
            const isProduct = import.meta.env.VITE_ENV === 'R'       // 운영
            const certList = response || [] // App 에서 받은 인증서 리스트
            const userName = this.getUserInfo('cusnm') || '' // 로그인 사용자 이름
			let filterList = []
			
			if(isProduct){
				// 운영
				filterList = certList
				.map(d => {
					return {
						...d,
						today: dateFormat(new Date(), 'YYYYMMDD'),
						expireDate: (d.notAfter || '').replace(/[^0-9]/gi, '') // '2020년 09월 11일' -> '20200911'
					}
				})
				// .filter(d => d.today <= d.expireDate) // 만료된 인증서 제거
				.filter(d => (d.subjectDn || '').includes(userName)) // 본인 인증서 체크
			}else{
				//개발에서는 본인인증서 상관없이 나오도록 
				filterList = certList
				.map(d => {
					return {
						...d,
						today: dateFormat(new Date(), 'YYYYMMDD'),
						expireDate: (d.notAfter || '').replace(/[^0-9]/gi, '') // '2020년 09월 11일' -> '20200911'
					}
				})
				// .filter(d => d.today <= d.expireDate) // 만료된 인증서 제거
				// .filter(d => (d.subjectDn || '').includes(userName)) // 본인 인증서 체크 향후 변경
			}

            return filterList
                // ? filterList
                // : certList
		},

		// 공동인증 프로세스 진행
		fn_proceedCross() {
			if(this.certGetYnGbn === '2' || this.certGetYnGbn === '3' || this.certGetYnGbn === '') {
				// 유효한 공동인증서를 보유하고있지 않은 경우
				const config = {
					params : {},
					renderer : {
						component : COAR2018
					}
				}
				modalService.openSlidePagePopup(config).then(() => {
					
				})
			} else {
				// 유효한 공동인증서를 보유한 경우
				const config = {
					params : {
						certDsc : "joint"
					},
					renderer : {
						component : COAR2011
					}
				}
				modalService.openSlidePagePopup(config).then(response => {

					if(response === 'OK' && this.isJustSelectCert){
						this.close('joint')
					}else if(response === 'OK' && this.connectFlag === 'aset') {
						if(this.isMramMod === '1') {	
							// 연결기관 변경 - 연결 자산 변경
							console.log("연결기관변경(연결 자산 변경) >> ", response)
							this.fn_proceedUnion('mod1')
						} else if(this.isMramMod === '2') {
							// 연결기관 변경 - 만료예정기관 변경
							console.log("연결기관변경(만료예정기관 변경) >> ", response)
							this.fn_proceedUnion('mod2')
						} else {				
							// 연결기관 신규 추가
							console.log("연결기관신규 >> ", response)
							this.fn_proceedUnion('new')
						}
					}
				})
			}
		},

		// 공동인증 약관 동의 진행
		fn_proceedUnion(step) {
			if(step === 'new') {
				// 신규 자산 연결
				const config = {
					component : COAR2004,
					params : {
						moduleList 		: this.moduleList,		// 선택기관목록
						userAgreeInfo 	: this.userAgreeInfo,	// 사용자동의정보
						isMramMod		: this.isMramMod,
					}
				}
				modalService.openPopup(config).then(response => {
					if(response === "moveNext") {
						this.fn_moveUnionCert(true)
					}
				})
			} else {
				this.fn_proceedUnion('new')
			}
		},

		// 공동인증서 선택 팝업 오픈
		fn_moveUnionCert(isFirstStepYn) {
			const config = {
				component : COAR2006,
				params : {
					connectFlag		: this.connectFlag,		// 연결정보분류(aset : 자산, gov : 공공정보)
					certDsc			: "joint",				// (필수) 인증방법 (공동인증 : joint, 금융인증 : finance, 패스인증 : pass)
					moduleList 		: this.moduleList,		// 선택기관목록
					userAgreeInfo 	: this.userAgreeInfo,	// 사용자동의정보
					isFirstStepYn	: isFirstStepYn,		// 1차인증 여부
					isMramMod		: this.isMramMod,
					isBckYn			: this.isBckYn,
				}
			}
			modalService.openPopup(config).then(response => {
				console.log(response)
			})
		},
		
		// 세션 연장
		startSessionTimerAuth(){
			//인터벌로 변경 처리
			this.sessionTimerAuthor = setInterval(() => {

				// if(this.getUserInfo('chnl') === '385'){
				// 	// 스뱅 로그인 연장 처리
				// 	this.$store.dispatch('config/extendSession')
				// }else{
				// 	// 콕뱅 로그인 연장 처리
				// }
				
				// 스뱅/콕뱅 로그인 연장 처리
				this.$store.dispatch('config/extendSession')

				//pfm 로그인 연장을 위한 더미 API콜 처리
				const config = {
					url: '/co/co/00r06', // /co/co/00r02
					data: {
					"mydtCusno" : this.getUserInfo('mydtCusno'),
					},
					disableLoading : true,

				}
				apiService.call(config).then(() =>{
					//알람 더미 체크
				})

			}, 30*1000);
		},

		//////////////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////// 개별인증 관련 메소드 ///////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////
		// 선택한 기관 목록이 전부 개별인증이 가능한지 확인
		fn_chkIndv() {
			this.indvAbleList = []

			const config = {
				url : '/co/ar/01ra1',
				data : {
					"mydtCusno" : this.getUserInfo("mydtCusno"),
					"ofrAttcMethC" : "02"
				}
			}
			apiService.call(config).then(response => {
				let respData = response || {}
				
				if(respData.all_cnt > 0) {
					for(const bankItem of respData.bank_org) {		// 은행
						this.indvAbleList.push(bankItem)
					}
					for(const bondItem of respData.bond_org) {		// 채권
						this.indvAbleList.push(bondItem)
					}
					for(const capiItem of respData.capi_org) {		// 할부금융
						this.indvAbleList.push(capiItem)
					}
					for(const cardItem of respData.card_org) {		// 카드
						this.indvAbleList.push(cardItem)
					}
					for(const efinItem of respData.efin_org) {		// 전자금융
						this.indvAbleList.push(efinItem)
					}
					for(const ginsuItem of respData.ginsu_org) {	// 보증보험
						this.indvAbleList.push(ginsuItem)
					}
					for(const insuItem of respData.insu_org) {		// 보험
						this.indvAbleList.push(insuItem)
					}
					for(const investItem of respData.invest_org) {	// 증권
						this.indvAbleList.push(investItem)
					}
					for(const p2pItem of respData.p2p_org) {		// P2P
						this.indvAbleList.push(p2pItem)
					}
					for(const teleItem of respData.tele_org) {		// 통신
						this.indvAbleList.push(teleItem)
					}
					for(const usuryItem of respData.usury_org) {	// 대부
						this.indvAbleList.push(usuryItem)
					}
				}
				
				// 개별인증 가능 목록을 반복하여 선택한 기관 목록 중 개별인증 불가능한 기관 탐색
				if(this.isMramMod === '') {
					for(let i=0; i<this.moduleList.length; i++) {
						if(_.findIndex(this.indvAbleList, d=>d.orgC === this.moduleList[i].orgC) >= 0) {
							console.log("개별인증가능 >> ", this.indvAbleList[_.findIndex(this.indvAbleList, d=>d.orgC === this.moduleList[i].orgC)].orgC, this.moduleList[i].orgC)

							if(i === this.moduleList.length - 1) {
								this.isIndvAllYn = true
								return
							}	
						} else {
							this.isIndvAllYn = false
							return	
						}
					}
				} else {
					for(let i=0; i<this.moduleList.length; i++) {
						if(_.findIndex(this.indvAbleList, d=>d.orgC === this.moduleList[i].infOfrmnOrgC) >= 0) {
							console.log("(변경)개별인증가능 >> ", this.indvAbleList[_.findIndex(this.indvAbleList, d=>d.orgC === this.moduleList[i].infOfrmnOrgC)].orgC, this.moduleList[i].infOfrmnOrgC)

							if(i === this.moduleList.length - 1) {
								this.isIndvAllYn = true
								return
							}
						} else {
							this.isIndvAllYn = false
							return
						}
					}
				}
			})
		},

		
		
		//////////////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////// 금융인증 관련 메소드 ///////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////
		// 콕뱅크 금융인증서 숨김처리
		fn_getChnl(){
			let chnlYn = true

			if(this.getUserInfo('chnl') !== '385'){
				chnlYn = false
			}

            return chnlYn
		},

		// 금융인증 프로세스 진행
		fn_proceedFinance() {

			const config = {
				params : {
					certDsc : "finance"
				},
				renderer : {
					component : COAR2011
				}
			}
			modalService.openSlidePagePopup(config).then(response => {
				if(response === 'OK' && this.isJustSelectCert){
					//공공기관 인증방법 선택 or 기연결자산 선택 case
					this.close('finance')
				}else if(this.isMramMod !== ''){
					// 마이데이터사업자 통합인증 인증코드생성
					const config = {
						url : "/co/ar/05r01",
						data : {
							svcnm 	: "서비스명",
							orgC 	: ""
						}
					}
					apiService.call(config).then(response => {
						console.log("(연결 변경) 금융인증 전 nonce값 확인 >> ", response)
						this.attcC 		= response.attcC || ''
						this.attcCext 	= response.attcCext || ''

						const config = {
							component : COAR2004,
							params : {
								moduleList 		: this.moduleList,		// 선택기관목록
								userAgreeInfo 	: this.userAgreeInfo,	// 사용자동의정보
								isMramMod		: this.isMramMod,		// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
							}
						}
						modalService.openPopup(config).then(response => {
							if(response === "moveNext") {
								this.fn_getNonceCode()
							}
						})
					})
				}else if(response === 'OK' && this.connectFlag === 'aset') {
					// 신규 자산 추가로 들어올 경우
					const config = {
						component : COAR2004,
						params : {
							moduleList 		: this.moduleList,		// 선택기관목록
							userAgreeInfo 	: this.userAgreeInfo	// 사용자동의정보
						}
					}
					modalService.openPopup(config).then(response => {
						if(response === "moveNext") {
							this.fn_getNonceCode()
						}
					})
				}
			})
		},

		// 마이데이터사업자 통합인증 인증코드생성
		fn_getNonceCode() {
			const config = {
				url : "/co/ar/05r01",
				data : {
					svcnm 	: "서비스명",
					orgC 	: ""
				}
			}
			apiService.call(config).then(response => {
				console.log("금융인증 전 nonce값 확인 >> ", response)
				this.attcC 		= response.attcC || ''
				this.attcCext 	= response.attcCext || ''

				// local일 경우 인증 거치지 않고 다음 프로세스 진행
				if( !(window.location.host.indexOf('localhost') > -1) ) this.fn_financeSign()
				else this.fn_financeFinish()
			})
		},

		// 금융인증 전자서명 프로세스
		fn_financeSign() {
			// 금융인증 웹뷰 세션 연장 처리
			this.startSessionTimerAuth()

			console.log("금융인증 전자서명 전")
			let content = []
			if(this.isMramMod === '') {
				for(let i=0; i<this.moduleList.length; i++) {
					content.push(
						{
							"orgCode" : this.moduleList[i].orgC
							,"ucpidRequestInfo" : {
								"userAgreement" : "금융분야 마이데이터 통합인증을 위한 인증서 본인확인서비스 이용약관, 개인정보처리, 고유식별정보 수집·이용 및 위탁에 동의합니다.",
								"userAgreeInfo" : this.userAgreeInfo,
								"ispUrlInfo" : import.meta.env.VITE_API_URL,
								"ucpidNonce" : this.attcC,
							}
							,"consentInfo" : {
								"consent" : {
									"snd_org_code" : this.moduleList[i].orgC
									,"rcv_org_code" : "ZVAAAZ0000"
									,"is_scheduled" : "false"
									,"end_date" : dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
									,"purpose" : "상세정보 전송요구를 위한 가입상품목록조회"
									,"period" : dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
									,"target_info" : [
										{"scope" : this.moduleList[i].orgBzrgC + '.list'}
									]
								},
								"consentNonce" : this.attcCext
							}
						}
					)
				}
			} else {
				for(let i=0; i<this.moduleList.length; i++) {
					content.push(
						{
							"orgCode" : this.moduleList[i].infOfrmnOrgC
							,"ucpidRequestInfo" : {
								"userAgreement" : "금융분야 마이데이터 통합인증을 위한 인증서 본인확인서비스 이용약관, 개인정보처리, 고유식별정보 수집·이용 및 위탁에 동의합니다.",
								"userAgreeInfo" : this.userAgreeInfo,
								"ispUrlInfo" : import.meta.env.VITE_API_URL,
								"ucpidNonce" : this.attcC,
							}
							,"consentInfo" : {
								"consent" : {
									"snd_org_code" : this.moduleList[i].infOfrmnOrgC
									,"rcv_org_code" : "ZVAAAZ0000"
									,"is_scheduled" : "false"
									,"end_date" : dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
									,"purpose" : "상세정보 전송요구를 위한 가입상품목록조회"
									,"period" : dateFormat(moment().add('7', 'days'), 'YYYYMMDD')
									,"target_info" : [
										{"scope" : this.moduleList[i].orgBizDsc + '.list'}
									]
								},
								"consentNonce" : this.attcCext
							}
						}
					)
				}
			}
			// 파라미터 필수
			const config = {
				"content" : content
				,"orgCode" : import.meta.env.VITE_PRIVATE_ORGCODE
				,"apiKey" : import.meta.env.VITE_PRIVATE_APIKEY
			}
			console.log("서명 웹뷰 띄우기전 파라미터 확인 :: ", config)
			
			if(this.getUserInfo("chnl") === '385') {
				appService.openPFMOFPFinCert(config).then(response => {
					console.log('스뱅 금융인증 웹뷰 호출 >> ', response)
					this.signedDataList = response.result.signedDataList || []
					for(let i=0; i<this.signedDataList.length; i++) {
						this.signListOne.push({"orgCode":this.signedDataList[i].orgCode,"signedPersonInfoReq":this.signedDataList[i].signedPersonInfoReq})
						this.signListTwo.push({"orgCode":this.signedDataList[i].orgCode,"signedConsent":this.signedDataList[i].signedConsent})
					}
					this.caOrgOne = response.result.caOrg || ''
					this.caOrgTwo = response.result.caOrg || ''
					this.fn_financeFinish()
				})
				.catch(error => {
					if(error !== '800000') modalService.alert(error)
				})
			} else {
				appService.cokBankOpenPFMOFPFinCert(config).then(response => {
					console.log('콕뱅 금융인증 웹뷰 호출 RESPONSE :: ', response)
					if(response.errorMessage !== undefined) {
						// 에러 상황
						console.log('콕뱅 금융인증 웹뷰 호출 후 에러 발생 ::: ', response.errorMessage)
						if(response.errorMessage !== '800000') modalService.alert(response.errorMessage)
						return false
					}
					this.signedDataList = JSON.parse(response.result).signedDataList || []
					for(let i=0; i<this.signedDataList.length; i++) {
						this.signListOne.push({"orgCode":this.signedDataList[i].orgCode, "signedPersonInfoReq":this.signedDataList[i].signedPersonInfoReq})
						this.signListTwo.push({"orgCode":this.signedDataList[i].orgCode, "signedConsent":this.signedDataList[i].signedConsent})
					}
					this.caOrgOne = JSON.parse(response.result).caOrg || ''
					this.caOrgTwo = JSON.parse(response.result).caOrg || ''

					this.fn_financeFinish()
				})
				.catch(error => {
					if(error !== '800000') modalService.alert(error)
				})
			}
		},

		// 금융인증 프로세스 종류 후 자산 요청
		fn_financeFinish() {
			
			// 세션타이머 종료
			clearInterval(this.sessionTimerAuthor)

			if( !(window.location.host.indexOf('localhost') > -1) ) {	// 운영 & 개발 서버
				console.log("금융인증 종료!!!!")
				let compName = COAR2007
				const config = {
					component : compName,
					params : {
						moduleList 		: this.moduleList,
						selectedCnt		: this.moduleList.length,
						attcC			: this.attcC,
						attcCext		: this.attcCext,
						signListOne 	: this.signListOne,
						signListTwo 	: this.signListTwo,
						userAgreeInfo 	: this.userAgreeInfo,
						caOrgOne 		: this.caOrgOne,
						caOrgTwo 		: this.caOrgTwo,
						ca_org_type 	: "06",
						isFirstStepYn	: true,
						certDsc			: "finance",
						isMramMod		: this.isMramMod,	// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
					}
				}
				console.log(config)
				modalService.openPopup(config).then(response => {
					console.log(response)
				})
			} else {	// local (프로세스 진행 테스트)
				let compName = COAR2007
				const config = {
					component : compName,
					params : {
						moduleList 		: this.moduleList,
						selectedCnt		: this.moduleList.length,
						attcC			: this.attcC,
						attcCext		: this.attcCext,
						signListOne 	: this.signListOne,
						signListTwo 	: this.signListTwo,
						userAgreeInfo 	: this.userAgreeInfo,
						caOrgOne 		: this.caOrgOne,
						caOrgTwo 		: this.caOrgTwo,
						ca_org_type 	: "06",
						isFirstStepYn	: true,
						certDsc			: "finance",
						responseJson	: this.fn_set_locatTestData(),
						isMramMod		: this.isMramMod,	// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
					}
				}
				console.log(config)
				modalService.openPopup(config).then(response => {
					console.log(response)
				})
			}
		},
		//////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////

		//////////////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////// PASS인증 관련 메소드 //////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////
		/**
		 * PASS 인증 진행
		 */
		fn_proceedPass() {
			const config = {
				renderer : {
					component : COAR2012,
				},
				params : {}
			}
			modalService.openSlidePagePopup(config).then(response => {
				if(response === "agree") {
					if(this.isJustSelectCert){
						this.close('pass')
					}else if(this.connectFlag === "aset") {
						if(this.isMramMod === '1') {
							// 연결기관 변경 - 연결 자산 변경
							this.fn_proceedPassNext('mod1')
						} else if(this.isMramMod === '2') {
							// 연결기관 변경 - 만료예정기관 변경
							this.fn_proceedPassNext('mod2')
						} else {
							// 연결기관 신규 추가
							this.fn_proceedPassNext('new')
						}
					} else {
						console.log("공공 >> ", this.connectFlag)
					}
				}
			})
		},

		fn_proceedPassNext(step) {
			if(step === 'new') {
				// 신규 자산 연결
				const config = {
					component : COAR2004,
					params : {
						moduleList 		: this.moduleList,		// 선택기관목록
						userAgreeInfo	: this.userAgreeInfo,	// 사용자동의정보
						isMramMod		: this.isMramMod,
						isBckYn			: this.isBckYn
					}
				}
				modalService.openPopup(config).then(response => {
					if(response === "moveNext") {
						this.fn_movePassCert(true)
					}
				})
			} else {
				// if(this.isBckYn) {
				// 	/**
				// 	 * 백업자산목록이 있는 경우에만 인증프로세스 간소화 가능하도록 설정
				// 	 */
				// 	// 마이데이터사업자 통합인증 인증코드생성
				// 	const config = {
				// 		url : "/co/ar/05r01",
				// 		data : {
				// 			svcnm : "서비스명",
				// 			orgC : ""
				// 		}
				// 	}
				// 	apiService.call(config).then(response => {
				// 		console.log("(연결 변경) PASS 인증 전 nonce값 확인 >> ", response)
				// 		this.attcC 		= response.attcC || ''
				// 		this.attcCext 	= response.attcCext || ''

				// 		if(step === 'mod1') {
				// 			// 연결 자산 변경
				// 			const config = {
				// 				component : COAR2008,
				// 				params : {
				// 					isFirstStepYn 	: false,
				// 					certDsc 		: "pass",
				// 					moduleList 		: this.moduleList,
				// 					attcC 			: this.attcC,
				// 					attcCext 		: this.attcCext,
				// 					ca_org_type 	: "06",
				// 					ca_org_name 	: "",
				// 					userAgreeInfo 	: this.userAgreeInfo,
				// 					isMramMod		: this.isMramMod,
				// 					isBckYn			: this.isBckYn,
				// 				}
				// 			}
				// 			modalService.openPopup(config).then()
				// 		} else if(step === 'mod2') {
				// 			// 만료예정 기관 변경

				// 			// COAR2008 -> 인증의 프로세스를 한번에 할 필요가있음.. (COAR2008 화면 생략 진행)
				// 			/**
				// 			 * 1) 연결 자산 변경의 프로세스를 여기 화면에서 진행.. temp table 조회 -> moduleList와 orgTotScopeList 매핑하여 생성
				// 			 * 2) 별도 체크없이 COAR2012로 이동
				// 			 */
				// 			console.log("COAR2012 으로 이동~")
							
				// 			const config = {
				// 				component : COAR2012,
				// 				params : {
				// 					isFirstStepYn	: false,
				// 					certDsc			: "pass",
				// 					moduleList		: this.moduleList,
				// 					attcC			: this.attcC,
				// 					attcCext		: this.attcCext,
				// 					ca_org_type		: "06",
				// 					ca_org_name		: "",
				// 					userAgreeInfo	: this.userAgreeInfo,
				// 					isMramMod		: this.isMramMod,
				// 					isBckYn			: this.isBckYn,

				// 					// COAR2008 -> COAR2012 전송 필요 파라미터
				// 					orgTotScopeList	: [],
				// 					selectList		: [],
				// 					selectedCnt		: 0,
				// 				}
				// 			}
				// 			console.log(">>> (PASS인증) COAR2012 이동 파라미터 >>> ", config)
				// 			modalService.openPopup(config).then()
				// 		}
				// 	})
				// } else {
					/**
					 * 변경으로 들어왔지만 선택기관의 전체자산백업데이터가 없을경우
					 * 인증프로세스 간소화 불가능으로 첫단계부터 진행
					 */
					this.fn_proceedPassNext('new')
				// }
			}
		},

		// PASS인증 진행 팝업 오픈
		fn_movePassCert(isFirstStepYn) {
			const config = {
				component : COAR2021,
				params : {
					connectFlag		: this.connectFlag,		// 연결정보분류(aset : 자산, gov : 공공정보)
					certDsc			: "pass",				// (필수) 인증방법 (공동인증 : joint, 금융인증 : finance, 패스인증 : pass)
					moduleList 		: this.moduleList,		// 선택기관목록
					userAgreeInfo 	: this.userAgreeInfo,	// 사용자동의정보
					isFirstStepYn	: isFirstStepYn,		// 1차인증 여부
					isMramMod		: this.isMramMod,		// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
					isBckYn			: this.isBckYn,			// '연결기관 관리' 의 기관 백업데이터 유무값
				}
			}
			modalService.openPopup(config).then(response => {
				console.log(response)
			})
		},
		getAgentName() {
			const phoneOS = navigator.userAgent
			if (phoneOS.match(/iPhone/) != null || phoneOS.match(/iPod/) != null || phoneOS.match(/iPad/) != null) {
				return "IOS";
			} else if (phoneOS.match(/Android/) != null){
					return "AOS";
			}
		},

		//////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////


		fn_set_locatTestData() {
			if(_.findIndex(this.$store.state.modal.modalList, d=>d.component.name === "AuthSampleLink") === -1) {
				let tmpData = {
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
					"card_cnt": 5,
					"card_list": [
						{
							"card_id": "9490950445807203",
							"card_num": "527289******3303",
							"is_consent": "false",
							"card_name": "KB 체크카드",
							"card_member": "1",
							"card_type": "02",
							"org_code": "D1AAAF0000",
							"org_biz_code": "card",
							"scope": "card.card"
						},
						{
							"card_id": "94909504111111111",
							"card_num": "345289******3303",
							"is_consent": "false",
							"card_name": "KB 신용카드",
							"card_member": "1",
							"card_type": "02",
							"org_code": "D1AAAF0000",
							"org_biz_code": "card",
							"scope": "card.card"
						},
						{
							"card_id": "949092314511",
							"card_num": "4455289******3303",
							"is_consent": "false",
							"card_name": "KB PAY 머니",
							"card_member": "1",
							"card_type": "02",
							"org_code": "D1AAAF0000",
							"org_biz_code": "card",
							"scope": "card.card"
						},
						{
							"card_id": "20004298000694",
							"card_num": undefined,
							"is_consent": "false",
							"card_name": "신한 체크카드",
							"card_member": "1",
							"card_type": "02",
							"org_code": "D1AAEX0000",
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
					"public_cnt": 11,
					"public_list": [
						//행정안전부
						{
							"cert_id" : "L163",
							"is_consent": "false",
							"is_foreign_deposit": "false",
							"cert_nm": "지방세납세증명서",
							"org_code": "PBAAVL0000",
							"org_biz_code": "public",
							"scope": "public.mois",
							"purpose" : "지방세 납세 증명서 전송요구"
						},
						{
							"cert_id" : "L164",
							"is_consent": "false",
							"is_foreign_deposit": "false",
							"cert_nm": "지방세납부확인서(등록면허세면허분)",
							"org_code": "PBAAVL0000",
							"org_biz_code": "public",
							"scope": "public.mois",
							"purpose" : "지방세납부확인서(등록면허세면허분) 전송요구"
						},
						{
							"cert_id" : "L162",
							"is_consent": "false",
							"is_foreign_deposit": "false",
							"cert_nm": "지방세세목별과세(납세)증명서(자동차세)",
							"org_code": "PBAAVL0000",
							"org_biz_code": "public",
							"scope": "public.mois",
							"purpose" : "지방세세목별과세(납세)증명서(자동차세) 전송요구"
						},
						{
							"cert_id" : "L161",
							"is_consent": "false",
							"is_foreign_deposit": "false",
							"cert_nm": "지방세세목별과세(납세)증명서(재산세)",
							"org_code": "PBAAVL0000",
							"org_biz_code": "public",
							"scope": "public.mois",
							"purpose" : "지방세세목별과세(납세)증명서(재산세) 전송요구"

						},
						//국세청
						{
							"cert_id" : "L021",
							"is_consent": "false",
							"is_foreign_deposit": "false",
							"cert_nm": "(국세)납세증명서",
							"org_code": "PBAAVJ0000",
							"org_biz_code": "public",
							"scope": "public.mois",
							"purpose" : "(국세)납세증명서 전송요구"
						},
						{
							"cert_id" : "L169",
							"is_consent": "false",
							"is_foreign_deposit": "false",
							"cert_nm": "납세사실증명서",
							"org_code": "PBAAVJ0000",
							"org_biz_code": "public",
							"scope": "public.mois",
							"purpose" : "납세사실증명서 전송요구"
						},
						//관세청
						{
							"cert_id" : "L098",
							"is_consent": "false",
							"is_foreign_deposit": "false",
							"cert_nm": "관세납세증명서",
							"org_code": "PBAAVK0000",
							"org_biz_code": "public",
							"scope": "public.customs",
							"purpose" : "관세납세증명서 전송요구"
						},
						{
							"cert_id" : "L171",
							"is_consent": "false",
							"is_foreign_deposit": "false",
							"cert_nm": "관세납부내역",
							"org_code": "PBAAVK0000",
							"org_biz_code": "public",
							"scope": "public.customs",
							"purpose" : "관세납부내역 전송요구"
						},
						//국민건강보험공단
						{
							"cert_id" : "L167",
							"is_consent": "false",
							"is_foreign_deposit": "false",
							"cert_nm": "건강·장기요양보험료납부확인서(직장가입자)",
							"org_code": "PBAAVN0000",
							"org_biz_code": "public",
							"scope": "public.nhis",
							"purpose" : "건강·장기요양보험료납부확인서(직장가입자) 전송요구"
						},
						{
							"cert_id" : "L168",
							"is_consent": "false",
							"is_foreign_deposit": "false",
							"cert_nm": "건강·장기요양보험료납부확인서(지역가입자)",
							"org_code": "PBAAVN0000",
							"org_biz_code": "public",
							"scope": "public.nhis",
							"purpose" : "건강·장기요양보험료납부확인서(지역가입자) 전송요구"

						},
						//국민연금공단
						{
							"cert_id" : "L165",
							"is_consent": "false",
							"is_foreign_deposit": "false",
							"cert_nm": "연금산정용 가입내역확인서",
							"org_code": "PBAAVM0000",
							"org_biz_code": "public",
							"scope": "public.nps",
							"purpose" : "연금산정용 가입내역확인서 전송요구"
						},
						
						

					],
					"success_cnt": 14,
					"success_org_list": [
						// {
						// 	"org_code": "A4AAAZ0000",
						// 	"org_name": "농업협동조합중앙회"
						// },
						// {
						// 	"org_code": "A1AABG0000",
						// 	"org_name": "농협은행 주식회사"
						// },
						// {
						// 	"org_code": "A1AAAD0000",
						// 	"org_name": "한국산업은행"
						// },
						// {
						// 	"org_code": "A1AAEQ0000",
						// 	"org_name": "중소기업은행"
						// },
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
							"org_code": "B1AAAI0000",
							"org_name": "교보생명보험"
						},
						{
							"org_code": "D1AAEX0000",
							"org_name": "신한카드"
						},
						//공공 기관 성공 dummy
						{
							"org_code": "PBAAVL0000",
							"org_name": "행정안전부"
						},
						{
							"org_code": "PBAAVJ0000",
							"org_name": "국세청"
						},
						{
							"org_code": "PBAAVK0000",
							"org_name": "관세청"
						},
						{
							"org_code": "PBAAVN0000",
							"org_name": "국민건강보험공단"
						},
						{
							"org_code": "PBAAVM0000",
							"org_name": "국민연금공단"
						},
							{
							"org_code": "PBAAVO0000",
							"org_name": "공무원연금공단"
						}
					],
						//실패기관 임의 데이터
						"fail_org_list": [
						
						{
							"org_code": "D1AAAF0000",
							"org_name": "㈜KB국민카드"
						},
						{
							"org_code": "D1AAAH0000",
							"org_name": "주식회사 우리카드"
						},
						{
							"org_code": "B1AAAI0000",
							"org_name": "교보생명보험"
						},
						{
							"org_code": "D1AAEX0000",
							"org_name": "신한카드"
						},
						//공공 기관 성공 dummy
						{
							"org_code": "PBAAVL0000",
							"org_name": "행정안전부"
						},
						{
							"org_code": "PBAAVJ0000",
							"org_name": "국세청"
						},
						{
							"org_code": "PBAAVK0000",
							"org_name": "관세청"
						},
						{
							"org_code": "PBAAVN0000",
							"org_name": "국민건강보험공단"
						},
						{
							"org_code": "PBAAVM0000",
							"org_name": "국민연금공단"
						},
							{
							"org_code": "PBAAVO0000",
							"org_name": "공무원연금공단"
						},
					]
				}

				return tmpData
			}
		}
    },
    components : {
	},
	destroyed() {
		clearInterval(this.sessionTimerAuthor)
	}
}


</script>