<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 서비스오류
* @ 파일명     : src/views/page/CO/CO/COCO1114/COCO1114.vue
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
            <div class="btn_close" style="display:none;">팝업닫기</div>
            <!-- <a @click.prevent="COCO1114_close()" class="btn_close"><span class="blind">팝업닫기</span></a>	 -->
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
				<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="moveSB()">메인으로 바로가기</a>
			</div>
		</div>

		<!-- <a href="javascript:void(0);" class="btn_close"><span class="blind">팝업닫기</span></a> -->
		
	</div>
	<!--// full popup E -->
</template>
<script>
//import Page from '@/views/layout/Page.vue'
import appService from '@/service/appService'
import routerService from '@/service/routerService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import _ from 'lodash'

export default {
    name : "COCO1114",
    data: () => {
        return {
           
        }
    },
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
          if (this.errorInfo.rspMsgCntn !== undefined && this.errorInfo.rspMsgCntn !=='' && this.errorInfo.rspMsgCntn.indexOf('API') > -1)
          {
                return '잘못된 접근입니다.'
          }else{
                return this.errorInfo.rspMsgCntn
          }
          
      },
    },
    mixins: [
        commonMixin,
        popupMixin        
    ],    
    mounted() {
			
    },
    methods: { 
        move() {
            routerService.moveMain()
        },
        moveSB() {
            appService.moveMain()
        },
        COCO1114_close(){
            this.$router.go(-1)
        }
    },
    components: {      
        //Page
    },
}
</script>