<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 목표관리 > 목표등록 > 버킷리스트 > 내집마련 목표등록
* @ 페이지설명 : 날짜설정
* @ 파일명     : src\views\page\PD\MY\PDMY2023\PDMY2023.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-08-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-10              CS515731              최초작성
* 2023-08-04              CS533453              고도화 파일명, UI 변경 및 고도화 개발(PDMY1112.vue -> PDMY2023.vue)
*************************************************************************/
-->
<template>
	<div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>버킷리스트</h1>
		</div>
		<div class="popup_content com_bg_type00">
			<div class="com_inner">
				<strong class="titH1">꿈에 그리던 내 집 마련!</strong>

				<div class="com_inputarea_type01">					
					<div class="com_input_type01">
						<input type="text" ref="obtnm" v-model="obtnm" placeholder="목표 제목 입력" title="목표 제목">
						<label for="obtnm"><span class="txt_label_x">목표 제목</span></label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2"><span class="blind">삭제</span></a>
						</div>
					</div>

					<!-- 동/단지 명으로 아파트 찾기 -->
					<div class="com_input_type01">
						<label for="PDMY2023_txt01"></label>
						<input type="search" id="PDMY2023_txt01" :value="PDMY2023_srchKwrd" ref="PDMY2023_srchKwrd" @keyup="fn_checkWord($event, 40)" @keyup.enter="fn_openAddrSrch" @keyup.delete="fn_infoClear" placeholder="동/단지 명으로 아파트 찾기" title="동/단지 명으로 아파트 찾기">
						<a class="com_btn_delete" v-show="PDMY2023_srchKwrd.length>0" @click.prevent="del('PDMY2023_srchKwrd')" href="javascript:void(0);"><span class="blind">삭제</span></a>
						<a class="com_btn_search" @click.prevent="fn_openAddrSrch" ref="openAddrSrch" href="javascript:void(0);"><span class="blind">검색</span></a>
					</div>
					<!-- //동/단지 명으로 아파트 찾기 -->

					<!-- 면적 선택 -->
					<div class="com_btnselectbox_type01">
						<button type="button" class="com_btnselect_type01" id="PDMY2023_txt01_com_input01" ref="newPytpAreaCntn" @click.prevent="fn_openRlestAreaPop" title="평형선택"><span>{{aptHscxIdvdc===''?"평형선택":(newPytpAreaCntn + '㎡')}}</span></button>
					</div>
					<!-- //면적 선택 -->

					<!-- 시세 -->
					<div class="cost_wrap">
						<div class="list_gray_box">
							<div class="market_price" v-html="fn_numberFormatKorAmt">
								<!-- 
									<strong>시세 8억 5,250만원</strong>
									<p>(시세 출처 한국부동산원)</p>
								-->
							</div>
						</div>
					</div>
					<!-- //시세 -->

					<!-- 목표금액 -->
					<div class="com_input_type01 com_word2">
						<input type="tel" required class="input_right" ref="fncObtAm" v-model="fncObtAm" maxlength="8" @keyup="addComma($event)" @focus="fn_focusOnOff('fncObtAm')" @blur="fn_setBacAm" title="목표금액">
						<label for="fncObtAm"><span class="txt_label_x">목표금액</span></label>
						<!-- <a class="com_btnwrite" @click.prevent="fn_modifyFncObtAm()" href="javascript:void(0);"></a> -->
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2 blur"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">만원</span>
						</div>
						<div class="infoBox">
							<p class="com_sum" v-if="fncObtAm">{{fn_hanValue(fncObtAm)}}</p>
						</div>
					</div>
					<!--// 목표금액 -->

					<!-- 언제까지 모을까요 -->
					<div class="com_input_type01 readonly_ph" role="button" :aria-label="'필수입력, 최소6개월~20년사이, 목표기간 '+obtDtLabel+', 목표기간 선택'" @click="fn_popupCalendar($event)">
						<input type="text" class="input_cal_date input_right focusforce" ref="obtDt" v-model="obtDt" required readonly placeholder="언제까지 모을까요(최소6개월~20년사이)" title="언제까지 모을까요" aria-hidden="true" @focus="fn_focusOnOff('obtDt_on')" @blur="fn_focusOnOff('obtDt_off')"><div class="lineEF"></div>
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
						<a @click="openSlidePagePopupWithComponent" class="com_btnround_type02" href="javascript:void(0);">
							<span class="btn_plus">
								<template v-if="subList.length > 0">연결계좌 다시 선택</template>
								<template v-else>연결계좌 선택</template>
							</span>
						</a>
					</div>

					<!-- 계좌선택시 -->
					<div class="mygoal_sub_text mt30">
						<p class="point_line" v-if="subList.length > 0 && bacAm > 0 && remove(fncObtAm) > 0" v-html="fn_numberFormatKorAmt2"></p>
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
	<!--// full popup E -->
