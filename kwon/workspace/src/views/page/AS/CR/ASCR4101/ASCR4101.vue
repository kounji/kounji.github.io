<!--
/*************************************************************************
* @ 서비스경로 : 나의 신용점수 올리기 > 신용정보
* @ 페이지설명 : 나의 신용점수 올리기 > 신용정보 메인
* @ 파일명     : src/views/page/AS/CR/ASCR4101/ASCR4101.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-06              CS541013              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>신용정보</h1>
        </div>
        <div class="popup_content com_no_bottom com_bg_type00">
            <div class="lighthouse_area">
                <div class="toptitle">
                    <div class="left">
                        내 신용점수<a href="javascript:void(0);" v-on:click.prevent="fn_openSlidePop()"><span class="caution_ico"></span><span class="blind">도움말버튼</span></a>
                    </div>
                    <div class="right time">
                        <span>{{selectedYm | dateFilter('YYYY.MM.DD HH:mm')}}</span>
                        <button class="refresh inline_refresh" @click.prevent="initComponent">
                            <span class="blind">새로고침</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="lh_wrap gauge_chart_wrap">
                    <img class="bg"    src="@/assets/images/light_house_bg.png" alt="">
                    <img class="stars" src="@/assets/images/stars.png"          alt="">
                    <img class="ocean" src="@/assets/images/ocean.png"          alt="">
                    <img class="bird"  src="@/assets/images/bird.png"           alt="">
                    <div class="chartHolder">
                        <img class="light" src="@/assets/images/light.png" alt="">
                        <div class="containerr">
                            <div class="circle_wrap">
                                <div class="scaler">
                                    <!--차트는 인라인 스타일 각도를 넣어 렌더링해 동작하도록 만들었습니다.
                                         신용정보 점수 0 ~1000 스코어는 0deg ~ 180deg 각도를 치환해서 대입해서 개발하시면 될 것 같습니다.
                                        ex : 500점 => 90deg , 100점 => 18deg-->
                                    <div class="circle" :style="'transform: rotate(' + 180/1000*Number(psnCrdevlScrVal) + 'deg);'"></div>
                                </div>
                            </div>
                            <img src="@/assets/images/trans_01.png" alt="">
                        </div>
                        <div class="intro_container">
                            <div class="intro_scaler">
                                <div class="intro_wrap"><div class="intro"></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="score"><span class="num bold">{{psnCrdevlScrVal}}</span>점
                        <div class="mini_line_box_wrap">
                            <div class="mini_line_box">
                                상위 <span class="bold num">{{crdevlUpAcmCsttRtoVal}}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="com_inner">
                <div class="linkbox_wrap type02 mt30">
                    <div class="box">
                        <span class="ico ico01"></span>
                        <div class="tt_wrap">
                            <p class="tt_top">조회내역</p>
                            <a href="javascript:void(0);" v-on:click.prevent="fn_openCrinfInqPop()">
                                <div class="tt">
                                    <b>{{crinfInqCn}}</b>건
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="box">
                        <span class="ico ico02"></span>
                        <div class="tt_wrap">
                            <p class="tt_top">변동내역</p>
                            <a href="javascript:void(0);" v-on:click.prevent="fn_openRyr1CrinfVarPop()">
                                <div class="tt">
                                    <b>{{ryr1CrinfVarCn}}</b>건
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="com_inner credit_list_box mt15">
                <!-- <div class="com_box_type01">
                    <a href="javascript:void(0);" class="btn_creditinfoup" v-on:click.prevent="fn_openCrinfUploadPop()">
                        <div>
                            <p>신용정보올리기</p>
                        </div>
                    </a>
                </div> -->
                <div class="com_box_type01">
                    <div class="list_type_box">
                        <a href="javascript:void(0);" v-on:click.prevent="fn_openOvdDetailPop()">
                            <div class="new_tit_area">
                                <div class="tit"><span>연체</span></div>
                                <div class="total_price">
                                    <span>보유 연체</span>
                                    <em class="num">{{ovdCn}}</em><span>건</span>
                                </div>
                            </div>
                        </a>
                        <ul class="list_type_02">
                            <li>
                                <!-- <a href="javascript:void(0);" v-on:click.prevent="fn_openOvdDetailPop()"> -->
                                    <dl>
                                        <dt>
                                            <em>연체 잔액</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{ovdBac | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                <!-- </a> -->
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="com_box_type01">
                    <div class="list_type_box">
                        <a href="javascript:void(0);" v-on:click.prevent="fn_openInDetailPop()">
                            <div class="new_tit_area">
                                <div class="tit"><span>대출</span></div>
                                <div class="total_price">
                                    <span>보유 대출</span>
                                    <em class="num">{{lnOpCn}}</em><span>건</span>
                                </div>
                            </div>
                        </a>
                        <ul class="list_type_02">
                            <li>
                                <!-- <a href="javascript:void(0);" v-on:click.prevent="fn_openInDetailPop()"> -->
                                    <dl>
                                        <dt>
                                            <em>대출 잔액</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{lnBac | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                <!-- </a> -->
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="com_box_type01">
                    <div class="list_type_box">
                        <a href="javascript:void(0);" v-on:click.prevent="fn_openCdDetailPop()">
                            <div class="new_tit_area">
                                <div class="tit"><span>카드</span></div>
                                <div class="total_price">
                                    <span>보유 카드</span>
                                    <em class="num">{{cdOpCn}}</em><span>건</span>
                                </div>
                            </div>
                        </a>
                        <ul class="list_type_02">
                            <li>
                                <!-- <a href="javascript:void(0);" v-on:click.prevent="fn_openCdDetailPop()"> -->
                                    <dl>
                                        <dt>
                                            <em>현금서비스 총 이용금액</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{totalChsvUsAm | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                <!-- </a> -->
                                <div class="sub_txt">
                                    <em>한도 소진율</em>
                                    <span class="com_price">
                                        <em class="num ">{{totLmtXhtrt}}</em>
                                        <em class="unit">%</em>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="com_box_type01">
                    <a href="javascript:void(0);" class="btn_creditinfoup"  @click.prevent="fn_openCrKcbPop()">
                        <div>
                            <p>신용점수 올리기</p>
                        </div>
                    </a>
                </div>

                <!--[v4.0] 링크추가-->
				<div class="com_box_type01">
					<ul class="list_type_01">
						<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO4116', 1)">신용점수 올리기를 해도 신용점수가 떨어지지 않아요.</a></li>
						<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO4116', 2)">NICE와 KCB의 신용점수가 다른 이유는?</a></li>
						<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO4116', 3)">나의 신용점수가 떨어지는 이유는?</a></li>
					</ul>
				</div>
				<!--//[v4.0] 링크추가-->

                <div class="com_box_type03 credit_style mt25" v-on:click.prevent="fn_openCrinfTipPop()" role="button">
                    <p class="txt_info"><span>신용점수 관리</span>는 이렇게~</p>
                </div>
                <p class="com_txtinfo_type01 mt18">코리아크레딧뷰로(KCB)에서 제공하는 정보이며,
                    KCB 데이터 산정일 및 기준금액의 차이로 실제 금융정보와 다를 수 있습니다.
                </p>
            </div>
        </div>
        <a href="javascript:void(0);" @click="close(true)" class="btn_close"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import appService from '@/service/appService'

    import ASCR1102 from '@/views/page/AS/CR/ASCR1102/ASCR1102'
    import ASCR1104 from '@/views/page/AS/CR/ASCR1104/ASCR1104'
    import ASCR1108 from '@/views/page/AS/CR/ASCR1108/ASCR1108'
    import ASCR1112 from '@/views/page/AS/CR/ASCR1112/ASCR1112'
    import ASCR1113 from '@/views/page/AS/CR/ASCR1113/ASCR1113'
    import ASCR1114 from '@/views/page/AS/CR/ASCR1114/ASCR1114'
    import ASCR4107 from '@/views/page/AS/CR/ASCR4107/ASCR4107'

    import COCO4116 from '@/views/page/CO/CO/COCO4116/COCO4116' // 자주하는 질문

    export default {
        name : "ASCR4101",
        data: () => {
            return {
                selectedYm            : "",
                crdevlUpAcmCsttRtoVal : "", // 신용평가상위누적구성비값
                psnCrdevlScrVal       : "", // 개인신용평가점수값
                cdOpCn                : 0,  // 카드개설수
                cdTotUsAm             : 0,  // 카드총이용금액
                lnOpCn                : 0,  // 대출개설건수
                lnBac                 : 0,  // 대출잔액
                ovdCn                 : 0,  // 연체건수
                ovdBac                : 0,  // 연체잔액
                crinfInqCn            : 0,  // 신용정보조회건수
                ryr1CrinfVarCn        : 0,  // 최근1년신용정보변동건수
                totalChsvUsAm         : 0,  // 총현금서비스이용금액
                totLmtXhtrt           : 0,  // 총한도소진율
                inqDtm                : ""  // 조회일시
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent();

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent() {
                this.selectedYm = new Date();
                this.getData();
            },
            getData() {
                // 금융진단 정보 조회
                const config = {
                    url: '/as/cr/01r01',
                    data: {
                        mydtCusno : this.getUserInfo('mydtCusno') // 고객번호
                    }
                };

                apiService.call(config).then(response =>{
                    this.crdevlUpAcmCsttRtoVal = response.crdevlUpAcmCsttRtoVal;
                    this.psnCrdevlScrVal       = response.psnCrdevlScrVal;
                    this.cdOpCn                = response.cdOpCn;
                    this.cdTotUsAm             = response.cdTotUsAm;
                    this.lnOpCn                = response.lnOpCn;
                    this.lnBac                 = response.lnBac;
                    this.ovdCn                 = response.ovdCn;
                    this.ovdBac                = response.ovdBac;
                    this.crinfInqCn            = response.crinfInqCn;
                    this.ryr1CrinfVarCn        = response.ryr1CrinfVarCn;
                    this.totalChsvUsAm         = response.totalChsvUsAm;
                    this.totLmtXhtrt           = response.totLmtXhtrt;
                    this.inqDtm                = response.inqDtm;
                });
            },
            fn_openSlidePop() {
                const config = {
                    renderer : {
                        component : ASCR1108 // 신용정보도움말
                    }
                };

                modalService.openSlidePagePopup(config).then(() => {});
            },
            fn_openCrinfTipPop() {
                const config = {
                    component : ASCR4107 // 신용정보관리팁
                };

                modalService.openPopup(config).then(() => {});
            },
            fn_openCrinfInqPop() {
                const config = {
                    component : ASCR1102, // 신용정보 조회내역
                    params    : {
                        tabPg : "1"
                    }
                };

                modalService.openPopup(config).then(() => {});
            },
            fn_openRyr1CrinfVarPop() {
                const config = {
                    component : ASCR1102, // 신용정보 변동내역
                    params    : {
                        tabPg : "2"
                    }
                };

                modalService.openPopup(config).then(() => {});
            },
            fn_openCrinfUploadPop() {
                const config = {
                    component : ASCR1112, // 신용정보 올리기
                    params    : {
                        psnCrdevlScrVal : this.psnCrdevlScrVal
                    }
                };

                modalService.openPopup(config).then(() => {});
            },
            fn_openOvdDetailPop() {
                const config = {
                    component : ASCR1104, // 연체내역
                    params    : {
                        tabPg : "1"
                    }
                };

                modalService.openPopup(config).then(() => {});
            },
            fn_openInDetailPop() {
                const config = {
                    component : ASCR1104, // 대출내역
                    params    : {
                        tabPg : "2"
                    }
                };

                modalService.openPopup(config).then(() => {});
            },
            fn_openCdDetailPop() {
                const config = {
                    component : ASCR1104, // 카드내역
                    params    : {
                        tabPg : "3"
                    }
                };

                modalService.openPopup(config).then(() => {});
            },
            /**
             * 신용점수올리기 KCB 웹뷰호출
             */
            fn_openKcbWebWiew(){
                if(import.meta.env.VITE_ENV === 'R'){
                    return false
                }
                const config = {
                    url: '/co/co/99s02',
                    data: {
                        mydtCusno : this.getUserInfo('mydtCusno'), // 고객번호
                        menuDsc   : '470M01'
                    }
                }
                apiService.call(config).then(response =>{
                    console.log(response)
                    if(this.getUserInfo('chnl') === '385'){
                        appService.openPopupWebView(response.url).then(rst => {
                            console.log(rst)
                        })
                    }else{
                        appService.cokBankOpenPopupWebView(response.url).then(rst => {
                            console.log(rst)
                        }) 
                    }
                });
            },
            /**
             * 신용점수올리기 데이터받아온후 작업
             */
            fn_openCreditRaise(){
                // if(import.meta.env.VITE_ENV === 'R'){
                //     return false
                // }
                const config = {
                    url: '/co/co/99s03',
                    data: {
                        mydtCusno : this.getUserInfo('mydtCusno'), // 고객번호
                    }
                }
                apiService.call(config).then(response =>{
                    console.log('신용점수 올리기 api 호출 후 데이터 :: ',response)
                    this.rstObj = response
                    if(this.rstObj.success === 'true'){
                        // 성공
                        if(this.rstObj.checkHsCrdtMgtSvc.result === 'E000'){
                            // 성공 페이지 이동
                            this.fn_openCrKcbEnd(this.rstObj)
                        }else{
                            modalService.alert("신용점수 올리기에 실패하였습니다.")    
                        }
                    }else{ 
                        // 실패
                        modalService.alert("신용점수 올리기에 실패하였습니다.")
                    }
                });
            },
            /**
             * KCB신용점수 올리기 페이지 시작
             */
            fn_openCrKcbPop(){
                // if(import.meta.env.VITE_ENV === 'R'){
                //     return false
                // }
                const config = {
                    component: ASCR1113,
                    params : {
                    }
                }
                modalService.openPopup(config).then(response => {
                    console.log('다녀온후 :: ', response)
                    if(response === 'success'){
                        // 성공
                        this.fn_openCreditRaise()
                    }else{
                        // 실패
                    }
                })
            },
            fn_openCrKcbEnd(obj){
                const config = {
                    component: ASCR1114,
                    params : {
                        result : obj
                    }
                }
                modalService.openPopup(config).then(response => {
                    console.log(response)
                    if(response === 'true'){
                        Object.assign(this.$data, this.$options.data())
                        this.initComponent()
                    }
                })
            },
            fn_openPopup(pageId, idx) {
                let compName = ''
                if(pageId === "COCO4116"){
                    compName = COCO4116	// 자주하는 질문
                }

                const config = {
					component: compName,
                    params : {
                        faqDsc  : '08',       // 신용정보 질문 코드번호
                        faqSqno : idx,        // 신용점수 FAQ 구분 idx
                    }
                }
                // this.close()
				modalService.openPopup(config).then(() => {})
            }
        }
    }
</script>