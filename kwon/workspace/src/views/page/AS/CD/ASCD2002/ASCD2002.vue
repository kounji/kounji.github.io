<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 카드
* @ 페이지설명 : 나의자산 > 부채 > 카드 결제예정금액 상세
* @ 파일명     : src/views/page/AS/CD/ASCD2002/ASCD2002.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515937                 최초작성
* 2022-06-27              CS528061                 AS/LN/ASLN1104/ASLN1104.vue -> AS/CD/ASCD2002/ASCD2002.vue 변경
*************************************************************************/
-->
<template>
<!-- 전체 팝업 시작 -->
	<div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>결제예정금액</h1>
		</div>	
		<div class="popup_content com_space_bottom com_bg_type00">
				
			<div class="asset_info_box">
				<div class="com_inner">
					<div class="asset_info_wrap">
						<div class="asset_info">
							<dl>
								<dt>{{infOfrmnOrgCNm}}</dt>
							</dl>
							<div class="bank_icon">
								<i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgCNm}}</span></i>
							</div>
						</div>

						<div class="asset_price_wrap card">
							<div class="amount">결제예정일 : {{stlPlaDt  | dateFilter('M')}}월 {{stlPlaDt  | dateFilter('D')}}일
							<!-- 신한카드이며 결제예정일이 2건 이상인 경우 --> 
                                <span v-if="cdStlPlaCn > 1" class="mint_badge">+{{cdStlPlaCn}}</span>							
							</div>								
							<div class="asset_price">
								<span class="num counter" id="ttAm" data-count="ttAm">{{cdStlPlaAm | numberFilter}}</span>원
								<div class="custom_tooltip">
									<div class="com_tooltip_type02 com_tooltip_type03">
										<a href="javascript:void(0);" class="com_btn_info" role="button">
											<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
										</a>
										<div class="com_ballon_type01 com_ballon_type02" style="display: block;">
											<div>
												결제예정금액은 본인 명의 카드 외에 가족카드는 포함되지 않습니다.
												<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
											</div> 
										</div>
									</div>
								</div>
							</div>
							<div class="asset_price_list">
								<span>일시불</span>
								<span class="price"><em class="num">{{ocepayStlPlaAm | numberFilter}}</em>원</span>
							</div>
							<div class="asset_price_list">
								<span>할부</span>
								<span class="price"><em class="num">{{istStlPlaAm | numberFilter}}</em>원</span>
							</div>
						</div>
					</div>

					<div class="asset_detail">
						<ul class="list_type_2023">
							<li>
								<dl>
									<dt>단기대출</dt>
									<dd class="num"><em class="num">{{shlnStlPlaAm | numberFilter}}</em>원</dd>
								</dl>
								<dl>
									<dt>리볼빙</dt>
									<dd class="num"><em class="num">{{rvvStlPlaAm | numberFilter}}</em>원</dd>
								</dl>
								<dl>
									<dt>리볼빙 이월잔액</dt>
									<dd v-if="rvvCrovBac > 0"><a href="javascript:void(0)" class="link_arrow" @click.prevent="openRvvDetailPop()"><em class="num">{{rvvCrovBac | numberFilter}}</em>원</a></dd>
									<dd v-else><em class="num">{{rvvCrovBac | numberFilter}}</em>원</dd>
								</dl>
								<dl>
									<dt>장기대출</dt>
									<dd class="num"><em class="num">{{ltrmLnstlPlaAm | numberFilter}}</em>원</dd>
								</dl>
								<dl>
									<dt>연회비 및 기타</dt>
									<dd class="num"><em class="num">{{ambfeEtcStlPlaAm | numberFilter}}</em>원</dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>
				<button type="button" class="btn_view_detail">더보기</button><!-- 230720 상세보기에서 더보기로 수정 -->
			</div>

			<div class="com_inner payment_amount">

				<div class="chart_box">
					<!-- <div id="chartHolder" role="img" aria-label="ariaLabel"></div> -->					
					<div id="chartHolder" :aria-label="ariaLabel" role="img"></div>
					<div class="chart_tooltip_text">
						<span class="chart_text">{{peerAgeName}} 평균 <em class="num">{{peerDataOut.peerXpsAm | numberFilter}}</em>원</span>
						<!-- <span class="chart_tooltip">{{peerAgeName}} 평균 <em class="num">{{Math.floor(peerDataOut.peerXpsAm / 10000)| numberFilter}}</em>만원</span> -->
					</div>
				</div>


				<!-- S :: 추천배너 2021.11.12 -->
				<cmm-financial-banner asdbDsc="10"/>
				<!-- E :: 추천배너 2021.11.12 -->

				<!-- <div class="inner_banner">
					<a href="javascript:void(0)">
						<img src="@/assets_v40/images/banner/img_benner_09.png" alt="카드값을 줄일 수 있는 카드는? NH카드를 찾아보세요.">
					</a>
				</div> -->
				
				<template v-if="cardBillList.length > 0">
					<div class="asset_more_list no_line">
						<strong class="titH3">월별 청구금액 <span class="pointColor green">{{cardBillCnt}}</span></strong>
						<ul class="line_type">
							<li v-for="(item, index) in cardBillList" :key="index">
								<div class="list_month">{{item.cdRqsYm | dateFilter('YYYY')}}년{{item.cdRqsYm | dateFilter('M')}}월</div>
								<a v-for="(monthItem, mIndex) in item.monthBillList" :key="mIndex" href="javascript:void(0);" class="link_arrow" role="button" v-on:click.prevent="openBillDetailPop(monthItem)">
									<dl>
										<dt>결제일 : {{monthItem.stlDt | dateFilter('M')}}월 {{monthItem.stlDt | dateFilter('D')}}일</dt>
										<dd><em class="num">{{monthItem.colCdRqsAm | numberFilter}}</em>원</dd>
									</dl>
								</a>
							</li>
						</ul>
					</div>
				</template>
				<!-- <template v-else>
					<div class="no_data_box no_data_box01 grayExclamationType">
						<div class="no_data_list">
							<p class="txt_sub">청구서가 발행되지 않았습니다.</p>
						</div>
					</div>
				</template> -->
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>	
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import ASCD2004 from '@/views/page/AS/CD/ASCD2004/ASCD2004'
import ASCD2009 from '@/views/page/AS/CD/ASCD2009/ASCD2009'     // 리볼빙
import {dateFormat} from '@/utils/date'
import _ from 'lodash'
import '@/assets/js/rMateChartH5/JS/rMateFunction.js'
import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12

