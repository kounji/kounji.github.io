<!--
/*************************************************************************
* @ 서비스경로 : 하단메뉴 > 지출분석 > 금융달력 > 월별 수입/지출 내역 
* @ 페이지설명 : 하단메뉴 > 지출분석 > 금융달력 > 월별 수입/지출 내역 
* @ 파일명     : src/views/page/LC/FD/LCFD2002/LCFD2002.vue
* @ 작성자     : CS515901
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515901                 최초작성
* 2023-08-10              CS533457                 상호금융 마이데이터 확대 개발 LC\FD\LCFD1102\LCFD1102.vue -> LC\FD\LCFD2002\LCFD2002.vue 변경
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup mydata2023" id="full_popup_01">  
		<div class="popup_header">    
			<h1>{{asetCtgrTxt}}</h1>
		</div>
        <!-- <div class="popup_content com_no_bottom newCalendarType2023" :class="financeList.length > 0 ? 'com_bg_type00' : 'com_bg_type02'"> -->
		<div class="popup_content com_no_bottom newCalendarType2023">
			<div class="com_inner">
				<div class="top_info_box">
					<div class="select_date">
						<button class="cal_btn cal_prev" aria-label="한달 전 이동" @click.prevent="selectPrevNextMonth('PREV')" style="padding:1px 6px;"></button>
						<a title="년월선택" class="year_month" href="javascript:void(0);" @click.prevent="selectMonth()">
							<span class="num">{{year}}</span>년 <span class="num">{{month}}</span>월
						</a>
						<button class="cal_btn cal_next" :class="disabledButton" aria-label="한달 후 이동" @click.prevent="selectPrevNextMonth('NEXT')" :disabled="currYYYYMM===(this.year + '' + this.month)" :title="currYYYYMM===(this.year + '' + this.month) ? '선택불가' : ''" style="padding:1px 6px;"></button>
					</div>
					<!-- <div class="bill" :class="asetCtgrDsc == '1' ? 'com_point_blue' : 'com_point_red'" v-if="asetCtgrDsc == '1' || asetCtgrDsc == '2'"> -->
					<div class="bill" :class="sumTram >= 0 ? '' : 'com_point_red'" v-if="asetCtgrDsc == '1' || asetCtgrDsc == '2'">
						<span class="num">{{sumTram | numberFilter}}</span>원
					</div>
				</div>
            </div>
			<template v-if="showFlagYN == 'Y'">
				<template v-for="(item, midx) in financeList">
					<hr class="hr02" :key="midx">
					<div class="com_inner" :key="'day_' + midx">
						<div class="choice_wrap" v-if="midx==0 && asetCtgrDsc == '2'">
							<div class="choice_option">
								<button type="button" :title="(xpsWrsTpc == '') ? '선택됨' : '선택안됨'" :class="{active: xpsWrsTpc == ''}" @click.prevent="getData()">전체</button>
								<button type="button" :title="(xpsWrsTpc == 'CD') ? '선택됨' : '선택안됨'" :class="{active: xpsWrsTpc == 'CD'}" @click.prevent="getData('CD')">카드</button>
								<button type="button" :title="(xpsWrsTpc == 'ELTFNC') ? '선택됨' : '선택안됨'" :class="{active: xpsWrsTpc == 'ELTFNC'}" @click.prevent="getData('ELTFNC')">페이</button>
								<button type="button" :title="(xpsWrsTpc == 'DPZ') ? '선택됨' : '선택안됨'" :class="{active: xpsWrsTpc == 'DPZ'}" @click.prevent="getData('DPZ')">이체</button>
							</div>
						</div>
						<div class="new_tit_area">
							<div class="tit"><em>{{item.fncTrDt.substring(6,8)}}</em><span>일({{getDayOfWeek(item.fncTrDt)}})</span></div>
						</div>
						<ul class="list_type_01">
							<li v-for="(array, idx) in item.list" :key="midx + 'array_'+idx">
								<a href="javascript:void(0);" @click.prevent="moveDetl(array)">
									<dl>
										<dt>
											<div>
												<i :class="array.asetAmnCtgrId"><span class="blind">{{array.ctgrNm}}</span></i>
												<em v-if="array.prcMchtnm">{{array.prcMchtnm}}</em>
												<span v-if="array.cdcoCdWrsnm">
													<span>{{array.cdcoCdWrsnm}}</span>
												</span>
											</div>
										</dt>
										<dd>
											<span :class="array.xpsTrTpc === 'CANCEL' ? 'com_point_red' : '' ">
												<em :class="array.xpsTrTpc === 'CANCEL' ? 'num cancelLine' : 'num ' ">{{array.tram | numberFilter}}</em>
												<em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</a>
							</li>
						</ul>
					</div>
				</template>
			</template>
			<template v-else-if="showFlagYN == 'N'">
				<hr class="hr02">
				<!-- 조회내역이 없을경우 S -->
				<div class="com_inner">
					<div class="choice_wrap">
						<div class="choice_option" v-if="asetCtgrDsc == '2'">
							<button type="button" :title="(xpsWrsTpc == '') ? '선택됨' : '선택안됨'" :class="{active: xpsWrsTpc == ''}" @click.prevent="getData()">전체</button>
							<button type="button" :title="(xpsWrsTpc == 'CD') ? '선택됨' : '선택안됨'" :class="{active: xpsWrsTpc == 'CD'}" @click.prevent="getData('CD')">카드</button>
							<button type="button" :title="(xpsWrsTpc == 'ELTFNC') ? '선택됨' : '선택안됨'" :class="{active: xpsWrsTpc == 'ELTFNC'}" @click.prevent="getData('ELTFNC')">페이</button>
							<button type="button" :title="(xpsWrsTpc == 'DPZ') ? '선택됨' : '선택안됨'" :class="{active: xpsWrsTpc == 'DPZ'}" @click.prevent="getData('DPZ')">이체</button>
						</div>
					</div>
					<div class="no_data_box grayExclamationType">
						<div class="no_data_list">
							<p>조회된  정보가 없습니다.</p>
						</div>
					</div>
				</div>
				<!--// 조회내역이 없을경우 E -->
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

import LCFD2003 from '@/views/page/LC/FD/LCFD2003/LCFD2003'
import {dateFormat, monthAdd} from '@/utils/date'
import _ from 'lodash'

export default {
    name : "LCFD2002",
    data: () => {
        return {
            year        : "",
			month       : "",
			currYYYYMM  : "",
            asetCtgrDsc : "",
            asetCtgrTxt : "",
            financeList : [],
			sumTram     : 0,
			xpsWrsTpc   : "",
			basDt       : "",
			// basDd       : "01",
			showFlagYN  : "",
        }
	},
	computed: {
		disabledButton() {
			return this.currYYYYMM == this.year + "" + this.month ? "disabled" : ""
		}
	},
	created() {
		const date        = new Date()
		this.currYYYYMM   = date.getFullYear() + "" + ("0" + (date.getMonth() +1)).slice(-2)		
		this.basDt 		  = dateFormat(new Date(), "YYYYMMDD")
		// this.basDd 		  = dateFormat(new Date(), "DD")

        this.year  = this.modalConfig.param.year
        this.month = this.modalConfig.param.month
		this.asetCtgrDsc = this.modalConfig.param.asetCtgrDsc       // 1.수입, 2.지출, 3.이체		
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
        getData(xpsWrsTpc) {
			

			if(xpsWrsTpc) {
				this.xpsWrsTpc = xpsWrsTpc
			}else{
				this.xpsWrsTpc = ''
			}
	
            if(this.asetCtgrDsc === '1'){
                this.asetCtgrTxt = '수입내역'
            }else if(this.asetCtgrDsc === '2'){
                this.asetCtgrTxt = '지출내역'
            }else{
                this.asetCtgrTxt = '이체내역'
			}
			
			this.getMonthList()
		},
        selectMonth(){
            const config = {
                params: {
                    title: '년월 선택',
					yyyymm : this.year + '' + this.month,
					limit : 60
                },
            }
            modalService.openSlideSelectMonth(config).then(response => {
                this.year = response.substring(0,4)
				this.month = response.substring(4,6)
				this.getMonthList()				// 금융(수입, 지출, 이체) 목록 조회
			})
        },
        getMonthList() {
			const config = {
				url:  "/lc/fd/02r02",
				data : {
                    mydtCusno       : this.getUserInfo('mydtCusno')      // 마이데이터 고객번호
                    , rzsBasYm      : this.year + '' + this.month           // 실적기준년월
					, asetCtgrDsc   : this.asetCtgrDsc                      // 자산카테고리구분 :1.수입, 2.지출, 3.이체
					, xpsWrsTpc		: this.xpsWrsTpc
					, basDt         : this.year + '' + this.month + '' + '01'
				}
			}
			apiService.call(config).then(response => {
                console.log('response', JSON.parse(JSON.stringify(response)))
				this.sumTram = 0
				this.financeList = response.financeList || []
                if(this.financeList.length > 0){
					this.sumTram = this.financeList.reduce((acc,cur) => acc + (cur.xpsTrTpc !== 'CANCEL' ? cur.tram : 0), 0)
					if(this.asetCtgrDsc === '2'){
						this.sumTram = (-1) * this.sumTram 
					}
					this.financeList = this.sortArray(this.financeList)
					this.showFlagYN = 'Y'
				}
				else{
					this.showFlagYN = 'N'
				}

			})
		},
		moveDetl(item){
			// 수입, 지출, 이체 내역 상세조회 화면 이동.
			//console.log(item)
			let compName = LCFD2003

			item.reqFlag     = 'LCFD2002'  // LCFD2003에서 팝업닫을 때 close()를 쓰도록 구분하기 위한 flag

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
			this.basDt = this.year + '' + this.month + '01'
			this.getMonthList()
		},
		fn_closePop(){
			this.$parent.$parent.$children[this.$parent.$parent.$children.length-1].fn_setCurrentYm(this.year, this.month)
			this.close('complete')
		}

    }
}
</script>