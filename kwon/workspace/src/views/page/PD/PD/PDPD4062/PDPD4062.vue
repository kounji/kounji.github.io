<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 대출 한도 계산기
* @ 페이지설명 : 연금절세 > 대출 한도 계산기 > 보유대출 등록/수정
* @ 파일명     : src/views/page/PD/PD/PDPD4061/PDPD4061.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-19
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-19              CS541013              최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01" style="display:block;">
		<div class="popup_header">
			<h1>보유대출 등록 수정 </h1>
			<!-- 25-03-12 삭제 <button type="button" class="prev"><span class="blind">이전</span></button> -->
		</div>

		<div class="popup_content">
			<div class="loan_cal"> 
				<div class="tit_area">
					<h2 class="headline"><strong>보유대출을<br>등록해보세요.</strong></h2>
					<p class="s_txt">하나만 선택 가능해요.</p>
				</div> 
				
				<div class="radio_box_group dsr_cal">
					<div class="radio">
						<input type="radio" name="dsr_cal" id="dsr_cal1" v-model="acTpDsc" value="3271" :checked="acTpDsc == '3271'">
						<label for="dsr_cal1"><i class="ico_loan01"></i><span>전세보증금<br>담보대출</span></label>
					</div>
					<div class="radio">
						<input type="radio" name="dsr_cal" id="dsr_cal2" v-model="acTpDsc" value="3220" :checked="acTpDsc == '3220'" @change.prevent="chkLnDt">
						<label for="dsr_cal2"><i class="ico_loan02"></i><span>주택<br>담보대출</span></label>
					</div>
					<div class="radio">
						<input type="radio" name="dsr_cal" id="dsr_cal3" v-model="acTpDsc" value="3250" :checked="acTpDsc == '3250'">
						<label for="dsr_cal3"><i class="ico_loan03"></i><span>비주택<br>담보대출</span></label>
					</div>
					<div class="radio">
						<input type="radio" name="dsr_cal" id="dsr_cal4" v-model="acTpDsc" value="3290" :checked="acTpDsc == '3290'">
						<label for="dsr_cal4"><i class="ico_loan04"></i><span>기타<br>담보대출</span></label>
					</div>
					<div class="radio">
						<input type="radio" name="dsr_cal" id="dsr_cal5" v-model="acTpDsc" value="3210" :checked="acTpDsc == '3210'">
						<label for="dsr_cal5"><i class="ico_loan05"></i><span>유가증권<br>담보대출</span></label>
					</div>
					<!--
					<div class="radio">
						<input type="radio" name="dsr_cal" id="dsr_cal6">
						<label for="dsr_cal6"><i class="ico_loan06"></i><span>장기<br>카드대출</span></label>
					</div>
					-->
					<div class="radio">
						<input type="radio" name="dsr_cal" id="dsr_cal7" v-model="acTpDsc" value="3150" :checked="acTpDsc == '3150'">
						<label for="dsr_cal7"><i class="ico_loan07"></i><span>학자금<br>대출</span></label>
					</div>
					<div class="radio">
						<input type="radio" name="dsr_cal" id="dsr_cal8" v-model="acTpDsc" value="3100" :checked="acTpDsc == '3100'">
						<label for="dsr_cal8"><i class="ico_loan08"></i><span>신용대출</span></label>
					</div>
					<!-- [v4.0] 25-02-24 기타대출 삭제
					<div class="radio">
						<input type="radio" name="dsr_cal" id="dsr_cal9">
						<label for="dsr_cal9"><i class="ico_loan09"></i><span>기타대출</span></label>
					</div>
					-->
				</div>

				<div class="gray_box">
					<p class="dotted_list">전세자금대출, 예적금 담보대출, 보험계약대출은 DSR계산시 포함되지 않습니다.</p>
				</div>

				<div :class="lnAmErrorText ? 'formItem error' : 'formItem'">
					<label for="loan_cal_01">대출금액</label><!-- [v4.0] 25-02-24 문구수정 -->
					<span class="info_txt">대출금액범위 : 100만원 ~ 1000억원</span>
					<div class="input">
						<input type="text" inputmode="numeric" name="" id="loan_cal_01" v-model="lnAm" required="" placeholder="상환금액을 제외한 금액을 입력해 주세요." @input="onLnAmInput"><!-- [v4.0] 25-03-26 placeholder수정 -->
						<button type="button" class="clear_btn" :class="lnAm != '' && lnAm != null ? 'show' : ''" v-show="lnAm.length &gt; 0" @click.prevent="del('lnAm')"><span class="blind">삭제</span></button>
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

				<div :class="lnIntErrorText ? 'formItem error' : 'formItem'">
					<label for="loan_cal_02">대출 이자율(연 이자율)</label>
					<span class="info_txt">대출이자율 범위 : 1~30%</span>
					<div class="input">
						<input type="text" inputmode="decimal" name="" id="loan_cal_02" v-model="lnInt" required="" placeholder="대출이자율을 입력해 주세요." @input="onLnIntInput">
						<button type="button" class="clear_btn" :class="lnInt != '' && lnInt != null ? 'show' : ''" v-show="lnInt.length &gt; 0" @click.prevent="del('lnInt')"><span class="blind">삭제</span></button>
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

				<!-- case. 주택담보대출 선택시에만 노출 -->
				<div :class="lnDtErrorText ? 'formItem error' : 'formItem'" v-if="acTpDsc == '3220'">
					<label for="loan_cal_03">대출기간</label>
					<span class="info_txt">대출기간범위 : 6개월 ~ 600개월</span>
					<div class="input">
						<input type="text" inputmode="numeric" name="" id="loan_cal_03" v-model="lnDt" required="" placeholder="대출기간을 입력해 주세요." @input="onLnDtInput">
						<button type="button" class="clear_btn" :class="lnDt != '' && lnDt != null ? 'show' : ''" v-show="lnDt.length &gt; 0" @click.prevent="del('lnDt')"><span class="blind">삭제</span></button>
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
				<!-- //case. 주택담보대출 선택시에만 노출 -->

				<div class="btns_wrap">
					<button type="button" class="btns lg primary" @click.prevent="fnInsert(flag)" :disabled="btnOnOff == 'btn_off' ? true : false">{{flag?"수정":"등록"}}</button>
				</div>

			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'

