<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 도전목표챌린지 > 버킷리스트 > 내집마련 상세
* @ 페이지설명 : 전체메뉴 > 도전목표챌린지 > 버킷리스트 > 내집마련 상세
* @ 파일명     : src/views/page/PD/MY/PDMY4029/PDMY4029.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-08-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-13              CS516029                 최초작성
* 2022-07-05              CS528053                 고도화 파일명, UI 변경 및 고도화 개발(PDMY1117.vue -> PDMY1005.vue)
* 2023-07-17              CS533453                 고도화 파일명, UI 변경 및 고도화 개발(PDMYPDMY1005.vue -> PDMY2029.vue)
* 2025-01-24              CS541015                 고도화 파일명, 연결화면 변경(PDMY2029.vue -> PDMY4029.vue)
*************************************************************************/
-->
<template>
    <div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">버킷리스트</h1>
			<!-- <a href="#nolink" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content com_bg_type00"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner" :class="goalCheck">
                <div class="mygoal_title_area">
					<p class="pointColor green">꿈에 그리던 내 집 마련!</p>
					<strong class="titH1">{{obtnm}}</strong>
					<p class="sub_text">{{aptHcxnm}}<span class="dot_text">{{newPytpAreaCntn}}m<sup class="sup_text">2</sup></span></p>
				</div>

                <!-- mygoal_top_box -->
				<div class="mygoal_top_box">
					<div class="content_wrap">
						<div class="title">
							<template v-if="prgStsCd == '1'">
								오늘까지<br>
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
							<!-- 2023.07.03 progressBar 수정  -->
							<div class="progressBar_wrapper">
								<div class="progressBar">
									<div class="bar">
										<div class="popover_wrap">
											<span class="popover">
												<em class="num">{{setRound(obtPer)}}</em>%
												<span class="arrow"></span>
											</span>
										</div>
									</div>
								</div>
							</div>
							<!-- 2023.07.03 progressBar 수정  -->
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
				<!-- //mygoal_top_box -->

                <div class="mygoal_sub_text" v-if="bacAm > 0 && goalCheck !== 'fail'">
					<p><span class="pointTxt type02">{{obtDt | dateFilter('YYYY')}}년 {{obtDt | dateFilter('MM')}}월 {{obtDt | dateFilter('DD')}}일</span>까지</p>
					<p><span class="pointTxt type02">{{fncObtAm | numberFilter}}원</span>을 모으려면</p>
					<p class="mt20">매 월 <span class="num pointColor green">{{dayAm | numberFilter}}원</span>씩 모으면 가능해요!</p>
				</div>
			</div>

            <hr class="hr02">

			<!-- 07/24 추가 -->
			<div class="com_inner mt10">
				<div class="custom_box">
					<div class="content_wrap">
						<div class="tit_linkbox_wrap">
							<strong class="com_pop_tit01">내 집 마련에 필요한 세금을 알아보세요!</strong>
							<div class="linkbox_wrap linkbox_two mb20">
								<div class="box">
									<div class="tt_wrap">
                                        <a href="javascript:void(0);" @click.prevent="fn_goPDMYPage('PDMY2042')">
											<em class="tt_top">취득세</em>
										</a>
									</div>
								</div>
								<div class="box">
									<div class="tt_wrap">
										<a href="javascript:void(0);" @click.prevent="fn_goPDMYPage('PDMY2043')">
											<em class="tt_top">중개수수료</em>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<hr class="hr02">
			<!-- //07/24 추가 -->

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
				<!-- 07/24 배너수정 -->
				<div class="inner_banner mt40">
					<a href="javascript:void(0);" role="button" @click="banLink('loanLmt')">
						<img src="@/assets_v40/images/banner/img_benner_11.png" alt="나만의 보금자리를 위해 맞춤 대출 상품을 알아볼까요?">
					</a>
				</div>
				<!-- 07/24 배너수정 -->
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
import {getLastDay, dateFormat, dayDiff} from '@/utils/date'
import {round} from '@/utils/number'
import PDMY2023 from '@/views/page/PD/MY/PDMY2023/PDMY2023'
import PDMY4005 from '@/views/page/PD/MY/PDMY4005/PDMY4005'
import PDMY2042 from '@/views/page/PD/MY/PDMY2042/PDMY2042'
import PDMY2043 from '@/views/page/PD/MY/PDMY2043/PDMY2043'
import ANRE2203 from '@/views/page/AN/RE/ANRE2203/ANRE2203'     // 부동산 상세(iframe)
import PDPD1108 from '@/views/page/PD/PD/PDPD1108/PDPD1108'
//import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12
import _ from 'lodash'

