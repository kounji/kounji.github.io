<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS 인증 확인
* @ 페이지설명 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS인증 완료 확인
* @ 파일명     : src/views/page/CO/AR/COAR2024/COAR2024.vue
* @ 작성자     : CS528051
* @ 작성일     : 2022-07-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-18              CS528051                 최초작성
*************************************************************************/
-->
<template>
    <div style="background-color:red; width: 100%;height: 10rem; border:solid 2rem blue;">
        <!-- popup S -->
        <div class="dimmed" style="display:block;"></div>	
        <div class="alert_popup renewal" id="alert_popup" style="display:block;"> <!-- 개발시 style="display:block;" 제거 -->
            <div class="popup_content">
                <div class="complete">
                    <!-- PASS 인증 실패 시 alert 팝업 화면 -->
                    <div class="secede_box">
                        <div v-html="secedeBoxHtml"></div>
                        <div  v-if="msgFlag" class="new_view_wrap">
                            <!-- 2022-09-15 : buttom 태그로 변경 -->
                            <button type="button" class="view" @click.prevent="fn_openGuidePopup()">
                                <em class="num">PASS</em> 인증서 이용안내<span class="ico_rightbar"></span>
                            </button>
                        </div>
                        <p class="txt_sub txt_gray">에러코드 <em>{{code}}</em></p>
                        <!-- //PASS 인증 실패 시 alert 팝업 화면 -->
                        <!-- 인증 유효시간 경과 시 오류 팝업 -->
                        <!-- <div class="secede_box">
                            <p class="txt">인증 유효시간이<br/>만료 되었습니다.</p>
                            <p class="txt_sub txt_gray">PASS 인증 요청을 다시 해 주세요<br/>
                                PASS 고객센터 <a href="tel:1800-4273" role="button">1800-4273</a></p>
                            <p class="txt_sub txt_gray">에러코드 <em>4107</em></p>
                        </div> -->
                        <!-- //인증 유효시간 경과 시 오류 팝업 -->
                    </div>
                </div>
            </div>
            <div class="popup_footer">
                <div class="btn_box">
                    <a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="close">확인</a>
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
    name : "COAR2024_alert",
    data: () => {
        return {
            code    : "",
            msg     : "",
            secedeBoxHtml : "",
            msgFlag : false,
        }       
    },
    created(){

    },
    mounted() {

        console.log("COAR2024 this.params=", this.params);

        this.msgFlag = this.params.msgFlag;
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

            this.close(this.code);
        },
    } 
}
</script>