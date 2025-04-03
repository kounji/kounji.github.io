<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 대출이자 계산기
* @ 페이지설명 : 연금절세 > 대출이자 계산기
* @ 파일명     : src/views/page/PD/PD/PDPD4051/PDPD4051.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-20
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-20              CS541013              최초작성
*************************************************************************/
-->
<template>
	<page class="content-view">
		
		<!--
		<div class="com_tabmenu_type01">
			<ul role="tablist">
				<li><a href="#nolink">나의 노후준비</a></li>
				<li><a href="#nolink">연말정산 공제금액</a></li>
				<li><a href="#nolink">세금 납부 확인</a></li>
				<li><a href="#nolink">건강보험 가입내역</a></li>
				<li><a href="#nolink">데일리 금융브리핑</a></li>
				<li class="on"><a href="#nolink">대출이자 계산기</a></li>
				<li><a href="#nolink">대출한도 계산기</a></li>
			</ul>
		</div>
		-->
		
		<!-- content --> 
			<div id="content"> 
				<div class="loan_cal">
					<div class="tit_area">
						<p class="sub_txt">대출계획이 필요하신가요?</p>
						<h2 class="headline"><strong>대출이자를<br>간편하게 확인해보세요.</strong></h2>
					</div>

					<div :class="lnAmErrorText ? 'formItem error' : 'formItem'">
						<label for="loan_cal_01">희망대출금액</label>
						<span class="info_txt">대출금액범위 : 100만원 ~ 1000억원</span>
						<div class="input">
							<input type="text" name="" id="loan_cal_01" v-model="lnAm" ref="lnAm" required="" placeholder="희망대출금액을 입력해 주세요." @input="onLnAmInput" @focus="showButtons('loanAmount')">
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
						<label for="loan_cal_02">대출기간</label>
						<span class="info_txt">대출기간범위 : 6개월 ~ 600개월</span>
						<div class="input">
							<input type="text" name="" id="loan_cal_02" v-model="lnDt" ref="lnDt" required="" placeholder="대출기간을 입력해 주세요." @input="onLnDtInput" @focus="showButtons('loanTerm')">
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
						<label for="loan_cal_03">대출이자율</label>
						<span class="info_txt">대출이자율 범위 : 1~30%</span>
						<div class="input">
							<input type="text" name="" id="loan_cal_03" v-model="lnInt" ref="lnInt" required="" placeholder="대출이자율을 입력해 주세요." @input="onLnIntInput" @focus="showButtons('interestRate')">
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

					<div class="btns_wrap">
						<button type="button" class="btns lg primary" :class="btnOnOff" @click.prevent="calculateLoan" :disabled="btnOnOff == 'btn_off' ? true : false">계산하기</button>
					</div>
				</div>

				<!-- 대출이자 계산 결과 -->
				<div class="loan_cal section" v-if="showResult">
					<div class="top_area">
						<button type="button" class="btn_repay" @click="openDsrInfoPopup">상환방식 알아보기</button>
					</div>
					<ul role="tablist" class="inner_tab gray">
						<li class="on" aria-controls="tab_01"><button type="button" role="tab" aria-selected="true" @click="selectBtnOnOff(true)">원리금 균등상환</button></li>
						<li aria-controls="tab_02"><button type="button" role="tab" aria-selected="false" @click="selectBtnOnOff(false)">원금 균등상환</button></li>
					</ul>
					<!-- 원리금 균등상환/원금 균등상환 탭데이터만 변경되고 내용 동일 -->
					<!-- tab1 : 원리금 균등상환 start -->
					<div id="tab_01" role="tabpanel" class="cmm-tab-panel on">
						<div class="result_box">

							<!-- 원리금 균등상환 -->
							<template v-if="isPAndI">
								<p class="total">
								<span class="txt">총 상환금액은 <span class="pin purple"> {{ lnDt }} 개월 </span></span>
								<strong class="price"><em> {{ ResultaddComma(pAndITotal) }} </em> 원</strong>
							</p>
							<ul class="detail">
								<li>
									<span class="key">내가 빌린 원금은</span>
									<strong class="val"> {{ ResultaddComma(removeComma(lnAm) * 10000) }} 원 </strong>
								</li>
								<li>
									<span class="key">만기까지 총 이자는</span>
									<strong class="val"> {{ ResultaddComma(pAndITotal - removeComma(lnAm) * 10000) }} 원 </strong>
								</li>
							</ul>
							</template>

							<!-- 원금 균등상환 -->
							<template v-else>
								<p class="total">
									<span class="txt">총 상환금액은 <span class="pin purple"> {{ lnDt }} 개월 </span></span>
									<strong class="price"><em> {{ ResultaddComma(Math.round(principalTotal)) }} </em> 원</strong>
								</p>
								<ul class="detail">
									<li>
										<span class="key">내가 빌린 원금은</span>
										<strong class="val"> {{ ResultaddComma(removeComma(lnAm) * 10000) }} 원 </strong>
									</li>
									<li>
										<span class="key">만기까지 총 이자는</span>
										<strong class="val"> {{ ResultaddComma(Math.round(principalTotal) - removeComma(lnAm) * 10000) }} 원 </strong>
									</li>
								</ul>
							</template>
						</div>

						<div class="banner_area">
							<a href="#nolink" class="link_banner" @click.prevent="fn_movePage('PDPD1001')"><span>나에게 꼭 맞는 <br>대출 상품을 추천드려요</span></a>
						</div>

						<div class="result_detail">
							<strong class="h_tit01">월 상환금액</strong>
							<div class="tbl_point">
								<table>
									<caption>월 상환금액 표입니다</caption>
									<colgroup>
										<col style="width:auto">
										<col style="width:26%">
										<col style="width:26%">
										<col style="width:26%">
									</colgroup>
									<thead>
										<tr>
											<th scope="col"><span>회차</span></th>
											<th scope="col">납입원금</th>
											<th scope="col">대출이자</th>
											<th scope="col"><span>월 상환금</span></th>
										</tr>
									</thead>
									<tbody>
										<!-- 원금 균등상환 -->
										<template v-if="isPAndI">
											<!-- 처음 5회차만 보여주기 -->
											<tr v-for="(payment, index) in pAndILoanSchedule.slice(0, 5)" :key="index">
												<td>{{ index + 1 }} 회차</td>
												<td>{{ ResultaddComma(payment.principal) }} 원</td>
												<td>{{ ResultaddComma(payment.interest) }} 원</td>
												<td>{{ ResultaddComma(payment.totalPayment) }} 원</td>
											</tr>

											<!-- '더보기' 클릭 시 나머지 회차 전부 보여주기 -->
											<tr v-for="(payment, index) in pAndILoanSchedule.slice(5)" :key="'more-' + index" v-show="pAndIShowMore">
												<td>{{ index + 6 }} 회차</td>
												<td>{{ ResultaddComma(payment.principal) }} 원</td>
												<td>{{ ResultaddComma(payment.interest) }} 원</td>
												<td>{{ ResultaddComma(payment.totalPayment) }} 원</td>
											</tr>
										</template>

										<!-- 원금 균등상환 -->
										<template v-else>
											<!-- 처음 5회차만 보여주기 -->
											<tr v-for="(payment, index) in principalLoanSchedule.slice(0, 5)" :key="index">
												<td>{{ index + 1 }} 회차</td>
												<td>{{ ResultaddComma(payment.principal) }} 원</td>
												<td>{{ ResultaddComma(payment.interest) }} 원</td>
												<td>{{ ResultaddComma(payment.totalPayment) }} 원</td>
											</tr>

											<!-- '더보기' 클릭 시 나머지 회차 전부 보여주기 -->
											<tr v-for="(payment, index) in principalLoanSchedule.slice(5)" :key="'more-' + index" v-show="principalShowMore">
												<td>{{ index + 6 }} 회차</td>
												<td>{{ ResultaddComma(payment.principal) }} 원</td>
												<td>{{ ResultaddComma(payment.interest) }} 원</td>
												<td>{{ ResultaddComma(payment.totalPayment) }} 원</td>
											</tr>
										</template>
									</tbody>
								</table>

								<!-- <div class="btn_area">
									<button type="button" class="btn_more_txt" v-if="pAndILoanSchedule.length &gt; 5 && !pAndIShowMore" @click="pAndIShowMore = true">더보기</button>
									<button type="button" class="btn_more_txt" v-if="pAndIShowMore" @click="pAndIShowMore = false">접기</button>
								</div> -->

								<div class="btn_area">
									<!-- 원리금 균등상환 -->
									<template v-if="isPAndI">
										<input type="checkbox" id="num_info" v-model="chk1" @change.prevent="fnChk(true, $event, 0)" class="blind" title="회차별 월상환금액 전체보기">
										<label for="num_info">
											<span class="open" aria-hidden="true">더보기</span>
											<span class="close" aria-hidden="true">접기</span>
										</label>
									</template>

									<!-- 원금 균등상환 -->
									<template v-else>
										<input type="checkbox" id="num_info" v-model="chk2" @change.prevent="fnChk(false, $event, 1)" class="blind" title="회차별 월상환금액 전체보기">
										<label for="num_info">
											<span class="open" aria-hidden="true">더보기</span>
											<span class="close" aria-hidden="true">접기</span>
										</label>
									</template>
								</div>
								
							</div>
						</div>
					</div>
					<!-- tab1 : 원리금 균등상환 end -->
					<!-- tab2 : 원금 균등상환 start -->
					
					<!-- tab2 : 원금 균등상환 end -->

					<div class="gray_box">
						<ul class="dotted_list">
							<li>고객님의 이해를 돕기 위한 자료이며, 상품가입을 위해서는 개별상담이 필요합니다.</li>
						</ul>
					</div>

					<div class="btns_wrap">
						<button type="button" class="btns lg primary" @click.prevent="resetLoanCalculator">다시 계산하기</button>
					</div>

				</div>


			</div>
			<!--// content -->
		<footersV2 type="pd" />
		
	</page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import routerService from '@/service/routerService'

