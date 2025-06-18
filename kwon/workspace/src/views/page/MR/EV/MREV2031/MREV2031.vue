<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > 도움말(이벤트) > 이벤트 > 퀴즈 이벤트 응모
* @ 페이지설명 : 퀴즈(콕마이데이터) 이벤트 응모
* @ 파일명     : src/views/page/MR/EV/MREV2030/MREV2030.vue
* @ 작성자     : CS530689
* @ 작성일     : 2024-04-18
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2024-04-18              CS530689              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
    <div class="full_popup mydata2023 ev_coke" id="full_popup_01"> 
        <div class="popup_header">
            <h1>이벤트 상세보기</h1>
            <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
        </div>
        
        <div class="popup_content">
          <img src="@/assets_v40/images/event/ev_coke01.png" alt="600만 달성했다콕! 초성 퀴즈 이벤트 이벤트 기간 2025년 4월 7일부터 2025년 4월 18일까지">
          <div class="coke_wrap">
          <div class="quiz">
            <div class="tit">문제</div>
            <div class="txt">
              상호금융업권 최초 마이데이터사업 개시,<br />가입자 수 600만을 달성한 콕뱅크 자산관리서비스는?
              <div><strong>NH</strong> <span><em>ㅋ</em><em>ㅁ</em><em>ㅇ</em><em>ㄷ</em><em>ㅇ</em><em>ㅌ</em></span></div>
            </div>
            <div class="tit answer">정답은?</div>
            <div class="answer_w">
              <p>
                <label for="txt01"></label><input type="text" id="answer1" class="" placeholder="여" title="여" maxlength="1" @keydown.backspace="previousWord(1)" @keydown.enter="nextWord(2)">
						<label for="txt02"></label><input type="text" id="answer2" class="" placeholder="섯" title="섯" maxlength="1" @keydown.backspace="previousWord(2)" @keydown.enter="nextWord(3)">
						<label for="txt03"></label><input type="text" id="answer3" class="" placeholder="글" title="글" maxlength="1" @keydown.backspace="previousWord(3)" @keydown.enter="nextWord(4)">
						<label for="txt04"></label><input type="text" id="answer4" class="" placeholder="자" title="자" maxlength="1" @keydown.backspace="previousWord(4)" @keydown.enter="nextWord(5)">
						<label for="txt05"></label><input type="text" id="answer5" class="" placeholder="입" title="입" maxlength="1" @keydown.backspace="previousWord(5)" @keydown.enter="nextWord(6)">
						<label for="txt06"></label><input type="text" id="answer6" class="" placeholder="력" title="력" maxlength="1" @keydown.backspace="previousWord(6)" @keydown.enter="nextWord(1)">
              </p>
              <a href="javascript:void(0)" @click="confirmAnswer()">정답 확인</a>
            </div>
          </div>
          <div class="detail_coke">
            <div>
              <dl>
                <dt>대상 고객</dt>
                <dd>NH콕마이데이터 <em>신규가입</em> 및 이용 고객 </dd>
              </dl>
              <dl>
                <dt>응모 방법</dt>
                <dd><img src="@/assets_v40/images/event/ev_coke14.png" alt="1"> 초성퀴즈 도전!<br /><img src="@/assets_v40/images/event/ev_coke15.png" alt="1">정답 확인 후 응모하기 버튼 클릭(정보 입력)</dd>
              </dl>
              <dl>
                <dt>경품 내용</dt>
                <dd>600명 랜덤 추첨</dd>
              </dl>
              <div class="star">
                <div class="say">
                  <p>
                    <span class="new">신규가입 고객 <em>300명</em></span> 
                    <span class="old">기존이용 고객 <em>300명</em></span>
                  </p>
                </div>
                <div class="coffee">
                  <p>스타벅스 모바일 상품권 <br /><em>600명 증정</em></p>
                </div>
              </div>
              <dl>
                <dt>당첨자 발표</dt>
                <dd>콕뱅크 당첨자발표 게시판 등재(5월말 예정)</dd>
              </dl>
              <dl>
                <dt>경품 발송</dt>
                <dd>이벤트 응모 시 입력한 휴대전화번호로 발송</dd>
              </dl>
              <a href="javascript:void(0)" @click="agreePopup()" :class="btnState">응모{{btnState == 'dis' ? '완료' : '하기'}}</a>
            </div>
          </div>
          <div class="notice">
            <strong>이벤트 유의사항</strong>
            <div>
              <ul>
                <li>해당 이벤트는 NH콕마이데이터 가입 고객을 대상으로 합니다.</li>
                <li>이벤트 당첨자 발표 전 서비스 탈퇴 시 당첨이 취소됩니다.</li>
                <li>이벤트 응모 후 응모 정보(이름, 휴대전화번호) 변경 및 삭제는 불가합니다.</li>
                <li>상기 이벤트 당첨자 중 연락처 불능, 수령거절 등 고객사유로 경품 미수령 시<br />당첨이 취소됩니다. </li>
                <li>경품의 유효기간 연장, 재발송 및 환불은 불가합니다.</li>
                <li>중복 당첨 불가합니다.</li>
                <li>유의사항을 충분히 숙지하지 않아 발생하는 문제에 대해 책임지지 않습니다.</li>
                <li>상기 이벤트는 공급 사정에 따라 변경 또는 중단 될 수 있습니다.</li>
                <li>기타 자세한 내용은 가까운 영업점 또는 전용 고객센터(1600-2800)로<br />문의 바랍니다.</li>
              </ul>
            </div>
          </div>
          <p class="logo" ref="bottomLogo"><img src="@/assets_v40/images/event/ev_word_10.png" alt="농협로고"></p>
        </div>
        </div>
        <!-- <div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" :disabled="!fn_chkValid" :aria-disabled="!fn_chkValid" :class="`btn btn_mint ${!fn_chkValid ? 'btn_off' : ''}`" role="button" @click.prevent="agreePopup()">응모하기</a>
			</div>
		</div> -->
        <a href="javascript:void(0);" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>
    </div>
    <!--// full popup E -->
