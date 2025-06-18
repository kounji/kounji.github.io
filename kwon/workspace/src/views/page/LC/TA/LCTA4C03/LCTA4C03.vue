<!--
/*************************************************************************
* @ 서비스경로 : 청소년모드 > 지출 > 카드이용금액
* @ 페이지설명 : 청소년모드 > 지출 > 카드이용금액
* @ 파일명     : src/views/page/LC/TA/LCTA4C03/LCTA4C03.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-26              CS541597              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>카드 지출내역</h1>
		</div>

		<div class="popup_content" id="content_area">
            <section class="spend_youth">
                <h2>{{inqYm | dateFilter('YYYY')}}년 {{inqYm | dateFilter('M')}}월</h2>
                <div class="sum">{{cardXpsSam | numberFilter}}원</div>
                <template v-if="cardXpsList.length > 0">
                    <section v-for="item in cardXpsList" :key="item.dtForList">
                        <h3>{{item.dtForList | dateFilter('M')}}월 {{item.dtForList | dateFilter('D')}}일({{item.dowForList}})</h3>
                        <ul class="daily_list">
                            <li v-for="(listObj, idx) in item.list" :key="item.dtForList + '_' + idx" :class="{'item_cancel': listObj.stlStsc == '02' || listObj.eltFncPpayTrTpc == '5502'}">
                                <i :class="listObj.asetAmnCtgrId"><span class="blind">{{listObj.asetAmnCtgrIdNm}}</span></i>
                                <div>
                                    <span class="name">{{listObj.prcMchtnm}}</span>
                                    <span class="num">{{listObj.cdApvKrwAm | numberFilter}}원</span>
                                </div>
                                <div>
                                    <span class="pay">{{listObj.cdcoCdWrsnm}}<span v-if="listObj.stlStscNm != ''">{{listObj.stlStscNm}}</span></span>
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
    name : "LCTA4C03",
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

            cardXpsSam      : 0,        // 카드지출금액합계
            cardXpsCnt      : 0,        // 카드건수
            cardRespList    : [],       // 카드지출원본정보목록
            cardXpsList     : [],       // 카드지출정보목록
            nxDataYn		: '',       // 다음페이지 존재여부
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
                url: '/lc/le/02r03',
                data: {
                    mydtCusno   : this.mydtCusno,   // 마이데이터고객번호
                    inqYm       : this.inqYm,       // 조회년월
                    infOfrmnOrgC: '',               // 정보제공자기관코드(All)
                    pageNo      : this.pageNo,      // 페이지번호
                    inqStrDt    : this.inqStrDt.split('-').join(''),    // 조회시작일자
                    // inqStrDt    : '20250101',    // 조회시작일자
                    inqEndDt    : this.inqEndDt.split('-').join(''),    // 조회종료일자
                    trDtCnd     : this.trDtCnd,     // 마이데이터카드식별자(All)
                    mydtCdId    : '',
                }
            }
            apiService.call(config).then(response => {
                this.mydtCusno      = response?.mydtCusno || ''
                this.inqYm          = response?.inqYm || ''
                this.nxDataYn       = response?.nxDataYn || 'N'

                this.cardXpsSam     = response?.cardApvSam || 0
                this.cardXpsCnt     = response?.cardCn || 0
                
                const respList = response?.cardList || []
                respList.forEach(item => {
                    this.cardRespList.push(item)
                })

                this.cardXpsList = this.modifyList(this.cardRespList)
            })
        },
        // 일자별 내림차순 정렬
        modifyList(objArray){
            console.log("modifyList() objArray===================", objArray)
            // 정렬기준이 되는 필드(날짜와 요일) 새로 만들어 정렬
            // 정정이 있는 경우 정정일자와 요일, 그외엔 승인일자와 요일
            let list = []
            for(var i = 0; i < objArray.length; i++){
                list.push(objArray[i])

                list[i].dtForList   = objArray[i].apvDt
                list[i].dowForList  = getDayDowCName(objArray[i].apvDt)
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
                //.orderBy('dtForList', 'desc')
                .value()
            return result
        },
        showMoreList() {
            if(this.nxDataYn == 'Y') {
                this.pageNo++

                this.getData()
            }
        },



        // 스크롤 이벤트 동작
        fn_scrollMove() {
            // 스크롤 동작 이벤트
            $("#content_area").scroll(function(e){
                e.preventDefault()

                var calcScl_top = $(this).parent().children("#content_area").scrollTop(),
                    calcHeight = $(this).parent().children("#content_area")[0].offsetHeight,
                    calcScl_hgt = $(this).parent().children("#content_area")[0].scrollHeight;

                console.log('>>> calc >>> ', calcScl_top + calcHeight,  calcScl_hgt)

                if(calcScl_top + calcHeight >= calcScl_hgt) {
                    console.log('!!')
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