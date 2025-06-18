<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > NH모바일인증서 동의
* @ 페이지설명 : NH모바일인증서 동의
* @ 파일명     : src/views/page/CO/AR/COAR4038/COAR4038.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-05-08
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-05-08              CS541597              최초작성
*************************************************************************/
-->
<template>
	<div>
		<!-- 슬라이드 팝업 시작 -->
		<div class="dimmed" style="display:block;"></div>
		<div class="popup_box">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01">
				<div class="popup_header">
					<h1>NH모바일인증서</h1>
				</div>
				<div class="popup_content">
					<div>
						<p class="headline sm">NH모바일인증서 인증을 위해<br> 동의해 주세요.</p>

						<div class="agree_wrap full_view">
							<div class="check_all">
								<div class="checkbox border">
									<input type="checkbox" ref="termAgree" name="agree1_COAR4038" id="agree1_COAR4038" required="" title="개인(신용)정보 제3자 제공 동의" v-model="btnViewYn">
									<button type="button" class="btn_detail ico_arrow" @click.prevent="fn_showStltDtl">개인(신용)정보 제3자 제공 동의<span class="blind">상세보기</span></button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="popup_footer">
					<div class="btns_wrap">
						<button type="button" class="btns lg primary" :class="btnView" @click.prevent="fn_moveNextStep">동의하고 다음</button>
					</div>
				</div>
				
				<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
			</div>
		</div>
		<!--// 슬라이드 팝업 종료 -->
	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import COAR4039 from '@/views/page/CO/AR/COAR4039/COAR4039'

export default {
    name : "COAR4038",
    data: () => {
        return {
            btnViewYn : false,  // 다음버튼 활성화 여부
			certDsc: "",
        }
    },
	computed: {
		btnView() {
			return this.btnViewYn ? "" : "btn_off"
		}
	},
    mounted() {
		this.initComponent(this.params)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        initComponent(param = {}) {
			this.certDsc = param?.certDsc

			this.$refs.termAgree.click()
			this.btnViewYn = true
		},
		// NH모바일인증 약관상세보기
		fn_showStltDtl() {
			const config = {
				component: COAR4039,
				params: {}
			}
			//슬라이드팝업에서 풀팝업을 부르기 위한 오류 수정
			config.renderer = this.modalConfig.renderer
			modalService.openPopup(config).then(response => {
				if(response === "agree") {
					if(!this.btnViewYn) this.btnViewYn = true
				}
			})
		},
		// 동의하고 다음 프로세스 오픈
		fn_moveNextStep() {
			if(!this.btnViewYn) return

			this.close("OK")
		},
    },
	components: {

	}
}
</script>