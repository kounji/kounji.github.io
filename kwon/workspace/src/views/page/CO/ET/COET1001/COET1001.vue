<!--
/*************************************************************************
* @ 서비스경로 : 메인 > 부동산 이벤트 안내 슬라이드
* @ 페이지설명 : 부동산 이벤트 안내 슬라이드
* @ 파일명     : src/views/page/CO/ET/COET1001/COET1001.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-09-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-13              CS528069              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal com_round">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_content event_banner02">
                    <!-- <img src="../../../../../assets/images/event/img_event_banner.png" alt="제휴서비스 오픈 이벤트 - NH콕부동산, NH콕마이카 이용하고 NH포인트 10,000P 10만원 주유상품권도 얻으세요 기간 : 2022.09.29 ~ 2022.10.31"> -->
                    <div class="img">
                        <img src="@/assets/images/event/event_txt.png" alt="NH콕마이데이터 리뉴얼 기념이벤트 - 새로운 자산관리 경험하고 응모하면 NH멤버스 30,000포인트를 드려요! 2022.11.14 ~ 2022.12.02">
                    </div>
                    <a href="javascript:void(0);" role="button" class="com_btn_round btn_event" @click="fn_regEvent()">이벤트 응모</a>
                </div>
                <p class="noview">
                    <span class="btn_checkbox02">
                        <input type="checkbox" name="check01" id="check_coet1001" @click="fn_setExpire()">
                        <label for="check_coet1001">
                            <span>오늘하루 닫기</span>
                        </label>
                    </span>
                </p>
                
                <a href="javascript:void(0);" role="button" class="btn_close event" @click="close('evtClose')"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import commonService from '@/service/commonService'
import {dayDiff} from '@/utils/date'

import COET1003 from '@/views/page/CO/ET/COET1003/COET1003'
import COCO1104 from '@/views/page/CO/CO/COCO1104/COCO1104'
import open_full_event from '@/views/page/MA/MA/open_full_event/open_full_event'

export default {
    name: 'COET1001',
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
            const today = new Date()
            const savedDate = today.getDate()
            ////////////////////////////////// 22.11.07 추가 부분 //////////////////////////////////
            if(dayDiff("20221121", today) > 0) {
                if(commonService.getStorage('noSeeNewInfo'+this.getUserInfo('chnl')) !== savedDate) {
                    const config_info = {
                        component : open_full_event,
                    }
                    config_info.renderer = this.modalConfig.renderer
                    modalService.openPopup(config_info).then(response => {
                        if(response === "goNewInfo") {
                            // this.close()

                            const config_COCO1104 = {
                                component : COCO1104,
                                params : {
                                    selSeq : "true"
                                }
                            }
                            config_COCO1104.renderer = this.modalConfig.renderer
                            modalService.openPopup(config_COCO1104)
                        }
                    })
                }
            }
            ////////////////////////////////// 22.11.07 추가 부분 //////////////////////////////////

        },

        // 하루동안 보지않기 설정
        fn_setExpire() {
            const today = new Date();
            const saveDay = today.getDate();

            localStorage.setItem("noSeeEventExp"+this.getUserInfo("chnl"), saveDay)

            this.close('evtClose')
        },

        fn_regEvent() {
            const config = {
                component : COET1003,
            }
            config.renderer = this.modalConfig.renderer
            modalService.openPopup(config).then()
        },

        // '바로가기' 클릭 페이지 이동
        // fn_movePage(dsc) {
        //     let component = ""
        //     switch(dsc) {
        //         case 'RE' :
        //             component = "ANRE1001"
        //             break;
        //         case 'CA' :
        //             component = "ANCA1001"
        //             break;
        //         default : break
        //     }

        //     this.close()

        //     const menu = {
        //         name: component,
        //     }
        //     commonService.movePage(menu)
        // }
        
        
    },
    components: {      
        
    },
}

</script>