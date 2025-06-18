<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 투자
* @ 페이지설명 : 나의자산 > 자산 > 투자 메인
* @ 파일명     : src/views/page/AS/IV/ASIV2001/ASIV2001.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515729                 최초작성
* 2022-07-05              CS528205                 고도화 파일명, UI 변경 및 고도화 개발(ASIV1101.vue -> ASIV1001.vue)
* 2023-07-10                                       UI 변경 및 고도화 개발(ASIV1001.vue -> ASIV2001.vue)
* 2023-08-08              CS533039                 UI 변경 및 고도화 개발(ASIV1001.vue -> ASIV2001.vue)
*************************************************************************/
-->
<template>

	<page class="content-view hasLNB mydata2023">
        <!-- S :: 자산 카테고리 -->
        <!--
        <as-category-v2 type="AC"></as-category-v2>
        -->
        <!-- E :: 자산 카테고리 -->

        <!-- S :: 자산 SUB카테고리 -->
        <as-sub-category-v2 type="IV"></as-sub-category-v2>
        <!-- E :: 자산 SUB카테고리 -->

        <div id="content" class="renewal" v-if="getIsDataYn">
            <div class="com_inner">
                <div class="new_sub_info">
                    <div class="title">
                        <div class="text">
                            미래 준비를 위한 돈<br>
                            <span class="fs-27">총 </span><strong><span class="num counter" :data-count="ivAcTotBac | numberFilter">{{ivAcTotBac | numberFilter}}</span>원</strong>
                        </div>
                    </div>
                </div>
                <!-- S :: 추천배너 2021.11.12 -->
                <cmm-financial-banner asdbDsc="02"/>
                <!-- E :: 추천배너 2021.11.12 -->                
                <!--<div class="link_banner">
                    <a role="button">
                        <img src="@/assets_v40/images/banner/link_banner_02.png" alt="주머니(money)적금으로 우대금리 받기">
                    </a>
                </div> -->
            </div>
            
            <hr class="hr02">

            <div class="com_inner">
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="bankIvList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>펀드 </span><span class="com_icon_num custom">{{bankIvAccn}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{bankIvAcBaltt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in bankIvList" :key="idx">
                            <a href="javascript:void(0)" role="button" @click.prevent="openDetailPop(item)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">
                                                {{item.acWrsnm}}
                                            </em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price" :role="item.strmPftrt === 0 ? '' : 'text'">
                                            <em class="num">{{item.acNowBac | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                        <span class="change_rate" v-if="item.strmPftrt === 0">
                                            <em>{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}</em>%
                                        </span>
                                        <span class="change_rate up" v-else-if="item.strmPftrt > 0">
                                            <em>{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}</em>%
                                        </span>
                                        <span class="change_rate down" v-else>
                                            <em>{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}</em>%
                                        </span>
                                    </dd> 
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
                        
                <div class="inner_banner">
                    <div>
                        <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openExpensePop()">
                            <img src="@/assets_v40/images/banner/img_benner_08.png" alt="안정적인 투자 전략 - 적절한 투자 목표 세우기!">
                        </a>
                    </div>
                </div>

                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="bankTsIsaList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>신탁/ISA </span><span class="com_icon_num custom">{{bankTsIsaAccn}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{bankTsIsaEvlamtt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in bankTsIsaList" :key="idx">
                            <a href="javascript:void(0);" role="button" @click.prevent="openDetailPop(item)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.acWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="prod_num">{{item.mydtAcno}}</span>
                                    </dd>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.acEvlam | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="efinIvList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>증권 </span><span class="com_icon_num custom">{{efinIvAccn}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{efinIvAcBaltt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in efinIvList" :key="idx">
                            <a href="javascript:void(0);" role="button" @click.prevent="openDetailPop(item)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.fncIvAcOnm}}</em>
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

                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="p2pInvestList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>P2P투자 </span><span class="com_icon_num custom">{{p2pInvestCnt}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{p2pInvestTotAm | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in p2pInvestList" :key="idx">
                            <a href="javascript:void(0);" role="button" @click.prevent="openDetailPop(item)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.p2PWrsTpcNm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.rmAm | numberFilter}}</em><em class="unit">원</em>
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
        <div id="content" class="renewal" v-else>
            <div class="com_inner">
                    <!-- 조회내역이 없을경우 -->
                    <div class="no_data_box no_data_box01 grayExclamationType">
                        <div class="no_data_list">
                            <p class="txt_sub">조회된 정보가 없습니다.</p>
                        </div>
                    </div>
                    <!--// 조회내역이 없을경우 -->
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

    import ASIV2002 from '@/views/page/AS/IV/ASIV2002/ASIV2002'
    import ASIV2003 from '@/views/page/AS/IV/ASIV2003/ASIV2003'
    import ASIV2005 from '@/views/page/AS/IV/ASIV2005/ASIV2005'
    import PDMY4005 from '@/views/page/PD/MY/PDMY4005/PDMY4005'
    import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'
    import ASIV2007 from '@/views/page/AS/IV/ASIV2007/ASIV2007'
 
    export default {
        name : "ASIV2001",
        data: () => {
            return {
                respInfo           : {}, //응답결과
                bankIvList         : [], //은행투자계좌목록
                bankTsIsaList      : [], //은행신탁ISA목록
                efinIvList         : [], //전자금융투자계좌목록
                p2pInvestList      : [], //P2P투자계좌목록
                ivAcTotBac         : 0,  //투자계좌총액
                ivtotAccn          : 0,  //투자총계좌수
                bankIvAcBaltt      : 0,  //은행투자계좌잔액합계
                bankIvAccn         : 0,  //은행투자계좌수
                efinIvAcBaltt      : 0,  //전자금융계좌잔액합계
                efinIvAccn         : 0,  //전자금융토자계좌수
                bankTsIsaEvlamtt   : 0,  //은행신탁ISA평가금액합계
                bankTsIsaAccn      : 0,  //은행신탁ISA계좌수
                p2pInvestTotAm     : 0,  //P2P투자금액합계
                p2pInvestCnt       : 0,  //P2P투자계약건수
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
                    url : "/as/iv/01r02",
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config).then(response =>{

                    // console.log('======= /as/iv/01r02 =======', response)

                    this.respInfo = response

                    this.ivAcTotBac       = this.respInfo.ivAcTotBac || 0        //투자계좌총액
                    this.ivtotAccn        = this.respInfo.ivtotAccn || 0         //투자총계좌수
                    this.bankIvAcBaltt    = this.respInfo.bankIvAcBaltt || 0     //은행투자계좌잔액합계
                    this.bankIvAccn       = this.respInfo.bankIvAccn || 0        //은행투자계좌수
                    this.efinIvAcBaltt    = this.respInfo.efinIvAcBaltt || 0     //전자금융계좌잔액합계
                    this.efinIvAccn       = this.respInfo.efinIvAccn || 0        //전자금융투자계좌수
                    this.bankTsIsaEvlamtt = this.respInfo.bankTsIsaEvlamtt || 0  //은행신탁ISA평가금액합계
                    this.bankTsIsaAccn    = this.respInfo.bankTsIsaAccn || 0     //은행신탁ISA계좌수
                    this.p2pInvestCnt     = this.respInfo.p2pInvestCnt || 0      //P2P투자금액합계
                    this.p2pInvestTotAm   = this.respInfo.p2pInvestTotAm || 0    //P2P투자계약수


                    this.bankIvList    = this.respInfo.bankIvList || []         //은행투자계좌목록
                    this.efinIvList    = this.respInfo.efinIvList || []         //전자금융투자계좌목록
                    this.bankTsIsaList = this.respInfo.bankTsIsaList || []      //은행신탁ISA목록
                    this.p2pInvestList = this.respInfo.p2pInvestList || []      //P2P투자목록

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
                    "bsnDsc"       : ivObj.bsnDsc   //B : 은행, BF:금융펀드, F:금융투자, T:신탁(코드정의 추후 확인할것)
                }
                let config = {}

                if(ivObj.bsnDsc === "F") {
                    //금융투자일때
                    config = {
                        component: ASIV2003,
                        params : {"objIvInfo" : popParams}
                    }
                }else if(ivObj.bsnDsc === "TS") {
                    //신탁ISA일때
                    config = {
                        component: ASIV2005,
                        params : {"objIvInfo" : popParams}
                    }
                } else if(ivObj.bsnDsc === "PI") {
                    //신탁ISA일때
                    config = {
                        component: ASIV2007,
                        params : {"objIvInfo" : popParams}
                    }
                } else {
                    //은행, 금융펀드일때
                    config = {
                        component: ASIV2002,
                        params : {"objIvInfo" : popParams}
                    }
                }
                
                modalService.openPopup(config).then(() => {
                    this.getData();
                })
            },
            fn_openExpensePop() {
                const config = {
                    component : PDMY4005
                };

                modalService.openPopup(config).then((response) => {
                    if (response == "reSelect") { 
                        // 배너이미지를 통하여 목표등록을 하였을 경우
                        // 나의목표로 이동
                        const menu = {
                            name: 'PDMY4005',
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
            AsSubCategoryV2
            ,CmmFinancialBanner  //상품추천배너 2021.11.12
        }
    }

</script>