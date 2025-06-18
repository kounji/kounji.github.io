<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 기타
* @ 페이지설명 : 나의자산 > 자산 > 기타 외화
* @ 파일명     : src/views/page/AS/RA/ASRA2107/ASRA2107.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-05-27
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-27              CS516033              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>외화</h1>
        </div>
        <div class="popup_content com_bg_type00">
            <div class="com_inner">
                <div class="top_info_box_wrap mb0">
                    <div class="top_info_box type02 new_top_box fixBG">
                        <div class="box_head">
                            <div class="info">
                                <div class="ico">
                                    <span :class="'country ico_'+curc"><span class="blind"></span></span>
                                </div>
                                <div class="title">
                                    {{curc}}
                                </div>
                            </div>
                        </div>
                        <div class="bill p-l mt30">
                            <!-- <span class="text fs25"></span><span id="asetAm" class="num counter" :data-count="asetAm"></span><span class="text fs25">{{curnm}}</span> -->
                            <span class="text fs25"></span><span id="asetAm" class="num counter">{{fcAsetAmtt | numberFilter}}</span><span class="text fs22">{{curnm}}</span>
                        </div>
                        <!-- <div class="fs15 mt6 p-l bold" ><span id="krwAm" class="num counter" :data-count="krwAm"></span><span class="text">원</span></div> -->
                        <div class="fs15 mt6 p-l bold" ><span id="krwAm" class="num counter"></span>{{krwAmtt | numberFilter}}<span class="text fs12">원</span></div>
                        <div class="mt10 fs14 sub_txt point_gray p-l" v-if="curc!=='JPY'">{{xcrtBasDt | dateFilter('YYYY년 M월 D일')}} 매도환율({{xcrtAm | numberFilterAuto('0,00.00', {precision: 2}, false)}}원) 기준입니다. (원 단위 미만 절사)</div>
                        <div class="mt10 fs14 sub_txt point_gray p-l" v-else-if="curc==='JPY'">{{xcrtBasDt | dateFilter('YYYY년 M월 D일')}} 매도환율({{xcrtAm | numberFilterAuto('0,00.00', {precision: 2}, false)}}원/100JPY) 기준입니다. (원 단위 미만 절사)</div>
                    </div>
                </div>
            </div>
            <ul class="list_more_box">
                <li>
                    <div class="com_inner">
                        <div class="new_tit_area">
                            <div class="tit"><span>외화 자산 등록 내역</span></div>
                        </div>
                        <ul class="list_type_02">
                            <li v-for="(fcCshAst, idx) in fcCshAstList" :key="idx">
                                <dl>
                                    <dt>
                                        <div><em>{{fcCshAst.astnm}}</em></div>
                                    </dt>
                                    <dd>
                                        <template v-if="fcCshAstCn > 1">
                                            <div class="del_modify">
                                                <span class="com_price">
                                                    <em class="num">{{fcCshAst.asetAm | numberFilter}}</em><em class="unit">{{curnm}}</em>
                                                </span>
                                                <div class="edit">
                                                    <button class="btn_iconwrite" @click.prevent="movePage(idx)"><span class="blind">수정</span></button>
                                                    <button class="btn_icodelete" @click.prevent="fn_delBtn(fcCshAst.sqno)"><span class="blind">삭제</span></button>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <span class="com_price">
                                                <em class="num">{{fcCshAst.asetAm | numberFilter}}</em><em class="unit">{{curnm}}</em>
                                            </span>
                                        </template>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <div class="com_space_type01"></div>
                </li>
            </ul>
        </div>
        <div class="popup_footer fixed">
            <div class="btns_wrap" v-if="fcCshAstCn > 1">
                <button type="button" class="btns lg primary" v-on:click.prevent="fn_allDelBtn()">자산 모두 삭제</button>
            </div>
            <div class="btns_wrap" v-else>
                <button type="button" class="btns lg" v-on:click.prevent="fn_allDelBtn()">삭제</button>
				<button type="button" class="btns lg primary" v-on:click.prevent="movePage(0)">수정</button>
            </div>
        </div>
        <a href="javascript:void(0);" @click.prevent="close(true)" class="btn_close"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
