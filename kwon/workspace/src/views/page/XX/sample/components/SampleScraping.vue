<template>
  <div>
		<div>
			<h2>공통</h2>
			<button @click="getAllScrapingJob">전체 스크래핑</button>
			<button @click="getScrapingTarget">스크래핑 대상기관정보</button>
			<button @click="stopScraping">스크래핑 정지</button>
			<button @click="test">convert</button>
		</div>
		<div>
			<h2>은행</h2>
			<p>
				<span>은행선택</span>
				<button @click="openSelectBank">{{ bank || '은행선택' }}</button>
			</p>
			<button @click="getAllBankInfo()">은행전체조회</button>
			<button @click="getAllBankInfo(bank)">선택한 은행전체조회</button>
		</div>
		<div>
			<h2>카드</h2>
			<p>
				<span>카드선택</span>
				<button @click="openSelectCard">{{ card || '카드선택' }}</button>
			</p>
			<button @click="getAllCardInfo()">카드전체조회</button>
			<button @click="getAllCardInfo(card)">선택한 카드전체조회</button>
		</div>
		<div>
			<h2>증권</h2>
			<p>
				<span>증권선택</span>
				<button @click="openSelectStock">{{ stock || '증권선택' }}</button>
			</p>
			<button @click="getAllStockInfo()">증권 전체 조회</button>
			<button @click="getAllStockInfo(stock)">선택한 증권 전체 조회</button>
		</div>
		<div>
			<h2>보험</h2>
			<p>
				<span>보험선택</span>
				<button @click="openSelectInsurance">{{ insurance || '보험선택' }}</button>
			</p>
			<button @click="getAllInsuranceInfo()">보험전체조회</button>
			<button @click="getAllInsuranceInfo(insurance)">선택한 보험전체조회</button>
		</div>
		<div>
			<h2>연금</h2>
			<button @click="getAllEstimateInfo()">연금 전체 조회</button>
		</div>
		<div>
			<h2>부동산</h2>
			<button @click="getAddressList">부동산주소목록조회</button>
			<button @click="getQuotesList">부동산시세조회</button>
		</div>
		<div>
			<h2>신용정보</h2>
			<button @click="registKcb">신용정보등록</button>
			<button @click="saveKcb">신용정보조회</button>
		</div>
		<div>
			<h2>Result</h2>
			<p>isRunning : {{ isRunning('20') }}</p>
			<p>scrapingList : {{ scrapingList }}</p>
		</div>
		<div>
			<h2>콕뱅크인증서조회</h2>
			<button @click="getCokCertList"></button>
		</div>		
  </div>
</template>

