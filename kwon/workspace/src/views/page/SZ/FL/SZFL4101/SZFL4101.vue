<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > NH지역정보 > 슬기로운영농생활 > 농기계임대
* @ 페이지설명 : 농기계임대 메인
* @ 파일명     : src/views/page/SZ/FL/SZFL4101/SZFL4101.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-03              		                최초작성
* 2021-07-14			  CS515897				화면수정
* 2025-03-04              CS540683              상호금융 NH콕마이데이터 4.0 추진 개발 SZFC2101 → SZFC4101 
*************************************************************************/
-->
<template>
	<page class="content-view hasLNB">
	<!--
	<an-category-v2 type="SZFC"></an-category-v2>
	-->
	<an-sub-category-v4 type="FL"></an-sub-category-v4>


	<div id="content" class="com_sub_type02">
		<div class="com_submainbox_type05 com_submainbox_type05-01 com_line_type01">
			<p class="txt_submaincont_type01"><strong>{{cusNm}}</strong>님을 위한<br><strong>농기계 구입 자금 마련</strong>을<br>도와드려요.</p>
		</div>
		<!--메인(Body)1-->	
		<div class="com_inner com_bg_type00">
			<div class="top_info_box_wrap new_mb40">
				<div class="top_info_box type02 hasdetail new_top_box noBG">
					<div class="box_head">
						<div class="info">
							<div class="title">
								농기계 자금
							</div>
						</div>
						<button class="restore" @click="fn_resetSetting">
							초기화
						</button>
					</div>
					<div class="btn_half_box2 bt20 restore_wrap">
						<a href="javascript:void(0);" class="btn full setting_big_btn" @click.prevent="popup1()" v-if="wrsnmList.length == 0 && lnLmtAmFrom == '' && lnLmtAmTo == '' && spyConmList.length == 0">농기계 자금 맞춤 설정</a>
						<a href="javascript:void(0);" class="btn full restore_big_btn" @click.prevent="popup1()" v-else>농기계 자금 맞춤 재설정</a>
					</div>
					<div class="box_toggle_wrap restore_list_wrap">
						<div class="box_toggle">
							<div class="toggle-box">
								<div data-ui-toggle="box">
									<div class="view-box">
										<div class="info">
											<div class="title">농기계 기종</div>
											<div class="text">
												{{fn_getDscText('fmachWrsnm')}}
											</div>
										</div>
										<div class="info">
											<div class="title">대출한도</div>
											<div class="text">
												{{fn_getDscText('lnLmtAm')}}
											</div>
										</div>
										<div class="info">
											<div class="title">업체</div>
											<div class="text">
												{{fn_getDscText('spyConm')}}
											</div>
										</div>
									</div>
									<button type="button" class="view-btn" aria-expanded="false">
										<!-- <em class="open">열기</em><em class="close">닫기</em> -->
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--메인(Body)1-->	
		
		<!--메인(Body)2-->	
		<div class="com_inner">
			<div class="com_total_type04">	
				<span class="txt_total left">총<em>{{ttcn | numberFilter}}</em>건</span>
				<a href="javascript:void(0);" role="button" class="com_btn_txtlimit" @click="selectModalList">
					<span v-if="sortCndC == 1">높은한도순</span>
					<span v-else-if="sortCndC == 2">낮은한도순</span>
				</a>
			</div>
			<!--메인(Body)2-1(리스트)-->	

			<template v-if="pageShowYn">
				<template v-if="searchShown">
					<div class="no_data_box">
						<div class="no_data_list">
							<p>검색 결과가 없습니다.</p>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="com_box_type01 com_box_list" v-for="(fmach, index) in fmachList" :key="index">
						<a href="javascript:void(0);" role="button" v-on:click.prevent="popup2(fmach)">
							<div class="new_tit_area">
								<div class="tit"  >
									<span class="icon_mint">수확기</span><span>{{fmach.fmachWrsnm}}</span>
								</div>
							</div>
						</a>
						<ul class="bl_dot_list">
							<li>
								<dl>
									<dt>업체</dt>
									<dd>{{fmach.spyConm}}</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>상품코드</dt>
									<dd class="roboto">{{fmach.fmachWrsIdvdc}}</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>형식명</dt>
									<dd class="roboto">{{fmach.fmachFomnm}}</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>규격</dt>
									<dd class="roboto">{{fmach.fmachStdCntn}} / {{fmach.fmachStdnm}}</dd>
								</dl>
							</li>
						</ul>
					</div>
				</template>
			</template>
		</div>
		<!--메인(Body)2-1(리스트)-->	
		<!--메인(Body)2-->	

		<!--더보기(Start)-->	
		<div class="com_inner">
			<div class="com_btn_area02"><a href="javascript:void(0);" role="button" class="com_btn_more" @click.prevent="showMoreList(page)" :style="noMoreList"><span>더보기</span></a></div>
		</div>
		<!--더보기(End)-->	
	</div>
	
	<footersV2 type="sz" />
