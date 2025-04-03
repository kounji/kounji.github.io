<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 상품추천 > 대출한도조회
* @ 페이지설명 : 금융과생활 > 상품추천 > 대출한도조회 > step 1. 신용등급, 한도조회안내
* @ 파일명     : src\views\page\PD\PD\PDPD1107\PDPD1107.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-08-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-24              CS516033              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>대출한도조회</h1>
        </div>
        <div class="popup_content com_bg_type00">
            <div  class="com_inner">
                <div class="loan_box">
                    <p>한 번의 조회로 고객님께 딱 맞는<br> 대출 상품을 추천해 드립니다.</p>
                    <div class="loan_step_area">
                        <ul>
                            <li class="loan_step_01"><em>연결 자산 조회</em><span>자산 및 소득, 부채 등 정보 조회</span></li>
                            <li class="loan_step_02"><em>한도 및 금리 조회</em><span>대출한도와 예상금리 조회</span></li>
                            <li class="loan_step_03"><em>맞춤 상품 추천</em><span>가입 가능 신용/아파트/전세대출 추천</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="com_inner help_box">
                <strong class="com_box_tit01">알아두세요!</strong>
                <ul class="bl_dot_list">
                    <li>대출한도조회 서비스는 마이데이터 서비스에 연결한 모든 자산을 기반으로 산출된 결과로 실제 대출 신청 시와 다를 수 있습니다.</li>
                    <li>정확한 한도 및 금리 결과 조회를 위해 보유 하신 전체 기관 연결을 추천 드립니다.</li>
                    <li>영업점 대출 신청 시 소득증빙서류 등 제출 서류가 필요 할 수 있습니다.</li>
                </ul>
            </div>
        </div>
        <div class="popup_footer fixed">
            <div class="btn_full_box">
                <a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_openPDPD1108()">연결 자산 조회</a>
            </div>
        </div>
        <a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll"><span class="blind">화면닫기</span></a>
    </div>
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'

    import PDPD1108 from '@/views/page/PD/PD/PDPD1108/PDPD1108'

    export default {
        name : "PDPD1107",
        data: () => {
            return {
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent();

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent() {
            },
            fn_openPDPD1108() {
                const config = {
                   component : PDPD1108
                }

                modalService.openPopup(config).then(() => {});
            }
        }
    }
</script>