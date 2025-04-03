<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 차계부
* @ 페이지설명 : 금융과생활 > 차계부 > 자동차 선택
* @ 파일명     : src\views\page\PD\CA\PDCA1115\PDCA1115.vue
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
                <h1>자동차 선택</h1>
            </div>
            <div class="popup_content">
                <div class="com_txt_type02">
                    <ul class="com_radio_type01 style03">
                        <li v-for="(hldVhcInfo, index) in hldVhcList" :key="index">
                            <span class="btn_radio">
                                <input type="radio" name="PDCA1115" :id="'PDCA1115_' + hldVhcInfo.vhcnoVal" @click="()=>fn_selectContent(hldVhcInfo.vhcnoVal)" :checked="vhcnoVal == hldVhcInfo.vhcnoVal ? true : false">
                                <label :for="'PDCA1115_' + hldVhcInfo.vhcnoVal">
                                    <span>{{hldVhcInfo.carBrannm}} {{hldVhcInfo.carCrtpnm}}<br>{{hldVhcInfo.carGrdnm}}<br>{{hldVhcInfo.vhcnoVal}}</span>
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
        name : "PDCA1115",
        props: {

        },
        data: () => {
            return {
                hldVhcList:[],  // 자동차정보
                hldVhcCcn:0,  // 자동차정보
                selectInfo:{}, // 선택정보
                vhcnoVal:""
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

                this.fn_carList()

                this.vhcnoVal = params.val || ''
            },
            fn_selectContent(vhcnoVal) {

                this.selectInfo = _.find(this.hldVhcList, {"vhcnoVal":vhcnoVal})

                this.fn_complete()
            },
            fn_complete(){
                this.close(this.selectInfo)
            },
            fn_carList() {
                const config = {
                    url: '/pd/ca/14r01',
                    data: {
                            "mydtCusno": this.getUserInfo('mydtCusno') // 마이데이터고객번호
                        }
                };
                
                apiService.call(config).then(response => {

                    this.hldVhcCcn  = response.hldVhcCcn  || 0
                    this.hldVhcList = response.hldVhcList || []
                });
            },
        },
    }

</script>