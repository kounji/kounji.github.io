<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산현황 > 보험목록 > 피보험계약자 인보험 상세
* @ 페이지설명 : 나의자산 > 자산현황 > 보험목록 > 피보험계약자 인보험 상세(기본, 보장정보)
* @ 파일명     : src/views/page/AS/IS/ASIS2016/ASIS2016.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-25              CS533571              최초작성
*************************************************************************/
-->
<template>
    <cmm-insu-detail-coverages type="INSURED_PERSON" />
</template>

<script>
import apiService from '@/service/apiService'

export default {
    name : "ASIS2016",
    mounted() {
        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    components: {
        CmmInsuDetailCoverages: () => import('@/components/AS/IS/CMM/CmmInsuDetailCoverages')
    }
}
</script>