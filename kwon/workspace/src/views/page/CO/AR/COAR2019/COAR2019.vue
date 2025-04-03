<!--
/*************************************************************************
* @ 서비스경로 : 자산연결 > 금융자산 > 한번에 > 한번에 등록 이어하기
* @ 페이지설명 : 한번에 등록 이어하기
* @ 파일명     : src/views/page/CO/AR/COAR2019/COAS1018.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-07-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-26              CS528069              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click.prevent="closeSlide()"></div>
        <div class="popup_box renewal mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>자산연결 이어하기</h1>
                </div>
                <div class="popup_content com_btn_bottom">
                    <div class="complete">
                        <div class="secede_box">
                            <p class="txt">연결을 완료 하지 않은 금융 자산이 있어요.
                            </p>
                            <p class="txt_sub">자산 연결을 이어서 진행 할까요?</p>
                        </div>
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="com_btnhalfbox_type02">
                        <a href="javascript:void(0);" class="btn btn_mint_gray" @click.prevent="fn_reset()">처음부터</a>
                        <a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_continue()">진행하기</a>
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
    name: 'COAR2019',
    data: () => {
        return {
            resData : {},
            lastDay : ""
        }
    },
    props: {
        cdata: {
            type: Object,
            default: () => ({})
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
            this.resData = this.cdata.conData || {}
        },
        getData() {
        },

        /* 슬라이드 팝업 닫기 */
        closeSlide() {
            this.close()
        },

        // 이어하기 선택
        fn_continue() {
            // 이어하기. 
            this.close("continue")
        },

        // 처음부터 선택
        fn_reset() {
            // 처음부터 진행
            this.close("cancel")
        }
        
    },
    components: {      
        
    },
}
    
</script>