<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 리스
* @ 페이지설명 : 나의자산 > 부채 > 리스 메인
* @ 파일명     : src/views/page/AS/LS/ASLS2001/ASLS2001.vue
* @ 작성자     : CS533033
* @ 작성일     : 2023-08-07
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-26              CS515897               최초작성
* 2021-06-01              CS515937               수정
* 2023-08-07              CS533033               수정
*************************************************************************/
-->
<template>
	<page class="content-view hasLNB mydata2023">
		<!-- S :: 자산 카테고리 -->
        <!--
        <as-category-v2 type="LN"></as-category-v2>
        -->		
        <!-- E :: 자산 카테고리 -->

        <as-sub-category-v4 type="LN" typeDtl="06"></as-sub-category-v4>
        <!--
        <div id="content" class="renewal" v-if="cptAcCn > 0 || cptEpyLeasCn > 0">
        -->
        <div id="content" class="renewal" v-if="cptAcCn > 0 || cptEpyLeasCn > 0">
            <div class="com_inner" v-if="cptAcCn > 0 || cptEpyLeasCn > 0">
                <div class="new_sub_info">
                    <div class="title">
                        <!-- <div class="text">
                        갚을 돈<br>
                        <span class="fs-27">총 </span><strong><span class="num counter" data-count="lnAcBactt">{{lnAcBactt | numberFilter}}</span>원</strong>
                        </div> -->

                        <div class="text">
                            갚을 돈<br>
                            <!-- [v4.0] 25-02-17 잔액숨김 기능추가 -->
                            <div class="toggle_money">
                                <input type="checkbox" title="금액숨김" name="" id="sum_view_01" v-model="hideYn" @change="fn_setHidden('LEAS', hideYn)">
                                <label for="sum_view_01" class="btns">
                                    <span class="hide" aria-hidden="true">보기</span>
                                    <span class="show" aria-hidden="true">숨김</span>
                                </label>
                                <div class="sum">
                                    <span class="hide">잔액숨김</span>
                                    <span class="show">총 <em>{{lnAcBactt | numberFilter}}</em>원</span>
                                </div>
                            </div>
                            <!-- //[v4.0] 25-02-17 잔액숨김 기능추가 -->
                        </div>
                    </div>
                </div>
                <!-- S :: 추천배너 2021.11.12 -->
                <cmm-financial-banner asdbDsc="12"/>
                <!-- E :: 추천배너 2021.11.12 -->
			</div>
            <hr class="hr02">    

            
            <div class="com_inner" v-if="cptAcCn > 0 || cptEpyLeasCn > 0">
                <div class="asset_link_box">
                    <ul class="list_type_01">
                        <template v-if="cptAcCn > 0">
                            <li v-for="(cptAcListObj, index) in cptAcList" :key="'Ac' + index">
                                <a href="javascript:void(0);" @click="openCptAcDtl(cptAcListObj)">
                                    <dl>
                                        <dt>
                                            <div>
                                                <i :class="cptAcListObj.infOfrmnOrgC"><span class="blind">{{cptAcListObj.infOfrmnOrgCNm}}</span></i>
                                                <em>{{cptAcListObj.istFncWrsnm}}</em>
                                            </div>
                                        </dt>
                                        <dd>
                                            <span class="prod_num">{{cptAcListObj.istFncRpyAcno}}</span> 
                                        </dd>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{cptAcListObj.lnAcBac | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>
                            </li>
                        </template>
                        <template v-if="cptEpyLeasCn > 0">
                            <li v-for="(cptEpyLeasListObj, index) in cptEpyLeasList" :key="'Epy' + index">
                                <a href="javascript:void(0);" @click="openCptEpyLeasDtl(cptEpyLeasListObj)">
                                    <dl>
                                        <dt>
                                            <div>
                                                <i :class="cptEpyLeasListObj.infOfrmnOrgC"><span class="blind">{{cptEpyLeasListObj.infOfrmnOrgCNm}}</span></i>
                                                <em>{{cptEpyLeasListObj.infOfrmnOrgCNm}} {{cptEpyLeasListObj.istFncWrsnm}}</em>
                                            </div>
                                        </dt>
                                        <dd>
                                            <span class="prod_num">{{cptEpyLeasListObj.istFncRpyAcno}}</span> 
                                        </dd>
                                    </dl>
                                </a>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="movePage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
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
import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12
import modalService from '@/service/modalService'
import ASLN2113 from '@/views/page/AS/LN/ASLN2113/ASLN2113'
import ASLN2114 from '@/views/page/AS/LN/ASLN2114/ASLN2114'
import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'
import {dateFormat} from '@/utils/date'

export default {
    name : "ASLN1106",
    data: () => {
        return {
            mydtCusno       : "",   // 마이데이터고객번호
            acLnOgnAmtt     : 0,    // 대출계좌잔액합계
            lnAcBactt       : 0,    // 계좌대출원금액합계
            cptAcCn         : 0,    // 할부금융계좌목록수
            cptAcList       : [],   // 할부금융계좌목록(금융리스)
            epyLeasTramtt   : 0,    // 운용리스거래금액합계 -> 운용리스는 거래금액합계정보가 없다
            cptEpyLeasCn    : 0,    // 할부금융운용리스목록수
            cptEpyLeasList  : [],   // 할부금융운용리스목록(운용리스)
            hideYn		: false,  // 숨김 여부
        }
    },
    computed : {
        noData() {
            return (this.cptAcCn == 0 && this.cptEpyLeasCn == 0)?'com_bg_type02':''
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
            this.hideYn = this.getSecretAmInfo().includes('LEAS')
            this.mydtCusno = this.getUserInfo('mydtCusno')
            this.getData()
        },
        getData() {
             // 실제구현
            const config = {
                url : '/as/ln/06r01',
                data : {
                    mydtCusno: this.mydtCusno
                }
            }
            apiService.call(config).then(response => {
                this.mydtCusno      = response.mydtCusno || ''
                this.acLnOgnAmtt    = response.acLnOgnAmtt || 0
                this.lnAcBactt      = response.lnAcBactt || 0
                this.cptAcCn        = response.cptAcCn || 0
                this.epyLeasTramtt  = response.epyLeasTramtt || 0
                this.cptEpyLeasCn   = response.cptEpyLeasCn || 0
                this.cptAcList      = response.cptAcList || []
                this.cptEpyLeasList = response.cptEpyLeasList || []
                this.callJQueryFncExcute()    
            })

        },

        // 금융리스 상세 팝업 오픈
        openCptAcDtl(obj) {
            const config = {
                component: ASLN2113,
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

        // 운용리스 상세 팝업 오픈
        openCptEpyLeasDtl(obj) {
            const config = {
                component: ASLN2114,
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