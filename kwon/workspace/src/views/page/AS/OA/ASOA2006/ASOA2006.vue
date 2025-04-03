<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 기타
* @ 페이지설명 : 나의자산 > 자산 > 기타 금 > 금 시세 조회 슬라이드 팝업
* @ 파일명     : src/views/page/AS/OA/ASOA2006/ASOA2006.vue
* @ 작성자     : CS528205
* @ 작성일     : 2022-07-22
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-22              CS528205              최초작성 
* 2023-09-08              CS533571              마이데이터 확대개발 화면ID만 변경(ASOA1006 -> ASOA2006)
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>국내 금 시세 조회(원/g)</h1>
                    <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
                </div>
                <div class="popup_content">
                    <div class="custom_check_list">
                        <ul class="com_radio_type04 h_mid">
                            <li v-for="(item, idx) in goldMprList" :key="idx">
                                <div class="btn_radio" v-on:click="selectMpr(item)">
                                    <!-- 초기값 24K -->
                                    <input type="radio" name="radio1" :id="'radio1-'+idx" :checked="item.goldKdc==='01'"> 
                                    <label :for="'radio1-'+idx">
                                        <span>{{item.goldKdnm}}</span>
                                    </label>	
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="re_detail_list type2">
                        <ul>
                            <li>
                                <div class="re_flex" role="text"><!-- 22-10-20 접근성 role 추가-->
                                    <strong class="text_info">내가 살 때</strong>
                                    <span class="blind">{{getBlindStr(selectedGoldMpr.goldPucMprDiff)}}</span>
                                    <span :class="getDiffCss(selectedGoldMpr.goldPucMprDiff)">
                                            <strong>{{selectedGoldMpr.goldPucMprDiff | numberFilter}}</strong><span>원</span>
                                    </span>
                                    <span class="list_price">
                                        <em>{{selectedGoldMpr.goldPucMpr | numberFilter}}</em>원
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="re_flex" role="text"><!-- 22-10-20 접근성 role 추가-->
                                    <strong class="text_info">내가 팔 때</strong>
                                    <span class="blind">{{getBlindStr(selectedGoldMpr.goldSleMprDiff)}}</span>
                                    <span :class="getDiffCss(selectedGoldMpr.goldSleMprDiff)">
                                            <strong>{{selectedGoldMpr.goldSleMprDiff | numberFilter}}</strong><span>원</span>
                                    </span>
                                    <span class="list_price">
                                        <em>{{selectedGoldMpr.goldSleMpr | numberFilter}}</em>원
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <p class="right_txt"><em class="robo_r">{{goldMprBasDt | dateFilter('YYYY.MM.DD')}}</em> 기준</p>
                </div>
                
                <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

export default {
    name : "ASOA2006",
    data: () => {
        return {
            goldMprList          : [], // 골드별시세정보
            selectedGoldMpr     : "", // 선택된 골드시세정보
            goldMprBasDt        : ""  // 최근 시세 등록일자
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        // 팝업화면 초기화
        initComponent(params) {
            this.goldMprList = params.goldMprList; 
            this.selectMpr(this.goldMprList[0])
        },
        selectMpr(mprInfo) {
            this.selectedGoldMpr = mprInfo;
            this.goldMprBasDt = mprInfo.goldMprBasDt;
        },
        getDiffCss(diff) {
            if (diff > 0)
                return "raise"
            else if (diff == 0)
                return "zero"
            else 
                return "decrease"
        },
        getBlindStr(diff) {
            if (diff > 0)
                return "상승"
            else if (diff == 0)
                return "유지"
            else 
                return "하락"
        }
    },
}
</script>