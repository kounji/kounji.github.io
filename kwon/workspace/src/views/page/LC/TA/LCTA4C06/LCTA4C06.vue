<!--
/*************************************************************************
* @ 서비스경로 : 청소년모드 > 지출 > 현금/이체이용금액
* @ 페이지설명 : 청소년모드 > 지출 > 현금/이체이용금액
* @ 파일명     : src/views/page/LC/TA/LCTA4C06/LCTA4C06.vue
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
			<h1>이체/현금 지출내역</h1>
		</div>

		<div class="popup_content" id="content_area">
            <section class="spend_youth">
                <h2>{{inqYm | dateFilter('YYYY')}}년 {{inqYm | dateFilter('M')}}월</h2>
                <div class="sum">{{schXpsSam | numberFilter}}원</div>
                
                <template v-if="cashList.length > 0">
                    <section v-for="item in cashList" :key="item.trDt">
                        <h3>{{item.trDt | dateFilter('M')}}월 {{item.trDt | dateFilter('D')}}일({{item.trDow}})</h3>
                        <ul class="daily_list">
                            <li v-for="(listObj, idx) in item.list" :key="item.dtForList + '_' + idx">
                                <i :class="listObj.asetAmnCtgrId"><span class="blind">{{listObj.asetAmnCtgrIdNm}}</span></i>
                                <div>
                                    <span class="name">{{listObj.trCntn}}</span>
                                    <span class="num">{{listObj.tram | numberFilter}}원</span>
                                </div>
                                <div>
                                    <span class="pay" v-if="listObj.inqDsc == 'F'">{{listObj.infOfrmnOrgCNm}}</span>
                                    <span class="pay" v-else>현금</span>
                                </div>
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

export default {
    name : "LCTA4C06",
    data: () => {
        return {
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

            schXpsSam       : 0,        // 현금지출금액합계
            cashCn          : 0,        // 현금목록건수
            rspSchList      : [],       // 응답원본 현금목록
            cashList        : [],       // 현금목록
            nxDataYn        : '',       // 페이, 선불카드 다음페이지 존재여부
        }
    },
    computed : {
        
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

            this.getData()

            this.$nextTick(() => {
                this.fn_scrollMove()
            })
        },
        /*
         * 모창에서 받은 데이터 기반 화면 노출 리스트 생성
         */
        getData() {
            const config = {
                url: '/lc/le/04r05',
                data: {
                    mydtCusno   : this.getUserInfo('mydtCusno'),        // 마이데이터고객번호
                    inqYm       : this.inqYm,                           // 조회년월
                    inqDsc      : '',                                   // 조회구분코드(All:'')
                    pageNo      : this.pageNo,                          // 페이지번호
                    inqStrDt    : this.inqStrDt.split('-').join(''),    // 조회시작일자
                    // inqStrDt    : '20200101',    // 조회시작일자
                    inqEndDt    : this.inqEndDt.split('-').join(''),    // 조회종료일자
                    prcMchtnmCnd: '',                                   // 가맹점명조건(All:'')
                    amCnd       : '',                                   // 결제금액조건(All:'')
                    trDtCnd     : this.trDtCnd,                         // 내역정렬조건
                }
            }
            apiService.call(config).then(response => {
                this.inqYm      = response?.inqYm || ''
                this.schXpsSam  = response?.schXpsSam || 0
                this.cashCn     = response?.cashCn || 0
                this.nxDataYn   = response?.nxDataYn || 'N'

                const schList   = response?.cashList || []
                schList.forEach(item => {
                    this.rspSchList.push(item)
                })
                
                this.cashList = this.modifyList(this.rspSchList)
            })
        },
        /**
         * 일자별 내림차순 정렬
         */
        modifyList(objArray){
            console.log("modifyList() objArray===================", objArray)
            
            let list = objArray || []
            let result = _.chain(list)
                .uniqBy('trDt')
                .map(d => {
                    return {
                        trDt    : d.trDt,
                        trDow   : getDayDowCName(d.trDt),
                        list    : _.filter(list, {trDt : d.trDt})
                    }
                })
                .value()
            return result
        },
        /**
         * 다음데이터 조회
         */
        showMoreList() {
            if(this.nxDataYn == 'Y') {
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