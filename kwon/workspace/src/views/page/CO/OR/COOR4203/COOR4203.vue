<!--
/*************************************************************************
* @ 서비스경로 : 콕마이데이터설정 > 대면상담 일회성동의
* @ 페이지설명 : 콕마이데이터설정 > 대면상담 일회성동의 > [필수]제3자 이용약관
* @ 파일명     : src/views/page/CO/OR/COOR4203/COOR4203.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-05-12
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-05-12              CS541013              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>{{title}}</h1>
		</div>
		<div class="popup_content">
			<div class="terms_view">
				<div>
					<!-- <strong class="terms_tit">{{title}}</strong> -->
					<div class="terms_cont">
						{{content}}
					</div>
				</div>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btns_wrap btn_agree_wrap">
				<button type="button" class="btns lg primary btn_agree_move"><span class="btn_down_arrow">맨 밑으로 내리기</span></button>
				<button type="button" class="btns lg primary btn_agree_stop" @click.prevent="fnAgreeTerm()">동의하기</button>
			</div>
		</div>
        <a href="javascript:void(0);" class="btn_close" @click.prevent="close({agreeYn:'N'})"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import commonService from '@/service/commonService'
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name : "COOR4203",
	data: () => {
        return {
            title				: "",	// 약관내용 제목
			content				: "",	// 약관내용 상세내용
			sqno				: "",	// 약관번호
		}
	},
	computed: {
		
	},
	mixins: [
        commonMixin,
        popupMixin
    ],
	mounted() {
		this.initComponent(this.params)
		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

	},
	methods: {
		initComponent(param) {
			this.title   = param.title
			this.content = param.content
			this.sqno    = param.sqno

			this.$nextTick(() => {
				this.callJQueryFncExcute();

				$(document).ready(function(){
					let $btnTerms = $('.btn_agree_move');
					let $fullPop = $btnTerms.closest('.full_popup');
					let $popCont = $fullPop.find('.popup_content');
					let $termsCont = $fullPop.find('.terms_view');
					
					$popCont.scroll(function(){
						let nowScroll = $popCont.scrollTop();
						
						if((nowScroll + $popCont.height()) >= $termsCont.height() - 50){
							$btnTerms.parent('.btn_agree_wrap').addClass('act');
						}
					})

					$btnTerms.off('click.btn_agree_move_ani').on('click.btn_agree_move_ani', function(){
						$popCont.animate({
							scrollTop: $popCont[0].scrollHeight
						}, 400);
						$btnTerms.parent('.btn_agree_wrap').addClass('act');
					})
				})
			})
		},
		/* 동의 버튼 */
        fnAgreeTerm() {
            let param = {
                agreeYn : 'Y',
                sqno    : this.sqno
            }
            this.close(param)
        },
	},
    watch: {
        
    },
	components: {
		Page,
        FootersV2
	}
}
</script>