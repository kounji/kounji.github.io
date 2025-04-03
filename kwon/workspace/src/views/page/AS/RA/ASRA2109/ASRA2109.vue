<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 기타
* @ 페이지설명 : 나의자산 > 자산 > 기타 그밖에
* @ 파일명     : src/views/page/AS/RA/ASRA2109/ASRA2109.vue
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
            <h1>기타자산</h1>
        </div>
        <div class="popup_content com_no_bottom com_bg_type00">
            <div class="com_inner">
                <div class="top_info_box_wrap mb30">
                    <div class="top_info_box type02 new_top_box fixBG">
                        <div class="box_head">
                            <div class="info">
                                <div class="title p-l">
                                    <i class="ico etc"></i>{{astnm}}
                                </div>
                            </div>
                        </div>
                        <div class="bill mt90 p-l">
                            <!-- <span class="text fs25"></span><span id="asetAm" class="num counter" :data-count="asetAm"></span><span class="text fs25">원</span> -->
                            <span class="text fs25"></span><span id="asetAm" class="num counter">{{asetAm | numberFilter}}</span><span class="text fs22">원</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popup_footer fixed">
            <div class="btn_half_box">
                <a href="javascript:void(0);" class="btn btn_grey" v-on:click.prevent="fn_delBtn()">삭제</a>
                <a href="javascript:void(0);" class="btn btn_mint" v-on:click.prevent="movePage()" >수정</a>
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

    import COOA2005 from '@/views/page/CO/OA/COOA2005/COOA2005'

    export default {
        name : "ASRA2109",
        data: () => {
            return {
                sqno   : "", // 일련번호
                astnm  : "", // 자산명
                asetAm : 0   // 자산금액
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
                this.sqno = param.sqno;

                this.getData();
            },
            getData() {
                const config = {
                    url: '/as/ra/09r01',
					data: {
                        mydtCusno : this.getUserInfo('mydtCusno'), // 고객번호
                        sqno      : this.sqno                      // 일련번호
                    }
                };

                apiService.call(config).then(response => {
                    this.sqno   = response.sqno;
                    this.astnm  = response.astnm;
                    this.asetAm = Math.floor(response.asetAm);

                    // 금액 Animate 처리 함수 호출
                    // amountCountAnimate("asetAm", this.asetAm);
                });
            },
            movePage() {
                const config = {
                    component : COOA2005,
                    params    : {
                        isUpt : true,
                        sqno  : this.sqno // 일련번호
                    }
                };

                modalService.openPopup(config).then((response) => {
                    if (response.uptCom == true) { // 수정완료
                        this.getData();
                    }
                });
            },
            fn_delBtn() {
                const config = {
                    content : ['자산을 삭제하시면 더 이상 나의 자산 금액에 반영되지 않습니다.'],
                    title   : ""
                };

                modalService.confirm(config).then(text => {
                    if(text == "예") {
                        this.fn_delEtc();
                    }
                });
            },
            fn_delEtc() {
                const config = {
                    url: '/co/oa/07s01',
                    data: {
                        mydtCusno   : this.getUserInfo('mydtCusno'),    // 마이데이터고객번호
                        sqno        : this.sqno,                        // 일련번호
                        trDsc       : '3'                               // 거래구분코드(1: 저장, 2: 수정, 3: 삭제)
                    }
                }
                apiService.call(config).then(response => {
                    if (response.rspC == '0000') {
                        modalService.alert("삭제되었습니다.").then(() => {
                            this.closeAll(response.rspC);
                        });
                    } else {
                        modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {});
                    }
                })
            }
        }
    }
</script>