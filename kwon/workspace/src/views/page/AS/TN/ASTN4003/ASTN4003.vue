<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 해지계좌목록
* @ 페이지설명 : 자산 > 숨은 자산 > 해지계좌목록
* @ 파일명     : src/views/page/AS/TN/ASTN4003/ASTN4003.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-10
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-10              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
        <div class="popup_header">    
			<h1>해지계좌목록</h1><!-- 25-03-21 문구수정 -->
			<!-- 25-03-21 삭제 <button type="button" class="prev"><span class="blind">이전</span></button>  -->
		</div>
		<div class="popup_content">
            <section class="sleep_account">
                <p class="total">총 <em>{{termCnt}}</em>건</p>

                 <!--계좌가 있을경우-->
                 <div class="board_box" v-if="tmpList.length &gt; 0">
                    <ul class="assets_list">
                        <template v-for="(item, idx) in termList">
                        <li :key="idx">
                            <a href="javascript:void(0);" @click.prevent="fnOpenDtl(item)" role="button">
                                <i :class="'ico_bank '+fnChgBnk(item.bank_code, 1)"><span class="blind">{{fnChgBnk(item.bank_code, 2)}}</span></i>
                                <div>
                                    <strong class="org">{{fnChgBnk(item.bank_code, 2)}} {{item.prod_name}}</strong>
                                    <div class="account"><span class="blind">계좌번호</span>{{item.account_num}} </div>
                                    <strong class="num"><span class="blind">금액</span>{{item.payment_amount | numberFilter}}원</strong>
                                    <span class="pin">해지신청일 {{fnDateFormat(item.termination_date)}}</span>
                                </div>
                            </a>
                        </li>
                        </template>
                    </ul>
                </div>
                <div class="board_box" v-else>
					<div class="no_result">
						<p class="text">조회 결과가 없어요.</p>
						<div class="bg">
                            <lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_no_result.json')" class="bg_no_result"
                                         ref="anim"
                                         :loop="true"
                                         :auto-play="true" 
                                         :speed="1"
                                         aria-hidden="true" 
                                         >
                        </lottie-animation>
						</div>
					</div>
				</div>

            </section>
		</div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
		
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import {mapActions} from 'vuex'
import {dayDiff, dateFormat} from '@/utils/date'
import {defineAsyncComponent} from 'vue'
import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue
import _ from 'lodash'

