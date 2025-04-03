<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 카드,페이머니,선불카드 지출내역 > 상세
* @ 페이지설명 : 지출 > 지출내역 > 카드,페이머니,선불카드 지출내역 > 상세 > 선불카드 항목들
* @ 파일명     : src/components/LC/LE/CMM/CmmXpsDetailInfoPpay.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-20
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-20              CS533571                 최초작성
*************************************************************************/
-->
<template>
    <div class="com_txt_type01">
        <dl>
            <dt>이용금액</dt>
            <dd>
                <span class="com_number01" v-if="info.stlStsc == '03'">{{info.crcAm | numberFilter}}</span>
                <span class="com_number01" v-else>{{info.cdUgUsAm | numberFilter}}</span>
                <em>원</em>
            </dd>
        </dl>
        <dl v-if="info.allIstSc > 1">
            <dt>전체할부회차</dt>
            <dd>
                <span class="com_number01">{{info.allIstSc}}</span>
            </dd>
        </dl>
        <dl>
            <dt>승인번호</dt>
            <dd>
                <span class="com_number01">{{info.cdApvno}}</span>
            </dd>
        </dl>
        <dl>
            <dt>결제상태</dt>
            <dd>
                <span>{{info.stlStscNm}}</span>
            </dd>
        </dl>
        <dl v-if="info.mydtMchtBzno">
            <dt>사업자등록번호</dt>
            <dd>
                <span class="com_number01">{{info.mydtMchtBzno}}</span>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
    name: "CmmXpsDetailInfoPpaycardV4",
    props: ['info']
}
</script>