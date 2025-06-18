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
    <page class="content-view mydata2023 subMainWrap">
        <lc-category-v2 type="LCIP"></lc-category-v2>
            <!-- content -->
            <div id="content" class="renewal expenDecom">
                <div class="com_inner">
                    <template v-if="showFlagYN2 == 'Y'">
                        <!-- 월지출 -->
                        <div class="com_box_type01 custom_box_chart expen">
                            <div class="top_my_data">
                                <div class="top_my_detail">
                                    <p class="txt"><em>{{cusMmtpXpsOut.bmYm0}}</em>월 총 지출</p>
                                    <strong class="txt_number">
                                        <em>{{xpsAm0 | numberFilter}}</em>
                                        <span>원</span>
                                    </strong>
                                    <div class="amountBox">
                                        <template v-if="cusMmtpXpsOut.bmmCmprXpsAm > 0">
                                            지난달 보다<span class="amount up">{{Math.abs(cusMmtpXpsOut.bmmCmprXpsAm) | numberFilter}}원</span>
                                        </template>
                                        <template v-if="cusMmtpXpsOut.bmmCmprXpsAm < 0">
                                            지난달 보다 <span class="amount down">{{Math.abs(cusMmtpXpsOut.bmmCmprXpsAm) | numberFilter}}원</span>
                                        </template>
                                        <template v-if="cusMmtpXpsOut.bmmCmprXpsAm == 0">
                                            지난달과 같아요
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <!-- 차트 -->
                            <div class="compare_chart_wrap" role="img" :aria-label="`${cusMmtpXpsOut.bmYm3+'월 지출은 '+cusMmtpXpsOut.xpsAm3+'원, '+cusMmtpXpsOut.bmYm2+'월 지출은 '+cusMmtpXpsOut.xpsAm2+'원, '+cusMmtpXpsOut.bmYm1+'월 지출은 '+cusMmtpXpsOut.xpsAm1+'원, '+cusMmtpXpsOut.bmYm0+'월 지출은 '+cusMmtpXpsOut.xpsAm0+'원이고 최근 3개월 평균 지출은 '+cusMmtpXpsOut.xps3mAvgAm+'원 입니다.'}`"><!-- 10/05 jlee 대체텍스트 문구 수정 -->
                            
                                <div class="chart">
                                    <div class="bg"></div>
                                    <div class="bar_wrap">
                                        <div class="bars abg">
                                            <div class="bar" :style="{height: cusMmtpXpsOut.xps3mAvgRto + '%'}">
                                                <div class="chart_tooltip_wrap">
                                                    <!-- <span class="chart_tooltip"><em class="num">{{cusMmtpXpsOut.xpsM3AvgAm | numberFilter}}</em>원</span> -->
                                                    <span class="chart_tooltip"><em class="num">{{cusMmtpXpsOut.xps3mAvgAm | numberFilter}}</em>원</span>
                                                </div>
                                            </div>
                                            <div class="title">3개월 평균</div>
                                        </div>
                                        <div class="bars">
                                            <div class="bar" :style="{height: cusMmtpXpsOut.xpsRto3 + '%'}"></div>
                                            <div class="title">{{cusMmtpXpsOut.bmYm3}}월</div>
                                        </div>
                                        <div class="bars">
                                            <div class="bar" :style="{height: cusMmtpXpsOut.xpsRto2 + '%'}"></div>
                                            <div class="title">{{cusMmtpXpsOut.bmYm2}}월</div>
                                        </div>
                                        <div class="bars">
                                            <div class="bar" :style="{height: cusMmtpXpsOut.xpsRto1 + '%'}"></div>
                                            <div class="title">{{cusMmtpXpsOut.bmYm1}}월</div>
                                        </div>
                                        <div class="bars now">
                                            <div class="bar" :style="{height: cusMmtpXpsOut.xpsRto0 + '%'}"></div>
                                            <div class="title">{{cusMmtpXpsOut.bmYm0}}월</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--// 차트 -->
                            <hr>
                            <template v-if="showFlagYN0 == 'N'">
                                <strong class="titH5">아직 지출이 없어요</strong>
                            </template>
                            <template v-else-if="stlXpsOut.indDsc == '1'">
                                <strong class="titH5">{{stlXpsOut.topIndTypNm}} 지출이 제일 많고<br>지난달 보다 <em>{{stlXpsOut.bmmCmprXpsAm | numberFilter}}</em>원 더 썼어요</strong>
                            </template>
                            <template v-else-if="stlXpsOut.indDsc == '2'">
                                <strong class="titH5">{{stlXpsOut.topIndTypNm}} 지출이 제일 많고<br>지난달 보다 <em>{{(stlXpsOut.bmmCmprXpsAm * -1)| numberFilter}}</em>원 줄었어요</strong>
                            </template>
                            <template v-else-if="stlXpsOut.indDsc == '3'">
                                <strong class="titH5">지난 달과 변화가 없어요</strong>
                            </template>                         
                            <div class="inPopTypeChart"><!-- 1004 접근성 반영 -->
                                <div class="pension_bar_chart">
                                    <div class="pension_bar card" :class="{blind: Math.round(stlXpsOut.cardXpsRto,0) <= 0, pop: stlXpsOut.topIndTypNm=='카드'}">
                                        <span><em>{{Math.round(stlXpsOut.cardXpsRto,0)}}</em>%</span>
                                    </div>
                                    <div class="pension_bar pay" :class="{blind: Math.round(stlXpsOut.payXpsRto,0) <= 0, pop: stlXpsOut.topIndTypNm=='페이'}">
                                        <span><em>{{Math.round(stlXpsOut.payXpsRto,0)}}</em>%</span>
                                    </div>
                                    <div class="pension_bar cash" :class="{blind: Math.round(stlXpsOut.cshXpsRto,0) <= 0, pop: stlXpsOut.topIndTypNm=='현금'}">
                                        <span><em>{{Math.round(stlXpsOut.cshXpsRto,0)}}</em>%</span>
                                    </div>
                                </div>                           
                            </div>
                            <div class="barChartInfo">
                                <div class="chart_txt">
                                    <a href="javascript:void(0);" @click.prevent="openPopLCLE('LCLE4002')">
                                        <i style="background:#de7cc1"></i>
                                        <span>카드</span>
                                        <span class="right"><em>{{stlXpsOut.cardXpsAm | numberFilter}}</em><span class="won">원</span></span>
                                    </a>
                                </div>
                                <div class="chart_txt">
                                    <a href="javascript:void(0);" @click.prevent="openPopLCLE('LCLE4003')">
                                        <i style="background:#e33596"></i>
                                        <span>페이</span>
                                        <span class="right"><em>{{stlXpsOut.payXpsAm | numberFilter}}</em><span class="won">원</span></span>
                                    </a>
                                </div>
                                <div class="chart_txt">
                                    <a href="javascript:void(0);" @click.prevent="openPopLCLE('LCLE4104')">
                                        <i style="background:#edb0db"></i>
                                        <span>현금</span>
                                        <span class="right"><em>{{stlXpsOut.cshXpsAm | numberFilter}}</em><span class="won">원</span></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!--// 월지출 -->
                        <!-- 소비스타일 -->                    
                        <div class="com_box_type01 bottomBtnType" v-if="showFlagYN0 == 'Y'">
                            <div class="consumStyle">
                                <p class="com_txt_sub"><em>{{cusnm}}</em>님의 소비스타일은?</p>
                                <template v-if="xpsStyle && xpsStyle.xpsCtgrC">
                                    <strong class="titH3">
                                        <b>{{xpsStyle.xpsCtgrNm}}</b> 소비가 많은<br><b>{{xpsStyle.xpsRsnNm}}형</b>
                                        <div class="custom_tooltip">
                                            <div class="com_tooltip_type02 com_tooltip_type03">
                                                <a href="javascript:void(0);" class="com_btn_info" role="button">
                                                    <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                                </a>
                                                <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                                    <div>
                                                        <p>소비스타일 분석에 미분류 지출은 포함되지 않아요</p>
                                                        <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </strong>
                                    <div class="keyword"> 
                                        <em class="unit">#{{xpsStyle.weekTimeTypNM}}</em>
                                        <em class="unit">#{{xpsStyle.xpsOnOffNm}}</em>
                                    </div>                                    
                                </template>
                                <br v-else> 
                            </div>
                            <!-- 소비스타일 목록 -->
                            <template v-if="ctgrList.length > 0">
                            <ul class="expenListBox LRdivType">
                                <li v-for="(item, index) in ctgrList.filter((el,idx)=>idx < 3)" class="expenList" :key="`item1_${index}`">
                                    <span :class="`expIcon ${item.xpsCtgrC}`"></span>
                                    <div class="left">
                                        <strong class="expName">{{item.xpsCtgrNm}}</strong>
                                        <span class="expTarget">{{item.xpsRto | numberFilter}}%</span>
                                    </div>
                                    <div class="right">
                                        <em class="expAmt">{{item.xpsAm | numberFilter}}원</em>
                                        <span :class="`amount ${item.bmmCmprXpsAm >= 0 ? 'up' : 'down'}`">{{Math.abs(item.bmmCmprXpsAm) | numberFilter}}원</span>
                                    </div>
                                </li>
                            </ul>			
                            <!--// 소비스타일 목록 -->
                            <a href="javascript:void(0);" class="bottomBtn link" @click.prevent="openPop('LCIP2002TAB')">전체보기</a>						
                            </template>
                        </div>
                        <!--// 소비스타일 -->

                        <!-- 정기 지출 -->
                        <div class="com_box_type01" v-if="fxtmList.length > 0">
                            <ul class="layoutBox wAuto rBtn">
                                <li class="left">
                                    <strong class="titH3">다가올 지출 <em>{{fxtmCnt}}</em>건</strong>
                                </li>
                                <li class="right">
                                    <a href="javascript:void(0);" class="btnLink" @click.prevent="openPopFXTM()"><span>{{fxtmTtAm | numberFilter}}원</span><span class="blind">정기지출</span></a>
                                </li>
                            </ul>
                            <!-- 다가올 지출 목록 -->
                            <ul class="expenListBox">
                                <li v-for="(item, index) in fxtmList.filter((el,idx)=>idx < 3)" class="expenList" :key="`item1_${index}`">
                                    <span :class="`expIcon ${item.xpsCtgrC}`"></span>
                                    <strong class="expName">{{item.prcMchtnm}}</strong>
                                    <span class="expTarget"><i>{{item.fxtmMmDd}}</i>{{item.wrsnm}}</span>
                                    <em class="expAmt">{{item.xpsAm | numberFilter}}원</em>
                                </li>
                            </ul>
                            <!--// 다가올 지출 목록 -->
                        </div>		
                        <!--// 정기 지출 -->
                        <!-- 정기 지출 정보가 없는 경우 -->
                        <div class="com_box_type01" v-else>
                            <div class="expenListBox noData" @click.prevent="openPopFXTM()">
                                <p class="com_txt_sub addExplan">매달 나가는 돈을 확인해 보세요</p>
                                <strong class="com_txt_sub">다가올 정기지출</strong>
                            </div>
                        </div>
                        <!--// 정기 지출 정보가 없는 경우 -->
                        
                        <!-- 월예산 목표 -->
                        <div class="com_box_type01" v-if="this.xpsObtAm > 0">
                            <ul class="layoutBox wAuto rBtn">
                                <li class="left">
                                    <strong class="titH3"><em>{{xpsObt.mm}}</em>월 예산</strong>
                                </li>
                                <li class="right">
                                    <button class="btnLink" @click.prevent="openPopTarget()"><span class="blind">지출목표상세 연결</span></button><!-- 09/07 jlee 버튼 추가 -->
                                </li>
                            </ul>
                            <div class="myTargetBox">
                                <span class="myTarget">목표예산</span>
                                <span class="myTargetName"><b>{{xpsObt.xpsObtAm | numberFilter}}</b>원</span>
                                <span class="myTargetDay">D-<em>{{xpsObt.ddCnt+1}}</em></span><!-- 09/07 jlee 위치 이동 -->
                            </div>
                            <ul class="layoutBox half gray_box_m">
                                <li class="left">
                                    <p class="myTargetMoneyName">남은돈</p>
                                    <strong class="myTargetMoney">{{xpsObt.xpsObtCmprAm | numberFilter}}원</strong>
                                </li>
                                <li class="right">
                                    <div class="progressBar">
                                        <div class="bar">
                                            <div class="popover_wrap">
                                                <span class="popover">
                                                    <em class="num">{{xpsObt.xpsRzsRto | numberFilter}}</em>%
                                                    <span class="arrow"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <!--// 월예산 목표 -->
                        <!-- 월예산 목표가 없는 경우 -->
                        <div class="com_box_type01" v-else>
                            <ul class="layoutBox wAuto rBtn rTxt">
                                <li class="left">
                                    <strong class="titH3"><em>{{basMm | numberFilter}}</em>월 예산</strong>
                                </li>
                                <li class="right"></li>
                            </ul>
                            <div class="myTargetBox noData">
                                <p>예산을 설정하고<br>계획적으로 관리하세요</p>
                            </div>
                            <button type="button" class="stdBtn full" @click.prevent="openPopPDMY()">예산 설정하기</button>
                        </div>
                        <!--// 월예산 목표가 없는 경우 -->
                        <!-- 또래 비교 -->
                        <div class="com_box_type01 old_age" v-if="xpsPeer.xpsAm + xpsPeer.peerXpsAm > 0">
                            <ul class="layoutBox wAuto rBtn">
                                <template v-if="peerIndDsc == '1'">
                                    <strong class="titH3">또래 보다 많이 쓰고 있어요</strong>
                                </template>
                                <template v-if="peerIndDsc == '2'">
                                    <strong class="titH3">또래 보다 적게 쓰고 있어요</strong>
                                </template>
                                <template v-if="peerIndDsc == '3'">
                                    <strong class="titH3">또래와 동일하게 쓰고 있어요</strong>
                                </template> 

                                <li class="right">
                                    <button class="btnLink" @click.prevent="openPopPeer()"><span class="blind">자산진단 연결</span></button>
                                </li>
                            </ul>
                            <div class="keyword">
                                <em class="unit">#{{xpsPeer.agStnNm}}</em>
                                <em class="unit">#{{xpsPeer.jobgrNm}}</em>
                            </div>
                            <div class="chart_wrap"><!-- 1004 접근성 반영 -->
                                <div class="pension_bar_chart">
                                    <div class="pension_bar dd" :style="{width: xpsPeer.peerXpsRto + '%'}"></div>
                                    <div class="pension_bar me" :style="{width: xpsPeer.xpsRto + '%'}"></div>
                                </div>
                                <div class="pension_item_list">
                                    <dl class="item dd">
                                        <dt>또래</dt>
                                        <dd><em class="num">{{xpsPeer.peerXpsAm | numberFilter}}</em>원</dd>
                                    </dl>
                                    <dl class="item me">
                                        <dt>나</dt>
                                        <dd><em class="num">{{xpsPeer.xpsAm | numberFilter}}</em>원</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <!--// 또래 비교 -->
                        <!-- 많이 쓴 금액 -->	
                        <template v-if="mchtByAmtList.length > 0 && showFlagYN0 == 'Y'">							
                            <div class="com_box_type01 bottomBtnType">
                                <strong class="titH3"><b>{{topXpsAmMchtnm}}</b> 에서 제일 많이 썼어요</strong>							
                                <ul class="expenListBox" :class="mchtByAmtList.length > 3 ? 'botmBtn' : ''">
                                    <li v-for="(item, index) in mchtByAmtList.filter((el,idx)=>idx < 5)" class="expenList" :key="`item1_${index}`">
                                        <span :class="`expIcon ${item.xpsCtgrC}`"></span>
                                        <strong class="expName">{{item.prcMchtnm}}</strong>
                                        <em class="expAmt">{{item.xpsAm | numberFilter}}원</em>
                                    </li>
                                </ul>
                                <template v-if="mchtByAmtList.length > 3">
                                    <button class="bottomBtn">더보기</button>
                                </template>
                            </div>
                        </template>
                        <!--// 많이 쓴 금액 -->

                        <!-- 많이 쓴 건수 -->
                        <div v-if="mchtByCntList.length > 0 && showFlagYN0 == 'Y'" class="com_box_type01">
                            <ul class="layoutBox wAuto rBtn">
                                <li class="left">
                                    <strong class="titH3">주로 여기서 자주 썼어요</strong>
                                </li>
                                <li class="right">
                                    <button class="btnLink" @click.prevent="openPopMcht()"><span class="blind">자주 이용하는 가맹점</span></button>
                                </li>
                            </ul>
                            <ul class="expenListBox">
                                <li v-for="(item, index) in mchtByCntList.filter((el,idx)=>idx < 3)" class="expenList" :key="`item1_${index}`">
                                    <span :class="`expIcon ${item.xpsCtgrC}`"></span>
                                    <strong class="expName">{{item.prcMchtnm}}</strong>
                                    <em class="expAmt">{{item.xpsCnt | numberFilter}}건</em>
                                </li>
                            </ul>
                        </div>                    
                        <!--// 많이 쓴 건수 -->
                    </template>
                    <template v-else-if="showFlagYN2 == 'N'">
                        <!-- 최근 2개월 지출내역이 없는 경우 -->
                        <div class="com_box_type01">
                            <div class="no_data_box no_data_box01">
                                <div class="no_data_list">
                                    <p class="titH1">최근 소비 활동이 없어요</p>
                                    <span class="txt_sub mt10">현명한 지출 관리를 위해 사용하고 있는<br>계좌나 카드를 연결해 주세요</span>
                                </div>
                            </div>
                            <button type="button" class="stdBtn full" @click.prevent="fn_openAssetPage()">연결하기</button>
                        </div>
                        <!--// 최근 2개월 지출내역이 없는 경우 -->
                    </template>
                </div>
            </div>
            <!--// content -->
        <footersV2 type="lc" />
    </page>
