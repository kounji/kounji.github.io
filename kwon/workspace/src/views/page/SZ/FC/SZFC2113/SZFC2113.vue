<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농캘린더 > 날짜설정(POP)
* @ 페이지설명 : 날짜설정
* @ 파일명     : src/views/page/SZ/FC/SZFC2113/SZFC2113.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-04-30
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-12-08                                    최초작성
*************************************************************************/
-->
<template>
<div>
    <div class="dimmed" style="display:block;" v-on:click.prevent="close()"></div>
    <div class="popup_box">
        <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
            <!--상단-->  
            <div class="popup_content com_no_top">
              <div class="com_txt_type04">
                  <p class="com_txt03"><span class="com_point_darkblue">서비스 개인(신용)정보조회동의서</span> 선택 약관에 동의 하시더라도 경제데이터 활용은 다음날 부터 가능합니다.</p>
                  <p class="dot_msg mt15">해당 안내는 약관동의 후 최초 1회만 노출 됩니다.</p>
              </div>
            </div>
            <!--하단-->  
            <div class="popup_footer">
              <div class="btn_full_box">
                <a href="javascript:void(0);" v-on:click.prevent="fn_conFirm()" 
                    class="btn btn_mint">확인
                </a>
              </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

export default {
	name: 'SZFC2113',
	data: () => {
		return {

		}
	},

  mixins: [
      popupMixin,
      commonMixin
	],
	
  mounted() {
		this.initComponent(this.params);
		
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)     
  },

	methods: {
		initComponent() {

		},

    //[확인]버튼 선택]
    fn_conFirm() {

        this.close('noSeemyFarmClaSign')

    }
	}

}
</script>

