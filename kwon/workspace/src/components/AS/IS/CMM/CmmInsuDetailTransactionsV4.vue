<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산현황 > 보험
* @ 페이지설명 : 나의자산 > 자산현황 > 보험 상세(기본, 납입정보)
* @ 파일명     : src/components/AS/IS/CMM/CmmInsuDetailTransactions.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-14              CS533571              최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
    <div class="full_popup mydata2023" id="full_popup_01"> 
        <div class="popup_header">
            <h1 v-if="type == TYPE_PERSON">인보험</h1>
            <h1 v-else-if="type == TYPE_NOT_PERSON">물보험</h1>
            <h1 v-else-if="type == TYPE_CAR">자동자 보험</h1>
            <h1 v-else-if="type == TYPE_PENSION">연금(저축)보험</h1>
        </div>

        <div class="popup_content com_no_bottom com_bg_type00" :class="(type != TYPE_CAR) ? 'insur' : ''">
            <div class="asset_info_box">
                <div class="com_inner">
                    <div class="asset_info_wrap">
                        <div class="asset_info">
                            <dl>
                                <!-- 상태에 따라 class가 변화는지 확인 필요-->
                                <dt>{{isrcoWrsnm}}<span :class="getStatusClass(isrCtrStsc)">{{isrCtrStsnm}}</span></dt>
                                <dd>
                                    <span class="account_num">{{isrSctsNo}}</span>
                                </dd>
                                <dd v-if="(type == TYPE_PERSON || type == TYPE_NOT_PERSON || type == TYPE_PENSION) && isrLoanCn">
                                    <a href="javascript:void(0);" role="button" class="small_btn_gray" @click.prevent="openLoansPop()">대출정보</a>
                                </dd>
                            </dl>
                            <div class="bank_icon">
                                <i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgnm}}</span></i>
                            </div>
                        </div>

                        <div v-if="type != TYPE_CAR" class="asset_price_wrap">
                            <div class="amount">보험료</div>
                            <div class="layoutBox between">
                                <div class="left">
                                    <div class="asset_price">
                                        <span class="num">{{isrPymIsrfe | numberFilter}}</span>원
                                    </div>
                                </div>
                                <div v-if="btnType" class="right">
                                    <button type="button" class="stdBtn innerType01" @click="fn_rqs()">청구하기</button>
                                </div>
                            </div>

                        </div>

                        <div v-if="type == TYPE_CAR" class="asset_product">
                            <p v-if="ctrmnVhcnm" class="car_info">{{ctrmnVhcnm}}<span v-if="isrVhcno" class="pointColor green">{{isrVhcno}}</span></p>
                            <p v-else-if="isrVhcno" class="car_info"><span v-if="isrVhcno" class="pointColor green">{{isrVhcno}}</span></p>
                            <div class="desc">
                                <span v-if="agSctrCntn">{{agSctrCntnLabel}}</span>
                                <span v-if="drvrLimtSctrCntn">{{drvrLimtSctrCntn}}</span>
                                <span v-if="slfVhcHmYn">{{slfVhcHmYnLabel}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="asset_detail asset_detail_tran">
                        <ul v-if="type == TYPE_CAR" class="list_type_2023">
                            <li>
                                <dl v-if="isrStDt">
                                    <dt>보험 시작일</dt>
                                    <dd class="num">{{isrStDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl v-if="isrEdDt">
                                    <dt>보험 종료일</dt>
                                    <dd class="num">{{isrEdDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl v-if="agSctrCntn">
                                    <dt>연령특약</dt>
                                    <dd>{{agSctrCntnLabel}}</dd>
                                </dl>
                                <dl v-if="drvrLimtSctrCntn">
                                    <dt>운전자한정특약</dt>
                                    <dd>{{drvrLimtSctrCntn}}</dd>
                                </dl>
                                <dl v-if="isrMggCntnCn !== undefined && isrMggCntnCn > 0">
                                    <dt>보험담보별 보장 목록</dt>
                                    <dd><a @click.prevent="openCarCoveragesSlidePop()" href="javascript:void(0);" class="link_arrow">{{isrMggCntnCn}}건</a></dd>
                                </dl>	
                                <dl v-if="isrPymIsrfeSum !== undefined && isrMggCntnCn > 0">
                                    <dt>보험담보 보장 금액 합계</dt>
                                    <dd><em class="num">{{isrPymIsrfeSum | numberFilter}}</em>원</dd>
                                </dl>
                                <dl v-if="slfCgmnyDsnm !== undefined">
                                    <dt>자기부담금 비율</dt>
                                    <dd><em class="num">{{slfCgmnyDsnmLabel}}</em>%</dd>
                                </dl>	
                                <dl v-if="slfCgmnyAm !== undefined">
                                    <dt>자기부담금 금액</dt>
                                    <dd><em class="num">{{slfCgmnyAm | numberFilter}}</em>원</dd>
                                </dl>	
                            </li>
                        </ul>
                        <ul v-else-if="type == TYPE_PENSION && isrKdDsc != '30'" class="list_type_2023">
                            <li>
                                <dl v-if="ctrcnlDt">
                                    <dt>계약일</dt>
                                    <dd class="num">{{ctrcnlDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl v-if="updtYn">
                                    <dt>갱신여부</dt>
                                    <dd>{{(updtYn == '1') ? '갱신형' : '비갱신형'}}</dd>
                                </dl>
                                <dl v-if="dueDt">
                                    <dt>만기일</dt>
                                    <dd class="num">{{dueDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl v-if="isrKdDsc != '30' && isrPnsPymPnsStrtDt">
                                    <dt>연금개시일</dt>
                                    <dd class="num">{{isrPnsPymPnsStrtDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl v-if="isrKdDsc != '30' && pnsRcpFqnm">
                                    <dt>연금수령주기</dt>
                                    <dd>{{pnsRcpFqnm}}</dd>
                                </dl>
                                <dl v-if="isrSctrCn !== undefined && isrSctrCn > 0">
                                    <dt>피보험자 및 특약 목록</dt>
                                    <dd><a href="javascript:void(0);" class="link_arrow" @click.prevent="openContractsSlidePop()">{{isrSctrCn}}건</a></dd>
                                </dl>
                                <dl v-if="sctrEntAmSum !== undefined && isrSctrCn > 0">
                                    <dt>특약가입금액 합계</dt>
                                    <dd><em class="num">{{sctrEntAmSum | numberFilter}}</em>원</dd>
                                </dl>
                                <dl v-if="isrPymPrdDsnm">
                                    <dt>납입기간</dt>
                                    <dd>{{isrPymPrdDsnm}}</dd>
                                </dl>
                                <dl v-if="isrPymFqnm">
                                    <dt>납입주기</dt>
                                    <dd>{{isrPymFqnm}}</dd>
                                </dl>
                                <dl v-if="isrTotPaycnt !== undefined">
                                    <dt>총 납입 횟수</dt>
                                    <dd>{{isrTotPaycnt}}회차</dd>
                                </dl>
                                <dl v-if="pymOrgnm">
                                    <dt>납입기관(자동이체)</dt>
                                    <dd>{{pymOrgnm}}</dd>
                                </dl>
                                <dl v-if="isrPymAcno">
                                    <dt>납입계좌번호(자동이체)</dt>
                                    <dd class="num">{{isrPymAcno}}</dd>
                                </dl>
                                <dl v-if="isrKdDsc == '30' || lnExePsbWrsYn !== undefined">
                                    <dt>대출실행 가능 여부</dt>
                                    <dd v-if="isrKdDsc == '30'">실행불가</dd>
                                    <dd v-else>{{lnExePsbWrsYn == "1" ? "실행가능" : "실행불가"}}</dd>
                                </dl>
                            </li>
                        </ul>
                        <ul v-else class="list_type_2023">
                            <li>
                                <dl v-if="ctrcnlDt">
                                    <dt>계약일</dt>
                                    <dd class="num">{{ctrcnlDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl v-if="pymEdDt">
                                    <dt>종료일</dt>
                                    <dd class="num">{{pymEdDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl v-if="isrPymFqnm">
                                    <dt>납입기간</dt>
                                    <dd>{{isrPymFqnm}}</dd>
                                </dl>
                                <dl v-if="isrTotPaycnt !== undefined">
                                    <dt>납입회차</dt>
                                    <dd>{{isrTotPaycnt}}회</dd>
                                </dl>
                                <dl v-if="isrPymAcno">
                                    <dt>납입계좌번호(자동이체)</dt>
                                    <dd>
                                        <p>{{isrPymAcno}}</p>
                                        <p v-if="pymOrgnm && isrPymdtDt">({{pymOrgnm}}/{{isrPymdtDt}}일)</p>
                                        <p v-else-if="pymOrgnm">({{pymOrgnm}})</p>
                                        <p v-else-if="isrPymdtDt">({{isrPymdtDt}}일)</p>
                                    </dd>
                                </dl>
                                <dl v-if="isrSctrCn !== undefined && isrSctrCn > 0">
                                    <dt>특약 목록</dt>
                                    <dd><a href="javascript:void(0);" class="link_arrow" @click.prevent="openContractsSlidePop()">{{isrSctrCn}}건</a></dd>
                                </dl>
                                <dl v-if="sctrEntAmSum !== undefined && isrSctrCn > 0">
                                    <dt>특약가입금액 합계</dt>
                                    <dd><strong class="num">{{sctrEntAmSum | numberFilter}}원</strong></dd>
                                </dl>
                                <dl v-if="lnExePsbWrsYn !== undefined">
                                    <dt>대출실행 가능 여부</dt>
                                    <dd>{{lnExePsbWrsYn == "1" ? "실행가능" : "실행불가"}}</dd>
                                </dl>
                                <dl v-if="(type == TYPE_NOT_PERSON || (type == TYPE_PENSION && isrKdDsc == '30')) && obvmCn !== undefined && obvmCn > 0">
                                    <dt>목적물 수</dt>
                                    <dd><a @click.prevent="openObjectsSlidePop()" href="javascript:void(0);" class="link_arrow">{{obvmCn}}개</a></dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>
                <button type="button" class="btn_view_detail btn_view_detail_tran">더보기</button>
            </div>

            <template v-if="type != TYPE_CAR">
                <div class="com_inner">
                    <div class="com_tabmenu_type03 switchType btn2" v-if="type == TYPE_PERSON || type == TYPE_NOT_PERSON || type == TYPE_PENSION">
                        <ul>
                            <li class="on" role="presentation" aria-controls="tab_01"><a href="javascript:void(0);"><span>납입 정보</span></a></li>
                            <li role="presentation" aria-controls="tab_02"><a href="javascript:void(0);" @click.prevent="openCoveragesPop()"><span>보장 정보</span></a></li>
                        </ul>
                    </div>
                    <!-- 납입 정보 tabBox 시작 -->
                    <div v-if="isrTranCn > 0" id="tab_01" role="tabpanel" class="cmm-tab-panel on">
                        <div class="asset_more_list no_line">
                            <ul>
                                <li v-for="(item, idx) in isrTranList" :key="'tran_' + idx">
                                    <dl class="breakdown">
                                        <dt v-if="item.pymSc !== undefined">{{item.pymSc}}회차</dt>
                                        <dt v-else></dt>

                                        <dd class="num" v-if="item.isrPymIsrfe !== undefined">{{item.isrPymIsrfe | numberFilter}}원</dd>
                                        <dd class="num" v-else></dd>
                                    </dl>
                                    <dl>
                                        <dt class="num">{{item.pymYm | dateFilter('YYYY년 MM월')}}</dt>
                                        <dd class="num">{{item.rveMethnm}}</dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                        <a @click.prevent="showMoreList()" :style="noMoreList" href="javascript:void(0);" role="button" class="com_btn_more"><span>더보기</span></a>
                    </div>
                    <!--//com_inner -->
                    <div class="no_data_box no_data_box01 grayExclamationType" v-else>
                        <div class="no_data_list" >
                            <p class="txt_sub">조회된 정보가 없습니다.</p>
                        </div>
                    </div>
                </div>
            </template>

            <template v-else>
                <div class="com_inner pt0">
                    <div class="asset_more_list no_line" v-if="isrTranCn > 0">
                        <ul>
                            <li v-for="(item, idx) in isrTranList" :key="'tran_' + idx">
                                <dl class="breakdown">
                                    <dt>{{item.trPymSc}}회차</dt>
                                    <dd class="num">{{item.isrPymIsrfe | numberFilter}}원</dd>
                                </dl>
                                <dl>
                                    <dt class="num">{{(item.trDt + '000000') | dateFilter('YYYY년 MM월')}}</dt>
                                    <dd class="num">{{item.rveMethnm}}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <div class="no_data_box no_data_box01 grayExclamationType" v-else>
                        <div class="no_data_list" >
                            <p class="txt_sub">조회된 정보가 없습니다.</p>
                        </div>
                    </div>
                </div>

                <div class="com_inner">
                    <a @click.prevent="showMoreList()" :style="noMoreList" href="javascript:void(0);;" role="button" class="com_btn_more">더보기</a>
                </div>
            </template>

        </div>
        <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="closeAll(true)"><span class="blind">팝업닫기</span></a>
    </div>
    <!--// 전체 팝업 종료 -->
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'

import ASIS2003 from '@/views/page/AS/IS/ASIS2003/ASIS2003' // 인보험 보장정보 팝업
import ASIS4003 from '@/views/page/AS/IS/ASIS4003/ASIS4003' // 인보험 보장정보 팝업
import ASIS2004 from '@/views/page/AS/IS/ASIS2004/ASIS2004' // 인보험 특약정보 슬라이드 팝업
import ASIS2005 from '@/views/page/AS/IS/ASIS2005/ASIS2005' // 인보험 대출정보 팝업
import ASIS2007 from '@/views/page/AS/IS/ASIS2007/ASIS2007' // 물보험 보장정보 팝업
import ASIS2008 from '@/views/page/AS/IS/ASIS2008/ASIS2008' // 물보험 특약정보 슬라이드 팝업
import ASIS2009 from '@/views/page/AS/IS/ASIS2009/ASIS2009' // 물보험 대출정보 팝업
import ASIS2011 from '@/views/page/AS/IS/ASIS2011/ASIS2011' // 자동차보험 보험담보별 보장정보 슬라이드 팝업
import ASIS2013 from '@/views/page/AS/IS/ASIS2013/ASIS2013' // 연금저축보험 보장정보 팝업
import ASIS2014 from '@/views/page/AS/IS/ASIS2014/ASIS2014' // 연금저축보험 특약정보 슬라이드 팝업
import ASIS2015 from '@/views/page/AS/IS/ASIS2015/ASIS2015' // 연금저축보험 대출정보 팝업
import ASIS2025 from '@/views/page/AS/IS/ASIS2025/ASIS2025' // 물보험 목적물 팝업

//보험종류
const TYPE_PERSON = 'PERSON'          // 인보험
const TYPE_NOT_PERSON = 'NOT_PERSON'  // 물보험
const TYPE_CAR = 'CAR'                // 자동차보험
const TYPE_PENSION = 'PENSION'        // 연금저축보험

export default {
    name : "CmmInsuDetailTransactions",
    data: () => {
        return {
            TYPE_PERSON,
            TYPE_NOT_PERSON,
            TYPE_CAR,
            TYPE_PENSION,
            infOfrmnOrgC       : "",  // 정보제공자기관코드
            infOfrmnOrgnm      : "",  // 정보제공자기관명
            isrSctsNo          : "",  // 보험증권번호
            rcnInqDtm          : "",  // 최근조회일시
            tmsRqmYn           : "N", // 전송요구여부
            isrcoWrsnm         : "",  // 보험사상품명
            isrKdDsc           : "",  // 보험종류구분코드
            isrKdDsnm          : "",  // 보험종류구분명
            isrCtrStsc         : "",  // 보험계약상태코드
            isrCtrStsnm        : "",  // 보험계약상태명
            updtYn             : "N", // 갱신여부
            ctrcnlDt           : "",  // 계약체결일자
            dueDt              : "",  // 만기일자
            isrCtrAm           : "",  // 보험계약금액
            curc               : "",  // 통화코드
            vainsIsrYn         : "N", // 변액보험여부
            univrYn            : "N", // 유니버셜여부
            isrPnsPymPnsStrtDt : "",  // 보험연금납입연금개시일자
            pnsRcpFqc          : "",  // 연금수령주기코드
            pnsRcpFqnm         : "",  // 연금수령주기명
            lnExePsbWrsYn      : "N", // 대출실행가능상품여부
            isrPymPrdDsc       : "",  // 보험납입기간구분코드
            isrPymPrdDsnm      : "",  // 보험납입기간구분명
            isrPymFqc          : "",  // 보험납입주기코드
            isrPymFqnm         : "",  // 보험납입주기명
            isrTotPaycnt       : 0,   // 보험총납입횟수
            pymOrgC            : "",  // 납입기관코드
            pymOrgnm           : "",  // 납입기관명
            isrPymAcno         : "",  // 보험납입계좌번호
            isrPymdtDt         : "",  // 보험납입일일자
            pymEdDt            : "",  // 납입종료일자
            isrPymIsrfe        : "",  // 보험납입보험료
            totPymIsrfe        : 0,   // 월납입총보험료
            autLnPymRqYn       : "N", // 자동대출납입신청여부
            allAtIsrpnm        : "",  // 전체피보험자명
            sctrEntAmSum       : 0,    // 특약가입금액합계
            isrSctrCn          : 0,   // 보험특약건수
            isrSctrList        : [],  // 보험특약목록
            isrMggCntnCn       : 0,   // 보험담보내용건수
            isrMggCntnList     : [],  // 보험담보내용목록
            isrTranCn          : 0,   // 보험납입내역건수
            isrTranList        : [],  // 보험납입내역목록
            pageNum            : 0,   // 페이지
            pageCount          : 0,   // 페이지수
            nxDataYn           : "",  // 더보기여부

            isrLoanCn          : 0,   // 대출계좌건수
            isrLoanList        : [],  // 대출계좌목록

            // 물보험
            obvmLocaaAdr       : "",  // 소재지
            obvmCn             : 0,   // 보험목적물건수
            obvmList           : [],  // 보험목적물목록

            // 자동차보험
            isrVhcno           : "",  // 보험차량번호
            carIsrDsc          : "",  // 자동차보험구분코드
            carIsrDsnm         : "",  // 자동차보험구분명
            ctrmnVhcnm         : "",  // 계약자차량명
            agSctrCntn         : "",  // 연령특약내용
            drvrLimtSctrCntn   : "",  // 운전자한정특약내용
            slfVhcHmYn         : "",  // 자기차량손해여부
            isrStDt            : "",  // 보험시작일자
            isrEdDt            : "",  // 보험종료일자
            isrPymIsrfeSum     : 0,   // 자동차보장합계금액
            slfCgmnyDsnm       : "",  // 자기부담금 비율
            slfCgmnyAm         : 0,  // 자기부담금금액

            isTabPopup         : false,      // 탭으로 팝업되었는지 여부
            btnType            : false //청구하기 버튼 컨틑롤
        }
    },
    computed: {
        agSctrCntnLabel() {
            if(this.agSctrCntn == '99'){
                return '전 연령'
            } else {
                return this.agSctrCntn
            }
        },
        slfVhcHmYnLabel() {
            if(this.slfVhcHmYn == '1') {
                return '자차가입'
            } else {
                return '자차미가입'
            }
        },
        slfCgmnyDsnmLabel() {
            if(this.slfCgmnyDsnm != undefined) {
                return this.slfCgmnyDsnm.replace('%', '')
            }
            return ''
        },
        noMoreList() {
            return (this.nxDataYn == 'Y')?"":"display : none"
        }
    },
    props: ['type'],
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)
        
        //더보기
        $(document).ready(function(){
            $('.btn_view_detail_tran').on('click',function(){
                $(this).siblings().children('.asset_detail_tran').toggleClass('open')
                $(this).toggleClass('close')
                if($('.asset_detail_tran').hasClass('open')) {
                    $('.asset_detail_tran').slideDown('slow')
                    $('.btn_view_detail_tran').text('접기')
                }else {
                    $('.asset_detail_tran').slideUp('slow')
                    $('.btn_view_detail_tran').text('더보기')
                }
            })

            roundTabWidth()
        })
    },
    methods: {
        initComponent(param) {
            this.infOfrmnOrgC = param.infOfrmnOrgC
            this.infOfrmnOrgnm = param.infOfrmnOrgnm
            this.isrSctsNo = param.isrSctsNo
            this.isrKdDsc = param.isrKdDsc
            this.isrVhcno = param.isrVhcno

            this.isTabPopup = param.isTabPopup || false
            this.btnType = param.btnType

            this.getData()
        },
        getData() {
            const config = {
                url: this.getDataUrl(),
                data: {
                    mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                    infOfrmnOrgC : this.infOfrmnOrgC,             // 정보제공자기관코드
                    isrSctsNo    : this.isrSctsNo,                // 보험증권번호
                    isrKdDsc     : this.isrKdDsc,                 // 보험종류 코드
                    isrVhcno     : this.isrVhcno,                 // 보험차량번호
                    pageNum      : this.pageNum + 1
                }
            }

            apiService.call(config).then(response => {
                this.rcnInqDtm          = response.rcnInqDtm
                this.tmsRqmYn           = response.tmsRqmYn
                this.isrcoWrsnm         = response.isrcoWrsnm
                this.isrKdDsc           = response.isrKdDsc
                this.isrKdDsnm          = response.isrKdDsnm
                this.isrCtrStsc         = response.isrCtrStsc
                this.isrCtrStsnm        = response.isrCtrStsnm
                this.updtYn             = response.updtYn
                this.ctrcnlDt           = response.ctrcnlDt
                this.dueDt              = response.dueDt
                this.isrCtrAm           = response.isrCtrAm
                this.curc               = response.curc
                this.vainsIsrYn         = response.vainsIsrYn
                this.univrYn            = response.univrYn
                this.isrPnsPymPnsStrtDt = response.isrPnsPymPnsStrtDt
                this.pnsRcpFqc          = response.pnsRcpFqc
                this.pnsRcpFqnm         = response.pnsRcpFqnm
                this.lnExePsbWrsYn      = response.lnExePsbWrsYn
                this.isrPymPrdDsc       = response.isrPymPrdDsc
                this.isrPymPrdDsnm      = response.isrPymPrdDsnm
                this.isrPymFqc          = response.isrPymFqc
                this.isrPymFqnm         = response.isrPymFqnm
                this.isrTotPaycnt       = response.isrTotPaycnt
                this.pymOrgC            = response.pymOrgC
                this.pymOrgnm           = response.pymOrgnm
                this.isrPymdtDt         = response.isrPymdtDt
                this.pymEdDt            = response.pymEdDt
                this.isrPymIsrfe        = response.isrPymIsrfe
                this.totPymIsrfe        = response.totPymIsrfe
                this.autLnPymRqYn       = response.autLnPymRqYn
                this.allAtIsrpnm        = response.allAtIsrpnm

                this.isrLoanCn          = response.isrLoanCn
                this.isrLoanList        = response.isrLoanList

                this.isrSctrCn          = response.isrSctrCn
                this.isrSctrList        = response.isrSctrList || []

                this.isrMggCntnCn       = response.isrMggCntnCn
                this.isrMggCntnList     = response.isrMggCntnList || []

                
                if(this.type == TYPE_PERSON || this.type == TYPE_PENSION) {
                    this.sctrEntAmSum   = response.sctrEntAmSum
                    this.isrPymAcno     = response.isrPymAcno
                }

                if(this.type == TYPE_NOT_PERSON || (this.type == TYPE_PENSION && this.isrKdDsc == '30')) {
                    this.sctrEntAmSum   = response.sctrEntAmSum
                    this.isrPymAcno     = response.isrPymAcno
                    this.isrTngDsNm     = response.isrTngDsNm
                    this.obvmLocaaAdr   = response.obvmLocaaAdr
                    this.obvmCn         = response.obvmCn
                    this.obvmList       = response.obvmList
                }

                if(this.type == TYPE_CAR){
                    this.pageCount          = response.pageCount
                    this.pageNum            = response.pageNum
                    this.assignIsrTran(response.isrTranList, this.pageCount)
                    if(response.isrTranCn > this.pageCount) {
                        this.nxDataYn = "Y"
                    }else{
                        this.nxDataYn = "N"
                    }
    
                    this.assignCarResponse(response)

                    //sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                    setTimeout(() => {
                        this.callJQueryFncExcute()
                    }, 100)

                }else{
                    this.getTransactionData()
                }

            })
        },

        getTransactionData() {
            const config = {
                url: this.getTransactionDataUrl(),
                data: {
                    mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                    infOfrmnOrgC : this.infOfrmnOrgC,             // 정보제공자기관코드
                    isrSctsNo    : this.isrSctsNo,                // 보험증권번호
                    isrKdDsc     : this.isrKdDsc,                 // 보험종류 코드
                    isrVhcno     : this.isrVhcno,                 // 보험차량번호
                    pageNum      : this.pageNum + 1
                }
            }

            apiService.call(config).then(response => {
                this.pageCount      = response.pageCount
                this.pageNum        = response.pageNum
                this.mydtAcno         = response.mydtAcno
                this.assignIsrTran(response.isrTranList, this.pageCount)
                if(response.isrTranCn > this.pageCount) {
                    this.nxDataYn   = "Y"
                }else{
                    this.nxDataYn   = "N"
                }

                //sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                setTimeout(() => {
                    this.callJQueryFncExcute()
                }, 100)
            })
        },

        // 각 보험 타입별 API Path
        getDataUrl() {
            let url = ''
            switch(this.type) {
                case TYPE_PERSON:
                    url = '/as/is/02r01'
                    break
                case TYPE_NOT_PERSON:
                    url = '/as/is/06r01'
                    break
                case TYPE_CAR:
                    url = '/as/is/10r01'
                    break
                case TYPE_PENSION:
                    // 물보험 연금보험
                    if(this.isrKdDsc == '30') {
                        url = '/as/is/06r01'
                    // 인보험 연금보험
                    }else {
                        url = '/as/is/12r01'
                    }
                    break
            }
            return url
        },

        /**
        각 보험 타입별 납입정보 조회 API Path
         */
        getTransactionDataUrl() {
            let url = ''
            switch(this.type) {
                case TYPE_PERSON:
                    url = '/as/is/02r02'
                    break
                case TYPE_NOT_PERSON:
                    url = '/as/is/06r02'
                    break
                case TYPE_CAR:
                    url = '/as/is/10r01'
                    break
                case TYPE_PENSION:
                    // 물보험 연금보험
                    if(this.isrKdDsc == '30') {
                        url = '/as/is/06r02'
                    // 인보험 연금보험
                    }else {
                        url = '/as/is/12r02'
                    }
                    break
            }
            return url
        },

        //자동차보험만 존재하는 response 저장
        assignCarResponse(response) {
            this.isrVhcno           = response.isrVhcno
            this.carIsrDsc          = response.carIsrDsc
            this.carIsrDsnm         = response.carIsrDsnm
            this.ctrmnVhcnm         = response.ctrmnVhcnm
            this.agSctrCntn         = response.agSctrCntn
            this.drvrLimtSctrCntn   = response.drvrLimtSctrCntn
            this.slfVhcHmYn         = response.slfVhcHmYn
            this.isrStDt            = response.isrStDt
            this.isrEdDt            = response.isrEdDt
            this.isrPymIsrfeSum     = response.isrPymIsrfeSum
            this.slfCgmnyDsnm       = response.slfCgmnyDsnm
            this.slfCgmnyAm         = response.slfCgmnyAm
        },
        openContractsSlidePop() {
            // 보험종류에 따른 특약정보 페이지
            let component
            switch(this.type) {
                case TYPE_PERSON:
                    component = ASIS2004
                    break
                case TYPE_NOT_PERSON:
                    component = ASIS2008
                    break
                case TYPE_PENSION:
                    component = ASIS2014
                    break
            }

            const config = {
                params : {
                    infOfrmnOrgC : this.infOfrmnOrgC, // 정보제공자기관코드
                    isrSctsNo    : this.isrSctsNo,    // 보험증권번호
                    isrKdDsc     : this.isrKdDsc      // 보험종류구분코드
                },
                renderer : {
                    component // 특약정보(슬라이드 팝업)
                }
            }

            modalService.openSlidePagePopup(config).then(() => {})
        },
        openCoveragesPop() {
            if(this.isTabPopup) {
                this.close()
                return
            }

            // 보험종류에 따른 보장정보 페이지(팝업) 
            // (자동차보험은 슬라이드 팝업)
            let component
            switch(this.type) {
                case TYPE_PERSON:
                    component = ASIS4003
                    break
                case TYPE_NOT_PERSON:
                    component = ASIS2007
                    break
                case TYPE_PENSION:
                    component = ASIS2013
                    break
            }

            const config = {
                component,
                params: {
                    infOfrmnOrgC: this.infOfrmnOrgC,
                    infOfrmnOrgNm: this.infOfrmnOrgNm,
                    isrSctsNo: this.isrSctsNo,
                    isrKdDsc: this.isrKdDsc,
                    isTabPopup: true,
                    btnType: this.btnType
                }
            }

            modalService.openPopup(config)
        },
        openCarCoveragesSlidePop(){
            const config = {
                params : {
                    infOfrmnOrgC : this.infOfrmnOrgC,       // 정보제공자기관코드
                    isrSctsNo    : this.isrSctsNo,          // 보험증권번호
                    isrPymIsrfeSum: this.isrPymIsrfeSum,    // 보험담보별 보장 금액 합계
                    isrMggCntnCn: this.isrMggCntnCn,        // 보험담보목록 건수
                    isrMggCntnList  : this.isrMggCntnList   // 보험담보목록
                },
                renderer : {
                    component: ASIS2011 // 자동차 보험담보별보장정보(슬라이드 팝업)
                }
            }

            modalService.openSlidePagePopup(config).then(() => {})
        },
        openLoansPop() {
            // 보험종류에 따른 대출정보 페이지
            let component
            switch(this.type) {
                case TYPE_PERSON:
                    component = ASIS2005
                    break
                case TYPE_NOT_PERSON:
                    component = ASIS2009
                    break
                case TYPE_PENSION:
                    component = ASIS2015
                    break
            }

                const config = {
                component,
                params    : Object.assign(this.params, {
                    mydtAcno: this.mydtAcno,
                    isrLoanAcnoCn: this.isrLoanCn,
                    isrLoanAcnoList: this.isrLoanList,
                    isrKdDsc: this.isrKdDsc
                })
            }

            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        // 더보기
        showMoreList() {
            const config = {
                url : this.getTransactionDataUrl(),
                data: {
                    mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                    infOfrmnOrgC : this.infOfrmnOrgC,             // 정보제공자기관코드
                    isrSctsNo    : this.isrSctsNo,                // 보험증권번호
                    pageNum      : this.pageNum + 1,
                    isrVhcno     : this.isrVhcno
                }
            }

            apiService.call(config).then(response => {
                this.pageCount      = response.pageCount
                this.pageNum        = response.pageNum
                this.assignIsrTran(response.isrTranList, this.pageCount)
                if(response.isrTranCn > response.pageCount) {
                    this.nxDataYn   = "Y"
                }else{
                    this.nxDataYn   = "N"
                }
            })
        },
        assignIsrTran(resIsrTranList, pageCount) {
            if(resIsrTranList) {
                for(let i=0; i<resIsrTranList.length; i++) {
                    if(i < pageCount) {
                        this.isrTranList.push(resIsrTranList[i])
                        this.isrTranCn++
                    }
                }
            }
        },
        /**
         * 보험 상태에 따른 배지 class
         */
        getStatusClass(isrSctrStsc) {
            // 정상
            if(isrSctrStsc == '02') {
                return 'mint_badge'
            }else if(isrSctrStsc == '04') {
                return ['mint_badge', 'orng']
            // 만기
            }else if(isrSctrStsc == '05') {
                return ['mint_badge', 'red2']
            // 소멸
            }else if(isrSctrStsc == '06') {
                return ['mint_badge', 'gray']
            }
        },
        openObjectsSlidePop() {
            const config = {
                params : {
                    infOfrmnOrgC: this.infOfrmnOrgC,   // 정보제공자기관코드
                    isrSctsNo   : this.isrSctsNo,      // 보험증권번호
                },
                renderer : {
                    component: ASIS2025
                }
            }
            modalService.openSlidePagePopup(config).then(() => {})
        },
        /*
        청구하기 콕뱅크>콕혜택>생활금융>농협생명 TODO 경로 확인
        */
        fn_rqs(){
            alert("이동 url 확정 시 추가 작업 예정")
        }
    }
}

// 라운드탭 사이즈(가장큰 탭사이즈를 기준으로 각탭 및 전체 적용하기)
function roundTabWidth(){
    var arr = [],
            _tabList = $('.switchType li')
    _tabList.each(function(e){
        arr[e] = $(this).outerWidth()
    })
    _tabList.css('width',Math.max(...arr)) //탭 사이즈 적용
    _tabList.parent().parent().css('width',Math.max(...arr)*2) //탭전체 사이즈 적용
    //console.log('값 = '+arr+', 갯수 = '+arr.length+', 최고값 = '+Math.max(...arr))
}

</script>