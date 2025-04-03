<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 금융건강도 > 신용정보
* @ 페이지설명 : 나의자산 > 금융건강도 > 신용정보 대출내역 도움말
* @ 파일명     : src/views/page/AS/CR/ASCR1110/ASCR1110.vue
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
                    <h1>대출 잔액</h1>
                </div>
                <div class="popup_content">
                    <div class="only_txt">
                        <p class="txt_cont">한도대출인 경우, 지난달 이후 남아있는 대출금액,<br/>
                            일시상환 대출인 경우, 어제 이후 남아있는 대출금액이 표시됩니다.
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
        name : "ASCR1110",
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