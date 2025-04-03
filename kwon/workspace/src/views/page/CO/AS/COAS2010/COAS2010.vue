<!--
/*************************************************************************
* @ 서비스경로 : 자산관리 서비스 가입 > 가입완료
* @ 페이지설명 : 가입완료
* @ 파일명     : src/views/page/CO/AS/COAS2010/COAS2010.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-04              CS528069              최초작성
* 2023-08-23              CS533035              화면번호수정(COAS1010->COAS2010)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal complete" id="full_popup_01"> 
		<div class="popup_header">
			<h1>서비스 가입</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="secede_box2">
				<p class="txt">마이데이터 서비스에<br/>
					가입 했어요</p>
				<p class="txt_sub">이제 흩어진 자산을 한 곳에 모아<br/>
					맞춤 자산관리 서비스를 받아보세요.</p>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box2">
				<a href="javascript:void(0);" role="button" class="btn btn_parent" v-on:click.prevent="moveMainPage()">나중에 연결 할게요</a>
				<a href="javascript:void(0);" role="button" class="btn btn_mint" v-on:click.prevent="moveSetAssetPage()">자산 연결</a>
			</div>
		</div>

		<!-- <a href="javascript:void(0);" class="btn_close"><span class="blind">팝업닫기</span></a>		 -->
	</div>
	<!--// full popup E -->
</template>

<script>
    import apiService from '@/service/apiService'
    import commonService from '@/service/commonService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    export default {
        name: 'COAS2010',
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
            moveMainPage() {
                this.closeAll()

                const menu = {
                    //name : "MAMA2001",
                    //상호금융 NH콕마이데이터 4.0 추진 개발
                    name : "MAMA4001", 
                    params : {"addAssetYn" : "N"}
                }
                commonService.movePage(menu)
            },
            moveSetAssetPage() {
                const menu = {
                    //name : "MAMA2001",
                    //상호금융 NH콕마이데이터 4.0 추진 개발
                    name : "MAMA4001", 
                    params : {"addAssetYn" : "Y"}
                }
                commonService.movePage(menu)
            }

        },
        components: {      
            
        },
    }
    
</script>