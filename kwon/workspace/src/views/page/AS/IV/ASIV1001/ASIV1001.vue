<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 투자
* @ 페이지설명 : 나의자산 > 자산 > 투자 메인
* @ 파일명     : src/views/page/AS/IV/ASIV1001/ASIV1001.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515729                 최초작성
* 2022-07-05              CS528205                 고도화 파일명, UI 변경 및 고도화 개발(ASIV1101.vue -> ASIV1001.vue)
*************************************************************************/
-->
<template>

    <page class="content-view hasLNB">
        <!-- S :: 자산 카테고리 -->
        <as-category-v2 type="AC"></as-category-v2>
        <!-- E :: 자산 카테고리 -->

        <!-- S :: 자산 SUB카테고리 -->
        <as-sub-category-v2 type="IV"></as-sub-category-v2>
        <!-- E :: 자산 SUB카테고리 -->

        <div id="content" class="renewal com_bg_type00" v-if="getIsDataYn">
            <div class="com_inner com_line_type01 com_line_round"><!-- 2022-10-07 class 삭제-->
                <div class="new_sub_info">
                    <div class="title">
                        <div class="text">
                            <span class="num">{{ivtotAccn}}</span>개의 투자상품에<br/>
                            총 <span class="num counter" :data-count="ivAcTotBac | numberFilter" >{{ivAcTotBac | numberFilter}}</span>원이 있어요.
                        </div><!-- 2022-07-01 text 원 추가 -->
                    </div>
                </div>
                <!-- <div class="new_float_popover_wrap">
                    <div class="float_popover custom_float_popover">
                        <div class="text">
                            <strong>주머니(money)적금,</strong> 통장의 잔돈을 매일<br/>
                            Swing(스윙)을 통해 적금으로 가입하고<br/>
                            최고 4.2% 우대금리까지 드립니다.
                        </div>
                        <a href="javascript:void(0);" class="btn_close gray"><span class="blind">닫기</span></a>
                    </div>
                </div> -->

                <!-- S :: 추천배너 2021.11.12 -->
                <cmm-financial-banner asdbDsc="02"/>
                <!-- E :: 추천배너 2021.11.12 -->
            </div>
            <div class="com_inner" v-if="getIsDataYn">
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="bankIvList.length > 0">
                    <div class="new_tit_area">
                        <div class="tit"><span>펀드</span>
                            <span class="com_icon_num custom">{{bankIvAccn}}</span>
                        </div>
                        <span class="total_price">
                            <em class="num">{{bankIvAcBaltt | numberFilter}}</em><em class="unit">원</em>
                        </span>
                    </div>
                    <ul class="list_type_01">
                        <li v-for="(item, idx) in bankIvList" :key="idx">
                            <a href="javascript:void(0);" role="button" @click.prevent="openDetailPop(item)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em>{{item.acWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price" :role="item.strmPftrt === 0 ? '' : 'text'">
                                            <em class="num">{{item.acNowBac | numberFilter}}</em>
                                            <em class="unit">원</em>
                                            <span class="zero" v-if="item.strmPftrt === 0">
                                                <em>{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}</em>%
                                            </span>
                                            <span class="raise" v-else-if="item.strmPftrt > 0">
                                                <span class="blind">상승</span>
                                                <em>{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}</em>%
                                            </span>
                                            <span class="decrease" v-else>
                                                <span class="blind">하락</span>
                                                <em>{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}</em>%
                                            </span>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="inner_banner">
                    <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openExpensePop()">
                        <!-- <div class="com_box_type03 bg16">
                            <div class="text">안정적인 투자 전략<br><span>적절한 투자 목표 세우기!</span></div>
                        </div> -->
                        <!-- 2022-09-28 : 이미지로 교체 -->
                        <img src="@/assets/images/banner/img_benner_08.png" alt="안정적인 투자 전략 적절한 투자 목표 세우기!">
                    </a>
                </div>
            
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="efinIvList.length > 0">
                    <div class="new_tit_area">
                        <div class="tit"><span>증권</span>
                            <span class="com_icon_num custom">{{efinIvAccn}}</span>
                        </div>
                        <span class="total_price">
                            <em class="num">{{efinIvAcBaltt | numberFilter}}</em><em class="unit">원</em>
                        </span>
                    </div>
                    <ul class="list_type_01">
                        <li v-for="(item, idx) in efinIvList" :key="idx">
                            <a href="javascript:void(0);" role="button" @click.prevent="openDetailPop(item)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em>{{item.fncIvAcOnm}}
                                            </em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.acNowBac | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="new_add_register">
                <a href="javascript:void(0);" role="button" v-on:click.prevent="openAssetPage()"><span>더 연결할 자산이 있으신가요?</span></a>
            </div>
        </div>
        <div id="content" class="sub_main com_bg_type02" v-else>
            <div class="no_data_box">
                <div class="no_data_list">
                    <p>조회된 정보가 없습니다.</p>
                </div>
            </div>
            <div class="com_inner com_banner_area">
                <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openExpensePop()">
                    <!-- <div class="com_box_type03 bg16">
                        <div class="text">안정적인 투자 전략<br><span>적절한 투자 목표 세우기!</span></div>
                    </div> -->
                    <!-- 2022-09-28 : 이미지로 교체 -->
                    <img src="@/assets/images/banner/img_benner_08.png" alt="안정적인 투자 전략 적절한 투자 목표 세우기!">
                </a>
            </div>

            <div class="new_add_register">
                <a href="javascript:void(0);" role="button" v-on:click.prevent="openAssetPage()"><span>더 연결할 자산이 있으신가요?</span></a>
            </div>
        </div>
        <footersV2 type="as" />
    </page>
