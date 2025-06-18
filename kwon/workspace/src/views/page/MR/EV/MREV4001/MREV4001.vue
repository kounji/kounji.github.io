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
* 2025-03-26              CS540687             상호금융 NH콕마이데이터 4.0 추진 개발 MREV2001.vue -> MREV4001.vue)
*************************************************************************/
-->
<template>
    <div>
        <!-- 전체 팝업 시작 -->
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup">                
                <div class="popup_content event_pop">
                    <!-- slick -->
                    <div class="event_slick">
                        <div class="cont">
                            <a href="javascript:void(0)" @click="fn_openEventPop(evt)" v-for="(evt, idx) in evtList" :key="idx" :id="'event_'+(idx+1)">
                                <img :src="`/assets/images/event/main/${evt.evtBnnrImgnm}.png`" v-if="evt.evtStsc == '1'" @error="emptyImg" :alt="'이벤트 ' + evt.evtTinm + ' ' + evt.stDt + '~' + evt.edDt">
                                <img :src="`/assets/images/event/main/${evt.evtBnnrImgnm}_win.png`" v-if="evt.evtStsc == '0'" @error="emptyImg" :alt="'이벤트 ' + evt.evtTinm + ' ' + evt.stDt + '~' + evt.edDt">
                            </a>
                        </div>

                        <div class="controls" v-show="evtList.length > 1">
                            <div class="remote">
                                <p class="paging"></p>
                                <button type="button" class="prev"><span class="blind">이전</span></button>
                                <button type="button" class="next"><span class="blind">다음</span></button>
                            </div>
                            <button type="button" title="정지" class="btn_play"></button>
                        </div>
                    </div>
                    <!-- //slick -->
                </div>
				<div class="event_bottom"> <!--[v4.0] 2025-04-10 하단 버튼 추가 -->
                    <button type="button" class="day_close" @click="fn_setExpire()">오늘 하루 닫기</button>
					<button type="button" class="close_btn" @click="close('evtClose')">닫기</button>
                    <!-- <a href="javascript:void(0);" role="button" class="btn_close" @click="close('evtClose')"><span class="">닫기</span></a> -->
				</div>                
                
            </div>
        </div>
        <!--// 전체 팝업 종료 -->        

        <!-- slide popup S -->
        <!-- <div class="dimmed" style="display: block;"></div>
	    <div class="popup_box">
		    <div aria-hidden="false" class="slide_popup">
            <div aria-hidden="false" class="popup_content noneslip" id="slide_popup_02" style="display: block;">
                <div class="tab_cont">
                    <div role="tabpanel" class="cmm-tab-panel" v-for="(evt, idx) in evtList" :key="idx" :id="'event_'+(idx+1)">
                        <a href="javascript:void(0)" @click="fn_openEventPop(evt)" role="button">
                            <img :src="`/assets/images/event/main/${evt.evtBnnrImgnm}`" @error="emptyImg" :alt="'이벤트 ' + evt.evtTinm + ' ' + evt.stDt + '~' + evt.edDt" />
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
        </div> -->
        <!--// slide popup E -->
    </div>
</template>

<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {nextTick} from 'vue'
import {fncSlick, fncSlick_briefing, fncSlick_briefing2} from '@/utils/slick'
// import _ from 'lodash'

import commonService from '@/service/commonService'
import MREV2010 from '@/views/page/MR/EV/MREV2010/MREV2010'
import MREV2011 from '@/views/page/MR/EV/MREV2011/MREV2011'
import MREV2012 from '@/views/page/MR/EV/MREV2012/MREV2012'
import MREV2030 from '@/views/page/MR/EV/MREV2030/MREV2030'
import MREV2031 from '@/views/page/MR/EV/MREV2031/MREV2031'
import MREV2008 from '@/views/page/MR/EV/MREV2008/MREV2008'

