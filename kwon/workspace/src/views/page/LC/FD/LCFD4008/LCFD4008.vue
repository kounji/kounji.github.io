<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 금융달력
* @ 페이지설명 : 지출 > 금융달력 > 거래내역조회
* @ 파일명     : src/views/page/LC/FD/LCFD4008/LCFD4008.vue
* @ 작성자     : CS541017
* @ 작성일     : 2025-01-10
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-01-10              CS541017              최초작성
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

                    <div class="btn_radio_wrap mt30">
                        <strong class="titH5">가맹점</strong>
                        <div class="com_input_type01 mt0">
                            <label for="com_input01"></label>
                            <input v-model="mchtnmCnd" type="search" id="com_input01" class="" name="" value="" placeholder="가맹점명을 입력하세요" title="가맹점 찾기"><div class="lineEF"></div>
                            <a href="javascript:void(0);" class="com_btn_delete"><span class="blind">삭제</span></a>
                        </div>
                    </div>

                    <div class="btn_radio_wrap mt30">
                        <strong class="titH5">지출수단</strong>
                        <ul class="com_radio_type03">
                            <li>
                                <div class="btn_radio">
                                    <input v-model="xpsMnsCnd" type="radio" name="xpsMnsCnd" value="" id="radio1-1">
                                    <label for="radio1-1" :aria-checked="xpsMnsCnd ==''" >
                                        <span ref="xpsMnsCndAll">전체</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="xpsMnsCnd" type="radio" name="xpsMnsCnd" value="02" id="radio1-2">
                                    <label for="radio1-2" :aria-checked="xpsMnsCnd =='02'" >
                                        <span ref="xpsMnsCnd02">신용카드</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="xpsMnsCnd" type="radio" name="xpsMnsCnd" value="03" id="radio1-3">
                                    <label for="radio1-3" :aria-checked="xpsMnsCnd =='03'" >
                                        <span ref="xpsMnsCnd03">체크카드</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="xpsMnsCnd" type="radio" name="xpsMnsCnd" value="01" id="radio1-4">
                                    <label for="radio1-4" :aria-checked="xpsMnsCnd =='01'" >
                                        <span ref="xpsMnsCnd01">이체</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="xpsMnsCnd" type="radio" name="xpsMnsCnd" value="04" id="radio1-5">
                                    <label for="radio1-5" :aria-checked="xpsMnsCnd =='04'" >
                                        <span ref="xpsMnsCnd04">페이머니</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="xpsMnsCnd" type="radio" name="xpsMnsCnd" value="06" id="radio1-6">
                                    <label for="radio1-6" :aria-checked="xpsMnsCnd =='06'" >
                                        <span ref="xpsMnsCnd06">선불카드</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="btn_radio_wrap">
                        <strong class="titH5">결제금액</strong>
                        <ul class="com_radio_type03">
                            <li>
                                <div class="btn_radio">
                                    <input v-model="amCnd" type="radio" name="amCnd" value="" id="radio3-1">
                                    <label for="radio3-1" :aria-checked="amCnd == ''">
                                        <span ref="amCndAll">전체</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="amCnd" type="radio" name="amCnd" value="desc" id="radio3-2">
                                    <label for="radio3-2" :aria-checked="amCnd == 'desc'">
                                        <span ref="amCndDesc">높은순</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="amCnd" type="radio" name="amCnd" value="asc" id="radio3-3">
                                    <label for="radio3-3" :aria-checked="amCnd == 'asc'">
                                        <span ref="amCndAsc">낮은순</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="btn_radio_wrap">
                        <strong class="titH5">거래상태</strong>
                        <ul class="com_radio_type03">
                            <li>
                                <div class="btn_radio">
                                    <input v-model="stsCnd" type="radio" name="stsCnd" value="" id="radio4-1">
                                    <label for="radio4-1" :aria-checked="stsCnd == ''">
                                        <span ref="stsCndAll">전체</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="stsCnd" type="radio" name="stsCnd" value="01" id="radi4-2">
                                    <label for="radi4-2" :aria-checked="stsCnd == '01'">
                                        <span ref="stsCndApv">결제(승인)</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input v-model="stsCnd" type="radio" name="stsCnd" value="02" id="radio4-3">
                                    <label for="radio4-3" :aria-checked="stsCnd == '02'">
                                        <span ref="stsCndCan">취소</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
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
                </div>              
                <div class="popup_footer">
                    <div class="btn_group">
                        <a href="javascript:void(0);" class="btn btn_mint" role="button" @click.prevent="fn_search()">조회</a>
                    </div>
                </div>
                <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
            </div>		
	    </div>
        <!--// slide popup E -->
    </div>
