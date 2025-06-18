<!--
/*************************************************************************
* @ 서비스경로 : PFM메인 > 메인 > 자산연결메인팝업
* @ 페이지설명 : 메인 > 자산연결메인팝업
* @ 파일명     : src/views/page/MA/MAMA4002/MAMA4002.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-03-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-04              CS541013                 최초작성
***************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup">
                <div class="popup_content">
                    <div class="hidden_asset_connection">
                        <strong class="tit">흩어져있는 내 자산 연결해 보세요.</strong>
                        <p class="gray_box">은행계좌, 연금, 건강보험 연결할수록 보다 정확한 자산 리포트를 받을 수 있어요.</p>
                    </div>
                </div>

                <div class="popup_footer">
                    <div class="btns_wrap">
                        <button type="button" class="btns lg" @click.prevent="fn_noSeeAssets()">오늘 닫기</button>
                        <button type="button" class="btns lg primary" @click.prevent="fn_goAssets()">자산연결</button>
                    </div>
                </div>
                <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="fn_close()"><span class="">닫기</span></a>
            </div>
        </div>
    </div>
</template>
<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    export default {
        name : "MAMA4002",
        data: () => {
            return {
                chkNoSeeAssets: false
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        computed : {
        },
        mounted() {
            this.initComponent()
        },
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
               
            },
            fn_noSeeAssets(){
                // if (!this.chkNoSeeAssets) {
                //     this.close()
                // } else {
                //     this.close('noSeeAssets')
                // }
                this.close('noSeeAssets')
            },
            fn_close(){
                this.close()
            },
            fn_goAssets(){
                this.close('goAssets')
            }
        }
    }
</script>