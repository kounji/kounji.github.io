<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 예금
* @ 페이지설명 : 자산 > 예금 > 계좌별 잔액 예측 리포트
* @ 파일명     : src\views\page\AS\AC\ASAC1003\ASAC1003.vue
* @ 작성자     : CSXXXXXX
* @ 작성일     : XXXX-XX-XX
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* XXXX-XX-XX              CSXXXXXX              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>계좌 잔액 예측 리포트</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->

		</div>
		<div class="popup_content" v-show="isApiCompl"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_line_round custom_box11">
				<!-- case 1 : 부족자금 발생시, case 2 : 여유자금 발생시, case 3 여유자금 0원일시 -->
				<div class="custom_box_chart01 custom_box_box_shadowno p0 custom_box10" :class="'case0'+flagGraph">
					<div class="txt">
						<div>
							{{cusnm}}님 <span class="num">{{showBaseMm}}</span>월 <span :class="showBaseDd !== '말' ? 'num' : ''">{{showBaseDd}}</span>일 예상 잔액 합계는<br/>
							<span><strong class="num">{{dd14AfXpcTotBac | numberFilter}}</strong>원 입니다.</span>
							<div class="custom_tooltip">
								<div class="com_tooltip_type02 com_tooltip_type03">
									<a href="javascript:void(0);" class="com_btn_info">
										<em class="com_icon_info question"><span class="blind">툴팁열기</span></em>
										<!--!!!!!!!!!!!툴팁 화살표 관련 : 툴팁 클릭시 display : block 
											, 툴팁 닫을 때 display : none 처리 부탁드립니다!!!!!!!!!-->
										<span class="arrow" style="display:none"></span>
										<!--!!!!!!!!!!!툴팁 화살표 관련 : 툴팁 클릭시 display : block 
											, 툴팁 닫을 때 display : none 처리 부탁드립니다!!!!!!!!!-->
									</a>
								</div>
								<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
									<div>
										예상 지출 금액에는 카드결제예정금액과 입출금계좌에서 정기적으로 이체되는 적금, 적립식 펀드, 보험료, 원리금상환, 공과금 등이 포함되며, 조회 일자 별로 변동될 수 있습니다.
										<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
									</div> <!-- 말풍선영역 -->
								</div>
							</div>
						</div>
					</div>
					<!-- 차트 -->
					<div class="compare_chart_wrap">
						<div class="chart">
							<div class="bg">
								<div class="area mid">
									<div class="box">
										<span class="infoTxt">
											<!-- 부족자금 -->
											{{flagGraph === '1' ? "부족자금" : "여유자금"}}
											<p><strong class="num">{{dd14AfXpcTotBac | numberFilter}}</strong><em class="won">원</em></p>
										</span>
									</div>
								</div>
							</div>
							<div class="bar_wrap">
								<div class="bars">
									<div class="bar bar01"></div>
									<div class="bar bar02"></div>
								</div>
							</div>
						</div>
					</div>
					<!--// 차트 -->
					<div class="date">
						<div class="st">
							<span class="unit-tit">현재 통장 총 잔액</span>
							<p>
								<strong class="num">{{rndaAcTotBac | numberFilter}}</strong>
								<span class="unit">원</span>
							</p>
						</div>
						<div class="ed">
							<span class="unit-tit">{{showBaseMm}}월 {{showBaseDd}}일까지 예상지출</span>
							<p>
								<strong class="num">{{dd14TotXpcXpsAm | numberFilter}}</strong>
								<span class="unit">원</span>
							</p>
						</div>
					</div>
				</div> 
				<!--// case 1 : 부족자금 발생시 -->
				<template v-if="flagGraph === '1'">
					<div class="com_box_type01 no_data_wrapc custom_box9 custom_box10">
						<div class="custom_flex01">
							<p class="com_txtinfo_type01 color_ty"><strong>계좌 잔액이 부족해요</strong></p>
						</div>
						<div class="no_data_list">
							<div class="com_txt2">
								계좌별 예상잔액을 확인하신 후,<br/>
								잔액을 채워 연체를 예방하세요.
							</div>
						</div>
						<div class="btn_option"><button type="button" class="btn_round_new btn_mid_round line_gray" title="여유돈 찾기" @click.prevent="fn_openASAC1005()">여유돈 찾기</button></div>
					</div>
				</template>
				<template v-else-if="flagGraph === '2'">
					<div class="com_box_type01 no_data_wrapc custom_box9 custom_box10">
						<div class="custom_flex01">
							<p class="com_txtinfo_type01 color_ty"><strong>여유자금이 생겼어요</strong></p>
						</div>
						<div class="no_data_list">
							<div class="com_txt2">
								노는 돈 모아 종자돈 만들어 보세요.
							</div>
						</div>
						<div class="btn_option"><button type="button" class="btn_round_new btn_mid_round line_gray" title="저축하기" @click.prevent="fn_openASAC1004()">저축하기</button></div>
					</div>
				</template>

			</div>
			<div class="com_inner">
				<!-- 
					open : 펼쳐짐 
					open -> 삭제시 닫힘
				-->
				<div class="com_box_type01 toggle_list_box2 custom_list custom_box_list08">
					<div data-ui-toggle="box" class="toggle_box_area open">
						<button type="button" class="view_btn" aria-expanded="true">
							<div class="new_tit_area">
								<div class="tit"><span>계좌별 {{showBaseMm}}월 {{showBaseDd}}일 예상 잔액</span></div>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<ul class="view_cont list_type_01">
						<li v-for="(item, idx) of balanceListIn" :key="'balance_'+idx">
							<a href="javascript:void(0);" role="button" @click.prevent="fn_openASAC1006(item)">
								<dl>
									<dt>
										<div>
											<i :class="item.infOfrmnOrgC"><span class="blind">{{item.orgnm}}</span></i>
											<em>{{item.acWrsnm}}</em>
											<template v-if="item.acXpcBacStsc === '1'">
												<!-- 잔액여유 -->
												<span class="icon_mint icon_blue blue">잔액여유</span>
											</template>
											<template v-else-if="item.acXpcBacStsc === '2'">
												<!-- 잔액부족 -->
												<span class="icon_mint icon_red red">잔액부족</span>
											</template>
											<template v-else>
												<!-- 변동없음 -->
												<span class="icon_mint icon_grey2 grey2">변동없음</span>
											</template>
										</div>
									</dt>
								</dl>
							</a>
						</li>
					</ul>
				</div>

				<!-- 다가올 지출 항목 데이터 불일치로 hidden 처리 -->
				<!-- <div class="com_box_type01 custom_list" v-if="futureListOut.length > 0">
					<div class="new_tit_area inshadow">
						<div class="tit"><span>다가올 지출</span>
						</div>
						<span class="total_price">
							<em class="unit">합계</em><em class="num com_point_darkblue">{{casetXpsTotAm | numberFilter}}</em><em class="unit">원</em>
						</span>
					</div>

					<div class="list_multi" v-for="(futureItem, futureIdx) of futureListDOut" :key="futureItem.trDt + '_' + futureIdx">
						<div class="new_tit_area">
							<div class="tit"><em>{{futureItem.trDt.slice(6).replace(/(^0+)/,"")}}</em><span>일 {{futureItem.trWeekNm}}요일</span></div>
						</div>
						<ul class="list_type_01 line_color">
							<li v-for="(subItem, subIdx) of futureItem.list" :key="futureIdx + '_' + subIdx">
								<dl>
									<dt>
										<div>
											<i :class="subItem.infOfrmnOrgC"></i>
											<em class="disb">{{subItem.xpsDtlCntn}}</em>
										</div>
										<div>
											<span>
												<span>{{subItem.cusXpsWrsnm}}</span>
											</span>
										</div>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">{{subItem.casetXpsAm | numberFilter}}</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>
				
				<div class="com_box_type01 custom_list" v-else>
					<div class="new_tit_area inshadow">
						<div class="tit"><span>다가올 지출</span>
						</div>
					</div>					
					<p class="custom_box_info01">
						<span class="btn_plus_black">예정된 지출이 없습니다.</span>
					</p>					
				</div> -->
				
				<!--// 다가올 지출 항목 데이터 불일치로 hidden 처리 -->
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="fn_openCOAR2002()">자산 연결</a>
			</div>
		</div>
		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import popupMixin from '@/common/mixins/popupMixin'
