<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표 > 버킷리스트
* @ 페이지설명 : 금융과생활 > 나의목표 > 버킷리스트 > 버킷리스트-자동차모델 선택 팝업
* @ 파일명     : src/views/page/PD/MY/PDMY2049/PDMY2049.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-08-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-24              CS516029                 최초작성
* 2022-09-21              CS528061                 고도화 개발
* 2023-08-04              CS533453              고도화 파일명 변경(PDMY1120.vue -> PDMY2049.vue)
*************************************************************************/
-->
<template>
<div>
    <div class="dimmed" style="display:block;" @click="close()"></div>
    <div class="popup_box renewal">
        <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
            <div class="popup_header">
                <h1>모델 선택</h1>
            </div>
            <div class="popup_content">
                <div class="com_txt_type02">
                    <ul class="com_radio_type01 style03">
                        <li v-for="(gradeInfo, index) in gradeList" :key="index">
                            <span class="btn_radio">
                                <input type="radio" name="PDMY2049" :id="'PDMY2049_' + gradeInfo.carCtrimNo + gradeInfo.basyy + gradeInfo.basmm" @click="()=>fn_selectContent(gradeInfo.carCtrimNo)" :checked="carCtrimNo == gradeInfo.carCtrimNo ? true : false">
                                <label :for="'PDMY2049_' + gradeInfo.carCtrimNo + gradeInfo.basyy + gradeInfo.basmm">
                                    <span>{{gradeInfo.carLineupNm.concat(' ', gradeInfo.carCtrimNm)}} ({{gradeInfo.basyy + '' + gradeInfo.basmm | dateFilter('YYYY.MM')}})</span>
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
        name : "PDMY2049",
        props: {

        },
        data: () => {
            return {
                gradeList  : [], // 신차등급목록
                selectInfo : {}, // 선택정보
                carCtrimNo : "", // 자동차트림번호
                basyy      : "", // 기준년도
                basmm      : "", // 기준년월
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
                this.gradeList  = params.gradeList   || [] // 신차등급목록
                this.carCtrimNo = params.carCtrimNo  || ''
                // this.basyy      = params.basyy       || ''
                // this.basmm      = params.basmm       || ''
            },
            fn_selectContent(carCtrimNo) { // , basyy, basmm
                console.log("실행됨")

                this.selectInfo = _.find(this.gradeList, {"carCtrimNo":carCtrimNo})
                //this.selectInfo = _.find(this.gradeList, {"carCtrimNo":carCtrimNo, "basyy":basyy, "basmm":basmm})

                this.fn_complete()
            },
            fn_complete(){
                this.close(this.selectInfo)
            },
        },
    }

</script>