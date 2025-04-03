<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나를위한금융
* @ 페이지설명 : 금융과생활 > 나를위한금융 > 나의 연말정산 > 나의 연말정산 공제결과
* @ 파일명     : src\views\page\PD\YT\PDYT2001\PDYT2001.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-25              CS533541              최초작성(PDYT1103 ->PDYT2001)
*************************************************************************/
-->
<template>
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>나의 연말정산</h1>
		</div>
		<!-- content S -->

		<!-- 연결된 자산이 있는경우 -->
		<div class="popup_content com_no_bottom yearend_tax" v-if="!isAllNotExist">
			
			<!-- 공제금액이 모두없는경우 -->
			<div class="com_inner" v-if="isNotTotAmt">
				<ul class="layoutBox topTit pt0">
					<li class="left">
						<strong class="titH1">
							<span class="pointColor green">{{cusNm}},</span>추가로 연결할<br>자산이 있지 않나요?
						</strong>
					</li>
					<li class="right">
						<button type="button" class="stdBtn innerType01"> <a href="javascript:void(0);"  @click.prevent="fn_openCOAR2001()">자산등록</a></button>
					</li>
				</ul>
			</div>
			<!-- //공제금액이 모두없는경우 -->


			<div class="com_inner" v-else>
				<!-- 공제금액이 있는경우 -->
				<strong class="titH1">
					<span class="pointColor green">{{cusNm}}님,</span>연말정산으로<br> 
					공제 받을 수 있는 금액이 있어요
				</strong>

				<p class="desc02">
					아래 금액은 연결된 자산 기준으로 계산된<br> 
					예상 금액으로 <span class="pointColor green">실제 공제 금액과는 다를 수 있어요</span>
				</p>
				<!-- //공제금액이 있는경우 -->
			</div>

			<hr class="hr02">
			<div class="com_inner">
				<!-- ===== 카드 Start ===== -->
				<template v-if="isCdConnect">

					<!-- 공제금액이 있는경우 -->
					<div class="line_box_2023 link_type" v-if="cd_ovrYn === '1'">
						<a href="javascript:void(0);" @click.prevent="fn_openPDYTDtl('card')">
							<div class="title_area">
								<span class="badge_2023 green_badge02">카드 소득공제</span>
								<div class="text">
									최대 <em class="price">{{cd_maxMadAm | numberFilter}}원</em> 까지 소득공제 받을 수 있어요
								</div>
							</div>
							<div class="info_list">체크카드 사용이 소득공제에 유리해요</div>
						</a>
					</div>
					<!-- //공제금액이 있는경우 -->

					<!-- 공제금액이 모두없는경우 -->
					<div class="line_box_2023 link_type" v-else>
						<a href="javascript:void(0);" @click.prevent="fn_openPDYTDtl('card')">
							<div class="title_area">
								<span class="badge_2023 green_badge02">카드 소득공제</span>
								<div class="text">소득공제 금액이 없어요</div>
							</div>
							<div class="info_list">카드사용금액 {{fn_numberToKorea(cd_minCdUsAm)}}이 넘어야 소득공제 받을 수 있어요</div>
						</a>
					</div>
					<!-- //공제금액이 모두없는경우 -->
				</template>

				<template v-else>

					<!-- 연동자산 없는경우 -->
					<div class="line_box_2023 plus_type">
						<a href="javascript:void(0);" class="btn_round_plus" @click.prevent="fn_openCOAR2001()">
							<div class="title_area">
								<span class="badge_2023 green_badge02">카드 소득공제</span>
								<div class="text">연결된 자산이 없어요</div>
							</div>
							<div class="info_list">자산 등록하고 공제 금액을 알아보세요</div>
							<span class="add">자산등록</span>
						</a>
					</div>
					<!-- //연동자산 없는경우 -->
				</template>
				<!-- ===== // 카드 End ===== -->
				

				<!-- ===== 청약 Start ===== -->
				<template v-if="isHseConnect">

					<!-- 공제금액이 있는경우 -->
					<div class="line_box_2023 link_type" v-if="hse_madAm > 0">
						<a href="javascript:void(0);" @click.prevent="fn_openPDYTDtl('subscription')">
							<div class="title_area">
								<span class="badge_2023 green_badge02">청약 소득공제</span>
								<div class="text">
									납입한 금액 중 <em class="price">{{hse_madAm | numberFilter}}원</em>을 소득공제 받을 수 있어요
								</div>
							</div>
							<div class="info_list">추가 공제 가능한 금액을 알아보세요</div>
						</a>
					</div>
					<!-- //공제금액이 있는경우 -->

					<!-- 공제금액이 모두없는경우 -->
					<div class="line_box_2023 link_type" v-else>
						<a href="javascript:void(0);" @click.prevent="fn_openPDYTDtl('subscription')">
							<div class="title_area">
								<span class="badge_2023 green_badge02">청약 소득공제</span>
								<div class="text">소득공제 금액이 없어요</div>
							</div>
							<div class="info_list">7천만원 이하의 연소득 근로소득자로 납입 금액이 있어야 해요</div>
						</a>
					</div>
					<!-- //공제금액이 모두없는경우 -->
				</template>

				<template v-else>
					<!-- 연동자산 없는경우 -->
					<div class="line_box_2023 plus_type">
						<a href="javascript:void(0);" class="btn_round_plus" @click.prevent="fn_openCOAR2001()">
							<div class="title_area">
								<span class="badge_2023 green_badge02">청약 소득공제</span>
								<div class="text">연결된 자산이 없어요</div>
							</div>
							<div class="info_list">자산 등록하고 공제 금액을 알아보세요</div>
							<span class="add">자산등록</span>
						</a>
					</div>
					<!-- //연동자산 없는경우 -->
				</template>
				<!-- ===== // 청약 End ====== -->

				<!-- ===== 연금 Start ===== -->
				<template v-if="isIrpConnect">
					<!-- 공제금액이 있는경우 -->

					<div class="line_box_2023 link_type" v-if="irp_madAm > 0">
						<a href="javascript:void(0);" @click.prevent="fn_openPDYTDtl('irp')">
							<div class="title_area">
								<span class="mint_badge">연금 세액공제</span>
								<div class="text">
									납입한 금액 중 <em class="price">{{irp_madAm | numberFilter}}원</em>을 세액공제
									받을 수 있어요
								</div>
							</div>
							<div class="info_list">노후 준비 자금과 공제금액을 확인해 보세요</div>
						</a>
					</div>
					<!-- //공제금액이 있는경우 -->

					<!-- 공제금액이 모두없는경우 -->
					<div class="line_box_2023 link_type" v-else>
						<a href="javascript:void(0);" @click.prevent="fn_openPDYTDtl('irp')">
							<div class="title_area">
								<span class="mint_badge">연금 세액공제</span>
								<div class="text">세액공제 금액이 없어요</div>
							</div>
							<div class="info_list">노후 준비도 하고 세금도 돌려받으세요</div>
						</a>
					</div>
					<!-- //공제금액이 모두없는경우 -->
				</template>

				<template v-else>
					<!-- 연동자산 없는경우 -->
					
					<div class="line_box_2023 plus_type">
						<a href="javascript:void(0);" class="btn_round_plus" @click.prevent="fn_openCOAR2001()">
							<div class="title_area">
								<span class="mint_badge">연금 세액공제</span>
								<div class="text">연결된 자산이 없어요</div>
							</div>
							<div class="info_list">자산 등록하고 공제 금액을 알아보세요</div>
							<span class="add">자산등록</span>
						</a>
					</div>
					<!-- //연동자산 없는경우 -->
				</template>
				<!-- ===== // 연금 End ===== -->

				<!-- ===== 의료비 Start ===== -->
				<template v-if="isCdConnect || isHseConnect || isIrpConnect || isInsuConnect">

					<!-- 공제금액이 있는경우 -->
					<div class="line_box_2023 link_type" v-if="mdc_madAm > 0">
						<a href="javascript:void(0);" @click.prevent="fn_openPDYTDtl('medical')">
							<div class="title_area">
								<span class="mint_badge">의료비 세액공제</span>
								<div class="text">
									의료비 사용금액 중 <em class="price">{{mdc_madAm | numberFilter}}원</em>을 세액공제 받을 수 있어요
								</div>
							</div>
						</a>
					</div>
					<!-- //공제금액이 있는경우 -->

					<!-- 공제금액이 모두없는경우 -->
					<div class="line_box_2023 link_type" v-else>
						<a href="avascript:void(0);" @click.prevent="fn_openPDYTDtl('medical')">
							<div class="title_area">
								<span class="mint_badge">의료비 세액공제</span>
								<div class="text">세액공제 금액이 없어요</div>
							</div>
							<div class="info_list">의료비 사용금액이 {{fn_numberToKorea(mdc_midMdxpUsAm)}}이 넘어야 세액공제 받을 수 있어요</div>
						</a>
					</div>
					<!-- //공제금액이 모두없는경우 -->
				</template>

				<!-- ===== 보험 Start ===== -->
				<template v-if="isInsuConnect">
					<!-- 공제금액이 있는경우 -->

					<div class="line_box_2023 link_type" v-if="insu_madAm > 0">
						<a href="javascript:void(0);" @click.prevent="fn_openPDYTDtl('insu')">
							<div class="title_area">
								<span class="mint_badge">보험료 세액공제</span>
								<div class="text">
									납입한 보험료 중 <em class="price">{{insu_madAm | numberFilter}}원</em>을 세액공제
									받을 수 있어요
								</div>
							</div>
						</a>
					</div>
					<!-- //공제금액이 있는경우 -->

					<!-- 공제금액이 모두없는경우 -->

					<div class="line_box_2023 link_type" v-else>
						<a href="javascript:void(0);" @click.prevent="fn_openPDYTDtl('insu')">
							<div class="title_area">
								<span class="mint_badge">보험료 세액공제</span>
								<div class="text">세액공제 금액이 없어요</div>
							</div>
							<div class="info_list">일반보장성보험료 납입 내역이 없어요</div>
						</a>
					</div>
					<!-- //공제금액이 모두없는경우 -->
				</template>

				<template v-else>
					<!-- 연동자산 없는경우 -->

					<div class="line_box_2023 plus_type">
						<a href="javascript:void(0);" class="btn_round_plus" @click.prevent="fn_openCOAR2001()">
							<div class="title_area">
								<span class="mint_badge">보험료 세액공제</span>
								<div class="text">연결된 자산이 없어요</div>
							</div>
							<div class="info_list">자산 등록하고 공제 금액을 알아보세요</div>
							<span class="add">자산등록</span>
						</a>
					</div>
					<!-- //연동자산 없는경우 -->
				</template>
				<!-- ===== // 보험 End ===== -->
			</div>

		</div>
		<!-- //연결된 자산이 있는경우 -->

		<!-- 연결된 자산이 없는경우 -->
		<div class="com_bg_type02 popup_content" v-else>
			<div class="secede_box">
				<p class="txt">연결된 자산이 없습니다.</p>
				<p class="txt_sub2">한 번에 간편하게 자산 등록하고<br>내게 맞는 연말정산 안내도 받아보세요.</p>
			</div>
			<div class="bottom_box com_bg_type02">
				<div class="btn_full_box">
					<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_openCOAR2001()">자산 등록하기</a>
				</div>
			</div>
		</div>
		<!-- //연결된 자산이 없는경우 -->
		<!--// content E -->

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {numberFormat} from '@/utils/number'

