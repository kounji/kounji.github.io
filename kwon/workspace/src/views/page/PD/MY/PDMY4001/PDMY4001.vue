<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 도전목표챌린지 > 버킷리스트
* @ 페이지설명 : 버킷리스트 목록
* @ 파일명     : src\views\page\PD\MY\PDMY4001\PDMY4001.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-14              CS515731              최초작성
* 2021-06-04              CS516029              서비스적용
* 2022-07-13              CS528053              고도화 파일명, UI 변경 및 고도화 개발(PDMY1101.vue -> PDMY1001.vue)
* 2023-07-17              CS533453              고도화 파일명, UI 변경 및 고도화 개발(PDMY1001.vue -> PDMY2001.vue)
* 2025-01-10              CS541015              고도화 파일명, UI 변경 및 고도화 개발(PDMY2001.vue -> PDMY4001.vue)
*************************************************************************/
-->

<template>
    <page class="content-view mydata2023" :class="bckCnt == 0 && finCnt == 0 && acnoObtCnt == 0 ? '' : 'movLNB '">
        <!-- <pd-category-v2 ref="pdCate" type="PDMY_"></pd-category-v2> -->

        <!-- content S -->
        <!-- 등록된 목표가 있는 경우 -->
        <div id="content" class="sub_main renewal">
            <template v-if="bckCnt > 0 || finCnt > 0 || acnoObtCnt > 0">
                <div class="com_inner">
                    <div class="box_border_link iconType01 mt20" v-if="acnoObtCnt > 0">
                        <a role="button" href="javascript:void(0);" @click.prevent="openAcountListPop()"><span class="arrow"><em class="num">{{this.acnoObtCnt}}</em>개의 목표에 계좌 연결이 필요해요</span></a>
                    </div>
                </div>

				<div class="goal_box_wrap com_inner">
                    <!--[v4.0] 안내문구 추가-->
                    <template v-if="financialList.length>0">
					    <p class="com_txt_sub">총 <em>{{financialList.length}}</em>개의 {{this.pageTitle}}가 등록 되었습니다. </p>
                    </template>
                    <template v-else>
                        <p class="com_txt_sub"> 아직 {{this.pageTitle}}를 등록하지 않았어요.</p>
                    </template>
					<!--//[v4.0] 안내문구 추가-->	
                    <template v-if="this.tabDsc === 1 && expenseList.length > 0 && expenseList[0].stYm === this.stYm">
                        <!--  지출목표 -->
                        <div class="mygoal_cont_box" @click="detailMove1(expenseList[0].stYm)" name="finance">
                            <a href="javascript:void(0);">
                                <div class="head">
                                    <p class="goal_title">{{expenseList[0].month}}월 지출목표<span class="mint_badge">{{setExpenseDday()}}</span></p>
                                    <p class="mytitle"><em class="num">{{xpsAm | numberFilter}}</em>원</p>
                                    <p class="sub_title">
                                        <template v-if="expCalAm !== 0">
                                            <em class="num">{{expCalAm | numberFilter}}</em>원 {{styleText}}
                                        </template>
                                        <template v-else>
                                            {{styleText}}
                                        </template>
                                    </p>
                                </div>

                                <div class="progressBar_wrapper">
                                    <div class="progressBar">
                                        <div class="bar">
                                            <div class="popover_wrap">
                                                <span class="popover bg_white">
                                                    <em class="num">{{expenseList[0].obtRate}}</em>%
                                                    <span class="arrow"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <dl class="budget">
                                    <dt>목표예산</dt>
                                    <dd><em class="num">{{Math.floor(expenseList[0].xpsObtAm / 10000) | numberFilter}}</em>만원</dd>
                                </dl>
                            </a>
                        </div>
                        <!-- // 지출목표 -->
                    </template>
                    <template v-for="(financialInfo, index) in financialList">
                        <template v-if="financialInfo.fncObtDsc === '01' | financialInfo.fncObtDsc === '02'">
                            <!-- 돈모으기, 투자목표 -->
                            <div class="mygoal_cont_box" :key="'key1_'+index" @click="detailMove2(financialInfo.fncObtDsc, financialInfo.sqno, financialInfo.prgStsCd, financialInfo.carGrdNo, financialInfo.carCtrimNo, financialInfo.basyy, financialInfo.basmm)" name="finance">
                                <a href="javascript:void(0);">
                                    <div class="head">
                                        <p class="goal_title">{{financialInfo.tit}}<span class="mint_badge">{{financialInfo.dday}}</span></p>
                                        <p class="mytitle">{{financialInfo.obtnm}}</p>
                                        <p class="sub_title">{{financialInfo.subTit}}</p>
                                    </div>

                                    <div class="progressBar_wrapper">
                                        <div class="progressBar">
                                            <div class="bar">
                                                <div class="popover_wrap">
                                                    <span class="popover bg_white">
                                                        <em class="num">{{financialInfo.obtRate}}</em>%
                                                        <span class="arrow"></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <dl class="save_money">
                                        <dt>모은돈</dt>
                                        <dd><em class="num">{{financialInfo.acNowBacTotAm | numberFilter}}</em>원</dd>
                                    </dl>
                                </a>
                            </div>
                        </template>

                        <template v-else>
                            <!-- 내집마련, 여행목표, 내차사기, 여가생활, 자기계발, 반려동물 -->
                            <div class="mygoal_cont_box bucketList" :class="financialInfo.divColor" :key="'key2_'+index" name="finance">
                                <a href="javascript:void(0);" @click="detailMove2(financialInfo.fncObtDsc, financialInfo.sqno, financialInfo.prgStsCd, financialInfo.carGrdNo, financialInfo.carCtrimNo, financialInfo.basyy, financialInfo.basmm)">
                                    <div class="head">
                                        <p class="goal_title">{{financialInfo.tit}}<span class="badge_2023" :class="financialInfo.titClass">{{financialInfo.dday}}</span></p>
                                        <p class="mytitle">{{financialInfo.obtnm}}</p>
                                        <p class="sub_title">{{financialInfo.subTit}}</p>
                                    </div>
        
                                    <div class="img_wrap" :class="financialInfo.img">
                                        <!-- <img :src="require('@/assets_v40/images/img/bucketList_'+financialInfo.img+'_2023.png')" :alt="financialInfo.imgAlt" :style="financialInfo.imgStyle"> -->
                                    </div>

                                    <div class="bucketList_save_money">
                                        <dl class="save_money">
                                            <dt>모은돈</dt>
                                            <dd><em class="num">{{financialInfo.acNowBacTotAm | numberFilter}}</em>원</dd>
                                        </dl>
                                        <!-- 0925 접근성 반영 -->
                                        <div class="progressBar_wrapper" role="img" :aria-label="'목표 금액대비 '+financialInfo.obtRate+'% 달성'">
                                            <div class="popover_wrap">
                                                <span class="popover bg_white">
                                                    <em class="num">{{financialInfo.obtRate}}</em>%
                                                    <span class="arrow"></span>
                                                </span>
                                            </div>
                                            <div class="progressBar">
                                                <div class="bar"></div>
                                            </div>
                                        </div>
                                        <!-- //0925 접근성 반영 -->
                                    </div>
                                </a>
                                <!--[v4.0] 버튼 추가-->
                                <button type="button" title="댕댕이 입양하기" class="btn_share" @click.prevent="fn_Share()">공유하기</button>
                                <!--//[v4.0] 버튼 추가-->
                            </div>
                        </template>
                    </template>

                    <div class="mygoal_cont_box" v-if="this.tabDsc == 0">
                        <a href="javascript:void(0);" class="make_new_goal" @click.prevent="openBckPop()">
                            <p>새로운 버킷리스트 만들기</p>
                        </a>
                    </div>
                    <!-- 새로운 금융목표 만들기 -->
					<div class="mygoal_cont_box" v-else-if="this.tabDsc == 1">
						<a href="javascript:void(0);" class="make_new_goal" @click.prevent="openFinancePop()">
							<p>새로운 금융목표 만들기</p>
						</a>
					</div>
					<!-- //새로운 금융목표 만들기 -->
                </div>
            </template>

            <!-- 등록된 목표가 없는 경우 -->
            <template v-else-if="bckCnt == 0 && finCnt == 0 && this.searchFlag === false">
				<div class="com_inner">
					<div class="mygoal_challenge">
						<strong class="title">나의 목표 챌린지</strong>
						<p>
							목표를 등록하고 슬기롭게 관리해서<br>
							현명한 금융 습관을 기르세요
						</p>

						<div class="img_wrap">
                            <img src="@/assets_v40/images/img/PD_MY_2001_2023.png" alt=""><!-- 230721 이미지 경로, 이름 수정 -->
						</div>
					</div>

					<p class="com_txtinfo_type01">목표 등록을 하려면 예적금, 투자 계좌가 필요해요</p>

					<div class="com_btn_area">
						<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click.prevent="openPurposePop()">목표 만들기</a>
					</div>
				</div>
            </template>
		</div>

        <div class="com_btn_area fixed_right" v-if="bckCnt > 0 || finCnt > 0 || acnoObtCnt > 0">
            <a @click.prevent="openPurposePop()" role="button" class="mygoal_link_btn" href="javascript:void(0);"><span class="blind">목표등록 페이지로 이동</span></a>
        </div>

		<!--// content E -->

        <footersV2 type="pd" />
    </page>
