<!--
/*************************************************************************
* @ 서비스경로 : 금융통통 > 세금현황
* @ 페이지설명 : 
* @ 파일명     : src\views\page\PD\TX\PDTX2004\PDTX2004.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-08-22
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-22              CS533541              최초작성
*************************************************************************/
-->
<template>
	<page class="content-view hasLNB mydata2023">
        <pd-category-v2 type="PDRT"></pd-category-v2>
        <pd-sub-category-v2 type="TX"></pd-sub-category-v2>

		<div id="content" class="renewal financial_life">
			<div class="com_inner tax_status">
				<div v-show="isConnectedPb" class="top_area">
					<strong class="titH1">
						{{cusnm}}님의<br>
						세금 납부 현황이예요.
					</strong>

					<p v-if="lctxList.length > 0" class="com_txtinfo_type01" >체납 중인 세금이 있어요!</p>
					<p v-else-if="prtoDsc == '99'" class="com_txtinfo_type01" >체납 중인 세금이 있어요!</p>
					<p v-else-if="cdtyDlqYn =='Y'" class="com_txtinfo_type01" >체납 중인 세금이 있어요!</p>
				</div>


				<div class="tax_tab">
					<div v-show="isConnectedPb"  class="com_tabmenu_type03 switchType btn2">
						<ul role="tablist">
							<li :class="selectedTab === '01' ? 'on' : ''" role="presentation" aria-controls="tab_01" @click="() => selectedTab = '01'"><a href="javascript:void(0);" role="tab"><span>지방세</span></a></li>
							<li :class="selectedTab === '02' ? 'on' : ''" role="presentation" aria-controls="tab_02" @click="() => selectedTab = '02'"><a href="javascript:void(0);" role="tab"><span>국세</span></a></li>
							<li :class="selectedTab === '03' ? 'on' : ''" role="presentation" aria-controls="tab_03" @click="() => selectedTab = '03'"><a href="javascript:void(0);" role="tab"><span>관세</span></a></li>
						</ul>
					</div>
					<!-- 지방세 -->
					<PDTX2001 v-if="lctxAssetYn =='Y' && selectedTab === '01'" @getLctxList="getLctxList"/>
					<!-- //지방세 -->
					
					<!-- 국세 -->
					<PDTX2002 v-if="natxAssetYn =='Y' && selectedTab === '02'" @getNatxPrtoDsc="getNatxPrtoDsc"/>
					<!-- //국세 -->

					<!-- 관세 -->
					<PDTX2003 v-if="cdtyAssetYn =='Y' && selectedTab === '03'" @getCdtyDlqYn="getCdtyDlqYn"  />
					<!-- //관세 -->
				</div>	

				
				<!-- 공공기관 모두 미연결 -->
				<template v-if="!isConnectedPb">
					<div class="tax_nolink">
						<div class="img_wrap">
							<img src="@/assets_v40/images/img/tax_nolink_2023.png" alt="tax 이미지">
						</div>
						<div class="text">
							<strong class="titH3">세금관리 더 잘하려면?</strong>
							<p class="desc">
								흩어진 기관을 한 번에 연결하고<br>
								각종 세금 체납 여부와 납부 정보를 한 눈에 확인하세요 
							</p>
						</div>
					</div>

					<div class="com_btn_area">
						<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click="fn_openPopup()">내 세금 현황 확인하기</a>
					</div>
				</template>
				<!-- //공공기관 미연결 -->

				<!-- 공공기관 지방세 미연결 -->
				<template v-if="isConnectedPb && lctxAssetYn =='N' && selectedTab == '01'">
					<div class="tax_nolink">
						<div class="img_wrap">
							<img src="@/assets_v40/images/img/tax_nolink_2023.png" alt="tax 이미지">
						</div>
						<div class="text">
							<strong class="titH3">세금관리 더 잘하려면?</strong>
							<p class="desc">
								흩어진 기관을 한 번에 연결하고<br>
								각종 세금 체납 여부와 납부 정보를 한 눈에 확인하세요 
							</p>
						</div>
					</div>

					<div class="com_btn_area">
						<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click="fn_openPopup()">내 세금 현황 확인하기</a>
					</div>
				</template>
				<!-- //공공기관 지방세 미연결 -->

				<!-- 공공기관 국세 미연결 -->
				<template v-if="isConnectedPb && natxAssetYn =='N' && selectedTab == '02'">
					<div class="tax_nolink">
						<div class="img_wrap">
							<img src="@/assets_v40/images/img/tax_nolink_2023.png" alt="tax 이미지">
						</div>
						<div class="text">
							<strong class="titH3">세금관리 더 잘하려면?</strong>
							<p class="desc">
								흩어진 기관을 한 번에 연결하고<br>
								각종 세금 체납 여부와 납부 정보를 한 눈에 확인하세요 
							</p>
						</div>
					</div>

					<div class="com_btn_area">
						<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click="fn_openPopup()">내 세금 현황 확인하기</a>
					</div>
				</template>
				<!-- //공공기관 국세 미연결 -->

				<!-- 공공기관 관세 미연결 -->
				<template v-if="isConnectedPb && cdtyAssetYn =='N' && selectedTab == '03'">
					<div class="tax_nolink">
						<div class="img_wrap">
							<img src="@/assets_v40/images/img/tax_nolink_2023.png" alt="tax 이미지">
						</div>
						<div class="text">
							<strong class="titH3">세금관리 더 잘하려면?</strong>
							<p class="desc">
								흩어진 기관을 한 번에 연결하고<br>
								각종 세금 체납 여부와 납부 정보를 한 눈에 확인하세요 
							</p>
						</div>
					</div>

					<div class="com_btn_area">
						<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click="fn_openPopup()">내 세금 현황 확인하기</a>
					</div>
				</template>
				<!-- //공공기관 관세 미연결 -->


			</div>
		</div>
		<footersV2 type="pd" />
	</page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import PdCategoryV2 from '@/components/category/PdCategoryV2.vue'
