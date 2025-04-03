<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 예금 > 입출금상세
* @ 페이지설명 : 나의자산 > 자산 > 예금 > 입출금상세
* @ 파일명     : src/views/page/AS/AC/ASAC4102/ASAC4102.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-17              CS515729                 최초작성
* 2023-07-28              CS533039             ASAC1102 -> ASAC2102  마이데이터 확대개발 API2.0
* 2025-02-10              CS541017             ASAC2102 -> ASAC4102  마이데이터 확대개발 API4.0
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01">
		<div class="popup_header">    
			<h1>입출금</h1>
		</div>	
		<div class="popup_content com_space_bottom com_bg_type00">
			<div class="asset_info_box">
				<div class="com_inner">
					<div class="asset_info_wrap">
						<div class="asset_info">
							<dl>
								<dt>{{respInfo.infOfrmnOrgnm}} {{respInfo.acWrsnm}}</dt>
								<dd>
									<span class="account_num num">{{respInfo.mydtAcno}}</span>
									<span class="asset_type" v-if="respInfo.nmsPmiYn === '1'">마이너스</span>
								</dd>
							</dl>
							<div class="bank_icon">
								<i :class="respInfo.infOfrmnOrgC"><span class="blind">{{respInfo.infOfrmnOrgnm}}</span></i>
							</div>
						</div>

						<div class="asset_price">
							<span class="num counter" :data-count="respInfo.acNowBac"> {{ respInfo.acNowBac | numberFilter }}</span>원
						</div>
					</div>

					<div class="asset_detail">
						<ul class="list_type_2023">
							<li>
								<dl>
									<dt>이자율</dt>
									<dd><span class="pointColor green num">{{respInfo.aplItr | numberFilter('0,0.00', {precision: 2})}}%</span></dd>
								</dl>
								<dl>
									<dt>계좌개설일</dt>
									<dd class="num">{{respInfo.acOpDt | dateFilter('YYYY.MM.DD')}}</dd>
								</dl>	
								<dl>
									<dt>출금가능금액</dt>
									<dd class="num">{{respInfo.mydtDravlAm | numberFilter}}원</dd>
								</dl>	
								<dl>
									<dt>자동이체 등록정보</dt>
									<template v-if="auttrCn > 0">
									<dd><a href="javascript:void(0)" class="link_arrow" @click="fn_openSlidePopup()">{{respInfo.auttrCn}}건</a></dd>
									<!-- <dd><a href="javascript:void(0)" class="link_arrow" >{{respInfo.auttrCn}}건</a></dd> -->
									</template>
									<template v-else>
										<!--<dd><a href="#nolink" class="link_arrow">{{respInfo.auttrCn}}건</a></dd>-->
										<dd class="num">{{respInfo.auttrCn}}건</dd>
									</template>
								</dl>	
								<template v-if="respInfo.nmsPmiYn === '1'">
								<dl>
									<dt>마이너스대출 약정여부</dt>
									<dd>약정</dd>
								</dl>	
								</template>
							</li>
                            <template v-if="respInfo.nmsPmiYn === '1'">
								<li>
									<dl>
										<dt>마이너스대출 한도</dt>
										<dd><strong class="num">{{respInfo.acLnOgnAm | numberFilter}}원</strong></dd>
									</dl>
									<dl>
										<dt>대출금리</dt>
										<dd><strong class="num">{{respInfo.lnaplItr | numberFilter('0,0.00', {precision: 2})}}%</strong></dd>
									</dl>	
									<!-- <dl>
										<dt>마이너스대출 금액</dt>
										<dd class="num">0원</dd>
									</dl>	-->
									<dl>
										<dt>대출 시작일</dt>
										<dd class="num">{{respInfo.lnDt | dateFilter('YYYY.MM.DD')}}</dd>
									</dl>	
									<dl>
										<dt>대출 만기일</dt>
										<dd class="num">{{respInfo.lnDueDt | dateFilter('YYYY.MM.DD')}}</dd>
									</dl>	
								</li>
                            </template>
						</ul>
					</div>
				</div>

				<button type="button" class="btn_view_detail">더보기</button><!-- 230720 상세보기에서 더보기로 수정 -->
			</div>

			<!-- 전체,입금만,출금만 -->
			<div class="com_inner">
				<div class="new_period_box">
					<div class="tit_area">
						<a href="javascript:void(0);" title="팝업열기" role="button" @click.prevent="fn_openPeriodPop()" class="num">{{startDay}} ~ {{endDay}}</a>
					</div>
					<!-- <div class="scroll_wrap">
						<div class="checkbox_box">
							<span class="cmm_radio">
								<input type="radio" name="chk_01" id="chk_01" aria-hidden="true" checked="checked" v-model="srchFrag" v-on:click="fn_setSearchCond('')">
								<label for="chk_01" role="radio" aria-checked="true">전체</label>
							</span>
							<span class="cmm_radio">
								<input type="radio" name="chk_02" aria-hidden="true" id="chk_02" v-model="srchFrag" v-on:click="fn_setSearchCond('1')">
								<label for="chk_02" role="radio" aria-checked="false">입금</label>
							</span><span class="cmm_radio">
								<input type="radio" name="chk_03" aria-hidden="true" id="chk_03" v-model="srchFrag" v-on:click="fn_setSearchCond('2')">
								<label for="chk_03" role="radio" aria-checked="false">출금</label>
							</span>
						</div>
					</div> -->

					<div class="choice_wrap">
						<div class="choice_option">
							<button type="button" title="선택됨" :class="srchFrag === '' ? 'active' : ''" @click="() => srchFrag = ''">전체</button>
							<button type="button" title="선택안됨" :class="srchFrag === '1' ? 'active' : ''" @click="() => srchFrag = '1'">입금</button>
							<button type="button" title="선택안됨" :class="srchFrag === '2' ? 'active' : ''" @click="() => srchFrag = '2'">출금</button>
						</div>
					</div>
				</div>
			</div>
			<!--// 전체,입금만,출금만 -->
			
            <template v-if="accTrList.length > 0">
				<div class="com_inner mt0">
					<li v-for="(monthObj, mIdx) in accTrList" :key="'mon_'+mIdx">
					<!-- 2023년 4월 -->
					<div class="asset_more_list">
						<div class="list_month">
							{{monthObj.yyyyMM | dateFilter('YYYY')}}년{{monthObj.yyyyMM | dateFilter('MM')}}월
						</div>
						<ul :key="mIdx">
							<li v-for="(item, dIdx) in monthObj.monList" :key="'day_'+dIdx">
								<div class="title">{{item.dpzAcTrTpcNm}}</div>
								<dl class="sub_title">
									<dt><span v-if="item.recCntn">{{item.recCntn}}</span></dt>
									<dd class="num">{{item.dpzAcTram | numberFilter}}원</dd>
								</dl>
								<dl>
									<dt class="num">{{item.mydtTrDtm | dateFilter('DD일 HH:mm:ss')}}</dt>
									<dd class="num">{{item.acTrafBac | numberFilter}}원</dd>
								</dl>
							</li>
						</ul>
					</div>
					<!-- //2023년 4월 -->
					</li>
				</div>

				<div class="com_inner">
					<a href="javascript:void(0);" role="button" @click="fn_showMoreList()" class="com_btn_more" v-show="lsPageYn==='1'">더보기</a>
				</div>
            </template>
            <template v-else>
				<!-- 조회내역이 없을경우 S 07/25 수정 -->
				<div class="no_data_box no_data_box01 grayExclamationType">
					<div class="no_data_list">
						<p class="txt_sub">조회된 정보가 없습니다.</p>
					</div>
				</div>
				<!--// 조회내역이 없을경우 E 07/25 수정 -->
            </template>
		</div>

		<a href="javascript:void(0);" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'
    import {dateFormat} from '@/utils/date'
	import _ from 'lodash'
	
	import ASAC2003 from '@/views/page/AS/AC/ASAC2003/ASAC2003'  
	
    export default {
        name : "ASAC4102",
        data: () => {
            return {
                objAccInfo  : {}, //전달 파라미터
                respInfo    : {}, //응답헤더정보
                respDtlInfo : {}, //응답상세목록정보

                srchFrag    : "",     // 조회구분자 A:전체, D:입금, W:출금
                today       : "",     // 오늘 날짜
                startDay    : "",     // 조회 시작일
                endDay      : "",     // 조회 끝일
                pageNum     : 0,      // 페이지번호
                lsPageYn    : "",     // 다음페이지존재여부 '1':존재 , '0':미존재 
				auttrCn     : 0,      // 자동이체건수

                tranList    : [],     // 임시 리스트
                accTrList   : []      // 월별 리스트
            }	
        },
        mixins: [
            popupMixin,
            commonMixin
		],
		watch: {
			srchFrag(value) {
				if (value !== null) {
					this.fn_setSearchCond(value)
				}
			}
		},
        created() {
            //초기데이타 세팅
            this.objAccInfo = this.params.objAccInfo    //전달받은 파라미터

            this.today = new Date();
            this.endDay = dateFormat(this.today, "YYYY.MM.DD");
            this.startDay = this.getDay(this.endDay, "12", "pre");

            this.pageNum  = 1   // 페이지번호
            this.srchFrag = ""; // '':전체, 1: 입금, 2:출금
        },
        computed : {

        },
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
			apiService.pfmLogSend(this.$options.name)
			this.initEvent()
        },
        methods: {
            initComponent() {
				this.getData();
			},
			initEvent() {
				$('.btn_view_detail').on('click',function(){
					$(this).siblings().children('.asset_detail').toggleClass('open');
					$(this).toggleClass('close');
					if($('.asset_detail').hasClass('open')) {
						$('.asset_detail').slideDown('slow');
						$('.btn_view_detail').text('접기');//230720 상세접기에서 접기로 수정
					}else {
						$('.asset_detail').slideUp('slow');
						$('.btn_view_detail').text('더보기');//230720 상세보기에서 더보기로 수정
					}
				});
			},
            getData() {
                
                ////////
                // 계좌 기본조회
                //
				const config = {
					url: '/as/ac/02r03',
                    data: {
                        "mydtCusno"      : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objAccInfo.mydtAcno
                        , "mydtScNo"     : this.objAccInfo.mydtScNo
                    }
				}
				apiService.call(config).then(response => {
                    this.respInfo = response;
					this.auttrCn = response.auttrCn;

					console.log("======= auttrCn =======", this.auttrCn)  

					this.fn_getDetailList('INIT');
					
				})
            },

            /*
            * 계좌 상세 거래내역조회
            */
            fn_getDetailList(mod) {

                // 날짜, 조건 변경시 
                // 페이지, 검색결과 초기화
                if(mod === 'INIT') {
                    this.pageNum  = 1
                    this.tranList = []
                }

				const config = {
					url: '/as/ac/02r02',
                    data: {
                        "mydtCusno"      : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objAccInfo.mydtAcno
                        , "mydtScNo"     : this.objAccInfo.mydtScNo
                        , "inqStDt"      : this.startDay.split(".").join("")  //시작일
                        , "inqEdDt"      : this.endDay.split(".").join("")    //종료일
                        , "inqDsc"       : this.srchFrag   //전체, 입금, 출금
                        , "pageNum"      : this.pageNum    //페이지번호
                    }
				}
				apiService.call(config).then(response => {
                    this.respDtlInfo = response;
                    this.lsPageYn    = this.respDtlInfo.lsPageYn || ""

                    // 조회된 결과 대상으로 이력이 존재하는 월별 배열 생성
                    this.accTrList = this.fn_generateList(this.respDtlInfo.transactionList || [])
				});
            },

            /*
            * 결과리스트 가공.
            */
            fn_generateList(objList) {
                if(objList.length > 0) {
                    for(let i=0; i < objList.length; i++) {
                        if(objList[i].mydtTrDtm != "00000000000000"){
                            objList[i].yyyyMM = dateFormat(objList[i].mydtTrDtm, "YYYYMM")
                            this.tranList.push(objList[i])
                        }
                    }
                } else {
                    this.tranList = []  //응답결과 없을때 초기화처리.
                }
                
                // 거래일시 기준 정렬
                this.tranList = _.orderBy(this.tranList, 'mydtTrDtm', 'desc')

                //년월 기준 정렬
                let resultList = _.chain(this.tranList)
                            .uniqBy('yyyyMM')
                            .map(d => {
                                return {
                                    yyyyMM : d.yyyyMM,
                                    monList : _.filter(this.tranList, {yyyyMM : d.yyyyMM})
                                }
                            })
                            .orderBy('yyyyMM', 'desc')
                            .value()

                return resultList
            },

            /*
            * 더보기
            */
            fn_showMoreList() {
                this.pageNum = this.pageNum + 1
                this.fn_getDetailList()
            },

            /*
            * 검색조건(기간 선택) 팝업 - msha   
            */
            fn_openPeriodPop() {
				const config = {
					params: {
						title     : '기간 선택',
						startDate : this.startDay.split(".").join(""),
						endDate   : this.endDay.split(".").join("")
					}
				}
				modalService.openSelectMonth(config).then(response => {
					this.startDay = dateFormat(response.startDate, "YYYY.MM.DD")
                    this.endDay   = dateFormat(response.endDate, "YYYY.MM.DD")
                    this.fn_getDetailList('INIT')
				})
            },

            /*
            * 검색조건(전체, 입금, 출금) 변경
            */
            fn_setSearchCond(flag) {
                this.srchFrag = flag
                this.fn_getDetailList('INIT')
            },

            getDay(inqEndDay, periodMonth, flag) {
				var period = parseInt(periodMonth);
				var day = new Date(inqEndDay.split(".").join("/"))
				var lastDay = 0;
				flag == "pre" ? lastDay = (new Date(day.getYear(), day.getMonth()-period+1, 0)).getDate() : lastDay = (new Date(day.getYear(), day.getMonth()+1+period, 0)).getDate();
				if(day.getDate() > lastDay){	//오늘 일이 저번달 일보다 클 때
					day.setDate(lastDay);
				}
				var month = flag == "pre" ? day.getMonth()-period : day.getMonth()+period;
				day.setMonth(month);
				return dateFormat(day, 'YYYY.MM.DD');
			},
			
            /*
            * 자동이체 등록현황 팝업
            */
            fn_openSlidePopup() {
                const popParams = {
                    "mydtCusno"     : this.objAccInfo.mydtCusno,
                    "infOfrmnOrgC"  : this.objAccInfo.infOfrmnOrgC,
                    "mydtAcno"      : this.objAccInfo.mydtAcno,
					"mydtScNo"      : this.objAccInfo.mydtScNo,	
					"auttrCn"       : this.respInfo.auttrCn		
                }
                const config = {
					params : {"objAccInfo" : popParams},
					renderer : {
						component : ASAC2003
					}
				}
				
                modalService.openSlidePagePopup(config).then(() => {
                })
            },			
        }
    }

</script>


