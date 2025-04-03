<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 메인
* @ 페이지설명 : 큰글모드 > 자산 메인
* @ 파일명     : src/views/page/AS/TA/ASTA4S01/ASTA4S01.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
________________________________________________________________________
* 2025-02-11             CS541597               최초작성
*************************************************************************/
-->
<template>
    <!-- content-view S -->
    <page class="content-view mydata2023"><!-- lnb 존재시 class hasLNB -->

		<div id="content">
			<section class="assets_main_senior">
				<!--update-->
				<div class="update">
					<template v-if="!isMyAssetGathering">
						<span>{{ lastUpdateDtm }}</span>
						<button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
					</template>
					<span v-else class="ml5 num lsp0">자산 업데이트 중</span>
				</div>

				<!--순자산-->
				<div class="assets_net" :class="ntAsetTotAm > bfNtAsetTotAm ? 'up' : ntAsetTotAm < bfNtAsetTotAm ? 'down' : ''"><!--늘은경우 up, ,줄은 경우 down class 추가-->
					<div class="board_box">
						<h2>순자산</h2>
						<template v-if="asetTotCn > 0">
							<!-- 25-02-10 금액숨김 수정-->
							<div class="toggle_money">
								<input type="checkbox" title="금액숨김" name="" id="sum_view_01" v-model="asetTotAmHideYn" @change="fn_setHidden('TOT', asetTotAmHideYn)">
								<label for="sum_view_01" class="btns">
									<span class="hide" aria-hidden="true">보기</span>
									<span class="show" aria-hidden="true">숨김</span>
								</label>
								<div class="sum">
									<span class="hide">금액숨김</span>
									<span class="show"><em>{{ntAsetTotAm | numberFilter}}</em>원</span>
								</div>
							</div>
							<!-- //25-02-10 금액숨김 수정-->

							<div class="analysis">
								<template v-if="ntAsetTotAm > bfNtAsetTotAm || ntAsetTotAm < bfNtAsetTotAm">
									<span class="text">지난달보다</span><span class="num">{{asetIndAm | numberFilter}}원</span> <em>{{ntAsetTotAm > bfNtAsetTotAm ? '늘었어요.' : '줄었어요.'}}</em>
								</template>
								<template v-else>
									<span class="text">지난달과</span> <em>동일해요.</em>
								</template>
								<div class="custom_tooltip">
									<div class="com_tooltip_type02 com_tooltip_type03">
										<a href="#nolink" class="com_btn_info" role="button">
											<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
										</a>
										<div class="com_ballon_type01 com_ballon_type02" style="display: none;">
											<div>
												<ul class="dotted_list">
													<li>마지막 업데이트 시점의 총 자산과 마지막 업데이트 전 월 말일 총자산을 비교했습니다.</li>
													<li>오늘 업데이트 하셨으면 전 월 말일 총 자산과 비교한 결과입니다.</li>
												</ul>
												<a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<lottie-animation v-show="ntAsetTotAm > bfNtAsetTotAm" :animationData="require('@/assets_v40/images/lottie/icon_asset_up.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="icon_asset" ></lottie-animation>
							<lottie-animation v-show="ntAsetTotAm < bfNtAsetTotAm" :animationData="require('@/assets_v40/images/lottie/icon_asset_down.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="icon_asset" ></lottie-animation>
							<lottie-animation v-show="ntAsetTotAm == bfNtAsetTotAm" :animationData="require('@/assets_v40/images/lottie/icon_asset.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="icon_asset" ></lottie-animation>
						</template>
						<template v-else>
							<p class="txt">
								<span>연결한 자산이 없어요.</span> 
								<a href="javascript:void(0);" class="btns" @click.prevent="fn_openConAset">연결</a>
							</p>
							<p class="analysis"> 
								자산을 <br>연결해 보세요.
							</p>
							<lottie-animation :animationData="require('@/assets_v40/images/lottie/icon_asset.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="icon_asset" ></lottie-animation>
						</template>
					</div>
				</div>

				<template v-for="tab in asetTabs">
					<!--금융자산-->
					<div class="board_box assets_detail" v-if="tab.id == 'finance'" :key="tab.id">
						<details class="assets_toggle" open="">
							<summary>
								<div>
									<span class="item">금융자산</span>
								</div>
								<template v-if="asetFnTotCn > 0">
									<div class="analysis">
										<!-- 25-02-10 금액숨김 수정-->
										<div class="toggle_money">
											<input type="checkbox" title="금액숨김" name="" id="sum_view_02" v-model="asetFnAmHideYn" @change="fn_setHidden('FN', asetFnAmHideYn)">
											<label for="sum_view_02" class="btns">
												<span class="hide" aria-hidden="true">보기</span>
												<span class="show" aria-hidden="true">숨김</span>
											</label>
											<div class="sum">
												<template v-if="!asetFnAmHideYn">
													<em>{{asetFnAmSum | numberFilter}}</em>원
												</template>
												<template v-else>
													금액숨김
												</template>
											</div>
										</div>
										<!-- //25-02-10 금액숨김 수정-->
									</div>
								</template>
								<template v-else>
									<p class="txt">
										<span>금융자산이 없어요.</span> 
										<a href="javascript:void(0);" class="btns" @click.prevent="fn_openConAset">연결</a>
									</p>
								</template>
							</summary>
							<div class="cont">
								<ul class="assets_list">

									<li v-if="asetFnAcTtcn > 0">
										<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('fnAc')">
											<i class="ico_assets_main deposit"></i>
											<div>
												<strong class="name">예금 <em>{{asetFnAcTtcn | numberFilter}}</em></strong>
											</div>
											<strong class="num" v-if="!asetFnAmHideYn"><em>{{asetFnAcAmSum | numberFilter}}</em>원</strong>
											<strong class="txt" v-else>금액숨김</strong>
										</a>
									</li>
									<li v-else>
										<a href="javascript:void(0);" class="unconnected" @click.prevent="fn_openConAset">
											<div>
												<strong class="name">예금</strong>
											</div>
											<p class="txt">입출금, 예적금 확인하기</p>
										</a>
									</li>

									<li v-if="asetFnIvTtcn > 0">
										<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('fnIv')">
											<i class="ico_assets_main invest"></i>
											<div>
												<strong class="name">투자 <em>{{asetFnIvTtcn | numberFilter}}</em></strong>
											</div>
											<strong class="num" v-if="!asetFnAmHideYn"><em>{{asetFnIvAmSum | numberFilter}}</em>원</strong>
											<strong class="txt" v-else>금액숨김</strong>
										</a>
									</li>
									<li v-else>
										<a href="javascript:void(0);" class="unconnected" @click.prevent="fn_openConAset">
											<div>
												<strong class="name">투자</strong>
											</div>
											<p class="txt">수익률 확인하기</p>
										</a>
									</li>

									<li v-if="asetFnPnsTtcn > 0">
										<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('fnPns')">
											<i class="ico_assets_main annuity"></i>
											<div>
												<strong class="name">연금 <em>{{asetFnPnsTtcn | numberFilter}}</em></strong>
											</div>
											<strong class="num" v-if="!asetFnAmHideYn"><em>{{asetFnPnsAmSum | numberFilter}}</em>원</strong>
											<strong class="txt" v-else>금액숨김</strong>
										</a>
									</li>
									<li v-else>
										<a href="javascript:void(0);" class="unconnected" @click.prevent="fn_openConAset">
											<div>
												<strong class="name">연금</strong>
											</div>
											<p class="txt">노후준비 상태는?</p>
										</a>
									</li>

									<li v-if="asetFnPayPntTtcn > 0">
										<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('fnPay')">
											<i class="ico_assets_main point"></i>
											<div>
												<strong class="name">페이/포인트 <em>{{asetFnPayPntTtcn | numberFilter}}</em></strong>
											</div>
											<strong class="num" v-if="!asetFnAmHideYn"><em>{{asetFnPayPntAmSum | numberFilter}}</em>원</strong>
											<strong class="txt" v-else>금액숨김</strong>
										</a>
									</li>
									<li v-else>
										<a href="javascript:void(0);" class="unconnected" @click.prevent="fn_openConAset">
											<div>
												<strong class="name">페이/포인트</strong>
											</div>
											<p class="txt">숨은 돈 찾기</p>
										</a>
									</li>

								</ul>
							</div>
						</details>
					</div>

					<!--실물자산-->
					<div class="board_box assets_detail" v-if="tab.id == 'real'" :key="tab.id">
						<details class="assets_toggle" open="">
							<summary>
								<div>
									<span class="item">실물자산</span>
								</div>
								<template v-if="asetRlTotCn > 0">
									<div class="analysis">
										<!-- 25-02-10 금액숨김 수정-->
										<div class="toggle_money">
											<input type="checkbox" title="금액숨김" name="" id="sum_view_03" v-model="asetRlthHideYn" @change="fn_setHidden('RLTH', asetRlthHideYn)">
											<label for="sum_view_03" class="btns">
												<span class="hide" aria-hidden="true">보기</span>
												<span class="show" aria-hidden="true">숨김</span>
											</label>
											<div class="sum">
												<template v-if="!asetRlthHideYn">
													<em>{{asetRlthAmSum | numberFilter}}</em>원
												</template>
												<template v-else>
													금액숨김
												</template>
											</div>
										</div>
										<!-- //25-02-10 금액숨김 수정-->
									</div>
								</template>
								<template v-else>
									<p class="txt">
										<span>실물자산이 없어요.</span> 
										<a href="javascript:void(0);" class="btns" @click.prevent="fn_openConAset">등록</a>
									</p>
								</template>
							</summary>
							<div class="cont">
								<ul class="assets_list">
									<li v-if="asetRlthRlestCn > 0">
										<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('asetRlest')">
											<i class="ico_assets_main house"></i>
											<div>
												<strong class="name">부동산 <em>{{asetRlthRlestCn | numberFilter}}</em></strong>
											</div>
											<strong class="num" v-if="!asetRlthHideYn"><em>{{asetRlthRlestAm | numberFilter}}</em>원</strong>
											<strong class="txt" v-else>금액숨김</strong>
										</a>
									</li>
									<li v-else>
										<a href="javascript:void(0);" class="unconnected" @click.prevent="fn_openAddRlAset('asetRlest')">
											<div>
												<strong class="name">부동산</strong>
											</div>
											<p class="txt">최근 실거래는?</p>
										</a>
									</li>

									<li v-if="asetRlthCarCn > 0">
										<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('car')">
											<i class="ico_assets_main car"></i>
											<div>
												<strong class="name">자동차 <em>{{asetRlthCarCn | numberFilter}}</em></strong>
											</div>
											<strong class="num" v-if="!asetRlthHideYn"><em>{{asetRlthCarAm | numberFilter}}</em>원</strong>
											<strong class="txt" v-else>금액숨김</strong>
										</a>
									</li>
									<li v-else>
										<a href="javascript:void(0);" class="unconnected" @click.prevent="fn_openAddRlAset('car')">
											<div>
												<strong class="name">자동차</strong>
											</div>
											<p class="txt">시세 알아보기</p>
										</a>
									</li>
								</ul>
							</div>
						</details>
					</div>

					<!--기타자산-->
					<template v-if="tab.id == 'etc'">
						<div class="board_box assets_detail" v-if="asetEtcTotCn > 0" :key="tab.id">
							<div>
								<a href="javascript:void(0);" class="title" @click.prevent="fn_openDtlPop('etc')">기타자산</a>
							</div>
							<div class="analysis">
								<div class="toggle_money">
									<input type="checkbox" title="금액숨김" name="" id="sum_view_04" v-model="asetEtcHideYn" @change="fn_setHidden('ETC', asetEtcHideYn)">
									<label for="sum_view_04" class="btns">
										<span class="hide" aria-hidden="true">보기</span>
										<span class="show" aria-hidden="true">숨김</span>
									</label>
									<div class="sum">
										<template v-if="!asetEtcHideYn">
											<em>{{asetEtcAmSum | numberFilter}}</em>원
										</template>
										<template v-else>
											금액숨김
										</template>
									</div>
								</div>
							</div>
						</div>
					</template>

					<!--부채 -->
					<div class="board_box assets_detail" v-if="tab.id == 'debt'" :key="tab.id">
						<details class="assets_toggle" open="">
							<summary>
								<div>
									<span class="item">부채</span>
								</div>
								<template v-if="asetDbtTotCn > 0">
									<div class="analysis">
										<!-- 25-02-10 금액숨김 수정-->
										<div class="toggle_money">
											<input type="checkbox" title="금액숨김" name="" id="sum_view_05" v-model="dbtHideYn" @change="fn_setHidden('DBT', dbtHideYn)">
											<label for="sum_view_05" class="btns">
												<span class="hide" aria-hidden="true">보기</span>
												<span class="show" aria-hidden="true">숨김</span>
											</label>
											<div class="sum">
												<template v-if="!dbtHideYn">
													<em>{{dbtTotAm | numberFilter}}</em>원
												</template>
												<template v-else>
													금액숨김
												</template>
											</div>
										</div>
										<!-- //25-02-10 금액숨김 수정-->
									</div>
								</template>
								<template v-else>
									<p class="txt">
										<span>부채는 없어요. </span> 
										<a href="javascript:void(0);" class="btns" @click.prevent="fn_openConAset">연결</a>
									</p>
								</template>
							</summary>
							<div class="cont">
								<ul class="assets_list">
									<li v-if="dbtCdTcn > 0">
										<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('card')">
											<i class="ico_assets_main card"></i>
											<div>
												<strong class="name">카드 <em>{{dbtCdTcn | numberFilter}}</em></strong>
											</div>
											<strong class="num" v-if="!dbtHideYn"><em>{{dbtCdAmSum | numberFilter}}</em>원</strong>
											<strong class="txt" v-else>금액숨김</strong>
										</a>
									</li>
									<li v-else>
										<a href="javascript:void(0);" class="unconnected" @click.prevent="fn_openConAset">
											<div>
												<strong class="name">카드</strong>
											</div>
											<p class="txt">카드 대출 내역확인</p>
										</a>
									</li>

									<li v-if="dbtLonTtcn > 0">
										<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('loan')">
											<i class="ico_assets_main loan"></i>
											<div>
												<strong class="name">대출 <em>{{dbtLonTtcn | numberFilter}}</em></strong>
											</div>
											<strong class="num" v-if="!dbtHideYn"><em>{{dbtLonAmSum | numberFilter}}</em>원</strong>
											<strong class="txt" v-else>금액숨김</strong>
										</a>
									</li>
									<li v-else>
										<a href="javascript:void(0);" class="unconnected" @click.prevent="fn_openConAset">
											<div>
												<strong class="name">대출 </strong>
											</div>
											<p class="txt">꼼꼼히 계획하고 관리하기</p>
										</a>
									</li>

									<li v-if="stdntLonTtcn > 0">
										<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('edfln')">
											<i class="ico_assets_main student_loans"></i>
											<div>
												<strong class="name">학자금대출 <em>{{stdntLonTtcn | numberFilter}}</em></strong>
											</div>
											<strong class="num" v-if="!dbtHideYn"><em>{{stdntLonAmSum | numberFilter}}</em>원</strong>
											<strong class="txt" v-else>금액숨김</strong>
										</a>
									</li>

									<li v-if="dbtIstCn > 0">
										<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('istFn')">
											<i class="ico_assets_main installment"></i>
											<div>
												<strong class="name">할부금융 <em>{{dbtIstCn | numberFilter}}</em></strong>
											</div>
											<strong class="num" v-if="!dbtHideYn"><em>{{dbtIstAm | numberFilter}}</em>원</strong>
											<strong class="txt" v-else>금액숨김</strong>
										</a>
									</li>
									<li v-else>
										<a href="javascript:void(0);" class="unconnected" @click.prevent="fn_openConAset">
											<div>
												<strong class="name">할부금융 </strong>
											</div>
											<p class="txt">상환 현황을 한눈에!</p>
										</a>
									</li>

									<li v-if="dbtCarIstCn > 0">
										<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('carIst')">
											<i class="ico_assets_main car_installment"></i>
											<div>
												<strong class="name">자동차할부 <em>{{dbtCarIstCn | numberFilter}}</em></strong>
											</div>
											<strong class="num" v-if="!dbtHideYn"><em>{{dbtCarIstAm | numberFilter}}</em>원</strong>
											<strong class="txt" v-else>금액숨김</strong>
										</a>
									</li>
									<li v-if="dbtLeasCn > 0">
										<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('lease')">
											<i class="ico_assets_main lease"></i>
											<div>
												<strong class="name">리스 <em>{{dbtLeasCn | numberFilter}}</em></strong>
											</div>
											<strong class="num" v-if="!dbtHideYn"><em>{{dbtLeasAm | numberFilter}}</em>원</strong>
											<strong class="txt" v-else>금액숨김</strong>
										</a>
									</li>
									<li v-if="dbtCshCn > 0">
										<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('brrCsh')">
											<i class="ico_assets_main borrow"></i>
											<div>
												<strong class="name">빌린돈 <em>{{dbtCshCn | numberFilter}}</em></strong>
											</div>
											<strong class="num" v-if="!dbtHideYn"><em>{{dbtCshAm | numberFilter}}</em>원</strong>
											<strong class="txt" v-else>금액숨김</strong>
										</a>
									</li>
								</ul>
							</div>
						</details>
					</div> 

					<!--보험료 월 납입료 -->
					<div class="board_box assets_detail" v-if="tab.id == 'insure'" :key="tab.id">
						<template v-if="asetIsrTotCn > 0">
							<details class="assets_toggle" open="">
								<summary>
									<div>
										<div class="item">월 납입 보험료
											<div class="custom_tooltip up">
												<div class="com_tooltip_type02 com_tooltip_type03">
													<a href="#nolink" class="com_btn_info" role="button">
														<em class="tooltip_icon_gray"><span class="blind">툴팁열기</span></em>
													</a>
												</div>
												<div class="com_ballon_type01 com_ballon_type02" style="display: none;">
													<div>
														<strong class="h_tit03">인보험이란?</strong>
														<ul class="bl_dot_list">
															<li>사람의 생명이나 신체 손해에 대한 보험으로 생명, 상해, 질병 보험 등이 속해요.</li>
														</ul>
														<strong class="h_tit03">물보험이란?</strong>
														<ul class="bl_dot_list">
															<li>물건과 기타 재산 피해에 대한 보험으로 화재, 운송, 해상, 자동차, 펫보험 등이 속해요.</li>
														</ul>

														<a href="#nolink" class="com_btn_close"><span
																class="blind">툴팁닫기</span></a>
													</div>
												</div>
											</div>
											<!-- //25-03-12 툴팁추가 및 마크업 변경 -->
										</div><!-- 25-02-28 문구수정 -->
									</div>
									<div class="analysis">
										<div class="toggle_money">
											<!-- 25-03-06 보험료 금액숨김 제외 -->
											<div class="sum">
												<em>{{isrPymIsrfeTt | numberFilter}}</em>원
											</div>
										</div>
									</div>
								</summary>
								<div class="cont">
									<ul class="assets_list">
										<li v-if="isrMnInsuCn">
											<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('humIsr')">
												<i class="ico_assets_main in_insurance"></i>
												<div>
													<strong class="name">인보험 <em>{{isrMnInsuCn | numberFilter}}</em></strong>
												</div>
												<strong class="num" v-if="!isrHideYn"><em>{{isrMnTotPymIsrfe | numberFilter}}</em>원</strong>
												<strong class="txt" v-else>금액숨김</strong>
											</a>
										</li>
										<li v-if="isrTngInsuCn">
											<a href="javascript:void(0);" @click.prevent="fn_openDtlPop('tngIsr')">
												<i class="ico_assets_main mul_insurance"></i>
												<div>
													<strong class="name">물보험 <em>{{isrTngInsuCn | numberFilter}}</em></strong>
												</div>
												<strong class="num" v-if="!isrHideYn"><em>{{isrTngTotPymIsrfe | numberFilter}}</em>원</strong>
												<strong class="txt" v-else>금액숨김</strong>
											</a>
										</li>
									</ul>
								</div>
							</details>
						</template>
						<template v-else>
							<div>
								<span class="title">월 납입 보험료</span>
							</div>
							<p class="txt">
								<span>보장내용 체크하기 </span> 
								<a href="javascript:void(0);" class="btns" @click.prevent="fn_openConAset">연결</a>
							</p>
						</template>
					</div>
				</template>

				<!--금융지식-->
				<!-- <div class="finlit" v-if="financeKlList.length > 0">
					<h2 class="h_tit01">금융지식</h2>
					<a href="javascript:void(0);" class="btn_lots" @click.prevent="fn_movePage('COCT4001')"><span class="blind">더보기</span></a>

					<div class="scroller">
						<ul>
							<li v-for="(item, idx) in financeKlList" :key="idx">
								<a href="javascript:void(0);" @click.prevent="fn_openFncKlDtl(item.cntzId)">
									<img :src="item.thmnlImgUrlnm" alt="" @error="emptyImg">
									<strong>{{item.cntzTinm}}</strong>
									<span class="hash" v-if="!!item.rcmKwrdCntn">#{{item.rcmKwrdCntn}}</span>
								</a>
							</li>
						</ul>
					</div>
				</div> -->
			</section>

		</div>
		<!--// content E -->
					
		<footersV2 type="as" />
    </page>
    <!--// content-view E -->
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import LottieAnimation from 'lottie-web-vue' 
import {mapGetters, mapActions} from 'vuex'    

