<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 정책자금 > 농업정책자금
* @ 페이지설명 : 마이농가 > 정책자금 > 농업정책자금 상세
* @ 파일명     : src/views/page/SZ/PC/SZPC2117/SZPC2117.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-05-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-31              CS516033              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>농업정책자금 상세</h1>
        </div>
        <div class="popup_content com_bg_type00 com_no_bottom">
            <div class="com_inner com_line_type01">
                <div class="top_area_box">
                    <div class="pop_tit"><span>{{cfcnm}}</span></div>
                    <div class="com_box_type01 basic_dot_box">
                        <ul class="bl_dot_list">
                            <li>
                                <dl>
                                    <dt>대출한도</dt>
                                    <dd>{{lnLmtCntn}}</dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>대출금리</dt>
                                    <dd>{{lnitrCntn}}</dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>상환방법</dt>
                                    <dd>{{rpyMcnt}}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul class="toggle_list_area">
                <li v-for="(agrcDtl, idx) in agrcDtlList" :key="idx">
                    <div class="toggle_list_box" :key="idx">
                        <div data-ui-toggle="box" :class="idx == 0 ? 'active open' : ''">
                            <button type="button" class="view_btn" :aria-expanded="idx == 0 ? 'true' : 'false'">
                                <span class="tit">{{agrcDtl.dtlCnm}}</span>
                                <!-- <em class="open">열기</em><em class="close">닫기</em> -->
                            </button>
                        </div>
                        <div class="view_list_box" v-html="agrcDtl.cDtlExpl">
                        </div>
                    </div>
                </li>
                <li v-if="bizoList.length > 0">
                    <div class="toggle_list_box">
                        <div data-ui-toggle="box" :class="agrcDtlList.length > 0 ? '' : 'active open'">
                            <button type="button" class="view_btn" :aria-expanded="agrcDtlList.length > 0 ? 'false' : 'true'">
                                <span class="tit">영업점 연락처</span>
                                <!-- <em class="open">열기</em><em class="close">닫기</em> -->
                            </button>
                        </div>
                        <div class="view_list_box">
                            <div class="st_txt">영업점 연락처</div>
                            <table class="v_tbl">
                                <colgroup>
                                    <col style="width:30%">
                                    <col style="width:70%">
                                </colgroup>
                                <tbody>
                                    <tr v-for="(bizo, idx) in bizoList" :key="idx">
                                        <th>{{bizo.brnm}}</th>
                                        <td>{{bizo.cusuzTelno}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <a href="javascript:void(0);" role="button" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'

    export default {
        name : "SZPC2117",
        data: () => {
            return {
                agrcPycpAmnSqno : "", // 농업정책자금관리일련번호
                cfcnm           : "", // 농업정책자금명
                lnLmtCntn       : "", // 대출한도내용
                lnitrCntn       : "", // 대출금리내용
                rpyMcnt         : "", // 상환방법내용
                agrcDtlList     : [], // 농업정책자금상세목록
                bizoList        : []  // 문의처목록
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],        
        created() {
            
        },
        mounted(){
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                this.agrcPycpAmnSqno = param.agrcPycpAmnSqno;
                this.cfcnm           = param.cfcnm;
                this.lnLmtCntn       = param.lnLmtCntn;
                this.lnitrCntn       = param.lnitrCntn;
                this.rpyMcnt         = param.rpyMcnt;

                this.getData();
            },
            getData() {
                const config = {
                    url: '/sz/pc/17r01',
                    data: {
                        agrcPycpAmnSqno : this.agrcPycpAmnSqno,
                        mydtCusno       : this.getUserInfo('mydtCusno') // 고객번호
                    },
                };
                
                apiService.call(config).then(response => {
                    this.agrcDtlList = response.agrcDtlList || [];
                    this.bizoList    = response.bizoList || [];

                    //sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                    setTimeout(() => {
                        this.callJQueryFncExcute()
                    }, 100)
                });
            },
        }
    }
</script>