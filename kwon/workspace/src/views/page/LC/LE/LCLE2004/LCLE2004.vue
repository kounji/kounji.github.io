<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 페이 지출내역 > 선불카드 지출내역
* @ 페이지설명 : 지출 > 지출내역 > 페이 지출내역 > 선불카드 지출내역 목록
* @ 파일명     : src/views/page/LC/LE/LCLE2004/LCLE2004.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533571              최초작성
*************************************************************************/
-->
<template>
    <cmm-xps-detail typeProp="PAY" subtypeProp="PPAYCARD" v-bind:isSrchProp="false" />
</template>

<script>
import apiService from '@/service/apiService'

export default {
    name : "LCLE2004",
    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    components: {
        CmmXpsDetail: () => import('@/components/LC/LE/CMM/CmmXpsDetailV4')
    }
}
</script>