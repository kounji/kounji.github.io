<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 - 프로필 - 프로필
* @ 페이지설명 : 프로필
* @ 파일명     : src/views/page/MR/PF/MRPF1001/MRPF1001.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-09-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-21              CS528069                 최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>프로필</h1>
			<a href="javascript:void(0);" class="btn_back" @click="close"><span class="blind">이전화면</span></a>
		</div>

        <div class="popup_content">
            <div class="com_inner com_line_type01 com_top_type02">
                <p>컨설팅 결과 후 진행 예정</p>
            </div>
        </div>
		
		<a href="javascript:void(0);" class="btn_close" @click="close"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    // import commonService from '@/service/commonService'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'

    export default {
        name : "MRPF1001",
        data: () => {
            return {
            }
        },
        computed: {
        }, 
        created() {
            
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
            },

        },
        components : {
        }
    }
</script>