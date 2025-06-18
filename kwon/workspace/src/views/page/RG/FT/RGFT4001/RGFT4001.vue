<!--
/*************************************************************************
* @ 서비스경로 : NH 지역정보 >	지역축제 >	현황목록
* @ 페이지설명 : NH지역정보 > 지역축제 > 현황목록
* @ 파일명     : src/views/page/RG/FT/RGFT4001/RGFT4001.vue
* @ 작성자     : CS541601
* @ 작성일     : 2025-02-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-11             CS541601                 신규
*************************************************************************/
-->
<template>
	<div id="wrap" class="sticky-scroll">
		
		<div class="content-view">

			<div id="content">
				
				<section class="local_info festival">
					<!--관심지역 설정-->
					<div class="local_favorite">
						<h2>관심지역 설정</h2>

						<div class="setting">
							<div class="toggle_check" @click.prevent="fn_regionAlert()">
								<input type="checkbox" name="" id="toggle_check_01" v-model="isChecked">
								<label for="toggle_check_01">
									<span class="blind">관심지역</span>
								</label>
							</div>

							<button type="button" class="btn_setting" @click.prevent="fn_goPopPage()"><span class="blind">관심지역설정하기</span></button>
						</div>

						<!--관심지역 셋팅 전-->
						<div v-show="useInteRegion === '0'" class="mylocal">
							<p class="txt">어디에서 축제가<br>열릴까요?</p>
							<p>한국관광공사가 함께합니다.</p>
							<lottie-animation 
								:animationData="require('@/assets_v40/images/lottie/bg_local_festival.json')" 
								ref="anim"
								:loop="true"
								:auto-play="true" 
								aria-hidden="true" 
								class="local_lottie" 
							>
                    		</lottie-animation>
						</div>

						<!--관심지역 셋팅 후-->
						<div v-show="useInteRegion === '1'" class="mylocal after">
							<p class="txt">선택하신 지역은<br><span>{{ regionName }}</span>입니다.</p>
							<p>한국관광공사가 함께합니다.</p>
							<lottie-animation 
								:animationData="require('@/assets_v40/images/lottie/bg_local_festival_after.json')" 
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
						<input type="search" id="local_search_01" class="inputClear" ref="inputBox" name="" v-model="cntzTinm" @keyup.enter="search" placeholder="축제명으로 검색하세요" title="축제명으로 검색하세요">
						<button type="button" class="com_btn_delete" ref="clearBtn" @click.prevent="clickClear()"><span class="blind">삭제</span></button>
						<button type="button" class="btn_search" @click="search"><span class="blind">검색</span></button>
					</div>

					<div class="board_box">
						<p class="sum"><span class="local">{{ regionName }}</span> 지역 검색결과(총 <span class="num">{{this.searchCnt}}</span>개)</p>
						<ul class="thum_list">
							<li  v-for="(festival, index) in resFestivalList.slice(0, visibleCount)" :key="index">
								<a href="javascript:void(0);" class="item" @click.prevent="fn_goPopDetailPage(festival.cntzId, resFestivalList[index])">
									<img :src="festival.otxtImgUrlnm"  @error="emptyImg" alt="" class="img">
									<p class="name">{{festival.cntzTinm}}</p>
									<p class="date">{{festival.evtStDt }} ~ {{festival.evtEdDt}}</p>
									<p class="location">{{festival.adr}}</p>
								</a>
							</li>
						</ul>
						<!-- empty 케이스 -->
						<div class="no_result" v-if="searchCnt == 0">
							<p class="text">검색결과가 없어요.</p>
						</div>
						<!-- //empty 케이스 -->

						<!-- 더보기 / 접기 버튼 -->
						<button 
							type="button" 
							class="list_more" 
							:class="{open: isOpen}"
							@click.prevent="fn_moreItem"
							v-if="searchCnt > minVisibleCount"
						>검색결과</button>
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
import RGFT4002 from '@/views/page/RG/FT/RGFT4002/RGFT4002' // 관심지역설정 팝업  
import RGFT4003 from '@/views/page/RG/FT/RGFT4003/RGFT4003' // 지역축제 상세 팝업  
import modalService  from '@/service/modalService'
import LottieAnimation from 'lottie-web-vue'


