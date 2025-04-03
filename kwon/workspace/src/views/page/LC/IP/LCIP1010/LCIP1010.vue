<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 정기지출 리포트 - 카테고리별
* @ 파일명     : src\views\page\LC\IP\LCIP1010\LCIP1010.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-10-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-12              CS529599              최초작성
*************************************************************************/
-->
<template>
	<div id="tab_01" role="tabpanel" class="cmm-tab-panel pt0 on">
		<ul class="list_more_box custom">
			<template v-for="(xpsCtgrInfo, idx1) in xpsCtgrList">
				<li :key="idx1">
					<div class="new_tit_area">
						<div class="tit">
							<i :class="'icon ' + xpsCtgrInfo.xpsCtgrC"></i>
							<span>{{xpsCtgrInfo.xpsCtgrNm}}</span>
						</div>
						<div class="total_price">
							<span>합계</span>
							<em class="num">{{xpsCtgrInfo.xpsAm | numberFilter}}</em>
							<span>원</span>
						</div>
					</div>
					<ul class="list_type_02">
						<template v-for="(xpsDtlInfo, idx2) in xpsDtlList">
							<li :key="idx2" v-if="xpsCtgrInfo.xpsCtgrC == xpsDtlInfo.xpsCtgrC">
								<dl>
									<dt>
										<strong>{{Number(xpsDtlInfo.trDt.substr(6, 2))}}일</strong>
										<div>
											<em>{{xpsDtlInfo.xpsDtlCntn}}</em>
										</div>
										<span>
											<span>{{xpsDtlInfo.orgnm}}</span>
											<span>{{xpsDtlInfo.wrsnm}}</span>
										</span>
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
											</div>
											납부 내역이 없습니다.
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
					</ul>
				</li>
			</template>
			<!--
			<li>
				<div class="new_tit_area">
					<div class="tit">
						<i class="icon AS20000014"></i>
						<span>주거·통신</span>
					</div>
					<div class="total_price">
						<span>합계</span>
						<em class="num">220,000</em>
						<span>원</span>
					</div>
				</div>
				<ul class="list_type_02">
					<li>
						<dl>
							<dt>
								<strong>30일</strong>
								<div>
									<em>가스 7월 - 1건</em>
								</div>
								<span>
									<span>은행명</span>
									<span>계좌명</span>
								</span>
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
									</div>
									납부 내역이 없습니다.
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
								<strong>30일</strong>
								<div>
									<em>가스 7월 - 1건</em>
								</div>
								<span>
									<span>은행명</span>
									<span>계좌명</span>
								</span>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
				</ul>
			</li>
			<li>
				<div class="new_tit_area">
					<div class="tit">
						<i class="icon AS20000013"></i>
						<span>금융</span>
					</div>
					<div class="total_price">
						<span>합계</span>
						<em class="num">220,000</em>
						<span>원</span>
					</div>
				</div>
				<ul class="list_type_02">
					<li>
						<dl>
							<dt>
								<strong>30일</strong>
								<div>
									<em>가스 7월 - 1건</em>
								</div>
								<span>
									<span>은행명</span>
									<span>계좌명</span>
								</span>
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
									</div>
									납부 내역이 없습니다.
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
								<strong>30일</strong>
								<div>
									<em>가스 7월 - 1건</em>
								</div>
								<span>
									<span>은행명</span>
									<span>계좌명</span>
								</span>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
				</ul>
			</li>
			<li>
				<div class="new_tit_area">
					<div class="tit">
						<i class="icon AS20000010"></i>
						<span>보험</span>
					</div>
					<div class="total_price">
						<span>합계</span>
						<em class="num">220,000</em>
						<span>원</span>
					</div>
				</div>
				<ul class="list_type_02">
					<li>
						<dl>
							<dt>
								<strong>30일</strong>
								<div>
									<em>가스 7월 - 1건</em>
								</div>
								<span>
									<span>은행명</span>
									<span>계좌명</span>
								</span>
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
									</div>
									납부 내역이 없습니다.
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
								<strong>30일</strong>
								<div>
									<em>가스 7월 - 1건</em>
								</div>
								<span>
									<span>은행명</span>
									<span>계좌명</span>
								</span>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
				</ul>
			</li>
			<li>
				<div class="new_tit_area">
					<div class="tit">
						<i class="icon AS20000009"></i>
						<span>문화</span>
					</div>
					<div class="total_price">
						<span>합계</span>
						<em class="num">220,000</em>
						<span>원</span>
					</div>
				</div>
				<ul class="list_type_02">
					<li>
						<dl>
							<dt>
								<strong>30일</strong>
								<div>
									<em>가스 7월 - 1건</em>
								</div>
								<span>
									<span>은행명</span>
									<span>계좌명</span>
								</span>
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
									</div>
									납부 내역이 없습니다.
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
								<strong>30일</strong>
								<div>
									<em>가스 7월 - 1건</em>
								</div>
								<span>
									<span>은행명</span>
									<span>계좌명</span>
								</span>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
				</ul>
			</li>
			<li>
				<div class="new_tit_area">
					<div class="tit">
						<i class="icon AS20000016"></i>
						<span>기타</span>
					</div>
					<div class="total_price">
						<span>합계</span>
						<em class="num">220,000</em>
						<span>원</span>
					</div>
				</div>
				<ul class="list_type_02">
					<li>
						<dl>
							<dt>
								<strong>30일</strong>
								<div>
									<em>가스 7월 - 1건</em>
								</div>
								<span>
									<span>은행명</span>
									<span>계좌명</span>
								</span>
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
									</div>
									납부 내역이 없습니다.
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
								<strong>30일</strong>
								<div>
									<em>가스 7월 - 1건</em>
								</div>
								<span>
									<span>은행명</span>
									<span>계좌명</span>
								</span>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">20,000</em><em class="unit">원</em>
								</span>
							</dd>
						</dl>
					</li>
				</ul>
			</li>
			-->
		</ul>
	</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

export default {
    name : "LCIP1010",
    data: () => {
        return {
			xpsCtgrList: [],
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
			// console.log('tab1_setData', JSON.stringify(data))
			let xpsCtgrList = data.xpsCtgrList || []
			let xpsDtlList = data.xpsDtlList || []

			this.xpsCtgrList = xpsCtgrList
			this.xpsDtlList = xpsDtlList
		}
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>