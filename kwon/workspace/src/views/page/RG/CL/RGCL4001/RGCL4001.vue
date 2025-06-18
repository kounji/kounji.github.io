<!--
/*************************************************************************
* @ 서비스경로 : NH지역정보 > 지역문화
* @ 페이지설명 : NH지역정보 > 지역문화
* @ 파일명     : src/views/page/RG/CL/RGCL4001/RGCL4001.vue
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
				
				<section class="local_info culture">
					<!--관심지역 설정-->
					<div class="local_favorite">
						<h2>관심지역 설정</h2>

						<div class="setting">
							<div class="toggle_check" @click.prevent="fn_regionAlert()">
								<input type="checkbox" title="선택" name="" id="toggle_check_01" v-model="isChecked">
								<label for="toggle_check_01">
									<span class="blind">관심지역</span>
								</label>
							</div>

							<button type="button" class="btn_setting" @click.prevent="fn_goPopPage()"><span class="blind">관심지역설정하기</span></button>
						</div>

						<!--관심지역 셋팅 전-->
						<div v-show="!isChecked" class="mylocal">
							<p class="txt">전국의 문화시설을<br>확인할 수 있어요.</p>
							<p>한국문화정보원이 함께합니다.</p>
							<lottie-animation 
								:animationData="require('@/assets_v40/images/lottie/bg_local_culture.json')" 
								ref="anim"
								:loop="true"
								:auto-play="true" 
								aria-hidden="true" 
								class="local_lottie" 
							>
                    		</lottie-animation>
						</div>

						<!--관심지역 셋팅 후-->
						<div v-show="isChecked" class="mylocal after">
							<p class="txt">지금 <span>{{ regionName }}</span>{{ addEunNeun(regionName) }}<br>만나러 갑니다</p>
							<p>한국문화정보원이 함께합니다</p>
							<lottie-animation 
								:animationData="require('@/assets_v40/images/lottie/bg_local_culture_after.json')" 
								ref="anim"
								:loop="true"
								:auto-play="true" 
								aria-hidden="true" 
								class="local_lottie" 
							>
                    		</lottie-animation>
						</div>
					</div>

					<div class="local_search">
						<input type="search" id="local_search_01" class="inputClear" ref="inputBox" name="" value="" v-model="orgnm" @keyup.enter="search" :placeholder="'검색어를 입력하세요(' + regionName + ' 지역)'" :title="'검색어를 입력하세요(' + regionName + ' 지역)'">
						<button type="button" class="com_btn_delete" @click.prevent="clickClear()"><span class="blind">삭제</span></button>
						<button type="button" class="btn_search" @click="search()"><span class="blind">검색</span></button>
					</div>

					<!-- 배너(관심지역 미설정시 노출) -->
					<a href="javascript:void(0);" v-show="!isChecked" target="_blank" class="img_banner">
						<img src="@/assets_v40/images/banner/img_banner_local01.png" @click.prevent="fn_openBrowser" alt="맛이 좋은 농업쌀박물관 바로가기">
					</a>

					<div class="category_tab has_btn" v-show="searchResultShow">
						<ul role="tablist">
							<li class="on"><a href="#navi11" role="tab" aria-selected="true" @click="setTab('all')">모두보기</a></li>
							<li><a href="#navi12" role="tab" aria-selected="false" @click="setTab('A')">생활문화센터</a></li>
							<li><a href="#navi13" role="tab" aria-selected="false" @click="setTab('B')">문화의집</a></li>
							<li><a href="#navi14" role="tab" aria-selected="false" @click="setTab('C')">미술관</a></li>
							<li><a href="#navi14" role="tab" aria-selected="false" @click="setTab('D')">문예회관</a></li>
						</ul>
						<button type="button" class="btn_fold" aria-expanded="false"><span class="blind">토글 버튼</span></button>
					</div>
					
					<div class="board_box">
						<p class="sum">{{ regionName }} 지역 검색결과 <span class="num">가나다</span>순</p>
						<ul class="cate_list ty_local" v-show="searchResultShow">
							<!-- [D]: 생활문화센터 : .local01, 문화의집 : .local02, 미술관 : .local03, 문예회관 : .local04 -->
							<li v-for="(culture, index) in showList.slice(0, visibleCountArray[tabValue])" :key="index" :class="tabValueMap[culture.tabValue]">
								<a href="javascript:void(0);" class="item" @click.prevent="fn_goPopDetailPage(culture.orgnm, culture.adr, culture.pbcYy)">
									<p class="name">{{culture.orgnm}}</p>
									<p class="text">{{culture.adr}}</p>
								</a>
							</li>
						</ul>

						<!-- empty 케이스 -->
						<div class="no_result" v-show="!isChecked && !searchResultShow">
							<p class="text">현재 관심지역이 미 설정 상태에요.<br>관심지역을 설정해보세요.</p>
						</div>
						<!-- //empty 케이스 -->

						<!-- empty 케이스 2 -->
						<div class="no_result" v-show="showList.length == 0 && searchResultShow">
							<p class="text">검색결과가 없어요.</p>
						</div>
						<!-- //empty 케이스 2 -->

						<!-- 더보기 / 접기 버튼 -->
						<button 
							type="button" 
							class="list_more" 
							:class="{open: isOpen}" 
							v-if="!(!isChecked && !searchResultShow) && showList.length > minVisibleCount" 
							@click.prevent="fn_moreItem"
						>검색결과</button>
					</div>

					<div class="board_box" v-if="popList.length > 0">
						<h2 class="title">{{ regionName }} 인구현황</h2>
						<div class="total_num">
							<span v-if="popList[0].basDt" class="pin purple">{{popList[0].basDt.substring(0, 4) + '.' + popList[0].basDt.substring(4, 6) + '월 통계기준'}}</span>
							<p class="total">총 인구수 <span class="num">{{ nationPopulation.toLocaleString() }}</span>명</p>
							<div class="box">
								<p>남녀비율은 <span class="num">1 : {{ Math.floor(100 * nationNafRto) / 100 }}</span></p>
							</div>
						</div>
						<ul class="cate_list ty_gender">
							<li class="man">
								<p class="name">남성인구</p>
								<p class="text"><span class="num">{{ nationManPopulation.toLocaleString() }}</span>명</p>
							</li>
							<li class="woman">
								<p class="name">여성인구</p>
								<p class="text"><span class="num">{{ nationWomanPopulation.toLocaleString() }}</span>명</p>
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
import FootersV2 from '@/views/layout/FootersV2.vue'
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import commonMixin from '@/common/mixins/commonMixin'
import RGFT4002 from '@/views/page/RG/FT/RGFT4002/RGFT4002' // 관심지역 설정 팝업  
import RGCL4003 from '@/views/page/RG/CL/RGCL4003/RGCL4003' // 지역축제 상세 팝업  
import modalService  from '@/service/modalService'
import LottieAnimation from 'lottie-web-vue'

export default {
    name : "RGCL4001",
	data: () => {
        return {
			mydtCusno : "",
			orgnm : "",
			isChecked : false,
			searchResultShow : false, // 검색시 true
			cultureList : [], // 문화시설 리스트
			showList : [],
			searchCnt: "",
			minVisibleCount: 5,
			visibleCount: 5,
			visibleCountArray : {
				'all' : 5,
				'A' : 5,
				'B' : 5,
				'C' : 5,
				'D' : 5,
			},
			tabValueMap : {
				'A' : 'local01',
				'B' : 'local02',
				'C' : 'local03',
				'D' : 'local04',
			},
			tabValue : "all",
			popList : [], // 인구 수 목록
			useInteRegion : "0", // 관심지역 보기 설정 여부 1(사용), 0(미사용)
			inteRegion : "", // 나의 관심지역 -> api 호출 후 저장 보관
			showRegion : "", // 화면에 보여질 나의 관심지역 -> 토글에 따라 변하는 값
			regionMap: {
				11 : "서울",
				28 : "인천",
				30 : "대전",
				27 : "대구",
				29 : "광주",
				26 : "부산",
				31 : "울산",
				36 : "세종",
				41 : "경기",
				51 : "강원",
				43 : "충북",
				44 : "충남",
				47 : "경북",
				48 : "경남",
				52 : "전북",
				46 : "전남",
				50 : "제주",
			},
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
		getData(){
			this.searchResultCnt = 0;
		
			const config = {
				url: '/rg/cl/01r01',
				data: {
					"orgnm" : this.orgnm,		// 시설 이름
					"ccwC" : this.isChecked ? this.inteRegion : "",   // 관심 지역
				}
			}
			console.log("지역정보 문화시설 조회 getData()===========>", config)
			apiService.call(config).then(response => {
				console.log("지역정보 문화시설 조회 response===========>", response.cultureList)
				this.cultureList = response.cultureList;
				this.showList = this.cultureList;
				this.searchCnt = response.cultureCn;
				if(this.orgnm != "") { // 사용자가 내용을 입력하고 검색한 경우에는
					this.searchResultShow = true; // 관심지역 미지정이어도 검색결과가 보여야함
				}
				this.setTab(this.tabValue);
			});
			this.fn_resetVisibleCount();
			this.$refs.inputBox.blur();
		},
		search() {
			this.getData();
		},
		setTab(tab) {
			this.tabValue = tab;
			if(tab === 'all') {
				this.showList = this.cultureList;
			} else {
				this.showList = this.cultureList.filter(item => item.tabValue === tab);
			}
		},
 		/* 관심지역설정 팝업 */
        fn_goPopPage() {
			let compName = RGFT4002;
			let param    = {};

			const config = {
				component: compName,
				params : param
			};
			modalService.openPopup(config).then(response => {
				if(response == "refresh") {
					this.getInterestRegion();
				}
			});
		},
		fn_regionAlert() {
			if(this.inteRegion == "" && !this.isChecked) { // 관심지역이 없는 경우
				const config = {
					content : ['관심지역을 설정해보세요','(관심지역으로 검색할 수 있어요)'],
					title   : "",
					buttons : [
						{text: "다음에 할게요", class: 'btn btn_grey btn_no'}, // 아니오(취소)
						{text: "설정하기", class: 'btn btn_mint'},            // 예(확인)
					]
				};
				modalService.alert(config).then(text => {
					if(text === "다음에 할게요") {

					} else if(text === "설정하기") {
						this.fn_goPopPage();
					}
				});
			} else if(this.isChecked) {
				this.isChecked = false;
				this.useInteRegion = '0';
				this.showRegion = "";
				this.searchResultShow = false;
				this.clickClear();
				this.getData();
				this.getPopultaion();
				this.setInteRgnInfo("01", "0", "관심지역 설정") // rgnDsc, uYn, Desc
			} else if(!this.isChecked) {
				this.isChecked = true;
				this.useInteRegion = '1';
				this.showRegion = this.inteRegion;
				this.searchResultShow = true;
				this.clickClear();
				this.getData();
				this.getPopultaion();
				this.setInteRgnInfo("01", "1", "관심지역 설정") // rgnDsc, uYn, Desc
			}
			this.visibleCount = 5;
		},
		/* 문화시설 상세 팝업 */
        fn_goPopDetailPage(orgnm, adr, pbcYy) {
			let compName = RGCL4003;
			let param    = {
				"orgnm" : orgnm,
				"adr" : adr,
				"pbcYy" : pbcYy,
				"name" : orgnm,
			};

			const config = {
				component: compName,
				params : param
			};
			modalService.openPopup(config).then(() => {});
		},
		fn_moreItem() {
			console.log("fn_moreItem this.tabValue : ", this.tabValue)
			console.log("fn_moreItem this.showList : ", this.showList)
			if(this.isOpen) {
				this.visibleCountArray[this.tabValue] = 5;
				this.$nextTick(() => {
					const resultsSection = document.querySelector('.local_favorite');
					if(resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth'})
				});
			} else {
				this.visibleCountArray[this.tabValue] += 4;
			}
		},
		/* 나의 관심지역 조회 */
		getInterestRegion() {
			const config = {
				url: 'rg/ft/02r02',
				data: {
					mydtCusno: this.mydtCusno,
					rgnDsc: "01",    // 관심지역 축제 : 01, 지역문화 : 02, 부동산: 03
				}
			};

			apiService.call(config).then(response => {
				console.log("나의 관심지역 조회 response >>> : ", response);
				this.inteRegion = this.changeRegionCode(response.provC);
				
				if(this.inteRegion != "") {
					this.useInteRegion = this.getInteRgnInfo("01"); // 관심지역 사용여부 조회 return 1(사용) or 0
					if(this.useInteRegion === '1') {
						this.isChecked = true;
						this.showRegion = this.inteRegion;
						this.searchResultShow = true;
					} else if(this.useInteRegion === '0') {
						this.isChecked = false;
						this.searchResultShow = false;
						this.showRegion = "";
					}
				}
			}).then(() => {
				this.getData();
				this.getPopultaion();
			});
		},
		/* 관심지역 코드 변환 */
		changeRegionCode(provC) {
			if(!provC) return "";

			// 지역축제(01), 지역문화시설(02)에서 동일한 지역의 코드가 다르기 때문에 변환해줘야함
			// provC -> lwdgC
			const regionCodeMap = {
				"1"  : "11", // 서울
				"2"  : "28", // 인천
				"3"  : "30", // 대전
				"4"  : "27", // 대구
				"5"  : "29", // 광주
				"6"  : "26", // 부산
				"7"  : "31", // 울산
				"8"  : "36", // 세종
				"31" : "41", // 경기
				"32" : "51", // 강원
				"33" : "43", // 충북
				"34" : "44", // 충남
				"35" : "47", // 경북
				"36" : "48", // 경남
				"37" : "52", // 전북
				"38" : "46", // 전남
				"39" : "50"  // 제주
			};
			const trimmedProvC = provC.toString().trim();
			
			return regionCodeMap[trimmedProvC] || trimmedProvC;
		},
		/* 인구 현황 조회 */
		getPopultaion() {
			const config = {
				url : '/rg/ta/01r01',
				data : {
					lwdgC : this.useInteRegion === '1' ? this.inteRegion : "",
				}
			}

			apiService.call(config).then(response => {
				console.log("인구 조회 결과 response : ", response);
				if(response.popList.length > 0) {
					this.popList = response.popList;
				}
			})
		},
		fn_openBrowser() {
			// 외부 브라우저 링크 오픈 
			let url = "http://xn--zb0b89fr6j1ya86wzy3a.xn--3e0b707e/index.htm"

			// 외부 브라우저 링크 오픈 
			// chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
			if(this.getUserInfo('chnl') === '385') { // 스뱅
				appService.executeBrowser(url);
			} else if(this.getUserInfo('chnl') === '386') { // 콕뱅
				appService.cokBankOpenPopupWebBrowser(url);
			}
		},
		/* 지역명에서 은/는 판단 */
		addEunNeun(word) {
			if(!word) return '';

			const lastChar = word[word.length - 1];
			const code = lastChar.charCodeAt(0);
			const isKorean = code >= 0xac00 && 0xd7a3;

			if(!isKorean) {
				return word + '을';
			}

			const jong = (code - 0xac00) % 28;
			const hasFinalConsonant = jong !== 0;

			return hasFinalConsonant ? '을' : '를';
		},
		fn_resetVisibleCount() {
			this.visibleCountArray = {
				'all' : 5,
				'A' : 5,
				'B' : 5,
				'C' : 5,
				'D' : 5,
			};
		},
		/**
		 * 검색 내용 초기화
		 */
		clickClear(){
			this.orgnm = ""
		},
		initComponent() {
			this.mydtCusno = this.getUserInfo('mydtCusno')

			// 나의 관심지역 조회
			this.getInterestRegion();
		},
    },
	computed: {
		nationPopulation() {
			let sum = 0
			this.popList.forEach((item) => {
				sum += item.rzrgPplt
			})
			return sum
		},
		nationManPopulation() {
			let sum = 0
			this.popList.forEach((item) => {
				sum += item.rzrgMppcn
			})
			return sum
		},
		nationWomanPopulation() {
			let sum = 0
			this.popList.forEach((item) => {
				sum += item.rzrgFppcn
			})
			return sum
		},
		nationNafRto() {
			return this.nationWomanPopulation / this.nationManPopulation
		},
		regionName() {
			return this.showRegion == "" ? "전국" : this.regionMap[this.showRegion];
		},
		isOpen() {
			return this.visibleCountArray[this.tabValue] >= this.showList.length;
		},
	},
    components: {
		Page,
        FootersV2,
		LottieAnimation,
	}
}
</script>