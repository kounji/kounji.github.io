<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 기타
* @ 페이지설명 : 나의자산 > 자산 > 기타 메인
* @ 파일명     : src/views/page/AS/OA/ASOA2001/ASOA2001.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-05-27
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-27              CS516033              최초작성
* 2021-08-09              CS516033              2차개발
* 2022-07-25              CS528205              고도화 파일명, UI 변경 및 고도화 개발(ASRA1105.vue -> ASOA2001.vue)
* 2023-07-28              CS533571              마이데이터 확대개발 UI/UX 변경
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
        <as-sub-category-v2 type="RA3"></as-sub-category-v2>
        <!-- E :: 자산 서브 카테고리 -->
        <!--
        <div id="content" class="renewal" v-if="asetCn > 0">
        -->
        <div id="content" v-if="asetCn > 0">
            <div class="com_inner">
                <div class="new_sub_info">
                    <div class="title">
                        <div class="text">
                            흩어져 있는 돈<br>
                            <span class="fs-27">총 </span><strong><span class="num">{{asetAmtt | numberFilter}}</span>원</strong>
                        </div>
                    </div>
                </div>
            </div>
            
            <hr class="hr02">

            <div class="com_inner etc">
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="cshAstCn > 0">
                    <div class="new_tit_area">
                        <div class="tit"><span>현금</span> <span class="com_icon_num custom">{{cshAstCn}}</span></div>
                        <span class="total_price">
                            <em class="num">{{cshAsetAmtt | numberFilter}}</em><em class="unit">원</em>
                        </span>
                    </div>
                    
                    <ul class="list_type_01">
                        <li v-for="(cshAst, idx) in cshAstList" :key="'csh_'+idx">
                            <a href="javascript:void(0);" role="button" v-on:click.prevent="openDetailPop('1', cshAst)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i class="icon_money"></i>
                                            <em class="prod_name">{{cshAst.astnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{cshAst.asetAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
            
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="fcCshAstCn > 0">
                    <div class="new_tit_area">
                        <div class="tit"><span>외화</span> <span class="com_icon_num custom">{{fcCshAstCn}}</span></div>
                        <span class="total_price">
                            <em class="num">{{fcAsetAmtt | numberFilter}}</em><em class="unit">원</em>
                        </span>
                    </div>
                    
                    <ul class="list_type_01">
                        <li v-for="(fcCshAst, idx) in fcCshAstList" :key="'fcCsh_'+idx">
                            <a href="javascript:void(0);" role="button" v-on:click.prevent="openDetailPop('2', fcCshAst)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i  :class="'ico_'+fcCshAst.curc"></i>
                                            <em class="prod_name">{{fcCshAst.curc}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{Math.floor(fcCshAst.krwAm) | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="gldAstCn > 0">
                    <div class="new_tit_area">
                        <div class="tit"><span>금</span> <span class="com_icon_num custom">{{gldAstCn}}</span></div>
                        <span class="total_price">
                            <em class="num">{{goldAsetAmtt | numberFilter}}</em><em class="unit">원</em>
                        </span>
                    </div>
                    
                    <ul class="list_type_01">
                        <li v-for="(gldAst, idx) in gldAstList" :key="'gld_'+idx">
                            <a href="javascript:void(0);" role="button" v-on:click.prevent="openDetailPop('3', gldAst)">
                                <dl>
                                    <dt>
                                        <div>
                                            <!-- class명 확인 필요 -->
                                            <i class="icon_gold"><span class="blind">{{gldAst.goldKdnm}}</span></i>
                                            <em class="prod_name">{{gldAst.goldKdc != "04" ? gldAst.goldKdnm + "금" : gldAst.goldKdnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{Math.floor(gldAst.goldAsetAm) | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="fmachAstCn > 0">
                    <div class="new_tit_area">
                        <div class="tit"><span>농기계</span> <span class="com_icon_num custom">{{fmachAstCn}}</span></div>
                        <span class="total_price">
                            <em class="num">{{fmachAsetAmtt | numberFilter}}</em><em class="unit">원</em>
                        </span>
                    </div>
                    
                    <ul class="list_type_01">
                        <li v-for="(fmachAst, idx) in fmachAstList" :key="'fmach_'+idx">
                            <a href="javascript:void(0);" role="button" v-on:click.prevent="openDetailPop('5', fmachAst)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i class="icon_farm"></i>
                                            <em class="prod_name">{{fmachAst.astnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{fmachAst.asetAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="etcAstCn > 0">
                    <div class="new_tit_area">
                        <div class="tit"><span>기타</span> <span class="com_icon_num custom">{{etcAstCn}}</span></div>
                        <span class="total_price">
                            <em class="num">{{etcAsetAmtt | numberFilter}}</em><em class="unit">원</em>
                        </span>
                    </div>
                    
                    <ul class="list_type_01">
                        <li v-for="(etcAst, idx) in etcAstList" :key="'etc_'+idx">
                            <a href="javascript:void(0);" role="button" v-on:click.prevent="openDetailPop('4', etcAst)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i class="icon_etc02"></i>
                                            <em class="prod_name">{{etcAst.astnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{etcAst.asetAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="movePage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
        
        <div id="content" class="renewal" v-else>
            <div class="com_inner">
                <div class="no_data_box no_data_box01 grayExclamationType">
                    <div class="no_data_list">
                        <p class="txt_sub">조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </div>

            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="movePage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
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
    // import {amountCountAnimate} from '@/utils/jUtils'

    import ASRA2106 from '@/views/page/AS/RA/ASRA2106/ASRA2106'
    import ASRA2107 from '@/views/page/AS/RA/ASRA2107/ASRA2107'
    import ASOA4005 from '@/views/page/AS/OA/ASOA4005/ASOA4005'
    import ASRA2109 from '@/views/page/AS/RA/ASRA2109/ASRA2109'
    import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'
    import ASOA2009 from '@/views/page/AS/OA/ASOA2009/ASOA2009'

    export default {
        name : "ASOA2001",
        data: () => {
            return {
                asetCn       : 0,  // 자산총건수
                asetAmtt     : 0,  // 자산금액합계
                cshAsetAmtt  : 0,  // 현금자산금액합계
                cshAstCn     : 0,  // 현금자산목록건수
                cshAstList   : [], // 현금자산목록
                fcAsetAmtt   : 0,  // 외화자산금액합계
                fcCshAstCn   : 0,  // 외화현금자산건수
                fcCshAstList : [], // 외화현금자산목록
                goldAsetAmtt : 0,  // 금자산금액합계
                gldAstCn     : 0,  // 금자산건수
                gldAstList   : [], // 금자산목록
                etcAsetAmtt  : 0,  // 기타자산금액합계
                etcAstCn     : 0,  // 기타자산건수
                etcAstList   : [], // 기타자산목록
                fmachAsetAmtt  : 0, // 농기계자산금액합계
                fmachAstCn     : 0, // 농기계자산건수
                fmachAstList   : [],// 농기계자산목록
            }
        }, 
        mounted() {
            this.initComponent();

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
                // 기타자산 통합조회 v2
                const config = {
                    url: '/as/oa/01r01',
                    data: {
                        mydtCusno : this.getUserInfo('mydtCusno') // 고객번호
                    }
                };

                apiService.call(config).then(response => {
                    this.asetCn       = response.asetCn;
                    this.asetAmtt     = Math.floor(response.asetAmtt);
                    this.cshAsetAmtt  = response.cshAsetAmtt;
                    this.cshAstCn     = response.cshAstCn;
                    this.cshAstList   = response.cshAstList || [];
                    this.fcAsetAmtt   = response.fcAsetAmtt;
                    this.fcCshAstCn   = response.fcCshAstCn;
                    this.fcCshAstList = response.fcCshAstList || [];
                    this.goldAsetAmtt = response.goldAsetAmtt;
                    this.gldAstCn     = response.gldAstCn;
                    this.gldAstList   = response.gldAstList || [];
                    this.etcAsetAmtt  = response.etcAsetAmtt;
                    this.etcAstCn     = response.etcAstCn;
                    this.etcAstList   = response.etcAstList || [];
                    this.fmachAsetAmtt = response.fmachAsetAmtt;
                    this.fmachAstCn    = response.fmachAstCn;
                    this.fmachAstList  = response.fmachAstList || [];

                    this.$nextTick(() => {
                        this.callJQueryFncExcute();
                    });

                    // 금액 Animate 처리 함수 호출
                    // amountCountAnimate("asetAmtt", this.asetAmtt);
                });
            },
            openDetailPop(type, astInfo) {
                let compName = "";
                if (type == "1") {
                    compName = ASRA2106; // 현금
                } else if (type == "2") {
                    compName = ASRA2107; // 외화
                } else if (type == "3") {
                    compName = ASOA4005; // 금
                } else if (type == "5") {     // 농기계
                    compName = ASOA2009
                } else if (type == "4") {
                    compName = ASRA2109; // 그밖에
                }

                const config = {
                    component : compName,
                    params    : astInfo
                };

                modalService.openPopup(config).then(() => {
                    this.getData();
                });
            },
            movePage() {
                const config = {
                    component: COAR2001
                }
                modalService.openPopup(config).then((response) => {
                    console.log("자산 등록 완료", response)
                    this.getData();
                })
            },
            // 통화코드
            fn_getCurcNm(cVal) {
                let cmmLnList = this.getCodeList("CURC");
                for (let i=0; i<cmmLnList.length; i++) {
                    if (cVal === cmmLnList[i].comnCVal) {
                        return cmmLnList[i].comnCExpl;
                    }
                }
            },
            // 골드종류아이콘명
            fn_goldKdicnm(goldKdc) {
                let goldKdicnm = "";

                if (goldKdc == "01") {
                    goldKdicnm = "24"; // 24K
                } else if (goldKdc == "02") {
                    goldKdicnm = "18"; // 18K
                } else if (goldKdc == "03") {
                    goldKdicnm = "14"; // 14K
                } else if (goldKdc == "04") {
                    goldKdicnm = "_white"; // 백금
                }

                return "gold" + goldKdicnm;
            }
        },
        components : {
            Page,
            FootersV2,
            AsCategoryV2,
            AsSubCategoryV2
        }
    }
</script>