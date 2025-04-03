<!--
/*************************************************************************
* @ 서비스경로 : 자산관리 서비스 가입 > 권유직원 선택 누락 알림 팝업
* @ 페이지설명 : 권유직원 선택 누락 확인
* @ 파일명     : src/views/page/CO/AS/COAS2009/COAS2009.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-04              CS528069              최초작성
* 2023-08-23              CS533035              화면번호수정(COAS1009->COAS2009)
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click.prevent="closeSlide()"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_content com_btn_bottom">
                    <div class="no_data_box">
                        <div class="no_data_list">
                            <p>선택한 권유직원이 없습니다.</p>
                            <span class="txt_sub">직원 조회 후 권유직원을 선택해 주세요.</span>
                        </div>
                        <div class="com_btn_area">
                            <a href="javascript:void(0);" role="button" class="com_btn_round" @click.prevent="close('selectEno')"><span class="btn_go">직원 찾기</span></a>
                        </div>
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="btn_full_box">
                        <a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="close('continue')">권유직원 없이 가입 </a>
                    </div>
                </div>
                
                <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="closeSlide()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
    import apiService from '@/service/apiService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    export default {
        name: 'COAS2009',
        data: () => {
            return {
                
            }
        },
        computed: {
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        created() {
            
        },
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: { 
            initComponent() {
                this.getData()
            },
            getData() {
                
            },

            /* 슬라이드 팝업 닫기 */
            closeSlide() {
                this.close()
            }
            
        },
        components: {      
            
        },
    }
    
</script>