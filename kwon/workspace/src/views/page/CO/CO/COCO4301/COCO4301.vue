<!--
/*************************************************************************
* @ 서비스경로 : 홈 > 통합검색
* @ 페이지설명 : 홈 > 통합검색
* @ 파일명     : src/views/page/CO/CO/COCO4301/COCO4301.vue
* @ 작성자     : CS541817
* @ 작성일     : 2025-03-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-06              CS541817              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">

		<div class="popup_header">
			<h1>검색</h1>
		</div>

		<div class="popup_content">

			<div class="search_all flex_cont">
				<div class="search_input">
					<div class="search">
						<label for="search_01"></label>
						<input type="search" id="search_01" class="inputClear" name="" value="" v-model="searchText" placeholder="검색어를 입력하세요." title="검색어를 입력하세요.">
						<button type="button" class="com_btn_delete" :class="showClassCntr"  @click.prevent="fn_remove()"><span class="blind">삭제</span></button>
						<button type="button" class="btn_search" @click.prevent="fn_search()"><span class="blind">검색</span></button>
					</div>
					<button type="button" class="btn_mike" @click.prevent="fn_voiceSearch()"><span class="blind">음성검색</span></button> <!--[v4.0] 2025-02-18 문구 삭제 -->
				</div>

				<div class="scroller" v-if="!isSearching">
					<div class="search_word">
						<p class="h_tit01">인기 검색어</p>
						<ul>
							<li v-for="item in tagList" :key="item">
								<a href="#nolink" class="item" @click.prevent="fn_tagSearch(item)">{{item}}</a>
							</li>
						</ul>
					</div>
					
					<div class="service">
						<div class="tit_group">
							<p class="h_tit01">나의 관심서비스</p>
							<button type="button" class="btn_add" @click.prevent="fn_openPopup('COCO4351')">관심서비스 담기</button>
							
						</div>
						<div class="board_box">

							<ul class="attention_list" v-if="inteList.length &gt; 0">
								<li v-for="inte in inteList" :key="inte.psAmnScid" :class="inte.menuId"><a href="#nolink" @click.prevent="fnOpenPopYn(inte.psAmnScid,inte.scrnDsc)">{{inte.psAmnScrnm}}</a></li>
							</ul>
                            <!--등록된 관심서비스가 없을 경우-->
							<p class="h_tit01" v-else>나의 관심서비스로<br>담아 놓고<br>빠르게 이동하세요.</p>
						</div>
					</div>
				</div>
				
				<div class="scroller" v-else>
					<!-- 검색 결과 -->
					<div class="search_result" v-if="searchList.length > 0">
						<p class="h_tit01">메뉴 <span class="primary">{{ searchList.length }}</span></p>
						<ul>
							<li v-for="item in searchList" :key="item.psAmnScid">
								<a href="#nolink" class="item" @click.prevent="fnOpenPopYn(item.psAmnScid, item.scrnDsc)"> {{item.frontText}}<strong>{{item.searchText}}</strong>{{item.backText}}</a>
							</li>
						</ul>
					</div>

					<!-- 결과 없음 -->
					<div class="no_result" v-else> 
						<p class="text">검색 결과가 없습니다.</p>
						<!-- [v4.0] 배경이미지 로티json으로 변경 -->
						<div class="bg">
							<lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_no_result.json')" 
											ref="anim"
											:speed="1"
											:loop="true"
											:auto-play="true" 
											aria-hidden="true" 
											class="bg_no_result" 
											background = "transparent"
											>
							</lottie-animation>
							<!-- <lottie-player src="../../../../src/assets_v40/images/lottie/bg_no_result.json" loop="" autoplay="" aria-hidden="true" class="bg_no_result" background="transparent"></lottie-player> -->
						</div>
						<!-- //[v4.0] 배경이미지 로티json으로 변경 -->
					</div>
					<!-- //검색 결과 -->
				</div>	

			</div>

		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>

	import modalService from '@/service/modalService'
	import apiService from '@/service/apiService' 
	import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
	import commonService from '@/service/commonService'

	import COCO4351 from '@/views/page/CO/CO/COCO4351/COCO4351' // 나의 관심서비스
	import COCO4303 from '@/views/page/CO/CO/COCO4303/COCO4303' // 음성검색
	import COCO4304 from '@/views/page/CO/CO/COCO4304/COCO4304' // 검색결과

	import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue
	import {defineAsyncComponent} from 'vue'

	export default {
		name : "COCO4301",
		data: () => {
			return {
				searchText: '',		// 검색어
				searchList: [],		// 검색어결과 리스트
				inteList: [],   	// 관심서비스 목록
	
				defaltTag: ["자산", "서비스", "정보", "지출", "금융" ],	// 인기검색어 default 
				randomTag: ["나의", "제3자", "설정", "추천", "계산기", "관리", "조회", "NH", "지역", "연결", "공제", "청소년", "약관", "세금", "건강보험", "나의 자산", "자산현황", "나의 지출", "금융달력", "도전", "목표", "챌린지", "자산진단", "부채관리", "신용점수", "자동차", "지출분석"], 	// 인기검색어 random
				tagList : [],

				isSearching: false,

			}
		},
		computed: {
			showClassCntr() {
                return this.isNull(this.searchText) ? "" : "btnDeleteShow"
            }

        },
		mounted() {
            this.initComponent()

			//PFM로그 처리 화면접속이력 등록 POST
        	apiService.pfmLogSend(this.$options.name)
        },    
		mixins: [
        	popupMixin,
        	commonMixin
    	],
		methods: {

            initComponent() {
                this.getInteList()		// 관심서비스 가져오기
				this.getTagList()		// 인기검색어 만들기
            },

			getTagList() {
				
				const defaltTagCnt = 5;
				const randomTagCnt = 5;

				for(var i = 0; i < defaltTagCnt ; i++) {
					var tag = this.defaltTag.splice(Math.floor(Math.random()*this.defaltTag.length),1)[0]
					this.tagList.push(tag)				
				}

				for(var i = 0; i < randomTagCnt ; i++) {
					var tag = this.randomTag.splice(Math.floor(Math.random()*this.randomTag.length),1)[0]
					this.tagList.push(tag)				
				}

			},

		    //관심서비스 가져오기
          	getInteList() {
            	const config = {
                	url : '/co/co/51r01',
                	data : {
                    	mydtCusno : this.getUserInfo("mydtCusno"),
                    	vernm     : "V4"                           // 버전명
                	}
           		}

				apiService.call(config).then(response => {
					this.inteList = response.fvrList || []
				})
				console.log("inteList:: ", this.inteList);
          	}, 

			//검색
			fn_search() {
				
				if (this.searchText.length < 2) {
					console.log("두 글자 이상으로 입력해주세요.")
					modalService.alert("두 글자 이상으로 입력해주세요.").then(() => {});
					return
				}

				this.isSearching = true;
				const config = {					
					url : '/co/co/30r01',
					data : {						
						'searchText' : this.searchText
					}
            	}
				
            	apiService.call(config).then(response => {
                	console.log("this.searchList = response", response.srcList)
					
					for(var i= 0; i < response.srcList.length; i++) {
						var list = response.srcList[i].psAmnScrnm.split(this.searchText)
						
						response.srcList[i].searchText = this.searchText;
						response.srcList[i].frontText = list[0];
						response.srcList[i].backText = list[1];

						console.log(">>> ", response.srcList[i].psAmnScrnm.split(this.searchText))
					}

					this.searchList = response.srcList;
					//this.searchList = response.pathList.sort((a, b) => a.bkphNm.toLowerCase() < b.bkphNm.toLowerCase() ? -1 : 1)
            	})

			},

			// 검색어 삭제
			fn_remove() {
				this.searchText = '';
				this.isSearching = false;
				console.log("검색어 삭제")
			},

			// 음성인식
			fn_voiceSearch() {
				this.fn_openPopup('COCO4303') 
			},

			// 팝업 이동
			fn_openPopup(pageId) {
                let compName = ''
                if(pageId === 'COCO4351') {
                    compName = COCO4351 // 나의 관심서비스
				} else if(pageId === 'COCO4303') {
					compName = COCO4303 // 음성 인식
                } //else if(pageId === 'COCO4304') {
				// 	compName = COCO4304 // 검색 결과

                const config = {
					component: compName,
                }
                // this.close()
				modalService.openPopup(config).then((response) => {
                    if(pageId === 'COCO4351') { // 관심서비스 추가된 경우 재조회
                        if(response == 'refresh') {
                            this.getInteList();
                        }
                    } else if(pageId === 'COCO4303') { // 음성인식
						console.log("음성인식 response... ", response)
						this.searchText = response
						this.fn_search();
					}

                })
            },

			// 페이지 이동
            fn_movePage(pageId, param) {
                if (pageId === '') {
                    modalService.alert("페이지 정보 필요")
                    return
                }

                let params = {}
                params = param
                
                const config = {
                    name : pageId,
                    params : params
                }
                this.close()
                commonService.movePage(config);
            },

			isEmpty(value) {
            	return (value === null || value === undefined || value.length < 1) ? true : false
        	},

			// 관심서비스 이동 화면이 Page인지 Popup인지 구분해주는 함수
          	fnOpenPopYn(scrId, popDsc) {
            	let type = ""; // 버킷리스트와 금융목표는 scrId가 같으므로 {type:"goal"}을 param으로 넘겨줘야 함.

				if(popDsc == "M" || popDsc == "C") { // 화면(M)
					if(scrId == "PDMY4003") {
						scrId = "PDMY4001";
						type  = {type : "goal"};
					}
					
					this.fn_movePage(scrId, type);
				} else {            // 팝업(P)
					let component
					
					if(scrId == "MRLO4001") {         // 로또복권번호만들기
						component = defineAsyncComponent(() => import("@/views/page/MR/LO/MRLO4001/MRLO4001"))
					} else if(scrId == "ASCR4101") {  // 나의신용점수올리기
						component = defineAsyncComponent(() => import("@/views/page/AS/CR/ASCR4101/ASCR4101"))
					} else if(scrId == "MREV4041") {  // 친구초대
						component = defineAsyncComponent(() => import("@/views/page/MR/EV/MREV4041/MREV4041"))
					} else if(scrId == "COCO4351") {  // 나의 관심서비스
                    	component = defineAsyncComponent(() => import("@/views/page/CO/CO/COCO4351/COCO4351"))
                	} else if(scrId == "MREV2000") {  // 이벤트
                    	component = defineAsyncComponent(() => import("@/views/page/MR/EV/MREV2000/MREV2000"))
					}

					const config = {
						component: component
					}
					
					modalService.openPopup(config).then((response) => {
						if(scrId == "COCO4351") {
							if(response == "refresh") {
								this.getInteList()
							}
						}
					});
				}
			},

			// 인기검색어 조회
			fn_tagSearch(tag) {
				console.log("인기검색어 클릭...", tag)
				this.searchText = tag;
				this.fn_search();
			},

		},
		components : {
        	LottieAnimation
    	},
	}

	
		
</script>
