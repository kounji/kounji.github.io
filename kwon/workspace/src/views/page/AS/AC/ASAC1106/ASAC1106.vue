<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 포인트
* @ 페이지설명 : 나의자산 > 자산 > 포인트 > 페이머니 상세
* @ 파일명     : src/views/page/AS/AC/ASAC1106/ASAC1106.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-17              CS515729              최초작성
* 2023-09-19              CS533031         As-Is → To-Be Css 변경
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup mydata2023" id="full_popup_01"> <!-- mydata2023 추가 -->
		<div class="popup_header">    
			<h1>페이머니</h1>
		</div>	
		<div class="popup_content com_no_bottom com_bg_type00 mydataAsisVer"> <!-- mydataAsisVer 추가 -->
			<div class="com_inner">
				<div class="top_info_box_wrap">
					<div class="top_info_box type02 hasdetail new_top_box fixBG">
						<div class="box_head">
							<div class="info">
								<div class="ico">
                                    <i :class="respInfo.infOfrmnOrgC"><span class="blind">{{respInfo.infOfrmnOrgnm}}</span></i>
								</div>
								<div class="title">
									{{respInfo.faceOnm}}
                                    <div class="num" v-if="objAccInfo.accIdVal && objAccInfo.accIdVal !== 'NA'">{{objAccInfo.accIdVal}}</div>
								</div>
							</div>
						</div>
						<div class="bill">
							<span class="num counter">{{respInfo.eltfncTotBac | numberFilter}}</span>
                            <span class="text fs25">{{respInfo.curc === "KRW" ? '원' : respInfo.curnm}}</span>
						</div>
						<div class="box_toggle_wrap">
							<div class="box_toggle">
								<div class="toggle-box">
									<div data-ui-toggle="box">									
										<div class="view-box" data-ui-toggle="view">
											<div class="info">
												<div class="title">충전가능금액</div>
												<div class="num">{{respInfo.chggPsbAm | numberFilter}}원</div>
											</div>
											<div class="info">
												<div class="title">가입일</div>
												<div class="text">{{respInfo.entDt | dateFilter('YYYY.MM.DD')}}</div>
											</div>
                                            <template v-if="chggList.length > 0">
                                                <div class="devider"></div>
                                                <div class="toggle_detail_title">연결계좌/카드</div>

                                                <template v-for="(item, idx) in chggList">
                                                    <div class="info" :key="'info_'+idx">
                                                        <div class="title">
                                                            {{item.chggAcOrgNm}} {{item.chggMnsIdVal}}<span class="icon_mint">자동충전</span>
                                                            <template v-if="item.chggCndDsc === '01'">
                                                                <p class="gray">
                                                                    매월 {{item.chggDt }} 일
                                                                    {{item.eltfncChggAm | numberFilter}}원
                                                                </p>
                                                            </template>
                                                            <template v-else>
                                                                <p class="gray">
                                                                    매월 {{item.chggDt }} 일
                                                                    {{item.eltfncBasAm | numberFilter}}원 미만 시 
                                                                    {{item.eltfncChggAm | numberFilter}}원
                                                                </p>
                                                            </template>
                                                        </div>
                                                    </div>
                                                </template>
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
            <hr class="hr02 mb0"><!-- 신규 추가 -->
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
                                <label for="chk_01" role="radio" :aria-checked="srchFrag=== '1' ? 'true' : 'false'">입금</label>
                            </span>
                            <span class="cmm_radio">
                                <input type="radio" name="chk" id="chk_02" aria-hidden="true" value="2" v-model="srchFrag" v-on:click="fn_setSearchCond('2')">
                                <label for="chk_02" role="radio" :aria-checked="srchFrag=== '2' ? 'true' : 'false'">출금</label>
                            </span>
                        </div>
                    </div>
                    <!-- <div class="choice_wrap">
                        <div class="choice_option">
                            <button type="button" title="선택됨" :class="srchFrag === '' ? 'active' : ''" @click="() => srchFrag = ''">전체</button>
                            <button type="button" title="선택안됨" :class="srchFrag === '1' ? 'active' : ''" @click="() => srchFrag = '1'">입금</button>
                            <button type="button" title="선택안됨" :class="srchFrag === '2' ? 'active' : ''" @click="() => srchFrag = '2'">출금</button>
                        </div>
                    </div> -->
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
                            <ul class="list_type_02" :key="mIdx">
                                <li v-for="(item, dIdx) in monthObj.monList" :key="'day_'+dIdx" :class="item.cancelYn ? 'item_cancel' : ''">
                                    <dl>
                                        <dt>
                                            <div><em>{{item.prcMchtnm}}</em></div>
                                            <span>
                                                <span>{{item.mydtTrDtm | dateFilter('DD일 HH:mm:ss')}}</span>
                                                <!-- <span class="common_bar"></span>
                                                <span>페이포인트</span> -->
                                            </span>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{item.ppayTram | numberFilter}}</em>
                                                <em class="unit">{{item.curc === "KRW" ? '원' : item.curnm}}</em>
                                            </span>
                                            <span class="com_price">
                                                <span>{{item.eltFncPpayTrTpcNm}}</span>
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
                <div class="no_data_box no_data_box01 grayExclamationType"><!-- grayExclamationType 추가 -->
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
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {dateFormat} from '@/utils/date'
    import _ from 'lodash'

    export default {
        name : "ASAC1106",
        data : () => {
            return {
                objAccInfo   : {}, //전달 파라미터
                respFaceInfo : {}, //응답)권면정보
                respInfo     : {}, //응답)헤더정보
                respDtlInfo  : {}, //응답)상세목록정보
                // faceList     : [], //권면리스트
                chggList     : [], //충전목록
                //prpdAccList  : [], //선불계좌목록

                accIdVal     : "",  //계정식별값
                srchFrag     : "",  // 조회구분자 '':전체, 1:입금, 2:출금
                today        : "",  // 오늘 날짜
                startDay     : "",  // 조회 시작일
                endDay       : "",  // 조회 끝일

                pageNum     : 0,      // 페이지번호
                lsPageYn    : "",     // 다음페이지존재여부 '1':존재 , '0':미존재 

                tranList    : [],     // 임시 리스트
                accTrList   : []      // 최종 결과 리스트
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
            this.startDay = this.getDay(this.endDay, "12", "pre"); // 1년전

            this.pageNum  = 1   // 페이지번호
            this.srchFrag = ""; // '':전체, 1: 입금, 2:출금


            ////////////////////////////
            // 1) 선불전자지급수단정보
            // ------------------------
            // 충전취소 
            //   카드       5111
            //   계좌이체   5112
            //   포인트     5113
            // 	 무통장	    5114
            // 	 상품권		5115
            // 	 기타		5119
            // ------------------------
            // 송금반환(취소)
            //   계좌송금	5211
            // 	 계정송금	5212
            // 	 기타		5219
            // ------------------------
            // 적립취소		5311
            // ------------------------
            // 결제취소		5502
            ////////////////////////////
            // 2) 전자결제정보
            // ------------------------
            // 결제취소	
            //   카드		6201
            // 	 계좌이체	6202	실시간 포함
            // 	 포인트		6203
            // 	 무통장		6204
            // 	 기타		6209	상품권 포함
            ////////////////////////////

            // 취소건인경우 css 별도 지정위함.
            this.cancelCodeList = [
                '5111','5112','5113','5114','5115','5119',  //충전취소
                '5211','5212','5219',   //송금반환(취소)
                '5311', //적립취소
                '5502', //선불지급-결제취소
                '6201','6202','6203','6204','6209'  //전자결제-결제취소
            ]

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

                //선불상세조회
                const config = {
					url: '/as/ac/06r01',
					data: {
                          "mydtCusno"    : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "faceNo"       : this.objAccInfo.faceNo
                        , "accIdVal"     : this.objAccInfo.accIdVal
                    }
                }
                apiService.call(config).then(response => {
                    this.respInfo = response
                    this.chggList = this.respInfo.chggList || []

                    this.fn_getDetailList('INIT')
                })
            },

            /*
            * 계좌 상세내역조회
            */
            fn_getDetailList(mod) {
                // 조건, 날짜 변경시 검색결과 초기화
                if(mod === 'INIT') {
                    this.pageNum  = 1
                    this.tranList = []
                }

                //선불거래내역조회
                const config = {
					url: '/as/ac/06r02',
					data: {
                          "mydtCusno"    : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "faceNo"       : this.objAccInfo.faceNo
                        , "accIdVal"     : this.objAccInfo.accIdVal
                        , "trStDt"       : this.startDay.split(".").join("")  //시작일
                        , "trEdDt"       : this.endDay.split(".").join("")    //종료일
                        , "inqDsc"       : this.srchFrag
                        , "pageNum"      : this.pageNum    //페이지번호
                    }
                }
                apiService.call(config).then(response => {
                    this.respDtlInfo = response
                    this.lsPageYn    = this.respDtlInfo.lsPageYn || ""
                    
                    // 조회된 결과 대상으로 이력이 존재하는 월별 배열 생성
                    this.accTrList = this.fn_generateList(this.respDtlInfo.prpdAccList || [])
                })
            },

            /*
            * 결과리스트 가공.
            */
            fn_generateList(objList) {
                if(objList.length > 0) {
                    for(let i=0; i < objList.length; i++) {
                        objList[i].yyyyMM = dateFormat(objList[i].mydtTrDtm, "YYYYMM")
                        // 취소CSS처리용
                        objList[i].cancelYn = this.cancelCodeList.indexOf(objList[i].eltFncPpayTrTpc) > -1 ? true : false

                        this.tranList.push(objList[i])
                    }
                } else {
                    this.tranList = []
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