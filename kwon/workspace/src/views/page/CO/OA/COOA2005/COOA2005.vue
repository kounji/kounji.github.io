<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 기타
* @ 페이지설명 : 자산등록 > 기타 > step 1. 정보직접입력
* @ 파일명     : src/views/page/CO/OA/COOA2005/COOA2005.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-18              CS515897              최초작성
* 2022-07-27              CS528205              고도화 파일명, UI 변경 및 고도화 개발(COOA1107.vue -> COOA2005.vue)
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>기타자산</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="com_inputarea_type07">
					<!-- 보유한 자산정보를 입력하세요. -->
					<div class="titbox_type01 style_up">
						<strong class="com_pop_tit01">보유한 자산정보를 입력하세요.</strong>
						<span class="btn_area">
						</span>
					</div>
					<!--// 보유한 자산정보를 입력하세요. -->
					<!-- 자산명 -->
					<div class="com_input_type01">
						<input type="text" id="CO-OA-07-01" :class="astnm.length>0 && foc_astnm?'focusON focusforce':''" :value="astnm" ref="astnm" required="" placeholder="보유자산명" title="보유자산명" @keyup="fn_DelEmptySpace, moveNextTag($event), fn_checkWord($event, 40), fn_setVisible('asetAm')" @focus="fn_focusOnOff('astnm')">
						<label for="CO-OA-07-01">
							<em><span class="blind">보유자산명</span></em>
							<span class="txt_label_x">자산명</span>
						</label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2"  @click.prevent="del('astnm')" v-show="astnm.length > 0"><span class="blind">삭제</span></a>
						</div>
					</div>
					<!--// 자산명 -->
					<div class="com_input_type01 com_word1" v-show="vis_asetAm || isUpt">
						<!-- 보유금액 -->
						<input type="tel" id="CO-OA-07-02" :class="asetAm.length>0 && foc_asetAm?'focusON focusforce':''" v-model="asetAm" @keyup="addComma($event)"  @focus="fn_focusOnOff('asetAm')" ref="asetAm" value=""  maxlength="17" required="" placeholder="보유금액을 입력하세요." title="보유금액을 입력하세요">
						<label for="CO-OA-07-02">
							<em><span class="blind">금액입력</span></em>
							<span class="txt_label_x">보유금액</span>
						</label>
						<!--// 보유금액 -->
						<!-- 원 -->
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2"  @click.prevent="del('asetAm')" v-show="asetAm.length > 0"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">원</span>
						</div>
						<!--// 원 -->
						<p class="com_sum">{{fn_hanValue(asetAm)}}</p>
						<!-- 2022-07-19 : title 속성 삽입 -->
						<!-- 버튼(5만, 10만, 100만 1000만) -->
						<div class="btn_price_group">
                            <button v-for="(val, idx) in increasingAmList" :key="'am_'+idx" type="button" class="btn_price" @click="increaseAmt(val)" :title="val+'만'">+<strong>{{val}}</strong>만</button>
						</div>
						<!--// 버튼(5만, 10만, 100만 1000만) -->
						<!--// 2022-07-19 : title 속성 삽입 -->
						
					</div>
				</div>
			</div>
		</div>
        <div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" @click="resistEtc($event)">{{!isUpt?"등록":"수정"}}</a>
			</div>
        </div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>
	</div>
</template>
<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import {keyupNumFormat} from '@/utils/number'
import {checkWord} from '@/utils/data'
// import {numberFormat} from '@/utils/number'

import COCO2201 from '@/views/page/CO/CO/COCO2201/COCO2201'

