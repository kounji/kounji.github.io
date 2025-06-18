<!--
/*************************************************************************
* @ 서비스경로 : 청소년모드 > 지출 > 카드이용금액
* @ 페이지설명 : 청소년모드 > 지출 > 카드이용금액
* @ 파일명     : src/views/page/LC/TA/LCTA4C04/LCTA4C04.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-27
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-27              CS541597              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>페이 지출내역</h1>
		</div>

		<div class="popup_content" id="content_area">
            <section class="spend_youth">
                <h2>{{inqYm | dateFilter('YYYY')}}년 {{inqYm | dateFilter('M')}}월</h2>
                <div class="sum">{{(payXpsSam + ppcdXpsSam) | numberFilter}}원</div>
                
                <template v-if="totXpsList.length > 0">
                    <section v-for="item in totXpsList" :key="item.dtForList">
                        <h3>{{item.dtForList | dateFilter('M')}}월 {{item.dtForList | dateFilter('D')}}일({{item.dowForList}})</h3>
                        <ul class="daily_list">
                            <li v-for="(listObj, idx) in item.list" :key="item.dtForList + '_' + idx" :class="{'item_cancel': listObj.stlStsc == '02' || listObj.eltFncPpayTrTpc == '5502'}">
                                <i :class="listObj.asetAmnCtgrId"><span class="blind">{{listObj.asetAmnCtgrIdNm}}</span></i>
                                <template v-if="listObj.type == SUBTYPE_PPAYCARD">
                                    <div>
                                        <span class="name">{{listObj.prcMchtnm}}</span>
                                        <span class="num">{{listObj.cdApvKrwAm | numberFilter}}원</span>
                                        
                                    </div>
                                    <div>
                                        <span class="pay">{{listObj.cdcoCdWrsnm}}<span>{{listObj.stlStscNm}}</span></span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div>
                                        <span class="name">{{listObj.prcMchtnm}}</span>
                                        <span class="num">{{listObj.ppayTram | numberFilter}}원</span>
                                    </div>
                                    <div>
                                        <span class="pay">{{listObj.faceOnm}}<span>{{listObj.accIdVal}}</span></span>
                                        <span class="status">{{listObj.eltFncPpayTrTpcNm}}</span>
                                    </div>
                                </template>
                            </li>
                        </ul>
                    </section>
                </template>

            </section>
			
            <div class="com_inner" style="display:none;">
                <div class="com_btn_area"><a href="javascript:void(0);" class="com_btn_more" id="btnMore" @click.prevent="showMoreList()"><span>더보기</span></a></div>
            </div>
		</div>
        
		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import {dateFormat, getLastDay, getDayDowCName} from '@/utils/date'
import _ from 'lodash'

const SUBTYPE_PAYMONEY = 'PAYMONEY'     // 페이 - 페이머니 지출내역
const SUBTYPE_PPAYCARD = 'PPAYCARD'     // 페이 - 선불카드 지출내역

export default {
    name : "LCTA4C04",
    data: () => {
        return {
            SUBTYPE_PAYMONEY,
            SUBTYPE_PPAYCARD,
            mydtCusno       : '',       // 마이데이터고객번호
            currYm          : '',       // 현재년월
            currentDay      : 0,        // 현재일
            currentMonth    : 0,        // 현재월
            currentYear     : 0,        // 현재년도

            inqStrDt        : '',       // 거래 시작일자 검색조건
            inqEndDt        : '',       // 거래 종료일자 검색조건
            inqYm           : '',       // 조회년월
            trDtCnd         : 'desc',   // 정렬 검색조건
            pageNo			: 1,        // 페이지넘버(서비스에서 페이징 처리하기로 해서 페이지 넘버로 보냄, 최초 1)

            payXpsSam       : 0,        // 페이 지출금액합계
            payXpsCnt       : 0,        // 페이 건수
            payXpsList      : [],       // 페이 지출정보목록
            nxPayDataYn		: '',       // 페이 다음페이지 존재여부

            ppcdXpsSam      : 0,        // 선불카드 지출금액합계
            ppcdXpsCnt      : 0,        // 선불카드 건수
            ppcdXpsList     : [],       // 선불카드 지출정보목록
            nxPpcdDataYn    : '',       // 선불카드 다음페이지 존재여부

            totRspList      : [],       // 페이, 선불카드 지출정보 통합목록
            totXpsList      : [],       // 페이, 선불카드 지출정보 가공목록
            nxDataYn        : '',       // 페이, 선불카드 다음페이지 존재여부
        }
    },
    computed : {
        noMoreList() {
            return (this.nxDataYn == 'Y')?"":"display : none"
        },
    },
    created() {
        
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param) {
            const date = new Date()

            this.currYm     = dateFormat(date, 'YYYYMM')
            this.mydtCusno  = param.mydtCusno || ''
            this.inqYm      = param.inqYm || ''

            this.currentDay     = ('0' + (date.getDate())).slice(-2)
            this.currentMonth   = ('0' + (date.getMonth() + 1)).slice(-2)
            this.currentYear    = date.getFullYear()

            let lastDay = ''
            if(this.inqYm == this.currYm) {
                lastDay = this.currentDay
            } else {
                lastDay = dateFormat(getLastDay(dateFormat(this.inqYm+'01', 'YYYYMMDD')), 'DD')
            }
            this.inqStrDt   = dateFormat(this.inqYm+'01', 'YYYY-MM-DD')
            this.inqEndDt   = dateFormat(this.inqYm+lastDay, 'YYYY-MM-DD')
            this.trDtCnd    = 'desc'

            // 첫 진입시 다음페이지 여부 Y설정
            this.nxPayDataYn    = 'Y'
            this.nxPpcdDataYn   = 'Y'

            this.getData()

            this.$nextTick(() => {
                this.fn_scrollMove()
            })
        },
        /*
         * 모창에서 받은 데이터 기반 화면 노출 리스트 생성
         */
        getData() {
            Promise.all([
                this.nxPayDataYn == 'Y' ? this.getPayData() : '',
                this.nxPpcdDataYn == 'Y' ? this.getPpcdData() : ''
            ])
        },
        /**
         * 페이지출데이터 조회
         */
        getPayData() {
            const config = {
                url: '/lc/le/03r03',
                data: {
                    mydtCusno   : this.getUserInfo('mydtCusno'),    // 마이데이터고객번호
                    inqYm       : this.inqYm,                       // 조회년월
                    infOfrmnOrgC: '',                               // 정보제공자기관코드(All)
                    pageNo      : this.pageNo,                      // 페이지번호
                    inqStrDt    : this.inqStrDt.split('-').join(''),// 조회시작일자
                    inqEndDt    : this.inqEndDt.split('-').join(''),// 조회종료일자
                    trDtCnd     : this.trDtCnd,                     // 내역정렬조건
                    faceNo      : '',                               // 권면번호(All)
                    accIdVal    : '',                               // 계정식별값(All)
                },

                /// test
                // data: {
                //     mydtCusno   : '1000024355',    // 마이데이터고객번호
                //     inqYm       : this.inqYm,                       // 조회년월
                //     infOfrmnOrgC: '',                               // 정보제공자기관코드(All)
                //     pageNo      : this.pageNo,                      // 페이지번호
                //     inqStrDt    : '20200101',// 조회시작일자
                //     inqEndDt    : this.inqEndDt.split('-').join(''),// 조회종료일자
                //     trDtCnd     : this.trDtCnd,                     // 내역정렬조건
                //     faceNo      : '',                               // 권면번호(All)
                //     accIdVal    : '',                               // 계정식별값(All)
                // }
            }
            apiService.call(config).then(response => {
                this.payXpsSam      = response?.payMnySam || 0
                this.payXpsCnt      = response?.payMnyCn || 0
                this.nxPayDataYn    = response?.nxDataYn || 'N'
                this.payXpsList     = response?.payMnyList || []

                this.payXpsList.forEach(item => {
                    item.type = SUBTYPE_PAYMONEY
                    this.totRspList.push(item)
                })

                this.totXpsList = this.modifyList(this.totRspList)
            })
        },
        /**
         * 선불카드지출데이터 조회
         */
        getPpcdData() {
            const config = {
                url: '/lc/le/04r04',
                data: {
                    mydtCusno   : this.getUserInfo('mydtCusno'),    // 마이데이터고객번호
                    inqYm       : this.inqYm,                       // 조회년월
                    infOfrmnOrgC: '',                               // 정보제공자기관코드(All)
                    pageNo      : this.pageNo,                      // 페이지번호
                    inqStrDt    : this.inqStrDt.split('-').join(''),// 조회시작일자
                    inqEndDt    : this.inqEndDt.split('-').join(''),// 조회종료일자
                    trDtCnd     : this.trDtCnd,                     // 내역정렬조건
                    mydtCdId    : '',                               // 마이데이터카드식별자(All)
                }

                /// test
                // data: {
                //     mydtCusno   : '2030871062',    // 마이데이터고객번호
                //     inqYm       : this.inqYm,                       // 조회년월
                //     infOfrmnOrgC: '',                               // 정보제공자기관코드(All)
                //     pageNo      : this.pageNo,                      // 페이지번호
                //     inqStrDt    : '20200101',// 조회시작일자
                //     inqEndDt    : this.inqEndDt.split('-').join(''),// 조회종료일자
                //     trDtCnd     : this.trDtCnd,                     // 내역정렬조건
                //     mydtCdId    : '',                               // 마이데이터카드식별자(All)
                // }
            }
            apiService.call(config).then(response => {
                this.ppcdXpsSam     = response?.cardApvSam || 0
                this.ppcdXpsCnt     = response?.ppayCdCn || 0
                this.nxPpcdDataYn   = response?.nxDataYn || 'N'
                this.ppcdXpsList    = response?.ppayCdList || []

                this.ppcdXpsList.forEach(item => {
                    item.type = SUBTYPE_PPAYCARD
                    this.totRspList.push(item)
                })

                this.totXpsList = this.modifyList(this.totRspList)
            })
        },
        /**
         * 일자별 내림차순 정렬
         */
        modifyList(objArray){
            console.log("modifyList() objArray===================", objArray)
            
            let list = []
            for(var i = 0; i < objArray.length; i++){
                list.push(objArray[i])

                list[i].dtForList   = objArray[i].type == SUBTYPE_PPAYCARD ? objArray[i].apvDt : objArray[i].trDt
                list[i].dowForList  = getDayDowCName(objArray[i].type == SUBTYPE_PPAYCARD ? objArray[i].apvDt : objArray[i].trDt)
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
                .value()
            return result
        },
        /**
         * 다음데이터 조회
         */
        showMoreList() {
            if(this.nxPayDataYn == 'Y' || this.nxPpcdDataYn == 'Y') {
                this.pageNo++

                this.getData()
            }
        },
        /**
         * 스크롤 이벤트 동작
         */
        fn_scrollMove() {
            // 스크롤 동작 이벤트
            $("#content_area").scroll(function(e){
                e.preventDefault()

                var calcScl_top = $(this).parent().children("#content_area").scrollTop(),
                    calcHeight = $(this).parent().children("#content_area")[0].offsetHeight,
                    calcScl_hgt = $(this).parent().children("#content_area")[0].scrollHeight;

                if(calcScl_top + calcHeight >= calcScl_hgt) {
                    $("#btnMore").get(0).click()
                }
            })
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>