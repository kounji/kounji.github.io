<!--
// 2025 NATIVE 호출 함수 수정
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > NH콕마이카
* @ 페이지설명 : 전체메뉴 > NH콕마이카
* @ 파일명     : src\views\page\AN\CA\ANCA4201\ANCA4201.vue
* @ 작성자     : CS528043
* @ 작성일     : 2022-08-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-16              CS528043              최초작성(신규)
* 2025-02-25              CS541015              NH콕마이데이터4.0 추진개발 (ANCA2201 → ANCA4201)
*************************************************************************/
/************************************************************************/
/* 변경사항 */
/* AS-IS */
/* 1.조회 시 보유자동차목록 loop처리로 차량정보, 알림목록,신차목록, 차계부금액 가져옴 */
/* 2.해당 월 1일~31일까지 차량별 금액List를 가져와서 집계 후 차계부이용여부 판단 */
/* 3. 차계부 지출내역 전체조회 가능 */
/* TOBE */
/* 1. 신차/중고차, 자동차관리 CASE에 따라 화면SVC구분 */
/*    (자동차관리:CARCARE, 신차중고차:CARDEAL) */
/* 2. 화면진입 시 기본 보유자동차 목록 기본 조회, 화면SVC구분 값에 따라 서비스 호출되도록 변경 */
/* 3. 차계부 등록여부 값을 통한 이용자판단 및 차계부 지출내역은 개별조회로 변경 */
/* 4. 신차 및 중고차 제휴업체 카동으로 변경 */
/************************************************************************/
-->
<template>
	<page class="content-view">
		<!-- content S -->
		<div id="content" class="sub_main renewal" ref="viewTop">
			<!-- 보유 차량 있을 때 -->
			<template v-if="carList.length > 0">
				<!-- 내차 정보 slide -->
				<div class="car_detail_box car_slide slick_refresh empty" :class="carList.length === 1 ? 'box_center' : ''" id="myCarList"><!-- 자동차 1개일때 class box_center 추가 -->
					<template v-for="(carInfo, idx) in carList">
						<div class="item" :key="'key1_' + idx">
							<a href="javascript:void(0)" role="button" @click.prevent="fn_goCarDetailPg()">
								<span class="img car_animation01">
									<img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="setAlt(carInfo.carBrannm, carInfo.carModlnm, carInfo.carGrdnm)">
									<img v-else :src="carInfo.cartpRepImgUrlnm" @error="emptyImg" :alt="setAlt(carInfo.carBrannm, carInfo.carModlnm, carInfo.carGrdnm)">
								</span>
								<div class="car_detail">
									<p class="txt">오늘까지 현 주행거리</p>
									<p class="txt_km">
										<strong>{{carInfo.odmtrDist | numberFilter}}</strong>
										<span>km</span>
									</p>
									<strong class="car_name">{{carInfo.carBrannm}} {{carInfo.carModlnm}} {{carInfo.carGrdnm}}</strong>
									<span class="label_bor"><em>{{carInfo.vhcnoVal}}</em></span>
								</div>
							</a>
						</div>
					</template>
				</div>
			</template>
			<!-- 보유 차량 없을 때 -->			
			<template v-else>
				<div class="car_detail_box">
					<div class="item">
						<a href="javascript:void(0)" role="button" @click.prevent="fn_goPopPage('COCA2101')">
							<div class="car_detail">
								<strong class="car_name">내차 등록하고,</strong>
								<p class="txt">자동차 시세정보 및 유지<br>관리를 한번에!</p>
								<span class="btn_round_new ico_car_search">차량 번호 조회하기</span>
							</div>
						</a>
					</div>
				</div>				
			</template>

			<!-- 신차구매/중고차매매 화면 S -->
			<template v-if="viewSvc=='CARDEAL'">
				<div class="com_inner">
					<!-- 자동차 보유 시 중고차 매매 -->
					<template v-if="carList.length > 0">
						<div class="car_inner">
							<strong class="com_cont_tit01 custom">중고차 매매</strong>
							<div class="box_border_link">
								<a href="javascript:void(0)" role="button" class="ico01" @click.prevent="fn_openBrowser('CARSELL')">
									<strong>유리한 조건으로</strong>
									<strong class="arrow">내 차 판매하기</strong>
								</a>
								<a href="javascript:void(0)" role="button" class="ico02" @click.prevent="fn_openBrowser('CERTUSEDCAR')">
									<strong>신차급 중고차</strong>
									<strong class="arrow">내차 구매하기</strong>
								</a>
							</div>
						</div>
					</template>
					<!-- 자동차 미 보유 시 자동차 구매 -->
					<template v-else>
						<div class="car_inner">
							<strong class="com_cont_tit01 custom">자동차 구매</strong>
							<div class="box_border_link">
								<a href="javascript:void(0)" role="button" class="ico03" @click.prevent="fn_openBrowser('NEWCAR')">
									<strong>맞춤 견적 받고</strong>
									<strong class="arrow">신차 구매하기</strong>
								</a>
								<a href="javascript:void(0)" role="button" class="ico02" @click.prevent="fn_openBrowser('CERTUSEDCAR')">
									<strong>신차급 중고차</strong>
									<strong class="arrow">내차 구매하기</strong>
								</a>
							</div>
						</div>
					</template>

					<!-- 내차 구입 대출상품 배너 -->
					<div class="car_inner inner_banner">
						<a href="javascript:void(0);" role="button" @click.prevent="fn_loanMove()">
							<!-- bg class 변경예정 -->
							<!-- <div class="com_box_type03 bg22">
								<div class="text">내차 구입을 위한<br>
									<span>우대 금리 대출상품 추천까지!</span>
								</div>
							</div> -->
							<!-- 2022-09-28 : 이미지로 교체 -->
							<img src="@/assets/images/banner/img_benner_02.png" alt="내차 구입을 위한 우대 금리 대출상품 추천까지!">	
						</a>
					</div>				

					<!-- 인기 많은 중고차 Top10 -->
					<div class="car_inner">
						<template v-if="addUsedCarList.length > 0">
							<div class="com_cont_tit01 custom strong_color">
								떴다! 중고차 매물
								<strong class="robo_m">NEW</strong><!-- 2022-09-15 문구수정 -->
							</div>
							<!-- 2022-09-07 마크업 수정 -->
							<div class="goods_wrap"> 
								<div class="goods_list_slide" id="usedCarList">
									<template v-for="(usedCarInfo, usedCarIdx) in addUsedCarList">
										<div class="item" :key="'usedCar_' + usedCarIdx">
											<a href="javascript:void(0);" role="button" class="goods_item" @click.prevent="fn_openBrowser('USEDCAR', usedCarInfo.cnctLkNm)">
												<span class="ico_ranking new">NEW</span>
												<span class="img">
													<img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="usedCarInfo.vhcModlnm">
													<img v-else :src="usedCarInfo.uscarImgPathnm" @error="emptyImg" :alt="usedCarInfo.vhcModlnm">									
												</span>
												<p class="name">
													{{usedCarInfo.vhcModlnm}}
												</p>
												<template v-if="usedCarInfo.carMdyrNm !== '' || usedCarInfo.carMdyrNm !== null  && usedCarInfo.carMdyrNm.length > 0">
													<p class="date"><em class="num">{{usedCarInfo.carMdyrNm | dateFilter('YYYY')}} 연식</em></p>
												</template>
												<template v-else>
													<p class="date"><em class="num"></em></p>
												</template>
												<p class="price" v-html="fn_numberFormatKorAmt(usedCarInfo.carSelPr, 'PRICE1')">
												</p>
											</a>
										</div>

										<!-- 데이터 마지막에 더보기 버튼 노출 -->
										<template v-if="addUsedCarList.length === usedCarIdx + 1">
											<div class="item" :class="addUsedCarList.length === usedCarIdx + 1 ? 'last' : ''" :key="'usedCar2_' + usedCarIdx">
												<button type="button" class="goods_item goods_item_more" @click.prevent="fn_cardongSrch('ANCA2001')">
													<span>중고차 더보기</span>
												</button>
											</div>	
										</template>
									</template>
								</div>
							</div>
							<!-- //2022-09-07 마크업 수정 -->
							<a href="javascript:void(0)" role="button" class="btn_more_arrow" @click.prevent="fn_cardongSrch('ANCA2001')">더보기</a> <!-- 2022-09-08 추가 -->
						</template>
					</div>

					<!-- 자동차 보유 시 신차 견적 -->
					<template v-if="carList.length > 0">
						<div class="car_inner">
							<strong class="com_cont_tit01 custom">신차견적</strong>
							<div class="box_border_link">
								<a href="javascript:void(0)" role="button" class="ico03" @click.prevent="fn_openBrowser('NEWCAR')">
									<strong>맞춤 견적 받고</strong>
									<strong class="arrow">신차 구매하기</strong>
								</a>
								<a href="javascript:void(0)" class="ico04" role="button" @click.prevent="fn_goPopPage('PDMY4005')">
									<strong>차근차근 모아</strong>
									<strong class="arrow">드림카 마련하기</strong>
								</a>
							</div>
						</div>
					</template>

					<!-- 자동차 미 보유 시 차근차근 드림카 배너-->
					<template v-else>
						<div class="car_inner">
							<div class="inner_banner">
								<a href="javascript:void(0);" role="button" @click.prevent="fn_goPopPage('PDMY4005')">
									<!-- bg class 변경예정 -->
									<!-- <div class="com_box_type03 bg27">
										<div class="text">차근차근 모아<br>
											<span>내 차고에 드림카 채워 넣기!</span>
										</div>
									</div> -->
									<!-- 2022-09-28 : 이미지로 교체 -->
									<img src="@/assets/images/banner/img_benner_05.png" alt="차근차근 모아 내 차고에 드림카 채워 넣기!">									
								</a>
							</div>
						</div>
					</template>

					<!-- 인기 많은 신차 Top10 --> 
					<div class="car_inner">
						<template v-if="newCarTopList.length > 0">
							<div class="com_cont_tit01 custom strong_color">
								인기 많은 신차
								<strong class="robo_m">TOP10</strong>
							</div>
							<!-- 2022-09-07 마크업 수정 -->
							<div class="goods_wrap">
								<div class="goods_list_slide" :class="viewSvc == 'CARDEAL' ? 'slick_refresh' : ''" id="newCarList">
									<template v-for="(carInfo, newCarIdx) in newCarTopList">
										<div class="item" :key="'newCar_' + newCarIdx">
											<a href="javascript:void(0);" role="button" class="goods_item" @click.prevent="fn_goNewCarDetailPage(carInfo.carCtrimNo)">
												<!-- 1위부터 3위까지 순위노출 -->
												<template v-if="(newCarIdx + 1) <= 3">
													<span class="ico_ranking" :class="'ranking0' + (newCarIdx + 1)">{{newCarIdx + 1}}</span><!-- 2022-09-16 3위까지 메달순위 노출 -->
												</template>																				
												<span class="img">
													<img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="setAlt(carInfo.carBrannm, carInfo.carModlnm, carInfo.carCtrimNm)">
													<img v-else :src="fn_setImgUrl(carInfo.carCtrimBscImgPathnm)" @error="emptyImg" :alt="setAlt(carInfo.carBrannm, carInfo.carModlnm, carInfo.carCtrimNm)">
												</span>
												<p class="name">
													{{carInfo.carBrannm}} {{carInfo.carModlnm}} {{carInfo.carCtrimNm}}
												</p>
												<p class="date">
													<em class="num">{{carInfo.carModlMktgDt |dateFilter('YYYY년 MM월')}} 기준</em>
												</p>
												<p class="price" v-html="fn_numberFormatKorAmt(carInfo.carCtrimSelAm, 'PRICE1')">
												</p>
											</a>
										</div>
										<!-- 데이터 마지막에 더보기 버튼 노출 -->
										<template v-if="newCarTopList.length == newCarIdx + 1">
											<div class="item" :class="newCarTopList.length == newCarIdx + 1 ? 'last' : ''" :key="'newCar2_' + newCarIdx">
												<button type="button" class="goods_item goods_item_more" @click.prevent="fn_cardongSrch('ANCA2002')">
													<span>신차 더보기</span>
												</button>
											</div>
										</template>
									</template>
								</div>
							</div>
							<!-- //2022-09-07 마크업 수정 -->
							<a href="javascript:void(0)" role="button" class="btn_more_arrow" @click.prevent="fn_cardongSrch('ANCA2002')">더보기</a> <!-- 2022-09-08 추가 -->													
						</template>
					</div>

					<template v-if="carList.length > 0">
						<!-- 자동차 보유 시 내차 관리를 스마트하게 -->
						<div class="car_inner">
							<a href="javascript:void(0);" role="button" class="blue_link ico01" @click.prevent="fn_carViewSvc('CARCARE')">
								<strong class="tit">내차 관리를 스마트하게!</strong>
								<p>소모품부터 자동차 보험, 세금 등
									<strong class="com_point_darkblue">마이카 올인원 케어</strong>
									를 받아보세요!
								</p>
							</a>
						</div>
						<!-- 자동차 보유 시 농기계 구매, 중고 매매 -->
						<div class="car_inner margin_s">
							<div class="bg_diary_cell car_buy blue_color"><!-- 2022-08-30 class 추가 blue_color -->
								<a href="javascript:void(0)" role="button" class="cell ico01" @click.prevent="fn_goPage('SZFL4101')">
									<span>융자를 통한</span>
									<strong>농기계 구매하기</strong>
								</a>
								<a href="javascript:void(0)" role="button" class="cell ico02" @click.prevent="fn_openBrowser('AGRIIS')">
									<span>트렉터 살때 팔때</span>
									<strong>농기계 중고매매</strong>
								</a>
							</div>
						</div>
					</template>
					<template v-else>
						<div class="car_inner">
							<strong class="com_cont_tit01 custom">마이카 올인원 케어</strong>
							<div class="custom_box custom_box4">
								<div class="travel_wrap">
									<div class="slider_wrap sc_Top">
										<div class="tab_cont2" :class="viewSvc == 'CARDEAL' ? 'slick_refresh' : ''" id="myCarAllInOnCare">
											<!-- 2022-08-01 a 태그로 변경 -->
											<div class="cmm-tab-panel">
												<a href="javascript:void(0)" role="button" class="slide">
													<div class="travel_info bg_car_banner01">
														<div class="travel_tit">소모품</div>
														<div class="travel_con01">내차 컨디션을 최고로 만들기</div>
														<div class="travel_con02">엔진오일, 브레이크오일, 타이어 등 교체시기를 매달 확인하고!</div>
													</div>
												</a>
											</div>
											<div class="cmm-tab-panel">
												<a href="javascript:void(0)" role="button" class="slide">
													<div class="travel_info bg_car_banner02">
														<div class="travel_tit">보험</div>
														<div class="travel_con01">안전운전을 위한 내보험 정보</div>
														<div class="travel_con02">내차 보험 상품 정보 및 사전에 만기일을 알려주고!</div>
													</div>
												</a>
											</div>
											<div class="cmm-tab-panel">
												<a href="javascript:void(0)" role="button" class="slide">
													<div class="travel_info bg_car_banner03">
														<div class="travel_tit">세금</div>
														<div class="travel_con01">매년 납부해야 하는 자동차세</div>
														<div class="travel_con02">올해 나의 예상 자동차세, 연납시 공제율은 얼마인지 알 수 있고!</div>
													</div>
												</a>
											</div>
											<div class="cmm-tab-panel">
												<a href="javascript:void(0)" role="button" class="slide">
													<div class="travel_info bg_car_banner04">
														<div class="travel_tit">검사</div>
														<div class="travel_con01">내차 정기검사일은 필수 체크</div>
														<div class="travel_con02">자동차 정기검사 기간 및 과태료 정보를 확인할 수 있어요!</div>
													</div>
												</a>
											</div>
											<div class="cmm-tab-panel">
												<a href="javascript:void(0)" role="button" class="slide">
													<div class="travel_info bg_car_banner05">
														<div class="travel_tit">리콜</div>
														<div class="travel_con01">내차에 결함이 있는지 확인</div>
														<div class="travel_con02">제작결함 대상 확인 및 조치 여부를 알 수 있어요!</div>
													</div>
												</a>
											</div>
											<!-- //2022-08-01 a 태그로 변경 -->
										</div>
									</div>
								</div>
							</div>
						</div>						
					</template>
				</div>	
			</template>
			<!-- 신차구매/중고차매매 화면 E -->
			<!-- 자동차관리 화면 S -->
			<template v-else>
				<div class="com_inner">
					<!-- 자동차 점검 -->
					<div class="car_inner">
						<!-- 정비정보 (ancList.mtncHdngList) -->
						<!-- 타이어(06)일 경우에는 ANCA4202 타이어 Tab, 종합 Tab 호출 -->
						<div class="com_box_type01 com_box_list01">
							<div class="list_type_box">
								<a href="javascript:void(0);" role="button" @click.prevent="fn_goCarMgmtPage('ANCA4202', 'COM')">
									<div class="new_tit_area">
										<div class="tit"><span>자동차 점검</span></div>
									</div>
								</a>
								<!-- 데이터 있을때 -->
								<template v-if="gridList.length > 0">
									<div class="list_type_01">
										<template v-for="(gridInfo, index) in gridList">
											<a href="javascript:void(0)" role="button" class="cal_pop_info_wrap custom_icon" :key="'key1_' + index" @click.prevent="gridInfo.carMtncHdngC == '06' ? fn_goCarMgmtPage('ANCA4202', 'TRE') :  fn_goCarMgmtPage('ANCA4202', 'COM')">
												<div class="car_pop_bar_area">
													<div class="com_box_type01 goal_warp no-stroke no-shadow">
														<i class="icons" :class="fn_getclass(gridInfo.carMtncHdngC)"></i>
														<div class="goal_box">
															<div class="progressBar_wrapper">
																<div class="top">			
																	<div class="st com_black bold">{{gridInfo.comnCExpl}}</div>
																</div>
																<div class="progressBar">
																	<!--<div class="bar PBColor2" style="width:80%"></div>--><!-- PBColor2 에어컨 필터 / PBColor3 에어크리너 / PBColor4 브레이크오일 / PBColor5 배터리 / PBColor6 타이어 -->
																	<div :class="fn_setClass(gridInfo.carMtncHdngC)" :style="'width:' + (100 - Math.round((gridInfo.rmOdmtrDist / gridInfo.odmtrDistEstVal) * 100, 1)) + '%'"></div>
																</div>
																<div class="date">
																	<div class="st">교체까지</div>
																	<div class="ed"> {{gridInfo.rmOdmtrDist | numberFilter}}km 남음</div>
																</div>
															</div>
														</div>
													</div>	
												</div>
											</a>
										</template>
									</div>
								</template>
								<template v-else>
									<div class="car_detail">
										<div class="car_detail_info">
											<div class="item no_data">
												<strong class="tit">이달의 점검 항목이 없습니다.<br/>다가오는 일정을 확인해 보세요!</strong>
											</div>
										</div>
									</div>
								</template>
							</div>
						</div>
					</div>

					<!-- 자동차 관리 -->
					<div class="car_inner margin_s">
						<div class="com_box_type01 text_pd_box">
							<span class="com_cont_tit01"><!--220825 마크업 수정-->
								<strong>튼튼한 자동차 관리를</strong> 위한<br/><strong>11가지 점검</strong>을 시작해보세요!<!-- 2022-08-31 br 추가 -->
							</span>
							<div class="check_icon_list">
								<a href="javascript:void(0)" role="button" class="icon01" @click.prevent="fn_goCarMgmtPage('ANCA4202', 'ISR')">보험</a>
								<a href="javascript:void(0)" role="button" class="icon02" @click.prevent="fn_goCarMgmtPage('ANCA4202', 'TAX')">세금</a>
								<a href="javascript:void(0)" role="button" class="icon03" @click.prevent="fn_goCarMgmtPage('ANCA4202', 'ISP')">검사</a>
								<a href="javascript:void(0)" role="button" class="icon04" @click.prevent="fn_goCarMgmtPage('ANCA4202', 'RCL')">리콜</a>
							</div>
						</div>
					</div>

					<!-- 차계부가 등록되어 있는 경우 -->
					<template v-if="xpsFgrgYn == '1'">
						<!-- 자동차 유지비 -->
						<!--220826 마크업 전체 수정-->
						<div class="car_inner margin_s">						
							<div class="com_box_type01 com_box_list01"><!--220826 class 수정-->
								<div class="list_type_box">
									<a href="javascript:void(0);" role="button" class="new_tit_area" @click.prevent="fn_goCarXpsPage('ANCA2003')">
										<div class="tit"><span>{{curYm}}월 유지비</span></div>
									</a>
									<!-- 차계부지출유형구분코드 --> 
									<template v-if="carbkXpsTpDscList.length > 0">
										<ul class="list_type_02 not_line">
											<template v-for="(commCodeInfo, codeIdx) in carbkXpsTpDscList">
												<li :key="codeIdx + 'codeKey'">
													<dl>
														<dt>
															<em>{{commCodeInfo.comnCExpl}}</em>
														</dt>
														<dd>
															<span class="com_price">
																<em class="num">
																	<!-- 주유/충전비 -->
																	<template v-if="commCodeInfo.comnCVal == '2'">
																		{{chggAm | numberFilter}}
																	</template>
																	<!-- 차량유지비 -->
																	<template v-else>
																		{{etcSpcfMexp | numberFilter}}
																	</template>
																</em><em class="unit">원</em>
															</span>
														</dd>
													</dl>
												</li>
											</template>
										</ul>
									</template>
								</div>
								<div class="today_price_box oil_slide_info">
									<div class="new_tit_area loan">
										<div class="tit">
											<span>오늘의 평균유가</span><p class="sub_txt">(원/리터당)</p>
											<div class="custom_tooltip">
												<div class="com_tooltip_type02 com_tooltip_type03">
													<a href="javascript:void(0);" class="com_btn_info" role="button" @click.prevent="fn_toolTip()">
														<em class="com_icon_info3"><span class="blind">툴팁열기</span></em>
														<span class="arrow" :style="fn_toolTipShow"></span>
													</a>
												</div>
												<div class="com_ballon_type01 com_ballon_type02" :style="fn_toolTipShow">
													<div>
														오피넷에서 제공하는 서비스로 전국 일일 평균 유가 정보를 볼 수 있습니다.
														<a href="javascript:void(0);" class="com_btn_close" role="button" @click.prevent="fn_toolTip()"><span class="blind">툴팁닫기</span></a>
													</div> <!-- 말풍선영역 -->
												</div>
											</div>
										</div>
									</div>
									<!-- 등락률 %에서 원단위 계산으로 변경(SQL계산 소수점 절삭) -->
									<div class="vertical_slider" :class="viewSvc == 'CARCARE' ? 'slick_refresh' : ''" id="olprAvgAmt">
										<template v-if="olprInfoList.length > 0 ">
											<div v-for="(olprItem, olprIdx) in olprInfoList" :key="olprIdx + 'olprKey'">
												<span class="icon_mint">{{olprItem.oilNm}}</span>
												<div class="card_ty_price" role="text">
													<span class="zero" v-if="olprItem.bdCmprOlprRnf === 0">
														<span class="blind">유지</span><!-- 22-10-20 접근성 추가-->
														<em></em>
													</span>
													<span class="raise" v-else-if="olprItem.bdCmprOlprRnf > 0">
														<span class="blind">상승</span><!-- 22-10-20 접근성 추가-->
														<em>{{Math.abs(olprItem.bdCmprOlprRnf) | numberFilter}}</em>
													</span>
													<span class="decrease" v-else>
														<span class="blind">하락</span><!-- 22-10-20 접근성 추가-->
														<em>{{Math.abs(olprItem.bdCmprOlprRnf) | numberFilter}}</em>
													</span>
													<em class="num">{{olprItem.avgOlprAm | numberFilter}}</em>
													<span class="won">원</span>
												</div>
											</div>
										</template>
									</div>
								</div>								
							</div>
						</div>
					</template>
					<!-- 등록되어 있지 않은 최초 이용자는 기존 AS-IS대로 배너처리 --> 
					<template v-else>
						<a href="javascript:void(0);" @click.prevent="fn_goCarXpsPage('ANCA2003')" >
							<div class="com_box_type03 bg13 mt15">
								<div class="text">
									내 차에 딱 맞는 스마트한 서비스<br><span class="color">차계부에서 편리하게 이용하자!</span>
								</div>
							</div>
						</a>
						<div class="car_inner margin_s">
							<div class="oil_slide_info com_box_type01"><!-- 2022-09-14 class com_box_type01 추가 -->
								<div class="new_tit_area loan">
									<div class="tit">
										<span>오늘의 평균유가</span><p class="sub_txt">(원/리터당)</p>
										<div class="custom_tooltip">
											<div class="com_tooltip_type02 com_tooltip_type03">
												<a href="javascript:void(0);" class="com_btn_info" role="button" @click.prevent="fn_toolTip()">
													<em class="com_icon_info3"><span class="blind">툴팁열기</span></em>
													<span class="arrow" :style="fn_toolTipShow"></span>
												</a>
											</div>
											<div class="com_ballon_type01 com_ballon_type02" :style="fn_toolTipShow">
												<div>
													오피넷에서 제공하는 서비스로 전국 일일 평균 유가 정보를 볼 수 있습니다.
													<a href="javascript:void(0);" class="com_btn_close" role="button" @click.prevent="fn_toolTip()"><span class="blind">툴팁닫기</span></a>
												</div> 
											</div>
										</div>
									</div>
								</div>
								<!-- 등락률 %에서 원단위 계산으로 변경(SQL계산 소수점 절삭) -->
								<div class="vertical_slider" :class="viewSvc == 'CARCARE' ? 'slick_refresh' : ''">
									<template v-if="olprInfoList.length > 0 ">
										<div v-for="(olprItem, olprIdx) in olprInfoList" :key="olprIdx + 'olprKey'">
											<span class="icon_mint">{{olprItem.oilNm}}</span>
											<div class="card_ty_price" role="text">
												<span class="zero" v-if="olprItem.bdCmprOlprRnf === 0">
													<span class="blind">유지</span><!-- 22-10-20 접근성 추가-->
													<em></em>
												</span>
												<span class="raise" v-else-if="olprItem.bdCmprOlprRnf > 0">
													<span class="blind">상승</span><!-- 22-10-20 접근성 추가-->
													<em>{{Math.abs(olprItem.bdCmprOlprRnf) | numberFilter}}</em>
												</span>
												<span class="decrease" v-else>
													<span class="blind">하락</span><!-- 22-10-20 접근성 추가-->
													<em>{{Math.abs(olprItem.bdCmprOlprRnf) | numberFilter}}</em>
												</span>
												<em class="num">{{olprItem.avgOlprAm | numberFilter}}</em>
												<span class="won">원</span>
											</div>
										</div>
									</template>
								</div>
							</div>
						</div>						
					</template>

					<!-- //2022-08-11 마크업 class vertical_slider 추가 -->
					<!-- 오늘의 내 차 시세 -->
					<div class="car_inner margin_s"><!--220826 class 수정 / 태그 div -> a 변경 -->
						<a href="javascript:void(0)" role="button" class="com_box_type01 my_car_price" @click.prevent="fn_goCarDetailPage2()">
							<strong class="com_cont_tit01" v-html="fn_numberFormatKorAmt(odmtrDistMprAm, 'PRICE2')"></strong>
							<p class="txt" v-html="fn_numberFormatKorAmt(diffOdmtrYr1AfFctMprAm, 'PRICE3')"></p><!-- 2022-08-29 문구 변경 -->						
							<p class="txt_data"><em>{{new Date() | dateFilter('YYYY.MM.DD')}}</em> 기준</p>													
						</a>
					</div>
					<!-- 최고의 마이카를 찾는다면? -->
					<!-- 2022-09-08 문구수정 -->
					<div class="car_inner margin_m">
						<a href="javascript:void(0);" role="button" class="blue_link ico04" @click.prevent="fn_carViewSvc('CARDEAL')"><!-- 2022-09-15 class ico04 수정 -->
							<strong class="tit">최고의 마이카를 찾는다면?</strong>
							<p>높은 가격 시세로 내차 팔고,
								올해의 신차 모델 추천도 받아보세요!
							</p>
						</a>
					</div>
					<!-- //2022-09-08 문구수정 -->
				</div>
			</template>
			<!-- 자동차관리 화면 E -->
		</div>
		<!--// content E -->

		<footersV2 type="" />
	</page>
