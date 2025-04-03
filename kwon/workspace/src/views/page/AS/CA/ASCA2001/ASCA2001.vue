<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 자산현황 > 자동차
* @ 페이지설명 : 자산 > 자산현황 > 자동차 메인
* @ 파일명     : src/views/page/AS/CA/ASCA2001/ASCA2001.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-05-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-28              CS516033              최초작성
* 2021-07-22              CS516033              2차개발
* 2022-07-08              CS528061              AS/RA/ASRA1103/ASRA1103.vue -> AS/CA/ASCA1201/ASCA1201.vue 변경
* 2023-08-14              CS533571              마이데이터 확대개발(ASCA1201 -> ASCA2001)
*************************************************************************/
-->
<template>
    <page class="content-view hasLNB mydata2023">
        <!-- S :: 자산 카테고리 -->
        <!--
        <as-category-v2 type="AC"></as-category-v2>
        -->
        <!-- E :: 자산 카테고리 -->

        <!-- S :: 자산 서브 카테고리 -->
        <as-sub-category-v2 type="RA2"></as-sub-category-v2>
        <!-- <as-sub-category-v2 type="RA2" typeDtl="03"></as-sub-category-v2> -->
        <!-- E :: 자산 서브 카테고리 -->
        <!--
        <div id="content" class="renewal" v-if="carList.length > 0">
        -->
        <div id="content" v-if="carList.length > 0">
            <div class="com_inner">
                <div class="new_sub_info">
                    <div class="title">
                        <div class="text">
                            내 차 시세<br>
                            <span class="fs-27">총 </span><strong><span class="num">{{totOdmtrDistMprAm | numberFilter}}</span>원</strong>
                        </div>
                    </div>
                </div>
            </div>
            
            <hr class="hr02">

            <div class="com_inner">
                <!-- 보유한 자동차 정보 영역 -->
                <div class="hold_info">
                    <div class="house_slide slide slick_refresh">
                        <div class="item" v-for="(carInfo, idx) in carList" :key="'car_'+idx">
                            <div class="title_area">										
                                <p class="name">{{carInfo.carModlnm}}</p>
                                <p class="sub_text">{{carInfo.carGrdnm}}</p>
                            </div>

                            <div class="car_pic">
                                <img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="fn_setAlt(carInfo)" style="width:16.2rem;"><!-- 웹 -->
                                <img v-else :src="carInfo.cartpRepImgUrlnm" @error="emptyImg" :alt="fn_setAlt(carInfo)" style="width:16.2rem;"><!-- 기기(ios, android) -->
                            </div>

                            <div class="price_area">
                                <template v-if="carInfo.odmtrDistMprAm1 > 0 && carInfo.odmtrDistMprAm2 > 0">
                                    <p class="price">{{carInfo.odmtrDistMprAm1 | numberFilter}}억</p>
                                </template>
                                <template v-else-if="carInfo.odmtrDistMprAm1 > 0">
                                    <p class="price">{{carInfo.odmtrDistMprAm1 | numberFilter}}억원</p>
                                </template>
                                <template v-if="carInfo.odmtrDistMprAm2 > 0">
                                    <p class="price">{{carInfo.odmtrDistMprAm2 | numberFilter}}만원</p>
                                </template>
                            </div>
                            
                            <ul class="carinfo_list">
                                <li>
                                    <dl>
                                        <dt>차량번호</dt>
                                        <dd class="num">{{carInfo.vhcnoVal}}</dd>
                                    </dl>
                                </li>
                                <li>	
                                    <dl>
                                        <dt>연식</dt>
                                        <dd><em class="num">{{carInfo.carMdyrYy}}</em>년</dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>주행거리</dt>
                                        <dd class="num">{{fn_addKm(carInfo.comnCExpl)}}</dd>
                                    </dl>
                                </li>
                            </ul>

                            <a href="javascript:void(0);" role="button" class="com_btn_more" v-on:click.prevent="fn_openDetailPage(vhcnoVal)"><span>더보기</span></a>

                            <button class="menu_open"><span class="blind">메뉴열기</span></button>
                            <div class="menu_list_wrap">
                                <ul class="menu_list">
                                    <li><a href="javascript:void(0);" @click.prevent="fn_chgCar(carInfo)">자동차 수정</a></li>
                                    <li><a href="javascript:void(0);" @click.prevent="fn_delCar(carInfo)">자동차 삭제</a></li>
                                </ul>
                                <button class="menu_close"><span class="blind">닫기</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 보유한 자동차 정보 영역 -->
            </div>

            <div class="com_inner">
                <template v-if="dtlSetYn">
                    <template v-if="istFncList.length > 0">
                        <!-- 대출계좌 연계 후 -->
                        <div class="list_line_type">
                            <div class="com_inner">
                                <strong class="title">자동차 할부</strong>

                                <div class="lists_area asset_type" v-for="(istFnc, idx) in istFncList" :key="'istFnc_'+idx">
                                    <dl>
                                        <dt>
                                            {{istFnc.istFncWrsnm}}
                                            <span class="num">{{istFnc.istFncRpyAcno}}</span>
                                        </dt>
                                        <dd><em class="num">{{istFnc.lnAcBac | numberFilter}}</em>원</dd>
                                    </dl>
                                </div>

                                <div class="link_area">
                                    <a href="javascript:void(0);" v-on:click.prevent="fn_delCnctAc()">삭제</a>
                                    <a href="javascript:void(0);" v-on:click.prevent="fn_chgCnctAc()">변경</a>
                                </div>
                            </div>
                        </div>
                        <!-- //대출계좌 연계 후 -->
                    </template>
                    <template v-else>
                        <div class="box_border_link iconType01 mt0">
                            <a role="button" href="javascript:void(0);" v-on:click.prevent="fn_chgCnctAc()"><span class="arrow">등록한 자동차에 대출상품이 있나요?</span></a>
                        </div>
                    </template>
                </template>

                <!-- 자동차 보험 보유중이고, 만기까지 30일 이내일 경우 2021.11.25 수정 -->
                <template v-if="carInsu.isrHldYn == '1' && carInsu.dueAncYn == '1'">
                    <div class="list_line_type car_insurance">
                        <strong class="title">
                            자동차 보험
                            <span class="notice_red_2023">{{carInsuEdTxt}}</span>
                        </strong>

                        <div class="lists_area">
                            <dl>
                                <dt>{{carInsu.isrcoWrsnm}}</dt>
                                <dd>만기 <em class="num"> {{carInsu.isrEdDt | dateFilter('YYYY.MM.DD')}}</em></dd>
                            </dl>
                        </div>
                    </div>
                </template>

                <div class="inner_banner">
                    <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openExpensePop()">
                        <!-- 2022-09-28 : 이미지로 교체 -->
						<img src="@/assets_v40/images/banner/img_banner_05_2023.png" alt="차근차근 모아 내 차고에 드림카 채워 넣기!">
                    </a>
                    <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openRecommandPop()">
                        <!-- 2022-09-28 : 이미지로 교체 -->
                        <img src="@/assets_v40/images/banner/img_banner_07_2023.png" alt="높은 가격으로 내차 팔고, 신차 견적부터 추천까지!">
                    </a>
                </div>
            </div>

            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="fn_movePage()"><span>추가할 자동차가 있으신가요?</span></a></div>
        </div>
        <div id="content" class="renewal" v-else>
            <div class="com_inner">
                <div class="no_data_box no_data_box01 grayExclamationType">
                    <div class="no_data_list">
                        <p class="txt_sub">조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </div>

            <div class="com_inner">
                <div class="inner_banner">
                    <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openExpensePop()">
                        <!-- 2022-09-28 : 이미지로 교체 -->
                        <img src="@/assets/images/banner/img_benner_05.png" alt="차근차근 모아 내 차고에 드림카 채워 넣기!">
                    </a>
                </div>
            </div>

            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="fn_movePage()"><span>추가할 자동차가 있으신가요?</span></a></div>
        </div>
        <footersV2 type="as"/>
    </page>

