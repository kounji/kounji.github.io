<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산현황 > 보험
* @ 페이지설명 : 나의자산 > 자산현황 > 보험 특약정보(슬라이드 팝업)
* @ 파일명     : src/components/AS/IS/CMM/CmmInsuDetailContracts.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-14              CS533571              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- 슬라이드 팝업 시작 -->
        <div class="dimmed" style="display:block;" v-on:click.prevent="close()"></div>
        <div class="popup_box mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <div class="popup_header">
                    <h1>특약정보 현황</h1>
                </div>
                <div class="popup_content com_btn_bottom insur">
                    <div class="gray_box_2023">
                        <strong>가입금액 합계 <span :class="{total_price: type == TYPE_PENSION}">{{sctrEntAmSum | numberFilter}}</span>원</strong>
                    </div>

                    <ul class="list_type_2023 list_type_line">
                        <li v-for="(item, idx) in isrSctrList" :key="'isrSctr_' + idx">
                            <dl class="prodName">
                                <dt>{{item.cusIsrSctrnm}}</dt>
                                <dd></dd>
                            </dl>
                            <dl>
                                <dt>특약상태</dt>
                                <dd>{{item.isrSctrStsnm}}</dd>
                            </dl>	
                            <dl>
                                <dt>특약만기일자</dt>
                                <dd>{{item.sctrDueDt | dateFilter("YYYY.MM.DD")}}</dd>
                            </dl>	
                            <dl>
                                <dt>특약가입금액</dt>
                                <dd>{{item.sctrEntAm | numberFilter}}원</dd>
                            </dl>	
                            <dl>
                                <dt>특약유형</dt>
                                <dd>{{item.isrSctrYn == "1" ? "필수" : "선택"}}</dd>
                            </dl>	
                        </li>
                    </ul>
                </div>
                <div class="popup_footer">
                    <div class="btn_group">
                        <a href="javascript:void(0);" class="btn btn_mint" @click.prevent="close()">확인</a>
                    </div>
                </div>
                <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
            </div>
        </div>
        <!-- 슬라이드 팝업 종료 -->
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'

//보험종류
const TYPE_PERSON = 'PERSON'                          // 인보험
const TYPE_NOT_PERSON = 'NOT_PERSON'                  // 물보험
const TYPE_PENSION = 'PENSION'                        // 연금저축보험
const TYPE_INSURED_PERSON = 'INSURED_PERSON'          // 인보험
const TYPE_INSURED_NOT_PERSON = 'INSURED_NOT_PERSON'  // 물보험

export default {
    name : "CmmInsuDetailContracts",
    data: () => {
        return {
            TYPE_PERSON,
            TYPE_NOT_PERSON,
            TYPE_PENSION,
            TYPE_INSURED_PERSON,
            TYPE_INSURED_NOT_PERSON,

            infOfrmnOrgC  : "",  // 정보제공자기관코드
            isrSctsNo     : "",  // 보험증권번호
            isrKdDsc      : "",  // 보험종류구분코드

            isrSctrCn     : 0,   // 보험특약건수
            sctrEntAmSum     : 0,// 특약가입금액합계
            isrSctrList   : [],  // 보험특약정보
        }
    },
    props: ['type'],
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)
    },
    methods: {
        initComponent(param) {
            this.infOfrmnOrgC = param.infOfrmnOrgC
            this.isrSctsNo = param.isrSctsNo
            this.isrKdDsc = param.isrKdDsc

            this.getData()
        },
        getData() {
            const config = {
                url: this.getDataUrl(),
                data: {
                    mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                    infOfrmnOrgC : this.infOfrmnOrgC,             // 정보제공자기관코드
                    isrSctsNo    : this.isrSctsNo,                // 보험증권번호
                }
            };

            apiService.call(config).then(response => {
                this.sctrEntAmSum       = response.sctrEntAmSum
                this.isrSctrCn          = response.isrSctrCn
                this.isrSctrList        = response.isrSctrList || []
            })
        },
        // 각 보험 타입별 API Path
        getDataUrl() {
            let url = ''
            switch(this.type) {
                case TYPE_PERSON:
                    url = '/as/is/04r01'
                    break
                case TYPE_NOT_PERSON:
                    url = '/as/is/08r01'
                    break
                case TYPE_PENSION:
                    if(this.isrKdDsc == '30') {
                        url = '/as/is/08r01'
                    }else{
                        url = '/as/is/14r01'
                    }
                    break
                case TYPE_INSURED_PERSON:
                    url = '/as/is/17r01'
                    break
                case TYPE_INSURED_NOT_PERSON:
                    url = '/as/is/19r01'
            }
            return url
        }
    }
}
</script>