</template>
<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import {dateFormat} from '@/utils/date'

import MREV2005 from '@/views/page/MR/EV/MREV2005/MREV2005'     //이용약관 동의



export default {
    name : "MREV2031",
    data: () => {
        return {
            mydtEvtSqno : 0,    //이벤트 일련번호
            evtInfo : [],    //이벤트 정보
            quizInfo : 0,   //퀴즈 항목정보
            name : '',   //이름
            telNo : '',  //전화번호
            psnInfAgrYn : false,     //서비스 동의여부
            quizAnswer : '',    //퀴즈 답변
            checkAnwser : false, //퀴즈 정답여부
            btnState : '',  //응모 여부 버튼 상태
        }
    },
    computed: {
        //응모버튼여부
        fn_chkValid(){
            console.log('this.quizAnswer : ', this.quizAnswer)
                return this.quizAnswer && this.evtInfo.tryCnt < this.evtInfo.maxErlNt
        }
    },
    created: () => {
        
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.popInit(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    watch: {
    },
    methods: {
        popInit(param = {}) {
            console.log('param : ', param)
            this.mydtEvtSqno = param.mydtEvtSqno
            this.getData()
        },
        getData(){
            this.getEvtInfo()
            this.getQuizInfo()
        },
        //이벤트 정보 조회
        getEvtInfo(){
            const config = {
                url: '/mr/ev/11r01', 
                data: {
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                    "mydtEvtSqno" : this.mydtEvtSqno,
                },
            }
            apiService.call(config).then(res =>{
                console.log('evtInfo res: ', res)
                this.evtInfo = res

                const today = dateFormat(new Date(), "YYYYMMDDhhmm")
		
				if(res.evtStsc == "0" || today > (res.edDt + res.edHr)){
					modalService.alert("종료된 이벤트 입니다.").then(()=>{this.close()})
				}

                if(res.tryCnt >= res.maxErlNt){
					this.btnState = 'dis'
				}
            })
        },
        //퀴즈정보 조회
        getQuizInfo(){
            const config = {
                url: '/mr/ev/14r01', 
                data: {
                    "mydtEvtSqno" : this.mydtEvtSqno,
                },
            }
            apiService.call(config).then(res =>{
                console.log('quizInfo res: ', res)
                if(res.rsp_code !== '0000'){
                    modalService.alert("퀴즈정보 오류[" + res.rsp_code + "]").then(() => {});
                }else{
                    this.quizInfo = res.quizEst
                }
            })
        },
        previousWord(num){
            if(num > 1 && document.getElementById("answer" + num).value === ""){
                document.getElementById("answer" + (num - 1)).focus()
            }
        },
        nextWord(num){
            document.getElementById("answer" + num).focus()
        },
        confirmAnswer(){
            const answer = document.getElementById("answer1").value + document.getElementById("answer2").value + document.getElementById("answer3").value
                         + document.getElementById("answer4").value + document.getElementById("answer5").value + document.getElementById("answer6").value
            
            if(this.quizInfo.answCntn != answer){
                this.checkAnwser = false
                modalService.alert("정답을 다시 확인해주세요.").then(()=>{
                    document.getElementById("answer01").focus()
                })
            }else{
                this.checkAnwser = true  
                modalService.alert("정답입니다. 응모하기를 해주세요.").then(()=>{
                    this.scrollToBottom()
                })
            }
        },
        //서비스 이용동의 팝업
        agreePopup(){
            if(this.btnState === 'dis'){
                modalService.alert("이미 응모 하셨습니다.").then(()=>{})
                return;
            }
            
            const today = dateFormat(new Date(), "YYYYMMDDhhmm")
			
			if(today > (this.evtInfo.edDt + this.evtInfo.edHr)){
				modalService.alert("종료된 이벤트 입니다.").then(()=>{this.close()})
			}else{
                if(!this.checkAnwser){
                    modalService.alert("정답 확인을 해주세요.").then(()=>{})
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
        closePage() {
            clearTimeout(this.timer)    //돌리는 도중 닫기시 타이머 함수 호출 취소
            this.close()
        },
        scrollToBottom() {
            this.$refs.bottomLogo.scrollIntoView({behavior: "smooth"})
        }
        
    },
}
</script>