export default {
    name : "COOA2005",
    data: () => {
        return {
            astnm   : "",       // 자산명
            asetAm  : "",       // 자산가치

            popId   : "",       // 부모창에서 띄운 팝업창id(추가등록용)
            isUpt   : false,    // 수정으로 넘어왔는지 확인하기위한 파라미터
            sqno    : "",       // 일련번호(수정용)

            // 포커스 on/off 관련
            foc_astnm   : false,
            foc_asetAm  : false,

            // 태그 visible 관련
            vis_asetAm : false,

            increasingAmList : []   // 자산가치 증가값 리스트
        }
    },
    computed: {
        btnOnOff() {
            return (this.astnm === "" || this.asetAm === "") ? "btn_off" : ""
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    mounted() {
        this.popInit(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

        setTimeout(() => {
            this.$refs.astnm.focus()
        }, 100)
    },
    methods: {
        popInit(param = {}) {
            this.popId = param.popId
            this.isUpt = param.isUpt
            this.increasingAmList = [5, 10, 100, 1000]

            if(this.isUpt) {
                this.sqno = param.sqno
                const config = {
                    url : "/as/ra/09r01",
                    data : {
                        mydtCusno   : this.getUserInfo('mydtCusno'),
                        sqno        : this.sqno
                    }
                }
                apiService.call(config).then(response => {
                    this.sqno   = response.sqno || ""
                    this.astnm  = response.astnm || ""
                    this.asetAm = String(response.asetAm) || ""
                    this.addComma()

                    this.$refs.astnm.focus()    // 수정으로 넘어올시 별칭 포커스
                })
            }
        },
        // input 태그 내 천단위 쉼표추가
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
                this.$nextTick(() => {
                    this.$refs.asetAm.focus()
                    this.$refs.asetAm.setSelectionRange(selectionStartPos, selectionEndPos)
                })
            }
        },
        // 기타자산 등록
        resistEtc(e) {
            if(e.target.className.indexOf("btn_off") != -1) return false

            const config = {
                url : "/co/oa/07s01",
                data : {
                    trDsc       : !this.isUpt?'1':'2',              // 거래구분코드(1: 저장, 2: 수정, 3: 삭제)
                    mydtCusno   : this.getUserInfo('mydtCusno'),    // 마이데이터고객번호
                    sqno        : this.sqno,                        // 일련번호
                    astnm       : this.astnm,                       // 자산명
                    asetAm      : this.asetAm.split(",").join(""),  // 자산금액
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
        // 기타자산 등록 성공시 다음 팝업 오픈
        openSuccess() {
            const config = {
                component : COCO2201,
                params : {
                    titlTxt     : "기타",
                    subTxt      : "기타",
                    isAdd       : false,
                    isRlAsset   : true,
                    assetId     : "Etc",
                    stsDsc      : "I",
                },
            }
            modalService.openPopup(config).then(() => {})
        },
        // 기타자산 등록 실패시 alert
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
        del(type) {
            switch(type) {
                case 'astnm':
                    this.astnm = ""
                    break
                case 'asetAm':
                    this.asetAm = ""
                    break
            }
        },
        // 자산명 맨 앞 띄어쓰기 제거
        fn_DelEmptySpace() {
            if(this.astnm.length === 1 && this.astnm.search(/\s/) === 0) {
                this.astnm = ""
            }
        },
        // input focus on/off
        fn_focusOnOff(type) {
            switch(type) {
                case "astnm" :
                    this.foc_astnm  = true
                    this.foc_asetAm = false
                    break
                case "asetAm" :
                    this.foc_astnm  = false
                    this.foc_asetAm = true
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
        // 다음 태그 visible
        fn_setVisible(mod) {
            switch(mod) {
                case "asetAm" :
                    this.vis_asetAm = true
                    break
                default :
                    break
            }
        },
        fn_hanValue(amount) {
            const koreanUnits = ['', '만', '억', '조']
            let han_amount = parseInt(amount.split(',').join(''))   // 만원 단위 화면
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
        increaseAmt(amt) {
            var increasingAmt = amt * 10000   // 만원 단위로 증가
            var tempAmt = this.asetAm
            
            if (tempAmt === "") {
                tempAmt = increasingAmt
            } else {
                tempAmt = parseInt(tempAmt.split(',').join(''))
                tempAmt += increasingAmt

                var strMax = ""
                for (var i = 0; i < 13; i++) {
                    strMax += "9"
                }
                tempAmt = Math.min(parseInt(strMax), tempAmt)
            }
            
            this.asetAm = keyupNumFormat(tempAmt)
        }
    },
    

}
</script>