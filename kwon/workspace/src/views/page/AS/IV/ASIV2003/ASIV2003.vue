<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 투자 > 투자상세(증권)
* @ 페이지설명 : 나의자산 > 자산 > 투자 > 투자상세(증권)
* @ 파일명     : src/views/page/AS/IV/ASIV2003/ASIV2003.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-10-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-10-13             CS515729                 최초작성
* 2023-07-14             CS533049                 파일명변경(ASIV1103.vue -> ASIV2003.vue)
*************************************************************************/
-->
<template>
	<div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>증권</h1>
		</div>	
		<div class="popup_content com_space_bottom com_bg_type00">
			<div class="asset_info_box">
				<div class="com_inner">
					<div class="asset_info_wrap">
						<div class="asset_info">
							<dl>
								<dt>{{respInfo.fncIvAcOnm}}</dt>  
								<dd>
									<span class="account_num">{{respInfo.mydtAcno}}</span>
								</dd>
								<dd><a href="javascript:void(0);" role="button" class="small_btn_gray" @click.prevent="fn_openHoldItemPoup()">보유상품</a></dd>  
							</dl>
							<div class="bank_icon">
								<i :class="respInfo.infOfrmnOrgC"><span class="blind">{{respInfo.infOfrmnOrgnm}}</span></i>
							</div>
						</div>

						<div class="asset_price_wrap">
							<div class="amount">총 평가금액
								<div class="custom_tooltip">
									<div class="com_tooltip_type02 com_tooltip_type03">
										<a href="javascript:void(0);" @click.prevent="fn_openToolTip" class="com_btn_info" role="button">
											<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
										</a>
										<div class="com_ballon_type01 com_ballon_type02" style="display: none;">
											<div>
												해외 거래 상품의 경우 전일자 환율 기준 
												원화로 환산한 금액이 반영되어 있어 조회 
												시점에 따라 실제 금액과 다를 수 있습니다.
                                                <a href="javascript:void(0);" @click.prevent="fn_openToolTip" class="com_btn_close"><span class="blind">툴팁닫기</span></a>                                                
											</div> 
										</div>
									</div>
								</div>
							</div>
							<div class="asset_price">
								<span class="num counter" :data-count="respInfo.totAcEvlam">{{respInfo.totAcEvlam | numberFilter}}</span>원
							</div>
							<div class="asset_price_list">
								<span>총 예수금</span>
								<span class="price"><em class="num">{{respInfo.totDncAm | numberFilter}}</em>원</span>
							</div>
						</div>
					</div>

					<div class="asset_detail">
						<ul class="list_type_2023">
							<li>
								<dl>
									<dt>계좌개설일</dt>
									<dd class="num">{{respInfo.acOpDt | dateFilter("YYYY.MM.DD")}}</dd>
								</dl>
								<dl>
									<dt>세제혜택</dt>
									<dd>{{getTxfrAplNm}}</dd>
								</dl>
								<dl>
									<dt>CMA상품여부</dt>
									<dd>{{getCmaWrsIncdYn}}</dd>
								</dl>
								<dl>
									<dt>주식거래가능여부</dt>
									<dd>{{getStkTrPsbYn}}</dd>
								</dl>
								<dl>
									<dt>은행예수금방식계좌여부</dt>
									<dd>{{getBnkDncamMethAcYn}}</dd>
								</dl>
								<dl>
									<dt>보유상품 현황 총 수</dt>
									<dd>{{respInfo.wrsQt}}</dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>

				<button type="button" class="btn_view_detail"  >더보기</button><!-- 230720 상세보기에서 더보기로 수정 -->
			</div>

			<div class="com_inner">
				<div class="new_period_box">
					<div class="tit_area">
						<a href="javascript:void(0);" title="팝업열기" role="button" @click.prevent="fn_openPeriodPop()"><span class="tit">{{startDay}} ~ {{endDay}}</span></a> 
					</div>
					<!-- <div class="scroll_wrap">
						<div class="checkbox_box">
							<span class="cmm_radio">
								<input type="radio" name="chk_01" id="chk_01" aria-hidden="true" checked="checked">
								<label for="chk_01" role="radio" aria-checked="true">원화</label>
							</span>
							<span class="cmm_radio">
								<input type="radio" name="chk_02" aria-hidden="true" id="chk_02">
								<label for="chk_02" role="radio" aria-checked="false">USD</label>
							</span><span class="cmm_radio">
								<input type="radio" name="chk_03" aria-hidden="true" id="chk_03">
								<label for="chk_03" role="radio" aria-checked="false">HKD</label>
							</span>
						</div>
					</div> -->

					<div class="choice_wrap">
						<div class="choice_option">


							<button v-for="(item, idx) in allCurcList" 
                                type="button" title="선택됨" 
                                :class="selCurc === item.curc ? 'active' : ''" 
                                @click="fn_changeCurc(item.curc)" :key="`btn_${idx}`">
								{{item.curc==='KRW' ? '원화' : item.curc}}
							</button>


						</div>
					</div>
				</div>
			</div>

			<div class="com_inner pt0">
				<!-- 상단 금액표시 영역 -->
				<div class="list_gray_box">
					<dl>
						<dt>예수금</dt>
						<dd class="num">{{selCurcInfo.dncAm | numberFilter}}<span class="unit">{{selCurcInfo.curc==='KRW' ? '원' : selCurcInfo.curc}}</span></dd>
					</dl>
					<dl>
						<dt>신용대출</dt>
						<dd class="num">{{selCurcInfo.crdLonAm | numberFilter}}<span class="unit">{{selCurcInfo.curc==='KRW' ? '원' : selCurcInfo.curc}}</span></dd>
					</dl>
					<dl>
						<dt>담보대출</dt>
						<dd class="num">{{selCurcInfo.lnUsAm | numberFilter}}<span class="unit">{{selCurcInfo.curc==='KRW' ? '원' : selCurcInfo.curc}}</span></dd>
					</dl>
					<dl>
						<dt>출금가능금액</dt>
						<dd class="num">{{selCurcInfo.mydtDravlAm | numberFilter}}<span class="unit">{{selCurcInfo.curc==='KRW' ? '원' : selCurcInfo.curc}}</span></dd>
					</dl>
				</div>				
				<!--// 상단 금액표시 영역 -->

				<template v-if="accTrList.length > 0">
                    <div class="asset_more_list">                        

                        <template v-for="(monObj, mIdx) in accTrList" >					
                            <div class="list_month" :key="'mon_div'+mIdx">    
                                 <em>{{monObj.yyyyMM | dateFilter('YYYY')}}</em><span>년</span>
                                 <em>{{monObj.yyyyMM | dateFilter('MM')}}</em><span>월</span>					

                            </div>
                            <ul class="dtlList" :key="'mon_ul'+mIdx">    
                                <li v-for="(item, dIdx) in monObj.monList" :key="'day_'+dIdx">
                                    <div class="stock_title"><strong>{{item.trItmnm}}</strong>
                                         <span v-if="item.frStkXchgC"> 거래소 {{item.frStkXchgnm}}</span>
                                    </div>
                                    <dl class="stock">
                                        <dt>{{item.fncIvTrKdnm}}</dt>  <!-- 거래종류명 -->
                                        <dd class="num">{{item.mydtAcTram | numberFilter}}<span class="unit">{{item.curc ==="KRW" ? '원' : item.curc}}</span>
                                        </dd> <!-- 거래금액 -->
                                    </dl>
                                    <div v-if="item.trMemoCntn" class="month">{{item.trMemoCntn}}</div>   <!-- 적요 -->
                                    <dl>
                                        <dt>{{item.mydtTrDtm | dateFilter('DD일 HH:mm:ss')}}</dt>
                                        <dd>정산금액 <span class="num">{{item.ivAdjAm | numberFilter}}</span><span class="unit">{{item.curc ==="KRW" ? '원' : item.curc}}</span>
                                        </dd>
                                    </dl>    
                                    <dl>
                                        <dt class="num"><span>{{item.ivTrQt | numberFilter}}</span><span class="unit">{{item.fncIvQtUntnm}}</span></dt> <!-- 수량||단위 -->
                                        <dd>단가 <span class="num">{{item.fncivTrUpr | numberFilter}}</span><span class="unit">{{item.curc ==="KRW" ? '원' : item.curc}}</span>
                                        </dd>
                                    </dl>                                            
                                </li>
                            </ul>
                        </template>					

                    </div>

                    <a href="javascript:void(0);" role="button" class="com_btn_more" @click="fn_showMoreList()" v-show="lsPageYn==='1'" >더보기</a>

				</template >
				
				<template v-else>
					<!-- 조회내역이 없을경우 S -->
					<div class="no_data_box no_data_box01 grayExclamationType">
						<div class="no_data_list">
							<p>조회된 정보가 없습니다.</p>
						</div>
					</div>
					<!--// 조회내역이 없을경우 E -->
				</template>
			</div>		
		</div> 

		<a href="javascript:void(0);" @click.prevent="close()" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>  

