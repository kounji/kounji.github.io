<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산현황 > 보험목록 > 피보험계약자 물보험 상세
* @ 페이지설명 : 나의자산 > 자산현황 > 보험목록 > 피보험계약자 물보험 상세 특약정보(POP)
* @ 파일명     : src/views/page/AS/IS/ASIS2019/ASIS2019.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-25              CS533571              최초작성
*************************************************************************/
-->
<template>
    <cmm-insu-detail-contracts type="INSURED_NOT_PERSON" />
</template>

<script>
import apiService from '@/service/apiService'

export default {
    name : "ASIS2019",
    mounted() {
        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    components: {
        CmmInsuDetailContracts: () => import('@/components/AS/IS/CMM/CmmInsuDetailContracts')
    }
}
</script>