<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산현황 > 보험
* @ 페이지설명 : 나의자산 > 자산현황 > 인보험 상세(기본, 보장정보)
* @ 파일명     : src/componens/AS/IS/CMM/CmmInsuDetailCoverages.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533571              최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
    <div class="full_popup renewal mydata2023" id="full_popup_01"> 
        <div class="popup_header">
            <h1 v-if="type == TYPE_PERSON">인보험</h1>
            <h1 v-else-if="type == TYPE_NOT_PERSON">물보험</h1>
            <h1 v-else-if="type == TYPE_PENSION">연금(저축)보험</h1>
            <h1 v-else-if="type == TYPE_INSURED_PERSON">인보험</h1>
            <h1 v-else-if="type == TYPE_INSURED_NOT_PERSON">물보험</h1>
        </div>
        <div class="popup_content com_no_bottom com_bg_type00 insur">
            <div class="asset_info_box">
                <div class="com_inner">
                    <div class="asset_info_wrap">
                        <div class="asset_info">
                            <dl>
                                <dt>{{isrcoWrsnm}}<span :class="getStatusClass(isrCtrStsc)">{{isrCtrStsnm}}</span></dt>
                                <dd>
                                    <span class="account_num">{{isrSctsNo}}</span>
                                </dd>
                                <dd v-if="isrLoanCn">
                                    <a href="javascript:void(0);" role="button" class="small_btn_gray" @click.prevent="openLoansPop()">대출정보</a>
                                </dd>
                            </dl>
                            <div class="bank_icon">
                                <i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgnm}}</span></i>
                            </div>
                        </div>

                        <div v-if="type != TYPE_INSURED_CAR" class="asset_price_wrap">
                            <div class="amount">보험료</div>
                            <div class="asset_price">
                                <span class="num">{{isrPymIsrfe | numberFilter}}</span>원
                            </div>
                        </div>

                        <div v-if="type == TYPE_INSURED_CAR" class="asset_product">
                            <p v-if="ctrmnVhcnm" class="car_info">{{ctrmnVhcnm}}<span v-if="isrVhcno" class="pointColor green">{{isrVhcno}}</span></p>
                            <p v-else-if="isrVhcno" class="car_info"><span v-if="isrVhcno" class="pointColor green">{{isrVhcno}}</span></p>
                            <div class="desc">
                                <span v-if="agSctrCntn">{{agSctrCntnLabel}}</span>
                                <span v-if="drvrLimtSctrCntn">{{drvrLimtSctrCntn}}</span>
                                <span v-if="slfVhcHmYn">{{slfVhcHmYnLabel}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="asset_detail asset_detail_cov">
                        <ul class="list_type_2023">
                            <template v-if="type == TYPE_INSURED_PERSON || type == TYPE_INSURED_NOT_PERSON">
                                <li>
                                    <dl v-if="updtYn !== undefined">
                                        <dt>갱신여부</dt>
                                        <dd>{{updtYn == '1' ? '갱신형' : '비갱신형'}}</dd>
                                    </dl>
                                    <dl v-if="ctrcnlDt">
                                        <dt>계약체결일</dt>
                                        <dd class="num">{{ctrcnlDt | dateFilter('YYYY.MM.DD')}}</dd>
                                    </dl>
                                    <dl v-if="pymEdDt">
                                        <dt>종료일</dt>
                                        <dd class="num">{{pymEdDt | dateFilter('YYYY.MM.DD')}}</dd>
                                    </dl>								
                                    <dl v-if="isrCtrAm !== undefined">
                                        <dt>보험가입금액</dt>
                                        <dd><em class="num">{{isrCtrAm | numberFilter}}</em>원</dd>
                                    </dl>
                                    <dl v-if="type == TYPE_INSURED_PERSON && vainsIsrYn !== undefined">
                                        <dt>변액보험여부</dt>
                                        <dd>{{vainsIsrYn == '1' ? '예' : '아니오'}}</dd>
                                    </dl>
                                    <dl v-if="type == TYPE_INSURED_PERSON && univrYn !== undefined">
                                        <dt>유니버셜여부</dt>
                                        <dd>{{univrYn == '1' ? '예' : '아니오'}}</dd>
                                    </dl>
                                    <dl v-if="isrCtrmnm">
                                        <dt>계약자명</dt>
                                        <dd>{{isrCtrmnm | maskingFilter('name')}}</dd>
                                    </dl>
                                    <dl v-if="type == TYPE_INSURED_PERSON && pnpAtisrYn !== undefined">
                                        <dt>주피보험자여부</dt>
                                        <dd>{{pnpAtisrYn == '1' ? '주피보험자' : '종피보험자'}}</dd>
                                    </dl>
                                    <dl v-if="isrSctrCn !== undefined && isrSctrCn > 0">
                                        <dt>특약 목록</dt>
                                        <dd v-if="isrSctrCn > 0"><a href="javascript:void(0);" class="link_arrow" @click.prevent="openContractsSlidePop()">{{isrSctrCn}}건</a></dd>
                                        <dd v-else>{{isrSctrCn}}건</dd>
                                    </dl>
                                    <dl v-if="sctrEntAmSum !== undefined && isrSctrCn > 0">
                                        <dt>특약가입금액 합계</dt>
                                        <dd><em class="num">{{sctrEntAmSum | numberFilter}}</em>원</dd>
                                    </dl>
                                    <dl v-if="obvmCn !== undefined && obvmCn > 0 && type == TYPE_INSURED_NOT_PERSON">
                                        <dt>목적물 수</dt>
                                        <dd><a @click.prevent="openObjectsSlidePop()" href="javascript:void(0);" class="link_arrow">{{obvmCn}}개</a></dd>
                                    </dl>
                                </li>
                            </template>

                            <template v-else-if="type == TYPE_INSURED_CAR">
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
                                    <dl v-if="slfVhcHmYn !== undefined">
                                        <dt>자기차량손해가입</dt>
                                        <dd>{{slfVhcHmYnLabel2}}</dd>
                                    </dl>
                                    <dl v-if="slfCgmnyDsnm">
                                        <dt>자기부담금 비율</dt>
                                        <dd><em class="num">{{slfCgmnyDsnmLabel}}</em>%</dd>
                                    </dl>	
                                    <dl v-if="slfCgmnyAm !== undefined">
                                        <dt>자기부담금 금액</dt>
                                        <dd><em class="num">{{slfCgmnyAm | numberFilter}}</em>원</dd>
                                    </dl>	
                                </li>
                            </template>

                            <template v-else-if="type == TYPE_PENSION && isrKdDsc != '30'">
                                <li>
                                    <dl v-if="ctrcnlDt">
                                        <dt>계약일</dt>
                                        <dd class="num">{{ctrcnlDt | dateFilter('YYYY.MM.DD')}}</dd>
                                    </dl>
                                    <dl v-if="updtYn !== undefined">
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
                            </template>

                            <template v-else>
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
                            </template>
                        </ul>
                    </div>
                </div>
                <button type="button" class="btn_view_detail btn_view_detail_cov">더보기</button>
            </div>
            <div class="com_inner">

                <div v-if="type != TYPE_INSURED_PERSON && type != TYPE_INSURED_NOT_PERSON && type != TYPE_INSURED_CAR" class="com_tabmenu_type03 switchType btn2">
                    <ul>
                        <li role="presentation" aria-controls="tab_01"><a href="javascript:void(0);" @click.prevent="openTransactionsPop()"><span>납입 정보</span></a></li>
                        <li class="on" role="presentation" aria-controls="tab_02"><a href="javascript:void(0);"><span>보장 정보</span></a></li>
                    </ul>
                </div>

                <!-- 피보험계약자 보험 보장정보 -->
                <template v-if="isrMggCntnList.length > 0">
                    <div v-if="type == TYPE_INSURED_PERSON || type == TYPE_INSURED_NOT_PERSON || type == TYPE_INSURED_CAR" class="renewal shor_term">
                        <div v-for="(item, idx) in isrMggCntnList" :key="'isrMgg_' + idx" class="com_box_type01 toggle_list_box2 custom_list">
                            <div data-ui-toggle="box" class="toggle_box_area open">
                                <button type="button" class="view_btn" aria-expanded="true">
                                    <div class="new_tit_area">
                                        <div class="tit"><span>{{item.coMggnm}}</span></div>
                                        <span class="total_price">
                                            <em class="num">{{item.grntMggAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </div>
                                    <em class="open">열기</em>
                                    <em class="close">닫기</em>
                                </button>
                            </div>
                            <div class="view_cont list_type_01">
                                <dl v-if="item.grntCtrRlrDscnm">
                                    <dt>계약관계자 구분</dt>
                                    <dd>{{item.grntCtrRlrDscnm}}</dd>
                                </dl>	
                                <dl v-if="item.atisrCtrmnRelCnm">
                                    <dt>피보험자계약자관계</dt>
                                    <dd>{{item.atisrCtrmnRelCnm}}</dd>
                                </dl>	
                                <dl v-if="item.mggStscnm">
                                    <dt>담보상태</dt>
                                    <dd>{{item.mggStscnm}}</dd>
                                </dl>
                                <dl v-if="item.mggStDt">
                                    <dt>담보시작일자</dt>
                                    <dd class="num">{{item.mggStDt | dateFilter("YYYY.MM.DD")}}</dd>
                                </dl>
                                <dl v-if="item.mggEdDt && item.mggEdDt != '99999999'">
                                    <dt>담보종료일자</dt>
                                    <dd class="num">{{item.mggEdDt | dateFilter("YYYY.MM.DD")}}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 주계약자 보험 보장정보 -->
                    <!-- 보장 정보 tabBox 시작 -->
                    <div v-else id="tab_02" role="tabpanel" class="cmm-tab-panel on">
                        <strong class="titH5 listTit">보장 목록 <b>{{isrMggCntnCn}}</b>건</strong>
                        <p class="com_txt_sub"><span>{{cusnm}}</span>님의 보험 담보별 보장 정보입니다.</p>

                        <div class="com_box_type01 toggle_list_box2 custom_list" v-for="(item, idx) in isrMggCntnList" :key="'isrMgg_' + idx">
                            <div data-ui-toggle="box" class="toggle_box_area open">
                                <button type="button" class="view_btn" aria-expanded="true">
                                    <div class="new_tit_area">
                                        <div class="tit"><span>{{item.coMggnm}}</span></div>
                                        <span class="total_price">
                                            <em class="num">{{item.grntMggAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </div>
                                    <em class="open">열기</em>
                                    <em class="close">닫기</em>
                                </button>
                            </div>
                            <ul class="view_cont list_toggle">
                                <li>
                                    <dl v-if="item.mggStscnm">
                                        <dt>담보상태</dt>
                                        <dd>{{item.mggStscnm}}</dd>
                                    </dl>
                                    <dl v-if="item.mggStDt">
                                        <dt>담보시작일자</dt>
                                        <dd>{{item.mggStDt | dateFilter("YYYY.MM.DD")}}</dd>
                                    </dl>
                                    <dl v-if="item.mggEdDt && item.mggEdDt != '99999999'">
                                        <dt>담보종료일자</dt>
                                        <dd>{{item.mggEdDt | dateFilter("YYYY.MM.DD")}}</dd>
                                    </dl>
                                    <dl v-if="item.atisrCtrmnRelCnm">
                                        <dt>피보험자계약자관계</dt>
                                        <dd>{{item.atisrCtrmnRelCnm}}</dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="no_data_box no_data_box01 grayExclamationType">
                        <div class="no_data_list" >
                            <p class="txt_sub">조회된 정보가 없습니다.</p>
                        </div>
                    </div>
                </template>
                <!--//com_inner -->
            </div>

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

import ASIS2002 from '@/views/page/AS/IS/ASIS2002/ASIS2002'
import ASIS2004 from '@/views/page/AS/IS/ASIS2004/ASIS2004'
import ASIS2005 from '@/views/page/AS/IS/ASIS2005/ASIS2005'
import ASIS2006 from '@/views/page/AS/IS/ASIS2006/ASIS2006'
import ASIS2008 from '@/views/page/AS/IS/ASIS2008/ASIS2008'
import ASIS2009 from '@/views/page/AS/IS/ASIS2009/ASIS2009'
import ASIS2012 from '@/views/page/AS/IS/ASIS2012/ASIS2012'
import ASIS2014 from '@/views/page/AS/IS/ASIS2014/ASIS2014'
import ASIS2015 from '@/views/page/AS/IS/ASIS2015/ASIS2015'
import ASIS2017 from '@/views/page/AS/IS/ASIS2017/ASIS2017'
import ASIS2019 from '@/views/page/AS/IS/ASIS2019/ASIS2019'
import ASIS2020 from '@/views/page/AS/IS/ASIS2020/ASIS2020'
import ASIS2025 from '@/views/page/AS/IS/ASIS2025/ASIS2025'

//보험종류
const TYPE_PERSON = 'PERSON'                          // 인보험
const TYPE_NOT_PERSON = 'NOT_PERSON'                  // 물보험
const TYPE_PENSION = 'PENSION'                        // 연금저축보험
const TYPE_INSURED_PERSON = 'INSURED_PERSON'          // 피보험 계약자 인보험
const TYPE_INSURED_NOT_PERSON = 'INSURED_NOT_PERSON'  // 피보험 계약자 물보험
const TYPE_INSURED_CAR = 'INSURED_CAR'                // 피보험 계약자 자동차보험

export default {
    name : "CmmInsuDetailCoverages",
    data: () => {
        return {
            TYPE_PERSON,
            TYPE_NOT_PERSON,
            TYPE_PENSION,
            TYPE_INSURED_PERSON,
            TYPE_INSURED_NOT_PERSON,
            TYPE_INSURED_CAR,
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
            updtYn             : "",  // 갱신여부
            ctrcnlDt           : "",  // 계약체결일자
            dueDt              : "",  // 만기일자
            isrCtrAm           : "",  // 보험계약금액
            curc               : "",  // 통화코드
            allAtIsrpnm        : "",  // 전체피보험자명
            vainsIsrYn         : "N", // 변액보험여부
            univrYn            : "N", // 유니버셜여부
            isrCtrmnm          : "",  // 계약자명
            pnpAtisrYn         : "",  // 주피보험자여부
            isrPnsPymPnsStrtDt : "",  // 보험연금납입연금개시일자
            pnsRcpFqc          : "",  // 연금수령주기코드
            pnsRcpFqnm         : "",  // 연금수령주기명
            lnExePsbWrsYn      : "N", // 대출실행가능상품여부
            isrPymPrdDsc       : "",  // 보험납입기간구분코드
            isrPymPrdDsnm      : "",  // 보험납입기간구분명
            isrPymFqc          : "",  // 보험납입주기코드
            isrPymFqnm         : "",  // 보험납입주기명
            isrTotPaycnt       : 0,   // 보험총납입횟수
            isrPymAcno         : "",  // 보험납입계좌번호
            pymOrgC            : "",  // 납입기관코드
            pymOrgnm           : "",  // 납입기관명
            isrPymdtDt         : "",  // 보험납입일일자
            pymEdDt            : "",  // 납입종료일자
            isrPymIsrfe        : "",  // 보험납입보험료
            totPymIsrfe        : 0,   // 월납입총보험료
            autLnPymRqYn       : "N", // 자동대출납입신청여부

            isrLoanCn          : 0,   // 대출계좌건수
            isrLoanList        : [],  // 대출계좌목록
            
            isrSctrCn          : 0,   // 보험특약건수
            sctrEntAmSum       : 0,   // 특약가입금액합계
            isrSctrList        : [],  // 보험특약목록

            isrMggCntnCn       : 0,   // 보험담보내용건수
            isrMggCntnList     : [],  // 보험담보내용목록

            obvmCn             : 0,   // 보험목적물건수
            obvmList           : [],  // 보험목적물목록

            cusnm              : "",  // 고객명

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
            slfCgmnyAm         : 0,   // 자기부담금금액

            isTabPopup         : false      // 탭으로 팝업되었는지 여부
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
        slfVhcHmYnLabel2() {
            if(this.slfVhcHmYn == '1') {
                return '가입'
            } else {
                return '미가입'
            }
        },
        slfCgmnyDsnmLabel() {
            if(this.slfCgmnyDsnm != undefined) {
                return this.slfCgmnyDsnm.replace('%', '')
            }
            return ''
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
            $('.btn_view_detail_cov').on('click',function(){
                $(this).siblings().children('.asset_detail_cov').toggleClass('open')
                $(this).toggleClass('close')
                if($('.asset_detail_cov').hasClass('open')) {
                    $('.asset_detail_cov').slideDown('slow')
                    $('.btn_view_detail_cov').text('접기')
                }else {
                    $('.asset_detail_cov').slideUp('slow')
                    $('.btn_view_detail_cov').text('더보기')
                }
            })
        
            roundTabWidth()
        })
    },
    methods: {
        initComponent(param) {
            this.infOfrmnOrgC = param.infOfrmnOrgC
            this.infOfrmnOrgNm = param.infOfrmnOrgNm
            this.isrSctsNo = param.isrSctsNo
            this.isrKdDsc = param.isrKdDsc
            this.isrVhcno = param.isrVhcno

            this.isTabPopup = param.isTabPopup || false

            this.cusnm = this.getUserInfo("cusnm")

           this.getData()
        },
        getData() {
            const config = {
                url: this.getDataUrl(),
                data: {
                    mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                    infOfrmnOrgC : this.infOfrmnOrgC,             // 정보제공자기관코드
                    isrSctsNo    : this.isrSctsNo,                // 보험증권번호
                    isrVhcno     : this.isrVhcno                  // 보험차량번호
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
                this.obvmCn             = response.obvmCn

                this.isrLoanCn          = response.isrLoanCn
                this.isrLoanList        = response.isrLoanList

                this.isrSctrCn          = response.isrSctrCn
                this.isrSctrList        = response.isrSctrList || []

                this.sctrEntAmSum   = response.sctrEntAmSum
                this.isrPymAcno     = response.isrPymAcno

                if(this.type == TYPE_NOT_PERSON) {
                    this.isrTngDsNm     = response.isrTngDsNm
                    this.obvmLocaaAdr   = response.obvmLocaaAdr
                    this.obvmCn         = response.obvmCn
                    this.obvmList       = response.obvmList
                }

                if(this.type == TYPE_INSURED_PERSON || this.type == TYPE_INSURED_NOT_PERSON || this.type == TYPE_INSURED_CAR) {
                    this.isrCtrmnm          = response.isrCtrmnm
                    this.pnpAtisrYn         = response.pnpAtisrYn
                }

                if(this.type == TYPE_INSURED_CAR) {
                    this.isrStDt            = response.isrStDt
                    this.isrEdDt            = response.isrEdDt
                    this.ctrmnVhcnm         = response.ctrmnVhcnm
                    this.agSctrCntn         = response.agSctrCntn
                    this.drvrLimtSctrCntn   = response.drvrLimtSctrCntn
                    this.slfVhcHmYn         = response.slfVhcHmYn
                    this.slfCgmnyDsnm       = response.slfCgmnyDsnm
                    this.slfCgmnyAm         = response.slfCgmnyAm
                    this.isrMggCntnCn       = response.isrMggCntnCn
                    this.isrMggCntnList     = response.isrMggCntnList || []

                    //sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                    setTimeout(() => {
                        this.callJQueryFncExcute()
                    }, 100)

                }else{
                    this.getCoverageData()
                }

            })
        },
        getDataUrl() {
            let url = ''
            switch(this.type) {
                case TYPE_PERSON:
                    url = '/as/is/02r01'
                    break
                case TYPE_NOT_PERSON:
                    url = '/as/is/06r01'
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
                case TYPE_INSURED_PERSON:
                    url = '/as/is/16r01'
                    break
                case TYPE_INSURED_NOT_PERSON:
                    url = '/as/is/18r01'
                    break
                case TYPE_INSURED_CAR:
                    url = '/as/is/21r01'
                    break
                default:
                    return
            }
            return url
        },
        getCoverageData() {
            const config = {
                url: this.getCoverageDataUrl(),
                data: {
                    mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                    infOfrmnOrgC : this.infOfrmnOrgC,             // 정보제공자기관코드
                    isrSctsNo    : this.isrSctsNo,                // 보험증권번호
                }
            }

            apiService.call(config).then(response => {
                this.isrMggCntnCn       = response.isrMggCntnCn
                this.isrMggCntnList     = response.isrMggCntnList || []

                //sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                setTimeout(() => {
                    this.callJQueryFncExcute()
                }, 100)
            })
        },
        getCoverageDataUrl() {
            let url = ''
            switch(this.type) {
                case TYPE_PERSON:
                    url = '/as/is/03r01'
                    break
                case TYPE_NOT_PERSON:
                    url = '/as/is/07r01'
                    break
                case TYPE_PENSION:
                    if(this.isrKdDsc == '30') {
                        url = '/as/is/07r01'
                    }else{
                        url = '/as/is/13r01'
                    }
                    break
                case TYPE_INSURED_PERSON:
                    url = '/as/is/16r02'
                    break
                case TYPE_INSURED_NOT_PERSON:
                    url = '/as/is/18r02'
                    break
                default:
                    return
            }
            return url
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
                case TYPE_INSURED_PERSON:
                    component = ASIS2017
                    break
                case TYPE_INSURED_NOT_PERSON:
                    component = ASIS2019
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
        openObjectsSlidePop() {
            let component;
            if(this.type == TYPE_NOT_PERSON || (this.type == TYPE_PENSION && this.isrKdDsc == '30')) {
                component = ASIS2025
            }else if(this.type == TYPE_INSURED_NOT_PERSON) {
                component = ASIS2020
            }

            const config = {
                params : {
                    infOfrmnOrgC: this.infOfrmnOrgC,   // 정보제공자기관코드
                    isrSctsNo   : this.isrSctsNo,      // 보험증권번호
                },
                renderer : {
                    component
                }
            }
            modalService.openSlidePagePopup(config).then(() => {})
        },
        openTransactionsPop() {
            if(this.isTabPopup) {
                this.close()
                return
            }
            
            // 보험종류에 따른 납입정보 페이지(팝업) 
            let component
            switch(this.type) {
                case TYPE_PERSON:
                    component = ASIS2002
                    break
                case TYPE_NOT_PERSON:
                    component = ASIS2006
                    break
                case TYPE_PENSION:
                    component = ASIS2012
                    break
            }

            const config = {
                component,
                params    : {
                    infOfrmnOrgC: this.infOfrmnOrgC,
                    infOfrmnOrgNm: this.infOfrmnOrgNm,
                    isrSctsNo: this.isrSctsNo,
                    isrKdDsc: this.isrKdDsc,
                    isTabPopup: true
                }
            }

            modalService.openPopup(config)
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
                if(this.type ==TYPE_INSURED_PERSON || this.type == TYPE_INSURED_NOT_PERSON) {
                    this.getData()
                }
            })
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