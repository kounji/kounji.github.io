<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 카드,페이머니,선불카드 지출내역 > 상세
* @ 페이지설명 : 지출 > 지출내역 > 카드,페이머니,선불카드 지출내역 > 상세 > 페이머니 항목들
* @ 파일명     : src/components/LC/LE/CMM/CmmXpsDetailInfoPaymoney.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-20
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-20              CS533571                 최초작성
*************************************************************************/
-->
<template>
    <ul class="list_type_2023 card_details">
        <li>
            <dl>
                <dt>거래유형</dt>
                <dd>{{info.eltFncPpayTrTpcNm}}</dd>
            </dl>
            <dl>
                <dt>거래금액</dt>
                <dd><span class="num">{{info.ppayTram | numberFilter}}</span>원</dd>
            </dl>
            <dl>
                <dt>거래후잔액</dt>
                <dd><span class="num">{{info.acTrafBac | numberFilter}}</span>원</dd>
            </dl>
            <dl>
                <dt>거래상대 기관</dt>
                <dd>{{info.auttrOrgCNm}}</dd>
            </dl>
            <dl>
                <dt>거래상대 식별값</dt>
                <dd class="num">{{maskAcnoIdVal(info.acnoIdVal)}}</dd>
            </dl>
            <dl>
                <dt>사업자등록번호</dt>
                <dd class="num">{{info.mydtMchtBzno}}</dd>
            </dl>
            <dl>
                <dt>주문번호</dt>
                <dd class="num">{{info.eltfncOrrNo}}</dd>
            </dl>
            <dl v-if="info.trMemoCntn">
                <dt>거래메모</dt>
                <dd>{{info.trMemoCntn}}</dd>
            </dl>
            <dl v-if="info.eltfncWrsnm">
                <dt>상품명</dt>
                <dd>{{info.eltfncWrsnm}}</dd>
            </dl>
            <dl v-if="info.wrsCfcNm">
                <dt>상품 분류</dt>
                <dd>{{info.wrsCfcNm}}</dd>
            </dl>
            <dl v-if="info.eltfncStlMethcNm">
                <dt>결제방법</dt>
                <dd>{{info.eltfncStlMethcNm}}</dd>
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
    name: 'CmmXpsDetailInfoPaymoney',
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