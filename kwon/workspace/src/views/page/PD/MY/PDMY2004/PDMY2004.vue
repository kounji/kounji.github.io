<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표
* @ 페이지설명 : 금융과생활 > 나의목표 > 나의 목표 계좌 연결
* @ 파일명     : src\views\page\PD\MY\PDMY2004\PDMY2004.vue
* @ 작성자     : CS533453
* @ 작성일     : 2023-07-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-17              CS533453              최초작성
*************************************************************************/
-->

<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>나의 목표 계좌 연결</h1>
		</div>	
		<div class="popup_content com_space_bottom com_bg_type00">
			<div class="com_inner">
				<strong class="titH1">계좌를 연결하고 목표 관리하세요</strong>

				<div class="list_line_type" :class="index == 0 ? 'mt40' : ''" v-for="(financialInfo, index) in financialList" :key="'key_'+index">
					<div class="com_inner">
						<div class="goal_title_area">
							<p class="title">{{financialInfo.tit}}</p>
							<p class="mytitle">{{financialInfo.obtnm}}</p>
						</div>

						<div class="goal_list_area">
							<dl>
								<dt>목표일</dt>
								<dd class="num">{{financialInfo.obtDt}}</dd>
							</dl>
							<dl>
								<dt>목표액</dt>
								<dd><em class="num">{{financialInfo.fncObtAm | numberFilter}}</em>원</dd>
							</dl>
						</div>

						<div class="goal_link_area">
							<a href="javascript:void(0);" @click="openSlidePopup(financialInfo)" > 계좌연결</a>
							<a href="javascript:void(0);" @click="updateMove(financialInfo.fncObtDsc, financialInfo.sqno, financialInfo.prgStsCd, financialInfo.carGrdNo, financialInfo.carCtrimNo, financialInfo.basyy, financialInfo.basmm)">목표수정</a>
						</div>
					</div>
				</div>
			</div>
		</div>
			
		<a href="javascript:void(0);" class="btn_close" @click="closeAll()"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'

import PDMY2039 from '@/views/page/PD/MY/PDMY2039/PDMY2039' // 돈모으기 상세
import PDMY2041 from '@/views/page/PD/MY/PDMY2041/PDMY2041' // 투자목표 상세
import PDMY2029 from '@/views/page/PD/MY/PDMY2029/PDMY2029' // 내집마련 상세
import PDMY2030 from '@/views/page/PD/MY/PDMY2030/PDMY2030' // 내차사기 상세
import PDMY2031 from '@/views/page/PD/MY/PDMY2031/PDMY2031' // 여행목표 상세
import PDMY2026 from '@/views/page/PD/MY/PDMY2026/PDMY2026' // 여가생활 상세
import PDMY2027 from '@/views/page/PD/MY/PDMY2027/PDMY2027' // 자기계발 상세
import PDMY2028 from '@/views/page/PD/MY/PDMY2028/PDMY2028' // 반려동물 상세
// import PDMY2038 from '@/views/page/PD/MY/PDMY2038/PDMY2038' // 돈모으기 등록
// import PDMY2040 from '@/views/page/PD/MY/PDMY2040/PDMY2040' // 투자목표 등록
// import PDMY2023 from '@/views/page/PD/MY/PDMY2023/PDMY2023' // 내집마련 등록
// import PDMY2025 from '@/views/page/PD/MY/PDMY2025/PDMY2025' // 여행목표 등록
// import PDMY2024 from '@/views/page/PD/MY/PDMY2024/PDMY2024' // 내차사기 등록
// import PDMY2006 from '@/views/page/PD/MY/PDMY2006/PDMY2006' // 여가생활 등록
// import PDMY2015 from '@/views/page/PD/MY/PDMY2015/PDMY2015' // 자기계발 등록
// import PDMY2020 from '@/views/page/PD/MY/PDMY2020/PDMY2020' // 반려동물 등록

import COCO1124 from '@/views/page/CO/CO/COCO1124/COCO1124'

import {dateFormat} from '@/utils/date'
import {mapActions, mapGetters} from 'vuex'

import _ from 'lodash'

