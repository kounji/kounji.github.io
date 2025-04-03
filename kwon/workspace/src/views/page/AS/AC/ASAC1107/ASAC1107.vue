<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 예금 > IRP상세
* @ 페이지설명 : 나의자산 > 자산 > 예금 > IRP상세
* @ 파일명     : src/views/page/AS/AC/ASAC1107/ASAC1107.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-17              CS515729                 최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>연금</h1>			
		</div>
        <div class="popup_content com_no_bottom com_bg_type00">
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
									<div class="num">{{respInfo.mydtAcno}}</div>
								</div>
							</div>
						</div>
                        <div class="totalprice p-l mt15 point_gray">
							총 평가금액
                            <div class="com_tooltip_type02 com_tooltip_type03">
                                <a href="javascript:void(0);" @click.prevent="fn_openToolTip" class="com_btn_info">
                                    <em class="com_icon_info3"><span class="blind">툴팁열기</span></em>                  
                                    <!--!!!!!!!!!!!툴팁 화살표 관련 : 툴팁 클릭시 display : block 
                                        , 툴팁 닫을 때 display : none 처리 부탁드립니다!!!!!!!!!-->
                                    <span class="arrow" v-if="isToolTip"></span>
                                    <!--!!!!!!!!!!!툴팁 화살표 관련 : 툴팁 클릭시 display : block 
                                        , 툴팁 닫을 때 display : none 처리 부탁드립니다!!!!!!!!!-->
                                </a>                          
                                <div class="com_ballon_type01 com_ballon_type02" style="top:12.5rem" v-if="isToolTip">       
                                    <div>해외 거래 상품의 경우 전일자 환율 기준 원화로 환산한 금액이 반영되어 있어 조회 시점에 따라 실제 금액과 다를 수 있습니다.
                                        <a href="javascript:void(0);" @click.prevent="fn_openToolTip" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                    </div> <!-- 말풍선영역 -->
                                </div>
                            </div>
                        </div>
						<div class="bill p-l align mt5">
							<span class="num counter">{{respInfo.acEvlam | numberFilter}}</span><span class="text fs25">원</span>
						</div>
						<div class="text mt6 p-l bold">투자원금 {{respInfo.acRvgAm | numberFilter}}원</div>
						
						<div class="box_toggle_wrap">
							<div class="box_toggle">
								<div class="toggle-box">
									<div data-ui-toggle="box">									
										<div class="view-box">
											<div class="info">
												<div class="title">계좌개설일</div>
												<div class="num">{{respInfo.mydtOpDt | dateFilter('YYYY.MM.DD')}}</div>
											</div>
											<div class="info">
												<div class="title">최초입금일</div>
												<div class="num">{{respInfo.firRvDt | dateFilter('YYYY.MM.DD')}}</div>
											</div>
											<div class="info">
												<div class="title">연금개시일</div>
												<div class="num">{{respInfo.pnsStrtStDt | dateFilter('YYYY.MM.DD')}}</div>
											</div>
											
                                            <template v-if="irpDtlList.length > 0">
                                                <div class="devider"></div>
                                                <template v-for="(item, idx) in irpDtlList">
                                                    <a href="javascript:void(0);" @click="fn_openSlidePopup(item)" class="info" :key="idx">
                                                        <div class="title longtitle">{{item.acWrsnm}}</div>
                                                        <div class="num"></div>
                                                    </a>
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
			<!-- 전체,입금만,출금만 -->
			<div class="com_inner">
				<div class="new_period_box">
					<div class="tit_area">
                        <a href="javascript:void(0);" title="팝업열기" role="button" @click.prevent="fn_openPeriodPop()"><span class="tit">{{startDay}} ~ {{endDay}}</span></a>
					</div>
				</div>
			</div>
			<!--// 전체,입금만,출금만 -->

            <template v-if="accTrList.length > 0">
                <ul class="list_more_box">
                    <li v-for="(monthObj, mIdx) in accTrList" :key="'mon_'+mIdx">
                        <div class="com_inner" >
                            <div class="new_tit_area">
                                <div class="tit"><em>{{monthObj.yyyyMM | dateFilter('YYYY')}}</em><span>년</span><em>{{monthObj.yyyyMM | dateFilter('MM')}}</em><span>월</span></div>
                            </div>              
                            <ul class="list_type_02" :key="mIdx" :class="mIdx === accTrList.length-1 ? 'com_list_type01':''">
                                <li v-for="(item, dIdx) in monthObj.monList" :key="'day_'+dIdx">
                                    <dl>
                                        <dt>
                                            <div><em>{{item.irpAcTrDscNm}}</em></div>
                                            <span>{{item.trDt | dateFilter('YYYY.MM.DD')}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{item.irpAcTram | numberFilter}}</em>
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

        <a href="javascript:void(0);" role="button" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>
	</div>
    
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {dateFormat} from '@/utils/date'
    import _ from 'lodash'

    import ASAC1108 from '@/views/page/AS/AC/ASAC1108/ASAC1108'

    export default {
        name : "ASAC1107",
        data: () => {
            return {
                objAccInfo  : {}, //전달 파라미터
                respInfo    : {}, //응답헤더정보
                respDtlInfo : {}, //응답상세목록정보
                today       : "",     // 오늘 날짜
                startDay    : "",     // 조회 시작일
                endDay      : "",     // 조회 끝일
                irpDtlList  : [],     // 개별운용상품리스트
                pageNum     : 0,      // 페이지번호
                lsPageYn    : "",     // 다음페이지존재여부 '1':존재 , '0':미존재 
                isToolTip   : false,    //tooltip

                tranList    : [],     // 임시 리스트
                accTrList   : [],     // 최종 결과 리스트
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
            this.endDay = dateFormat(this.today, "YYYY.MM.DD")
            this.startDay = this.getDay(this.endDay, "12", "pre")

            this.pageNum  = 1   // 페이지번호
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
                this.getData()

            },
            getData() {
                ///////////////////////////////
                // 기본조회
                ///////////////////////////////
				const config = {
                    url: '/as/ac/07r01',
                    data: {
                        "mydtCusno"      : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objAccInfo.mydtAcno
                    }
                }
				apiService.call(config).then(response => {
                    this.respInfo = response;
                    this.irpDtlList = this.respInfo.irpDtlList || []
                    this.fn_getDetailList('INIT');
				})
            },

            /*
            * 계좌 상세내역조회
            */
            fn_getDetailList(mod) {
                // 날짜 변경시 검색결과 초기화
                if(mod === 'INIT') {
                    this.pageNum  = 1
                    this.tranList = []
                }

                var param = this.objAccInfo;
				param.inqStDt = this.startDay.split(".").join("");  //시작일
                param.inqEdDt = this.endDay.split(".").join("");    //종료일
                param.pageNum = this.pageNum    //페이지번호

				const config = {
					url: '/as/ac/07r02',
                    data: {
                        "mydtCusno"      : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objAccInfo.mydtAcno
                        , "inqStDt"      : this.startDay.split(".").join("")  //시작일
                        , "inqEdDt"      : this.endDay.split(".").join("")    //종료일
                        , "pageNum"      : this.pageNum    //페이지번호
                    }
                }
				apiService.call(config).then(response => {
                    this.respDtlInfo = response
                    this.lsPageYn    = this.respDtlInfo.lsPageYn || ""

                    // 조회된 결과 대상으로 이력이 존재하는 월별 배열 생성
                    this.accTrList = this.fn_generateList(this.respDtlInfo.irpAccTrList || [])
                })
            },

            /*
            * 결과리스트 가공.
            */
            fn_generateList(objList) {
                if(objList.length > 0) {
                    for(let i=0; i < objList.length; i++) {
                        objList[i].yyyyMM = dateFormat(objList[i].trDt, "YYYYMM")
                        this.tranList.push(objList[i])
                    }
                } else {
                    this.tranList = []
                }

                // 거래일시 기준 정렬
                this.tranList = _.orderBy(this.tranList, 'trDt', 'desc')

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

            getDay(inqEndDay, periodMonth, flag) {
				var period = parseInt(periodMonth);
                var day = new Date(inqEndDay.split(".").join("/"));
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
            * IRP 개별운용상품 팝업
            */
            fn_openSlidePopup(irpDtlInfo) {
                const config = {
                    params : {
                        "irpDtlInfo" : irpDtlInfo,
                    },
                    renderer : {
                        component : ASAC1108
                    }
                }
                modalService.openSlidePagePopup(config).then(() => {
                })
            },

            /**
            * Tooltip 표시
            */
            fn_openToolTip() {
                this.isToolTip = !this.isToolTip
            },
        }
    }
</script>