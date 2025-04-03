<!--
/*************************************************************************
* @ 서비스경로 : 신규 서비스 안내
* @ 페이지설명 : 신규 서비스 안내
* @ 파일명     : src/views/page/MA/MA/open_full_event/open_full_event.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-11-07
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2022-11-07              CS528069              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal reopen_info" id="full_popup_01">
		<div class="popup_header">
			<h1 class="blind">NH콕마이데이터 서비스 개편 안내</h1>
			
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="event_info">
				<img src="@/assets/images/event/open_info.png" alt="NH콕마이데이터 서비스가 새롭게 바뀌었어요">
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click="close('goNewInfo')">이런 서비스가 더 생겼어요!</a>
			</div>
		</div>
		<div class="ipt_wrap sub_bk">
			<input type="checkbox" name="noSeeNewInfoChk" id="noSeeNewInfoChk" @click="fn_setExpireInfo()">
			<label for="noSeeNewInfoChk">
				<span>오늘하루 닫기</span>
			</label>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click="close()" style="z-index:9999"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import {mapActions} from 'vuex'

export default {
    name : "open_full_event",
    data: () => {
        return {
            
        }
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        initComponent(param = {}) {
            console.log(param)

            this.getData()
        },

        getData() {
            
		},

		// 하루동안 보지않기 설정
        fn_setExpireInfo() {
            const today = new Date();
            const saveDay = today.getDate();

            localStorage.setItem("noSeeNewInfo"+this.getUserInfo("chnl"), saveDay)

            this.close('evtClose')
        },
    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>