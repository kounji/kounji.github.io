<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 카드 지출내역
* @ 페이지설명 : 지출 > 지출내역 > 카드 지출내역 목록
* @ 파일명     : src/views/page/LC/LE/LCLE4002/LCLE4002.vue
* @ 작성자     : CS540687
* @ 작성일     : 2025-01-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-31              CS540687              최초작성
***************************************************************************/
-->
<template>
    <cmm-xps-detail typeProp="CARD" subtypeProp="CARD" v-bind:isSrchProp="false" />
</template>

<script>
import apiService from '@/service/apiService'

export default {
    name : "LCLE4002",
    mounted() {

        console.log("this.$options.name====>", this.$options.name)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    components: {
        CmmXpsDetail: () => import('@/components/LC/LE/CMM/CmmXpsDetailV4')
    }
}
</script>
 