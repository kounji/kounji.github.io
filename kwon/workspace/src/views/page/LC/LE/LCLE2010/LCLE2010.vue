<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 페이 지출내역 > 페이머니 지출내역 > 상세정보
* @ 페이지설명 : 지출 > 지출내역 > 페이 지출내역 > 페이머니 지출내역 > 상세정보 슬라이드 팝업
* @ 파일명     : src/views/page/LC/LE/LCLE2014/LCLE2014.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-19              CS533571              최초작성
*************************************************************************/
-->

<template>
    <cmm-xps-detail-info typeProp="PAY" subtypeProp="PAYMONEY" />
</template>

<script>
import CmmXpsDetailInfo from '@/components/LC/LE/CMM/CmmXpsDetailInfoV4'
import apiService from '@/service/apiService'

export default {
    name: "LCLE2010",
    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    components: {
        CmmXpsDetailInfo
    }
}
</script>