<!--
/*************************************************************************
* @ 서비스경로 : 콕마이데이터설정 > 대면상담 일회성동의
* @ 페이지설명 : 콕마이데이터설정 > 대면상담 일회성동의 > 대면상담 일회성동의 확인
* @ 파일명     : src/views/page/CO/OR/COOR4205/COOR4205.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-05-12
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-05-12              CS541013              최초작성
*************************************************************************/
-->
<template>
    <div>
		<!-- alert pupop S -->
		<div class="dimmed" style="display:block;"></div>
		<div class="center_popup" id="center_popup" style="display:block;"> <!-- 개발시 style="display:block;" 제거 -->
			<div class="popup_content">
				<div class="cok_desc">
					<p class="tit">고객님께서 <em>대면상담 일회성 동의</em><br>하신 정보는 아래와 같습니다.</p>
					<dl class="gray_box">
						<div>
							<dt>마이데이터 담당직원</dt>
							<dd>의왕지점 홍길동</dd>
						</div>
						<div>
							<dt>대면상담일자</dt>
							<dd><span>2025.02.07</span> <span>13:38</span></dd>
						</div>
					</dl>
				</div>
			</div>
			<div class="popup_footer">
				<div class="btns_wrap">
					<button type="button" class="btns lg primary" @click.prevent="fnNextAgree">확인</button>
				</div>
			</div>
		</div>
		<!--// alert popup E -->
	</div>
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
    name : "COOR4205",
	data: () => {
        return {
            
		}
	},
	computed: {
		
	},
	mixins: [
        commonMixin,
        popupMixin
    ],
	methods: {
		fnNextAgree() {
            let param = {
                isAgree : true
            }
            this.close(param)
        },
		// 페이지 이동
		fn_movePage(pageId, param) {
			if (pageId === '') {
				modalService.alert("페이지 정보 필요")
				return
			}

			let params = {}
			params = param
			
			const config = {
				name : pageId,
				params : "Y"
			}
			this.close()
			commonService.movePage(config);
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