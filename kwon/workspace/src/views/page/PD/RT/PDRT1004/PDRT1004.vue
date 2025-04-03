<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 금융통통 > 노후준비 > 은퇴 전 월 저축금액
* @ 페이지설명 : 금융생활 > 금융통통 > 노후준비 > 은퇴 전 월 저축금액
* @ 파일명     : src/views/page/PD/RT/PDRT1004/PDRT1004.vue
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
                    <h1>은퇴 전 월 저축금액</h1>
                </div>
                <div class="popup_content">
                    <div class="btn_price_list center">
                        <a href="javascript:void(0)" role="button">
                            <span class="price">
                                <em>50</em><span>만원</span>
                            </span>
                        </a>
                        <a href="javascript:void(0)" role="button">
                            <span class="price">
                                <em>100</em><span>만원</span>
                            </span>
                        </a>
                        <a href="javascript:void(0)" role="button">
                            <span class="price">
                                <em>150</em><span>만원</span>
                            </span>
                        </a>
                        <a href="javascript:void(0)" role="button">
                            <span class="price">
                                <em>200</em><span>만원</span>
                            </span>
                        </a>
                    </div>
                    <div class="com_input_type01 com_word2-2">
                        <!-- <label for="com_input01"><span class="txt_label">직접 입력</span></label> -->
                        <input type="number" id="com_input01" class="" name="" value="" required="" placeholder="저축금액 직접 입력" title="저축금액 입력">
                        <a href="javascript:void(0);" role="button" class="com_btnround_type05"><span>확인</span></a>

                        <div class="del_txt">
                            <a href="javascript:void(0);" class="com_btn_delete2"><span class="blind">삭제</span></a>
                            <span class="com_inputtxtright2 type04 style01">만원</span>
                        </div>
                    </div>
                    <strong class="com_txt_sub01 com_point_red">10만원~1000만원 사이에서 입력 가능합니다.</strong>
                    <p class="com_txtinfo_type01">국민연금공단 개인 노후 생활비 기준</p>
                </div>
                <a href="javascript:void(0);" role="button" class="btn_close" @click="close"><span class="">취소</span></a>
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
        name: 'PDRT1004',
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