export default {
    name: 'MREV4001',
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
    },
    mounted() {
        apiService.pfmLogSend(this.$options.name)
        console.log('evtList : ', this.evtList)
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        
        this.$nextTick(() => {
            if(this.evtList.length > 1) this.slickEvent();
        })
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

            //localStorage.setItem("noSeeEventExp"+this.getUserInfo("chnl"), saveDay)
            commonService.setStorage('noSeeEventExp'+this.getUserInfo('chnl'), saveDay)

            this.close('evtClose')
        },

        fn_openEventPop(evtInfo) {
            if(evtInfo.evtStsc == '1'){
                let component = ''
                let evtComponent;
                    
                if(import.meta.env.VITE_ENV === 'R'){
                    evtComponent = { '1' : 'MREV2010'      //일반(신규가입)
                                    , '4' : 'MREV2030'    //퀴즈(콕마이데이터)
                                    , '10' : 'MREV2011'   //일반(추석 소원)
                                    , '11' : 'MREV2012'   //일반(발렌타인)
                                    , '12' : 'MREV2031'   //퀴즈(600만)
                    }
                }else{
                    evtComponent = { '1' : 'MREV2010'      //일반(신규가입)
                                    , '49' : 'MREV2030'    //퀴즈(콕마이데이터)
                                    , '50' : 'MREV2011'   //일반(추석 소원)
                                    , '51' : 'MREV2012'   //일반(발렌타인)
                                    , '60' : 'MREV2031'   //퀴즈(600만)
                    }
                }
                
                if(evtComponent[evtInfo.mydtEvtSqno] === 'MREV2010'){
                    component = MREV2010
                }else if(evtComponent[evtInfo.mydtEvtSqno] === 'MREV2030'){
                    component = MREV2030
                }else if(evtComponent[evtInfo.mydtEvtSqno] === 'MREV2011'){
                    component = MREV2011
                }else if(evtComponent[evtInfo.mydtEvtSqno] === 'MREV2012'){
                    component = MREV2012
                }else if(evtComponent[evtInfo.mydtEvtSqno] === 'MREV2031'){
                    component = MREV2031
                }else{
                    if(this.getUserInfo('mydtCusno') == "2000006853" && import.meta.env.VITE_ENV != 'R') { // 이벤트 팝업 노출 테스트 케이스: 조하천
                        component = MREV2010
                    } else {
                        modalService.alert('이벤트 준비중')
                        return;
                    }   
                }

                let config = {
                    component : component,
                    params : {'mydtEvtSqno' : evtInfo.mydtEvtSqno}
                }
                
                modalService.openPopup(config).then(() => {});
            }else if(evtInfo.evtStsc == '0'){
              const config = {
                component : MREV2008, // 당첨자 조회
                params : {'mydtEvtSqno' : evtInfo.mydtEvtSqno}
              }

              modalService.openPopup(config).then(() => {});
            }
        },
        emptyImg(e) {
            e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
        },
	
		slickEvent () {            
            console.log("slickEventslickEventslickEventslickEventslickEventslickEventslickEventslickEvent")

			var $event =  $(".event_slick .cont");
			$event.on('init reInit afterChange', function(event, slick, currentSlide){
				var i = (currentSlide ? currentSlide : 0) + 1;
				$(".event_slick .paging").html('<em>' + i + '</em> / ' + slick.slideCount);
			});

			$event.slick({
				draggable: true,
				adaptiveHeight: true,
				accessibility:true,
				infinite: true,
				cssEase:'linear',
				autoplay:true,
				speed : 300,
				dots : false,
				arrows : true,
				prevArrow:$(".remote .prev"),
				nextArrow:$(".remote .next")
			});
			
			const constrols  = $(".event_slick .btn_play");
			
			constrols.click(function(){
				if($(this).hasClass('paused')){//정지상태
					$event.slick('slickPlay');
					$(this).removeClass('paused');
					$(this).attr('title', '정지');
				}else{//자동재생 중
					$event.slick('slickPause');
					$(this).addClass('paused');
					$(this).attr('title', '재생');
				}
			});
		}      
    },
    components: {      
        
    },
}

</script>