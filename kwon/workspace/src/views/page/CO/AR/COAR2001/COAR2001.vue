<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 자산연결 방법 선택
* @ 페이지설명 : 자산연결 방법 선택
* @ 파일명     : src/views/page/CO/AR/COAR2001/COAR2001.vue
* @ 작성자     : CS533459
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533459              마이데이터 확대개발 내용 적용
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>자산연결</h1>
			<!-- <a href="javascript:void(0);" class="btn_back" @click="close(true)"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<strong class="titH1">
					여러 기관 정보를 연결하면<br> 
					꼼꼼히 관리 해 드릴게요.
				</strong>
				<p class="desc">
					금융 자산, 카드, 대출은 물론<br> 
					연금, 건강보험, 세금까지 한 곳에서 관리하세요.
				</p>
			</div>

			<hr class="hr02">

			<div class="com_inner">
				

				<!-- 2023.06.26 > CS533459 퍼블 변경으로 인한 추가  -->
				
				<a href="javascript:void(0)" role="button" class="link_type01" @click="openAssetConnect()">
					<div class="tit_wrap">
						<strong class="titH3">금융 &middot;공공 기관 연결</strong>
					</div>
					<p class="tags">
						#은행 #카드 #증권 #보험 #페이<br>
						#할부금융 #통신 # 공공기관
					</p>
				</a>


				<hr>
				
				<a href="javascript:void(0)" role="button" class="round_box_color bg02" @click="openGovConnect()" v-show="false">
					<!-- 공공 정보 연결 display: none; 처리 -->
					<div class="tit_wrap">
						<strong class="com_pop_tit01">공공 정보 연결</strong>
					</div>
					<p class="round_in_txt">공공 기관의 행정 정보를 한 번에 연결</p>
					<div class="in_btn_box">
						<span class="btn_round_new line_ty">건강보험</span>
						<span class="btn_round_new line_ty">국민연금</span>
						<span class="btn_round_new line_ty">공무원연금</span>
						<span class="btn_round_new line_ty">지방세</span>
						<span class="btn_round_new line_ty">국세</span>
						<span class="btn_round_new line_ty">관세 등</span>
					</div>
				</a>

				<div class="tit_wrap">
					<strong class="com_pop_tit01">기타 자산 추가</strong>
				</div>
				<div class="mt15">
					<ul class="com_radio_type03">
						<li>
							<a href="javascript:void(0)" role="button" class="btn_grey_white" @click="openRlAssetPop('Rlest', $event)">부동산</a>
						</li>
						<li>
							<a href="javascript:void(0)" role="button" class="btn_grey_white" @click="openRlAssetPop('Car', $event)">자동차</a>
						</li>
						<li>
							<a href="javascript:void(0)" role="button" class="btn_grey_white" @click="openRlAssetPop('Cash', $event)">현금</a>
						</li>
						<li>
							<a href="javascript:void(0)" role="button" class="btn_grey_white" @click="openRlAssetPop('Curr', $event)">외화</a>
						</li>
						<!-- <li>
							<a href="javascript:void(0)" role="button" class="btn_grey_white" @click="openRlAssetPop('Loan', $event)">빌린돈</a>
						</li> -->
						<li>
							<a href="javascript:void(0)" role="button" class="btn_grey_white" @click="openRlAssetPop('Gold', $event)">금</a>
						</li>
						<!-- <li>
							<a href="javascript:void(0)" role="button" class="btn_grey_white" @click="openRlAssetPop('Etc', $event)">기타</a>
						</li> -->
						<li>
							<a href="javascript:void(0)" role="button" class="btn_grey_white" @click="openRlAssetPop('Agri', $event)">농기계</a>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="closeAllData(true)"><span class="blind">팝업닫기</span></a>
		<!-- <div class="popup_header">    
			<h1>자산등록</h1>
		</div>
		<div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner com_ com_line_type01 com_top_type04">
				<strong class="com_pop_tit01">자산등록 방법을 선택하세요.</strong>
				<br>
				<strong class="com_pop_tit01" @click="goSample()">[[[[[인증 샘플 선택화면]]]]]</strong>
				<div class="com_box_type07 bg_mint mt15">
					<a href="javascript:void(0);" role="button" @click="openDetailPop('ALL')">
						<p class="txt_box">인증서로 본인 인증 후 여러 개 기관<br><em>한번에 등록</em></p>
					</a>
				</div>

				<div class="com_box_type07 bg_purple mt15">
					<a href="javascript:void(0);" role="button" @click="openDetailPop()">
						<p class="txt_box">기관별 인증을 통해<br><em>개별 등록</em></p>
					</a>
				</div>
			</div>

			<div class="com_inner com_boxarea_type01">
				<strong class="com_cont_tit01">실물자산 직접 등록</strong>
				<ul class="com_slide_check_type04">
					<li>
						<div class="btn_radio">
							<input type="radio" name="one_direct" id="radio01" aria-hidden="true" @click="openRlAssetPop('CORE4201', $event)">
							<label for="radio01" role="radio" >
								<i class="one_direct_01"><span class="blind">부동산</span></i>
								<span>부동산</span>				
							</label>	
						</div>	
					</li>
					<li>
						<div class="btn_radio">
							<input type="radio" name="one_direct" id="radio02" aria-hidden="true" @click="openRlAssetPop('COCA2101', $event)">
							<label for="radio02" role="radio" >
								<i class="one_direct_02"><span class="blind">자동차</span></i>
								<span>자동차</span>							
							</label>	
						</div>	
					</li>
					<li>
						<div class="btn_radio">
							<input type="radio" name="one_direct" id="radio03" aria-hidden="true" @click="openRlAssetPop('COOA1101', $event)">
							<label for="radio03" role="radio" >
								<i class="one_direct_03"><span class="blind">현금</span></i>
								<span>현금</span>					
							</label>	
						</div>	
					</li>
					<li>
						<div class="btn_radio">
							<input type="radio" name="one_direct" id="radio04" aria-hidden="true" @click="openRlAssetPop('COOA2103', $event)">
							<label for="radio04" role="radio" >
								<i class="one_direct_04"><span class="blind">외화</span></i>
								<span>외화</span>			
							</label>	
						</div>	
					</li>
					<li>
						<div class="btn_radio">
							<input type="radio" name="one_direct" id="radio05" aria-hidden="true" @click="openRlAssetPop('COOA4105', $event)">
							<label for="radio05" role="radio" >
								<i class="one_direct_05"><span class="blind">금</span></i>
								<span>금</span>								
							</label>	
						</div>	
					</li>
					<li>
						<div class="btn_radio">
							<input type="radio" name="one_direct" id="radio06" aria-hidden="true" @click="openRlAssetPop('COOA1107', $event)">
							<label for="radio06" role="radio" >
								<i class="one_direct_06"><span class="blind">기타</span></i>
								<span>기타</span>							
							</label>	
						</div>	
					</li>
					<li>
						<div class="btn_radio">
							<input type="radio" name="one_direct" id="radio07" aria-hidden="true" @click="openRlAssetPop('COOA1108', $event)">
							<label for="radio07" role="radio" >
								<i class="one_direct_07"><span class="blind">빌린돈</span></i>
								<span>빌린돈</span>			
							</label>	
						</div>	
					</li>
					<template v-if="personalAgreeYn">
					<li>
						<div class="btn_radio">
							<input type="radio" name="one_direct" id="radio08" aria-hidden="true" @click="openRlAssetPop('COAR0024', $event)">
							<label for="radio08" role="radio" >
								<i class="one_direct_08"><span class="blind">사설인증</span></i>
								<span>사설인증</span>			
							</label>	
						</div>	
					</li>
					</template>
				</ul>
			</div>
		</div>
		<a href="javascript:void(0);" role="button" class="btn_close" @click="closeAllData(true)"><span class="blind">팝업닫기</span></a>		 -->
		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'

