<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 연결 기관 선택
* @ 페이지설명 : 연결 기관 선택
* @ 파일명     : src/views/page/CO/AR/COAR4002/COAR4002.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-02-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-24              CS540685              상호금융 NH콕마이데이터 4.0 추진 개발 (COAR2002 → COAR4002)
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>{{topTitle}}</h1>
			<!--<button type="button" class="prev"><span class="blind">이전</span></button>-->
		</div>
		
		<div class="popup_content">
			<div class="asset_connect organ_sel">
				<div class="tit_area">
					<h2 class="headline"><strong>연결할 기관을 선택해 주세요.</strong></h2>
				</div>
				<div class="input" v-if="!isExternalTargetFilterMode">
					<input type="text" name="srchKeyword" id="srchKeyword" placeholder="기관명을 입력해 주세요." aria-label="기관명 검색" v-model="srchKeyword">
					<button v-if="isOnKeyword" type="button" class="btn_delete" @click="fn_resetKeyword()"><span class="blind">삭제</span></button>
					<button type="button" class="btn_search " @click="fn_searchKeyword()"><span class="blind">검색</span></button>
				</div>

				<div class="institu_wrap">
					<div class="category_tab" v-show="filteredBzrgCnt > 0">
						<div class="scroller">
							<ul role="tablist">
								<template v-for="(item, idx) in orgList">
									<li v-if="item.scrmode.includes(scrmode) && item.isShow" :key="idx">
										<a :href="'#institu_' + item.bzrgCode" role="tab" :aria-selected="item.bzrgCode == orgDsc" :id="'link_' + item.bzrgCode">{{item.bzrgName}}
											<span v-if="selectedOrgCn[idx].cn > 0">{{selectedOrgCn[idx].cn}}</span>
										</a>
									</li>
								</template>
							</ul>
						</div>
					</div>

					<div class="top_desc" v-if="!isExternalTargetFilterMode">
						<a href="javascript:void(0);" class="btn_reset" @click="fn_resetCheckAll()"><span>선택기관초기화</span></a>
						<a href="javascript:void(0);" class="btn_recom" title="옵션 선택" @click="fn_openSearchSlide()">
							<span class="ico_line_down"><span class="blind">현재옵션</span>{{filterOpt.name}}</span>
						</a>
					</div>

					<div class="gray_box">
						<p class="dotted_list">연결 시도 기관이 점검중 또는 일시적 오류일 수 있으니 재시도 후에도 연결이 되지 않을 시 해당 기관에 문의해주세요.</p>
					</div>
					
					<div class="category_cont">
						<template v-if="orgList.filter(t => t.isShow).length > 0">
							<template v-for="(item, idx) in orgList">
								<div v-if="item.scrmode.includes(scrmode) && item.isShow" :key="idx" class="institu_group" :id="'institu_' + item.bzrgCode">
									<div class="tit_area">
										<strong class="institu_tit">{{item.bzrgName}} <em v-if="selectedFilterdOrgCn[idx].cn > 0" class="num">(<span>{{selectedFilterdOrgCn[idx].cn}}</span><!-- 개관, <span>{{selectedOrgCn[idx].assetCn}}</span>개 자산 선택 -->)</em></strong>
										<!-- <div class="checkbox noicon checkGroup">
											<input type="checkbox" :name="'checkAll_' + item.bzrgCode" :id="'checkAll_' + item.bzrgCode"
												v-model="selectedBzrgList" :value="item.bzrgCode" @change="fn_checkAll(item.bzrgCode)" />
											<label v-if="selectedFilterdOrgCn[idx].cn == 0" :for="'checkAll_' + item.bzrgCode">전체선택</label>
											<label v-else :for="'checkAll_' + item.bzrgCode"><span class="blind">전체</span>선택해제</label>
										</div> -->
										<div class="btn_area">
											<button type="button" class="btn_all_chk" @click="fn_checkAll(item.bzrgCode)">
												<span v-if="selectedFilterdOrgCn[idx].cn == 0">전체선택</span>
												<span v-else>선택해제</span>
											</button>
										</div>
									</div>
									
									<template v-if="item.orgs.filter(t => t.displayYn == '1' && t.scrnMrkYn == '1').length > 0">
										<template v-for="(org, innerIdx) in item.orgs">
											<div v-show="org.displayYn == '1' && org.scrnMrkYn == '1'" :key="innerIdx" class="sel_toggle_box">
												<!-- <template v-if="org.colYn == '1' && (org.assets == undefined || org.assets.length == 0) && isRecieveAssets">
													<div class="top_status">
														<div class="tit">
															<i :class="'ico_bank ' + org.orgC"></i>
															<strong class="bank_name">{{org.orgnm}}</strong>
															<span v-if="org.exprYn == '1'" class="txt_status end">만료예정</span>
															<span v-else class="txt_status">연결됨</span>
														</div>
														<div>
															<a href="javascript:void(0)" class="btn_reconnect" @click="fn_getAssetList([{'org_code': org.orgC, 'orgBzrgC': item.bzrgCode}])">실패<span class="blind">연결 재시도</span></a>
														</div>
													</div>
												</template>
												<template v-else> -->
													<div class="checkbox border">
														<input type="checkbox" :name="'checkbox_' + org.orgC" :id="'checkbox_' + org.orgC"
															:readonly="(org.orgC === 'A4AAAZ0000' && !cbtType)" :disabled="org.orgC === 'A4AAAZ0000' && !cbtType"
															v-model="orgList[idx].selectedOrgs" :value="org.orgC" @change="fn_checkOne(item.bzrgCode, org.orgC)">
														<label :for="'checkbox_' + org.orgC">
															<i :class="'ico_bank ' + org.orgC"></i>
															<strong class="bank_name">{{org.orgnm}}</strong>
															<template v-if="org.colYn == '1'">
																<span v-if="org.exprYn == '1'" class="txt_status end">만료예정</span>
																<span v-else class="txt_status">연결됨</span>
															</template>
														</label>
													</div>
												<!-- </template> -->

												<details class="select_detail" v-if="org.colYn == '1' || item.bzrgCode == 'public'"><!-- open 속성들어가면 열림상태 -->
													<summary v-if="item.bzrgCode == 'public'">
														<strong class="txt">증명서</strong>
														<span class="arr">
															<span class="show">&nbsp;보기</span>
															<span class="hide">&nbsp;닫기</span>
														</span>
													</summary>
													<summary v-else @click="fn_getAssetListOne(org.orgC, item.bzrgCode)">
														<strong class="txt">자산 목록</strong>
														<span class="arr">
															<span class="show">&nbsp;보기</span>
															<span class="hide">&nbsp;닫기</span>
														</span>
													</summary>

													<div v-if="org.assets != undefined && org.assets.length > 0" class="cont">
														<ul class="sel_list">
															<li v-for="(asset, assetIdx) in org.assets" :key="assetIdx" class="formItem">
																<div class="checkbox">
																	<input type="checkbox" :name="'checkbox_toggle_box_' + asset.org_code + asset.key"
																		:id="'checkbox_toggle_box_' + asset.org_code + asset.key"
																		v-model="orgList[idx].selectedAssets" :value="asset" @change="fn_checkOneAsset(asset)">
																	<label :for="'checkbox_toggle_box_' + asset.org_code + asset.key">
																		<span class="bank_wrap">
																			<strong class="bank_name">{{asset.prod_name}}</strong>
																			<span v-if="asset.is_consent != 'false' && (asset.is_consent == 'true' || asset.is_consent)" class="txt_status">연결됨</span>
																		</span>
																		<span v-if="item.bzrgCode != 'public'" class="bank_num">
																			<template v-if="item.bzrgCode == 'telecom'">
																				<template v-if="asset.telecom_num != undefined && asset.telecom_num != ''">
																					{{asset.telecom_num}}
																				</template>
																				<template v-else>
																					{{asset.key}}
																				</template>
																			</template>
																			<template v-else>
																				{{asset.key}}
																			</template>
																			<template v-if="asset.scope == 'bank.sleep_noncont' || asset.scope == 'insu.sleep_noncont'">
																				<span class="sleep_txt">{{fn_getScopeName(asset.scope, asset.insu_type)}}</span>
																			</template>
																		</span>
																	</label>
																</div>
															</li>
														</ul>
														<template v-if="org.extndScopes != undefined && org.extndScopes.length > 0">
															<div class="detail_items">
																<div v-for="(scope, scopeIdx) in org.extndScopes" :key="scopeIdx" class="checkbox">
																	<input type="checkbox" :name="'checkbox_toggle_' + org.orgC + '_point'"
																		:id="'checkbox_toggle_' + org.orgC + '_point'"
																		v-model="orgList[idx].selectedExtndScopes" :value="scope"
																		@change="fn_checkOneScope(item.bzrgCode, org.orgC)" checked>
																	<label :for="'checkbox_toggle_' + org.orgC + '_point'">
																		<span class="bank_wrap">
																			<strong class="bank_name">{{scope.scopeName}}</strong>
																		</span>
																	</label>
																</div>
															</div>
														</template>
													</div>
													<div v-else class="cont">
														<div class="no_result">
															<p class="text" v-html="org.failMessage">
															</p>
															<!-- <template v-if="org.failMessage != undefined && org.failMessage != ''">{{org.failMessage}}</template>
															<template v-lese>선택 기관의 오류로 조회에 실패하였습니다.</template><br> -->
															<div class="bg">
																<lottie-animation
																	:animationData="require('@/assets_v40/images/lottie/bg_no_result.json')"
																	:loop="true"
																	:auto-play="true"
																	aria-hidden="true"
																	class="bg_no_result"
																	background="transparent">
																</lottie-animation>
															</div>
														</div>
													</div>
												</details>
											</div>
										</template>
									</template>
									<template v-else>
										<div class="no_result">
											<p class="text">검색결과가 없습니다.</p>
											<!-- <p class="text" v-else>연결 가능한 기관을 준비하고 있어요.</p> -->
											<div class="bg">
												<lottie-animation
													:animationData="require('@/assets_v40/images/lottie/bg_no_result.json')"
													:loop="true"
													:auto-play="true"
													aria-hidden="true"
													class="bg_no_result"
													background="transparent">
												</lottie-animation>
											</div>
										</div>
									</template>
								</div>
							</template>
						</template>
						<template v-else>
							<div class="no_result">
								<p class="text" v-if="isOnKeyword || isOnFilter">검색결과가 없습니다.</p>
								<p class="text" v-else>연결 가능한 기관을 준비하고 있어요.</p>
								<div class="bg">
									<lottie-animation
										:animationData="require('@/assets_v40/images/lottie/bg_no_result.json')"
										:loop="true"
										:auto-play="true"
										aria-hidden="true"
										class="bg_no_result"
										background="transparent">
									</lottie-animation>
								</div>
							</div>
						</template>
					</div>
				</div>

				<details class="ico_detail_noti" open="">
					<summary><strong>알아두세요</strong></summary>
					<div class="cont">
						<p class="txt">자산 연결은 단순한 정보 조회이며, 신용평가에는 반영되지 않습니다. 또한, 강력한 보안 시스템을 통해 금융정보를 보호하니 안심하고 이용해 주세요.</p>
					</div>
				</details>
			</div>

		</div>
		<div class="popup_footer fixed">
			<div class="btns_wrap">
				<button type="button" class="btns lg primary" :disabled="selectedOrgAllCn == 0" @click="fn_nextProcess()">
					<em v-if="selectedOrgAllCn > 0">{{selectedOrgAllCn}}</em>{{connectOrgBtn}}
				</button>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click="fn_close({'isExternal': true, 'isMoveMainAfterConnect': false})"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
