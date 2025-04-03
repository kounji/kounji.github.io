<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 통신요금
* @ 페이지설명 : 지출 > 지출내역 > 통신요금 내역
* @ 파일명     : src/views/page/LC/LE/LCLE4107/LCLE4107.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-06-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-03              CS515937              최초작성
* 2023-08-29              CS533571              마이데이터 확대개발 화면ID만 변경(기존 LCLE1108)
* 2025-01-31              CS540687              마이데이터 v4.0
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup sticky-scroll type02" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>통신요금</h1>
		</div>
			
		<div class="popup_content pb0">
			<div class="com_inner com_line_type01">
                <div class="top_info_box">
                    <div class="select_date_wrap">
						<div class="date_inner">
                            <div class="select_date">
                                <button class="cal_btn cal_prev" aria-label="한달 전 이동" @click.prevent="moveMonth('PREV')"></button>
                                <a title="년월선택" class="year_month" href="javascript:void();" @click.prevent="selectMonth"><span class="num">{{inqYm | dateFilter('YYYY')}}</span>년 <span class="num">{{inqYm | dateFilter('M')}}</span>월 </a>
                                <button class="cal_btn cal_next" :class="disabledButton" aria-label="한달 후 이동" @click.prevent="moveMonth('NEXT')" :disabled="currYm===inqYm"></button>
                            </div>
                            <div class="bill">
								<span class="fronttxt fs16 mr7">총 청구금액</span><span class="num counter" id="rqsSam" data-count="">{{rqsSam | numberFilter}}</span>원
							</div>
						</div>
                    </div>
				</div>
            </div>
            <div class="com_inner com_list_type01 com_list_etc" v-if="rqsCn > 0">
				<div class="commt_list_box" v-for="item in modifiedRqsList" :key="item.infOfrmnOrgC">
                    <div class="new_tit_area">
                        <div class="tit">
                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
							<span>{{item.infOfrmnOrgCNm}}</span>
                        </div>
                    </div>
                    <ul class="list_type_02" v-if="modifiedRqsList.length > 0">
                        <li v-for="(listObj,index) in item.list" :key="index">
                            <dl>
                                <dt>
                                    <div>
                                        <em>{{listObj.comuDscNm}}: <span>{{listObj.comuCtrEntNo | maskingFilter('phone')}}</span></em>
                                    </div>
                                </dt>
                                <dd>
                                    <span class="com_price">
                                        <em class="num">{{listObj.comuRqsAm | numberFilter}}</em>
                                        <em class="unit">원</em>
                                    </span>
                                </dd>
                            </dl>
                            <div class="view_detail">
                                <em>납부예정일: </em><span>{{listObj.payPlaDt | dateFilter('YYYY.MM.DD')}}</span>
                                <span v-if="listObj.smamYn == '1'" class="btn_view"><a href="javascript:void(0);" @click.prevent="openStlListPop(listObj)">소액결제보기</a></span>
                            </div>
                        </li>
                    </ul>
                </div>
			</div>
            <div class="no_data_box" v-else>
                <div class="no_data_list">
                    <p>조회된 정보가 없습니다.</p>
                </div>
            </div>
            <!-- new graph -->
            <div class="com inner com_bg_type00" v-if="payList.length > 0">
                <div class="stick_gh_box">
                    <div class="tit">최근 납부 내역</div>
                    <div class="gray_box">
                        <!-- 막대그래프 S -->
                        <div class="vertical_graph">
                            <ul>
                                <li v-for="(item, index) in payList" :key="index">
                                    <div>
                                        <span class="graph" :style="{height:item.pymtPct + '%'}">
                                            <span class="money"><em>{{item.comuPymAm | numberFilter}}</em>원</span>
                                        </span>
                                    </div>
                                    <em class="name">{{item.comuPymYm | dateFilter('M')}}월</em>
                                </li>
                            </ul>
                            <!-- 말풍선 -->
                            <div class="txt_bubble"><span>평균 월 이용요금:<em>{{mmtpAvgam | numberFilter}}</em>원</span></div>
                            <!--// 말풍선 -->
                        </div>
                        <!--// 막대그래프 E -->
                    </div>
                </div>
            </div>
		</div>
		<a href="javascript:void(0);" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import {dateFormat, monthAdd} from '@/utils/date'
import LCLE2108 from '@/views/page/LC/LE/LCLE2108/LCLE2108'
import _ from 'lodash'

