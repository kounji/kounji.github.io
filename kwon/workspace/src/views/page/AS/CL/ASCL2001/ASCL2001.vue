<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 부채관리 > 자동차할부
* @ 페이지설명 : 자산 > 부채관리 > 자동차할부 메인화면
* @ 파일명     : src/views/page/AS/CL/ASCL2001/ASCL2001.vue
* @ 작성자     : 채찬영
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              채찬영                 최초작성
* 2021-05-31              CS515937              인터페이스설계 적용
* 2023-08-16              CS533571              마이데이터 확대 개발 UI/UX 일부개선
                                                ASLN1102.vue -> ASCL2001.vue 변경
*************************************************************************/
-->
<template>
	<page class="content-view hasLNB mydata2023">
		<!-- S :: 자산 카테고리 -->
        <!--
        <as-category-v2 type="LN"></as-category-v2>
        -->		
        <!-- E :: 자산 카테고리 -->
        <as-sub-category-v2 type="LN" typeDtl="02"></as-sub-category-v2>
		<!--
        <div id="content" class="renewal">
        -->        
        <div id="content">
            <div class="com_inner" v-if="cptAcCn > 0">
                <div class="new_sub_info">
                    <div class="title">
                        <div class="text">
                            갚을 돈<br>
                            <span class="fs-27">총 </span><strong><span class="num">{{lnAcBactt | numberFilter}}</span>원</strong>
                        </div>
                    </div>
                </div>

                <!-- S :: 추천배너 2021.11.12 -->
                <cmm-financial-banner asdbDsc="09"/>
                <!-- E :: 추천배너 2021.11.12 -->
            </div>
            
            <hr class="hr02" v-if="cptAcCn > 0">

            <div class="com_inner" v-if="cptAcCn > 0">
                <div class="asset_link_box">
                    <ul class="list_type_01 debt_list">
                        <li v-for="(item, index) in cptAcList" :key="index">
                            <a href="javascript:void(0);" @click="openCarDetailPop(item)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                            <em class="prod_name">{{item.istFncWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.lnAcBac | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="com_inner" v-else>
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
import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
import AsSubCategoryV2 from '@/components/category/AsSubCategoryV2.vue'
import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12
import modalService from '@/service/modalService'
import ASLN2112 from '@/views/page/AS/LN/ASLN2112/ASLN2112'
import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'

export default {
    name : "ASCL2001",
    data: () => {
        return {
            mydtCusno       : "",           // 마이데이터고객번호
            lnAcBactt       : "",           // 대출계좌잔액합계
            cptAcCn         : "",           // 할부금융계좌목록수
            cptAcList       : [],           // 할부금융계좌목록
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
            this.mydtCusno = this.getUserInfo('mydtCusno')
            this.getData();
        },

        // 데이터 조회 API 호출
        getData() {
            // 실제구현
            const config = {
                url : '/as/cl/01r01',
                data : {
                    "mydtCusno": this.mydtCusno
                }
            }
            apiService.call(config).then(response => {
                this.lnAcBactt      = response.lnAcBactt || 0
                this.cptAcCn        = response.cptAcCn || 0
                this.cptAcList      = response.cptAcList || []
                this.callJQueryFncExcute()
            })

        },

        // 자동차할부 상세 팝업 호출
        openCarDetailPop(obj) {
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

        // 자산연결 팝업 호출
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