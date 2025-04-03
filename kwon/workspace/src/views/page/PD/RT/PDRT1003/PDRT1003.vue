<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 금융통통 > 노후준비 > 예상 연금 수령액 안내
* @ 페이지설명 : 금융생활 > 금융통통 > 노후준비 > 예상 연금 수령액 안내
* @ 파일명     : src/views/page/PD/RT/PDRT1003/PDRT1003.vue
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
                    <h1>예상 연금 수령액</h1>
                </div>
                <div class="popup_content">
                    <div class="help_box">
                        <strong class="com_box_tit01">알아두세요</strong>
                        <ul class="bl_dot_list one_register_list">
                            <li>
                                국민연금 월 예상 수령액은 현재 소득 기준으로 만 60세까지 예상 납입액으로 추정한 금액이며 향후 수익률, 연금수령 방법, 수령 중 소득 유무에 등에 따라 수령 금액은 변경될 수 있습니다.
                            </li>
                            <li>
                                국민연금 월 예상 수령액은 국민연금공단의 예상연금월액표를 기준으로 예상 산정한 금액으로 <span class="com_point_red">실제 수령액과 차이가 있을 수 있습니다.</span>
                            </li>
                            <li>
                                해당 금액에는 퇴직연금과 개인연금이 포함되어 있으며 수익률, 물가상승률, 소득세 및 퇴직연금 수수료는 반영 하지 않은 금액입니다.
                            </li>
                            <li>
                                국민연금 수령 나이부터 안내 해 드리며 수령 중인 연금이 있는 경우 잔액 기준으로 추산한 금액입니다. 
                            </li>
                            <li>개인 적정 노후생활비는 국민연금관리공단 통계 자료에 근거한 자료입니다.</li>
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
        name: 'PDRT1003',
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