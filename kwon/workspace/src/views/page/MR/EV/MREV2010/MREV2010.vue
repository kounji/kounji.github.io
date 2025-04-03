<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > 도움말(이벤트) > 이벤트 목록 > 일반 이벤트 응모
* @ 페이지설명 : 일반(신규가입) 이벤트 응모
* @ 파일명     : src/views/page/MR/EV/MREV2010/MREV2010.vue
* @ 작성자     : CS530689
* @ 작성일     : 2024-02-19
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2024-02-19              CS530689              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup mydata2023 ev_bdragon" id="full_popup_01">
		<!--팝업헤더-->
		<div class="popup_header">    
			<h1>이벤트 상세보기</h1>
		</div>  
		<!--//팝업헤더--> 
		<div class="popup_content">
			<div class="nlogo"><span>함께하는 100년 농협</span></div>
			<!--상단비쥬얼-->
			<div><img src="@/assets_v40/images/event/ev_bd03.png" alt="NH콕마이데이터와 함께해용 이벤트 기간 2024년 3월 11일부터 4월 10일까지 스타벅스 기프트카드 만원권 500명 증정"></div>
			<!--이벤트내용-->
			<div class="detail_box">
				<div><img src="@/assets_v40/images/event/ev_bd14.png"></div>
				<div class="detail_title">이벤트내용</div>
				<div class="rbox_inner">
					<dl>
						<dt><span></span><strong>대상 고객</strong></dt>
						<dd>기간내 NH콕마이데이터 신규 가입 후 이벤트 응모 고객</dd>
						<dt><span></span><strong>응모 방법</strong></dt>
						<dd>① NH콕마이데이터 가입<br />② 「이벤트 응모하기」버튼 클릭 후 이름, 휴대전화번호 입력</dd>
						<dt><span></span><strong>경품 내용</strong></dt>
						<dd><p>스타벅스 쿠폰 이미지</p><strong>스타벅스 e-gift card <em>1만원(500명)</em></strong></dd>
						<dt><span></span><strong>당첨자 발표</strong></dt>
						<dd>NH콕뱅크 당첨자 발표 페이지 명단 게시(4월 중 예정)</dd>
						<dt><span></span><strong>경품 발송</strong></dt>
						<dd>이벤트 응모시 입력한 고객 휴대전화번호로 발송</dd>
					</dl>
					<a href="javascript:void(0);" role="button" :class="`btnEventApply `+btnState" title="이벤트 응모하기" @click="agreePopup">이벤트 응모하기</a>
				</div>
				<div><img src="@/assets_v40/images/event/ev_bd19.png"></div>
			</div>
			<!--이벤트 유의사항-->
			<div class="notice_box">
				<div class="notice_inner">
					<strong>이벤트 유의사항</strong>
					<ul>
						<li>해당 이벤트는 응모 요건 충족 고객을 대상으로 합니다.
							<ul>
								<li> * 응모요건
									<ul>
										<li>1) NH콕마이데이터 신규 가입 후 이벤트 응모 고객<br />
										※ NH콕마이데이터 신규 가입 : 첫 가입 및 해지 1년 후 재가입 고객<br />
										※ 이벤트 응모 고객 : 이름·휴대전화번호 입력 완료 고객</li>
										<li>2) NH콕마이데이터 가입 고객 대상 추첨</li>
									</ul>
								</li>
							</ul>
						</li>
						<li>이벤트 당첨 발표 시까지 응모 요건을 유지하지 않을 경우 당첨이 취소될 수 있습니다.</li>
						<li>이벤트 응모 후 입력 정보(이름, 휴대전화번호) 변경 및 삭제는 불가합니다.</li>
						<li>휴대전화번호 오류 및 수령거부 등 고객 사유로 기간내 경품 미사용시 당첨이 취소될 수 있습니다.</li>
						<li>경품의 유효기간 연장, 재발송 및 환불은 불가합니다.</li>
						<li>유의사항을 충분히 숙지하지 않아 발생하는 문제에 대해 책임지지 않습니다.</li>
						<li>기타 자세한 내용은 가까운 영업점 또는 전용 고객센터(1600-2800)로 문의 바랍니다.</li>
						<li>본 이벤트는 공급 사정에 따라 변경 또는 중단될 수 있습니다.</li>
					</ul>
				</div>
				<p>농협로고</p>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click="close('MREV2010')"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
