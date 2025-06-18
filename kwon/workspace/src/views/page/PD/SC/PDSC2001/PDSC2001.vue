<!--
/*************************************************************************
* @ 서비스경로 : 금융통통 > 사회보험 > 국민/건강보험
* @ 페이지설명 : 국민/건강보험 조회
* @ 파일명     : src\views\page\PD\SC\PDSC2001\PDSC2001.vue
* @ 작성자     : CS533453
* @ 작성일     : 2023-08-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-16              CS533453              최초작성
*************************************************************************/
-->
<template>

	<page class="content-view mydata2023 hasLNB">
		<pd-category-v2 type="PDRT"></pd-category-v2>
		<pd-sub-category-v2 type="SC"></pd-sub-category-v2>
		
		<div id="content" class="renewal financial_life">
			<div class="com_inner tax_status">
				<div v-show="isConnectedPb" class="top_area">
					<strong class="titH1">
						{{cusnm}}님의<br>
						사회보험 가입 내역 이예요.
					</strong>
				</div>

				<div v-if="isConnectedPb" class="tax_tab">
					<div class="com_tabmenu_type03 switchType btn2">
						<ul role="tablist">
							<li :class="tabDsc == '1' ? 'on' : ''" role="presentation" aria-controls="tab_01">
								<a href="javascript:void(0);" role="tab" @click.prevent="fn_searchList(1)"><span>국민연금</span></a
							></li>
							<li :class="tabDsc == '2' ? 'on' : ''" role="presentation" aria-controls="tab_02">
								<a href="javascript:void(0);" role="tab" @click.prevent="fn_searchList(2)"><span>건강보험</span></a>
							</li>
						</ul>
					</div>

					<!-- tab_01 -->
					<div id="tab_01" role="tabpanel" class="cmm-tab-panel" :class="tabDsc == '1' ? 'on' : ''" v-if="ntpsAssetYn == 'Y' && tabDsc == '1'">
						<div class="social_insurance">
							<div class="period_search">
								<ul class="layoutBox">
									<li class="left">
										<div class="com_btnselectbox_type01">
											<button type="button" class="com_btnselect_type01" :title="objYySt" @click="fnSetYearPop('1')"><span>{{objYySt}}년</span></button>
										</div>
									</li>
									<li class="center">
										<span>~</span>
									</li>
									<li class="right">
										<div class="com_btnselectbox_type01">
											<button type="button" class="com_btnselect_type01" :title="objYyEd" @click="fnSetYearPop('2')"><span>{{objYyEd}}년</span></button>
										</div>
									</li>
								</ul>
								<div class="com_btn_area">
									<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click="fn_searchList(1)">조회</a>
								</div>
							</div>

							<template v-if="ntpsList.length > 0">
								<dl class="gray_box_m">
									<dt>총 가입금액</dt>
									<dd><span class="num">{{totEntPrdVal | numberFilter}}</span>원({{totEntPrdYear}}개월)</dd>
								</dl>

								<div class="shor_term mt20">
									<div class="com_box_type01 toggle_list_box2 custom_list" v-for="(ntpsInfo, index) in ntpsList" :key="'tab01_'+index">
										<div data-ui-toggle="box" class="toggle_box_area">
											<button type="button" class="view_btn" aria-expanded="false">
												<div class="new_tit_area">
													<div class="tit">
														<p class="bank">{{ntpsInfo.bzplnm}}</p>
														<p class="date">{{ntpsInfo.prdVal}}</p>
													</div>
												</div>
												<em class="open">열기</em>
												<em class="close">닫기</em>
											</button>
										</div>
										<div class="view_cont list_type_01">
											<dl>
												<dt>
													<p>납부한 보험료</p>
													<p>(개월)</p>
												</dt>
												<dd>
													<p><span class="num">{{ntpsInfo.pvpayAm | numberFilter}}</span>원</p>
													<p v-if="ntpsInfo.pvpayMtcn > 0">({{ntpsInfo.pvpayMtcn}}개월)</p>
												</dd>
											</dl>
											<dl>
												<dt>
													<p>납부하지 않은 보험료													
													<p>(개월)</p>
												</dt>
												<dd>
													<p><span class="num">{{ntpsInfo.npayAm | numberFilter}}</span>원</p>
													<p v-if="ntpsInfo.npayAm > 0">({{ntpsInfo.npayMtcn}}개월)</p>
												</dd>
											</dl>	
										</div>
									</div>
								</div>
							</template>
							<template v-else>
								<div class="no_data_box no_data_box01 grayExclamationType">
									<div class="no_data_list">
										<p class="txt_sub">납부 내역이 없어요</p>
									</div>
								</div>
							</template>
						</div>
					</div>

					<!-- 공공기관 미연결 -->
					<template v-if="isConnectedPb && ntpsAssetYn == 'N' && tabDsc == '1'">
						<div class="tax_nolink">
							<div class="img_wrap">
								<img src="@/assets_v40/images/img/pension_nolink_2023.png" alt="tax 이미지">
							</div>
							<div class="text">
								<strong class="titH3">자산 연결하고 관리 받으세요</strong>
								<p class="desc">
									사회보험료 납부 내역은 물론 노후준비,<br>
									재무진단 등 자산관리를 위한<br>
									다양한 서비스를 제공 받을 수 있어요
								</p>
							</div>
						</div>

						<div class="com_btn_area">
							<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click="fn_moveJoinPop()">사회보험 연결하기</a>
						</div>
					</template>
					<!-- //공공기관 미연결 -->

					<!-- //tab_01 -->

					<!-- tab_02 -->
					<div id="tab_02" role="tabpanel" class="cmm-tab-panel" :class="tabDsc == '2' ? 'on' : ''" v-else-if="hlthAssetYn == 'Y' && tabDsc == '2'">
						<div class="social_insurance">
							<div class="period_search">
								<ul class="layoutBox">
									<li class="left">
										<div class="com_btnselectbox_type01">
											<button type="button" class="com_btnselect_type01" :title="inqYy" @click="fnSetYearPop('3')"><span>{{inqYy}}년</span></button>
										</div>
									</li>
									<li class="center">
										<span>~</span>
									</li>
									<li class="right">
										<div class="com_btnselectbox_type01">
											<button type="button" class="com_btnselect_type01" :title="hlthIsrEntDscNm" @click="fnSetEntDscPop()"><span>{{hlthIsrEntDscNm}}</span></button>
										</div>
									</li>
								</ul>
								<div class="com_btn_area">
									<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click="fn_searchList(2)">조회</a>
								</div>
							</div>
							
							<template v-if="hlthList.length > 0">
								<dl class="gray_box_m" v-if="hlthIsrEntDsc == '01'">
									<dt>연말정산 보험료</dt>
									<dd><span class="num">{{yeadjHlthIsrfe | numberFilter}}</span>원</dd>
								</dl>

								<div class="shor_term mt20">
									<div class="com_box_type01 toggle_list_box2 custom_list" v-for="(hlthInfo, index) in hlthList" :key="'tab02_'+index">
										<div data-ui-toggle="box" class="toggle_box_area open">
											<button type="button" class="view_btn" aria-expanded="true">
												<div class="new_tit_area">
													<div class="tit"><span>{{hlthInfo.inqYy}}년 {{hlthInfo.ntfyMm | numberFilter}}월</span></div>
												</div>
												<em class="open">열기</em>
												<em class="close">닫기</em>
											</button>
										</div>
										<div v-if="srchHlthIsrEntDsc == '01'" class="view_cont list_type_01">
											<dl>
												<dt>사업자명칭</dt>
												<dd>{{hlthInfo.bzplnm}}</dd>
											</dl>
											<dl>
												<dt>건강보험</dt>
												<dd><span class="num">{{hlthInfo.hlthPayAm01 | numberFilter}}</span>원</dd>
											</dl>
											<dl>
												<dt>장기요양보험</dt>
												<dd><span class="num">{{hlthInfo.ltrmCnvlsPayAm01 | numberFilter}}</span>원</dd>
											</dl>
											<dl>
												<dt>납부한 보험료 합계</dt>
												<dd><span class="num">{{hlthInfo.hlthPayAm01 + hlthInfo.ltrmCnvlsPayAm01 | numberFilter}}</span>원</dd>
											</dl>
										</div>

										<div v-if="srchHlthIsrEntDsc == '01'&& hlthInfo.hlthPayAm02 > 0" class="view_cont list_type_01">	
											<dl>
												<dt>(소득)건강보험</dt>
												<dd><span class="num">{{hlthInfo.hlthPayAm02 | numberFilter}}</span>원</dd>
											</dl>
											<dl>
												<dt>(소득)장기요양보험</dt>
												<dd><span class="num">{{hlthInfo.ltrmCnvlsPayAm02 | numberFilter}}</span>원</dd>
											</dl>

											<dl>
												<dt>(소득)납부한 보험료 합계</dt>
												<dd><span class="num">{{hlthInfo.hlthPayAm02 + hlthInfo.ltrmCnvlsPayAm02 | numberFilter}}</span>원</dd>
											</dl>
										</div>

										<div v-if="srchHlthIsrEntDsc == '02'" class="view_cont list_type_01">
											<dl>
												<dt>건강보험</dt>
												<dd><span class="num">{{hlthInfo.hlthPayAm02 | numberFilter}}</span>원</dd>
											</dl>
											<dl>
												<dt>장기요양보험</dt>
												<dd><span class="num">{{hlthInfo.ltrmCnvlsPayAm02 | numberFilter}}</span>원</dd>
											</dl>

											<dl>
												<dt>납부한 보험료 합계</dt>
												<dd><span class="num">{{hlthInfo.hlthPayAm02 + hlthInfo.ltrmCnvlsPayAm02 | numberFilter}}</span>원</dd>
											</dl>
										</div>
									</div>
								</div>

							</template>
							
							<template v-else>
								<div class="no_data_box no_data_box01 grayExclamationType">
									<div class="no_data_list">
										<p class="txt_sub">납부 내역이 없어요</p>
									</div>
								</div>
							</template>
						</div>
					</div>

					<!-- 공공기관 미연결 -->
					<template v-if=" isConnectedPb && hlthAssetYn == 'N' && tabDsc == '2'">
						<div class="tax_nolink">
							<div class="img_wrap">
								<img src="@/assets_v40/images/img/pension_nolink_2023.png" alt="tax 이미지">
							</div>
							<div class="text">
								<strong class="titH3">자산 연결하고 관리 받으세요</strong>
								<p class="desc">
									사회보험료 납부 내역은 물론 노후준비,<br>
									재무진단 등 자산관리를 위한<br>
									다양한 서비스를 제공 받을 수 있어요
								</p>
							</div>
						</div>

						<div class="com_btn_area">
							<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click="fn_moveJoinPop()">사회보험 연결하기</a>
						</div>
					</template>
					<!-- //공공기관 미연결 -->

					<!-- //tab_02 -->
				</div>

				<!-- 공공기관 모두  미연결 -->
				<template v-if="!isConnectedPb">
					<div class="tax_nolink">
						<div class="img_wrap">
							<img src="@/assets_v40/images/img/pension_nolink_2023.png" alt="tax 이미지">
						</div>
						<div class="text">
							<strong class="titH3">자산 연결하고 관리 받으세요</strong>
							<p class="desc">
								사회보험료 납부 내역은 물론 노후준비,<br>
								재무진단 등 자산관리를 위한<br>
								다양한 서비스를 제공 받을 수 있어요
							</p>
						</div>
					</div>

					<div class="com_btn_area">
						<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click="fn_moveJoinPop()">사회보험 연결하기</a>
					</div>
				</template>
				<!-- //공공기관 미연결 -->

			</div>
		</div>

		<footersV2 type="pd" />

	</page>
