<!--
/*************************************************************************
* @ 서비스경로 : 지출분석 > 지출현황 > 기타
* @ 페이지설명 : 지출분석 > 지출현황 > 기타 지출내역 
* @ 파일명     : src/views/page/LC/LE/LCLE2104/LCLE2104.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-06-09
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-09              CS515937              최초작성
* 2023-08-28              CS533571              마이데이터 확대개발 화면번호 변경(기존 LCLE1104)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>기타 지출내역</h1>
		</div>
		<div class="popup_content com_space_bottom list_top_info_area com_bg_type00">
			<div class="com_inner">
                <div class="top_info_box_wrap">
                    <div class="top_btn"><p class="depth"></p><a href="javascript:void(0);" @click.prevent="openCashSelectSlidePop()" ref="chsvKdnm"></a></div>
					<div class="shadow"></div>
                    <div class="top_info_box type02 noBG">
                        <div class="select_date_wrap">
							<div class="date_inner">
								<div class="select_date">
									<!-- 20211109 한별 접근성 추가, UX개선 일괄 변경 S -->
									<button class="cal_btn cal_prev" aria-label="한달 전 이동" @click.prevent="moveMonth('PREV')"></button>
									<a title="년월선택" class="year_month" href="javascript:void();" @click.prevent="selectMonth"><span class="num">{{inqYm | dateFilter('YYYY')}}</span>년 <span class="num">{{inqYm | dateFilter('M')}}</span>월 </a>
									<button class="cal_btn cal_next" :class="disabledButton" aria-label="한달 후 이동" @click.prevent="moveMonth('NEXT')" :disabled="currYm===inqYm"></button>
									<!-- 20211109 한별 접근성 추가, UX개선 일괄 변경 E -->
								</div>
								<div class="bill" v-if="cashCn > 0">
                                    <span class="num counter" id="schXpsSam" data-count="">{{schXpsSam | numberFilter}}</span>원
                                </div>
							</div>
						</div>
                        
                    </div>
				</div>
            </div>
            <template v-if="modifiedCashList.length > 0">
                <ul class="list_more_box">
                    <li v-for="item in modifiedCashList" :key="item.trDt">
                    <!-- 일별 리스트 시작 -->
                        <div class="com_inner">
                            <div class="new_tit_area">
                                <div class="tit"><em>{{item.trDt | dateFilter('D')}}</em><span>일({{item.trDow}})</span></div>
                            </div>
                            <ul class="list_type_01" v-for="(listObj, index) in item.list" :key="index">
                                <li>
                                    <a href="javascript:void(0);" @click.prevent="openDetailPop(listObj)">
                                        <dl>
                                            <dt>
                                                <div>
                                                    <i :class="listObj.asetAmnCtgrId"><span class="blind">{{listObj.asetAmnCtgrIdNm}}</span></i>
                                                    <em v-if="listObj.trCntn">{{listObj.trCntn}}</em>
                                                    <span>
                                                        <!-- 이체의 경우 보내는 기관명, infOfrmnOrgCNm? acWrsnm? -->
                                                        <!-- <span v-if="listObj.inqDsc == 'F'">{{listObj.acWrsnm}}</span> -->
                                                        <span v-if="listObj.inqDsc == 'F'">{{listObj.infOfrmnOrgCNm}}</span>
                                                        <span v-else>현금</span>
                                                    </span>
                                                </div>
                                            </dt>
                                            <dd>
                                                <span class="com_price">
                                                    <em class="num">{{listObj.tram | numberFilter}}</em>
                                                    <em class="unit">원</em>
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
		<a href="javascript:void(0);" @click="closeAndReload()" class="btn_close"><span class="blind">팝업닫기</span></a>
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
import LCFD2003 from '@/views/page/LC/FD/LCFD2003/LCFD2003'
import LCLE2116 from '@/views/page/LC/LE/LCLE2116/LCLE2116'
import _ from 'lodash'

export default {
    name : "LCLE2104",
    data: () => {
        return {
            mydtCusno       : "",       // 마이데이터고객번호
            inqYm           : "",       // 조회년월
            inqDsc          : "",       // 조회구분코드(ALL:전체, F:이체, C:현금)
            pageNo          : 1,        // 페이지넘버
            nxDataYn        : "",       // 다음페이지 존재여부

            schXpsSam       : 0,        // 현금지출금액합계
            cashCn          : 0,        // 현금목록건수
            cashList        : [],       // 현금목록
            currYm          : "",       // 현재년월

            modifiedCashList   : [],    // 정렬한 현금목록
        }	
    },

    computed : {
		noMoreList() {
			return (this.nxDataYn == 'Y')?"":"display : none"
        },
        // 전체선택 여부
		isAll() {
			return (this.infOfrmnOrgC == '')?true:false
        },
        disabledButton() {
			return this.currYm == this.inqYm ? 'disabled' : ''
		},
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
            this.inqDsc         = param.inqDsc || ''
            this.currYm         = dateFormat(new Date(), 'YYYYMM')
            if(this.inqDsc == '')
                this.$refs.chsvKdnm.innerText = '전체'
            else if(this.inqDsc == 'F')
                this.$refs.chsvKdnm.innerText = '이체'
            else if(this.inqDsc == 'C')
                this.$refs.chsvKdnm.innerText = '현금'

            this.getData();
        },
        getData() {
            // 실제구현
            const config = {
                url : '/lc/le/04r03',
                data : {
                    mydtCusno    : this.mydtCusno,
                    inqYm        : this.inqYm,
                    inqDsc       : this.inqDsc,
                    pageNo       : this.pageNo,
                }
            }
            apiService.call(config).then(response => {
                this.mydtCusno       = response.mydtCusno || ''
                this.inqYm           = response.inqYm || ''
                this.schXpsSam       = response.schXpsSam || 0
                this.cashCn          = response.cashCn || 0
                this.nxDataYn		 = response.nxDataYn || 'N'
				if(this.nxDataYn == 'Y') 
                    this.pageNo += 1
                    
                this.cashList        = response.cashList || []
                this.modifiedCashList = this.modifyCashList(this.cashList)
                console.log("modifiedCashList : ",this. modifiedCashList)
            })

        },

        // 현금목록 결제일자별 내림차순 정렬
        modifyCashList(objArray){
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
                .orderBy('trDt', 'desc')
                .value()
            return result
        },

        openCashSelectSlidePop() {
            const config = {
				params : {
					mydtCusno : this.mydtCusno,
                    inqDsc    : this.inqDsc,
				},
                renderer: {
                    component: LCLE2116,
                }
			}
            modalService.openSlidePagePopup(config).then(response => {
                this.mydtCusno  = response.mydtCusno || ''
                this.inqDsc     = response.inqDsc || ''

                if(this.inqDsc == '')
                    this.$refs.chsvKdnm.innerText = '전체'
                else if(this.inqDsc == 'F')
                    this.$refs.chsvKdnm.innerText = '이체'
                else if(this.inqDsc == 'C')
                    this.$refs.chsvKdnm.innerText = '현금'

				this.getData()
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

        // 상세내역(지출) 화면(LCFD2003) 오픈
        openDetailPop(obj) {
            // obj.asetCtgrDsc     = (obj.inqDsc == 'C')?'2':'3'   // 자산카테고리구분코드, 2:지출(C), 3:이체(F)
            obj.asetCtgrDsc = '2'
            obj.dataSrcDsc  = (obj.inqDsc == 'C')?'05':'01'     // 데이터원천구분코드 01:계좌(F), 05:수기(C))
            obj.reqFlag     = 'LCLE2104'                        // LCFD1103에서 팝업닫을 때 close()를 쓰도록 구분하기 위한 flag
            let param = {
				"paramList" : obj
            }
            const config = {
                component : LCFD2003,
                param : param,
            }
            modalService.openPopup(config).then(response => {
                if(response === 'complete') {
                    this.getData();
                }
            })
        },

        closeAndReload() {
            this.close('reload')
        },

        // 더보기
		showMoreList() {
			const config = {
				url : '/lc/le/04r03',
				data : {
					mydtCusno    : this.mydtCusno,
                    inqYm        : this.inqYm,
                    inqDsc       : this.inqDsc,
                    pageNo       : this.pageNo,
				}
			}

			apiService.call(config).then(response => {
				this.nxDataYn	= response.nxDataYn || ''
				for(let i=0;i<response.cashList.length;i++) {
					this.cashList.push(response.cashList[i])
				}
				this.pageNo		+= 1
                this.modifiedCashList = this.modifyCashList(this.cashList)
			})
		},
    }
}
</script>