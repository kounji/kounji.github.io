<!--
/*************************************************************************
* @ 서비스경로 : NH지역정보 > 전국 둘레길 > 현황
* @ 페이지설명 : NH지역정보 > 전국 둘레길 > 현황
* @ 파일명     : src/views/page/RG/DM/RGDM4001/RGDM4001.vue
* @ 작성자     : CS541601
* @ 작성일     : 2025-02-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-10             CS541601                 신규
*************************************************************************/
-->
<template>
	<div id="wrap" class="sticky-scroll">

		

		
		<div class="content-view">

			<div id="content">
				
				<section class="local_info road">
					<div class="mylocal">
						<p class="txt">전국의 둘레길을<br>확인해 볼까요?</p>
						<p>한국관광공사가 함께합니다.</p>
						<!-- <lottie-player src="@/assets_v40/images/lottie/bg_local_road.json"  loop autoplay aria-hidden="true" class="local_lottie" ></lottie-player> -->
						<lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_local_road.json')" 
                                         ref="anim"
                                         :loop="true"
                                         :auto-play="true" 
                                         :speed="1"
                                         aria-hidden="true" 
                                         class="local_lottie" 
                                         >
                        </lottie-animation>
					</div>

					

					<div class="local_search">
						<input type="search" id="local_search_01" class="inputClear" name="" value="" v-model="trlcosNm" @keyup.enter="search" placeholder="전국 둘레길 코스를 검색하세요" title="전국 둘레길 코스를 검색하세요" ref="searchRef">
						<button type="button" class="com_btn_delete" @click="clearSearch()"><span class="blind">삭제</span></button>
						<button type="button" class="btn_search" @click="search"><span class="blind">검색</span></button>
					</div>

					<div class="category_tab has_btn"> <!--[v4.0] 2025-04-11 탭 추가 -->
						<ul role="tablist">
							<li class="on"><a href="#navi11" role="tab" :aria-selected="selectedTab == 0" @click="changeTab(0)">전체</a></li>
							<li><a href="#navi12" role="tab" :aria-selected="selectedTab == 1" @click="changeTab(1)">DMZ 평화의 길</a></li>
							<li><a href="#navi13" role="tab" :aria-selected="selectedTab == 2" @click="changeTab(2)">남파랑길</a></li>
							<li><a href="#navi14" role="tab" :aria-selected="selectedTab == 3" @click="changeTab(3)">물소리길</a></li>
							<li><a href="#navi15" role="tab" :aria-selected="selectedTab == 4" @click="changeTab(4)">서해랑길</a></li>
							<li><a href="#navi16" role="tab" :aria-selected="selectedTab == 5" @click="changeTab(5)">해파랑길</a></li>
						</ul>
						<button type="button" class="btn_fold" aria-hidden="true"><span class="blind">토글 버튼</span></button> <!--[v4.0] 2025-02-18 버튼 속성 수정 -->
					</div>

					<div class="board_box">
						<p class="sum">검색결과 총 <span class="num">{{ dulegilList[selectedTab].length }}</span>개</p>
					<div v-for="(dulegil, index) in dulegilList[selectedTab].slice(0, visibleCount[selectedTab])" :key="index">
						<ul class="row_ico_list">
							<li>
								<a href="javascript:void(0);" class="item" @click.prevent="fn_goPopDetailPage(dulegilList[selectedTab][index], index)">
									<p class="name">{{dulegil.trlcosNm}}</p>
								</a>
							</li>

						</ul>
					</div>

					<!--[v4.0] 2025-02-28 empty 케이스 추가 -->
						<!-- empty 케이스 -->
						<div class="no_result" v-if="dulegilList[selectedTab].length == 0">
							<p class="text">검색결과가 없어요.</p>
						</div>
						<!-- //empty 케이스 -->

						<!--[v4.0] 2025-03-07 더보기 버튼 추가 -->
						<!-- 더 불러올 리스트 없을 경우 class="open" 추가해주세요.  -->
						<button type="button" class="list_more" :class="{ open: isOpen }" v-if="dulegilList[selectedTab].length > 5" @click="fn_moreItem">검색결과</button>
					
                        <!-- <div class="com_btn_area"><a href="javascript:void(0);" class="com_btn_more" @click.prevent="showMoreList()" :style="noMoreList"><span>더보기</span></a></div> -->
                                         
					</div>

					<div class="board_box">
						<div class="head"> <!--[v4.0] 2025-04-09 타이틀 추가 -->
							<strong>우리나라 둘레길은</strong>
						</div>
						<ul class="thum_list">
							<li>

								<a href="javascript:void(0);" @click.prevent="openWebBrowser('https://www.durunubi.kr/dmz-introduction.do')" class="item" targer="_blank" title="새창열기">
									<img src="@/assets_v40/images/img/img_road_01.png" alt="" class="img">
									<p class="name">DMZ평화의 길</p>
								</a>
							</li>
							<li>
								<a href="javascript:void(0);" @click.prevent="openWebBrowser('https://www.durunubi.kr/haeparang-introduction.do')" class="item" targer="_blank" title="새창열기">
									<img src="@/assets_v40/images/img/img_road_02.png" alt="" class="img">
									<p class="name">해파랑길</p>
								</a>
							</li>
							<li>
								<a href="javascript:void(0);" @click.prevent="openWebBrowser('https://www.durunubi.kr/seohaerang-introduction.do')" class="item" targer="_blank" title="새창열기">
									<img src="@/assets_v40/images/img/img_road_03.png" alt="" class="img">
									<p class="name">서해랑길</p>
								</a>
							</li>
							<li>
								<a href="javascript:void(0);" @click.prevent="openWebBrowser('https://www.durunubi.kr/namparang-introduction.do')" class="item" targer="_blank" title="새창열기">
									<img src="@/assets_v40/images/img/img_road_04.png" alt="" class="img">
									<p class="name">남파랑길</p>
								</a>
							</li>
						</ul>

					</div>
				</section>

			</div>

			<!-- Footer -->
            <footersV2 type="" />
			
		</div>
	</div>

