<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 할부금융
* @ 페이지설명 : 나의자산 > 부채 > 할부금융 > 할부금융 메인
* @ 파일명     : src/views/page/AS/IT/ASIT2001/ASIT2001.vue
* @ 작성자     : CS533033
* @ 작성일     : 2023-08-09
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-09              CS533033              최초작성
*************************************************************************/
-->
<template>
	<page class="content-view hasLNB mydata2023">
		<!-- S :: 자산 카테고리 -->
        <!--
        <as-category-v2 type="LN"></as-category-v2>
        -->		
        <!-- E :: 자산 카테고리 -->
        <!-- S :: 자산 서브 카테고리 -->
        <as-sub-category-v4 type="LN" typeDtl="05"></as-sub-category-v4>
        <!-- E :: 자산 서브 카테고리 -->

        <!--
        <div id="content" class="renewal" v-if="cptAcCn > 0">
        -->
        <div id="content" class="renewal" v-if="cptAcCn > 0">
            <div class="com_inner" v-if="cptAcCn > 0">
                <div class="new_sub_info">
                    <div class="title">
                        <div class="text">
                            갚을 돈<br>
                            <!-- <span class="fs-27">총 </span><strong><span id="lnAcBactt" class="num counter" data-count="lnAcBactt">{{lnAcBactt | numberFilter}}</span>원</strong>  -->
                            <div class="toggle_money">
                                <input type="checkbox" title="금액숨김" name="" id="sum_view_01" v-model="hideYn" @change="fn_setHidden('IST', hideYn)">
                                <label for="sum_view_01" class="btns">
                                    <span class="hide" aria-hidden="true">보기</span>
                                    <span class="show" aria-hidden="true">숨김</span>
                                </label>
                                <div class="sum">
                                    <span class="hide">잔액숨김</span>
                                    <span class="show">총 <em>{{lnAcBactt | numberFilter}}</em>원</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- S :: 추천배너 2021.11.12 -->
                <cmm-financial-banner asdbDsc="11"/>
                <!-- E :: 추천배너 2021.11.12 -->
            </div>

            <hr class="hr02">    
            
            <div class="com_inner" v-if="cptAcCn > 0">
                <div class="asset_link_box">
                    <ul class="list_type_01">
                        <li v-for="(item, index) in cptAcList" :key="index">
                            <a href="javascript:void(0);" @click="openCptDetailPop(item)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                            <em>{{item.istFncWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="prod_num">{{item.istFncRpyAcno}}</span> 
                                    </dd>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.lnAcBac | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="new_add_register"><a href="javascript:void(0);" v-on:click.prevent="movePage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        
        </div>    
        <div id="content" class="renewal insur" v-else>
            <div class="com_inner">
                <div class="no_data_box no_data_box01 grayExclamationType">
                    <div class="no_data_list">
                        <p class="txt_sub">조회된 정보가 없습니다.</p>
                    </div>
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
//import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
import AsSubCategoryV4 from '@/components/category/AsSubCategoryV4.vue'
import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12
import modalService from '@/service/modalService'
import ASLN2112 from '@/views/page/AS/LN/ASLN2112/ASLN2112'
import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'
import {dateFormat} from '@/utils/date'

export default {
    name : "ASLN1105",
    data: () => {
        return {
            mydtCusno       : "",           // 마이데이터고객번호
            acLnOgnAmtt     : "",           // 계좌대출원금액합계
            lnAcBactt       : "",           // 대출계좌잔액합계
            cptAcCn         : "",           // 할부금융계좌목록수
            cptAcList       : [],           // 할부금융계좌목록
            hideYn		: false,  // 숨김 여부
        }
    },
    computed : {
        noData() {
            return this.cptAcCn==0?'com_bg_type02':''
        }
    },
    mounted() {
        this.initComponent()
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
            this.hideYn = this.getSecretAmInfo().includes('IST')
            this.mydtCusno = this.getUserInfo('mydtCusno')
            this.getData()
        },
        getData() {
            // 실제구현
            const config = {
                url : '/as/ln/05r01',
                data : {
                    mydtCusno: this.mydtCusno
                }
            }
            apiService.call(config).then(response => {
                this.mydtCusno      = response.mydtCusno || ''
                this.acLnOgnAmtt    = response.acLnOgnAmtt || 0
                this.lnAcBactt      = response.lnAcBactt || 0
                this.cptAcCn        = response.cptAcCn || 0
                this.cptAcList      = response.cptAcList || []
                this.callJQueryFncExcute()
            })

        },

        openCptDetailPop(obj) {
            const config = {
                component: ASLN2112,
                params : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtAcno        : obj.mydtAcno,
                    mydtScNo        : obj.mydtScNo,
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData();
            })
        },

        movePage() {
            const config = {
                component: COAR4001,
            }
            modalService.openPopup(config)
        },
        /*
            숨김여부
        */
        fn_setHidden(flag, type) {
            this.setSecretAmInfo(flag, type)
        },

    },
    components : {
        Page,
        FootersV2,
        //AsCategoryV2,
        AsSubCategoryV4,
        CmmFinancialBanner  //상품추천배너 2021.11.12
    }
}
</script>