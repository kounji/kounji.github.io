<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 카드 > 청구서 보기
* @ 페이지설명 : 나의자산 > 부채 > 카드 > 청구서 상세
* @ 파일명     : src/views/page/AS/CD/ASCD2004/ASCD2004.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-06-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-24              CS515937              최초작성
* 2022-07-01              CS528061              AS/LN/ASLN1116/ASLN1116.vue -> AS/CD/ASCD2004/ASCD2004.vue 변경
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<!-- 전체 팝업 시작 -->
	<div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>청구상세</h1>
		</div>	
		<div class="popup_content com_space_bottom com_bg_type00">
				
			<div class="asset_info_box">
				<div class="com_inner">
					<div class="asset_info_wrap">
						<div class="asset_info">
							<div class="select_date">
                                <button class="cal_btn cal_prev" :class="disabledAll" aria-label="한달 전 이동" @click.prevent="selectPrevNextMonth('PREV')" :disabled="fromPDCG===true" style="padding:1px 6px;"></button>
                                <a title="년월선택" class="year_month" href="javascript:void(0);" @click.prevent="selectMonth"><span class="num">{{inqYm | dateFilter('YYYY')}}</span>년 <span class="num">{{inqYm | dateFilter('M')}}</span>월 </a>
                                <button class="cal_btn cal_next" :class="disabledButton || disabledAll" aria-label="한달 후 이동" @click.prevent="selectPrevNextMonth('NEXT')" :disabled="isDisabled || fromPDCG===true" style="padding:1px 6px;"></button>
							</div>
							<dl>
								<dt>{{infOfrmnOrgCNm}}</dt>
							</dl>
							<div class="bank_icon">
								<i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgCNm}}</span></i>
							</div>
						</div>
						<div class="asset_price_wrap card">
							<div class="amount">결제일 : <template v-if="stlDt">{{stlDt | dateFilter('M')}}월 {{stlDt | dateFilter('DD')}}일</template>
                                <span class="mint_badge" v-if="cardBillListSubOut.length > 0">확정</span>
                            </div>
							<div class="asset_price">
								<span class="num counter" id="ttAm" data-count="ttAm">{{ttAm | numberFilter}}</span>원
							</div>
							<div class="asset_price_list">
								<span>일시불({{type01Cnt | numberFilter}}건)</span>
								<span class="price"><em class="num">{{type01Amt | numberFilter}}</em>원</span>
							</div>
							<div class="asset_price_list">
								<span>할부({{type02Cnt | numberFilter}}건)</span>
								<span class="price"><em class="num">{{type02Amt | numberFilter}}</em>원</span>
							</div>
						</div>
					</div>

					<div class="asset_detail asset_detail_bill">
						<ul class="list_type_2023">
							<li>
								<!-- <dl>
									<dt>일시불(3건)</dt>
									<dd class="num"><em class="num">200,000</em>원</dd>
								</dl>
								<dl>
									<dt>할부(1건)</dt>
									<dd class="num"><em class="num">50,000</em>원</dd>
								</dl> -->
								<dl>
									<dt>리볼빙</dt>
									<dd class="num"><em class="num">{{type04Amt | numberFilter}}</em>원</dd>
								</dl>
								<dl>
									<dt>단기대출</dt>
									<dd class="num"><em class="num">{{type03Amt | numberFilter}}</em>원</dd>
								</dl>
								<!-- <dl>
									<dt>리볼빙 이월잔액</dt>
									<dd class="num"><em class="num">{{type04Amt | numberFilter}}</em>원</dd>
								</dl> -->
								<!-- <dl>
									<dt>리볼빙 이력</dt>
									<dd><a href="javascript:void(0);" class="link_arrow"><em class="num">{{type04Cnt | numberFilter}}</em>건</a></dd>
								</dl> -->
								<dl>
									<dt>장기대출</dt>
									<dd class="num"><em class="num">{{type05Amt | numberFilter}}</em>원</dd>
								</dl>
								<dl>
									<dt>연회비</dt>
									<dd class="num"><em class="num">{{type06Amt | numberFilter}}</em>원</dd>
								</dl>
								<!-- <dl>
									<dt>결제은행</dt>
									<dd>NH농협은행</dd>
								</dl>	
								<dl>
									<dt>결제계좌번호</dt>
									<dd class="num">1111-****-1111</dd>
								</dl>	
								<dl>
									<dt>발급일자</dt>
									<dd class="num">2010.02.16</dd>
								</dl>	
								<dl>
									<dt>결제일</dt>
									<dd><em class="num">14</em>일</dd>
								</dl>	
								<dl>
									<dt>포인트명/잔여포인트</dt>
									<dd>하나포인트/<em class="num">100</em>P</dd>
								</dl>	 -->
							</li>
						</ul>
					</div>
				</div>
				<button type="button" class="btn_view_detail btn_view_detail_bill">더보기</button><!-- 230720 상세보기에서 더보기로 수정 -->
			</div>

            
            <template v-if="cardBillListSubOut.length > 0">
                <div class="com_inner">
                    <!-- 전체카드 선택버튼 -->
                    <div class="card_select">
                        <!-- 카드 선택시 -->
                        <div class="com_btnselectbox_type01">
                            <button type="button" class="com_btnselect_type01" @click.prevent="getCardList(cardPk)"><span>{{cardName}}</span></button>
                        </div>
                        <div class="gray_box_2023">
                            <dl>
                                <dt class="num">{{cdcoCdNo}}</dt>
                                <dd class="pointColor green"><em class="num">{{cdRqsAm | numberFilter}}</em>원</dd>
                            </dl>
                        </div>
                        <!-- //카드 선택시 -->
                    </div>
                    <!-- //전체카드 선택버튼 -->

                    <!-- 일자별 이용 대금 -->
                    <div v-for="(item, index) in accTrList" :key="index" class="claim_detail"> <!-- for문 위치 -->
                        <div class="asset_more_list" :class="index === '0' ? 'no_line' : ''">
                            <div class="list_month">{{item.mmDD | dateFilter('M')}}월 {{item.mmDD | dateFilter('DD')}}일</div>
                            <ul>
                                <li v-for="(dayItem, dIndex) in item.stlDtList" :key="dIndex">
                                    <template v-if="dayItem.cdWrsDsc == '01' || dayItem.cdWrsDsc == '02'">
                                        <a href="javascript:void(0);" role="button" @click.prevent="getDetail(dayItem)">
                                            <!-- 일시불 as-is 준용 -->
                                            <template v-if="dayItem.cdWrsDsc == '01'">
                                                <dl class="info">
                                                    <dt v-if="dayItem.prcMchtnm !== null">일시불 : {{dayItem.prcMchtnm}}</dt>
                                                    <dd><em class="num">{{dayItem.cdUgUsAm | numberFilter}}{{(dayItem.curc=='KRW')?'원':getCurcNm(dayItem.curc)}}</em></dd>
                                                </dl>               
                                                <div v-if="dayItem.ugDtm.length > 8" class="date">{{dayItem.ugDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}} 일시불 {{(dayItem.curc == 'KRW')?'국내':'해외'}}</div>
                                                <div v-else class="date">{{dayItem.ugDtm | dateFilter('YYYY.MM.DD')}} 일시불 {{(dayItem.curc == 'KRW')?'국내':'해외'}}</div>   
                                                <dl class="card">
                                                    <dt>{{dayItem.cdcoCdWrsnm}}</dt>
                                                </dl>
                                            </template>                                            
                                            <!-- 할부 -->
                                            <template v-else-if="dayItem.cdWrsDsc == '02'">
                                                <dl class="info">
                                                    <dt v-if="dayItem.prcMchtnm !== null">할부 : {{dayItem.prcMchtnm}}</dt>
                                                    <dd><em class="num">{{dayItem.cdUgUsAm | numberFilter}} {{(dayItem.curc=='KRW')?'원':getCurcNm(dayItem.curc)}}</em></dd>
                                                </dl>                                                    
                                                <div v-if="dayItem.ugDtm.length > 8" class="date">{{dayItem.ugDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}} 할부 ({{dayItem.nowIstSc}}/{{dayItem.allIstSc}})</div>
                                                <div v-else class="date">{{dayItem.ugDtm | dateFilter('YYYY.MM.DD')}} 할부 ({{dayItem.nowIstSc}}/{{dayItem.allIstSc}})</div>
                                                <dl class="card">
                                                    <dt>{{dayItem.cdcoCdWrsnm}}</dt>
                                                </dl>
                                            </template>
                                        </a>
                                    </template>
                                    <template v-else >            
                                        <!-- 단기카드대출 -->
                                        <template v-if="dayItem.cdWrsDsc == '03'">
                                            <dl class="info">
                                                <dt v-if="dayItem.prcMchtnm !== null">단기 : {{dayItem.prcMchtnm}}</dt>
                                                <dd><em class="num">{{dayItem.cdUgUsAm | numberFilter}} {{(dayItem.curc=='KRW')?'원':getCurcNm(dayItem.curc)}}</em></dd>
                                            </dl>                                               
                                            <div v-if="dayItem.ugDtm.length > 8" class="date">{{dayItem.ugDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</div>
                                            <div v-else class="date">{{dayItem.ugDtm | dateFilter('YYYY.MM.DD')}}</div>
                                            <dl class="card">
                                                <dt>{{dayItem.cdcoCdWrsnm}}</dt>
                                            </dl>
                                        </template>
                                        <!-- 장기카드대출 -->
                                        <template v-else-if="dayItem.cdWrsDsc == '05'">
                                            <dl class="info">
                                                <dt v-if="dayItem.prcMchtnm !== null">장기 : {{dayItem.prcMchtnm}}</dt>
                                                <dd><em class="num">{{dayItem.cdUgUsAm | numberFilter}} {{(dayItem.curc=='KRW')?'원':getCurcNm(dayItem.curc)}}</em></dd>
                                            </dl>
                                            <div class="date">{{dayItem.ugDtm | dateFilter('YYYY.MM.DD')}} ({{dayItem.nowIstSc}}/{{dayItem.allIstSc}})</div>
                                            <dl class="card">
                                                <dt>{{dayItem.cdcoCdWrsnm}}</dt>
                                            </dl>
                                        </template>
                                        <!-- 리볼빙 및 기타 -->
                                        <template v-else>
                                            <dl class="info">
                                                <dt v-if="dayItem.prcMchtnm !== null">리볼빙 : {{dayItem.prcMchtnm}}</dt>
                                                <dd><em class="num">{{dayItem.cdUgUsAm | numberFilter}} {{(dayItem.curc=='KRW')?'원':getCurcNm(dayItem.curc)}}</em></dd>
                                            </dl>                                                 
                                            <div class="date">{{dayItem.ugDtm | dateFilter('YYYY.MM.DD')}}</div>
                                            <dl class="card">
                                                <dt>{{dayItem.cdcoCdWrsnm}}</dt>
                                            </dl>
                                        </template>
                                    </template>
                                </li>
                            </ul>
                        </div>    
                    </div>
                        <a href="javascript:void(0);" role="button" class="com_btn_more" @click.prevent="showMoreList()" :style="noMoreList">더보기</a>
                    <!-- //일자별 이용 대금 -->
                </div>
			</template>
            <!-- <template v-else>
                <div class="no_data_box no_data_box01 grayExclamationType">
                    <div class="no_data_list">
                        <p class="txt_sub">조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </template> -->
		</div>
		<a href="javascript:void(0);" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>	
	</div>
	<!--// 전체 팝업 종료 -->
    <!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import {dateFormat, monthAdd} from '@/utils/date'
import ASCD2005 from '@/views/page/AS/CD/ASCD2005/ASCD2005'
import ASCD2006 from '@/views/page/AS/CD/ASCD2006/ASCD2006'
import _ from 'lodash'

export default {
    name : "ASCD2004",
    data: () => {
        return {
            mydtCusno               : "",           // 마이데이터고객번호
            infOfrmnOrgC            : "",           // 정보제공자기관코드
            infOfrmnOrgCNm          : "",           // 정보제공자기관코드명
            firstCdRqsYm            : "",           // 최초청구년월
            lastCdRqsYm             : "",           // 마지막청구년월
            inqYm                   : "",           // 조회년월
            mydtCdIdVal             : "",           // 마이데이터카드식별자
            mydtStlSqno             : "",           // 마이데이터결재일련번호
            cdcoCdNo                : "",           // 카드번호
            cdcoCdWrsnm             : "",           // 카드상품명
            ttAm                    : 0,            // 전체 카드청구금액
            cdRqsAm                 : 0,            // 카드별 카드청구금액
            stldtVal                : "",           // 결제일값
            stlDt                   : "",           // 결제일자
            type01Cnt               : 0,            // 일시불개수
            type02Cnt               : 0,            // 할부개수
            type03Cnt               : 0,            // 현금서비스개수
            type04Cnt               : 0,            // 리볼빙개수
            type05Cnt               : 0,            // 카드론개수
            type06Cnt               : 0,            // 연회비개수
            type99Cnt               : 0,            // 기타개수
            type01Amt               : 0,            // 일시불합계금액
            type02Amt               : 0,            // 할부합계금액
            type03Amt               : 0,            // 현금서비스합계금액
            type04Amt               : 0,            // 리볼빙합계금액
            type05Amt               : 0,            // 카드론합계금액
            type06Amt               : 0,            // 연회비합계금액
            type99Amt               : 0,            // 기타합계금액
            nxDataYn                : "",           // 다음데이터여부
            currYm                  : "",           // 현재년월
            fromPDCG                : false,        // 카드활용가이드에서 넘어온 경우 년월선택 disabled 처리하기 위한 flag
            isDisabled              : false,        // 년월선택 비활성화 관련

            cardBillListSubOut      : [],           // 카드청구상세Out

            tranList                : [],           // 임시 리스트
            accTrList               : [],           // 월별 리스트
            tempList                : [],           // 더보기를 위한 임시 저장 리스트

            cardList                : [],           // 카드 목록
            showCardList            : [],           // 보여줄 카드 목록
            cardName                : "전체카드",   // 카드명
            cardPk                  : "ALL",        // 카드 식별자

            pageNo                  : 0,            // 페이지번호
            lsPageYn                : "",           // 다음페이지존재여부 '1':존재 , '0':미존재
        }
    }    ,
    computed : {
        noMoreList() {
            return (this.nxDataYn == 'Y')?"":"display : none"
        },
        disabledButton() {
			return this.isDisabled ? 'disabled' : ''
        },
        disabledAll() {
            return this.fromPDCG == true ? 'disabled' : ''
        },
    },
    mounted() {
        this.initComponent(this.params)
        dateFormat()
        // PFM로그 처리화면 접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins : [
        popupMixin,
        commonMixin
    ],
    created() {
        //초기데이타 세팅    
        this.pageNo  = 1   // 페이지번호
    },    
    methods : {
        initComponent(param) {
            this.currYm         = dateFormat(new Date(), 'YYYYMM')
            this.mydtCusno      = param.mydtCusno || ''
            this.infOfrmnOrgC   = param.infOfrmnOrgC || ''
            this.infOfrmnOrgCNm = param.infOfrmnOrgCNm || ''
            this.inqYm          = param.cdRqsYm || ''           // 조회년월
            this.lastCdRqsYm    = param.lastCdRqsYm || ''       // 마지막 청구년월
            this.mydtStlSqno    = param.mydtStlSqno || []
            this.fromPDCG       = param.fromPDCG || false
            this.myCusCardList  = []

            this.getData();

            this.initEvent();
        },
        getData() {
            this.pageNo = 1 // 카드를 변경할 때 pageNo를 초기화 시켜줌
            const config = {
                url : '/as/cd/04r01',
                data : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : this.infOfrmnOrgC,
                    inqYm           : this.inqYm,
                    mydtCdIdVal     : this.mydtCdIdVal,
                    mydtStlSqno     : this.mydtStlSqno,
                    pageNo          : this.pageNo,    //페이지번호
                }  
            }
            apiService.call(config).then(response => {
                console.log('response', JSON.parse(JSON.stringify(response)))
                this.mydtCusno            = response.mydtCusno || ''
                this.infOfrmnOrgC         = response.infOfrmnOrgC || ''
                this.ttAm                 = response.ttAm || 0
                this.cdRqsAm              = response.cdRqsAm || 0
                this.stldtVal             = response.stldtVal || ''
                this.stlDt                = response.stlDt || ''
                this.type01Cnt            = response.type01Cnt || 0
                this.type02Cnt            = response.type02Cnt || 0
                this.type03Cnt            = response.type03Cnt || 0
                this.type04Cnt            = response.type04Cnt || 0
                this.type05Cnt            = response.type05Cnt || 0
                this.type06Cnt            = response.type06Cnt || 0
                this.type99Cnt            = response.type99Cnt || 0
                this.type01Amt            = response.type01Amt || 0
                this.type02Amt            = response.type02Amt || 0
                this.type03Amt            = response.type03Amt || 0
                this.type04Amt            = response.type04Amt || 0
                this.type05Amt            = response.type05Amt || 0
                this.type06Amt            = response.type06Amt || 0
                this.type99Amt            = response.type99Amt || 0
                this.nxDataYn             = response.nxDataYn || 'N'

                this.cardList             = response.cardList || []
                this.cardBillListSubOut   = response.cardBillListSubOut || []
                this.accTrList            = this.fn_filterList(this.cardBillListSubOut || [])

                this.lsPageYn             = response.lsPageYn || ""

                this.filterCardList(); // 마이데이터결제일련번호에 해당되는 카드들로 리스트를 재구성

                this.fn_disabled();
            })
        },
        
        fn_filterList(objList) {
            this.tranList  = [];
            this.accTrList = [];

            if(objList.length > 0) {
                for(let i = 0; i < objList.length; i++) {
                    objList[i].mmDD = dateFormat(objList[i].ugDtm, "YYYYMMDD")
                    this.tranList.push(objList[i])
                }
            } else {
                this.tranList = []  // 응답 결과가 없을 때 초기화 처리
            }

            // 거래일시 기준 정렬
            this.tranList = _.orderBy(this.tranList, 'ugDtm', 'desc')

            // 월일 기준 정렬
            let resultList = _.chain(this.tranList)
						.uniqBy('mmDD')
						.map(d => {
							return {
								mmDD : d.mmDD,
								stlDtList : _.filter(this.tranList, {mmDD : d.mmDD})
							}
						})
						.orderBy('mmDD', 'desc')
                        .value()
            return resultList
        },

        fn_disabled() {
            this.isDisabled = this.inqYm == this.lastCdRqsYm ? true : false
        },

        filterCardList() {
            if(this.myCusCardList.length > 0) {
                return
            }
            this.showCardList = [];  // 보여줄 카드 목록 초기화

            // 해당되는 마이데이터결제일련번호를 가진 카드 목록으로 재구성

            // 카드 식별번호 그룹핑
            let myCardList = []
            for(let i=0; i < this.cardBillListSubOut.length; i++) {
                let card = this.cardBillListSubOut[i].mydtCdIdVal
                myCardList.push(card)
            }
            this.myCusCardList = [...new Set(myCardList)]
            console.log("list : ",this.myCusCardList)
            // 
            for(let i = 0; i < this.cardList.length; i++) {
                
                for(let j=0; j<this.myCusCardList.length; j++) {
                    console.log(this.cardList[i].mydtCdIdVal)
                    let flag = this.cardList[i].mydtCdIdVal.indexOf(this.myCusCardList[j]);
                    console.log(flag)
                    if(flag == 0) {
                        this.showCardList.push(this.cardList[i]);
                        break
                    }
                }

                if(this.showCardList.length == this.myCusCardList.length) {
                    break
                }
            }
        },
        // 상환방법 코드명 재정의(상세화면에 줄여 표시하기 위함)
        modifyRepayMethod(codeNo) {
            let codeNm = ""
            switch(codeNo) {
                case "01" :
                    codeNm = "만기일시"
                break
                case "02" :
                    codeNm = "원금균등"
                break
                case "03" :
                    codeNm = "거치식-원금균등"
                break
                case "04" :
                    codeNm = "원리금균등"
                break
                case "05" :
                    codeNm = "거치식-원리금균등"
                break
                case "06" :
                    codeNm = "만기지정-원금균등"
                break
                case "07" :
                    codeNm = "만기지정-원리금균등"
                break
                case "08" :
                    codeNm = "한도거래"
                break
                case "09" :
                    codeNm = "기타"
                break
                case "10" :
                    codeNm = "거치식-만기지정-원금균등"
                break
                case "11" :
                    codeNm = "거치식-만기지정-원리금균등"
                break
                default :
                    codeNm = ""
                break
            }
            return codeNm
        },
        // 공통코드명 조회
        // 카드-상품구분코드
        getCdWrsDscNm(cVal) {
            let cmmLnList = this.getCodeList("CD_WRS_DSC")
            for(var i=0; i<cmmLnList.length; i++) {
                if(cVal === cmmLnList[i].comnCVal) {
                    return cmmLnList[i].comnCExpl
                }
            }
        },

        // 통화코드
        getCurcNm(cVal) {
            let cmmLnList = this.getCodeList("CURC")
            for(var i=0; i<cmmLnList.length; i++) {
                if(cVal === cmmLnList[i].comnCVal) {
                    return cmmLnList[i].refCntn1
                }
            }
        },

        // 상세내역 슬라이드 팝업
        getDetail(obj) {
            console.log("청구상세정보 진입")
            const config = {
                params : {
                    cdcoCdWrsnm     : obj.cdcoCdWrsnm, // 서비스가 등록이 되면 obj.cdcoCdWrsnm로 변경해야 함
                    cdcoCdNo        : obj.cdcoCdNo,    // 서비스가 등록이 되면 obj.cdcoCdNo로 변경해야 함
                    cardBillInfo    : obj,
                },
                renderer : {
					component : ASCD2006,
				}
            }
            modalService.openSlidePagePopup(config)
        },

        // 더보기
        showMoreList() {
            this.tempList = []; // 더보기 2회 이상할 경우를 위한 초기화
            this.pageNo += 1
            const config = {
                //url : '/as/ln/03ra3',
                url : '/as/cd/04r01',
                data : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : this.infOfrmnOrgC,
                    inqYm           : this.inqYm,
                    mydtCdIdVal     : this.mydtCdIdVal,
                    mydtStlSqno     : this.mydtStlSqno,
                    pageNo          : this.pageNo,    //페이지번호
                }  
            }            
            apiService.call(config).then(response => {
                this.nxDataYn	= response.nxDataYn || ''

                // 기존 청구내역 목록에 더보기한 청구내역을 담기
                for(let i = 0; i < response.cardBillListSubOut.length; i++) {
                    this.cardBillListSubOut.push(response.cardBillListSubOut[i])
                }

                this.tempList   = this.fn_filterList(this.cardBillListSubOut || [])
                for(let i = 0; i < this.tempList.length; i++) {
                    this.accTrList.push(this.tempList[i])
                }
            })
        },
        selectPrevNextMonth(flag) {
            let add = (flag == 'PREV') ? -1 : 1
			this.inqYm = monthAdd(add, this.inqYm, "YYYYMM")
            this.isDisabled = false
            this.getData()
        },
        selectMonth() {
            let maxMonth = this.lastCdRqsYm ? this.lastCdRqsYm : dateFormat(monthAdd(0), 'YYYYMM')
            let minMonth = this.lastCdRqsYm ? dateFormat(monthAdd(-12, this.lastCdRqsYm), 'YYYYMM') : dateFormat(monthAdd(-12), 'YYYYMM')

            // 년월선택
            const config = {
                params: {
                    title: '년월 선택',
                    yyyymm : this.inqYm.substring(0,4) + '' + this.inqYm.substring(4,6),
                    limit  : 60,
                    includeCurYm : 'Y', // 현재월 포함여부
                    limitFromTo  : { minMonth, maxMonth }
                },
            }            
            modalService.openSlideSelectMonth(config).then(response => {
                if( (this.inqYm.substring(0,4) + '' + this.inqYm.substring(4,6)) === (response.substring(0,4) + '' + response.substring(4,6)) ){
                    console.log('달력 변동없음.')
                    return false
                }
                this.inqYm = response.substring(0,4) + '' + response.substring(4,6)
                
                // 년월 선택 후 재조회
                this.getData()
            })
        },

        // 카드 목록 가져오기
        getCardList(cardPk) {
            const config = {
                params : {
                    title    : "카드선택"
                },
                renderer : {
                    component : ASCD2005,
                    cdata     : {
                        title    : "카드선택",
                        cardList : this.showCardList,
                        cardPk   : cardPk
                    }
                    
				}
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.cardPk    = response.mydtCdIdVal
                this.cardName    = response.cdcoCdWrsnm
                this.mydtCdIdVal = response.mydtCdIdVal === 'ALL' ? '' : response.mydtCdIdVal
                this.cdcoCdNo = response.cdcoCdNo  // 카드번호

                /* if(this.mydtCdIdVal != response.mydtCdIdVal){
                    this.mydtCdIdVal = response.mydtCdIdVal;
                    getData();
                } */

                this.getData();
            })
        },
		initEvent() {
			$('.btn_view_detail_bill').on('click',function(){
				$(this).siblings().children('.asset_detail_bill').toggleClass('open');
				$(this).toggleClass('close');
				if($('.asset_detail_bill').hasClass('open')) {
					$('.asset_detail_bill').slideDown('slow');
					$('.btn_view_detail_bill').text('접기');//230720 상세접기에서 접기로 수정
				}else {
					$('.asset_detail_bill').slideUp('slow');
					$('.btn_view_detail_bill').text('더보기');//230720 상세보기에서 더보기로 수정
				}
			});
		}        
    }
}
</script>