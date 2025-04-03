<!--
/*************************************************************************
* @ 서비스경로 : 제휴서비스 > 귀농귀촌
* @ 페이지설명 : 제휴서비스 > 귀농귀촌 > 농지/주거지 검색
* @ 파일명     : src/views/page/AN/FM/ANFM2003/ANFM2003.vue
* @ 작성자     : CS528205
* @ 작성일     : 2022-08-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-16              CS528205              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">농지/주거지 검색</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content iframe com_no_bottom">
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
    name : "ANFM2003",
	data: () => {
        return {
            url : ""
		}
	},
	props : {

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        initComponent(type) {
            switch(type) {
                case 0:
                    // 농지 찾기
                    this.url = "https://nonghyup.btalk.me/land/form/farm"
                    break;
                case 1:
                    // 한번에 찾기
                    this.url = "https://nonghyup.btalk.me/land/form/house-farm"
                    break;
                case 2:
                    // 주거지 찾기
                    this.url = "https://nonghyup.btalk.me/land/form/house"
                    break;
                default:
                    // 기본 - 한번에 찾기
                    this.url = "https://nonghyup.btalk.me/land/form/house-farm"
            }
        }
	},
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    }
}
</script>