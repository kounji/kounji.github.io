<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 세금 납부 확인 > 관세
* @ 페이지설명 : 
* @ 파일명     : src\views\page\PD\TX\PDTX4003\PDTX4003.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-08-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-21              CS533541              최초작성
* 2025-03-26              CS541015              상호금융 NH콕마이데이터 4.0 추진 개발(PDTX2003.vue -> PDTX4003.vue)
*************************************************************************/
-->
<template>
	<div id="tab_03" role="tabpanel" class="cmm-tab-panel on">
		<div v-if="pponYn == 'Y' || dlqYn == 'Y'" class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">

					<div v-if="dlqYn == 'Y'" class="new_tit_area">
						<div class="tit"><span>관세 납세증명</span></div>
						<span class="badge_2023 soft_red">체납</span>
						
					</div>
					<div v-if="pponYn == 'Y' && dlqYn == 'N'" class="new_tit_area">
						<div class="tit"><span>관세 납세증명</span></div>
						<span class="badge_2023 soft_navy">유예</span>
					</div>
					
					<em class="open">열기</em>
					<em class="close">닫기</em>
				</button>
			</div>
			<div class="view_cont">
				<ul class="tax_list">
					<li v-if="dlqYn == 'Y'">
						<dl>
							<dt>체납총액</dt>
							<dd><em class="num"> {{tam| numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>본세총액</dt>
							<dd><em class="num">{{btxTam| numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>가산금총액</dt>
							<dd><em class="num">{{addamTam| numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>세관명</dt>
							<dd>{{cstmsNm}}</dd>
						</dl>

						<dl>
							<dt>체납유효일자</dt>
							<dd class="num">{{vldDt| dateFilter('YYYY.MM.DD')}}</dd>
						</dl>
					</li>

					<li v-if="pponYn == 'Y' && dlqYn == 'N'" >
						<dl>
							<dt>유예종류</dt>
							<dd>{{ fn_getCodeNm({pponDsc}) }}</dd>
						</dl>
						<dl>
							<dt>유예기간</dt>
							<dd class="num"> {{pponStDt| dateFilter('YYYY.MM.DD')}}~ {{pponEdDt| dateFilter('YYYY.MM.DD')}}</dd>
						</dl>
					</li>
				</ul>
			</div>
		</div>

		<div v-if="pponYn == 'N' && dlqYn == 'N'" class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>관세 납세증명</span></div>
						<span class="badge_2023 soft_mint">정상</span>
					</div>
					<em class="open">열기</em>
					<em class="close">닫기</em>
				</button>
			</div>
			<div class="view_cont">
				<div class="nodata_small">
					<div class="nodata_list">
						<p class="txt_sub">체납된 세금이 없어요.</p>
					</div>
				</div>
			</div>
		</div>
		
		<div v-if="cdtyPayPrto" class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>관세 납부내역</span></div>
					</div>
					<em class="open">열기</em>
					<em class="close">닫기</em>
				</button>
			</div>
			<div class="view_cont">
				<ul class="tax_list">
					<li>
						<dl>
							<dt>관세</dt>
							<dd><em class="num">{{cdtyAm| numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>부가가치세</dt>
							<dd><em class="num">{{addWthTxa| numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>개별소비세</dt>
							<dd><em class="num">{{idvdCstx| numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>주세</dt>
							<dd><em class="num">{{lqtx| numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>교통에너지환경세</dt>
							<dd><em class="num">{{trafEngyEnvTxa| numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>교육세</dt>
							<dd><em class="num">{{edutx| numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>농어촌특별세</dt>
							<dd><em class="num">{{fafvSptx| numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>가산세</dt>
							<dd><em class="num">{{adTxa| numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>가산금</dt>
							<dd><em class="num">{{adAm| numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>일자별총액</dt>
							<dd><em class="num">{{dtbyTam| numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>회계기준년도</dt>
							<dd><em class="num">{{basyy}}</em>년</dd>
						</dl>
						<dl v-if="rpDt != undefined" >
							<dt>수납일자</dt>
							<dd class="num">{{rpDt| dateFilter('YYYY.MM.DD')}}</dd>
						</dl>

						<dl v-else>
							<dt>수납일자</dt>
							<dd class="num">{{rpDt}}일</dd>
						</dl>
					</li>
				</ul>
			</div>
		</div>

		<div class="new_add_register">
			<a href="javascript:void(0);" role="button" @click="fn_openPopup()"><span>더 확인할 세금이 있나요?</span></a>
		</div>
	</div>
</template>

<script>
/*eslint-disable */
import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'

export default {
	data: () => {
		return {

			dlqYn	:	"",	//	체납여부
			tam		:	0,	//	총액
			btxTam	:	0,	//	본세총액
			addamTam:	0,	//	가산금총액
			cstmsNm	:	"",	//	세관명
			rqrRcDt	:	"",	//	요청접수일자
			vldDt	:   "",	//	유효일자
			pponDsc	:	"",	//	유예구분코드
			pponStDt:	"",	//	유예시작일자
			pponEdDt:	"",	//	유예종료일자
			objYm	:	"",	//	대상연도
			cdtyAm	:	0,	//	관세금액
			addWthTxa:	0,	//	부가가치세액
			idvdCstx:	0,	//	개별소비세
			lqtx	:	0,	//	주세
			trafEngyEnvTxa	:	0,	//	교통에너지환경세액
			edutx			:	0,	//	교육세
			fafvSptx:	0,	//	농어촌특별세
			adTxa	:	0,	//	가산세액
			adAm	:	0,	//	가산금액
			dtbyTam	:	0,	//	일자별총액
			basyy	:	"",	//	기준년도
			rpDt	:	"",	//	수납일자
			pponYn  :	"N",// 유예여부
			codeList: [], // 공통코드 목록
			cdtyPayPrto : true //관세 납부내역 출력 여부
		}
	},
	computed: {

	},
	mounted() {
		this.init()
		this.codeList = this.getCodeList("PPON_DSC");
	},
	methods: {
		init() {
			const config = {
                url: '/pd/tx/03r01', // PFMPDTX03R01, IF-MOB-PFM-PDTX03R01
                data: {
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                }
            };
            apiService.call(config).then(response => {
				this.dlqYn	=	response.dlqYn;
				this.tam	=	response.tam;
				this.btxTam	=	response.btxTam;
				this.addamTam	=	response.addamTam;
				this.cstmsNm	=	response.cstmsNm;
				this.rqrRcDt	=	response.rqrRcDt;
				this.vldDt		=	response.vldDt;
				this.pponDsc	=	response.pponDsc;
				this.pponStDt	=	response.pponStDt;
				this.pponEdDt	=	response.pponEdDt;
				this.objYm		=	response.objYm;
				this.cdtyAm		=	response.cdtyAm;
				this.addWthTxa	=	response.addWthTxa;
				this.idvdCstx	=	response.idvdCstx;
				this.lqtx		=	response.lqtx;
				this.trafEngyEnvTxa	=	response.trafEngyEnvTxa;
				this.edutx		=	response.edutx;
				this.fafvSptx	=	response.fafvSptx;
				this.adTxa	=	response.adTxa;
				this.adAm	=	response.adAm;
				this.dtbyTam=	response.dtbyTam;
				this.basyy	=	response.basyy;
				this.rpDt	=	response.rpDt;

				if(this.pponDsc == "01" || this.pponDsc == "02" || this.pponDsc =="03"){
					this.pponYn = "Y";
				}else{
					this.pponYn = "N";
				}
				console.log("rpDt==>> ", this.rpDt);

				this.$emit('getCdtyDlqYn', this.dlqYn);

				if(this.addWthTxa == 0 && this.idvdCstx == 0 && this.lqtx == 0 && this.trafEngyEnvTxa == 0 && this.edutx == 0 && this.fafvSptx == 0 &&
				   this.adTxa == 0 && this.adAm == 0 && this.dtbyTam == 0){

				   this.cdtyPayPrto = false;		   	
				 }else{	
				   this.cdtyPayPrto = true;		   	 	
				 }

			})
		},

		fn_openPopup() {

			let compName = COAR4002;
			let param    = { isExternal : true , orgDsc : 'public'}

			let config = {
				component : compName,
				params : param
			}
			modalService.openPopup(config).then(response => {
				console.log('response', response)
			})
		},
		/**
		 * 외부 브라우저 열기
		 */
		openWebBrowser(url) {
			if (this.getUserInfo('chnl') === '385') {
				appService.executeBrowser(url);
			} else {
				appService.cokBankOpenPopupWebBrowser(url);
			}
		},

		// 공통코드 코드명 조회
		fn_getCodeNm(item) {
			console.log("item==>", item);
			return this.codeList.find(code => item.pponDsc == code.comnCVal)?.comnCExpl || ''
		},

	},
	mixins: [
        commonMixin,
    ],
}
</script>