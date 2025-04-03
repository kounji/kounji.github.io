<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 카드,페이머니,선불카드 지출내역
* @ 페이지설명 : 지출 > 지출내역 > 카드,페이머니,선불카드 지출내역 검색 슬라이드팝업
* @ 파일명     : src/components/LC/LE/CMM/CmmXpsDetailSearch.vue
* @ 작성자     : CS540687
* @ 작성일     : 2025-01-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-18              CS540687                 최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01">
                <div class="popup_header">
                    <h1>조건 검색</h1>
                </div>
				<!--[v4.0] 조회기간 추가-->
                <div class="popup_content com_btn_bottom">
                    <div class="btn_radio_wrap mt0">
                        <div class="custom_tooltip_wrap">
                            <strong class="titH5">조회기간</strong>
                            <div class="custom_tooltip">
                                <div class="com_tooltip_type02 com_tooltip_type03">
                                    <a href="#nolink" class="com_btn_info" role="button">
                                        <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                    </a>
                                    <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                        <div>
                                            <p>최근 1년 이내 최대 3개월까지 조회가 가능합니다.</p>
                                            <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                        </div> 
                                    </div>
                                </div>
                            </div>  
                        </div>   

                        <div class="com_inputnum2 input_date">
                            <div class="com_input_type01" role="button" >
                                <input v-model="inqStrDt" type="text" id="startDate_1" class="input_cal_date" name="startDate"  @click.prevent="fn_popupCalendar($event, 'inqStrDt')" required="" readonly placeholder="년월일 8자리숫자" title="기간 시작일">
                            </div>
                            <div class="com_input_type01" role="button">
                                <input v-model="inqEndDt" type="text" id="endDate_1" class="input_cal_date" name="endDate"   @click.prevent="fn_popupCalendar($event, 'inqEndDt')" required="" readonly placeholder="년월일 8자리숫자" title="기간 종료일">
                            </div>
                        </div>
                    </div>

                    <div class="btn_radio_wrap mt30"><!-- mt30 추가-->
                        <strong class="titH5">가맹점</strong>
                        <div class="com_input_type01 mt0">
                            <label for="com_input01"></label>
                            <input v-model="prcMchtnmCnd" type="search" id="com_input01" class="" name="" value="" placeholder="가맹점명을 입력하세요" title="가맹점 찾기">
                            <a href="javascript:void(0);" class="com_btn_delete"><span class="blind">삭제</span></a>
                            <a @click.prevent="search()" href="javascript:void(0);" class="com_btn_search"><span class="blind">검색</span></a>
                        </div>
                    </div>

                    <!-- 카드 종류 -->
                    <div class="btn_radio_wrap" v-if="type == TYPE_CARD"> <!-- mt30 제거-->
                        <strong class="titH5">카드 종류</strong>
                        <ul class="com_radio_type03">
                            <li>
                                <div class="btn_radio">
                                    <input v-model="cdTyCnd" type="radio" name="cdTyCnd" value="" id="radio1-1">
                                    <label for="radio1-1" :aria-checked="cdTyCnd == ''">
                                        <span ref="cdTyCndAll">전체</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="cdTyCnd" type="radio" name="cdTyCnd" value="01" id="radi1-2">
                                    <label for="radi1-2" :aria-checked="cdTyCnd == '01'">
                                        <span ref="cdTyCndCrd">신용</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="cdTyCnd" type="radio" name="cdTyCnd" value="02" id="radio1-3">
                                    <label for="radio1-3" :aria-checked="cdTyCnd == '02'">
                                        <span ref="cdTyCndDbt">체크</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- //카드 종류 -->

                    <!-- 결제금액 -->
                    <div class="btn_radio_wrap mt30">
                        <strong class="titH5">결제금액</strong>
                        <ul class="com_radio_type03">
                            <li>
                                <div class="btn_radio">
                                    <input v-model="amCnd" type="radio" name="amCnd" value="" id="radio2-1">
                                    <label for="radio2-1" :aria-checked="amCnd == ''">
                                        <span ref="amCndAll">전체</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="amCnd" type="radio" name="amCnd" value="desc" id="radi2-2">
                                    <label for="radi2-2" :aria-checked="amCnd == 'desc'">
                                        <span ref="amCndDesc">높은순</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="amCnd" type="radio" name="amCnd" value="asc" id="radio2-3">
                                    <label for="radio2-3" :aria-checked="amCnd == 'asc'">
                                        <span ref="amCndAsc">낮은순</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- //결제금액 -->
 
                    <!-- 거래상태 -->
                    <div class="btn_radio_wrap" v-if="type != TYPE_CASH">
                        <strong class="titH5">거래상태</strong>
                        <ul class="com_radio_type03">
                            <li>
                                <div class="btn_radio">
                                    <input v-model="stsCnd" type="radio" name="stsCnd" :value="stsCndAll" id="radio3-1">
                                    <label for="radio3-1" :aria-checked="stsCnd == stsCndAll">
                                        <span ref="stsCndAll">전체</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="stsCnd" type="radio" name="stsCnd" :value="stsCndApv" id="radi3-2">
                                    <label for="radi3-2" :aria-checked="stsCnd == stsCndApv">
                                        <span ref="stsCndApv">결제(승인)</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="stsCnd" type="radio" name="stsCnd" :value="stsCndCan" id="radio3-3">
                                    <label for="radio3-3" :aria-checked="stsCnd == stsCndCan">
                                        <span ref="stsCndCan">취소</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- //거래상태 --> 

                    <!--[v4.0] 내역정렬 추가-->
                    <div class="btn_radio_wrap">
                        <strong class="titH5">내역정렬</strong>
                        <ul class="com_radio_type02">
                            <li>
                                <div class="btn_radio">
                                    <input v-model="trDtCnd" type="radio" name="trDtCnd" value="desc" id="radi4-1">
                                    <label for="radi4-1" :aria-checked="trDtCnd == 'desc'">
                                        <span ref="trDtCndDesc">최신순</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="trDtCnd" type="radio" name="trDtCnd" value="asc" id="radio4-2">
                                    <label for="radio4-2" :aria-checked="trDtCnd == 'asc'">
                                        <span ref="trDtCndAsc">오래된순</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--//[v4.0] 내역정렬 추가-->                    
                </div>
                <div class="popup_footer">
                    <div class="btn_full_box2">
                        <a @click.prevent="search()" href="javascript:void(0);" role="button" class="btn btn_mint">조회</a>
                    </div>
                </div>
                <a @click.prevent="close()" href="javascript:void(0);" class="btn_close"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import {dateFormat,monthAdd,dayDiff} from '@/utils/date' // monthAdd

