<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 페이/포인트
* @ 페이지설명 : 나의자산 > 자산 > 페이/포인트 > 선불카드상세
* @ 파일명     : src/views/page/AS/PT/ASPT2002/ASPT2002.vue
* @ 작성자     : CS533041
* @ 작성일     : 2023-08-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-14              CS533041                 최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
        <div class="popup_header">    
            <h1>선불카드</h1>
        </div>	
        <div class="popup_content com_space_bottom com_bg_type00">
                
            <div class="asset_info_box">
                <div class="com_inner">
                    <div class="asset_info_wrap">
                        <div class="asset_info card">
                            <div class="card_title">{{respInfo.ppayCdnm}}</div>
                            <!-- 08/28 디자인 수정 요청으로 아이콘 변경 -->
                            <!-- <div class="card_icon">
                                <i class="card_icon_01"><span class="blind">신한</span></i>
                            </div> -->
                            <div class="bank_icon">
                                <i :class="respInfo.infOfrmnOrgC"><span class="blind">{{respInfo.infOfrmnOrgCNm}}</span></i>
                            </div>
                            <!-- //08/28 디자인 수정 요청으로 아이콘 변경 -->
                        </div>

                        <div class="asset_price_wrap">
                            <div class="amount">총잔액</div>
                            <div class="asset_price">
                                <span class="num counter" :data-count="respInfo.ppaycdTotBac">{{respInfo.ppaycdTotBac | numberFilter}}</span>원
                            </div>
                        </div>
                    </div>

                    <div class="asset_detail">
                        <ul class="list_type_2023">
                            <li>
                                <dl>
                                    <dt>충전가능금액</dt>
                                    <dd class="num">{{respInfo.chggPsbAm | numberFilter}}원</dd>
                                </dl>
                                <dl>
                                    <dt>충전포인트잔액</dt>
                                    <dd class="num">{{respInfo.chggPntBac | numberFilter}}원</dd>
                                </dl>
                                <dl>
                                    <dt>적립포인트잔액</dt>
                                    <dd class="num">{{respInfo.rvgPntBac | numberFilter}}원</dd>
                                </dl>
                                <dl>
                                    <dt>발급일자</dt>
                                    <dd class="num">{{respInfo.isuDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>

                <button type="button" class="btn_view_detail">더보기</button><!-- 230720 상세보기에서 더보기로 수정 -->
            </div>

            <div class="com_inner">
                <div class="new_period_box">
                    <div class="tit_area">
                        <a href="javascript:void(0);" title="팝업열기" role="button" @click.prevent="fn_openPeriodPop()" class="num">{{startDay}} ~ {{endDay}}</a>
                    </div>
                    <!-- <div class="scroll_wrap">
                        <div class="checkbox_box">
                            <span class="cmm_radio">
                                <input type="radio" name="chk_01" id="chk_01" aria-hidden="true" checked="checked" value="" v-model="srchFrag" v-on:click="fn_setSearchCond('')">
                                <label for="chk_01" role="radio" aria-checked="true">전체</label>
                            </span>
                            <span class="cmm_radio">
                                <input type="radio" name="chk_02" aria-hidden="true" id="chk_02" value="1" v-model="srchFrag" v-on:click="fn_setSearchCond('1')">
                                <label for="chk_02" role="radio" aria-checked="false">입금</label>
                            </span><span class="cmm_radio">
                                <input type="radio" name="chk_03" aria-hidden="true" id="chk_03" value="2" v-model="srchFrag" v-on:click="fn_setSearchCond('2')">
                                <label for="chk_03" role="radio" aria-checked="false">출금</label>
                            </span>
                        </div>
                    </div>  -->

                    <div class="choice_wrap">
                        <div class="choice_option">
                            <button type="button" title="선택됨" :class="srchFrag === '' ? 'active' : ''" @click="() => srchFrag = ''">전체</button>
                            <button type="button" title="선택안됨" :class="srchFrag === '1' ? 'active' : ''" @click="() => srchFrag = '1'">입금</button>
                            <button type="button" title="선택안됨" :class="srchFrag === '2' ? 'active' : ''" @click="() => srchFrag = '2'">출금</button>
                        </div>
                    </div>
                    <!-- <div class="choice_wrap">
                        <div class="choice_option">
                            <button type="button" title="선택됨" class="active">전체</button>
                            <button type="button" title="선택안됨">입금</button>
                            <button type="button" title="선택안됨" >출금</button>
                        </div>
                    </div> -->
                </div>
            </div>

            <template v-if="accTrList.length > 0">
                <div class="com_inner pt0"  v-for="(monthObj, mIdx) in accTrList" :key="'mon_'+mIdx">
                    <div class="asset_more_list">
                        <div class="list_month">{{monthObj.yyyyMM | dateFilter('YYYY')}}년{{monthObj.yyyyMM | dateFilter('MM')}}월</div>              
                        <ul :key="mIdx">
                            <li v-for="(item, dIdx) in monthObj.monList" :key="'day_'+dIdx" :class="item.cancelYn ? 'item_cancel' : ''">
                                <dl class="breakdown">
                                    <dt>{{item.trPatnOrgNm}}</dt>
                                    <dd class="num">{{item.ppaycdTrAm | numberFilter}}원</dd>
                                </dl>
                                <dl>
                                    <dt class="num">{{item.mydtTrDtm | dateFilter('DD일 HH:mm:ss')}}</dt>
                                    <dd>{{item.ppaycdTrtpnm}}</dd>
                                </dl>
                            </li>
                        </ul>    
                    </div>    
                </div>

                <div class="com_inner">
                    <div class="com_btn_area02">
                        <a href="javascript:void(0);" role="button" @click="fn_showMoreList()" class="com_btn_more" v-show="lsPageYn==='1'"><span>더보기</span></a>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="no_data_box no_data_box01 grayExclamationType">
                    <div class="no_data_list">
                        <p>조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </template>

        </div>
        <a @click.prevent="close()" class="btn_close"><span class="blind">팝업닫기</span></a>		
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
        name : "ASPT2002",
        data : () => {
            return {
                objAccInfo   : {}, //전달 파라미터
                respInfo     : {}, //응답)헤더정보
                respDtlInfo  : {}, //응답)상세목록정보

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

                //선불상세조회
                const config = {
					url: '/as/pt/02r01',
					data: {
                        "mydtCusno"    : this.objAccInfo.mydtCusno,
                        "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC,
                        "mydtCdIdVal"  : this.objAccInfo.mydtCdIdVal
                    }
                }
                apiService.call(config).then(response => {
                    this.respInfo = response

                    this.fn_getDetailList('INIT')
                    setTimeout(() => {
						this.initEvent()
					}, 10)
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
					url: '/as/pt/02r02',
					data: {
                          "mydtCusno"    : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "mydtCdIdVal"  : this.objAccInfo.mydtCdIdVal
                        , "inqStDt"      : this.startDay.split(".").join("")  //시작일
                        , "inqEdDt"      : this.endDay.split(".").join("")    //종료일
                        , "inqDsc"       : this.srchFrag
                        , "pageNum"      : this.pageNum    //페이지번호
                    }
                }
                apiService.call(config).then(response => {
                    this.respDtlInfo = response
                    
                    // 조회된 결과 대상으로 이력이 존재하는 월별 배열 생성
                    this.accTrList = this.fn_generateList(this.respDtlInfo.ppayCardList || [])
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
                        objList[i].cancelYn = this.cancelCodeList.indexOf(objList[i].ppaycdTrtpC) > -1 ? true : false

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
            * 검색조건(전체, 입금, 출금) 변경
            */
            fn_setSearchCond(flag) {
                this.srchFrag = flag
                this.fn_getDetailList('INIT')
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
            }
        }
    }
</script>
