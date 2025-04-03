<!--
/*************************************************************************
* @ 서비스경로 : 이벤트/이용안내 > 친구초대
* @ 페이지설명 : 이벤트/이용안내 > 친구초대
* @ 파일명     : src/views/page/MR/EV/MREV4041/MREV4041.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-26
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-26              CS541013              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>친구초대</h1>
		</div>

		<div class="popup_content">
		
			<section class="friend_intro">
				<div class="intro">
					<h2 class="title">우리 콕!<br>마이데이터 해요~</h2>
					<p>콕!마이데이터를 많은 친구에게 소개해 주세요~</p>
					<div class="code">
						<p>초대 코드</p>
						<button type="button" @click.prevent="copyRcmCd">{{rcmCd}}</button>
					</div>
				</div>

				<div class="info">
					<p>초대한 친구가 링크를 통해 초대아이디를 입력하여 NH콕마이데이터에 가입하면 흩어져있는 자산을 체계적으로 관리할 수 있습니다.</p>
					<p class="dot">서비스기간 : 2025.06.01~2026.12.31</p>
				</div>
				
				<div class="proc_list">
					<p class="title">참여방법</p>
					<ol>
						<li>
							<span>STEP 01</span>
							<p>친구초대하기 버튼을 누르세요.</p>
						</li>
						<li>
							<span>STEP 02</span>
							<p>공유방식 선택 후 문자메시지나 카카오톡으로 친구를 초대하세요.</p>
						</li>
						<li>
							<span>STEP 03</span>
							<p>초대받은 친구가 NH콕뱅크 로그인 후 마이데이터 가입을 완료하면 초대가 완료됩니다.</p>
						</li>
					</ol>
				</div>

				<details class="ico_detail_noti" open>
					<summary><strong>알아두세요</strong></summary>
					<div class="cont">
						<ul class="dotted_list">
							<li>친구초대하기로 친구에게 초대메시지를 전송하여 콕!마이데이터를 가입할 수 있습니다.</li>
							<li>초대받은 친구가 마이데이터 탈퇴 후 1년이 초과되지 않은 상태에서 재가입할 경우, 혜택은 없습니다.</li>
							<li>친구초대 서비스는 추후 변경될 수 있습니다.</li>
							<li>콕!마이데이터 친구초대 관련 문의사항은 고객센터로 문의해 주세요.</li>
						</ul>
					</div>
				</details>
			</section>
			
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<button type="button" class="btns lg primary" @click.prevent="shareRcmCd">친구초대하기</button>
			</div>
		</div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import userService from '@/service/userService'
import commonService from '@/service/commonService'

export default {
    name: "MREV4041",
    data: () => {
        return {
            rcmCd : ""
        }
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param) {
            this.getData()
        },
        // 내 추천인 코드 조회
        getData() {
            const config = {
                url: '/mr/ev/41r01',
                data: {
                    mydtCusno   : this.getUserInfo("mydtCusno")
                }
            }
            apiService.call(config).then(response => {
                if(response.invtYn == "Y") {
                    this.rcmCd = response.invtCNo
                }
				else {
					const config = {
						url: '/mr/ev/41s01',
						data: {
							mydtCusno   : this.getUserInfo("mydtCusno")
						}
					}
					apiService.call(config).then(response => {
						if(response.invtYn == "Y") {
							this.rcmCd = response.invtCNo
						}
					})
				}
            })
        },
		shareRcmCd() {
			let txt = "";

			const config = {
                params: { // 파라미터
                    title : "공유하기",
                    text  : txt
                },
            }
            
            modalService.webSharePopup(config).then(response => {

            })
		},
		copyRcmCd() {
			navigator.clipboard.writeText(this.rcmCd)	// 초대코드 복사
		},
    },
	mixins: [
        popupMixin,
        commonMixin
    ],
}
</script>