export default {
    name : "PDMY4029",
    data: () => {
        return {
            mydtCusno:"", // 마이데이터고객번호
            fncObtDsc:"", // 01:돈모으기 02:투자목표
            sqno:0,       // 일련번호(상세조회시 필수)
            prgStsCd:"",  // 진행상태

            aptHscxIdvdc:"",
            aptHcxnm:"",
            newPytpAreaCntn:"",
            genDlAm:0,
            fncObtAm:0,        // 금융목표금액
            obtDt:"",          // 목표일자
            fncObtAchvYn:"",   // 금융목표달성여부
            acNowBacTotAm:0,   // 계좌현재잔액총액
            subList:[],        // 연결계좌내역목록
            obtPer:0,          // 목표대비 성과비율
            bacAm:0,           // 잔액(남은금액)
            bacDt:0,           // 잔액(남은기간)
            curDt:"",          // 현재일자
            dayAm:0,           // 남은 기간 기준 입금가능금액
            obtnm:"",           // 목표명

            // 배너
            bnnrWrsCn:0,    // 배너상품목록건수
            bnnrWrsList:[], // 배너상품목록
            goalCheck: "",   // 달성여부 class
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
            this.mydtCusno = this.getUserInfo('mydtCusno')
            this.fncObtDsc = param.fncObtDsc
            this.sqno = param.sqno
            this.prgStsCd = param.prgStsCd
            this.curDt = dateFormat(new Date(), 'YYYYMMDD')
            this.goalCheck       = ""

            // 상세조회
            this.getData()
        },
        getData() {

            const config = {
                url: '/pd/my/29r01',        // /pd/my/17r01
                data: {
                        "mydtCusno": this.mydtCusno // 마이데이터고객번호
                        ,"fncObtDsc" : this.fncObtDsc
                        ,"sqno" : this.sqno
                    }
            };
            
            apiService.call(config).then(response => {
                console.log(response)
                this.respInfo = response;

                this.obtnm           = this.respInfo.obtnm
                this.aptHscxIdvdc    = this.respInfo.aptHscxIdvdc
                this.aptHcxnm        = this.respInfo.aptHcxnm
                this.newPytpAreaCntn = this.respInfo.newPytpAreaCntn
                this.genDlAm         = this.respInfo.genDlAm
                this.fncObtAm      = this.respInfo.fncObtAm
                this.obtDt         = this.respInfo.obtDt
                this.fncObtAchvYn  = this.respInfo.fncObtAchvYn
                this.subList       = this.respInfo.subList || []
                this.acNowBacTotAm = _.sumBy(this.subList, item => {return item.acNowBac }) // 계좌현재잔액총액
                this.bacAm = this.fncObtAm - this.acNowBacTotAm // 남은금액
                this.bacDt = Number(dayDiff(dateFormat(this.obtDt, 'YYYYMMDD'), this.curDt) + 1) // 남은일자
                
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
                    this.goalCheck = "success"
                }

                //목표금액 도달시 목표달성처리
                if(this.acNowBacTotAm >= this.fncObtAm){
                    this.goalCheck = "success"
                }

                this.$nextTick(() => {
                    this.drawProgressbar()
                })
                
                // 배너상품 조회
                //this.fn_getBanner()
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
        // 목표삭제
        deleteExpensePerpose() {

            const configConfirm = {
                content: ['내집마련 목표를 삭제하시겠습니까?'],
                title  : "",
            }

            modalService.confirm(configConfirm).then(text => {
                if(text == "예") {

                    const config = {
                        url: '/pd/my/29d01',        // /pd/my/17d01
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
            var compName = PDMY2023

            var param = {"fncObtDsc":this.fncObtDsc, "sqno": this.sqno, "prgStsCd":this.prgStsCd}

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
        setLastDay(val) {
            return getLastDay(dateFormat(val, 'YYYYMMDD'))
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
        fn_goPDMYPage(viewName) {
            
            var compName

            if(viewName == 'PDMY2042') {
                compName = PDMY2042
            } else if(viewName == 'PDMY2043') {
                compName = PDMY2043
            } else {
                return;
            }

            var param = {}

            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(() => {

            })
        },
        fn_getBanner() {

            const config = {
                url: '/pd/pd/00r01',
                data: {
                        "asdbDsc": '08'
                        /*
                        자산부채구분코드
                        01	예금
                        02	투자
                        03	선불
                        04	보험
                        05	부동산
                        06	자동차
                        07	기타
                        08	대출
                        09	자동차
                        10	카드
                        11	할부
                        12	리스
                        13	빌린돈
                        */
                    }
            };

            apiService.call(config).then(response => {
                this.bnnrWrsCn   = response.bnnrWrsCn   || 0
                this.bnnrWrsList = response.bnnrWrsList || []
            });
        },
        // 배너 링크 연결
        banLink(linkDsc) {
            let config = {};
            
            if(linkDsc == "loanLmt") {
                config = {
                    component: PDPD1108,
                    params : {}
                };
            }

            modalService.openPopup(config).then(() => {

            });
        },
        // 위티 상세 팝업 연결
        openUitiDet() {
            let config = '';
            let pytpList = [];
            let selectPytp = '';
            // 아파트 분양면적 조회
            const config_pytp = {
                url  : '/co/re/03ra1',
                data : {
                    aptHscxIdvdc        : this.aptHscxIdvdc,    // 아파트단지개별코드
                }
            };
            
            apiService.call(config_pytp).then(response => {
                pytpList = response.pytpAreaList;
                selectPytp = pytpList.find((pytp) => pytp.newPytpAreaCntn == this.newPytpAreaCntn);

                config = {
                    component: ANRE2203,
                    params : {
                        id 		    : this.aptHscxIdvdc || '', 		    // 아파트단지개별코드
                        tradetype 	: 'deal', 			                // 부동산거주형태구분코드(위티 전달용)
                        space 		: selectPytp.aptHfisArea || '' 		// 아파트분양면적
                    }
                };
                
                modalService.openPopup(config).then(() => {

                });
            });
        }
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    components: {      
        //CmmFinancialBanner  //상품추천배너 2021.11.12
    }
}
</script>