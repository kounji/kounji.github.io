<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 유형별 지출
* @ 파일명     : src\views\page\LC\IP\LCIP2002\LCIP2002.vue
* @ 작성자     : CS533045
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533045              최초작성
*************************************************************************/
-->
<template>
    <div id="tab_01" role="tabpanel" class="cmm-tab-panel on">
        <div class="com_inner">
            <div class="select_date">
                <button class="cal_btn cal_prev" aria-label="한달 전 이동" @click.prevent="moveMonth('PREV')" style="padding:1px 6px;"></button>
                <a title="년월선택" class="year_month" href="javascript:console.log('월');" @click.prevent="selectMonth"><span class="num">{{basDt | dateFilter('YYYY')}}</span>년 <span class="num">{{basDt | dateFilter('M')}}</span>월 </a>
                <button class="cal_btn cal_next" :class="disabledButton" aria-label="한달 후 이동" @click.prevent="moveMonth('NEXT')" :disabled="todayBasYm===getBasYm" :title="todayBasYm===getBasYm ? '선택불가' : ''" style="padding:1px 6px;"></button>
            </div>

            <div class="new_sub_info expenditure_sub_info pt0">
                <div class="title">
                    <div class="text">
                        총 지출<br>
                        <strong><span class="num counter">{{xpsAm | numberFilter}}</span>원</strong>
                    </div>
                    <div class="switch">
                        <span>정기지출 포함</span>
                        <span class="cmm-switch sm">
                            <input type="checkbox" id="check02" name="check02" role="switch" checked @change="includeFxtmXps($event)">
                            <label for="check02"></label>
                        </span>
                    </div>
                </div>
            </div>
            <!-- 차트영역 -->
            <div class="chartArea assetDoughnut mt30"><!-- 1004 접근성 반영 -->
                <div id="lcip1006ChartHolder"></div>
            </div>
            <!--// 차트영역 -->
            <div v-if="unClfCnt > 0">
                <div class="box_border_link iconType01">
                    <a role="button" href="javascript:void(0);" @click.prevent="openCategoryPopup"><span class="arrow">분류가 필요한 지출이 <em class="num pointColor red2">{{unClfCnt}}</em><em class="pointColor red2">개</em> 있어요</span></a>
                </div>
            </div>
        </div>
        <hr class="hr02">
        <div class="com_inner">
            <template  v-if="psttList.length > 0">
                <div class="com_box_type01 toggle_list_box2 custom_list" v-for="(category, categoryIdx) in psttList" :key="'category_' + categoryIdx">
                    <!-- <div data-ui-toggle="box" class="toggle_box_area active open"> -->
                    <div data-ui-toggle="box" class="toggle_box_area">
                        <button type="button" class="view_btn" aria-expanded="false">
                            <div class="new_tit_area">
                                <div class="tit"><span>{{category.name}}</span><span class="com_icon_num custom">{{category.ratio}}%</span></div>
                                <span class="total_price">
                                    <em class="num">{{category.sum | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <div class="view_cont expenditure_type">
                        <div class="expend_detail" v-for="(dayList, dayListIdx) in category.list" :key="'date_' + dayListIdx">
                            <p class="date">{{dayList.dtForList | dateFilter('M월 D일')}}</p>
                            <ul class="list_type_01">
                                <li v-for="(list, listIdx) in dayList.list" :key="'list_' + listIdx">
                                    <a href="javascript:void(0);" role="button" @click.prevent="openDetailPopup(list)">
                                        <dl>
                                            <dt>
                                                <div>
                                                    <i :class="list.xpsCtgrC"><span class="blind">{{list.xpsCtgrNm2}}</span></i>
                                                    <em class="prod_name">{{list.prcMchtnm}}</em>
                                                </div>
                                            </dt>
                                            <dd>
                                                <span class="prod_num">{{list.wrsnm}}</span>
                                            </dd>
                                            <dd>
                                                <span class="com_price">
                                                    <em class="num">{{list.xpsAm | numberFilter}}</em><em class="unit">원</em>
                                                </span>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </template>
        </div>

    </div>
</template>

<script>
import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {dateFormat, monthAdd} from '@/utils/date'
import {amountCountAnimate} from '@/utils/jUtils'
import {getDayDowCName} from '@/utils/date'
import _ from 'lodash'
import LCIP2005 from '@/views/page/LC/IP/LCIP2005/LCIP2005'
import LCIP2013 from '@/views/page/LC/IP/LCIP2013/LCIP2013'
import LCFD2003 from '@/views/page/LC/FD/LCFD2003/LCFD2003'

export default {
    name : "LCIP2002",
    data: () => {
        return {
            cusNb: '',              // 마이데이터고객번호
            ariaLabelText: '',		// 접근성 라벨
            todayBasYm: '',			// 현재년월
            basDt: '',              // 조회날짜
            inqGbnCd: '',           // 조회구분코드

            xpsAm: 0,               // 총지출
            unClfXpsAm: 0,          // 미확인 총지출
            psttTop5List : [], 	    // 카테고리별지출목록
            psttTop5ListView : [],	// 카테고리별지출목록(상위5개+이외) - 파이차트
            unClfCnt: 0,            // 카테고리별상세지출목록건수
            psttList : [], 	        // 카테고리별상세지출목록
            unCnfXpsList: []        // 미확인 지출 연결변경필요기관목록

        }
    },
    computed : {
        getBasYm() {
            return dateFormat(this.basDt, "YYYYMM");
        },
        disabledButton() {
            return this.todayBasYm == this.getBasYm ? 'disabled' : ''
        }
    },
    created() {
        this.cusNb = this.getUserInfo("mydtCusno")
        this.todayBasYm = dateFormat(new Date(), "YYYYMM")
        this.basDt = dateFormat(new Date(), "YYYYMMDD")
        this.inqGbnCd = "Y"

        const date        = new Date()
        this.year         = date.getFullYear()   //현재년
        this.month        = ("0" + (date.getMonth() +1)).slice(-2)  //현재월 00
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.getData();
        },
        getData() {
            const config = {
                url: '/lc/ip/02r02', // 인터페이스ID: IF-MOB-PFM-LCIP02R02, 서비스코드: PFMLCIP02R02
                data: {
                    "mydtCusno" : this.cusNb,
                    "basDt": this.basDt,
                    "inqGbnCd": this.inqGbnCd
                }
            }	
            apiService.call(config).then(response =>{
                console.log('response', JSON.parse(JSON.stringify(response)))
                this.xpsAm = response.xpsAm || 0
                this.psttTop5List = response.psttTop5List || []
                this.unClfCnt = response.unClfCnt || 0
                this.unClfXpsAm = response.unClfXpsAm;


                let sumEtcAm = 0
                this.psttTop5ListView = []

                for (let i = 0; i < this.psttTop5List.length; i++) {
                    this.psttTop5ListView.push({ "expenditure": this.psttTop5List[i].xpsCtgrNm, "Profit": this.psttTop5List[i].xpsAm  })
                        
                    this.psttTop5TotAm += this.psttTop5List[i].xpsAm
                }

                if (sumEtcAm > 0) {
                    this.psttTop5ListView.push({ "expenditure": '이외', "Profit": sumEtcAm  })
                }

                console.log("sumEtcAm =====================", sumEtcAm)

                this.psttList = []
                let category = {}
                let prevCategoryCd = ""
                let curCategoryCd = ""
                let list = {}
                let psttListLen = response.psttList.length || 0
                for(let i=0; i<psttListLen; i++) {
                    list = response.psttList[i]
                    prevCategoryCd = curCategoryCd
                    curCategoryCd = list.xpsCtgrC2

                    if(prevCategoryCd != curCategoryCd) {
                        category = {}
                        category["code"] = list.xpsCtgrC2
                        category["name"] = list.xpsCtgrNm2
                        category["ratio"] = list.xpsRto
                        category["sum"] = 0
                        category["list"] = []
                    }

                    category["sum"] += list.xpsAm
                    category["list"].push(list)

                    if(i == (response.psttList.length - 1) || curCategoryCd != response.psttList[i+1].xpsCtgrC2) {
                        category.list = this.modifyList(category.list)
                        this.psttList.push(category)
                    }
                }


                this.ariaLabelText = this.getAriaLabelText(this.psttTop5ListView, sumEtcAm)

                // data-count 애니메이션 효과
                amountCountAnimate('counter', sumEtcAm)

                this.$nextTick(()=>{
                    this.makeChart()
                })

                if(response.unCnfXpsList && response.unCnfXpsList.length > 0){
                    this.openUnCnfXpsSlidePopup(response.unClfXpsAm, response.unCnfXpsList)
                }
            })
        },
        moveMonth(flag){
            let add = (flag == 'PREV') ? -1 : 1
			let YYYYMM = ''
			YYYYMM = monthAdd(add, this.year + '' + this.month, "YYYYMM")
			this.year = YYYYMM.substring(0,4)
            this.month = YYYYMM.substring(4,6)
            let curDay = '01'
            this.basDt = this.year + '' + this.month + '' + curDay
            
            console.log("this.basDt =====================", this.basDt)

            this.getData()
        },
        selectMonth(){
            const config = {
                params: {
                    title  : '조회년월 선택',
                    yyyymm : dateFormat(this.basDt, "YYYYMM"),
                    limit  : 60,
                },
            }
            modalService.openSlideSelectMonth(config).then(response => {
                this.basDt = dateFormat(response, 'YYYYMM') + dateFormat(this.basDt, "DD")
                this.getData();
            })
        },
        includeFxtmXps(e) {
            if(e.target.checked) {
                this.inqGbnCd = "Y"
            }else{
                this.inqGbnCd = "N"
            }
            this.getData();
        },
        // 일자별 내림차순 정렬
        modifyList(objArray){
            // 정렬기준이 되는 필드(날짜와 요일) 새로 만들어 정렬
            // 정정이 있는 경우 정정일자와 요일, 그외엔 승인일자와 요일
            let list = []
            for(var i=0;i<objArray.length;i++){
                list.push(objArray[i])

                list[i].dtForList   = objArray[i].trDt
                list[i].dowForList  = getDayDowCName(objArray[i].trDt)
            }
            let result = _.chain(list)
                .uniqBy('dtForList')
                .map(d => {
                    return {
                        dtForList   : d.dtForList,
                        dowForList  : d.dowForList,
                        list		: _.filter(list, {dtForList : d.dtForList})
                    }
                })
                .orderBy('dtForList', 'desc')
                .value()
            return result
        },
        getAriaLabelText(varXpsListView, varXpsAm) {
            if (varXpsListView.length == 0 || varXpsAm == 0) return ''
            
            // 카테고리별 지출 - 주거 10%, 금융·보험 10%, 세금·공과금 10%, 온라인쇼핑 10%, 자동차 10%, 식비 10%, 생활·마트 10%, 이외 10% 입니다.
            let ariaLabelText = '카테고리별 지출 - '

            for (let i = 0; i < varXpsListView.length; i++) {
                if (i > 0) ariaLabelText += ', '

                ariaLabelText += varXpsListView[i].rzsCtgrnm + ' '
                ariaLabelText += Math.round(varXpsListView[i].xpsTtAm / varXpsAm * 100 * 10) / 10 + '%'
            }

            ariaLabelText += ' 입니다.'

            return ariaLabelText
        },
        makeChart() {
            // rMateChart 를 생성합니다.
            // 파라메터 (순서대로)
            //  1. 차트의 id ( 임의로 지정하십시오. )
            //  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
            //  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
            //  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
            //  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
            rMateChartH5.create("chart1", "lcip1006ChartHolder", "useContextMenu=false", "100%", "150px");//useContextMenu=false 차트메뉴 숨김
            
            // 스트링 형식으로 레이아웃 정의.
		var layoutStr =
            '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
                    +'<Options>'
                        //+'<Caption text="Global Temperature"/>'
                        +'<Legend position="right" direction="vertical" useVisibleCheck="true" borderStyle="none" />'// 범례 속성
                    +'</Options>'
                    +'<CurrencyFormatter id="numFmt" currencySymbol="%" alignSymbol="right" />'
                    +'<Pie2DChart innerRadius="0.55" showDataTips="true" selectionMode="single">'
                        /*
                        Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
                        showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
                        innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
                        */
                            +'<series>'
                                +'<Pie2DSeries nameField="expenditure" field="Profit" startAngle="270" renderDirection="clockwise" color="#fff">'
                                    +'<fills>'
                                        +'<SolidColor color="#06b0b2"/>' /* 쇼핑 */
                                        +'<SolidColor color="#499ae9"/>' /* 외식 */
                                        +'<SolidColor color="#8b68e5"/>' /* 교통 */
                                        +'<SolidColor color="#de7cc1"/>' /* 생활/마트 */
                                        +'<SolidColor color="#b2b2b2"/>' /* 미분류 */
                                        +'<SolidColor color="#eeeeee"/>' /* 그 외 5개 */
                                    +'</fills>'
                                    /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
                                    +'<showDataEffect>'
                                    /* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                                            +'<SeriesZoom duration="1000" relativeTo="chart" horizontalFocus="right" verticalFocus="bottom" />'
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
                "setData" : this.psttTop5ListView
            });

            /**
             * rMateChartH5 3.0이후 버전에서 제공하고 있는 테마기능을 사용하시려면 아래 내용을 설정하여 주십시오.
             * 테마 기능을 사용하지 않으시려면 아래 내용은 삭제 혹은 주석처리 하셔도 됩니다.
             *
             * -- rMateChartH5.themes에 등록되어있는 테마 목록 --
             * - simple
             * - cyber
             * - modern
             * - lovely
             * - pastel
             * -------------------------------------------------
             *
             * rMateChartH5.themes 변수는 theme.js에서 정의하고 있습니다.
             */
            rMateChartH5.registerTheme(rMateChartH5.themes);
        },
        // 차트CSS
        setChartCss(index) {
            let arrCssClass = ['bl_lightcyan', 'bl_blue', 'bl_lightcyan2', 'bl_aqua2' ,'bl_darkcyan', 'bl_red', 'bl_orange', 'bl_purple2']

            return arrCssClass[index]
        },
        openPopup(id) {
            const config = {
                component: id,
                params :{
                    "basDt" : this.basDt,
                }
            }
            modalService.openPopup(config).then((res) => {
                if(res === 'complete') {
                    this.getData();
                }
            })
        },
        openCategoryPopup() {            
            this.openPopup(LCIP2005)
        },
        openDetailPopup(list) {
            // this.openPopup(LCFD2003)
            
			let paramList = []

			paramList.asetCtgrDsc = '2'          // 자산카테고리구분코드   1:수입, 2:지출
			paramList.dataSrcDsc  = list.dataSrcDsc
			paramList.inqKey      = list.inqKey
			paramList.reqFlag     = 'LCIP2002'  // LCFD2003에서 팝업닫을 때 close()를 쓰도록 구분하기 위한 flag

			console.log(list)

            let param = {
				"paramList" : paramList
            }
            const config = {
                component : LCFD2003,
                param : param,
            }
            modalService.openPopup(config).then(response => {
                if(response === 'complete') {
                    this.getData()
                }
            })
        },
        openUnCnfXpsSlidePopup(unClfXpsAm, unCnfXpsList) {
            const config = {
                renderer: {
                    component: LCIP2013
                },
                params: {
                    unClfXpsAm,
                    unCnfXpsList
                }
            }
            modalService.openSlidePagePopup(config).then(() => {
                
            })
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>