<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 기타
* @ 페이지설명 : 자산등록 > 기타 > step 1. 금 정보입력
* @ 파일명     : src/views/page/CO/OA/COOA2004/COOA2004.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-17
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-17              CS515897              최초작성
* 2022-07-19              CS528205              고도화 파일명, UI 변경 및 고도화 개발(COOA1104.vue -> COOA2004.vue)
* 2025-03-10              CS541015              상호금융 NH콕마이데이터 4.0 추진 개발 (COOA2004 → COOA4004)
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>금</h1>
            <!-- <a href="javascript:void(0);" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>	 -->
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_top_type02">
                <strong class="com_pop_tit01" v-if="goldKdnm !== '백금'">보유한 {{goldKdnm}} 금 정보를 입력하세요.</strong>
                <strong class="com_pop_tit01" v-else>보유한 {{goldKdnm}} 정보를 입력하세요.</strong>
            </div>
            <div class="com_inner">
				<div class="com_inputarea_type07">
					<div class="com_input_type01">
						<input type="text" id="com_input00" :class="astnm.length > 0 && foc_byulching? 'focusON focusforce':''" required="" placeholder="별칭 입력" title="별칭을 입력하세요." v-model="astnm" @focus="fn_focusOnOff('astnm')" @keyup="moveNextTag($event), fn_checkWord($event, 30), fn_setVisible('astnm')" ref="astnm">
						<label for="com_input00">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">별칭</span>
						</label>
                        
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" v-show="astnm.length > 0" @click.prevent="del('astnm')"><span class="blind">삭제</span></a>
						</div>
					</div>

					<div class="com_tabmenu_type03 custom_tab" v-show="vis_selGold || isUpt">
                        <ul role="tablist">
                            <li v-for="(item, idx) in goldUntDscList" role="presentation" :aria-controls="'tab_0'+item.comnCVal" :class="item.comnCVal===goldUntDsc ? 'on':''" :key="'goldDsc_'+idx" @click.prevent="fn_untSelect(item)">
                                <a href="javascript:void(0);"><span>{{item.comnCExpl === '그램' ? item.comnCExpl + '(g)' : item.comnCExpl}}</span></a>
                            </li>
                        </ul>
					</div>
					<div class="tab_wrap" v-if="vis_asetQt || isUpt">
                        <div v-for="(item, idx) in goldUntDscList" role="tabpanel" :id="'tab_0'+item.comnCVal" :class="'cmm-tab-panel' + (item.comnCVal===goldUntDsc ? ' on' : '')" :key="'goldDsc_'+idx">
                            <div class="com_input_type01 com_word1 necessary">
                                <input type="tel" :id="'com_input0'+item.comnCVal" :class="asetQt.length > 0 && foc_asetQt? 'focusON focusforce':''" required="" placeholder="보유중량 입력" title="보유중량을 입력하세요." maxlength="13" v-model="asetQt" @focus="fn_focusOnOff('asetQt')" @keyup="calculateVal($event), moveNextTag($event)" ref="asetQt">
								<label :for="'com_input0'+item.comnCVal">
									<em><span class="blind">필수입력</span></em>
									<span class="txt_label_x">보유중량</span>
								</label>
                                <div class="del_txt">
                                    <a href="javascript:void(0);" class="com_btn_delete2" v-show="asetQt.length > 0" @click.prevent="del('asetQt')"><span class="blind">삭제</span></a>
                                    <span class="com_inputtxtright2">{{goldUntDsc == '2' ? '돈' : 'g'}}</span>
                                </div>
                                <span class="com_changevalue" v-if="item.comnCVal == '2'">
                                    {{asetQt.split(",").join("") * 3.75 | numberFilter('0,0.00', {'precision' : 2})}} g
                                </span>
                                <!-- [v4.0] 25-02-26 면책조항 툴팁 추가 -->
								<div class="com_sum" v-show="showHanAmt">
									<span v-html="convertAmt"></span>
									<div class="custom_tooltip">
										<div class="com_tooltip_type02 com_tooltip_type03">
											<a href="javascript:void(0);" class="com_btn_info" role="button">
												<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
											</a>
											<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
												<div>
													<div class="disclaimer_list">
														<strong class="h_tit03">면책조항</strong>
														<ul class="bl_dot_list">
															<li>농업협동조합중앙회가 제공하는 금시세정보는 금거래소의 정보를 토대로 제공되는 투자 참고 사항이며 오류가 발생하거나 지연될 수 있습니다.</li>
															<li>제공된 정보에 의한 투자 결과에 법적 책임을 지지 않습니다.</li>
															<li>실물 구입 시 부가가치세 10%가 부과될 수 있습니다.</li>
														</ul>
													</div>
													<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
												</div> 
											</div>
										</div>
									</div>
								</div>
								<!-- //[v4.0] 25-02-26 면책조항 툴팁 추가 -->
                                <div class="btn_price_group">
                                    <button v-for="(subItem, subIdx) in goldIncAsetQtList" type="button" class="btn_price" :key="'goldN_'+subIdx" @click.prevent="increaseAsetQt(subItem)">+<strong>{{subItem}}</strong></button>
                                </div>
                            </div>
                        </div>
					</div>
				</div>
			</div>
		</div>
        
        <a href="javascript:void(0);" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>	
	
        <p class="dot_msg mt_auto">
            <template v-if="asetQt.length > 0">
                {{goldMprBasDt}} 기준 시세 환산 금액 입니다.
            </template>
            <template v-else>
                {{goldMprBasDt}} 기준 {{goldUntDsc == '1' ? '1g' : (goldUntDsc == '2' ? '3.75g' : '')}} 시세 입니다.
            </template>
        </p>

        <!-- footer S -->
		<div class="bottom_box">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" @click.prevent="resistGold($event)">{{!isUpt?"등록":"수정"}}</a>
			</div>
        </div>
        <!--// footer E -->
    </div>
