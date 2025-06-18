<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역
* @ 페이지설명 : 지출 > 지출내역 메인
* @ 파일명     : src/views/page/LC/LE/LCLE2001/LCLE2001.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533571              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view mydata2023">
        <LcCategoryV2 type="LCLE"></LcCategoryV2>

        <div id="content" class="sub_main renewal expenditure_details">
            <div class="com_inner top_area">
                <div class="select_date">
                    <button class="cal_btn cal_prev" aria-label="한달 전 이동" @click.prevent="moveMonth('PREV')" style="padding:1px 6px;"></button>
                    <a title="년월선택" class="year_month" href="javascript:console.log('월');" @click.prevent="selectMonth"><span class="num">{{inqYm | dateFilter('YYYY')}}</span>년 <span class="num">{{inqYm | dateFilter('M')}}</span>월 </a>
                    <button class="cal_btn cal_next" :class="disabledButton" aria-label="한달 후 이동" @click.prevent="moveMonth('NEXT')" :disabled="currYm===inqYm" :title="currYm===inqYm ? '선택불가' : ''" style="padding:1px 6px;"></button>
                </div>
                
                <div class="new_sub_info" v-if="totListCn > 0">
                    <div class="text">
                        <strong><span class="num">{{xpsTotAmt|numberFilter}}</span>원</strong>
                    </div>
                </div>

                <div class="link_area" v-if="totListCn > 0 && topXpsCtgrC">
                    <i :class="topXpsCtgrC"><span class="blind">{{topXpsCtgrCNm}}</span></i>
                    <a href="javascript:void(0);" @click.prevent="fn_movePage('LCIP4001')">{{topXpsCtgrCNm}}에 가장 많이 썼어요</a>
                </div>
            </div>

            <hr class="hr02">

            <div class="com_inner">
                <div v-if="cardCn > 0" class="com_box_type01 toggle_list_box2 custom_list">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>카드 </span><span class="com_icon_num custom">{{cardCn}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{cardApvSam | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                        <div class="expenditure_info">
                            <div class="text">
                                <p v-html="getComparedStr(comparedCardSam)"></p>
                            </div>
                            <div class="chart_img" :class="getComparedClass(comparedCardSam)"></div>
                        </div>
                    </div>
                    <ul v-if="cardList.length > 0" class="view_cont list_type_01">
                        <li v-for="(item,index) in cardList" :key="'card_' + index">
                            <a @click.prevent="openCardDetail(item)" href="javascript:void(0);" role="button">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                            <em class="prod_name">{{item.cdcoCdWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.cdUgUsAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>

                <div v-else class="com_box_type01">
                    <div class="com_box_inner">
                        <p class="title">카드</p>

                        <div class="expenditure_info">
                            <div class="text">
                                <p>
                                    카드 내역 확인하고<br> 
                                    지출 관리 하세요
                                </p>
                            </div>
                            <div class="card_img"></div>
                        </div>

                        <div class="card_link_btn">
                            <a href="javascript:void(0);" role="button" class="com_btn_more" @click.prevent="openCardConnect">카드 연결</a>
                        </div>
                    </div>
                </div>

                <div v-if="(payMnyCn + ppayCdCn) > 0" class="com_box_type01 toggle_list_box2 custom_list">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>페이 </span><span class="com_icon_num custom">{{payMnyCn + ppayCdCn}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{(payMnySam + ppayCdApvSam) | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                        <div class="expenditure_info">
                            <div class="text">
                                <p v-html="getComparedStr(comparedPaySam)"></p>
                            </div>
                            <div class="chart_img" :class="getComparedClass(comparedPaySam)"></div>
                        </div>
                    </div>
                    <div class="view_cont link_banner_type">
                        <ul class="list_type_01" v-if="(payMnyList.length + ppayCdList.length) > 0">
                            <template v-if="payMnyList.length > 0">
                                <li v-for="(item, index) in payMnyList" :key="'payMny_' + index">
                                    <a @click.prevent="openPayMnyDetail(item)" href="javascript:void(0);" role="button">
                                        <dl>
                                            <dt>
                                                <div>
                                                    <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                                    <em class="prod_name">{{item.faceOnm}}</em>
                                                </div>
                                            </dt>
                                            <dd>
                                                <span class="com_price">
                                                    <em class="num">{{item.ppayTram | numberFilter}}</em><em class="unit">원</em>
                                                </span>
                                            </dd> 
                                        </dl>
                                    </a>
                                </li>
                            </template>
                            <template v-if="ppayCdList.length > 0">
                                <li v-for="(item, index) in ppayCdList" :key="'ppayCd_' + index">
                                    <a  @click.prevent="openPpayCdDetail(item)" href="javascript:void(0);" role="button">
                                        <dl>
                                            <dt>
                                                <div>
                                                    <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                                    <em class="prod_name">{{item.cdcoCdWrsnm}}</em>
                                                </div>
                                            </dt>
                                            <dd>
                                                <span class="com_price">
                                                    <em class="num">{{item.cdUgUsAm | numberFilter}}</em><em class="unit">원</em>
                                                </span>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>
                            </template>
                        </ul>

                        <div v-if="ppayList.length > 0" class="gray_box_m">
                            <a @click.prevent="openPpayDetail()" href="javascript:void(0);" class="link_arrow">선불 결제내역을 확인해 보세요</a>
                        </div>
                    </div>
                </div>

                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="chsvCn > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>현금 </span><span class="com_icon_num custom"></span></div>
                                <span class="total_price">
                                    <em class="num">{{schXpsSam | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                        <div class="expenditure_info">
                            <div class="text">
                                <p v-html="getComparedStr(comparedCashSam)"></p>
                            </div>
                            <div class="chart_img" :class="getComparedClass(comparedCashSam)"></div>
                        </div>
                    </div>
                    <ul v-if="chsvList.length > 0" class="view_cont list_type_01">
                        <li v-for="(item, index) in chsvList" :key="'cash_' + index">
                            <a @click.prevent="openCashDetail(item)" href="javascript:void(0);" role="button">
                                <dl>
                                    <dt>
                                        <div>
                                            <i class="icon_money"></i>
                                            <em v-if="item.chsvKdnm == '이체'" class="prod_name">계좌 이체로 쓴 금액</em>
                                            <em v-if="item.chsvKdnm == '현금'" class="prod_name">직접 등록한 지출 금액</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.tram | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>

                <div v-if="rqsCn > 0" class="com_box_type01 communication_price">
                    <div class="new_tit_area">
                        <div class="tit">
                            <span>통신비 청구금액</span>
                            <div class="custom_tooltip">
                                <div class="com_tooltip_type02 com_tooltip_type03">
                                    <a href="javascript:void(0);" class="com_btn_info" role="button">
                                        <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                    </a>
                                    <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                        <div>
                                            <p>
                                                통신비 청구금액은 결제 예정금액으로 현재
                                                총지출 금액에는 포함되지 않으며 결제일
                                                이후에 카드/페이/현금 결제 내역에서 확인 
                                                가능합니다.
                                            </p>
                                            <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a @click.prevent="moveMobilePay()" href="javascript:void(0);" role="button" class="link_btn">
                            <span class="total_price">
                                <em class="num">{{rqsSam | numberFilter}}</em><em class="unit">원</em>
                            </span>
                        </a>
                    </div>	
                    

                    <ul v-if="modifiedRqsList.length > 0" class="list_type_01">
                        <li v-for="item in modifiedRqsList" :key="'rqsOrg_' + item.infOfrmnOrgC">
                            <dl>
                                <dt>
                                    <div>
                                        <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                        <em class="prod_name">{{item.infOfrmnOrgCNm}}</em>
                                    </div>
                                </dt>
                                <dd>
                                    <span class="com_price">
                                        <em class="num">{{item.comuRqsAmSum | numberFilter}}</em><em class="unit">원</em>
                                    </span>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>

                <div v-if="totListCnWithRqs == 0" class="no_data_box no_data_box01 grayExclamationType">
                    <div class="no_data_list">
                        <p class="txt_sub">조회된 정보가 없습니다.</p>
                    </div>
                </div>		

                <div class="subSvcBannerArea fixType">
                    <div class="com_box_type01 bannerCard expd">
                        <a @click.prevent="openFixXps()" href="javascript:void(0);">
                            <p>매월 이만큼 써요</p>
                            <strong>정기지출</strong>
                        </a>
                    </div>
                    <div class="com_box_type01 bannerCard taxf">
                        <a @click.prevent="fn_movePage('LCIP4001')" href="javascript:void(0);">
                            <p>이번달 내 소비는?</p>
                            <strong>지출분석</strong>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <footersV2 type="lc" />
    </page>
</template>

<script>
import apiService from '@/service/apiService'
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import LcCategoryV2 from '@/components/category/LcCategoryV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import {numberFormat} from '@/utils/number'
import {dateFormat, monthAdd} from '@/utils/date'
import commonService from '@/service/commonService'
import _ from 'lodash'

import LCLE4104 from '@/views/page/LC/LE/LCLE4104/LCLE4104'
import LCLE2114 from '@/views/page/LC/LE/LCLE2114/LCLE2114'
import LCLE2107 from '@/views/page/LC/LE/LCLE2107/LCLE2107'
import LCLE4002 from '@/views/page/LC/LE/LCLE4002/LCLE4002'
import LCLE4003 from '@/views/page/LC/LE/LCLE4003/LCLE4003'
import LCLE4004 from '@/views/page/LC/LE/LCLE4004/LCLE4004'
import PDMY4005 from '@/views/page/PD/MY/PDMY4005/PDMY4005'
import LCIP2007 from '@/views/page/LC/IP/LCIP2007/LCIP2007'
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'

export default {
    name : "LCLE2001",
    data: () => {
        return {
            mydtCusno		: "",		// 마이데이터고객번호
            inqYm			: "",		// 조회년월
            xpsTotAmt		: 0,		// 지출총합계(카드+페이머니+기타), 선불지출제외
            topXpsCtgrC     : 0,        // 최고지출카테고리코드
            topXpsCtgrCNm   : 0,        // 최고지출카테고리코드명
            cardApvSam		: 0,		// 카드승인금액합계
            bmmCardApvSam	: 0,		// 전월카드승인금액합계
            schXpsSam		: 0,		// 현금지출금액합계
            bmmSchXpsSam	: 0,		// 전월현금지출금액합계
            ppayXpsSam		: 0,		// 선불지출금액합계
            payMnySam		: 0,		// 페이머니금액합계
            bmmPayMnySam	: 0,		// 전월페이머니금액합계
            ppayCdApvSam    : 0,    	// 선불카드승인금액합계
            bmmPpayCdApvSam : 0,    	// 전월선불카드승인금액합계
            rqsSam			: 0,		// 통신요금청구금액합계
            xpsObtAm		: 0,		// 지출목표금액
            cardCn			: 0,		// 카드목록건수
            chsvCn			: 0,		// 현금목록건수
            ppayCn			: 0,		// 선불목록건수
            payMnyCn		: 0,		// 페이머니목록건수
            ctgrCn			: 0,    	// 카테고리별지출목록건수
            ppayCdCn        : 0,		// 선불카드목록건수
            rqsCn			: 0,		// 통신청구목록건수
            currYm			: "",		// 현재년월(조회년월과 비교용도)
            totListCn       : 0,        // 목록 총개수(카드, 페이(페이머니, 선불카드), 현금(이체, 수기))
            totListCnWithRqs: 0,        // 통신비 포함 목록 총개수

            // 각 목록 정렬기준
            // 카드 : 카드명, 기타 : 이체 -> 현금 순서, 페이머니 : 권면명칭, 선불결제 : 페이명
            cardList		: [],		// 카드목록
            chsvList		: [],   	// 현금목록
            ppayList		: [],   	// 선불목록
            payMnyList		: [],		// 페이머니목록
            ctgrList		: [],		// 카테고리별지출목록
            ppayCdList      : [],   	// 선불카드목록
            rqsList			: [],		// 통신청구목록
            modifiedRqsList : [],		// 기관별로 묶은 통신청구목록

            isClicked       : false,	// 툴팁 클릭여부
        }
    },
    computed : {
        comparedCardSam() {
            return this.cardApvSam - this.bmmCardApvSam;
        },
        comparedPaySam() {
            return this.payMnySam + this.ppayCdApvSam - this.bmmPayMnySam - this.bmmPpayCdApvSam;
        },
        comparedCashSam() {
            return this.schXpsSam - this.bmmSchXpsSam;
        },
        noData() {
            return (this.cardCn > 0 || this.payMnyCn > 0 || this.chsvCn > 0 || this.ppayCn > 0 || this.ctgrCn > 0 || this.ppayCdCn)?"com_bg_type00":"com_bg_type02"
        },
        barPct() {
            return (this.xpsTotAmt / this.xpsObtAm) * 100 < 100 ? (this.xpsTotAmt / this.xpsObtAm) * 100 : 100
        },
        disabledButton() {
            return this.currYm == this.inqYm ? 'disabled' : ''
        },
        
    },
    created() {
        this.initComponent()
    },
    mounted() {
        this.getData();
        dateFormat()

        // 자산수집 mutation 이벤트 감지 
        this.getGatheringListenSubscribe()
                
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin
    ],
    methods: {
        initComponent() {
            this.mydtCusno  = this.getUserInfo('mydtCusno')
            this.currYm     = dateFormat(new Date(), 'YYYYMM')
            this.inqYm      = dateFormat(new Date(), 'YYYYMM')      // 조회년월(초기세팅은 현재년월)
        },
        getData() {
            // 지출현황 통합정보 조회
            const config = {
                url : '/lc/le/01r02',
                data : {
                    mydtCusno	: this.mydtCusno,	// 마이데이터고객번호
                    inqYm 		: this.inqYm        // 조회년월
                }
            }
            apiService.call(config).then(response => {
                console.log(response)
                this.mydtCusno 		= response.mydtCusno || ''
                this.inqYm 			= response.inqYm || ''
                this.xpsTotAmt 		= response.xpsTotAmt || 0
                this.topXpsCtgrC    = response.topXpsCtgrC || '';
                this.topXpsCtgrCNm  = response.topXpsCtgrCNm || '';
                this.cardApvSam		= response.cardApvSam || 0
                this.bmmCardApvSam	= response.bmmCardApvSam || 0
                this.schXpsSam 		= response.schXpsSam || 0
                this.bmmSchXpsSam 	= response.bmmSchXpsSam || 0
                this.ppayXpsSam 	= response.ppayXpsSam || 0
                this.payMnySam  	= response.payMnySam || 0
                this.bmmPayMnySam  	= response.bmmPayMnySam || 0
                this.xpsObtAm   	= response.xpsObtAm || 0
                this.ppayCdApvSam 	= response.ppayCdApvSam || 0
                this.bmmPpayCdApvSam = response.bmmPpayCdApvSam || 0
                this.rqsSam			= response.rqsSam || 0

                this.cardCn 		= response.cardCn || 0
                this.chsvCn 		= response.chsvCn || 0
                this.ppayCn 		= response.ppayCn || 0
                this.payMnyCn 		= response.payMnyCn || 0
                this.ctgrCn     	= response.ctgrCn || 0
                this.ppayCdCn   	= response.ppayCdCn || 0
                this.rqsCn			= response.rqsCn || 0

                this.cardList 		= response.cardList || []
                this.chsvList 		= response.chsvList	|| []
                this.ppayList 		= response.ppayList || []
                this.payMnyList 	= response.payMnyList || []
                this.ctgrList   	= response.ctgrList || []
                this.ppayCdList		= response.ppayCdList || []
                this.rqsList        = response.rqsList || []
                // 기관별로 묶음
                this.modifiedRqsList = this.modifyRqsList(this.rqsList)

                this.totListCn = this.cardCn + this.payMnyCn + this.chsvCn + this.ppayCdCn
                this.totListCnWithRqs = this.totListCn + this.rqsCn

                this.callJQueryFncExcute()
            })
        },

        // 기관별로 묶기
        modifyRqsList(objArray){
            let list = objArray || []
            let result = _.chain(list)
                .uniqBy('infOfrmnOrgC')
                .map(d => {
                    return {
                        infOfrmnOrgC 	: d.infOfrmnOrgC,
                        infOfrmnOrgCNm  : d.infOfrmnOrgCNm,
                        comuRqsAmSum    : _.sumBy(_.filter(list, {infOfrmnOrgC : d.infOfrmnOrgC}), d2 => {return d2.comuRqsAm}),
                        list         	: _.filter(list, {infOfrmnOrgC : d.infOfrmnOrgC})
                    }
                })
                // .orderBy('infOfrmnOrgCNm', 'asc')
                .value()
            return result
        },
        
        selectMonth(){
            const config = {
                params: {
                    title  : '조회년월 선택',
                    yyyymm : this.inqYm,
                    limit  : 60,
                },
            }
            modalService.openSlideSelectMonth(config).then(response => {
                this.inqYm = dateFormat(response, 'YYYYMM')
                this.getData();
            })
        },

        moveMonth(flag){
            let add = (flag == 'PREV') ? -1 : 1
            this.inqYm = monthAdd(add, this.inqYm, "YYYYMM")
            this.getData()
        },
        
        // mydtCusno, inqYm 만 있으면 전체, 나머지 값들이 들어가면 해당하는 목록만 조회함
        // 전체조회는 필수입력값만 들어가면 됨, obj가 ALL이면 선택입력값은 빈값, 아니면 obj안의 해당값
        openCardDetail(obj){
            const config = {
                component: LCLE4002,
                params : {
                    mydtCusno		: this.mydtCusno,
                    inqYm 			: this.inqYm,
                    infOfrmnOrgC	: (obj==="ALL")?'':obj.infOfrmnOrgC,
                    mydtCdId		: (obj==="ALL")?'':obj.mydtCdId,
                    cdcoCdWrsnm		: (obj==="ALL")?'전체카드':obj.cdcoCdWrsnm,
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData();
            })
        },

        openPayMnyDetail(obj) {
            const config = {
                component : LCLE4003,
                params : {
                    mydtCusno		: this.mydtCusno,
                    inqYm 			: this.inqYm,
                    infOfrmnOrgC	: (obj==="ALL")?'':obj.infOfrmnOrgC,
                    faceNo			: (obj==="ALL")?'':obj.faceNo,
                    faceOnm         : (obj==="ALL")?'':obj.faceOnm,
                    accIdVal        : (obj==="ALL")?'':obj.accIdVal || '',
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData();
            })

        },

        openPpayDetail() {
            const config = {
                component : LCLE2114,
                params : {
                    mydtCusno		: this.mydtCusno,
                    inqYm 			: this.inqYm,
                    // 선불결제목록 첫번째 항목으로 호출, 없으면 빈값
                    infOfrmnOrgC	: this.ppayList[0].infOfrmnOrgC || '',
                    infOfrmnOrgCNm	: this.ppayList[0].infOfrmnOrgCNm || '',
                    tfrTrkyVal		: this.ppayList[0].tfrTrkyVal && this.ppayList[0].tfrTrkyVal !== 'NA' ? this.ppayList[0].tfrTrkyVal : '',
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData();
            })
        },

        // 선불카드 상세 오픈
        openPpayCdDetail(obj) {
            const config = {
                component : LCLE4004,
                params : {
                    mydtCusno		: this.mydtCusno,
                    inqYm 			: this.inqYm,
                    infOfrmnOrgC	: (obj==="ALL")?'':obj.infOfrmnOrgC,
                    cdcoCdWrsnm		: (obj==="ALL")?'':obj.cdcoCdWrsnm,
                    mydtCdId		: (obj==="ALL")?'':obj.mydtCdId,
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData();
            })
        },

        openCashDetail(obj) {
            let inqDsc = ''
            if(obj.chsvKdnm == '이체') {
                inqDsc = 'F'
            }else if(obj.chsvKdnm == '현금') {
                inqDsc = 'C'
            }

            const config = {
                component : LCLE4104,
                params : {
                    mydtCusno		: this.mydtCusno,
                    inqYm 			: this.inqYm,
                    inqDsc
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData();
            })
        },

        openFixXps() {
            const config = {
                component : LCIP2007
            }
            console.log(config)
            
            modalService.openPopup(config).then(() => {
                this.getData();
            })
        },

        openCardConnect() {
            const config = {
                component : COAR2002,
                params : {
                    isExternal: true,
                    orgDsc: 'card'
                }
            }
            console.log(config)
            
            modalService.openPopup(config).then(() => {
                this.getData();
            })
        },

        fn_movePage(pageId) {
            const config = {
                name: pageId
            }
            commonService.movePage(config)
        },

        setTooltip() {
            this.isClicked = !this.isClicked
        },

        moveMobilePay(){
            const config = {
                component: LCLE2107,
                params : {
                    mydtCusno	: this.mydtCusno,
                    inqYm		: this.inqYm,
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData();
            })
        },

        fn_openExpensePop() {
            const config = {
                component : PDMY4005,
            }
            modalService.openPopup(config).then(response => {
                //this.getData();
                // 배너이미지를 통하여 목표등록을 하였을 경우
                if(response == 'reSelect') {
                    const menu = {
                        // name: 'PDMY4001',
                        name: 'PDMY4001',
                        params : {}
                    }
                    commonService.movePage(menu)
                }
            })
        },

        getString(num1, num2) {
            // 현재년월과 지난년월 서술어 구분(썻어요, 쓰고 있어요)
            let predicate = "쓰고 있어요.";
            if(this.currYm !== this.inqYm) {
                predicate = "썻어요."
            }

            // 조회월의 지난달 지출이 조회월 지출보다 많은 경우
            if(num1 > num2) {
                return numberFormat(num1 - num2) + "원을 더 " + predicate;	
            }
            // 조회월의 지난달 지출이 조회월 지출보다 적은 경우
            else if(num2 > num1) {
                return numberFormat(num2 - num1) + "원을 덜 " + predicate;
            }
            // 같은 경우
            else return "원을 " + predicate;
        },
        getComparedStr(compared) {
            let text = "";
            if(compared == 0) {
                text = "지난달 총지출과<br>같아요";
            }else if(compared > 0) {
                text = "지난달 총지출 보다<br> <span class='num'>" + numberFormat(compared) + "</span>원 많이 썼어요";
            }else{
                text = "지난달 총지출 보다<br> <span class='num'>" + numberFormat(compared * -1) + "</span>원 적게 썼어요";
            }
            return text;
        },
        getComparedClass(compared) {
            if(compared > 0) {
                return 'up'
            }else if(compared < 0) {
                return 'down'
            }
            return ''
        }

    },
    components : {
        Page,
        FootersV2,
        LcCategoryV2
    }
}

</script>