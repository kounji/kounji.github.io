<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 대출 한도 계산기
* @ 페이지설명 : 연금절세 > 대출 한도 계산기
* @ 파일명     : src/views/page/PD/PD/PDPD4061/PDPD4061.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-06
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-06              CS541013              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view">
        <!-- content -->
			<div id="content">
				<div class="loan_cal dsr">
					<div class="tit_area">
						<p class="sub_txt">대출계획이 필요하신가요?</p>
						<h2 class="headline"><strong>대출한도를<br>간편하게 확인해보세요.</strong></h2>
					</div>
					<div class="btn_wrap">
						<button type="button" class="btns gray" @click="openDsrInfoPopup">DSR이란?</button>
					</div>
					<div class="img_area">
						<img src="@/assets_v40/images/img/img_dsr_cal.png" alt="">
					</div>
					<details class="ico_detail_noti">
						<summary><strong>알아두세요</strong></summary>
						<div class="cont">
							<ul class="dotted_list">
								<li>해당 계산결과는 실제대출로 상이할 수 있는 참고용 자료이므로, 정확한 대출 가능여부 및 한도 확인은 농축협 영업점과 NH콕뱅크에서 실제 대출심사를 통해 확인하실 수 있습니다.</li>
								<li>본 대출한도(DSR) 계산기는 고객님의 자금운영을 돕기 위한 모의 계산서비스로, 사용 사실이 고객님의 신용정보에 영향을 주지 않으니 안심하시고 사용하셔도 됩니다.</li>
							</ul>
						</div>
					</details>
				</div>

				<div class="loan_cal section">
					<div class="tit_area">
						<h3 class="headline sm"><strong>DSR 계산을 위한 소득 및<br>희망하는 대출정보가 필요해요.</strong></h3>
					</div>

					<div :class="incomeErrorText ? 'formItem error' : 'formItem'">
						<label for="loan_cal_01">연소득</label>
						<span class="info_txt">연소득입력범위 : 100만원 ~ 1000억원</span>
						<div class="input">
							<input type="text" name="" id="loan_cal_01" v-model="income" ref="income" required="" placeholder="연소득을 입력해 주세요." @input="onIncomeInput">
							<span class="unit">만원</span>
						</div>
						<div class="btns_wrap">
							<button type="button" class="btns" @click.prevent="btnIncomeEvt(100)">+100만</button>
							<button type="button" class="btns" @click.prevent="btnIncomeEvt(500)">+500만</button>
							<button type="button" class="btns" @click.prevent="btnIncomeEvt(1000)">+1000만</button>
							<button type="button" class="btns" @click.prevent="btnIncomeEvt(10000)">+1억</button>
						</div>
						<span class="han"><span class="blind">입력금액확인</span> 
							<div v-if="incomeInKorean"> {{ incomeInKorean }} </div>
						</span>
						<span class="error_txt" v-if="incomeErrorText">100만원이상 입력해 주세요.</span>
					</div>

					<div class="formItem">
						<span class="label">희망대출선택</span>
						<!-- 3100 : 신용대출   3220 : 주택담보대출 -->
						<div class="radio_box_group">
							<div class="radio">
								<input type="radio" name="loan_agree" id="loan_agree1" v-model="acTpDsc" value="3100">
								<label for="loan_agree1">신용대출</label>
							</div>
							<div class="radio">
								<input type="radio" name="loan_agree" id="loan_agree2" v-model="acTpDsc" value="3220">
								<label for="loan_agree2">주택담보대출</label>
							</div>
						</div>
					</div>

					<div :class="lnAmErrorText ? 'formItem error' : 'formItem'">
						<label for="loan_cal_02">희망대출금액</label>
						<span class="info_txt">대출금액범위 : 100만원 ~ 1000억원</span>
						<div class="input">
							<input type="text" name="" id="loan_cal_02" v-model="lnAm" ref="lnAm" required="" placeholder="희망대출금액을 입력해주세요." @input="onLnAmInput">
							<span class="unit">만원</span>
						</div>
						<div class="btns_wrap">
							<button type="button" class="btns" @click.prevent="btnLnAmEvt(100)">+100만</button>
							<button type="button" class="btns" @click.prevent="btnLnAmEvt(500)">+500만</button>
							<button type="button" class="btns" @click.prevent="btnLnAmEvt(1000)">+1000만</button>
							<button type="button" class="btns" @click.prevent="btnLnAmEvt(10000)">+1억</button>
						</div>
						<span class="han"><span class="blind">입력금액확인</span> 
							<div v-if="lnAmInKorean"> {{ lnAmInKorean }} </div>
						</span>
						<span class="error_txt" v-if="lnAmErrorText">100만원이상 입력해 주세요.</span>
					</div>

					<div :class="lnDtErrorText ? 'formItem error' : 'formItem'">
						<label for="loan_cal_03">대출기간</label>
						<span class="info_txt">대출기간범위 : 6개월 ~ 600개월</span>
						<div class="input">
							<input type="text" name="" id="loan_cal_03" v-model="lnDt" ref="lnDt" required="" placeholder="대출기간을 입력해주세요." @input="onLnDtInput">
							<span class="unit">개월</span>
						</div>
						<div class="btns_wrap">
							<button type="button" class="btns" @click.prevent="btnLnDtEvt(12)">+1년</button>
							<button type="button" class="btns" @click.prevent="btnLnDtEvt(24)">+2년</button>
							<button type="button" class="btns" @click.prevent="btnLnDtEvt(36)">+3년</button>
							<button type="button" class="btns" @click.prevent="btnLnDtEvt(120)">+10년</button>
						</div>
						<span class="error_txt">6개월 이상 입력해 주세요.</span>
					</div>

					<div :class="lnIntErrorText ? 'formItem error' : 'formItem'">
						<label for="loan_cal_04">대출이자율</label>
						<span class="info_txt">대출이자율범위 : 1% ~ 30%</span>
						<div class="input">
							<input type="text" name="" id="loan_cal_04" v-model="lnInt" ref="lnInt" required="" placeholder="대출이자율을 입력해주세요." @input="onLnIntInput">
							<span class="unit">%</span>
						</div>
						<div class="btns_wrap">
							<button type="button" class="btns" @click.prevent="btnLnIntEvt(0.5)">+0.5%</button>
							<button type="button" class="btns" @click.prevent="btnLnIntEvt(1.0)">+1.0%</button>
							<button type="button" class="btns" @click.prevent="btnLnIntEvt(2.0)">+2.0%</button>
							<button type="button" class="btns" @click.prevent="btnLnIntEvt(4.0)">+4.0%</button>
						</div>
						<span class="error_txt">1% 이상 입력해 주세요.</span>
					</div>
				</div>

				<div class="loan_cal section">
					<div class="tit_area">
						<h3 class="headline sm"><strong>보유중인 대출이에요.</strong></h3>
					</div>
					<!-- case1. 보유대출 있는 경우 
					[아이콘]
					.ico_loan01 : 전세보증금 담보대출
					.ico_loan02 : 주택 담보대출
					.ico_loan03 : 비주택 담보대출
					.ico_loan04 : 기타 담보대출
					.ico_loan05 : 유가증권 담보대출
					.ico_loan06 : 장기 카드대출
					.ico_loan07 : 학자금 대출
					.ico_loan08 : 신용대출
					.ico_loan09 : 기타대출
					-->
					<div class="board_box">
						<template v-if="creditOut.length &gt; 0">
							<p class="sum">확인된 보유대출</p>

							<!-- 신용대출 -->
							<div class="cont" v-for="(creditOutObj, index) in creditOut" :key="'credit-' + index">
								<i :class="mapping[creditOutObj.acTpDsc]"></i>
								<p class="prod">{{creditOutObj.wrsnm}}</p>
								<strong class="price">{{creditOutObj.bac | numberFilter}} 원</strong>
								<p class="info"><span class="interest">연 {{creditOutObj.aplItr}} %</span><span class="period">({{getMonthsDifference(creditOutObj.lnDt, creditOutObj.dueDt)}}개월)</span></p>
							</div>
							<p class="info_txt">보유한 대출 중 보험대출의 경우 마지막 납부한 월의 이자율로 반영되므로 금액이 다를 수 있습니다.</p>
							<div class="btns_wrap">
								<button type="button" class="btns md gray"><span class="icon_line_right sm" @click.prevent="fnRegisterAsset">자산 연결하기</span></button>
							</div>
						</template>

						<template v-else>
							<p class="sum black">확인된 보유대출이 없어요.</p>
							<div class="btns_wrap">
								<button type="button" class="btn_add_dot" @click.prevent="fnRegisterAsset">자산 연결하기</button>
							</div>
						</template>
					</div>

					<div class="board_box">
						<template v-if="localLoan.lnList.length &gt; 0">
							<p class="sum">내가 등록한 보유대출</p>
							<div class="cont" v-for="(item, index) in localLoan.lnList" :key="index">
								<i :class="mapping[item.acTpDsc]"></i>
								<p class="prod">{{item.acTpDsnm}}</p>
								<strong class="price">{{item.bac | numberFilter}}원</strong>
								<p class="info"><span class="interest">연 {{item.aplItr}}%</span><span class="period">({{item.lnTerm}}개월)</span></p>
								<!-- item.date -->
								<div class="btns_wrap">
									<button type="button" class="btns" @click.prevent="fnLocalRegister(item.sqno)">수정</button>
									<button type="button" class="btns" @click.prevent="fnLocalDelete(item.sqno)">삭제</button>
								</div>
								<!-- [v4.0] 25-02-25 마지막저장일자 추가 -->
								<p class="last_date">마지막 저장일자 : <span>{{fnChgFormat(item.date)}}</span></p>
								<!-- //[v4.0] 25-02-25 마지막저장일자 추가 -->
							</div>
							<div class="btns_wrap">
								<button type="button" class="btns md gray" @click.prevent="fnLocalRegister()"><span class="icon_line_right sm">보유대출 등록하기</span></button>
							</div>
						</template>

						<template v-else>
							<p class="sum black">내가 등록한 대출이 없어요.</p>
							<div class="btns_wrap">
								<button type="button" class="btn_add_dot" @click.prevent="fnLocalRegister()">보유대출 등록하기</button>
							</div>
						</template>
					</div>
					<!-- //case1. 보유대출 있는 경우 -->

					<div class="btns_wrap">
						<button type="button" class="btns lg primary" @click.prevent="openResult('PDPD4063')" :disabled="btnOnOff == 'btn_off' ? true : false">DSR 계산하기</button>
					</div> 
				</div>

			</div>
			<!--// content -->
    </page>
