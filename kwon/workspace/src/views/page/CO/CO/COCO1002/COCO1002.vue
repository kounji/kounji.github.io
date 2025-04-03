<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 공통 > 계좌연결
* @ 페이지설명 : 계좌연결 안내 슬라이드 팝업
* @ 파일명     : src/views/page/CO/CO/COCO1002/COCO1002.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-07-26
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2022-07-26              CS528069              최초작성
*************************************************************************/
-->
<template>
<div>
  <!-- slide popup S -->
	<div class="dimmed" style="display: block;" @click.prevent="close()"></div>
	<div class="popup_box renewal">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<h1>계좌 연결</h1>
			</div>
			<div class="popup_content com_btn_bottom">
				<!-- 계좌없을때 -->
				<div class="no_data_box">
					<div class="no_data_list">
						<p>연계된 계좌가 없습니다.</p>
						<span class="txt_sub">관련 계좌가 있으면 연결해 주세요</span>
					</div>
				</div>
				<!-- //계좌없을때 -->
			</div>
			<div class="popup_footer">
				<!-- 계좌없을때 -->
				<div class="com_btnhalfbox_type02">
					<a href="javascript:void(0);" class="btn btn_mint_gray" @click.prevent="close()">확인</a>
					<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_openAsetReg()">자산연결</a>
				</div>
				<!-- //계좌없을때 -->
			</div>
			
			<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
		</div>
	</div>
	<!--// slide popup E -->
</div>
</template>

<script>
  import popupMixin from '@/common/mixins/popupMixin'
  import commonMixin from '@/common/mixins/commonMixin'
  import apiService from '@/service/apiService'
  import modalService from '@/service/modalService'
  
  import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'
  
  export default {
    name: 'COCO1002',
    mixins: [
        popupMixin,
        commonMixin
    ],    
    data() {
      return {
        
      }
    },
    computed: {
          
    },
    methods: {
      initComponent() {
     
      },
      getData(){

      },
      // 자산연결 팝업 오픈
      fn_openAsetReg() {
        const config = {
          component : COAR2002,
          params : {}
        }
        config.renderer = this.modalConfig.renderer
        modalService.openPopup(config).then()
      }
    },
    created(){
    },
    mounted(){
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
  }
</script>
