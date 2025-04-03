<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 금융통통 > 노후준비
* @ 페이지설명 : 노후준비 메인
* @ 파일명     : src\views\page\PD\RT\PDRT1001\PDRT1001.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-09-22
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-22              CS528069              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view hasLNB custom_box_hasLNB">
        <pd-category-v2 type="PDYT"></pd-category-v2>
        <pd-sub-category-v2 type="RT_"></pd-sub-category-v2>

        <div id="content" class="renewal">
            <div class="com_inner com_line_type01 com_line_round custom_box_grap_wrap">
                <!-- 모은연금 123,456,789원 -->
                <!-- 연금 총 금액 국민연금이 연결되어있을 시 화면노출 -->
                <template v-if="isGookminRt">
                    <div class="new_sub_info">
                        <div class="title">
                            <div class="text">
                                <div class="txt_count">
                                    <strong>모은연금</strong>
                                    <p>
                                        <strong class="num">123,456,789</strong>
                                        <strong class="unit">원</strong>
                                    </p>
                                </div>
                                <div class="txt_samll">
                                    <span class="num">65</span>세부터 <span class="num">65</span>년 동안 매월
                                    <p>
                                        <strong>1,080,450원</strong>을 받을 수 있어요 
                                        <!-- 예상 연금 수령액 팝업보기 -->
                                        <button type="button" data-popup="full_popup_01" @click="openSlidePDRT1003()">
                                            <i><span class="blind">예상 연금 수령액 팝업보기</span></i>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <!--// 모은연금 123,456,789원 -->

                
                <!-- case 1 : 적정생활비 보다 적은 경우 -->
                <!-- 국민연금 연결되어있고, 적정생활비 대비 연금금액이 미만일경우 -->
                <template v-if="isGookminRt && !isComplRt">
                    <div class="com_box_type01 com_box_type07 custom_box_grap case01">
                        <div class="compare_chart_wrap">
                            <div class="chart">
                                <div class="bg">
                                    <div class="area top">
                                        <span class="num">적정생활비 165</span><em class="won">만원</em>
                                    </div>
                                    <div class="area mid">
                                        <div><strong class="num">57</strong><em class="won">만원 더 필요해요</em></div>
                                    </div>
                                    <div class="area bottom">
                                        <span class="text_over"></span>
                                        <span class="num"></span><em class="won"></em>
                                    </div>
                                </div>
                                <div class="bar_wrap">
                                    <div class="bars">
                                        <div class="bar bar01"></div>
                                        <div class="bar bar02">
                                            <strong class="num">
                                                108<em class="unit">만원</em>
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="custom_box_salary">
                            <p class="info_txt">예상 연금은 평균 소득으로 산정되요.</p>
                            <div class="btn_option">
                                <button type="button" class="btn_round_new btn_mid_round line_gray" data-popup="full_popup_02" @click="openSlidePDRT1002()">소득변경<span class="blind">납입 기간 중 월 평균소득 팝업보기</span></button>
                            </div>
                        </div>
                    </div> 
                </template>
                <!--// case 1 : 적정생활비 보다 적은 경우 -->


                <!-- case 2 : 적정생활비와 같거나 많은 경우 -->
                <template v-else-if="isGookminRt && !isComplAge">
                    <div class="com_box_type01 com_box_type07 custom_box_grap case02">
                        <div class="compare_chart_wrap">
                            <div class="chart">
                                <div class="bg">
                                    <div class="area top">
                                        <span class="num">적정생활비 165</span><em class="won">만원</em>
                                    </div>
                                    <div class="area mid">
                                        <div><strong class="num">57</strong><em class="won">만원 여유가 있어요</em></div>
                                    </div>
                                    <div class="area bottom">
                                        <span class="text_over"></span>
                                        <span class="num"></span><em class="won"></em>
                                    </div>
                                </div>
                                <div class="bar_wrap">
                                    <div class="bars">
                                        <div class="bar bar01"></div>
                                        <div class="bar bar02">
                                            <strong class="num">
                                                108<em class="unit">만원</em>
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="custom_box_salary">
                            <p class="info_txt">예상 연금은 평균 소득으로 산정되요.</p>
                            <div class="btn_option">
                                <button type="button" class="btn_round_new btn_mid_round line_gray" data-popup="full_popup_02" @click="openSlidePDRT1002()">소득변경<span class="blind">납입 기간 중 월 평균소득 팝업보기</span></button>
                            </div>
                        </div>
                    </div>  
                </template>
                <!--// case 2 : 적정생활비와 같거나 많은 경우 -->
            </div>
            
            <!-- Case1 국민연금 연결이 안된 경우 -->
            <template v-if="!isGookminRt">
                <div class="com_inner com_line_type01 com_line_round custom_box national_pension case01">
                    <div class="new_sub_info">
                        <div class="title">
                            <div class="text">
                                <div class="txt_count">
                                    <span>국민연금 연결이 필요해요!</span>
                                </div>
                                <div class="txt_samll">
                                    은퇴 후 받을 수 있는 내 연금을<br/>
                                    확인하고 필요 자금도 계산해 보세요.
                                </div>
                                <div class="btn_option">
                                    <button type="button" class="btn_round_new btn_mid_round line_gray i_plus">국민연금 연결</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="custom_box_salary_box">
                        <div class="custom_box_salary">
                            <p class="info_txt">연금산정용 가입확인서를 연결하세요.</p>
                        </div>
                    </div> 
                </div>
            </template>
            <!--// Case1 국민연금 연결이 안된 경우 -->

            <!-- Case2 만 62세(60년생) 이전인 경우(연금 수령 대상) -->
            <template v-if="!isComplAge && isComplRt">
                <div class="com_inner com_line_type01 com_line_round custom_box national_pension case02">
                    <div class="new_sub_info">
                        <div class="title">
                            <div class="text">
                                <div class="txt_count">
                                    <span>모은 연금 수령 하고 있나요?</span>
                                </div>
                                <div class="txt_samll">
                                    안락한 노후를 위해 자금 목표를<br/>
                                    세우고 상품 추천도 받아 보세요.
                                </div>
                                <div class="btn_option">
                                    <button type="button" class="btn_round_new btn_mid_round line_gray i_plus">목표 세우기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <!--// Case2 만 62세(60년생) 이전인 경우(연금 수령 대상) -->

            <!-- Case3 만60세까지 납입기간이 120개월 미만 -->
            <template v-else-if="isComplAge && isComplRt">
                <div class="com_inner com_line_type01 com_line_round custom_box national_pension case03">
                    <div class="new_sub_info">
                        <div class="title">
                            <div class="text">
                                <div class="txt_count">
                                    <span>연금으로 수령 할 수 없어요!</span>
                                </div>
                                <div class="txt_samll">
                                    국민연금은 60세까지 가입기간 10년<br/>
                                    미만이면 일시금으로 수령 합니다.
                                </div>
                                <div class="custom_box_tart_momey_plan">
                                    일시금 수령예상액 <strong>1,080,450<span class="unit">원</span></strong>
                                    <!-- 예상 연금 수령액 팝업보기 -->
                                    <button type="button" data-popup="full_popup_01" @click="fn_openSlidePDRT1006()">
                                        <i><span class="blind">예상 연금 수령액 팝업보기</span></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="custom_box_salary_box">
                        <div class="custom_box_salary">
                            <!-- 2022-09-22 : custom_txt01 추가 -->
                            <p class="info_txt custom_txt01">65세까지 임의계속가입 하여 10년 조건을 채우시면 
                                연금으로 수령 가능합니다. </p>
                        </div>
                    </div> 
                </div>
            </template>
            <!--// Case3 만60세까지 납입기간이 120개월 미만 -->

            <div class="com_inner">
                <!-- 국민연금 -->
                <div class="com_box_type01 toggle_list_box2 custom_list custom_box_list05" v-if="isGookminRt">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>국민연금</span></div>
                                <span class="total_price">
                                    <em class="num">123,456,789</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li>
                            <a href="javascript:void(0);" role="button">
                                <dl>
                                    <dt>
                                        <div>
                                            <em>가입기간</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">295</em><em class="unit">개월</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
                <!--// 국민연금 -->

                <!-- 퇴직연금 -->
                <div class="com_box_type01 toggle_list_box2 custom_list custom_box_list05" v-if="isToejikRt">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true" aria-disabled="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>퇴직연금</span></div>
                                <span class="total_price">
                                    <em class="num">123,456,789</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li>
                            <a href="javascript:void(0);" role="button">
                                <dl>
                                    <dt>
                                        <div>
                                            <i class="A1AAAZ0000"><span class="blind">개인형IPR</span></i>
                                            <div><em>개인형IPR</em></div>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">123,456,789</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
                <!--// 퇴직연금 -->

                <!-- 개인연금 -->
                <div class="com_box_type01 toggle_list_box2 custom_list custom_box_list05" v-if="isGaeinRt">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="false" aria-disabled="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>개인연금</span></div>
                                <span class="total_price">
                                    <em class="num">123,456,789</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li>
                            <a href="javascript:void(0);" role="button">
                                <dl>
                                    <dt>
                                        <div>
                                            <i class="shinhan01"><span class="blind">신한 미래설계 연금저축</span></i>
                                            <div><em>신한 미래설계<br/>연금저축</em></div>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">123,456,789</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" role="button">
                                <dl>
                                    <dt>
                                        <div>
                                            <i class="A3AAMC0000"><span class="blind">행복 knowhow 연금저축</span></i>
                                            <div><em>행복 knowhow<br/>연금저축</em></div>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">123,456,789</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
                <!--// 개인연금 -->

                <div class="custom_box mt15" v-if="!isComplAge">
                    <p class="com_txtinfo_type01">
                        국민연금은 총 납입금액이며 퇴직.개인연금은 수령액에 
                        따라 변동이 있을 수 있습니다.
                    </p>
                </div>

                <!-- 퇴직연금 : 자산을 연결하고 노후 준비하세요 클래스 (nodata) -->
                <div class="com_box_type01 toggle_list_box2 custom_list custom_box_list05 nodata" v-if="!isToejikRt">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-disabled="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>퇴직연금</span></div>
                            </div>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li>
                            <a href="javascript:void(0);" role="button">

                                <!-- plus 아이콘 -->
                                <p class="custom_nodata01">
                                    <span class="nodata plus">자산을 연결하고 노후 준비하세요</span>
                                </p>

                            </a>
                        </li>
                    </ul>
                </div>
                <!--// 퇴직연금 : 자산을 연결하고 노후 준비하세요 클래스 (nodata) -->

                <!-- 개인연금 : 자산을 연결하고 노후 준비하세요 클래스 (nodata) -->
                <div class="com_box_type01 toggle_list_box2 custom_list custom_box_list05 nodata" v-if="!isGaeinRt">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-disabled="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>개인연금</span></div>
                            </div>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li>
                            <a href="javascript:void(0);" role="button">

                                <!-- plus 아이콘 -->
                                <p class="custom_nodata01">
                                    <span class="nodata plus">자산을 연결하고 노후 준비하세요</span>
                                </p>

                            </a>
                        </li>
                    </ul>
                </div>
                <!--// 개인연금 : 자산을 연결하고 노후 준비하세요 클래스 (nodata) -->

                <!-- 목표생활비를 수령 하려면? -->
                <div class="custom_box" v-if="isGookminRt && isComplAge">
                    <div class="target_money_wrap slick_refresh">
                        <div class="slider_wrap">
                            <div class="tab_cont">
                                <!-- 목표생활비를 수령 하려면? -->
                                <div role="tabpanel" class="cmm-tab-panel">
                                    <div class="slide">
                                        <div class="target_money_info target_money_bg01 bg001">
                                            <div class="target_money_tit01">목표생활비를 수령 하려면?</div>
                                            <div class="txt_top">
                                                <span>
                                                    매월 <strong class="num">1,650,000</strong>
                                                    <button type="button" data-popup="full_popup_03"><i><span class="blind">은퇴 후 월 생활비 팝업보기</span></i></button>
                                                </span>
                                                받으려면
                                            </div>
                                            <div class="txt_bottom">
                                                월 <strong>876,231<span class="unit">원</span></strong>씩<br/>
                                                모으면 돼요 
                                                <!-- tool tip -->
                                                <a href="javascript:void(0);" class="com_btn_info">
                                                    <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                                    <span class="arrow" style="display:none"></span>
                                                </a>
                                                <div class="com_ballon_type01 tab_tooltip_wrap02">
                                                    <div class="tab_tooltip"  style="display:none;">
                                                        <div class="re_detail_list">
                                                            <div class="re_flex">
                                                                <ul class="bl_dot_list farm_list">
                                                                    <li>월 저축 금액은 비과세로 수익률이 반영되지 않은 금액입니다.</li>
                                                                    <li>
                                                                        만 60세까지 저축 기준입니다.
                                                                    </li>
                                                                </ul>
                                                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>	
                                                            </div>
                                                        </div>
                                                        <!-- <span class="arrow" style="display:none"></span> -->
                                                    </div>
                                                </div>
                                                <!--// tool tip -->
                                            </div>
                                            <a href="javascript:void(0);" class="btn_green01" title="맞춤상품추천">맞춤상품추천</a>
                                        </div>
                                    </div>
                                </div>
                                <!--// 목표생활비를 수령 하려면? -->
                                <!-- 매월 저축해서 더 모으면? -->
                                <div role="tabpanel" class="cmm-tab-panel">
                                    <div class="slide">
                                        <!-- 2022-09-22 : 클래스 bg002로 수정 -->
                                        <div class="target_money_info target_money_bg01 bg002">
                                            <div class="target_money_tit01">매월 저축해서 더 모으면?</div>
                                            <div class="txt_top" @click="fn_openSlidePDRT1004()">
                                                <span>
                                                    매월 <strong class="num">1,650,000</strong>
                                                    <button type="button" data-popup="full_popup_03"><i><span class="blind">은퇴 후 월 생활비 팝업보기</span></i></button>
                                                </span>
                                                저축하면
                                            </div>
                                            <div class="txt_bottom">
                                                노후 생활비<br/>
                                                <strong>1,405,450<span class="unit">원</span></strong>씩이 가능해요 
                                                <!-- tool tip -->
                                                <a href="javascript:void(0);" class="com_btn_info">
                                                    <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                                    <span class="arrow" style="display:none"></span>
                                                </a>
                                                <div class="com_ballon_type01 tab_tooltip_wrap02">
                                                    <div class="tab_tooltip"  style="display:none;">
                                                        <div class="re_detail_list">
                                                            <div class="re_flex">
                                                                <ul class="bl_dot_list farm_list">
                                                                    <li>월 저축 금액은 비과세로 수익률이 반영되지 않은 금액입니다.</li>
                                                                    <li>
                                                                        만 60세까지 저축 기준입니다.
                                                                    </li>
                                                                </ul>
                                                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>	
                                                            </div>
                                                        </div>
                                                        <!-- <span class="arrow" style="display:none"></span> -->
                                                    </div>
                                                </div>
                                                <!--// tool tip -->
                                            </div>
                                            <a href="javascript:void(0);" class="btn_green01" title="맞춤상품추천">맞춤상품추천</a>
                                        </div>
                                    </div>
                                </div>
                                <!--// 매월 저축해서 더 모으면? -->
                            </div>
                        </div>
                    </div>
                </div>
                <!--// 목표생활비를 수령 하려면? -->
                
                <div class="box_border_link custom_box_border_link" v-if="isComplAge">
                    <a href="javascript:void(0)" role="button" class="ico05">
                        <strong>은퇴 시뮬레이션</strong>
                        <strong class="arrow">은퇴 준비 진단</strong>
                    </a>
                    <a href="javascript:void(0)" role="button" class="ico07">
                        <strong>연금 세액 공제</strong>
                        <strong class="arrow">나의 연말정산</strong>
                    </a>
                </div>

                <!-- 목표를 세워 더 나은 노후를 준비해 볼까요? -->
                <div class="custom_box" v-if="isComplRt">
                    <div class="inner_banner">
                        <!-- NH손해보험 -->
                        <a href="javascript:void(0);" role="button">
                            <div class="com_box_type03 bg26">
                                <div class="text">
                                    <span>목표를 세워 더 나은</span>
                                    노후를 준비해 볼까요?
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <!--// 목표를 세워 더 나은 노후를 준비해 볼까요? -->

                <!-- 내게 꼭 맞는 상품을 추천해 드려요.-->
                <div class="custom_box" v-else>
                    <div class="inner_banner">
                        <!-- NH손해보험 -->
                        <a href="javascript:void(0);" role="button">
                            <div class="com_box_type03 bg26">
                                <div class="text">
                                    <span>내게 꼭 맞는</span>
                                    상품을 추천해 드려요.
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <!--// 내게 꼭 맞는 상품을 추천해 드려요.-->
            </div>

            <div class="new_add_register"><a href="javascript:void(0);" role="button"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>

        <footersV2 type="pd" />
    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import PdCategoryV2 from '@/components/category/PdCategoryV2.vue'