</template>

<script>
import store from '@/store'
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import PdCategoryV2 from '@/components/category/PdCategoryV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import PDMY4034 from '@/views/page/PD/MY/PDMY4034/PDMY4034' // 지출목표 수정 안내 팝업`
import PDMY4002 from '@/views/page/PD/MY/PDMY4002/PDMY4002' // 버킷리스트 만들기
import PDMY4003 from '@/views/page/PD/MY/PDMY4003/PDMY4003' // 금융목표 만들기
import PDMY4004 from '@/views/page/PD/MY/PDMY4004/PDMY4004' // 버킷리스트 계좌 연결
import PDMY4005 from '@/views/page/PD/MY/PDMY4005/PDMY4005' // 목표등록 메인
import PDMY4033 from '@/views/page/PD/MY/PDMY4033/PDMY4033' // 지출목표 상세
import PDMY4039 from '@/views/page/PD/MY/PDMY4039/PDMY4039' // 돈모으기 상세
import PDMY4041 from '@/views/page/PD/MY/PDMY4041/PDMY4041' // 투자목표 상세
import PDMY4029 from '@/views/page/PD/MY/PDMY4029/PDMY4029' // 내집마련 상세
import PDMY4030 from '@/views/page/PD/MY/PDMY4030/PDMY4030' // 내차사기 상세
import PDMY4031 from '@/views/page/PD/MY/PDMY4031/PDMY4031' // 여행목표 상세
import PDMY4026 from '@/views/page/PD/MY/PDMY4026/PDMY4026' // 여가생활 상세
import PDMY4027 from '@/views/page/PD/MY/PDMY4027/PDMY4027' // 자기계발 상세
import PDMY4028 from '@/views/page/PD/MY/PDMY4028/PDMY4028' // 반려동물 상세
import PDMY4032 from '@/views/page/PD/MY/PDMY4032/PDMY4032' // 지출목표 등록
import PDMY2038 from '@/views/page/PD/MY/PDMY2038/PDMY2038' // 돈모으기
import PDMY2040 from '@/views/page/PD/MY/PDMY2040/PDMY2040' // 투자목표

