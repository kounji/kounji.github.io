<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 예금 > 계좌별 잔액 예측 리포트 > 계좌별 예상잔액 조회
* @ 페이지설명 : 자산 > 예금 > 계좌별 잔액 예측 리포트 > 계좌별 예상잔액 조회 > 계좌 선택
* @ 파일명     : src/views/page/AS/AC/ASAC1007/ASAC1007.vue
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
					<h1>계좌 선택</h1>
				</div>
				<div class="popup_content">
					<div class="com_txt_type02">
						<div class="new_sec_box custom">
							<ul class="list_round_box ico_inner">
								<li v-for="(item, idx) of accountList" :key="'account_'+idx">
									<input type="radio" name="area" :id="'area_' + idx" :checked="item.checked" @click="fn_returnSelect(item)">
									<label :for="'area_'+idx" class="bank_state_che">
										<i :class="'ico_bank '+item.infOfrmnOrgC"><span class="blind">{{item.orgnm}}</span></i>
										<dl>
											<dt>{{item.acWrsnm}}</dt>
											<dd>{{item.mydtAcno}}</dd>
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

export default {
    name : "ASAC1007",
    data: () => {
        return {
			accountList : [],	// 계좌 리스트
			selItem : {}
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
			this.selItem = param.selItem || {}

			console.log(this.accountList, this.selItem)

            this.getData()
        },
        getData() {
			for(let i=0; i<this.accountList.length; i++) {
				if( this.accountList[i].mydtAcno === this.selItem.mydtAcno ) {
					this.accountList[i].checked = true
				} else {
					this.accountList[i].checked = false
				}
			}
		},

		fn_returnSelect(item) {
			this.close(item)
		}
    }
}
</script>