<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 금융통통 > 노후준비 > 일시금 수령예상액 안내
* @ 페이지설명 : 금융생활 > 금융통통 > 노후준비 > 일시금 수령예상액 안내
* @ 파일명     : src/views/page/PD/RT/PDRT1006/PDRT1006.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-09-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-28              CS528069              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click.prevent="close()"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>일시금 수령예상액</h1>
                </div>
                <div class="popup_content">
                    <div class="help_box">
                        <strong class="com_box_tit01">알아두세요</strong>
                        <ul class="bl_dot_list one_register_list">
                            <li>
                                비과세로 수익률이 반영되지 않았으며 현재 소득 기준
                                으로 만 60세까지 예상 납입액으로 추정한 금액으로 <span class="com_point_red">실제 
                                수령액과 차이가 있을 수 있습니다.</span>
                            </li>
                            <li>
                                국민연금에 한하며 퇴직연금과 개인연금은 개별 연금 
                                수령 신청이 가능합니다.	
                            </li>
                            <li>
                                일시금으로 수령 할 경우 연금으로 수령 하는 총 금액 
                                보다 적은 금액을 지급 받습니다.
                            </li>
                        </ul>
                    </div>
                </div>
                <a href="javascript:void(0);" role="button" class="btn_close" @click="close"><span class="">닫기</span></a>
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
        name: 'PDRT1006',
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
                
            },
            getData() {
            },

        },
        components: {      
            
        },
    }
    
</script>