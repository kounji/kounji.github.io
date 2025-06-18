<!--
/*************************************************************************
* @ 서비스경로 : NH지역정보 > 서브메인
* @ 페이지설명 : NH지역정보 > 서브메인
* @ 파일명     : src/views/page/RG/TA/RGTA4001/RGTA4001.vue
* @ 작성자     : CS541601
* @ 작성일     : 2025-02-07
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-07             CS541601                 신규
*************************************************************************/
-->
<template>
<div id="wrap" class="sticky-scroll">

		
		<div class="content-view">
			<div id="content">
				<section class="local_main">
					<!--배너-->
					<cmm-flot-banner bnnrExpsDsVal="45"/>

					<!--관심지역 설정-->
					<div class="local_favorite">
						<h2>관심지역 설정</h2>

						<div class="setting">
							<div class="toggle_check">
								<input type="checkbox"  name="" id="toggle_check_01" v-model="isIntAreaChecked" @click="fn_openRecommandPop">
								<label for="toggle_check_01">
									<span class="blind">관심지역</span>
								</label>
							</div>

							<button type="button" class="btn_setting" @click="moveSetIntRegion()"><span class="blind">관심지역설정하기</span></button>
						</div>

						<!--셋팅전 isIntAreaChecked === false && myIntArea === null -->
						<div class="mylocal" v-show="isIntAreaChecked === false">
							<p class="txt">관심지역을<br>설정해보시겠어요?</p>
							<p>축제와 문화시설을 보실 수 있어요.</p>
							<!--<lottie-player src="../../../../src/assets_v40/images/lottie/bg_local_main.json"  loop autoplay aria-hidden="true" class="local_lottie" ></lottie-player> -->
							
							<lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_local_main.json')" 
                                         ref="anim"
                                         :loop="true"
                                         :auto-play="true" 
                                         aria-hidden="true" 
                                         class="local_lottie" 
                                         >
                    		</lottie-animation> 
						</div>
						<!--//셋팅전-->

						<!--셋팅후 isIntAreaChecked === true && myIntArea !== null -->
						<div class="mylocal after" v-show="isIntAreaChecked === true && inteRgnC !== '0'" @click="moveSetIntRegion()">
							<p class="txt"><span>{{ getUserInfo("cusnm") }}</span>님의<br>관심지역은 <em>{{ curRgnName }}</em>입니다.</p>
							<p>축제와 문화시설을 보실 수 있어요.</p>
							

							<!-- <lottie-player src="../../../../src/assets_v40/images/lottie/bg_local_main_after.json"  loop autoplay aria-hidden="true" class="local_lottie" ></lottie-player> -->
							<lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_local_main_after.json')" 
                                         ref="anim"
                                         :loop="true"
                                         :auto-play="true" 
                                         aria-hidden="true" 
                                         class="local_lottie"
                                         >
                    		</lottie-animation>
						</div>
						<!--//셋팅후-->
					</div>

					<!--축제정보-->
					<div class="festival" v-show="isIntAreaChecked == false && nationFestivalList.length > 0" :key="10000 + refKey">
						<div class="board_box">
							<h2><a href="javascript:void(0);" class="title" @click.prevent="movePage('RGFT4001')">전국 축제정보</a></h2>

							<div class="thum_list">
								
								<a href="javascript:void(0);" class="item" v-for="(item, index) in nationFestivalList" :key="index" @click.prevent="moveFestivalDetail(item)">
									<!--
									<img v-show="item.onLoading == true" :src="require('@/assets_v40/images/img/img_festival_02.png')" alt="" class="img">
									<img v-show="item.onLoading == false" :src="item.otxtImgUrlnm" alt="" class="img" @load="(e) => item.onLoading = false" @error="e => e.target.src = require('@/assets_v40/images/img/img_festival_02.png')">
									-->
									<img :src="getImage(item.otxtImgUrlnm)" @error="emptyImg" alt="" class="img">
									<p class="name">{{ item.cntzTinm }}</p>
									<p class="location">{{ item.adr.split(" ")[0] + ' ' + item.adr.split(" ")[1] }}</p>
								</a>

							</div>
						</div>
					</div>

					<div class="festival" v-show="isIntAreaChecked == true && regionFestivalList.length > 0" :key="1000000 + refKey">
						<div class="board_box">
							<h2><a href="javascript:void(0);" class="title" @click.prevent="movePage('RGFT4001')">{{ curRgnName }}의 축제정보</a></h2>

							<div class="thum_list">
								
								<a href="javascript:void(0);" class="item" v-for="(item, index) in regionFestivalList" :key="index" @click.prevent="moveFestivalDetail(item)">
									<!--
									<img v-show="item.onLoading == true" :src="require('@/assets_v40/images/img/img_festival_02.png')" alt="" class="img">
									<img v-show="item.onLoading == false" :src="item.otxtImgUrlnm" alt="" class="img" @load="(e) => item.onLoading = false" @error="e => e.target.src = require('@/assets_v40/images/img/img_festival_02.png')">
									-->
									<img :src="getImage(item.otxtImgUrlnm)" @error="emptyImg" alt="" class="img">

									<p class="name">{{ item.cntzTinm }}</p>
									<p class="location">{{ item.adr.split(" ")[0] + ' ' + item.adr.split(" ")[1] }}</p>
								</a>

							</div>
						</div>
					</div>

					

					<!--문화시설정보-->
					<div class="board_box" v-if="isIntAreaChecked == true && inteRgnC !== '0' && regionCultureList.length > 0">
						<h2 v-if="isIntAreaChecked == true && inteRgnC !== '0'"><a href="javascript:void(0);" class="title" @click.prevent="movePage('RGCL4001')">{{ curRgnName }}의 문화시설 정보</a></h2>
						<h2 v-else><a href="javascript:void(0);" class="title" @click.prevent="movePage('RGCL4001')">전국 문화시설 정보</a></h2>
						<ul class="cate_list ty_local">
							<!-- [D]: 생활문화센터 : .local01, 문화의집 : .local02, 미술관 : .local03, 문예회관 : .local04 -->
							<li v-for="(item, index) in regionCultureList" :key="index" :class="tabValueMap[item.tabValue]" @click.prevent="moveCultureDetail(item)">
								<a href="javascript:void(0);" class="item">
									<p class="name">{{ item.orgnm }}</p>
									<p class="text">{{ item.adr }}</p>
								</a>
							</li>
						</ul>
					</div>

					<div class="board_box" v-if="isIntAreaChecked == false && nationCultureList.length > 0">
						<h2 v-if="isIntAreaChecked == true && inteRgnC !== '0'"><a href="javascript:void(0);" class="title" @click.prevent="movePage('RGCL4001')">{{ curRgnName }}의 문화시설 정보</a></h2>
						<h2 v-else><a href="javascript:void(0);" class="title" @click.prevent="movePage('RGCL4001')">전국 문화시설 정보</a></h2>
						<ul class="cate_list ty_local">
							<!-- [D]: 생활문화센터 : .local01, 문화의집 : .local02, 미술관 : .local03, 문예회관 : .local04 -->
							<li v-for="(item, index) in nationCultureList" :key="index" :class="tabValueMap[item.tabValue]" @click.prevent="moveCultureDetail(item)">
								<a href="javascript:void(0);" class="item">
									<p class="name">{{ item.orgnm }}</p>
									<p class="text">{{ item.adr }}</p>
								</a>
							</li>
						</ul>
					</div>

					<!--인구현황-->
					<div class="board_box" v-if="isIntAreaChecked == false && popList.length > 0">
						<h2 class="title">전국 인구현황</h2>

						<div class="total_num">
							<span class="pin purple">{{popList[0].basDt.substring(0, 4) + '.' + popList[0].basDt.substring(4, 6) + '월 통계기준'}}</span>
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

					<div class="board_box" v-if="isIntAreaChecked == true && popList.length > 0">
						<h2 class="title">{{ curRgnName }}의 인구현황</h2>

						<div class="total_num" v-if="popList.length > 0">
							<span class="pin purple">{{popList[0].basDt.substring(0, 4) + '.' + popList[0].basDt.substring(4, 6) + '월 통계기준'}}</span>
							<p class="total">총 인구수 <span class="num">{{ regionPopulation.toLocaleString() }}</span>명</p>
							<div class="box">
								<p>남녀비율은 <span class="num">1 : {{ Math.floor(100 * regionNafRto) / 100 }}</span></p>
							</div>
						</div>
						<ul class="cate_list ty_gender">
							<li class="man">
								<p class="name">남성인구</p>
								<p class="text"><span class="num">{{ regionManPopulation.toLocaleString() }}</span>명</p>
							</li>
							<li class="woman">
								<p class="name">여성인구</p>
								<p class="text"><span class="num">{{ regionWomanPopulation.toLocaleString() }}</span>명</p>
							</li>
						</ul>
					</div>

					<!--여러가지 안내-->
					<div class="various">
						<a href="javascript:void(0);" class="board_box" @click.prevent="movePage('RGBM4001')">국토종주를 위한<br>자전거 안내</a>

						<a href="https://www.farmstay.co.kr/search" target="_blank"><img src="@/assets_v40/images/banner/img_banner_farmstay.png" alt="팜스테이 농촌체험여행" @click.prevent="fn_openBrowser" /></a>
						<a href="javascript:void(0);"><img src="@/assets_v40/images/banner/img_banner_farmlive.png" alt="귀농귀촌 성공적인 농촌정착" @click.prevent="movePage('SZFC4101')" /></a>
						<a href="javascript:void(0);"><img src="@/assets_v40/images/banner/img_banner_myfarm.png" alt="마이농가 내 농가 운영관리" @click.prevent="movePage('ANFM4001')" /></a>
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
import appService from '@/service/appService'
import CmmFlotBanner from '@/components/CmmFlotBanner.vue'
import commonService from '@/service/commonService'
import routerService from '@/service/routerService'
import modalService  from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import LottieAnimation from 'lottie-web-vue'
import RGCL4003 from '@/views/page/RG/CL/RGCL4003/RGCL4003'
import RGFT4002 from '@/views/page/RG/FT/RGFT4002/RGFT4002'
import RGFT4003 from '@/views/page/RG/FT/RGFT4003/RGFT4003'



