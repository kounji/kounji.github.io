<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 대출 > 채권/대부
* @ 페이지설명 : 나의자산 > 부채 > 대출 > 채권/대부 상세
* @ 파일명     : src/views/page/AS/LN/ASLN2008/ASLN2008.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-10-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533437              ASLN1119 -> ASLN2008
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>신용대출</h1>
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
							<div class="amount">대출금리 <span class="pointColor green">{{aplItr | numberFilter('0,0.00', {precision: 2})}}%</span></div>
							<div class="asset_price">
								<span class="num counter" data-count="acLnOgnAm">{{lnAcBac | numberFilter}}</span>원
							</div>
						</div>

						<!-- progressBar -->
                        <cmm-progress :startDate="lnDt" :endDate="dueDt"/>
						<!-- //progressBar -->

						<dl class="loan_totalprice">
							<dt>대출원금</dt>                            
							<dd><em class="num">{{acLnOgnAm | numberFilter}}</em>원</dd>
						</dl>
					</div>
				</div>

				<hr class="hr02">
				<!-- <button type="button" class="btn_view_detail">더보기</button> -->
			</div>

			<div class="com_inner">
				<div class="new_period_box pt0">
					<div class="tit_area">
						<a href="javascript:void(0);" title="팝업열기" role="button" @click.prevent="fn_openPeriodPop()" class="num">{{startDay}} ~ {{endDay}}</a>
					</div>
					
					<div class="choice_wrap">
						<div class="choice_option">
							<button type="button" title="선택됨" :class="srchFrag === '' ? 'active' : ''" @click="() => srchFrag = ''">전체</button>
							<button type="button" title="선택안됨" :class="srchFrag === '1' ? 'active' : ''" @click="() => srchFrag = '1'">입금</button>
							<button type="button" title="선택안됨" :class="srchFrag === '2' ? 'active' : ''" @click="() => srchFrag = '2'">출금</button>
						</div>
					</div>
				</div>
			</div>

			<div class="com_inner" v-if="accTrList.length > 0">						
				<li v-for="(monthObj, mIdx) in accTrList" :key="'mon_'+mIdx">
					<div class="asset_more_list">
						<div class="list_month">
							{{monthObj.yyyyMM | dateFilter('YYYY')}}년{{monthObj.yyyyMM | dateFilter('MM')}}월
						</div>
						<ul :key="mIdx">
							<li v-for="(item, dIdx) in monthObj.monList" :key="'day_'+dIdx">
								<div class="title">{{item.dpzAcTrTpcNm}}</div>
								<dl class="sub_title">
									<dt><span v-if="item.recCntn">{{item.recCntn}}</span></dt>
									<dd class="num">{{item.dpzAcTram | numberFilter}}원</dd>
								</dl>
								<dl>
									<dt class="num">{{item.mydtTrDtm | dateFilter('DD일 HH:mm:ss')}}</dt>
									<dd class="num">{{item.acTrafBac | numberFilter}}원</dd>
								</dl>
							</li>
						</ul>					
					</div>
				</li>
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
	<!--// full popup E -->
</template>

<script>

/*eslint-disable */
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import CmmProgress from '@/components/CmmProgressV2.vue'
//import {isValidDate} from '@/utils/date'
import {dateFormat} from '@/utils/date'
import modalService from '@/service/modalService'