// import {amountCountAnimate} from '@/utils/jUtils'

import COOA2002 from '@/views/page/CO/OA/COOA2002/COOA2002'

export default {
    name : "ASRA2107",
    data: () => {
        return {
            curc         : "", // 통화코드
            curnm        : "", // 통화명
            fcAsetAmtt   : 0,  // 외화자산금액합계
            krwAmtt      : 0,  // 원화금액합계
            xcrtAm       : 0,  // 환율금액
            xcrtBasDt    : "", // 환율기준일자
            fcCshAstCn   : 0,  // 외화현금자산건수
            fcCshAstList : []  // 외화현금자산목록
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params);

        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    methods: {
        initComponent(param) {
            this.curc = param.curc;

            this.getData();
        },
        getData() {
            const config = {
                url: '/as/ra/07r01',
                data: {
                    mydtCusno : this.getUserInfo('mydtCusno'), // 고객번호
                    curc      : this.curc                      // 통화코드
                }
            };

            apiService.call(config).then(response => {
                this.curc         = response.curc;
                this.curnm        = response.curnm;
                this.fcAsetAmtt   = response.fcAsetAmtt;
                this.krwAmtt      = response.krwAmtt;
                this.xcrtAm       = response.xcrtAm;
                this.xcrtBasDt    = response.xcrtBasDt;
                this.fcCshAstCn   = response.fcCshAstCn;
                this.fcCshAstList = response.fcCshAstList;

                // 금액 Animate 처리 함수 호출
                // amountCountAnimate("asetAm", this.asetAm);
                // amountCountAnimate("krwAm" , this.krwAm );
            });
        },
        movePage(astIdx) {
            const config = {
                component : COOA2002,
                params    : {
                    isUpt    : true,
                    curc     : this.curc,                         // 통화코드
                    sqno     : this.fcCshAstList[astIdx].sqno,    // 일련번호
                    asetAm   : this.fcCshAstList[astIdx].asetAm,  // 자산금액
                    astnm    : this.fcCshAstList[astIdx].astnm,   // 자산명
                    memoCntn : this.fcCshAstList[astIdx].memoCntn // 메모내용
                }
            };

            modalService.openPopup(config).then((response) => {
                if (response.uptCom == true) { // 수정완료
                    this.getData();
                }
            });
        },
        // 개별 삭제
        fn_delBtn(sqno) {
            const config = {
                content : ['등록된 자산을 삭제 하시겠습니까?'],
                title   : ""
            };

            modalService.confirm(config).then(text => {
                if(text == "예") {
                    this.fn_delCurc(sqno);
                }
            });
        },
        // 외화 전체 삭제
        fn_allDelBtn() {
            const config = {
                content : ['자산을 삭제하시면 더 이상 나의 자산 금액에 반영되지 않습니다.'],
                title   : ""
            };

            modalService.confirm(config).then(text => {
                if(text == "예") {
                    this.fn_delCurc("ALL");
                }
            });
        },
        fn_delCurc(dsc) {
            const config = {
                url  : '/co/oa/02s01',
                data : {
                    mydtCusno : this.getUserInfo('mydtCusno'), // 마이데이터고객번호
                    curc      : this.curc,                     // 통화코드
                    sqno      : dsc != "ALL" ? dsc : "",       // 일련번호
                    trDsc     : dsc != "ALL" ? "3" : "4"       // 거래구분코드(1:저장, 2:수정, 3:삭제, 4:전체삭제)
                }
            }
            
            apiService.call(config).then(response => {
                if (response.rspC == '0000') {
                    modalService.alert("삭제되었습니다.").then(() => {
                        if (dsc != "ALL") {
                            this.getData();
                        } else {
                            this.closeAll(response.rspC);
                        }
                    });
                } else {
                    modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {});
                }
            });
        }
    }
}
</script>