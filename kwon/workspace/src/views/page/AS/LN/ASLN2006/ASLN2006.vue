<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 대출 > 장기대출
* @ 페이지설명 : 나의자산 > 부채 > 대출 > 장기대출상세
* @ 파일명     : src/views/page/AS/LN/ASLN2006/ASLN2006.vue
* @ 작성자     : 채찬영
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10             CS533437               ASLN1109 -> ASLN2006
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>장기대출 상세</h1>
		</div>	
		<div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner">
				<div class="top_info_box_wrap">
					<div class="top_info_box type02 new_top_box fixBG hasdetail">
						<div class="box_head">
							<div class="info">
								<div class="ico">
                                    <!-- 은행아이콘 class 바인딩 -->
									<i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgCNm}}</span></i>
								</div>
								<div class="title">
									<span>{{infOfrmnOrgCNm}}</span><span class="bar"></span><span>{{cdcoLnWrsnm}}</span>
								</div>
							</div>
						</div>
						<div class="bill mt20 p-l align">
                            <span class="num counter" data-count="">{{ltrmlnBac | numberFilter}}</span><span class="text fs25">원</span>
						</div>
						<div class="text mt6 p-l">이자율 {{pmiIntrt | numberFilter('0,0.00', {precision: 2})}}%</div>
						<cmm-progress :startDate="lnDt" :endDate="dueDt"/>
						<div class="box_toggle_wrap">
							<div class="box_toggle">
								<div class="toggle-box">
									<div data-ui-toggle="box" class="active force" >									
										<div class="view-box">
											
											<div class="info">
												<div class="title">대출금액</div>
												<div class="num">{{lnUsAm | numberFilter}}원</div>
											</div>
											<div class="info">
												<div class="title">총 상환 원금</div>
												<div class="num">{{lnUsAm - ltrmlnBac | numberFilter}}원</div>
											</div>
                                            <div class="info">
												<div class="title">총 상환 이자</div>
												<div class="num">{{maxAmIntAm | numberFilter}}원</div>
											</div>
											<div class="info">
												<div class="title">상환방법</div>
												<div class="text">{{getrpyMetcNm(cdLnrpyMethc)}}</div>
											</div>
										</div>
									</div>
								</div>
							</div> 
						</div>  
					</div>
				</div>
			</div>
			<div class="com_inner">           
            </div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>
<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import CmmProgress from '@/components/CmmProgress.vue'
import {dateFormat} from '@/utils/date'

export default {
    name : "ASLN2006",
    data: () => {
        return {
            mydtCusno       : "",           // 마이데이터고객번호
            loanType        : "",           // 대출타입
            infOfrmnOrgC    : "",           // 정보제공자기관코드
            infOfrmnOrgCNm  : "",           // 정보제공자기관코드명
            lnDt            : "",           // 대출일자
            dtLnSc          : 0,            // 일자대출회차
            trCseGblId      : "",           // 거래추적글로벌ID
            lschgDtm        : "",           // 최종변경일시
            lschgPgmnm      : "",           // 최종변경프로그램명
            rcnInqDtm       : "",           // 최근조회일시
            lnDtm           : "",           // 대출일시
            lnKdCntn        : "",           // 대출종류내용
            cdcoLnWrsnm     : "",           // 카드사대출상품명
            lnUsAm          : 0,            // 대출이용금액
            pmiIntrt        : 0,            // 약정이자율
            dueDt           : "",           // 만기일자
            ltrmlnBac       : 0,            // 장기대출잔액
            cdLnrpyMethc    : "",           // 카드대출상환방법코드
            maxAmIntAm      : 0,            // 상한금액이자금액
        }	
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)
        dateFormat()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param) {
            this.mydtCusno      = param.mydtCusno || ''
            this.loanType       = param.loanType || ''
            this.infOfrmnOrgC   = param.infOfrmnOrgC || ''
            this.lnDt           = param.lnDt || ''
            this.dtLnSc         = param.dtLnSc || ''
            this.getData();
        },
        getData() {
            const config = {
                url : '/as/ln/09r01',
                data : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : this.infOfrmnOrgC,
                    lnDt            : this.lnDt,
                    dtLnSc          : this.dtLnSc,
                }
            }
            apiService.call(config).then(response => {
                this.mydtCusno      = response.mydtCusno || ''
                this.infOfrmnOrgC   = response.infOfrmnOrgC || ''
                this.infOfrmnOrgCNm = response.infOfrmnOrgCNm || ''
                this.lnDt           = response.lnDt || ''
                this.dtLnSc         = response.dtLnSc || 0
                this.trCseGblId     = response.trCseGblId || ''
                this.lschgDtm       = response.lschgDtm || ''
                this.lschgPgmnm     = response.lschgPgmnm || ''
                this.rcnInqDtm      = response.rcnInqDtm || ''
                this.lnDtm          = response.lnDtm || ''
                this.lnKdCntn       = response.lnKdCntn || ''
                this.cdcoLnWrsnm    = response.cdcoLnWrsnm || ''
                this.lnUsAm         = response.lnUsAm || 0
                this.pmiIntrt       = response.pmiIntrt || 0
                this.dueDt          = response.dueDt || ''
                this.ltrmlnBac      = response.ltrmlnBac || 0
                this.cdLnrpyMethc   = response.cdLnrpyMethc || ''
                this.maxAmIntAm     = response.maxAmIntAm || 0

                this.callJQueryFncExcute()
            });
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
    },
    components : {
        CmmProgress
    },
}
</script>