import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'
import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011'
import CORE2201 from '@/views/page/CO/RE/CORE2201/CORE2201'	// 부동산등록
import COCA2101 from '@/views/page/CO/CA/COCA2101/COCA2101'	// 자동차등록
import ASTA4S02 from '@/views/page/AS/TA/ASTA4S02/ASTA4S02'
import ASTA4S03 from '@/views/page/AS/TA/ASTA4S03/ASTA4S03'
import ASTA4S04 from '@/views/page/AS/TA/ASTA4S04/ASTA4S04'
import ASTA4S05 from '@/views/page/AS/TA/ASTA4S05/ASTA4S05'
import ASTA4S06 from '@/views/page/AS/TA/ASTA4S06/ASTA4S06'
import ASTA4S07 from '@/views/page/AS/TA/ASTA4S07/ASTA4S07'
import ASTA4S08 from '@/views/page/AS/TA/ASTA4S08/ASTA4S08'
import ASTA4S09 from '@/views/page/AS/TA/ASTA4S09/ASTA4S09'
import ASTA4S10 from '@/views/page/AS/TA/ASTA4S10/ASTA4S10'
import ASTA4S11 from '@/views/page/AS/TA/ASTA4S11/ASTA4S11'
import ASTA4S12 from '@/views/page/AS/TA/ASTA4S12/ASTA4S12'
import ASTA4S13 from '@/views/page/AS/TA/ASTA4S13/ASTA4S13'
import ASTA4S14 from '@/views/page/AS/TA/ASTA4S14/ASTA4S14'
import ASTA4S15 from '@/views/page/AS/TA/ASTA4S15/ASTA4S15'
import ASTA4S16 from '@/views/page/AS/TA/ASTA4S16/ASTA4S16'
import ASTA4S17 from '@/views/page/AS/TA/ASTA4S17/ASTA4S17'

