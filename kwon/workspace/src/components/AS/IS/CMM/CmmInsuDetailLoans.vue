<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산현황 > 보험
* @ 페이지설명 : 나의자산 > 자산현황 > 보험 대출정보(팝업)
* @ 파일명     : src/components/AS/IS/CMM/CmmInsuDetailLoans.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-14              CS533571              최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
    <div class="full_popup mydata2023" id="full_popup_01"> 
        <div class="popup_header">
            <h1>대출정보</h1>
        </div>	
        <div class="popup_content com_space_bottom com_bg_type00">
            <div class="com_inner insur">
                <div class="com_btnselectbox_type01 custom_box">
                    <button type="button" class="com_btnselect_type01" :title="mydtAcno" @click.prevent="openAcnoSlidePopup"><span>{{mydtAcno}}</span></button>
                </div>
                
                <ul class="list_type_2023 list_type_line loanDtl">
                    <li>
                        <dl class="prodName">
                            <dt>대출 잔액 <b>{{lnAcBac | numberFilter}}</b>원</dt>
                            <dd></dd>
                        </dl>
                        <dl>
                            <dt>대출일</dt>
                            <dd class="num">{{lnDt | dateFilter("YYYY.MM.DD")}}</dd>
                        </dl>
                        <dl>
                            <dt>만기일</dt>
                            <dd class="num">{{dueDt | dateFilter("YYYY.MM.DD")}}</dd>
                        </dl>
                        <dl>
                            <dt>대출원금</dt>
                            <dd><em class="num">{{acLnOgnAm | numberFilter}}</em>원</dd>
                        </dl>
                        <dl>
                            <dt>상환방식</dt>
                            <dd>{{rpyMetnm}}</dd>
                        </dl>
                        <dl v-if="IsrPymAcno">
                            <dt>납입계좌번호(자동이체)</dt>
                            <dd>
                                <p>{{IsrPymAcno}}</p>
                                <p v-if="pymOrgnm">({{pymOrgnm}})</p>
                            </dd>
                        </dl>
                        <dl>
                            <dt>월상환일</dt>
                            <dd>{{mmRpyDd}}일</dd>
                        </dl>
                        <dl>
                            <dt>다음 이자 상환일</dt>
                            <dd>{{nxIntRpyDt | dateFilter("YYYY.MM.DD")}}</dd>
                        </dl>
                    </li>
                </ul>
                <div class="asset_more_list loanDtl">
                    <div class="list_title">대출 내역</div>
                    <ul>
                        <li v-if="isrLoanCn > 0">
                            <template v-for="(item, idx) in isrLoanList">
                                <dl class="breakdown" :key="'loan_header_' + idx">
                                    <dt>{{item.mydtTrDtm | dateFilter("YYYY.MM.DD")}}<br>{{item.mydtTrDtm | dateFilter("HH:mm:ss")}}</dt>
                                    <dd>{{(item.lnPrnRpyAm + item.isrLnintPymAm) | numberFilter}}원</dd>
                                </dl>
                                <dl :key="'loan_detail_' + idx">
                                    <dt></dt>
                                    <dd>
                                        <p>대출원금상환액  <em>{{item.lnPrnRpyAm | numberFilter}}</em>원</p>
                                        <p>이자 납입액  <em>{{item.isrLnintPymAm | numberFilter}}</em>원</p>
                                    </dd>
                                </dl>
                            </template>
                        </li>
                        <li v-else>
                            <div class="no_data_box no_data_box01 grayExclamationType">
                                <div class="no_data_list">
                                    <p class="txt_sub">조회된 정보가 없습니다.</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <a href="javascript:void(0);" role="button" class="com_btn_more" @click.prevent="showMoreList()" :style="noMoreList"><span>더보기</span></a>
            </div>
            
        </div>

        <a href="javascript:void(0);" class="btn_close" @click.prevent="close(true)"><span class="blind">팝업닫기</span></a>
    </div>
    <!-- //전체 팝업 종료 -->
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import ASIS2022 from '@/views/page/AS/IS/ASIS2022/ASIS2022'
import ASIS2023 from '@/views/page/AS/IS/ASIS2023/ASIS2023'
import ASIS2024 from '@/views/page/AS/IS/ASIS2024/ASIS2024'

//보험종류
const TYPE_PERSON = 'PERSON';          // 인보험
const TYPE_NOT_PERSON = 'NOT_PERSON';  // 물보험
const TYPE_PENSION = 'PENSION';        // 연금저축보험