export default {
    name : "ASLN2008",
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
            auttrOrgC       : "",       // 자동이체기관코드
            auttrOrgCNm     : "",       // 자동이체기관코드명
            auttrRpyAcno    : "",       // 자동이체상환계좌번호
            lnAcBac         : 0,        // 대출계좌잔액
            nxIntRpyDt      : "",       // 다음이자상환일자, 만기 등 다음이자상환일 정보 없으면 마지막 이자상환일
            rcnInqDtm       : "",       // 최근조회일시
            curc            : "",       // 통화코드
            acLnOgnAm       : 0,        // 계좌대출원금액
            isrcoLnWrsnm    : "",       // 보험사대출상품명
            isrAcnoDsc      : "",       // 보험계좌번호구분코드
            acnoStsc        : "",       // 보험계좌번호상태코드
            isrSctsNo       : "",       // 보험증권번호
            pageNo          : 1,        // 페이지번호
            nxDataYn        : "",       // 다음데이터여부
            intCn           : 0,        // 이자목록수






			objAccInfo  : {}, //전달 파라미터
			respInfo    : {}, //응답헤더정보
			respDtlInfo : {}, //응답상세목록정보

			srchFrag    : "",     // 조회구분자 A:전체, D:입금, W:출금
			today       : "",     // 오늘 날짜
			startDay    : "",     // 조회 시작일
			endDay      : "",     // 조회 끝일
			pageNum     : 0,      // 페이지번호
			lsPageYn    : "",     // 다음페이지존재여부 '1':존재 , '0':미존재 

			tranList    : [],     // 임시 리스트
			accTrList   : []      // 월별 리스트
		}	
	},

	computed : {
        noMoreList() {
            return (this.nxDataYn == 'Y')?"":"display : none"
        },        
        fn_rpyMethod() {
            return (this.rpyMetc == '01' || this.rpyMetc == '08' || this.rpyMetc == '09')?false:true
        },
        // 유효한 날짜 형식인지 체크
        fn_isValidDate() {
            return isValidDate(this.nxIntRpyDt)
        }
    },
    mixins: [
        popupMixin,
        commonMixin
	],
	created() {
            //초기데이타 세팅
            this.objAccInfo = this.params.objAccInfo    //전달받은 파라미터

            this.today = new Date();
            this.endDay = dateFormat(this.today, "YYYY.MM.DD");
            this.startDay = this.getDay(this.endDay, "12", "pre");

            this.pageNum  = 1   // 페이지번호
            this.srchFrag = ""; // '':전체, 1: 입금, 2:출금
        },
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
				
				// 신용대출 상세
				const config = {
					url: '/as/ln/04r02',
					data: {
						mydtCusno       : this.mydtCusno,
						infOfrmnOrgC    : this.infOfrmnOrgC,
						mydtAcno        : this.mydtAcno,
						mydtScNo        : this.mydtScNo,
						isrSctsNo       : this.isrSctsNo,
						loanType        : this.loanType,
					}	
				};
				apiService.call(config).then(response => {

					console.log("ASLN2004 CONSOLE LOG =>", response);

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
					this.auttrOrgCNm    = response.auttrOrgCNm || ''
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

                    this.respInfo = response;
					this.auttrCn = response.auttrCn;
                    this.fn_getDetailList('INIT');
				})
			},
		
			/*
            * 계좌 상세 거래내역조회
            */
            fn_getDetailList(mod) {

                // 날짜, 조건 변경시 
                // 페이지, 검색결과 초기화
                if(mod === 'INIT') {
                    this.pageNum  = 1
                    this.tranList = []
                }

				const config = {
					url: '/as/ac/02r02',
                    data: {
                        "mydtCusno"      : this.mydtCusno
                        , "infOfrmnOrgC" : this.infOfrmnOrgC
                        , "mydtAcno"     : this.mydtAcno
                        , "mydtScNo"     : this.mydtScNo
                        , "inqStDt"      : this.startDay.split(".").join("")  //시작일
                        , "inqEdDt"      : this.endDay.split(".").join("")    //종료일
                        , "inqDsc"       : this.srchFrag   //전체, 입금, 출금
						, "pageNum"      : this.pageNum    //페이지번호						
						
                    }
				}
				apiService.call(config).then(response => {
                    this.respDtlInfo = response;
                    this.lsPageYn    = this.respDtlInfo.lsPageYn || ""

                    // 조회된 결과 대상으로 이력이 존재하는 월별 배열 생성
                    this.accTrList = this.fn_generateList(this.respDtlInfo.transactionList || [])
				});
            },
		
		    /*
            * 결과리스트 가공.
            */
            fn_generateList(objList) {
                if(objList.length > 0) {
                    for(let i=0; i < objList.length; i++) {
                        if(objList[i].mydtTrDtm != "00000000000000"){
                            objList[i].yyyyMM = dateFormat(objList[i].mydtTrDtm, "YYYYMM")
                            this.tranList.push(objList[i])
                        }
                    }
                } else {
                    this.tranList = []  //응답결과 없을때 초기화처리.
                }
                
                // 거래일시 기준 정렬
                this.tranList = _.orderBy(this.tranList, 'mydtTrDtm', 'desc')

                //년월 기준 정렬
                let resultList = _.chain(this.tranList)
                            .uniqBy('yyyyMM')
                            .map(d => {
                                return {
                                    yyyyMM : d.yyyyMM,
                                    monList : _.filter(this.tranList, {yyyyMM : d.yyyyMM})
                                }
                            })
                            .orderBy('yyyyMM', 'desc')
                            .value()

                return resultList
			},
			
		 	/*
            * 검색조건(전체, 입금, 출금) 변경
            */
            fn_setSearchCond(flag) {
                this.srchFrag = flag
                this.fn_getDetailList('INIT')
            },

            getDay(inqEndDay, periodMonth, flag) {
				var period = parseInt(periodMonth);
				var day = new Date(inqEndDay.split(".").join("/"))
				var lastDay = 0;
				flag == "pre" ? lastDay = (new Date(day.getYear(), day.getMonth()-period+1, 0)).getDate() : lastDay = (new Date(day.getYear(), day.getMonth()+1+period, 0)).getDate();
				if(day.getDate() > lastDay){	//오늘 일이 저번달 일보다 클 때
					day.setDate(lastDay);
				}
				var month = flag == "pre" ? day.getMonth()-period : day.getMonth()+period;
				day.setMonth(month);
				return dateFormat(day, 'YYYY.MM.DD');
			},

        // 더보기
        showMoreList() {
            this.pageNo += 1
            const config = {
                url : '/as/ln/08r02',
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
                this.nxDataYn	= response.nxDataYn || 'N'
                for(let i=0;i<response.bankInsuLoanAccountTransactionListOut.length;i++) {
                    this.bankInsuLoanAccountTransactionListOut.push(response.bankInsuLoanAccountTransactionListOut[i])
                }
            })
		},
		
		/*
		* 검색조건(기간 선택) 팝업 - msha   
		*/
		fn_openPeriodPop() {
			const config = {
				params: {
					title     : '기간 선택',
					startDate : this.startDay.split(".").join(""),
					endDate   : this.endDay.split(".").join("")
				}
			}
			modalService.openSelectMonth(config).then(response => {
				this.startDay = dateFormat(response.startDate, "YYYY.MM.DD")
				this.endDay   = dateFormat(response.endDate, "YYYY.MM.DD")
				this.fn_getDetailList('INIT')
			})
		},
    },




	components : {
        CmmProgress
    },
	
}

</script>