<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 수단별 지출내역
* @ 페이지설명 : 지출 > 지출내역 > 수단별(카드, 페이머니, 선불카드) 지출내역 목록
* @ 파일명     : src/components/LC/LE/CMM/CmmXpsDetail.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-14              CS533571              최초작성
***************************************************************************/
-->
<template>
    <!-- full popup S -->
    <div class="full_popup mydata2023" id="full_popup_01"> 
        <div class="popup_header">    
            <h1 v-if="type == TYPE_CARD">카드 지출내역</h1>
            <h1 v-else-if="type == TYPE_PAY">페이 지출내역</h1>
        </div>
        <div class="popup_content com_no_bottom list_top_info_area com_bg_type00">
            <div class="com_inner">
                <div v-if="type == TYPE_PAY" class="com_tabmenu_type03 switchType btn2">
                    <ul>
                        <li :class="{on: subtype == SUBTYPE_PAYMONEY}" role="presentation" aria-controls="tab_01"><a @click.prevent="openPayMnyDetail" href="javascript:void(0);" role="tab"><span>페이머니</span></a></li>
                        <li :class="{on: subtype == SUBTYPE_PPAYCARD}" role="presentation" aria-controls="tab_02"><a @click.prevent="openPpayCdDetail" href="javascript:void(0);" role="tab"><span>선불카드</span></a></li>
                    </ul>
                </div>

                <div class="top_info_box_wrap" :class="{mt30: type == TYPE_PAY}">
                    <div class="top_btn"><p class="depth"></p><a href="javascript:void(0);" @click.prevent="openSelectSlidePop()" ref="name"></a></div>
                    <div class="shadow"></div>
                    <div class="top_info_box type02 noBG" :class="hasDetail">
                        <div v-if="type != TYPE_PAY" class="card_float_img">
                            <i :class="'ico-card-' + infOfrmnOrgC"><span class="blind">{{infOfrmnOrgCNm}}</span></i>
                        </div>

                        <div class="select_date_wrap">
                            <div class="date_inner">
                                <div class="select_date">
                                    <button class="cal_btn cal_prev" aria-label="한달 전 이동" @click.prevent="moveMonth('PREV')" style="padding:1px 6px;"></button>
                                    <a title="년월선택" class="year_month" href="javascript:console.log('월');" @click.prevent="selectMonth"><span class="num">{{inqYm | dateFilter('YYYY')}}</span>년 <span class="num">{{inqYm | dateFilter('M')}}</span>월 </a>
                                    <button class="cal_btn cal_next" :class="disabledButton" aria-label="한달 후 이동"  @click.prevent="moveMonth('NEXT')" :disabled="currYm===inqYm" style="padding:1px 6px;"></button>
                                </div>
                                <div class="bill">
                                    <span class="num">{{sam | numberFilter}}</span>원
                                </div>
                            </div>
                        </div>

                        <!-- 전체카드 선택하거나, 지출내역이 없으면 토글영역 비활성화 -->
                        <div class="box_toggle_wrap" v-if="type == TYPE_CARD && (infOfrmnOrgC != '' && modifiedList.length > 0)">
                            <div class="box_toggle">
                                <div class="toggle-box">
                                    <div data-ui-toggle="box" class="close">									
                                        <div class="view-box">
                                            <div class="info">
                                                <div class="title">카드 번호</div>
                                                <div class="num">{{cdcoCdNo}}</div>
                                            </div>
                                            <div class="info">
                                                <div class="title">카드 구분</div>
                                                <div class="text">{{colCdDscNm}}</div>
                                            </div>
                                            <div class="info">
                                                <div class="title">교통 기능</div>
                                                <div class="text">{{trafFcltYn == false ? 'N' : 'Y'}}</div>
                                            </div>
                                            <div class="info">
                                                <div class="title">현금카드 기능</div>
                                                <div class="text">{{cshcdFcltYn == false ? 'N' : 'Y'}}</div>
                                            </div>
                                            <div class="info" v-if="stlBnkOrgCNm">
                                                <div class="title">결제은행</div>
                                                <div class="text">{{stlBnkOrgCNm}}</div>
                                            </div>
                                            <div class="info" v-if="mydtStlAcno">
                                                <div class="title">결제계좌번호</div>
                                                <div class="text">{{mydtStlAcno}}</div>
                                            </div>
                                            <div class="info">
                                                <div class="title">국제브랜드</div>
                                                <div class="text">{{cdBranCNm}}</div>
                                            </div>
                                            <div class="info" v-if="wrsAmbfe > 0">
                                                <div class="title">연회비</div>
                                                <div class="text">{{wrsAmbfe | numberFilter}}원</div>
                                            </div>
                                            <div class="info">
                                                <div class="title">발급일자</div>
                                                <div class="num">{{isuDt | dateFilter('YYYY.MM.DD')}}</div>
                                            </div>
                                        </div>
                                        <button type="button" class="view-btn" aria-expanded="false">
                                            <em class="open">열기</em><em class="close">닫기</em>
                                        </button>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>

            <!-- 230727 전체 필터 추가 -->
            <div class="com_inner">
                <div class="all_filter">
                    <a href="javascript:void(0);" role="button" @click.prevent="openSearchSlidePop()">{{srchCndStr}}</a>
                </div>	
            </div>
            <!-- //230727 전체 필터 추가 -->

            <ul class="list_more_box" v-if="modifiedList.length > 0">
                <li v-for="item in modifiedList" :key="item.dtForList">
                    <div class="com_inner">
                        <div class="new_tit_area">
                            <div class="tit"><em>{{item.dtForList | dateFilter('D')}}</em><span>일({{item.dowForList}})</span></div>
                        </div>
                        <ul class="list_type_01">
                            <li v-for="(listObj, index) in item.list" :key="item.dtForList + '_' + index" :class="{'item_cancel': listObj.stlStsc == '02' || listObj.eltFncPpayTrTpc == '5502'}">
                                <a href="javascript:void(0);" @click.prevent="openInfoSlidePop(listObj)">
                                    <dl>
                                        <dt>
                                            <div>
                                                <i :class="listObj.asetAmnCtgrId"><span class="blind">{{listObj.asetAmnCtgrIdNm}}</span></i>
                                                <em v-if="listObj.prcMchtnm">{{listObj.prcMchtnm}}</em>

                                                <span>
                                                    <template v-if="type == TYPE_CARD || (type == TYPE_PAY && subtype == SUBTYPE_PPAYCARD)">
                                                        <span v-if="listObj.stlStscNm == ''">{{listObj.cdcoCdWrsnm}}</span>
                                                        <span v-else>
                                                            <span>{{listObj.cdcoCdWrsnm}}</span>
                                                            <!-- <span class="common_bar"></span> -->
                                                            <span>{{listObj.stlStscNm}}</span>
                                                        </span>
                                                    </template>
                                                    <template v-else-if="type == TYPE_PAY && subtype == SUBTYPE_PAYMONEY">
                                                        <span>{{listObj.faceOnm}}</span>
                                                        <!-- <span class="common_bar"></span> -->
                                                        <span v-if="listObj.accIdVal && listObj.accIdVal !== 'NA'">{{listObj.accIdVal}}</span>
                                                    </template>
                                                    
                                                </span>
                                            </div>
                                        </dt>

                                        <dd v-if="type == TYPE_CARD || (type == TYPE_PAY && subtype == SUBTYPE_PPAYCARD)">
                                            <span class="com_price">
                                                <em class="num">{{listObj.cdApvKrwAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                        <dd v-else-if="type == TYPE_PAY && subtype == SUBTYPE_PAYMONEY">
                                            <span class="com_price">
                                                <em class="num">{{listObj.ppayTram | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                            <span class="com_price">
                                                <span>{{listObj.eltFncPpayTrTpcNm}}</span>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="com_space_type01"></div>
                </li>
            </ul>
            
            <div v-else class="com_inner">
                <div class="no_data_box no_data_box01 grayExclamationType">
                    <div class="no_data_list">
                        <p class="txt_sub">조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </div>

            <div class="com_inner">
                <div class="com_btn_area"><a href="javascript:void(0);" class="com_btn_more" @click.prevent="showMoreList()" :style="noMoreList"><span>더보기</span></a></div><!-- 200727 .com_btn_area로 수정 -->
            </div>
        </div>
        <!--// 20210701 한별 클래스 com_space_bottom list_top_info_area com_bg_type00 더보기버튼 추가 리스트 수정 E -->
        <a href="javascript:void(0);" @click="closeAll()" class="btn_close"><span class="blind">팝업닫기</span></a>
    </div>
    <!--// full popup E -->
</template>
<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import {dateFormat, monthAdd} from '@/utils/date'
import {getDayDowCName} from '@/utils/date'
import LCLE2112 from '@/views/page/LC/LE/LCLE2112/LCLE2112'
import LCLE2119 from '@/views/page/LC/LE/LCLE2119/LCLE2119'
import LCLE2003 from '@/views/page/LC/LE/LCLE2003/LCLE2003'
import LCLE2004 from '@/views/page/LC/LE/LCLE2004/LCLE2004'
import LCLE2007 from '@/views/page/LC/LE/LCLE2007/LCLE2007'
import LCLE2008 from '@/views/page/LC/LE/LCLE2008/LCLE2008'
import LCLE2009 from '@/views/page/LC/LE/LCLE2009/LCLE2009'
import LCLE2010 from '@/views/page/LC/LE/LCLE2010/LCLE2010'
import LCLE2011 from '@/views/page/LC/LE/LCLE2011/LCLE2011'
import LCLE2012 from '@/views/page/LC/LE/LCLE2012/LCLE2012'
import _ from 'lodash'

const TYPE_CARD = 'CARD'                // 카드 지출내역
const TYPE_PAY = 'PAY'                  // 페이 지출내역
const SUBTYPE_PAYMONEY = 'PAYMONEY'     // 페이 - 페이머니 지출내역
const SUBTYPE_PPAYCARD = 'PPAYCARD'     // 페이 - 선불카드 지출내역

export default {
    name : "CmmXpsDetail",
    data: () => {
        return {
            TYPE_CARD,
            TYPE_PAY,
            SUBTYPE_PAYMONEY,
            SUBTYPE_PPAYCARD,
            mydtCusno		: "",       // 마이데이터고객번호
            inqYm			: "",       // 조회년월
            sam		: 0,                // 금액합계
            infOfrmnOrgC	: "",       // 정보제공자기관코드
            infOfrmnOrgCNm  : "",       // 정보제공자기관코드명
            mydtCdId		: "",       // 마이데이터카드식별자

            // 카드 세부정보 슬라이드
            cdcoCdNo		: "",       // 카드사카드번호
            cdcoCdWrsnm		: "",       // 카드사카드상품명
            colCdDsc		: "",       // 수집카드구분코드
            colCdDscNm		: "",       // 수집카드구분코드명
            trafFcltYn		: false,    // 교통기능여부
            cshcdFcltYn		: false,    // 현금카드기능여부
            stlBnkOrgC		: "",       // 결제은행기관코드
            stlBnkOrgCNm    : "",       // 결제은행기관코드명
            mydtStlAcno     : "",       // 결제계좌번호
            cdBranC			: "",       // 카드브랜드코드
            cdBranCNm		: "",       // 카드브랜드명브랜드명
            wrsAmbfe		: 0,        // 상품연회비
            isuDt			: "",       // 발급일자

            // 페이머니 사용
            faceNo          : "",       // 권면번호
            faceOnm         : "",       // 권명명칭(초기세팅용)
            accIdVal        : "",       // 계정식별값

            currYm			: "",       // 현재년월
            pageNo			: 1,        // 페이지넘버(서비스에서 페이징 처리하기로 해서 페이지 넘버로 보냄, 최초 1)
            nxDataYn		: "",       // 다음페이지 존재여부

            count			: 0,        // 목록건수
            list		: [],           // 목록
            modifiedList : [],          // 정정일자, 결제일자별 내림차순 정렬한 리스트

            type			: "",       // 지출내역 종류
            subtype		: "",           // 지출내역 하위종류

            // 조건검색 파라미터
            isSrch			: false,    // 조건검색 여부
            prcMchtnmCnd	: "",       // 가맹점명 검색조건
            cdTyCnd			: "",       // 카드종류 검색조건
            cdTyCndLabel    : "",       // 카드종류 검색조건 라벨
            amCnd			: "",       // 결제금액 검색조건
            amCndLabel		: "",       // 결제금액 검색조건 라벨
            stsCnd			: "",       // 거래상태 검색조건
            stsCndLabel		: "",       // 거래상태 검색조건 라벨

            isTabPopup      : false,    // 탭으로 팝업되었는지 여부

            paymoneyTabInfOfrmnOrgC : '',
            paymoneyTabFaceNo : '',
            paymoneyTabFaceOnm : '',
            paymoneyTabAccIdVal : '',

            ppaycardTabInfOfrmnOrgC : '',
            ppaycardTabCdcoCdWrsnm : '',
            ppaycardTabMydtCdId : ''
        }
    },
    props: {
        typeProp: {
            type: String,
            required: true
        },
        subtypeProp: {
            type: String,
            required: true
        },
        isSrchProp: {
            type: Boolean,
            default: false
        }
    },
    computed : {
        hasDetail() {
            // 농협 카드 선택한 경우 hasdetail 추가, 농협기관코드명은 더 있을 수 있음
            if(this.type == TYPE_CARD) {
                return (this.infOfrmnOrgC == "") ? "" : "hasdetail"
            } else {
                return ""
            }
        },
        noMoreList() {
            return (this.nxDataYn == 'Y')?"":"display : none"
        },
        disabledButton() {
            return this.currYm == this.inqYm ? 'disabled' : ''
        },
        // 전체선택 여부
        isAll() {
            return (this.infOfrmnOrgC == '')?true:false
        },
        fn_noShowNA() {
            return this.accIdVal && this.accIdVal !== 'NA' ? this.faceOnm + ' - ' + this.accIdVal : this.faceOnm
        },
        /**
         * 검색조건을 화면에 출력하기 위한 문자열
         */
        srchCndStr() {
            if(this.prcMchtnmCnd == '' && this.cdTyCnd == '' && this.amCnd == '' && this.stsCnd == '') {
                return '전체'

            }else{
                let strArr = []
                if(this.prcMchtnmCnd) {
                    strArr.push(this.prcMchtnmCnd)
                }

                if(this.cdTyCnd) {
                    strArr.push(this.cdTyCndLabel)
                }
                if(this.amCnd) {
                    strArr.push(this.amCndLabel)
                }
                if(this.stsCnd) {
                    strArr.push(this.stsCndLabel)
                }
                return strArr.join(' | ')
            }
        }
    },
    mounted() {
        this.initComponent(this.params)

        dateFormat()

        $(document).ready(function() {
            roundTabWidth()
        })
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent(param) {
            this.type = this.typeProp
            this.subtype = this.subtypeProp
            this.isSrch = this.isSrchProp

            this.currYm = this.currYm     = dateFormat(new Date(), 'YYYYMM')
            this.mydtCusno = param.mydtCusno || ''
            this.inqYm = param.inqYm || ''
            this.infOfrmnOrgC = param.infOfrmnOrgC || ''
            
            this.setCurrentMethod(param)

            // 탭 동작
            this.isTabPopup = param.isTabPopup || false

            this.paymoneyTabInfOfrmnOrgC = param.paymoneyTabInfOfrmnOrgC || ''
            this.paymoneyTabFaceNo = param.paymoneyTabFaceNo || ''
            this.paymoneyTabFaceOnm = param.paymoneyTabFaceOnm || ''
            this.paymoneyTabAccIdVal = param.paymoneyTabAccIdVal || ''

            this.ppaycardTabInfOfrmnOrgC = param.ppaycardTabInfOfrmnOrgC || ''
            this.ppaycardTabCdcoCdWrsnm = param.ppaycardTabCdcoCdWrsnm || ''
            this.ppaycardTabMydtCdId = param.ppaycardTabMydtCdId || ''

            this.getData();
        },
        setCurrentMethod(param) {
            switch(this.type) {
                case TYPE_CARD:
                    this.mydtCdId		= param.mydtCdId || ''
                    this.cdcoCdWrsnm	= param.cdcoCdWrsnm || ''
                    this.$refs.name.innerText = this.cdcoCdWrsnm
                    break

                case TYPE_PAY:
                    switch(this.subtype) {
                        case SUBTYPE_PAYMONEY:
                            this.faceNo         = param.faceNo || ''
                            this.faceOnm        = param.faceOnm || ''
                            this.accIdVal       = param.accIdVal && param.accIdVal !== 'NA' ? param.accIdVal : ''

                            // 페이목록에 전체 추가 분기
                            if(this.infOfrmnOrgC == ''){
                                this.$refs.name.innerText = "전체"
                            }else{
                                this.$refs.name.innerText = this.fn_noShowNA
                            }
                            break

                        case SUBTYPE_PPAYCARD:
                            this.cdcoCdWrsnm    = param.cdcoCdWrsnm || ''
                            this.mydtCdId       = param.mydtCdId || ''

                            // 페이목록에 전체 추가 분기
                            if(this.infOfrmnOrgC == ''){
                                this.$refs.name.innerText = "전체"
                            }else{
                                this.$refs.name.innerText = this.cdcoCdWrsnm
                            }
                            break
                    }
                    break
            }
        },
        getData() {
            // 최초조회
            const config = {
                url: this.getDataUrl(),
                data : this.getRequestData()
            }

            apiService.call(config).then(response => {
                this.assignData(response)

                this.callJQueryFncExcute()
            })
        },

        // 요청 파라미터
        getRequestData() {
            let data = {
                mydtCusno		: this.mydtCusno,
                inqYm			: this.inqYm,
                infOfrmnOrgC	: this.infOfrmnOrgC,
                pageNo			: this.pageNo
            }

            switch(this.type) {
                case TYPE_CARD:
                    data = Object.assign(data, {
                        mydtCdId		: this.mydtCdId,
                    })
                    break

                case TYPE_PAY:
                    switch(this.subtype) {
                        case SUBTYPE_PAYMONEY:
                            data = Object.assign(data, {
                                faceNo       : this.faceNo,
                                accIdVal     : this.accIdVal
                            })
                            break

                        case SUBTYPE_PPAYCARD:
                            Object.assign(data, {
                                mydtCdId		: this.mydtCdId
                            })
                            break
                    }
                    break
            }

            if(this.isSrch) {
                Object.assign(data, {
                    prcMchtnmCnd: this.prcMchtnmCnd
                })
                Object.assign(data, {
                    cdTyCnd: this.cdTyCnd
                })
                Object.assign(data, {
                    amCnd: this.amCnd
                })
                Object.assign(data, {
                    stsCnd: this.stsCnd
                })
            }

            return data
        },

        /**
         * 각 종류(카드,페이 등)에 따른 response의 값들을 data에 할당
         */
        assignData(obj) {
            this.mydtCusno		= obj.mydtCusno || ''
            this.inqYm			= obj.inqYm || ''
            this.nxDataYn		= obj.nxDataYn || 'N'
            
            // 종류별 변수할당
            switch(this.type) {
                // 카드일 경우
                case TYPE_CARD:
                    this.mydtCdIdVal	= obj.mydtCdIdVal || ''
                    this.cdcoCdNo		= obj.cdcoCdNo || ''
                    this.cdcoCdWrsnm	= obj.cdcoCdWrsnm || ''
                    this.colCdDsc		= obj.colCdDsc || ''
                    this.colCdDscNm		= obj.colCdDscNm || ''
                    this.trafFcltYn		= obj.trafFcltYn || ''
                    this.cshcdFcltYn	= obj.cshcdFcltYn || ''
                    this.stlBnkOrgC		= obj.stlBnkOrgC || ''
                    this.stlBnkOrgCNm	= obj.stlBnkOrgCNm || ''
                    this.mydtStlAcno    = obj.mydtStlAcno || ''
                    this.cdBranC		= obj.cdBranC || ''
                    this.cdBranCNm		= obj.cdBranCNm || ''
                    this.wrsAmbfe		= obj.wrsAmbfe || 0
                    this.isuDt			= obj.isuDt || ''
                    this.infOfrmnOrgC	= obj.infOfrmnOrgC || this.infOfrmnOrgC
                    this.infOfrmnOrgCNm	= obj.infOfrmnOrgCNm || ''
                    
                    this.sam		    = obj.cardApvSam || 0
                    this.count			= obj.cardCn || 0
                    this.list           = obj.cardList || []
                    break

                // 페이일 경우
                case TYPE_PAY:
                    switch(this.subtype) {
                        // 페이머니일 경우
                        case SUBTYPE_PAYMONEY:
                            this.sam       = obj.payMnySam || 0
                            this.count        = obj.payMnyCn || 0
                            this.list      = obj.payMnyList || []
                            break

                        // 선불카드일 경우
                        case SUBTYPE_PPAYCARD:
                            this.sam      = obj.cardApvSam || 0
                            this.count        = obj.ppayCdCn || 0
                            this.list      = obj.ppayCdList || []
                            break
                    }
                    break
            }

            this.modifiedList   = this.modifyList(this.list)
        },

        // 일자별 내림차순 정렬
        modifyList(objArray){
            // 정렬기준이 되는 필드(날짜와 요일) 새로 만들어 정렬
            // 정정이 있는 경우 정정일자와 요일, 그외엔 승인일자와 요일
            let list = []
            for(var i=0;i<objArray.length;i++){
                list.push(objArray[i])

                if(this.type == TYPE_CARD || (this.type == TYPE_PAY && this.subtype == SUBTYPE_PPAYCARD)) {
                    list[i].dtForList   = objArray[i].apvDt
                    list[i].dowForList  = getDayDowCName(objArray[i].apvDt)
                }else if(this.type == TYPE_PAY && this.subtype == SUBTYPE_PAYMONEY) {
                    list[i].dtForList   = objArray[i].trDt
                    list[i].dowForList  = getDayDowCName(objArray[i].trDt)
                }
            }
            let result = _.chain(list)
                .uniqBy('dtForList')
                .map(d => {
                    return {
                        dtForList   : d.dtForList,
                        dowForList  : d.dowForList,
                        list		: _.filter(list, {dtForList : d.dtForList})
                    }
                })
                .orderBy('dtForList', 'desc')
                .value()
            return result
        },
        
        // 조회년월 선택
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
                this.pageNo = 1
                this.getData();
            })
        },

        // 선택한 월로 이동
        moveMonth(flag){
            let add = (flag == 'PREV') ? -1 : 1
            this.inqYm = monthAdd(add, this.inqYm, "YYYYMM")
            this.pageNo = 1
            this.getData()
        },

        // 결제취소 여부
        isCanceled(item) {
            if(this.type == TYPE_CARD || (this.type == TYPE_PAY && this.subtype == SUBTYPE_PPAYCARD)) {
                if(item.stlStsc == '02') {
                    return true
                }
            } else if (this.type == TYPE_PAY && this.subtype == SUBTYPE_PAYMONEY) {
                const cVal = item.eltFncPpayTrTpc
                if(cVal == '5111' || cVal == '5112' || cVal == '5113' || cVal == '5114' 
                    || cVal == '5115' || cVal == '5119' || cVal == '5211' || cVal == '5212' 
                    || cVal == '5219' || cVal == '5302' || cVal == '5502') {
                    return true
                }
            }

            else false
        },

        // 페이머니 상세 팝업
        openPayMnyDetail() {
            if(this.subtype == SUBTYPE_PAYMONEY) {
                return
            }

            if(this.isTabPopup) {
                this.close({
                    ppaycardTabInfOfrmnOrgC : this.infOfrmnOrgC,
                    ppaycardTabCdcoCdWrsnm : this.cdcoCdWrsnm,
                    ppaycardTabMydtCdId : this.mydtCdId
                })
                return
            }

            const config = {
                component : LCLE2003,
                params : {
                    mydtCusno : this.mydtCusno,
                    inqYm : this.inqYm,
                    infOfrmnOrgC : this.paymoneyTabInfOfrmnOrgC ||'',
                    faceNo : this.paymoneyTabFaceNo || '',
                    faceOnm : this.paymoneyTabFaceOnm || '',
                    accIdVal : this.paymoneyTabAccIdVal || '',
                    isTabPopup: true
                }
            }
            modalService.openPopup(config).then(response => {
                this.paymoneyTabInfOfrmnOrgC = response.paymoneyTabInfOfrmnOrgC
                this.paymoneyTabFaceNo = response.paymoneyTabFaceNo
                this.paymoneyTabFaceOnm = response.paymoneyTabFaceOnm
                this.paymoneyTabAccIdVal = response.paymoneyTabAccIdVal
            })
        },

        // 선불카드 상세 팝업
        openPpayCdDetail() {
            if(this.subtype == SUBTYPE_PPAYCARD) {
                return
            }

            if(this.isTabPopup) {
                this.close({
                    paymoneyTabInfOfrmnOrgC : this.infOfrmnOrgC,
                    paymoneyTabFaceNo : this.faceNo,
                    paymoneyTabFaceOnm : this.faceOnm,
                    paymoneyTabAccIdVal : this.accIdVal,
                })
                return
            }

            const config = {
                component : LCLE2004,
                params : {
                    mydtCusno : this.mydtCusno,
                    inqYm : this.inqYm,
                    infOfrmnOrgC : this.ppaycardTabInfOfrmnOrgC || '',
                    cdcoCdWrsnm : this.ppaycardTabCdcoCdWrsnm || '',
                    mydtCdId : this.ppaycardTabMydtCdId || '',
                    isTabPopup: true
                }
            }
            modalService.openPopup(config).then(response => {
                this.ppaycardTabInfOfrmnOrgC = response.ppaycardTabInfOfrmnOrgC
                this.ppaycardTabCdcoCdWrsnm = response.ppaycardTabCdcoCdWrsnm
                this.ppaycardTabMydtCdId = response.ppaycardTabMydtCdId
            })
        },

        // 선택 슬라이드팝업.
        openSelectSlidePop() {
            let calledId = ''
            let selectVal = ''
            if(this.type == TYPE_PAY && this.subtype == SUBTYPE_PAYMONEY) {
                selectVal = this.faceOnm + this.accIdVal
                calledId = 'LCLE2003'
            }else{
                selectVal = this.infOfrmnOrgC + this.mydtCdId
            }
            
            const config = {
                params : {
                    mydtCusno : this.mydtCusno,
                    inqYm : this.inqYm,
                    selectVal,
                    type : this.type,
                    subtype: this.subtype,
                    calledId
                },
                renderer: {
                    component: this.getSelectComponent(),
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.mydtCusno   	= response.mydtCusno  || ''
                this.infOfrmnOrgC	= response.infOfrmnOrgC || ''
                this.mydtCdId       = response.mydtCdId || ''
                this.cdcoCdNo       = response.cdcoCdNo || ''
                this.cdcoCdWrsnm    = response.cdcoCdWrsnm || ''

                this.setCurrentMethod(response)

                // 페이지 및 검색조건 파라미터 초기화
                this.pageNo = 1
                this.isSrch = false
                this.prcMchtnmCnd = ""
                this.cdTyCnd = ""
                this.amCnd = ""
                this.stsCnd = ""
                this.getData()
                this.callJQueryFncExcute()
            })
        },

        // 상세정보 슬라이드 팝업
        openInfoSlidePop(obj) {
            const config = {
                params: obj,
                renderer : {
                    component : this.getInfoComponent(),
                }
            }
            modalService.openSlidePagePopup(config).then(() => {
            })
        },

        // 조건검색 슬라이드 팝업
        openSearchSlidePop() {
            const config = {
                params : {
                    mydtCusno		: this.mydtCusno,
                    inqYm 			: this.inqYm,
                    infOfrmnOrgC	: this.infOfrmnOrgC,
                    mydtCdId		: this.mydtCdId,
                    cdcoCdWrsnm		: this.cdcoCdWrsnm,
                    type			: this.type,
                    subtype         : this.subtype,
                    prcMchtnmCnd	: this.prcMchtnmCnd,
                    cdTyCnd			: this.cdTyCnd,
                    amCnd			: this.amCnd,
                    stsCnd			: this.stsCnd
                },
                renderer : {
                    component : this.getSearchComponent(),
                }
            }
            modalService.openSlidePagePopup(config).then((response) => {
                if(response.isSrch !== undefined){
                    this.isSrch = response.isSrch
                    this.prcMchtnmCnd = response.prcMchtnmCnd
                    this.cdTyCnd = response.cdTyCnd
                    this.cdTyCndLabel = response.cdTyCndLabel
                    this.amCnd = response.amCnd
                    this.amCndLabel = response.amCndLabel
                    this.stsCnd = response.stsCnd
                    this.stsCndLabel = response.stsCndLabel

                    this.pageNo = 1
                    this.getData()
                    this.callJQueryFncExcute()
                }
            })
        },

        // 더보기
        showMoreList() {
            this.pageNo += 1

            // 기본 요청데이터
            let data = {
                mydtCusno		: this.mydtCusno,
                inqYm			: this.inqYm,
                infOfrmnOrgC	: this.infOfrmnOrgC,
                mydtCdId		: this.mydtCdId,
                pageNo		    : this.pageNo,
            }

            // 검색일 경우 요청데이터에 검색조건 추가
            if(this.isSrch) {
                Object.assign(data, {
                    prcMchtnmCnd: this.prcMchtnmCnd
                })
                Object.assign(data, {
                    cdTyCnd: this.cdTyCnd
                })
                Object.assign(data, {
                    amCnd: this.amCnd
                })
                Object.assign(data, {
                    stsCnd: this.stsCnd
                })
            }

            const config = {
                url: this.getDataUrl(),
                data
            }

            apiService.call(config).then(response => {
                var i = 0
                this.nxDataYn		= response.nxDataYn || 'N'

                // 종류별 변수할당
                switch(this.type) {
                    // 카드일 경우
                    case TYPE_CARD:
                        if(response.cardCn) {
                            this.count += response.cardCn || 0
                            for(i=0; i<response.cardList.length; i++) {
                                this.list.push(response.cardList[i])
                            }
                        }
                        break

                    // 페이일 경우
                    case TYPE_PAY:
                        switch(this.subtype) {
                            // 페이머니일 경우
                            case SUBTYPE_PAYMONEY:
                                if(response.payMnyCn) {
                                    this.count += response.payMnyCn || 0
                                    for(i=0; i<response.payMnyList.length; i++) {
                                        this.list.push(response.payMnyList[i])
                                    }
                                }
                                break

                            // 선불카드일 경우
                            case SUBTYPE_PPAYCARD:
                                if(response.ppayCdCn) {
                                    this.count += response.ppayCdCn
                                    for(i=0; i<response.ppayCdList.length; i++) {
                                        this.list.push(response.ppayCdList[i])
                                    }
                                }
                                break
                        }
                        break
                }

                this.modifiedList   = this.modifyList(this.list)

                this.callJQueryFncExcute()
            })
        },

        // 결제내역 URL
        getDataUrl() {
            let url = '';
            switch(this.type) {
                case TYPE_CARD:
                    url = '/lc/le/02r02'
                    break
                case TYPE_PAY:
                    switch(this.subtype) {
                        case SUBTYPE_PAYMONEY:
                            url = '/lc/le/03r02'
                            break
                        case SUBTYPE_PPAYCARD:
                            url = '/lc/le/04r02'
                            break
                    }
                    break
            }

            return url
        },

        // 결제내역 선택 슬라이드 팝업 화면 ID
        getSelectComponent() {
            let component = '';
            switch(this.type) {
                case TYPE_CARD:
                    component = LCLE2012
                    break
                case TYPE_PAY:
                    switch(this.subtype) {
                        case SUBTYPE_PAYMONEY:
                            component = LCLE2009
                            break
                        case SUBTYPE_PPAYCARD:
                            component = LCLE2011
                            break
                    }
                    break
            }
            
            return component
        },

        // 결제내역 조건검색 슬라이드 팝업 화면 ID
        getSearchComponent() {
            let component = '';
            switch(this.type) {
                case TYPE_CARD:
                    component = LCLE2007
                    break
                case TYPE_PAY:
                    component = LCLE2008
                    break
            }
            
            return component
        },

        // 결제내역 상세정보 슬라이드 팝업 화면 ID
        getInfoComponent() {
            let component = '';
            switch(this.type) {
                case TYPE_CARD:
                    component = LCLE2112
                    break
                case TYPE_PAY:
                    switch(this.subtype) {
                        case SUBTYPE_PAYMONEY:
                            component = LCLE2010
                            break
                        case SUBTYPE_PPAYCARD:
                            component = LCLE2119
                            break
                    }
                    break
            }
            
            return component
        }
    }
}

// 라운드탭 사이즈(가장큰 탭사이즈를 기준으로 각탭 및 전체 적용하기)
function roundTabWidth(){
    var arr = [],
            _tabList = $('.switchType li');
    _tabList.each(function(e){
        arr[e] = $(this).outerWidth();
    });
    _tabList.css('width',Math.max(...arr)); //탭 사이즈 적용
    _tabList.parent().parent().css('width',Math.max(...arr)*2); //탭전체 사이즈 적용
    //console.log('값 = '+arr+', 갯수 = '+arr.length+', 최고값 = '+Math.max(...arr));
}
</script>