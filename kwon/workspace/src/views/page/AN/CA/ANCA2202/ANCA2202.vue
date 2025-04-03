<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > NH콕마이카
* @ 페이지설명 : 금융생활 > NH콕마이카 > 자동차점검
* @ 파일명     : src\views\page\AN\CA\ANCA2202\ANCA2202.vue
* @ 작성자     : CS528043
* @ 작성일     : 2022-07-20
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-20              CS528043              최초작성(PDCA1103~9 고도화 변경)
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01">
		<div class="popup_header">
			<h1>자동차 점검</h1>
		</div>
		<div class="popup_content" :class="getNoBtnCss" ref="viewTop"><!-- 하단 버튼 없을때 com_no_bottom -->
			<!-- S :: Lnb Tab  -->
			<div class="lnb pop_tab">
				<ul role="tablist">
					<li :class="[tapType === 'COM' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="tapType === 'COM' ? 'true' : 'false'" v-on:click.prevent="fn_srchCall('COM')">종합</a></li>
					<li :class="[tapType === 'TRE' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="tapType === 'TRE' ? 'true' : 'false'" v-on:click.prevent="fn_srchCall('TRE')">타이어</a></li>
					<li :class="[tapType === 'ISR' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="tapType === 'ISR' ? 'true' : 'false'" v-on:click.prevent="fn_srchCall('ISR')">보험</a></li>
					<li :class="[tapType === 'TAX' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="tapType === 'TAX' ? 'true' : 'false'" v-on:click.prevent="fn_srchCall('TAX')">세금</a></li>
					<li :class="[tapType === 'ISP' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="tapType === 'ISP' ? 'true' : 'false'" v-on:click.prevent="fn_srchCall('ISP')">검사</a></li>
					<li :class="[tapType === 'RCL' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="tapType === 'RCL' ? 'true' : 'false'" v-on:click.prevent="fn_srchCall('RCL')">리콜</a></li>
				</ul>
			</div>
			<!-- E :: Lnb Tab  -->

			<!-- S :: 종합(COM) View -->
			<template v-if="tapType === 'COM'">
				<div class="com_inner com_line_type01 com_top_type02">
					<!-- 2022-09-15 수정 / 22-09-21 마크업수정 -->
					<div class="top_my_data car_data_info">
						<div class="top_my_detail">
							<p class="txt">오늘까지 현 주행거리</p>
							<strong class="txt_number">
								<em>{{lsOdmtrDist | numberFilter}}</em>
								<span>&nbsp;km</span>
							</strong>
							<div class="top_my_time">
								<span class="my_data_time"><span>마지막 업데이트</span><span class="num">{{lsTrDt | dateFilter('YYYY.MM.DD')}}</span></span>
							</div>
						</div>
						<div class="car_number">
							<span class="label_bor"><em>{{vhcnoVal}}</em></span><!-- 2022-09-01 마크업 수정 --> 
						</div>
					</div>
				</div>
				<div class="com_inner">
					<div class="new_tit_area ty2">
						<div class="tit">
							<span>{{curYm | dateFilter('M')}}월의 내차 관리</span>
						</div>
						<span class="fr">
							<button type="button" class="btn_txt_system" v-on:click.prevent="fn_goPDCA1104()">소모품 교체주기설정</button>
						</span>
					</div>
					<!-- 자동차점검 ico01 / 자동차보험 ico02 / 타이어 ico03 / 자동차세 ico04 / 자동차검사 ico05 / 리콜 ico06 / 엔진오일 ico07 / 에어컨 필터 ico08 / 에어크리너 ico09 / 브레이크오일 ico10 / 배터리 ico11 -->
					<div class="car_detail" ref="ancTtcn">
						<!-- 알림항목 존재시 -->
						<template v-if="ancTtcn > 0">
							<!-- 리콜정보(rcalInf) -->
							<template v-if="rcalInf != ''">
								<div class="car_detail_info" ref="rcalInf">
									<!-- 클릭시 항목 삭제 -->
									<a href="javascript:void(0)" role="button" class="item ico06" @click.prevent="fn_alramClose('rcalInf')">
										<strong class="tit">{{rcalInf.carMkenm}}</strong>
										<p><span class="com_point_mint">{{rcalInf.eqimtClfnm}}</span> 리콜대상 차량입니다.</p>
									</a>
									<!-- //클릭시 항목 삭제 -->
									<div class="btn_wrap">
										<a href="javascript:void(0)" role="button" class="btn_icon_arrow" @click.prevent="fn_srchCall('RCL')"><span>리콜 내용 상세보기</span></a>
									</div>									
								</div>
							</template>
							
							<!-- 정비정보(mtncInfList) mtncInfSetList(1개월로 set) -->
							<!-- 타이어(06)일 경우에는 TRE, 아닐경우는 그대로 -->
							<template v-if="mtncInfSetList.length > 0">
								<template v-for="(mtncInfInfo, index) in mtncInfSetList">
									<div class="car_detail_info" :key="'key2_' + index" :ref="'mtncInf' + index" v-if="mtncInfInfo.fxtmChkAvtYn == '1'">
										<!-- 클릭시 항목 삭제 -->
										<a href="javascript:void(0)" role="button" class="item" :class="fn_getclass(mtncInfInfo.carMtncHdngC)" @click.prevent="fn_alramClose('mtncInf' + index)">
											<strong class="tit">{{mtncInfInfo.comnCExpl}}</strong>
											<p>교체주기가 <span class="com_point_mint">{{mtncInfInfo.rmOdmtrDist | numberFilter}}km</span> 남았습니다.</p>
										</a>
										<!-- //클릭시 항목 삭제 -->
										<template v-if="mtncInfInfo.carMtncHdngC == '06'">
											<div class="btn_wrap">
												<a href="javascript:void(0)" role="button" class="btn_icon_arrow" @click.prevent="fn_srchCall('TRE')"><span>타이어 상세보기</span></a>
											</div>											
										</template>
									</div>										
								</template>
							</template>

							<!-- 검사정보(ispInf) -->
							<template v-if="ispInf != ''">
								<div class="car_detail_info" ref="ispInf">
									<!-- 클릭시 항목 삭제 -->
									<a href="javascript:void(0)" role="button" class="item ico05" @click.prevent="fn_alramClose('ispInf')">
										<strong class="tit">TS한국교통안전공단</strong>
										<template v-if="ispInf.dds > 0">
											<p>자동차 검사일이 <span class="com_point_mint">{{ispInf.dds | numberFilter}}일</span> 지났습니다. 과태료를 확인하세요.</p>
										</template>
										<template v-else-if="ispInf.dds < 0">
											<p>자동차 검사일이 <span class="com_point_mint">{{Math.abs(ispInf.dds) | numberFilter}}일</span> 남았습니다.</p>
										</template>
										<template v-else>
											<p>오늘은 자동차 검사일 입니다.</p>
										</template>
									</a>
									<!-- //클릭시 항목 삭제 -->
									<div class="btn_wrap">
										<a href="javascript:void(0)" role="button" class="btn_icon_arrow" @click.prevent="fn_srchCall('ISP')"><span>자동차검사 상세보기</span></a>
									</div>									
								</div>								
							</template>

							<!-- 세금정보(txInf) -->
							<template v-if="txInf != ''">
								<div class="car_detail_info" ref="txInf">
									<!-- 클릭시 항목 삭제 -->
									<a href="javascript:void(0)" role="button" class="item ico04" @click.prevent="fn_alramClose('txInf')">
										<strong class="tit">자동차365</strong>
										<p>자동차세 예상 금액은 <span class="com_point_mint">{{txInf.xpcTxa | numberFilter}}원</span> 입니다.</p>
									</a>
									<!-- //클릭시 항목 삭제 -->
									<div class="btn_wrap">
										<a href="javascript:void(0)" role="button" class="btn_icon_arrow" @click.prevent="fn_srchCall('TAX')"><span>자동차세 상세보기</span></a>
									</div>										
								</div>
							</template>

							<!-- 보험정보(insuInf) -->
							<template v-if="insuInf != ''">
								<div class="car_detail_info" ref="insuInf" v-if="insuInf.isrHldYn == '1' && insuInf.dueAncYn == '1'">
									<!-- 클릭시 항목 삭제 -->
									<a href="javascript:void(0)" role="button" class="item ico02" @click.prevent="fn_alramClose('insuInf')">
										<strong class="tit">{{insuInf.trOrgnm}}</strong>
										<template v-if="insuInf.dds != 0">
											<p>보험 만기일이 <span class="com_point_mint">{{Math.abs(insuInf.dds) | numberFilter}}일</span> 남았습니다.</p>
										</template>
										<template v-else>
											<p>오늘은 자동차보험 만기일입니다.</p>
										</template>
									</a>
									<div class="btn_wrap">
										<a href="javascript:void(0)" role="button" class="btn_icon_arrow" @click.prevent="fn_srchCall('ISR')"><span>자동차보험 상세보기</span></a>
									</div>									
									<!-- //클릭시 항목 삭제 -->
								</div>
							</template>
						</template>
						<!-- 알림항목 미존재 -->
						<template v-else>
							<div class="car_detail_info">
								<div class="item no_data">
									<strong class="tit">이달의 점검 항목이 없습니다.</strong>
								</div>
							</div>
						</template>						
					</div>

					<!-- 배너영역 -->
					<div class="inner_banner">
						<a href="javascript:void(0);" type="button" title="링크" @click.prevent="fn_openBrowser()">
							<!-- <img :src="require('@/assets/images/new/img_temp_benner03.png')" alt="국민행복장터 농협몰 - 자동차 베스트상품 모음전"> -->
							<!-- 2022-09-28 : 이미지로 교체 -->
							<img src="@/assets/images/banner/img_benner_04.png" alt="국민행복장터 농협몰 자동차 베스트상품 모음전">							
						</a>
					</div>

					<!-- 소모품 영역 -->
					<template v-if="gridList.length > 0">
						<!-- 항목있을때 -->
						<div class="calendar_list_view car_list_view top_bar">
							<!-- 메세지 S -->
							<div>
								<strong class="msg">메세지</strong>
								<div class="view_list_area"></div>
							</div>
							
							<template v-for="(mstgridInfo, idx) in mstgridList" :data="mstgridInfo">
								<span class="year" :key="'span_key1_' + idx">{{mstgridInfo.yymm | dateFilter('YYYY')}}년</span>
								<div :key="'div_key1_' + idx">
									<strong class="day"><em>{{mstgridInfo.yymm | dateFilter('M')}}</em>월</strong>
									<template v-for="(gridInfo, idx2) in gridList" :data="gridInfo">
										<div class="view_list_area" :key="'key2' + idx2" v-if="mstgridInfo.yymm == gridInfo.yymm">
											<div class="cal_pop_info_wrap">
												<div class="car_pop_bar_area">
													<div class="com_box_type01 goal_warp no-stroke no-shadow">
														<div class="goal_box m0">
															<div class="progressBar_wrapper">
																<div class="top">
																	<div class="st com_black bold">{{gridInfo.comnCExpl}}</div>
																</div>
																<div class="progressBar">
																	<div :class="fn_setClass(gridInfo.carMtncHdngC)" :style="'width:' + (100 - Math.round((gridInfo.rmOdmtrDist / gridInfo.odmtrDistEstVal) * 100, 1)) + '%'"></div>
																</div>
																<div class="date">
																	<div class="st point_gray">주기 {{gridInfo.odmtrDistEstVal | numberFilter}}km</div>
																	<span class="bar"></span>
																	<div class="ed point_gray">{{gridInfo.rmOdmtrDist | numberFilter}}km 남음</div>
																</div>															
															</div>
														</div>
													</div>														
												</div>
											</div>											
										</div>
									</template>
								</div>	
							</template>							
							<!-- 20210826 한별 추가 S -->
						</div>
						<!-- //항목있을때 -->					
					</template>

					<template v-else>
						<!-- 항목없을때 -->
						<div class="car_list_view top_bar">
							<div class="txt_alert">
								<strong>내차 소모품 교체주기를 확인해 보세요!</strong>
								<p>현 주행거리와 점검 항목에 교체주기 기준으로  월별 관리해야 할 점검 내용을 미리 알려주는 '자동차 점검' 서비스입니다.</p>
							</div>
						</div>
						<!-- //항목없을때 -->	
					</template>			
				</div>				
			</template>
			<!-- E :: 종합(COM) View -->

			<!-- S :: 타이어(TRE) View -->
			<template v-else-if="tapType === 'TRE'">
				<div class="com_inner com_top_type02 com_line_type01">
					<strong class="com_pop_tit01">내 차의 타이어 사이즈와 다른 경우<br>
						사이즈를 변경 입력하여 관리 해 보세요.</strong>
					<div class="tire_area">
						<div>
							<p><span>단면적</span></p>
							<p><span>편평비</span></p>
							<p><span>인치</span></p>
						</div>
					</div>
				</div>
				<div class="com_inner">
					<strong class="com_box_tit mt30 new_mb15">타이어 최근 교체 내역</strong>
					<div class="com_box_type01" >
						<dl class="txtlist_01">
							<dt>교체일시</dt>
							<dd v-if="chgDt != ''">{{chgDt | dateFilter('YYYY.MM.DD')}}</dd>
							<dd v-else>-</dd>
						</dl>
						<dl class="txtlist_01">
							<dt>주행거리</dt>
							<dd v-if="odmtrDist != ''">{{odmtrDist | numberFilter}}<span class="com_mark">Km</span></dd>
							<dd v-else>-</dd>
						</dl>
					</div>
					<strong class="com_box_tit mt30">타이어 사이즈 수정</strong>
				</div>
					
				<div class="com_inner">
					<strong class="com_txt_sub pt15 pb17">전면</strong>
					<div class="com_input_type01 com_word0">
						<input type="tel" v-model="fwhCrossSection" pattern="[0-9]*" maxlength="3" required :class="fwhCrossSection.length > 0 && foc_fwhCrossSection ? 'focusON focusforce' : ''" @focus="fn_focusOnOff('fwhCrossSection')" @keyup.enter="moveNextTag($event)" title="전면 타이어 단면적 입력">
						<label for="fwhCrossSection">
							<span class="txt_label">단면적</span>
						</label>
							
						<div class="del_txt">
							<a @click.prevent="fn_delStr('fwhCrossSection')" class="com_btn_delete2" href="javascript:void(0);"><span class="blind">삭제</span></a>
						</div>
					</div>

					<div class="com_inputnum2 com_input_etc">
						<div class="com_input_type01 com_word1">
							<input type="tel" v-model="fwhAspectRatio" pattern="[0-9]*" maxlength="2" required :class="fwhAspectRatio.length > 0 && foc_fwhAspectRatio ? 'focusON focusforce' : ''" @focus="fn_focusOnOff('fwhAspectRatio')" @keyup.enter="moveNextTag($event)" title="전면 타이어 편평비 입력">
							<label for="fwhAspectRatio">
								<span class="txt_label">편평비</span>
							</label>
							<div class="del_txt">
								<a @click.prevent="fn_delStr('fwhAspectRatio')" class="com_btn_delete2" href="javascript:void(0);"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">R</span>
							</div>
						</div>
						<div class="com_input_type01 com_word0">
							<input type="tel" v-model="fwhInch" pattern="[0-9]*" maxlength="2" required :class="fwhInch.length > 0 && foc_fwhInch ? 'focusON focusforce' : ''" @focus="fn_focusOnOff('fwhInch')" @keyup.enter="moveNextTag($event)" title="전면 타이어 인치 입력">
							<label for="fwhInch">
								<span class="txt_label">인치</span>
							</label>
							<div class="del_txt">
								<a @click.prevent="fn_delStr('fwhInch')" class="com_btn_delete2" href="javascript:void(0);"><span class="blind">삭제</span></a>
							</div>
						</div>
					</div>
					
					<strong class="com_txt_sub pt15 pb17">후면</strong>
					<div class="com_input_type01 com_word0">
						<input type="tel" v-model="rwhCrossSection" pattern="[0-9]*" maxlength="3" required :class="rwhCrossSection.length > 0 && foc_rwhCrossSection ? 'focusON focusforce' : ''" @focus="fn_focusOnOff('rwhCrossSection')" @keyup.enter="moveNextTag($event)" title="후면 타이어 단면적 입력">
						<label for="rwhCrossSection">
							<span class="txt_label">단면적</span>
						</label>
							
						<div class="del_txt">
							<a @click.prevent="fn_delStr('rwhCrossSection')" class="com_btn_delete2" href="javascript:void(0);"><span class="blind">삭제</span></a>
						</div>
					</div>

					<div class="com_inputnum2 com_input_etc">
						<div class="com_input_type01 com_word1">
							<input type="tel" v-model="rwhAspectRatio" pattern="[0-9]*" maxlength="2" required :class="rwhAspectRatio.length > 0 && foc_rwhAspectRatio ? 'focusON focusforce' : ''" @focus="fn_focusOnOff('rwhAspectRatio')" @keyup.enter="moveNextTag($event)" title="후면 타이어 편평비 입력">
							<label for="rwhAspectRatio">
								<span class="txt_label">편평비</span>
							</label>
							<div class="del_txt">
								<a @click.prevent="fn_delStr('rwhAspectRatio')" class="com_btn_delete2" href="javascript:void(0);"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">R</span>
							</div>
						</div>
						<div class="com_input_type01 com_word0">
							<input type="tel" v-model="rwhInch" pattern="[0-9]*" maxlength="2" required :class="rwhInch.length > 0 && foc_rwhInch ? 'focusON focusforce' : ''" @focus="fn_focusOnOff('rwhInch')" title="후면 타이어 인치 입력">
							<label for="rwhInch">
								<span class="txt_label">인치</span>
							</label>
							<div class="del_txt">
								<a @click.prevent="fn_delStr('rwhInch')" class="com_btn_delete2" href="javascript:void(0);"><span class="blind">삭제</span></a>
							</div>
						</div>
					</div>
				</div>
			</template>
			<!-- E :: 타이어(TRE) View -->

			<!-- S :: 보험(ISR) View -->
			<template v-else-if="tapType === 'ISR'">
				<!-- 보험보유시 -->
				<template v-if="isrHldYn == '1'">
					<div class="popup_content com_bg_type00">
						<div class="com_inner com_top_type02">
							<div class="ddaynum_area">
								<p class="ddaynum" v-if="isrDds < 0">
									<span class="minus">D</span>
									<em class="counter" id="isrDds1" :data-count="isrDds1" v-show="Math.abs(isrDds) >= 1000"></em>
									<em class="counter" id="isrDds2" :data-count="isrDds2" v-show="Math.abs(isrDds) >= 100"></em>
									<em class="counter" id="isrDds3" :data-count="isrDds3" v-show="Math.abs(isrDds) >= 10"></em>
									<em class="counter" id="isrDds4" :data-count="isrDds4" v-show="Math.abs(isrDds) >= 1"></em>
								</p>
								<p class="ddaynum dday" v-else-if="isrDds == 0">
									<span class="minus">D</span>
									<em class="counter">D</em>
									<em class="counter">a</em>
									<em class="counter">y</em>
								</p>
							</div>
							<p class="txt_dday new_mb40" v-if="isrDds == 0">오늘은 자동차보험 만기일입니다.</p>
							<p class="txt_dday new_mb40" v-else>만기일까지 <span class="com_point_blue">{{Math.abs(isrDds) | numberFilter}}</span>일 남았습니다.</p>
							<div class="com_box_type01">
								<dl class="txtlist_01">
									<dt>보험사</dt>
									<dd>{{trOrgnm}}</dd>
								</dl>
								<dl class="txtlist_01">
									<dt>만기일</dt>
									<dd>{{isrEdDt | dateFilter('YYYY.MM.DD')}}</dd>
								</dl>
							</div>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="popup_content">
						<div class="secede_box">
							<p class="txt">보험 등록하시고 만기 알림도<br>받아보세요.</p>
						</div>
					</div>
				</template>				
			</template>
			<!-- E :: 보험(ISR) View -->

			<!-- S :: 세금(TAX) View -->
			<template v-else-if="tapType === 'TAX'">
				<div class="com_inner com_top_type02 com_line_type01">
					<div class="com_txt_tit01 pb18 com_lineheight_25">{{basyy}}년 나의 예상 자동차세는<br>
						<strong class="com_point_darkblue f29">{{xpcTxa | numberFilter}}<span class="f22">원</span></strong> <span class="f22">입니다.</span>
					</div>
					<div class="com_box_type02">
						<p class="com_txtinfo_type01">
							<span>차량년수와 배기량에 따라 계산된 결과로,<br>
							실제 납부할 세금과 차이가 있을 수 있습니다.</span>
						</p>
					</div>
				</div>
				<div class="com_inner">
					<strong class="com_box_tit mt30 new_mb15">자동차세 연납 시 공제율</strong>

					<!-- 1월 -->
					<table class="com_tbl mt20">
						<colgroup>
							<col style="width:45%">
							<col style="*">
						</colgroup>
						<thead>
							<tr>
								<th>1월 연납 시</th>
								<th class="com_right">연세액의 9.15%</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>납부기간</td>
								<td class="com_right">1월16일 ~ 1월31일</td>
							</tr>
							<tr>
								<td>공제금액</td>
								<td class="com_right">
									<em>{{xpcTxa - janPayadTxa | numberFilter}}</em>
									<span>원</span>
								</td>
							</tr>
							<tr>
								<td>공제 후 자동차세</td>
								<td class="com_right">
									<em>{{janPayadTxa | numberFilter}}</em>
									<span>원</span>
								</td>
							</tr>
						</tbody>
					</table>

					<!-- 3월 -->
					<table class="com_tbl mt20">
						<colgroup>
							<col style="width:45%">
							<col style="*">
						</colgroup>
						<thead>
							<tr>
								<th>3월 연납 시</th>
								<th class="com_right">연세액의 7.5%</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>납부기간</td>
								<td class="com_right">3월16일 ~ 3월31일</td>
							</tr>
							<tr>
								<td>공제금액</td>
								<td class="com_right">
									<em>{{xpcTxa - marPayadTxa | numberFilter}}</em>
									<span>원</span>
								</td>
							</tr>
							<tr>
								<td>공제 후 자동차세</td>
								<td class="com_right">
									<em>{{marPayadTxa | numberFilter}}</em>
									<span>원</span>
								</td>
							</tr>
						</tbody>
					</table>

					<!-- 6월 -->
					<table class="com_tbl mt20">
						<colgroup>
							<col style="width:45%">
							<col style="*">
						</colgroup>
						<thead>
							<tr>
								<th>6월 연납 시</th>
								<th class="com_right">연세액의 5%</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>납부기간</td>
								<td class="com_right">6월16일 ~ 6월30일</td>
							</tr>
							<tr>
								<td>공제금액</td>
								<td class="com_right">
									<em>{{xpcTxa - junPayadTxa | numberFilter}}</em>
									<span>원</span>
								</td>
							</tr>
							<tr>
								<td>공제 후 자동차세</td>
								<td class="com_right">
									<em>{{junPayadTxa | numberFilter}}</em>
									<span>원</span>
								</td>
							</tr>
						</tbody>
					</table>

					<!-- 9월 -->
					<table class="com_tbl mt20">
						<colgroup>
							<col style="width:45%">
							<col style="*">
						</colgroup>
						<thead>
							<tr>
								<th>9월 연납 시</th>
								<th class="com_right">연세액의 2.5%</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>납부기간</td>
								<td class="com_right">9월16일 ~ 9월30일</td>
							</tr>
							<tr>
								<td>공제금액</td>
								<td class="com_right">
									<em>{{xpcTxa - sepPayadTxa | numberFilter}}</em>
									<span>원</span>
								</td>
							</tr>
							<tr>
								<td>공제 후 자동차세</td>
								<td class="com_right">
									<em>{{sepPayadTxa | numberFilter}}</em>
									<span>원</span>
								</td>
							</tr>
						</tbody>
					</table>

					<ul class="bl_dot_list one_register_list mt0">
						<li>연납 신청은 위택스 홈페이지 또는 스마트 위택스 앱에서 가능합니다.</li>
						<li>자동차세 매년 6월, 12월에 정기 납부합니다.</li>
						<li>단, 자동차세를 한번에 연납하면 납부 시기에 따라 최대 9.15%의 세금 감면을 받으실 수 있습니다.</li>
					</ul>
				</div>
			</template>
			<!-- E :: 세금(TAX) View -->

			<!-- S :: 검사(ISP) View -->
			<template v-else-if="tapType === 'ISP'">
				<div class="com_inner com_top_type02">
					<!-- 검사일이 남았을 경우, 당일이거나 -->
					<template v-if="chkDds <= 0">
						<div class="ddaynum_area">
							<p class="ddaynum" v-if="chkDds < 0">
								<span class="minus">D</span>
								<em class="counter" id="chkDds1" :data-count="chkDds1" v-show="Math.abs(chkDds) >= 1000"></em>
								<em class="counter" id="chkDds2" :data-count="chkDds2" v-show="Math.abs(chkDds) >= 100"></em>
								<em class="counter" id="chkDds3" :data-count="chkDds3" v-show="Math.abs(chkDds) >= 10"></em>
								<em class="counter" id="chkDds4" :data-count="chkDds4" v-show="Math.abs(chkDds) >= 1"></em>
							</p>
							<p class="ddaynum dday" v-else-if="chkDds == 0">
								<span class="minus">D</span>
								<em class="counter">D</em>
								<em class="counter">a</em>
								<em class="counter">y</em>
							</p>
						</div>
						<p class="txt_dday new_mb40" v-if="chkDds == 0">오늘은 자동차 검사일 입니다.</p>
						<p class="txt_dday new_mb40" v-else>자동차 검사일이 <span class="com_point_blue">{{Math.abs(chkDds) | numberFilter}}</span>일 남았습니다.</p>

						<div class="com_box_type01">
							<dl class="txtlist_01">
								<dt>검사기간</dt>
								<dd>{{ispStDt | dateFilter('YYYY.MM.DD')}}~{{expiDt | dateFilter('YYYY.MM.DD')}}</dd>
							</dl>
						</div>
					</template>
					<template v-else>
						<div class="ddaynum_area">
							<p class="ddaynum">
								<span class="plus">D</span>
								<em class="counter" id="chkDds1" :data-count="chkDds1" v-show="chkDds >= 1000"></em>
								<em class="counter" id="chkDds2" :data-count="chkDds2" v-show="chkDds >= 100"></em>
								<em class="counter" id="chkDds3" :data-count="chkDds3" v-show="chkDds >= 10"></em>
								<em class="counter" id="chkDds4" :data-count="chkDds4" v-show="chkDds >= 1"></em>
							</p>
						</div>
						<p class="txt_dday new_mb40">자동차 검사일이 <span class="com_point_red">{{chkDds | numberFilter}}</span>일 지났습니다.</p>

						<div class="com_box_type01 com_box_list">
							<div class="new_tit_area">
								<div class="tit"><span>{{penaltyAmt | numberFilter}}원의 검사과태료가 예상됩니다.</span></div>
							</div>
							<div class="txtbox_type02">
								자동차 검사과태료는 자동차관리법에 따라
								검사유효기간 만료일로부터 30일 이내 2만원,
								이후 매 3일 초과 시마다 1만원씩 추가 되며
								최대 30만원까지 부과됩니다.
							</div>
						</div>
					</template>
				</div>				
			</template>
			<!-- E :: 검사(ISP) View -->

			<!-- S :: 리콜(RCL) View -->
			<template v-else-if="tapType === 'RCL'">
				<template v-if="recallList.length > 0">
					<div class="com_inner com_line_type01 com_top_type02">
						<strong class="com_pop_tit01 mb10">리콜 사유</strong>
						<button type="button" class="com_btnselect_type02" :class="recallList.length == 1 ? 'one' : '' " @click.prevent="fn_openRecallCodePopup(carRcalId)" title="리콜 사유 선택"><span>{{rcalTinm}}</span></button>
					</div>
					<div class="com_inner">
						<strong class="com_pop_tit01 com_line mt30 pb16">리콜 상세정보</strong>
						<div class="txtlist_box new_mb30">
							<dl class="txtlist_02">
								<dt>제작자명</dt>
								<dd>{{carMkenm}}</dd>
							</dl>
							<dl class="txtlist_02">
								<dt>제품명</dt>
								<dd>{{carPdnmStr}}</dd>
							</dl>
							<dl class="txtlist_02">
								<dt>생산기간</dt>
								<dd>{{pdStDt | dateFilter('YYYY.MM.DD')}} ~ {{pdEdDt | dateFilter('YYYY.MM.DD')}}</dd>
							</dl>
							<dl class="txtlist_02">
								<dt>리콜기간</dt>
								<dd v-if="rcalEdDt == ''">{{rcalStDt | dateFilter('YYYY.MM.DD')}} ~ </dd>
								<dd v-else>{{rcalStDt | dateFilter('YYYY.MM.DD')}} ~ {{rcalEdDt | dateFilter('YYYY.MM.DD')}}</dd>
							</dl>
							<dl class="txtlist_02">
								<dt>기타문의</dt>
								<dd v-if="inqplCntn1 != '' && inqplCntn2 != ''">{{inqplCntn1.trim()}}<br>{{inqplCntn2}}</dd>
								<dd v-else-if="inqplCntn1 == '' && inqplCntn2 != ''">{{inqplCntn2}}</dd>
								<dd v-else>-</dd>
							</dl>
						</div>
						
						<div class="com_box_type01">
							<div class="new_tit_area car">
								<div class="tit"><span>결함내용</span></div>
							</div>
							<div class="txtbox_type02 style01">
								{{carDfctCntn}}
							</div>
						</div>

						<div class="com_box_type01">
							<div class="new_tit_area car">
								<div class="tit"><span>시정방법</span></div>
							</div>
							<div class="txtbox_type02 style01">
								{{rtfMcnt}}
							</div>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="popup_content">
						<div class="secede_box">
							<p class="txt">리콜 대상차량이 아닙니다.</p>
						</div>
					</div>
				</template>
			</template>
			<!-- E :: 리콜(RCL) View -->						
			<template v-else>			
			</template>
		</div>

		<!-- S :: 보험(ISR), 타이어(TRE) Btn -->
		<template v-if="tapType === 'ISR' || tapType === 'TRE'">
			<div class="popup_footer fixed">
				<div class="btn_full_box">
					<!-- 타이어(TRE) Btn -->
					<template v-if="tapType === 'TRE'">
						<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_insert()">저장</a>
					</template>
					<!-- 보험(ISR) Btn -->
					<template v-else>
						<template v-if="isrHldYn == '0'">
							<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_goPage()">자산등록</a>
						</template>						
					</template>					
				</div>
			</div>			
		</template>
		<!-- E :: 보험(ISR), 타이어(TRE) Btn -->
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close('reload')"><span class="blind">팝업닫기</span></a>	
	</div>
