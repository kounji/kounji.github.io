<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 보험
* @ 페이지설명 : 나의자산 > 자산 > 물보험 특약정보(POP)
* @ 파일명     : src/views/page/AS/IS/ASIS2008/ASIS2008.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533571              최초작성
*************************************************************************/
-->
<template>
    <cmm-insu-detail-contracts type="NOT_PERSON" />
</template>

<script>
import apiService from '@/service/apiService'

export default {
    name : "ASIS2008",
    mounted() {
        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    components: {
        CmmInsuDetailContracts: () => import('@/components/AS/IS/CMM/CmmInsuDetailContracts')
    }
}
</script>