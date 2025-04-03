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
        <div class="dimmed" style="display:block;"></div>
        <div class="popup_box">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01">
            <div class="popup_header">
                <h1>조건 검색</h1>
            </div>
            <div class="popup_content com_btn_bottom">


                <div class="btn_radio_wrap mt0">
                    <strong class="titH5">조회기간</strong>

                    <div class="com_inputnum2 input_date">
                        <div class="com_input_type01" role="button" >
                            <input type="text" id="startDate_1" class="input_cal_date" name="startDate" v-model="stDt" @click.prevent="fn_popupCalendar($event, 'stDt')" required="" readonly placeholder="년월일 8자리숫자" title="기간 시작일">
                        </div>
                        <div class="com_input_type01" role="button">
                            <input type="text" id="endDate_1" class="input_cal_date" name="endDate" v-model="edDt"  @click.prevent="fn_popupCalendar($event, 'edDt')" required="" readonly placeholder="년월일 8자리숫자" title="기간 종료일">
                        </div>
                    </div>
                </div>

                <div class="btn_radio_wrap mt30">
					<strong class="titH5">가맹점</strong>
					<div class="com_input_type01 mt0">
						<label for="com_input01"></label>
						<input type="search" id="com_input01" class="" name="" v-model="mchtNm" placeholder="가맹점명을 입력하세요" title="가맹점 찾기"><div class="lineEF"></div>
						<a href="javascript:void(0);" class="com_btn_delete" role="button" style="display: none;"><span class="blind">삭제</span></a>
					</div>
				</div>

                <div class="btn_radio_wrap">
                    <strong class="titH5">지출수단</strong>
                    <ul class="com_radio_type03">
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="radio2" id="radio2-1" v-model="xpsMns" value="1" :checked="xpsMns==='1'" aria-hidden="true">
                                <label for="radio2-1" aria-checked="false" role="radio">
                                    <span>전체</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="radio2" id="radio2-2" v-model="xpsMns" value="2" :checked="xpsMns==='2'" aria-hidden="true">
                                <label for="radio2-2" aria-checked="false" role="radio">
                                    <span>신용카드</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="radio2" id="radio2-3" v-model="xpsMns" value="3" :checked="xpsMns==='3'" aria-hidden="true">
                                <label for="radio2-3" aria-checked="false" role="radio">
                                    <span>체크카드</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="radio2" id="radio2-4" v-model="xpsMns" value="4" :checked="xpsMns==='4'" aria-hidden="true">
                                <label for="radio2-4" aria-checked="false" role="radio">
                                    <span>이체</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="radio2" id="radio2-5" v-model="xpsMns" value="5" :checked="xpsMns==='5'" aria-hidden="true">
                                <label for="radio2-5" aria-checked="false" role="radio">
                                    <span>페이머니</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="radio2" id="radio2-6" v-model="xpsMns" value="6" :checked="xpsMns==='6'" aria-hidden="true">
                                <label for="radio2-6" aria-checked="false" role="radio">
                                    <span>선불카드</span>
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
                                <input type="radio" name="radio3" id="radio3-1" v-model="stlAm" value="1" :checked="stlAm==='1'" aria-hidden="true">
                                <label for="radio3-1" aria-checked="false" role="radio">
                                    <span>전체</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="radio3" id="radio3-2" v-model="stlAm" value="2" :checked="stlAm==='2'" aria-hidden="true">
                                <label for="radio3-2" aria-checked="false" role="radio">
                                    <span>높은순</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="radio3" id="radio3-3" v-model="stlAm" value="3" :checked="stlAm==='3'" aria-hidden="true">
                                <label for="radio3-3" aria-checked="false" role="radio">
                                    <span>낮은순</span>
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
                                <input type="radio" name="radio4" id="radio4-1" v-model="trStsc" value="1" :checked="trStsc==='1'" aria-hidden="true">
                                <label for="radio4-1" aria-checked="false" role="radio">
                                    <span>전체</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="radio4" id="radio4-2" v-model="trStsc" value="2" :checked="trStsc==='2'" aria-hidden="true">
                                <label for="radio4-2" aria-checked="false" role="radio">
                                    <span>결제(승인)</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="radio4" id="radio4-3" v-model="trStsc" value="3" :checked="trStsc==='3'" aria-hidden="true">
                                <label for="radio4-3" aria-checked="false" role="radio">
                                    <span>취소</span>
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
                                <input type="radio" name="radio5" id="radio5-1" v-model="brkSort" value="1" :checked="brkSort==='1'" aria-hidden="true">
                                <label for="radio5-1" aria-checked="false" role="radio">
                                    <span>최신순</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="radio5" id="radio5-2" v-model="brkSort" value="2" :checked="brkSort==='2'" aria-hidden="true">
                                <label for="radio5-2" aria-checked="false" role="radio">
                                    <span>오래된순</span>
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="popup_footer">
				<div class="btn_group">
					<a href="javascript:void(0);" class="btn btn_mint" role="button"  @click.prevent="fn_search()">조회</a>
				</div>
			</div>
            <a href="#nolink" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
        </div>
		
	</div>
        <!--// slide popup E -->
    </div>
</template>
<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import {dateFormat,monthAdd} from '@/utils/date' // monthAdd

export default {
    name : "LCFD4008",
    data: () => {
        return {
            stDt    : "",   // 시작일자
            edDt    : "",   // 종료일자
            mchtNm  : "",   // 가맹점명
            xpsMns  : "1",  //지출수단
            stlAm   : "1",  //결제금액
            trStsc  : "1",  //거래상태
            brkSort : "1"  //내역정렬
        }
    },
    mixins: [
        popupMixin
    ],
    methods: {
        // 팝업화면 초기화
        initComponent() {
            this.stDt = this.params.stDt             
            this.edDt = this.params.edDt
            this.mchtNm =   this.params.mchtNm
            this.xpsMns =   this.params.xpsMns
            this.stlAm =   this.params.stlAm
            this.trStsc =   this.params.trStsc
            this.brkSort =   this.params.brkSort
        },
        // 달력
        fn_popupCalendar(evt, objNm) {
            let tmpDt = ""
            let minDate = ''
            let maxDate = ''
            if(objNm === "stDt"){
                minDate = dateFormat(monthAdd(-12), 'YYYY-MM-DD')
            }else{
                if(this.stDt !== undefined || this.stDt !== null || this.stDt !== ''){
                    minDate = dateFormat(this.stDt , 'YYYY-MM-DD') 
                    console.log("minDate>>",minDate)   
                }else{
                    minDate = dateFormat(monthAdd(-12), 'YYYY-MM-DD')
                }    
            }
            maxDate = dateFormat(new Date(), 'YYYY-MM-DD')
            
            let config = {
                pDate   : tmpDt,
                minDate : minDate,
                maxDate : maxDate
            }
            
            modalService.calendarPopup(config).then(response => {
                if(response !== undefined && response !== null && response !== '')
                {
                    evt.target.value = dateFormat(response, "YYYY-MM-DD")
                    
                        if(objNm === 'stDt'){
                            this.stDt = evt.target.value
                        }else{
                            this.edDt = evt.target.value
                        }
                    
                }
            })
		}
        ,
        // 조회
        fn_search() {
            console.log("this.xpsMns>>>",this.xpsMns)
            this.close({
                stDt : this.stDt,
                edDt : this.edDt,
                mchtNm : this.mchtNm,
                xpsMns : this.xpsMns,
                stlAm : this.stlAm,
                trStsc : this.trStsc,
                brkSort : this.brkSort,
            })
		}
    },
    mounted() {
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },

}
</script>