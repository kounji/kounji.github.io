<!--
/*************************************************************************
* @ 서비스경로 : 메인 > 이벤트 안내 슬라이드
* @ 페이지설명 : 이벤트 안내 슬라이드
* @ 파일명     : src/views/page/MR/EV/MREV1001/MREV1001.vue
* @ 작성자     : CS533461
* @ 작성일     : 2023-10-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-10-18              CS533461             최초작성 ( 웰컴백 이벤트)
* 2024-02-21              CS530689             이벤트 수정 ( 함께해용 이벤트)
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal mydata2023">
            <div aria-hidden="false" class="popup_content noneslip" id="slide_popup_02" style="display: block;">
                <div class="tab_cont">
                    <div role="tabpanel" class="cmm-tab-panel" v-for="(evt, idx) in evtList" :key="idx" :id="'event_'+(idx+1)">
                        <a href="javascript:void(0)" @click="fn_openEventPop(evt)" role="button">
                            <img :src="`/assets/images/event/main/${evt.evtBnnrImgnm}`" @error="emptyImg" :alt="evt.evtTinm">
                        </a>
                    </div>
                </div>
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
        <!--// slide popup E -->
    </div>
</template>

<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {fncSlick} from '@/utils/slick'
// import _ from 'lodash'

import MREV2010 from '@/views/page/MR/EV/MREV2010/MREV2010'
import MREV2011 from '@/views/page/MR/EV/MREV2011/MREV2011'
// import MREV2020 from '@/views/page/MR/EV/MREV2020/MREV2020'
import MREV2030 from '@/views/page/MR/EV/MREV2030/MREV2030'
// import MREV2040 from '@/views/page/MR/EV/MREV2040/MREV2040'

export default {
    name: 'MREV2001',
    data: () => {
        return {
            evtList : [],
        }
    },
    computed: {
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    created() {
        this.evtList = this.params
        fncSlick()
    },
    mounted() {
        console.log('evtList : ', this.evtList)
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

            localStorage.setItem("noSeeEventExp"+this.getUserInfo("chnl"), saveDay)

            this.close('evtClose')
        },

        fn_openEventPop(evtInfo) {
            let component = ''
            let evtComponent;
                
            if(import.meta.env.VITE_ENV === 'R'){
                evtComponent = { '1' : 'MREV2010'      //일반(신규가입)
                                , '4' : 'MREV2030'    //퀴즈(콕마이데이터)
                                , '10' : 'MREV2011'   //일반(추석 소원)
                }
            }else{
                evtComponent = { '1' : 'MREV2010'      //일반(신규가입)
                                , '49' : 'MREV2030'    //퀴즈(콕마이데이터)
                                , '50' : 'MREV2011'   //일반(추석 소원)
                }
            }
            
            if(evtComponent[evtInfo.mydtEvtSqno] === 'MREV2010'){
                component = MREV2010
            }else if(evtComponent[evtInfo.mydtEvtSqno] === 'MREV2030'){
                component = MREV2030
            }else if(evtComponent[evtInfo.mydtEvtSqno] === 'MREV2011'){
                component = MREV2011
            }else{
                modalService.alert('이벤트 준비중')
                return;
            }

            let config = {
                component : component,
                params : {'mydtEvtSqno' : evtInfo.mydtEvtSqno}
            }
            
            modalService.openPopup(config).then(() => {});
        },
        emptyImg(e) {
            e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
        },
    },
    components: {      
        
    },
}

</script>