</template>

<script>
// import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import LcCategoryV2 from '@/components/category/LcCategoryV2.vue'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import {dateFormat, monthAdd} from '@/utils/date'
import {infoToolipHandler} from '@/utils/jUtils'

import LCIP2007 from '@/views/page/LC/IP/LCIP2007/LCIP2007' // 정기 지출
import LCIP2011 from '@/views/page/LC/IP/LCIP2011/LCIP2011' // 자주 이용하는 가맹점
import LCIP2012 from '@/views/page/LC/IP/LCIP2012/LCIP2012' // 또래 지출 비교
import LCIP2002TAB from '@/components/category/LcIp2002Tab' // 유형별 지출
// import PDMY2005 from '@/views/page/PD/MY/PDMY2005/PDMY2005' // 목표등록
import PDMY4032 from '@/views/page/PD/MY/PDMY4032/PDMY4032' // 지출목표 등록
import PDMY4033 from '@/views/page/PD/MY/PDMY4033/PDMY4033' // 지출목표(상세조회)
import LCLE4002 from '@/views/page/LC/LE/LCLE4002/LCLE4002' // 카드 지출내역
import LCLE4003 from '@/views/page/LC/LE/LCLE4003/LCLE4003' // 페이머니 지출내역
import LCLE4104 from '@/views/page/LC/LE/LCLE4104/LCLE4104' // 현금 지출내역
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002' // 자산연결

