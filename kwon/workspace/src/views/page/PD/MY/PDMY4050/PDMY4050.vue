<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 도전목표챌린지 > 버킷리스트 > 계좌연결
* @ 페이지설명 : 계좌연결
* @ 파일명     : src\views\page\PD\MY\PDMY4050\PDMY4050.vue
* @ 작성자     : CS541015
* @ 작성일     : 2025-01-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-14              CS541015              최초작성
*************************************************************************/
-->
<template>

	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01" style="display:block;">
		<div class="popup_header">
			<h1>계좌연결</h1>
		</div>

		<div class="popup_content">
			<div class="com_inner bucket_target">
                <h2>{{this.title}}</h2>
                <p>목표가 등록되었습니다.</p>
                <p>당신의, 버킷 리스트를 완성하는데<br>도움을 드리기 위한 추천상품을 준비했어요.</p>
            </div>

            <div class="com_inner bucket_account">
				
				<a href="javascript:void(0);" @click="openWebBrowser(url)">
					<img src="@/assets_v40/images/banner/img_banner_simple_cok_account.png" alt="간편한 농협콕뱅킹 통장 - 목표 달성의 첫걸음을 내딛으세요! 자세히 보기" />
				</a>
				
				<!-- 보유계좌 있을 경우 -->
				<template v-if="subList.length > 0">
					<ul class="account_list_2023 line_type">
						<li v-for="(acctInfo, index) in subList" :key="index">
							<dl>
								<dt>
									<i class="ico_bank" :class="acctInfo.infOfrmnOrgC"><span class="blind">{{acctInfo.infOfrmnOrgNm}}</span></i>
									<span class="name">{{acctInfo.acWrsnm}}</span>
									<span class="num">{{acctInfo.mydtAcno}}</span>
								</dt>
								<dd>
									<em class="num">{{acctInfo.acNowBac | numberFilter}}</em>원
								</dd>
							</dl>
						</li>
					</ul>
				</template>
		
                <button type="button" class="btn btn_mint_line" @click="openSlidePagePopupWithComponent">
					<template v-if="subList.length > 0">보유계좌 다시 연결하기</template>
					<template v-else>보유계좌 연결하기</template>
				</button>

				<div class="mygoal_sub_text mt30">
					<p class="point_line" v-if="subList.length > 0 && bacAm > 0 && remove(fncObtAm) > 0" v-html="fn_numberFormatKorAmt"></p>
				</div>
				<!-- //보유계좌 있을 경우 -->
            </div>  
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<button type="button" class="btn btn_mint" @click="fn_saveAccount">확인</button>
			</div>
		</div>
		<!-- <a href="#nolink" class="btn_close"><span class="blind">팝업닫기</span></a>	 -->
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>

import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import {keyupNumFormat, numberFormat} from '@/utils/number'
import COCO1124 from '@/views/page/CO/CO/COCO1124/COCO1124'
import PDMY4051 from '@/views/page/PD/MY/PDMY4051/PDMY4051'
import _ from 'lodash'
import Template from '../../../XX/template/template.vue'

