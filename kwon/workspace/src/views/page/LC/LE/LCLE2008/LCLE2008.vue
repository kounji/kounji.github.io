<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 페이 지출내역
* @ 페이지설명 : 지출 > 지출내역 > 페이(페이머니,선불카드) 지출내역 목록 조건검색 슬라이드 팝업
* @ 파일명     : src/views/page/LC/LE/LCLE2008/LCLE2008.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-18              CS533571              최초작성
*************************************************************************/
-->
<template>
    <cmm-xps-detail-search />
</template>

<script>
import CmmXpsDetailSearch from '@/components/LC/LE/CMM/CmmXpsDetailSearchV4'
import apiService from '@/service/apiService'

export default {
    name : "LCLE2008",
    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    components: {
        CmmXpsDetailSearch
    }
}
</script>