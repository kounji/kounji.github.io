<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 약관동의
* @ 페이지설명 : 자산 > 숨은 자산 > 약관동의
* @ 파일명     : src/views/page/AS/TN/ASTN4004/ASTN4004.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-13
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-13              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01">

		<div class="popup_header">    
			<h1>이용약관동의</h1>
		</div>

		<div class="popup_content">
            <section class="sleep_account">
				<div class="tit_area">
					<h2 class="headline">계좌 해지 가능 여부 확인을 위해<br>
						이용약관에 동의해 주세요.	
					</h2>
				</div>

				<div class="agree_wrap full_view">
					<div class="check_all">
						<div class="checkbox border">
							<input type="checkbox" name="allagree1" id="stlt_all" ref="stlt_all" required="" title="전체동의" v-model="allChk" @change="fnChgAllAgree($event)">
							<button type="button" class="btn_detail ico_arrow" @click.prevent="fnOpenDtlPop('all')">전체동의<span class="blind">상세보기</span></button>
						</div>
					</div>
					<div class="view_cont">
						<ul class="agree_list">
							<li v-for="(item, idx) in stltArray" :key="idx">
								<div class="checkbox">
									<input type="checkbox" name="agree1" :title="item.stltTinm" v-model="agreeList" :value="item.stltSqno" @change="fnChgOneAgree($event, item)" :checked="item.checked">
									<button type="button" class="btn_detail ico_arrow" @click.prevent="fnOpenDtlPop(item.stltSqno)">{{item.stltTinm}}<span class="blind">상세보기</span></button>
								</div>
							</li>
						</ul>
					</div>
				</div>
                <div class="formItem" v-if="callDsc == 'E'">
                    <div class="input">
                        <label for="userEmail">서비스 변경 내용 수신 동의해요.</label>
                        <input type="text" name="userEmail" id="userEmail" title="이메일 주소" v-model="userEmail" placeholder="이메일 주소를 입력해 주세요.">
                    </div>
                </div>
            </section>
		</div>
        <div class="popup_footer fixed">
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" :disabled="!isAgree" @click.prevent="fnNextAgree(callDsc)">동의</button><!-- 활성화시 disabled 제거-->
            </div>
        </div>

		<a href="#nolink" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
		
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import {mapGetters, mapActions} from 'vuex'
import {defineAsyncComponent} from 'vue'
import _ from 'lodash'

