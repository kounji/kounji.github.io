<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 약관/동의 > 개인정보처리방침
* @ 파일명     : src/views/page/CO/AT/COAT1103/COAT1103.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-18             CS515729                 최초작성
*************************************************************************/
-->
<template>
	<!-- content S -->
    <div class="full_popup" id="full_popup_01">
		<div class="popup_header">    
			<h1>개인정보처리방침</h1>			
		</div>
        <div class="popup_content com_no_bottom">
			<div class="privacy_box">
				농협중앙회는 ‘개인정보 보호법‘ 제 30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다. 다만, 농협중앙회가 사업 등의 목적을 위하여 별도의 홈페이지를 운영할 경우 사업 등 관련 개인정보 처리방침은 해당 홈페이지에 공개함을 알려드립니다. 
			</div>
			<div class="terms_text_wrap com_bg_type00">
				
				<div class="content">
					제1조(개인정보의 처리목적)
					<br/><br/>
					농협중앙회는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 ‘개인정보 보호법‘ 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.<br/><br/>
					1. 민원사무 처리<br/><br/>
민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락통지,처리결과 통보 등의 민원사무 처리 목적으로 개인정보를 처리합니다.<br/><br/>
2. 클린신고 등 처리<br/><br/>
행동강령 위반 제보를 위한 클린신고, 선거부정 신고를 위한 선거부정신고, 그 밖에 정보공개, 아이디어 및 ‘칭찬합시다＇등의 처리 목적으로 개인정보를 처리합니다.<br/><br/>
3. 농·축협 금융거래 관리<br/><br/>
농·축협 금융거래와 관련 신용조회회사 또는 신용정보집중기관에 대한 개인신용정보의 조회, 농·축협 금융거래 관계의 관리, 농·축협 금융사고 조사, 분쟁해결 및 법령상 의무의행 등의 목적으로 개인정보를 처리합니다.

				</div>
			</div>
        </div>

        <a href="javascript:void(0);" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>
    </div>
</template>
<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    // import commonService from '@/service/commonService'
    // import Page from '@/views/layout/Page.vue'

    export default {
        name : "COAT1103",
        data: () => {
            return {
            }
        },
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
            
            },
            // movePage(page) {
            //     const menu = {
            //         name : page
            //     }
            //     commonService.movePage(menu);
            // },
        },
        components: {
            // Page
        }
    }
</script>