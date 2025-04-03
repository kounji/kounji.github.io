<!--
// 2025 NATIVE 호출 함수 수정
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 도전목표챌린지 > 버킷리스트 > 내차구입 상세
* @ 페이지설명 : 전체메뉴 > 도전목표챌린지 > 버킷리스트 > 내차구입 상세
* @ 파일명     : src/views/page/PD/MY/PDMY4030/PDMY4030.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-08-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-24              CS516029                 최초작성
* 2022-07-06              CS528053                 고도화 파일명, UI 변경 및 고도화 개발(PDMY1118.vue -> PDMY1006.vue)
* 2022-09-21              CS528061                 고도화 개발
* 2023-08-21              CS533453                 고도화 파일명, UI 변경 및 고도화 개발(PDMY1006.vue -> PDMY2030.vue)
* 2025-01-24              CS541015                 고도화 파일명, 연결화면 변경(PDMY2030.vue -> PDMY4030.vue)
*************************************************************************/
-->
<template>
    <div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">버킷리스트</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content com_bg_type00"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner" :class="goalCheck">
				<div class="mygoal_title_area">
					<p class="pointColor green">내 차고에 드림카 채우기!</p>
					<strong class="titH1">{{obtnm}}</strong>

                    <template v-if="carCtrimNo !== undefined && carCtrimNo !== null && carCtrimNo !== ''">
                        <p class="sub_text">{{carBrannm}}<span class="dot_text">{{vhcModlnm}}</span></p>
                        <!-- <div class="head_sub">{{carBrannm}}</div>
                        <div class="head_sub2">{{vhcModlnm}} {{carCtrimNm}}</div> -->
                    </template>
                    <template v-else>
                        <p class="error_meg" aria-live="assertive" role="alert">동급 모델로 변경이 필요해요.</p>
                    </template>
				</div>
                
                <div class="mygoal_top_box">
                    <div class="content_wrap mt20">
                        <div class="title">
                            <template v-if="prgStsCd == '1'">
                                오늘까지 <br/>
                                <span class="num">{{acNowBacTotAm | numberFilter}}</span>원 모으고 있어요.
                            </template>
                            <template v-else>
                                목표기간까지 <br/>
                                <span class="num">{{acNowBacTotAm | numberFilter}}</span>원 모았어요.
                            </template>
                        </div>
                    </div>

                    <!-- 그래프 100% -->
					<div class="custom_box mt20"><!-- 2020.06.29 mt20 추가 -->
						<div class="content_wrap">
							<div class="progressBar_wrapper">
								<div class="progressBar">
									<div class="bar" id="progressBar">
										<div class="popover_wrap" id="popoverWrap">
											<span class="popover">
												<em class="num" id="popoverNum">{{setRound(obtPer)}}</em>%
												<span class="arrow"></span>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

                    <div class="list_gray_box mt20">
                        <template v-if="goalCheck == 'success'">
                            <a @click.prevent="goPerposePage" href="javascript:void(0);">
                                <p class="icon_type">
                                    목표를 이루셨네요!<br>
                                    새로운 도전을 해 보실까요?
                                </p>
                            </a>
                        </template>
                        <template v-else-if="goalCheck == 'fail'">
                            <a @click.prevent="goPerposePage" href="javascript:void(0);">
                                <p class="icon_type">
                                    아쉬운 도전이었어요!<br>
                                    새로운 목표를 달성해 볼까요?
                                </p>
                            </a>
                        </template>
                        <template v-else>
                            <dl>
                                <dt>남은 금액</dt>
                                <dd><span class="num">{{bacAm | numberFilter}}</span>원</dd>
                            </dl>
                            <dl>
                                <dt>남은 기간</dt>
                                <dd class="num">D-<em class="num">{{bacDt | numberFilter}}</em>일</dd>
                            </dl>
                        </template>
                    </div>
                </div>

                <div class="mygoal_sub_text" v-if="bacAm > 0 && goalCheck !== 'fail'">
					<p><span class="pointTxt type02">{{obtDt | dateFilter('YYYY')}}년 {{obtDt | dateFilter('MM')}}월 {{obtDt | dateFilter('DD')}}일</span>까지</p>
					<p><span class="pointTxt type02">{{fncObtAm | numberFilter}}원</span>을 모으려면</p>
					<p class="mt20">매 월 <span class="num pointColor green">{{dayAm | numberFilter}}원</span>씩 모으면 가능해요!</p>
				</div>
			</div>

            <hr class="hr02">

            <!-- 연결된 계좌 -->
            <div class="com_inner">	
                <template v-if="subList.length > 0">
                    <strong class="com_box_tit mt10">연결된 계좌</strong>

                    <ul class="account_list_2023">
                        <li v-for="(subInfo, index) in subList" :key="index">
                            <dl>
                                <dt>
                                    <i class="ico_bank" :class="subInfo.infOfrmnOrgC"><span class="blind">{{subInfo.infOfrmnOrgNm}}</span></i>
                                    <span class="name">{{subInfo.acWrsnm}}</span>
                                    <span class="num">{{subInfo.mydtAcno}}</span>
                                </dt>
                                <dd>
                                    <em class="num">{{subInfo.acNowBac | numberFilter}}</em>원
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <!-- 07/24 연결된 계좌 없는 경우 추가 -->
                    <div class="mygoal_no_account" v-if="prgStsCd == '1'">
                        <div class="box_border_link iconType01">
                            <a role="button" @click.prevent="goExpensePerpose()" href="javascript:void(0);">
                                <span class="arrow">
                                    연결된 계좌가 없네요!<br>
                                    고객님 계좌를 다시 선택해주세요!
                                </span>
                            </a>
                        </div>
                    </div>
                    <!-- //07/24 연결된 계좌 없는 경우 추가 -->
                </template>

                <!-- 07/24 배너 수정 -->
                <div class="inner_banner mt40">
                    <a href="javascript:void(0);" role="button" @click.prevent="banLink('newCar')">
                        <img src="@/assets_v40/images/banner/img_benner_12.png" alt="나에게 맞는 신차 추천과 견적 서비스까지 한번에!">
                    </a>
                </div>
                <!-- //07/24 배너 수정 -->

                <!-- 내 차 살때 현명한 대출 방법은 07/24 추가 -->
                <div class="custom_box mt40">
                    <div class="content_wrap">
                        <div class="com_box_type001">
                            <div class="tit_area">
                                <span>내 차 살때 현명한 대출 방법은?</span><br>
                                한도 알아보고 우대 금리 받으세요
                            </div>
                            <ul class="list_type_001">
                                <li><a href="javascript:void(0);" @click.prevent="banLink('loanLmt')">대출한도조회<i></i></a></li>
                                <li><a href="javascript:void(0);" @click.prevent="banLink('carLoanLmt')">NH콕마이카신용대출<i></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- //내 차 살때 현명한 대출 방법은 07/24 추가 -->
            </div>
		</div>

		<div class="popup_footer fixed">
            <!-- 목표 종료일이 남은 경우-->
			<div class="com_btnhalfbox_type02" v-if="prgStsCd == '1'">
				<a href="javascript:void(0);" class="btn btn_mint_gray" role="button" @click.prevent="deleteExpensePerpose()" aria-disabled="false">삭제</a>
				<a href="javascript:void(0);" class="btn btn_mint" role="button" @click.prevent="goExpensePerpose()" aria-disabled="false">목표수정</a>
			</div>
            <!-- // 목표 종료일이 남은 경우 -->

            <!-- 목표가 종료된 경우-->
            <div class="btn_full_box" v-if="prgStsCd == '2'">
                <a href="javascript:void(0);" class="btn btn_mint_gray" @click.prevent="deleteExpensePerpose()">삭제</a>
            </div>
            <!-- // 목표가 종료된 경우-->
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll('reSelect')"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import appService from '@/service/appService'
import {dateFormat, dayDiff} from '@/utils/date'
import {round} from '@/utils/number'
import PDMY4024 from '@/views/page/PD/MY/PDMY4024/PDMY4024'
import PDMY4005 from '@/views/page/PD/MY/PDMY4005/PDMY4005'
import PDPD1108 from '@/views/page/PD/PD/PDPD1108/PDPD1108'
import _ from 'lodash'

