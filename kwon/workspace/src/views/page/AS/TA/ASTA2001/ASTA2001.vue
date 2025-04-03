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
    <page class="content-view mydata2023"><!-- lnb 존재시 class hasLNB -->
        <!-- S :: 자산 카테고리 -->
        <as-category-v2 type="ALL"></as-category-v2>
        <!-- E :: 자산 카테고리 -->

	<!-- content-view S -->
	<!-- lnb 존재시 class hasLNB -->
	<!-- <div class="content-view mydata2023"> -->
		<!-- content S -->
		<div id="content" class="sub_main renewal allAsset expenditure_details">
			<div class="com_inner">
				<div class="top_my_data">
					<div class="top_my_detail">
						<p class="txt">순자산</p>
						<strong class="txt_number">
							<em id="ntAsetTotAm" :data-count="ntAsetTotAm">{{ntAsetTotAm | numberFilter}}</em>
							<span>원</span>
						</strong>
					</div>
					<div>
						<button type="button" class="stdBtn innerType02"  @click="fn_openAssetPage()">자산연결</button>
					</div>
				</div>
			</div>
			<hr class="hr02">
			<div class="com_inner">
				<!-- 금융자산 -->
				<div class="com_box_type01 custom_list">
					<div class="new_tit_area">
						<div class="tit"><span>금융자산</span>
							
						</div>
						<span class="total_price" role="text">
							<em class="num">{{asetFnAmSum | numberFilter}}</em><em class="unit">원</em>
						</span>
					</div>
					<div class="expenditure_info">
						<template v-if="asetFnAmSum > bfAsetFnAmSum">
							<div class="text">
								<p>
									지난달 보다<br>
									<span class="num">{{Math.abs(indAsetFnAcSum) | numberFilter}}</span>원 늘었어요
								</p>
							</div>
							<div class="chart_img up"></div>
						</template>
						<template v-else-if="asetFnAmSum < bfAsetFnAmSum">
							<div class="text">
								<p>
									지난달 보다<br>
									<span class="num">{{Math.abs(indAsetFnAcSum) | numberFilter}}</span>원 줄었어요
								</p>
							</div>
							<div class="chart_img down"></div>
						</template>
						<template v-else>
							<div class="text">
								<p>
									지난달과 자산이 같아요<br>
								</p>
							</div>
							<div class="chart_img"></div>
						</template>
					</div>
					<ul class="list_type_01">
						<!-- 예금 -->
						<li>
							<a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASAC2001')">
								<dl>
									<dt>
										<div>
											<i class="iconBox asset01"></i>
											<em>예금</em>
											<em class="cnt" v-show="asetFnAcTtcn > 0"> {{asetFnAcTtcn | numberFilter}}</em>
										</div>
									</dt>
									<dd>
										<span class="com_price" role="text">
											<em class="num">{{asetFnAcAmSum | numberFilter}}</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</a>
						</li>
						<!-- 투자 -->
						<li>
							<template v-if="asetFnIvTtcn > 0">
								<a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASIV2001')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset02"></i>
												<em>투자</em>
												<em class="cnt"> {{asetFnIvTtcn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{asetFnIvAmSum | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</a>
							</template>
							<template v-else>
								<a href="javascript:void(0)" role="button" @click.prevent="fn_openNewConnect('invest')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset02"></i>
												<em>투자</em>
											</div>
										</dt>
										<dd><span class="com_price" role="text">수익률 확인하기</span></dd>
									</dl>
								</a>
							</template>
						</li>
						<!-- 연금 -->
						<li>
							<template v-if="asetFnPnsTtcn > 0">
								<a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASPS2001')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset03"></i>
												<em>연금</em>
												<em class="cnt"> {{asetFnPnsTtcn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{asetFnPnsAmSum | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</a>
							</template>
							<template v-else>
								<a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('PDRT2001')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset03"></i>
												<em>연금</em>
											</div>
										</dt>
										<dd><span class="com_price" role="text">노후준비 상태는?</span></dd>
									</dl>
								</a>
							</template>
						</li>
						<!-- 페이/포인트 -->
						<li>
							<template v-if="asetFnPayPntTtcn > 0">
								<a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASPT2001')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset04"></i>
												<em>페이/포인트</em>
												<em class="cnt"> {{asetFnPayPntTtcn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{asetFnPayPntAmSum | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</a>
							</template>
							<template v-else>
								<a href="javascript:void(0)" role="button" @click.prevent="fn_openNewConnect('efin')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset04"></i>
												<em>페이/포인트</em>
											</div>
										</dt>
										<dd><span class="com_price" role="text">숨은 돈 찾기</span></dd>
									</dl>
								</a>
							</template>
						</li>
					</ul>
				</div>
				<!--// 금융자산 -->
				<!-- 실물자산 -->
				<div class="com_box_type01 custom_list">
					<template v-if="asetRlthTtcn > 0">
						<div class="new_tit_area">
							<div class="tit"><span>실물자산</span>
								
							</div>
							<span class="total_price" role="text"  v-html="fn_numberFormatKorAmt(asetRlthAmSum)">
								<!--<em class="num">12억 3,450</em><em class="unit">만원</em>-->
							</span>
						</div>
						<div class="expenditure_info"> 
							<template v-if="indAsetRlthAmSum < 0">
								<div class="text">
									<p>지난달 보다<br>
										<span class="num">{{Math.abs(indAsetRlthAmSum) | numberFilter}}</span>원 줄었어요
									</p>
								</div>
								<div class="chart_img down"></div>
							</template>
							<template v-else-if="indAsetRlthAmSum > 0">
								<div class="text">
									<p>지난달 보다<br>
										<span class="num">{{indAsetRlthAmSum | numberFilter}}</span>원 늘었어요
									</p>
								</div>
								<div class="chart_img up"></div>
							</template>
							<template v-else >
								<div class="text">
									<p>지난달과<br>
										<span class="num"></span>동일해요
									</p>
								</div>
								<div class="chart_img "></div>
							</template>
						</div>
					</template>
					<!-- 실물자산 없을 때-->
					<template v-else>
								<div class="new_tit_area">
									<div class="tit"><span>실물자산</span>
										
									</div>
									<span class="total_price" role="text">
										<em class="num">0</em><em class="unit">만원</em>
									</span>
								</div>
					</template>
					<ul class="list_type_01">
						<li>
							<template v-if="asetRlthRlestCn > 0">
								<a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASRE2001')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset05"></i>
												<em>부동산</em>
												<em class="cnt"> {{asetRlthRlestCn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text" v-html="fn_numberFormatKorAmt(asetRlthRlestAm)">
												<!--<em class="num">12억 3,000</em><em class="unit">만원</em>-->
											</span>
										</dd>
									</dl>
								</a>
							</template>
							<!-- 부동산(없을 때) -->
							<template v-else>
								<a href="javascript:void(0)" role="button" @click.prevent="openRlAssetPop('CORE2201')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset05"></i>
												<em>부동산</em>
											</div>
										</dt>
										<dd><span class="com_price" role="text">최근 실거래는?</span></dd>
									</dl>
								</a>
							</template>	
						</li>
						<li>
							<template v-if="asetRlthCarCn > 0">
								<a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASCA2001')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset06"></i>
												<em>자동차</em>
												<em class="cnt"> {{asetRlthCarCn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text" v-html="fn_numberFormatKorAmt(asetRlthCarAm)">
												<!--em class="num">1억 3,000</em><em class="unit">만원</em>-->
											</span>
										</dd>
									</dl>
								</a>
							</template>	
							<!-- 자동차(없을 때) -->
							<template v-else>
								<a href="javascript:void(0)" role="button" @click.prevent="openRlAssetPop('COCA2101')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset06"></i>
												<em>자동차</em>
											</div>
										</dt>
										<dd><span class="com_price" role="text">시세 알아보기</span></dd>
									</dl>
								</a>
							</template>
						</li>
					</ul>

				</div>
				<!--// 실물자산 -->
				<!-- 기타자산 -->
				<template v-if="asetEtcTtcn > 0">
					<div class="com_box_type01 custom_list">
						<a href="javascript:void(0)" role="button" class="new_tit_area" @click.prevent="fn_movePage('ASOA2001')">
							<div class="tit"><span>기타자산</span></div>
							<span class="total_price ico_arrow">
								<em class="num">{{asetEtcAmSum | numberFilter}}</em><em class="unit">원</em>
							</span>
						</a>
						<div class="expenditure_info">
							<template v-if="indAsetEtcAmSum > 0">
								<div class="text">
									<p>
										지난달 보다<br>
										<span class="num">{{Math.abs(indAsetEtcAmSum) | numberFilter}}</span>원 늘었어요
									</p>
								</div>
								<div class="chart_img up"></div>
							</template>
							<template v-else-if="indAsetEtcAmSum < 0">
								<div class="text">
									<p>
										지난달 보다<br>
										<span class="num">{{Math.abs(indAsetEtcAmSum) | numberFilter}}</span>원 줄었어요
									</p>
								</div>
								<div class="chart_img down"></div>
							</template>
							<template v-else>
								<div class="text">
									<p>
										지난달과 자산이 같아요<br>
									</p>
								</div>
								<div class="chart_img"></div>
							</template>						
						</div>
						<ul class="list_type_01">
							<!-- 현금 -->
							<template v-if="asetEtcCshCn > 0"> 
								<li>
									<dl>
										<dt>
											<div>
												<i class="iconBox asset07"></i>
												<em>현금</em>
												<em class="cnt"> {{asetEtcCshCn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{asetEtcCshAmSum | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li>
							</template>
							<!-- 금 -->
							<template v-if="asetEtcGoldCn > 0 ">  
								<li>
									<dl>
										<dt>
											<div>
												<i class="iconBox asset08"></i>
												<em>금</em>
												<em class="cnt"> {{asetEtcGoldCn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{asetEtcGoldAm | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li>
							</template>
							<!-- 기타 -->
							<template v-if="asetEtcEtcCn > 0 ">  
								<li>
									<dl>
										<dt>
											<div>
												<i class="iconBox asset09"></i>
												<em>기타</em>
												<em class="cnt"> {{asetEtcEtcCn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{asetEtcEtcAm | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li>
							</template>
						</ul>
					</div>
				</template>
				<!--// 기타자산 -->
				<!-- 부채 -->
				<div class="com_box_type01 custom_list">
					<div class="new_tit_area">
						<div class="tit"><span>부채</span>
							
						</div>
						<span class="total_price" role="text">
							<em class="num">{{dbtTotAm | numberFilter}}</em><em class="unit">원</em>
						</span>
					</div>
					<template v-if="dbtTtcn > 0">
						<div class="expenditure_info">
							<template v-if="indDbtTotAm > 0">
								<div class="text">
									<p>
										지난달 보다<br>
										<span class="num">{{Math.abs(indDbtTotAm) | numberFilter}}</span>원 늘었어요 
									</p>
								</div>
								<div class="chart_img up"></div>
							</template>
							<template v-else-if="indDbtTotAm < 0">
								<div class="text">
									<p>
										지난달 보다<br>
										<span class="num">{{Math.abs(indDbtTotAm) | numberFilter}}</span>원 줄었어요 
									</p>
								</div>
								<div class="chart_img down"></div>
							</template>	
							<template v-else>
								<div class="text">
									<p>
										지난달과 <br>
										<span class="num"></span> 동일해요 
									</p>
								</div>
								<div class="chart_img "></div>
							</template>										 		
						</div>
					</template>
					<ul class="list_type_01">
						<!-- 카드 -->
						<li>
							<template v-if="dbtCdTcn > 0">
								<a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASCD2001')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset10"></i>
												<em>카드</em>
												<em class="cnt"> {{dbtCdTcn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{dbtCdAmSum | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</a>
							</template>
							<template v-else>
								<a href="javascript:void(0)" role="button" @click.prevent="fn_openNewConnect('card')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset10"></i>
												<em>카드</em>
											</div>
										</dt>
										<dd><span class="com_price" role="text">결제금액 모아보기</span></dd>
									</dl>
								</a>

							</template>
						</li>
						<!-- 대출 -->
						<li>
							<template v-if="dbtLonTtcn > 0">
								<a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASLN2001')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset11"></i>
												<em>대출</em>
												<em class="cnt"> {{dbtLonTtcn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{dbtLonAmSum | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</a>
							</template>
							<template v-else>
								<a href="javascript:void(0)" role="button" @click.prevent="fn_openNewConnect('bank')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset11"></i>
												<em>대출</em>
											</div>
										</dt>
										<dd><span class="com_price" role="text">대출 관리하기</span></dd>
									</dl>
								</a>

							</template>
						</li>
						<!-- 할부금융 -->
						<li>
							<template v-if="dbtIstCn > 0">
								<a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASIT2001')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset12"></i>
												<em>할부금융</em>
												<em class="cnt"> {{dbtIstCn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{dbtIstAm | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</a>
							</template>
							<template v-else>		
								<a href="javascript:void(0)" role="button" @click.prevent="fn_openNewConnect('capital')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset12"></i>
												<em>할부금융</em>
											</div>
										</dt>
										<dd><span class="com_price" role="text">할부금 관리하기</span></dd>
									</dl>
								</a>

							</template>						
						</li>
						<!-- 자동차할부 -->
						<template v-if="dbtCarIstCn > 0">
							<li>
								<a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASCL2001')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset13"></i>
												<em>자동차할부</em>
												<em class="cnt"> {{dbtCarIstCn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{dbtCarIstAm | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</a>
							</li>
						</template>	
						<!-- 리스 -->
						<template v-if="dbtLeasCn > 0">
							<li>
								<a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASLS2001')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset14"></i>
												<em>리스</em>
												<em class="cnt"> {{dbtLeasCn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{dbtLeasAm | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</a>
							</li>
						</template>
						<!-- 빌린돈 -->
						<template v-if="dbtCshCn > 0">
							<li>
								<a href="javascript:void(0)" role="button" @click.prevent="fn_movePage('ASBR2001')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset15"></i>
												<em>빌린돈</em>
												<em class="cnt"> {{dbtCshCn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{dbtCshAm | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</a>
							</li>
						</template>
					</ul>
				</div>
				<!--// 부채 -->
				<!-- 보험 월 납입료 -->
				<template v-if="isrTtcn > 0">
					<div class="com_box_type01 custom_list">
						<!-- jlee 08/22 툴팁추가로 구조변경 -->
						<ul class="new_tit_area layoutBox wAuto rBtn">
							<li class="left">
								<div class="tit">
									<span>보험 월 납입료</span>
									<div class="custom_tooltip up">
										<div class="com_tooltip_type02 com_tooltip_type03">
											<a class="com_btn_info" role="button" @click="()=> isShowInfo = true">
												<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
											</a>
											<div v-show="isShowInfo" class="com_ballon_type01 com_ballon_type02" style="display: block;">
												<div>
													<strong class="title">인보험이란?</strong>
													<p class="dot_msg">사람의 생명이나 신체 손해에 대한 보험으로 생명, 상해, 질병 보험 등이 속해요</p>
													<br>
													<strong class="title">물보험이란?</strong>
													<p class="dot_msg">물건과 기타 재산 피해에 대한 보험으로 화재, 운송, 해상, 자동차, 펫보험 등이 속해요</p>
													<a class="com_btn_close" @click="()=> isShowInfo = false"><span class="blind">툴팁닫기</span></a>
												</div> 
											</div>
										</div>
									</div>
								</div>
							</li>
							<li class="right">
								<a href="javascript:void(0)" title="보험목록 이동" @click.prevent="fn_movePage('ASIS2001')">
									<span class="total_price ico_arrow">
										<em class="num">{{isrPymIsrfeTt | numberFilter}}</em><em class="unit">원</em>
									</span>
								</a>
							</li>
						</ul>
						<!--// jlee 08/22 툴팁추가로 구조변경 -->
						<ul class="list_type_01">
							<template v-if="isrMnInsuCn > 0">
								<li>
									<dl>
										<dt>
											<div>
												<i class="iconBox asset16"></i>
												<em>인보험</em>
												<em class="cnt"> {{isrMnInsuCn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{isrMnTotPymIsrfe | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li>
							</template>
							<template v-if="isrTngInsuCn > 0">
								<li>
									<dl>
										<dt>
											<div>
												<i class="iconBox asset17"></i>
												<em>물보험</em>
												<em class="cnt"> {{isrTngInsuCn | numberFilter}}</em>
											</div>
										</dt>
										<dd>
											<span class="com_price" role="text">
												<em class="num">{{isrTngTotPymIsrfe | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li>
							</template>
						</ul>
					</div>
					<!--// 보험 월 납입료 -->
				</template>
				<template v-else>	
					<!-- 보험 월 납입료 no data -->
					<div class="com_box_type01 custom_list">
						<div class="new_tit_area">
							<div class="tit"><span>보험 납입금액</span></div>
							<span class="total_price">
								<em class="num">0</em><em class="unit">원</em>
							</span>
						</div>
						<ul class="list_type_01">
							<li>
								<a href="javascript:void(0)" role="button" @click.prevent="fn_openNewConnect('insu')">
									<dl>
										<dt>
											<div>
												<i class="iconBox asset16"></i>
												<em>보험</em>
											</div>
										</dt>
										<dd><span class="com_price" role="text">보장내용 체크하기</span></dd>
									</dl>
								</a>
							</li>
						</ul>
					</div>
					<!--// 보험 월 납입료 no data -->
				</template>
			</div>
		</div>
		<!--// content E -->
				
		<!--// content-view E -->
	<!-- </div>    -->
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
    
    import {numberFormat} from '@/utils/number'
    import {amountCountAnimate} from '@/utils/jUtils'

    import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
    import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001' // 자산등록
    import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002' // 기관선택

    import CORE2201 from '@/views/page/CO/RE/CORE2201/CORE2201' // 부동산등록
    import COCA2101 from '@/views/page/CO/CA/COCA2101/COCA2101' // 자동차등록
    import COOA2003 from '@/views/page/CO/OA/COOA2003/COOA2003' // 빌린돈
    
    import {mapGetters} from 'vuex'    
    import {mapActions} from 'vuex'

    export default {
        name : "ASTA2001",
        data: () => {
            return {
                cusnm               : "",
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

				isShowInfo          : false, // 
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
                this.getData();
            },
            getData() {
                ///////////////////////////////////
                // 계좌목록 조회 
                const config = {
                    url: '/as/as/00ra2',
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config).then(response =>{
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
					
					this.asetIndAm =  Math.abs(this.indNtAsetTotAm)  // 증감순자산총금액
					//console.log("======= ntAsetTotAm =======", this.ntAsetTotAm)  // 순자산						
					//console.log("======= asetIndAm =======", this.asetIndAm)  // 자산증감액 절대값	

					this.asetRlthTtcn        = this.asetRlthRlestCn + this.asetRlthCarCn   // 실물자산건수 = 실물자산부동산건수 + 실물자산자동차건수
					// 부채총건수 
					this.dbtTtcn             = this.dbtLonTtcn + this.dbtCdTcn + this.dbtIstCn + this.dbtCarIstCn + this.dbtLeasCn + this.dbtCshCn

                    /*
                    let plusRlestAm   = 0
                    for(let i=0; i<this.rlestList.length; i++) {
                        if(this.rlestList[i].rlestTngDsc == '6' || this.rlestList[i].rlestTngDsc == '7' || this.rlestList[i].rlestTngDsc == '9') {
                            plusRlestAm = Number(plusRlestAm) + Number(this.rlestList[i].rlestTrPr);
                        }
                    }
                    //console.log("토지 상가 기타 금액 합산 = " + plusRlestAm)
                    this.rlestTtAm    = Number(this.respInfo.rlestTtAm) + (Number(plusRlestAm)*10000)     //부동산총금액
                    this.asetTotAm    = Math.floor(Number(this.respInfo.asetTotAm) + (Number(plusRlestAm)*10000))  //자산합계
                    */

                    //총 금액 변경 이후 금액 Animate 처리 함수 호출
                    amountCountAnimate("ntAsetTotAm", this.ntAsetTotAm)
                })
            },

            fn_numberFormatKorAmt(number) {
                const unit = ['', '만', '억', '조', '경']
                const splitAmt = 10000
                const splitCnt = unit.length

                let resultArray = []
                let resultString = ""

                for(let i = 0; i < splitCnt; i++){
                    let rst = (number % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
                    rst = Math.floor(rst)

                    if(rst > 0){
                        resultArray[i] = rst
                    }
                }

                let strIdx = 0  // 최초시작지점에 '원' 추가가히위함

                for(let j = 0; j < resultArray.length; j++){
                    if(!resultArray[j])  {
                        strIdx++
                        continue
                    }

                    if(j === strIdx) {
                        resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '원</em>' + resultString
                    } else {
                        resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '</em>' + resultString
                    }
                }

                return resultString
            },

            /*
            * 화면이동
            */
            fn_movePage(menu) {
				const config = {
					name: menu
                }
				
                if (menu === 'ASRE2001') {
                    config.params = {
                        rlestTtAm : this.asetRlthRlestAm
                    }
				}	
				//console.log('## config ##', config)			
                commonService.movePage(config)
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
            * 부동산 자가/전세/월세 구분 명
            */
            fn_getRlestFormDscNm(dsc) {
                let cmmLnList = this.getCodeList("RLEST_RSD_FORM_DSC");
                return cmmLnList[cmmLnList.findIndex(x => x.comnCVal === dsc)].comnCExpl
            },

            /*
            * 자산 수집 호출 (기관코드 0000000000은 ==> 전체 수집 의미)
            */
            fn_refreshApiCall() {
                this.getAllMyAssetInfo()

            },

            /*
            * 부동산/자동차 등록 팝업호출
            */
            openRlAssetPop(popId) {
                let popName = ""
                switch(popId) {
                    case 'CORE2201':
                        popName = CORE2201	// 부동산
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
                // this.subscribe = this.$store.subscribe((mutation, state) => {
                //     const isMyAssetGathering = mutation.type === 'myassets/completeMyAssetGatherData'
                //     // 예금 전체조회
                //     if (isMyAssetGathering) {
                //         console.log('자산수집 subscribe  ###############################', mutation, state)
                //         this.getData()
                //     }
                // })
            },
            // 공통코드 명칭 변환
            getComCodeNm(code, codeValue) {
                const codeList = this.getCodeList(code);
                let codeObj = '';

                if(codeList.length > 0) {
                    codeObj = codeList.find((codeTmp) => codeTmp.comnCVal == codeValue);

                    if(codeObj == 'undefined' || codeObj == null) {
                        return codeObj;
                    }
                } else {
                    return codeObj;
                }
                //console.log("codeList = ", codeList);
                //console.log("codeObj = ", codeObj);

                return codeObj.comnCExpl;
			},
        },
        components : {
            Page,
            FootersV2,
            AsCategoryV2,
        }
    }
</script>