// import commonService from '@/service/commonService'
import {mapActions} from 'vuex'
import {dateFormat} from '@/utils/date'

import MREV2005 from '@/views/page/MR/EV/MREV2005/MREV2005'

export default {
    name : "MREV2010",
    data: () => {
        return {
			mydtEvtSqno : '',	//이벤트 일련번호
			evtInfo : [],		//이벤트 정보
			name : '',			//응모자 이름
			telNo : '',			//응모자 전화번호
			psnInfAgrYn :	'',	//응모자 개인정보 동의여부
			btnState : '',		//버튼 상태
        }
    },
	computed: {
    },
    mounted() {
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        initComponent() {
			this.mydtEvtSqno = this.params.mydtEvtSqno

			this.getData()	
		},
		//이벤트 정보조회
        getData() {
			const config = {
				url: '/mr/ev/11r01', 
				data: {
					"mydtCusno" : this.getUserInfo('mydtCusno'),
					"mydtEvtSqno" : this.mydtEvtSqno,
				},
				// disableLoading : true,
			}

			apiService.call(config).then(res =>{
				console.log('response: ', res)
				this.evtInfo = res
				const today = dateFormat(new Date(), "YYYYMMDDhhmm")
		
				if(res.evtStsc == "0" || today > (res.edDt + res.edHr)){
					modalService.alert("종료된 이벤트 입니다.").then(()=>{this.close()})
				}

				if(res.tryCnt >= res.maxErlNt){
					this.btnState = 'btn_off'
				}
			})
			
		},
		// 서비스 동의팝업
        agreePopup() {
			const today = dateFormat(new Date(), "YYYYMMDDhhmm")
			
			if(today > (this.evtInfo.edDt + this.evtInfo.edHr)){
				modalService.alert("종료된 이벤트 입니다.").then(()=>{this.close()})
			}else{
				const config = {
					component : MREV2005,
					params : {
						refCntn : this.evtInfo.refCntn
					}
				}
				
				modalService.openPopup(config).then((res) => {				
					if(res.agreePersonalInfo){
						this.name = res.name
						this.telNo = res.telNo
						this.psnInfAgrYn = (res.agreePersonalInfo ? '1' : '0')
						this.fn_regEvent()
					}
				});
			}
		},
		//응모하기
		fn_regEvent(){
			const config = {
				url: '/mr/ev/11s01', 
				data: {
					"mydtCusno" : this.getUserInfo('mydtCusno'),
					"mydtEvtSqno" : this.mydtEvtSqno,
					"name" : this.name,
					"telNo" : this.telNo,
					"psnInfAgrYn" : this.psnInfAgrYn
				},
				// disableLoading : true,
			}
			apiService.call(config).then(response =>{
				console.log('response: ', response)

				if(response.rsp_code == "0000"){
					modalService.alert('응모 되었습니다.').then(() => {})
				}else if(response.rsp_code === '9991'){
					modalService.alert('이미 응모(횟수 초과) 하였습니다.').then(() => {})
				}else if(response.rsp_code === '9992'){
					modalService.alert('당일 응모 건이 존재합니다.').then(() => {})
				}else if(response.rsp_code === '9997'){
					modalService.alert('이벤트 기간이 아닙니다.').then(() => {this.close()})
				}else{   //9998 : 없는 응모방식/로직오류, 9999:응모에러
					modalService.alert("오류가 발생 하였습니다. 오류코드[" + response.rsp_code + "]").then(() => {});
				}

				this.getData()
			})
		},
    },
    components : {

    },
    destroyed() {
    }
}

</script>