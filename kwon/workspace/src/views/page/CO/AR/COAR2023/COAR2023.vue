<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS 인증 확인(메시지 창)
* @ 페이지설명 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS인증 휴대폰 번호 선택(메시지 창)
* @ 파일명     : src/views/page/CO/AR/COAR2022/COAR2022.vue
* @ 작성자     : CS528051
* @ 작성일     : 2022-07-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-18              CS528051                 최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- wrap S -->
        <div id="wrap">
            <div>
                <a href="javascript:void(0);" class="btn_pop_view" data-popup="slide_popup_01">팝업보기</a>
            </div>
        </div>
        <!--// wrap E -->

        <!-- popup S -->
        <div class="dimmed" style="display:block;"></div>	
        <div class="alert_popup renewal" id="slide_popup_01" style="display:block;"> <!-- 개발시 style="display:block;" 제거 -->
            <div class="popup_content">
                <div class="complete custom_complete">
                    <div class="secede_box">
                        <p class="txt">PASS 인증을 취소하고 자산 연결<br/>을 처음부터 다시 진행 할까요?</p>
                    </div>
                </div>
            </div>
            <div class="popup_footer mt40">
                <div class="btn_box">
                    <a href="javascript:void(0);" class="btn btn_mint_gray" @click.prevent="close" >취소</a>
                    <!-- <a href="javascript:void(0);" class="btn btn_mint">확인</a> -->
                    <a href="javascript:void(0);" class="btn btn_mint" @click.prevent="close('COAR2023')">확인</a>
                </div>
            </div>
        </div>
        <!--// popup E -->
    </div>
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import COAR2026 from '@/views/page/CO/AR/COAR2026/COAR2026' // 미존재 자산연결 팝업

export default {
    name : "COAR2023",
    data: () => {
        return {
            code    : "",
            msg     : "",
            secedeBoxHtml : "",
        }       
    },
    created(){

    },
    mounted() {

        console.log("COAR2022_alert this.params=", this.params);

        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)   
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent(param) {
            this.moduleList = param.moduleList || [];

            this.code = this.params.code;
            this.msg = this.params.msg;
            this.secedeBoxHtml = this.params.secedeBoxHtml;
            this.getData();
        },
        getData() {
            // this.fn_timeOut();
            // this.fn_OAuthReq();
        },
        fn_openGuidePopup() {// PASS 인증서 이용안내 COAR2026
            
            const config = {
                component : COAR2026,
                params : {
                    telco_tycd  : "",
                    phone_num   : "",   // 핸드폰 번호  
                }
            }

            // 슬라이드팝업 -> 팝업 호출 시 필수코드
            config.renderer = this.modalConfig.renderer
            modalService.openPopup(config).then(response => {
                console.log(response);
                this.phoneHeader = response;
            })

            this.close();
        },
    } 
}
</script>