export default {
    name : "ASTN4003",
    data: () => {
        return {
            termList       : [],  // 해지계좌정보목록
            termCnt        : 0,   // 해지계좌 건수
            bnkInfo        : [],  // 은행코드목록
            mydtAcStscList : [],  // 해지구분코드 목록

            startNum       : 1,   // 시작할 데이터 숫자
            resCnt         : 0,   // 서비스 응답 데이터 건수
            resTotCnt      : 0,   // 서비스 해지 계좌 총 건수
            tmpList        : [],  // 서비스 응답용 목록

            isDev    : import.meta.env.VITE_ENV == 'D' || window.location.host.indexOf('localhost') > -1 // 개발과 로컬
        }
    },
	computed: {
    },
    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

        this.initComponent(this.params)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        initComponent(param) {
            const config1 = {
                url: '/as/tn/01r03',
                data: {
                    inqDsc  : '3'    // 1:기관코드->은행코드, 2:은행코드->기관코드, 3:은행코드전체목록
                }
            }
            apiService.call(config1).then(response =>{
                this.bnkInfo = response.bnkList
            })
            this.getData()
            
        },
        getData() {
            let now = new Date()
            let sysdate = dateFormat(now, 'YYYYMMDD')       // 현재 날짜
            let m3before = new Date()
            m3before.setMonth(now.getMonth()-3)

            let m3bdate = dateFormat(m3before, 'YYYYMMDD')  //  3달 전


            const config = {
                url: '/as/tn/03r01',
                data: {
                        identity_num     : this.isDev ? "9002011243111" : null,                // 실명번호 테스트를 위해 세팅
                        search_startdate : m3bdate,                        // 조회 시작일자
                        search_enddate   : sysdate,                        // 조회 종료일자
                        search_start_num : this.startNum,                  // 지정 번호
                        data_amount      : 20,                             // 요청 데이터 건수
                        mydt_cusno       : this.getUserInfo("mydtCusno")   // 마이데이터고객번호
                      }
            };

            apiService.call(config).then(response => {
                this.resCnt   += response.resp_data_amount  // 조회된 건수
                this.resTotCnt = response.total_amount     // 총건수

                this.tmpList = response.termination_list // 해지계좌정보목록

                this.tmpList.filter(el => el.termination_result_code == '0000').forEach(el => 
                        this.termList.push({
                                            termination_result_type : el.termination_result_type // 해지 결과 코드 구분
                                          , termination_result_code : el.termination_result_code // 해지 결과 코드 구분
                                          , recipient_result_type   : el.recipient_result_type   // 잔고이전 결과코드 구분
                                          , recipient_result_code   : el.recipient_result_code   // 잔고이전 결과코드
                                          , termination_date        : el.termination_date        // 해지일자
                                          , opening_date            : el.opening_date            // 개설 일자
                                          , maturity_date           : el.maturity_date           // 만기 일자
                                          , account_balance         : el.account_balance         // 원금(잔액)
                                          , income_tax              : el.income_tax              // 소득세
                                          , local_tax               : el.local_tax               // 지방 소득세
                                          , additional_tax          : el.additional_tax          // 추징 소득세
                                          , other_tax               : el.other_tax               // 기타 세금
                                          , interest                : el.interest                // 이자(신탁 이익)
                                          , penalty                 : el.penalty                 // 과징금
                                          , transfer_fee            : el.transfer_fee            // 이체 수수료
                                          , payment_amount          : el.payment_amount          // 지급액
                                          , account_num             : el.account_num             // 해지 계좌번호
                                          , bank_code               : el.bank_code               // 해지 계좌 금융회사 코드
                                          , bank_name               : this.bnkInfo.find(ell => ell.repNbnkC == el.bank_code).repNbnkCNm // 해지 계좌 기관코드명
                                          , prod_name               : el.prod_name               // 해지 계좌 상품명
                                          , recipient_type          : el.recipient_type          // 잔고이전 구분
                                          , payment_amount          : el.payment_amount          // 지급액
                                          , termination_date        : el.termination_date        // 해지 신청일자
                                          , recv_account_num        : el.recv_account_num        // 수취 계좌번호
                                          }))
                

                if(this.resCnt < this.resTotCnt) {
                    this.fnNextSrch()
                } else {
                    this.termCnt = this.termList.length
                }
                

            })
        },

        fnNextSrch() {
            this.startNum = this.startNum + 20

            this.getData()
        },
        // 해지 상세조회 팝업 열기
        fnOpenDtl(row) {
            let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4013/ASTN4013"))
            const config = {
                component : compName,
                params    : {
                    dsc                   : '01',                        // 해지목록조회에서 팝업 열기
                    terminationResultType : row.termination_result_type, // 해지 결과 코드 구분
                    terminationResultCode : row.termination_result_code, // 해지 결과 코드 구분
                    recipientResultType   : row.recipient_result_type,   // 잔고이전 결과코드 구분
                    recipientResultCode   : row.recipient_result_code,   // 잔고이전 결과코드

                    recipientType         : row.recipient_type,          // 잔고이전 구분
                    prodName              : row.prod_name,               // 상품명
                    //accountName           : row.accountName,           // 계좌 예금주명
                    terminationDate       : row.termination_date,        // 해지일자
                    openingDate           : row.opening_date,            // 개설 일자
                    maturityDate          : row.maturity_date,           // 만기 일자
                    accountBalance        : row.account_balance,         // 원금(잔액)
                    incomeTax             : row.income_tax,              // 소득세
                    localTax              : row.local_tax,               // 지방 소득세
                    additionalTax         : row.additional_tax,          // 추징 소득세
                    otherTax              : row.other_tax,               // 기타 세금
                    interest              : row.interest,                // 이자(신탁 이익)
                    penalty               : row.penalty,                 // 과징금
                    transferFee           : row.transfer_fee,            // 이체 수수료
                    paymentAmount         : row.payment_amount,          // 지급액

                    accountNum            : row.account_num,             // 계좌 번호
                    accountType           : row.account_type,            // 계좌 종류
                    infOfrmnOrgC          : this.fnChgBnk(row.bank_code,1),   // 정보제공자기관코드
                    infOfrmnOrgNm         : this.fnChgBnk(row.bank_code,2),   // 정보제공자기관코드명
                    recvBankCode          : row.recv_bank_code,          // 수취 금융회사 코드
                    recvAccountNum        : row.recv_account_num         // 수취 계좌번호
                }
            }
            modalService.openPopup(config).then(() => {
                //this.getData();
            })
        },
        /* 은행 -> 기관 */
        fnChgBnk(code, flag) {
            let row = this.bnkInfo.find(el => el.repNbnkC == code) // 찾으려는 기관
            
            if(flag == 1) return row.infOfrmnOrgC  // 기관코드
            return row.infOfrmnOrgNm               // 기관코드명
        },
        fnLpad(v, len, pv) {
            v = v + '';
            return v.length >= len ? v : new Array(len - v.length + 1 ).join(pv) + v;
        },

        fnDateFormat(dt) {
            if(_.isEmpty(dt) || dt == "00000000") {
                return "-"
            }

            return dateFormat(dt, 'YYYY.MM.DD')
        },

    },
    components : {
        LottieAnimation
    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}
</script>