import PDYT2104 from '@/views/page/PD/YT/PDYT2104/PDYT2104'
import PDYT2105 from '@/views/page/PD/YT/PDYT2105/PDYT2105'
import PDYT2106 from '@/views/page/PD/YT/PDYT2106/PDYT2106'
import PDYT2107 from '@/views/page/PD/YT/PDYT2107/PDYT2107'
import PDYT2108 from '@/views/page/PD/YT/PDYT2108/PDYT2108'
import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'

export default {
    name : "PDYT2001",
    data: () => {
        return {
			cusNm 		: "",		// 고객명
			totSalAm 	: "",		// 입력한 연소득(총급여금액)
			basyy 		: "",		// 기준년도

			////////////////// 카드 //////////////////
			cdYendTx 		: [],		// 카드연말정산
			cd_maxMadAm 	: "",		// 최대공제금액
			cd_ovrYn 		: "",		// 25%초과여부
			cd_usSam 		: "",		// 이용금액합계
			cd_ccdCn 		: "",		// 신용카드수
			cd_ccdUsAm 		: "",		// 신용카드이용금액
			cd_chkCdcn 		: "",		// 체크카드수
			cd_chkCdUsAm 	: "",		// 체크카드이용금액
			cd_ccdMadrt 	: "",		// 신용카드공제율
			cd_chkCdMadrt 	: "",		// 체크카드공제율
			cd_minCdUsAm 	: "",		// 최소카드사용금액

			////////////////// 의료비 //////////////////
			mdcYendTx 		: [],		// 의료비연말정산
			mdc_madAm 		: "",		// 공제금액
			mdc_mdxpUsAm 	: "",		// 의료비사용금액
			mdc_madObjAm 	: "",		// 공제대상금액
			mdc_madBasRto 	: "",		// 공제기준비율
			mdc_madRto 		: "",		// 공제비율
			mdc_midMdxpUsAm : "",		// 최소의료비사용금액

			////////////////// 청약 //////////////////
			hseDpYendTx 		: [],	// 청약연말정산
			hse_madAm 			: "",	// 공제금액
			hse_infOfrmnOrgC 	: "",	// 정보제공자기관코드
			hse_acWrsnm 		: "",	// 계좌상품명
			hse_pymAm 			: "",	// 납입금액
			hse_madObjAm 		: "",	// 공제대상금액
			hse_madLmtAm 		: "",	// 공제한도금액
			hse_madRto 			: "",	// 공제비율
			hse_adtMadPymAm 	: "",	// 추가공제납입금액
			hse_adtMadAm 		: "",	// 추가공제금액

			////////////////// 연금 //////////////////
			irpYendTx 		: [],		// 연금연말정산
			irp_madAm 		: "",		// 공제금액
			irp_irpCn 		: "",		// IRP건수
			irp_pymAm 		: "",		// 납입금액
			irp_madObjAm 	: "",		// 공제대상금액
			irp_madLmtAm 	: "",		// 공제한도금액
			irp_madRto 		: "",		// 공제비율
			irp_adtMadPymAm : "",		// 추가공제납입금액
			irp_adtMadAm 	: "",		// 추가공제금액

			////////////////// 보험료 //////////////////
			insuYendTx 		: [],		// 보험료연말정산
			insu_madAm 		: "",		// 공제금액
			insu_pymAm 		: "",		// 납입금액
			insu_madObjAm 	: "",		// 공제대상금액
			insu_madLmtAm 	: "",		// 공제한도금액
			insu_madRto 	: "",		// 공제비율
			insu_isrCn 		: "",		// 보험건수

			isCdConnect 	: false,	// 카드연동여부
			isHseConnect 	: false,	// 청약연동여부
			isIrpConnect 	: false,	// 연금연동여부
			isInsuConnect 	: false,	// 보험연동여부

			isAllNotExist	: false,	// 전체 자산 미연동여부
			isNotTotAmt		: false,	// 1개이상의 자산연동이 되어있으나 전체 공제금액이 0인 경우
        }
    },
    mounted() {
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
		
		this.initComponent(this.params)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent(param = {}) {
			this.cusNm = this.getUserInfo("cusnm") || ""
			this.totSalAm = param.totSalAm || ""

            this.getData()
        },
        getData() {
			let date = new Date()
			// 현재 월이 1월이거나 2월일 경우 이전년도 연말정산
			let chkPastYear = (date.getMonth() + 1 < 3) ? true : false
			
			this.basyy = (chkPastYear) ? date.getFullYear() - 1 : date.getFullYear()

			const config = {

				url : "/pd/yt/01r01", // (IF-MOB-PFM-PDYT01R01) , PFMPDYT01R01
				//url : "/pd/yt/03r01",
				data : {
					mydtCusno : this.getUserInfo("mydtCusno"),
					basyy : this.basyy,
					totSalAm : this.totSalAm,
				}
			}
			apiService.call(config).then(response => {
				this.cdYendTx 		= response.cdYendTx 	|| []	// 카드연말정산
				this.mdcYendTx 		= response.mdcYendTx 	|| []	// 의료비연말정산
				this.hseDpYendTx 	= response.hseDpYendTx 	|| []	// 청약연말정산
				this.irpYendTx 		= response.irpYendTx 	|| []	// 연금연말정산
				this.insuYendTx 	= response.insuYendTx 	|| []	// 보험료연말정산
				
				this.fn_calcResultCard()	// 카드 소득공제 계산
				this.fn_calcResultHse()		// 청약 소득공제 계산
				this.fn_calcResultIrp()		// 연금 세액공제 계산
				this.fn_calcResultMdc()		// 의료비 세액공제 계산
				this.fn_calcResultInsu()	// 보험료 세액공제 계산

				this.$nextTick(() => {
					// 연동된 자산은 1개 이상 있으나 공제 금액이 모두 없는 경우 상단 출력문구 변경
					if(this.isCdConnect || this.isHseConnect || this.isIrpConnect || this.isInsuConnect) {
						if((this.cd_ovrYn !== '1' || this.cd_maxMadAm < 1) && this.hse_madAm < 1 && this.irp_madAm < 1 && this.insu_madAm < 1 && this.mdc_madAm < 1) {
							/*
							(this.cd_ovrYn !== '1' || this.cd_maxMadAm < 1) : (카드) 최대공제금액 = 0 또는 소득금액대비 카드사용금액 25% 초과하지 않았을 경우
							this.hse_madAm < 1 : (청약) 공제금액 = 0
							this.irp_madAm < 1 : (연금) 공제금액 = 0
							this.insu_madAm < 1 : (보험) 공제금액 = 0
							this.mdc_madAm < 1 : (의료비) 공제금액 = 0
							*/
							this.isNotTotAmt = true
						}
					}

					// 연동된 자산이 모두 없는지 확인
					this.isAllNotExist = (!this.isCdConnect && !this.isHseConnect && !this.isIrpConnect && !this.isInsuConnect) ? true : false
				})
			})

		},

		// 카드 소득공제 계산
		fn_calcResultCard() {
			this.cd_maxMadAm 	= this.cdYendTx.maxMadAm 	|| 0	// 최대공제금액
			this.cd_ovrYn 		= this.cdYendTx.ovrYn 		|| ""	// 25%초과여부
			this.cd_usSam 		= this.cdYendTx.usSam 		|| 0	// 이용금액합계
			this.cd_ccdCn 		= this.cdYendTx.ccdCn 		|| 0	// 신용카드수
			this.cd_ccdUsAm 	= this.cdYendTx.ccdUsAm		|| 0	// 신용카드이용금액
			this.cd_chkCdcn 	= this.cdYendTx.chkCdcn		|| 0	// 체크카드수
			this.cd_chkCdUsAm 	= this.cdYendTx.chkCdUsAm	|| 0	// 체크카드이용금액
			this.cd_ccdMadrt 	= this.cdYendTx.ccdMadrt 	|| 0	// 신용카드공제율
			this.cd_chkCdMadrt 	= this.cdYendTx.chkCdMadrt 	|| 0	// 체크카드공제율
			this.cd_minCdUsAm 	= this.cdYendTx.minCdUsAm 	|| 0	// 최소카드사용금액

			// 카드연동여부확인
			// 신용/체크 카드 개수 > 0 -> true
			// 신용/체크 카드 개수 = 0 -> false
			this.isCdConnect = (this.cd_ccdCn < 1 && this.cd_chkCdcn < 1) ? false : true
		},
		// 청약 소득공제 계산
		fn_calcResultHse() {
			this.hse_madAm 			= this.hseDpYendTx.madAm 		|| 0	// 공제금액
			this.hse_infOfrmnOrgC	= this.hseDpYendTx.infOfrmnOrgC || ""	// 정보제공자기관코드
			this.hse_acWrsnm 		= this.hseDpYendTx.acWrsnm 		|| ""	// 계좌상품명
			this.hse_pymAm 			= this.hseDpYendTx.pymAm 		|| 0	// 납입금액
			this.hse_madObjAm 		= this.hseDpYendTx.madObjAm 	|| 0	// 공제대상금액
			this.hse_madLmtAm 		= this.hseDpYendTx.madLmtAm 	|| 0	// 공제한도금액
			this.hse_madRto 		= this.hseDpYendTx.madRto 		|| 0	// 공제비율
			this.hse_adtMadPymAm 	= this.hseDpYendTx.adtMadPymAm 	|| 0	// 추가공제납입금액
			this.hse_adtMadAm 		= this.hseDpYendTx.adtMadAm 	|| 0	// 추가공제금액

			// 청약연동여부확인
			// 계좌상품명 != null -> true
			// 계좌상품명 == null -> false
			this.isHseConnect = (this.hse_acWrsnm === "") ? false : true
		},
		// 연금 세액공제 계산
		fn_calcResultIrp() {
			this.irp_madAm 			= this.irpYendTx.madAm 		 || 0	// 공제금액
			this.irp_irpCn 			= this.irpYendTx.irpCn 		 || 0	// IRP건수
			this.irp_pymAm 			= this.irpYendTx.pymAm 		 || 0	// 납입금액
			this.irp_madObjAm 		= this.irpYendTx.madObjAm 	 || 0	// 공제대상금액
			this.irp_madLmtAm 		= this.irpYendTx.madLmtAm 	 || 0	// 공제한도금액
			this.irp_madRto 		= this.irpYendTx.madRto 	 || 0	// 공제비율
			this.irp_adtMadPymAm 	= this.irpYendTx.adtMadPymAm || 0	// 추가공제납입금액
			this.irp_adtMadAm 		= this.irpYendTx.adtMadAm 	 || 0	// 추가공제금액

			// 연금연동여부확인
			// IRP건수 > 0 	-> true
			// IRP건수 == 0 -> false
			this.isIrpConnect = (this.irp_irpCn < 1) ? false : true
		},
		// 의료비 세액공제 계산
		fn_calcResultMdc() {
			this.mdc_madAm 			= this.mdcYendTx.madAm 		 || 0	// 공제금액
			this.mdc_mdxpUsAm 		= this.mdcYendTx.mdxpUsAm 	 || 0	// 의료비사용금액
			this.mdc_madObjAm 		= this.mdcYendTx.madObjAm 	 || 0	// 공제대상금액
			this.mdc_madBasRto 		= this.mdcYendTx.madBasRto 	 || 0	// 공제기준비율
			this.mdc_madRto 		= this.mdcYendTx.madRto 	 || 0	// 공제비율
			this.mdc_midMdxpUsAm	= this.mdcYendTx.midMdxpUsAm || 0	// 최소의료비사용금액
		},
		// 보험료 세액공제 계산
		fn_calcResultInsu() {
			this.insu_madAm 	= this.insuYendTx.madAm 	|| 0 	// 공제금액
			this.insu_pymAm 	= this.insuYendTx.pymAm		|| 0	// 납입금액
			this.insu_madObjAm 	= this.insuYendTx.madObjAm	|| 0	// 공제대상금액
			this.insu_madLmtAm 	= this.insuYendTx.madLmtAm	|| 0	// 공제한도금액
			this.insu_madRto 	= this.insuYendTx.madRto	|| 0	// 공제비율
			this.insu_isrCn 	= this.insuYendTx.isrCn		|| 0	// 보험건수

			// 보험연동여부확인
			// 보험건수 > 0		-> true
			// 보험건수 == 0 	-> false
			this.isInsuConnect = (this.insu_isrCn > 0) ? true : false
		},
		// 금액 '원'단위 및 표기 포맷
		fn_numberToKorea(amt) {
			const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length

            let resultArray = []
            let resultString = ""

            for(let i=0; i<splitCnt; i++) {
                let rst = (amt % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
                rst = Math.floor(rst)

                if(rst > 0) {
                    resultArray[i] = rst
                }
            }

            let strIdx = 0  // 최초시작지점에 '원' 추가하기위함

            for(let j=0; j<resultArray.length; j++) {
                if(!resultArray[j]) {
                    strIdx++
                    continue
                }

                if(j === strIdx) {
                    resultString = String(numberFormat(resultArray[j])) + unit[j] + '원' + resultString
                } else {
                    resultString = String(numberFormat(resultArray[j])) + unit[j] + ' ' + resultString
                }
            }

            return resultString
		},
		// 각 항목 상세화면으로 이동
		fn_openPDYTDtl(type) {
			let popId = ""
			let param = {}
			switch(type) {
				case "card" :	// 카드
					popId = PDYT2104
					param = {
						totSalAm		: this.totSalAm		,		// 연소득총액(재조회용)
						cd_maxMadAm 	: this.cd_maxMadAm  ,		// 최대공제금액
						cd_ovrYn 		: this.cd_ovrYn 	,		// 25%초과여부
						cd_usSam 		: this.cd_usSam 	,		// 이용금액합계
						cd_ccdCn 		: this.cd_ccdCn 	,		// 신용카드수
						cd_ccdUsAm 		: this.cd_ccdUsAm 	,		// 신용카드이용금액
						cd_chkCdcn 		: this.cd_chkCdcn 	,		// 체크카드수
						cd_chkCdUsAm 	: this.cd_chkCdUsAm ,		// 체크카드이용금액
						cd_ccdMadrt 	: this.cd_ccdMadrt  ,		// 신용카드공제율
						cd_chkCdMadrt 	: this.cd_chkCdMadrt,		// 체크카드공제율
						cd_minCdUsAm 	: this.cd_minCdUsAm ,		// 최소카드사용금액
					}
					break
				case "subscription" :	// 청약
					popId = PDYT2105
					param = {
						totSalAm			: this.totSalAm			,	// 연소득총액(재조회용)
						hse_madAm 			: this.hse_madAm 		,	// 공제금액
						hse_infOfrmnOrgC	: this.hse_infOfrmnOrgC	,	// 정보제공자기관코드
						hse_acWrsnm 		: this.hse_acWrsnm 		,	// 계좌상품명
						hse_pymAm 			: this.hse_pymAm 		,	// 납입금액
						hse_madObjAm 		: this.hse_madObjAm 	,	// 공제대상금액
						hse_madLmtAm 		: this.hse_madLmtAm 	,	// 공제한도금액
						hse_madRto 			: this.hse_madRto 		,	// 공제비율
						hse_adtMadPymAm 	: this.hse_adtMadPymAm 	,	// 추가공제납입금액
						hse_adtMadAm 		: this.hse_adtMadAm 	,	// 추가공제금액
					}
					break
				case "irp" : 	// 연금
					popId = PDYT2106
					param = {
						totSalAm		: this.totSalAm			,	// 연소득총액(재조회용)
						irp_madAm 		: this.irp_madAm 		,	// 공제금액
						irp_irpCn 		: this.irp_irpCn 		,	// IRP건수
						irp_pymAm 		: this.irp_pymAm 		,	// 납입금액
						irp_madObjAm 	: this.irp_madObjAm 	,	// 공제대상금액
						irp_madLmtAm 	: this.irp_madLmtAm 	,	// 공제한도금액
						irp_madRto 		: this.irp_madRto 		,	// 공제비율
						irp_adtMadPymAm : this.irp_adtMadPymAm	,	// 추가공제납입금액
						irp_adtMadAm 	: this.irp_adtMadAm 	,	// 추가공제금액
					}
					break
				case "medical" :	// 의료비
					popId = PDYT2107
					param = {
						mdc_madAm 		: this.mdc_madAm 		,	// 공제금액
						mdc_mdxpUsAm 	: this.mdc_mdxpUsAm 	,	// 의료비사용금액
						mdc_madObjAm 	: this.mdc_madObjAm 	,	// 공제대상금액
						mdc_madBasRto 	: this.mdc_madBasRto 	,	// 공제기준비율
						mdc_madRto 		: this.mdc_madRto 		,	// 공제비율
						mdc_midMdxpUsAm : this.mdc_midMdxpUsAm 	,	// 최소의료비사용금액
					}
					break
				case "insu" :	// 보험료
					popId = PDYT2108
					param = {
						totSalAm		: this.totSalAm			,	// 연소득총액(재조회용)
						insu_madAm 		: this.insu_madAm 		,	// 공제금액
						insu_pymAm 		: this.insu_pymAm 		,	// 납입금액
						insu_madObjAm 	: this.insu_madObjAm 	,	// 공제대상금액
						insu_madLmtAm 	: this.insu_madLmtAm 	,	// 공제한도금액
						insu_madRto 	: this.insu_madRto 		,	// 공제비율
						insu_isrCn 		: this.insu_isrCn 		,	// 보험건수
					}
					break
				default:
					break
			}

			const config = {
				component : popId,
				params : param
			}

			modalService.openPopup(config).then(() => {

			})
		},
		fn_openCOAR2001() {
			const config = {
				component : COAR2001,
			}
			modalService.openPopup(config).then(() => {
				this.getData()
            })
		}
    }
}
</script>