export default {
    name : "ASCD2002",
    data: () => {
        return {
            mydtCusno               : "",       // 마이데이터고객번호
            infOfrmnOrgC            : "",       // 정보제공자기관코드
			infOfrmnOrgCNm          : "",       // 정보제공자기관코드명
			inqYmd                  : "",
            ttAm                    : 0,        // 총결제예정금액
            ttShlnBac               : 0,        // 단기카드대출합계금액
            ttLtrmlnBac             : 0,        // 장기카드대출합계금액
            //cardSettlementOut       : [],       // 카드결제예정정보Out
            //shortTermSubOut         : [],       // 단기대출정보Out(현재기준)
            //longTermSubOut          : [],       // 장기대출정보Out(현재기준)
            revolvingSubOut         : [],       // 리볼빙정보Out(현재기준)
            rvvCrovBac              : 0,        // 리볼빙이월잔액(현재기준)
            pmiStlAm                : 0,        // 리볼빙약정결제금액(현재기준)
            
            cardBillList            : [],       // 월별 청구금액정보Out
            cardBillCnt             : 0,        // 월별 청구건수
            //minDate                 : '',       // 결제예정일
            //stlPlaDtCnt             : 0,        // 결제예정일 건수

            cusApprovalOut          : [],       // 결제예정금액현황(막대 그래프)
            peerDataOut             : [],       // 또래평균정보(평균선)

            maxAm                   : 0,        // 최대결제예정금액
            peerAvgAm               : 0,        // 또래 평균 결제예정금액(단위 : 만원)
            peerAgeName             : '',       // 또래 나이대

            ariaLabel               : [],       // 차트의 aria-label의 값에 넣어줄 목록

////////////////////////////////////////////////////////////////////////////////////
//            mydtCusno               : ''        // 마이데이터고객번호
//            infOfrmnOrgC            : ''        // 정보제공자기관코드
//            infOfrmnOrgCNm          : ''        // 정보제공자기관명
            stlPlaDt                : '',       // 결제예정일자
            mydtStlSqno             : '',       // 마이데이터결재일련번호
            rvvYn                   : '',       // 리볼빙여부
            cdStlPlaAm              : 0,        // 카드결제예정금액
            ocepayStlPlaAm          : 0,        // 일시불결제예정금액
            istStlPlaAm             : 0,        // 할부결제예정금액
            shlnStlPlaAm            : 0,        // 단기대출결제예정금액
            rvvStlPlaAm             : 0,        // 리볼빙결제예정금액
            ltrmLnstlPlaAm          : 0,        // 장기대출결제예정금액
			ambfeEtcStlPlaAm        : 0,  		// 연회비기타결제예정금액
			rvvCn                   : 0,        // 리볼빙건수
			cdStlPlaCn              : 0,        // 카드결제예정건수
        }
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        initComponent(param) {
            this.mydtCusno      = param.mydtCusno || ''
            this.infOfrmnOrgC   = param.infOfrmnOrgC || ''
			this.infOfrmnOrgCNm = param.infOfrmnOrgCNm || ''
			this.inqYmd         = param.inqYmd || ''
			console.log("this.inqYmd ",  this.inqYmd )


			this.getData();
        },
        getData() {
            // 카드 결제예정정보 데이터
            const config = {
				//url : '/as/ln/03ra2',
				url : '/as/cd/02r01',
                data : {
                    mydtCusno       : this.mydtCusno,
					infOfrmnOrgC    : this.infOfrmnOrgC,
					inqYmd          : this.inqYmd,
                }            
			}
			
			console.log(config);
            apiService.call(config).then(response => {
				console.log(response);
				this.ttAm               = response.ttAm || 0				// 총결제예정금액
                this.ttShlnBac          = response.ttShlnBac || 0			// 총단기대출잔액
                this.ttLtrmlnBac        = response.ttLtrmlnBac || 0			// 총장기대출잔액
                //this.cardSettlementOut  = response.cardSettlementOut || []	// 카드결제예정정보Out  -- 미사용
                //this.shortTermSubOut    = response.shortTermSubOut || []		// 단기대출정보Out		-- 미사용
                //this.longTermSubOut     = response.longTermSubOut || []		// 장기대출정보Out		-- 미사용
				this.revolvingSubOut    = response.revolvingSubOut || []	// 리볼빙정보Out		-- 사용
				this.cardBillList	    = response.cardBillMonthOut || []	// 카드월별청구정보Out	 -- 사용
				//this.minDate			= response.minDate || ''			// 최근 결제예정일
				//this.stlPlaDtCnt		= response.stlPlaDtCnt || 0			// 결제예정일 건수
				
				this.cusApprovalOut		= response.cusApprovalOut || []		// 결제예정금액현황	Chart	-- 사용
				this.peerDataOut		= response.peerDataOut || []		// 또래평균정보				-- 사용

                this.stlPlaDt           = response.stlPlaDt                 // 결제예정일자
                this.mydtStlSqno        = response.mydtStlSqno              // 마이데이터결재일련번호
                this.rvvYn              = response.rvvYn                    // 리볼빙여부
                this.cdStlPlaAm         = response.cdStlPlaAm               // 카드결제예정금액
                this.ocepayStlPlaAm     = response.ocepayStlPlaAm           // 일시불결제예정금액
                this.istStlPlaAm        = response.istStlPlaAm              // 할부결제예정금액
                this.shlnStlPlaAm       = response.shlnStlPlaAm             // 단기대출결제예정금액
                this.rvvStlPlaAm        = response.rvvStlPlaAm              // 리볼빙결제예정금액
                this.ltrmLnstlPlaAm     = response.ltrmLnstlPlaAm           // 장기대출결제예정금액
				this.ambfeEtcStlPlaAm   = response.ambfeEtcStlPlaAm         // 연회비기타결제예정금액
				this.rvvCn              = response.rvvCn                    // 리볼빙건수
				this.cdStlPlaCn         = response.cdStlPlaCn || 0          // 카드결제예정건수
				
				
                for(var i=0;i<this.revolvingSubOut.length;i++) {
                    this.rvvCrovBac += this.revolvingSubOut[i].rvvCrovBac	// 
                    this.pmiStlAm += this.revolvingSubOut[i].pmiStlAm		//
				}

				/* 월별 청구금액 형식 변환 */
				this.cardBillCnt = this.cardBillList.length;				// 청구건수
				let resultList = [];
				if(this.cardBillCnt > 0){
					resultList = _.chain(this.cardBillList)
								.uniqBy('cdRqsYm')
								.map(d => {
									return {
										cdRqsYm : d.cdRqsYm,
										monthBillList : _.filter(this.cardBillList, {cdRqsYm : d.cdRqsYm})
									}
								})
								.orderBy('cdRqsYm', 'desc')
								.value()
				}

				this.cardBillList = []
				this.cardBillList = resultList								// 카드월별청구정보Out

				this.callJQueryFncExcute()

				// 결제예정금액 현황 및 또래 평균 정보 차트생성
				const chartData =  []
				this.cusApprovalOut.forEach(d => {
					chartData.push({ "Month" : dateFormat(d.stlPlaDt, 'M월'), "금액" : Math.floor(d.cdStlPlaAm / 10000)}) // 단위 : 만원
				})

				console.log("chartData => ", chartData)

				// 차트의 aria-label 텍스트
				let labelLength = chartData.length
				this.ariaLabel = '결제예정금액 - '
				chartData.forEach((currentElement, index) => {
					this.ariaLabel += currentElement.Month + ' ' + this.cusApprovalOut[index].cdStlPlaAm
					if(index < labelLength - 1) {
						this.ariaLabel += ', '
					}
				})
				this.ariaLabel += ' 입니다.'

				console.log("================>ariaLabel : " + this.ariaLabel)

				// 최대 금액 구하기
				this.maxAm = 0;
				this.cusApprovalOut.forEach(d => {
					if(this.maxAm < d.cdStlPlaAm) {
						this.maxAm = d.cdStlPlaAm
					}
				})

				// 평균선 금액 만원 단위 변수 정의
				this.peerAvgAm = Math.floor(this.peerDataOut.peerXpsAm / 10000)
				this.peerAgeName = this.peerDataOut.agStnNm

				setTimeout(() => {
					this.initEvent()
					this.getChart(chartData)
				}, 10)	

			})
		},
        // 카드 청구상세 오픈
		openBillDetailPop(obj) {
			let mydtStlSqnoList = obj.mydtStlSqno.split("^")
			let rtnData = []

            if(mydtStlSqnoList.length  > 0) {
                mydtStlSqnoList.map(d => rtnData.push({"mydtStlSqno" : d}))
            }else{
                rtnData = {}
            }

            const config = {
                component: ASCD2004,
                params : {
					mydtCusno       : obj.mydtCusno,
					infOfrmnOrgC    : obj.infOfrmnOrgC,
					infOfrmnOrgCNm  : obj.infOfrmnOrgCNm,
					cdRqsYm	        : obj.cdRqsYm,
					// lastCdRqsYm     : this.cardBillList[0].cdRqsYm,
					mydtStlSqno     : rtnData,
                }
            }
            modalService.openPopup(config)
		},

        // 카드 리볼빙 상세 오픈
		openRvvDetailPop() {

            const config = {
                component: ASCD2009,
                params : {
					mydtCusno       : this.mydtCusno,
					infOfrmnOrgC    : this.infOfrmnOrgC,
					lnDsc     		: "RVV",
                }
            }
            modalService.openPopup(config)
		},		

		getChart(chartData) {
			rMateChartH5.create("chart1", "chartHolder", "useContextMenu=false", "100%", "170rem");//useContextMenu=false 차트메뉴 숨김
			// useContextMenu=false

			var baseValue = Math.floor(this.peerDataOut.peerXpsAm / 10000) // 또래평균금액 값(평균선 값)
			var maxValue  = Math.floor(this.maxAm / 10000) // 최대금액 값

			//임시
			// if(baseValue == 0) {
			// 	baseValue = Math.floor( maxValue / 2)
			// }			

			// if(baseValue > maxValue) {
			// 	maxValue = baseValue
			// }
			console.log('baseValue', baseValue)
			console.log('maxValue', maxValue)
				// 스트링 형식으로 레이아웃 정의.
			var layoutStr =
				'<rMateChart backgroundColor="transparent" borderStyle="none" >'
				+'<Stroke id="stroke1" color="#cbcdd6" weight="1"/>'
				/* 접근성 추가 displayCompleteCallFunction="removeTabindex" */
						+'<CurrencyFormatter id="nft" precision="0" currencySymbol="만원" alignSymbol="right"/>'
						+'<Column2DChart gutterLeft="0" dataTipFormatter="{nft}" maximum="'+ maxValue +'" showDataTips="true" columnWidthRatio="0.55" displayCompleteCallFunction="rMateFunction.removeTabindex">' 
						+'<horizontalAxis>'
							+'<CategoryAxis id="hAxis" categoryField="Month"/>'
						+'</horizontalAxis>'
						/* max 설정 */
						+'<verticalAxis>'
							+'<LinearAxis id="vAxis" maximum="'+ maxValue +'"/>'
							// +'<LinearAxis maximum="10000"/>'
						+'</verticalAxis>'
						/* //max 설정 */
						+'<verticalAxisRenderers>'
							+'<Axis2DRenderer axis="{vAxis}" visible="false"/>'
						+'</verticalAxisRenderers>'
						+'<horizontalAxisRenderers>'
								/* style로 정의한 axisLabel을 styleName으로 설정 합니다. */
							+'<Axis2DRenderer axis="{hAxis}" styleName="axisLabel"/>'
						+'</horizontalAxisRenderers>'
						+'<series>'
							//그래프 숫자 노출
							//+'<Column2DSeries yField="Profit" labelPosition="outside"  fontSize="12" color="#333"> '
							//그래프 숫자 노출제거
							+'<Column2DSeries yField="금액" displayName="금액" itemRenderer="SemiCircleColumnItemRenderer">'							
							+'<fills>'
							/* Series안에 색을 채울 때(여러색) fills에 주목 */
								/* color:색깔 */
								+'<SolidColor color="#668ee2"/>'
							+'</fills>'
							+'<showDataEffect>'
								+'<SeriesInterpolate/>'
							+'</showDataEffect>'
							+'</Column2DSeries>'
						+'</series>'
						// 평균선 추가
						+'<backgroundElements>'
						//+'<GridLines/>'
							+'<AxisMarker>'
								+'<lines>'
									+'<AxisLine value="0" label="" labelAlign="left" stroke="{stroke1}"/>'           
								+'</lines> '               
							+'</AxisMarker>'
							+'<AxisMarker>'
								+'<lines>'
									+'<AxisLine value="'+baseValue+'" lineStyle="dashLine">'
									// +'<AxisLine value="'+baseValue+'" lineStyle="dashLine" label="40대남성 평균선 테스트">'
										+'<stroke>'
											+'<Stroke color="#cbcdd6" weight="1"/>'
										+'</stroke>'
									+'</AxisLine>'                  
								+'</lines>'  
							+'</AxisMarker>'
						+'</backgroundElements>'				
					+'</Column2DChart>'
					+'<Style>'
						+'.axisLabel{fontSize:1.2rem;color:#333333;}'
					+'</Style>'
				+'</rMateChart>';

					
				// rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
				//
				// argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
				// argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
				// 
				// 아래 내용은 
				// 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
				// 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
				rMateChartH5.calls("chart1", {
					"setLayout" : layoutStr,
					"setData" : chartData
				});
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
		}
    },
    components : {
        CmmFinancialBanner      // 상품추천배너 2021.11.12
    }
}
</script>