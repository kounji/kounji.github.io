<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 대출
* @ 페이지설명 : 나의자산 > 부채 > 대출 메인
* @ 파일명     : src/views/page/AS/LN/ASLN2001/ASLN2001.vue
* @ 작성자     : 채찬영
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              채찬영                 최초작성
* 2021-05-13              CS515937              수정
* 2023-07-11              CS533437              화면 ID 변경 ASLN1101 -> ASLN2001
*************************************************************************/
-->
<template>
		<!--
		<page class="content-view hasLNB mydata2023">
		-->
		<page class="content-view">
        <!-- S :: 자산 카테고리 -->
        <!--
        <as-category-v2 type="LN"></as-category-v2>
        -->		
        <!-- E :: 자산 카테고리 -->
        <!-- S :: 자산 서브 카테고리 -->
        <as-sub-category-v2 type="LN" typeDtl="01"></as-sub-category-v2>        
        <!-- E :: 자산 서브 카테고리 -->
        <!--
        <div id="content" class="renewal insur" v-if="loanCnt > 0">
        -->
        <div id="content" v-if="loanCnt > 0">
            <div class="com_inner">
                <div class="new_sub_info">
                    <div class="title">
                        <div class="text">
                            갚을 돈<br>
                            <span class="fs-27">총 </span><strong><span class="num counter" data-count="loanAmnt">{{loanAmnt | numberFilter}}</span>원</strong>
                        </div>
                    </div>
                </div>
                <!-- <div class="link_banner">
                    <a href="javascript:void(0)" role="button">
                        <img src="../../../../src/assets_v40/images/banner/link_banner_03.png" alt="신한세배드림적금을 복리식정기예탁금에 예치하시고 높은이자 받기">
                    </a>
                </div> -->
                <!-- S :: 추천배너 2021.11.12 -->
                <cmm-financial-banner asdbDsc="08"/>
                <!-- E :: 추천배너 2021.11.12 -->
            </div>
            <hr class="hr02">
            <div class="com_inner">
                <!-- 신용대출 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="creditCnt > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>신용대출</span> <span class="com_icon_num custom">{{creditCnt}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{creditAmnt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                    <template v-for="(creditOutObj, index) in creditOut">
                        <li v-if="creditOutObj.loanType == 'CREDIT_CARD'" :key="index">
                            <a href="javascript:void(0);" @click="openLongDetailPop(creditOutObj)"> 
                                <dl>
                                    <dt>
                                        <div>
                                            <!-- 기관 아이콘 class 바인딩 -->
                                            <i :class="creditOutObj.infOfrmnOrgC"><span class="blind">{{creditOutObj.infOfrmnOrgCNm}}</span></i>
                                            <em class="prod_name">{{creditOutObj.wrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{creditOutObj.bac | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                        <li v-if="creditOutObj.loanType == 'CREDIT_BANK' || creditOutObj.loanType == 'CREDIT_INSU'" :key="index">
                            <a href="javascript:void(0);" @click="openCreditDetailPop(creditOutObj)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="creditOutObj.infOfrmnOrgC"><span class="blind">{{creditOutObj.infOfrmnOrgCNm}}</span></i>
                                            <em class="prod_name">{{creditOutObj.wrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{creditOutObj.bac | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>

                        <li v-if="creditOutObj.loanType == 'CREDIT_MINUS'" :key="index">
                            <a href="javascript:void(0);" @click="openCreditMinusPop(creditOutObj)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="creditOutObj.infOfrmnOrgC"><span class="blind">{{creditOutObj.infOfrmnOrgCNm}}</span></i>
                                            <em class="prod_name">{{creditOutObj.wrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{creditOutObj.bac | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                        <!-- 금융투자-->
                        <li v-if="creditOutObj.loanType == 'CREDIT_IV'" :key="index">
                            <a href="javascript:void(0);" @click="openIvDetailPop(creditOutObj)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="creditOutObj.infOfrmnOrgC"><span class="blind">{{creditOutObj.infOfrmnOrgCNm}}</span></i>
                                            <em class="prod_name">{{creditOutObj.wrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{creditOutObj.bac | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>

                    </template>
                </ul>
                </div>
                <!-- //신용대출 -->

                <!-- 담보대출 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="mortagageOut.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>담보대출</span> <span class="com_icon_num custom">{{mortagageOut.length}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{mortagageOutAmnt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                    <template v-for="(mortagageOutObj, index) in mortagageOut">
                        <li v-if="mortagageOutObj.loanType == 'MORT_INSU'" :key="index">                            
                            <a href="javascript:void(0);" @click="openMortInsuDetailPop(mortagageOutObj)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="mortagageOutObj.infOfrmnOrgC"><span class="blind">{{mortagageOutObj.infOfrmnOrgCNm}}</span></i>
                                            <em class="prod_name">{{mortagageOutObj.wrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{mortagageOutObj.bac | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>  
                        <!-- 금융투자-->
                        <li v-else-if="mortagageOutObj.loanType == 'MORT_IV'" :key="index">                            
                            <a href="javascript:void(0);" @click="openIvDetailPop(mortagageOutObj)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="mortagageOutObj.infOfrmnOrgC"><span class="blind">{{mortagageOutObj.infOfrmnOrgCNm}}</span></i>
                                            <em class="prod_name">{{mortagageOutObj.wrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{mortagageOutObj.bac | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>                                              
                        <!--<li v-if="mortagageOutObj.loanType != 'MORT_INSU'" :key="index">-->      
                        <li v-else :key="index">                                
                            <a href="javascript:void(0);" @click="openMortagageDetailPop(mortagageOutObj)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="mortagageOutObj.infOfrmnOrgC"><span class="blind">{{mortagageOutObj.infOfrmnOrgCNm}}</span></i>
                                            <em class="prod_name">{{mortagageOutObj.wrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{mortagageOutObj.bac | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>

                    </template>
                </ul>
                </div>
                <!-- //담보대출 -->

                <!-- P2P 대출 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="loanP2POut.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>P2P 대출</span> <span class="com_icon_num custom">{{loanP2POut.length}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{loanP2POutAmnt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                    <li v-for="(loanP2POutObj, index) in loanP2POut" :key="index">
                        <a href="javascript:void(0);" @click="openP2PDetailPop(loanP2POutObj)">
                            <dl>
                                <dt>
                                    <div>
                                        <i :class="loanP2POutObj.infOfrmnOrgC"><span class="blind">{{loanP2POutObj.infOfrmnOrgCNm}}</span></i>
                                        <!-- 상품유형코드명 -->
                                        <em class="prod_name">{{loanP2POutObj.p2PWrsTpcNm}}</em>
                                    </div>
                                </dt>
                                <dd>
                                    <span class="com_price">
                                        <!-- 대출계약금액 -->
                                        <em class="num">{{loanP2POutObj.p2PLnBac | numberFilter}}</em>
                                        <em class="unit">원</em>
                                    </span>
                                </dd>
                            </dl>
                        </a>
                    </li>
                </ul>
                </div>
                <!-- //P2P 금융 -->

                <!-- 대부 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="bondOut.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>대부</span> <span class="com_icon_num custom">{{bondOut.length}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{bondOutAmnt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                    <li v-for="(bondOutObj, index) in bondOut" :key="index">
                        <a href="javascript:void(0);" @click="openBondDetailPop(bondOutObj)">
                            <dl>
                                <dt>
                                    <div>
                                        <i :class="bondOutObj.infOfrmnOrgC"><span class="blind">{{bondOutObj.infOfrmnOrgCNm}}</span></i>
                                        <!-- 채권/대부기관명 -->
                                        <em class="prod_name">{{bondOutObj.infOfrmnOrgCNm}}</em>
                                    </div>
                                </dt>
                                <dd>
                                    <span class="com_price">
                                        <!-- 채권대출잔액 -->
                                        <em class="num">{{bondOutObj.bndLnBac | numberFilter}}</em>
                                        <em class="unit">원</em>
                                    </span>
                                </dd>
                            </dl>
                        </a>
                    </li>
                </ul>
                </div>
                <!-- //대부 -->                
            </div>
            <div class="new_add_register"><a href="javascript:void(0)" role="button" v-on:click.prevent="movePage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
        <div id="content" class="renewal insur" v-else>
            <div class="com_inner">
                <div class="no_data_box no_data_box01 grayExclamationType">
                    <div class="no_data_list">
                        <p class="txt_sub">조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </div>
            
            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="movePage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
        <footersV2 type="as" />
    </page>
</template>

<script>

/*eslint-disable */
import apiService from '@/service/apiService'
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
import AsSubCategoryV2 from '@/components/category/AsSubCategoryV2.vue'
import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12
import ASLN2005 from '@/views/page/AS/LN/ASLN2005/ASLN2005'
import ASLN2006 from '@/views/page/AS/LN/ASLN2006/ASLN2006'
import ASLN2007 from '@/views/page/AS/LN/ASLN2007/ASLN2007'
import ASLN2008 from '@/views/page/AS/LN/ASLN2008/ASLN2008'
import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'
import ASLN2002 from '@/views/page/AS/LN/ASLN2002/ASLN2002'
import ASLN2003 from '@/views/page/AS/LN/ASLN2003/ASLN2003'
import ASLN2004 from '@/views/page/AS/LN/ASLN2004/ASLN2004'
import ASIV2003 from '@/views/page/AS/IV/ASIV2003/ASIV2003'


import {dateFormat} from '@/utils/date'

export default {
    name : "ASLN2001",
    data: () => {
        return {
            mydtCusno           : "",           // 마이데이터고객번호
            loanCnt             : 0,            // 대출총계(갯수)
            loanAmnt            : 0,            // 대출합계금액
            creditCnt           : 0,            // 신용대출총계
            creditAmnt          : 0,            // 신용대출합계금액
            mortagageOutCnt     : 0,            // 담보대출총계
            mortagageOutAmnt    : 0,            // 담보대출합계금액
            loanP2POutCnt       : 0,            // P2P대출총계
            loanP2POutAmnt      : 0,            // P2P대출합계금액
            bondOutCnt          : 0,            // 채권대출총계
            bondOutAmnt         : 0,            // 채권대출합계금액
            creditOut           : [],           // 신용대출정보
            mortagageOut        : [],           // 담보대출정보
            loanP2POut          : [],           // P2P대출정보
            bondOut             : [],           // 채권대출정보
            // 모든 대출목록의 정렬기준은 대출실행일자, 회차 내림차순
        }
    },
    computed : {
        noData() {
            return this.loanCnt==0?'com_bg_type02':''
        }
    },
    created() {
        this.initComponent()
    },
    mounted() {
        dateFormat()

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
            this.mydtCusno  = this.getUserInfo('mydtCusno')
            this.getData()
        },
        // 초기 데이터 세팅
        getData() {
            // 실제 구현
            const config = {
                url: '/as/ln/01r02',
//                  url: '/as/ln/01r01',
                data: {
                        mydtCusno: this.mydtCusno
                }
            };
            apiService.call(config).then(response => {
                console.log("========/as/ln/01r02=======",response)
                this.loanCnt            = response.loanCnt || 0
                this.loanAmnt           = response.loanAmnt || 0
                this.creditCnt          = response.creditCnt || 0
                this.creditAmnt         = response.creditAmnt || 0
                this.mortagageOutCnt    = response.mortagageOutCnt || 0
                this.mortagageOutAmnt   = response.mortagageOutAmnt || 0
                this.loanP2POutCnt      = response.loanP2POutCnt || 0
                this.loanP2POutAmnt     = response.loanP2POutAmnt || 0
                this.bondOutCnt         = response.bondOutCnt || 0
                this.bondOutAmnt        = response.bondOutAmnt || 0
                this.creditOut          = response.creditOut || []
                this.mortagageOut       = response.mortagageOut || []
                this.loanP2POut         = response.loanP2POut || []
                this.bondOut            = response.bondOut || []

                this.callJQueryFncExcute()
            });
        },
            
        // 신용대출 상세조회 팝업 오픈
        openCreditDetailPop(obj) {
            const config = {
                component: ASLN2005,
                params : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtAcno        : obj.mydtAcno,
                    mydtScNo        : obj.mydtScNo,
                    isrSctsNo       : obj.isrSctsNo,
                    loanType        : obj.loanType,
                }
            }
            modalService.openPopup(config)
        },

        // 담보대출 상세조회 팝업 오픈
        openMortagageDetailPop(obj) {
            const config = {
                component: ASLN2002,
                params : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtAcno        : obj.mydtAcno,
                    mydtScNo        : obj.mydtScNo,
                    isrSctsNo       : obj.isrSctsNo,
                    loanType        : obj.loanType,
                }
            }
            modalService.openPopup(config)
        },

        // 담보대출(보험) 상세조회 팝업 오픈
        openMortInsuDetailPop(obj) {
            const config = {
                component: ASLN2003,
                params : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtAcno        : obj.mydtAcno,
                    mydtScNo        : obj.mydtScNo,
                    isrSctsNo       : obj.isrSctsNo,
                    loanType        : obj.loanType,
                }
            }
            modalService.openPopup(config)
        },

        // 카드 장기대출 상세조회 팝업 오픈
        openLongDetailPop(obj) {
            const config = {
                component : ASLN2006,
                params : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    lnDt            : obj.lnDt,
                    dtLnSc          : obj.dtLnSc,
                    loanType        : obj.loanType,
                }
            }
            modalService.openPopup(config)
        },

        // P2P대출 상세조회 팝업 오픈
        openP2PDetailPop(obj) {
            const config = {
                component : ASLN2007,
                params : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    lnCtrNo         : obj.lnCtrNo,
                }
            }
            modalService.openPopup(config)
        },

        // 채권대출 상세조회 팝업 오픈
        openBondDetailPop(obj) {
            const config = {
                component : ASLN2008,
                params : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtBndNo       : obj.mydtBndNo,
                }
            }
            modalService.openPopup(config)
        },

        // 금융투자 상세조회 팝업 오픈
        openIvDetailPop(obj) {
            var popParams = {
                mydtCusno       : this.mydtCusno,
                infOfrmnOrgC    : obj.infOfrmnOrgC,
                mydtAcno        : obj.mydtAcno,
                mydtScNo        : obj.mydtScNo,
                "bsnDsc"        : 'F',   //B : 은행, BF:금융펀드, F:금융투자, T:신탁(코드정의 추후 확인할것)
            }            
            const config = {
                component : ASIV2003,
                params : {"objIvInfo" : popParams}
            }
            modalService.openPopup(config)
        },

         // 마이너스 통장 상세조회 팝업 오픈
        openCreditMinusPop(obj) {
            const config = {
                component : ASLN2004,
                params : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtAcno        : obj.mydtAcno,
                    mydtScNo        : obj.mydtScNo,
                    isrSctsNo       : obj.isrSctsNo,
                    loanType        : obj.loanType,
                }
            }
            modalService.openPopup(config)
        },

        movePage() {
            const config = {
                component: COAR2001,
            }
            modalService.openPopup(config)
        },
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