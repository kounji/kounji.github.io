<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 대출
* @ 페이지설명 : 나의자산 > 부채 > 대출 메인
* @ 파일명     : src/views/page/AS/LN/ASLN1101/ASLN1101.vue
* @ 작성자     : 채찬영
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              채찬영                 최초작성
* 2021-05-13              CS515937              수정
*************************************************************************/
-->
<template>
    <page class="content-view hasLNB">
        <as-category-v2 type="LN"></as-category-v2>
        <as-sub-category-v2 type="LN" typeDtl="01"></as-sub-category-v2>
        <!-- <div id="content" class="com_bg_type_00 sub_main"> -->
        <div id="content" class="sub_main" :class="noData">
            <div class="new_sub_main_box com_line_type01" v-if="loanCnt > 0">
                <div class="new_sub_info">
                    <div class="title">
                        <!-- <span class="won_img"></span> -->
                        <div class="text">
                            {{loanCnt}}개의 대출에<br/>
                            총 <span id="loanAmnt" class="num counter" data-count="loanAmnt">{{loanAmnt | numberFilter}}</span>원의<br/>
                            대출잔액 있어요. 
                        </div>
                    </div>
                </div>

                <!-- S :: 추천배너 2021.11.12 -->
                <cmm-financial-banner asdbDsc="08"/>
                <!-- E :: 추천배너 2021.11.12 -->

            </div>
            <div class="com_inner com_boxarea_type01" v-if="loanCnt > 0">
                <div class="com_box_type01 toggle_list_box2" v-if="creditCnt > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>신용대출</span><span class="com_icon_num">{{creditCnt}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{creditAmnt | numberFilter}}</em>
                                    <em class="unit">원</em>
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
                                                <em>{{creditOutObj.wrsnm}}</em>
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
                                                <em>{{creditOutObj.wrsnm}}</em>
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
                <div class="com_box_type01 toggle_list_box2" v-if="mortagageOutCnt > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>담보대출</span> <span class="com_icon_num">{{mortagageOut.length}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{mortagageOutAmnt | numberFilter}}</em>
                                    <em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(mortagageOutObj, index) in mortagageOut" :key="index">
                            <a href="javascript:void(0);" @click="openMortagageDetailPop(mortagageOutObj)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="mortagageOutObj.infOfrmnOrgC"><span class="blind">{{mortagageOutObj.infOfrmnOrgCNm}}</span></i>
                                            <em>{{mortagageOutObj.wrsnm}}</em>
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
                    </ul>
                </div>
                <!-- P2P 대출 -->
                <div class="com_box_type01 toggle_list_box2" v-if="loanP2POutCnt > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>P2P금융</span> <span class="com_icon_num">{{loanP2POut.length}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{loanP2POutAmnt | numberFilter}}</em>
                                    <em class="unit">원</em>
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
                                            <em>{{loanP2POutObj.p2PWrsTpcNm}}</em>
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
                <!-- 채권/대부 -->
                <div class="com_box_type01 toggle_list_box2" v-if="bondOutCnt > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>채권/대부</span> <span class="com_icon_num">{{bondOut.length}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{bondOutAmnt | numberFilter}}</em>
                                    <em class="unit">원</em>
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
                                            <em>{{bondOutObj.infOfrmnOrgCNm}}</em>
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
            </div>
            <div class="no_data_box" v-else>
                <div class="no_data_list" >
                    <p>조회된 정보가 없습니다.</p>
                </div>
            </div>
            <div class="new_add_register"><a href="javascript:void(0);" v-on:click.prevent="movePage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
        <footersV2 type="as" />
    </page>
</template>

<script>
import apiService from '@/service/apiService'
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
import AsSubCategoryV2 from '@/components/category/AsSubCategoryV2.vue'
import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12
import ASLN1108 from '@/views/page/AS/LN/ASLN1108/ASLN1108'
import ASLN1109 from '@/views/page/AS/LN/ASLN1109/ASLN1109'
import ASLN1110 from '@/views/page/AS/LN/ASLN1110/ASLN1110'
import ASLN1118 from '@/views/page/AS/LN/ASLN1118/ASLN1118'
import ASLN1119 from '@/views/page/AS/LN/ASLN1119/ASLN1119'
import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'

import {dateFormat} from '@/utils/date'

export default {
    name : "ASLN1101",
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
                url: '/as/ln/01r01',
                data: {
                        mydtCusno: this.mydtCusno
                }
            };
            apiService.call(config).then(response => {
                console.log(response)
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
                component: ASLN1108,
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
                component: ASLN1110,
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
                component : ASLN1109,
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
                component : ASLN1118,
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
                component : ASLN1119,
                params : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtBndNo       : obj.mydtBndNo,
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