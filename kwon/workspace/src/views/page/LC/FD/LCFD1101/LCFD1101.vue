<!--
/*************************************************************************
* @ 서비스경로 : 하단메뉴 > 지출분석 > 금융달력
* @ 페이지설명 : 하단메뉴 > 지출분석 > 금융달력/일별거래목록/월별할부목록
* @ 파일명     : src/views/page/LC/FD/LCFD1101/LCFD1101.vue
* @ 작성자     : CS515901
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515901              최초작성
* 2021-10-20              CS515731              floating 버튼시 overflow 처리 추가
*************************************************************************/
-->
<template>
    <page class="content-view">
        <lc-category-v2 type="LCFD" :aria-hidden="isShowFloatDiv"></lc-category-v2>

        <div id="content" :aria-hidden="isShowFloatDiv" class="com_sub_type02 com_bg_type00">				
            <div class="calendar_wrap calendar_type01">
                <section class="radius">
                    <div class="select_dual_wrap hasNav">
                        <div class="select_dual">
                            <!-- <div class="area">
                                <button class="select_date" @click="selectMonth">
                                    <span class="num">{{currentYear}}</span>년 <span class="num">{{currentMonth}}</span>월 <span class="caret"></span>
                                </button>
                            </div> -->

                            <div class="area">
                                <div class="select_date">
                                    <!--좌우 버튼에 disabled 클래스 추가 시 disabled 버튼 -->
                                    <button class="cal_btn cal_prev" aria-label="한달 전 이동" @click.prevent="selectPrevNextMonth('PREV')"></button>
                                    <a href="javascript:void(0);" title="년월선택" class="year_month" @click="selectMonth">
                                        <span class="num">{{currentYear}}</span>년 <span class="num">{{currentMonth}}</span>월
                                    </a>
                                    <button class="cal_btn cal_next" aria-label="한달 후 이동" @click.prevent="selectPrevNextMonth('NEXT')"></button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="in_out_cate">
                        <a href="javascript:void(0);" @click.prevent="monthDetl('1')">수입</a>
                        <span class="bar"></span>
                        <a href="javascript:void(0);" @click.prevent="monthDetl('2')">지출</a>
                        <span class="bar"></span>
                        <a href="javascript:void(0);" @click.prevent="monthDetl('3')">이체</a>
                    </div>

                    <cmmCalendar :pRzsBas='rzsBas' :pYYYYMM='rszYYYYMM' @selectWeekDateEvent="callComponentEvent" />
                    <div class="calendar_detail" id="calendar_detail">
                        <div class="calendar_notice_box">
                            <div class="inner_wrap">
                                <!-- 링크 리스트 S -->
                                <div class="com_inner">
                                    <div class="new_tit_area" :id="dayList.length>0 && dayList[0].asetCtgrDsc !== undefined?'l_'+currentDay:'xx'">
                                        <div class="tit"><em>{{currentDay}}</em><span>일({{dayFlag}})</span></div>
                                    </div>
                                    <template v-if="dayList.length > 0">
                                        <ul class="list_type_01" >
                                            <li v-for="(item, idx) in dayList" :key="idx">
                                                <a href="javascript:void(0);" @click.prevent="moveDetl(item)">
                                                    <!-- 자산카테고리 구분코드 1:수입 -->
                                                    <dl v-if="item.asetCtgrDsc === '1'">
                                                        <dt>
                                                            <div>
                                                                <i :class="item.asetAmnCtgrId"><span class="blind">{{item.ctgrnm}}</span></i>
                                                                <em v-if="item.prcMchtnm">{{item.prcMchtnm}}</em>
                                                                <span>{{item.cdcoCdWrsnm}}</span>
                                                            </div>
                                                        </dt>
                                                        <dd>
                                                            <span class="com_point_blue">
                                                                <em class="num">{{item.revXpsAm | numberFilter}}</em>
                                                                <em class="unit">원</em>
                                                            </span>
                                                        </dd>
                                                    </dl>
                                                    <!-- 자산카테고리 구분코드 2:지출 -->
                                                    <dl v-if="item.asetCtgrDsc === '2'">
                                                        <dt>
                                                            <div>
                                                                <i :class="item.asetAmnCtgrId"><span class="blind">{{item.ctgrnm}}</span></i>
                                                                <em v-if="item.prcMchtnm">{{item.prcMchtnm}}</em>
                                                                <span>{{item.cdcoCdWrsnm}}</span>
                                                            </div>
                                                        </dt>
                                                        <dd>
                                                            <span class="com_point_red">
                                                                <em class="num">-{{item.revXpsAm | numberFilter}}</em>
                                                                <em class="unit">원</em>
                                                            </span>
                                                        </dd>
                                                    </dl>
                                                    <!-- 자산카테고리 구분코드 3:이체 -->
                                                    <dl v-if="item.asetCtgrDsc === '3'">
                                                        <dt>
                                                            <div>
                                                                <i :class="item.dpzAcTrTpc === '02' ? 'AS30000001' : 'AS10000002'"><span class="blind">{{item.dpzAcTrTpc === '02' ? '이체지출' : '이체수입'}}</span></i>
                                                                <em v-if="item.prcMchtnm">{{item.prcMchtnm}}</em>
                                                                <span>{{item.cdcoCdWrsnm}}</span>
                                                            </div>
                                                        </dt>
                                                        <dd>
                                                            <span :class="item.dpzAcTrTpc === '02' ? 'com_point_red' : 'com_point_blue'">
                                                                <em class="num" v-if="item.dpzAcTrTpc === '02'">-{{item.revXpsAm | numberFilter}}</em>
                                                                <em class="num" v-else>{{item.revXpsAm | numberFilter}}</em>
                                                                <em class="unit">원</em>
                                                            </span>
                                                        </dd>
                                                    </dl>

                                                </a>
                                            </li>
                                        </ul>
                                    </template>
                                </div>
                                <!-- 조회내역이 없을경우 S -->
                                <template v-if="dayList.length === 0">
                                    <div class="no_data_box">
                                        <div class="no_data_list">
                                            <p>조회된  정보가 없습니다.</p>
                                        </div>
                                    </div>
                                </template>
                                
                                <!--// 조회내역이 없을경우 E -->
                                <div class="com_space_type01"></div>    

                                <!-- 리스트 S -->
                                <div class="com_inner">
                                    <div class="new_tit_area">
                                        <div class="tit"><em>{{currentMonth}}</em><span>월의 할부</span></div>
                                        <div class="total_price">
                                            <span>합계</span>
                                            <em class="num">{{istSam | numberFilter}}</em>
                                            <span>원</span>
                                        </div>
                                    </div>
                                    <template v-if="istList.length > 0">
                                        <ul class="list_type_02" >
                                            <li v-for="(item, idx) in istList" :key="idx + '_ist'">
                                                <dl>
                                                    <dt>
                                                        <div>
                                                            <em v-if="item.prcMchtnm">{{item.prcMchtnm}}</em>
                                                        </div>
                                                        
                                                        <span>{{item.cdcnm}} ({{item.nowIstSc}}/{{item.allIstSc}})</span>
                                                    </dt>
                                                    <dd>
                                                        <span>
                                                            <em class="num ">{{item.cdUgUsAm | numberFilter}}</em>
                                                            <em class="unit">원</em>
                                                        </span>
                                                    </dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </template>
                                </div>
                                <template v-if="istList.length > 0">
                                    <div class="com_inner com_notice_type01">
                                        <p class="dot_msg">할부 결제 예정 내역은 청구 데이터가 집계될 시점에 알 수 있으므로 집계 전에는 나오지 않을 수 있습니다.</p>
                                    </div>
                                </template>
                                <!-- 조회내역이 없을경우 S -->
                                <template v-if="istList.length === 0">
                                    <div class="no_data_box" >
                                        <div class="no_data_list">
                                            <p>조회된 정보가 없습니다.</p>
                                        </div>
                                    </div>
                                </template>
                                <!--// 조회내역이 없을경우 E -->
                                <!--// 리스트 E -->					
                            </div>
                            <!--// 링크 리스트 E -->
                        </div>

                    </div>
                </section>
            </div>
        </div>             
        
        <footersV2 type="lc" :aria-hidden="isShowFloatDiv"/>

        <div class="dimmed_float" @click="fn_closeFloatDiv()" :aria-hidden="isShowFloatDiv"></div>
        <div class="toggle-box sticky">
            <div :class="isShowFloatDiv ? 'active open' : 'close'">
                <button type="button" class="btn_float" :aria-expanded="isShowFloatDiv" @click="fn_showFloatDiv()">
                    <span class="tit">더보기 메뉴</span>
                    <em class="open">열기</em><em class="close">닫기</em>
                </button>
                <div class="view_box p0" v-if="isShowFloatDiv">
                    <button type="button" class="btn_01" @click="assetAdd('1')"><span>수입 추가</span></button>
                    <button type="button" class="btn_02" @click="assetAdd('2')"><span>지출 추가</span></button>
                </div>
            </div>
        </div>
        
        
    </page>
