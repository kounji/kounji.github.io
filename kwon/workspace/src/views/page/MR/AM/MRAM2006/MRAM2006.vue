<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 연결자산관리 > 자산연결해제 > 개인신용 정보 삭제 확인 팝업
* @ 페이지설명 : 연결자산관리 > 자산연결해제 > 개인신용 정보 삭제 확인 팝업
* @ 파일명     : src/views/page/MR/AM/MRAM2006/MRAM2006.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-01              CS528069              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click.prevent="close()"></div>
        <div class="popup_box renewal mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <!-- <div class="popup_header">
                    <h1>안내</h1>
                </div>
                <div class="popup_content com_btn_bottom">
                    <div class="txt_wrap">
                        <strong class="tit">수집한 개인신용정보를 삭제 하시면?</strong>
                        <p class="txt_sub">기존에 수집된 정보가 모두 삭제되어 <br>
                            정상적인 서비스 제공이 어려울 수 있습니다.</p>
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="com_btnhalfbox_type02">
                        <a href="javascript:void(0);" class="btn btn_mint_gray" @click.prevent="close('N')">정보 보관</a>
                        <a href="javascript:void(0);" class="btn btn_mint" @click.prevent="close('Y')">즉시 삭제</a>
                    </div>
                </div>

                <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;"> -->
                <div class="popup_header">
                    <strong class="com_pop_tit01">개인신용정보 삭제</strong>
                </div>
                <div class="popup_content com_btn_bottom">
                    <strong class="titH5">수집된 개인신용정보를 삭제할까요?</strong>
                    <p class="com_txt_sub mt10">기존에 수집된 정보가 모두 삭제하면 NH콕마이데이터<br>에서 제공하는 정상적인 서비스 제공이 어려울 수<br>있습니다.</p>
                </div>
                <div class="popup_footer">
                    <div class="com_btnhalfbox_type02">
                        <a href="#nolink" class="btn btn_mint_gray" @click.prevent="close('Y')">삭제 및 해제</a>
                        <a href="#nolink" class="btn btn_mint" @click.prevent="close('N')">연결만 해제</a>
                    </div>
                </div>
                
                <a href="#nolink" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
                
                <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
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
        name: 'MRAM2006',
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