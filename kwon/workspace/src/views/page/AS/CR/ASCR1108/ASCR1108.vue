<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산분석리포트/금융건강도 > 신용정보
* @ 페이지설명 : 나의자산 > 자산분석리포트/금융건강도 > 신용정보 > 신용정보도움말 슬라이드팝업용
* @ 파일명     : src/views/page/AS/CR/ASCR1108
* @ 작성자     : CS515937
* @ 작성일     : 2021-06-09
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-09              CS515937                 최초작성
*************************************************************************/
-->
<template>
    <div>
        <div class="dimmed" style="display:block;" v-on:click.prevent="close()"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <!--[타이틀(Start)]-->
                <div class="popup_header">
                    <h1>내 신용점수</h1>
                </div>
                <!--[타이틀(End)]-->

                <!--메인(Body)-->
                <div class="popup_content">
                    <div class="credit_cont">
                        <div class="credit_box ico_pop_credit_01">
                            <strong class="tit">신용점수란?</strong>
                            <p class="txt_cont">신용점수는 1~1000점으로 신용조회회사
                                및 금융회사가 다양한 신용정보를 종합
                                하여 개인의 신용도를 구분한 것입니다.
                                신용점수가 1000점에 가까울수록
                                신용 상태가 좋음을 나타냅니다.
                            </p>
                        </div>
                        <div class="credit_box ico_pop_credit_02">
                            <strong class="tit">신용 백분위란?</strong>
                            <p class="txt_cont">신용 백분위는 다른 사용자와 비교하여
                                나의 신용도가 어떤 위치인지 상대적으로
                                알 수 있는 백분위로 신용평가사인 코리아
                                크레딧(KCB)에서 제공하는 정보입니다.
                            </p>
                        </div>
                    </div>
                </div>
                <!--메인(Body)-->

                <a href="javascript:void(0);" v-on:click.prevent="close()" class="btn_close"><span class="">닫기</span></a>	

            </div>
        </div> <!--popup_box(End)-->
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'

    export default {
        name : "ASCR1108",
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
            },
        },
    }
</script>