<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표 > 목표등록 > 투자목표
* @ 페이지설명 : 금융과생활 > 나의목표 > 목표등록 > 투자목표 > (투자)Step 1. 정보 입력 (타이틀&금액) 투자목표 상세(등록/상세 공용)
* @ 파일명     : src/views/page/PD/MY/PDMY2040/PDMY2040.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-06-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-03              CS516029                 최초작성
* 2022-07-01              CS528053                 고도화 파일명, UI 변경 및 고도화 개발(PDMY1107.vue -> PDMY1004.vue)
* 2023-08-04              CS533453                 고도화 파일명 변경(PDMY1004.vue -> PDMY2040.vue)
*************************************************************************/
-->

<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">투자목표</h1>
			<a href="javascript:void(0);" class="btn_back" @click.prevent="close()"><span class="blind">이전화면</span></a>
		</div>
		
		<div class="popup_content">
            <div class="com_inner com_line_type01 com_top_type02 pt1">
				<div class="titbox_type01 style_up mt0">
					<strong class="com_pop_tit01">투자목표를 설정하세요.</strong>
				</div>
			</div>

			<div class="com_inner">
				<div class="com_input_type01">
					<input type="text" id="com_input01" class="" name="" v-model="obtnm" ref="obtnm" required placeholder="목표 제목 입력" title="목표 제목 입력" maxlength="40" @keyup="fn_checkWord($event, 40)" @keyup.enter="moveNextTag($event)" @focus="fn_focusOnOff('obtnm')" @input="inputCtr($event)">
					<label for="com_input01"><span class="txt_label_x">목표제목</span></label>
					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2 blur"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2 type02"></span>
					</div>
				</div>
				
				<!-- 계좌선택후 -->
                <template v-if="subList.length > 0">
                    <div class="mt20">
                        <div class="card_list_box custom">
                            <ul class="list_type_01">
                                <li v-for="(acctInfo, index) in subList" :key="index">
                                    <dl>
                                        <dt>
                                            <i class="ico_bank" :class="acctInfo.infOfrmnOrgC"><span class="blind">{{acctInfo.infOfrmnOrgNm}}</span></i>
                                            <div>
                                                <em>{{acctInfo.acWrsnm}}</em>
                                                <span>{{acctInfo.mydtAcno}}</span>
                                            </div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{acctInfo.acNowBac | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                        <div class="com_btn_area" v-if="prgStsCd == '1'"><a href="javascript:void(0);" class="com_btn_round"><span class="btn_plus black" @click="openSlidePopup()">연결계좌 다시 선택</span></a></div>
                    </div>
                </template>
				<!-- //계좌선택후 -->
                <!-- 계좌선택전 -->
                <template v-else>
                    <div class="connect_asset custom">
                        <div class="connect_tit">
                            어떤계좌의 투자목표를 설정하시겠어요?
                        </div>
                        <p>
                            펀드/주식계좌의 평가금액으로 목표를 설정하세요
                        </p>
                        <div class="com_btn_area" v-if="prgStsCd == '1'"><a href="javascript:void(0);" class="com_btn_round"><span class="btn_plus black" @click="openSlidePopup()">연결계좌 선택</span></a></div>
                    </div>
                </template>
				<!-- //계좌선택전 -->

				<div class="price_wrap mg_cl">
					<div class="com_input_type01 com_word2">
						<input type="tel" id="com_input02" class="input_right" name="fncObtAm" value="" ref="fncObtAm" v-model="fncObtAm" required placeholder="얼마를 모을까요" title="목표평가금액 입력" maxlength="8" @keyup="addComma($event)" @keyup.enter="moveNextTag($event)" @focus="fn_focusOnOff('fncObtAm')">
						<label for="com_input02"><span class="txt_label_x">목표금액</span></label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2 blur"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2 style01">만원</span>
						</div>
						<p class="com_sum">{{fn_hanValue(fncObtAm)}}</p>
					</div>
					<div class="btn_price_group">
						<button type="button" class="btn_price" @click.prevent="btnPriceEvt(0)">+<strong>5</strong>만</button>
						<button type="button" class="btn_price" @click.prevent="btnPriceEvt(1)">+<strong>10</strong>만</button>
						<button type="button" class="btn_price" @click.prevent="btnPriceEvt(2)">+<strong>100</strong>만</button>
						<button type="button" class="btn_price" @click.prevent="btnPriceEvt(3)">+<strong>1000</strong>만</button>
					</div>
				</div>
				<div class="com_input_type01" role="button" :aria-label="'필수입력,' + getDateFormat(obtDt, '', '목표기간') + '목표기간 선택'" @click="fn_popupCalendar($event)">
					<input type="text" id="com_input03" class="input_cal_date input_right" name="" value="" v-model="obtDt" data-popup="alert_popup" required readonly placeholder="언제까지 모을까요(최소1개월~10년사이)" title="언제까지 모을까요" aria-hidden="true" @focus="fn_focusOnOff('obtDt')">
					<label for="com_input03"><span class="txt_label_x">목표기간</span></label>
					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2 blur"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2 type02"></span>
					</div>
				</div>
				<!-- 계좌선택후 -->
                <template v-if="subList.length > 0">
                    <div class="com_txt">
                        <strong>{{obtDt | dateFilter('YYYY년 MM월 DD일')}}</strong>까지<br/> 
                        <strong class="num">{{fncObtAmTot | numberFilter}}</strong>원을 모으려면
                        <p>매 월 <strong class="com_point_darkblue">{{dayAm | numberFilter}}원</strong>씩 모으면 가능해요!</p>
                    </div>
                </template>
				<!-- //계좌선택후 -->
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="insertExpensePerpose()">
                    <template v-if="insYn === 'Y'">등록</template>
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
import {keyupNumFormat} from '@/utils/number'
import {monthAdd, monthDiff, dateFormat, isValidDate, dayDiff} from '@/utils/date'
import COCO1124 from '@/views/page/CO/CO/COCO1124/COCO1124'
import _ from 'lodash'
import {checkWord} from '@/utils/data'

export default {
    name : "PDMY2040",
    data: () => {
        return {
            fncObtDsc:"",   // 금융목표구분코드(01:돈모으기 02:투자목표)
            obtnm:"",       // 목표명
            fncObtAm:"",    // 금융목표금액
            obtDt:"",       // 목표일자
            subListIn: [],  // 금융목표(돈모으기) 상세(등록및 수정용-연결계좌목록)
            subList: [],    // 금융목표(돈모으기) 상세(조회용-연결계좌목록)
            insYn: "",      // 등록수정여부 (Y이면 등록)
            sqno:0,         // 순번
            mydtCusno:"",   // 마이테이터고객번호
            accountList:[], // 계좌목록
            prgStsCd:"",    // 상태코드(1:진행중,2:종료)
            fncObtAchvYn:'',
            acNowBacTotAm:0, // 계좌잔액총합
            bacAm:0,        // 남은 금액
            bacDt:'',       // 남은 일자
            dayAm:0,        // 목표까지 매월 금액
            fncObtAmTot:0,  // 목표금액 * 10000원

            // 포커스 on/off Flag
            foc_obtnm    : false,
            foc_fncObtAm : false,
            foc_obtDt    : false,

            today : dateFormat(new Date(), "YYYY-MM-DD"),

            bannerPopYn:""
        }
    },
    mixins: [
        popupMixin
        ,commonMixin
    ],
    mounted() {
        this.initComponent(this.params)
        
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        // 초기화
        initComponent(param) {
            this.mydtCusno = this.getUserInfo('mydtCusno')

            // 계좌목록 조회
            this.getAcctList()

            // 배너호출여부(배너가 팝업에서 위치한경우)
            this.bannerPopYn = this.fn_bannerPopYn() || ''

            if(typeof param.fncObtDsc === "undefined") {
                this.fncObtDsc = "02"
                this.obtnm = ""
                this.fncObtAm = ""
                this.sqno = 0
                this.obtDt = ""
                this.subListIn = []
                this.insYn = "Y" // 등록
                this.prgStsCd = "1" // 진행중
            } else {
                this.insYn = "N" // 수정
                this.fncObtDsc = param.fncObtDsc
                this.sqno = param.sqno
                this.prgStsCd = param.prgStsCd

                // 상세조회
                this.getData()
            }
        },
        // 계좌 목록 조회
        getAcctList() {
            const config = {
                url : "/co/co/07r01",
                data : {
                    mydtCusno   : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
                    bnkAcDsc    : '21',                             // 은행계좌구분코드 (11:나의목표_수신상품, 21:나의목표_투자상품, 10 : 수신상품, 20 : 투자상품, 32: 담보대출(부동산) , 35: 할부금융(자동차)) 
                }
            }

            apiService.call(config).then(response => {
                this.accountList = response.accountList || []
            })
        },
        // 배너에서 호출했는지 여부
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
        // 금융목표(투자목표) 상세조회
        getData() {
            const config = {
                url: '/pd/my/40r01',
                data: {
                        //"mydtCusno": "00000000000000000003" /* 마이데이터고객번호 */
                        "mydtCusno": this.mydtCusno // 마이데이터고객번호
                        ,"fncObtDsc" : this.fncObtDsc
                        ,"sqno" : this.sqno
                    }
            };
            
            apiService.call(config).then(response => {
                this.respInfo = response;

                this.obtnm    = this.respInfo.obtnm
                this.fncObtAm = keyupNumFormat(this.respInfo.fncObtAm / 10000)
                this.obtDt    = dateFormat(this.respInfo.obtDt, 'YYYY-MM-DD')
                this.fncObtAchvYn = this.respInfo.fncObtAchvYn
                this.subList  = this.respInfo.subList || []
                this.acNowBacTotAm = _.sumBy(this.subList, item => {return item.acNowBac }) // 계좌현재잔액총액
            });
        },
        // 콤마 추가
        addComma(event = "") {
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

            // 계좌 남은 금액 및 기간 계산
            this.bacAmCalc();
        },
        // 슬라이드팝업 오픈(연결계좌 팝업)
        openSlidePopup() {
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
                        inputInfo.checked = this.setAcctCheckedInfo(acctInfo.mydtAcno)
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
                    cdata : {
                        "title":'계좌연결',
                        "contentList":[{
                            'contentGubn':'01', 
                            'contentTitle':'계좌연결',
                            'contentData':acctPopList,
                        }],
                        "purposeYn":"Y",                            /* 화면구분(금융생활-목표등록) */
                        "fncObtAm": this.fncObtAm.replace(/[,.-]/g, '') * 10000 || 0 /* 목표금액 */
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
                            inputObj.mydtCusno = this.mydtCusno
                            inputObj.fncObtDsc = this.fncObtDsc               // 금융목표(투자목표)
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
                this.bacAmCalc();   // 계좌 남은 금액 및 기간 계산
            })
        },
        setAcctCheckedInfo(mydtAcno) {
            // 계좌번호
            let acctInfo = _.find(this.subList, {"mydtAcno":mydtAcno})
            // let acctInfo = _.find(this.subList, {"mydtAcno":mydtAcno, "mydtScNo":mydtScNo})
            if(typeof acctInfo !== 'undefined') {
                return true
            } else {
                return false
            }
        },
        // 글자수 체크
        fn_checkWord(event, maxByte) {
            let rtnObj = checkWord(event.target.value, maxByte)

            if(rtnObj.flag) {this.$refs.obtnm.blur()}   // 알럿 중복 방지

            event.target.value = rtnObj.value
            this.obtnm = event.target.value
        },
        // input 클릭 시 focus 관련
        fn_focusOnOff(type) {
            switch(type) {
                case 'obtnm':
                    this.foc_obtnm    = true
                    this.foc_fncObtAm = false
                    this.foc_obtDt    = false
                    break
                case 'fncObtAm':
                    this.foc_obtnm    = false
                    this.foc_fncObtAm = true
                    this.foc_obtDt    = false
                    break
                case 'obtDt':
                    this.foc_obtnm    = false
                    this.foc_fncObtAm = false
                    this.foc_obtDt    = true
                    break
            }
        },
        fn_popupCalendar(evt) {
            let tmpDt = ""
            let minDate = ''
            let maxDate = ''

            if(this.insYn == 'Y') {
                if(this.obtDt !== undefined && this.obtDt !== null && this.obtDt !== '') {
                    tmpDt = dateFormat(this.obtDt, 'YYYY-MM-DD')
                } else {
                    tmpDt = dateFormat(monthAdd(1), 'YYYY-MM-DD')
                } 
                minDate = dateFormat(monthAdd(1), 'YYYY-MM-DD')
                maxDate = dateFormat(monthAdd(120), 'YYYY-MM-DD')
            } else {
                tmpDt = dateFormat(this.obtDt, 'YYYY-MM-DD')
                minDate = dateFormat(monthAdd(1), 'YYYY-MM-DD')
                maxDate = dateFormat(monthAdd(120), 'YYYY-MM-DD')
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
                }
                this.bacAmCalc();
            })
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
        },
        // 등록 유효성 체크
        insertExpensePerpose() {
            // validation 체크
            if(this.obtnm.trim().length == 0 || this.obtnm.trim() == "") {
                modalService.alert("목표제목은 필수입력항목입니다.").then(() => {});
                return;
            }

            if(this.fncObtAm.length == 0 || this.fncObtAm == 0) {
                modalService.alert("목표금액은 필수입력항목입니다.").then(() => {});
                return;
            }

            if(this.obtDt.length == 0 || this.obtDt == "") {
                modalService.alert("목표일자는 필수입력항목입니다.").then(() => {});
                return;
            }

            if(!isValidDate(this.obtDt.replace(/[,.-]/g, ''))) {
                modalService.alert("목표일자의 날짜형식을 확인바랍니다.").then(() => {});
                return;
            }

            if(Number(dateFormat(new Date, 'YYYYMMDD')) >= Number(dateFormat(this.obtDt, 'YYYYMMDD'))) {
                modalService.alert("목표일자를 현재날짜 이후로 입력바랍니다.").then(() => {});
                return;
            }

            if(monthDiff(dateFormat(dateFormat(this.obtDt.replace(/[,.-]/g, ''), 'YYYYMMDD'), 'YYYYMMDD'), dateFormat(new Date, 'YYYYMMDD')) < 1 ||
                monthDiff(dateFormat(dateFormat(this.obtDt.replace(/[,.-]/g, ''), 'YYYYMMDD'), 'YYYYMMDD'), dateFormat(new Date, 'YYYYMMDD')) > (12 * 10)) {
                modalService.alert("목표기간을 현재년월 이후 최소 1개월 ~ 10년 사이로 입력바랍니다.").then(() => {});
                return;
            }

            this.subListIn = []
            var inputFncObtAm = Number(this.fncObtAm.replace(/[,.-]/g, '')) * 10000

            // 연결계좌를 선택했을 경우
            if(this.subList.length > 0) {
                if(this.acNowBacTotAm >= inputFncObtAm) {
                    modalService.alert("계좌 잔액이 목표 금액을 초과하였습니다.<BR>연결계좌를 다시 선택하세요").then(() => {});
                    return;
                }
            }

            // 등록 연결계좌내역 삽입
            this.subListIn = this.subList

            // 등록
            var bxiUrl
            let alertMsg
            if(this.insYn == "Y") {
                bxiUrl = '/pd/my/40s01'
                alertMsg = '금융목표를 등록하시겠습니까?'
            } 
            // 수정
            else {
                bxiUrl = '/pd/my/40u01'
                alertMsg = '금융목표를 수정하시겠습니까?'
            }
            
            const configConfirm = {
                content: [alertMsg],
                title  : "",
            }

            modalService.confirm(configConfirm).then(text => {
                if(text == "예") {

                    const config = {
                        url: bxiUrl,
                        //data: {"mydtCusno": this.getUserInfo('asetAmnCusno')} // 마이데이터고객번호

                        data: {//"mydtCusno": "00000000000000000003"
                            "mydtCusno": this.mydtCusno // 마이데이터고객번호
                            ,"fncObtDsc" : this.fncObtDsc
                            ,"sqno": this.sqno
                            ,"obtnm" : this.obtnm.trim()
                            ,"fncObtAm" : inputFncObtAm
                            ,"obtDt" : this.obtDt.replace(/[,.-]/g, '')
                            ,"prgStsCd" : this.prgStsCd // 진행상태코드 0:전체, 1:진행중, 2:종료
                            ,"fncObtAchvYn" : this.fncObtAchvYn
                            ,"subListIn" : this.subListIn
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
        // 금액 버튼 이벤트
        btnPriceEvt(btnDsc) {
            let tmpFncObtAm = Number(this.fncObtAm.replace(/[,.-]/g, ''));

            if(btnDsc == 0) {           // +5만 버튼
                tmpFncObtAm += 5;
            } else if(btnDsc == 1) {    // +10만 버튼
                tmpFncObtAm += 10;
            } else if(btnDsc == 2) {    // +100만 버튼
                tmpFncObtAm += 100;
            } else if(btnDsc == 3) {    // +1000만 버튼
                tmpFncObtAm += 1000;
            }

            // 최대금액 9,999,999 이상인 경우 최대값 고정
            if(tmpFncObtAm >= 9999999) {
                tmpFncObtAm = 9999999;
            }

            this.fncObtAm = String(tmpFncObtAm);
            this.addComma();
        },
        // 계좌 남은 금액 및 기간 계산
        bacAmCalc() {
            // 목표금액이나 목표기간 없으면 리턴
            if(this.fncObtAm == 0 || this.fncObtAm == null)
                return;

            this.fncObtAmTot = Number(this.fncObtAm.replace(/[,.-]/g, '')) * 10000;    // 목표금액 총금액

            this.bacAm = this.fncObtAmTot - this.acNowBacTotAm; // 남은금액
            this.bacDt = Number(dayDiff(dateFormat(this.obtDt, 'YYYYMMDD'), this.curDt) + 1); // 남은일자
            
            // 남은기간이 30일 이하일경우에는 남은금액으로 노출
            if(this.bacDt > 30) {
                this.dayAm = this.bacAm / (this.bacDt / 30);
            } else {
                this.dayAm = this.bacAm;
            }

            // 남은 잔액이 0미만인 경우
            if(this.dayAm < 0) {
                this.dayAm = 0;
            }
        },
        // 날짜 구분자 추가
        getDateFormat(value, format, dscTxt='') {
            if(value == '' || value == null)
                return '';

            const year = value.substring(0, 4);
            const month = value.substring(4, 6);
            const day = value.substring(6);
            let result = year + format + month + format + day;

            // 장차법 관련 aria-label 텍스트 리턴
            if(dscTxt != '') {
                result = dscTxt + ' ' + year + '년 ' + month + '월 ' + day + '일,'
            }
            
            return result;
        },
        // 목표명 입력값 제어
        inputCtr(e) {
            const inputStr = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\s_~!@#$%^&*()\-–—+=;,.<>\[\]{}|?\\/]/g
			this.obtnm = e.target.value.replace(inputStr, '')
        }
    }
}
</script>