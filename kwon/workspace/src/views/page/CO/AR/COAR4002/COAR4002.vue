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
			<h1>자산연결</h1>
			<!--<button type="button" class="prev"><span class="blind">이전</span></button>-->
		</div>
		
		<div class="popup_content">
			<div class="asset_connect organ_sel">
				<div class="tit_area">
					<h2 class="headline sm"><strong>연결할 기관</strong>을 선택해 주세요.</h2>
					<span class="progress" role="progressbar" aria-valuetext="전체 4단계 중 1단계" aria-valuemax="4" aria-valuenow="1"><em class="now">01</em><span class="total">04</span></span>
				</div>
				<div class="input">
					<input type="text" name="srchKeyword" id="srchKeyword" placeholder="기관명을 입력해 주세요." v-model="srchKeyword">
					<button v-if="isOnKeyword" type="button" class="btn_delete" @click="fn_resetKeyword()"><span class="blind">삭제</span></button>
					<button type="button" class="btn_search " @click="fn_searchKeyword()"><span class="blind">검색</span></button>
				</div>

				<div class="institu_wrap">
					<div class="category_tab">
						<div class="scroller">
							<ul role="tablist">
								<template v-for="(item, idx) in orgList">
								<li v-if="item.scrmode.includes(scrmode)" :key="idx">
									<a :href="'#institu_' + item.scope" role="tab" :aria-selected="item.scope == orgDsc">{{item.scopeName}}
										<span v-if="selectedOrgCn[idx].cn > 0">{{selectedOrgCn[idx].cn}}</span>
									</a>
								</li>
								</template>
							</ul>
						</div>
					</div>

					<div class="top_desc">
						<div></div>
						<a href="javascript:void(0);" class="btn_recom" title="옵션 선택" @click="fn_openSearchSlide()">
							<span class="ico_line_down"><span class="blind">현재옵션</span>{{filterOpt.name}}</span>
						</a>
					</div>
					
					<div class="category_cont">
						<template v-for="(scope, idx) in orgList">
							<div v-if="scope.scrmode.includes(scrmode)" :key="idx" class="institu_group" :id="'institu_' + scope.scope">
								<div class="tit_area">
									<strong class="institu_tit">{{scope.scopeName}} <em v-if="selectedOrgCn[idx].cn > 0" class="num">{{selectedOrgCn[idx].cn}}</em></strong>
									<div class="checkbox noicon checkGroup">
										<input type="checkbox" :name="'checkAll_' + scope.scope" :id="'checkAll_' + scope.scope"
											v-model="selectedScopeList" :value="scope.scope" @change="fn_checkAll(scope.scope)" />
										<label v-if="selectedFilterdOrgCn[idx].cn == 0" :for="'checkAll_' + scope.scope">전체선택</label>
										<label v-else :for="'checkAll_' + scope.scope"><span class="blind">전체</span>선택해제</label>
									</div>
								</div>
								<template v-if="scope.orgs.filter(t => t.displayYn == '1' && t.scrnMrkYn == '1').length > 0">
									<ul class="sel_list">
										<template v-for="(org, innerIdx) in scope.orgs">
											<li v-if="org.displayYn == '1' && org.scrnMrkYn == '1'" :key="innerIdx" class="formItem">
												<div class="checkbox border">
													<input type="checkbox" :name="'checkbox_' + org.orgC" :id="'checkbox_' + org.orgC"
														:readonly="org.orgC === 'A4AAAZ0000' && !cbtType" :disabled="org.orgC === 'A4AAAZ0000' && !cbtType"
														v-model="orgList[idx].selectedOrgs" :value="org.orgC" @change="fn_checkOne(scope.scope, org.orgC)">
													<label :for="'checkbox_' + org.orgC">
														<i :class="'ico_bank ' + org.orgC"></i>
														<strong class="bank_name">{{org.orgnm}}</strong>
														<template v-if="org.colYn == '1'">
															<span v-if="org.exprYn == '1'" class="txt_status end">만료예정</span>
															<span v-else class="txt_status">연결됨</span>
														</template>
													</label>
												</div>
											</li>
										</template>
									</ul>
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
						</template>

					</div>
				</div>
				<!--
				<div class="institu_desc">
					<p class="txt">원하는 기관이 없다면<br>전체 기관에서 직접 선택해보세요.</p>
					<a href="#nolink" class="link"><span>395개</span> 전체 기관 보기</a>
				</div>
				-->

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
		<a href="#nolink" class="btn_close" @click="fn_close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