const TYPE_CARD = 'CARD'                // 카드 지출내역
const TYPE_PAY = 'PAY'                  // 페이 지출내역
const SUBTYPE_PAYMONEY = 'PAYMONEY'     // 페이 - 페이머니 지출내역
const SUBTYPE_PPAYCARD = 'PPAYCARD'     // 페이 - 선불카드 지출내역
const TYPE_PPAY = 'PPAY'                // 선불 결제내역
const TYPE_CASH = 'CASH'                // 기타 지출내역

export default {
    name : "CmmXpsDetailSearchV4",
    data: () => {
        return {
            TYPE_CARD,
            TYPE_PAY,
            SUBTYPE_PAYMONEY,
            SUBTYPE_PPAYCARD,
            TYPE_PPAY,
            TYPE_CASH,
            type            : "",       // 지출내역 종류
            subtype         : "",       // 지출내역 하위종류
            prcMchtnmCnd    : "",       // 가맹점명 검색조건
            cdTyCnd         : null,     // 카드종류 검색조건
            amCnd           : null,     // 결제금액 검색조건
            stsCnd          : null,     // 거래상태 검색조건
            stsCndAll       : "",       // 거래상태 전체
            stsCndApv       : "",       // 거래상태 승인코드
            stsCndCan       : "",       // 거래상태 취소코드
            // v4.0
            trDtCnd         : null,     // 내역정렬 검색조건
            inqStrDt        : "",       // 조회시작일자
            inqEndDt        : "",       // 조회종료일자
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
            console.log("initComponent() param ==>", param)
            this.type         = param.type
            this.subtype      = param.subtype
            this.inqStrDt     = param.inqStrDt
            this.inqEndDt     = param.inqEndDt
            this.prcMchtnmCnd = param.prcMchtnmCnd
            this.cdTyCnd      = param.cdTyCnd
            this.amCnd        = param.amCnd
            this.stsCnd       = param.stsCnd
            this.trDtCnd      = param.trDtCnd

            if(this.type == TYPE_PAY && this.subtype == SUBTYPE_PAYMONEY) {
                this.stsCndApv = '5501'
                this.stsCndCan = '5502'
            }

            if(this.type == TYPE_CARD || (this.type == TYPE_PAY && this.subtype == SUBTYPE_PPAYCARD)) {
                this.stsCndApv = '01'
                this.stsCndCan = '02'
            }

            this.$nextTick(() => {
                $(function(){
                    $("input[type='radio']:checked").siblings("label").attr("aria-checked", true)
                })
            })
        },
        // 조건검색
        search() {

            let tmpStrDt = this.inqStrDt.split("-").join("")
            let tmpEndDt = this.inqEndDt.split("-").join("")
            console.log("initComponent() tmpStrDt  ===================", tmpStrDt)
            console.log("initComponent() tmpEndDt  ===================", tmpEndDt)
            let diffDays = Number(dayDiff(dateFormat(tmpEndDt, 'YYYYMMDD'), tmpStrDt) + 1) // 남은일자
            console.log("initComponent() diffDays  ===================", diffDays)

            
            if (diffDays > 90){
                modalService.alert("조회기간은 최대 3개월까지 조회할수 있습니다.")
                return false;
            }

            let amCndLabel = this.$refs.amCndAll.innerText
            if(this.amCnd == 'desc') {
                amCndLabel = this.$refs.amCndDesc.innerText
            }else if(this.amCnd == 'asc') {
                amCndLabel = this.$refs.amCndAsc.innerText
            }

            let stsCndLabel = ""
            if(this.type != TYPE_CASH)
            {
                stsCndLabel = this.$refs.stsCndAll.innerText
                if(this.stsCnd == this.stsCndApv) {
                    stsCndLabel = this.$refs.stsCndApv.innerText
                }else if(this.stsCnd == this.stsCndCan) {
                    stsCndLabel = this.$refs.stsCndCan.innerText
                }
            }

            let trDtCndLabel = this.$refs.trDtCndDesc.innerText
            if(this.trDtCnd == 'desc') {
                trDtCndLabel = this.$refs.trDtCndDesc.innerText
            }else if(this.trDtCnd == 'asc') {
                trDtCndLabel = this.$refs.trDtCndAsc.innerText
            }      

            // 검색조건
            let params = {
                isSrch        : true,
                inqStrDt      : this.inqStrDt,
                inqEndDt      : this.inqEndDt,
                prcMchtnmCnd  : this.prcMchtnmCnd,
                amCnd         : this.amCnd,
                amCndLabel,
                stsCnd        : this.stsCnd,
                stsCndLabel,
                trDtCnd       : this.trDtCnd,
                trDtCndLabel
            }

            if(this.type == TYPE_CARD) {
                let cdTyCndLabel = this.$refs.cdTyCndAll.innerText
                if(this.cdTyCnd == '01') {
                    cdTyCndLabel = this.$refs.cdTyCndCrd.innerText
                }else if(this.cdTyCnd == '02') {
                    cdTyCndLabel = this.$refs.cdTyCndDbt.innerText
                }

                Object.assign(params, {
                    cdTyCnd : this.cdTyCnd,
                    cdTyCndLabel
                })
            }

            console.log("params@@@@@@@@@@@@@@@@",params)

            this.close(params)
        },

        // 달력
        fn_popupCalendar(evt, objNm) {
            let tmpDt = ""
            let minDate = ''
            let maxDate = ''

            console.log("evt1==> ", evt)
            console.log("objNm1==> ", objNm)

            if(objNm === "inqStrDt"){
                minDate = dateFormat(monthAdd(-12), 'YYYY-MM-DD')
                tmpDt = this.inqStrDt
            }else{
                if(this.inqStrDt !== undefined || this.inqStrDt !== null || this.inqStrDt !== ''){
                    minDate = dateFormat(this.inqStrDt , 'YYYY-MM-DD') 
                    console.log("minDate>>",minDate)   
                }else{
                    minDate = dateFormat(monthAdd(-12), 'YYYY-MM-DD')
                }  
                 tmpDt = this.inqEndDt  
            }
            maxDate = dateFormat(new Date(), 'YYYY-MM-DD')
            
            let config = {
                pDate   : tmpDt,
                minDate : minDate,
                maxDate : maxDate
            }            
            modalService.calendarPopup(config).then(response => {
                console.log("fn_popupCalendar response ==>",response)
                if(response !== undefined && response !== null && response !== '')
                {
                    console.log("evt2==> ", evt)
                    console.log("objNm2==> ", objNm)
                    
                    evt.target.value = dateFormat(response, "YYYY-MM-DD")

                    console.log("evt.target.value ==> ",evt.target.value)

                    if(objNm === 'inqStrDt'){
                        this.inqStrDt = evt.target.value
                        console.log("this.inqStrDt ==> ", this.inqStrDt)
                    }else{
                        this.inqEndDt = evt.target.value
                        console.log("this.inqEndDt ==> ", this.inqEndDt)
                    } 
                }
            })
		}        
    }
}
</script>
