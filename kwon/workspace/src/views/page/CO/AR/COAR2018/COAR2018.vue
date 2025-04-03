<!--
/*************************************************************************
* @ 서비스경로 : 자산연결 > 금융자산 > 한번에 > 공동인증서 미보유 안내 팝업
* @ 페이지설명 : 공동인증서 미보유 안내
* @ 파일명     : src/views/page/CO/AR/COAR2018/COAS1006.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-16              CS528069              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click.prevent="closeSlide()"></div>
        <div class="popup_box renewal mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>공동인증서 안내</h1>
                </div>
                <div class="popup_content com_btn_bottom">
                    <div class="no_data_box">
                        <div class="no_data_list">
                            <p>유효한 공동인증서가 없어요!</p>
                            <span class="txt_sub">PC에서 농협인터넷뱅킹에 접속 후<br/>
                                저장된 공동인증서를 가져올 수 있어요</span>
                        </div>
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="btn_full_box2">
                        <a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_goCertCenter()">인증센터 바로가기</a>
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
    import modalService from '@/service/modalService'
    import appService from '@/service/appService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    export default {
        name: 'COAR2018',
        data: () => {
            return {
                resData : {},
                lastDay : ""
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

            // 인증센터 바로가기
            fn_goCertCenter() {
                
                if( !(window.location.host.indexOf('localhost') > -1) ) {
                    // 로컬이 아닐경우
                    if(this.getUserInfo('chnl') === "385") {
                        // 스뱅
                        appService.goSmartBankingCertCenter()
                    } else {
                        // 콕뱅
                        appService.cokBankGoCertCenter()
                    }
                } else {
                    // 로컬일 경우
                    modalService.alert("로컬일 경우 공동인증센터 바로가기 실행불가").then(() => {
                    
                    })
                }
            },

            /* 슬라이드 팝업 닫기 */
            closeSlide() {
                this.close()
            },
            
        },
        components: {      
            
        },
    }
    
</script>