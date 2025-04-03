<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 메인
* @ 파일명     : src/views/page/LC/IP/LCIP2001/LCIP2001.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-09-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-13              CS529599                 최초작성(LCIP1101 -> LCIP2001 고도화 개발)
* 2022-10-13              CS529599                 컨설팅화면 신규 개발
*************************************************************************/
-->
<template>
    <page class="content-view">
        <lc-category-v2 type="LCIP"></lc-category-v2>

        <!-- content -->
        <div id="content" class="sub_main renewal">
            <div v-if="showFlagYN == 'Y'">
                <div class="com_submainbox_type01 com_submainbox_type01-02 custom_box custom_box8 custom_box12">
                    <div class="custom_box_fiexd_round01">
                        <div class="select_date">
                            <button class="cal_btn cal_prev" :class="monPrev ? '' : 'disabled'" :disabled="monPrev ? false : true" aria-label="한달 전 이동" @click.prevent="btn_moveMonth('P')"></button>
                            <a title="년월선택" class="year_month" href="javascript:console.log('월');" @click.prevent="openSlideMonthPop()"><span class="num year">{{basYy}}</span>년<span class="num month">{{basMm}}</span>월 </a>
                            <button class="cal_btn cal_next" :class="monNext ? '' : 'disabled'" :disabled="monNext ? false : true" aria-label="한달 후 이동" title="한달 후 이동" @click.prevent="btn_moveMonth('N')"></button>
                        </div>
                    </div>
                    <div class="custom_box_linst01 arrow">
                        <a href="javascript:void(0);" @click.prevent="openPop('LCIP1002')">지난달 지출 비교</a>
                    </div>
                    <div class="text txt02">
                        <template v-if="bmmCmprXpsAm > 0">
                            지난달보다 <strong class="num">{{bmmCmprXpsAm | numberFilter}}</strong>원 늘었어요
                        </template>
                        <template v-if="bmmCmprXpsAm < 0">
                            지난달보다 <strong class="num">{{Math.abs(bmmCmprXpsAm) | numberFilter}}</strong>원 줄었어요
                        </template>
                        <template v-if="bmmCmprXpsAm == 0">
                            지난달과 같아요
                        </template>
                        <div class="custom_tooltip">
                            <div class="com_tooltip_type02 com_tooltip_type03">
                                <a href="javascript:void(0);" class="com_btn_info">
                                    <em class="com_icon_info question"><span class="blind">툴팁열기</span></em>
                                    <!--!!!!!!!!!!!툴팁 화살표 관련 : 툴팁 클릭시 display : block 
                                        , 툴팁 닫을 때 display : none 처리 부탁드립니다!!!!!!!!!-->
                                    <span class="arrow" style="display:none"></span>
                                    <!--!!!!!!!!!!!툴팁 화살표 관련 : 툴팁 클릭시 display : block 
                                        , 툴팁 닫을 때 display : none 처리 부탁드립니다!!!!!!!!!-->
                                </a>
                            </div>
                            <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                <div>
                                    지출 분석은 전일자에 연결된 자산을 기준으로 분석한 결과입니다.
                                    <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                </div> <!-- 말풍선영역 -->
                            </div>
                        </div>
                    </div>
                    <div class="com_box_type01 com_box_type07 custom_box_com_box_type08 custom_box_box_shadowno custom_box_grap01">
                        <div class="compare_chart_wrap">
                            <div class="chart">
                                <div class="bg">
                                    <div class="bar_wrap">
                                        <!-- 
                                            <div class="bars big"> : 
                                                1___ big 클래스 사용시 
                                                    이번달 커짐
                                                    지난달 작아짐

                                            <div class="bars small"> : 
                                                2___ small 클래스 사용시 
                                                    지난달 작아짐
                                                    이번달 커짐

                                            <div class="bars">
                                                3___ big / small 둘다 미사용시
                                                    둘다 높이 100%
                                        -->
                                        <div class="bars big">
                                            <div class="bar bar01">
                                                <span class="tit">지난달</span>
                                                <strong class="sub_bar top" :style="'height: ' + Math.round(bmmFxtmXpsRto) + '%;'">
                                                    <span class="num"><span class="blind">지난달</span>{{Math.round(bmmFxtmXpsRto)}}%</span>
                                                </strong>
                                                <strong class="sub_bar bottom" :style="'height: ' + Math.round(bmmVarXpsRto) + '%;'">
                                                    <span class="num"><span class="blind">이번달</span>{{Math.round(bmmVarXpsRto)}}%</span>
                                                </strong>
                                            </div>
                                            <div class="bar bar02">
                                                <span class="tit">이번달</span>
                                                <strong class="sub_bar top" :style="'height: ' + Math.round(fxtmXpsRto) + '%;'">
                                                    <span class="num"><span class="blind">지난달</span>{{Math.round(fxtmXpsRto)}}%</span>
                                                </strong>
                                                <strong class="sub_bar bottom" :style="'height: ' + Math.round(varXpsRto) + '%;'">
                                                    <span class="num"><span class="blind">이번달</span>{{Math.round(varXpsRto)}}%</span>
                                                </strong>
                                            </div>
                                        </div>
                                        <div class="list_box">
                                            <p class="list01">
                                                <span>
                                                    <i class="bl_dot_list"></i>총지출</span>
                                                <strong>
                                                    <em class="num">{{totXpsAm | numberFilter}}</em>
                                                    <em class="unit">원</em>
                                                </strong>
                                            </p>
                                            <p class="list02">
                                                <span>
                                                    <i class="bl_dot_list"></i>정기지출
                                                </span>
                                                <strong>
                                                    <em class="num">{{fxtmXpsAm | numberFilter}}</em>
                                                    <em class="unit">원</em>
                                                </strong>
                                            </p>
                                            <p class="list03">
                                                <span>
                                                    <i class="bl_dot_list"></i>변동지출
                                                </span>
                                                <strong>
                                                    <em class="num">{{varXpsAm | numberFilter}}</em>
                                                    <em class="unit">원</em>
                                                </strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="txt_c" v-if="xpcXpsCnt > 0 && basYm == todayBasYm">
                        <p class="info_txt01">
                            이번달 지출이 <strong class="num com_point_darkblue">{{xpcXpsCnt | numberFilter}}</strong>건 <strong class="num com_point_darkblue">{{xpcCpsAm | numberFilter}}</strong>원 남았어요.
                        </p>
                    </div>
                    <div class="custom_box custom_list">
                        <ul class="custom_list01">
                            <!--<li><a class="custom_link custom_line01" href="javascript:void(0);" @click.prevent="openPop('LCIP1003')">변동지출 현황</a></li>-->
                            <li><a class="custom_link custom_line02" href="javascript:void(0);" @click.prevent="openPop('LCIP1010TAB')">정기지출 리포트</a></li>
                        </ul>
                    </div>
                </div>            
                <div class="com_inner">
                    <!-- 목표대비 지출 -->
                    <template v-if="xpsObtAm > 0 && basYm == todayBasYm">
                        <div class="householdBook pt15">
                            <div class="cal_pop_info_wrap com_box_type01 custom_box_com_box_type08 custom_box13 mb0">
                                <div class="new_tit_area custom_box12">
                                    <a href="javascript:void(0);" @click.prevent="fn_movePage('PDMY2001')">
                                        <strong class="com_box_tit arrow">목표대비 지출</strong>
                                    </a>
                                </div>
                                <p class="info_txt01">
                                    <template v-if="obtCmprDsc == '1'">
                                        예산이 <strong class="num">{{xpsObtCmprAm | numberFilter}}</strong>원 남았어요.
                                    </template>
                                    <template v-if="obtCmprDsc == '2'">
                                        예산이 <strong class="num">{{xpsObtCmprAm | numberFilter}}</strong>원 넘었어요.
                                    </template>
                                    <template v-if="obtCmprDsc == '3'">
                                        예산이 <strong class="num">{{xpsObtCmprAm | numberFilter}}</strong>원 남았어요.
                                    </template>
                                </p>
                                <div class="car_pop_bar_area">
                                    <div class="com_box_type01 goal_warp no-stroke no-shadow">
                                        <div class="goal_box m0">
                                            <div class="progressBar_wrapper">
                                                <div class="progressBar mt5">
                                                    <div class="bar" :style="'width:' + xpsRzsRto + '%'">
                                                    </div>
                                                </div>
                                                <div class="date">
                                                    <div class="ed">
                                                        <span class="unit-tit">지출</span>
                                                        <p>
                                                            <em class="num">{{xpsRzsAm | numberFilter}}</em>
                                                            <span class="unit">원</span>
                                                        </p>
                                                    </div>
                                                    <div class="st">
                                                        <span class="unit-tit">목표</span>
                                                        <p>
                                                            <em class="num">{{xpsObtAm | numberFilter}}</em>
                                                            <span class="unit">원</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </template>
                    <!--// 목표대비 지출 -->

                    <!-- 지출목표 등록이 안된 경우 -->
                    <template v-if="xpsObtAm == 0 && basYm == todayBasYm">
                        <div class="householdBook pt15">
                            <div class="cal_pop_info_wrap com_box_type01 custom_box_com_box_type08 custom_box13 mb0 txt_c">
                                <p class="custom_box_link01">
                                    <a href="javascript:void(0);" @click.prevent="openPopPDMY()">한 달 지출 계획하고 관리해 보세요</a>
                                </p>
                            </div>
                        </div>
                    </template>
                    <!--// 지출목표 등록이 안된 경우 -->

                    <!-- 지출 수단 -->
                    <div class="com_sub_radius custom_box com_submainbox_type01-03 custom_box14">
                        <div class="com_box_type01">
                            <div class="titbox_type01">
                                <strong>지출 수단</strong>
                            </div>
                            <div class="com_box_type02">
                                <strong class="blind">지출 수단</strong>
                                <div class="com_box_type01">
                                    <div class="txt ty2">
                                        <!-- 증가 -->
                                        <p class="in_txt">
                                            <template v-if="indDsc == '1'">
                                                지난달 보다 {{maxIndStlDscNm}} 지출이 
                                                <span><strong class="num">{{maxIndAm | numberFilter}}</strong>원 늘었어요</span>
                                            </template>
                                            <template v-if="indDsc == '2'">
                                                지난달 보다 {{maxIndStlDscNm}} 지출이 
                                                <span><strong class="num">{{maxIndAm | numberFilter}}</strong>원 줄었어요</span>
                                            </template>
                                            <template v-if="indDsc == '3'">
                                                지난달과 지출이 같아요
                                            </template>
                                        </p>
                                        <!-- 감소 -->
                                        <!-- <p class="in_txt">
                                            지난달 보다 카드 지출이 
                                            <span><strong class="num">123,000,000</strong>원 줄었어요</span>
                                        </p> -->
                                        <!-- 동일 -->
                                        <!-- <p class="in_txt">
                                            지난달 보다 카드 지출이 
                                            <span><strong class="num">123,000,000</strong>원 같아요</span>
                                        </p> -->
                                    </div>
                                    
                                    <div class="duel_Pie_chart">
                                        <div class="chart_box">
                                            <div class="graph_box">
                                                <div id="chartHolder" class="chartHolder" aria-hidden="true"></div>
                                                <div class="block_list">
                                                    <ul class="list">
                                                        <li class="bl_lightcyan">
                                                            <a href="javascript:void(0);" class="arrow" title="카드 지출 금액 상세보기" @click.prevent="openPopLCLE('LCLE1102')">
                                                                <span class="pie_tit">카드<strong class="num">{{Math.round(cardXpsTtRto * 10) / 10}}%</strong></span>
                                                                <strong class="pie_p num">{{cardXpsTtAm | numberFilter}}원</strong>
                                                            </a>
                                                        </li>
                                                        <li class="bl_orange">
                                                            <a href="javascript:void(0);" class="arrow" title="페이 지출 금액 상세보기" @click.prevent="openPopLCLE('LCLE1105')">
                                                                <span class="pie_tit">페이<strong class="num">{{Math.round(pymXpsTtRto * 10) / 10}}%</strong></span>
                                                                <strong class="pie_p num">{{pymXpsTtAm | numberFilter}}원</strong>
                                                            </a>
                                                        </li>
                                                        <li class="bl_red">
                                                            <a href="javascript:void(0);" class="arrow" title="선불 지출 금액 상세보기" @click.prevent="openPopLCLE('LCLE1117')">
                                                                <span class="pie_tit">선불<strong class="num">{{Math.round(pycdXpsTtAmRto * 10) / 10}}%</strong></span>
                                                                <strong class="pie_p num">{{pycdXpsTtAm | numberFilter}}원</strong>
                                                            </a>
                                                        </li>
                                                        <li class="bl_blue">
                                                            <a href="javascript:void(0);" class="arrow" title="기타 지출 금액 상세보기" @click.prevent="openPopLCLE('LCLE1104')">
                                                                <span class="pie_tit">기타<strong class="num">{{Math.round(etcXpsTtRto * 10) / 10}}%</strong></span>
                                                                <strong class="pie_p num">{{etcXpsTtAm | numberFilter}}원</strong>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--// 지출 수단 -->

                    <template v-if="ctgrList.length > 0">
                        <div :class="'custom_box_info_wrap ' + fn_getCssToCateId(ctgrList[0].xpsCtgrC).styleId">
                            <p class="top_txt">{{cusnm}}님의 소비스타일은?</p>
                            <template v-if="fn_getCssToCateId(ctgrList[0].xpsCtgrC).styleDesc">
                                <p class="bottom_txt"><strong class="com_point_darkblue">{{fn_getCssToCateId(ctgrList[0].xpsCtgrC).styleDesc}}</strong> 입니다.</p>
                            </template>
                            <template v-else>
                                <p class="bottom_txt"><strong class="com_point_darkblue">분류가 필요해요</strong></p>
                            </template>
                        </div>

                        <div class="custom_box_ranking_list mb0">
                            <ol>
                                <template v-for="(ctgr, idx) in ctgrList">
                                    <li :key="idx">
                                        <div :class="'nemo_list rank0' + (idx+1) + (ctgr.nodata == 'Y' ? ' nodata' : '')">
                                            <span class="ranking"><em class="blind">{{idx+1}}위</em></span>
                                            <template v-if="ctgr.nodata == 'N'">
                                                <strong class="tit">{{ctgr.xpsCtgrNm}}</strong>
                                                <strong class="num percent">{{Math.round(ctgr.xpsRto)}}%</strong>
                                                <strong class="num">{{ctgr.xpsAm | numberFilter}}<em class="unit">원</em></strong>
                                            </template>
                                        </div>
                                    </li>
                                </template>
                                <!--
                                <li>
                                    <div class="nemo_list rank01">
                                        <span class="ranking"><em class="blind">1위</em></span>
                                        <strong class="tit">카페&middot;베이커리</strong>
                                        <strong class="num percent">60%</strong>
                                        <strong class="num">45,000,000<em class="unit">원</em></strong>
                                    </div>
                                </li>
                                <li>
                                    <div class="nemo_list rank02">
                                        <span class="ranking"><em class="blind">2위</em></span>
                                        <strong class="tit">외식</strong>
                                        <strong class="num percent">34%</strong>
                                        <strong class="num">2,200,000<em class="unit">원</em></strong>
                                    </div>
                                </li>
                                <li>
                                    <div class="nemo_list rank03">
                                        <span class="ranking"><em class="blind">3위</em></span>
                                        <strong class="tit">생활&middot;마트</strong>
                                        <strong class="num percent">22%</strong>
                                        <strong class="num">1,500,000<em class="unit">원</em></strong>
                                    </div>
                                </li>
                                <li>
                                    <div class="nemo_list rank04">
                                        <span class="ranking"><em class="blind">4위</em></span>
                                        <strong class="tit">의료&middot;건강</strong>
                                        <strong class="num percent">17%</strong>
                                        <strong class="num">220,000<em class="unit">원</em></strong>
                                    </div>
                                </li>
                                -->
                            </ol>
                        </div>
                    </template>

                    <!-- 카테고리별 지출 상세 -->
                    <div class="com_btn_area custom_box_com_btn_area mt15">
                        <a href="javascript:void(0);" role="button" class="com_btn_round"><span class="btn_plus black" @click.prevent="openPop('LCIP1004TAB')">카테고리별 지출 상세</span></a>
                    </div>
                    <!--// 카테고리별 지출 상세 -->

                    <!-- 또래와의 지출비교 -->
                    <div class="householdBook householdBook02">
                        <div class="cal_pop_info_wrap com_box_type01 custom_box_com_box_type08 custom_box13">
                            <div class="new_tit_area custom_box12">
                                <strong class="com_box_tit">또래와의 지출비교</strong>
                            </div>
                            <div class="custom_box_com_box_list01">
                                <div class="new_tit_area">
                                    <a href="javascript:void(0);">
                                        <template v-for="(peer, idx) in peerAttrView.split('^')">
                                            <template v-if="idx == 0">
                                                <em class="unit txt02" :key="idx">{{peer}}</em>
                                            </template>
                                            <template v-if="idx == 1">
                                                <em class="unit txt03" :key="idx">{{peer}}</em>
                                            </template>
                                        </template>
                                        <!--
                                        <em class="unit txt02">#30대 후반</em>
                                        <em class="unit txt03">#급여소득자 김농협의 금융생활</em>
                                        -->
                                    </a>
                                </div>
                            </div>
                            <div class="car_pop_bar_area">
                                <div class="com_box_type01 goal_warp no-stroke no-shadow">
                                    <div class="goal_box m0">
                                        <div class="progressBar_wrapper">
                                            <div class="progressBar mt5">
                                                <div class="bar" style="width:55%">
                                                    <div class="ed">
                                                        <strong class="unit-tit">또래 지출</strong>
                                                        <p>
                                                            <strong class="num">{{peerXpsAm | numberFilter}}</strong>
                                                            <span class="unit">원</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="st">
                                                    <strong class="unit-tit">내 지출</strong>
                                                    <p>
                                                        <em class="num">{{totXpsAm | numberFilter}}</em>
                                                        <span class="unit">원</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>	
                            </div>
                            <div class="custom_box_linst01 arrow" v-if="peerAttr">
                                <a href="javascript:void(0);" @click.prevent="openPop('LCIP1007')">또래 엿보기</a>
                            </div>
                        </div>
                    </div>
                    <!--// 또래와의 지출비교 -->

                    <!-- 많은 금액을 지출한 곳 -->
                    <template v-if="mchtByAmtList.length > 0">
                        <div class="custom_box_ranking_list02_wrap">
                            <div class="new_tit_area custom_box12 custom_box_ranking_list02">
                                <a href="javascript:void(0);" @click.prevent="openPop('LCIP1008')"><strong class="com_box_tit arrow">많은 금액을 지출한 곳</strong></a>
                            </div>
                            <div class="custom_box_ranking_list custom_box_ranking_list02">
                                <template v-if="mchtByAmtList.length > 0">
                                    <div class="box" :key="0">
                                        <div :class="'nemo_list rank01' + (mchtByAmtList[0].nodata == 'Y' ? ' nodata' : '')">
                                            <span class="ranking"><em class="blind">1위</em></span>
                                            <template v-if="mchtByAmtList[0].nodata == 'N'">
                                                <strong class="tit">{{mchtByAmtList[0].prcMchtnm}}</strong>
                                                <strong class="num">{{mchtByAmtList[0].xpsAm | numberFilter}}<em class="unit">원</em></strong>
                                            </template>
                                        </div>
                                    </div>
                                </template>
                                <div class="box">
                                    <template v-for="(mchtByAmtInfo, idx) in mchtByAmtList">
                                        <template v-if="idx > 0">
                                            <div :class="'nemo_list rank0' + (idx+1) + (mchtByAmtInfo.nodata == 'Y' ? ' nodata' : '')" :key="idx">
                                                <span class="ranking"><em class="blind">{{idx+1}}위</em></span>
                                                <template v-if="mchtByAmtInfo.nodata == 'N'">
                                                    <strong class="tit">{{mchtByAmtInfo.prcMchtnm}}</strong>
                                                    <strong class="num">{{mchtByAmtInfo.xpsAm | numberFilter}}<em class="unit">원</em></strong>
                                                </template>
                                            </div>
                                        </template>
                                    </template>
                                </div>
                                <!--
                                <div class="box">
                                    <div class="nemo_list rank01">
                                        <span class="ranking"><em class="blind">1위</em></span>
                                        <strong class="tit">산드로</strong>
                                        <strong class="num">345,000,000<em class="unit">원</em></strong>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="nemo_list rank02">
                                        <span class="ranking"><em class="blind">2위</em></span>
                                        <strong class="tit">에르메스</strong>
                                        <strong class="num">9,200,000<em class="unit">원</em></strong>
                                    </div>
                                    <div class="nemo_list rank03">
                                        <span class="ranking"><em class="blind">3위</em></span>
                                        <strong class="tit">딥디크</strong>
                                        <strong class="num">1,500,000<em class="unit">원</em></strong>
                                    </div>
                                </div>
                                -->
                            </div>
                        </div>
                    </template>
                    <!--// 많은 금액을 지출한 곳 -->

                    <!-- 자주 이용하는 곳 -->
                    <template v-if="mchtByCntList.length > 0">
                        <div class="custom_box_ranking_list02_wrap">
                            <div class="new_tit_area custom_box12 custom_box_ranking_list03">
                                <a href="javascript:void(0);" @click.prevent="openPop('LCIP1009')"><strong class="com_box_tit arrow">자주 이용하는 곳</strong></a>
                            </div>
                            <div class="custom_box_ranking_list custom_box_ranking_list03">
                                <template v-if="mchtByCntList.length > 0">
                                    <div class="box" :key="0">
                                        <div :class="'nemo_list rank01' + (mchtByCntList[0].nodata == 'Y' ? ' nodata' : '')">
                                            <span class="ranking"><em class="blind">1위</em></span>
                                            <template v-if="mchtByCntList[0].nodata == 'N'">
                                                <strong class="tit">{{mchtByCntList[0].prcMchtnm}}</strong>
                                                <strong class="num">{{mchtByCntList[0].xpsCnt}}<em class="unit">회</em></strong>
                                            </template>
                                        </div>
                                    </div>
                                </template>
                                <div class="box">
                                    <template v-for="(mchtByCntInfo, idx) in mchtByCntList">
                                        <template v-if="idx > 0">
                                            <div :class="'nemo_list rank0' + (idx+1) + (mchtByCntInfo.nodata == 'Y' ? ' nodata' : '')" :key="idx">
                                                <span class="ranking"><em class="blind">{{idx+1}}위</em></span>
                                                <template v-if="mchtByCntInfo.nodata == 'N'">
                                                    <strong class="tit">{{mchtByCntInfo.prcMchtnm}}</strong>
                                                    <strong class="num">{{mchtByCntInfo.xpsCnt}}<em class="unit">회</em></strong>
                                                </template>
                                            </div>
                                        </template>
                                    </template>
                                </div>
                                <!--
                                <div class="box">
                                    <div class="nemo_list rank01">
                                        <span class="ranking"><em class="blind">1위</em></span>
                                        <strong class="tit">신세계 하남<br/>스타필드</strong>
                                        <strong class="num">345,000,000<em class="unit">원</em></strong>
                                    </div>
                                </div>				
                                <div class="box">
                                    <div class="nemo_list rank02">
                                        <span class="ranking"><em class="blind">2위</em></span>
                                        <strong class="tit">박승철헤어</strong>
                                        <strong class="num">2,200,000<em class="unit">원</em></strong>
                                    </div>
                                    <div class="nemo_list rank03">
                                        <span class="ranking"><em class="blind">3위</em></span>
                                        <strong class="tit">스타벅스</strong>
                                        <strong class="num">500,000<em class="unit">원</em></strong>
                                    </div>
                                </div>
                                -->
                            </div>
                        </div>
                        <!--// 자주 이용하는 곳 -->
                    </template>
                </div>
            </div>

            <div class="complete" v-if="showFlagYN == 'N'">
                <div class="secede_box">
                    <p class="txt">
                        합리적인 소비를 하고 있나요?<br/>
                        지출 분석을 위해 데이터가 필요해요.
                    </p>
                </div>
                <div class="new_add_register custom_box">
                    <a href="javascript:void(0);" @click.prevent="fn_openAssetPage()"><span>자산을 연결하고 관리해 보세요</span></a>
                </div>
            </div>
        </div>
        <!--// content -->

        <footersV2 type="lc" />
    </page>
