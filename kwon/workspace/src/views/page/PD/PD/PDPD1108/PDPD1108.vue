<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 상품추천 > 대출한도조회
* @ 페이지설명 : 금융과생활 > 상품추천 > 대출한도조회 > step 2. 정보입력
* @ 파일명     : src\views\page\PD\PD\PDPD0008\PDPD0008.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-08-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-24              CS516033              최초작성
* 2021-11-18              CS515731              연소득 - 서비스에서 데이터 가져 올 수 없음
                                                직업선택 - 프로파일 -> 저장 -> 메인 -> 다시 대출 한도 조회 페이지로 이동
                                                개인정도 수집이용 동의 -> 체크시 저장 처리
* 2021-11-22              CS515731              BXI 파라미터 수정
                                                function -> computed변경
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>대출한도조회</h1>
            <a href="javascript:void(0);" class="btn_back"  @click.prevent="close"><span class="blind">이전화면</span></a>
            <a href="javascript:void(0);" class="btn_close" @click.prevent="fn_closeAllPage"><span class="blind">팝업닫기</span></a>
        </div>
        <div class="popup_content com_bg_type00">
            <div class="com_inner com_line_type01 com_top_type05">
                <strong class="com_pop_tit01"><span>정확한 한도와 금리 조회를 위해 </span>{{cusnm}}님의 자산 정보를 확인해 보세요.</strong>
                <div class="market_price_pointbox">
                    신용점수 <span class="com_point_blue num">{{scr}}</span>점
                </div>
            </div>
            <div class="com_inner animation">
                <div class="com_total_type04 mt38 new_mb15">
                    <strong class="com_txt_tit01">자산 및 부채</strong>
                </div>

                <template v-if="dpidpAm > 0">
                    <div class="com_box_type01 toggle_list_box2">
                        <div data-ui-toggle="box" class="toggle_box_area close">
                            <button type="button" class="view_btn" aria-expanded="false">
                                <div class="com_innerbox_type01">
                                    <div class="titarea">
                                        <span class="tit_v">금융자산</span>
                                    </div>
                                    <span class="total_price">
                                        <em class="num">{{dpidpAm | numberFilter}}</em><em class="unit">원</em>
                                    </span>
                                </div>
                            </button>
                        </div>
                        <ul class="view_cont list_type_02 sub_list_type">
                            <li>
                                <dl>
                                    <dt>
                                        <div>
                                            <em>농축협 예/적금</em>
                                        </div>

                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{tbnkAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <div>
                                            <em>타금융 예/적금</em>
                                        </div>

                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{obnkAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <div>
                                            <em>입출금 계좌잔액</em>
                                        </div>

                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{dpidpAm - tbnkAm - obnkAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <div class="com_box_type01">
                        <div class="com_innerbox_type01">
                            <div class="titarea">
                                <span class="tit_i">금융자산</span>
                            </div>
                            <span class="total_price">
                                <em class="num">{{asetSam | numberFilter}}</em><em class="unit">원</em>
                            </span>
                        </div>
                    </div>
                </template>

                <!-- 보유 아파트 -->
                <template v-if="rlestInfList.length > 0">
                    <div class="com_box_type01 toggle_list_box2">
                        <div data-ui-toggle="box" class="toggle_box_area close">
                            <button type="button" class="view_btn" aria-expanded="false">
                                <div class="com_innerbox_type01">
                                    <div class="titarea">
                                        <span class="tit_v">보유 아파트</span>
                                    </div>
                                    <span class="total_price">
                                        <em class="num">{{rlestInfList.length}}</em><em class="unit">건</em>
                                    </span>
                                </div>
                            </button>
                        </div>
                        <ul class="view_cont list_type_02 list_subtype03">
                            <li v-for="(rlest, idx) in rlestInfList" :key="'rlest_'+idx">
                                <div>
                                    <em>{{rlest.aptHcxnm}}</em>
                                    <span><span class="icon_mint">{{rlest.rlestRsdFormDsc == '1' ? '자가' : '전세'}}</span></span>
                                </div>
                                <dl v-if="rlest.rlestRsdFormDsc == '1'">
                                    <dt>
                                        <div>
                                            <em>현 시세</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <template v-if="fn_setRlestAm1(rlest.mprAm) > 0 && fn_setRlestAm2(rlest.mprAm) > 0">
                                                <em class="num">{{fn_setRlestAm1(rlest.mprAm) | numberFilter}}</em><em class="unit">억</em>
                                            </template>
                                            <template v-else-if="fn_setRlestAm1(rlest.mprAm) > 0">
                                                <em class="num">{{fn_setRlestAm1(rlest.mprAm) | numberFilter}}</em><em class="unit">억원</em>
                                            </template>
                                            <template v-if="fn_setRlestAm2(rlest.mprAm) > 0">
                                                <em class="num">{{fn_setRlestAm2(rlest.mprAm) | numberFilter}}</em><em class="unit">만원</em>
                                            </template>
                                        </span>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>
                                        <div>
                                            <em>대출 금액</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <template v-if="rlest.hseCptLnYn == '1'">
                                                <template v-if="fn_setRlestAm1(rlest.hseCptLnAm, '1') > 0 && fn_setRlestAm2(rlest.hseCptLnAm, '1') > 0">
                                                    <em class="num">{{fn_setRlestAm1(rlest.hseCptLnAm, '1') | numberFilter}}</em><em class="unit">억</em>
                                                </template>
                                                <template v-else-if="fn_setRlestAm1(rlest.hseCptLnAm, '1') > 0">
                                                    <em class="num">{{fn_setRlestAm1(rlest.hseCptLnAm, '1') | numberFilter}}</em><em class="unit">억원</em>
                                                </template>
                                                <template v-if="fn_setRlestAm2(rlest.hseCptLnAm, '1') > 0">
                                                    <em class="num">{{fn_setRlestAm2(rlest.hseCptLnAm, '1') | numberFilter}}</em><em class="unit">만원</em>
                                                </template>
                                            </template>
                                            <template v-else>
                                                <span>없음</span>
                                            </template>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <div class="com_box_type01">
                        <div class="com_innerbox_type01">
                            <div class="titarea">
                                <span class="tit_i">보유 아파트</span>
                            </div>
                            <span class="total_price">
                                <span class="txt01">없음</span>
                            </span>
                        </div>
                    </div>
                </template>

                <!-- 보유대출 -->
                <template v-if="lnSam > 0">
                    <div class="com_box_type01 toggle_list_box2">
                        <div data-ui-toggle="box" class="toggle_box_area close">
                            <button type="button" class="view_btn" aria-expanded="false">
                                <div class="com_innerbox_type01">
                                    <div class="titarea">
                                        <span class="tit_v">보유대출</span>
                                    </div>

                                    <span class="total_price">
                                        <em class="num">{{lnSam | numberFilter}}</em><em class="unit">원</em>
                                    </span>
                                </div>
                            </button>
                        </div>
                        <ul class="view_cont list_type_02 sub_list_type">
                            <li>
                                <dl>
                                    <dt>
                                        <div>
                                            <em>신용대출 잔액</em>
                                        </div>

                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{crlnTotBac | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <div>
                                            <em>담보대출 잔액</em>
                                        </div>

                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{mgglnTotBac | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <div>
                                            <em>마이너스 대출</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{lpmiTt | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <div class="com_box_type01">
                        <div class="com_innerbox_type01">
                            <div class="titarea">
                                <span class="tit_i">보유대출</span>
                            </div>
                            <span class="total_price">
                                <em class="num">{{lnSam | numberFilter}}</em><em class="unit">원</em>
                            </span>
                        </div>
                    </div>
                </template>

                <strong class="com_txt_tit01 mt40 new_mb15">직업 및 소득</strong>
                
                <!-- 직업 -->
                <div class="com_box_type01">
                    <div class="com_innerbox_type01">
                        <div class="titarea">
                            <span :class="jobnm != '' ? 'tit_v' : 'tit_i'">직업</span>
                        </div>
                        <div class="numarea">
                            <span class="txt01">{{jobnm != '' ? jobnm : '등록'}}</span>
                            <a href="javascript:void(0);" class="com_btnwrite" @click.prevent="fn_openCOCO1130()"><span class="blind">팝업열기</span></a>
                        </div>
                    </div>
                </div>
                <template v-if="jobnm == ''">
                    <p class="com_txtinfo_type03 new_mb20">직업 정보는 필수로 등록되어야 합니다.</p>
                </template>
                
                <!-- 연소득 -->
                <div class="com_box_type01">
                    <div class="com_innerbox_type01">
                        <div class="titarea">
                            <span :class="yrincAm > 0 ? 'tit_v' : 'tit_i'">연소득</span>
                        </div>
                        <div class="numarea">
                            <span class="total_price">
                                <em class="num">{{yrincAm | numberFilter}}</em><em class="unit">원</em>
                            </span>
                            <a href="javascript:void(0);" class="com_btnwrite" @click.prevent="fn_openPDLN1001()"><span class="blind">팝업열기</span></a>
                        </div>
                    </div>
                </div>
                <template v-if="yrincAm <= 0">
                    <p class="com_txtinfo_type03 new_mb20">소득이 없는 경우 한도 조회가 불가합니다.</p>
                </template>
                <template v-else>
                    <p class="new_mb20"></p>
                </template>
            </div>
            <div class="com_space_type01"></div>
            <div class="com_inner agree_list_box">
                <ul class="new_agree_list">
                    <template v-if="!isCertYn">
                    <li>
                        <span class="btn_check">
                            <input type="checkbox" name="chkCertAgrYn" id="chkCertAgrYn" v-model="chkCertAgrYn" @change="fn_chkAgree()">
                            <label for="chkCertAgrYn">
                                <span>[필수]개인(신용)정보 조회 동의</span>
                            </label>
                        </span>
                        <button type="button" class="btn_move"><span class="blind">팝업이동</span></button>
                    </li>
                    </template>
                    <li>
                        <span class="btn_check">
                            <input type="checkbox" name="check02" id="check02" v-model="lnInqYn">
                            <label for="check02">
                                <span>전세대출도 필요 하신가요?</span>
                            </label>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="new_add_register"><a href="javascript:void(0);" v-on:click.prevent="fn_openCOAR2001()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
        <div class="popup_footer fixed">
            <div class="btn_full_box">
                <a href="javascript:void(0);" class="btn btn_mint" :class="!nextStepYn ? 'btn_off' : ''" @click.prevent="nextStepYn? fn_openPDPD1109(): false">한도조회</a>
            </div>
        </div>
    </div>
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {numberFormat} from '@/utils/number'

    import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001' // 자산등록
    import COCO1130 from '@/views/page/CO/CO/COCO1130/COCO1130' // 프로필
    import PDPD1109 from '@/views/page/PD/PD/PDPD1109/PDPD1109' // 대출상품안내
    import PDLN1001 from '@/views/page/PD/LN/PDLN1001/PDLN1001' // 연소득입력
    import COAS2004 from '@/views/page/CO/AS/COAS2004/COAS2004' // 약관상세(POP)

    export default {
        name : "PDPD1108",
        data: () => {
            return {
                brc             : "", // 사무소코드
                mydtCusno       : "", // 고객번호
                cusnm           : "", //고객명
                jobDsc          : "", // 직업구분코드
                jobnm           : "", // 직업명
                birth           : "", // 생년월일
                scr             : 0,  // 점수
                asetSam         : 0,  // 금융자산합계
                yrincAm         : 0,  // 연소득금액 (BXI추가)
                dpidpAm         : 0,  // 예적금금액
                tbnkAm          : 0,  // 당행금액
                obnkAm          : 0,  // 타행금액
                lnSam           : 0,  // 대출금액합계
                lmtBac          : 0,  // 한도잔액
                lpmiTt          : 0,  // 한도약정합계
                crlnTotBac      : 0,  // 신용대출총잔액
                mgglnTotBac     : 0,  // 담보대출총잔액
                ioGiRowCnt      : 0,  // 그리드INFO_ROW갯수
                rlestInfList    : [], // 부동산정보
                certAgrYn       : false, //개인(신용)정보 수집·이용 동의서(상품·서비스안내) 선택여부

                chkCertAgrYn    : false, //신용정보 선택 여부
                certSqNo        : 0,     //약관 상품서비스안내 sqNo
                certStltTpc     : '',    //약관 상품서비스안내 stltTpc
                lnInqYn         : false, // 전세대출여부
                //nextStepYn      : false
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        computed : {
            isCertYn : function(){
                return this.certAgrYn
            },
            nextStepYn : function(){
                if ( this.jobnm != "" && this.yrincAm > 0 && this.certAgrYn === true ) {
                    return true
                }else{
                    return false
                }
            }
        },
        beforeMount(){
            this.cusnm = this.getUserInfo("cusnm")
            this.fn_getCert()
        },
        mounted() {
            // 화면 스크롤 애니메이션
            $('.popup_content').on('scroll', function () {
                $('.com_inner.animation .com_box_type01').each(function () {
                    var top = $(window).scrollTop() + $(window).height()
                    var pos = $(this).offset().top + $(this).outerHeight() / 2.5
                    if ( top > pos ) {
                        $(this).addClass('ani-active')
                    }
                })
                // scroll = true;
            })
            
            this.initComponent()

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {
            initComponent() {
                this.getData()
            },
            getData() {
                const config = {
                    url: '/pd/pd/08r01', // 연결자산 조회
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                };

                apiService.call(config).then(response => {
                    this.brc            = response.brc
                    this.mydtCusno      = response.mydtCusno
                    this.jobDsc         = response.jobDsc  || ""
                    this.jobnm          = response.jobnm   || ""
                    this.yrincAm        = response.yrincAm || 0
                    this.birth          = response.birth   || ""
                    this.scr            = response.scr     || 0
                    this.asetSam        = response.asetSam || 0
                    this.dpidpAm        = response.dpidpAm || 0
                    this.tbnkAm         = response.tbnkAm  || 0
                    this.obnkAm         = response.obnkAm  || 0
                    this.lnSam          = response.lnSam   || 0
                    this.lmtBac         = response.lmtBac  || 0
                    this.lpmiTt         = response.lpmiTt  || 0
                    this.crlnTotBac     = response.crlnTotBac  || 0
                    this.mgglnTotBac    = response.mgglnTotBac || 0
                    this.ioGiRowCnt     = response.ioGiRowCnt
                    this.rlestInfList   = response.rlestInfList || []
                    
                    //sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                    setTimeout(() => {
                        this.callJQueryFncExcute()
                    }, 100)
                })
            },
            // 1억 이상인 경우 억단위 한글 표기
            fn_setRlestAm1(amOrg, dsc="") {
                // 현시세:만원단위, 대출금액:원단위
                if (dsc != "") {
                    amOrg = amOrg / 10000;
                }

                return Math.floor(amOrg / 10000)
            },
            fn_setRlestAm2(amOrg, dsc="") {
                // 현시세:만원단위, 대출금액:원단위
                if (dsc != "") {
                    amOrg = amOrg / 10000;
                }
                
                let am1 = Math.floor(amOrg / 10000)
                let am2 = Math.floor(amOrg - (am1 * 10000))
                
                return am2;
            },
            fn_closeAllPage() {
                const config = {
                    content : ['입력중인 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'],
                    title   : "",
                }
                modalService.confirm(config).then(text => {
                    if(text == "예") {
                        this.closeAll()
                    }
                })
            },
            //자산추가
            fn_openCOAR2001() {
                const config = {
                    component : COAR2001
                }

                modalService.openPopup(config).then(() => {})
            },
            //직업 선택 프로파일
            fn_openCOCO1130() {
                const config = {
                    component : COCO1130,
                    params    : {
                        referPage : 'PDPD1108'
                    }
                }

                modalService.openPopup(config).then(() => {
                    this.getData();
                })
            },
            //연소득입력
            fn_openPDLN1001() {
                const config = {
                    renderer : {
                        component : PDLN1001
                    },
                    params : {
                        yrincAm : numberFormat(this.yrincAm / 10000)
                    }
                }

                modalService.openSlidePagePopup(config).then((response) => {
                    this.yrincAm = Number(response.split(",").join("")) * 10000
                });
            },
            //한도조회
            fn_openPDPD1109() {
                const config = {
                    url     : "/pd/pd/09r01",
                    data    : {
                                brc             : this.brc,
                                mydtCusno       : this.getUserInfo("mydtCusno"),
                                jobDsc          : this.jobDsc,
                                yrincAm         : this.yrincAm,
                                birth           : this.birth,
                                lnInqYn	        : (this.lnInqYn ? '1':'0'), //전세대출 조회요청여부 여:1/부:0(기본값)
                                ioGiRowCnt      : this.ioGiRowCnt,
                                rlestInfList    : this.rlestInfList,
                                scr             : this.scr,
                                dpidpAm         : this.dpidpAm,
                                tbnkAm          : this.tbnkAm,
                                obnkAm          : this.obnkAm,
                                lnSam           : this.lnSam,
                                lmtBac          : this.lmtBac,
                                lpmiTt          : this.lpmiTt,
                                crlnTotBac      : this.crlnTotBac,
                                mgglnTotBac     : this.mgglnTotBac,
                            }
                }

                apiService.call(config).then(response => {
                    if(response.rspRztDsc === "0") {
                        const config = {
                            component   : PDPD1109,
                            params      : response
                        }

                        modalService.openPopup(config).then(() => {})
                    }
                })                
            },
            fn_chkAgree() {
                if (this.chkCertAgrYn) {
                    this.fn_openStltDtlPop()
                }else{
                    //약관동의가 동의가 된 상태에서 해제를 할 경우 약관 미동의처리
                    if(this.certAgrYn){
                        this.fn_saveCert(false)
                    }
                }
            },
            /*
             * 선택약관 개별팝업
             */
            fn_openStltDtlPop() {
                const config = {
                    component: COAS2004, 
                    params: {
                        flag    : "select",
                        stltTpc : this.certStltTpc, //선택한 약관번호
                        sqno    : this.certSqNo     //선택한 약관명
                    }                    
                }
                //슬라이드팝업에서 풀팝업을 부르기 위한 오류 수정 (필수)
                config.renderer = this.modalConfig.renderer
                modalService.openPopup(config).then(response => {
                    if (response.agreeYn !== undefined && response.agreeYn == "Y") {
                        this.fn_saveCert(true)  //약관동의 저장 처리
                    } else {
                        this.chkCertAgrYn = false
                        //this.fn_saveCert(false)  //약관동의 저장 처리
                    }
                })
            },
            //약관 동의 여부 조회
            fn_getCert(){
                 // 정보제공동의여부 조회
                const config = {
                    url     : "/co/co/00r03",
                    data    : {
                        mydtCusno   : this.getUserInfo("mydtCusno"),
                        ofrHdngC    : "000003",  // 000001 : 카드/자동차, 000002 : 경제데이터, 000003 (상품·서비스안내)
                    }
                }
                apiService.call(config).then(response => {
                    this.certAgrYn      = response.agrYn === "0" ? false : true // "0" : 미동의 , "1" : 동의
                    this.certSqNo       = response.sqno     //약관 상품서비스안내 sqNo
                    this.certStltTpc    = response.stltTpc  //약관 상품서비스안내 stltTpc
                })
            },
            //약관 동의 저장 처리
            fn_saveCert(agrYn){
                const config = {
                    url : "/co/co/00i02",
                    data : {
                        mydtCusno       : this.getUserInfo("mydtCusno"),
                        ofrHdngC        : "000003",                     // 제공항목코드 (000001 : 카드/자동차, 000002 : 경제데이터, 000003 : 상품정보) 
                        agrYn           : agrYn?"1":"0",                // 동의여부 ("1" : 동의, "0" : 미동의)
                        firEntPathVal   : this.getUserInfo('chnlgbn'),
                        lginInfVal      : this.getUserInfo('lginInfVal'),
                        lginDtm         : this.getUserInfo('lginDtm')
                    }
                }
                apiService.call(config).then(response => {
                    if(response.rspC === "0000") {
                        if(agrYn)
                        {
                            modalService.alert("개인(신용)정보 수집ㆍ이용 동의서 선택이 완료 되었습니다.").then(() => {});
                        }else{
                            modalService.alert("개인(신용)정보 수집ㆍ이용 동의서 선택이 취소 되었습니다.").then(() => {});
                        }

                        this.fn_getCert() //약관동의 재조회
                    }
                })
            }
        }
    }
</script>