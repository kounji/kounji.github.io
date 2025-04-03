<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산현황 > 보험
* @ 페이지설명 : 나의자산 > 자산현황 > 자동차 보험 상세내역
* @ 파일명     : src/views/page/AS/IS/ASIS2010/ASIS2010.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533571              최초작성
*************************************************************************/
-->
<template>
    <cmm-insu-detail-transactions type="CAR" />
</template>

<script>
import apiService from '@/service/apiService'

export default {
    name : "ASIS2010",
    mounted() {
        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    components: {
        CmmInsuDetailTransactions: () => import('@/components/AS/IS/CMM/CmmInsuDetailTransactions')
    }
}
</script>