<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 빌린돈
* @ 페이지설명 : 자산등록 > 빌린돈 > step 1. 빌린돈 등록
* @ 파일명     : src/views/page/CO/OA/COOA2003/COOA2003.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-31
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-31              CS515897              최초작성
* 2021-06-15              CS515897              퍼블변경
* 2022-07-18              CS528061               CO/OA/COOA1108/COOA1108.vue -> CO/OA/COOA2003/COOA2003.vue 변경
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>빌린돈</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
            <!-- 2022-08-29 위치변경 수정 -->
			<div class="com_inner com_line_type01 com_top_type02">
				<strong class="com_pop_tit01">누구에게 얼마를 빌렸나요?</strong>
			</div>
            <!-- //2022-08-29 위치변경 수정 -->
			<div class="com_inner">
				
				<div class="com_inputarea_type07">
					<div class="com_input_type01">
						<input type="text" id="com_input01" required="" placeholder="누구에게 빌렸나요?" title="누구에게 빌렸나요?"
                            :class="trPatnnm.length>0 && foc_trPatnnm?'focusON focusforce':''" :value="trPatnnm" 
                            ref="trPatnnm" @focus="fn_focusOnOff('trPatnnm')" @keyup="fn_checkWord($event, 40), fn_setVisible('sec1')">
						<label for="com_input01">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">빌린사람</span>
						</label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" @click.prevent="del('trPatnnm')" v-show="trPatnnm.length > 0"><!--style="display: none;"-->
                                <span class="blind">삭제</span>
                            </a>
						</div>
					</div>

					<div class="com_input_type01" v-show="vis_sec1 || isUpt">
						<input type="tel" class="tal" id="com_input02" value=""  required="" placeholder="휴대전화번호 (선택)" title="휴대전화번호 (선택)" maxlength="13" 
                            :class="mpno.length>0 && foc_mpno?'focusON focusforce':''" v-model="mpno" 
                            @focus="fn_focusOnOff('mpno')" ref="mpno" @keyup="addPhoneNum($event)" @blur="chkPhoneNum()">
						<label for="com_input02">
							<span class="txt_label_x">휴대전화번호</span>
						</label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" @click.prevent="del('mpno')"><!--style="display: none;"-->
                                <span class="blind">삭제</span>
                            </a>
						</div>
					</div>

					<div class="com_input_type01 com_word1" v-show="vis_sec1 || isUpt">
						<input type="tel" id="com_input03" required="" placeholder="얼마를 빌렸나요?" title="얼마를 빌렸나요?" maxlength="17" 
                            :class="prnAm.length>0 && foc_prnAm?'focusON focusforce':''" v-model="prnAm" 
                            @keyup="addComma($event), fn_setVisible('sec2')" @focus="fn_focusOnOff('prnAm')" ref="prnAm">
						<label for="com_input03">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">빌린돈</span>
						</label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" @click.prevent="del('prnAm')"><!--style="display: none;"-->
                                <span class="blind">삭제</span>
                            </a>
							<span class="com_inputtxtright2 style01">원</span>
						</div>
						<p class="com_sum">{{fn_hanValue(prnAm)}}</p>
						<div class="btn_price_group">
							<button type="button" class="btn_price" @click.prevent="addMoney(5)">+<strong>5</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="addMoney(10)">+<strong>10</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="addMoney(100)">+<strong>100</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="addMoney(1000)">+<strong>1000</strong>만</button>
						</div>
					</div>

					<div class="com_input_type01 com_word1" role="button" v-show="vis_sec2 || isUpt" @click="fn_setVisible('sec3'), fn_popupCalendar($event, 'stDt')" :aria-label="'필수입력, 빌린날 '+stDt+', 빌린날 선택'" ><!-- 22-10-20 접근성 aria 추가-->
						<input type="text" id="com_input04" class="input_cal_date input_cal_date_tit com_txtright_type01"  
                            required readonly placeholder="언제 빌렸나요?" title="언제 빌렸나요?"  aria-hidden="true" 
                            :class="stDt.length > 0 && foc_stDt?'focusON focusforce':''" v-model="stDt" @focus="fn_focusOnOff('stDt')">
                        
						<label for="com_input04">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">빌린날</span>
						</label>
                        <!--
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
						</div>
                        -->
					</div>

					<div class="com_input_type01 com_word1" role="button" v-show="vis_sec3 || isUpt" @click="fn_popupCalendar($event, 'edDt')" :aria-label="'필수입력, 갚을날 '+edDt+', 갚을날 선택'" ><!-- 22-10-20 접근성 aria 추가-->
						<input type="text" id="com_input05" data-popup="alert_popup" class="input_cal_date input_cal_date_tit com_txtright_type01" 
                            required readonly placeholder="언제까지 갚을 건가요?" title="언제까지 갚을 건가요?(선택)" aria-hidden="true"
                            :class="edDt.length > 0 && foc_edDt?'focusON focusforce':''" v-model="edDt" @focus="fn_focusOnOff('edDt')">
						<label for="com_input05">
							<span class="txt_label_x">갚을날</span>
						</label>
                        <!--
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
						</div>
                        -->
					</div>

					<div class="com_input_type01 com_word1" v-show="vis_sec3 || isUpt">
						<input type="number" inputmode="decimal" id="com_input06" class="com_txtright_type01" required="" placeholder="연 이자율(선택)" title="연 이자율" maxlength="5" 
                            v-model="debtIntrt" @keyup="chkInstRate()" @input="chkInstRate()" @focus="fn_focusOnOff('debtIntrt')" @blur="fn_chkDebtIntrt()">
						<label for="com_input06"><span class="txt_label_x">연 이자율</span></label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" @click.prevent="del('debtIntrt')" v-show="debtIntrt.length > 0"><!--style="display: none;"-->
                                <span class="blind">삭제</span>
                            </a>
							<span class="com_inputtxtright2">%</span>
						</div>
					</div>

					<div class="com_input_type01 com_word1" v-show="vis_sec3 || isUpt">
						<input type="tel" id="com_input07" class="com_txtright_type01" required="" placeholder="매월 이자지급일(선택)" title="매월 이자지급일" maxlength="2"
                            :class="intPyDt.length>0 && foc_intPyDt?'focusON focusforce':''"
                            v-model="intPyDt" @keyup="chkRpyDd()" @input="chkRpyDd()" @focus="fn_focusOnOff('intPyDt')">
						<label for="com_input07"><span class="txt_label_x">매월 이자지급일</span></label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" @click.prevent="del('intPyDt')" v-show="intPyDt.length > 0"><!--style="display: none;"-->
                                <span class="blind">삭제</span>
                            </a>
							<span class="com_inputtxtright2">일</span>
						</div>
					</div>
				</div>
			</div>
		</div>
        <div class="popup_footer fixed">
            <div class="btn_full_box">
                <a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" @click.prevent="resistLnAm($event)" role="button" aria-disabled="btnOnOff ? 'true' : 'false'">{{!isUpt?"등록":"수정"}}</a>
            </div>
        </div> 
		<a href="javascript:void(0);" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>		
	</div>
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {keyupNumFormat} from '@/utils/number'
import {dateFormat} from '@/utils/date'
import {checkWord} from '@/utils/data'