export default {
    name : "CmmInsuDetailLoans",
    data: () => {
        return {
            TYPE_PERSON,
            TYPE_NOT_PERSON,
            TYPE_PENSION,
            infOfrmnOrgC: "",       // 정보제공자기관코드
            infOfrmnOrgnm: "",      // 정보제공자기관명
            isrSctsNo: "",          // 보험증권번호
            mydtAcno: "",           // 마이데이터계좌번호
            isrKdDsc: "",           // 보험종류구분코드

            lnAcBac: 0,             // 대출계좌잔액
            lnDt: "",               // 대출일자
            dueDt: "",              // 만기일자
            acLnOgnAm: 0,           // 대출원금
            rpyMetnm: "",           // 상환방식명
            IsrPymAcno: "",         // 보험납입계좌번호
            pymOrgnm: "",           // 납입기관명
            mmRpyDd: "",            // 월상환일
            nxIntRpyDt: "",         // 다음이자상환일자

            isrLoanAcnoCn: 0,       // 대출계좌건수
            isrLoanAcnoList: [],    // 대출계좌목록

            isrLoanCn: 0,           // 대출상환내역건수
            isrLoanList: [],        // 대출상환내역목록
            
            pageNum       : 0,      // 페이지
            pageCount     : 0,      // 페이지수
            nxDataYn      : ""      // 더보기여부
        }
    },
    computed: {
        noMoreList() {
            return (this.nxDataYn == 'Y')?"":"display : none"
        }
    },
    props: ['type'],
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params);
    },
    methods: {
        initComponent(param) {
            this.infOfrmnOrgC = param.infOfrmnOrgC
            this.isrSctsNo = param.isrSctsNo
            this.isrLoanAcnoCn = param.isrLoanAcnoCn
            this.isrLoanAcnoList = param.isrLoanAcnoList
            if(param.isrLoanAcnoList && param.isrLoanAcnoList.length > 0) {
                this.mydtAcno = param.isrLoanAcnoList[0].mydtAcno
            }
            this.isrKdDsc = param.isrKdDsc

            this.getData();
        },
        getData() {
            const config = {
                url: this.getDataUrl(),
                data: {
                    mydtCusno: this.getUserInfo('mydtCusno'), // 고객번호
                    infOfrmnOrgC: this.infOfrmnOrgC,          // 정보제공자기관코드
                    isrSctsNo: this.isrSctsNo,                // 보험증권번호
                    mydtAcno: this.mydtAcno,                  // 마이데이터계좌번호
                    pageNum: this.pageNum + 1
                }
            };

            apiService.call(config).then(response => {
                this.infOfrmnOrgC  = response.infOfrmnOrgC;
                this.infOfrmnOrgnm = response.infOfrmnOrgnm;
                this.isrSctsNo     = response.isrSctsNo;
                
                this.lnAcBac = response.lnAcBac;
                this.lnDt = response.lnDt;
                this.dueDt = response.dueDt;
                this.acLnOgnAm = response.acLnOgnAm;
                this.rpyMetnm = response.rpyMetnm;
                this.IsrPymAcno = response.IsrPymAcno;
                this.pymOrgnm = response.pymOrgnm;
                this.mmRpyDd = response.mmRpyDd;
                this.nxIntRpyDt = response.nxIntRpyDt;

                this.isrLoanCn = response.isrLoanCn;
                this.pageNum = response.pageNum;
                this.pageCount = response.pageCount;

                this.assignIsrLoan(response.isrLoanList, this.pageCount);
                if(response.isrLoanCn > this.pageCount) {
                    this.nxDataYn   = "Y";
                }else{
                    this.nxDataYn   = "N";
                }
            });
        },
        // 각 보험 타입별 API Path
        getDataUrl() {
            let url = '';
            switch(this.type) {
                case TYPE_PERSON:
                    url = '/as/is/05r01'
                    break
                case TYPE_NOT_PERSON:
                    url = '/as/is/09r01'
                    break
                case TYPE_PENSION:
                    if(this.isrKdDsc == '30') {
                        url = '/as/is/09r01'
                    }else{
                        url = '/as/is/15r01'
                    }
                    break
            }
            return url;
        },
        // 더보기
        showMoreList() {
            const config = {
                url : this.getDataUrl(),
                data: {
                    mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                    infOfrmnOrgC : this.infOfrmnOrgC,             // 정보제공자기관코드
                    isrSctsNo    : this.isrSctsNo,                // 보험증권번호
                    mydtAcno     : this.mydtAcno,                  // 마이데이터계좌번호
                    pageNum      : this.pageNum + 1
                }
            }

            apiService.call(config).then(response => {
                this.pageCount      = response.pageCount;
                this.pageNum        = response.pageNum;
                
                this.assignIsrLoan(response.isrLoanList, this.pageCount);
                if(response.isrLoanCn > response.pageCount) {
                    this.nxDataYn   = "Y";
                }else{
                    this.nxDataYn   = "N";
                }
            })
        },
        assignIsrLoan(resIsrLoanList, pageCount) {
            if(resIsrLoanList) {
                for(let i=0; i<resIsrLoanList.length; i++) {
                    if(i < pageCount) {
                        this.isrLoanList.push(resIsrLoanList[i]);
                        this.isrLoanCn++;
                    }
                }
            }
        },
        // 선택 슬라이드팝업.
        openAcnoSlidePopup() {
            const config = {
                params : {
                    list   : this.isrLoanAcnoList,
                    selectVal: this.mydtAcno
                },
                renderer: {
                    component: this.getSelectComponent(),
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.mydtAcno = response.mydtAcno
                this.pageNum = 0
                this.isrLoanCn = 0
                this.isrLoanList = []

                this.getData();
            })
        },
        // 결제내역 선택 슬라이드 팝업 화면 ID
        getSelectComponent() {
            let component = '';
            switch(this.type) {
                case TYPE_PERSON:
                    component = ASIS2022
                    break
                case TYPE_NOT_PERSON:
                    component = ASIS2023
                    break
                case TYPE_PENSION:
                    component = ASIS2024
                    break
            }
            
            return component
        }
    }
}
</script>