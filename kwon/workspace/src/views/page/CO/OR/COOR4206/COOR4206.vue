<!--
/*************************************************************************
* @ 서비스경로 : 콕마이데이터설정 > 대면상담 일회성동의
* @ 페이지설명 : 콕마이데이터설정 > 대면상담 일회성동의 > 대면상담 일회성동의 완료
* @ 파일명     : src/views/page/CO/OR/COOR4206/COOR4206.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-05-12
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-05-12              CS541013              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view">
        <!-- content -->
        <div id="content">
			<div class="face_consult">
				<p class="txt">
					<span class="item02"></span>
					<strong>콕마이데이터 대면서비스<br>신청이 완료되었습니다.</strong>
					마이데이터 담당자와 함께<br>체계적인 자산관리를 받아보세요.
				</p>
				<div class="btns_wrap">
					<button type="button" class="btns lg primary" @click.prevent="fnAssetUpdate">확인</button>
				</div>
			</div>
		</div>
        <!--// content -->

        <footersV2 type=""/> 
    </page>  
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import commonService from '@/service/commonService'

import COOR4207 from '@/views/page/CO/OR/COOR4207/COOR4207'

export default {
    name : "COOR4206",
	data: () => {
        return {
            
		}
	},
	computed: {
		
	},
	mixins: [
        commonMixin
    ],
	methods: {
		fnAssetUpdate() {
			const config = {
                component: COOR4207,
                params : {}
            }
            modalService.openPopup(config).then((response) => {
                console.log("COOR4202 close popup", response)
            })
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