import PDPD4052 from '@/views/page/PD/PD/PDPD4052/PDPD4052' // 대출이자계산기 상환방식 popup

export default {
    name : "PDPD4051",
	data: () => {
        return {
            lnAm                    : "",    // 대출금액
			lnAmInKorean			: "",	 // 한글로 변환된 대출금액
			lnDt                    : "",    // 대출기간
			lnInt                   : "",    // 대출이자

			lnAmErrorText			: "",	 // 대출금액 입력 오류 메시지
			lnDtErrorText			: "",	 // 대출기간 입력 오류 메시지
			lnIntErrorText			: "",	 // 대출이자 입력 오류 메시지

            pAndIMonthlyPayment     : "",    // 원리금 균등상환 월 상환금
            pAndILoanSchedule       : [],    // 원리금 균등상환 월별 상환액
            pAndIShowMore           : false, // 원리금 더보기/접기 상태
			pAndITotal				: 0,	 // 원리금 균등상환 총금액

            principalMonthlyPayment : "",    // 원금 균등상환 월 상환금
            principalLoanSchedule   : [],    // 원금 균등상환 월별 상환액
            principalShowMore       : false, // 원금 더보기/접기 상태
			principalTotal			: 0,	 // 원금 균등상환 총금액
			
			isPAndI					: true,	 // 원리금 상환 탭 선택 여부
            showResult              : false, // 결과 화면 보이기 여부

			showLoanAmountButtons	: false, // 대출 금액 버튼 노출 여부
			showLoanTermButtons		: false, // 대출 기간 버튼 노출 여부
			showInterestRateButtons	: false, // 대출 이자율 버튼 노출 여부

			currentTab				: "1",	 // 원리금 균등상환, 원금 균등상환 탭 선택 상태

			chk1 : false,
			chk2 : false,
		}
	},
	computed: {
		btnOnOff() {
			return (this.lnAm === "" || this.lnDt === "" || this.lnInt === "") ? "btn_off" : ""
		},
	},
	mixins: [
        commonMixin
    ],
	methods: {
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

			// 대출 이자율이 최대값에 도달하면 최대값(30%)으로 유지
			if(parseFloat(this.lnInt) > 30){
				this.lnInt = 30;
			}
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

            // 대출이자 30 이상인 경우 최대값 고정
            if(curInt >= 30) {
                curInt = 30;
            }

            this.lnInt = String(curInt);
        },
        calculateLoan() {
			// 대출금액, 대출기간, 대출이자율 입력값이 null 이 있는 경우
			// if(this.lnAm === "" || this.lndt === "" || this.lnInt === "") {
			// 	modalService.alert("계산할 수 없어요. <br>입력값을 확인해주세요.")
			// 	return;
			// }

			// 대출금액, 대출기간, 대출이자율의 조건이 충족이 되지 않을 경우
			if(this.lnAm < 100) {
				modalService.alert("계산할 수 없어요. <br>입력값을 확인해주세요.")
				return;
			} else if(this.lnDt < 6) {
				modalService.alert("계산할 수 없어요. <br>입력값을 확인해주세요.")
				return;
			} else if(this.lnInt < 1) {
				modalService.alert("계산할 수 없어요. <br>입력값을 확인해주세요.")
				return;
			}

            const lnAm = parseFloat(this.removeComma(this.lnAm));
            const lnDt = parseFloat(this.removeComma(this.lnDt));
            const lnInt = parseFloat(this.removeComma(this.lnInt));

            // 원리금 균등상환 계산 start
            const monthlyRate = (this.lnInt / 100) / 12;    // 월 이자율
            // 월별 상환액      공식 : (원금 * 이자율 * (1 + 월 이자율)^대출기간(월) / ((1 + 월 이자율)^대출기간(월) - 1))
            //const pAndIMonthlyPayment = lnAm * 10000 * monthlyRate * Math.pow(1 + monthlyRate, this.lnDt) / (Math.pow(1 + monthlyRate, this.lnDt) - 1);
			let pAndIMonthlyPayment;

			if(lnInt === 0){
				pAndIMonthlyPayment = lnAm * 10000 / lnDt;
			} else {
				pAndIMonthlyPayment = lnAm * 10000 * monthlyRate * Math.pow(1 + monthlyRate, this.lnDt) / (Math.pow(1 + monthlyRate, this.lnDt) - 1);
			}


            this.pAndITotal = Math.round(pAndIMonthlyPayment * lnDt);
            let remainLoanAm = lnAm * 10000;
            this.pAndILoanSchedule = [];

            for(let i = 0; i < this.lnDt; i++){
                const interest = (remainLoanAm * monthlyRate);             // 각 월의 대출이자
                const principal = (pAndIMonthlyPayment - interest);        // 각 월의 납입원금
                const totalPayment = (pAndIMonthlyPayment);                // 각 월의 상환액

                remainLoanAm -= principal;

                this.pAndILoanSchedule.push({
                    interest: Math.round(interest),
                    principal: Math.round(principal),
                    totalPayment: Math.round(totalPayment)
                });
            }
            // 원리금 균등상환 계산 end


            // 원금 균등상환 계산 start
            const principalMonthlyPayment = lnAm * 10000 / lnDt;          // 원금 균등상환 월 납입 원금
			this.principalMonthlyPayment = Math.round(principalMonthlyPayment);
            remainLoanAm = lnAm * 10000;
            this.principalLoanSchedule = [];
			this.principalTotal = 0;

			for(let i = 0; i < this.lnDt; i++){
				const interest = remainLoanAm * monthlyRate;        // 각 월의 대출이자
				const principal = principalMonthlyPayment;        	// 각 월의 납입원금
				const totalPayment = principal + interest;    		// 각 월의 상환액

				this.principalTotal += totalPayment;
				remainLoanAm -= principal;

				this.principalLoanSchedule.push({
					interest: Math.round(interest),
                    principal: Math.round(principal),
                    totalPayment: Math.round(totalPayment)
				})
			}

			this.pAndIShowMore = false;
			this.principalShowMore = false;

            this.showResult = true;
        },
        // comma(value){
        //     return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // },
        addComma(value) {
            if(!value) return '';
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
		ResultaddComma(value) {
            if(!value) return '0';
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
        openDsrInfoPopup() {
            const config = {
                component: PDPD4052,
                params : {}
            }
            modalService.openPopup(config).then((response) => {
                console.log("PDPD4052 close popup", response)
            })
        },
		resetLoanCalculator() {
			this.lnAm = "",    						// 대출금액
			this.lnAmInKorean = "",	 				// 한글로 변환된 대출금액
			this.lnDt = "",    						// 대출기간
			this.lnInt = "",    					// 대출이자

            this.pAndIMonthlyPayment = "",			// 원리금 균등상환 월 상환금
            this.pAndILoanSchedule = [],    		// 원리금 균등상환 월별 상환액
            this.pAndIShowMore = false, 			// 원리금 더보기/접기 상태

            this.principalMonthlyPayment = "",		// 원금 균등상환 월 상환금
            this.principalLoanSchedule = [],    	// 원금 균등상환 월별 상환액
            this.principalShowMore = false, 		// 원금 더보기/접기 상태
			this.principalTotal = 0,	 			// 원금 균등상환 총금액

            this.showResult = false,  				// 결과 화면 보이기 여부

			this.showLoanAmountButtons = false,		// 대출 금액 버튼 노출 여부
			this.showLoanTermButtons = false,		// 대출 기간 버튼 노출 여부
			this.showInterestRateButtons = false,	// 대출 이자율 버튼 노출 여부

			
			this.$nextTick(() => {
				//window.scrollTo(0, 0);
				document.documentElement.scrollTop =0;
				document.body.scrollTop = 0;
			});
		},
		showButtons(field){
			if(field === 'loanAmount'){				// 대출 금액 버튼 노출
				this.showLoanAmountButtons = true;
				this.showLoanTermButtons = false;
				this.showInterestRateButtons = false;
			} else if( field === 'loanTerm'){		// 대출 기간 버튼 노출
				this.showLoanAmountButtons = false;
				this.showLoanTermButtons = true;
				this.showInterestRateButtons = false;
			} else if(field === 'interestRate'){	// 대출 이자율 버튼 노출
				this.showLoanAmountButtons = false;
				this.showLoanTermButtons = false;
				this.showInterestRateButtons = true;
			}
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
				params : param
			}
			// this.close()
			commonService.movePage(config);
		},
		selectBtnOnOff(flag) {
			if(flag) {
				this.isPAndI = true;
			} else {
				this.isPAndI = false;
			}
		},

		fnChk(flag, e, dsc) {
			if(flag) {
				this.pAndIShowMore = e.target.checked

				if(dsc != 0) {
					this.chk1 = dsc
				}
			} else {
				this.principalShowMore = e.target.checked

				if(dsc != 1) {
					this.chk2 = dsc
				}
			}
		}
	},
    watch: {
        
    },
	components: {
		Page,
        FootersV2
	}
}
</script>