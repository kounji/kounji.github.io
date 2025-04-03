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
			<button type="button" class="prev"><span class="blind">이전</span></button>
		</div>

		<div class="popup_content">
            <section class="close_account">
                <!-- 25-03-10 headline 추가 -->
                <p class="headline">해지 및 잔고이전 여부 확인을 위해<br>아래 내용을 입력해주세요.</p>
                <!-- //25-03-10 headline 추가 -->

                <div class="board_box">    
                    <h2 class="title">해지대상 계좌</h2>        

                    <div class="assets_info">
                        <i :class="'ico_bank '+ dorBnk.infOfrmnOrgC"></i>
                        <div>
                            <strong class="org">{{dorBnk.infOfrmnOrgnm + ' ' + dorBnk.acWrsnm}}</strong>
                            <div class="account">{{dorBnk.mydtAcno}}<span>비활동</span></div>
                            <strong class="num">{{dorBnk.acNowBac | numberFilter}}{{dorBnk.curc}}</strong>
                        </div>
                    </div>

                    <details class="board_box_details">
                        <summary>
                            <span class="show"><span class="blind">계좌정보</span> 자세히보기</span><!-- 25-03-10 문구수정 -->
                            <span class="hide"><span class="blind">계좌정보</span> 닫기</span><!-- 25-03-10 문구수정 -->
                        </summary>
                        <div class="cont">
                            <ul class="sleep_list">
                                <li><em>지점명</em><span>-</span></li>
                                <li><em>연락처</em><span>-</span></li>
                                <li><em>개설일</em><span>2020.02.20</span></li>
                                <li><em>최종입출금일</em><span>2020.02.20</span></li>
                                <li><em>비고</em><span>-</span></li>
                            </ul>
                        </div>
                    </details>
                </div>

                <div class="close_info">
                    <h2>잔액 이전 방법</h2>

                    <div class="radio_round_group">
                        <div class="radio round">
                            <input type="radio" name="send_account" id="send_account1" :checked="recipientType=='T' ? true : false" v-model="recipientType" value="T">
                            <label for="send_account1">
                                <strong class="tit">계좌 이체</strong><!-- 25-03-10 문구수정 -->
                            </label>
                        </div>
                        <div class="radio round">
                            <input type="radio" name="send_account" id="send_account2" :checked="recipientType=='D' ? true : false" v-model="recipientType" value="D">
                            <label for="send_account2">
                                <strong class="tit">서민금융진흥원에 기부</strong>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- 25-03-10 약관 삭제 
                <div class="close_info">
                    <h2>약관동의</h2>
                    <div class="check_all">
                        <div class="checkbox border">
                            <input type="checkbox" name="allagree1" id="checkall1" required="">
                            <label for="checkall1">전체동의</label>
                        </div>
                    </div>
                    <div class="view_cont">
                        <ul class="agree_list">
                            <li>
                                <div class="checkbox">
                                    <input type="checkbox" name="check01_1" id="check01_1" required="" title="고객 위임 동의">
                                    <button type="button" class="btn_detail ico_arrow">[필수] 고객 위임 동의<span class="blind">상세보기</span></button>
                                </div>
                            </li>
                            <li>
                                <div class="checkbox">
                                    <input type="checkbox" name="check01_2" id="check01_2" required="" title="계좌통합관리서비스 이용약관">
                                    <button type="button" class="btn_detail ico_arrow">[필수] 계좌통합관리서비스 이용약관<span class="blind">상세보기</span></button>
                                </div>
                            </li>
                            <li>
                                <div class="checkbox">
                                    <input type="checkbox" name="check01_3" id="check01_3" required="" title="개인정보 수집·이용에 관한 동의">
                                    <button type="button" class="btn_detail ico_arrow">[필수] 개인정보 수집·이용에 관한 동의 <span class="blind">상세보기</span></button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                -->

                <div class="close_info" v-if="recipientType == 'T'">
                    <h2>이체 은행 입력</h2><!-- 25-03-10 문구수정 -->

                    <!--입력이 없는 경우-->
                    <div class="formItem">
                        <span class="label">은행</span>
                        <button type="button" class="btns_select">은행 선택</button> 
                    </div>

                    <div class="formItem">
                        <span class="label">계좌번호</span>
                        <div class="input">
                            <button type="button" class="account">계좌번호 입력</button>
                            <button type="button" class="btns" @click.prevent="fnTermRecipient()">계좌확인</button>
                        </div>
                    </div>

                    <!--입력이 있는 경우-->
                    <div class="formItem">
                        <span class="label">은행</span>
                        <button type="button" class="btns_select" title="은행 선택하기"><span class="blind">현재선택</span>카카오뱅크</button> 
                    </div>

                    <div class="formItem confirm">
                        <span class="label">계좌번호</span>
                        <div class="input">
                            <button type="button" class="account" title="계좌번호 입력"><span class="blind">입력된 계좌</span><span class="num">2214210757669</span></button>                            
                            <button type="button" class="btns" disabled>계좌확인</button>
                        </div>
                        <span class="error_txt">계좌확인이 완료되었어요.</span>
                    </div>

                    <!--입력하였으나 오류가 있는 경우-->
                    <div class="formItem error">
                        <span class="label">계좌번호</span>
                        <div class="input">
                            <button type="button" class="account" title="계좌번호 입력"><span class="blind">입력된 계좌</span><span class="num">2214210757669</span></button>
                            <button type="button" class="btns">계좌확인</button>
                        </div>
                        <span class="error_txt">계좌번호를 다시 확인해주세요.</span>
                    </div>
                </div>
                
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
				<button type="button" class="btns lg primary" :disabled="!isAgree" @click.prevent="fnNextPage()">해지신청</button><!-- 25-03-10 문구수정 -->
            </div>
        </div>

		<a href="#nolink" role="button" class="btn_close"><span class="blind">팝업닫기</span></a>
		
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
import _ from 'lodash'

