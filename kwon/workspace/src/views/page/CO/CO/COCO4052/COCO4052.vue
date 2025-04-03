<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 서브메인 플로팅 배너 닫기 팝업
* @ 페이지설명 : 서브메인 플로팅 배너 닫기 팝업
* @ 파일명     : src\views\page\CO\CO\COCO4052\COCO4052.vue
* @ 작성자     : CS541015
* @ 작성일     : 2025-03-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-18              CS541015              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                   <h1 class="blind">금융TIP</h1> 
                </div>

                <div class="popup_content">
                    <div class="finance_tip">
                        <p>금융 TIP, 앱에 다시 들어오시면<br>확인할 수 있어요.</p>
                    </div>
                </div>

                <div class="popup_footer fixed">
                    <div class="btns_wrap half">
                        <button type="button" class="btns lg gray" @click.prevent="fn_setExpire('W')">일주일 닫기</button>
                        <button type="button" class="btns lg primary" @click.prevent="fn_setExpire('D')">오늘 닫기</button>
                    </div>
                </div>

                <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name: 'COCO4052',
    data: () => {
        return {
            bnnrDsc : '',
        }
    },
    computed: {
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    created() {
        
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: { 
        initComponent(param){
            this.bnnrDsc = param.bnnrDsc
            console.log("배너구분 : ", this.bnnrDsc);
        },
        fn_setExpire(day) {
            if(this.bnnrDsc == 'I'){
                this.setNoSeeFloat(day, "I")
            } else {
                this.setNoSeeFloat(day)
            }
            this.close('bnrClose')
        },
        
    },
    components: {      
        
    },
}
    
</script>