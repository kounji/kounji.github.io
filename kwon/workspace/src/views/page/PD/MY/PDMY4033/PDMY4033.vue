<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 도전목표챌린지 > 금융목표 > 지출목표
* @ 페이지설명 : 전체메뉴 > 도전목표챌린지 > 금융목표 > 지출목표 > 지출목표(상세조회)
* @ 파일명     : src/views/page/PD/MY/PDMY4033/PDMY4033.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-08-09
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-09              CS516029                 최초작성
* 2023-08-21              CS533453              고도화 파일명, UI 변경 및 고도화 개발(PDMY1108.vue -> PDMY2033.vue)
* 2025-02-04              CS541015              고도화 파일명, 연결화면 변경(PDMY2033.vue -> PDMY4033.vue)
*************************************************************************/
-->
<template>
    <div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">지출목표</h1>
			<!-- <a href="#nolink" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
        
        <div class="popup_content com_bg_type00"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<!-- mygoal_top_box -->
				<div class="mygoal_top_box">
					<div class="content_wrap mt10">
						<p class="notice_red_2023" v-if="overYn == 'Y'">목표금액을 초과했어요!</p>
						<div class="title">
							오늘까지<br>
							<span class="num">{{preXpsAm | numberFilter}}</span>원 지출 하고 있어요.
						</div>
					</div>

                    <!-- 그래프 100% -->
					<div class="custom_box mt20"><!-- 2020.06.29 mt20 추가 -->
						<div class="content_wrap">
							<!-- 2020.07.03 progressBar 수정  -->
							<div class="progressBar_wrapper">
								<div class="progressBar">
									<div class="bar">
										<div class="popover_wrap">
											<span class="popover">
												<em class="num">{{expensePer}}</em>%
												<span class="arrow"></span>
											</span>
										</div>
									</div>
								</div>
							</div>
							<!-- 2020.07.03 progressBar 수정  -->
						</div>
					</div>

                    <div class="list_gray_box mt20">
						<dl>
							<dt class="pointColor green">{{curYm | dateFilter('M')}}월의 지출목표</dt>
							<dd><span class="num">{{xpsObtAm | numberFilter}}</span>원</dd>
						</dl>
                        <template v-if="overYn == 'N'">
                            <dl>
                                <dt>남은 금액</dt>
                                <dd><span class="num">{{bacAm | numberFilter}}</span>원</dd>
                            </dl>
                            <dl>
                                <dt>남은 기간</dt>
                                <dd class="num">D-<em class="num">{{bacDt}}</em>일</dd>
                            </dl>
                        </template>
                        <template v-else>
                            <dl class="over">
                                <dt>초과 금액</dt>
                                <dd><span class="num">{{bacAm | numberFilter}}</span>원</dd>
                            </dl>
                            <dl>
                                <dt>남은 기간</dt>
                                <dd class="num">D-{{bacDt}}일</dd>
                            </dl>
                        </template>
					</div>
				</div>
                <!-- 남은 금액 50,000원 or 남은 기간 2일 미만인 경우 해당 항목 hidden 처리 -->
                <p class="mygoal_sub_text" v-show="bacAm >= 50000 || (bacDt >= 2 && bacAm >= 50000)">매일 <span class="num pointColor green">{{dayAm | numberFilter}}원</span> 이내로 지출 해 보세요!</p>
			</div>

            <hr class="hr02">

			<div class="com_inner">	
				<strong class="com_box_tit mt10">카테고리 별 지출</strong>

                <template v-for="(subInfo, index) in subList">
                <!-- 쇼핑/여가/미용 -->
				<div class="com_box_type01 toggle_list_box2 custom_list title_icon_type" :key="'key_'+index">
					<div data-ui-toggle="box" class="toggle_box_area">
						<button type="button" class="view_btn" aria-expanded="false">
							<div class="new_tit_area">
								<div class="tit" :class="subInfo.asetAmnCtgrId">{{subInfo.asetAmnCtgrNm}}</div>
								<span class="total_price">
									<em class="num">{{subInfo.ctgrPreXpsAm  | numberFilter}}</em><em class="unit">원</em>
								</span>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
                        <p v-if="subInfo.ctgrXpsObtAm - subInfo.ctgrPreXpsAm < 0" class="notice_red_2023">목표금액을 초과했어요!</p>
					</div>

					<ul class="view_cont">
						<li>
							<dl>
								<dt>정기지출</dt>
								<dd>
									<span class="com_price">
										<em class="num">{{subInfo.ctgrFxtmXpsAm  | numberFilter}}</em><em class="unit">원</em>
									</span>
								</dd>
							</dl>
							<dl>
								<dt>변동지출</dt>
								<dd>
									<span class="com_price">
										<em class="num">{{subInfo.ctgrVarXpsAm  | numberFilter}}</em><em class="unit">원</em>
									</span>
								</dd>
							</dl>
						</li>
					</ul>

					<ul class="price_cont">
						<li>
							<dl :class="subInfo.ctgrXpsObtAm - subInfo.ctgrPreXpsAm < 0 ? 'over' : ''">
								<dt v-if="subInfo.ctgrXpsObtAm - subInfo.ctgrPreXpsAm < 0">초과 금액</dt>
								<dt v-else>남은 금액</dt>
								<dd>
									<span class="com_price">
										<em class="num">{{subInfo.ctgrXpsObtAm - subInfo.ctgrPreXpsAm > -1 ? subInfo.ctgrXpsObtAm - subInfo.ctgrPreXpsAm : (subInfo.ctgrXpsObtAm - subInfo.ctgrPreXpsAm) * -1 | numberFilter}}</em><em class="unit">원</em>
									</span>
								</dd>
							</dl>
							<dl>
								<dt>목표 금액</dt>
								<dd>
									<span class="com_price">
										<em class="num">{{subInfo.ctgrXpsObtAm | numberFilter}}</em><em class="unit">원</em>
									</span>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
				<!-- //쇼핑/여가/미용 -->
                </template>
            </div>
		</div>

        <div class="popup_footer fixed">
			<div class="com_btnhalfbox_type02">
				<a @click.prevent="deleteExpensePerpose()" href="javascript:void(0);" role="button" class="btn btn_mint_gray">삭제</a>
				<a @click.prevent="goExpensePerpose()" href="javascript:void(0);" role="button" class="btn btn_mint">목표수정</a>
			</div>
		</div>

        <a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll()"><span class="blind">팝업닫기</span></a>
    </div>