export default {
    name : "ASTN4006",
    data: () => {
        return {
            param            : {},      // 부모로부터 넘겨받은 파라미터
            paramObj         : {},      // 잔고이전 수취계좌 확인 조회 API 출력값 객체

            apiOrgCode       : '',      // 이용기관코드
            recvBankCode     : '',      // 수취 금융회사 코드
            recvAccountNum   : '',      // 수취 계좌번호
            widlBankCode     : '',      // 출금 금융회사 코드
            widlAcccountNum  : '',      // 출금 계좌번호

            recipientType    : '',      // 잔고이전 구분 T:계좌이체, D:기부
            accountType      : '',      // 계좌 종류(1:수시입출금, 2:예적금)
            receiptYn        : '',      // 기부금 영수증 발급 여부
            perInfoYn        : '',      // 제3자 제공동의 여부

            recvName         : '',      // 수취계좌 확인 조회 리턴 데이터(수취 계좌 예금주명)
            recvBranchCode   : '',      // 수취계좌 확인 조회 리턴 데이터(수취 계좌 관리점 코드)

            accountPass      : false,   // 계좌확인 여부
            isAgree          : false,   // 해지신청 버튼 활성화 여부

            infOfrmnOrgC     : '',      // 정보제공자기관코드
            infOfrmnOrgNm    : ''       // 정보제공자기관코드명

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

            this.apiOrgCode    = this.param.apiOrgCode    // 이용기관코드
            this.infOfrmnOrgC  = this.param.infOfrmnOrgC  // 정보제공자기관코드
            this.infOfrmnOrgNm = this.param.infOfrmnOrgNm // 정보제공자기관코드명
            this.accountType   = this.param.accountType   // 계좌종류

            this.getData()
        },

        getData() {
            /*
            const config = {
                url: '/co/ct/01r02',
                data: {
                        cntzId : cntzId
                      }
            };

            apiService.call(config).then(response => {
                this.cntzCntn = response.cntzCntn
            })
            */
        },
        /* 잔고이전 수취계좌 확인 조회 API */
        fnTermRecipient() {
            // 09:00~22:00만 이용 가능
            let now = new Date()
            let sysdtm = now.getHours()+""+now.getMinutes()

            if(sysdtm < "0900" || sysdtm > "2200") {
                modalService.alert("서비스 제공시간은 09:00 ~ 22:00입니다.")
                return
            }
            // 출력값
            /*
                result_type	결과코드 구분	Y	1	1
                result_code	결과코드	Y	4	4
                recv_name	수취 계좌 예금주명	Y	-	20
                recv_branch_code	수취 계좌 관리점 코드	Y	7	7
            */
            
            const config = {
                url: '/as/tn/06r01',
                data: {
                        apiOrgCode       : this.apiOrgCode,      // 이용기관코드
                        recvBankCode     : this.recvBankCode,    // 수취 금융회사 코드
                        recvAccountNum   : this.recvAccountNum,  // 수취 계좌번호
                        widlBankCode     : this.widlBankCode,    // 출금 금융회사 코드
                        widlAcccountNum  : this.widlAcccountNum, // 출금 계좌번호
                      }
            };

            apiService.call(config).then(response => {
                if(response.rspC == '0000') { // 정상 처리
                    this.accountPass    = true
                    this.recvName       = response.data.recvName       // 리턴받은 수취 계좌 예금주명
                    this.recvBranchCode = response.data.recvBranchCode // 리턴받은 수취 계좌 관리점 코드
                }
            })
        },

        /* 기부 약관동의 띄우기 */
        fnStltAgree() {
            let stltList = [
                {stltTinm : '약관내용 1번 제목', stltCntn : '약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용'},
                {stltTinm : '약관내용 2번 제목', stltCntn : '약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용'},
                {stltTinm : '약관내용 3번 제목', stltCntn : '약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용'},
                {stltTinm : '약관내용 4번 제목', stltCntn : '약관내용 4번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용'}
            ]

            // 약관 팝업 호출
            let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4004/ASTN4004"))
            const config = {
                component: compName, 
                params   : {
                        callDsc        : 'D',
                        donationObj : {
                                receiptYn      : this.receiptYn   // 영수증 발급 여부
                            },
                        stltList       : stltList
                    }
            }

            modalService.openPopup(config).then(response => {
                this.perInfoYn = response.perInfoYn // 제3자 제공동의 여부
            })
        },

        /* 유의사항 팝업 띄우기 */
        fnNextPage() {
            // 09:00~22:00만 이용 가능
            let now = new Date()
            let sysdtm = now.getHours()+now.getMinutes()

            if(sysdtm < "0900" || sysdtm > "2200") {
                modalService.alert("서비스 제공시간은 09:00 ~ 22:00입니다.")
                this.close('svcOut')
                return
            }

            // 유의사항 팝업 호출
            let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4009/ASTN4009"))
            const config = {
                component: compName
            }

            modalService.openPopup(config).then(response => {
                if(response == 'sucess') { // 유의사항에 모두 동의했으면~
                    // 해지 예상금액 조회 API
                    const config = {
                        url: '/as/tn/10r01',
                        data: {
                                apiOrgCode      : this.apiOrgCode,               // 
                                bankCode        : this.bankCode,                 // 개설 금융회사 코드
                                accountNum      : this.paramObj.accountNum,      // 계좌 번호
                                depositSequence : this.paramObj.depositSequence, // 예금 회차 번호
                                accountType     : this.accountType,              // 계좌 종류
                                recipientType   : this.recipientType,            // 잔고이전 구분
                                recvBankCode    : this.recvBankCode,             // 수취 금융회사 코드
                                recvAccountNum  : this.recvAccountNum,           // 수취 계좌번호
                                recvName        : this.recvName,                 // 수취 계좌 예금주명
                                recvBranchCode  : this.recvBranchCode            // 수취 계좌 관리점 코드
                            }
                    };

                    apiService.call(config).then(response => {
                        if(response.rspC == '0000') { // 정상 처리

                            // 해지 예상금액 확인 팝업 호출 및 해지결과 조회 API 호출하려 함
                            let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4011/ASTN4011"))
                            const config = {
                                component : compName,
                                params : {
                                    prodName        : response.data.prodName,             // 상품명
                                    accountName     : response.data.accountName,          // 계좌 예금주명
                                    openingDate     : response.data.openingDate,          // 개설 일자
                                    maturityDate    : response.data.maturityDate,         // 만기 일자
                                    accountBalance  : response.data.accountBalance,       // 원금(잔액)
                                    incomeTax       : response.data.incomeTax,            // 소득세
                                    localTax        : response.data.localTax,             // 지방 소득세
                                    additionalTax   : response.data.additionalTax,        // 추징 소득세
                                    otherTax        : response.data.otherTax,             // 기타 세금
                                    interest        : response.data.interest,             // 이자(신탁 이익)
                                    penalty         : response.data.penalty,              // 과징금
                                    transferFee     : response.data.transferFee,          // 이체 수수료
                                    paymentAmount   : response.data.paymentAmount,        // 지급액

                                    apiOrgCode      : this.apiOrgCode,                    // 이용기관코드
                                    bankCode        : this.bankCode,                      // 개설 금융회사 코드
                                    accountNum      : this.accountNum,                    // 계좌 번호
                                    depositSequence : this.depositSequence,               // 예금 회차 번호
                                    accountType     : this.accountType,                   // 계좌 종류
                                    recipientType   : this.recipientType,                 // 잔고이전 구분
                                    recvBankCode    : this.recvBankCode,                  // 수취 금융회사 코드
                                    recvAccountNum  : this.recvAccountNum,                // 수취 계좌번호
                                    recvName        : this.recvName,                      // 수취 예금주명
                                    recvBranchCode  : this.recvBranchCode,                // 수취 계좌 관리점 코드
                                    receiptYn       : this.receiptYn,                     // 기부금 영수증 발급 여부
                                    perInfoYn       : this.perInfoYn,                     // 제3자 제공동의 여부

                                    infOfrmnOrgC    : this.infOfrmnOrgC,                  // 정보제공자기관코드
                                    infOfrmnOrgNm   : this.infOfrmnOrgNm                  // 정보제공자기관코드명
                                }
                            }
                            modalService.openPopup(config).then((response) => {
                                // 해지예상금액 조회 시 해지가 불가한 계좌면 목록창으로 돌려보냄
                                if(response == 'impossible' || response == 'svcOut') {
                                    this.close(response)
                                    return
                                }
                            })
                            
                        }
                    })

                }
            })
        }

    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>