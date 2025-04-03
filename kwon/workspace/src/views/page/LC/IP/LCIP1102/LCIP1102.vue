<!--
/*************************************************************************
* @ 서비스경로 : 가계부 > 분석 > 카테고리별 지출 통합목록
* @ 페이지설명 : 가계부 > 분석 > 카테고리별 지출 통합목록
* @ 파일명     : src/views/page/LC/IP/LCIP1102/LCIP1102.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-05-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-26              CS516029                 최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
    <div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>카테고리별 지출 통합</h1>
		</div>

        <div class="popup_content com_space_bottom" :class="ctgrList.length == 0 ? 'com_bg_type02' : 'com_bg_type00'">
            <div class="top_graph_info com_line_type01">
                <div class="top_info_box">
                    <div class="com_inner mt20">
                        <div class="select_date">
                            <button class="cal_btn cal_prev" :class="monPrev ? '' : 'disabled'" aria-label="한달 전 이동" @click.prevent="fn_moveMonth('P')"></button>
                            <a title="년월선택" class="year_month" href="javascript:void(0);" @click.prevent="openSlideMonthPop">
                                <span class="num">{{basYy}}</span>년 <span class="num">{{basMm}}</span>월
                            </a>
                            <button class="cal_btn cal_next" :class="monNext ? '' : 'disabled'" aria-label="한달 후 이동" @click.prevent="fn_moveMonth('N')"></button>
                        </div>
                    </div>
                    
                    <p class="subtxt" v-if="ctgrList.length > 0">
                        <template v-if="curYm == basYm">
                            1일 부터 당일까지
                        </template>
                        <template v-else><!-- 당월이 아닌경우 -->
                            1일 부터 말일까지
                        </template>
                    </p>
                    <div class="bill" v-if="ctgrList.length > 0">
                        <!-- <span id="xpsTtAm" class="num counter" :data-count="xpsTtAm"></span>원 -->
                        <span id="xpsTtAm" class="num counter">{{xpsTtAm | numberFilter}}</span><span class="fs22 bold">원</span>을 
                        <template v-if="curYm == basYm">
                            소비 중이네요.
                        </template>
                        <template v-else><!-- 당월이 아닌경우 -->
                            소비 했어요.
                        </template>
                    </div>

                    <!--
                    <div class="no_data_box" v-if="ctgrList.length == 0">
                        <div class="no_data_list">
                            <p>조회된 정보가 없습니다.</p>
                        </div>
                    </div>
                    -->
                   
                    <div class="graph_box" :style="chartShowHide">
                        <div class="graph_wrap_donut">
                            <!-- 차트가 삽입될 DIV -->
                            <div id="chartHolderLCIP1102" aria-hidden="true"></div>
                            <!-- 차트가 삽입될 DIV -->
                        </div>
                        <ul class="list">
                            <li :class="setChartCss(index)" v-for="(ctgrChartInfo, index) in ctgrChartList" :key="index">{{ctgrChartInfo.xpsCtgrnm}}</li>
                            <!--
                            <li class="bl_green">주거</li>
                            <li class="bl_purple">금융/보험</li>
                            <li class="bl_yellow">세금/공과금</li>
                            <li class="bl_blue">온라인</li>
                            <li class="bl_orange">자동차</li>
                            <li class="bl_pink">식비</li>
                            <li class="bl_red">생활/마트</li>
                            <li class="bl_aqua">그외</li>
                            -->
                        </ul>
                    </div>
                </div>
            </div>

            <template v-if="ctgrList.length > 0">
                <ul class="list_more_box">
                    <template v-for="(ctgrInfo, idx1) in ctgrList">
                        <li :key="idx1">
                            <div class="com_inner">
                                <div class="new_tit_area">
                                    <div class="tit"><span>{{ctgrInfo.xpsCtgrnm}}</span></div>
                                    <div class="total_price">
                                        <span>합계</span>
                                        <em class="num">{{ctgrInfo.xpsTtAm | numberFilter}}</em>
                                        <em class="unit">원</em>
                                    </div>
                                </div>
                                <ul class="list_type_02">
                                    <template v-for="(ctgrXpsBrkInfo, idx2) in ctgrXpsBrkList" :data="ctgrXpsBrkInfo">
                                        <li :key="idx2" v-if="ctgrXpsBrkInfo.xpsCtgrId == ctgrInfo.xpsCtgrId"><!-- 동일한 카테고리ID일 경우 -->
                                            <dl>
                                                <dt>
                                                    <strong>{{ctgrXpsBrkInfo.trDt | dateFilter('D일')}}</strong>
                                                    <div v-if="ctgrXpsBrkInfo.prcMchtnm">
                                                        <em>{{ctgrXpsBrkInfo.prcMchtnm}}</em>
                                                    </div>
                                                    <span v-if="ctgrXpsBrkInfo.cdcoCdWrsnm"><span>{{ctgrXpsBrkInfo.cdcoCdWrsnm}}</span></span>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="num">{{ctgrXpsBrkInfo.tram | numberFilter}}</em>
                                                        <em class="unit">원</em>
                                                    </span>
                                                </dd>
                                            </dl>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                            <div class="com_space_type01" :key="'info-' + idx1"></div>
                        </li>
                    </template>
                </ul>
            </template>
            <template v-else>
                <div class="no_data_box">
                    <div class="no_data_list">
                        <p>조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </template>
        </div>
		
        <a v-on:click.prevent="close()" class="btn_close" href="javascript:void(0);"><span class="blind">팝업닫기</span></a>
	</div>
    <!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import {dateFormat, getMonthPeriod, monthAdd} from '@/utils/date'
//import {amountCountAnimate} from '@/utils/jUtils'

export default {
    name : "LCIP1102",
    data: () => {
        return {
            // parameter
            useMonthList: [], // 사용 가능한 년월 리스트 [YYYYMM]
            basYm: null,      // 조회 기준 년월 YYYYMM
            basYy: null,      // 조회 기준 년도 YYYY
            basMm: null,      // 조회 기준 월   MM
            curYm: null,      // 당월

            // return info
            xpsTtAm        : 0,  // 지출합계금액
            ctgrList       : [], // 카테고리별지출실적목록
            ctgrXpsBrkList : [], // 카테고리별지출내역목록
            ctgrChartList  : [], // 카테고리별지출내역(차트)

            chartShowHide:{}, // 차트 show hide

            includeCurYmYn:"", // 현재월포함여부

            monPrev : false, // 이전달 조회
            monNext : false  // 다음달 조회
        }
    },
    computed: {

    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [ 
        popupMixin
       ,commonMixin
    ],
    methods: {
        initComponent(param) {

            this.basYm = dateFormat(param.pBasYm, 'YYYYMM'); // 지난달
            this.basYy = dateFormat(this.basYm, "YYYY");
            this.basMm = dateFormat(this.basYm, "M");
            this.curYm = dateFormat(new Date(), 'YYYYMM')
            this.useMonthList = this.getUseMonthList(this.basYm);

            this.includeCurYmYn = param.includeCurYmYn || 'N' // 현재월포함여부(타화면에서 현재월포함되는 경우가 존재)

            this.getData();
        },
        getData() {

            this.xpsTtAm        = 0  // 지출합계금액
            this.ctgrList       = [] // 카테고리별지출실적목록
            this.ctgrXpsBrkList = [] // 카테고리별지출내역목록
            this.ctgrChartList  = [] // 카테고리별지출내역(차트)

            const config = {
                url: '/lc/ip/02r01',
                data: {//"mydtCusno": "MYDTCUST01234567890" /* 마이데이터고객번호 */
                      "mydtCusno": this.getUserInfo('mydtCusno') // 마이데이터고객번호
                      ,"rzsBasYm" : this.basYm                       /* 실적기준년월 */
                      ,"xpsDgsInqDsc" : "2"                          /* 지출진단조회구분코드 ==> 1: 현황, 2:카테고리별, 3:거래처별, 4:고정지출, 5: 변동지출 */
                      }
            };
            
            apiService.call(config).then(response => {

                this.respInfo = response;

                this.xpsTtAm        = this.respInfo.xpsTtAm || 0         // 지출합계금액
                this.ctgrList       = this.respInfo.ctgrList || []       // 카테고리별지출실적목록
                this.ctgrXpsBrkList = this.respInfo.ctgrXpsBrkList || [] // 카테고리별지출내역목록

                if(this.ctgrXpsBrkList.length > 0) {
                    for(let i =0; i < this.ctgrXpsBrkList.length; i ++) {

                        let prcMchtnm   = this.ctgrXpsBrkList[i].prcMchtnm   || '' 
                        let cdcoCdWrsnm = this.ctgrXpsBrkList[i].cdcoCdWrsnm || ''

                        prcMchtnm = prcMchtnm.trim()
                        cdcoCdWrsnm = cdcoCdWrsnm.trim()

                        this.ctgrXpsBrkList[i].prcMchtnm = prcMchtnm
                        this.ctgrXpsBrkList[i].cdcoCdWrsnm = cdcoCdWrsnm
                    }
                }

                let sumAmSgrt = 0 // 그외비율

                if(this.ctgrList.length > 0) {
                    for(let i=0; i<this.ctgrList.length; i++){

                        if(i >= 0 && i <= 6) {
                            this.ctgrChartList.push(this.ctgrList[i])
                        } else {
                            // 그외 비율
                            sumAmSgrt += this.ctgrList[i].amSgrt
                        }
                    }
                }

                // 조회된 카테고리갯수가 8개 이상일경우(그외로 표기)
                if(this.ctgrList.length >= 8) {
                    let inputObj = {}
                    inputObj.xpsCtgrnm = "이외"
                    inputObj.amSgrt = sumAmSgrt

                    this.ctgrChartList.push(inputObj)
                }

                //amountCountAnimate("xpsTtAm", this.xpsTtAm)

                // 차트 그리기
                setTimeout(this.getChart(), 10)
                
                // 다음달 조회
                let maxMonth
                if(this.includeCurYmYn == 'Y') { // 현재월포함여부가 Y인경우
                    maxMonth = dateFormat(new Date(), 'YYYYMM');
                } else {
                    maxMonth = dateFormat(monthAdd(-1), 'YYYYMM');
                }
                 
                if (this.basYm < maxMonth) {
                    this.monNext = true
                } else {
                    this.monNext = false
                }

                // 이전달 조회
                let minMonth = dateFormat(monthAdd(-12), 'YYYYMM');
                if (this.basYm > minMonth) {
                    this.monPrev = true
                } else {
                    this.monPrev = false
                }
            });
        },
        // 차트CSS
        setChartCss(index) {

            let cssNm // css명

            if(index == '0') {
                cssNm = 'bl_darkcyan'
            } else if(index == '1') {
                cssNm = 'bl_lightcyan'
            } else if(index == '2') {
                cssNm = 'bl_sky'
            } else if(index == '3') {
                cssNm = 'bl_blue'
            } else if(index == '4') {
                cssNm = 'bl_aqua'
            } else if(index == '5') {
                cssNm = 'bl_red'
            } else if(index == '6') {
                cssNm = 'bl_orange'
            } else if(index == '7') {
                cssNm = 'bl_pink'
            }
            return cssNm
        },
        getChart() {

            // rMateChart 를 생성합니다.
            // 파라메터 (순서대로)
            //  1. 차트의 id ( 임의로 지정하십시오. )
            //  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
            //  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
            //  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
            //  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
            //this.chartShowHide = {"display":""}
            rMateChartH5.create("chart1", "chartHolderLCIP1102", "useContextMenu=false", "100%", "250rem");

            // 차트 데이터
            var chartData = []

            var chartCurcleColorStr = '';

            if(this.ctgrChartList.length > 0) {
                for(let i=0; i<this.ctgrChartList.length; i++){
                    if(i == 0) {
                        chartCurcleColorStr += '<SolidColor color="#0b9ba0"/>'
                    } else if(i == 1) {
                        chartCurcleColorStr += '<SolidColor color="#57c9ae"/>'
                    } else if(i == 2) {
                        chartCurcleColorStr += '<SolidColor color="#78a9ff"/>'
                    } else if(i == 3) {
                        chartCurcleColorStr += '<SolidColor color="#4f80e2"/>'
                    } else if(i == 4) {
                        chartCurcleColorStr += '<SolidColor color="#a3ead6"/>'
                    } else if(i == 5) {
                        chartCurcleColorStr += '<SolidColor color="#f9637c"/>'
                    } else if(i == 6) {
                        chartCurcleColorStr += '<SolidColor color="#fbb45c"/>'
                    } else if(i == 7) {
                        chartCurcleColorStr += '<SolidColor color="#f091d8"/>'
                    }

                    // 차트 표현 데이터 삽입
                    let inputObj = {}
                    inputObj.XpsCtgrNm = this.ctgrChartList[i].xpsCtgrnm
                    inputObj.Profit = this.ctgrChartList[i].amSgrt
                    chartData.push(inputObj)
                }

                // 스트링 형식으로 레이아웃 정의.
                var layoutStr =
                                '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
                                    
                                    +'<Pie2DChart innerRadius="0.55" showDataTips="true" selectionMode="single">'
                                /*
                                Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
                                showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
                                innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
                                */
                                        +'<series>'
                                            +'<Pie2DSeries nameField="XpsCtgrNm" field="Profit" startAngle="-90" renderDirection="clockwise" color="#fff">'
                                                +'<fills>'
                                                    + chartCurcleColorStr
                                                    //+'<SolidColor color="#26bd26"/>'
                                                    //+'<SolidColor color="#7e00e9"/>'
                                                    //+'<SolidColor color="#ffd75c"/>'
                                                    //+'<SolidColor color="#027ae9"/>'
                                                    //+'<SolidColor color="#ff9600"/>'
                                                    //+'<SolidColor color="#ff5ca1"/>'
                                                    //+'<SolidColor color="#ff0048"/>'
                                                    //+'<SolidColor color="#07e6c9"/>'
                                                +'</fills>'
                                            /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
                                                +'<showDataEffect>'
                                                /* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                                                    +'<SeriesZoom duration="500" offset="500" relativeTo="chart" horizontalFocus="right" />'
                                /*
                                SeriesZoom 효과는 시리즈 데이터가 데이터로 표시될 때 특정 지점에서 점점 확대되어지며 나타나는 효과를 적용합니다
                                - 공통속성 -
                                elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
                                minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
                                            이 값보다 짧은 시간에 effect가 실행되지 않습니다
                                offset : effect개시의 지연시간을 설정합니다 default:0
                                perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
                                - SeriesZoom속성 -
                                relativeTo : 이펙트의 기준을 어디로 잡을지에 대한 속성입니다. 유효값 : chart, series
                                horizontalFocus : relativeTo를 기준으로 수평선 방향의 기준을 정합니다. 유효값 : left, center, right
                                verticalFocus : relativeTo를 기준으로 수직선 방향의 기준을 정합니다. 유효값 : top, middle, bottom
                                */
                                                +'</showDataEffect>'
                                            +'</Pie2DSeries>'
                                        +'</series>'
                                        +'<backgroundElements>'

                                        +'</backgroundElements>'
                                    +'</Pie2DChart>'
                                +'</rMateChart>';
                

                // 차트에 최대8개만 표기
                // 조회된 카테고리가 8개 이상일 경우에는 
                // 비율이 높은순으로 7개 표기후 나머지는 그외로 표기

                /*
                var chartData = [
                                    {"XpsCtgrNm":"주거"        , "Profit":50},
                                    {"XpsCtgrNm":"금융/보험"   , "Profit":30},
                                    {"XpsCtgrNm":"세금/공과금" , "Profit":20},
                                ];
                                */
                
                        

                // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
                //
                // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
                // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
                // 
                // 아래 내용은 
                // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
                // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
                rMateChartH5.calls("chart1", {
                    "setLayout" : layoutStr,
                    "setData" : chartData
                });
            } else {
                this.chartShowHide = {"display":"none"}
            }
        },
        // 사용 가능한 년월 리스트 (1년)
        getUseMonthList(basYm) {
            const yyyymm = dateFormat(basYm, 'YYYYMM');
            const months = getMonthPeriod(12, yyyymm, 'YYYYMM', 'asc');
            return months
        },
        // 년월 슬라이드팝업 호출
        openSlideMonthPop(){
            const config = {
                params: {
                    title: '년월 선택',
                    yyyymm : this.basYm,
                    limit  : 12,
                    //includeCurYm : 'N'  // 현재월 포함여부
                    includeCurYm : this.includeCurYmYn  // 현재월 포함여부
                },
            }
            
            modalService.openSlideSelectMonth(config).then(response => {

                this.chartShowHide = {"display":""}

                this.basYm = dateFormat(response, 'YYYYMM');
                this.basYy = dateFormat(this.basYm, "YYYY");
                this.basMm = dateFormat(this.basYm, "M");

                this.getData()
            })	
        },
        fn_moveMonth(dsc) {

            this.chartShowHide = {"display":""}

            if (this.monPrev && dsc == "P") {
                this.basYm = monthAdd(-1, this.basYm, "YYYYMM");
            }

            if (this.monNext && dsc == "N") {
                this.basYm = monthAdd(1, this.basYm, "YYYYMM");
            }

            this.basYy = dateFormat(this.basYm, "YYYY");
            this.basMm = dateFormat(this.basYm, "M");

            this.getData();
        }
    },
    created() {
      //this.initComponent()
    },
}
</script>