</template>

<script>

import apiService from '@/service/apiService'
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'

import PdCategoryV2 from '@/components/category/PdCategoryV2.vue'
import PdSubCategoryV2 from '@/components/category/PdSubCategoryV2.vue'

import PDSC4003 from '@/views/page/PD/SC/PDSC4003/PDSC4003' // 조회기간 선택(년도)
import PDSC4004 from '@/views/page/PD/SC/PDSC4004/PDSC4004' // 건강보험가입구분코드 선택
import COAR2005 from '@/views/page/CO/AR/COAR2005/COAR2005' // 개인신용정보제공동의

import {dateFormat} from '@/utils/date'

import {mapGetters} from 'vuex'

export default {
    name : "PDSC2001",
    data: () => {
		return {
            // return info
			ntpsList			: [], // 국민연금 가입내역
			hlthList			: [], // 건강보험 가입내역
			objYySt				: '', // 대상년도시작
			objYyEd				: '', // 대상년도종료
			inqYy				: '', // 조회년도
			hlthIsrEntDsc		: '', // 건강보험가입구분코드
			srchHlthIsrEntDsc   : '', // 조회된 건강보험가입구분코드
			hlthIsrEntDscNm		: '', // 건강보험가입구분코드명
			cusnm				: '', // 고객명
			tabDsc				: '', // 탭구분
			ntpsAssetYn			: '', // 자산연결여부(국민연금)
			hlthAssetYn			: '', // 자산연결여부(건강보험)
			totEntPrdVal		: 0,  // 총가입금액(국민연금)
			totEntPrdYear		: '', // 총가입개월(국민연금)
			yeadjHlthIsrfe		: 0,  // 연말정산보험료(건강보험)
			isConnectedPb		: true, // 공공기관 연결 여부
			sInqCpl				: true // 조회 완료여부
        }
    },
    computed : {
         ...mapGetters('myassets', [
             'myAssetsBzrgList'
		]),

    },
    methods: {

		init() {
			this.cusnm				= this.getUserInfo("cusnm")
			this.ntpsList			= []								// 국민연금 가입내역
			this.hlthList			= []								// 건강보험 가입내역
			this.objYySt			= new Date().getFullYear() - 10		// 대상년도시작(default 대상년도시작-10년)
			this.objYyEd			= dateFormat(new Date, 'YYYY')		// 대상년도종료
			this.inqYy				= dateFormat(new Date, 'YYYY')		// 조회년도
			this.hlthIsrEntDsc		= '01'								// 건강보험가입구분코드(01:직장, 02:지역)
			this.hlthIsrEntDscNm	= '직장가입자'						 // 건강보험가입구분코드(01:직장, 02:지역)
			this.tabDsc				= '1'								// 탭구분
        },
        initComponent() {

			this.ntpsAssetYn = 'N'
			this.hlthAssetYn = 'N'
			if(typeof this.myAssetsBzrgList != "undefined") {
				let publicAsset = this.myAssetsBzrgList.filter(item => item.comnCVal === 'public') || []
				if(publicAsset.length > 0) {
					let publicAssetList = this.myAssetsBzrgList.find(item => item.comnCVal === 'public').orgList || []
					if(publicAssetList.length > 0){
						this.ntpsAssetYn = publicAssetList.find(item => item.infOfrmnOrgC === 'PBAAVM0000') ? 'Y' : 'N'		// 국민연금
						this.hlthAssetYn = publicAssetList.find(item => item.infOfrmnOrgC === 'PBAAVN0000') ? 'Y' : 'N'		// 건강보험
					}
				}
			} else {
				this.ntpsAssetYn = 'N'
				this.hlthAssetYn = 'N'
			}

			if(this.ntpsAssetYn == 'N' && this.hlthAssetYn == 'N'){
				this.isConnectedPb = false;
			}else{
				this.isConnectedPb = true;
			}

			// test
			// this.ntpsAssetYn = 'Y'
			// this.hlthAssetYn = 'Y'


			var arr = [],
			_tabList = $('.switchType li');
			_tabList.each(function(e){
				arr[e] = $(this).outerWidth();
			});
			_tabList.css('width',Math.max(...arr)); //탭 사이즈 적용
			_tabList.parent().parent().css('width',Math.max(...arr)*arr.length); //탭전체 사이즈 적용

            this.init()

            this.getData(this.tabDsc)
        },
        getData(tabDsc) {

			this.ntpsList      = [] // 국민연금 가입내역
            this.hlthList      = [] // 건강보험 가입내역

			let setUrl      = ''
			let sObjYySt    =  new Date().getFullYear() - 10;
			let isObjYySt10 = false // 조회시작일자 10년이전 여부

			if(sObjYySt > Number(this.objYySt) && this.sInqCpl){ //자산연결시 10년전 데이터를 가져오나 10년이전 데이터 요청시 API호출
				isObjYySt10 = true;
			}

			console.log("objYySt ===" , this.objYySt);
            if( (typeof tabDsc == "undefined" || tabDsc == null || tabDsc == '' || tabDsc == '1') && !isObjYySt10 ) {

				this.tabDsc = '1'
				setUrl      = '/pd/sc/01r01' // PFMPDSC01R01 (SoctIsrSvcV2)

			}else if((typeof tabDsc == "undefined" || tabDsc == null || tabDsc == '' || tabDsc == '1') && isObjYySt10 ) {

				this.tabDsc = '1'
				setUrl      = '/co/ma/01r04' // MDPCLPB01I01

			}else {
				this.tabDsc = '2'
				setUrl      = '/pd/sc/01r02' // PFMPDSC01R02 (SoctIsrSvcV2)
			}

			if(this.tabDsc == '1') {
				// validation 체크
				let resultYear = Number(this.objYyEd) - Number(this.objYySt)
				if(resultYear > 10) {
					modalService.alert("최대 10년까지 조회 할 수 있어요.").then(() => {});
					return
				} else if(resultYear < 0) {
					modalService.alert("조회시작년도가 종료년도보다 커요.").then(() => {});
					return
				}
			}
			
            const config = {
                url: setUrl,
                data: {
					"mydtCusno": this.getUserInfo('mydtCusno') // 마이데이터고객번호
					,"objYySt" : this.objYySt					// 대상년도시작
					,"objYyEd" : this.objYyEd					// 대상년도종료
					,"inqYy" : this.inqYy						// 조회년도
					,"hlthIsrEntDsc" : this.hlthIsrEntDsc		// 건강보험가입구분코드
					,"x_api_type" : "user-search"				//API 실시간 처리로 추가
					, "ctfwKdC"   : "L165"						//API 실시간 처리로 추가
					,"stYy" : this.objYySt						// 대상년도시작
					,"edYy" : this.objYyEd						// 대상년도종료
					}
			};
			
			console.log("config.data")
			console.log(config.data)

            apiService.call(config).then(response => {

				this.ntpsList = response.ntpsList?.map(el => {

					let prdVal = el.prdVal.trim().split('~')

					let prdVal1 = dateFormat(prdVal[0], 'YYYY.MM', 'YYYY.MM')
					let prdVal2 = dateFormat(prdVal[1], 'YYYY.MM', 'YYYY.MM')
					console.log('prdVal1', prdVal1, prdVal2)
					return {...el, prdVal: `${prdVal1} ~ ${prdVal2}`}
				}) || []
				
				this.hlthList    = response.hlthIsrList || []

				if(this.tabDsc == '1') {
					if(this.ntpsList != null) {
						if(this.ntpsList.length > 0) {
							this.totEntPrdVal	= this.ntpsList[0].totEntPrdVal
							this.totEntPrdYear	= this.ntpsList[0].totEntPrdYear
						}

						this.sInqCpl = true;
					}

					if(response != null && response.rsp_code === "CL000") {

						this.sInqCpl = false;
						this.getData(this.tabDsc);
					}

				} else if(this.tabDsc == '2') {
					if(this.hlthList != null) {
						if(this.hlthList.length > 0) {
							this.yeadjHlthIsrfe = this.hlthList[0].yeadjHlthIsrfe
							this.hlthList = this.hlthList.reduce((acc, cur) => {
								let isThere = acc.find(el => el.ntfyMm === cur.ntfyMm)
								if (isThere) {
									if (cur.hlthIsrNtfyDsc === '01') {
										isThere.hlthPayAm01 = cur.hlthPayAm
										isThere.ltrmCnvlsPayAm01 = cur.ltrmCnvlsPayAm
									} else if (cur.hlthIsrNtfyDsc === '02') {
										isThere.hlthPayAm02 = cur.hlthPayAm
										isThere.ltrmCnvlsPayAm02 = cur.ltrmCnvlsPayAm
									}
								} else {
									if (cur.hlthIsrNtfyDsc === '01') {
										cur.hlthPayAm01 = cur.hlthPayAm
										cur.ltrmCnvlsPayAm01 = cur.ltrmCnvlsPayAm
									} else if (cur.hlthIsrNtfyDsc === '02') {
										cur.hlthPayAm02 = cur.hlthPayAm
										cur.ltrmCnvlsPayAm02 = cur.ltrmCnvlsPayAm
									} 
									acc.push(cur)
								}
								return acc
							}, [])
						}
					}
					this.srchHlthIsrEntDsc = this.hlthIsrEntDsc
				}

			});
		},
		fn_searchList(clf) {
			this.getData(clf)
		},
		fnSetYearPop(clf) {
			let toYear = ''
			if(this.tabDsc == '1') {
				toYear	= this.objYySt
			} else if(this.tabDsc == '2') {
				toYear = this.inqYy
			}
			const config = {
                params: {
					"tabDsc": this.tabDsc,
					"toYear": toYear,
					},
                renderer: {
					component: PDSC4003
                }
            };
            
            modalService.openSlidePagePopup(config).then(response => {
				if(response != null) {
					if(clf == '1') {
						this.objYySt = response.toYear
					} else if(clf == '2') {
						this.objYyEd = response.toYear
					} else if(clf == '3') {
						this.inqYy = response.toYear
					}
				}	
			})
		},
		fnSetEntDscPop() {
			const config = {
				params: {
					"hlthIsrEntDsc":this.hlthIsrEntDsc
                },
                renderer: {
                    component: PDSC4004
                }
            };
            
            modalService.openSlidePagePopup(config).then(response => {
				if(response != null) {
					this.hlthIsrEntDsc		= response.hlthIsrEntDsc
					this.hlthIsrEntDscNm	= response.hlthIsrEntDscNm
				}
			})
		},
		fn_moveJoinPop() {
			let compName = COAR2005;

			let param = {}
			let moduleList = []
			let moduleParam = {}
			if(this.ntpsAssetYn == 'N' && this.hlthAssetYn == 'N') {
				moduleParam.orgC		= "PBAAVN0000"
				moduleParam.orgBzrgC	= "public"
				moduleParam.orgnm		= "국민건강보험공단"
				moduleList.push(moduleParam)
				moduleParam = {}
				moduleParam.orgC		= "PBAAVM0000"
				moduleParam.orgBzrgC	= "public"
				moduleParam.orgnm		= "국민연금공단"
				moduleList.push(moduleParam)
			} else if(this.ntpsAssetYn == 'N') {

				moduleParam.orgC		= "PBAAVM0000"
				moduleParam.orgBzrgC	= "public"
				moduleParam.orgnm		= "국민연금공단"
				moduleList.push(moduleParam)

			} else if(this.hlthAssetYn == 'N') {
				moduleParam.orgC		= "PBAAVN0000"
				moduleParam.orgBzrgC	= "public"
				moduleParam.orgnm		= "국민건강보험공단"
				moduleList.push(moduleParam)

			}
			param.moduleList = moduleList
			param.isOnlyPublic = true

            const config = {
                component: compName,
                params : param
			}
			console.log(config)
            modalService.openPopup(config).then(response => {

                if(response == "reSelect") {
                    this.getData(this.tabDsc)
                }
            })
			
		}
    },
    mounted() {

		//상단SUB탭메뉴 위치조정
		// $('.com_tabmenu_type01 > div').each(function(){
		// 	let width  = $(this).width()
		// 	let length = $(this).find('li').length
		// 	let index  = $(this).find('.on').index()
		// 	$('.com_tabmenu_type01 > div').scrollLeft((width/length) * index);
		// })

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
        PdCategoryV2,
        PdSubCategoryV2,
    }
}
</script>