<!--
/*************************************************************************
* @ 서비스경로 : 제휴서비스 > 영농캘린더 > 메인
* @ 페이지설명 : 영농캘린더 메인
* @ 파일명     : src/views/page/SZ/FC/SZFC2101/SZFC2101.vue
* @ 작성자     : 
* @ 작성일     : 2021-04-30
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-04-30                                    최초작성
* 2021-06-02                                    퍼블리싱 적용
* 2021-06-24                                    수정사항 적용
* 2021-07-01                                    추가사항 적용
* 2021-08-05                                    추가사항 적용(퍼블)
* 2021-09-01                                    추가사항 적용
* 2021-10-20            CS515731                floating 버튼시 overflow 처리 추가
*************************************************************************/
-->
<template>
    <!-- kimhc_20220922 수정-->
    <!-- <page class="content-view"> -->
    <page class="content-view hasLNB">
        <an-category-v2 type="SZFC"></an-category-v2>
        <an-sub-category-v2 type="FC"></an-sub-category-v2>

        <!-- <div class="com_tabmenu_type02">
            <sz-category-v2 type="FR"></sz-category-v2>
        </div> -->  


        <!--변경(2021.07.14)-->
        <!-- <sz-category-v2 type="FC" :aria-hidden="isShowFloatDiv"></sz-category-v2>   -->

        <div id="content" :aria-hidden="isShowFloatDiv" class="com_sub_type02 com_bg_type00 com_no_bottom">
            <!-- <div class="calendar_wrap com_space_type01"> -->
                <div class="calendar_wrap myfarm_calendar_wrap"> <!--2021.10.08 변경(퍼블)-->
                <section>
                    <!--2021.07.23(금) 기획 변경 사항-->
					<div class="calendar_top">  
                        <div class="calendar_top_control"> 
                            <div class="calendar_top_date_control">
                                <!--좌우 버튼에 disabled 클래스 추가 시 disabled 버튼 -->
                                <button class="cal_btn cal_prev" aria-label="한달 전 이동" title="한달 전 이동" v-on:click.prevent="fn_bfraftClamp('p')"></button>  <!--년월 이전(<) 선택-->   
                                <div title="년월선택" class="cal_date">
                                    <div class="year"><span class="num">{{currentYear}}</span>년</div>
                                    <div class="month"><span class="num" @click.prevent="selectMonth()">{{currentMonth}}</span>월</div>
                                </div>

                                <!--2021.10.15(금) 변경-->    
                                <template v-if="prv_ena_yn === 'n' ">  <!--날짜 prev 진행여부 n(nexxt)-->
                                    <button class="cal_btn cal_next disabled" disabled="disabled" title="선택불가" aria-label="한달 후 이동"></button>         
                                </template> 
                                <template v-else> 
                                    <button class="cal_btn cal_next" title="한달 후 이동" aria-label="한달 후 이동" v-on:click.prevent="fn_bfraftClamp('n')"></button> 
                                </template> 
                                <!--2021.10.15(금) 변경-->    

                            </div>
                            <button class="select_date select_date_type02" title="작목선택" v-on:click.prevent="fn_slidmyFarmPopOpen()">   <!--나의농장 Slide팝업 선택시-->
                                <em>{{myFarmTxt}}</em><span class="caret"></span>
                            </button>
                        </div> <!--calendar_top_control(End)--> 
                        <div class="calendar_top_list">  
                            <div class="list">
                                <div class="title">수입</div>
                                <template>
                                    <button class="link" title="수입 상세보기" v-on:click.prevent="fn_popupSel(1)">
                                        <span class="num">{{varRevSam | numberFilter}}</span>원
                                    </button>
                                 </template>
                            </div>
                            <div class="list">
                                <div class="title">지출</div>
                                <button class="link" title="지출 상세보기"  v-on:click.prevent="fn_popupSel(2)">
                                    <span  class="num">{{varXpsSam | numberFilter}}</span>원
                                </button>
                            </div>
                            <div class="list">
                                <div class="title">농축협 외상</div>
                                <button class="link" title="농축협외상 상세보기" v-on:click.prevent="fn_popupSel(3)">
                                    <span class="num">{{varCrdSam | numberFilter}}</span>원
                                </button>
                            </div>
                        </div> <!--calendar_top_list(End)-->
                    </div>   <!--calendar_top(End)-->
                    <!--2021.07.23(금) 기획 변경 사항-->

                    <!--달력(Start) << //영농캘린더 달력사항 추가(2021.06.24) -->
                    <!--cmmCalendar :pRzsBas='rzsBas' :pYYYYMM='rszYYYYMM' @selectWeekDateEvent="callComponentEvent" /-->
                    <cmmCalendar :pBizType="'SZ'" :pRzsBas='rzsBas' :pYYYYMM='rszYYYYMM' @selectWeekDateEvent="callComponentEvent" />
                    <!--달력(End)  -->

                    <!--하단(Start)-->

                    <div id='calendar_detail' class="calendar_detail diary_list_view">
                        <div class="calendar_notice_box">
                            <div class="inner_wrap">

                            <div class="com_list_type01 com_inner pt23 ">    

                            <!--(변수)일자별조회건수 > 0 인경우(Start)-->            
                            <template v-if="varDdtbyInqCn > 0 ">    
                                <div class="calendar_list_view pt0 pb0" v-for="(dtbyInq, index) in dtbyInqList" :key="index">
                                    <div :id="'l_'+dtbyInq.trday" :ref="'l_'+dtbyInq.trday" >   

                                    <!-- 변경(2021.09.09(수)/2021.09.17(금) -->
                                    <strong :class="fn_dayCompare(rszYYYYMM, dtbyInq.trday, nowDt) === '9'?'day today': fn_dayLine(varDdtbyInqCn)">{{dtbyInq.trday}}  
                                        <span class="week">{{IMG_RBRIT}}{{dtbyInq.downm}}{{IMG_LBRIT}}</span>  
                                        <span v-show="fn_dayCompare(rszYYYYMM, dtbyInq.trday, nowDt) === '9'" :style="fn_dayCompare(rszYYYYMM, dtbyInq.trday, nowDt) === '9'?'display:block':'display:block' " >today</span>  
                                    </strong> 
                                    <!-- 변경(2021.09.09(수)/2021.09.17(금) -->

                                   <div class="view_list_area">     

                                        <!--거래목록(transList) 리스트(Start)--->          
                                        <template v-for="(trans, idx2) in dtbyInq.transList" >       

                                            <div class="view_list" data-ui-toggle="box" :key="'dl_'+index+'trans'+idx2"> 
                                                <dl>
                                                    <dt>
                                                        <template v-if="trans.title !== null ">   
                                                            <em>{{trans.title}}</em>   <!--타이틀-->
                                                        </template>
                                                        <span> 
                                                            <template v-if="trans.dsc !== null ">   
                                                                <em>{{trans.dsc}}</em>   <!--Description-->
                                                            </template>
                                                        </span> 
                                                        <a title="상세보기" href="javascript:void(0);"  role="button" v-if="trans.slDtlCn > 0 " aria-expanded="false" class="detail_view">
                                                            <span>상세보기</span>
                                                        </a>
                                                    </dt>

                                                    <!--금액구분코드가 3(수입금액제외) or 4(수출금액제외)인 경우만~~ -->
                                                    <dd :class=" trans.amDsc2 === '3' || trans.amDsc2 === '4' ? 'add_chagam' : ''" >

                                                        <!--매출상세수 = 0일 경우에만 상세조회 가능하게~~-/2021.09.01 추가-->
                                                        <template v-if="trans.slDtlCn === 0">   
                                                            <a href="javascript:void(0);"  role="button"
                                                               class="txt_link" @click="fn_openMyFarmDetailPop(trans.amDsc, trans.bsnDscnm, trans.dtlInqKey, 0, trans.delPsbYn, trans.slDtlCn)"> 
                                                                
                                                                <!--span1 1(수입)/3(수입금액제외)-블루, 2(지출)/4(수출금액제외)-레드-->          
                                                                <span :class="fn_spanColor(trans.amDsc)">
                                                                <template v-if="trans.amDsc === '2'">  <!--2(지출)일 경우-->
                                                                    <em class="num ">{{IMG_MINUSMRK}}{{trans.tram | numberFilter}}</em>
                                                                    <em class="unit"> 원</em>
                                                                </template>
                                                                <template v-if="trans.amDsc === '1'"> <!--1(수입)경우-->
                                                                    <em class="num ">{{trans.tram | numberFilter}}</em>
                                                                    <em class="unit"> 원</em>
                                                                </template>
                                                                <!--2021/11/17(수) 추가-->
                                                                <template v-if="trans.amDsc === '3' || trans.amDsc === '4' "> 
                                                                    <template v-if="trans.amDsc === '4' "> 
                                                                        <em class="num ">{{IMG_RBRIT}}{{IMG_MINUSMRK}}{{trans.tram | numberFilter}}{{IMG_LBRIT}}</em>
                                                                    </template>
                                                                    <template v-if="trans.amDsc === '3' "> 
                                                                        <em class="num ">{{IMG_RBRIT}}{{trans.tram | numberFilter}}{{IMG_LBRIT}}</em>
                                                                    </template>
                                                                    <em class="unit"> 원</em>
                                                                </template>
                                                                <!--2021/11/17(수) 추가-->
                                                                </span>
                                                                
                                                                <!--span2 3(수입금액제외),4(수출금액제외)-회색-->     
                                                                <template v-if="trans.amDsc2 === '3' || trans.amDsc2 === '4' "> 
                                                                    <span :class="fn_spanColor2(trans.amDsc2)">  <!--3(수입 제외 금액)/4(지출 제외 금액)-회색-->
                                                                        <em class="num ">{{IMG_RBRIT}}{{trans.tram2 | numberFilter}}{{IMG_LBRIT}}</em>
                                                                        <em class="unit"> 원</em>
                                                                    </span>
                                                                </template>
                                                            </a>    
                                                        </template>
                                                        <template v-else> 
                                                            <!--span1 1(수입)/3(수입금액제외)-블루, 2(지출)/4(수출금액제외)-레드-->        
                                                            <span :class="fn_spanColor(trans.amDsc)">
                                                            <template v-if="trans.amDsc === '2'">  <!--2(지출)일 경우-->
                                                                <em class="num ">{{IMG_MINUSMRK}}{{trans.tram | numberFilter}}</em>
                                                                <em class="unit"> 원</em>
                                                            </template>
                                                            <template v-if="trans.amDsc === '1'"> <!--1(수입)경우-->
                                                                <em class="num ">{{trans.tram | numberFilter}}</em>
                                                                <em class="unit"> 원</em>
                                                            </template>
                                                            <!--2021/11/17(수) 추가-->
                                                            <template v-if="trans.amDsc === '3' || trans.amDsc === '4' "> 
                                                                <template v-if="trans.amDsc === '4' "> 
                                                                    <em class="num ">{{IMG_RBRIT}}{{IMG_MINUSMRK}}{{trans.tram | numberFilter}}{{IMG_LBRIT}}</em>
                                                                </template>
                                                                <template v-if="trans.amDsc === '3' "> 
                                                                    <em class="num ">{{IMG_RBRIT}}{{trans.tram | numberFilter}}{{IMG_LBRIT}}</em>
                                                                </template>
                                                                <em class="unit"> 원</em>
                                                            </template>
                                                            <!--2021/11/17(수) 추가-->
                                                            </span>
                                                            
                                                            <!--span2 3(수입금액제외),4(수출금액제외)-회색-->         
                                                            <template v-if="trans.amDsc2 === '3' || trans.amDsc2 === '4' "> 
                                                                <span :class="fn_spanColor2(trans.amDsc2)">  <!--3(수입 제외 금액)/4(지출 제외 금액)-회색-->
                                                                    <em class="num ">{{IMG_RBRIT}}{{trans.tram2 | numberFilter}}{{IMG_LBRIT}}</em>
                                                                    <em class="unit"> 원</em>
                                                                </span>
                                                            </template>
                                                        </template>
                                                        <!--매출상세수 = 0일 경우에만 상세조회 가능하게~~-/2021.09.01 추가-->
                                                    </dd>
                                                </dl>

                                                <!--매출상세 목록(slDtlList) 리스트(Start)-->
                                                <template v-if="trans.slDtlCn > 0 ">  <!--매출상세수 > 0 이상인 경우(경제데이타일 경우) -->
                                                    <div class="detail_view_list" :key="'dtl_'+idx2">										
                                                        <ul>
                                                            <template v-for="(slDtl, idx3) in trans.slDtlList" >
                                                                <!--상세조회(마이고객데이타고객번호|금액구분코드|업무구분코드명|상세조회키|거래일련번호|삭제여부|매출상세수)-->
                                                                <li :key="'sl'+idx3">
                                                                    <a href="javascript:void(0);" role="button"
                                                                       @click="fn_openMyFarmDetailPop(trans.amDsc, trans.bsnDscnm, trans.dtlInqKey, slDtl.trSqno, trans.delPsbYn, trans.slDtlCn)" > <!--추가(2021.08.31)-->
                                                                        <em>{{slDtl.abinm}}</em>   <!--작목명/2021.08.31 추가-->
                                                                        <dl>
                                                                            <dt>(품명)</dt>
                                                                            <dd>
                                                                                <span>{{slDtl.naWrsAbrNm}}</span> <!--경제통합상품약아명-->
                                                                                <!-- <span v-on:click.prevent="fn_openMyFarmDetailPop(trans.amDsc, trans.bsnDscnm, trans.dtlInqKey, slDtl.trSqno)">{{slDtl.naWrsAbrNm}}</span> -->
                                                                            </dd>
                                                                        </dl>
                                                                        <dl>
                                                                            <dt>(수량)</dt>
                                                                            <dd>
                                                                                <!-- <span>{{slDtl.qt | numberFilter}}<span class="bar">개</span></span> -->
                                                                                <span>{{slDtl.qt | numberFilter('0,00')}}</span>

                                                                            </dd>
                                                                            <dt>(금액)</dt>
                                                                            <dd>
                                                                                <span>{{slDtl.am | numberFilter}}<span class="bar">원</span></span>
                                                                            </dd>
                                                                        </dl>
                                                                    </a> <!--추가(2021.08.31)-->
                                                                </li>
                                                            </template> 
                                                        </ul>
                                                    </div>
                                                </template>
                                                <!--매출상세 목록(slDtlList) 리스트(End)-->
                                            </div> <!--view_list(End)-->
                                        </template> 
                                        <!--거래목록(transList) 리스트(End)--->          

                                        <!--마이농가이벤트(myfhsEvtList) 리스트(Start)-->                                        
                                        <template v-if="dtbyInq.myfhsEvtCn > 0 ">    <!--마이농가이벤트수 > 0 이상인 경우-->
                                            <template v-for="(myfhs, idx0) in dtbyInq.myfhsEvtList">                
                                                <div class="cal_pop_info_wrap" :key="'myfhs'+idx0">
                                                    <div class="cal_pop_info">
                                                        <div class="text">
                                                            {{myfhs.myfhsEvntnm}}  <!--마이농가이벤트명-->
                                                        </div>
                                                        <a href="javascript:void(0);"  class="btn_close"><span class="blind">닫기</span></a>
                                                    </div>
                                                </div>
                                            </template> 
                                        </template> 
                                        <!--마이농가이벤트(myfhsEvtList) 리스트(End)-->

                                    </div> <!--view_list_area(End)-->
                                    </div> <!--div(End)-->
                                </div> <!--calendar_list_view(End)-->
                            </template>
                            <template v-else> 
                                <div class="no_data_box">
                                    <div class="no_data_list">
                                        <p>조회된 정보가 없습니다.</p>
                                    </div>
                                </div>
                            </template> 
                            </div> 
                            </div>
                        </div>
                    </div>
                    <!--하단(End)-->
                </section>
            </div>
        </div>

        <!-- + 버튼(Start)-->
        <div class="dimmed_float" @click="fn_closeFloatDiv()" :aria-hidden="isShowFloatDiv"></div>
        <div class="toggle-box sticky">
            <div title="수입/지출 추가" :class="isShowFloatDiv ? 'active open' : 'close'">
                <button type="button" class="btn_float" :aria-expanded="isShowFloatDiv" v-on:click.prevent="fn_showFloatDiv()">
                    <span class="tit">더보기 메뉴</span>
                    <em class="open">열기</em><em class="close">닫기</em>
                </button>
                <div class="view_box p0" v-if="isShowFloatDiv">
                    <button type="button" class="btn_01" v-on:click.prevent="fn_popupSel(8)"><span>수입 추가</span></button>
                    <button type="button" class="btn_02" v-on:click.prevent="fn_popupSel(9)"><span>지출 추가</span></button>
                </div>
            </div>
        </div>
        <!-- + 버튼(End)-->
        
        <footersV2 type="sz" :aria-hidden="isShowFloatDiv" />

    </page>
</template>

<script>
$(document).on('click' , '.btn_close', function(){
	$(this).parents('.cal_pop_info_wrap').css('display','none');
});

import apiService from '@/service/apiService'
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
// import SzCategoryV2 from '@/components/category/SzCategoryV2.vue'
import AnCategoryV2 from '@/components/category/AnCategoryV2.vue'
import AnSubCategoryV2 from '@/components/category/AnSubCategoryV2.vue'
import CmmCalendar from '@/components/CmmCalendar'   //영농캘린더 달력사항 추가(2021.06.24)  
//import {dateFormat} from '@/utils/date'
import commonService from '@/service/commonService'
import {monthAdd} from '@/utils/date'

import SZFC2103 from '@/views/page/SZ/FC/SZFC2103/SZFC2103'
import SZFC2104 from '@/views/page/SZ/FC/SZFC2104/SZFC2104'
import SZFC2105 from '@/views/page/SZ/FC/SZFC2105/SZFC2105'
import SZFC2106 from '@/views/page/SZ/FC/SZFC2106/SZFC2106'
import SZFC2107 from '@/views/page/SZ/FC/SZFC2107/SZFC2107'
// import SZFC2109 from '@/views/page/SZ/FC/SZFC2109/SZFC2109'
import ANSZ2001 from '@/views/page/AN/SZ/ANSZ2001/ANSZ2001'
import SZFC2112 from '@/views/page/SZ/FC/SZFC2112/SZFC2112'
import SZFC2113 from '@/views/page/SZ/FC/SZFC2113/SZFC2113'

export default {
    name : "SZFC2101",

    data: () => {
        return {

              //변수초기화
              popSel         : "",   //팝업선택
              today          : "", 
              myFarmTxt      : "",
              varNaWrs       : "",
              varMydtCusno   : "",
              varNaWrsLclc   : "",  //상품분류코드(대분류)
              varNaWrsMclc   : "",  //상품분류코드(중분류)
              varNaWrsSclc   : "",  //상품분류코드(소분류)
              varNaWrsSclfnm : "",  //상품소분류명
              isInqDsc       : false,
              varInqYm       : "",  //조회년월
              varBnnrCntn    : 0,   //배너내용
              varNaWrsCn     : 0,   //경제통합상품수
              varRevSam      : 0,   //수입금액합계
              varXpsSam      : 0,   //지출금액합계
              varCrdSam      : 0,   //외상금액합계
              varTrday1      : '', 
              varXpsAm1      : '', 
              varRrevAm1     : '', 
              varDdtbyInqCn  : 0,  //일자별조회건수  

              IMG_MINUSMRK    : "-",
              IMG_RBRIT       : "(",
              IMG_LBRIT       : ")",      
            //YM202012       : "202012",        
              //  
              naWrsList      : [],  
              dtbyInqList    : [],
              rzsBas         : [],   //영농캘린더 관련사항 추가(2021.06.28)  
              //    
              rszYYYYMM      : '',
              nowYYYYMM      : '',
              selrszYYYYMM   : '',
              currentYear    : '',  //현재년
              currentMonth   : '',  //현재월 00
              currentDay     : '', 
              nowDt          : '',  
              prv_ena_yn     : '', 

              // S :: add. 21.07.21 수입/지출 float, dimmed 처리용
              isShowFloatDiv : false, 
              // E :: add. 21.07.21 수입/지출 float, dimmed 처리용
              isShowFloatDiv2 : false,
              certAgrYn     : false, 

              pageTitle     : "제휴서비스"
        }
    },

    mixins: [
        commonMixin
    ],

    created() {
      const date        = new Date()

      this.currentYear  = date.getFullYear()   //년
      this.currentMonth = ("0" + (date.getMonth() +1)).slice(-2)  //월 
      this.currentDay   = ("0" + date.getDate()).slice(-2)   //일
      this.rszYYYYMM    = this.currentYear+this.currentMonth   //년월
      this.nowYYYYMM    = this.currentYear+this.currentMonth   //현재일자
      this.nowDay    = ("0" + date.getDate()).slice(-2)
      this.nowDt     = this.nowYYYYMM+this.nowDay
      this.selrszYYYYMM = this.currentYear+this.currentMonth   //년월Slide에서 선택한 년월

      console.log("[SZFC2101]created/(onLoad)년|월|일 =>>> ", this.currentYear, this.currentMonth, this.currentDay )    
      console.log("[SZFC2101]created/(onLoad)년월(rszYYYYMM) =>>> ", this.rszYYYYMM )    
      console.log("[SZFC2101]created/(onLoad)현재일자(nowYYYYMM) =>>> ", this.nowYYYYMM )    
      console.log("[SZFC2101]created/(onLoad)년월Slide 선택/년월 =>>> ", this.selrszYYYYMM )    
      console.log("[SZFC2101]created/(onLoad)년월Slide 선택이전/일(nowDay) =>>> ", this.nowDay )    
      console.log("[SZFC2101]created/(onLoad)년월Slide 선택이전/일(nowDt) =>>> ", this.nowDt )    

    }, 

    mounted() {
        this.initComponent(this.params)

        this.pageTitle = "제휴서비스";

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     

    },

    methods: {
        initComponent(param = {}) {
            this.popId = param.popId
            console.log("[SZFC2101]initComponent/popId=>> ", this.popId)

            console.log(">>> [SZFC2101]methods(Start) <<<")

            this.myFarmTxt = "나의농장"   //나의농장 Select 초기화
            this.isInqDsc = false  //isInqDsc  조회구분코드(마이농장;1,세부작목;2) <<= 조회구분여부 true일 경우 세부작목

            console.log("[SZFC2101]initComponent/마이데이터고객번호=>> ", this.getUserInfo('mydtCusno'))
            console.log("[SZFC2101]initComponent/나의농장 Select 초기화=>> ", this.myFarmTxt)
            console.log("[SZFC2101]initComponent/조회구분코드(여부)=>> ", this.isInqDsc)
            console.log("[SZFC2101]initComponent/년|월=>> ", this.currentYear, this.currentMonth )    

            //2021.10.15 변경 
            //선택년월의 년도 = 현재년월의 년도 인 경우    
            if (this.rszYYYYMM.substring(0,4)  === this.nowYYYYMM.substring(0,4)) {

                if (this.rszYYYYMM.substring(4,6) ===  this.nowYYYYMM.substring(4,6)) {
                     this.prv_ena_yn = 'n'  //날짜 prev 진행여부 n(nexxt)
                    //console.log("[SZFC2101]prv_ena_yn=>> ", this.prv_ena_yn)    
                }    
            } 
            //2021.10.15 변경 

            //2021.11.23(화) 변경
            //if( commonService.getStorage('noSeemyFarm' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno')) !== 'Y' )   //[다시보지 않기] 선택하지 않은 경우~
            //{
            //    console.log(">>> [SZFC2101]initComponent/ //[다시보지 않기] 선택하지 않은 경우 <<< ")

                this.fn_getAsetList()   //정보제공동의여부 조회

            //} else {   ///[다시보지 않기] 선택한 경우~
            //    console.log(">>> [SZFC2101]initComponent/ //[다시보지 않기] 선택한 경우 <<< ")

                //*2021.12.03(금) 추가
                // if( commonService.getStorage('noSeemyFarm' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'sign') !== 'Y' ) {
                //     console.log(">>> [SZFC2101]initComponent/여기 들어왓나?(getStorage) N(안내) <<< ")
                    
                //     this.fn_openSlidePop()
                // } else {
                //     console.log(">>> [SZFC2101]initComponent/여기 들어왓나?(getStorage) Y(안내) <<< ")
                    
                //     this.getSearchList()
                // }
                // //*2021.12.03(금) 추가

            //    this.getSearchList()
            //}
            //2021.11.23(화) 변경

            //this.getSearchList()

            console.log(">>> [SZFC2101]methods(End) <<<")
        },

        //정보제공동의여부 조회
        fn_getAsetList(){

            console.log(">>> [SZFC2101]fn_getAsetList(Start) <<<")

            // 정보제공동의여부 조회(2021.11.04(목) 추가)
            const config = {
                url     : "/co/co/00r03",
                data    : {
                    mydtCusno   : this.getUserInfo("mydtCusno"),
                    ofrHdngC    : "000002",  // 000001 : 카드/자동차, 000002 : 경제데이터
                }
            }
            apiService.call(config).then(response => {
                let agrYn   = response.agrYn    // "0" : 미동의 , "1" : 동의
                console.log("[SZFC2101]fn_getAsetList/동의여부(response.agrYn)=>> ", response.agrYn)
                console.log("[SZFC2101]fn_getAsetList/동의여부(agrYn)=>> ", agrYn)

                let stltTpc = response.stltTpc || ""
                let sqno    = response.sqno
                let ofrHdngC = response.ofrHdngC || ""

                this.certAgrYn = agrYn === "0" ? false : true  //동의여부가 0(미동의)인 경우 false, 1(동의)인 경우 true
                console.log("[SZFC2101]fn_getAsetList/정보제공여부(certAgrYn)=>> ", this.certAgrYn)

                if(!this.certAgrYn) {
                    console.log("[SZFC2101]fn_getAsetList/certAgrYn=>> 미동의(false)~ ")

                    const config_pop = {
                        component: SZFC2112,
                        params : {
                            certAgrYn   : this.certAgrYn || false,   //동의여부
                            stltTpc     : stltTpc,     //약관유형코드
                            sqno        : sqno,        //일련번호
                            ofrHdngC    : ofrHdngC,    //제공항목코드
                            popId       : "SZFC2101",
                        }
                    }
                    modalService.openPopup(config_pop).then(response => {

                        console.log("[SZFC2101]fn_getAsetList/response=>> "+response)

                        if(response === 'noSeemyFarm')   //[다시 선택하지 않기]
                        {
                            console.log("[SZFC2101]fn_getAsetList/ 다시선택하지 않기(noSeemyFarm)~ ")
                            commonService.setStorage('noSeemyFarm' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno')  , 'Y')
                        }

                        //*2021.12.06(월) 추가
                        if(response === 'goSeemyChkFarm')   //[동의]인 경우 
                        {
                            console.log("[SZFC2101]fn_getAsetList/ goSeemyChkFarm(동의서 선텍 맟 서비스 이용하기 선택시~~) ")

                            this.fn_openSlidePop()   
                        } else  if(response === 'goSeemyNonChkFarm' || response === 'goSeemyFarm')   //[미동의]인 경우 or [닫기]버튼 선택시
                        {
                            console.log("[SZFC2101]fn_getAsetList/ goSeemyChkFarm(동의서 미선텍 맟 서비스 이용하기 선택시~~) ")

                              this.getSearchList()   
                        }
                        //*2021.12.06(월) 추가

                    })

                } else {
                    console.log("[SZFC2101]fn_getAsetList/certAgrYn=>> 동의(true)11~ ")

                    //[다시보지 않기] 선택하지 않은 경우~
                    if( commonService.getStorage('noSeemyFarm' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno')) !== 'Y' )   
                    {
                        console.log(">>> [SZFC2101]initComponent/[다시보지 않기] 미선택시~ <<< ")

                        //약관동의 안내문 확인 선택을 하지 않은 경우~        
                        if( commonService.getStorage('noSeemyFarmClaSign' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'Sign') !== 'Y' ) {
                            console.log(">>> [SZFC2101]initComponent/약관동의 안내문 확인 미선택시11~ <<< ")
                            
                            this.fn_openSlidePop()
                        } else {
                            console.log(">>> [SZFC2101]initComponent/약관동의 안내문 확인 선택시22~ <<< ")
                            
                             this.getSearchList()
                        }
                    } else {
                        console.log(">>> [SZFC2101]initComponent/[다시보지 않기] 선택시~ <<< ")

                        this.getSearchList()   //조회
                    }
                }
            })

            console.log(">>> [SZFC2101]fn_getAsetList(End) <<<")
        },

        /*
        * [수입/지출/농협외상/수입추가/지출추가] 팝업호출
        */
        fn_popupSel(filterNum) {
            let component
            
			console.log('[SZFC2101]popupSel-filterNum변수=>>'+filterNum);	

			if (filterNum == 1 || filterNum == 2 ){
				
                component = SZFC2104;   //[팝업]수입/지출 조회

                if (filterNum == 1) {  //수입합계내역 선택시
                    this.popSel = "1"   
                } else if (filterNum == 2){  //지출합계내역 선택시 
                    this.popSel = "2"
                }    

			} else if (filterNum == 3){
				
                component = SZFC2105;   //[팝업]농축협 외상조회

            } else if (filterNum == 8 || filterNum == 9 ) {

                // S :: add. 21.07.21 float dimmed, div close
                this.fn_closeFloatDiv()
                // E :: add. 21.07.21 float dimmed, div close
                
				component = ANSZ2001;   //[팝업]마이농가 수입/지출등록

                if (filterNum == 8) {  //수입합계내역 선택시
                    this.popSel = "8"   
                } else if (filterNum == 9){  //지출합계내역 선택시
                    this.popSel = "9"
                }

            }    

			console.log('[SZFC2101-fn_popupSel입력]팝업선택|조회구분코드(여부)|조회년|조회월=>>'+this.popSel, this.isInqDsc, this.currentYear, this.currentMonth );	
			console.log('[SZFC2101-fn_popupSel입력]상품대분류코드|상품중분류코드|상품소분류코드=>>'+this.naWrsLclc, this.naWrsMclc, this.naWrsSclc );	
			console.log('[SZFC2101-fn_popupSel입력]거래일자=>> '+this.rszYYYYMM, this.currentDay );	
            
			const config = {
				component : component,  
				params : {
                    popSel    : this.popSel,        //팝업선택
                    year      : this.currentYear,   //(변수)년도
                    month     : this.currentMonth,  //(변수)월
                    mydtCusno : this.getUserInfo('mydtCusno'),        //마이데이터고객번호
                    inqYm     : this.currentYear+this.currentMonth,   //조회년월(년월)
                    inqDsc    : !this.isInqDsc?'1':'2',               //조회구분코드(마이농장;1,세부작목;2) <<= 조회구분여부 true일 경우 세부작목
                    naWrsLclc : !this.isInqDsc?'':this.varNaWrsLclc,  //마이농장일 경우 = '', 세부작목 = (변수)경제통합상품대분류코드
                    naWrsMclc : !this.isInqDsc?'':this.varNaWrsMclc,  //마이농장일 경우 = '', 세부작목 = (변수)경제통합상품중분류코드
                    naWrsSclc : !this.isInqDsc?'':this.varNaWrsSclc,  //마이농장일 경우 = '', 세부작목 = (변수)경제통합상품소분류코드
                    trDt      : this.rszYYYYMM+this.currentDay     //거래일자 = 달력에서 선택한 일자(2021.10.13(수) 추가)
				}
			}	    

			modalService.openPopup(config).then(response => {
                if (component == SZFC2104 || component == SZFC2105  || component == ANSZ2001 ) {  //수입/지출 내역조회 or 마이농가 수입/지출등록
                    if (response === 'complete') {
                        this.getSearchList() 
                    }
                }    
            })        
        }, 

        /*
        * [년월 달력] 팝업호출
        */
        selectMonth(){

            console.log(">>>>>>> [SZFC2101]selectMonth(Start) <<<<<<< ")

            console.log("[SZFC2101]selectMonth/currentYear=>> "+this.currentYear)
            console.log("[SZFC2101]selectMonth/currentMonth=>> "+this.currentMonth)

            // 년월선택
            const config = {
                params: {
                    title: '년월 선택',
                    yyyymm : this.currentYear + '' + this.currentMonth,
                    limit  : 60,
                },
            }

            console.log("[SZFC2101]selectMonth/config=>> "+config)

            modalService.openSlideSelectMonth(config).then(response => {
                this.currentYear = response.substring(0,4)
                this.currentMonth = response.substring(4,6)
                this.rszYYYYMM = this.currentYear + '' + this.currentMonth

                console.log('확인용' + this.rszYYYYMM)

                //선택년월의 년도 = 현재년월의 년도 인 경우    
                 if (this.rszYYYYMM.substring(0,4)  === this.nowYYYYMM.substring(0,4)) {
                   
                    //* 2021.10.15(금) 주석처리
                    // if (this.rszYYYYMM.substring(4,6) >  this.nowYYYYMM.substring(4,6)) {
                    //     this.currentMonth = Number(this.currentMonth) - 1
                    //     this.currentMonth = ("0" + (this.currentMonth)).slice(-2)  
                    //     this.rszYYYYMM = this.currentYear + '' + this.currentMonth

                    //     modalService.alert("현재월 또는 이전월만 선택 가능합니다.").then(() => {
                    //         return false
                    //      });
                    // }    
                    //* 2021.10.15(금) 주석처리

                    //* 2021.10.15(금) 추가
                    if (this.rszYYYYMM.substring(4,6) ===  this.nowYYYYMM.substring(4,6)) {
                        this.prv_ena_yn = 'n'   //날짜 prev 진행여부 n(nexxt)
                    } else {
                         this.prv_ena_yn = 'y'  //날짜 prev 진행여부 y(prev)
                    }    
                    //* 2021.10.15(금) 추가

                    //* 추가(2021.08.23)/주석(2021.09.06)
                    //선택년월 == 202101인 경우    
                    // } else if (this.rszYYYYMM  === this.YM202012) {
                    //     this.currentYear = Number(this.currentYear)+ 1         
                    //     this.currentMonth = "01"         
                    //     this.rszYYYYMM = this.currentYear + '' + this.currentMonth

                    //     modalService.alert("2021년 01월 이전은 선택이 불가 합니다.")
                    //     return false
                    // } else {
                    //     this.getSearchList()  //조회
                } else {
                   this.prv_ena_yn = 'y'  //날짜 prev 진행여부 y(prev)
                }


                this.getSearchList()  //조회

            })  

            console.log(">>>>>>> [SZFC2101]selectMonth(End) <<<<<<< ")

        },

        /*
        * [이전/이후 꺽쇠] 선택
        */
        fn_bfraftClamp(flag){
            let add = (flag === "p") ? -1 : 1

            this.rszYYYYMM = monthAdd(add, this.rszYYYYMM, "YYYYMM")
            this.currentYear = this.rszYYYYMM.substring(0,4)
            this.currentMonth = this.rszYYYYMM.substring(4,6)
     
            //선택년월의 년도 = 현재년월의 년도 인 경우    
            if (this.rszYYYYMM.substring(0,4)  === this.nowYYYYMM.substring(0,4)) {

                if (this.rszYYYYMM.substring(4,6) ===  this.nowYYYYMM.substring(4,6)) {
                    this.prv_ena_yn = 'n'  //날짜 prev 진행여부 n(nexxt)
                } else {
                    this.prv_ena_yn = 'y'  //날짜 prev 진행여부 y(prev)
                }   
            } 

            this.getSearchList()  //조회
        },

        //**************
        // [조회]
        //***************/
        getSearchList(){
            this.certAgrYn = true

            console.log(">>> [SZFC2101]getSearchList <<<< ")  

            console.log("[getSearchList]나의농장여부=>>"+this.isInqDsc)
            console.log("[getSearchList]조회년|조회월=>>"+this.currentYear, this.currentMonth)
            console.log("[getSearchList]경제통합상품대분류코드|경제통합상품중분류코드|경제통합상품소분류코드=>>"+this.varNaWrsLclc, this.varNaWrsMclc, this.varNaWrsSclc)

            const config = {
                url:'/sz/fc/01r01',
                //url : "/co/at/01r01",
                data : {
                    mydtCusno : this.getUserInfo('mydtCusno'),        //마이데이터고객번호 = (변수)마이데이터고객번호
                    inqYm     : this.currentYear+this.currentMonth,   //조회년월(년월)   = (변수)년+(변수)월
                    inqDsc    : !this.isInqDsc?'1':'2',               //조회구분코드(마이농장;1,세부작목;2) <<= 조회구분여부 true일 경우 세부작목
                    naWrsLclc : !this.isInqDsc?'':this.varNaWrsLclc,  //마이농장일 경우 = '', 세부작목 = (변수)경제통합상품대분류코드
                    naWrsMclc : !this.isInqDsc?'':this.varNaWrsMclc,  //마이농장일 경우 = '', 세부작목 = (변수)경제통합상품중분류코드
                    naWrsSclc : !this.isInqDsc?'':this.varNaWrsSclc,  //마이농장일 경우 = '', 세부작목 = (변수)경제통합상품소분류코드
                }
            }
            apiService.call(config).then(response => {

                this.dtbyInqList   = response.dtbyInqList || []   //일자별조회목록
                console.log("getSearchList/(resp)dtbyInqList=>> ", JSON.stringify(response.dtbyInqList))
                console.log("getSearchList/(변수)this.dtbyInqList=>> ", this.dtbyInqList)
                console.log("getSearchList/(변수)this.dtbyInqList.length=>> ", this.dtbyInqList.length)
                
                this.varMydtCusno  = response.mydtCusno       //(변수)마이데이터고객 = response.마이데이터고객
                this.varInqYm      = response.inqYm           //(변수)조회년월       = response.조회년월
                this.varNaWrsCn    = response.naWrsCn || 0    //(변수)경제통합상품수 = response.경제통합상품수

                console.log("getSearchList/(변수)마이데이터고객=>> ", this.varMydtCusno)
                console.log("getSearchList/(변수)조회년월=>> ", this.varInqYm)
                console.log("getSearchList/(변수)경제통합상품수=>> ", this.varNaWrsCn)

                console.log("getSearchList/(resp)경제통합상품대분류코드=>> ", response.naWrsLclc)
                console.log("getSearchList/(resp)경제통합상품중분류코드=>> ", response.naWrsMclc)
                console.log("getSearchList/(resp)경제통합상품소분류코드=>> ", response.naWrsSclc)
                console.log("getSearchList/(resp)경제통합상품소분류명=>> ", response.naWrsSclcfnm)

                this.varRevSam     = response.revSam || 0     //(변수)수입금액합계   = response.수입금액합계
                this.varXpsSam     = response.xpsSam || 0     //(변수)지출금액합계   = response.지출금액합계
                this.varCrdSam     = response.crdSam || 0     //(변수)외상금액합계   = response.외상금액합계

                console.log("getSearchList/(변수)수입금액합계=>> ", this.varRevSam)
                console.log("getSearchList/(변수)지출금액합계=>> ", this.varXpsSam)
                console.log("getSearchList/(변수)외상금액합계=>> ", this.varCrdSam)

                this.varDdtbyInqCn = response.dtbyInqCn || 0  //(변수)일자별조회건수 = response.일자별조회건수
                console.log("getSearchList/(변수)일자별조회건수=>> ", this.varDdtbyInqCn)

                //*달력 컴퍼넌트에 조회된 값을 보여주고자 할 경우
                this.fn_RstInfo()  

                //*sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                this.$nextTick(() => {
                     this.callJQueryFncExcute()
                })
            })
        },

        /*
        * [나의농장] 슬라이드팝업 호출 
        */
        fn_slidmyFarmPopOpen() {

            console.log(">>> [SZFC2101]fn_slidmyFarmPopOpen <<<< ")  

            const config = {
				params : {
					mydtCusno : this.getUserInfo('mydtCusno') ,  //this.getUserInfo('mydtCusno') , //마이데이터고객번호
				},
                renderer: {
                    component: SZFC2103,
                }
			}
            modalService.openSlidePagePopup(config).then(response => {

                this.varNaWrsLclc   = response.naWrsLclc    //(변수)상품분류코드(대분류) = 상품분류코드(대분류)
                this.varNaWrsMclc   = response.naWrsMclc    //(변수)상품분류코드(중분류) = 상품분류코드(중분류)
                this.varNaWrsSclc   = response.naWrsSclc    //(변수)상품분류코드(소분류) = 상품분류코드(소분류)
                this.varNaWrsSclfnm = response.naWrsSclfnm  //(변수) 상품분류명= 상품분류명
				console.log("[SZFC2101]fn_slidmyFarmPopOpen/상품분류코드(대/중/소)=>>"+this.varNaWrsLclc+this.varNaWrsMclc+this.varNaWrsSclc)  

                this.varNaWrs = this.varNaWrsLclc+this.varNaWrsMclc+this.varNaWrsSclc
				console.log("[SZFC2101]fn_slidmyFarmPopOpen/(변수)상품분류코드(합)=>>"+this.varNaWrs)  

                if (this.varNaWrs === "000000000") {    //나의농장일 경우
                   this.isInqDsc = false
                } else {   //세부항목일 경우
                   this.isInqDsc = true
                }
				console.log("[SZFC2101]fn_slidmyFarmPopOpen/(변수)나의농장여부=>>"+this.isInqDsc)  

                this.myFarmTxt = this.varNaWrsSclfnm   //(변수)상품분류명 = (response)상품분류명
				console.log("[SZFC2101]fn_slidmyFarmPopOpen/(변수)상품분류명=>>"+this.varNaWrsSclfnm)  
				console.log("[SZFC2101]fn_slidmyFarmPopOpen/(변수)나의농장=>>"+this.myFarmTxt)  

                this.getSearchList()  //조회
            })
		},

        /*
        * [상세조회] 팝업호출  <!--상세조회(금액구분코드,업무구분코드명,상세조회키,거래일련번호,삭제여부)-->
        */
		fn_openMyFarmDetailPop(flag1, flag2, flag3, flag4, flag5, flag6) {  
            let component;

			console.log('>>> [SZFC2101]fn_openMyFarmDetailPop(Start) <<<');	

            console.log('[SZFC2101]fn_openMyFarmDetailPop/자산관리고객번호 =>>'+this.getUserInfo('asetAmnCusno'));	
			console.log('[SZFC2101]fn_openMyFarmDetailPop/1.금액구분코드=>> '+flag1);	
			console.log('[SZFC2101]fn_openMyFarmDetailPop/2.업무구분코드명=>> '+flag2);	
			console.log('[SZFC2101]fn_openMyFarmDetailPop/3.상세조회키=>> '+flag1);	
			console.log('[SZFC2101]fn_openMyFarmDetailPop/4.거래일련번호=>> '+flag4);	
			console.log('[SZFC2101]fn_openMyFarmDetailPop/5.삭제여부=>> '+flag5);	
			console.log('[SZFC2101]fn_openMyFarmDetailPop/6.매출상세수=>> '+flag6);	

            if (flag1 === "1" || flag1 === "3" ) {  //수입(1) 또는 3(수입제외 금액)인 경우
                component = SZFC2106;   
			} else if (flag1 === "2" || flag1 === "4") { //지출(2) 또는 4(지출제외 금액) 인 경우
                component = SZFC2107;   
			} 

			const config = {
				component : component,
				params : {
                    mydtCusno : this.getUserInfo('mydtCusno'),	//자산관리고객번호
                    bsnDscnm  : flag2, //업무구분코드명
                    dtlInqKey : flag3, //상세조회키
                    trSqno    : flag4, //거래일련번호
                    trDsc     : "U",   //거래구분코드(2021.09.01 추가)   
                    delPsbYn  : flag5, //삭제여부(2021.09.01 추가)   
                    slDtlCn   : flag6, //매출상세수(2021.09.01 추가)   
				}
			}	    

            modalService.openPopup(config).then(response => {
                 if (response === 'complete') {
                        this.getSearchList() 
                 }
            })        

			console.log('>>> [SZFC2101]fn_openMyFarmDetailPop(End) <<<');	
        },
        
        //배준성부장 추가요청 부분(08.13(금))
        callComponentEvent(dates){

            dates =  ("0" + dates).slice(-2)  //현재일 00

            this.currentDay = dates  //2021.10.13(수) 추가

            this.$nextTick(()=>{

                const dLabel = this.$el.querySelectorAll('#l_'+dates)
                const parentdLabel = this.$el.querySelectorAll('#calendar_detail') //리스트 상단의 DETAIL TAG ID
                if (dLabel[0] !== undefined)
                {
                    $('#content').animate({scrollTop : parentdLabel[0].offsetTop + dLabel[0].offsetTop - 10})
                }
            })          
        },
        //배준성부장 추가요청 부분(08.13(금))

        //달력 컴퍼넌트에 조회된 값을 보여주고자 할 경우
        fn_RstInfo() {

            let tmpDaily = []

            for (let i=0; i< this.dtbyInqList.length; i++){
                var inputObj = {}
                inputObj.revAm = 0
                inputObj.xpsAm = 0

                inputObj.rzsDt = this.rszYYYYMM+""+this.dtbyInqList[i].trday   //거래일

                let trans = this.dtbyInqList[i].transList
                for(let j=0; j< trans.length; j++){

                    inputObj.amDsc =  trans[j].amDsc

                    if (inputObj.amDsc === "1") {         //금액구분코드가 1(수입)인 경우
                        inputObj.revAm += trans[j].tram;  //거래금액 합쳐 놓기
                    } else if (inputObj.amDsc === "2") {  //금액구분코드가 2(지출)인 경우
                        inputObj.xpsAm += (-1)*trans[j].tram;  //거래금액
                    }
                }

                tmpDaily.push(inputObj)    //(임시)대괄호변수 = (임시)중괄호변수
            }

            this.rzsBas = tmpDaily   //rzsBas대괄호 = (임시)대괄호변수

         }, 

         //금액구분코드의 값에 따라 Color변경
         fn_spanColor(dsc) {
             if (dsc === "1" || dsc === "3") {        //1(수입)
                return 'com_point_blue'
             } else if (dsc === "2" || dsc === "4") {  //2(지출)
                return 'com_point_red'
             } else {   
                return 'txt_chagam'
             }      
         },

         fn_spanColor2(dsc) {
             if (dsc === "1") {        //1(수입)
                return 'com_point_blue'
             } else if (dsc === "2") {  //2(지출)
                return 'com_point_red'
             } else {    //3(수입제외 금액),4(지출제외 금액)
                return 'txt_chagam'
             }      
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

        fn_closeFloatDiv2() {

            if(this.isShowFloatDiv2) {
                this.isShowFloatDiv2 = false
            } else {
                this.isShowFloatDiv2 = true
            }

        },

        /*
        * S :: add. 21.07.21 수입/지출추가 Dimmed 클릭 처리
        */
        fn_closeFloatDiv() {
            this.fn_showFloatDiv()
        },

        fn_dayCompare(dsc1, dsc2, dsc3) {
            let fnsDt = ""
            let rtun= ""

            fnsDt = dsc1+dsc2

            if (fnsDt === dsc3 ) {
                rtun = '9'
            } else {
                rtun = '0'
            }

            return rtun
         },

         //day하단 dot(...)표시 처리    
         fn_dayLine(number) {
          
            if (number === 1) { 
              //return 'day no_line'
              return 'day'
            } else {  
              return 'day'
            }  
         },

        //[약관동의 안내문] Slide 선택시
        fn_openSlidePop() {

            console.log("[SZFC2101]fn_openSlidePop(Start) ")

            const config = {
				params : {
					mydtCusno : this.getUserInfo('mydtCusno') ,  //this.getUserInfo('mydtCusno') , //마이데이터고객번호
				},
                renderer: {
                    component: SZFC2113,
                }
			}
            modalService.openSlidePagePopup(config).then(response => {

                console.log("[SZFC2101]fn_openSlidePop/response=>> "+response)

                if(response === 'noSeemyFarmClaSign')
                {
                    console.log("[SZFC2101]fn_openSlidePop/ 여기1(noSeemyFarm)~ ")
                    commonService.setStorage('noSeemyFarmClaSign' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'Sign' , 'Y')
                    
                    //*
                    this.getSearchList()
                }
            })

            //this.getSearchList()

            console.log("[SZFC2101]fn_openSlidePop(End) ")
        },
                 
    },

    components : {
        Page,
        FootersV2,
        // SzCategoryV2,
        AnCategoryV2,
        AnSubCategoryV2,
        CmmCalendar  //영농캘린더 달력사항 추가(2021.06.24)  
    }
}
</script>