export default {
    name : "PDMY2004",
    data: () => {
		return {
             // return info
             myInfoList         : null,
             expenseList        : [], // 지출목표목록
             tempExpenseList    : [], // 지출목표목록(임시)
             financialList      : [], // 금융목표, 버킷리스트
             accountList        : [], // 계좌목록
             accountList2       : [], // 계좌목록(투자)
             preXpsAm           : 0,  // 현재지출금액
             prgStsCd			: "", // 상태(0:전체, 1:진행중, 2:종료)
        }
	},
    computed : {
        ...mapGetters('myassets', [
            'isMyAssetGathering'
        ]),
    },
    methods: {
        ...mapActions('myassets', [
            'getAllMyAssetInfo'
        ]),            
        init() {
            this.myInfoList      = null // 나의목표
            this.expenseList     = []   // 지출목표목록
            this.tempExpenseList = []   // 지출목표목록(임시)
			this.financialList   = []   // 금융목표, 버킷리스트
			this.prgStsCd		 = 0
        },
        initComponent() {

			this.init()
			
			// 계좌목록 조회
            this.getAcctList()

			// 계좌목록 조회(투자)
            this.getAcctList2()

            this.getData()
        },
        getData() {

            this.myInfoList      = null // 나의목표
            this.expenseList     = []   // 지출목표목록
            this.tempExpenseList = []   // 지출목표목록(임시)
			this.financialList   = []   // 금융목표, 버킷리스트
			this.prgStsCd		 = 0

            const config = {
                url: '/pd/my/01r02',  // 'pd/my/01ra2',
                data: {
                        "mydtCusno": this.getUserInfo('mydtCusno') // 마이데이터고객번호
                        ,"prgStsCd" : this.prgStsCd                // 진행상태코드
                        }
            };
            
            apiService.call(config).then(response => {
                console.log("response = ", response);
				
				this.myInfoList		= response
				this.financialList  = this.myInfoList.financialList || []

                // 목표 List
                if(this.financialList.length > 0) {
                    let tmpFinList = [];
                    for(let i=0; i<this.financialList.length; i++) {
						// console.log("this.financialList[i].bankListCnt : " + this.financialList[i].bankListCnt);
                        if(this.financialList[i].bankListCnt === 0) {
                            let setObj = this.setHtmlData(this.financialList[i])
                            this.financialList[i].tit       = setObj.tit
							this.financialList[i].obtDt		= dateFormat(this.financialList[i].obtDt, 'YYYY.MM.DD')

							tmpFinList.push(this.financialList[i]);
                        }
                    }
					this.financialList = tmpFinList;
					console.log("this.financialList : " + this.financialList.length)
                }
            });

		},
		getAcctList() {
			const config = {
				url : "/co/co/07r01",
				data : {
					mydtCusno   : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
					bnkAcDsc    : '11',                             // 은행계좌구분코드 (11:나의목표_수신상품, 21:나의목표_투자상품, 10 : 수신상품, 20 : 투자상품, 32: 담보대출(부동산) , 35: 할부금융(자동차)) 
				}
			}

			apiService.call(config).then(response => {

				this.accountList = response.accountList || []

				// 빈계좌 세팅(테스트용)
				/*
				if(this.accountList.length == 0) {

					let inputAcct1 = {}
					inputAcct1.mydtCusno = this.getUserInfo("mydtCusno")
					inputAcct1.infOfrmnOrgC = 'B2AAAL0000'
					inputAcct1.mydtAcno = '111-11-11111'
					inputAcct1.mydtScNo = '1'
					inputAcct1.acWrsnm = '테스트계좌1'
					inputAcct1.orgnm = '기관명1'
					inputAcct1.acNowBac = 1230000

					this.accountList.push(inputAcct1)

					let inputAcct2 = {}
					inputAcct2.mydtCusno = this.getUserInfo("mydtCusno")
					inputAcct2.infOfrmnOrgC = 'B2AAAL0000'
					inputAcct2.mydtAcno = '222-22-22222'
					inputAcct2.mydtScNo = '2'
					inputAcct2.acWrsnm = '테스트계좌2'
					inputAcct2.orgnm = '기관명2'
					inputAcct2.acNowBac = 120000

					this.accountList.push(inputAcct2)

					let inputAcct3 = {}
					inputAcct3.mydtCusno = this.getUserInfo("mydtCusno")
					inputAcct3.infOfrmnOrgC = 'B2AAAL0000'
					inputAcct3.mydtAcno = '333-33-33333'
					inputAcct3.mydtScNo = '2'
					inputAcct3.acWrsnm = '테스트계좌3'
					inputAcct3.orgnm = '기관명3'
					inputAcct3.acNowBac = 111222

					this.accountList.push(inputAcct3)
				}
				*/
			})
		},
		getAcctList2() {
			const config = {
				url : "/co/co/07r01",
				data : {
					mydtCusno   : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
                    bnkAcDsc    : '21',                             // 은행계좌구분코드 (11:나의목표_수신상품, 21:나의목표_투자상품, 10 : 수신상품, 20 : 투자상품, 32: 담보대출(부동산) , 35: 할부금융(자동차)) 
				}
			}

			apiService.call(config).then(response => {
				this.accountList2 = response.accountList || []
			})
		},
        setHtmlData(obj) {
            let rtnObj = {}
            if(obj.fncObtDsc === '01') {
                rtnObj.tit       = "돈모으기"
            } else if(obj.fncObtDsc === '02') {
                rtnObj.tit       = "투자목표"
            } else if(obj.fncObtDsc === '03') {
                rtnObj.tit       = "내집마련"
            } else if(obj.fncObtDsc === '04') {
                rtnObj.tit       = "여행목표"
                } else if(obj.fncObtDsc === '05') {
                rtnObj.tit       = "내차사기"
            } else if(obj.fncObtDsc === '06') {
                rtnObj.tit       = "여가생활"
            } else if(obj.fncObtDsc === '07') {
                rtnObj.tit       = "자기계발"
            } else if(obj.fncObtDsc === '08') {
                rtnObj.tit       = "반려동물"
            }
            return rtnObj
		},
        // 슬라이드팝업 오픈(연결계좌 팝업)
        openSlidePopup(financialInfo) {

            const acctPopList = []
            
            let tempAcctList = []
            if(financialInfo.fncObtDsc == "02") {
                tempAcctList = this.accountList2 || []
            } else {
                tempAcctList = this.accountList || []
            }

            if(tempAcctList.length > 0) {
                for(let i=0; i<tempAcctList.length; i++){
                    let acctInfo = tempAcctList[i]

                    let inputInfo = {}
                    inputInfo.goodsCode  = acctInfo.mydtAcno
                    inputInfo.goodsName  = acctInfo.acWrsnm
                    inputInfo.goodsPrice = acctInfo.acNowBac
                    inputInfo.orgC  = acctInfo.infOfrmnOrgC
                    inputInfo.orgNm = acctInfo.orgnm
                    inputInfo.scNo  = acctInfo.mydtScNo

                    acctPopList.push(inputInfo)
                }
            }
                            
            const config = {
                params: {
                    title: '계좌연결',
                },
                renderer: {
                    component: COCO1124,
                    cdata : {
                        "title":'계좌연결',
                        "contentList":[{
                            'contentGubn':'01', 
                            'contentTitle':'계좌연결',
                            'contentData':acctPopList,
                        }],
                        "purposeYn":"Y",                            /* 화면구분(금융생활-목표등록) */
                        "fncObtAm": financialInfo.fncObtAm || 0 /* 목표금액 */
                    }
                }
            }
            modalService.openSlidePagePopup(config).then(response => {

                // 등록된 연결계좌 목록 초기화후 재세팅
                let selectGoodsList = response || []

                if(tempAcctList.length > 0) {
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
                            inputObj.mydtCusno = financialInfo.mydtCusno
                            inputObj.fncObtDsc = financialInfo.fncObtDsc               // 목표구분
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

                
                this.subListIn = []
                if(this.acNowBacTotAm >= financialInfo.fncObtAm) {
                    modalService.alert("계좌 잔액이 목표 금액을 초과하였습니다.<BR>연결계좌를 다시 선택하세요").then(() => {});
                    return;
                } else {
                    this.subListIn = this.subList
                    const config = {
                        url: '/pd/my/04s01',

                        data: {  "mydtCusno": financialInfo.mydtCusno // 마이데이터고객번호
                                ,"fncObtDsc" : financialInfo.fncObtDsc
                                ,"subListIn" : this.subListIn
                              }
                    };
                    apiService.call(config).then(response => {
                        if(response.rspCd == '0000'){
                            modalService.alert("저장되었습니다.").then(() => {
                                
                                this.closeAllData('reSelect')

                            });
                        } else {
                            modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {
                                //this.close(response);
                            })
                        }
                    });
                }
            })
        },
		// 금융목표 상세이동
        updateMove(fncObtDsc, sqno, prgStsCd, carGrdNo, carCtrimNo, basyy, basmm) {
			var compName

            if(fncObtDsc == '01') compName = PDMY2039 /* 돈모으기 */
            if(fncObtDsc == '02') compName = PDMY2041 /* 투자목표 */
            if(fncObtDsc == '03') compName = PDMY2029 /* 버킷-내집마련 */
            if(fncObtDsc == '04') compName = PDMY2031 /* 버킷-여행목표 */
            if(fncObtDsc == '05') compName = PDMY2030 /* 버킷-내차사기 */
            if(fncObtDsc == '06') compName = PDMY2026 /* 버킷-여가생활 */
            if(fncObtDsc == '07') compName = PDMY2027 /* 버킷-자기계발 */
            if(fncObtDsc == '08') compName = PDMY2028 /* 버킷-반려동물 */

            var param = {"fncObtDsc":fncObtDsc, "sqno": sqno, "prgStsCd":prgStsCd, "carGrdNo":carGrdNo, "carCtrimNo":carCtrimNo, "basyy":basyy, "basmm":basmm}
            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(response => {

                if(response == "reSelect") {
                    // 재조회
                    //this.initComponent()

                    var prgStsCd = this.prgStsCd

                    this.getData(prgStsCd)
                    this.fn_refreshApiCall() // 자산 업데이트
                }
            })
        },
        /**
         * 수집갱신 처리
         */
        fn_refreshApiCall() {
            console.log('isMyAssetGathering', this.isMyAssetGathering)
            if (!this.isMyAssetGathering) {
                this.getAllMyAssetInfo()
                console.log('getAllMyAssetInfo() running')
            }
        }
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
    created() {
    },
}
</script>