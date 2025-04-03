<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 도전목표챌린지 > 버킷리스트 > 여가생활 상세
* @ 페이지설명 : 전체메뉴 > 도전목표챌린지 > 버킷리스트 > 여가생활 상세
* @ 파일명     : src\views\page\PD\MY\PDMY4026\PDMY4026.vue
* @ 작성자     : CS533453
* @ 작성일     : 2023-07-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-17              CS533453              최초작성
* 2025-01-24              CS541015              고도화 파일명, 연결화면 변경(PDMY2026.vue -> PDMY4026.vue)
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
					<p class="pointColor green">힐링 라이프, 나의 여가생활!</p>
					<strong class="titH1">{{obtnm}}</strong>
					<p class="sub_text">{{lsrLfeCstRkonDscNm2}}<span class="dot_text">{{lsrLfeCstRkonDscNm3}}</span></p>
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
import {fncSlick_travel_simple} from '@/utils/slick'
import _ from 'lodash'

import PDMY4006 from '@/views/page/PD/MY/PDMY4006/PDMY4006'
import PDMY4005 from '@/views/page/PD/MY/PDMY4005/PDMY4005'

export default {
    name : "PDMY4026",
    data: () => {
        return {
            mydtCusno:"", // 마이데이터고객번호
            fncObtDsc:"", // 06:여가생활
            sqno:0,       // 일련번호(상세조회시 필수)
            prgStsCd:"",  // 진행상태

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
			obtnm					: "",	// 목표명
			lsrLfeCstRkonDsc1		: "",	// 여가생활비용산정구분코드1
			lsrLfeCstRkonDscNm1		: "",	// 여가생활비용산정구분코드명1
			lsrLfeCstRkonDsc2		: "",	// 여가생활비용산정구분코드2
			lsrLfeCstRkonDscNm2		: "",	// 여가생활비용산정구분코드명2
			lsrLfeCstRkonDsc3		: "",	// 여가생활비용산정구분코드3
			lsrLfeCstRkonDscNm3		: "",	// 여가생활비용산정구분코드명3
			goalCheck        		: "",   // 달성여부 class
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

            fncSlick_travel_simple(500, false);

            // 상세조회
            this.getData();
        },
        getData() {

			const config = {
				url: '/pd/my/26r01',
				data: {
						"mydtCusno": this.mydtCusno // 마이데이터고객번호
						,"fncObtDsc" : this.fncObtDsc
						,"sqno" : this.sqno
					}
			};


			apiService.call(config).then(response => {
				console.log(response)
				this.respInfo = response;

				this.obtnm                  = this.respInfo.obtnm
				this.fncObtAm               = this.respInfo.fncObtAm
				this.obtDt                  = dateFormat(this.respInfo.obtDt, 'YYYY-MM-DD')
				this.subList                = this.respInfo.subList || []
				this.lsrLfeCstRkonDsc1      = this.respInfo.lsrLfeCstRkonDsc1
				this.lsrLfeCstRkonDscNm1    = this.respInfo.lsrLfeCstRkonDscNm1
				this.lsrLfeCstRkonDsc2      = this.respInfo.lsrLfeCstRkonDsc2
				this.lsrLfeCstRkonDscNm2    = this.respInfo.lsrLfeCstRkonDscNm2
				this.lsrLfeCstRkonDsc3      = this.respInfo.lsrLfeCstRkonDsc3
				this.lsrLfeCstRkonDscNm3    = this.respInfo.lsrLfeCstRkonDscNm3
				this.fncObtAchvYn		    = this.respInfo.fncObtAchvYn
				this.subList         	    = this.respInfo.subList         || []
				this.acNowBacTotAm		    = _.sumBy(this.subList, item => {return item.acNowBac }) // 계좌현재잔액총액
                this.bacAm				    = this.fncObtAm - this.acNowBacTotAm // 남은금액
                this.bacDt				    = Number(dayDiff(dateFormat(this.obtDt, 'YYYYMMDD'), this.curDt) + 1) // 남은일자

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
                content: ['여가생활 목표를 삭제하시겠습니까?'],
                title  : "",
            }

            modalService.confirm(configConfirm).then(text => {
                if(text == "예") {

                    const config = {
                        url: '/pd/my/26d01',
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
            var compName = PDMY4006

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
        // 카운트 애니메이션
        countingAni () {
            var _con = $('.full_popup.renewal .popup_content');
            var _value = $('.custom_box .com_price strong');
            _con.scroll( function() {
                //var scrollTop = $(this).scrollTop();
                if ( _value.length > 0) {
                    //var stdPos = $(window).scrollTop() + $(window).height() - ($(window).height() / 2);
                    
                    if( _value.offset().top < 490 &&  _value.offset().top > 480 ){
                        $('.counter').each(function(){
                            var $this = $(this),
                            countTo = $this.attr('data-count');
                            
                            $({countNum: $this.text()}).animate({
                                countNum:countTo
                            },{
                                duration:1500,
                                easing:'easeOutCubic',
                                step:function(){
                                    $this.text(addCommas(Math.floor(this.countNum)));
                                },
                                complete:function(){
                                    $this.text(addCommas(this.countNum));
                                }			
                            });
                            function addCommas(nStr){
                                return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                            }
                        });
                    }
                }
            });
        },
        // 배너 링크 연결
        banLink(linkDsc) {
            if(linkDsc == "nhCok") {
                if (this.getUserInfo('chnl') === '385') {
                    appService.executeBrowser("https://smartcard.nonghyup.com");
                } else {
                    appService.cokBankOpenPopupWebBrowser("https://smartcard.nonghyup.com");
                }
                return;
            } else if(linkDsc == "nhInsur") {
                if (this.getUserInfo('chnl') === '385') {
                    appService.executeBrowser("https://m.nhlife.co.kr");
                } else {
                    appService.cokBankOpenPopupWebBrowser("https://m.nhlife.co.kr");
                }
                return;
            }
        },
        addComma(nStr){
            return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        }
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    }
}
</script>