<!--
/*************************************************************************
* @ 서비스경로 : 추천 > 추천 서브메인 > 주식종목 선택
* @ 페이지설명 : 추천 > 추천 서브메인 > 주식종목 선택
* @ 파일명     : src/views/page/RE/TA/RETA4002/RETA4002.vue
* @ 작성자     : CS541817
* @ 작성일     : 2025-03-17
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-17              CS541817              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>주식종목 선택</h1>
		</div>

		<div class="popup_content" ref="scrollArea" > 

			<section class="index_setting">
				<div class="title">
					<h2>데일리 금융브리핑 화면에<br>노출할 주식종목을<br>선택해주세요.<button type="button" class="btns" @click.prevent="fn_unChkAll()">전체해제</button></h2>
					<p>최대 4개 선택 가능해요.</p>
				</div>

				<!-- CASE1 선택 주식항목이 1개 이상 있는 경우 -->
				<ul class="stock_data" v-if="intStcList.length > 0 && intStcList">
					<li :class='checkExist(intStcList[0]) ? null : "nodata"'>
						<span>{{checkExist(intStcList[0]) ? intStcList[0].stkItmnm : "-"}}</span>
						<a href="javascript:void(0);" role="button" class="btn_del" @click="fn_remove(0)"><span class="blind">종목삭제</span></a>
					</li>
					<li :class='checkExist(intStcList[1]) ? null : "nodata"'>
						<span>{{checkExist(intStcList[1]) ? intStcList[1].stkItmnm : "-"}}</span>
						<a href="javascript:void(0);" role="button" class="btn_del" @click="fn_remove(1)"><span class="blind">종목삭제</span></a>
					</li>
					<li :class='checkExist(intStcList[2]) ? null : "nodata"'>
						<span>{{checkExist(intStcList[2]) ? intStcList[2].stkItmnm : "-"}}</span>
						<a href="javascript:void(0);" role="button" class="btn_del" @click="fn_remove(2)"><span class="blind">종목삭제</span></a>
					</li>
					<li :class='checkExist(intStcList[3]) ? null : "nodata"'>
						<span>{{checkExist(intStcList[3]) ? intStcList[3].stkItmnm : "-"}}</span>
						<a href="javascript:void(0);" role="button" class="btn_del" @click="fn_remove(3)"><span class="blind">종목삭제</span></a>
					</li>
				</ul>

				<!-- CASE2 empty -->
				<div class="stock_empty" v-else>
					<p>데일리 금융브리핑에 노출할 주식종목을 선택해주세요.</p>
				</div>

				<div class="input">
					<input type="search" ref='srchStk' class="inputClear" name="" id="input01" placeholder="2글자이상 입력해주세요" v-model="srchStk" @keyup.enter="fn_search()">
					<button type="button" class="com_btn_delete" @click.prevent="fn_removeTxt()"><span class="blind">삭제</span></button>
					<button type="button" class="btn_search" @click.prevent="fn_search()"><span class="blind">검색</span></button>
				</div>

				<div class="category_tab">
					<ul role="tablist">
						<li class="on"><a href="#navi11" role="tab" :aria-selected="flag == '3' ? 'true' : 'false'" @click.prevent="setTab('3')">전체</a></li>
						<li><a href="#navi12" role="tab" :aria-selected="flag == '1' ? 'true' : 'false'" @click.prevent="setTab('1')">코스피</a></li>
						<li><a href="#navi13" role="tab" :aria-selected="flag == '2' ? 'true' : 'false'" @click.prevent="setTab('2')">코스닥</a></li>
					</ul>
				</div>

				<p class="stock_date">{{basDt | dateFilter('YYYY.MM.DD')}} 기준</p>
				<table class="stock_table">
					<caption>주식종목 테이블</caption>
					<colgroup>
						<col style="width:20%">
						<col style="width:40%">
						<col style="width:auto">
						<col style="width:46px">
					</colgroup>
					<thead>
						<tr>
							<th scope="col">구분</th>
							<th scope="col">종목명</th>
							<th scope="col">{{basDt | dateFilter('YYYY.MM.DD')}} 기준</th>
							<th scope="col">선택</th>
						</tr>
					</thead>
					<tbody >
						<template v-if="pagedList && pagedList.length > 0">
							<tr v-for="(item, idx) in pagedList" :key="'korStk_'+idx" > 
								<th>{{item.mktDsnmKr}}</th>
								<td>
									<p>{{item.stkItmnm}}</p>   
									<p class="range" :class="upDown(item.bdCmprRnf)" :aria-label="markUpText(item.bdCmprRfVal, item.bdCmprRnf, 'Y')">{{addComma(Math.abs(Number(item.bdCmprRfVal)))}} ({{Math.abs(Number(item.bdCmprRnf).toFixed(2))}}%)</p>
								</td>
								<td>
									<p class="price">{{addComma(item.stkEpr)}}</p>
								</td>
								<td>
									<div class="checkbox border">
										<input type="checkbox" name="stock_sel" :id="'stock_sel_'+idx" :checked="checkYn(item)" @change.prevent="fn_selectIntStc($event,item)">
										<label :for="'stock_sel_'+idx"></label>
									</div>
								</td>
							</tr>
						</template>
						<template v-else><!-- empty case// -->
							<tr>
								<td colspan="4">
									<div class="no_result">
										<p class="text">입력한 <span>'{{tempSrchStk}}'</span> 결과가 없어요.</p>
										<button type="button" class="btns line md" @click.prevent="fn_clear()"><span class="ico_search_green">전체 주식종목 다시 확인하기</span></button>
									</div>
								</td>
							</tr>
						</template>
						<!-- //empty case -->

					</tbody>
				</table>
			</section>

		</div>

		<div class="popup_footer fixed" ref="footer">
			<div class="btn_full_box">
				<button type="button" class="btns lg primary" @click.prevent="fn_save()">저장</button>
			</div>
		</div>
		
        <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"


import modalService from '@/service/modalService'
import apiService from '@/service/apiService' 
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import commonService from '@/service/commonService'


import {dateFormat} from '@/utils/date'
import {mapActions} from 'vuex'
import {defineAsyncComponent} from 'vue'
import {fncSlick_briefing, fncSlick_briefing2} from '@/utils/slick'
import '@/assets/js/rMateChartH5/JS/rMateFunction.js'
import _ from 'lodash'

export default {
    name : "RETA4002",
    data: () => {
        return {
			
			korStkList 		: [],	// 전체 주식 목록
			intStcList 		: [],	// 추전 노출 주식 목록
			orgStcList		: [],   // 기존 관심 주식 목록
			srchStk			: '',	// 검색주식
			tempSrchStk		: '',	// 검색주식 표기용
			flag			: '3',  // default 3 전체 (1: 코스피, 2: 코스닥)

			listTotalCnt	: '',	// 리스트 전체길이
			pageCnt			: 10,	// 페이지당 리스트 길이
			pageNow			: 1, 	// 현재 페이지

			pagedList 		: [], 	// 페이징된 주식 목록

			curDt 			: '',	// 오늘 날짜
			mydtCusno		: '', 	// 마이데이터고객번호
			basDt 			: ''	// 기준 날짜
		
        }
    },
	computed: { 

    },
    mounted() {
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
		this.$refs.scrollArea.addEventListener("scroll",this.scrollHandler)

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {

        initComponent() {
		
			this.curDt = dateFormat(new Date(), 'YYYYMMDD')
			this.mydtCusno = this.getUserInfo("mydtCusno")

			this.fn_callStkList() 	// 주식 기본 목록 조회
			this.fn_callMyIntStc()	// 관심 주식 목록 조회
        },

		// 탭 선택
		setTab(tabIdx) {
			this.flag = tabIdx;
			this.fn_callStkList();
		},

		checkYn(item) {
			return 	this.intStcList.some(temp => temp.shrtItmC == item.shrtItmC)
		},

		// 주식 기본 목록
		fn_callStkList() {

			this.tempSrchStk = this.srchStk.trim()

			const config = {
                url: '/re/si/02r01', 
                data: {
					"basDt" : this.curDt,
                    "mktDsnmCd" : this.flag, 			// 플래그  (전체/코스피/코스닥)
					"srchStk" : this.tempSrchStk 		// 주식명
				}
            }
			
            apiService.call(config).then(response => {
                console.log("response :: ", response)
                
				this.korStkList = response.korStkList; 
				if(this.korStkList && this.korStkList.length > 0)   
					this.basDt = response.korStkList[0].basDt  // 기준날짜

				this.listTotalCnt = this.korStkList.length
				this.pageNow = 1 
				if(this.listTotalCnt >= 10 ) {
					this.pagedList = [...this.korStkList.slice(0,this.pageCnt * this.pageNow)]
				} else {
					this.pagedList = this.korStkList.slice(0,this.listTotalCnt);
				}
				
            })

		},
		
		// 관심 주식 목록 불러오기
		fn_callMyIntStc() {
			console.log("관심주식목록...")
			
			const config = {
                url: '/re/si/02r02', 
                data: {
					"basDt"		: this.curDt,
					"mydtCusno" : this.mydtCusno
				}
            }
			
            apiService.call(config).then(response => {
                console.log("response :: ", response)

                this.intStcList = response.myInteStkList;

            })
		},

		// 관심 주식 체크하기
		fn_selectIntStc(event ,stockInfo) {
			console.log("관심주식 체크...", stockInfo)

			let temp = event.target.checked
			console.log("event:: ", event)

			if(temp == true) { // 체크 표시
				if(this.intStcList.length < 4 ) {
					this.intStcList.push(stockInfo)
				} else {
					console.log("4개만 선택 가능함")
					modalService.alert("최대 4개 선택할 수 있습니다.").then(() => {
						console.log("event:: ",event)
						event.target.checked = false
					});
				}
			} else { // 체크 해제
				let index = this.intStcList.findIndex((item) => item.shrtItmC == stockInfo.shrtItmC)
				
				
				if(index != -1) {
					this.intStcList.splice(index, 1)
				}
			}
		},

		// 검색
		fn_search() {
			console.log( this.srchStk + "검색하기...")	
			this.$refs.srchStk.blur()		
			this.srchStk = this.srchStk.trim()
			if (this.srchStk.trim().length < 2) {
				console.log("두 글자 이상으로 입력해주세요.")
				modalService.alert("두 글자 이상으로 입력해주세요.").then(()=>{
					this.srchStk = ""
					this.setTab('3')
				})
				return
			}
			this.fn_callStkList();		
		},

		// 저장
        fn_save() {
            console.log("저장...")
			let list = []

			this.intStcList.forEach((item, idx) => {
				list.push({"shrtItmC" : item.shrtItmC, "prtoSq": idx+1})
            })

			const config = {
                url: '/re/si/02s01',  
                data: {
					"mydtCusno" : this.mydtCusno,
					"newInteStkList" : list
				},
            }

			console.log("config:: ", config)
			
            apiService.call(config).then(response => {
                console.log("save response :: ", response) 
	
				if(response.rspC == '0000'){
                    //this.close('success');
					if(this.$route.name == 'PDBF4001') { // 데일리 금융브리핑에서 진입
						this.close('success');
					
					} else { // 그 외 페이지에서 진입(ex: 추천)
						this.close('move');
						
					}

                } else {
                    modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {
                    })
                }
            })	
	
        },

		// 전체해제
		fn_unChkAll() {
			console.log("전체해제...")
			this.intStcList = []

		},

		// 관심 종목 삭제
		fn_remove(idx) {
			console.log("관심 X...",idx)	
			this.intStcList.splice(idx,1)
		},     
		
		// 검색어 지우기
		fn_removeTxt() {
			this.srchStk = '';
			console.log("검색어 삭제")
		},
		
        // 지수 상승하락 확인
        upDown(index) {
            return Number(index) > 0 ? 'up' : Number(index) == 0 ? '0' : 'down'
        },


		// 존재 여부 조회 
        checkExist(obj) {
			return (obj === null || obj === undefined) ? false : Object.keys(obj).length == 0 ? false : true
        },

		// 스크롤 
		scrollHandler(e) {
			e.preventDefault()
			console.log("scrollTop", e.target.scrollTop) // 현재스크롤 위치
			console.log("scrollHeight", e.target.scrollHeight) // 전체 높이
			console.log("clientHeight", e.target.clientHeight) // 보이는영역 높이
	
			let top = e.target.scrollTop
			let height = e.target.scrollHeight 
			let clientHeight = e.target.clientHeight

			if(top + clientHeight  >= height - 30) { // 오차 허용 30px
				console.log("바닥!!!!!!!!!!!!!!!!!!!!!!!!!")
				if(this.pagedList.length < this.listTotalCnt) {
					this.addList()
				}
			}
		},


		fn_clear() {
			console.log("검색어 지우기+ 전체주식 확인!!!")
			this.srchStk = ""
			// 탭 선택
			this.setTab('3') 

		},
			
		addComma(nStr){
            return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        },

		addList() {
			const tempList = [...this.korStkList.slice(this.pageCnt * this.pageNow, this.pageCnt * (this.pageNow + 1))]
			this.pagedList = this.pagedList.concat(tempList)
			++this.pageNow
		},
		
		// v4 지수/통화 상승하락 텍스트(MARKUP)
        markUpText(var1, var2, var3) {
            let markUpVal = Number(var2) > 0 ? '상승' : Number(var2) == 0 ? '동일' : "하락"
            let percentYn = var3 == 'Y' ? '%' : ''

            if (Number(var2) == 0) {
                markUpVal = markUpVal
            } else {
                markUpVal = markUpVal + " " + var1 +" " + var2 + percentYn 
            }
            
            return markUpVal
        },

    },
    components : {
        Page,
        FootersV2
    },
	beforeDestroy() {
		this.$refs.scrollArea.removeEventListener("scroll", this.scrollHandler)
	},
    destroyed() {
        
    }
}

</script>