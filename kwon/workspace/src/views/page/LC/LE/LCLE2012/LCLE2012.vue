<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 카드 지출내역 > 카드선택
* @ 페이지설명 : 지출 > 지출내역 > 카드 지출내역 > 카드선택 슬라이드 팝업
* @ 파일명     : src/views/page/LC/LE/LCLE2012/LCLE2012.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-19              CS533571              최초작성
*************************************************************************/
-->

<template>
    <cmm-xps-detail-select typeProp="CARD" subtypeProp="CARD" />
</template>

<script>
import CmmXpsDetailSelect from '@/components/LC/LE/CMM/CmmXpsDetailSelect'
import apiService from '@/service/apiService'

export default {
    name: "LCLE2012",
    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    components: {
        CmmXpsDetailSelect
    }
}
</script>