export default {
        name : "RGTA4001",
        data: () => {
			return {
            	nationFestivalList: [],
				nationCultureList: [],
				regionFestivalList: [],
				regionCultureList: [],
				tabValueMap: {},
				isIntAreaChecked: false,
				myIntArea: null,
				bannerShow: true,
				popList: [],
				festRgnCodeMap: new Map(),
				cultureRgnCodeMap: new Map(),
				searchRgnCodeMap: new Map(),
				inteRgnC: '1',
				refKey: 0,
			}
        },
        mounted() {

			console.log('관심지역 설정')
			//this.setInteRgnInfo('01', '1')
			console.log('사용여부')
			//console.log(this.getInteRgnInfo("01"))

			this.initComponent()
			
			const apiConfig = {
					method : 'post',
                	url : '/rg/ta/01r01',
                	data : {
                    	lwdgProvnm: ''
                	}
            	}	
 
            apiService.call(apiConfig).then(response => {
				if (!!response.popList) {
					this.popList = response.popList
				}
            })

        	//PFM로그 처리 화면접속이력 등록 POST
        	apiService.pfmLogSend(this.$options.name)
    	},
		mixins: [
        	commonMixin,
			popupMixin
    	],
        created() {
		
        },
		
		computed: {
			curRgnName() {
				return this.festRgnCodeMap.get(this.inteRgnC.trim()) 
			},
			nationPopulation() {
				let sum = 0

				if (!this.popList) {
					return 0
				}

				this.popList.forEach((item) => {
					sum += item.rzrgPplt
				})

				return sum
			},

			nationManPopulation() {
				let sum = 0

				if (!this.popList) {
					return 0
				}

				this.popList.forEach((item) => {
					sum += item.rzrgMppcn
				})

				return sum
			},

			nationWomanPopulation() {
				let sum = 0

				if (!this.popList) {
					return 0
				}

				this.popList.forEach((item) => {
					sum += item.rzrgFppcn
				})

				return sum
			},

			nationNafRto() {
				if (!this.popList) {
					return 0
				}
				return this.nationWomanPopulation / this.nationManPopulation
			},

			regionPopulation() {
				let cond = this.searchRgnCodeMap.get(this.inteRgnC.trim())

				if (!this.popList) {
					return 0
				}

				let item = this.popList.find((item) => item.lwdgProvnm.indexOf(cond) != -1)

				return item.rzrgPplt
			},

			regionManPopulation() {
				if (!this.popList) {
					return 0
				}

				let cond = this.searchRgnCodeMap.get(this.inteRgnC.trim())

				let item = this.popList.find((item) => item.lwdgProvnm.indexOf(cond) != -1)

				return item.rzrgMppcn
			},

			regionWomanPopulation() {

				if (!this.popList) {
					return 0
				}

				let cond = this.searchRgnCodeMap.get(this.inteRgnC.trim())

				let item = this.popList.find((item) => item.lwdgProvnm.indexOf(cond) != -1)

				return item.rzrgFppcn
			},

			regionNafRto() {
				if (!this.popList) {
					return 0
				}
				return this.regionWomanPopulation / this.regionManPopulation
			}
		},

		methods: {
			
			initComponent() {

				this.festRgnCodeMap = new Map()

				this.festRgnCodeMap.set("0", "서울")
				this.festRgnCodeMap.set("1", "서울")
				this.festRgnCodeMap.set("2", "인천")
				this.festRgnCodeMap.set("3", "대전")
				this.festRgnCodeMap.set("4", "대구")
				this.festRgnCodeMap.set("5", "광주")
				this.festRgnCodeMap.set("6", "부산")
				this.festRgnCodeMap.set("7", "울산")
				this.festRgnCodeMap.set("8", "세종")
				this.festRgnCodeMap.set("31", "경기")
				this.festRgnCodeMap.set("32", "강원")
				this.festRgnCodeMap.set("33", "충북")
				this.festRgnCodeMap.set("34", "충남")
				this.festRgnCodeMap.set("35", "경북")
				this.festRgnCodeMap.set("36", "경남")
				this.festRgnCodeMap.set("37", "전북")
				this.festRgnCodeMap.set("38", "전남")
				this.festRgnCodeMap.set("39", "제주")

				this.searchRgnCodeMap = new Map()

				this.searchRgnCodeMap.set("0", "서울")
				this.searchRgnCodeMap.set("1", "서울")
				this.searchRgnCodeMap.set("2", "인천")
				this.searchRgnCodeMap.set("3", "대전")
				this.searchRgnCodeMap.set("4", "대구")
				this.searchRgnCodeMap.set("5", "광주")
				this.searchRgnCodeMap.set("6", "부산")
				this.searchRgnCodeMap.set("7", "울산")
				this.searchRgnCodeMap.set("8", "세종")
				this.searchRgnCodeMap.set("31", "경기")
				this.searchRgnCodeMap.set("32", "강원")
				this.searchRgnCodeMap.set("33", "충청북도")
				this.searchRgnCodeMap.set("34", "충청남도")
				this.searchRgnCodeMap.set("35", "경상북도")
				this.searchRgnCodeMap.set("36", "경상남도")
				this.searchRgnCodeMap.set("37", "전북")
				this.searchRgnCodeMap.set("38", "전라남도")
				this.searchRgnCodeMap.set("39", "제주")

				this.cultureRgnCodeMap = new Map()

				this.cultureRgnCodeMap.set('서울', '11')
				this.cultureRgnCodeMap.set('인천', '28')
				this.cultureRgnCodeMap.set('대전', '30')
				this.cultureRgnCodeMap.set('대구', '27')
				this.cultureRgnCodeMap.set('광주', '29')
				this.cultureRgnCodeMap.set('부산', '26')
				this.cultureRgnCodeMap.set('울산', '31')
				this.cultureRgnCodeMap.set('세종', '36')
				this.cultureRgnCodeMap.set('경기', '41')
				this.cultureRgnCodeMap.set('강원', '51')
				this.cultureRgnCodeMap.set('충북', '43')
				this.cultureRgnCodeMap.set('충남', '44')
				this.cultureRgnCodeMap.set('경북', '47')
				this.cultureRgnCodeMap.set('경남', '48')
				this.cultureRgnCodeMap.set('전북', '52')
				this.cultureRgnCodeMap.set('전남', '46')
				this.cultureRgnCodeMap.set('제주', '50')
				/*
						tabValue:
						<!-- [D]: 생활문화센터 : .local01, 문화의집 : .local02, 미술관 : .local03, 문예회관 : .local04 -->
							A -> 생활문화센터
							B -> 문화의집
							C -> 문예회관
							D -> 미술관
				*/

			

				this.tabValueMap = new Map()

				this.tabValueMap.set('A', 'local01')
				this.tabValueMap.set('B', 'local02')
				this.tabValueMap.set('C', 'local04')
				this.tabValueMap.set('D', 'local03')


				const rgnSet = this.getInteRgnInfo("01")
				console.log('rgnSet')
				console.log(rgnSet)

				if (rgnSet == '1') {
					this.isIntAreaChecked = true
				} else {
					this.updateFestivalList(false)
					this.updateCultureList(false)
					this.isIntAreaChecked = false
				}




			},

			updateFestivalList(inteMode) {
				this.refKey += 1

				if (inteMode) {
					const apiConfig = {
						method : 'post',
                		url : '/rg/ft/01r01',
                		data : {
							mydtCusno: this.getUserInfo('mydtCusno'),
							rgnDsc: '01',
                    		cntzTinm: '',
							adr: '',
                		}
            		}	
	
    	        	apiService.call(apiConfig).then(response => {
						
						if (!!response.festivalList) {
							var choose = Math.floor(Math.random() * response.festivalList.length) - 10
						
							if (choose < 0) {
								choose = 0
							}

							this.regionFestivalList = response.festivalList.map(item => ({
								...item,
								otxtImgUrlnm : item.otxtImgUrlnm ? item.otxtImgUrlnm : "",
							}))

							this.regionFestivalList = response.festivalList.slice(choose, choose + 10)	
						
							this.regionFestivalList.forEach((item) => item.onLoading = true)
						}

					
					}).then(() => {
						this.$nextTick(() => {
							this.slick()
						})
					})
				} else {
					const apiConfig = {
						method : 'post',
                		url : '/rg/ft/01r01',
                		data : {
                    		cntzTinm: '',
							adr: '',
                		}
            		}	
	
    	        	apiService.call(apiConfig).then(response => {
					
						if (!!response.festivalList) {
							var choose = Math.floor(Math.random() * response.festivalList.length) - 10
						
							if (choose < 0) {
								choose = 0
							}

							this.nationFestivalList = response.festivalList.map(item => ({
								...item,
								otxtImgUrlnm : item.otxtImgUrlnm ? item.otxtImgUrlnm : "",
							}))

							this.nationFestivalList = response.festivalList.slice(choose, choose + 10)	
						
							this.nationFestivalList.forEach((item) => item.onLoading = true)
						}

					
					}).then(() => {
						this.$nextTick(() => {
							this.slick()
						})
					})

				}
			},

			updateCultureList(inteMode) {
				if (inteMode) {
					const apiConfig2 = {
						method : 'post',
                		url : '/rg/cl/01r01',
                		data : {
                    		orgnm: null,
							tabValue: null,
							pageCnt: null,
							adr: null,
							ccwC: this.cultureRgnCodeMap.get(this.festRgnCodeMap.get(this.inteRgnC)),
                		}
            		}

					apiService.call(apiConfig2).then(response => {
					
						if (!!response.cultureList) {
							let choose = Math.floor(Math.random() * response.cultureList.length) - 2
						
							if (choose < 0) {
								choose = 0
							}

							response.cultureList.sort(() => Math.random() - 0.5)
							this.regionCultureList = response.cultureList.slice(choose, choose + 2)
							console.log(this.regionCultureList)
						}
	
					})
				} else {
					const apiConfig2 = {
						method : 'post',
                		url : '/rg/cl/01r01',
                		data : {
                    		orgnm: null,
							tabValue: null,
							pageCnt: null,
							adr: null,
							ccwC: '',
                		}
            		}

					apiService.call(apiConfig2).then(response => {
					
						if (!!response.cultureList) {
							let choose = Math.floor(Math.random() * response.cultureList.length) - 2
						
							if (choose < 0) {
								choose = 0
							}

							response.cultureList.sort(() => Math.random() - 0.5)
							this.nationCultureList = response.cultureList.slice(choose, choose + 2)
							console.log(this.nationCultureList)
						}
					})
				}
			},


			slick() {
				var $outline =  $('.festival .thum_list');
						
				$outline.not('.slick-initialized').slick({
						lazyLoad: 'ondemand',
						infinite: true,
						slidesToShow: 2,
						slidesToScroll: 2,
						speed: 300,
						arrows:false,
						dots:true,
						centerPadding: '40px',
				});

				$outline.on('afterChange', function(event, slick, currentSlide) {
					$('img').on('error', function() {
						$(this).attr('src', new URL("@/assets_v40/images/img/img_festival_empty.png", import.meta.url).href)
					})
				})

				this.$nextTick(() => {
					$outline.slick("refresh")
				})
				
			},

			movePage(value) {

				const menu = {
                        name: value,
                        params: {}
                }
                commonService.movePage(menu)
			},

			fn_openBrowser() {
                // 외부 브라우저 링크 오픈 
                let url = "https://www.farmstay.co.kr/search"

                // 외부 브라우저 링크 오픈 
                // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
                if(this.getUserInfo('chnl') === '385') {
                    // 스뱅
                    appService.executeBrowser(url)
                } else {
                    // 콕뱅
                    appService.cokBankOpenPopupWebBrowser(url)
                }
            },

			getImage(value) {
				if (!!value) {
					return value
				} else {
					return new URL("@/assets_v40/images/img/img_festival_empty.png", import.meta.url).href
				}
			},

			fn_openRecommandPop() {
			},

			moveFestivalDetail(p) {
				
				let pa = { ...p }
				pa.evtStDt = this.formatDateSt(pa.evtStDt)
				pa.evtEdDt = this.formatDateSt(pa.evtEdDt)
				pa.name = pa.cntzTinm
				pa.lttdCrdnVal = pa.gpsYcdnNo
				pa.lgtdCrdnVal = pa.gpsXcdnNo

				let compName = RGFT4003
				let param    = {
					festivalCntzId: pa.cntzId,
					resFestivalList: pa,
				};

				const config = {
					component: compName,
					params: param
				}

				modalService.openPopup(config).then(() => {})
			},

			moveCultureDetail(p) {
				let compName = RGCL4003

				console.log('문화시설파라메터')
				console.log(p)
				let param    = {
					"orgnm" : p.orgnm,
					"adr" : p.adr,
					"pbcYy" : p.pbcYy,
					"name" : p.orgnm,
					"lttdCrdnVal" : p.gpsYcdnNo,
					"lgtdCrdnVal" : p.gpsXcdnNo,
				}

				console.log('상세 param')
				console.log(param)

				const config = {
					component: compName,
					params : param
				}

				modalService.openPopup(config).then(() => {})
			},

			moveSetIntRegion() {
				let compName = RGFT4002
				let param    = {}

				const config = {
					component: compName,
					params : param
				}

				modalService.openPopup(config).then((response) => {

					if (response == 'refresh') {
						const apiConfig = {
							method : 'post',
                			url : '/rg/ft/02r02',
                			data : {
								mydtCusno: this.getUserInfo('mydtCusno'),
                    			rgnDsc: '01',
                			}
						}

						apiService.call(apiConfig).then(response => {
							console.log('response.provC')
							console.log(response.provC)

							if (!!response.provC) {
								console.log('response.provC 존재')
								this.isIntAreaChecked = true
								this.inteRgnC = response.provC.trim()
								this.updateFestivalList(true)
								this.updateCultureList(true)
							}
						})
					}

				})
			},

			offBanner() {
				this.bannerShow = false
			},

			formatDateSt(resSt){
				
					const resData = `${resSt.substring(0,4)}.${resSt.substring(4,6) }.${resSt.substring(6,8)}`
					return resData
			},
			
			emptyImg(e) {
				e.target.src = new URL("@/assets_v40/images/img/img_festival_empty.png", import.meta.url).href            
			},
		},

		watch: {
			'isIntAreaChecked': {
				handler(value, oldValue) {
					console.log(value)

					

					if (value == true) {
						
						this.setInteRgnInfo('01', '1')
					
						const apiConfig = {
						method : 'post',
                		url : '/rg/ft/02r02',
                		data : {
								mydtCusno: this.getUserInfo('mydtCusno'),
                    			rgnDsc: '01',
                			}
            			}

						apiService.call(apiConfig).then(response => {
							console.log('response.provC')
							console.log(response.provC)

							if (!!response.provC) {
								console.log('response.provC 존재')
								this.inteRgnC = response.provC.trim()
								this.updateFestivalList(true)
								this.updateCultureList(true)
								console.log('this.inteRgnC')
								console.log(String(this.inteRgnC))
								console.log('festRgnCodeMap[String(this.intRgnC)]')
								console.log(this.festRgnCodeMap.get(this.inteRgnC))
							} else {
								const configYn = {
                    			content: ['관심지역을 설정해보세요<br>(관심지역으로 검색할 수 있어요)'],
                    			title  : "",
                    			// 예-아니요 순서 변경을 위해 아래 내용 추가
                    			buttons: [
                        				{text: "다음에 할게요", class: 'btn btn_grey'}, // 아니오(취소)
                        				{text: "설정하기", class: 'btn btn_mint'},            // 예(확인)
                    				]
								}
				
                				modalService.alert(configYn).then(text => {
									if (text === '설정하기') {
										let compName = RGFT4002
										let param    = {}

										const config = {
											component: compName,
											params : param
										}

										modalService.openPopup(config).then((response) => {
											const apiConfig = {
												method : 'post',
                								url : '/rg/ft/02r02',
                								data : {
													mydtCusno: this.getUserInfo('mydtCusno'),
                    								rgnDsc: '01',
                								}
            								}

											apiService.call(apiConfig).then(response => {
												if (!!response.provC) {
													this.inteRgnC = response.provC.trim()
													this.updateFestivalList(true)
													this.updateCultureList(true)
												} else {
													this.isIntAreaChecked = false
													this.setInteRgnInfo('01', '0')
												}
											})
											//관심지역 설정 여부에 따라 스위치 ON/OFF 결정
											console.log('끝')
										})
									} else if (text === '다음에 할게요') {
										this.isIntAreaChecked = false
										this.setInteRgnInfo('01', '0')
									}
                    			})
								
							}
	
						})
					} else {
						this.inteRgnC = '0'
						this.setInteRgnInfo('01', '0')
						this.updateFestivalList(false)
						this.updateCultureList(false)

						
						this.$nextTick(() => {
							this.slick()
						})
					}
				},
			},
		},

        components : {
            Page,
            FootersV2,
			LottieAnimation,
			CmmFlotBanner,
        }
    }

</script>