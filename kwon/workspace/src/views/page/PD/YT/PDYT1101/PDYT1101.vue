<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나를위한금융
* @ 페이지설명 : 금융과생활 > 나를위한금융 > 나의 연말정산 > 메인
* @ 파일명     : src\views\page\PD\YT\PDYT1101\PDYT1101.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-08-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-25              CS515897              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view hasLNB">
        <pd-category-v2 type="PDYT"></pd-category-v2>
        <pd-sub-category-v2 type="YT"></pd-sub-category-v2>

        <div id="content" class="com_sub_type02 com_bg_type00 hasLNB" >
            <div class="com_inner com_line_type01">
                <div class="new_top_area">
                    <span class="tax_img"></span>
                    <strong class="com_cont_tit02 pb0">
                        <span class="com_point_darkblue">13월의 급여,</span>나도 받을 수 있을까!<br/>세금도 아끼고 소득공제는 덤으로~
                    </strong>
                    <div class="com_btn_area00"><a href="javascript:void(0);" class="com_btn_more type01" @click.prevent="fn_openSlidePDYT1001()"><span>내가 받는 공제 알아보기</span></a></div>
                </div>
            </div>
            <div class="com_inner com_boxarea_type01">
                <div class="com_box_type01 com_box_list04">
                    <div class="new_tit_area">
                        <div><span class="icon_blue">카드소득공제</span></div>
                        <div class="txt">신용카드/체크카드, 어떤 카드를 사용하는게 나을까요?</div>
                    </div>
                    <!-- 설명부분 -->
                    <div class="info_list">
                        <ul class="bl_dot_list">
                            <li>
                                <dl>
                                    <dt>조건</dt>
                                    <dd>소득의 25% 초과 사용시</dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>한도</dt>
                                    <dd>300만원(총소득 7,000만원 이하)</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <!-- //설명부분 -->
                </div>
                <div class="com_box_type01 com_box_list04">
                    <div class="new_tit_area">
                        <div><span class="icon_blue">청약소득공제</span></div>
                        <div class="txt">내 집 마련 준비 하면서 소득공제 혜택까지</div>
                    </div>
                    <!-- 설명부분 -->
                    <div class="info_list">
                        <ul class="bl_dot_list">
                            <li>
                                <dl>
                                    <dt>조건</dt>
                                    <dd>소득 7천만원 이하 근로소득자</dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>한도</dt>
                                    <dd>240만원 내 납입금액의 40%</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <!-- //설명부분 -->
                </div>
                <div class="com_box_type01 com_box_list04">
                    <div class="new_tit_area">
                        <div><span class="icon_mint">연금세액공제</span></div>
                        <div class="txt">안락한 노후 준비와 절세를 한번에</div>
                    </div>
                    <!-- 설명부분 -->
                    <div class="info_list">700만원 한도 내에서 최대 1,155,000원까지
                        (총소득 5,500만원 이하)</div>
                    <!-- //설명부분 -->
                </div>
                <div class="com_box_type01 com_box_list04">
                    <div class="new_tit_area">
                        <div><span class="icon_mint">기타세액공제</span></div>
                        <div class="txt">소득의 3% 초과된 의료비 사용 금액이 있다면 사용금액의 15%가 세액공제 됩니다.</div>
                    </div>
                    <!-- 설명부분 -->
                    <div class="info_list">납입한 보험료가 있나요? 100만원 범위 내 납입금액의 13.2%가 세액공제 됩니다.</div>
                    <!-- //설명부분 -->
                </div>
            </div>
        </div>

        <!--// content E -->

        <footersV2 type="pd" />
    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import PdCategoryV2 from '@/components/category/PdCategoryV2.vue'
import PdSubCategoryV2 from '@/components/category/PdSubCategoryV2.vue'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'

import PDYT1001 from '@/views/page/PD/YT/PDYT1001/PDYT1001'

export default {
    name : "PDYT1101",
    data: () => {
        return {
        
        }
    },
    computed : {

    },
    methods: {
        initComponent() {

        },
        getData(){

        },

        fn_openSlidePDYT1001() {
            const config = {
                params : {
                    
                },
                renderer : {
                    component : PDYT1001
                }
            }
            modalService.openSlidePagePopup(config)
        }
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin
    ],
    created() {

    },
    components: {
        Page,
        FootersV2,
        PdCategoryV2,
        PdSubCategoryV2
    },

}
</script>