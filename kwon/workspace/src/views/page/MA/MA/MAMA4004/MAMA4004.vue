<!--
/*************************************************************************
* @ 서비스경로 : 홈 > 캐릭터 설정
* @ 페이지설명 : 홈 > 캐릭터 설정
* @ 파일명     : src/views/page/MA/MA/MAMA4004/MAMA4004.vue
* @ 작성자     : CS540687
* @ 작성일     : 2025-03-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-06              CS540687              최초작성
*************************************************************************/
-->
<template>
      

	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01">

		<div class="popup_header">
			<h1>캐릭터 설정</h1>
		</div>

		<div class="popup_content">

			<section class="set_cont">
				<h2 class="headline"><strong>나만의 캐릭터를<br>프로필로 설정해 보세요.</strong></h2>
				<div class="char_list">
					<ul>
						<li>
							<input type="radio" name="myAvatar" id="myAvatarId01" :checked="myAvatarId === 'myAvatarId01'" @change.prevent="fn_myAvatarChoice($event, 'myAvatarId01')">
							<label for="myAvatarId01">
								<strong>금융멘토</strong>
								<span>안정적이고 지속적인 성장</span>
							</label>
						</li>
						<li>
							<input type="radio" name="myAvatar" id="myAvatarId02" :checked="myAvatarId === 'myAvatarId02'" @change.prevent="fn_myAvatarChoice($event, 'myAvatarId02')">
							<label for="myAvatarId02">
								<strong>디지털금융달인</strong>
								<span>신속, 정확한 금융달인</span>
							</label>
						</li>
						<li>
							<input type="radio" name="myAvatar" id="myAvatarId03" :checked="myAvatarId === 'myAvatarId03'" @change.prevent="fn_myAvatarChoice($event, 'myAvatarId03')">
							<label for="myAvatarId03">
								<strong>저축왕</strong>
								<span>작은 돈이 큰 돈 된다</span>
							</label>
						</li>
						<li>
							<input type="radio" name="myAvatar" id="myAvatarId04" :checked="myAvatarId === 'myAvatarId04'" @change.prevent="fn_myAvatarChoice($event, 'myAvatarId04')">
							<label for="myAvatarId04">
								<strong>투자천재</strong>
								<span>미래를 키우는 투자</span>
							</label>
						</li>
						<li>
							<input type="radio" name="myAvatar" id="myAvatarId05" :checked="myAvatarId === 'myAvatarId05'" @change.prevent="fn_myAvatarChoice($event, 'myAvatarId05')">
							<label for="myAvatarId05">
								<strong>절약마스터</strong>
								<span>아낄수록 더 풍요롭게</span>
							</label>
						</li>
						<li>
							<input type="radio" name="myAvatar" id="myAvatarId06" :checked="myAvatarId === 'myAvatarId06'" @change.prevent="fn_myAvatarChoice($event, 'myAvatarId06')">
							<label for="myAvatarId06">
								<strong>보험수호자</strong>
								<span>예상 밖을 대비한다</span>
							</label>
						</li>
						<li>
							<input type="radio" name="myAvatar" id="myAvatarId08" :checked="myAvatarId === 'myAvatarId08'" @change.prevent="fn_myAvatarChoice($event, 'myAvatarId08')">
							<label for="myAvatarId08">
								<strong>신용지킴이</strong>
								<span>신용이 곧 재산이다</span>
							</label>
						</li>
						<li>
							<input type="radio" name="myAvatar" id="myAvatarId09" :checked="myAvatarId === 'myAvatarId09'" @change.prevent="fn_myAvatarChoice($event, 'myAvatarId09')">
							<label for="myAvatarId09">
								<strong>대출코치</strong>
								<span>똑똑하게 빌리고 갚자</span>
							</label>
						</li>
					</ul>
				</div>
			</section>

		</div>

		<div class="popup_footer fixed">
			<div class="btns_wrap">
				<button type="button" class="btns lg primary" @click.prevent="setData()">저장하기</button>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
// import {mapGetters} from 'vuex'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'


    export default {
        name : "MAMA4004",
        data: () => {
            return {
				myAvatarId : 'myAvatarId01',
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        computed : {
        },
        mounted() {
            this.initComponent()
        },
        methods: {
            initComponent() {
				
				// 나의 캐릭터
				let tmpMyAvatarId = commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'myAvatarId') 
				
				console.log("initComponent : tmpMyAvatarId =================>", this.tmpMyAvatarId)
				if (tmpMyAvatarId !== undefined) {
					this.myAvatarId = tmpMyAvatarId
				} else  {
					this.myAvatarId = 'myAvatarId01'
				}
				console.log("initComponent : myAvatarId =================>", this.myAvatarId)
            },
			setData(){
				console.log("setData ================>", this.myAvatarId)
				commonService.setStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'myAvatarId', this.myAvatarId)				
				this.close({isSave: true})
			},
			fn_myAvatarChoice(e, targetId){
				let tmp = e.target.checked ? 1 : -1; // 1:체크,-1:체크해제
				this.myAvatarId = targetId;
				
				console.log("fn_myAvatarChoice ================>", this.myAvatarId)
			},

			// 페이지 이동
            fn_close() {
                this.close({isSave: false})
            },
        }
    }
</script>