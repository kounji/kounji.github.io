<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > NH콕부동산 > 부동산청약
* @ 페이지설명 : 더보기 > NH콕부동산 > 부동산청약 > 청약정보 상세
* @ 파일명     : src/views/page/AN/RE/ANRE4210/ANRE4210.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-03-10
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-10              CS541013              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">청약정보 상세</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content iframe com_no_bottom">
			<div class="iframe_wrap com_inner">
				<iframe :src="url" style="width:100%; height:100%; " ref="iframe"></iframe>
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
    name : "ANRE4210",
	data: () => {
        return {
            url                 : "",

            rlestSbpList        : [],           // 청약 목록
		}
	},
	props : {

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        initComponent(params = {}) {
            this.rlestSbpList = params.rlestSbpList;
            this.url = params.url;
        },
	},
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    }
}
</script>