<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 예금 > 입출금상세
* @ 페이지설명 : 나의자산 > 자산 > 예금 > 입출금상세
* @ 파일명     : src/views/page/AS/AC/ASAC1102/ASAC1102.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-17              CS515729                 최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>입출금</h1>			
		</div>

		<div class="popup_content com_space_bottom com_bg_type00">
			<div class="com_inner">
				<div class="top_info_box_wrap">
					<div class="top_info_box type02 hasdetail new_top_box fixBG">
						<div class="box_head">
							<div class="info">
								<div class="ico">
                                    <i :class="respInfo.infOfrmnOrgC"><span class="blind">{{respInfo.infOfrmnOrgnm}}</span></i>
								</div>
								<div class="title">
									{{respInfo.acWrsnm}}
									<div class="num">{{respInfo.mydtAcno}} <span class="icon_mint" v-if="respInfo.nmsPmiYn === '1'">마이너스</span></div>
								</div>
							</div>
						</div>
						<div class="bill mt50 p-l align">
							<span class="num counter">{{respInfo.acNowBac | numberFilter}}</span><span class="text fs25">원</span>
						</div>
						<div class="box_toggle_wrap">
							<div class="box_toggle">
								<div class="toggle-box">
									<div data-ui-toggle="box">									
										<div class="view-box" data-ui-toggle="view">
											<div class="info">
												<div class="title">이자율</div>
												<div class="num">{{respInfo.aplItr | numberFilter('0,0.00', {precision: 2})}}%</div>
											</div>
											<div class="info">
												<div class="title">계좌개설일</div>
												<div class="num">{{respInfo.acOpDt | dateFilter('YYYY.MM.DD')}}</div>
											</div>
											<div class="info">
												<div class="title">출금가능금액</div>
												<div class="num">{{respInfo.mydtDravlAm | numberFilter}}원</div>
											</div>
                                            <template v-if="respInfo.nmsPmiYn === '1'">
                                                <div class="devider">
                                                </div>
                                                <div class="info">
                                                    <div class="title">마이너스대출 한도</div>
                                                    <div class="num">{{respInfo.acLnOgnAm | numberFilter}}원</div>
                                                </div>
                                                <div class="info">
                                                    <div class="title">대출이자율</div>
                                                    <div class="num">{{respInfo.lnaplItr | numberFilter('0,0.00', {precision: 2})}}%</div>
                                                </div>
                                                <div class="info">
                                                    <div class="title">대출시작일</div>
                                                    <div class="num">{{respInfo.lnDt | dateFilter('YYYY.MM.DD')}}</div>
                                                </div>
                                                <div class="info">
                                                    <div class="title">대출만기일</div>
                                                    <div class="num">{{respInfo.lnDueDt | dateFilter('YYYY.MM.DD')}}</div>
                                                </div>
                                            </template>

										</div>
										<button type="button" class="view-btn" aria-expanded="false">
											<em class="open">열기</em><em class="close">닫기</em>
										</button>
									</div>
								</div>
							</div> 
						</div>  
					</div>
				</div>
			</div>
            <div class="com_inner">
				<div class="new_period_box">
					<div class="tit_area">
						<a href="javascript:void(0);" title="팝업열기" role="button" @click.prevent="fn_openPeriodPop()"><span class="tit">{{startDay}} ~ {{endDay}}</span></a>
					</div>
                    <div class="scroll_wrap">
                        <div class="checkbox_box">
                            <span class="cmm_radio">
                                <input type="radio" name="chk" id="chk_all" aria-hidden="true" value="" v-model="srchFrag" v-on:click="fn_setSearchCond('')">
                                <label for="chk_all" role="radio" :aria-checked="srchFrag=== '' ? 'true' : 'false'">전체</label>
                            </span>
                            <span class="cmm_radio">
                                <input type="radio" name="chk" id="chk_01" aria-hidden="true" value="1" v-model="srchFrag" v-on:click="fn_setSearchCond('1')">
                                <label for="chk_01" role="radio" :aria-checked="srchFrag=== '1' ? 'true' : 'false'">입금만</label>
                            </span>
                            <span class="cmm_radio">
                                <input type="radio" name="chk" id="chk_02" aria-hidden="true" value="2" v-model="srchFrag" v-on:click="fn_setSearchCond('2')">
                                <label for="chk_02" role="radio" :aria-checked="srchFrag=== '2' ? 'true' : 'false'">출금만</label>
                            </span>
                        </div>
                    </div>
				</div>
            </div>

            <template v-if="accTrList.length > 0">
                <ul class="list_more_box">
                    <li v-for="(monthObj, mIdx) in accTrList" :key="'mon_'+mIdx">
                        <div class="com_inner">
                            <div class="new_tit_area">
                                <div class="tit">
                                    <em>{{monthObj.yyyyMM | dateFilter('YYYY')}}</em><span>년</span>
                                    <em>{{monthObj.yyyyMM | dateFilter('MM')}}</em><span>월</span>
                                </div>
                            </div>              
                            <ul class="list_type_02 list_type_add" :key="mIdx">
                                <li v-for="(item, dIdx) in monthObj.monList" :key="'day_'+dIdx">
                                    <dl>
                                        <dt>
                                            <div>
                                                <em>{{item.dpzAcTrTpcNm}}</em>
                                            </div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{item.dpzAcTram | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>
                                            <span v-if="item.recCntn">{{item.recCntn}}</span>
                                            <span>{{item.mydtTrDtm | dateFilter('DD일 HH:mm:ss')}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{item.acTrafBac | numberFilter}}</em>
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

                <div class="com_inner">
                    <div class="com_btn_area02">
                        <a href="javascript:void(0);" role="button" @click="fn_showMoreList()" class="com_btn_more" v-show="lsPageYn==='1'"><span>더보기</span></a>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="no_data_box">
                    <div class="no_data_list">
                        <p>조회된 정보가 없습니다.</p>
                    </div>
                </div>
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
   
    export default {
        name : "ASAC1102",
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

                tranList    : [],     // 임시 리스트
                accTrList   : []      // 월별 리스트
            }	
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
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
        },
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
                
                ////////
                // 계좌 기본조회
                //
				const config = {
					url: '/as/ac/02r01',
                    data: {
                        "mydtCusno"      : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objAccInfo.mydtAcno
                        , "mydtScNo"     : this.objAccInfo.mydtScNo
                    }
				}
				apiService.call(config).then(response => {
                    this.respInfo = response;
                    this.fn_getDetailList('INIT');
				})
            },

            /*
            * 계좌 상세내역조회
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
            * 검색조건(기간 선택) 팝업
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
        }
    }
</script>


