<!--
/*************************************************************************
* @ 서비스경로 : 전체 메뉴 > 서비스해지
* @ 페이지설명 : 전체 메뉴 > 서비스해지 완료
* @ 파일명     : src/views/page/MR/CA/MRCA2003/MRCA2003.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-22 
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-22             CS533035              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup renewal mydata2023" id="full_popup_01"> 
        <div class="popup_header">
            <h1>서비스 완료</h1>
        </div>
        
        <div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
            <div class="com_inner">
                <div class="no_data_box no_data_box01 pt20">
                    <div class="no_data_list">
                        <p class="titH1">NH콕마이데이터 서비스 해지가<br>정상적으로 완료되었습니다</p>
                        <span class="txt_sub mt10">모든 기관에 연결이 해제 되었고 기존에<br>수집된 개인신용정보가 모두 삭제되었습니다.</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="popup_footer fixed">
            <div class="btn_full_box">
                <a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="movePage()">확인</a>
            </div>
        </div>

        <a href="javascript:void(0);" class="btn_close" @click.prevent="movePage()"><span class="blind">팝업닫기</span></a>
    </div>
    <!--// 전체 팝업 종료 -->
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import appService from '@/service/appService'

    export default {
        name : "MRCA2003",
        data: () => {
            return {
            }
        },
        mounted() {
            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        methods: {
            initComponent() {
            },
            getData() {
            },
            movePage() {
                
                appService.moveMain();
                this.closeAll();
                
                /* 
                const config = {
					component : COAS2001 // 서비스 안내
				}
				modalService.openPopup(config)
                */
            }
        }
    }
</script>