import ASAC1004 from '@/views/page/AS/AC/ASAC1004/ASAC1004'
import ASAC1005 from '@/views/page/AS/AC/ASAC1005/ASAC1005'
import ASAC1006 from '@/views/page/AS/AC/ASAC1006/ASAC1006'
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'

import {dayAdd, dateFormat} from '@/utils/date'
import _ from 'lodash'

export default {
    name : "ASAC1003",
    data: () => {
        return {
			baseDt			: "",	// 기준일자 (현재일 기준 14일 이후, format :: MM월 DD일)
			nowDt			: "",	// 현재일자
			showNowMm		: "",	// 현재일자 월
			showNowDd		: "",	// 현재일자 일
			showBaseMm		: "",	// 화면 표시) 기준일자 월
			showBaseDd		: "",	// 화면 표시) 기준일자 일
			cusnm			: "",	// 마이데이터 사용자명
			reportOut		: {},	// 14일 이후 예상 잔액 요약/종합
			balanceListIn	: [],	// 계좌별 14일 이후 잔액 예상
			futureListOut	: [],	// 다가올지출
			futureListDOut	: [],	// 재가공 다가올지출
			flagGraph		: "",	// 상단 막대그래프 부분 영역 flag - 14일 이후 (부족 : "1", 여유 : "2", 0 : "3")
			trWeekMap			: [		// 요일 코드 별 명칭
				{code : '1',name : '일'},
				{code : '2',name : '월'},
				{code : '3',name : '화'},
				{code : '4',name : '수'},
				{code : '5',name : '목'},
				{code : '6',name : '금'},
				{code : '7',name : '토'}
			],

			dd14AfXpcTotBac	: 0,	// 14일 후 예상 총 잔액
			dd14TotXpcXpsAm	: 0,	// 14일 총 예상 지출 금액

			rndaAcTotBac	: 0,	// 입출금계좌 총 잔액

			casetXpsTotAm	: 0,	// 고객자산지출 합계 금액

			isApiCompl : false,
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
			this.baseDt = dayAdd(13, this.nowDt)	// 기준일자

			this.showBaseMm = this.baseDt.slice(4, 6).replace(/(^0+)/,"")	// 기준일자 월 (좌측 '0'포함시 '0'제거)
			this.showBaseDd = this.baseDt.slice(6).replace(/(^0+)/,"")		// 기준일자 일 (좌측 '0'포함시 '0'제거)
			this.showNowMm = this.nowDt.slice(4, 6).replace(/(^0+)/,"")		// 현재일자 월
			this.showNowDd = this.nowDt.slice(6).replace(/(^0+)/,"")		// 현재일자 일

			/**
			 * 1) +14일이 익월인 경우 문구 노출 :: ex) 11월 말일 ~
			 * 2) +14일이 익월이 아닌경우 문구 노출 :: ex) 11월 xx일 ~
			 */
			if(this.showNowMm !== this.showBaseMm) {
				// +14일이 익월인 경우
				this.showBaseMm = this.showNowMm
				this.showBaseDd = "말"
			}

			this.cusnm	= this.getUserInfo('cusnm')	// 마이데이터 사용자명

            this.getData()
        },
        getData(){
			const config = {
				url : "/as/ac/03ra1",
				data : {
					mydtCusno : this.getUserInfo("mydtCusno")
				}
			}
			apiService.call(config).then(response => {
				this.isApiCompl = true

				this.reportOut = response.reportOut || {}
				this.balanceListIn = response.balanceListIn || []
				this.futureListOut = response.futureListOut || []

				this.dd14AfXpcTotBac 	= this.reportOut.dd14AfXpcTotBac || 0	// 14일 후 예상 총 잔액
				this.dd14TotXpcXpsAm	= this.reportOut.dd14TotXpcXpsAm || 0	// 14일 후 예상 지출금액
				this.rndaAcTotBac		= this.reportOut.rndaAcTotBac || 0		// 입출금계좌 총 잔액

				this.casetXpsTotAm = 0
				if(this.futureListOut.length > 0) {
					// 다가올 지출 설정
					for(const futureItem of this.futureListOut) {
						this.casetXpsTotAm += futureItem.casetXpsAm

						futureItem.trWeekNm = _.find(this.trWeekMap, d => d.code === futureItem.trWeek).name
					}

					// 현재일자 기준 14일 후 이전 다가올 지출 필터링
					this.futureListOut = this.futureListOut.filter(d => {
						return (d.trDt >= this.nowDt && d.trDt <= this.baseDt)
					})

					// 다가올 지출 일자별 sort 후 재가공
					this.futureListDOut = _.chain(this.futureListOut)
						.uniqBy('trDt')
						.map(d => {
							return {
								trDt		: d.trDt,
								trWeek		: d.trWeek,
								trWeekNm	: d.trWeekNm,
								list		: _.filter(this.futureListOut, {
									trDt		: d.trDt,
									trWeek		: d.trWeek,
								})
							}
						})
						.orderBy('trDt', 'asc')
						.value()

				}

				if(this.reportOut.dd14AfXpcTotBac > 0) this.flagGraph = '2'			// 여유
				else if(this.reportOut.dd14AfXpcTotBac < 0) this.flagGraph = '1'	// 부족
				else this.flagGraph = '3'											// 0

			})
		},
		
		// 여유자금 있을경우 맞춤 상품추천 슬라이드 오픈
		fn_openASAC1004() {
			const config = {
				// url : "/as/ac/04ra1",
				url	 : "/pd/pd/02ra1",
				data : {
					// mydtCusno : "1000788058",
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
		fn_openASAC1006(accItem) {
			console.log(accItem)
			const config_api = {
				url : "/as/ac/06ra1",
				data : {
					mydtCusno : this.getUserInfo("mydtCusno"),
				}
			}
			apiService.call(config_api).then(response => {
				let bankList = response.bankList || []

				const config = {
					component : ASAC1006,
					params : {
						selItem : accItem,
						bankList : bankList,
					}
				}
				modalService.openPopup(config)
			})
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