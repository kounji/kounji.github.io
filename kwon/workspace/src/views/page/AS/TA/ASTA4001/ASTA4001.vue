<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 전체
* @ 페이지설명 : 나의자산 > 자산 > 전체 메인
* @ 파일명     : src/views/page/AS/TA/ASTA2001/ASTA2001.vue
* @ 작성자     : CS533039
* @ 작성일     : 2023-08-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
________________________________________________________________________
* 2023-08-21             CS533039             ASAC1001 -> ASTA2001
*************************************************************************/
-->
<template>
    <!-- content-view S -->
    <page class="content-view"><!-- lnb 존재시 class hasLNB -->
        <!-- S :: 자산 카테고리 -->
        <!-- <as-category-v2 type="ALL"></as-category-v2> -->
        <!-- E :: 자산 카테고리 -->

		<!-- content-view S -->
		<!-- lnb 존재시 class hasLNB -->
		<!-- <div class="content-view mydata2023"> -->
		<!-- content S -->
		<div id="content">
			<section class="assets_main">
				<!--배너-->
				<cmm-flot-banner bnnrExpsDsVal="42" @reload="initComponent"/>
				<!--update-->
				<div class="update">
					<template v-if="!isMyAssetGathering">
						<span>{{ assetUpdateDtm }}</span> <!-- V4.0 -->
						<button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
					</template>
					<template v-else>
						<span>자산 업데이트 중</span>
						<button type="button" class="btn_update"><span class="blind">업데이트</span></button>
					</template>
				</div>

				<!--순자산-->
					<!--늘은경우 up,줄은 경우 down class 추가, 동일한 경우 클래스 없음 -->
				<div class="assets_net" :class="astIndSum > 0 ? 'up' : astIndSum < 0 ? 'down' : ''">
					<div class="outline">
						<h2>순자산</h2>
						<div class="custom_tooltip up">
							<div class="com_tooltip_type02 com_tooltip_type03">
								<a href="javascript:void(0);" class="com_btn_info" role="button">
									<em class="tooltip_icon_gray"><span class="blind">툴팁열기</span></em>
								</a>
							</div>
							<div class="com_ballon_type01 com_ballon_type02" style="display: none;">
								<div>
									<h3 class="h_tit03">순자산이란?</h3>
									<p>보유한 금융/실물/기타자산에 부채를 제외한 실제 자산을 의미해요.</p>
									
									<ul class="bl_dot_list">
										<li>금융자산: 예금,투자,연금,페이/포인트</li>
										<li>실물자산: 부동산 매매가 또는 보증금, 자동차 현재 시세</li>
										<li>기타자산: 직접 등록한 현금,외화,금,기타자산</li>
										<li>부채: 대출,할부금융,카드결제예정금액 등</li>
									</ul>
									<p>자산 증감은 전월말 보유 자산과 현재 자산을 비교했어요.</p>
									
									<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
								</div> 
							</div>
						</div>
						<!--25-02-10 금액숨김 수정--->
			
						<div class="toggle_money" :class="asetTotAmHideYn === true ? 'on' : ''">
							<div class="sum">
								<span class="hide">쉿! 비밀이에요.</span>
								<span class="show">{{totAsetAm | numberFilter}}원</span>
							</div>
							<button type="button" class="btns" @click="fn_setHidden('TOT', !asetTotAmHideYn)">
								<span class="blind">금액</span>
								<span class="hide">보기</span>
								<span class="show">숨김</span>
							</button>
						</div>

						<!-- <div class="toggle_money">
							<input type="checkbox" name="" aira-hidden="true" id="sum_view_01" v-model="asetTotAmHideYn" @change="fn_setHidden('TOT', asetTotAmHideYn)">
							<label for="sum_view_01" class="btns" role="button">
								<span class="hide">보기</span>
								<span class="show">숨김</span>
							</label>
							<div class="sum">
								<span class="hide">쉿! 비밀이에요.</span>
								<span class="show">{{totAsetAm | numberFilter}}원</span>
							</div>
						</div>  -->

					</div>
					
					<!--25-02-10 금액숨김 수정-->
					<div class="board_box">
						<!--25-02-24 문구수정-->

						<template v-if="astIndSum > 0">
							<div class="analysis">
                                <span class="text">지난달보다</span> <span class="num">{{Math.abs(astIndSum) | numberFilter}}원</span> <em>늘었어요.</em>
                                <div class="custom_tooltip">
                                    <div class="com_tooltip_type02 com_tooltip_type03">
                                        
                                        <a href="javascript:void(0);" class="com_btn_info" role="button">
                                            <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                        </a>
                                        <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                                            <div>
                                                <ul class="dotted_list">
                                                    <li>마지막 업데이트 시점의 총 자산과 마지막 업데이트 전 월 말일 총자산을 비교했습니다.</li>
                                                    <li>오늘 업데이트 하셨으면 전 월 말일 총 자산과 비교한 결과입니다.</li>
                                                </ul>
                                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
						</template>
						<template v-else-if="astIndSum < 0">
							<div class="analysis">
                                <span class="text">지난달보다</span> <span class="num">{{Math.abs(astIndSum) | numberFilter}}원</span> <em>줄었어요.</em>
                                <div class="custom_tooltip">
                                    <div class="com_tooltip_type02 com_tooltip_type03">
                                        
                                        <a href="javascript:void(0);" class="com_btn_info" role="button">
                                            <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                        </a>
                                        <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                                            <div>
                                                <ul class="dotted_list">
                                                    <li>마지막 업데이트 시점의 총 자산과 마지막 업데이트 전 월 말일 총자산을 비교했습니다.</li>
                                                    <li>오늘 업데이트 하셨으면 전 월 말일 총 자산과 비교한 결과입니다.</li>
                                                </ul>
                                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
						</template>
						<template v-else>
							<div class="analysis"> 
                                <span class="text">지난달과</span> <em>동일해요.</em>
                                <div class="custom_tooltip">
                                    <div class="com_tooltip_type02 com_tooltip_type03">
                                        
                                        <a href="javascript:void(0);" class="com_btn_info" role="button">
                                            <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                        </a>
                                        <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                                            <div>
                                                <ul class="dotted_list">
                                                    <li>마지막 업데이트 시점의 총 자산과 마지막 업데이트 전 월 말일 총자산을 비교했습니다.</li>
                                                    <li>오늘 업데이트 하셨으면 전 월 말일 총 자산과 비교한 결과입니다.</li>
                                                </ul>
                                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
						</template>
						<!--//25-02-24 문구수정-->
						<!-- 자산이 늘었을 때 -->
						<lottie-animation v-show="astIndSum > 0" :animationData="require('@/assets_v40/images/lottie/icon_asset_up.json')" 
										ref="anim"
										:loop="true"
										:auto-play="true" 
										:speed="1"
										aria-hidden="true" 
										class="icon_asset" 
						></lottie-animation>
						<!-- 자산이 줄었을 때 -->
						<lottie-animation v-show="astIndSum < 0" :animationData="require('@/assets_v40/images/lottie/icon_asset_down.json')" 
										ref="anim"
										:loop="true"
										:auto-play="true" 
										:speed="1"
										aria-hidden="true" 
										class="icon_asset" 
						></lottie-animation>
						<!-- 자산이 동일했을 때 TODO 동일한 경우는?-->
						<lottie-animation v-show="astIndSum == 0" :animationData="require('@/assets_v40/images/lottie/icon_asset.json')" 
										ref="anim"
										:loop="true"
										:auto-play="true" 
										:speed="1"
										aria-hidden="true" 
										class="icon_asset" 
						></lottie-animation>
						<!--
							늘은경우 icon_asset_up.json  
							줄은은경우 icon_asset_down.json
						-->
						<div class="asset_chart">
							<div class="asset_bar">
								
								<span class="asset_1" :style="`width:${finAssetPer}%`"></span><!--//금융-->
								<span class="asset_2" :style="`width:${realAssetPer}%`"></span><!--//실물-->
								<span class="asset_3" :style="`width:${etcAssetPer}%`"></span><!--//기타-->
							</div>

							<dl class="asset_label">
								<dt>나의 자산비율</dt>
								<dd class="asset_1">금융<span>{{finAssetPer}}%</span></dd>
								<dd class="asset_2">실물<span>{{realAssetPer}}%</span></dd>
								<dd class="asset_3">기타<span>{{etcAssetPer}}%</span></dd>
							</dl>
						</div>
					</div>

					<div class="mystyle" @click="fn_moveOpenPage('ASIP2010')">
						<a href="javascript:void(0);">나의 금융 스타일, 콕 집어드려요!</a>
					</div>
				</div>

				<!--25-02-06 이벤트 있을경우 노출 배너 추가-->
				<template v-if="orgPrdCnt > 0 || isEndDate || closeCardPayDate">
					<div class="temp_banner" v-if="bannerHideYn">
						<template v-if="orgPrdCnt > 0">
							<a href="javascript:void(0);" @click="fn_movePage('MRAM4001')">{{ orgPrdCnt }}개 기관 자산 만료예정, 연장하면 자산정보 계속 볼 수 있어요.</a>
							<button type="button" class="btn_x" @click="fn_bannerHideYn()"><span class="blind">삭제</span></button>
						</template>
						<template v-else-if="isEndDate">
							<a href="javascript:void(0);" @click="fn_movePage('ASIP4001')">이번 달 자산 진단과 재무관리 솔루션을 확인하세요.</a>
							<button type="button" class="btn_x" @click="fn_bannerHideYn()"><span class="blind">삭제</span></button>
						</template>
						<template v-else-if="closeCardPayDate">
							<a href="javascript:void(0);" @click="fn_movePage('ASCD4001')">{{ closeCardPayDate | dateFilter('MM월DD일') }} 출금예정인 카드 청구서를 확인해 보세요.</a>
							<button type="button" class="btn_x" @click="fn_bannerHideYn()"><span class="blind">삭제</span></button>
						</template>
					</div>
				</template>

				<!--//25-02-06 이벤트 있을경우 노출 배너 추가-->
				<!-- tab 정렬 -->
                <template v-for="tab in tabs" >

					<!-- 금융자산 -->
					<div v-if="tab.id === 'finance'" class="board_box assets_detail" :key="tab.id">
						<h2>금융자산</h2>
						
						<div class="analysis" :class="asetFnAmSum > bfAsetFnAmSum ? 'up' : asetFnAmSum < bfAsetFnAmSum ? 'down' : ''">

							<div class="toggle_money" :class="asetFnAmHideYn === true ? 'on' : ''">
								<div class="sum">
									<span class="hide">금액숨김</span>
									<span class="show">{{asetFnAmSum | numberFilter}}원</span>
								</div>
								<button type="button" class="btns" @click="fn_setHidden('FN', !asetFnAmHideYn)">
									<span class="blind">금액</span>
									<span class="hide">보기</span>
									<span class="show">숨김</span>
								</button>
							</div>

							<!--25-02-10 금액숨김 수정-->
							<!-- <div class="toggle_money">
								<input type="checkbox" title="금액숨김" name="" id="sum_view_02" v-model="asetFnAmHideYn" @change="fn_setHidden('FN', asetFnAmHideYn)">
								<label for="sum_view_02" class="btns">
									<span class="hide" aria-hidden="true">보기</span>
									<span class="show" aria-hidden="true">숨김</span>
								</label>
								<div class="sum">
									<span class="show">{{asetFnAmSum | numberFilter}}원</span>
									<span class="hide">금액숨김</span>
								</div>
							</div> -->
							<!--//25-02-10 금액숨김 수정-->
							<!--늘은 경우 : analysis + up -->
							<template v-if="asetFnAmSum > bfAsetFnAmSum">
								<p class="latter">지난달보다 <em class="num">{{Math.abs(indAsetFnAcSum) | numberFilter}}원</em> <em>늘었어요.</em></p>
							</template>
							<!-- 줄은 경우 : analysis + down  -->
							<template v-else-if="asetFnAmSum < bfAsetFnAmSum">
								<p class="latter">지난달보다 <em class="num">{{Math.abs(indAsetFnAcSum) | numberFilter}}원</em> <em>줄었어요.</em></p>
							</template>
							<!-- 동일한 경우 : analysis  -->
							<template v-else>
								<p class="latter">지난달과 <em>동일해요.</em></p>
							</template>
						</div>

						<details class="board_box_details" open>
							<summary>
								<span class="show">금융자산 보기</span>
								<span class="hide">금융자산 닫기</span>
							</summary>
							<div class="cont">
								<!--예금--> 
								<template v-if="asetFnAcTtcn > 0">
									<details class="assets_toggle" open>
										<summary>
											<span class="item">예금<em>{{asetFnAcTtcn | numberFilter}}<i class="blind">건</i></em></span>
											<template v-if="!asetFnAmHideYn">
												<span class="num"><span class="blind">금액</span>{{asetFnAcAmSum | numberFilter}}원</span>
											</template>
											<template v-else>
												<span class="txt">금액숨김</span>
											</template>
											
										</summary>
										<div class="cont">
											<ul class="assets_list">
												<template v-for="(item, idx) in asetFnAcTtList">
													<li v-if="idx < 3" :key="idx">
														<a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openAcDetailPop(item.type, item)">
															<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
															<!-- TODO 은행명 퍼블 나오면 넣어야 한다. -->
															<div>
																<strong class="org">{{item.acWrsnm}}</strong>
																<!-- <strong class="account">{{item.mydtAcno}}</strong> -->
																<strong class="account"><span class="blind">계좌번호</span>{{item.mydtAcno}}</strong>
															</div>
														<template v-if="!asetFnAmHideYn">
																<!-- <strong class="num">{{item.acNowBac | numberFilter}}원</strong> -->
																<strong class="num"><span class="blind">금액</span>{{item.acNowBac | numberFilter}}원</strong>
															</template>
															<template v-else>
																<strong class="txt">상세보기</strong>
															</template>
														</a>
													</li>
												</template>
											</ul>
											<!--25-02-24 문구 수정-->
											<a v-if="asetFnAcTtcn > 3" href="javascript:void(0);" class="btns md"  @click.prevent="fn_movePage('ASAC4001')">예금 전체보기</a>
											<!--//25-02-24 문구 수정-->
										</div>
									</details>
								</template>
								<template v-else>
									<a href="javascript:void(0)" class="unconnected" role="button" @click.prevent="fn_openNewConnect('bank')">
										<span class="item">예금</span>
										<span class="txt">입출금, 예적금 확인하기</span>
									</a>
								</template>

								<!--투자-->
								<template v-if="asetFnIvTtcn > 0">
									<details class="assets_toggle">
										<summary>
											<span class="item">투자<em>{{asetFnIvTtcn | numberFilter}}<i class="blind">건</i></em></span>
											<template v-if="!asetFnAmHideYn">
												<span class="num"><span class="blind">금액</span>{{asetFnIvAmSum | numberFilter}}원</span>
											</template>
											<template v-else>
												<span class="txt">금액숨김</span>
											</template>
										</summary>
										<div class="cont">
											<ul class="assets_list">
												<template v-for="(item, idx) in asetFnIvTtList">
													<li v-if="idx < 3" :key="idx">
														<a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openIvDetailPop(item)">
															<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
															<div>
																<strong class="org">{{item.acWrsnm}}</strong>
																<!-- <strong class="account">{{item.mydtAcno}}</strong> -->
																<strong class="account"><span class="blind">계좌번호</span>{{item.mydtAcno}}</strong>
															</div>
															
															<template v-if="!asetFnAmHideYn">
																<div class="num_wrap">
																	<!-- <strong class="num">{{item.acNowBac | numberFilter}}원</strong> -->
																	<strong class="num"><span class="blind">금액</span>{{item.acNowBac | numberFilter}}원</strong>
																	<span class="latter" v-if="item.strmPftrt === 0 && item.type === 'FND'">
																		<em class="num">{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}%</em>
																		<!-- <span class="latter up"><em class="num">22,668원</em></span> -->
																	</span>
																	<span class="latter up" v-else-if="item.strmPftrt > 0 && item.type === 'FND'" ><i class="up blind">상승</i>
																		<em class="num">{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}%</em>
																	</span>
																	<span class="latter down" v-else-if="item.type === 'FND'"><i class="down blind">하락</i>
																		<em class="num">{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}%</em>
																	</span>
																</div>
															</template>
															<template v-else>
																<div class="num_wrap">
																	<strong class="txt">상세보기</strong>
																</div>
															</template>
														</a>
													</li>
												</template>
											</ul>
											<a v-if="asetFnIvTtcn > 3" href="javascript:void(0);" class="btns md"  @click.prevent="fn_movePage('ASIV4001')">투자 전체보기</a>
											
										</div>
									</details>
								</template>

								<template v-else>
									<a href="javascript:void(0)" class="unconnected" role="button"  @click.prevent="fn_openNewConnect('invest')">
										<span class="item">투자</span>
										<span class="txt">수익률 확인하기</span>
									</a>
								</template>

								<!--연금-->
								<template v-if="asetFnPnsTtcn > 0">
									<details class="assets_toggle">
										<summary>
											<span class="item">연금<em>{{asetFnPnsTtcn | numberFilter}}<i class="blind">건</i></em></span>
											<template v-if="!asetFnAmHideYn">
												<span class="num"><span class="blind">금액</span>{{asetFnPnsAmSum | numberFilter}}원</span>
											</template>
											<template v-else>
												<span class="txt">금액숨김</span>
											</template>
										</summary>
										<div class="cont">
											<ul class="assets_list">
												<li v-if="ntpsTotPayAm > 0">
													<a href="javascript:void(0);" role="button"  @click.prevent="fn_moveOpenPage('PDSC4001')">
														<i class="ico_bank PBAAVM0000"></i>
														<!-- TODO 은행명 퍼블 나오면 넣어야 한다. -->
														<div>
															<strong class="org">국민연금</strong>
															<strong class="account">가입기간{{ntpsTotEntPrd | numberFilter}}개월</strong>
														</div>
														<template v-if="!asetFnAmHideYn">
															<!-- <strong class="num">{{ntpsTotPayAm | numberFilter}}원</strong> -->
															<strong class="num"><span class="blind">금액</span>{{ntpsTotPayAm | numberFilter}}원</strong>
														</template>
														<template v-else>
															<strong class="txt">상세보기</strong>
														</template>
													</a>
												</li>
												<template v-for="(item, idx) in asetFnPnsTtList">
													<template v-if="ntpsTotPayAm > 0">
														<li v-if="idx < 2" :key="idx">
															<a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openPnsDetailPop(item.type, item)">
																<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
																<!-- TODO 은행명 퍼블 나오면 넣어야 한다. -->
																<div>
																	<strong class="org">{{item.acWrsnm}}</strong>
																	<template v-if="item.type !== 'PSTS'">
																		<!-- <strong class="account">{{item.mydtAcno}}</strong> -->
																		<strong class="account"><span class="blind">계좌번호</span>{{item.mydtAcno}}</strong>
																	</template>
																</div>
																<template v-if="!asetFnAmHideYn">
																	<!-- <strong class="num">{{item.acNowBac | numberFilter}}원</strong> -->
																	<strong class="num"><span class="blind">금액</span>{{item.acNowBac | numberFilter}}원</strong>
																</template>
																<template v-else>
																	<strong class="txt">상세보기</strong>
																</template>
															</a>
														</li>
													</template>
													<template v-else>
														<li v-if="idx < 3" :key="idx">
															<a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openPnsDetailPop(item.type, item)">
																<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
																<!-- TODO 은행명 퍼블 나오면 넣어야 한다. -->
																<div>
																	<strong class="org">{{item.acWrsnm}}</strong>
																	<template v-if="item.type !== 'PSTS'">
																		<!-- <strong class="account">{{item.mydtAcno}}</strong> -->
																		<strong class="account"><span class="blind">계좌번호</span>{{item.mydtAcno}}</strong>
																	</template>
																</div>
																<template v-if="!asetFnAmHideYn">
																	<!-- <strong class="num">{{item.acNowBac | numberFilter}}원</strong> -->
																	<strong class="num"><span class="blind">금액</span>{{item.acNowBac | numberFilter}}원</strong>
																</template>
																<template v-else>
																	<strong class="txt">상세보기</strong>
																</template>
															</a>
														</li>
													</template>
												</template>
											</ul>
											<a v-if="asetFnPnsTtcn > 3" href="javascript:void(0);" class="btns md"  @click.prevent="fn_movePage('ASPS4001')">연금 전체보기</a>
										</div>
									</details>
								</template>
								<template v-else>
									<a href="javascript:void(0)" class="unconnected" role="button" @click.prevent="fn_openNewConnect('bank')">
										<span class="item">연금</span>
										<span class="txt">노후준비 상태는?</span>
									</a>
								</template>
								<!--페이/포인트-->
								<template v-if="asetFnPayPntTtcn > 0">
									<details class="assets_toggle">
										<summary>
											<span class="item">페이/포인트<em>{{asetFnPayPntTtcn | numberFilter}}<i class="blind">건</i></em></span>
											<template v-if="!asetFnAmHideYn">
												<!-- <span class="num">{{asetFnPayPntAmSum | numberFilter}}원</span> -->
												<strong class="num"><span class="blind">금액</span>{{asetFnPayPntAmSum | numberFilter}}원</strong>
											</template>
											<template v-else>
												<span class="txt">금액숨김</span>
											</template>
										</summary>
										<div class="cont">
											<ul class="assets_list">
												<template v-for="(item, idx) in asetFnPayPntTtList">
													<li v-if="idx < 3" :key="idx">
														<template v-if="item.type">
															<a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openPayDetailPop(item.type, item)">
															<!-- <a v-if="!type" href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASPT4001')"> -->
																<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
																<!-- TODO 은행명 퍼블 나오면 넣어야 한다. -->
																<div>
																	<strong class="org">{{item.pntNm}}</strong>
																</div>
																<template v-if="!asetFnAmHideYn">
																	<!-- <strong class="num">{{item.pntAmt | numberFilter}}원</strong> -->
																	<strong class="num"><span class="blind">금액</span>{{item.pntAmt | numberFilter}}원</strong>
																	
																</template>
																<template v-else>
																	<strong class="txt">상세보기</strong>
																</template>
															</a>
														</template>
														<template v-else>
															<div>
																<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i> 
																<!-- TODO 은행명 퍼블 나오면 넣어야 한다. -->
																<div>
																	<strong class="org">{{item.pntNm}}</strong>
																</div>
																<template v-if="!asetFnAmHideYn">
																	<!-- <strong class="num">{{item.pntAmt | numberFilter}}원</strong> -->
																	<strong class="num"><span class="blind">금액</span>{{item.pntAmt | numberFilter}}원</strong>
																</template>
																<template v-else>
																	<strong class="txt">상세보기</strong>
																</template>
															</div>
															<!--  20250410 요건삭제
															<div class="num_btns" v-if="item.pntAmt > 0 && orgcSome(item.infOfrmnOrgC)">
																<a href="javascript:void(0);" class="btn_txt" @click="fn_rrqr()">입금신청</a>
															</div> -->
														</template>
													</li>
												</template>
											</ul>
											<a v-if="asetFnPayPntTtcn > 3" href="javascript:void(0);" class="btns md"  @click.prevent="fn_movePage('ASPT4001')">페이/포인트 전체보기</a>
										</div>
									</details>
								</template>
								<template v-else>
									<a href="javascript:void(0)" class="unconnected" role="button" @click.prevent="fn_openNewConnect('efin')">
										<span class="item">페이/포인트</span>
										<span class="txt">숨은 돈 찾기</span>
									</a>
								</template>
							</div>
						</details>
					</div>

					<!--실물자산-->
					<div v-if="tab.id === 'real'" class="board_box assets_detail" :key="tab.id">
						<h2>실물자산</h2>
						<template v-if="asetRlthTtcn > 0">
							<div class="analysis" :class="indAsetRlthAmSum > 0 ? 'up' : indAsetRlthAmSum < 0 ? 'down' : ''">

								<div class="toggle_money" :class="asetRlthHideYn === true ? 'on' : ''">
									<div class="sum">
										<span class="hide">금액숨김</span>
										<span class="show">{{asetRlthAmSum | numberFilter}}원</span>
									</div>
									<button type="button" class="btns" @click="fn_setHidden('RLTH', !asetRlthHideYn)">
										<span class="blind">금액</span>
										<span class="hide">보기</span>
										<span class="show">숨김</span>
									</button>
								</div>

								<!--25-02-10 금액숨김 수정-->
								<!-- <div class="toggle_money">
									<input type="checkbox" title="금액숨김" name="" id="sum_view_03" v-model="asetRlthHideYn" @change="fn_setHidden('RLTH', asetRlthHideYn)">
									<label for="sum_view_03" class="btns">
										<span class="hide" aria-hidden="true">보기</span>
										<span class="show" aria-hidden="true">숨김</span>
									</label>
									<div class="sum">
										<span class="show">{{asetRlthAmSum | numberFilter}}원</span>
										<span class="hide">금액숨김</span>
									</div>
								</div> -->
								<!--//25-02-10 금액숨김 수정-->
								<template v-if="indAsetRlthAmSum < 0">
									<p class="latter">지난달보다 <em class="num">{{Math.abs(indAsetRlthAmSum) | numberFilter}}원</em> <em>줄었어요.</em></p>
								</template>
								<template v-else-if="indAsetRlthAmSum > 0">
									<p class="latter">지난달보다 <em class="num">{{indAsetRlthAmSum | numberFilter}}원</em> <em>늘었어요.</em></p>
								</template>
								<template v-else >
									<p class="latter">지난달과 <em>동일해요.</em></p>
								</template>
							</div>

							<details class="board_box_details">
								<summary>
									<span class="show">실물자산 보기</span>
									<span class="hide">실물자산 닫기</span>
								</summary>
								<div class="cont">
									<ul class="assets_list">
										<li v-if="asetRlthRlestCn > 0">
											<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASRE4001')">
												<span class="item">부동산<em>{{asetRlthRlestCn | numberFilter}}<i class="blind">건</i></em></span>
												<span class="num" v-if="!asetRlthHideYn"><span class="blind">금액</span>{{asetRlthRlestAm | numberFilter}}원</span>
												<span class="txt" v-else>상세보기</span>
											</a>
										</li>
										<li v-else>
											<a href="javascript:void(0);" role="button" class="unconnected" @click.prevent="openRlAssetPop('CORE4201')">
												<span class="item">부동산</span>
												<span class="txt">우리집 실거래가 확인</span>
											</a>
										</li>
										<li v-if="asetRlthCarCn > 0">
											<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASCA4001')">
												<span class="item">자동차<em>{{asetRlthCarCn | numberFilter}}<i class="blind">건</i></em></span>
												<span class="num" v-if="!asetRlthHideYn"><span class="blind">금액</span>{{asetRlthCarAm | numberFilter}}원</span>
												<span class="txt" v-else>상세보기</span>
												</a>
											</li>
											<li v-else>
												<a href="javascript:void(0);" role="button" class="unconnected" @click.prevent="openRlAssetPop('COCA2101')">
													<span class="item">자동차</span>
													<span class="txt">내 차 평균 시세 확인</span>
												</a>
											</li>
										</ul>
									</div>
								</details>
							</template>
							<!-- 실물자산 없을 때-->
							<template v-else>
								<div class="analysis">
									<p class="txt">집, 차 시세 궁금하면 <a href="javascript:void(0);" class="btns" @click.prevent="fn_openAssetPage()">등록</a></p>
								</div>

								<details class="board_box_details">
									<summary>
										<span class="show">실물자산 보기</span>
										<span class="hide">실물자산 닫기</span>
									</summary>
									<div class="cont">
										<ul class="assets_list">
											<li>
												<a href="javascript:void(0);" class="unconnected" role="button" @click.prevent="openRlAssetPop('CORE4201')">
													<span class="item">부동산</span>
													<span class="txt">우리집 실거래가 확인</span>
												</a>
											</li>
											<li>
												<a href="javascript:void(0);" class="unconnected" role="button" @click.prevent="openRlAssetPop('COCA2101')">
													<span class="item">자동차</span>
													<span class="txt">내 차 평균 시세 확인</span>
												</a>
											</li>
										</ul>
									</div>
								</details>
							</template>
						</div>

						<!--기타자산-->
						<template v-if="asetEtcTtcn > 0">
							<div v-if="tab.id === 'etc'" class="board_box assets_detail" :key="tab.id">
								<h2>기타자산</h2>
								
								<div class="analysis" :class="indAsetEtcAmSum > 0 ? 'up' : indAsetEtcAmSum < 0 ? 'down' : ''">

									<div class="toggle_money" :class="asetEtcHideYn === true ? 'on' : ''">
										<div class="sum">
											<span class="hide">금액숨김</span>
											<span class="show">{{asetEtcAmSum | numberFilter}}원</span>
										</div>
										<button type="button" class="btns" @click="fn_setHidden('ETC', !asetEtcHideYn)">
											<span class="blind">금액</span>
											<span class="hide">보기</span>
											<span class="show">숨김</span>
										</button>
									</div>
									<!--25-02-10 금액숨김 수정-->

									<!-- <div class="toggle_money">
										<input type="checkbox" title="금액숨김" name="" id="sum_view_04" v-model="asetEtcHideYn" @change="fn_setHidden('ETC', asetEtcHideYn)">
										<label for="sum_view_04" class="btns">
											<span class="hide" aria-hidden="true">보기</span>
											<span class="show" aria-hidden="true">숨김</span>
										</label>
										<div class="sum">
											<span class="show">{{asetEtcAmSum | numberFilter}}원</span>
											<span class="hide">금액숨김</span>
										</div>
									</div> -->

									<!--//25-02-10 금액숨김 수정-->
									<template v-if="indAsetEtcAmSum > 0">
										<p class="latter">지난달보다 <em class="num">{{Math.abs(indAsetEtcAmSum) | numberFilter}}원</em> <em>늘었어요.</em></p>
									</template>
									<template v-else-if="indAsetEtcAmSum < 0">
										<p class="latter">지난달보다 <em class="num">{{Math.abs(indAsetEtcAmSum) | numberFilter}}원</em> <em>줄었어요.</em></p>
									</template>
									<template v-else>
										<p class="latter">지난달과 <em>동일해요.</em></p>
									</template>
								</div>

								<details class="board_box_details">
									<summary>
										<span class="show">기타자산 보기</span>
										<span class="hide">기타자산 닫기</span>
									</summary>
									<div class="cont">
										<ul class="assets_list">
											<template v-if="asetEtcCshCn > 0"> 
												<li>
													<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASOA4001')">
														<span class="item">현금<em>{{asetEtcCshCn | numberFilter}}<i class="blind">건</i></em></span>
														<span class="num" v-if="!asetEtcHideYn"><span class="blind">금액</span>{{asetEtcCshAmSum | numberFilter}}원</span>
														<span class="txt" v-else>상세보기</span>
													</a>
												</li>
											</template>
											<template v-if="asetEtcGoldCn > 0 ">  
												<li>
													<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASOA4001')">
														<span class="item">금<em>{{asetEtcGoldCn | numberFilter}}<i class="blind">건</i></em></span>
														<span class="num" v-if="!asetEtcHideYn"><span class="blind">금액</span>{{asetEtcGoldAm | numberFilter}}원</span>
														<span class="txt" v-else>상세보기</span>
													</a>
												</li>
											</template>
											<template v-if="asetEtcEtcCn > 0 ">
												<li>
													<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASOA4001')">
														<span class="item">농기계<em>{{asetEtcEtcCn | numberFilter}}<i class="blind">건</i></em></span>
														<span class="num" v-if="!asetEtcHideYn"><span class="blind">금액</span>{{asetEtcEtcAm | numberFilter}}원</span>
														<span class="txt" v-else>상세보기</span>
													</a>
												</li>
											</template>
										</ul>
									</div>
								</details>
							</div>
						</template>

						<!--부채-->
						<div v-if="tab.id === 'debt'" class="board_box assets_detail" :key="tab.id">
							<h2>부채</h2>
							<div class="analysis" :class="indDbtTotAm > 0 ? 'up' : indDbtTotAm < 0 ? 'down' : ''">
								<template v-if="dbtTtcn > 0">
									<div class="toggle_money" :class="dbtHideYn === true ? 'on' : ''">
										<div class="sum">
											<span class="hide">금액숨김</span>
											<span class="show">{{dbtTotAm | numberFilter}}원</span>
										</div>
										<button type="button" class="btns" @click="fn_setHidden('DBT', !dbtHideYn)">
											<span class="blind">금액</span>
											<span class="hide">보기</span>
											<span class="show">숨김</span>
										</button>
									</div>
									<!--25-02-10 금액숨김 수정-->
									<!-- <div class="toggle_money">
										<input type="checkbox" title="금액숨김" name="" id="sum_view_05" v-model="dbtHideYn" @change="fn_setHidden('DBT', dbtHideYn)">
										<label for="sum_view_05" class="btns">
											<span class="hide" aria-hidden="true">보기</span>
											<span class="show" aria-hidden="true">숨김</span>
										</label>
										<div class="sum">
											<span class="show">{{dbtTotAm | numberFilter}}원</span>
											<span class="hide">금액숨김</span>
										</div>
									</div> -->
									<!--//25-02-10 금액숨김 수정-->
									<template v-if="indDbtTotAm > 0">
										<p class="latter">지난달보다 <em class="num">{{Math.abs(indDbtTotAm) | numberFilter}}원</em> <em>늘었어요.</em><span class="info">(마이너스 통장 거래금액 포함)</span></p>
									</template>
									<template v-else-if="indDbtTotAm < 0">
										<p class="latter">지난달보다 <em class="num">{{Math.abs(indDbtTotAm) | numberFilter}}원</em> <em>줄었어요.</em><span class="info">(마이너스 통장 거래금액 포함)</span></p>
									</template>
									<template v-else>
										<p class="latter">지난달과 <em>동일해요.</em><span class="info">(마이너스 통장 거래금액 포함)</span></p>
									</template>
								</template>
								<template v-else>
									<p class="txt">대출 관리를 쉽게  <a href="javascript:void(0);" class="btns" @click.prevent="fn_openAssetPage()">연결</a></p>
								</template>
							</div>
							<details class="board_box_details">
								<summary>
									<span class="show">부채 보기</span>
									<span class="hide">부채 닫기</span>
								</summary>
								<div class="cont">
									<ul class="assets_list">
										<!-- 카드 -->
										<li v-if="dbtCdTcn > 0">
											<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASCD4001')">
												<span class="item">카드<em>{{dbtCdTcn | numberFilter}}<i class="blind">건</i></em></span>
												<span class="num" v-if="!dbtHideYn"><span class="blind">금액</span>{{dbtCdAmSum | numberFilter}}원</span>
												<span class="txt" v-else>상세보기</span>
											</a>
										</li>
										<li v-else>
											<a href="javascript:void(0);" class="unconnected" role="button" @click.prevent="fn_openNewConnect('card')">
												<span class="item">카드</span>
												<span class="txt">장기, 단기 카드대출 현황 보기</span>
											</a>
										</li>
										<!-- 대출 -->
										<li v-if="dbtLonTtcn > 0">
											<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASLN4001')">
												<span class="item">대출<em>{{dbtLonTtcn | numberFilter}}<i class="blind">건</i></em></span>
												<span class="num" v-if="!dbtHideYn"><span class="blind">금액</span>{{dbtLonAmSum | numberFilter}}원</span>
												<span class="txt" v-else>상세보기</span>
											</a>
										</li>
										<li v-else>
											<a href="javascript:void(0);" class="unconnected" role="button" @click.prevent="fn_openNewConnect('bank')">
												<span class="item">대출</span>
												<span class="txt">꼼꼼히 계획하고 관리하기</span>
											</a>
										</li>
										<!-- 할부금융 -->
										<li v-if="dbtIstCn > 0">
											<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASIT4001')">
												<span class="item">할부금융<em>{{dbtIstCn | numberFilter}}<i class="blind">건</i></em></span>
												<span class="num" v-if="!dbtHideYn"><span class="blind">금액</span>{{dbtIstAm | numberFilter}}원</span>
												<span class="txt" v-else>상세보기</span>
											</a>
										</li>
										<li v-else>
											<a href="javascript:void(0);" class="unconnected" role="button" @click.prevent="fn_openNewConnect('capital')">
												<span class="item">할부금융</span>
												<span class="txt">할부 상환 현황 보기</span>
											</a>
										</li>
										<!-- 자동차할부 -->
										<li v-if="dbtCarIstCn > 0">
											<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASCL4001')">
												<span class="item">자동차할부<em>{{dbtCarIstCn | numberFilter}}<i class="blind">건</i></em></span>
												<span class="num" v-if="!dbtHideYn"><span class="blind">금액</span>{{dbtCarIstAm | numberFilter}}원</span>
												<span class="txt" v-else>상세보기</span>
											</a>
										</li>
										<li v-else>
											<a href="javascript:void(0);" class="unconnected" role="button" @click.prevent="fn_openNewConnect('capital')">
												<span class="item">자동차할부</span>
												<span class="txt">내차 할부 현황 보기</span>
											</a>
										</li>
										<!-- 학자금대출 -->
										<li v-if="edflnCnt > 0">
											<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASEL4001')">
												<span class="item">학자금대출<em>{{edflnCnt | numberFilter}}<i class="blind">건</i></em></span>
												<span class="num" v-if="!dbtHideYn"><span class="blind">금액</span>{{edflnAmt | numberFilter}}원</span>
												<span class="txt" v-else>상세보기</span>
											</a>
										</li>
										<li v-else>
											<a href="javascript:void(0);" class="unconnected" role="button" @click.prevent="fn_openNewConnect('bank')">
												<span class="item">학자금대출</span>
												<span class="txt">학자금대출 현황 보기</span>
											</a>
										</li>
										<!-- 리스 -->
										<li v-if="dbtLeasCn > 0">
											<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASLS4001')">
												<span class="item">리스<em>{{dbtLeasCn | numberFilter}}<i class="blind">건</i></em></span>
												<span class="num" v-if="!dbtHideYn"><span class="blind">금액</span>{{dbtLeasAm | numberFilter}}원</span>
												<span class="txt" v-else>상세보기</span>
											</a>
										</li>
										<li v-else>
											<a href="javascript:void(0);" class="unconnected" role="button" @click.prevent="fn_openNewConnect('capital')">
												<span class="item">리스</span>
												<span class="txt">리스 상환 현황 보기</span>
											</a>
										</li>
										<!-- 빌린돈 -->
										<li v-if="dbtCshCn > 0">
											<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASBR4001')">
												<span class="item">빌린돈<em>{{dbtCshCn | numberFilter}}<i class="blind">건</i></em></span>
												<span class="num" v-if="!dbtHideYn"><span class="blind">금액</span>{{dbtCshAm | numberFilter}}원</span>
												<span class="txt" v-else>상세보기</span>
											</a>
										</li>
										<li v-else>
											<a href="javascript:void(0);" class="unconnected" role="button" @click.prevent="openRlAssetPop('COOA2003')">
												<span class="item">빌린돈</span>
												<span class="txt">직접 추가하기</span>
											</a>
										</li>
									</ul>
								</div>
							</details>
						
						</div>

						<!--보험료-->
						<div v-if="tab.id === 'insure'" class="board_box assets_detail insure" :key="tab.id">
							<template v-if="isrTtcn > 0">
								<h2>월 납입 보험료</h2>
								<div class="custom_tooltip up">
									<div class="com_tooltip_type02 com_tooltip_type03">
										<a href="javascript:void(0);" class="com_btn_info" role="button">
											<em class="tooltip_icon_gray"><span class="blind">툴팁열기</span></em>
										</a>
									</div>
									<div class="com_ballon_type01 com_ballon_type02" style="display: none;">
										<!--25-02-24 문구수정-->
										<div>
											<h3 class="h_tit03">인보험이란?</h3>
											<p>
												사람을 대상으로 한 보험. 생명보험, 실손보험, 건강보험, 상해보험 등
											</p>
											<h3 class="h_tit03 mt10">물보험이란?</h3>
											<p>                                    
												물건에 대한 손해보험. 자동차보험, 화재보험,펫보험, 해상/항공보험, 운전자보험, 여행자보험, 기계, 공장, 특수장비 보험 등
											</p>

											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> 
										<!--//25-02-24 문구수정-->
									</div>
								</div>

								<div class="analysis">
									<div class="sum">
										{{isrPymIsrfeTt | numberFilter}}원
									</div>
								</div>

								<details class="board_box_details">
									<summary>
										<span class="show">납입 보험료 보기</span>
										<span class="hide">납입 보험료 닫기</span>
									</summary>
									<div class="cont">
										<ul class="assets_list">
											<li v-if="isrMnInsuCn > 0">
												<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASIS4001')">
													<span class="item">인보험<em>{{isrMnInsuCn | numberFilter}}<i class="blind">건</i></em></span>
													<span class="num"><span class="blind">금액</span>{{isrMnTotPymIsrfe | numberFilter}}원</span>
												</a>
											</li>
											<li v-if="isrTngInsuCn > 0">
												<a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASIS4001')">
													<span class="item">물보험<em>{{isrTngInsuCn | numberFilter}}<i class="blind">건</i></em></span>
													<span class="num"><span class="blind">금액</span>{{isrTngTotPymIsrfe | numberFilter}}원</span>
												</a>
											</li>
										</ul>
										<div class="gray_box info_insur">
											<p class="txt">
												<strong>매 월 납입하는 보험</strong>의 개수와 총 보험료입니다. 년 1회 납입 보험 또는 만기/실효 보험은 상세화면에서 확인할 수 있어요.
											</p>
										</div>
									</div>
								</details>
							</template>
							<template v-else>
								<h2>월 납입 보험료</h2>
								<div class="custom_tooltip up">
									<div class="com_tooltip_type02 com_tooltip_type03">
										<a href="javascript:void(0);" class="com_btn_info" role="button">
											<em class="tooltip_icon_gray"><span class="blind">툴팁열기</span></em>
										</a>
									</div>
									<div class="com_ballon_type01 com_ballon_type02" style="display: none;">
										<div>
											<h3 class="h_tit03">인보험이란?</h3>
											<p>
												사람을 대상으로 한 보험. 생명보험, 실손보험, 건강보험, 상해보험 등
											</p>
											<h3 class="h_tit03 mt10">물보험이란?</h3>
											<p>                                    
												물건에 대한 손해보험. 자동차보험, 화재보험,펫보험, 해상/항공보험, 운전자보험, 여행자보험, 기계, 공장, 특수장비 보험 등
											</p>

											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> 
									</div>
								</div>

								<div class="analysis">
									<p class="txt">보장내용 체크하기 <a href="javascript:void(0);" class="btns" @click.prevent="fn_openNewConnect('insu')">연결</a></p>
								</div>
							</template>
						</div>
						
	
					</template>

                    <!--주목받는 콘텐츠-->
                    <div class="staple_cont">
                        <h2 class="h_tit01">{{cusnm}} 님을 위한 추천 서비스</h2>

                        <div class="board_box_wrap banner">
                            <a href="javascript:void(0);" class="board_box staple1" role="button" @click.prevent="fn_ASIP2005TAB(0)">
                                <em>자금 흐름<br>진단</em>
                            </a>
                            <a href="javascript:void(0);" class="board_box staple2" role="button" @click.prevent="fn_movePage('PDMY4001')">
                                <em>버킷리스트<br>만들기</em>
                            </a>
                            <a href="javascript:void(0);" class="board_box staple3" role="button" @click="fn_moveOpenPage('PDMY2040')">
                                <em>안정적인<br>투자전략!</em>
                            </a>
                            <a href="javascript:void(0);" class="board_box staple4" role="button" @click.prevent="fn_getASIP2009()">
                                <em>내 또래들은<br>얼만큼 모았을까?</em>
                            </a>
                        </div>

                        <a href="javascript:void(0);" @click.prevent="fn_movePage('PDRT4001')">
                            <img src="/src/assets_v40/images/banner/img_banner_asset_pensiton.png" alt="65세, 내가 받는 연금은 얼마일까요? 지금 바로 알아보세요." />
                        </a>
                    </div>

					<!--금융지식-->
					<div class="finlit" v-if="financeKlList.length > 0">
						<!-- <h2 class="h_tit01">금융지식</h2>
						<a href="javascript:void(0);" class="btn_lots" @click.prevent="fn_movePage('COCT4001')" ><span class="blind">더보기</span></a> -->
						<a href="javascript:void(0);" class="h_tit01" role="button" @click.prevent="fn_movePage('COCT4001')" >금융지식</a> <!--[v4.0] 2025-05-27 타이틀 링크 영역 수정 -->
						<div class="scroller">
							<ul>
								<li v-for="(item, idx) in financeKlList" :key="idx">
									<a href="javascript:void(0);" role="button" @click.prevent="fnOpenContents(item.cntzId)">
										<img :src="`/assets/images/fin_cont/${item.thmnlImgUrlnm}`" alt="" @error="emptyImg" />
										<strong>{{item.cntzTinm}}</strong>
										<!-- <strong>금리와 복리를 이해하라!금리와 복리를 이해하라!금리와 복리를 이해하라!금리와 복리를 이해하라!금리와 복리를 이해하라!금리와 복리를 이해하라!</strong> -->
										<span class="hash">#{{item.rcmKwrdCntn}}</span>
										
									</a>
								</li>
							</ul>
						</div>
					</div>
                    
                    <div class="bottom">
                        <!--25-02-24 문구수정-->
                        <a href="javascript:void(0);" class="btn_asset_edit" role="button" @click="fn_moveOpenPage('ASTA4002')">
                            새로워진 NH콕마이데이터(자산관리)
                            <strong>자산 순서 변경할 수 있어요.</strong>
                        </a>
                        <!--//25-02-24 문구수정-->
                        <a href="javascript:void(0);" class="btn_connect left" @click.prevent="fn_openAssetPage()">더 연결할 자산이 있으신가요?</a>
                    </div>
                </section>
			</div>
			<footersV2 type="as" />
		
		<!--// content E -->
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
    
    import {numberFormat} from '@/utils/number'
    import {amountCountAnimate} from '@/utils/jUtils'
	import ASIP2010 from '@/views/page/AS/IP/ASIP2010/ASIP2010'   // 금융스타일

    import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
    import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001' // 자산등록
    import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002' // 기관선택

    import CORE4201 from '@/views/page/CO/RE/CORE4201/CORE4201' // 부동산등록
    import COCA2101 from '@/views/page/CO/CA/COCA2101/COCA2101' // 자동차등록
    import COOA2003 from '@/views/page/CO/OA/COOA2003/COOA2003' // 빌린돈
    import {mapGetters} from 'vuex'    
    import {mapActions} from 'vuex'

	import LottieAnimation from 'lottie-web-vue'
	import PDMY2040 from '@/views/page/PD/MY/PDMY2040/PDMY2040' // 금융목표(투자목표 등록)
	import ASIP2009 from '@/views/page/AS/IP/ASIP2009/ASIP2009'
	import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011'
	import ASIP2005TAB from '@/components/category/AsIp2005Tab'
	import {dateFormat, dayDiff} from '@/utils/date'
	import _ from 'lodash'
	import ASAC4102 from '@/views/page/AS/AC/ASAC4102/ASAC4102'
    import ASAC1103 from '@/views/page/AS/AC/ASAC1103/ASAC1103'
    import ASAC1104 from '@/views/page/AS/AC/ASAC1104/ASAC1104'
    import ASAC1105 from '@/views/page/AS/AC/ASAC1105/ASAC1105'

	import ASIV2002 from '@/views/page/AS/IV/ASIV2002/ASIV2002'
	import ASIV2003 from '@/views/page/AS/IV/ASIV2003/ASIV2003'
    import ASIV2005 from '@/views/page/AS/IV/ASIV2005/ASIV2005'
	import ASIV2007 from '@/views/page/AS/IV/ASIV2007/ASIV2007'

	import ASPS2002 from '@/views/page/AS/PS/ASPS2002/ASPS2002'
    import ASPS2004 from '@/views/page/AS/PS/ASPS2004/ASPS2004'
    import ASIS2013 from '@/views/page/AS/IS/ASIS2012/ASIS2012'

	import ASAC1106 from '@/views/page/AS/AC/ASAC1106/ASAC1106'
    import ASPT2002 from '@/views/page/AS/PT/ASPT2002/ASPT2002'
	import ASTA4002 from '@/views/page/AS/TA/ASTA4002/ASTA4002'
	import CmmFlotBanner from '@/components/CmmFlotBanner.vue'  // 플로팅배너
	import PDSC4001 from '@/views/page/PD/SC/PDSC4001/PDSC4001'


    export default {
        name : "ASTA4001",
        data: () => {
            return {
                cusnm               : "",
                rcnInqDtm           : 0,      // 최근조회일시        
				totAsetAm			: 0,	  // 총금액
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

				finalUpdateDtm    	: '',     // 업데이트 일시
				asetTotAmHideYn		: false,  // 순자산 숨김 여부
				asetFnAmHideYn		: false,  // 금융자산 총금액 숨김 여부
				asetRlthHideYn		: false,  // 실물자산 총금액 숨김 여부
				asetEtcHideYn		: false,  // 기타자산 총금액 숨김 여부
				dbtHideYn			: false,  // 부채 총금액 숨김 여부
				isrHideYn			: false,  // 보험료 총금액 숨김 여부
				bannerHideYn		: true,  // 배너 숨김 여부
				financeKlList     	: [],     // 금융지식 목록
				userAsetList    	: [], // 개인신용정보전송요구내역
				cardPayDateList		: [], // 카드결제 예정일 목록
				currentDate   		: new Date(), //금일
				finAssetPer         : 0,      // 금융자산 %
				realAssetPer        : 0,      // 실물자산 % 
				etcAssetPer         : 0,      // 기타자산 %
				tabs          		: [], // 상단 탭
				bannerList        	: [],     // 상단플로팅배너
				asetFnAcTtList		: [],		//예금리스트
				asetFnIvTtList		: [],		//투자리스트
				asetFnPnsTtList		: [],		//연금리스트
				asetFnPayPntTtList	: [],		//페이/포인트리스트
				ntpsTotPayAm     : 0,      // 국민연금총납부금액
                ntpsTotEntPrd    : 0,      // 국민연금총가입기간
				/* 롯데카드 비씨카드  삼성카드 신한카드 하나카드 
                현대카드 국민카드 농협카드 시티카드 우리카드 우정사업본부 */
                orgc             : ["D1AADO0000","D1AAFQ0000","D1AAEV0000","D1AAEX0000"
                                    ,"D1AABJ0000","D1AAFO0000","D1AAAF0000","D1AABG0000"
                                    ,"D1AAQE0000","D1AAAH0000","D1AAKA0000"],
				edflnCnt			: 0,      // 학자금대출건수
				edflnAmt			: 0,      // 학자금대출금액
				cusnm               : "",           // 고객명
				astIndSum           : 0,        // 자산증감합계
            }
        },
        computed : {
            ...mapGetters('myassets', [
                'isMyAssetGathering','lastUpdateDtm', 'lastUpdateDtm'
            ]),
			assetUpdateDtm(){
				this.finalUpdateDtm = this.lastUpdateDtm			
				
				/* 자산 업데이트 5분 체크  end */
				return this.finalUpdateDtm
			},   
			// 만료 예정 기관 개수 계산
			orgPrdCnt(){
				let prdCnt = 0
				for(let i=0; i<this.userAsetList.length; i++) {
					// 개인신용정보전송요구내역 루프 start
					for(let j=0; j<this.userAsetList[i].orgList.length; j++) {
						// 각 업권목록 루프 start
						let tmpTmsEdDt = this.userAsetList[i].orgList[j].tmsEdDt || ""
						let acsTknDusDtm = this.userAsetList[i].orgList[j].acsTokenDusDtm || ''
						if(acsTknDusDtm === '0' && dayDiff(tmpTmsEdDt, this.currentDate) >= 0 && dayDiff(tmpTmsEdDt, this.currentDate) <= 30) {
							// 전송요구종료일자가 30일 이내일 경우 만료예정으로 구분
							prdCnt++
						}
					}
				}
				return prdCnt
			},
			// 월말일인지 확인
			isEndDate(){
				const curDate = new Date();
				curDate.setDate(curDate.getDate() + 1)
				return this.currentDate.getMonth() !== curDate.getMonth()
			},
			// 다가올 카드 결제일
			closeCardPayDate() {
				if(this.cardPayDateList.length > 0) {
					return this.cardPayDateList.find(el => {
						let now = new Date()
						let tomrw = dateFormat(new Date(now.setDate(now.getDate() + 1)), 'YYYYMMDD')
						return el === tomrw
					})
				}else {
					return false
				}
			},
			
        },
        mixins: [
            commonMixin
        ],
        created() {
            //초기데이타 선언
            this.cusnm = this.getUserInfo("cusnm")
			// 메인 컴포넌트(slide) 정의 및 정렬
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
				this.cusnm = this.getUserInfo("cusnm")
				let amtHdnList = this.getSecretAmInfo() || []
				this.asetTotAmHideYn = amtHdnList.includes('TOT')
				this.asetFnAmHideYn	 = amtHdnList.includes('FN')
				this.asetRlthHideYn	 = amtHdnList.includes('RLTH')
				this.asetEtcHideYn	 = amtHdnList.includes('ETC')
				this.dbtHideYn		 = amtHdnList.includes('DBT')
				this.isrHideYn		 = amtHdnList.includes('ISR')

				Promise.all([
					this.getData(),// 계좌목록 조회 
					this.getMyAssetAdsv(),//금융자산 리스트 조회
					this.getFinanceKlList(),// 금융지식 조회 
					this.fn_getForeExprList(), // 개인신용정보 전송요구내역 조회
					this.fn_getCardPayInfo(), // 카드결제 예정 정보 조회
					
				])
            },
            getData() {
                // 계좌목록 조회 
                const config = {
                    // url: '/as/as/00ra2',
					url: '/ma/ma/01r03',
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
						"basYm"     : dateFormat(new Date(), "YYYYMM"),
                    	"mainFlag"  : '0'
                    }
                }
                apiService.call(config).then(response =>{
                    this.respInfo = response?.myAssetInfo

                    this.rcnInqDtm           = this.respInfo.rcnInqDtm           // 최근조회일시 
                    this.totAsetAm           = response.totAsetAm || 0		//  자산금액
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
                    this.asetFnAcAmSum       = this.respInfo.asetFnAcAmSum       // 금융자산계좌금액    
                    this.asetFnAcTtcn        = this.respInfo.asetFnAcTtcn        // 금융자산계좌건수    
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

                    /* 2025.02.11) 서비스 내 전월 대비 순자산 증감 계산로직 없으므로 화면 내 계산
					this.indNtAsetTotAm = 0	// 증감순자산총금액
					 이전순자산금액 = 이전금융자산금액 + 이전실물자산금액 + 이전기타자산금액 - 이전총부채금액 
					this.bfNtAsetTotAm = this.bfAsetFnAmSum + this.bfAsetRlthAmSum + this.bfAsetEtcAmSum - this.bfDbtTotAm
					this.indNtAsetTotAm = Math.abs(this.ntAsetTotAm - this.bfNtAsetTotAm)

					this.asetIndAm =  Math.abs(this.indNtAsetTotAm)  // 증감순자산총금액

					//총 금액 변경 이후 금액 Animate 처리 함수 호출
                    amountCountAnimate("ntAsetTotAm", this.ntAsetTotAm)
					*/

					this.astIndSum = 0
					this.astIndSum += this.indAsetFnAcSum
					this.editList = response.assetAmnIOList || [] // 자산편집 정보(부채:01, 현금:02, 부동산:03, 자동차:04, 금:05, 기타:06)
					let dbt = this.editList.find(el => el.asetAmnDsc === '01' && el.totYn === '1') //부채
					if (dbt) this.astIndSum -= this.indDbtTotAm
					let rlest = this.editList.find(el => el.asetAmnDsc === '03' && el.totYn === '1') //부동산
					if (rlest) this.astIndSum += this.respInfo.indAsetRlthRlestAm
					let car = this.editList.find(el => el.asetAmnDsc === '04' && el.totYn === '1') //자동차
					if (car) this.astIndSum += this.respInfo.indAetRlthCarAm
					let etc = this.editList.filter(el =>  ['02','05','06'].includes(el.asetAmnDsc) && el.totYn === '1') //기타자산
					if (etc.length > 2) this.astIndSum += this.indAsetEtcAmSum
					console.log("astIndSum>>>",this.astIndSum)

					//학자금대출
					this.edflnCnt = this.respInfo?.dbtEdufdTcn           || 0 // 부채학자금총건수
					this.edflnAmt = this.respInfo?.dbtEdufdAmSum         || 0 // 부채학자금금액합계
                    
					this.assetList()
                })
            },
			getMyAssetAdsv() {
                ///////////////////////////////////
                // 계좌목록 조회 
                const config = {
                    url: '/as/as/00ra3',
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config).then(response =>{
					//예금
					//this.asetFnAcTtcn = response.totAccn	//총 건수
					response.rndaAcList.forEach((item,index) => {	//입출금
                        response.rndaAcList[index].type = 'RNDA'//타입 
                    })
					response.dpAcList.forEach((item,index) => {	//예금
                        response.dpAcList[index].type = 'DPAC'//타입 
                    })
					response.isAcList.forEach((item,index) => {	//적금
                        response.isAcList[index].type = 'ISAC'//타입 
                    })
					response.fcAcList.forEach((item,index) => {	//외화
                        response.fcAcList[index].type = 'FCAC'//타입 
                    })
					this.asetFnAcTtList = [...response.rndaAcList || [], ...response.dpAcList || [], ...response.isAcList || [], ...response.fcAcList || []]
					
					//투자
					response.bankIvList.forEach((item,index) => {	//펀드
                        response.bankIvList[index].type = 'FND' //타입 
                    })
					response.bankTsIsaList.forEach((item,index) => {	//신탁/ISA
                        response.bankTsIsaList[index].acNowBac = item.acEvlam //금액 
                    })
					response.efinIvList.forEach((item,index) => {	//증권
                        response.efinIvList[index].acWrsnm = item.fncIvAcOnm //상품명 
                    })
					response.p2pInvestList.forEach((item,index) => {	//P2P
                        response.p2pInvestList[index].acWrsnm = item.p2PWrsTpcNm //상품명 
						response.p2pInvestList[index].acNowBac = item.rmAm //금액 
                    })
					
					//this.asetFnIvTtcn = response.ivtotAccn //투자총 건수
					//this.asetFnIvAmSum = response.ivAcTotBac //투자총 금액
					
					this.asetFnIvTtList = [...response.bankIvList || [], ...response.efinIvList || [], ...response.bankTsIsaList || [], ...response.p2pInvestList || []]

					//연금

					// 국민연금
                    this.ntpsTotPayAm     = response.ntpsTotPayAm     // 국민연금총납부금액
                    this.ntpsTotEntPrd    = response.ntpsTotEntPrd    // 국민연금총가입기간
					// 퇴직연금
					response.dcList.forEach((item,index) => {
                        response.dcList[index].type = 'DC'//타입 
						response.dcList[index].acWrsnm = item.dcRtrpnsWrsnm //상품명
						response.dcList[index].acNowBac = item.acEvlam//금액
						response.dcList[index].mydtAcno = item.wrsAmnno//계좌번호
                    })
					console.log("irpList>>>",response.irpList)
                    response.irpList.forEach((item,index) => {
                        response.irpList[index].type = 'IRP'//타입 
						response.irpList[index].acNowBac = item.acEvlam//금액
                    })
					// 개인연금
					response.pnsvInsuList.forEach((item,index) => {
						response.pnsvInsuList[index].type = 'PSIS'//타입 
						response.pnsvInsuList[index].acWrsnm = item.isrcoWrsnm //상품명
						response.pnsvInsuList[index].mydtAcno = item.isrSctsNo//계좌번호
                        response.pnsvInsuList[index].acNowBac = item.isrTotPymAmt //금액
                    })
                    
                    response.pnsvFundList.forEach((item,index) => {
                        response.pnsvFundList[index].type = 'PSIV'//타입 
                    })
	
                    response.pnsTsList.forEach((item,index) => {
                        response.pnsTsList[index].acNowBac = item.acEvlam //정렬금액                        
                        response.pnsTsList[index].type = 'PSTS'//타입 
                    })

					this.asetFnPnsTtList = [...response.dcList || [], ...response.irpList || [], ...response.pnsvInsuList || [], ...response.pnsvFundList || [], ...response.pnsTsList || []]
					
					//페이/포인트

					//페이포인트
					response.payMnyAcList.forEach((item,index) => {
                        response.payMnyAcList[index].pntNm = item.faceOnm //포인트명
                        response.payMnyAcList[index].pntAmt = item.eltfncTotBac //포인트금액
                        response.payMnyAcList[index].type = 'PAY'//타입 
                    })
					//카트포인트
					response.ppaycdList.forEach((item,index) => {
                        response.ppaycdList[index].pntNm = item.ppayCdnm //포인트명
                        response.ppaycdList[index].pntAmt = item.ppaycdTotBac //포인트금액
                        response.ppaycdList[index].type = 'CARD'//타입 
                        
                    })
					//금융포인트
					response.cardPntList.forEach((item,index) => {
                        response.cardPntList[index].pntNm = item.pntnm //포인트명
                        response.cardPntList[index].pntAmt = item.rmPnt //포인트금액
                        
                    })

					this.asetFnPayPntTtList = [...response.payMnyAcList || [], ...response.ppaycdList || [], ...response.cardPntList || []]
					
				})
            },
            /*
            * 화면이동
            */
            fn_movePage(menu) {
				const config = {
					name: menu
                }
				
                // if (menu === 'ASRE4001') {
                //     config.params = {
                //         rlestTtAm : this.asetRlthRlestAm
                //     }
				// }	
				//console.log('## config ##', config)			
                commonService.movePage(config)
            },

            /*
            * 자산등록 팝업호출
            */
            fn_openAssetPage() {                
                const config = {
                    component: COAR4001,
                }
                modalService.openPopup(config).then(() => {
                    this.getData();
                })
            },

            // 신규 자산 연결
            fn_openNewConnect(orgDsc) {
                const config = {
                    component : COAR4002,
                    params : {
                        isExternal : true,
                        orgDsc : orgDsc
                    }
                }
                modalService.openPopup(config).then(() => {
                    this.getData();
                })
            },
            /*
            * 부동산/자동차 등록 팝업호출
            */
            openRlAssetPop(popId) {
                let popName = ""
                switch(popId) {
                    case 'CORE4201':
                        popName = CORE4201	// 부동산
                        break
                    case 'COCA2101':
                        popName = COCA2101	// 자동차
                        break
                    case 'COOA2003':
                        popName = COOA2003	// 빌린돈
                        break
                        
                    default : ''
                }
                const config = {
                    component: popName,
                    params: {"popId":popId}
                }
                modalService.openPopup(config).then(response=> {
                    if(response.popId != "") {
                        this.getData();
                    }
                })
            },
            // 자산수집 mutation 이벤트 감지 
            listenSubscribe() {
                this.getGatheringListenSubscribe()
            },
			/**
			 * 팝업 페이지 이동
			 */
			fn_moveOpenPage(pageId, params) {
				// 팝업
				let compName = ""
				let popParams = {}
				if (pageId === 'ASIP2010') {
					compName = ASIP2010
				}else if(pageId === 'PDMY2040') {
					compName = PDMY2040
				}else if(pageId === 'ASTA4002'){
					compName = ASTA4002
				}else if(pageId === 'PDSC4001'){
					compName = PDSC4001
				}
				
				let config = {
					component: compName,
					params : popParams
				}
				modalService.openPopup(config).then((response) => {
					// 화면 설정 후
					if(pageId == "ASTA4002") {
						console.log('response.isSave ::: ', response?.isSave)
						if (response?.isSave) {
							setTimeout(() => this.fn_setCompSortInfo(), 10)
						}
					}
				})
				
			},
			/**
			 * 수집갱신 처리
			 */
			async fn_refreshApiCall() {
				// 20220422 두번 클릭 방지 
				if(!this.isMyAssetGathering){
					this.getAllMyAssetInfo()
				}
			},
			fn_setHidden(flag, type) {
				if(flag === 'TOT'){
					this.asetTotAmHideYn = type
				}else if(flag === 'FN'){
					this.asetFnAmHideYn = type
				}else if(flag === 'RLTH'){
					this.asetRlthHideYn = type
				}else if(flag === 'ETC'){
					this.asetEtcHideYn = type
				}else if(flag === 'DBT'){
					this.dbtHideYn = type
				}
				this.setSecretAmInfo(flag, type)
			},
			//나의 재무진단
            fn_ASIP2005TAB(idx) {
                const config = {
                    component : ASIP2005TAB,
                    params : {
                        basYm : dateFormat(new Date(), 'YYYYMMDD'),
                        viewIndex : idx
                    }
                };

                modalService.openPopup(config).then(() => {
                // modalService.openSlidePagePopup(config).then(() => {
                    //this.getData();
                });
            },
			// 또래엿보기
            fn_getASIP2009() {
                const config = {
                    component : ASIP2009,
                    params : {
                        basYm : dateFormat(new Date(), 'YYYYMMDD')
                    }
                };

                modalService.openPopup(config).then(() => {
                // modalService.openSlidePagePopup(config).then(() => {
                    this.getData();
                });
            },
			// 금융지식 컨텐츠 조회
			getFinanceKlList(){ 
				this.getFinanInfo('ASTA4001', 6).then(response =>{
					this.financeKlList = response
					// *출력값
					// -썸네일이미지URL명  = thmnlImgUrlnm
					// -글번호 = cntzId
					// -컨텐츠제목 = cntzTinm
					// -추천연령 = asetAgLrgDsnm
				})
			},
			// 금융지식 컨텐츠 상세 팝업
			fnOpenContents(cntzId) {
				const config = {
					component: COCT4011,
					params   : cntzId
				}
				modalService.openPopup(config).then(() => {})
			},
			// 개인신용정보 전송요구내역 조회
			fn_getForeExprList() {
				const config_con = {
					url : "/co/am/08r02", // "/co/am/05rb2", "/co/am/05ra1",
					data : {
						"mydtCusno" : this.getUserInfo('mydtCusno')
						// "mydtCusno" : "2000000842"
						// "mydtCusno" : "2000002900"   // 민도울
					},
					disableLoading : true,
				}
				apiService.call(config_con).then(response => {
					this.userAsetList = response.bzrgList || []
				})
			},
			// 카드 결제예정정보 데이터
			fn_getCardPayInfo() {
				// 카드 정보 목록
				const config1 = {
					url: '/as/cd/01r01',
					data: {
						mydtCusno : this.getUserInfo('mydtCusno'),     // 자산관리고객번호 2000675950
					},
					disableLoading : true,
				}

				apiService.syncCall(config1).then(response => {
					this.ttAmnt      = response.ttAmnt || 0             // 결제 예정인 돈
					this.ttCdLnBac   = response.ttCdLnBac || 0          // 결제 예정인 대출 잔액                
					this.cardOut     = response.cardOut || []           // 이번달 결제예정금액
					this.cardLoanOut = response.cardLoanOut || []       // 남은 결제예정금액
					this.expeOut     = response.expeOut || []           // 청구내역
					this.claimOut    = response.claimOut || []          // 이번달 카드별 이용내역
					this.cardOut.forEach((cur) => {
						if (cur.stlPlaDt) {
							this.cardPayDateList.push(cur.stlPlaDt)
						}
					})
				})
			},
			// 배너 숨기기
			fn_bannerHideYn() {
				this.bannerHideYn = false
			},
			// 금융자산
			assetList() {
				// ## 금융자산 = 에금 + 투자 + 연금 + 페이/포인트
				// 예금 (입출금, 예금, 적금, 외화)
				// 투자 (증권, 펀드, 신탁, ISA)
				// 연금 (국민연금, 퇴직연금(DC형, IRP), 개인연금(연금저축(펀드/신탁), 연금보험))
				// 페이/포인트 (페이머니, 선불카드, 금융포인트)
				let finAssetTotAm = this.asetFnAmSum || 0
				// ## 실물자산 = 부동산 + 자동차
				// [부동산 자산 기준]
				// [자동차 자산 기준] 현 내차 시세
				let realAssetTotAm = this.asetRlthCarAm + this.asetRlthRlestAm
				// ## 기타자산 = 현금 + 외화 + 금 + 기타 + 농기계
				// 기타
				let etcTotAm = this.asetEtcAmSum || 0
				
				let totalAm =  finAssetTotAm + realAssetTotAm + etcTotAm
				
				this.finAssetPer = finAssetTotAm ? Math.round(finAssetTotAm / (totalAm) * 1000) / 10 : 0
				this.realAssetPer = realAssetTotAm ? Math.round(realAssetTotAm / (totalAm) * 1000) / 10 : 0
				this.etcAssetPer = etcTotAm ? Math.round(etcTotAm / (totalAm) * 1000) / 10 : 0
			},
			emptyImg(e) {
            	e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
            },
			/*
            * 예금 상세화면이동.
            */
            fn_openAcDetailPop(type, deposit) {
				
                let compName = ""
                if(type == "RNDA") { 
                    compName = ASAC4102 //입출금
                } else if(type == "DPAC") {
                    compName = ASAC1103 //예금
                } else if(type == "ISAC") {
                    compName = ASAC1104 //적금
                } else if(type == "FCAC") {
                    compName = ASAC1105 //외화
                }

                // 전달파라미터 세팅
                let popupParam = deposit
                popupParam.mydtCusno = this.getUserInfo('mydtCusno') //마이데이터고객번호

                const config = {
                    component: compName,
                    params : {"objAccInfo" : popupParam}
                }

                modalService.openPopup(config).then(() => {
                    //this.getData()
                })
            }, 
			/*
            * 투자 상세화면이동.
            */
			fn_openIvDetailPop(ivObj) {
                var popParams = {
                    "mydtCusno"    : ivObj.mydtCusno,
                    "infOfrmnOrgC" : ivObj.infOfrmnOrgC,
                    "mydtAcno"     : ivObj.mydtAcno,
                    "mydtScNo"     : ivObj.mydtScNo,
                    "bsnDsc"       : ivObj.bsnDsc   //B : 은행, BF:금융펀드, F:금융투자, T:신탁(코드정의 추후 확인할것)
                }
                let config = {}

                if(ivObj.bsnDsc === "F") {
                    //금융투자일때
                    config = {
                        component: ASIV2003,
                        params : {"objIvInfo" : popParams}
                    }
                }else if(ivObj.bsnDsc === "TS") {
                    //신탁ISA일때
                    config = {
                        component: ASIV2005,
                        params : {"objIvInfo" : popParams}
                    }
                } else if(ivObj.bsnDsc === "PI") {
                    //신탁ISA일때
                    config = {
                        component: ASIV2007,
                        params : {"objIvInfo" : popParams}
                    }
                } else {
                    //은행, 금융펀드일때
                    config = {
                        component: ASIV2002,
                        params : {"objIvInfo" : popParams}
                    }
                }
                
                modalService.openPopup(config).then(() => {
                    //this.getData();
                })
            },
			/*
            * 연금 상세화면이동.
            */
			fn_openPnsDetailPop(type, pension) {
				
				console.log("pension>>>",pension)
                let popupParam = pension
                popupParam.mydtCusno = this.getUserInfo('mydtCusno') //마이데이터고객번호

                
                let config = {}
                if(type == "DC") { 
                    config = {
                        component : ASPS2002, // DC퇴직연금
                        params : {"objAccInfo" : popupParam}                   
                    } 
                } else if(type == "IRP") {
                    config = {
                        component : ASPS2004, // IRP
                        params : {"objAccInfo" : popupParam}                   
                    }
                } else if(type == "PSIS") {
                    config = {
                        component : ASIS2013, // 연금저축보험
                        params : {
                            infOfrmnOrgC: pension.infOfrmnOrgC,
                            isrSctsNo: pension.isrSctsNo,
                            isrKdDsc: pension.isrKdDsc
                        }
                    }
                } else if(type == "PSIV") {
                    config = {
                        component : ASIV2002, // 연금저축펀드
                        params : {"objIvInfo" : popupParam}      
                    }
                } 
                else if(type == 'PSTS') {
                    config = {
                        component : ASIV2005, // 연금신탁
                        params : {"objIvInfo" : popupParam}      
                    }                    
                } 

                // 전달파라미터 세팅           
                console.log('@@@popupParam' , popupParam);
                console.log('@@@params' , config.params);

                modalService.openPopup(config).then(() => {
                    this.getData()
                    console.log('@@@mydtCusno' , popupParam)
                })
                
            },
			/*
            * 페이/포인트 상세화면이동.
            */
            fn_openPayDetailPop(target, item) {
                let config = {}

                if(target === "PAY") {
                    //페이머니
                    let popupParam = {
                          "mydtCusno"    : this.getUserInfo('mydtCusno') //마이데이터고객번호
                        , "infOfrmnOrgC" : item.infOfrmnOrgC    //기관코드
                        , "faceNo"       : item.faceNo      //권면번호
                        , "accIdVal"     : item.accIdVal    //계정식별값
                    }

                    config = {
                        component: ASAC1106,
                        params : {"objAccInfo" : popupParam}
                    }
                } else {
                    //선불카드
                    let popupParam = {
                          "mydtCusno"    : this.getUserInfo('mydtCusno') //마이데이터고객번호
                        , "infOfrmnOrgC" : item.infOfrmnOrgC    //기관코드
                        , "mydtCdIdVal"  : item.mydtCdIdVal     //카드식별자
                    }

                    config = {
                        component: ASPT2002,
                        params : {"objAccInfo" : popupParam}
                    }
                }

                modalService.openPopup(config).then(() => {
                    this.getData();
                })
            },
			/*
                입금신청 콕제휴>포인트입금신청 TODO 경로 확인
             */
            fn_rrqr(){
                alert("이동 url 확정 시 추가 작업 예정")
            },
			orgcSome(infOfrmnOrgC){
                let btnType = false
                btnType = this.orgc.some((item) => item === infOfrmnOrgC)
                if(this.getUserInfo('chnl') === "385")btnType = false
                return btnType
            },
			fn_setCompSortInfo() {
				// 상단 탭 영역 정보
				//this.tabs = commonService.getStorage('asetMain' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'tabsV4')
				this.tabs = this.getAsetMain()
				if(!this.tabs || !this.tabs.length || this.tabs.length === 0 || this.tabs.length > 5) {
					// 최초 접속하는 경우 기본 값으로 설정 처리
					this.tabs = [ {id:'finance', name:"금융자산", hidden:'N'}, {id:'real', name:"실물자산", hidden:'N'}, {id:'etc', name:"기타자산", hidden:'N'},
								  {id:'debt', name:"부채", hidden:'N'}, {id:'insure', name:"월 납입 보험료", hidden:'N'} ]
					//commonService.setStorage('asetMain' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'tabsV4', this.tabs)
					this.setAsetMain(this.tabs)
				}
				
				// setTimeout(() => {
				//     this.initSlide()
				// }, 10)
			},
        },
        components : {
            Page,
            FootersV2,
            AsCategoryV2,
			LottieAnimation,
			CmmFlotBanner
        }
    }
</script>