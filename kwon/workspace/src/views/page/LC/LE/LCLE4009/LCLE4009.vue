<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 페이 지출내역 > 페이머니 지출내역 > 페이머니 선택
* @ 페이지설명 : 지출 > 지출내역 > 페이 지출내역 > 페이머니 지출내역 > 페이머니 선택 슬라이드 팝업
* @ 파일명     : src/views/page/LC/LE/LCLE4009/LCLE4009.vue
* @ 작성자     : CS540687
* @ 작성일     : 2025-01-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-31              CS540687              최초작성
* 2025-01-31              CS540687              마이데이터 v4.0
*************************************************************************/
-->
<template>
    <cmm-xps-detail-select typeProp="PAY" subtypeProp="PAYMONEY" />
</template>

<script>
import CmmXpsDetailSelect from '@/components/LC/LE/CMM/CmmXpsDetailSelectV4'
import apiService from '@/service/apiService'

export default {
    name: "LCLE4009",
    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    components: {
        CmmXpsDetailSelect
    }
}
</script>