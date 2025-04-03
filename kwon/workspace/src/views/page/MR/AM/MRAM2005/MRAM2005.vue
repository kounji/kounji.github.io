<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 연결자산관리 > 자산연결해제
* @ 페이지설명 : 연결자산관리 > 자산연결해제
* @ 파일명     : src/views/page/MR/AM/MRAM2005/MRAM2005.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-01              CS528069              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>연결 해제</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<strong class="titH1">{{ orgList.length }}개 기관의 연결을<br>해제 하시겠어요?</strong>
				<p class="desc">연결을 해제하면 고객님의 자산(공공)정보를<br>더 이상 가져오지 않아요.</p>
			</div>
			<div class="com_inner">
				<div class="com_box_type01 toggle_list_box2 custom_list" v-for="(orgItem, orgIdx) in orgList" :key="'org_'+orgIdx">
					<div data-ui-toggle="box" class="toggle_box_area"><!--활성화 class open -->
						<button type="button" class="view_btn" aria-expanded="false">
							<div class="new_tit_area">
								<i :class="'ico_bank '+orgItem.orgObj.infOfrmnOrgC"><span class="blind">{{orgItem.orgObj.orgnm}}</span></i>
								<div class="tit"><span>{{orgItem.orgObj.orgnm}}</span></div>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<ul class="view_cont list_type_03">
						<li v-for="(orgWrsItem, orgWrsIdx) in orgItem.orgObj.wrsList" :key="'orgWrs_'+orgWrsIdx">
							<dl>
								<dt>
									<div><em>{{orgWrsItem.wrsnm}}</em></div>
								</dt>
								<dd v-for="(orgAccItem, orgAccIdx) in orgWrsItem.accList" :key="'orgAcc_'+orgAccIdx">
									<em class="account_num">{{orgAccItem.wrsCntn}}</em>
								</dd>
							</dl>
						</li>
					</ul>
				</div>

				<!-- <div class="custom_terms">
					<div class="new_check_all">
						<span class="btn_check">
							<input type="checkbox" name="allagree" id="del_immediate" v-model="chkDelDct">
							<label for="del_immediate">
								<span>개인신용정보 즉시 삭제 요청</span>
							</label>
						</span>
					</div>
					<div class="new_agree_list">
						<p class="custom_terms_txt">개인신용정보는 서비스 이용 종료 또는 삭제 요청 
							시까지 보관 됩니다.</p>
					</div>
				</div> -->
				<div class="custom_terms noBorder">
					<div class="new_check_all">
						<span class="btn_check">
							<input type="checkbox" name="allagree" id="checkall" v-model="chkDelDct">
							<label for="checkall">
								<span class="vam">개인신용정보 즉시 삭제 동의</span><!-- vam 추가 20230630 jlee -->
								<div class="custom_tooltip">
									<div class="com_tooltip_type02 com_tooltip_type03">
										<a href="#nolink" class="com_btn_info" role="button">
											<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
										</a>
										<div class="com_ballon_type01 com_ballon_type02" style="display: none;">
											<div>
												삭제 하지 않은 개인신용정보는 서비스 해지 또는 삭제 요청 시까지 보관 됩니다.
												<a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
											</div> 
										</div>
									</div>
								</div>
							</label>
						</span>
					</div>
				</div>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="fn_delCon()">연결 해제(철회)</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

import MRAM2006 from '@/views/page/MR/AM/MRAM2006/MRAM2006.vue'
import MRAM2007 from '@/views/page/MR/AM/MRAM2007/MRAM2007.vue'

