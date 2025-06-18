<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 자산진단
* @ 페이지설명 : 자산 > 자산진단 > 자금 흐름 진단
* @ 파일명     : src\views\page\AS\IP\ASIP2007\ASIP2007.vue
* @ 작성자     : CS533039
* @ 작성일     : 2023-08-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-28              CS533039              최초작성
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
		<div class="popup_header">
			<h1>자금 흐름 진단</h1>
			<!-- <a href="#nolink" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<template>
					<div class="custom_box_chart" :class="{case01: flagGraph === '1', case02: flagGraph === '2', case03: flagGraph === '3'}">
						<div class="text">
							<div class="titH1">
								{{flagGraph === '1' ? '계좌 잔액이 부족할 것 같아요' : flagGraph === '2' ? '여유자금이 있을 것 같아요' : '잔액 변동이 없어요'}}
								<div class="custom_tooltip">
									<div class="com_tooltip_type02 com_tooltip_type03">
										<a href="javascript:void(0)" class="com_btn_info" role="button">
											<em class="com_icon_info question"><span class="blind">도움말 툴팁열기</span></em>
										</a>
									</div>
									<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
										<div>
											계좌 잔액 예상 서비스는 고객님의 입출금 계좌 현재 잔액에서 예상되는 고정지출 정보를 기반으로 30일 후 추정되는 자산 정보를 제공하며 실제 금액과 차이가 있을 수 있어요.
											<a href="javascript:void(0)" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> <!-- 말풍선영역 -->
									</div>
								</div>
								<p v-if="flagGraph === '1'">연체를 미리 예방하세요</p>
								<p v-else-if="flagGraph === '2'">노는 돈을 불려보세요</p>
								<p v-else>계좌 별 자금 흐름을 확인하세요</p>
							</div>
							
							<template v-if="flagGraph === '1'">
								<button type="button" class="stdBtn innerType01" title="잔액 채우기" @click.prevent="fn_openASAC1005()">
									잔액 채우기
								</button>
							</template>
							<template v-else-if="flagGraph === '2'">
								<button type="button" class="stdBtn innerType01" title="돈 불리기" @click.prevent="fn_openASAC1004()">
									돈 불리기
								</button>
							</template>
							<template v-else>
								<button type="button" class="stdBtn innerType01" title="계좌 연결" @click.prevent="fn_openCOAR2002()">
									계좌 연결
								</button>
							</template>							
						</div>
						
						<!-- 차트 -->
						<div class="compare_chart_wrap" role="img" :aria-label="chartLabel"><!-- 1004 접근성 반영 -->
							<div class="chart">
								<div class="bg"></div>
								<div class="bar_wrap">
									<div class="bars">
										<div class="bar bar01" :style="`height:${flagGraph === '1' ? '100' : '50'}%;`"><!-- 0727 height: 퍼센트로 수정 -->
											<span class="bar_date num">{{nowYyMm}}</span>
										</div>
										<div class="bar bar02" :style="{height: (flagGraph === '2' ? '100' : '50') + '%'}"><!-- 0727 height: 퍼센트로 수정 -->
											<div class="chart_tooltip_wrap">
												<span class="chart_tooltip"><em class="num">{{acDeltaAmt | numberFilter}}</em>원</span>
											</div>
											<span class="bar_date num">{{expYyMm}}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--// 차트 -->

						<div class="list_gray_box mt20">
							<dl>
								<dt>계좌 총 잔액</dt>
								<dd><em class="num">{{cusAcBac | numberFilter}}</em>원</dd>
							</dl>
							<dl>
								<dt>남은 예상지출</dt>
								<dd><em class="num">{{expXpsAmt | numberFilter}}</em>원</dd>
							</dl>
						</div>
					</div> 
				</template>
			</div>

			<hr class="hr02">

			<!-- 계좌 별 잔액예상 -->
			<div class="com_inner">
				<!-- 
					open : 펼쳐짐 
					open -> 삭제시 닫힘
				-->
				<div class="com_box_type01 toggle_list_box2 custom_list custom_box_list08">
					<div data-ui-toggle="box" class="toggle_box_area open">
						<button type="button" class="view_btn" aria-expanded="true">
							<div class="new_tit_area">
								<div class="tit"><span>계좌 별 잔액 예상</span></div>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<ul class="view_cont list_type_01">
						<li class="account_forecast_wrap" v-for="(item, idx) of balanceListIn" :key="'balance_'+idx">
							<a href="javascript:void(0)" role="button" @click.prevent="fn_openASIP2008(item)">
								<div class="account_forecast">
									<div class="title">
										<i :class="item.infOfrmnOrgCd"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
										<div class="prod">
											<span class="prod_name">{{item.acWrsnm}}</span>
											<span class="prod_num">{{item.mydtAcno}}</span>
										</div>										
									</div>
									<template v-if="item.asetStsc === 'POSITIVE'">
										<!-- 잔액여유 -->
										<span class="badge_2023 soft_mint">잔액여유</span>
									</template>
										<template v-else-if="item.asetStsc === 'NEGATIVE'">
										<!-- 잔액부족 -->
										<span class="badge_2023 soft_red">잔액부족</span>
									</template>
									<template v-else>
										<!-- 변동없음 -->
										<span class="badge_2023 soft_gray">변동없음</span>
									</template>										
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<!-- //계좌 별 잔액예상 -->
			<template v-if="futureListOut.length > 0">
				<hr class="hr02">

				<!-- 남은 예상지출 -->
				<div class="com_inner" >
					<strong class="titH4">남은 예상지출</strong>
					<div class="asset_more_list no_line" v-for="(futureItem, futureIdx) of futureListOut" :key="futureItem.trDt + '_' + futureIdx">
						<ul>
							<li>
								<dl class="forecast">
									<dt>{{futureItem.mchtnm}}</dt>
									<dd><em>-{{futureItem.xpsAmt | numberFilter}}</em>원</dd>
								</dl>
								<div class="date">{{futureItem.expDt | dateFilter("MM.DD")}}</div>
							</li>
						</ul>
					</div>
				</div>

			</template>
			<!-- //남은 예상지출 -->
		</div>
		
		<a class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a> 		
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import popupMixin from '@/common/mixins/popupMixin'
import {numberFormat} from '@/utils/number'
import ASAC1004 from '@/views/page/AS/AC/ASAC1004/ASAC1004'
import ASAC1005 from '@/views/page/AS/AC/ASAC1005/ASAC1005'
import ASIP2008 from '@/views/page/AS/IP/ASIP2008/ASIP2008'
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'
import {dayAdd, dateFormat} from '@/utils/date'
//import _ from 'lodash'

