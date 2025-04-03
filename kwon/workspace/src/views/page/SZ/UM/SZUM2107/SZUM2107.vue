<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 조합원 
* @ 페이지설명 : 조합원 메인-영농자금대출현황 상세내역(POP)
* @ 파일명     : src/views/page/SZ/UM/SZUM2102/SZUM2107.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-02
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-02              		                 최초작성
* 2021-08-19			 CS515939			      수정
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup"> 
		<div class="popup_header">
			<h1>신용대출 상세</h1>			
		</div>
        <div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner">
				<div class="top_info_box_wrap">
					<div class="top_info_box type02 new_top_box fixBG hasdetail">
						<div class="box_head">
							<div class="info">
								<div class="ico">
                                    <i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgCNm}}</span></i>
                                </div>
                                <div class="title">
                                    {{acWrsnm}}
                                    <div class="num">{{mydtAcno}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="bill mt20 p-l align">
                            <span class="num counter" data-count="">{{lnAcBac | numberFilter}}</span><span class="text fs25">원</span>
                        </div>
                        <div class="text mt6 p-l">대출금리 {{aplItr | numberFilter('0,0.00', {precision: 2})}}%</div>
                        <cmm-progress :startDate="lnDt" :endDate="dueDt" />
                        <div class="box_toggle_wrap">
                            <div class="box_toggle">
                                <div class="toggle-box">
                                    <div data-ui-toggle="box">
                                        <div class="view-box">
                                            <div class="info">
                                                <div class="title">대출금액</div>
                                                <div class="num">{{acLnOgnAm | numberFilter}}<span class="text">원</span></div>
                                            </div>
                                            <div class="info">
                                                <div class="title">총 상환액</div>
                                                <div class="num">{{acLnOgnAm - lnAcBac | numberFilter}}<span class="text">원</span></div>
                                            </div>
                                            <!-- 유효한 날짜 형식이 아니면 표시하지 않음(미회신 되는 경우 포함) -->
                                            <div class="info" v-if="fn_isValidDate">
                                                <div class="title">다음이자상환일</div>
                                                <div class="num">{{nxIntRpyDt | dateFilter('M월D일')}}</div>
                                            </div>
                                            <div class="info">
                                                <div class="title">상환방식</div>
                                                <div class="text">{{rpyMetcNm}}</div>
                                            </div>
                                            <template v-if="(auttrOrgCNm != '' && auttrRpyAcno != '') && (auttrOrgCNm != null && auttrRpyAcno != null)">
                                                <div class="info">
                                                    <div class="title">자동이체</div>
                                                    <div class="num right">{{auttrOrgCNm}}<br/>{{auttrRpyAcno}}</div>
                                                </div>
                                            </template>
                                        </div>
                                        <button type="button" class="view-btn" aria-expanded="false">
                                            <em class="open">열기</em><em class="close">닫기</em>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>               
                </div>
            </div>
            <!-- 이자내역 토글박스 형태로 제공 -->
            <div class="com_inner" v-if="bankLoanAccountTransactionListOut.length > 0">
                <ul class="list_type_02 list_subtype02">
                    <li v-for="(item, index) in bankLoanAccountTransactionListOut" :key="index">
                        <div data-ui-toggle="box" class="list_type_box">
                            <!-- 이자내역 있는 경우만 토글버튼 노출 -->
                            <button class="view_btn" :class="fn_noList(index)" aria-expanded="false">
                                <dl>
                                    <dt>
                                        <div>
                                            <em>{{item.lnAcTrTpcNm}}</em>
                                        </div>
                                        <span>{{item.trDt | dateFilter('YYYY.MM.DD')}}</span>
                                    </dt>
                                    <dd>
                                        <!-- 상환인 경우 거래금액 중 원금으로 표시 -->
                                        <template v-if="item.lnAcTrTpc == '02'">
                                            <!-- 만기일시상환, 한도거래, 기타의 경우는 원금표시하지 않음 -->
                                            <span class="com_price" v-if="fn_rpyMethod">
                                                <em class="num">{{item.tramOgnAm | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </template>
                                        <!-- 상환이 아닌 경우 거래금액으로 표시 -->
                                        <template v-else>
                                            <span class="com_price">
                                                <em class="num">{{item.lnAcTram | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </template>
                                        <span class="com_price" v-if="item.intCn > 0">
                                            <!-- 만기일시상환의 경우 이자만 납입하다가 원금을 납입하며 종료함 -->
                                            <!-- 그럴경우 이자가 어느 항목으로 들어오는지 확인 필요, 일단은 이쪽으로 붙임 -->
                                            <span>이자</span>
                                            <em class="num">{{item.tramIntAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <em class="open">열기</em><em class="close">닫기</em>
                            </button>
                        </div>
                        <!-- 이자목록 표시 -->
                        <div class="listbox_area">
                            <div class="listbox_type01" v-for="(intList,index) in item.bankLoanAccountTransactionIntOut" :key="index">
                                <p>{{intList.bnkLnIntKdcNm}}</p>
                                <dl>
                                    <dt>이자계산기간</dt>
                                    <dd>{{intList.intAplStDt | dateFilter('YYYY.MM.DD')}} ~ {{intList.intAplEdDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl>
                                    <dt>적용이율</dt>
                                    <dd>{{intList.aplItrrt}}%</dd>
                                </dl>
                                <dl>
                                    <dt>납입금액</dt>
                                    <dd>{{intList.intAm | numberFilter}}<em>원</em></dd>
                                </dl>
                            </div>
                        </div>
                        <!-- 환출이자 존재하면 표시 -->
                        <dl class="list_depth2" v-if="item.touIntAm > 0">
                            <dt>
                                <div>
                                    <em>환출이자</em>
                                </div>
                                <span>{{item.trDt | dateFilter('YYYY.MM.DD')}}</span>
                            </dt>
                            <dd>
                                <span class="com_price">
                                    <em class="num">{{item.touIntAm | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <div class="no_data_box" v-else>
                <!-- 데이터 없을때 -->
                <div class="no_data_list">
                    <p>조회된 정보가 없습니다.</p>
                </div>
                <!--// 데이터 없을때 -->
            </div>
            <div class="com_inner">
				<div class="com_btn_area02"><a href="javascript:void();" class="com_btn_more" @click.prevent="showMoreList()" :style="noMoreList"><span>더보기</span></a></div>
			</div>
        </div>
		<a href="javascript:void();" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>	
	</div>
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import CmmProgress from '@/components/CmmProgress.vue'
import {dateFormat} from '@/utils/date'
import {getOrgnm} from '@/utils/data'
import {isValidDate} from '@/utils/date'

export default {
    name : "SZUM2107",
    data: () => {
        return {
            // 신용대출 상세
            mydtCusno       : "",       // 마이데이터고객번호
            loanType        : "",       // 대출타입
            infOfrmnOrgC    : "",       // 정보제공자기관코드
            infOfrmnOrgCNm  : "",       // 정보제공자기관코드명
            mydtAcno        : "",       // 마이데이터계좌번호
            mydtScNo        : "",       // 마이데이터회차번호
            firMbEntDt      : "",       // 최초회원가입일자
            tmsRqmYn        : "",       // 전송요구여부
            fcAcYn          : "",       // 외화계좌여부
            acWrsnm         : "",       // 계좌상품명
            bnkAcTpDsc      : "",       // 은행계좌유형구분코드
            bnkAcStsDsc     : "",       // 은행계좌상태구분코드
            lnDt            : "",       // 대출일자
            dueDt           : "",       // 만기일자
            aplItr          : 0,        // 적용금리
            mmRpyDd         : "",       // 월상환일
            rpyMetc         : "",       // 상환방식코드
            rpyMetcNm       : "",       // 상환방식코드명
            auttrOrgC       : "",       // 자동이체기관코드
            auttrOrgCNm     : "",       // 자동이체기관코드명
            auttrRpyAcno    : "",       // 자동이체상환계좌번호
            lnAcBac         : 0,        // 대출계좌잔액
            nxIntRpyDt      : "",       // 다음이자상환일자, 만기 등 다음이자상환일 정보 없으면 마지막 이자상환일
            rcnInqDtm       : "",       // 최근조회일시
            acLnOgnAm       : 0,        // 계좌대출원금액
            pageNo          : 1,        // 페이지번호
            nxDataYn        : "",       // 다음데이터여부
            intCn           : 0,        // 이자목록수

            bankLoanAccountTransactionListOut : [], // 은행대출계좌거래내역Out
        }	
    },
    computed : {
        noMoreList() {
            return (this.nxDataYn == 'N')?"display : none":""
        },
        fn_rpyMethod() {
            return (this.rpyMetc == '01' || this.rpyMetc == '08' || this.rpyMetc == '09')?false:true
        },
        fn_isValidDate() {
            return isValidDate(this.nxIntRpyDt)
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)
        dateFormat()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param) {
            this.mydtCusno      = param.mydtCusno || ''
            this.loanType       = param.loanType || ''
            this.infOfrmnOrgC   = param.infOfrmnOrgC || ''
            this.mydtAcno       = param.mydtAcno || ''
            this.mydtScNo       = param.mydtScNo || ''

            this.getData();
        },
        getData() {
            // 최초조회
            const config = {
                url: '/sz/um/08r01',
                data: {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : this.infOfrmnOrgC,
                    mydtAcno        : this.mydtAcno,
                    mydtScNo        : this.mydtScNo,
                }
            };
            apiService.call(config).then(response => {
                this.mydtCusno      = response.mydtCusno || ''
                this.infOfrmnOrgC   = response.infOfrmnOrgC || ''
                this.infOfrmnOrgCNm = getOrgnm(response.infOfrmnOrgCNm)  || ''
                this.mydtAcno       = response.mydtAcno || ''
                this.mydtScNo       = response.mydtScNo || ''
                this.firMbEntDt     = response.firMbEntDt || ''
                this.tmsRqmYn       = response.tmsRqmYn || ''
                this.fcAcYn         = response.fcAcYn || ''
                this.acWrsnm        = response.acWrsnm || ''
                this.bnkAcTpDsc     = response.bnkAcTpDsc || ''
                this.bnkAcStsDsc    = response.bnkAcStsDsc || ''
                this.lnDt           = response.lnDt || ''
                this.dueDt          = response.dueDt || ''
                this.aplItr         = response.aplItr || 0
                this.mmRpyDd        = response.mmRpyDd || ''
                this.rpyMetc        = response.rpyMetc || ''
                this.rpyMetcNm      = response.rpyMetcNm || ''
                this.auttrOrgC      = response.auttrOrgC || ''
                this.auttrOrgCNm    = response.auttrOrgCNm || ''
                this.auttrRpyAcno   = response.auttrRpyAcno || ''
                this.rcnInqDtm      = response.rcnInqDtm || ''
                this.curc           = response.curc || ''
                this.lnAcBac        = response.lnAcBac || 0
                this.acLnOgnAm      = response.acLnOgnAm || 0
                this.nxIntRpyDt     = response.nxIntRpyDt || ''
                this.acnoStsc       = response.acnoStsc || ''
				this.nxDataYn       = response.nxDataYn || 'N'
                    
                this.bankLoanAccountTransactionListOut = response.bankLoanAccountTransactionListOut || []

                this.callJQueryFncExcute()
            });

        },

        // 거래내역 중 이자내역 유무에 따른 토글버튼 표시/미표시 클래스 바인딩
        fn_noList(index) {
            return (this.bankLoanAccountTransactionListOut[index].intCn > 0)?"":"no_list"
        },

        // 더보기
        showMoreList() {
            this.pageNo += 1
            const config = {
                url : '/sz/um/08r01',
                data : {
                    mydtCusno     : this.mydtCusno,
                    infOfrmnOrgC  : this.infOfrmnOrgC,
                    mydtAcno      : this.mydtAcno,
                    mydtScNo      : this.mydtScNo,
                    pageNo        : this.pageNo,
                }
            }

            apiService.call(config).then(response => {
                this.nxDataYn	= response.nxDataYn || 'N'
                for(let i=0;i<response.bankLoanAccountTransactionListOut.length;i++) {
                    this.bankLoanAccountTransactionListOut.push(response.bankLoanAccountTransactionListOut[i])
                }
            })
        },
    },
    components : {
        CmmProgress
    },
}
</script>