<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 투자 > 투자상세(증권)
* @ 페이지설명 : 나의자산 > 자산 > 투자 > 투자상세(증권)
* @ 파일명     : src/views/page/AS/IV/ASIV1103/ASIV1103.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-10-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-10-13             CS515729                 최초작성
*************************************************************************/
-->
<template>
<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>증권</h1>
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
									{{respInfo.fncIvAcOnm}} 
									<div class="num">{{respInfo.mydtAcno}}</div>
								</div>
							</div>
							<button class="refresh new_refresh">
								<a href="javascript:void(0);" @click.prevent="fn_openHoldItemPoup()" class="com_btnround_type09"><span>보유상품</span></a>
							</button>
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
                                <div class="com_ballon_type01 com_ballon_type02" style="top:12.2rem" v-if="isToolTip">
                                    <div>해외 거래 상품의 경우 전일자 환율 기준 원화로 환산한 금액이 반영되어 있어 조회 시점에 따라 실제 금액과 다를 수 있습니다.
                                        <a href="javascript:void(0);" @click.prevent="fn_openToolTip" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                    </div> <!-- 말풍선영역 -->
                                </div>
                            </div>  
						</div>
						<div class="bill mt0 p-l align">
							<span class="num counter">{{respInfo.totAcEvlam | numberFilter}}</span><span class="text fs25">원</span>
						</div>
						<div class="text mt6 p-l bold">총 예수금 {{respInfo.totDncAm | numberFilter}}원</div>
						<div class="box_toggle_wrap">
							<div class="box_toggle">
								<div class="toggle-box">
									<div data-ui-toggle="box">									
										<div class="view-box">
											<div class="info">
												<div class="title">계좌개설일</div>
												<div class="num">{{respInfo.acOpDt | dateFilter("YYYY.MM.DD")}}</div>
											</div>
											<div class="info">
												<div class="title">세제혜택</div>
												<div class="text">{{getTxfrAplNm}}</div>
											</div>
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
					<div class="scroll_wrap">
                        <div class="checkbox_box">
                            <template v-for="(item, idx) in allCurcList">
                                <span class="cmm_radio" v-on:click="fn_changeCurc(item.curc)" :key="idx">
                                    <input type="radio" name="chk_in" aria-hidden="true" :id="'chk_'+item.curc" :value="item.curc" v-model="selCurc">
                                    <label :id="'chk_'+item.curc" role="radio" :aria-checked="selCurc === item.curc ? 'true' : 'false'">
                                        {{item.curc==='KRW' ? '원화' : item.curc}}
                                    </label>
                                </span>
                            </template>
                        </div>
                    </div>
				</div>
			</div>
			<!--// 전체,입금만,출금만 -->

			<div class="com_inner">
				<div class="list_type_infobox">
					<ul class="list_type_02">
						<li>
							<dl>
								<dt>
									<div>
										<em>예수금</em>
									</div>
								</dt>
								<dd>
									<span class="com_price">
										<em class="num">{{selCurcInfo.dncAm | numberFilter}}</em>
                                        <em class="unit">{{selCurcInfo.curc==='KRW' ? '원' : selCurcInfo.curc}}</em>
									</span>
								</dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt>
									<div>
										<em>신용대출</em>
									</div>
								</dt>
								<dd>
									<span class="com_price">
										<em class="num">{{selCurcInfo.crdLonAm}}</em>
                                        <em class="unit">{{selCurcInfo.curc==='KRW' ? '원' : selCurcInfo.curc}}</em>
									</span>
								</dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt>
									<div>
										<em>담보대출</em>
									</div>
								</dt>
								<dd>
									<span class="com_price">
										<em class="num">{{selCurcInfo.lnUsAm | numberFilter}}</em>
                                        <em class="unit">{{selCurcInfo.curc==='KRW' ? '원' : selCurcInfo.curc}}</em>
									</span>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
			</div>

            <template v-if="accTrList.length > 0">
                <ul class="list_more_box">
                    <li v-for="(monObj, mIdx) in accTrList" :key="'mon_'+mIdx">
                        <div class="com_inner">
                            <div class="new_tit_area">
                                <div class="tit">
                                    <em>{{monObj.yyyyMM | dateFilter('YYYY')}}</em><span>년</span>
                                    <em>{{monObj.yyyyMM | dateFilter('MM')}}</em><span>월</span>
                                </div>
                            </div>              
                            <ul class="list_type_02 list_type_etc" :key="mIdx">
                                <li v-for="(item, dIdx) in monObj.monList" :key="'day_'+dIdx" >
                                    <div>
                                        <strong class="tit_blue">{{item.trItmnm}}</strong>
                                        <span v-if="item.frStkXchgC">거래소 {{item.frStkXchgnm}}</span>
                                    </div>
                                    <dl>
                                        <dt>
                                            <div>
                                                <em>{{item.fncIvTrKdnm}}</em>
                                            </div>
                                            <span>{{item.mydtTrDtm | dateFilter('DD일 HH:mm:ss')}}</span>
                                            <span>수량 {{item.ivTrQt | numberFilter}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{item.mydtAcTram | numberFilter}}</em>
                                                <em class="unit">{{item.curc ==="KRW" ? '원' : item.curc}}</em>
                                            </span>
                                            <span class="com_price">
                                                <span>정산금액</span>
                                                <em class="num">{{item.ivAdjAm | numberFilter}}</em>
                                                <em class="unit">{{item.curc ==="KRW" ? '원' : item.curc}}</em>
                                            </span>
                                            <span class="com_price">
                                                <span>단가</span>
                                                <em class="num">{{item.fncivTrUpr | numberFilter}}</em>
                                                <em class="unit">{{item.curc ==="KRW" ? '원' : item.curc}}</em>
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
                <!-- 조회내역이 없을경우 S -->
                <div class="no_data_box">
                    <div class="no_data_list">
                        <p>조회된  정보가 없습니다.</p>
                    </div>
                </div>
                <!--// 조회내역이 없을경우 E -->
            </template>
		</div>

		<a href="javascript:void(0);" role="button" @click.prevent="close()" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {dateFormat} from '@/utils/date'
    import _ from 'lodash'

    import ASIV2004 from '@/views/page/AS/IV/ASIV2004/ASIV2004'

    export default {
        name : "ASIV1103",
        data: () => {
            return {
                objIvInfo   : {},   //전달파라미터
                respInfo    : {},   //응답결과 헤더
                respDtlInfo : {},   //응답결과 상세
                txfrAplYn   : "",   //세제적용여부
                allCurc     : "",   //전체통화코드 ex) KRW,USD,...
                allCurcList : [],   //전체통화코드리스트
                curtpAccBasicList : [],  //통화별 계좌기본목록

                selCurcInfo : {},

                selCurc     : "",   //선택된 통화코드
                isToolTip   : false,    //tooltip

                today       : "",   //오늘 날짜
                startDay    : "",   //조회 시작일
                endDay      : "",   //조회 끝일
                pageNum     : 0,      // 페이지번호
                lsPageYn    : "",     // 다음페이지존재여부 '1':존재 , '0':미존재

                tranList    : [],     // 임시 리스트
                accTrList   : [],   //월별그룹리스트
            }	
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        computed : {
            getTxfrAplNm() {
				return this.txfrAplYn  === "1" ? '적용' : '미적용'
            },
        },
        created() {
            this.objIvInfo = this.params.objIvInfo    //전달받은 파라미터

            this.today = new Date();
            this.endDay = dateFormat(this.today, "YYYY.MM.DD");
            this.startDay = this.getDay(this.endDay, "12", "pre");  // 1년전

            this.pageNum  = 1   // 페이지번호
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
                const config = {
					url: '/as/iv/03r01',
					data: {
                        "mydtCusno"    : this.objIvInfo.mydtCusno,
                        "infOfrmnOrgC" : this.objIvInfo.infOfrmnOrgC,
                        "mydtAcno"     : this.objIvInfo.mydtAcno,
                    }
                }
				apiService.call(config).then(response => {
                    this.respInfo = response

                    //세제혜택적용여부
                    this.txfrAplYn = this.respInfo.txfrAplYn

                    //전체통화코드
                    this.allCurc = this.respInfo.allCurc || ""
                    let tmpCurc = this.allCurc.split(",")
                    
                    for(let i=0; i < tmpCurc.length; i++) {
                        this.allCurcList.push({"curc" : tmpCurc[i]})
                    }

                    //통화별계좌기본목록
                    this.curtpAccBasicList = this.respInfo.curtpAccBasicList

                    //상세조회
                    this.fn_getDetailList('INIT')

                }).then(()=>{
                    //첫번째 통화코드 정보 
                    this.fn_changeCurc(this.allCurcList[0].curc)
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
                //거래내역 조회
                const config = {
					url: '/as/iv/03r02',
                    data: {
                          "mydtCusno"    : this.objIvInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objIvInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objIvInfo.mydtAcno
                        , "mydtScNo"     : this.objIvInfo.mydtScNo
                        , "inqStDt"      : this.startDay.split(".").join("")  //시작일
                        , "inqEdDt"      : this.endDay.split(".").join("")    //종료일
                        , "pageNum"      : this.pageNum    //페이지번호
                    }
				};
				apiService.call(config).then(response => {
                    this.respDtlInfo = response
                    this.lsPageYn    = this.respDtlInfo.lsPageYn || ""

                    // 조회된 결과 대상으로 이력이 존재하는 월별 배열 생성
                    this.accTrList = this.fn_generateList(this.respDtlInfo.stctsAccTrList || [])
				});
            },

            /*
            * 결과리스트 가공.
            */
            fn_generateList(objList) {
                if(objList.length > 0) {
                    for(let i=0; i < objList.length; i++) {
                        objList[i].yyyyMM = dateFormat(objList[i].mydtTrDtm, "YYYYMM")
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
						title: '기간 선택',
						startDate : this.startDay.split(".").join(""),
						endDate   : this.endDay.split(".").join("")
					}
				}
				modalService.openSelectMonth(config).then(response => {
                    this.startDay = dateFormat(response.startDate, "YYYY.MM.DD")
                    this.endDay   = dateFormat(response.endDate, "YYYY.MM.DD")
                    this.fn_getDetailList('INIT');
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
            },

            /**
            * Tooltip 표시
            */
            fn_openToolTip() {
                this.isToolTip = !this.isToolTip
            },

            /**
            * 통화코드 선택
            */
            fn_changeCurc(curc) {
                this.selCurc = curc
                this.selCurcInfo = _.find(this.curtpAccBasicList, {"curc":curc})
            },

            /*
            * 보유상품팝업
            */
            fn_openHoldItemPoup() {
                const popParams = {
                    "mydtCusno"     : this.objIvInfo.mydtCusno,
                    "infOfrmnOrgC"  : this.respInfo.infOfrmnOrgC,
                    "infOfrmnOrgnm" : this.respInfo.infOfrmnOrgnm,
                    "mydtAcno"      : this.respInfo.mydtAcno,
                    "fncIvAcOnm"    : this.respInfo.fncIvAcOnm
                }

                const config = {
                    component: ASIV2004,
                    params : {"objIvInfo" : popParams}
                }
                modalService.openPopup(config).then(() => {
                    console.log("")
                })
            }
        }
    }
</script>
