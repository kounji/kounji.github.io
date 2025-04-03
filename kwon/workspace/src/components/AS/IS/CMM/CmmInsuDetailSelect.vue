<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산현황 > 보험 > 대출정보 선택
* @ 페이지설명 : 나의자산 > 자산현황 > 보험 > 대출정보 선택 슬라이드팝업
* @ 파일명     : src/components/AS/IS/CMM/CmmInsuDetailSelect.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-09-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-09-04              CS533571                 최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- 슬라이드 팝업 시작 -->
        <div class="dimmed" style="display: block;" @click.prevent="close()"></div>
        <div class="popup_box renewal mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <strong class="com_pop_tit01">계좌 선택</strong>
                </div>
                <div class="popup_content">
                    <div class="radio_list noLine">
                        <div v-for="(item,index) in list" :key="index" @click.prevent="close(item)" class="btn_radio">
                            <input type="radio" name="radio03" :id="'radio3-' + index" :value="item.mydtAcno" v-model="selectVal">
                            <label :for="'radio3-' + index">{{item.mydtAcno}}</label>
                        </div>
                    </div>
                </div>
                <div class="popup_footer">
                </div>
                
                <a @click.prevent="close()" href="javascript:void(0);" role="button" class="btn_close"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// 슬라이드 팝업 종료 -->
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

export default {
    name : "CmmInsuDetailSelect",
    data: () => {
        return {
            list        : [],       // 목록
            selectVal   : ""        // 선택계좌
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)
    },
    methods: {
        initComponent(param) {
            this.list = param.list
            this.selectVal = param.selectVal
        }
    }
}
</script>
