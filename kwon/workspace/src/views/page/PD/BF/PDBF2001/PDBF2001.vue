<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 금융브리핑
* @ 페이지설명 : 금융생활 > 금융브리핑 > 메인
* @ 파일명     : src\views\page\PD\BF\PDBF2001\PDBF2001.vue
* @ 작성자     : CS528061
* @ 작성일     : 2022-10-05
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-05              CS528061              최초작성
* 2023-08-16              CS533571              마이데이터 확대 개발 UI/UX 일부개선
*************************************************************************/
-->
<template>
    <page class="content-view mydata2023">
        <pd-category-v2 type="PDBF"></pd-category-v2>
        <!-- height:101% 갤럭시 울트라에서 스크롤떨림현상 제거 -->
        <div id="content" class="sub_main renewal">
            <div class="com_inner financial_briefing">
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
                <div class="exchangerate_info" :class="themeList.length == 0 && financialList.length == 0 && rglrExpendList.length == 0 ? 'mt30' : ''" :key="'xcrt_'+refKey">
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
                                                <strong class="num counter" :data-count="curcItem.dlbsrt">{{addComma(Number(curcItem.dlbsrt))}}</strong><em class="unit">KRW</em>
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
                                            <p class="date">{{curcItem.rgDt | dateFilter('YYYY.MM.DD')}} 6시기준</p>
                                        </div>
                                        <div class="list_gray_box mt20">
                                            <dl>
                                                <dt>현찰 살 때</dt>
                                                <dd><em class="num">{{addComma(Number(curcItem.ttxs))}}</em>KRW</dd>
                                            </dl>
                                            <dl>
                                                <dt>현찰 팔 때</dt>
                                                <dd><em class="num">{{addComma(Number(curcItem.ttbrt))}}</em>KRW</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--// 가장 최근 고시 환율 정보 Slide -->
            
                <!-- 고객별 추천상품 Slide -->
                <div v-if="resultRcmList && resultRcmList.length > 0" class="custom_box_product01" :key="'rcm_'+refRcmKey">
                    <div class="slide slick_refresh product">
                        <div class="item" v-for="(rcmItem, idx) in resultRcmList" :key="'rcm'+idx">
                            <a href="javascript:void(0)" role="button" class="arrow" @click.prevent="movePage('PDPD1001')">
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
            <br>
            <br>
            <br>
            <br>
        </div>
        <footersV2 type="pd" />
    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import commonMixin from '@/common/mixins/commonMixin'
import {dateFormat} from '@/utils/date'
// import {roundNumberWithDot} from '@/utils/number'
import {fncSlick_briefing, fncSlick_briefing2} from '@/utils/slick'

import PdCategoryV2 from '@/components/category/PdCategoryV2.vue'
import apiService from '@/service/apiService'

import ASCR1101 from '@/views/page/AS/CR/ASCR1101/ASCR1101'
import ASRE1203 from '@/views/page/AS/RE/ASRE1203/ASRE1203'
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'

import CORE2201 from '@/views/page/CO/RE/CORE2201/CORE2201'
import LCIP2012 from '@/views/page/LC/IP/LCIP2012/LCIP2012'

import LCIP2007 from '@/views/page/LC/IP/LCIP2007/LCIP2007'
import PDBF2002 from '@/views/page/PD/BF/PDBF2002/PDBF2002'

export default {
    name : "PDBF2001",
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
            refRcmKey	   : 0,    // slick으로 인한 key 설정

            inqMm		   : "",   // 테마이슈 현재월
            inqDd		   : "",   // 테마이슈 현재일
            showYn         : "N",  // 테마이슈 노출여부

            themePrint     : '',   // 테마이슈 출력내용
            themeLink      : '',   // 테마이슈 연결화면

            resultRcmList  : [],   // 추천상품 출력 목록
        }
    },
    computed : {
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
            this.getData();
        },
        getData() {
            this.resultRcmList  = []

            const config = {
                url: '/pd/bf/01r01',
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
                this.refRcmKey += 1

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

                    $('.custom_box_info .slide').filter('.slick-initialized').slick('unslick');	
                    setTimeout(()=>{
                        fncSlick_briefing();
                    }, 30)

                    $('.custom_box_product01 .slide').filter('.slick-initialized').slick('unslick');	
                    setTimeout(()=>{
                        fncSlick_briefing2();
                    }, 30)
                    
                });
            });
        },
        addComma(nStr){
            return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        },
        fn_theme(url) {
            let flag = 'page'
            let compName = ''

            if(url == 'ASCR1101' || url == 'ASRE1203' || url == 'COAR2002') {
                flag = 'popup'
            }

            if(flag == 'page') {
                const config = {
                    name   : url
                }
                commonService.movePage(config);
            } else if(flag == 'popup') {
                if(url == 'ASCR1101') {
                    compName = ASCR1101
                } else if(url == 'ASRE1203') {
                    compName = ASRE1203
                } else if(url == 'COAR2002') {
                    compName = COAR2002
                }
                const config = {
                        component: compName
                    }
                    modalService.openPopup(config).then(() => {})
            }

        },
        fn_financial(url) {
            let flag = 'page' // 화면, 팝업 구분

            if(url == 'CORE2201' || url == 'LCIP2012' || url == 'COAR2002') {
                flag = 'popup'
            }

            if(flag == 'page') {
                const config = {
                    name   : url
                }
                commonService.movePage(config);
            } else if(flag == 'popup') {
                if(url == 'CORE2201') {
                    const config = {
                        component: CORE2201,
                        params   : {"popId":url}
                    }
                    modalService.openPopup(config).then((response) => {
                        if(response == 'refresh' || response == 'CORE2201') {
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

                } else if(url == 'COAR2002') {
                    const config = {
                        component: COAR2002
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
                component: PDBF2002
            }
            modalService.openPopup(config).then((response) => {
                if(response == 'success') { // PDBF1002 화면에서 등록 버튼을 누른 경우
                    this.getData();
                }
            })
        },
        movePage(url) {
            const config = {
                name   : url
            }

            commonService.movePage(config);
        },
    },
    mixins: [
        commonMixin
    ],
    components: {
        Page,
        FootersV2,
        PdCategoryV2
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