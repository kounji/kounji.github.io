<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > NH지역정보 > 영농일지 > 메인
* @ 페이지설명 : 영농일지 메인
* @ 파일명     : src/views/page/AN/SZ/ANSZ4002/ANSZ4002.vue
* @ 작성자     : 
* @ 작성일     : 2022-09-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-07-01                                    최초 작성
* 2021-07-12                                    수정 작업     
* 2021-07-21                                    수정 작업(인터페이스 변경)
* 2021-08-02                                    수정 작업
* 2021-09-01                                    수정 작업
* 2021-09-06                                    수정 작업
* 2022-09-23                                    파일명 변경(기존 SZFR0001 => ANSZ2002)
* 2025-03-04            CS540683                불필요주석 삭제 상호금융 NH콕마이데이터 4.0 추진 개발 ANSZ2002 → ANSZ4002 
*************************************************************************/
-->

<template>
    <page class="content-view hasLNB">
        <!--
        <an-category type="SZFC"></an-category> 
        -->
        <an-sub-categoryV4 type="FR"></an-sub-categoryV4>
                <!--
                <div id="content" class="renewal">
                -->
                <div id="content" class="com_sub_type02 com_bg_type00 com_no_bottom">
                    <div class="com_inner">
                        <!-- 년도 -->
                        <div class="calendar_wrap myfarm_calendar_wrap custom_calendar_wrap">
                            <section class="cal_day_box">
                                <div class="select_dual_wrap hasNav">
                                    <div class="select_dual">
                                        <div class="area">
                                            <div class="select_date">
                                                <button class="cal_btn cal_prev" aria-label="한달 전 이동" v-on:click.prevent="fn_bfraftClamp('p')"></button>
                                                <a title="년월선택" class="year_month" href="javascript:console.log('월');" @click.prevent="selectMonth()"><span class="num">{{currentYear}}</span>년 <span class="num">{{currentMonth}}</span>월 </a>
                                                <template v-if="prv_ena_yn === 'n' "> 
                                                    <button class="cal_btn cal_next disabled" disabled="disabled" title="선택불가" aria-label="한달 후 이동"></button>         
                                                </template> 
                                                <template v-else> 
                                                    <button class="cal_btn cal_next" title="한달 후 이동" aria-label="한달 후 이동" v-on:click.prevent="fn_bfraftClamp('n')"></button> 
                                                </template> 
                                            </div>
                                        </div>
                                        <div class="area">
                                            <button class="select_date select_date_type02">
                                                <em>{{myFarmTxt}}</em> <span class="caret"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <!--// 년도 -->
                    </div>

                    <!--달력(Start) << //영농캘린더 달력사항 추가(2021.06.24) -->
                    <cmmCalendarV2 :pBizType="'FR'" :pRzsBas='rzsBas' :pYYYYMM='rszYYYYMM' @selectWeekDateEvent="callComponentEvent" />
                    <!--달력(End)  -->

                    <div id="calendar_detail" class="com_inner">
                        <!-- 탭 -->
                        <div class="calendar_wrap myfarm_calendar_wrap custom_calendar_wrap">
                            <section class="cal_day_box">
                                <div class="custom_box custom_box1">
                                    <!-- 탭 제목 -->
                                    <div class="com_tabmenu_type03 custom_tab">
                                        <ul role="tablist">
                                            <li role="presentation" aria-controls="tab_01" :class="culplAreaUntC==='ALL' ? 'on' : ''"><a href="javascript:void(0);" @click.prevent="fn_chngSelItem('A')"><span>전체</span></a></li>
                                            <li role="presentation" aria-controls="tab_02" :class="culplAreaUntC==='SIMPLE' ? 'on' : ''"><a href="javascript:void(0);" @click.prevent="fn_chngSelItem('S')"><span>(간편)일지</span></a></li>
                                            <li role="presentation" aria-controls="tab_03" :class="culplAreaUntC==='actoLatcChartList' || culplAreaUntC==='hotList' ? 'on' : ''"><a href="javascript:void(0);" @click.prevent="fn_chngSelItem('H')"><span>경락가격</span></a></li>
                                        </ul>
                                    </div>
                                    <!--// 탭 제목 -->

                                    <!-- 탭 내용-->
                                    <div id="tab_01" role="tabpanel" class="cmm-tab-panel on">




                                    <template v-if="repVarDdtbyInqCn > 0 && culplAreaUntC !='actoLatcChartList' && culplAreaUntC !='hotList'"> 
                                        <!--일자별 조회건수 > 0인 경우-->
                                        <!-- <template v-if="repVarDdtbyInqCn > 0">  -->
                                        <!--일자별 조회건수 > 0인 경우-->
                                        <div class="calendar_wrap myfarm_calendar_wrap custom_calendar_wrap">
                                            <!-- section -->
                                            <section class="cal_day_box">
                                                <!-- calendar_detail -->
                                                <div class="calendar_detail">
                                                    <!-- calendar_notice_box -->
                                                    <div class="calendar_notice_box">
                                                        <div class="inner_wrap">
                                                            <div class="com_list_type01">
                                                                <div class="calendar_list_view diary_list_view">
                                                                    <!-- 메세지 S -->
                                                                    <div>
                                                                        <strong class="msg">메세지</strong>
                                                                        <div class="view_list_area">
                                                                            
                                                                        </div>
                                                                    </div>





                                            <template v-for="(dtbyInq, index) in dtbyInqList">
                                                <div :id="'l_'+dtbyInq.trday" :ref="'l_'+dtbyInq.trday" :key="index"> <!--div(Start)-->  

                                                    <!-- 변경(2021.09.09(수)/2021.09.17(금) -->
                                                    <strong :class="fn_dayCompare(rszYYYYMM, dtbyInq.trday, nowDt) === '9'?'day today': fn_dayLine(repVarDdtbyInqCn) ">{{dtbyInq.trday}}  
                                                    <!-- <strong :class="fn_dayCompare(rszYYYYMM, dtbyInq.trday, nowDt) === '9'?'day today': 'day' ">{{dtbyInq.trday}}   -->
                                                        <span class="week">{{IMG_RBRIT}}{{dtbyInq.downm}}{{IMG_LBRIT}}</span>  
                                                        <span v-show="fn_dayCompare(rszYYYYMM, dtbyInq.trday, nowDt) === '9'" :style="fn_dayCompare(rszYYYYMM, dtbyInq.trday, nowDt)==='9'?'display:block':'display:block' ">today</span>  
                                                        <!-- <span v-show="fn_dayCompare(rszYYYYMM, dtbyInq.trday, nowDt) === '9'" :style="fn_dayCompare(rszYYYYMM, dtbyInq.trday, nowDt)==='9'?'display:block':'display:none' ">today</span>   -->
                                                    </strong> 
                                                    <!-- 변경(2021.09.09(수)/2021.09.17(금) -->

                                                    <div class="view_list_area">
                                                        <!--거래목록(transList) 리스트(Start)--->          
                                                        <template v-if="dtbyInq.transCn > 0 ">  <!--거래수 > 0인 경우~~/2021.09.01 추가-->
                                                            <template v-for="(trans, idx2) in dtbyInq.transList" >           
                                                                <div class="view_list" data-ui-toggle="box" :key="'dl_'+index+'trans'+idx2">  

                                                                    <dl>
                                                                        <dt>
                                                                            <!--영농일지 일련번호 = 0일 경우, '경제관련 데이타 등록'가능-->
                                                                            <template v-if="trans.sqno === 0 "> 

                                                                                <!--(1.경제통합상품대분류코드/2.경제통합상품중분류코드/3.경제통합상품소분류코드/4.분류명/5.재배지지역코드/6.재배지지역명/7.마이농가경제통합인터페이스구분코드/8.경제통합데이터구분코드/9.사무소코드/10.경제통합전표번호/11.영농일지작업일자/12.영농일지일련번호/13.거래일자)-->
                                                                                <a v-on:click.prevent="fn_openEconormyPop(varNaWrsLclc, varNaWrsMclc, varNaWrsSclc, varNaWrsSclfnm, varCulplRgnC, varCulplRgnNm,trans.myfhsNaIntfDsc, trans.naDataDsc,  trans.brc, trans.naSlpno, trans.wkDt, trans.sqno, trans.trDt)"> 

                                                                                    <!--영농일지일련번호 > 0이 아닌 경우에는 경제통합데이터구분과 상관없이, '연필'이미지 보여주기(등록) -->
                                                                                    <em>
                                                                                        <!--타이틀에 값이 존재할 경우에만...-->
                                                                                        <template v-if="trans.title !== null ">    
                                                                                            <em>{{trans.title}}</em>  
                                                                                        </template> 

                                                                                        <!--간편일지여부가 전체('')일 경우에만-->    
                                                                                        <template v-if="trans.easyDiaryYn === '' ">  
                                                                                            <span title="등록" class="icon_reg">등록</span> 
                                                                                        </template> 
                                                                                    </em>

                                                                                    <!--간편일지여부가 전체('')일 경우에만-->
                                                                                    <template v-if="trans.easyDiaryYn === '' ">  
                                                                                        <span class="sub_tit" v-if="trans.subtitle !== null  ">
                                                                                            <em>{{trans.subtitle}}</em>  
                                                                                        </span>
                                                                                    </template> 
                                                                                </a>

                                                                            </template> 
                                                                            <template v-else> 

                                                                                <!-- <em>{{trans.title}}</em> -->
                                                                                <!--타이틀에 값이 존재할 경우에만...-->
                                                                                <template v-if="trans.title !== null ">    
                                                                                    <em>{{trans.title}}</em>  
                                                                                </template> 

                                                                                <!--간편일지여부가 전체('')일 경우에만-->
                                                                                <template v-if="trans.easyDiaryYn === '' ">  
                                                                                    <span class="sub_tit" v-if="trans.subtitle !== null ">
                                                                                        <em>{{trans.subtitle}}</em>  
                                                                                    </span>
                                                                                </template> 
                                                                            </template> 

                                                                            <!--거래상세수 > 0이 아닌 경우 상세보기 -->
                                                                            <a title="상세보기" href="javascript:void(0);" v-if="trans.slDtlCn > 0 " aria-expanded="false" class="detail_view">
                                                                                <span>상세보기</span>
                                                                            </a>
                                                                        </dt> 

                                                                        <!--'영농일지 일련번호 > 0일 경우, '상세보기'가능--> 
                                                                        <dd> <!--(1.경제통합상품대분류코드/2.경제통합상품중분류코드/3.경제통합상품소분류코드/4.분류명/5.재배지지역코드/6.재배지지역명/7.마이농가경제통합인터페이스구분코드/8.경제통합데이터구분코드/9.사무소코드/10.경제통합전표번호/11.영농일지작업일자/12.영농일지일련번호/13.거래일자)-->
                                                                            <a v-if="trans.sqno > 0 " v-on:click.prevent="fn_openFarmDailyPop(varNaWrsLclc, varNaWrsMclc, varNaWrsSclc, varNaWrsSclfnm, varCulplRgnC, varCulplRgnNm,trans.myfhsNaIntfDsc, trans.naDataDsc,  trans.brc, trans.naSlpno, trans.wkDt, trans.sqno, trans.trDt)">
                                                                            더보기                                                                                                                                                           
                                                                            </a>
                                                                        </dd>
                                                                    </dl>

                                                                    <!--간편일지여부가 1(간편일지)인 경우/2021.09.01 추가-->
                                                                    <template v-if="trans.easyDiaryYn === '1' "> 
                                                                        <div class="farmbox_type01">
                                                                            <!-- <div>
                                                                                <em>날씨</em>
                                                                                <span>&nbsp;&nbsp;{{(trans.weathStsNm !== null )?trans.weathStsNm:''}}</span>
                                                                            </div> -->
                                                                            <div class="ellipsis">
                                                                                <!--경제통합데이터구분코드가 'B02(경제통합 구매매출) or B03(경제통합 로컬푸드) or B04(경제통합 판매출하) or D03(경제통합농사직업) 인 경우 => 지사무소명을, 아닐 경우에는 작엄명을 -->	
                                                                                <em>{{(trans.naDataDsc !== 'DIRECT' )?'지사무소명 ':'작업명 '}}</em> 
                                                                                <span>
                                                                                    &nbsp;&nbsp;&nbsp;{{trans.subtitle}}
                                                                                </span>
                                                                            </div>
                                                                            <div>
                                                                                <em>자가인력</em>     
                                                                                <span>
                                                                                    &nbsp;&nbsp;남&nbsp;&nbsp;{{(trans.maleOwhsHmrsCn > 0)?trans.maleOwhsHmrsCn:'0'}}<span class="bar">명</span>
                                                                                    ,&nbsp;&nbsp;여&nbsp;&nbsp;{{(trans.wmnOwhsHmrsCn > 0)?trans.wmnOwhsHmrsCn:'0'}}<span class="bar">명</span>
                                                                                </span>
                                                                            </div>
                                                                            <div>
                                                                                <em>작업시간</em>
                                                                                <span>
                                                                                    <template v-if="trans.maleOwhsHmrsWkHr !== null  ">    
                                                                                        &nbsp;&nbsp;남&nbsp;&nbsp;{{trans.maleOwhsHmrsWkHr.split(":").join("").substr(0,2)}}<span class="bar">시간</span>
                                                                                        &nbsp;{{trans.maleOwhsHmrsWkHr.split(":").join("").substr(2,2)}}<span class="bar">분</span>
                                                                                    </template> 
                                                                                    <template v-if="trans.wmnOwhsHmrsWkHr !== null  ">    
                                                                                        ,&nbsp;&nbsp;여&nbsp;&nbsp;{{trans.wmnOwhsHmrsWkHr.split(":").join("").substr(0,2)}}<span class="bar">시간</span>
                                                                                        &nbsp;{{trans.wmnOwhsHmrsWkHr.split(":").join("").substr(2,2)}}<span class="bar">분</span>
                                                                                    </template> 
                                                                                </span>
                                                                            </div>
                                                                            <div>
                                                                                <em>외부인력</em> 
                                                                                <span>
                                                                                    &nbsp;&nbsp;남&nbsp;&nbsp;{{(trans.maleEmplHmrsCn > 0 )?trans.maleEmplHmrsCn:'0'}}<span class="bar">명</span>
                                                                                    ,&nbsp;&nbsp;여&nbsp;&nbsp;{{ (trans.wmnEmplHmrsCn > 0 )?trans.wmnEmplHmrsCn:'0'}}<span class="bar">명</span>
                                                                                </span>
                                                                            </div>
                                                                            <div>
                                                                                <em>작업시간</em>
                                                                                <span>
                                                                                    <template v-if="trans.maleEmplHmrsWkHr !== null  ">    
                                                                                        &nbsp;&nbsp;남&nbsp;&nbsp;{{trans.maleEmplHmrsWkHr.split(":").join("").substr(0,2)}}<span class="bar">시간</span>
                                                                                        &nbsp;{{trans.maleEmplHmrsWkHr.split(":").join("").substr(2,2)}}<span class="bar">분</span>
                                                                                    </template> 
                                                                                    <template v-if="trans.wmnEmplHmrsWkHr !== null  ">    
                                                                                        ,&nbsp;&nbsp;여&nbsp;&nbsp;{{trans.wmnEmplHmrsWkHr.split(":").join("").substr(0,2)}}<span class="bar">시간</span>
                                                                                        &nbsp;{{trans.wmnEmplHmrsWkHr.split(":").join("").substr(2,2)}}<span class="bar">분</span>
                                                                                    </template> 
                                                                                </span>
                                                                            </div>
                                                                            <div>
                                                                                <em>작업면적</em>
                                                                                <span>&nbsp;&nbsp;{{(trans.areaCntn === null  )?'0':trans.areaCntn}}<span class="bar">평</span></span>
                                                                            </div>
                                                                            <div class="ellipsis">
                                                                                <em>상세내용 </em>
                                                                                <span v-if="trans.memoCntn  !== null  ">
                                                                                &nbsp;&nbsp;&nbsp;&nbsp;{{trans.memoCntn}}
                                                                                </span>
                                                                            </div>
                                                                        </div>

                                                                    </template> 

                                                                    <!--매출상세 목록(slDtlList) 리스트(Start)-->
                                                                    <template v-if="trans.slDtlCn > 0 "> 
                                                                        <!--매출상세 목록(slDtlList) 리스트(Start)-->
                                                                        <div class="detail_view_list" :key="'dtl_'+idx2">										
                                                                            <ul>
                                                                                <template v-for="(slDtl, idx3) in trans.slDtlList" >
                                                                                    <li :key="'sl'+idx3">

                                                                                        <em>{{slDtl.naWrsSclfnm}}</em>   <!--작목명(경제통합상품소분류명)/2021.09.02 추가-->
                                                                                        <!--경제통합데이터구분코드가 'B02(경제통합 구매매출) or B03(경제통합 로컬푸드) or B04(경제통합 판매출하) 인 경우 => 상품규격중량/경제통합상품포장코드명/금액  -->	
                                                                                        <template v-if="trans.naDataDsc ==='B02' || trans.naDataDsc ==='B03' || trans.naDataDsc ==='B04' "> 		
                                                                                            
                                                                                            <dl>
                                                                                                <dt>(품명)</dt>
                                                                                                <dd> 
                                                                                                    <span>{{slDtl.naWrsAbrNm}}</span> <!--경제통합상품약어명(2021.11.7(수) 변경-->
                                                                                                </dd>
                                                                                            </dl>

                                                                                            <!--상품규격중량-->
                                                                                            <!-- <dl>
                                                                                                <dt>(중량)</dt>
                                                                                                <dd> 
                                                                                                    <span>{{slDtl.wrsStdWt | numberFilter('0,0.00', {precision: 2})}}<span class="bar">Kg</span></span>    
                                                                                                </dd>
                                                                                            </dl>
                                                                                            <dl>
                                                                                                <dt>(포장)</dt>
                                                                                                <dd> 
                                                                                                    <span>{{slDtl.naWrsPakCnm}}</span>   
                                                                                                </dd>
                                                                                            </dl>   -->
                                                                                            <!--경제통합상품포장코드명-->

                                                                                            <dl>
                                                                                                <dt>(수량)</dt>
                                                                                                <dd>
                                                                                                    <!-- <span>{{slDtl.qt | numberFilter('0,00')}}<span class="bar">개</span></span> -->
                                                                                                    <span>{{slDtl.qt | numberFilter('0,00')}}</span>
                                                                                                </dd>
                                                                                            </dl>

                                                                                            <!--(마이농가경제통합인터페이스구분코드가 BM001 or XO001) 인 경우 => 수량/경제통합상품규격단위코드명/경제통합상품단위코드명  -->	
                                                                                            <template v-if="(trans.myfhsNaIntfDsc ==='BM001' || trans.myfhsNaIntfDsc ==='XO001') ">                                                                         
                                                                                                <dl>
                                                                                                    <dt>(규격)</dt>
                                                                                                    <dd> 
                                                                                                        <span>{{slDtl.wrsStdWt | numberFilter('0,0')}}&nbsp;&nbsp;{{slDtl.naWrsUntCnm}}</span> <!--상품규격중량/경제통합상품단위코드명-->
                                                                                                    </dd>
                                                                                                </dl>
                                                                                            </template>

                                                                                            <dl>
                                                                                                <dt>(금액)</dt> 
                                                                                                <dd>
                                                                                                    <span>{{slDtl.am | numberFilter('0,00')}}<span class="bar">원</span></span>
                                                                                                </dd>
                                                                                            </dl>

                                                                                        </template>

                                                                                        <!--경제통합데이터구분코드가 'D03(경제통합 농사작업) 인 경우 => 농기계작업명/방제작업구분명/밪에작업상세구분명 -->	
                                                                                        <template v-if="trans.naDataDsc ==='D03' "> 	
                                                                                            <dl>
                                                                                                <dt>(농작업명)</dt>
                                                                                                <dd> 
                                                                                                    <span>{{slDtl.fmachWkDsnm}}</span>     <!--농기계작업구분명-->
                                                                                                </dd>
                                                                                            </dl>
                                                                                            <dl>
                                                                                                <dt>(방제작업)</dt>
                                                                                                <dd> 
                                                                                                    <span>{{slDtl.pvdsWkMethDsnm}}</span>  <!--방제작업방법구분명-->
                                                                                                </dd>
                                                                                            </dl>
                                                                                            <dl>
                                                                                                <dt>(방제내용)</dt>
                                                                                                <dd> 
                                                                                                    <span>{{slDtl.pvdsWkDtlDsnm}}</span>   <!--방제작업상세구분명-->
                                                                                                </dd>
                                                                                            </dl>
                                                                                        </template>
                                                                                    </li>
                                                                                </template> 
                                                                            </ul> <!--ul(End)-->
                                                                        </div> <!--div(End)-->
                                                                    </template> 
                                                                    <!--거래상세수 > 0 이상인 경우-->    
                                                                    <!--매출상세 목록(slDtlList) 리스트(End)-->
                                                                </div>  <!--view_list(End)-->

                                                            </template> 
                                                        </template> 
                                                        <!--거래목록(transList) 리스트(End)--->          

                                                        <!--배너목록(bnnList) 리스트(Start)-->
                                                        <template v-if="dtbyInq.bnnCn > 0 ">  <!--배너수 > 0 이상인 경우-->
                                                            <template v-for="(bnn, idx4) in dtbyInq.bnnList">                
                                                                <div class="cal_pop_info_wrap" :key="'bnn_'+idx4">
                                                                    <div class="cal_pop_info">
                                                                        <div class="text">
                                                                            {{bnn.naWrsAbrNm}}  <!--경제통합상품약어명-->
                                                                        </div>
                                                                        <a href="javascript:void(0);" class="btn_close"><span class="blind">닫기</span></a>
                                                                    </div>
                                                                </div>
                                                            </template> 
                                                        </template> 
                                                        <!---배너목록(bnnList) 리스트(End)-->

                                                        <!--절기내용(Start) -->
                                                        <template v-if="dtbyInq.divYearCntn !== null ">  <!--절기내용이 존재할 경우~~-->
                                                            <div class="cal_pop_info_wrap" >
                                                                <div class="cal_pop_info">
                                                                    <div class="text">
                                                                        {{dtbyInq.divYearCntn}}  <!--절기내용-->
                                                                    </div>
                                                                    <a href="#" class="btn_close"><span class="blind">닫기</span></a>
                                                                </div>
                                                            </div>
                                                        </template> 
                                                        <!--절기내용(End) -->

                                                        <!-- kimhc_20220930 도매 경락가 리스트(Start) -->
                                                        <template v-if="dtbyInq.actoCnt !== null ">  <!--공시 된 도매 경락가 존재할 경우 ~~-->
                                                            <template v-for="(actoLatc, idxNew) in dtbyInq.actoLatcList">               
                                                                <!-- 등록한 작목의 당일 경락가 S -->
                                                                <div class="cal_pop_info_wrap custom_box_info_link" :key="'actoLatc_'+idxNew">
                                                                    <div class="cal_pop_info"  @click="fn_hotActoList()">
                                                                        <div class="text">
                                                                            <!-- 2022-10-07 : 문구 수정 및 띄어쓰기 / custom_box_btn_right_arrow 클래스 사용 -->
                                                                            오늘의 경락가격이 <span class="com_point_mint">{{actoLatc.actoClcnt}}</span>건 으로 공시 되었습니다.
                                                                        </div>
                                                                        <a href="#" class="btn_close"><span class="blind">바로가기</span></a>
                                                                        <!-- <a href="#"  role="button"><span class="blind">바로가기</span></a> -->
                                                                    </div>
                                                                </div>
                                                                <!-- 등록한 작목의 당일 경락가 S -->
                                                            </template>
                                                        </template>


                                                        <!-- kimhc_20220930 도매 경락가 리스트(End) -->
                                                    </div> <!--view_list_area(End)-->
                                                </div> <!--div(End)-->      

                                            </template> <!--calendar_list_view(End)-->




                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!--// calendar_notice_box -->
                                                </div>
                                                <!--// calendar_detail -->
                                            </section>
                                            <!--// section -->





                                        </div>
                                    </template>
                                    <!--자료가 존재할 경우--> 

                                    <!-- kimhc_20220920 경락가격 경우 -->
                                    <template v-else-if="culplAreaUntC==='actoLatcChartList' || culplAreaUntC==='hotList' ">

                                            <div class="calendar_wrap myfarm_calendar_wrap custom_calendar_wrap">
                                                <div class="custom_box" id="GYEONG">
                                                    <!-- 오늘의 농작물 가격은? -->
                                                    <div class="titbox_type01">
                                                        <strong class="com_box_tit01">오늘의 농작물 가격은?</strong>
                                                        <p class="txt-type-01">
                                                            최근 6개월 평균기준으로 품목별<br/>
                                                            전국 도매 경락가 추이를 볼 수 있어요!
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                    </template>

                                    <!-- ############################################################################################################################################################################################### -->
                                    <template v-if="culplAreaUntC==='hotList' || culplAreaUntC==='actoLatcChartList' ">
                                            <!-- ##### 도매 경락가격 ##### -->
                                            <!-- 도매 경락가격 탭 -->
                                            <!-- active 삽입시 버튼 활성화 -->
                                            <div class="choice_option custom_box_choice_option">
                                                <button type="button" title="선택안됨" class="" id="button_a1" @click="tab_buttonClick('tooltip01')"><em>ㄱ ~ ㅁ</em></button>
                                                <button type="button" title="선택안됨" class="" id="button_a2" @click="tab_buttonClick('tooltip02')"><em>ㅂ ~ ㅊ</em></button>
                                                <button type="button" title="선택됨" class="" id="button_a3" @click="tab_buttonClick('tooltip03')"><em>ㅋ ~ ㅎ</em></button>
                                            </div>
                                            <!-- 도매 경락가격 탭 -->
                                            <!-- 도매 경락가격 콘텐츠 -->
                                            <div class="tab_tooltip_wrap tab_tooltip_wrap02 custom_box_tab_tooltip_wrap01">
                                                <div id="tooltip01" class="tab_tooltip hide con01">
                                                    <div class="com_btn_area com_btn_round_flex">
                                                        <ul class="com_radio_type03">
                                                            <template v-for="(item1, index1) in buttonDivList">
                                                                <li v-if="item1.butnDiv==='A100'" :key=index1>
                                                                    <div class="btn_radio">
                                                                        <!-- <input type="radio" name="radio01" :id="'radio1_'+index1" aria-hidden="true">
                                                                        <label :for="'radio1_'+index1" aria-checked="" role="radio">
                                                                            <span class="tit">{{item1.aucLatcnm}}</span>
                                                                            <strong class="num">
                                                                                <em class="unit">{{item1.actoKnCnt}}건</em>
                                                                            </strong>
                                                                        </label> -->
                                                                        <button type="button" class="" name="groupBtn01" @click.prevent="getActoKnnmList(item1.aucLatcnm, $event, 'groupBtn01')">
                                                                            <input type="radio" name="radio01" :id="'radio1_'+index1" aria-hidden="true">
                                                                            <label :for="'radio1_'+index1" aria-checked="" role="radio">
                                                                                <span class="tit">{{item1.aucLatcnm}}</span>
                                                                                <strong class="num">
                                                                                    <em class="unit">{{item1.actoKnCnt}} 건</em>
                                                                                </strong>
                                                                            </label>
                                                                        </button>
                                                                    </div>
                                                                </li>
                                                            </template>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div id="tooltip02" class="tab_tooltip hide con02">
                                                    <div class="com_btn_area com_btn_round_flex">
                                                        <ul class="com_radio_type03">
                                                           <template v-for="(item2, index2) in buttonDivList">
                                                                <li v-if="item2.butnDiv==='B100'" :key=index2 >
                                                                    <div class="btn_radio">
                                                                        <!-- <input type="radio" name="radio02" :id="'radio2_'+index2" aria-hidden="true" >
                                                                        <label :for="'radio2_'+index2" aria-checked="true" role="radio" >
                                                                            <span class="tit">{{item2.aucLatcnm}}</span>
                                                                            <strong class="num">
                                                                                <em class="unit">{{item2.actoKnCnt}} 건</em>
                                                                            </strong>
                                                                        </label> -->
                                                                        <button type="button" class="" name="groupBtn02" @click.prevent="getActoKnnmList(item2.aucLatcnm, $event, 'groupBtn02')">
                                                                            <input type="radio" name="radio02" :id="'radio02_'+index2" aria-hidden="true">
                                                                            <label :for="'radio02_'+index2" aria-checked="" role="radio">
                                                                                <span class="tit">{{item2.aucLatcnm}}</span>
                                                                                <strong class="num">
                                                                                    <em class="unit">{{item2.actoKnCnt}} 건</em>
                                                                                </strong>
                                                                            </label>
                                                                        </button>
                                                                    </div>
                                                                </li>
                                                            </template>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div id="tooltip03" class="tab_tooltip hide con03">
                                                    <div class="com_btn_area com_btn_round_flex">
                                                        <ul class="com_radio_type03">
                                                            <template v-for="(item3, index3) in buttonDivList">
                                                                <li v-if="item3.butnDiv==='C100'" :key=index3>
                                                                    <div class="btn_radio">
                                                                        <!-- <input type="radio" name="radio03" :id="'radio3_'+index3" aria-hidden="true" >
                                                                        <label :for="'radio3_'+index3" aria-checked="true" role="radio">
                                                                            <span class="tit">{{item3.aucLatcnm}}</span>
                                                                            <strong class="num">
                                                                                <em class="unit">{{item3.actoKnCnt}} 건</em>
                                                                            </strong>
                                                                        </label> -->
                                                                        <button type="button" class="" name="groupBtn03" @click.prevent="getActoKnnmList(item3.aucLatcnm, $event, 'groupBtn03')">
                                                                            <input type="radio" name="radio03" :id="'radio03_'+index3" aria-hidden="true">
                                                                            <label :for="'radio03_'+index3" aria-checked="" role="radio">
                                                                                <span class="tit">{{item3.aucLatcnm}}</span>
                                                                                <strong class="num">
                                                                                    <em class="unit">{{item3.actoKnCnt}} 건</em>
                                                                                </strong>
                                                                            </label>
                                                                        </button>
                                                                    </div>
                                                                </li>
                                                            </template>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>	
                                            <!--// 도매 경락가격 콘텐츠 -->
                                            <!--// ##### 도매 경락가격 ##### -->

                                        <template v-if="culplAreaUntC==='hotList'">
                                            <!-- hot 차트 시작 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
                                            <!-- 이번달 인기 많은 농작물 -->
                                            <span id="hot_span" class="com_pop_tit01 custom_box_tit02">이번달 <strong>인기 많은 농작물</strong></span>
                                            <template v-for="(item, index) in hotActoLatcList">

                                                <!-- 이번달 인기 많은 농작물 slider_01 -->
                                                <!-- 위의 차트 ####### 강낭콩(울타리콩) slider_01 -->
                                                <div class="grap_toggle_wrap grap_toggle_wrap01 version2" :key=index id="hotChartDiv">
                                                    <!-- grap_toggle_box -->
                                                    <div class="grap_toggle_box on">
                                                        <!-- 박스 01 -->
                                                        <div class="custom_list com_box_type01 com_box_type09">
                                                            <!-- 강낭콩(울타리콩) -->
                                                            <div class="header flex_tit01">
                                                                <strong class="com_box_tit01">{{item.actoKnnm}}</strong>
                                                                <div class="align_rignt">
                                                                    <span class="num">{{item.aucCnt}}{{item.stdOnm}}</span>
                                                                    <span class="unit">기준</span>
                                                                </div>
                                                            </div>
                                                            <!--// 강낭콩(울타리콩) -->

                                                            <!-- swiper Start -->
                                                            <div class="custom_box custom_box4" :key="refKey">
                                                                <div class="travel_wrap2">
                                                                    <div class="slider_wrap">
                                                                        <div class="tab_cont2" id="tab_cont2_id">
                                                                            <div class="cmm-tab-panel">
                                                                                <a href="javascript:void(0)" role="button" class="slide">
                   
                                                                                    <!-- 당일가격 -->
                                                                                    <div class="custom_round_box silver">
                                                                                        <p class="sub_tit">당일가격</p>
                                                                                        <p class="sub_con">
                                                                                            <strong>{{numberFormat(item.tdAucAvgam)}}</strong><span class="unit">원</span>

                                                                                            <template v-if="item.trWhtCntn > 0">
                                                                                                <span class="raise" role="text">
                                                                                                    <span class="blind">상승</span><!-- 22-10-20 접근성 추가-->
                                                                                                    <em>{{item.trWhtCntn}}</em>%
                                                                                                </span>
                                                                                            </template>
                                                                                            <template v-else-if="item.trWhtCntn < 0">
                                                                                                <span class="decrease" role="text">
                                                                                                    <span class="blind">하락</span><!-- 22-10-20 접근성 추가-->
                                                                                                    <em>{{Math.abs(item.trWhtCntn)}}</em>%
                                                                                                </span>
                                                                                            </template>
                                                                                            <template v-else-if="(item.tdAucAvgam == undefined || item.tdAucAvgam == '') && item.rcnDd7AucMveAvgam != '0'">
                                                                                                <span class="decrease" role="text">
                                                                                                    <span class="blind">하락</span><!-- 22-10-20 접근성 추가-->
                                                                                                    <em>100</em>%
                                                                                                </span>
                                                                                            </template>
                                                                                        </p>
                                                                                    </div>
                                                                                    <!--// 당일가격 -->
                                                                                    <!-- 1주일전, 1개월전-->
                                                                                    <div class="line_grap">
                                                                                        <ul class="bl_dot_list">
                                                                                            <li>
                                                                                                <span>1주일전</span>
                                                                                                <span class="num">{{numberFormat(item.rcnDd7AucMveAvgam)}}</span>
                                                                                                <span class="unit">원</span>
                                                                                            </li>
                                                                                            <li>
                                                                                                <span>1개월전</span>
                                                                                                <span class="num">{{numberFormat(item.rcnMt1AucMveAvgam)}}</span>
                                                                                                <span class="unit">원</span>
                                                                                            </li>
                                                                                        </ul>
                                                                                        <div class="grap_box">
                                                                                            <!-- 차트가 삽입될 DIV -->
                                                                                            <div id="hot_chartHolder01" class="chartHolder" role="img" :aria-label="item.trWhtCntn>0?'금년도가 전년도 보다'+ item.trWhtCntn+'% 높아요':'금년도가 전년도 보다'+ item.trWhtCntn+'% 낮아요'"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <!--// 1주일전, 1개월전-->
            
                                                                                </a>
                                                                            </div>
                                                                            <div class="cmm-tab-panel">
                                                                                <a href="javascript:void(0)" role="button" class="slide">
            
                                                                                    <div class="custom_round_box box_01 silver">
                                                                                        <p>
                                                                                            <strong>{{numberFormat(item.tdAucAvgam)}}</strong><span class="unit">원</span>
                                                                                            <template v-if="item.trWhtCntn > 0">
                                                                                                <span class="raise" role="text">
                                                                                                    <span class="blind">상승</span><!-- 22-10-20 접근성 추가-->
                                                                                                    <em>{{item.trWhtCntn}}</em>%
                                                                                                </span>
                                                                                            </template>
                                                                                            <template v-else-if="item.trWhtCntn < 0">
                                                                                                <span class="decrease" role="text">
                                                                                                    <span class="blind">하락</span><!-- 22-10-20 접근성 추가-->
                                                                                                    <em>{{Math.abs(item.trWhtCntn)}}</em>%
                                                                                                </span>
                                                                                            </template>
                                                                                            <template v-else-if="(item.tdAucAvgam == undefined || item.tdAucAvgam == '') && item.rcnDd7AucMveAvgam != '0'">
                                                                                                <span class="decrease" role="text">
                                                                                                    <span class="blind">하락</span><!-- 22-10-20 접근성 추가-->
                                                                                                    <em>100</em>%
                                                                                                </span>
                                                                                            </template>
                                                                                        </p>
                                                                                    </div>
                                                                                    <div class="line_grap line_grap01">
                                                                                        <!-- 2022-09-27 : 단위 제거  -->
                                                                                        <!-- <p class="txt_r">[단위 : 만원]</p> -->
                                                                                        <!-- 그래프 -->
                                                                                        <div id="hot_chartHolder02" class="chartHolder chartHolder01 rmateBorderLine"></div>
                                                                                        <!--// 그래프 -->
                                                                                        <div class="legend_Area">
                                                                                            <p class="year_name">
                                                                                                <span class="prevYear">전년도</span>
                                                                                                <span class="thisYear">금년도</span>
                                                                                            </p>
                                                                                            <p class="txt_r">
                                                                                                <span class="prev_average">전년도 평균</span>
                                                                                                <!-- 2022-09-27 : 만단위로 수정 -->
                                                                                                <strong class="num"><b>{{numberFormat(hotYerAvg)}}</b></strong>
                                                                                                <span class="unit">원</span>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
            
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--// swiper Start -->


                                                        </div>
                                                        <!--// 박스 01 -->
                                                    </div>
                                                </div>
                                                <!--// 위의 차트 ####### 강낭콩(울타리콩) slider_01 -->
                                                <!--// 이번달 인기 많은 농작물 slider_01 -->
                                            </template>
                                            <!--// hot 차트 종료 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
                                        </template>




                                        <template v-if="culplAreaUntC==='actoLatcChartList'">
                                            <template v-for="(item_Chart, index_Chart) in actoKnnmListArr">
                                                <!-- 그냥 차트 시작 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

                                                <!-- 위의 차트 ####### 강낭콩(울타리콩) slider_01 -->
                                                <div class="grap_toggle_wrap grap_toggle_wrap01" :key=index_Chart>
                                                    <!-- grap_toggle_box -->
                                                    <div class="grap_toggle_box on">
                                                        <!-- <button type="button" class="btn btn_toggle">
                                                            <span class="blind">그래프 확대</span>
                                                        </button> -->
                                                        <!-- 박스 01 -->
                                                        <div class="custom_list com_box_type01 com_box_type09">
                                                            
                                                            
                                                            <!-- 강낭콩(울타리콩) -->
                                                            <div class="header flex_tit01">
                                                                <strong class="com_box_tit01">{{item_Chart.actoKnnm}}</strong>
                                                                <div class="align_rignt">
                                                                    <span class="num">{{item_Chart.aucCnt}}{{item_Chart.stdOnm}}</span>
                                                                    <span class="unit">기준</span>
                                                                </div>
                                                            </div>
                                                            <!--// 강낭콩(울타리콩) -->

                                                            <!-- swiper Start -->
                                                            <div class="custom_box custom_box4" :key="refKey" :data-seq="refKey">
                                                                <div class="travel_wrap2">
                                                                    <div class="slider_wrap">
                                                                        <div class="tab_cont2">
                                                                            <div class="cmm-tab-panel">
                                                                                <a href="javascript:void(0)" role="button" class="slide">
            
            
            
                                                                                    <!-- 당일가격 -->
                                                                                    <div class="custom_round_box silver">
                                                                                        <p class="sub_tit">당일가격</p>
                                                                                        <p class="sub_con">
                                                                                            <strong>{{numberFormat(item_Chart.tdAucAvgam)}}</strong><span class="unit">원</span>
                                                                                            <template v-if="item_Chart.trWhtCntn > 0">
                                                                                                <span class="raise" role="text">
                                                                                                    <span class="blind">상승</span><!-- 22-10-20 접근성 추가-->
                                                                                                    <em>{{item_Chart.trWhtCntn}}</em>%
                                                                                                </span>
                                                                                            </template>
                                                                                            <template v-else-if="item_Chart.trWhtCntn < 0">
                                                                                                <span class="decrease" role="text">
                                                                                                    <span class="blind">하락</span><!-- 22-10-20 접근성 추가-->
                                                                                                    <em>{{Math.abs(item_Chart.trWhtCntn)}}</em>%
                                                                                                </span>
                                                                                            </template>
                                                                                            <template v-else-if="(item_Chart.tdAucAvgam == undefined || item_Chart.tdAucAvgam == '') && item_Chart.rcnDd7AucMveAvgam != '0'">
                                                                                                <span class="decrease" role="text">
                                                                                                    <span class="blind">하락</span><!-- 22-10-20 접근성 추가-->
                                                                                                    <em>100</em>%
                                                                                                </span>
                                                                                            </template>
                                                                                        </p>
                                                                                    </div>
                                                                                    <!--// 당일가격 -->
                                                                                    <!-- 1주일전, 1개월전-->
                                                                                    <div class="line_grap">
                                                                                        <ul class="bl_dot_list">
                                                                                            <li>
                                                                                                <span>1주일전</span>
                                                                                                <span class="num">{{numberFormat(item_Chart.rcnDd7AucMveAvgam)}}</span>
                                                                                                <span class="unit">원</span>
                                                                                            </li>
                                                                                            <li>
                                                                                                <span>1개월전</span>
                                                                                                <span class="num">{{numberFormat(item_Chart.rcnMt1AucMveAvgam)}}</span>
                                                                                                <span class="unit">원</span>
                                                                                            </li>
                                                                                        </ul>
                                                                                        <div class="grap_box">
                                                                                            <!-- 차트가 삽입될 DIV -->
                                                                                            <div :id="'chartHolder01_'+index_Chart" class="chartHolder"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <!--// 1주일전, 1개월전-->
            
            
            
            
                                                                                </a>
                                                                            </div>
                                                                            <div class="cmm-tab-panel">
                                                                                <a href="javascript:void(0)" role="button" class="slide">
            
                                                                                    <div class="custom_round_box box_01 silver">
                                                                                        <p>
                                                                                            <strong>{{numberFormat(item_Chart.tdAucAvgam)}}</strong><span class="unit">원</span>
                                                                                            <template v-if="item_Chart.trWhtCntn > 0">
                                                                                                <span class="raise" role="text">
                                                                                                    <span class="blind">상승</span><!-- 22-10-20 접근성 추가-->
                                                                                                    <em>{{item_Chart.trWhtCntn}}</em>%
                                                                                                </span>
                                                                                            </template>
                                                                                            <template v-else-if="item_Chart.trWhtCntn < 0">
                                                                                                <span class="decrease" role="text">
                                                                                                    <span class="blind">하락</span><!-- 22-10-20 접근성 추가-->
                                                                                                    <em>{{Math.abs(item_Chart.trWhtCntn)}}</em>%
                                                                                                </span>
                                                                                            </template>
                                                                                            <template v-else-if="(item_Chart.tdAucAvgam == undefined || item_Chart.tdAucAvgam == '') && item_Chart.rcnDd7AucMveAvgam != '0'">
                                                                                                <span class="decrease" role="text">
                                                                                                    <span class="blind">하락</span><!-- 22-10-20 접근성 추가-->
                                                                                                    <em>100</em>%
                                                                                                </span>
                                                                                            </template>
                                                                                        </p>
                                                                                    </div>
                                                                                    <div class="line_grap line_grap01">
                                                                                        <!-- 2022-09-27 : 단위 제거  -->
                                                                                        <!-- <p class="txt_r">[단위 : 만원]</p> -->
                                                                                        <!-- 그래프 -->
                                                                                        <div :id="'chartHolder02_'+index_Chart" class="chartHolder chartHolder01 rmateBorderLine"></div>
                                                                                        <!--// 그래프 -->
                                                                                        <div class="legend_Area">
                                                                                            <p class="year_name">
                                                                                                <span class="prevYear">전년도</span>
                                                                                                <span class="thisYear">금년도</span>
                                                                                            </p>
                                                                                            <p class="txt_r">
                                                                                                <span class="prev_average">전년도 평균</span>
                                                                                                <!-- 2022-09-27 : 만단위로 수정 -->
                                                                                                <strong class="num"><b>{{numberFormat(item_Chart.yerAvg)}}</b></strong>
                                                                                                <span class="unit">원</span>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
            
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--// swiper Start -->


                                                        </div>
                                                        <!--// 박스 01 -->
                                                    </div>
                                                </div>
                                                <!--// 위의 차트 ####### 강낭콩(울타리콩) slider_01 -->
                                            </template>
                                                <!--// 아래 차트 ####### 밭벼 slider_02 -->
                                                <!--// 그냥 차트 시작 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
                                        </template>
                                    </template>
                                    <!-- ############################################################################################################################################################################################### -->
                                    <!--// 탭 내용-->


                                    <template v-if="culplAreaUntC==='GYEONG' && this.actoLatcChartCnt == 0">
                                        <!-- 조회된 정보가 없습니다. -->
                                        <div class="no_data_box no_data_box01 mt10 pt30">
                                            <div class="no_data_list">
                                                <p>조회된 정보가 없습니다.</p>
                                            </div>
                                            <div class="btn_option txt_c mt16">
                                                <button type="button" class="btn_round_new btn_mid_round line_gray i_plus" @click.prevent="fn_openPopupSZST2102()">작목등록</button>
                                            </div>
                                        </div>
                                        <!--// 조회된 정보가 없습니다. -->
                                    </template>

                                    <!--조회내역이 없을경우-->
                                    <template v-else> 
                                        <template v-if="culplAreaUntC !='actoLatcChartList' && culplAreaUntC !='hotList' && repVarDdtbyInqCn == 0">
                                            <div class="no_data_box">
                                                <div class="no_data_list">
                                                    <p>조회된 정보가 없습니다.</p>
                                                </div>
                                            </div>
                                        </template>
                                    </template> 
                                    <!--조회내역이 없을경우-->





                                    </div>
                                </div>
                            </section>
                        </div>
                        <!--// 탭 -->
                    </div>
                </div>

                <footersV2 type="sz" :aria-hidden="isShowFloatDiv" />

                <a href="javascript:void(0);" class="btn_float_write custom_btn_float_write"><img src="@/assets/images/common/btn_write01.png" alt="글쓰기" v-on:click.prevent="fn_openPop()" /></a>
            </page>
</template>

<script>
//필히 기입
$(document).on('click' , '.btn_close', function(){
    $(this).parents('.cal_pop_info_wrap').css('display','none');
});
//필히 기입

import apiService from '@/service/apiService'
import Page from '@/views/layout/Page.vue'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin  from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
//import AnCategory from '@/components/category/AnCategoryV2.vue'
//import AnSubCategory from '@/components/category/AnSubCategoryV2.vue'	
import AnSubCategoryV4 from '@/components/category/AnSubCategoryV4.vue'	
import CmmCalendarV2 from '@/components/CmmCalendarV2'   //영농캘린더 달력사항 추가(2021.06.24)  
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonService from '@/service/commonService'
import {monthAdd} from '@/utils/date'
import SZFR2102 from '@/views/page/SZ/FR/SZFR2102/SZFR2102'
import SZFR2103 from '@/views/page/SZ/FR/SZFR2103/SZFR2103'
import SZFR2104 from '@/views/page/SZ/FR/SZFR2104/SZFR2104'
import SZFC2112 from '@/views/page/SZ/FC/SZFC2112/SZFC2112'
import SZFC2113 from '@/views/page/SZ/FC/SZFC2113/SZFC2113'
import SZST2102 from '@/views/page/SZ/ST/SZST2102/SZST2102'
import {fncSlick_actoLatcChart} from '@/utils/slick'

export default {
    name : "ANSZ4002",
    
     data: () => {
        return {
            //변수초기화
            isInqDsc       : false,
            isPstnYn       : false,
            myFarmTxt      : "",

            repVarMydtCusno   : "",   //reponse마이데이터고객
            repVarInqYm       : "",   //reponse조회년월
            repVarDdtbyInqCn  : "",   //reponse일자별 조회건수

            varNaWrsLclc   : "",   //상품분류코드(대분류)
            varNaWrsMclc   : "",   //상품분류코드(중분류)
            varNaWrsSclc   : "",   //상품분류코드(소분류)
            varNaWrsSclfnm : "",   //상품분류명
            varNaWrs       : "",
            varCulplRgnC   : "",   //재배지지역코드
            varCulplRgnNm  : "",   //재배지지역명

            selItem1       : "",             
            tempDate       : "",          
            rCnt           : 0 ,
            uCnt           : 0 ,

            IMG_UNDERMAK    : "_",
            IMG_RBRIT       : "(",
            IMG_LBRIT       : ")",      

            dtbyInqList    : [],
            rzsBas         : [],    //영농캘린더 관련사항 추가(2021.06.28)   

            rszYYYYMM      : '',
            selrszYYYYMM   : '',
            currentYear    : '',  //현재년
            currentMonth   : '',  //현재월 00
            currentDay     : '', 
            rszDt          : '', 
            nowDt          : '',  
            prv_ena_yn     : "n",
            tmpculplRgnC   : "",
            certAgrYn     : false, 

            // kimhc_20220920
            layoutStr01   : "",
            layoutStr02   : "",
            layoutStr03   : "",
            layoutStr04   : "",

            chartData01   : [],
            chartData02   : [],
            chartData03   : [],
            chartData04   : [],

            prevAverage01 : 0,
            prevAverage02 : 0,

            childrenBox   : [],
            targetclass1  : "grap_toggle_box on",
            targetclass2  : "grap_toggle_box",
            culplAreaUntC : "",

            gyeongListCnt       : 0,
            actoCnt             : 0,         
            actoLatcList        : [],
            hotActoLatcCnt      : 0,  
            hotActoLatcList     : [],
            actoLatcChartCnt    : 0,  
            actoLatcChartList   : [],  
            
            hotAucLatcnm        : "",
            actoKnnm            : "",
            buttonDivCnt        : "",
            buttonDivList       : "",
            actoKnnmListArr     : [], // 버튼 클릭시 개수별 품종명  
            actoLatcChartTempList : [],
            hotYerAvg           : "",

            // S :: add. 21.07.21 
            isShowFloatDiv      : false, 
            refKey              : 0,
            
            chartDataActo01: [],
            chartDataActo02: [],

        }
    },
    
    mixins: [
        popupMixin,
        commonMixin
    ],

    created() {
      
      const date        = new Date()

      this.currentYear  = date.getFullYear()   //년
      this.currentMonth = ("0" + (date.getMonth() +1)).slice(-2)  //월 
      this.currentDay   = ("0" + date.getDate()).slice(-2)   //일
      this.rszYYYYMM    = this.currentYear+this.currentMonth   //년월
      this.nowYYYYMM    = this.currentYear+this.currentMonth
      this.nowDay    = ("0" + date.getDate()).slice(-2)
      this.nowDt     = this.nowYYYYMM+this.nowDay
      this.selrszYYYYMM = this.currentYear+this.currentMonth   //년월Slide에서 선택한 년월

      console.log("[ANSZ4002]created/(onLoad)년|월|일(currentYear|currentMonth|currentDay) =>>> ", this.currentYear, this.currentMonth, this.currentDay )    
      console.log("[ANSZ4002]created/(onLoad)년월(rszYYYYMM) =>>> ", this.rszYYYYMM )    
      console.log("[ANSZ4002]created/(onLoad)년월Slide 선택/년월(selrszYYYYMM) =>>> ", this.selrszYYYYMM )    
      console.log("[ANSZ4002]created/(onLoad)년월Slide 선택이전/년월(nowYYYYMM) =>>> ", this.nowYYYYMM )    
      console.log("[ANSZ4002]created/(onLoad)년월Slide 선택이전/일(nowDay) =>>> ", this.nowDay )    
      console.log("[ANSZ4002]created/(onLoad)년월Slide 선택이전/일(nowDt) =>>> ", this.nowDt )    

    }, 

    mounted() {

       //this.initComponent()
        this.initComponent(this.params)
       //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     
        $("#GYEONG").show();

    },

     methods: {
        initComponent(param = {}) {
            this.popId = param.popId
            console.log("[ANSZ4002]initComponent/popId=>> ", this.popId)

            console.log(">>> [ANSZ4002]methods(Start) <<<")

            this.isPstnYn  = true      //+ 이미지 초기화(true)
            this.myFarmTxt = "나의농장" //나의농장 Select 초기화
            this.varNaWrsLclc = "000"
            this.varNaWrsMclc = "000"
            this.varNaWrsSclc = "000"
            this.isInqDsc  = false     //조회구분코드(마이농장;1,세부작목;2) <<= 조회구분여부 true일 경우 세부작목

            console.log("[ANSZ4002]initComponent/마이데이터고객번호=>> ", this.getUserInfo('mydtCusno'))
            console.log("[ANSZ4002]initComponent/이미지 초기화=>> ", this.isPstnYn)
            console.log("[ANSZ4002]initComponent/나의농dSelect 초기화=>> ", this.myFarmTxt)
            console.log("[ANSZ4002]initComponent/조회구분코드(여부)=>> ", this.isInqDsc)
            console.log("[ANSZ4002]initComponent/년|월=>> ", this.currentYear, this.currentMonth )    

            console.log("[ANSZ4002]initComponent/경제통합상품대분류코드=>> "+this.varNaWrsLclc)
            console.log("[ANSZ4002]initComponent/경제통합상품중분류코드=>> "+this.varNaWrsMclc)
            console.log("[ANSZ4002]initComponent/경제통합상품소분류코드=>> "+this.varNaWrsSclc)

            //2021.10.15 변경 
            //선택년월의 년도 = 현재년월의 년도 인 경우    
            if (this.rszYYYYMM.substring(0,4)  === this.nowYYYYMM.substring(0,4)) {

                if (this.rszYYYYMM.substring(4,6) ===  this.nowYYYYMM.substring(4,6)) {
                    this.prv_ena_yn = 'n'   //날짜 prev 진행여부 n(nexxt)
                }    
            } 

            this.fn_getAsetList()   //사용자 전송요구리스트 조회
            console.log(">>> [ANSZ4002]methods(End) <<<")

            this.getData();
        },
        getData() {
            $("#GYEONG").show();
        },

        //정보제공동의여부 조회
        fn_getAsetList(){

            console.log(">>> [ANSZ4002]fn_getAsetList(Start) <<<")

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
                console.log("[ANSZ4002]fn_getAsetList/동의여부(response.agrYn)=>> ", response.agrYn)
                console.log("[ANSZ4002]fn_getAsetList/동의여부(agrYn)=>> ", agrYn)

                let stltTpc = response.stltTpc || ""
                let sqno    = response.sqno
                let ofrHdngC = response.ofrHdngC || ""

                this.certAgrYn = agrYn === "0" ? false : true  //동의여부가 0(미동의)인 경우 false, 1(동의)인 경우 true
                console.log("[ANSZ4002]fn_getAsetList/정보제공여부(certAgrYn)=>> ", this.certAgrYn)

                if(!this.certAgrYn) {
                    console.log("[ANSZ4002]fn_getAsetList/certAgrYn=>> 미동의(false)~ ")

                    const config_pop = {
                        component: SZFC2112,
                        params : {
                            certAgrYn   : this.certAgrYn || false,   //동의여부
                            stltTpc     : stltTpc,     //약관유형코드
                            sqno        : sqno,        //일련번호
                            ofrHdngC    : ofrHdngC,    //제공항목코드
                            popId       : "SZFR0001",
                        }
                    }
                    modalService.openPopup(config_pop).then(response => {

                        console.log("[ANSZ4002]fn_getAsetList/response=>> "+response)

                        if(response === 'noSeemyFarm')   //[다시 선택하지 않기]
                        {
                            console.log("[ANSZ4002]fn_getAsetList/ 다시선택하지 않기(noSeemyFarm)~ ")
                            commonService.setStorage('noSeemyFarm' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno')  , 'Y')
                        }

                        //*2021.12.06(월) 추가
                        if(response === 'goSeemyChkFarm')   //[동의]인 경우 
                        {
                            console.log("[ANSZ4002]fn_getAsetList/ goSeemyChkFarm(동의서 선텍 맟 서비스 이용하기 선택시~~) ")

                            this.fn_openSlidePop()   
                        } else  if(response === 'goSeemyNonChkFarm' || response === 'goSeemyFarm')   //[미동의]인 경우 or [닫기]버튼 선택시
                        {
                            console.log("[ANSZ4002]fn_getAsetList/ goSeemyChkFarm(동의서 미선텍 맟 서비스 이용하기 선택시~~) ")

                              this.fn_init()
                        }
                        //*2021.12.06(월) 추가

                    })

                } else {
                    console.log("[SZFC0001]fn_getAsetList/certAgrYn=>> 동의(true)11~ ")

                    //[다시보지 않기] 선택하지 않은 경우~
                    if( commonService.getStorage('noSeemyFarm' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno')) !== 'Y' )   
                    {
                        console.log(">>> [ANSZ4002]initComponent/[다시보지 않기] 미선택시~ <<< ")

                        //약관동의 안내문 확인 선택을 하지 않은 경우~        
                        if( commonService.getStorage('noSeemyFarmClaSign' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'Sign') !== 'Y' ) {
                            console.log(">>> [ANSZ4002]initComponent/약관동의 안내문 확인 선택시11~ <<< ")
                            
                            this.fn_openSlidePop()
                        } else {
                            console.log(">>> [ANSZ4002]initComponent/약관동의 안내문 확인 선택시22~ <<< ")
                            
                             this.fn_init()
                        }
                    } else {
                        console.log(">>> [ANSZ4002]initComponent/[다시보지 않기] 선택시~ <<< ")

                        this.fn_init()    //초기설정
                    }

                    //this.fn_init()  //초기설정
                }
            })

            console.log(">>> [ANSZ4002]fn_getAsetList(End) <<<")
        },

       /*
        * 초기설정
        */
        fn_init(){

            this.fn_getAbiCulplList() //기본 나의농장 처리 시 필요 영농재배지/경제통합상품소분류명
            this.fn_chngSelItem('A')

        },

       /*
        * [년월 달력] 팝업호출
        */
        selectMonth(){

            console.log(" >>> [ANSZ4002]selectMonth(Start) <<<")    

            // 년월선택
            const config = {
                params: {
                    title: '년월 선택',
                    yyyymm : this.currentYear + '' + this.currentMonth,
                    limit  : 60,
                },
            }
            modalService.openSlideSelectMonth(config).then(response => {
                this.currentYear = response.substring(0,4)
                this.currentMonth = response.substring(4,6)
                this.rszYYYYMM = this.currentYear + '' + this.currentMonth
                console.log('확인용' + this.rszYYYYMM)

                //* 추가(2021.08.23)                    
                //선택년월의 년도 = 현재년월의 년도 인 경우    
                if (this.rszYYYYMM.substring(0,4)  === this.nowYYYYMM.substring(0,4)) {

                    console.log('현재년도/선택년도가 동일할 경우~~~~')

                    //* 2021.10.15(금) 주석처리
                    // if (this.rszYYYYMM.substring(4,6) >  this.nowYYYYMM.substring(4,6)) {
                    //      this.currentMonth = Number(this.currentMonth) - 1
                    //      this.currentMonth = ("0" + (this.currentMonth)).slice(-2)  

                    //     modalService.alert("현재월 또는 이전월만 선택 가능합니다.").then(() => {
                    //         return false
                    //     });
                    // }    
                    //* 2021.10.15(금) 주석처리

                    //* 2021.10.15(금) 추가
                    if (this.rszYYYYMM.substring(4,6) ===  this.nowYYYYMM.substring(4,6)) {
                        console.log('선택월과 현재월이 동일할 경우~~~~')
                        this.prv_ena_yn = 'n'   //날짜 prev 진행여부 n(nexxt)
                    } else {
                        console.log('선택월과 현재월이 동일하지 않을 경우~~~~')
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
                    //     this.fn_chngSelItem('A')
                } else {
                   this.prv_ena_yn = 'y'     //날짜 prev 진행여부 y(prev)  
                }
                
                this.fn_chngSelItem('A')

                //*sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                // this.$nextTick(() => {
                //     this.callJQueryFncExcute()
                // })
            })  

            console.log(" >>> [ANSZ4002]selectMonth(End) <<<")    

        },

        //**************
        // [조회]
        //***************/
        getSearchList(flag) {

            console.log(">>> [ANSZ4002]getSearchList(Start) <<< ")

            console.log("[ANSZ4002]getSearchList/(변수)flag=>> "+flag)
            console.log("[ANSZ4002]getSearchList/(변수)마이농장여부=>> "+this.isInqDsc)
            console.log("[ANSZ4002]getSearchList/(변수)경제통합상품대분류코드=>> "+this.varNaWrsLclc)
            console.log("[ANSZ4002]getSearchList/(변수)경제통합상품중분류코드=>> "+this.varNaWrsMclc)
            console.log("[ANSZ4002]getSearchList/(변수)경제통합상품소분류코드=>> "+this.varNaWrsSclc)
            console.log("[ANSZ4002]getSearchList/(변수)간편일지여부=>> "+this.culplAreaUntC)

            const config = {
                // url:'/sz/fr/01r01', 
                url:'/sz/fr/01ra1',

                data : {
                    mydtCusno   : this.getUserInfo('mydtCusno'),        //마이데이터고객번호 = (변수)마이데이터고객번호
                    inqYm       : this.currentYear+this.currentMonth,   //조회년월(년월)   = (변수)년+(변수)월
                    inqDsc      : !this.isInqDsc?'1':'2',               //조회구분코드(마이농장;1,세부작목;2) <<= 조회구분여부 true일 경우 세부작목
                    naWrsLclc   : !this.isInqDsc?'':this.varNaWrsLclc,  //마이농장일 경우 = '', 세부작목 = (변수)경제통합상품대분류코드
                    naWrsMclc   : !this.isInqDsc?'':this.varNaWrsMclc,  //마이농장일 경우 = '', 세부작목 = (변수)경제통합상품중분류코드
                    naWrsSclc   : !this.isInqDsc?'':this.varNaWrsSclc,  //마이농장일 경우 = '', 세부작목 = (변수)경제통합상품소분류코드
                    easyDiaryYn : flag==='9'?'':flag,                 //간편일지(1;간편일지, '';전체)

                    // basDt       : '20210101', // 테스트 용 임시 사용
                    basDt       : this.nowDt, // 오늘 일짜
                }
            }

            console.log("======= 날짜 확인 !!!!!!! this.nowDt ", this.nowDt)
            console.log("[ANSZ4002]config=>> ", config)

            apiService.call(config).then(response => {

                console.log("[ANSZ2002]response=>> ", response)

                //this.repVarMydtCusno  = response.mydtCusno  //(변수)마이데이터고객  = response.마이데이터고객
                this.repVarInqYm      = response.inqYm      //(변수)조회년월       = response.조회년월
                console.log("[ANSZ4002]/(변수)조회년월(inqYm)=>> ", this.repVarInqYm)
                this.repVarDdtbyInqCn = (response.dtbyInqCn === undefined)?0:response.dtbyInqCn          //(변수)일자별 조회건수 = response.일자별 조회건수
                this.dtbyInqList   = (response.dtbyInqList === undefined)?'':response.dtbyInqList || []   //일자별조회목록
                console.log("[ANSZ4002]/(변수)일자별 조회건수(dtbyInqCn)=>> ", this.repVarDdtbyInqCn)
                console.log("[ANSZ4002]fn_RstInfo/dtbyInqList =>>"+JSON.stringify(this.dtbyInqList))

                this.fn_RstInfo()

                //*sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                this.$nextTick(() => {
                     this.callJQueryFncExcute()
                })

                this.fn_getAbiCulplList()  

                console.log(">>> [ANSZ4002]getSearchList(End) <<< ")
            })        
        },

		//기본 나의농장 처리 시 필요 영농재배지/경제통합상품소분류명
		fn_getAbiCulplList(){
			
            console.log(">>> [SZFR0001]fn_getAbiCulplList(Start) <<< ")    
            const config ={
                url:'/sz/fr/00r01',
				data : {
					mydtCusno   :  this.getUserInfo('mydtCusno')  	//(입력)마이데이터고객번호 = (params)마이데이터고객번호		 
                 }
             }

             apiService.call(config).then(response => {
                const abiCulplList  = response.abiCulplList || [];       //작목재배지목록 = response.작목재배지목록
                console.log("[ANSZ4002]fn_getAbiCulplList/response.abiCulplList =>> "+JSON.stringify(response.abiCulplList))

                console.log("[ANSZ4002]fn_getAbiCulplList/this.myFarmTxt=>> "+this.myFarmTxt)

                if (response.abiCulplList !== undefined && response.abiCulplList.length > 0) 
                {
                    for (let i=0; i<abiCulplList.length;i++)
                    {
                        if(abiCulplList[i].naWrsSclfnm === this.myFarmTxt ){
                            this.varNaWrsLclc   = abiCulplList[i].naWrsLclc    
                            this.varNaWrsMclc   = abiCulplList[i].naWrsMclc    
                            this.varNaWrsSclc   = abiCulplList[i].naWrsSclc    
                            this.varNaWrsSclfnm = abiCulplList[i].naWrsSclfnm  
                            this.varCulplRgnC   = abiCulplList[i].culplRgnC || ""
                            this.varCulplRgnNm  = abiCulplList[i].culplRgnNm || ""
                            break
                        }
                    }
                }

			})

             console.log(">>> [ANSZ4002]fn_getAbiCulplList(End) <<< ")    

		},

        /*
        * [나의농장] 슬라이드팝업 호출 
        */
        fn_slidmyFarmPopOpen() {

            console.log(">>> [ANSZ4002]fn_slidmyFarmPopOpen(Start) <<<")  

            this.culplAreaUntC ='ALL'        
            console.log("[ANSZ4002]fn_slidmyFarmPopOpen/(변수)culplAreaUntC=>> "+this.culplAreaUntC)  
            console.log("[ANSZ4002]fn_slidmyFarmPopOpen/(입력)마이데이터고객번호=>> "+this.getUserInfo('mydtCusno'))  

            const config = {
				params : {
					mydtCusno : this.getUserInfo('mydtCusno')  //this.getUserInfo('mydtCusno') , //마이데이터고객번호
				},
                renderer: { 
                    component: SZFR2102,
                }
			}
            modalService.openSlidePagePopup(config).then(response => {

                console.log(response)
                this.varNaWrsLclc   = response.naWrsLclc    //(변수)상품분류코드(대분류) = 상품분류코드(대분류)
                this.varNaWrsMclc   = response.naWrsMclc    //(변수)상품분류코드(중분류) = 상품분류코드(중분류)
                this.varNaWrsSclc   = response.naWrsSclc    //(변수)상품분류코드(소분류) = 상품분류코드(소분류)
                this.varNaWrsSclfnm = response.naWrsSclfnm  //(변수)상품분류명= 상품분류명(소분류)
                this.varCulplRgnC   = response.culplRgnC    //(변수)재배지지역코드= 재배지지역코드
                this.varCulplRgnNm  = response.culplRgnNm   //(변수)재배지지역명= 재배지지역명

				console.log("[ANSZ4002](변수)상품분류코드(대)=>> "+this.varNaWrsLclc)  
				console.log("[ANSZ4002](변수)상품분류코드(중)=>> "+this.varNaWrsMclc)  
				console.log("[ANSZ4002](변수)상품분류코드(소)=>> "+this.varNaWrsSclc)  
				console.log("[ANSZ4002](변수)상품분류명=>> "+this.varNaWrsSclfnm)  
				console.log("[ANSZ4002](변수)재배지지역코드|재배지지역명=>> "+this.varCulplRgnC, this.varCulplRgnNm)  

                this.varNaWrs = this.varNaWrsLclc+this.varNaWrsMclc+this.varNaWrsSclc
				console.log("[ANSZ4002](변수)상품분류코드(대/중/소)=>> "+this.varNaWrs)  

                 if (this.varNaWrs === "000000000") {    //나의농장일 경우
                    this.isInqDsc = false
                 } else {   //세부항목일 경우
                    this.isInqDsc = true
                }
				console.log("[ANSZ4002](변수)나의농장여부=>>"+this.isInqDsc)  

                this.myFarmTxt = this.varNaWrsSclfnm   //(변수)상품분류명 = (response)상품분류명(소분류)
				console.log("[ANSZ4002](변수)상품분류명=>>"+this.myFarmTxt)  
                //                
                if ( this.culplAreaUntC === 'ALL') {  //조회(전체조회)
                   this.getSearchList('9')  //조회(전체조회)
                }

                //*sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                this.$nextTick(() => {
                    this.callJQueryFncExcute()
                })

            })

            console.log(">>> [ANSZ4002]fn_slidmyFarmPopOpen(End) <<<")  
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
                // } else {
                //     console.log("[SZFR0001]callComponentEvent/dLabel[0] === undefine인 경우/this.callCompEntYn=>>"+this.callCompEntYn)  
                }
            })          
        },
        //배준성부장 추가요청 부분(08.13(금))

        /*
        * [영농일지 상세(수정)] 팝업호출 
        * (1.경제통합상품대분류코드/2.경제통합상품중분류코드/3.경제통합상품소분류코드/4.분류명/5.재배지지역코드/6.재배지지역명/7.마이농가경제통합인터페이스구분코드
        *  8.경제통합데이터구분코드/9.사무소코드/10.경제통합전표번호/11.영농일지작업일자/12.영농일지일련번호/13.거래일자) 
        */
        fn_openFarmDailyPop(flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8, flag9, flag10, flag11, flag12, flag13) {  
            let popParams2 = {}
            
            console.log(">>> [ANSZ4002]fn_openFarmDailyPop(Start) <<< ")

            console.log("[SZFC0001]fn_openFarmDailyPop/1.경제통합상품대분류코드=>> "+flag1)
            console.log("[SZFC0001]fn_openFarmDailyPop/2.경제통합상품중분류코드=>> "+flag2)
            console.log("[SZFC0001]fn_openFarmDailyPop/3.경제통합상품소분류코드=>> "+flag3)
            console.log("[SZFC0001]fn_openFarmDailyPop/4.분류명=>> "+flag4)
            console.log("[SZFC0001]fn_openFarmDailyPop/5.재배지지역코드=>> "+flag5)
            console.log("[SZFC0001]fn_openFarmDailyPop/6.재배지지역명=>> "+flag6)
            console.log("[SZFC0001]fn_openFarmDailyPop/7.마이농가경제통합인터페이스구분코드=>> "+flag7)
            console.log("[SZFC0001]fn_openFarmDailyPop/8.경제통합데이터구분코드=>> "+flag8)
            console.log("[SZFC0001]fn_openFarmDailyPop/9.사무소코드=>> "+flag9)
            console.log("[SZFC0001]fn_openFarmDailyPop/10.경제통합전표번호=>> "+flag10)
            console.log("[SZFC0001]fn_openFarmDailyPop/11.영농일지작업일자=>> "+flag11)
            console.log("[SZFC0001]fn_openFarmDailyPop/12.영농일지일련번호=>> "+flag12)
            console.log("[SZFC0001]fn_openFarmDailyPop/13.거래일자=>> "+flag13)

            popParams2.trDsc  	   = "U"	  //거래구분코드(C:등록,U:수정,D:삭제)
            popParams2.naWrsLclc   = flag1    //상품분류코드(대분류) = (변수)상품분류코드(대분류)
            popParams2.naWrsMclc   = flag2	  //상품분류코드(중분류) = (변수)상품분류코드(중분류)
            popParams2.naWrsSclc   = flag3	  //상품분류코드(소분류) = (변수)상품분류코드(소분류)	
            popParams2.naWrsSclfnm = flag4    //상품분류명 = (변수)경제통합상품상품분류명
            popParams2.culplRgnC   = flag5    //재배지지역코드 = (변수)재배지지역코드 			
            popParams2.culplRgnNm  = flag6    //재배지지역명 = (변수)재배지지역명        		
            popParams2.myfhsNaIntfDsc =	flag7 //마이농가경제통합인터페이스구분코드    
            popParams2.naDataDsc   = flag8    //경제통합데이터구분코드    
            popParams2.brc         = flag9    //사무소코드
            popParams2.naSlpno     = flag10   //경제통합번호
            popParams2.wkDt        = flag11   //영농일지작업일자 = (변수)년+(변수)월+(변수)일
            popParams2.sqno 	   = flag12   //영농일지번호
            popParams2.trDt 	   = flag13   //거래일자

            const config = {
                component : SZFR2104, 
                params : {"objAreaInfo" : popParams2}
            }	    

            //  글쓰기 이미지 보여주지 않기
            this.isPstnYn = false
            console.log("[ANSZ4002]fn_openMyFarmDetailPop/(전)isPstnYn=>>"+this.isPstnYn)

            modalService.openPopup(config).then(response => {

                console.log('[ANSZ4002]response=>> ' , response)

                if(response === 'complete'){         
                    this.isPstnYn = true  //글쓰기 이미지 보여주기    
                    console.log("[ANSZ4002]fn_popupSel/(후)isPstnYn=>> "+this.isPstnYn)

                    //변경(2021.09.28 이성재차장 요청)            
                    if ( this.culplAreaUntC === 'ALL') {  //조회(전체조회)
                       this.fn_chngSelItem('A')
                    } else if (this.culplAreaUntC === 'SIMPLE') {  //조회(간편일지)
                       this.fn_chngSelItem('S')
                    
                    // kimhc_20220920 
                    } else if (this.culplAreaUntC === 'GYEONG') {  // 경락가격
                       this.fn_chngSelItem('G')
                    }   

                    //변경(2021.09.28 이성재차장 요청)            
                } 
             })        

            console.log(">>> [ANSZ4002]fn_openFarmDailyPop(End) <<< ")

        },

        /*
        * [경제데이타 등록] 팝업호출 
        * (21.경제통합상품대분류코드/22.경제통합상품중분류코드/23.경제통합상품소분류코드/24.분류명/25.재배지지역코드/26.재배지지역명/27.마이농가경제통합인터페이스구분코드
        *  28.경제통합데이터구분코드/29.사무소코드/30.경제통합전표번호/31.영농일지작업일자/32.영농일지일련번호/33.거래일자)
        */
        fn_openEconormyPop(flag21, flag22, flag23, flag24, flag25, flag26, flag27, flag28, flag29, flag30, flag31, flag32, flag33) {
            let popParams1 = {}

            console.log(">>> [ANSZ4002]fn_openEconormyPop(Start) <<< ")

            console.log("[SZFC0001]fn_openEconormyPop/1.경제통합상품대분류코드=>> "+flag21)
            console.log("[SZFC0001]fn_openEconormyPop/2.경제통합상품중분류코드=>> "+flag22)
            console.log("[SZFC0001]fn_openEconormyPop/3.경제통합상품소분류코드=>> "+flag23)
            console.log("[SZFC0001]fn_openEconormyPop/4.분류명=>> "+flag24)
            console.log("[SZFC0001]fn_openEconormyPop/5.재배지지역코드=>> "+flag25)
            console.log("[SZFC0001]fn_openEconormyPop/6.재배지지역명=>> "+flag26)
            console.log("[SZFC0001]fn_openEconormyPop/7.마이농가경제통합인터페이스구분코드=>> "+flag27)
            console.log("[SZFC0001]fn_openEconormyPop/8.경제통합데이터구분코드=>> "+flag28)
            console.log("[SZFC0001]fn_openEconormyPop/9.사무소코드=>> "+flag29)
            console.log("[SZFC0001]fn_openEconormyPop/10.경제통합전표번호=>> "+flag30)
            console.log("[SZFC0001]fn_openEconormyPop/11.영농일지작업일자=>> "+flag31)
            console.log("[SZFC0001]fn_openEconormyPop/12.영농일지일련번호=>> "+flag32)
            console.log("[SZFC0001]fn_openEconormyPop/13.거래일자=>> "+flag33)

            popParams1.trDsc  	   = "C"		  //거래구분코드(C:등록,U:수정,D:삭제)
            popParams1.inqYm       = this.currentYear+this.currentMonth         //조회년월 = (변수)년+(변수)월+(변수)일
            popParams1.basDt       = this.currentYear+this.currentMonth+flag27  //기준일자 = (변수)년+(변수)월+(변수)일
            popParams1.naDataDsc   = flag28       //경제통합데이터구분코드(DIRECT;영농일지 등록)    
            popParams1.naWrsLclc   = flag21       //상품분류코드(대분류) = (변수)상품분류코드(대분류)
            popParams1.naWrsMclc   = flag22	      //상품분류코드(중분류) = (변수)상품분류코드(중분류)
            popParams1.naWrsSclc   = flag23	      //상품분류코드(소분류) = (변수)상품분류코드(소분류)	
            popParams1.naWrsSclfnm = flag24       //상품분류명 = (변수)경제통합상품상품분류명
            popParams1.culplRgnC   = flag25       //재배지지역코드 = (변수)재배지지역코드 			
            popParams1.culplRgnNm  = flag26       //재배지지역명 = (변수)재배지지역명        		
            popParams1.myfhsNalntfDsc =	flag27    //마이농가경제통합인터페이스구분코드    myfhsNalntfDsc 		
            popParams1.brc         = flag29       //사무소코드
            popParams1.naSlpno     = flag30       //경제통합번호
            popParams1.wkDt        = flag31       //영농일지작업일자 = (변수)년+(변수)월+(변수)일
            popParams1.sqno 	   = flag32       //영농일지번호
            popParams1.trDt 	   = flag33       //거래일자

            const config = {
                component : SZFR2103, //작목재배지관리(POP)
                params : {"objAreaInfo" : popParams1}
            }	    

            //  글쓰기 이미지 보여주지 않기
            this.isPstnYn = false
            console.log("[ANSZ4002]fn_openEconormyPop/(전)isPstnYn=>>"+this.isPstnYn)

            modalService.openPopup(config).then(response => {

                console.log('[ANSZ4002]response=>> ' , response)

                if (response === 'complete'){         
                    this.isPstnYn = true   //글쓰기 이미지 보여주기    
                    console.log("[ANSZ4002]fn_popupSel/(후)isPstnYn=>> "+this.isPstnYn)

                    //변경(2021.09.28 이성재차장 요청)            
                    if ( this.culplAreaUntC === 'ALL') {  //조회(전체조회)
                       this.fn_chngSelItem('A')  
                    } else if (this.culplAreaUntC === 'SIMPLE') {  //조회(간편일지)
                       this.fn_chngSelItem('S')
                    }    
                    //변경(2021.09.28 이성재차장 요청)            
                } 

             })        

            console.log(">>> [ANSZ4002]fn_openEconormyPop(End) <<< ")            

        },

        /*
        * [글쓰기] 팝업호출 
        */
        fn_openPop() {
            
            let popParams0 = {}    

            console.log(">>> [ANSZ4002]fn_openPop(Start) <<< ")

            console.log("[ANSZ4002]fn_openPop/(변수)선택 년월=>> "+this.selrszYYYYMM)
            console.log("[ANSZ4002]fn_openPop/(변수)현재 년월=>> "+this.rszYYYYMM)
            console.log("[ANSZ4002]fn_openPop/(변수)년/월/일=>> "+this.currentYear, this.currentMonth, this.currentDay)

            console.log("[SZFC0001]fn_openPop/1.경제통합상품대분류코드=>> "+this.varNaWrsLclc)
            console.log("[SZFC0001]fn_openPop/2.경제통합상품중분류코드=>> "+this.varNaWrsMclc)
            console.log("[SZFC0001]fn_openPop/3.경제통합상품소분류코드=>> "+this.varNaWrsSclc)
            console.log("[SZFC0001]fn_openPop/4.분류명=>> "+this.varNaWrsSclfnm)
            console.log("[SZFC0001]fn_openPop/5.재배지지역코드=>> "+this.varCulplRgnC)
            console.log("[SZFC0001]fn_openPop/6.재배지지역명=>> "+this.varCulplRgnNm)
            console.log("[SZFC0001]fn_openPop/7.마이농가경제통합인터페이스구분코드=>> N/A ")
            console.log("[SZFC0001]fn_openPop/8.경제통합데이터구분코드=>> N/A ")
            console.log("[SZFC0001]fn_openPop/9.사무소코드=>> N/A ")
            console.log("[SZFC0001]fn_openPop/10.경제통합전표번호=>> N/A ")
            console.log("[SZFC0001]fn_openPop/11.영농일지작업일자=>> N/A ")
            console.log("[SZFC0001]fn_openPop/12.영농일지일련번호=>> N/A ")
            console.log("[SZFC0001]fn_openPop/13.거래일자=>> "+this.rszYYYYMM+this.currentDay)
            console.log("[SZFC0001]fn_openPop/13.현재년월=>> "+this.repVarInqYm)

            //경제통합상품상품분류가 '000000000'인 경우    
            if (this.varNaWrs === "000000000" ) {
               this.varNaWrsSclfnm = this.myFarmTxt    //(변수)경제통합상품상품분류명 <<- 나의농장 필드값
            }    

            popParams0.trDsc  	   = "C"				 //거래구분코드(C:등록,U:수정,D:삭제)
            popParams0.naDataDsc   = "DIRECT"       	 //경제통합데이터구분코드(DIRECT;영농일지 등록)    
            popParams0.naWrsLclc   = this.varNaWrsLclc   //상품분류코드(대분류) = (변수)상품분류코드(대분류)
            popParams0.naWrsMclc   = this.varNaWrsMclc	 //상품분류코드(중분류) = (변수)상품분류코드(중분류)
            popParams0.naWrsSclc   = this.varNaWrsSclc	 //상품분류코드(소분류) = (변수)상품분류코드(소분류)
            popParams0.naWrsSclfnm = (this.varNaWrs === '000000000')?this.myFarmTxt:this.varNaWrsSclfnm //상품분류명 = (변수)경제통합상품상품분류명
            popParams0.culplRgnC   = this.varCulplRgnC   //재배지지역코드 = (변수)재배지지역코드 			
            popParams0.culplRgnNm  = this.varCulplRgnNm  //재배지지역명 = (변수)재배지지역명        		
            popParams0.myfhsNalntfDsc =	""      //마이농가경제통합인터페이스구분코드    		
            popParams0.brc         = ""         //사무소코드
            popParams0.naSlpno     = ""         //경제통합번호
            popParams0.wkDt        = this.repVarInqYm+this.currentDay  //영농일지작업일자 = (변수)년+(변수)월+(변수)일
            popParams0.sqno        = 0          //영농일지번호
            // popParams0.trDt        = this.selrszYYYYMM+this.currentDay      
            popParams0.trDt        = this.rszYYYYMM+this.currentDay        //거래일자
            
            const config = {
                component : SZFR2103, //작목재배지관리(POP)
                params : {"objAreaInfo" : popParams0}
            }	    

            //* 글쓰기 이미지 보여주지 않기
            this.isPstnYn = false
 
			modalService.openPopup(config).then(response => {

                 console.log("[SZFR2103]fn_openPop/response=>> "+response)

                if (response === 'complete'){         
                    this.isPstnYn = true   //글쓰기 이미지 보여주기    
                    console.log("[ANSZ4002]fn_popupSel/(후)isPstnYn=>> "+this.isPstnYn)

                    //변경(2021.10.07 이성재차장 요청)            
                    if ( this.culplAreaUntC === 'ALL') {  //조회(전체조회)
                       this.fn_chngSelItem('A')  
                    } else if (this.culplAreaUntC === 'SIMPLE') {  //조회(간편일지)
                       this.fn_chngSelItem('S')
                    }    
                    //변경(2021.10.07 이성재차장 요청)            

                    //2021.11.01(월) 추가    
                    this.fn_getAbiCulplList()
                    //2021.11.01(월) 추가    
                } 

            })

            //this.initComponent()  //재조회     
            console.log(">>> [ANSZ4002]fn_openPop(End) <<< ")
            
        },

        //'달력'컴퍼넌트에 조회값을 보여주고자 할 경우
        fn_RstInfo() {

            this.rzsBas = this.dtbyInqList  //rzsBas대괄호[] = 일자별조회목록[]
         }, 

        /*
        * [전체 또는(간편)일지] 선택
        */
        fn_chngSelItem(flag) {

            if (flag === 'A') {  

                this.culplAreaUntC = 'ALL'
                this.getSearchList('9')   //조회(전체조회)

            } else if (flag === 'S') {   

                this.culplAreaUntC = 'SIMPLE'
                this.getSearchList('1')   //조회
            // kimhc_20220920
            } else if (flag === 'G') { 

                this.culplAreaUntC = 'GYEONG'
                // $(".pt23").hide();
                $("#GYEONG").show();

                this.getSearchList('9')
                // this.getSearchList('1')   //조회

                // kimhc_20220920 알매이트 
                // 토글 ( 강낭콩(울타리콩), 밭벼 ) 
                // console.log("======= this.toggleFn() fn_chngSelItem에서  호출!!! ======= ")
                // this.$nextTick(()=>{
                //     this.toggleFn();
                // })	
            }else if (flag === 'H') { 

                this.actoKnnm = ""; // 값 초기화

                this.culplAreaUntC = 'hotList'
                // console.log("======= this.toggleFn() fn_chngSelItem에서  호출!!! ======= ")
                // this.$nextTick(()=>{
                //     this.toggleFn();
                // })	

                // 이번달 인기 많은 농작물
                this.getHotActoLatcList();
            }    

            // console.log("============== this.toggleFn() fn_chngSelItem  완료 시점에서 호출!!! this.culplAreaUntC ==============  ", this.culplAreaUntC)

        },

        /*
        * [이전/이후 꺽쇠] 선택
        */
        fn_bfraftClamp(flag){
            console.log(">>>>>>> [ANSZ4002]fn_bfraftClamp(Start) <<<<<<< ")

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

            //this.getSearchList('9')  //조회(전체조회)
            this.fn_chngSelItem('A')

        },

        //day가 현재일과 동일할 경우 처리    
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
            //    return 'day no_line'
               return 'day'
             //return 'day'
            } else {  
              return 'day'
            }  
        },      

        //[약관동의 안내문] Slide 선택시
        fn_openSlidePop() {

            console.log("[ANSZ4002]fn_openSlidePop(Start) ")

            const config = {
				params : {
					mydtCusno : this.getUserInfo('mydtCusno') ,  //this.getUserInfo('mydtCusno') , //마이데이터고객번호
				},
                renderer: {
                    component: SZFC2113,
                }
			}
            modalService.openSlidePagePopup(config).then(response => {

                console.log("[ANSZ4002]fn_openSlidePop/response=>> "+response)

                if(response === 'noSeemyFarmClaSign')
                {
                    console.log("[ANSZ4002]fn_openSlidePop/ 여기1(noSeemyFarm)~ ")
                    commonService.setStorage('noSeemyFarmClaSign' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'Sign' , 'Y')
                    
                    //*
                    this.fn_init()
                }
            })
            //   this.fn_init()  //초기설정

            console.log("[ANSZ4002]fn_openSlidePop(End) ")
        },
        // kimhc_20220920 알매이트 
        // 토글 ( 강낭콩(울타리콩), 밭벼 ) 
        toggleFn(gubun, event) {

            // console.log("======= toggleFn(gubun, event)  gubun =======", gubun);
            console.log("======= toggleFn(gubun, event)  event =======", event);
            // console.log("======= toggleFn(gubun, event)  event.target =======", event.target);
            // console.log("======= toggleFn(gubun, event)  event.target.class =======", event.target.class);
            
            $("#GYEONG").show();

            if(gubun === "1"){
                // console.log("======= toggleFn(gubun, event)  gubun 111=======", gubun);
                this.targetclass2  = "grap_toggle_box on";
                this.targetclass1  = "grap_toggle_box";
            }else{
                // console.log("======= toggleFn(gubun, event)  gubun 222 =======", gubun);
                this.targetclass1  = "grap_toggle_box on";
                this.targetclass2  = "grap_toggle_box";
            }

        },
        hot_chart01 () {

            if(this.actoKnnm != null && this.actoKnnm.length !=0){
                $(".grap_toggle_wrap.grap_toggle_wrap01").each(function(){
                    // console.log("=== hot_chart01 grap_toggle_wrap grap_toggle_wrap01 $(this) ===", $(this));
                    $(this).css("display", "block");
                    // console.log("=== grap_toggle_wrap grap_toggle_wrap01 $(this) css display ===", $(this).css("display"));
                })
            }else{
                $(".grap_toggle_wrap.grap_toggle_wrap01").each(function(){
                    // console.log("=== hot_chart01 grap_toggle_wrap grap_toggle_wrap01 $(this) ===", $(this));
                    $(this).css("display", "none");
                    // console.log("=== grap_toggle_wrap grap_toggle_wrap01 hot_chart01 span .com_pop_tit01 .custom_box_tit02 ===", $("span .com_pop_tit01 .custom_box_tit02"));
                    // console.log("=== grap_toggle_wrap grap_toggle_wrap01 hot_chart01 span hot_span ===", $("#hot_span"));
                    $("span .com_pop_tit01 .custom_box_tit02").hide();// 이번달 인기 많은 농작물 문구 히든 처리 
                    $("#hot_span").hide();// 이번달 인기 많은 농작물 문구 히든 처리
                    // console.log("=== grap_toggle_wrap grap_toggle_wrap01 $(this) css display ===", $(this).css("display"));
                })
            }


            if($('#hot_chartHolder01').length > 0) {
                // this.aucLatcnm = ""; // 값 초기화
                // console.log("=== grap_toggle_wrap grap_toggle_wrap01 hot_chart01 this.aucLatcnm  ===", this.aucLatcnm );
                // console.log("=== grap_toggle_wrap grap_toggle_wrap01 hot_chart01 this.actoKnnm ===", this.actoKnnm);

                if(this.actoKnnm == null || this.actoKnnm.length == 0){
                    // console.log("=== grap_toggle_wrap grap_toggle_wrap01 hot_chart01 span hot_span ===", $("#hot_span"));
                    $("span .com_pop_tit01 .custom_box_tit02").hide();// 이번달 인기 많은 농작물 문구 히든 처리 
                    $("#hot_span").hide();// 이번달 인기 많은 농작물 문구 히든 처리 
                }

                this.hot_data();
            }else{
                if(this.actoKnnm != null && this.actoKnnm.length !=0){
                    $(".grap_toggle_wrap.grap_toggle_wrap01").each(function(){
                        // console.log("=== hot_chart01 grap_toggle_wrap grap_toggle_wrap01 $(this) ===", $(this));
                        $(this).css("display", "block");
                        // console.log("=== grap_toggle_wrap grap_toggle_wrap01 $(this) css display ===", $(this).css("display"));
                    })
                }
            }

            if(this.actoKnnm == null || this.actoKnnm.length ==0){

                    // console.log("=== hot_chart01 $(.com_pop_tit01 .custom_box_tit02)) ===", $(".com_pop_tit01 .custom_box_tit02"));

                    $(".grap_toggle_wrap.grap_toggle_wrap01").each(function(){
                        // console.log("=== hot_chart01 grap_toggle_wrap grap_toggle_wrap01 $(this) ===", $(this));
                        $(this).css("display", "none");
                        console.log("=== grap_toggle_wrap grap_toggle_wrap01 $(this) css display ===", $(this).css("display"));
                    })

                    // console.log("=== grap_toggle_wrap grap_toggle_wrap01 hot_chart01 span hot_span ===", $("#hot_span"));
                    $("span .com_pop_tit01 .custom_box_tit02").hide();// 이번달 인기 많은 농작물 문구 히든 처리 
                    $("#hot_span").hide();// 이번달 인기 많은 농작물 문구 히든 처리 
                }

            // console.log("=== hot_chart01 $(.grap_toggle_wrap.grap_toggle_wrap01) ===", $(".grap_toggle_wrap.grap_toggle_wrap01"));
            // console.log("=== hot_chart01 this.aucLatcnm) ===", this.aucLatcnm);
        },
        hot_data(){

            // fncSlick_actoLatcChart();

            // ######################### 차트 시작1
            // 탭(간편)일지) > 등록한 작목의 당일 경락가 차트 (작은차트)
            let layoutStr01 =
            '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
                +'<Options>'
                    +'<Caption text=""/>'
                    +'<Legend useVisibleCheck="true"/>'
                +'</Options>'
                +'<NumberFormatter id="numfmt01" useThousandsSeparator="false"/>'
                +'<Combination2DChart showDataTips="false" gutterLeft="0" gutterRight="0" displayCompleteCallFunction="rMateFunction.removeTabindex">'
                    +'<horizontalAxis>'
                        +'<CategoryAxis categoryField="YearMonth01" padding="0"/>'
                    +'</horizontalAxis>'
                    +'<verticalAxis>'
                        +'<LinearAxis formatter="{numfmt01}"/>'
                    +'</verticalAxis>'
                    +'<series>'
                        +'<Area2DSeries yField="PrevYear01" displayName="전년도">'
                            +'<showDataEffect>'
                                +'<SeriesInterpolate/>'
                            +'</showDataEffect>'
                            /* 컬러값 변경 : 녹색선 + 오피시티 */
                            +'<areaStroke>'
                                +'<Stroke color="#fdbb68" weight="1"/>'
                            +'</areaStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#fdbb68" alpha="0.7"/>'
                            +'</areaFill>'
                        +'</Area2DSeries>'
                        +'<Area2DSeries yField="ThisYear01" displayName="금년도">'
                            +'<showDataEffect>'
                                +'<SeriesInterpolate/>'
                            +'</showDataEffect>'
                            /* 컬러값 변경 : 노랑선 + 오피시티 */
                            +'<areaStroke>'
                                +'<Stroke color="#23a0a5" weight="1"/>'
                            +'</areaStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#23a0a5" alpha="0.7"/>'
                            +'</areaFill>'
                        +'</Area2DSeries>'
                    +'</series>'
                    +'<backgroundElements>'                
                    +'</backgroundElements>'
                +'</Combination2DChart>'
            +'</rMateChart>';

            let chartData01 = [];
            // console.log("======= this.actoLatcChartCnt ======= ", this.actoLatcChartCnt); 
            // console.log("======= this.actoLatcChartList ======= ", this.actoLatcChartList); 
            
            let actoLatcChartCntTemp = 0;
            if(this.actoLatcChartCnt >= 6){
                actoLatcChartCntTemp = 6
            }else{
                actoLatcChartCntTemp = this.actoLatcChartCnt;
            }

            for(let i=0; i<actoLatcChartCntTemp; i++) {
                chartData01.push({"YearMonth01": this.actoLatcChartList[i].chartDt,"PrevYear01": this.actoLatcChartList[i].rcnDd7AucMveAvgam,"ThisYear01": this.actoLatcChartList[i].rcnMt1AucMveAvgam});
            }
            // console.log("======= chartData01 ======= ", chartData01);











            // -----------------------차트 설정 끝 -----------------------
            // ######################### 차트 종료1

            // ######################### 차트 시작2
            // 탭(간편)일지) > 등록한 작목의 당일 경락가 차트 (작은차트), 탭(경락가격) > 경락가 추이 그래프
            let prevAverage01 = 0; // 전년도 평균 20000원
            if(this.actoLatcChartList.length !=0){  
                for (let i=0; i<this.actoLatcChartList.length;i++){
                    if(this.actoLatcChartList[i].dtDiv == '전년6개월'){
                        this.yerAvg = this.actoLatcChartList[i].yerAvg;
                        prevAverage01 = this.actoLatcChartList[i].yerAvg;
                    }
                }
            }else{
                prevAverage01 = 0;
            }

            prevAverage01 = this.yerAvg;
            // console.log("======= this.actoLatcChartList ======= ", this.actoLatcChartList);
            // console.log("======= prevAverage01 ======= ", prevAverage01);

            let layoutStr02 =
            '<rMateChart backgroundColor="#ffffff" borderStyle="none">'
                +'<Options>'
                    +'<Caption text=""/>'
                    +'<SubCaption text="" textAlign="right" />'
                    +'<Legend useVisibleCheck="true"/>'
                +'</Options>'
                +'<NumberFormatter id="numfmt02" useThousandsSeparator="false"/>'
                +'<Combination2DChart showDataTips="false" gutterLeft="0" gutterRight="0" displayCompleteCallFunction="rMateFunction.removeTabindex">'
                    +'<horizontalAxis>'
                        +'<CategoryAxis categoryField="YearMonth02" padding="0.5"/>'
                    +'</horizontalAxis>'
                    +'<verticalAxis>'
                        +'<LinearAxis formatter="{numfmt02}"/>'
                    +'</verticalAxis>'
                    +'<series>'
                        +'<Area2DSeries yField="PrevYear02" displayName="전년도">'
                            +'<showDataEffect>'
                                +'<SeriesInterpolate/>'
                            +'</showDataEffect>'
                            /* 컬러값 변경 : 녹색선 + 오피시티 */
                            +'<areaStroke>'
                                +'<Stroke color="#fdbb68" weight="1"/>'
                            +'</areaStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#fdbb68" alpha="0.7"/>'
                            +'</areaFill>'
                        +'</Area2DSeries>'
                        +'<Area2DSeries yField="ThisYear02" displayName="금년도">'
                            +'<showDataEffect>'
                                +'<SeriesInterpolate/>'
                            +'</showDataEffect>'
                            /* 컬러값 변경 : 노랑선 + 오피시티 */
                            +'<areaStroke>'
                                +'<Stroke color="#23a0a5" weight="1"/>'
                            +'</areaStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#23a0a5" alpha="0.7"/>'
                            +'</areaFill>'
                        +'</Area2DSeries>'
                    +'</series>'
                    +'<backgroundElements>'
                        //+'<GridLines/>'
                        +'<AxisMarker>'
                            +'<lines>'
                                +'<AxisLine value="'+prevAverage01+'" lineStyle="dashLine" label="">'
                                    +'<stroke>'
                                        +'<Stroke color="#ced0d9" weight="1"/>'
                                    +'</stroke>'
                                +'</AxisLine>'                  
                            +'</lines>'  
                        +'</AxisMarker>'
                    +'</backgroundElements>'				
                    +'</Combination2DChart>'
            +'</rMateChart>';

            // 차트 데이터
            // let chartData02 = [
            //     {"YearMonth02":"21.12","PrevYear02":16000,"ThisYear02":15000},
            //     {"YearMonth02":"22.01","PrevYear02":24000,"ThisYear02":26000},
            //     {"YearMonth02":"22.02","PrevYear02":21000,"ThisYear02":22000},
            //     {"YearMonth02":"22.03","PrevYear02":15000,"ThisYear02":17000},
            //     {"YearMonth02":"22.04","PrevYear02":21000,"ThisYear02":19000},
            //     {"YearMonth02":"22.05","PrevYear02":24000,"ThisYear02":26000},
            //     {"YearMonth02":"22.06","PrevYear02":21000,"ThisYear02":23000},
            //     {"YearMonth02":"22.07","PrevYear02":19000,"ThisYear02":18000}
            // ];


            let chartData02 = [];
            // console.log("======= this.actoLatcChartCnt ======= ", this.actoLatcChartCnt); 
            // console.log("======= this.actoLatcChartList ======= ", this.actoLatcChartList); 

            for(let i=0; i<actoLatcChartCntTemp; i++) {
                chartData02.push({"YearMonth02": this.actoLatcChartList[i].chartDt,"PrevYear02": this.actoLatcChartList[i].rcnDd7AucMveAvgam,"ThisYear02": this.actoLatcChartList[i].rcnMt1AucMveAvgam});
            }
            // console.log("======= chartData02 ======= ", chartData02); 








            let actoLatcChartTemp01 = [];//금년도
            let actoLatcChartTemp02 = [];//전년도
            let actoLatcChartTemp03 = [];//전년도
            let basyymmTemp = "";
            let basmmddTemp = "";
            let actoKnnmTemp = "";
            // let PrevYearCnt = 0;
            // console.log("======= JSON.stringify this.actoLatcChartList ======= ", JSON.stringify(this.actoLatcChartList)); 
            // console.log("======= (this.actoLatcChartList[0].basDt).substring(0, 4) ======= ", (this.actoLatcChartList[0].basDt).substring(0, 4)); 

            for(let i=0; i<this.actoLatcChartList.length; i++) {
                actoKnnmTemp = this.actoLatcChartList[0].actoKnnm;
                basyymmTemp = (this.actoLatcChartList[0].basDt).substring(0, 4);
                let basyymm = (this.actoLatcChartList[i].basDt).substring(0, 4);

                // console.log("======= basyymmTemp ======= ", basyymmTemp); 
                // console.log("======= basyymm ======= ", basyymm); 
                
                if(basyymm == basyymmTemp && i<6 ){
                    actoLatcChartTemp01.push({"basDt": this.actoLatcChartList[i].basDt, "YearMonth02": this.actoLatcChartList[i].chartDt,"ThisYear02":this.actoLatcChartList[i].rcnMt1AucMveAvgam});
                }else if(actoKnnmTemp == this.actoLatcChartList[i].actoKnnm){
                    actoLatcChartTemp02.push({"basDt": this.actoLatcChartList[i].basDt, "YearMonth02": this.actoLatcChartList[i].chartDt,"PrevYear02":this.actoLatcChartList[i].rcnMt1AucMveAvgam});
                }
            }  

            // console.log("======= actoLatcChartTemp01 000 ======= ", actoLatcChartTemp01);
            // console.log("======= actoLatcChartTemp02 000 ======= ", actoLatcChartTemp02);
            
            for(let i=0; i<actoLatcChartTemp01.length; i++) {

                // console.log("======= actoLatcChartTemp01[i] 000======= ", actoLatcChartTemp01[i]);
                // console.log("======= actoLatcChartTemp01[i].basDt 000 ======= ", actoLatcChartTemp01[i].basDt);

                basmmddTemp = (actoLatcChartTemp01[i].basDt).substring(4, 6);

                // console.log("======= basmmddTemp 000 ======= ", basmmddTemp);
                // console.log("======= basyymmTemp ======= ", basyymmTemp);
                let basmmdd = "";
                let ynflas = false;
                for(let j=0; j<actoLatcChartTemp02.length; j++) {
                    basmmdd = (actoLatcChartTemp02[j].basDt).substring(4, 6);
                    // console.log("======= basmmddTemp ======= ", basmmddTemp);
                    // console.log("======= basmmdd ======= ", basmmdd);  
                    if(basmmdd == basmmddTemp){
                        actoLatcChartTemp03.push({"YearMonth02": actoLatcChartTemp01[i].YearMonth02,"PrevYear02":actoLatcChartTemp02[j].PrevYear02, "ThisYear02":actoLatcChartTemp01[i].ThisYear02});
                        ynflas = true;
                    }
                }

                if(!ynflas){
                    actoLatcChartTemp03.push({"YearMonth02": actoLatcChartTemp01[i].YearMonth02,"PrevYear02":0, "ThisYear02":actoLatcChartTemp01[i].ThisYear02});
                }

                // console.log("======= actoLatcChartTemp03 000 ======= ", actoLatcChartTemp03);
            }    

            // console.log("======= actoLatcChartTemp01 ======= ", actoLatcChartTemp01);
            // console.log("======= actoLatcChartTemp02 ======= ", actoLatcChartTemp02);
            // console.log("======= actoLatcChartTemp03 ======= ", actoLatcChartTemp03);

            chartData02 = [];
            let arrCnt = 6;
            arrCnt = actoLatcChartTemp03.length < 6 ? actoLatcChartTemp03.length : arrCnt;
            for(let i=0; i<arrCnt; i++) {
                chartData02.push(actoLatcChartTemp03[i]);
            }

            this.chartDataActo01 = chartData02;
            // console.log("======= chartData02 ======= ", chartData02);








            chartData01 = [];
            for(let i=0; i<chartData02.length; i++) {
                chartData01.push({"YearMonth01": chartData02[i].YearMonth02,"PrevYear01": chartData02[i].PrevYear02,"ThisYear01": chartData02[i].ThisYear02});
            }

            // chartData01 = this.chartDataActo01;
            // chartData02 = this.chartDataActo01;
            // chartData01 = chartData02;
            // chartData02 = chartData02;
            // console.log("======= 차트 생성 전 chartData01 ======= ", chartData01); 
            // console.log("======= 차트 생성 전 chartData02 ======= ", chartData02);



            // console.log("======= chartData02 JSON.stringify ======= ", JSON.stringify(chartData02)); 

            // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
            //
            // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
            // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
            // 
            // 아래 내용은 
            // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
            // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.

            $(".grap_toggle_wrap .grap_toggle_wrap01").each(function(){
                // console.log("=== grap_toggle_wrap grap_toggle_wrap01 $(this) style ===", $(this));
                $(this).css("display", "block");
                // console.log("=== grap_toggle_wrap grap_toggle_wrap01 $(this) css display ===", $(this).css("display"));
            })

            this.$nextTick(() => {

                fncSlick_actoLatcChart('fncSlick_CallBack');
                rMateChartH5.create("hot_chart01", "hot_chartHolder01", "useContextMenu=false", "100%", "100%");// 차트 1
                rMateChartH5.call("hot_chart01", "setLayout", layoutStr01);
                rMateChartH5.call("hot_chart01", "setData", chartData01);
                rMateChartH5.registerTheme(rMateChartH5.themes);
                rMateChartH5.create("hot_chart02", "hot_chartHolder02", "useContextMenu=false", "100%", "100%");// 차트 2
                rMateChartH5.call("hot_chart02", "setLayout", layoutStr02);
                rMateChartH5.call("hot_chart02", "setData", chartData02);
                // console.log("======= chartData02 nextTick 테스트 ======="); 
                rMateChartH5.registerTheme(rMateChartH5.themes);

            })


            // -----------------------차트 설정 끝 -----------------------
            // ######################### 차트 종료2

        },
        chart_data(idx, list1, list2){
            // 인기 차트 삭제(다른 좋은 방법 있으면 적용 필요!!!)
            $("#hot_chart01").remove();
            $("#hot_chart02").remove();

            this.culplAreaUntC = 'actoLatcChartList';

            this.actoLatcChartTempList = list1;

            // ######################### 차트 시작3
             // 탭(간편)일지) > 등록한 작목의 당일 경락가 차트 (작은차트)
            let layoutStr03 =
            '<rMateChart backgroundColor="#ffffff" borderStyle="none" id="rMateChart01_'+idx+'">'
                +'<Options>'
                    +'<Caption text=""/>'
                    +'<Legend useVisibleCheck="true"/>'
                +'</Options>'
                +'<NumberFormatter id="numfmt03" useThousandsSeparator="false"/>'
                +'<Combination2DChart showDataTips="false" gutterLeft="0" gutterRight="0" displayCompleteCallFunction="rMateFunction.removeTabindex">'
                    +'<horizontalAxis>'
                        +'<CategoryAxis categoryField="YearMonth03" padding="0"/>'
                    +'</horizontalAxis>'
                    +'<verticalAxis>'
                        +'<LinearAxis formatter="{numfmt03}"/>'
                    +'</verticalAxis>'
                    +'<series>'
                        +'<Area2DSeries yField="PrevYear03" displayName="전년도">'
                            +'<showDataEffect>'
                                +'<SeriesInterpolate/>'
                            +'</showDataEffect>'
                            /* 컬러값 변경 : 녹색선 + 오피시티 */
                            +'<areaStroke>'
                                +'<Stroke color="#fdbb68" weight="1"/>'
                            +'</areaStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#fdbb68" alpha="0.7"/>'
                            +'</areaFill>'
                        +'</Area2DSeries>'
                        +'<Area2DSeries yField="ThisYear03" displayName="금년도">'
                            +'<showDataEffect>'
                                +'<SeriesInterpolate/>'
                            +'</showDataEffect>'
                            /* 컬러값 변경 : 노랑선 + 오피시티 */
                            +'<areaStroke>'
                                +'<Stroke color="#23a0a5" weight="1"/>'
                            +'</areaStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#23a0a5" alpha="0.7"/>'
                            +'</areaFill>'
                        +'</Area2DSeries>'
                    +'</series>'
                    +'<backgroundElements>'
                    +'</backgroundElements>'
                +'</Combination2DChart>'
            +'</rMateChart>';

            let chartData03 = [];
            // console.log("======= list2 ======= ", list2); 
            // for(let i=0; i<list2.length; i++) {
            let list2Cnt = list2.length
            if(list2.length >= 6){
                list2Cnt = 6
            }
            for(let i=0; i<list2Cnt; i++) {
                chartData03.push({"YearMonth03": list2[i].chartDt,"PrevYear03": list2[i].rcnDd7AucMveAvgam,"ThisYear03": list2[i].rcnMt1AucMveAvgam});
            }
            // console.log("======= this.chartData03 ======= ", chartData03); 











            let chartData04 = [];

            let actoLatcChartTemp01 = [];//금년도
            let actoLatcChartTemp02 = [];//전년도
            let actoLatcChartTemp03 = [];//전년도
            let basyymmTemp = "";
            let basmmddTemp = "";
            let actoKnnmTemp = "";
            // let PrevYearCnt = 0;
            // console.log("======= JSON.stringify list2 ======= ", JSON.stringify(list2)); 
            // console.log("======= (list2[0].basDt).substring(0, 4) ======= ", (list2[0].basDt).substring(0, 4)); 

            for(let i=0; i<list2.length; i++) {
                actoKnnmTemp = list2[0].actoKnnm;
                basyymmTemp = (list2[0].basDt).substring(0, 4);
                let basyymm = (list2[i].basDt).substring(0, 4);

                // console.log("======= basyymmTemp ======= ", basyymmTemp); 
                // console.log("======= basyymm ======= ", basyymm);

                // console.log("======= basyymmTemp ======= ", basyymmTemp); 
                // console.log("======= list2[i].actoKnnm ======= ", list2[i].actoKnnm);
                
                if(basyymm == basyymmTemp && i<6 ){
                    actoLatcChartTemp01.push({"basDt": list2[i].basDt, "YearMonth04": list2[i].chartDt,"ThisYear04":list2[i].rcnMt1AucMveAvgam});
                }else if(actoKnnmTemp == list2[i].actoKnnm){
                    actoLatcChartTemp02.push({"basDt": list2[i].basDt, "YearMonth04": list2[i].chartDt,"PrevYear04":list2[i].rcnMt1AucMveAvgam});
                }
            }  

            // console.log("======= actoLatcChartTemp01 111 ======= ", actoLatcChartTemp01);
            // console.log("======= actoLatcChartTemp02 111 ======= ", actoLatcChartTemp02);
            
            for(let i=0; i<actoLatcChartTemp01.length; i++) {

                // console.log("======= actoLatcChartTemp01[i] 000======= ", actoLatcChartTemp01[i]);
                // console.log("======= actoLatcChartTemp01[i].basDt 000 ======= ", actoLatcChartTemp01[i].basDt);

                basmmddTemp = (actoLatcChartTemp01[i].basDt).substring(4, 6);

                // console.log("======= basmmddTemp 000 ======= ", basmmddTemp);
                // console.log("======= basyymmTemp ======= ", basyymmTemp);
                let basmmdd = "";
                let ynflas = false;
                for(let j=0; j<actoLatcChartTemp02.length; j++) {
                    basmmdd = (actoLatcChartTemp02[j].basDt).substring(4, 6);
                    // console.log("======= basmmddTemp ======= ", basmmddTemp);
                    // console.log("======= basmmdd ======= ", basmmdd);  
                    if(basmmdd == basmmddTemp){
                        actoLatcChartTemp03.push({"YearMonth04": actoLatcChartTemp01[i].YearMonth04,"PrevYear04":actoLatcChartTemp02[j].PrevYear04, "ThisYear04":actoLatcChartTemp01[i].ThisYear04});
                        ynflas = true;
                    }
                }

                if(!ynflas){
                    actoLatcChartTemp03.push({"YearMonth04": actoLatcChartTemp01[i].YearMonth04,"PrevYear04":0, "ThisYear04":actoLatcChartTemp01[i].ThisYear04});
                }

                // console.log("======= actoLatcChartTemp03 000 ======= ", actoLatcChartTemp03);
            }    

            // console.log("======= actoLatcChartTemp01 ======= ", actoLatcChartTemp01);
            // console.log("======= actoLatcChartTemp02 ======= ", actoLatcChartTemp02);
            // console.log("======= actoLatcChartTemp03 ======= ", actoLatcChartTemp03);

            chartData04 = [];
            let arrCnt = 6;
            arrCnt = actoLatcChartTemp03.length < 6 ? actoLatcChartTemp03.length : arrCnt;
            for(let i=0; i<arrCnt; i++) {
                chartData04.push(actoLatcChartTemp03[i]);
            }
            this.chartDataActo02 = chartData04;
            // console.log("======= chartData04 ======= ", chartData04);










            // console.log("======= this.chartData03 JSON.stringify ======= ", JSON.stringify(chartData03)); 
            // -----------------------차트 설정 끝 -----------------------
            // ######################### 차트 종료3 #########################



            // ######################### 차트 시작4 #########################
            // 탭(간편)일지) > 등록한 작목의 당일 경락가 차트 (작은차트), 탭(경락가격) > 경락가 추이 그래프
            // let prevAverage02 = 14834; // 전년도 평균 14834원
            // console.log("======= list2 ======= ", list2);
            // console.log("======= list2.length ======= ", list2.length);
            // console.log("======= JSON.stringify list2======= ", JSON.stringify(list2)); 
            let prevAverage02 = 0;
            if(list2.length != 0){  
                // prevAverage02 = list2[0].yerAvg; // 전년도 평균 14834원
                for (let i=0; i<list2.length;i++){
                    if(list2[i].dtDiv == '전년6개월'){
                        this.yerAvg = list2[i].yerAvg;
                        prevAverage02  = list2[i].yerAvg;
                    }
                }
            }else{
                prevAverage02 = 0;
            }

            // prevAverage02 = this.yerAvg;

            // console.log("======= list2 ======= ", list2);
            // console.log("======= prevAverage02 ======= ", prevAverage02);

            let layoutStr04 =
            '<rMateChart backgroundColor="#ffffff" borderStyle="none" id="rMateChart02_'+idx+'">'
                +'<Options>'
                    +'<Caption text=""/>'
                    +'<SubCaption text="" textAlign="right" />'
                    +'<Legend useVisibleCheck="true"/>'
                +'</Options>'
                +'<NumberFormatter id="numfmt04" useThousandsSeparator="false"/>'
                +'<Combination2DChart showDataTips="false" gutterLeft="0" gutterRight="0">'
                    +'<horizontalAxis>'
                        +'<CategoryAxis categoryField="YearMonth04" padding="0.3" />'
                    +'</horizontalAxis>'
                    +'<verticalAxis>'
                        +'<LinearAxis formatter="{numfmt04}"/>'
                    +'</verticalAxis>'
                    +'<series>'
                        +'<Area2DSeries yField="PrevYear04" displayName="전년도">'
                            +'<showDataEffect>'
                                +'<SeriesInterpolate/>'
                            +'</showDataEffect>'
                            /* 컬러값 변경 : 녹색선 + 오피시티 */
                            +'<areaStroke>'
                                +'<Stroke color="#fdbb68" weight="1"/>'
                            +'</areaStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#fdbb68" alpha="0.7"/>'
                            +'</areaFill>'
                        +'</Area2DSeries>'
                        +'<Area2DSeries yField="ThisYear04" displayName="금년도">'
                            +'<showDataEffect>'
                                +'<SeriesInterpolate/>'
                            +'</showDataEffect>'
                            /* 컬러값 변경 : 노랑선 + 오피시티 */
                            +'<areaStroke>'
                                +'<Stroke color="#23a0a5" weight="1"/>'
                            +'</areaStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#23a0a5" alpha="0.7"/>'
                            +'</areaFill>'
                        +'</Area2DSeries>'
                    +'</series>'
                    +'<backgroundElements>'
                        //+'<GridLines/>'
                        +'<AxisMarker>'
                            +'<lines>'
                                +'<AxisLine value="'+prevAverage02+'" lineStyle="dashLine" label="">'
                                    +'<stroke>'
                                        +'<Stroke color="#ced0d9" weight="1"/>'
                                    +'</stroke>'
                                +'</AxisLine>'                  
                            +'</lines>'  
                        +'</AxisMarker>'
                    +'</backgroundElements>'				
                    +'</Combination2DChart>'
            +'</rMateChart>';

            // let chartData04 = [];
            // console.log("======= this.actoLatcChartCnt ======= ", this.actoLatcChartCnt); 
            // console.log("======= list2 ======= ", list2); 
            
            // for(let i=0; i<list2Cnt; i++) {
            //     chartData04.push({"YearMonth04": list2[i].chartDt,"PrevYear04": list2[i].rcnDd7AucMveAvgam,"ThisYear04": list2[i].rcnMt1AucMveAvgam});
            // }
            // console.log("======= this.chartData04 전년도 평균 prevAverage02======= ", prevAverage02); 
            // console.log("======= this.chartData04 ======= ", chartData04); 
            // console.log("======= this.chartData04 JSON.stringify ======= ", JSON.stringify(chartData04)); 






















            chartData03 = [];
            for(let i=0; i<chartData04.length; i++) {
                chartData03.push({"YearMonth03": chartData04[i].YearMonth04,"PrevYear03": chartData04[i].PrevYear04,"ThisYear03": chartData04[i].ThisYear04});
            }

            // chartData03 = this.chartDataActo02;
            // chartData04 = this.chartDataActo02;
            // chartData03 = chartData04;
            // chartData04 = chartData04;
            // console.log("======= 차트 생성 전 chartData03 ======= ", chartData03); 
            // console.log("======= 차트 생성 전 chartData04 ======= ", chartData04); 





            $(".grap_toggle_wrap .grap_toggle_wrap01").each(function(){
                // console.log("=== grap_toggle_wrap grap_toggle_wrap01 $(this) style ===", $(this));
                $(this).css("display", "block");
                // console.log("=== grap_toggle_wrap grap_toggle_wrap01 $(this) css display ===", $(this).css("display"));
            })
            
            // slick 호출
            this.$nextTick(() => {

                fncSlick_actoLatcChart('fncSlick_CallBack');
                rMateChartH5.create("char01_"+idx, "chartHolder01_"+idx, "useContextMenu=false", "100%", "100%");// 차트 2
                rMateChartH5.call("char01_"+idx, "setLayout", layoutStr03);
                rMateChartH5.call("char01_"+idx, "setData", chartData03);
                rMateChartH5.create("char02_"+idx, "chartHolder02_"+idx, "useContextMenu=false", "100%", "100%");// 차트 2
                rMateChartH5.call("char02_"+idx, "setLayout", layoutStr04);
                rMateChartH5.call("char02_"+idx, "setData", chartData04);
                console.log("======= chart_data nextTick fncSlick_actoLatcChart ======= "); 

            })

            rMateChartH5.registerTheme(rMateChartH5.themes);            
        },
        // [작목재배지관리] 화면으로 이동
        fn_openPopupSZST2102() {

            let component;
            component = SZST2102;     //작목/재배지 관리
            const config = {
                component: component,
            }
            modalService.openPopup(config).then(() => {
            })

        }, 
        // fn_hotActoList
        fn_hotActoList() {
            // console.log("======= fn_hotActoList =======");
            this.culplAreaUntC = "hotList";
            $("#gyeong_chk").trigger("click");
            this.getHotActoLatcList();
            // this.getActoLatcChartList();
        },
        // 이번달 인기 많은 농작물
        getHotActoLatcList() {
            const config = {
                url : "/sz/fr/01ra2", // PFMSZFR01RA2
                data : {
                    naWrsLclc 	: "hot",
                }
            }

            // console.log(" /sz/fr/01ra2 config >> ", config);
            apiService.call(config).then(response => {
                // console.log(" /sz/fr/01ra2 결과 확인 >> ", response);
                this.hotAucLatcnm = response.hotActoLatcList[0].aucLatcnm;
                this.actoKnnm = response.hotActoLatcList[0].actoKnnm;
                // console.log(" /sz/fr/01ra2 결과 확인 this.hotAucLatcnm  >> ", this.hotAucLatcnm );
                // console.log(" /sz/fr/01ra2 결과 확인 this.actoKnnm  >> ", this.actoKnnm );

                this.hotActoLatcCnt = response.hotActoLatcCnt;
                this.hotActoLatcList = response.hotActoLatcList || [];
                // console.log(" /sz/fr/01ra2 결과 확인 this.hotActoLatcList >> ", this.hotActoLatcList);

                // 이번달 인기 차트 데이터 추출
                this.getHotChartList(this.hotAucLatcnm, this.actoKnnm);

            })

        },
        // 품목 버튼에 표시된 품종 리스트
        getActoKnnmList(v1, event, chkNm){


            $(".grap_toggle_wrap.grap_toggle_wrap01").each(function(){
                // console.log("=== hot_chart01 grap_toggle_wrap grap_toggle_wrap01 $(this) ===", $(this));
                $(this).css("display", "block");
                // console.log("=== grap_toggle_wrap grap_toggle_wrap01 $(this) css display ===", $(this).css("display"));
            })

            let buttonClass = $(event.target.closest('button')).attr("class");
            $(event.target.closest('li')).prevUntil().each(function(){
                $(this).find("button").attr("class", "");
            })

            $(event.target.closest('li')).nextAll().each(function(){
                $(this).find("button").attr("class", "");
            })

            if(buttonClass == "on"){
                $(event.target.closest('button')).attr("class", "");
            }else{
                $(event.target.closest('button')).attr("class", "on");
            }

            if(chkNm === 'groupBtn01') {
                $("button[name=groupBtn02]").attr("class", "")
                $("button[name=groupBtn03]").attr("class", "")
            } else if(chkNm === 'groupBtn02') {
                $("button[name=groupBtn01]").attr("class", "")
                $("button[name=groupBtn03]").attr("class", "")
            } else if(chkNm === 'groupBtn03') {
                $("button[name=groupBtn01]").attr("class", "")
                $("button[name=groupBtn02]").attr("class", "")
            }
        
            const config = {
                url : "/sz/fr/01ra2", // PFMSZFR01RA2
                data : {
                    aucLatcnm 	: v1,
                    basDt       : this.nowDt, // 오늘 일짜
                }
            }

            // 버튼 숨김
            $("#tooltip01").hide();
            $("#tooltip02").hide();
            $("#tooltip03").hide();

            // console.log(" /sz/fr/01ra2 config >> ", config);
            apiService.call(config).then(response => {

                // console.log(" /sz/fr/01ra2 결과 확인 >> ", response);
                this.actoKnnmListArr = response.hotActoLatcList || [];
                // console.log(" /sz/fr/01ra2 결과 확인 this.actoKnnmListArr  >> ", this.actoKnnmListArr)

                // 경락 차트 데이터 조회
                this.getActoLatcChartList(v1);

            })

        },
        // 초기 목록 조회
        getActoLatcChartListInit() {
            this.culplAreaUntC = 'actoLatcChartList';
            const config = {
                url : "/sz/fr/01ra3", // PFMSZFR01RA3
                data : {
                    // aucLatcnm 	: this.aucLatcnm,   // 품목
                    // aucLatcnm 	: 'this.hotAucLatcnm',   // 품목
                    aucLatcnm 	: '',   // 품목
                    actoKnnm 	: '',    // 품종
                    basDt       : this.nowDt, // 오늘 일짜
                }
            }

            console.log(" === /sz/fr/01ra3 config === >> ", config);
            apiService.call(config).then(response => {
                // console.log(" /sz/fr/01ra3 결과 확인 >> ", response);
                this.actoLatcChartCnt = response.actoLatcChartCnt ;
                this.actoLatcChartList = response.actoLatcChartList ;
                // console.log(" /sz/fr/01ra3 결과 확인 this.culplAreaUntC >> ", this.culplAreaUntC);


            })
        },
        // 이번달 인기많은 농작물 차트 데이터 조회
        getHotChartList(v0, v1) {
            // this.culplAreaUntC = 'actoLatcChartList';
            // console.log(" === /sz/fr/01ra3 v1 === >> ", v0);
            this.aucLatcnm = v0;
            this.actoKnnm = v1;
            const config = {
                url : "/sz/fr/01ra3", // PFMSZFR01RA3
                data : {
                    aucLatcnm 	: v0,   // 품목
                    actoKnnm 	: v1,    // 품종
                    basDt       : this.nowDt, // 오늘 일짜
                }
            }

            // console.log(" === /sz/fr/01ra3 config === >> ", config);
            apiService.call(config).then(response => {


                //  this.getbuttonDivList();      
                // console.log(" /sz/fr/01ra3 결과 확인 >> ", response);

                this.actoLatcChartCnt = response.actoLatcChartCnt ;
                this.actoLatcChartList = response.actoLatcChartList ;

                // if(this.actoLatcChartList != null){
                //     this.hotYerAvg = this.actoLatcChartList[0].yerAvg;// 인기 연평균
                // }

                for (let i=0; i<this.actoLatcChartList.length;i++){

                    if(this.actoLatcChartList[i].dtDiv == '전년6개월'){
                        this.hotYerAvg = this.actoLatcChartList[i].yerAvg;
                    }else{
                    this.yerAvg = 0; 
                    }
                }

                // console.log(" ======= /sz/fr/01ra3 결과 확인 >> this.actoLatcChartList =======", this.actoLatcChartList);
                // console.log(" ======= /sz/fr/01ra3 결과 확인 >> this.hotYerAvg =======", this.hotYerAvg);

                this.getbuttonDivList();

            })
        },
        // 경락 차트 데이터 조회
        getActoLatcChartList(v0) {
        
            this.culplAreaUntC = 'actoLatcChartList';
            // console.log(" === /sz/fr/01ra3 v1 === >> ", v0);
            this.aucLatcnm = v0;
            const config = {
                url : "/sz/fr/01ra3", // PFMSZFR01RA3
                data : {
                    aucLatcnm 	: v0,   // 품목
                    actoKnnm 	: '',    // 품종
                    basDt       : this.nowDt, // 오늘 일짜
                }
            }

            // console.log(" === /sz/fr/01ra3 config === >> ", config);
            apiService.call(config).then(response => {

                // console.log(" /sz/fr/01ra3 결과 확인 >> ", response);
                this.actoLatcChartCnt = response.actoLatcChartCnt ;
                this.actoLatcChartList = response.actoLatcChartList ;
                
                // 품종 this.actoKnnmListArr 생성
                // console.log(" /sz/fr/01ra3 결과 확인 품종  this.actoKnnmListArr  >> ",  this.actoKnnmListArr);
                let actoKnnmToChartList = [];
                let v1 = "";
                let v2 = "";

                // eslint-disable-next-line no-unused-vars
                let actoLatcChartListTemp = this.actoLatcChartList || [];
                // 품종별 그래프 호출
                for (let i=0; i<this.actoKnnmListArr.length;i++){
                    v1 = this.actoKnnmListArr[i].actoKnnm;
                    let listCnt = 0
                    if(this.actoLatcChartList != null){
                        listCnt = this.actoLatcChartList.length;
                    }  
                    let subListCnt = 0;
                    let yerAvg = 0;
                    //  console.log(" =======### this.actoLatcChartList ###======= >> ", this.actoLatcChartList);
                    for(let j=0; j<listCnt; j++) {
                        v2 = this.actoLatcChartList[j].actoKnnm
                        if(v1 == v2){
                            actoKnnmToChartList[subListCnt] = this.actoLatcChartList[j];
                            // console.log(" ======= this.actoLatcChartList[j].dtDiv ======= >> ", this.actoLatcChartList[j].dtDiv);
                            if(this.actoLatcChartList[j].dtDiv == '전년6개월'){
                                yerAvg = this.actoLatcChartList[j].yerAvg;
                                // console.log(" ======= this.actoLatcChartList[j].dtDiv ======= >> ", this.actoLatcChartList[j].dtDiv);
                                // console.log(" ======= yerAvg ======= >> ", yerAvg);
                            }else{
                               yerAvg = 0; 
                            }
                            subListCnt++;
                        }
                    }
                    this.refKey += 1
                    this.actoKnnmListArr[i].yerAvg = yerAvg;// 잘 추가 됨!!!
                    // console.log(" =====================  /sz/fr/01ra3 결과 확인 품종 yerAvg  >> =====================", yerAvg);
                    // console.log(" /sz/fr/01ra3 결과 확인 품종 this.actoKnnmListArr[i]  >> ", this.actoKnnmListArr[i]);
                    this.chart_data(i, this.actoKnnmListArr, actoKnnmToChartList);

                }

                $("#button_a1").attr('class', '');
                $("#button_a2").attr('class', '');
                $("#button_a3").attr('class', '');

            })

        },
        // 경매 작목 버튼 목록 조회
        getbuttonDivList() {
            const config = {
                url : "/sz/fr/01ra4", // PFMSZFR01RA4
                data : {
                    // aucLatcnm 	: this.hotAucLatcnm,
                    // actoKnnm 	: this.actoKnnm,
                    basDt       : this.nowDt, // 오늘 일짜
                }
            }

            // console.log(" /sz/fr/01ra4 config >> ", config);
            apiService.call(config).then(response => {
                // console.log(" /sz/fr/01ra4 결과 확인 >> ", response);

                this.buttonDivCnt = response.buttonDivCnt ;
                this.buttonDivList = response.buttonDivList ;
                this.refKey += 1
                this.culplAreaUntC==='hotList';	
                this.hot_chart01(); //kimhc_20221012 여기에서만 가능하다 
            })

        },
        // slick Callback
		slickCallBack (e, curIdx) {
            e.stopImmediatePropagation();
            console.log("=== slickCallBack e ===", e);
            console.log("=== slickCallBack curIdx ===", curIdx);
        }, 
        tab_buttonClick(tagrget) {// 

            this.actoKnnm = "";// 반드시 초기화!!!
            // $(".com_pop_tit01 .custom_box_tit02").hide();// 이번달 인기 많은 농작물 문구 히든 처리 

            // 경매 작목 버튼 목록 조회
            this.getbuttonDivList();

            // console.log("=== slickCallBack tab_buttonClick 실행!!! ===");
            // var btn = $(".custom_box_choice_option button[type='button']");
            // var con = $(".custom_box .tab_tooltip_wrap02 .tab_tooltip");
            // console.log("=== tab_buttonClick btn 실행!!! ===", btn);
            // console.log("=== tab_buttonClick con 실행!!! ===", con);
            // console.log("=== tab_buttonClick tagrget 실행!!! ===", tagrget);
            // console.log("=== slickCallBack tab_buttonClick 실행!!! ===", $("#"+tagrget));

            if('tooltip03' === tagrget){

                $("#tooltip03").show();
                $("#tooltip02").hide();
                $("#tooltip01").hide();

                $("#"+tagrget).attr('class', 'tab_tooltip con03');
                $("#tooltip02").attr('class', 'tab_tooltip hide con02');
                $("#tooltip01").attr('class', 'tab_tooltip hide con01');

                $("#button_a3").attr('class', 'active');
                $("#button_a2").attr('class', '');
                $("#button_a1").attr('class', '');
            }else if('tooltip02' === tagrget){

                $("#tooltip02").show();
                $("#tooltip03").hide();
                $("#tooltip01").hide();

                $("#"+tagrget).attr('class', 'tab_tooltip con02');
                $("#tooltip03").attr('class', 'tab_tooltip hide con03');
                $("#tooltip01").attr('class', 'tab_tooltip hide con01');
                $("#button_a2").attr('class', 'active');
                $("#button_a3").attr('class', '');
                $("#button_a1").attr('class', '');
            }else if('tooltip01' === tagrget){

                $("#tooltip01").show();
                $("#tooltip02").hide();
                $("#tooltip03").hide();

                $("#"+tagrget).attr('class', 'tab_tooltip con01');
                $("#tooltip03").attr('class', 'tab_tooltip hide con03');
                $("#tooltip02").attr('class', 'tab_tooltip hide con02');
                $("#button_a1").attr('class', 'active');
                $("#button_a3").attr('class', '');
                $("#button_a2").attr('class', '');
                
            }

        },
        //1000단위마다 금액 쉼표처리
        numberFormat(number){
            if(number != null){
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }else{
                 return 0
            }
        }, 
        fncSlick_CallBack(e, curIdx) {
            e.stopImmediatePropagation();
            console.log("=== slickCallBack e ===", e);
            console.log("=== slickCallBack curIdx ===", curIdx);
        },                 
        fnMove(seq) {// 스크롤 애니메이션
            // let offset = $('#div' + seq).offset();
            // $('#content').animate({ scrollTop: offset.top }, 300); // 여기서 오류 뜸!!!
            console.log(seq);
        }
     }, 
    
     components : {
        Page,
        FootersV2,
        //AnCategory,
        //AnSubCategory,
        AnSubCategoryV4,
        CmmCalendarV2  //영농캘린더 달력사항 추가(2021.06.24)  
    }
}
</script>

