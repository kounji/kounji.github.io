<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 대출
* @ 페이지설명 : 나의자산 > 부채 > 대출 > 정렬 조건 팝업
* @ 파일명     : src/views/page/AS/LN/ASLN4009/ASLN4009.vue
* @ 작성자     : CS541017
* @ 작성일     : 2025-01-20
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-01-20              CS541017              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display:block;"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <strong class="com_pop_tit01">조건 검색</strong>
                </div>
                <div class="popup_content com_btn_bottom">
                    <div class="radio_list noLine">
                        <div class="btn_radio">
                            <input type="radio" name="radio03" id="radio3-1" v-model="sortVal" value="1" :checked="sortVal==='1'">
                            <label for="radio3-1">기본</label>
                        </div>
                        <div class="btn_radio">
                            <input type="radio" name="radio03" id="radio3-2" v-model="sortVal" value="2" :checked="sortVal==='2'">
                            <label for="radio3-2">금액순</label>
                        </div>
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="btn_full_box2">
                        <a href="#nolink" role="button" class="btn btn_mint"  @click.prevent="fn_search()">확인</a>
                    </div>
                </div>
                
                <a href="#nolink" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>
<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name : "ASLN4009",
     data: () => {
        return {
            sortVal    : ""   // 정렬 1 : 기본순 , 2 : 금액순
        }
    },
    mixins: [
        popupMixin
    ],
    methods: {
        // 팝업화면 초기화
        initComponent() {
            console.log("this.params.sortVal ",this.params.sortVal )
            this.sortVal = this.params.sortVal             
        }
        ,
        // 조회
        fn_search() {
            this.close({
                sortVal : this.sortVal
            })
		}
    },
    mounted() {
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },

}
</script>