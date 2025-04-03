<!--
/*************************************************************************
* @ 서비스경로 : 제휴서비스 > 맞춤부동산
* @ 페이지설명 : 제휴서비스 > 맞춤부동산 > 지도검색 > 부동산 AI 추천
* @ 파일명     : src/views/page/AN/RE/ANRE2204/ANRE2204.vue
* @ 작성자     : CS528053
* @ 작성일     : 2022-07-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-25              CS528053              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">지도검색</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content com_no_bottom iframe">
			<div class="iframe_wrap">
				<!-- <button class="com_btn_round" @click.prevent="sendData()">자식에게 메시지 송신</button>
				<div style="border: 1px solid #000; padding: 10px; margin: 10px 0;">받은 메시지<br>
					<span ref="msgbox">{{recvMsg}}</span>
				</div> -->
				<iframe :src="url" style="width:100%;height:100%" ref="iframe"></iframe><!-- @click.prevent="openIframeLink()" -->
			</div>
			<p class="iframe_txt">금년 중 서비스 제공 지역을 전국으로 확대 할 예정입니다.</p>
		</div>


		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
//import {iframeEvtListener} from '@/utils/jUtils'

export default {
    name : "ANRE2204",
	data: () => {
        return {
			url 		: '',	// 위티 지도 검색 URL
			recvMsg 	: '',
			id 			: '' 	// 위티 전달할 아파트 파라미터(지도의 중심 위치 지정 위함)
		}
	},
	props : {

    },
    mixins: [
        popupMixin
        ,commonMixin
	],
	mounted() {
		this.initComponent(this.params)
		//iframeEvtListener();
		
		//window.addEventListener("message", this.receiveData)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
		// 초기화
		initComponent(params = {}) {
			this.id = params.id || '';
			this.url = 'https://nonghyup.btalk.me/searchmap?id=' + this.id;
			console.log("위티 지도 전달 URL : " + this.url)
			//window.addEventListener("message", this.receiveData)
			//iframeEvtListener();
		},

		// iframe 링크 연결
		openIframeLink() {
			//window.open("https://nonghyup.btalk.me/child");
			//window.open("https://pfm.nonghyup.com:5090/login.html");
			return;
		},

		// iframe으로 메시지 송신
		sendData() {
			this.$refs.iframe.contentWindow.postMessage("부모가 보낸 메시지", "*");
			console.log("송신버튼 클릭");
			//iframeEvtListener();
		
		},

		// iframe에서 메시지 수신
		/* receiveData(e) {
			//const box = this.$refs.msgbox;
			this.recvMsg = e.data;
			console.log("자식으로부터 받은 메시지 :", e.data);
		} */
	}
}
</script>