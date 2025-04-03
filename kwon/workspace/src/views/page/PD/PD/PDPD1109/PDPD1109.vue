<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 상품추천 > 대출한도조회
* @ 페이지설명 : 금융과생활 > 상품추천 > 대출한도조회 > step 3. 대출상품 안내
* @ 파일명     : src\views\page\PD\PD\PDPD0009\PDPD0009.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-08-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-19              CS516033              최초작성
* 2021-11-22              CS515731              BXI 파라미터 수정
                                                class 수정
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>대출한도조회</h1>
        </div>

        <template v-if="wrstpLnLmtList.length > 0">
            <div class="popup_content com_no_bottom com_bg_type00">
                <div class="com_inner com_line_type01 com_top_type02">
                    <strong class="com_pop_tit01"><span>{{cusnm}}님에게 딱 맞는 </span>{{wrstpLnLmtList.length | numberFilter}}개의 대출 상품을 추천해 드려요.</strong>
                </div>
                <div class="com_inner com_boxarea_type01">
                    <div class="com_box_type01 com_box_list04" v-for="(wrstpLnLmt, idx) in wrstpLnLmtList" :key="'rlest_'+idx">
                        <div class="new_tit_area loan">
                            <div class="txt">{{wrstpLnLmt.lnBzCnm}}</div>
                            <span :class="wrstpLnLmt.inqDscClass">{{wrstpLnLmt.inqDscNm}}</span>
                        </div>
                        <div class="info_list">
                            <ul class="bl_dot_list">
                                <li>
                                    <dl>
                                        <dt>대출한도</dt>
                                        <dd>{{removeComma(wrstpLnLmt.laMinAm) / 10000 | numberFilter}}만원 ~ {{removeComma(wrstpLnLmt.laMaxAm) / 10000 | numberFilter}}만원</dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>예상금리</dt>
                                        <dd>{{wrstpLnLmt.maxLlmtItr | numberFilter('0,00.00', {precision: 2})}}% ~ {{wrstpLnLmt.maxMaxItr | numberFilter('0,00.00', {precision: 2})}}%</dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="com_inner help_box">
                    <strong class="com_box_tit01">알아두세요!</strong>
                    <ul class="bl_dot_list pb5">
                        <li>대출한도 및 예상금리는 실제 대출 실행 시와 다를 수 있습니다.</li>
                        <li>정확한 정보는 아래 영업점에 문의 바랍니다.</li>
                    </ul>
                </div>
                <div class="com_inner">
                    <div class="com_box_type02 branch_info">
                        <div>{{brnm}}</div>
                        <template v-if="cusuzTelno !== ''">
                        <span>{{cusuzTelno}}</span>
                        </template>
                    </div>
                </div>
            </div>
        </template>
        
        <template v-else>
            <div class="popup_content com_no_bottom com_bg_type02">
                <div class="com_inner">
                    <div class="secede_box">
                        <p class="txt">죄송합니다.</p>
                        <p class="txt_sub">고객님께 딱 맞는 대출 상품을<br>찾지 못하였습니다.</p>
                    </div>
                </div>
                <div class="mt_auto banner_area">
                    <a href="javascript:void(0);" @click.prevent="fn_openCOAR2001()">
                        <div class="com_box_type03 bg17 mt20">
                            <div class="text">
                                아직 등록하지 않은<br><span class="color">자산이 있지 않나요?</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </template>

        <a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll(true)"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    // import appService from '@/service/appService'

    import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'

    export default {
        name : "PDPD1109",
        data: () => {
            return {
                cusnm           : "", // 로그인 사용자 이름
                brc             : "", // 사무소코드
                brnm            : "", // 사무소명
                cusuzTelno      : "", // 사무소전화번호
                mydtCusno       : "", // 고객번호
                ioGiRowCnt      : 0,  // 그리드INFO_ROW갯수
                wrstpLnLmtList  : [], // 상품별대출한도
                                // inqDsc            상품구분코드 1:신용, 2:담보, 3:전세
                                // lnBzC             대출사업코드
                                // lnBzCmn           대출사업코드명
                                // laMinAm           여신최소금액
                                // laMaxAm           여신최대금액
                                // maxLlmtItr        최대하한금리
                                // maxMaxItr         최대상한금리
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        computed : {
           
        },        
        beforeMount(){
            this.cusnm = this.getUserInfo("cusnm")
        },        
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                this.brc            = param.brc
                this.mydtCusno      = param.mydtCusno
                this.brnm           = param.brnm || ''
                this.cusuzTelno     = param.cusuzTelno || ''
                this.ioGiRowCnt     = param.ioGiRowCnt
                this.wrstpLnLmtList = param.wrstpLnLmtList || []       
                
                for (let i=0; i< this.wrstpLnLmtList.length; i++)
                {
                    if (this.wrstpLnLmtList[i].inqDsc === '1') {
                        this.wrstpLnLmtList[i].inqDscClass ='icon_blue'
                        this.wrstpLnLmtList[i].inqDscNm ='신용'
                        continue
                    }
                    if (this.wrstpLnLmtList[i].inqDsc === '2') {
                        this.wrstpLnLmtList[i].inqDscClass ='icon_grey'
                        this.wrstpLnLmtList[i].inqDscNm ='담보'
                        continue
                    }
                    if (this.wrstpLnLmtList[i].inqDsc === '3') {
                        this.wrstpLnLmtList[i].inqDscClass ='icon_mint'
                        this.wrstpLnLmtList[i].inqDscNm ='전세'
                        continue                        
                    }
                }
            },
			removeComma(value) {
				return (typeof value === "string") ? value.split(",").join("") : value
			},
            fn_openCOAR2001() {
                const config = {
                    component : COAR2001 // 자산등록
                }

                modalService.openPopup(config).then((response) => {
                    if (response == true) { // 자산등록완료
                        // this.getData();
                    }
                })
            }
        }
    }
</script>