<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 손익분석 > 영농자금대출 내역 > 영농자금대출 상세
* @ 페이지설명 : 영농자금대출 상세
* @ 파일명     : src/views/page/SZ/FP/SZFP2108/SZFP2108.vue
* @ 작성자     : CS523299
* @ 작성일     : 2021-08-27
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-08-27			  CS523299			    최초작성
*************************************************************************/
-->
<template>
   <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>영농자금대출 상세</h1>
		</div>
		<div class="popup_content com_bg_type00 com_no_bottom">
            <div class="com_inner">
				<div class="top_info_box_wrap">
					<div class="top_info_box type02 new_top_box fixBG">
						<div class="box_head">
							<div class="info">
								<div class="ico">
									<i class="bank_01"><span class="blind">{{infOfrmnOrgC}}</span></i><!-- -->
								</div>
								<div class="title">
									{{acWrsnm}}
									<div class="num">{{mydtAcno}}</div>
								</div>
							</div>
							<!-- <button class="refresh new_refresh" @click.prevent="fn_refresh">
								<span class="refresh_ico"><span class="blind">새로고침</span></span>
							</button> -->
						</div>
						<div class="bill mt20 p-l align">
							<span class="num counter" :data-count="lnAcBac">{{lnAcBac | numberFilter}}</span><span class="text">원</span>
						</div>
						<div class="text mt6 p-l">대출금리 {{aplItr}}%</div>
						<div class="new_box_footer mt25 p0side pb0">
							<div class="progressBar">
								<!-- <div class="bar" style="width:40%">    -->
								<div class="bar" :style="setProgressBar">
									<div class="popover_wrap">
										<span class="popover">
											D-{{rmnDd | numberFilter }}
											<span class="arrow"></span>
										</span>
									</div>
								</div>
							</div>
							<div class="date">
								<div class="st">신규 {{lnDt | dateFilter('YYYY.MM.DD')}}</div>
								<div class="ed">만기 {{dueDt | dateFilter('YYYY.MM.DD')}}</div>
							</div>
						</div>
						<div class="box_toggle_wrap">
							<div class="box_toggle">
								<div class="toggle-box ">
									<div data-ui-toggle="box" class="active force">									
										<div class="view-box m0">
											<div class="info">
												<div class="title">대출금액</div>
												<div class="num">{{acLnOgnAm | numberFilter}}원</div>
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
				<template v-if="acTrCn > 0">
					<ul class="list_type_02 list_subtype02">
						<li v-for="(acTrListIteml, idx) in addAcTrList" :key="idx">
							<dl class="list_depth2">
								<dt>
									<div>
										<em>{{acTrListIteml.lnAcTrTpcNm}}</em>
									</div>
									<span>{{acTrListIteml.trDt | dateFilter('YYYY.MM.DD')}}</span>
								</dt>
								<dd>
									<span class="com_price">
										<em class="num">{{acTrListIteml.lnAcTram | numberFilter}}</em><em class="unit">원</em>
									</span>
									<span class="com_price">
										<span>이자</span><span class="num">{{acTrListIteml.tramIntAm  | numberFilter}}</span><em class="unit">원</em>
									</span>
								</dd>
							</dl>
							<!-- <div class="listbox_area">
								<div class="listbox_type01">
									<p>정상이자</p>
									<dl>
										<dt>이자계산기간</dt>
										<dd>2021.05.05~2021.05.21</dd>
									</dl>
									<dl>
										<dt>적용이율</dt>
										<dd>2.15%</dd>
									</dl>
									<dl>
										<dt>납입금액</dt>
										<dd>123,456,789<em>원</em></dd>
									</dl>
								</div>
								<div class="listbox_type01">
									<p>지연이자</p>
									<dl>
										<dt>이자계산기간</dt>
										<dd>2021.05.05~2021.05.21</dd>
									</dl>
									<dl>
										<dt>적용이율</dt>
										<dd>2.15%</dd>
									</dl>
									<dl>
										<dt>납입금액</dt>
										<dd>123,456,789<em>원</em></dd>
									</dl>
								</div>
								<div class="listbox_type01">
									<p>잔액연체이자</p>
									<dl>
										<dt>이자계산기간</dt>
										<dd>2021.05.05~2021.05.21</dd>
									</dl>
									<dl>
										<dt>적용이율</dt>
										<dd>2.15%</dd>
									</dl>
									<dl>
										<dt>납입금액</dt>
										<dd>123,456,789<em>원</em></dd>
									</dl>
								</div>
								<div class="listbox_type01">
									<p>기타</p>
									<dl>
										<dt>이자계산기간</dt>
										<dd>2021.05.05~2021.05.21</dd>
									</dl>
									<dl>
										<dt>적용이율</dt>
										<dd>2.15%</dd>
									</dl>
									<dl>
										<dt>납입금액</dt>
										<dd>123,456,789<em>원</em></dd>
									</dl>
								</div>
							</div> -->
							<!-- 환출이자 S -->
							<!-- <dl class="list_depth2">
								<dt>
									<div>
										<em>환출이자</em>
									</div>
									<span>2021.04.30</span>
								</dt>
								<dd>
									<span class="com_price">
										<em class="num">56,380</em><em class="unit">원</em>
									</span>
								</dd>
							</dl> -->
							<!-- 환출이자 E -->
						</li>
						<!-- <li> -->
							<!-- 환출이자 S -->
							<!-- <dl class="list_depth2">
								<dt>
									<div>
										<em>환출이자</em>
									</div>
									<span>2021.04.30</span>
								</dt>
								<dd>
									<span class="com_price">
										<em class="num">56,380</em><em class="unit">원</em>
									</span>
									<span class="com_price">
										<span>이자</span><span class="num">56,380</span><em class="unit">원</em>
									</span>
								</dd>
							</dl> -->
							<!-- 환출이자 E -->
							
							<!-- <div class="listbox_area">
								<div class="listbox_type01">
									<p>정상이자</p>
									<dl>
										<dt>이자계산기간</dt>
										<dd>2021.05.05~2021.05.21</dd>
									</dl>
									<dl>
										<dt>적용이율</dt>
										<dd>2.15%</dd>
									</dl>
									<dl>
										<dt>납입금액</dt>
										<dd>123,456,789<em>원</em></dd>
									</dl>
								</div>
								<div class="listbox_type01">
									<p>지연이자</p>
									<dl>
										<dt>이자계산기간</dt>
										<dd>2021.05.05~2021.05.21</dd>
									</dl>
									<dl>
										<dt>적용이율</dt>
										<dd>2.15%</dd>
									</dl>
									<dl>
										<dt>납입금액</dt>
										<dd>123,456,789<em>원</em></dd>
									</dl>
								</div>
								<div class="listbox_type01">
									<p>잔액연체이자</p>
									<dl>
										<dt>이자계산기간</dt>
										<dd>2021.05.05~2021.05.21</dd>
									</dl>
									<dl>
										<dt>적용이율</dt>
										<dd>2.15%</dd>
									</dl>
									<dl>
										<dt>납입금액</dt>
										<dd>123,456,789<em>원</em></dd>
									</dl>
								</div>
								<div class="listbox_type01">
									<p>기타</p>
									<dl>
										<dt>이자계산기간</dt>
										<dd>2021.05.05~2021.05.21</dd>
									</dl>
									<dl>
										<dt>적용이율</dt>
										<dd>2.15%</dd>
									</dl>
									<dl>
										<dt>납입금액</dt>
										<dd>123,456,789<em>원</em></dd>
									</dl>
								</div>
							</div> -->
						<!-- </li> -->
					</ul>
					<div class="com_inner">
						<!-- 20211028_서비스 수정 전 --> 
						<div class="com_btn_area02"><a href="javascript:void(0);" role="button" @click="fn_getList2NextPage()" class="com_btn_more" v-show="lsPageYn === '0'"><span>더보기</span></a></div>
					</div>
				</template>
				<template v-else>
					<div class="no_data_box">
						<div class="no_data_list">
							<p>조회된 정보가 없습니다.</p>
						</div>
					</div>
				</template>
			</div>
		</div>
		<a href="javascript:void(0);" @click.prevent="close()" class="btn_close"  role="button"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'

