<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 데일리 금융브리핑
* @ 페이지설명 : 연금절세 > 데일리 금융브리핑
* @ 파일명     : src\views\page\PD\BF\PDBF4001\PDBF4001.vue
* @ 작성자     : CS528061
* @ 작성일     : 2022-10-05
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-05              CS528061              최초작성
* 2023-08-16              CS533571              마이데이터 확대 개발 UI/UX 일부개선
* 2025-02-13              CS541015              고도화 파일명, UI 변경 및 고도화 개발(PDBF2001.vue -> PDBF4001.vue)
*************************************************************************/
-->
<template>
    <page class="content-view mydata2023">
        <!--[v4.0] 삭제 
        <pd-category-v2 type="PDBF"></pd-category-v2> 
        -->
        <!-- height:101% 갤럭시 울트라에서 스크롤떨림현상 제거 -->
        <div id="content" class="sub_main renewal">
            <div class="com_inner financial_briefing">
                <!--[v4.0] 공공데이타-->
                <!-- <div class="open_data">
                    <div>
                        <div>
                            <a href="#">
                                <span class="title">[농업정보신문] 팜한농, 국립농헙과학원과 공동 연구협약</span>
                                <span class="date">2024.12.12</span>
                            </a>
                        </div>
                        <div>
                            <a href="#">
                                <span class="title">[농업정보신문] 팜한농, 국립농헙과학원과 공동 연구협약 팜한농, 국립농헙과학원과 공동 연구협약 팜한농, 국립농헙과학원과 공동 연구협약</span>
                                <span class="date">2024.12.13</span>
                            </a>
                        </div>
                        <div>
                            <a href="#">
                                <span class="title">[농업정보신문] 팜한농, 국립농헙과학원과 공동 연구협약</span>
                                <span class="date">2024.12.14</span>
                            </a>
                        </div>
                        <div>
                            <a href="#">
                                <span class="title">[농업정보신문] 팜한농, 국립농헙과학원과 공동 연구협약 팜한농, 국립농헙과학원과 공동 연구협약 팜한농, 국립농헙과학원과 공동 연구협약</span>
                                <span class="date">2024.12.15</span>
                            </a>
                        </div>
                    </div>
                    <p class="paging"></p>
                    <button type="button" title="정지" class="btn_controls"></button>
                </div> -->

                <!--
                [신문사/기관명] 원문 제목, 배포 일자
                날짜
                -->
                <!--//[v4.0] 공공데이타-->

                <!-- 테마 이슈 -->
                <div class="line_box_2023 link_type" v-if="themePrint != null && themePrint != ''">
                    <!-- 넘겨줄 화면이 있는 경우 -->
					<template v-if="themeLink != null && themeLink != ''">
                        <a href="javascript:void(0);" role="button" class="arrow" @click.prevent="fn_theme(themeLink)">
                            <div class="bg_box">
                                <strong class="titH4">테마 이슈</strong>
                            </div>
                            <div class="text">
                                <p>{{themePrint}}</p>
                            </div>
                        </a>
                    </template>
                    <!-- 넘겨줄 화면이 없는 경우 -->
                    <template v-else>
                        <div class="bg_box">
                            <strong class="titH4">테마 이슈</strong>
                        </div>
                        <div class="text">
                            <p>{{themePrint}}</p>
                        </div>
                    </template>
                </div>
                <!-- //테마 이슈 -->

                <!-- 금융 알림 -->
                <div v-if="financialList && financialList.length > 0" class="line_box_2023 link_type">
                    <a href="javascript:void(0);" role="button" class="arrow" @click.prevent="fn_financial(financialList[0].url)">
                        <div class="bg_box">
                            <strong class="titH4">금융 알림</strong>
                        </div>
                        <div class="text">
                            <p>{{financialList[0].msg}}</p>
                        </div>
                    </a>
                </div>
                <!-- //금융 알림 -->

                <!-- 정기지출 알림 -->
                <div v-if="rglrExpendList && rglrExpendList.length > 0" class="line_box_2023 link_type">
                    <a href="javascript:void(0);" role="button" class="arrow" @click.prevent="fn_rglrExpend('LCIP2007')">
                        <div class="bg_box">
                            <strong class="titH4">정기지출 알림</strong>
                        </div>
                        <div class="text">
                            <p>{{rglrExpendList[0].msg}}</p>
                            <span class="custom_txt_info01" v-if="rglrExpendList[0].ctgrNm != null && rglrExpendList[0].ctgrNm != ''">- {{rglrExpendList[0].ctgrNm}}</span>
                        </div>
                        <div class="list_gray_box" v-if="rglrExpendList[0].ancList && rglrExpendList[0].ancList.length > 0">
                            <dl v-for="(ancItem, ancIdx) in rglrExpendList[0].ancList" :key="'rglrExpendAncList_' + ancIdx">
                                <dt>{{ancItem.trDt | dateFilter('M월 DD일')}}</dt>
                                <dd>{{ancItem.ctgrNm}}</dd>
                            </dl>
                        </div>
                    </a>
                </div>
                <!-- //정기지출 알림 -->

                <!-- 가장 최근 고시 환율 정보 Slide -->
                <!-- <div class="exchangerate_info" :class="themeList.length == 0 && financialList.length == 0 && rglrExpendList.length == 0 ? 'mt30' : ''" :key="'xcrt_'+refKey"> -->
                <div class="exchangerate_info" :class="themeList.length == 0 && financialList.length == 0 && rglrExpendList.length == 0 ? 'mt30' : ''" :key="'xcrt_'+itemIndex2" ref='exchangeInfoBanner' tabindex='0'>
                    <div class="custom_box custom_box2 custom_box_info">
                        <div class="slide slick_refresh product">
                            <div class="item" v-for="(curcItem, idx) in xcrtList" :key="'curc_'+idx">
                                <div class="content_wrap">
                                    <div class="com_box_type01 com_box_list2 custom">
                                        <div class="new_tit_area">
                                                <button type="button" class="com_btnselect_type01" title="통화 선택" @click.prevent="fn_curc()">
                                                    <span>
                                                        <!-- 
                                                            기본(icon) 국기명클래스(ico_JPY, ico_USD)
                                                        -->
                                                        <i class="ico" :class="'ico_'+curcItem.curc"> <!-- mydata.css 국가별 아이콘 196번 줄 ~ 218번 참고-->
                                                            <span class="blind">{{curcItem.curcCont}}</span>
                                                        </i>
                                                    <span>{{curcItem.curcCont.concat(' ', curcItem.curc)}}</span>
                                                </span>
                                            </button>
                                        </div>
                                        <div class="standard">
                                            <div class="com_price">
                                                <em class="unit">KRW</em><strong class="num counter" :data-count="curcItem.dlbsrt">{{addComma(Number(curcItem.dlbsrt))}}</strong>
                                                <!-- 
                                                    통화 선택버튼 클릭 후 미국, 일본, 유로연합, 중국, 호주, 캐나다 등 각 나라를 
                                                    각각 클릭시 해당 데이터 표시 후 매매 기준율 숫자 인터렉션됩니다.
                                                    (
                                                        클래스명 	: class="counter"
                                                        속성명 		: data-count="112356"
            
                                                        해당 클래스(counter) /속성(data-count) 삽입시 숫자 인터렉션됩니다
                                                    )
                                                -->
                                                <template v-if="curcItem.subDlbsrt > 0">
                                                    <span class="change_rate up" role="img" :aria-label="'상승 ' + addComma(Math.abs(curcItem.subDlbsrt))">
                                                        <em>{{addComma(Math.abs(curcItem.subDlbsrt))}}</em>
                                                    </span>
                                                </template>
                                                <template v-else-if="curcItem.subDlbsrt < 0">
                                                    <span class="change_rate down" role="img" :aria-label="'하락 ' + addComma(Math.abs(curcItem.subDlbsrt))">
                                                        <em>{{addComma(Math.abs(curcItem.subDlbsrt))}}</em>
                                                    </span>
                                                </template>
                                            </div>
                                            <p class="date">{{curcItem.rgDt | dateFilter('YYYY.MM.DD')}} 기준</p>
                                        </div>

                                        <!--[v4.0] 알림조건-->
                                        <template v-if="curcItem.maxpr > 0 || curcItem.lowpr > 0">
                                            <div class="exchange_noti">
                                                <span class="change_rate up" v-if="curcItem.maxpr > 0">
                                                    <span class="blind">상한</span>
                                                    <em>KRW {{addComma(Number(curcItem.maxpr))}}</em>
                                                </span>
                                                <span class="change_rate down" v-if="curcItem.lowpr > 0">
                                                    <span class="blind">하한</span>
                                                    <em>KRW {{addComma(Number(curcItem.lowpr))}}</em>
                                                </span>
                                            </div>
                                        </template>
                                        <!--//[v4.0] 알림조건-->

                                        <!--[v4.0] 알림조건 : 없을 경우-->
                                        <template v-else>
                                            <div class="exchange_noti">
                                                <button type="button" @click.prevent="fn_openSlidePopup(curcItem)">환율 도달 금액 설정하고 알림 받기</button>
                                            </div>
                                        </template>
                                        <!--//[v4.0] 알림조건 : 없을 경우-->

                                        <div class="list_gray_box mt20">
                                            <dl>
                                                <dt>현찰 살 때</dt>
                                                <dd>KRW <em class="num">{{addComma(Number(curcItem.ttxs))}}</em></dd>
                                            </dl>
                                            <dl>
                                                <dt>현찰 팔 때</dt>
                                                <dd>KRW <em class="num">{{addComma(Number(curcItem.ttbrt))}}</em></dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--// 가장 최근 고시 환율 정보 Slide -->

                <!-- [주가지수/주식 배너] 25-05-15 추가 -->
                <div class="slick_exchange" :key="'key_'+itemIndex" ref='exchangeBanner' tabindex='0'> 
                    <div class="inner">
                        <!-- KOSPI 지수 배너 -->
                        <dl class="exchange" v-for="(item, idx) in kosIdxList" :key="'kosIdx_'+idx">
                            <dt>{{item.stprDsc}}</dt>
                            <dd class="factor">
                                <span class="num">{{addComma(item.stprIxEpr)}}</span>
                                <span class="range" :class="upDown(item.bdCmprRnf)" :aria-label="markUpText(item.bdCmprRnf, 'Y')">{{Math.abs(Number(item.bdCmprRnf).toFixed(2))}}%&nbsp;(전일대비)</span>
                            </dd>
                            <dd class="basis">
                                <span>{{item.basDt | dateFilter('YYYY.MM.DD')}} 기준</span>
                            </dd>
                        </dl>

                        <!-- 관심 주식 배너  -->
                        <template v-if="inteStockList.length > 0 && inteStockList">
                            <dl class="exchange stock" v-for="(item, idx) in inteStockList" :key="'inteStock_'+idx"> 
                                <dt>{{item.stkItmnm}}
                                    <button type="button" class="btn_setting" @click.prevent="fn_stockList()"><span class="blind">주식종목 설정</span></button>
                                </dt>
                                <dd class="factor">
                                    <span class="num">{{addComma(item.stkEpr)}}</span>
                                    <span class="range" :class="upDown(item.bdCmprRnf)" :aria-label="markUpText(item.bdCmprRnf, 'Y')">{{Math.abs(Number(item.bdCmprRnf).toFixed(2))}}% (전일대비)</span>
                                </dd>
                                <dd class="basis">
                                    <span>{{item.basDt | dateFilter('YYYY.MM.DD')}} 기준</span>
                                </dd>
                            </dl>
                        </template>
                        <template v-else>
                            <div class="exchange"> 
                                <a href="javascript:void(0);" class="select_empty"  @click.prevent="fn_stockList()">
                                    <p>노출할 주식 종목을 선택해 주세요.</p>
                                </a>
                            </div>
                        </template>
                    </div>

                    <!-- 
                    <div class="controls">
                        <p class="paging"></p>
                        <button type="button" class="prev"><span class="blind">이전</span></button>
                        <button type="button" class="next"><span class="blind">다음</span></button>
                        <button type="button" class="btn_play"><span class="blind">정지</span></button>
                    </div> 
                    -->
                </div>

                <template v-if="this.getUserInfo('chnl') === '386'">
                    <!--[v4.0] 25-02-25 배너추가--->
                    <a href="javascript:void(0);" class="mt20" @click.prevent="moveCokBnk('CBFEP1000R')">
                        <img src="@/assets_v40/images/banner/img_banner_exchange_pocket.png" alt="환율 목표금액에 도달했나요? 목표금액으로 환전해 보세요.">
                    </a>
                    <!--//[v4.0] 25-02-25 배너추가--->
                </template>
            
                <!-- 고객별 추천상품 Slide -->
                <!-- <div v-if="resultRcmList && resultRcmList.length > 0" class="custom_box_product01" :key="'rcm_'+refRcmKey"> -->
                <div v-if="resultRcmList && resultRcmList.length > 0" class="custom_box_product01">
                    <div class="slide slick_refresh product">
                        <div class="item" v-for="(rcmItem, idx) in resultRcmList" :key="'rcm'+idx">
                            <a href="javascript:void(0)" role="button" class="arrow" @click.prevent="movePage('PDPD4001')">
                                <div class="title_area">
                                    <strong class="titH4">고객님을 위한 추천상품 {{idx + 1}}</strong>
                                    <span class="badge_2023 soft_orange" v-if="rcmItem.wrsGrTpc == 'RVGTP'">적금</span>
									<span class="badge_2023 soft_orange" v-else-if="rcmItem.wrsGrTpc == 'DFFM'">예금</span>
									<span class="badge_2023 soft_orange" v-else-if="rcmItem.wrsGrTpc == 'LN'">대출</span>
                                </div>
                                <div class="product_info">
                                    <strong class="name">{{rcmItem.wrsnmPrtnm}}</strong>
                                    <p class="desc">{{rcmItem.rcmWrsBrfCntn}}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <!--// 고객별 추천상품 Slide -->
            </div>

            <!--스크롤이 짧게 생길경우 위로 쭉 드래그하면 떨리는 듯한 현상제거하기 위해 삽입-->
        </div>
        <footersV2 type="pd" />
    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import PdCategoryV2 from '@/components/category/PdCategoryV2.vue'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import appService from '@/service/appService'
