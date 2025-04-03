<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > NH콕마이카
* @ 페이지설명 : 금융생활 > NH콕마이카 > 중고차 검색
* @ 파일명     : src\views\page\AN\CA\ANCA2001\ANCA2001.vue
* @ 작성자     : CS528043
* @ 작성일     : 2022-08-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-10              CS528043              최초작성(신규)
* 2023-08-09              CS533049              파일명변경(ASCA1206.vue -> ASCA2001.vue)
*************************************************************************/
-->

<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 		
		<div class="popup_header">
			<h1>중고차 검색</h1>
		</div>

		<div class="popup_content com_no_bottom allianceSvc"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<ul class="layoutBox wAuto rBtn rTxt">
					<li class="left">
						<strong class="titH1">안전한 거래를 위해<br>실매물만 볼 수 있어요!</strong>
					</li>
					<li class="right">
						<span>시세출처 : <em>카동</em></span>
					</li>
				</ul>
			</div>

			<hr class="hr02">

			<div class="custom_box myOldCar">
				<!-- slide -->
				<div class="vertical_car slick_refresh">
					<div class="slider_wrap">
						<div class="tab_cont auto_play">

							<div role="tabpanel" class="cmm-tab-panel" v-for="(carInfo, idx1) in reqData" :key="idx1">
								<div class="slide">
									<div class="top_info_box type02 noBG hasdetail" @click.prevent="fn_openBrowser('CERTUSEDCAR', carInfo.cnctLkNm)">
										<div class="car_pic">
											<img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="carInfo.vhcModlnm">
											<img v-else :src="carInfo.uscarImgPathnm" @error="emptyImg" :alt="carInfo.vhcModlnm">			
										</div>
										<div class="car_top_wrap">
											<div class="car_name">
												{{carInfo.vhcModlnm}}	
											</div>
											<template v-if="carInfo.carMdyrNm !== '' || carInfo.carMdyrNm !== null && carInfo.carMdyrNm.length > 0">
												<div class="date"><em class="num">{{carInfo.carMdyrNm | dateFilter('YYYY')}}</em> 연식</div>
											</template>
											<template v-else>
												<div class="date"><em class="num"></em></div>												
											</template>													
										</div>
										<div class="car_bottom_wrap">
											<div class="price" v-html="fn_numberFormatKorAmt(carInfo.carSelPr)"></div>
										</div>
									</div>
								</div>
							</div>
							
						</div>
					</div>
				</div>
				<!--// slide -->
			</div>	

			<div class="com_inner">
				
				<div class="custom_box">
					<div class="tab_tooltip_wrap tab_tooltip_wrap02">
						<div id="tooltip01" class="tab_tooltip">
							<div class="com_btn_area com_btn_round_flex">
								<a href="javascript:void(0);" class="com_btn_round btn1" role="button" @click.prevent="fn_srchCtrl('keyword')">
									<span>키워드 검색 </span>
								</a>
								<a href="javascript:void(0);" class="com_btn_round btn2" role="button" @click.prevent="fn_openSearch(condObj)">
									<span>맞춤 검색</span>
								</a>
								<div class="custom_box_search_area">
									<div class="com_input_type02">
										<input type="search" id="txt01" class="inputClear" v-model="carModlnm" name="" value="" @keyup.enter="fn_srchCarList('init')" placeholder="모델명을 입력해주세요" title="모델명을 입력">	
										<a href="javascript:void(0);" class="com_btn_delete" style="display: none;"><span class="blind">삭제</span></a>
										<a href="javascript:void(0);" class="com_btn_search" role="button" @click.prevent="fn_srchCarList('init')"><span class="blind">검색</span></a>
									</div>
									<div class="custom_box_btn">
										<a href="javascript:void(0);" class="btn_search" role="button" @click.prevent="fn_srchCtrl('')"><span>취소</span></a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="car-tab car-tab01">
						<template v-if="addUsedCarList.length > 0">
							<div class="car-tab car-tab01">
								<!-- 중고차 전체목록 S -->
								<ul class="carsearch_list">
									<template v-for="(usedCarInfo, idx3) in addUsedCarList"> 
										<li :key="idx3" >
											<a href="javascript:void(0);" @click.prevent="fn_openBrowser('CERTUSEDCAR', usedCarInfo.cnctLkNm)">
												<dl>
													<dt>
														<p class="carname">
															{{usedCarInfo.vhcModlnm}}
														</p>
														<template v-if="usedCarInfo.carMdyrNm !== '' || usedCarInfo.carMdyrNm !== null && usedCarInfo.carMdyrNm.length > 0">
															<p class="date"><em class="num">{{usedCarInfo.carMdyrNm | dateFilter('YYYY')}} 연식</em></p>															
														</template>
														<template v-else>
															<p class="date"><em class="num"></em></p>
														</template>
														<p class="carprice"  v-html="fn_numberFormatKorAmt(usedCarInfo.carSelPr)"></p>
													</dt>
													
													<dd>
														<img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="usedCarInfo.vhcModlnm">
														<img v-else :src="usedCarInfo.uscarImgPathnm" @error="emptyImg" :alt="usedCarInfo.vhcModlnm">
													</dd>
												</dl>
											</a>	
										</li>
									</template>	
								</ul>
								<!-- 중고차 전체목록 E -->
								<!-- 더보기 -->
								<a href="javascript:void(0);" role="button" class="com_btn_more" @click.prevent="fn_showMoreList()" v-show="lsPageYn==='1'">더보기</a>
							</div>
						</template>
						<template v-else>
							<!-- 조회내역이 없을경우 S -->
							<div class="no_data_box">
								<div class="no_data_list">
									<p>조회된  정보가 없습니다.</p>
								</div>
							</div>
							<!-- 조회내역이 없을경우 E -->							
						</template>		

					</div>
				</div>

			</div>		

		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close('reload')"><span class="blind">팝업닫기</span></a>		
	</div>    
