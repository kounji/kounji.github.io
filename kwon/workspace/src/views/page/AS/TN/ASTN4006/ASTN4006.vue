<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 계좌이체 및 기부 선택
* @ 페이지설명 : 자산 > 숨은 자산 > 계좌이체 및 기부 선택
* @ 파일명     : src/views/page/AS/TN/ASTN4006/ASTN4006.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-14
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-14              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>계좌해지신청</h1>
			<button type="button" class="prev" @click.prevent="close()"><span class="blind">이전</span></button>
		</div>

		<div class="popup_content">
            <section class="close_account">
                <!-- 25-03-10 headline 추가 -->
                <p class="headline">해지 및 잔고이전 방법을<br>선택해주세요.</p>
                <!-- //25-03-10 headline 추가 -->

                <div class="board_box">    
                    <h2 class="title">해지대상 계좌</h2>        

                    <div class="assets_info">
                        <i :class="'ico_bank '+ infOfrmnOrgC"><span class="blind">{{infOfrmnOrgNm}}</span></i>
                        <div>
                            <strong class="org">{{infOfrmnOrgNm + ' ' + acWrsnm}}</strong>
                            <div class="account"><span class="blind">계좌번호</span>{{widlAcccountNum}}<span>비활동</span></div>
                            <strong class="num"><span class="blind">금액</span>{{acNowBac | numberFilter}}{{curc}}</strong>
                        </div>
                    </div>
                </div>

                <div class="close_info">
                    <h2>잔액 이전 방법</h2>

                    <div class="radio_round_group">
                        <div class="radio round">
                            <input type="radio" name="send_account" id="send_account1" :disabled="onlyDonation" ref="recipientType1"
                                :checked="recipientType=='T' ? true : false" v-model="recipientType" value="T" @change="fnChgType('T')">
                            <label for="send_account1">
                                <strong class="tit">계좌 이체</strong><!-- 25-03-10 문구수정 -->
                            </label>
                        </div>
                        <div class="radio round">
                            <input type="radio" name="send_account" id="send_account2" :disabled="onlyAccount || recipientFlag" ref="recipientType2"
                                :checked="recipientType=='D' ? true : false" v-model="recipientType" value="D" @change="fnChgType('D')">
                            <label for="send_account2">
                                <strong class="tit">서민금융진흥원에 기부</strong>
                            </label>
                        </div>
                    </div>
                </div>

                <template v-if="recipientType == 'T'">
                    <div class="close_info">
                        <div class="tit_area">
                            <h2>이체 은행</h2><!-- 25-03-10 문구수정 / 25-03-21 문구수정-->
                            <button type="button" class="btns" @click.prevent="fnSelectMyAccount()">내계좌선택</button>
                        </div>
                        <div class="formItem">
                            <span class="label">은행</span>
                            <button type="button" class="btns_select" title="은행 선택하기" @click.prevent="fnSelectBank()"><span class="blind">현재선택</span>{{recvBankCodeNm}}</button> 
                        </div>

                        <div class="formItem" :class="accountPass == '1' ? 'confirm' : accountPass == '2' ? 'error' : ''">
                            <span class="label">계좌번호</span>
                            <div class="input">
                                <input type="text" inputmode="decimal" name="" id="account" placeholder="계좌번호 입력" title="계좌번호" @input="fnKeyDown($event)" v-model="recvAccountNum"/>
                                <!--
                                <button type="button" class="account" title="계좌번호 입력">
                                    <template  v-if="recvAccountNum.length &gt; 0">
                                        <span class="blind">입력된 계좌</span><span class="num">{{recvAccountNum}}</span>
                                    </template>
                                    <template v-else>
                                        계좌번호 입력
                                    </template>
                                </button>  
                                -->                         
                                <button type="button" class="btns" :disabled="(accountPass == '1' || recvAccountNum.length == 0 || recvBankCode.length == 0)" @click.prevent="fnTermRecipient()">계좌확인</button>
                            </div>
                            <!-- 0:계좌를 입력하지않은 경우, 1:계좌확인이 된 경우, 2:계좌번호에 이상이 생긴 경우 -->
                            <span class="error_txt" v-if="accountPass == '1' || accountPass == '2'">{{accountPass == '1' ? '계좌확인이 완료되었어요.' : '계좌번호를 다시 확인해 주세요.'}}</span>
                        </div>
                        <!-- 25-06-05 문구추가 -->
                        <ul class="info_list">
                            <li><strong class="point">농축협 계좌</strong>로 이체는  금융결제원 정책에 따라 추후 제공 예정입니다.</li>
                            <li>NH콕마이데이터에 연결된 계좌중 금융결제원 정책에 따라 실제 해당 기능(해지 및 잔고 이전)을 제공하는 은행권 계좌에만 잔고를 이전할 수 있습니다.</li>
                        </ul>
                        <!-- //25-06-05 문구추가 -->
                    </div>
                </template>
                <template v-else>
                    <div class="close_info">
                        <h2>기부금영수증 발급</h2>
                        <div class="radio_box_group">
                            <div class="radio">
                                <input type="radio" name="transfer_agree" id="transfer_agree1" v-model="receiptYn" value="Y" checked @change="fnReceipt('Y')">
                                <label for="transfer_agree1"><span class="blind">기부금영수증</span>발급</label>
                            </div>
                            <div class="radio">
                                <input type="radio" name="transfer_agree" id="transfer_agree2" v-model="receiptYn" value="N" @change="fnReceipt('N')">
                                <label for="transfer_agree2"><span class="blind">기부금영수증</span>미발급</label>
                            </div>
                        </div>
                        <!--발급 선택시에만 노출 -->
                        <ul class="dotted_list">
                            <li>국세청 연말정산 간소화 서비스에 자동 반영됩니다.</li>
                            <li>영수증 발급 위해 동의가 필요합니다.</li>
                        </ul>
                    </div>

                    <div class="close_info">
                        <h2>약관동의</h2>

                        <div class="check_box_group">
                            <div class="checkbox" v-for="(item, index) in stltArray" :key="index">
                                <input type="checkbox" name="check" required="" :id="'check_'+index" :title="item.stltTinm" 
                                    v-model="agreeList" @change="fnSetChk()" :value="item.stltSqno" :disabled="receiptYn == 'Y' ? false:true">
                                <button type="button" class="btn_detail ico_arrow" @click.prevent="fnOpenDtlPop(item.stltSqno)">{{item.stltTinm}}<span class="blind">상세보기</span></button>
                            </div>
                        </div>
                        <!-- //25-03-10 약관 수정 -->
                    </div>

                    <!--기부금영수증 발급 선택시 번호노출-->
                    <div class="close_info">
                        <h2>실명번호</h2>
                        <p class="txt">{{maskIdentityNum}}</p>
                    </div>
                    <!--//기부영수증 발급 선택시 번호노출-->
                </template>
                
                <details class="ico_detail_noti" open>
                    <summary><strong>알아두세요</strong></summary>
                    <div class="cont">
                        <!-- 25-03-10 문구수정 -->
                        <ul class="dotted_list">
                            <li>어카운트인포 계좌통합관리 서비스로 소액 비활동성  계좌를 해지하고 잔액은 본인명의 수시 입출금식 계좌로 이전 또는 서민금융진흥원에 기부 할 수 있습니다.</li>    
                            <li>계좌해지 신청 후 취소 불가능합니다.</li>
                            <li>계좌이체 시 금융기관에 따라 이체수수료가 발생될 수 있습니다.</li>
                            <li>계좌의 관련 세부사항은 해당 금융회사에 문의하시기 바랍니다.</li>
                            <li>압류 및 가압류 계좌로 잔고를 이전하실 경우 해당 계좌로 입금된 잔고는 되찾으실 수 없습니다.</li>
                            <li>마이너스 통장의 마이너스(-) 금액은 잔액이 '0'원으로 표기됩니다.</li>
                            <li>비활동성 계좌는 1년 이상 입출금 거래가 없는 계좌(만기가 있는 경우 만기 후 1년이 지난 계좌)입니다.</li>
                            <li>투자재산(주식,채권,파산상품 등), 세제혜택상품, 유효한 계약 상품(WRAP, 신탁 등)을 보유한 계좌는 활동성 계좌로 분류 됩니다.</li>
                        </ul>
                        <!-- //25-03-10 문구수정 -->
                    </div>
                </details>

            </section>
		</div>

        <div class="popup_footer fixed">
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" :disabled="accountPass!='1'" @click.prevent="fnNextPage()">해지신청</button><!-- 25-03-10 문구수정 -->
            </div>
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
import {defineAsyncComponent} from 'vue'
import _ from 'lodash'
import Template from '../../../XX/template/template.vue'

