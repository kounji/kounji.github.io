<!--
/*************************************************************************
* @ 서비스경로 : 하단메뉴 > 지출분석 > 금융달력 > 월별 수입/지출/이체 내역 
* @ 페이지설명 : 하단메뉴 > 지출분석 > 금융달력 > 월별 수입/지출/이체 내역 
* @ 파일명     : src/views/page/LC/FD/LCFD1102/LCFD1102.vue
* @ 작성자     : CS515901
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515901                 최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup"> 
		<div class="popup_header">    
			<h1>{{asetCtgrTxt}}</h1>
		</div>

        <div class="popup_content com_no_bottom" :class="financeList.length > 0 ? 'com_bg_type00' : 'com_bg_type02'">
			<div class="com_inner com_line_type01">
				<div class="top_info_box">
					<!-- <button class="select_date" @click.prevent="selectMonth()">
						<span class="num">{{year}}</span>년 <span class="num">{{month}}</span>월 <span class="caret"></span>
					</button> -->
					<div class="select_date">
						<button class="cal_btn cal_prev" aria-label="한달 전 이동" @click.prevent="selectPrevNextMonth('PREV')"></button>
						<a title="년월선택" class="year_month" href="javascript:void(0);" @click.prevent="selectMonth()">
							<span class="num">{{year}}</span>년 <span class="num">{{month}}</span>월
						</a>
						<button class="cal_btn cal_next" aria-label="한달 후 이동" @click.prevent="selectPrevNextMonth('NEXT')"></button>
					</div>
					<div class="bill" :class="asetCtgrDsc == '1' ? 'com_point_blue' : 'com_point_red'" v-if="asetCtgrDsc == '1' || asetCtgrDsc == '2'">
						<span class="num">{{sumTram | numberFilter}}</span>원
					</div>
				</div>
            </div>

			<template v-if="financeList.length > 0">
				<ul class="list_more_box">
					<template v-if="asetCtgrDsc === '1'">
						<!-- 수입리스트 -->
						<li v-for="(item, midx) in financeList" :key="midx">
							<div class="com_inner">
								<div class="new_tit_area">
									<div class="tit">
										<em>{{item.fncTrDt.substring(6,8)}}</em>
										<span>일({{getDayOfWeek(item.fncTrDt)}})</span>
									</div>
								</div>
								<ul class="list_type_01">
									<li v-for="(array, idx) in item.list" :key="midx + 'array_'+idx">
										<a href="javascript:void(0);" @click.prevent="moveDetl(array)">
											<dl>
												<dt>
													<div>
														<i :class="array.asetAmnCtgrId"><span class="blind">{{array.ctgrnm}}</span></i>
														<em v-if="array.prcMchtnm">{{array.prcMchtnm}}</em>
														<span v-if="array.cdcoCdWrsnm">
															<span>{{array.cdcoCdWrsnm}}</span>
														</span>
													</div>
												</dt>
												<dd>
													<span>
														<em class="num">{{array.tram | numberFilter}}</em>
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
					</template>

					<template v-else-if="asetCtgrDsc === '2'">
						<!-- 지출리스트 -->
						<li v-for="(item, midx) in financeList" :key="midx">
							<div class="com_inner">
								<div class="new_tit_area">
									<div class="tit">
										<em>{{item.fncTrDt.substring(6,8)}}</em>
										<span>일({{getDayOfWeek(item.fncTrDt)}})</span>
									</div>
								</div>
								<ul class="list_type_01">
									<li v-for="(array, sec_idx) in item.list" :key="sec_idx + '_minus' + midx">
										<a href="javascript:void(0);" @click.prevent="moveDetl(array)">
											<dl>
												<dt>
													<div>
														<i :class="array.asetAmnCtgrId"><span class="blind">{{array.ctgrnm}}</span></i>
														<em v-if="array.prcMchtnm">{{array.prcMchtnm}}</em>
														<span v-if="array.cdcoCdWrsnm">
															<span>{{array.cdcoCdWrsnm}}</span>
															<template v-if="array.allIstSc > 0">
																<span>할부({{array.allIstSc}}개월)</span>
															</template>
														</span>
													</div>
												</dt>
												<dd>
													<span class="com_point_red">
														<em class="num">-{{array.tram | numberFilter}}</em>
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
					</template>

					<template v-else>
						<!-- 이체리스트 -->
						<li v-for="(item, midx) in financeList" :key="midx">
							<div class="com_inner">
								<div class="new_tit_area">
									<div class="tit">
										<em>{{item.fncTrDt.substring(6,8)}}</em>
										<span>일({{getDayOfWeek(item.fncTrDt)}})</span>
									</div>
								</div>
								<ul class="list_type_01">
									<li v-for="(array, secondIdx) in item.list" :key="secondIdx + '_detail' + midx">
										<a href="javascript:void(0);" @click.prevent="moveDetl(array)">
											<dl>
												<dt>
													<div>
														<!-- <i class="ico_money"><span class="blind">이체</span></i> -->
														<i :class="array.dpzAcTrTpc === '02' ? 'AS30000001' : 'AS10000002'"><span class="blind">{{array.dpzAcTrTpc === '02' ? '이체지출' : '이체수입'}}</span></i>
														<em v-if="array.prcMchtnm">{{array.prcMchtnm}}</em>
														<span v-if="array.cdcoCdWrsnm">
															<span>{{array.cdcoCdWrsnm}}</span>
														</span>
													</div>
												</dt>
												<dd>
													<template v-if="array.dpzAcTrTpc === '02'">
														<span class="com_point_red">
															<em class="num ">-{{array.tram | numberFilter}}</em>
															<em class="unit">원</em>
														</span>
													</template>
													<template v-if="array.dpzAcTrTpc === '03'">
														<span class="com_point_blue">
															<em class="num ">{{array.tram | numberFilter}}</em>
															<em class="unit">원</em>
														</span>
													</template>
												</dd>
											</dl>
										</a>
									</li>
								</ul>
							</div>
							<div class="com_space_type01"></div>
						</li>
					</template>
				</ul>
			</template>
			<template v-else>
				<!-- 조회내역이 없을경우 S -->
				<div class="no_data_box">
					<div class="no_data_list">
						<p>조회된 정보가 없습니다.</p>
					</div>
				</div>
			</template>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="fn_closePop()"><span class="blind">팝업닫기</span></a>
	</div>
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

import LCFD1103 from '@/views/page/LC/FD/LCFD1103/LCFD1103'
import {monthAdd} from '@/utils/date'
import _ from 'lodash'

export default {
    name : "LCFD1102",
    data: () => {
        return {
            year        : "",
            month       : "",
            asetCtgrDsc : "",
            asetCtgrTxt : "",
            financeList : [],
            sumTram     : 0,
        }
    },
    mounted() {
		this.initComponent()

		// 자산수집 mutation 이벤트 감지 
        this.getGatheringListenSubscribe()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent() {
			this.getData();
			
		},
        getData() {
			//const date = new Date()
			
            this.year = this.modalConfig.param.year
            this.month = this.modalConfig.param.month
			//this.selectMonth()
            this.asetCtgrDsc = this.modalConfig.param.asetCtgrDsc       // 1.수입, 2.지출, 3.이체
			// this.getTestData()
            // test DATA START

            // test DATA END
            
            if(this.asetCtgrDsc === '1'){
                this.asetCtgrTxt = '수입내역'
            }else if(this.asetCtgrDsc === '2'){
                this.asetCtgrTxt = '지출내역'
            }else{
                this.asetCtgrTxt = '이체내역'
			}
			
			this.getMonthList()
		},
		getTestData(){
		},
        selectMonth(){
            const config = {
                params: {
                    title: '년월 선택',
                    yyyymm : this.year + '' + this.month,
                },
            }
            modalService.openSlideSelectMonth(config).then(response => {
                this.year = response.substring(0,4)
				this.month = response.substring(4,6)
				this.getMonthList()				// 금융(수입, 지출, 이체) 목록 조회
			})
        },
        getMonthList(){
			// 금융(수입, 지출, 이체) 목록 조회
			const config = {
				url:  "/lc/fd/02r01",
				data : {
                    mydtCusno       : this.getUserInfo('mydtCusno')      // 마이데이터 고객번호
                    , rzsBasYm      : this.year + '' + this.month           // 실적기준년월
					, asetCtgrDsc   : this.asetCtgrDsc                      // 자산카테고리구분 :1.수입, 2.지출, 3.이체
				}
			}
			apiService.call(config).then(response => {
				console.log(response)
				this.sumTram = 0
				this.financeList = response.financeList || []
                if(this.financeList.length > 0){
					for(let i=0; i<this.financeList.length; i++){
						this.sumTram += this.financeList[i].tram
					}
					if(this.asetCtgrDsc === '2'){
						this.sumTram = (-1) * this.sumTram 
					}
					this.financeList = this.sortArray(this.financeList)
				}

			})
		},
		moveDetl(item){
			// 수입, 지출, 이체 내역 상세조회 화면 이동.
			//console.log(item)
			let compName = LCFD1103

			var param = {
				"paramList" : item
			}
			const config = {
				component: compName,
				param : param
			}
			modalService.openPopup(config).then(response => {
				console.log(response)
				if(response === 'complete'){
					// Object.assign(this.$data, this.$options.data())
					// this.getData()
					this.getMonthList()
				}
			})
		},
		sortArray(objArray){
            const list = objArray || []
            const result = _.chain(list)
                .uniqBy('fncTrDt')
                .map(d => {
                    return {
                        fncTrDt : d.fncTrDt,
                        list : _.filter(list, {fncTrDt : d.fncTrDt})
                    }
                })
                .orderBy('fncTrDt', 'desc')
                .value()
            return result
		},
		getDayOfWeek(date){
			let week = ['일', '월', '화', '수', '목', '금', '토']
			let year = date.substring(0,4)
			let month = date.substring(4,6)
			let day = date.substring(6,8)
			let dayOfWeek = week[new Date(year, month-1, day).getDay()]
			return dayOfWeek
		},
		selectPrevNextMonth(flag) {
			let add = (flag === "PREV") ? -1 : 1
			let YYYYMM = ''
			YYYYMM = monthAdd(add, this.year + '' + this.month, "YYYYMM")
			this.year = YYYYMM.substring(0,4)
			this.month = YYYYMM.substring(4,6)
			this.getMonthList()
		},
		fn_closePop(){
			this.$parent.$parent.$children[this.$parent.$parent.$children.length-1].fn_setCurrentYm(this.year, this.month)
			this.close('complete')
		}

    }
}
</script>