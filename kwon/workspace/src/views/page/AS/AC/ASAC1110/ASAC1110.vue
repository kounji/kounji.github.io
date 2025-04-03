<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 포인트
* @ 페이지설명 : 나의자산 > 자산 > 포인트 메인
* @ 파일명     : src/views/page/AS/AC/ASAC1110/ASAC1110.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-08-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-03              CS515729                 최초작성
* 2021-10-14              CS515729                 선불카드 추가
* 2022-04-28              CS515901                 포인트카드 추가
*************************************************************************/
-->
<template>
    <page class="content-view hasLNB">
        <!-- S :: 자산 카테고리 -->
        <as-category-v2 type="AC"></as-category-v2>
        <!-- E :: 자산 카테고리 -->

        <!-- S :: 자산 SUB카테고리 -->
        <as-sub-category-v2 type="PAY"></as-sub-category-v2>
        <!-- E :: 자산 SUB카테고리 -->

        <div id="content" class="sub_main" :class="getDataCss">
            <div class="new_sub_main_box com_line_type01" v-if="getIsDataYn">
                <div class="new_sub_info">
                    <div class="title">
                        <div class="text">
                            {{totPayAccn}}개의 포인트계정에<br/>
                            총 <span class="num counter">{{totPayAcAm | numberFilter}}</span>원이 있어요.
                        </div>
                    </div>
                </div>
                
                <!-- S :: 추천배너 2021.11.12 -->
                <cmm-financial-banner asdbDsc="03"/>
                <!-- E :: 추천배너 2021.11.12 -->

            </div>
            <div class="com_inner com_boxarea_type01" v-if="getIsDataYn">
                <!-- 선불계좌 -->
                <div class="com_box_type01 toggle_list_box2" v-if="payMnyAcList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit">
                                    <span>페이머니</span>
                                    <span class="com_icon_num">{{payMnyAccn}}</span>
                                </div>
                                <span class="total_price">
                                    <em class="num">{{payMnyAcBaltt | numberFilter}}</em>
                                    <em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in payMnyAcList" :key="idx">
                            <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openDetailPop('PAY',item)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em>{{item.faceOnm}}</em>
                                            <em class="account" v-if="item.accIdVal && item.accIdVal !=='NA'">{{item.accIdVal}}</em>
                                        </div>
                                        
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.eltfncTotBac | numberFilter}}</em>
                                            <em class="unit">{{item.curc === "KRW" ? '원' : item.curnm}}</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- 선불카드 -->
                <div class="com_box_type01 toggle_list_box2" v-if="ppaycdList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit">
                                    <span>선불카드</span>
                                    <span class="com_icon_num">{{ppaycdcn}}</span>
                                </div>
                                <span class="total_price">
                                    <em class="num">{{ppaycdBaltt | numberFilter}}</em>
                                    <em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in ppaycdList" :key="idx">
                            <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openDetailPop('CARD',item)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                            <em>{{item.ppayCdnm}}</em>
                                            <!-- <span>{{item.mydtCdIdVal}}</span> -->
                                        </div>
                                        
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.ppaycdTotBac | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- 금융포인트 -->
                <div class="com_box_type01 toggle_list_box2" v-if="cardPntList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit">
                                    <span>금융포인트</span>
                                    <span class="com_icon_num">{{cardPntcn}}</span>
                                </div>
                                <span class="total_price">
                                    <em class="num">{{cardPntBaltt | numberFilter}}</em>
                                    <em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01 no_link"><!-- 클릭 없음.-->
                        <li v-for="(item, idx) in cardPntList" :key="idx">
                            <a href="javascript:void(0);" role="button">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                            <em>{{item.pntnm}}</em>
                                        </div>
                                        
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.rmPnt | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="no_data_box" v-else>
                <div class="no_data_list" >
                    <p>조회된 정보가 없습니다.</p>
                </div>
            </div>

            <div class="new_add_register">
                <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openAssetPage()"><span>더 연결할 자산이 있으신가요?</span></a>
            </div>
        </div>

        <footersV2 type="as" />
        
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
    import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12

    import ASAC1106 from '@/views/page/AS/AC/ASAC1106/ASAC1106'
    import ASAC1111 from '@/views/page/AS/AC/ASAC1111/ASAC1111'
    import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'

    export default {
        name : "ASAC1110",
        data: () => {
            return {
                respInfo      : {},

                totPayAccn    : 0,  //총선불계좌수
                totPayAcAm    : 0,  //총선불계좌합계

                payMnyAccn    : 0,  //선불계좌수
                payMnyAcBaltt : 0,  //선불계좌잔액
                payMnyAcList  : [], //선불계좌목록

                ppaycdcn      : 0,  //선불카드수
                ppaycdBaltt   : 0,  //선불카드잔액합계
                ppaycdList    : [],  //선불카드목록

                cardPntcn     : 0,  // 금융포인트 수
                cardPntBaltt  : 0,  // 금융포인트 합계
                cardPntList   : [], // 금융포인트 목록

            }
        },
        mixins: [
            commonMixin
        ],
        computed : {
            getDataCss(){
                return this.totPayAccn > 0 ? "com_bg_type00" : "com_bg_type02"
            },
            getIsDataYn() {
                return this.totPayAccn > 0 ? true : false
            }
        },
        created() {

        },
        mounted() {
            this.initComponent()

            // 자산수집 mutation 이벤트 감지 
            this.getGatheringListenSubscribe()
                        
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {
            initComponent() {
                this.getData();
            },
            
            getData() {
                ///////////////////////////////////
                // 페이머니목록 조회 
                const config = {
                    url: '/as/ac/10r01',
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config).then(response =>{
                    this.respInfo = response

                    this.totPayAccn    = this.respInfo.totPayAccn   //총선불계좌수(계좌+카드+금융포인트)
                    this.totPayAcAm    = this.respInfo.totPayAcAm   //총선불계좌합계(계좌+카드+금융포인트)

                    this.payMnyAccn    = this.respInfo.payMnyAccn     //계좌수
                    this.payMnyAcBaltt = this.respInfo.payMnyAcBaltt  //계좌잔액합계
                    this.payMnyAcList  = this.respInfo.payMnyAcList || []   //계좌목록

                    this.ppaycdcn      = this.respInfo.ppaycdcn     //카드수
                    this.ppaycdBaltt   = this.respInfo.ppaycdBaltt  //카드잔액합계
                    this.ppaycdList    = this.respInfo.ppaycdList || []   //카드목록

                    this.cardPntcn     = this.respInfo.cardPntcn          // 금융포인트 수
                    this.cardPntBaltt  = this.respInfo.cardPntBaltt       // 금융포인트 합계
                    this.cardPntList   = this.respInfo.cardPntList || [], // 금융포인트 목록

                    this.$nextTick(() => {
                        this.callJQueryFncExcute()
                    })
                })
            },
            /*
            * 상세화면이동.
            */
            fn_openDetailPop(target, item) {
                let config = {}

                if(target === "PAY") {
                    //페이머니
                    let popupParam = {
                          "mydtCusno"    : this.getUserInfo('mydtCusno') //마이데이터고객번호
                        , "infOfrmnOrgC" : item.infOfrmnOrgC    //기관코드
                        , "faceNo"       : item.faceNo      //권면번호
                        , "accIdVal"     : item.accIdVal    //계정식별값
                    }

                    config = {
                        component: ASAC1106,
                        params : {"objAccInfo" : popupParam}
                    }
                } else {
                    //선불카드
                    let popupParam = {
                          "mydtCusno"    : this.getUserInfo('mydtCusno') //마이데이터고객번호
                        , "infOfrmnOrgC" : item.infOfrmnOrgC    //기관코드
                        , "mydtCdIdVal"  : item.mydtCdIdVal     //카드식별자
                    }

                    config = {
                        component: ASAC1111,
                        params : {"objAccInfo" : popupParam}
                    }
                }

                modalService.openPopup(config).then(() => {
                    this.getData();
                })
            },
            /*
            * 자산등록 팝업
            */
            fn_openAssetPage() {
                const config = {
                    component: COAR2001,
                }
                modalService.openPopup(config).then(() => {
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