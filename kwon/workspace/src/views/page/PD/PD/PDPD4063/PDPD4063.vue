<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 대출 한도 계산기
* @ 페이지설명 : 연금절세 > 대출 한도 계산기 > 계산결과보기
* @ 파일명     : src/views/page/PD/PD/PDPD4063/PDPD4063.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-18
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
            <div class="loan_cal dsr_result">
                <div class="tit_area">
                    <p class="sub_txt">대출결과를 확인해볼까요?</p>
                    <h2 class="headline"><strong>희망대출을 포함한<br>DSR결과를 확인해봤어요.</strong></h2> <!-- [v4.0] 25-03-05 문구수정 --> 
                </div>

                <!--분류별 개요-->
                <div class="board_box loan_available">
                    <!--[v4.0] 25-03-05 탭제거 문구영역 추가 -->
                    <!--
                    <ul role="tablist" class="inner_tab">
                        <li class="on"><button type="button" role="tab" aria-selected="true" @click.prevent="fnTab(true)">신용대출</button></li>
                        <li><button type="button" role="tab" aria-selected="false" @click.prevent="fnTab(false)">주택담보대출</button></li>
                    </ul>
                    -->
                    <div class="gray_box">
                        <p>고객님이 희망하는 대출은 <strong>{{acTpDsc === '3100' ? '신용대출' : '주택담보대출'}}</strong>이에요.</p>
                    </div>
                    <!-- //[v4.0] 25-03-05 탭제거 문구영역 추가 -->
                    
                    <!-- [범위별 클래스 구분 - details 에 클래스 추가]
                        10~40% 초록색 : down
                        41~70% 노란색 : 없음
                        71~    빨간색 : up
                    -->
                    <!-- case1. 낮음 : down  -->
                    <div class="details down" v-show="dsrResult &lt; 40">
                        <div class="analysis ">
                            <p class="h_tit02">DSR 비율이 낮아서 <br>대출가능성이 <em>높아요</em></p>
                            <p>내 예상 DSR <span class="num"><em>{{dsrResult}}</em>% </span></p>
                        </div>
                        <div class="bg">
                            <lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_dsr_result_down.json')" 
                                         :loop="false"
                                         :auto-play="true" 
                                         aria-hidden="true" 
                                         class="bg_dsr_result" 
                                         background="transparent"
                                         >
                            </lottie-animation>
                        </div>
                    </div>
                    <!-- //case1. 낮음 : down  -->
                    <!-- case2. 중간 : 없음  -->
                    <div class="details" v-show="dsrResult &gt; 40 && dsrResult &lt; 70">
                        <div class="analysis ">
                            <p class="h_tit02">DSR 비율이 다소 높아 <br>대출가능성이 <em>낮아요</em></p>
                            <p>내 예상 DSR <span class="num"><em>{{dsrResult}}</em>% </span></p>
                        </div>
                        <div class="bg">
                            <!-- <lottie-player src="../../../../src/assets_v40/images/lottie/bg_dsr_result.json" loop="" autoplay="" aria-hidden="true" class="bg_dsr_result" background="transparent"></lottie-player> -->
                            <lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_dsr_result.json')" 
                                         :loop="false"
                                         :auto-play="true" 
                                         aria-hidden="true" 
                                         class="bg_dsr_result" 
                                         background="transparent"
                                         >
                            </lottie-animation>
                        </div>
                    </div>
                    <!-- //case2. 중간 : 없음  -->
                    <!-- case3. 높음 : up -->
                    <div class="details up" v-show="dsrResult &gt; 70">
                        <div class="analysis ">
                            <p class="h_tit02">DSR 비율이 높아 <br>대출가능성이 <em>낮아요</em></p>
                            <p>내 예상 DSR <span class="num"><em>{{dsrResult}}</em>% </span></p>
                        </div>
                        <div class="bg">
                            <!-- <lottie-player src="../../../../src/assets_v40/images/lottie/bg_dsr_result_up.json" loop="" autoplay="" aria-hidden="true" class="bg_dsr_result" background="transparent"></lottie-player> -->
                            <lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_dsr_result_up.json')" 
                                         :loop="false"
                                         :auto-play="true" 
                                         aria-hidden="true" 
                                         class="bg_dsr_result" 
                                         background="transparent"
                                         >
                            </lottie-animation>
                        </div>
                    </div>
                    <!-- //case3. 높음 : up  -->
                </div> 

                <div class="board_box condition">
                    <p class="h_tit02">내 희망대출 조건은?</p>
                    <div class="detail">
                        <p class="income"><span class="tit">연소득</span><br><strong class="price">{{fn_hanValue(income)}}</strong></p>
                        <p class="rate"><span class="tit">금리</span><strong class="percent">{{lnInt}}%</strong></p>
                    </div>
                    <div class="gray_box">
                        <ul>
                            <li>
                                <span class="key">희망대출금액</span>
                                <span class="val">{{fn_hanValue(lnAm)}}</span>
                            </li>
                            <li>
                                <span class="key">대출기간</span>
                                <span class="val">{{lnDt}}개월</span>
                            </li>
                        </ul>
                        <div class="bottom_area">
                            <p class="dotted_list">신용대출의 경우 대출기간은 5년으로 계산합니다</p>
                        </div>
                        
                    </div>
                </div>

                <!-- 
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
                <div class="board_box board_wrap" v-if="creditOut.length &gt; 0 || (Object.keys(localLoan).length &gt; 0 && localLoan.lnList.length &gt; 0)">
                    <div class="tit_area">
                        <strong class="h_tit02">내가 보유하고 있는 대출은?</strong>
                    </div>
                    <div class="board_sec" v-if="creditOut.length &gt; 0">
                        <p class="sum">확인된 보유대출</p>

                        <!-- 신용대출 -->
                        <div class="cont" v-for="(creditOutObj, index) in creditOut" :key="'credit-' + index">
                            <i :class="classTypeInput(creditOutObj.acTpDsc)"></i>
                            <p class="prod">{{creditOutObj.wrsnm}}</p>
                            <strong class="price">{{creditOutObj.bac | numberFilter}} 원</strong>
                            <p class="info"><span class="interest">연 {{creditOutObj.aplItr}} %</span><span class="period">({{creditOutObj.lnTerm}}개월)</span></p>
                        </div>
                        <p class="info_txt">보유한 대출 중 보험대출의 경우 마지막 납부한 월의 이자율로 반영되므로 금액이 다를 수 있습니다.</p>
                    </div>

                    <div class="board_sec" v-if="Object.keys(localLoan).length &gt; 0 && localLoan.lnList.length &gt; 0">
                        <p class="sum">내가 등록한 보유대출</p>
                        <div class="cont" v-for="(item, index) in localLoan.lnList" :key="index">
                            <i :class="mapping[item.acTpDsc]"></i>
                            <p class="prod">{{item.acTpDsnm}}</p>
                            <strong class="price">{{item.bac | numberFilter}}원</strong>
                            <p class="info"><span class="interest">연 {{item.aplItr}}%</span><span class="period">({{item.lnTerm}}개월)</span></p>
                        </div>
					</div>
                </div>
                
                <div class="gray_box">
                    <p class="dotted_list">현재 정부정책에 의한 DSR 규제비율 및 스트레스 금리를 꼭 확인해보세요</p>
                </div>

                <div class="info_area">
                    <strong class="h_tit01">스트레스 금리란?</strong>
                    <p class="txt">향후, 금리상승시 고객이 과도한 이자를 부담하는 것을 에방하기 위해 고객의 DSR한도를 산출할 때 미래 금리상승 위험을 반영하여 가산하는 금리를 말합니다
                        <br><span class="desc">(출처: 전국은행연합회)</span></p>
                </div>

                <div class="banner_area">
                    <a href="javascript:void(0);" class="link_banner" @click.prevent="fn_movePage('PDPD4001')"><span>나에게 꼭 맞는 <br>대출 상품을 추천드려요</span></a>
                </div>

                <details class="ico_detail_noti" open>
                    <summary><strong>알아두세요</strong></summary>
                    <div class="cont">
                        <ul class="dotted_list">
                            <li>정확한 대출 가능여부 및 한도 확인은 농축협 영업점과 NH콕뱅크에서 실제 대출심사를 통해 확인하실 수 있습니다.</li>
                        </ul>
                    </div>
                </details>

                <div class="btns_wrap">
                    <!-- <button type="button" class="btns lg primary" @click.prevent="fn_movePage('PDPD4061')">다시계산하기</button> -->
                    <button type="button" class="btns lg primary" @click.prevent="movePrev">다시계산하기</button>
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
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import routerService from '@/service/routerService'
import {dayDiff, dateFormat} from '@/utils/date'

