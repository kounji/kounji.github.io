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
					<h2 class="headline">금융자산부터<br>연금,공공자산까지<br><strong>한 번에</strong>관리해 보세요.</h2>
				</div>

				<div class="organ_group">
					<strong class="titH5">금융마이데이터</strong>
					<ul class="organ_list">
						<li class="shadow_box" v-for="(asset, idx) in assetList" :key="idx">
							<div class="tit_area">
								<strong class="tit">{{asset.scopeName}}</strong>
								<strong class="status" v-if="asset.assetCn > 0">{{asset.assetCn}}</strong>
							</div>
							<div class="organ"><!-- 연결된 기관 4개까지 노출 -->
								<span class="blind">연결된 기관</span>
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
								<strong class="status" v-if="publicCn > 0">{{publicCn}}</strong>
							</div>
							<div class="organ"><!-- 연결된 기관 4개까지 노출 -->
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
					<div class="btns_wrap">
						<button type="button" class="btns lg gray" @click="fn_openAssetConnect('all')">추천 기관 한 번에 연결</button>
					</div>
				</div>

				<div class="organ_group">
					<strong class="titH5">실물자산</strong>
					<ul class="organ_list">
						<li class="shadow_box">
							<div class="tit_area">
								<strong class="tit">부동산</strong>
								<strong class="status" v-if="rlestCn > 0">{{rlestCn}}</strong>
							</div>
							<div class="organ"><!-- 연결된 자산 4개까지 노출 -->
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
								<strong class="status" v-if="carList.length > 0">{{carList.length}}</strong>
							</div>
							<div class="organ"><!-- 연결된 자산 4개까지 노출 -->
								<span class="blind">연결된 자산</span>
								<span class="item" v-for="(car, idx) in carList" :key="idx">
									<i class="ico_cate car"></i>
									<span class="blind">{{car.carModlnm}}</span>
								</span>
							</div>
							<div class="btn_area">
								<button type="button" class="btn_add" @click="fn_openRlAssetPop('Car')"><span class="blind">자동차 연결하기</span></button>
							</div>
						</li>
						<li class="shadow_box">
							<div class="tit_area">
								<strong class="tit">현금</strong>
								<strong class="status" v-if="cshAstList.length > 0">{{cshAstList.length}}</strong>
							</div>
							<div class="organ"><!-- 연결된 자산 4개까지 노출 -->
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
								<strong class="status" v-if="gldAstList.length > 0">{{gldAstList.length}}</strong>
							</div>
							<div class="organ"><!-- 연결된 자산 4개까지 노출 -->
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
								<strong class="status" v-if="fcCshAstList.length > 0">{{fcCshAstList.length}}</strong>
							</div>
							<div class="organ"><!-- 연결된 자산 4개까지 노출 -->
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
								<strong class="status" v-if="fmachAstList.length > 0">{{fmachAstList.length}}</strong>
							</div>
							<div class="organ"><!-- 연결된 자산 4개까지 노출 -->
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

		<a href="#nolink" class="btn_close" @click="closeAllData(true)"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

import {mapGetters} from 'vuex'

import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002'
import COCA2101 from '@/views/page/CO/CA/COCA2101/COCA2101'
import CORE2201 from '@/views/page/CO/RE/CORE2201/CORE2201'
import COOA2001 from '@/views/page/CO/OA/COOA2001/COOA2001'
import COOA2103 from '@/views/page/CO/OA/COOA2103/COOA2103'
import COOA4105 from '@/views/page/CO/OA/COOA4105/COOA4105'
import COOA2006 from '@/views/page/CO/OA/COOA2006/COOA2006'

import _ from 'lodash'

export default {
    name: "COAR4001",
    data: () => {
        return {
			assetList: [{"scope": "bank", "scopeName": "은행", assetCn: 0, assets: []},
			{"scope": "card", "scopeName": "카드", assetCn: 0, assets: []},
			{"scope": "insu", "scopeName": "보험", assetCn: 0, assets: []},
			{"scope": "telecom", "scopeName": "통신", assetCn: 0, assets: []},
			{"scope": "invest", "scopeName": "증권", assetCn: 0, assets: []},
			{"scope": "efin", "scopeName": "기타", assetCn: 0, assets: []}],
			publicCn: 0,
			publicList: [], // 공공업권연결자산목록
			rlestCn: 0,
			rlestList: [], // 부동산연결자산목록
			carCn: 0,
			carList: [], // 자동차연결자산목록
			cshAstCn: 0,
			cshAstList: [], // 현금연결자산목록
			fcCshAstCn: 0,
			fcCshAstList: [], // 외화현금연결자산목록
			gldAstCn: 0,
			gldAstList: [], // 금연결자산목록
			fmachAstCn: 0,
			fmachAstList: [],// 농기계연결자산목록
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
        initComponent() {
            this.getData();
        },
        getData() {

			// 금융자산 조회
			this.assetList.forEach(o => {
				this.myAssetsBzrgList.forEach(t => {
					if (t.comnCVal == o.scope) {
						o.assetCn = t.orgCnt;
						o.assets = [...t.orgList].sort((t1, t2) => t1.tmsRqrDt - t2.tmsRqrDt).slice(0, 4);
					}
				}, this);
			}, this);

			// 공공자산 조회
			this.myAssetsBzrgList.filter(t => t.comnCVal == "public").forEach(t => {
				this.publicCn = t.orgCnt;
				this.publicList = [...t.orgList].sort((t1, t2) => t1.tmsRqrDt - t2.tmsRqrDt).slice(0, 4);
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
			});

			// 자동차 목록 조회
			config.url = '/as/ca/01r02',

			apiService.call(config).then(response => {
                this.carList = response.carList || [];
				this.carCn = this.carList.length;
				this.carList = this.carList.slice(0, 4);
			});

			// 기타자산(현금, 금,외화, 농기계 목록) 통합조회
			config.url = '/as/oa/01r01';

			apiService.call(config).then(response => {
				this.cshAstList   = response.cshAstList || [];
				this.cshAstCn = this.cshAstList.length;
				this.cshAstList = this.cshAstList.slice(0, 4);

				this.fcCshAstList = response.fcCshAstList || [];
				this.fcCshAstCn = this.fcCshAstList.length;
				this.fcCshAstList = this.fcCshAstList.slice(0, 4);

				this.gldAstList = response.gldAstList || [];
				this.gldAstCn = this.gldAstList.length;
				this.gldAstList = this.gldAstList.slice(0, 4);

				this.fmachAstList  = response.fmachAstList || [];
				this.fmachAstCn = this.fmachAstList.length;
				this.fmachAstList = this.fmachAstList.slice(0, 4);
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
					popName = CORE2201;	// 부동산
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
				params: {"assetId":popId}
			};

			modalService.openPopup(config).then(response=>{
			});
		},

		fn_openAssetConnect(amnOrgCScope) {
			const config = {
				component : COAR4002,
				params: {"orgDsc": amnOrgCScope},
			};
			modalService.openPopup(config);
		},
    },
    components : {
    }
}


</script>