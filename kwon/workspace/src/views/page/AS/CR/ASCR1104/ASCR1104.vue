<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 금융건강도 > 신용정보
* @ 페이지설명 : 나의자산 > 금융건강도 > 신용정보 연체내역
* @ 파일명     : src/views/page/AS/CR/ASCR1104/ASCR1104.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-06-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-24              CS516033              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup">
        <div class="popup_header">
            <h1>신용정보</h1>
            <a href="javascript:void(0);" class="btn_back"  @click.prevent="fn_moveBack()" ><span class="blind">이전화면</span></a>
            <a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll(true)"><span class="blind">화면닫기</span></a>
        </div>
        <div class="com_tabmenu_type01 menunum03">
            <ul>
                <li :class="tabPgflag === '1' ? 'on' : ''"><a href="javascript:void(0);" @click.prevent="fn_setTabPgflag('1')">연체</a></li>
                <li :class="tabPgflag === '2' ? 'on' : ''"><a href="javascript:void(0);" @click.prevent="fn_setTabPgflag('2')">대출</a></li>
                <li :class="tabPgflag === '3' ? 'on' : ''"><a href="javascript:void(0);" @click.prevent="fn_setTabPgflag('3')">카드</a></li>
            </ul>
        </div>
        <!-- 연체내역 S -->
        <div class="popup_content com_no_bottom com_sub_type02 com_bg_type00" v-show="tabPgflag == '1'">
            <div class="com_submainbox_type01 com_submainbox_type01-06 ui-as-cr-04 m0 com_line_type01">
                <div class="toptitle">
                    <div class="left">
                        연체 잔액<a href="javascript:void(0);" @click.prevent="fn_showInfo"><span class="caution_ico"></span><span class="blind">도움말버튼</span></a>
                    </div>
                </div>
                <div class="com_inner p0">
                    <div class="top_info_box_wrap m0">
                        <div class="top_info_box gradiant_boxlist p0 boxshadow">
                            <div class="bill mt10">
                                <!-- <span id="ovdBac" class="num counter" :data-count="ovdBac"></span>원 -->
                                <span id="ovdBac" class="num counter">{{ovdBac | numberFilter}}</span>원
                            </div>
                            <div class="com_inner com_bg_type00 radius mt30">
                                <div class="info-txt">
                                    <span>소액의 연체라도 자주하게 되면</span>
                                    빚을 갚을 가능성이 낮은 것으로 평가되어 신용점수가 하락할 수 있습니다.<br>
                                    통신비 및 공공요금은 납부 일정을 놓치지 않도록 <span>자동이체</span>를 해두는 것도 좋습니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="com_inner">
                <div class="com_total_type02">
                    <strong class="com_myfarm_tit01">보유 연체</strong>
                    <span class="txt_total"><em>{{ovdCn}}</em>개</span>
                </div>
                <template v-if="ovdCn > 0">
                    <div class="com_box_type01 toggle_list_box2" v-for="(ovd, idx) in ovdBrk" :key="'ovd_'+idx">
                        <div data-ui-toggle="box" class="toggle_top_box">
                            <button type="button" class="view_btn" aria-expanded="false">
                                <dl>
                                    <dt>
                                        <em>{{ovd.fncorgNm}}</em>
                                    </dt>
                                    <dd>
                                        <span class="total_price">
                                            <em class="num">{{ovd.ovdAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <em class="open">열기</em>
                                <em class="close">닫기</em>
                            </button>
                        </div>
                        <ul class="list_type_02 toggle_list_type_01">
                            <li>
                                <dl>
                                    <dt>
                                        <em>연체원금</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{ovd.firOvdAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>상환금액</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{ovd.rpySam | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <p class="dot_msg mt18">
                        코리아크레딧뷰로(KCB)에서 제공하는 정보이며,
                        KCB 데이터 산정일 및 기준금액의 차이로 실제 금융정보와 다를 수 있습니다.
                    </p>
                </template>
                <!-- 조회내역 없을때 S -->
                <template v-if="ovdCn == 0">
                    <div class="no_data_box">
                        <div class="no_data_list">
                            <p>보유 연체가 없습니다.</p>
                        </div>
                    </div>
                </template>
                <!-- 조회내역 없을때 E -->
            </div>
        </div>
        <!-- 연체내역 E -->
        <!-- 대출내역 S -->
        <div class="popup_content com_no_bottom com_sub_type02 com_bg_type00" v-show="tabPgflag == '2'">
            <div class="com_submainbox_type01 com_submainbox_type01-07 com_line_type01 ui-as-cr-05 m0">
                <div class="toptitle">
                    <div class="left">
                        대출 잔액<a href="javascript:void(0);" @click.prevent="fn_showInfo"><span class="caution_ico"></span><span class="blind">도움말버튼</span></a>
                    </div>
                </div>
                <div class="com_inner p0">
                    <div class="top_info_box_wrap m0">
                        <div class="top_info_box gradiant_boxlist p0">
                            <div class="bill mt5">
                                <!-- <span id="lnBac" class="num counter" :data-count="lnBac"></span>원 -->
                                <span id="lnBac" class="num counter">{{lnBac | numberFilter}}</span>원
                            </div>
                            <div class="com_inner com_bg_type00 radius mt25">
                                <div class="info-txt">
                                    대출 금리가 높을 수록, 보유 부채의 규모가 클수록,
                                    부채 건수가 많을수록 신용점수에 부정적인 영향을
                                    미칩니다.<br> 오래되거나 <span>높은 금리의 대출부터 상환 후,
                                    대출을 연체없이 성실히 상환하는 것</span>이 신용점수
                                    관리에 도움이 됩니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="com_inner">
                <div class="com_total_type02">
                    <strong class="com_myfarm_tit01">보유 대출</strong>
                    <span class="txt_total"><em>{{lnOpCn}}</em>개</span>
                </div>
                <template v-if="lnOpCn > 0">
                    <div class="com_box_type01 toggle_list_box2" v-for="(loan, idx) in loanBrk" :key="'loan_'+idx">
                        <div data-ui-toggle="box" class="toggle_top_box">
                            <button type="button" class="view_btn" aria-expanded="false">
                                <dl>
                                    <dt>
                                        <em>{{loan.fncorgNm}}</em>
                                    </dt>
                                    <dd>
                                        <span class="total_price">
                                            <em class="num">{{loan.lnBac | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <em class="open">열기</em>
                                <em class="close">닫기</em>
                            </button>
                        </div>
                        <ul class="list_type_02 toggle_list_type_01">
                            <li>
                                <dl>
                                    <dt>
                                        <em>대출원금</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{loan.pmiAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>상환금액</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{loan.lnRpySam | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>상환율</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{loan.lnRpyrt | numberFilterAuto('0,00.00', {precision: 2}, false)}}</em>
                                            <em class="unit">%</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>상환방식</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{loan.lnrpyMethExpl}}</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>대출일자</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{loan.mydtOpDt | dateFilter('YYYY.MM.DD')}}</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>만기일자</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{loan.dueDt | dateFilter('YYYY.MM.DD')}}</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <p class="dot_msg mt18">
                        코리아크레딧뷰로(KCB)에서 제공하는 정보이며,
                        KCB 데이터 산정일 및 기준금액의 차이로 실제 금융정보와 다를 수 있습니다.
                    </p>
                </template>
                <!-- 조회내역 없을때 S -->
                <template v-if="lnOpCn == 0">
                    <div class="no_data_box">
                        <div class="no_data_list">
                            <p>보유 대출이 없습니다.</p>
                        </div>
                    </div>
                </template>
                 <!-- 조회내역 없을때 E -->
            </div>
        </div>
        <!-- 대출내역 E -->
        <!-- 카드내역 S -->
        <div class="popup_content com_no_bottom com_sub_type02 com_bg_type00" v-show="tabPgflag == '3'">
            <div class="com_submainbox_type07 com_submainbox_type01-05 com_line_type01">
                <div class="com_inner p0">
                    <div class="top_info_box_wrap m0">
                        <div class="top_info_box gradiant_boxlist p0">
                            <!--card01~ 추후 카드사별 클래스로 컨트롤-->
                            <div class="select_date">
                                {{inqMm | numberFilter}}월 카드 이용현황
                            </div>
                            <div class="bill">
                                <!-- <span id="totUsAm" class="num counter" :data-count="totUsAm"></span>원 -->
                                <span id="totUsAm" class="num counter">{{totUsAm | numberFilter}}</span>원
                            </div>
                            <div class="box_toggle_wrap">
                                <div class="box_toggle">
                                    <div class="toggle-box">
                                        <div class="active hold">
                                            <div class="view-box clear">
                                                <div class="info">
                                                    <div class="title">보유카드</div>
                                                    <div class="num">{{cdOpCn | numberFilter}}개</div>
                                                </div>
                                                <div class="info">
                                                    <div class="title">총 한도</div>
                                                    <div class="num">{{totLmtAm | numberFilter}}원</div>
                                                </div>
                                                <div class="info">
                                                    <div class="title">총 한도 소진율</div>
                                                    <div class="num">{{totLmtXhtrt | numberFilterAuto('0,00.00', {precision: 2}, false)}}%</div>
                                                </div>
                                                <div class="info">
                                                    <div class="title">현금서비스 이용금액 <a href="javascript:void(0);" @click.prevent="fn_showInfo"><span class="caution_ico"></span><span class="blind">현금서비스이용금액 도움말버튼</span></a></div>
                                                    <div class="num">{{totalChsvUsAm | numberFilter}}원</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="com_inner com_bg_type00 radius mt20">
                                <div class="info-txt">
                                    신용카드는 <span>총 한도의 30% </span>이내로 사용하고, 카드
                                    한도를 최대로 설정하면 한도대비 카드 사용 비율이
                                    낮아지므로 신용점수 관리에 도움이 됩니다.
                                    건전한 신용거래 실적은 신용평가에 긍정적인 영향을
                                    미칩니다.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="com_inner">
                <div class="com_total_type02">
                    <strong class="com_myfarm_tit01">보유 카드</strong>
                    <span class="txt_total"><em>{{cdOpCn}}</em>개</span>
                </div>
                <template v-if="cdOpCn > 0">
                    <div class="com_box_type01 toggle_list_box2" v-for="(hldCd, idx) in hldCdBrk" :key="'ovd_'+idx">
                        <div data-ui-toggle="box" class="toggle_top_box">
                            <button type="button" class="view_btn" aria-expanded="false">
                                <dl>
                                    <dt>
                                        <em>{{hldCd.fncorgNm}}</em>
                                    </dt>
                                    <dd>
                                        <span class="total_price">
                                            <em class="num">{{hldCd.cdUsAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <em class="open">열기</em>
                                <em class="close">닫기</em>
                            </button>
                        </div>
                        <ul class="list_type_02 toggle_list_type_01">
                            <li>
                                <dl>
                                    <dt>
                                        <em>신용 일시불 이용금액</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{hldCd.ocepayUsAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>신용 할부 이용금액</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{hldCd.istUsAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>현금서비스 이용금액</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{hldCd.chsvAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>체크카드 이용금액</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{hldCd.chkCdUsAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>연체금액</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{hldCd.cdOvdAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>총 이용금액</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{hldCd.cdUsAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>총 한도</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{hldCd.cdTotLmtAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>현금서비스 한도</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{hldCd.chsvLmtAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>개설일</em>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <template v-if="hldCd.mydtOpDt != null && hldCd.mydtOpDt != ''">
                                                <em class="num">{{hldCd.mydtOpDt | dateFilter('YYYY.MM.DD')}}</em>
                                            </template>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <p class="dot_msg mt18">
                        코리아크레딧뷰로(KCB)에서 제공하는 정보이며,
                        KCB 데이터 산정일 및 기준금액의 차이로 실제 금융정보와 다를 수 있습니다.
                    </p>
                </template>
                <!-- 검색결과 없을경우 S -->
                <template v-if="cdOpCn == 0">
                    <div class="no_data_box">
                        <div class="no_data_list">
                            <p>보유 카드가 없습니다.</p>
                        </div>
                    </div>
                </template>
                <!--// 검색결과 없을경우 E -->
            </div>
        </div>
        <!-- 카드내역 E -->
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    // import {amountCountAnimate} from '@/utils/jUtils'
    
    import ASCR1109 from '@/views/page/AS/CR/ASCR1109/ASCR1109'
    import ASCR1110 from '@/views/page/AS/CR/ASCR1110/ASCR1110'
    import ASCR1111 from '@/views/page/AS/CR/ASCR1111/ASCR1111'

    export default {
        name : "ASCR1104",
        data: () => {
            return {
                selectedYm        : "",
                tabPgLogList      : [],
                tabPgflag         : "",

                // 연체내역
                ovdBac        : 0,  // 연체잔액
                ovdCn         : 0,  // 연체건수
                ovdBrk        : [], // 연체내역 목록

                // 대출내역
                lnBac         : 0,  // 대출잔액
                lnOpCn        : 0,  // 대출개설건수
                loanBrk       : [], // 대출내역 목록

                // 카드내역
                totLmtAm      : 0,  // 총한도금액
                totalChsvUsAm : 0,  // 총현금서비스이용금액
                totUsAm       : 0,  // 총이용금액
                cdOpCn        : 0,  // 카드개설수
                totLmtXhtrt   : 0,  // 총한도소진율
                inqMm         : "", // 조회월
                hldCdBrk      : []  // 카드내역 목록
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                this.selectedYm = new Date();
                this.tabPgflag  = param.tabPg || this.tabPgflag;

                this.getData();
            },
            getData() {
                let tabPgUrl = "";
                if (this.tabPgflag == '1') {
                    tabPgUrl = "/as/cr/04r01"; // 연체내역
                } else if (this.tabPgflag == '2') {
                    tabPgUrl = "/as/cr/05r01"; // 대출내역
                } else {
                    tabPgUrl = "/as/cr/06r01"; // 카드내역
                }

                const config = {
                    url  : tabPgUrl,
					data : {
                        mydtCusno : this.getUserInfo('mydtCusno') // 고객번호
                    }
                };

                apiService.call(config).then(response => {
                    // 연체내역
                    if (this.tabPgflag == '1') {
                        this.ovdBac  = response.ovdBac;
                        this.ovdCn   = response.ovdCn;
                        this.ovdBrk  = response.ovdBrk || [];
                    }
                    // 대출내역
                    else if (this.tabPgflag == '2') {
                        this.lnBac   = response.lnBac;
                        this.lnOpCn  = response.lnOpCn;
                        this.loanBrk = response.loanBrk || [];
                    }
                    // 카드내역
                    else {
                        this.totLmtAm      = response.totLmtAm;
                        this.totalChsvUsAm = response.totalChsvUsAm;
                        this.totUsAm       = response.totUsAm;
                        this.cdOpCn        = response.cdOpCn;
                        this.totLmtXhtrt   = response.totLmtXhtrt;
                        this.inqMm         = response.inqMm;
                        this.hldCdBrk      = response.hldCdBrk || [];
                    }

                    // 금액 Animate 처리 함수 호출
                    // amountCountAnimate("ovdBac" , this.ovdBac );
                    // amountCountAnimate("lnBac"  , this.lnBac  );
                    // amountCountAnimate("totUsAm", this.totUsAm);

                    this.$nextTick(() => {
                        this.callJQueryFncExcute()
                    })
                });
            },
            fn_setTabPgflag(gbn) {
                if (this.tabPgflag != gbn) {
                    this.tabPgLogList.push({"tabPg" : this.tabPgflag});
                }

                this.tabPgflag = gbn;
                this.getData();
            },
            fn_moveBack() {
                if (this.tabPgLogList.length > 0) {
                    this.tabPgflag = this.tabPgLogList[this.tabPgLogList.length-1].tabPg;
                    this.tabPgLogList.pop();
                    this.getData();
                } else {
                    this.close(true);
                }
            },
            // 도움말 슬라이드팝업 오픈
            fn_showInfo() {
                let compName = "";
                if (this.tabPgflag == '1') {
                    compName = ASCR1109; // 연체잔액 도움말
                } else if (this.tabPgflag == '2') {
                    compName = ASCR1110; // 대출잔액 도움말
                } else {
                    compName = ASCR1111; // 현금서비스 도움말
                }

                const config = {
                    renderer : {
                        component : compName
                    }
                }
                modalService.openSlidePagePopup(config);
            }
        }
    }
</script>