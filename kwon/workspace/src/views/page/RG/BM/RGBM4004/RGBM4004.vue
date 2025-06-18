<!--
/*************************************************************************
* @ 서비스경로 : NH지역정보 > 자전거길 국토종주 > 국토종주 자전거길 > 자전거길 국토종주 현황
* @ 페이지설명 : NH지역정보 > 자전거길 국토종주 > 국토종주 자전거길 > 자전거길 국토종주 현황
* @ 파일명     : src/views/page/RG/BM/RGBM4001/RGBM4001.vue
* @ 작성자     : CS541601
* @ 작성일     : 2025-02-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-11              CS541601              최초작성
*************************************************************************/
-->
<template>

    <div id="wrap" class="sticky-scroll">

		
		<div class="content-view">

			<div id="content">
				
				<section class="local_info bike">
					<div class="mylocal">
						<p class="txt">오늘 어디로<br>달릴까요?</p>
						<p>행정안전부가 함께합니다.</p>
						<!--<lottie-player src="@/assets_v40/images/lottie/bg_local_bike.json"  loop autoplay aria-hidden="true" class="local_lottie" ></lottie-player> -->
						<lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_local_bike.json')" 
                                         ref="anim"
                                         :loop="true"
                                         :auto-play="true" 
                                         aria-hidden="true" 
                                         class="local_lottie" 
                                         >
                    	</lottie-animation>
					</div>
					
					<div class="local_search">
						<input type="search" id="local_search_01" class="inputClear" name="" value="" v-model="searchCond" @keyup.enter="fn_search" placeholder="검색어를 입력하세요" title="검색어를 입력하세요" ref="searchRef">
						<button type="button" class="com_btn_delete" @click="clearSearch()"><span class="blind">삭제</span></button>
						<button type="button" class="btn_search" @click="fn_search"><span class="blind">검색</span></button>
					</div>

					<ul role="tablist" class="inner_tab purple">
						<li class="on"><button type="button" role="tab" :aria-selected="selectedTab == 1" @click="fn_changeTab(1)">자전거길 코스</button></li>
						<li><button type="button" role="tab" :aria-selected="selectedTab == 2" @click="fn_changeTab(2)">주변시설</button></li>
						<li><button type="button" role="tab" :aria-selected="selectedTab == 3" @click="fn_changeTab(3)">자전거길 100선</button></li>
					</ul>

					<!-- Tab_자전거길 코스 -->
					<div v-if="selectedTab == 1" class="tab_cont1">
						<div class="board_box">
							<p class="sum">검색결과 총 <span class="num">{{ bikePathList.length }}</span>개</p>
							<ul class="row_ico_list">
								<li v-for="(item, idx) in bikePathList.slice(0, visibleCount[0])" :key="idx">
									<a href="javascript:void(0);" class="item" @click.prevent="fn_goPopGillDetailPage(item)">
										<p class="name">{{ item.bkphNm }}</p>
									</a>
								</li>
							</ul>
							<button type="button" class="list_more" :class="{ open: isOpenBike }" v-if="bikePathList.length > 5" @click="fn_moreItem">검색결과</button>
							<div class="no_result" v-if="bikePathList.length == 0">
								<p class="text">검색결과가 없습니다.</p>
							</div>
						</div>
					
				
					</div>

					<!-- Tab_주변시설 -->
					<div v-else-if="selectedTab == 2" class="tab_cont2">
						<div class="board_box">
							<p class="sum">검색결과 총 <span class="num">{{ bikeSurFacList.length }} </span>개</p>
							<ul class="row_ico_list">
								<li v-for="(item, idx) in bikeSurFacList.slice(0, visibleCount[1])" :key="idx">
									<a href="javascript:void(0);" class="item" @click.prevent="fn_goPopSurFacDetailPage(item)" v-if="item.eqiKdnm === '인증센터'">
										<p class="name">{{ item.bkphNm }}</p>
									</a>
									<a href="javascript:void(0);" class="item" @click.prevent="fn_goPopSurFacDetailPage(item)" v-else>
										<p class="name">{{ item.bkphNm + ' ' + item.eqiKdnm }}</p>
									</a>
								</li>
							</ul>
							<button type="button" class="list_more" :class="{ open: isOpenSurFac }" v-if="bikeSurFacList.length > 5" @click="fn_moreItem">검색결과</button>

							<div class="no_result" v-if="bikeSurFacList.length == 0">
								<p class="text">검색결과가 없습니다.</p>
							</div>
						</div>
					</div>
					
					<!-- Tab_자전거길 100선 -->
					<div v-else class="tab_cont3">
						<div class="category_tab has_btn">
							<ul role="tablist" :class="{ open: isToggled }">
								<li class="on"><a href="#navi11" role="tab" :aria-selected="selectedRegion == 0" @click.prevent="fn_searchRegion(0)">전체</a></li>
								<li><a href="#navi12" role="tab" :aria-selected="selectedRegion == 1" @click.prevent="fn_searchRegion(1)">서울</a></li>
								<li><a href="#navi12" role="tab" :aria-selected="selectedRegion == 2" @click.prevent="fn_searchRegion(2)">인천</a></li>
								<li><a href="#navi13" role="tab" :aria-selected="selectedRegion == 3" @click.prevent="fn_searchRegion(3)">대전</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 4" @click.prevent="fn_searchRegion(4)">대구</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 5" @click.prevent="fn_searchRegion(5)">광주</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 6" @click.prevent="fn_searchRegion(6)">부산</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 7" @click.prevent="fn_searchRegion(7)">울산</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 8" @click.prevent="fn_searchRegion(8)">세종</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 31" @click.prevent="fn_searchRegion(31)">경기</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 32" @click.prevent="fn_searchRegion(32)">강원</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 33" @click.prevent="fn_searchRegion(33)">충북</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 34" @click.prevent="fn_searchRegion(34)">충남</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 37" @click.prevent="fn_searchRegion(37)">전북</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 38" @click.prevent="fn_searchRegion(38)">전남</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 35" @click.prevent="fn_searchRegion(35)">경북</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 36" @click.prevent="fn_searchRegion(36)">경남</a></li>
								<li><a href="#navi14" role="tab" :aria-selected="selectedRegion == 39" @click.prevent="fn_searchRegion(39)">제주</a></li>
							</ul>
							<button type="button" class="btn_fold" aria-expanded="false" @click.stop="toggleTab"><span class="blind">토글 버튼</span></button>
						</div>
						<div class="board_box">
							<p class="sum">검색결과 총 <span class="num">{{ bikePath100List.length }}</span>개</p>
							<ul class="row_thum_list">
								<li v-for="(item, idx) in bikePath100List.slice(0, visibleCount[2])" :key="idx">
									<a href="javascript:void(0);" class="item" @click.prevent="fn_goPopGill100DetailPage(item)">
										<img :src="`/assets/images/local_bike/${item.bkphNo1Imgnm}.png`" alt="" class="img">
										<p class="name">{{ item.bkphNm }}</p>
										<p class="txt" v-if="!!item.bkphPathCntn">{{ item.bkphPathCntn.split("|")[0] }}</p>
										<p class="desc" v-if="!!item.nedHrCntn">{{ item.nedHrCntn.split("|")[0] }}</p>
										<p class="desc" v-if="!!item.odmdsCntn">{{ item.odmdsCntn.split("|")[0] }}</p>
									</a>
								</li>
							</ul>
							<button type="button" class="list_more" :class="{ open: isOpenBikeHundred }" v-if="bikePath100List.length > 5" @click="fn_moreItem">검색결과</button>

							<div class="no_result" v-if="bikePath100List.length == 0">
								<p class="text">검색결과가 없습니다.</p>
							</div>
						</div>
						
					</div>
					<!-- //Tab -->
				</section>

			</div>

			<!-- Footer -->
            <footersV2 type="" />
		</div>
	</div>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import RGBM4005 from '@/views/page/RG/BM/RGBM4005/RGBM4005' // 자전거길코스 상세 팝업  
