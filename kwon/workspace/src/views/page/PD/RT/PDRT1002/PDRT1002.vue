<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 금융통통 > 노후준비 > 납입 기간 중 월 평균소득
* @ 페이지설명 : 금융생활 > 금융통통 > 노후준비 > 납입 기간 중 월 평균소득
* @ 파일명     : src/views/page/PD/RT/PDRT1002/PDRT1002.vue
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
                    <h1>납입 기간 중 월 평균소득</h1>
                    <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
                </div>
                <div class="popup_content com_btn_bottom">
                    <div class="com_input_type01 com_word1">
                        <input type="number" id="com_input01" value="300,000"  required="" placeholder="월 평균소득 입력하세요" title="월 평균소득 입력">
                        <!-- <label for="com_input01">
                            <span class="txt_label_x">연소득</span>
                        </label> -->
                        <div class="del_txt">
                            <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                            <span class="com_inputtxtright2">원</span>
                        </div>
                        <p class="com_sum">4조 2,345억 6,789만원</p>
                        <div class="btn_price_group">
                            <button type="button" class="btn_price">+<strong>1</strong>만</button>
                            <button type="button" class="btn_price">+<strong>5</strong>만</button>
                            <button type="button" class="btn_price">+<strong>10</strong>만</button>
                            <button type="button" class="btn_price">+<strong>100</strong>만</button>
                        </div>
                    </div>
                    <strong class="com_txt_sub01 com_point_red">33만원~524만원 사이에서 입력 가능합니다.</strong>
                    <p class="com_txtinfo_type01">기본으로 반영된 고객님의 평균 소득은 연결된 공공 정보의 기준소득월액을 참고했습니다.</p>
                </div>
                <div class="popup_footer">
                    <div class="btn_full_box2">
                        <a href="javascript:void(0);" class="btn btn_mint">소득 변경 저장</a>
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
        name: 'PDRT1002',
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