export default {
    name : "PDMY4050",
    data: () => {
		return {
			accountList : [],
			subList     : [],
			subListIn   : [],
			title       : '',
			invtBrc     : "",   //거래지점코드
            invtBrnm    : "",   //거래지점명
        }
    },
    methods: {
		initComponent(params) {
			this.accountList   = params.accountList || ''
			this.mydtCusno     = params.mydtCusno
			this.fncObtDsc     = params.fncObtDsc
			this.fncObtAm      = params.fncObtAm
			this.acNowBacTotAm = params.acNowBacTotAm
			this.bacAm         = params.bacAm
			this.title         = params.obtnm

			// console.log("mydtCusno >>>>>>>>>", this.mydtCusno)
			// console.log("fncObtDsc >>>>>>>>>", this.fncObtDsc)
			// console.log("fncObtAm >>>>>>>>>", this.fncObtAm)
			// console.log("acNowBacTotAm >>>>>>>>>", this.acNowBacTotAm)
			// console.log("bacAm >>>>>>>>>", this.bacAm)
			// console.log("subList >>>>>>>>>", this.subList)
			// console.log("subList >>>>>>>>>", this.subList.length)

			this.getData();

		},
		getData() {
			const config = {
				url : '/co/as/05r01',
				data : {
					mydtCusno : this.getUserInfo('mydtCusno'),
					eno : ""
				}
			}
			apiService.call(config).then(response => {
				console.log("/co/as/05r01    ", response)
			})
		},
		// 연결계좌 팝업 오픈
		openSlidePagePopupWithComponent() {

			const acctPopList = []

			if(this.accountList.length > 0) {
				for(let i=0; i<this.accountList.length; i++){

					let acctInfo = this.accountList[i]

					let inputInfo = {}
					inputInfo.goodsCode  = acctInfo.mydtAcno
					inputInfo.goodsName  = acctInfo.acWrsnm
					inputInfo.goodsPrice = acctInfo.acNowBac
					inputInfo.orgC  = acctInfo.infOfrmnOrgC
					inputInfo.orgNm = acctInfo.orgnm
					inputInfo.scNo  = acctInfo.mydtScNo

					if(this.subList.length == 0) {
						inputInfo.checked = false
					} else {
						// 조회된 연결계좌가 있으면 팝업호출시 체크된 상태로
						inputInfo.checked = this.setAcctCheckedInfo(acctInfo.mydtAcno, acctInfo.mydtScNo)
					}

					acctPopList.push(inputInfo)
				}
			}
							
			const config = {
				params: {
					title: '계좌연결',
				},
				renderer: {
					component: COCO1124,
					cdata : {"title":'계좌연결',
							"contentList":[
											{
												'contentGubn':'01', 
												'contentTitle':'계좌연결',
												'contentData':acctPopList,
											}
										],
							"purposeYn":"Y",                            /* 화면구분(금융생활-목표등록) */
							"fncObtAm": this.remove(this.fncObtAm) || 0 /* 목표금액 */
							}
				}
			}
			modalService.openSlidePagePopup(config).then(response => {

				// 등록된 연결계좌 목록 초기화후 재세팅
				let selectGoodsList = response || []

				if(this.accountList.length > 0) {
					if(selectGoodsList.length == 0) {
						modalService.alert("선택된 연결계좌가 없습니다.").then(() => {});
						return;
					}
				}

				this.subList = []

				// 연결계좌를 선택하지 않은 경우도 있음
				if(selectGoodsList.length > 0) {
					for(let i=0; i<selectGoodsList.length; i++){
						var inputObj = {}

						if(selectGoodsList[i].checked) {
							//let acctInfo = this.setAcctInfo(selectGoodsList[i].goodsCode) // 계좌정보

							inputObj.mydtCusno = this.mydtCusno
							inputObj.fncObtDsc = this.fncObtDsc               // 금융목표(돈모으기)
							inputObj.infOfrmnOrgC  = selectGoodsList[i].orgC  // 기관코드
							inputObj.infOfrmnOrgNm = selectGoodsList[i].orgNm // 기관명
							inputObj.mydtAcno = selectGoodsList[i].goodsCode  // 마이데이터계좌번호
							inputObj.mydtScNo = selectGoodsList[i].scNo       // 마이데이터회차번호
							inputObj.acWrsnm  = selectGoodsList[i].goodsName  // 계좌상품명
							inputObj.acNowBac = selectGoodsList[i].goodsPrice // 계좌현재잔액

							this.subList.push(inputObj)
						}
					}
				} else {
					this.subList = []
				}
				this.acNowBacTotAm = _.sumBy(this.subList, item => {return item.acNowBac }) // 계좌현재잔액총액
			})
		},
		fn_saveAccount() {
			
			this.subListIn = []
			if(this.acNowBacTotAm >= this.fncObtAm) {
				modalService.alert("계좌 잔액이 목표 금액을 초과하였습니다.<BR>연결계좌를 다시 선택하세요").then(() => {});
				return;
			} else {
				this.subListIn = this.subList
				const config = {
					url: '/pd/my/04s01',

					data: {  "mydtCusno": this.mydtCusno // 마이데이터고객번호
							,"fncObtDsc" : this.fncObtDsc
							,"subListIn" : this.subListIn
							}
				};
				apiService.call(config).then(response => {
					if(response.rspCd == '0000'){
						// 등록완료 팝업 호출
						this.close()
						const config = {
						 	component: PDMY4051,
							params : {
								fncObtDsc : this.fncObtDsc,
								obtnm     : this.title
							}	
						};
						modalService.openPopup(config).then(() => {
						});

					} else {
						modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {
							//this.close(response);
						})
					}
				});
			}
		},
		setAcctCheckedInfo(mydtAcno, mydtScNo) {
			// 계좌번호
			let acctInfo = _.find(this.subList, {"mydtAcno":mydtAcno, "mydtScNo":mydtScNo})
			if(typeof acctInfo !== 'undefined') {
				return true
			} else {
				return false
			}
		},
		remove(value) {
			return (typeof value === "string") ? value.split(".").join("").split("-").join("").split(",").join("") : value
		},
		openWebBrowser(url) {
            if (this.getUserInfo('chnl') === '385') {
                appService.executeBrowser(url);
            } else {
                appService.cokBankOpenPopupWebBrowser(url);
            }
        },
    },
    mounted() {
		this.initComponent(this.params)
		
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
    computed : {
		fn_numberFormatKorAmt() {
			const unit = ['', '만', '억', '조', '경']
			const splitAmt = 10000
			const splitCnt = unit.length

			let resultArray = []
			let resultString = ""

			for(let i = 0; i < splitCnt; i++){
				let rst = (this.bacAm % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
				rst = Math.floor(rst)

				if(rst > 0){
					resultArray[i] = rst
				}
			}

			let strIdx = 0  // 최초시작지점에 '원' 추가하기위함

			for(let j = 0; j < resultArray.length; j++){
				if(!resultArray[j])  {
					strIdx++
					continue
				}

				if(j === strIdx) {
					resultString = '<span class="pointTxt">'+String(numberFormat(resultArray[j])) + unit[j] + '원' +'</span>' + resultString
				} else {
					resultString = '<span class="pointTxt">'+String(numberFormat(resultArray[j])) + unit[j] + ' ' +'</span>' + resultString
				}
			}

			return '목표 달성을 위해 ' + resultString + '이 필요해요!'
		},
	},
    mixins: [
        popupMixin,
        commonMixin
    ],
    created() {

    },
    components: {
        Template      

    }

}
</script>