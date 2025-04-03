<!--
/*************************************************************************
* @ 서비스경로 : 설정/관리 > 서비스해지
* @ 페이지설명 : 설정/관리 > 서비스해지 완료
* @ 파일명     : src/views/page/CO/CO/COCO1101/COCO1103.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-18             CS515729                 최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>서비스탈퇴</h1>
        </div>
        <div class="popup_content com_bg_type02">
            <div class="com_inner com_bg_type00">
            </div>
            <div class="secede_box2">
                <p class="txt">서비스 탈퇴가 완료되었습니다.</p>
                <p class="txt_sub">
                    고객님의 개인정보와 신용정보가<br>모두 삭제되었습니다.
                    <span>언제든 다시 가입할 수 있어요!</span>
                </p>
            </div>
        </div>
        <div class="popup_footer fixed">
            <div class="btn_full_box">
                <a href="javascript:void(0);" @click.prevent="movePage()" class="btn btn_mint"> 확인</a>
            </div>
        </div>
        <a href="javascript:void(0);" @click.prevent="movePage()" class="btn_close"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import appService from '@/service/appService'
    import commonMixin from '@/common/mixins/commonMixin'
    // import routerService from '@/service/routerService'

    export default {
        name : "COCO1103",
        data: () => {
            return {
            }
        },
        mounted() {
            this.initComponent();

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
            },
            movePage() {
                appService.moveMain();
                this.closeAll();
            }
        }
    }
</script>