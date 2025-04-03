<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 전체
* @ 페이지설명 : 나의자산 > 자산 > 전체 메인
* @ 파일명     : src/views/page/AS/AC/ASAC1001/ASAC1001.vue
* @ 작성자     : CS528043
* @ 작성일     : 2022-07-15
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
________________________________________________________________________
* 2022-07-15             CS528043             ASAS0001 -> ASAC1001 고도화
*************************************************************************/
-->
<template>
    <!-- content-view S -->
    <page class="content-view"><!-- lnb 존재시 class hasLNB -->
        <!-- S :: 자산 카테고리 -->
        <as-category-v2 type="ALL"></as-category-v2>
        <!-- E :: 자산 카테고리 -->

        <!-- content S -->
        <div id="content" class="sub_main renewal">
            <div class="com_inner com_line_type01 com_line_round custom_list">
                <div class="top_my_data">
                    <div class="top_my_detail">
                        <p class="txt">총자산</p>
                        <strong class="txt_number">
                            <em class="counter" id="asetTotAm" :data-count="asetTotAm">{{asetTotAm | numberFilter}}</em>
                            <span>원</span>
                        </strong>

                        <div class="top_my_time">
                            <div v-if="!isMyAssetGathering">
                                <span class="my_data_time"><span>{{lastUpdateDtm.split('.').join('-')|dateFilter('HH:mm:ss')}}</span></span>
                                <button type="button" class="btn_reset" @click.prevent="fn_refreshApiCall()">새로고침</button>    
                            </div>
                            <div v-else>
                                자산 업데이트 중입니다.                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="com_inner center_tit">
                <!--금융자산 -->
                <div class="com_box_type01 custom_list">
                    <div class="new_tit_area">
                        <div class="tit">
                            <span>금융자산</span>
                        </div>
                        <span class="total_price" role="text">
                            <em class="num">{{fnasTtAm | numberFilter}}</em><em class="unit">원</em>
                        </span>
                    </div>
                    <ul class="list_type_02 arrow_gray">
                        <!-- 예금 -->
                        <li>
                            <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASAC2001')">
                                <dl>
                                    <dt>
                                        <em>예금</em><span class="com_icon_num custom" v-show="acCnt > 0">{{acCnt | numberFilter}}</span>
                                    </dt>
                                    <dd>
                                        <span class="com_price" role="text">
                                            <em class="num">{{acBacAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>

                        <!-- 투자 -->
                        <li>
                            <template v-if="ivCnt > 0">
                                <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASIV2001')">
                                    <dl>
                                        <dt>
                                            <em>투자</em><span class="com_icon_num custom" v-show="ivCnt > 0">{{ivCnt | numberFilter}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price" role="text">
                                                <em class="num">{{ivBacAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>                                
                            </template>
                            <template v-else>
                                <a href="javascript:void(0)" role="button" class="ico_plus" @click.prevent="fn_openNewConnect('invest')">
                                    <dl>
                                        <dt>
                                            <em>투자</em>
                                        </dt>
                                        <dd>
                                            수익률 확인하기
                                        </dd>
                                    </dl>
                                </a>                                
                            </template>
                        </li>
                        <!-- 포인트 -->
                        <li>
                            <template v-if="paymCnt > 0">
                                <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASAC1110')">
                                    <dl>
                                        <dt>
                                            <em>포인트</em><span class="com_icon_num custom" v-show="paymCnt > 0">{{paymCnt | numberFilter}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price" role="text">
                                                <em class="num">{{paymAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>  
                            </template>
                            <template v-else>
                                <a href="javascript:void(0)" role="button" class="ico_plus" @click.prevent="fn_openNewConnect('efin')">
                                    <dl>
                                        <dt>
                                            <em>포인트</em>
                                            <!-- <em>선불</em> 20220519 텍스트수정.-->
                                        </dt>
                                        <dd>
                                            한 눈에 보기
                                        </dd>
                                    </dl>
                                </a>
                            </template>
                        </li>

                        <!-- 보험 -->
                        <li>
                            <template v-if="isrCnt > 0">
                                <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASIN1101')">
                                    <dl>
                                        <dt>
                                            <em>보험</em><span class="com_icon_num custom" v-show="isrCnt > 0">{{isrCnt | numberFilter}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em>자세히보기</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>

                            </template>
                            <template v-else>
                                <a href="javascript:void(0)" role="button" class="ico_plus" @click.prevent="fn_openNewConnect('insu')">
                                    <dl>
                                        <dt>
                                            <em>보험</em>
                                        </dt>
                                        <dd>
                                            보장 체크하기
                                        </dd>
                                    </dl>
                                </a>
                            </template>
                        </li>
                    </ul>
                </div>
                
                <!-- 부채 -->
                <div class="com_box_type01 custom_list">
                    <div class="new_tit_area">
                        <div class="tit"><span>부채</span>
                        </div>
                        <span class="total_price" role="text">
                            <em class="num">{{dbTtAm | numberFilter}}</em><em class="unit">원</em>
                        </span>
                    </div>
                    <ul class="list_type_02 arrow_gray">
                        <!-- 대출 -->
                        <li>
                            <template v-if="lnCnt > 0">
                                <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASLN2001')">
                                    <dl>
                                        <dt>
                                            <em>대출</em><span class="com_icon_num custom" v-show="lnCnt > 0">{{lnCnt | numberFilter}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price" role="text">
                                                <em class="num">{{lnBacAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>
                            </template>
                            <template v-else>
                                <!-- 대출(없을 때) 개발 완료 후 수정(임시 DEV001)!! -->
                                <a href="javascript:void(0)" role="button" class="ico_plus" @click.prevent="fn_openNewConnect('bank')">
                                    <dl>
                                        <dt>
                                            <em>대출</em>
                                        </dt>
                                        <dd>
                                            관리하기
                                        </dd>
                                    </dl>
                                </a>                                
                            </template>                            
                        </li>

                        <!-- 카드 -->
                        <li>
                            <template v-if="cdCnt > 0">
                                <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASCD2001')">
                                    <dl>
                                        <dt>
                                            <em>카드</em><span class="com_icon_num custom" v-show="cdCnt > 0">{{cdCnt | numberFilter}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price" role="text">
                                                <em class="num">{{cdBacAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>                                
                            </template>
                            <template v-else>
                                <a href="javascript:void(0)" role="button" class="ico_plus" @click.prevent="fn_openNewConnect('card')">
                                    <dl>
                                        <dt>
                                            <em>카드</em>
                                        </dt>
                                        <dd>
                                            결제금액 모아보기
                                        </dd>
                                    </dl>
                                </a>
                            </template>                            
                        </li>

                        <!-- 할부금융 -->
                        <li>
                            <template v-if="istCnt > 0">
                                <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASLN1105')">
                                    <dl>
                                        <dt>
                                            <em>할부금융</em><span class="com_icon_num custom" v-show="istCnt > 0">{{istCnt | numberFilter}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price" role="text">
                                                <em class="num">{{istBacAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>                                  
                            </template>
                            <template v-else>
                                <a href="javascript:void(0)" role="button" class="ico_plus" @click.prevent="fn_openNewConnect('capital')">
                                    <dl>
                                        <dt>
                                            <em>할부금융</em>
                                        </dt>
                                        <dd>
                                            할부 알아보기
                                        </dd>
                                    </dl>
                                </a>                                
                            </template>
                        </li>

                        <!-- 자동차할부 -->
                        <li>
                            <template v-if="carItCnt > 0">
                                <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASLN1102')">
                                    <dl>
                                        <dt>
                                            <em>자동차할부</em><span class="com_icon_num custom" v-show="carItCnt > 0">{{carItCnt | numberFilter}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price" role="text">
                                                <em class="num">{{carItAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a> 
                            </template>
                            <template v-else>
                                <a href="javascript:void(0)" role="button" class="ico_plus" @click.prevent="fn_openNewConnect('capital')">
                                    <dl>
                                        <dt>
                                            <em>자동차할부</em>
                                        </dt>
                                        <dd>
                                            할부 알아보기
                                        </dd>
                                    </dl>
                                </a>                                
                            </template>                            
                        </li>

                        <!-- 리스 -->
                        <li>
                            <template v-if="fncLesItCnt > 0">
                                <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASLN1106')">
                                    <dl>
                                        <dt>
                                            <em>리스</em><span class="com_icon_num custom" v-show="fncLesItCnt > 0">{{fncLesItCnt | numberFilter}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price" role="text">
                                                <em class="num">{{fncLesItAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>
                            </template>
                            <template v-else>
                                <a href="javascript:void(0)" role="button" class="ico_plus" @click.prevent="fn_openNewConnect('capital')">
                                    <dl>
                                        <dt>
                                            <em>리스</em>
                                        </dt>
                                        <dd>
                                            대금 확인하기
                                        </dd>
                                    </dl>
                                </a>
                            </template>                            
                        </li>

                        <!-- 빌린돈 -->
                        <li>
                            <template v-if="cshCnt > 0">
                                <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASLN2107')">
                                    <dl>
                                        <dt>
                                            <em>빌린돈</em><span class="com_icon_num custom" v-show="cshCnt > 0">{{cshCnt | numberFilter}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price" role="text">
                                                <em class="num">{{cshBacAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>                                
                            </template>
                            <template v-else>
                                <a href="javascript:void(0)" role="button" class="ico_plus" @click.prevent="openRlAssetPop('COOA2003')">
                                    <dl>
                                        <dt>
                                            <em>빌린돈</em>
                                        </dt>
                                        <dd>
                                            관리하기
                                        </dd>
                                    </dl>
                                </a>                                
                            </template>                            
                        </li>
                    </ul>
                </div>

                <!-- 현금(원화+외화) -->
                <template v-if="(krwCnt > 0 || fcCnt > 0)">                    
                    <div class="com_box_type01 custom_list">
                        <a href="javascript:void(0)" class="new_tit_area" role="button" @click.prevent="fn_movePage('ASOA2001')">
                            <div class="tit"><span>현금</span></div>
                            <span class="total_price ico_arrow">
                                <em class="num">{{cshTtAm | numberFilter}}</em><em class="unit">원</em>
                            </span>
                        </a>
                        <ul class="list_type_02 arrow_gray">
                            <li>
                                <dl>
                                    <dt>
                                        <em>원화</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price" role="text">
                                            <em class="num">{{krwBacAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>외화</em>
                                    <!--<span class="icon_mint">$</span>-->
                                    <!--<span class="icon_mint">￥</span>-->
                                    </dt>
                                    <dd>
                                        <span class="com_price" role="text">
                                            <em class="num">{{fcBacAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </template>
                
                <!-- 부동산 -->
                <div class="com_box_type01 custom_list">
                    <template v-if="rlestList.length > 0">
                        <a href="javascript:void(0)" role="button"  class="new_tit_area" @click.prevent="fn_movePage('ASRE2001')">
                            <div class="tit">
                                <span>부동산</span>
                            </div>
                            <span class="total_price ico_arrow" v-html="fn_numberFormatKorAmt(rlestTtAm)">
                            <!--<em class="num">850,000</em><em class="unit">원</em>-->
                            </span>
                        </a>
                        <ul class="list_type_02 list_subtype01">
                            <li v-for="(item, idx) in rlestList" :key="'rlset_'+idx">
                                <dl>
                                    <dt>
                                        <div><em>{{item.mmoInpYn === '1' ? item.rlestNm : item.aptHcxnm}}</em></div>
                                        <div>
                                            <template v-if="item.mmoInpYn === '0'">
                                                <span>{{getComCodeNm('RLEST_TNG_DSC', item.rlestTngDsc)}}</span>
                                                <span class="com_bar01">{{item.newPytpAreaCntn}}㎡</span>
                                                <span class="icon_mint">{{getComCodeNm('RLEST_RSD_FORM_DSC', item.rlestRsdFormDsc)}}</span>
                                            </template>
                                            <!-- 토지/농지, 상가, 기타 -->
                                            <template v-else-if="item.rlestTngDsc == '6' || item.rlestTngDsc == '7' || item.rlestTngDsc == '9'">
                                                <span>{{getComCodeNm('RLEST_TNG_DSC', item.rlestTngDsc)}}</span>
                                            </template>
                                            <template v-else>
                                                <span>{{getComCodeNm('RLEST_TNG_DSC', item.rlestTngDsc)}}</span>
                                                <span class="icon_mint">{{getComCodeNm('RLEST_RSD_FORM_DSC', item.rlestRsdFormDsc)}}</span>
                                            </template>    
                                        </div>
                                        <!-- 토지/농지, 상가, 기타 -->
                                        <template v-if="item.rlestTngDsc == '6' || item.rlestTngDsc == '7' || item.rlestTngDsc == '9'">
                                            <div>
                                                <span>{{item.provnm}} {{item.ccwnm}} {{item.ttvnm}}</span>
                                            </div>
                                        </template>
                                    </dt>
                                    <dd>
                                        <!-- 자가 -->
                                        <template v-if="item.rlestRsdFormDsc === '1'">
                                            <template v-if="item.mmoInpYn === '0'">
                                                <!-- 아파트 -->
                                                <span class="com_price" v-html="fn_numberFormatKorAmt( item.genDlAm * 10000)"></span>
                                                <template v-if="item.genDlAm - item.rlestTrPr > 0 ">
                                                    <span class="com_price" role="text">
                                                        <span class="raise">
                                                            <span class="text_over">상승</span>
                                                            <span v-html="fn_numberFormatKorAmt( (item.genDlAm - item.rlestTrPr) * 10000)"></span>
                                                        </span>
                                                    </span>
                                                </template>
                                                <template v-if="item.genDlAm - item.rlestTrPr < 0 ">
                                                    <span class="com_price" role="text">
                                                        <span class="decrease">
                                                            <span class="text_over">하락</span>
                                                            <span v-html="fn_numberFormatKorAmt( (item.rlestTrPr - item.genDlAm) * 10000)"></span>
                                                        </span>
                                                    </span>
                                                </template>
                                                <template v-else>
                                                </template>
                                            </template>
                                            <!-- 직접입력 -->
                                            <template v-else>
                                                <span class="grey block">
                                                    <span>매매가</span>
                                                </span>
                                                <span class="com_price" role="text" v-html="fn_numberFormatKorAmt( item.rlestTrPr * 10000)"></span>
                                            </template>
                                        </template>
                                        <!-- 토지/농지, 상가, 기타 -->
                                        <template v-else-if="item.rlestTngDsc == '6' || item.rlestTngDsc == '7' || item.rlestTngDsc == '9'">
                                            <span class="grey block">
                                                <span>매매가</span>
                                            </span>                                            
                                            <span class="com_price" role="text" v-html="fn_numberFormatKorAmt( item.rlestTrPr * 10000)"></span>
                                        </template>
                                        <!-- 전세/월세 -->
                                        <template v-else>
                                            <span class="grey block">
                                                <span>보증금</span>
                                            </span>
                                            <span class="com_price" role="text" v-html="fn_numberFormatKorAmt( item.grmy * 10000)">
                                                <!--<em class="num">85,000</em><em class="unit">만원</em>-->
                                            </span>
                                            <template v-if="item.grmy == 0 || item.grmy == ''">
                                                <em class="num">0</em><em class="unit">원</em>
                                            </template>
                                        </template>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </template>
                    <!-- 부동산(없을 때) -->
                    <template v-else>
                        <a href="javascript:void(0)" role="button" class="new_tit_area" @click.prevent="openRlAssetPop('CORE2201')">
                            <div class="tit"><span>부동산</span></div>
                            <span class="total_price ico_plus"><!-- 정보 없을떄  ico_plus / 있을때 ico_arrow --><!-- 2022-10-05 추가 -->
                                시세 알아보기
                            </span>
                        </a>
                    </template>
                </div>

                <!-- 자동차 -->
                <div class="com_box_type01 custom_list">
                    <template v-if="carList.length > 0">                      
                        <a class="new_tit_area" href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASCA2201')">
                            <div class="tit"><span>자동차</span></div>
                            <span class="total_price ico_arrow" v-html="fn_numberFormatKorAmt(carTtAm)">
                            <!--<em class="num">850,000</em><em class="unit">원</em>-->
                            </span>
                        </a>
                        <ul class="list_type_02 list_subtype01">
                            <li v-for="(item, idx) in carList" :key="'car_'+idx">
                                <dl>
                                    <dt>
                                        <div><em>{{item.carModlnm}}</em></div>
                                        <div>
                                            <span class="num">{{item.carMdyrYy}}<em>년식</em></span>
                                            <span class="com_bar01">{{item.vhcnoVal}}</span>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price" role="text" v-html="fn_numberFormatKorAmt(item.odmtrDistMprAm)">
                                        <!--<em class="num">21</em><em class="unit">억</em><em class="num">85,000</em><em class="unit">만원</em>-->
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </template>
                    <!-- 자동차(없을 때) -->
                    <template v-else>
                        <a href="javascript:void(0)" role="button" class="new_tit_area" @click.prevent="openRlAssetPop('COCA2101')">
                            <div class="tit"><span>자동차</span></div>
                            <span class="total_price ico_plus"><!-- 정보 없을떄  ico_plus / 있을때 ico_arrow --><!-- 2022-10-05 추가 -->
                                시세 알아보기
                            </span>
                        </a>                     
                    </template>                    
                </div>

                <!-- 금(gold) -->
                <template v-if="goldAsetAm > 0">
                    <div class="com_box_type01 custom_list">
                        <a href="javascript:void(0)" role="button" class="new_tit_area" @click.prevent="fn_movePage('ASOA2001')">
                            <div class="tit"><span>금(gold)</span></div>
                            <span class="total_price ico_arrow">
                                <em class="num">{{goldAsetAm | numberFilter}}</em><em class="unit">원</em>
                            </span>
                        </a>
                    </div>
                </template>

                <!-- 기타 -->
                <template v-if="othrAstCnt > 0">
                    <div class="com_box_type01 custom_list">
                        <a href="javascript:void(0)" role="button" class="new_tit_area" @click.prevent="fn_movePage('ASOA2001')">   
                            <div class="tit"><span>기타</span></div>
                            <span class="total_price ico_arrow">
                                <em class="num">{{othrAstAm | numberFilter}}</em><em class="unit">원</em>
                            </span>
                        </a>
                    </div>                    
                </template>
            </div>
            <div class="new_add_register"><a href="javascript:void(0);" role="button" @click.prevent="fn_openAssetPage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
        <!--// content E -->
        
        <footersV2 type="as" />
    </page>
    <!--// content-view E -->
</template>

<script>
    import Page from '@/views/layout/Page.vue'
    import FootersV2 from "@/views/layout/FootersV2.vue"
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import commonService from '@/service/commonService'
    
    import {numberFormat} from '@/utils/number'
    import {amountCountAnimate} from '@/utils/jUtils'

    import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
    import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001' // 자산등록
    import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002' // 기관선택

    import CORE2201 from '@/views/page/CO/RE/CORE2201/CORE2201' // 부동산등록
    import COCA2101 from '@/views/page/CO/CA/COCA2101/COCA2101' // 자동차등록
    import COOA2003 from '@/views/page/CO/OA/COOA2003/COOA2003' // 빌린돈
    
    
    import {mapGetters} from 'vuex'    
    import {mapActions} from 'vuex'

    export default {
        name : "ASAC1001",
        data: () => {
            return {
                cusnm : "",
                rcnInqDtm   : "",	//최근조회일시
                asetTotAm   : 0,	//자산합계

                fnasTtAm    : 0,	//금융자산합계
                acBacAm     : 0,	//계좌잔액금액
                acCnt       : 0,	//계좌건수
                ivBacAm     : 0,	//투자잔액금액
                ivCnt       : 0,	//투자건수
                paymAm      : 0,    //페이머니금액
                paymCnt     : 0,    //페이머니건수
                isrCnt      : 0,	//보험건수

                dbTtAm      : 0,	//부채합계
                lnCnt       : 0,	//대출건수
                lnBacAm     : 0,	//대출잔액금액
                carItCnt    : 0,    //자동차할부건수 
                carItAm     : 0,    //자동차할부합계
                cdBacAm     : 0,	//카드잔액금액
                cdCnt       : 0,	//카드건수
                istBacAm    : 0,	//할부잔액금액
                istCnt      : 0,	//할부건수
                fncLesItCnt : 0,    //금융리스건수
                fncLesItAm  : 0,    //금융리스합계
                cshBacAm    : 0,	//현금잔액금액(현금차용)
                cshCnt      : 0,	//현금건수(현금차용)

                cshTtAm     : 0,	//현금합계(원화+외화)
                krwBacAm    : 0,	//원화잔액금액
                krwCnt      : 0,	//원화건수
                fcBacAm     : 0,	//외화잔액금액
                fcCnt       : 0,	//외화건수

                othrAstCnt  : 0,    //기타자산건수(현금, 외화, 골드 제외)
                othrAstAm   : 0,    //기타자산합계(현금, 외화, 골드 제외)

                goldAsetAm  : 0,    //골드자산금액

                rlestListCnt : 0,   //부동산목록건수
                rlestTtAm    : 0,   //부동산합계
                rlestList    : [],  //부동산리스트

                carListCnt   : 0,   //자동차목록건수
                carTtAm      : 0,   //자동차합계
                carList      : [],  //자동차리스트
                
            }
        },
        computed : {
            ...mapGetters('myassets', [
                'isMyAssetGathering','lastUpdateDtm'
            ]),
        },
        mixins: [
            commonMixin
        ],
        created() {
            //초기데이타 선언
            this.cusnm = this.getUserInfo("cusnm")
        },
        mounted() {
            this.initComponent()
            this.listenSubscribe() //자산수집 뮤테이션 처리용
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {
            ...mapActions('myassets', [
                'getAllMyAssetInfo'
            ]),            
            initComponent() {
                this.getData();
            },
            getData() {
                ///////////////////////////////////
                // 계좌목록 조회 
                const config = {
                    url: '/as/as/00ra1',
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config).then(response =>{
                    this.respInfo = response

                    this.rcnInqDtm  = this.respInfo.rcnInqDtm              //최근조회일시
                    this.asetTotAm  = Math.floor(this.respInfo.asetTotAm)  //자산합계

                    /// 금융자산
                    this.fnasTtAm   = this.respInfo.fnasTtAm            //금융자산합계
                    this.acBacAm    = this.respInfo.acBacAm             //계좌잔액금액
                    this.acCnt      = this.respInfo.acCnt               //계좌건수
                    this.ivBacAm    = this.respInfo.ivBacAm             //투자잔액금액
                    this.ivCnt      = this.respInfo.ivCnt               //투자건수
                    this.paymAm     = this.respInfo.paymAm              //페이머니금액
                    this.paymCnt    = this.respInfo.paymCnt             //페이머니건수
                    this.isrCnt     = this.respInfo.isrCnt              //보험건수

                    /// 부채
                    this.dbTtAm      = this.respInfo.dbTtAm             //부채합계
                    this.lnCnt       = this.respInfo.lnCnt              //대출건수
                    this.lnBacAm     = this.respInfo.lnBacAm            //대출잔액금액
                    this.carItCnt    = this.respInfo.carItCnt           //자동차할부건수 
                    this.carItAm     = this.respInfo.carItAm            //자동차할부합계
                    this.cdCnt       = this.respInfo.cdCnt              //카드건수
                    this.cdBacAm     = this.respInfo.cdBacAm            //카드잔액금액
                    this.istCnt      = this.respInfo.istCnt             //할부건수
                    this.istBacAm    = this.respInfo.istBacAm           //할부잔액금액
                    this.fncLesItCnt = this.respInfo.fncLesItCnt        //금융리스건수
                    this.fncLesItAm  = this.respInfo.fncLesItAm         //금융리스합계
                    this.cshCnt      = this.respInfo.cshCnt             //현금건수(현금차용)
                    this.cshBacAm    = this.respInfo.cshBacAm           //현금잔액금액(현금차용)

                    //현금(원화+외화)
                    this.cshTtAm     = this.respInfo.cshTtAm            //현금합계(원화+외화)
                    this.krwBacAm    = this.respInfo.krwBacAm           //원화잔액금액
                    this.krwCnt      = this.respInfo.krwCnt             //원화건수
                    this.fcBacAm     = this.respInfo.fcBacAm            //외화잔액금액
                    this.fcCnt       = this.respInfo.fcCnt              //외화건수

                    //기타
                    this.othrAstCnt  = this.respInfo.othrAstCnt         //기타자산건수
                    this.othrAstAm   = this.respInfo.othrAstAm          //기타자산합계

                    //금
                    this.goldAsetAm   = this.respInfo.goldAsetAm        //골드자산금액
                    
                    //부동산
                    this.rlestListCnt = this.respInfo.rlestListCnt      //부동산목록건수
                    this.rlestTtAm    = this.respInfo.rlestTtAm         //부동산총금액
                    this.rlestList    = this.respInfo.rlestList || []   //부동산리스트

                    //자동차
                    this.carListCnt   = this.respInfo.carListCnt        //자동차목록건수
                    this.carTtAm      = this.respInfo.carTtAm           //자동차합계
                    this.carList      = this.respInfo.carList || []     //자동차리스트

                    console.log('12345: ', this.carList)

                    /*
                    let plusRlestAm   = 0
                    for(let i=0; i<this.rlestList.length; i++) {
                        if(this.rlestList[i].rlestTngDsc == '6' || this.rlestList[i].rlestTngDsc == '7' || this.rlestList[i].rlestTngDsc == '9') {
                            plusRlestAm = Number(plusRlestAm) + Number(this.rlestList[i].rlestTrPr);
                        }
                    }
                    //console.log("토지 상가 기타 금액 합산 = " + plusRlestAm)
                    this.rlestTtAm    = Number(this.respInfo.rlestTtAm) + (Number(plusRlestAm)*10000)     //부동산총금액
                    this.asetTotAm    = Math.floor(Number(this.respInfo.asetTotAm) + (Number(plusRlestAm)*10000))  //자산합계
                    */

                    //총 금액 변경 이후 금액 Animate 처리 함수 호출
                    amountCountAnimate("asetTotAm", this.asetTotAm)
                })
            },

            fn_numberFormatKorAmt(number) {
                const unit = ['', '만', '억', '조', '경']
                const splitAmt = 10000
                const splitCnt = unit.length

                let resultArray = []
                let resultString = ""

                for(let i = 0; i < splitCnt; i++){
                    let rst = (number % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
                    rst = Math.floor(rst)

                    if(rst > 0){
                        resultArray[i] = rst
                    }
                }

                let strIdx = 0  // 최초시작지점에 '원' 추가가히위함

                for(let j = 0; j < resultArray.length; j++){
                    if(!resultArray[j])  {
                        strIdx++
                        continue
                    }

                    if(j === strIdx) {
                        resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '원</em>' + resultString
                    } else {
                        resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '</em>' + resultString
                    }
                }

                return resultString
            },

            /*
            * 화면이동
            */
            fn_movePage(menu) {
				const config = {
					name: menu
                }
                
                commonService.movePage(config)
            },

            /*
            * 자산등록 팝업호출
            */
            fn_openAssetPage() {                
                const config = {
                    component: COAR2001,
                }
                modalService.openPopup(config).then(() => {
                    this.getData();
                })
            },

            // 신규 자산 연결
            fn_openNewConnect(orgDsc) {
                // modalService.alert(orgDsc + " 자산 연결 준비중입니다.")
                const config = {
                    component : COAR2002,
                    params : {
                        isMramNew : true,
                        orgDsc : orgDsc
                    }
                }
                modalService.openPopup(config).then(() => {
                    
                })
            },


            /*
            * 부동산 자가/전세/월세 구분 명
            */
            fn_getRlestFormDscNm(dsc) {
                let cmmLnList = this.getCodeList("RLEST_RSD_FORM_DSC");
                return cmmLnList[cmmLnList.findIndex(x => x.comnCVal === dsc)].comnCExpl
            },

            /*
            * 자산 수집 호출 (기관코드 0000000000은 ==> 전체 수집 의미)
            */
            fn_refreshApiCall() {
                this.getAllMyAssetInfo()

            },

            /*
            * 부동산/자동차 등록 팝업호출
            */
            openRlAssetPop(popId) {
                let popName = ""
                switch(popId) {
                    case 'CORE2201':
                        popName = CORE2201	// 부동산
                        break
                    case 'COCA2101':
                        popName = COCA2101	// 자동차
                        break
                    case 'COOA2003':
                        popName = COOA2003	// 빌린돈
                        break
                        
                    default : ''
                }
                const config = {
                    component: popName,
                    params: {"popId":popId}
                }
                modalService.openPopup(config).then(response=> {
                    if(response.popId != "") {
                        this.getData();
                    }
                })
            },
            // 자산수집 mutation 이벤트 감지 
            listenSubscribe() {
                this.getGatheringListenSubscribe()
                // this.subscribe = this.$store.subscribe((mutation, state) => {
                //     const isMyAssetGathering = mutation.type === 'myassets/completeMyAssetGatherData'
                //     // 예금 전체조회
                //     if (isMyAssetGathering) {
                //         console.log('자산수집 subscribe  ###############################', mutation, state)
                //         this.getData()
                //     }
                // })
            },
            // 공통코드 명칭 변환
            getComCodeNm(code, codeValue) {
                const codeList = this.getCodeList(code);
                let codeObj = '';

                if(codeList.length > 0) {
                    codeObj = codeList.find((codeTmp) => codeTmp.comnCVal == codeValue);

                    if(codeObj == 'undefined' || codeObj == null) {
                        return codeObj;
                    }
                } else {
                    return codeObj;
                }
                //console.log("codeList = ", codeList);
                //console.log("codeObj = ", codeObj);

                return codeObj.comnCExpl;
            }
        },
        components : {
            Page,
            FootersV2,
            AsCategoryV2,
        }
    }
</script>