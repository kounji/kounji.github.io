<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS 인증 확인
* @ 페이지설명 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS 인증서 이용안내
* @ 파일명     : src/views/page/CO/AR/COAR2026/COAR2026.vue
* @ 작성자     : CS528051
* @ 작성일     : 2022-07-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-18              CS528051                 최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>PASS 인증서 이용안내</h1>
			<!-- <a href="javascript:void(0);" role="button" class="btn_back" @click.prevent="close('')"><span class="blind">이전화면</span></a> -->
		</div>		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_cont_tit01">
				<div class="tit">
					<strong>
						PASS 앱을 설치하고<br/>발급 받은 인증서가 있어야 해요
					</strong>
				</div>
			</div>
			<div class="com_inner">
				<div class="custom_check_list mt0">
					<strong class="com_cont_tit01">PASS 앱 설치 안내</strong>
					<div class=tel_choice>
						<ul class="com_radio_type03">
							<li>
								<a href="javascript:void(0)" role="button" class="ico_tel skt" @click.prevent="fn_setMarketUrl('S')">skt</a>
							</li>
							<li>
								<a href="javascript:void(0)" role="button" class="ico_tel kt" @click.prevent="fn_setMarketUrl('K')">kt</a>
							</li>
							<li>
								<a href="javascript:void(0)" role="button" class="ico_tel lgu" @click.prevent="fn_setMarketUrl('L')">lgu+</a>
							</li>
						</ul>
						<p class="txt">이용 중인 통신사를 선택해 주세요.</p>
					</div>
					<strong class="com_cont_tit01">PASS 인증서 발급 절차</strong>
					<div class="pass_step">
						<ol>
							<li>PASS 앱 실행 후 PASS 인증서 선택</li>
							<li>인증서 발급 받기 선택 후 약관 동의</li>
							<li>인증번호 인증 후 본인 계좌 인증</li>
							<li>이용 비밀번호 설정 후 발급 완료</li>
						</ol>
					</div>
				</div>
			</div>
		</div>
		
		<a href="javascript:void(0);" role="button" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import appService from '@/service/appService'

export default {
    name : "COAR2026",
    data: () => {
        return {
            com_check_pho   : "",
            comCheckPho     : "",   // 통신사 구분 체크 값
            phoneHeader     : "",   // 핸드폰 앞3자리       
			phoneBody       : "",   // 핸드폰 번호
			status			: "",
			schemeUrl 		: "",
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
    methods: {
        initComponent() {
			this.status = window.$SMNATIVE.getOS('I')?"ios":"android";// window.$SMNATIVE.getOS('A')
            this.getData();
        },
        getData() {
			// this.moduleList = this.modalConfig.param.moduleList || []
		},
		// OS 별 앱 설치 링크 URL
		fn_setMarketUrl(key) {

			console.log("======= this.status android / ios =======",  this.status);
			console.log("======= fn_setMarketUrl key  =======",  key);

			switch(key) {
				case 'S': 
					this.schemeUrl = this.status=="android"?"https://play.google.com/store/apps/details?id=com.sktelecom.tauth"
									:(this.status=="ios"?"https://apps.apple.com/kr/app/pass-by-sk-telecom-%EA%B5%ACt%EC%9D%B8%EC%A6%9D/id1141258007":"");
					break;
				case 'K':
					this.schemeUrl = this.status=="android"?"https://play.google.com/store/apps/details?id=com.kt.ktauth"
									:(this.status=="ios"?"https://apps.apple.com/kr/app/pass-by-kt-%EA%B5%AC-kt-%EC%9D%B8%EC%A6%9D/id1134371550":"");
					break;
				case 'L':
					this.schemeUrl = this.status=="android"?"https://play.google.com/store/apps/details?id=com.lguplus.smartotp"
									:(this.status=="ios"?"https://apps.apple.com/kr/app/pass-by-u-u-%EC%9D%B8%EC%A6%9D/id1147394645":"");
					break;
				default:
					break;
			}

			const config = {
				marketUrl	: this.schemeUrl
            } 

			if(this.getUserInfo('chnl') === '385'){//스뱅
				appService.openPassMarketUrl(config).then(response => {
					console.log('스뱅 앱 설치 링크 URL 전달 웹뷰 호출 결과 리턴',  response);
				})
				.catch( error => {
					console.log(error)
					modalService.alert(error)
				})
			}else{//콕뱅
				appService.cokBankOpenPassMarketUrl(config).then(response => {
					console.log('콕뱅 앱 설치 링크 URL 전달 웹뷰 호출 결과 리턴',  response);
				})
			}
			
		}
    },
	destroyed(){
		clearInterval(this.sessionTimerAuthor)
	}    
}
</script>