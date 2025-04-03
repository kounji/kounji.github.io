<template>
	<div>
		<p><button @click="getSubscribe">getSubscribe</button></p>
		<p><button @click="addSubscribe">addSubscribe</button></p>
		<p><button @click="initSession">initSession</button></p>
		<div>
				<div class="slider_wrap">
					<div class="tab_cont">
						<div role="tabpanel" class="cmm-tab-panel">
							<div class="slide ">
								<div class="car_pic">
									<img src="@/assets/images/icon/car_trax.png" alt="쉐보레(대우) 더 뉴 트랙스 1.4터보 블레이드">
								</div>
								<div class="car_name">
									쉐보레(대우) 더 뉴 트랙스1<br/>
									1.4터보 블레이드									
								</div>
								<span class="car_num">
									<span class="num">12</span>나 <span class="num">1234</span>
								</span>
							</div>
						</div>
						<div role="tabpanel" class="cmm-tab-panel">
							<div class="slide ">
								<div class="car_pic">
									<img src="@/assets/images/icon/car_trax.png" alt="쉐보레(대우) 더 뉴 트랙스 1.4터보 블레이드">
								</div>
								<div class="car_name">
									쉐보레(대우) 더 뉴 트랙스2<br/>
									1.4터보 블레이드									
								</div>
								<span class="car_num">
									<span class="num">12</span>나 <span class="num">1234</span>
								</span>
							</div>
						</div>
						<div role="tabpanel" class="cmm-tab-panel">
							<div class="slide ">
								<div class="car_pic">
									<img src="@/assets/images/icon/car_trax.png" alt="쉐보레(대우) 더 뉴 트랙스 1.4터보 블레이드">
								</div>
								<div class="car_name">
									쉐보레(대우) 더 뉴 트랙스3<br/>
									1.4터보 블레이드									
								</div>
								<span class="car_num">
									<span class="num">12</span>나 <span class="num">1234</span>
								</span>
							</div>
						</div>
					</div>
				</div>
		</div>
	</div>
