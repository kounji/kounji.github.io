<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 정기지출 리포트 - 예정날자별
* @ 파일명     : src\views\page\LC\IP\LCIP1011\LCIP1011.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-10-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-12              CS529599              최초작성
*************************************************************************/
-->
<template>
	<div id="tab_02" role="tabpanel" class="cmm-tab-panel on">
		<!-- loop 1차(완료된 지출, 납부 미확인 지출, 다가올 지출) -->
		<div class="com_box_type01 custom_list" v-for="(xpsStInfo, idx1) in xpsStList" :key="idx1">
			<div class="new_tit_area inshadow">
				<div class="tit"><span>{{xpsStInfo.xpsStNm}}</span></div>
				<span class="total_price">
					<em class="unit">합계</em><em class="num com_point_darkblue">{{xpsStInfo.xpsAm | numberFilter}}</em><em class="unit">원</em>
				</span>
			</div>
			<!-- loop 2차(일자-지출상태별로 있는 것만) -->
			<template v-for="(dayInfo, idx2) in getDayList(xpsStInfo.xpsSt)">
				<div class="list_multi" :key="idx2">
					<div class="new_tit_area">
						<div class="tit"><em>{{dayInfo.day}}</em><span>일 {{dayInfo.trWeekDayNm}}</span></div>
					</div>
					<ul class="list_type_01 line_color">
						<!-- loop 3차(일별 지출내역) -->
						<template v-for="(xpsDtlInfo, idx3) in xpsDtlList">
							<template v-if="xpsStInfo.xpsSt == xpsDtlInfo.xpsSt && dayInfo.trDt == xpsDtlInfo.trDt">
								<li :key="idx3">
									<dl>
										<dt>
											<div>
												<i :class="xpsDtlInfo.xpsCtgrC"></i>
												<em class="disb">{{xpsDtlInfo.xpsDtlCntn}}</em>
											</div>
											<div>
												<span>
													<span>{{xpsDtlInfo.orgnm}}</span>
													<span>{{xpsDtlInfo.wrsnm}}</span>
												</span>
											</div>
											<div class="notice_red" v-if="xpsDtlInfo.xpsSt == '2'">
												<div class="com_tooltip_type02 com_tooltip_type03">
													<a href="javascript:void(0);" class="com_btn_info">
														<em class="com_icon_info3"><span class="blind">툴팁열기</span></em>
														<!--!!!!!!!!!!!툴팁 화살표 관련 : 툴팁 클릭시 display : block 
															, 툴팁 닫을 때 display : none 처리 부탁드립니다!!!!!!!!!-->
														<span class="arrow" style="display:none"></span>
														<!--!!!!!!!!!!!툴팁 화살표 관련 : 툴팁 클릭시 display : block 
															, 툴팁 닫을 때 display : none 처리 부탁드립니다!!!!!!!!!-->
													</a>
													<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
														<div>납부 내역이 확인이 되지 않는 정기지출이지만 합계에는 포함됩니다.
															<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
														</div> <!-- 말풍선영역 -->
													</div>
												</div>납부 내역이 없습니다.
											</div>
										</dt>
										<dd>
											<span class="com_price">
												<em class="num">{{xpsDtlInfo.xpsAm | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li>
							</template>
						</template>
					</ul>
				</div>
			</template>
		</div>

		<!--
		<div class="com_box_type01 custom_list">
			<div class="new_tit_area inshadow">
				<div class="tit"><span>완료된 지출</span>
				</div>
				<span class="total_price">
					<em class="unit">합계</em><em class="num com_point_darkblue">850,000</em><em class="unit">원</em>
				</span>
			</div>
			<div class="list_multi">
				<div class="new_tit_area">
					<div class="tit"><em>15</em><span>일 목요일</span></div>
				</div>
				<ul class="list_type_01 line_color">
					<li>
						<dl>
							<dt>
								<div>
									<i class="AS20000013"></i>
									<em class="disb">이자·대출</em>
									<em class="disb">705160046169 </em>
								</div>
								<div>
									<span>
										<span>은행명</span>
										<span>계좌명</span>
									</span>
								</div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>
								<div>
									<i class="AS20000005"></i>
									<em class="disb">넷플릭스</em>
								</div>
								<div>
									<span>
										<span>은행명</span>
										<span>계좌명</span>
									</span>
								</div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
				</ul>
			</div>
			<div class="list_multi">
				<div class="new_tit_area">
					<div class="tit"><em>15</em><span>일 금요일</span></div>
				</div>
				<ul class="list_type_01 line_color">
					<li>
						<dl>
							<dt>
								<div>
									<i class="AS20000013"></i>
									<em class="disb">이자·대출</em>
									<em class="disb">705160046169 </em>
								</div>
								<div>
									<span>
										<span>은행명</span>
										<span>계좌명</span>
									</span>
								</div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>
								<div>
									<i class="AS20000005"></i>
									<em class="disb">넷플릭스</em>
								</div>
								<div>
									<span>
										<span>은행명</span>
										<span>계좌명</span>
									</span>
								</div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
				</ul>
			</div>
			
		</div>
		<div class="com_box_type01 custom_list">
			<div class="new_tit_area inshadow">
				<div class="tit"><span>납부 미확인 지출</span>
				</div>
				<span class="total_price">
					<em class="unit">합계</em><em class="num com_point_darkblue">850,000</em><em class="unit">원</em>
				</span>
			</div>
			<div class="list_multi">
				<div class="new_tit_area">
					<div class="tit"><em>15</em><span>일 목요일</span></div>
				</div>
				<ul class="list_type_01 line_color">
					<li>
						<dl>
							<dt>
								<div>
									<i class="AS20000013"></i>
									<em class="disb">이자·대출</em>
									<em class="disb">705160046169 </em>
								</div>
								<div>
									<span>
										<span>은행명</span>
										<span>계좌명</span>
									</span>
								</div>
								<div class="notice_red">
									<div class="com_tooltip_type02 com_tooltip_type03">
										<a href="javascript:void(0);" class="com_btn_info">
											<em class="com_icon_info3"><span class="blind">툴팁열기</span></em>
											<span class="arrow" style="display:none"></span>
										</a>
										<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
											<div>납부 내역이 확인이 되지 않는 정기지출이지만 합계에는 포함됩니다.
												<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
											</div>
										</div>
									</div>납부 내역이 없습니다.
								</div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
						
					</li>
					<li>
						<dl>
							<dt>
								<div>
									<i class="AS20000005"></i>
									<em class="disb">넷플릭스</em>
								</div>
								<div>
									<span>
										<span>은행명</span>
										<span>계좌명</span>
									</span>
								</div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
				</ul>
			</div>
			<div class="list_multi">
				<div class="new_tit_area">
					<div class="tit"><em>15</em><span>일 금요일</span></div>
				</div>
				<ul class="list_type_01 line_color">
					<li>
						<dl>
							<dt>
								<div>
									<i class="AS20000013"></i>
									<em class="disb">이자·대출</em>
									<em class="disb">705160046169 </em>
								</div>
								<div>
									<span>
										<span>은행명</span>
										<span>계좌명</span>
									</span>
								</div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>
								<div>
									<i class="AS20000005"></i>
									<em class="disb">넷플릭스</em>
								</div>
								<div>
									<span>
										<span>은행명</span>
										<span>계좌명</span>
									</span>
								</div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
				</ul>
			</div>
		</div>
		<div class="com_box_type01 custom_list">
			<div class="new_tit_area inshadow">
				<div class="tit"><span>다가올 지출</span>
				</div>
				<span class="total_price">
					<em class="unit">합계</em><em class="num com_point_darkblue">850,000</em><em class="unit">원</em>
				</span>
			</div>
			<div class="list_multi">
				<div class="new_tit_area">
					<div class="tit"><em>15</em><span>일 목요일</span></div>
				</div>
				<ul class="list_type_01 line_color">
					<li>
						<dl>
							<dt>
								<div>
									<i class="AS20000013"></i>
									<em class="disb">이자·대출</em>
									<em class="disb">705160046169 </em>
								</div>
								<div>
									<span>
										<span>은행명</span>
										<span>계좌명</span>
									</span>
								</div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
						
					</li>
					<li>
						<dl>
							<dt>
								<div>
									<i class="AS20000005"></i>
									<em class="disb">넷플릭스</em>
								</div>
								<div>
									<span>
										<span>은행명</span>
										<span>계좌명</span>
									</span>
								</div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
				</ul>
			</div>
			<div class="list_multi">
				<div class="new_tit_area">
					<div class="tit"><em>15</em><span>일 금요일</span></div>
				</div>
				<ul class="list_type_01 line_color">
					<li>
						<dl>
							<dt>
								<div>
									<i class="AS20000013"></i>
									<em class="disb">이자·대출</em>
									<em class="disb">705160046169 </em>
								</div>
								<div>
									<span>
										<span>은행명</span>
										<span>계좌명</span>
									</span>
								</div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>
								<div>
									<i class="AS20000005"></i>
									<em class="disb">넷플릭스</em>
								</div>
								<div>
									<span>
										<span>은행명</span>
										<span>계좌명</span>
									</span>
								</div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
				</ul>
			</div>
		</div>
		-->
	</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

export default {
    name : "LCIP1011",
    data: () => {
        return {
			xpsStList: [],
			xpsDtlList: [],
        }
    },
	props: {
		res: {
			type: Object,
			default: () => {}
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
	update() {
	},
    methods: {
        initComponent() {
            this.getData();
        },
        getData() {
		},
		setData(data) {
			// console.log('tab2_setData', JSON.stringify(data))
			let xpsStList = data.xpsStList || []
			let xpsDtlList = data.xpsDtlList || []

			for (let i = 0; i < xpsStList.length; i++) {
				if (xpsStList[i].xpsSt == '1') {
					xpsStList[i].xpsStNm = '완료된 지출'
				}
				if (xpsStList[i].xpsSt == '2') {
					xpsStList[i].xpsStNm = '납부 미확인 지출'
				}
				if (xpsStList[i].xpsSt == '3') {
					xpsStList[i].xpsStNm = '다가올 지출'
				}
			}

			this.xpsStList = xpsStList
			this.xpsDtlList = xpsDtlList
		},
		getDayList(xpsSt) {
			let dayList = []
			let xpsDtlList = this.xpsDtlList

			let tmp = null
			for (let i = 0; i < xpsDtlList.length; i++) {
				if (xpsSt != xpsDtlList[i].xpsSt) continue

				if (xpsDtlList[i].trDt != tmp) {
					dayList.push({ trDt: xpsDtlList[i].trDt, day: Number(xpsDtlList[i].trDt.substr(6, 2)), trWeekDayNm: xpsDtlList[i].trWeekDayNm })
				}

				tmp = xpsDtlList[i].trDt
			}

			return dayList
		}
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>