<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 금융통통
* @ 페이지설명 : 금융생활 > 금융통통 > 은퇴 준비 진단
* @ 파일명     : src\views\page\PD\RT\PDRT1012\PDRT1012.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-09-20
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-20              CS529599              최초작성(PDPD1101.vue의 상품추천 화면 '은퇴 준비 진단' 탭에서 이동)
*************************************************************************/
-->
<template>
    <page class="content-view">
        <pd-category-v2 type="PDYT"></pd-category-v2>
        <pd-sub-category-v2 type="RT"></pd-sub-category-v2>

        <div id="content" class="com_sub_type02">
            <div class="com_submainbox_type12 bg">
                <p class="txt_submaincont_type01"><strong>편안한 노후 생활을 위한<br/>준비가 되셨나요?</strong></p>
                <p class="txt_submaincont_type02 fs15">기대수명은 늘고, 은퇴 시기는<br/>
                    빨라 지고 있는 요즘, 나의 노후 준비는 어떤가요?
                </p>
            </div>
            <div class="com_inner new_mb25">
                <div class="com_box_type01">
                    <div class="compare_chart_wrap">
                        <div class="chart chart_type02">
                            <div class="bg">
                                <div class="area mid">은퇴 생활기간 30년!</div>
                                <div class="area bottom"></div>
                            </div>
                            <div class="bar_wrap">
                                <div class="bars">
                                    <div class="bar bar01"></div>
                                    <div class="bar bar02"></div>
                                </div>
                                <div class="label">
                                    <span>기대수명</span>
                                    <span>평균퇴직연령</span>
                                </div>
                            </div>
                        </div>
                        <p class="com_txt_sub01">[2020년 통계청 자료]</p>
                    </div>
                </div>
                <div class="com_box_type06 mt30 bg02">
                    <div class="text">나의 은퇴 준비 상태를 진단 하고<br><span class="color">지금부터 노후 준비 하세요!</span></div>
                </div>
                <div class="btn_full_box mt30">
                    <a class="btn btn_mint" role="button" @click.prevent="fn_openPDPD1104()">진단하기</a>
                </div>
            </div>
        </div>

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
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'

import PDPD1104 from '@/views/page/PD/PD/PDPD1104/PDPD1104'

export default {
    name : "PDRT1012",
    data: () => {
        return {
        }
    },
    computed : {
    },
    created() {
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.getData();
        },
        getData(){
        },
        // 진단하기 버튼 클릭
        fn_openPDPD1104() {
            const config = {
                component : PDPD1104
            }

            modalService.openPopup(config).then((response) => {
                if (response == "PDPD1101_tab1") {
                    // this.$refs.PDPD1101Tab1.click();
                    this.fn_movePage('PDPD4001') // 상품추천 화면으로 이동
                }
            });
        },
        // 화면 이동
        fn_movePage(pageId) {
            let params = {}

            const config = {
                name : pageId,
                params : params
            }
            
			commonService.movePage(config);
        }
    },
    mixins: [
        commonMixin
    ],
    components: {
        Page,
        FootersV2,
        PdCategoryV2,
        PdSubCategoryV2
    },
}
</script>