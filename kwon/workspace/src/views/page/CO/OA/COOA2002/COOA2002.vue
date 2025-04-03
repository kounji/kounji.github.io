<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 기타
* @ 페이지설명 : 자산등록 > 기타 > step 1. 외화 정보입력
* @ 파일명     : src/views/page/CO/OA/COOA2002/COOA2002.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-17
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-17              CS515897              최초작성
* 2022-07-26              CS528061              고도화 및 파일명 변경(src/views/page/CO/OA/COOA1102/COOA1102.vue -> src/views/page/CO/OA/COOA2002/COOA2002.vue)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>외화</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_top_type02">
				<strong class="com_pop_tit01">보유하신 외화를 입력하세요.</strong>
				<p class="com_txt_sub01">
					<span>{{xcrtBasDt}} 매도 환율</span>
					<span class="bar"></span>
					<span class="txt_price">
						<span class="num">{{fn_setTtxs(ttxs)}}</span>
						<em class="com_mark">원</em>
					</span>
				</p>
			</div>
            <div class="com_inner">
				<div class="com_inputarea_type07">
					<div class="com_input_type01">
						<input type="text" id="com_input01" :class="astnm.length > 0 ? 'focusON focusforce' : ''" required="" placeholder="별칭 입력" title="별칭을 입력하세요."
                                v-model="astnm" ref="astnm" @keyup="fn_checkWord($event, 30)" @focus="fn_focusOnOff('astnm')" @keyup.enter="moveNextTag($event)">
						<label for="com_input01">
							<em><span class="blind">필수입력</span></em>
                            <span class="txt_label_x">별칭</span>
						</label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" @click.prevent="del('astnm')"><span class="blind">삭제</span></a> <!-- style="display: none;" -->
						</div>
					</div>
					
					<div class="com_input_type01_etc" :class="untConvDiv">
						<div class="flag_area"><em :class="'ico_'+curc"></em><span>{{curc}}</span></div>
						<input type="text" id="com_input02" class="com_txtleft_type01 tar" :class="asetAm.length > 0 ? 'focusON focusforce' : ''" 
                                v-model="asetAm" ref="asetAm" placeholder="" :title="curnm" maxlength="13" @keyup="addComma($event)" @focus="fn_focusOnOff('asetAm')"/>
						<label for="com_input02"></label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" @click.prevent="del('asetAm')" v-show="asetAm.length > 0"><span class="blind">삭제</span></a> <!-- style="display: none;" -->
							<span class="com_inputtxtright2">{{curnm}}</span>
						</div>
						<p class="com_sum" v-if="asetAm !== ''">{{ fn_hanValue(Math.floor(asetAm.split(",").join("") * ttxs)) }}</p>
                        
                        <!--                                        미국             유럽             호주              캐나다           스위스            영국            뉴질랜드         싱가포르 -->
						<div class="btn_price_group" v-if="curc == 'USD' || curc == 'EUR' || curc == 'AUD' || curc == 'CAD' || curc == 'CHF' || curc == 'GBP' || curc == 'NZD' || curc == 'SGD'">
                            <button type="button" class="btn_price" @click.prevent="addMoney(10)">+<strong>10</strong></button>
							<button type="button" class="btn_price" @click.prevent="addMoney(100)">+<strong>100</strong></button>
							<button type="button" class="btn_price" @click.prevent="addMoney(1000)">+<strong>1000</strong></button>
							<button type="button" class="btn_price" @click.prevent="addMoney(10000)">+<strong>1</strong>만</button>
						</div>
                        <!-- 일본, 중국, 홍콩, 태국, 대만, 필리핀 -->
                        <div class="btn_price_group" v-else>
                            <button type="button" class="btn_price" @click.prevent="addMoney(1000)">+<strong>1000</strong></button>
							<button type="button" class="btn_price" @click.prevent="addMoney(10000)">+<strong>1</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="addMoney(100000)">+<strong>10</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="addMoney(1000000)">+<strong>100</strong>만</button>
						</div>
					</div>
				
				</div>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>

        <!-- footer S -->
		<div class="bottom_box">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" @click.prevent="resistCurrency($event)">{{!isUpt?"등록":"수정"}}</a>
			</div>
        </div>
        <!--// footer E -->
	</div>
	<!--// full popup E -->
</template>
<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import {keyupNumFormat, roundNumberWithDot} from '@/utils/number'
import {dateFormat} from '@/utils/date'
import {checkWord} from '@/utils/data'

import COCO2201 from '@/views/page/CO/CO/COCO2201/COCO2201'