import COCO2201 from '@/views/page/CO/CO/COCO2201/COCO2201'
export default {
    name : "COOA2003",
    data: () => {
        return {
            trPatnnm    : "",   // 빌린사람이름
            mpno        : "",   // 휴대전화번호
            prnAm       : "",   // 값을돈
            stDt        : "",   // 빌린날
            edDt        : "",   // 값을날
            debtIntrt   : "",   // 연이자율
            intPyDt     : "",   // 이자지급일

            popId       : "",       // 부모창에서 띄운 팝업창id(추가등록용)
            assetId     : "",       // 자산등록에서 띄운 자산id(추가등록용)
            isUpt       : false,    // 수정으로 넘어왔는지 확인하기위한 파라미터
            sqno        : "",       // 일련번호(수정)

            // 포커스 on/off Flag
            foc_trPatnnm    : false,
            foc_mpno        : false,
            foc_prnAm       : false,
            foc_stDt        : false,
            foc_edDt        : false,
            foc_debtIntrt   : false,
            foc_intPyDt     : false,

            // section 구별
            vis_sec1        : false,
            vis_sec2        : false,
            vis_sec3        : false,

            today : dateFormat(new Date(), "YYYY-MM-DD")
        }
    },
    computed: {
        btnOnOff() {
            return (this.trPatnnm == "" || this.prnAm == "" || this.stDt == "") ? "btn_off" : ""
        },
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    components: {

    },    
    mounted() {
        this.popInit(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

        setTimeout(() => {
            this.$refs.trPatnnm.focus()
        }, 100)
    },
    methods: {
        popInit(param = {}) {
            this.popId = param.popId
            this.assetId = param.assetId
            this.isUpt = param.isUpt

            if(this.isUpt) {
                const config = {
                    url : "/co/oa/08r01",
                    data : {
                        mydtCusno   : this.getUserInfo("mydtCusno"),
                        sqno        : param.sqno
                    }
                }
                apiService.call(config).then(response => {
                    this.sqno       = response.sqno
                    this.trPatnnm   = response.trPatnnm || ""
                    this.mpno       = response.mpno || ""
                    this.prnAm      = String(response.prnAm) || ""
                    this.stDt       = response.stDt !== null ? dateFormat(response.stDt, "YYYY-MM-DD") : ""
                    this.edDt       = response.edDt !== null ? dateFormat(response.edDt, "YYYY-MM-DD") : ""
                    this.debtIntrt  = (response.debtIntrt !== "" && response.debtIntrt !== null && response.debtIntrt !== 0) ? String(response.debtIntrt) : ""
                    this.intPyDt    = (response.intPyDt !== "" && response.intPyDt !== null) ? response.intPyDt.split(" ").join("") : ""

                    this.addComma()
                    this.addPhoneNum()

                    this.$refs.trPatnnm.focus() // 수정으로 넘어올시 빌린사람 포커스
                })
            }
        },
        // (갚을돈) 금액 천단위 쉼표 표시 및 숫자데이터만 허용
        addComma(e="") {
            const selectionStartPos = this.$refs.prnAm.selectionStart
            const selectionEndPos = this.$refs.prnAm.selectionEnd

            if(this.prnAm.length == 1 && this.prnAm == 0) {
                this.prnAm = this.prnAm.slice(0, -1)
            } else {
                this.prnAm = this.prnAm.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                this.prnAm = this.prnAm.split(",").join("")
                this.prnAm = keyupNumFormat(this.prnAm)
            }
            if(e.keyCode === 8) {
                this.$nextTick(()=>{
                    this.$refs.prnAm.focus()
                    this.$refs.prnAm.setSelectionRange(selectionStartPos,selectionEndPos)
                })
            }
        },
        // (휴대전화번호) 숫자를 제외한 데이터 입력 시 초기화 및 11자리 제한, 휴대전화형식 적용
        addPhoneNum(e="") {
            const selectionStartPos = this.$refs.mpno.selectionStart
            const selectionEndPos = this.$refs.mpno.selectionEnd
            
            this.mpno = this.mpno.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
            
            let numTelNo = this.mpno.split("-").join("")
            if(numTelNo.length > 11) {
                this.mpno = this.mpno.slice(0, 11)
            }
            
            if(numTelNo.length == 11 || numTelNo.length == 10) {
                this.mpno = this.mpno.replace(/(\d{3})(\d{3,4})(\d{4}$)/, '$1-$2-$3')
            } else {
                this.mpno = this.mpno.split("-").join("")
            }

            if(e.keyCode === 8) {
                this.$nextTick(()=>{
                    this.$refs.mpno.focus()
                    this.$refs.mpno.setSelectionRange(selectionStartPos,selectionEndPos)
                })
            }
        },
        // (휴대전화번호) 휴대전화번호 자리수 체크
        chkPhoneNum() {
            if(this.mpno.length < 12) this.mpno = ""
        },
        // (이자율) 0 ~ 99.99 까지만 허용
        chkInstRate() {
            let pattern1 = /^[0-9.]*$/;
            if(!pattern1.test(this.debtIntrt)){
                this.debtIntrt = this.debtIntrt.replace(/[^0-9.]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'');
            } else {
                if(this.debtIntrt.length == 1){
                    if(this.debtIntrt == '.'){
                        this.debtIntrt = this.debtIntrt.slice(0, -1);
                    }
                } else {
                    if(this.debtIntrt.split(".").length > 2){
                        this.debtIntrt = this.debtIntrt.slice(0, -1);
                    } else {
                        if(this.debtIntrt.split(".").length == 1){	//소숫점이 없을 때
                            if(this.debtIntrt[0] == '0') {
                                this.debtIntrt = this.debtIntrt.slice(0, -1);
                            }
                            if(this.debtIntrt.length > 5){
                                this.debtIntrt = this.debtIntrt.slice(0, -1);
                            } 
                            if(this.debtIntrt.length == 2){
                                if(this.debtIntrt[0] == 0  && this.debtIntrt[1] == 0){
                                    this.debtIntrt = this.debtIntrt.slice(0, -1);
                                }
                            }
                        } else {
                            if(this.debtIntrt.length == 2){
                                if(this.debtIntrt[0] == 0  && this.debtIntrt[1] == 0){
                                    this.debtIntrt = this.debtIntrt.slice(0, -1);
                                }
                            } else {
                                let pattern2 = /^\d*[.]\d{3}$/;
                                if(pattern2.test(this.debtIntrt)){
                                    this.debtIntrt = this.debtIntrt.slice(0, -1);
                                }
                            }
                        }
                    }
                }
            }
            if(parseFloat(this.debtIntrt) > 99.99) {
                this.debtIntrt = this.debtIntrt.slice(0, -1)
            }
        },
        // (이자지급일) 일자(day) 포맷 허용
        chkRpyDd() {
            if(this.intPyDt.length > 2) {
                this.intPyDt = this.intPyDt.slice(0, 2)
            }
            this.intPyDt = this.intPyDt.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'');

            if(this.intPyDt.length === 2) {
                if(this.intPyDt.slice(0, 2) * 1 > 31) {
                    this.intPyDt = '31'
                }
                if(this.intPyDt[0] === 0) {
                    this.intPyDt = this.intPyDt.slice(1, 2)
                }
            } else if(this.intPyDt.length === 1) {
                if(this.intPyDt === "0") {
                    this.intPyDt = ""
                }
            }

        },
        // (이자율) 이자율 0일경우 이자율 초기화
        fn_chkDebtIntrt() {
            if(this.debtIntrt == 0 || this.debtIntrt == 0.0 || this.debtIntrt == 0.00) this.debtIntrt = ""
        },
        // 빌린돈 등록
        resistLnAm(e) {
            if(e.target.className.indexOf("btn_off") != -1) return false

            let fmt_stDt = this.stDt.split(".").join("").split("-").join("").split(",").join("")
            let fmt_edDt = this.edDt.split(".").join("").split("-").join("").split(",").join("")

            // 빌린날은 2000년 ~ 오늘 이전
            let nowDate = Number(dateFormat(new Date(), 'YYYYMMDD'))
            if(fmt_stDt.split(".").join("") > nowDate) {
                modalService.alert("빌린 날은 오늘 이전 날짜만 설정 가능합니다.").then(() => {
                    this.$refs.stDt.focus()
                })
                return false
            }

            if(fmt_edDt.length > 0) {
                if(fmt_stDt.split(".").join("") - fmt_edDt.split(".").join("") > 0) {
                    modalService.alert("갚을 날은 빌린 날 이후여야 합니다.").then(() => {
                        this.$refs.edDt.focus()
                    })
                    return false
                }
            }
            
            const config_reg = {
                url : "/co/oa/08s01",
                data : {
                    trDsc       : !this.isUpt?'1':'2',              // 거래구분코드(1:저장, 2:수정, 3:삭제)
                    mydtCusno   : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
                    sqno        : this.sqno,                        // 일련번호(등록은 null)
                    trPatnnm    : this.trPatnnm,                    // 거래상대자명
                    mpno        : this.mpno,                        // 휴대전화번호
                    stDt        : fmt_stDt,                         // 시작일자
                    edDt        : fmt_edDt,                         // 종료일자
                    prnAm       : this.prnAm.split(",").join(""),   // 원금금액
                    debtIntrt   : this.debtIntrt,                   // 차입금이자율
                    intPyDt     : this.intPyDt,                     // 이자지급일자
                }
            }
            apiService.call(config_reg).then(response => {
                if(!this.isUpt) {
                    if(response.rspC === "0000") {
                        const config = {
                                component: COCO2201,
                                params : {
                                    titlTxt     : "빌린돈",
                                    subTxt      : "빌린돈",
                                    isAdd       : false,
                                    isRlAsset   : true,
                                    popId       : this.popId,
                                    assetId     : this.assetId,
                                    stsDsc      : "I",
                                }
                            }
                        modalService.openPopup(config).then((response) => {
                            console.log("현금차용 추가등록 ", response)
                        })
                    }else if(response.rspC === "9998"){
                        modalService.alert('빌린돈의 최대 등록 건 수(5000건)를 초과하였습니다.')
                    }else{
                        modalService.alert('저장 중 오류가 발생하였습니다.')
                    }
                } else {
                    this.closeAllData({uptCom:true, mydtCusno:this.getUserInfo("mydtCusno")})
                }
            })
        },
        closePage() {
            const config = {
                content: ['입력중인 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'],
                title  : "",
            }
            modalService.confirm(config).then(text => {
                if(text == "예") {
                    if(!this.isUpt) this.closeAllData(true)
                    else this.closeAllData()
                }
            })
        },
        // 입력된 텍스트 삭제
        del(type) {
            switch(type) {
                case 'trPatnnm':
                    this.trPatnnm = ""
                    break
                case 'mpno':
                    this.mpno = ""
                    break
                case 'prnAm':
                    this.prnAm = ""
                    break
                case 'stDt':
                    this.stDt = ""
                    this.edDt = ""
                    break
                case 'edDt':
                    this.edDt = ""
                    break
                case 'debtIntrt':
                    this.debtIntrt = ""
                    break
                case 'intPyDt':
                    this.intPyDt = ""
                    break
            }
        },
        // 글자수 체크
        fn_checkWord(event, maxByte) {
            let rtnObj = checkWord(event.target.value, maxByte)

            if(rtnObj.flag) {this.$refs.trPatnnm.blur()}    // 알럿 중복 방지

            event.target.value = rtnObj.value
            this.trPatnnm = event.target.value
        },
        // input 클릭 시 focus 관련
        fn_focusOnOff(type) {
            switch(type) {
                case 'trPatnnm':
                    this.foc_trPatnnm   = true
                    this.foc_mpno       = false
                    this.foc_prnAm      = false
                    this.foc_stDt       = false
                    this.foc_edDt       = false
                    this.foc_debtIntrt  = false
                    this.foc_intPyDt    = false
                    break
                case 'mpno':
                    this.foc_trPatnnm   = false
                    this.foc_mpno       = true
                    this.foc_prnAm      = false
                    this.foc_stDt       = false
                    this.foc_edDt       = false
                    this.foc_debtIntrt  = false
                    this.foc_intPyDt    = false
                    break
                case 'prnAm':
                    this.foc_trPatnnm   = false
                    this.foc_mpno       = false
                    this.foc_prnAm      = true
                    this.foc_stDt       = false
                    this.foc_edDt       = false
                    this.foc_debtIntrt  = false
                    this.foc_intPyDt    = false
                    break
                case 'stDt':
                    this.foc_trPatnnm   = false
                    this.foc_mpno       = false
                    this.foc_prnAm      = false
                    this.foc_stDt       = true
                    this.foc_edDt       = false
                    this.foc_debtIntrt  = false
                    this.foc_intPyDt    = false
                    break
                case 'edDt':
                    this.foc_trPatnnm   = false
                    this.foc_mpno       = false
                    this.foc_prnAm      = false
                    this.foc_stDt       = false
                    this.foc_edDt       = true
                    this.foc_debtIntrt  = false
                    this.foc_intPyDt    = false
                    break
                case 'debtIntrt':
                    this.foc_trPatnnm   = false
                    this.foc_mpno       = false
                    this.foc_prnAm      = false
                    this.foc_stDt       = false
                    this.foc_edDt       = false
                    this.foc_debtIntrt  = true
                    this.foc_intPyDt    = false
                    break
                case 'intPyDt':
                    this.foc_trPatnnm   = false
                    this.foc_mpno       = false
                    this.foc_prnAm      = false
                    this.foc_stDt       = false
                    this.foc_edDt       = false
                    this.foc_debtIntrt  = false
                    this.foc_intPyDt    = true
                    break
            }
        },
        // section visible 처리
        fn_setVisible(mod) {
            switch(mod) {
                case "sec1" :
                    this.vis_sec1 = true
                    break
                case "sec2" :
                    this.vis_sec2 = true
                    break
                case "sec3" :
                    this.vis_sec3 = true
                    break
                default : 
                    break
            }
        },
        fn_popupCalendar(evt, type) {
            let tmpDt = ""
            switch(type) {
                case 'stDt' :
                    if(this.stDt > this.today) {
                        this.stDt = ""
                        tmpDt = this.today
                    }else{
                        tmpDt = this.stDt
                    }
                    break
                case 'edDt' :
                    if(this.edDt === '') {
                        tmpDt = this.today
                    } else {
                        tmpDt = this.edDt
                    }
                    break
            }
            
            let config = {}
            if(type === 'stDt') {
                config = {
                    pDate   : tmpDt,
                    minDate : '',
                    maxDate : this.today
                }
            } else {
                config = {
                    pDate   : tmpDt,
                    minDate : this.stDt,
                    maxDate : ''
                }
            }
            modalService.calendarPopup(config).then(response => {
                
                if(response !== undefined && response !== null && response !== '')
                {
                    evt.target.value = dateFormat(response, "YYYY-MM-DD")
                    if(type === 'stDt') {
                        this.stDt = evt.target.value

                        // (수정 대응) 갚을날이 빌린날 이전일 경우 갚을날 초기화
                        if(this.edDt !== "") {
                            let compStDt = Number(this.stDt.split("-").join(""))
                            let compEdDt = Number(this.edDt.split("-").join(""))
                            if(compStDt > compEdDt) this.edDt = ""
                        }
                    } else {
                        this.edDt = evt.target.value
                    }
                }            
            })

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
        addMoney(money) {
            let tmpPrnAm = Number(this.prnAm.split(",").join(""));
            
            tmpPrnAm += money * 10000;

            // 최대 금액 9,999,999,999,999 이상인 경우 최대값 고정
            if(tmpPrnAm >= 9999999999999) {
                tmpPrnAm = 9999999999999;
            }
            this.prnAm = String(tmpPrnAm);
            this.addComma();
            this.fn_setVisible('sec2');
            this.fn_focusOnOff('prnAm');
        }
    },

}
</script>