import PdSubCategoryV2 from '@/components/category/PdSubCategoryV2.vue'
import apiService from '@/service/apiService'
import {fncSlick, fncInite} from '@/utils/slick'
import modalService from '@/service/modalService'

import PDRT1002 from '@/views/page/PD/RT/PDRT1002/PDRT1002'
import PDRT1003 from '@/views/page/PD/RT/PDRT1003/PDRT1003'
import PDRT1004 from '@/views/page/PD/RT/PDRT1004/PDRT1004'
import PDRT1006 from '@/views/page/PD/RT/PDRT1006/PDRT1006'

export default {
    name : "PDRT1001",
    data: () => {
        return {
            isComplRt   : false,    // 적정생활비 대비 연금 충족 여부
            isComplAge  : true,    // 만 62세 이전인 경우 및 연결 연금 데이터 존재 여부 
            isGookminRt : false,    // 연결된 국민연금 데이터 존재 여부
            isToejikRt  : false,    // 연결된 퇴직연금 데이터 존재 여부
            isGaeinRt   : false,    // 연결된 개인연금 데이터 존재 여부
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
            this.getData()
        },
        getData(){
            fncInite()
            fncSlick()
        },

        // '납입 기간 중 월 평균소득' 슬라이드 팝업 오픈
        openSlidePDRT1002() {
            const config = {
                params : {},
                renderer : {
                    component : PDRT1002
                }
            }
            modalService.openSlidePagePopup(config)
        },

        // '예상 연금 수령액' 슬라이드 팝업 오픈
        openSlidePDRT1003() {
            const config = {
                params : {},
                renderer : {
                    component : PDRT1003
                }
            }
            modalService.openSlidePagePopup(config)
        },

        // '은퇴 전 월 저축금액' 슬라이드 팝업 오픈
        fn_openSlidePDRT1004() {
            const config = {
                params : {},
                renderer : {
                    component : PDRT1004
                }
            }
            modalService.openSlidePagePopup(config)
        },

        // '일시금 수령예상액' 슬라이드 팝업 오픈
        fn_openSlidePDRT1006() {
            const config = {
                params : {},
                renderer : {
                    component : PDRT1006
                }
            }
            modalService.openSlidePagePopup(config)
        },


    },
    mixins: [
        commonMixin
    ],
    components: {
        Page,
        FootersV2,
        PdCategoryV2,
        PdSubCategoryV2
    },
}
</script>