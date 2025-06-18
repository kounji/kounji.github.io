<!--
/*************************************************************************
* @ 서비스경로 : 설정/관리 > 알림관리
* @ 페이지설명 : 설정/관리 > 알림관리
* @ 파일명     : src/views/page/CO/CO/COCO1101/COCO1101.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-18             CS515729                 최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>알림관리</h1>
        </div>
        <div class="popup_content com_bg_type00">
            <ul class="list_type_03">
                <li v-for="(item, idx) in ancList" :key="idx">
                    <a href="javascript:void(0);" v-on:click.prevent="movePage(item)">
                        <div>
                            <em>
                                <span v-if="item.asetAmnAncDsc == '04'" class="icon_grey sm">공지</span>
                                {{item.ancCntn}}
                            </em>
                        </div>
                        <span>{{item.dataCrtDt | dateFilter('YYYY.MM.DD')}}</span>
                    </a>
                </li>
            </ul>
            <div class="no_data_box" v-if="ancList.length == 0">
                <div class="no_data_list">
                    <p>보관된 알림이 없습니다.</p>
                </div>
            </div>
            <div class="com_btn_area02"><a href="javascript:void(0);" class="com_btn_more" @click.prevent="fn_showMore" v-show="btnShowYn"><span>더보기</span></a></div>
        </div>
        <a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll('COCO1101')"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import commonService from '@/service/commonService'

    import ASCR4101 from '@/views/page/AS/CR/ASCR4101/ASCR4101'
    import COCO1105 from '@/views/page/CO/CO/COCO1105/COCO1105'

    export default {
        name : "COCO1101",
        data: () => {
            return {
                pageNo      : 0,     // 페이지번호
                pageCn      : 0,     // 페이지수
                nxDataYn    : "",    // 다음 데이터 존재여부
                btnShowYn   : true,  // 더보기 버튼 표시여부
                ancList     : [],    // 알림목록
                listCheckYn : false, // 체크 여부
                ancAllChkYn : false  // 전체 체크 여부
            }
        },
        mounted() {
            this.initComponent();

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
                // 전체 체크 여부 초기화
                this.listCheckYn = false;
                this.ancAllChkYn = false;

                this.pageNo    = 1;
                this.pageCn    = 50;
                this.btnShowYn = false;

                const config = {
                    url: '/co/co/01r01',
                    data: {
                        mydtCusno : this.getMydataCusno(), // 마이데이터고객번호
                        pageNo    : this.pageNo,           // 페이지번호
                        pageCn    : this.pageCn            // 페이지수
                    }
                };

                apiService.call(config).then(response => {
                    this.nxDataYn = response.nxDataYn;
                    this.ancList  = response.ancList || [];

                    // 더보기 버튼 표시여부
                    this.fn_setBtnShowYn();
                });
            },
            // 더보기
            fn_showMore() {
                this.pageNo = this.pageNo + 1;

                const config = {
                    url: '/co/co/01r01',
                    data: {
                        mydtCusno : this.getMydataCusno(), // 마이데이터고객번호
                        pageNo    : this.pageNo,           // 페이지번호
                        pageCn    : this.pageCn            // 페이지수
                    }
                };

                apiService.call(config).then(response => {
                    this.nxDataYn = response.nxDataYn;

                    for (let i=0; i<response.ancList.length; i++) {
                        this.ancList.push(response.ancList[i]);
                    }

                    // 더보기 버튼 표시여부
                    this.fn_setBtnShowYn();
                })
            },
            // 더보기 버튼 표시여부
            fn_setBtnShowYn() {
                if (this.nxDataYn == "Y") {
                    this.btnShowYn = true;
                } else {
                    this.btnShowYn = false;
                }
            },
            movePage(anc) {
                /*
                 * 01 결제예정금액, 02 나의목표, 03 신용정보, 04 공지사항
                 * 05 예적금만기, 06 자동차보험만기, 07 대출만기, 08 대출이자상환일
                 */
                if (anc.asetAmnAncDsc == "03" || anc.asetAmnAncDsc == "04") {
                    const config = {
                        component : anc.asetAmnAncDsc == "03" ? ASCR4101 : COCO1105,
                        params    : {
                            ofancId   : anc.ofancId,
                            ofancTinm : anc.ancCntn,
                            aplStDt   : anc.dataCrtDt
                        }
                    };
                    console.log("config : ",config);
                    modalService.openPopup(config).then(() => {
                        this.getData();
                    });
                } else {
                    const config = {
                        name : anc.apLkUrlnm1
                    };

                    commonService.movePage(config);
                    this.closeAll();
                }
            }
        }
    }
</script>