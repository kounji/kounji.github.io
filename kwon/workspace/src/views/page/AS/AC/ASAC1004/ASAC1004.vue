<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 예금 > 계좌별 잔액 예측 리포트 > 맞춤 상품추천
* @ 페이지설명 : 자산 > 예금 > 계좌별 잔액 예측 리포트 > 맞춤 상품추천
* @ 파일명     : src/views/page/AS/AC/ASAC1004/ASAC1004.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-10-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-26             CS528069                 최초작성
*************************************************************************/
-->
<template>
    <div>
		<!-- slide popup S -->
		<div class="dimmed" style="display: block;" @click.prevent="close()"></div>
		<div class="popup_box renewal">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
				<div class="popup_header">
					<h1>맞춤 상품추천</h1>
				</div>
				<div class="popup_content">
					<div class="com_txt_type02 custom_box_com_txt_type02">
						<div class="new_sec_box custom">
							<ul class="list_round_box">
								<li v-for="(item, idx) of accountList" :key="'account_'+idx">
									<input type="radio" name="area" :id="'area_' + idx" @click.prevent="fn_moveAppAcc(item.wrsDtlUrlnm)">
									<label :for="'area_'+idx">
										<dl>
											<dt>{{item.wrsnmPrtnm}}</dt>
											<dd>{{item.rcmWrsBrfCntn}}</dd>
										</dl>
									</label>
								</li>
							</ul>
						</div>
					</div>
				</div>
				
				<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
			</div>
		</div>
		<!--// slide popup E -->
    </div>
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import appService from '@/service/appService'

export default {
    name : "ASAC1004",
    data: () => {
        return {
			accountList : [],	// 추천 계좌 리스트
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    computed : {

    },
    mounted() {
        this.initComponent(this.params);
        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    methods: {
        initComponent(param={}) {
			this.accountList = param.accountList || []

			/**
			 * wrsGrTpd(상품군유형코드) 에 따라 필터링
			 * RVGTP 	:: 적금(적립식)
			 * DFFM		:: 예금(거치식)
			 */
			this.accountList    = this.accountList.filter((wrsRcm) => wrsRcm.wrsGrTpc == 'RVGTP' || wrsRcm.wrsGrTpc == 'DFFM') || [];     // 적금(적립식)

            this.getData()
        },
        getData() {

		},
		
		fn_moveAppAcc(urlInfo) {
			appService.moveFinancialProductPage(urlInfo)
		},
    }
}
</script>