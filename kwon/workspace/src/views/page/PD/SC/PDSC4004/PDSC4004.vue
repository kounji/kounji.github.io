<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 건강보험 가입내역
* @ 페이지설명 : 건강보험 가입내역
* @ 파일명     : src\views\page\PD\SC\PDSC4004\PDSC4004.vue
* @ 작성자     : CS541015
* @ 작성일     : 2025-01-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-06              CS541015              최초작성
*************************************************************************/
-->
<template>
	<page class="content-view mydata2023 hasLNB">
		<!-- [v4.0] 삭제 
		<pd-category-v2 type="PDRT"></pd-category-v2>
		<pd-sub-category-v2 type="HL"></pd-sub-category-v2> -->

		<div id="content" class="renewal financial_life">
			<div class="com_inner tax_status">
				<div class="top_area">
					<!--[v4.0] 25-02-10 텍스트 수정-->
					<strong class="titH1">
						연도 선택 후 건강보험 가입내역을 확인해 보세요.
					</strong>
					<!--//[v4.0] 25-02-10 텍스트 수정-->
				</div>

				<!--[v4.0] tab 구조 삭제-->
				<!-- <div class="tax_tab"> -->
					<!-- tab_01 -->
					<!-- <div id="tab_01" role="tabpanel" class="cmm-tab-panel"> -->
				<div class="social_insurance">
					<div class="period_search">
						<!--[v4.0] 조회조건 수정-->
						<ul class="com_radio_type03 mt30">
							<li class="pr10">
								<div class="com_btnselectbox_type01">
									<button type="button" class="com_btnselect_type01" :title="inqYy" @click="fnSetYearPop()"><span>{{inqYy}}년</span></button>
								</div>
							</li>
							<li v-for="(commInfo, index) in commList" :key="'key1_' + index" @click="fnSetEntDsc(commInfo.comnCExpl,commInfo.comnCVal)">
								<div class="btn_radio">
									<input type="radio" name="hlthIsrEntDsc" :id="'hlthIsrEntDsc_'+index" :checked="hlthIsrEntDsc == commInfo.comnCVal ? 'checked' : ''">
									<label :for="'hlthIsrEntDsc'+index" role="radio">
										<span>{{commInfo.comnCExpl}}</span>
									</label>
								</div>
							</li>
						</ul>
						<!--//[v4.0] 조회조건 수정-->
						<div class="com_btn_area">
							<a href="#nolink" class="com_btnround_type02" role="button" @click="getData()">조회</a>
						</div>
					</div>

					<template v-if = "hlthList.length > 0">
						<dl class="gray_box_m" v-if="hlthIsrEntDsc == '01'">
							<dt>연말정산 보험료</dt><!--//[v4.0] 문구 수정-->
							<dd><span class="num">{{yeadjHlthIsrfe | numberFilter}}</span>원</dd>
						</dl>

						<div class="shor_term mt20">
							<div class="com_box_type01 toggle_list_box2 custom_list" v-for="(hlthInfo, index) in hlthList" :key="index">
								<div data-ui-toggle="box" class="toggle_box_area"><!--//[v4.0] default 상태 변경 open 삭제-->
									<button type="button" class="view_btn" aria-expanded="true">
										<div class="new_tit_area">
											<div class="tit"><span>{{hlthInfo.inqYy}}년 {{hlthInfo.ntfyMm | numberFilter}}월</span></div>
										</div>
										<em class="open">열기</em>
										<em class="close">닫기</em>
									</button>
								</div>
								<div class="view_cont list_type_01">
									<dl>
										<dt>사업자 명칭</dt>
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
							</div>
						</div>
					</template>

					<template v-else>
					<!--납부내역이 없을 경우-->
					<div class="no_data_box no_data_box01 grayExclamationType">
						<div class="no_data_list">
							<!--25-02-10 텍스트 수정-->
							<p class="txt_sub">가입내역이 없어요</p>
							<!--//25-02-10 텍스트 수정-->
						</div>
					</div>
					<!--//납부내역이 없을 경우-->
					</template>
				</div>
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
import COAR2005 from '@/views/page/CO/AR/COAR2005/COAR2005' // 개인신용정보제공동의