export default {
    name : "LCIP2001",
    data: () => {
        return {
            cusNb: '',              // 마이데이터고객번호
            cusnm: '',              // 고객명
            showFlagYN0: '',        // 최근 당월 지출내역이 있으면 'Y'
            showFlagYN2: '',        // 최근 2개월 지출내역이 있으면 'Y'
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
        
            /*------------------------------------------*/
            cusMmtpXpsOut 	: '', 	// 고객 월별 지출
            bmYm0       	: '',   // 당월
            bmYm1       	: '',   // 전월
            bmYm2       	: '',   // 2개월전 월
            bmYm3       	: '',   // 3개월전 월
            bmYm4       	: '',   // 4개월전 월
            bmYm5       	: '',   // 5개월전 월
            xpsAm0      	: 0 ,   // 당월지출금액
            xpsAm1      	: 0 ,   // 전월지출금액
            xpsAm2      	: 0 ,   // 2개월전 월 지출금액
            xpsAm3      	: 0 ,   // 3개월전 월 지출금액
            xpsAm4      	: 0 ,   // 4개월전 월 지출금액
            xpsAm5      	: 0 ,   // 5개월전 월 지출금액
            bmmCmprXpsAm    : 0 ,   // 지출증감액
            xps3mAvgAm  	: 0 ,   // 3개월지출평균금액
            /*------------------------------------------*/
            stlXpsOut 		: '',	// 결제수단별
            topIndTyp   	: '',  	// 증감구분코드
            topIndTypNm 	: '',  	// 증감구분코드명
            stlXpsIndAm    	: 0,   	// 전월대비지출증감금액
            stlCardXpsAm   	: 0,   	// 카드지출금액
            stlPaymXpsAm   	: 0,   	// 페이지출금액
            stlCshXpsAm    	: 0,   	// 현금지출금액
            stlCardXpsRto  	: 0,   	// 카드지출비율
            stlPaymXpsRto  	: 0,   	// 페이지출비율
            stlCshXpsRto   	: 0,   	// 현금지출비율
            /*------------------------------------------*/
            peerGrpRto : 0,
            cusRto : 0,
            indDsc : 0,
            topXpsAmMchtnm : '',
            topXpsCntMchtnm : '',
            amSize : 0 ,
            cntSize : 0,
            peerIndDsc : '',

            fxtmCnt : 0 ,
            fxtmTtAm : 0 ,	

            xpsStyle : '', 			// 소비스타일
            ctgrList: [],           // 카테고리 TOP4
            fxtmList: [],           // 다가올 지출(정기지출)
            xpsObt : '', 			// 나의 목표(지출 목표)
            xpsPeer : '',			// 또래지출비교
            mchtByAmtList: [],      // 거래치별 금액순 TOP3
            mchtByCntList: [],      // 거래처별 횟수순 TOP3
            tmp: ''
            
            ,
            bmRto0 : 0,
            bmRto1 : 0,
            bmRto2 : 0,
            bmRto3 : 0,
            bm3mAvg : 0,
            
        }
    },
    computed : {
    },
    created() {
        this.todayBasYm = dateFormat(new Date(), "YYYYMM")
        this.basYm = dateFormat(new Date(), "YYYYMM")
        this.basMm = dateFormat(new Date(), "MM")
        this.basDt = dateFormat(new Date(), "YYYYMMDD")
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
            this.getData()
            if(this.routeParams?.openPopup === 'LCIP2007') {
                this.openPopFXTM()
            }
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
            this.executeCnt++
            apiService.call(config).then(response =>{
                console.log('response', JSON.parse(JSON.stringify(response)))
                
                this.cusMmtpXpsOut 	= response.cusMmtpXpsOut
                this.xpsAm0      	= response.cusMmtpXpsOut?.xpsAm0 || 0     // 당월
                this.xpsAm1      	= response.cusMmtpXpsOut?.xpsAm1 || 0     // 전월
                this.xpsAm2      	= response.cusMmtpXpsOut?.xpsAm2 || 0     // 2개월전
                
                // 최근 당월 지출내역이 있으면 'Y'
                if (this.xpsAm0 <= 0){
                    this.showFlagYN0 = 'N'
                }else{
                    this.showFlagYN0 = 'Y'
                }

                // 최근 2개월 지출내역이 있으면 'Y'
                if (this.xpsAm1 + this.xpsAm2 <= 0){
                    this.showFlagYN2 = 'N'
                }else{
                    this.showFlagYN2 = 'Y'
                }

                this.stlXpsOut = response.stlXpsOut         // 결제수단별
                this.xpsStyle  = response.xpsStyle          // 소비스타일   
                this.xpsObt    = response.xpsObt            // 지출목표
                this.xpsPeer   = response.xpsPeer           // 또래비교
                this.fxtmList  = response.fxtmList          // 정기지출
                //this.ctgrList = response.ctgrList;

                // 지출목표
                this.xpsObtAm = this.xpsObt.xpsObtAm || 0                

                if (this.xpsPeer.peerXpsAm - this.xpsPeer.xpsAm < 0) {
                    this.peerIndDsc = 1
                } else if (this.xpsPeer.peerXpsAm - this.xpsPeer.xpsAm > 0) {
                    this.peerIndDsc = 2
                } else {
                    this.peerIndDsc = 3
                }					

                // 소비스타일
                if (this.stlXpsOut.xpsIndAm > 0) {
                    this.indDsc = 1
                } else if (this.stlXpsOut.xpsIndAm < 0) {
                    this.indDsc = 2
                } else {
                    this.indDsc = 3
                }

                // 가맹점
                this.amSize = response.mchtByAmtList.length;
                this.cntSize = response.mchtByCntList.length;

                if (response.mchtByAmtList.length > 0) {
                    let item = response.mchtByAmtList.find(el => el.xpsAmOrd === 1)
                    console.log('item ### ', item)
                    this.topXpsAmMchtnm = item.prcMchtnm
                }
                
                // 정기지출
                this.fxtmCnt = response.fxtmList.length;
                this.fxtmTtAm = 0;
                for(let i=0 ; i < this.fxtmCnt; i++){
                    this.fxtmTtAm = this.fxtmTtAm + this.fxtmList[i].xpsAm;
                }

                // this.ctgrList = this.fn_arrPad(response.ctgrList || [], 3) // 카테고리 TOP4
                // this.mchtByAmtList = this.fn_arrPad(response.mchtByAmtList, 3) || [] // 거래치별 금액순 TOP3
                // this.mchtByCntList = this.fn_arrPad(response.mchtByCntList, 3) || [] // 거래처별 횟수순 TOP3

                this.ctgrList      = response.ctgrList      || [] // 카테고리 TOP4
                this.mchtByAmtList = response.mchtByAmtList || [] // 거래치별 금액순 TOP3
                this.mchtByCntList = response.mchtByCntList || [] // 거래처별 횟수순 TOP3

                this.$nextTick(()=>{
                    this.initEvent()
                    
                    if (this.executeCnt == 1) infoToolipHandler() // 툴팁 클릭이벤트 생성

                    //this.makeChart()
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
        // makeChart() {
        //     // rMateChart 를 생성합니다.
        //     // 파라메터 (순서대로)
        //     //  1. 차트의 id ( 임의로 지정하십시오. )
        //     //  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
        //     //  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
        //     //  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
        //     //  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
        //     rMateChartH5.create("lcip1001Chart", "chartHolder", "useContextMenu=false", "100%", "130px");
        //     let layoutStr =
        //         '<rMateChart backgroundColor="#FFFFFF" borderStyle="none" >'
        //             // +'<Options>'
        //             // +'<Caption text="Web Browser Market Share"/>'
        //             // +'<Legend useVisibleCheck="true"/>'
        //             // +'</Options>'
        //             // +'<CurrencyFormatter id="numFmt" currencySymbol="%" alignSymbol="right"/>'
        //             +'<Pie2DChart showDataTips="true" innerRadius="0.5" displayCompleteCallFunction="rMateFunction.lcipRemoveTabindex">'
        //             /* Pie2D 차트 생성시에 필요한 Pie2DChart 정의합니다. */
        //             /* showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다. */
        //                 +'<series>'
        //                     +'<Pie2DSeries nameField="browser" field="share" color="#ffffff" zeroValueEnable="true">'
        //                     /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
        //                         +'<fills>'
        //                             +'<SolidColor color="#57c9ae"/>'/* 카드 */
        //                             +'<SolidColor color="#fdbb68"/>'/*페이*/
        //                             +'<SolidColor color="#fa7288"/>'/*선불*/
        //                             +'<SolidColor color="#668ee2"/>'/*기타*/
        //                         +'</fills>'
        //                         +'<showDataEffect>'
        //                         /* 차트 생성시에 Effect를 주고 싶을 때 showDataEffect정의합니다 */
        //                             +'<SeriesSlide  duration="1000"/>'
        //                             /* SeriesSlide 효과는 시리즈 데이터가 데이터로 표시될 때 한쪽에서 미끄러지듯 나타나는 효과를 적용합니다. */
        //                             /* elementOffset : effect를 지연시키는 시간을 지정합니다 default:20 */
        //                             /* minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0 */
        //                             /* 이 값보다 짧은 시간에 effect가 실행되지 않습니다. */
        //                             /* offset : effect개시의 지연시간을 설정합니다 default:0 */
        //                             /* perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다. */
        //                             /* direction : left:왼쪽, right:오른쪽, up:위, down:아래 default는 left입니다. */
        //                         +'</showDataEffect>'
        //                     +'</Pie2DSeries>'
        //                 +'</series>'
        //                 +'<annotationElements>'
        //                     +'<CanvasElement>'
        //                         +'<CanvasLabel horizontalCenter="0" height="24" fontSize="14" fontWeight="bold" verticalCenter="0" text="" color="#333333"/>'
        //                     +'</CanvasElement>'
        //                 +'</annotationElements>'
        //             +'</Pie2DChart>'
                    
        //         +'</rMateChart>';
            
        //     // 차트 데이터
        //     let chartData =
        //         [
        //             { browser: '카드', share: this.cardXpsTtAm },
        //             { browser: '페이', share: this.pymXpsTtAm },
        //             { browser: '선불', share: this.pycdXpsTtAm },
        //             { browser: '기타', share: this.etcXpsTtAm }
        //         ]
                
        //     // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
        //     //
        //     // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
        //     // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
        //     // 
        //     // 아래 내용은 
        //     // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
        //     // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
        //     rMateChartH5.calls("lcip1001Chart", {
        //         "setLayout" : layoutStr,
        //         "setData" : chartData,
        //     });
        // },
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
            console.log("기준년월 : "+this.basMm )

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

            if (viewName == 'LCIP2007') compName = LCIP2007 // 정기지출          
            if (viewName == 'LCIP2002TAB') compName = LCIP2002TAB // 정기지출 리포트
            // if (viewName == 'PDMY2005') compName = PDMY2005 // 목표등록
            if (viewName == 'PDMY4032') compName = PDMY4032 // 지출목표 등록

            if (compName == null) {
                modalService.alert("미적용")
                return;
            }

            let param = { "pBasYm" : this.basYm }

            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(() => {
                // if (viewName == 'PDMY2005') {
                if (viewName == 'PDMY4032') {    
                    this.getData()
                }
            })
        },
        openPopFXTM() {
            const config = {
                component: LCIP2007
            }
            modalService.openPopup(config).then((res) => {
                if (res === 'reSelect') this.getData()
            })
        },
        openPopMcht() {
            const config = {
                component: LCIP2011
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        openPopTarget() {
            var param = { "stYm": this.basYm, "preXpsAm": this.xpsObt.xpsObtAm}
            const config = {
                component: PDMY4033,
                params : param
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        openPopPeer() {
            const config = {
                component: LCIP2012
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        /*
         * 목표등록 팝업
         */
        openPopPDMY() {
            const config = {
                // component: PDMY2005
                component: PDMY4032
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

            if (viewName == 'LCLE4002') compName = LCLE4002 // 카드 
            if (viewName == 'LCLE4003') compName = LCLE4003 // 페이
            if (viewName == 'LCLE4104') compName = LCLE4104 // 현금

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
                component: COAR2002,
            }
            modalService.openPopup(config).then(() => {
                //this.getData()
            })
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

        initEvent() {
        //jQuery(document).ready(function(){
            //막대그래프 값세팅
            $('.inPopTypeChart .pension_bar_chart .pension_bar').each(function(){
                $(this).css({'width':$(this).find('em').text()+'%'});
            });
			var cnt = $('.pension_bar.blind').length, //0인 항목 갯수
					bleq = $('.pension_bar.blind').index(); //0인 항목 위치
			//console.log("갯수 == "+cnt+", blind위치 == "+bleq);
			if(cnt == 1){//0인 항목이 한개인 경우
				switch(bleq){
					case 0://0인 항목이 왼쪽인 경우
						$(".pension_bar:eq(1)").addClass('leftBR');
					break;
					case 2://0인 항목이 오른쪽인 경우
						$(".pension_bar:eq(1)").addClass('rightBR');
					break;
				}
			}else if(cnt == 2){//최대값만 보이는 경우
				$('.pension_bar.pop').addClass('allBR');
			}
            //예산 그래프
            var progressBar = $('.progressBar .bar');
            
            progressBar.each(function(){
                var progressNum = $(this).children().find('.popover .num').text();
                var popoverWrap = $(this).children('.popover_wrap');

                if(progressNum >= 100) {
                    progressNum = 100;
                    $(this).addClass('over');
                    popoverWrap.css('transform','translateX(-100%)');
                    popoverWrap.animate({
                        left: progressNum + "%"
                    },2000,function(){
                        popoverWrap.addClass('full');
                    });
                } else if(progressNum == 0) {
                    popoverWrap.addClass('zero');
                } else {
                    popoverWrap.animate({
                        left: progressNum +'%'
                    },2000);
                }

                progressBar.css('width','0');
                popoverWrap.css('left','0');
                $(this).animate({
                    width: progressNum + '%',
                },2000);
                
            });
            //더보기
            $('button.bottomBtn').unbind('click').on('click',function(){
                var _this = $(this);
                _this.toggleClass('up').prev().toggleClass('open');
                if(_this.hasClass('up')){
                    _this.text('접기');
                }else{
                    _this.text('더보기');
                }
            });
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