export default {
    name : "COOA2002",
    data: () => {
        return {
            curc        : "",   // 통화코드
            asetAm      : "",   // 자산금액
            ttxs        : "",   // 전신환매도율
            chgAm       : "",   // 환산금액(원)
            curnm       : "",   // 통화단위
            curcList    : [],   // 외화통화리스트
            xcrtBasDt   : "",   // 환율기준일자
            astnm       : "",   // 외화별칭(210906 추가)
            sqno        : "",   // 일련번호(210914 추가)
            memoCntn    : "",   // 메모내용(210914 추가 - 기획서상 항목 없음)

            popId : "",         // 부모창에서 띄운 팝업창id(추가등록용)
            isUpt : false,      // 수정으로 넘어왔는지 확인하기위한 파라미터

            // 포커스 시 'x'버튼 visible 처리(210906 추가)
            foc_asetAm : false,     
            foc_byulching : false,
        }
    },
    computed: {
        btnOnOff() {
            return (this.asetAm == "" || this.astnm == "") ? "btn_off" : ""
        },
        untConvDiv() {
            return this.curnm.length > 1 ? (this.curnm.length > 2 ? "com_word3" : "com_word2") : "com_word1"
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    mounted() {
        this.getData(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
        setTimeout(() => {
            this.$refs.astnm.focus()
        }, 100)
    },
    methods: {
        // 외화 정보 조회
        getData(param = {}) {
            this.isUpt = param.isUpt    // 수정으로 넘어온 여부
            this.popId = param.popId

            if(this.isUpt) {    // 수정
                const config = {
                    url: "/co/oa/03r01",
                    data: {"mydtCusno" : this.getUserInfo('mydtCusno')}
                }
                apiService.call(config).then(response => {
                    this.curcList = response.curcList || []
                    
                    this.curc   = param.curc || ""
                    this.sqno   = param.sqno || ""
                    this.asetAm = keyupNumFormat(param.asetAm) || ""
                    this.astnm  = param.astnm || ""

                    this.xcrtBasDt = (response.xcrtBasDt != "" && response.xcrtBasDt != null) ? dateFormat(response.xcrtBasDt, "YYYY년 MM월 DD일") : ""

                    for(let i=0; i<this.curcList.length; i++) {
                        if(this.curcList[i].curc == this.curc) {
                            this.curc   = this.curcList[i].curc
                            this.ttxs   = (this.curc === "JPY"||this.curc === "IDR"||this.curc === "VND")?this.curcList[i].ttxs/100:this.curcList[i].ttxs
                            this.curnm  = this.curcList[i].curnm
                            break
                        }
                    }

                    this.$refs.astnm.focus()    // 수정으로 넘어올시 별칭 포커스
                })
            } else {     // 등록
                this.curc = param.curc || ""
                this.ttxs = param.ttxs || ""
                this.curnm = param.curnm || ""
                this.xcrtBasDt = (param.xcrtBasDt != "" && param.xcrtBasDt != null) ? dateFormat(param.xcrtBasDt, "YYYY년 MM월 DD일") : ""
            }
        },
        // 금액입력시 천단위 , 추가
        addComma(e="") {
            const selectionStartPos = this.$refs.asetAm.selectionStart
            const selectionEndPos = this.$refs.asetAm.selectionEnd

            if(this.asetAm.length == 1 && this.asetAm == 0) {
                this.asetAm = this.asetAm.slice(0, -1)
            } else {
                this.asetAm = this.asetAm.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                this.asetAm = this.asetAm.split(",").join("")
                this.asetAm = keyupNumFormat(this.asetAm)
            }

            if(e.keyCode === 8) {
                this.$nextTick(()=>{
                    this.$refs.asetAm.focus()
                    this.$refs.asetAm.setSelectionRange(selectionStartPos,selectionEndPos)
                })
            }
        },
        // 외화 등록
        resistCurrency(e) {
            // 필수입력항목 체크
            if(e.target.className.indexOf("btn_off") != -1) return false
            
            const config = {
                url : "/co/oa/02s01",
                data : {
                    trDsc       : !this.isUpt?'1':'2',              // 거래구분코드(1: 저장, 2: 수정, 3: 삭제)
                    mydtCusno   : this.getUserInfo('mydtCusno'),    // 마이데이터고객번호
                    sqno        : this.sqno,                        // 일련번호
                    curc        : this.curc,                        // 통화코드
                    asetAm      : this.asetAm.split(",").join(""),  // 자산금액
                    astnm       : this.astnm,                       // 자산명
                    memoCntn    : this.memoCntn,                    // 메모내용
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
        // 외화 등록 성공시 다음 팝업 오픈
        openSuccess() {
            const config = {
                component : COCO2201,
                params : {
                    titlTxt     : "외화",
                    subTxt      : "외화",
                    isAdd       : false,
                    isRlAsset   : true,
                    // popId       : this.popId,
                    assetId     : "Curr",
                    stsDsc      : "I",
                },
            }
            modalService.openPopup(config).then(response => {
                console.log("외화 추가등록 ", response)
            })
        },
        // 외화 등록 실패시 alert
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
        // 입력한 텍스트 삭제
        del(type) {
            switch(type) {
                case "astnm" :
                    this.astnm = ""
                    break
                case "asetAm" :
                    this.asetAm = ""
                    break
                default :
                    break
            }
        },
        // 상단 환율 영역 텍스트 설정 (소수점 두 자리)
        fn_setTtxs(ttxs) {
            return roundNumberWithDot(ttxs, 2)
        },
        // 포커스 in/out 시 'x' 버튼 on/off
        fn_focusOnOff(type) {
            switch(type) {
                case "astnm" : 
                    this.foc_byulching = true
                    this.foc_asetAm = false
                    break
                case "asetAm" :
                    this.foc_byulching = false
                    this.foc_asetAm = true
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
            let han_amount = parseInt(amount)
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
        },
        addMoney(money) {
            let tmpAsetAm = Number(this.asetAm.split(",").join(""));
            
            tmpAsetAm += money;

            // 최대 금액 9,999,999,999 이상인 경우 최대값 고정
            if(tmpAsetAm >= 9999999999) {
                tmpAsetAm = 9999999999;
            }
            this.asetAm = String(tmpAsetAm);
            this.addComma();
            this.fn_focusOnOff('asetAm');
            
        }
    },
}
</script>