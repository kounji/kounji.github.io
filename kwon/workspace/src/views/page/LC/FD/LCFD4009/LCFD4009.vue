<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 금융달력
* @ 페이지설명 : 지출 > 금융달력 > 금융달력 검색 슬라이드팝업
* @ 파일명     : src\views\page\LC\FD\LCFD4009\LCFD4009.vue
* @ 작성자     : CS540687
* @ 작성일     : 2025-01-02
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-18              CS540687                 최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- 전체 팝업 시작 -->
        <div class="full_popup mydata2023" id="full_popup_01"> 
            <div class="popup_header">
                <!--25-02-10 텍스트 수정 -->
                <h1>거래내역 내려받기</h1>
                <!--//25-02-10 텍스트 수정 -->
            </div>
            <div class="popup_content">
                <div class="com_inner">
                    <!--25-02-10 텍스트 수정 -->
                    <strong class="titH1">내려받을 거래내역 조건을 설정해 주세요.</strong>
                    <!--//25-02-10 텍스트 수정 -->

                    <div class="btn_radio_wrap">
                        <strong class="titH5">거래기간</strong>
                        <!--25-02-10 텍스트 수정 -->
                        <p class="check_text">최근 1년 이내 최대 3개월까지 조회할 수 있습니다.</p>
                        <!--//25-02-10 텍스트 수정 -->                        

                        <div class="com_inputnum2 input_date">
                            <div class="com_input_type01" role="button" >
                                <input v-model="inqStrDt" type="text" id="startDate_1" class="input_cal_date" name="startDate"  @click.prevent="fn_popupCalendar($event, 'inqStrDt')" required="" readonly placeholder="년월일 8자리숫자" title="기간 시작일">
                            </div>
                            <div class="com_input_type01" role="button">
                                <input v-model="inqEndDt" type="text" id="endDate_1" class="input_cal_date" name="endDate"   @click.prevent="fn_popupCalendar($event, 'inqEndDt')" required="" readonly placeholder="년월일 8자리숫자" title="기간 종료일">
                            </div>
                        </div>

                        <!--25-02-10 aria 삭제 -->
                        <ul class="com_radio_type03">
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio1" id="radio1-1" value="1w" @change="monthClick('1w')">
                                    <label for="radio1-1">
                                        <span>1주일</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio1" id="radio1-2" value="1m" @change="monthClick('1m')">
                                    <label for="radio1-2">
                                        <span>1개월</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio1" id="radio1-3" value="3m" @change="monthClick('3m')">
                                    <label for="radio1-3">
                                        <span>3개월</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                        <!--//25-02-10 aria 삭제 -->
                    </div>

                    <div class="btn_radio_wrap">
                        <strong class="titH5">거래구분</strong>

                        <ul class="com_radio_type03">
                            <li>
                                <div class="btn_radio">
                                    <input v-model="xpsMnsCnd" type="radio" name="xpsMnsCnd" value="" id="radio2-1">
                                    <label for="radio2-1" :aria-checked="xpsMnsCnd ==''" >
                                        <span ref="xpsMnsCndAll">전체</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="xpsMnsCnd" type="radio" name="xpsMnsCnd" value="02" id="radio2-2">
                                    <label for="radio2-2" :aria-checked="xpsMnsCnd =='02'" >
                                        <span ref="xpsMnsCnd02">신용카드</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="xpsMnsCnd" type="radio" name="xpsMnsCnd" value="03" id="radio2-3">
                                    <label for="radio2-3" :aria-checked="xpsMnsCnd =='03'" >
                                        <span ref="xpsMnsCnd03">체크카드</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="xpsMnsCnd" type="radio" name="xpsMnsCnd" value="01" id="radio2-4">
                                    <label for="radio2-4" :aria-checked="xpsMnsCnd =='01'" >
                                        <span ref="xpsMnsCnd01">이체</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="xpsMnsCnd" type="radio" name="xpsMnsCnd" value="04" id="radio2-5">
                                    <label for="radio2-5" :aria-checked="xpsMnsCnd =='04'" >
                                        <span ref="xpsMnsCnd04">페이머니</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="xpsMnsCnd" type="radio" name="xpsMnsCnd" value="06" id="radio2-6">
                                    <label for="radio2-6" :aria-checked="xpsMnsCnd =='06'" >
                                        <span ref="xpsMnsCnd06">선불카드</span>
                                    </label>
                                </div>
                            </li>
                        </ul>  

                        <span class="btn_checkbox">
                            <input v-model="xpsBrkExpsYn" type="checkbox" name="check01" id="check01" :checked="xpsBrkExpsYn == '1'">
                            <label for="check01">
                                <span>숨긴내역 포함</span>
                            </label>
                        </span>
                    </div>

                    <div class="btn_radio_wrap">
                        <strong class="titH5">내역정렬</strong>
                        <ul class="com_radio_type02">
                            <li>
                                <div class="btn_radio">
                                    <input v-model="trDtCnd" type="radio" name="trDtCnd" value="desc" id="radio5-1">
                                    <label for="radio5-1" :aria-checked="trDtCnd == 'desc'">
                                        <span ref="trDtCndDesc">최신순</span>
                                    </label>
                                </div>
                            </li>
                            <li> 
                                <div class="btn_radio">
                                    <input v-model="trDtCnd" type="radio" name="trDtCnd" value="asc" id="radio5-2">
                                    <label for="radio5-2" :aria-checked="trDtCnd == 'asc'">
                                        <span ref="trDtCndAsc">오래된순</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <p class="stdMsg star mt15">거래내역 저장 서비스는 고객 편의를 위해 제공되는 서비스로 다운로드한 자료를 법적 자료로 사용하실 수 없습니다.</p>
                </div>
            </div>
            <div class="popup_footer fixed">
                <div class="btn_full_box">
                    <!--25-02-10 텍스트 수정 -->
                    <a href="#nolink" @click.prevent="excelBrkSearchFn" class="btn btn_mint" role="button">내려받기</a>
                    <!--//25-02-10 텍스트 수정 -->
                </div>
            </div>
            <a href="javascript:void(0);" class="btn_close" @click.prevent="fn_flagClose()"><span class="blind">팝업닫기</span></a>
        </div>
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {dateFormat, monthAdd, dayAdd, isValidDate} from '@/utils/date'
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import modalService from '@/service/modalService'

