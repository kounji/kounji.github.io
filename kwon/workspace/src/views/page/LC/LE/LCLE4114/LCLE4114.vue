<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 선불결제
* @ 페이지설명 : 지출 > 지출내역 > 선불결제 내역
* @ 파일명     : src/views/page/LC/LE/LCLE4114/LCLE4114.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-06-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-03              CS515937              최초작성
* 2025-01-31              CS540687              마이데이터 v4.0
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">
            <h1>선불 결제내역</h1>    
		</div>
		<div class="popup_content com_no_bottom com_bg_type00">
            <div class="com_inner">
                <div class="top_info_box_wrap mb0">
					<div v-if="ppayList.length > 0" class="top_btn"><p class="depth"></p><a href="javascript:void();" :class="noBG" @click.prevent="slidepopOpen()">{{fn_noShowNA}}</a></div>
                    <div v-else class="top_btn"><p class="depth"></p><a href="javascript:void(0);" :class="noBG">{{fn_noShowNA}}</a></div>
					<div class="shadow"></div>
					<div class="top_info_box type02 noBG">
						<!-- 20210707 한별 추가 스크롤링 년/월 고정 관련 wrapper 필요하여 추가: 이병철 S-->
						<div class="select_date_wrap">
							<div class="date_inner">
								<div class="select_date">
									<button class="cal_btn cal_prev" aria-label="한달 전 이동" @click.prevent="moveMonth('PREV')"></button>
                                    <a title="년월선택" class="year_month" href="javascript:void();" @click.prevent="selectMonth"><span class="num">{{inqYm | dateFilter('YYYY')}}</span>년 <span class="num">{{inqYm | dateFilter('M')}}</span>월 </a>
                                    <button class="cal_btn cal_next" :class="disabledButton" aria-label="한달 후 이동" @click.prevent="moveMonth('NEXT')" :disabled="currYm===inqYm"></button>
								</div>
								<div class="bill" v-if="ppayCn > 0">
                                    <span class="num counter" data-count="ppayXpsSam">{{ppayXpsSam | numberFilter}}</span>원
                                </div>
							</div>
						</div>
						<!-- 20210707 한별 추가 스크롤링 년/월 고정 관련 wrapper 필요하여 추가: 이병철 E-->
					</div>
				</div>
            </div>
            <template v-if="modifiedPpayList.length > 0">
                <!-- 전체묶음 -->
                <ul class="list_more_box">
                    <!-- 일별 묶음 -->
                    <li v-for="item in modifiedPpayList" :key="item.eltfncStlDt">
                        <div class="com_inner">
                            <div class="new_tit_area">
                                <div class="tit"><em>{{item.eltfncStlDt | dateFilter('D')}}</em><span>일({{item.trDow}})</span></div>
                            </div>
                            <ul class="list_type_02" v-for="(listObj, index) in item.list" :key="index">
                                <li :class="isCanceled(listObj.eltFncStlTrTpc)?'item_cancel':''">
                                    <a href="javascript:void(0);" @click.prevent="openPpaySlidePop(listObj)">
                                        <dl>
                                            <dt>
                                                <div>
                                                    <em>{{listObj.eltfncWrsnm}}</em>
                                                </div>
                                                <template v-if="listObj.mydtIstMtcn > 1">
                                                    <span>
                                                        <span v-if="listObj.prcMchtnm">{{listObj.prcMchtnm}}</span>
                                                        <span v-if="listObj.mydtIstMtcn > 1">할부</span>
                                                    </span>
                                                </template>
                                                <template v-else>
                                                    <span v-if="listObj.prcMchtnm">{{listObj.prcMchtnm}}</span>
                                                </template>
                                            </dt>
                                            <dd>
                                                <span class="com_price">
                                                    <em class="num">{{listObj.eltfncStlAm | numberFilter}}</em>
                                                    <em class="unit">원</em>
                                                </span>
                                                <span class="com_price">
                                                    <span>{{listObj.eltFncStlTrTpcNm}}</span>
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
            </template>
            <template v-else>
                <div class="no_data_box">
                    <div class="no_data_list" >
                        <p>조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </template>
            <div class="com_inner">
				<div class="com_btn_area02"><a href="javascript:void(0);" class="com_btn_more" @click.prevent="showMoreList()" :style="noMoreList"><span>더보기</span></a></div>
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
import {getDayDowCName} from '@/utils/date'
import LCLE2014 from '@/views/page/LC/LE/LCLE2014/LCLE2014'
import LCLE2015 from '@/views/page/LC/LE/LCLE2015/LCLE2015'
import _ from 'lodash'

