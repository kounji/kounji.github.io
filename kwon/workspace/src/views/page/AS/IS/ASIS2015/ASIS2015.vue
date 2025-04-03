<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 보험
* @ 페이지설명 : 나의자산 > 자산 > 연금저축보험 대출정보상세(POP)
* @ 파일명     : src/components/IS/CMM/CmmInsuDetailLoans.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533571              최초작성
*************************************************************************/
-->
<template>
    <cmm-insu-detail-loans type="PENSION" />
</template>

<script>
import apiService from '@/service/apiService'

export default {
    name : "ASIS2015",
    mounted() {
        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    components: {
        CmmInsuDetailLoans: () => import('@/components/AS/IS/CMM/CmmInsuDetailLoans')
    }
}
</script>