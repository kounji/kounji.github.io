<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 현금차용(빌린돈)
* @ 페이지설명 : 나의자산 > 부채 > 현금차용 메인
* @ 파일명     : src/views/page/AS/LN/ASLN1105/ASLN2107.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-05-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-17              CS515937              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view hasLNB">
        <as-category-v2 type="LN"></as-category-v2>
        <as-sub-category-v2 type="LN" typeDtl="07"></as-sub-category-v2>
        <div id="content" class="sub_main" :class="noData">
            <div class="new_sub_main_box com_line_type01" v-if="ttCnt > 0">
                <div class="new_sub_info">
                    <div class="title">
                        <!-- <span class="coin2_img"></span> -->
                        <div class="text">
                            {{ttCnt}}개의 빌린돈에<br/>
                            총 <span id="ttAmnt" class="num counter" data-count="ttAmnt">{{ttAmnt | numberFilter}}</span>원이 있습니다. 
                        </div>
                    </div>
                </div>
            </div>
            <div class="com_inner com_boxarea_type01" v-if="ttCnt > 0">
                <div class="card_list_box card_list_box_etc">
                    <ul class="list_type_02">
                        <li v-for="(item, index) in cashBorrowingOut" :key="index">
                            <a href="javascript:void(0);" @click.prevent="openDetailSlidePop(item)">
                                <dl>
                                    <dt>
                                        <div><em>{{item.trPatnnm}}</em></div>
                                        <span>빌린 날 {{item.stDt | dateFilter('YYYY.MM.DD')}}</span>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.prnAm | numberFilter}}</em>
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
            <div class="new_add_register"><a href="javascript:void(0);" v-on:click.prevent="movePage()"><span>추가할 빌린돈이 있으신가요?</span></a></div>
        </div>
        <footersV2 type="as" />
    </page>
</template>

<script>
import apiService from '@/service/apiService'
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
import AsSubCategoryV2 from '@/components/category/AsSubCategoryV2.vue'
import ASLN2115 from '@/views/page/AS/LN/ASLN2115/ASLN2115'
import COOA2003 from '@/views/page/CO/OA/COOA2003/COOA2003'

import modalService from '@/service/modalService'
import {dateFormat} from '@/utils/date'

export default {
    name : "ASLN2107",
    data: () => {
        return {
            mydtCusno           : "",       // 마이데이터고객번호
            ttCnt               : 0,        // 현금차용건수
            ttAmnt              : 0,        // 총현금차용금액
            cashBorrowingOut    : [],       // 현금차용Out 리스트
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
    },
    components : {
        Page,
        FootersV2,
        AsCategoryV2,
        AsSubCategoryV2
    }
}
</script>