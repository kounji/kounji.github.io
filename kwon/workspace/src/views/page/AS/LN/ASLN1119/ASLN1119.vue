<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 대출 > 채권/대부
* @ 페이지설명 : 나의자산 > 부채 > 대출 > 채권/대부 상세
* @ 파일명     : src/views/page/AS/LN/ASLN1108/ASLN1108.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-10-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-10-12              CS515937              최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>인수채권/금전대부 상세</h1>
		</div>	
		<div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner">
				<div class="top_info_box_wrap">
					<div class="top_info_box type02 new_top_box fixBG hasdetail">
						<div class="box_head">
							<div class="info">
								<div class="ico">
									<i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgCNm}}</span></i><!-- -->
								</div>
								<div class="title">
									{{infOfrmnOrgCNm}}
									<div class="num">{{mydtBndNo}}</div>
								</div>
							</div>
						</div>
						<div class="p-l mt8">
							<span class="icon_mint">{{getBondOrgNm(bndOrgCfc)}}</span>
						</div>
						<div class="bill mt20 p-l align">
							<span class="num counter" data-count="5820000">{{bndLnBac | numberFilter}}</span><span class="text fs25">원</span>
						</div>
						<div class="text mt10 p-l">{{bndOrgCfc=='02'||bndOrgCfc=='04'?'최초대출일':'채권인수일'}} {{bndAcpDd | dateFilter('YYYY.MM.DD')}}</div>
						<div class="box_toggle_wrap">
							<div class="box_toggle">
								<div class="toggle-box">
									<div data-ui-toggle="box" >									
										<div class="view-box">
											<div class="info">
												<div class="title">대출금액</div>
												<div class="num">{{bndLnPrn | numberFilter}}원</div>
											</div>
											<div class="info">
												<div class="title">채무조정여부</div>
												<div class="text">{{dbajYn?'조정':'미조정'}}</div>
											</div>
											<!-- 미회신인 경우 미노출 -->
											<div class="info" v-if="firLnOrgnm">
												<div class="title">최초대출기관</div>
												<div class="text">{{firLnOrgnm}}</div>
											</div>
											<!-- 미회신인 경우 미노출, 채무조정여부가 false인 경우 필수 -->
											<div class="info" v-if="rpyMetc">
												<div class="title">상환방식</div>
												<div class="text">{{getrpyMetcNm(rpyMetc)}}</div>
											</div>
											<div class="info" v-if="rbfBndTkovOrgnm">
												<div class="title">직전채권인계기관</div>
												<div class="text">{{rbfBndTkovOrgnm}}</div>
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

			<template v-if="bondTrbrkList.length > 0">
				<div class="com_inner">
					<ul class="list_type_02">
						<li v-for="(item, index) in bondTrbrkList" :key="index">
							<dl>
								<dt>
									<div><em>상환</em></div>
									<span v-if="item.mydtTrDtm.length > 8">{{item.mydtTrDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span>
                                    <span v-else>{{item.mydtTrDtm | dateFilter('YYYY.MM.DD')}}</span>
								</dt>
								<dd>
									<span class="com_price">
										<em class="num">{{item.bndTram | numberFilter}}</em>
										<em class="unit">원</em>
									</span>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
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
</template>

<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name : "ASLN1119",
    data: () => {
        return {
			mydtCusno		: "",		// 마이데이터고객번호
			infOfrmnOrgC	: "",		// 정보제공자기관코드
			infOfrmnOrgCNm	: "",		// 정보제공자기관코드명
			mydtBndNo		: "",		// 마이데이터채권번호
			bndOrgCfc		: "",		// 채권기관분류코드
			bndAcpDd		: "",		// 채권인수일
			firLnOrgnm		: "",		// 최초대출기관명
			rbfBndTkovOrgnm : "",		// 직전채권인계기관명
			dbajYn			: "",		// 채무조정여부
			rpyMetc			: "",		// 상환방식코드
			bndLnBac		: 0,		// 채권대출잔액
			bndLnPrn		: 0,		// 채권대출원금
			pageNo			: 1,		// 페이지번호
			nxDataYn        : "",       // 다음데이터여부
			bondCn			: 0,		// 채권거래내역수

			bondTrbrkList   : [],		// 채권거래내역

        }
    },
    computed : {
        noMoreList() {
            return (this.nxDataYn == 'Y')?"":"display : none"
		},
		ugDtmStr() {
            return this.ugDtm.length > 8 ? 'YYYY.MM.DD HH:mm:ss' : 'YYYY.MM.DD'
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
			console.log('ASLN1119 params : ', param)
            this.mydtCusno      = param.mydtCusno
            this.infOfrmnOrgC   = param.infOfrmnOrgC
            this.mydtBndNo      = param.mydtBndNo
            this.getData()
        },

        getData() {
            const config = {
                url : '/as/ln/19r01',
                data : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : this.infOfrmnOrgC,
                    mydtBndNo       : this.mydtBndNo,
                }
            }
            apiService.call(config).then(response => {
                this.mydtCusno      	= response.mydtCusno || ''
                this.infOfrmnOrgC   	= response.infOfrmnOrgC || ''
                this.infOfrmnOrgCNm 	= response.infOfrmnOrgCNm || ''
                this.mydtBndNo      	= response.mydtBndNo || ''
                this.bndOrgCfc      	= response.bndOrgCfc || ''
                this.bndAcpDd    		= response.bndAcpDd || ''
                this.firLnOrgnm     	= response.firLnOrgnm || ''
                this.rbfBndTkovOrgnm    = response.rbfBndTkovOrgnm || ''
                this.dbajYn  			= response.dbajYn || ''
                this.rpyMetc        	= response.rpyMetc || ''
                this.bndLnBac 			= response.bndLnBac || 0
				this.bndLnPrn           = response.bndLnPrn || 0
				
				this.callJQueryFncExcute()
				
				this.getTransaction()		// 거래내역 조회
            });
		},
		
		// 거래내역 조회
		getTransaction() {
            const config = {
                url : "/as/ln/19r02",
                data : {
                    mydtCusno     : this.mydtCusno,
                    infOfrmnOrgC  : this.infOfrmnOrgC,
                    mydtBndNo     : this.mydtBndNo,
                    pageNo        : this.pageNo,
                }
            }
            apiService.call(config).then(response => {
                this.mydtCusno          = response.mydtCusno || ''
                this.infOfrmnOrgC       = response.infOfrmnOrgC || ''
                this.mydtBndNo          = response.mydtBndNo || ''
                this.epyLeasTrbrkCn     = response.epyLeasTrbrkCn || 0
                this.nxDataYn           = response.nxDataYn || 'N'
                this.bondTrbrkList   	= response.bondTrbrkList || []
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
		
		// 채권기관분류코드명
		getBondOrgNm(cVal) {
			let bondOrgNm = ""
			switch(cVal) {
				case '01' :
					bondOrgNm = "인수채권"
					break
				case '02' :
					bondOrgNm = "금전대부"
					break
				case '03' :
					bondOrgNm = "매입추심"
					break
				case '04' :
					bondOrgNm = "일반금융"
					break
				default :
					break
			}
			return bondOrgNm
		},

        // 더보기
        showMoreList() {
            this.pageNo += 1
            const config = {
                url : '/as/ln/19r02',
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
                for(let i=0;i<response.bondTrbrkList.length;i++) {
                    this.bondTrbrkList.push(response.bondTrbrkList[i])
                }
            })
        },
    },
}
</script>