import {dateFormat, getLastDay, dayDiff, getTmmRmDds} from '@/utils/date'
import {round} from '@/utils/number'
import _ from 'lodash'
import {mapActions, mapGetters} from 'vuex'

export default {
    name : "PDMY4001",
    data: () => {
		return {
             // input info
             stYm:"",
             prgStsCd:"", // 상태(0:전체, 1:진행중, 2:종료)
             acnoYn:"",   // 계좌연결여부(1:계좌있음, 0:계좌없음)

             // return info
             myInfoList         : null,
             expenseList        : [], // 지출목표목록
             tempExpenseList    : [], // 지출목표목록(임시)
             financialList      : [], // 금융목표, 버킷리스트
             preXpsAm           : 0,  // 현재지출금액
             ctgrPreXpsTotAm    : 0,  // 카테고리현재총지출금액
             xpsAm              : 0,  // 실지출금액(preXpsAm, ctgrPreXpsTotAm중 하나 표현)
             categoryList       : [], // 자산카테고리목록
             styleText          : "", // 지출목표 문구
             expCalAm           : "", // 지출목표금액-지출금액
             bckCnt             : 0,  // 버킷리스트 총건수
             finCnt             : 0,  // 금융목표 총건수
             tabDsc             : 0,  // 탭구분
             searchFlag         : false,
             acnoObtCnt         : 0,   // 계좌 연결 필요 목표 건수
             paramObj           : null,   // 화면 진입시 넘어온 파라미터
             pageTitle          : '',
        }
    },
    computed : {
        ...mapGetters('myassets', [
            'isMyAssetGathering'
        ]),
    },
    methods: {
        ...mapActions('myassets', [
            'getAllMyAssetInfo'
        ]),
        init(param) {
            this.myInfoList      = null // 나의목표
            this.expenseList     = []   // 지출목표목록
            this.tempExpenseList = []   // 지출목표목록(임시)
            this.financialList   = []   // 금융목표, 버킷리스트
            this.categoryList    = []   // 자산카테고리목록
            this.preXpsAm        = 0  // 현재지출금액
            this.ctgrPreXpsTotAm = 0  // 카테고리현재총지출금액
            this.prgStsCd        = 0 // 초기에는 전체
            this.acnoYn          = 1
            this.tabDsc          = 0 // 버킷리스트(탭)
            this.acnoObtCnt      = 0

            this.stYm = dateFormat(new Date, 'YYYYMM') // 

            const currentPage = store.getters['layout/pageInfo']
            currentPage.title = "버킷리스트"
            if(typeof param.type != 'undefined') {
                this.paramObj       = param
                if(this.paramObj.type == "00" || this.paramObj.type == "01" || this.paramObj.type == "02" || this.paramObj.type == "goal") {
                    this.tabDsc = 1     // 금융목표
                    currentPage.title = "금융목표";
                }
            }
        },
        initComponent(param) {

            this.init(param)

            this.getData(this.tabDsc)
        },
        getData(tabDsc) {
            $("#wrap").removeClass("responsive");
            this.searchFlag      = true
            this.bckCnt          = 0 // 버킷리스트 총건수
            this.finCnt          = 0 // 금융목표 총건수
            this.acnoObtCnt      = 0 // 계좌 연결 필요한 목표 건수

            this.myInfoList      = null // 나의목표
            this.expenseList     = []   // 지출목표목록
            this.tempExpenseList = []   // 지출목표목록(임시)
            this.financialList   = []   // 금융목표, 버킷리스트
            this.preXpsAm        = 0  // 현재지출금액
            this.ctgrPreXpsTotAm = 0  // 카테고리현재총지출금액
            this.xpsAm           = 0

            if(typeof tabDsc == "undefined" || tabDsc == null || tabDsc == '' || tabDsc == 0) {
                this.tabDsc = 0
                this.pageTitle = '버킷리스트'
            } else {
                this.tabDsc = 1
                this.pageTitle = '금융목표'
            }

            const config = {
                url: '/pd/my/01r02',  // 'pd/my/01ra2',
                data: {
                        "mydtCusno": this.getUserInfo('mydtCusno') // 마이데이터고객번호
                        ,"prgStsCd" : this.prgStsCd                // 진행상태코드
                        }
            };
            
            apiService.call(config).then(response => {
                console.log("response = ", response);
                this.myInfoList = response

                // 지출목표는 당월 between stYm and edYm이 사이에 존재하는지 확인하고 화면처리
                this.tempExpenseList = this.myInfoList.expenseList || []
                if(this.tempExpenseList != null) {
                    if(this.tempExpenseList.length > 0) {
                        for(let i=0; i<this.tempExpenseList.length; i++) {
                            if(Number(this.stYm) >= Number(this.tempExpenseList[i].stYm)) {
                                let inputObj = this.tempExpenseList[i];

                                this.expenseList.push(inputObj)
                            }
                        }
                    }
                }
                this.preXpsAm           = this.myInfoList.preXpsAm
                this.xpsAm              = this.preXpsAm
                this.ctgrPreXpsTotAm    = this.myInfoList.ctgrPreXpsTotAm
                this.financialList      = this.myInfoList.financialList || []

                // 지출목표 per width
                let widthCal = 0
                if(this.expenseList.length > 0) {
                    let today = new Date
                    this.expenseList[0].month = today.getMonth()+1;

                    if(typeof this.xpsAm == "undefined" || this.xpsAm == 0) {
                        this.expenseList[0].obtRate = 0
                    } else {
                        widthCal = round((this.xpsAm / this.expenseList[0].xpsObtAm) * 100, 1)
                        if(widthCal >= 100) {
                            widthCal = 100
                        }
                        this.expenseList[0].obtRate = widthCal
                    }
                    // 지출목표 존재시 금융목표 카운트 +1
                    if(this.expenseList[0].stYm === this.stYm) {
                        this.finCnt++
                    }
                    
                    this.expCalAm = Number(this.expenseList[0].xpsObtAm) - Number(this.xpsAm)
                    if(this.expCalAm > 0) {
                        this.styleText = '덜 쓰고 있어요'
                    } else if(this.expCalAm < 0) {
                        this.styleText = '더 쓰고 있어요'
                        this.expCalAm = this.expCalAm * -1      //  음수일 경우 (-) 제거
                    } else {
                        this.styleText = '목표예산과 같아요'
                    }
                }
                // 목표달성 List
                if(this.financialList.length > 0) {
                    let tmpFinList = [];
                    let obtRate    = 0;
                    for(let i=0; i<this.financialList.length; i++) {
                        if(this.financialList[i].bankListCnt === 0) {
                            if(tabDsc === 1) {          // 금융목표
                                if(this.financialList[i].fncObtDsc === '01' || this.financialList[i].fncObtDsc === '02') {
                                    this.acnoObtCnt++;
                                }
                            } else {                    // 버킷리스트
                                if(this.financialList[i].fncObtDsc != '01' && this.financialList[i].fncObtDsc != '02') {
                                    this.acnoObtCnt++;
                                }
                            }
                        } else {
                            
                            // 목표달성률
                            if(typeof this.financialList[i].acNowBacTotAm == "undefined" ||this.financialList[i]. acNowBacTotAm == 0) {
                                obtRate = 0
                            } else {
                                obtRate = round((this.financialList[i].acNowBacTotAm / this.financialList[i].fncObtAm) * 100, 1)
                                if(obtRate >= 100) {
                                    obtRate = 100
                                } else if(obtRate < 0) {
                                    obtRate = 0
                                }
                            }
                            this.financialList[i].obtRate = obtRate;

                            let setObj = this.setHtmlData(this.financialList[i])
                            this.financialList[i].tit       = setObj.tit
                            this.financialList[i].subTit    = setObj.subTit
                            this.financialList[i].divColor  = setObj.divColor
                            this.financialList[i].titClass  = setObj.titClass
                            this.financialList[i].dday      = setObj.dday
                            this.financialList[i].img       = setObj.img
                            this.financialList[i].imgAlt    = setObj.imgAlt
                            this.financialList[i].imgStyle  = setObj.imgStyle

                            if(tabDsc === 1) {          // 금융목표
                                if(this.financialList[i].fncObtDsc === '01' || this.financialList[i].fncObtDsc === '02') {
                                    tmpFinList.push(this.financialList[i]);
                                }
                            } else {                    // 버킷리스트
                                if(this.financialList[i].fncObtDsc != '01' && this.financialList[i].fncObtDsc != '02') {
                                    tmpFinList.push(this.financialList[i]);
                                }
                            }

                            if(this.financialList[i].fncObtDsc === '01' || this.financialList[i].fncObtDsc === '02') {
                                this.finCnt++;  // 금융목표 총건수
                            } else {
                                this.bckCnt++;  // 버킷리스트 총건수
                            }
                        }
                    }

                    this.financialList = tmpFinList;
                }
                this.searchFlag        = false

                if(this.expenseList.length > 0 && this.expenseList[0].stYm != this.stYm) {
                    if(this.financialList.length > 0 && this.tabDsc === 0) {
                        // 지출목표 수정 안내 팝업 호출
                        this.openExpenseChkPop(this.expenseList[0].stYm, this.expenseList[0].xpsObtAm)
                    } else if(this.finCnt === 0 && this.bckCnt === 0) {
                        this.openExpenseChkPop(this.expenseList[0].stYm, this.expenseList[0].xpsObtAm)
                    }
                }
                
                this.$nextTick(() => {
                    this.drawProgressbar()
                    // this.checkParam()
                })

                console.log("this.expenseList.length : " + this.expenseList.length)
                console.log("this.financialList.length : " + this.financialList.length)
            });
        },
        		/**
		 * 페이지 이동
		 */
		fn_movePage(pageId, param) {
            if (pageId === '') {
                modalService.alert("페이지 정보 필요")
                return
            }
			console.log("MAMA2001 Move page pageId: ", pageId)

            let params = {}
            
            // if 신차중고차 및 내차관리
            if (pageId == 'ANCA2201') {
                // if 내차관리 else 신차중고차
                if (param) {
                    params = { viewSvc: 'CARCARE', vhcnoVal: param }
                } else {
                    params = { viewSvc: 'CARDEAL', vhcnoVal: '' }
                }
            } else {
                params = param
            }
            const config = {
                name : pageId,
                params : params
            }
			commonService.movePage(config);
		},
        // 프로그래스바
        drawProgressbar() {
            let contHeight = $('.mygoal_cont_box').height(); //박스 높이
            let contHeight02 = contHeight * 2;
            let progressBar = $('.progressBar .bar'); //그래프바
            let progressNum01 = $('.popover').eq(0).find('em').text();
            let popoverWrap01 = $('.progressBar_wrapper').eq(0).children('.popover_wrap');
            let progressNum02 = Number(progressBar.eq(0).children().find('.popover .num').text());
            let popoverWrap02 = progressBar.eq(0).children('.popover_wrap');
            let n = 0;

            if(this.tabDsc === 0) {
                if(progressNum01 >= 100) {
					progressNum01 = 100;
					progressBar.eq(0).addClass('over');
					popoverWrap01.animate({
						left: progressNum01 + "%"
					},1000,function(){
						popoverWrap01.addClass('full');
					}).css('transform','translateX(-100%)');
				} else if(progressNum01 <= 0) {
					popoverWrap01.addClass('zero');
				} else {
					popoverWrap01.animate({
						left: progressNum01 +'%'
					},1000);
				}

				progressBar.css('width','0');
				popoverWrap01.css('left','0');
				progressBar.eq(0).animate({
					width: progressNum01 + '%',
				},1000);

                $('#content').scroll(function(){
                    let currentNum = $('.mygoal_cont_box.bucketList').length; //전체 박스갯수
                    if(n+1 <= currentNum) {
						var contTop = $('.mygoal_cont_box').eq(n).position().top - contHeight;
						// console.log(contTop);
						var progressNum = $('.popover').eq(n).find('em').text(); 
						var popoverWrap = $('.progressBar_wrapper').eq(n).children('.popover_wrap');

						if($(this).scrollTop() > contTop) {
							if(progressNum >= 100) {
								progressNum = 100;
								progressBar.eq(n).addClass('over');
								popoverWrap.animate({
									left: progressNum + "%"
								},1000,function(){
									popoverWrap.addClass('full');
								}).css('transform','translateX(-100%)');
							} else if(progressNum <= 0) {
								popoverWrap.addClass('zero');
							} else {
								popoverWrap.animate({
									left: progressNum +'%'
								},1000);
							}

							progressBar.eq(n).animate({
								width: progressNum + '%'
							},1000);
							n = n + 1;
						} 
					}
                })
            } else if(this.tabDsc === 1) {
                let currentNum = $('.mygoal_cont_box').length - 1
                if(progressNum02 >= 100) {
                    progressNum02 = 100;
                    progressBar.eq(0).addClass('over');
                    popoverWrap02.animate({
                        left: progressNum02 +'%'
                    },1000,function(){
                        popoverWrap02.addClass('full');
                    }).css('transform','translateX(-100%)');// 230721 -100%로 수정
                } else if(progressNum02 == 0) {
                    popoverWrap02.addClass('zero');
                } else if(progressNum02 < 2) {//20230908 2%미만일때 bar 라운드 관련 추가
                    $('.progressBar').eq(0).css('overflow','hidden');
                    $('.progressBar_wrapper').eq(0).prepend(popoverWrap02);
                } else {
                    popoverWrap02.animate({
                        left: progressNum02 +'%'
                    },1000);
                }

                progressBar.css('width','0');
                popoverWrap02.css('left','0');
                progressBar.eq(0).animate({
                    width: progressNum02 + '%',
                },1000);

                $('#content').scroll(function(){
                    if(n <= currentNum && $("[name='finance']")?.eq(n)?.length > 0) {
                        let contTop = $("[name='finance']").eq(n).position().top - contHeight02;
                        let progressNum = Number(progressBar.eq(n).children().find('.popover .num').text());
                        let popoverWrap = progressBar.eq(n).children('.popover_wrap');

                        if($(this).scrollTop() > contTop) {
                            if(progressNum >= 100) {
                                progressNum = 100;
                                progressBar.eq(n).addClass('over');
                                popoverWrap.animate({
                                    left: progressNum + "%"
                                },1000,function(){
                                    popoverWrap.addClass('full');
                                }).css('transform','translateX(-100%)');// 230721 -100%로 수정
                            } else if(progressNum == 0) {
                                popoverWrap.addClass('zero');
                            } else if(progressNum < 2) {//20230908 2%미만일때 bar 라운드 관련 추가
                                $('.progressBar').eq(n).css('overflow','hidden');
                                $('.progressBar_wrapper').eq(n).prepend(popoverWrap);
                            } else {
                                popoverWrap.animate({
                                    left: progressNum +'%'
                                },1000);
                            }

                            progressBar.eq(n).animate({
                                width: progressNum + '%'
                            },1000);
                            n = n + 1;
                        } 
                    }
                })
            }

            /*스크롤인터랙션 */
            $(".sticky-scroll #content").scroll(function(e){
            
                var scrollTop = $(e.target).scrollTop();

                if ( scrollTop > 55){
                    $("#wrap").addClass("responsive");
                }
                else{
                    $("#wrap").removeClass("responsive");
                }
            })

            this.$nextTick(() => {
                this.checkParam()
            })
        },
        // 화면 진입시 파라미터가 있는지 체크
        checkParam() {
            if(this.paramObj != null) {
                if(this.paramObj.type == 'reg') {
                    this.openPurposePop()   // 목표등록 화면
                } else if(this.paramObj.type == "goal") {
                    this.getData(this.tabDsc)
                } else if(this.paramObj.type == "01" || this.paramObj.type == "02") {    // 돈모으기, 투자목표
                    let comp
                    if(this.paramObj.type == "01") {
                        comp = PDMY2038
                    } else {
                        comp = PDMY2040
                    }
                    var param = {}
					const config = {
						component: comp,
						params : param
					}
					modalService.openPopup(config).then(res => {
                        if(res == "reSelect") {
                            // 재조회
                            this.getData(this.tabDsc)
                        }
					})
                } else if(this.paramObj.type == "00") {    // 지출목표
                    var params = {}
                    if(this.xpsAm !== null && this.expenseList.length) {
						params = {
                            modifyYn:"Y", 
                            stYm:this.stYm, 
                            preXpsAm: this.xpsAm, 
                        }
                    }
					const config = {
						component: PDMY4032,
						params : params
					}
					modalService.openPopup(config).then(res => {
                        if(res == "reSelect") {
                            // 재조회
                            this.getData(this.tabDsc)
                        }
					})
                } else if(this.paramObj.fncObtDsc == null) {
                    this.detailMove1(this.paramObj.stYm)      // 지출목표 상세
                } else {
                    this.detailMove2(
                        this.paramObj.fncObtDsc, 
                        this.paramObj.sqno, 
                        this.paramObj.prgStsCd, 
                        this.paramObj.carGrdNo, 
                        this.paramObj.carCtrimNo, 
                        this.paramObj.basyy, 
                        this.paramObj.basmm
                    )      // 금융, 버킷리스트 상세
                }

                this.paramObj = null
            }
        },

        // 지출목표 수정 안내 팝업
        openExpenseChkPop(stYm, xpsObtAm) {
            const config = {
                params: {
                    title: '',
                    stYm: stYm,
                    xpsObtAm: xpsObtAm
                },
                renderer: {
                    component: PDMY4034
                }
            };

            modalService.openSlidePagePopup(config).then(response => {
				if(response == "reSelect") {
                    // 금융목표 탭으로 이동
                    this.tabDsc = 1
                    this.getData(this.tabDsc)
                }
			})
        },
        // 고정문구 및 css 설정
        setHtmlData(obj) {
            let rtnObj = {}
            if(obj.fncObtDsc === '01') {
                rtnObj.tit       = "돈모으기"
                rtnObj.subTit    = "#부자 되는 첫 걸음"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.dday      = dday
            } else if(obj.fncObtDsc === '02') {
                rtnObj.tit       = "투자목표"
                rtnObj.subTit    = "#꿈꾸던 미래를 위한 시작"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.dday      = dday
            } else if(obj.fncObtDsc === '03') {
                rtnObj.tit       = "내집마련"
                rtnObj.subTit    = "#꿈에 그리던 내 집 마련!"
                rtnObj.divColor  = "mint"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.titClass  = dday === '실패' ? 'gray_badge' : 'mint_badge'
                rtnObj.dday      = dday
                rtnObj.img       = "home"
            } else if(obj.fncObtDsc === '04') {
                rtnObj.tit       = "여행목표"
                rtnObj.subTit    = "#나의 워라벨, 설레는 여행!"
                rtnObj.divColor  = "lightgreen"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.titClass  = dday === '실패' ? 'gray_badge' : 'green_badge'
                rtnObj.dday      = dday
                rtnObj.img       = "travel"
                } else if(obj.fncObtDsc === '05') {
                rtnObj.tit       = "내차사기"
                rtnObj.subTit    = "#내 차고에 드림카 채우기!"
                rtnObj.divColor  = "orange"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.titClass  = dday === '실패' ? 'gray_badge' : 'orange_badge'
                rtnObj.dday      = dday
                rtnObj.img       = "car"
            } else if(obj.fncObtDsc === '06') {
                rtnObj.tit       = "여가생활"
                rtnObj.subTit    = "#꿈꾸던 라이프, 나의 여가생활!"
                rtnObj.divColor  = "skyblue"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.titClass  = dday === '실패' ? 'gray_badge' : 'blue_badge'
                rtnObj.dday      = dday
                if(obj.cstRkonDsc1 == '1000') {
                    rtnObj.img       = "sports"
                } else if(obj.cstRkonDsc1 == '2000') {
                    rtnObj.img       = "art"
                } else if(obj.cstRkonDsc1 == '3000') {
                    rtnObj.img       = "performance"
                }
                rtnObj.imgAlt    = "골프공과 골프장 카트 이미지"
                rtnObj.imgStyle  = "width:calc(21.9rem / 2);"
            } else if(obj.fncObtDsc === '07') {
                rtnObj.tit       = "자기계발"
                rtnObj.subTit    = "#새로운 도전, 자기계발로 시작!"
                rtnObj.divColor  = "peach"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.titClass  = dday === '실패' ? 'gray_badge' : 'red_badge'
                rtnObj.dday      = dday
                if(obj.cstRkonDsc1 == '100') {
                    rtnObj.img       = "language"
                } else if(obj.cstRkonDsc1 == '200') {
                    rtnObj.img       = "certificate"
                } else if(obj.cstRkonDsc1 == '300') {
                    rtnObj.img       = "hobby"
                }
            } else if(obj.fncObtDsc === '08') {
                rtnObj.tit       = "반려동물"
                rtnObj.subTit    = "#또 다른 가족, 반려동물과 함께!"
                rtnObj.divColor  = "purple"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.titClass  = dday === '실패' ? 'gray_badge' : 'purple_badge'
                rtnObj.dday      = dday
                if(obj.cstRkonDsc1 == '100') {
                    rtnObj.img       = "dog"
                } else if(obj.cstRkonDsc1 == '200') {
                    rtnObj.img       = "cat"
                } else if(obj.cstRkonDsc1 == '300') {
                    rtnObj.img       = "fish"
                } else if(obj.cstRkonDsc1 == '400') {
                    rtnObj.img       = "reptiles"
                }
            }
            return rtnObj
        },
        // 계좌 미연결 목록 팝업
        openAcountListPop() {
            let compName = PDMY4004;
            let pageTit = '';
            let pageGubun = 0
            if(this.tabDsc === 1) {          // 금융목표
                pageTit = this.pageTitle
                pageGubun = 0
            } else {                    // 버킷리스트
                pageTit = this.pageTitle
                pageGubun = 1
            }
            let param = {
                pageTit : pageTit,
                pageGubun : pageGubun
            }
            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(response => {

                if(response == "reSelect") {
                    this.getData(this.tabDsc)
                }
            })
        },
        // 버킷리스트 만들기
        openBckPop() {
            const config = {
                params: {
                    title: '버킷리스트 만들기'
                },
                renderer: {
                    component: PDMY4002
                }
            };

            modalService.openSlidePagePopup(config).then(response => {
                if(response == "reSelect") {
                    // 재조회
                    this.getData(this.tabDsc)
                }
            })
        },
        // 금융목표 만들기
        openFinancePop() {

            let expYn = 'N'
            if(this.expenseList.length > 0 && this.expenseList[0].stYm === this.stYm) {
                expYn = 'Y'
            }

            const config = {
                params: {
                    title: '금융목표 만들기',
                    expenseYn: expYn
                },
                renderer: {
                    component: PDMY4003
                }
            };
            

            modalService.openSlidePagePopup(config).then(response => {
                if(response.component.name != 'undefined' && response.component.name == "PDMY4032") {
                    if(this.xpsAm !== null && this.expenseList.length) {

						const configConfirm = {
							content: ["지출목표가 이미 등록되어 있습니다.<BR>등록된 지출 목표를 수정하시겠습니까?"],
							title  : "",
						}

						modalService.confirm(configConfirm).then(text => {

							if(text == "예") {

								// 수정화면으로 이동
								// modifyYn 상세조회(수정) 여부
								var param = {
									modifyYn:"Y", 
									stYm:this.stYm, 
									preXpsAm: this.xpsAm, 
								}
								const config = {
									component: response.component,
									params : param
								}

								modalService.openPopup(config).then(res => {
                                if(res == "reSelect") {
                                        // 재조회
                                        this.getData(this.tabDsc)
                                    }
                                })
							} else if(text == "아니오") {
								console.log("아니오")
							}

						})
                    } else {
                        modalService.openPopup(response).then(res => {
                            if(res == "reSelect") {
                                // 재조회
                                this.getData(this.tabDsc)
                            }
                        })
                    }
                } else {
                    modalService.openPopup(response).then(res => {
                        if(res == "reSelect") {
                            // 재조회
                            this.getData(this.tabDsc)
                        }
                    })
                }
			})
        },
        // 목표등록 화면
        openPurposePop() {
            let compName = PDMY4005;

            let param = {}
            const config = {
                component: compName,
                params : param
            }

            modalService.openPopup(config).then(response => {

                if(response == "reSelect") {
                    // 재조회
                    this.getData(this.tabDsc)
                }
            })
        },
        // 지출목표 상세이동
        detailMove1(stYm) {

            let compName = PDMY4033

            let asetAmnCtgrId = this.expenseList[0].asetAmnCtgrId || ''
            let flag

            // 카테고리 미선택시
            if(asetAmnCtgrId == '' || asetAmnCtgrId == null) {
                flag = '1'
            } else {
                flag = '2'
            }

            let param = {stYm:stYm, modifyYn:"Y", preXpsAm: this.xpsAm, flag : flag}
            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(response => {

                if(response == "reSelect") {
                    // 재조회
                    this.getData(this.tabDsc)
                }
            })
        },
        // 금융목표 상세이동
        detailMove2(fncObtDsc, sqno, prgStsCd, carGrdNo, carCtrimNo, basyy, basmm) {
            // 금융목표 상세화면으로
            let compName

            if(fncObtDsc == '01') compName = PDMY4039 /* 돈모으기 */
            if(fncObtDsc == '02') compName = PDMY4041 /* 투자목표 */
            if(fncObtDsc == '03') compName = PDMY4029 /* 버킷-내집마련 */
            if(fncObtDsc == '04') compName = PDMY4031 /* 버킷-여행 */
            if(fncObtDsc == '05') compName = PDMY4030 /* 버킷-자동차 */
            if(fncObtDsc == '06') compName = PDMY4026 /* 버킷-여가생활 */
            if(fncObtDsc == '07') compName = PDMY4027 /* 버킷-자기계발 */
            if(fncObtDsc == '08') compName = PDMY4028 /* 버킷-반려동물 */

            let param = {"fncObtDsc":fncObtDsc, "sqno": sqno, "prgStsCd":prgStsCd, "carGrdNo":carGrdNo, "carCtrimNo":carCtrimNo, "basyy":basyy, "basmm":basmm}
            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(response => {
                if(response == "reSelect") {
                    // 재조회
                    this.getData(this.tabDsc)
                    // this.fn_refreshApiCall() // 자산 업데이트
                }
            })
        },
        setLastDay(val = new Date()) {
            return dateFormat(getLastDay(dateFormat(val, 'YYYYMMDD')), 'YYYYMMDD')
        },
        // 버킷리스트 D-day
        setDday(obtDt, fncObtAchvYn) {
            
            let rtn
            const today = dateFormat(new Date(), 'YYYYMMDD')
            let diffDays = Number(dayDiff(dateFormat(obtDt, 'YYYYMMDD'), today) + 1) // 남은일자

            if(fncObtAchvYn === "0") {
                if(diffDays > 0) {
                    rtn = "D-" + diffDays
                } else {
                    rtn = "실패"
                }
            } else {
                rtn = "달성"
            }
            
            return rtn
        },
        // 금융목표 D-day
        setExpenseDday() {
            return "D-" + Number(getTmmRmDds() + 1)   // 남은일자(당월 잔여일수)
        },
        // 자산카테고리 명칭 세팅
        setAsetAmnCtgrNm(asetAmnCtgrId) {

            let asetAmnCtgrInfo = _.find(this.categoryList, {"asetAmnCtgrId":asetAmnCtgrId})
            if(typeof asetAmnCtgrInfo !== 'undefined') {
                return asetAmnCtgrInfo.ctgrnm
            }
        },
        onTabClick(tabDsc) {
            this.tabDsc = tabDsc
            this.myInfoList = null
            this.getData(this.tabDsc)
        },
        /**
         * 수집갱신 처리
         */
        // fn_refreshApiCall() {
        //     console.log('isMyAssetGathering', this.isMyAssetGathering)
        //     if (!this.isMyAssetGathering) {
        //         this.getAllMyAssetInfo()
        //         console.log('getAllMyAssetInfo() running')
        //     }
        // }
        
        //공유하기 테스트 팝업 Web Share Api 
        fn_Share(){
            
            const config = {
                params: { // 파라미터
                    title : "웹공유타이틀",
                    text  : "웹공유TEXT"
                },
            }
            
            modalService.webSharePopup(config).then(response => {

            })
            
        },
    },
    mounted() {
        this.initComponent(this.pageInfo.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin
    ],
    components: {
        Page,
        FootersV2,
        PdCategoryV2,
        //AsSubCategoryV2
    }
}
</script>