</template>

<script>
import apiService              from '@/service/apiService'
import appService 		       from '@/service/appService'
import modalService            from '@/service/modalService'
import commonMixin             from '@/common/mixins/commonMixin'
import popupMixin              from '@/common/mixins/popupMixin'
import {dateFormat, monthDiff} from '@/utils/date'
import {amountCountAnimate}    from '@/utils/jUtils'

import COAR2001                from '@/views/page/CO/AR/COAR2001/COAR2001'  // 자산등록(메인)
import PDCA1104                from '@/views/page/PD/CA/PDCA1104/PDCA1104'	// 부품별 교체 주기 설정
import PDCA1123                from '@/views/page/PD/CA/PDCA1123/PDCA1123'	// 리콜사유

import _ from 'lodash'

export default {
    name : "ANCA2202",
    data: () => {
		return {

		/************************* 공통 Input **************************/			
			tapType         : "",       // ANCA2201(NH콕마이카)에서 넘어온 Tab(조회용)
            mydtCusno       : "",       // 마이데이터고객번호
			vhcnoVal        : "",       // 차량번호값
			curYm           : "",		// 현재(월)			

		/********************** 종합(COM) Output ***********************/
			lsOdmtrDist     : "",		// 자동차 최종주행거리
			lsTrDt          : "",		// 자동차 마지막업데이트일자
			ancTtcn         : "",		// 알림총건수
			ancList         : [],		// 알림목록
		
			// 알림목록
			rcalInf         : {},		// 리콜정보
			mtncInfList     : [],		// 정비정보
			ispInf          : {},		// 검사정보
			txInf           : {}, 		// 세금정보
			insuInf         : {},		// 보험정보
			mtncInfSetList  : [],		// 정비정보Set(1개월)

			// 소모품 교체도래일 조회
            comTtcn         : 0,        // 총건수
			mtncHdngList    : [],       // 정비항목목록
			gridList        : [],       // 정비항목목록
			mstgridList     : [],       // 마스터_정비항목목록(년월로 groupby)			

		/********************** 보험(ISR) Output ***********************/
            isrHldYn        : "",       // 보험보유여부 ==> 정상(유효)보험보험여부 0:미보유 1:보유
            dueAncYn        : "",       // 만기알림여부 ==> 만기까지30일이하여부 0:31일이상 1:30일이하
            infOfrmnOrgC    : "",       // 정보제공자기관코드
            trOrgnm         : "",       // 거래기관명(보험사)
            isrSctsNo       : "",       // 보험증권번호
            isrcoWrsnm      : "",       // 보험사상품명
            isrEdDt         : "",       // 보험종료일자
            isrDds          : 0,        // 일수
            isrDds1         : 0,        // D-Day 표현 첫번째자릿수
            isrDds2         : 0,        // D-Day 표현 두번째자릿수
            isrDds3         : 0,        // D-Day 표현 세번째자릿수
            isrDds4         : 0,        // D-Day 표현 네번째자릿수

		/********************* 타이어(TRE) Output **********************/
            chgDt           : "",       // 변경일자
            odmtrDist       : 0,        // 주행거리
            fwhlTireSzeCntn : "",       // 전륜타이어크기내용
            rwhlTireSzeCntn : "",       // 후륜타이어크기내용
            fwhCrossSection : "",       // 전륜_타이어_단면적
            fwhAspectRatio  : "",       // 전륜_타이어_편평비
            fwhInch         : "",       // 전륜_타이어_인치
            rwhCrossSection : "",       // 후륜_타이어_단면적
            rwhAspectRatio  : "",       // 후륜_타이어_편평비
            rwhInch         : "",       // 후륜_타이어_인치

            // focus관련
            foc_fwhCrossSection : false,
            foc_fwhAspectRatio  : false,
            foc_fwhInch         : false,
            foc_rwhCrossSection : false,
            foc_rwhAspectRatio  : false,
            foc_rwhInch         : false,

		/********************** 세금(TAX) Output ***********************/
            basyy           : "",       // 기준년도
            xpcTxa          : 0,        // 예상세액
            janPayadTxa     : 0,        // 1월선납세액
            marPayadTxa     : 0,        // 3월선납세액
            junPayadTxa     : 0,        // 6월선납세액
            sepPayadTxa     : 0,        // 9월선납세액			
		
		/********************** 검사(ISP) Output ***********************/
            ispStDt			: "",     // 검사시작일자
            expiDt			: "",     // 만료일자
            chkDds			: 0,      // 일수
            chkDds1			: 0,      // D-Day 표현 첫번째자릿수
            chkDds2			: 0,      // D-Day 표현 두번째자릿수
            chkDds3			: 0,      // D-Day 표현 세번째자릿수
            chkDds4			: 0,      // D-Day 표현 네번째자릿수
            penaltyAmt		: 0,      // 예상 검사과태료			

		/********************** 리콜(RCL) Output ***********************/
            ttcn            : 0,      // 총건수
            recallList      : [],     // 리콜목록

            // recallList Info
            carRcalId       : "",     // 자동차리콜ID
            rcalActYn       : "",     // 리콜조치여부
            rcalTinm        : "",     // 리콜제목명
            eqimtClfnm      : "",     // 장치분류명
            carMkenm        : "",     // 자동차제작자명
            carPdnm         : "",     // 자동차제품명
            carPdnmStr      : "",     // 자동차제품명(표현)
            pdStDt          : "",     // 생산시작일자
            pdEdDt          : "",     // 생산종료일자
            rcalStDt        : "",     // 리콜시작일자
            rcalEdDt        : "",     // 리콜종료일자
            carDfctCntn     : "",     // 자동차결함내용
            rtfMcnt         : "",     // 시정방법내용
            inqplCntn       : "",     // 문의처내용
            inqplCntn1      : "",     // 문의처내용 (문의처)
            inqplCntn2      : "",     // 문의처내용 (문의처 전화번호)
        }
	},
    mounted() {

		console.log("dom : !!", this.$el)
			
		this.initComponent(this.params)
		
        //PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)	
    },
    mixins: [
        popupMixin
        ,commonMixin
	],	
    methods: {
        initComponent(params) {

			console.log("화면에서 넘어온 구분값 !! :", params.tapType)
			console.log("화면에서 넘어온 값 !! :", params)

			// 파라미터 설정
            this.mydtCusno = this.getUserInfo('mydtCusno') // 마이데이터 고객번호			
			this.tapType   = params.tapType  || 'COM'	   // LNB 탭 업무 값(없으면 기본 COM:종합)
			this.vhcnoVal  = params.vhcnoVal || ''		   // 차량번호
			this.curYm     = dateFormat(new Date(), 'YYYYMM') // 현재년월

			// 조회함수 CALL
			this.fn_srchCall(this.tapType)
		},
		// 조회분기
		fn_srchCall(srchGbn) {
			if(this.tapType != srchGbn) {
				this.tapType = srchGbn	// 조회구분
			}

			// 화면스크롤 최상단 위치
			this.$refs.viewTop.scrollTop = 0
			
			// Lnb 설정
            this.$nextTick(() => {
				$('.lnb').each(function(){
					let width  = $(this).width()
					let length = $(this).find('li').length
					let index  = $(this).find('.on').index()

					$('.lnb').scrollLeft((width/length) * index)
				})
            })

			// 조회 전 기존 tab Data 초기화
			this.fn_clearData()

			// 업무에 따른 조회분기처리
			if(srchGbn === 'COM'){				// 종합
				this.getDataCom()
			}else if (srchGbn === 'TRE'){		// 타이어
				this.getDataTre()
			}else if (srchGbn === 'ISR'){		// 보험
				this.getDataIsr()
			}else if(srchGbn === 'TAX'){		// 세금
				this.getDataTax()
			}else if(srchGbn === 'ISP'){		// 검사
				this.getDataIsp()
			}else if(srchGbn === 'RCL'){		// 리콜
				this.getDataRcl()
			}else{
				console.log("조회구분이 잘못되었습니다.")
			} 
		},
		/******************* 조회 Call Function S ********************/
		// 종합(COM)
        getDataCom() {
			const config = {
				url : '/an/ca/02ra1',
				data: {"mydtCusno": this.mydtCusno // 마이데이터고객번호
                      ,"vhcnoVal" : this.vhcnoVal  // 차량번호값
					}
            }
            
            apiService.call(config).then(response => {
				console.log("response >>", response)
				
				this.lsOdmtrDist = response.lsOdmtrDist            || 0  // 자동차 최종주행거리
				this.lsTrDt		 = response.lsTrDt                 || '' // 자동차 마지막업데이트일자
				this.ancTtcn	 = response.ancTtcn     		   || 0  // 알림총건수	
				
				// 알림목록
				this.rcalInf	 = response.ancList[0].rcalInf     || '' // 리콜정보
				this.mtncInfList = response.ancList[0].mtncInfList || [] // 정비정보
				this.ispInf      = response.ancList[0].ispInf      || '' // 검사정보
				this.txInf       = response.ancList[0].txInf       || '' // 세금정보
				this.insuInf     = response.ancList[0].insuInf     || '' // 보험정보

				//this.ispInf = {"dds" : 1}
				//this.insuInf = {"isrHldYn" : "1", "dueAncYn" : "1", "trOrgnm" : "한화손해보험", "dds" : -11}

                this.comTtcn      = response.ttcn         || 0
				this.mtncHdngList = response.mtncHdngList || []

				if(this.mtncHdngList.length > 0) {
					for(let i=0; i<this.mtncHdngList.length; i++){

						// 정기점검도래여부가 1인경우, 당월제외
						if(this.mtncHdngList[i].fxtmChkAvtYn == '1' && monthDiff(this.curYm, this.mtncHdngList[i].chkTerdt) < 0) {
							// 조회된 점검기한일자(chkTerdt)을 YYYYMM형식으로 담음
							var inputObj = this.mtncHdngList[i]

							let yymm = dateFormat(this.mtncHdngList[i].chkTerdt, 'YYYYMM');
							inputObj.yymm = yymm

							this.gridList.push(inputObj)
						}
					}

					if(this.gridList.length > 0) {
						this.mstgridList = this.fn_setMstgridList(this.gridList)

						console.log('112222 : ',this.mstgridList)
					}
				}

				// 비교
				console.log('insuInf : ', this.insuInf.length > 0)
				// 2022.09.14 기획 수정 (6개월에서 1개월로 변경) 서비스 복잡으로 화면에서 처리
				
				// 정비정보(1개월 이하), 남은개월수로 판단불가!! 계산이 틀어지므로 some처리
                this.mtncInfList.filter((obj) => this.mtncHdngList.some((cond) => cond.carMtncHdngC === obj.carMtncHdngC && monthDiff(this.curYm, cond.chkTerdt) == 0 )).map((item) => {
					console.log('111111111111')
					this.mtncInfSetList.push({"carMtncHdngC" : item.carMtncHdngC, "comnCExpl" : item.comnCExpl, "fxtmChkAvtYn" : item.fxtmChkAvtYn, "rmMtcn" : item.rmMtcn, "rmOdmtrDist" : item.rmOdmtrDist})			
                })				

				// 보험정보(1개월 이하)
				if(this.insuInf > 0){
					this.insuInf = this.insuInf.filter((obj) => obj.dds <= 31)
				}

				// 검사정보((1개월 이하)
				if(this.ispInf > 0){
					this.ispInf = this.ispInf.filter((obj) => obj.dds <= 31)
				}					
            })
	
			console.log("마이데이터고객번호: "  , this.mydtCusno);
			console.log("차량번호: "           , this.vhcnoVal);
			console.log("최종주행거리: "       , this.lsOdmtrDist);
			console.log("마지막업데이트일자: "  , this.lsTrDt);
			console.log("알람총건수: "         , this.ancTtcn);
			console.log("리콜정보: "           , this.rcalInf);
			console.log("정비정보: "           , this.mtncInfList);
			console.log("검사정보: "           , this.ispInf);
			console.log("세금정보: "           , this.txInf);
			console.log("보험정보: "           , this.insuInf);						

		},		
		// 보험(ISR)
        getDataIsr() {
			const config = {
				url : '/pd/ca/05r01',
				data: {"mydtCusno": this.mydtCusno // 마이데이터고객번호
                      ,"vhcnoVal" : this.vhcnoVal  // 차량번호값
					}
            };
            
            apiService.call(config).then(response => {

                this.isrHldYn     = response.isrHldYn     || ''
                this.dueAncYn     = response.dueAncYn     || ''
                this.infOfrmnOrgC = response.infOfrmnOrgC || ''
                this.trOrgnm      = response.trOrgnm      || ''
                this.isrSctsNo    = response.isrSctsNo    || ''
                this.isrcoWrsnm   = response.isrcoWrsnm   || ''
                this.isrEdDt      = response.isrEdDt      || ''
                this.isrDds       = response.dds          || 0

                if(this.isrHldYn == '1') { // 보험 보유시
                    let absDds = Math.abs(this.isrDds)

                    // D-Day 표현
                    if(this.isrDds >= 1000) {
                        this.isrDds1 = absDds.toString().substr(0, 1)
                        this.isrDds2 = absDds.toString().substr(1, 1)
                        this.isrDds3 = absDds.toString().substr(2, 1)
                        this.isrDds4 = absDds.toString().substr(3, 1)
                    } else if(absDds <= 999 && absDds >= 100) {
                        this.isrDds2 = absDds.toString().substr(0, 1)
                        this.isrDds3 = absDds.toString().substr(1, 1)
                        this.isrDds4 = absDds.toString().substr(2, 1)
                    } else if(absDds <= 99 && absDds >= 10) {
                        this.isrDds3 = absDds.toString().substr(0, 1)
                        this.isrDds4 = absDds.toString().substr(1, 1)
                    } else if(absDds <= 9 && absDds >= 1) {
                        this.isrDds4 = absDds
                    }

                    amountCountAnimate("isrDds1", this.isrDds1)
                    amountCountAnimate("isrDds2", this.isrDds2)
                    amountCountAnimate("isrDds3", this.isrDds3)
                    amountCountAnimate("isrDds4", this.isrDds4)
                }
            });
		},
		// 타이어(TRE)
		getDataTre() {		
			const config = {
				url : '/pd/ca/06r01',
				data: {"mydtCusno": this.mydtCusno // 마이데이터고객번호
                      ,"vhcnoVal" : this.vhcnoVal  // 차량번호값
					}
			};

            apiService.call(config).then(response => {
                this.chgDt           = response.chgDt           || ''
                this.odmtrDist       = response.odmtrDist       || ''
                this.fwhlTireSzeCntn = response.fwhlTireSzeCntn || ''
                this.rwhlTireSzeCntn = response.rwhlTireSzeCntn || ''

                if(this.fwhlTireSzeCntn.length > 0) {
                    let fwhInfo = this.fwhlTireSzeCntn.split("/")
                    this.fwhCrossSection = fwhInfo[0]
                    this.fwhAspectRatio  = fwhInfo[1]
                    this.fwhInch         = fwhInfo[2]
                }
                
                if(this.rwhlTireSzeCntn.length > 0) {
                    let rwhInfo = this.rwhlTireSzeCntn.split("/")
                    this.rwhCrossSection = rwhInfo[0]
                    this.rwhAspectRatio  = rwhInfo[1]
                    this.rwhInch         = rwhInfo[2]
                }
            });
		},
		// 세금(TAX)
        getDataTax() {
			const config = {
				url: '/pd/ca/07r01',
				data: {"mydtCusno":this.mydtCusno // 마이데이터고객번호
                      ,"vhcnoVal": this.vhcnoVal  // 차량번호값
					}
            };
            
            apiService.call(config).then(response => {
                this.basyy       = response.basyy       || dateFormat(new Date(), 'YYYY')
                this.xpcTxa      = response.xpcTxa      || 0
                this.janPayadTxa = response.janPayadTxa || 0
                this.marPayadTxa = response.marPayadTxa || 0
                this.junPayadTxa = response.junPayadTxa || 0
                this.sepPayadTxa = response.sepPayadTxa || 0
            });
		},
		// 검사(ISP)
        getDataIsp() {
			const config = {
				url: '/pd/ca/08r01',
				data: {"mydtCusno": this.mydtCusno // 마이데이터고객번호
                      ,"vhcnoVal" : this.vhcnoVal  // 차량번호값
					}
            };
            
            apiService.call(config).then(response => {
                this.ispStDt = response.ispStDt || ''
                this.expiDt  = response.expiDt  || ''
                this.chkDds  = response.dds     || 0

				console.log("response : ", response)
				
                // D-Day 표현
                if(Math.abs(this.chkDds) >= 1000) {
                    this.chkDds1 = Math.abs(this.chkDds).toString().substr(0, 1)
                    this.chkDds2 = Math.abs(this.chkDds).toString().substr(1, 1)
                    this.chkDds3 = Math.abs(this.chkDds).toString().substr(2, 1)
                    this.chkDds4 = Math.abs(this.chkDds).toString().substr(3, 1)
                } else if(Math.abs(this.chkDds) <= 999 && Math.abs(this.chkDds) >= 100) {
                    this.chkDds2 = Math.abs(this.chkDds).toString().substr(0, 1)
                    this.chkDds3 = Math.abs(this.chkDds).toString().substr(1, 1)
                    this.chkDds4 = Math.abs(this.chkDds).toString().substr(2, 1)
                } else if(Math.abs(this.chkDds) <= 99 && Math.abs(this.chkDds) >= 10) {
                    this.chkDds3 = Math.abs(this.chkDds).toString().substr(0, 1)
                    this.chkDds4 = Math.abs(this.chkDds).toString().substr(1, 1)
                } else if(Math.abs(this.chkDds) <= 9 && Math.abs(this.chkDds) >= 1) {
                    this.chkDds4 = Math.abs(this.chkDds)
                }

                if(this.chkDds != 0) {
                    amountCountAnimate("chkDds1", this.chkDds1)
                    amountCountAnimate("chkDds2", this.chkDds2)
                    amountCountAnimate("chkDds3", this.chkDds3)
                    amountCountAnimate("chkDds4", this.chkDds4)
                }

                // 예상 검사과태료 구하기
                if(this.chkDds > 0) {
                    if(this.chkDds > 30) {
                        let addCnt = Math.floor((this.chkDds - 30) / 3) // 추가비용
                        
                        this.penaltyAmt = 10000 * addCnt
                        this.penaltyAmt = this.penaltyAmt + 20000 // 기본비용(20000)추가

                        // 최대 300000만원
                        if(this.penaltyAmt >= 300000) {
                            this.penaltyAmt = 300000
                        }
                    } else {
                        // 30일이내 기본 20000원
                        this.penaltyAmt = 20000
                    }
                }
            });
		},
		// 리콜(Rcl)
        getDataRcl() {
			const config = {
				url: '/pd/ca/09r01',
				data: {"mydtCusno": this.mydtCusno // 마이데이터고객번호
                      ,"vhcnoVal" : this.vhcnoVal  // 차량번호값
					}
            };
            
            apiService.call(config).then(response => {
                this.ttcn         = response.ttcn       || 0
				let rtnRecallData = response.recallList || []

				// 리콜목록이 존재하는 경우 조치여부가 0인것만 리스트 생성
				if(rtnRecallData.length > 0){
					this.recallList = rtnRecallData.filter(obj => obj.rcalActYn === '0')

					if(this.recallList.length > 0){
						// 리콜상세 세팅
						this.fn_setRecallInfo(0)
					}
				}
				
				console.log('리콜목록 : ', this.ttcn)
				console.log('리콜총건수 : ', this.recallList)
            })
        },		
		/******************* 조회 Call Function E ********************/
		/***************** 종합(COM) Function S ******************/
		fn_alramClose(ref='') {		
			console.log("알람끄기!!")

			// 클릭시 알림감춤
			if(ref != '') {
				if(this.$refs[ref].length > 0) {
					this.$refs[ref][0].style.display = 'none'
				} else {
					this.$refs[ref].style.display = 'none'
				}
			}
			
			// 알람 count 확인
			let tmpRefs = this.$refs.ancTtcn.children
			let noCount = Array.from(tmpRefs)
								.filter(item => item.style.display !== 'none')
								.length
			
			// 알람이 모두 닫히면 알람총개수 초기화
			if(noCount == 0){
				this.ancTtcn = 0;	
			}
		},

		// 당월데이터 제외
        fn_setMstgridList(list) {
			console.log("list1 : ", list)
			const result = _.chain(list)
						.groupBy('yymm')
						.keys()
						.map(d => {
							return {
                                yymm : d,
								list : _.filter(list, {yymm: d})
							}
						})
						.orderBy('yymm', 'asc')
						.value()
			return result
		},

		fn_setClass(carMtncHdngC) {

			let css = 'bar'

			if(carMtncHdngC != '01') {
				css += ' PBColor' + String(Number(carMtncHdngC))
			}

			return css
		},

        fn_openBrowser() {
            // 외부 브라우저 링크 오픈 
            let url = "https://www.nonghyupmall.com/BC13010R/exhDaeCtgrList.nh?cateNo=020&chanC=1101&exhCfc=02"

            // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
            if(this.getUserInfo('chnl') === '385') {
                // 스뱅
                appService.executeBrowser(url)
            } else {
                // 콕뱅
                appService.cokBankOpenPopupWebBrowser(url)
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
		/***************** 종합(COM) Function E ******************/
		/***************** 보험(ISR) Function S ******************/
		fn_goPage() {

			let compName = COAR2001

			var param = {}
			const config = {
				component: compName,
				params : param
			}
			modalService.openPopup(config).then(() => {
				
			})
		},
		/***************** 보험(ISR) Function E ******************/
		/**************** 타이어(TRE) Function S *****************/
        fn_insert() {
			const configConfirm = {
				content: ['저장하시겠습니까?'],
				title  : "",
            }

			if(this.fwhCrossSection.length == 0 || this.fwhCrossSection == 0) {
				modalService.alert("전륜 타이어 단면적은 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.fwhAspectRatio.length == 0 || this.fwhAspectRatio == 0) {
				modalService.alert("전륜 타이어 편평비는 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.fwhInch.length == 0 || this.fwhInch == 0) {
				modalService.alert("전륜 타이어 인치는 필수입력항목입니다.").then(() => {});
				return;
            }
            
			if(this.rwhCrossSection.length == 0 || this.rwhCrossSection == 0) {
				modalService.alert("후륜 타이어 단면적은 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.rwhAspectRatio.length == 0 || this.rwhAspectRatio == 0) {
				modalService.alert("후륜 타이어 편평비는 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.rwhInch.length == 0 || this.rwhInch == 0) {
				modalService.alert("후륜 타이어 인치는 필수입력항목입니다.").then(() => {});
				return;
			}
            
			modalService.confirm(configConfirm).then(text => {
				if(text == "예") {

					const config = {
						url: '/pd/ca/06s01',

						data: {"mydtCusno":this.mydtCusno
								,"vhcnoVal": this.vhcnoVal
                                ,"fwhlTireSzeCntn" : this.fwhCrossSection + '/' + this.fwhAspectRatio + "/" + this.fwhInch
                                ,"rwhlTireSzeCntn" : this.rwhCrossSection + '/' + this.rwhAspectRatio + "/" + this.rwhInch
								}
					};
					
					apiService.call(config).then(response => {

						if(response.rspC == '0000'){
							modalService.alert("저장되었습니다.").then(() => {
								// 재조회(타이어)
								this.fn_srchCall('TRE')
								//this.close('reload')
							});
						} else {
							modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {
								//this.close(response);
							})
						}
					});
				}
			})
        },
        // input 클릭 시 focus 관련
        fn_focusOnOff(type) {
            switch(type) {
                case 'fwhCrossSection':
                    this.foc_fwhCrossSection = true
                    this.foc_fwhAspectRatio  = false
                    this.foc_fwhInch         = false
                    this.foc_rwhCrossSection = false
                    this.foc_rwhAspectRatio  = false
                    this.foc_rwhInch         = false
                    break
                case 'fwhAspectRatio':
                    this.foc_fwhCrossSection = false
                    this.foc_fwhAspectRatio  = true
                    this.foc_fwhInch         = false
                    this.foc_rwhCrossSection = false
                    this.foc_rwhAspectRatio  = false
                    this.foc_rwhInch         = false
                    break
                case 'fwhInch':
                    this.foc_fwhCrossSection = false
                    this.foc_fwhAspectRatio  = false
                    this.foc_fwhInch         = true
                    this.foc_rwhCrossSection = false
                    this.foc_rwhAspectRatio  = false
                    this.foc_rwhInch         = false
                    break
                case 'rwhCrossSection':
                    this.foc_fwhCrossSection = false
                    this.foc_fwhAspectRatio  = false
                    this.foc_fwhInch         = false
                    this.foc_rwhCrossSection = true
                    this.foc_rwhAspectRatio  = false
                    this.foc_rwhInch         = false
                    break
                case 'rwhAspectRatio':
                    this.foc_fwhCrossSection = false
                    this.foc_fwhAspectRatio  = false
                    this.foc_fwhInch         = false
                    this.foc_rwhCrossSection = false
                    this.foc_rwhAspectRatio  = true
                    this.foc_rwhInch         = false
                    break
                case 'rwhInch':
                    this.foc_fwhCrossSection = false
                    this.foc_fwhAspectRatio  = false
                    this.foc_fwhInch         = false
                    this.foc_rwhCrossSection = false
                    this.foc_rwhAspectRatio  = false
                    this.foc_rwhInch         = true
                    break
            }
        },
        fn_delStr(colNm) {
            if(colNm == 'fwhCrossSection') {
                this.fwhCrossSection = ''
            } else if(colNm == 'fwhAspectRatio') {
                this.fwhAspectRatio = ''
            } else if(colNm == 'fwhInch') {
                this.fwhInch = ''
            } else if(colNm == 'rwhCrossSection') {
                this.rwhCrossSection = ''
            } else if(colNm == 'rwhAspectRatio') {
                this.rwhAspectRatio = ''
            } else if(colNm == 'rwhInch') {
                this.rwhInch = ''
            }
		},
		/**************** 타이어(TRE) Function E *****************/	
		/***************** 리콜(RCL) Function S ******************/
        fn_openRecallCodePopup(carRcalId='') {

            if(this.recallList.length == 1) {
                return false
            }

            const popConfig = {
                params : {
                    val  : carRcalId,
                    recallList : this.recallList
                },
                renderer : {
                    component : PDCA1123
                }
            }

            modalService.openSlidePagePopup(popConfig).then(response => {
                this.carRcalId = response.carRcalId

                this.currentIndex = this.recallList.findIndex(x => x.carRcalId === this.carRcalId);

                // 리콜상세 세팅
                this.fn_setRecallInfo(this.currentIndex)
            })
        },
        fn_setRecallInfo(idx) {
            this.carRcalId   = this.recallList[idx].carRcalId   || ''
            this.rcalActYn   = this.recallList[idx].rcalActYn   || ''
            this.rcalTinm    = this.recallList[idx].rcalTinm    || ''
            this.eqimtClfnm  = this.recallList[idx].eqimtClfnm  || ''
            this.carMkenm    = this.recallList[idx].carMkenm    || ''
            this.carPdnm     = this.recallList[idx].carPdnm     || ''

            let carPdnmList = this.carPdnm.split(",")
            if(carPdnmList.length == 1) {
                this.carPdnmStr = this.carPdnm
            } else {
                this.carPdnmStr = carPdnmList[0] + ' 외 ' + (carPdnmList.length - 1) + '종'
            }

            this.pdStDt      = this.recallList[idx].pdStDt      || ''
            this.pdEdDt      = this.recallList[idx].pdEdDt      || ''
            this.rcalStDt    = this.recallList[idx].rcalStDt    || ''
            this.rcalEdDt    = this.recallList[idx].rcalEdDt    || ''
            this.carDfctCntn = this.recallList[idx].carDfctCntn || ''
            this.rtfMcnt     = this.recallList[idx].rtfMcnt     || ''
            this.inqplCntn   = this.recallList[idx].inqplCntn   || ''

            let chk = /[0-9]/; // 전화번호 시작 index 추출하기 위함

            if(this.inqplCntn.match(chk).index != -1) {
                let idx = this.inqplCntn.match(chk).index

                this.inqplCntn1 = this.inqplCntn.substr(0, idx)
                this.inqplCntn2 = this.inqplCntn.substr(idx)
            }
        },		
		/***************** 리콜(RCL) Function E ******************/
		// 소모품교체주기설정 팝업	
		fn_goPDCA1104() {

			let compName = PDCA1104

			var param = {vhcnoVal : this.vhcnoVal}
			const config = {
				component : compName,
				params    : param
			}
			modalService.openPopup(config).then((response) => {
				// 저장완료시
				if(response == 'reload' || response == true) {
					// 재조회(종합)
					this.fn_srchCall('COM')
					//this.getDataCom()
				}
			})
		},

		// data clear
		fn_clearData(){
		/********************** 종합(COM) Output ***********************/			
			this.lsOdmtrDist     = "",		// 자동차 최종주행거리
			this.lsTrDt          = "",		// 자동차 마지막업데이트일자
			this.ancTtcn         = "",		// 알림총건수
			this.ancList         = [],		// 알림목록
		
			// 알림목록
			this.rcalInf         = {},		// 리콜정보
			this.mtncInfList     = [],		// 정비정보
			this.ispInf          = {},		// 검사정보
			this.txInf           = {}, 		// 세금정보
			this.insuInf         = {},		// 보험정보
			this.mtncInfSetList  = [],		// 정비정보Set(1개월)			

			// 소모품 교체도래일 조회
            this.comTtcn         = 0,        // 총건수
			this.mtncHdngList    = [],       // 정비항목목록
			this.gridList        = [],       // 정비항목목록
			this.mstgridList     = [],       // 마스터_정비항목목록(년월로 groupby)			

		/********************** 보험(ISR) Output ***********************/
            this.isrHldYn        = "",       // 보험보유여부 ==> 정상(유효)보험보험여부 0:미보유 1:보유
            this.dueAncYn        = "",       // 만기알림여부 ==> 만기까지30일이하여부 0:31일이상 1:30일이하
            this.infOfrmnOrgC    = "",       // 정보제공자기관코드
            this.trOrgnm         = "",       // 거래기관명(보험사)
            this.isrSctsNo       = "",       // 보험증권번호
            this.isrcoWrsnm      = "",       // 보험사상품명
            this.isrEdDt         = "",       // 보험종료일자
            this.isrDds          = 0,        // 일수
            this.isrDds1         = 0,        // D-Day 표현 첫번째자릿수
            this.isrDds2         = 0,        // D-Day 표현 두번째자릿수
            this.isrDds3         = 0,        // D-Day 표현 세번째자릿수
            this.isrDds4         = 0,        // D-Day 표현 네번째자릿수

		/********************* 타이어(TRE) Output **********************/
            this.chgDt           = "",       // 변경일자
            this.odmtrDist       = 0,        // 주행거리
            this.fwhlTireSzeCntn = "",       // 전륜타이어크기내용
            this.rwhlTireSzeCntn = "",       // 후륜타이어크기내용
            this.fwhCrossSection = "",       // 전륜_타이어_단면적
            this.fwhAspectRatio  = "",       // 전륜_타이어_편평비
            this.fwhInch         = "",       // 전륜_타이어_인치
            this.rwhCrossSection = "",       // 후륜_타이어_단면적
            this.rwhAspectRatio  = "",       // 후륜_타이어_편평비
            this.rwhInch         = "",       // 후륜_타이어_인치

            // focus관련
            this.foc_fwhCrossSection = false,
            this.foc_fwhAspectRatio  = false,
            this.foc_fwhInch         = false,
            this.foc_rwhCrossSection = false,
            this.foc_rwhAspectRatio  = false,
            this.foc_rwhInch         = false,

		/********************** 세금(TAX) Output ***********************/
            this.basyy           = "",       // 기준년도
            this.xpcTxa          = 0,        // 예상세액
            this.janPayadTxa     = 0,        // 1월선납세액
            this.marPayadTxa     = 0,        // 3월선납세액
            this.junPayadTxa     = 0,        // 6월선납세액
            this.sepPayadTxa     = 0,        // 9월선납세액			
		
		/********************** 검사(ISP) Output ***********************/
            this.ispStDt		= "",     // 검사시작일자
            this.expiDt			= "",     // 만료일자
            this.chkDds			= 0,      // 일수
            this.chkDds1		= 0,      // D-Day 표현 첫번째자릿수
            this.chkDds2		= 0,      // D-Day 표현 두번째자릿수
            this.chkDds3		= 0,      // D-Day 표현 세번째자릿수
            this.chkDds4		= 0,      // D-Day 표현 네번째자릿수
            this.penaltyAmt		= 0,      // 예상 검사과태료			

		/********************** 리콜(RCL) Output ***********************/
            this.ttcn            = 0,      // 총건수
            this.recallList      = [],     // 리콜목록

            // recallList Info
            this.carRcalId       = "",     // 자동차리콜ID
            this.rcalActYn       = "",     // 리콜조치여부
            this.rcalTinm        = "",     // 리콜제목명
            this.eqimtClfnm      = "",     // 장치분류명
            this.carMkenm        = "",     // 자동차제작자명
            this.carPdnm         = "",     // 자동차제품명
            this.carPdnmStr      = "",     // 자동차제품명(표현)
            this.pdStDt          = "",     // 생산시작일자
            this.pdEdDt          = "",     // 생산종료일자
            this.rcalStDt        = "",     // 리콜시작일자
            this.rcalEdDt        = "",     // 리콜종료일자
            this.carDfctCntn     = "",     // 자동차결함내용
            this.rtfMcnt         = "",     // 시정방법내용
            this.inqplCntn       = "",     // 문의처내용
            this.inqplCntn1      = "",     // 문의처내용 (문의처)
            this.inqplCntn2      = ""      // 문의처내용 (문의처 전화번호)
		}
    },
	computed: {
		getNoBtnCss(){
			// 보험(ISR), 타이어(TRE)은 버튼 있음
			return this.tapType === 'ISR' || this.tapType === 'TRE' ? "" : "com_no_bottom"
		}
	}
}
</script>