</template>
<script>
	import _ from 'lodash'
	import CryptoJS from '@/assets/js/crypto-js.js'

	// import $ from 'jquery'
	import commonMixin from '@/common/mixins/commonMixin'
	import {firstAndToday, scrapingPeriod, scrapingDate, startSessionTimer} from '@/utils/date'
	import {setMasking, stringCut, getOrgnmList} from '@/utils/data'
	import {getDayDowC, getDayDowCName, dayAdd, isValidDate} from '@/utils/date'
	import {fncSlick} from '@/utils/slick'


	export default {
    name: 'SampleScript',
		data: function() {
			return {
				list: [{
					"trDt": "20201012",
					"trTm": "134540",
					"crDownm": "월요일",
					"asetAmnRndaDsc": "0",
					"tram": 100000,
					"trafBac": 1500000,
					"snsCntn": "류명훈",
					"crCntn": ""
				}]
				,
				orgTotScopeList : [],
			}
		},
		mounted() {
			// console.log($)
			// console.log(this.list)
			// this.parseCardList(this.list)
			// getMonthPeriod(12).forEach(d => {
			// 	console.log(d.format('YYYYMM'))
			// })
			console.log(firstAndToday())
			console.log(scrapingPeriod())
			console.log(scrapingDate(-2))
			this.promiseTest()
			this.sample()
			

			console.log("setMasking",  setMasking("account",4240012222362 ) )
			console.log("setMasking card ",  setMasking("card", '4000-1234-5678-0000' ) )

			console.log("String Cut",  stringCut('4000-1234-5678-5678', 4, 'Y' ))

			console.log("days : ", dayAdd(-7))
			console.log("days : ", dayAdd(-7, '20210103'))
			console.log("days : ", dayAdd(7))

			console.log("valid days : ", isValidDate('202106'))
			console.log("valid days : ", isValidDate('20210617'))

/*			
			$(function(){ 
				//count up
				$('.counter').each(function(){
					var $this = $(this),
					countTo = $this.attr('data-count');
					
					$({countNum: $this.text()}).animate({
						countNum:countTo
					},
					{
						duration:1500,
						//easing:'easeOutCubic',
						step:function(){
							$this.text(addCommas(Math.floor(this.countNum)));
						},
						complete:function(){
							$this.text(addCommas(this.countNum));
						}            
					});
					function addCommas(nStr){
						return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
					}
					});
			})				
*/
			this.cardRegex(11111)
			console.log("요일 : ", getDayDowC('20210616'), getDayDowCName('20210616'))


			this.sendRequestJson()
			
			this.replaceOrgCnm()


			// 자동차 슬라이드 처리
			this.$nextTick(()=>{
				setTimeout(() => {
					//fncSlick(100, this.slickCallBack)
					fncSlick()
				}, 100);
			})
	},
    methods: {
			slickCallBack(slideId){
				console.log('slide afterChange callback', slideId)
			},
			getSubscribe() {
				console.log(this.subscribe)
			},
			addSubscribe() {
				this.subscribe = this.$store.subscribe(() => {
				})
			},
			parse() {
				const result = this.ko.Result
				const ro = _.mapKeys(result, function(value, key) {
					return key + '_'
				})
				console.log(ro)
			},
			parseCardList(list) {
				const result = _.chain(list)
							.uniqBy('trDt')
							.map(d => {
								return {
									...d,
									list: _.filter(list, {trDt: d.trDt})
								}
							})
							// .orderBy('trDt', 'desc')
							.value()
							console.log(result)
				return result
			},
			parseCardList2(list) {
			const result = _.chain(list)
						.groupBy('trDt')
						.keys()
						.map(d => {
							return {
								trDt: d,
								list: _.filter(list, {trDt: d})
							}
						})
						.orderBy('trDt', 'desc')
						.value()
			return result
			},
			sample() {
				const data = JSON.stringify({"header":{"stdTgrmVer":1,"guid":"dfd9c87ffada4c148fede138b143c582","guidSq":1,"firGuid":"dfd9c87ffada4c148fede138b143c582","rmsSysC":"COP","rqrRspDsc":"S","sczDsc":"S","scrnCallNo":"00","firTmsSysC":"MOB","fstTrmsUntBuzCd":"AS","firChanC":"M0","firTmsDtm":"20201207155316757","langDsc":"ko","envDsc":"D","tmsSysC":"MOB","tmsNodeNo":"FEP01","tmsDtm":"20201207155316757","rspRztDsc":"","usrId":"1000000003"},"body":{}})
				const timestamp = "1607323996757"
				const apiKey = "95296ecafa0e476094dab7a8593fe46a"

				const message = data + '^' + timestamp
				const hash = CryptoJS.HmacSHA256(message, apiKey)
				const messageDigest = CryptoJS.enc.Base64.stringify(hash)


				console.log(messageDigest)

				// MessageDigest : 8suaKcrQMNUG5PZ8/+lfOOH9I20NdsOSv2B7/3WiokU=
			},


			initSession() {
				startSessionTimer()
			},
			
			promiseTest() {
				// const list = [this.getPromise(), this.getPromise2()]
				// this.executeAll(list)

				// Promise.all([this.getPromise(), this.getPromise2()]).then(
				// 	res => {
				// 		console.log('all promise end', res)
				// 	},
				// 	error => {
				// 		console.log('error.....', error)
				// 	}
				// )

				// this.getPromise().then(res => {
				// 	console.log('AAAAAAAAAAAAAAAAA')
				// })
			},
			// getPromise() {
			// 	return new Promise((resolve, reject) => {
			// 		console.log('execute getPromise')
			// 		const fn = () => {
			// 			if (1 === 2) {
			// 				resolve({result: true, type: 'getPromise'})
			// 			} else {
			// 				reject({result: false})
			// 				console.log('else..')
			// 			}
			// 		}
			// 		this.execute(fn)
			// 	})
			// },
			// getPromise2() {
			// 	return new Promise((resolve) => {
			// 		console.log('execute getPromise2')
			// 		const fn = () => {
			// 			resolve({result: true, type: 'getPromise2'})
			// 		}
			// 		this.execute(fn)
			// 	})
			// },
			// execute(fn) {
			// 	fn()
			// },
			/*
			addScript: function(){
				let scripts = [
					'./include/js/common-ui.js'
				]

				let script = document.createElement('script')
				script.setAttribute('type', 'text/javascript')
				script.setAttribute('src', scripts[0])
				script.async = true

				document.getElementsByTagName('body or head'[0])
				document.appendChild(script)

			}
			*/
			cardRegex(cardNum){
				console.log(cardNum)

				// 마스터카드 : 5212345678901234
				// Visa1     : 4123456789012
				// Visa2     : 4123456789012345
				// Amex      : 371234567890123
				// Discover  : 6011123456789012
				// Diners Club : 30125212365212

				const cardConfig = [
								{cardNum : "5212345678901234", cardBrand : "마스터카드"},
								{cardNum : "4123456789012",    cardBrand : "Visa1"},
								{cardNum : "4123456789012345", cardBrand : "Visa2"},
								{cardNum : "371234567890123",  cardBrand : "Amex"},
								{cardNum : "6011123456789012", cardBrand : "Discover"},
								{cardNum : "30125212365212",   cardBrand : "Diners Club"},
								{cardNum : "9412345678901234", cardBrand : "BC Card"},
								{cardNum : "3528000000000007", cardBrand : "JCB Card"},
								{cardNum : "213100000000008",  cardBrand : "JCB Card"},
								{cardNum : "180000000000009",  cardBrand : "JCB Card"},
				]

//				console.log(cardConfig)
				//str = $.trim(str).replaceAll("-","")
				//temp = str.replace(/(\d{4})(\d{4})(\d{4})(\d{3,4})$/,'$1-****-****-$4')

				const masterCardPattern 	= /^5[1-5]\d{14}/
				const visaPattern 			= /^4\d{12}(\d{3})?/
				const amexCardPattern 		= /^3[47]\d{13}/
				const discoverCardPattern	= /^6011\d{12}$/
				const dinersClubCardPattern = /^3(?:0[012345]|[68]\d)\d{11}$/
				const bcCardPattern         = /^94\d{14}/
				const jcbCardPattern        = /^(?:2131|1800|35\d{3})\d{11}$/

//console.log(masterCardPattern)
//console.log(visaPattern)
//console.log(amexCardPattern)
//console.log(discoverCardPattern)
//console.log(dinersClubCardPattern)
//console.log(bcCardPattern)
//console.log(jcbCardPattern)

				
				for (let i=0; i < cardConfig.length; i++)
				{
					let temp = ""
					let cardNum = $.trim(cardConfig[i].cardNum).replaceAll("-","")
					if (masterCardPattern.exec(cardNum)) {
						temp = cardNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})$/,'$1-****-****-$4')
					}else if (visaPattern.exec(cardNum)) {
						temp = cardNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})$/,'$1-****-****-$4')
						if (cardNum.length ==13)
						{
							temp = cardNum.replace(/(\d{4})(\d{3})(\d{3})(\d{3})$/,'$1-***-***-$4')
						}
						console.log("visaPattern",cardNum, cardConfig[i].cardBrand, temp)
					}else if (amexCardPattern.exec(cardNum)) {
						temp = cardNum.replace(/(\d{4})(\d{6})(\d{5})$/, '$1-******-$3')
						console.log("amexCardPattern",cardNum, cardConfig[i].cardBrand, temp)
					}else if (discoverCardPattern.exec(cardNum)) {
						temp = cardNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})$/,'$1-****-****-$4')
						console.log("discoverCardPattern", cardNum, cardConfig[i].cardBrand, temp)
					}else if (dinersClubCardPattern.exec(cardNum)) {
						temp = cardNum.replace(/(\d{4})(\d{6})(\d{4})$/,'$1-******-$3')
						console.log("dinersClubCardPattern",cardNum, cardConfig[i].cardBrand, temp)
					}else if (bcCardPattern.exec(cardNum)) {
						temp = cardNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})$/,'$1-****-****-$4')
						console.log("bcCardPattern",cardNum, cardConfig[i].cardBrand, temp)
					}else if (jcbCardPattern.exec(cardNum)) {
						temp = cardNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})$/,'$1-****-****-$4')
						if (cardNum.length == 15)
						{
							temp = cardNum.replace(/(\d{4})(\d{6})(\d{5})$/,'$1-******-$3')
						}
						console.log("jbcCardPattern",cardNum, cardConfig[i].cardBrand, temp)
					}else{
						temp = cardNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})$/,'$1-****-****-$4')
						if (cardNum.length == 15)
						{
							temp = cardNum.replace(/(\d{4})(\d{6})(\d{5})$/,'$1-******-$3')
						}
						console.log("jbcCardPattern",cardNum, cardConfig[i].cardBrand, temp)
					}
				}

			},
			sendRequestJson(){
					const data = {
												"rsp_code": "00000",
												"rsp_msg": "성공",
												"irp_cnt": 0,
												"bank_cnt": 4,
												"bank_list": [
														{
																"account_num": "3560507305753",
																"is_consent": false,
																"seqno": "0",
																"is_foreign_deposit": false,
																"prod_name": "자유저축예탁금",
																"is_minus": false,
																"account_type": "1001",
																"account_status": "01",
																"org_code": "I1AAAZ0000",
																"org_biz_code": "bank",
																"scope": "bank.deposit"
														},
														{
																"account_num": "81514351141047",
																"is_consent": false,
																"seqno": "0",
																"is_foreign_deposit": false,
																"prod_name": "보통예탁금",
																"is_minus": false,
																"account_type": "1001",
																"account_status": "01",
																"org_code": "I1AAAZ0000",
																"org_biz_code": "bank",
																"scope": "bank.deposit"
														},
														{
																"account_num": "10001284039119",
																"is_consent": false,
																"seqno": "0",
																"is_foreign_deposit": false,
																"prod_name": "농협재형저축 (일반)",
																"is_minus": false,
																"account_type": "1003",
																"account_status": "01",
																"org_code": "I1AAAZ0000",
																"org_biz_code": "bank",
																"scope": "bank.deposit"
														},
														{
																"account_num": "0610907483633",
																"is_consent": false,
																"seqno": "0",
																"is_foreign_deposit": false,
																"prod_name": "(가계일반)일반대출-가계자금",
																"is_minus": false,
																"account_type": "3230",
																"account_status": "01",
																"org_code": "I1AAAZ0000",
																"org_biz_code": "bank",
																"scope": "bank.loan"
														}
												],
												"card_cnt": 1,
												"card_list" : [
																				{
																				"card_id": "0123456789234567",	
																				"card_num": "0123456789123456",
																				"org_code": "I1AAAZ0001",
																				"org_biz_code": "card",
																				"scope": "card.card"
																				},
																				{
																				"card_id": "0123456789234567",	
																				"card_num": "0123456789234567",
																				"org_code": "I1AAAZ0001",
																				"org_biz_code": "card",
																				"scope": "card.card"
																				},																				
																			],
												"invest_cnt": 0,
												"isr_cnt": 0,
												"isr_loan_cnt": 0,
												"efin_ppy_cnt": 0, //prepaid
												"efin_acc_cnt": 0, //paid
												"capital_cnt": 0,
												"gi_cnt": 0,
												"telecom_cnt": 0,
												"success_cnt": 1,
												"success_org_list": [
														{
																"org_code": "I1AAAZ0000",
																"org_name": "농업협동조합중앙회"
														},
														{
																"org_code": "I1AAAZ0001",
																"org_name": "농업협동조합중앙회1"
														},
												]
										}

					//Make Json
					console.log(data)
					

					/*
							통합인증 디폴트값 셋팅
							필수 data => this.orgTotScopeList : [] 등록 필요
					*/
					this.makeDefaultScopeData(data)

					
								
					/*
						"account_num": "3560507305753",
						"is_consent": false,
						"seqno": "0",
						"is_foreign_deposit": false,
						"prod_name": "자유저축예탁금",
						"is_minus": false,
						"account_type": "1001",
						"account_status": "01",
						"org_code": "I1AAAZ0000",
						"org_biz_code": "bank",
						"scope": "bank.deposit"
					*/
				console.log('orgTotScopeList', this.orgTotScopeList)

				//선택된 리스트
				const selectScope = [{
															"account_num": "3560507305753",
															"org_code": "I1AAAZ0000",
															"org_biz_code": "bank",
															"scope": "bank.deposit"
													},
													{
																"account_num": "10001284039119",
																"org_code": "I1AAAZ0000",
																"org_biz_code": "bank",
																"scope": "bank.deposit"
														}
													]
				
				console.log(selectScope)

				//최종 선택 리스트
				this.makeCompleteScopeJson(selectScope)

				console.log('orgTotScopeList', this.orgTotScopeList)


			},
			makeDefaultScopeData(data){ //초기 데이터 적제

				//1 ORG코드로 초기데이터
				for (let i=0; i < data.success_org_list.length ; i++ )
				{
					const orgList = data.success_org_list
					this.orgTotScopeList.push({'snd_org_code' : orgList[i].org_code, target_info : []})

				}

				if (data.isr_cnt > 0)      this.makeDefaultIndustyScope(data.irp_list)
				if (data.bank_cnt > 0)     this.makeDefaultIndustyScope(data.bank_list)
				if (data.card_cnt > 0)     this.makeDefaultIndustyScope(data.card_list)
				if (data.invest_cnt > 0)   this.makeDefaultIndustyScope(data.invest_cnt)
				if (data.efin_ppy_cnt > 0) this.makeDefaultIndustyScope(data.efin_ppy_list)
				if (data.efin_acc_cnt > 0) this.makeDefaultIndustyScope(data.efin_acc_list)
				if (data.capital_cnt > 0)  this.makeDefaultIndustyScope(data.capital_list)
				if (data.gi_cnt > 0)       this.makeDefaultIndustyScope(data.gi_list)
				if (data.telecom_cnt > 0)  this.makeDefaultIndustyScope(data.telecom_list)

			},
			makeDefaultIndustyScope(scopeList){ //각 카운트별로 업권리스트 Default추가
				for(let i=0 ;i<scopeList.length;i++)
				{
					const org_code     = scopeList[i].org_code
					const org_biz_code = scopeList[i].org_biz_code
					const org_code_idx = this.orgTotScopeList.findIndex(d=> d.snd_org_code === org_code)
					if(this.orgTotScopeList[org_code_idx].target_info.length ==0)
					{
            switch(org_biz_code) {
                case "bank" :
                    this.orgTotScopeList[org_code_idx].target_info.push({scope: 'bank.list'})
                    break
								case "card" :
										this.orgTotScopeList[org_code_idx].target_info.push({scope: 'card.list'})
										break
                case "invest" :
                    this.orgTotScopeList[org_code_idx].target_info.push({scope: 'invest.list'})
                    break
								case "insue" :
										this.orgTotScopeList[org_code_idx].target_info.push({scope: 'insu.list'})
										break
                case "capital" :
                    this.orgTotScopeList[org_code_idx].target_info.push({scope: 'capital.list'})
                    break
								case "efin" :
										this.orgTotScopeList[org_code_idx].target_info.push({scope: 'efin.list'})
										break
                case "ginsu" :
                    this.orgTotScopeList[org_code_idx].target_info.push({scope: 'ginsu.list'})
                    break
								case "telecom" :
										this.orgTotScopeList[org_code_idx].target_info.push({scope: 'telecom.list'})
										break
						}
					}
				}
			},

			makeCompleteScopeJson(selectScopeList){
			/*
			//각 식별자
			bank    : account_num
			card    : card_id
			invest  : account_num
			insu    : insu_num
			     insu.irp : account_num
			efin efin.prepaid : fob_id
			efin efin.paid    : account_id
			capital : account_num
			ginsu   : insu_num
			telecom	: telecom_num
			*/
					for (let j=0; j < selectScopeList.length; j++)
					{
						const selectScope  = selectScopeList[j]
						const org_code     = selectScope.org_code
						const org_biz_code = selectScopeList[j].org_biz_code
						const scope        = selectScopeList[j].scope

						for(let i=0; i < this.orgTotScopeList.length; i++)
						{
								if(this.orgTotScopeList[i].snd_org_code ===  org_code)
								{
										const target_info = this.orgTotScopeList[i].target_info

										if(target_info.findIndex(d => d.scope === scope ) == -1 )
										{
											switch(org_biz_code) {
													case "bank" :
															this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.account_num }] })
															break
													case "card" :
															this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.card_id }] })
															break
													case "invest" :
															this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.account_num }] })
															break
													case "insu" :
																if(scope === 'insu.irp'){
																	this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.account_num }] })
																}else{
																	this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.insu_num }] })
																}
															break
													case "capital" :
															this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.account_num }] })
															break
													case "efin" :
															if(scope === 'efin.prepaid'){
																this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.fob_id }] })
															}else{
																this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.account_id }] })
															}														
															break
													case "ginsu" :
															this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.insu_num }] })
															break
													case "telecom" :
															this.orgTotScopeList[i].target_info.push({ 'scope' : scope , 'asset_list' : [{ 'asset' : selectScope.telecom_num }] })
															break
											}
											break

										}else{

											const target_info_scope_index = target_info.findIndex(d => d.scope === scope )
											
											switch(org_biz_code) {
													case "bank" :
															this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.account_num })
															break
													case "card" :
															this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.card_id })
															break
													case "invest" :
															this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.account_num })
															break
													case "insu" :
																if(scope === 'insu.irp'){
																	this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.account_num })
																}else{
																	this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.insu_num })
																}
															break
													case "capital" :
															this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.account_num })
															break
													case "efin" :
															if(scope === 'efin.prepaid'){
																this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.fob_id })
															}else{
																this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.account_id })
															}
															break
													case "ginsu" :
															this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.insu_num })
															break
													case "telecom" :
															this.orgTotScopeList[i].target_info[target_info_scope_index].asset_list.push({ 'asset' : selectScope.telecom_num })
															break
												}
												break
										}
								}
						}
					}
			},
			replaceOrgCnm()
			{
					let OrgList = [
													{'cdInfOfrmnOrgnm' : '교보증권 ㈜'},
													{'cdInfOfrmnOrgnm' : '한국투자증권 (주)'},
													{'cdInfOfrmnOrgnm' : '미래에셋증권 주식회사'},
													{'cdInfOfrmnOrgnm' : '부국증권'},
													{'cdInfOfrmnOrgnm' : '신영증권'},
													{'cdInfOfrmnOrgnm' : '㈜상상인증권'},
													{'cdInfOfrmnOrgnm' : '한양증권㈜'},
													{'cdInfOfrmnOrgnm' : '한화투자증권'},
													{'cdInfOfrmnOrgnm' : '메리츠증권㈜'},
													{'cdInfOfrmnOrgnm' : '케이비증권 주식회사'},
													{'cdInfOfrmnOrgnm' : '유진투자증권㈜'},
													{'cdInfOfrmnOrgnm' : '유안타증권 주식회사'},
													{'cdInfOfrmnOrgnm' : '현대차증권'},
													{'cdInfOfrmnOrgnm' : '신한금융투자㈜'},
													{'cdInfOfrmnOrgnm' : '케이티파워텔 주식회사'},
													{'cdInfOfrmnOrgnm' : '한화손해보험㈜'},
													{'cdInfOfrmnOrgnm' : '디비금융투자㈜'},
													{'cdInfOfrmnOrgnm' : '에이스아메리칸화재해상보험㈜'},
													{'cdInfOfrmnOrgnm' : '주식회사 케이티스카이라이프'},
													{'cdInfOfrmnOrgnm' : '서울보증보험㈜'},
													{'cdInfOfrmnOrgnm' : '처브라이프생명보험 주식회사'},
													{'cdInfOfrmnOrgnm' : '메트라이프생명'},
												]
				
					let sampleOrgList = getOrgnmList(OrgList, 'cdInfOfrmnOrgnm' )
					console.log(sampleOrgList)
			},
		},
		created(){
			//this.initComponents()
		},
		mixins: [
			commonMixin
		],
  }
</script>
