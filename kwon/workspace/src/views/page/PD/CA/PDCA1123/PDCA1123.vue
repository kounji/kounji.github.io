<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 자동차관리 > 리콜사유
* @ 페이지설명 : 금융과생활 > 자동차관리 > 리콜사유(리콜사유가 여러건 있을 경우)
* @ 파일명     : src/views/page/PD/CA/PDCA1123/PDCA1123.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-10-29
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-10-29              CS516029                 최초작성
*************************************************************************/
-->
<template>
<div>
    <div class="dimmed" style="display:block;" @click="close()"></div>
    <div class="popup_box">
        <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
            <div class="popup_header">
                <h1>리콜 사유</h1>
            </div>
            <div class="popup_content">
                <div class="com_txt_type02">
                    <ul class="com_radio_type01 style03">
                        <li v-for="(recallInfo, index) in recallList" :key="index">
                            <span class="btn_radio">
                                <input type="radio" name="PDCA1123" :id="'PDCA1123_' + recallInfo.carRcalId" @click="()=>fn_selectContent(recallInfo.carRcalId)" :checked="recallInfo.carRcalId == val ? true : false">
                                <label :for="'PDCA1123_' + recallInfo.carRcalId">
                                    <span>{{recallInfo.rcalTinm}}</span>
                                </label>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <a class="btn_close" @click="close()" href="javascript:void(0);"><span>취소</span></a>
        </div>
    </div>
</div>
</template>
<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import _ from 'lodash'

    export default {
        name : "PDCA1123",
        props: {

        },
        data: () => {
            return {
                recallList:[],   // 리콜목록 LIST
                selectInfo:{}, // 선택정보
                val:''         // 선택값
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(params) {
                this.val        = params.val        || '' // 선택값
                this.recallList = params.recallList || '' // 리콜목록
            },
            fn_selectContent(carRcalId) {

                this.selectInfo = _.find(this.recallList, {"carRcalId":carRcalId})

                this.fn_complete()
            },
            fn_complete(){
                this.close(this.selectInfo)
            },
        },
    }
</script>