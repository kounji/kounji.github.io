<!--
/*************************************************************************
* @ 서비스경로 : 메인 > 시스템 점검 안내 슬라이드
* @ 페이지설명 : 시스템 점검 슬라이드
* @ 파일명     : src/views/page/MR/ST/STCK2001/STCK2001.vue
* @ 작성자     : CS530689
* @ 작성일     : 2023-11-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-11-13             CS530689              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_content com_no_top stop_noti" style="border-bottom:1px solid #ddd">
                    <strong>시스템 점검 안내</strong>
                    <p>
                        통신장비 교체로 인해 아래 기간동안 접속이 <br>원활하지 않을 수 있습니다.<br>서비스 이용에 불편을 드려 죄송합니다.
                        <span>점검일시<em>2023년 11월 16일(목) 22:00 ~ 01:00</em></span>
                    </p>
                </div>
            
                <div class="welcomeback_event_close">
                    <p class="noview">
                        <span class="btn_checkbox02">
                            <input type="checkbox" name="check01" id="check01" @click="fn_setExpire()">
                            <label for="check01">
                                <span>오늘 하루 닫기</span>
                            </label>
                        </span>
                    </p>
                    
                    <a href="javascript:void(0);" role="button" class="btn_close" @click="close('evtClose')"><span class="">닫기</span></a>
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
    name: 'MREV2001',
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

        // 하루동안 보지않기 설정
        fn_setExpire() {
            const today = new Date();
            const saveDay = today.getDate();

            localStorage.setItem("noSeeFixed"+this.getUserInfo("chnl"), saveDay)

            this.close('evtClose')
        }
        
    },
    components: {      
        
    },
}

</script>