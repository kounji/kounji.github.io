<!--
/*************************************************************************
* @ 서비스경로 : 자산연결 > 금융자산 > 한번에 > 기관연결 완료 및 금융자산 선택
* @ 페이지설명 : 기관연결 완료 및 금융자산 선택
* @ 파일명     : src/views/page/CO/AR/COAR2008/COAR2008.vue
* @ 작성자     : CS5533459
* @ 작성일     : 2022-08-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-18              CS528069              최초작성
* 2023-07-27			  CS533459				상호금융 마이데이터 확대개발 적용
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>{{isMramMod === '' ? "자산연결" : "연결 변경"}}</h1>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner progress_wrap" v-if="hasSuccessOrg">
				<strong class="titH1">관리할 자산(공공)정보를<br>선택해 주세요</strong>
				<span class="progress_num"><em class="pointColor green">4</em>/5</span>
			</div>
			<div class="com_inner">
				<section v-if="hasSuccessOrg">
					<div class="custom_box flex_new_tit_area mt0">
						<div class="list_type_box">
							<div class="new_tit_area">
								<div class="tit"><span>연결 요청 완료 <em class="pointColor green">{{org_succ_cnt}}</em>개</span></div>
							</div>
						</div>

						<div class="btn_check btn_check3 checkAll">
							<input type="checkbox" name="checkAll" id="checkAll" ref="checkAll" @click="fn_allAsetSel('checkAll')">
							<label for="checkAll">{{isAllChked ? "선택해제" : "전체선택"}}</label>
						</div>
					</div>
					<!-- 은행 -->
					<template  v-if="bank_list.length > 0">
						<div class="com_box_type01 toggle_list_box2 custom_list toggle_list_box5" v-for="(item, busIdx) in bank_list" :key="busIdx+'_bank'">
							<!-- 
								열림상태 : <div data-ui-toggle="box" class="toggle_box_area">
								닫힘상태 : <div data-ui-toggle="box" class="toggle_box_area open">
							-->
							<div data-ui-toggle="box" class="toggle_box_area open" >
								<button type="button" class="view_btn" aria-expanded="true">
									<div class="new_tit_area new_tit_area02">
										<div class="tit">
											<i :class="item.org_code"><span class="blind">{{item.org_name}}</span></i>
											<span>{{item.org_name}} <em class="num">({{selectBankList.filter(e => e.org_code === item.org_code).length}}/{{item.list.length}})</em></span>
										</div>
									</div>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>
							<ul class="view_cont list_type_01">
								<li v-for="(perItem, perIdx) in item.list" :key="perIdx+'_per'">
									<div class="custom_terms">
										<span class="btn_check btn_check2">
											<input type="checkbox" v-model="selectBankList" :value="perItem" :name="perItem.org_code+'_'+perIdx" :id="perItem.org_code+'_'+perIdx" :ref="perItem.org_code" @click="fn_sepAssetClick($event, bank_list, perItem.org_code, busIdx, 'bank', perIdx, perItem.key, item)">
											<label :for="perItem.org_code+'_'+perIdx">
												<span>
													<strong>{{perItem.prod_name}}</strong>
													<em class="num">{{perItem.key}}</em>
												</span>
											</label>
										</span>
									</div>
								</li>
							</ul>
						</div>
					</template>
					<!-- // 은행 -->
					<!-- 카드 -->
					<template v-if="card_list.length > 0">
						<div class="com_box_type01 toggle_list_box2 custom_list toggle_list_box5" v-for="(item, busIdx) in card_list" :key="busIdx+'_card'">
							<!-- 
								열림상태 : <div data-ui-toggle="box" class="toggle_box_area">
								닫힘상태 : <div data-ui-toggle="box" class="toggle_box_area open">
							-->
							<div data-ui-toggle="box" class="toggle_box_area open">
								<button type="button" class="view_btn" aria-expanded="true">
									<div class="new_tit_area new_tit_area02">
										<div class="tit">
											<i :class="item.org_code"><span class="blind">{{item.org_name}}</span></i>
											<span>{{item.org_name}} <em class="num">({{selectCardList.filter(e => e.org_code === item.org_code).length}}/{{item.list.length}})</em></span>
										</div>
									</div>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>

							<ul class="view_cont list_type_01" v-for="(perItem, perIdx) in item.list" :key="perIdx+'_per'">
								<li>
									<div class="custom_terms">
										<span class="btn_check btn_check2">
											<input type="checkbox" v-model="selectCardList" :value="perItem" :name="perItem.org_code+'_'+perIdx" :id="perItem.org_code+'_'+perIdx" :ref="perItem.org_code" @click="fn_sepAssetClick($event, card_list, perItem.org_code, busIdx, 'card', perIdx, perItem.key, item)">
											<label :for="perItem.org_code+'_'+perIdx">
												<span>
													<strong>{{perItem.prod_name}}</strong>
													<!-- <em class="num">{{perItem.key | maskingFilter('card')}}</em> -->
													<em class="num" v-if="!isNull(perItem.card_num)">{{perItem.card_num}}</em>
													<em class="num" v-else>{{perItem.key}}</em>
												</span>
											</label>
										</span>
									</div>
								</li>
							</ul>
						
							<ul class="view_cont list_type_04">
								<li>
									<div class="custom_terms custom_box_checktype02">
										<span class="btn_check btn_check3">
											<input type="checkbox" :name="item.org_code+'_'+busIdx+'_point'" :id="item.org_code+'_'+busIdx+'_point'" :ref="item.org_code+'_'+busIdx+'_point'" @click="fn_sepCardDtlClick($event, item, busIdx)">
											<label :for="item.org_code+'_'+busIdx+'_point'">
												<span>
													<strong>포인트</strong>
												</span>
											</label>
										</span>
									</div>
								</li>
								<li>
									<div class="custom_terms custom_box_checktype02">
										<span class="btn_check btn_check3">
											<input type="checkbox" :name="item.org_code+'_'+busIdx+'_rev'" :id="item.org_code+'_'+busIdx+'_rev'" :ref="item.org_code+'_'+busIdx+'_rev'" @click="fn_sepCardDtlClick($event, item, busIdx)">
											<label :for="item.org_code+'_'+busIdx+'_rev'">
												<span>
													<strong>청구&middot;결제&middot;리볼빙</strong>
												</span>
											</label>
										</span>
									</div>
								</li>
								<li>
									<div class="custom_terms custom_box_checktype02">
										<span class="btn_check btn_check3">
											<input type="checkbox" :name="item.org_code+'_'+busIdx+'_loan'" :id="item.org_code+'_'+busIdx+'_loan'" :ref="item.org_code+'_'+busIdx+'_loan'" @click="fn_sepCardDtlClick($event, item, busIdx)">
											<label :for="item.org_code+'_'+busIdx+'_loan'">
												<span>
													<strong>카드대출</strong>
												</span>
											</label>
										</span>
									</div>
								</li>
							</ul>
						</div>
					</template>
					<!-- // 카드 -->
					<!-- 증권 -->
					<template v-if="invest_list.length > 0">
						<div class="com_box_type01 toggle_list_box2 custom_list toggle_list_box5" v-for="(item, busIdx) in invest_list" :key="busIdx+'_invest'">
							<!-- 
								열림상태 : <div data-ui-toggle="box" class="toggle_box_area">
								닫힘상태 : <div data-ui-toggle="box" class="toggle_box_area open">
							-->
							<div data-ui-toggle="box" class="toggle_box_area open" >
								<button type="button" class="view_btn" aria-expanded="true">
									<div class="new_tit_area new_tit_area02">
										<div class="tit">
											<i :class="item.org_code"><span class="blind">{{item.org_name}}</span></i>
											<span>{{item.org_name}} <em class="num">({{selectInvestList.filter(e => e.org_code === item.org_code).length}}/{{item.list.length}})</em></span>
										</div>
									</div>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>
							<ul class="view_cont list_type_01">
								<li v-for="(perItem, perIdx) in item.list" :key="perIdx+'_per'">
									<div class="custom_terms">
										<span class="btn_check btn_check2">
											<input type="checkbox" v-model="selectInvestList" :value="perItem" :name="perItem.org_code+'_'+perIdx" :id="perItem.org_code+'_'+perIdx" :ref="perItem.org_code" @click="fn_sepAssetClick($event, invest_list, perItem.org_code, busIdx, 'invest', perIdx, perItem.key, item)">
											<label :for="perItem.org_code+'_'+perIdx">
												<span>
													<strong>{{perItem.prod_name}}</strong>
													<em class="num">{{perItem.key}}</em>
												</span>
											</label>
										</span>
									</div>
								</li>
							</ul>
						</div>
					</template>
					<!-- // 증권 -->
					<!-- 보험 -->
					<template v-if="insu_list.length > 0">
						<div class="com_box_type01 toggle_list_box2 custom_list toggle_list_box5" v-for="(item, busIdx) in insu_list" :key="busIdx+'_insu'">
							<!-- 
								열림상태 : <div data-ui-toggle="box" class="toggle_box_area">
								닫힘상태 : <div data-ui-toggle="box" class="toggle_box_area open">
							-->
							<div data-ui-toggle="box" class="toggle_box_area open" >
								<button type="button" class="view_btn" aria-expanded="true">
									<div class="new_tit_area new_tit_area02">
										<div class="tit">
											<i :class="item.org_code"><span class="blind">{{item.org_name}}</span></i>
											<span>{{item.org_name}} <em class="num">({{selectInsuList.filter(e => e.org_code === item.org_code).length}}/{{item.list.length}})</em></span>
										</div>
									</div>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>
							<ul class="view_cont list_type_01">
								<li v-for="(perItem, perIdx) in item.list" :key="perIdx+'_per'">
									<div class="custom_terms">
										<span class="btn_check btn_check2">
											<input type="checkbox" v-model="selectInsuList" :value="perItem" :name="perItem.org_code+'_'+perIdx" :id="perItem.org_code+'_'+perIdx" :ref="perItem.org_code" @click="fn_sepAssetClick($event, insu_list, perItem.org_code, busIdx, 'insu', perIdx, perItem.key, item)">
											<label :for="perItem.org_code+'_'+perIdx">
												<span>
													<strong>{{perItem.prod_name}}</strong>
													<em class="num">{{perItem.key}}</em>
												</span>
											</label>
										</span>
									</div>
								</li>
							</ul>
						</div>
					</template>
					<!-- // 보험 -->
					<!-- 페이 -->
					<template v-if="efin_list.length > 0">
						<div class="com_box_type01 toggle_list_box2 custom_list toggle_list_box5" v-for="(item, busIdx) in efin_list" :key="busIdx+'_efin'">
							<!-- 
								열림상태 : <div data-ui-toggle="box" class="toggle_box_area">
								닫힘상태 : <div data-ui-toggle="box" class="toggle_box_area open">
							-->
							<div data-ui-toggle="box" class="toggle_box_area open" >
								<button type="button" class="view_btn" aria-expanded="true">
									<div class="new_tit_area new_tit_area02">
										<div class="tit">
											<i :class="item.org_code"><span class="blind">{{item.org_name}}</span></i>
											<span>{{item.org_name}} <em class="num">({{selectEfinList.filter(e => e.org_code === item.org_code).length}}/{{item.list.length}})</em></span>
										</div>
									</div>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>
							<ul class="view_cont list_type_01">
								<li v-for="(perItem, perIdx) in item.list" :key="perIdx+'_per'">
									<div class="custom_terms">
										<span class="btn_check btn_check2">
											<input type="checkbox" v-model="selectEfinList" :value="perItem" :name="perItem.org_code+'_'+perIdx" :id="perItem.org_code+'_'+perIdx" :ref="perItem.org_code" @click="fn_sepAssetClick($event, efin_list, perItem.org_code, busIdx, 'efin', perIdx, perItem.key, item)">
											<label :for="perItem.org_code+'_'+perIdx">
												<span>
													<strong>{{perItem.prod_name}}</strong>
													<em class="num">{{perItem.key}}</em>
												</span>
											</label>
										</span>
									</div>
								</li>
							</ul>
						</div>
					</template>
					<!-- // 페이 -->
					<!-- 할부금융 -->
					<template v-if="capital_list.length > 0">
						<div class="com_box_type01 toggle_list_box2 custom_list toggle_list_box5" v-for="(item, busIdx) in capital_list" :key="busIdx+'_capital'">
							<!-- 
								열림상태 : <div data-ui-toggle="box" class="toggle_box_area">
								닫힘상태 : <div data-ui-toggle="box" class="toggle_box_area open">
							-->
							<div data-ui-toggle="box" class="toggle_box_area open" >
								<button type="button" class="view_btn" aria-expanded="true">
									<div class="new_tit_area new_tit_area02">
										<div class="tit">
											<i :class="item.org_code"><span class="blind">{{item.org_name}}</span></i>
											<span>{{item.org_name}} <em class="num">({{selectCapitalList.filter(e => e.org_code === item.org_code).length}}/{{item.list.length}})</em></span>
										</div>
									</div>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>
							<ul class="view_cont list_type_01">
								<li v-for="(perItem, perIdx) in item.list" :key="perIdx+'_per'">
									<div class="custom_terms">
										<span class="btn_check btn_check2">
											<input type="checkbox" v-model="selectCapitalList" :value="perItem" :name="perItem.org_code+'_'+perIdx" :id="perItem.org_code+'_'+perIdx" :ref="perItem.org_code" @click="fn_sepAssetClick($event, capital_list, perItem.org_code, busIdx, 'capital', perIdx, perItem.key, item)">
											<label :for="perItem.org_code+'_'+perIdx">
												<span>
													<strong>{{perItem.prod_name}}</strong>
													<em class="num">{{perItem.key}}</em>
												</span>
											</label>
										</span>
									</div>
								</li>
							</ul>
						</div>
					</template>
					<!-- // 할부금융 -->
					<!-- 통신 -->
					<template v-if="telecom_list.length > 0">
						<div class="com_box_type01 toggle_list_box2 custom_list toggle_list_box5" v-for="(item, busIdx) in telecom_list" :key="busIdx+'_telecom'">
							<!-- 
								열림상태 : <div data-ui-toggle="box" class="toggle_box_area">
								닫힘상태 : <div data-ui-toggle="box" class="toggle_box_area open">
							-->
							<div data-ui-toggle="box" class="toggle_box_area open" >
								<button type="button" class="view_btn" aria-expanded="true">
									<div class="new_tit_area new_tit_area02">
										<div class="tit">
											<i :class="item.org_code"><span class="blind">{{item.org_name}}</span></i>
											<span>{{item.org_name}} <em class="num">({{selectTelecomList.filter(e => e.org_code === item.org_code).length}}/{{item.list.length}})</em></span>
										</div>
									</div>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>
							<ul class="view_cont list_type_01">
								<li v-for="(perItem, perIdx) in item.list" :key="perIdx+'_per'">
									<div class="custom_terms">
										<span class="btn_check btn_check2">
											<input type="checkbox" v-model="selectTelecomList" :value="perItem" :name="perItem.org_code+'_'+perIdx" :id="perItem.org_code+'_'+perIdx" :ref="perItem.org_code" @click="fn_sepAssetClick($event, telecom_list, perItem.org_code, busIdx, 'telecom', perIdx, perItem.key, item)">
											<label :for="perItem.org_code+'_'+perIdx">
												<span>
													<strong>{{fn_parseTeleType(perItem.type)}}</strong>
													<em class="num" v-if="perItem.telecom_num !== ''">{{perItem.telecom_num}}</em>
													<em class="num" v-else>{{perItem.key}}</em>
												</span>
											</label>
										</span>
									</div>
								</li>
							</ul>
						</div>
					</template>
					<!-- // 통신 -->
					<!-- 대부 -->
					<template v-if="usury_list.length > 0">
						<div class="com_box_type01 toggle_list_box2 custom_list toggle_list_box5" v-for="(item, busIdx) in usury_list" :key="busIdx+'_usury'">
							<!-- 
								열림상태 : <div data-ui-toggle="box" class="toggle_box_area">
								닫힘상태 : <div data-ui-toggle="box" class="toggle_box_area open">
							-->
							<div data-ui-toggle="box" class="toggle_box_area open" >
								<button type="button" class="view_btn" aria-expanded="true">
									<div class="new_tit_area new_tit_area02">
										<div class="tit">
											<i :class="item.org_code"><span class="blind">{{item.org_name}}</span></i>
											<span>{{item.org_name}} <em class="num">({{selectUsuryList.filter(e => e.org_code === item.org_code).length}}/{{item.list.length}})</em></span>
										</div>
									</div>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>
							<ul class="view_cont list_type_01">
								<li v-for="(perItem, perIdx) in item.list" :key="perIdx+'_per'">
									<div class="custom_terms">
										<span class="btn_check btn_check2">
											<input type="checkbox"  v-model="selectUsuryList" :value="perItem" :name="perItem.org_code+'_'+perIdx" :id="perItem.org_code+'_'+perIdx" :ref="perItem.org_code" @click="fn_sepAssetClick($event, usury_list, perItem.org_code, busIdx, 'usury', perIdx, perItem.key, item)">
											<label :for="perItem.org_code+'_'+perIdx">
												<span>
													<strong>매입사관리번호</strong>
													<em class="num">{{perItem.key}}</em>
												</span>
											</label>
										</span>
									</div>
								</li>
							</ul>
						</div>
					</template>
					<!-- // 대부 -->
					<!-- P2P -->
					<template v-if="p2p_list.length > 0">
						<div class="com_box_type01 toggle_list_box2 custom_list toggle_list_box5" v-for="(item, busIdx) in p2p_list" :key="busIdx+'_p2p'">
							<!-- 
								열림상태 : <div data-ui-toggle="box" class="toggle_box_area">
								닫힘상태 : <div data-ui-toggle="box" class="toggle_box_area open">
							-->
							<div data-ui-toggle="box" class="toggle_box_area open" >
								<button type="button" class="view_btn" aria-expanded="true">
									<div class="new_tit_area new_tit_area02">
										<div class="tit">
											<i :class="item.org_code"><span class="blind">{{item.org_name}}</span></i>
											<span>{{item.org_name}} <em class="num">({{selectP2pList.filter(e => e.org_code === item.org_code).length}}/{{item.list.length}})</em></span>
										</div>
									</div>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>
							<ul class="view_cont list_type_01">
								<li v-for="(perItem, perIdx) in item.list" :key="perIdx+'_per'">
									<div class="custom_terms">
										<span class="btn_check btn_check2">
											<input type="checkbox" v-model="selectP2pList" :value="perItem" :name="perItem.org_code+'_'+perIdx" :id="perItem.org_code+'_'+perIdx" :ref="perItem.org_code" @click="fn_sepAssetClick($event, p2p_list, perItem.org_code, busIdx, 'p2p', perIdx, perItem.key, item)">
											<label :for="perItem.org_code+'_'+perIdx">
												<span>
													<strong>{{fn_parseP2pType(perItem.type)}}</strong>
													<em class="num">{{perItem.key}}</em>
												</span>
											</label>
										</span>
									</div>
								</li>
							</ul>
						</div>
					</template>
					<!-- // P2P -->
					<!-- 공공 -->
					<template v-if="public_list.length > 0">
						<div class="com_box_type01 toggle_list_box2 custom_list toggle_list_box5" v-for="(item, busIdx) in public_list" :key="busIdx+'_public'">
							<!-- 
								열림상태 : <div data-ui-toggle="box" class="toggle_box_area">
								닫힘상태 : <div data-ui-toggle="box" class="toggle_box_area open">
							-->
							<div data-ui-toggle="box" class="toggle_box_area open" >
								<button type="button" class="view_btn" aria-expanded="true">
									<div class="new_tit_area new_tit_area02">
										<div class="tit">
											<i :class="item.org_code"><span class="blind">{{item.org_name}}</span></i>
											<span>{{item.org_name}} <em class="num">({{selectPublicList.filter(e => e.org_code === item.org_code).length}}/{{item.list.length}})</em></span>
										</div>
									</div>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>
							<ul class="view_cont list_type_01">
								<li v-for="(perItem, perIdx) in item.list" :key="perIdx+'_per'">
									<div class="custom_terms">
										<span class="btn_check btn_check2">
											<input type="checkbox" v-model="selectPublicList" :value="perItem" :id="perItem.org_code+'_'+perIdx" :ref="perItem.org_code" @click="fn_sepAssetClick($event, public_list, perItem.org_code, busIdx, 'public', perIdx, perItem.key, item)">
											<label :for="perItem.org_code+'_'+perIdx">
												<span>
													<strong>{{perItem.cert_nm}}</strong>
												</span>
											</label>
										</span>
									</div>
								</li>
							</ul>
						</div>
					</template>
					<!-- // 공공 -->
				</section>

				<section v-else>
					<!-- 연결에 성공한 기관이 없어요! -->
					<div class="no_data_box no_data_box01">
						<div class="no_data_list">
							<p class="titH1">연결에 성공한 기관이 없어요!</p>
							<span class="txt_sub">요청한 기관에 연결이 실패하여<br>자산이 조회 되지 않았어요.</span>
						</div>
					</div>
					<!--// 연결에 성공한 기관이 없어요! -->
				</section>
			</div>

			<!-- 성공기관 , 실패기관 둘다 존재할 시 디바이더 표시 -->
			<hr class="hr02" v-if="hasSuccessOrg && fail_org_list.length > 0">

			<div class="com_inner">
				<div class="custom_box" v-if="fail_org_list.length > 0">
					<div class="new_tit_area flex_new_tit_area">
						<strong class="tit"><span>연결 요청 실패<em class="pointColor green">{{fail_org_list.length}}</em>개</span></strong>
						<!-- 연결 재시도 -->
						<!-- <span class="btn_refresh2" v-show="isShowRetryYn">
							<a href="javascript:void(0);" class="com_btn_round" @click="fn_reTryConnect()">
								<span class="btn_refresh">연결 재시도</span>
							</a>
						</span> -->
						<button v-show="isShowRetryYn" type="button" class="stdBtn innerType01" @click="fn_reTryConnect()">연결 재시도</button>
						<!-- // 연결 재시도 -->
					</div>
				</div>
				<div class="custom_list com_box_type01 noBorder" v-if="fail_org_list.length > 0">
					<div class="list_type_custom">
						<div class="list_item" v-for="(failItem, failIdx) in fail_org_list" :key="'orgFail_'+failIdx">
							<i :class="failItem.org_code"></i>
							<strong class="tit">{{failItem.org_name}}</strong>
							<span class="ico_result fail_tip">실패
								<div class="custom_tooltip up">
									<div class="com_tooltip_type02 com_tooltip_type03">
										<a href="javascript:void(0);" class="com_btn_info">
											<em class="com_icon_info3"><span class="blind">툴팁열기</span></em>
										</a>
									</div>
									<div class="com_ballon_type01 com_ballon_type02" style="display: none;">
										<div>
											{{failItem.rsp_msg}} <br>
											(오류코드 <em>{{failItem.rsp_code}}</em>)
											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div>
									</div>
								</div>
							</span>
						</div>
					</div>
				</div>
				<p class="stdMsg star" v-show="isShowRetryYn">재연결이 가능한 기관에 한하여 연결을 재시도 합니다.</p>
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<template v-if="hasSuccessOrg">
					<a href="javascript:void(0);" role="button" class="btn btn_mint" :class="{btn_off : btnViewYn}" :aria-disabled="btnViewYn ? 'true' : 'false'" @click="moveNext">{{selAllCnt}}개 연결하기</a>
				</template>
				<template v-else>
					<a href="javascript:void(0);" role="button" class="btn btn_mint" aria-disabled="false" @click="moveCOAR2002()">기관 다시 선택</a>
				</template>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="closeAsetListPop()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>

import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import _ from 'lodash'
import store from '@/store'

import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002.vue'
import COAR2007 from '@/views/page/CO/AR/COAR2007/COAR2007.vue'
import COAR2009 from '@/views/page/CO/AR/COAR2009/COAR2009.vue'
import COAR2014 from '@/views/page/CO/AR/COAR2014/COAR2014.vue'

export default {
    name : "COAR2008",
    data: () => {
        return {
			////////// get 파라미터 //////////
			certDsc			: "",	// (필수) 인증방법 (공동인증 : joint, 금융인증 : finance, 패스인증 : pass)
			userAgreeInfo 	: {},	// 사용자 동의 정보
			asetJson 		: {},	// 정보제공자 업권별 목록 제공 api response
			moduleList		: [],	// 기관 선택팝업에서 선택한 기관 리스트
			attcCext		: "",	// 인증코드(NonceCode)
			attcC			: "",	// 인증코드(NonceCode)
			cert_tx_id		: "",	// PASS인증) 인증사업자
			sign_tx_id		: "",	// PASS인증) 서명요청 트랜잭션ID
			telco_tycd		: "",	// PASS인증) 통신사구분코드
			end_period		: "",	// 전송요구종료일자
			/////////////////////////////////
			// selOrgBckList	: [],	// 선택 기관 내 전체 자산 리스트 (백업용)
			selectList		: [],	// 선택 자산 리스트

			
			selectBankList 		: [],	// 선택한 은행 데이터 리스트
			selectCardList 		: [],	// 선택한 카드 데이터 리스트

			selectInvestList 	: [],	// 선택한 증권 데이터 리스트
			selectInsuList 		: [],	// 선택한 보험 데이터 리스트
			selectEfinList 		: [],	// 선택한 전금 데이터 리스트
			selectCapitalList 	: [],	// 선택한 할부금융 데이터 리스트
			selectTelecomList 	: [],	// 선택한 통신 데이터 리스트
			selectUsuryList		: [],	// 선택한 대부 데이터 리스트
			selectP2pList    	: [],  // 선택한 P2P 리스트
			selectPublicList : [],  // 선택한 공공기관 리스트

			cardPointDisabled : true , //카드 포인트 체크박스 활성화 여부
			cardRevDisabled : true , //카드 리볼빙 체크박스 활성화 여부
			cardLoanDisabled : true , //카드 대출 체크박스 활성화 여부

			orgTotScopeList : [],	// 선택한 업권 스코프 리스트
			maxCnt			: 99,	// 직접 선택가능한 최대 자산 개수
			
			org_succ_cnt	: 0,	// 연결 성공 기관 수
			bank_list 		: [],	// 은행 데이터 리스트
			card_list 		: [],	// 카드 데이터 리스트
			invest_list 	: [],	// 증권 데이터 리스트
			insu_list 		: [],	// 보험 데이터 리스트
			efin_list 		: [],	// 전금 데이터 리스트
			capital_list 	: [],	// 할부금융 데이터 리스트
			ginsu_list		: [],	// 보증보험 데이터 리스트
			telecom_list 	: [],	// 통신 데이터 리스트
			usury_list		: [],	// 대부 데이터 리스트
			bond_list		: [],	// 채권 데이터 리스트
			p2p_list		: [],	// p2p 데이터 리스트
			public_list		: [],   // 공공 데이터 리스트
			dc_list         : [],   // 퇴직연금 데이터 리스트 // 고도화 퇴직연금 추가 - 2023.07.19 by CS533461

			org_fail_list	: [],	// 연결 실패 기관 리스트
			reConTryList	: [],	// 연결 재시도 기관 리스트

			/////////// 서비스로 받아온 실패 기관 리스트 및 실패 기관 개수
			fail_org_list 	: [],
			fail_org_cnt	: 0,
			isShowRetryYn	: false,
			///////////

			bankYn 			: false,	// 은행데이터 여부
			investYn 		: false,	// 증권데이터 여부
			cardYn 			: false,	// 카드데이터 여부
			insuYn 			: false,	// 보험데이터 여부
			efinYn 			: false,	// 전금데이터 여부
			capitalYn 		: false,	// 할부금융데이터 여부
			ginsuYn 		: false,	// 보증보험데이터 여부
			telecomYn 		: false,	// 통신데이터 여부
			usuryYn			: false,	// 대부데이터 여부
			bondYn			: false,	// 채권데이터 여부
			p2pYn			: false,	// p2p데이터 여부
			publicYn	    : false,	// 공공데이터 여부

			isAllChked		: false,	// 모든 자산 선택 버튼 활성화 여부
			// btnViewYn		: true,		// 다음 버튼 활성화 여부 (true : 비활성화, false : 활성화)  Computed 로 변경 

			isMramMod		: '',		// '연결 기관 관리' 페이지를 통해 넘어올 경우 구분값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
			isBckYn			: false,	// 변경 또는 만료일 해제로 넘어올 경우의 기관별 백업데이터 유무값

			///////////////// 통합인증 관련 코드-명칭 mapping /////////////////
			p2pType : [	// p2p type에 따른 명칭
				{key : "01", value : "부동산 PF대출"},
				{key : "02", value : "부동산 담보대출"},
				{key : "03", value : "어음.매출채권 담보대출"},
				{key : "04", value : "기타 담보대출"},
				{key : "05", value : "개인 신용대출"},
				{key : "06", value : "법인 신용대출"},
			],

			teleType : [
				{key : "01", value : "휴대폰"},
				{key : "02", value : "집전화"},
				{key : "03", value : "인터넷"},
			],
			errorMsg : [
				{key : "40302", value : "연결 요청 중 일시적인 오류가 발생했습니다. 잠시 후 다시 이용해 주세요."},
				{key : "50001", value : "연결 요청 중 일시적인 오류가 발생했습니다. 잠시 후 다시 이용해 주세요."},
				{key : "50004", value : "연결 요청 중 일시적인 오류가 발생했습니다. 잠시 후 다시 이용해 주세요."},
				{key : "50005", value : "연결 요청 중 일시적인 오류가 발생했습니다. 잠시 후 다시 이용해 주세요."},
				{key : "50003", value : "연결 요청 중 일시적인 오류가 발생했습니다. 잠시 후 다시 이용해 주세요."},
				{key : "40001", value : "연결 요청이 정상적으로 처리되지 않았습니다."},
				{key : "40002", value : "연결 요청이 정상적으로 처리되지 않았습니다."},
				{key : "40003", value : "연결 요청이 정상적으로 처리되지 않았습니다."},
				{key : "40004", value : "연결 요청이 정상적으로 처리되지 않았습니다."},
				{key : "40303", value : "연결 요청이 정상적으로 처리되지 않았습니다."},
				{key : "40401", value : "연결 요청이 정상적으로 처리되지 않았습니다."},
				{key : "40501", value : "연결 요청이 정상적으로 처리되지 않았습니다."},
				{key : "42901", value : "연결 요청이 정상적으로 처리되지 않았습니다."},
				{key : "40104", value : "API 사용 권한이 없거나 올바르지 않은 호출입니다."},
				{key : "40301", value : "API 사용 권한이 없거나 올바르지 않은 호출입니다."},
				{key : "40106", value : "전송요구 종료시점을 경과했습니다."},
				{key : "40304", value : "최근 5년을 경과한 개인신용정보는 요청 할 수 없습니다."},
				{key : "40101", value : "개인신용정보 조회 권한 요청 중 오류가 발생하였습니다."},
				{key : "40105", value : "개인신용정보 조회 권한 요청 중 오류가 발생하였습니다."},
				{key : "00000", value : "개인신용정보 조회 권한 요청 중 오류가 발생하였습니다."},
				{key : "40102", value : "보안 또는 인증서 검증에 실패 하였습니다."},
				{key : "40103", value : "보안 또는 인증서 검증에 실패 하였습니다."},
				{key : "50009", value : "정기적 전송 가능 시간대가 아닙니다."},
				{key : "40305", value : "연결 요청 자산은 유효한 자산이 아닙니다."},
				{key : "40402", value : "연결 요청 자산은 유효한 자산이 아닙니다."},
				{key : "40403", value : "해당 기관에 보유한 자산이 없습니다."},
				{key : "99999", value : "해당 기관에 보유한 자산이 없습니다."},
				{key : "50008", value : "시스템 정기 점검 중입니다."},
				{key : "50005", value : "중계기관 이용기관 서비스 중 오류가 발생하였습니다."},
				{key : "50006", value : "중계기관 이용기관 서비스 중 오류가 발생하였습니다."},
				{key : "50007", value : "중계기관 이용기관 서비스 중 오류가 발생하였습니다."},
			],
			/////////////////////////////////////////////////////////////////

			//// 실패기관 재시도 관련 파라미터
			signListOne	: [],
			signListTwo : [],
			caOrgOne	: "",
			caOrgTwo	: "",
        }
	},
    mounted() {
		this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     
    },
    mixins: [
		commonMixin,
        popupMixin
	],
	computed:{
		//선택한 상세정보 갯수
		selAllCnt() {
			return  this.selectBankList.length + this.selectCardList.length + this.selectInvestList.length + this.selectInsuList.length 
					+ this.selectEfinList.length + this.selectCapitalList.length + this.selectTelecomList.length + this.selectUsuryList.length
					+ this.selectP2pList.length + this.selectPublicList.length
		},

		btnViewYn() {
			return this.selAllCnt > 0 ?	 false : true
		},

		//성공한 기관 존재 체크 (하나라도 있으면 true)
		hasSuccessOrg() {
			return this.bankYn || this.cardYn || this.investYn || this.insuYn || this.efinYn 
			|| this.capitalYn || this.ginsuYn || this.telecomYn || this.usuryYn || this.bondYn || this.p2pYn || this.publicYn
		}
	},
    methods: {
		fn_setDev() {
			// 접속환경 구분 (개발환경일 경우 실패기관 코드 보이지 않도록 설정하는 용도)
			return import.meta.env.VITE_ENV !== 'R' ? true : false
		},

        initComponent(param = {}) {
			// console.log(this.leadingZeros('5', 7))
			// console.log(this.leadingZeros('55', 7))
			// console.log(this.leadingZeros('555', 7))

			this.certDsc		= param.certDsc || ""
			this.userAgreeInfo 	= param.userAgreeInfo || {}
			this.asetJson 		= param.responseJson || {}
			this.ca_org_type	= param.ca_org_type || ""
			this.ca_org_name	= param.ca_org_name || ""
			this.attcCext		= param.attcCext || ""
			this.attcC			= param.attcC || ""
			this.tokenFlag		= param.tokenFlag || ""
			this.moduleList		= param.moduleList || []
			this.fail_org_list	= param.fail_org_list || []

			// 실패기관 연결 재시도에 필요한 파라미터
			this.cert_tx_id     = param.cert_tx_id || ""
			this.sign_tx_id     = param.sign_tx_id || ""
			this.telco_tycd		= param.telco_tycd || ""
			this.end_period		= param.end_period || ""

			// 연결기관관리 메뉴 관련 파라미터 설정
			this.isMramMod		= param.isMramMod || ""
			this.isBckYn		= param.isBckYn ? true : false

			// 실패기관 연결 재시도 관련 파라미터 (전체 기관 재시도 필요)
			this.signListOne	= param.signListOne || []
			this.signListTwo	= param.signListTwo || []
			this.caOrgOne		= param.caOrgOne || ""
			this.caOrgTwo		= param.caOrgTwo || ""

			this.getData()
		},
        getData() {
			if(this.isMramMod === '' || !this.isBckYn) {
				this.getArray()
				// this.getFailArray()	// 실패기관 리스트 필터링
				// 서비스 내 실패기관 리스트 존재 시 재연결버튼 활성화 여부 결정
				console.log(">>> 실패응답리스트 >>>> ", this.fail_org_list)
				if(this.fail_org_list.length > 0) {
					// 에러 코드 별 메시지 매핑
					for(let failItem of this.fail_org_list) {
						let errIdx = _.findIndex(this.errorMsg, d => d.key === failItem.rsp_code)

						if(errIdx > -1) {
							if(failItem.rsp_code === "00000") {
								failItem.rsp_code = "40001"
								failItem.rsp_msg = "연결 요청이 정상적으로 처리되지 않았습니다."
							} else if(failItem.rsp_code === "99999") {
								failItem.rsp_code = "40403"
								failItem.rsp_msg = "해당 기관에 보유한 자산이 없습니다."
							} else {
								failItem.rsp_msg = this.errorMsg[errIdx].value
							}
						}
					}

					// 재시도 버튼 show on/off 결정
					for(let failItem of this.fail_org_list) {
						console.log(">>>>> 실패응답코드 >>>>> ", failItem.rsp_code)
						if(	failItem.rsp_code === "40302" ||
							failItem.rsp_code === "50001" ||
							failItem.rsp_code === "50004" ||
							failItem.rsp_code === "50005" ||
							failItem.rsp_code === "50003"
						) {
							/**
							 * 자산목록이 없거나(40402) 존재하지 않는 고객이거나(95001) 토큰발급실패일 경우(99999) 가 아닌 연결실패 case의 경우
							 * 연결 재시도 버튼 show
							 */
							this.isShowRetryYn = true
							break;
						}
					}
				}

				let retryFailOrg = JSON.parse(sessionStorage.getItem('conFailInfo')) || []
				if(retryFailOrg.length > 0) {
					if(this.asetJson.success_org_list.length > 0) {
						// 목록 조회 성공이 있을경우
						for(let i=0; i<this.asetJson.success_org_list.length; i++) {
							let fIdx = _.findIndex(retryFailOrg, d => d.org_code === this.asetJson.success_org_list[i].org_code)
							if(fIdx > -1) {
								// 재시도 목록 조회 성공인 기관의 경우
								retryFailOrg[fIdx].isSucc = true
								retryFailOrg[fIdx].rsp_code = "00000"
								retryFailOrg[fIdx].rsp_msg = "성공"
							} else {
								// 재시도 목록 조회 실패인 기관의 경우
								for(let j=0; j<this.fail_org_list.length; j++) {
									let refIdx = _.findIndex(retryFailOrg, d => d.org_code === this.fail_org_list[j].org_code)
									if(refIdx > -1) {
										retryFailOrg[refIdx].isSucc = false
										retryFailOrg[refIdx].rsp_code = this.fail_org_list[j].rsp_code
										retryFailOrg[refIdx].rsp_msg = this.fail_org_list[j].rsp_msg
									}
								}
							}
						}
					} else {
						// 목록 조회 성공이 없을경우
						for(let i=0; i<this.fail_org_list.length; i++) {
							let refIdx = _.findIndex(retryFailOrg, d => d.org_code === this.fail_org_list[i].org_code)
							if(refIdx > -1) {
								retryFailOrg[refIdx].isSucc = false
								retryFailOrg[refIdx].rsp_code = this.fail_org_list[i].rsp_code
								retryFailOrg[refIdx].rsp_msg = this.fail_org_list[i].rsp_msg
							}
						}
					}

					const config = {
						params : {
							orgFailInfo : retryFailOrg
						},
						renderer : {
							component : COAR2014
						}
					}
					modalService.openSlidePagePopup(config).then()
				}
				
			}

			// 연결 성공 기관 수 count
			this.org_succ_cnt = this.bank_list.length + this.card_list.length + this.invest_list.length + this.insu_list.length + this.efin_list.length +
								this.capital_list.length + this.ginsu_list.length + this.telecom_list.length + this.usury_list.length + this.bond_list.length +
								this.p2p_list.length + this.public_list.length;

			// 화면 default :: 연결 성공 기관 자산 전체 체크
			this.$nextTick(() => {
				if(this.org_succ_cnt > 0) {
					this.$refs.checkAll.click()
				}
			})
		},

		// p2p 코드 명칭 변환
		fn_parseP2pType(type) {
			return _.find(this.p2pType, d => d.key === type).value
		},
		// 통신 코드 명칭 변환
		fn_parseTeleType(type) {
			return _.find(this.teleType, d => d.key === type).value
		},

		// 자산별 선택
		fn_sepAssetClick(event, orgList, orgCd, busIdx, bizDsc, perIdx, perKey, item) {

			// 1. 자산 상위 기관 체크
			let tmpCntList = []
			for(let i=0; i<this.$refs[orgCd].length; i++) {
				if(this.$refs[orgCd][i].checked) {
					tmpCntList.push(i)
				}
			}
			// 개수초과 로직 start
			if(tmpCntList.length > this.maxCnt && event.target.checked) {
				event.target.checked = false
				let alertMsg = "하나의 기관에 100개가 넘는 자산을<br>선택 할 경우 해당 기관의 전체 자산을<br> 선택하셔야 합니다."
				const confirm_config = {
					content 			: [alertMsg],
					title				: "",
					ALERT_CONFIRM_TEXT 	: "전체선택",
					ALERT_CANCEL_TEXT 	: "취소"	
				}
				modalService.confirm(confirm_config).then(text => {
					if(text === "취소") {
						this.$refs[orgCd][perIdx].checked = false
					} else {
						// 전체선택
						for(let i=0; i<this.$refs[orgCd].length; i++) {
							this.$refs[orgCd][i].checked = true
							orgList[busIdx].list[i].checked = true
							document.getElementById(orgCd + '_' + i).disabled = true
						}
					}
					this.$nextTick(() => {
						// 체크 count 위한 플래그 설정
						item.checkedCnt = this.fn_cntSelItem(item)

						// 최상위 '모든 자산 선택' 확인 후 체크
					})
				})
			} else {
				// 체크 count 위한 플래그 설정
				let chkItem = _.find(orgList[busIdx].list, d=>d.key === perKey)
				if(event.target.checked) { chkItem.checked = true }
				else { chkItem.checked = false }
				item.checkedCnt = this.fn_cntSelItem(item)

				// 선택 자산의 업권이 카드라면 하위단(포인트, 청구, 카드대출) 전체 체크 컨트롤
				if(bizDsc === 'card') {
					this.fn_selCardIndv(event, busIdx, perIdx)
				}

				// 모든 자산 체크 활성화 여부 확인
				this.fn_validAllChk(event)
			}

			
		},

		// 모든 자산 체크 활성화 여부 확인
		fn_validAllChk(evt) {
			if(!evt.target.checked) {
				if(this.$refs.checkAll.checked) {
					this.$refs.checkAll.checked = false
					this.isAllChked = false
				}
			} else {
				// 업권 내 체크 상태를 확인하여 체크 상태가 off일 시 작업중단
				// 전체 체크상태가 활성화 상태일시 '전체선택' 체크 활성화
				if(this.bankYn) {
					for(let i=0; i<this.bank_list.length; i++) {
						if(this.bank_list[i].checkedCnt != this.bank_list[i].list.length) return
					}
				}
				if(this.cardYn) {
					for(let i=0; i<this.card_list.length; i++) {
						if(this.card_list[i].checkedCnt != this.card_list[i].list.length) return
					}
				}
				if(this.investYn) {
					for(let i=0; i<this.invest_list.length; i++) {
						if(this.invest_list[i].checkedCnt != this.invest_list[i].list.length) return
					}
				}
				if(this.insuYn) {
					for(let i=0; i<this.insu_list.length; i++) {
						if(this.insu_list[i].checkedCnt != this.insu_list[i].list.length) return
					}
				}
				if(this.efinYn) {
					for(let i=0; i<this.efin_list.length; i++) {
						if(this.efin_list[i].checkedCnt != this.efin_list[i].list.length) return
					}
				}
				if(this.capitalYn) {
					for(let i=0; i<this.capital_list.length; i++) {
						if(this.capital_list[i].checkedCnt != this.capital_list[i].list.length) return
					}
				}
				if(this.ginsuYn) {
					for(let i=0; i<this.ginsu_list.length; i++) {
						if(this.ginsu_list[i].checkedCnt != this.ginsu_list[i].list.length) return
					}
				}
				if(this.telecomYn) {
					for(let i=0; i<this.telecom_list.length; i++) {
						if(this.telecom_list[i].checkedCnt != this.telecom_list[i].list.length) return
					}
				}
				if(this.usuryYn) {
					for(let i=0; i<this.usury_list.length; i++) {
						if(this.usury_list[i].checkedCnt != this.usury_list[i].list.length) return
					}
				}
				if(this.bondYn) {
					for(let i=0; i<this.bond_list.length; i++) {
						if(this.bond_list[i].checkedCnt != this.bond_list[i].list.length) return
					}
				}
				if(this.p2pYn) {
					for(let i=0; i<this.p2p_list.length; i++) {
						if(this.p2p_list[i].checkedCnt != this.p2p_list[i].list.length) return
					}
				}
				if(this.publicYn){
					for(let i=0; i<this.public_list.length; i++) {
						if(this.public_list[i].checkedCnt != this.public_list[i].list.length) return
					}
				}

				this.$refs.checkAll.checked = true
				this.isAllChked = true
			}
		},

		// 카드업권 하위 체크 (포인트, 청구, 카드대출) 컨트롤
		fn_selCardIndv(evt, busIdx, perIdx) {
			console.log('카드 하위 업권 체크박스 클릭 ##############################################')
			console.log(evt);
			console.log(busIdx);
			console.log(perIdx);

			if(evt.target.checked) {	// 체크 on 이벤트일 경우
				// 해당 기관의 자산 첫 체크인지 확인
				let isAnyChecked = false
				for(let i=0; i<this.card_list[busIdx].list.length; i++) {
					// 현재 체크 타겟일 경우 pass
					if(perIdx === i) continue
					// 다른 체크된 요소가 있는지 확인
					if(this.$refs[this.card_list[busIdx].org_code][i].checked) {
						isAnyChecked = true
						break
					}
				}

				if(!isAnyChecked) {
					// 기관의 다른 체크 활성화된 요소가 없을경우 하위 체크 on
					this.$refs[this.card_list[busIdx].org_code+'_'+busIdx+'_point'][0].checked = true
					this.$refs[this.card_list[busIdx].org_code+'_'+busIdx+'_rev'][0].checked = true
					this.$refs[this.card_list[busIdx].org_code+'_'+busIdx+'_loan'][0].checked = true
				}
			} else {	// 체크 off 이벤트일 경우
				// 해당 기관의 자산이 전부 체크 해제되었는지 확인
				let isAllCheckOff = false
				for(let i=0; i<this.card_list[busIdx].list.length; i++) {
					// 현재 체크 타겟일 경우 pass
					if(perIdx === i && this.card_list[busIdx].list.length > 1) continue
					// 다른 자산 전부 체크 해제 확인
					if(this.$refs[this.card_list[busIdx].org_code][i].checked) {
						isAllCheckOff = false
						break
					} else {
						isAllCheckOff = true
					}
				}

				if(isAllCheckOff) {
					// 기관의 체크 요소가 전부 비활성화일 경우 하위 체크 off
					this.$refs[this.card_list[busIdx].org_code+'_'+busIdx+'_point'][0].checked = false
					this.$refs[this.card_list[busIdx].org_code+'_'+busIdx+'_rev'][0].checked = false
					this.$refs[this.card_list[busIdx].org_code+'_'+busIdx+'_loan'][0].checked = false
				}
			}
		},

		// 자산별 체크 카운트
		fn_cntSelItem(orgItem) {
			let tmpCnt = 0
			for(const org of orgItem.list) {
				if(org.checked) {
					tmpCnt++
				}
			}
			return tmpCnt
		},

		/**
		 * fn_sepCardDtlClick
		 * 카드 세부 체크 선택
		 * 선택 타입 ('point' : 포인트, 'rev' : 청구.결제.리볼빙, 'loan' : 카드대출)
		 * event : 발생 이벤트
		 * busIdx : 리스트 내 기관 인덱스
		 */
		fn_sepCardDtlClick(event, item, busIdx) {
			if(event.target.checked) {

				// 체크 on 이벤트
				// 기관 내 자산 체크상태가 전부 비활성화 상태일 때 자산 체크 상태 on 설정
				let isAllCheckOff = false

				for(let i=0; i<this.card_list[busIdx].list.length; i++) {
					if(this.$refs[this.card_list[busIdx].org_code][i].checked) return
					else isAllCheckOff = true
				}
				if(isAllCheckOff) {
					// 기관 내 카드자산 체크 전체 on
					for(let i=0; i<this.card_list[busIdx].list.length; i++) {
						this.$refs[this.card_list[busIdx].org_code][i].checked = true
						//this.card_list[busIdx].list[i].checked = true
						this.selectCardList.push(this.card_list[busIdx].list[i])
					}
					item.checkedCnt = this.fn_cntSelItem(item)
					this.fn_validAllChk(event)
				}

			} else {
				// 체크 off 이벤트
				// 포인트, 청구, 카드대출 체크가 전부 비활성화일 경우 기관 내 전체 자산 체크 off
				let isChkPoint = this.$refs[this.card_list[busIdx].org_code+'_'+busIdx+'_point'][0].checked
				let isChkRev = this.$refs[this.card_list[busIdx].org_code+'_'+busIdx+'_rev'][0].checked
				let isChkLoan = this.$refs[this.card_list[busIdx].org_code+'_'+busIdx+'_loan'][0].checked

				if(!isChkPoint && !isChkRev && !isChkLoan) {


					// 기관 내 카드자산 체크 전체 off
					for(let i=0; i<this.card_list[busIdx].list.length; i++) {
						this.$refs[this.card_list[busIdx].org_code][i].checked = false
						//this.card_list[busIdx].list[i].checked = false
						this.selectCardList.splice(this.selectCardList.findIndex(item=> item.key === this.card_list[busIdx].list[i].key) , 1)
					}
					item.checkedCnt = this.fn_cntSelItem(item)
					this.fn_validAllChk(event)
				}
			}
			
		},

		// 전체 선택 클릭
		fn_allAsetSel(flag) {
			// 모든 자산 한번에 선택
			let allInputChecked = this.$refs[flag].checked
			
			if(this.bankYn) {
				// 은행있을시
				if(allInputChecked){
					let dtlList = [];
					this.bank_list.forEach(item=>{
						dtlList.push(...item.list)
					})
					this.selectBankList = []
					this.selectBankList.push(...dtlList)
				}else{
					this.selectBankList = []
				}
				

				// for(let i=0; i<this.bank_list.length; i++) {
				// 	// 기관 하위 자산 체크박스 체크 활성화
				// 	for(let j=0; j<this.bank_list[i].list.length; j++) {
				// 		this.$refs[this.bank_list[i].list[j].org_code][j].checked = allInputChecked ? true : false
				// 		this.bank_list[i].list[j].checked = allInputChecked ? true : false	// 리스트 내 카운팅 위한 flag 설정
				// 	}
				// 	// 체크 카운팅
				// 	this.bank_list[i].checkedCnt = this.fn_cntSelItem(this.bank_list[i])
				// }
				// // 자산 전체 선택 checkbox disable 처리 설정
				// this.fn_allAssetDisable(this.bank_list, allInputChecked ? true : false)
			}
			if(this.cardYn) {
				// 카드있을시

				// if(allInputChecked){
				// 	let dtlList = [];
				// 	this.card_list.forEach(item=>{
				// 		dtlList.push(...item.list)
				// 		//this.selectCardPointList.push(Object.assign(item,{scope:'card.point'}))
				// 		//this.selectCardRevList.push(Object.assign(item,{scope:'card.bill'}))
				// 		//this.selectCardLoanList.push(Object.assign(item,{scope:'card.loan'}))
				// 	})
				// 	this.selectCardList.push(...dtlList)
					
				// }else{
				// 	this.selectCardList = []
				// 	//this.selectCardPointList = []
				// 	//this.selectCardRevList = []
				// 	//this.selectCardLoanList = []
				// }
				this.selectCardList = [];
				for(let i=0; i<this.card_list.length; i++) {
					// 기관 하위 자산 체크박스 체크 활성화
					for(let j=0; j<this.card_list[i].list.length; j++) {
						allInputChecked ? this.selectCardList.push(this.card_list[i].list[j]) : this.selectCardList = [];
					}
					// 포인트, 청구.결제.리볼빙, 카드대출 체크 활성화
					this.$refs[this.card_list[i].org_code+'_'+i+'_point'][0].checked = allInputChecked ? true : false
					this.$refs[this.card_list[i].org_code+'_'+i+'_rev'][0].checked = allInputChecked ? true : false
					this.$refs[this.card_list[i].org_code+'_'+i+'_loan'][0].checked = allInputChecked ? true : false
				}
				// 자산 전체 선택 checkbox disable 처리 설정
				this.fn_allAssetDisable(this.card_list, allInputChecked ? true : false)
			
				
			}
			if(this.investYn) {
				// 증권있을시
				if(allInputChecked){
					let dtlList = [];
					this.invest_list.forEach(item=>{
						dtlList.push(...item.list)
					})
					this.selectInvestList = []
					this.selectInvestList.push(...dtlList)

				}else{
					this.selectInvestList = []
				}
			
				// for(let i=0; i<this.invest_list.length; i++) {
				// 	// 기관 하위 자산 체크박스 체크 활성화
				// 	for(let j=0; j<this.invest_list[i].list.length; j++) {
				// 		this.$refs[this.invest_list[i].list[j].org_code][j].checked = allInputChecked ? true : false
				// 		this.invest_list[i].list[j].checked = allInputChecked ? true : false	// 리스트 내 카운팅 위한 flag 설정
				// 	}
				// 	// 체크 카운팅
				// 	this.invest_list[i].checkedCnt = this.fn_cntSelItem(this.invest_list[i])
				// }
				// // 자산 전체 선택 checkbox disable 처리 설정
				// this.fn_allAssetDisable(this.invest_list, allInputChecked ? true : false)
			}
			if(this.insuYn) {
				// 보험있을시
				if(allInputChecked){
					let dtlList = [];
					this.insu_list.forEach(item=>{
						dtlList.push(...item.list)
					})
					this.selectInsuList = []
					this.selectInsuList.push(...dtlList)

				}else{
					this.selectInsuList = []
				}
			
				// for(let i=0; i<this.insu_list.length; i++) {
				// 	// 기관 하위 자산 체크박스 체크 활성화
				// 	for(let j=0; j<this.insu_list[i].list.length; j++) {
				// 		this.$refs[this.insu_list[i].list[j].org_code][j].checked = allInputChecked ? true : false
				// 		this.insu_list[i].list[j].checked = allInputChecked ? true : false	// 리스트 내 카운팅 위한 flag 설정
				// 	}
				// 	// 체크 카운팅
				// 	this.insu_list[i].checkedCnt = this.fn_cntSelItem(this.insu_list[i])
				// }
				// // 자산 전체 선택 checkbox disable 처리 설정
				// this.fn_allAssetDisable(this.insu_list, allInputChecked ? true : false)
			}
			if(this.efinYn) {
				// 페이있을시
				if(allInputChecked){
					let dtlList = [];
					this.efin_list.forEach(item=>{
						dtlList.push(...item.list)
					})
					this.selectEfinList = []
					this.selectEfinList.push(...dtlList)

				}else{
					this.selectEfinList = []
				}
				// for(let i=0; i<this.efin_list.length; i++) {
				// 	// 기관 하위 자산 체크박스 체크 활성화
				// 	for(let j=0; j<this.efin_list[i].list.length; j++) {
				// 		this.$refs[this.efin_list[i].list[j].org_code][j].checked = allInputChecked ? true : false
				// 		this.efin_list[i].list[j].checked = allInputChecked ? true : false	// 리스트 내 카운팅 위한 flag 설정
				// 	}
				// 	// 체크 카운팅
				// 	this.efin_list[i].checkedCnt = this.fn_cntSelItem(this.efin_list[i])
				// }
				// // 자산 전체 선택 checkbox disable 처리 설정
				// this.fn_allAssetDisable(this.efin_list, allInputChecked ? true : false)
			}
			if(this.capitalYn) {
				// 할부금융있을시
				if(allInputChecked){
					let dtlList = [];
					this.capital_list.forEach(item=>{
						dtlList.push(...item.list)
					})
					this.selectCapitalList = []
					this.selectCapitalList.push(...dtlList)

				}else{
					this.selectCapitalList = []
				}
				// for(let i=0; i<this.capital_list.length; i++) {
				// 	// 기관 하위 자산 체크박스 체크 활성화
				// 	for(let j=0; j<this.capital_list[i].list.length; j++) {
				// 		this.$refs[this.capital_list[i].list[j].org_code][j].checked = allInputChecked ? true : false
				// 		this.capital_list[i].list[j].checked = allInputChecked ? true : false	// 리스트 내 카운팅 위한 flag 설정
				// 	}
				// 	// 체크 카운팅
				// 	this.capital_list[i].checkedCnt = this.fn_cntSelItem(this.capital_list[i])
				// }
				// // 자산 전체 선택 checkbox disable 처리 설정
				// this.fn_allAssetDisable(this.capital_list, allInputChecked ? true : false)
			}
			if(this.ginsuYn) {
				// 마이데이터 확대개발 대상 제외
				// 보증보험있을시
				// for(let i=0; i<this.ginsu_list.length; i++) {
				// 	// 기관 하위 자산 체크박스 체크 활성화
				// 	for(let j=0; j<this.ginsu_list[i].list.length; j++) {
				// 		this.$refs[this.ginsu_list[i].list[j].org_code][j].checked = allInputChecked ? true : false
				// 		this.ginsu_list[i].list[j].checked = allInputChecked ? true : false	// 리스트 내 카운팅 위한 flag 설정
				// 	}
				// 	// 체크 카운팅
				// 	this.ginsu_list[i].checkedCnt = this.fn_cntSelItem(this.ginsu_list[i])
				// }
				// // 자산 전체 선택 checkbox disable 처리 설정
				// this.fn_allAssetDisable(this.ginsu_list, allInputChecked ? true : false)
			}
			if(this.telecomYn) {
				// 통신있을시
				if(allInputChecked){
					let dtlList = [];
					this.telecom_list.forEach(item=>{
						dtlList.push(...item.list)
					})
					this.selectTelecomList = []
					this.selectTelecomList.push(...dtlList)
				}else{
					this.selectTelecomList = []
				}
				
				// for(let i=0; i<this.telecom_list.length; i++) {
				// 	// 기관 하위 자산 체크박스 체크 활성화
				// 	for(let j=0; j<this.telecom_list[i].list.length; j++) {
				// 		this.$refs[this.telecom_list[i].list[j].org_code][j].checked = allInputChecked ? true : false
				// 		this.telecom_list[i].list[j].checked = allInputChecked ? true : false	// 리스트 내 카운팅 위한 flag 설정
				// 	}
				// 	// 체크 카운팅
				// 	this.telecom_list[i].checkedCnt = this.fn_cntSelItem(this.telecom_list[i])
				// }
				// // 자산 전체 선택 checkbox disable 처리 설정
				// this.fn_allAssetDisable(this.telecom_list, allInputChecked ? true : false)
			}
			if(this.usuryYn) {
				// 대부있을시
				if(allInputChecked){
					let dtlList = [];
					this.usury_list.forEach(item=>{
						dtlList.push(...item.list)
					})
					this.selectUsuryList = []
					this.selectUsuryList.push(...dtlList)
				}else{
					this.selectUsuryList = []
				}
				// for(let i=0; i<this.usury_list.length; i++) {
				// 	// 기관 하위 자산 체크박스 체크 활성화
				// 	for(let j=0; j<this.usury_list[i].list.length; j++) {
				// 		this.$refs[this.usury_list[i].list[j].org_code][j].checked = allInputChecked ? true : false
				// 		this.usury_list[i].list[j].checked = allInputChecked ? true : false	// 리스트 내 카운팅 위한 flag 설정
				// 	}
				// 	// 체크 카운팅
				// 	this.usury_list[i].checkedCnt = this.fn_cntSelItem(this.usury_list[i])
				// }
				// // 자산 전체 선택 checkbox disable 처리 설정
				// this.fn_allAssetDisable(this.usury_list, allInputChecked ? true : false)
			}
			if(this.bondYn) {
				// 마이데이터 확대개발 대상 제외
				// 채권있을시
				// for(let i=0; i<this.bond_list.length; i++) {
				// 	// 기관 하위 자산 체크박스 체크 활성화
				// 	for(let j=0; j<this.bond_list[i].list.length; j++) {
				// 		this.$refs[this.bond_list[i].list[j].org_code][j].checked = allInputChecked ? true : false
				// 		this.bond_list[i].list[j].checked = allInputChecked ? true : false	// 리스트 내 카운팅 위한 flag 설정
				// 	}
				// 	// 체크 카운팅
				// 	this.bond_list[i].checkedCnt = this.fn_cntSelItem(this.bond_list[i])
				// }
				// // 자산 전체 선택 checkbox disable 처리 설정
				// this.fn_allAssetDisable(this.bond_list, allInputChecked ? true : false)
			}
			if(this.p2pYn) {
				if(allInputChecked){
					let dtlList = [];
					this.p2p_list.forEach(item=>{
						dtlList.push(...item.list)
					})
					this.selectP2pList = []
					this.selectP2pList.push(...dtlList)
				}else{
					this.selectP2pList = []
				}
				// // p2p있을시
				// for(let i=0; i<this.p2p_list.length; i++) {
				// 	// 기관 하위 자산 체크박스 체크 활성화
				// 	for(let j=0; j<this.p2p_list[i].list.length; j++) {
				// 		this.$refs[this.p2p_list[i].list[j].org_code][j].checked = allInputChecked ? true : false
				// 		this.p2p_list[i].list[j].checked = allInputChecked ? true : false		// 리스트 내 카운팅 위한 flag 설정
				// 	}
				// 	// 체크 카운팅
				// 	this.p2p_list[i].checkedCnt = this.fn_cntSelItem(this.p2p_list[i])
				// }
				// // 자산 전체 선택 checkbox disable 처리 설정
				// this.fn_allAssetDisable(this.p2p_list, allInputChecked ? true : false)
			}
			if(this.publicYn) {
				if(allInputChecked){
					let dtlList = [];
					this.public_list.forEach(item=>{
						dtlList.push(...item.list)
					})
					this.selectPublicList = []
					this.selectPublicList.push(...dtlList)
				}else{
					this.selectPublicList = []
				}

				// 공공있을시
				// for(let i=0; i<this.public_list.length; i++) {
				// 	// 기관 하위 자산 체크박스 체크 활성화
				// 	for(let j=0; j<this.public_list[i].list.length; j++) {
				// 		this.$refs[this.public_list[i].list[j].org_code][j].checked = allInputChecked ? true : false
				// 		this.public_list[i].list[j].checked = allInputChecked ? true : false		// 리스트 내 카운팅 위한 flag 설정
				// 	}
				// 	// 체크 카운팅
				// 	this.public_list[i].checkedCnt = this.fn_cntSelItem(this.public_list[i])
				// }
				// // 자산 전체 선택 checkbox disable 처리 설정
				// this.fn_allAssetDisable(this.public_list, allInputChecked ? true : false)
			}

			
			this.isAllChked = allInputChecked ? true : false
		},

		// 기관별 전체선택 or 자산 모두 선택 시 disable 설정/해제
		fn_allAssetDisable(obj, flag) {
			let objList = obj || []

			if(flag === true) {
				for(let i=0; i<objList.length; i++) {
					if(objList[i].list.length > this.maxCnt) {
						for(let j=0; j<objList[i].list.length; j++) {
							document.getElementById(objList[i].org_code + '_' + j).disabled = true
						}
					}
				}
			} else {
				for(let i=0; i<objList.length; i++) {
					for(let j=0; j<objList[i].list.length; j++) {
						document.getElementById(objList[i].org_code + '_' + j).disabled = false
					}
				}
			}
		},

		// 정보제공자 업권별 목록 제공 api 응답 파라미터를 통한 업권별 기관 리스트 추출
		getArray() {
			this.bank_list = []
			this.card_list = []
			this.invest_list = []
			this.insu_list = []
			this.efin_list = []
			this.capital_list = []
			this.ginsu_list = []
			this.telecom_list = []
			this.usury_list = []
			this.bond_list = []
			this.p2p_list = []
			this.public_list = []
			this.dc_list = [] // 퇴직연금 추가 - 2023.07.19 by CS533461

			if(this.asetJson.irp_cnt > 0){

				//성공한 기관중  irp만 filter
				let sIrpList = this.asetJson.irp_list.filter(irpItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === irpItem.org_code).length > 0)

				sIrpList.forEach(result => { 
					let sItem = {"prod_name" : result.prod_name
									, "key":result.account_num
									, "org_code":result.org_code
									, "org_biz_code":result.org_biz_code
									, "scope":result.scope
									, "org_name":this.asetJson.success_org_list.find(item => item.org_code === result.org_code).org_name}
									
					switch (result.org_biz_code) {
						case "bank": this.bank_list.push(sItem)
							break;
						case "invest":this.invest_list.push(sItem)
							break;
						case "insu": this.insu_list.push(sItem)
							break;
					}
				})
	
			}
			if(this.asetJson.bank_cnt > 0){
				let sBankList = this.asetJson.bank_list.filter(bankItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === bankItem.org_code).length > 0)
				sBankList.forEach(result => {
					if(result.seqno){
						this.bank_list.push({"prod_name" : result.prod_name
											, "key":result.account_num
											, "org_code":result.org_code
											, "org_biz_code":result.org_biz_code
											, "scope":result.scope
											, "org_name":this.asetJson.success_org_list.find(item => item.org_code === result.org_code).org_name
											, "seqno" : result.seqno})
					}else{
						this.bank_list.push({"prod_name" : result.prod_name
											, "key":result.account_num
											, "org_code":result.org_code
											, "org_biz_code":result.org_biz_code
											, "scope":result.scope
											, "org_name":this.asetJson.success_org_list.find(item => item.org_code === result.org_code).org_name})

					}
				})
				
			}
			if(this.asetJson.card_cnt > 0){

				let sCardList = this.asetJson.card_list.filter(cardItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === cardItem.org_code).length > 0)
				sCardList.forEach(item => {
					this.card_list.push({"prod_name":item.card_name
										, "key":item.card_id
										, "card_num":item.card_num 
										, "org_code":item.org_code
										, "org_biz_code":item.org_biz_code
										, "scope":item.scope
										, "org_name":this.asetJson.success_org_list.find(result => item.org_code === result.org_code).org_name
										, "point":false
										, "bill":false
										, "loan":false})
				})
			}
			if(this.asetJson.prepaid_cnt > 0){
				let sPrePaidList = this.asetJson.prepaid_list.filter(prepaidItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === prepaidItem.org_code).length > 0)
					sPrePaidList.forEach(item => {
						this.card_list.push({"prod_name":item.pp_name
											, "key":item.pp_id
											, "org_code":item.org_code
											, "org_biz_code":item.org_biz_code
											, "scope":item.scope
											, "org_name":this.asetJson.success_org_list.find(result => item.org_code === result.org_code).org_name})
					})
					
			}

			if(this.asetJson.invest_cnt > 0){
				
				let sInvestList = this.asetJson.invest_list.filter(investItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === investItem.org_code).length > 0)
					sInvestList.forEach(item => {
						this.invest_list.push({"prod_name":item.account_name
											, "key":item.account_num
											, "org_code":item.org_code
											, "org_biz_code":item.org_biz_code
											, "scope":item.scope
											, "org_name":this.asetJson.success_org_list.find(result => item.org_code === result.org_code).org_name})
					})
					

			}
			if(this.asetJson.isr_cnt > 0){
		

				let sIsrList = this.asetJson.isr_list.filter(isrItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === isrItem.org_code).length > 0)
					sIsrList.forEach(item => {
						this.insu_list.push({"prod_name":item.prod_name
											, "key":item.insu_num
											, "org_code":item.org_code
											, "org_biz_code":item.org_biz_code
											, "scope":item.scope
											, "org_name":this.asetJson.success_org_list.find(result => item.org_code === result.org_code).org_name})
					})
					
			}
			if(this.asetJson.isr_loan_cnt > 0){
				
				let sIsrloanList = this.asetJson.isr_loan_list.filter(isrLoanItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === isrLoanItem.org_code).length > 0)
					sIsrloanList.forEach(item => {
						this.insu_list.push({"prod_name":item.prod_name
											, "key":item.account_num
											, "org_code":item.org_code
											, "org_biz_code":item.org_biz_code
											, "scope":item.scope
											, "org_name":this.asetJson.success_org_list.find(result => item.org_code === result.org_code).org_name})
					})
				
			}

			if(this.asetJson.isr_atisr_cnt > 0){
			
				let sIsrAtisrList = this.asetJson.isr_atisr_list.filter(isrAtisrItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === isrAtisrItem.org_code).length > 0)
					sIsrAtisrList.forEach(item => {
						this.insu_list.push({"prod_name":item.prod_name
											, "key":item.insu_num
											, "org_code":item.org_code
											, "org_biz_code":item.org_biz_code
											, "scope":item.scope
											, "org_name":this.asetJson.success_org_list.find(result => item.org_code === result.org_code).org_name})
					})
				
			}
			if(this.asetJson.efin_ppy_cnt > 0){
				let sEfinPpyList = this.asetJson.efin_ppy_list.filter(efinPpyItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === efinPpyItem.org_code).length > 0)
					sEfinPpyList.forEach(item => {
						this.efin_list.push({"prod_name":item.fob_name
											, "key":item.fob_id
											, "org_code":item.org_code
											, "org_biz_code":item.org_biz_code
											, "scope":item.scope
											, "org_name":this.asetJson.success_org_list.find(result => item.org_code === result.org_code).org_name})
						})
				
			}
			if(this.asetJson.efin_acc_cnt > 0){
				let sEfinAccList = this.asetJson.efin_acc_list.filter(efinItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === efinItem.org_code).length > 0)
					sEfinAccList.forEach(item => {
						this.efin_list.push({"prod_name":item.account_id
											, "key":item.sub_key
											, "org_code":item.org_code
											, "org_biz_code":item.org_biz_code
											, "scope":item.scope
											, "org_name":this.asetJson.success_org_list.find(result => item.org_code === result.org_code).org_name})
					})
			}
			if(this.asetJson.capital_cnt > 0){
	
				let sCapitalList = this.asetJson.capital_list.filter(capItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === capItem.org_code).length > 0)
					sCapitalList.forEach(result => {
						if(result.seqno){
							this.capital_list.push({"prod_name" : result.prod_name
												, "key":result.account_num
												, "org_code":result.org_code
												, "org_biz_code":result.org_biz_code
												, "scope":result.scope
												, "org_name":this.asetJson.success_org_list.find(item => item.org_code === result.org_code).org_name
												, "seqno" : result.seqno})
						}else{
							this.capital_list.push({"prod_name" : result.prod_name
												, "key":result.account_num
												, "org_code":result.org_code
												, "org_biz_code":result.org_biz_code
												, "scope":result.scope
												, "org_name":this.asetJson.success_org_list.find(item => item.org_code === result.org_code).org_name})

						}
					})
			}
			if(this.asetJson.gi_cnt > 0){
				let sGiList = this.asetJson.gi_list.filter(giItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === giItem.org_code).length > 0)
					sGiList.forEach(item => {
						this.gi_list.push({"prod_name":item.prod_name
											, "key":item.insu_num
											, "org_code":item.org_code
											, "org_biz_code":item.org_biz_code
											, "scope":item.scope
											, "org_name":this.asetJson.success_org_list.find(result => item.org_code === result.org_code).org_name})
					})
			}
			if(this.asetJson.telecom_cnt > 0){
				let sTelecomList = this.asetJson.telecom_list.filter(telItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === telItem.org_code).length > 0)
					sTelecomList.forEach(item => {
						this.telecom_list.push({"prod_name":item.telecom_num
											, "type":item.type
											, "key":item.mgmt_id
											, "telecom_num":item.telecom_num
											, "org_code":item.org_code
											, "org_biz_code":item.org_biz_code
											, "scope":item.scope
											, "org_name":this.asetJson.success_org_list.find(result => item.org_code === result.org_code).org_name})
					})
			}
			//bond
			if(this.asetJson.bond_cnt > 0){

				let sBondList = this.asetJson.bond_list.filter(bondItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === bondItem.org_code).length > 0)
				sBondList.forEach(result => {
					switch(result.org_biz_code){
						case 'bond' :
						this.bond_list.push({"prod_name" : result.bond_num
												, "key":result.bond_num
												, "org_code":result.org_code
												, "org_biz_code":result.org_biz_code
												, "scope":result.scope
												, "org_name":this.asetJson.success_org_list.find(item => item.org_code === result.org_code).org_name
												})
						break;
						case 'usury':
						this.usury_list.push({"prod_name" : result.bond_num
												, "key":result.bond_num
												, "org_code":result.org_code
												, "org_biz_code":result.org_biz_code
												, "scope":result.scope
												, "org_name":this.asetJson.success_org_list.find(item => item.org_code === result.org_code).org_name
												})
							break;
					}
				})

			}
			
			if(this.asetJson.p2pln_cnt > 0){

				let sP2pLnList = this.asetJson.p2pln_list.filter(p2plnItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === p2plnItem.org_code).length > 0)
				sP2pLnList.forEach(item => {
					this.p2p_list.push({"prod_name":item.lending_id
										, "type":item.type
										, "key":item.lending_id
										, "lending_amt":item.lending_amt
										, "org_code":item.org_code
										, "org_biz_code":item.org_biz_code
										, "scope":item.scope
										, "org_name":this.asetJson.success_org_list.find(result => item.org_code === result.org_code).org_name})
				})				
		
			}

			//p2p invest
			if(this.asetJson.p2piv_cnt > 0){
				let sP2pivList = this.asetJson.p2piv_list.filter(p2pivItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === p2pivItem.org_code).length > 0)
				sP2pivList.forEach(item => {
					this.p2p_list.push({"prod_name":item.invest_id
										, "type":item.type
										, "key":item.invest_id
										, "org_code":item.org_code
										, "invest_amt" : item.invest_amt
										, "org_biz_code":item.org_biz_code
										, "scope":item.scope
										, "org_name":this.asetJson.success_org_list.find(result => item.org_code === result.org_code).org_name})
				})
			}

			// DC
			if(this.asetJson.dc_cnt > 0){

				//성공한 기관중  dc만 filter
				let sDcList = this.asetJson.dc_list.filter(dcItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === dcItem.org_code).length > 0)

				sDcList.forEach(result => { 
					let sItem = {
						"prod_name" : result.dc_name
						, "type": result.type
						, "key":result.dc_num
						, "org_code":result.org_code
						, "org_biz_code":result.org_biz_code
						, "scope":result.scope
						, "org_name":this.asetJson.success_org_list.find(item => item.org_code === result.org_code).org_name
					}
									
					switch (result.org_biz_code) {
						case "bank": this.bank_list.push(sItem)
							break;
						case "invest":this.invest_list.push(sItem)
							break;
						case "insu": this.insu_list.push(sItem)
							break;
					}
				})
			}

			//public
			if(this.asetJson.public_cnt > 0){
				this.public_list.push(...this.asetJson.public_list.filter(publicItem => this.asetJson.success_org_list.filter(successItem => successItem.org_code === publicItem.org_code).length > 0)
											.map(result => {return {"key":result.cert_id
																	, "org_code":result.org_code
																	, "org_biz_code":"public"
																	, "cert_nm" : result.cert_nm
																	, "scope":result.scope
																	, "org_name":this.asetJson.success_org_list.find(item => item.org_code === result.org_code).org_name}}))
			}

			if(this.bank_list.length > 0){
				this.bank_list = this.sortArray(this.bank_list)
				this.bankYn = true
			}
			if(this.invest_list.length > 0){
				this.invest_list = this.sortArray(this.invest_list)
				this.investYn = true
			}
			if(this.card_list.length > 0){
				this.card_list = this.sortArray(this.card_list)
				this.cardYn = true
			}
			if(this.insu_list.length > 0){
				this.insu_list = this.sortArray(this.insu_list)
				this.insuYn = true
			}
			if(this.efin_list.length > 0){
				this.efin_list = this.sortArray(this.efin_list)
				this.efinYn = true
			}
			if(this.capital_list.length > 0){
				this.capital_list = this.sortArray(this.capital_list)
				this.capitalYn = true
			}
			if(this.ginsu_list.length > 0){
				this.ginsu_list = this.sortArray(this.ginsu_list)
				this.ginsuYn = true
			}			
			if(this.telecom_list.length > 0){
				this.telecom_list = this.sortArray(this.telecom_list)
				this.telecomYn = true
			}

			if(this.usury_list.length > 0){
				this.usury_list = this.sortArray(this.usury_list)
				this.usuryYn = true
			}
			if(this.bond_list.length > 0){
				this.bond_list = this.sortArray(this.bond_list)
				this.bondYn = true
			}
			if(this.p2p_list.length > 0){
				this.p2p_list = this.sortArray(this.p2p_list)
				this.p2pYn = true
			}
			if(this.public_list.length > 0){
				this.public_list = this.sortArray(this.public_list)
				this.publicYn = true
			}
		},
		sortArray(objArray){
			const list = objArray || []

			const result = _.chain(list)
				.uniqBy('org_code')
				.map(d => {
					return {
						checkedCnt : 0,
						org_code : d.org_code,
						org_name : d.org_name,
						list : _.filter(list, {org_code : d.org_code, org_name : d.org_name}),
					}
				})
				.orderBy('org_code', 'desc')
				.value()
			return result
		},

		// 문자열 지정 길이만큼 앞에 0붙이기
		leadingZeros(n, digits) {
			let zero = ''
			n = n.toString()

			if(n.length < digits) {
				for(let i=0; i<digits-n.length; i++) {
					zero += '0'
				}
			}

			return zero+n
		},

		// 실패기관 연결 재시도
		fn_reTryConnect() {
			sessionStorage.removeItem('conFailInfo')

			let storeOrgF = []
			for(let i=0; i<this.fail_org_list.length; i++) {
				if(this.fail_org_list[i].rsp_code !== "40402" && this.fail_org_list[i].rsp_code !== "99999" && this.fail_org_list[i].rsp_code !== "95001") {
					// 에러케이스 중 자산이없거나 토큰발급에 실패한 기관에 대해서는 연결 재시도 제외
					storeOrgF.push({"org_code" : this.fail_org_list[i].org_code, "org_name" : this.fail_org_list[i].org_name})
				}
			}

			// 실패기관 정보 session 저장
			sessionStorage.setItem('conFailInfo', JSON.stringify(storeOrgF))

			// 이어하기와 같은 api를 호출하여 COAR2007 부터 재시도
			const config = {
				url : "/co/ar/00r01",
				data : {
					"mydtCusno" : this.getUserInfo("mydtCusno")
				}
			}
			apiService.call(config).then(response => {
				/**
				 * COAR2007 오픈
				 * getAsetList 부터 재시도
				 */
				const config_failRetry = {
					component : COAR2007,
					params : {
						userAgreeInfo 	: this.userAgreeInfo,
						ca_org_type 	: this.ca_org_type,
						ca_org_name 	: this.ca_org_name,
						certDsc 		: this.certDsc,
						moduleList 		: this.moduleList,
						attcC 			: this.attcC,
						attcCext 		: this.attcCext,
						cert_tx_id 		: this.cert_tx_id,
						sign_tx_id 		: this.sign_tx_id,
						telco_tycd 		: this.telco_tycd,
						end_period 		: this.end_period,

						retryFlag		: true,
						retryData		: response,

						selectedCnt		: this.fail_org_list.length,
					}
				}
				modalService.openPopup(config_failRetry)

			})

		},

		// '다음'버튼 클릭
		moveNext() {

			// 실패기관 정보 session 제거
			sessionStorage.removeItem('conFailInfo')

			this.selectList = []

			// 업권별 리스트 중 선택 요소를 골라 리스트에 담기
			// if(this.bankYn && this.bank_list.length > 0){
			// 	for(let i=0; i<this.bank_list.length; i++){
			// 		for(let j=0; j<this.bank_list[i].list.length; j++){
			// 			if(this.$refs[this.bank_list[i].list[j].org_code][j].checked){
			// 				if(this.bank_list[i].list[j].seqno === "" || this.bank_list[i].list[j].seqno === null || this.bank_list[i].list[j].seqno === undefined){
			// 					this.selectList.push({"key":this.bank_list[i].list[j].key,"org_code":this.bank_list[i].list[j].org_code, "org_biz_code":this.bank_list[i].list[j].org_biz_code, "scope":this.bank_list[i].list[j].scope , "prod_name":this.bank_list[i].list[j].prod_name, "org_name":this.bank_list[i].list[j].org_name, "is_minus":this.bank_list[i].list[j].is_minus})
			// 				}else{
			// 					this.selectList.push({"key":this.bank_list[i].list[j].key,"org_code":this.bank_list[i].list[j].org_code, "org_biz_code":this.bank_list[i].list[j].org_biz_code, "scope":this.bank_list[i].list[j].scope , "prod_name":this.bank_list[i].list[j].prod_name, "org_name":this.bank_list[i].list[j].org_name, "is_minus":this.bank_list[i].list[j].is_minus, "seqno":this.bank_list[i].list[j].seqno})
			// 				}
			// 			}
			// 		}
			// 	}
			// }

			if(this.selectBankList.length > 0){
				this.selectList.push(...this.selectBankList)
			}

			// if(this.investYn && this.invest_list.length > 0){
			// 	for(let i=0; i<this.invest_list.length; i++){
			// 		for(let j=0; j<this.invest_list[i].list.length; j++){
			// 			if(this.$refs[this.invest_list[i].list[j].org_code][j].checked){
			// 				this.selectList.push({"key":this.invest_list[i].list[j].key,"org_code":this.invest_list[i].list[j].org_code, "org_biz_code":this.invest_list[i].list[j].org_biz_code, "scope":this.invest_list[i].list[j].scope , "prod_name":this.invest_list[i].list[j].prod_name, "org_name":this.invest_list[i].list[j].org_name})
			// 			}
			// 		}
			// 	}
			// }

			if(this.selectInvestList.length > 0){
				this.selectList.push(...this.selectInvestList)
			}


			if(this.selectCardList.length > 0){
				this.selectList.push(...this.selectCardList)
			}

			// if(this.cardYn && this.card_list.length > 0){
			// 	for(let i=0; i<this.card_list.length; i++){
			// 		for(let j=0; j<this.card_list[i].list.length; j++){
			// 			if(this.$refs[this.card_list[i].list[j].org_code][j].checked){
			// 				this.selectList.push({"key":this.card_list[i].list[j].key,"org_code":this.card_list[i].list[j].org_code, "org_biz_code":this.card_list[i].list[j].org_biz_code, "scope":this.card_list[i].list[j].scope , "prod_name":this.card_list[i].list[j].prod_name, "org_name":this.card_list[i].list[j].org_name})
			// 			}
			// 		}
			// 	}
			// }

			// if(this.insuYn && this.insu_list.length > 0){
			// 	for(let i=0; i<this.insu_list.length; i++){
			// 		for(let j=0; j<this.insu_list[i].list.length; j++){
			// 			if(this.$refs[this.insu_list[i].list[j].org_code][j].checked){
			// 				this.selectList.push({"key":this.insu_list[i].list[j].key,"org_code":this.insu_list[i].list[j].org_code, "org_biz_code":this.insu_list[i].list[j].org_biz_code, "scope":this.insu_list[i].list[j].scope , "prod_name":this.insu_list[i].list[j].prod_name, "org_name":this.insu_list[i].list[j].org_name})
			// 			}
			// 		}
			// 	}
			// }

			if(this.selectInsuList.length > 0){
				this.selectList.push(...this.selectInsuList)
			}


			// if(this.efinYn && this.efin_list.length > 0){
			// 	for(let i=0; i<this.efin_list.length; i++){
			// 		for(let j=0; j<this.efin_list[i].list.length; j++){
			// 			if(this.$refs[this.efin_list[i].list[j].org_code][j].checked){
			// 				this.selectList.push({"key":this.efin_list[i].list[j].key,"org_code":this.efin_list[i].list[j].org_code, "org_biz_code":this.efin_list[i].list[j].org_biz_code, "scope":this.efin_list[i].list[j].scope , "prod_name":this.efin_list[i].list[j].prod_name, "org_name":this.efin_list[i].list[j].org_name})
			// 			}
			// 		}
			// 	}
			// }

			if(this.selectEfinList.length > 0){
				this.selectList.push(...this.selectEfinList)
			}

			// if(this.capitalYn && this.capital_list.length > 0){
			// 	for(let i=0; i<this.capital_list.length; i++){
			// 		for(let j=0; j<this.capital_list[i].list.length; j++){
			// 			if(this.$refs[this.capital_list[i].list[j].org_code][j].checked){
			// 				if(this.capital_list[i].list[j].seqno === "" || this.capital_list[i].list[j].seqno === null || this.capital_list[i].list[j].seqno === undefined){
			// 					this.selectList.push({"key":this.capital_list[i].list[j].key,"org_code":this.capital_list[i].list[j].org_code, "org_biz_code":this.capital_list[i].list[j].org_biz_code, "scope":this.capital_list[i].list[j].scope , "prod_name":this.capital_list[i].list[j].prod_name, "org_name":this.capital_list[i].list[j].org_name})
			// 				}else{
			// 					this.selectList.push({"key":this.capital_list[i].list[j].key,"org_code":this.capital_list[i].list[j].org_code, "org_biz_code":this.capital_list[i].list[j].org_biz_code, "scope":this.capital_list[i].list[j].scope , "prod_name":this.capital_list[i].list[j].prod_name, "org_name":this.capital_list[i].list[j].org_name, "seqno":this.capital_list[i].list[j].seqno})
			// 				}
							
			// 			}
			// 		}
			// 	}
			// }

			if(this.selectCapitalList.length > 0){
				this.selectList.push(...this.selectCapitalList)
			}

			// if(this.ginsuYn && this.ginsu_list.length > 0){
			// 	for(let i=0; i<this.ginsu_list.length; i++){
			// 		for(let j=0; j<this.ginsu_list[i].list.length; j++){
			// 			if(this.$refs[this.ginsu_list[i].list[j].org_code][j].checked){
			// 				this.selectList.push({"key":this.ginsu_list[i].list[j].key,"org_code":this.ginsu_list[i].list[j].org_code, "org_biz_code":this.ginsu_list[i].list[j].org_biz_code, "scope":this.ginsu_list[i].list[j].scope , "prod_name":this.ginsu_list[i].list[j].prod_name, "org_name":this.ginsu_list[i].list[j].org_name})
			// 			}
			// 		}
			// 	}
			// }

			// if(this.telecomYn && this.telecom_list.length > 0){
			// 	for(let i=0; i<this.telecom_list.length; i++){
			// 		for(let j=0; j<this.telecom_list[i].list.length; j++){
			// 			if(this.$refs[this.telecom_list[i].list[j].org_code][j].checked){
			// 				this.selectList.push({"key":this.telecom_list[i].list[j].key,"org_code":this.telecom_list[i].list[j].org_code, "org_biz_code":this.telecom_list[i].list[j].org_biz_code, "scope":this.telecom_list[i].list[j].scope , "prod_name":this.telecom_list[i].list[j].prod_name, "org_name":this.telecom_list[i].list[j].org_name})
			// 			}
			// 		}
			// 	}
			// }
			if(this.selectTelecomList.length > 0){
				this.selectList.push(...this.selectTelecomList)
			}


			// if(this.usuryYn && this.usury_list.length > 0){
			// 	for(let i=0; i<this.usury_list.length; i++){
			// 		for(let j=0; j<this.usury_list[i].list.length; j++){
			// 			if(this.$refs[this.usury_list[i].list[j].org_code][j].checked){
			// 				this.selectList.push({"key":this.usury_list[i].list[j].key,"org_code":this.usury_list[i].list[j].org_code, "org_biz_code":this.usury_list[i].list[j].org_biz_code, "scope":this.usury_list[i].list[j].scope , "prod_name":this.usury_list[i].list[j].prod_name, "org_name":this.usury_list[i].list[j].org_name})
			// 			}
			// 		}
			// 	}
			// }

			if(this.selectUsuryList.length > 0){
				this.selectList.push(...this.selectUsuryList)
			}
			// if(this.bondYn && this.bond_list.length > 0){
			// 	for(let i=0; i<this.bond_list.length; i++){
			// 		for(let j=0; j<this.bond_list[i].list.length; j++){
			// 			if(this.$refs[this.bond_list[i].list[j].org_code][j].checked){
			// 				this.selectList.push({"key":this.bond_list[i].list[j].key,"org_code":this.bond_list[i].list[j].org_code, "org_biz_code":this.bond_list[i].list[j].org_biz_code, "scope":this.bond_list[i].list[j].scope , "prod_name":this.bond_list[i].list[j].prod_name, "org_name":this.bond_list[i].list[j].org_name})
			// 			}
			// 		}
			// 	}
			// }
			


			// if(this.p2pYn && this.p2p_list.length > 0){
			// 	for(let i=0; i<this.p2p_list.length; i++){
			// 		for(let j=0; j<this.p2p_list[i].list.length; j++){
			// 			if(this.$refs[this.p2p_list[i].list[j].org_code][j].checked){
			// 				this.selectList.push({"key":this.p2p_list[i].list[j].key,"org_code":this.p2p_list[i].list[j].org_code, "org_biz_code":this.p2p_list[i].list[j].org_biz_code, "scope":this.p2p_list[i].list[j].scope , "prod_name":this.p2p_list[i].list[j].prod_name, "org_name":this.p2p_list[i].list[j].org_name})
			// 			}
			// 		}
			// 	}
			// }
			if(this.selectP2pList.length > 0){
				this.selectList.push(...this.selectP2pList)
			}

			if(this.selectPublicList.length > 0){
				this.selectList.push(...this.selectPublicList)
			}
			// 초기 데이터 적제
			this.makeDefaultScopeData(this.asetJson)

			if(!this.selectList.length > 0){
				modalService.alert("연결할 자산을 선택하세요.")
				return false
			}

			// 선택 요소 별 데이터 가공
			this.makeCompleteScopeJson(this.selectList)

			let sortList = []
			let maxOrgCodeList = []

			sortList = this.sortArray(this.selectList)

			for(let i=0; i<sortList.length; i++) {
				if(sortList[i].list.length > this.maxCnt) {
					maxOrgCodeList.push({"org_code":sortList[i].org_code})
				}
			}
			console.log(sortList, maxOrgCodeList)
			for(let i=0; i<maxOrgCodeList.length; i++) {
				for(let j=0; j<this.orgTotScopeList.length; j++) {
					if(maxOrgCodeList[i].org_code === this.orgTotScopeList[j].snd_org_code) {
						for(let k=0; k<this.orgTotScopeList[j].target_info.length; k++) {
							if(this.orgTotScopeList[j].target_info[k].asset_list !== undefined) {
								this.orgTotScopeList[j].target_info[k].asset_list = [{"asset":"all_asset"}]
							}
						}
					}
				}
			}

			let selOrgAsetList = []

			let compName = COAR2009
			const config = {
				component : compName,
				params : {
					userAgreeInfo 	: this.userAgreeInfo,
					orgTotScopeList : this.orgTotScopeList,
					org_fail_list 	: this.org_fail_list,		// 연결 실패 리스트
					selectList 		: this.selectList,
					selectedCnt		: _.uniqBy(this.selectList , 'org_code').length,
					ca_org_type 	: this.ca_org_type,
					ca_org_name 	: this.ca_org_name,
					attcC			: this.attcC,
					attcCext		: this.attcCext,
					certDsc			: this.certDsc,				// (필수) 인증방법구분 (공동인증 : joint, 금융인증 : finance, 패스인증 : pass)
					selOrgAsetList	: selOrgAsetList,			// 선택 기관 내 전체 자산 리스트
					isMramMod		: this.isMramMod,
					isBckYn			: this.isBckYn,				// 백업데이터 유무
				}
			}
			modalService.openPopup(config).then(response => {
				console.log(response)
			})
			
		},

		//초기 데이터 적제
		makeDefaultScopeData(data){ 

			this.orgTotScopeList = []	// 데이터 초기화
			let selectOrgList = _.uniqBy(this.selectList , 'org_code')
			
			for (let i=0; i < selectOrgList.length ; i++ )
			{
				//const orgList = data.success_org_list
				this.orgTotScopeList.push({'snd_org_code' : selectOrgList[i].org_code, target_info : [] })

			}
			if (data.irp_cnt > 0)      		this.makeDefaultIndustyScope(data.irp_list)
			if (data.isr_cnt > 0)      		this.makeDefaultIndustyScope(data.isr_list)
			if (data.isr_loan_cnt > 0)      this.makeDefaultIndustyScope(data.isr_loan_list)
			if (data.isr_atisr_cnt > 0)     this.makeDefaultIndustyScope(data.isr_atisr_list)
			if (data.bank_cnt > 0)     		this.makeDefaultIndustyScope(data.bank_list)
			if (data.card_cnt > 0)     		this.makeDefaultIndustyScope(data.card_list)
			if (data.invest_cnt > 0)   		this.makeDefaultIndustyScope(data.invest_list)
			if (data.efin_ppy_cnt > 0) 		this.makeDefaultIndustyScope(data.efin_ppy_list)
			if (data.efin_acc_cnt > 0) 		this.makeDefaultIndustyScope(data.efin_acc_list)
			if (data.capital_cnt > 0)  		this.makeDefaultIndustyScope(data.capital_list)
			if (data.gi_cnt > 0)       		this.makeDefaultIndustyScope(data.gi_list)
			if (data.telecom_cnt > 0)  		this.makeDefaultIndustyScope(data.telecom_list)

			if (data.bond_cnt > 0)  		this.makeDefaultIndustyScope(data.bond_list)
			if (data.prepaid_cnt > 0)  		this.makeDefaultIndustyScope(data.prepaid_list)
			if (data.p2pln_cnt > 0)  		this.makeDefaultIndustyScope(data.p2pln_list)
			if (data.p2piv_cnt > 0)  		this.makeDefaultIndustyScope(data.p2piv_list)
			if (data.dc_cnt > 0)  		    this.makeDefaultIndustyScope(data.dc_list) // 고도화 퇴직연금 추가 - 2023.07.19 by CS533461
			
			if (data.public_cnt > 0) 		this.makeDefaultIndustyScope(data.public_list)
				

		},

		//각 카운트별로 업권리스트 Default추가
		makeDefaultIndustyScope(scopeList){ 

			for(let i=0; i<scopeList.length; i++)
			{
				
				const org_code     = scopeList[i].org_code
				const org_biz_code = scopeList[i].org_biz_code
				const org_code_idx = this.orgTotScopeList.findIndex(d=> d.snd_org_code === org_code)

				if(org_code_idx !== -1 && this.orgTotScopeList[org_code_idx].target_info.length == 0)
				{
					switch(org_biz_code) {
						case "bank" :
							this.orgTotScopeList[org_code_idx].target_info.push({scope: 'bank.list'})
							this.orgTotScopeList[org_code_idx].org_biz_code = scopeList[i].org_biz_code
							// this.orgTotScopeList[org_code_idx].org_name = scopeList[i].org_name
							break
						case "card" :
							this.orgTotScopeList[org_code_idx].target_info.push({scope: 'card.list'})
							this.orgTotScopeList[org_code_idx].org_biz_code = scopeList[i].org_biz_code
							// this.orgTotScopeList[org_code_idx].org_name = scopeList[i].org_name
							break
						case "invest" :
							this.orgTotScopeList[org_code_idx].target_info.push({scope: 'invest.list'})
							this.orgTotScopeList[org_code_idx].org_biz_code = scopeList[i].org_biz_code
							// this.orgTotScopeList[org_code_idx].org_name = scopeList[i].org_name
							break
						case "insu" :
							this.orgTotScopeList[org_code_idx].target_info.push({scope: 'insu.list'})
							this.orgTotScopeList[org_code_idx].org_biz_code = scopeList[i].org_biz_code
							// this.orgTotScopeList[org_code_idx].org_name = scopeList[i].org_name
							break
						case "capital" :
							this.orgTotScopeList[org_code_idx].target_info.push({scope: 'capital.list'})
							this.orgTotScopeList[org_code_idx].org_biz_code = scopeList[i].org_biz_code
							// this.orgTotScopeList[org_code_idx].org_name = scopeList[i].org_name
							break
						case "efin" :
							this.orgTotScopeList[org_code_idx].target_info.push({scope: 'efin.list'})
							this.orgTotScopeList[org_code_idx].org_biz_code = scopeList[i].org_biz_code
							// this.orgTotScopeList[org_code_idx].org_name = scopeList[i].org_name
							break
						case "ginsu" :
							this.orgTotScopeList[org_code_idx].target_info.push({scope: 'ginsu.list'})
							this.orgTotScopeList[org_code_idx].org_biz_code = scopeList[i].org_biz_code
							// this.orgTotScopeList[org_code_idx].org_name = scopeList[i].org_name
							break
						case "telecom" :
							this.orgTotScopeList[org_code_idx].target_info.push({scope: 'telecom.list'})
							this.orgTotScopeList[org_code_idx].org_biz_code = scopeList[i].org_biz_code
							// this.orgTotScopeList[org_code_idx].org_name = scopeList[i].org_name
							break
						case "usury" :
							this.orgTotScopeList[org_code_idx].target_info.push({scope: 'usury.list'})
							this.orgTotScopeList[org_code_idx].org_biz_code = scopeList[i].org_biz_code
							// this.orgTotScopeList[org_code_idx].org_name = scopeList[i].org_name
							break
						case "bond" :
							this.orgTotScopeList[org_code_idx].target_info.push({scope: 'bond.list'})
							this.orgTotScopeList[org_code_idx].org_biz_code = scopeList[i].org_biz_code
							// this.orgTotScopeList[org_code_idx].org_name = scopeList[i].org_name
							break
						case "p2p" :
							this.orgTotScopeList[org_code_idx].target_info.push({scope: 'p2p.list'})
							this.orgTotScopeList[org_code_idx].org_biz_code = scopeList[i].org_biz_code
							// this.orgTotScopeList[org_code_idx].org_name = scopeList[i].org_name
							break
						case "public" :
							this.orgTotScopeList[org_code_idx].org_biz_code = 'public'
							// this.orgTotScopeList[org_code_idx].org_name = scopeList[i].org_name
							break
					}
				}
			}

		},

		// 선택 요소별 스코프 리스트 가공
		makeCompleteScopeJson(selectScopeList){
			/*
			//각 식별자
			bank    : account_num
			card    : card_id
			card	  card.pp_id?
			invest  : account_num
			insu    : insu_num
					  insu.irp : account_num
			efin efin.prepaid : fob_id
			efin efin.paid    : account_id
			capital : account_num
			ginsu   : insu_num
			telecom	: mgmt_id
			p2p		: lending_id
			bond	: bond_num
			usury	: bond_num
			public  : cert_id
			*/

			for (let j=0; j < selectScopeList.length; j++)
			{

				const selectScope  = selectScopeList[j]
				const org_code     = selectScope.org_code
				const org_biz_code = selectScopeList[j].org_biz_code
				const scope        = selectScopeList[j].scope
				const org_name	   = selectScopeList[j].org_name
				// const seqno		   = selectScopeList[j].seqno

				for(let i=0; i < this.orgTotScopeList.length; i++)
				{
						if(this.orgTotScopeList[i].snd_org_code ===  org_code)
						{
							const target_info = this.orgTotScopeList[i].target_info

							if(target_info.findIndex(d => d.scope === scope ) == -1 )
							{
								switch(org_biz_code) {
									case "bank" :
										if(scope === 'bank.deposit bank.loan' || scope === 'bank.loan bank.deposit'){
											// 마이너스 대출 계좌이면서 수신계좌
											if(target_info.findIndex(d => d.scope === 'bank.deposit' ) == -1 ){
												if(selectScope.seqno === "" || selectScope.seqno === null || selectScope.seqno === undefined){
													this.orgTotScopeList[i].target_info.push({ 'scope' : 'bank.deposit' , 'asset_list' : [{ 'asset' : selectScope.key}] })
												}else{
													this.orgTotScopeList[i].target_info.push({ 'scope' : 'bank.deposit' , 'asset_list' : [{ 'asset' : selectScope.key , 'seqno':selectScope.seqno}] })
												}
												
											}else{
												let target_info_scope_index = target_info.findIndex(d => d.scope === 'bank.deposit')
												if(selectScope.seqno === "" || selectScope.seqno === null || selectScope.seqno === undefined){
													this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key})
												}else{
													this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key, 'seqno':selectScope.seqno })
												}
												
												//
											}
											if(target_info.findIndex(d => d.scope === 'bank.loan' ) == -1 ){
												if(selectScope.seqno === "" || selectScope.seqno === null || selectScope.seqno === undefined){
													this.orgTotScopeList[i].target_info.push({ 'scope' : 'bank.loan'    , 'asset_list' : [{ 'asset' : selectScope.key}] })
												}else{
													this.orgTotScopeList[i].target_info.push({ 'scope' : 'bank.loan'    , 'asset_list' : [{ 'asset' : selectScope.key, 'seqno':selectScope.seqno }] })
												}
												// this.orgTotScopeList[i].target_info.push({ 'scope' : 'bank.loan'    , 'asset_list' : [{ 'asset' : selectScope.key, 'seqno':selectScope.seqno }] })
											}else{
												//
												let target_info_scope_index = target_info.findIndex(d => d.scope === 'bank.loan')
												if(selectScope.seqno === "" || selectScope.seqno === null || selectScope.seqno === undefined){
													this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key})
												}else{
													this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key, 'seqno':selectScope.seqno })
												}
												// this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key, 'seqno':selectScope.seqno })
												
											}
											
										}else{
											if(selectScope.seqno === "" || selectScope.seqno === null || selectScope.seqno === undefined){
												this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key}] })
											}else{
												this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key, 'seqno':selectScope.seqno }] })
											}
											// this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key, 'seqno':selectScope.seqno }] })
										}
										this.orgTotScopeList[i].org_name = org_name
										break
									case "card" :
										this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key }] })
										this.orgTotScopeList[i].org_name = org_name
										break
									case "invest" :
										this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key }] })
										this.orgTotScopeList[i].org_name = org_name
										break
									case "insu" :
										if(scope === 'insu.irp'){
											this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key }] })
											this.orgTotScopeList[i].org_name = org_name
										}else{
											this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key }] })
											this.orgTotScopeList[i].org_name = org_name
										}
										break
									case "capital" :
										if(selectScope.seqno === "" || selectScope.seqno === null || selectScope.seqno === undefined){
											this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key}] })
										}else{
											this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key, 'seqno':selectScope.seqno }] })
										}
										this.orgTotScopeList[i].org_name = org_name
										break
									case "efin" :
										if(scope === 'efin.prepaid'){
											this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key }] })
											this.orgTotScopeList[i].org_name = org_name
										}else{
											this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key }] })
											this.orgTotScopeList[i].org_name = org_name
										}														
										break
									case "ginsu" :
										this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key }] })
										this.orgTotScopeList[i].org_name = org_name
										break
									case "telecom" :
										this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key }] })
										this.orgTotScopeList[i].org_name = org_name
										break
									case "usury" :
										this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key }] })
										this.orgTotScopeList[i].org_name = org_name
										break
									case "bond" :
										this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key }] })
										this.orgTotScopeList[i].org_name = org_name
										break
									case "p2p" :
										this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key }] })
										this.orgTotScopeList[i].org_name = org_name
										break
									case "public" :
										this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.key }] })
										//기획요건 => 건강보험공단의 장기요양보험료납부확인서(직장가입자 L167) 선택 시 지역가입자도 ADD
										if(selectScope.key === 'L167') this.orgTotScopeList[i].target_info[0].asset_list.push({ 'asset' : 'L168' })
										this.orgTotScopeList[i].org_name = org_name
										break
								}
								break

							}else{

								const target_info_scope_index = target_info.findIndex(d => d.scope === scope )
								
								switch(org_biz_code) {
									case "bank" :
										if(selectScope.seqno === "" || selectScope.seqno === null || selectScope.seqno === undefined){
											this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key})
										}else{
											this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key, 'seqno':selectScope.seqno })
										}
										// this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key, 'seqno':selectScope.seqno })
										break
									case "card" :
										this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key })
										break
									case "invest" :
										this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key })
										break
									case "insu" :
										if(scope === 'insu.irp'){
											this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key })
										}else{
											this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key })
										}
										break
									case "capital" :
										if(selectScope.seqno === "" || selectScope.seqno === null || selectScope.seqno === undefined){
											this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key})
										}else{
											this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key, 'seqno':selectScope.seqno })
										}
										// this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key, 'seqno':selectScope.seqno })
										break
									case "efin" :
										if(scope === 'efin.prepaid'){
											this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key })
										}else{
											this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key })
										}
										break
									case "ginsu" :
										this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key })
										break
									case "telecom" :
										this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key })
										break
									case "usury" :
										this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key })
										break
									case "bond" :
										this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key })
										break
									case "p2p" :
										this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key })
										break
									case "public" :
										this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.key })
										break
								}
								break
							}
						}
				}
			}
			

			// asis 대비 변경 :: 선택 자산 중 카드에서 포인트,청구,대출 관련 스코프 별도 포함
			for(let i=0; i<this.orgTotScopeList.length; i++){
				if(this.orgTotScopeList[i].org_biz_code === 'card'){
					for(let j=0; j<this.card_list.length; j++) {
						if(this.orgTotScopeList[i].snd_org_code === this.card_list[j].org_code) {
							// this.orgTotScopeList[i].target_info.push({'scope':'card.point'},{'scope':'card.bill'},{'scope':'card.loan'})
							if(this.$refs[this.card_list[j].org_code+'_'+j+'_point'][0].checked) this.orgTotScopeList[i].target_info.push({'scope':'card.point'})
							if(this.$refs[this.card_list[j].org_code+'_'+j+'_rev'][0].checked) this.orgTotScopeList[i].target_info.push({'scope':'card.bill'})
							if(this.$refs[this.card_list[j].org_code+'_'+j+'_loan'][0].checked) this.orgTotScopeList[i].target_info.push({'scope':'card.loan'})
						}
					}
				}
			}
			
		},

		// 연결 성공기관 x) 기관 다시 선택 클릭
		moveCOAR2002() {
			sessionStorage.removeItem('conFailInfo')

			// 통합인증 접근토큰 리셋
            const config_tkReset = {
				url:  "/co/ar/00r02",
				data : {
                    "mydtCusno" : this.getUserInfo('mydtCusno')
				}
			}
			apiService.call(config_tkReset).then(() => {
				if(this.isMramMod === '') {
					/**
					 * state의 modalList를 이용해 만료기관관리 팝업이 오픈상태일 경우(만료기관의 재연결 프로세스일 경우)
					 * 		-> 만료기관 팝업을 제외한 모든 팝업 close
					 * 그 외 경우 메인 팝업을 제외한 타 팝업 close 후 연결기관선택 팝업 오픈
					 */
					if(_.findIndex(this.$store.state.modal.modalList, d => String(d.component.name) === "MRAM1006") > -1) this.closeAllLeftMain() 
					else {
						this.closeAllLeftMain()

						const config = {
							params : {},
							component : COAR2002
						}
						modalService.openPopup(config)
					}

				} else {
					if(this.isMramMod === '1') {
						this.closeAll()
					} else {
						this.closeAllLeftMain()
					}
				}
            })
		},

		// 팝업닫기 버튼 클릭
		closeAsetListPop() {
			sessionStorage.removeItem('conFailInfo')

			/**
			 * isMramMod
			 * ''	: 신규연결
			 * '1'	: 연결변경
			 * '2'	: 만료예정기관 만료일변경
			 */
			if(this.isMramMod === '' || this.isMramMod === '1') {
				// 신규연결 or 연결기관변경일 경우
				if(this.isMramMod === '1' && !this.isBckYn) {
					// 연결변경으로 넘어오고 자산백업데이터없어 1차인증부터 진행하였을 경우
					// 전체 팝업 close && 연결기관관리 페이지 재조회
					//this.closeAll('completeMod') => MRAM2001 재조회 방지처리
					this.closeAll()
				} else {
					// 그 외 case
					const currentPage = store.getters['layout/pageInfo']
					if(currentPage.name.indexOf("MRAM") > -1) {
						// 연결기관관리페이지를 통해 넘어온 경우
						this.closeAll('completeMod')
					} else {
						this.closeAllLeftMain()
					}
				}
			} else {
				this.closeAll('completeMod')
			}
		},
		
    },
    components : {
    }
}


</script>