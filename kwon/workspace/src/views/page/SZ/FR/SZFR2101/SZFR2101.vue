<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농일지 > 메인
* @ 페이지설명 : 영농일지 메인
* @ 파일명     : src/views/page/SZ/FR/SZFR2101/SZFR2101.vue
* @ 작성자     : 
* @ 작성일     : 2021-07-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-07-01                                    최초 작성
* 2021-07-12                                    수정 작업     
* 2021-07-21                                    수정 작업(인터페이스 변경)
* 2021-08-02                                    수정 작업
* 2021-09-01                                    수정 작업
* 2021-09-06                                    수정 작업
*************************************************************************/
-->

<template>

    <!-- kimhc_20220922 수정-->
    <!-- <page class="content-view"> -->
    <page class="content-view hasLNB">
    <!-- <div class="com_tabmenu_type02">
        <sz-category-v2 type="FR"></sz-category-v2>
    </div> -->  


    <!-- kimhc_20220922 수정-->
    <!--변경(2021.07.14)-->
    <!-- <sz-category-v2 type="FR"></sz-category-v2>   -->
    <an-category-v2 type="SZFC"></an-category-v2> 
    <an-sub-category-v2 type="FR"></an-sub-category-v2>




        <div id="content" class="com_sub_type02 com_bg_type00"> 
            <div class="calendar_wrap myfarm_calendar_wrap">  <!--2021.10.08 변경(퍼블)-->
                <section class="cal_day_box">
                    <!--상단1(Start)-->
                    <div class="com_inner">
                        <div class="select_dual_wrap hasNav">
                            <div class="select_dual">
                                <!--변경(2021.09.06 변경)-->    
                                <div class="area">
                                    <div class="select_date">
                                        <button class="cal_btn cal_prev" aria-label="한달 전 이동" title="한달 전 이동" v-on:click.prevent="fn_bfraftClamp('p')"></button>  <!--년월 이전(<) 선택-->  
                                            <a title="년월선택" class="year_month" @click.prevent="selectMonth()"><span class="num">{{currentYear}}</span>년 <span class="num">{{currentMonth}}</span>월 </a>

                                        <!--2021.10.15(금) 변경-->    
                                         <template v-if="prv_ena_yn === 'n' "> 
                                             <button class="cal_btn cal_next disabled" disabled="disabled" title="선택불가" aria-label="한달 후 이동"></button>         
                                        </template> 
                                        <template v-else> 
                                            <button class="cal_btn cal_next" title="한달 후 이동" aria-label="한달 후 이동" v-on:click.prevent="fn_bfraftClamp('n')"></button> 
                                        </template> 
                                        <!--2021.10.15(금) 변경-->    

                                    </div>
                                </div>
                                <!--변경(2021.09.06 변경)-->    

                                <div class="area">
                                    <button title="작목선택" class="select_date select_date_type02" v-on:click.prevent="fn_slidmyFarmPopOpen()">  <!--나의농장 Slide팝업 선택시-->
                                        <em>{{myFarmTxt}}</em><span class="caret"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
					</div>
                    <!--상단1(End)-->

                    <!--달력(Start) << //영농캘린더 달력사항 추가(2021.06.24) -->
                    <cmmCalendar :pBizType="'FR'" :pRzsBas='rzsBas' :pYYYYMM='rszYYYYMM' @selectWeekDateEvent="callComponentEvent" />
                    <!--달력(End)  -->

                    <!--하단(Start)-->
                    <!-- <div id="calendar_detail" class="calendar_detail diary_list_view"> -->
                    <div id="calendar_detail" class="diary_list_view">
                        <div class="calendar_notice_box">
                            <div class="inner_wrap"> 
                                <!-- 2022-09-22 보더 필요 없을 경우 삽입 : com_noline -->
                                <div class="com_list_type01 com_inner com_noline">    

                                <div class="custom_box">
                                    <!-- 통신사 -->
                                    <div class="custom_check_list">
                                        <div class="tab_radio">
                                            <div class="btn_radio">
                                                <input type="radio" name="chk_01" id="all_chk" :checked="culplAreaUntC==='ALL'" @change="fn_chngSelItem('A')">
                                                <label for="all_chk">
                                                    <span>전체</span>
                                                </label>
                                            </div>
                                            <div class="btn_radio">
                                                <input type="radio" name="chk_01" id="spl_chk" :checked="culplAreaUntC==='SIMPLE'" @change="fn_chngSelItem('S')">
                                                <label for="spl_chk">
                                                    <span>(간편)일지</span>
                                                </label>
                                            </div>
                                            <div class="btn_radio">
                                                <!-- 
                                                    선택 필요시 checked 삽입
                                                    [ 예시 ]
                                                    선택 전 : ex : <input type="radio" name="radio01" id="필요한 아이디 삽입">
                                                    선택 후 : ex : <input type="radio" name="radio01" id="필요한 아이디 삽입" checked>
                                                -->
                                                <input type="radio" name="chk_01" id="gyeong_chk" :checked="culplAreaUntC==='GYEONG'" @change="fn_chngSelItem('G')">
                                                <label for="gyeong_chk">
                                                    <span>경락가격</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <!--// 통신사 -->
                                </div>


                                    <!--2021.09.01 추가-->            
                                    <!-- <div class="new_period_box">
                                        <div class="scroll_wrap">
                                            <div class="checkbox_box"> -->


                                                <!-- <span title="전체" class="cmm_radio">  
                                                    <input type="radio" name="chk_01" id="all_chk" :checked="culplAreaUntC==='ALL'" @change="fn_chngSelItem('A')">
                                                    <label for="all_chk">전체</label>
                                                </span> -->
                                                <!-- <span title="(간편)일지" class="cmm_radio">

                                                    <input type="radio" name="chk_01" id="spl_chk" :checked="culplAreaUntC==='SIMPLE'" @change="fn_chngSelItem('S')">
                                                    <label for="spl_chk">(간편)일지</label>
                                                </span>
                                   
                                                <span title="경락가격" class="cmm_radio">
                                                  
                                                    <input type="radio" name="chk_01" id="gyeong_chk" :checked="culplAreaUntC==='GYEONG'" @change="fn_chngSelItem('G')">
                                                    <label for="gyeong_chk">경락가격</label>
                                                </span> -->
                                            <!-- </div>
                                        </div>
                                    </div>                                 -->
                                    <!--2021.09.01 추가-->            

                                    <template v-if="repVarDdtbyInqCn > 0 && culplAreaUntC !='GYEONG'"> <!--일자별 조회건수 > 0인 경우-->
                                        <div class="pt23">
                                            <div class="calendar_list_view pt0 pb0" v-for="(dtbyInq, index) in dtbyInqList" :key="index"> <!--2021.10.08 변경(퍼블)-->

                                                <div :id="'l_'+dtbyInq.trday" :ref="'l_'+dtbyInq.trday" > <!--div(Start)-->  

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

                                                    </div> <!--view_list_area(End)-->
                                                </div> <!--div(End)-->      

                                            </div> <!--calendar_list_view(End)-->
                                        </div>
                                    </template>
                                    <!--자료가 존재할 경우--> 

                                    <!-- kimhc_20220920 경락가격 경우 -->
                                    <template v-else-if="culplAreaUntC==='GYEONG' && gyeongListCnt > 0 ">
                                        <div class="calendar_wrap myfarm_calendar_wrap custom_calendar_wrap">
                                            <div class="custom_box" id="GYEONG">
                                                <!-- 오늘의 농작물 가격은? -->
                                                <div class="titbox_type01">
                                                    <strong class="com_box_tit01">오늘의 농작물 가격은?</strong>
                                                    <p class="txt-type-01">
                                                        최근 6개월 기준으로 품목별<br/>
                                                        도매 경락가 추이를 볼 수 있어요.
                                                    </p>
                                                </div>
                                                <!--// 오늘의 농작물 가격은? -->
                                                <!-- 강낭콩(울타리콩) slider_01 -->
                                                <div class="grap_toggle_wrap grap_toggle_wrap01">
                                                    <!-- grap_toggle_box -->
                                                    <div :class="targetclass1" @click="toggleFn('1', $event)">
                                                        <button type="button" class="btn btn_toggle">
                                                            <span class="blind">그래프 확대</span>
                                                        </button>
                                                        <!-- 박스 01 -->
                                                        <div class="custom_list com_box_type01 com_box_type09">
                                                            <!-- 강낭콩(울타리콩) -->
                                                            <div class="header flex_tit01">
                                                                <strong class="com_box_tit01">강낭콩(울타리콩)</strong>
                                                                <div class="align_rignt">
                                                                    <span class="num">1kg</span>
                                                                    <span class="unit">기준</span>
                                                                </div>
                                                            </div>
                                                            <!--// 강낭콩(울타리콩) -->
                                                            <!-- 당일가격 -->
                                                            <div class="custom_round_box silver">
                                                                <p class="sub_tit">당일가격</p>
                                                                <p class="sub_con">
                                                                    <strong>8,838</strong><span class="unit">원</span>
                                                                    <span class="raise">
                                                                        <em>5.9</em>%
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <!--// 당일가격 -->
                                                            <!-- 1주일전, 1개월전-->
                                                            <div class="line_grap">
                                                                <ul class="bl_dot_list">
                                                                    <li>
                                                                        <span>1주일전</span>
                                                                        <span class="num">93,226</span>
                                                                        <span class="unit">원</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>1개월전</span>
                                                                        <span class="num">8,627</span>
                                                                        <span class="unit">원</span>
                                                                    </li>
                                                                </ul>
                                                                <div class="grap_box">
                                                                    <!-- 차트가 삽입될 DIV -->
                                                                    <div id="chartHolder01" class="chartHolder"></div>
                                                                    <!-- <div id="chartHolder01" aria-hidden="true"></div> -->
                                                                </div>
                                                            </div>
                                                            <!--// 1주일전, 1개월전-->
                                                        </div>
                                                        <!--// 박스 01 -->
                                                    </div>
                                                    <!--// grap_toggle_box -->
                                                    <!-- grap_toggle_box -->
                                                    <div :class="targetclass2" @click="toggleFn('2', $event)">
                                                        <button type="button" class="btn btn_toggle">
                                                            <span class="blind">그래프 확대</span>
                                                        </button>
                                                        <!-- 박스 02 -->
                                                        <div class="custom_list com_box_type01 com_box_type09">
                                                            <div class="header flex_tit01">
                                                                <strong class="com_box_tit01">강낭콩(울타리콩)</strong>
                                                                <div class="align_rignt">
                                                                    <span class="num">1kg</span>
                                                                    <span class="unit">기준</span>
                                                                </div>
                                                            </div>
                                                            <div class="custom_round_box box_01 silver">
                                                                <p>
                                                                    <strong>8,838</strong><span class="unit">원</span>
                                                                    <span class="decrease">
                                                                        <em>2.3</em>%
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div class="line_grap line_grap01">
                                                                <p class="txt_r">[단위 : 만원]</p>
                                                                <!-- 그래프 -->
                                                                <div id="chartHolder02" class="chartHolder chartHolder01"></div>
                                                                <!--// 그래프 -->
                                                                <div class="legend_Area">
                                                                    <p class="year_name">
                                                                        <span class="prevYear">전년도</span>
                                                                        <span class="thisYear">금년도</span>
                                                                    </p>
                                                                    <p class="txt_r">
                                                                        <span class="prev_average">전년도 평균</span>
                                                                        <strong class="num">678</strong>
                                                                        <span class="unit">원</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--// 박스 02 -->
                                                    </div>
                                                    <!--// grap_toggle_box -->
                                                </div>
                                                <!--// 강낭콩(울타리콩) slider_01 -->
                
                                                <!-- 밭벼 slider_02 -->
                                                <div class="grap_toggle_wrap grap_toggle_wrap02">
                                                    <!-- grap_toggle_box -->
                                                    <div class="grap_toggle_box on">
                                                        <button type="button" class="btn btn_toggle">
                                                            <span class="blind">그래프 확대</span>
                                                        </button>
                                                        <!-- 박스 01 -->
                                                        <div class="custom_list com_box_type01 com_box_type09">
                                                            <!-- 밭벼 -->
                                                            <div class="header flex_tit01">
                                                                <strong class="com_box_tit01">밭벼</strong>
                                                                <div class="align_rignt">
                                                                    <span class="num">1kg</span>
                                                                    <span class="unit">기준</span>
                                                                </div>
                                                            </div>
                                                            <!--// 밭벼 -->
                                                            <!-- 당일가격 -->
                                                            <div class="custom_round_box silver">
                                                                <p class="sub_tit">당일가격</p>
                                                                <p class="sub_con">
                                                                    <strong>14,834</strong><span class="unit">원</span>
                                                                    <span class="raise">
                                                                        <em>5.9</em>%
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <!--// 당일가격 -->
                                                            <!-- 1주일전, 1개월전-->
                                                            <div class="line_grap">
                                                                <ul class="bl_dot_list">
                                                                    <li>
                                                                        <span>1주일전</span>
                                                                        <span class="num">93,226</span>
                                                                        <span class="unit">원</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>1개월전</span>
                                                                        <span class="num">8,627</span>
                                                                        <span class="unit">원</span>
                                                                    </li>
                                                                </ul>
                                                                <div class="grap_box">
                                                                    <!-- 차트가 삽입될 DIV -->
                                                                    <div id="chartHolder03" class="chartHolder"></div>
                                                                </div>
                                                            </div>
                                                            <!--// 1주일전, 1개월전-->
                                                        </div>
                                                        <!--// 박스 01 -->
                                                    </div>
                                                    <!--// grap_toggle_box -->
                                                    <!-- grap_toggle_box -->
                                                    <div class="grap_toggle_box">
                                                        <button type="button" class="btn btn_toggle">
                                                            <span class="blind">그래프 확대</span>
                                                        </button>
                                                        <!-- 박스 02 -->
                                                        <div class="custom_list com_box_type01 com_box_type09">
                                                            <div class="header flex_tit01">
                                                                <strong class="com_box_tit01">밭벼</strong>
                                                                <div class="align_rignt">
                                                                    <span class="num">1kg</span>
                                                                    <span class="unit">기준</span>
                                                                </div>
                                                            </div>
                                                            <div class="custom_round_box box_01 silver">
                                                                <p>
                                                                    <strong>14,834</strong><span class="unit">원</span>
                                                                    <span class="decrease">
                                                                        <em>2.3</em>%
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div class="line_grap line_grap01">
                                                                <p class="txt_r">[단위 : 만원]</p>
                                                                <!-- 그래프 -->
                                                                <div id="chartHolder04" class="chartHolder chartHolder01"></div>
                                                                <!--// 그래프 -->
                                                                <div class="legend_Area">
                                                                    <p class="year_name">
                                                                        <span class="prevYear">전년도</span>
                                                                        <span class="thisYear">금년도</span>
                                                                    </p>
                                                                    <p class="txt_r">
                                                                        <span class="prev_average">전년도 평균</span>
                                                                        <strong class="num">14,834</strong>
                                                                        <span class="unit">원</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--// 박스 02 -->
                                                    </div>
                                                    <!--// grap_toggle_box -->
                                                </div>
                                                <!--// 밭벼 slider_02 -->
                                            </div>
                                        </div>
                                    </template>

                                    <template v-else-if="culplAreaUntC==='GYEONG' && gyeongListCnt == 0">
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
                                        <div class="no_data_box">
                                            <div class="no_data_list">
                                                <p>조회된 정보가 없습니다.</p>
                                            </div>
                                        </div>
                                    </template> 
                                    <!--조회내역이 없을경우-->

                                </div> <!--com_list_type01 com_inner(End)-->
                            </div> <!--inner_wrap(End)-->
                        </div> <!--calendar_notice_box(End)-->
                    </div> <!--calendar_detail(End)-->
                    <!--하단(End)-->
                </section>
            </div>
        </div>

        <!--이미지초기화여부 = true, '글쓰기'이미지가 보이도록-->
        <div title="글쓰기" class="toggle-box sticky" :style="isPstnYn === true ? 'display:block':'display:none' ">             
             <a href="javascript:void(0);"  class="btn_float_write" v-on:click.prevent="fn_openPop()">
                <!-- <img src="@/assets/images/common/btn_write.png" alt="글쓰기"> -->
                <!-- kimhc_20220922 -->
                <img src="@/assets/images/common/btn_write01.png" alt="글쓰기">
             </a>
        </div>   
        <!-- 글쓰기 버튼(End)-->
        
        <footersV2 type="sz" />

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
// kimhc_20220922
// import SzCategoryV2 from '@/components/category/SzCategoryV2.vue'
import AnCategoryV2 from '@/components/category/AnCategoryV2.vue'
import AnSubCategoryV2 from '@/components/category/AnSubCategoryV2.vue'	

