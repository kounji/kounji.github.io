<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나를위한금융
* @ 페이지설명 : 금융과생활 > 나를위한금융 > 나의 세금.사회보험료 > 메인
* @ 파일명     : src\views\page\PD\TX\PDTX1002\PDTX1002.vue
* @ 작성자     : CS528051
* @ 작성일     : 2022-09-20
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-20              CS528051              최초작성
*************************************************************************/
-->
<template>
    <!-- <page class="content-view hasLNB">
        <pd-category-v2 type="PDTX"></pd-category-v2>
        <pd-sub-category-v2 type="TX"></pd-sub-category-v2> -->

            <!-- <div id="content" class="renewal">
				<div class="com_inner"> -->
                <!-- Lnb -->
                <!-- 2022-08-30 lnb_inner 삭제 -->
                <!-- <div class="lnb">
                    <ul role="tablist">
                        <li><a href="javascript:void(0);" role="button">연말정산</a></li>
                        <li><a href="javascript:void(0);" role="button">노후준비</a></li>
                        <li class="on"><a href="javascript:void(0);" role="button">나의 세금.사회보험료</a></li>
                    </ul>
                </div> -->
                <!--// Lnb -->

                <!-- 데이터 없을때 -->
                <!-- <div class="no_data_box no_data_box01">
                    <div class="no_data_list">
                        <p>연결된 공공 정보가 없어요.</p>
                        <span class="txt_sub">
                            흩어져 있는 공공 정보를 한 번에 연결하고<br/>
                        각종 세금 완납 여부 및 사회보험료 납부.가입<br/>
                        내역을 한 눈에 확인하세요. 
                        </span>
                    </div>
                </div> -->
                <!-- //데이터 없을때 -->
				
                <!-- btn -->
                <div class="com_btnhalfbox_type02 btn_custom">
                    <a href="javascript:void(0);" role="button" class="btn btn_mint">공공 정보 연결</a>
                </div>
                <!--// btn -->
				<!-- </div>
			</div> -->

        <!--// content E -->

        <!-- <footersV2 type="pd" />
    </page> -->
</template>

<script>
// import Page from '@/views/layout/Page.vue'
// import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
// import PdCategoryV2 from '@/components/category/PdCategoryV2.vue'
// import PdSubCategoryV2 from '@/components/category/PdSubCategoryV2.vue'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'

import PDTX1002 from '@/views/page/PD/TX/PDTX1002/PDTX1002'

export default {
    name : "PDTX1002",
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
                    component : PDTX1002
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
        // Page,
        // FootersV2,
        // PdCategoryV2,
        // PdSubCategoryV2
    },

}
</script>