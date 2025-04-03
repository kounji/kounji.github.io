<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 부동산
* @ 페이지설명 : 자산등록 > 부동산 > step 1-1. 부동산 면적 선택
* @ 파일명     : src/views/page/CO/RE/CORE1203/CORE1203.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-14
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-14              CS515897              최초작성
* 2022-07-06 			  CS528053              고도화 파일명 변경(CO/CO/COCO1111/COCO1111.vue -> CO/RE/CORE1203/CORE1203.vue)
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display:block;" @click.prevent="close()"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <div class="popup_header">
                    <h1>면적 선택</h1>          
                </div>
                <div class="popup_content">
                    <div class="com_txt_type02">
                        <ul class="com_radio_type01">
                            <li v-for="(rlestItem, idx) in rlestInfo" :key="idx">
                                <span class="btn_radio" @click.prevent="setRlestAreaInfo(rlestItem.aptHscxIdvdc, rlestItem.newPytpAreaCntn, rlestItem.aptHfisArea)">
                                    <input type="radio" :id="rlestItem.aptHscxIdvdc + '_' + idx" :name="rlestItem.aptHscxIdvdc" :value="rlestItem.newPytpAreaCntn" v-model="selArea" />
                                    <label :for="rlestItem.aptHscxIdvdc + '_' + idx">{{rlestItem.newPytpAreaCntn}}㎡</label>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <a href="javascript:void(0);" @click.prevent="close()" class="btn_close"><span class="">취소</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>
<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name : "CORE1203",
    data: () => {
        return {
            rlestInfo : [],
            selArea : "",   // 기선택된 아이템
        }
    },
    mixins: [
        popupMixin
    ],
    methods: {
        // 팝업화면 초기화
        popInit(popupParams) {
            this.rlestInfo = popupParams.rlestInfo
            this.selArea = popupParams.selArea
            console.log("면적 목록 파라미터 ", popupParams)

            this.getData()
        },
        getData() {

        },
        // Item 선택 시 부모창으로 넘겨줄 파라미터 설정
        setRlestAreaInfo(aptHscxIdvdc, newPytpAreaCntn, aptHfisArea) {
            this.closeParams = {
                aptHscxIdvdc : aptHscxIdvdc,
                newPytpAreaCntn : newPytpAreaCntn,
                aptHfisArea : aptHfisArea
            }
            this.close(this.closeParams)
        }
    },
    mounted() {
        this.popInit(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },

}
</script>