import CmmCalendar from '@/components/CmmCalendar'   //영농캘린더 달력사항 추가(2021.06.24)  
import FootersV2 from "@/views/layout/FootersV2.vue"
//import {dateFormat} from '@/utils/date'
import commonService from '@/service/commonService'
//import {dateFormat, monthAdd} from '@/utils/date'
import {monthAdd} from '@/utils/date'

import SZFR2102 from '@/views/page/SZ/FR/SZFR2102/SZFR2102'
import SZFR2103 from '@/views/page/SZ/FR/SZFR2103/SZFR2103'
import SZFR2104 from '@/views/page/SZ/FR/SZFR2104/SZFR2104'
import SZFC2112 from '@/views/page/SZ/FC/SZFC2112/SZFC2112'
import SZFC2113 from '@/views/page/SZ/FC/SZFC2113/SZFC2113'

//import '@/assets/js/rMateChartH5/JS/rMateChartH5.js'
import SZST2102 from '@/views/page/SZ/ST/SZST2102/SZST2102'

export default {
    name : "SZFR2101",
    
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
              culplAreaUntC  : "",             
              rCnt           : 0 ,
              uCnt           : 0 ,

              IMG_UNDERMAK    : "_",
              IMG_RBRIT       : "(",
              IMG_LBRIT       : ")",      

              //  
              dtbyInqList    : [],
              rzsBas         : [],    //영농캘린더 관련사항 추가(2021.06.28)  
              //  

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
              gyeongListCnt : 0,

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

      console.log("[SZFR2101]created/(onLoad)년|월|일(currentYear|currentMonth|currentDay) =>>> ", this.currentYear, this.currentMonth, this.currentDay )    
      console.log("[SZFR2101]created/(onLoad)년월(rszYYYYMM) =>>> ", this.rszYYYYMM )    
      console.log("[SZFR2101]created/(onLoad)년월Slide 선택/년월(selrszYYYYMM) =>>> ", this.selrszYYYYMM )    
      console.log("[SZFR2101]created/(onLoad)년월Slide 선택이전/년월(nowYYYYMM) =>>> ", this.nowYYYYMM )    
      console.log("[SZFR2101]created/(onLoad)년월Slide 선택이전/일(nowDay) =>>> ", this.nowDay )    
      console.log("[SZFR2101]created/(onLoad)년월Slide 선택이전/일(nowDt) =>>> ", this.nowDt )    

      //this.initComponent()      
    }, 

    mounted() {

       //this.initComponent()
        this.initComponent(this.params)

       //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     



        $("#GYEONG").show();
        // kimhc_20220920 토글 ( 강낭콩(울타리콩), 밭벼 ) 
        // console.log("======= this.toggleFn() 로드 시 호출 ======= ")
        // this.toggleFn();
    },

    //  methods: {
    //     initComponent() {

     methods: {
        initComponent(param = {}) {
            this.popId = param.popId
            console.log("[SZFR2101]initComponent/popId=>> ", this.popId)

            console.log(">>> [SZFR2101]methods(Start) <<<")

            this.isPstnYn  = true      //+ 이미지 초기화(true)
            this.myFarmTxt = "나의농장" //나의농장 Select 초기화
            this.varNaWrsLclc = "000"
            this.varNaWrsMclc = "000"
            this.varNaWrsSclc = "000"
            this.isInqDsc  = false     //조회구분코드(마이농장;1,세부작목;2) <<= 조회구분여부 true일 경우 세부작목

            console.log("[SZFR2101]initComponent/마이데이터고객번호=>> ", this.getUserInfo('mydtCusno'))
            console.log("[SZFR2101]initComponent/이미지 초기화=>> ", this.isPstnYn)
            console.log("[SZFR2101]initComponent/나의농dSelect 초기화=>> ", this.myFarmTxt)
            console.log("[SZFR2101]initComponent/조회구분코드(여부)=>> ", this.isInqDsc)
            console.log("[SZFR2101]initComponent/년|월=>> ", this.currentYear, this.currentMonth )    

            console.log("[SZFR2101]initComponent/경제통합상품대분류코드=>> "+this.varNaWrsLclc)
            console.log("[SZFR2101]initComponent/경제통합상품중분류코드=>> "+this.varNaWrsMclc)
            console.log("[SZFR2101]initComponent/경제통합상품소분류코드=>> "+this.varNaWrsSclc)

           //2021.10.15 변경 
           //선택년월의 년도 = 현재년월의 년도 인 경우    
           if (this.rszYYYYMM.substring(0,4)  === this.nowYYYYMM.substring(0,4)) {

               if (this.rszYYYYMM.substring(4,6) ===  this.nowYYYYMM.substring(4,6)) {
                    this.prv_ena_yn = 'n'   //날짜 prev 진행여부 n(nexxt)
               }    
           } 
           //2021.10.15 변경 

           //2021.11.23(화) 추가
           //사용자 전송요구리스트 조회
        //     console.log("[SZFR2101]initComponent/this.getUserInfo('chnl')=>> "+this.getUserInfo('chnl'))
        //     console.log("[SZFR2101]initComponent/this.getUserInfo('mydtCusno')=>> "+this.getUserInfo('mydtCusno'))

        //    if( commonService.getStorage('noSeemyFarm' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno')) !== 'Y' )
        //    {
        //       console.log(">>> [SZFR2101]initComponent/여기 들어왓나?(getStorage) N <<< ")

              this.fn_getAsetList()   //사용자 전송요구리스트 조회

        //    } else {
        //       console.log(">>> [SZFR2101]initComponent/여기 들어왓나?(getStorage) Y <<< ")


        //       //*2021.12.07(화) 추가
        //       if( commonService.getStorage('noSeemyFarm' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'sign') !== 'Y' ) {
        //           console.log(">>> [SZFR2101]initComponent/여기 들어왓나?(getStorage) N(안내) <<< ")

        //           //this.fn_getAsetList()   //사용자 전송요구리스트 조회
        //           this.fn_openSlidePop()
        //       } else {
        //           console.log(">>> [SZFR2101]initComponent/여기 들어왓나?(getStorage) Y(안내) <<< ")
        //           this.fn_init()
        //       }
        //       // //*2021.12.07(화) 추가

        //       //this.fn_init()
        //    }
           //2021.11.23(화) 추가

           //this.fn_init()

           console.log(">>> [SZFR2101]methods(End) <<<")

           this.getData();
        },
        getData() {
            // $("#GYEONG").show();
            // this.$nextTick(()=>{
            //     this.toggleFn();
            // })	

            this.createRMateChartH();
        },

        //정보제공동의여부 조회
        fn_getAsetList(){

            console.log(">>> [SZFR2101]fn_getAsetList(Start) <<<")

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
                console.log("[SZFR2101]fn_getAsetList/동의여부(response.agrYn)=>> ", response.agrYn)
                console.log("[SZFR2101]fn_getAsetList/동의여부(agrYn)=>> ", agrYn)

                let stltTpc = response.stltTpc || ""
                let sqno    = response.sqno
                let ofrHdngC = response.ofrHdngC || ""

                this.certAgrYn = agrYn === "0" ? false : true  //동의여부가 0(미동의)인 경우 false, 1(동의)인 경우 true
                console.log("[SZFR2101]fn_getAsetList/정보제공여부(certAgrYn)=>> ", this.certAgrYn)

                if(!this.certAgrYn) {
                    console.log("[SZFR2101]fn_getAsetList/certAgrYn=>> 미동의(false)~ ")

                    const config_pop = {
                        component: SZFC2112,
                        params : {
                            certAgrYn   : this.certAgrYn || false,   //동의여부
                            stltTpc     : stltTpc,     //약관유형코드
                            sqno        : sqno,        //일련번호
                            ofrHdngC    : ofrHdngC,    //제공항목코드
                            popId       : "SZFR2101",
                        }
                    }
                    modalService.openPopup(config_pop).then(response => {

                        console.log("[SZFR2101]fn_getAsetList/response=>> "+response)

                        if(response === 'noSeemyFarm')   //[다시 선택하지 않기]
                        {
                            console.log("[SZFR2101]fn_getAsetList/ 다시선택하지 않기(noSeemyFarm)~ ")
                            commonService.setStorage('noSeemyFarm' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno')  , 'Y')
                        }

                        //*2021.12.06(월) 추가
                        if(response === 'goSeemyChkFarm')   //[동의]인 경우 
                        {
                            console.log("[SZFR2101]fn_getAsetList/ goSeemyChkFarm(동의서 선텍 맟 서비스 이용하기 선택시~~) ")

                            this.fn_openSlidePop()   
                        } else  if(response === 'goSeemyNonChkFarm' || response === 'goSeemyFarm')   //[미동의]인 경우 or [닫기]버튼 선택시
                        {
                            console.log("[SZFR2101]fn_getAsetList/ goSeemyChkFarm(동의서 미선텍 맟 서비스 이용하기 선택시~~) ")

                              this.fn_init()
                        }
                        //*2021.12.06(월) 추가

                    })

                } else {
                    console.log("[SZFC2101]fn_getAsetList/certAgrYn=>> 동의(true)11~ ")

                    //[다시보지 않기] 선택하지 않은 경우~
                    if( commonService.getStorage('noSeemyFarm' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno')) !== 'Y' )   
                    {
                        console.log(">>> [SZFR2101]initComponent/[다시보지 않기] 미선택시~ <<< ")

                        //약관동의 안내문 확인 선택을 하지 않은 경우~        
                        if( commonService.getStorage('noSeemyFarmClaSign' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'Sign') !== 'Y' ) {
                            console.log(">>> [SZFR2101]initComponent/약관동의 안내문 확인 선택시11~ <<< ")
                            
                            this.fn_openSlidePop()
                        } else {
                            console.log(">>> [SZFR2101]initComponent/약관동의 안내문 확인 선택시22~ <<< ")
                            
                             this.fn_init()
                        }
                    } else {
                        console.log(">>> [SZFR2101]initComponent/[다시보지 않기] 선택시~ <<< ")

                        this.fn_init()    //초기설정
                    }

                    //this.fn_init()  //초기설정
                }
            })

            console.log(">>> [SZFR2101]fn_getAsetList(End) <<<")
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

            console.log(" >>> [SZFR2101]selectMonth(Start) <<<")    

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

                // this.rszDt        = this.rszYYYYMM+this.currentDay
                // console.log('년월슬라이드 팝업-년월일(rszDt)=>> ' + this.rszDt)

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

            console.log(" >>> [SZFR2101]selectMonth(End) <<<")    

        },

        //**************
        // [조회]
        //***************/
        getSearchList(flag) {

            console.log(">>> [SZFR2101]getSearchList(Start) <<< ")

            console.log("[SZFR2101]getSearchList/(변수)flag=>> "+flag)
            console.log("[SZFR2101]getSearchList/(변수)마이농장여부=>> "+this.isInqDsc)
            console.log("[SZFR2101]getSearchList/(변수)경제통합상품대분류코드=>> "+this.varNaWrsLclc)
            console.log("[SZFR2101]getSearchList/(변수)경제통합상품중분류코드=>> "+this.varNaWrsMclc)
            console.log("[SZFR2101]getSearchList/(변수)경제통합상품소분류코드=>> "+this.varNaWrsSclc)
            console.log("[SZFR2101]getSearchList/(변수)간편일지여부=>> "+this.culplAreaUntC)

            const config = {
                url:'/sz/fr/01r01',
                //url : "/co/at/01r01",
                data : {
                    mydtCusno : this.getUserInfo('mydtCusno'),        //마이데이터고객번호 = (변수)마이데이터고객번호
                    inqYm     : this.currentYear+this.currentMonth,   //조회년월(년월)   = (변수)년+(변수)월
                    inqDsc    : !this.isInqDsc?'1':'2',               //조회구분코드(마이농장;1,세부작목;2) <<= 조회구분여부 true일 경우 세부작목
                    naWrsLclc : !this.isInqDsc?'':this.varNaWrsLclc,  //마이농장일 경우 = '', 세부작목 = (변수)경제통합상품대분류코드
                    naWrsMclc : !this.isInqDsc?'':this.varNaWrsMclc,  //마이농장일 경우 = '', 세부작목 = (변수)경제통합상품중분류코드
                    naWrsSclc : !this.isInqDsc?'':this.varNaWrsSclc,  //마이농장일 경우 = '', 세부작목 = (변수)경제통합상품소분류코드
                    easyDiaryYn : flag==='9'?'':flag,                 //간편일지(1;간편일지, '';전체)
                }
            }

             console.log("[SZFR2101]config=>> "+config)

            apiService.call(config).then(response => {

                //this.repVarMydtCusno  = response.mydtCusno  //(변수)마이데이터고객  = response.마이데이터고객
                this.repVarInqYm      = response.inqYm      //(변수)조회년월       = response.조회년월

                console.log("[SZFR2101]/(변수)조회년월(inqYm)=>> ", this.repVarInqYm)

                this.repVarDdtbyInqCn = (response.dtbyInqCn === undefined)?0:response.dtbyInqCn          //(변수)일자별 조회건수 = response.일자별 조회건수
                this.dtbyInqList   = (response.dtbyInqList === undefined)?'':response.dtbyInqList || []   //일자별조회목록

                console.log("[SZFR2101]/(변수)일자별 조회건수(dtbyInqCn)=>> ", this.repVarDdtbyInqCn)
                console.log("[SZFR2101]fn_RstInfo/dtbyInqList =>>"+JSON.stringify(this.dtbyInqList))

                //*
                this.fn_RstInfo()

                //*sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                this.$nextTick(() => {
                     this.callJQueryFncExcute()
                })

                this.fn_getAbiCulplList()  

                console.log(">>> [SZFR2101]getSearchList(End) <<< ")
            })        
        },

		//기본 나의농장 처리 시 필요 영농재배지/경제통합상품소분류명
		fn_getAbiCulplList(){
			
             console.log(">>> [SZFR2101]fn_getAbiCulplList(Start) <<< ")    

            const config ={
                url:'/sz/fr/00r01',
				data : {
					mydtCusno   :  this.getUserInfo('mydtCusno')  	//(입력)마이데이터고객번호 = (params)마이데이터고객번호		 
                 }
             }

             apiService.call(config).then(response => {
                const abiCulplList  = response.abiCulplList || [];       //작목재배지목록 = response.작목재배지목록
                console.log("[SZFR2101]fn_getAbiCulplList/response.abiCulplList =>> "+JSON.stringify(response.abiCulplList))

                console.log("[SZFR2101]fn_getAbiCulplList/this.myFarmTxt=>> "+this.myFarmTxt)

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

             console.log(">>> [SZFR2101]fn_getAbiCulplList(End) <<< ")    

		},

        /*
        * [나의농장] 슬라이드팝업 호출 
        */
        fn_slidmyFarmPopOpen() {

            console.log(">>> [SZFR2101]fn_slidmyFarmPopOpen(Start) <<<")  

            this.culplAreaUntC ='ALL'        
            console.log("[SZFR2101]fn_slidmyFarmPopOpen/(변수)culplAreaUntC=>> "+this.culplAreaUntC)  
            console.log("[SZFR2101]fn_slidmyFarmPopOpen/(입력)마이데이터고객번호=>> "+this.getUserInfo('mydtCusno'))  

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

				console.log("[SZFR2101](변수)상품분류코드(대)=>> "+this.varNaWrsLclc)  
				console.log("[SZFR2101](변수)상품분류코드(중)=>> "+this.varNaWrsMclc)  
				console.log("[SZFR2101](변수)상품분류코드(소)=>> "+this.varNaWrsSclc)  
				console.log("[SZFR2101](변수)상품분류명=>> "+this.varNaWrsSclfnm)  
				console.log("[SZFR2101](변수)재배지지역코드|재배지지역명=>> "+this.varCulplRgnC, this.varCulplRgnNm)  

                this.varNaWrs = this.varNaWrsLclc+this.varNaWrsMclc+this.varNaWrsSclc
				console.log("[SZFR2101](변수)상품분류코드(대/중/소)=>> "+this.varNaWrs)  

                 if (this.varNaWrs === "000000000") {    //나의농장일 경우
                    this.isInqDsc = false
                 } else {   //세부항목일 경우
                    this.isInqDsc = true
                }
				console.log("[SZFR2101](변수)나의농장여부=>>"+this.isInqDsc)  

                this.myFarmTxt = this.varNaWrsSclfnm   //(변수)상품분류명 = (response)상품분류명(소분류)
				console.log("[SZFR2101](변수)상품분류명=>>"+this.myFarmTxt)  
                //                
                if ( this.culplAreaUntC === 'ALL') {  //조회(전체조회)
                   this.getSearchList('9')  //조회(전체조회)
                }

                //*sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                this.$nextTick(() => {
                    this.callJQueryFncExcute()
                })

            })

            console.log(">>> [SZFR2101]fn_slidmyFarmPopOpen(End) <<<")  
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
                //     console.log("[SZFR2101]callComponentEvent/dLabel[0] === undefine인 경우/this.callCompEntYn=>>"+this.callCompEntYn)  
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
            
            console.log(">>> [SZFR2101]fn_openFarmDailyPop(Start) <<< ")

            console.log("[SZFC2101]fn_openFarmDailyPop/1.경제통합상품대분류코드=>> "+flag1)
            console.log("[SZFC2101]fn_openFarmDailyPop/2.경제통합상품중분류코드=>> "+flag2)
            console.log("[SZFC2101]fn_openFarmDailyPop/3.경제통합상품소분류코드=>> "+flag3)
            console.log("[SZFC2101]fn_openFarmDailyPop/4.분류명=>> "+flag4)
            console.log("[SZFC2101]fn_openFarmDailyPop/5.재배지지역코드=>> "+flag5)
            console.log("[SZFC2101]fn_openFarmDailyPop/6.재배지지역명=>> "+flag6)
            console.log("[SZFC2101]fn_openFarmDailyPop/7.마이농가경제통합인터페이스구분코드=>> "+flag7)
            console.log("[SZFC2101]fn_openFarmDailyPop/8.경제통합데이터구분코드=>> "+flag8)
            console.log("[SZFC2101]fn_openFarmDailyPop/9.사무소코드=>> "+flag9)
            console.log("[SZFC2101]fn_openFarmDailyPop/10.경제통합전표번호=>> "+flag10)
            console.log("[SZFC2101]fn_openFarmDailyPop/11.영농일지작업일자=>> "+flag11)
            console.log("[SZFC2101]fn_openFarmDailyPop/12.영농일지일련번호=>> "+flag12)
            console.log("[SZFC2101]fn_openFarmDailyPop/13.거래일자=>> "+flag13)

           //this.selItem1  = this.currentYear+this.currentMonth      //조회년월 = (변수)조회년월(년+월)

            // component = SZFR2104;     //<<- 상세(수정)

            // const config = {
			// 	component : component,
			// 	params : {
            //         //inqYm       : this.selItem1,   //조회년월    = (변수)조회년월
            //         naWrsLclc   : flag1,   //경제통합상품대분류코드 = (변수)경제통합상품대분류코드
            //         naWrsMclc   : flag2,   //경제통합상품중분류코드 = (변수)경제통합상품중분류코드
            //         naWrsSclc   : flag3,   //경제통합상품소분류코드 = (변수)경제통합상품소분류코드
            //         naWrsSclfnm : flag4,   //상품분류명  = (변수)상품분류명
            //         trDsc       : 'U',     //거래구분코드(C;등록,U;수정)
            //         culplRgnC   : flag5,   //재배지지역코드   
            //         culplRgnNm  : flag6,   //재배지지역명
            //         myfhsNaIntfDsc : flag7,  //마이농가경제통합인터페이스구분코드
            //         naDataDsc   : flag8,   //경제통합데이터구분코드
            //         brc         : flag9,   //사무소코드
            //         naSlpno     : flag10,  //경제통합전표번호
            //         wkDt        : flag11,  //영농일지작업일자
            //         sqno        : flag12,  //영농일지일련번호
            //         trDt        : flag13,  //거래일자
			// 	}
			// }	    

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
            console.log("[SZFR2101]fn_openMyFarmDetailPop/(전)isPstnYn=>>"+this.isPstnYn)

            modalService.openPopup(config).then(response => {

                console.log('[SZFR2101]response=>> ' , response)

                if(response === 'complete'){         
                    this.isPstnYn = true  //글쓰기 이미지 보여주기    
                    console.log("[SZFR2101]fn_popupSel/(후)isPstnYn=>> "+this.isPstnYn)

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

            console.log(">>> [SZFR2101]fn_openFarmDailyPop(End) <<< ")

        },

        /*
        * [경제데이타 등록] 팝업호출 
        * (21.경제통합상품대분류코드/22.경제통합상품중분류코드/23.경제통합상품소분류코드/24.분류명/25.재배지지역코드/26.재배지지역명/27.마이농가경제통합인터페이스구분코드
        *  28.경제통합데이터구분코드/29.사무소코드/30.경제통합전표번호/31.영농일지작업일자/32.영농일지일련번호/33.거래일자)
        */
        fn_openEconormyPop(flag21, flag22, flag23, flag24, flag25, flag26, flag27, flag28, flag29, flag30, flag31, flag32, flag33) {
            let popParams1 = {}

            console.log(">>> [SZFR2101]fn_openEconormyPop(Start) <<< ")

            console.log("[SZFC2101]fn_openEconormyPop/1.경제통합상품대분류코드=>> "+flag21)
            console.log("[SZFC2101]fn_openEconormyPop/2.경제통합상품중분류코드=>> "+flag22)
            console.log("[SZFC2101]fn_openEconormyPop/3.경제통합상품소분류코드=>> "+flag23)
            console.log("[SZFC2101]fn_openEconormyPop/4.분류명=>> "+flag24)
            console.log("[SZFC2101]fn_openEconormyPop/5.재배지지역코드=>> "+flag25)
            console.log("[SZFC2101]fn_openEconormyPop/6.재배지지역명=>> "+flag26)
            console.log("[SZFC2101]fn_openEconormyPop/7.마이농가경제통합인터페이스구분코드=>> "+flag27)
            console.log("[SZFC2101]fn_openEconormyPop/8.경제통합데이터구분코드=>> "+flag28)
            console.log("[SZFC2101]fn_openEconormyPop/9.사무소코드=>> "+flag29)
            console.log("[SZFC2101]fn_openEconormyPop/10.경제통합전표번호=>> "+flag30)
            console.log("[SZFC2101]fn_openEconormyPop/11.영농일지작업일자=>> "+flag31)
            console.log("[SZFC2101]fn_openEconormyPop/12.영농일지일련번호=>> "+flag32)
            console.log("[SZFC2101]fn_openEconormyPop/13.거래일자=>> "+flag33)

            //
            // component = SZFR2103;  

            //  const config = {
			// 	component : component, 
			// 	params : {
            //         trDsc        : "C",     //거래구분코드(C:등록,U:수정,D:삭제)
            //         inqYm        : this.currentYear+this.currentMonth,         //조회년월 = (변수)년+(변수)월+(변수)일
            //         basDt        : this.currentYear+this.currentMonth+flag27,  //기준일자 = (변수)년+(변수)월+(변수)일
            //         naWrsLclc    : flag21,  //상품분류코드(대분류)
            //         naWrsMclc    : flag22,  //상품분류코드(중분류)
            //         naWrsSclc    : flag23,  //상품분류코드(소분류)
            //         naWrsSclfnm  : flag24,  //상품분류명
            //         culplRgnC    : flag25,  //재배지지역코드
            //         culplRgnNm   : flag26,  //재배지직역명 
            //         myfhsNalntfDsc : flag27,  //마이농가경제통합인터페이스구분코드 
            //         naDataDsc    : flag28,  //경제통합데이터구분코드
            //         brc          : flag29,  //사무소코드
            //         naSlpno      : flag30,  //경제통합번호  
            //         wkDt         : flag31,  //거래일
            //         sqno         : flag32,  //영농일지번호
            //         trDt         : flag33,  //거래일자
			// 	}
			// }	    

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
            console.log("[SZFR2101]fn_openEconormyPop/(전)isPstnYn=>>"+this.isPstnYn)

            modalService.openPopup(config).then(response => {

                console.log('[SZFR2101]response=>> ' , response)

                if (response === 'complete'){         
                    this.isPstnYn = true   //글쓰기 이미지 보여주기    
                    console.log("[SZFR2101]fn_popupSel/(후)isPstnYn=>> "+this.isPstnYn)

                    //변경(2021.09.28 이성재차장 요청)            
                    if ( this.culplAreaUntC === 'ALL') {  //조회(전체조회)
                       this.fn_chngSelItem('A')  
                    } else if (this.culplAreaUntC === 'SIMPLE') {  //조회(간편일지)
                       this.fn_chngSelItem('S')
                    }    
                    //변경(2021.09.28 이성재차장 요청)            
                } 

             })        

            console.log(">>> [SZFR2101]fn_openEconormyPop(End) <<< ")            

        },

        /*
        * [글쓰기] 팝업호출 
        */
        fn_openPop() {
            
            let popParams0 = {}    

            console.log(">>> [SZFR2101]fn_openPop(Start) <<< ")

            console.log("[SZFR2101]fn_openPop/(변수)선택 년월=>> "+this.selrszYYYYMM)
            console.log("[SZFR2101]fn_openPop/(변수)현재 년월=>> "+this.rszYYYYMM)
            console.log("[SZFR2101]fn_openPop/(변수)년/월/일=>> "+this.currentYear, this.currentMonth, this.currentDay)

            console.log("[SZFC2101]fn_openPop/1.경제통합상품대분류코드=>> "+this.varNaWrsLclc)
            console.log("[SZFC2101]fn_openPop/2.경제통합상품중분류코드=>> "+this.varNaWrsMclc)
            console.log("[SZFC2101]fn_openPop/3.경제통합상품소분류코드=>> "+this.varNaWrsSclc)
            console.log("[SZFC2101]fn_openPop/4.분류명=>> "+this.varNaWrsSclfnm)
            console.log("[SZFC2101]fn_openPop/5.재배지지역코드=>> "+this.varCulplRgnC)
            console.log("[SZFC2101]fn_openPop/6.재배지지역명=>> "+this.varCulplRgnNm)
            console.log("[SZFC2101]fn_openPop/7.마이농가경제통합인터페이스구분코드=>> N/A ")
            console.log("[SZFC2101]fn_openPop/8.경제통합데이터구분코드=>> N/A ")
            console.log("[SZFC2101]fn_openPop/9.사무소코드=>> N/A ")
            console.log("[SZFC2101]fn_openPop/10.경제통합전표번호=>> N/A ")
            console.log("[SZFC2101]fn_openPop/11.영농일지작업일자=>> N/A ")
            console.log("[SZFC2101]fn_openPop/12.영농일지일련번호=>> N/A ")
            console.log("[SZFC2101]fn_openPop/13.거래일자=>> "+this.rszYYYYMM+this.currentDay)
            console.log("[SZFC2101]fn_openPop/13.현재년월=>> "+this.repVarInqYm)

            //경제통합상품상품분류가 '000000000'인 경우    
            if (this.varNaWrs === "000000000" ) {
               this.varNaWrsSclfnm = this.myFarmTxt    //(변수)경제통합상품상품분류명 <<- 나의농장 필드값
            }

            //  const config = {
			// 	component : SZFR2103, 
			// 	params : {
            //         trDsc        : "C",                     //거래구분코드(C:등록,U:수정,D:삭제)
            //         naWrsLclc    : this.varNaWrsLclc,       //상품분류코드(대분류) = (변수)상품분류코드(대분류)
            //         naWrsMclc    : this.varNaWrsMclc,       //상품분류코드(중분류) = (변수)상품분류코드(중분류)
            //         naWrsSclc    : this.varNaWrsSclc,       //상품분류코드(소분류) = (변수)상품분류코드(소분류)
            //         naWrsSclfnm  : (this.varNaWrs === '000000000')?this.myFarmTxt:this.varNaWrsSclfnm, //상품분류명 = (변수)경제통합상품상품분류명
            //         culplRgnC    : this.varCulplRgnC,       //재배지지역코드 = (변수)재배지지역코드
            //         culplRgnNm   : this.varCulplRgnNm,      //재배지지역명 = (변수)재배지지역명                    
            //         myfhsNalntfDsc : "",       //마이농가경제통합인터페이스구분코드 
            //         naDataDsc    : "DIRECT",   //경제통합데이터구분코드(DIRECT;영농일지 등록)    
            //         brc          : "",         //사무소코드
            //         naSlpno      : "",         //경제통합번호  
            //         wkDt         : this.currentYear+this.currentMonth+this.currentDay,  //영농일지작업일자 = (변수)년+(변수)월+(변수)일
            //         sqno         : 0,          //영농일지번호
            //         trDt         : "",         //거래일자
			// 	}
			// }	    

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
                    console.log("[SZFR2101]fn_popupSel/(후)isPstnYn=>> "+this.isPstnYn)

                    // let naWrs01 = this.varNaWrsLclc+this.varNaWrsMclc+this.varNaWrsSclc  //대중소분류   
                    // let wkDt01 = this.repVarInqYm+this.currentDay //영농일지작업일자
                    
                    // console.log("[SZFR2103]fn_openPop/naWrs01=>> "+naWrs01)

                    // if (response.naWrs === naWrs01 && response.wkDt === wkDt01) {
                    //     this.writeYn = "Y"
                    // } else {
                    //     this.writeYn = "N"
                    // }
                    // console.log("[SZFR2101]fn_popupSel/writeYn=>> "+this.writeYn)

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

            console.log(">>> [SZFR2101]fn_openPop(End) <<< ")
            
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
                console.log("======= this.toggleFn() fn_chngSelItem에서  호출!!! ======= ")
                // this.$nextTick(()=>{
                //     this.toggleFn();
                // })	
            }    

        },

        /*
        * [이전/이후 꺽쇠] 선택
        */
        fn_bfraftClamp(flag){
            console.log(">>>>>>> [SZFR2101]fn_bfraftClamp(Start) <<<<<<< ")

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

            console.log("[SZFR2101]fn_openSlidePop(Start) ")

            const config = {
				params : {
					mydtCusno : this.getUserInfo('mydtCusno') ,  //this.getUserInfo('mydtCusno') , //마이데이터고객번호
				},
                renderer: {
                    component: SZFC2113,
                }
			}
            modalService.openSlidePagePopup(config).then(response => {

                console.log("[SZFR2101]fn_openSlidePop/response=>> "+response)

                if(response === 'noSeemyFarmClaSign')
                {
                    console.log("[SZFR2101]fn_openSlidePop/ 여기1(noSeemyFarm)~ ")
                    commonService.setStorage('noSeemyFarmClaSign' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'Sign' , 'Y')
                    
                    //*
                    this.fn_init()
                }
            })
            //   this.fn_init()  //초기설정

            console.log("[SZFR2101]fn_openSlidePop(End) ")
        },
        // kimhc_20220920 알매이트 
        // 토글 ( 강낭콩(울타리콩), 밭벼 ) 
        toggleFn(gubun, event) {
            // var btn = $('.btn_toggle');
            // var parentBox = $('.grap_toggle_wrap');
            // var childrenBox = $('.grap_toggle_wrap .grap_toggle_box');

            // this.childrenBox = $('.grap_toggle_wrap .grap_toggle_box');
            // var childrenBox = $('.grap_toggle_wrap');

            

            // this.$nextTick(() => {

            //     this.childrenBox = $('.grap_toggle_wrap .grap_toggle_box');
            //     console.log("======= this.childrenBox ======= ", this.childrenBox);
            //     this.childrenBox.each(function(){
    
            //          console.log("======= this.childrenBox ======= ", this.childrenBox);
    
            //         this.createRMateChartH();
            //         console.log("======= this.chart01() 1차 실행 ======= ");
            //         $(this).on('click', function() {
            //             $(this).removeClass('on').siblings().addClass('on');
    
            //             this.createRMateChartH();
            //             console.log("======= this.chart01() 2차 실행 ======= ");
            //         });
            //     })

            // })

            console.log("======= toggleFn(gubun, event)  gubun =======", gubun);
            console.log("======= toggleFn(gubun, event)  event =======", event);
            console.log("======= toggleFn(gubun, event)  event.target =======", event.target);
            console.log("======= toggleFn(gubun, event)  event.target.class =======", event.target.class);
            

            $("#GYEONG").show();

            if(gubun === "1"){

                console.log("======= toggleFn(gubun, event)  gubun 111=======", gubun);
                this.targetclass2  = "grap_toggle_box on";
                this.targetclass1  = "grap_toggle_box";
            }else{

                console.log("======= toggleFn(gubun, event)  gubun 222 =======", gubun);

                this.targetclass1  = "grap_toggle_box on";
                this.targetclass2  = "grap_toggle_box";
            }

            
            
            // $(".grap_toggle_box .on").show();
            // $(".grap_toggle_box").hide();

            

            this.$nextTick(()=>{
                this.createRMateChartH();
            })			



        },
        // 탭(간편)일지) > 등록한 작목의 당일 경락가 차트 (작은차트)
        createRMateChartH(){
            rMateChartH5.create("chart01", "chartHolder01", "", "100%", "100%");// 차트 1
            rMateChartH5.create("chart02", "chartHolder02", "", "100%", "100%");// 차트 2
            // rMateChartH5.create("chart03", "chartHolder03", "", "100%", "100%");// 차트 3
            // rMateChartH5.create("chart04", "chartHolder04", "", "100%", "100%");// 차트 4
            this.data();
        },
        data(){
            // ######################### 차트 시작1
            // 탭(간편)일지) > 등록한 작목의 당일 경락가 차트 (작은차트)
            this.layoutStr01 =
            '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
                +'<Options>'
                    +'<Caption text=""/>'
                    +'<SubCaption text="" textAlign="right" />'
                    +'<Legend useVisibleCheck="true"/>'
                +'</Options>'
                +'<NumberFormatter id="numfmt01" useThousandsSeparator="false"/>'
                +'<Combination2DChart showDataTips="false" gutterLeft="0" gutterRight="0">'
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
                                +'<Stroke color="#23a0a5" weight="1"/>'
                            +'</areaStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#23a0a5" alpha="0.7"/>'
                            +'</areaFill>'
                        +'</Area2DSeries>'
                        +'<Area2DSeries yField="ThisYear01" displayName="금년도">'
                            +'<showDataEffect>'
                                +'<SeriesInterpolate/>'
                            +'</showDataEffect>'
                            /* 컬러값 변경 : 노랑선 + 오피시티 */
                            +'<areaStroke>'
                                +'<Stroke color="#fdbb68" weight="1"/>'
                            +'</areaStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#fdbb68" alpha="0.7"/>'
                            +'</areaFill>'
                        +'</Area2DSeries>'
                    +'</series>'
                +'</Combination2DChart>'
            +'</rMateChart>';

            // 차트 데이터
            this.chartData01 = [
                {"YearMonth01":"21.12","PrevYear01":16000,"ThisYear01":15000},
                {"YearMonth01":"22.01","PrevYear01":24000,"ThisYear01":26000},
                {"YearMonth01":"22.02","PrevYear01":21000,"ThisYear01":22000},
                {"YearMonth01":"22.03","PrevYear01":15000,"ThisYear01":17000},
                {"YearMonth01":"22.04","PrevYear01":21000,"ThisYear01":19000},
                {"YearMonth01":"22.05","PrevYear01":24000,"ThisYear01":26000},
                {"YearMonth01":"22.06","PrevYear01":21000,"ThisYear01":23000},
                {"YearMonth01":"22.07","PrevYear01":19000,"ThisYear01":18000}   
                // {"YearMonth01":"","PrevYear01":1340,"ThisYear01":150},
                // {"YearMonth01":"","PrevYear01":1680,"ThisYear01":2170},
                // {"YearMonth01":"","PrevYear01":1680,"ThisYear01":2700},
                // {"YearMonth01":"","PrevYear01":180,"ThisYear01":240},
                // {"YearMonth01":"","PrevYear01":140,"ThisYear01":2220},
                // {"YearMonth01":"","PrevYear01":130,"ThisYear01":2210}
            ];

            // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
            //
            // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
            // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
            // 
            // 아래 내용은 
            // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
            // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
            rMateChartH5.calls("chart01", {
                "setLayout" : this.layoutStr01,
                "setData" : this.chartData01
            });
            // -----------------------차트 설정 끝 -----------------------
            // ######################### 차트 종료1

            // ######################### 차트 시작3
             // 탭(간편)일지) > 등록한 작목의 당일 경락가 차트 (작은차트)
             this.layoutStr03 =
            '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
                +'<Options>'
                    +'<Caption text=""/>'
                    +'<SubCaption text="" textAlign="right" />'
                    +'<Legend useVisibleCheck="true"/>'
                +'</Options>'
                +'<NumberFormatter id="numfmt03" useThousandsSeparator="false"/>'
                +'<Combination2DChart showDataTips="false" gutterLeft="0" gutterRight="0">'
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
                +'</Combination2DChart>'
            +'</rMateChart>';

            // 차트 데이터
            this.chartData03 = [
                {"YearMonth03":"21.12","PrevYear03":26000,"ThisYear03":15000},
                {"YearMonth03":"22.01","PrevYear03":14000,"ThisYear03":26000},
                {"YearMonth03":"22.02","PrevYear03":11000,"ThisYear03":22000},
                {"YearMonth03":"22.03","PrevYear03":13000,"ThisYear03":17000},
                {"YearMonth03":"22.04","PrevYear03":23000,"ThisYear03":19000},
                {"YearMonth03":"22.05","PrevYear03":22000,"ThisYear03":26000},
                {"YearMonth03":"22.06","PrevYear03":20000,"ThisYear03":23000},
                {"YearMonth03":"22.07","PrevYear03":15000,"ThisYear03":18000}
                // {"YearMonth03":"","PrevYear03":340,"ThisYear03":250},
                // {"YearMonth03":"","PrevYear03":680,"ThisYear03":170},
                // {"YearMonth03":"","PrevYear03":180,"ThisYear03":700},
                // {"YearMonth03":"","PrevYear03":180,"ThisYear03":440},
                // {"YearMonth03":"","PrevYear03":140,"ThisYear03":220},
                // {"YearMonth03":"","PrevYear03":130,"ThisYear03":210}
            ];

            // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
            //
            // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
            // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
            // 
            // 아래 내용은 
            // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
            // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
            // rMateChartH5.calls("chart03", {
            //     "setLayout" : this.layoutStr03,
            //     "setData" : this.chartData03
            // });
            // -----------------------차트 설정 끝 -----------------------
            // ######################### 차트 종료3





            // ######################### 차트 시작2
            // 탭(간편)일지) > 등록한 작목의 당일 경락가 차트 (작은차트), 탭(경락가격) > 경락가 추이 그래프
            this.prevAverage01 = 22000; // 전년도 평균 20000원
            this.layoutStr02 =
            '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
                +'<Options>'
                    +'<Caption text=""/>'
                    +'<SubCaption text="" textAlign="right" />'
                    +'<Legend useVisibleCheck="true"/>'
                +'</Options>'
                +'<NumberFormatter id="numfmt02" useThousandsSeparator="false"/>'
                +'<Combination2DChart showDataTips="false" gutterLeft="0" gutterRight="0">'
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
                                +'<Stroke color="#23a0a5" weight="1"/>'
                            +'</areaStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#23a0a5" alpha="0.7"/>'
                            +'</areaFill>'
                        +'</Area2DSeries>'
                        +'<Area2DSeries yField="ThisYear02" displayName="금년도">'
                            +'<showDataEffect>'
                                +'<SeriesInterpolate/>'
                            +'</showDataEffect>'
                            /* 컬러값 변경 : 노랑선 + 오피시티 */
                            +'<areaStroke>'
                                +'<Stroke color="#fdbb68" weight="1"/>'
                            +'</areaStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#fdbb68" alpha="0.7"/>'
                            +'</areaFill>'
                        +'</Area2DSeries>'
                    +'</series>'
                    +'<backgroundElements>'
                        +'<GridLines/>'
                        +'<AxisMarker>'
                            +'<lines>'
                                +'<AxisLine value="'+this.prevAverage01+'" lineStyle="dashLine" label="">'
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
            this.chartData02 = [
                {"YearMonth02":"21.12","PrevYear02":16000,"ThisYear02":15000},
                {"YearMonth02":"22.01","PrevYear02":24000,"ThisYear02":26000},
                {"YearMonth02":"22.02","PrevYear02":21000,"ThisYear02":22000},
                {"YearMonth02":"22.03","PrevYear02":15000,"ThisYear02":17000},
                {"YearMonth02":"22.04","PrevYear02":21000,"ThisYear02":19000},
                {"YearMonth02":"22.05","PrevYear02":24000,"ThisYear02":26000},
                {"YearMonth02":"22.06","PrevYear02":21000,"ThisYear02":23000},
                {"YearMonth02":"22.07","PrevYear02":19000,"ThisYear02":18000}
                // {"YearMonth02":"22.07","PrevYear02":340,"ThisYear02":50},
                // {"YearMonth02":"22.08","PrevYear02":680,"ThisYear02":70},
                // {"YearMonth02":"22.09","PrevYear02":680,"ThisYear02":200},
                // {"YearMonth02":"22.10","PrevYear02":80,"ThisYear02":40},
                // {"YearMonth02":"22.11","PrevYear02":40,"ThisYear02":20},
                // {"YearMonth02":"22.12","PrevYear02":30,"ThisYear02":10}
            ];
            // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
            //
            // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
            // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
            // 
            // 아래 내용은 
            // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
            // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
            rMateChartH5.calls("chart02", {
                "setLayout" : this.layoutStr02,
                "setData" : this.chartData02
            });
            // -----------------------차트 설정 끝 -----------------------
            // ######################### 차트 종료2


            // ######################### 차트 시작4
            // 탭(간편)일지) > 등록한 작목의 당일 경락가 차트 (작은차트), 탭(경락가격) > 경락가 추이 그래프
            this.prevAverage02 = 20000; // 전년도 평균 2000원
            this.layoutStr04 =
            '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
                +'<Options>'
                    +'<Caption text=""/>'
                    +'<SubCaption text="" textAlign="right" />'
                    +'<Legend useVisibleCheck="true"/>'
                +'</Options>'
                +'<NumberFormatter id="numfmt04" useThousandsSeparator="false"/>'
                +'<Combination2DChart showDataTips="false" gutterLeft="0" gutterRight="0">'
                    +'<horizontalAxis>'
                        +'<CategoryAxis categoryField="YearMonth04" padding="0.4"/>'
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
                        +'<GridLines/>'
                        +'<AxisMarker>'
                            +'<lines>'
                                +'<AxisLine value="'+this.prevAverage02+'" lineStyle="dashLine" label="">'
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
            this.chartData04 = [
                {"YearMonth04":"21.12","PrevYear04":26000,"ThisYear04":15000},
                {"YearMonth04":"22.01","PrevYear04":14000,"ThisYear04":26000},
                {"YearMonth04":"22.02","PrevYear04":11000,"ThisYear04":22000},
                {"YearMonth04":"22.03","PrevYear04":13000,"ThisYear04":17000},
                {"YearMonth04":"22.04","PrevYear04":23000,"ThisYear04":19000},
                {"YearMonth04":"22.05","PrevYear04":22000,"ThisYear04":26000},
                {"YearMonth04":"22.06","PrevYear04":20000,"ThisYear04":23000},
                {"YearMonth04":"22.07","PrevYear04":15000,"ThisYear04":18000}
                // {"YearMonth04":"22.07","PrevYear04":240,"ThisYear04":250},
                // {"YearMonth04":"22.08","PrevYear04":480,"ThisYear04":270},
                // {"YearMonth04":"22.09","PrevYear04":480,"ThisYear04":400},
                // {"YearMonth04":"22.10","PrevYear04":20,"ThisYear04":240},
                // {"YearMonth04":"22.11","PrevYear04":440,"ThisYear04":220},
                // {"YearMonth04":"22.12","PrevYear04":430,"ThisYear04":210}
            ];
            // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
            //
            // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
            // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
            // 
            // 아래 내용은 
            // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
            // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
            // rMateChartH5.calls("chart04", {
            //     "setLayout" : this.layoutStr04,
            //     "setData" : this.chartData04
            // });
            // -----------------------차트 설정 끝 -----------------------
            // ######################### 차트 종료4
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