<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산현황 > 보험
* @ 페이지설명 : 나의자산 > 자산현황 > 보험 메인
* @ 파일명     : src/views/page/AS/IS/ASIS2001/ASIS2001.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-11              CS533571              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view hasLNB mydata2023">
        <!-- S :: 자산 카테고리 -->
        <!--
        <as-category-v2 type="AC"></as-category-v2>
        -->
        <!-- E :: 자산 카테고리 -->

        <!-- S :: 자산 서브 카테고리 -->
        <as-sub-category-v2 type="IS"></as-sub-category-v2>
        <!-- E :: 자산 서브 카테고리 -->
        <!--
        <div id="content" class="renewal insur" v-if="totInsuCn > 0">
        -->
        <div id="content" v-if="totInsuCn > 0">
            <div class="com_inner">
                <div class="new_sub_info">
                    <div class="title">
                        <div class="text">
                            이번달 납입 총 보험료<br>
                            <span class="fs-27">총 </span><strong><span class="num">{{isrTotPymIsrfe | numberFilter}}</span>원</strong>
                            <div class="custom_tooltip">
                                <div class="com_tooltip_type02 com_tooltip_type03">
                                    <a href="javascript:void(0);" class="com_btn_info" role="button">
                                        <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                    </a>
                                    <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                        <div>
                                            <p>매월 납입해야 하는 보험료의 합산 금액입니다.</p>
                                            <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--
                <div class="link_banner">
                    <a href="javascript:void(0);" role="button">
                        <img src="@/assets_v40/images/banner/link_banner_03.png" alt="신한세배드림적금을 복리식정기예탁금에 예치하고 높은이자 받기">
                    </a>
                </div>
                -->
                <cmm-financial-banner asdbDsc="04"/>
            </div>
            
            <hr class="hr02">

            <div class="com_inner">
                <strong class="com_pop_tit01" v-if="(insuCn + carInsuCn + tngInsuCn) > 0">주계약자</strong>
                <!-- 인보험 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="insuCn > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>인보험</span> <span class="com_icon_num custom">{{insuCn}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{mnTotPymIsrfe | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in insuList" :key="'insu_'+idx">
                            <a href="javascript:void(0);" role="button" v-on:click.prevent="openDetailPop(item, 'main')" class="has_badge">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.isrcoWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="prod_num">{{item.isrSctsNo}}</span>
                                    </dd>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.isrPymIsrfe | numberFilter}}</em><em class="unit">원</em><em class="int">{{item.isrPymFqNm}}</em>
                                        </span>
                                    </dd>
                                </dl>
                                <span v-if="showStatus(item.isrCtrStsc)" :class="getStatusClass(item.isrCtrStsc)">{{item.isrCtrStsnm}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!--// 인보험 -->
                
                <!-- 물보험 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="carInsuCn + tngInsuCn > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>물보험</span> <span class="com_icon_num custom">{{tngInsuCn + carInsuCn}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{tngTotPymIsrfe | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in tngInsuList" :key="'tngInsu_'+idx">
                            <a href="javascript:void(0);" role="button" v-on:click.prevent="openDetailPop(item, 'main')" class="has_badge">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.isrcoWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="prod_num">{{item.isrSctsNo}}</span>
                                    </dd>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.isrPymIsrfe | numberFilter}}</em><em class="unit">원</em><em class="int">{{item.isrPymFqNm}}</em>
                                        </span>
                                    </dd>
                                </dl>
                                <span v-if="showStatus(item.isrCtrStsc)" :class="getStatusClass(item.isrCtrStsc)">{{item.isrCtrStsnm}}</span>
                            </a>
                        </li>
                        <li v-for="(item, idx) in carInsuList" :key="'carInsu_'+idx">
                            <a href="javascript:void(0);" role="button" v-on:click.prevent="openDetailPop(item, 'main')" class="has_badge">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.isrcoWrsnm}} <em class="carNum">({{item.isrVhcno}})</em></em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="prod_num">{{item.isrSctsNo}}</span>
                                    </dd>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.tcarIsrIsrfe | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <span v-if="showStatus(item.isrCtrStsc)" :class="getStatusClass(item.isrCtrStsc)">{{item.isrCtrStsnm}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!--// 물보험 -->

                <strong class="com_pop_tit01 mt30" v-if="atisrInsuCn + atisrTngInsuCn + atisrCarInsuCn > 0">피보험 계약자</strong>
                <!-- 인보험 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="atisrInsuCn > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>인보험</span> <span class="com_icon_num custom">{{atisrInsuCn}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{atMnTotPymIsrfe | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in atisrInsuList" :key="'atisrInsu_'+idx">
                            <a @click.prevent="openDetailPop(item, 'anti')" href="javascript:void(0);" role="button" class="has_badge">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.isrcoWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="prod_num">{{item.isrSctsNo}}</span>
                                    </dd>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.isrPymIsrfe | numberFilter}}</em><em class="unit">원</em><em class="int">{{item.isrPymFqNm}}</em>
                                        </span>
                                    </dd>
                                </dl>
                                <span v-if="showStatus(item.isrCtrStsc)" :class="getStatusClass(item.isrCtrStsc)">{{item.isrCtrStsnm}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!--// 인보험 -->
                <!-- 물보험 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="(atisrTngInsuCn + atisrCarInsuCn) > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>물보험</span> <span class="com_icon_num custom">{{atisrTngInsuCn + atisrCarInsuCn}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{atTngTotPymIsrfe | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in atisrTngInsuList" :key="'atisrTngInsu_'+idx">
                            <a @click.prevent="openDetailPop(item, 'anti')" href="javascript:void(0);" role="button" class="has_badge">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.isrcoWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="prod_num">{{item.isrSctsNo}}</span>
                                    </dd>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.isrPymIsrfe | numberFilter}}</em><em class="unit">원</em><em v-if="item.isrPymFqNm" class="int">{{item.isrPymFqNm}}</em>
                                        </span>
                                    </dd>
                                </dl>
                                <span v-if="showStatus(item.isrCtrStsc)" :class="getStatusClass(item.isrCtrStsc)">{{item.isrCtrStsnm}}</span>
                            </a>
                        </li>
                        <li v-for="(item, idx) in atisrCarInsuList" :key="'atisrCarInsu_'+idx">
                            <a @click.prevent="openDetailPop(item, 'anti')" href="javascript:void(0);" role="button" class="has_badge">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.isrcoWrsnm}} <em class="carNum">({{item.isrVhcno}})</em></em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="prod_num">{{item.isrSctsNo}}</span>
                                    </dd>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.tcarIsrIsrfe | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <span v-if="showStatus(item.isrCtrStsc)" :class="getStatusClass(item.isrCtrStsc)">{{item.isrCtrStsnm}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!--// 물보험 -->
            </div>
            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="moveAssetRegisterPage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
        <div id="content" class="renewal insur" v-else>
            <div class="com_inner">
                <div class="no_data_box no_data_box01 grayExclamationType">
                    <div class="no_data_list">
                        <p class="txt_sub">조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </div>
            
            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="moveAssetRegisterPage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
        <footersV2 type="as"/>
    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
import AsSubCategoryV2 from '@/components/category/AsSubCategoryV2.vue'
import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'

import ASIS2002 from '@/views/page/AS/IS/ASIS2002/ASIS2002'
import ASIS2006 from '@/views/page/AS/IS/ASIS2006/ASIS2006'
import ASIS2010 from '@/views/page/AS/IS/ASIS2010/ASIS2010'
import ASIS2012 from '@/views/page/AS/IS/ASIS2012/ASIS2012'
import ASIS2016 from '@/views/page/AS/IS/ASIS2016/ASIS2016'
import ASIS2018 from '@/views/page/AS/IS/ASIS2018/ASIS2018'
import ASIS2021 from '@/views/page/AS/IS/ASIS2021/ASIS2021'
import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'     // To-Be 자산등록 팝업

export default {
    name : "ASIS2001",
    data: () => {
        return {
            totInsuCn       : 0,  // 전체보험개수
            isrTotPymIsrfe  : 0,  // 이번달납입총보험료

            insuCn          : 0,  // 인보험개수
            mnTotPymIsrfe   : 0,  // 인보험월납입총보험료
            insuList        : [], // 인보험리스트

            tngInsuCn       : 0,  // 물보험개수
            tngTotPymIsrfe  : 0,  // 물보험월납입총보험료
            tngInsuList     : [], // 물보험리스트

            carInsuCn       : 0,  // 자동차보험개수
            carInsuList     : [], // 자동차보험리스트

            atMnTotPymIsrfe : 0,  // 피보험자 인보험월납입총보험료
            atisrInsuCn     : 0,  // 피보험자 보험목록건수
            atisrInsuList   : [], // 피보험자 인보험리스트

            atTngTotPymIsrfe: 0,  // 피보험자 물보험월납입총보험료
            atisrTngInsuCn  : 0,  // 피보험자 물보험목록건수
            atisrTngInsuList: [], // 피보험자 물보험리스트

            atisrCarInsuCn  : 0,  // 피보험자 자동차보험목록건수
            atisrCarInsuList: [], // 피보험자 자동차보험리스트

            // 인보험 보험종류 코드
            insuIsrKdDsc    : ["01", "02", "03", "04", "05", "06", "07", "08", "11", "12", "16", "22", "99"], 
            // 물보험 보험종류 코드
            tngIsrKdDsc     : ["23", "24", "25", "26", "27", "28", "29", "31", "13", "14", "15", "32", "18", "19", "20", "21", "33", "98", "97"], 
            // 자동차보험 보험종류 코드
            carIsrKdDsc     : ["17"], 
            // 연금보험 보험종류 코드
            pensionIsrKdDsc : ["09", "10", "30"], 
        }
    },
    mounted() {
        this.initComponent();

        // 자산수집 mutation 이벤트 감지 
        this.getGatheringListenSubscribe()
        
        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    mixins: [
        commonMixin
    ],
    methods: {
        initComponent() {
            this.getData();
        },
        getData() {
            const config = {
                url: '/as/is/01r01',
                data: {
                    mydtCusno : this.getUserInfo('mydtCusno') // 고객번호
                }
            };
            console.log(config);

            apiService.call(config).then(response => {
                this.isrTotPymIsrfe     = response.isrTotPymIsrfe;

                // 주계약자 인보험
                this.insuCn             = response.insuCn || 0;
                this.insuList           = response.insuList || [];
                this.mnTotPymIsrfe      = response.mnTotPymIsrfe || 0;

                // 주계약자 물보험
                this.tngInsuCn          = response.tngInsuCn || 0;
                this.tngTotPymIsrfe     = response.tngTotPymIsrfe;
                this.tngInsuList        = response.tngInsuList || [];

                this.carInsuCn          = response.carInsuCn || 0;
                this.carInsuList        = response.carInsuList || [];

                // 피보험자 인보험
                this.atMnTotPymIsrfe    = response.atMnTotPymIsrfe;
                this.atisrInsuCn        = response.atisrInsuCn || 0;
                this.atisrInsuList      = response.atisrInsuList || [];

                // 피보험자 물보험
                this.atTngTotPymIsrfe   = response.atTngTotPymIsrfe;
                this.atisrTngInsuCn     = response.atisrTngInsuCn || 0;
                this.atisrTngInsuList   = response.atisrTngInsuList || [];

                // 피보험자 자동차보험
                this.atisrCarInsuCn     = response.atisrCarInsuCn || 0;
                this.atisrCarInsuList   = response.atisrCarInsuList || [];

                this.totInsuCn = this.insuCn + this.tngInsuCn + this.carInsuCn + this.atisrInsuCn + this.atisrTngInsuCn + this.atisrCarInsuCn;

                this.callJQueryFncExcute()
            });
        },
        openDetailPop(insuInfo, type) {
            let compName = "";
            //주계약자
            if(type == 'main') {
                if(this.insuIsrKdDsc.indexOf(insuInfo.isrKdDsc) > -1) {
                    compName = ASIS2002; // 상세내역(인보험 상세 납입정보탭)

                } else if(this.pensionIsrKdDsc.indexOf(insuInfo.isrKdDsc) > -1) {
                    compName = ASIS2012; // 상세내역(연금저축보험 상세 납입정보탭)

                } else if(this.tngIsrKdDsc.indexOf(insuInfo.isrKdDsc) > -1) {
                    compName = ASIS2006; // 상세내역(물보험 상세 납입정보탭)

                } else if(this.carIsrKdDsc.indexOf(insuInfo.isrKdDsc) > -1) {
                    compName = ASIS2010; // 상세내역(자동차 보험 상세)
                }

            //피보험계약자
            } else if(type == 'anti') {
                if(this.insuIsrKdDsc.indexOf(insuInfo.isrKdDsc) > -1) {
                    compName = ASIS2016; // 상세내역(피보험자 인보험 상세)

                } else if(this.pensionIsrKdDsc.indexOf(insuInfo.isrKdDsc) > -1) {
                    compName = ASIS2016; // 상세내역(피보험자 연금저축보험 상세)

                } else if(this.tngIsrKdDsc.indexOf(insuInfo.isrKdDsc) > -1) {
                    compName = ASIS2018; // 상세내역(피보험자 물보험 상세)

                } else if(this.carIsrKdDsc.indexOf(insuInfo.isrKdDsc) > -1) {
                    compName = ASIS2021; // 상세내역(피보험자 자동차 보험 상세)
                }
            }

            const config = {
                component : compName,
                params    : insuInfo
            };

            modalService.openPopup(config).then(() => {
                this.getData();
            });
        },
        moveAssetRegisterPage() {
            const config = {
                component: COAR2001
            }
            modalService.openPopup(config).then((response) => {
                if (response == true) { // 자산등록완료
                    this.getData();
                }
            })
        },
        /**
         * 보험 상태에 따른 배지 class
         */
        getStatusClass(isrSctrStsc) {
            // 정상
            if(isrSctrStsc == '02') {
                return 'mint_badge'
            }else if(isrSctrStsc == '04') {
                return ['mint_badge', 'orng']
            // 만기
            }else if(isrSctrStsc == '05') {
                return ['mint_badge', 'red2']
            // 소멸
            }else if(isrSctrStsc == '06') {
                return ['mint_badge', 'gray']
            }
            return ''
        },
        /**
         * 보험 상태에 따른 배지 class
         */
        showStatus(isrSctrStsc) {
            if(isrSctrStsc == '02' ||isrSctrStsc == '04' || isrSctrStsc == '05' || isrSctrStsc == '06') {
                return true
            }
            return false
        }
    },
    components : {
        Page,
        FootersV2,
        AsCategoryV2,
        AsSubCategoryV2,
        CmmFinancialBanner
    }
}
</script>