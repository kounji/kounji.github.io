<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 지출 횟수 TOP3
* @ 파일명     : src\views\page\LC\IP\LCIP1009\LCIP1009.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-10-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-12              CS529599              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01" style="display:block;"> <!-- 개발시 style="display:block;" 삭제--> 
		<div class="popup_header">
			<h1>지출 횟수 TOP3</h1>
		</div>
		<div class="popup_content com_no_bottom">
			<div class="top_graph_info ">
				<div class="top_info_box com_line_type01">
					<div class="v_chart_wrap">
						<div class="chart_box mt20">
							<template v-for="(clntInfo, idx) in clntList">
								<div :class="'bar num bar0' + (idx+1)" :key="idx">{{(idx+1)}}</div>
							</template>
							<!--
							<div class="bar num bar01">1</div>
							<div class="bar num bar02">2</div>
							<div class="bar num bar03">3</div>
							-->
						</div>
					</div>
					<div class="top_chart_wrap v_chart_list">
						<div class="tab_content on">
							<table class="submain_list_wrap">
								<tbody>
									<template v-for="(clntInfo, idx) in clntList">
										<tr :class="'list case0' + (idx+1)" :key="idx">
											<td class="title">{{clntInfo.rzsClntnm}}</td>
											<td class="content">{{clntInfo.cntt | numberFilter}}건</td>
										</tr>
									</template>
									<!--
									<tr class="list case01">
										<td class="title">쿠팡(쿠페이)</td>
										<td class="content">5건</td>
									</tr>
									<tr class="list case02">
										<td class="title">㈜뉴코아-킴스아울렛</td>
										<td class="content">4건</td>
									</tr>
									<tr class="list case03">
										<td class="title">KH에너지직영광명주유소</td>
										<td class="content">3건</td>
									</tr>
									-->
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<ul class="list_more_box custom">
				<template v-for="(clntInfo, idx1) in clntList">
					<li :key="idx1">
						<div class="com_inner">
							<div class="new_tit_area">
								<div class="tit"><span>Top {{idx1+1}}</span><span class="txt_gray_count"><em>{{clntInfo.cntt | numberFilter}}</em>건</span></div>
								<div class="total_price">
									<span>합계</span><em class="num">{{clntInfo.xpsTtAm | numberFilter}}</em><em class="unit">원</em>
								</div>
							</div>
							<ul class="list_type_02">
								<template v-for="(clntXpsBrkInfo, idx2) in clntXpsBrkList">
									<li :key="idx2" v-if="clntInfo.rzsClntnm == clntXpsBrkInfo.xpsClntnm">
										<dl>
											<dt>
												<strong>{{Number(clntXpsBrkInfo.trDt.substr(6, 2))}}일</strong>
												<div>
													<em>{{clntXpsBrkInfo.xpsClntnm}}</em>
												</div>
												<span>
													<span>{{clntXpsBrkInfo.cdcoCdWrsnm}}</span>
												</span>
											</dt>
											<dd>
												<span class="com_price">
													<em class="num">{{clntXpsBrkInfo.tram | numberFilter}}</em><em class="unit">원</em>
												</span>
											</dd>
										</dl>
									</li>
								</template>
							</ul>
						</div>
					</li>
				</template>
				<!--
				<li>
					<div class="com_inner">
						<div class="new_tit_area">
							<div class="tit"><span>Top 1</span><span class="txt_gray_count"><em>5</em>건</span></div>
							<div class="total_price">
								<span>합계</span><em class="num">560,000</em><em class="unit">원</em>
							</div>
						</div>
						<ul class="list_type_02">
							<li>
								<dl>
									<dt>
										<strong>8일</strong>
										<div>
											<em>쿠팡(쿠페이)</em>
										</div>
										<span>
											<span>올라운드카드</span>
										</span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">320,000</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>
										<strong>12일</strong>
										<div>
											<em>쿠팡(쿠페이)</em>
										</div>
										<span>
											<span>올라운드카드</span>
										</span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">320,000</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>
										<strong>20일</strong>
										<div>
											<em>쿠팡(쿠페이)</em>
										</div>
										<span>
											<span>올라운드카드</span>
										</span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">320,000</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</li>
				<li>
					<div class="com_inner">
						<div class="new_tit_area">
							<div class="tit"><span>Top 2</span><span class="txt_gray_count"><em>5</em>건</span></div>
							<div class="total_price">
								<span>합계</span><em class="num">560,000</em><em class="unit">원</em>
							</div>
						</div>
						<ul class="list_type_02">
							<li>
								<dl>
									<dt>
										<strong>8일</strong>
										<div>
											<em>㈜뉴코아-킴스아울렛</em>
										</div>
										<span>
											<span>신한카드 Deep Oil</span>
										</span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">320,000</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>
										<strong>9일</strong>
										<div>
											<em>㈜뉴코아-킴스아울렛</em>
										</div>
										<span>
											<span>신한카드 Deep Oil</span>
										</span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">320,000</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>
										<strong>19일</strong>
										<div>
											<em>㈜뉴코아-킴스아울렛</em>
										</div>
										<span>
											<span>신한카드 Deep Oil</span>
										</span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">320,000</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</li>
				<li>
					<div class="com_inner">
						<div class="new_tit_area">
							<div class="tit"><span>Top 3</span><span class="txt_gray_count"><em>5</em>건</span></div>
							<div class="total_price">
								<span>합계</span><em class="num">560,000</em><em class="unit">원</em>
							</div>
						</div>
						<ul class="list_type_02">
							<li>
								<dl>
									<dt>
										<strong>8일</strong>
										<div>
											<em>KH에너지직영광명주유소</em>
										</div>
										<span>
											<span>KT-현대카드 M Edition3 (라이트할부형)</span>
										</span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">320,000</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>
										<strong>10일</strong>
										<div>
											<em>KH에너지직영광명주유소</em>
										</div>
										<span>
											<span>KT-현대카드 M Edition3 (라이트할부형)</span>
										</span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">320,000</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>
										<strong>15일</strong>
										<div>
											<em>KH에너지직영광명주유소</em>
										</div>
										<span>
											<span>KT-현대카드 M Edition3 (라이트할부형)</span>
										</span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">320,000</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</li>
				-->
			</ul>
			<!--// 20210712 한별 수정 E -->
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

