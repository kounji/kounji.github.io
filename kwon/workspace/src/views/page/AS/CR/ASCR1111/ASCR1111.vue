<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 금융건강도 > 신용정보
* @ 페이지설명 : 나의자산 > 금융건강도 > 신용정보 카드내역 도움말
* @ 파일명     : src/views/page/AS/CR/ASCR1111/ASCR1111.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-06-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-23              CS516033              최초작성
*************************************************************************/
-->
<template>
    <div>
        <div class="dimmed" style="display:block;" @click.prevent="close()"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <div class="popup_header">
                    <h1>현금서비스</h1>
                </div>
                <div class="popup_content">
                    <div class="only_txt">
                        <p class="txt_cont">신용카드사에서 제공하는 대출 서비스입니다.<br>
                            단기카드대출이라는 용어를 사용하고 있습니다.<br>
                            미리 지정한 한도 내에서 ATM기나 인터넷을 통해
                            받은 금액이 표시 됩니다.
                        </p>
                    </div>
                </div>
                <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
            </div>
        </div>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'

    export default {
        name : "ASCR1111",
        data: () => {
            return {
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        mounted() {
            this.initComponent();

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
            }
        }
    }
</script>