export default {
    name : "ASTN4004",
    data: () => {
        return {
            stltArray       : [],      // 약관목록 array
            allChk          : false,   // 모두 동의여부
            agreeList       : [],      // 약관 동의여부 목록
            
            param           : {},      // 부모로부터 넘겨받은 파라미터
            callDsc         : '',      // 계좌해지 가능여부 조회, 기부, KCB 구분 코드 E,D,K
            paramObj        : {},      // API용 입력 파라미터

            isAgree         : false,   // 동의 버튼 활성화 여부(고객위임여부)
            delegationDtm   : '',      // 고객위임일시
            userEmail       : '',      // 고객 이메일주소
        }
    },
	computed: {
        ...mapGetters('user', [
            'userTermsAgreeList',
            'userTermsInvtInfo',
            'userRecvInfo'
        ]),
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

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
            this.param = param
            this.callDsc = this.param.callDsc // E:계좌해지 가능여부 조회, D:기부, F:금융인증서

            if(this.callDsc == 'E') {
                this.paramObj = this.param.eligibilityObj
            } else if(this.callDsc == 'D') {
                this.paramObj = this.param.donationObj
            } else if(this.callDsc == 'F') {
                this.paramObj = this.param.kcbObj
            }
            
            this.getData()
            
        },

        getData() {
            // 서비스 가입 시 입력한 이메일 주소 가져오기
            const config = {
                url: '/as/tn/01r03',
                data: {
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
            }
            apiService.call(config).then(response =>{
                if(response.existYn == 'Y') this.userEmail = response.emailAdr
            })

            this.stltArray = this.param.stltList // 약관 목록

            // sqno 채번
            this.stltArray.forEach((el, idx) => {
                el.stltSqno = idx+1
            })
        },

        /* 약관 상세보기 */
        fnOpenDtlPop(sqno, btnYn) {
            // btnYn => 체크박스 이벤트 경우 체크가 된 상태에서 해당 함수를 호출하고, 버튼 이벤트 경우 체크하지 않고 호출함
            if(this.callDsc == 'F') { // 금융인증서 약관은 상세 동의를 하지 않아도 체크가 활성화 됨
                let title   = ""    // 약관 제목
                let url     = ""    // 약관 url

                if(sqno === 1) {
                    title = "인증서 본인 확인 서비스 이용약관"
                    url="https://www.mydatacert.org/mydata/terms.html"                
                } else if(sqno === 2) {
                    title="개인정보 처리 동의"
                    url="https://www.mydatacert.org/mydata/privacy_agreement.html"
                } else {
                    title="고객식별정보 수집·이용 및 위탁 동의"
                    url="https://www.mydatacert.org/mydata/consignment_agreement.html"
                }

                let comName = defineAsyncComponent(() => import("@/views/page/CO/AR/COAR2017/COAR2017"))

                const config = {
                    component : comName,
                    params : {
                        title   : title,
                        url     : url
                    }
                }

                modalService.openPopup(config).then(response => {
                    if(response === "agree") {
                        // COAR2011
                        if(sqno == 'all') { // 전체 동의인 경우
                            this.agreeList = []
                            this.stltArray.forEach(el => this.agreeList.push(el.stltSqno))
                        } else {
                            if(this.agreeList.findIndex(el => el == sqno) < 0) this.agreeList.push(sqno)
                        }
                        
                    } else {
                        if(sqno == 'all') {
                            this.agreeList = []
                        } else {
                            let idx = this.agreeList.findIndex(el => el == sqno)
                            this.agreeList.splice(idx, 1) // 해당 약관 체크 해제
                        }

                        this.fnSetChk() // 전체 동의 체크박스 셋팅
                    }
                })
            } else {
                if(!btnYn && sqno != 'all') {
                    let idx = this.agreeList.findIndex(el => el == sqno) // 체크되어있는 약관을 버튼 이벤트로 다시 눌렀을 때 중복 데이터가 쌓이지 않게 함

                    if(idx < 0) {
                        this.agreeList.push(sqno) // 버튼 이벤트인 경우 체크박스와 동일하게 체크되게 해줌
                    }
                }

                let flag = sqno == 'all' ? true : false
                let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4005/ASTN4005"))
                const config = {
                    component : compName,
                    params : {
                        flag      : flag ? "all" : "",     // 전체여부
                        stltArray : flag ? this.stltArray : [this.stltArray[sqno-1]] // 약관 array
                    }
                }
                modalService.openPopup(config).then((response) => {
                    if(response.agreeYn == 'Y') {
                        if(response.sqno == 'all') {  // 전체 동의인 경우
                            this.agreeList = []
                            this.stltArray.forEach(el => this.agreeList.push(el.stltSqno))
                            
                        } else {                      // 개별 동의인 경우
                            //this.agreeList.push(response.sqno)
                        }
                    } else {                        // 그냥 닫은 경우
                        if(sqno == 'all') {
                            this.agreeList = []
                        } else {
                            let idx = this.agreeList.findIndex(el => el == sqno)
                            this.agreeList.splice(idx, 1) // 해당 약관 체크 해제
                            
                        }
                    }

                    this.fnSetChk() // 전체 동의 체크박스 셋팅
                })
            }
            
        },
        /* 전체 체크 세팅 */
        fnSetChk() {
            /* 동의 버튼 비활성화 여부 */
            if(this.agreeList.length == this.stltArray.length) this.isAgree = true
            else this.isAgree = false

            if(this.stltArray.length == this.agreeList.length) {
                this.allChk = true
            } else {
                this.allChk = false
            }
        },

        /* 전체 동의 */
        fnChgAllAgree(e) {
            let flag = e.target.checked

			if(flag) { // 전체 동의
                if(this.callDsc != 'F') {
                    this.fnOpenDtlPop('all', true)
                } else { // 금융인증서 약관은 상세동의를 하지 않고 체크를 할 수 있음
                    this.agreeList = []
                    this.stltArray.forEach((el)=> this.agreeList.push(el.stltSqno))
                    this.allChk = true
                }
			}
			else {     // 전체 동의 해제
                this.agreeList = []
			}
        },

        /* 개별 동의 */
        fnChgOneAgree(e, item) {
            let chk = e.target.checked
            
            if(chk) { // 체크하려는 경우
                if(this.callDsc != 'F') {
                    this.fnOpenDtlPop(item.stltSqno, true)
                } else { // 금융인증서 약관은 상세동의를 하지 않고 체크를 할 수 있음
                    this.fnSetChk()
                }
            } else {  // 체크해제하려는 경우
                this.fnSetChk()
            }
        },
        /* 전체 동의 후 분기 처리 */
        fnNextAgree(dsc) {
            let now  = new Date();
            let yyyy = now.getFullYear()
            let mm   = Number(now.getMonth() + 1) < 10 ? "0" + Number(now.getMonth() + 1) : "" + Number(now.getMonth() + 1)
            let dd   = Number(now.getDate())  < 10 ? "0" + Number(now.getDate())  : "" + Number(now.getDate())
            let hh   = now.getHours()
            let mi   = now.getMinutes()

            this.delegationDtm = yyyy+mm+dd+hh+mi

            // callUrl : E = 계좌해지 가능여부 조회, D = 기부, K = KCB 약관
            if(dsc == 'E') {
                this.fnCallEligibility(1)
            } else if(dsc == 'D') {
                this.fnCallDonation()
            } else if(dsc == 'F') {
                this.fnCallFinance()
            }
        },
        /* 계좌해지 가능여부 조회 API 호출 */
        fnCallEligibility(tmpAcntType) {
            this.accountType = tmpAcntType
            // 1:수시입출금, 2:예적금
            // 1번을 세팅하고 5006번 에러가 돌아오면 2번을 세팅해야 한다.
            
            let tmp = {
                apiOrgCode      : this.paramObj.apiOrgCode,      // 이용기관코드
                delegationYn    : this.isAgree,                  // 고객위임여부
                delegationDtm   : this.delegationDtm,            // 고객위임일시
                userEmail       : this.userEmail,                // 고객 이메일주소
                bankCode        : this.bankCode,                 // 개설 금융회사 코드
                accountNum      : this.paramObj.accountNum,      // 계좌 번호
                depositSequence : this.paramObj.depositSequence, // 예금 회차 번호
                accountType     : this.accountType               // 계좌 종류
            }

            // *해지가능여부 조회
            /*
            const config = {
                url: '/as/tn/04r01',
                data: {
                    apiOrgCode      : this.paramObj.apiOrgCode,      // 이용기관코드
                    delegationYn    : this.isAgree,                  // 고객위임여부
                    delegationDtm   : this.delegationDtm,            // 고객위임일시
                    userEmail       : this.userEmail,                // 고객 이메일주소
                    bankCode        : this.bankCode,                 // 개설 금융회사 코드
                    accountNum      : this.paramObj.accountNum,      // 계좌 번호
                    depositSequence : this.paramObj.depositSequence, // 예금 회차 번호
                    accountType     : this.accountType               // 계좌 종류
                }
            }
            apiService.call(config).then(response =>{
                console.log("@@@ response=>", response)
                if(response.rspC == '0000') { // 정상 처리
                    // 계좌이체/기부로 이동
                    let param = {
                        apiOrgCode   : this.paramObj.apiOrgCode, // 이용기관코드
                        accountType  : this.accountType          // 
                    }
                    this.close(param)

                } else if(response.rspC == '5006' && tmpAcntType == 1) { // 계좌 종료 오류 && 수시입출금
                    this.fnCallEligibility(2) // 예적금으로 재호출
                } else if(response.rspC == '' && tmpAcntType == 2) {     // 1,2번 모두 오류인 경우 해지 비트 업데이트

                } 

            })
            */
        },

        /* 기부 약관 동의 */
        fnCallDonation() {
            this.close({perInfoYn: this.paramObj.receiptYn == 'Y' ? 'Y' : 'N'})
        },
        /* KCB 약관 동의 */
        fnCallKCB() {
            this.close('success')
        },

        isEmpty(value) {
            if(typeof(value) == 'object') {
                if(Array.isArray(value)) {
                    return value.length < 1 ? true : false
                } else {
                    return Object.keys(value).length < 1 ? true : false
                }
            }

            return (value === null || value === undefined || value.length < 1) ? true : false
        },


    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>