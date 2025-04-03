<!--
/*************************************************************************
* @ 서비스경로 : 자산관리 서비스 가입 > 서비스 가입 필요
* @ 페이지설명 : 서비스 가입 필요
* @ 파일명     : src/views/page/CO/AS/COAS4015/COAS4015.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-20
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-20              CS541597              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- alert pupop S -->
        <div class="dimmed" style="display:block;"></div>	
        <div class="center_popup" id="center_popup" style="display:block;"> <!-- 개발시 style="display:block;" 제거 -->
            <div class="popup_content">
                <div class="cok_desc">
                    <p class="tit">선택하신 서비스 이용을 위해<br><em>서비스 가입</em>이 필요해요.</p><!-- [v4.0] 25-02-10 문구 수정 -->
                    <p class="txt">한눈에 보는 나의 금융생활<br>자산현황, 소비습관을 쉽게 알려드려요.</p>
                </div>
            </div>
            <div class="popup_footer">
                <div class="btns_wrap">
                    <button type="button" class="btns lg" @click.prevent="close('N')">다음에</button>
                    <button type="button" class="btns lg primary" @click.prevent="close('Y')">서비스 가입</button>
                </div>
            </div>
        </div>
        <!--// alert popup E -->
    </div>
</template>

<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import appService from '@/service/appService'

export default {
    name: 'COAS4015',
    data: () => {
        return {
            
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
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: { 
        initComponent() {
            this.getData()
        },
        getData() {
            
        },

    },
    components: {      
        
    },
}
    
</script>