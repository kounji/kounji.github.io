<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 자주 이용하는 가맹점
* @ 파일명     : src\views\page\LC\IP\LCIP2011\LCIP2011.vue
* @ 작성자     : CS533045
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533045              최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
    <div class="full_popup renewal mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
        <div class="popup_header">
            <h1>자주 이용하는 가맹점</h1>
        </div>
        <div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
            <div class="com_inner">
                <strong class="titH1"><span class="pointColor green">{{prcMchtnm}}</span> 제일 자주 이용해요</strong>

                <div class="chart_wrap"><!-- 1004 접근성 반영 -->
                    <div class="pension_bar_chart">
                        <div class="pension_bar" 
                            :class="{national: item.xpsOrd == '1', retirement: item.xpsOrd == '2', personal: item.xpsOrd == '3'}" :style="{width: item.xpsRto + '%'}" 
                            v-for="(item, idx) in mchtnmTopList" :key="'top_bar_' + idx"></div>
                    </div>

                    <div class="often_item_list">
                        <dl :class="'item0' + (idx +1)" v-for="(item, idx) in mchtnmTopList" :key="'top_' + idx">
                            <dt>{{item.prcMchtnm}}</dt>
                            <dd><em class="num">{{item.xpsCnt}}</em>건</dd>
                        </dl>
                    </div>
                </div>
            </div>	

            <hr class="hr02">

            <div class="com_inner">
                <template  v-if="mchtnmList.length > 0">
                    <div class="com_box_type01 toggle_list_box2 custom_list" v-for="(mchtnm, mchtnmIdx) in mchtnmList" :key="'mchtnm_' + mchtnmIdx">
                        <div data-ui-toggle="box" class="toggle_box_area">
                            <button type="button" class="view_btn" aria-expanded="false">
                                <div class="new_tit_area">
                                    <div class="tit"><span>{{mchtnm.name}}</span><span class="com_icon_num custom">{{mchtnm.count}}건</span></div>
                                    <span class="total_price">
                                        <em class="num">{{mchtnm.sum | numberFilter}}</em><em class="unit">원</em>
                                    </span>
                                </div>
                                <em class="open">열기</em>
                                <em class="close">닫기</em>
                            </button>
                        </div>
                        <div class="view_cont expenditure_list">
                            <div class="expend_detail" v-for="(dayList, dayListIdx) in mchtnm.list" :key="'date_' + dayListIdx">
                                <p class="date">{{dayList.dtForList | dateFilter('M월 D일')}}</p>
                                <ul class="expenListBox" :class="dayListIdx > 0 ? 'expenditure_list' : ''">
                                    <li class="expenList" v-for="(list, listIdx) in dayList.list" :key="'list_' + listIdx">
                                        <dl>
                                            <dt>
                                                <div>
                                                    <i class="expIcon" :class="list.xpsCtgrC"></i>
                                                    <em class="store_name">{{list.prcMchtnm}}</em>
                                                </div>
                                            </dt>
                                            <dd class="prod_name">{{list.wrsnm}}</dd>                                           
                                            <dd class="com_price">
                                                <em class="num">{{list.xpsAm | numberFilter}}</em><em class="unit">원</em>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
    </div>

    <!--// 전체 팝업 종료 -->	
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import {dateFormat} from '@/utils/date'
import {getDayDowCName} from '@/utils/date'
import _ from 'lodash'

export default {
    name : "LCIP2011",
    data: () => {
        return {
            cusNb: '',              // 마이데이터고객번호
            basYm: null,            // 조회 기준년월 YYYYMM
            basDt: null,            // 조회 기준일자 YYYYMMDD

            prcMchtnm: '',          // 상점명
            mchtnmTopList: [],      // 자주 이용하는 상점 Top3
            mchtnmList: []          // 자주 이용하는 상점 목록
        }
    },
    computed : {    
    },
    created() {
        this.cusNb = this.getUserInfo("mydtCusno")
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.basYm = dateFormat(new Date(), "YYYYMM")
            this.basDt = dateFormat(new Date(), "YYYYMMDD")
            this.getData()
        },

        getData() {
            const config = {
                url: '/lc/ip/11r01',
                data: {
                    "mydtCusno" : this.cusNb,
                    "basDt" : this.basDt
                }
            }
            apiService.call(config).then(response =>{
                console.log('response', JSON.parse(JSON.stringify(response)))

                this.prcMchtnm = response.prcMchtnm
                this.mchtnmTopList = response.mchtnmTopList

                let mchtnm = {}
                let prevOrd = 0
                let curOrd = 0
                let list = {}
                for(let i=0; i<response.mchtnmList.length; i++) {
                    list = response.mchtnmList[i]
                    prevOrd = curOrd
                    curOrd = list.xpsOrd

                    if(prevOrd !== curOrd) {
                        mchtnm = {}
                        mchtnm["name"] = list.prcMchtnm
                        mchtnm["sum"] = list.xpsTtAm
                        mchtnm["count"] = list.xpsCnt
                        mchtnm["list"] = []
                    }

                    mchtnm.list.push(list)

                    if(i == (response.mchtnmList.length - 1) || curOrd !== response.mchtnmList[i+1].xpsOrd) {
                        mchtnm.list = this.modifyList(mchtnm.list)
                        this.mchtnmList.push(mchtnm)
                    }
                }
            });		
        },
        modifyList(objArray){
            // 정렬기준이 되는 필드(날짜와 요일) 새로 만들어 정렬
            // 정정이 있는 경우 정정일자와 요일, 그외엔 승인일자와 요일
            let list = []
            for(var i=0;i<objArray.length;i++){
                list.push(objArray[i])

                list[i].dtForList   = objArray[i].trDt
                list[i].dowForList  = getDayDowCName(objArray[i].trDt)
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
    },
    mixins: [
        commonMixin,
        popupMixin,
    ]
}
</script>