</template>

<script>
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
// import {dateFormat} from '@/utils/date'
import {fncSlick_carSrch} from '@/utils/slick'
import {numberFormat} from '@/utils/number'
import modalService from '@/service/modalService'
import ANCA2213 from '@/views/page/AN/CA/ANCA2213/ANCA2213'	// 조건검색

export default {
    name : "ANCA2001", 
    data: () => {
		return {
            // input
			mydtCusno         : "",     // 마이데이터고객번호
            
			// output
			reqData           : [],     // 조회된 Data			
			usedCarTopPopList : "",		// 중고차TOP10리스트
			usedCarPopCnt     : "",		// 중고차TOP10건수
			usedCarPopList    : "",		// 중고차검색리스트			
			addUsedCarList    : [],		// 중고차 조회목록 누적
	
			pageNum           : 0,      // 페이지번호
			lsPageYn          : "",     // 다음페이지존재여부 '1':존재 , '0':미존재
			lsPageYn2         : "",     // 다음페이지존재여부 '1':존재 , '0':미존재	

			srchGbn           : '',	    // 검색구분	
			carModlnm         : '',     // 자동차모델명

			ncarAmDscList     : [],		// 금액구분코드
			odmtrDistDscList  : [],		// 주행거리구분코드
			condObj           : {},		// 조회조건

			// etc
			pdcaUserAgent     :"",		// 실행플랫폼 (ios, android, else)		
        }
	},
    mixins: [
        popupMixin
        ,commonMixin
	],
	created() {
		this.pageNum = 1   // 페이지번호

		this.ncarAmDscList    = this.getCodeList("NCAR_AM_DSC")   	// 금액구분코드  
		this.odmtrDistDscList = this.getCodeList("ODMTR_DIST_DSC").map((obj) => { return { comnCVal : obj.comnCVal
																, comnCExpl : obj.comnCVal === "01" ? '1만 km' 
																: obj.comnCVal === "03" ? '2만 km' 
																: obj.comnCVal === "04" ? '3만 km' 
																: obj.comnCVal === "05" ? '4만 km' 
																: obj.comnCVal === "06" ? '5만 km' 
																: obj.comnCVal === "07" ? '6만 km' 
																: obj.comnCVal === "08" ? '7만 km' 
																: obj.comnCVal === "09" ? '8만 km' 
																: obj.comnCVal === "10" ? '9만 km' 
																: obj.comnCVal === "11" ? '10만 km' : ""
														}}).filter((obj) => obj.comnCVal !== '02' && obj.comnCVal <= "11") // 주행거리구분코드
	},	
    mounted() {
		this.initComponent(this.params)

		//키워드 겁색
		this.fn_keySearch()		
		
        //PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(params) {

			// 실행플랫폼
			// chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
			if(this.getUserInfo('chnl') === '385') {
				this.pdcaUserAgent = appService.getUserAgent()
			} else if(this.getUserInfo('chnl') === '386') {

				// 기기로 접속하였을 경우는 true
				if((window.$SMNATIVE.getOS('A') == true && window.$SMNATIVE.getOS('I') == false) || (window.$SMNATIVE.getOS('A') == false && window.$SMNATIVE.getOS('I') == true)) {
					this.pdcaUserAgent = 'cok'
				} else {
					this.pdcaUserAgent = 'else'
				}
			}

			console.log("params : ", params)

			// 파라미터 셋팅(임시)
            this.mydtCusno = this.getUserInfo('mydtCusno')    // 마이데이터 고객번호

			// 조회
			this.getData()					// 중고차TOP10리스트 
			this.fn_srchCarList('init')		// 중고차검색리스트	
		},		
        getData() {
			console.log("인기차종TOP10(중고차)조회(POP) CALL!!")
	
			const config = {
				url: '/an/ca/01r01',
				data: {"mydtCusno" : this.mydtCusno,	// 마이데이터고객번호
						"wrsDsc" : "2",					// 인증중고(1), 최신중고(2)
						"pageNum"  : 1					// 페이지번호
					}
			}

			apiService.call(config).then(response => {
				console.log("중고차TOP10 조회 response >>> : ", response)
				
				this.usedCarPopCnt = response.usedCarCnt  || 0		// 중고차 목록건수
				this.usedCarList   = response.usedCarList || []	// 중고차목록
				this.lsPageY2      = response.lsPageYn    || ""	// 다음페이지 존재여부 (1:존재, 0:미존재)
				
				let tmpCarList = response.usedCarList || []

                // tmpCarList.map((obj)=>{
                //     if(obj.uscarImgPathnm.indexOf('http') >= 0 && obj.uscarImgPathnm.indexOf('https') == -1){
                //         obj.uscarImgPathnm = obj.uscarImgPathnm.replace('http', 'https')
                //     }
                //     return obj
                // })
                
				if(this.reqData.length > 0) {
                    for(let i=0; i< tmpCarList.length; i++) {
                        this.reqData.push(tmpCarList[i])
					}
				} else {
                    this.reqData = tmpCarList
				}

                
				if(this.reqData.length > 0){
					// 인기차종TOP10(신차)조회(POP)
					this.$nextTick(() => {
						setTimeout(()=>{
							fncSlick_carSrch(300, false, "", 0, "")
						}, 10)
					})
				}
			})
		},
		// 조건검색
		fn_openSearch(pCond = {}) {

			// 이미 선택 된 경우 조회 파라미터 셋팅
			console.log("paramSrch : ", pCond)
			console.log("paramSrch1 : ", Object.keys(pCond).length)
			console.log('1111111111>>>>')

			let param = { ncarAmDscList    : this.ncarAmDscList		// 금액구분코드(NCAR_AM_DSC)
						, odmtrDistDscList : this.odmtrDistDscList  // 주행거리구분코드(ODMTR_DIST_DSC)
						, pNcarAmArr       : (Object.keys(pCond).length > 0 && pCond.ncarAmArr.length       > 0) ? pCond.ncarAmArr       : []	// 금액구분코드	(조건param)
						, pOdmtrDistDscArr : (Object.keys(pCond).length > 0 && pCond.odmtrDistDscArr.length > 0) ? pCond.odmtrDistDscArr : []	// 금액구분코드	(조건param)						
						}
		
			const popConfig = {
				params : param,
				renderer : {
					component : ANCA2213
				}
			}

			modalService.openSlidePagePopup(popConfig).then(response => {
				console.log('팝업리턴 : ', response)

				this.condObj = response.rtnData

				
				// 콤보선택완료후 조회
				this.fn_srchCarList("init")
			})

		},

		// 중고차목록 조회
		fn_srchCarList(selMode){


			let odmtrDistDsc = ""	// 주행거리구분
			let ncarAmDsc = ""	// 신차금액구분

			// 조회조건 값이 비었는지 검사
			if(Object.keys(this.condObj).length > 0){
				// 주행거리구분(주행거리) odmtrDistDsc
				if(this.condObj.odmtrDistDscArr.length > 0){
					odmtrDistDsc = this.condObj.odmtrDistDscArr[0]
				}

				// 금액구분(금액) ncarAmDsc
				if(this.condObj.ncarAmArr.length > 0){
					ncarAmDsc = this.condObj.ncarAmArr[0]
				}
			}

			console.log('ncarAmDsc : ', ncarAmDsc)
			console.log('odmtrDistDsc : ', odmtrDistDsc)

			// 최초조회
			if(selMode === 'init'){
				this.pageNum = 1
				this.addUsedCarList = []
			}

			const config = {
				url: '/an/ca/01r01',
				data: {"mydtCusno" : this.mydtCusno,	// 마이데이터고객번호
						"wrsDsc" : "1",					// 인증중고(1), 최신중고(2)
						"pageNum"  : this.pageNum,		// 페이지번호
						"carModlnm" : this.carModlnm,	// 자동차모델명
						"odmtrDistDsc" : odmtrDistDsc, // 주행거리구분
						"ncarAmDsc" : ncarAmDsc // 금액구분
					}
			}

			console.log("svc param : ", config)

			apiService.call(config).then(response => {
				console.log("중고차검색 목록조회 response >>> : ", response)
				
				this.usedCarCnt     = response.usedCarCnt  || 0		// 중고차 목록건수
				this.usedCarPopList = response.usedCarList || []	// 중고차목록
				this.lsPageYn       = response.lsPageYn    || ""	// 다음페이지 존재여부 (1:존재, 0:미존재)
				
				let tmpCarList = response.usedCarList || []

                // tmpCarList.map((obj)=>{
                //     if(obj.uscarImgPathnm.indexOf('http') >= 0 && obj.uscarImgPathnm.indexOf('https') == -1){
                //         obj.uscarImgPathnm = obj.uscarImgPathnm.replace('http', 'https')
                //     }
                //     return obj
                // })


				if(this.addUsedCarList.length > 0) {
					for(let i=0; i< tmpCarList.length; i++) {
						this.addUsedCarList.push(tmpCarList[i])
					}
				} else {
					this.addUsedCarList = tmpCarList
                }
                
			})
		},
		// 키워드 검색
		fn_srchCtrl(gbn){
			if(this.srchGbn != gbn){
				this.srchGbn = gbn
			}

			// 취소를 선택한 경우 재조회
			if(gbn === ''){
				this.carModlnm = ''
				this.fn_srchCarList("init")
			}
		},

		// 더보기
		fn_showMoreList() {
            console.log('더보기!!')
			this.pageNum  = this.pageNum + 1
			this.fn_srchCarList()
        },
        // 외부브라우저 오픈		
        fn_openBrowser(openGbn, cnctLkNm) {
			// openGbn 정의
			// CERTUSEDCAR:인증중고차, USEDCAR:중고차
			console.log("openGbn : ", openGbn)
            console.log("오픈브라우저Call!!")

			let url = ""

			// openGbn에 따른 URL분기처리
            switch(openGbn) {
                case "USEDCAR" :		// 중고차(인증중고차)
					url = "https://nhcok.cardong.co.kr/usedcar/list"
					break
                case "CERTUSEDCAR" :	// 인증중고차 구매(인증중고차)
					url = "https://nhcok.cardong.co.kr" + cnctLkNm
					break																							
                default :
                    break
			}
			
			console.log('moveUrl : ', url)

            // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
            if(this.getUserInfo('chnl') === '385') {
                // 스뱅
                appService.executeBrowser(url)
            } else {
                // 콕뱅
                appService.cokBankOpenPopupWebBrowser(url)
            }
        },		
		setAlt(carBrannm, carModlnm, carCtrimNm) {
			return carBrannm + " " + carModlnm + " " + carCtrimNm
		},
		fn_numberFormatKorAmt(number) {
			const unit = ['', '만', '억', '조', '경']
			const splitAmt = 10000
			const splitCnt = unit.length

			let resultArray = []
			let resultString = ""

			for(let i = 0; i < splitCnt; i++){
				let rst = (number % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
				rst = Math.floor(rst)

				if(rst > 0){
					resultArray[i] = rst
				}
			}

			let strIdx = 0  // 최초시작지점에 '원' 추가가히위함

			for(let j = 0; j < resultArray.length; j++){
				if(!resultArray[j])  {
					strIdx++
					continue
				}

				// 1만원 미만 절삭처리
				if(strIdx > 0){
					if(j === strIdx) {
						resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '원</em>' + resultString
					} else {
						resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '</em>' + resultString
					}					
				}else{
					resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '원</em>' + resultString
				}
			}

			return resultString
		},
		fn_setImgUrl(imgPathnm){
			return 'http://nhcok.cardong.co.kr/img/' + imgPathnm
		},
		// 검색초기화
		fn_clearSearch(){
			
			// 선택조건 초기화
			this.condObj = {}

			// 초기화 후 재조회
			this.fn_srchCarList("init")
		},	
		// 키워드 검색
		fn_keySearch(){
			$(document).ready(function(){
				var btnArea = $(".com_btn_round_flex > .com_btn_round");
				var btn1 = $(".com_btn_round_flex > .com_btn_round.btn1");
				var searcArea = $('.com_btn_round_flex > .custom_box_search_area');
				var btnCalcel = $(".btn_search");
					searcArea.addClass('hide');
				// 키워드 검색 btn
				btn1.on('click', function() {
					btnArea.addClass('hide');
					searcArea.removeClass('hide');
				});
				
				// 취소 btn
				btnCalcel.on('click', function() {
					btnArea.removeClass('hide');
					searcArea.addClass('hide');
				});
			});			
		},
        emptyImg(e) {
            e.target.src = new URL("@/assets/images/icon/car_new06.png", import.meta.url).href
        },			
	},
	computed : {						
	}
}
</script>
<!-- slick 처음로딩시 이미지 펼처보이는 증상 없애기 -->
<style scoped>
	.vertical_car .slider_wrap .tab_cont {
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.1s ease;
		-webkit-transition: opacity 0.1s;
	}
	.vertical_car .slider_wrap .tab_cont.slick-initialized {
		visibility: visible;
		opacity: 1;
	}
</style>