<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 부채관리 > 대출목록 > 보험대출 > 보험대출 상세조회
* @ 페이지설명 : 자산 > 부채관리 > 대출목록 > 보험대출 > 보험대출 상세조회 팝업
* @ 파일명     : src/views/page/AS/LN/ASLN2003/ASLN2003.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-08-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-04              CS533571              최초작성
*                                               마이데이터 확대개발 담보대출 중 보험대출만 분리
*                                               (ASLN1110 -> ASLN2003)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
    <div class="full_popup mydata2023" id="full_popup_01"> <!-- 0803 .mydata2023 클래스 이동-->
        <div class="popup_header">    
            <h1>담보대출</h1>
        </div>	
        <div class="popup_content com_space_bottom com_bg_type00">
                
            <div class="asset_info_box">
                <div class="com_inner long_term_info">
                    <div class="asset_info_wrap">
                        <div class="asset_info">
                            <dl>
                                <dt>{{isrcoLnWrsnm}}</dt>
                                <dd>
                                    <span class="account_num">{{mydtAcno}}</span>
                                </dd>
                            </dl>
                            <div class="bank_icon">
                                <i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgCNm}}</span></i>
                            </div>
                        </div>

                        <div class="asset_price_wrap">
                            <div class="amount" v-if="aplItr">적용이율 <span class="pointColor green">{{aplItr}}%</span></div>
                            <div class="asset_price">
                                <span class="num">{{lnAcBac | numberFilter}}</span>원
                            </div>
                        </div>

                        <!-- progressBar -->
                        <div class="custom_box">
                            <div class="content_wrap">
                                <div class="progressBar_wrapper">
                                    <div class="progressBar">
                                        <div class="bar">
                                            <div class="popover_wrap">
                                                <span class="popover">
                                                    <em>D-<span class="num">{{dDay}}</span></em>
                                                    <em class="num percent blind">{{dDayPer}}</em><!-- 임시 퍼센트 -->
                                                    <span class="arrow"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="loan_date">
                                    <span>신규<em class="num">{{lnDt | dateFilter}}</em></span>
                                    <span>만기<em class="num">{{dueDt | dateFilter}}</em></span>
                                </div>
                            </div>
                        </div>
                        <!-- //progressBar -->
                    </div>

                    <div class="asset_detail">
                        <ul class="list_type_2023">
                            <li>
                                <dl>
                                    <dt>대출원금</dt>
                                    <dd><em class="num">{{acLnOgnAm | numberFilter}}</em>원</dd>
                                </dl>
                                <dl>
                                    <dt>대출일</dt>
                                    <dd class="num">{{lnDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl>
                                    <dt>만기일</dt>
                                    <dd class="num">{{dueDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl>
                                    <dt>상환방식</dt>
                                    <dd>{{getrpyMetcNm(rpyMetc)}}</dd>
                                </dl>	
                                <dl v-if="isrSctsNo">
                                    <dt>증권번호</dt>
                                    <dd class="num">{{isrSctsNo}}</dd>
                                </dl>
                                <dl>
                                    <dt>대출계좌번호</dt>
                                    <dd class="num">{{mydtAcno}}</dd>
                                </dl>
                                <dl v-if="mmRpyDd">
                                    <dt>월상환일</dt>
                                    <dd>{{mmRpyDd}}일</dd>
                                </dl>	
                                <dl>
                                    <dt>다음 이자 상환일</dt>
                                    <dd class="num">{{nxIntRpyDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl v-if="auttrOrgCNm">
                                    <dt>납입기관(자동이체)</dt>
                                    <dd>{{auttrOrgCNm}}</dd>
                                </dl>	
                                <dl v-if="auttrRpyAcno">
                                    <dt>납입계좌번호(자동이체)</dt>
                                    <dd class="num">{{auttrRpyAcno}}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>

                <button type="button" class="btn_view_detail">더보기</button>
            </div>

            <div class="com_inner">
                <template v-if="bankInsuLoanAccountTransactionListOut.length > 0">
                    <div class="asset_more_list no_line loan">
                        <ul>
                            <template v-for="(item, idx) in bankInsuLoanAccountTransactionListOut">
                                <li v-if="item.bankInsuLoanAccountTransactionIntSubOut && item.bankInsuLoanAccountTransactionIntSubOut.length > 0"  :key="'tran1_' + idx" class="asset_more_toggle">
                                    <div data-ui-toggle="box" class="list_type_box">
                                        <button type="button" class="view_btn" aria-expanded="false">
                                            <dl class="breakdown toggle_btn">
                                                <dt>상환</dt>
                                                <!-- 만기일시상환, 한도거래, 기타의 경우는 원금표시하지 않음 -->
                                                <dd class="num" v-if="fn_rpyMethod">{{item.isrLnintPymAm | numberFilter}}원</dd>
                                                <dd class="num" v-else>{{(item.lnAmRpyAm + item.isrLnintPymAm) | numberFilter}}원</dd>
                                            </dl>
                                            <dl>
                                                <dt class="num" v-if="item.mydtTrDtm.length > 8">{{item.mydtTrDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</dt>
                                                <dt class="num" v-else>{{item.mydtTrDtm | dateFilter('YYYY.MM.DD')}}</dt>

                                                <dd>
                                                    <!-- 만기일시상환, 한도거래, 기타의 경우는 원금표시하지 않음 -->
                                                    <p v-if="fn_rpyMethod">대출원금상환액 <em class="num">{{item.lnAmRpyAm | numberFilter}}</em>원</p>
                                                    <p v-else></p>
                                                    <p>이자 납입액 <em class="num">{{item.isrLnintPymAm | numberFilter}}</em>원</p>
                                                </dd>
                                            </dl>
                                            <em class="open">열기</em><em class="close">닫기</em>
                                        </button>
                                    </div>
                                    <div class="listbox_area">
                                        <div class="listbox_type01" v-for="(intList,index) in item.bankInsuLoanAccountTransactionIntSubOut" :key="index">
                                            <div class="list_gray_box">
                                                <p class="list_title">{{getIsrLnIntKdcNm(intList.isrLnIntKdc)}}</p>
                                                <dl>
                                                    <dt>이자적용기간</dt>
                                                    <dd class="num">{{intList.intAplStDt | dateFilter('YYYY.MM.DD')}}~{{intList.intAplEdDt | dateFilter('YYYY.MM.DD')}}</dd>
                                                </dl>
                                                <dl>
                                                    <dt>적용이율</dt>
                                                    <dd><em class="num">{{intList.aplItrrt}}</em>%</dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li v-else :key="'tran2_' + idx">
                                    <dl class="breakdown">
                                        <dt>상환</dt>
                                        <!-- 만기일시상환, 한도거래, 기타의 경우는 원금표시하지 않음 -->
                                        <dd class="num" v-if="fn_rpyMethod">{{item.isrLnintPymAm | numberFilter}}원</dd>
                                        <dd class="num" v-else>{{(item.lnAmRpyAm + item.isrLnintPymAm) | numberFilter}}원</dd>
                                    </dl>
                                    <dl>
                                        <dt class="num" v-if="item.mydtTrDtm.length > 8">{{item.mydtTrDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</dt>
                                        <dt class="num" v-else>{{item.mydtTrDtm | dateFilter('YYYY.MM.DD')}}</dt>

                                        <dd>
                                            <!-- 만기일시상환, 한도거래, 기타의 경우는 원금표시하지 않음 -->
                                            <p v-if="fn_rpyMethod">대출원금상환액 <em class="num">{{item.lnAmRpyAm | numberFilter}}</em>원</p>
                                            <p v-else></p>
                                            <p>이자 납입액 <em class="num">{{item.isrLnintPymAm | numberFilter}}</em>원</p>
                                        </dd>
                                    </dl>
                                </li>
                            </template>
                        </ul>
                    </div>

                    <a href="javascript:void(0);" role="button" class="com_btn_more" @click.prevent="showMoreList()" :style="noMoreList">더보기</a>
                </template>

                <!-- 조회내역이 없을경우 S -->
                <div class="no_data_box no_data_box01 grayExclamationType" v-else>
                    <div class="no_data_list">
                        <p class="txt_sub">조회된 정보가 없습니다.</p>
                    </div>
                </div>
                <!--// 조회내역이 없을경우 E -->

            </div>
        </div>

        <a href="javascript:void(0);" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>		
    </div>
    <!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import {dayDiff, dateFormat} from '@/utils/date'

export default {            
    name : "ASLN2003",
    data: () => {
        return {
            // 담보대출 상세
            mydtCusno           : "",           // 마이데이터고객번호
            loanType            : "",           // 대출타입
            infOfrmnOrgC        : "",           // 정보제공자기관코드
            infOfrmnOrgCNm      : "",           // 정보제공자기관코드명
            mydtAcno            : "",           // 마이데이터계좌번호
            lnDt                : "",           // 대출일자
            dueDt               : "",           // 만기일자
            dDay                : 0,            // 만기일자 D-Day
            dDayPer             : 0,            // 현재일자 비율
            aplItr              : 0,            // 적용금리
            mmRpyDd             : "",           // 월상환일
            rpyMetc             : "",           // 상환방식코드
            auttrOrgC           : "",           // 자동이체기관코드
            auttrOrgCNm         : "",           // 자동이체기관코드명
            auttrRpyAcno        : "",           // 자동이체상환계좌번호
            lnAcBac             : 0,            // 대출계좌잔액
            nxIntRpyDt          : "",           // 다음이자상환일자, 만기 등 다음이자상환일 정보 없으면 마지막 이자상환일
            acLnOgnAm           : 0,            // 계좌대출원금액
            isrcoLnWrsnm        : "",           // 보험사대출상품명
            isrSctsNo           : "",           // 보험증권번호
            pageNo              : 1,            // 페이지번호
            nxDataYn            : "",           // 다음데이터여부

            bankInsuLoanAccountTransactionListOut : [],     // 담보대출 거래내역 리스트

            dataUrl             : "/as/ln/03r04",           // 보험대출 URL 
            tranUrl             : "/as/ln/03r05",           // 거래내역 URL
        }	
    },
    computed : {
        noMoreList() {
            return (this.nxDataYn == 'Y') ? "" : "display:none"
        },
        fn_rpyMethod() {
            return (this.rpyMetc == '01' || this.rpyMetc == '08' || this.rpyMetc == '09') ? false  : true
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

        this.executeJQueryBtn()
    },
    updated() {
        
    },
    methods: {
        initComponent(param) {
            this.mydtCusno      = param.mydtCusno || ''
            this.loanType       = param.loanType || ''
            this.infOfrmnOrgC   = param.infOfrmnOrgC || ''
            this.mydtAcno       = param.mydtAcno || ''
            this.isrSctsNo      = param.isrSctsNo || ''

            this.getData();
        },
        getData() {
            // 실제 구현
            const config = {
                url : this.dataUrl,
                data : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : this.infOfrmnOrgC,
                    mydtAcno        : this.mydtAcno,
                    isrSctsNo       : this.isrSctsNo,
                    loanType        : this.loanType,
                }
            }
            apiService.call(config).then(response => {
                this.mydtCusno      = response.mydtCusno || ''
                this.infOfrmnOrgC   = response.infOfrmnOrgC || ''
                this.infOfrmnOrgCNm = response.infOfrmnOrgCNm || ''
                this.mydtAcno       = response.mydtAcno || ''
                this.lnDt           = response.lnDt || ''
                this.dueDt          = response.dueDt || ''
                this.mmRpyDd        = response.mmRpyDd || ''
                this.rpyMetc        = response.rpyMetc || ''
                this.auttrOrgC      = response.auttrOrgC || ''
                this.auttrOrgCNm    = response.auttrOrgCNm || ''
                this.auttrRpyAcno   = response.auttrRpyAcno || ''
                this.lnAcBac        = response.lnAcBac || 0
                this.acLnOgnAm      = response.acLnOgnAm || 0
                this.nxIntRpyDt     = response.nxIntRpyDt || ''
                this.isrcoLnWrsnm   = response.isrcoLnWrsnm || ''
                this.isrSctsNo      = response.isrSctsNo || ''

                this.calculateProgressbar(this.lnDt, this.dueDt)

                this.getTransaction()

                this.$nextTick(() => {
                    this.executeJQueryProgress()
                })
            });
        },

        calculateProgressbar(startDt, endDt) {
            const nowDt = dateFormat(new Date(), 'YYYY-MM-DD')
            const totalDays = dayDiff(endDt, startDt)
            const passedDays = dayDiff(nowDt, startDt)
            this.dDay = dayDiff(endDt, nowDt)
            if(this.dDay < 0){
                this.dDay = 0
            }
            const dDayPer = Math.round((passedDays / totalDays) * 100)
            if(dDayPer > 100) {
                this.dDayPer = 100
            }else{
                this.dDayPer = dDayPer
            }
        },

        // 담보대출 거래내역 조회
        getTransaction() {
            const config = {
                url : this.tranUrl,
                data : {
                    mydtCusno     : this.mydtCusno,
                    infOfrmnOrgC  : this.infOfrmnOrgC,
                    mydtAcno      : this.mydtAcno,
                    isrSctsNo     : this.isrSctsNo,
                    loanType      : this.loanType,
                    pageNo        : this.pageNo,
                }
            }
            apiService.call(config).then(response => {
                this.mydtCusno      = response.mydtCusno || ''
                this.infOfrmnOrgC   = response.infOfrmnOrgC || ''
                this.nxDataYn       = response.nxDataYn || 'N'
                this.bankInsuLoanAccountTransactionListOut = response.bankInsuLoanAccountTransactionListOut || []

                // 보험 담보대출은 적용이율이 없으므로 최종적용이율을 표시함
                if(this.bankInsuLoanAccountTransactionListOut.length > 0) {
                    for(let i=0; i<this.bankInsuLoanAccountTransactionListOut.length; i++) {
                        if(this.bankInsuLoanAccountTransactionListOut[i].bankInsuLoanAccountTransactionIntSubOut
                            && this.bankInsuLoanAccountTransactionListOut[i].bankInsuLoanAccountTransactionIntSubOut.length > 0) {
                                this.aplItr = this.bankInsuLoanAccountTransactionListOut[i].bankInsuLoanAccountTransactionIntSubOut[0].aplItrrt
                                break
                        }
                    }
                }

                this.callJQueryFncExcute()
            });
        },

        // 상환방식
        getrpyMetcNm(cVal) {
            let cmmLnList = this.getCodeList("RPY_METC")
            for(var i=0; i<cmmLnList.length; i++) {
                if(cVal === cmmLnList[i].comnCVal) {
                    return cmmLnList[i].comnCExpl
                }
            }
        },

        // 보험이자종류
        getIsrLnIntKdcNm(cVal) {
            let cmmLnList = this.getCodeList("ISR_LN_INT_KDC")
            
            for(var i=0; i<cmmLnList.length; i++) {
                if(cVal === cmmLnList[i].comnCVal) {
                    return cmmLnList[i].comnCExpl
                }
            }
        },

        // 더보기
        showMoreList() {
            this.pageNo += 1
            const config = {
                url : this.tranUrl,
                data : {
                    mydtCusno     : this.mydtCusno,
                    infOfrmnOrgC  : this.infOfrmnOrgC,
                    mydtAcno      : this.mydtAcno,
                    isrSctsNo     : this.isrSctsNo,
                    loanType      : this.loanType,
                    pageNo        : this.pageNo,
                }
            }

            apiService.call(config).then(response => {
                this.nxDataYn	= response.nxDataYn || ''
                for(let i=0;i<response.bankInsuLoanAccountTransactionListOut.length;i++) {
                    this.bankInsuLoanAccountTransactionListOut.push(response.bankInsuLoanAccountTransactionListOut[i])
                }
            })
        },

        // jQuery 실행
        executeJQueryBtn() {
            //더보기 접기
            $('.btn_view_detail').on('click',function(){
                    $(this).siblings().children('.asset_detail').toggleClass('open');
                    $(this).toggleClass('close');
                    if($('.asset_detail').hasClass('open')) {
                        $('.asset_detail').slideDown('slow');
                        $('.btn_view_detail').text('접기');//230720 상세접기에서 접기로 수정
                    }else {
                        $('.asset_detail').slideUp('slow');
                        $('.btn_view_detail').text('더보기');//230720 상세보기에서 더보기로 수정
                    }
            });
        },

        // Progress bar 스크립트
        executeJQueryProgress() {
            //progressBar
            var progressBar = $('.progressBar .bar');
                
            progressBar.each(function(){
                var progressNum = $(this).children().find('.popover .percent').text();
                var popoverWrap = $(this).children('.popover_wrap');
                // var popoverWidth = $(this).children().find('.popover').outerWidth() / 2;
                // var transformXWidth = popoverWidth * 0.1;
                // var transformXWidthOver = $(this).children().find('.popover').outerWidth() * 0.1;
                
                // console.log(transformXWidth);
                // console.log(transformXWidthOver);

                if(progressNum >= 100) {
                    progressNum = 100;
                    // $(this).addClass('over');
                    popoverWrap.css('transform','translateX(-100%)');
                    popoverWrap.animate({
                        left: progressNum + "%"
                    },2000,function(){
                        popoverWrap.addClass('full');
                    });
                } else if(progressNum == 0) {
                    popoverWrap.addClass('zero');
                } else {
                    popoverWrap.animate({
                        left: progressNum +'%'
                    },2000);
                    // popoverWrap.css('transform','translateX(-'+transformXWidth+'rem)');
                }

                progressBar.css('width','0');
                popoverWrap.css('left','0');				
                $(this).animate({					
                    width: progressNum + '%',
                },2000);
                
            });
        }
    }
}
</script>