<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 대출 > 장기대출
* @ 페이지설명 : 나의자산 > 부채 > 대출 > 장기대출상세
* @ 파일명     : src/views/page/AS/CD/ASCD2008/ASCD2008.vue
* @ 작성자     : 채찬영
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              채찬영                 최초작성
* 2021-05-13              CS515937              수정(장기대출상세로 변경)
* 2022-06-27              CS533045              AS/LN/ASLN1109/ASLN1109.vue -> AS/CD/ASCD2008/ASCD2008.vue 변경
*************************************************************************/
-->
<template>	
	<!-- full popup S -->
	<div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>장기신용대출</h1>
		</div>	
		<div class="popup_content com_space_bottom com_bg_type00">
				
			<div class="asset_info_box">
				<div class="com_inner long_term_info">
					<div class="asset_info_wrap">
						<div class="asset_info">
							<dl>
								<dt>{{infOfrmnOrgCNm}}<span class="sub_name">{{cdcoLnWrsnm}}</span></dt>
								<dd>
									<span class="account_num">{{cdlnLnNo}}</span>
								</dd>
							</dl>
							<div class="bank_icon">
                                <i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgCNm}}</span></i>
							</div>
						</div>

						<div class="asset_price_wrap">
							<div class="amount">이자율 <span class="pointColor green">{{pmiIntrt | numberFilter('0,0.00', {precision: 2})}}%</span></div>
							<div class="asset_price">
								<span class="num counter">{{ltrmLnBac | numberFilter}}</span>원
							</div>
						</div>
                        <!-- progressBar -->
                        <cmm-progress :startDate="lnDt" :endDate="dueDt"/>
                        <!-- //progressBar -->
					</div>

					<div class="asset_detail">
						<ul class="list_type_2023">
							<li>
								<!-- <dl>
									<dt>대출번호</dt>
									<dd class="num">{{cdlnLnNo}}</dd>
								</dl>
								<dl>
									<dt>대출일시</dt>
									<dd class="num">{{lnDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</dd>
								</dl>
								<dl>
									<dt>대출회차</dt>
									<dd>{{dtLnSc}}회차</dd>
								</dl> -->
								<dl>
									<dt>대출종류</dt>
									<dd>{{lnKdCntn}}</dd>
								</dl>	
								<!-- <dl>
									<dt>상품명</dt>
									<dd>{{cdcoLnWrsnm}}</dd>
								</dl>	 -->
								<dl>
									<dt>이용금액</dt>
									<dd><em class="num">{{lnUsAm | numberFilter}}</em>원</dd>
								</dl>	
								<dl>
									<dt>이자율</dt>
									<dd><em class="num">{{pmiIntrt}}</em>%</dd>
								</dl>	
								<!-- <dl>
									<dt>만기일</dt>
									<dd class="num">{{dueDt | dateFilter('YYYY.MM.DD')}}</dd>
								</dl>
								<dl>
									<dt>장기대출잔액</dt>
									<dd><em class="num">{{ltrmLnBac | numberFilter}}</em>원</dd>
								</dl>	 -->
								<dl>
									<dt>상환방법</dt>
									<dd>{{rpyMetcNm}}</dd>
								</dl>	
								<dl>
									<dt>총 상환 원금</dt>
									<dd><em class="num">{{totTramOgnAm | numberFilter}}</em>원</dd>
								</dl>	
								<dl>
									<dt>총 상환 이자</dt>
									<dd><em class="num">{{totTramIntAm | numberFilter}}</em>원</dd>
								</dl>	
								<dl>
									<dt>상환기관</dt>
									<dd>{{lnrpyOrgCNm}}</dd>
								</dl>	
								<dl>
									<dt>상환계좌번호</dt>
									<dd class="num">{{lnrpyAcno}}</dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>

				<button type="button" class="btn_view_detail">더보기</button><!-- 230720 상세보기에서 더보기로 수정 -->
			</div>
            <div class="com_inner" v-if="trList.length > 0">
                    <div class="asset_more_list">
                        <ul>
                            <li v-for="(item, index) in trList" :key="index">
                                <dl class="breakdown">
                                    <dt>{{item.ltrmLnTrTpcNm}}</dt>
                                    <dd><em class="num">{{item.ltrmLnTram | numberFilter}}</em>원</dd>
                                </dl>
                                <dl>
                                    <dt class="num">{{item.mydtTrDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</dt>
                                </dl>
                            </li>
                        </ul>
                    </div>
                <a href="javascript:void(0);" class="com_btn_more"  @click.prevent="showMoreList()" :style="noMoreList"><span>더보기</span></a>
            </div>
			<!-- 조회내역이 없을경우 S -->
            <!-- <div class="no_data_box no_data_box01 grayExclamationType" v-else>
                <div class="no_data_list">
                    <p class="txt_sub">조회된 정보가 없습니다.</p>
                </div>
            </div> -->
			<!--// 조회내역이 없을경우 E -->
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
   
</template>
<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import CmmProgress from '@/components/CmmProgressV2.vue'
import {dateFormat} from '@/utils/date'
import _ from 'lodash'

export default {
    name : "ASCD2008",
    data: () => {
        return {
            loanType        : "",           // 대출타입
            mydtCusno       : "",           // 마이데이터고객번호
            infOfrmnOrgC    : "",           // 정보제공자기관코드
            infOfrmnOrgCNm  : "",           // 정보제공자기관코드명
            cdlnLnNo        : "",           // 카드론대출번호 
            lnDt            : "",           // 대출일자
            dtLnSc          : 0,            // 일자대출회차
            trDt            : "",           // 거래일자
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
            ltrmLnBac       : 0,            // 장기대출잔액
            rpyMetc         : "",           // 상환방식코드 
            rpyMetcNm       : "",           // 상환방식코드명
            maxAmIntAm      : 0,            // 상한금액이자금액
            lnrpyOrgC       : "",           // 대출상환기관코드 
            lnrpyOrgCNm     : "",           // 대출상환기관코드명
            lnrpyAcno       : "",           // 대출상환계좌번호 
            
            totTramOgnAm    : 0,            // 총거래금액원금액
            totTramIntAm    : 0,            // 총거래금액이자금액

            
            cdLtrmLnTr      : [],          // 장기대출거래내역
            
            trList          : [],           //최종결과 리스트
            tranList        : [],           // 임시 리스트

            pageNo          : 0,            // 페이지번호
            isPageYn        : "",           // 다음페이지존재여부 '1':존재 , '0':미존재            
        }	
    },
    computed : {
        noMoreList() {
            return (this.isPageYn == 'Y')?"":"display : none"
        },
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    created() {
        //초기데이타 세팅    
        this.pageNo  = 1   // 페이지번호
    },      
    mounted() {
        this.initComponent(this.params)
        dateFormat()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param) {
            console.log("param ==========================>")
            console.log(param)
            this.mydtCusno      = param.mydtCusno || ''
            this.loanType       = param.loanType || ''
            this.infOfrmnOrgC   = param.infOfrmnOrgC || ''
            this.infOfrmnOrgCNm = param.infOfrmnOrgCNm || ''
            this.lnDsc          = param.lnDsc || ''
            this.cdlnLnNo       = param.cdlnLnNo || ''
            this.lnDt           = param.lnDt || ''
            this.dtLnSc         = param.dtLnSc || ''
            
            this.getData();
        },
        getData() {
            const config = {
                url : '/as/cd/08r01',
                data : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : this.infOfrmnOrgC,
                    cdlnLnNo        : this.cdlnLnNo,
                    lnDt            : this.lnDt,
                    dtLnSc          : this.dtLnSc,
                }
            }
            console.log("/as/cd/08r01 config====================================>")
            console.log(config)
            apiService.call(config).then(response => {
                console.log("==========================/as/cd/08r01 response==========================")
                console.log(response)
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
                this.cdLnrpyMethc   = response.cdLnrpyMethc || ''
                this.ltrmLnBac      = response.ltrmLnBac || 0
                this.rpyMetcNm      = response.rpyMetcNm || ''
                this.maxAmIntAm     = response.maxAmIntAm || 0
                this.lnrpyOrgCNm    = response.lnrpyOrgCNm || ''
                this.lnrpyAcno      = response.lnrpyAcno || ''

                this.totTramOgnAm   = response.totTramOgnAm || 0,            // 총거래금액원금액
                this.totTramIntAm   = response.totTramIntAm || 0,            // 총거래금액이자금액
                
                this.fn_getDetailList()

                //this.callJQueryFncExcute()
                
				this.initEvent()
            });
        },


        /*
         * 계좌 상세내역조회
         */
        fn_getDetailList() {
            const config = {
				url : '/as/cd/08r02',
                data: {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : this.infOfrmnOrgC,
                    cdlnLnNo        : this.cdlnLnNo,
                    lnDt            : this.lnDt,
                    dtLnSc          : this.dtLnSc,
                    pageNo          : this.pageNo,    //페이지번호
                }
              }
                apiService.call(config).then(response => {
                    console.log(response)
                    this.respDtlInfo = response
                    this.isPageYn    = this.respDtlInfo.isPageYn || "N"

                    this.trList = this.fn_generateList(this.respDtlInfo.cdLtrmLnTr || [])
                })
         },

        // 더보기
        showMoreList() {
            this.pageNo = this.pageNo + 1
            this.fn_getDetailList()
        },

        /*
        * 결과리스트 가공.
        */
        fn_generateList(objList) {
            for(let i=0; i < objList.length; i++) {
                this.tranList.push(objList[i])
            }

            return _.orderBy(this.tranList, 'sqno', 'desc')
        },        

        // // 상환방식
        // getrpyMetcNm(cVal) {
        //     let cmmLnList = this.getCodeList("RPY_METC")
        //     for(var i=0; i<cmmLnList.length; i++) {
        //         if(cVal === cmmLnList[i].comnCVal) {
        //             return cmmLnList[i].comnCExpl
        //         }
        //     }
        // },

		initEvent() {
			$('.btn_view_detail').on('click',function(){
				$(this).siblings().children('.asset_detail').toggleClass('open');
				$(this).toggleClass('close');
				if($('.asset_detail').hasClass('open')) {
					$('.asset_detail').slideDown('slow');
					$('.btn_view_detail').text('접기');//230720 상세접기에서 접기로 수정
				}else {
					$('.asset_detail').slideUp('slow');
					$('.btn_view_detail').text('더보기');//230720 상세보기에서 더보기로 수정
				}
			});
		}        
    },
    components : {
        CmmProgress
    },
}
</script>