export default {
    name : "LCLE4114",
    data: () => {
        return {
            mydtCusno           : "",       // 마이데이터고객번호
            inqYm               : "",       // 조회년월
            infOfrmnOrgC        : "",       // 정보제공자기관코드
            tfrTrkyVal          : "",       // 대체거래키값
            pageNo              : 1,        // 페이지넘버
            nxDataYn            : "",       // 다음페이지 존재여부
            infOfrmnOrgCNm      : "",       // 정보제공자기관코드명(초기세팅용)
            ppayXpsSam          : 0,        // 선불지출금액합계
            ppayCn              : 0,        // 선불목록건수
            ppayList            : [],       // 선불목록
            currYm              : "",       // 현재년월

            modifiedPpayList    : [],       // 정렬한 선불목록
        }	
    },
    computed : {
        noMoreList() {
            return (this.nxDataYn == 'Y')?"":"display : none"
        },
        disabledButton() {
			return this.currYm == this.inqYm ? "disabled" : ""
        },
        noBG() {
            return this.ppayList.length > 0 ? "" : "noBG"
        },
        fn_noShowNA() {
            if(this.tfrTrkyVal !== 'NA') {
                return this.infOfrmnOrgCNm + ' - ' + this.tfrTrkyVal
            }
            else {
                return this.infOfrmnOrgCNm
            }
        }
    },

    mixins: [
        popupMixin,
        commonMixin
    ],

    mounted() {
        this.initComponent(this.params)
        dateFormat()
        //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
    },

    methods: {
        initComponent(param) {
            this.mydtCusno      = param.mydtCusno || ''
            this.inqYm          = param.inqYm || ''
            this.infOfrmnOrgC   = param.infOfrmnOrgC || ''
            this.infOfrmnOrgCNm = param.infOfrmnOrgCNm || ''
            this.tfrTrkyVal     = param.tfrTrkyVal || ''
            this.currYm         = dateFormat(new Date(), 'YYYYMM')

            this.getData();
        },
        getData() {
            const config = {
                url : '/lc/le/05r02',
                data : {
                    mydtCusno    : this.mydtCusno,
                    inqYm        : this.inqYm,
                    infOfrmnOrgC : this.infOfrmnOrgC,
                    tfrTrkyVal   : this.tfrTrkyVal,
                    // pageNo        : this.pageNo,
                }
            }
            apiService.call(config).then(response => {
                this.mydtCusno       = response.mydtCusno || ''
                this.inqYm           = response.inqYm || ''
                this.ppayXpsSam      = response.ppayXpsSam || 0
                this.ppayCn           = response.ppayCn || 0
                this.nxDataYn		 = response.nxDataYn || 'N'
				if(this.nxDataYn == 'Y') 
                    this.pageNo += 1

                this.ppayList        = response.ppayList || []
                this.modifiedPpayList = this.modifyPpayList(this.ppayList)
            })
        },

        // 선불목록 결제일자별 내림차순 정렬
        modifyPpayList(objArray){
            let list = objArray || []
            let result = _.chain(list)
                .uniqBy('eltfncStlDt')
                .map(d => {
                    return {
                        eltfncStlDt : d.eltfncStlDt,
                        trDow       : getDayDowCName(d.eltfncStlDt),
                        list        : _.filter(list, {eltfncStlDt : d.eltfncStlDt})
                    }
                })
                .orderBy('eltfncStlDt', 'desc')
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
				this.pageNo = 1
				this.getData();
			})
		},

        // 년월선택
        moveMonth(flag){
			let add = (flag == 'PREV') ? -1 : 1
			this.inqYm = monthAdd(add, this.inqYm, "YYYYMM")
            this.pageNo = 1
			this.getData()
        },

        isCanceled(cVal) {
            // 결제 취소
            if(cVal == '6201' || cVal == '6202' || cVal == '6203' || cVal == '6204' || cVal == '6209') {
                return true
            }
            else false
        },
        
        // 선불 선택 슬라이드팝업오픈
        slidepopOpen() {
            const config = {
                params : {
                    mydtCusno   : this.mydtCusno,
                    inqYm       : this.inqYm,
                    selectVal   : this.infOfrmnOrgC + this.tfrTrkyVal,
                    calledId    : "LCLE2114",
                    type        : "PPAY",
                    subtype     : "PPAY"
                },
                renderer : {
                    component : LCLE2014,
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                // this.mydtCusno      = response.mydtCusno || ''
                this.infOfrmnOrgC   = response.infOfrmnOrgC || ''
                this.infOfrmnOrgCNm = response.infOfrmnOrgCNm || ''
                this.tfrTrkyVal     = response.tfrTrkyVal || ''
                this.getData();
            })
        },

        // 선불 결제내역 슬라이드팝업오픈
        openPpaySlidePop(obj) {
            const config = {
                params : {
                    useHistoryList : obj,
                },
                renderer: {
                    component: LCLE2015,
                }
            }
            modalService.openSlidePagePopup(config).then(() => {
            })
        },

        // 더보기
		showMoreList() {
			const config = {
				url : '/lc/le/05r02',
				data : {
					mydtCusno    : this.mydtCusno,
                    inqYm        : this.inqYm,
                    infOfrmnOrgC : this.infOfrmnOrgC,
                    tfrTrkyVal   : this.tfrTrkyVal,
                    // pageNo        : this.pageNo,
				}
			}

			apiService.call(config).then(response => {
				this.nxDataYn	= response.nxDataYn || ''
				for(let i=0;i<response.ppayList.length;i++) {
					this.ppayList.push(response.ppayList[i])
				}
				this.pageNo		+= 1
                this.modifiedPpayList = this.modifyPpayList(this.ppayList)
			})
		},
    }
}
</script>