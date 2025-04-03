<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > 도움말(이벤트) > 이벤트 > 당첨자 발표 목록
* @ 페이지설명 : 당첨자 발표 목록
* @ 파일명     : src/views/page/MR/EV/MREV2007/MREV2007.vue
* @ 작성자     : CS533461
* @ 작성일     : 2023-10-19
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2023-10-19              CS533461              최초작성 (웰컴 이벤트)
* 2024-02-22              CS530689              이벤트 당첨자 발표 목록
*************************************************************************/
-->
<template>
	<div id="content" class="renewal event_wrap">
		<!-- 리스트 -->
		<ul class="list_type_03" v-if="eventList.length > 0">
			<li v-for="(event, index) in eventList" :key="index" :id="'event_'+(index+1)">
				<a href="javascript:void(0);" @click="fn_detail(event.mydtEvtSqno)">
					<div><em>{{event.evtTinm}}</em></div>
					<span>{{event.stDt | dateFilter('YYYY.MM.DD')}} ~ {{event.edDt | dateFilter('YYYY.MM.DD')}}</span>
				</a>
			</li>
		</ul>
		<!--// 리스트 -->

		<!-- 조회내역이 없을경우 S -->
		<div class="no_data_box" v-else-if="eventList.length == 0">
			<div class="no_data_list">
				<p>당첨자 발표중인 이벤트가 없습니다.</p>
			</div>
		</div>

        <a href="javascript:void(0);" @click="getData()" class="com_btn_more" :style="btnOnOff">더보기</a>
		<!--// 조회내역이 없을경우 E -->
	</div>
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
// import commonService from '@/service/commonService'

import MREV2008 from '@/views/page/MR/EV/MREV2008/MREV2008'


export default {
    name : "MREV2007",
    data: () => {
        return {
			eventList : [], 
            evtStsc : '0',  //전체 : 2 / 진행중 : 1 / 종료 : 0
            pageNo : 10,  // 10개씩 call
            moreBtnShow : true   //  더보기 버튼 노출여부
        }
    },
	computed: {
        btnOnOff() {
            return this.moreBtnShow ? "display:block" : "display:none"
        },
    },
    mounted() {
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        initComponent() {
            this.getData()
        },
        //이벤트 정보조회
        getData() {
			const config = {
                url: '/mr/ev/12r01', 
                data: {
                    "evtStsc" : this.evtStsc,
                    "pageNo" : this.pageNo,
                    "isGetWinner" : "1",
                },
            }
            apiService.call(config).then(response =>{
                if(this.eventList.length === response.evtList.length || response.evtList.length < 10){
                    this.moreBtnShow = false
                }
                
                console.log('response.evtList : ', response.evtList)
                this.eventList = response.evtList
                this.pageNo += 10
            })
		},
		fn_detail(sqno){
			const config = {
					component : MREV2008, // 당첨자 조회
					params : {'mydtEvtSqno' : sqno}
				}

			modalService.openPopup(config).then(() => {});
		},
	},
    components : {

    },
    destroyed() {
    }
}

</script>