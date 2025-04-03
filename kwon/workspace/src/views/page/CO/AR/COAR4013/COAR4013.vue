<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 선택정보 수집ㆍ이용 동의 재확인 팝업
* @ 페이지설명 : 선택정보 수집ㆍ이용 동의 재확인 팝업
* @ 파일명     : src/views/page/CO/AR/COAR4013/COAR4013.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-03-07
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-07              CS540685              상호금융 NH콕마이데이터 4.0 추진 개발 (COAR2013 -> COAR4013)
*************************************************************************/
-->
<template>
	<div>
		<!-- 슬라이드 팝업 시작 -->
		<div class="dimmed" style="display:block;"></div>
		<div class="popup_box">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
				<div class="popup_header">
					<h1>수집&middot;이용에 동의해 주세요</h1>
				</div>
				<div class="popup_content">
					<div class="connect_recheck">
						<div v-if="isShowTermAccount" class="recheck_group">
							<strong class="recheck_tit">적요/거래메모 수집&middot;이용 동의</strong>
							<div class="gray_box">
								<p class="title"><span class="mark">예시</span><span>예상 정기지출을 알 수 있어요</span></p>
								<div class="detail">
									<i class="ico ico_recheck_apt"></i>
									<ul>
										<li class="cate">
											<strong class="key">아파트 관리비</strong>
											<span class="val">50,000원</span>
										</li>
										<li>
											<strong class="key">MY콕통장</strong>
											<span class="val">4,285,000원</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div v-if="isShowTermFranchise" class="recheck_group">
							<strong class="recheck_tit">가맹점명/사업자등록번호 수집&middot;이용 동의</strong>
							<div class="gray_box">
								<p class="title"><span class="mark">예시</span><span>지출 관리를 할 수 있어요</span></p>
								<div class="detail">
									<i class="ico ico_recheck_food"></i>
									<ul>
										<li class="cate">
											<strong class="key">외식/카페</strong>
											<span class="val">780,000원</span>
										</li>
										<li>
											<strong class="key">MY콕통장</strong>
											<span class="val">4,285,000원</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div v-if="isShowTermCategory" class="recheck_group">
							<strong class="recheck_tit">상품구매 카테고리 수집&middot;이용 동의</strong>
							<div class="gray_box">
								<p class="title"><span class="mark">예시</span><span>소비 리포트를 확인할 수 있어요</span></p>
								<div class="detail">
									<i class="ico ico_recheck_chart"></i>
									<div class="ext">
										<span><i class="blind">주황색</i>쇼핑</span>
										<span><i class="blind">노란색</i>마트</span>
										<span><i class="blind">검은색</i>금융</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="popup_footer">
					<div class="btns_wrap">
						<button type="button" class="btns lg" @click="fn_stopProcess()">나중에</button>
						<button type="button" class="btns lg primary" @click="fn_nextProcess()">동의하고 다음</button>
					</div>
				</div>
				
				<a href="javascript:void(0)" role="button" class="btn_close" @click="close()"><span class="">닫기</span></a>
			</div>
		</div>
		<!--// 슬라이드 팝업 종료 -->
	</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

import _ from 'lodash'

export default {
    name: "COAR4013",
    data: () => {
        return {
			isShowTermAccount: false,
			isShowTermFranchise: false,
			isShowTermCategory: false,
        }
	},

	beforeMount() {
		
	},

    mounted() {
		this.initComponent(this.params);
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);    
    },

    mixins: [
		commonMixin,
        popupMixin
	],

	computed: {

	},

	watch: {
		
	},

    methods: {
        initComponent(params = {}) {
			Object.assign(this, params);

            this.getData();
        },

        getData() {
			this.$nextTick(() => {
				// 웹접근성관련 호출
				this.callJQueryWebAccessibility();
			});
		},

		fn_stopProcess() {
			this.fn_close({isAgreeOptionalTerms: false});
		},

		fn_nextProcess() {
			this.fn_close({isAgreeOptionalTerms: true});
		},

		fn_close(response = {}) {
			this.close(response);
		},

    },

    components : {

    },
}


</script>