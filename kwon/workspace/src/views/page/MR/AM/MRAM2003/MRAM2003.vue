<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 연결자산관리 > 만료기관관리 > 만료/해제된 기관의 개인 신용정보 삭제
* @ 페이지설명 : 연결자산관리 > 만료기관관리 > 만료/해제된 기관의 개인 신용정보 삭제
* @ 파일명     : src/views/page/MR/AM/MRAM2003/MRAM2003.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-30
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-30              CS528069              최초작성
*************************************************************************/
-->
<template>
    <div class="mydata2023">
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click="close()"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <strong class="com_pop_tit01">선택한 기관의 개인신용정보를<br>모두 삭제 하시겠어요?</strong>
                </div>
                <div class="popup_content com_btn_bottom">
                    <ul class="bl_dot_list">
                        <li>수집한 자산(공공)정보가 모두 삭제 되면 해당 기관의 정보를 이용한 서비스 제공이 어려워요.</li>
                        <li>연결 중인 기관의 자산(공공)정보를 삭제 하려면 연결 해제를 먼저 해 주세요.</li>
                    </ul>
                </div>
                <div class="popup_footer">
                    <div class="com_btnhalfbox_type02">
                        <a href="javascript:void(0);" role="button" class="btn btn_mint_gray" @click="close()">취소</a>
                        <a href="javascript:void(0);" role="button" class="btn btn_mint" @click="close('Y')">삭제</a>
                    </div>
                </div>
                <a href="javascript:void(0);" role="button" class="btn_close" @click="close()"><span class="">닫기</span></a>
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
        name: 'MRAM2003',
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