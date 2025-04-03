<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 선불결제내역 > 상세정보
* @ 페이지설명 : 지출 > 지출내역 > 선불결제내역 > 상세정보 슬라이드 팝업
* @ 파일명     : src/views/page/LC/LE/LCLE4015/LCLE4015.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-26              CS533571              최초작성
* 2025-01-31              CS540687              마이데이터 v4.0
*************************************************************************/
-->

<template>
    <cmm-xps-detail-info typeProp="PPAY" subtypeProp="PPAY" />
</template>

<script>
import CmmXpsDetailInfo from '@/components/LC/LE/CMM/CmmXpsDetailInfoV4'
import apiService from '@/service/apiService'

export default {
    name: "LCLE4015",
    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    components: {
        CmmXpsDetailInfo
    }
}
</script>