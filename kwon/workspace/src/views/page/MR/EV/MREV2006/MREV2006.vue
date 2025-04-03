<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > 도움말(이벤트) > 이벤트 > 이벤트 현황 > 이벤트 목록
* @ 페이지설명 : 이벤트 목록
* @ 파일명     : src/views/page/MR/EV/MREV2006/MREV2006.vue
* @ 작성자     : CS533461
* @ 작성일     : 2023-10-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-10-18              CS533461             최초작성 ( 웰컴백 이벤트)
* 2024-02-21              CS530689             이벤트 수정 ( 함께해용 이벤트)
* 2024-02-22              CS530689             이벤트 목록
*************************************************************************/
-->
<template>
    <div>
        <div class="lnb">
            <ul role="tablist">
                <li :class="evtStsc == '2' ? 'on' : ''" @click="getData('2')"><a href="javascript:void(0);">전체</a></li>
                <li :class="evtStsc == '1' ? 'on' : ''" @click="getData('1')"><a href="javascript:void(0);">진행중</a></li>
                <li :class="evtStsc == '0' ? 'on' : ''" @click="getData('0')"><a href="javascript:void(0);">종료</a></li>
            </ul>
        </div>

        <div id="content" class="renewal event_wrap">
            <div class="com_inner" v-if="eventList.length > 0">
                <div class="event_list" v-for="(event, index) in eventList" :key="index" :id="'event_'+(index+1)" >
                    <p>
                        <a href="javascript:void(0);" @click="fn_detail(event.mydtEvtSqno, event.evtTpc, event.evtStsc)">
                            <img :src="`/assets/images/event/banner/${event.evtBnnrImgnm}`" @error="emptyImg" :alt="event.evtTinm">
                        </a>
                    </p>
                    <div>										
                        <a href="javascript:void(0);" @click="fn_detail(event.mydtEvtSqno, event.evtTpc, event.evtStsc)">
                            <span :class="event.uyn == '0' ? 'unuse' : event.evtStsc == '1' ? 'ing' : event.evtStsc == '3' ? 'pre' : 'end'">
                                {{event.uyn == '0' ? '미사용' : event.evtStsc == '1' ? '진행중' : event.evtStsc == '3' ? '준비중' : '종료'}}
                            </span> {{event.evtTinm}}
                        </a>
                        <p>{{event.stDt | dateFilter('YYYY.MM.DD')}} ~ {{event.edDt | dateFilter('YYYY.MM.DD')}}</p>
                    </div>
                </div>
            </div>

            <div class="popup_footer fixed">
                <div class="btn_full_box"><a href="javascript:void(0);" @click="getData(evtStsc)" class="com_btn_more wPc100" :style="btnOnOff">더보기</a></div>
            </div>
            <!-- 조회내역이 없을경우 S -->
            <div class="no_data_box" v-if="eventList.length == 0">
                <div class="no_data_list">
                    <p>게시된 이벤트가 없습니다.</p>
                </div>
            </div>
            <!--// 조회내역이 없을경우 E -->
        </div>
    </div>
</template>
<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
// import {keyupNumFormat} from '@/utils/number' 
// import {checkWord} from '@/utils/data'

import MREV2010 from '@/views/page/MR/EV/MREV2010/MREV2010'
import MREV2011 from '@/views/page/MR/EV/MREV2011/MREV2011'
// import MREV2020 from '@/views/page/MR/EV/MREV2020/MREV2020'
import MREV2030 from '@/views/page/MR/EV/MREV2030/MREV2030'
// import MREV2040 from '@/viewsdm/page/MR/EV/MREV2040/MREV2040'

export default {
    name : "MREV2006",
    data: () => {
        return {
            eventList : [], 
            evtStsc : '2',  //전체 : 2 / 진행중 : 1 / 종료 : 0
            pageNo : 5,  // 5개씩 call
            moreBtnShow : true,   //  더보기 버튼 노출여부
        }
    },
    computed: {
        btnOnOff() {
            return this.moreBtnShow ? "display:block" : "display:none"
        },
        
    },
    created: () => {
        
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        console.log('import.meta.env.VITE_ENV :::', import.meta.env.VITE_ENV)
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    methods: {
        initComponent(){
            this.getData('2')   //전체 조회
        },
        getData(evtStsc){
            if(this.evtStsc != evtStsc){
                this.pageNo = 5
                this.evtStsc = evtStsc
                this.eventList = []
                this.moreBtnShow = true
            }

            const config = {
                url: '/mr/ev/12r01', 
                data: {
                    "evtStsc" : this.evtStsc,
                    "pageNo" : this.pageNo,
                    "isGetWinner" : "0",
                },
            }
            apiService.call(config).then(response =>{
                if(this.eventList.length === response.evtList.length || response.evtList.length < 5){
                    this.moreBtnShow = false
                }
                
                console.log('response.evtList : ', response.evtList)
                this.eventList = response.evtList
                this.pageNo += 5
            })
        },
        fn_detail(sqno, evtTpc, evtStsc){
            if(evtStsc != 0){
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

                if(evtComponent[sqno] === 'MREV2010'){
                    component = MREV2010
                }else if(evtComponent[sqno] === 'MREV2030'){
                    component = MREV2030
                }else if(evtComponent[sqno] === 'MREV2011'){
                    component = MREV2011
                }else{
                    modalService.alert('이벤트 준비중')
                    return;
                }

                let config = {
                    component : component,
                    params : {'mydtEvtSqno' : sqno}
                }

                modalService.openPopup(config).then(() => {});
            }
        },
        emptyImg(e) {
            e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
        },
        closePage(){
            this.close()
        },
    },
}
</script>