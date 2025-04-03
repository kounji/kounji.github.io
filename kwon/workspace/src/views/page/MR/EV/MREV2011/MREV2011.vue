<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > 도움말(이벤트) > 이벤트 목록 > 일반 이벤트 응모
* @ 페이지설명 : 일반 이벤트(추석소원빌기) 응모
* @ 파일명     : src/views/page/MR/EV/MREV2011/MREV2011.vue
* @ 작성자     : CS530689
* @ 작성일     : 2024-08-29
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2024-08-29              CS530689              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup mydata2023 ev_rice" id="full_popup_01">
		<!--팝업헤더-->
		<div class="popup_header">    
			<h1>이벤트 상세보기</h1>
		</div>  
		<!--//팝업헤더--> 
		<div class="popup_content">
			<img src="@/assets_v40/images/event/ev_rice01.png" alt="NH콕 뱅크와 NH콕 마이데이터가 함께하는 한가위 행복채움 이벤트">
            <img src="@/assets_v40/images/event/ev_rice02.png" alt="콕뱅크 쓰고! 콕마이데이터쓰고! 쌀로 행복 채우고! 이벤트기간 2024년 9월 13일부터 2024년 10월 25일까지">
			<div class="say">
				<div class="ibox">
					<div class="inbox">
						<p class="top"></p>
						<p class="middle">
							<label for=""></label><input type="text" id="refNo1Cntn" ref="refNo1CntnRef" class="" v-model="refNo1Cntn" placeholder="소원을 최소 열자 이상 입력해주세요." @focus="onFocus" @blur="onBlur" title="">
						</p>
					</div>
					<p class="bottom"></p>
				</div>
				<div :class="`saybtn `+btnState">
					<a href="javascript:void(0)" @click="agreePopup">소원을 말해봐!</a>
				</div>
			</div>
			<img src="@/assets_v40/images/event/ev_rice08.png" alt="쌀자루 앞에 벼 이삭을 들고 있는 농부 무럭이 이미지">
			<div class="rice_detail">
				<img src="@/assets_v40/images/event/ev_rice09.png" alt="">
				<div class="rice_detail_inner">
					<div>
						<dl>
							<dt><span>대상 고객</span></dt>
							<dd>NH콕마이데이터 신규 가입 고객</dd>
						</dl>
						<dl>
							<dt><span>응모 방법</span></dt>
							<dd>10자 이상 소원 입력하고 「소원을 말해봐!」 버튼 클릭 (이벤트 응모)</dd>
						</dl>
						<dl>
							<dt><span>경품 안내</span></dt>
							<dd>한토래 우리쌀 세트 (670명 랜덤 추첨)</dd>
						</dl>
						<p><img src="@/assets_v40/images/event/ev_rice13.png" alt=""></p>
						<dl>
							<dt><span>당첨자 발표</span></dt>
							<dd>콕마이데이터 당첨자 발표 게시판 등재<br /> (11월 초 예정)</dd>
						</dl>
						<dl>
							<dt><span>경품 발송</span></dt>
							<dd>①&nbsp;&nbsp;이벤트 응모한 휴대전화번호로 링크 전송<br />②&nbsp;&nbsp;링크 접속 후 주소 입력<br />③&nbsp;&nbsp;입력 주소로 경품 발송</dd>
						</dl>
					</div>
				</div>
				<img src="@/assets_v40/images/event/ev_rice11.png" alt="">
			</div>
			<div class="rice_notice">
				<div class="rice_notice_inner">
					<strong>이벤트 유의사항</strong>
					<div>
						<ul>
							<li>해당 이벤트는 NH콕마이데이터 가입 고객을 대상으로 합니다.</li>
							<li>이벤트 당첨자 발표 전 서비스 탈퇴 시 당첨이 취소됩니다.</li>
							<li>이벤트 응모 후 입력 정보(이름, 휴대전화번호, 주소) 변경 및 삭제는 불가합니다.</li>
							<li>상기 이벤트 당첨자 중 연락처 불능, 고객 정보 오류, 수령거절 등 고객 사유로 경품 미수령 시 당첨이 취소됩니다.</li>
							<li>경품의 재발송 및 환불은 불가합니다.</li>
							<li>유의사항을 충분히 숙지하지 않아 발생하는 문제에 대해 책임지지 않습니다.</li>
							<li>상기 이벤트는 공급 사정에 따라 변경 또는 중단 될 수 있습니다.</li>
							<li>기타 자세한 내용은 가까운 영업점 또는 전용 고객센터(1600-2800)로 문의 바랍니다.</li>
						</ul>
					</div>
					<p class="logo"><img src="@/assets_v40/images/event/ev_rice14.png" alt="농협로고"></p>
				</div>
			</div>
        </div>
		<a href="javascript:void(0);" class="btn_close" @click="close('MREV2011')"><span class="blind">팝업닫기</span></a>
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
    name : "MREV2011",
    data: () => {
        return {
			mydtEvtSqno : '',	//이벤트 일련번호
			evtInfo : [],		//이벤트 정보
			name : '',			//응모자 이름
			telNo : '',			//응모자 전화번호
			psnInfAgrYn :	'',	//응모자 개인정보 동의여부
			btnState : '',		//버튼 상태
            refNo1Cntn : '',    //소원내용
            refNo1CntnRef : '',    //소원내용Ref
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
			
			if(this.btnState === 'btn_off' ){
                modalService.alert("이미 응모 하였습니다.").then(()=>{})
            }else if(today > (this.evtInfo.edDt + this.evtInfo.edHr)){
				modalService.alert("종료된 이벤트 입니다.").then(()=>{this.close()})
			}else if(this.refNo1Cntn.trim().length == 0 || this.refNo1Cntn.trim().length < 10){
                modalService.alert("소원을 최소 열자 이상 입력해주세요.").then(()=>{
                    this.$nextTick(() => {
                        this.$refs.refNo1CntnRef.focus()
                    })
                })
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
					"psnInfAgrYn" : this.psnInfAgrYn,
                    "refNo1Cntn" : this.refNo1Cntn
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
        onFocus(){
            this.$refs.refNo1CntnRef.placeholder = ''
        },
        onBlur(){
            this.$refs.refNo1CntnRef.placeholder = '소원을 최소 열자 이상 입력해주세요.'
        },
    },
    components : {

    },
    destroyed() {
    }
}

</script>