export default {
    name : "LCLE4107",
        data: () => {
            return {
                mydtCusno       : "",       // 마이데이터고객번호
                inqYm           : "",       // 조회년월
                rqsSam          : 0,        // 청구금액
                mmtpAvgam       : 0,        // 평균월이용요금
                rqsCn           : 0,        // 청구목록건수
                payCn           : 0,        // 납부목록건수
                rqsList         : [],       // 청구목록
                payList         : [],       // 최근납부내역
                currYm          : "",       // 현재년월
                modifiedRqsList : [],       // 기관별로 묶은 청구목록

                smamCnt         : 0,        // 소액결제 거래 카운트
            }	
        },

        computed : {
            disabledButton() {
                return this.currYm == this.inqYm ? 'disabled' : ''
            },
        },

        created() {
            this.initComponent(this.params)
        },

        mixins: [
            popupMixin,
            commonMixin
        ],

        mounted() {
            this.getData();
            dateFormat()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },

        methods: {
            initComponent(param) {
                this.mydtCusno  = param.mydtCusno || ''
                this.inqYm      = param.inqYm || ''
                this.currYm     = dateFormat(new Date(), 'YYYYMM')
            },

            getData() {
                const config = {
                    url : '/lc/le/07r01',
                    data : {
                        mydtCusno   : this.mydtCusno,
                        inqYm       : this.inqYm,
                    }
                }
                apiService.call(config).then(response => {
                    console.log(response)
                    this.mydtCusno  = response.mydtCusno || ''
                    this.inqYm      = response.inqYm || ''
                    this.rqsSam     = response.rqsSam || 0
                    this.mmtpAvgam  = response.mmtpAvgam || 0
                    this.rqsCn      = response.rqsCn || 0
                    this.payCn      = response.payCn || 0
                    // 계약상태 정상이고, 계약관리번호 있는 데이터만 걸러냄(20210720 삭제)
                    // this.rqsList    = this.getFixedRqsList(response.rqsList || [])
                    this.rqsList    = response.rqsList || []

                    // 기관별로 묶음
                    this.modifiedRqsList = this.modifyRqsList(this.rqsList)
                    // 그래프 그리기 위한 리스트 가공
                    this.payList    = this.getPct(response.payList || [])
                    // 소액결제보기 있는 데이터 카운트
                    this.getSmamCnt(this.rqsList)
                })
            },

            // 기관별로 묶기
            modifyRqsList(objArray){
                let list = objArray || []
                let result = _.chain(list)
                    .uniqBy('infOfrmnOrgC')
                    .map(d => {
                        return {
                            infOfrmnOrgC    : d.infOfrmnOrgC,
                            infOfrmnOrgCNm  : d.infOfrmnOrgCNm,
                            list            : _.filter(list, {infOfrmnOrgC : d.infOfrmnOrgC})
                        }
                    })
                    .value()
                return result
            },

            getFixedRqsList(obj) {
                let fixedrqsList = []
                for(let i=0;i<obj.length;i++){
                    if(obj[i].comuEntDsc == "01" && obj[i].comuCtrAmnNo != '') {
                        fixedrqsList.push(obj[i])
                    }
                }
                return fixedrqsList
            },

            // 소액결제내역 상단 셀렉트박스 버튼 표시/미표시용 카운트
            getSmamCnt(obj) {
                this.smamCnt = 0
                for(let i=0;i<obj.length;i++) {
                    if(obj[i].smamYn == "1") {
                        this.smamCnt ++
                    }
                }
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

            // 년월선택
            moveMonth(flag){
                let add = (flag == 'PREV') ? -1 : 1
                this.inqYm = monthAdd(add, this.inqYm, "YYYYMM")
                this.getData()
            },

            // 소액결제내역 오픈
            openStlListPop(obj) {
                const config = {
                    component: LCLE2108,
                    params : {
                        mydtCusno       : obj.mydtCusno,
                        inqYm           : this.inqYm,
                        infOfrmnOrgC    : obj.infOfrmnOrgC,
                        infOfrmnOrgCNm  : obj.infOfrmnOrgCNm,
                        comuCtrAmnNo    : obj.comuCtrAmnNo,
                        comuCtrEntNo    : obj.comuCtrEntNo,
                        smamCnt         : this.smamCnt,
                    }
                }
                modalService.openPopup(config).then(() => {
                    this.getData();
                })
            },

            // 그래프 관련 리스트 가공
            getPct(obj) {
                // 비율 계산 위한 기준 최대값
                const max = Math.max(...obj.map(o => o.comuPymAm), 0)

                for(var i=0;i<obj.length;i++){
                    obj[i].pymtPct = (obj[i].comuPymAm / max * 100).toFixed(2)
                }
                return _.orderBy(obj, 'comuPymYm', 'desc')
            }
        }
}
</script>