export default {
    name : "PDMY4030",
    data: () => {
        return {
            mydtCusno		: "",	// 마이데이터고객번호
            fncObtDsc		: "",	// 01		: 돈모으기 02		: 투자목표
            sqno		    : 0, 	// 일련번호(상세조회시 필수)
            prgStsCd		: "",	// 진행상태
            carCtrimNo		: '',	// 자동차트림번호 
            vhcModlnm		: '',	// 차량모델명
            carCtrimNm		: '',	// 자동차트림명 
            carLineupMdyrNm : '',	// 자동차라인업연식명
            carBrannm		: '',	// 자동차브랜드명
            carCtrimSelAm	: 0, 	// 자동차트림판매금액
            basyy	    	: "",	// 기준년도
            basmm	    	: "",	// 기준월
            fncObtAm		: 0, 	// 금융목표금액
            obtDt		    : "",	// 목표일자
            fncObtAchvYn	: "",	// 금융목표달성여부
            acNowBacTotAm	: 0, 	// 계좌현재잔액총액
            subList		    : [],	// 연결계좌내역목록
            obtPer		    : 0, 	// 목표대비 성과비율
            bacAm		    : 0, 	// 잔액(남은금액)
            bacDt		    : 0, 	// 잔액(남은기간)
            curDt		    : "",	// 현재일자
            dayAm		    : 0, 	// 남은 기간 기준 입금가능금액

            carGrdNo        : "",   // 자동차등급번호
            carCtrimNoFlag  : "",   // 자동차트림번호 존재여부
            goalCheck       : "",   // 달성여부 class
            obtnm           : "",   // 목표명
        }
    },
    props : {

    },
    mixins: [
        popupMixin
        ,commonMixin
    ],
    methods: {
        initComponent(param) {
            this.mydtCusno      = this.getUserInfo('mydtCusno')
            this.fncObtDsc      = param.fncObtDsc
            this.sqno           = param.sqno
            this.prgStsCd       = param.prgStsCd
            this.goalCheck      = ""
            this.obtnm          = ""
            this.carGrdNo       = param.carGrdNo
            this.carCtrimNoFlag = param.carCtrimNo
            this.basyy          = param.basyy
            this.basmm          = param.basmm
            this.curDt          = dateFormat(new Date(), 'YYYYMMDD')

            // 상세조회
            this.getData()
        },
        getData() {

            const config = {
                url: '/pd/my/30r01',  // /pd/my/18ra1,
                data: {
                        "mydtCusno"       : this.mydtCusno // 마이데이터고객번호
                        ,"fncObtDsc"      : this.fncObtDsc
                        ,"sqno"           : this.sqno
                        ,"carGrdNo"       : this.carGrdNo
                        ,"carCtrimNoFlag" : this.carCtrimNoFlag  // 자동차트림번호 존재여부
                        ,"basyy"          : this.basyy
                        ,"basmm"          : this.basmm
                    }
            };
            
            apiService.call(config).then(response => {

                this.respInfo = response;

                this.obtnm           = this.respInfo.obtnm
                this.carCtrimNo      = this.respInfo.carCtrimNo      || ''
                this.vhcModlnm       = this.respInfo.vhcModlnm       || ''
                this.carCtrimNm      = this.respInfo.carCtrimNm      || ''
                this.carLineupMdyrNm = this.respInfo.carLineupMdyrNm || ''
                this.carBrannm       = this.respInfo.carBrannm       || ''
                this.carCtrimSelAm   = this.respInfo.carCtrimSelAm   || 0
                //this.basyy           = this.respInfo.basyy           || ''
                //this.basmm           = this.respInfo.basmm           || ''
                this.fncObtAm        = this.respInfo.fncObtAm
                this.obtDt           = this.respInfo.obtDt
                this.fncObtAchvYn    = this.respInfo.fncObtAchvYn
                this.subList         = this.respInfo.subList         || []
                this.acNowBacTotAm   = _.sumBy(this.subList, item => {return item.acNowBac }) // 계좌현재잔액총액
                this.bacAm           = this.fncObtAm - this.acNowBacTotAm // 남은금액
                this.bacDt           = Number(dayDiff(dateFormat(this.obtDt, 'YYYYMMDD'), this.curDt) + 1) // 남은일자

                this.carCtrimNoFlag  = this.carCtrimNo               || ''
                
                // 남은기간이 30일 이하일경우에는 남은금액으로 노출
                if(this.bacDt > 30) {
                    this.dayAm = round(this.bacAm / (this.bacDt / 30), 0)
                } else {
                    this.dayAm = this.bacAm
                }

                let widthCal
                if(typeof this.fncObtAm == "undefined" || this.fncObtAm == 0) {
                    this.obtPer = 0
                } else {
                    widthCal = round((this.acNowBacTotAm / this.fncObtAm) * 100, 1)
                    
                    if(widthCal < 0) {
                        this.obtPer = 0
                    } else {
                        this.obtPer = widthCal
                    }
                }

                // 종료일때 달성여부 체크
                if(this.prgStsCd === '2') {
                    if(this.fncObtAchvYn === '1') {
                        this.goalCheck = "success"
                    } else {
                        this.goalCheck = "fail"
                    }
                } else {
                    this.goalCheck = ""
                }

                //목표금액 도달시 목표달성처리
                if(this.acNowBacTotAm >= this.fncObtAm){
                    this.goalCheck = "success"
                }

                this.$nextTick(() => {
                    this.drawProgressbar()
                })
            });
        },
        // 프로그래스바
        drawProgressbar() {
            let progressBar = $("#progressBar")
            let progressNum = Number($("#popoverNum").text())
            let popoverWrap = $("#popoverWrap")

            if(progressNum >= 100) {
                progressNum = 100;
                progressBar.addClass('over')
                popoverWrap.css('transform','translateX(-100%)')
                popoverWrap.animate({
                    left: progressNum + "%"
                },2000,function(){
                    popoverWrap.addClass('full')
                });
            } else if(progressNum == 0) {
                popoverWrap.addClass('zero')
            } else {
                popoverWrap.animate({
                    left: progressNum +'%',
                },2000);
            }
            
            progressBar.css('width','0')
            popoverWrap.css('left','0')
            progressBar.animate({					
                width: progressNum + '%',
            },2000)
        },
        // 목표삭제
        deleteExpensePerpose() {

            const configConfirm = {
                content: ['내차구입 목표를 삭제하시겠습니까?'],
                title  : "",
            }

            modalService.confirm(configConfirm).then(text => {
                if(text == "예") {

                    const config = {
                        url: '/pd/my/30d01',        // /pd/my/18d01
                        data: {
                                "mydtCusno": this.mydtCusno // 마이데이터고객번호
                                ,"fncObtDsc" : this.fncObtDsc
                                ,"sqno" : this.sqno
                            }
                    };
                    
                    apiService.call(config).then(response => {

                        if(response.rspCd == '0000'){
                            modalService.alert("목표가 삭제되었습니다.").then(() => {
                                // 전체페이지 닫기
                                this.closeAllData('reSelect')
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
            var compName = PDMY4024

            var param = {"fncObtDsc":this.fncObtDsc, "sqno": this.sqno, "prgStsCd":this.prgStsCd, "carGrdNo": this.carGrdNo, "carCtrimNoFlag":this.carCtrimNoFlag}

            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(() => {

            })
        },
        setRound(val) {
            return round(val, 1)
        },
        // 목표등록화면으로 이동
        goPerposePage() {
            var compName = PDMY4005

            var param = {}

            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(() => {

            })
        },

        // 배너 링크 연결
        banLink(linkDsc) {
            let config = {};
            
            if(linkDsc == "newCar") {
                //window.open("https://nhcok.cardong.co.kr");
                if (this.getUserInfo('chnl') === '385') {
                    appService.executeBrowser("https://nhcok.cardong.co.kr");
                } else {
                    appService.cokBankOpenPopupWebBrowser("https://nhcok.cardong.co.kr");
                }
                return;
            } else if(linkDsc == "loanLmt") {
                var compName = PDPD1108
                config = {
                    component: compName,
                    params : {}
                };
                modalService.openPopup(config).then(() => {

                })
                return;
            } else if(linkDsc == "carLoanLmt") {
                // 신용대출 
                // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크

                // 스뱅일경우
                if(this.getUserInfo('chnl') === '385') {
                    // 스뱅
                    let url = 'WEB=Y%26serviceId=BFBCA0020R%26psnFncWrsC=40000876%26naac_dsc=2%26nhType=2'
                    appService.moveFinancialProductPage(url)
                } else {
                    // 콕뱅
                    let url = 'SFBCA0020R^40000876'
                    appService.moveFinancialProductPage(url)
                }
            }
        }
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },

}
</script>