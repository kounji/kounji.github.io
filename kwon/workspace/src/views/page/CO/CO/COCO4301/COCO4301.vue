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
						<input type="search"  ref='searchTxt' id="search_01" class="inputClear" name="" value="" v-model="searchText" placeholder="검색어를 입력하세요." title="검색어를 입력하세요." @keyup.enter="fn_search()">
						<button type="button" class="com_btn_delete" :class="showClassCntr"  @click.prevent="fn_remove()"><span class="blind">삭제</span></button>
						<button type="button" class="btn_search" @click.prevent="fn_search()"><span class="blind">검색</span></button>
					</div>
					<button type="button" class="btn_mike" @click.prevent="fn_checkVoicePermission()"><span class="blind">음성검색</span></button> <!--[v4.0] 2025-02-18 문구 삭제 -->
				</div>

				<div class="scroller" v-if="!isSearching">
					<div class="search_word">
						<p class="h_tit01">인기 검색어</p>
						<ul>
							<li v-for="item in tagList" :key="item">
								<a href="javascript:void(0);" class="item" @click.prevent="fn_tagSearch(item)">{{item}}</a>
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
								<li v-for="inte in inteList" :key="inte.psAmnScid" :class="inte.menuId"><a href="javascript:void(0);" @click.prevent="fnOpenPopYn(inte.psAmnScid,inte.scrnDsc)">{{inte.psAmnScrnm}}</a></li>
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
								<a href="javascript:void(0);" class="item" @click.prevent="fnOpenPopYn(item.psAmnScid, item.scrnDsc)"> {{item.frontText}}<strong>{{item.searchText}}</strong>{{item.backText}}</a>
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

	import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue
	import {defineAsyncComponent} from 'vue'
	import {dateFormat} from '@/utils/date'

	export default {
		name : "COCO4301",
		data: () => {
			return {
				searchText: '',		// 검색어
				searchList: [],		// 검색어결과 리스트
				inteList: [],   	// 관심서비스 목록
	
				defaltTag: ["자산", "서비스", "정보", "지출", "금융" ],	// 인기검색어 default 
				randomTag: ["나의", "제3자", "설정", "추천", "계산기", "관리", "NH", "지역", "연결", "공제", "청소년", "약관", "세금", "건강보험", "나의 자산", "자산현황", "나의 지출", "금융달력", "도전 목표 챌린지", "자산진단", "부채관리", "신용점수", "마이카", "지출분석"], 	// 인기검색어 random
				tagList : [],

				isSearching: false,
				
				eventOxInfo : {},	// OX퀴즈

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
				this.getEventOXInfo()	// ox퀴즈
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
				this.$refs.searchTxt.blur()
				this.searchText = this.searchText.trim()
				if (this.searchText.trim().length < 2) {
					console.log("test" , this.$refs.searchTxt)
	
					modalService.alert("두 글자 이상으로 입력해주세요.").then(()=>{
						this.searchText = ''
					})
					return false
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

					response.srcList.forEach(item => {
						let psAmnScrnm = item.psAmnScrnm // 검색 결과(원문)
						
						let position = [] // 원문(검색결과)에서 공백 위치
						let words = psAmnScrnm.toUpperCase().split(/\s+/) 

						let startIndex = 0

						for(let i = 0; i < words.length; i++) {
							let word =  words[i];
							let wordEndIndex = startIndex+word.length;

							if(wordEndIndex < psAmnScrnm.length && psAmnScrnm[wordEndIndex] === ' ') {
								position.push(wordEndIndex);
							}
							startIndex = wordEndIndex +1;
						}

						let tempCapitalSearchText = this.searchText.toUpperCase().replace(/\s+/g,'') // 검색어 대문자로 바꾸고 공백제거 -- 검색어
						let tempCapPsAmnScrnm = psAmnScrnm.toUpperCase().replace(/\s+/g,'') // 검색결과 대문자로 바꾸고 공백제거 -- 검색결과
						let tempPsAmnScrnm = psAmnScrnm.replace(/\s+/g,'') // 검색결과 공백만 제거 -- 검색결과

						let position1 = tempCapPsAmnScrnm.indexOf(tempCapitalSearchText) // 대문자로 바꾼 검색결과에서 검색어 첫글자 위치 파악
						let position2 = tempCapPsAmnScrnm.indexOf(tempCapitalSearchText) + tempCapitalSearchText.length // 대문자로 바꾼 검색결과에서 검색어 마지막 글자 위치 파악
						console.log("position1", position1)
						console.log("position2", position2)
						console.log("검색어 :: ", tempPsAmnScrnm.substring(position1, position2)) // 검색어 

						if(position.length != 0) { // 검색결과에 띄어쓰기가 존재할 때
							position.forEach(p => { 								
								console.log("p:: ",p)
								if( Number(p) <= position1 ) { // 검색어보다 앞글자에 띄어쓰기 존재
									position1 = position1 +1 // 검색어 위치 변경
									position2 = position2 +1
									tempPsAmnScrnm = tempPsAmnScrnm.slice(0, Number(p)) + " " + tempPsAmnScrnm.slice(Number(p)) // 검색결과 공백만 제거 -- 검색결과에서 공백 넣어주기 
									
									console.log("1번 : ",tempPsAmnScrnm)
									console.log("-- position1", position1)
									console.log("-- position2", position2)
									console.log("-- 검색어 :: ", tempPsAmnScrnm.substring(position1, position2)) // 위치 변경된 검색어 확인

								} else if (position1 < Number(p) && Number(p) <= position2) { // 검색어 내에 띄어쓰기 존재
									position2 = position2 +1 // 검색어 마지막 글자 위치 변경
									tempPsAmnScrnm = tempPsAmnScrnm.slice(0, Number(p)) + " " + tempPsAmnScrnm.slice(Number(p)) // 검색결과 공백만 제거 -- 검색결과에서 공백 넣어주기 
									
									console.log("2번 : ",tempPsAmnScrnm)
									console.log("-- position1", position1)
									console.log("-- position2", position2)
									console.log("-- 검색어 :: ", tempPsAmnScrnm.substring(position1, position2)) // 위치 변경된 검색어 확인
								
								} else { //검색어 뒤에 띄어쓰기 존재
									tempPsAmnScrnm = tempPsAmnScrnm.slice(0, Number(p)) + " " + tempPsAmnScrnm.slice(Number(p)) // 검색결과 공백만 제거 -- 검색결과에서 공백 넣어주기 
									
									console.log("3번 : ", tempPsAmnScrnm)
									console.log("-- position1", position1)
									console.log("-- position2", position2)
									console.log("-- 검색어 :: ", tempPsAmnScrnm.substring(position1, position2)) // 위치 변경된 검색어 확인

								}
							})
							console.log("최종 result :: ", tempPsAmnScrnm)
						} 

						item.searchText = tempPsAmnScrnm.substring(position1, position2); // 검색어
						item.frontText = tempPsAmnScrnm.substring(0, position1); // 검색어 기준 앞
						item.backText = tempPsAmnScrnm.substring(position2, tempPsAmnScrnm.length);  // 검색어 기준 뒤

						console.log("item ", item)
					})

					this.searchList = response.srcList; 
            	})

			},
		
			// 검색어 삭제
			fn_remove() {
				this.searchText = '';
				this.isSearching = false;
				console.log("검색어 삭제")
			},

			// 음성인식 권한확인
			fn_checkVoicePermission() {
				this.reqVoiceAuth().then( res => {
					console.log('res :: ', res)		// 응답: { "code": "0", "msg": "" }
					let resultJson = null
					if ( this.getUserInfo('chnl') === "385" ) {
						resultJson = res.result
					} else {
						resultJson = JSON.parse(res.result)
					}
					
					if(resultJson.code == '0') { // 음성인식 권한 존재
						this.fn_openPopup('COCO4303') // 음성인식 팝업 이동
					} 
				})
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
						if(this.searchText) {
							this.fn_search();
						} 
					}

                })
            },

			// 페이지 이동
            fn_movePage(pageId) {
                if (pageId === '') {
                    modalService.alert("페이지 정보 필요")
                    return
                }
           
                const config = {
                    name : pageId,
                }
                this.close()
                commonService.movePage(config);
            },

			isEmpty(value) {
            	return (value === null || value === undefined || value.length < 1) ? true : false
        	},

			// 관심서비스 이동 화면이 Page인지 Popup인지 구분해주는 함수
          	fnOpenPopYn(scrId, popDsc) {

				if(popDsc == "M") { // 화면(M)					
					this.fn_movePage(scrId);

				} else {            // 팝업(P)
					let component
					let param
					
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
					} else if(scrId == "COCO2128") {  // 숨긴 지출내역
                    	component = defineAsyncComponent(() => import("@/views/page/CO/CO/COCO2128/COCO2128"))
					} else if(scrId == "COCO1104") {  // 새소식
                    	component = defineAsyncComponent(() => import("@/views/page/CO/CO/COCO1104/COCO1104"))
					} else if(scrId == "COCO4116") {  // 자주하는 질문
                    	component = defineAsyncComponent(() => import("@/views/page/CO/CO/COCO4116/COCO4116"))
					} else if(scrId == "MAGU4001") {  // 서비스 소개
                    	component = defineAsyncComponent(() => import("@/views/page/MA/GU/MAGU4001/MAGU4001"))
					} else if(scrId == "MAGU4S01") {  // 큰글 서비스 소개
                    	component = defineAsyncComponent(() => import("@/views/page/MA/GU/MAGU4S01/MAGU4S01"))
					} else if(scrId == "MAGU4C01") {  // 청소년 서비스 소개
                    	component = defineAsyncComponent(() => import("@/views/page/MA/GU/MAGU4C01/MAGU4C01"))
					} else if(scrId == "MRAT4001") {  // 약관 및 동의서
                    	component = defineAsyncComponent(() => import("@/views/page/MR/AT/MRAT4001/MRAT4001"))
					} else if(scrId == "COAT1104") {  // 제3자 정보제공동의 설정
                    	component = defineAsyncComponent(() => import("@/views/page/CO/AT/COAT1104/COAT1104"))
					} else if(scrId == "MRCA4001") {  // 서비스 해지
                    	component = defineAsyncComponent(() => import("@/views/page/MR/CA/MRCA4001/MRCA4001"))
					} else if(scrId == "COCO4051") {  // 모드 설정
                    	component = defineAsyncComponent(() => import("@/views/page/CO/CO/COCO4051/COCO4051"))
					} else if(scrId == "MAMA4004") {  // 홈 화면 편집
                    	component = defineAsyncComponent(() => import("@/views/page/MA/MA/MAMA4004/MAMA4004"))
					} else if(scrId == "MAMA4005") {  // 캐릭터 설정
                    	component = defineAsyncComponent(() => import("@/views/page/MA/MA/MAMA4005/MAMA4005"))
					} else if(scrId == "OXTP0001") {  // OX퀴즈
                    	

						if(!this.eventOxInfo.bltnDt){
							modalService.alert("OX퀴즈를 준비하고 있어요.")
							return
						}else{
							param = this.eventOxInfo

							if(this.eventOxInfo.quizPrgYn === '1'){ // 도전현황
								component = defineAsyncComponent(() => import("@/views/page/OX/TP/OXTP0006/OXTP0006"))
							}else{                                  // OX퀴즈
								component = defineAsyncComponent(() => import("@/views/page/OX/TP/OXTP0001/OXTP0001"))
							} 
						}

					} else {
						modalService.alert("화면 준비중입니다.")
                		return
					}

					const config = {
						component: component,
						params   : param
					}
					
					modalService.openPopup(config).then((response) => {
						if(scrId == "COCO4351") {
							if(response == "refresh") {
								this.getInteList()
							}
						} else if(scrId === "OXTP0001" && response === "ok"){
							this.eventOxInfo.quizPrgYn = '1'    //참여
							//this.fn_openPopup('OXTP0006', this.eventOxInfo)   //도전현황
							this.fnOpenPopYn("OXTP0001")
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

			pressEnter(e) {
				console.log("   ",e.target)
				this.$refs.searchTxt.blur()
				if(e.keyCode === 13) { //enter			
					this.fn_search()
				}
			},

			// OX퀴즈 정보 조회
            getEventOXInfo(){
                const config = {
                    url: '/mr/ev/19r01', 
                    data: {
                        "bltnDt" : dateFormat(new Date(), 'YYYYMMDD'),
                    },
                    disableLoading : true,
                }
                apiService.call(config).then(response =>{
                    console.log('response : ', response)
                    this.eventOxInfo = response

                    const config2 = {
                        url: '/mr/ev/17r01', 
                        data: {
                            "mydtCusno" : this.getUserInfo("mydtCusno"),
                            "bltnDt" : dateFormat(new Date(), 'YYYYMMDD'),
                        },
                    }
                    apiService.call(config2).then(response =>{
                        console.log('response : ', response)
                        //오늘퀴즈참여여부
                        this.eventOxInfo.quizPrgYn = response.quizPrgYn
                    })
                })
            },


		},
		components : {
        	LottieAnimation
    	},
	}

	
		
</script>
