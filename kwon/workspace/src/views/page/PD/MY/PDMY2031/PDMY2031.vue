<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표 > 버킷리스트
* @ 페이지설명 : 금융과생활 > 나의목표 > 버킷리스트 > 버킷리스트-여행(상세조회)
* @ 파일명     : src/views/page/PD/MY/PDMY2031/PDMY2031.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-23              CS516029                 최초작성
* 2022-07-07              CS528053                 고도화 파일명, UI 변경 및 고도화 개발(PDMY1119.vue -> PDMY2031.vue)
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
					<p class="pointColor green">나의 워라벨, 설레는 여행!</p>
					<strong class="titH1">{{obtnm}}</strong>
					<p class="sub_text">{{trvDsnNm}}<span class="dot_text">{{pers}}명</span><span class="dot_text">{{trvPrdDscNm}}</span></p>
				</div>

                <!-- mygoal_top_box -->
				<div class="mygoal_top_box">
					<div class="content_wrap">
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
            </div>

            <!-- 07/24 추가 및 수정 -->
			<hr class="hr03">

			<div class="com_inner exchangerate_info">
				<!-- 환율정보 미리 알아보세요! -->
				<div class="custom_box custom_box2">
					<div class="content_wrap">
						<div class="com_cont_tit01">
							<strong>환율정보 미리 알아보세요!</strong>
						</div>
                        <div class="com_box_type01 com_box_list2 custom">
							<div class="new_tit_area">
                                <button type="button" class="com_btnselect_type01" title="통화 선택" @click="openCurcPop()">
                                    <span>
                                        <!-- 
                                            기본(icon) 국기명클래스(ico_JPY, ico_USD)
                                        -->
                                        <i class="ico" :class="selectCurc.conImg"> <!-- mydata.css 국가별 아이콘 196번 줄 ~ 218번 참고-->
                                            <span class="blind">{{selectCurc.curcCont}}</span>
                                        </i>
                                        <span>{{selectCurc.curcCont}}({{selectCurc.curc}}<template v-if="selectCurc.curcNm != 0 && selectCurc.curcNm != null">, {{selectCurc.curcNm}}</template>)</span>
                                    </span>
                                </button>
                            </div>
                            <div class="standard">
								<p class="con">매매 기준율</p>
								<div class="com_price">
                                    <strong class="num counter" data-count="112356">{{addComma(Number(selectCurc.dlbsrt))}}</strong><em class="unit">KRW</em>
									<!-- 
										통화 선택버튼 클릭 후 미국, 일본, 유로연합, 중국, 호주, 캐나다 등 각 나라를 
										각각 클릭시 해당 데이터 표시 후 매매 기준율 숫자 인터렉션됩니다.
										(
											클래스명 	: class="counter"
											속성명 		: data-count="112356"

											해당 클래스(counter) /속성(data-count) 삽입시 숫자 인터렉션됩니다
										)
									-->
									<span class="change_rate up">
                                        <template v-if="selectCurc.subDlbsrt > 0">
                                            <span class="raise">
                                                <em>{{addComma(Math.abs(selectCurc.subDlbsrt))}}</em>
                                            </span>
                                        </template>
                                        <template v-else-if="selectCurc.subDlbsrt < 0">
                                            <span class="decrease">
                                                <em>{{addComma(Math.abs(selectCurc.subDlbsrt))}}</em>
                                            </span>
                                        </template>
									</span>
								</div>
							</div>
                            <div class="list_gray_box mt20">
								<dl>
									<dt>살 때</dt>
                                    <td>{{addComma(Number(selectCurc.ttxs))}}<em class="unit"> KRW</em></td>
								</dl>
								<dl>
									<dt>팔 때</dt>
                                    <td>{{addComma(Number(selectCurc.ttbrt))}}<em class="unit"> KRW</em></td>
								</dl>
							</div>
						</div>
					</div>
				</div>

				
				<div class="inner_banner mt40">
					<!-- NH 콕뱅크 [금융상품] -->
					<a href="javascript:void(0);" role="button" @click="banLink('nhCok')">
						<!-- <div class="com_box_type03 bg20">
							<div class="text">
								<span><em>NH</em>콕뱅크 [금융상품]</span>
								여행자를 위한<br />
								NH농협카드 써보셨나요?
							</div>
						</div> -->
                        <img src="@/assets_v40/images/banner/img_benner_13.png" alt="NH콕뱅크 [금융상품] 여행자를 위한 NH농협카드 써보셨나요?">
					</a>
					<!-- NH손해보험 -->
					<a href="javascript:void(0);" role="button" @click="banLink('nhInsur')">
						<!-- <div class="com_box_type03 bg21">
							<div class="text">
								<span><em>NH</em>손해보험</span>
								해외여행 갈때 꼭 필요한 보험은?
							</div>
						</div> -->
                        <img src="@/assets_v40/images/banner/img_benner_14.png" alt="NH손해보험 해외여행 갈때 꼭 필요한 보험은?">
					</a>
				</div>
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
import {round, roundNumberWithDot} from '@/utils/number'
import {fncSlick_travel_simple} from '@/utils/slick'
import _ from 'lodash'

