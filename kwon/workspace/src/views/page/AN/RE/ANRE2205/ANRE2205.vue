<!--
/*************************************************************************
* @ 서비스경로 : 제휴서비스 > 맞춤부동산
* @ 페이지설명 : 제휴서비스 > 맞춤부동산 > 부동산 추천 > 관심부동산 검색
* @ 파일명     : src/views/page/AN/RE/ANRE2205/ANRE2205.vue
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
			<h1 class="">부동산추천</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content com_no_bottom iframe">
			<div class="iframe_wrap">
				<iframe :src="url" style="width:100%;height:100%" ref="iframe"></iframe>
			</div>
		</div>


		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'

export default {
    name : "ANRE2205",
	data: () => {
        return {
			url : '',	// 위티 지도 검색 URL
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

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
		// 초기화
		initComponent() {
			this.url = 'https://nonghyup.btalk.me/ai/form';
		},
	}
}
</script>