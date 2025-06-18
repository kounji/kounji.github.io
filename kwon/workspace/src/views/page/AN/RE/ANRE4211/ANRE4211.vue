<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > NH콕부동산 > 부동산청약
* @ 페이지설명 : 더보기 > NH콕부동산 > 부동산청약 > 청약 공급유형 선택
* @ 파일명     : src/views/page/AN/RE/ANRE4211/ANRE4211.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-03-11
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-11              CS541013              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">청약 공급유형 선택</h1>
		</div>
		
		<div class="popup_content">
			<div class="com_inner">
				<div class="wish_tit">
					<div class="tit">
						<strong class="titH1">청약 정보를 확인할 유형을 <br>선택해주세요.</strong>
						<p class="com_txt_sub addExplan">전체 선택 시 전체 공급유형으로 노출됩니다.</p>
					</div>
					<div class="btn_checkbox noicon">
						<input type="checkbox" name="allcheck" id="allcheck" v-model="allChk" @change.prevent="btnCheckedOnOff($event)">
						<label for="allcheck">
							<span class="show">전체 선택</span>
							<span class="hide">전체 해제</span>
						</label>
					</div>
				</div>
				
				<ul class="wish_chk">
					<li>
						<div class="btn_checkbox">
							<input type="checkbox" name="wish_chk" id="wish_chk01" v-model="selectedCode" value="1" @change.prevent="fnCtrlAllChk($event)">
							<label for="wish_chk01">
								<span>APT</span>
							</label>
						</div>
					</li>
					<li>
						<div class="btn_checkbox">
							<input type="checkbox" name="wish_chk" id="wish_chk02" v-model="selectedCode" value="2" @change.prevent="fnCtrlAllChk($event)">
							<label for="wish_chk02">
								<span>오피스텔/도시형/민간임대</span>
							</label>
						</div>
					</li>
					<li>
						<div class="btn_checkbox">
							<input type="checkbox" name="wish_chk" id="wish_chk03" v-model="selectedCode" value="3" @change.prevent="fnCtrlAllChk($event)">
							<label for="wish_chk03">
								<span>APT 무순위/잔여세대</span>
							</label>
						</div>
					</li>
					<li>
						<div class="btn_checkbox">
							<input type="checkbox" name="wish_chk" id="wish_chk04" v-model="selectedCode" value="4" @change.prevent="fnCtrlAllChk($event)">
							<label for="wish_chk04">
								<span>공공지원 민간임대</span>
							</label>
						</div>
					</li>
					<li>
						<div class="btn_checkbox">
							<input type="checkbox" name="wish_chk" id="wish_chk05" v-model="selectedCode" value="5" @change.prevent="fnCtrlAllChk($event)">
							<label for="wish_chk05">
								<span>임의공급</span>
							</label>
						</div>
					</li>
				</ul>
			</div>

		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<button type="button" class="btn btn_mint" :disabled="selectedCode.length &lt; 1 ? true : false" @click.prevent="fnInsert()">저장</button>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'

export default {
    name : "ANRE4211",
	data: () => {
        return {
			selectedCode			: [],		// 청약 유형별 코드

            localKey 				: "", 		// 로컬 스토리지 key
            localPubRlestCode       : {},		// 청약 유형 상세별 코드

			allChk                  : false		// 모두 체크 여부 확인
		}
	},
	created() {
        
    },
	mounted() {
        this.initComponent()
		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
	computed: {
		
	},
	mixins: [
		popupMixin,
		commonMixin
    ],
	methods: {
        initComponent() {
            console.log("===== chn", this.getUserInfo('chnl'))

            //this.localkey = "rlest" + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + "V4";
            this.localKey = "rlest" + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + "V4";

            console.log("===== localkey", this.localKey)
			this.localPubRlestCode = commonService.getStorage(this.localKey) || {}

			if(Object.keys(this.localPubRlestCode).length == 0) {
                this.localPubRlestCode = {
                    code : []
                }
            }

			this.selectedCode = this.localPubRlestCode.code;	// 로컬 스토리지에 저장된 청약 유형

			if(this.selectedCode.length == 0) {
				this.selectedCode = ["1", "2", "3", "4", "5"]
				this.allChk = true
			}

			if(!this.selectedCode.length) this.allChk = false
			else this.allChk = true
        },
        openDetailPop() {
            const config = {
                component: ANRE4210,
                params : {
                    
                }
            }

            modalService.openPopup(config).then((response) => {
                
            })
        },
        fnInsert() {
            this.localPubRlestCode.code = this.selectedCode.sort();

            commonService.setStorage(this.localKey, this.localPubRlestCode);

            this.close("refresh")
        },
		btnCheckedOnOff(event) {
			let flag = event.target.checked

			if(!flag) {
				// 전체 해제
				this.selectedCode = [];
			}
			else {
				// 전체 선택
				this.selectedCode = ["1", "2", "3", "4", "5"]
			}
		}, 
		fnCtrlAllChk(e) {
			if(!this.selectedCode.length) this.allChk = false
			else this.allChk = true
		},
    },
}
</script>