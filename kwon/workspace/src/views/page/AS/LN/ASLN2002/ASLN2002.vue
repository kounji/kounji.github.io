<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 대출 > 담보대출
* @ 페이지설명 : 나의자산 > 부채 > 대출 > 담보대출 상세
* @ 파일명     : src/views/page/AS/LN/ASLN2002/ASLN2002.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-05-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-13              CS515937              최초작성
* 2023-07-11              CS533437              화면 ID 변경 ASLN1110 -> ASLN2002
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>담보대출</h1>
		</div>	
		<div class="popup_content com_space_bottom com_bg_type00">
				
			<div class="asset_info_box">
				<div class="com_inner long_term_info">
					<div class="asset_info_wrap">
						<div class="asset_info">
							<dl>
								<dt>{{acWrsnm}}</dt>
								<dd>
									<span class="account_num">{{mydtAcno}}</span>
								</dd>
							</dl>
							<div class="bank_icon">
								<i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgCNm}}</span></i>                                                               
							</div>
						</div>

						<div class="asset_price_wrap">
							<div class="amount">대출금리 <span class="pointColor green">{{aplItr}}%</span></div>
							<div class="asset_price">
								<span class="num counter" data-count="lnAcBac">{{lnAcBac | numberFilter}}</span>원
							</div>
						</div>

						<!-- progressBar -->
                        <cmm-progress :startDate="lnDt" :endDate="dueDt"/>
						<!-- //progressBar -->
					</div>

					<div class="asset_detail">
						<ul class="list_type_2023">
							<li>
								<dl>
									<dt>대출원금</dt>
									<dd><em class="num">{{acLnOgnAm | numberFilter}}</em>원</dd>
								</dl>
								<dl>
									<dt>대출일</dt>
									<dd class="num">{{lnDt | dateFilter}}</dd>
								</dl>
								<dl>
									<dt>만기일</dt>
									<dd class="num">{{dueDt | dateFilter}}</dd>
								</dl>
								<dl>
									<dt>최종적용금리</dt>
									<dd><em class="num">{{aplItr}}</em>%</dd>
								</dl>	
								<dl>
									<dt>상환방식</dt>
									<dd>{{rpyMetcNm}}</dd>
								</dl>	
								<dl>
									<dt>월상환일</dt>
									<dd>{{mmRpyDd}}일</dd>
								</dl>	
								<dl>
									<dt>다음이자 상환일</dt>
									<dd class="num">{{nxIntRpyDt | dateFilter}}</dd>
								</dl>
								<dl>
									<dt>자동이체</dt>
									<dd>{{auttrOrgCNm}}</dd>
								</dl>	
								<dl>
									<dt>상환계좌번호</dt>
									<dd class="num">{{auttrRpyAcno}}</dd>
								</dl>
								<dl>									
									<dt>거치기간</dt>									
									<dd class="num">{{dfprdStYm}}{{dfprdEdYm}}</dd>									
								</dl>
							</li>
						</ul>
					</div>
				</div>

				<button type="button" class="btn_view_detail">더보기</button>
			</div>

			<!-- <div class="com_inner"  -->
			<div class="com_inner" v-if="bankInsuLoanAccountTransactionListOut.length > 0">
			
				<div class="asset_more_list no_line loan">
					<ul>
						<template v-for="(item, index) in bankInsuLoanAccountTransactionListOut">
							<li v-if="item.bankInsuLoanAccountTransactionIntSubOut && item.bankInsuLoanAccountTransactionIntSubOut.length > 0"  :key="'tran1_' + index" class="asset_more_toggle">							
								<div data-ui-toggle="box" class="list_type_box">
									<button type="button" class="view_btn" aria-expanded="false">									
										<dl class="breakdown toggle_btn">		
											<dt>
												<em v-if="fn_loanType">상환</em> 
												<em v-else>{{getLnAcTrTpcNm(item.lnAcTrTpc)}}</em>									
											</dt>
											
											<dd>
												<em class="num">{{item.lnAcTram | numberFilter}}원</em>
												<!-- 23.09.26 구분없이 대출원금상환액, 이자 납입액, 거래금액 모두 보여주는 걸로 -->
												<!-- 보험대출과 일반대출 구분 												
												<template v-if="fn_loanType">
													<span class="com_price" v-if="fn_rpyMethod">
														<em class="num">{{item.lnAmRpyAm | numberFilter}}</em>
														<em class="unit">원</em>
													</span>
												</template>
												<template v-else>
													//상환인 경우 거래금액 중 원금으로 표시 
													<template v-if="item.lnAcTrTpc == '02'">
														//만기일시상환, 한도거래, 기타의 경우는 원금표시하지 않음 
														<span class="com_price" v-if="fn_rpyMethod">
															<em class="num">{{item.tramOgnAm | numberFilter}}</em>
															<em class="unit">원</em>
														</span>
													</template>
														//상환이 아닌 경우 거래금액으로 표시
													<template v-else>
														<span class="com_price">
															<em class="num">{{item.lnAcTram | numberFilter}}</em>
															<em class="unit">원</em>
														</span>
													</template>
												</template>
												//보험대출쪽은 이자납입이 있어도 목록을 주지 않는 경우가 있으니 이자납입금액이 있으면 일단 표시함 
												//<span class="com_price" v-if="item.isrLnintPymAm > 0 || item.tramIntAm > 0">
												//	<span>이자</span>
												//	<em class="num" v-if="fn_loanType">{{item.isrLnintPymAm | numberFilter}}</em>
												//	<em class="num" v-else>{{item.tramIntAm | numberFilter}}</em>
												//	<em class="unit">원</em>
												</span> -->
											</dd>																								
										</dl>
										<dl>
											<dt>
												<span v-if="item.mydtTrDtm.length > 8">{{item.mydtTrDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span>
												<span v-else>{{item.mydtTrDtm | dateFilter('YYYY.MM.DD')}}</span>
											</dt>
											<dd>
												<!-- <span class="com_price" v-if="item.isrLnintPymAm > 0 || item.tramIntAm > 0">
													이자
													<em class="num" v-if="fn_loanType">{{item.isrLnintPymAm | numberFilter}}</em>
													<em class="num" v-else>{{item.tramIntAm | numberFilter}}</em>
													<em class="unit">원</em>
												</span> -->
												<p>대출원금상환액 <em class="num">{{item.tramOgnAm | numberFilter}}</em>원</p>
												<p>이자 납입액 <em class="num">{{item.tramIntAm | numberFilter}}</em>원</p>
											</dd>
										</dl>
									</button>
								</div>
							
								<!-- 이자목록 표시 -->
								<div class="listbox_area">
									<div class="listbox_type01" v-for="(intList,index) in item.bankInsuLoanAccountTransactionIntSubOut" :key="index">
										<div class="list_gray_box">
											<p class="list_title" v-if="fn_loanType">{{getIsrLnIntKdcNm(intList.isrLnIntKdc)}}</p>
											<p class="list_title" v-else>{{getBnkLnIntKdcNm(intList.bnkLnIntKdc)}}</p>
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
								</div>
								<!-- 환출이자 존재하면 표시 -->
								<dl class="list_depth2" v-if="item.touIntAm > 0">
									<dt>
										<div>
											<em>환출이자</em>
										</div>
										<span class="com_price">
											<em class="num">{{item.touIntAm | numberFilter}}</em><em class="unit">원</em>
										</span>
										
									</dt>
									<dd>
										<span v-if="item.mydtTrDtm.length > 8">{{item.mydtTrDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span>
										<span v-else>{{item.mydtTrDtm | dateFilter('YYYY.MM.DD')}}</span>
									</dd>
								</dl>								
							</li>	
							<li v-else :key="'tran2_' + index">
								<dl class="breakdown">		
									<dt>
										<em v-if="fn_loanType">상환</em> 
										<em v-else>{{getLnAcTrTpcNm(item.lnAcTrTpc)}}</em>									
									</dt>
									
									<dd>
										<em class="num">{{item.lnAcTram | numberFilter}}원</em>

										<!-- 23.09.26 구분없이 대출원금상환액, 이자 납입액, 거래금액 모두 보여주는 걸로 -->	
										<!-- 보험대출과 일반대출 구분 
										<template v-if="fn_loanType">
											<span class="com_price" v-if="fn_rpyMethod">
												<em class="num">{{item.lnAmRpyAm | numberFilter}}</em>
												<em class="unit">원</em>
											</span>
										</template>
										<template v-else>
											//상환인 경우 거래금액 중 원금으로 표시 
											<template v-if="item.lnAcTrTpc == '02'">
												//만기일시상환, 한도거래, 기타의 경우는 원금표시하지 않음
												<span class="com_price" v-if="fn_rpyMethod">
													<em class="num">{{item.tramOgnAm | numberFilter}}</em>
													<em class="unit">원</em>
												</span>
											</template>
												//상환이 아닌 경우 거래금액으로 표시 
											<template v-else>
												<span class="com_price">
													<em class="num">{{item.lnAcTram | numberFilter}}</em>
													<em class="unit">원</em>
												</span>
											</template>
										</template>
										//보험대출쪽은 이자납입이 있어도 목록을 주지 않는 경우가 있으니 이자납입금액이 있으면 일단 표시함
										//<span class="com_price" v-if="item.isrLnintPymAm > 0 || item.tramIntAm > 0">
										//	<span>이자</span>
										//	<em class="num" v-if="fn_loanType">{{item.isrLnintPymAm | numberFilter}}</em>
										//	<em class="num" v-else>{{item.tramIntAm | numberFilter}}</em>
										//	<em class="unit">원</em>
										</span> -->
									</dd>																								
								</dl>
								<dl>
									<dt>
										<span v-if="item.mydtTrDtm.length > 8">{{item.mydtTrDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span>
										<span v-else>{{item.mydtTrDtm | dateFilter('YYYY.MM.DD')}}</span>
									</dt>
									<dd>
										<!-- <span class="com_price" v-if="item.isrLnintPymAm > 0 || item.tramIntAm > 0">
											이자
											<em class="num" v-if="fn_loanType">{{item.isrLnintPymAm | numberFilter}}</em>
											<em class="num" v-else>{{item.tramIntAm | numberFilter}}</em>
											<em class="unit">원</em>
										</span> -->
										<p>대출원금상환액 <em class="num">{{item.tramOgnAm | numberFilter}}</em>원</p>
										<p>이자 납입액 <em class="num">{{item.tramIntAm | numberFilter}}</em>원</p>
									</dd>
								</dl>
							</li>	
						</template>				
					</ul>
				</div>
			</div>
			<div class="no_data_box" v-else>
				<!-- 데이터 없을때 -->
				<div class="no_data_list">
					<p>조회된 정보가 없습니다.</p>
				</div>
				<!--// 데이터 없을때 -->
			</div>
			<div class="com_inner">
				<div class="com_btn_area02">
					<a href="javascript:void(0);" class="com_btn_more" @click.prevent="showMoreList()" :style="noMoreList"><span>더보기</span></a>
				</div>
			</div>
				<!-- <template v-if="bankInsuLoanAccountTransactionListOut.length > 50">
					<a href="javascript:void(0);" role="button" class="com_btn_more">더보기</a>
				</template> -->
			</div>
			
			<a href="javascript:void(0);" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>
		</div>
			
	<!-- </div> -->
</template>

<script>
    /*eslint-disable */
    import apiService from '@/service/apiService'
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import CmmProgress from '@/components/CmmProgressV2.vue'
    import {isValidDate} from '@/utils/date'

    export default {            
        name : "ASLN2002",
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
				rpyMetcNm           : "",           // 상환방식코드명
				dfprdStYm           : "",           // 거치시작년월
				dfprdEdYm           : "",           // 거치종료년월

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
			
			//더보기 접기
			$(document).ready(function(){
				$('.btn_view_detail').on('click',function(){
					$(this).siblings().children('.asset_detail').toggleClass('open');
					$(this).toggleClass('close');
					if($('.asset_detail').hasClass('open')) {
						$('.asset_detail').slideDown('slow');
						$('.btn_view_detail').text('접기');//230720 상세접기에서 접기로 수정
					}else {
						$('.asset_detail').slideUp('slow');
						$('.btn_view_detail').text('더보기');//230720 상세보기에서 더보기로 수정
					}
				});
			});
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
                    url : '/as/ln/02r02',
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
					this.rpyMetcNm      = response.rpyMetcNm || ''
					this.dfprdStYm      = response.dfprdStYm || ''
					this.dfprdEdYm      = response.dfprdEdYm || ''
					
					if(response.dfprdStYm != "")
						this.dfprdStYm + " ~ "
						
					
                    console.log(response);

                    this.getTransaction();   // 거래내역 조회
                });
            },

            // 담보대출 거래내역 조회
            getTransaction() {
                const config = {
                    url : "/as/ln/02r03",
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

					console.log("==========/as/ln/02r03=========", response)

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
                    url : '/as/ln/02r03',
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