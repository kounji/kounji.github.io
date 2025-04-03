<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 카드 지출내역
* @ 페이지설명 : 지출 > 지출내역 > 카드 지출내역 목록 조건검색 슬라이드 팝업
* @ 파일명     : src/views/page/LC/LE/LCLE4007/LCLE4007.vue
* @ 작성자     : CS540687
* @ 작성일     : 2025-01-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-31              CS540687              최초작성
*************************************************************************/
-->
<template>
    <cmm-xps-detail-search />
</template>

<script>
import CmmXpsDetailSearch from '@/components/LC/LE/CMM/CmmXpsDetailSearchV4'
import apiService from '@/service/apiService'

export default {
    name : "LCLE4007",
    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    components: {
        CmmXpsDetailSearch: () => import('@/components/LC/LE/CMM/CmmXpsDetailSearchV4')
    }
}
</script>