import {dateFormat} from '@/utils/date'
import {mapGetters} from 'vuex'

export default {
    name : "PDSC4004",
    data: () => {
		return {
            // return info
			hlthList			: [], // 건강보험 가입내역
			inqYy				: '', // 조회년도
			hlthIsrEntDsc		: '', // 건강보험가입구분코드
			srchHlthIsrEntDsc   : '', // 조회된 건강보험가입구분코드
			hlthIsrEntDscNm		: '', // 건강보험가입구분코드명
			cusnm				: '', // 고객명
			hlthAssetYn			: '', // 자산연결여부(건강보험)
			yeadjHlthIsrfe		: 0,  // 연말정산보험료(건강보험)
			isConnectedPb		: true, // 공공기관 연결 여부
			sInqCpl				: true, // 조회 완료여부
			commList            : []
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
			this.hlthList			= []								// 건강보험 가입내역
			this.inqYy				= dateFormat(new Date, 'YYYY')		// 조회년도
			this.hlthIsrEntDsc		= '01'								// 건강보험가입구분코드(01:직장, 02:지역)
			this.hlthIsrEntDscNm	= '직장가입자'						 // 건강보험가입구분코드(01:직장, 02:지역)
        },
        initComponent() {
			this.hlthAssetYn = 'N'
			if(typeof this.myAssetsBzrgList != "undefined") {
				let publicAsset = this.myAssetsBzrgList.filter(item => item.comnCVal === 'public') || []
				if(publicAsset.length > 0) {
					let publicAssetList = this.myAssetsBzrgList.find(item => item.comnCVal === 'public').orgList || []
					if(publicAssetList.length > 0){
						this.hlthAssetYn = publicAssetList.find(item => item.infOfrmnOrgC === 'PBAAVN0000') ? 'Y' : 'N'		// 건강보험
					}
				}
			} else {
				this.hlthAssetYn = 'N'
			}
			this.hlthAssetYn == 'N'? this.isConnectedPb = false : this.isConnectedPb = true;

            this.init()
            this.getData()
			this.fnGetEntDsc()
        },
        getData() {
            this.hlthList      = [] // 건강보험 가입내역
			let setUrl      = ''
			setUrl      = '/pd/sc/01r02' // PFMPDSC01R02 (SoctIsrSvcV2)
			
            const config = {
                url: setUrl,
                data: {
					"mydtCusno": this.getUserInfo('mydtCusno') // 마이데이터고객번호
					,"inqYy" : this.inqYy						// 조회년도
					,"hlthIsrEntDsc" : this.hlthIsrEntDsc		// 건강보험가입구분코드
					,"x_api_type" : "user-search"				//API 실시간 처리로 추가
					, "ctfwKdC"   : "L165"						//API 실시간 처리로 추가
					}
			};
			
			console.log("config.data")
			console.log(config.data)

            apiService.call(config).then(response => {
				this.hlthList    = response.hlthIsrList || []

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

			});
		},
		fnSetYearPop() {
			let toYear = ''
			toYear = this.inqYy

			const config = {
                params: {
					"tabDsc": '2',
					"toYear": toYear,
					},
                renderer: {
					component: PDSC4003
                }
            };
            
            modalService.openSlidePagePopup(config).then(response => {
				if(response != null) {
					this.inqYy = response.toYear
				}	
			})
		},
		fnGetEntDsc() {
			const config = {
				url: '/co/co/00r01',
				data: {
						"comnCId": "HLTH_ISR_ENT_DSC" // 공통코드 ID(건강보험가입구분코드)
						}
			};

			apiService.call(config).then(response => {
				this.commList = response.comnCList || []
			});
		},
		fnSetEntDsc(comnCExpl, comnCVal) {
			this.hlthIsrEntDscNm = comnCExpl
			this.hlthIsrEntDsc	 = comnCVal
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
        PdCategoryV2,
        PdSubCategoryV2,
    }
}

</script>