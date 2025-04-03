<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 차계부
* @ 페이지설명 : 금융과생활 > 차계부 > 결제수단 선택
* @ 파일명     : src\views\page\PD\CA\PDCA1119\PDCA1119.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-09-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-09-17              CS516029                 최초작성
*************************************************************************/
-->
<template>
<div>
    <div class="dimmed" style="display:block;" @click="close()"></div>
    <div class="popup_box">
        <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
            <div class="popup_header">
                <h1>결제수단 선택</h1>
            </div>
            <div class="popup_content">
                <div class="com_txt_type02">
                    <ul class="com_radio_type01">
                        <li v-for="(stlMnsDscInfo, index) in stlMnsDscList" :key="index">
                            <span class="btn_radio">
                                <input type="radio" name="PDCA1119" :id="'PDCA1119_' + stlMnsDscInfo.stlMnsDsc" @click="()=>fn_selectContent(stlMnsDscInfo.stlMnsDsc)" :checked="stlMnsDsc == stlMnsDscInfo.stlMnsDsc ? true : false">
								<label :for="'PDCA1119_' + stlMnsDscInfo.stlMnsDsc">
									<span>{{stlMnsDscInfo.stlMnsDsNm}}</span>
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
        name : "PDCA1119",
        props: {

        },
        data: () => {
            return {
                stlMnsDscList:[], // 결제수단 목록
                selectInfo:{},    // 선택정보
                stlMnsDsc:"",
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

                this.fn_getStlMnsDscList()

                this.stlMnsDsc = params.val || ''
            },
            fn_selectContent(stlMnsDsc) {

                this.selectInfo = _.find(this.stlMnsDscList, {"stlMnsDsc":stlMnsDsc})

                this.fn_complete()
            },
            fn_getStlMnsDscList() {
                
                let input1 = {}
                input1.stlMnsDsc  = '9'
                input1.stlMnsDsNm = '전체'

                let input2 = {}
                input2.stlMnsDsc  = '1'
                input2.stlMnsDsNm = '카드'

                let input3 = {}
                input3.stlMnsDsc  = '2'
                input3.stlMnsDsNm = '선불'

                let input4 = {}
                input4.stlMnsDsc  = '3'
                input4.stlMnsDsNm = '현금'

                this.stlMnsDscList.push(input1)
                this.stlMnsDscList.push(input2)
                this.stlMnsDscList.push(input3)
                this.stlMnsDscList.push(input4)
            },
            fn_complete(){
                this.close(this.selectInfo)
            },
        },
    }

</script>