import PdSubCategoryV2 from '@/components/category/PdSubCategoryV2.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
// import popupMixin from '@/common/mixins/popupMixin'
import PDTX2001 from '@/views/page/PD/TX/PDTX2001/PDTX2001'
import PDTX2002 from '@/views/page/PD/TX/PDTX2002/PDTX2002'
import PDTX2003 from '@/views/page/PD/TX/PDTX2003/PDTX2003'
//import COAR2003 from '@/views/page/CO/AR/COAR2003/COAR2003'
import COAR2005 from '@/views/page/CO/AR/COAR2005/COAR2005' // 개인신용정보제공동의
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
// import appService from '@/service/appService'

import {mapGetters} from 'vuex'

export default {
	name: 'PDTX2004',
	data: () => {
		return {
			isConnectedPb: true, // 공공기관 연결 여부
			selectedTab: '01', // 선택된 탭 [지방세, 국세, 관세]
			cusnm: '',
			lctxAssetYn : 'N',
			natxAssetYn : 'N',
			cdtyAssetYn : 'N',
			lctxList: [],    //지방세
			prtoDsc   : '',  //국세 체납여부
			cdtyDlqYn : ''   //관세체납여부
			
		}
	},
	computed: {
         ...mapGetters('myassets', [
             'myAssetsBzrgList'
		]),
	},
	methods: {
		getLctxList(list) {
			console.log('this.lctxList', list)
			this.lctxList = list
		},
		getNatxPrtoDsc(prtoDsc) {
			console.log('this.natxLctxList', prtoDsc)
			this.prtoDsc = prtoDsc
		},

		

		getCdtyDlqYn(dlqYn) {
			console.log('this.dlqYn', dlqYn)
			this.cdtyDlqYn = dlqYn
		},
		

		init() {

			this.cusnm = this.getUserInfo("cusnm")
		},
		/**
		 * 페이지 이동
		 */
		fn_movePage(pageId) {
            let params = {}
            // if 나의목표 화면
            if (pageId == 'COAR2003') {
                params = {}
            }
            const config = {
                name : pageId,
                params : params
			}
			commonService.movePage(config);
		},
		// 팝업 열기
		fn_openPopup() {

			let compName = COAR2005;

			let param = {}
			let moduleList = []
			let moduleParam = {}
			if(this.isConnectedPb == false) { // 모두 미연결시 

				moduleParam.orgC		= "PBAAVL0000"
				moduleParam.orgBzrgC	= "public"
				moduleParam.orgnm		= "행정안전부"
				moduleList.push(moduleParam)

				moduleParam = {}
				moduleParam.orgC		= "PBAAVJ0000"
				moduleParam.orgBzrgC	= "public"
				moduleParam.orgnm		= "국세청"
				moduleList.push(moduleParam)

				moduleParam = {}
				moduleParam.orgC		= "PBAAVK0000"
				moduleParam.orgBzrgC	= "public"
				moduleParam.orgnm		= "관세청"
				moduleList.push(moduleParam)


			} else if(this.lctxAssetYn == 'N') {	//지방세
				moduleParam.orgC		= "PBAAVL0000"
				moduleParam.orgBzrgC	= "public"
				moduleParam.orgnm		= "행정안전부"
				moduleList.push(moduleParam)

			} else if(this.natxAssetYn == 'N') {	//국세청
				moduleParam.orgC		= "PBAAVJ0000"
				moduleParam.orgBzrgC	= "public"
				moduleParam.orgnm		= "국세청"
				moduleList.push(moduleParam)

			}else{//관세청			
				moduleParam.orgC		= "PBAAVK0000"
				moduleParam.orgBzrgC	= "public"
				moduleParam.orgnm		= "관세청"
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
				console.log('response', response)
			})
			/*
			const config_info = {
				component : '',
			}
			if (pageId === 'COAR2003') {
				config_info.component = COAR2003
			}
			modalService.openPopup(config_info).then(response => {
				console.log('response', response)
			})
			*/
		},
		tabLayerInit() {
			let arr = [],
			_tabList = $('.switchType li');
			console.log('_tabList', _tabList)
			if (_tabList?.length > 0) {
				_tabList.each(function(e){
				arr[e] = $(this).outerWidth();
				});
				console.log('arr ## ', arr)
				_tabList.css('width',Math.max(...arr)); //탭 사이즈 적용
				_tabList.parent().parent().css('width',Math.max(...arr)*arr.length); //탭전체 사이즈 적용
			}
			//console.log('값 = '+arr+', 갯수 = '+arr.length+', 최고값 = '+Math.max(...arr));
		},

		initComponent() {

			if(typeof this.myAssetsBzrgList != "undefined") {
				
				let publicAsset = this.myAssetsBzrgList?.filter(item => item.comnCVal === 'public') || []

				if(publicAsset.length > 0) {

					let publicAssetList = this.myAssetsBzrgList.find(item => item.comnCVal === 'public').orgList || []

					if(publicAssetList.length > 0){

						this.lctxAssetYn = publicAssetList.find(item => item.infOfrmnOrgC === 'PBAAVL0000') ? 'Y' : 'N'		// 지방세
						this.natxAssetYn = publicAssetList.find(item => item.infOfrmnOrgC === 'PBAAVJ0000') ? 'Y' : 'N'		// 국세
						this.cdtyAssetYn = publicAssetList.find(item => item.infOfrmnOrgC === 'PBAAVK0000') ? 'Y' : 'N'		// 관세
					}
				}
			} else {

				this.lctxAssetYn = 'N'
				this.natxAssetYn = 'N'
				this.cdtyAssetYn = 'N'
			}

			console.log("lctxAssetYn**********",this.lctxAssetYn);
			console.log("natxAssetYn**********",this.natxAssetYn);
			console.log("cdtyAssetYn**********",this.cdtyAssetYn);

			if(this.lctxAssetYn == 'N' && this.natxAssetYn == 'N' && this.cdtyAssetYn == 'N'){
				this.isConnectedPb =  false;
			}else{
				this.isConnectedPb = true;	
			}

			console.log("isConnectedPb====", this.isConnectedPb)
		}
		
	},
	mounted(){
		this.init()
		this.tabLayerInit()
		this.initComponent()

		//PFM로그 처리 화면접속이력 등록 POST
    	apiService.pfmLogSend(this.$options.name)

	},
	mixins: [
        commonMixin,
        // popupMixin
    ],
	components: {
		Page,
		PdCategoryV2,
		PdSubCategoryV2,
		FootersV2,
		PDTX2001,
		PDTX2002,
		PDTX2003,
    }
}
</script>