</template>

<script>
import apiService    from '@/service/apiService'
import appService    from '@/service/appService'
import Page          from '@/views/layout/Page.vue'
import FootersV2       from '@/views/layout/FootersV2.vue'
import commonMixin   from '@/common/mixins/commonMixin'
import AnCategoryV2  from '@/components/category/AnCategoryV2.vue'
import modalService  from '@/service/modalService'
import commonService from '@/service/commonService'
import {dateFormat}  from '@/utils/date'
import {monthAdd} from '@/utils/date'
import {fncSlick_carMain}    from '@/utils/slick'
import {fncSlick_myCarAll}    from '@/utils/slick'
import {fncSlick_oplrInfo}    from '@/utils/slick'
import {numberFormat} from '@/utils/number'
//import _ from 'lodash'

// 유지
import PDCA1102 from '@/views/page/PD/CA/PDCA1102/PDCA1102' // 자동차정보상세

// 신규
import ANCA4202 from '@/views/page/AN/CA/ANCA4202/ANCA4202' // 자동차점검
import ANCA2002 from '@/views/page/AN/CA/ANCA2002/ANCA2002' // 신차검색
import ANCA2204 from '@/views/page/AN/CA/ANCA2204/ANCA2204'	// 신차 상세정보
import ANCA2001 from '@/views/page/AN/CA/ANCA2001/ANCA2001' // 중고차검색
import ANCA2003 from '@/views/page/AN/CA/ANCA2003/ANCA2003' // 차계부지출내역