import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue

export default {
    name : "PDPD4063",
	data: () => {
        return {
            income                  : "",
            lnAm                    : "",
            lnDt                    : "",
            lnInt                   : "",
            acTpDsc                 : "",

            creditLoanResult        : "",
            securedLoanResult       : "",
            dsrResult               : "",

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

            tmpResult               : 0             // DSR 비율
		}
	},
    created() {
        // this.initComponent(this.params)
    },
    mounted() {
        this.initComponent(this.pageInfo.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)    
    },
	computed: {
		
	},
	mixins: [
        commonMixin
    ],
    methods: {
        initComponent(param = {}) {
            this.income             = param.income || '';
            this.lnAm               = param.lnAm || '';
            this.lnDt               = param.lnDt || '';
            this.lnInt              = param.lnInt || '';
            this.acTpDsc            = param.acTpDsc || '';
            this.creditLoanResult   = param.creditLoanResult || '';
            this.securedLoanResult  = param.securedLoanResult || '';
            this.dsrResult          = param.totalLoanResult || '';
            //this.dsrResult          = param.acTpDsc === '3100' ? param.creditLoanResult : param.dsrResult || '';

            //this.localLoan          = param.localLoan 

            this.mydtCusno  = this.getUserInfo('mydtCusno')
            this.getData()
            this.getLocalData() // 내가 등록한 보유대출

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
					'3999':'ico ico_loan09'
                }
            this.fnTab(true)
        },
        // 보유대출 데이터
        getData() {
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
                
                let tmpCredit          = response.loanListOut || []
                let tmpTerm = {'3100':60, '3150':12, '3210':96, '3230':96, '3240':96, '3250':96, '3260':96, '3271':48, '3290':120}

                //lnTerm
				let nowDay = new Date();
				let yyyy = nowDay.getFullYear()
				let mm   = Number(nowDay.getMonth() + 1) < 10 ? "0" + Number(nowDay.getMonth() + 1) : "" + Number(nowDay.getMonth() + 1)
				let dd   = Number(nowDay.getDate())  < 10 ? "0" + Number(nowDay.getDate())  : "" + Number(nowDay.getDate())

                tmpCredit.forEach((el) => {
					let ischecked = false;
					
                    if (el.acTpDsc == '3220' || Object.keys(tmpTerm).includes(el.acTpDsc) && el.bac) {
                        el.lnTerm = this.getMonthsDifference(yyyy+""+mm+""+dd, el.dueDt)

                        this.creditOut.push(el)
                    }
					//if(ischecked) this.creditOut.push(tmpCredit[idx])
				})

                // this.creditOut          = response.loanListOut || []
                
                this.callJQueryFncExcute()
            });	
		
        },
        classTypeInput(num) {
			if(num === '3100'){
				return 'ico ico_loan08';
			} else if(num === '3150'){
				return 'ico ico_loan07';
			} else if(num === '3210') {
				return 'ico ico_loan05'
			} else if(num === '3220') {
				return 'ico ico_loan02'
			} else if(num === '3230') {
				return 'ico ico_loan03'
			} else if(num === '3240') {
				return 'ico ico_loan03'
			} else if(num === '3250') {
				return 'ico ico_loan03'
			} else if(num === '3260') {
				return 'ico ico_loan03'
			} else if(num === '3271') {
				return 'ico ico_loan01'
			} else if(num === '3290') {
				return 'ico ico_loan04'
			} else if(num === '3999') {
				return 'ico ico_loan09'
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
        getLocalData() {
			let localKey = "loan" + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + "V4";
            this.localLoan = commonService.getStorage(localKey);

			// 초기화
			// 등록한 보유대출이 없는 경우
			// if(Object.keys(this.localLoan).length == 0) {
			// 	this.localLoan = {
			// 		sqno: 0,
			// 		lnList: []
			// 	}
			// }
		},
        fn_movePage(pageId, param) {
			let params = {}
            params = param

			const config = {
				name : pageId,
				params : params
			}
			// close();
			commonService.movePage(config);
		},
        fnTab(flag) {
            this.tmpResult = flag ? this.creditLoanResult : this.securedLoanResult
        },
        movePrev() {
            routerService.movePrev()
        },
        // 한글금액표시
        fn_hanValue(amount) {
            const koreanUnits = ['', '만', '억', '조']
            let han_amount = parseInt((String(amount).replace(/[,]/g, '')) || 0) * 10000 // 만원 단위 화면
            let answer     = ''
            let unit       = 10000
            let index      = 0
            let division   = Math.pow(unit, index)

            while (Math.floor(han_amount / division) > 0) {
                const mod = Math.floor(han_amount % (division * unit) / division)
                if (mod) {
                    const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    answer = `${modToString}${koreanUnits[index]} ` + answer
                }
                division = Math.pow(unit, ++index)
            }
            return (answer + "원").replace(" 원", "원")
        },
    },
    components: {
		Page,
        FootersV2,
        LottieAnimation
	},
}
</script>