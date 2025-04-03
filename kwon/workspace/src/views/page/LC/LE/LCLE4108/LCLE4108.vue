<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 통신요금
* @ 페이지설명 : 지출 > 지출내역 > 통신요금 > 소액결제 내역
* @ 파일명     : src/views/page/LC/LE/LCLE4108/LCLE4108.vue
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
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>소액결제 내역</h1>
		</div>
		<div class="popup_content com_space_bottom list_top_info_area com_bg_type00">
			<div class="com_inner">
				<div class="top_info_box_wrap">
					<div v-if="smamCnt > 1" class="top_btn"><p class="depth"></p><a href="javascript:void(0);" :class="noBG" @click="openHoldListSlidePop">{{infOfrmnOrgCNm}}({{comuCtrEntNo | maskingFilter('phone')}})</a></div>
                    <div v-else class="top_btn"><p class="depth"></p><a href="javascript:void(0);" :class="noBG">{{infOfrmnOrgCNm}}({{comuCtrEntNo | maskingFilter('phone')}})</a></div>
					<div class="shadow"></div>
					<div class="top_info_box type02 noBG">
						<div class="select_date">
							<!-- 20211109 한별 접근성 추가, UX개선 일괄 변경 S -->
							<button class="cal_btn cal_prev" aria-label="한달 전 이동" @click.prevent="moveMonth('PREV')"></button>
                            <a title="년월선택" class="year_month" href="javascript:void();" @click.prevent="selectMonth"><span class="num">{{inqYm | dateFilter('YYYY')}}</span>년 <span class="num">{{inqYm | dateFilter('M')}}</span>월 </a>
                            <button class="cal_btn cal_next" :class="disabledButton" aria-label="한달 후 이동" @click.prevent="moveMonth('NEXT')" :disabled="currYm===inqYm"></button>
							<!-- 20211109 한별 접근성 추가, UX개선 일괄 변경 E -->
						</div>
						<div class="bill" v-if="smamCn > 0">
                            <span id="stlSam" class="num counter" data-count="">{{stlSam | numberFilter}}</span>원
						</div>
					</div>
				</div>
            </div>
            <template v-if="modifiedSmamList.length > 0">
                <ul class="list_more_box">
                    <!-- 일별 리스트 그리기 시작 -->
                    <li v-for="item in modifiedSmamList" :key="item.comuStlDt">
                        <div class="com_inner">
                            <div class="new_tit_area">
                                <div class="tit"><em>{{item.comuStlDt | dateFilter('D')}}</em><span>일({{item.stlDow}})</span></div>
                            </div>
                            <ul class="list_type_02" v-for="(listObj, index) in item.list" :key="index">
                                <!-- 일별 리스트 목록 그리기 시작 -->
                                <li>
                                    <dl>
                                        <dt>
                                            <div>
                                                <em>{{listObj.comuStlWrsnm}}</em>
                                            </div>
                                            <span v-if="listObj.prcMchtnm">{{listObj.prcMchtnm}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{listObj.comuStlAm | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                        <div class="com_space_type01"></div>
                    </li>
                </ul>
            </template>
            <!-- 데이터 없을때 -->
            <template v-else>
                <div class="no_data_box">
                    <div class="no_data_list">
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
import LCLE2109 from '@/views/page/LC/LE/LCLE2109/LCLE2109'
// import LCFD2003 from '@/views/page/LC/FD/LCFD2003/LCFD2003'
import _ from 'lodash'

export default {
    name : "LCLE4108",
        data: () => {
            return {
                mydtCusno           : "",       // 마이데이터고객번호
                inqYm               : "",       // 조회년월
                infOfrmnOrgC        : "",       // 정보제공자기관코드
                infOfrmnOrgCNm      : "",       // 정보제공자기관코드명
                comuCtrAmnNo        : "",       // 통신계약관리번호
                stlSam              : 0,        // 결제금액합계
                smamCn              : 0,        // 결제목록건수
                smamList            : [],       // 결제목록
                pageNo              : 1,        // 페이지넘버
                nxDataYn            : "",       // 다음페이지 존재여부
                smamCnt             : 0,        // 소액결제보기 리스트수(상단 셀렉트박스 표시/미표시 위함)
                comuCtrEntNo        : "",       // 통신계약가입번호
                currYm              : "",       // 현재년월

                modifiedSmamList    : {},       // 날짜별로 그룹핑한 리스트
            }	
        },

        computed : {
            noMoreList() {
                return (this.nxDataYn == 'Y')?"":"display : none"
            },
            noBG() {
                return (this.smamCnt > 1 )?"":"noBG"
            },
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
            this.getData()
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
                this.comuCtrAmnNo   = param.comuCtrAmnNo || ''
                this.comuCtrEntNo   = param.comuCtrEntNo || ''
                this.smamCnt        = param.smamCnt || 0
                this.currYm         = dateFormat(new Date(), 'YYYYMM')
            },
            getData() {
                // 실제구현
                const config = {
                    url : '/lc/le/08r01',
                    data : {
                        mydtCusno    : this.mydtCusno,
                        inqYm        : this.inqYm,
                        infOfrmnOrgC : this.infOfrmnOrgC,
                        comuCtrAmnNo : this.comuCtrAmnNo,
                        // pageNo       : this.pageNo,
                    }
                }
                apiService.call(config).then(response => {
                    this.mydtCusno       = response.mydtCusno || ''
                    this.inqYm           = response.inqYm || ''
                    this.stlSam          = response.stlSam || 0
                    this.smamCn          = response.smamCn || 0
                    this.nxDataYn        = response.nxDataYn || 'N'
                    if(this.nxDataYn == 'Y') 
                        this.pageNo += 1
                    this.smamList        = response.smamList || []
                    this.modifiedSmamList = this.modifySmamList(this.smamList)
                })

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
            
            // 통신사 선택 슬라이드 팝업 오픈
            openHoldListSlidePop() {
				const config = {
					params : {
                        mydtCusno       : this.mydtCusno,
                        inqYm           : this.inqYm,
                        selectedAmnNo   : this.comuCtrAmnNo
                    },
					renderer: {
						component: LCLE2109
					}
				}
				modalService.openSlidePagePopup(config).then(response => {
                    this.infOfrmnOrgC   = response.infOfrmnOrgC || ''
                    this.infOfrmnOrgCNm = response.infOfrmnOrgCNm || ''
                    this.comuCtrEntNo   = response.comuCtrEntNo || ''
                    this.comuCtrAmnNo   = response.comuCtrAmnNo || ''
                    this.getData()
				})
            },
            
            // 상세내역(지출) 화면(LCFD1103) 오픈 -> 삭제됨
            /*
            openDetailPop(obj) {
                obj.reqFlag = 'LCLE2108'
                let param = {
                    "paramList" : obj
                }
                const config = {
                    component : LCFD2003,
                    param : param,
                }
                modalService.openPopup(config).then(() => {
                this.getData();
                })
            },
            */

            // 날짜 내림차순 정렬 및 그룹핑
            modifySmamList(objArray){
                let list = objArray || []
                let result = _.chain(list)
                    .uniqBy('comuStlDt')
                    .map(d => {
                        return {
                            comuStlDt : d.comuStlDt,
                            stlDow : getDayDowCName(d.comuStlDt),
                            list : _.filter(list, {comuStlDt : d.comuStlDt})
                        }
                    })
                    .orderBy('comuStlDt', 'desc')
                    .value()
                return result
            },

            // 더보기
            showMoreList() {
                const config = {
                    url : '/lc/le/08r01',
                    data : {
                        mydtCusno    : this.mydtCusno,
                        inqYm        : this.inqYm,
                        infOfrmnOrgC : this.infOfrmnOrgC,
                        comuCtrAmnNo : this.comuCtrAmnNo,
                        // pageNo       : this.pageNo,
                    }
                }

                apiService.call(config).then(response => {
                    this.nxDataYn	= response.nxDataYn || ''
                    for(let i=0;i<response.smamList.length;i++) {
                        this.smamList.push(response.smamList[i])
                    }
                    this.pageNo		+= 1
                    this.modifiedSmamList = this.modifySmamList(this.smamList)
                })
            },
        }
}
</script>