import RGBM4007 from '@/views/page/RG/BM/RGBM4007/RGBM4007' // 주변시설 상세 팝업  
import RGBM4101 from '@/views/page/RG/BM/RGBM4101/RGBM4101' // 자전거길100선 상세 팝업
import modalService  from '@/service/modalService'
import LottieAnimation from 'lottie-web-vue'

export default {
    name : "RGBM4001",
	data: () => {
        return {

			//선택 된 탭
            selectedTab: 1,

			lastSelectedRegion: 0,

			//자전거길 리스트
			bikePathList: [],

			//자전거길 100선 리스트
			bikePath100List: [],
			
			//자전거길 주변시설 리스트
			bikeSurFacList: [],

			//선택된 지역
			selectedRegion: 0,

			//보여질 검색결과 개수
			visibleCount: [5, 5, 5],

			//검색어
			searchCond: '',

			isSearch: false,

			latestSearch: '',

			isToggled: false,

			option: {
				root: null,
				threshold: 1,
			},
		}
	},

    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST

		this.fn_changeTab(3)
        apiService.pfmLogSend(this.$options.name)
		
    },
    mixins: [
        commonMixin
    ],
    methods: {
		  /* 자전거길 상세 팝업 */
        fn_goPopGillDetailPage(p) {

			
			let compName = RGBM4005
			let param    = p;

			const apiConfig = {
					method : 'post',
                	url : '/rg/bm/01r03',
                	data : {
                    	bkphNm: p.bkphNm,
						eqiKdnm: '자전거길'
                	},
					flag : 'main'
            	}	

            apiService.call(apiConfig).then(response => {
				this.$set(param, 'gpsList', response.gpsList)
            })


			const config = {
				component: compName,
				params: param
			}
			modalService.openPopup(config).then(() => {})
		},

		clearSearch() {
			this.searchCond = ''
		},


		toggleTab() {
			this.isToggled = !this.isToggled
			console.log('isToggled last state')
			console.log(this.isToggled)
		},
  		/* 주변시설 상세 팝업 */
        fn_goPopSurFacDetailPage(p) {


			let compName = RGBM4007
			let param    = p;
			/*
			const apiConfig = {
					method : 'post',
                	url : '/rg/bm/01r03',
                	data : {
                    	bkphNm: p.bkphNm,
						eqiKdnm: p.eqiKdnm
                	},
					flag : 'main'
            	}	


            apiService.call(apiConfig).then(response => {
				console.log('RGBM4001 API CALL')
				console.log(response)
				this.$set(param, 'gpsList', response.gpsList)
				this.$set(param.gpsList[0], 'name', p.bkphNm)
				this.$set(param.gpsList[0], 'isReverse', true)

				
            })
			*/

			const config = {
				component: compName,
				params: param
			}
			modalService.openPopup(config).then(() => {})
		},

		/* 자전거길100선 상세 팝업 */
		fn_goPopGill100DetailPage(p) {

			let compName = RGBM4101
			let param	 = p;

			const apiConfig = {
					method : 'post',
                	url : '/rg/bm/01r03',
                	data : {
                    	bkphNm: p.bkphNm,
						eqiKdnm: '자전거길'
                	}
            	}	

            apiService.call(apiConfig).then(response => {
				//console.log(response)
				param.gpsList = response.gpsList
            })


			const config = {
				component: compName,
				params : param
			}

			modalService.openPopup(config).then(() => {})
		},

		/* 탭 변경 */
		fn_changeTab(tab) {
			this.selectedTab = tab

			//자전거길 100선 탭 인 경우 서울로 초기 검색
			if (tab == 3) {
				this.fn_searchRegion(this.lastSelectedRegion)
			}

		},
		fn_search() {
			
			this.$refs.searchRef.blur()
			this.latestSearch = this.searchCond
			this.fn_searchRegion(this.lastSelectedRegion)
			
			this.$set(this.visibleCount, this.selectedTab - 1, 5)

			const config1 = {
				method : 'post',
                url : '/rg/bm/01r02',
                data : {
                    searchCond : this.searchCond
                }
            }	

            apiService.call(config1).then(response => {
				if (!!response.surFacList) {
               		this.bikePathList = response.surFacList.filter((item) => item.eqiKdnm === '자전거길').sort((a, b) => a.bkphNm.toLowerCase() < b.bkphNm.toLowerCase() ? -1 : 1)
				} 
            })

			const config2 = {
				method : 'post',
                url : '/rg/bm/01r02',
                data : {
                    searchCond : this.searchCond
                }
            }	

            apiService.call(config2).then(response => {
				if (!!response.surFacList) {
               		this.bikeSurFacList = response.surFacList.filter((item) => item.eqiKdnm !== '자전거길' ).sort((a, b) => a.bkphNm.toLowerCase() < b.bkphNm.toLowerCase() ? -1 : 1)
				} 
            })
		},

		fn_searchRegion(regionCode) {
			
			const config = {
				method : 'post',
				url : 'rg/bm/01r01',
				data : {
					searchCond : ' '
				}
			}
			
			if (this.lastSelectedRegion != regionCode) {
				this.$set(this.visibleCount, 2, 5)
			}

			this.lastSelectedRegion = regionCode
			this.selectedRegion = regionCode
			
			switch(regionCode) {
				case 0:
					config.data.searchCond = ''
					break
				case 1:
					config.data.searchCond = '서울'
					break
				case 2:
					config.data.searchCond = '인천'
					break
				case 3:
					config.data.searchCond = '대전'
					break
				case 4:
					config.data.searchCond = '대구'
					break
				case 5:
					config.data.searchCond = '광주'
					break
				case 6:
					config.data.searchCond = '부산'
					break
				case 7:
					config.data.searchCond = '울산'
					break
				case 8:
					config.data.searchCond = '세종'
					break
				case 31:
					config.data.searchCond = '경기'
					break
				case 32:
					config.data.searchCond = '강원'
					break
				case 33:
					config.data.searchCond = '충북'
					break
				case 34:
					config.data.searchCond = '충남'
					break
				case 35:
					config.data.searchCond = '경북'
					break
				case 36:
					config.data.searchCond = '경남'
					break
				case 37:
					config.data.searchCond = '전북'
					break
				case 38:
					config.data.searchCond = '전남'
					break		
				case 39:
					config.data.searchCond = '제주'
					break
			}

			apiService.call(config).then(response => {
				
				let pathList = response.pathList

				if (this.latestSearch.length >= 1) {
					pathList = response.pathList.filter((item) => item.bkphNm.indexOf(this.latestSearch) != -1)
				}

                this.bikePath100List = pathList.filter((item) => item.bkphDsc == 2).sort((a, b) => a.bkphNm.toLowerCase() < b.bkphNm.toLowerCase() ? -1 : 1)
            })
		},

		fn_moreItem() {
			if (this.selectedTab == 1 && this.isOpenBike) {
				this.$set(this.visibleCount, 0, 5)
				this.$nextTick(() => {
					const resultsSection = document.querySelector('.content-view');
					if(resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth'})
				});
			} else if (this.selectedTab == 2 && this.isOpenSurFac) {
				this.$set(this.visibleCount, 1, 5)
				this.$nextTick(() => {
					const resultsSection = document.querySelector('.content-view');
					if(resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth'})
				});
			} else if (this.selectedTab == 3 && this.isOpenBikeHundred) {
				this.$set(this.visibleCount, 2, 5)
				this.$nextTick(() => {
					const resultsSection = document.querySelector('.content-view');
					if(resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth'})
				});
			} else {
				this.$set(this.visibleCount, this.selectedTab - 1, this.visibleCount[this.selectedTab - 1] + 4)
			}
		}

    },
	watch: {
		'selectedTab': {
			handler(value, oldValue) {
				if (value == 1) {
					const config = {
						method : 'post',
                		url : '/rg/bm/01r02',
                		data : {
                    		searchCond : this.latestSearch
                		}
            		}	

            		apiService.call(config).then(response => {
						if (!!response.surFacList) {
               				this.bikePathList = response.surFacList.filter((item) => item.eqiKdnm === '자전거길').sort((a, b) => a.bkphNm.toLowerCase() < b.bkphNm.toLowerCase() ? -1 : 1)
						} 
            		})
				} else if (value == 2) {

					const config = {
						method : 'post',
                		url : '/rg/bm/01r02',
                		data : {
                    		searchCond : this.latestSearch
                		}
            		}	

            		apiService.call(config).then(response => {
						if (!!response.surFacList) {
               				this.bikeSurFacList = response.surFacList.filter((item) => item.eqiKdnm !== '자전거길').sort((a, b) => a.bkphNm.toLowerCase() < b.bkphNm.toLowerCase() ? -1 : 1)
						} 
            		})
				}	
			},
			immediate: true
		}
	},

	computed: {
		isOpenBike() {
			return this.visibleCount[0] >= this.bikePathList.length && this.bikePathList.length > 5
		},

		isOpenSurFac() {
			return this.visibleCount[1] >= this.bikeSurFacList.length && this.bikeSurFacList.length > 5
		},

		isOpenBikeHundred() {
			return this.visibleCount[2] >= this.bikePath100List.length && this.bikePath100List.length > 5
		}
	},
    components: {
		Page,
        FootersV2,
		LottieAnimation,
	}
}
</script>