import PDMY4005 from '@/views/page/PD/MY/PDMY4005/PDMY4005' // 나의목표등록화면  
import COCA2101 from '@/views/page/CO/CA/COCA2101/COCA2101' // 자산등록(자동차)

export default {
    name : "ANCA4201",
    data: () => {
		return {
			// input
			mydtCusno          : "",		// 마이데이터고객번호
			paramVhcnoVal      : "",		// ASCA2201에서 넘어온 차량번호   			

			// output(보유자동차정보)
			carTtcn            : 0,			// 자동차총건수
			carList            : [],		// 자동차목록
			
			vhcnoVal           : "",		// 차량번호값			(내차정보)
			carModlnm          : "",		// 자동차모델명			(내차정보)
			carBrannm          : "",		// 자동차브랜드명		(내차정보)
			carGrdnm           : "",		// 자동차등급명			(내차정보)
			cartpRepImgUrlnm   : "",		// 차종대표이미지URL명	(내차정보)
			carCrtpnm		   : "",		// 자동차차종명
			carFuelCntn		   : "",		// 자동차연료내용
			carGrdNo		   : "",		// 자동차등급번호
			carMdyrYy		   : "",		// 자동차연식년도
			fsrgDt		 	   : "",		// 최초등록일자
			comnCExpl		   : "",		// 공통코드설명(주행거리구분코드명)
			grdNcarPr		   : "",		// 등급신차가격
			odmtrDist		   : "",		// 주행거리
			odmtrDistDsc	   : "",		// 주행거리구분코드
			odmtrDistMprAm	   : 0,			// 주행거리시세금액			(내차시세)
			odmtrYr1AfFctMprAm : 0,			// 주행1년후예측시세금액	(내차시세)
			odmtrYr2AfFctMprAm : 0,			// 주행2년후예측시세금액	(내차시세)
			odmtrYr3AfFctMprAm : 0,			// 주행3년후예측시세금액	(내차시세)
			diffOdmtrYr1AfFctMprAm : 0,		// 주행1년후예측시세차이	(내차시세)

			// output(자동차관리정보)
			mtncTtcn           : 0,			// 정비총건수
			mtncHdngList       : [],		// 정비정보
			xpsFgrgYn          : "",		// 차계부등록여부
			etcSpcfMexp		   : 0, 		// 기타사양관리비(차량유지비)
			chggAm			   : 0,			// 충전금액(주유충전비)
			xpsTtAm            : 0,			// 유지보수금액(차량유지비+주유충전비)
			olprInfoList       : [],        // 오피넷유가정보

			// output(카동정보)
			reqData           : [],			// 조회된 데이터
			newCarCnt         : 0,          // 신차TOP10건수
			newCarTopList	  : [],         // 신차TOP10목록(국산TOP5, 수입TOP5)
			usedCarCnt        : 0,          // 중고차TOP10건수
			usedCarTopList    : [],			// 중고차TOP10목록
			addUsedCarList    : [],			// 중고차 조회목록 누적			
			lsPageYn          : "",			// 다음페이지존재여부 '1':존재 , '0':미존재	

			// etc
			pdcaUserAgent      : "",		// 실행플랫폼 (ios, android, else)
			curYm              : "",		// 현재(월)
			prevYm             : "",        // 현재년월(-1)
			curIdx             : 0,			// 현재 index(slick slide)
			basYm			   : "",        // 기준년월 
			isTooltip          : false,		// 유가정보toolTip 
			carbkXpsTpDscList  : [],		// 차계부지출유형구분코드 
			gridList           : [],        // 정비항목목록
			viewSvc            : "",			// 화면SVC구분(자동차관리:CARCARE, 신차중고차:CARDEAL)
        }
	},
	created() {
		this.viewSvc           =  "CARDEAL" // 신차중고차
		this.carbkXpsTpDscList = this.getCodeList("CARBK_XPS_TP_DSC")  	// 차계부지출유형구분코드
	},
	
    computed : {
        fn_toolTipShow() {
            return this.isTooltip ? {"display":"block"} : {"display":"none"}
        },
    },
    methods: {
		initComponent() {

			// 자산-자동차에서 넘어온경우(ASCA2201)
			// 넘어온 자동차정보로 자동차상세정보 표기
			this.paramVhcnoVal = this.routeParams.vhcnoVal || ''
			this.viewSvc       = this.routeParams.viewSvc  || 'CARDEAL'

			this.curYm  = dateFormat(new Date(), 'M')
			this.basYm  = dateFormat(new Date(), 'YYYYMM') // 기준년월
			this.prevYm = monthAdd(-1, this.basYm, "YYYYMM")

			// 실행플랫폼
			// chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
			if(this.getUserInfo('chnl') === '385') {
				this.pdcaUserAgent = appService.getUserAgent()
			} else if(this.getUserInfo('chnl') === '386') {
				// 기기로 접속하였을 경우는 true
				if((window.$SMNATIVE.getOS('A') == true && window.$SMNATIVE.getOS('I') == false) || (window.$SMNATIVE.getOS('A') == false && window.$SMNATIVE.getOS('I') == true)) {
					this.pdcaUserAgent = 'cok'
				} else {
					this.pdcaUserAgent = 'else'
				}
			}
            // this.pdcaUserAgent = 'cok'
			this.mydtCusno = this.getUserInfo('mydtCusno')

			// 보유자동차 정보조회
			this.getData()
		},

		// 보유자동차 정보조회
		getData() {
			console.log("NH콕마이카 자동차관리 New Main Call !!")
			console.log("paramVhcnoVal : ", this.paramVhcnoVal)
			this.carTtcn   = 0	// 자동차 총 건수
			this.carList   = []	// 자동차 목록

			const config = {
				url: '/an/ca/01ra1',
				data: {"mydtCusno": this.mydtCusno // 마이데이터고객번호
					}
			}

			apiService.call(config).then(response => {
				console.log("response >>> : ", response)

				this.carTtcn   = response.carTtcn   || 0  // 자동차총건수
				this.carList   = response.carList   || [] // 자동차목록

				//this.carList = []

				// 로딩완료 후 상세 0번 세팅
				// 자산 > 자동차에서 넘어온경우 넘어온값의 index로 세팅
				if(this.carList.length > 0) {

					if(this.paramVhcnoVal == "") {
						this.curIdx = 0
					} else {
						this.curIdx = this.carList.findIndex(x => x.vhcnoVal === this.paramVhcnoVal)
					}

					this.vhcnoVal           = this.carList[this.curIdx].vhcnoVal.trim()  			// 차량번호값				
					this.carModlnm          = this.carList[this.curIdx].carModlnm          || ""	// 자동차모델명
					this.carBrannm          = this.carList[this.curIdx].carBrannm          || ""	// 자동차브랜드명
					this.carGrdnm           = this.carList[this.curIdx].carGrdnm           || ""	// 자동차등급명
					this.cartpRepImgUrlnm   = this.carList[this.curIdx].cartpRepImgUrlnm   || ""	// 차종대표이미지URL명
					this.carCrtpnm		    = this.carList[this.curIdx].carCrtpnm		   || ""	// 자동차차종명
					this.carFuelCntn	    = this.carList[this.curIdx].carFuelCntn		   || ""	// 자동차연료내용
					this.carGrdNo		    = this.carList[this.curIdx].carGrdNo		   || ""	// 자동차등급번호
					this.carMdyrYy		    = this.carList[this.curIdx].carMdyrYy		   || ""	// 자동차연식년도
					this.fsrgDt			    = this.carList[this.curIdx].fsrgDt		 	   || ""	// 최초등록일자
					this.comnCExpl		    = this.carList[this.curIdx].comnCExpl		   || ""	// 공통코드설명(주행거리구분코드명)
					this.grdNcarPr		    = this.carList[this.curIdx].grdNcarPr		   || 0		// 등급신차가격
					this.odmtrDist		    = this.carList[this.curIdx].odmtrDist		   || ""	// 주행거리
					this.odmtrDistDsc	    = this.carList[this.curIdx].odmtrDistDsc	   || ""	// 주행거리구분코드
					this.odmtrDistMprAm	    = this.carList[this.curIdx].odmtrDistMprAm	   || 0		// 주행거리시세금액			(내차시세)
					this.odmtrYr1AfFctMprAm	= this.carList[this.curIdx].odmtrYr1AfFctMprAm || 0		// 주행1년후예측시세금액	(내차시세)
					this.odmtrYr2AfFctMprAm	= this.carList[this.curIdx].odmtrYr2AfFctMprAm || 0		// 주행2년후예측시세금액	(내차시세)
					this.odmtrYr3AfFctMprAm	= this.carList[this.curIdx].odmtrYr3AfFctMprAm || 0		// 주행3년후예측시세금액	(내차시세)
					
					// 1년 후 하락예상금액(= 주행거리시세금액 - 주행1년후예측시세금액)
					this.diffOdmtrYr1AfFctMprAm = Number(this.odmtrDistMprAm) - Number(this.odmtrYr1AfFctMprAm)
				}

				// slick 호출
				this.$nextTick(() => {
//					fncSlick_carMain(300, false, this.slickCallBack, this.curIdx, this.fn_goCarDetailPage)
					fncSlick_carMain(300, false, this.slickCallBack, this.curIdx, '')
				})				
				
				// 신차중고차, 자동차관리 조회(default:신차중고차)
				this.fn_carViewSvc(this.viewSvc)
			})
		},

		// 화면SVC구분에 따른 조회
		fn_getDataViewCall(){
			console.log("fn_getDataViewCall !!!")
			console.log("Svc 호출구분 : ", this.viewSvc)
			this.$refs.viewTop.scrollTop = 0

			// 신차, 중고차
			if(this.viewSvc === "CARDEAL"){
				console.log("인기차종TOP10(신차)조회 CALL!!")

				// 신차TOP10 조회
				const config = {
					url: '/an/ca/01ra3',
					data: {"mydtCusno": this.mydtCusno, // 마이데이터고객번호
						"carPplrtCndDsc" : "03"	        // 자동차인기조건구분코드(03.신차)					
						}
				}

				apiService.call(config).then(response => {
					console.log("인기차종TOP10(신차)조회 response >>> : ", response)
					
					this.newCarCnt      = response.newCarCnt     || 0		// 신차건수
					this.reqData        = response.newCarTopList || [] 		// 인기차종리스트
                    
                    // this.reqData.map((obj)=>{
                    //     if(obj.uscarImgPathnm.indexOf('http') >= 0 && obj.uscarImgPathnm.indexOf('https') == -1){
                    //         obj.uscarImgPathnm = obj.uscarImgPathnm.replace('http', 'https')
                    //     }
                    //     return obj
                    // })

					if(this.reqData.length > 0){
						this.newCarTopList  = this.reqData.filter(item => item.carPplrtCndDsc === "03")		// 인기차종리스트(신차(03))
						//this.usedCarTopList = this.reqData.filter(item => item.carPplrtCndDsc === "02")		// 인기차종리스트(중고차(02))

						console.log('신차목록 : ', this.newCarTopList)
						//console.log('중고차목록 : ', this.usedCarTopList)
					}

					// slick Call
					this.fn_slickCall()
				})

				// 떳다!중고차조회
				const config2 = {
					url: '/an/ca/06ra1',
					data: {"mydtCusno" : this.mydtCusno,	// 마이데이터고객번호
							"wrsDsc" : "2",					// 인증중고(1), 최신중고(2)
							"pageNum"  : 1					// 페이지번호
						}
				}

				apiService.call(config2).then(response => {
					console.log("떳다중고차조회 response >>> : ", response)
					
					this.usedCarCnt     = response.usedCarCnt  || 0		// 중고차 목록건수
					this.usedCarTopList = response.usedCarList || []	// 중고차목록
					this.lsPageYn       = response.lsPageYn    || ""	// 다음페이지 존재여부 (1:존재, 0:미존재)
					
					let tmpCarList = response.usedCarList || []
                    
                    // tmpCarList.map((obj)=>{
                    //     if(obj.uscarImgPathnm.indexOf('http') >= 0 && obj.uscarImgPathnm.indexOf('https') == -1){
                    //         obj.uscarImgPathnm = obj.uscarImgPathnm.replace('http', 'https')
                    //     }
                    //     return obj
                    // })

					if(this.addUsedCarList.length > 0) {
						for(let i=0; i< tmpCarList.length; i++) {
							this.addUsedCarList.push(tmpCarList[i])
						}
					} else {
						this.addUsedCarList = tmpCarList
					}
                    
				})



			}else{
				// 자동차관리정보 조회(자동차점검, 유지비, 오피넷유가정보)
				if(this.carList.length > 0) {
					const config = {
						url: '/an/ca/01ra2',
						data: {"mydtCusno": this.mydtCusno, // 마이데이터고객번호
								"vhcnoVal" : this.vhcnoVal	// 차량번호값
							}
					}

					console.log('자동차관리정보조회 : ', config );

					apiService.call(config).then(response => {
						console.log("자동차관리정보 >>> : ", response)

						// 초기화
						this.mtncHdngList = []
						this.gridList     = []
						this.mtncTtcn     = 0
						this.mtncHdngList = response.mtncHdngList || []		// 정비정보

						this.mtncTtcn     = response.mtncTtcn     || 0		// 정비건수
						this.xpsFgrgYn    = response.xpsFgrgYn    || ""		// 차계부등록여부
						this.etcSpcfMexp  = response.etcSpcfMexp  || 0		// 기타사양관리비(차량관리비)
						this.chggAm       = response.chggAm       || 0		// 충전금액(주유충전비)
						this.xpsTtAm      = response.xpsTtAm      || 0 		// 유지보수금액(차량관리비+주유충전비)
						this.olprInfoList = response.olprInfoList || []		// 오피넷 유가정보

						// 마스터_정비항목목록(년월로 groupby)
						if(this.mtncHdngList.length > 0) {
							// 정기점검도래여부가 1인경우
							this.mtncHdngList.filter(o => o.fxtmChkAvtYn === '1').forEach(obj => {
								// 조회된 점검기한일자(chkTerdt)을 YYYYMM형식으로 담음
								let rObj  = obj
								rObj.yymm = dateFormat(obj.chkTerdt, 'YYYYMM')

								// 당월 도래하는 항목만 노출
								if(rObj.yymm === this.basYm){
									this.gridList.push(rObj)
								}							
							})
						}else{
							this.gridList = []
						}

						console.log('gridList : ', this.gridList)
						
						// slick Call
						this.fn_slickCall()
					})
				}
			}		
		},

		// slick Callback
		slickCallBack (e, curIdx) {
			e.stopImmediatePropagation()

			// 내차정보 slide 이벤트 일 때 
			if(e.target.id === "myCarList"){
				this.curIdx = curIdx
				
				// 자동차 상세정보 조회
				this.vhcnoVal           = this.carList[curIdx].vhcnoVal.trim()  	// 차량번호값
				this.paramVhcnoVal      = this.carList[curIdx].vhcnoVal.trim()  	// 차량번호값(재조회시)					
				this.carModlnm          = this.carList[curIdx].carModlnm       		// 자동차모델명
				this.carBrannm          = this.carList[curIdx].carBrannm       		// 자동차브랜드명
				this.carGrdnm           = this.carList[curIdx].carGrdnm        	 	// 자동차등급명
				this.cartpRepImgUrlnm   = this.carList[curIdx].cartpRepImgUrlnm 	// 차종대표이미지URL명
				this.carCrtpnm		    = this.carList[curIdx].carCrtpnm		   	// 자동차차종명
				this.carFuelCntn	    = this.carList[curIdx].carFuelCntn		   	// 자동차연료내용
				this.carGrdNo		    = this.carList[curIdx].carGrdNo		   		// 자동차등급번호
				this.carMdyrYy		    = this.carList[curIdx].carMdyrYy		   	// 자동차연식년도
				this.fsrgDt			    = this.carList[curIdx].fsrgDt		 	   	// 최초등록일자
				this.comnCExpl		    = this.carList[curIdx].comnCExpl		   	// 공통코드설명(주행거리구분코드명)
				this.grdNcarPr		    = this.carList[curIdx].grdNcarPr		   	// 등급신차가격
				this.odmtrDist		    = this.carList[curIdx].odmtrDist		   	// 주행거리
				this.odmtrDistDsc	    = this.carList[curIdx].odmtrDistDsc	   		// 주행거리구분코드
				this.odmtrDistMprAm	    = this.carList[curIdx].odmtrDistMprAm	   	// 주행거리시세금액			(내차시세)
				this.odmtrYr1AfFctMprAm	= this.carList[curIdx].odmtrYr1AfFctMprAm 	// 주행1년후예측시세금액	(내차시세)
				this.odmtrYr2AfFctMprAm	= this.carList[curIdx].odmtrYr2AfFctMprAm 	// 주행2년후예측시세금액	(내차시세)
				this.odmtrYr3AfFctMprAm	= this.carList[curIdx].odmtrYr3AfFctMprAm 	// 주행3년후예측시세금액	(내차시세)
				
				// 1년 후 하락예상금액(= 주행거리시세금액 - 주행1년후예측시세금액)
				this.diffOdmtrYr1AfFctMprAm = Number(this.odmtrDistMprAm) - Number(this.odmtrYr1AfFctMprAm)

				// eventType이 afterChange이고, 화면SVC구분이 자동차관리(CARCARE)일때
				if(e.type === 'afterChange' && this.viewSvc === 'CARCARE'){
					// 자동차관리 조회
					this.fn_getDataViewCall('CARCARE')			
				}
			}
		},

		fn_slickCall() {
			// slick 호출
			this.$nextTick(() => {
				console.log("this.viewSvc:"+this.viewSvc);
				if(this.viewSvc === "CARDEAL") {
					// 마이카 올인원케어 배너
					fncSlick_myCarAll(500, false)
				} else {
					// 오피넷 유가정보
					fncSlick_oplrInfo(300, false)
				}
			})
		},

		fn_goCarDetailPg() {
			//e.stopImmediatePropagation()

			let compName = PDCA1102
			let param    = { vhcnoVal : this.vhcnoVal }

			const config = {
				component: compName,
				params : param
			}
			modalService.openPopup(config).then(() => {})
		},

		// 자동차상세 페이지로 이동
		fn_goCarDetailPage(e) {
			e.stopImmediatePropagation()

			// 내차정보일 때만 상세페이지로 이동
			if(e.currentTarget.id === "myCarList"){
				let compName = PDCA1102
				let param    = { vhcnoVal : this.vhcnoVal }

				const config = {
					component: compName,
					params : param
				}
				modalService.openPopup(config).then(() => {})
			}
		},

		// 시세조회 클릭 시 페이지로 이동
		fn_goCarDetailPage2(){
			let compName = PDCA1102
			let param    = { vhcnoVal : this.vhcnoVal }

			const config = {
				component: compName,
				params : param
			}
			modalService.openPopup(config).then(() => {})
		},

		// 신차 상세페이지로 이동(임시)
		fn_goNewCarDetailPage(carCtrimNo) {
			
			if(this.carCtrimNo != carCtrimNo){
				this.carCtrimNo = carCtrimNo
			}

			console.log('상세페이지로 이동!!')

			let compName = ANCA2204
			let param    = {carCtrimNo : this.carCtrimNo}

			const config = {
				component: compName,
				params : param
			}

			modalService.openPopup(config).then(() => {
				
			})
		},	
		// 이미지 설명
		setAlt(carBrannm, carModlnm, carGrdnm) {
			return carBrannm + " " + carModlnm + " " + carGrdnm
		},

		// 자동차관리View변경
		fn_carViewSvc(viewGbn){
			// 자동차관리 : CARCARE, 신차중고차 : CARDEAL
			if(this.viewSvc != viewGbn){
				this.viewSvc = viewGbn
			}

			// 화면구분값 변경에 따른 기존 slick 제거
			if(this.viewSvc === "CARDEAL"){																		// 신차중고차(CARDEAL)
				console.log('unslick1')							
				$('.vertical_slider').filter('.slick-initialized').slick('unslick')								// 오늘의 평균유가			
			}else{																								// 자동차관리(CARCARE)
				console.log('unslick2')
				$('.travel_wrap:not(".vertical") .tab_cont2').filter('.slick-initialized').slick('unslick')		// 마이카올인원케어
			}

			// 신차중고차, 자동차관리 조회 CALL
			this.fn_getDataViewCall()
		},

		fn_numberFormatKorAmt(number, strGbn) {
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

			let strIdx = 0  // 최초시작지점에 '원' 추가하기위함

			for(let j = 0; j < resultArray.length; j++){
				if(!resultArray[j])  {
					strIdx++
					continue
				}

				// strGbn 따른 resultString분기처리
				switch(strGbn) {
					case "PRICE1" :	// 가격
						// 1만원 미만 절삭처리
						if(strIdx > 0){
							if(j === strIdx) {
								resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '원</em>' + resultString
							} else {
								resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '</em>' + resultString
							}							
						}else{
							resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '원</em>'
						}
						break
					case "PRICE2" :	// 내차 시세
						if(j === strIdx) {
							resultString = '<span>오늘의 내 차 시세는</span> <br/><em>'+String(numberFormat(resultArray[j])) +'</em> '+ unit[j] + '원 이에요!' + resultString
						} else {
							resultString = '<span>오늘의 내 차 시세는</span> <br/><em>'+String(numberFormat(resultArray[j])) +'</em> '+ unit[j] + ' 이에요!' + resultString
						}
						break
					case "PRICE3" :			// 하락예상금액
						if(j === strIdx) {
							resultString = '내년 시세는 <em>'+String(numberFormat(resultArray[j])) +' '+ unit[j] + '원</em> 하락해요.' + resultString
						} else {
							resultString = '내년 시세는 <em>'+String(numberFormat(resultArray[j])) +' '+ unit[j] + '</em> 하락해요.' + resultString
						}
						break																		
					default :
						break
				}
			}
			return resultString
		},

		// toolTip Open & Close
		fn_toolTip(){
			this.isTooltip = !this.isTooltip
		},

		// progressBar css변경
		fn_setClass(carMtncHdngC) {
			return carMtncHdngC != '01' ? 'bar PBColor' + String(Number(carMtncHdngC)) : 'bar' 
		},

		// 외부브라우저 오픈함수
        fn_openBrowser(openGbn, cnctLkNm) {
			// openGbn 정의
			// CARSELL:내차팔기, CERTUSEDCAR:인증중고차, USEDCAR:중고차, LOAN:대출상품, NEWCAR:신차, AGRIIS:아그리즈쇼핑몰   

			console.log("openGbn : ", openGbn)
            console.log("오픈브라우저Call!!")

			let url = ""

			// openGbn에 따른 URL분기처리
            switch(openGbn) {
                case "CARSELL" :		// 내차 판매하기(내차팔기)
					url = "https://nhcok.carnoon.co.kr/mycarsell"
                    break
                case "CERTUSEDCAR" :	// 인증중고차 구매(인증중고차)
					url = "https://nhcok.carnoon.co.kr/usedcar/list"
					break
                //case "LOAN" :			// 우대 금리 대출상품
				//	url = "https://smartcenter.nonghyup.com/shbranch/el40000876_r.html"
				//	break
                case "USEDCAR" :		// 중고차(인증중고차)
					url = "https://nhcok.carnoon.co.kr" + cnctLkNm
					//url = "https://nhcok.carnoon.co.kr/usedcar/list"					
					break
				case "NEWCAR" :			// 신차 구매하기(견적내기)  
                	// url = "https://nhcok.carnoon.co.kr/estimate/start"
          //2025.02.03 사업부서 요청 url 수정
					url = "https://nhcok.carnoon.co.kr/home"
					break
                case "AGRIIS" :			// 아그리즈 쇼핑몰
					url = "https://m.agriis.co.kr/m/mall/main_m.php"					
					break																				
                default :
                    break
			}
			
			console.log("url : ", url)

			// 외부 브라우저 링크 오픈			
            // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
            if(this.getUserInfo('chnl') === '385') {
                // 스뱅
                appService.executeBrowser(url)
            } else {
                // 콕뱅
                appService.cokBankOpenPopupWebBrowser(url)
            }
		},	
		
		// 마이농가 > 농기계임대 화면이동(SZFL4101)
		fn_goPage(viewName) {
			const config = {
				name : viewName,
			}
			commonService.movePage(config);
		},

		// 내차등록, 목표등록이동
		fn_goPopPage(viewName) {

			let compName = ""

			if(viewName == 'PDMY4005') {
				compName = PDMY4005
			} else if(viewName == 'COCA2101') {
				compName = COCA2101
			}

			let param = {}
			const config = {
				component: compName,
				params : param
			}
			modalService.openPopup(config).then(response => {

				// 배너이미지를 통하여 목표등록을 하였을 경우
                if(compName == PDMY4005 && response == 'reSelect') {
                    const menu = {
                        name: 'PDMY1101',
                        params : {}
                    }
					commonService.movePage(menu)
				} 
				// 자동차등록 완료시
				else if(compName == COCA2101 && response == true) {
					$('.car_slide').filter('.slick-initialized').slick('unslick')									// 기존slick제거
					$('.travel_wrap:not(".vertical") .tab_cont2').filter('.slick-initialized').slick('unslick')		// 마이카올인원케어
					// 재조회
					this.getData()
				}
			})
		},

		// 차계부 지출내역 호출
		fn_goCarXpsPage(viewName){
			// AS-IS에서는 전체조회하였으나, TO-BE에서는 차량별 조회하기로 변경됨(2.0고도화)

			let compName = ''				// compnentName
			let vhcnoVal = this.vhcnoVal	// 차량번호 값 

			// 차계부 지출내역
			if(viewName == 'ANCA2003') { 
				compName = ANCA2003
			}

			let param = { vhcnoVal      : vhcnoVal		// 차량번호 값
						, inqXpsTpDsc   : '9'			// 조회지출유형구분코드 
						, inqXpsTpDsNm  : '전체'		// 조회지출유형구분명
						}

			const config = {
				component: compName,
				params   : param
			}

			modalService.openPopup(config).then((response) => {
                if(response == 'reload' || response == true) {								// 차계부 닫을 시 재조회
					$('.car_slide').filter('.slick-initialized').slick('unslick')			// 기존slick제거
					$('.vertical_slider').filter('.slick-initialized').slick('unslick')		// 오늘의 평균유가				
					this.getData()
                } 
			})
		},

		// 자동차관리페이지 이동
		fn_goCarMgmtPage(viewName, dtl='') {
			// 각 상세페이지이동
			let compName = ''				// componentNane
			let tapType  = ''				// 자동차점검 內 업무 Tab
			let vhcnoVal = this.vhcnoVal	// 차량번호 값 

			if(viewName == 'ANCA4202') {    // 자동차점검
				compName = ANCA4202
				if(dtl != '' ){
					tapType  = dtl
				}
			}

			let param = {vhcnoVal : vhcnoVal
						,tapType : tapType
						}

			const config = {
				component: compName,
				params   : param
			}
			modalService.openPopup(config).then((response) => {
                if(response == 'reload' || response == true) {								// 자동차점검 닫을 시 재조회
					$('.car_slide').filter('.slick-initialized').slick('unslick')			// 기존slick제거
					$('.vertical_slider').filter('.slick-initialized').slick('unslick')		// 오늘의 평균유가				
					this.getData()
                } 
			})
		},

		// 신차 및 중고차 검색
		fn_cardongSrch(viewName){
			let compName = ''	// componentNane
			let param    = {}

			if(viewName == 'ANCA2002') {        // 신차검색
				compName = ANCA2002
			}

			if(viewName == 'ANCA2001') {        // 중고차검색
				compName = ANCA2001
			}

			const config = {
				component: compName,
				params   : param
			}
			modalService.openPopup(config).then(() => {})
		},
		fn_setImgUrl(imgPathnm){
			// 24.07.05, sungchul, 해당 기관 서버 느려서 도메인 변경
			// 25.03.28, sungchul, 유효한 도메인이며, 이미지는 이 도메인에서 가져온다함
			//return 'http://nhcok.carnoon.co.kr/img/' + imgPathnm
			return 'https://www.carpan.co.kr/img/' + imgPathnm;
		},

		// 신용대출 배너 클릭 시 이동
		fn_loanMove(){
			console.log("내차구입대출상품 배너!!")
			// 신용대출 
			// chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크

			// 스뱅일경우
			if(this.getUserInfo('chnl') === '385') {
				// 스뱅
				let url = 'WEB=Y%26serviceId=BFBCA0020R%26psnFncWrsC=40000876%26naac_dsc=2%26nhType=2'
				appService.moveFinancialProductPage(url)
			} else {
				// 콕뱅
				let url = 'SFBCA0020R^40000876'
				appService.moveFinancialProductPage(url)
			}
		},

		// 정비항목구분코드에 따른 class 변경
		fn_getclass(carMtncHdngC){
			let rtnClassStr = ""
			console.log('carMtncHdngC : ', carMtncHdngC)
			// 정비항목구분코드 따른 URL분기처리
            switch(carMtncHdngC) {
				case "01" :		// [01] 엔진오일/오일필터
					rtnClassStr = "ico07"
                    break
				case "02" :		// [02] 에어컨필터
					rtnClassStr = "ico08"
					break
				case "03" :		// [03] 에어크리너
					rtnClassStr = "ico09"
					break
				case "04" :		// [04] 브레이크오일
					rtnClassStr = "ico10"
					break
                case "05" :		// [05] 배터리
					rtnClassStr = "ico11"
					break
                case "06" :		// [06] 타이어
					rtnClassStr = "ico03"
					break																										
                default :		// 자동차점검
					rtnClassStr = "ico01"
					break
			}
			console.log("rtnClassStr : ", rtnClassStr)
			return rtnClassStr
		},

        emptyImg(e) {
            e.target.src = new URL("@/assets/images/icon/car_new06.png", import.meta.url).href            
        },
    },
    mounted() {
		this.initComponent()
		
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin
    ],
    components: {      
        Page,
        FootersV2,
        AnCategoryV2,
    }
}
</script>
<!-- slick 처음로딩시 이미지 펼처보이는 증상 없애기 -->
<style scoped>
	.car_slide, 
	.travel_wrap:not(.vertical) .tab_cont2, 
	.vertical_slider {
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.1s ease;
		-webkit-transition: opacity 0.1s;
	}
	.car_slide.slick-initialized, 
	.travel_wrap:not(.vertical) .tab_cont2.slick-initialized, 
	.vertical_slider.slick-initialized {
		visibility: visible;
		opacity: 1;
	}
</style>