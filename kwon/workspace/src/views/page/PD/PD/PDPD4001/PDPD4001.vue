<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 상품추천
* @ 페이지설명 : 금융생활 > 상품추천 > 메인
* @ 파일명     : src\views\page\PD\PD\PDPD1001\PDPD1001.vue
* @ 작성자     : CS528053
* @ 작성일     : 2022-10-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-11              CS528053              최초작성
* 2025-02-26              CS541015              NH콕마이데이터4.0 추진 개발 (PDPD1001.vue -> PDPD4001.vue)
*************************************************************************/
-->
<template>
    <page class="content-view">
        <!-- height:101% 갤럭시 울트라에서 스크롤떨림현상 제거 -->
        <div id="content" class="sub_main renewal">
            <template v-if="isFirst == false">
                <div class="com_inner">
                    <!-- 약관 동의 내역이 없는 경우 노출 -->
                    <template v-if="isShowStltAgrYn == false && isSearch == true">
                        <div class="complete">
                            <div class="secede_box4 mt57">
                                <p class="txt">
                                    내게 꼭 맞는 상품을<br/>
                                    추천 받으려면 동의가 필요해요!
                                </p>
                                <div class="btn_option mt36">
                                    <button type="button" class="btn_round_new btn_mid_round line_gray i_plus" @click.prevent="openWrsStltPop()">상품추천 조회 동의</button>
                                </div>
                            </div>
                        </div>

                        <hr class="custom_box_hr01"/>
                    </template>

                    <!-- 약관 동의 내역이 있고, 금융성향 분석 결과가 없는 경우 노출 -->
                    <template v-else-if="isShowStltAgrYn == true && !isYnWrsRcmAnss && isSearch == true">
                        <div class="complete">
                            <div class="secede_box4 mt57">
                                <p class="txt">
                                    자산을 연결하면 금융성향을 분석한<br/>
                                    맞춤 상품을 추천해 드려요!
                                </p>
                                <div class="btn_option mt36">
                                    <button type="button" class="btn_round_new btn_mid_round line_gray i_plus" @click.prevent="openAssetsConnPop()">자산 연결</button>
                                </div>
                            </div>
                        </div>

                        <hr class="custom_box_hr01"/>
                    </template>

                    <!-- 상품추천 -->
                    <div class="custom_box_txt01 txt mt25">
                        <!-- 금융 성향 분석 결과가 있는 경우 -->
                        <template v-if="isYnWrsRcmAnss === true">
                            내 금융 성향을 분석한 <br>
                            <span class="com_point_mint">맞춤 상품</span>을 추천해 드려요
                        </template>

                        <!-- 금융 성향 분석 결과가 없는 경우 -->
                        <template v-else-if="isYnWrsRcmAnss === false">
                            <strong>
                                또래에서 가장 많이 가입한<br>
                                상품을 추천해 드려요
                            </strong>
                        </template>
                    </div>

                    <div class="choice_option custom_box">
                        <template v-if="isYnWrsRcmAnss == false">
                            <button type="button" :title="rvgtpAct == 'active' ? '선택됨' : '선택안됨'" :class="rvgtpAct" @click.prevent="wrsRcmRadioChg('RVGTP')">적금</button>
                            <button type="button" :title="dffmAct == 'active' ? '선택됨' : '선택안됨'" :class="dffmAct" @click.prevent="wrsRcmRadioChg('DFFM')">예금</button>
                            <button type="button" :title="lnAct == 'active' ? '선택됨' : '선택안됨'" :class="lnAct" @click.prevent="wrsRcmRadioChg('LN')">대출</button>
                        </template>
                        <template v-else-if="isYnWrsRcmAnss == true && wrsRcmScrList.length > 0">
                            <template v-for="(scrInfo, idx) in wrsRcmScrList">
                                <button type="button" :title="rvgtpAct == 'active' ? '선택됨' : '선택안됨'" :class="rvgtpAct" :key="'idx_tab_ord_' + idx" v-if="scrInfo.wrsGrTpc == 'RVGTP'" @click.prevent="wrsRcmRadioChg('RVGTP')">적금</button>
                                <button type="button" :title="dffmAct == 'active' ? '선택됨' : '선택안됨'" :class="dffmAct" :key="'idx_tab_ord_' + idx" v-else-if="scrInfo.wrsGrTpc == 'DFFM'" @click.prevent="wrsRcmRadioChg('DFFM')">예금</button>
                                <button type="button" :title="lnAct == 'active' ? '선택됨' : '선택안됨'" :class="lnAct" :key="'idx_tab_ord_' + idx" v-else-if="scrInfo.wrsGrTpc == 'LN'" @click.prevent="wrsRcmRadioChg('LN')">대출</button>
                            </template>
                        </template>
                    </div>
                    <!-- slide -->
                    <div class="custom_box_goods_root">
                        <!-- 적금 slide -->
                        <div class="inner_banner2" v-if="isShowRvgtp">
                            <div class="banner_slider2 slick_refresh wrsRcmSlick1">
                                <div v-for="(wrsRcmRvgtp, idx) in wrsRcmRvgtpList2" :key="'wrsRvgtp_' + idx">
                                    <div class="goods_wrap custom_box" v-if="idx < 3">
                                        <div class="goods_list_slide">
                                            <div class="item custom_box_box_shadow01">
                                                <a href="javascript:void(0);" role="button" class="goods_item" @click.prevent="openWrsDtlInfo(wrsRcmRvgtp.wrsDtlUrlnm)">
                                                    <div class="custom_box_com_box_list01" v-html="splitKwrd(wrsRcmRvgtp.rcmKwrdCntn)">
                                                    </div>
                                                    <div>
                                                        <span class="name arrow">
                                                            <strong class="tit">{{wrsRcmRvgtp.wrsnmPrtnm}}</strong>
                                                            <span class="subTit">{{wrsRcmRvgtp.rcmWrsBrfCntn}}</span>
                                                        </span>
                                                    </div>
                                                    <div class="flex_gray_wrap custom_box_ptb15 middle_line custom_box_pb16">
                                                        <div class="re_flex">
                                                            <span class="list_price num list01">
                                                                <span class="text_info list_name">가입기간</span>
                                                                <em>{{wrsRcmRvgtp.minEntPrdVal}}~{{wrsRcmRvgtp.maxEntPrdVal}}</em>
                                                            </span>
                                                            <span class="list_price num list02">
                                                                <span class="text_info list_name">이자율(최고)</span>
                                                                <em><span class="unit">연</span> {{wrsRcmRvgtp.otmItr}}%</em>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--// 적금 slide -->

                        <!-- 예금 slide -->
                        <div class="inner_banner2" v-if="isShowDffm">
                            <div class="banner_slider2 slick_refresh wrsRcmSlick2">
                                <div v-for="(wrsRcmDffm, idx) in wrsRcmDffmList2" :key="'wrsDffm_' + idx">
                                    <div class="goods_wrap custom_box" v-if="idx < 3">
                                        <div class="goods_list_slide">
                                            <div class="item custom_box_box_shadow01">
                                                <a href="javascript:void(0);" role="button" class="goods_item" @click.prevent="openWrsDtlInfo(wrsRcmDffm.wrsDtlUrlnm)">
                                                    <div class="custom_box_com_box_list01" v-html="splitKwrd(wrsRcmDffm.rcmKwrdCntn)">
                                                    </div>
                                                    <div>
                                                        <span class="name arrow">
                                                            <strong class="tit">{{wrsRcmDffm.wrsnmPrtnm}}</strong>
                                                            <span class="subTit">{{wrsRcmDffm.rcmWrsBrfCntn}}</span>
                                                        </span>
                                                    </div>
                                                    <div class="flex_gray_wrap custom_box_ptb15 middle_line custom_box_pb15">
                                                        <div class="re_flex">
                                                            <span class="list_price num list01">
                                                                <span class="text_info list_name">가입기간</span>
                                                                <em>{{wrsRcmDffm.minEntPrdVal}}~{{wrsRcmDffm.maxEntPrdVal}}</em>
                                                            </span>
                                                            <span class="list_price num list02">
                                                                <span class="text_info list_name">이자율(최고)</span>
                                                                <em><span class="unit">연</span> {{wrsRcmDffm.otmItr}}%</em>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--// 예금 slide -->

                        <!-- 대출 slide -->
                        <div class="inner_banner2" v-if="isShowLn">
                            <div class="banner_slider2 slick_refresh wrsRcmSlick3">
                                <div v-for="(wrsRcmLn, idx) in wrsRcmLnList2" :key="'wrsLn_' + idx">
                                    <div class="goods_wrap custom_box" v-if="idx < 3">
                                        <div class="goods_list_slide">
                                            <div class="item custom_box_box_shadow01">
                                                <a href="javascript:void(0);" role="button" class="goods_item" @click.prevent="openWrsDtlInfo(wrsRcmLn.wrsDtlUrlnm)">
                                                    <div class="custom_box_com_box_list01" v-html="splitKwrd(wrsRcmLn.rcmKwrdCntn)">
                                                    </div>
                                                    <div>
                                                        <span class="name arrow">
                                                            <strong class="tit">{{wrsRcmLn.wrsnmPrtnm}}</strong>
                                                            <span class="subTit">{{wrsRcmLn.rcmWrsBrfCntn}}</span>
                                                        </span>
                                                    </div>
                                                    <div class="flex_gray_wrap custom_box_ptb15 middle_line custom_box_pb15">
                                                        <div class="re_flex">
                                                            <span class="list_price num list01">
                                                                <span class="text_info list_name">최대한도</span>
                                                                <em>{{wrsRcmLn.minWrsAmVal}}~{{wrsRcmLn.maxWrsAmVal}}</em>
                                                            </span>
                                                            <span class="list_price num list02">
                                                                <span class="text_info list_name">최저금리</span>
                                                                <em><span class="unit">연</span> {{wrsRcmLn.otmItr}}%</em>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--// 대출 slide -->
                    </div>
                    <!--// slide -->

                    <template v-if="isShowStltAgrYn == true && wrsRcmScrList.length > 0 && wrsRcmCusInfo">
                        <div class="new_tit_area pb16 pt50 bdb0">
                            <strong class="com_pop_tit05">나의 금융성향 MBTI</strong>
                        </div>
                        <div class="goods_wrap custom_box custom_box_goods_wrap">
                            <div class="goods_list_slide">
                                <div class="item custom_box_box_shadow01">
                                    <div href="javascript:void(0);" role="button" class="goods_item">
                                        <div class="custom_box_com_box_list01" v-html="splitKwrd(wrsScrKwrdFilter(wrsRcmCusInfo.peerNo))">
                                        </div>
                                    </div>

                                    <!-- 그래프 S -->
                                    <div class="graphArea">
                                        <!-- half_circle -->
                                        <div class="graphAreaBox">
                                            <!-- 적립식 -->
                                            <div class="fixedBox case01">
                                                <div class="graphAreaInner">
                                                    <div class="circleSilver" :class="wrsRcmScrInfo.rvgtpRcmScrKwrdC == '2' ? 'circlePinkBlue' : (wrsRcmScrInfo.rvgtpRcmScrKwrdC == '1' ? 'circleBlue' : '')">
                                                        <div class="circlePink" :class="wrsRcmScrInfo.rvgtpRcmScrKwrdC == '2' ? 'circleSilver' : ''" :style="halfCircleClickFn('halfCht1', calcRcmScrRate(wrsRcmScrInfo.rvgtpWrsRcmScr || 0), 'pink')"></div>
                                                        <div class="needle" :style="halfCircleClickFn('halfCht1', calcRcmScrRate(wrsRcmScrInfo.rvgtpWrsRcmScr || 0), 'nd')"></div>
                                                    </div>
                                                </div>
                                                <div class="txt_name">
                                                    <span class="unit">적립식 {{getComCodeNm('RCM_SCR_KWRD_C', wrsRcmScrInfo.rvgtpRcmScrKwrdC || '')}}</span>
                                                </div>
                                            </div>
                                            <!--// 적립식 -->
                                            <!-- 거치식 -->
                                            <div class="fixedBox case02">
                                                <div class="graphAreaInner">
                                                    <div class="circleSilver" :class="wrsRcmScrInfo.dffmRcmScrKwrdC == '2' ? 'circlePinkBlue' : (wrsRcmScrInfo.dffmRcmScrKwrdC == '1' ? 'circleBlue' : '')">
                                                        <div class="circlePink" :class="wrsRcmScrInfo.dffmRcmScrKwrdC == '2' ? 'circleSilver' : ''" :style="halfCircleClickFn ('halfCht2', calcRcmScrRate(wrsRcmScrInfo.dffmWrsRcmScr || 0), 'pink')"></div>
                                                        <div class="needle" :style="halfCircleClickFn ('halfCht2', calcRcmScrRate(wrsRcmScrInfo.dffmWrsRcmScr || 0), 'nd')"></div>
                                                    </div>
                                                </div>
                                                <div class="txt_name">
                                                    <span class="unit">거치식 {{getComCodeNm('RCM_SCR_KWRD_C', wrsRcmScrInfo.dffmRcmScrKwrdC || '')}}</span>
                                                </div>
                                            </div>
                                            <!--// 거치식 -->
                                            <!-- 대출 -->
                                            <div class="fixedBox case03">
                                                <div class="graphAreaInner">
                                                    <div class="circleSilver" :class="wrsRcmScrInfo.lnRcmScrKwrdC == '2' ? 'circlePinkBlue' : (wrsRcmScrInfo.lnRcmScrKwrdC == '4' ? 'circleBlue' : '')">
                                                        <div class="circlePink" :class="wrsRcmScrInfo.lnRcmScrKwrdC == '2' ? 'circleSilver' : ''" :style="halfCircleClickFn ('halfCht3', calcRcmScrRate(wrsRcmScrInfo.lnWrsRcmScr || 0), 'pink')"></div>
                                                        <div class="needle" :style="halfCircleClickFn ('halfCht3', calcRcmScrRate(wrsRcmScrInfo.lnWrsRcmScr || 0), 'nd')"></div>
                                                    </div>
                                                </div>
                                                <div class="txt_name">
                                                    <span class="unit">대출 {{getComCodeNm('RCM_SCR_KWRD_C', wrsRcmScrInfo.lnRcmScrKwrdC || '')}}</span>
                                                </div>
                                            </div>
                                            <!--// 대출 -->
                                        </div>
                                        <!--// half_circle -->
                                    </div>
                                    <!--// 그래프 E -->
                                    
                                    <div class="custom_box_txt01 txt">
                                        {{getUserInfo('cusnm')}} 고객님,<br/>
                                        <span class="com_point_mint">{{getComCodeNm('WRS_GRP_TPC', wrsRcmScrInfo.needWrsGrTpc.toUpperCase())}} 상품</span>은 어때요?
                                        <p>{{wrsRcmScrInfo.needWrsGrRcmRsnctt}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="com_box_type01 custom_box custom_box_list07">
                            <!-- 금융 성향도 분석 차트 -->
                            <div class="radar_polygon chart_area">
                                <!-- 차트가 삽입될 DIV -->
                                <div id="chartHolder"></div>
                            </div>
                            <!--// 금융 성향도 분석 차트 -->
                            <ul class="bl_dot_list">
                                <template v-if="wrsRcmFncInfo.fncSpntKwrd">
                                    <li class="custom_dot dot_blue" v-html="splitKwrd(wrsRcmFncInfo.fncSpntKwrd, 'strong')">
                                    </li>
                                </template>
                                <template v-else>
                                    <li class="custom_dot dot_blue">
                                        <strong>나의강점</strong>
                                        <em class="unit txt02">없음</em>
                                    </li>
                                </template>
                                
                                <template v-if="wrsRcmFncInfo.fncDeKwrd">
                                    <li class="custom_dot dot_red" v-html="splitKwrd(wrsRcmFncInfo.fncDeKwrd, 'weakness')">
                                    </li>
                                </template>
                                <template v-else>
                                    <li class="custom_dot dot_red">
                                        <strong>나의약점</strong>
                                        <em class="unit txt02">없음</em>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </template>

                    <div class="inner_banner mb17 mt40">
                        <a href="javascript:void(0)" @click.prevent="openLnPop()">
                            <img src="@/assets/images/banner/img_benner_15.png" alt="신용,아파트,전세대출 최대한도와 최저금리를 한번에!">
                        </a>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="complete">
                    <div class="secede_box2 secede_box3 mt80">
                        <p class="txt">
                            꼭 맞는 상품을 추천해 드리기 위해 <br/>
                            데이터 분석 중 이에요.
                        </p>
                        <p class="txt_sub strong_color mt31">{{nextDateTxt}}부터 추천해 드릴게요.</p>
                    </div>
                </div>
            </template>

            <!--스크롤이 짧게 생길경우 위로 쭉 드래그하면 떨리는 듯한 현상제거하기 위해 삽입-->
            <br>
            <br>
            <br>
            <br>
        </div>

        <footersV2 type="pd" />
    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import PdCategoryV2 from '@/components/category/PdCategoryV2.vue'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import appService from '@/service/appService'
import {dateFormat, dayDiff} from '@/utils/date'
import {fncSlick_wrsRcmSlick1, fncSlick_wrsRcmSlick2, fncSlick_wrsRcmSlick3} from '@/utils/slick'
import moment from 'moment'
import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

import PDPD1002 from '@/views/page/PD/PD/PDPD1002/PDPD1002'     // 약관 슬라이드 팝업
import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'     // 자산 연결 팝업
import PDPD1108 from '@/views/page/PD/PD/PDPD1108/PDPD1108'     // 대출 한도조회 팝업

export default {
    name : "PDPD4001",
    data: () => {
        return {
            isSearch            : false,    // 조회완료 여부
            stltAgrYnList       : [],       // 약관 동의 여부 목록
            isShowStltAgrYn     : '',       // 약관 동의따른 show/hide

            wrsRcmList          : [],       // 금융상품 추천 목록
            wrsRcmRvgtpList     : [],       // 적금(적립식)
            wrsRcmDffmList      : [],       // 예금(거치식)
            wrsRcmLnList        : [],       // 대출
            wrsRcmRvgtpList2    : [],       // 적금(적립식) 최대 3개
            wrsRcmDffmList2     : [],       // 예금(거치식) 최대 3개
            wrsRcmLnList2       : [],       // 대출 최대 3개
            rvgtpAct            : '',       // 적금 라디오버튼 클래스
            dffmAct             : '',       // 예금 라디오버튼 클래스
            lnAct               : '',       // 대출 라디오버튼 클래스
            isShowRvgtp         : false,    // 적금 슬라이드 show/hide
            isShowDffm          : false,    // 예금 슬라이드 show/hide
            isShowLn            : false,    // 대출 슬라이드 show/hide
            currRvgtpIdx        : 0,        // 적금 현재 슬라이드 인덱스
            currDffmIdx         : 0,        // 예금 현재 슬라이드 인덱스
            currLnIdx           : 0,        // 대출 현재 슬라이드 인덱스

            wrsRcmCusInfo       : [],       // 고객프로파일정보
            wrsRcmScrList       : [],       // 고객상품군스코어목록
            wrsRcmScrInfo       : [],       // 고객상품군스코어정보(상품군스코어목록 내용을 한 배열에 담은 변수)
            wrsRcmFncInfo       : [],       // 금융성향도정보
            isYnWrsRcmAnss      : '',       // 고객 금융성향 분석 결과 존재 여부

            firEntDt            : '',       // 최초가입일자
            isFirst             : '',       // 최초가입여부
            nextDate            : '',       // 현재의 익일
            nextDateTxt         : '',       // 현재의 익일(format : MM월 DD일)

            fstWrs              : '',       // 첫번째 상품 탭 상품유형코드
            secWrs              : '',       // 두번째 상품 탭 상품유형코드
            trdWrs              : '',       // 세번째 상품 탭 상품유형코드
        }
    },
    computed : {
    },
    created() {
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
        getData(){
            this.firEntDt = this.getUserInfo('firEntDt');   // 최초가입일자

            //console.log("가입한 일수 = " + dayDiff(new Date(), this.firEntDt) + ', 익일 = ' + moment(new Date()).add(1, 'd').format('YYYY-MM-DD'));
            if(dayDiff(new Date(), this.firEntDt) == 0) {   // 당일 가입자일 경우 익일부터 노출
                this.isFirst        = true;                                                 // 최초가입여부
                this.nextDate       = moment(new Date()).add(1, 'd');                       // 현재의 익일
                this.nextDateTxt    = moment(new Date()).add(1, 'd').format('MM월 DD일');   // 현재의 익일(format : MM월 DD일)
            } else {
                this.isFirst = false;   // 최초가입여부
                this.getStltAgrYn();    // 약관 동의 여부 조회
            }
        },

        // 차트 생성
        createChart() {
            // rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			rMateChartH5.create("chart1", "chartHolder", false, "100%", "100%");
            this.setChart();
        },

        // 차트 세팅
        setChart() {
            // -----------------------차트 설정 시작-----------------------
			// 스트링 형식으로 레이아웃 정의
			var layoutStr =
			'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
                +'<Options>'
                    +'<Caption text=""/>'
                +'</Options>' 
                /*
                    레이더차트의 시리즈 개수에 맞게 보기 좋게 보이기 위해 시작각도를 조정합니다.
                    시작각도(startAngle)는 원점을 기준으로 3시 방향이 0 도로 시계 방향으로 진행됩니다.
                    5각형 모양의 레이더이므로 보기 좋게 하기 위해 270도 회전시켜 출력함
                */
                +'<RadarChart isSeriesOnAxis="true" type="polygon" paddingTop="30" paddingBottom="0" showDataTips="true" startAngle="270" displayCompleteCallFunction="rMateFunction.removeTabindex">'
                    /*
                        Radar 차트 생성시에 필요한 RadarChart 정의합니다
                        showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
                        isSeriesOnAxis : 차트 시리즈가 radialAxis위에 표현될지 여부를 나타냅니다
                        type - circle, polygon : Rader차트의 타입(원형, 다각형)입니다
                        이 예제에서는 polygon입니다
                    */
                    +'<backgroundElements>'
                        +'<RadarGridLines>'
                            +'<radarAlternateFill>'
                                +'<SolidColor color="#ffffff"/>'
                            +'</radarAlternateFill>'
                        +'</RadarGridLines>'
                    +'</backgroundElements>'
                    +'<radialAxis>'
                        +'<LinearAxis id="rAxis"/>'
                    +'</radialAxis>'
                    +'<angularAxis>'
                        +'<CategoryAxis id="aAxis" categoryField="구분" displayName=""/>'
                    +'</angularAxis>'
                    +'<radialAxisRenderers>'
                    /* radialAxis렌더러 정의 */
                    /* 세로축만 표시 */ 
                    // visible="false" 축 숫자표시 여부
                        +'<Axis2DRenderer axis="{rAxis}" horizontal="false" visible="false" tickPlacement="outside" tickLength="4">'
                            +'<axisStroke>'
                                +'<Stroke color="#555555" weight="1"/>'
                            +'</axisStroke>'
                        +'</Axis2DRenderer>'
                    +'</radialAxisRenderers>'
                    +'<angularAxisRenderers>'
                        +'<AngularAxisRenderer axis="{aAxis}"/>'
                    +'</angularAxisRenderers>'
                    +'<series>'
                        +'<RadarSeries field="나의강점" displayName="나의강점">'
                        /* RadarChart 정의 후 RadarSeries 정의합니다 */
                            +'<showDataEffect>'
                            /*
                                차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 
                            */
                            +'<SeriesInterpolate/>'
                            /*
                                표시될 때 이동하는 효과를 적용합니다
                                - 공통속성 -
                                elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
                                minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
                                이 값보다 짧은 시간에 effect가 실행되지 않습니다
                                offset : effect개시의 지연시간을 설정합니다 default:0
                                perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
                            */
                            +'</showDataEffect>'
                            +'<lineStroke>'
                                +'<Stroke color="#668ee2" weight="2"/>'
                            +'</lineStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#668ee2" alpha="0.2"/>'
                            +'</areaFill>'
                            +'</RadarSeries>'
                            +'<RadarSeries field="나의약점" displayName="나의약점">'
                            +'<showDataEffect>'
                                +'<SeriesInterpolate/>'
                            +'</showDataEffect>'
                            +'<lineStroke>'
                                +'<Stroke color="#fa7288" weight="2"/>'
                            +'</lineStroke>'
                            +'<areaFill>'
                                +'<SolidColor color="#fa7288" alpha="0.2"/>'
                            +'</areaFill>'
                        +'</RadarSeries>'
                    +'</series>'
                +'</RadarChart>'
            +'</rMateChart>';

            // 차트 데이터
            var chartData =
            [
                {"구분":"대출 상품", "나의강점":this.wrsRcmFncInfo.cusLnWrsIclnVal, "나의약점":this.wrsRcmFncInfo.peerLnWrsIclnVal},
                {"구분":"거치 상품", "나의강점":this.wrsRcmFncInfo.cusDffmWrsIclnVal, "나의약점":this.wrsRcmFncInfo.peerDffmWrsIclnVal},
                {"구분":"거치 자산", "나의강점":this.wrsRcmFncInfo.cusDffmAsetIclnVal, "나의약점":this.wrsRcmFncInfo.peerDffmAsetIclnVal},
                {"구분":"적립 자산", "나의강점":this.wrsRcmFncInfo.cusRvgtpAsetIclnVal, "나의약점":this.wrsRcmFncInfo.peerRvgtpAsetIclnVal},
                {"구분":"적립 상품", "나의강점":this.wrsRcmFncInfo.cusRvgtpWrsIclnVal, "나의약점":this.wrsRcmFncInfo.peerRvgtpWrsIclnVal}
            ];

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

            /**
                * 샘플 내의 테마 버튼 클릭 시 호출되는 함수입니다.
                * 접근하는 차트 객체의 테마를 변경합니다.
                * 파라메터로 넘어오는 값
                * - simple
                * - cyber
                * - modern
                * - lovely
                * - pastel
                * - default
                *
                * default : 테마를 적용하기 전 기본 형태를 출력합니다.
            */
            /* function rMateChartH5ChangeTheme(theme){
                document.getElementById("chart1").setTheme(theme);
            } */
        },

        // 반원 그래프 클릭 이벤트
        halfCircleClickFn (refId, counter, dsc) {
            if(dsc == "pink") {
                return 'transform:rotateZ(' + (1.8*counter) + 'deg)';
            } else if(dsc == 'nd') {
                return 'transform:translate(-50%, -50%) rotateZ(' +(1.8*counter+(-90)) + 'deg)';
            }

			// 0 ~ 100 시작
			// function circle01 () {
			// 	circlePink.css('transition', 'all .6s');
			// 	needle.css('transition', 'all .6s');
			// }
        },
        
        // 약관 슬라이드 팝업 오픈
        openWrsStltPop() {
            const config = {
                component: PDPD1002,        // 약관 팝업
                params : {
                }
            }
            modalService.openPopup(config).then((response) => {
                if(response == 'refresh') {
                    this.initComponent();
                }
            });
        },

        // 약관 동의 여부 조회
        getStltAgrYn() {
            this.stltAgrYnList      = [];           // 약관 동의 여부 목록
            this.isSearch           = false;        // 조회완료 여부

            // 개인자산관리_약관동의_기본 테이블에서 약관 동의 여부 조회
            /* const config = {
                url : "/pd/pd/01ra1",
                data : {
                    mydtCusno       : this.getUserInfo('mydtCusno'),        // 마이데이터 고객번호
                    stltTpc         : 'PFM006',                             // 약관유형코드(상품추천 약관유형코드 : PFM006)
                    agrYn           : '1'                                   // 동의여부(0:미동의, 1:동의)
                }
            }
            apiService.call(config).then(response => {
                //console.log("약관동의여부 조회 ", response)
                this.stltAgrYnList = response.stltAgrYnList || [];          // 약관 동의 여부 목록

                if(this.stltAgrYnList.length > 0) {
                    this.isShowStltAgrYn = true;                            // 약관 동의따른 show/hide
                } else {
                    this.isShowStltAgrYn = false;                           // 약관 동의따른 show/hide
                }

                this.$nextTick(() => {
                    this.getWrsRcmList();       // 상품추천 금융상품 추천 목록 조회
                });
            }) */

            // 개인자산관리_정보_제공_동의_내역 테이블에서 약관 동의 여부 조회
            const config = {
                url: '/co/at/01r01',
                data: {}
            }
            apiService.call(config).then(response => {
                const stltList = response.stltList || [];
                const wrsStlt = stltList.find((tmp) => tmp.stltTpc == 'PFM006') || [];

                const config2 = {
                    url : '/co/at/02ra1',
                    data : {
                        "stltTpc"   : wrsStlt.stltTpc,                          // 약관유형코드
                        "sqno"      : wrsStlt.sqno,                             // 일련번호
                        "mydtCusno" : this.getUserInfo('mydtCusno'),            // 마이데이터고객번호
                    }
                }
                apiService.call(config2).then(response => {
                    this.stltAgrYnList = response || [];                        // 약관 동의 여부 목록

                    if(this.stltAgrYnList.agrDtm) {                             // As-Is에서 동의 여부를 동의일시 데이터 있는지에 따라 판단함(COAT0005 참조)
                        this.isShowStltAgrYn = true;                            // 약관 동의따른 show/hide
                    } else {
                        this.isShowStltAgrYn = false;                           // 약관 동의따른 show/hide
                    }

                    this.$nextTick(() => {
                        this.getWrsRcmList();       // 상품추천 금융상품 추천 목록 조회
                    });
                })
            })
        },

        // 상품추천 금융상품 추천 목록 조회
        getWrsRcmList() {
            this.wrsRcmList         = [];       // 금융상품 추천 목록
            this.wrsRcmRvgtpList    = [];       // 적금(적립식)
            this.wrsRcmDffmList     = [];       // 예금(거치식)
            this.wrsRcmLnList       = [];       // 대출

            const config = {
                url : "/pd/pd/02ra1",
                data : {
                    mydtCusno       : this.getUserInfo('mydtCusno'),        // 마이데이터 고객번호
                    chnl            : this.getUserInfo('chnl')              // 채널구분
                }
            }
            apiService.call(config).then(response => {
                //console.log("상품추천 금융상품 추천 목록 조회 ", response)
                this.wrsRcmList         = response.wrsRcmList || [];                                                // 금융상품 추천 목록
                this.wrsRcmRvgtpList    = this.wrsRcmList.filter((wrsRcm) => wrsRcm.wrsGrTpc == 'RVGTP') || [];     // 적금(적립식)
                this.wrsRcmDffmList     = this.wrsRcmList.filter((wrsRcm) => wrsRcm.wrsGrTpc == 'DFFM') || [];      // 예금(거치식)
                this.wrsRcmLnList       = this.wrsRcmList.filter((wrsRcm) => wrsRcm.wrsGrTpc == 'LN') || [];        // 대출

                this.wrsRcmRvgtpList2   = this.wrsRcmRvgtpList.filter((wrsRcm, idx) => idx < 3) || [];              // 적금(적립식) 최대 3개
                this.wrsRcmDffmList2    = this.wrsRcmDffmList.filter((wrsRcm, idx) => idx < 3) || [];               // 예금(거치식) 최대 3개
                this.wrsRcmLnList2      = this.wrsRcmLnList.filter((wrsRcm, idx) => idx < 3) || [];                 // 대출 최대 3개

                this.$nextTick(() => {
                    this.callJQueryFncExcute();

                    // 초기 조회 시 적금 활성화
                    this.wrsRcmRadioChg('RVGTP');

                    /* $('.wrsRcmSlick1').filter('.slick-initialized').slick('unslick');
                    fncSlick_wrsRcmSlick1(500, false, this.chg_wrsRcmSlick1, this.currRvgtpIdx);

                    $('.wrsRcmSlick2').filter('.slick-initialized').slick('unslick');
                    fncSlick_wrsRcmSlick2(500, false, this.chg_wrsRcmSlick2, this.currDffmIdx);

                    $('.wrsRcmSlick3').filter('.slick-initialized').slick('unslick');
                    fncSlick_wrsRcmSlick3(500, false, this.chg_wrsRcmSlick3, this.currLnIdx); */

                    if(this.isShowStltAgrYn === true) {
                        this.getWrsRcmAnssRst();    // 상품추천 금융성향 분석 결과 조회
                    } else {
                        this.isSearch = true;
                        this.isYnWrsRcmAnss = false;
                    }
                });
            })
        },

        // 상품추천 금융성향 분석 결과 조회
        getWrsRcmAnssRst() {
            this.wrsRcmCusInfo = [];          // 고객프로파일정보
            this.wrsRcmScrList = [];          // 고객상품군스코어목록
            this.wrsRcmFncInfo = [];          // 금융성향도정보

            const config = {
                url : "/pd/pd/03ra1",
                data : {
                    mydtCusno       : this.getUserInfo('mydtCusno'),        // 마이데이터 고객번호
                    basDt           : dateFormat(new Date(), "YYYYMMDD")    // 기준일자(오늘 일자)
                }
            }
            apiService.call(config).then(response => {
                //console.log("금융성향 분석 결과 조회 ", response)
                this.wrsRcmCusInfo = response.wrsRcmCusInfo || [];          // 고객프로파일정보
                this.wrsRcmScrList = response.wrsRcmScrList || [];          // 고객상품군스코어목록
                this.wrsRcmFncInfo = response.wrsRcmFncInfo || [];          // 금융성향도정보

                // 고객상품군스코어 목록을 한 배열에 담기
                for(let i=0; i<this.wrsRcmScrList.length; i++) {
                    // 가장 필요한 상품정보 세팅
                    if(this.wrsRcmScrList[i].rcmOrd == '1') {
                        this.wrsRcmScrInfo.needWrsGrTpc             = this.wrsRcmScrList[i].wrsGrTpc;           // 가장 필요한 상품군유형코드
                        this.wrsRcmScrInfo.needWrsGrRcmRsnctt       = this.wrsRcmScrList[i].wrsGrRcmRsnctt;     // 가장 필요한 상품군추천사유내용
                        this.wrsRcmRadioChg(this.wrsRcmScrInfo.needWrsGrTpc);                                   // 1순위 데이터일 경우 해당하는 상품 탭 활성화
                    }

                    // 상품군 유형따라 다른 값 세팅
                    if(this.wrsRcmScrList[i].wrsGrTpc == 'RVGTP') {
                        // 적금
                        this.wrsRcmScrInfo.rvgtpRcmScrKwrdC         = this.wrsRcmScrList[i].rcmScrKwrdC;        // 추천점수키워드코드(1:충분, 2:양호, 3:부족)
                        this.wrsRcmScrInfo.rvgtpWrsRcmScr           = this.wrsRcmScrList[i].wrsRcmScr;          // 상품추천점수
                        this.wrsRcmScrInfo.rvgtpWrsCnScr            = this.wrsRcmScrList[i].wrsCnScr;           // 상품개수점수
                        this.wrsRcmScrInfo.rvgtpWrsRcmAsetAmScr     = this.wrsRcmScrList[i].wrsRcmAsetAmScr;    // 상품추천자산금액점수
                    } else if(this.wrsRcmScrList[i].wrsGrTpc == 'DFFM') {
                        // 예금
                        this.wrsRcmScrInfo.dffmRcmScrKwrdC          = this.wrsRcmScrList[i].rcmScrKwrdC;        // 추천점수키워드코드(1:충분, 2:양호, 3:부족)
                        this.wrsRcmScrInfo.dffmWrsRcmScr            = this.wrsRcmScrList[i].wrsRcmScr;          // 상품추천점수
                        this.wrsRcmScrInfo.dffmWrsCnScr             = this.wrsRcmScrList[i].wrsCnScr;           // 상품개수점수
                        this.wrsRcmScrInfo.dffmWrsRcmAsetAmScr      = this.wrsRcmScrList[i].wrsRcmAsetAmScr;    // 상품추천자산금액점수
                    } else if(this.wrsRcmScrList[i].wrsGrTpc == 'LN') {
                        // 대출
                        this.wrsRcmScrInfo.lnRcmScrKwrdC            = this.wrsRcmScrList[i].rcmScrKwrdC;        // 추천점수키워드코드(1:충분, 2:양호, 3:부족)
                        this.wrsRcmScrInfo.lnWrsRcmScr              = this.wrsRcmScrList[i].wrsRcmScr;          // 상품추천점수
                        this.wrsRcmScrInfo.lnWrsCnScr               = this.wrsRcmScrList[i].wrsCnScr;           // 상품개수점수
                        this.wrsRcmScrInfo.lnWrsRcmAsetAmScr        = this.wrsRcmScrList[i].wrsRcmAsetAmScr;    // 상품추천자산금액점수
                    }
                }
                //console.log("상품군 스코어 합본 ", this.wrsRcmScrInfo)

                this.isYnWrsRcmAnss = ((this.wrsRcmCusInfo.mydtCusno) || (this.wrsRcmScrList.length > 0) || (this.wrsRcmFncInfo.mydtCusno)) ? true : false;  // 고객 금융성향 분석 결과 존재 여부
                this.isSearch = true;

                this.$nextTick(() => {
                    if(this.isYnWrsRcmAnss == true) {
                        setTimeout(this.createChart(), 10);     // 금융 성향도 분석 차트
                    }
                });
            })
        },

        // 자산 연결 팝업 오픈
        openAssetsConnPop() {
            const config = {
                component: COAR4001,        // 약관 팝업
                params : {
                }
            }
            modalService.openPopup(config).then(() => {
            });
        },

        // 상품추천 라디오 버튼 변경 이벤트
        wrsRcmRadioChg(dsc) {
            $('.wrsRcmSlick1').filter('.slick-initialized').slick('unslick');
            $('.wrsRcmSlick2').filter('.slick-initialized').slick('unslick');
            $('.wrsRcmSlick3').filter('.slick-initialized').slick('unslick');

            if(dsc == 'RVGTP') {                        // 적금
                this.rvgtpAct            = 'active';        // 적금 라디오버튼 클래스
                this.dffmAct             = '';              // 예금 라디오버튼 클래스
                this.lnAct               = '';              // 대출 라디오버튼 클래스
                this.isShowRvgtp         = true;            // 적금 슬라이드 show/hide
                this.isShowDffm          = false;           // 예금 슬라이드 show/hide
                this.isShowLn            = false;           // 대출 슬라이드 show/hide
                
                fncSlick_wrsRcmSlick1(500, false, this.chg_wrsRcmSlick1, this.currRvgtpIdx);
            } else if(dsc == 'DFFM') {                  // 예금
                this.rvgtpAct            = '';              // 적금 라디오버튼 클래스
                this.dffmAct             = 'active';        // 예금 라디오버튼 클래스
                this.lnAct               = '';              // 대출 라디오버튼 클래스
                this.isShowRvgtp         = false;           // 적금 슬라이드 show/hide
                this.isShowDffm          = true;            // 예금 슬라이드 show/hide
                this.isShowLn            = false;           // 대출 슬라이드 show/hide
                
                fncSlick_wrsRcmSlick2(500, false, this.chg_wrsRcmSlick2, this.currDffmIdx);
            } else if(dsc == 'LN') {                    // 대출
                this.rvgtpAct            = '';              // 적금 라디오버튼 클래스
                this.dffmAct             = '';              // 예금 라디오버튼 클래스
                this.lnAct               = 'active';        // 대출 라디오버튼 클래스
                this.isShowRvgtp         = false;           // 적금 슬라이드 show/hide
                this.isShowDffm          = false;           // 예금 슬라이드 show/hide
                this.isShowLn            = true;            // 대출 슬라이드 show/hide
                
                fncSlick_wrsRcmSlick3(500, false, this.chg_wrsRcmSlick3, this.currLnIdx);
            }
        },

        // 키워드 구분하여 표시
        splitKwrd(str, addStrDsc='') {
            //console.log("키워드 split 원본 문자열 = " + String(str))
            let kwrdList = []
            let result = '';

            // 문자열이 없으면 리턴
            if(!str)   return '';

            kwrdList = str.split("^");

            if(addStrDsc == 'strong') {
                result = '<strong>나의강점</strong>';
            } else if(addStrDsc == 'weakness') {
                result = '<strong>나의약점</strong>';
            }

            for(let i=0; i<kwrdList.length; i++) {
                result = result + '<em class="unit txt02">' + kwrdList[i] + '</em>';
            }

            return result;
        },

        // 상품군 스코어 상세 - 추천점수키워드 코드 문자 필터(자산 관련된 민감사항 문구 제거)
        wrsScrKwrdFilter(peerNo) {
            const peerAgStnC        = peerNo.substring(0, 2);                                   // G0 ~ G7(연령)
            const peerJobJrC        = peerNo.substring(2, 4);                                   // J0 ~ J6(직업)
            //const peerAsetStnC      = peerNo.substring(4, 6);                                   // A0 ~ A3(자산)

            const peerAgStnCStr     = this.getComCodeNm('PEER_AG_STN_C', peerAgStnC);           // G0 ~ G7(연령)
            const peerJobJrCStr     = this.getComCodeNm('PEER_JOBGR_C', peerJobJrC);            // J0 ~ J6(직업)
            //const peerAsetStnStr    = this.getComCodeNm('PEER_ASET_STN_C', peerAsetStnC);       // A0 ~ A3(자산)

            return peerAgStnCStr + '^' + peerJobJrCStr;
        },

        // slick call back - 적금
        chg_wrsRcmSlick1(idx) {
            this.currRvgtpIdx = idx;
        },

        // slick call back - 예금
        chg_wrsRcmSlick2(idx) {
            this.currDffmIdx = idx;
        },

        // slick call back - 대출
        chg_wrsRcmSlick3(idx) {
            this.currLnIdx = idx;
        },

        // 공통코드 명칭 변환
        getComCodeNm(code, codeValue) {
            const codeList = this.getCodeList(code);
            let codeObj = '';
            console.log("공통코드 : " + code + ", 코드 목록 = ", codeList)

            if(codeList.length > 0) {
                codeObj = codeList.find((codeTmp) => codeTmp.comnCVal == codeValue);

                if(codeObj == 'undefined' || codeObj == null) {
                    return '';
                }
            } else {
                return codeObj;
            }

            return codeObj.comnCExpl;
        },

        // 대출 팝업 오픈
        openLnPop() {
            const config = {
                component: PDPD1108,        // 약관 팝업
                params : {
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData();
            });
        },

        // 상품 안내화면 이동
        openWrsDtlInfo(dtlUrlnm) {
            console.log("상품안내 URL = " + dtlUrlnm)
            appService.moveFinancialProductPage(dtlUrlnm)
        },

        // 상품추천점수 비율 계산
        calcRcmScrRate(value) {
            return (Number(value) / 2) * 100;
        }
    },
    mixins: [
        commonMixin
    ],
    components: {
        Page,
        FootersV2,
        PdCategoryV2
    },
}
</script>
<style scoped>
	.wrsRcmSlick1, .wrsRcmSlick2, .wrsRcmSlick3 {
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.1s ease;
		-webkit-transition: opacity 0.1s;
	}
	.wrsRcmSlick1.slick-initialized, .wrsRcmSlick2.slick-initialized, .wrsRcmSlick3.slick-initialized {
		visibility: visible;
		opacity: 1;
	}
</style>