export default {
    name: "PDPD4062",
	data: () => {
        return {
			localLoan 				: {},

			flag     				: false, 	// true: 수정, false: 등록
			idx      				: -1,		// 수정할 idx

			acTpDsc  				: "", 		// 대출구분코드
			lnAm	  				: "",  		// 대출금액
			lnAmInKorean			: "",	 	// 한글로 변환된 대출금액
			lnInt	 				: "",  		// 대출이자율
			lnDt					: "",  		// 대출기간(개월)

			lnAmErrorText			: "",	 	// 대출금액 입력 오류 메시지
			lnDtErrorText			: "",	 	// 대출기간 입력 오류 메시지
			lnIntErrorText			: "",	 	// 대출이자 입력 오류 메시지

			localKey 				: "", 		// 로컬 스토리지 key
			mapping  				: {}		// 아이콘 배열
		}
	},
	mixins: [
        popupMixin,
		commonMixin
    ],
	mounted() {
		this.initComponent(this.params)
		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
	},
	computed: {
		btnOnOff() {
			// return (this.lnAm === "" || this.lnDt === "" || this.lnInt === "" || this.acTpDsc === "") ? "btn_off" : ""

			if(this.acTpDsc === "") {
				return "btn_off"
			}
			else if(this.acTpDsc == '3220') {
				return (this.lnAm === "" || this.lnDt === "" || this.lnInt === "") ? "btn_off" : ""
			}
			else {
				return (this.lnAm === "" || this.lnInt === "") ? "btn_off" : ""
			}
		},
	},
    methods: {
		initComponent(param) {
			this.mapping = {"3100":"신용대출", "3150":"학자금대출", "3210":"유가증권 담보대출",
							"3220":"주택담보대출", "3230":"비주택 담보대출", "3240":"비주택 담보대출",
							"3250":"비주택 담보대출", "3260":"비주택 담보대출","3271":"전세보증금 담보대출",
							"3290":"기타 담보대출", "3999":"기타 대출"}

			console.log("===== chn", this.getUserInfo('chnl'))

			this.localKey = "loan" + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + "V4";
			
			if(param != null) {
				this.flag = true;	// true: 수정, false: 등록
				this.getData(param) // 수정용
				console.log("@@@1111=>",this.lnAm)
				console.log("@@@2222=>",this.numberToKorean(this.lnAm))
				this.lnAmInKorean = this.numberToKorean(this.lnAm);
				console.log("@@@3 =>", this.lnAmInKorean)
			}
		},

		// 수정이라 데이터 뿌려줌
		getData(sqno) {
			if(sqno != null) { // check
            	this.localLoan = commonService.getStorage(this.localKey);
				
				this.idx = this.localLoan.lnList.findIndex(function (item) {
					return item.sqno == sqno
				})

				this.acTpDsc  = this.localLoan.lnList[this.idx].acTpDsc
				this.lnAm	  = this.addComma(this.removeComma(this.localLoan.lnList[this.idx].bac) / 10000)
				this.lnInt    = this.localLoan.lnList[this.idx].aplItr
				this.lnDt     = this.localLoan.lnList[this.idx].lnTerm
			}
		},

		// 등록
		fnInsert(flag) {
			// 대출금액, 대출기간, 대출이자율의 조건이 충족이 되지 않을 경우
			if(this.lnAm < 100 || this.lnInt < 1 || (this.lnDt < 6 && this.acTpDsc == '3220')) {
				modalService.alert("계산할 수 없어요. <br>입력값을 확인해 주세요.")
				return;
			}
			
			let nowDay = new Date();
			let yyyy = nowDay.getFullYear()
			let mm   = Number(nowDay.getMonth() + 1) < 10 ? "0" + Number(nowDay.getMonth() + 1) : "" + Number(nowDay.getMonth() + 1)
			let dd   = Number(nowDay.getDate())  < 10 ? "0" + Number(nowDay.getDate())  : "" + Number(nowDay.getDate())

			this.localLoan = commonService.getStorage(this.localKey);

			// 등록한 보유대출이 없는 경우
			if(Object.keys(this.localLoan).length == 0 && !flag) {
				this.localLoan = {
					sqno: 0,
					lnList: []
				}
			}

			let tmpTerm = {'3100':60, '3150':12, '3210':96, '3230':96, '3240':96, '3250':96, '3260':96, '3271':48, '3290':120}

			if(flag) { // 수정
				if(this.idx < 0) {
					// 로컬에서 수정할 row가 없는 경우
				} else {
					// 수정 가능한 경우
					this.localLoan.lnList[this.idx].acTpDsc  = this.acTpDsc
					this.localLoan.lnList[this.idx].acTpDsnm = this.mapping[this.acTpDsc]
					this.localLoan.lnList[this.idx].bac  = this.removeComma(this.lnAm) * 10000
					this.localLoan.lnList[this.idx].aplItr = this.lnInt
					this.localLoan.lnList[this.idx].lnTerm   = this.acTpDsc === '3220' ? this.lnDt : tmpTerm[this.acTpDsc];
					this.localLoan.lnList[this.idx].date     = yyyy+mm+dd
					this.localLoan.lnList[this.idx].dsc     = '2'

					commonService.setStorage(this.localKey, this.localLoan);

					this.close('refresh')
				}
			} else {   // 등록
				console.log("@@@ 저장")
				let tmpSqno = this.localLoan.sqno

				let row = {
						sqno     : tmpSqno + 1,
						date     : yyyy+mm+dd,
						acTpDsc  : this.acTpDsc,
						acTpDsnm : this.mapping[this.acTpDsc],
						bac  : this.removeComma(this.lnAm) * 10000,
						aplItr : this.lnInt,
						lnTerm   : this.acTpDsc === '3220' ? this.lnDt : tmpTerm[this.acTpDsc],
						dsc     :'2'
					}

				this.localLoan.lnList.push(row)
				this.localLoan.sqno = this.localLoan.sqno + 1

				commonService.setStorage(this.localKey, this.localLoan);

				this.close('refresh')
			}
		},
		// 입력받은 금액을 한글로 변환
		numberToKorean(num) {
			if(!num) return '';
			
			const units = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
			const levels = ['', '십', '백', '천'];
			let number = Number(this.removeComma(num));
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
			console.log("@@@1 =>", this.lnAmInKorean)

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

			this.lnDt = this.addComma(this.lnDt);
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

			this.lnInt = String(this.lnInt);
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
			console.log("@@@2 =>", this.lnAmInKorean)

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
		chkLnDt () {
			if(this.acTpDsc == '3220')
				this.lnDt = "";
		},
		del(type) {
			if(type === 'lnAm') {
				this.lnAm = ""
				this.lnAmErrorText = '';
				this.lnAmInKorean = '';
			}
			else if(type === 'lnDt') {
				this.lnDt = ""
				this.lnDtErrorText = '';
			}
			else if(type === 'lnInt') {
				this.lnInt = ""
				this.lnIntErrorText = '';
			}
		},
    },
}
</script>