</template>
<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import {roundNumberWithDot, numberFormat, numberFormatAuto} from '@/utils/number'
import {dateFormat} from '@/utils/date'
import {checkWord} from '@/utils/data'

import COCO2201 from '@/views/page/CO/CO/COCO2201/COCO2201'

export default {
    name : "COOA4004",
    data: () => {
        return {
            // 골드카테고리 데이터
            goldUntDscList  : [],
            goldIncAsetQtList     : [], // 현물자산 수량 증가 단위
            goldUntDsc      : "",   // 선택된 현물자산단위구분코드 1:그램, 2:돈
            goldUntDscNm    : "",   // 선택된 현물자산단위구분명
            goldKdc         : "",   // 금종류코드(순도)
            goldKdnm        : "",   // 선택된 금종류명
            goldMpr         : "",   // 선택된 금종류의 한돈 가격
            goldMprBasDt    : "",   // 금시세기준일자
            asetAm          : "",   // 자산금액
            asetQt          : "",   // 자산수량
            astnm           : "",   // 자산별칭

            // 사용자등록데이터(금)
            gldAstList : [],
            sqno       : "",

            popId : "",     // 부모창에서 띄운 팝업창id(추가등록용)
            isUpt : false,  // 수정으로 넘어왔는지 확인하기위한 파라미터

            // 다음 단계 태그 visible 처리
            vis_selGold : false,
            vis_asetQt  : false,

            // 포커스 시 'x'버튼 visible 처리
            foc_byulching   : false,
            foc_asetQt      : false,
        }
    },
    computed: {
        btnOnOff() {
            return (this.astnm == "" || this.asetQt == "" || this.asetQt == "0" || (this.asetQt.indexOf(".") == (this.asetQt.length-1))) ? "btn_off" : ""
        },
        convertAmt() {
            let returnString

            if(this.asetQt === "") {
                returnString = '<span class="com_number_dot">' + this.fn_hanValue(this.asetAm) + '</span>'
            } else {
                returnString = this.fn_hanValue(this.asetAm)
            }

            return returnString
        },
        showHanAmt() {
            return this.asetQt != "" && this.asetQt != "0" && this.asetQt != "0." && this.asetQt != "0.0"
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

        setTimeout(() => {
            this.$refs.astnm.focus()
        }, 100)
    },
    methods: {
        // 화면 초기화
        initComponent(param = {}) {
            this.goldUntDscList = this.getCodeList("GOLD_UNT_DSC") || []
            this.isUpt = param.isUpt || false
            this.popId = param.popId

            if(this.isUpt) {    // 수정
                let basDt    = param.goldMprBasDt || ""
                this.goldMprBasDt   = (basDt !== "" && basDt !== null) ? dateFormat(basDt, "YYYY년 MM월 DD일") : ""
                this.sqno       = param.sqno || ""
                this.goldUntDsc = param.goldUntDsc || ""
        
                for (let i = 0; i < this.goldUntDscList.length; i++) {
                    let dsc = this.goldUntDscList[i]
                    if (dsc.comnCVal === this.goldUntDsc) {
                        this.setupGoldArr(dsc)
                        break;
                    }
                }

                this.asetQt     = numberFormatAuto(param.goldAsetQt, '0,00.00', {precision: 2}, false) || ""
                this.astnm      = param.astnm || ""
                this.goldKdc    = param.goldKdc || ""
                this.goldKdnm   = param.goldKdnm || ""
                this.goldMpr    = param.goldMpr || ""

                this.calculateVal()

                this.$refs.astnm.focus()    // 수정으로 넘어올시 별칭 포커스
            } else {            // 등록
                let goldData = param.goldData || {}

                this.goldKdc        = goldData.goldKdc || ""    // 금 종류 코드
                this.goldKdnm       = goldData.goldKdnm || ""   // 금 종류명
                this.goldMpr        = goldData.goldPucMpr || ""    // 금 시세
            }
        },
        // 단위선택
        fn_untSelect(item) {
            this.goldUntDsc = item.comnCVal
            this.goldUntDscnm = item.comnCExpl
            this.setupGoldArr(item);

            // 단위 변경시 보유중량 초기화 및 환산금액 재계산
            this.asetQt = ""
            this.calculateVal()

            // 수량 입력 태그 visible
            this.vis_asetQt = true
        },
        // 수량입력 시 시세참조하여 자산가치 계산 및 숫자, 소수점 2자리 허용
        calculateVal(e="") {
            this.asetQtChk(e)

            let unitPrice = this.goldMpr

            let asetQt = this.asetQt != "" ? this.asetQt.split(",").join("") : 1
            if(this.goldUntDsc == '2'){    // 선택 단위가 '돈'일때
                asetQt = this.asetQt != "" ? this.asetQt.split(",").join("") * 3.75 : 3.75
            }
            this.asetAm = roundNumberWithDot(unitPrice * asetQt, 2)
        },
        // 수량 입력 시 . , 숫자만 허용 (소수점 2자리입력가능, 소수점 제외 숫자길이 8자리)
        asetQtChk(e="") {
            let tabIndex = parseInt(this.goldUntDsc)-1;
            let selectionStartPos = ""
            let selectionEndPos = "" 
            if(e !== undefined && e !== null && e !== "") {
                selectionStartPos = this.$refs.asetQt[tabIndex].selectionStart
                selectionEndPos = this.$refs.asetQt[tabIndex].selectionEnd
            }

            let tmpQt = this.asetQt
            // (계산전) 숫자에 포함된 쉼표 제거
            if(tmpQt.indexOf(",") != -1) tmpQt = tmpQt.split(",").join("")
            let pattern1 = /^[0-9.]*$/;
            if(!pattern1.test(tmpQt)){
                tmpQt = tmpQt.replace(/[^0-9.]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
            } else {
                if(tmpQt.length == 1){
                    if(tmpQt == '.'){
                        tmpQt = tmpQt.slice(0, -1)
                    }
                } else {
                    if(tmpQt.split(".").length > 2){
                        tmpQt = tmpQt.slice(0, -1)
                    } else {
                        if(tmpQt.split(".").length == 1){
                            //소수점이 없을 때
                            // 정수 입력 8자리 제한
                            if(tmpQt.length > 8){
                                tmpQt = tmpQt.slice(0, -1)
                            } 

                            // 첫자리 0 입력 후 소수점이 아닌 숫자를 입력할 시
                            if(tmpQt.length == 2){
                                if(tmpQt[0] == 0  && tmpQt[1] == 0){        // 두번째 자리가 0일 경우 0만 남김 00 -> 0
                                    tmpQt = tmpQt.slice(0, -1)
                                } else if(tmpQt[0] == 0 && tmpQt[1] != 0) { // 두번째 자리가 0이 아닌 숫자일 경우 숫자만 남김 01 -> 1
                                    tmpQt = tmpQt.slice(1)
                                }
                            }
                        } else {
                            if(tmpQt.length == 2){
                                if(tmpQt[0] == 0  && tmpQt[1] == 0){
                                    tmpQt = tmpQt.slice(0, -1)
                                }
                            } else {
                                // 소수점 입력시 정수부분 최대 자리수는 8자리
                                if(!Number.isInteger(tmpQt) && tmpQt.split(".")[0].length > 8) {
                                    tmpQt = tmpQt.slice(0, -1)
                                }

                                // 소수점 이하 최대 자리수는 2자리
                                let pattern2 = /^\d*[.]\d{3}$/;
                                if(pattern2.test(tmpQt)){
                                    tmpQt = tmpQt.slice(0, -1)
                                }
                            }
                        }
                    }
                }
            }

            // 입력한 최종 보유중량이 0.00일 경우 입력란 초기화
            if(tmpQt == "0.00") tmpQt = ""

            // 소수점 포함 여부에 따른 천단위 쉼표 추가
            if(tmpQt != "") {
                if(tmpQt.indexOf(".") != -1) {
                    let splitNum = tmpQt.split(".")
                    let partInteger = splitNum[0]
                    let partDecimal = "." + splitNum[1]

                    tmpQt = numberFormat(partInteger) + partDecimal
                } else {
                    tmpQt = numberFormat(tmpQt)
                }
            }

            this.asetQt = tmpQt

            if(e.keyCode === 8) {
                this.$nextTick(()=>{
                    this.$refs.asetQt[tabIndex].focus()
                    this.$refs.asetQt[tabIndex].setSelectionRange(selectionStartPos,selectionEndPos)
                })
            }

        },
        // 금 등록
        resistGold(e) {
            if(e.target.className.indexOf("btn_off") != -1) return false

            const config = {
                url : "/co/oa/04s01",
                data : {
                    trDsc       : !this.isUpt?'1':'2',              // 거래구분코드(1: 저장, 2: 수정, 3: 삭제)
                    mydtCusno   : this.getUserInfo('mydtCusno'),    // 마이데이터고객번호
                    sqno        : this.sqno,                        // 일련번호
                    astnm       : this.astnm,                       // 금자산별칭
                    goldKdc     : this.goldKdc,                     // 금종류코드
                    goldUntDsc  : this.goldUntDsc,                  // 금단위구분코드
                    goldAsetQt  : this.asetQt.split(",").join(""),  // 금자산수량
                }
            }
            apiService.call(config).then(response => {
                if(!this.isUpt) {
                    if(response.rspC == '0000'){
                        this.openSuccess()
                    }else if(response.rspC == '9998'){
                        this.openFail('기타자산의 최대 등록 건 수(5000건)를 초과하였습니다.')
                    }else{
                        this.openFail('저장 중 오류가 발생하였습니다.')   
                    }
                    // response.rspC == '0000' ? this.openSuccess() : this.openFail('저장 중 오류가 발생하였습니다.')
                } else {
                    this.closeAllLeftMain({uptCom:true})
                }
            })
        },
        // 금 등록 성공시 다음 팝업 오픈
        openSuccess() {
            const config ={
                component : COCO2201,
                params : {
                    titlTxt     : "금",
                    subTxt      : "금",
                    isAdd       : false,
                    isRlAsset   : true,
                    assetId     : "Gold",
                    stsDsc       : "I",
                },
            }
            modalService.openPopup(config).then(response => {
                console.log("금 추가등록 ",response)
            })
        },
        // 금 등록 실패시 alert
        openFail(msg) {
            modalService.alert(msg)
            return false
        },
        closePage() {
            const config = {
                content: ['입력중인 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'],
                title  : "",
            }
            modalService.confirm(config).then(text => {
                if(text == "예") {
                    if(!this.isUpt) this.closeAllData(true)
                    else this.close()
                }
            })
        },
        // 입력 텍스트 삭제
        del(mod) {
            switch(mod) {
                case "astnm" :
                    this.astnm = ""
                    break
                case "asetQt" :
                    this.asetQt = ""
                    this.calculateVal() // 입력 텍스트 삭제에 따른 환산금액 재계산
                    break
                default :
                    break
            }
        },
        // 다음 단계 태그 visible
        fn_setVisible(mod) {
            switch(mod) {
                case "astnm" :
                    this.vis_selGold = true
                    break
                default : 
                    break
            }
        },
        // 포커스 in/out 시 'x' 버튼 on/off
        fn_focusOnOff(type) {
            switch(type) {
                case "astnm" : 
                    this.foc_byulching = true
                    this.foc_asetQt = false
                    break
                case "asetQt" :
                    this.foc_byulching = false
                    this.foc_asetQt = true
                    break
                default :
                    break
            }
        },
        // 글자수 체크
        fn_checkWord(event, maxByte) {
            let rtnObj = checkWord(event.target.value, maxByte)

            if(rtnObj.flag) {this.$refs.astnm.blur()}   // 알럿 중복 방지

            event.target.value = rtnObj.value
            this.astnm = event.target.value
        },
        fn_hanValue(amount) {
            const koreanUnits = ['', '만', '억', '조']
            let han_amount = parseInt(amount.split(',').join(''))
            let answer = ''
            let unit = 10000
            let index = 0
            let division = Math.pow(unit, index)
            if(amount === "") return

            while(Math.floor(han_amount / division) > 0) {
                const mod = Math.floor(han_amount % (division * unit) / division)
                if(mod) {
                    const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    answer = `${modToString}${koreanUnits[index]} ` + answer
                }
                division = Math.pow(unit, ++index)
            }
            return (answer + "원").replace(" 원","원")
            // return answer
        },
        // 자산수량 증가
        increaseAsetQt(qt) {
            var tempQt = this.asetQt
            var precision = '';
            
            if (tempQt === "") {
                tempQt = qt
            } else {
                if (tempQt.split(".").length > 1)
                    precision = tempQt.split(".")[1]
                
                tempQt = parseInt(tempQt.split(',').join(''))
                tempQt += parseInt(qt)

                var strMax = ""
                for (var i = 0; i < 8; i++) {
                    strMax += "9"
                }
                tempQt = Math.min(parseInt(strMax), tempQt).toString()
                if (precision != '')
                    tempQt += "." + precision
            }

            this.asetQt = tempQt;
            this.calculateVal()
        },
        pushData(arr, obj, strKey) {
            let value = obj[strKey];
            if (value !== null)
                arr.push(value);
        },
        setupGoldArr(item) {
            this.goldIncAsetQtList = [];
            this.pushData(this.goldIncAsetQtList, item, 'refCntn1');
            this.pushData(this.goldIncAsetQtList, item, 'refCntn2');
            this.pushData(this.goldIncAsetQtList, item, 'refCntn3');
            this.pushData(this.goldIncAsetQtList, item, 'refCntn4');
            this.pushData(this.goldIncAsetQtList, item, 'refCntn5');
        }
    },
    

}
</script>