<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 예금 > IRP상세 > 개별상품
* @ 페이지설명 : 나의자산 > 예금 > IRP상세 > 개별상품
* @ 파일명     : src/views/page/AS/AC/ASAC1108/ASAC1108.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-21              CS515729                 최초작성
*************************************************************************/
-->
<template>
    <div>
        <div class="dimmed" style="display: block;" @click="close()"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header fund">
                    <h1>{{irpDtlInfo.acWrsnm}}</h1>          
                </div>
                <div class="popup_content">
                    <div class="com_txt_type03">
                        <div class="com_box_type01 poptype01">
                            <dl class="com_txtlist_type01">
                                <dt>평가금액</dt>
                                <dd>
                                    <span class="com_number01">{{irpDtlInfo.acEvlam | numberFilter}}</span>   
                                    <em>원</em> 
                                </dd>
                            </dl>
                            <dl class="com_txtlist_type01">
                                <dt>투자원금</dt>
                                <dd>
                                    <span class="com_number01">{{irpDtlInfo.irpIvOgnAm | numberFilter}}</span>   
                                    <em>원</em> 
                                </dd>
                            </dl>
                        </div>

                        <dl>
                            <dt>보유좌수</dt>
                            <dd>
                                <span class="com_number01">{{irpDtlInfo.mydtHldAcn | numberFilter}}</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>신규일</dt>
                            <dd>
                                <span class="com_number01">{{irpDtlInfo.anwDt | dateFilter("YYYY.MM.DD")}}</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>만기일</dt>
                            <dd>
                                <span class="com_number01">{{irpDtlInfo.dueDt | dateFilter("YYYY.MM.DD")}}</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>약정이자율</dt>
                            <dd>
                                <span class="com_number01">{{irpDtlInfo.pmiIntrt | numberFilter('0,0.00', {precision: 2}) }}%</span>
                            </dd>
                        </dl>
                    </div>
                </div>
                
                <a href="javascript:void(0);" @click="close()" class="btn_close"><span class="">닫기</span></a>
            </div>
        </div>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'

    export default {
        name : "ASAC1108",
        data: () => {
            return {
                irpDtlInfo : {} //전달파라미터
            }	
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        mounted() {
            this.irpDtlInfo = this.params.irpDtlInfo    //전달받은 파라미터
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {

        }
    }
</script>