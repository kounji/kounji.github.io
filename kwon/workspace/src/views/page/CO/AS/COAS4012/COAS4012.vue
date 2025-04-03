<!--
/*************************************************************************
* @ 서비스경로 : 자산관리 서비스 가입 > 14세 미만 가입 불가 안내
* @ 페이지설명 : 14세 미만 가입 불가 안내
* @ 파일명     : src/views/page/CO/AS/COAS4012/COAS4012.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-02-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-06              CS528069              최초작성
* 2023-08-23              CS533035              화면번호수정(COAS1012->COAS2012)
* 2025-02-21              CS541599              화면번호수정(COAS2012->COAS4012) 19세->14세
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal complete" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="blind">만 14세 미만 접속시</h1>
			<!--
			<a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a>
			-->			
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="secede_box">
				<p class="txt">만14세 이상만 가능해요! </p>
				<p class="txt_sub">신용정보업감독규정에 따라 만 14세 미만의<br/>경우 마이데이터 서비스 이용 제약으로<br/>가입이 불가합니다.</p>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click="moveMain()">확인</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="moveMain()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import appService from '@/service/appService'

export default {
    name: 'COAS4012',
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
    created() {
        
    },
    mounted() {
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: { 
        initComponent() {
            this.getData()
        },
        getData() {
            
        },
        
        // 팝업닫을시 어플 메인으로 이동
        moveMain() {
            this.close()

            appService.moveMain()
        },

    },
    components: {      
        
    },
}
    
</script>