/*eslint-disable */
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import {dayDiff, dateFormat} from '@/utils/date'

import LottieAnimation from 'lottie-web-vue'
import {mapGetters} from 'vuex'
import _ from 'lodash'

import COAR4009 from '@/views/page/CO/AR/COAR4009/COAR4009.vue'
import COAR4042 from '@/views/page/CO/AR/COAR4042/COAR4042.vue'

export default {
    name : "COAR4002",
    data: () => {
        return {
			MAX_ORG_CN: 50,
			CURR_DATE: dateFormat(new Date(), 'YYYYMMDD'),

			orgList: [{"scope": "bank", "scopeName": "은행", "scrmode": "UNSC",
							"orgKey": "bank_org", "orgCn": 0, "orgs": [],
							"selectedOrgs": []}
						, {"scope": "card", "scopeName": "카드", "scrmode": "UNSC",
							"orgKey": "card_org", "orgCn": 0, "orgs": [],
							"selectedOrgs": []}
						, {"scope": "insu", "scopeName": "보험", "scrmode": "UNS",
							"orgKey": "insu_org", "orgCn": 0, "orgs": [],
							"selectedOrgs": []}
						, {"scope": "telecom", "scopeName": "통신", "scrmode": "UNS",
							"orgKey": "tele_org", "orgCn": 0, "orgs": [],
							"selectedOrgs": []}
						, {"scope": "invest", "scopeName": "증권", "scrmode": "UNS",
							"orgKey": "invest_org", "orgCn": 0, "orgs": [],
							"selectedOrgs": []}
						, {"scope": "efin", "scopeName": "페이", "scrmode": "UNSC",
							"orgKey": "efin_org", "orgCn": 0, "orgs": [],
							"selectedOrgs": []}
						, {"scope": "public", "scopeName": "공공", "scrmode": "UNS",
							"orgKey": "public_org", "orgCn": 0, "orgs": [],
							"selectedOrgs": []}
						, {"scope": "capital", "scopeName": "할부금융", "scrmode": "UNS",
							"orgKey": "capi_org", "orgCn": 0, "orgs": [],
							"selectedOrgs": []}],
			selectedScopeList: [],

			srchKeyword: "",
			isOnKeyword: false,
			filterOpt: {"code": "all", "name": "전체선택"},
			isOnFilter: false,

			// 파라메터
			orgDsc		: '',
			isExternal	: false,

			// 팝업 호출 파라메터
			selectedOrgList: [],
			moduleList: [],	// 다음 프로세스 파라미터용 기관 목록

			// 팝업 수신 데이터
			certDsc: "", // 인증방법구분 (공동인증 : joint, 금융인증 : finance, 패스인증 : pass)


			///////////////// 연결기관관리 팝업 파라미터 ///////////////// 
			isMramNew	: false,// '연결기관관리' 팝업에서 신규추가로 넘어온 여부
			isMramMod	: "",// '연결기관관리' 팝업에서 변경으로 넘어온 여부
			orgDsc		: '',	// 업권
			mramSelList : [],	// '연결기관관리'에서 선택한 기관 리스트
			////////////////////////////////////////////////////////////
        }
	},
	beforeMount() {
		
	},
    mounted() {
		this.initComponent(this.params);
        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     ;
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
			return this.orgList.map(t => { return { "scope": t.scope, "cn": t.selectedOrgs.length}});
		},

		selectedFilterdOrgCn() {
			if (this.isOnFilter || this.isOnKeyword) {
				return this.orgList.map(t => {
					return { "scope": t.scope,
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
		}
	},
    methods: {
        initComponent(param = {}) {
			this.orgDsc = param.orgDsc || 'bank';
			this.isMramNew = param.isMramNew || false;
			this.isMramMod = param.isMramMod || "";
			this.mramSelList = param.mramSelList || [];
			this.isExternal = param.isExternal || false;

			this.getData();
        },

        getData() {
			const config = {
				url : "/co/ar/02r01",
				data : {
					"mydtCusno" : this.getUserInfo("mydtCusno"),
					"ofrAttcMethC" : "01"
				}
			}

			apiService.call(config).then(response => {
				let selectedOrgCn = this.selectedOrgAllCn;

				this.orgList.forEach(t => {
					t.orgs = response[t.orgKey] || [];
					t.orgCn = t.orgs.length;
					// 중앙회 연결처리

					let scpoedOrg = this.myAssetsBzrgList.find(o => o.comnCVal == t.scope);
					let assetList = [];
					if (scpoedOrg != undefined && scpoedOrg.orgList != undefined) {
						assetList = scpoedOrg.orgList;
					}

					t.orgs.forEach(o => {
						o.displayYn = "1";

						if (t.scope == "bank") {
							if (o.orgC === "A4AAAZ0000") {
								o.colYn = "1";
							}
						}

						if (assetList.length > 0) {
							let asset = assetList.find(p => p.infOfrmnOrgC == o.orgC);
							if (asset != undefined) {
								o.exprYn = (dayDiff(asset.tmsEdDt, this.CURR_DATE) >= 0
												&& dayDiff(asset.tmsEdDt, this.CURR_DATE) <= 30)
												|| (dayDiff(asset.tmsEdDt, this.CURR_DATE) < 0) ? "1" : "0";
							}
						}

						if (!this.isExternal) {
							let orgDsc = this.orgDsc;
							if (orgDsc == "all") {
								orgDsc = t.scope;
							}
							if (t.scope == orgDsc) {
								if (o.amnOrgCYn == "1") {
									if (this.selectedOrgAllCn < this.MAX_ORG_CN) {
										t.selectedOrgs.push(o.orgC);
									}
									selectedOrgCn++;
								}
							}
						}
					});

					t.orgs = _.chain(t.orgs).orderBy('colYn', 'desc').value();
				});

				if (selectedOrgCn > this.MAX_ORG_CN) {
					modalService.alert("안전한 자산 연결을 위해<br> 최대 50개까지 선택 가능해요.");
				}

				this.$nextTick(() => {
					this.fn_observerOrgConnect();
					// 웹접근성관련 호출
					this.callJQueryWebAccessibility();
				});

			});


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

		// 모든 팝업 닫기 (isExternal = true인 경우 현재 팝업만 닫기)
		fn_close() {
			if (this.isExternal) {
				this.close();
			} else {
				this.closeAll();
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
					let f;
					switch (this.filterOpt.code) {
						case "all":
							f = (o) => { return true; };
							break;
						case "rec":
							f = (o) => { return o.amnOrgCYn == "1"; };
							break;
						case "expr":
							f = (o) => { return (dayDiff(o.tmsEdDt, this.CURR_DATE) >= 0
												&& dayDiff(o.tmsEdDt, this.CURR_DATE) <= 30)
												|| (dayDiff(o.tmsEdDt, this.CURR_DATE) < 0); };
							break;
						case "conn":
							f = (o) => { return o.colYn == "1"; };
							break;
						case "unConn":
							f = (o) => { return o.colYn == "0"; };
							break;
						default:
							f = (o) => { return o.orgBzrgC == this.filterOpt.code && o.amnOrgCYn == "1"; };
							break;
					}
					this.fn_filterOrgList(f);
					if (this.filterOpt.code == "all") {
						this.isOnFilter = false;
					} else {
						this.isOnFilter = true;
					}
					this.$forceUpdate();
				}
			});
		},

		fn_searchKeyword() {
			if (this.isNull(this.srchKeyword)) {
				modalService.alert("기관명을 입력하세요.").then(() => { return; });
				return false;
			}
			let existSrchResult = this.fn_filterOrgList((o) => {
				return o.orgnm.includes(this.srchKeyword.toUpperCase()) || o.orgnm.includes(this.srchKeyword.toLowerCase());
			});

			this.isOnKeyword = true;
			this.$forceUpdate();
		},

		fn_resetKeyword() {
			this.srchKeyword = "";
			this.fn_filterOrgList((o) => { return true; });
			this.isOnKeyword = false;
		},

		fn_filterOrgList(f) {
			let existFilteredData = false;
			this.orgList.forEach(t => {
				t.orgs.forEach(o => {
					if (f(o)) {
						o.displayYn = "1";
						existFilteredData = true;
					} else {
						o.displayYn = "0";
					}
				});
			});
			return existFilteredData;
		},

		fn_checkAll(scope) {
			let tScope = this.orgList.find(t => t.scope == scope);
			console.log(this.selectedFilterdOrgCn[this.orgList.findIndex(t => t.scope == scope)]);
			if (this.selectedFilterdOrgCn[this.orgList.findIndex(t => t.scope == scope)].cn == 0)  {
				let selectedOrgCn = this.selectedOrgAllCn;
				tScope.orgs.filter(t => t.displayYn == "1" && t.scrnMrkYn == "1")
							.forEach(t => {
								if (this.selectedOrgAllCn < this.MAX_ORG_CN) {
									tScope.selectedOrgs.push(t.orgC);
								}
								selectedOrgCn++;
							});
				if (selectedOrgCn > this.MAX_ORG_CN) {
					modalService.alert("안전한 자산 연결을 위해<br> 최대 50개까지 선택 가능해요.");
				}
			} else {
				tScope.selectedOrgs = tScope.selectedOrgs.filter(t => tScope.orgs.findIndex(p => p.displayYn == "0" && p.scrnMrkYn == "1") >= 0)
			}
		},

		fn_checkOne(scope, orgC) {
			if (this.selectedOrgAllCn > this.MAX_ORG_CN) {
				modalService.alert("안전한 자산 연결을 위해<br> 최대 50개까지 선택 가능해요.").then(() => {
					let tList = this.orgList.find(t => t.scope == scope).selectedOrgs;
					tList.pop();
					return false;
				});
				return false;
			} else {
				return true;
			}
		},

		fn_nextProcess() {
			this.selectedOrgList = [];
			this.orgList.forEach(t => {
				this.selectedOrgList = this.selectedOrgList.concat([...t.orgs].filter(o => t.selectedOrgs.includes(o.orgC))
																			  .map(o => ({
																					"orgBzrgC": o.orgBzrgC,
																					"orgC": o.orgC,
																					"orgnm": o.orgnm,
																			  }))
				);
			});


			const existNewOrg = Boolean(this.selectedOrgList.find(t => t.colYn != '1'));
			const existPublic = Boolean(this.selectedOrgList.find(t => t.orgBzrgC == 'public'));
			const existConnOrg = Boolean(this.selectedOrgList.find(t => t.colYn == '1' && t.orgC != 'A4AAAZ0000'));
			const isOnlyConnOrg = this.selectedOrgList.length == this.selectedOrgList.filter(t => t.colYn == '1' && t.orgC != 'A4AAAZ0000').length;
			
			const config = {
				component : COAR4009,
				params : {
					txRqInfo: {
						termsTitle: "자산연결",
						selectedOrgList: this.selectedOrgList,
					},
				}
			}

			modalService.openPopup(config).then(response => {
				console.log(response);
			});
		},

    },
    components : {
		LottieAnimation
    }
}


</script>