</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
import AsSubCategoryV2 from '@/components/category/AsSubCategoryV2.vue'
import {mapActions} from 'vuex'
import _ from 'lodash'

import COCA2101 from '@/views/page/CO/CA/COCA2101/COCA2101'
import COCA2102 from '@/views/page/CO/CA/COCA2102/COCA2102'
import COCO1124 from '@/views/page/CO/CO/COCO1124/COCO1124'
import PDMY2005 from '@/views/page/PD/MY/PDMY2005/PDMY2005'
import PDCA1102 from '@/views/page/PD/CA/PDCA1102/PDCA1102' // 자동차정보상세

export default {
    name : "ASCA2001", 
    data: () => {
        return {
            pdcaUserAgent           : "", // 실행플랫폼 (ios, android, else)
            paramVhcnoVal           : "", // 다른 화면에서 넘어온 차량번호
            ttcn                    : 0,  // 총건수
            totOdmtrDistMprAm       : 0,  // 총합산금액
            carList                 : [], // 자동차목록
            currIdx                 : 0,
            dtlSetYn                : false,

            // 자동차 상세
            vhcnoVal                : "", // 차량번호값
            carModlnm               : "", // 자동차모델명
            carMdyrYy               : "", // 자동차연식년도
            carGrdNo                : "", // 자동차등급번호
            carGrdnm                : "", // 자동차등급명
            odmtrDistDsc            : "", // 주행거리구분코드
            comnCExpl               : "", // 공통코드설명(주행거리구분코드명)
            odmtrDistMprAm          : 0,  // 주행거리시세금액
            cartpRepImgUrlnm        : "", // 차종대표이미지URL명
            istFncList              : [], // 할부금융목록
            carInsu                 : "", // 자동차보험목록
            carInsuEdTxt            : ""  // 자동차보험만기안내
        }
    },
    mounted() {
        this.initComponent();

        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    mixins: [
        commonMixin
    ],
    methods: {
        ...mapActions('myassets', [
            'getAllMyAssetInfo'
        ]),

        // 초기화 처리
        initComponent() {
            this.currIdx = 0;

            // 실행플랫폼
            // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
            if(this.getUserInfo('chnl') === '385') {
                this.pdcaUserAgent = appService.getUserAgent()
            } else if(this.getUserInfo('chnl') === '386') {
                // 기기로 접속하였을 경우는 true
                if((window.$SMNATIVE.getOS('A') == true && window.$SMNATIVE.getOS('I') == false) || (window.$SMNATIVE.getOS('A') == false && window.$SMNATIVE.getOS('I') == true)) {
                    this.pdcaUserAgent = 'cok'
                } else {
                    this.pdcaUserAgent = 'else'
                }
            }

            this.paramVhcnoVal = this.routeParams.vhcnoVal || "";

            this.getData();
        },

        // 데이터 조회 API 호출
        getData() {
            this.ttcn    = 0;
            this.carList = [];
            this.totOdmtrDistMprAm = 0;

            const config = {
                url: '/as/ca/01r02',
                data: {
                    mydtCusno : this.getUserInfo('mydtCusno') // 고객번호
                }
            };

            apiService.call(config).then(response => {
                this.ttcn    = response.ttcn;
                this.carList = response.carList || [];

                if (this.carList.length > 0) {
                    // 1억 이상인 경우 억단위 한글 표기
                    for (let i=0; i<this.carList.length; i++) {
                        this.totOdmtrDistMprAm += this.carList[i].odmtrDistMprAm;
                        this.carList[i].odmtrDistMprAm1 = Math.floor(this.carList[i].odmtrDistMprAm / 100000000);
                        this.carList[i].odmtrDistMprAm2 = Math.floor((this.carList[i].odmtrDistMprAm - (this.carList[i].odmtrDistMprAm1 * 100000000)) / 10000);
                    }

                    // 상세조회
                    if (this.paramVhcnoVal == "") {
                        this.vhcnoVal = this.vhcnoVal == null || this.vhcnoVal == "" ? this.carList[0].vhcnoVal : this.vhcnoVal;
                    } else {
                        // 넘어온 자동차정보로 자동차상세정보 표기
                        this.vhcnoVal = this.paramVhcnoVal;
                        this.currIdx  = this.carList.findIndex(x => x.vhcnoVal === this.paramVhcnoVal);

                        this.paramVhcnoVal = "";
                    }
                    this.fn_getDtlData();
                }

                this.$nextTick(() => {
                    this.callJQueryFncExcute();

                    this.fncSlick(500, false, this.fn_slickCallBack, this.currIdx);

                    $(document).ready(function(){
                        //메뉴 열기
                        //0905 수정
                        var menuBtn = $('.menu_open');
                        menuBtn.on('click', function(){
                            // console.log($(this).siblings('.menu_list_wrap'));
                            $(this).siblings('.menu_list_wrap').removeClass('close').addClass('open');
                        });
                        $('.menu_list_wrap .menu_close').on('click', function(){
                            $('.menu_list_wrap').removeClass('open').addClass('close');
                        });
                    });
                })
            });
        },

        // 캐러셀 초기화
        fncSlick(vSpeed=300, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) {
            setTimeout(()=>{
                $('.house_slide').not('.slick-initialized').slick({
                speed : vSpeed,
                dots : arrowsBoolean ? false : true,
                arrows : arrowsBoolean,
                vertical : false,
                adaptiveHeight: false,
                infinite: true,
                initialSlide: startSlideIndex // slide 시작 index 옵션
                });
            }, 10);

            $('.house_slide').on('afterChange', function(e, slick, currentSlide) {
                if (callback!==null && (typeof callback === 'function')) {
                    callback(currentSlide)
                }
            });

            // slick div 클릭시 사용
            $('.house_slide').on('click', function() {
                if (clickCallback!==null && (typeof clickCallback === 'function')) {
                    clickCallback()
                }
            });
        },

        // 캐러셀 콜백
        fn_slickCallBack(idx) {
            this.dtlSetYn = false;
            this.currIdx  = idx;
            this.vhcnoVal = this.carList[idx].vhcnoVal;

            // 상세조회
            this.fn_getDtlData();
        },

        // 캐러셀 이미지 alt 텍스트
        fn_setAlt(carInfo) {
            return carInfo.carBrannm + " " + carInfo.carModlnm + " " + carInfo.carGrdnm;
        },

        // 자동차 상세 조회 API 호출
        fn_getDtlData() {
            this.istFncList   = [];
            this.carInsu      = "";
            this.carInsuEdTxt = "";

            const config = {
                url: '/as/ca/01r01',
                data: {
                    mydtCusno : this.getUserInfo('mydtCusno'), // 고객번호
                    vhcnoVal  : this.vhcnoVal                  // 차량번호값
                }
            };

            apiService.call(config).then(response => {
                this.carModlnm        = response.carModlnm;
                this.carMdyrYy        = response.carMdyrYy;
                this.carGrdNo         = response.carGrdNo;
                this.carGrdnm         = response.carGrdnm;
                this.odmtrDistDsc     = response.odmtrDistDsc;
                this.comnCExpl        = response.comnCExpl;
                this.odmtrDistMprAm   = response.odmtrDistMprAm;
                this.cartpRepImgUrlnm = response.cartpRepImgUrlnm;
                this.istFncList       = response.istFncList || [];
                this.carInsu          = response.carInsu || {};

                if (this.carInsu != '') {
                    // 만기일 30일 전부터 알림 메시지 노출
                    //let currDt = dateFormat(new Date(), 'YYYYMMDD');
                    //let EdDiff = "";

                    // 보험 보유중이고 ,보험만기 30일전 여부
                    if(this.carInsu.isrHldYn == '1' && this.carInsu.dueAncYn == '1') {
                        if(this.carInsu.dds == 0) {
                            this.carInsuEdTxt = "보험 만기일입니다!"
                        } else {
                            this.carInsuEdTxt = "보험 만기가 " + Math.abs(this.carInsu.dds) + "일 남았어요!";
                        }
                    }

                    /*
                    for (let i=0; i<this.carInsuList.length; i++) {
                        let edDt = this.carInsuList[i].isrEdDt;
                        let diff = Math.abs(dayDiff(currDt, dateFormat(edDt, 'YYYYMMDD')));

                        if (currDt < edDt && diff <= 30) {
                            EdDiff = (EdDiff == "") ? diff : (EdDiff > diff ? diff : EdDiff);
                            this.carInsuEdTxt = "보험 만기가 " + EdDiff + "일 남았어요!";
                        }
                    }
                    */
                }

                this.dtlSetYn = true;
            });
        },
        fn_openDetailPage(carInfo) {
            let compName = PDCA1102
			let param    = { vhcnoVal : carInfo }

			const config = {
				component: compName,
				params : param
			}
			modalService.openPopup(config).then(() => {})
        },
        /* 추가할 자동차가 있으신가요? */
        fn_movePage() {
            const config = {
                component : COCA2101 // 차량정보입력
            }

            modalService.openPopup(config).then((response) => {
                if (response == true) { // 자산 등록완료
                    this.currIdx  = 0;
                    this.vhcnoVal = "";

                    this.getData();
                }
            })
        },
        /* 차근차근 모아, 내 차고에 드림카 채워 넣기! */
        fn_openExpensePop() {
            const config = {
                component : PDMY2005
            };

            modalService.openPopup(config).then((response) => {
                if (response == "reSelect") { // 지출목표 등록완료
                    // this.getData();

                    // 배너이미지를 통하여 목표등록을 하였을 경우
                    // 나의목표로 이동
                    const menu = {
                        name: 'PDMY2001',
                        params : {}
                    }
                    commonService.movePage(menu)
                }
            });
        },
        /* 높은 가격으로 내차 팔고, 내 신차 견적부터 추천까지! */
        fn_openRecommandPop() {
            const config = {
                name   : "ANCA2201"  // 금융생활 > 자동차관리
            }

            commonService.movePage(config);
        },
        fn_delCnctAc() {
            const config = {
                content : ['연결된 대출 상품을 삭제하시겠습니까?'],
                title   : ""
            };

            modalService.confirm(config).then(text => {
                if(text == "예") {
                    const config_d = {
                        url : "/as/ca/01d02",
                        data : {
                            mydtCusno : this.getUserInfo("mydtCusno"), // 고객번호
                            vhcnoVal  : this.vhcnoVal                  // 차량번호값
                        }
                    };

                    apiService.call(config_d).then(response => {
                        if (response.rspC == '0000') {
                            this.getAllMyAssetInfo() // vuex 수집갱신 처리

                            modalService.alert("삭제되었습니다.").then(() => {
                                this.getData();
                            });
                        } else {
                            modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {});
                        }
                    });
                }
            });
        },
        fn_chgCnctAc() {
            const config = {
                url  : "/co/co/07r01", // 차량 할부금융 상품 리스트 조회
                data : {
                    bnkAcDsc  : "41",  // 41:자동차(신차할부, 중고차할부, 금융리스)
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
            };

            apiService.call(config).then(response => {
                let contData = [];
                let rawList  = response.accountList || [];

                for (let i=0; i<rawList.length; i++) {
                    const tmpArr = {
                        "orgC"      : rawList[i].infOfrmnOrgC,
                        "orgNm"     : rawList[i].trOrgnm,
                        "goodsCode" : rawList[i].mydtAcno,
                        "scNo"      : rawList[i].mydtScNo,
                        "goodsName" : rawList[i].acWrsnm,
                        "goodsPrice": rawList[i].acNowBac,
                        "checked"   : (typeof _.find(this.istFncList, {"mydtAcno":rawList[i].mydtAcno, "istFncWrsnm":rawList[i].acWrsnm}) != "undefined") ? true : false
                    }
                    contData.push(tmpArr);
                }

                this.fn_openCarInstPop(contData || []);
            });
        },
        // 차량 할부금융 상품 slide 팝업 오픈
        fn_openCarInstPop(data) {
            const config = {
                params : {
                    title : "대출상품 선택"
                },
                renderer : {
                    component : COCO1124,
                    cdata : {
                        "title":"자동차할부/대출 선택",
                        "contentList":[{"contentGubn":'01',"contentData":data}]
                    }
                }
            };

            modalService.openSlidePagePopup(config).then(response => {
                let saveList = [];

                for (let i=0; i<response.length; i++) {
                    if (response[i].contentGubn == '01' && response[i].checked) {
                        const tmpArray = {
                            "infOfrmnOrgC" : response[i].orgC,
                            "mydtAcno"     : response[i].goodsCode,
                            "mydtScNo"     : response[i].scNo
                        };
                        saveList.push(tmpArray);
                    }
                }

                if (!(this.istFncList.length == 0 && saveList.length == 0)) {
                    this.fn_saveCnctAc(saveList); // 저장
                }
            });
        },
        fn_saveCnctAc(saveList) {
            const config = {
                url : "/as/ca/01s01",
                data : {
                    mydtCusno  : this.getUserInfo("mydtCusno"), // 고객번호
                    vhcnoVal   : this.vhcnoVal,                 // 차량번호값
                    cnctAcList : saveList
                }
            };

            apiService.call(config).then(response => {
                if (response.rspC == '0000') {
                    modalService.alert("저장되었습니다.").then(() => {
                        this.getData();
                    });
                } else {
                    modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {});
                }
            });
        },
        fn_delCar(carInfo) {
            const config = {
                content : ['자산을 삭제하시면 더 이상 나의 자산 금액에 반영되지 않습니다.'],
                title   : ""
            };

            modalService.confirm(config).then(text => {
                if(text == "예") {
                    const config_d = {
                        url  : '/as/ca/01d01',
                        data : {
                            mydtCusno : this.getUserInfo('mydtCusno'), // 고객번호
                            vhcnoVal  : carInfo.vhcnoVal                  // 차량번호값
                        }
                    };

                    apiService.call(config_d).then(response => {
                        if (response.rspC == '0000') {
                            modalService.alert("자동차 자산이 삭제되었습니다.").then(() => {
                                this.currIdx  = 0;
                                this.vhcnoVal = "";

                                this.getData();
                            });
                        } else {
                            modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {});
                        }
                    });
                }
            });
        },
        fn_chgCar(carInfo) {
            const config = {
                component : COCA2102, // 차량상세정보입력
                params    : {
                    mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                    vhcnoVal     : carInfo.vhcnoVal,                 // 차량번호값
                    carGrdNo     : carInfo.carGrdNo,                 // 차량등급번호
                    carGrdnm     : carInfo.carGrdnm,                 // 차량등급명
                    odmtrDistDsc : carInfo.odmtrDistDsc,             // 차량주행거리구분코드
                    comnCExpl    : carInfo.comnCExpl,                // 차량주행거리구분명
                    isUpt        : true
                }
            };

            modalService.openPopup(config).then((response) => {
                if (response.uptCom == true) { // 수정완료
                    this.getData();
                }
            });
        },
        fn_addKm(text) {
            if(text) {
                return text.replaceAll("이상", "").replaceAll("초과", "").replaceAll("미만", "").replaceAll("이하", "") + "km";
            } else {
                return "";
            }
        },
        emptyImg(e) {
            e.target.src = new URL("@/assets/images/icon/car_new06.png", import.meta.url).href
        },	
    },
    components : {
        Page,
        FootersV2,
        AsCategoryV2,
        AsSubCategoryV2
    }
}
</script>