<script>
	// import commonService from '@/service/commonService.js'
	// import store from '@/store'
	import configService from '@/service/configService.js'
	import scrapingService from '@/service/scrapingService.js'
	import modalService from '@/service/modalService'
	import convert from '@/common/scraping/convert'
  import {mapGetters, mapActions} from 'vuex'
	import commonMixin from '@/common/mixins/commonMixin'

  export default {
    name: 'SampleScraping',
		computed: {
      ...mapGetters('scraping', [
        'targetList', // 자산 스크래핑 대상기관정보
        'scrapingList', // 스크래핑 상태
        'isRunning', // 스크래핑 상태
      ])
    },
		data: function() {
			return {
				response: {},
				response2: {
					a: 1,
					list: [
						{nane: 'xxxx'}
					]
				},
				bank: 'kbstar',
				card: 'kbcard',
				stock: 'kbcard',
				insurance: 'kbinsure',
			}
		},
    methods: {
      ...mapActions('scraping', [
        'getAllScrapingJob', // 전체 스크래핑
        'getAllBankInfo', // 예금 전체 조회
        'getAllCardInfo', // 카드 전체 조회
        'getAllStockInfo', // 증권 전체 조회
        'getAllInsuranceInfo', // 보험 전체 조회
				'getAllEstimateInfo', // 연금 전체 조회
				'responseScraping', // 스크래핑 정지
			]),
			
			// 자산 스크래핑 대상기관정보
			getScrapingTarget() {
				console.log(this.targetList)
			},

			// 스크래핑 정지
			stopScraping() {
				this.scrapingList.forEach(d => {
					this.responseScraping(d)
				})
			},
			
			// 신용정보 등록
			registKcb() {
				configService.registKcb().then(() => {
					this.alert('성공')
				})
			},

			// 신용정보 저장
			saveKcb() {
				configService.saveKcdData().then(res => {
					console.log(res)
					this.alert('신용정보 저장 성공')
				})
			},

			/**
			 * 
			 * 은행 ----------------------------------------------------
			 * 
			 */

			// 은행 전체 조회
			// getAllBankInfo(module) {
			// 	const params = {
			// 		asetAmnCusno: store.state.user.userInfo.asetAmnCusno, //자산관리고객번호
			// 		orgDsc: '10', //기관구분코드 10:은행, 20:카드, 30:증권, 40:보험, 50:연금, 60:현금, 70:부동산, 80:신용
			// 		asetAmnFncorgC: module, //자산관리금융기관코드
			// 		lkgMethc: '1', //연동방법코드 1: CERT, 2: ID
			// 		lkgStsc: '1', //연동상태코드 0: 실패, 1: 성공
			// 		rlestHscxIdNo: '', //부동산단지식별번호
			// 	}
			// 	scrapingService.bank.getAllBankInfo(params)
			// },

			// 공인인증서 목록
			getCertList() {

			},

			getCokCertList(){
				window.MyData.getCertList()
			},

			getCertListCallback(params){
				console.log(params)
			},

			// 은행 로그인
			// getBankLogin() {
			// 	scrapingService.bank.login().then(response => {
			// 		console.log(response)
			// 	})
			// },
			
			// 은행 선택 팝업
			openSelectBank() {
				const config = {
          params: {
            title: '은행',
            list: scrapingService.bankList.map(d => {
							return {
								...d,
								comnCId: d.value,
								comnCnm: d.label,
							}
						}),
          },
        }
        modalService.openSelect(config).then(response => {
					this.bank = response.value
        })
			},

			/**
			 * 
			 * 카드 ----------------------------------------------------
			 * 
			 */
			
			// 카드 전체 조회
			// getAllCardInfo(module) {
			// 	const params = {
			// 		asetAmnCusno: store.state.user.userInfo.asetAmnCusno, //자산관리고객번호
			// 		orgDsc: '20', //기관구분코드 10:은행, 20:카드, 30:증권, 40:보험, 50:연금, 60:현금, 70:부동산, 80:신용
			// 		asetAmnFncorgC: module, //자산관리금융기관코드
			// 		lkgMethc: '2', //연동방법코드 1: ID, 2: CERT
			// 		lkgStsc: '1', //연동상태코드 0: 실패, 1: 성공
			// 		rlestHscxIdNo: '', //부동산단지식별번호
			// 	}
			// 	scrapingService.card.getAllCardInfo(params)
			// 	// scrapingService.card.getAllCardInfo(this.card)
			// },

			// 카드사 선택 팝업
			openSelectCard() {
				const config = {
          params: {
            title: '카드',
            list: scrapingService.cardList.map(d => {
							return {
								...d,
								comnCId: d.value,
								comnCnm: d.label,
							}
						}),
          },
        }
        modalService.openSelect(config).then(response => {
					this.card = response.value
        })
			},

			/**
			 * 
			 * 증권 ----------------------------------------------------
			 * 
			 */

			// 증권사 선택 팝업
			openSelectStock() {
				const config = {
          params: {
            title: '증권',
            list: scrapingService.stockList.map(d => {
							return {
								...d,
								comnCId: d.value,
								comnCnm: d.label,
							}
						}),
          },
        }
        modalService.openSelect(config).then(response => {
					this.stock = response.value
        })
			},

			/**
			 * 
			 * 보험 ----------------------------------------------------
			 * 
			 */
			
			// 보험 선택 팝업
			openSelectInsurance() {
				const config = {
          params: {
            title: '보험',
            list: scrapingService.insuranceList.map(d => {
							return {
								...d,
								comnCId: d.value,
								comnCnm: d.label,
							}
						}),
          },
        }
        modalService.openSelect(config).then(response => {
					this.insurance = response.value
        })
			},


			/**
			 * 
			 * 연금 ----------------------------------------------------
			 * 
			 */



			/**
			 * 
			 * 부동산 ----------------------------------------------------
			 * 
			 */

			// 부동산 주소목록 조회
			getAddressList() {
				scrapingService.realEstate.getAddressList('개나리래미안').then(response => {
					console.log(response)
				})
			},
			// 부동산 시세 조회
			getQuotesList() {
				scrapingService.realEstate.getQuotesList('KBM017924').then(response => {
					console.log(response)
				})
			},

			test() {
				const result = {
  "Module": "wooribank",
  "Class": "개인뱅킹",
  "Job": "수시거래내역조회",
  "Input": {
    "계좌번호": "1234951045678",
    "조회시작일": "20160401",
    "조회종료일": "20160410"
  },
  "Output": {
    "ErrorCode": "00000000",
    "ErrorMessage": "",
    "Result": {
      "내역정렬순서": "0",
      "거래내역조회": [
        {
          "거래일자": "20160404",
          "거래시각": "072844",
          "통화코드": "KRW",
          "출금액": "1",
          "입금액": "0",
          "거래후잔액": "100869",
          "기재사항1": "웹케시글로벌",
          "기재사항2": "",
          "거래수단1": "여의영",
          "거래수단2": "인터넷출금이체",
          "계좌번호": "1234951045678"
        },
        {
          "거래일자": "20160401",
          "거래시각": "073609",
          "통화코드": "KRW",
          "출금액": "1",
          "입금액": "0",
          "거래후잔액": "100870",
          "기재사항1": "웹케시글로벌",
          "기재사항2": "",
          "거래수단1": "여의영",
          "거래수단2": "인터넷출금이체",
          "계좌번호": "1234951045678"
        }
      ]
    }
  }
}
				console.log('-----')
				const data = convert.convert(result)
				console.log('-----', data)
			},

			listenSubscribe() {
				// this.subscribe = this.$store.subscribe((mutation, state) => {
				this.$store.subscribe((mutation, state) => { 
					if (mutation.type === 'scraping/completeScraping') {
						console.log('')
						console.log('--------------------------')
						console.log('--------------------------')
						console.log('****************************** subscribe : mutation', mutation, state)
						console.log('--------------------------')
						console.log('--------------------------')
						console.log('')
						// if (state.exam.targetTab === 'user') {
						// 	this.toGroupListParams(mutation.payload)
						// }
					}
				})
			}
		},
		components: {
		},
		mixins: [
			commonMixin
		],
		mounted() {
			//this.listenSubscribe()
		}
  }
</script>
<style scoped>
	button {
		border-style: ridge;
	}
</style>