export default {
    name : "LCIP1009",
    data: () => {
        return {
			cusNb: '',              // 마이데이터고객번호
			basYm: '',            	// 조회 기준년월 YYYYMM

			clntList: [],
			clntXpsBrkList: [],
        }
    },
    computed : {
    },
    created() {
		this.cusNb = this.getUserInfo("mydtCusno")
		this.basYm = this.params.pBasYm
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.getData();
        },
        getData() {
            const config = {
                url: '/lc/ip/09ra1', // 인터페이스ID: IF-MOB-PFM-LCA09, 서비스코드: PFMLCIP09RA1
                data: {
                    "mydtCusno" : this.cusNb,
                    "basYm" : this.basYm
                }
            }
            apiService.call(config).then(response =>{
				// console.log('response', JSON.parse(JSON.stringify(response)))
				let clntList = response.clntList || []
				let clntXpsBrkList = response.clntXpsBrkList || []

				/*
				clntList = [
					{ rzsOrd: '1', rzsClntnm: '쿠팡(쿠페이)', xpsTtAm: 30, amSgrt: 50, cntt: 15 },
					{ rzsOrd: '2', rzsClntnm: '㈜뉴코아-킴스아울렛  ', xpsTtAm: 20, amSgrt: 33.33, cntt: 12 },
					{ rzsOrd: '3', rzsClntnm: 'KH에너지직영광명주유소', xpsTtAm: 10, amSgrt: 16.666, cntt: 8 },
				]

				clntXpsBrkList = [
					{ xpsClntnm: '쿠팡(쿠페이)', trDt: '20221001', cdcoCdWrsnm: '올라운드카드', tram: '30000' },
					{ xpsClntnm: '쿠팡(쿠페이)', trDt: '20221002', cdcoCdWrsnm: '올라운드카드', tram: '30100' },
					{ xpsClntnm: ' 쿠팡(쿠페이) ', trDt: '20221006', cdcoCdWrsnm: ' 올라운드카드 ', tram: '30200' },
					{ xpsClntnm: '쿠팡(쿠페이)', trDt: '20221010', cdcoCdWrsnm: '올라운드카드', tram: '30300' },
					{ xpsClntnm: '쿠팡(쿠페이)', trDt: '20221022', cdcoCdWrsnm: '올라운드카드', tram: '30400' },

					{ xpsClntnm: '㈜뉴코아-킴스아울렛', trDt: '20221002', cdcoCdWrsnm: '삼성카드', tram: '20100' },
					{ xpsClntnm: ' ㈜뉴코아-킴스아울렛 ', trDt: '20221012', cdcoCdWrsnm: '삼성카드', tram: '20100' },
					{ xpsClntnm: '㈜뉴코아-킴스아울렛', trDt: '20221022', cdcoCdWrsnm: ' 삼성카드 ', tram: '20100' },

					{ xpsClntnm: ' KH에너지직영광명주유소 ', trDt: '20221022', cdcoCdWrsnm: ' 현대카드 ', tram: '60100' },
					{ xpsClntnm: 'KH에너지직영광명주유소', trDt: '20221025', cdcoCdWrsnm: '현대카드', tram: '60100' },
				]
				
				if (clntList) {
					for (let i =0; i < clntList.length; i++) {
                        let rzsClntnm   = clntList[i].rzsClntnm || '' 
                        rzsClntnm = rzsClntnm.trim()

                        clntList[i].rzsClntnm = rzsClntnm
					}
				}
				
				if (clntXpsBrkList) {
					for (let i =0; i < clntXpsBrkList.length; i++) {
                        let xpsClntnm = clntXpsBrkList[i].xpsClntnm || '' 
                        let cdcoCdWrsnm = clntXpsBrkList[i].cdcoCdWrsnm || ''
                        xpsClntnm = xpsClntnm.trim()
                        cdcoCdWrsnm = cdcoCdWrsnm.trim()

                        clntXpsBrkList[i].xpsClntnm = xpsClntnm
                        clntXpsBrkList[i].cdcoCdWrsnm = cdcoCdWrsnm
					}
				}
				*/

				this.clntList = clntList
				this.clntXpsBrkList = clntXpsBrkList
			})
        },
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>