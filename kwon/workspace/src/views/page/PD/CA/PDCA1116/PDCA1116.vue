<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 차계부
* @ 페이지설명 : 금융과생활 > 차계부 > 카테고리 선택
* @ 파일명     : src\views\page\PD\CA\PDCA1116\PDCA1116.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-08-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-24              CS516029                 최초작성
*************************************************************************/
-->
<template>
<div>
    <div class="dimmed" style="display:block;" @click="close()"></div>
    <div class="popup_box">
        <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
            <div class="popup_header">
                <h1>카테고리 선택</h1>
            </div>
            <div class="popup_content">
                <div class="com_txt_type02">
                    <ul class="com_slide_check_type03">
                        <li v-for="(carbkCtgrInfo, index) in carbkCtgrList" :key="index">
                            <div class="btn_chk">
                                <input type="radio" name="PDCA1116" :id="'PDCA1116_' + carbkCtgrInfo.carbkCtgrId" @click="()=>fn_selectContent(carbkCtgrInfo.carbkCtgrId)" :checked="carbkCtgrId == carbkCtgrInfo.carbkCtgrId ? true : false">
								<label :for="'PDCA1116_' + carbkCtgrInfo.carbkCtgrId">
									<i :class="carbkCtgrInfo.carbkCtgrId"><span class="blind">{{carbkCtgrInfo.carbkCtgrnm}}</span></i>
									<span>{{carbkCtgrInfo.carbkCtgrnm}}</span>
								</label>
                            </div>
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
        name : "PDCA1116",
        props: {

        },
        data: () => {
            return {
                carbkCtgrList:[],  // 카테고리
                selectInfo:{}, // 선택정보
                carbkCtgrId:"",
                ctgrCn:0
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

                this.fn_getCarCategory()

                this.carbkCtgrId   = params.val || ''
            },
            fn_selectContent(carbkCtgrId) {

                this.selectInfo = _.find(this.carbkCtgrList, {"carbkCtgrId":carbkCtgrId})

                this.fn_complete()
            },
            fn_getCarCategory() {
                const config = {

                    url: '/pd/ca/16r01',
                    data: {
                        asetCtgrLclc : '3', // 자산카테고리대분류코드
                    }
                };
                
                apiService.call(config).then(response => {
                    this.ctgrCn        = response.ctgrCn
                    this.carbkCtgrList = response.carbkCtgrList || []
                });
            },
            fn_complete(){
                this.close(this.selectInfo)
            },
        },
    }

</script>