export default {
    name : "ASTN4006",
    data: () => {
        return {
            param            : {},      // 부모로부터 넘겨받은 파라미터
            paramObj         : {},      // 잔고이전 수취계좌 확인 조회 API 출력값 객체
            bnkInfo          : [],      // 은행코드 목록
            terminationId    : "",      // 거래검증ID

            acWrsnm          : "",      // 계좌상품명
            //mydtAcno         : "",      // 계좌번호
            acNowBac         : 0,       // 금액
            curc             : "",      // 통화코드명


            recvBankCode     : '',      // 수취 금융회사 코드
            recvBankCodeNm   : '',      // 수취 금융회사 코드명
            recvAccountNum   : '',      // 수취 계좌번호
            widlBankCode     : '',      // 출금 금융회사 코드
            widlAcccountNum  : '',      // 출금 계좌번호
            maskIdentityNum  : '',      // 마스킹 실명번호(기부 선택시 보여줌)
            recipientType    : '',      // 잔고이전 구분 T:계좌이체, D:기부
            accountType      : '',      // 계좌 종류(1:수시입출금, 2:예적금)
            receiptYn        : '',      // 기부금 영수증 발급 여부
            perInfoYn        : '',      // 제3자 제공동의 여부

            recvName         : '',      // 수취계좌 확인 조회 리턴 데이터(수취 계좌 예금주명)
            recvBranchCode   : '',      // 수취계좌 확인 조회 리턴 데이터(수취 계좌 관리점 코드)

            accountPass      : '0',     // 계좌확인 여부(해지신청 버튼이 활성화됨)
            onlyAccount      : false,   // 계좌이체 여부
            onlyDonation     : false,   // 기부 여부

            infOfrmnOrgC     : '',      // 정보제공자기관코드
            infOfrmnOrgNm    : '',      // 정보제공자기관코드명

            stltArray        : [],      // 기부 약관목록
            agreeList        : [],      // 기부 약관동의목록
            isAgree          : false,   // 기부 동의 여부

            recipientFlag    : false,   // 수취계좌확인 API 호출 여부

            isDev    : import.meta.env.VITE_ENV == 'D' || window.location.host.indexOf('localhost') > -1 // 개발과 로컬

        }
    },
	computed: {
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
            //this.refs["recipientType1"].click()
            this.recipientType   = "T" // 잔고이전 구분 T:계좌이체, D:기부 초기값

            this.recvBankCodeNm  = "은행선택" // 초기값

            this.infOfrmnOrgC    = this.param.infOfrmnOrgC  // 정보제공자기관코드
            this.infOfrmnOrgNm   = this.param.infOfrmnOrgNm // 정보제공자기관코드명
            this.curc            = this.param.curc
            this.accountType     = this.param.accountType   // 계좌종류
            
            this.acWrsnm         = this.param.acWrsnm       // 계좌상품명
            this.widlBankCode    = this.param.bankCode      // 해지할 계좌 은행코드
            this.widlAcccountNum = this.param.mydtAcno      // 해지할 계좌 계좌번호
            this.depositSequence = this.param.mydtScNo      // 예금 회차 번호
            this.acNowBac        = this.param.acNowBac      // 잔액

            this.terminationId = this.param.terminationId   // 거래검증ID
            
            this.getData()
        },

        getData() {
            this.stltArray = [
                    {stltTinm : '[필수] 개인정보 제3자(서민금융진흥원) 제공동의', stltCntn : '<p class="terms_txt">금융결제원 계좌통합관리업무는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 외부에 공개 또는 제3자에게 제공하지 않습니다. 다만, 아래의 경우는 예외로 합니다.</p><div class="border_box"><ul><li><span class="num">1.</span>정보주체가 사전 동의한 경우</li><li><span class="num">2.</span>법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li></ul></div><p class="terms_txt">금융결제원 계좌통합관리업무의 개인정보 제3자 제공 내역은 다음과 같습니다.</p><dl><dt>제공 받는자</dt><dd><strong class="terms_txt_point">서민금융진흥원</strong></dd><dt>이용목적</dt><dd><strong class="terms_txt_point">기부영수증 발급 및 소득공제 지원</strong></dd><dt>개인정보 항목</dt><dd><ul class="terms_txt_point"><li><span class="num">가.</span>정보주체의 동의에 의한 제공 : 휴대폰 번호</li><li><span class="num">나.</span>법인세법 등 관련 법령에 의한 제공 : 성명, 주민등록번호, 기부금액, 기부일시</li></ul></dd><dt>보유 및 이유기간</dt><dd><strong class="terms_txt_point">이용목적달성일로부터 5년</strong></dd></dl>'},
                ]
                
            // sqno 채번
            this.stltArray.forEach((el, idx) => {
                el.stltSqno = idx+1
            })
            
            const config = {
                url: '/as/tn/01r03',
                data: {
                        inqDsc : "3",       // 1:기관코드->은행코드, 2:은행코드->기관코드, 3:목록 전체
                        //inqCd  : this.infOfrmnOrgC
                      }
            };

            apiService.call(config).then(response => {
                this.bnkInfo = response.bnkList
            })
        },

        // 잔고이전 구분 선택 이벤트
        fnChgType(type) {
            this.accountPass     = "0" // 해지신청버튼 비활성화(0:비활성, 1:활성)
            this.maskIdentityNum = ""  // 마스킹 실명번호 초기화
            this.agreeList       = []  // 동의한 약관 목록 초기화
            // type:T=계좌이체, D=기부
            if(type == 'T') {
                // 기부 관련 제거
            } else {
                this.receiptYn = "Y" // 기부금영수증 발급이 초기값
                // 계좌이체 관련 제거
                // 마스킹된 실명번호 가져오는 서비스 호출
                const config = {
                url: '/as/tn/06r03',
                data: {
                        mydt_cusno     : this.getUserInfo("mydtCusno") // 마이데이터 고객번호
                      }
                };

                apiService.call(config).then(response => {
                    this.maskIdentityNum = response.maskRlno.substr(0,6) + "-" + response.maskRlno.substr(6) // 마스킹된 실명번호(XXXXXX-*******)
                })
            }
        },
        /* 잔고이전 수취 계좌 확인 조회 API */
        fnTermRecipient() {
            // 09:00~22:00만 이용 가능
            let now = new Date()
            let hh  = this.fnLpad(now.getHours(),2,"0")
            let mi  = this.fnLpad(now.getMinutes(),2,"0")
            let sysdtm = hh+""+mi

            if(sysdtm < "0900" || sysdtm > "2200") {
                modalService.alert("서비스 제공시간은 09:00 ~ 22:00입니다.")
                this.closeAll()
                return
            }
            
            const config = {
                url: '/as/tn/06r01',
                data: {
                        recv_bank_code     : this.recvBankCode,             // 수취 금융회사 코드
                        recv_account_num   : this.recvAccountNum,           // 수취 계좌번호
                        widl_bank_code     : this.widlBankCode,             // 출금 금융회사 코드
                        widl_account_num   : this.widlAcccountNum,          // 출금 계좌번호
                        termination_id     : this.terminationId,            // 거래검증ID
                        mydt_cusno         : this.getUserInfo("mydtCusno"), // 마이데이터고객번호
                        recv_identity_num  : this.isDev ? "9002011243111" : null,               // 실명번호 테스트를 위해 세팅
                      }
            };

            apiService.call(config).then(response => {
                /*
                    수취계좌확인 API를 호출한 후 기부 예상금액조회를 하기 전 termination_id가 끊기기 때문에
                    수취계좌확인 API를 호출하면 잔액 이전 방법에서 기부를 비활성화 해야 함
                */
                this.recipientFlag = true
                                       
                /*
                    0000:정상
                    1201:계좌번호 오류
                    1202:예금주 실명번호 불일치
                    1203:입금 거래 불가 - 해약 계좌
                    1205:입금 거래 불가 - 잡좌
                    1206:입금 거래 불가 - 입금 정지 계좌
                    1208:입금 거래 불가 - 잔액 증명 발급 계좌
                    1212:입금 거래 불가 - 기타
                    1215:입금 거래 불가 - 공동 명의 계좌
                    1221:은행 계좌 아님
                    1291:잔고 이전 수취 불가 계좌
                */
                //this.rsp06r01       = response.rpsC
                if(response.rsp_code == '0000') {         // 정상 처리
                    this.accountPass    = '1'
                    this.recvName       = response.recv_name       // 리턴받은 수취 계좌 예금주명
                    this.recvBranchCode = response.recv_branch_code // 리턴받은 수취 계좌 관리점 코드
                } else {  // 계좌번호확인 오류
                    if(response.rsp_code == '1201') {
                        this.accountPass = '2'
                    } 
                    /*else if(response.rsp_code == '5002') { // 5002 : 개설 금융회사 코드 오류
                        this.accountPass = '2'
                    }*/
                    modalService.alert(response.rsp_message)
                }
            })
        },
        /* 은행 코드 및 계좌번호 수정 시 pass 여부 초기화 */
        fnChgAccountPass() {
            this.accountPass = "0"
            this.recvAccountNum = this.recvAccountNum.toString().replace(/[^0-9]/g, '')
        },

        /* 계좌이체 시 내 계좌 가져오기 */
        fnSelectMyAccount() {
            // 내 계좌 목록 선택
            let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4008/ASTN4008"))
            const config = {
                component: compName
            }

            modalService.openPopup(config).then(response => {
                if(!_.isEmpty(response)) { // 내 계좌를 선택한 경우
                    this.accountPass    = "0"
                    this.recvBankCode   = response.recvBankCode   // 수취계좌 은행코드
                    this.recvBankCodeNm = response.recvBankCodeNm // 수취계좌 은행코드명
                    this.recvAccountNum = response.recvAccountNum // 수취계좌번호
                }
            })
        },
        
        /* 계좌이체 시 은행 선택 */
        fnSelectBank() {
            const config_bnk = {
                url: '/as/tn/01r03',
                data: {
                        inqDsc : "3"          // 1:은행코드->기관코드, 2:기관코드->은행코드, 3:은행코드 전체목록
                      }
            };

            apiService.call(config_bnk).then(response => {
                let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4007/ASTN4007"))
                const config = {
                    component: compName,
                    params   : {
                        repNbnkC : this.recvBankCode,
                        bnkList  : response.bnkList
                    }
                }

                modalService.openPopup(config).then(response => {
                    if(!_.isEmpty(response)) {
                        this.recvBankCode   = response.recvBankCode    // 수취계좌 은행코드
                        this.recvBankCodeNm = response.recvBankCodeNm  // 수취계좌 은행코드명
                        this.recvAccountNum = ""                       // 수취계좌번호
                        this.accountPass    = '0'                    // 계좌확인 여부
                    }
                    // this.recvBankCode   = response.bankCode   // 수취 계좌 은행코드
                })
            })
            
        },

        fnOnKeyDown(acno) {
            this.recvAccountNum = acno   // 입력한 계좌번호
            this.accountPass    = '0'  // 계좌확인 여부
        },

        fnNextPage() {
            if(this.recipientType == 'T') { // 계좌이체를 선택한 경우
                this.fnPrecautions()
            } else {                        // 기부를 선택한 경우
                const configConfirm = {
                    content: ['서민금융진흥원 기부를 선택<br>하신게 맞으실까요?'],
                    title  : "",
                }

                modalService.confirm(configConfirm).then(text => {
                    if(text == "예") {
                        this.fnPrecautions()
                    } else {

                    }
                })
            }
        },

        /* 유의사항 팝업 띄우기 */
        fnPrecautions() {
            // 09:00~22:00만 이용 가능
            let now = new Date()
            let hh  = this.fnLpad(now.getHours(),2,"0")
            let mi  = this.fnLpad(now.getMinutes(),2,"0")
            let sysdtm = hh+""+mi
                

            if(sysdtm < "0900" || sysdtm > "2200") {
                modalService.alert("서비스 제공시간은 09:00 ~ 22:00입니다.")
                this.closeAll()
                //this.close('svcOut')
                return
            }
            

            // 유의사항 팝업 호출
            let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4011/ASTN4011"))
            const config = {
                component: compName
            }

            modalService.openPopup(config).then(response => {
                if(response == 'success') { // 유의사항에 모두 동의했으면~
                    let flag = this.recipientType == 'T' ? true : false // 계좌이체면 true, 기부면 false
                    // 해지 예상 금액 조회 API
                    const config = {
                        url: '/as/tn/06r02',
                        data: {
                                bank_code         : this.widlBankCode,                 // 개설 금융회사 코드
                                account_num       : this.widlAcccountNum,              // 계좌 번호
                                deposit_sequence  : this.depositSequence,              // 예금 회차 번호
                                account_type      : this.accountType,                  // 계좌 종류
                                recipient_type    : this.recipientType,                // 잔고이전 구분
                                recv_bank_code    : flag ? this.recvBankCode   : null, // 수취 금융회사 코드
                                recv_account_num  : flag ? this.recvAccountNum : null, // 수취 계좌번호
                                recv_name         : flag ? this.recvName       : null, // 수취 계좌 예금주명
                                recv_branch_code  : flag ? this.recvBranchCode : null, // 수취 계좌 관리점 코드
                                termination_id    : this.terminationId,                // 거래검증ID
                                mydt_cusno        : this.getUserInfo("mydtCusno"),     // 마이데이터고객번호
                                identity_num      : this.isDev ? "9002011243111" : null,                   // 실명번호 테스트를 위해 세팅
                            }
                    };

                    apiService.call(config).then(response => {
                        if(response.rsp_code == '0000') { // 정상 처리

                            // 해지 예상금액 확인 팝업 호출 및 해지결과 조회 API 호출하려 함
                            let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4012/ASTN4012"))
                            let donationYn = this.recipientType == 'D' ? true : false // 기부 여부 true:기부, false:계좌이체
                            
                            const config = {
                                component : compName,
                                params : {
                                    
                                    prodName            : response.prod_name,                     // 상품명
                                    accountName         : response.account_name,                  // 계좌 예금주명
                                    openingDate         : response.opening_date,                  // 개설 일자
                                    maturityDate        : response.maturity_date,                 // 만기 일자
                                    accountBalance      : response.account_balance,               // 원금(잔액)
                                    incomeTax           : response.income_tax,                    // 소득세
                                    localTax            : response.local_tax,                     // 지방 소득세
                                    additionalTax       : response.additional_tax,                // 추징 소득세
                                    otherTax            : response.other_tax,                     // 기타 세금
                                    interest            : response.interest,                      // 이자(신탁 이익)
                                    penalty             : response.penalty,                       // 과징금
                                    transferFee         : response.transfer_fee,                  // 이체 수수료
                                    paymentAmount       : response.payment_amount,                // 지급액

                                    bankCode            : this.widlBankCode,                      // 개설 금융회사 코드
                                    accountNum          : this.widlAcccountNum,                   // 계좌 번호
                                    depositSequence     : this.depositSequence,                   // 예금 회차 번호
                                    accountType         : this.accountType,                       // 계좌 종류
                                    recipientType       : this.recipientType,                     // 잔고이전 구분
                                    recvBankCode        : donationYn ? '' : this.recvBankCode,    // 수취 금융회사 코드
                                    recvAccountNum      : donationYn ? '' : this.recvAccountNum,  // 수취 계좌번호
                                    recvName            : donationYn ? '' : this.recvName,        // 수취 예금주명
                                    recvBranchCode      : donationYn ? '' : this.recvBranchCode,  // 수취 계좌 관리점 코드
                                    receiptYn           : !donationYn ? "" : this.receiptYn,      // 기부금 영수증 발급 여부
                                    perInfoYn           : !donationYn ? "" : this.receiptYn,      // 제3자 제공동의 여부(기부금영수증 발급 여부가 Y인 경우 Y, 미발급이면 N)
                                    terminationId       : this.terminationId,                     // 거래검증ID

                                    infOfrmnOrgC        : this.infOfrmnOrgC,                      // 정보제공자기관코드
                                    infOfrmnOrgNm       : this.infOfrmnOrgNm,                     // 정보제공자기관코드명
                                    recvInfoOfrmnOrgC   : !donationYn ? this.bnkInfo.find(el=>el.repNbnkC == this.recvBankCode).infOfrmnOrgC  : '', // 수취 기관코드
                                    recvInfoOfrmnOrgCNm : !donationYn ? this.bnkInfo.find(el=>el.repNbnkC == this.recvBankCode).infOfrmnOrgNm : '', // 수취 기관코드명
                                }
                            }

                            modalService.openPopup(config).then((response) => {
                                if(!_.isEmpty(response)) {
                                    // 해지예상금액 조회 시 해지가 불가한 계좌면 목록창으로 돌려보냄
                                    if(response.flag == 'T') {
                                        this.onlyAccount = true
                                    } else if(response.flag == 'impossible' || response.flag == 'svcOut') {
                                        //this.close({flag:response})
                                        //return
                                    } else if(response.flag == 'donation') { // 예상금액은 음수지만 수수료 뺀 금액이 0원 이상인 경우 기부를 선택하여 왔을 때~
                                        // 계좌이체는 비활성화 처리해야 함
                                        this.accountPass     == "0" // 잔액이전 후 기부로 왔기 때문에 해지신청 여부를 초기값으로 되돌림
                                        // 기부는 동의를 해야 "1"로 처리해줌(fnSetChk에서)
                                        this.onlyDonation    = true // 4011로 부터 넘어온 금액-수수료 > 0인 경우 기부 의사가 있는 경우
                                        this.recipientType   = "D"  // 계좌 종류(D:기부)
                                        this.receiptYn       = "Y"  // 기부금영수증 발급(기본값)
                                        this.fnChgType('D') // 계좌 종류(D:기부)
                                        this.fnSetChk()
                                        
                                        this.recvBankCode    = ""   // 기부이므로 수취 금융회사코드는 없음
                                        this.recvAccountNum  = ""   // 수취 계좌번호
                                        this.recvName        = ""   // 수취 계좌 예금주명
                                        this.recvBranchCode  = ""   // 수취 계좌 관리점 코드
                                    }
                                }
                                
                            })
                            
                        } else {
                            modalService.alert(response.rsp_message).then(() => {
                                this.closeAllData('refresh')
                            })
                        }
                    })

                }
            })
        },

        /* 기부금영수증 미발급 메시지 */
        fnReceipt(flag) {
            this.agreeList = [] // 동의한 약관 목록 초기화

            if(flag == 'Y') {
                this.accountPass = "0"
                // 기부금영수증을 발급받는 경우 약관을 동의해야함
            } else if(flag == 'N') {
                this.accountPass = "1" // 기부영수증을 발급받지 않은 경우 약관을 받지 않기 때문에 해지신청버튼 활성화
                modalService.alert("소득 공제용 영수증이<br>발급되지 않아요.")
            }
            
        },

        // 약관 상세보기
        fnOpenDtlPop(sqno) {
            if(this.receiptYn == 'N') return // 기부금영수증 미발급은 약관 동의를 안받아도 됨
            //let idx = this.agreeList.findIndex(el => el == sqno) // 체크되어있는 약관을 버튼 이벤트로 다시 눌렀을 때 중복 데이터가 쌓이지 않게 함

            let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4005/ASTN4005"))
            const config = {
                component : compName,
                params : {
                    flag      : "",     // 전체여부
                    stltArray : [this.stltArray[sqno-1]] // 약관 array
                }
            }

            modalService.openPopup(config).then((response) => {
                if(response.agreeYn == 'Y') {
                    let idx = this.agreeList.findIndex(el => el == response.sqno) // 체크되어있는 약관을 버튼 이벤트로 다시 눌렀을 때 중복 데이터가 쌓이지 않게 함

                    if(idx < 0) {
                        this.agreeList.push(response.sqno) // 버튼 이벤트인 경우 체크박스와 동일하게 체크되게 해줌
                    }
                }

                this.fnSetChk() // 기부 약관이 모두 동의하였는지 체크
            })
        },

        /* 전체 체크 세팅 */
        fnSetChk() {
            /* 동의 버튼 비활성화 여부 */
            if((this.agreeList.length == this.stltArray.length) && !_.isEmpty(this.receiptYn)) this.accountPass = "1"
            else this.accountPass = "0"
        },

        // 계좌번호 입력
        fnKeyDown(e) {
            this.accountPass = "0"
            this.recvAccountNum = e.target.value.toString().replace(/[^0-9]/g, '')
        },
        fnLpad(v, len, pv) {
            v = v + '';
            return v.length >= len ? v : new Array(len - v.length + 1 ).join(pv) + v;
        },

    },
    components : {
        Template

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>