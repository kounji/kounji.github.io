<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > NH콕부동산 > 부동산청약
* @ 페이지설명 : 더보기 > NH콕부동산 > 부동산청약 > 관심지역 선택
* @ 파일명     : src/views/page/AN/RE/ANRE4208/ANRE4208.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-03-10
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-10              CS541013              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">아파트 청약 알림 지역 선택</h1><!-- 25-03-13 문구수정 -->
		</div>
		
		<div class="popup_content">
			<!-- 25-03-13 전체적으로 레이아웃 수정 (신규코드) -->
			<div class="com_inner">
				<div class="wish_tit">
					<div class="tit">
						<strong class="titH1">PUSH 전송할 아파트 청약지역을 <br>선택해주세요.</strong>
						<p class="com_txt_sub addExplan">전체 선택 시 전국으로 PUSH전송 됩니다.</p>
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
					<li v-for="(item, idx) in rgnList" :key="idx">
						<div class="btn_checkbox">
							<input type="checkbox" name="wish_chk" :id="'wish_chk'+item.comnCVal" v-model="inteList" :value="item.comnCVal" @change.prevent="fnCtrlAllChk($event)">
							<label :for="'wish_chk'+item.comnCVal">
								<span>{{item.comnCExpl}}</span>
							</label>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<button type="button" class="btn btn_mint" :disabled="!btnShow" @click.prevent="saveInteRegions()">저장</button>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'

export default {
    name: "ANRE4208",
	data: () => {
        return {
			inteList			: [],
			rgnList             : [],
			btnShow             : false,        // 저장 버튼 활성화 여부
			allChk              : false,		// 모두 체크 여부 확인

			isCheckedAnc        : '',           // 알림 on/off 버튼 체크여부
		}
	},
	mixins: [
        popupMixin,
		commonMixin
    ],
	mounted() {
		//PFM로그 처리 화면접속이력 등록 POST
		this.initComponents(this.params)
        apiService.pfmLogSend(this.$options.name)
	},
	computed: {
		
	},
    methods: {
		initComponents(param) {
			this.isCheckedAnc = param.isCheckedAnc

			const config = {
                url: '/co/co/00r01',
                data: {
                    comnCId   : "HSE_SPYAA_STA_DSC",	// 알림 on/off 버튼 체크여부
					delYn     : '0'                   	// 삭제여부
                }
            }

            apiService.call(config).then(response => {
                this.rgnList = response.comnCList

				this.getData()
            })
		},
		getData() {
			const config = {
                url: '/an/re/01r02',
                data: {
                    mydtCusno : this.getUserInfo("mydtCusno"),
					rgnDsc     : '03'
                }
            }

            apiService.call(config).then(response => {
				if(response.inteList.length > 0) {		// 저장된 관심지역 있는 경우
					response.inteList.forEach((el) => {
						this.inteList.push(el.hseSpyaaStaCntn)
					})
				} else {	// 저장된 관심지역 없는 경우 (최초 설정시 : 서울(100))
					this.inteList.push("100")
				}

				this.fnSetAllChk()
            })
		},
		btnCheckedOnOff(event) {
			let flag = event.target.checked

			this.inteList = []
			if(flag) {
				// 전체 선택
				this.rgnList.forEach(el => this.inteList.push(el.comnCVal))
			}
			this.fnSetAllChk()
		}, 
		fnCtrlAllChk(e) {
			this.fnSetAllChk()
		},

		fnSetAllChk() {
			if(this.inteList.length > 0) this.btnShow = true	// 체크한 갯수가 1개 이상인 경우 저장 버튼 활성화
			else this.btnShow = false							// 체크한 갯수가 없으면 저장 버튼 비활성화

			if(this.inteList.length) {	// 전체 선택 여부 확인
                this.allChk = true
            } else {
                this.allChk = false
            }
		},
		saveInteRegions() {
			let hseSpyaaStaC = []
			this.inteList.forEach(el=>{hseSpyaaStaC.push({hseSpyaaStaC:el})})

            const config = {
                url : '/an/re/01s01/',
                data : {
                    mydtCusno 		: this.getUserInfo("mydtCusno"),
                    rgnDsc    		: '03',
					hseSpyaaStaC	: hseSpyaaStaC,
					ancYn           : this.isCheckedAnc == 'checked' ? '1' : '0'
                }
            };

            apiService.call(config).then(response =>{
                if(response.rspC == "0000") { // 정상 처리된 경우
                    this.close("refresh")
                }
            });
			
        },
    },
}
</script>