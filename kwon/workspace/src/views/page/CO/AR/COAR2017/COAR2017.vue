<!--
/*************************************************************************
* @ 서비스경로 : 자산연결 > 금융자산 > 한번에 > 공동인증서 약관 상세 팝업
* @ 페이지설명 : 공동인증서 약관 상세 팝업
* @ 파일명     : src/views/page/CO/AR/COAR2017/COAR2017.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-18              CS528069              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>약관동의</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>		
		<div class="popup_content com_bg_type00 separate_scroll"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_top_type02">
				<strong class="com_pop_tit01">
					{{title}}
				</strong>
			</div>
			<!-- <div class="terms_view"> -->
			<div class="com_inner agree_cont terms_text_wrap">
				<iframe :src="url" style="width:100%;height:100%" ref="iframe"></iframe>
				<!-- <div>
					<div class="terms_cont">
						<dl>
							<dt>제1조 (목적)</dt>
							<dd>이 약관은 '마이데이터 통합인증서비스'와 관련한 인증서 본인 확인 서비스를 제공하기 위해 인증기관인 한국전자인증 주식회사, 한국정보인증 주식회사, 주식회사 코스콤, 사단법인 금융결제원 (이하 이들을 각 칭하여 ‘인증기관')과 신용정보주체(이하 ‘가입자'라 합니다)간에 ‘금융분야 마이데이터 통합인증서비스'(이하 '마이데이터 통합인증 서비스'라 합니다) 제공 시 인증서 본인확인서비스 이용에 관한 권리와 의무, 기타 제반 사항을 정함을 목적으로 합니다</dd>
						</dl>
					</div>
				</div> -->

			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="close('agree')">동의</a>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close txt_cancel" @click.prevent="close()"><span class="">취소</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
// import modalService from '@/service/modalService'

import apiService from '@/service/apiService'


export default {
    name : "COAR2017",
    data: () => {
        return {
			title : "",	// 약관 제목
			url : "",	// 약관 url
        }
	},
    mounted() {
		this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     
    },
    mixins: [
		commonMixin,
        popupMixin
	],
	computed:{
		
	},
    methods: {
        initComponent(param = {}) {
			this.title 	= param.title || ""
			this.url 	= param.url || ""
        },
        getData() {
			
		},
		
    },
    components : {
    }
}


</script>