</template>

<script>

import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {keyupNumFormat} from '@/utils/number'
import {dayDiff, dateFormat} from '@/utils/date'

// import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002' 	// 자산 연결 popup
import PDPD4062 from '@/views/page/PD/PD/PDPD4062/PDPD4062' 	// 보유 대출 등록/수정
import PDPD4064 from '@/views/page/PD/PD/PDPD4064/PDPD4064' 	// dsr_info popup

import commonService from '@/service/commonService'
import Template from '../../../XX/template/template.vue'

export default {
    name : "PDPD4061",
	data: () => {
        return {
			income					: "",	 		// 연소득
			incomeInKorean			: "",	 		// 한글로 변환된 연소득
            lnAm                    : "",    		// 대출금액
			lnAmInKorean			: "",	 		// 한글로 변환된 대출금액
			lnDt                    : "",    		// 대출기간
			lnInt                   : "",    		// 대출이자
			acTpDsc					: "",			// 대출코드

			incomeErrorText			: "",			// 연소득 입력 오류 메시지
			lnAmErrorText			: "",			// 대출금액 입력 오류 메시지
			lnDtErrorText			: "",			// 대출기간 입력 오류 메시지
			lnIntErrorText			: "",			// 대출이자 입력 오류 메시지

			showIncomeButtons		: false, 		// 연소득 버튼 노출 여부
			showLoanAmountButtons	: false, 		// 대출 금액 버튼 노출 여부
			showLoanTermButtons		: false, 		// 대출 기간 버튼 노출 여부
			showInterestRateButtons	: false, 		// 대출 이자율 버튼 노출 여부

			mydtCusno           	: "",           // 마이데이터고객번호
            loanCnt             	: 0,            // 대출총계(갯수)
            loanAmnt            	: 0,            // 대출합계금액
            creditCnt           	: 0,            // 신용대출총계
            creditAmnt          	: 0,            // 신용대출합계금액
            mortagageOutCnt     	: 0,            // 담보대출총계
            mortagageOutAmnt    	: 0,            // 담보대출합계금액
            loanP2POutCnt       	: 0,            // P2P대출총계
            loanP2POutAmnt      	: 0,            // P2P대출합계금액
            bondOutCnt          	: 0,            // 채권대출총계
            bondOutAmnt         	: 0,            // 채권대출합계금액
            creditOut           	: [],           // 대출정보
            mortagageOut        	: [],           // 담보대출정보
            loanP2POut          	: [],           // P2P대출정보
            bondOut             	: [],           // 채권대출정보
            // 모든 대출목록의 정렬기준은 대출실행일자, 회차 내림차순

			loanType				: '',			// 대출유형코드

			// 내가 등록한 보유대출
			localLoan               : {},           // 객체

			mapping                 : {},           // 아이콘 배열
			nameMapping				: {},			// 대출이름

			creditLoanResult		: 0,			// 신용대출 DSR 계산 결과
			securedLoanResult		: 0,			// 주택담보대출 DSR 계산 결과
			totalLoanResult			: 0,			// DSR 계산 결과
		}
	},
	created() {
        this.initComponent()
    },
	mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)    
    },
	computed: {
		btnOnOff() {
			return (this.income === "" || this.acTpDsc === "" || this.lnAm === "" || this.lnDt === "" || this.lnInt === "") ? "btn_off" : "";
		}
	},
	mixins: [
		popupMixin,
        commonMixin
    ],
	methods: {
		initComponent() {
            this.mydtCusno  = this.getUserInfo('mydtCusno')
            this.getData()      // 보유대출 데이터
			this.getLocalData() // 내가 등록한 보유대출

			console.log("--------------chan", this.getUserInfo('chnl'));
        },
        // 보유대출 데이터
        getData() {
			this.mapping = {'3100':'ico ico_loan08',
					'3150':'ico ico_loan07',
					'3210':'ico ico_loan05',
					'3220':'ico ico_loan02',
					'3230':'ico ico_loan03',
					'3240':'ico ico_loan03',
					'3250':'ico ico_loan03',
					'3260':'ico ico_loan03',
					'3271':'ico ico_loan01',
					'3290':'ico ico_loan04',
					'3999':'ico ico_loan09'}
            // 실제 구현

			const config = {
                url: '/pd/pd/61r01',
                data: {
                        mydtCusno: this.mydtCusno
                }
            };
            apiService.call(config).then(response => {
                console.log("========/pd/pd/61r01=======",response)
                this.loanCnt            = response.loanCnt || 0
                this.loanAmnt           = response.loanAmnt || 0
                
                //this.creditOut          = response.loanListOut || []
				let tmpCredit          = response.loanListOut || []

				let tmpTerm = {'3100':60, '3150':12, '3210':96, '3230':96, '3240':96, '3050':96, '3260':96, '3271':48, '3290':120}
				//lnTerm
				let nowDay = new Date();
				let yyyy = nowDay.getFullYear()
				let mm   = Number(nowDay.getMonth() + 1) < 10 ? "0" + Number(nowDay.getMonth() + 1) : "" + Number(nowDay.getMonth() + 1)
				let dd   = Number(nowDay.getDate())  < 10 ? "0" + Number(nowDay.getDate())  : "" + Number(nowDay.getDate())

				tmpCredit.forEach((el, idx) => {
					if(el.acTpDsc == '3220') {
						tmpCredit[idx].lnTerm = this.getMonthsDifference(yyyy+""+mm+""+dd, el.dueDt)
					} else {
						tmpCredit[idx].lnTerm = tmpTerm[this.creditOut.acTpDsc]
					}
					tmpCredit[idx].dsc    = '1' // 1:확인대출, 2:보유대출
				})

				this.creditOut = tmpCredit

                this.callJQueryFncExcute()
            });

/*
            const config = {
                url: '/as/ln/01r02',
                data: {
                        mydtCusno: this.mydtCusno
                }
            };
            apiService.call(config).then(response => {
                console.log("========/as/ln/01r02=======",response)
                this.loanCnt            = response.loanCnt || 0
                this.loanAmnt           = response.loanAmnt || 0
                this.creditCnt          = response.creditCnt || 0
                this.creditAmnt         = response.creditAmnt || 0
                this.mortagageOutCnt    = response.mortagageOutCnt || 0
                this.mortagageOutAmnt   = response.mortagageOutAmnt || 0
                this.loanP2POutCnt      = response.loanP2POutCnt || 0
                this.loanP2POutAmnt     = response.loanP2POutAmnt || 0
                this.bondOutCnt         = response.bondOutCnt || 0
                this.bondOutAmnt        = response.bondOutAmnt || 0
                this.creditOut          = response.creditOut || []
                this.mortagageOut       = response.mortagageOut || []
                this.loanP2POut         = response.loanP2POut || []
                this.bondOut            = response.bondOut || []

                this.callJQueryFncExcute()
            });
*/			
		
        },
		// Dsr_info popup
        openDsrInfoPopup() {
            const config = {
                component: PDPD4064,
                params : {}
            }
            modalService.openPopup(config).then((response) => {
                console.log("PDPD4064 close popup", response)
            })
        },
		// 입력받은 금액을 한글로 변환
		numberToKorean(num) {
			if(!num) return '';
			
			const units = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
			const levels = ['', '십', '백', '천'];
			let number = Number(num);
			let result = '';
			let temp = '';
			let level = 0;
			
			if(number >= 10000){	// 억 이상 단위
				let tempNumber = Math.floor(number / 10000);
				
				while(tempNumber){
					if(tempNumber % 10){
						temp = units[tempNumber % 10] + levels[level] + temp;
					}

					tempNumber = Math.floor(tempNumber / 10);
					level++;
				}
				temp += '억'

				result += temp;
				number %= 10000;
			}

			temp = '';
			level = 0;

			if(number){
				let tempNumber = number;

				while(tempNumber){
					if(tempNumber % 10){
						temp = units[tempNumber % 10] + levels[level] + temp;
					}

					tempNumber = Math.floor(tempNumber / 10);
					level++;
				}
				temp += '만'

				result += temp;
			}

			result += '원';
			return result;
/*
			if(!num) return '';

			let number = Number(num);
			let result = '';

			// 억 단위
			if(number >= 10000) {
				const billions = Math.floor(number / 10000);
				result += billions + '억';
				number %= 10000;
			}

			// 만 단위
			if(number > 0) {
				const tenThousands = Math.floor(number);
				result += tenThousands + '만';
			}

			result += '원';
			return result;
*/
		},
		onIncomeInput() {
			this.income = this.removeComma(this.income);

			// 0을 입력하면 한번만 입력되게 유지
			// 맨 앞자리가 0인 경우 0은 제외한 숫자로 표시
			if(this.income.startsWith(0) && this.income.length > 1) {
				this.income = this.income.slice(1);
			}

			if(parseInt(this.income) < 100) {
				this.incomeErrorText = '100만원이상 입력해 주세요.';
			} else {
				this.incomeErrorText = '';
			}
			
			// 연소득 금액이 최대값에 도달하면 최대값(1000억)으로 유지
			if(parseInt(this.income) > 10000000){
				this.income = 10000000;
			}

			// 입력받은 희망대출금액을 한글로 변환
			this.incomeInKorean = this.numberToKorean(this.income);

			// 대출 금액 입력시 실시가능로 콤마처리
            this.income = this.addComma(this.income);
		},
        onLnAmInput() {
            this.lnAm = this.removeComma(this.lnAm);

			// 0을 입력하면 한번만 입력되게 유지
			// 맨 앞자리가 0인 경우 0은 제외한 숫자로 표시
			if(this.lnAm.startsWith(0) && this.lnAm.length > 1) {
				this.lnAm = this.lnAm.slice(1);
			}

			if(parseInt(this.lnAm) < 100) {
				this.lnAmErrorText = '100만원이상 입력해 주세요.';
			} else {
				this.lnAmErrorText = '';
			}

			// 대출 금액이 최대값에 도달하면 최대값(1000억)으로 유지
			if(parseInt(this.lnAm) > 10000000){
				this.lnAm = 10000000;
			}

			// 입력받은 희망대출금액을 한글로 변환
			this.lnAmInKorean = this.numberToKorean(this.lnAm);

			// 대출 금액 입력시 실시가능로 콤마처리
            this.lnAm = this.addComma(this.lnAm);
        },
		onLnDtInput() {
			// this.lnDt = this.checkInputNum(this.lnDt, 'lnDt');
			this.lnDt = this.removeComma(String(this.lnDt));

			// 0을 입력하면 한번만 입력되게 유지
			// 맨 앞자리가 0인 경우 0은 제외한 숫자로 표시
			if(this.lnDt.startsWith(0) && this.lnDt.length > 1) {
				this.lnDt = this.lnDt.slice(1);
			}

			if(parseInt(this.lnDt) < 6) {
				this.lnDtErrorText = '6개월 이상 입력해 주세요.';
			} else {
				this.lnDtErrorText = '';
			}

			// 대출 기간이 최대값에 도달하면 최대값(600개월)으로 유지
			if(parseInt(this.lnDt) > 600){
				this.lnDt = 600;
			}
		},
		onLnIntInput() {
			this.lnInt = this.checkInputNum(this.lnInt, 'lnInt');

			if(parseInt(this.lnInt) < 1) {
				this.lnIntErrorText = '1% 이상 입력해 주세요.';
			} else {
				this.lnIntErrorText = '';
			}

			// 대출 이자율이 최대값에 도달하면 최대값(10%)으로 유지
			if(parseFloat(this.lnInt) > 30){
				this.lnInt = 30;
			}
		},
		// 연소득 버튼 이벤트
		btnIncomeEvt(amount) {
			let curIncome = parseFloat(this.removeComma(this.income)) || 0;
			
			curIncome += amount;

			if(parseInt(curIncome) < 100) {
				this.incomeErrorText = '100만원이상 입력해 주세요.';
			} else {
				this.incomeErrorText = '';
			}

			// 최대금액 100,000,000,000 이상인 경우 최대값 고정
            if(curIncome >= 10000000) {
                curIncome = 10000000;
            }

			// 입력받은 희망대출금액을 한글로 변환
			this.incomeInKorean = this.numberToKorean(curIncome);

            this.income = this.addComma(curIncome);
		},
		// 대출금액 버튼 이벤트
        btnLnAmEvt(amount) {
            let curAm = parseFloat(this.removeComma(this.lnAm)) || 0;

            curAm += amount;

			if(parseInt(curAm) < 100) {
				this.lnAmErrorText = '100만원이상 입력해 주세요.';
			} else {
				this.lnAmErrorText = '';
			}

            // 최대금액 100,000,000,000 이상인 경우 최대값 고정
            if(curAm >= 10000000) {
                curAm = 10000000;
            }

			// 입력받은 희망대출금액을 한글로 변환
			this.lnAmInKorean = this.numberToKorean(curAm);

            this.lnAm = this.addComma(curAm);
        },
		// 대출기간 버튼 이벤트
        btnLnDtEvt(amount) {
            let curDt = Number(this.removeComma(this.lnDt)) || 0;

            curDt += amount;

			if(parseInt(curDt) < 6) {
				this.lnDtErrorText = '6개월 이상 입력해 주세요.';
			} else {
				this.lnDtErrorText = '';
			}

            // 대출기간 600 이상인 경우 최대값 고정
            if(curDt >= 600) {
                curDt = 600;
            }

            this.lnDt = this.addComma(curDt);
        },
		// 대출이자 버튼 이벤트
        btnLnIntEvt(amount) {
            let curInt = parseFloat(this.lnInt) || 0;

            curInt += amount;

			if(parseInt(curInt) < 1) {
				this.lnIntErrorText = '1% 이상 입력해 주세요.';
			} else {
				this.lnIntErrorText = '';
			}

            // 대출이자 10 이상인 경우 최대값 고정
            if(curInt >= 30) {
                curInt = 30;
            }

            this.lnInt = String(curInt);
        },
		addComma(value) {
            if(!value) return '';
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        removeComma(value) {
            return value.toString().replace(/[^0-9]/g, '');
        },
		checkInputNum(value, type){
			if(type === 'lnDt') {
				return value.replace(/[^0-9]/g, '');
			}
			else if(type === 'lnInt'){
				const dotCnt = (value.match(/\./g) || []).length;
				if(dotCnt > 1){
					value = value.substring(0, value.lastIndexOf('.'));
				}

				value = value.replace(/[^0-9.]/g, '')

				// 소수점 앞에 숫자 없으면 "0" 추가
				if(value.startsWith(".")) {
					value = "0" + value;
				}

				// 소수점 둘째 자리까지만 허용
				value = value.replace(/^(\d+)(\.\d{0,2})?.*$/, "$1$2");
				
				return value;
			}
		},
		showButtons(field){
			if(field === 'income'){						// 연소득 금액 버튼 노출
				this.showIncomeButtons = true;
				this.showLoanAmountButtons = false;
				this.showLoanTermButtons = false;
				this.showInterestRateButtons = false;
			} else if(field === 'loanAmount'){			// 대출 금액 버튼 노출
				this.showIncomeButtons = false;
				this.showLoanAmountButtons = true;
				this.showLoanTermButtons = false;
				this.showInterestRateButtons = false;
			} else if( field === 'loanTerm'){			// 대출 기간 버튼 노출
				this.showIncomeButtons = false;
				this.showLoanAmountButtons = false;
				this.showLoanTermButtons = true;
				this.showInterestRateButtons = false;
			} else if(field === 'interestRate'){		// 대출 이자율 버튼 노출
				this.showIncomeButtons = false;
				this.showLoanAmountButtons = false;
				this.showLoanTermButtons = false;
				this.showInterestRateButtons = true;
			}
		}, 
		getMonthsDifference(date1, date2){
			// date1과 date2 문자열을 Date 객체로 변환
			let startDate = new Date(this.convertToDate(date1));
			let endDate =  new Date(this.convertToDate(date2));

			// 두 날짜 간의 연도 차이 계산
			let years = endDate.getFullYear() - startDate.getFullYear();

			// 두 날짜 간의 월 차이 계산
			let months = endDate.getMonth() - startDate.getMonth();	

			// 총 개월 수 반환
			return years * 12 + months;
		},
		convertToDate(dateStr) {
			// 'YYYYMMDD' 형식을 'YYYY-MM-DD' 형식으로 변환
			const year = dateStr.slice(0, 4);
			const month = dateStr.slice(4, 6);
			const day = dateStr.slice(6, 8);
			
			let result = year + "-" + month + "-" + day;

			return result;
		},
		calculateLoan() {
			// 희망대출 계산
			console.log("@@@ 확인 =>", this.creditOut)
			console.log("@@@ 등록 =>", this.localLoan.lnList)

			let mergeList = [...this.creditOut, ...this.localLoan.lnList]

			// mergeList.push({acTpDsc : this.acTpDsc, actpDsnm: this.nameMapping[this.acTpDsc], aplItr: this.lnInt, bac: this.lnAm, date: this.lnDt})

			console.log("mergeList", mergeList);
			mergeList.forEach((row, idx)=>{
				if(row.acTpDsc == "3100" || row.acTpDsc == "3150") {
					this.creditLoanResult += Number(row.bac) / Number(row.lnTerm) / 12 + Number(row.bac)*Number(row.aplItr*0.01)
				} else {
					this.securedLoanResult += Number(row.bac) / Number(row.lnTerm) / 12 + Number(row.bac)*Number(row.aplItr*0.01)
				}
				this.totalLoanResult += Number(row.bac) / Number(row.lnTerm) / 12 + Number(row.bac)*Number(row.aplItr*0.01)

				console.log("@@@ 현재 =>", this.securedLoanResult)
			})

			// 희망대출
			const lnAm = parseFloat(this.removeComma(this.lnAm));
            const lnDt = parseFloat(this.removeComma(this.lnDt));
            const lnInt = parseFloat(this.removeComma(this.lnInt));

			if(this.acTpDsc == "3100" || this.acTpDsc == "3150") {
				this.creditLoanResult += Number(parseFloat(this.removeComma(lnAm)) * 10000) / Number(lnDt) / 12 + Number(parseFloat(this.removeComma(lnAm)) * 10000) * Number(lnInt * 0.01)
			} else {
				this.securedLoanResult += Number(parseFloat(this.removeComma(lnAm)) * 10000) / Number(lnDt) / 12 + Number(parseFloat(this.removeComma(lnAm)) * 10000) * Number(lnInt * 0.01)
			}
			this.totalLoanResult += Number(parseFloat(this.removeComma(lnAm)) * 10000) / Number(lnDt) / 12 + Number(parseFloat(this.removeComma(lnAm)) * 10000) * Number(lnInt * 0.01)

			this.creditLoanResult = (this.creditLoanResult / (this.removeComma(this.income) *10000) * 100).toFixed(2)
			this.securedLoanResult = (this.securedLoanResult / (this.removeComma(this.income) *10000) * 100).toFixed(2)
			this.totalLoanResult = (this.totalLoanResult / (this.removeComma(this.income) *10000) * 100).toFixed(2)
			console.log("@@@ 신용 =>", this.creditLoanResult, "주택 =>", this.securedLoanResult)
			console.log("@@@ 총 =>", this.totalLoanResult)
		},
		openResult(pageId) {
			// 대출금액, 대출기간, 대출이자율의 조건이 충족이 되지 않을 경우
			if(this.income < 100 || this.lnAm < 100 || this.lnInt < 1 || (this.lnDt < 6)){
				modalService.alert("계산할 수 없어요. <br>입력값을 확인해주세요.")
				return;
			}

			this.calculateLoan();
			
			let param = {
				income 				: this.income,
				lnAm 				: this.lnAm,
				lnDt 				: this.lnDt,
				lnInt 				: this.lnInt,
				acTpDsc				: this.acTpDsc,

				creditLoanResult 	: this.creditLoanResult,
				securedLoanResult 	: this.securedLoanResult,
				totalLoanResult		: this.totalLoanResult,
				dsrResult			: this.acTpDsc === '3100' ? this.creditLoanResult : this.securedLoanResult,
			}

			const config = {
				name : pageId,
				params : param
			}
			
			// close();
			commonService.movePage(config);
		},
		fn_movePage(pageId, param) {
			let result = this.calculateLoan();
			
			let params = {}
            params = param

			const config = {
				name : pageId,
				params : params
			}
			
			//this.close();
			commonService.movePage(config);
		},
		getLocalData() {
			let localKey = "loan" + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + "V4";
            this.localLoan = commonService.getStorage(localKey);

			// 초기화
			// 등록한 보유대출이 없는 경우
			if(Object.keys(this.localLoan).length == 0) {
				this.localLoan = {
					sqno: 0,
					lnList: []
				}
			}
		},
		// 등록/수정
		fnLocalRegister(sqno) {
			const config = {
				component: PDPD4062,
				params   : sqno != null && sqno != undefined && sqno != "" ? sqno : null
			}
			
			modalService.openPopup(config).then(response => {
				if(response == "refresh") {
					this.getLocalData()
				}
			})
		},
		// 삭제
		fnLocalDelete(sqno) {
			// 삭제할 인덱스
			// modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {});
			let idx = this.localLoan.lnList.findIndex(function (item) {
				return item.sqno == sqno
			})

			this.localLoan.lnList.splice(idx, 1);	// 삭제할 인덱스 1개 삭제

			 let localKey = "loan" + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + "V4";
			commonService.setStorage(localKey, this.localLoan);
		},
		fnRegisterAsset() {
			const config = {
				component: COAR4002,
				params : {}
			}
			modalService.openPopup(config).then(response => {
				console.log("COAR4002 close popup", response)
			})
		},
		fnChgFormat(date) {
			return dateFormat(date, 'YYYY.MM.DD')
		}
    },
    components: {
		Page,
        FootersV2
        // Template,
	}
}
</script>