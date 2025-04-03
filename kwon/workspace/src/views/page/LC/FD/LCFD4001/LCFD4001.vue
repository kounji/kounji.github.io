<!--
/*************************************************************************
* @ 서비스경로 : 하단메뉴 > 지출분석 > 금융달력
* @ 페이지설명 : 하단메뉴 > 지출분석 > 금융달력/일별거래목록/월별할부목록
* @ 파일명     : src/views/page/LC/FD/LCFD4001/LCFD4001.vue
* @ 작성자     : CS541017
* @ 작성일     : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13              CS541017              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view mydata2023">      
        <!--LcCategoryV2 type="LCFD"></!--LcCategoryV2-->
        <div id="content" class="com_sub_type02">
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
                                <!--[v4.0] 내려받기 추가-->
                                <button type="button" @click.prevent="openPopDownload()" class="stdBtn innerType01 download">내려받기</button>
                                <!--//[v4.0] 내려받기 추가-->
                            </div>
                        </div>
                        
                        <!-- 1011 UI 변경 -->
                        <div v-if="rszYYYYMM === currYYYYMM" class="in_out_cate02 gray_box_2023">
                            <dl class="in">
                                <dt>수입</dt>
                                <dd><a href="javascript:void(0);" class="link_arrow" @click.prevent="monthDetl('1')"><span><em class="num">{{totRevAm | numberFilter}}</em>원</span></a></dd>
                            </dl>
                            <dl class="out">
                                <dt>지출</dt>
                                <dd><a href="javascript:void(0);" class="link_arrow" @click.prevent="monthDetl('2')"><span><em class="num">{{totXpsAm | numberFilter}}</em>원</span></a></dd>
                            </dl>
                            <!--[v4.0] 지출목표 등록된 경우-->
                            <dl v-if="xpsObtAm == 0">
                                <button type="button" class="stdBtn full" @click.prevent="openPopPDMY()">나의 한달 소비 설정하기</button>
                            </dl>
                            <dl v-if="xpsObtAm != 0" class="target">
                                <dt>지출목표</dt>
                                <dd><a href="javascript:void(0);" class="link_arrow" @click.prevent="openPopTarget()"><span><em class="num">{{xpsObtAm | numberFilter}}</em>원</span></a></dd>
                            </dl>                         
                             <div v-if="xpsObtAm != 0 && totXpsAm < xpsObtAm" class="goal">
                                이번 달 {{toDay | numberFilter}}일 기준,<br>사용 가능한 지출이 <span><em class="num">{{ xpsObtAm - totXpsAm | numberFilter}}</em>원</span> 남았어요.
                            </div>
           
                            <div v-else-if="xpsObtAm != 0 && totXpsAm >= xpsObtAm" class="goal">
                                이번 달 {{toDay | numberFilter}}일 기준,<br>목표금액에서 <span><em class="num" >{{ totXpsAm - xpsObtAm  | numberFilter}}</em>원</span> 초과 되었어요.<br>지출한 금액을 한 번 점검해 보세요.
                            </div>
                            <!--//[v4.0] 지출목표 추가-->
                        </div>      

                        <div v-else class="in_out_cate02 gray_box_2023">
                            <dl class="in">
                                <dt>수입</dt>
                                <dd><a href="javascript:void(0);" class="link_arrow" @click.prevent="monthDetl('1')"><span><em class="num">{{totRevAm | numberFilter}}</em>원</span></a></dd>
                            </dl>
                            <dl class="out">
                                <dt>지출</dt>
                                <dd><a href="javascript:void(0);" class="link_arrow" @click.prevent="monthDetl('2')"><span><em class="num">{{totXpsAm | numberFilter}}</em>원</span></a></dd>
                            </dl>
                            <!--[v4.0] 지출목표 등록된 경우-->

                            <dl v-if="xpsObtAm != 0" class="target">
                                <dt>지출목표</dt>
                                <dd><span><em class="num">{{xpsObtAm | numberFilter}}</em>원</span></dd>
                            </dl>                            
                             <div v-if="xpsObtAm != 0 && totXpsAm < xpsObtAm" class="goal">
                                사용 가능한 지출이 <span><em class="num">{{ xpsObtAm - totXpsAm | numberFilter}}</em>원</span> 남았어요.
                            </div>
           
                            <div v-else-if="xpsObtAm != 0 && totXpsAm >= xpsObtAm" class="goal">
                                목표금액에서 <span><em class="num" >{{ totXpsAm - xpsObtAm  | numberFilter}}</em>원</span> 초과 되었어요.<br>지출한 금액을 한 번 점검해 보세요.
                            </div>
                            <!--//[v4.0] 지출목표 추가-->
                        </div>                                          

                        <!-- //1011 UI 변경 -->
                        <div class="cal_tb">
                            <cmmCalendar :pRzsBas='rzsBas' :pYYYYMM='rszYYYYMM' @selectWeekDateEvent="callComponentEvent" />
                        </div>
                    </div>
                    <div class="com_space_type01"></div>
                    <div class="calendar_detail" id="calendar_detail">
                        <!--[v4.0] 조회조건 추가-->
                        <div class="all_filter com_inner">
                            <a href="javascript:void(0);" role="button" @click="fn_searchPop()">{{srchCndStr}}</a>
                        </div>	
                        <!--[v4.0] 조회조건 추가-->
                        
                        <div class="calendar_notice_box">
                            <div class="inner_wrap">
                                <div v-if="modifiedList.length > 0">
                                    <div v-for="item in modifiedList" :key="item.dtForList">
                                        <div class="com_inner">
                                            <div class="new_tit_area">
                                                <div class="tit"><em>{{item.dtForList | dateFilter('M')}}</em><span>월</span><em>{{item.dtForList | dateFilter('D')}}</em><span>일({{item.dowForList}})</span></div>
                                            </div>
                                            <ul class="list_type_01">
                                                <li v-for="(listObj, index) in item.list" :key="item.list + '_' + index">
                                                    <a href="javascript:void(0);" @click.prevent="moveDetl(listObj)">
                                                        <!-- 자산카테고리 구분코드 1:수입 -->
                                                        <dl v-if="listObj.asetCtgrDsc === '1'">
                                                            <dt>
                                                                <div>
                                                                    <i :class="`expIcon ${listObj.asetAmnCtgrId}`"><span class="blind">{{listObj.ctgrnm}}</span></i>
                                                                    <em v-if="listObj.mchtnm">{{listObj.mchtnm}}</em>
                                                                    <span>{{listObj.cdcoCdWrsnm}}</span>
                                                                </div>
                                                            </dt>
                                                            <dd>
                                                                <span class="com_point_blue">
                                                                    <em :class="listObj.xpsTrTpc === 'CANCEL' ? 'num cancelLine' : 'num ' ">{{listObj.revXpsAm | numberFilter}}</em>
                                                                    <em class="unit">원</em>
                                                                </span>
                                                            </dd>
                                                        </dl>
                                                        <!-- 자산카테고리 구분코드 2:지출 -->
                                                        <dl v-if="listObj.asetCtgrDsc === '2'">
                                                            <dt>
                                                                <div>
                                                                    <i :class="`expIcon ${listObj.asetAmnCtgrId}`"><span class="blind">{{listObj.ctgrnm}}</span></i>
                                                                    <em v-if="listObj.mchtnm">{{listObj.mchtnm}}</em>
                                                                    <span>{{listObj.cdcoCdWrsnm}}</span>
                                                                </div>
                                                            </dt>
                                                            <dd>
                                                                <span class="com_point_red">
                                                                    <em :class="item.xpsTrTpc === 'CANCEL' ? 'num cancelLine' : 'num ' ">-{{listObj.revXpsAm | numberFilter}}</em>
                                                                    <em class="unit">원</em>
                                                                </span>
                                                            </dd>
                                                        </dl>
                                                        <!-- 자산카테고리 구분코드 3:이체 -->
                                                        <!-- <dl v-if="item.asetCtgrDsc === '3'">
                                                            <dt>
                                                                <div>
                                                                    <i :class="item.dpzAcTrTpc === '02' ? 'AS30000001' : 'AS10000002'"><span class="blind">{{item.dpzAcTrTpc === '02' ? '이체지출' : '이체수입'}}</span></i>
                                                                    <em v-if="item.mchtnm">{{item.mchtnm}}</em>
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
                                        <div class="com_space_type01"></div>
                                    </div>
                                </div>

                                <!-- 조회내역이 없을경우 S -->
                                <div class="no_data_box grayExclamationType" v-if="dayList.length === 0">
                                    <div class="no_data_list">
                                        <p>조회된 정보가 없습니다.</p>
                                    </div>
                                </div>
                                <!--// 조회내역이 없을경우 E -->

                                <div class="com_inner">
                                    <div class="com_btn_area"><a href="javascript:void(0);" class="com_btn_more" @click.prevent="showMoreList()" :style="noMoreList"><span>더보기</span></a></div><!-- 200727 .com_btn_area로 수정 -->
                                </div>                                

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
                                                        <em v-if="item.mchtnm">{{item.mchtnm}}</em>
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
    import LCFD4009 from '@/views/page/LC/FD/LCFD4009/LCFD4009'
    import PDMY4033 from '@/views/page/PD/MY/PDMY4033/PDMY4033' // 지출목표(상세조회) v.40
    import PDMY4032 from '@/views/page/PD/MY/PDMY4032/PDMY4032' // 지출목표 등록    
	import _ from 'lodash'    
    import store from '@/store'
    import {mapGetters} from 'vuex'

    import {dateFormat, getDayDowCName, monthAdd, getLastDay} from '@/utils/date'
    import {cmmCalendarClear} from '@/utils/jUtils'

    export default {
        name : "LCFD4001",
        data: () => {
            return {
                monthList       : [],           // 수입지출실적목록
                dayList         : [],           // 수입지출일별목록
                istList         : [],           // 할부목록
                istSam          : 0,
                // year        : 0,
                // month       : 0,
                day             : 0,
                dayFlag         : "",

                days            : ['일','월','화','수','목','금','토',],
                dates           : [],
                currentYear     : 0,
                currentMonth    : 0,
                currentDay      : 0,
                year            : 0,
                month           : 0,
                toDay           : 0,
                rzsBas          :  [], 
                rszYYYYMM       : '',
                currentWeek     : null,
                currentRzsBas   : [],
                totRevAm        : 0,
                totXpsAm        : 0,
                xpsObtAm        : 0,
                // S :: add. 21.07.21 수입/지출 float, dimmed 처리용
                isShowFloatDiv  : false,  
                // E :: add. 21.07.21 수입/지출 float, dimmed 처리용
                inqYn           : "0",      // 조건검색 여부
                inqStrDt        : "",       // 조회시작일자
                inqEndDt        : "",       // 조회종료일자
                mchtnmCnd	    : "",       // 가맹점명 검색조건
                xpsMnsCnd		: "",       // 지출수단 검색조건
                xpsMnsCndLabel  : "",       // 지출수단 검색조건 라벨
                amCnd			: "",       // 결제금액 검색조건
                amCndLabel		: "",       // 결제금액 검색조건 라벨
                stsCnd			: "",       // 거래상태 검색조건
                stsCndLabel		: "",       // 거래상태 검색조건 라벨  
                trDtCnd         : "desc",   // 내역정렬 검색조건
                trDtCndLabel    : "",       // 내역정렬 검색조건 라벨

                list		    : [],       // 목록
                modifiedList    : [],       // 정정일자, 결제일자별 내림차순 정렬한 리스트

                count           : 0,        // 목록건수
                pageNo			: 1,        // 페이지넘버(서비스에서 페이징 처리하기로 해서 페이지 넘버로 보냄, 최초 1)
                nxDataYn		: "",       // 다음페이지 존재여부
            }
        },
        computed : {
            disabledButton() {
                return this.currYYYYMM == this.rszYYYYMM ? 'disabled' : ''
            },
            noMoreList() {
                return (this.nxDataYn == 'Y')?"":"display : none"
            },            
            /**
             * 검색조건을 화면에 출력하기 위한 문자열
             */
            srchCndStr() {

                // if(   this.inqStrDt  == '' && this.inqEndDt == '' && this.mchtnmCnd == '' 
                //    && this.xpsMnsCnd == '' && this.amCnd    == '' && this.stsCnd    == '') 
                // {                
                console.log("srchCndStr : mchtnmCnd", this.mchtnmCnd)
                console.log("srchCndStr : xpsMnsCnd", this.xpsMnsCnd)
                console.log("srchCndStr : amCnd", this.amCnd)
                console.log("srchCndStr : stsCnd", this.stsCnd)
                if(   this.mchtnmCnd == '' && this.xpsMnsCnd == '' && this.amCnd    == '' && this.stsCnd    == '') 
                {
                    return '전체'

                }else{
                    let strArr = []
                    // if(this.inqStrDt) {
                    //     strArr.push(this.inqStrDt)
                    // }

                    // if(this.inqEndDt) {
                    //     strArr.push(this.inqEndDt)
                    // }

                    if(this.mchtnmCnd) {
                        strArr.push(this.mchtnmCnd)
                    }

                    if(this.xpsMnsCnd) {
                        strArr.push(this.xpsMnsCndLabel)
                    }

                    if(this.amCnd) {
                        strArr.push(this.amCndLabel)
                    }

                    if(this.stsCnd) {
                        strArr.push(this.stsCndLabel)
                    }

                    if(this.trDtCnd) {
                        strArr.push(this.trDtCndLabel)
                    }

                    return strArr.join(' | ')
                }
            }
        },
        created() {
            const date        = new Date()
            this.year         = date.getFullYear()   //현재년
            this.month        = ("0" + (date.getMonth() +1)).slice(-2)  //현재월 00
            this.currentDay   = ("0" + (date.getDate())).slice(-2) //date.getDate()
            this.currentYear  = this.year
            this.currentMonth = this.month
            this.toDay        = this.currentDay
            this.rszYYYYMM    = this.currentYear + "" + this.currentMonth
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
                this.mydtCusno  = this.getUserInfo('mydtCusno')
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
            /* 금융달력 월별 조회 */
            getCalenderList(){

                // 금융(수입, 지출, 이체) 목록 조회
                let now = new Date()
                let nowYYYYMM = `${now.getFullYear()}${("0" + (now.getMonth() +1)).slice(-2)}`
                let paramYYYYMM = this.currentYear + '' + this.currentMonth
                console.log('###### ', nowYYYYMM, paramYYYYMM)

                // 금융캘린더 조회 
                const config = {
                    url : '/lc/fd/01r07',
                    data : {
                          mydtCusno : this.mydtCusno       // 마이데이터고객번호
                        , basYm : this.currentYear + '' + this.currentMonth
                        , basDt : this.currentYear + '' + this.currentMonth + '' + this.currentDay    
                    }                    
                }
                apiService.call(config).then(response => {
                    console.log('getCalenderList==>', config)
                    console.log('금융캘린더 월별 : response==>', JSON.parse(JSON.stringify(response)))
                    this.monthList = response.monthList || []                // 수입지출실적목록
                    this.totRevAm = 0
                    this.totXpsAm = 0
                    this.xpsObtAm = response.xpsObtAm || 0
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


                    if (nowYYYYMM == paramYYYYMM){
                        this.xpsObtLastDd = this.currentDay
                    } else {
                        this.xpsObtLastDd = dateFormat(getLastDay(dateFormat(paramYYYYMM+'01', 'YYYYMMDD')), 'DD')
                    }
                    console.log("p_date   : ", p_date)
                    console.log("nowYYYYMM   : ", nowYYYYMM)
                    console.log("paramYYYYMM : ", paramYYYYMM)
                    console.log("xpsObtLastDd : ", this.xpsObtLastDd)

                    console.log("getCalenderList()", this.currentDay)

                    /* 일별 조회 호출 */
                    this.getCalenderDetl(this.currentDay)  // 일별 조회
                    //return this.monthList
                })
                
            },
            /* 금융달력 일별 조회 */
            getCalenderDetl(paramDay, isDayClick=false){

                this.fn_initSrch() // 검색조건 초기화

                this.currentDay = ("0" + (paramDay)).slice(-2)

                console.log("getCalenderDetl()", this.currentDay)
                console.log("this.currentYear + '' + this.currentMonth + '' + this.currentDay",this.currentYear + '' + this.currentMonth + '' + this.currentDay)
                this.dayFlag = getDayDowCName(this.currentYear + '' + this.currentMonth + '' + this.currentDay)
                console.log("dayFlag>",this.dayFlag)
                
                // 금융캘린더 항목 조회 (일별 거래정보)
                const config = {
                    url : '/lc/fd/01r08',
                    data : {
                        mydtCusno : this.mydtCusno,                                // 마이데이터고객번호
                        basYm     : this.currentYear + '' + this.currentMonth,
                        basDt     : this.currentYear + '' + this.currentMonth + '' + this.currentDay,
                        inqStrDt  : this.currentYear + '' + this.currentMonth + '' + this.currentDay,
                        inqEndDt  : this.currentYear + '' + this.currentMonth + '' + this.currentDay,
                        trDtCnd   : 'desc',
                        pageNo    : 1,
                        pageCount : 50,
                    },
                    disableLoading : true
                }
                setTimeout(() => {
                    apiService.call(config).then(response => {
                        console.log('금융캘린더 항목조회', response)

                        this.dayList = response.dayList || []                     // 수입지출일별목록

                        let tmpList = []
                        for(var i=0; i<this.dayList.length; i++){
                            tmpList.push(this.dayList[i])
                            tmpList[i].dtForList   = dateFormat(this.dayList[i].trDt, 'YYYYMMDD')
                            tmpList[i].dowForList  = getDayDowCName(dateFormat(this.dayList[i].trDt, 'YYYYMMDD')) 
                        }
                        console.log("tmpList ==> ", tmpList)
                         this.modifiedList = _.chain(tmpList)
                              .uniqBy('dtForList')
                              .map(d => {
                                  return {
                                      dtForList   : d.dtForList,
                                      dowForList  : d.dowForList,
                                      list		  : _.filter(tmpList, {dtForList : d.dtForList})
                                  }
                              })
                              .value()
                        console.log("this.modifiedList ==> ", this.modifiedList)
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
                        mydtCusno : this.mydtCusno,                 // 마이데이터고객번호
                        rzsBasYm  : this.currentYear + '' + this.currentMonth      // 실적기준년월
                    }
                }
                apiService.call(config).then(response => {
                    console.log(response)
                    this.istSam = response.istSam                        // 할부금액 합계
                    this.istList = response.istList                      // 할부결제목록
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

                 item.reqFlag     = 'LCFD4001'  // LCFD2003에서 팝업닫을 때 close()를 쓰도록 구분하기 위한 flag

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
            /*
            * v4.0 지출목표조회 팝업
            */
            openPopTarget() {
                var param = { "stYm": this.currentYear + '' + this.currentMonth, "preXpsAm": this.xpsObtAm}
                const config = {
                    component: PDMY4033,
                    params : param
                }
                modalService.openPopup(config).then(() => {
                    this.getData()
                })
            },
            /*
            * v4.0 지출목표등록 팝업
            */
            openPopPDMY() {
                const config = {
                    component: PDMY4032
                }
                modalService.openPopup(config).then((response) => {
                    if (response == "reSelect") {
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
                    this.rszYYYYMM    = monthAdd(add, this.rszYYYYMM, "YYYYMM")
                    this.currentYear  = this.rszYYYYMM.substring(0,4)
                    this.currentMonth = this.rszYYYYMM.substring(4,6)
                }

console.log("day currentYear  : ", this.currentYear )
console.log("day currentMonth : ", this.currentMonth)
console.log("day currentDay   : ", this.currentDay  )
console.log("day year         : ", this.year        )
console.log("day month        : ", this.month       )
console.log("day toDay        : ", this.toDay       )
console.log("day rzsBas       : ", this.rzsBas      )
console.log("day rszYYYYMM    : ", this.rszYYYYMM   )
console.log("day currYYYYMM   : ", this.currYYYYMM  )


                this.fn_initSrch()

                this.currentDay = "01"

                // 년월 선택 후 재조회
                this.getCalenderList()  // 금융달력 월별 조회
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
                    
                    this.fn_initSrch() // 검색조건 초기화

                    if( (this.currentYear + '' + this.currentMonth) === (response.substring(0,4) + '' + response.substring(4,6)) ){
                        console.log('달력 변동없음.')
                        return false
                    }
                    this.currentYear = response.substring(0,4)
                    this.currentMonth = response.substring(4,6)
                    this.rszYYYYMM = this.currentYear + '' + this.currentMonth
                    // 년월 선택 후 재조회
                    this.getCalenderList()  // 금융달력 월별 조회
                    // this.getCalenderDetl()
                    this.getIstList()
                })
            },
            setCalendarData(){
                //const yyyymm = year + "" + month
                console.log('이쪽오나...')
                this.getCalenderList()  //금융달력 월별 조회

            },
            assetAdd(flag){
                // S :: add. 21.07.21 float dimmed, div close
                this.fn_closeFloatDiv()
                // E :: add. 21.07.21 float dimmed, div close

                let compName = LCFD2007

                var param = {
                    "assetFlag" : flag,
                    "selectDate" : this.currentYear + '.' + this.currentMonth + '.' + this.currentDay
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
                        const rszYYYYMM    = this.rszYYYYMM;

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
            },
            openPopDownload() {

                let compName = LCFD4009
                let tmpStrDt  = ""      
                let tmpEndDt  = ""

                if (this.inqStrDt == "") {
                    tmpStrDt = this.currentYear + '.' + this.currentMonth + '.' + '01'
                } else {
                    tmpStrDt = dateFormat(this.inqStrDt, 'YYYY.MM.DD')
                }
                
                if (this.inqEndDt == "") {
                    tmpEndDt = this.currentYear + '.' + this.currentMonth + '.' + this.currentDay
                }else{
                    tmpEndDt = dateFormat(this.inqEndDt, 'YYYY.MM.DD')
                }             
                console.log("tmpStrDt ~ tmpEndDt>>>",tmpStrDt + "~"+ tmpEndDt)                        

                const config = {
                    component : LCFD4009,
                    params : {
                        mydtCusno   : this.mydtCusno ,                                                      // 마이데이터고객번호
                        basYm       : this.currentYear + '' + this.currentMonth,                            // 기준년월
                        basDt       : this.currentYear + '' + this.currentMonth + '' + this.currentDay,     // 기준일자
                        inqStrDt    : tmpStrDt,                                                             // 조회시작일자
                        inqEndDt    : tmpEndDt,                                                             // 조회종료일자
                        xpsMnsCnd   : this.xpsMnsCnd,                                                       // 지출수단
                        trDtCnd     : this.trDtCnd,                                                         // 내역정렬                        
                    }
                }                
                modalService.openPopup(config).then(response => {
                    if(response === 'complete'){
                         //this.getData()
                    }
                })

            },            
            /*
               v4.0 검색조건 초기화
             */            
            fn_initSrch(){
                
                this.inqYn           = "0"      // 조건검색 여부
                this.inqStrDt        = ""       // 조회시작일자
                this.inqEndDt        = ""       // 조회종료일자
                this.mchtnmCnd	     = ""       // 가맹점명 검색조건
                this.xpsMnsCnd		 = ""       // 지출수단 검색조건
                this.xpsMnsCndLabel  = ""       // 지출수단 검색조건 라벨
                this.amCnd			 = ""       // 결제금액 검색조건
                this.amCndLabel		 = ""       // 결제금액 검색조건 라벨
                this.stsCnd			 = ""       // 거래상태 검색조건
                this.stsCndLabel	 = ""       // 거래상태 검색조건 라벨  
                this.trDtCnd         = "desc"   // 내역정렬 검색조건
                this.trDtCndLabel    = ""       // 거래상태 검색조건 라벨
            },
            /*
                v4.0 검색조건 팝업 호출
             */
            fn_searchPop(){
                let tmpStrDt  = ""      
                let tmpEndDt  = ""

                if (this.inqStrDt == "") {
                    tmpStrDt = this.currentYear + '.' + this.currentMonth + '.' + '01'
                } else {
                    tmpStrDt = dateFormat(this.inqStrDt, 'YYYY.MM.DD')
                }
                
                if (this.inqEndDt == "") {
                    tmpEndDt = this.currentYear + '.' + this.currentMonth + '.' + this.currentDay
                }else{
                    tmpEndDt = dateFormat(this.inqEndDt, 'YYYY.MM.DD')
                }             
                console.log("tmpStrDt ~ tmpEndDt>>>",tmpStrDt + "~"+ tmpEndDt)       
                
                const config = {
                    component : LCFD4008,
                    params : {
                        mydtCusno   : this.mydtCusno ,                                       // 마이데이터고객번호
                        basYm       : this.currentYear + '' + this.currentMonth,                            // 기준년월
                        basDt       : this.currentYear + '' + this.currentMonth + '' + this.currentDay,     // 기준일자
                        inqStrDt    : tmpStrDt,                                                        // 조회시작일자
                        inqEndDt    : tmpEndDt,                                                        // 조회종료일자
                        mchtnmCnd	: this.mchtnmCnd,                                                       // 가맹점
                        xpsMnsCnd   : this.xpsMnsCnd,                                                       // 지출수단
                        amCnd		: this.amCnd,                                                           // 결제금액
                        stsCnd		: this.stsCnd,                                                          // 거래상태
                        trDtCnd     : this.trDtCnd,                                                        // 내역정렬
                    }
                }
                modalService.openPopup(config).then(response => {
               
                    console.log("response>>>",response)
                    if(response.inqYn !== undefined){
                        this.inqYn          = response.inqYn
                        this.inqStrDt       = response.inqStrDt
                        this.inqEndDt       = response.inqEndDt
                        this.mchtnmCnd      = response.mchtnmCnd
                        this.xpsMnsCnd      = response.xpsMnsCnd
                        this.xpsMnsCndLabel = response.xpsMnsCndLabel
                        this.amCnd          = response.amCnd
                        this.amCndLabel     = response.amCndLabel
                        this.stsCnd         = response.stsCnd
                        this.stsCndLabel    = response.stsCndLabel
                        this.trDtCnd        = response.trDtCnd
                        this.trDtCndLabel   = response.trDtCndLabel
                        
                        this.pageNo = 1
                        this.getCalenderDayList()
                    }

                    const _top = $(".calendar_detail").position().top - 10;

                    setTimeout(function(){
                        $('html, body').stop().animate({
                            scrollTop : _top
                        },300)
                    }, 0)
                })
            },
            /*
                v4.0 조건검색 실행
             */
            getCalenderDayList(){
                console.log("getCalenderDetl()", this.currentDay)

                const config = {
                    url : '/lc/fd/01r08',
                    data : {
                        mydtCusno   : this.mydtCusno,                                // 마이데이터고객번호
                        basYm       : this.currYYYYMM,
                        //basDt       : this.currentYear + '' + this.currentMonth + '' + this.currentDay,
                        inqYn       : this.inqYn,
                        inqStrDt    : this.inqStrDt.split(".").join(""),
                        inqEndDt    : this.inqEndDt.split(".").join(""),
                        mchtnmCnd   : this.mchtnmCnd,
                        xpsMnsCnd   : this.xpsMnsCnd,
                        amCnd       : this.amCnd,
                        stsCnd      : this.stsCnd,
                        trDtCnd     : this.trDtCnd,
                        pageNo      : 1,
                        pageCount   : 50
                    },
                    disableLoading : true
                }
                setTimeout(() => {
                    apiService.call(config).then(response => {
                        console.log('금융캘린더 검색 조회', response)

                        this.nxDataYn   = response.nxDataYn || 'N'      // 다음 페이지 여부
                        this.count		= response.dayCn   || 0        // 조회건수
                        this.dayList    = response.dayList  || []       // 수입지출일별목록

                        let tmpList = []
                        for(var i=0; i<this.dayList.length; i++){
                            tmpList.push(this.dayList[i])
                            tmpList[i].dtForList   = dateFormat(this.dayList[i].trDt, 'YYYYMMDD')
                            tmpList[i].dowForList  = getDayDowCName(dateFormat(this.dayList[i].trDt, 'YYYYMMDD')) 
                        }
                        console.log("this.list ==> ", tmpList)

                        this.modifiedList = _.chain(tmpList)
                            .uniqBy('dtForList')
                            .map(d => {
                                  return {
                                      dtForList   : d.dtForList,
                                      dowForList  : d.dowForList,
                                      list        : _.filter(tmpList, {dtForList : d.dtForList})
                                  }
                            })
                            .value()

                        console.log("this.modifiedList ==> ", this.modifiedList)
                        //DIV이동 updated에서 처리
                    }).then(() =>{

                        //일자 클릭일때만 focus 이동 modify 2021.11.05
                        // if(isDayClick === true) {
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
                        // }
                    })
                },10)
            }, 
            // 더보기
            showMoreList() {
                this.pageNo += 1

                const config = {
                    url : '/lc/fd/01r08',
                    data : {
                        mydtCusno   : this.mydtCusno,                                // 마이데이터고객번호
                        basYm       : this.currYYYYMM,
                        //basDt       : this.currentYear + '' + this.currentMonth + '' + this.currentDay,
                        inqYn       : this.inqYn,
                        inqStrDt    : this.inqStrDt.split(".").join(""),
                        inqEndDt    : this.inqEndDt.split(".").join(""),
                        mchtnmCnd   : this.mchtnmCnd ,
                        xpsMnsCnd   : this.xpsMnsCnd ,
                        amCnd       : this.amCnd  ,
                        stsCnd      : this.stsCnd ,
                        trDtCnd     : this.trDtCnd ,
                        pageNo      : this.pageNo  ,
                        pageCount   : 50
                    },
                    disableLoading : true
                }
                apiService.call(config).then(response => {

                    var i = 0
                    this.nxDataYn	 = response.nxDataYn || 'N'
                    this.count      += response.dayCn || 0
                    
                    for(i=0; i<response.dayList.length; i++) {
                        this.dayList.push(response.dayList[i])   // 수입지출일별목록 Add
                    }


                        let tmpList = []
                        for(var i = 0; i < this.dayList.length; i++){
                            tmpList.push(this.dayList[i])
                            tmpList[i].dtForList   = dateFormat(this.dayList[i].trDt, 'YYYYMMDD')
                            tmpList[i].dowForList  = getDayDowCName(dateFormat(this.dayList[i].trDt, 'YYYYMMDD')) 
                        }
                        console.log("this.list ==> ", tmpList)

                        this.modifiedList = _.chain(tmpList)
                            .uniqBy('dtForList')
                            .map(d => {
                                  return {
                                      dtForList   : d.dtForList,
                                      dowForList  : d.dowForList,
                                      list        : _.filter(tmpList, {dtForList : d.dtForList})
                                  }
                            })
                            .value()

                        console.log("this.modifiedList ==> ", this.modifiedList)
                })
            },

        },      
        components : {
            Page,
            FootersV2,
            CmmCalendar
        }
    }

</script>