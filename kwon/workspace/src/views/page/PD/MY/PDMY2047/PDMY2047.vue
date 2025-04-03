<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표 > 버킷리스트
* @ 페이지설명 : 금융과생활 > 나의목표 > 버킷리스트 > 버킷리스트-여행(인원/기간/여행지 선택 팝업)
* @ 파일명     : src/views/page/PD/MY/PDMY2047/PDMY2047.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-08-20
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-20              CS516029                 최초작성
* 2023-08-04              CS533453              고도화 파일명 변경(PDMY1121.vue -> PDMY2047.vue)
*************************************************************************/
-->
<template>
<div>
    <div class="dimmed" style="display:block;" @click="close()"></div>
    <div class="popup_box">
        <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
            <div class="popup_header">
                <h1>
                    <template v-if="gubn == '1'">인원 선택</template>
                    <template v-else-if="gubn == '2'">기간 선택</template>
                    <template v-else>여행지 선택</template>
                </h1>
            </div>
            <div class="popup_content">
                <div class="com_txt_type02">
                    <ul class="com_radio_type01">
                        <li v-for="(commInfo, index) in commList" :key="index">
                            <span class="btn_radio">
                                <input type="radio" name="PDMY2047" :id="'PDMY2047_' + commInfo.comnCVal" @click="()=>fn_selectContent(commInfo.comnCVal)" :checked="commInfo.comnCVal == val ? true : false">
                                <label :for="'PDMY2047_' + commInfo.comnCVal">
                                    <span>{{commInfo.comnCExpl}}</span>
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
        name : "PDMY2047",
        props: {

        },
        data: () => {
            return {
                commList:[], // 코드 LIST
                selectInfo:{}, // 선택정보
                gubn:'',      // 호출구분 (1:인원, 2:기간, 3:장소)
                val:'' // 선택값
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent(this.params)

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {
            initComponent(params) {
                this.gubn = params.gubn || '' // 호출구분값
                this.val = params.val || '' // 선택값

                if(this.gubn == '1') { // 인원

                    // 최대 20명 List 세팅
                    for(let i=0; i<20; i++) {

                        var inputObj = {};
                        inputObj.comnCVal = i+1
                        inputObj.comnCExpl = (i+1) + "명"

                        this.commList.push(inputObj)
                    }

                } else if(this.gubn == '2') { // 기간

                    // 기간 조회
                    this.fn_getSchdule()

                } else if(this.gubn == '3') { // 장소

                    // 장소 조회
                    this.fn_getPlace()
                }
            },
            fn_getPlace() {
                const config = {
                    url: '/co/co/00r01',
                    data: {
                            "comnCId": "TRV_DSN_C" // 공통코드 ID(여행지)
                            }
                };

                apiService.call(config).then(response => {
                    this.commList = response.comnCList || []
                });
            },
            fn_getSchdule() {
                const config = {
                    url: '/co/co/00r01',
                    data: {
                            "comnCId": "TRV_PRD_DSC" // 공통코드 ID(여행기간)
                            }
                };

                apiService.call(config).then(response => {
                    this.commList = response.comnCList || []
                });
            },
            fn_selectContent(comnCVal) {

                this.selectInfo = _.find(this.commList, {"comnCVal":comnCVal})
                this.selectInfo.gubn = this.gubn

                this.fn_complete()
            },
            fn_complete(){
                this.close(this.selectInfo)
            },
        },

    }

</script>