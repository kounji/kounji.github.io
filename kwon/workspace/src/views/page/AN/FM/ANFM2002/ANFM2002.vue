<!--
/*************************************************************************
* @ 서비스경로 : 제휴서비스 > 귀농귀촌
* @ 페이지설명 : 귀농귀촌 > 귀농준비 자가진단
* @ 파일명     : src/views/page/AN/FM/ANFM2002/ANFM2002.vue
* @ 작성자     : CS528205
* @ 작성일     : 2022-08-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-19              CS528205              최초작성 
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">귀농준비 자가진단</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content com_no_bottom" id="scrollDiv"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_top_type02">
				<strong class="com_pop_tit01">
					내가 귀농ㆍ귀촌을 준비하는데<br/>부족한 것은 무엇일까요?
				</strong>
			</div>
			<div class="com_inner">
				<p class="com_txtinfo_type01 mt0">항목별 1~5 점수로 답변하면 진단결과를 볼 수 있어요!</p>

                <div v-for="(question, idx) in questionList" :key="idx" class="question_check_box">
					<p class="question_txt">{{question}}</p>
					<div class="answer_wrap">
						<div class="answer_box">
							<div class="answer_radio">
								<input type="radio" :name="'radio'+idx" :id="'radio01'+idx" v-on:click="setAnswer(idx, 1)" :disabled="showResult">
								<label :for="'radio01'+idx">
									<span>매우아니다</span>
								</label>
							</div>
							<div class="answer_radio">
								<input type="radio" :name="'radio'+idx" :id="'radio02'+idx" v-on:click="setAnswer(idx, 2)" :disabled="showResult">
								<label :for="'radio02'+idx">
									<span>아니다</span>
								</label>
							</div>
							<div class="answer_radio">
                                <input type="radio" :name="'radio'+idx" :id="'radio03'+idx" v-on:click="setAnswer(idx, 3)" :disabled="showResult">
								<label :for="'radio03'+idx">
									<span>보통</span>
								</label>
							</div>
							<div class="answer_radio">
                                <input type="radio" :name="'radio'+idx" :id="'radio04'+idx" v-on:click="setAnswer(idx, 4)" :disabled="showResult">
								<label :for="'radio04'+idx">
									<span>그렇다</span>
								</label>
							</div>
							<div class="answer_radio">
                                <input type="radio" :name="'radio'+idx" :id="'radio05'+idx" v-on:click="setAnswer(idx, 5)" :disabled="showResult">
								<label :for="'radio05'+idx">
									<span>매우그렇다</span>
								</label>
							</div>
						</div>
						<span class="answer_bar"></span>
					</div>
				</div>
				<div class="btn_full_box">
					<a href="javascript:void(0);" role="button" class="btn btn_off" aria-disabled="true" v-if="isResultBtnDisabled" >결과보기</a><!-- 비활성화 class btn_off / 22-10-20 btn_off aria-disabled="true" 없을때 aria-disabled="false" -->
					<a href="javascript:void(0);" role="button" class="btn btn_mint" aria-disabled="false" @click="showTestResult()" v-else>결과보기</a>
				</div>				
				<div v-show="showResult" class="com_box_type01 custom_list diagnostic_result_wrap" ref="resultDiv">
					<div class="new_tit_area">
						<div class="tit"><span>진단 결과</span></div>
					</div>
					<div class="diagnostic_result">
						<!-- 기본 희망 / ty02 = 초보 / ty03 = 예비 -->
						<!-- 희망 귀농인 -->
						<div v-if="testResult === '01'" class="result_txt_wrap">
							<strong class="result_tit">
								당신은 <em>{{testResultTotal}}</em>점!<br/>
								<span class="com_point_mint">희망 귀농인</span>
								이에요!
							</strong>
							<p>
								귀농하기까지 갖추어야 할 것이 많이 남아 있지만, 장기적인 계획을 갖고 교육기관이나 전문가와의 상담을 통해 준비를 해 나간다면 좋은 성과들이 나타날 것입니다.
							</p>
						</div>
						<!-- //희망 귀농인 -->

						<!-- 초보 귀농인 -->
						<div v-else-if="testResult === '02'" class="result_txt_wrap ty02">
							<strong class="result_tit">
								당신은 <em>{{testResultTotal}}</em>점!<br/>
								<span class="com_point_mint">초보 귀농인</span>
								이에요!
							</strong>
							<p>
								귀농에 대한 기본적인 이해도나 적응 준비는 되어 있다고 생각됩니다. 목표가 명확해지면 귀농에 대한 망설임이 보다 명확해질 거라고 봅니다.
							</p>
						</div>
						<!-- //초보 귀농인 -->

						<!-- 예비 귀농인 -->
						<div  v-else-if="testResult === '03'" class="result_txt_wrap ty03">
							<strong class="result_tit">
								당신은 <em>{{testResultTotal}}</em>점!<br/>
								<span class="com_point_mint">예비 귀농인</span>
								이에요!
							</strong>
							<p>
								귀농에 대한 적응력이나 의욕, 준비정도가 상당히 높은 것으로 판단되어지며, 귀농조건은 일단 갖추어졌다고 보여 집니다.
							</p>
						</div>
						<!-- //예비 귀농인 -->
						<div class="diagnostic_result_list">
							<ul>
								<li v-if="testResult === '01'">
									<a href="javascript:void(0)" role="button" class="ico01" @click="openPopup('ANFM2006')">
										귀농인<br/>전문교육
									</a>
								</li>
								<li v-if="testResult !== '03'">
									<a href="javascript:void(0)" role="button" class="ico02" @click="openPopup('ANFM2003', 1)">
										맞춤 농지<br/>추천
									</a>
								</li>
								<li>
									<a href="javascript:void(0)" role="button" class="ico03" @click="openPopup('ANFM2005')">
										영농 자금<br/>지원
									</a>
								</li>
								<li v-if="testResult === '01'">
									<a href="javascript:void(0)" role="button" class="ico04" @click="openWebBrowser('https://www.nongsaro.go.kr/portal/farmTechMain.ps?menuId=PS65291&stdPrdlstCode=VC031006')">
										희망 작물<br/>찾기
									</a>
								</li>
								<li>
									<!-- 마이농가 > 정책자금 화면으로 이동 -->
									<a href="javascript:void(0)" role="button" class="ico05" @click="closeAll('SZPC2101')"> 
										지자체<br/>지원사업
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll()"><span class="blind">팝업닫기</span></a>		
    </div>
</template>

<script>
    import apiService from '@/service/apiService'
	import modalService from '@/service/modalService'
	import appService from '@/service/appService'
	import popupMixin from '@/common/mixins/popupMixin'

    import {answerBar} from '@/utils/slick'
	
    import ANFM2006 from '@/views/page/AN/FM/ANFM2006/ANFM2006'
	import ANFM2005 from '@/views/page/AN/FM/ANFM2005/ANFM2005'
	import ANFM2003 from '@/views/page/AN/FM/ANFM2003/ANFM2003'

    import commonMixin from '@/common/mixins/commonMixin'

    export default {
        name : "ANFM2002",
        data: () => {
            return {
				questionList : [], 			// 문항 리스트
				answerList : [],			// 0 : 선택안함, 1 : 매우아니다, 2 : 아니다, 3 : 보통, 4 : 그렇다, 5 : 매우그렇다
				showResult : false,
				checkedAll : false,
				isResultBtnDisabled : true,
				testResult : "",				// 01 : 희망, 02 : 초보, 03 : 예비
				testResultTotal : 0
            }
		},
		computed : {
			
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
        methods: {
			/**
			 * 진단결과 div 로 스크롤
			 */
			scrollToResultDiv() {
				this.$nextTick(() => {
					const resultDiv = this.$refs.resultDiv

					if (resultDiv != undefined) {
						var top = resultDiv.offsetTop;
						$('#scrollDiv').animate({scrollTop : top, duration : 500})
					}
				})
			},
			checkResultBtnDisabled() {
				if (this.checkedAll) {
					if (this.showResult)
						this.isResultBtnDisabled = true
					else 
						this.isResultBtnDisabled = false
				} else {
					this.isResultBtnDisabled = true
				}
			},
            initComponent() {
                // 문항 리스트 초기화
                this.questionList = ['귀농인이 되기 위한 과정에서 고려사항을 긍정적으로 판단하고 있나요?',
										'낯선 환경에서 외부인과 소통에 어려움이나 거부감은 없었나요?',
										'농촌체험 등의 경험으로 농업에 대한 호감도가 높은 편인가요?',
										'농업에 대한 가족간의 충분한 대화를 통한 동의가 있었나요?',
										'재배할 작물 및 정착지에 대한 다양한 정보를 수집하고 있나요?',
										'최소 1~3년간 생활할 수 있는 여유자금을 확보한 상태인가요?',
										'농산물 경작 및 판매에 대한 전문적 지식과 계획을 수립했나요?',
										'농지 소유 및 영농(회계)에 대한 관련 법규를 숙지하고 있나요?',
										'주거지에서 농지 이동간에 불편한 환경을 감안하고 있나요?',
										'희망 지역의 농촌문화를 직ㆍ간접적으로 많이 알고 있나요?']
				for(var i = 0; i < this.questionList.length; i++) {
					this.answerList.push(0);	// 0 : 선택안함
				}

				this.$nextTick(() => {
					answerBar()
				})
			},
			/**
			 * 진단결과 보여주기
			 */
            showTestResult() {
				var total = 0
				for (var i = 0; i < this.answerList.length; i++) {
					total += this.answerList[i]
				}

				if (total >= 47) {				// 예비귀농인
					this.testResult = '03'
				} else if (total >= 38) {		// 초보귀농인
					this.testResult = '02'
				} else {						// 희망귀농인
					this.testResult = '01'
				}

				this.testResultTotal = total
				this.showResult = true
				this.checkResultBtnDisabled()
				this.scrollToResultDiv()
			},
			setAnswer(idx, value) {
				if (this.answerList.length > idx) {
					this.answerList[idx] = value

					this.checkAnswerList()
					this.checkResultBtnDisabled()
				}	
			},
			/**
			 * 선택하지않은 문항 존재여부 확인
			 */
			checkAnswerList() {
				for (var i = 0; i < this.answerList.length; i++) {
					if (this.answerList[i] === 0) {
						this.checkedAll = false
						return
					}
				}
				this.checkedAll = true
			},		
			openPopup(popupId, params) {
                let compName = null
                if (popupId === 'ANFM2006') {
                    compName = ANFM2006
                } else if(popupId === 'ANFM2005') {
                    compName = ANFM2005
				} else if(popupId === 'ANFM2003') {
                    compName = ANFM2003
				}

                if (compName === null) {
                    console.log("미구현 화면 :: ", popupId)
                    return
                }

                const config = {
                    component: compName,
                    params : params
                }
                modalService.openPopup(config)
            },
            openWebBrowser(url) {
                if (this.getUserInfo('chnl') === '385') {
                    appService.executeBrowser(url);
                } else {
                    appService.cokBankOpenPopupWebBrowser(url);
                }
            },
        }
    }

</script>