export default {
	name: 'MRAM2005',
	data: () => {
		return {
			orgList 		: [],	// (파라미터) 선택된 기관 리스트
			disconOrgList	: [],	// 삭제/철회할 기관 리스트
			chkDelDct		: false,// 즉시삭제 체크여부
			disconOrder		: 0,	// 삭제/철회 순번

			// 세션 체크 타이머
            sessionTimerAuthor          : null,
		}
	},
	computed: {
	},
	mixins: [
		commonMixin,
		popupMixin
	],
	created() {
		
	},
	mounted() {
		this.initComponent(this.params)
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
	},
	methods: { 
		initComponent(param = {}) {
			this.getData(param)
		},
		getData(param) {
			console.log(param)
			this.orgList = param.orgList || []	// 모창 내 선택된 기관 리스트
			
			for(let i=0; i<this.orgList.length; i++) {
				this.disconOrgList.push({
					orgC : this.orgList[i].orgObj.infOfrmnOrgC,
					orgnm : this.orgList[i].orgObj.orgnm,
					industry : this.orgList[i].orgDiv,
					isSuccess : false
				})
			}
		},
		fn_delCon() {
			console.log(this.chkDelDct)
			this.disconOrder = 0

			if(this.chkDelDct) {
				const config ={
					params : {},
					renderer : {
						component : MRAM2006
					}
				}
				modalService.openSlidePagePopup(config).then(response => {
					if(response === 'N') {
						// 정보유지 버튼 클릭
						this.startSessionTimerAuth()
						console.log("정보 유지!")
						this.fn_revDelete()
					} else if(response === 'Y') {
						this.startSessionTimerAuth()
						console.log("즉시 삭제!")
						this.fn_immeDelete()
					}
				})
			} else {
				this.startSessionTimerAuth()
				this.fn_revDelete()
			}
		},

		// 국세청 관세청 삭제 
		// industry: "public"
		// mydtCusno: "2000003755"
		// orgC: "PBAAVJ0000"
		// svcClientId: "dnpt05JOtfe9cmKzbAxXtGBt1Z5CBn0g"
		
		// 정보유지 버튼 클릭(접근토근 삭제)
		fn_revDelete() {
			const config = {
				url : '/mr/am/05s01', // "/co/am/07sa1",
				data : {
					mydtCusno 	: this.getUserInfo("mydtCusno"),
					orgC 		: this.disconOrgList[this.disconOrder].orgC,
					industry 	: this.disconOrgList[this.disconOrder].industry,
					svcClientId : this.getUserInfo("svcClientId")
				}
			}
			console.log(">>> 철회 config >>> ", config)
			apiService.call(config).then(response => {
				console.log('철회 response ### ', response)
				if(response.rsp_code == "00000") {
					this.disconOrgList[this.disconOrder].isSuccess = true

					this.disconOrder++

					if(this.disconOrgList.length == this.disconOrder) {
						console.log("끝!")
						clearInterval(this.sessionTimerAuthor)
						this.fn_moveComplete("rev")
					} else {
						this.fn_revDelete()
					}
				} else {
					modalService.alert("기관 해제에 실패하였습니다.").then(text => {
						if(text == "확인") this.close("complete")
					})
				}
			})
		},

		// 즉시삭제 버튼 클릭
		fn_immeDelete() {
			const config = {
				url : '/co/co/02sb3', //"/co/co/02sa3", 
				data : {
					orgC 			: this.disconOrgList[this.disconOrder].orgC,
					mydtCusno 		: this.getUserInfo("mydtCusno"),
					tmsBrkDelDsc 	: "2",										// 전송내역삭제구분코드 >> "1" : 탈회, "2" : 철회
					clientId 		: this.getUserInfo("svcClientId"),
				}
			}
			apiService.call(config).then(response => {
				if(response.rsp_code === "00000") {
					this.disconOrgList[this.disconOrder].isSuccess = true

					this.disconOrder++

					if(this.disconOrgList.length == this.disconOrder) {
						console.log("끝!")
						clearInterval(this.sessionTimerAuthor)
						this.fn_moveComplete("del")
					} else {
						this.fn_immeDelete()
					}
				} else {
					modalService.alert("기관 삭제에 실패하였습니다.").then(text => {
						if(text == "확인") this.close("complete")
					})
				}
			})
		},

		// 완료팝업 이동
		fn_moveComplete(disconDsc) {
			if(disconDsc === "rev") {
				// 기관 철회 (수집 정보 보관)
				const config = {
					component : MRAM2007,
					params : {
						orgList : this.disconOrgList,
						disconDsc : "rev",
					}
				}
				modalService.openPopup(config).then(response => {
					console.log(response)
					if(response === "complete") {
						this.close("complete")
					}
				})
			} else {
				// 기관 삭제 (연결 해제)
				const config = {
					component : MRAM2007,
					params : {
						orgList : this.disconOrgList,
						disconDsc : "del",
					}
				}
				modalService.openPopup(config).then(response => {
					console.log(response)
					if(response === "complete") {
						this.close("complete")
					}
				})
			}
		},

		startSessionTimerAuth() {
			this.sessionTimerAuthor = setInterval(() => {
				// 스뱅/콕뱅 로그인 연장 처리
				this.$store.dispatch('config/extendSession')
			}, 30*1000)
		}
	},
	components: {      
		
	},
	destroyed(){
        clearInterval(this.sessionTimerAuthor)
	}    
}
    
</script>