</template>

<script>
import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import LcCategoryV2 from '@/components/category/LcCategoryV2.vue'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import {dateFormat, monthAdd} from '@/utils/date'
import {infoToolipHandler} from '@/utils/jUtils'

import LCIP1002 from '@/views/page/LC/IP/LCIP1002/LCIP1002' // 지난달 지출 비교
import LCIP1003 from '@/views/page/LC/IP/LCIP1003/LCIP1003' // 변동지출 현황
import LCIP1004TAB from '@/components/category/LcIp1004Tab' // 카테고리별 지출
import LCIP1007 from '@/views/page/LC/IP/LCIP1007/LCIP1007' // 또래 지출 비교
import LCIP1008 from '@/views/page/LC/IP/LCIP1008/LCIP1008' // 지출 금액 TOP10
import LCIP1009 from '@/views/page/LC/IP/LCIP1009/LCIP1009' // 지출 횟수 TOP3
import LCIP1010TAB from '@/components/category/LcIp1010Tab' // 정기지출 리포트

import PDMY2005 from '@/views/page/PD/MY/PDMY2005/PDMY2005' // 목표등록

import LCLE1102 from '@/views/page/LC/LE/LCLE1102/LCLE1102' // 카드 지출내역
import LCLE1104 from '@/views/page/LC/LE/LCLE1104/LCLE1104' // 기타 지출내역
import LCLE1105 from '@/views/page/LC/LE/LCLE1105/LCLE1105' // 페이머니 지출내역
import LCLE1117 from '@/views/page/LC/LE/LCLE1117/LCLE1117' // 선불카드 지출내역

