<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 서비스장애 (AS-IS PGCO0301)
* @ 파일명     : src/views/page/CO/CO/COCO1126/COCO1126.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-18             CS515729                 최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1></h1>
		</div>

		<div class="popup_content com_bg_type00">
      <div class="secede_box com_bg_type00">
				<p class="txt com_service">서비스 이용에 불편을 드려 죄송합니다.<br>잠시 후 다시 이용해주세요.</p>
				<p class="txt_sub">[ 시스템 점검시간 ]</p>
        <p class="txt_sub">	00:00 ~ 00:15 </p>
			</div>  
		</div>
		
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" v-on:click.prevent="move()">확인</a>
			</div>
		</div>

		<a class="btn_close" style="display:none;"><span class="blind">팝업닫기</span></a>
		
	</div>
	<!--// full popup E -->  
</template>

<script>
import appService from '@/service/appService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import _ from 'lodash'

export default {
  name: 'COCO1126',
	computed: {
      errorInfo() {
          const response = this.routeParams.response || {}
          const data = response.data || {}
          return _.first((data.rspMsg || [])) || {}
      },
      errorCode() {
          return this.errorInfo.rspMsgC
      },
      errorMessage() {
          return this.errorInfo.rspMsgCntn
      },
	},
  data: () => {
    return {
    }
  },
  mounted() {
    //PFM로그 처리 화면접속이력 등록 POST
    apiService.pfmLogSend(this.$options.name)
  },
  mixins: [
    commonMixin,
    popupMixin
  ],
  methods: {     
    move() {      
      
      //개발일 경우 로그인페이지로 이동
      if (import.meta.env.VITE_ENV !== 'R') {
        sessionStorage.clear()
        location.href = '/login.html'
      }else{
        appService.moveMain()
      }

    }
  },
  components: {      
    //Page
  },
}
</script>