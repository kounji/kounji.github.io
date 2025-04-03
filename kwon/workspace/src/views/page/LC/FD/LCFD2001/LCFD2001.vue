<!--
/*************************************************************************
* @ 서비스경로 : 하단메뉴 > 지출분석 > 금융달력
* @ 페이지설명 : 하단메뉴 > 지출분석 > 금융달력/일별거래목록/월별할부목록
* @ 파일명     : src/views/page/LC/FD/LCFD2001/LCFD2001.vue
* @ 작성자     : CS515901
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515901              최초작성
* 2021-10-20              CS515731              floating 버튼시 overflow 처리 추가
* 2023-07-13              CS533457              상호금융 마이데이터 확대 개발 LC/FD/LCFD1101/LCFD1101.vue -> LC/FD/LCFD2001/LCFD2001.vue 변경
*************************************************************************/
-->
<template>
    <page class="content-view mydata2023">
        <lc-category-v2 type="LCFD" :aria-hidden="isShowFloatDiv"></lc-category-v2>

        <div id="content" class="com_sub_type02" :aria-hidden="isShowFloatDiv">
            <div class="calendar_wrap newCalendarType2023">
                <section class="radius"><!-- class="calendar_box" -->
                    <div class="com_inner">
                        <div class="select_dual_wrap">
                            <div class="select_dual">
                                <div class="area">
                                    <div class="select_date">
                                        <!--좌우 버튼에 disabled 클래스 추가 시 disabled 버튼 -->
                                        <button class="cal_btn cal_prev" aria-label="한달 전 이동" @click.prevent="selectPrevNextMonth('PREV')" style="padding:1px 6px;"></button>
                                        <a class="year_month" href="javascript:void(0);" title="년월선택" @click.prevent="selectMonth"><span class="num">{{currentYear}}</span>년 <span class="num">{{currentMonth}}</span>월 </a>
                                        <button class="cal_btn cal_next" :class="disabledButton" aria-label="한달 후 이동" @click.prevent="selectPrevNextMonth('NEXT')" :disabled="currYYYYMM===rszYYYYMM" :title="currYYYYMM===rszYYYYMM ? '선택불가' : ''" style="padding:1px 6px;"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 1011 UI 변경 -->
                        <div class="in_out_cate02 gray_box_2023">
                            <dl class="in">
                                <dt>수입</dt>
                                <dd><a href="javascript:void(0);" class="link_arrow" @click.prevent="monthDetl('1')"><span><em class="num">{{totRevAm | numberFilter}}</em>원</span></a></dd>
                            </dl>
                            <dl class="out">
                                <dt>지출</dt>
                                <dd><a href="javascript:void(0);" class="link_arrow" @click.prevent="monthDetl('2')"><span><em class="num">{{totXpsAm | numberFilter}}</em>원</span></a></dd>
                            </dl>
                        </div>
                        <!-- //1011 UI 변경 -->

                        <!-- <div class="in_out_cate">
                            <a href="javascript:void(0);" @click.prevent="monthDetl('1')">수입</a>
                            <span class="bar"></span>
                            <a href="javascript:void(0);" @click.prevent="monthDetl('2')">지출</a> -->
                            <!--
                            <span class="bar"></span>
                            <a href="javascript:void(0);" @click.prevent="monthDetl('3')">이체</a>--><!-- 8/16 jlee 설계변경으로 삭제 -->
                        <!-- </div> -->

                        <div class="cal_tb">
                            <cmmCalendar :pRzsBas='rzsBas' :pYYYYMM='rszYYYYMM' @selectWeekDateEvent="callComponentEvent" />
                        </div>
                    </div>
                    <div class="com_space_type01"></div>
                    <div class="calendar_detail" id="calendar_detail">
                        <div class="calendar_notice_box">
                            <div class="inner_wrap">
                                <div class="com_inner">
                                    <div class="new_tit_area" :id="dayList.length>0 && dayList[0].asetCtgrDsc !== undefined?'l_'+currentDay:'xx'">
                                        <div class="tit"><em>{{currentDay}}</em><span>일({{dayFlag}})</span></div>
                                    </div>
                                    <ul class="list_type_01" v-if="dayList.length > 0">
                                        <li v-for="(item, idx) in dayList" :key="idx">
                                            <a href="javascript:void(0);" @click.prevent="moveDetl(item)">
                                                <!-- 자산카테고리 구분코드 1:수입 -->
                                                <dl v-if="item.asetCtgrDsc === '1'">
                                                    <dt>
                                                        <div>
                                                            <i :class="`expIcon ${item.asetAmnCtgrId}`"><span class="blind">{{item.ctgrnm}}</span></i>
                                                            <em v-if="item.prcMchtnm">{{item.prcMchtnm}}</em>
                                                            <span>{{item.cdcoCdWrsnm}}</span>
                                                        </div>
                                                    </dt>
                                                    <dd>
                                                        <span class="com_point_blue">
                                                            <em :class="item.xpsTrTpc === 'CANCEL' ? 'num cancelLine' : 'num ' ">{{item.revXpsAm | numberFilter}}</em>
                                                            <em class="unit">원</em>
                                                        </span>
                                                    </dd>
                                                </dl>
                                                <!-- 자산카테고리 구분코드 2:지출 -->
                                                <dl v-if="item.asetCtgrDsc === '2'">
                                                    <dt>
                                                        <div>
                                                            <i :class="`expIcon ${item.asetAmnCtgrId}`"><span class="blind">{{item.ctgrnm}}</span></i>
                                                            <em v-if="item.prcMchtnm">{{item.prcMchtnm}}</em>
                                                            <span>{{item.cdcoCdWrsnm}}</span>
                                                        </div>
                                                    </dt>
                                                    <dd>
                                                        <span class="com_point_red">
                                                            <em :class="item.xpsTrTpc === 'CANCEL' ? 'num cancelLine' : 'num ' ">-{{item.revXpsAm | numberFilter}}</em>
                                                            <em class="unit">원</em>
                                                        </span>
                                                    </dd>
                                                </dl>
                                                <!-- 자산카테고리 구분코드 3:이체 -->
                                                <!-- <dl v-if="item.asetCtgrDsc === '3'">
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
                                                </dl> -->
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <!-- 조회내역이 없을경우 S -->
                                <div class="no_data_box grayExclamationType" v-if="dayList.length === 0">
                                    <div class="no_data_list">
                                        <p>조회된 정보가 없습니다.</p>
                                    </div>
                                </div>
                                <!--// 조회내역이 없을경우 E -->

                                <div class="com_space_type01"></div>
                                <div class="com_inner">
                                    <!-- 리스트 S -->
                                    <div class="new_tit_area">
                                        <div class="tit"><em>{{currentMonth}}</em><span>월의 할부</span></div>
                                        <div class="total_price">
                                            <span>합계</span>
                                            <em class="num">{{istSam | numberFilter}}</em>
                                            <span>원</span>
                                        </div>
                                    </div>
                                    <ul class="list_type_02" v-if="istList && istList.length > 0">
                                        <li v-for="(item, idx) in istList" :key="idx + '_ist'">
                                            <dl>
                                                <dt>
                                                    <div>
                                                        <em v-if="item.prcMchtnm">{{item.prcMchtnm}}</em>
                                                    </div>
                                                    <span>{{item.cdcnm}} ({{item.nowIstSc}}/{{item.allIstSc}})</span>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="num ">{{item.cdUgUsAm | numberFilter}}</em><em class="unit">원</em>
                                                    </span>
                                                </dd>
                                            </dl>
                                        </li>
                                    </ul>
                                    <!--// 리스트 E -->	
                                </div>
                                <div class="com_inner com_notice_type01" v-if="istList && istList.length > 0">
                                    <p class="dot_msg">할부 결제 예정 내역은 청구 데이터가 집계될 시점에 알 수 있으므로 집계 전에는 나오지 않을 수 있습니다.</p>
                                </div>
                                
                                <!-- 조회내역이 없을경우 S -->
                                <div class="no_data_box grayExclamationType" v-if="istList && istList.length === 0">
                                    <div class="no_data_list">
                                        <p>조회된 정보가 없습니다.</p>
                                    </div>
                                </div>
                                <!--// 조회내역이 없을경우 E -->

                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>
        </div>
        <!--// content E -->
        <footersV2 type="lc" :aria-hidden="isShowFloatDiv"/>

        <!-- float S -->
        <div class="dimmed" @click="fn_closeFloatDiv()"></div>
        <div class="toggle-box sticky">
            <!--<div data-ui-toggle="sticky">-->
            <div>
                <button type="button" class="btn_float" :aria-expanded="isShowFloatDiv" @click="fn_showFloatDiv()">
                    <span class="tit">수입,지출 추가 메뉴</span><!-- 1004 접근성 반영 -->
                    <em class="open">열기</em><em class="close">닫기</em>
                </button>
                <div class="view_box p0" v-if="this.isShowFloatDiv==true">
                    <button type="button" class="btn_01" @click="assetAdd('1')"><span>수입 추가</span></button>
                    <button type="button" class="btn_02" @click="assetAdd('2')"><span>지출 추가</span></button>
                </div>
            </div>
        </div>
        <!--// float E -->
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
    import LCFD2002 from '@/views/page/LC/FD/LCFD2002/LCFD2002'
    import LCFD2003 from '@/views/page/LC/FD/LCFD2003/LCFD2003'
    import LCFD2007 from '@/views/page/LC/FD/LCFD2007/LCFD2007'
    import LCFD4008 from '@/views/page/LC/FD/LCFD4008/LCFD4008'
    import store from '@/store'
     import {mapGetters} from 'vuex'

     import {getDayDowCName, monthAdd} from '@/utils/date'
    import {cmmCalendarClear} from '@/utils/jUtils'

    export default {
        name : "LCFD2001",
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
                totRevAm : 0,
                totXpsAm : 0,
                // S :: add. 21.07.21 수입/지출 float, dimmed 처리용
                isShowFloatDiv : false  
                // E :: add. 21.07.21 수입/지출 float, dimmed 처리용
            }
        },
        computed : {
            disabledButton() {
                return this.currYYYYMM == this.rszYYYYMM ? 'disabled' : ''
            }
        },
        created() {
            const date        = new Date()
            this.year         = date.getFullYear()   //현재년
            this.month        = ("0" + (date.getMonth() +1)).slice(-2)  //현재월 00
            this.currentDay   = ("0" + (date.getDate())).slice(-2) //date.getDate()
            this.currentYear  = this.year
            this.currentMonth = this.month
            this.rszYYYYMM     = this.currentYear + "" + this.currentMonth
            this.dayFlag      = getDayDowCName()
            this.currYYYYMM   = this.currentYear + "" + this.currentMonth // 현재년월 비교용
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

                // 금융(수입, 지출, 이체) 목록 조회
                let now = new Date()
                let nowYYYYMM = `${now.getFullYear()}${("0" + (now.getMonth() +1)).slice(-2)}`
                let paramYYYYMM = this.currentYear + '' + this.currentMonth
                console.log('###### ', nowYYYYMM, paramYYYYMM)

                // 금융캘린더 조회 
                const config = {
                    url : '/lc/fd/01r04',
                    data : {
                        mydtCusno : this.getUserInfo('mydtCusno')       // 마이데이터고객번호
                        , basYm : this.currentYear + '' + this.currentMonth
                        , basDt : this.currentYear + '' + this.currentMonth + '' + this.currentDay    
                    }
                }
                apiService.call(config).then(response => {
                    console.log('response', JSON.parse(JSON.stringify(response)))
                    this.monthList = response.monthList || []                // 수입지출실적목록
                    this.totRevAm = 0
                    this.totXpsAm = 0
                    if(this.monthList?.length > 0){
                        for(let i=0; i<this.monthList?.length; i++){
                            this.monthList[i].xpsAm = (-1) * this.monthList[i].xpsAm

                            this.totXpsAm = this.totXpsAm + (-1) * this.monthList[i].xpsAm
                            this.totRevAm = this.totRevAm + this.monthList[i].revAm
                        }

                        console.log('response TotXpsAm / TotRevAm', this.totXpsAm, this.totRevAm)

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
                console.log("this.currentYear + '' + this.currentMonth + '' + this.currentDay",this.currentYear + '' + this.currentMonth + '' + this.currentDay)
                this.dayFlag = getDayDowCName(this.currentYear + '' + this.currentMonth + '' + this.currentDay)
                console.log("dayFlag>",this.dayFlag)
                // 금융캘린더 항목 조회 (일별 거래정보)
                const config = {
                    url : '/lc/fd/01r05',
                    data : {
                        mydtCusno : this.getUserInfo('mydtCusno')                               // 마이데이터고객번호
                        , basYm : this.currentYear + '' + this.currentMonth
                        , basDt : this.currentYear + '' + this.currentMonth + '' + this.currentDay
                    },
                    disableLoading : true
                }

                setTimeout(() => {
                    apiService.call(config).then(response => {
                        console.log('금융캘린더 항목조회', response)
                        this.dayList = response.dayList || []                     // 수입지출일별목록
                        
                        //DIV이동 updated에서 처리
                    }).then(() =>{

                        //일자 클릭일때만 focus 이동 modify 2021.11.05
                        if(isDayClick === true) {
                            if (this.dayList?.length > 0 && this.dayList[0]?.asetCtgrDsc !== undefined) {
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
                    url : '/lc/fd/01r06',
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
                let compName = LCFD2002

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
                        const currentDay   = '01'
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
                 let compName = LCFD2003

                 item.reqFlag     = 'LCFD2001'  // LCFD2003에서 팝업닫을 때 close()를 쓰도록 구분하기 위한 flag

                 var param = {
                     "paramList" : item
                 }
                 const config = {
                     component: compName,
                     param : param
                 }
                 modalService.openPopup(config).then(response => {
                     if(response === 'complete'){
                         this.getData()
                     }
                 })
            },
            selectPrevNextMonth(flag) {
                let add = 0 
                if(flag === "JUMP"){
                    this.rszYYYYMM = this.currentYear + "" + this.currentMonth
                }else{
                    add = flag === "PREV" ? -1 : 1
                    this.rszYYYYMM = monthAdd(add, this.rszYYYYMM, "YYYYMM")
                    this.currentYear = this.rszYYYYMM.substring(0,4)
                    this.currentMonth = this.rszYYYYMM.substring(4,6)
                }

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
                        limit  : 60,
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


                let compName = LCFD2007

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

                for(let i=0; i< pageElement.childNodes?.length; i++)
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
                    $(".dimmed").fadeOut(200)
                    $(".toggle-box.sticky").css("z-index", 600);
                    $(".toggle-box.sticky > div").removeClass("active").removeClass("on")
                    $(".toggle-box.sticky > div").addClass("close")

                    if(szTabMenuElement!=="") szTabMenuElement.style.overflowX = "auto" //탭메뉴의 경우 overflow-x 값설정
                    if(szContentElemtent!=="")  szContentElemtent.style.overflow = ""

                    headerElement.ariaHidden = false  //웹접근성 추가. 2021.11.11

                } else {
                    this.isShowFloatDiv = true
                    $(".dimmed").fadeIn(200)
                    $(".toggle-box.sticky").css("z-index", 1100);
                    $(".toggle-box.sticky > div").removeClass("close")
                    $(".toggle-box.sticky > div").addClass("active").addClass("on")

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
                LCFD2002 자식창에서 데이터 넘겨 오기
             */
            fn_setCurrentYm(yyyy, mm){
                this.currentYear  = yyyy
                this.currentMonth = mm
                this.selectPrevNextMonth("JUMP")
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