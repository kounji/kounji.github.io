<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 카드,페이머니,선불카드,선불 지출내역 > 상세
* @ 페이지설명 : 지출 > 지출내역 > 카드,페이머니,선불카드,선불 지출내역 > 상세 선불 항목들
* @ 파일명     : src/components/LC/LE/CMM/CmmXpsDetailInfoPpay.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-23              CS533571                 최초작성
*************************************************************************/
-->
<template>
    <ul class="list_type_2023 card_details">
        <li>
            <dl>
                <dt>가맹점명</dt>
                <dd>{{info.prcMchtnm}}</dd>
            </dl>
            <dl>
                <dt>주문번호</dt>
                <dd class="num">{{info.eltfncOrrNo}}</dd>
            </dl>
            <dl>
                <dt>거래금액</dt>
                <dd><span class="num">{{info.eltfncStlAm | numberFilter}}</span>원</dd>
            </dl>
            <dl>
                <dt>통화코드</dt>
                <dd>{{info.curc}}({{info.curcNm}})</dd>
            </dl>
            <dl>
                <dt>결제수단</dt>
                <dd>{{info.eltFncStlTrTpcNm}}</dd>
            </dl>
            <dl v-if="info.stlMnsOrgCNm">
                <dt>거래기관</dt>
                <dd>{{info.stlMnsOrgCNm}}</dd>
            </dl>
            <dl v-if="info.acnoIdVal">
                <dt>결제수단</dt>
                <dd class="num">{{info.acnoIdVal}}</dd>
            </dl>
            <dl>
                <dt>할부개월</dt>
                <dd>{{info.mydtIstMtcn}}</dd>
            </dl>
            <dl>
                <dt>결제방법</dt>
                <dd>{{info.eltfncStlMethcNm}}</dd>
            </dl>
            <dl>
                <dt>사업자등록번호</dt>
                <dd class="num">{{info.eltfncStlMethcNm}}</dd>
            </dl>
            <dl>
                <dt>정기결제여부</dt>
                <dd>{{fxtmStlYnStr(info.fxtmStlYn)}}</dd>
            </dl>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'CmmXpsDetailInfoPpayV4',
    props: ['info'],
    methods: {
        maskAcnoIdVal(val) {
            if(val != undefined) {
                const ch = '*'
                let start = 4
                let end   = 8
                if(end > val.length) {
                    end = val.length
                }
    
                let temp = ''
                temp = val.substring(0, start)
                for (let i=start; i< end; i++)
                {
                    temp += ch
                }
                temp += val.substring(end, val.length)
                return temp
            }

            return ''
        },
        fxtmStlYnStr(fxtmStlYn) {
            return fxtmStlYn == 'Y' ? '예' : '아니오'
        }
    }
}
</script>