</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import RGDM4002 from '@/views/page/RG/DM/RGDM4002/RGDM4002' // 둘레길 상세 팝업 
import modalService from '@/service/modalService'
import appService from '@/service/appService'
import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue

export default {
        name : "RGDM4001",
        data: () => {
			return {
					mydtCusno: '', 	// 마이데이터고객번호
           			trlcosNm : '',	// 둘레길명
					lastTrlcosNm : '', // 마지막으로 검색한 둘레길 이름
					resDulegilList : [],
					dulegilList : [[], [], [], [], [], []],
					pageNo : 1,  // 5개씩 call
					moreBtnShow : true,   //  더보기 버튼 노출여부
					searchResultCnt : 0,
					selectedTab : 0,
					visibleCount : [5, 5, 5, 5, 5, 5],
					trlcosMap: {
						0 : '',
						1 : 'DMZ',
						2 : '남파랑',
						3 : '물소리',
						4 : '서해랑',
						5 : '해파랑'
					}
					
				}
		},

        mounted() {
        this.initComponent()
		
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    	},
		mixins: [
        	commonMixin
    	],
		methods: {
		  /* 둘레길 상세 팝업 */
        fn_goPopDetailPage(dulegilList, idx) {

			console.log("dulegilList333",dulegilList)
			

			let compName = RGDM4002
			let param    = {
				
					dulegilList	: dulegilList,
					idx : idx,
			};

			const config = {
				component: compName,
				params : param
			}
			modalService.openPopup(config).then(() => {})
		},

		clearSearch() {
			this.trlcosNm = ''
		},

		changeTab(i) {
			this.selectedTab = i
		},
    
		getData(){

			console.log("둘레길 조회!!")
			
			this.searchResultCnt = 0;
		
			const config = {
				url: '/rg/dm/01r01',
				data: {
						"trlcosNm": '',				// 둘레길명
						//"pageNo"  : 1					// 페이지번호
					}
			}
			console.log("getData()===========>",config)
			apiService.call(config).then(response => {
				console.log("둘레길 조회 response >>> : ", response)
					
				this.resDulegilList = response.dulegilList
				this.searchResultCnt += Number(response.dulegilCn)

				for (let i = 0; i < 6; i++) {
					this.$set(this.dulegilList, i, this.resDulegilList.filter((item) => item.trlcosNm.indexOf(this.trlcosMap[i]) != -1))
				}
					
			})
		},
		search() {

			console.log("둘레길 조회!!")

			this.$refs.searchRef.blur()
			
			this.searchResultCnt = 0
			this.lastTrlcosNm = this.trlcosNm
			for (let i = 0; i < 6; i++) {
				this.$set(this.visibleCount, i, 5)
				this.$set(this.dulegilList, i, this.resDulegilList.filter((item) => item.trlcosNm.indexOf(this.trlcosMap[i]) != -1).filter((item) => item.trlcosNm.indexOf(this.lastTrlcosNm) != -1))
			}
		},
		//더보기
		// showMoreList() {
		// 		this.pageNo += 1
				
		// 		const config = {
		// 			url: '/rg/dm/01r01',
		// 			data: {
		// 					"trlcosNm" : this.trlcosNm,				// 둘레길명
		// 					//"pageNo"  : this.pageNo				// 페이지번호
		// 				}
		// 		}
		// 		console.log("getData()===========>",config)
		// 		apiService.call(config).then(response => {
		// 			console.log("둘레길 조회 response >>> : ", response)
		// 			console.log("둘레길 조회 responsedulegilCn >>> : ", response.dulegilCn)
		// 			this.searchResultCnt += Number(response.dulegilCn)
		// 			var i = 0
		// 			for(i=0; i<response.dulegilList.length; i++) {
		// 					this.resDulegilList.push(response.dulegilList[i])   // 수입지출일별목록 Add
		// 			}

		// 		})

		// },

		/**
         * 외부 브라우저 열기
         */
        openWebBrowser(url) {
            if (this.getUserInfo('chnl') === '385') {
                appService.executeBrowser(url);
            } else {
                appService.cokBankOpenPopupWebBrowser(url);
            }
        },
		initComponent() {
            this.mydtCusno = this.getUserInfo('mydtCusno')

			this.searchResultCnt = 0;
			
            // 목록조회
            this.$nextTick(() => this.getData());
        },
		fn_moreItem() {
			if (this.isOpen) {
				this.$set(this.visibleCount, this.selectedTab, 5)
				this.$nextTick(() => {
					const resultsSection = document.querySelector('.content-view');
					if(resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth'})
				});
			} else {
				this.$set(this.visibleCount, this.selectedTab, this.visibleCount[this.selectedTab] + 20)
			}
		}
		},
        created() {
			

        },

		computed: {
			isOpen() {
				return this.visibleCount[this.selectedTab] >= this.dulegilList[this.selectedTab].length 
			}
		},
       
        components : {
            Page,
            FootersV2,
			LottieAnimation,
        }
    }



</script>