<!--
/*************************************************************************
* @ 서비스경로 : 전체 메뉴 > 서비스해지
* @ 페이지설명 : 전체 메뉴 > 서비스해지 확인
* @ 파일명     : src/views/page/MR/CA/MRCA2002/MRCA2002.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-22 
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-22             CS533035              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click.prevent="close()"></div>
        <div class="popup_box renewal">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
				<div class="popup_header">
					<strong class="com_pop_tit01">해지 전에 한 번 더 확인할께요.</strong>
				</div>
				<div class="popup_content com_btn_bottom">
					<p class="com_txt_sub">내 자산을 진단해 돈을 모으고, 지출을 분석해 아낄 수<br>있는 서비스를 더 이상 이용할 수 없어요.<br>그래도 해지 하시겠어요?</p>
				</div>
				<div class="popup_footer">
					<div class="com_btnhalfbox_type02">
						<a href="javascript:void(0);" class="btn btn_mint_gray" @click.prevent="close()">정보 보관</a>
						<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="close('Y')">즉시 삭제</a>
					</div>
				</div>
				
				<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
			</div>
		</div>
        <!--// slide popup E -->
    </div>
</template>

<script>
	import apiService from '@/service/apiService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    export default {
        name: 'MRCA2002',
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
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: { 
            init() {

            },
            initComponent() {
                this.init()
            },
            getData() {
            },
 
        },
        components: {      
            
        },
    }
    
</script>