<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 리스
* @ 페이지설명 : 나의자산 > 부채 > 리스 > 금융리스상세
* @ 파일명     : src/views/page/AS/LN/ASLN2113/ASLN2113.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-27
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-27              CS515897               최초작성
* 2021-05-31              CS515937               수정
* 2023-09-19              CS533031         As-Is → To-Be Css 변경
*************************************************************************/
-->
<template>
    <div class="full_popup mydata2023" id="full_popup_01"><!-- mydata2023 추가 -->
		<div class="popup_header">    
			<h1>금융리스 상세</h1>			
		</div>
        <div class="popup_content com_no_bottom com_bg_type00 mydataAsisVer"><!-- mydataAsisVer 추가 -->
            <div class="com_inner">
                <div class="top_info_box_wrap">
                    <div class="top_info_box type02 new_top_box fixBG hasdetail">
                        <div class="box_head">
                            <div class="info">
                                <div class="ico">
                                    <i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgCNm}}</span></i>
                                </div>
                                <div class="title">
                                    {{istFncWrsnm}}
                                    <div class="num">{{mydtAcno}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="text">대출금리 <em>{{aplItr | numberFilter('0,0.00', {precision: 2})}}%</em></div>
                        <div class="bill">
                            <span class="num counter" data-count="lnAcBac"></span>{{lnAcBac | numberFilter}}<span class="text fs25">원</span>
                        </div>
                        <cmm-progress
                            :startDate="lnDt"
                            :endDate="dueDt"
                        />
                        <div class="box_toggle_wrap">
                            <div class="box_toggle">
                                <div class="toggle-box">
                                    <div data-ui-toggle="box">
                                        <div class="view-box">
                                            <div class="info">
                                                <div class="title">대출금액</div>
                                                <div class="num">{{acLnOgnAm | numberFilter}}원</div>
                                            </div>
                                            <!-- <div class="info">
                                                <div class="title">총 상환액</div>
                                                <div class="num">{{acLnOgnAm - lnAcBac | numberFilter}}원</div>
                                            </div> -->
                                            <!-- 유효한 날짜 형식이 아니면 표시하지 않음(미회신 되는 경우 포함) -->
                                            <div class="info" v-if="fn_isValidDate">
                                                <div class="title">다음이자상환일</div>
                                                <div class="num">{{nxIntRpyDt | dateFilter('M월D일')}}</div>
                                            </div>
                                            <div class="info">
                                                <div class="title">상환방식</div>
                                                <div class="text">{{getrpyMetcNm(rpyMetc)}}</div>
                                            </div>
                                            <div class="info" v-if="(auttrOrgCNm != '' && istFncRpyAcno != '') && (auttrOrgCNm != null && istFncRpyAcno != null)">
                                                <div class="title">자동이체</div>
                                                <div class="num right">{{auttrOrgCNm}} {{istFncRpyAcno}}</div>
                                            </div>
                                        </div>
                                        <button type="button" class="view-btn" aria-expanded="false">
                                            <em class="open">열기</em><em class="close">닫기</em>
                                        </button>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <hr class="hr02 mb0"><!-- 신규 추가 -->
            <div class="com_inner" v-if="istFncTrbrkList.length > 0">
                <ul class="list_type_02 list_subtype02">
                    <li v-for="(item, index) in istFncTrbrkList" :key="index">
                        <div data-ui-toggle="box" class="list_type_box">
                            <!-- 이자내역 있는 경우만 토글버튼 노출 -->
                            <button class="view_btn" :class="fn_noList(index)" aria-expanded="false">
                                <dl>
                                    <dt>
                                        <div>
                                            <em>{{getIstFncAcTrTpcNm(item.istFncAcTrTpc)}}</em>
                                        </div>
                                        <span v-if="item.mydtTrDtm.length > 8">{{item.mydtTrDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span>
                                        <span v-else>{{item.mydtTrDtm | dateFilter('YYYY.MM.DD')}}</span>
                                    </dt>
                                    <dd>
                                        <!-- 상환인 경우 거래금액 중 원금으로 표시 -->
                                        <template v-if="item.istFncAcTrTpc == '02'">
                                            <!-- 만기일시상환, 한도거래, 기타의 경우는 원금표시하지 않음 -->
                                            <span class="com_price" v-if="fn_rpyMethod">
                                                <em class="num">{{item.tramOgnAm | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </template>
                                        <!-- 상환이 아닌 경우 거래금액으로 표시 -->
                                        <template v-else>
                                            <span class="com_price">
                                                <em class="num">{{item.lnAcTram | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </template>
                                        <span class="com_price" v-if="item.intTrbrkCn > 0">
                                            <span>이자</span>
                                            <em class="num">{{item.tramIntAm | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <em class="open">열기</em><em class="close">닫기</em>
                            </button>
                        </div>
                        <!-- 이자목록 표시 -->
                        <div class="listbox_area">
                            <div class="listbox_type01" v-for="(intList,index) in item.intTrbrkList" :key="index">
                                <p>{{getIstFncIntKdcNm(intList.istFncIntKdc)}}</p>
                                <dl>
                                    <dt>이자계산기간</dt>
                                    <dd>{{intList.intAplStDt | dateFilter('YYYY.MM.DD')}}~{{intList.intAplEdDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl>
                                    <dt>적용이율</dt>
                                    <dd><em>{{intList.aplItrrt}}%</em></dd>
                                </dl>
                                <dl>
                                    <dt>납입금액</dt>
                                    <dd>{{intList.intAm | numberFilter}}<em>원</em></dd>
                                </dl>
                            </div>
                        </div>
                        <!-- 환출이자 존재하면 표시 -->
                        <dl class="list_depth2" v-if="item.touIntAm > 0">
                            <dt>
                                <div>
                                    <em>환출이자</em>
                                </div>
                                <span v-if="item.mydtTrDtm.length > 8">{{item.mydtTrDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span>
                                <span v-else>{{item.mydtTrDtm | dateFilter('YYYY.MM.DD')}}</span>
                            </dt>
                            <dd>
                                <span class="com_price">
                                    <em class="num">{{item.touIntAm | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <div class="no_data_box grayExclamationType" v-else><!-- grayExclamationType 추가 -->
                <div class="no_data_list">
                    <p>조회된 정보가 없습니다.</p>
                </div>
            </div>
            <div class="com_inner">
                <div class="com_btn_area02"><a href="javascript:void(0);" class="com_btn_more" @click.prevent="showMoreList()" :style="noMoreList"><span>더보기</span></a></div>
            </div>
        </div>
		<a href="javascript:void(0);" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
    <!--// full popup E --> 
</template>

<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import CmmProgress from '@/components/CmmProgress'
import {isValidDate} from '@/utils/date'

export default {
    name : "ASLN2113",
    data: () => {
        return {
            mydtCusno           : "",           // 마이데이터고객번호
            infOfrmnOrgC        : "",           // 정보제공자기관코드
            infOfrmnOrgCNm      : "",           // 정보제공자기관코드명
            mydtAcno            : "",           // 마이데이터계좌번호
            mydtScNo            : "",           // 마이터이터회차번호
            istFncTrbrkCn       : "",           // 할부금융거래내역수
            rcnInqDtm           : "",           // 최근조회일시
            firCusCrtDt         : "",           // 최초고객생성일자
            tmsRqmYn            : "",           // 전송요구여부
            istFncWrsnm         : "",           // 할부금융상품명
            istFncAcTpDsc       : "",           // 할부금융계좌구분코드
            istFncAcStsDsc      : "",           // 할부금융계좌상태코드
            lnDt                : "",           // 대출일자
            dueDt               : "",           // 만기일자
            aplItr              : 0,            // 적용금리
            mmRpyDd             : "",           // 월상환일
            rpyMetc             : "",           // 상환방식코드
            auttrOrgC           : "",           // 자동이체기관코드
            auttrOrgCNm         : "",           // 자동이체기관코드명
            istFncRpyAcno       : "",           // 할부금융상환계좌번호
            lnAcBac             : 0,            // 대출계좌잔액
            acLnOgnAm           : 0,            // 계좌대출원금액
            nxIntRpyDt          : "",           // 다음이자상환일자
            pageNo              : 1,            // 페이지번호
            nxDataYn            : "",           // 다음데이터여부

            istFncTrbrkList    : [],            // 금융리스거래내역
        }
    },
    computed : {
        noMoreList() {
            return (this.nxDataYn == 'Y')?"":"display : none"
        },
        fn_rpyMethod() {
            return (this.rpyMetc == '01' || this.rpyMetc == '08' || this.rpyMetc == '09')?false:true
        },
        fn_isValidDate() {
            return isValidDate(this.nxIntRpyDt)
        }
    },
    mounted() {
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent() {
            this.mydtCusno      = this.params.mydtCusno || ''
            this.infOfrmnOrgC   = this.params.infOfrmnOrgC || ''
            this.mydtAcno       = this.params.mydtAcno || ''
            this.mydtScNo       = this.params.mydtScNo || ''
            this.getData()
        },

        getData() {
            const config = {
                url : '/as/ln/12r01',
                data : {
                    mydtCusno       : this.mydtCusno,    
                    infOfrmnOrgC    : this.infOfrmnOrgC,
                    mydtAcno        : this.mydtAcno,
                    mydtScNo        : this.mydtScNo,
                }
            }
            apiService.call(config).then(response => {
                this.mydtCusno      = response.mydtCusno || ''
                this.infOfrmnOrgC   = response.infOfrmnOrgC || ''
                this.infOfrmnOrgCNm = response.infOfrmnOrgCNm || ''
                this.mydtAcno       = response.mydtAcno || ''
                this.mydtScNo       = response.mydtScNo || ''
                this.rcnInqDtm      = response.rcnInqDtm || ''
                this.firCusCrtDt    = response.firCusCrtDt || ''
                this.tmsRqmYn       = response.tmsRqmYn || ''
                this.istFncWrsnm    = response.istFncWrsnm || ''
                this.istFncAcTpDsc  = response.istFncAcTpDsc || ''
                this.istFncAcStsDsc = response.istFncAcStsDsc || ''
                this.lnDt           = response.lnDt || ''
                this.dueDt          = response.dueDt || ''
                this.aplItr         = response.aplItr || 0
                this.mmRpyDd        = response.mmRpyDd || ''
                this.rpyMetc        = response.rpyMetc || ''
                this.auttrOrgC      = response.auttrOrgC || ''
                this.istFncRpyAcno  = response.istFncRpyAcno || ''
                this.lnAcBac        = response.lnAcBac || 0
                this.acLnOgnAm      = response.acLnOgnAm || 0
                this.nxIntRpyDt     = response.nxIntRpyDt || ''

                this.getTransaction()     // 거래내역 조회
            });
        },

        // 거래내역 조회
        getTransaction() {
            const config = {
                url : "/as/ln/12r02",
                data : {
                    mydtCusno     : this.mydtCusno,
                    infOfrmnOrgC  : this.infOfrmnOrgC,
                    mydtAcno      : this.mydtAcno,
                    mydtScNo      : this.mydtScNo,
                    pageNo        : this.pageNo,
                }
            }
            apiService.call(config).then(response => {
                this.mydtCusno          = response.mydtCusno || ''
                this.infOfrmnOrgC       = response.infOfrmnOrgC || ''
                this.mydtAcno           = response.mydtAcno || ''
                this.mydtScNo           = response.mydtScNo || ''
                this.istFncTrbrkCn      = response.istFncTrbrkCn || 0
                this.nxDataYn           = response.nxDataYn || 'N'
                this.istFncTrbrkList    = response.istFncTrbrkList || []

                this.callJQueryFncExcute()
            });
        },

        fn_noList(index) {
            return (this.istFncTrbrkList[index].intTrbrkCn > 0)?"":"no_list"
        },

        // 금융리스 거래유형
        getIstFncAcTrTpcNm(cVal) {
            let cmmLnList = this.getCodeList("IST_FNC_AC_TR_TPC")
            for(var i=0; i<cmmLnList.length; i++) {
                if(cVal === cmmLnList[i].comnCVal) {
                    if(this.rpyMetc == '01')
                        return cmmLnList[i].comnCExpl == "상환"?"이자":cmmLnList[i].comnCExpl
                    else
                        return cmmLnList[i].comnCExpl
                }
            }
        },

        // 상환방식
        getrpyMetcNm(cVal) {
            let cmmLnList = this.getCodeList("RPY_METC")
            for(var i=0; i<cmmLnList.length; i++) {
                if(cVal === cmmLnList[i].comnCVal) {
                    return cmmLnList[i].comnCExpl
                }
            }
        },

        // 이자종류
        getIstFncIntKdcNm(cVal) {
            let cmmLnList = this.getCodeList("IST_FNC_INT_KDC")
            
            for(var i=0; i<cmmLnList.length; i++) {
                if(cVal === cmmLnList[i].comnCVal) {
                    return cmmLnList[i].comnCExpl
                }
            }
        },

        // 더보기
        showMoreList() {
            this.pageNo += 1
            const config = {
                url : '/as/ln/12r02',
                data : {
                    mydtCusno     : this.mydtCusno,
                    infOfrmnOrgC  : this.infOfrmnOrgC,
                    mydtAcno      : this.mydtAcno,
                    mydtScNo      : this.mydtScNo,
                    pageNo        : this.pageNo,
                }
            }

            apiService.call(config).then(response => {
                this.nxDataYn	= response.nxDataYn || ''
                for(let i=0;i<response.istFncTrbrkList.length;i++) {
                    this.istFncTrbrkList.push(response.istFncTrbrkList[i])
                }
            })
        },
    },
    components : {
        CmmProgress,
    }
}
</script>