<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 보험
* @ 페이지설명 : 나의자산 > 자산 > 자동차 보험 보험 담보별 보장 정보(POP)
* @ 파일명     : src/views/page/AS/IS/ASIS2011/ASIS2011.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533571              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- 슬라이드 팝업 시작 -->
        <div v-on:click.prevent="close()" class="dimmed" style="display:block;"></div>
        <div class="popup_box mydata2023"><!-- 0803 .mydata2023 클래스 이동-->
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <div class="popup_header">
                    <h1>보험 담보별 보장 정보</h1>
                </div>
                <div class="popup_content com_btn_bottom insur">
                    <div class="gray_box_2023">
                        가입금액 합계 <span class="total_price">{{isrPymIsrfeSum | numberFilter}}원</span>
                    </div>

                    <ul v-if="isrMggCntnCn > 0" class="list_type_2023 list_type_line">
                        <li v-for="(item, idx) in isrMggCntnList" :key="'isrMgg' + idx">
                            <dl class="prodName">
                                <dt>{{item.coMggnm}}</dt>
                                <dd></dd>
                            </dl>
                            <dl>
                                <dt>담보상태</dt>
                                <dd>{{item.mggStscnm}}</dd>
                            </dl>
                            <dl>
                                <dt>담보시작일자</dt>
                                <dd class="num">{{item.mggStDt | dateFilter('YYYY.MM.DD')}}</dd>
                            </dl>
                            <dl>
                                <dt>담보종료일자</dt>
                                <dd class="num">{{item.mggEdDt | dateFilter('YYYY.MM.DD')}}</dd>
                            </dl>
                            <dl v-if="item.atisrCtrmnRelCnm">
                                <dt>피보험자계약자관계</dt>
                                <dd>{{item.atisrCtrmnRelCnm }}</dd>
                            </dl>
                            <dl>
                                <dt>보장금액</dt>
                                <dd><em class="num">{{item.grntMggAm | numberFilter}}</em>원</dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="popup_footer">
                    <div class="btn_group">
                        <a v-on:click.prevent="close()" href="javascript:void(0);" class="btn btn_mint">확인</a>
                    </div>
                </div>
                <a v-on:click.prevent="close()" href="javascript:void(0);" class="btn_close"><span class="">취소</span></a>
            </div>
        </div>
        <!--// 슬라이드 팝업 종료 -->
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'

export default {
    name : "ASIS2011",
    data: () => {
        return {
            infOfrmnOrgC    : "",  // 정보제공자기관코드
            infOfrmnOrgnm   : "",  // 정보제공자기관명
            isrSctsNo       : "",  // 보험증권번호
            isrPymIsrfeSum  : 0,   // 보장 금액 합계
            isrMggCntnCn    : 0,  // 담보목록 건수
            isrMggCntnList  : [],  // 담보목록
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params);

        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    methods: {
        initComponent(param) {
            this.infOfrmnOrgC = param.infOfrmnOrgC;
            this.isrSctsNo = param.isrSctsNo;
            this.isrPymIsrfeSum = param.isrPymIsrfeSum,    // 보장 금액 합계
            this.isrMggCntnCn = param.isrMggCntnCn,        // 담보목록 건수
            this.isrMggCntnList = param.isrMggCntnList     // 담보목록
        }
    }
}
</script>