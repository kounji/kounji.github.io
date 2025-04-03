<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 지출 > 지출분석
* @ 페이지설명 : 큰글모드 > 지출 > 지출분석
* @ 파일명     : src/views/page/LC/TA/LCTA4S08/LCTA4S08.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-18              CS541597              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click="close()"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup">
                <div class="popup_header">
                    <h1>지출분석</h1>
                </div>
                <div class="popup_content" v-show="showYn">
                    <section class="spend_analysis wallet_senior">
                        <div class="outline" :class="cusMmtpXpsOut.bmmCmprXpsAm > 0 ? 'up' : cusMmtpXpsOut.bmmCmprXpsAm < 0 ? 'down' : ''"><!--//늘었을 경우 up class 추가, 줄었을 경우 down class 추가-->
                            <h3>{{cusMmtpXpsOut.bmYm0}}월 지출</h3>
                            <div class="sum"><em>{{xpsAm0 | numberFilter}}</em>원</div>

                            <template v-if="cusMmtpXpsOut.bmmCmprXpsAm > 0">
                                <p class="txt">지난달보다 <span>{{Math.abs(cusMmtpXpsOut.bmmCmprXpsAm) | numberFilter}}원</span> <em>더 쓰고 있어요.</em></p>
                            </template>
                            <template v-if="cusMmtpXpsOut.bmmCmprXpsAm < 0">
                                <p class="txt">지난달보다 <span>{{Math.abs(cusMmtpXpsOut.bmmCmprXpsAm) | numberFilter}}원</span> <em>덜 쓰고 있어요.</em></p>
                            </template>
                            <template v-if="cusMmtpXpsOut.bmmCmprXpsAm == 0">
                                <p class="txt">지난달과 지출이 <em>동일해요.</em></p>
                            </template>
                        </div>

                        <dl class="gray_box">
                            <div>
                                <dt>가장 많은 지출</dt>
                                <dd>{{stlXpsOut.topIndTypNm}}</dd>
                            </div>
                            <div>
                                <dt>지난달 대비</dt>
                                <dd>
                                    <span class="range up" v-if="stlXpsOut.indDsc == '1'"></span>
                                    <span class="range down" v-if="stlXpsOut.indDsc == '2'"></span>
                                    <span class="range" v-if="stlXpsOut.indDsc == '3'"></span>
                                    {{Math.abs(stlXpsOut.bmmCmprXpsAm) | numberFilter}}원
                                </dd>
                            </div>
                        </dl>

                        
                        <div class="chart">
                            <h4 class="blind">지출분석</h4>
                            <h5 class="blind">비율별</h5>

                            <ul class="by_percent">
                                <li v-if="Math.round(stlXpsOut.cardXpsRto,0) > 0" class="card" :class="Math.round(stlXpsOut.cardXpsRto,0) > 0 ? 'up' : ''" :style="'width:'+Math.round(stlXpsOut.cardXpsRto,0)+'%'"><span class="blind">카드</span><span class="ratio"><em>{{Math.round(stlXpsOut.cardXpsRto,0)}}</em>%</span></li>
                                <li v-if="Math.round(stlXpsOut.payXpsRto,0) > 0" class="pay" :class="Math.round(stlXpsOut.payXpsRto,0) > 0 ? 'up' : ''" :style="'width:'+Math.round(stlXpsOut.payXpsRto,0)+'%'"><span class="blind">페이</span><span class="ratio"><em>{{Math.round(stlXpsOut.payXpsRto,0)}}</em>%</span></li>
                                <li v-if="Math.round(stlXpsOut.cshXpsRto,0) > 0" class="cash" :class="Math.round(stlXpsOut.cshXpsRto,0) > 0 ? 'up' : ''" :style="'width:'+Math.round(stlXpsOut.cshXpsRto,0)+'%'"><span class="blind">현금</span><span class="ratio"><em>{{Math.round(stlXpsOut.cshXpsRto,0)}}</em>%</span></li>
                            </ul>

                            <h5 class="blind">금액별</h5>
                            
                            <ul class="by_amount">
                                <li class="card" :class="stlXpsOut.cardXpsAm > 0 ? 'up' : ''">카드<span>{{stlXpsOut.cardXpsAm | numberFilter}}원</span></li>
                                <li class="pay" :class="stlXpsOut.payXpsAm > 0 ? 'up' : ''">페이<span>{{stlXpsOut.payXpsAm | numberFilter}}원</span></li>
                                <li class="cash" :class="stlXpsOut.cshXpsAm > 0 ? 'up' : ''">현금<span>{{stlXpsOut.cshXpsAm | numberFilter}}원</span></li>
                            </ul>

                        </div>

                    </section>
                </div>

                <div class="popup_footer">
                    <div class="btn_group">
                        <button type="button" class="btns lg primary" @click="close()">확인</button>
                    </div>
                </div>

                <a href="javascript:void(0);" class="btn_close" @click="close()"><span class="">닫기</span></a>
            </div>
        </div>
        <!-- slide popup E -->
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import {dateFormat, monthAdd} from '@/utils/date'
import {numberFormat} from '@/utils/number'

export default {
    name : "LCTA4S08",
    data: () => {
        return {
            cusNb: '',              // 마이데이터고객번호
            cusnm: '',              // 고객명
        
            /*------------------------------------------*/
            cusMmtpXpsOut 	: '', 	// 고객 월별 지출
            xpsAm0      	: 0 ,   // 당월지출금액
            /*------------------------------------------*/
            stlXpsOut 		: '',	// 결제수단별
            /*------------------------------------------*/
            showYn          : false,// 데이터 조회 완료 시 화면 표시구분
        }
    },
    computed : {
    },
    created() {
        this.cusNb = this.getUserInfo("mydtCusno")
        this.cusnm = this.getUserInfo("cusnm")
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param) {
            this.basDt = param.basDt

            this.getData()
        },
        /*
         * 데이터 조회
         */
        getData() {
            console.log("getData===============================================")

            const config = {
                url: '/lc/ip/01r02', // 인터페이스ID: IF-MOB-PFM-LCIP01R02, 서비스코드: PFMLCIP01R02
                data: {
                    "mydtCusno" : this.cusNb,
                    "basDt" : this.basDt
                }
            }
            apiService.call(config).then(response =>{
                console.log('response', JSON.parse(JSON.stringify(response)))
                
                this.cusMmtpXpsOut 	= response.cusMmtpXpsOut
                this.xpsAm0      	= response.cusMmtpXpsOut?.xpsAm0 || 0     // 당월

                this.stlXpsOut = response.stlXpsOut         // 결제수단별

                this.showYn = true
            })
        },
        /**
         * 금액 한글포맷
         */
        fn_numberFormatKorAmt(number) {
            const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length

            let resultArray = []
            let resultString = ""

            for(let i = 0; i < splitCnt; i++){
                let rst = (number % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
                rst = Math.floor(rst)

                if(rst > 0){
                    resultArray[i] = rst
                }
            }

            let strIdx = 0  // 최초시작지점에 '원' 추가가히위함

            for(let j = 0; j < resultArray.length; j++){
                if(!resultArray[j])  {
                    strIdx++
                    continue
                }

                if (j === strIdx) {
                    resultString = String(numberFormat(resultArray[j])) + unit[j] + '원' + resultString
                } else {
                    resultString = String(numberFormat(resultArray[j])) + unit[j] + resultString
                }
            }

            return resultString
        },
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>