</page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import SelectPopupCardRenderer from '@/components/renderer/SelectPopupCardRenderer'

//import SzCategoryV2 from '@/components/category/SzCategoryV2.vue'
//import AnCategoryV2 from '@/components/category/AnCategoryV2.vue'
//import AnSubCategoryV2 from '@/components/category/AnSubCategoryV2.vue'
import AnSubCategoryV4 from '@/components/category/AnSubCategoryV4.vue'
import SZFL2102 from '@/views/page/SZ/FL/SZFL2102/SZFL2102'

// kimhc_20220921
// import SZFL2106 from '@/views/page/SZ/FL/SZFL2106/SZFL2106'
import ANSZ2006 from '@/views/page/AN/SZ/ANSZ2006/ANSZ2006'

export default {
    name : 'SZFL4101',
    data: () => {
        return {
			cusNm : "",

			wrsnmList 		: [],		//농기계 검색조건 리스트
            fmachList       : [], 		//농기계 검색 결과 리스트	
			spyConmList    	: [], 		//공급업체 검색조건 리스트
			lnLmtAmFrom    	: "",   	//대출한도 Min
			lnLmtAmTo      	: "",   	//대출한도 Max
			directInput		: false,	//대출한도 직접입력여부
			lnLmtAmBtn     	: "", 	   	//한도금액에 대한 버튼명
			sortCndC       	: "1",   	//높은한도순 -1 낮은한도순 - 2
			ttcn           	: 0, 		// 총 검색량
			pageShowYn     	: false,  	// 페이지show 여부
			searchShown    	: false,	// 검색버튼 클릭여부
			
			//추가(2021.07.07)
			nxDataYn		: "",		// 다음페이지 존재여부
			page			: 1 ,		// 페이지넘버(서비스에서 페이징 처리하기로 해서 페이지 넘버로 보냄, 최초 1)
			//추가(2021.07.07)
        }
    },

    //새로고침
    created() {
            this.initComponent()
    },

	mounted() {
		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
	},

	computed:{
		noMoreList() {
			return (this.nxDataYn == 'N') ? "display : none" : ""
		}
	},

    mixins: [
        commonMixin
    ],

    methods: {
        initComponent() {
			this.cusNm = this.getUserInfo('cusnm')
			
			// 세션에 저장된 맞춤설정값 여부 확인
			let searchCdn = JSON.parse(sessionStorage.getItem("01r01-searchCdn"))
			if(searchCdn != null) {
				this.spyConmList 	= searchCdn.spyConmList
				this.lnLmtAmFrom 	= searchCdn.lnLmtAmFrom
				this.lnLmtAmTo 		= searchCdn.lnLmtAmTo
				this.directInput 	= searchCdn.directInput
				this.wrsnmList 		= searchCdn.wrsnmList
				this.lnLmtAmBtn 	= this.lnLmtAmFrom + "만원" + " ~ " + this.lnLmtAmTo + "만원"
				this.sortCndC 		= searchCdn.sortCndC
			}

			this.page = 1
            this.getData()
		},
		
		//로컬스토리지 값 갱신 함수
		sessionStorageReg(){
			const searchCdn = 
				{
					wrsnmList   : this.wrsnmList,    	//(param)농기계 기종 리스트 = (변수)농기계 기종 리스트
					spyConmList : this.spyConmList,  	//(param)업체 리스트  = (변수)업체 리스트
					lnLmtAmFrom : this.lnLmtAmFrom,   	//(param)대출한도에 대한 최솟값 = (변수)대출한도에 대한 최솟값
					lnLmtAmTo   : this.lnLmtAmTo,    	//(param)대출한도에 대한 최댓값 = (변수)대출한도에 대한 최댓값
					directInput : this.directInput,		//(param)대출한도 직접입력 여부
					sortCndC    : this.sortCndC,     
				}

            //sessionStorage-일시적으로 유지. 윈도우창을 닫게되면 초기화
            //setItem-데이터 저장하기  
			sessionStorage.setItem("01r01-searchCdn", JSON.stringify(searchCdn))
		},

        getData() 
        {
			this.fmachList = []	//농기계 목록 초기화

			if(this.lnLmtAmTo < 0) {this.lnLmtAmTo = ""}

			const config ={
					url:'/sz/fl/01r01',
					data : {
						mydtCusno      : this.getUserInfo('mydtCusno'), 					//(입력)자산관리고객번호
						fmachWrsnmList : this.wrsnmList,         							//(입력)농기계상품명목록List
						spyConmList    : this.spyConmList,       							//(입력)공급업체명목록List
						// lnLmtAmFrom    : (this.lnLmtAmFrom!="")?this.lnLmtAmFrom*10000:"", 	//(입력)대출한도금액-From
						// lnLmtAmTo      : (this.lnLmtAmTo!="")?this.lnLmtAmTo*10000:"",     	//(입력)대출한도금액-To

						lnLmtAmFrom    : (this.lnLmtAmFrom!="")?this.lnLmtAmFrom:"", 	//(입력)대출한도금액-From
						lnLmtAmTo      : (this.lnLmtAmTo!="")?this.lnLmtAmTo:"",     	//(입력)대출한도금액-To

						pageNo		   : this.page,		    	 							// 페이지번호 <<-추가 2021.07.07
						sortCndDsc     : this.sortCndC,   		 							//(입력)정렬조건코드
					}
			}
			apiService.call(config).then(response => {


					console.log("======= response /sz/fl/01r01 =======", response);


					this.ttcn = response.inqCn //(변수)총 검색량 = response.총검색량

					if(response.fmachList != null) this.fmachList = response.fmachList //농기계 목록 리스트

					this.nxDataYn = response.nxDataYn || ''   //다음데이터여부 <<-추가 2021.07.07

					this.pageShowYn = true

					if(this.fmachList.length == 0) this.searchShown = true
					else this.searchShown = false

					//다음데이터여부가 Y일 경우 페이지 Count
					if (this.nxDataYn === 'Y' ) {
						this.page += 1
					}
			})
        },

        popup1() {
			const config = {
				component : SZFL2102,
				params : {
					wrsnmList 	: this.wrsnmList,     //(param)농기계 기종 리스트(wrsnmList) = (변수)농기계 기종 리스트
					spyConmList : this.spyConmList,   //(param)업체 리스트(spyConmList)     = (변수)업체 리스트
					lnLmtAmFrom : this.lnLmtAmFrom,   //(param)대출한도에 대한 최솟값(lnLmtAmFrom) = (변수)대출한도에 대한 최솟값
					lnLmtAmTo 	: this.lnLmtAmTo,     //(param)대출한도에 대한 최댓값(lnLmtAmTo)   = (변수)대출한도에 대한 최댓값
					directInput : this.directInput,	  //(param)대출한도 직접입력 여부
					rangeOutput : this.rangeOutput,
				}
			}
			modalService.openPopup(config).then(response => {
					//취소버튼을 통해 돌아왔을 때
					if(response == "cancel") return

                    //*****     
                    //[팝업]농기계 에서 값이 넘어올 경우...
					this.wrsnmList = response.wrsnmList || []
					
                    //*****     
                    //[팝업]업체에서 값이 넘어올 경우...
					this.spyConmList = response.spyConmList || [] //(변수)업체 리스트 = 업체 리스트

                    //*****     
                    //[팝업]대출한도에서 값이 넘어올 경우...
					this.lnLmtAmFrom 	= response.lnLmtAmFrom   //대출한도에 대한 최소값
					this.lnLmtAmTo 		= response.lnLmtAmTo     //대출한도에 대한 최댓값
					this.directInput 	= response.directInput	 //직접입력 여부    
					this.lnLmtAmBtn 	= this.rangeSentence(this.lnLmtAmFrom, this.lnLmtAmTo) //한도금액 버튼명 생성(대출한도에 대한 최소값,대출한도에 대한 최댓값)

                    //***** 
					//페이지
					this.page = 1

					//***** 
                    //재조회
					this.sessionStorageReg()
					this.getData()
					//this.initComponent()
				})

		},

        popup2(fmach) {
			//상세 팝업 호출
			const config = {
				// kimhc_20220921
				// component: SZFL2106, 
				component: ANSZ2006, 
				params: { // 파라미터
					fmach : fmach
				}
			}

			modalService.openPopup(config)
		}, 

        //숫자 1000단위마다 쉼표생성
		numberFormat(number){
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},

		//대출한도에 대한 버튼 문장 생성
		rangeSentence(from, to){
			from = this.numberFormat(String(from))
			to = this.numberFormat(String(to))
			let sentence = ""
			if(to == -1){
				if(from == 0) sentence = ""
				else sentence = from+"만원 이상"
			}else if(from == 0){
				if(to == 0) sentence = ""
				else sentence = to+"만원 미만"
			}else{
				sentence = from+"만원 ~ " + to + "만원"
			}
			return sentence
		},

		//한도 sort 선택 모달창 함수
		selectModalList() {
			const config = {
				params: {
					title: '한도순 선택',
					list: [
						{comnCId : "1", comnCnm:'높은한도순'},
						{comnCId : "2", comnCnm:'낮은한도순'},
					],
					selectVal: this.sortCndC
				},
				renderer: {
					component: SelectPopupCardRenderer,
					labelFiled: 'comnCnm',
				}
			}
			modalService.openSelectSingle(config).then(response => {
				if(response.comnCnm == "높은한도순"){
					this.sortCndC = response.comnCId
				}else if(response.comnCnm == "낮은한도순"){
					this.sortCndC = response.comnCId
				}

				this.page = 1

				//***** 
				//재조회
				this.sessionStorageReg()   //로컬스토리지 값 갱신 함수
				this.getData()
			})
		},

		//[더보기]버튼 클릭시(추가(2021.07.07)
		showMoreList() {
			let lnLmtAmToTmp = ""

			if(this.lnLmtAmTo == -1) lnLmtAmToTmp = ""	//대출 최대한도에 대한 설정이 없을 때
			else lnLmtAmToTmp = this.lnLmtAmTo

			const config = {
				url:'/sz/fl/01r01',
				data : {
					mydtCusno      : this.getUserInfo('mydtCusno'), //(입력)자산관리고객번호
					fmachWrsnmList : this.wrsnmList,         		//(입력)농기계상품명목록List
					spyConmList    : this.spyConmList,       		//(입력)공급업체명목록List
					lnLmtAmFrom    : this.lnLmtAmFrom*10000, 		//(입력)대출한도금액-From
					lnLmtAmTo      : lnLmtAmToTmp*10000,     		//(입력)대출한도금액-To
					pageNo		   : this.page,   	          		// 페이지번호
					sortCndDsc     : this.sortCndC,   		 		//(입력)정렬조건코드
			}}
			apiService.call(config).then(response => {
				this.nxDataYn	= response.nxDataYn || ''     //(변수)다음데이터여부 = response.다음데이터여부

				for(let i=0;i<response.fmachList.length;i++) {
					this.fmachList.push(response.fmachList[i])
				}

				//다음데이터여부가 Y일 경우 페이지 Count
				if (this.nxDataYn === 'Y' ) {
					this.page		+= 1
				}
			})
		},

		// 맞춤설정 텍스트
		fn_getDscText(dsc) {
			let showTxt = ""
			
			switch(dsc) {
				case 'fmachWrsnm' :
					if(this.wrsnmList.length > 0) {
						for(let i=0; i<this.wrsnmList.length; i++) {
							if(i==0) showTxt += this.wrsnmList[i].fmachWrsnm
							else showTxt += ' · ' + this.wrsnmList[i].fmachWrsnm
						}
					} else {
						showTxt = '설정 없음'
					}
					break
				case 'lnLmtAm' :
					if(this.lnLmtAmFrom >= 0 && !(this.lnLmtAmFrom == 0 && this.lnLmtAmTo == 0)) {
						if(this.lnLmtAmFrom > 0 && this.lnLmtAmTo > 0) {
							showTxt = this.numberFormat(this.lnLmtAmFrom) + "만원" + " ~ " + this.numberFormat(this.lnLmtAmTo) + "만원 미만"
						} else if(this.lnLmtAmFrom == 0) {
							showTxt = this.numberFormat(this.lnLmtAmTo) + "만원 미만"
						} else if(this.lnLmtAmTo == "") {
							showTxt = this.numberFormat(this.lnLmtAmFrom) + "만원 이상"
						}
					} else {
						showTxt = '설정 없음'
					}
					break
				case 'spyConm' :
					if(this.spyConmList.length > 0) {
						for(let i=0; i<this.spyConmList.length; i++) {
							if(i==0) showTxt += this.spyConmList[i].spyConm
							else showTxt += ' · ' + this.spyConmList[i].spyConm
						}
					} else {
						showTxt = '설정 없음'
					}
					break
				default : break
			}

			return showTxt
		},

		// 초기화 버튼 클릭
		fn_resetSetting() {
			const config = {
				content: ['초기화 하시겠습니까?'],
                title  : "",
			}
			modalService.confirm(config).then(text => {
				if(text === '예') {
					this.wrsnmList   = []
					this.spyConmList = []
					this.lnLmtAmFrom = ""
					this.lnLmtAmTo   = ""
					this.directInput = false
					this.sortCndC 	 = "1"
		
					this.sessionStorageReg()
		
					this.page = 1
					this.getData()
				}
			})

		}

    },
    components : {
        Page,
		FootersV2,
		//SzCategoryV2,
		//AnCategoryV2,
		//AnSubCategoryV2,
		AnSubCategoryV4,
    }
}   
</script>