</template>

<script>
    import Page from '@/views/layout/Page.vue'
    import FootersV2 from "@/views/layout/FootersV2.vue"
    import LcCategoryV2 from '@/components/category/LcCategoryV2.vue'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import CmmCalendar from '@/components/CmmCalendar'
    // import commonService from '@/service/commonService'

    import LCFD1102 from '@/views/page/LC/FD/LCFD1102/LCFD1102'
    import LCFD1103 from '@/views/page/LC/FD/LCFD1103/LCFD1103'
    // import LCFD1106 from '@/views/page/LC/FD/LCFD1106/LCFD1106'
    import LCFD1001 from '@/views/page/LC/FD/LCFD1001/LCFD1001'

    // import {getDayDowC} from '@/utils/date'
    import {getDayDowCName, monthAdd} from '@/utils/date'

    import {cmmCalendarClear} from '@/utils/jUtils'

    export default {
        name : "LCFD1101",
        data: () => {
            return {
                monthList   : [],           // 수입지출실적목록
                dayList     : [],           // 수입지출일별목록
                istList     : [],           // 할부목록
                istSam      : 0,
                // year        : 0,
                // month       : 0,
                day         : 0,
                dayFlag     : "",

                days: ['일','월','화','수','목','금','토',],
                dates: [],
                currentYear: 0,
                currentMonth: 0,
                currentDay  : 0,
                year: 0,
                month: 0,
                rzsBas         :  [], 
                rszYYYYMM      : '',
                currentWeek: null,
                currentRzsBas : [],

                // S :: add. 21.07.21 수입/지출 float, dimmed 처리용
                isShowFloatDiv : false  
                // E :: add. 21.07.21 수입/지출 float, dimmed 처리용
            }
        },
        created() {
            const date        = new Date()
            this.year         = date.getFullYear()   //현재년
            this.month        = ("0" + (date.getMonth() +1)).slice(-2)  //현재월 00
            this.currentDay   = date.getDate()
            this.currentYear  = this.year
            this.currentMonth = this.month
            this.rszYYYYMM     = this.currentYear + "" + this.currentMonth
            this.dayFlag      = getDayDowCName()
        },
        mounted() {
            this.initComponent()

            // 자산수집 mutation 이벤트 감지 
            this.getGatheringListenSubscribe()

            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        updated(){

        },
        mixins: [
            commonMixin
        ],
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
                this.getCalenderList()                                  // 금융캘린더 조회
                this.getIstList()                                       // 할부조회
            },
            callComponentEvent(dates){
                console.log('callComponentEvent', dates)
                this.getCalenderDetl(dates, true)       //일자클릭일때만 focus 이동 2021.11.05
            },
            getCalenderList(){
                // 금융캘린더 조회 
                const config = {
                    url : '/lc/fd/01r01',
                    data : {
                        mydtCusno : this.getUserInfo('mydtCusno')       // 마이데이터고객번호
                        , rzsBasYm : this.currentYear + '' + this.currentMonth        // 실적기준년월
                    }
                }
                apiService.call(config).then(response => {
                    this.monthList = response.monthList || []                // 수입지출실적목록
                    if(this.monthList.length > 0){
                        for(let i=0; i<this.monthList.length; i++){
                            this.monthList[i].xpsAm = (-1) * this.monthList[i].xpsAm
                        }
                    }
                    this.rzsBas = this.monthList

                    let p_date        = new Date()
                    let p_year        = p_date.getFullYear()   
                    let p_month        = ("0" + (p_date.getMonth() +1)).slice(-2)  //현재월 00
                    
                    if(this.currentDay === 0){
                        if( (this.currentYear + '' + this.currentMonth) === (p_year + '' + p_month)){
                            this.currentDay = p_date.getDate()
                        }else{
                            this.currentDay = "01"
                        }                    
                    }

                    console.log("getCalenderList()", this.currentDay)
                    this.getCalenderDetl(this.currentDay)
                    //return this.monthList
                })
                
            },
            getCalenderDetl(paramDay, isDayClick=false){
                this.currentDay = ("0" + (paramDay)).slice(-2)

                console.log("getCalenderDetl()", this.currentDay)

                this.dayFlag = getDayDowCName(this.currentYear + '' + this.currentMonth + '' + this.currentDay)
                // 금융캘린더 항목 조회 (일별 거래정보)
                const config = {
                    url : '/lc/fd/01r02',
                    data : {
                        mydtCusno : this.getUserInfo('mydtCusno')                               // 마이데이터고객번호
                        , rzsBasYm : this.currentYear + '' + this.currentMonth                  // 실적기준년월
                        , rzsBasDt : this.currentYear + '' + this.currentMonth + '' + this.currentDay  // 실적기준일자
                    }
                }

                setTimeout(() => {
                    apiService.call(config).then(response => {
                        console.log('금융캘린더 항목조회', response)
                        this.dayList = response.dayList || []                     // 수입지출일별목록
                        
                        //DIV이동 updated에서 처리
                    }).then(() =>{

                        //일자 클릭일때만 focus 이동 modify 2021.11.05
                        if(isDayClick === true) {
                            if (this.dayList.length > 0 && this.dayList[0].asetCtgrDsc !== undefined) {
                                setTimeout(() => {
                                    const dLabel = this.$el.querySelectorAll('#l_'+this.currentDay)
                                    const parentdLabel = this.$el.querySelectorAll('#calendar_detail') //리스트 상단의 DETAIL TAG ID
                                    if (dLabel[0] !== undefined)
                                    {
                                        $('#content').animate({scrollTop : parentdLabel[0].offsetTop + dLabel[0].offsetTop - 10})
                                    }
                                }, 10);
                            }
                        }
                    })
                },10)
            },
            getIstList(){
                // 금융캘린더 할부 조회
                const config = {
                    url : '/lc/fd/01r03',
                    data : {
                        mydtCusno : this.getUserInfo('mydtCusno')                   // 마이데이터고객번호
                        , rzsBasYm : this.currentYear + '' + this.currentMonth      // 실적기준년월
                    }
                }
                apiService.call(config).then(response => {
                    console.log(response)
                    this.istSam = response.istSam                        // 할부금액 합계
                    this.istList = response.istList                     // 할부결제목록
                })
            },
            monthDetl(flag){
                if(flag === '1'){
                    // 수입이동
                }else if(flag === '2'){
                    // 지출이동
                }else{
                    // 이체이동
                }
                let compName = LCFD1102

                var param = {
                    "asetCtgrDsc"   : flag,
                    "year"          : this.currentYear,
                    "month"         : this.currentMonth
                }
                const config = {
                    component: compName,
                    param : param
                }
                modalService.openPopup(config).then(response => {
                    if(response === 'complete'){
                        const currentDay   = this.currentDay
                        const currentYear  = this.currentYear 
                        const currentMonth = this.currentMonth

                        Object.assign(this.$data, this.$options.data())

                        this.currentDay   = currentDay  
                        this.currentYear  = currentYear 
                        this.currentMonth = currentMonth
                        this.fn_init()
                    }
                })
            },
            moveDetl(item){
                let compName = LCFD1103
                var param = {
                    "paramList" : item
                }
                const config = {
                    component: compName,
                    param : param
                }
                modalService.openPopup(config).then(response => {
                    if(response === 'complete'){
                        // Object.assign(this.$data, this.$options.data())
                        this.getData()
                    }
                })
            },
            selectPrevNextMonth(flag) {
                let add = (flag === "PREV") ? -1 : 1

                this.rszYYYYMM = monthAdd(add, this.rszYYYYMM, "YYYYMM")
                this.currentYear = this.rszYYYYMM.substring(0,4)
                this.currentMonth = this.rszYYYYMM.substring(4,6)
                this.currentDay = "01"

                // 년월 선택 후 재조회
                this.getCalenderList() 
                // this.getCalenderDetl()
                this.getIstList()
            },
            selectMonth(){
                // 년월선택
                const config = {
                    params: {
                        title: '년월 선택',
                        yyyymm : this.currentYear + '' + this.currentMonth,
                    },
                }
                modalService.openSlideSelectMonth(config).then(response => {
                    if( (this.currentYear + '' + this.currentMonth) === (response.substring(0,4) + '' + response.substring(4,6)) ){
                        console.log('달력 변동없음.')
                        return false
                    }
                    this.currentYear = response.substring(0,4)
                    this.currentMonth = response.substring(4,6)
                    this.rszYYYYMM = this.currentYear + '' + this.currentMonth
                    // 년월 선택 후 재조회
                    this.getCalenderList() 
                    // this.getCalenderDetl()
                    this.getIstList()
                })
            },
            setCalendarData(){
                //const yyyymm = year + "" + month
                console.log('이쪽오나...')
                this.getCalenderList()

            },
            assetAdd(flag){
                // S :: add. 21.07.21 float dimmed, div close
                this.fn_closeFloatDiv()
                // E :: add. 21.07.21 float dimmed, div close


                let compName = LCFD1001

                var param = {
                    "assetFlag" : flag,
                    "selectDate" : this.currentYear + '-' + this.currentMonth + '-' + this.currentDay
                }
                const config = {
                    component: compName,
                    param : param
                }
                modalService.openPopup(config).then(response => {
                    console.log('response' , response)
                    if(response === 'complete'){
                        
                        const currentDay   = this.currentDay
                        const currentYear  = this.currentYear 
                        const currentMonth = this.currentMonth
                        const rszYYYYMM = this.rszYYYYMM;

                        Object.assign(this.$data, this.$options.data())

                        this.currentDay   = currentDay  
                        this.currentYear  = currentYear 
                        this.currentMonth = currentMonth
                        this.rszYYYYMM    = rszYYYYMM
                        this.getData()
                        
                    }
                })
            },
            fn_init(){
                cmmCalendarClear()
                
                const date        = new Date()
                this.year         = date.getFullYear()   //현재년
                this.month        = ("0" + (date.getMonth() +1)).slice(-2)  //현재월 00
                
                /*
                this.currentDay   = date.getDate()
                this.currentYear  = this.year
                this.currentMonth = this.month
                */

                this.rszYYYYMM    = this.currentYear + "" + this.currentMonth
                this.dayFlag      = getDayDowCName()

                this.getData()
            },
            /*
             *  S :: add. 21.07.21 수입/지출추가 버튼(Floating Btn , Dimmed) 이벤트 처리
             */
            fn_showFloatDiv() {
                //style overflow hidden 처리
                const pageElement  = this.$el
                let headerElement = this.$el.parentElement.firstChild   //웹접근성 추가. 2021.11.11
                let szTabMenuElement = ""
                let szContentElemtent = ""

                // console.log(this.$el.parentElement.parentElement.firstChild)
                // console.log(this.$el.parentElement.firstChild)
                // console.log(this.$el.firstChild)

                for(let i=0; i< pageElement.childNodes.length; i++)
                {
                    const childElement = pageElement.childNodes[i]
                    if(childElement.className !== undefined && childElement.className.indexOf("com_tabmenu_type02") > -1)
                    {
                        szTabMenuElement = childElement.firstChild //탭메뉴의 경우 ul 상위의 DIV 값에 설정
                    }
                    if(childElement.className !== undefined && childElement.className.indexOf("com_sub_type02 com_bg_type00") > -1)
                    {
                        szContentElemtent = childElement
                    }
                    if(szTabMenuElement!=="" && szContentElemtent!=="") break
                }
                
                if(this.isShowFloatDiv) {
                    this.isShowFloatDiv = false
                    $(".dimmed_float").fadeOut(200)
                    $('#com_footer').removeAttr("style");

                    if(szTabMenuElement!=="") szTabMenuElement.style.overflowX = "auto" //탭메뉴의 경우 overflow-x 값설정
                    if(szContentElemtent!=="")  szContentElemtent.style.overflow = ""

                    headerElement.ariaHidden = false  //웹접근성 추가. 2021.11.11

                } else {
                    this.isShowFloatDiv = true
                    $(".dimmed_float").fadeIn(200)
                    $('#com_footer').css({'z-index':'400', 'position':'relative'});

                    if(szTabMenuElement!=="") szTabMenuElement.style.overflowX = "hidden" //탭메뉴의 경우 ul 상위의 DIV 값에 설정
                    if(szContentElemtent!=="")  szContentElemtent.style.overflow = "hidden"

                    headerElement.ariaHidden = true   //웹접근성 추가. 2021.11.11
                }
            },
            /*
             * S :: add. 21.07.21 수입/지출추가 Dimmed 클릭 처리
             */
            fn_closeFloatDiv() {
                this.fn_showFloatDiv()
            },
            /*
                LCFD1001 자식창에서 데이터 넘겨 오기
             */
            fn_setCurrentYm(yyyy, mm){
                this.currentYear  = yyyy
                this.currentMonth = mm
            }
        },
        components : {
            Page,
            FootersV2,
            LcCategoryV2,
            CmmCalendar
        }
    }

</script>