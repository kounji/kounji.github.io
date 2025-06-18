<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 현금차용(빌린돈)
* @ 페이지설명 : 나의자산 > 부채 > 현금차용 메인
* @ 파일명     : src/views/page/AS/BR/ASBR2001/ASBR2001.vue
* @ 작성자     : CS533033
* @ 작성일     : 2023-08-07
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-17              CS515937              최초작성
* 2023-08-07              CS533033              수정
* 2025-03-04              CS541017              ASBR2001 -> ASBR4001 수정
*************************************************************************/
-->
<template>
	<page class="content-view hasLNB mydata2023">
		<!-- S :: 자산 카테고리 -->
        <!--
        <as-category-v2 type="LN"></as-category-v2>
        -->		
        <!-- E :: 자산 카테고리 -->
        <as-sub-category-v4 type="LN" typeDtl="07"></as-sub-category-v4>

        <!--
        <div id="content" class="renewal" v-if="ttCnt > 0">
        -->
        <div id="content" class="renewal" v-if="ttCnt > 0">
            <div class="com_inner" v-if="ttCnt > 0">
                <div class="new_sub_info">
                    <div class="title">
                        <!-- <span class="coin2_img"></span> -->
                        <div class="text">
                            빌린 돈<br>
                            
                            <div class="toggle_money" :class="hideYn === true ? 'on' : ''">
                                <div class="sum">
                                    <span class="hide">잔액숨김</span>
                                    <span class="show">{{ttAmnt | numberFilter}}원</span>
                                </div>
                                <button type="button" class="btns" @click="fn_setHidden('CASH', !hideYn)">
                                    <span class="blind">금액</span>
                                    <span class="hide">보기</span>
                                    <span class="show">숨김</span>
                                </button>
                            </div>

                            <!-- <div class="toggle_money">
                                <input type="checkbox" title="금액숨김" name="" id="sum_view_01" v-model="hideYn" @change="fn_setHidden('CASH', hideYn)">
                                <label for="sum_view_01" class="btns">
                                    <span class="hide" aria-hidden="true">보기</span>
                                    <span class="show" aria-hidden="true">숨김</span>
                                </label>
                                <div class="sum">
                                    <span class="hide">잔액숨김</span>
                                    <span class="show">총 <em>{{ttAmnt | numberFilter}}</em>원</span>
                                </div>
                            </div> -->

                        </div>
                    </div>
                </div>
            </div>

            <hr class="hr02">
            
            <div class="com_inner" v-if="ttCnt > 0">
                <div class="asset_link_box">
                    <ul class="list_type_01">
                        <li v-for="(item, index) in cashBorrowingOut" :key="index">
                            <a href="javascript:void(0);" @click.prevent="openDetailSlidePop(item)">
                                <dl class="borrowed_money">
                                    <dt class="name">{{item.trPatnnm}}</dt>
                                    <dt class="date">빌린 날 <em class="num"> {{item.stDt | dateFilter('YYYY.MM.DD')}}</em></dt>
                                    <dd class="price"><em class="num">{{item.prnAm | numberFilter}}</em>원</dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="movePage()"><span>추가할 빌린돈이 있으신가요?</span></a></div>
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
import apiService from '@/service/apiService'
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
//import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
import AsSubCategoryV4 from '@/components/category/AsSubCategoryV4.vue'
import ASLN2115 from '@/views/page/AS/LN/ASLN2115/ASLN2115'
import COOA2003 from '@/views/page/CO/OA/COOA2003/COOA2003'

import modalService from '@/service/modalService'
import {dateFormat} from '@/utils/date'

export default {
    name : "ASBR2001",
    data: () => {
        return {
            mydtCusno           : "",       // 마이데이터고객번호
            ttCnt               : 0,        // 현금차용건수
            ttAmnt              : 0,        // 총현금차용금액
            cashBorrowingOut    : [],       // 현금차용Out 리스트
            hideYn		: false,  // 숨김 여부
        }
    },
    computed : {
        noData() {
            return this.ttCnt==0?'com_bg_type02':''
        }
    },
    mounted() {
        this.initComponent()
        dateFormat()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin
    ],
    methods: {
        initComponent() {
            this.hideYn = this.getSecretAmInfo().includes('CASH')
            this.mydtCusno = this.getUserInfo('mydtCusno')
            this.getData();
        },
        getData() {
            const config = {
                url : '/as/ln/07r01',
                data : {
                    mydtCusno : this.mydtCusno
                }
            };
            apiService.call(config).then(response => {
                this.mydtCusno          = response.mydtCusno || ''
                this.ttCnt              = response.ttCnt || 0
                this.ttAmnt             = response.ttAmnt || 0
                this.cashBorrowingOut   = response.cashBorrowingOut || []
            });

        },

        openDetailPop(obj) {
            const config = {
                component   : ASLN2115,
                params      : {
                    mydyCusno : this.mydtCusno,
                    cashData  : obj,
                },
            }
            modalService.openPopup(config).then(response => {
                this.mydtCusno = response.mydtCusno
                if(response.uptCom == true)
                    this.getData();
            })
        },

        // 빌린돈 상세 슬라이드 팝업
        openDetailSlidePop(obj) {
            const config = {
                params : {
                    mydyCusno : this.mydtCusno,
                    cashData  : obj,
                },
                renderer : {
                    component : ASLN2115,
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.mydtCusno = response.mydtCusno
                if(response.uptCom == true)
                    this.getData();
            })
        },

        movePage() {
            /*
            // 임시 메시지 처리
            modalService.alert("화면 준비중").then(() => {
                this.$nextTick(() => {
                    return;
                })
            })
            */
            const config = {
                component: COOA2003,
                params   : {
                    popId : 'COOA2003'
                }
            }
            modalService.openPopup(config).then(response => {
                if(response == 'COOA2003') { // 22.07.29 COCO2201에서 추가 등록 버튼을 누르면 빌린돈 목록을 갱신하고 빌린돈 등록 팝업을 다시 오픈
                    this.initComponent()
                    this.movePage()
                } else if(response == 'refresh') this.initComponent()
            })
        },
        /*
            숨김여부
        */
        fn_setHidden(flag, type) {
            this.hideYn = type
            this.setSecretAmInfo(flag, type)
        },
    },
    components : {
        Page,
        FootersV2,
        //AsCategoryV2,
        AsSubCategoryV4
    }
}
</script>