<!--
// 2025 NATIVE 호출 함수 수정
/*************************************************************************
* @ 서비스경로 : 자산관리 서비스 가입 > 농축협 신규가입안내
* @ 페이지설명 : 농축협 신규가입안내
* @ 파일명     : src/views/page/CO/AS/COAS2011/COAS2011.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-30              CS528069              최초작성
* 2023-08-23              CS533035              화면번호수정(COAS1011->COAS2011)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal complete" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="blind">농축협 계좌 미보유</h1>
		</div>
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="secede_box">
				<p class="txt">농축협 계좌가 없어요!</p>
				<p class="txt_sub">흩어져 있는 내 자산을 한 눈에 모아 보고<br/>맞춤 자산관리 서비스를 받아보세요.</p>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click="moveAccPage()">농축협 계좌 개설</a>
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
    name: 'COAS2011',
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

        // 계좌생성 페이지 이동
        moveAccPage() {
            sessionStorage.clear()

            if(this.getUserInfo("chnl") === "385") {
                //SMART-BANK
                //금상몰 예금으로 진입 정상 동작 함.	
                const pageInfo = 'navigate( "MFDT0020R", { psnFncWrsC:"", wrsC:"", serviceId:"", naac_dsc:"2", nhType:"2"} )'
                window.fg.of.exec(function() {},"SBView","navigateFromGNB",[pageInfo]);

                // let url = "https://smartbank.nonghyup.com/service/html/sbgateway.html?WEB=Y&serviceId=MFDT0020R&mfdtListGbn=4&nhType=2"
                // location.href = url
            } else {
                //COK-BANK
                appService.cokBankGoMove("SFBCA0000R") 
            }
        }

    },
    components: {      
        
    },
}
    
</script>