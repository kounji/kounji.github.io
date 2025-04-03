<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 인증방법선택
* @ 페이지설명 : 인증방법선택
* @ 파일명     : src/views/page/CO/AR/COAR4003/COAR4003.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-03-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-10              CS540685              상호금융 NH콕마이데이터 4.0 추진 개발 (COAR2003 → COAR4003)
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01">

		<div class="popup_header">
			<h1>자산연결</h1>
		</div>

		<div class="popup_content">

			<div class="certi_cont">
				<h2 class="headline">
					자산연결을 위해<br>
					<strong>인증 방법을 선택해 주세요.</strong>
				</h2>

				<ul class="certi_list">
					<li>
						<a href="#nolink" class="item nh">
							<p class="title">NH모바일인증서</p>
						</a>
					</li>
					<li>
						<a href="#nolink" class="item pass">
							<p class="title">PASS인증서</p>
						</a>
					</li>
					<li>
						<a href="#nolink" class="item joint">
							<p class="title">공동인증서</p>
							<span class="tag blue">있음</span>
						</a>
					</li>
					<li>
						<a href="#nolink" class="item finance">
							<p class="title">금융인증서</p>
						</a>
					</li>
				</ul>
			</div>

		</div>

		<a href="#nolink" role="button" class="btn_close"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
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
			
			const isShowRegion = false;
			const isShowTermAccount = Boolean(this.selectedOrgList.find(t => t.orgBzrgC == 'bank' || t.orgBzrgC == 'pay'));
			const isShowTermFranchise = Boolean(this.selectedOrgList.find(t => t.orgBzrgC == 'bank' || t.orgBzrgC == 'efin'));
			const isShowTermCategory = Boolean(this.selectedOrgList.find(t => t.orgBzrgC == 'invest'));

			const config = {
				component : COAR4009,
				params : {
					txRqInfo: {
						termsTitle: "자산연결",
						isShowRegion: existPublic,
						isShowTermAccount: isShowTermAccount,
						isShowTermFranchise: isShowTermFranchise,
						isShowTermCategory: isShowTermCategory,
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