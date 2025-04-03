<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 정책자금 > 농업정책자금
* @ 페이지설명 : 마이농가 > 정책자금 > 농업정책자금
* @ 파일명     : src/views/page/SZ/PC/SZPC2118/SZPC2118.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-06-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-01              CS516033              최초작성
*************************************************************************/
-->
<template>
    <div>
        <div class="dimmed" style="display:block;" v-on:click.prevent="close()"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <div class="popup_header">
                    <h1>{{infoTitl}}</h1>          
                </div>
                <div class="popup_content">				
                    <strong class="tit">{{infoSubTitl}}이란 ?</strong>
                    <p class="txt_cont" v-html="infoCn"></p>							
                </div>
                <a href="javascript:void(0);" v-on:click.prevent="close()" class="btn_close"><span class="">닫기</span></a>
            </div>
        </div>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'

    export default {
        name : "SZPC2118",
        data: () => {
            return {
                infoTitl : "",   // 도움말 타이틀
                infoSubTitl : "",   // 도움말 서브 타이틀
                infoCn : "",    // 도움말 내용
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                this.infoTitl = param.infoTitl
                this.infoSubTitl = param.infoSubTitl
                this.infoCn = param.infoCn
            }
        }
    }
</script>