import PDMY2025 from '@/views/page/PD/MY/PDMY2025/PDMY2025'
import PDMY2005 from '@/views/page/PD/MY/PDMY2005/PDMY2005'
import PDMY2044 from '@/views/page/PD/MY/PDMY2044/PDMY2044'

export default {
    name : "PDMY2031",
    data: () => {
        return {
            mydtCusno:"", // 마이데이터고객번호
            fncObtDsc:"", // 01:돈모으기 02:투자목표
            sqno:0,       // 일련번호(상세조회시 필수)
            prgStsCd:"",  // 진행상태

            trvDsnC:'',   // 여행목적지코드 
            trvDsnNm:'',  // 여행목적지명
            pers:0,       // 인원수 
            trvPrdDsc:0,  // 여행기간구분코드 
            trvPrdDscNm:'', // 여행기간구분명
            refCntn1:0, // 왕복항공료
            refCntn2:0, // 1일경비
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
            curcList:[],       // 환율내역 목록
            selectCurc:[],      // 선택한 환율정보  
            goalCheck: "",   // 달성여부 class
            obtnm:"",          // 목표명
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
            this.goalCheck = ""
            this.obtnm = ""

            fncSlick_travel_simple(500, false);

            // 상세조회
            this.getData();

            // 환율내역 및 통화코드명 조회
            this.getCurcList();
        },
        getData() {

            const config = {
                url: '/pd/my/31r01',        // /pd/my/19r01
                data: {
                        "mydtCusno": this.mydtCusno // 마이데이터고객번호
                        ,"fncObtDsc" : this.fncObtDsc
                        ,"sqno" : this.sqno
                    }
            };
            
            apiService.call(config).then(response => {

                this.respInfo = response;

                this.obtnm         = this.respInfo.obtnm
                this.trvDsnC       = this.respInfo.trvDsnC
                this.pers          = this.respInfo.pers
                this.trvPrdDsc     = this.respInfo.trvPrdDsc
                this.trvDsnNm     = this.respInfo.trvDsnNm
                this.trvPrdDscNm     = this.respInfo.trvPrdDscNm
                this.refCntn1     = this.respInfo.refCntn1
                this.refCntn2     = this.respInfo.refCntn2
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
                content: ['여행 목표를 삭제하시겠습니까?'],
                title  : "",
            }

            modalService.confirm(configConfirm).then(text => {
                if(text == "예") {

                    const config = {
                        url: '/pd/my/31d01',        // /pd/my/19d01
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
            var compName = PDMY2025

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
            var compName = PDMY2005

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
        // 환율내역 및 통화코드명 조회
        getCurcList() {
            const config = {
                url: '/pd/my/31r02',        // /pd/my/01ra1
                data: {
                    "mydtCusno": this.mydtCusno // 마이데이터고객번호
                    ,"rgDt" : this.curDt        // 환율등록일자
                }
            };

            apiService.call(config).then(response => {
                this.curcList = response.curcList || [];

                for(let i=0; i<this.curcList.length; i++) {
                    if(this.curcList[i].curc === "JPY" || this.curcList[i].curc === "IDR" || this.curcList[i].curc === "VND") {
                        this.curcList[i].dlbsrt = roundNumberWithDot(this.curcList[i].dlbsrt/100, 2);
                        this.curcList[i].ttxs = roundNumberWithDot(this.curcList[i].ttxs/100, 2);
                        this.curcList[i].ttbrt = roundNumberWithDot(this.curcList[i].ttbrt/100, 2)
                    }
                }
                this.selectCurcChg('init');
            });
        },
        // 통화 선택 팝업 오픈
        openCurcPop() {
            const config = {
                params: {
                    title: '통화선택',
                },
                renderer: {
                    component: PDMY2044
                }
            };
            
            modalService.openSlidePagePopup(config).then((response) => {
                this.selectCurc = [];
                this.selectCurc.curc = response.curc;
                this.selectCurc.curcNm = response.curcNm;
                this.selectCurcChg('chg');
            });
        },
        // 환율 내역 show/hide
        curcDisplay(curcObj) {
            let displayStyle = {};
            if(curcObj.curc == this.selectCurc.curc) {
                displayStyle = {'display' : 'list-item'};
            } else {
                displayStyle = {'display' : 'none'};
            }
            return displayStyle;
        },
        // 선택한 통화코드 세팅
        selectCurcChg(chgDsc) {
            let tmpCurcObj = [];

            if(this.curcList.length > 0) {
                if(chgDsc == 'init') {
                    tmpCurcObj = this.curcList.find((tmpCurc) => tmpCurc.curc == 'USD');
                } else {
                    tmpCurcObj = this.curcList.find((tmpCurc) => tmpCurc.curc == this.selectCurc.curc);
                }

                this.selectCurc = tmpCurcObj;
                this.selectCurc.conImg = 'ico_' + this.selectCurc.curc;
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