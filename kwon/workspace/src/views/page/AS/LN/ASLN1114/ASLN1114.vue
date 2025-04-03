<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 리스
* @ 페이지설명 : 나의자산 > 부채 > 리스 > 운영리스상세
* @ 파일명     : src/views/page/AS/LN/ASLN1114/ASLN1114.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-27
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-27              CS515897               최초작성
* 2021-06-01              CS515937               수정
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01"> <!-- 개발시 style="display:block;" 삭제--> 
		<div class="popup_header">    
			<h1>운용리스 상세</h1>	
		</div>
        <div class="popup_content com_no_bottom com_bg_type00">
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
                        <div class="bill mt20 p-l align">
                            <span class="text fs25">납기일 매월</span><span class="num">{{fixedMmRpyDd}}</span><span class="text fs25">일</span>
                        </div>
                        <cmm-progress
                            :startDate="lnDt"
                            :endDate="dueDt"
                        />
                        <div class="box_toggle_wrap">
							<div class="box_toggle">
								<div class="toggle-box">
									<div data-ui-toggle="box" >									
										<div class="view-box">
											<div class="info">
												<div class="title">상환방식</div>
												<div class="num">{{getrpyMetcNm(rpyMetc)}}</div>
											</div>
											<div class="info">
												<div class="title">다음 납입예정일</div>
												<div class="num">{{nxPymPlaDt | dateFilter('M월 D일')}}</div>
											</div>
											<div class="info" v-if="(auttrOrgCNm != '' && istFncRpyAcno != '') && (auttrOrgCNm != null && istFncRpyAcno != null)">
												<div class="title">자동이체</div>
												<div class="num right">{{auttrOrgCNm}}<br/>{{istFncRpyAcno}}</div>
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
            <template v-if="epyLeasTrbrkList.length > 0 ">
                <ul class="list_more_box">
                    <li>
                        <div class="com_inner">
                            <ul class="list_type_02">
                                <li v-for="(item, index) in epyLeasTrbrkList" :key="index">
                                    <dl>
                                        <dt>
                                            <!-- 운용리스는 상환방식에 따른 표현금액을 나눌 수 없음, 데이터가 나눠서 안옴 -->
                                            <div><em>{{getTrTpcNm(item.istEpyTrTpc)}}</em></div>
                                            <span v-if="item.mydtTrDtm.length > 8">{{item.mydtTrDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span>
                                            <span v-else>{{item.mydtTrDtm | dateFilter('YYYY.MM.DD')}}</span>
                                        </dt>
                                        <dd>
                                            <span class="cmm-price">
                                                <em class="num">{{item.epyLeasTram | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </template>
            <template v-else>
                <div class="no_data_box">
                    <div class="no_data_list">
                        <p>조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </template>
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

export default {
    name : "ASLN1114",
    data: () => {
        return {
            mydtCusno           : "",           // 마이데이터고객번호
            infOfrmnOrgC        : "",           // 정보제공자기관코드
            infOfrmnOrgCNm      : "",           // 정보제공자기관코드명
            mydtAcno            : "",           // 마이데이터계좌번호
            mydtScNo            : "",           // 마이터이터회차번호
            epyLeasTrbrkCn      : "",           // 운용리스거래내역수
            rcnInqDtm           : "",           // 최근조회일시
            firCusCrtDt         : "",           // 최초고객생성일자
            tmsRqmYn            : "",           // 전송요구여부
            istFncWrsnm         : "",           // 할부금융상품명
            istFncAcTpDsc       : "",           // 할부금융계좌구분코드
            istFncAcStsDsc      : "",           // 할부금융계좌상태코드
            lnDt                : "",           // 대출일자
            dueDt               : "",           // 만기일자
            mmRpyDd             : "",           // 월상환일
            rpyMetc             : "",           // 상환방식코드
            auttrOrgC           : "",           // 자동이체기관코드
            auttrOrgCNm         : "",           // 자동이체기관코드명
            istFncRpyAcno       : "",           // 할부금융상환계좌번호
            nxPymPlaDt          : "",           // 다음납입예정일자
            pageNo              : 1,            // 페이지번호
            nxDataYn            : "",           // 다음데이터여부

            epyLeasTrbrkList    : [],           // 운용리스거래내역
        }
    },
    computed : {
        // 상환일을 2자리로 받을 때 앞에 0제거
        fixedMmRpyDd() {
            return (this.mmRpyDd.charAt(0) == '0')?this.mmRpyDd.replace('0','').charAt(0):this.mmRpyDd
        },
        noMoreList() {
            return (this.nxDataYn == 'Y')?"":"display : none"
        },
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent(param) {
            this.mydtCusno      = param.mydtCusno
            this.infOfrmnOrgC   = param.infOfrmnOrgC
            this.mydtAcno       = param.mydtAcno
            this.mydtScNo       = param.mydtScNo
            this.getData()
        },

        getData() {
            const config = {
                url : '/as/ln/14r01',
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
                this.mmRpyDd        = response.mmRpyDd || ''
                this.rpyMetc        = response.rpyMetc || ''
                this.auttrOrgC      = response.auttrOrgC || ''
                this.istFncRpyAcno  = response.istFncRpyAcno || ''
                this.nxPymPlaDt     = response.nxPymPlaDt || ''

                this.callJQueryFncExcute()

                this.getTransaction()     // 거래내역 조회
            });
        },

        // 거래내역 조회
        getTransaction() {
            const config = {
                url : "/as/ln/14r02",
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
                this.epyLeasTrbrkCn     = response.epyLeasTrbrkCn || 0
                this.nxDataYn           = response.nxDataYn || 'N'
                this.epyLeasTrbrkList   = response.epyLeasTrbrkList || []
            });
        },

        // 거래유형
        getTrTpcNm(cVal) {
            let cmmLnList = this.getCodeList("IST_EPY_TR_TPC")
            for(var i=0; i<cmmLnList.length; i++) {
                if(cVal === cmmLnList[i].comnCVal) {
                    return cmmLnList[i].comnCExpl == "일부상환"?"상환":cmmLnList[i].comnCExpl
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

        // 더보기
        showMoreList() {
            this.pageNo += 1
            const config = {
                url : '/as/ln/14r02',
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
                for(let i=0;i<response.epyLeasTrbrkList.length;i++) {
                    this.epyLeasTrbrkList.push(response.epyLeasTrbrkList[i])
                }
            })
        },
    },
    components : {
        CmmProgress,
    }
}
</script>