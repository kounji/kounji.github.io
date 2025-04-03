<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 손익분석 > 영농자금대출 내역
* @ 페이지설명 : 영농자금대출 내역
* @ 파일명     : src/views/page/SZ/FP/SZFP2107/SZFP2107.vue
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
			<h1>영농자금대출 내역</h1>
		</div>
		<div class="popup_content com_bg_type00 com_no_bottom">
            <div class="com_inner com_line_type01">
                <div class="top_info_box">
					<p class="txt fs18 bold">
						총 대출금
					</p>
					<div class="bill">
						<span class="num counter" :data-count="lnAcBactt">{{lnAcBactt  | numberFilter}}</span>원
					</div>
				</div>
            </div>
			<!-- <div class="com_inner com_boxarea_type03"> -->
			<div class="com_inner"><!-- 20210901 한별 com_boxarea_type03클래스 삭제-->
				<div class="toggle_list_box3">
					<div data-ui-toggle="box" class="toggle_box_area active open">
						<button type="button" class="view_btn" aria-expanded="true">
							<div class="new_tit_area">
								<div class="tit">
									<span>신용대출</span>
									<span class="com_icon_num">{{crlnCn | numberFilter}}</span>
								</div>
								<div class="total_price">
									<em class="num">{{crlnAcBactt | numberFilter}}</em><em class="unit">원</em>
								</div>
							</div>
							<!-- <em class="open">열기</em>
							<em class="close">닫기</em> 20211108 한별 접근성 삭제 -->
						</button>
					</div>
					<!-- 20211021 한별 금액밑으로 내려갈때 list_type_etc 추가 -->
					<ul class="view_cont list_type_01 list_type_etc">
						<template v-if="crlnCn > 0">
							<li v-for="(crlnListItem, idx) in this.crlnList" :key="idx">
								<a href="javascript:void(0);" @click.prevent="fn_openAcLnDtlPopup(crlnListItem.infOfrmnOrgC, crlnListItem.mydtAcno, crlnListItem.mydtScNo)" role="button">
									<dl>
										<dt>
											<!-- 20210820 한별 수정 S -->
											<div>
												<i class="bank_01"><span class="blind">{{crlnListItem.infOfrmnOrgC}}</span></i>
												<em>{{crlnListItem.acWrsnm}}</em>
												<span>{{crlnListItem.mydtAcno}}</span>
											</div>
											<!--// 20210820 한별 수정 E -->
										</dt>
										<dd>
											<span class="com_price">
												<em class="num">{{crlnListItem.lnAcBac | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</a>
							</li>
						</template>
						<!-- 조회내역이 없을경우 -->
						<template v-else>
							<!-- 조회내역이 없을경우 S -->
							<div class="no_data_box">
								<div class="no_data_list">
									<p>조회된 정보가 없습니다.</p>
								</div>
							</div>
							<!--// 조회내역이 없을경우 E -->
						</template>
					</ul>
				</div>
				<div class="toggle_list_box3">
					<div data-ui-toggle="box" class="toggle_box_area active open">
						<button type="button" class="view_btn" aria-expanded="true">
							<div class="new_tit_area">
								<div class="tit">
									<span>담보대출</span>
									<span class="com_icon_num">{{mgglnCn | numberFilter}}</span>
								</div>
								<div class="total_price">
									<em class="num">{{mgglnAcBactt | numberFilter}}</em><em class="unit">원</em>
								</div>
							</div>
							<!-- <em class="open">열기</em>
							<em class="close">닫기</em> 20211108 한별 접근성 삭제 -->
						</button>
					</div>
					<!-- 20211021 한별 금액밑으로 내려갈때 list_type_etc 추가 -->
					<ul class="view_cont list_type_01 list_type_etc">
						<template v-if="mgglnCn > 0">
							<li v-for="(mgglnListItem, idx) in this.mgglnList" :key="idx">
								<a href="javascript:void(0);" @click.prevent="fn_openAcLnDtlPopup(mgglnListItem.infOfrmnOrgC, mgglnListItem.mydtAcno, mgglnListItem.mydtScNo)" role="button">
									<dl>
										<dt>
											<div>
												<i class="bank_01"><span class="blind">농협</span></i>
												<em>{{mgglnListItem.acWrsnm}}</em>
												<span>{{mgglnListItem.mydtAcno}}</span>
											</div>
										</dt>
										<dd>
											<span class="com_price">
												<em class="num">{{mgglnListItem.lnAcBac | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</a>
							</li>
						</template>
						<!-- 조회된 정보가 없을 겨우 -->
						<template v-else>
							<!-- 조회내역이 없을경우 S -->
							<div class="no_data_box">
								<div class="no_data_list">
									<p>조회된 정보가 없습니다.</p>
								</div>
							</div>
							<!--// 조회내역이 없을경우 E -->
						</template>
					</ul>
				</div>
			</div>  
		</div>
		<a href="javascript:void(0);" @click.prevent="close()" class="btn_close" role="button"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import SZFP2108 from '@/views/page/SZ/FP/SZFP2108/SZFP2108'

export default {
    name : "SZFP2107",
    data: () => {
        return {
			// 초기화
			mydtCusno	: "",	// 마이데이터고객번호
			lnAcBactt	: 0,	// 대출계좌잔액합계
			crlnAcBactt : 0,	// 신용대출계좌잔액합계
			mgglnAcBactt: 9, 	// 담보대출계좌잔액합계
			crlnCn		: 0,	// 신용대출건수
			crlnList	: [],	// 신용대출목록
			mgglnCn		: 0,	// 담보대출건수
			mgglnList	: [],	// 담보대출목록
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
		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
		initComponent(param = {}) {
            // console.log("param=", param)
            this.getData(param)
		},
		getData(param = {}){
            this.fn_getClMgglnList(param)
            this.inqDsc =  param.inqDsc
		},
		// 영농자금대출내역조회
        fn_getClMgglnList(param = {}){

			const config = {	
                url: '/sz/fp/07r01',
                data: { // 파라미터
					"mydtCusno" : param.mydtCusno
				}
            }

            // console.log("config=", config)
            apiService.call(config).then(response => {
                // console.log("response=", response)
				this.mydtCusno		= response.mydtCusno	// 마이데이터고객번호   	
				this.lnAcBactt		= response.lnAcBactt	// 대출계좌잔액합계    	
				this.crlnAcBactt	= response.crlnAcBactt	// 신용대출계좌잔액합계  
				this.mgglnAcBactt	= response.mgglnAcBactt	// 담보대출계좌잔액합계  
				this.crlnCn			= response.crlnCn		// 신용대출건수       
				this.crlnList		= response.crlnList		// 신용대출목록       
				this.mgglnCn		= response.mgglnCn		// 담보대출건수       
				this.mgglnList		= response.mgglnList	// 담보대출목록       	
            })
		},
		// 영농자금대출 상세 팝업
		fn_openAcLnDtlPopup(infOfrmnOrgC, mydtAcno, mydtScNo){
			//상세 팝업 호출
			const config = {
				component: SZFP2108, 
				params: { // 파라미터
					"mydtCusno" 	: this.getUserInfo("mydtCusno"),
					"infOfrmnOrgC" 	: infOfrmnOrgC,						// 정보제공자기관코드
					"mydtAcno" 		: mydtAcno,							// 마이데이터계좌번호
					"mydtScNo" 		: mydtScNo							// 마이데이터회차번호
				}
			}

			// console.log("config=", config)
			modalService.openPopup(config)		
		},
	},
}
</script>