import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001' // 자산연결

export default {
    name : "LCIP2001",
    data: () => {
        return {
            cusNb: '',              // 마이데이터고객번호
            cusnm: '',              // 고객명
            showFlagYN: '',         // 최근 2개월 지출내역이 있으면 'Y'
            executeCnt: 0,          // 실행 count

            monPrev: false,         // 이전달 조회
            monNext: false,         // 다음달 조회
            basYm: null,            // 조회 기준년월 YYYYMM
            basYy: null,            // 조회 기준년도 YYYY
            basMm: null,            // 조회 기준월   MM
            befBasYm: null,         // 조회 기준년월 YYYYMM (현재년월의 지난달)
            befBasYy: null,         // 조회 기준년도 YYYY   (현재년월의 지난달)
            befBasMm: null,         // 조회 기준월   MM     (현재년월의 지난달)
            initBasYm: '',          // 초기 기준년월
            todayBasYm: '',         // 현재년월

            totXpsAm: 0,            // 총지출금액
            bmmTotXpsAm: 0,         // 전월총지출금액
            bmmCmprXpsAm: 0,        // 전월대비지출금액
            fxtmXpsAm: 0,           // 정기지출금액
            varXpsAm: 0,            // 변동지출금액
            xpcCpsAm: 0,            // 예상지출금액
            xpcXpsCnt: 0,           // 예상지출횟수
            fxtmXpsRto: 0,          // 정기지출비율
            bmmFxtmXpsRto: 0,       // 정기지출비율(전월)
            varXpsRto: 0,           // 변동지출비율
            bmmVarXpsRto: 0,        // 변동지출비율(전월)

            peerXpsAm: 0,           // 또래지출금액
            peerNo: '',             // 또래번호
            peerAttr: '',           // 또래속성
            peerAttrView: '',       // 또래속성
            peerCompXpsAm: 0,       // 또래대비지출비율

            obtCmprDsc: '',         // 목표대비구분코드
            xpsObtAm: 0,            // 지출목표금액
            xpsRzsAm: 0,            // 지출실적금액
            xpsObtCmprAm: 0,        // 목표대비지출실적금액
            xpsRzsRto: 0,           // 목표대비지출실적비율

            indDsc: '',             // 증감구분코드
            maxIndStlDscNm: '',     // 최대증감결제구분명
            maxIndAm: 0,            // 최대증감금액
            cardXpsTtAm: 0,         // 카드지출금액
            cardXpsTtRto: 0,        // 카드지출비율
            pymXpsTtAm: 0,          // 페이지출금액
            pymXpsTtRto: 0,         // 페이지출비율
            pycdXpsTtAm: 0,         // 선불지출금액
            pycdXpsTtAmRto: 0,      // 선불지출비율
            etcXpsTtAm: 0,          // 기타지출금액
            etcXpsTtRto: 0,         // 기타지출비율            
            
            ctgrList: [],           // 카테고리 TOP4
            mchtByAmtList: [],      // 거래치별 금액순 TOP3
            mchtByCntList: [],      // 거래처별 횟수순 TOP3

            tmp: ''
        }
    },
    computed : {
    },
    created() {
        this.todayBasYm = dateFormat(new Date(), "YYYYMM")
        this.cusNb = this.getUserInfo("mydtCusno")
        this.cusnm = this.getUserInfo("cusnm")
    },
    mounted() {
        // console.log('LCIP2001 mounted')
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            // this.basYm = dateFormat(dayAdd(-1, new Date()), "YYYYMM")
            // this.fn_moveMonth('')
            this.getBasYm()
        },
        /*
         * 기준일 조회
         */
        getBasYm() {
            const config = {
                url: '/lc/ip/11ra1', // 기준일 조회 : 인터페이스ID: IF-MOB-PFM-LCA11, 서비스코드: PFMLCIP11RA1
                data: {
                    "mydtCusno" : this.cusNb
                }
            }
            apiService.call(config).then(response =>{
                this.basYm = response.basYm
                if (!this.initBasYm) this.initBasYm = response.basYm
                // console.log('basYm', this.basYm)
                if (this.basYm) {
                    this.fn_moveMonth('')
                } else {
                    this.showFlagYN = 'N'
                    return
                }

                this.getData()
            })
        },
        /*
         * 데이터 조회
         */
        getData() {
            const config = {
                url: '/lc/ip/01ra1', // 인터페이스ID: IF-MOB-PFM-LCA01, 서비스코드: PFMLCIP01RA1
                data: {
                    "mydtCusno" : this.cusNb,
                    "basYm" : this.basYm
                }
            }
            this.executeCnt++
            apiService.call(config).then(response =>{
                // console.log('response', JSON.parse(JSON.stringify(response)))
                this.totXpsAm = response.cusMmtpXpsOut.totXpsAm || 0 // 총지출금액
                this.bmmTotXpsAm = response.cusMmtpXpsOut.bmmTotXpsAm || 0 // 전월총지출금액
                this.bmmCmprXpsAm = response.cusMmtpXpsOut.bmmCmprXpsAm || 0 // 전월대비지출금액

                if (this.executeCnt == 1) {
                    this.showFlagYN = this.totXpsAm > 0 || this.bmmTotXpsAm > 0 ? 'Y' : 'N'
                    if (this.showFlagYN == 'N') return
                }

                this.fxtmXpsAm = response.cusMmtpXpsOut.fxtmXpsAm || 0 // 정기지출금액
                this.varXpsAm = response.cusMmtpXpsOut.varXpsAm || 0 // 변동지출금액
                this.xpcCpsAm = response.cusMmtpXpsOut.xpcCpsAm || 0 // 예상지출금액
                this.xpcXpsCnt = response.cusMmtpXpsOut.xpcXpsCnt || 0 // 예상지출횟수
                this.fxtmXpsRto = response.cusMmtpXpsOut.fxtmXpsRto || 0 // 정기지출비율
                this.bmmFxtmXpsRto = response.cusMmtpXpsOut.bmmFxtmXpsRto || 0 // 정기지출비율(전월)
                this.varXpsRto = response.cusMmtpXpsOut.varXpsRto || 0 // 변동지출비율
                this.bmmVarXpsRto = response.cusMmtpXpsOut.bmmVarXpsRto || 0 // 변동지출비율(전월)

                this.peerXpsAm = response.cusMmtpXpsOut.peerXpsAm || 0 // 또래지출금액
                this.peerNo = response.cusMmtpXpsOut.peerNo || '' // 또래번호
                this.peerAttr = response.cusMmtpXpsOut.peerAttr || '' // 또래속성
                this.peerAttrView = this.peerAttr + ' ' + this.cusnm + '님의 금융생활'  || '' // 또래속성
                this.peerCompXpsAm = this.totXpsAm + this.peerXpsAm != 0 ? Math.round(this.totXpsAm / (this.totXpsAm + this.peerXpsAm) * 100) : 0 // 또래대비지출비율

                this.obtCmprDsc = response.stlXpsOut.obtCmprDsc || '' // 목표대비구분코드
                this.xpsObtAm = response.stlXpsOut.xpsObtAm || 0 // 지출목표금액
                this.xpsRzsAm = response.stlXpsOut.xpsRzsAm || 0 // 지출실적금액
                this.xpsObtCmprAm = response.stlXpsOut.xpsObtCmprAm || 0 // 목표대비지출실적금액

                // 목표대비지출실적비율
                let xpsRzsRto = this.xpsObtAm > 0 ? Math.round(this.xpsRzsAm / this.xpsObtAm * 100) : 0
                xpsRzsRto = xpsRzsRto > 100 ? 100 : xpsRzsRto
                this.xpsRzsRto = xpsRzsRto

                this.indDsc = response.stlXpsOut.indDsc // 증감구분코드
                let maxIndStlDsc = response.stlXpsOut.maxIndStlDsc // 최대증감결제구분코드
                this.maxIndAm = response.stlXpsOut.maxIndAm // 최대증감금액
                this.cardXpsTtAm = response.stlXpsOut.cardXpsTtAm // 카드지출금액
                this.cardXpsTtRto = response.stlXpsOut.cardXpsTtRto // 카드지출비율
                this.pymXpsTtAm = response.stlXpsOut.pymXpsTtAm // 페이지출금액
                this.pymXpsTtRto = response.stlXpsOut.pymXpsTtRto // 페이지출비율
                this.pycdXpsTtAm = response.stlXpsOut.pycdXpsTtAm // 선불지출금액
                this.pycdXpsTtAmRto = response.stlXpsOut.pycdXpsTtAmRto // 선불지출비율
                this.etcXpsTtAm = response.stlXpsOut.etcXpsTtAm // 기타지출금액
                this.etcXpsTtRto = response.stlXpsOut.etcXpsTtRto // 기타지출비율  

                // 최대증감결제구분명
                if (maxIndStlDsc == '1') {
                    this.maxIndStlDscNm = "카드"
                } else if (maxIndStlDsc == '2') {
                    this.maxIndStlDscNm = "페이머니"
                } else if(maxIndStlDsc == '3') {
                    this.maxIndStlDscNm = "기타"
                } else if (maxIndStlDsc == '4') {
                    this.maxIndStlDscNm = "선불카드"
                }

                this.ctgrList = this.fn_arrPad(response.ctgrList || [], 4) // 카테고리 TOP4
                this.mchtByAmtList = this.fn_arrPad(response.mchtByAmtList, 3) || [] // 거래치별 금액순 TOP3
                this.mchtByCntList = this.fn_arrPad(response.mchtByCntList, 3) || [] // 거래처별 횟수순 TOP3

                this.$nextTick(()=>{
                    if (this.executeCnt == 1) infoToolipHandler() // 툴팁 클릭이벤트 생성

                    this.makeChart()
                })
            })
        },
        /*
         * list 객체를 size 크기만큼 채운다.
         * 단, list 객체의 length가 0인 경우에는 채우지 않는다.
         */
        fn_arrPad(list, size) {
            if (list.length == 0) return list
            for (let i = 0; i < size; i++) {
                if (i < list.length) {
                    list[i]['nodata'] = 'N'
                } else {
                    list.push({ nodata: 'Y' })
                }
            }
            return list
        },
        /*
         * 결제수단별 차트
         */
        makeChart() {
			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			rMateChartH5.create("lcip1001Chart", "chartHolder", "useContextMenu=false", "100%", "130px");
			let layoutStr =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none" >'
					// +'<Options>'
					// +'<Caption text="Web Browser Market Share"/>'
					// +'<Legend useVisibleCheck="true"/>'
					// +'</Options>'
					// +'<CurrencyFormatter id="numFmt" currencySymbol="%" alignSymbol="right"/>'
                    +'<Pie2DChart showDataTips="true" innerRadius="0.5" displayCompleteCallFunction="rMateFunction.lcipRemoveTabindex">'
					/* Pie2D 차트 생성시에 필요한 Pie2DChart 정의합니다. */
					/* showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다. */
						+'<series>'
							+'<Pie2DSeries nameField="browser" field="share" color="#ffffff" zeroValueEnable="true">'
							/* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
								+'<fills>'
									+'<SolidColor color="#57c9ae"/>'/* 카드 */
									+'<SolidColor color="#fdbb68"/>'/*페이*/
									+'<SolidColor color="#fa7288"/>'/*선불*/
									+'<SolidColor color="#668ee2"/>'/*기타*/
								+'</fills>'
								+'<showDataEffect>'
								/* 차트 생성시에 Effect를 주고 싶을 때 showDataEffect정의합니다 */
									+'<SeriesSlide  duration="1000"/>'
									/* SeriesSlide 효과는 시리즈 데이터가 데이터로 표시될 때 한쪽에서 미끄러지듯 나타나는 효과를 적용합니다. */
									/* elementOffset : effect를 지연시키는 시간을 지정합니다 default:20 */
									/* minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0 */
									/* 이 값보다 짧은 시간에 effect가 실행되지 않습니다. */
									/* offset : effect개시의 지연시간을 설정합니다 default:0 */
									/* perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다. */
									/* direction : left:왼쪽, right:오른쪽, up:위, down:아래 default는 left입니다. */
								+'</showDataEffect>'
							+'</Pie2DSeries>'
						+'</series>'
						+'<annotationElements>'
							+'<CanvasElement>'
								+'<CanvasLabel horizontalCenter="0" height="24" fontSize="14" fontWeight="bold" verticalCenter="0" text="" color="#333333"/>'
							+'</CanvasElement>'
						+'</annotationElements>'
					+'</Pie2DChart>'
					
                +'</rMateChart>';
            
			// 차트 데이터
			let chartData =
				[
					{ browser: '카드', share: this.cardXpsTtAm },
					{ browser: '페이', share: this.pymXpsTtAm },
					{ browser: '선불', share: this.pycdXpsTtAm },
					{ browser: '기타', share: this.etcXpsTtAm }
                ]
                
            // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
            //
            // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
            // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
            // 
            // 아래 내용은 
            // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
            // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
			rMateChartH5.calls("lcip1001Chart", {
				"setLayout" : layoutStr,
				"setData" : chartData,
			});
        },
        /*
         * 기준일 이동 및 재조회 이벤트
         */
        btn_moveMonth(dsc) {
            this.fn_moveMonth(dsc);
            this.getData();
        },
        /*
         * 기준일자 계산
         */
        fn_moveMonth(dsc) {
            if (this.monPrev && dsc == "P") {
                this.basYm = monthAdd(-1, this.basYm, "YYYYMM");
            }

            if (this.monNext && dsc == "N") {
                this.basYm = monthAdd(1, this.basYm, "YYYYMM");
            }

            this.basYy = dateFormat(this.basYm, "YYYY");
            this.basMm = dateFormat(this.basYm, "M");

            this.befBasYm = dateFormat(monthAdd(-1, this.basYm), 'YYYYMM'); // 선택한 월의 지난달
            this.befBasYy = dateFormat(this.befBasYm, "YYYY");
            this.befBasMm = dateFormat(this.befBasYm, "M");

            // 다음달 조회 가능여부
            let maxMonth = this.initBasYm ? this.initBasYm : dateFormat(monthAdd(0), 'YYYYMM');
            this.monNext = this.basYm < maxMonth ? true : false;

            // 이전달 조회 가능여부
            let minMonth = this.initBasYm ? dateFormat(monthAdd(-12, this.initBasYm), 'YYYYMM') : dateFormat(monthAdd(-12), 'YYYYMM');
            this.monPrev = this.basYm > minMonth ? true : false;
        },
        /*
         * 팝업
         */
        openPop(viewName) {
            let compName;

            if (viewName == 'LCIP1002') compName = LCIP1002 // 지난달 지출 비교
            if (viewName == 'LCIP1003') compName = LCIP1003 // 변동지출 현황
            if (viewName == 'LCIP1004TAB') compName = LCIP1004TAB // 카테고리별 지출 상세
            if (viewName == 'LCIP1007') compName = LCIP1007 // 또래 지출 비교
            if (viewName == 'LCIP1008') compName = LCIP1008 // 지출 금액 TOP10
            if (viewName == 'LCIP1009') compName = LCIP1009 // 지출 횟수 TOP3
            if (viewName == 'LCIP1010TAB') compName = LCIP1010TAB // 정기지출 리포트

            if (viewName == 'PDMY2005') compName = PDMY2005 // 목표등록

            if (compName == null) {
                modalService.alert("미적용")
                return;
            }

            let param = { "pBasYm" : this.basYm }

            // 또래 지출 비교 팝업
            if (viewName == 'LCIP1007') {
                param["peerNo"] = this.peerNo
            }

            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(() => {
                if (viewName == 'PDMY2005') {
                    this.getData()
                }
            })
        },
        /*
         * 목표등록 팝업
         */
        openPopPDMY() {
            const config = {
                component: PDMY2005
            }
            modalService.openPopup(config).then((response) => {
                if (response == "reSelect") {
                    this.getData()
                }
            })
        },
        /*
         * 결제수단별 팝업
         */
        openPopLCLE(viewName) {
            let compName;

            if (viewName == 'LCLE1102') compName = LCLE1102 // 카드
            if (viewName == 'LCLE1104') compName = LCLE1104 // 기타
            if (viewName == 'LCLE1105') compName = LCLE1105 // 페이
            if (viewName == 'LCLE1117') compName = LCLE1117 // 선불카드

            // selectList ALL 카드상세화면 호출시 전체카드로 표기용
            // inqDsc     ALL 기타상세화면 호출시 전체로 표기용
            var param = { "mydtCusno": this.cusNb, "inqYm": this.basYm, "cdcoCdWrsnm": "전체카드", "infOfrmnOrgC": "", "mydtCdId": "" }
            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(() => {
                //this.getData();
            })
        },
        // 년월 슬라이드팝업 호출
        openSlideMonthPop() {
            // if (this.monLimit == 0) { return; }

            let maxMonth = this.initBasYm ? this.initBasYm : dateFormat(monthAdd(0), 'YYYYMM')
            let minMonth = this.initBasYm ? dateFormat(monthAdd(-12, this.initBasYm), 'YYYYMM') : dateFormat(monthAdd(-12), 'YYYYMM')

            const config = {
                params: {
                    title        : '년월 선택',
                    yyyymm       : this.basYm,
                    limit        : 0,
                    includeCurYm : 'Y', // 현재월 포함여부
                    limitFromTo  : { minMonth, maxMonth }
                }
            }

            modalService.openSlideSelectMonth(config).then(response => {
                this.basYm = response
                this.fn_moveMonth('')
                this.getData();
            })
        },
        /*
         * 자산등록 팝업
         */
        fn_openAssetPage() {
            const config = {
                component: COAR2001,
            }
            modalService.openPopup(config).then(() => {
                //this.getData()
            })
        },
        /*
         * 소비스타일 기준표
         */
        fn_getCssToCateId(cateId) {
            let cateList = [
                {"ctgrId": "AS20000001", "summaryId":"cate01", "styleId":"img01", "ctgrnm": "쇼핑", "styleDesc":"쇼핑러버형"},
                {"ctgrId": "AS20000002", "summaryId":"cate02", "styleId":"img02", "ctgrnm": "가구/침구", "styleDesc":"인테리어 관심형"},
                {"ctgrId": "AS20000003", "summaryId":"cate03", "styleId":"img03", "ctgrnm": "외식", "styleDesc":"즐거운 외식형"},
                {"ctgrId": "AS20000004", "summaryId":"cate04", "styleId":"img04", "ctgrnm": "카페/베이커리", "styleDesc":"커피홀릭형"},
                {"ctgrId": "AS20000005", "summaryId":"cate05", "styleId":"img05", "ctgrnm": "생활/마트", "styleDesc":"생활비 집중형"},
                {"ctgrId": "AS20000006", "summaryId":"cate06", "styleId":"img06", "ctgrnm": "자동차", "styleDesc":"내차 관리형"},
                {"ctgrId": "AS20000007", "summaryId":"cate07", "styleId":"img07", "ctgrnm": "교통", "styleDesc":"대중교통 사랑형"},
                {"ctgrId": "AS20000008", "summaryId":"cate08", "styleId":"img08", "ctgrnm": "여행/숙박", "styleDesc":"힐링 추구형"},
                {"ctgrId": "AS20000009", "summaryId":"cate09", "styleId":"img09", "ctgrnm": "문화/레저", "styleDesc":"워라벨 추구형"},
                {"ctgrId": "AS20000010", "summaryId":"cate10", "styleId":"img10", "ctgrnm": "의료/건강", "styleDesc":"건강이 최고"},
                {"ctgrId": "AS20000011", "summaryId":"cate11", "styleId":"img11", "ctgrnm": "뷰티/미용", "styleDesc":"아름다운 삶"},
                {"ctgrId": "AS20000012", "summaryId":"cate12", "styleId":"img12", "ctgrnm": "교육", "styleDesc":"자기계발"},
                {"ctgrId": "AS20000013", "summaryId":"cate13", "styleId":"img13", "ctgrnm": "금융", "styleDesc":"금융생활"},
                {"ctgrId": "AS20000014", "summaryId":"cate14", "styleId":"img14", "ctgrnm": "주거/통신", "styleDesc":"집콕생활"},
                {"ctgrId": "AS20000015", "summaryId":"cate15", "styleId":"img15", "ctgrnm": "자녀/육아", "styleDesc":"자녀돌봄"},
                {"ctgrId": "AS20000016", "summaryId":"cate16", "styleId":"img16", "ctgrnm": "기타", "styleDesc":""},
                {"ctgrId": "AS20000000", "summaryId":"cate17", "styleId":"img17", "ctgrnm": "미분류", "styleDesc":""},
            ]

            let findIdx = -1
            if (cateId) findIdx = cateList.findIndex(x => x.ctgrId === cateId)

            if (findIdx > -1) {
                return cateList[findIdx]
            } else {
                return {"ctgrId": "", "summaryId":"", "styleId":"img17", "ctgrnm": "", "styleDesc":''}
            }
        },
        /*
         * 페이지 이동
         */
        fn_movePage(pageId) {
            const config = {
                name : pageId
            }
            commonService.movePage(config);
        },
    },
    mixins: [
        commonMixin
    ],
    components: {
        Page,
        FootersV2,
        LcCategoryV2
    },
}
</script>