</template>

<script>

import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import {keyupNumFormat, numberFormat} from '@/utils/number'
import {checkWord} from '@/utils/data'
import {monthAdd, dateFormat, monthDiff, isValidDate} from '@/utils/date'
import CORE1203 from '@/views/page/CO/RE/CORE1203/CORE1203'
import COCO1124 from '@/views/page/CO/CO/COCO1124/COCO1124'
import PDMY2045 from '@/views/page/PD/MY/PDMY2045/PDMY2045'		// 아파트 등록
import _ from 'lodash'

export default {
    name : "PDMY2023",
    data: () => {
		return {
			mydtCusno           : '',   //마이데이터고객번호
            fncObtDsc           : '',   //금융목표구분코드 필수(03:내집마련)
            sqno                : '',   //일련번호(상세조회시 필수)
			lschgDtm            : '',   //최종변경일시
			aptNm				: '',	//아파트명
			aptHscxIdvdc        : '',   //아파트단지개별코드
			genDlAm				: '',	//아파트시세
            newPytpAreaCntn     : '',   //신평형면적내용
            fncObtAm            : 0,    //금융목표금액
            obtDt               : '',   //목표일자
            rgDt                : '',   //등록일자
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

			PDMY2023_srchKwrd	: '',	//아파트 검색어
			fncObtAchvYn:'', // 목표달성여부

			foc_fncObtAm : false, // 목표금액 focus YN
			foc_obtDt    : false, // 목표기간 focus YN
			dis_fncObtAm : true,  // 목표금액 disabled여부
			obtDtLabel        : "",     // 선택한 날짜의 라벨

			today : dateFormat(new Date(), "YYYY-MM-DD"),

			bannerPopYn:"",
			obtnm:""
        }
    },
    computed : {
		fn_numberFormatKorAmt() {

			if (this.aptHscxIdvdc === '')
			{
				return '아파트 검색을 해주시기 바랍니다.'
			}
			// <strong>시세 8억 5,250만원</strong><p>(시세 출처 한국부동산원)</p>

			const unit = ['', '만', '억', '조', '경']
			const splitAmt = 10000
			const splitCnt = unit.length

			let resultArray = []
			let resultString = ""

			for(let i = 0; i < splitCnt; i++){
				let rst = (this.genDlAm % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
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
					resultString = ' '+String(numberFormat(resultArray[j])) + unit[j] + '원' + resultString
				} else {
					resultString = ' '+String(numberFormat(resultArray[j])) + unit[j] + ' ' + resultString
				}
			}

			return '<strong>시세 ' + resultString + '</strong><p>(시세 출처 한국부동산원)</p>'
		},

		fn_numberFormatKorAmt2() {

			const unit = ['', '만', '억', '조', '경']
			const splitAmt = 10000
			const splitCnt = unit.length

			let resultArray = []
			let resultString = ""

			if (this.bacAm === '' || this.bacAm === 0)
			{
				return ''
			}

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
    methods: {
		initComponent(params) {

			// 계좌목록 조회
			this.getAcctList()

			this.mydtCusno = this.getUserInfo("mydtCusno")

			// 배너호출여부(배너가 팝업에서 위치한경우)
			this.bannerPopYn = this.fn_bannerPopYn() || ''

			if (params !== undefined && params !== null 
				&& params.fncObtDsc !==undefined && params.fncObtDsc !== null && params.fncObtDsc === '03' 
				&& params.sqno !==undefined && params.sqno !== null && params.sqno !== '')
			{
				this.insYn = "U" // 수정
				this.fncObtDsc = params.fncObtDsc
				this.sqno = params.sqno
				this.prgStsCd = params.prgStsCd

				this.getData()
			}
			else
			{
				this.fncObtDsc = "03"
				this.fncObtAm = ""
				this.sqno = 0
				this.obtDt = ""
				this.subListIn = []
				this.insYn = "C" // 등록
				this.prgStsCd = "1" // 진행중

				//신규등록처리를 위한 주소 검색 팝업 호출
				//this.fn_openAddrSrch()
				this.$refs.openAddrSrch.click()
			}
		},
		getData() {

			const config = {
				url: '/pd/my/29r01',		// /pd/my/17r01
				data: {
						//"mydtCusno": "00000000000000000003" /* 마이데이터고객번호 */
						"mydtCusno": this.mydtCusno // 마이데이터고객번호
						,"fncObtDsc" : this.fncObtDsc
						,"sqno" : this.sqno
					}
			};
			
			apiService.call(config).then(response => {

				this.respInfo = response;

				this.obtnm    		 = this.respInfo.obtnm
				this.aptHscxIdvdc    = this.respInfo.aptHscxIdvdc
				this.fncObtAm = keyupNumFormat(this.respInfo.fncObtAm / 10000)
				this.aptHcxnm = this.respInfo.aptHcxnm
				this.PDMY2023_srchKwrd = this.respInfo.aptHcxnm
				this.newPytpAreaCntn = this.respInfo.newPytpAreaCntn
				this.genDlAm = this.respInfo.genDlAm * 10000
				this.obtDt = dateFormat(this.respInfo.obtDt, 'YYYY-MM-DD')
				this.obtDtLabel = dateFormat(this.respInfo.obtDt, "YYYY년 MM월 DD일")
				this.subList  = this.respInfo.subList || []
				this.fncObtAchvYn = this.respInfo.fncObtAchvYn

				this.acNowBacTotAm = _.sumBy(this.subList, item => {return item.acNowBac }) // 계좌현재잔액총액
				this.bacAm = (this.remove(this.fncObtAm) * 10000) - this.acNowBacTotAm
			});
		},
		// 주소 검색 팝업오픈
        fn_openAddrSrch() {

			let param = {
				//srchKwrd : this.PDMY2023_srchKwrd || this.$refs.PDMY2023_srchKwrd.value,
				srchKwrd : this.$refs.PDMY2023_srchKwrd.value,
            }
            const config = {
                component: PDMY2045,
                params : param
            }
            modalService.openPopup(config).then(response => {

				this.aptNm          	= response.aptNm
				this.PDMY2023_srchKwrd	= response.aptNm

                this.aptHscxIdvdc   = response.aptHscxIdvdc
                this.isAptSrch      = true

                // 면적, 주거형태 초기화
                // this.newPytpAreaCntn    = ""
                // this.rlestRsdFormDsc    = ""
                // this.rlestRsdFormDscNm  = ""
				this.newPytpAreaCntn = response.newPytpAreaCntn
				
				//아파트시세 확인
				this.fn_apt_genDlAm()
            })
		},
		// 검색 텍스트 삭제
		del(type) {

			if(type === 'PDMY2023_srchKwrd') {
				this.aptNm				= ''
				this.aptHscxIdvdc		= ''
				this.PDMY2023_srchKwrd	= ''
				this.genDlAm			= '' // 아파트시세
				this.newPytpAreaCntn 	= '' // 신평형면적내용
				this.fncObtAm           = ''
				this.bacAm = 0
				this.dis_fncObtAm = true
				this.foc_fncObtAm = false
			} else if(type === 'fncObtAm') {
				this.fncObtAm = ''
			} else if(type === 'obtDt') {
				this.obtDt = ''
			}
		},
		//시세검색
		fn_apt_genDlAm(){
			const config = {
				url : "/co/re/05r01",
				data : {
					mydtCusno   	: this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
					aptHscxIdvdc    : this.aptHscxIdvdc,
					newPytpAreaCntn : this.newPytpAreaCntn,
				}
			}
			apiService.call(config).then(response => {

				this.dis_fncObtAm = true
				this.foc_fncObtAm = false

				if (response.genDlAm !== undefined && response.genDlAm !== null && response.genDlAm > 0)
				{
					this.genDlAm = response.genDlAm * 10000 //부동산 단위는 만단위
					this.bacAm = this.genDlAm - this.acNowBacTotAm
					this.fncObtAm = keyupNumFormat(response.genDlAm)

				}else{
					this.genDlAm = ''
					this.fncObtAm = ''
					this.bacAm = 0
				}
				
			})
		},
		// 면적 선택 레이어 팝업 오픈
		fn_openRlestAreaPop() {

			if(this.aptHscxIdvdc === '')
			{
				this.fn_openAddrSrch()
			}
			else
			{
				let rlestInfo = []
				// 면적 리스트
				const config0 = {
					url : "/co/re/03r01",
					data : {
						mydtCusno   : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
						aptHscxIdvdc : this.aptHscxIdvdc
					}
				}
				apiService.call(config0).then(response => {
					
					if(response.prcCn > 0) {
						for(let i=0; i<response.prcCn; i++) {
							rlestInfo.push({rlestHscxIdNo : i, newPytpAreaCntn : response.pytpAreaList[i].newPytpAreaCntn})
						}
					}
					
					const config1 = {
						params : {
							rlestInfo : rlestInfo,
							selArea : this.newPytpAreaCntn,
						},
						renderer : {
							component : CORE1203
						}
					}
					modalService.openSlidePagePopup(config1).then(response => {
						if (response.newPytpAreaCntn!== undefined && response.newPytpAreaCntn!== null && response.newPytpAreaCntn !== '' && response.newPytpAreaCntn !== this.newPytpAreaCntn){
							this.newPytpAreaCntn = response.newPytpAreaCntn

							//가격재 조정
							this.fn_apt_genDlAm()
						}
					})
				})
			}
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
							"fncObtAm": this.remove(this.fncObtAm) * 10000 || 0 /* 목표금액 */
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
				this.bacAm = (this.remove(this.fncObtAm) * 10000) - this.acNowBacTotAm
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
			if(this.aptHscxIdvdc.length == 0 || this.aptHscxIdvdc == '') {
				modalService.alert("아파트명은 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.newPytpAreaCntn.length == 0 || this.newPytpAreaCntn == '') {
				modalService.alert("아파트평형은 필수입력항목입니다.").then(() => {});
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

			if(Number(dateFormat(new Date, 'YYYYMMDD')) >= Number(dateFormat(this.obtDt, 'YYYYMMDD'))) {
				modalService.alert("목표기간을 현재년월 이후로 입력바랍니다.").then(() => {});
				return;
			}

			if(monthDiff(dateFormat(dateFormat(this.remove(this.obtDt), 'YYYYMMDD'), 'YYYYMMDD'), dateFormat(new Date, 'YYYYMMDD')) < 6 ||
				monthDiff(dateFormat(dateFormat(this.remove(this.obtDt), 'YYYYMMDD'), 'YYYYMMDD'), dateFormat(new Date, 'YYYYMMDD')) > (12 * 20)) {
				modalService.alert("목표기간을 현재년월 이후 최소 6개월 ~ 20년 사이로 입력바랍니다.").then(() => {});
				return;
			}

			this.subListIn = []
			var inputFncObtAm = Number(this.remove(this.fncObtAm)) * 10000

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
				alertMsg = '내집마련 목표를 등록하시겠습니까?'
			} 
			// 수정
			else {
				alertMsg = '내집마련 목표를 수정하시겠습니까?'
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
						url: '/pd/my/23s01',		// /pd/my/12s01

						data: {"trDsc":this.insYn
								,"mydtCusno": this.mydtCusno // 마이데이터고객번호
								,"fncObtDsc" : this.fncObtDsc
								,"sqno": this.sqno
								,"aptHscxIdvdc" : this.aptHscxIdvdc
								,"newPytpAreaCntn":this.newPytpAreaCntn
								,"fncObtAm" : inputFncObtAm
								,"obtDt" : this.remove(this.obtDt)
								,"prgStsCd" : this.prgStsCd // 진행상태코드 0:전체, 1:진행중, 2:종료
								,"subListIn" : this.subListIn
								,"fncObtAchvYn":this.fncObtAchvYn
								,"obtnm":this.obtnm.trim()
								,"rgDt": this.rgDt
								}

								
					};
					
					apiService.call(config).then(response => {

						if(response.rspCd == '0000'){
							modalService.alert("저장되었습니다.").then(() => {
								// 전체페이지 닫기
								if(this.bannerPopYn == "Y") {
									this.closeAllLeftMain('reSelect')
								} else {
									// this.closeAllData('reSelect')
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
		// 아파트명 삭제시 정보clear
		fn_infoClear() {
			this.aptNm				= ''
			this.aptHscxIdvdc		= ''
			this.genDlAm			= '' // 아파트시세
			this.newPytpAreaCntn 	= '' // 신평형면적내용
			this.fncObtAm           = ''
			this.bacAm = 0
			this.dis_fncObtAm = true
			this.foc_fncObtAm = false
		},
		fn_setBacAm() {
			if(this.fncObtAm.length == 1 && this.fncObtAm == 0) {
				this.bacAm = 0
			} else {
				this.bacAm = (this.remove(this.fncObtAm) * 10000) - this.acNowBacTotAm
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
			let han_amount = parseInt(amount.split(',').join('')) * 10000 // 만원 단위 화면
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
    mounted() {
		this.initComponent(this.params)
		
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    created() {

    },
    components: {      

    }

}
</script>