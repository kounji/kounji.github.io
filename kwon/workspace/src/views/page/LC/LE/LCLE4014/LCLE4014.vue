<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 선불 결제내역 > 선불선택
* @ 페이지설명 : 지출 > 지출내역 > 선불 결제내역 > 선불선택 슬라이드 팝업
* @ 파일명     : src/views/page/LC/LE/LCLE4014/LCLE4014.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-19              CS533571              최초작성
* 2025-01-31              CS540687              마이데이터 v4.0
*************************************************************************/
-->

<template>
    <cmm-xps-detail-select />
</template>

<script>
import CmmXpsDetailSelect from '@/components/LC/LE/CMM/CmmXpsDetailSelectV4'
import apiService from '@/service/apiService'

export default {
    name: "LCLE4014",
    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    components: {
        CmmXpsDetailSelect
    }
}
</script>