/*eslint-disable */
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import routerService from '@/service/routerService'
import {dayDiff, dateFormat} from '@/utils/date'
import LottieAnimation from 'lottie-web-vue'
import {mapGetters} from 'vuex'
import _ from 'lodash'
import moment from 'moment'

import COAR4003 from '@/views/page/CO/AR/COAR4003/COAR4003'
import COAR4006 from '@/views/page/CO/AR/COAR4006/COAR4006'
import COAR4007 from '@/views/page/CO/AR/COAR4007/COAR4007'
import COAR4009 from '@/views/page/CO/AR/COAR4009/COAR4009'
import COAR4010 from '@/views/page/CO/AR/COAR4010/COAR4010'
import COAR4021 from '@/views/page/CO/AR/COAR4021/COAR4021'
import COAR4042 from '@/views/page/CO/AR/COAR4042/COAR4042'

export default {
    name : "COAR4002",
    data: () => {
        return {
			MAX_ORG_CN: 50,
			MAX_ASSET_CN: 100,
			CURR_DATE: dateFormat(new Date(), 'YYYYMMDD'),
			IS_BY_BZRG: false, // 업권별 추천기관 선택 여부

			orgList: [
				{"bzrgCode": "bank", "bzrgName": "은행", "scrmode": "UNSC", "isShow": true,
					"bzrgKey": "bank_org", "orgCn": 0, "orgs": [],
					"selectedOrgs": [], "selectedAssets": [], "selectedExtndScopes": []}
				, {"bzrgCode": "card", "bzrgName": "카드", "scrmode": "UNSC", "isShow": true,
					"bzrgKey": "card_org", "orgCn": 0, "orgs": [],
					"selectedOrgs": [], "selectedAssets": [], "selectedExtndScopes": []}
				, {"bzrgCode": "invest", "bzrgName": "증권", "scrmode": "UNS", "isShow": true,
					"bzrgKey": "invest_org", "orgCn": 0, "orgs": [],
					"selectedOrgs": [], "selectedAssets": [], "selectedExtndScopes": []}
				, {"bzrgCode": "insu", "bzrgName": "보험", "scrmode": "UNS", "isShow": true,
					"bzrgKey": "insu_org", "orgCn": 0, "orgs": [],
					"selectedOrgs": [], "selectedAssets": [], "selectedExtndScopes": []}
				, {"bzrgCode": "efin", "bzrgName": "전자금융", "scrmode": "UNSC", "isShow": true,
					"bzrgKey": "efin_org", "orgCn": 0, "orgs": [],
					"selectedOrgs": [], "selectedAssets": [], "selectedExtndScopes": []}
				, {"bzrgCode": "capital", "bzrgName": "할부금융", "scrmode": "UNS", "isShow": true,
					"bzrgKey": "capi_org", "orgCn": 0, "orgs": [],
					"selectedOrgs": [], "selectedAssets": [], "selectedExtndScopes": []}
				, {"bzrgCode": "telecom", "bzrgName": "통신", "scrmode": "UNS", "isShow": true,
					"bzrgKey": "tele_org", "orgCn": 0, "orgs": [],
					"selectedOrgs": [], "selectedAssets": [], "selectedExtndScopes": []}
				, {"bzrgCode": "public", "bzrgName": "공공", "scrmode": "UNS", "isShow": true,
					"bzrgKey": "public_org", "orgCn": 0, "orgs": [],
					"selectedOrgs": [], "selectedAssets": [], "selectedExtndScopes": []}
			],

			// 화면 내부에서 사용되는 데이터 필드
			srchKeyword: "",
			isOnKeyword: false,
			filterOpt: {"code": "all", "name": "전체기관"},
			isOnFilter: false,
			selectedBzrgList: [],
			isShowMaxAssetToast: true,
			isFirstMounted: true,
			isRecieveAssets: false,
			publicOrgList: [],
			assetConnectClickCount: 0,
			teleType : [
				{key : "01", value : "휴대폰"},
				{key : "02", value : "집전화"},
				{key : "03", value : "인터넷"},
			],

			// 수신 파라메터 필드
			topTitle: '자산연결',
			orgDsc: '',
			isExternal : false,
			isMoveMainAfterConnect: true,
			filteredTargetOrgList: [],

			// 전송요구 생성용 데이터 필드
			selectedOrgList: [],
			consentList: [],

			// 팝업 수신 데이터 필드
			certDsc: "", // 인증방법구분 (공동인증 : joint, 금융인증 : finance, 패스인증 : pass, NH모바일: nh)
			custNo: "",
			termsInfo: {},

			// 세션 자동 연장용 타이머 객체
			sessionTimerAuthor: null,
        }
	},
	beforeMount() {
		
	},
    mounted() {
		this.initComponent(this.params);
        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    mixins: [
		commonMixin,
        popupMixin
	],
	computed:{
        ...mapGetters('myassets', [
            'myAssetsBzRgCnt',
			'myAssetsBzrgList'
		]),

		selectedOrgCn() {
			return this.orgList.map(t => ({
				"bzrgCode": t.bzrgCode,
				"cn": t.selectedOrgs.length,
				"assetCn": t.selectedAssets.length
			}));
		},

		selectedFilterdOrgCn() {
			if (this.isOnFilter || this.isOnKeyword) {
				return this.orgList.map(t => {
					return { "bzrgCode": t.bzrgCode,
							"cn": t.orgs.filter(o => o.displayYn == '1'
													&& t.selectedOrgs.findIndex(p => p == o.orgC) >= 0).length };
				});
			} else {
				return this.selectedOrgCn;
			}
		},

		selectedOrgAllCn() {
			let i = 0;
			this.orgList.forEach(t => {i += t.selectedOrgs.length;});
			return i;
		},

		connectOrgBtn() {
			return this.selectedOrgAllCn > 0 ? "개 기관 연결하기" : "선택한 기관이 없습니다";
		},

		cbtType() {
            return this.getUserInfo('tobeType') || false;
        },

		scrmode() {
			return this.getScrmode().mode || 'N';
		},

		isExternalTargetFilterMode() {
			return this.isExternal && this.filteredTargetOrgList.length > 0;
		},

		enableAssetConnect() {
			return import.meta.env.VITE_ENV === 'R' && this.assetConnectClickCount != 6;
		},

		filteredBzrgCnt() {
			return this.orgList.filter(t => t.scrmode.includes(this.scrmode) && t.isShow).length;
		}

	},
    methods: {
        initComponent(params = {}) {
			this.topTitle = params.topTitle || '자산연결';
			this.orgDsc = params.orgDsc || 'bank';
			this.isExternal = params.isExternal || false;
			this.isMoveMainAfterConnect = params.isMoveMainAfterConnect || true;
			this.filteredTargetOrgList = params.filteredTargetOrgList || [];

			this.getData();
        },

        getData() {
			const config = {
				url : "/co/ar/02r01",
				data : {
					"mydtCusno" : this.getUserInfo("mydtCusno"),
					"ofrAttcMethC" : "01"
				}
			};

			apiService.call(config).then(response => {
				let selectedOrgCn = this.selectedOrgAllCn;

				this.orgList.forEach(t => {
					if (this.isExternalTargetFilterMode) {
						t.orgs = response[t.bzrgKey].filter(o => o.scrnMrkYn == "1" && Boolean(this.filteredTargetOrgList.find(p => p.orgC == o.orgC && p.orgBzrgC == t.bzrgCode)));
						if (this.selectedOrgAllCn < this.MAX_ORG_CN) {
							t.selectedOrgs = t.selectedOrgs.concat(t.orgs.map(o => (o.orgC)).slice(0, this.MAX_ORG_CN - this.selectedOrgAllCn));
						}
						t.isShow = Boolean(this.filteredTargetOrgList.find(o => o.orgBzrgC == t.bzrgCode));
					} else {
						t.orgs = response[t.bzrgKey] || [];
					}
					t.orgCn = t.orgs.length;

					let connectedBzrg = this.myAssetsBzrgList.find(o => o.comnCVal == t.bzrgCode);
					let orgList = [];
					if (connectedBzrg != undefined && connectedBzrg.orgList != undefined) {
						orgList = connectedBzrg.orgList;
					}

					t.orgs.forEach(o => {
						if (t.bzrgCode == "public") {
							if (orgList.find(p => p.infOfrmnOrgC == o.orgC && p.acsTokenDusDtm == "0")) {
								o.colYn = "1";
							} else {
								o.colYn = "0";
							}
							this.publicOrgList.push({"org_code": o.orgC, "orgBzrgC": t.bzrgCode});
						}
						o.displayYn = "1";
						o.failMessage = "자산 조회 중입니다.";

						if (t.bzrgCode == "bank") {
							if (o.orgC === "A4AAAZ0000" && this.cbtType) {
								o.scrnMrkYn = "1";
							}
						}

						// TODO 화면표시여부 전체 기관 true로 설정 CBT 테스트 후 삭제 필수!!! [20250612]
						let forceScrnMrkYnList = ['A1AABG0000', 'A1AAEO0000', 'A1AAER0000', 'A1AAEM0000', 'A1AAES0000', 'A1AAEQ0000', 'A1AAHJ0000', 'A1AAJB0000', 'A1AAPF0000', 'A1AAAK0000', 'A1AAIM0000', 'A1AAMW0000', 'A1AAHS0000', 'A1AAII0000', 'A1AAAD0000', 'A1AAHX0000', 'A1AAQE0000', 'A1AAHP0000', 'A1AAIP0000', 'A4AAPA0000', 'A4AAGD0000', 'A4AAKM0000', 'A1AAKA0000', 'A1AAOV0000', 'A1AAOU0000', 'A3AAKR0000', 'A3AAKT0000', 'A3AALT0000', 'A3AAMK0000', 'A3AAKU0000', 'A3AAME0000', 'A3AAKX0000', 'A3AAMY0000', 'A3AAKB0000', 'A3AANP0000', 'A3AAKS0000', 'A3AAMC0000', 'A3AALX0000', 'A3AAJZ0000', 'A3AALD0000', 'A3AAPS0000', 'D1AABG0000', 'D1AAEX0000', 'D1AAEV0000', 'D1AAAF0000', 'D1AAFO0000', 'D1AADO0000', 'D1AAAH0000', 'D1AABJ0000', 'D1AAHJ0000', 'D1AAPF0000', 'D1AAIM0000', 'D1AAMW0000', 'D1AAEQ0000', 'D1AAHS0000', 'D1AAII0000', 'D1AAAD0000', 'D1AAHX0000', 'D1AAIP0000', 'D1AAQE0000', 'D1AAHP0000', 'D1AAAK0000', 'D1AAPA0000', 'D1AAKM0000', 'D1AAKA0000', 'D1AAFQ0000', 'D2AAOD0000', 'D2AAPG0000', 'D1AALX0000', 'D1AAMO0000', 'D1AACT0000', 'D1AADA0000', 'B1AABF0000', 'B2AAOC0000', 'B1AAJH0000', 'B1AAAI0000', 'B1AAEU0000', 'B1AAAY0000', 'B2AAAT0000', 'B2AACR0000', 'B1AAHE0000', 'B1AAAR0000', 'B2AAEW0000', 'B1AAFP0000', 'B1AAAS0000', 'B1AANL0000', 'B2AAGZ0000', 'B1AAKA0000', 'B2AAIF0000', 'B1AAJM0000', 'B1AAQA0000', 'B2AABT0000', 'B1AAQI0000', 'B2AADH0000', 'B2AAAL0000', 'B1AAAO0000', 'B2AANY0000', 'B1AAIX0000', 'B2AACL0000', 'B1AAMU0000', 'B2AAEN0000', 'B1AABD0000', 'B2AALR0000', 'B1AANZ0000', 'B1AAFS0000', 'B2ABBH0000', 'F1AAAU0000', 'F1AAAN0000', 'F1AAGI0000', 'F1AAFT0000', 'F1AAFZ0000', 'F1AAAM0000', 'F1AAAV0000', 'F1AABB0000', 'F1AABO0000', 'F1AABP0000', 'F1AADK0000', 'F1AADT0000', 'F1AAED0000', 'F1AAEE0000', 'F1AAEI0000', 'F1AAFF0000', 'F1AAFN0000', 'F1AAGJ0000', 'F1AAGL0000', 'F1AAGM0000', 'F1AAGO0000', 'F1AAYI0000', 'F1AADR0000', 'F1AAOP0000', 'F1AADG0000', 'F1AAHF0000', 'F1AAOI0000', 'F1AAFJ0000', 'F1AABZ0000', 'F1AAOR0000', 'F1AAON0000', 'F1AAIH0000', 'F1AACK0000', 'F1AAAB0000', 'F1AADY0000', 'F1AAGW0000', 'F1AAHD0000', 'F1AAHN0000', 'F1AAHT0000', 'F1AAIC0000', 'F1AAIG0000', 'F1AAIN0000', 'F1AAIO0000', 'F1AAIZ0000', 'F1AAJD0000', 'F1AAJP0000', 'F1AAJQ0000', 'F1AAJS0000', 'F1AAOH0000', 'F1AAOJ0000', 'F1AAOK0000', 'F1AAOL0000', 'F1AAOM0000', 'F1AAOO0000', 'F1AAOS0000', 'F1AASF0000', 'C1AACQ0000', 'C1AACS0000', 'C1AAKO0000', 'C1AACZ0000', 'C1AACU0000', 'C1AAEY0000', 'C1AAJE0000', 'C1AADF0000', 'C1AAPD0000', 'C1AADC0000', 'C1AADB0000', 'C1AABQ0000', 'C1AAGU0000', 'C1AAPV0000', 'C1AABR0000', 'C1AAHW0000', 'C1AAKN0000', 'C1AAIJ0000', 'C1AACT0000', 'C1AACY0000', 'C1AADD0000', 'C1AADI0000', 'C1AABU0000', 'C1AADA0000', 'C1AAPW0000', 'C1AAZS0000', 'C1ABAD0000', 'C1ABBG0000', 'E1AAHY0000', 'E1AAPC0000', 'E1AAPN0000', 'E1AAPM0000', 'E1AABK0000', 'E1AAPU0000', 'E1AAGP0000', 'E1AAQK0000', 'E1AAGK0000', 'E1AABZ0000', 'E1AAZJ0000', 'E1AAAX0000', 'E1AAJI0000', 'E1AAJA0000', 'E1AAIA0000', 'E1AAIE0000', 'E1AABE0000', 'E1AAOF0000', 'E1AABN0000', 'E1AAIV0000', 'E1AABJ0000', 'E1AAYE0000', 'D3AAOB0000', 'D3AAQO0000', 'D3AAAH0000', 'D3AAAF0000', 'D3AAEV0000', 'D3AAEX0000', 'D3AABJ0000', 'D3AAGE0000', 'D3AADE0000', 'D3AAJX0000', 'D3AABW0000', 'D3AAMG0000', 'D3AADZ0000', 'D3AAIL0000', 'D3AAMM0000', 'D3AAHR0000', 'D3AAWG0000', 'D3AADO0000', 'D3AAOA0000', 'PBAAVN0000', 'PBAAVM0000', 'PBAAVJ0000', 'PBAAVK0000', 'PBAAVL0000'];
						if (Boolean(forceScrnMrkYnList.find(t => t == o.orgC))) {
							o.scrnMrkYn = "1";
						}

						if (t.bzrgCode == "card") {
							o.extndScopes = [
								{ "orgC": o.orgC, "scope": "card.point", "scopeName": "포인트 정보" }
								, { "orgC": o.orgC, "scope": "card.bill", "scopeName": "청구 및 결제 정보" }
								, { "orgC": o.orgC, "scope": "card.loan", "scopeName": "대출상품 정보" }
							];
						}

						if (orgList.length > 0) {
							let org = orgList.find(p => p.infOfrmnOrgC == o.orgC);
							if (org != undefined) {
								o.exprYn = (dayDiff(org.tmsEdDt, this.CURR_DATE) >= 0
												&& dayDiff(org.tmsEdDt, this.CURR_DATE) <= 30)
												&& o.colYn == "1" ? "1" : "0";
							}
						}

						// if (!this.isExternal) {
							let orgDsc = "";
							if (this.IS_BY_BZRG) {
								orgDsc = this.orgDsc;
							}
							
							if (this.orgDsc == "rec") {
								orgDsc = t.bzrgCode;
							}
							

							if (t.bzrgCode == orgDsc) {
								if (o.amnOrgCYn == "1" && o.scrnMrkYn == "1") {
									if (this.selectedOrgAllCn < this.MAX_ORG_CN) {
										t.selectedOrgs.push(o.orgC);
										if (!_.isEmpty(o.extndScopes)) {
											o.extndScopes.forEach(p => {
												t.selectedExtndScopes.push(p);
											});
										}
									}
									selectedOrgCn++;
								}
							}
						// }
					});

					if (t.bzrgCode == "public") {
						t.orgs = _.chain(t.orgs).orderBy('orgnm', 'asc').value();
					}
					
					t.orgs = _.chain(t.orgs).orderBy('colYn', 'desc').value();
				});

				if (selectedOrgCn > this.MAX_ORG_CN) {
					modalService.alert("안전한 자산 연결을 위해<br> 최대 50개까지 선택 가능해요.");
				}

				this.fn_getAssetList(this.publicOrgList);

				this.$nextTick(() => {
					this.fn_observerOrgConnect();
					// 웹접근성관련 호출
					this.callJQueryWebAccessibility();
					this.fn_moveBzrg();
					
					if (this.orgDsc == "rec") {
						this.filterOpt = {"code": "rec", "name": "추천기관"};
						this.fn_filterOrgList((o) => {
							let r = true;
							if (this.isOnKeyword) {
								r = o.orgnm.includes(this.srchKeyword.toUpperCase())
									|| o.orgnm.includes(this.srchKeyword.toLowerCase());
							}
							r = r && o.amnOrgCYn == "1" && o.scrnMrkYn == "1";
							return r;
						});
						if (this.filterOpt.code == "all") {
							this.isOnFilter = false;
						} else {
							this.isOnFilter = true;
						}
						this.$forceUpdate();
					}
				});

			});

		},

		fn_getAssetListOne(orgCode, bzrgCode) {
			if (Boolean(this.orgList.find(t => t.bzrgCode == bzrgCode))) {
				let orgs = this.orgList.find(t => t.bzrgCode == bzrgCode).orgs;
				if (Boolean(orgs.find(t => t.orgC == orgCode))) {
					let org = orgs.find(t => t.orgC == orgCode);
					if (org.assets == undefined || org.assets.length == 0) {
						this.fn_getAssetList([{"org_code": orgCode, "orgBzrgC": bzrgCode}]);
					}
				}
			}
		},

		fn_getAssetList(orgList, isShowLoading = true) {
			if (orgList.length > 0) {
				// 연결된 기관의 자산목록 조회
				const assetConfig = {
					url : "/co/ar/02r02",
					data : {
						"mydtCusno" : this.getUserInfo("mydtCusno"),
						"orgCodeList" : JSON.stringify(orgList)
					},
					disableLoading : !isShowLoading,
				};

				apiService.call(assetConfig).then(response => {
					const rebuildAssets = ['irp_list', 'bank_list', 'card_list', 'invest_list', 'isr_list'
						, 'isr_loan_list', 'isr_atisr_list', 'efin_ppy_list', 'efin_acc_list', 'capital_list'
						, 'gi_list', 'telecom_list', 'bond_list', 'prepaid_list', 'p2pln_list'
						, 'p2piv_list', 'dc_list', 'public_list', 'sleep_list'
					];

					// 공공 자산 연결 SET
					let publicBzrg = this.myAssetsBzrgList.find(t => t.comnCVal == "public");
					if (publicBzrg != undefined) {
						response.public_list.forEach(t => {
							if (publicBzrg.orgList.find(o => o.infOfrmnOrgC == t.org_code && o.wrsList.find(p => p.accList.find(u => u.wrsCntn == t.cert_id)))) {
								t.is_consent = true;
							}
						});
					}
					rebuildAssets.forEach(t => {
						this.fn_addAssets(response[t]);
					});

					this.orgList.forEach(t => {
						t.orgs.filter(o => Boolean(orgList.find(p => p.org_code == o.orgC))).forEach(o => {
							if (o.assets != undefined && o.assets.length > 0) {
								if (o.extndScopes != undefined && o.extndScopes.length > 0) {
									if (o.amnOrgCYn == "1") {
										t.selectedExtndScopes = t.selectedExtndScopes.concat(o.extndScopes);
									}
								}
							} else {
								let failOrg = response.fail_org_list.find(p => p.org_code == o.orgC) || "";
								o.failMessage = this.fn_getFailMessage(failOrg.rsp_code);
							}
						});
					});

					this.$forceUpdate();
				});
			} 
		},

		fn_moveBzrg() {
			if (this.isFirstMounted) {
				this.isFirstMounted = false;
				setTimeout(() => { $("#link_" + (this.orgDsc == "rec" ? "bank" : this.orgDsc)).click(); }, 500);
			}
		},

		// 업권과 기관 자동 연결 화면제어
		fn_observerOrgConnect() {
			const orgConnect = document.querySelector('.asset_connect .category_tab');

			const stickyOrgNav = function(entries){
				if(!entries[0].isIntersecting){
					$(".asset_connect .category_tab").addClass('fixed');
				}else{
					$(".asset_connect .category_tab").removeClass('fixed');
					
					$.each($(".asset_connect .category_tab li"), function(i,obj){
						// $("> a", $(obj)).attr('aria-selected', false);
					});
				}
			}

			const orgObserver = new IntersectionObserver(stickyOrgNav, {
				root:null,
				rootMargin :'-51px 0px 0px 0px',
				threshold:1
			});

			orgObserver.observe(orgConnect);

			$('.popup_content').each(function(){
				let $parent = $(this);
				$parent.off('scroll.poplayout').on('scroll.poplayout', function() {		
					$.each($(".institu_wrap .category_cont .institu_group"), function(idx, item) {
						let _top = $(item).position().top;
						if(_top <= 90){
							$.each($(".organ_sel .category_tab li"), function(i,obj) {
								$("> a", $(obj)).attr('aria-selected', false);
							});

							$(">a", $(".organ_sel .category_tab li").eq(idx)).attr('aria-selected', true);
							fn_scrollOrgNav(idx);
						}	
					});
				});


				$(".organ_sel .category_tab a", $parent).each(function(){
					$(this).click(function(){
						const id = $(this).attr('href');
						const _curTop = $parent.scrollTop();
						const _top = _curTop + $(id).position().top - $(".organ_sel .category_tab").outerHeight() - 15;
						
						$parent.stop().animate({
							scrollTop : _top
						}, 300, function() {
							
						});
						// [v4.0] #접근성# 추가
						$.each($(id), function(){
							$(id).find('.institu_tit').attr('tabindex','0')
							$(id).siblings().find('.institu_tit').removeAttr('tabindex');
							setTimeout(function(){
								$(id).find('.institu_tit').focus();
							}, 20)
						})
					})
				})
			});			

			function fn_scrollOrgNav(idx) {
				const obj = $(".organ_sel .category_tab li").eq(idx);
				const _left = $(obj).offset().left;
				const _curLeft = $('.organ_sel .category_tab .scroller').scrollLeft();

				$(".organ_sel .category_tab .scroller").stop().animate({
					scrollLeft:_curLeft + _left - 20
				}, 400);
			}
		},

		fn_addAssets(dataList) {
			this.orgList.forEach(t => {
				let bzrgAssetList = dataList.filter(p => p.org_biz_code == t.bzrgCode);
				if (bzrgAssetList.length > 0) {
					t.orgs.forEach(p => {
						let orgAssetList = bzrgAssetList.filter(o => o.org_code == p.orgC);
						if (!p.hasOwnProperty('assets')) {
							p.assets = [];
						}
						if (orgAssetList.length > 0) {
							p.assets = p.assets.concat(orgAssetList.map(o => {
																		let r = this.fn_rebuildAsset(o);
																		if (t.bzrgCode == "card") {
																			if (!_.isEmpty(r.card_num)) {
																				r.key = r.card_num;
																			}
																		} else if (t.bzrgCode == "telecom") {
																			r.prod_name = this.fn_parseTeleType(r.type);
																		}
																		return r;
																	})
							);
	
							if (t.selectedOrgs.includes(p.orgC)) {
								p.assets.forEach(o => {
									t.selectedAssets.push(o);
								});
							}
						}
					});
				}
			});
		},

		fn_rebuildAsset(data) {
			const keyMap = {
				'prod_name': ['prod_name'],
				'card_name': ['prod_name'],
				'pp_name': ['prod_name'],
				'account_name': ['prod_name'],
				'fob_name': ['prod_name'],
				'account_id': ['prod_name'],
				'telecom_num': ['prod_name', 'telecom_num'],
				'bond_num': ['prod_name', 'key'],
				'lending_id': ['prod_name', 'key'],
				'invest_id': ['prod_name', 'key'],
				'dc_name': ['prod_name'],
				'cert_nm': ['prod_name'],
				
				'account_num': ['key'],
				'card_id': ['key'],
				'pp_id': ['key'],
				'insu_num': ['key'],
				'fob_id': ['key'],
				'sub_key': ['key'],
				'mgmt_id': ['key'],
				'dc_num': ['key'],
				'cert_id': ['key'],
				'sleep_num': ['key'],
				'point': ['point'],
				'bill': ['bill'],
				'loan': ['loan'],
				
				'seqno': ['seqno'],
				'card_num': ['card_num'],
				'type': ['type'],
				'lending_amt': ['lending_amt'],
				'invest_amt': ['invest_amt'],

				'org_code': ['org_code'],
				'org_biz_code': ['org_biz_code'],
				'scope': ['scope'],
				'org_name': ['org_name'],
				'is_consent': ['is_consent'],
				'insu_type': ['insu_type'],
			};
			let r = {};
			for (let t in data) {
				if (keyMap.hasOwnProperty(t)) {
					keyMap[t].forEach(p => r[p] = data[t]);
				}
			}
			return r;
		},

		// 모든 팝업 닫기 (isExternal = true인 경우 현재 팝업만 닫기)
		fn_close(response = {}) {
			let isExternal = this.isExternal;
			let isMoveMainAfterConnect = this.isMoveMainAfterConnect;
			if (!_.isEmpty(response) && response.isExternal != undefined) {
				isExternal = response.isExternal;
			}
			if (!_.isEmpty(response) && response.isMoveMainAfterConnect != undefined) {
				isMoveMainAfterConnect = response.isMoveMainAfterConnect;
			}

			let closeResponse = {
				"isExternal": isExternal,
				"isMoveMainAfterConnect": isMoveMainAfterConnect,
			};

			if (isExternal) {
				this.close(closeResponse);
			} else {
				this.closeAll(closeResponse);
			}

			if (isMoveMainAfterConnect) {
				routerService.moveMain();
			}
		},

		fn_openSearchSlide() {
			const config = {
				renderer: {
					component: COAR4042,
					cdata : {
						"filterOpt": this.filterOpt
					}
				}
			};

			modalService.openSlidePagePopup(config).then(response => {
				if (response != undefined) {
					this.filterOpt = response;
					this.fn_filterOrgList((o) => {
						let r = true;
						if (this.isOnKeyword) {
							r = o.orgnm.includes(this.srchKeyword.toUpperCase())
								|| o.orgnm.includes(this.srchKeyword.toLowerCase());
						}
						switch (this.filterOpt.code) {
							case "all":
								r = r && o.scrnMrkYn == "1";
								break;
							case "rec":
								r = r && o.amnOrgCYn == "1" && o.scrnMrkYn == "1";
								break;
							case "expr":
								r = r && o.exprYn == "1" && o.scrnMrkYn == "1";
								break;
							case "conn":
								r = r && o.colYn == "1" && o.scrnMrkYn == "1";
								break;
							case "unConn":
								r = r && o.colYn == "0" && o.scrnMrkYn == "1";
								break;
							default:
								r = r && o.orgBzrgC == this.filterOpt.code
									&& o.amnOrgCYn == "1" && o.scrnMrkYn == "1";
								break;
						}
						return r;
					});
					if (this.filterOpt.code == "all") {
						this.isOnFilter = false;
					} else {
						this.isOnFilter = true;
					}
					this.fn_resetCheckAll();
					this.$forceUpdate();
					this.$nextTick(() => {
						this.fn_observerOrgConnect();
					});
				}
			});
		},

		fn_searchKeyword() {
			if (this.isNull(this.srchKeyword)) {
				modalService.alert("기관명을 입력하세요.").then(() => { return; });
				return false;
			}
			this.fn_filterOrgList((o) => {
				let r = (o.orgnm.includes(this.srchKeyword.toUpperCase())
						|| o.orgnm.includes(this.srchKeyword.toLowerCase()))
						&& o.scrnMrkYn == "1"
						;
				if (this.isOnFilter) {
					switch (this.filterOpt.code) {
						case "all":
							r = r && o.scrnMrkYn == "1";
							break;
						case "rec":
							r = r && o.amnOrgCYn == "1" && o.scrnMrkYn == "1";
							break;
						case "expr":
							r = r && o.exprYn == "1" && o.scrnMrkYn == "1";
							break;
						case "conn":
							r = r && o.colYn == "1" && o.scrnMrkYn == "1";
							break;
						case "unConn":
							r = r && o.colYn == "0" && o.scrnMrkYn == "1";
							break;
						default:
							r = r && o.orgBzrgC == this.filterOpt.code && o.amnOrgCYn == "1" && o.scrnMrkYn == "1";
							break;
					}
				}
				return r;
			});

			this.isOnKeyword = true;
			this.$forceUpdate();
			this.$nextTick(() => {
				this.fn_observerOrgConnect();
			});
		},

		fn_resetKeyword() {
			this.srchKeyword = "";
			this.fn_filterOrgList((o) => {
				let r = true;
				if (this.isOnFilter) {
					switch (this.filterOpt.code) {
						case "all":
							r = r && o.scrnMrkYn == "1";
							break;
						case "rec":
							r = r && o.amnOrgCYn == "1" && o.scrnMrkYn == "1";
							break;
						case "expr":
							r = r && o.exprYn == "1" && o.scrnMrkYn == "1";
							break;
						case "conn":
							r = r && o.colYn == "1" && o.scrnMrkYn == "1";
							break;
						case "unConn":
							r = r && o.colYn == "0" && o.scrnMrkYn == "1";
							break;
						default:
							r = r && o.orgBzrgC == this.filterOpt.code && o.amnOrgCYn == "1" && o.scrnMrkYn == "1";
							break;
					}
				}
				return r;
			});
			this.isOnKeyword = false;
			this.$forceUpdate();
			this.$nextTick(() => {
				this.fn_observerOrgConnect();
			});
		},

		fn_filterOrgList(f) {
			let existFilteredData = false;
			this.orgList.forEach(t => {
				let isShow = false;
				t.orgs.forEach(o => {
					if (f(o)) {
						o.displayYn = "1";
						existFilteredData = true;
						isShow = true;
					} else {
						o.displayYn = "0";
					}
				});
				t.isShow = isShow;
			});
			return existFilteredData;
		},

		fn_showMaxAssetToast() {
			if (!this.isShowMaxAssetToast) {
				this.isShowMaxAssetToast = true;
				modalService.toast("기관별 자산이 100개 초과 시 전체 연결됩니다.");
			}
		},

		fn_checkAll(bzrgCode) {
			this.fn_showMaxAssetToast();
			let tBzrg = this.orgList.find(t => t.bzrgCode == bzrgCode);
			if (this.selectedFilterdOrgCn[this.orgList.findIndex(t => t.bzrgCode == bzrgCode)].cn == 0)  {
				let selectedOrgCn = this.selectedOrgAllCn;
				tBzrg.orgs.filter(t => t.displayYn == "1" && t.scrnMrkYn == "1")
							.forEach(t => {
								if (this.selectedOrgAllCn < this.MAX_ORG_CN) {
									tBzrg.selectedOrgs.push(t.orgC);
									if (t.assets != undefined && t.assets.length > 0) {
										tBzrg.selectedAssets = tBzrg.selectedAssets.filter(p => p.org_code != t.orgC).concat(t.assets);
									}
									if (t.extndScopes != undefined && t.extndScopes.length > 0) {
										tBzrg.selectedExtndScopes = tBzrg.selectedExtndScopes.concat(t.extndScopes);
									}
								}
								selectedOrgCn++;
							});
				if (selectedOrgCn > this.MAX_ORG_CN) {
					modalService.alert("안전한 자산 연결을 위해<br> 최대 50개까지 선택 가능해요.");
				}
			} else {
				tBzrg.selectedOrgs = tBzrg.selectedOrgs.filter(t => tBzrg.orgs.findIndex(p => t == p.orgC && p.displayYn == "0" && p.scrnMrkYn == "1") >= 0);
				tBzrg.selectedAssets = tBzrg.selectedAssets.filter(t => tBzrg.orgs.findIndex(p => t?.org_code == p.orgC && p.displayYn == "0" && p.scrnMrkYn == "1") >= 0);
				tBzrg.selectedExtndScopes = tBzrg.selectedExtndScopes.filter(t => tBzrg.orgs.findIndex(p => t.orgC == p.orgC && p.displayYn == "0" && p.scrnMrkYn == "1") >= 0);
			}
		},

		fn_checkOne(bzrgCode, orgC) {
			this.fn_showMaxAssetToast();
			let tBzrg = this.orgList.find(t => t.bzrgCode == bzrgCode);
			if (this.selectedOrgAllCn > this.MAX_ORG_CN) {
				modalService.alert("안전한 자산 연결을 위해<br> 최대 50개까지 선택 가능해요.").then((response) => {
					tBzrg.selectedOrgs = tBzrg.selectedOrgs.filter(t => t != orgC);
					tBzrg.selectedExtndScopes = tBzrg.selectedExtndScopes.filter(p => p.orgC != orgC);
					return false;
				});
				return false;
			} else {
				let assets = tBzrg.orgs.find(t => t.orgC == orgC).assets;
				if (Boolean(tBzrg.selectedOrgs.find(t => t == orgC))) {
					if (assets != undefined && assets.length > 0) {
						tBzrg.selectedAssets = tBzrg.selectedAssets.filter(p => p.org_code != orgC).concat(assets);
					}
					let extndScopes = tBzrg.orgs.find(t => t.orgC == orgC).extndScopes;
					if (extndScopes != undefined && extndScopes.length > 0) {
						tBzrg.selectedExtndScopes = tBzrg.selectedExtndScopes.filter(p => p.orgC != orgC).concat(extndScopes);
					}
				} else {
					tBzrg.selectedAssets = tBzrg.selectedAssets.filter(p => p.org_code != orgC);
					tBzrg.selectedExtndScopes = tBzrg.selectedExtndScopes.filter(p => p.orgC != orgC);
				}
				return true;
			}
		},

		fn_checkOneAsset(asset) {
			let bzrg = this.orgList.find(t => t.bzrgCode == asset.org_biz_code);
			let selectedAssets = bzrg.selectedAssets;
			let selectedOrgAssets = selectedAssets.filter(t => t.org_code == asset.org_code);

			if (selectedOrgAssets.length == 0) {
				if (bzrg.selectedOrgs.includes(asset.org_code)) {
					bzrg.selectedOrgs.splice(bzrg.selectedOrgs.findIndex(t => t == asset.org_code), 1);
					bzrg.selectedExtndScopes = bzrg.selectedExtndScopes.filter(t => t.orgC != asset.org_code);
				}
			} else {
				if (!bzrg.selectedOrgs.includes(asset.org_code)) {
					if (this.selectedOrgAllCn >= this.MAX_ORG_CN) {
						modalService.alert("안전한 자산 연결을 위해<br> 최대 50개까지 선택 가능해요.").then(() => {
							bzrg.selectedOrgs = bzrg.selectedOrgs.filter(t => t != asset.org_code);
							bzrg.selectedAssets.pop();
							return;
						});
					} else {
						bzrg.selectedOrgs.push(asset.org_code);
					}
				}

				if (selectedOrgAssets.length > this.MAX_ASSET_CN) {
					let alertMsg = "하나의 기관에 100개가 넘는 자산을<br>선택 할 경우 해당 기관의 전체 자산을<br> 선택하셔야 합니다.";
					const confirm_config = {
						content: [alertMsg],
						title: "",
						ALERT_CONFIRM_TEXT: "전체선택",
						ALERT_CANCEL_TEXT: "취소"
					};
					modalService.confirm(confirm_config).then(text => {
						if (text === "취소") {
							bzrg.selectedAssets.pop();
						} else {
							let assets = bzrg.orgs.find(t => t.orgC == asset.org_code).assets;
							bzrg.selectedAssets = bzrg.selectedAssets.filter(t => t.org_code != asset.org_code).concat(assets);
						}
					});

					let extndScopes = bzrg.orgs.find(t => t.orgC == asset.org_code).extndScopes;
					if (extndScopes != undefined && extndScopes.length > 0
						&& bzrg.selectedExtndScopes.filter(t => t.orgC == asset.org_code).length == 0) {
						bzrg.selectedExtndScopes = bzrg.selectedExtndScopes.filter(p => p.orgC != asset.org_code).concat(extndScopes);
					}
				}
			}
		},

		fn_checkOneScope(bzrgCode, orgC) {
			let tBzrg = this.orgList.find(t => t.bzrgCode == bzrgCode);
			if (!tBzrg.selectedOrgs.includes(orgC)) {
				if (this.selectedOrgAllCn >= this.MAX_ORG_CN) {
					modalService.alert("안전한 자산 연결을 위해<br> 최대 50개까지 선택 가능해요.").then(() => {
						tBzrg.selectedExtndScopes.pop();
						return;
					});
					return;
				} else {
					tBzrg.selectedOrgs.push(orgC);
					if (tBzrg.selectedAssets.filter(t => t.org_code == orgC) == undefined
						|| tBzrg.selectedAssets.filter(t => t.org_code == orgC).length == 0) {
							let assets = tBzrg.orgs.find(t => t.orgC == orgC).assets;
							if (!_.isEmpty(assets)) {
								tBzrg.selectedAssets = tBzrg.selectedAssets.filter(t => t.org_code != orgC).concat(assets);
							}
					}
				}
			} else {
				if (tBzrg.selectedExtndScopes.filter(t => t.orgC == orgC).length == 0) {
					tBzrg.selectedOrgs = tBzrg.selectedOrgs.filter(t => t != orgC);
					tBzrg.selectedAssets = tBzrg.selectedAssets.filter(t => t.org_code != orgC);
				}
			}
		},

		fn_resetCheckAll() {
			this.orgList.forEach(t => {
				t.selectedAssets = [];
				t.selectedOrgs = [];
				t.selectedExtndScopes = [];
			});
		},

		fn_nextProcess() {
			// const isProduct = import.meta.env.VITE_ENV === 'D';	// 운영
			// if (this.enableAssetConnect) {
			// 	modalService.alert("제공기관의 운영환경 자산연결을 준비 중입니다.").then(() => {
			// 		return;
			// 	});
			// } else {
				this.fn_openSelectCertDsc();
			// }
		},

		fn_openSelectCertDsc() {
			const config = {
				component : COAR4003,
				params : {
					title: "자산연결",
					subTitle: "자산연결을 위해",
					useCertList: ["joint", "finance", "pass"],
				}
			}
			// NH MOBILE 인증서 미 오픈 [20250605]
			const isDev = import.meta.env.VITE_ENV === 'D';	// 개발
			if (isDev && !(window.location.host.indexOf('localhost') > -1)) {
				config.params.useCertList.push("nh");
			}

			modalService.openPopup(config).then(response => {
				if (!_.isEmpty(response) && response.certDsc != undefined) {
					this.certDsc = response.certDsc;
					this.custNo = response.custNo || "";
					this.fn_openConfirmTerms(this.orgList);
				}
			});
		},

		fn_openConfirmTerms(orgList) {
			this.selectedOrgList = [];
			orgList.forEach(t => {
				this.selectedOrgList = this.selectedOrgList.concat(
					[...t.orgs]
						.filter(o => t.selectedOrgs.includes(o.orgC))
						.map(o => ({
							"orgBzrgC": o.orgBzrgC,
							"orgC": o.orgC,
							"orgnm": o.orgnm,
							"colYn": o.colYn,
							"assets": t.selectedAssets.filter(p => p.org_code == o.orgC),
						}))
				);
			});

			const config = {
				component : COAR4009,
				params : {
					txRqInfo: {
						termsTitle: this.topTitle,
						selectedOrgList: this.selectedOrgList,
					},
				}
			}

			modalService.openPopup(config).then(response => {
				if (!_.isEmpty(response)) {
					this.termsInfo = response;
					if (this.certDsc == "joint" || this.certDsc == "finance") {
						this.fn_getSignIdentityVerification(this.fn_makeConsent(response, orgList));
					} else {
						this.fn_getSignPrivateAuthentication(this.fn_makeConsent(response, orgList));
					}
				} else {
					this.fn_openSelectCertDsc();
				}
			});
		},

		fn_getSignIdentityVerification(consentList) {
			const config = {
				url:  "/co/ar/05r01",
				data : {
					svcnm : "서비스명",
					orgC : ""
				}
			};
			apiService.call(config).then(response => {
                const attcC = response.attcC || '';
                const attcCext = response.attcCext || '';
				
				let requestList = consentList.map(t => ({
					"orgCode": t.snd_org_code,
					"ucpidRequestInfo" : {
						"ucpidNonce" : attcC,
						"userAgreement" : "금융분야 마이데이터 통합인증을 위한 인증서 본인확인서비스 이용약관, 개인정보처리, 고유식별정보 수집·이용 및 위탁에 동의합니다.", 
						"ispUrlInfo": import.meta.env.VITE_API_URL,
						"userAgreeInfo":{
							"realName" : true,
							"gender" : true,
							"nationalInfo": true,
							"birthDate" : true,
							"ci" : true
						}
					},
					"consentInfo" : {
						"consentNonce": attcCext,
						"consent" : t
					}
				}));

				let certInfo = {
					"signDsc": "1",
					"consentList": consentList,
					"signed": {},
				};

				if (this.certDsc == "joint") {
					const jointConfig = {
						component: COAR4006,
						params: {
							"requestList": requestList
						}
					};
					modalService.openPopup(jointConfig).then(jointResponse => {
						if (!_.isEmpty(jointResponse)) {
							certInfo.signed = Object.assign(jointResponse, { "attcC": attcC, "attcCext": attcCext, })
							this.fn_openAtkIssueRequest(certInfo);
						}
					});
				} else {
					this.startSessionTimerAuth();
					let signListOne = [], signListTwo = [];
					let caOrgOne, caOrgTwo;

					const financeConfig = {
						"content": requestList,
						"orgCode": import.meta.env.VITE_PRIVATE_ORGCODE,
						"apiKey": import.meta.env.VITE_PRIVATE_APIKEY
					}
					if (this.getUserInfo("chnl") === "385") {
						// 스뱅
						appService.openPFMOFPFinCert(financeConfig).then(financeResponse => {
							clearInterval(this.sessionTimerAuthor);
							
							const signedDataList = financeResponse.result.signedDataList || []
							for (let i=0; i < signedDataList.length; i++) {
								signListOne.push({"orgCode": signedDataList[i].orgCode, "signedPersonInfoReq": signedDataList[i].signedPersonInfoReq});
								signListTwo.push({"orgCode": signedDataList[i].orgCode, "signedConsent": signedDataList[i].signedConsent});
							}
							caOrgOne = financeResponse.result.caOrg || '';
							caOrgTwo = financeResponse.result.caOrg || '';

							this.fn_openAtkIssueRequest(Object.assign(certInfo, {
									"signed": {
										"requestList": requestList,
										"signListOne": signListOne,
										"signListTwo": signListTwo,
										"caOrgOne": caOrgOne,
										"caOrgTwo": caOrgTwo,
										"attcC": attcC,
										"attcCext": attcCext,
									}
								}
							));
						})
						.catch(error => {
							clearInterval(this.sessionTimerAuthor);
							modalService.alert(error);
						});
					} else {
						// 콕뱅
						appService.cokBankOpenPFMOFPFinCert(financeConfig).then(financeResponse => {
							clearInterval(this.sessionTimerAuthor);
							if(financeResponse.errorMessage !== undefined) {
								return false;
							}

							const signedDataList = JSON.parse(financeResponse.result).signedDataList || [];
							for (let i=0; i < signedDataList.length; i++) {
								signListOne.push({"orgCode": signedDataList[i].orgCode, "signedPersonInfoReq": signedDataList[i].signedPersonInfoReq});
								signListTwo.push({"orgCode": signedDataList[i].orgCode, "signedConsent": signedDataList[i].signedConsent});
							}
							caOrgOne = JSON.parse(financeResponse.result).caOrg || '';
							caOrgTwo = JSON.parse(financeResponse.result).caOrg || '';

							this.fn_openAtkIssueRequest(Object.assign(certInfo, {
									"signed": {
										"requestList": requestList,
										"signListOne": signListOne,
										"signListTwo": signListTwo,
										"caOrgOne": caOrgOne,
										"caOrgTwo": caOrgTwo,
										"attcC": attcC,
										"attcCext": attcCext,
									}
								}
							));
						})
						.catch(error => {
							clearInterval(this.sessionTimerAuthor);
							modalService.alert(error);
						});;
					}
				}

            });
		},

		fn_getSignPrivateAuthentication(consentList) {
			if (this.certDsc == "pass") {
				// pass
				const config = {
					component: COAR4021,
					params: {
						"endDate": this.termsInfo.end_date,
						"consentList": consentList,
					}
				};

				modalService.openPopup(config).then(response => {
					if (!_.isEmpty(response) && response.resCode == "00000") {
						this.fn_openAtkIssueResult(response.succOrgList);
					}
				});
			} else {
				let chn = this.getUserInfo('chnl') === '385' ? "002" : "003";
				if (this.getUserInfo('chnl') === '385') { // 스뱅
					appService.getUuid().then(response => {
						console.log("RESPONSE >>>", response);
						let result = response.result;
						// AOS는 파싱이 필요하고, IOS는 파싱이 불필요함
						// AOS는 될거고, IOS는 catch로 빠짐
						try { result = JSON.parse(response.result); } catch (e) { }
						this.fn_getNhMobileJWT(result.uuid, chn, consentList);
					});
				} else { // 콕뱅
					appService.cokBankGetUuid().then(response => {
						let result = response.result;
						// AOS는 파싱이 필요하고, IOS는 파싱이 불필요함
						// AOS는 될거고, IOS는 catch로 빠짐
						try { result = JSON.parse(response.result); } catch (e) { }
						this.fn_getNhMobileJWT(result.uuid, chn, consentList);
					});
				}
			}
		},

		fn_getNhMobileJWT(uuid, chn, consentList) {
			const config = {
				url:  "/co/ar/02r03",
				data : {
					uid : uuid,
					chn : chn
				}
			};

			apiService.call(config).then(response => {
				console.log("response is >>> ", response);
				if (response.resCode == "00000") {
					this.fn_getCertTxId(uuid, response.accessToken, consentList);
				} else {
					modalService.alert(response.resMsg);
				}
			});
		},

		fn_getCertTxId(uuid, jwt, consentList) {
			if (_.isEmpty(jwt)) {
				modalService.alert("인증처리 중 오류가 발생했습니다. (인증토큰)");
				return;
			}

			if (_.isEmpty(this.custNo)) {
				modalService.alert("인증처리 중 오류가 발생했습니다. (고객번호)");
			}

			let return_app_scheme_url = "";
			if (this.getUserInfo('chnl') === '385') {
                return_app_scheme_url = "newnhsmartmydata";
            } else {
                return_app_scheme_url = "nhcokmydata";
            }

			let rebuildConsentList = consentList.map(t => ({
                "consentLen": JSON.stringify(t).length,
                "consentTitle": "인증요청102",
                "consent": JSON.stringify(t),
                "txId": t.snd_org_code,
            }));

			const config = {
				url:  "/co/ar/02r04",
				data : {
					mydtCusno: this.getUserInfo("mydtCusno"),
                    caOrg: "ZYAABG0000",
                    requestTitle: "NH모바일 통합인증-102 인증요청",
                    deviceCode: "MO",
                    deviceBrowser: "WB",
                    returnAppSchemeUrl: return_app_scheme_url,
                    consentType: "1",
                    consentCnt: rebuildConsentList.length,
                    consentList: rebuildConsentList,
					apiSvcnm: "통합인증 개인신용정보 전송요구",
					clientId: this.getUserInfo('svcClientId'),
				}
			};

			apiService.call(config).then(response => {
				console.log("response is >>> ", response);
				if (response.rspCode == "00000") {
					this.fn_openNhCert(uuid, jwt, response.certTxId, response.signTxId, response.consentList);
				} else {
					modalService.alert(response.rspMsg);
				}
			});

		},

		fn_openNhCert(uuid, jwt, certTxId, signTxId, consentList) {
			let chn = this.getUserInfo('chnl') === '385' ? "002" : "003";
			const config = {
				"type": "AC",
				"uid": uuid,
				"chn": chn,
				"locale": "ko_KR",
				"accessToken": jwt,
				"pushInfo": {
					"serviceId": "ARAC1000R",
					"CERT_TX_ID": certTxId,
					"io_svs_gbn": "01",
					"TRAN_TYPE_CD": "MYDATA",
					"RQST_LANG_TYPE": "",
				},
				"custNo": this.custNo,
			};

				this.startSessionTimerAuth();
			if (this.getUserInfo('chnl') === '385') {
                appService.openNHCert(config).then(response => {
					clearInterval(this.sessionTimerAuthor);
					console.log("SMART B Mobile cert >> ", response);
					this.fn_openAtkIssueRequest({
						"signDsc": "2",
						"consentList": consentList,
						"signed": {
							"certTxId": certTxId,
							"signTxId": signTxId,
							"caOrg": "ZYAABG0000",
						}
					});
				});
			} else {
				appService.cokBankOpenNHCert(config).then(response => {
					clearInterval(this.sessionTimerAuthor);
					console.log("COK B Mobile cert >>> ", response);
					this.fn_openAtkIssueRequest({
						"signDsc": "2",
						"consentList": consentList,
						"signed": {
							"certTxId": certTxId,
							"signTxId": signTxId,
							"caOrg": "ZYAABG0000",
						}
					});
				});

			}		
		},

		fn_openAtkIssueRequest(certInfo) {
			const config = {
				component: COAR4007,
				params: {
					"endDate": this.termsInfo.end_date,
					"consentList": this.consentList,
					"certInfo": certInfo,
				}
			};
			modalService.openPopup(config).then(response => {
				if (!_.isEmpty(response)) {
					if (response.resCode == "00000") {
						this.fn_openAtkIssueResult(response.succOrgList);
					} else {
						// TODO 실패 응답 [20250605]
						// 서버 장애혹은 인증 실패로 
						// 다시 자산연결할 수 있도록
						// 자산 선택 화면에 머무르도록 우선 조치
					}
				}
			});
		},

		fn_openAtkIssueResult(succOrgList) {
			const config = {
				component : COAR4010,
				params : {
					"succOrgList" : this.selectedOrgList.filter(t => Boolean(succOrgList.find(o => o.org_code == t.orgC))),
					"failOrgList" : this.selectedOrgList.filter(t => !Boolean(succOrgList.find(o => o.org_code == t.orgC))),
				}
			};

			modalService.openPopup(config).then(response => {
				if (!_.isEmpty(response)) {
					if (response.mode == "complete") {
						this.fn_close();
					} else if (response.mode == "close") {
						this.fn_close({"isMoveMainAfterConnect": false});
					} else if (response.mode == "reconnect") {
						// 재연결하기위해 선택된 제공기관 유지
						// 동의정보 등 reset할까..?
					}
				} else {
					this.fn_close();
				}
			});
		},

		fn_makeConsent(termsInfo, orgList) {
			let consentList = [];

			this.selectedOrgList.forEach(t => {
				let consent = {
					"snd_org_code" : t.orgC,
					"rcv_org_code" : "ZVAAAZ0000",
					"is_scheduled" : termsInfo.is_scheduled.toString(),
					"period" : "99991231",
					"target_info" : [],
				};

				consent.target_info = this.fn_makeTargetInfos(t, orgList);

				if (t.orgBzrgC == "public") {
					if (termsInfo.is_scheduled) {
						consent.fnd_cycle = "1/m";
						consent.add_cycle = "1/m";
					}
					consent.end_date = dateFormat(moment().add("365", "days"), "YYYYMMDD");
					t.assets.filter(t => t.key == "L161").forEach(t => {
						consent.rpSfgvGruC = termsInfo.selectedRegion;
					});
					consent.purpose = "전송요구를 통한 공공마이데이터 통합조회 서비스의 이용";
					consent.orgBzrgC = "public";
				} else {
					if (termsInfo.is_scheduled) {
						consent.fnd_cycle = termsInfo.fnd_cycle;
						consent.add_cycle = termsInfo.add_cycle;
					}
					consent.end_date = termsInfo.end_date;
					consent.purpose = "전송요구를 통한 본인신용정보 통합조회 서비스의 이용";

					if ("bank|efin|invest".split("|").includes(t.orgBzrgC)) {
						consent.is_consent_trans_memo = termsInfo.is_consent_trans_memo.toString();
					}
					if ("card|efin|telecom".split("|").includes(t.orgBzrgC)) {
						consent.is_consent_merchant_name_regno = termsInfo.is_consent_merchant_name_regno.toString();
					}
					if ("efin".split("|").includes(t.orgBzrgC)) {
						consent.is_consent_trans_category = termsInfo.is_consent_trans_category.toString();
					}
				}
				consentList.push(consent);
			});
			return consentList;
		},

		fn_makeTargetInfos(org, orgList) {
			let targetInfos = [];
			if ((org.colYn == "0" && org.orgBzrgC != "public")
				|| (org.assets != undefined && org.assets.length > this.MAX_ASSET_CN)) {
				// || (org.orgC === 'A4AAAZ0000' && this.cbtType && (org.assets == undefined || org.assets.length == 0))) {
					targetInfos = [{ "scope": org.orgBzrgC + ".list" }].concat(this.fn_getAllAssetTargetInfos(org.orgBzrgC));
			} else {
				if (org.orgBzrgC != "public") {
					targetInfos.push({ "scope": org.orgBzrgC + ".list" });
				}
				org.assets.forEach(t => {
					if (org.orgBzrgC == "bank"
						&& (t.scope == "bank.deposit bank.loan" || t.scope == "bank.loan bank.deposit")) {
						let scopes = t.scope.split(" ");
						scopes.forEach(o => {
							if (!Boolean(targetInfos.find(p => p.scope == o))) {
								targetInfos.push({ "scope": o, "asset_list": [], });
							}
							targetInfos.find(p => p.scope == o).asset_list.push(
								Object.assign({ "asset": t.key }, (_.isEmpty(t.seqno) ? {} : { seqno: t.seqno }))
							);
						});
					} else {
						if (!Boolean(targetInfos.find(o => o.scope == t.scope))) {
							targetInfos.push({ "scope": t.scope, "asset_list": [], });
						}
						targetInfos.find(o => o.scope == t.scope).asset_list.push(
							Object.assign({ "asset": t.key }, (_.isEmpty(t.seqno) ? {} : { seqno } = t))
						);
						if (org.orgBzrgC == "public" && t.key == "L167") {
							targetInfos.find(o => o.scope == t.scope).asset_list.push(
								Object.assign({ "asset": "L168" })
							);
						}
					}
				});
			}

			if (!_.isEmpty(org.extndScopes) && org.extndScopes.length > 0) {
				orgList.find(t => t.bzrgCode == org.orgBzrgC)
					.selectedExtndScopes.filter(t => t.orgC == org.orgC)
					.forEach(t => {
						targetInfos.push({ "scope": t.scope });
					});
			}
			return targetInfos;
		},

		fn_getAllAssetTargetInfos(bzrgCode) {
			const allAssetTargetInfo = {
				"bank": ["deposit", "invest", "loan", "isa", "irp", "prepaid", "dc", "sleep_noncont"],
				"card": ["card", "prepaid"],
				"invest": ["account", "irp", "dc"],
				"insu": ["insurance", "loan", "irp", "sleep_noncont"],
				"efin": ["prepaid", "paid"],
				"capital": ["loan"],
				"telecom": ["mgmt"]
			};
			const nonListTargetInfo = {
				"bank": ["db"],
				// "card": ["point", "bill", "loan"],
				"invest": ["db"],
				"insu": ["db"],
			};
			return (allAssetTargetInfo[bzrgCode] || []).map(t => (
				{
					"scope": bzrgCode + "." + t,
					"asset_list": [
						{
							"asset": "all_asset"
						}
					]
				}
			)).concat((nonListTargetInfo[bzrgCode] || []).map(t => (
				{
					"scope": bzrgCode + "." + t,
				}
			)));
		},

		fn_getFailMessage(code) {
			let failMessage = [
				{ code : "40302", message : "연결 요청 중 일시적인 오류가 발생했습니다. 잠시 후 다시 이용해 주세요." },
				{ code : "50001", message : "연결 요청 중 일시적인 오류가 발생했습니다. 잠시 후 다시 이용해 주세요." },
				{ code : "50005", message : "연결 요청 중 일시적인 오류가 발생했습니다. 잠시 후 다시 이용해 주세요." },
				{ code : "50003", message : "연결 요청 중 일시적인 오류가 발생했습니다. 잠시 후 다시 이용해 주세요." },
				{ code : "50004", message : "연결 요청 중 일시적인 오류가 발생했습니다. 잠시 후 다시 이용해 주세요." },
				{ code : "40001", message : "연결 요청이 정상적으로 처리되지 않았습니다." },
				{ code : "40002", message : "연결 요청이 정상적으로 처리되지 않았습니다." },
				{ code : "40003", message : "연결 요청이 정상적으로 처리되지 않았습니다." },
				{ code : "40004", message : "연결 요청이 정상적으로 처리되지 않았습니다." },
				{ code : "40303", message : "연결 요청이 정상적으로 처리되지 않았습니다." },
				{ code : "40401", message : "연결 요청이 정상적으로 처리되지 않았습니다." },
				{ code : "40501", message : "연결 요청이 정상적으로 처리되지 않았습니다." },
				{ code : "42901", message : "연결 요청이 정상적으로 처리되지 않았습니다." },
				{ code : "40104", message : "API 사용 권한이 없거나 올바르지 않은 호출입니다." },
				{ code : "40301", message : "API 사용 권한이 없거나 올바르지 않은 호출입니다." },
				{ code : "40106", message : "전송요구 종료시점을 경과했습니다." },
				{ code : "40304", message : "최근 5년을 경과한 개인신용정보는 요청 할 수 없습니다." },
				{ code : "40101", message : "개인신용정보 조회 권한 요청 중 오류가 발생하였습니다." },
				{ code : "40105", message : "개인신용정보 조회 권한 요청 중 오류가 발생하였습니다." },
				{ code : "00000", message : "개인신용정보 조회 권한 요청 중 오류가 발생하였습니다." },
				{ code : "40102", message : "보안 또는 인증서 검증에 실패 하였습니다." },
				{ code : "40103", message : "보안 또는 인증서 검증에 실패 하였습니다." },
				{ code : "50009", message : "정기적 전송 가능 시간대가 아닙니다." },
				{ code : "40305", message : "연결 요청 자산은 유효한 자산이 아닙니다." },
				{ code : "40402", message : "연결 요청 자산은 유효한 자산이 아닙니다." },
				{ code : "40403", message : "해당 기관에 보유한 자산이 없습니다." },
				{ code : "99999", message : "해당 기관에 보유한 자산이 없습니다." },
				{ code : "50008", message : "시스템 정기 점검 중입니다." },
				{ code : "50005", message : "중계기관 이용기관 서비스 중 오류가 발생하였습니다." },
				{ code : "50006", message : "중계기관 이용기관 서비스 중 오류가 발생하였습니다." },
				{ code : "50007", message : "중계기관 이용기관 서비스 중 오류가 발생하였습니다." },
			];
			return (failMessage.find(t => t.code == code)?.message || "선택 기관의 오류로 조회에 실패하였습니다.") + "<br>잠시 후 다시 시도해주세요.";
		},

		fn_getScopeName(scope, insu_type = '') {
			const scopeName = {
				"bank": {
					"sleep_noncont": "휴면계좌"
				},
				"insu": {
					"sleep_noncont": {
						"01": "휴면보험금",
						"02": "미청구보험금"
					}
				}
			}
			// 휴면보험금, 미청구보험금
			let scopes = scope.split(" ");

			return scopes.map(t => {
				let detailScope = t.split(".");
				if (detailScope.length == 2) {
					if (!_.isEmpty(insu_type)) {
						return scopeName[detailScope[0]][detailScope[1]][insu_type];
					} else {
						return scopeName[detailScope[0]][detailScope[1]];
					}
				} else {
					return "";
				}
			}).join(" ");
		},

		fn_parseTeleType(type) {
			return _.find(this.teleType, d => d.key === type).value
		},

		startSessionTimerAuth() {
			this.sessionTimerAuthor = setInterval(() => {
				this.$store.dispatch('config/extendSession')

				//pfm 로그인 연장을 위한 더미 API콜 처리
				const config = {
					url: '/co/co/00r06',
					data: { "mydtCusno" : this.getUserInfo('mydtCusno'), },
					disableLoading : true,
				}
				apiService.call(config).then(() =>{ });
			}, 30*1000);
		},

		fn_setEnableConnectAssset() {
			this.assetConnectClickCount++;
		},

    },

    components : {
		LottieAnimation
    },

	destroyed() {
		clearInterval(this.sessionTimerAuthor)
	}
}

</script>