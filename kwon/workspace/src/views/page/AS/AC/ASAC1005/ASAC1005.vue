<!--
// 2025 NATIVE 호출 함수 수정
/*************************************************************************
* @ 서비스경로 : 자산 > 예금
* @ 페이지설명 : 자산 > 예금 > 계좌별 잔액 예측 리포트 > 출금가능계좌
* @ 파일명     : src\views\page\AS\AC\ASAC1005\ASAC1005.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-10-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-26              CS528069              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>출금가능계좌</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<!-- 입출금 -->
				<div class="com_box_type01 toggle_list_box2 custom_list custom_box_list05 custom_box_list06 mt10">
					<!-- 
						open : 펼쳐짐 
						open -> 삭제시 닫힘
					-->
					<div data-ui-toggle="box" class="toggle_box_area open">
						<button type="button" class="view_btn" aria-expanded="true">
							<div class="new_tit_area new_tit_area1">
								<div class="tit"><span>입출금</span> <span class="com_icon_num custom">{{rndaAccn}}</span></div>
								<span class="total_price">
									<em class="num">{{rndaAcTotBac | numberFilter}}</em><em class="unit">원</em>
								</span>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<ul class="view_cont list_type_01">
						<template v-for="(bankItem, bankIdx) of bankList">
							<li v-if="bankItem.cusAcBac > 0" :key="'bankAcc_'+bankIdx">
								<a href="javascript:void(0);" role="button">
									<dl>
										<dt>
											<div>
												<i :class="bankItem.infOfrmnOrgC"><span class="blind">{{bankItem.orgnm}}</span></i>
												<div>
													<em>{{bankItem.acWrsnm}}</em>
													<span>{{bankItem.mydtAcno}}</span>
												</div>
											</div>
										</dt>
										<dd>
											<span class="com_price">
												<em class="num">{{bankItem.cusAcBac | numberFilter}}</em>
												<em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</a>
							</li>
						</template>
					</ul>
				</div>
				<!--// 입출금 -->

				<!-- 증권 -->
				<div class="com_box_type01 toggle_list_box2 custom_list custom_box_list05 custom_box_list06">
					<!-- 
						open : 펼쳐짐 
						open -> 삭제시 닫힘
					-->
					<div data-ui-toggle="box" class="toggle_box_area open">
						<button type="button" class="view_btn" aria-expanded="true">
							<div class="new_tit_area new_tit_area1">
								<div class="tit"><span>증권</span> <span class="com_icon_num custom">{{speFncIvAccn}}</span></div>
								<span class="total_price">
									<em class="num">{{speFncIvAcTotBac | numberFilter}}</em><em class="unit">원</em>
								</span>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<ul class="view_cont list_type_01">
						<li v-for="(invItem, invIdx) of securityList" :key="'investAcc_'+invIdx">
							<a href="javascript:void(0);" role="button">
								<dl>
									<dt>
										<div>
											<i :class="invItem.infOfrmnOrgC"><span class="blind">{{invItem.orgnm}}</span></i>
											<div>
												<em>{{invItem.ivAcWrsnm}}</em>
												<span>{{invItem.mydtAcno}}</span>
											</div>
										</div>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">{{invItem.acTotAm | numberFilter}}</em>
											<em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</a>
						</li>
					</ul>
				</div>
				<!--// 증권 -->
				
				<div class="help_box pt5">
					<strong class="com_box_tit01 pt0">알아두세요.</strong>
					<ul class="bl_dot_list one_register_list">
						<li>
							이체를 할 계좌가 콕뱅크에 등록된 계좌가 아니면 "콕뱅크 등록계좌" 화면에서 먼저 추가를 해주세요.
						</li>
						<li>
							위 계좌목록은 현재 인출가능한 금액이 있는 계좌들입니다. 출금하려는 계좌가 정기지출이 예정되어 있는 경우에는 관련 비용을 예상하고 출금해 주세요
						</li>
					</ul>
				</div>

			</div>

		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click="fn_moveOpenBanking()">오픈뱅킹 연결</a>
				<!-- 비활성화 -->
				<!-- <a href="javascript:void(0);" role="button" class="btn btn_mint btn_off" aria-disabled="true">다음</a> --><!--22-10-20 btn_off aria-disabled="true" 없을때 aria-disabled="false"-->
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name : "ASAC1005",
    data: () => {
        return {
			rndaAccn		: 0,	// 입출금계좌수
			rndaAcTotBac	: 0,	// 입출금계좌총잔액
			speFncIvAccn	: 0,	// 여유금융투자계좌수
			speFncIvAcTotBac: 0,	// 여유금융투자계좌총잔액
			bankList 		: [],	// 입출금가능계좌상세목록
			securityList 	: [],	// 증권출금가능계좌상세목록
        }
    },
    computed : {
    },
    created() {
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.getData()
        },
        getData(){
			const config = {
				url : "/as/ac/05ra1",
				data : {
					mydtCusno : this.getUserInfo("mydtCusno"),
					// mydtCusno : "1000788058"
				}
			}
			apiService.call(config).then(response => {
				// this.rndaAccn 			= response.rndaAccn || 0			// 입출금계좌수
				this.rndaAcTotBac 		= response.rndaAcTotBac || 0		// 입출금계좌총잔액
				this.speFncIvAccn 		= response.speFncIvAccn || 0		// 여유금융투자계좌수
				this.speFncIvAcTotBac 	= response.speFncIvAcTotBac || 0	// 여유금융투자계좌총잔액

				this.bankList			= response.bankList || []			// 입출금가능계좌상세목록
				this.securityList		= response.securityList || []		// 증권출금가능계좌상세목록

				// 입출금계좌 개수 및 총 금액 계산 (출금가능계좌만)
				this.rndaAccn = 0
				this.rndaAcTotBac = 0
				for(let i=0; i<this.bankList.length; i++) {
					if(this.bankList[i].cusAcBac > 0) {
						this.rndaAccn++
						this.rndaAcTotBac += this.bankList[i].cusAcBac
					}
				}

				// 증권계좌 개수 및 총 금액 계산
				this.speFncIvAccn = 0
				this.speFncIvAcTotBac = 0
				for(let j=0; j<this.securityList.length; j++) {
					this.speFncIvAccn++
					this.speFncIvAcTotBac += this.securityList[j].acTotAm
				}
			})
		},

		// 오픈뱅킹 연결
		fn_moveOpenBanking() {
			if(window.location.host.indexOf('localhost') > -1) {
				// 로컬에서
				console.log("로컬!")
			} else {
				// 스뱅일경우
				if(this.getUserInfo('chnl') === '385') {
					// 스뱅

					const pageInfo = 'navigate( "SSOB1000R", { psnFncWrsC:"", wrsC:"", serviceId:"", naac_dsc:"2", nhType:"2"} )'
					window.fg.of.exec(function() {},"SBView","navigateFromGNB",[pageInfo]);                    
					
					//let url = 'WEB=Y%26serviceId=SSOB1000R%26naac_dsc=2%26nhType=2'
					//appService.moveFinancialProductPage(url)
				} else {
					//COK-BANK
					appService.cokBankGoMove("CBASP1000R")
				}
			}
		}
    },
    mixins: [
        popupMixin
        ,commonMixin
	],
    components: {
    },
}
</script>