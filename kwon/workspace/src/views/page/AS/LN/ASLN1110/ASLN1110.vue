<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 대출 > 담보대출
* @ 페이지설명 : 나의자산 > 부채 > 대출 > 담보대출 상세
* @ 파일명     : src/views/page/AS/LN/ASLN1110/ASLN1110.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-05-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-13              CS515937              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>담보대출 상세</h1>
		</div>	
		<div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner">
				<div class="top_info_box_wrap">
					<div class="top_info_box type02 new_top_box fixBG hasdetail">
						<div class="box_head">
							<div class="info">
								<div class="ico">
									<i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgCNm}}</span></i><!-- -->
								</div>
                                <!-- 보험대출 -->
								<div class="title" v-if="loanType=='MORT_INSU'">
									{{isrcoLnWrsnm}}
									<div class="num">{{isrSctsNo}}<span class="bar"></span><br/>
										{{mydtAcno}}</div>
								</div>
                                <div class="title" v-else>
                                    {{acWrsnm}}
                                    <div class="num">{{mydtAcno}}</div>
                                </div>
							</div>
						</div>
                        <!-- 계좌대출잔액 컬럼명 하나로 통합 -->
						<div class="bill mt20 p-l align">
                            <span class="num counter" data-count="lnAcBac">{{lnAcBac | numberFilter}}</span><span class="text fs25">원</span>
						</div>
                        <!-- 보험담보대출은 대출금리 제공 하지 않음 -->
                        <div class="text mt6 p-l" v-if="loanType != 'MORT_INSU'">대출금리 {{aplItr | numberFilter('0,0.00', {precision: 2})}}%</div>
						<cmm-progress :startDate="lnDt" :endDate="dueDt" />
						<div class="box_toggle_wrap">
							<div class="box_toggle">
								<div class="toggle-box">
									<div data-ui-toggle="box" >									
										<div class="view-box">
											<div class="info">
												<div class="title">대출금액</div>
												<div class="num">{{acLnOgnAm | numberFilter}}원</div>
											</div>
											<!-- <div class="info">
												<div class="title">총 상환액</div>
												<div class="num">{{acLnOgnAm - lnAcBac | numberFilter}}원</div>
											</div> -->
                                            <!-- 유효한 날짜 형식이 아니면 표시하지 않음(미회신 되는 경우 포함) -->
											<div class="info" v-if="fn_isValidDate">
												<div class="title">다음이자상환일</div>
												<div class="num">{{nxIntRpyDt | dateFilter('M월D일')}}</div>
											</div>
											<div class="info">
												<div class="title">상환방식</div>
												<div class="text">{{getrpyMetcNm(rpyMetc)}}</div>
											</div>
                                            <!-- 보험대출은 자동이체 정보 없음 -->
                                            <template v-if="(auttrOrgCNm != '' && auttrRpyAcno != '') && (auttrOrgCNm != null && auttrRpyAcno != null)">
                                                <div class="info" v-if="loanType != 'MORT_INSU'">
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
            <div class="com_inner" v-if="bankInsuLoanAccountTransactionListOut.length > 0">
                <ul class="list_type_02 list_subtype02">
                    <li v-for="(item, index) in bankInsuLoanAccountTransactionListOut" :key="index">
                        <div data-ui-toggle="box" class="list_type_box">
                            <!-- 이자내역 있는 경우만 토글버튼 노출 -->
                            <button type="button" class="view_btn" :class="fn_noList(index)" aria-expanded="false">
                                <dl>
                                    <dt>
                                        <div>
                                            <!-- 보험대출은 상환정보만 있음, 일반대출은 거래유형 표시 -->
                                            <em v-if="fn_loanType">상환</em>
                                            <em v-else>{{getLnAcTrTpcNm(item.lnAcTrTpc)}}</em>
                                        </div>
                                        <span v-if="item.mydtTrDtm.length > 8">{{item.mydtTrDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span>
                                        <span v-else>{{item.mydtTrDtm | dateFilter('YYYY.MM.DD')}}</span>
                                    </dt>
                                    <dd>
                                        <!-- 보험대출과 일반대출 구분 -->
                                        <template v-if="fn_loanType">
                                            <span class="com_price" v-if="fn_rpyMethod">
                                                <em class="num">{{item.lnAmRpyAm | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </template>
                                        <template v-else>
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
                                        </template>
                                        <!-- 보험대출쪽은 이자납입이 있어도 목록을 주지 않는 경우가 있으니 이자납입금액이 있으면 일단 표시함 -->
                                        <span class="com_price" v-if="item.isrLnintPymAm > 0 || item.tramIntAm > 0">
                                            <span>이자</span>
                                            <em class="num" v-if="fn_loanType">{{item.isrLnintPymAm | numberFilter}}</em>
                                            <em class="num" v-else>{{item.tramIntAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <em class="open">열기</em><em class="close">닫기</em>
                            </button>
                        </div>
                        <!-- 이자목록 표시 -->
                        <div class="listbox_area">
                            <div class="listbox_type01" v-for="(intList,index) in item.bankInsuLoanAccountTransactionIntSubOut" :key="index">
                                <p v-if="fn_loanType">{{getIsrLnIntKdcNm(intList.isrLnIntKdc)}}</p>
                                <p v-else>{{getBnkLnIntKdcNm(intList.bnkLnIntKdc)}}</p>
                                <dl>
                                    <dt>이자계산기간</dt>
                                    <dd>{{intList.intAplStDt | dateFilter('YYYY.MM.DD')}}~{{intList.intAplEdDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl>
                                    <dt>적용이율</dt>
                                    <dd>{{intList.aplItrrt}}%</dd>
                                </dl>
                                <!-- 보험대출은 이자목록에서 이자금액을 넘겨받지 못해 표시 불가 -->
                                <dl v-if="!fn_loanType">
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
                                <span v-if="item.mydtTrDtm.length > 8">{{item.mydtTrDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span>
                                <span v-else>{{item.mydtTrDtm | dateFilter('YYYY.MM.DD')}}</span>
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
				<div class="com_btn_area02"><a href="javascript:void(0);" class="com_btn_more" @click.prevent="showMoreList()" :style="noMoreList"><span>더보기</span></a></div>
			</div>
        </div>
		<a href="javascript:void(0);" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>	
	</div>
</template>

<script>
    import apiService from '@/service/apiService'
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import CmmProgress from '@/components/CmmProgress.vue'
    import {isValidDate} from '@/utils/date'

    export default {            
        name : "ASLN1110",
        data: () => {
            return {
                // 담보대출 상세
                mydtCusno           : "",           // 마이데이터고객번호
                loanType            : "",           // 대출타입
                infOfrmnOrgC        : "",           // 정보제공자기관코드
                infOfrmnOrgCNm      : "",           // 정보제공자기관코드명
                mydtAcno            : "",           // 마이데이터계좌번호
                mydtScNo            : "",           // 마이데이터회차번호
                firMbEntDt          : "",           // 최초회원가입일자
                tmsRqmYn            : "",           // 전송요구여부
                fcAcYn              : "",           // 외화계좌여부
                acWrsnm             : "",           // 계좌상품명
                bnkAcTpDsc          : "",           // 은행계좌유형구분코드
                bnkAcStsDsc         : "",           // 은행계좌상태구분코드
                lnDt                : "",           // 대출일자
                dueDt               : "",           // 만기일자
                aplItr              : 0,            // 적용금리
                mmRpyDd             : "",           // 월상환일
                rpyMetc             : "",           // 상환방식코드
                auttrOrgC           : "",           // 자동이체기관코드
                auttrOrgCNm         : "",           // 자동이체기관코드명
                auttrRpyAcno        : "",           // 자동이체상환계좌번호
                lnAcBac             : 0,            // 대출계좌잔액
                nxIntRpyDt          : "",           // 다음이자상환일자, 만기 등 다음이자상환일 정보 없으면 마지막 이자상환일
                rcnInqDtm           : "",           // 최근조회일시
                curc                : "",           // 통화코드
                acLnOgnAm           : 0,            // 계좌대출원금액
                isrcoLnWrsnm        : "",           // 보험사대출상품명
                isrAcnoDsc          : "",           // 보험계좌번호구분코드
                acnoStsc            : "",           // 보험계좌번호상태코드
                isrSctsNo           : "",           // 보험증권번호
                pageNo              : 1,            // 페이지번호
                nxDataYn            : "",           // 다음데이터여부

                bankInsuLoanAccountTransactionListOut : [],     // 담보대출 거래내역 리스트
            }	
        },
        computed : {
            noMoreList() {
                return (this.nxDataYn == 'Y')?"":"display : none"
            },
            fn_loanType() {
                return (this.loanType == 'MORT_INSU')?true:false
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
                this.isrSctsNo      = param.isrSctsNo || ''

                this.getData();
            },
            getData() {
                // 실제 구현
                const config = {
                    url : '/as/ln/10r01',
                    data : {
                        mydtCusno       : this.mydtCusno,
                        infOfrmnOrgC    : this.infOfrmnOrgC,
                        mydtAcno        : this.mydtAcno,
                        mydtScNo        : this.mydtScNo,
                        isrSctsNo       : this.isrSctsNo,
                        loanType        : this.loanType,
                    }
                }
                apiService.call(config).then(response => {
                    this.mydtCusno      = response.mydtCusno || ''
                    this.infOfrmnOrgC   = response.infOfrmnOrgC || ''
                    this.infOfrmnOrgCNm = response.infOfrmnOrgCNm || ''
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
                    this.auttrOrgC      = response.auttrOrgC || ''
                    this.auttrRpyAcno   = response.auttrRpyAcno || ''
                    this.rcnInqDtm      = response.rcnInqDtm || ''
                    this.curc           = response.curc || ''
                    this.lnAcBac        = response.lnAcBac || 0
                    this.acLnOgnAm      = response.acLnOgnAm || 0
                    this.nxIntRpyDt     = response.nxIntRpyDt || ''
                    this.isrcoLnWrsnm   = response.isrcoLnWrsnm || ''
                    this.isrAcnoDsc     = response.isrAcnoDsc || ''
                    this.acnoStsc       = response.acnoStsc || ''
                    this.isrSctsNo      = response.isrSctsNo || ''

                    this.getTransaction();   // 거래내역 조회
                });
            },

            // 담보대출 거래내역 조회
            getTransaction() {
                const config = {
                    url : "/as/ln/10r02",
                    data : {
                        mydtCusno     : this.mydtCusno,
                        infOfrmnOrgC  : this.infOfrmnOrgC,
                        mydtAcno      : this.mydtAcno,
                        mydtScNo      : this.mydtScNo,
                        isrSctsNo     : this.isrSctsNo,
                        loanType      : this.loanType,
                        pageNo        : this.pageNo,
                    }
                }
                apiService.call(config).then(response => {
                    this.mydtCusno      = response.mydtCusno || ''
                    this.infOfrmnOrgC   = response.infOfrmnOrgC || ''
                    this.nxDataYn       = response.nxDataYn || 'N'
                    this.bankInsuLoanAccountTransactionListOut = response.bankInsuLoanAccountTransactionListOut || []

                    this.callJQueryFncExcute()
                });
            },   

            fn_noList(index) {
                return (this.bankInsuLoanAccountTransactionListOut[index].intCn > 0)?"":"no_list"
            },

            // 대출 거래유형
            getLnAcTrTpcNm(cVal) {
                let cmmLnList = this.getCodeList("LN_AC_TR_TPC")
                for(var i=0; i<cmmLnList.length; i++) {
                    if(cVal === cmmLnList[i].comnCVal) {
                        return cmmLnList[i].comnCExpl
                    }
                }
            },

            // 상환방식
            getrpyMetcNm(cVal) {
                let cmmLnList = this.getCodeList("RPY_METC")
                for(var i=0; i<cmmLnList.length; i++) {
                    if(cVal === cmmLnList[i].comnCVal) {
                        return cmmLnList[i].comnCExpl
                    }
                }
            },

            // 은행이자종류
            getBnkLnIntKdcNm(cVal) {
                let cmmLnList = this.getCodeList("BNK_LN_INT_KDC")
                
                for(var i=0; i<cmmLnList.length; i++) {
                    if(cVal === cmmLnList[i].comnCVal) {
                        return cmmLnList[i].comnCExpl
                    }
                }
            },

            // 보험이자종류
            getIsrLnIntKdcNm(cVal) {
                let cmmLnList = this.getCodeList("ISR_LN_INT_KDC")
                
                for(var i=0; i<cmmLnList.length; i++) {
                    if(cVal === cmmLnList[i].comnCVal) {
                        return cmmLnList[i].comnCExpl
                    }
                }
            },

            // 더보기
            showMoreList() {
                this.pageNo += 1
                const config = {
                    url : '/as/ln/10r02',
                    data : {
                        mydtCusno     : this.mydtCusno,
                        infOfrmnOrgC  : this.infOfrmnOrgC,
                        mydtAcno      : this.mydtAcno,
                        mydtScNo      : this.mydtScNo,
                        isrSctsNo     : this.isrSctsNo,
                        loanType      : this.loanType,
                        pageNo        : this.pageNo,
                    }
                }

                apiService.call(config).then(response => {
                    this.nxDataYn	= response.nxDataYn || ''
                    for(let i=0;i<response.bankInsuLoanAccountTransactionListOut.length;i++) {
                        this.bankInsuLoanAccountTransactionListOut.push(response.bankInsuLoanAccountTransactionListOut[i])
                    }
                })
            },
        },
        components : {
            CmmProgress
        }
}
</script>