import commonMixin from '@/common/mixins/commonMixin'
import {dateFormat} from '@/utils/date'
import {fncSlick_briefing, fncSlick_briefing2} from '@/utils/slick'

import apiService from '@/service/apiService'

import ASCR4101 from '@/views/page/AS/CR/ASCR4101/ASCR4101'
import ASRE1203 from '@/views/page/AS/RE/ASRE1203/ASRE1203'  // 재산세계산기
import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002'  // 자산연결기관선택

import CORE4201 from '@/views/page/CO/RE/CORE4201/CORE4201'
import LCIP2012 from '@/views/page/LC/IP/LCIP2012/LCIP2012'   // 지출 또래 비교

import LCIP2007 from '@/views/page/LC/IP/LCIP2007/LCIP2007'   // 정기지출
import PDBF4002 from '@/views/page/PD/BF/PDBF4002/PDBF4002'
import PDBF4004 from '@/views/page/PD/BF/PDBF4004/PDBF4004'
import RETA4002 from '@/views/page/RE/TA/RETA4002/RETA4002'  // 주식 선택 팝업

export default {
    name : "PDBF4001",
    data: () => {
        return {
            themeList      : [],   // 테마이슈 목록
            financialList  : [],   // 금융알림 목록
            rglrExpendList : [],   // 정기지출알림 목록
            xcrtList	   : [],   // 나의통화환율 목록
            rcmList        : [],   // 추천상품목록

            curcList	   : [],   // 환율 목록

            mydtCusno      : "",   // 마이데이터고객번호
            curDt          : "",   // 현재일자
            basYm		   : "",   // 정기지출리포트에 넘겨줄 기준년월

            refKey		   : 0,    // slick으로 인한 key 설정
            //refRcmKey	   : 0,    // slick으로 인한 key 설정

            inqMm		   : "",   // 테마이슈 현재월
            inqDd		   : "",   // 테마이슈 현재일
            showYn         : "N",  // 테마이슈 노출여부

            themePrint     : '',   // 테마이슈 출력내용
            themeLink      : '',   // 테마이슈 연결화면

            resultRcmList  : [],   // 추천상품 출력 목록

            kosIdxList     : [],   // 코스피,코스닥 지수 목록
            inteStockList  : [],   // 나의관심 주식 목록
        }
    },
    computed : {
        itemIndex() {
            return this.isNull(this.kosIdxList.length + this.inteStockList.length) ? 0 : this.kosIdxList.length + this.inteStockList.length 
        },
        itemIndex2() {
            return this.isNull(this.xcrtList.length) ? 0 : this.xcrtList.length 
        }
    },
    created() {
    },
    mounted() {
        this.initComponent()      
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },

    methods: {
        initComponent() {
            this.mydtCusno = this.getUserInfo('mydtCusno')
            this.curDt = dateFormat(new Date(), 'YYYYMMDD')
            this.basYm = dateFormat(new Date(), 'YYYYMM')
            this.inqMm = dateFormat(new Date(), 'MM')
            this.inqDd = dateFormat(new Date(), 'DD')
            //this.getRssCnt();
            this.getData();         
            this.getKosIdxList()    // 코스피코스닥 지수 가져오기
            this.fn_getInteStock()  // 관심 주식 목록   
            // this.slick();
        
        },
        getData() {
            this.resultRcmList  = []

            const config = {
                url: '/pd/bf/01r02',
                data: {
                    "mydtCusno": this.mydtCusno           // 마이데이터고객번호
                    ,"rgDt"    : this.curDt               // 현재일자
                    ,"chnl"    : this.getUserInfo('chnl') // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
                    ,"inqMm"   : this.inqMm               // 기준월
                }
            };
            
            apiService.call(config).then(response => {
                this.themeList      = response.themeList      || []
                this.financialList  = response.financialList  || []
                this.rglrExpendList = response.rglrExpendList || []
                this.xcrtList       = response.xcrtList       || []
                this.rcmList        = response.rcmList        || []

                if(this.rcmList.find((wrsRcm) => wrsRcm.wrsGrTpc == 'RVGTP') != undefined) {
                    this.resultRcmList.push(this.rcmList.find((wrsRcm) => wrsRcm.wrsGrTpc == 'RVGTP'))
                }
                if(this.rcmList.find((wrsRcm) => wrsRcm.wrsGrTpc == 'DFFM') != undefined) {
                    this.resultRcmList.push(this.rcmList.find((wrsRcm) => wrsRcm.wrsGrTpc == 'DFFM'))
                }
                if(this.rcmList.find((wrsRcm) => wrsRcm.wrsGrTpc == 'LN') != undefined) {
                    this.resultRcmList.push(this.rcmList.find((wrsRcm) => wrsRcm.wrsGrTpc == 'LN'))
                }

                this.refKey += 1  // slick refresh(통화의 개수가 줄어들면 unslick이 되지 않아 key를 지정하여 새로 그려지게 함)
                //this.refRcmKey += 1

                // for(let i=0; i<this.xcrtList.length; i++) {
                //     if(this.xcrtList[i].curc === "JPY" || this.xcrtList[i].curc === "IDR" || this.xcrtList[i].curc === "VND") {
                //         this.xcrtList[i].dlbsrt = roundNumberWithDot(this.xcrtList[i].dlbsrt / 100, 2);
                //         this.xcrtList[i].ttxs = roundNumberWithDot(this.xcrtList[i].ttxs / 100, 2);
                //         this.xcrtList[i].ttbrt = roundNumberWithDot(this.xcrtList[i].ttbrt / 100, 2)
                //     }
                // }

                this.themePrint = ''
                this.themeLink = ''

                for(let i = 0; i < this.themeList.length; i++) {
                    if(this.inqMm == "01" || this.inqMm == "06") {
                        if(this.themeList[i].carYn == 'Y' && this.themeList[i].expsPrdDsc == '03') {
                            if(this.inqDd > 15) {
                                this.showYn = 'Y'
                            } else {
                                this.showYn = 'N'
                            }
                        } else {
                            this.showYn = 'Y'
                        }
                    } else if(this.inqMm == "05") {
                        if(this.themeList[i].expsPrdDsc == '03') {
                            if(this.inqDd > 15) {
                                if(this.inqDd % 2 + 1 == this.themeList[i].expsSq) {
                                    this.showYn = 'Y'
                                } else {
                                    this.showYn = 'N'
                                }
                            } else {
                                this.showYn = 'N'
                            }
                        } else if(this.themeList[i].expsPrdDsc == '02') {
                            this.showYn = 'Y'
                        }
                    } else if(this.inqMm == "12") {
                        if(this.themeList[i].expsPrdDsc == '03') {
                            if(this.inqDd > 15) {
                                this.showYn = 'Y'
                            } else {
                                this.showYn = 'N'
                            }
                        } else if(this.themeList[i].expsPrdDsc == '02') {
                            this.showYn = 'Y'
                        }
                    } else {
                        this.showYn = 'Y'
                    }

                    if(this.showYn == 'Y') {
                        this.themePrint = this.themeList[i].expsMsgCntn
                        this.themeLink = this.themeList[i].cnctSvcid
                        break;
                    }
                }
                
                this.$nextTick(() => {
                    //this.callJQueryFncExcute();
                    /*
                    $('.custom_box_info .slide').filter('.slick-initialized').slick('unslick');	
                    setTimeout(()=>{
                        fncSlick_briefing();
                    }, 30)

                    $('.custom_box_product01 .slide').filter('.slick-initialized').slick('unslick');	
                    setTimeout(()=>{
                        fncSlick_briefing2();
                    }, 30)
                    */
                   $('.custom_box_info .slide').filter('.slick-initialized').slick('unslick');	
                    fncSlick_briefing();
                    $('.custom_box_product01 .slide').filter('.slick-initialized').slick('unslick');	
                    fncSlick_briefing2();
                });
            });
            
        },
        getRssCnt() {
            const config1 = {
                url: 'https://www.mafra.go.kr/bbs/home/791/rssList.do?row=50',
                data: {}
            };
            apiService.callRSS(config1).then(response => {
                console.log("RSS response 농림축산 >>>>>>>>>>> ", response)
            })

            const config2 = {
                url: 'https://www.mfds.go.kr/www/rss/brd.do?brdId=ntc0003',
                data: {}
            };
            apiService.callRSS(config2).then(response => {
                console.log("RSS response 식품의약처 >>>>>>>>>>> ", response)
            })

            const config3 = {
                url: 'https://www.rda.go.kr/rss/rss.jsp?board_id=ppemovent',
                data: {}
            };
            apiService.callRSS(config3).then(response => {
                console.log("RSS response 농촌진흥청>>>>>>>>>>> ", response)
            })

            const config4 = {
                url: 'https://www.nongup.net/rss/allArticle.xml',
                data: {}
            };
            apiService.callRSS(config4).then(response => {
                console.log("RSS response 농업정보신문 >>>>>>>>>>> ", response)
            })
        },
        addComma(nStr){
            return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        },
        fn_theme(url) {
            let flag = 'page'
            let compName = ''

            if(url == 'ASCR4101' || url == 'ASRE1203' || url == 'COAR4002') {
                flag = 'popup'
            }

            if(flag == 'page') {
                const config = {
                    name   : url
                }
                commonService.movePage(config);
            } else if(flag == 'popup') {
                if(url == 'ASCR4101') {
                    compName = ASCR4101
                } else if(url == 'ASRE1203') {
                    compName = ASRE1203
                } else if(url == 'COAR4002') {
                    compName = COAR4002
                }
                const config = {
                        component: compName
                    }
                    modalService.openPopup(config).then(() => {})
            }

        },
        fn_financial(url) {
            let flag = 'page' // 화면, 팝업 구분

            if(url == 'CORE4201' || url == 'LCIP2012' || url == 'COAR4002') {
                flag = 'popup'
            }

            if(flag == 'page') {
                const config = {
                    name   : url
                }
                commonService.movePage(config);
            } else if(flag == 'popup') {
                if(url == 'CORE4201') {
                    const config = {
                        component: CORE4201,
                        params   : {"popId":url}
                    }
                    modalService.openPopup(config).then((response) => {
                        if(response == 'refresh' || response == 'CORE4201') {
                            this.getData()  // 부동산 등록 완료시 부동산이 있으므로 금융알림 항목이 바뀌어야 함
                        }
                    })

                } else if(url == 'LCIP2012') {
                    let param = {
                        pBasYm : this.basYm
                    }
                    const config = {
                        component: LCIP2012,
                        params   : param
                    }
                    modalService.openPopup(config).then(() => {})

                } else if(url == 'COAR4002') {
                    const config = {
                        component: COAR4002
                    }
                    modalService.openPopup(config).then(() => {})
                }
            }
        },
        fn_rglrExpend(url) {
            let compName = ''
            
            if(url == 'LCIP2007') {
                compName = LCIP2007
            }

            const param = {pBasYm : this.basYm}

            const config = {
                component : compName,
                params    : param
            }
            modalService.openPopup(config).then(() => {

            })
        },
        fn_curc() {
            const config = {
                component: PDBF4002
            }
            modalService.openPopup(config).then((response) => {
                if(response == 'success') { // PDBF1002 화면에서 등록 버튼을 누른 경우
                    this.getData();
                }
            })
        },
        fn_openSlidePopup(item) {
            const config = {
                params : {
                    curc : item.curc,
                    curcCont : item.curcCont
                },
                renderer : {
                    component : PDBF4004
                }
            }
            modalService.openSlidePagePopup(config).then((response) => {
                if(response === 'success') {
                    this.getData();
                }
            })
        },
        movePage(url, param) {
            let params = {};
            params = param
            const config = {
                name   : url,
                params : params
            }

            commonService.movePage(config);
        },
        // 배너 이동
        moveCokBnk(url) {
            appService.cokBankGoMove(url)
        },
        slick() { //[v4.0] 퍼블 스크립트 추가
			var $openData =  $('.open_data > div');

			$openData.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
					var i = (currentSlide ? currentSlide : 0 ) + 1 ;
					$(".open_data .paging").html('<em>'+i + '</em> / ' + slick.slideCount)

			});

			$openData.slick({
                speed : 1000,
                dots : false,
                adaptiveHeight: false,
				autoplay:true,
				autoplaySpeed:2000,
                infinite: true,
                draggable: true,
                accessibility:true,
				arrows : true,
                prevArrow: "<button type='button' class='slick-prev'><span class='blind'>이전<span></button>",
                nextArrow: "<button type='button' class='slick-next'><span class='blind'>다음<span></button>",				
			});

			const constrols  = $(".open_data .btn_controls");

			constrols.click(function(){
				if($(this).hasClass('paused')){//정지상태
					$openData.slick('slickPlay');
					$(this).removeClass('paused');
					$(this).attr('title', '정지');
				}else{//자동재생 중
					$openData.slick('slickPause');
					$(this).addClass('paused');
					$(this).attr('title', '재생');
				}
			});

			$(".open_data .slick-arrow").click(function(){
				if(constrols.hasClass('paused')){}else{
					$openData.slick('slickPause');
					constrols.addClass('paused');
					constrols.attr('title', '재생');
				}
				//slick-arrow
			})

            //25-05-15 스크립트 추가
			$(".slick_exchange").each(function(){
				let $this = $(this);

				$(".inner", $this).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
					var i = (currentSlide ? currentSlide : 0 ) + 1 ;
					$(".paging", $this).html('<em>'+i + '</em> / ' + slick.slideCount);  
				});

				$(".inner", $this).slick({
					speed : 300,
					dots : true,
					adaptiveHeight: false,
					autoplay:false,
					infinite: true,
					draggable: true,
					accessibility:true,
					arrows : true,
					cssEase:'linear',
					prevArrow:$(".controls .prev", $this),
					nextArrow:$(".controls .next", $this),
				});

			});
        },

        // 코스피, 코스닥 지수목록 가져오기
        getKosIdxList() {
            const config = {
                url: '/re/si/01r01', 
                data: {
                    "basDt" : this.curDt, //오늘 날짜   
                },
            }

            apiService.call(config).then(response => {
                console.log("getKosIdxList :: ", response)
                this.kosIdxList = response.korStcIdxList;               
                this.$nextTick(() => {
                    //$('.slick_exchange').filter('.slick-initialized').slick('unslick');		
                    $(this.$refs.exchangeBanner.querySelector('.slick-initialized')).slick('unslick');	
                    this.slick();
                })
            })
        },
        
        // 지수 상승하락 확인
        upDown(index) {
            return Number(index) > 0 ? 'up' : Number(index) == 0 ? '0' : 'down'
        },

        // 관심 주식 종목 선택 팝업 
        fn_stockList() {
            const config = {
                component: RETA4002
            }
            modalService.openPopup(config).then((response) => {
                if(response == 'success') { // RETA4002 화면에서 등록 버튼을 누른 경우
                    this.fn_getInteStock()
                }
            })
        },

        // 관심 주식 종목 가져오기
        fn_getInteStock() {
			console.log("관심주식목록...")		
			const config = {
                url: '/re/si/02r02', 
                data: {
					"basDt"		: this.curDt,
					"mydtCusno" : this.mydtCusno
				}
            }
			
            apiService.call(config).then(response => {          
                this.inteStockList = response.myInteStkList;
                this.$nextTick(() => {
                    $(this.$refs.exchangeBanner.querySelector('.slick-initialized')).slick('unslick');	
                    this.slick();
                })           
            })
            
		},

        // v4 지수/통화 상승하락 텍스트(MARKUP)
        markUpText(var1, var2) {
            let markUpVal = Number(var1) > 0 ? '상승' : Number(var1) == 0 ? '동일' : "하락"
            let percentYn = var2 == 'Y' ? '%' : ''

            if (Number(var1) == 0) {
                markUpVal = markUpVal + " " +" 전일대비"
            } else {
                markUpVal = markUpVal + " " + var1 + percentYn +" 전일대비"
            }
            
            return markUpVal
        },
    },
    mixins: [
        commonMixin
    ],
    components: {
        Page,
        FootersV2,
        PdCategoryV2,
    },
} 
</script>
<style scoped>
    .custom_box_info .slide, .custom_box_product01 .slide {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.1s ease;
        -webkit-transition: opacity 0.1s;
    }
    .custom_box_info .slide.slick-initialized, .custom_box_product01 .slide.slick-initialized {
        visibility: visible;
        opacity: 1;
    }
</style>