export default {
    name : "SZFP2108",
    data: () => {
        return {
			// 초기화(영농자금대출상세조회)
			mydtCusno       : "",  	// 마이데이터고객번호
			infOfrmnOrgC	: "",  	// 정보제공자기관코드
			mydtAcno		: "",  	// 마이데이터계좌번호
			mydtScNo		: "",  	// 마이데이터회차번호
			acWrsnm			: "",  	// 계좌상품명    
			lnAcBac			: "",  	// 대출계좌잔액   
			acLnOgnAm		: "",  	// 계좌대출원금액  
			aplItr			: "",  	// 적용금리      
			lnDt			: "",  	// 대출일자      
			dueDt			: "",  	// 만기일자      
			lnDd			: "0",  // 대출일수      
			psgDd			: "0",  // 경과일수      
			rmnDd			: "0",  // 남은일수   

			// 초기화(영농자금대출거래내역조회)	
			// lsPageYn		: "1",	// 최종페이지여부 1: 최종페이지임(이후 거래내역 없음), 0: (20211028_서비스 수정 전)
			lsPageYn		: "0",	// 최종페이지여부 1: 최종페이지임(이후 거래내역 없음), 0: (서비스 수정 결과 확인 후 배포)
			acTrCn			: "",	// 계좌거래수
			acTrList		: [],	// 계좌거래목록
			setProgressBar	: {}, 	// width Per style
			inParams		: {},
			pageNum			: 1,
			addAcTrList		: []	// 매번 조회 목록을 누적 시킴

        }
    },
    computed: {
        
    },
    mixins: [
		popupMixin,
		commonMixin
    ],
    mounted() {
		this.initComponent(this.params)
		this.inParams = this.params
		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
		initComponent(param = {}) {
			// console.log("param=", param)
			this.infOfrmnOrgC	= param.infOfrmnOrgC,	// 정보제공자기관코드
			this.mydtAcno		= param.mydtAcno,		// 마이데이터계좌번호
			this.mydtScNo		= param.mydtScNo,		// 마이데이터회차번호
			this.getData()
		},
		getData(){
			this.fn_getClMgglnDtlList();	// 영농자금대출상세조회
			this.fn_getClMgglnDtlList2();	// 영농자금대출거래내역조회
		},
		// 영농자금대출상세조회
		fn_getClMgglnDtlList(){

			const config = {	
				url: '/sz/fp/08r01',
				data: { // 파라미터
					"mydtCusno" 	: this.getUserInfo("mydtCusno"),
					"infOfrmnOrgC" 	: this.infOfrmnOrgC,				// 정보제공자기관코드
					"mydtAcno" 		: this.mydtAcno,					// 마이데이터계좌번호
					"mydtScNo" 		: this.mydtScNo						// 마이데이터회차번호
				}
			}

			apiService.call(config).then(response => {

				this.mydtCusno      =  response.mydtCusno      	// 마이데이터고객번호   
				this.infOfrmnOrgC   =  response.infOfrmnOrgC   	// 정보제공자기관코드
				this.mydtAcno	    =  response.mydtAcno	   	// 마이데이터계좌번호
				this.mydtScNo	    =  response.mydtScNo	   	// 마이데이터회차번호
				this.acWrsnm	    =  response.acWrsnm	   		// 계좌상품명    
				this.lnAcBac	    =  response.lnAcBac	   		// 대출계좌잔액   
				this.acLnOgnAm	    =  response.acLnOgnAm	   	// 계좌대출원금액  
				this.aplItr	    	=  response.aplItr	   		// 적용금리      
				this.lnDt	    	=  response.lnDt	   		// 대출일자      
				this.dueDt	    	=  response.dueDt	   		// 만기일자      
				this.lnDd	    	=  response.lnDd	|| "0"	// 대출일수      
				this.psgDd	    	=  response.psgDd	|| "0"  // 경과일수      
				this.rmnDd	    	=  response.rmnDd	|| "0"  // 남은일수   

				// 만기일 바차트
				let widthCal
				if(this.lnDd != null && this.lnDd != "0" && this.psgDd != null && this.psgDd != "0") {
					widthCal = Math.round((Number(this.psgDd) / Number(this.lnDd)) * 100, 1)
					this.setProgressBar = {'width':widthCal + '%'}
				} else {
					this.setProgressBar = {'width':'0%'}
				}

			})
		},
		// 영농자금대출거래내역조회
		fn_getClMgglnDtlList2(){

			const config = {	
				url: '/sz/fp/08r02',
				data: { // 파라미터
					"mydtCusno" 	: this.getUserInfo("mydtCusno"),
					"infOfrmnOrgC" 	: this.infOfrmnOrgC,				// 정보제공자기관코드
					"mydtAcno" 		: this.mydtAcno,					// 마이데이터계좌번호
					"mydtScNo" 		: this.mydtScNo,					// 마이데이터회차번호
					"pageNum" 		: this.pageNum						// 페이지번호
				}
			}

			apiService.call(config).then(response => {

				this.lsPageYn	= response.lsPageYn	// 최종페이지여부 
				this.acTrCn		= response.acTrCn	// 계좌거래수
				this.acTrList	= response.acTrList	// 계좌거래목록  

				let tacTrList 	= response.acTrList || []
				if(this.addAcTrList.length > 0) {
					for(let i=0; i< tacTrList.length; i++) {
						this.addAcTrList.push(tacTrList[i])
					}
				} else {
					this.addAcTrList = tacTrList
				}

			})
		},
		// 영농자금대출거래내역조회(다음 페이지)
		fn_getList2NextPage(){
			this.pageNum = this.pageNum + 1
			this.fn_getClMgglnDtlList2()
		},
		// 새로 고침
		fn_refresh(){
			this.initComponent(this.inParams)
		}
	}
}
</script>