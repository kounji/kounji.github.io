<!--
/*************************************************************************
* @ 서비스경로 : PFM메인 > 메인 > 자산편집
* @ 페이지설명 : 메인 > 자산편집
* @ 파일명     : src/views/page/MA/MAMA0004/MAMA0004.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-08-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-03              CS515729                 최초작성
* 2022-10-11              CS529599                 MA0003 -> MA1006
* 2023-07-14              CS553461                 MA1006 -> MA2002
***************************************************************************/
-->
<template>
    <div class="mydata2023">
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_content com_btn_bottom">
                    <div class="imgInfoBox">
                        <!-- <div class="secede_box"> -->
                            <p class="com_box_tit">연결하지 않은 자산이 있나요?</p>
                            <p class="com_txt_sub">자산, 카드, 대출은 물론 연금, 건강보험, 세금까지<br>한 곳에서 관리하세요.</p>
                        <!-- </div> -->
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="btn_full_box">
                        <a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_goAssets()">자산 연결</a>
                    </div>
                </div>
                <p class="noview">
                    <span class="btn_checkbox02">
                        <input type="checkbox" name="chk_MAMA2002" id="chk_MAMA2002" v-model="chkNoSeeAssets" ref="chk_MAMA2002">
                        <label for="chk_MAMA2002">
                            <span>오늘하루 닫기</span>
                        </label>
                    </span>
                </p>
                
                <a href="javascript:void(0);" role="button" class="btn_close event" @click.prevent="fn_noSeeAssets()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>
<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    export default {
        name : "MAMA2002",
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
                if (!this.chkNoSeeAssets) {
                    this.close()
                } else {
                    this.close('noSeeAssets')
                }
            },
            fn_goAssets(){
                this.close('goAssets')
            }
        }
    }
</script>