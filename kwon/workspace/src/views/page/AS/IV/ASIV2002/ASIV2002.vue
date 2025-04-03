<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 투자 > 펀드상세(은행,금융펀드)
* @ 페이지설명 : 나의자산 > 자산 > 투자 > 펀드상세(은행,금융펀드)
* @ 파일명     : src/views/page/AS/IV/ASIV2002/ASIV2002.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-17             CS515729         최초작성
* 2022-07-05             CS528205         고도화 파일명, UI 변경 및 고도화 개발(ASIV1102.vue -> ASIV1002.vue)
* 2023-07-10                              고도화 파일명, UI 변경 및 고도화 개발(ASIV1002.vue -> ASIV2002.vue)
* 2023-08-02             CS533039         펀드상세 보유좌수 추가
* 2023-09-08             CS533039         펀드상세조회 수익률조회 추가
* 2023-09-25             CS533039         금융투자 펀드 수익률그래프 삭제 및 대체 문구 추가, 기획안 반영
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
		<div class="popup_header">
			<h1 class="">펀드</h1>
			<!-- <a href="#nolink" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content com_no_bottom pt0"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="asset_info_box">
				<div class="com_inner">
					<div class="asset_info_wrap">
						<div class="asset_info">
							<dl>
								<dt>
									{{respInfo.acWrsnm}}
								</dt>
								<dd>
									<span class="account_num">{{respInfo.mydtAcno}}</span>
								</dd>
							</dl>
							<div class="bank_icon">
								<i :class="respInfo.infOfrmnOrgC"><span class="blind">{{respInfo.infOfrmnOrgnm}}</span></i>
							</div>
						</div>

						<div class="asset_price_wrap">
							<div class="amount">평가금액</div>
							<div class="asset_price">
								<span class="num counter" :data-count="respInfo.acEvlam | numberFilter">{{respInfo.acEvlam | numberFilter}}</span>원
							</div>
							<div class="asset_price_list">
								<span>투자원금</span>
								<span class="price"><em class="num">{{respInfo.mydtIvPrn | numberFilter}}</em>원</span>
							</div>
							<!-- 0925 수정 -->
							<div class="asset_price_list"> 
								<span>총수익</span>
								<!-- 올랐을 때 -->
                                <template v-if="profitAm > 0">
                                    <span class="price pointColor red">
                                        <em class="num">+{{profitAm | numberFilter}}</em>원
                                    </span>
                                    <span class="change_rate up big">
                                        <em class="num">{{Math.abs(respInfo.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}</em>%
                                    </span>
                                </template>
								<!-- //올랐을 때 -->			
								<!-- 내렸을 때 -->		
                                <template v-else-if="profitAm < 0">	
                                    <span class="price pointColor blue">
									<em class="num">{{profitAm | numberFilter}}</em>원
                                    </span>
                                    <span class="change_rate down big">
                                        <em class="num">{{Math.abs(respInfo.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}</em>%
                                    </span>			 
								<!-- //내렸을 때 -->
                                </template>	
                                <template v-else>	
                                <!-- 0일때 -->
                                    <span class="price">
                                        <em class="num">0</em>원
                                    </span>
                                    <!-- //0일때 -->
                                </template>
							</div>
                            <template v-if="lastTrDay.length > 0">
                                <p class="desc">(최종거래일자 기준 : {{lastTrDay | dateFilter("YYYY.MM.DD")}})</p>
                            </template>    
							<!-- //0925 수정 -->  
						</div>
					</div>

					<div class="asset_detail">
						<ul class="list_type_2023">
                            <!--은행 펀드-->
                            <template v-if="bsnDsc === 'B'">
                                <li>
                                    <dl>
                                        <dt>개설일</dt>
                                        <dd class="num">{{respInfo.mydtOpDt | dateFilter("YYYY.MM.DD")}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>만기일</dt>
                                        <dd class="num">{{respInfo.dueDt | dateFilter("YYYY.MM.DD")}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>납입유형</dt>
                                        <dd>{{respInfo.pymTpnm}}</dd>
                                    </dl>	
                                    <dl>
                                        <dt>보유좌수</dt>
                                        <dd class="num">{{respInfo.mydtHldAcn | numberFilter}}</dd>
                                    </dl>	
                                </li>
                            </template>
                            <template v-else>
                            <!--금융펀드-->
                                <li>
                                    <dl>
                                        <dt>납입유형</dt>
                                        <dd>{{respInfo.pymTpnm}}</dd>
                                    </dl>	
                                    <dl>
                                        <dt>개설일</dt>
                                        <dd class="num">{{respInfo.mydtOpDt | dateFilter("YYYY.MM.DD")}}</dd>
                                    </dl>
                                    <dl v-if="respInfo.dueDt">
                                        <dt>만기일</dt>
                                        <dd class="num">{{respInfo.dueDt | dateFilter("YYYY.MM.DD")}}</dd>
                                    </dl>                                    
                                    <dl>
                                        <dt>세제혜택</dt>
                                        <dd>{{getTxfrAplNm}}</dd>
                                    </dl>
                                    <!-- 연금계좌 -->
                                    <template v-if="respInfo.pnsAccYn === '1'">
                                        <dl>
                                            <dt>연금가입일</dt>
                                            <dd class="num">{{respInfo.entDt | dateFilter("YYYY.MM.DD")}}</dd>
                                        </dl>
                                        <dl>
                                            <dt>납부 총액</dt>
                                            <dd class="num">{{respInfo.ivPayTam | numberFilter}}원</dd>
                                        </dl>	
                                        <dl>
                                            <dt>기출금액</dt>
                                            <dd class="num">{{respInfo.pvDrwAm | numberFilter}}원</dd>
                                        </dl>	
                                        <dl v-if="respInfo.lsPymDt">
                                            <dt>최종납입일</dt>
                                            <dd class="num">{{respInfo.lsPymDt | dateFilter("YYYY.MM.DD")}}</dd>
                                        </dl>	
                                        <dl v-if="respInfo.pnsStrtPlaDt">
                                            <dt>연금기수령액</dt>
                                            <dd class="num">{{respInfo.pnsPvRcpAm | numberFilter}}원</dd>
                                        </dl>	
                                        <dl v-if="respInfo.pnsStrtPlaDt">
                                            <dt>연금개시일</dt>
                                            <dd class="num">{{respInfo.pnsStrtPlaDt | dateFilter("YYYY.MM.DD")}}</dd>
                                        </dl>
                                        <dl>
                                            <dt>금년납입금</dt>
                                            <dd class="num">{{respInfo.tyyPymAm | numberFilter}}원</dd>
                                        </dl>	
                                    </template>	
                                </li>
                            </template>
						</ul>
					</div>
				</div>

				<button type="button" class="btn_view_detail">더보기</button><!-- 230720 상세보기에서 더보기로 수정 -->
			</div>
			<div class="com_inner">
				<div class="new_period_box pt30 pb20">
					<div class="tit_area">
                        <a href="javascript:void(0);" title="팝업열기" role="button" @click.prevent="fn_openPeriodPop()" class="num">{{startDay}} ~ {{endDay}}</a>
					</div>
				</div>

                <template v-if="accTrList.length > 0">
                    <div class="asset_more_list" v-for="(monObj, mIdx) in accTrList" :key="'mon_'+mIdx">
                        <div class="list_month">
                            <div class="tit" :class="{pt12 : mIdx===0}">
                                <span>{{monObj.yyyyMM | dateFilter('YYYY')}}년 {{monObj.yyyyMM | dateFilter('MM')}}월</span>
                            </div>
                        </div>
                        <ul :key="mIdx">
                            <li v-for="(item, dIdx) in monObj.monList" :key="'day_'+dIdx">
                                <dl class="breakdown">
                                    <dt>{{item.ivAcTrTpcNm}}</dt>
                                    <dd class="num">{{item.ivAcTram | numberFilter }}원</dd>
                                </dl>
                                <dl>
                                    <dt class="num">{{item.mydtTrDtm | dateFilter('DD일')}} {{item.mydtTrDtm | dateFilter('HH:mm:ss')}}</dt>
                                    <dd class="num">{{item.trafBlcEvlam | numberFilter }}원</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </template> 
                <template v-else>
                    <!-- 조회내역이 없을경우 -->
                    <div class="no_data_box no_data_box01 grayExclamationType">
                        <div class="no_data_list">
                            <p class="txt_sub">조회된 정보가 없습니다.</p>
                        </div>
                    </div>
                    <!--// 조회내역이 없을경우 -->
                </template>                
			</div>
			<div class="btn_inner_wrap">
				<a href="javascript:void(0);" role="button" class="com_btn_more" @click="fn_showMoreList()" v-show="lsPageYn==='1'"><span>더보기</span></a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {dateFormat} from '@/utils/date'
    //import {round} from '@/utils/number'
    import _ from 'lodash'
    // import '@/assets/js/rMateChartH5/JS/rMateFunction.js'
    //import {setLazyLoadEventListener} from '@/assets/js/rMateChartH5/JS/rMateFunction.js'

    export default {
        name : "ASIV2002",
        data: () => {
            return {
                objIvInfo   : {},   //전달파라미터
                bsnDsc      : "" ,  //업무구분코드 (B:은행, BF:금융펀드, F:금융투자)
                respInfo    : {},   //응답결과 헤더
                respDtlInfo : {},   //응답결과 상세
                txfrAplYn   : "",   //세제적용여부
                
                today       : "",   //오늘 날짜
                startDay    : "",   //조회 시작일
                endDay      : "",   //조회 끝일
                srchFrag    : "",  	//조회구분자 '':전체, 1:입금, 2:출금, 3:입고, 4:출고
                fromDay     : "",   //1년거래 조회 시작일
                toDay       : "",   //년거래 조회 끝일
                //chartHCn    : 0,    //차트 세로
                //chartHDsc   : "0",    //차트 세로 구분, 1: -100 ~ 1000 2:-100~100 3:-10~10

                pageNum     : 0,    // 페이지번호
                lsPageYn    : "",   // 다음페이지존재여부 '1':존재 , '0':미존재 
                //chartPeriod : "1",  // 그래프 범위 (n개월)
                //chartPageNum : 0,   // 차트 페이지번호
                //chartLabel  : "",   // 차트

                tranList    : [],   // 임시 리스트
                accTrList   : [],   // 월별그룹리스트
                //pftrtList   : [],   // 수익률리스트
                //prdPftrtList : [],  // 기간구분별 수익률리스트
                profitAm    : 0,    // 총수익
                lastTrDay     : "",   // 최종거래일자
                firstReq    : true

            }	
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        computed : {
            getTxfrAplNm() {
				return this.txfrAplYn  === "1" ? '적용' : '미적용'
            },

        },
        created() {
            this.objIvInfo = this.params.objIvInfo    //전달받은 파라미터

            //업무구분코드 (B:은행, BF:금융펀드, F:금융투자)
            this.bsnDsc = this.objIvInfo.bsnDsc   // 조회조건 분기처리 위함

            this.today = new Date();

            this.toDay = dateFormat(this.today, "YYYY.MM.DD");
            this.fromDay = this.getDay(this.toDay, "12", "pre");  // 1년전

            this.endDay = dateFormat(this.today, "YYYY.MM.DD");
            this.startDay = this.getDay(this.endDay, "12", "pre");  // 1년전

            this.pageNum  = 1   // 페이지번호
            this.srchFrag = "" //초기 ''전체로 조회
            //this.chartPeriod = '3' // 초기 3개월 범위 조회
            //this.chartId = ""
            
        },
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)

            this.initEvent()
        },
        methods: {
            initComponent() {
                this.getData();
            },
			initEvent() {
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
			},
            getData() {
                // 펀드계좌 상세 조회
                const config = {
					url: '/as/iv/02r03',  // 인터페이스ID: IF-MOB-PFM-ASIV02R03, 서비스코드: PFMASIV02R03
					data: {
                        "mydtCusno"    : this.objIvInfo.mydtCusno,
                        "infOfrmnOrgC" : this.objIvInfo.infOfrmnOrgC,
                        "mydtAcno"     : this.objIvInfo.mydtAcno,
                        "mydtScNo"     : this.objIvInfo.mydtScNo, 
                        "bsnDsc"       : this.objIvInfo.bsnDsc
                    }
				};
				apiService.call(config).then(response => {
                    this.respInfo = response;

                    //세제적용여부
                    this.txfrAplYn = this.respInfo.txfrAplYn

                    //충수익 계산
                    this.profitAm = this.respInfo.acEvlam - this.respInfo.mydtIvPrn

                    // 거래내역조회 :최초 거래내역조회 기간은 1년
                    this.startDay = this.fromDay
                    this.endDay   = this.toDay

                    this.fn_getTranList('INIT');
                    
				});
            },

            /*
            * 계좌 거래내역조회
            */
            fn_getTranList(mod) {
                // 조건, 날짜 변경시 검색결과 초기화
                if(mod === 'INIT') {
                    this.pageNum  = 1
                    this.tranList = []
                }

                //거래내역 조회
                const config = {
					url: '/as/iv/02r04',   // 인터페이스ID: IF-MOB-PFM-ASIV02R04, 서비스코드: PFMASIV02R04
					data: {
                          "mydtCusno"    : this.objIvInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objIvInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objIvInfo.mydtAcno
                        , "mydtScNo"     : this.objIvInfo.mydtScNo
                        , "inqStDt"      : this.startDay.split(".").join("")  //시작일
                        , "inqEdDt"      : this.endDay.split(".").join("")    //종료일
                        , "bsnDsc"       : this.bsnDsc    //업무구분코드 (B:은행, BF:금융펀드)
                        , "pageNum"      : this.pageNum    //페이지번호
                    }
				};
				apiService.call(config).then(response => {
                    this.respDtlInfo = response
                    this.lsPageYn    = this.respDtlInfo.lsPageYn || ""

                    // 조회된 결과 대상으로 이력이 존재하는 월별 배열 생성
                    this.accTrList = this.fn_generateList(this.respDtlInfo.bankivAccTrList || [], false)

                    // 최종거래일자 SET
                    if(this.accTrList && this.accTrList.length > 0 && this.firstReq) {
                       this.lastTrDay = this.accTrList[0].monList[0].mydtTrDtm
                       this.firstReq = false
                    }
                });

            },

            /*
            * 결과리스트 가공.
            */
            fn_generateList(objList, isChartData) {
                var tranList

                tranList = this.tranList

                if(objList.length > 0) {
                    for(let i=0; i < objList.length; i++) {
                        if(objList[i].mydtTrDtm != "00000000000000"){
                            objList[i].yyyyMM = dateFormat(objList[i].mydtTrDtm, "YYYYMM")
                            tranList.push(objList[i])
                        }
                    }
                }
                
                let sortType = isChartData ? 'asc' : 'desc'
                // 거래일시 기준 정렬
                tranList = _.orderBy(tranList, 'mydtTrDtm', sortType)

                //년월 기준 정렬
                let resultList = _.chain(tranList)
                            .uniqBy('yyyyMM')
                            .map(d => {
                                return {
                                    yyyyMM : d.yyyyMM,
                                    monList : _.filter(tranList, {yyyyMM : d.yyyyMM})
                                }
                            })
                            .orderBy('yyyyMM', sortType)
                            .value()

                return resultList
            },

            /*
            * 더보기
            */
            fn_showMoreList() {
                this.pageNum = this.pageNum + 1
                this.fn_getTranList()
            },

            /*
            * 검색조건(기간 선택) 팝업
            */
            fn_openPeriodPop() {
				const config = {
					params: {
						title: '기간 선택',
						startDate : this.startDay.split(".").join(""),
						endDate   : this.endDay.split(".").join("")
					}
				}
				modalService.openSelectMonth(config).then(response => {
                    this.startDay = dateFormat(response.startDate, "YYYY.MM.DD")
                    this.endDay   = dateFormat(response.endDate, "YYYY.MM.DD")
                    this.fn_getTranList('INIT');
				})
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


        }
    }
</script>