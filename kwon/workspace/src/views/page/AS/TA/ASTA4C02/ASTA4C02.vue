<!--
/*************************************************************************
* @ 서비스경로 : 청소년모드 > 자산 > 나의자산 미리보기
* @ 페이지설명 : 청소년모드 > 자산 > 나의자산 미리보기
* @ 파일명     : src/views/page/AS/TA/ASTA4C02/ASTA4C02.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-06-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-06-04              CS541597              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup " id="full_popup_01">
		<div class="popup_header">
			<h1>나의자산 미리보기</h1>
		</div>

		<div class="popup_content">
			<div class="preview_wrap youth">
				<h2 class="headline">지금은 청소년 자산 연결을<br>준비중이에요.</h2>
				<p>내 통장에 모은 용돈, 소중한 페이, 머니<br>한곳에서 쉽게 확인할 수 있어요.</p>
				<img src="@/assets_v40/images/img/img_youth_preview_assets.png" alt="청소년 자산 메인 화면">
			</div> 
		</div>
	
		<div class="popup_footer fixed">
			<div class="btn_full_box btns_wrap">
				<button type="button" class="btns lg primary" @click.prevent="close">확인</button>
			</div>
		</div>
		
		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close"><span class="blind">팝업닫기</span></a>
		
	</div>
	<!--// full popup E -->
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
 
    export default {
        name : "ASTA4C02",
        data: () => {
            return {
                
            }
        },
        computed : {
            
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
                this.getData()
            },
            getData() {
                
            }
        }
    }

</script>