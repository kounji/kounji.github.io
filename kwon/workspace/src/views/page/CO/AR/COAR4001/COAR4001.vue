<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 자산연결 방법 선택
* @ 페이지설명 : 자산연결 방법 선택
* @ 파일명     : src/views/page/CO/AR/COAR2001/COAR4001.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-02-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533459              마이데이터 확대개발 내용 적용
* 2025-02-18              CS540685              상호금융 NH콕마이데이터 4.0 추진 개발 (COAR2001 → COAR4001)
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>자산연결</h1>
			<!-- <button type="button" class="prev"><span class="blind">이전</span></button> -->
		</div>
		
		<div class="popup_content">

			<div class="asset_connect">
				<div class="tit_area bg_char">
					<h2 class="headline">금융자산부터<br>연금, 공공자산까지<br><strong>한 번에</strong> 관리해 보세요.</h2>
				</div>

				<div class="organ_group">
					<strong class="titH5">금융마이데이터</strong>
					<div class="btns_wrap">
						<button type="button" class="btns lg gray" @click="fn_openAssetConnect('rec')">추천 기관 한 번에 연결</button>
					</div>
					<ul class="organ_list">
						<li class="shadow_box" v-for="(asset, idx) in assetList" :key="idx">
							<div class="tit_area">
								<strong class="tit">{{asset.scopeName}}</strong>

								<template v-if="(asset.scope == 'bank') && (Number(asset.assetCn)+(nacfAccYn?1:0) &gt;= 0)"> <!-- 은행 업권은 농협 중앙회가 항상 있어야 함 -->
                                    <strong class="status">{{Number(asset.assetCn)+(nacfAccYn?1:0)}}<i class="blind">건</i></strong>
									<strong class="txt" v-if="Number(asset.assetCn)+(nacfAccYn?1:0) &gt; 0">연결됨</strong><!--[v4.0] 25-05-21 연결 상태 표시 영역 추가 -->
                                </template>

                                <template v-if="(asset.scope != 'bank') && (asset.assetCn &gt; 0)"> <!-- 은행 제외 업권 -->
                                    <strong class="status">{{asset.assetCn}}<i class="blind">건</i></strong>
									<strong class="txt" v-if="asset.assetCn &gt; 0">연결됨</strong><!--[v4.0] 25-05-21 연결 상태 표시 영역 추가 -->
                                </template>
							</div>
							<div class="organ" role="img" :aria-label="asset.ariaLabel" v-if="asset.assets.length > 0 || ((asset.scope == 'bank') && nacfAccYn)"><!-- 연결된 기관 4개까지 노출 -->
								<span class="blind">연결된 기관</span>
								<span class="item" v-if="(asset.scope == 'bank') && nacfAccYn"> <!-- 은행 업권은 농협 중앙회가 항상 있어야 함 -->
									<i class="ico_bank" :class="nacfAccList[0].infOfrmnOrgC"></i>
									<span class="blind">농협중앙회</span>
								</span>
								<span class="item" v-for="(item, idx) in asset.assets" :key="idx">
									<i :class="'ico_bank ' + item.infOfrmnOrgC"></i>
									<span class="blind">{{item.orgnm}}</span>
								</span>
							</div>
							<div class="btn_area">
								<button type="button" class="btn_add" @click="fn_openAssetConnect(asset.scope)"><span class="blind">{{asset.scopeName}} 연결하기</span></button>
							</div>
						</li>
					</ul>

					<strong class="titH5">공공마이데이터</strong>
					<ul class="organ_list">
						<li class="shadow_box">
							<div class="tit_area">
								<strong class="tit">공공</strong>
								<strong class="status" v-if="publicCn > 0">{{publicCn}}<i class="blind">건</i></strong>
								<strong class="txt" v-if="publicCn &gt; 0">연결됨</strong><!--[v4.0] 25-05-21 연결 상태 표시 영역 추가 -->
							</div>
							<div class="organ" role="img" :aria-label="publicAriaLabel" v-if="publicList.length > 0"><!-- 연결된 기관 4개까지 노출 -->
								<span class="blind">연결된 기관</span>
								<span class="item" v-for="(item, idx) in publicList" :key="idx">
									<i :class="'ico_bank ' + item.infOfrmnOrgC"></i>
									<span class="blind">{{item.orgnm}}</span
								></span>
							</div>
							<div class="btn_area">
								<button type="button" class="btn_add" @click="fn_openAssetConnect('public')"><span class="blind">공공 연결하기</span></button>
							</div>
						</li>
					</ul>
					<!-- <div class="btns_wrap">
						<button type="button" class="btns lg gray" @click="fn_openAssetConnect('all')">추천 기관 한 번에 연결</button>
					</div> -->
				</div>

				<div class="organ_group">
					<strong class="titH5">실물자산</strong>
					<ul class="organ_list">
						<li class="shadow_box">
							<div class="tit_area">
								<strong class="tit">부동산</strong>
								<strong class="status" v-if="rlestList.length > 0">{{rlestCn}}<i class="blind">건</i></strong>
								<strong class="txt" v-if="rlestCn &gt; 0">연결됨</strong><!--[v4.0] 25-05-21 연결 상태 표시 영역 추가 -->
							</div>
							<div class="organ" role="img" :aria-label="rlestAriaLabel" v-if="rlestList.length > 0"><!-- 연결된 자산 4개까지 노출 -->
								<span class="blind">연결된 자산</span>
								<span class="item" v-for="(rlest, idx) in rlestList" :key="idx">
									<i class="ico_cate house"></i>
									<span class="blind">{{rlest.rlestNm}}</span>
								</span>
							</div>
							<div class="btn_area">
								<button type="button" class="btn_add" @click="fn_openRlAssetPop('Rlest')"><span class="blind">부동산 연결하기</span></button>
							</div>
						</li>
						<li class="shadow_box">
							<div class="tit_area">
								<strong class="tit">자동차</strong>
								<strong class="status" v-if="carList.length > 0">{{carCn}}<i class="blind">건</i></strong>
								<strong class="txt" v-if="carCn &gt; 0">연결됨</strong><!--[v4.0] 25-05-21 연결 상태 표시 영역 추가 -->
							</div>
							<div class="organ" role="img" :aria-label="carAriaLabel" v-if="carList.length > 0"><!-- 연결된 자산 4개까지 노출 -->
								<span class="blind">연결된 자산</span>
								<span class="item" v-for="(car, idx) in carList" :key="idx">
									<i class="ico_cate car"></i>
									<span class="blind">{{car.carCrtpnm}}</span>
								</span>
							</div>
							<div class="btn_area">
								<button type="button" class="btn_add" @click="fn_openRlAssetPop('Car')"><span class="blind">자동차 연결하기</span></button>
							</div>
						</li>
						<li class="shadow_box">
							<div class="tit_area">
								<strong class="tit">현금</strong>
								<strong class="status" v-if="cshAstList.length > 0">{{cshAstCn}}<i class="blind">건</i></strong>
								<strong class="txt" v-if="cshAstCn &gt; 0">연결됨</strong><!--[v4.0] 25-05-21 연결 상태 표시 영역 추가 -->
							</div>
							<div class="organ" role="img" :aria-label="cshAstAriaLabel" v-if="cshAstList.length > 0"><!-- 연결된 자산 4개까지 노출 -->
								<span class="blind">연결된 자산</span>
								<span class="item" v-for="(cshAst, idx) in cshAstList" :key="idx">
									<i class="ico_cate cash"></i>
									<span class="blind">{{cshAst.astnm}}</span>
								</span>
							</div>
							<div class="btn_area">
								<button type="button" class="btn_add" @click="fn_openRlAssetPop('Cash')"><span class="blind">현금 연결하기</span></button>
							</div>
						</li>
						<li class="shadow_box">
							<div class="tit_area">
								<strong class="tit">금</strong>
								<strong class="status" v-if="gldAstList.length > 0">{{gldAstCn}}<i class="blind">건</i></strong>
								<strong class="txt" v-if="gldAstCn &gt; 0">연결됨</strong><!--[v4.0] 25-05-21 연결 상태 표시 영역 추가 -->
							</div>
							<div class="organ" role="img" :aria-label="gldAstAriaLabel" v-if="gldAstList.length > 0"><!-- 연결된 자산 4개까지 노출 -->
								<span class="blind">연결된 자산</span>
								<span class="item" v-for="(gldAst, idx) in gldAstList" :key="idx">
									<i class="ico_cate gold"></i>
									<span class="blind">{{gldAst.goldKdnm}}</span>
								</span>
							</div>
							<div class="btn_area">
								<button type="button" class="btn_add" @click="fn_openRlAssetPop('Gold')"><span class="blind">금 연결하기</span></button>
							</div>
						</li>
						<li class="shadow_box">
							<div class="tit_area">
								<strong class="tit">외화</strong>
								<strong class="status" v-if="fcCshAstList.length > 0">{{fcCshAstCn}}<i class="blind">건</i></strong>
								<strong class="txt" v-if="fcCshAstCn &gt; 0">연결됨</strong><!--[v4.0] 25-05-21 연결 상태 표시 영역 추가 -->
							</div>
							<div class="organ" role="img" :aria-label="fcCshAstAriaLabel" v-if="fcCshAstList.length > 0"><!-- 연결된 자산 4개까지 노출 -->
								<span class="blind">연결된 자산</span>
								<span class="item" v-for="(fcCshAst, idx) in fcCshAstList" :key="idx">
									<i class="ico_cate foreign"></i>
									<span class="blind">{{fcCshAst.curc}}</span>
								</span>
							</div>
							<div class="btn_area">
								<button type="button" class="btn_add" @click="fn_openRlAssetPop('Curr')"><span class="blind">외화 연결하기</span></button>
							</div>
						</li>
						<li class="shadow_box">
							<div class="tit_area">
								<strong class="tit">농기계</strong>
								<strong class="status" v-if="fmachAstList.length > 0">{{fmachAstCn}}<i class="blind">건</i></strong>
								<strong class="txt" v-if="fmachAstCn &gt; 0">연결됨</strong><!--[v4.0] 25-05-21 연결 상태 표시 영역 추가 -->
							</div>
							<div class="organ" role="img" :aria-label="fmachAstAriaLabel" v-if="fmachAstList.length > 0"><!-- 연결된 자산 4개까지 노출 -->
								<span class="blind">연결된 자산</span>
								<span class="item" v-for="(fmachAst, idx) in fmachAstList" :key="idx">
									<i class="ico_cate machin"></i>
									<span class="blind">{{fmachAst.astnm}}</span>
								</span>
							</div>
							<div class="btn_area">
								<button type="button" class="btn_add" @click="fn_openRlAssetPop('Agri')"><span class="blind">농기계 연결하기</span></button>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="close(true)"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

