<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표
* @ 페이지설명 : 금융과생활 > 나의목표 > 자기계발 목표 저장
* @ 파일명     : src\views\page\PD\MY\PDMY2015\PDMY2015.vue
* @ 작성자     : CS533453
* @ 작성일     : 2023-07-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-17              CS533453              최초작성
*************************************************************************/
-->


<template>
	<div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>버킷리스트</h1>
		</div>
		<div class="popup_content com_bg_type00">
			<div class="com_inner">
				<strong class="titH1">새로운 도전, 자기계발로 시작!</strong>

				<div class="com_inputarea_type01">					
					<div class="com_input_type01">
						<input type="text" ref="obtnm" v-model="obtnm" required placeholder="목표 제목 입력" title="목표 제목">
						<label for="obtnm"><span class="txt_label_x">목표 제목</span></label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2"><span class="blind">삭제</span></a>
						</div>
					</div>

					<!-- 자기계발 카테고리 선택(인풋창 아님) 클릭시 팝업창 호출 -->
					<div class="com_btnselectbox_type01">
						<button type="button" class="com_btnselect_type01 search_icon" title="자기계발 선택" @click.prevent="openComCodePop(1)">
							<template v-if="slfImprvmntCstRkonDscNm1 == ''">
								자기계발 선택
							</template>
							<template v-else>
								<span>{{slfImprvmntCstRkonDscNm1}}</span>
							</template>
						</button>
					</div>
					<!-- //자기계발 카테고리 선택(인풋창 아님) 클릭시 팝업창 호출 -->

					<!-- 자기계발 항목 카테고리 선택 -->
					<div class="com_btnselectbox_type01">
						<button type="button" class="com_btnselect_type01" title="자기계발 항목 선택" @click.prevent="openComCodePop(2)">
							<template v-if="slfImprvmntCstRkonDscNm2 == ''">
								항목 선택
							</template>
							<template v-else>
								<span>{{slfImprvmntCstRkonDscNm2}}</span>
							</template>
						</button>
					</div>
					<!-- //자기계발 항목 카테고리 선택 -->

					<!-- 비용 -->
					<div class="cost_wrap">
						<strong class="titH4">{{slfImprvmntCstRkonDscNm2}} 자격증 비용 (6개월 기준)</strong>
						<div class="list_gray_box">
							<dl v-for="(codeInfo3, index) in codeListDepth3" :key="'key2_'+index">
								<dt>{{codeInfo3.comnCExpl}}</dt>
								<dd><span class="num">{{codeInfo3.refCntn3}}</span>원</dd>
							</dl>
							<!-- <dl>
								<dt>시설 이용료</dt>
								<dd><em class="num">1,800,000</em>원</dd>
							</dl> -->
						</div>
					</div>
					<!-- //비용 -->

					<!-- 목표금액 -->
					<div class="com_input_type01 com_won01">
						<input type="tel" class="input_right" ref="fncObtAm" placeholder="목표금액을 입력하세요" title="목표금액" :class="fncObtAm.length > 0 && foc_fncObtAm && !dis_fncObtAm ? 'focusON focusforce' : ''" v-model="fncObtAm" maxlength="12" @keyup="addComma($event)" required @focus="fn_focusOnOff('fncObtAm')" @blur="fn_setBacAm">
						<label for="fncObtAm"><span class="txt_label_x">목표금액</span></label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2 blur"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">원</span>
						</div>
						<div class="infoBox">
							<p class="com_sum" v-if="fncObtAm">{{fn_hanValue(fncObtAm)}}</p>
						</div>
					</div>
					<!--// 목표금액 -->

					<!-- 언제까지 모을까요 -->
					<div class="com_input_type01 readonly_ph" role="button" :aria-label="'필수입력, 최소6개월~10년사이, 목표기간 '+obtDtLabel+', 목표기간 선택'" @click="fn_popupCalendar($event)">
						<input type="text" class="input_cal_date input_right focusforce" ref="obtDt" v-model="obtDt" required readonly placeholder="언제까지 모을까요(최소6개월~10년사이)" title="언제까지 모을까요" aria-hidden="true" @focus="fn_focusOnOff('obtDt_on')" @blur="fn_focusOnOff('obtDt_off')"><div class="lineEF"></div>
						<label for="obtDt"><span class="txt_label_x">목표기간</span></label>
						<div class="del_txt">
							<a href="javascript:void(0);" role="button" class="com_btn_delete2 blur" style="display: none;"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2 type02"></span>
						</div>
					</div>
					<!-- //언제까지 모을까요 -->

					<template v-if="subList.length > 0">
						<ul class="account_list_2023 line_type">
							<li v-for="(acctInfo, index) in subList" :key="index">
								<dl>
									<dt>
										<i class="ico_bank" :class="acctInfo.infOfrmnOrgC"><span class="blind">{{acctInfo.infOfrmnOrgNm}}</span></i>
										<span class="name">{{acctInfo.acWrsnm}}</span>
										<span class="num">{{acctInfo.mydtAcno}}</span>
									</dt>
									<dd>
										<em class="num">{{acctInfo.acNowBac | numberFilter}}</em>원
									</dd>
								</dl>
							</li>
						</ul>
					</template>
					<template v-else>
						<p class="check_text">
							예/적금계좌 및 요구불계좌를 연결 하고 목표금액에 필요한 금액을 확인하세요.
						</p>
					</template>

					<div class="com_btn_area mt12" v-if="prgStsCd == '1'">
						<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click="openSlidePagePopupWithComponent">
							<span class="btn_plus">
								<template v-if="subList.length > 0">연결계좌 다시 선택</template>
								<template v-else>연결계좌 선택</template>
							</span>
						</a>
					</div>

					<div class="mygoal_sub_text mt30">
						<p class="point_line" v-if="subList.length > 0 && bacAm > 0 && remove(fncObtAm) > 0" v-html="fn_numberFormatKorAmt"></p>
					</div>

				</div>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a @click.prevent="insertExpensePerpose()" class="btn btn_mint" href="javascript:void(0);">
					<template v-if="insYn === 'C'">등록</template>
					<template v-else>수정</template>
				</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll()"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>