</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {dateFormat} from '@/utils/date'
    import _ from 'lodash'

    import ASIV2004 from '@/views/page/AS/IV/ASIV2004/ASIV2004'

    export default {
        name : "ASIV2003",
        data: () => {
            return {
                objIvInfo   : {},   //전달파라미터
                respInfo    : {},   //응답결과 헤더
                respDtlInfo : {},   //응답결과 상세
                txfrAplYn   : "",   //세제적용여부
                cmaWrsIncdYn : "",   //CMA상품포함여부
                stkTrPsbYn  : "",   //주식거래가능여부
                bnkDncamMethAcYn : "",   //은행예수금방식계좌여부                             
                allCurc     : "",   //전체통화코드 ex) KRW,USD,...
                allCurcList : [],   //전체통화코드리스트
                curtpAccBasicList : [],  //통화별 계좌기본목록

                selCurcInfo : {},

                selCurc     : "",   //선택된 통화코드
                isToolTip   : false,    //tooltip

                today       : "",   //오늘 날짜
                startDay    : "",   //조회 시작일
                endDay      : "",   //조회 끝일
                pageNum     : 0,      // 페이지번호
                lsPageYn    : "",     // 다음페이지존재여부 '1':존재 , '0':미존재

                tranList    : [],     // 임시 리스트
                accTrList   : [],   //월별그룹리스트
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
            getCmaWrsIncdYn() {
				return this.cmaWrsIncdYn  === "1" ? '예' : '아니요'
            },            
            getStkTrPsbYn() {
				return this.stkTrPsbYn  === "1" ? '가능' : '불가능'
            },                        
            getBnkDncamMethAcYn() {
				return this.bnkDncamMethAcYn  === "1" ? '예' : '아니요'
            },                           
        },
        created() {
            this.objIvInfo = this.params.objIvInfo    //전달받은 파라미터

            this.today = new Date();
            this.endDay = dateFormat(this.today, "YYYY.MM.DD");
            this.startDay = this.getDay(this.endDay, "12", "pre");  // 1년전

            this.pageNum  = 1   // 페이지번호

        },
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {
            initComponent() {
                this.getData()
                this.initEvent()
            },
            getData() {
                const config = {
					url: '/as/iv/03r03',
					data: {
                        "mydtCusno"    : this.objIvInfo.mydtCusno,
                        "infOfrmnOrgC" : this.objIvInfo.infOfrmnOrgC,
                        "mydtAcno"     : this.objIvInfo.mydtAcno,
                    }
                }

				apiService.call(config).then(response => {

                    this.respInfo = response

                    //세제혜택적용여부
                    this.txfrAplYn = this.respInfo.txfrAplYn

                    //CMA상품포함여부
                    this.cmaWrsIncdYn = this.respInfo.cmaWrsIncdYn                    

                    //주식거래가능여부
                    this.stkTrPsbYn = this.respInfo.stkTrPsbYn                    

                    //은행예수금방식계좌여부
                    this.bnkDncamMethAcYn = this.respInfo.bnkDncamMethAcYn                    

                    //전체통화코드
                    this.allCurc = this.respInfo.allCurc || ""
                    let tmpCurc = this.allCurc.split(",")
                    
                    for(let i=0; i < tmpCurc.length; i++) {
                        this.allCurcList.push({"curc" : tmpCurc[i]})
                    }

                    //통화별계좌기본목록
                    this.curtpAccBasicList = this.respInfo.curtpAccBasicList

                    //상세조회
                    this.fn_getDetailList('INIT')

                }).then(()=>{
                    //첫번째 통화코드 정보 
                    this.fn_changeCurc(this.allCurcList[0].curc)
                })
            },

            /*
            * 계좌 상세내역조회
            */
            fn_getDetailList(mod) {
                // 조건, 날짜 변경시 검색결과 초기화
                if(mod === 'INIT') {
                    this.pageNum  = 1
                    this.tranList = []
                }
                //거래내역 조회
                const config = {
					url: '/as/iv/03r04',
                    data: {
                          "mydtCusno"    : this.objIvInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objIvInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objIvInfo.mydtAcno
                        , "mydtScNo"     : this.objIvInfo.mydtScNo
                        , "inqStDt"      : this.startDay.split(".").join("")  //시작일
                        , "inqEdDt"      : this.endDay.split(".").join("")    //종료일
                        , "pageNum"      : this.pageNum    //페이지번호
                    }
                };

				apiService.call(config).then(response => {

                    this.respDtlInfo = response
                    this.lsPageYn    = this.respDtlInfo.lsPageYn || ""

                    // 조회된 결과 대상으로 이력이 존재하는 월별 배열 생성
                    this.accTrList = this.fn_generateList(this.respDtlInfo.stctsAccTrList || [])

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
                    this.tranList = []
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
            * 더보기
            */
            fn_showMoreList() {
                this.pageNum = this.pageNum + 1
                this.fn_getDetailList()
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
                    this.fn_getDetailList('INIT');
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

            /**
            * Tooltip 표시
            */
            fn_openToolTip() {
                this.isToolTip = !this.isToolTip
            },

            /**
            * 통화코드 선택
            */
            fn_changeCurc(curc) {
                console.log('통화코드 선택', curc)
                this.selCurc = curc
                this.selCurcInfo = _.find(this.curtpAccBasicList, {"curc":curc})
            },

            /*
            * 보유상품팝업
            */
            fn_openHoldItemPoup() {
                const popParams = {
                    "mydtCusno"     : this.objIvInfo.mydtCusno,
                    "infOfrmnOrgC"  : this.respInfo.infOfrmnOrgC,
                    "infOfrmnOrgnm" : this.respInfo.infOfrmnOrgnm,
                    "mydtAcno"      : this.respInfo.mydtAcno,
                    "fncIvAcOnm"    : this.respInfo.fncIvAcOnm
                }

                const config = {
                    component: ASIV2004,
                    params : {"objIvInfo" : popParams}
                }
                modalService.openPopup(config).then(() => {
                    console.log("")
                })
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
        }
    }
</script>