export default {
	name : "RGFT4001",
	data: () => {
		return {
				mydtCusno: "", 	// 마이데이터고객번호
				cntzTinm : "",	// 지역축제명
				resFestivalList : [], 
				searchCnt : "",
				isChecked : false,
				minVisibleCount: 4,
				visibleCount: 4,
				inteRegion : "", // 관심지역 시도 코드
				showRegion : "", // 화면에 보여질 나의 관심지역 -> 토글에 따라 변하는 값
				useInteRegion : "", // 관심지역 사용 여부 1:여, 0:부
				regionMap: {
					1: "서울",
					2: "인천",
					3: "대전",
					4: "대구",
					5: "광주",
					6: "부산",
					7: "울산",
					8: "세종",
					31: "경기",
					32: "강원",
					33: "충북",
					34: "충남",
					35: "경북",
					36: "경남",
					37: "전북",
					38: "전남",
					39: "제주",
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
	computed :{
		regionName() {
			return this.showRegion == "" ? "전국" : this.regionMap[this.showRegion]
		},
		isOpen() {
			return this.visibleCount >= this.searchCnt;
		},
	},
	methods: {
		getData(){
			const config = {
				url: '/rg/ft/01r01',
				data: {
					"mydtCusno" : this.mydtCusno,
					"cntzTinm" : this.cntzTinm,	// 지역축제명
					"rgnDsc" : this.useInteRegion === '1' ? "01" : "", // 관심지역 사용 여부
				}
			}
			console.log("getData()===========>", config)
			apiService.call(config).then(response => {
				console.log("지역정보 조회 response >>> : ", response)
				
				this.resFestivalList = response.festivalList
				this.searchCnt = response.festivalCn

				this.resFestivalList = this.resFestivalList.map(item=>({
					...item,
					name : item.cntzTinm,
					lttdCrdnVal : item.gpsYcdnNo,
					lgtdCrdnVal : item.gpsXcdnNo,
					evtStDt : this.formatDateSt(item.evtStDt),
					evtEdDt : this.formatDateSt(item.evtEdDt),
					otxtImgUrlnm : item.otxtImgUrlnm ? item.otxtImgUrlnm : "",
				}))
			})
			this.visibleCount = 4;
			this.$refs.inputBox.blur();
		},
		search() {
			this.getData();
		},
		formatDateSt(resSt){
			const resData = `${resSt.substring(0,4)}.${resSt.substring(4,6) }.${resSt.substring(6,8)}`
			return resData;
		},
		/* 관심지역설정 팝업 */
		fn_goPopPage() {
			let compName = RGFT4002;
			let param    = {};

			const config = {
				component: compName,
				params : param
			}
			modalService.openPopup(config).then(response => {
				if(response == "refresh") {
					this.getInterestRegion();
				}
			});
		},
		/* 관심지역 설정 alert */
		fn_regionAlert() {
			if(this.inteRegion == "" && !this.isChecked) { // 관심지역 미지정인 경우
				const config = {
					content : ['관심지역을 설정해보세요','(관심지역으로 검색할 수 있어요)'],
					title   : "",
					buttons : [
						{text: "다음에 할게요", class: 'btns lg'},		// 아니오(취소)
						{text: "설정하기", class: 'btns lg primary'},	// 예(확인)
					]
				};
				modalService.alert(config).then(text => {
					if(text === "다음에 할게요") {

					} else if(text === "설정하기") {
						this.fn_goPopPage();
					}
				})
			} else if(this.isChecked) {
				this.isChecked = false;
				this.useInteRegion = '0';
				this.showRegion = "";
				this.clickClear();
				this.getData();
				this.setInteRgnInfo("01", "0", "관심지역 설정") // rgnDsc, uYn, Desc
			} else if(!this.isChecked) {
				this.isChecked = true;
				this.useInteRegion = '1';
				this.showRegion = this.inteRegion;
				this.clickClear();
				this.getData();
				this.setInteRgnInfo("01", "1", "관심지역 설정") // rgnDsc, uYn, Desc
			}
			this.visibleCount = 4;
		},
		/* 지역상세 팝업 */
		fn_goPopDetailPage(festivalCntzId, resFestivalList) {
			let compName = RGFT4003
			let param    = {
					festivalCntzId : festivalCntzId,
					resFestivalList : resFestivalList
				}

			const config = {
				component: compName,
				params : param
			}
			modalService.openPopup(config).then(() => {})
		},
		/* 나의 관심지역 조회 */
		getInterestRegion() {
			const config = {
				url: 'rg/ft/02r02',
				data: {
					mydtCusno: this.getUserInfo("mydtCusno"),
					rgnDsc: "01",    // 관심지역 축제 : 01, 지역문화 : 02, 부동산: 03
				}
			}

			apiService.call(config).then(response => {
				console.log("나의 관심지역 조회 response >>> : ", response);
				if(response.provC) {
					this.inteRegion = response.provC.toString().trim();
				}
				
				if(this.inteRegion != "") {
					this.useInteRegion = this.getInteRgnInfo("01");
					if(this.useInteRegion === '1') {
						this.isChecked = true;
						this.showRegion = this.inteRegion;
					} else if(this.useInteRegion === '0') {
						this.isChecked = false;
						this.showRegion = "";
					}
				}
			}).then(() => {
				this.getData();
			})
		},
		fn_moreItem() {
			if(this.isOpen) {
				this.visibleCount = 4;
				this.$nextTick(() => {
					const resultsSection = document.querySelector('.local_favorite');
					if(resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth'});
				});
			} else {
				this.visibleCount += 4;
			}
		},
		// 새로 고침
		fn_refresh(){
			this.initComponent()
		},
		initComponent() {
			this.mydtCusno = this.getUserInfo('mydtCusno');
			
			// 관심지역 설정 여부 조회
			this.useInteRegion = this.getInteRgnInfo("01"); // 지역구분코드 01 : 지역축제
			this.isChecked = this.useInteRegion == "1" ? true : false;

			// 나의 관심지역 조회
			this.getInterestRegion();
		},
		/**
		 * 검색 내용 초기화
		 */
		clickClear(){
			this.cntzTinm = "";
			this.$refs.clearBtn.classList.remove('btnDeleteShow');
		},
		emptyImg(e) {
			e.target.src = new URL("@/assets_v40/images/img/img_festival_empty.png", import.meta.url).href            
		},
	},
	created() {
			
	},
	components : {
		Page,
		FootersV2,
		LottieAnimation,
	}
}
</script>