import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import {keyupNumFormat, numberFormat} from '@/utils/number'
import {checkWord} from '@/utils/data'
import {monthAdd, dateFormat, monthDiff, isValidDate} from '@/utils/date'
import COCO1124 from '@/views/page/CO/CO/COCO1124/COCO1124'
import PDMY2007 from '@/views/page/PD/MY/PDMY2007/PDMY2007' // 버킷리스트용 공통코드
import PDMY2036 from '@/views/page/PD/MY/PDMY2036/PDMY2036' // 자기계발 카테고리 조회 팝업
import _ from 'lodash'

export default {
    name : "PDMY2015",
    data: () => {
		return {
			mydtCusno           : '',   //마이데이터고객번호
            fncObtDsc           : '',   //금융목표구분코드 필수(07:자기계발)
            sqno                : '',   //일련번호(상세조회시 필수)
			lschgDtm            : '',   //최종변경일시
            fncObtAm            : 0,    //금융목표금액
            obtDt               : '',   //목표일자
            obtnm               : '',   //목표명
			subList             : [],  //연결계좌내역목록
                                // mydtCusno        마이데이터고객번호
                                // fncObtDsc        금융목표구분코드
                                // sqno             일련번호
                                // infOfrmnOrgC     정보제공자기관코드
                                // infOfrmnOrgNm    정보제공자기관코드명
                                // mydtAcno         마이데이터계좌번호
                                // mydtScNo         마이데이터회차번호
                                // lschgDtm         최종변경일시
                                // acWrsnm          계좌상품명
								// acNowBac         계좌현재잔액
			subListIn           : [],
			accountList:[], // 계좌목록
			prgStsCd            : '', // 진행여부
			insYn               : '', // 등록/수정여부
			acNowBacTotAm:0,   // 계좌현재잔액총액
			bacAm:0,

			fncObtAchvYn:'', // 목표달성여부

			foc_fncObtAm : false, // 목표금액 focus YN
			foc_obtDt    : false, // 목표기간 focus YN
			dis_fncObtAm : true,  // 목표금액 disabled여부
			obtDtLabel        : "",     // 선택한 날짜의 라벨

			today : dateFormat(new Date(), "YYYY-MM-DD"),

			bannerPopYn:"",

			openYn:"Y",	// 화면 최초 진입 체크
			codeListDepth3				: [],	// 3뎁스 코드 리스트
			slfImprvmntCstRkonDsc1			: "",	// 자기계발비용산정구분코드1
			slfImprvmntCstRkonDsc2			: "",	// 자기계발비용산정구분코드2
			slfImprvmntCstRkonDscNm1			: "",	// 자기계발비용산정구분코드명1
			slfImprvmntCstRkonDscNm2			: "",	// 자기계발비용산정구분코드명2
			rgDt						: "",	// 등록일자
        }
    },
    computed : {
		fn_numberFormatKorAmt() {
			const unit = ['', '만', '억', '조', '경']
			const splitAmt = 10000
			const splitCnt = unit.length

			let resultArray = []
			let resultString = ""

			for(let i = 0; i < splitCnt; i++){
				let rst = (this.bacAm % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
				rst = Math.floor(rst)

				if(rst > 0){
					resultArray[i] = rst
				}
			}

			let strIdx = 0  // 최초시작지점에 '원' 추가하기위함

			for(let j = 0; j < resultArray.length; j++){
				if(!resultArray[j])  {
					strIdx++
					continue
				}

				if(j === strIdx) {
					resultString = '<span class="com_point_blue">'+String(numberFormat(resultArray[j])) +'</span>'+ unit[j] + '원' + resultString
				} else {
					resultString = '<span class="com_point_blue">'+String(numberFormat(resultArray[j])) +'</span>'+ unit[j] + ' ' + resultString
				}
			}

			return '목표 달성을 위해 ' + resultString + '이 필요해요!'
		},
	},
	mounted() {
		this.initComponent(this.params)
		
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
		init() {
			this.slfImprvmntCstRkonDsc1		= ""	// 자기계발비용산정구분코드1
			this.slfImprvmntCstRkonDscNm1	= ""	// 자기계발비용산정구분코드명1
			this.slfImprvmntCstRkonDsc2		= ""	// 자기계발비용산정구분코드2
			this.slfImprvmntCstRkonDscNm2	= ""	// 자기계발비용산정구분코드명2
			this.chkObtDt				= ""
		},
		initComponent(params) {

			this.init()

			// 계좌목록 조회
			this.getAcctList()

			this.mydtCusno = this.getUserInfo("mydtCusno")

			// 배너호출여부(배너가 팝업에서 위치한경우)
			this.bannerPopYn = this.fn_bannerPopYn() || ''

			if (params !== undefined && params !== null 
				&& params.fncObtDsc !==undefined && params.fncObtDsc !== null && params.fncObtDsc === '07' 
				&& params.sqno !==undefined && params.sqno !== null && params.sqno !== '')
			{
				this.insYn = "U" // 수정
				this.fncObtDsc = params.fncObtDsc
				this.sqno = params.sqno
				this.prgStsCd = params.prgStsCd
				console.log("this.prgStsCd : ",this.prgStsCd)
				console.log("this.prgStsCd : ",this.prgStsCd)

				this.getData()
			}
			else
			{
				this.fncObtDsc = "07"
				this.fncObtAm = ""
				this.sqno = 0
				this.obtDt = ""
				this.subListIn = []
				this.insYn = "C" // 등록
				this.prgStsCd = "1" // 진행중

				this.openCategoryPop()
			}

		},
		// 자기계발카테고리조회 팝업
		openCategoryPop() {

            let param = {
				comnCId : "SLF_IMPRVMNT_CST_RKON_DSC1"
			}
            const config = {
                component: PDMY2036,
                params : param
			}

            modalService.openPopup(config).then(response => {
                if(response != null) {
					this.slfImprvmntCstRkonDsc1		= response.comnCVal
					this.slfImprvmntCstRkonDscNm1	= response.comnCExpl
					this.openComCodePop(2)
				}
            })
		},
		// 슬라이드 팝업
		openComCodePop(depth) {
			
			this.openYn = "N"
			
			let comnCId = ""
			let refCntn1 = ""
			let comnCExpl = ""
			if(depth == 1) {
				comnCId		= "SLF_IMPRVMNT_CST_RKON_DSC1"
				refCntn1	= ""
				comnCExpl	= "자기계발 선택"
			} else if(depth == 2) {
				if(this.slfImprvmntCstRkonDsc1 == '') {
					modalService.alert("자기계발을 선택해주세요").then(() => {});
					return
				}
				comnCId		= "SLF_IMPRVMNT_CST_RKON_DSC2"
				refCntn1	= this.slfImprvmntCstRkonDsc1
				comnCExpl	= this.slfImprvmntCstRkonDscNm1 + " 선택"
			} else if(depth == 3) {
				refCntn1 = this.slfImprvmntCstRkonDsc2
				this.getDetailCodeList('SLF_IMPRVMNT_CST_RKON_DSC3', refCntn1, null)
				return
			} 

			const config = {
				params: {
					title		: comnCExpl,
					comnCId		: comnCId,
					refCntn1	: refCntn1
                },
                renderer: {
					component: PDMY2007
                }
            };
            
            modalService.openSlidePagePopup(config).then(response => {

				if(response != null) {
					if(response.comnCId != null && response.comnCId !== "") {
						let comnCIdStr = response.comnCId.toString()
						let nextDepth = Number(comnCIdStr.substr(comnCIdStr.length - 1, 1)) + 1
						if(depth == 1) {
							this.slfImprvmntCstRkonDsc1 = response.comnCVal
							this.slfImprvmntCstRkonDscNm1 = response.comnCExpl
							this.slfImprvmntCstRkonDsc2 = ""
							this.slfImprvmntCstRkonDscNm2 = ""
							this.codeListDepth3 = []
						} else if(depth == 2) {
							this.slfImprvmntCstRkonDsc2 = response.comnCVal
							this.slfImprvmntCstRkonDscNm2 = response.comnCExpl
							this.codeListDepth3 = []
						}
						this.$nextTick(()=>{
							this.openComCodePop(nextDepth)
						})
					}
				}

			})	
		},
		// 비용산정구분코드 3뎁스 조회
		getDetailCodeList(comnCId, refCntn1, fncObtAm) {

			const config = {
				url: '/co/co/00r04',
				data: {
						"comnCId": comnCId
						,"refCntn1" : refCntn1
					}
			};
			
			apiService.call(config).then(response => {
				this.codeListDepth3 = response.comnCList || []
				console.log(this.codeListDepth3)
				if(fncObtAm == null) {
					this.fncObtAm = keyupNumFormat(_.sumBy(response.comnCList, item => Number(item.refCntn3.toString().replaceAll(",","")))) // 비용합계
				}
				this.fn_setBacAm()
			});
		},
		getData() {

			const config = {
				url: '/pd/my/27r01',
				data: {
						"mydtCusno": this.mydtCusno // 마이데이터고객번호
						,"fncObtDsc" : this.fncObtDsc
						,"sqno" : this.sqno
					}
			};

			apiService.call(config).then(response => {
				this.respInfo			= response

				this.obtnm					= this.respInfo.obtnm
				this.fncObtAm				= keyupNumFormat(this.respInfo.fncObtAm)
				this.obtDt					= dateFormat(this.respInfo.obtDt, 'YYYY-MM-DD')
				this.obtDtLabel				= dateFormat(this.respInfo.obtDt, "YYYY년 MM월 DD일")
				this.rgDt					= this.respInfo.rgDt
				this.chkObtDt				= this.obtDt
				this.subList				= this.respInfo.subList || []
				this.fncObtAchvYn			= this.respInfo.fncObtAchvYn
				this.slfImprvmntCstRkonDsc1   	= this.respInfo.slfImprvmntCstRkonDsc1
				this.slfImprvmntCstRkonDsc2   	= this.respInfo.slfImprvmntCstRkonDsc2
				this.slfImprvmntCstRkonDscNm1	= this.respInfo.slfImprvmntCstRkonDscNm1
				this.slfImprvmntCstRkonDscNm2	= this.respInfo.slfImprvmntCstRkonDscNm2

				this.acNowBacTotAm = _.sumBy(this.subList, item => {return item.acNowBac }) // 계좌현재잔액총액
				
				this.bacAm = this.remove(this.fncObtAm) - this.acNowBacTotAm
				
				this.getDetailCodeList("SLF_IMPRVMNT_CST_RKON_DSC3", this.slfImprvmntCstRkonDsc2, this.fncObtAm)

			});
		},
        // 글자수 체크
        fn_checkWord(event, maxByte) {
            let rtnObj = checkWord(event.target.value, maxByte)

            if(rtnObj.flag) {this.$refs.PDMY2023_srchKwrd.blur()}   // 알럿 중복 방지

            event.target.value = rtnObj.value
            this.PDMY2023_srchKwrd = event.target.value
		},
		addComma() {
			this.bacAm = 0
			const selectionStartPos = this.$refs.fncObtAm.selectionStart
			const selectionEndPos = this.$refs.fncObtAm.selectionEnd

			if(this.fncObtAm.length == 1 && this.fncObtAm == 0) {
				this.fncObtAm = this.fncObtAm.slice(0, -1)
			} else {
				this.fncObtAm = this.fncObtAm.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
				this.fncObtAm = this.fncObtAm.split(",").join("")
				this.fncObtAm = keyupNumFormat(this.fncObtAm)
			}

			if(event.keyCode === 8) {
				this.$nextTick(()=>{
					this.$refs.fncObtAm.focus()
					this.$refs.fncObtAm.setSelectionRange(selectionStartPos,selectionEndPos)
				})
			}
		},
		fn_modifyFncObtAm() {

			this.dis_fncObtAm = false
			this.foc_fncObtAm = true
			setTimeout(() => {
				this.$refs.fncObtAm.focus()
			}, 10)
		},
		getAcctList() {
			const config = {
				url : "/co/co/07r01",
				data : {
					mydtCusno   : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
					bnkAcDsc    : '11',                             // 은행계좌구분코드 (11:나의목표_수신상품, 21:나의목표_투자상품, 10 : 수신상품, 20 : 투자상품, 32: 담보대출(부동산) , 35: 할부금융(자동차)) 
				}
			}

			apiService.call(config).then(response => {

				this.accountList = response.accountList || []

				// 빈계좌 세팅(테스트용)
				/*
				if(this.accountList.length == 0) {

					let inputAcct1 = {}
					inputAcct1.mydtCusno = this.getUserInfo("mydtCusno")
					inputAcct1.infOfrmnOrgC = 'B2AAAL0000'
					inputAcct1.mydtAcno = '111-11-11111'
					inputAcct1.mydtScNo = '1'
					inputAcct1.acWrsnm = '테스트계좌1'
					inputAcct1.orgnm = '기관명1'
					inputAcct1.acNowBac = 1230000

					this.accountList.push(inputAcct1)

					let inputAcct2 = {}
					inputAcct2.mydtCusno = this.getUserInfo("mydtCusno")
					inputAcct2.infOfrmnOrgC = 'B2AAAL0000'
					inputAcct2.mydtAcno = '222-22-22222'
					inputAcct2.mydtScNo = '2'
					inputAcct2.acWrsnm = '테스트계좌2'
					inputAcct2.orgnm = '기관명2'
					inputAcct2.acNowBac = 120000

					this.accountList.push(inputAcct2)

					let inputAcct3 = {}
					inputAcct3.mydtCusno = this.getUserInfo("mydtCusno")
					inputAcct3.infOfrmnOrgC = 'B2AAAL0000'
					inputAcct3.mydtAcno = '333-33-33333'
					inputAcct3.mydtScNo = '2'
					inputAcct3.acWrsnm = '테스트계좌3'
					inputAcct3.orgnm = '기관명3'
					inputAcct3.acNowBac = 111222

					this.accountList.push(inputAcct3)
				}
				*/
			})
		},
		// 연결계좌 팝업 오픈
		openSlidePagePopupWithComponent() {

			const acctPopList = []

			if(this.accountList.length > 0) {
				for(let i=0; i<this.accountList.length; i++){

					let acctInfo = this.accountList[i]

					let inputInfo = {}
					inputInfo.goodsCode  = acctInfo.mydtAcno
					inputInfo.goodsName  = acctInfo.acWrsnm
					inputInfo.goodsPrice = acctInfo.acNowBac
					inputInfo.orgC  = acctInfo.infOfrmnOrgC
					inputInfo.orgNm = acctInfo.orgnm
					inputInfo.scNo  = acctInfo.mydtScNo

					if(this.subList.length == 0) {
						inputInfo.checked = false
					} else {
						// 조회된 연결계좌가 있으면 팝업호출시 체크된 상태로
						inputInfo.checked = this.setAcctCheckedInfo(acctInfo.mydtAcno, acctInfo.mydtScNo)
					}

					acctPopList.push(inputInfo)
				}
			}
							
			const config = {
				params: {
					title: '계좌연결',
				},
				renderer: {
					component: COCO1124,
					cdata : {"title":'계좌연결',
							"contentList":[
											{
												'contentGubn':'01', 
												'contentTitle':'계좌연결',
												'contentData':acctPopList,
											}
										],
							"purposeYn":"Y",                            /* 화면구분(금융생활-목표등록) */
							"fncObtAm": this.remove(this.fncObtAm) || 0 /* 목표금액 */
							}
				}
			}
			modalService.openSlidePagePopup(config).then(response => {

				// 등록된 연결계좌 목록 초기화후 재세팅
				let selectGoodsList = response || []

				if(this.accountList.length > 0) {
					if(selectGoodsList.length == 0) {
						modalService.alert("선택된 연결계좌가 없습니다.").then(() => {});
						return;
					}
				}

				this.subList = []

				// 연결계좌를 선택하지 않은 경우도 있음
				if(selectGoodsList.length > 0) {
					for(let i=0; i<selectGoodsList.length; i++){
						var inputObj = {}

						if(selectGoodsList[i].checked) { 
							//let acctInfo = this.setAcctInfo(selectGoodsList[i].goodsCode) // 계좌정보

							inputObj.mydtCusno = this.mydtCusno
							inputObj.fncObtDsc = this.fncObtDsc               // 금융목표(돈모으기)
							inputObj.infOfrmnOrgC  = selectGoodsList[i].orgC  // 기관코드
							inputObj.infOfrmnOrgNm = selectGoodsList[i].orgNm // 기관명
							inputObj.mydtAcno = selectGoodsList[i].goodsCode  // 마이데이터계좌번호
							inputObj.mydtScNo = selectGoodsList[i].scNo       // 마이데이터회차번호
							inputObj.acWrsnm  = selectGoodsList[i].goodsName  // 계좌상품명
							inputObj.acNowBac = selectGoodsList[i].goodsPrice // 계좌현재잔액

							this.subList.push(inputObj)
						}
					}
				} else {
					this.subList = []
				}
				this.acNowBacTotAm = _.sumBy(this.subList, item => {return item.acNowBac }) // 계좌현재잔액총액
				this.bacAm = (this.remove(this.fncObtAm)) - this.acNowBacTotAm
				
			})
		},
		setAcctCheckedInfo(mydtAcno, mydtScNo) {
			// 계좌번호
			let acctInfo = _.find(this.subList, {"mydtAcno":mydtAcno, "mydtScNo":mydtScNo})
			if(typeof acctInfo !== 'undefined') {
				return true
			} else {
				return false
			}
		},
		remove(value) {
			return (typeof value === "string") ? value.split(".").join("").split("-").join("").split(",").join("") : value
		},
		insertExpensePerpose() {

			// validation 체크
			if(this.obtnm.length == 0 || this.obtnm == '') {
				modalService.alert("목표명은 필수입력항목입니다.").then(() => {});
				return;
			}
			if(this.slfImprvmntCstRkonDsc1.length == 0 || this.slfImprvmntCstRkonDsc1 == '') {
				modalService.alert("자기계발은 필수입력항목입니다.").then(() => {});
				return;
			}
			if(this.slfImprvmntCstRkonDsc2.length == 0 || this.slfImprvmntCstRkonDsc2 == '') {
				modalService.alert("항목은 필수입력항목입니다.").then(() => {});
				return;
			}
			if(this.fncObtAm.length == 0 || this.fncObtAm == 0 || this.fncObtAm == '') {
				modalService.alert("목표금액은 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.obtDt.length == 0 || this.obtDt == "") {
				modalService.alert("목표기간은 필수입력항목입니다.").then(() => {});
				return;
			}			

			if(!isValidDate(this.remove(this.obtDt))) {
				modalService.alert("목표기간의 날짜형식을 확인바랍니다.").then(() => {});
				return;
			}

			if(this.insYn == "U") {
				if(monthDiff(dateFormat(dateFormat(this.remove(this.obtDt), 'YYYYMMDD'), 'YYYYMMDD'), dateFormat(this.rgDt, 'YYYYMMDD')) < 6 ||
					monthDiff(dateFormat(dateFormat(this.remove(this.obtDt), 'YYYYMMDD'), 'YYYYMMDD'), dateFormat(this.rgDt, 'YYYYMMDD')) > (12 * 10)) {
						modalService.alert("목표기간을 현재년월 이후 최소 6개월 ~ 10년 사이로 입력바랍니다.").then(() => {});
					return;
				}
			} else {
				if(Number(dateFormat(new Date, 'YYYYMMDD')) >= Number(dateFormat(this.obtDt, 'YYYYMMDD'))) {
					modalService.alert("목표기간을 현재년월 이후로 입력바랍니다.").then(() => {});
					return;
				}
				
				if(monthDiff(dateFormat(dateFormat(this.remove(this.obtDt), 'YYYYMMDD'), 'YYYYMMDD'), dateFormat(new Date, 'YYYYMMDD')) < 6 ||
					monthDiff(dateFormat(dateFormat(this.remove(this.obtDt), 'YYYYMMDD'), 'YYYYMMDD'), dateFormat(new Date, 'YYYYMMDD')) > (12 * 10)) {
						modalService.alert("목표기간을 현재년월 이후 최소 6개월 ~ 10년 사이로 입력바랍니다.").then(() => {});
					return;
				}

			}

			this.subListIn = []
			var inputFncObtAm = Number(this.remove(this.fncObtAm))

			// 연결계좌를 선택했을 경우
			if(this.subList.length > 0) {

				if(this.acNowBacTotAm >= inputFncObtAm) {
					modalService.alert("계좌 잔액이 목표 금액을 초과하였습니다.<BR>연결계좌를 다시 선택하세요").then(() => {});
					return;
				}

				/*
				if(this.subList.length == 0) {
					modalService.alert("선택된 연결계좌가 없습니다.").then(() => {});
					return;
				}
				*/
			}

			// 등록 연결계좌내역 삽입
			this.subListIn = this.subList

			// 등록
			let alertMsg
			if(this.insYn == "C") {
				alertMsg = '자기계발 목표를 등록하시겠습니까?'
			} 
			// 수정
			else {
				alertMsg = '자기계발 목표를 수정하시겠습니까?'
			}
			
			const configConfirm = {
				content: [alertMsg],
				title  : "",
			}

			modalService.confirm(configConfirm).then(text => {
				if(text == "예") {
					if(this.insYn == "C") {
						this.rgDt = dateFormat(new Date, 'YYYYMMDD')
					}

					const config = {
						url: '/pd/my/15s01',

						data: {"trDsc":this.insYn
								,"mydtCusno": this.mydtCusno // 마이데이터고객번호
								,"fncObtDsc" : this.fncObtDsc
								,"sqno": this.sqno
								,"obtnm" : this.obtnm.trim()
								,"slfImprvmntCstRkonDsc1" : this.slfImprvmntCstRkonDsc1
								,"slfImprvmntCstRkonDsc2" : this.slfImprvmntCstRkonDsc2
								,"fncObtAm" : inputFncObtAm
								,"obtDt" : this.remove(this.obtDt)
								,"prgStsCd" : this.prgStsCd // 진행상태코드 0:전체, 1:진행중, 2:종료
								,"subListIn" : this.subListIn
								,"fncObtAchvYn":this.fncObtAchvYn
								,"rgDt":this.rgDt
								}
					};
					
					apiService.call(config).then(response => {

						if(response.rspCd == '0000'){
							modalService.alert("저장되었습니다.").then(() => {
								
								// 전체페이지 닫기
								if(this.bannerPopYn == "Y") {
									this.closeAllLeftMain('reSelect')
								} else {
									this.closeAllData('reSelect')
								}
							});
						} else {
							modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {
								//this.close(response);
							})
						}
					});
				}
			})
		},
		// input 클릭 시 focus 관련
		fn_focusOnOff(type) {
			switch(type) {
				case 'fncObtAm':
					this.foc_fncObtAm = true
					this.foc_obtDt    = false
					break
				case 'obtDt_on':
					this.foc_fncObtAm = false
					this.foc_obtDt    = true
					break
				case 'obtDt_off':
					this.foc_fncObtAm = false
					this.foc_obtDt    = false
					break
			}
		},
		fn_setBacAm() {
			if(this.fncObtAm.length == 1 && this.fncObtAm == 0) {
				this.bacAm = 0
			} else {
				this.bacAm = (this.remove(this.fncObtAm)) - this.acNowBacTotAm
			}
		},
		fn_popupCalendar(evt) {

			let tmpDt = ""
			let minDate = ''
			let maxDate = ''

			if(this.insYn == 'C') {
				if(this.obtDt !== undefined && this.obtDt !== null && this.obtDt !== '') {
					tmpDt = dateFormat(this.obtDt, 'YYYY-MM-DD')
				} else {
					tmpDt = dateFormat(monthAdd(6), 'YYYY-MM-DD')
				} 
				minDate = dateFormat(monthAdd(6), 'YYYY-MM-DD')
				maxDate = dateFormat(monthAdd(240), 'YYYY-MM-DD')
			} else {
				tmpDt = dateFormat(this.obtDt, 'YYYY-MM-DD')
				minDate = dateFormat(monthAdd(6), 'YYYY-MM-DD')
				maxDate = dateFormat(monthAdd(240), 'YYYY-MM-DD')
			}
			
			let config = {
				pDate   : tmpDt,
				minDate : minDate,
				maxDate : maxDate
			}

			modalService.calendarPopup(config).then(response => {
				
				if(response !== undefined && response !== null && response !== '')
				{
					evt.target.value = dateFormat(response, "YYYY-MM-DD")
					this.obtDt = evt.target.value
					this.obtDtLabel =  dateFormat(response, "YYYY년 MM월 DD일")
				}
			})
		},
		fn_bannerPopYn() {
			let modalInfo = this.$store.state.modal.modalList
			let modalLength = this.$store.state.modal.modalList.length

			let bannerPopYn = ""

			for(let i=0; i<modalLength; i++) {
				if(modalInfo[i].component.name.indexOf("PDYT1105") !== -1 ||
					modalInfo[i].component.name.indexOf("PDPD2110") !== -1 ||
					modalInfo[i].component.name.indexOf("ASIP1102") !== -1) 
				{
					bannerPopYn = "Y"
				}
			}
			return bannerPopYn
		},
		// 한글금액표시
		fn_hanValue(amount) {
			const koreanUnits = ['', '만', '억', '조']
			let han_amount = parseInt(amount.split(',').join(''))
			let answer     = ''
			let unit       = 10000
			let index      = 0
			let division   = Math.pow(unit, index)

			while (Math.floor(han_amount / division) > 0) {
				const mod = Math.floor(han_amount % (division * unit) / division)
				if (mod) {
					const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
					answer = `${modToString}${koreanUnits[index]} ` + answer
				}
				division = Math.pow(unit, ++index)
			}
			return (answer + "원").replace(" 원", "원")
		}
    },
}
</script>