</template>
<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import {dateFormat,monthAdd} from '@/utils/date' // monthAdd

export default {
    name : "LCFD4008",
    data: () => {
        return {
            inqStrDt    : "",       // 시작일자
            inqEndDt    : "",       // 종료일자
            mchtnmCnd   : "",       // 가맹점명
            xpsMnsCnd   : null,     // 지출수단
            amCnd       : null,     // 결제금액
            stsCnd      : null,     // 거래상태
            trDtCnd     : null,     // 내역정렬
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        // 팝업화면 초기화
        initComponent(param) {
            this.inqStrDt   = param.inqStrDt             
            this.inqEndDt   = param.inqEndDt
            this.mchtnmCnd  = param.mchtnmCnd
            this.xpsMnsCnd  = param.xpsMnsCnd
            this.amCnd      = param.amCnd
            this.stsCnd     = param.stsCnd
            this.trDtCnd    = param.trDtCnd

            this.$nextTick(() => {
                $(function(){
                    $("input[type='radio']:checked").siblings("label").attr("aria-checked", true)
                })
            })

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
                    if(objNm === 'inqStrDt'){
                        this.inqStrDt = evt.target.value
                    }else{
                        this.inqEndDt = evt.target.value
                    }                    

                }
            })
		}
        ,
        // 조회
        fn_search() {

            if (this.inqStrDt == '') {
				modalService.alert("조회시작일자는 필수입니다.")
    			return false             
            }

            if (this.inqEndDt == '') {
				modalService.alert("조회종료일자는 필수입니다.")
    			return false    
            }


            let strDt = monthAdd(-3, this.inqEndDt.split(".").join(""), 'YYYYMMDD')

            if (strDt > this.inqStrDt.split(".").join("")) {
                modalService.alert("조회기간은 최대 3개월까지 조회할수 있습니다.")
				return false
            }

            let amCndLabel = this.$refs.amCndAll.innerText
            if(this.amCnd == 'desc') {
                amCndLabel = this.$refs.amCndDesc.innerText
            }else if(this.amCnd == 'asc') {
                amCndLabel = this.$refs.amCndAsc.innerText
            }

            let stsCndLabel = this.$refs.stsCndApv.innerText
            if(this.stsCnd == this.stsCndApv) {
                stsCndLabel = this.$refs.stsCndApv.innerText
            }else if(this.stsCnd == this.stsCndCan) {
                stsCndLabel = this.$refs.stsCndCan.innerText
            }

            let xpsMnsCndLabel = this.$refs.xpsMnsCndAll.innerText
            if(this.xpsMnsCnd == '') {
                xpsMnsCndLabel = this.$refs.xpsMnsCndAll.innerText
            }else if(this.xpsMnsCnd == '01') {
                xpsMnsCndLabel = this.$refs.xpsMnsCnd01.innerText
            }else if(this.xpsMnsCnd == '02') {
                xpsMnsCndLabel = this.$refs.xpsMnsCnd02.innerText
            }else if(this.xpsMnsCnd == '03') {
                xpsMnsCndLabel = this.$refs.xpsMnsCnd03.innerText
            }else if(this.xpsMnsCnd == '04') {
                xpsMnsCndLabel = this.$refs.xpsMnsCnd04.innerText
            }else if(this.xpsMnsCnd == '06') {
                xpsMnsCndLabel = this.$refs.xpsMnsCnd06.innerText
            }         
            
            let trDtCndLabel = this.$refs.trDtCndDesc.innerText
            if(this.trDtCnd == 'desc') {
                trDtCndLabel = this.$refs.trDtCndDesc.innerText
            }else if(this.trDtCnd == 'asc') {
                trDtCndLabel = this.$refs.trDtCndAsc.innerText
            }

            // 검색조건
            let params = {
                inqYn       : "1",
                inqStrDt    : this.inqStrDt,
                inqEndDt    : this.inqEndDt,
                mchtnmCnd   : this.mchtnmCnd,
                xpsMnsCnd   : this.xpsMnsCnd,
                xpsMnsCndLabel,
                amCnd       : this.amCnd,
                amCndLabel,
                stsCnd      : this.stsCnd,
                stsCndLabel,
                trDtCnd     : this.trDtCnd,
                trDtCndLabel,
            }
            
            console.log("params >>>",params)

            this.close(params)
            
            // this.close({
            //     inqStrDt  : this.inqStrDt,
            //     inqEndDt  : this.inqEndDt,
            //     mchtNmCnd : this.mchtNmCnd,
            //     xpsMnscnd : this.xpsMnscnd,
            //     amCnd     : this.amCnd,
            //     stsCnd    : this.stsCnd,
            //     trDtCnd  : this.trDtCnd,
            // })
		}
    },
}
</script>