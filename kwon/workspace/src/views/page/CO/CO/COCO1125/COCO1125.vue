<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 서비스장애 (AS-IS PGCO0301)
* @ 파일명     : src/views/page/CO/CO/COCO1125/COCO1125.vue
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
				<p class="txt_sub">{{ errorMessage }}</p>
        <p class="txt_sub">스마트 상담센터 <a href="tel:1600-2800">1600-2800</a></p>
			</div>  
		</div>
		
		<div class="popup_footer fixed">
			<div class="btn_full_box">
        <template v-if="serviceType != 'R' && isLocal">
          <a href="javascript:void(0);" class="btn btn_mint" v-on:click.prevent="move()">로그인페이지로 돌아가기</a>
        </template>
        <template v-else>  
          <template v-if="isSBank">
            <a href="javascript:void(0);" class="btn btn_mint" v-on:click.prevent="moveSB()">NH스마트뱅킹 돌아가기</a>
          </template>
          <template v-else>
            <a href="javascript:void(0);" class="btn btn_mint" v-on:click.prevent="cokBankGoHome()">콕뱅크 돌아가기</a>
          </template>
        </template>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" style="display:none;"><span class="blind">팝업닫기</span></a>
		
	</div>
	<!--// full popup E -->  
</template>

<script>
//import Page from '@/views/layout/Page.vue'  
//import appService from '@/service/appService'
import routerService from '@/service/routerService'
import scrapingService from '@/service/scrapingService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import _ from 'lodash'

export default {
  name: 'COCO1125',
	computed: {
      errorInfo() {
          const response = this.routeParams.response || {}
          const data = response.data || response || {}
          return (data.rspMsg ? data.rspMsg[0] : data) || {}
      },
      errorCode() {
          return this.errorInfo.rspMsgC || this.errorInfo.rsp_code
      },
      errorMessage() {
          return this.errorInfo.rspMsgCntn || this.errorInfo.rsp_msg
      },
      isSBank(){
        //콕뱅이 아닐 경우는 모두 스뱅으로 처리한다
        if (sessionStorage.getItem('userInfo') !== undefined && 
            JSON.parse(sessionStorage.getItem('userInfo')).chnl === '386') 
        {
          return false
        }else{
          return true
        }
      },
      serviceType(){
        return import.meta.env.VITE_ENV
      },
      isLocal(){
        if(window.location.host.indexOf('localhost') > -1)
        {
          return true
        }else{
          return false
        }
      }
	},
  data: () => {
    return {
    }
  },
  mounted() {
    //PFM로그 처리 화면접속이력 등록 POST
    apiService.pfmLogSend(this.$options.name)
    console.log('this.routeParams :::', this.routeParams)
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
        routerService.moveMain()
      }
    },
    moveSB() {      
        sessionStorage.clear()
        return scrapingService.execute('SBView', 'navigateFromGNB', ['goHome()'])
    },
    cokBankGoHome() {
        return new Promise((resolve) => {
          const callback = response => {
              resolve(response)
          }
          sessionStorage.clear()
          window.$SMNATIVE.goHome(callback)
        })
    }    

  },
  components: {      
    //Page
  },
}
</script>