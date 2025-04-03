<!--
/*************************************************************************
* @ 서비스경로 : 부동산/관심부동산 등록 > 이벤트 응모 확인 슬라이드
* @ 페이지설명 : 이벤트 응모 확인 슬라이드
* @ 파일명     : src/views/page/CO/ET/COET1002/COET1002.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-09-07
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-07              CS528069              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_content com_btn_bottom event_page">
                    <span class="img">
                        <img src="../../../../../assets/images/event/img_event_point.png" alt="이벤트 이미지">
                    </span>
                    <strong class="event_tit">NH콕부동산 오픈 이벤트 응모하고</strong>
                    <p class="event_point_txt">
                        NH포인트 
                        <strong class="com_point_darkblue">10,000P</strong>
                        받으세요!
                    </p>
                    <p class="event_day">
                        기간
                        <strong>2022.09.29 ~ 2022.10.31</strong>
                    </p>
                </div>
                <div class="popup_footer">
                    <div class="com_btnhalfbox_type02">
                        <a href="javascript:void(0);" role="button" class="btn btn_mint_gray" @click="close('evtNo')">안할래요</a>
                        <a href="javascript:void(0);" role="button" class="btn btn_mint" @click="close('evtYes')">응모하기</a>
                    </div>
                </div>
                
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import apiService from '@/service/apiService'
// import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'


export default {
    name: 'COET1002',
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
            
        },
        getData() {
        },

        
        
    },
    components: {      
        
    },
}

</script>