import apiService from '@/service/apiService'
import appService from '@/service/appService'

import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'
import COCA2101 from '@/views/page/CO/CA/COCA2101/COCA2101'


import {mapGetters} from 'vuex'
import COAR2019 from '@/views/page/CO/AR/COAR2019/COAR2019'

import CORE4201 from '@/views/page/CO/RE/CORE4201/CORE4201'
import COOA2001 from '@/views/page/CO/OA/COOA2001/COOA2001'
import COOA2103 from '@/views/page/CO/OA/COOA2103/COOA2103'
import COOA2003 from '@/views/page/CO/OA/COOA2003/COOA2003'
import COOA4105 from '@/views/page/CO/OA/COOA4105/COOA4105'
import COOA2005 from '@/views/page/CO/OA/COOA2005/COOA2005'
import COOA2006 from '@/views/page/CO/OA/COOA2006/COOA2006'
import COAR2007 from '@/views/page/CO/AR/COAR2007/COAR2007'

import AuthSampleLink from '@/views/page/CO/AR/AuthSampleLink/AuthSampleLink'

import _ from 'lodash'

export default {
    name : "COAR2001",
    data: () => {
        return {
            listViewYn 	 : false		//그래프 노출 여부
        }
	},
	beforeMount() {
		//commonMixin의 updated가 실행되지 않아 직접호출(=화면갱신이 안되는경우.)
		//웹접근성관련 호출
		this.callJQueryWebAccessibility()
	},
    mounted() {
		this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     
    },
    mixins: [
		commonMixin,
        popupMixin
	],
	computed:{
		personalAgreeYn(){
			console.log(this.getUserInfo('crmCusno'))
			if (import.meta.env.VITE_ENV !== 'R' && this.getUserInfo('crmCusno') === 1020072737)
			{
				return true
			}else{
				return false
			}
		},
        ...mapGetters('myassets', [
            'myAssetsBzRgCnt'
		])
	},
    methods: {
		localTT() {
			return window.location.host.indexOf('localhost') > -1 ? true : false
		},
		goSample() {
			const config = {
				component : AuthSampleLink
			}
			modalService.openPopup(config)
		},
        initComponent() {
            this.getData();
        },
        getData() {
			// 자산연결 이어하기 여부 체크 -> tobe) 자산연결 클릭 시 체크
			// this.fn_continueChk()
		},

		openDetailPop(type) {
			console.log(type)
			let compName = "";
			console.log('데이터 확인 :: ',this.myAssetsBzRgCnt)
			if(this.myAssetsBzRgCnt > 0){
				if(type == "ALL") {
					console.log("통합인증!")
				}
				var param = {}
				const config = {
					component: compName,
					params : param
				}
				modalService.openPopup(config).then(response => {
					console.log(response)
					this.getData();
				})
			}else{
				console.log("마이데이터 첫 등록 시 사용되는 분기문")
				// compName = COAR0025
				// const config = {
				// 	component: compName,
				// 	params : {}
				// }
				// modalService.openPopup(config).then(response => {
				// 	console.log('다녀온 후 데이터 확인', response)
				// 	if(response === true){
				// 		if(type == "ALL") {
				// 			compName = COAR0002
				// 		}else{
				// 			compName = COAR0010
				// 		}
				// 		const config = {
				// 			component: compName,
				// 			params : {}
				// 		}
				// 		modalService.openPopup(config).then(response => {
				// 			console.log(response)
				// 			this.getData();
				// 		})
				// 	}
				// 	// this.getData();
				// })
			}


        },
        movePage() {
            
		},
		openRlAssetPop(popId, e) {
			let popName = ""
			if(e !== null) e.target.checked = false	//(07.21 추가) 라디오 check효과 해제

			switch(popId) {
				case 'Rlest':
					popName = CORE4201	// 부동산
					break
				case 'Car':
					popName = COCA2101	// 자동차
					break
				case 'Cash':
					popName = COOA2001	// 현금
					break
				case 'Curr':
					popName = COOA2103	// 외화
					break
				case 'Loan':
					popName = COOA2003	// 빌린돈
					break
				case 'Gold':
					popName = COOA4105	// 금
					break
				case 'Etc':
					popName = COOA2005	// 기타
					break
				case 'Agri':
					popName = COOA2006  // 농기계
					break
				case 'COAR0024':
					// popName = COAR0024	// 사설인증
					break	
			}

			if ( window.location.host.indexOf('localhost') > -1 && popId==='COAR0024')
            {
				alert('로컬에서는 사설인증 테스트가 불가능합니다.')
				return false
			}

			if(popId==='COAR0024')
			{
				const config = {"method" : "myDataSign"} //파라미터 필수
				if(this.getUserInfo('chnl') === '385'){
					appService.openPFMOFPFinCert(config).then(response => {
						console.log('스팽 사설인증 웹뷰 호출',  response)
						
					})
				}else{
					appService.cokBankOpenPFMOFPFinCert(config).then(response => {
						console.log('콕뱅 사설인증 웹뷰 호출',  response)
						
					})
				}
				
			}
			let config = {}
			if(popId === 'COAR0024') {
				config = {
					component: popName,
					params: {"popId":popId}
				}
			} else {
				config = {
					component: popName,
					params: {"assetId":popId}
				}
			}
			modalService.openPopup(config).then(response=>{
				if(response !== "" && response !== undefined) {
					this.openRlAssetPop(response, null)
				}
			})
		},

		// tobe) 이전 자산연결 프로세스 여부 확인 후 자산 연결 팝업 오픈
		openAssetConnect() {
			// 이어하기 여부 체크
			const config = {
				url : "/co/ar/00r01",
				data : {
					"mydtCusno" : this.getUserInfo("mydtCusno")
				}
			}
			apiService.call(config).then(response => {
				console.log(response)
				if(response.error !== '0') {
					console.log("진행중이던 토큰 존재")
					this.fn_continue(response)
				} else {
					const config_new = {
						component : COAR2002
					}
					modalService.openPopup(config_new)
				}
			})
		},

		// 자산연결 이어하기 확인 슬라이드팝업 오픈
		fn_continue(conData) {
			const config = {
				renderer: {
					component: COAR2019,
					cdata : {
						"continueFlag" : "continue",
						"continueData" : conData
					}
				}
			}
			modalService.openSlidePagePopup(config).then(response => {
				console.log(response)
				if(response === "continue") {
					console.log("한번에등록 이어하기 진행")
					// console.log("==== 준비중입니다. COAR2007연결 ====")
					const config_continue = {
						component : COAR2007,
						params : {
							"continueFlag" : "continue",
							"continueData" : conData,
							"selectedCnt" :  _.uniqBy(JSON.parse(conData.error_description) , 'org_code').length
						}
					}
					modalService.openPopup(config_continue)
				} else {
					const config = {
						component : COAR2002
					}
					modalService.openPopup(config)
				}
			})
		},
    },
    components : {
    }
}


</script>