</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import {getTmmRmDds, dateFormat} from '@/utils/date'
import {round} from '@/utils/number'
import PDMY4032 from '@/views/page/PD/MY/PDMY4032/PDMY4032'

    export default {
        name : "PDMY4033",
        data: () => {
            return {
                modifyYn:"",           // 수정여부
                stYm: "",              // 조회년월
                curYm: "",             // 현재년월
                preXpsAm:0,            // 소비금액
                xpsObtAm:0,            // 지출목표금액
                subList:[],            // 지출목표 조회내역 목록
                bacAm:0,               // 잔액(남은금액)
                bacDt:0,               // 잔액(남은기간)
                dayAm:0,               // 남은 기간 기준 지출가능금액
                progressBarExpense:{}, // 목표대비 지출비율 style
                expensePer:0,          // 목표대비 지출비율 %
                styleText:"",          // 지출목표 문구
                overYn:"",             // 목표금액 초과여부
            }
        },
        props : {
            //totSumAmt:Number,
        },
        mixins: [
            popupMixin
           ,commonMixin
        ],
        methods: {
            initComponent(param) {
                this.curYm = dateFormat(new Date(), 'YYYYMM') // 현재년월
                this.modifyYn = "Y"
                this.stYm = param.stYm // 조회기준년월
                this.preXpsAm = param.preXpsAm // 소비금액

                this.getDetailData();
            },

            // 상세조회
            getDetailData() {

                // 지출목록 상세 조회
                const config = {
                    url: '/pd/my/32r01',        // /pd/my/02r01
                    data: {"mydtCusno": this.getUserInfo('mydtCusno'),"stYm" : this.stYm}
                };

                apiService.call(config).then(response => {
                    console.log("==============response==============")
                    console.log(response)

                    // this.subList  = response.subList || []
                    this.xpsObtAm = response.xpsObtAm || 0      // 지출목표금액(총합계)
                    this.preXpsAm = response.preXpsAm || 0      // 당월지출금액(총합계)
                    this.styleText = response.styleText || ''
                    
                    let tempCategoryList = response.subList || []
                    let result = []
                    tempCategoryList.reduce(function(res, value) {
                        if(!res[value.asetAmnCtgrId]) {
                            res[value.asetAmnCtgrId] = 
                            { 
                                asetAmnCtgrId : value.asetAmnCtgrId, 
                                ctgrnm : value.ctgrnm, 
                                ctgrFxtmAm: 0, 
                                ctgrVarAm: 0, 
                                ctgrXpsObtAm: 0, 
                                ctgrPreXpsAm: 0, 
                                ctgrBefXpsAm: 0 
                            }
                            result.push(res[value.asetAmnCtgrId])
                        }

                        res[value.asetAmnCtgrId].ctgrFxtmAm	    += Number(value.ctgrFxtmAm)		    // 카테고리정기지출금액
                        res[value.asetAmnCtgrId].ctgrVarAm	    += Number(value.ctgrVarAm)		    // 카테고리변동지출금액
                        res[value.asetAmnCtgrId].ctgrXpsObtAm	+= Number(value.ctgrXpsObtAm)		// 카테고리목표금액
                        res[value.asetAmnCtgrId].ctgrPreXpsAm	+= Number(value.ctgrPreXpsAm)		// 카테고리당월지출금액
                        res[value.asetAmnCtgrId].ctgrBefXpsAm	+= Number(value.ctgrBefXpsAm)		// 카테고리전월지출금액

                        return res
                    }, {})

                    console.log("====================result====================")
                    console.log(result)

                    for(let i=0; i < result.length; i++){
                        if(result[i].asetAmnCtgrId == 'AS60000000') {
                            this.unClfYn = 'Y'
                            this.unClfAm = Number(result[i].avgXpsAm)	// 미분류 지출금액
                        } else {
                            var inputObj = {};
                            inputObj.asetAmnCtgrId  = result[i].asetAmnCtgrId		    // 카테고리ID
                            inputObj.asetAmnCtgrNm  = result[i].ctgrnm		            // 카테고리명
                            inputObj.ctgrFxtmXpsAm	= Number(result[i].ctgrFxtmAm)		// 정기지출금액
                            inputObj.ctgrVarXpsAm	= Number(result[i].ctgrVarAm)       // 변동지출금액
                            inputObj.ctgrXpsObtAm	= Number(result[i].ctgrXpsObtAm)	// 목표금액(정기지출금액+변동지출금액)
                            inputObj.ctgrPreXpsAm   = Number(result[i].ctgrPreXpsAm)	// 당월지출금액
                            inputObj.ctgrBefXpsAm   = Number(result[i].ctgrBefXpsAm)	// 전월지출금액

                            this.subList.push(inputObj)
                        }
                    }

                    console.log("====================this.subList====================")
                    console.log(this.subList)

                    this.avgXpsObtAm	= Number(response.avgXpsTotAmt)		// 지출목표금액(미분류 포함)

                    this.bacAm = this.xpsObtAm - this.preXpsAm // 남은금액


                    if(this.bacAm < 0) {
                        this.overYn = "Y"
                    } else {
                        this.overYn = "N"
                    }
                    this.bacDt = Number(getTmmRmDds() + 1)     // 남은일자(당월 잔여일수)

                    this.dayAm = Math.floor(this.bacAm / this.bacDt)

                    // 목표대비 지출비율 계산
                    let widthCal;
                    if(typeof this.preXpsAm == "undefined" || this.preXpsAm == 0) {
                        this.expensePer = 0 // 목표대비 지출비율
                        this.progressBarExpense = {'width':'0%'} // 목표대비 지출 style
                    } else {
                        widthCal = round((this.preXpsAm / this.xpsObtAm) * 100, 1)

                        this.expensePer = widthCal // 목표대비 지출비율
                        this.progressBarExpense = {'width':widthCal + '%'} // 목표대비 지출 style
                    }

                    this.$nextTick(() => {
                        this.drawProgressbar()
                    })
                });
            },

            drawProgressbar() {
                var progressBar = $('.progressBar .bar');
                
                progressBar.each(function(){
                    var progressNum = $(this).children().find('.popover .num').text();
                    var popoverWrap = $(this).children('.popover_wrap');

                    if(progressNum >= 100) {
                        progressNum = 100;
                        $(this).addClass('over');
                        popoverWrap.css('transform','translateX(-100%)');// 230721 -100%로 수정
                        popoverWrap.animate({
                            left: progressNum + "%"
                        },2000,function(){
                            popoverWrap.addClass('full');
                        });
                    } else if(progressNum == 0) {
                        popoverWrap.addClass('zero');
                    } else {
                        popoverWrap.animate({
                            left: progressNum +'%'
                        },2000);
                    }

                    progressBar.css('width','0');
                    popoverWrap.css('left','0');				
                    $(this).animate({					
                        width: progressNum + '%',
                    },2000);
                    
                });
            },
            // setProgressBarClass(index) {
            //     let setClass = 'progressBar type'

            //     if(Number(index + 1) >= 10) {
            //         setClass += (index + 1)
            //     } else {
            //         setClass += '0' + (index + 1)
            //     }

            //     return setClass
            // },
            // setProgressBarStyle(xpsObtAm, ctgrPreXpsAm) {

            //     let styleCss

            //     if(ctgrPreXpsAm == 0) {
            //         styleCss = 'width:0%'
            //     } else {
                    
            //         let per = round((ctgrPreXpsAm / xpsObtAm) * 100, 1)

            //         // :: S :: 2021.08.31. add by CS515729. 
            //         // 15% 미만일때 text 표시위해 bar width 고정(15%)
            //         per = (per < 15) ? 15 : per
            //         // :: E :: 2021.08.31. add by CS515729. 

            //         styleCss = 'width:' + per + '%'                    
            //     }
                
            //     return styleCss
            // },
            deleteExpensePerpose() {

                const configConfirm = {
                    content: ['지출목표를 삭제하시겠습니까?'],
                    title  : "",
                }

                modalService.confirm(configConfirm).then(text => {
                    
                    if(text == "예") {

                        // 지출목표 삭제
                        const config = {
                            url: '/pd/my/33d02',        // /pd/my/02d01
                            //data: {"mydtCusno": this.getUserInfo('asetAmnCusno')} // 마이데이터고객번호

                            data: {"mydtCusno": this.getUserInfo('mydtCusno'),"stYm" : this.stYm}
                        };

                        apiService.call(config).then(response => {

                            if(response.rspCd == '0000'){
                                modalService.alert("목표가 삭제되었습니다.").then(() => {
                                    // 전체페이지 닫기
                                    this.closeAllData('reSelect')
                                    //this.closeAll()
                                });
                            } else {
                                modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {
                                    //this.close(response);
                                })
                            }
                        });
                    }
                })
            },
            goExpensePerpose() {
                let compName = PDMY4032
                
                var param = {
                    modifyYn : this.modifyYn, 
                    selectedCategory : this.subList, 
                    stYm : this.stYm, 
                    xpsObtAm : this.xpsObtAm / 10000
                }
                const config = {
                    component: compName,
                    params : param
                }

                modalService.openPopup(config).then(() => {

                })
            },
            // setRound(val) {
            //     return round(val, 1)
            // }
        },
        mounted() {
            this.initComponent(this.params)

            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
    }
</script>