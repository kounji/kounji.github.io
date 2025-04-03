<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 대출 > P2P 대출
* @ 페이지설명 : 나의자산 > 부채 > 대출 > P2P 대출 상세
* @ 파일명     : src/views/page/AS/LN/ASLN2007/ASLN2007.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-10-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533437              ASLN1118 -> ASLN2007
* 2023-09-19              CS533031         As-Is → To-Be Css 변경
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup mydata2023" id="full_popup_01"><!-- mydata2023 추가 -->
		<div class="popup_header">    
			<h1>P2P대출 상세</h1>
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
									{{p2PWrsTpcNm}}
									<div class="num">{{lnCtrNo}}</div>
								</div>
							</div>

						</div>
						<div class="text">대출금리 <em>{{aplItr | numberFilter('0,0.00', {precision: 2})}}%</em></div>
						<div class="bill">
							<span class="num counter" data-count="p2PLnBac">{{p2PLnBac | numberFilter}}</span><span class="text fs25">원</span>
						</div>
						<cmm-progress :startDate="lnDt" :endDate="dueDt" />
						<div class="box_toggle_wrap">
							<div class="box_toggle">
								<div class="toggle-box">
									<div data-ui-toggle="box" >									
										<div class="view-box">
											
											<div class="info">
												<div class="title">대출금액</div>
												<div class="num">{{p2PLnCtrAm | numberFilter}}원</div>
											</div>
											<!-- <div class="info">
												<div class="title">총 상환액</div>
												<div class="num">{{p2PLnCtrAm - p2PLnBac | numberFilter}}원</div>
											</div> -->
											<div class="info">
												<div class="title">다음 상환 예정금액</div>
												<div class="num">{{plaPrn + plaInt | numberFilter}}원</div>
											</div>
											<!-- 유효한 날짜 형식이 아니면 표시하지 않음(미회신 되는 경우 포함) -->
											<div class="info" v-if="fn_isValidDate">
												<div class="title">다음 상환일</div>
												<div class="num">{{nxRpyDt | dateFilter('YYYY년 M월 D일')}}</div>
											</div>
											<div class="info">
												<div class="title">상환방식</div>
												<div class="text">{{getrpyMetcNm(rpyMetc)}}</div>
											</div>
											<div class="info">
												<div class="title">부동산담보비율(LTV)</div>
												<div class="num">{{rlestMggLtvRto | numberFilter('0,0.0', {precision: 1})}}%</div>
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

			<div class="com_inner" v-if="loanP2PTrbrkList.length > 0">
				<ul class="list_type_02 list_subtype02">
					<li v-for="(item, index) in loanP2PTrbrkList" :key="index">
						<div class="list_type_box" data-ui-toggle="box">
							<!-- 만기일시상환은 토글박스(거래내역) 표시하지 않음 -->
							<button type="button" class="view_btn" :class="fn_noList(index)" aria-expanded="false">
								<dl>
									<dt>
										<!-- 만기일시상환의 경우 상환, 그외의 경우 상환유형코드에 따른 표시 -->
										<div>
											<em v-if="rpyMetc == '01'">상환</em>
											<em v-else>{{getRpyTpcNm(index)}}</em>
										</div>
										<span v-if="item.rpyDtm.length > 8">{{item.rpyDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span>
                                        <span v-else>{{item.rpyDtm | dateFilter('YYYY.MM.DD')}}</span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">{{item.p2PRpyAm | numberFilter}}</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
								<em class="open">열기</em><em class="close">닫기</em>
							</button>
						</div>
						<div class="listbox_area" v-if="rpyMetc !== '01'">
							<div class="listbox_type01 listbox_etc">
								<dl>
									<dt>원금</dt>
									<dd>
										<span class="com_price">
											<em class="num">{{item.rpyAmOfPrn | numberFilter}}</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
								<dl>
									<dt>이자</dt>
									<dd>
										<span class="com_price">
											<em class="num">{{item.rpyAmOfInt | numberFilter}}</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</div>
						</div>
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
		<a href="javascript:void(0);" class="btn_close" v-on:click="close()"><span class="blind">팝업닫기</span></a>	
	</div>
	<!--// full popup E -->
</template>

<script>
    import apiService from '@/service/apiService'
    import popupMixin from '@/common/mixins/popupMixin'
	import commonMixin from '@/common/mixins/commonMixin'
	import CmmProgress from '@/components/CmmProgress.vue'
    import {isValidDate} from '@/utils/date'

    export default {            
        name : "ASLN2007",
        data: () => {
            return {
                // P2P 대출 상세
                mydtCusno		: "",		// 마이데이터고객번호
				infOfrmnOrgC	: "",		// 정보제공자기관코드
				infOfrmnOrgCNm	: "",		// 정보제공자기관코드명
				lnCtrNo			: "",		// 대출계약번호
				lnDt			: "",		// 대출일자
				dueDt			: "",		// 만기일자
				aplItr			: 0,		// 적용금리
				rpyMetc			: "",		// 상환방식코드
				rlestMggLtvRto	: 0,		// 부동산담보LTV비율
				p2PLnBac		: 0,		// P2P대출잔액
				nxRpySc			: 0,		// 다음상환회차
				nxRpyDt			: "",		// 다음상환일자
				plaPrn			: 0,		// 예정원금
				plaInt			: 0,		// 예정이자
				pageNo			: 1,		// 페이지번호
				nxDataYn        : "",       // 다음데이터여부
				p2PLnCtrAm      : 0,		// P2P대출계약금액
				p2PWrsTpcNm		: "",		// P2P상품유형코드명

				loanP2PTrbrkList	: [],		// 채권거래내역

            }	
        },
        computed : {
            noMoreList() {
                return (this.nxDataYn == 'Y')?"":"display : none"
            },
            fn_isValidDate() {
                return isValidDate(this.nxRpyDt)
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        mounted() {
            this.initComponent(this.params)
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {
            initComponent(param) {
                this.mydtCusno      = param.mydtCusno || ''
                this.infOfrmnOrgC   = param.infOfrmnOrgC || ''
				this.lnCtrNo        = param.lnCtrNo || ''
				this.p2PLnCtrAm     = param.p2PLnCtrAm || 0
				this.lnDt       	= param.lnDt || ''
				this.p2PWrsTpcNm	= param.p2PWrsTpcNm || ''

                this.getData();
            },
            getData() {
                // 실제 구현
                const config = {
                    url : '/as/ln/18r01',
                    data : {
                        mydtCusno       : this.mydtCusno,
                        infOfrmnOrgC    : this.infOfrmnOrgC,
                        lnCtrNo         : this.lnCtrNo,
                    }
                }
                apiService.call(config).then(response => {
                    this.mydtCusno      = response.mydtCusno || ''
                    this.infOfrmnOrgC   = response.infOfrmnOrgC || ''
                    this.infOfrmnOrgCNm = response.infOfrmnOrgCNm || ''
					this.lnCtrNo        = response.lnCtrNo || ''
					this.trCseGblId		= response.trCseGblId || ''
					this.tmsRqmYn		= response.tmsRqmYn || ''
					this.p2PWrsTpc		= response.p2PWrsTpc || ''
					this.p2PWrsTpcNm	= response.p2PWrsTpcNm || ''
					this.p2PLnCtrAm		= response.p2PLnCtrAm || 0
					this.lnDt			= response.lnDt || ''
                    this.dueDt          = response.dueDt || ''
                    this.aplItr         = response.aplItr || 0
                    this.rpyMetc        = response.rpyMetc || ''
                    this.rlestMggLtvRto = response.rlestMggLtvRto || 0
                    this.p2PLnBac   	= response.p2PLnBac || 0
                    this.nxRpySc      	= response.nxRpySc || 0
                    this.nxRpyDt        = response.nxRpyDt || ''
                    this.plaPrn        	= response.plaPrn || 0
                    this.plaInt      	= response.plaInt || 0

					this.getTransaction();   // 거래내역 조회
                });
            },

            // P2P대출 거래내역 조회
            getTransaction() {
                const config = {
                    url : "/as/ln/18r02",
                    data : {
                        mydtCusno     : this.mydtCusno,
                        infOfrmnOrgC  : this.infOfrmnOrgC,
                        lnCtrNo       : this.lnCtrNo,
                        pageNo        : this.pageNo,
                    }
                }
                apiService.call(config).then(response => {
                    this.mydtCusno      = response.mydtCusno || ''
					this.infOfrmnOrgC   = response.infOfrmnOrgC || ''
                    this.nxDataYn       = response.nxDataYn || 'N'
                    this.loanP2PTrbrkList  = response.loanP2PTrbrkList || []

                    this.callJQueryFncExcute()
                });
            },   

            fn_noList(index) {
				return this.rpyMetc == "01"?"no_list":(this.loanP2PTrbrkList[index].p2PRpyAm > 0?"":"no_list")
			},
			
			// 상환유형에 따른 문구
			getRpyTpcNm(index) {
				let rpyTpcNm = ""
				switch(this.loanP2PTrbrkList[index].p2PRpyTpc) {
					case '01' :
						rpyTpcNm = "상환(" + this.loanP2PTrbrkList[index].p2PRpySc + "회차)"
						break
					case '02' :
						rpyTpcNm = "상환(조기)"
						break
					case '03' :
						rpyTpcNm = "상환(연체)"
						break
					default :
						break
				}
				return rpyTpcNm
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
                    url : '/as/ln/18r02',
                    data : {
                        mydtCusno     : this.mydtCusno,
                        infOfrmnOrgC  : this.infOfrmnOrgC,
                        lnCtrNo       : this.lnCtrNo,
                        pageNo        : this.pageNo,
                    }
                }

                apiService.call(config).then(response => {
                    this.nxDataYn	= response.nxDataYn || ''
                    for(let i=0;i<response.loanP2PTrbrkList.length;i++) {
                        this.loanP2PTrbrkList.push(response.loanP2PTrbrkList[i])
                    }
                })
            },
		},
		
		components : {
			CmmProgress
		},
    }
</script>