export default {
    name : "ASIP2007",
    data: () => {
        return {
			baseDt			: "",	// 기준일자 (현재일 기준 30일 이후, format :: MM월 DD일)
			nowDt			: "",	// 현재일자
			nowYyMm         : "",   // 현재일자 MM.DD
			expYyMm         : "",   // 종료일자 MM.DD
			cusAcBac        : 0,    // 고객계좌잔액
			expXpsAmt       : 0,    // 예상지출금액
            acDeltaAmt      : 0,    // 여유부족 자금 금액
			asetStsc        : "",   // 상태구분

			balanceListIn	: [],	// 계좌별 14일 이후 잔액 예상 
			futureListOut	: [],	// 다가올지출
			futureListDOut	: [],	// 재가공 다가올지출
			flagGraph		: "",	// 상단 막대그래프 부분 영역 flag - 30일 이후 (부족 : "1", 여유 : "2", 0 : "3")

			isApiCompl      : false,
			dBacPer         : 0,    // 잔액 비율
			chartLabel		: "",   // 
        }
    },
    computed : {
    },
    created() {
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
			this.nowDt = dateFormat(new Date(), "YYYYMMDD")
			//this.baseDt = dayAdd(29, this.nowDt)	// 기준일자
			this.nowYyMm = dateFormat(this.nowDt, "MM.DD")
			this.expYyMm = dateFormat(dayAdd(29, this.nowDt), "MM.DD")
			//this.cusnm	= this.getUserInfo('cusnm')	// 마이데이터 사용자명

            this.getData()
        },
        getData(){
			const config = {
				// 자금 흐름 진단조회
				url : "/as/ip/07r01", // 인터페이스ID: IF-MOB-PFM-ASIP07R01, 서비스코드: PFMAASIP07R01
				data : {
					mydtCusno : this.getUserInfo("mydtCusno"),
                    basDt     : this.nowDt
				}

			}
			apiService.call(config).then(response => {
				this.isApiCompl = true

                this.asetStsc       = response.asetStsc    // 상태구분               
                this.cusAcBac       = response.cusAcBac || 0     // 고객계좌 총 잔액               
                this.expXpsAmt      = response.expXpsAmt || 0    // 예상 지출금액      
                this.acDeltaAmt     = response.acDeltaAmt || 0   // 여유부족 자금 금액      
                                                                                                           
				this.balanceListIn  = response.balanceListIn || []  // 계좌별자금흐름내역 
				this.futureListOut  = response.futureListOut || []  // 남은예상지출내역 

				if(this.futureListOut.length > 0) {
					// 현재일자 기준 14일 후 이전 다가올 지출 필터링
					this.futureListOut = this.futureListOut.filter(d => {
						return d.xpsAmt > 0
					}).sort((a,b) => b.expDt - a.expDt)

				}

				if(this.asetStsc == 'POSITIVE') {
					this.flagGraph = '2'	// 여유
					this.dBacPer   = Math.round( ( this.cusAcBac / (this.cusAcBac + this.acDeltaAmt) ) * 50 );
					//console.log("--------------- dBacPer =   ", this.dBacPer);
				} else if(this.asetStsc == 'NEGATIVE') {
					this.flagGraph = '1'	// 부족
					this.dBacPer   = Math.round( ( (this.cusAcBac + this.acDeltaAmt) / this.cusAcBac ) * 100 );
					//console.log("--------------- dBacPer =   ", this.dBacPer);
				} else this.flagGraph = '3'								// 0

				this.chartLabel = "현재 잔액 " + numberFormat(this.cusAcBac) + "원, 한달 후 예상 잔액 " + numberFormat(this.acDeltaAmt) + "원"

			})
		},
		
		// 여유자금 있을경우 맞춤 상품추천 슬라이드 오픈
		fn_openASAC1004() {
			const config = {
				url	 : "/pd/pd/02ra1",
				data : {
					mydtCusno : this.getUserInfo("mydtCusno"),
					chnl : this.getUserInfo("chnl"),
				}
			}
			apiService.call(config).then(response => {
				let accountList = response.wrsRcmList || []

				const config_slide = {
					params : {
						accountList : accountList,
					},
					renderer : {
						component : ASAC1004
					}
				}
				modalService.openSlidePagePopup(config_slide)
			})
		},

		// 부족자금 있을경우 여유돈 찾기 팝업 오픈
		fn_openASAC1005() {
			const config = {
				component : ASAC1005,
				params : {

				}
			}
			modalService.openPopup(config)
		},

		// 예상 잔액 버튼 클릭
		fn_openASIP2008(accItem) {
			//console.log(accItem)
			const config = {
				component : ASIP2008,
				params : {
					selItem : accItem,
					bankList : this.balanceListIn || []  // 계좌내역 
				}
			}
			modalService.openPopup(config)			

		},

		// 자산 연결 버튼 클릭
		fn_openCOAR2002() {
			const config = {
				component : COAR2002,
				params : {}
			}
			modalService.openPopup(config)
		}

    },
    mixins: [
        popupMixin
        ,commonMixin
	],
    components: {
    },
}
</script>