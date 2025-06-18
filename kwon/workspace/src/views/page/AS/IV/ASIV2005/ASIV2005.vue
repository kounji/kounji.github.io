<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 투자 > 신탁/ISA상세
* @ 페이지설명 : 나의자산 > 자산 > 투자 > 신탁/ISA상세
* @ 파일명     : src/views/page/AS/IV/ASIV2005/ASIV2005.vue
* @ 작성자     : CS533039
* @ 작성일     : 2023-08-09
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-09             CS533039         최초작성
*************************************************************************/
-->
<template>
<div class="full_popup mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
		<div class="popup_header">
			<h1>신탁/ISA</h1>
		</div>	
		<div class="popup_content com_space_bottom com_bg_type00">
				
			<div class="asset_info_box">
				<div class="com_inner">
					<div class="asset_info_wrap">
						<div class="asset_info">
							<dl>
								<dt>{{respInfo.acWrsnm}}</dt>
								<dd>
									<span class="account_num">{{respInfo.mydtAcno}}</span>
								</dd>
							</dl>
							<div class="bank_icon"> 
								<i :class="respInfo.infOfrmnOrgC"><span class="blind">{{respInfo.infOfrmnOrgnm}}</span></i>
							</div>
						</div>

						<div class="asset_price_wrap">
							<div class="amount">평가금액</div>
							<div class="asset_price">
								<span class="num counter" :data-count="respInfo.acEvlam">{{respInfo.acEvlam | numberFilter}}</span>원
							</div>
							<div class="asset_price_list">
								<span>계좌잔액</span>
								<span class="price"><em class="num">{{respInfo.acNowBac | numberFilter}}</em>원</span>
							</div>
						</div>
					</div>

					<div class="asset_detail">
						<ul class="list_type_2023">
							<li>
								<dl>
									<dt>개설일</dt>
									<dd class="num">{{respInfo.opDt | dateFilter('YYYY.MM.DD')}}</dd>
								</dl>
								<dl>
									<dt>만기일</dt>
									<dd class="num">{{respInfo.dueDt | dateFilter('YYYY.MM.DD')}}</dd>
								</dl>
								<dl>
									<dt>운용상품 현황</dt>
									<template v-if="this.respInfo.tswrsEpyCn > 0">
										<dd><a href="javascript:void(0)" class="link_arrow" @click="fn_openSlidePopup()">{{respInfo.tswrsEpyCn | numberFilter}}개</a></dd>
									</template>
									<template v-else>
										<dd>{{respInfo.tswrsEpyCn | numberFilter}}개</dd>
									</template>
								</dl>	
								<dl>
									<dt>운용상품금액 합계</dt>
									<dd class="num" :data-count="respInfo.tswrsEpyAm">{{respInfo.tswrsEpyAm | numberFilter}}원</dd>
								</dl>	
							</li>
						</ul>
					</div>
				</div>

				<button type="button" class="btn_view_detail">더보기</button>
			</div>

			<div class="com_inner">
				<div class="new_period_box pb20">
					<div class="tit_area">
						<a href="javascript:void(0);" title="팝업열기" role="button" @click.prevent="fn_openPeriodPop()" class="num">{{startDay}} ~ {{endDay}}</a>
					</div>
				</div>
			</div>
			
            <template v-if="trList.length > 0">
                <div class="com_inner pt0">
                    <div class="asset_more_list">
                        <ul>
                            <li v-for="(item, idx) in trList" :key="idx">
                                <dl class="breakdown">
                                    <dt>{{item.tsIsaTrDscNm}}</dt>
                                    <dd class="num">{{item.tsIsaTram | numberFilter}}원</dd>
                                </dl>
                                <div class="date">{{item.mydtTrDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="com_inner">
                    <a href="javascript:void(0);" role="button" @click="fn_showMoreList()" class="com_btn_more" v-show="lsPageYn==='1'">더보기</a>
                </div>
            </template>
            <template v-else>
                <!-- 조회내역이 없을경우 -->
                <div class="no_data_box no_data_box01 grayExclamationType">
                    <div class="no_data_list">
                        <p class="txt_sub">조회된 정보가 없습니다.</p>
                    </div>
                </div>
                <!--// 조회내역이 없을경우 -->
            </template>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'
	import {dateFormat} from '@/utils/date'
	//import _ from 'lodash'
	
	import ASIV2006 from '@/views/page/AS/IV/ASIV2006/ASIV2006'  
	
    export default {
        name : "ASIV2005",
        data: () => {
            return {
                objIvInfo   : {}, //전달 파라미터
                respInfo    : {}, //응답헤더정보
                respDtlInfo : {}, //응답상세목록정보
                trList      : [], //최종결과 리스트
                today       : "", //오늘 날짜
                startDay    : "", //조회 시작일
                endDay      : "", //조회 끝일
                pageNum     : 0,  //페이지번호
                lsPageYn    : "", //다음페이지존재여부 '1':존재 , '0':미존재 
                
                tswrsEpyaAm : 0,  //운용상품평가금액합계 
                tranList    : [], //임시 리스트
            }	
        },
        mixins: [
            popupMixin,
            commonMixin
		],
        created() {
            //초기데이타 세팅
            this.objIvInfo = this.params.objIvInfo    //전달받은 파라미터

            this.today = new Date();
            this.endDay = dateFormat(this.today, "YYYY.MM.DD");
            this.startDay = this.getDay(this.endDay, "12", "pre");

            this.pageNum  = 1   // 페이지번호

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
						$('.btn_view_detail').text('접기');
					}else {
						$('.asset_detail').slideUp('slow');
						$('.btn_view_detail').text('더보기');
					}
				});
			},
            getData() {
                
                ////////
                // 신탁ISA 기본조회
                //
				const config = {
					url: '/as/iv/31r01',
                    data: {
                        "mydtCusno"      : this.objIvInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objIvInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objIvInfo.mydtAcno
                        , "mydtScNo"     : this.objIvInfo.mydtScNo
                        , "bsnDsc"       : this.objIvInfo.bsnDsc
                    }
				}
				apiService.call(config).then(response => {
                    this.respInfo = response;
                    this.tswrsEpyCn = this.respInfo.tswrsEpyCn;
                    this.tswrsEpyAm = this.respInfo.tswrsEpyAm;
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
					url: '/as/iv/32r01',
                    data: {
                        "mydtCusno"      : this.objIvInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objIvInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objIvInfo.mydtAcno
                        , "mydtScNo"     : this.objIvInfo.mydtScNo
                        , "inqStDt"      : this.startDay.split(".").join("")  //시작일
                        , "inqEdDt"      : this.endDay.split(".").join("")    //종료일
                        , "pageNum"      : this.pageNum    //페이지번호
                    }
				}
				apiService.call(config).then(response => {
                    this.respDtlInfo = response;
                    this.lsPageYn    = this.respDtlInfo.lsPageYn || ""

                    this.trList = this.fn_generateList(this.respDtlInfo.trList || [])
				});
            },

             /*
            * 결과리스트 가공.
            */
            fn_generateList(objList) {                
                if(objList.length > 0) {
                    for(let i=0; i < objList.length; i++) {
                        if(objList[i].mydtTrDtm != "00000000000000"){
                            this.tranList.push(objList[i])
                        }
                    }
                } else {
                    this.tranList = []
                }

				//return _.orderBy(this.tranList, 'trDt', 'desc')
				return this.tranList
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
            * 운용상품현황 팝업
            */
            fn_openSlidePopup() {
                const popParams = {
                    "mydtCusno"     : this.objIvInfo.mydtCusno,
                    "infOfrmnOrgC"  : this.objIvInfo.infOfrmnOrgC,
                    "mydtAcno"      : this.objIvInfo.mydtAcno,
                    "mydtScNo"      : this.objIvInfo.mydtScNo,
                    "tswrsEpyAm"	: this.tswrsEpyAm,
                }
                const config = {
					params : {"objIvInfo" : popParams},
					renderer : {
						component : ASIV2006
					}
                }
                
                //console.log(this.tswrsEpyAm);
				
                modalService.openSlidePagePopup(config).then(() => {
                })
            },			
        }
    }

</script>