export default {
	name : "ASTA4S01",
	data: () => {
		return {
			cusnm               : "",
			finalUpdateDtm  	: '',     // 최근 자산 업데이트 시기
			rcnInqDtm           : 0,      // 최근조회일시        
			ntAsetTotAm         : 0,      // 순자산총금액        
			bfNtAsetTotAm       : 0,      // 이전순자산총금액    
			indNtAsetTotAm      : 0,      // 증감순자산총금액    
			asetTotAm           : 0,      // 총자산금액          
			bfAsetTotAm         : 0,      // 이전총자산금액      
			indAsetTotAm        : 0,      // 증감총자산금액      
			asetFnAmSum         : 0,      // 금융자산금액        
			bfAsetFnAmSum       : 0,      // 이전금융자산금액    
			indAsetFnAcSum      : 0,      // 증감금융자산금액    
			asetFnAcAmSum       : 0,      // 금융자산계좌금액    
			asetFnAcTtcn        : 0,      // 금융자산계좌건수    
			asetFnIvAmSum       : 0,      // 금융자산투자금액    
			asetFnIvTtcn        : 0,      // 금융자산투자건수    
			asetFnPnsAmSum      : 0,      // 금융자산연금금액    
			asetFnPnsTtcn       : 0,      // 금융자산연금건수    
			asetFnPayPntAmSum   : 0,      // 금융자산페이머니금액
			asetFnPayPntTtcn    : 0,      // 금융자산페이머니건수
			asetRlthAmSum       : 0,      // 실물자산금액합계    
			bfAsetRlthAmSum     : 0,      // 이전실물자산금액합계
			indAsetRlthAmSum    : 0,      // 증감실물자산금액합계
			asetRlthRlestAm     : 0,      // 실물자산부동산금액  
			asetRlthRlestCn     : 0,      // 실물자산부동산건수  
			asetRlthCarAm       : 0,      // 실물자산자동차금액  
			asetRlthCarCn       : 0,      // 실물자산자동자건수  
			asetEtcAmSum        : 0,      // 기타자산금액합계    
			asetEtcTtcn         : 0,      // 기타자산건수        
			bfAsetEtcAmSum      : 0,      // 이전기타자산금액합계
			indAsetEtcAmSum     : 0,      // 증감기타자산금액합계
			asetEtcCshAmSum     : 0,      // 기타자산현금합계    
			asetEtcCshCn        : 0,      // 기타자산현금건수    
			asetEtcKrwCshAm     : 0,      // 기타자산한화현금금액
			asetEtcKrwCshCn     : 0,      // 기타자산한화현금건수
			asetEtcFcCshAm      : 0,      // 기타자산외화현금금액
			asetEtcFcCshCn      : 0,      // 기타자산외화현금건수
			asetEtcGoldAm       : 0,      // 기타자산골드금액    
			asetEtcGoldCn       : 0,      // 기타자산골드건수    
			asetEtcEtcAm        : 0,      // 기타자산기타금액    
			asetEtcEtcCn        : 0,      // 기타자산기타금액    
			dbtTotAm            : 0,      // 총부채금액          
			bfDbtTotAm          : 0,      // 이전총부채금액      
			indDbtTotAm         : 0,      // 증감총부채금액      
			dbtLonAmSum         : 0,      // 부채대출금액합계    
			dbtLonTtcn          : 0,      // 부채대출건수        
			stdntLonAmSum		: 0,	  // 학자금대출금액합계
			stdntLonTtcn		: 0,	  // 학자금대출건수
			dbtCdAmSum          : 0,      // 부채카드금액합계    
			dbtCdTcn            : 0,      // 부채카드총건수      
			dbtIstAm            : 0,      // 부채할부금융금액    
			dbtIstCn            : 0,      // 부채할부금융건수    
			dbtCarIstAm         : 0,      // 부채자동차할부금액  
			dbtCarIstCn         : 0,      // 부채자동차할부건수  
			dbtLeasAm           : 0,      // 부채금융리스금액    
			dbtLeasCn           : 0,      // 부채금융리스건수    
			dbtCshAm            : 0,      // 부채현금금액        
			dbtCshCn            : 0,      // 부채현금건수        
			isrPymIsrfeTt       : 0,      // 보험납입보험료합계  
			isrTtcn             : 0,      // 보험합계건수        
			isrMnTotPymIsrfe    : 0,      // 인보험납입총보험료  
			isrMnInsuCn         : 0,      // 인보험납입건수      
			isrTngTotPymIsrfe   : 0,      // 물보험납입총보험료  
			isrTngInsuCn        : 0,      // 물보험납입건수          
			
			asetRlthTtcn        : 0,      // 실물자산건수 
			dbtTtcn             : 0,      // 부채총건수 

			asetTotAmHideYn		: false,  // 순자산 숨김 여부
			asetFnAmHideYn		: false,  // 금융자산 총금액 숨김 여부
			asetRlthHideYn		: false,  // 실물자산 총금액 숨김 여부
			asetEtcHideYn		: false,  // 기타자산 총금액 숨김 여부
			dbtHideYn			: false,  // 부채 총금액 숨김 여부
			isrHideYn			: false,  // 보험료 총금액 숨김 여부

			asetTotCn			: 0,	  // 자산 총 건수
			asetFnTotCn			: 0,	  // 금융자산 총 건수 (예금 + 투자 + 연금 + 페이/포인트)
			asetRlTotCn			: 0,	  // 실물자산 총 건수 (부동산 + 자동차)
			asetEtcTotCn		: 0,	  // 기타자산 총 건수 (현금 + 외화 + 금 + 농기계)
			asetDbtTotCn		: 0,	  // 부채 총 건수 (카드 + 대출 + 학자금대출 + 할부금융 + 자동차할부 + 리스 + 빌린돈)
			asetIsrTotCn		: 0,	  // 보험 총 건수 (인보험 + 물보험)

			financeKlList		: [],	  // 금융지식 컨텐츠 목록

			asetTabs			: [],	  // 일반모드 설정 자산 영역 노출 순서
		}
	},
	computed : {
		...mapGetters('myassets', [
			'isMyAssetGathering','lastUpdateDtm'
		]),
	},
	mixins: [
		commonMixin
	],
	created() {
		//초기데이타 선언
		this.cusnm = this.getUserInfo("cusnm")

		this.fn_setCompSortInfo()
	},
	mounted() {
		this.initComponent()
		this.listenSubscribe() //자산수집 뮤테이션 처리용
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
	},
	methods: {
		...mapActions('myassets', [
			'getAllMyAssetInfo'
		]),            
		initComponent() {
			let amtHdnList = this.getSecretAmInfo() || []
			this.asetTotAmHideYn = amtHdnList.includes('TOT')
			this.asetFnAmHideYn	 = amtHdnList.includes('FN')
			this.asetRlthHideYn	 = amtHdnList.includes('RLTH')
			this.asetEtcHideYn	 = amtHdnList.includes('ETC')
			this.dbtHideYn		 = amtHdnList.includes('DBT')
			this.isrHideYn		 = amtHdnList.includes('ISR')

			Promise.all([
				this.getData(),
				// this.getFinanceKlList(),
			])
		},
		fn_setHidden(flag, type) {
			this.setSecretAmInfo(flag, type)
		},
		getData() {
			///////////////////////////////////
			// 계좌목록 조회 
			const config = {
				url: '/as/as/00ra2',
				data: {
					mydtCusno : this.getUserInfo('mydtCusno')
					// mydtCusno: '2000003756'
				}
			}
			apiService.call(config).then(async response =>{
				//console.log("======= /as/ip/00ra2 나의 자산조회 response =======", response)

				this.respInfo = response

				this.rcnInqDtm           = this.respInfo.rcnInqDtm           // 최근조회일시 
						
				this.ntAsetTotAm         = this.respInfo.ntAsetTotAm         // 순자산총금액        
				this.bfNtAsetTotAm       = this.respInfo.bfNtAsetTotAm       // 이전순자산총금액    
				this.indNtAsetTotAm      = this.respInfo.indNtAsetTotAm      // 증감순자산총금액    
				this.asetTotAm           = this.respInfo.asetTotAm           // 총자산금액          
				this.bfAsetTotAm         = this.respInfo.bfAsetTotAm         // 이전총자산금액      
				this.indAsetTotAm        = this.respInfo.indAsetTotAm        // 증감총자산금액 
				
				// 금융자산     
				this.asetFnAmSum         = this.respInfo.asetFnAmSum         // 금융자산금액        
				this.bfAsetFnAmSum       = this.respInfo.bfAsetFnAmSum       // 이전금융자산금액    
				this.indAsetFnAcSum      = this.respInfo.indAsetFnAcSum      // 증감금융자산금액    
				// 25.02.21) 계좌금액, 건수는 별도 api 호출
				//this.asetFnAcAmSum       = this.respInfo.asetFnAcAmSum       // 금융자산계좌금액    
				//this.asetFnAcTtcn        = this.respInfo.asetFnAcTtcn        // 금융자산계좌건수    
				this.asetFnIvAmSum       = this.respInfo.asetFnIvAmSum       // 금융자산투자금액    
				this.asetFnIvTtcn        = this.respInfo.asetFnIvTtcn        // 금융자산투자건수    
				this.asetFnPnsAmSum      = this.respInfo.asetFnPnsAmSum      // 금융자산연금금액    
				this.asetFnPnsTtcn       = this.respInfo.asetFnPnsTtcn       // 금융자산연금건수    
				this.asetFnPayPntAmSum   = this.respInfo.asetFnPayPntAmSum   // 금융자산페이머니금액
				this.asetFnPayPntTtcn    = this.respInfo.asetFnPayPntTtcn    // 금융자산페이머니건수
				
				// 실물자산
				this.asetRlthAmSum       = this.respInfo.asetRlthAmSum       // 실물자산금액합계    
				this.bfAsetRlthAmSum     = this.respInfo.bfAsetRlthAmSum     // 이전실물자산금액합계
				this.indAsetRlthAmSum    = this.respInfo.indAsetRlthAmSum    // 증감실물자산금액합계
				this.asetRlthRlestAm     = this.respInfo.asetRlthRlestAm     // 실물자산부동산금액  
				this.asetRlthRlestCn     = this.respInfo.asetRlthRlestCn     // 실물자산부동산건수  
				this.asetRlthCarAm       = this.respInfo.asetRlthCarAm       // 실물자산자동차금액  
				this.asetRlthCarCn       = this.respInfo.asetRlthCarCn       // 실물자산자동자건수  
				
				// 기타자산
				this.asetEtcAmSum        = this.respInfo.asetEtcAmSum        // 기타자산금액합계    
				this.asetEtcTtcn         = this.respInfo.asetEtcTtcn         // 기타자산건수        
				this.bfAsetEtcAmSum      = this.respInfo.bfAsetEtcAmSum      // 이전기타자산금액합계
				this.indAsetEtcAmSum     = this.respInfo.indAsetEtcAmSum     // 증감기타자산금액합계
				this.asetEtcCshAmSum     = this.respInfo.asetEtcCshAmSum     // 기타자산현금합계    
				this.asetEtcCshCn        = this.respInfo.asetEtcCshCn        // 기타자산현금건수    
				this.asetEtcKrwCshAm     = this.respInfo.asetEtcKrwCshAm     // 기타자산한화현금금액
				this.asetEtcKrwCshCn     = this.respInfo.asetEtcKrwCshCn     // 기타자산한화현금건수
				this.asetEtcFcCshAm      = this.respInfo.asetEtcFcCshAm      // 기타자산외화현금금액
				this.asetEtcFcCshCn      = this.respInfo.asetEtcFcCshCn      // 기타자산외화현금건수
				this.asetEtcGoldAm       = this.respInfo.asetEtcGoldAm       // 기타자산골드금액    
				this.asetEtcGoldCn       = this.respInfo.asetEtcGoldCn       // 기타자산골드건수    
				this.asetEtcEtcAm        = this.respInfo.asetEtcEtcAm        // 기타자산기타금액    
				this.asetEtcEtcCn        = this.respInfo.asetEtcEtcCn        // 기타자산기타금액  
				
				// 부채  
				this.dbtTotAm            = this.respInfo.dbtTotAm            // 총부채금액          
				this.bfDbtTotAm          = this.respInfo.bfDbtTotAm          // 이전총부채금액      
				this.indDbtTotAm         = this.respInfo.indDbtTotAm         // 증감총부채금액      
				this.dbtLonAmSum         = this.respInfo.dbtLonAmSum         // 부채대출금액합계    
				this.dbtLonTtcn          = this.respInfo.dbtLonTtcn          // 부채대출건수        
				this.dbtCdAmSum          = this.respInfo.dbtCdAmSum          // 부채카드금액합계    
				this.dbtCdTcn            = this.respInfo.dbtCdTcn            // 부채카드총건수      
				this.dbtIstAm            = this.respInfo.dbtIstAm            // 부채할부금융금액    
				this.dbtIstCn            = this.respInfo.dbtIstCn            // 부채할부금융건수    
				this.dbtCarIstAm         = this.respInfo.dbtCarIstAm         // 부채자동차할부금액  
				this.dbtCarIstCn         = this.respInfo.dbtCarIstCn         // 부채자동차할부건수  
				this.dbtLeasAm           = this.respInfo.dbtLeasAm           // 부채금융리스금액    
				this.dbtLeasCn           = this.respInfo.dbtLeasCn           // 부채금융리스건수    
				this.dbtCshAm            = this.respInfo.dbtCshAm            // 부채현금금액        
				this.dbtCshCn            = this.respInfo.dbtCshCn            // 부채현금건수 
				
				// 보험납입보험료       
				this.isrPymIsrfeTt       = this.respInfo.isrPymIsrfeTt       // 보험납입보험료합계  
				this.isrTtcn             = this.respInfo.isrTtcn             // 보험합계건수        
				this.isrMnTotPymIsrfe    = this.respInfo.isrMnTotPymIsrfe    // 인보험납입총보험료  
				this.isrMnInsuCn         = this.respInfo.isrMnInsuCn         // 인보험납입건수      
				this.isrTngTotPymIsrfe   = this.respInfo.isrTngTotPymIsrfe   // 물보험납입총보험료  
				this.isrTngInsuCn        = this.respInfo.isrTngInsuCn        // 물보험납입건수 	

				this.asetRlthTtcn        = this.asetRlthRlestCn + this.asetRlthCarCn   // 실물자산건수 = 실물자산부동산건수 + 실물자산자동차건수
				// 부채총건수 
				this.dbtTtcn             = this.dbtLonTtcn + this.dbtCdTcn + this.dbtIstCn + this.dbtCarIstCn + this.dbtLeasCn + this.dbtCshCn

				// 2025.02.11) 서비스 내 전월 대비 순자산 증감 계산로직 없으므로 화면 내 계산
				this.indNtAsetTotAm = 0	// 증감순자산총금액
				/** 이전순자산금액 = 이전금융자산금액 + 이전실물자산금액 + 이전기타자산금액 - 이전총부채금액 */
				this.bfNtAsetTotAm = this.bfAsetFnAmSum + this.bfAsetRlthAmSum + this.bfAsetEtcAmSum - this.bfDbtTotAm
				this.indNtAsetTotAm = Math.abs(this.ntAsetTotAm - this.bfNtAsetTotAm)

				this.asetIndAm =  Math.abs(this.indNtAsetTotAm)  // 증감순자산총금액

				//25.02.21) 예금(마이너스 계좌), 투자건수 갱신, 학자금 대출 추가 조회
				this.getMyAssetAdsv()

				this.$nextTick(() => {
					this.fn_setAsetCn()
				})
			})
		},
		/**
		 * 계좌 목록조회 (NH콕마이데이터4.0 추가정보 조회)
		 */
		getMyAssetAdsv() {
			const config = {
				url: '/as/as/00ra3',
				data: {
					"mydtCusno" : this.getUserInfo('mydtCusno')
					// mydtCusno: '2000003756'
				}
			}
			apiService.call(config).then(response =>{
				//예금
				this.asetFnAcTtcn 	= response.totAccn || 0		// 예금 총 건수
				this.asetFnAcAmSum	= response.acBalttAm || 0	// 예금 총 금액
				//투자
				// this.asetFnIvTtcn 	= response.ivtotAccn || 0	// 투자 총 건수
				// this.asetFnIvAmSum	= response.ivAcTotBac || 0	// 투자 총 금액
				// 학자금대출
				this.stdntLonTtcn 	= response.loanCnt || 0		// 학자금대출 총 건수
				this.stdntLonAmSum 	= response.loanAmnt || 0	// 학자금대출 총 금액

				// 학자금 제외 대출 정보 업데이트
				this.dbtLonTtcn 	= this.dbtLonTtcn - this.stdntLonTtcn	// 대출 총 카운트 - 학자금대출 카운트
				this.dbtLonAmSum 	= this.dbtLonAmSum - this.stdntLonAmSum	// 대출 총 금액 - 학자금대출 금액
			})
		},
		/**
		 * 마이너스 계좌 포함 조회 api (미사용)
		 */
		async getAcAset() {
			const config = {
				url: '/as/ac/01r03',
				data: {
					mydtCusno: this.getUserInfo('mydtCusno')
				}
			}
			await apiService.syncCall(config).then(response => {
				this.asetFnAcAmSum = response.acBalttAm		// 계좌총액 업데이트
				this.asetFnAcTtcn = response.totAccn		// 계좌건수 업데이트 (마이너스 계좌 건수 포함)

				//this.getStdntLn()
			})
		},
		/**
		 * 학자금 대출 정보 조회 api (미사용)
		 */
		async getStdntLn() {
			const config = {
				url: '/as/el/01r01',
				data: {
					mydtCusno: this.getUserInfo('mydtCusno')
				}
			}
			await apiService.syncCall(config).then(response => {
				// 학자금 대출 정보
				this.stdntLonTtcn  = response.loanCnt
				this.stdntLonAmSum = response.loanAmnt

				// 학자금 제외 대출 정보 업데이트
				this.dbtLonTtcn 	= this.dbtLonTtcn - this.stdntLonTtcn	// 대출 총 카운트 - 학자금대출 카운트
				this.dbtLonAmSum 	= this.dbtLonAmSum - this.stdntLonAmSum	// 대출 총 금액 - 학자금대출 금액

				//this.fn_setAsetCn()
			})
		},

		/**
		 * 금융지식 컨텐츠 조회
		 */
        getFinanceKlList(){ 
            this.getFinanInfo('ASTA4001', 4, false).then(response => {
                this.financeKlList = response
                // *출력값
                // -썸네일이미지URL명  = thmnlImgUrlnm
                // -글번호 = cntzId
                // -컨텐츠제목 = cntzTinm
                // -추천연령 = asetAgLrgDsnm
            })
        },

		/**
		 * 금융지식 컨텐츠 상세 팝업오픈
		 */
		fn_openFncKlDtl(cntzId) {
			const config = {
				component: COCT4011,
				params: cntzId
			}
			modalService.openPopup(config)
		},

		/**
		 * 항목별 건수 설정
		 */
		fn_setAsetCn() {
			// asetTotCn		전체자산 총 건수
			// asetFnTotCn		금융자산 총 건수 (예금 + 투자 + 연금 + 페이/포인트)
			// asetRlTotCn		실물자산 총 건수 (부동산 + 자동차)
			// asetEtcTotCn 	기타자산 총 건수 (현금 + 외화 + 금 + 농기계)
			// asetDbtTotCn 	부채 총 건수 (카드 + 대출 + 학자금대출 + 할부금융 + 자동차할부 + 리스 + 빌린돈)
			// asetIsrTotCn 	보험 총 건수 (인보험 + 물보험)
			
			this.asetFnTotCn = this.asetFnAcTtcn + this.asetFnIvTtcn + this.asetFnPnsTtcn + this.asetFnPayPntTtcn
			this.asetRlTotCn = this.asetRlthRlestCn + this.asetRlthCarCn
			this.asetEtcTotCn = this.asetEtcTtcn
			this.asetDbtTotCn = this.dbtCdTcn + this.dbtLonTtcn + this.stdntLonTtcn + this.dbtIstCn + this.dbtCarIstCn + this.dbtLeasCn + this.dbtCshCn
			this.asetIsrTotCn = this.isrTtcn

			this.asetTotCn = this.asetFnTotCn + this.asetRlTotCn + this.asetEtcTotCn + this.asetDbtTotCn + this.asetIsrTotCn
		},

		/**
		 * 화면이동
		 */
		fn_movePage(menu) {
			const config = {
				name: menu
			}
			
			if (menu === 'ASRE4001') {
				config.params = {
					rlestTtAm : this.asetRlthRlestAm
				}
			}	
			//console.log('## config ##', config)			
			commonService.movePage(config)
		},

		/**
		 * 자산연결 팝업오픈
		 */
		fn_openConAset() {
			const config = {
				component: COAR4001
			}
			modalService.openPopup(config).then(() => {
				this.initComponent()
			})
		},

		/**
		 * 실물자산(부동산, 자동차) 등록 팝업 오픈
		 */
		fn_openAddRlAset(menu) {
			let id = ''
			switch (menu) {
				case 'asetRlest':
					id = CORE2201
					break
				case 'car':
					id = COCA2101
					break
				default: return
			}
			const config = {
				component: id
			}
			modalService.openPopup(config).then(() => {
				this.getData()
			})
		},

		/**
		 * 마이데이터4.0 신규
		 * 자산 상세팝업 호출
		 */
		fn_openDtlPop(menu) {
			let id = ''
			switch (menu) {
				///// 자산 S /////
				case 'fnAc' : 	// 예금
					id = ASTA4S02 
					break
				case 'fnIv' :	// 투자
					id = ASTA4S03
					break
				case 'fnPns' :	// 연금
					id = ASTA4S04
					break
				case 'fnPay' :	// 페이/포인트
					id = ASTA4S05
					break
				case 'asetRlest' : // 부동산
					id = ASTA4S06
					break
				case 'car' : // 자동차
					id = ASTA4S07
					break
				case 'etc' : // 기타자산
					id = ASTA4S08
					break
				///// 자산 E /////

				///// 부채 S /////
				case 'card' : // 카드
					id = ASTA4S09
					break
				case 'loan' : // 대출
					id = ASTA4S10
					break
				case 'edfln' : // 학자금대출
					id = ASTA4S17
					break
				case 'istFn' : // 할부금융
					id = ASTA4S11
					break
				case 'carIst' : // 자동차할부
					id = ASTA4S12
					break
				case 'lease' : // 리스
					id = ASTA4S13
					break
				case 'brrCsh' : // 빌린돈
					id = ASTA4S14
					break
				///// 부채 E /////

				///// 보험 S /////
				case 'humIsr' : // 인보험
					id = ASTA4S15
					break
				case 'tngIsr' : // 물보험
					id = ASTA4S16
					break
				default : return
			}

			const config = {
				component: id
			}

			modalService.openPopup(config).then(() => {
				this.getData()
			})
		},

		/*
		* 자산등록 팝업호출
		*/
		fn_openAssetPage() {                
			const config = {
				component: COAR2001,
			}
			modalService.openPopup(config).then(() => {
				this.getData();
			})
		},

		// 신규 자산 연결
		fn_openNewConnect(orgDsc) {
			// modalService.alert(orgDsc + " 자산 연결 준비중입니다.")
			const config = {
				component : COAR2002,
				params : {
					isMramNew : true,
					orgDsc : orgDsc
				}
			}
			modalService.openPopup(config).then(() => {
				
			})
		},
		/*
		* 자산 수집 호출 (기관코드 0000000000은 ==> 전체 수집 의미)
		*/
		fn_refreshApiCall() {
			this.getAllMyAssetInfo()
		},
		// 자산수집 mutation 이벤트 감지 
		listenSubscribe() {
			this.getGatheringListenSubscribe()
			// this.subscribe = this.$store.subscribe((mutation, state) => {
			//     const isMyAssetGathering = mutation.type === 'myassets/completeMyAssetGatherData'
			//     // 예금 전체조회
			//     if (isMyAssetGathering) {
			//         console.log('자산수집 subscribe  ###############################', mutation, state)
			//         this.getData()
			//     }
			// })
		},
		emptyImg(e) {
			e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
		},
		/**
		 * 자산 영역 노출순서 정보 설정
		 */
		fn_setCompSortInfo() {
			console.log('>>> order >>> ', this.getAsetMain())
			this.asetTabs = this.getAsetMain()
			if(this.asetTabs.length == 0) {
				// 최초 접속하는경우 기본 값 처리 (로컬스토리지 저장 없음)
				this.asetTabs = [ {id:'finance', name:"금융자산", hidden:'N'}, {id:'real', name:"실물자산", hidden:'N'}, {id:'etc', name:"기타자산", hidden:'N'},
								  {id:'debt', name:"부채", hidden:'N'}, {id:'insure', name:"보험료 월 납입료", hidden:'N'} ]
			}
		},
	},
	components : {
		Page,
		FootersV2,
		LottieAnimation
	}
}
</script>