const TYPE_CARD = 'CARD'                // 카드 지출내역
const TYPE_PAY = 'PAY'                  // 페이 지출내역
const SUBTYPE_PAYMONEY = 'PAYMONEY'     // 페이 - 페이머니 지출내역
const SUBTYPE_PPAYCARD = 'PPAYCARD'     // 페이 - 선불카드 지출내역
const TYPE_PPAY = 'PPAY'                // 선불 결제내역

export default {
    name : "LCFD4009",
    data: () => {
        return {
            mydtCusno       : "",
            inqStrDt        : "",       // 시작일자
            inqEndDt        : "",       // 종료일자
            xpsMnsCnd       : "",       // 지출수단
            xpsMnsCndLabel  : "",       // 지출수단
            trDtCnd         : "desc",   // 내역정렬
            trDtCndLabel    : "최신순", // 내역정렬
            xpsBrkExpsYn    : false,
            trbrkList       : [],
            trbrkTerm       : "",         // 거래기간
            trbrkCn         : 0,
            basDtm          : '',
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)
    },
    methods: {
        initComponent(param) {

            this.basDtm         = dateFormat(new Date(), "YYYYMMDDhhmm")


            this.mydtCusno      = param.mydtCusno
            this.inqStrDt       = param.inqStrDt             
            this.inqEndDt       = param.inqEndDt
            // this.xpsMnsCnd      = ""
            // this.trDtCnd        = "desc"
            // this.xpsBrkExpsYn   = false

			// if(param.xpsBrkExpsYn === "1") {
			// 	this.xpsBrkExpsYn = true
			// }else{
			// 	this.xpsBrkExpsYn = false
			// }

            this.$nextTick(() => {
                $(function(){
                    $("input[type='radio']:checked").siblings("label").attr("aria-checked", true)
                })
            })
        }, 
        // 조건검색
        excelBrkSearchFn() {

            console.log("mydtCusno => ", this.mydtCusno)
            console.log("inqStrDt =>  ", this.inqStrDt)
            console.log("inqEndDt =>  ", this.inqEndDt)
            console.log("xpsMnsCnd => ", this.xpsMnsCnd)
            console.log("trDtCnd =>   ", this.trDtCnd)
            console.log("xpsBrkExpsYn => ", this.xpsBrkExpsYn)

            let strDt = monthAdd(-3, this.inqEndDt.split(".").join(""), 'YYYYMMDD')

            if (strDt > this.inqStrDt.split(".").join("")) {
                modalService.alert("거래기간은 최대 3개월까지 조회할수 있습니다.")
				return false
            }

            const config = {
                url: '/lc/fd/09r01', 
                data: {
					mydtCusno		: this.mydtCusno ,	// 마이데이터고객번호
					inqStrDt		: this.inqStrDt.split(".").join("") ,	// 조회시작일작
					inqEndDt		: this.inqEndDt.split(".").join("") ,	// 조회종료일자
					xpsMnsCnd		: this.xpsMnsCnd ,	// 지출결제수단
					trDtCnd		    : this.trDtCnd ,	// 내역정렬
                    xpsBrkExpsYn    : this.xpsBrkExpsYn == true ? '0' : '1',    // 숨김지출내역
                }
            }	
            apiService.call(config).then(response =>{
                console.log('response', JSON.parse(JSON.stringify(response)))   
                this.trbrkCn   = response.trbrkCn
                this.trbrkList = response.trbrkList || []

                this.trbrkTerm = this.inqStrDt + "~" + this.inqEndDt
                switch(this.xpsMnsCnd) {
                    case '': 
                        this.xpsMnsCndLabel = "신용카드, 체크카드, 이체, 페이머니, 선불카드"
                        break;
                    case '01':
                        this.xpsMnsCndLabel = "이체"
                        break;
                    case '02':
                        this.xpsMnsCndLabel = "신용카드"
                        break;
                    case '03':
                        this.xpsMnsCndLabel = "체크카드"
                        break;
                    case '04':
                        this.xpsMnsCndLabel = "페이머니"
                        break;
                    case '06':
                        this.xpsMnsCndLabel = "선불카드"
                        break;
                    default:
                        break;
                }

                this.basDtm  = dateFormat(new Date(), "YYYYMMDDhhmm")

                //거래내역 출력 데이터
                let data = {
                    header : {
                                title  : "거래내역저장_" + this.basDtm, 
                                trFrom : this.inqStrDt,
                                trTo   : this.inqEndDt,
                                trGbn  : this.xpsMnsCndLabel,
                            } , 
                    data : this.trbrkList                    
                }                  
                
                console.log("excel trbrkList=======================", this.trbrkList)
                console.log("excel data=======================", data)
                let rslt = this.excelExport("exec_lcfd4009", data)   
                console.log("excel rslt=======================", rslt)
            })

        },   
		fn_flagClose(){
            this.close()
			// if(this.reqFlag === ""){
			// 	this.$parent.$parent.$children[this.$parent.$parent.$children.length-1].fn_setCurrentYm(this.trDtm.split('-').join('').substr(0,4), this.trDtm.split('-').join('').substr(4,2))
			// 	this.closeAll('complete')
			// }else{
			// 	this.close()
			// }
		},
        // 월 버튼 클릭
        monthClick(value) {

            if(this.inqEndDt === "" || !isValidDate(this.inqEndDt.split(".").join("")))
            {
                this.alert('종료 일을 확인해 주십시오')
                this.$refs.inqEndDt.focus()
                return false
            } else {
                //value == 0 직접입력
                if(value === '1w')
                {
                    this.inqStrDt = dayAdd(-7, this.inqEndDt.split(".").join(""),'YYYY.MM.DD')
                }else if(value === '1m')
                {
                    this.inqStrDt = monthAdd(-1, this.inqEndDt.split(".").join(""), 'YYYY.MM.DD')
                }else if(value === '3m')
                {
                    this.inqStrDt = monthAdd(-3, this.inqEndDt.split(".").join(""), 'YYYY.MM.DD')
                }
            }
        },
        // 달력
        fn_popupCalendar(evt, objNm) {
            let tmpDt = ""
            let minDate = ''
            let maxDate = ''
            if(objNm == "inqStrDt"){
                minDate = dateFormat(monthAdd(-12), 'YYYY.MM.DD')
                tmpDt = this.inqStrDt
            }else{
                if(this.inqStrDt !== undefined || this.inqStrDt !== null || this.inqStrDt !== ''){
                    minDate = dateFormat(this.inqStrDt , 'YYYY.MM.DD') 
                    console.log("minDate>>",minDate)   
                }else{
                    minDate = dateFormat(monthAdd(-12), 'YYYY.MM.DD')
                }  
                 tmpDt = this.inqEndDt  
            }
            maxDate = dateFormat(new Date(), 'YYYY.MM.DD')
            
            let config = {
                pDate   : tmpDt,
                minDate : minDate,
                maxDate : maxDate
            }
            
            modalService.calendarPopup(config).then(response => {
                if(response !== undefined && response !== null && response !== '')
                {
                    evt.target.value = dateFormat(response, "YYYY.MM.DD")
                    if(objNm === 'inqStrDt') {
                        this.inqStrDt = evt.target.value
                    }else{
                        this.inqEndDt = evt.target.value
                    }                    
                }
            })
		},
           
    },
}
</script>
