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
* 2025-03-10              CS541015              상호금융 NH콕마이데이터 4.0 추진 개발 (ASOA2006 → ASOA4006)
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
                                    <input type="radio" name="radio1" :id="'radio1-'+idx" :checked="item.goldKdc===selectedGoldMprList.goldKdc"> 
                                    <label :for="'radio1-'+idx">
                                        <span>{{item.goldKdnm}}</span>
                                    </label>	
                                </div>
                            </li>
                        </ul>
                    </div>

                    <!-- [v4.0]내가살때,팔때 금액을 국내 금 가격으로 변경 -->
                    <div class="flex_gray_wrap">
                        <div class="re_flex">
                            <strong class="text_info list_name">국내 금 가격</strong>
                            <!-- [v4.0] 25-02-26 면책조항 툴팁 추가 -->
                            <div class="list_price">
                                <span><em>{{goldMprAm | numberFilter}}</em>원</span>
                                <div class="custom_tooltip">
                                    <div class="com_tooltip_type02 com_tooltip_type03">
                                        <a href="#nolink" class="com_btn_info" role="button">
                                            <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                        </a>
                                        <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                            <div>
                                                <div class="disclaimer_list">
                                                    <strong class="h_tit03">면책조항</strong>
                                                    <ul class="bl_dot_list">
                                                        <li>농업협동조합중앙회가 제공하는 금시세정보는 금거래소의 정보를 토대로 제공되는 투자 참고 사항이며 오류가 발생하거나 지연될 수 있습니다.</li>
                                                        <li>제공된 정보에 의한 투자 결과에 법적 책임을 지지 않습니다.</li>
                                                        <li>실물 구입 시 부가가치세 10%가 부과될 수 있습니다.</li>
                                                    </ul>
                                                </div>
                                                <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- //[v4.0] 25-02-26 면책조항 툴팁 추가 -->
                            <span class="clear_txt_right">
                                (<span>{{goldMprBasDt | dateFilter('YYYY.MM.DD')}}</span><em class="unit">기준</em>)
                            </span>
                        </div>
                    </div>
                    <!-- // [v4.0]내가살때,팔때 금액을 국내 금 가격으로 변경 -->
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
    name : "ASOA4006",
    data: () => {
        return {
            goldMprList         : [], // 골드별시세정보
            selectedGoldMprList : [],
            selectedGoldMpr     : "", // 선택된 골드시세정보
            goldMprBasDt        : "", // 최근 시세 등록일자
            goldMprAm           : 0,
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
            this.selectedGoldMprList = params.selectedGoldMprList;
            this.getGoldMpr();

        },
        getGoldMpr(){
            // 최신 금시세 조회
            const config = {
                url: "/as/oa/05ra2"
            };
            apiService.call(config).then(response => {
                this.goldMprList = response.gldMprList || [];
                this.selectMpr(this.goldMprList.filter(t => t.goldKdc == this.selectedGoldMprList.goldKdc)[0]);
            });
        },
        selectMpr(mprInfo) {
            this.selectedGoldMpr = mprInfo;
            this.goldMprBasDt = this.selectedGoldMpr.goldMprBasDt;
            this.goldMprAm = this.selectedGoldMpr.goldPucMpr;
        },
    },
}
</script>