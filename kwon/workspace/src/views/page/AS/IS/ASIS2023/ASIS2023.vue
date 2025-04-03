<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산현황 > 보험 > 물보험 상세 > 대출정보 > 계좌선택
* @ 페이지설명 : 나의자산 > 자산현황 > 보험 > 물보험 상세 > 대출정보 > 계좌선택 슬라이드 팝업
* @ 파일명     : src/views/page/AS/IS/ASIS2023/ASIS2023.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-09-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-09-04              CS533571              최초작성
*************************************************************************/
-->
<template>
    <cmm-insu-detail-select />
</template>

<script>
import apiService from '@/service/apiService'

export default {
    name : "ASIS2023",
    mounted() {
        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    components: {
        CmmInsuDetailSelect: () => import('@/components/AS/IS/CMM/CmmInsuDetailSelect')
    }
}
</script>