</template>

<script>
    import Page from '@/views/layout/Page.vue'
    import FootersV2 from "@/views/layout/FootersV2.vue"
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'
    import commonService from '@/service/commonService'

    import commonMixin from '@/common/mixins/commonMixin'
    import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
    import AsSubCategoryV2 from '@/components/category/AsSubCategoryV2.vue'
    import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12

    import ASIV1002 from '@/views/page/AS/IV/ASIV1002/ASIV1002'
    import ASIV1103 from '@/views/page/AS/IV/ASIV1103/ASIV1103'
    import PDMY2005 from '@/views/page/PD/MY/PDMY2005/PDMY2005'
    import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'

    export default {
        name : "ASIV1101",
        data: () => {
            return {
                respInfo      : {}, //응답결과
                bankIvList    : [], //은행투자계좌목록
                efinIvList    : [], //전자금융투자계좌목록
                ivAcTotBac    : 0, //투자계좌총액
                ivtotAccn     : 0, //투자총계좌수
                bankIvAcBaltt : 0, //은행투자계좌잔액합계
                bankIvAccn    : 0, //은행투자계좌수
                efinIvAcBaltt : 0, // 전자금융계좌잔액합계
                efinIvAccn    : 0, //전자금융토자계좌수
            }
        },
        computed : {
            getIsDataYn() {
                return this.ivtotAccn > 0 ? true : false
            }
        },
        mounted() {
            this.initComponent()

            // 자산수집 mutation 이벤트 감지
            this.getGatheringListenSubscribe()

            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        mixins: [
            commonMixin
        ],
        methods: {
            initComponent() {
                this.getData()
            },
            
            getData() {
                const config = {
                    url : "/as/iv/01r01",
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config).then(response =>{
                    this.respInfo = response

                    this.ivAcTotBac    = this.respInfo.ivAcTotBac || 0    //투자계좌총액
                    this.ivtotAccn     = this.respInfo.ivtotAccn || 0     //투자총계좌수
                    this.bankIvAcBaltt = this.respInfo.bankIvAcBaltt || 0   //은행투자계좌잔액합계
                    this.bankIvAccn    = this.respInfo.bankIvAccn || 0      //은행투자계좌수
                    this.efinIvAcBaltt = this.respInfo.efinIvAcBaltt || 0   //전자금융계좌잔액합계
                    this.efinIvAccn    = this.respInfo.efinIvAccn || 0      //전자금융투자계좌수

                    this.bankIvList    = this.respInfo.bankIvList || []       //은행투자계좌목록
                    this.efinIvList    = this.respInfo.efinIvList || []       //전자금융투자계좌목록

                    this.$nextTick(() => {
                        this.callJQueryFncExcute()
                    })
                })
            },
            openDetailPop(ivObj) {
                var popParams = {
                    "mydtCusno"    : ivObj.mydtCusno,
                    "infOfrmnOrgC" : ivObj.infOfrmnOrgC,
                    "mydtAcno"     : ivObj.mydtAcno,
                    "mydtScNo"     : ivObj.mydtScNo,
                    "bsnDsc"       : ivObj.bsnDsc   //B : 은행, BF:금융펀드, F:금융투자
                }
                let config = {}

                if(ivObj.bsnDsc === "F") {
                    //금융투자일때
                    config = {
                        component: ASIV1103,
                        params : {"objIvInfo" : popParams}
                    }
                } else {
                    //은행, 금융펀드일때
                    config = {
                        component: ASIV1002,
                        params : {"objIvInfo" : popParams}
                    }
                }
                
                modalService.openPopup(config).then(() => {
                    this.getData();
                })
            },
            fn_openExpensePop() {
                const config = {
                    component : PDMY2005
                };

                modalService.openPopup(config).then((response) => {
                    if (response == "reSelect") { 
                        // 배너이미지를 통하여 목표등록을 하였을 경우
                        // 나의목표로 이동
                        const menu = {
                            name: 'PDMY2005',
                            params : {}
                        }
                        commonService.movePage(menu)
                    }
                });
            },
            openAssetPage() {
                const config = {
                    component: COAR2001
                }
                modalService.openPopup(config).then((response) => {
                    console.log("자산 등록 완료", response)
                    this.getData();
                })
            }
        },
        components : {
            Page,
            FootersV2,
            AsCategoryV2,
            AsSubCategoryV2,
            CmmFinancialBanner  //상품추천배너 2021.11.12
        }
    }

</script>