import {mapGetters, mapActions} from 'vuex'
import {dateFormat, monthAdd, dayDiff, getTmmRmDds} from '@/utils/date'

import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002'
import COCA2101 from '@/views/page/CO/CA/COCA2101/COCA2101'
import CORE4201 from '@/views/page/CO/RE/CORE4201/CORE4201'
import COOA2001 from '@/views/page/CO/OA/COOA2001/COOA2001'
import COOA2103 from '@/views/page/CO/OA/COOA2103/COOA2103'
import COOA4105 from '@/views/page/CO/OA/COOA4105/COOA4105'
import COOA2006 from '@/views/page/CO/OA/COOA2006/COOA2006'

import _ from 'lodash'

export default {
    name: "COAR4001",
    data: () => {
        return {
			assetList: [{"scope": "bank", "scopeName": "은행", assetCn: 0, assets: [], ariaLabel:"연결된 기관 없음"},
			{"scope": "card", "scopeName": "카드", assetCn: 0, assets: [], ariaLabel:"연결된 기관 없음"},
			{"scope": "insu", "scopeName": "보험", assetCn: 0, assets: [], ariaLabel:"연결된 기관 없음"},
			{"scope": "telecom", "scopeName": "통신", assetCn: 0, assets: [], ariaLabel:"연결된 기관 없음"},
			{"scope": "invest", "scopeName": "증권", assetCn: 0, assets: [], ariaLabel:"연결된 기관 없음"},
			{"scope": "efin", "scopeName": "기타", assetCn: 0, assets: [], ariaLabel:"연결된 기관 없음"}],
			publicCn: 0,
			publicList: [], // 공공업권연결자산목록
			publicAriaLabel: "연결된 기관 없음",
			rlestCn: 0,
			rlestList: [], // 부동산연결자산목록
			rlestAriaLabel: "연결된 자산 없음",
			carCn: 0,
			carList: [], // 자동차연결자산목록
			carAriaLabel: "연결된 자산 없음",
			cshAstCn: 0,
			cshAstList: [], // 현금연결자산목록
			cshAstAriaLabel: "연결된 자산 없음",
			fcCshAstCn: 0,
			fcCshAstList: [], // 외화현금연결자산목록
			fcCshAstAriaLabel: "연결된 자산 없음",
			gldAstCn: 0,
			gldAstList: [], // 금연결자산목록
			gldAstAriaLabel: "연결된 자산 없음",
			fmachAstCn: 0,
			fmachAstList: [],// 농기계연결자산목록
			fmachAstAriaLabel: "연결된 자산 없음",

			currentDate: new Date(),   //금일
			nacfAccList: [],// v4 농.축협 계좌 리스트
			nacfAccYn:false, // v4 농.축협 계좌 건수
        }
	},
	beforeMount() {
		
	},
    mounted() {
		this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
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
		])
	},
    methods: {
		...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfoTest'
        ]),
		
        initComponent() {
            this.getData();
        },
        getData() {
			const nacf_config = {
                url : "/co/am/08r03", 
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
            }
            apiService.call(nacf_config).then(response => {
                this.nacfAccList = response.nacfAccList || []
				this.nacfAccYn = this.nacfAccList.length > 0

				let sliceIdx = this.nacfAccYn ? 3:4; // 은행만 농축협 판단
				// 금융자산 조회
				this.assetList.forEach(o => {
					this.myAssetsBzrgList.forEach(t => {
						if (t.comnCVal == o.scope) {
							let tmpAssetList = [...t.orgList].filter(el => {
								return (el.acsTokenDusDtm == '0' && dayDiff(el.tmsEdDt, this.currentDate) >= 0) // 만료 되지않은 기관들
							})
							
							let tmpIdx = o.scope == 'bank' ? sliceIdx : 4 // 은행은 assets에 농축협이 없기 때문
							if(o.scope == 'card') {
								o.assets = tmpAssetList.sort((t1, t2) => t1.tmsRqrDt - t2.tmsRqrDt); // card는 nhCard가 맨 앞이여야해서 slice 뒤에서 함
							} else {
								o.assets = tmpAssetList.sort((t1, t2) => t1.tmsRqrDt - t2.tmsRqrDt).slice(0, tmpIdx);
							}
							o.assetCn = tmpAssetList.length;
						}
					}, this);
					if (o.scope == 'bank') {
						if (o.assetCn > 0 || this.nacfAccYn) {
							o.ariaLabel =  "연결된 기관 "
							// Array.from()로 감싸는 이유는 map에서 리턴된 데이터가 하나면 length가 나오지 않아 join이 되지 않기 때문
							o.ariaLabel += this.nacfAccYn ? ("농협중앙회, " + Array.from(o.assets.map(e=> e.orgnm)).join(", ")) : Array.from(o.assets.map(e=> e.orgnm)).join(", ");
						}
					} else if(o.scope != "card") {
						if (o.assetCn > 0) {
							o.ariaLabel =  "연결된 기관 "
							o.ariaLabel += Array.from(o.assets.map(e=> e.orgnm)).join(", ");
						}
					}
					// card는 nh카드 순서를 맨 앞으로 빼야 하므로 나중에 label을 세팅함
					
				}, this);

				let nhCard   = {} // nh카드는 순서가 맨 앞이여야 함
				let nhCardCd = "D1AABG0000" // nh카드 기관코드
				let cardIdx  = this.assetList.findIndex(el => el.scope == "card") // 카드업권 idx
				let nhCardIdx = this.assetList[cardIdx].assets.findIndex(ell => ell.infOfrmnOrgC == nhCardCd) // 카드업권 중 nh카드 idx

				if(nhCardIdx > -1) { // nh카드가 있는 경우
					nhCard = this.assetList[cardIdx].assets[nhCardIdx] // nh카드 임시 저장
					this.assetList[cardIdx].assets.splice(nhCardIdx, 1) // nh카드 제거
					this.assetList[cardIdx].assets.unshift(nhCard) // 0번째 index에 nh카드 insert
				}
				
				this.assetList[cardIdx].assets = this.assetList[cardIdx].assets.slice(0, 4)
				
				for(var i = 0; i < this.assetList[cardIdx].assets.length; i++ ){
					if(i == 0) {
						this.assetList[cardIdx].ariaLabel =  "연결된 기관 "
					}
					
					this.assetList[cardIdx].ariaLabel += this.assetList[cardIdx].assets[i].orgnm;
					if(i < this.assetList[cardIdx].assets.length-1) { // 마지막은 콤마 안넣음
						this.assetList[cardIdx].ariaLabel += ", "
					}
				}
            })

			// 공공자산 조회
			this.myAssetsBzrgList.filter(t => t.comnCVal == "public").forEach(t => {
				let tmpAssetList = [...t.orgList].filter(el => {
					return (el.acsTokenDusDtm == '0' && dayDiff(el.tmsEdDt, this.currentDate) >= 0) // 만료 되지않은 기관들
				})

				this.publicList = tmpAssetList.sort((t1, t2) => t1.tmsRqrDt - t2.tmsRqrDt).slice(0, 4);
				this.publicCn = tmpAssetList.length;

				if(this.publicCn > 0) {
					this.publicAriaLabel =  "연결된 기관 "
					this.publicAriaLabel += Array.from(this.publicList.map(e=>e.orgnm)).join(", ")
				}
				
			}, this);

			// 부동산 목록 조회
			const config = {
                url: '/as/re/01r01',                
                data: {mydtCusno : this.getUserInfo('mydtCusno')}
            };

            apiService.call(config).then(response => {
                this.rlestList = response.rlestList || [];
				this.rlestCn = this.rlestList.length;
				this.rlestList = this.rlestList.slice(0, 4);
				if(this.rlestCn > 0) {
					this.rlestAriaLabel =  "연결된 자산 "
					this.rlestAriaLabel += Array.from(this.rlestList.map(e=>e.rlestNm)).join(", ")
				}
			});

			// 자동차 목록 조회
			config.url = '/as/ca/01r02',

			apiService.call(config).then(response => {
                this.carList = response.carList || [];
				this.carCn = this.carList.length;
				this.carList = this.carList.slice(0, 4);
				if(this.carCn > 0) {
					this.carAriaLabel =  "연결된 자산 "
					this.carAriaLabel += Array.from(this.carList.map(e=>e.carModlnm)).join(", ")
				}
			});

			// 기타자산(현금, 금,외화, 농기계 목록) 통합조회
			config.url = '/as/oa/01r01';

			apiService.call(config).then(response => {
				this.cshAstList   = response.cshAstList || [];
				this.cshAstCn = this.cshAstList.length;
				this.cshAstList = this.cshAstList.slice(0, 4);
				if(this.cshAstList.length > 0) {
					this.cshAstAriaLabel =  "연결된 자산 "
					this.cshAstAriaLabel += Array.from(this.cshAstList.map(e=>e.astnm)).join(", ")
				}

				this.fcCshAstList = response.fcCshAstList || [];
				this.fcCshAstCn = this.fcCshAstList.length;
				this.fcCshAstList = this.fcCshAstList.slice(0, 4);
				if(this.fcCshAstList.length > 0) {
					this.fcCshAstAriaLabel =  "연결된 자산 "
					this.fcCshAstAriaLabel += Array.from(this.fcCshAstList.map(e=>e.curc)).join(", ")
				}

				this.gldAstList = response.gldAstList || [];
				this.gldAstCn = this.gldAstList.length;
				this.gldAstList = this.gldAstList.slice(0, 4);
				if(this.gldAstList.length > 0) {
					this.gldAstAriaLabel =  "연결된 자산 "
					this.gldAstAriaLabel += Array.from(this.gldAstList.map(e=>e.goldKdnm)).join(", ")
				}

				this.fmachAstList  = response.fmachAstList || [];
				this.fmachAstCn = this.fmachAstList.length;
				this.fmachAstList = this.fmachAstList.slice(0, 4);
				if(this.fmachAstList.length > 0) {
					this.fmachAstAriaLabel =  "연결된 자산 "
					this.fmachAstAriaLabel += Array.from(this.fmachAstList.map(e=>e.astnm)).join(", ")
				}
			});

			this.$nextTick(() => {
				// 웹접근성관련 호출
				this.callJQueryWebAccessibility();
			});
		},

		fn_openRlAssetPop(popId) {
			let popName = "";

			switch(popId) {
				case 'Rlest':
					popName = CORE4201;	// 부동산
					break;
				case 'Car':
					popName = COCA2101;	// 자동차
					break;
				case 'Cash':
					popName = COOA2001;	// 현금
					break;
				case 'Curr':
					popName = COOA2103;	// 외화
					break;
				case 'Gold':
					popName = COOA4105;	// 금
					break;
				case 'Agri':
					popName = COOA2006;  // 농기계
					break;
				default:
					break;
			}

			let config = {
				component: popName,
				params: {
					"assetId":popId,
					"popId"  :popId
				}
			};

			modalService.openPopup(config).then(response=>{
				console.log("AssetPop close popup", response)
				this.getData();

				if(response.dsc === "add") this.fn_openRlAssetPop(response.assetId)
			});
		},

		fn_openAssetConnect(amnOrgCScope) {
			const config = {
				component : COAR4002,
				params: {
					"topTitle": "자산연결",
					"orgDsc": amnOrgCScope
				},
			};
			modalService.openPopup(config);
		},

    },
    components : {
    }
}


</script>