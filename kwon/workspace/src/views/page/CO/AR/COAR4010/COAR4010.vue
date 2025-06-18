<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번에 > 한번에 연결 완료
* @ 페이지설명 : 한번에 > 한번에 연결 완료
* @ 파일명     : src/views/page/CO/AR/COAR4010/COAR4010.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-04-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-04-04              CS540685              상호금융 NH콕마이데이터 4.0 추진 개발
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>자산연결</h1>
		</div>
		
		<div class="popup_content">
			<div class="asset_connect result">
				<div class="result_box complete">
					<div class="bg">
						<lottie-animation
							:animationData="require('@/assets_v40/images/lottie/bg_connect_complete.json')"
							:loop="true"
							:auto-play="true"
							aria-hidden="true"
							class="bg_no_result"
							background="transparent">
						</lottie-animation>
					</div>
					<p>자산연결을 완료하였습니다</p>
				</div>

				<div class="connect_status" v-if="succOrgList.length > 0">
					<div class="tit_area">
						<strong class="tit">연결 완료 기관 <em>{{succOrgList.length}}</em></strong>
					</div>
					<ul class="between_list">
						<li v-for="(item, idx) in succOrgList" :key="idx">
							<div>
								<i :class="'ico_bank ' + item.orgC"></i>
								<strong class="bank_name">{{item.orgnm}}</strong>
							</div>
							<!-- <div>
								<span class="status">성공</span>
							</div> -->
						</li>
					</ul>
				</div>

				<div class="connect_status" v-if="failOrgList.length > 0">
					<div class="tit_area">
						<strong class="tit">연결할 수 없는 기관 <em>{{failOrgList.length}}</em></strong>
					</div>
					<div class="gray_box">
						<p class="dotted_list">연결 시도 기관이 점검중 또는 일시적 오류일 수 있으니 재시도 후에도 연결이 되지 않을 시 해당 기관에 문의해주세요.</p>
					</div>
					<ul class="between_list">
						<li v-for="(item, idx) in failOrgList" :key="idx">
							<div>
								<i :class="'ico_bank ' + item.orgC"></i>
								<strong class="bank_name">{{item.orgnm}}</strong>
							</div>
							<!-- <div>
								<span class="status fail">실패</span>
							</div> -->
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btns_wrap" v-if="failOrgList.length > 0 && succOrgList.length <= 0">
				<button type="button" class="btns lg primary" @click="fn_assetReconnect()">연결기관 다시 선택하기</button>
			</div>
			<div class="btns_wrap" v-else>
				<button type="button" class="btns lg primary" @click="fn_assetComplete()">확인</button>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="fn_close({'mode': 'close'})"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import routerService from '@/service/routerService'
import apiService from '@/service/apiService'
import {mapActions} from 'vuex'
import LottieAnimation from 'lottie-web-vue'
import _ from 'lodash'

export default {
    name : "COAR4010",
    data: () => {
        return {
			succOrgList 	: [],
			failOrgList 	: [],
        }
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
	computed:{
	},
    methods: {
		...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfoByFirst'
        ]),

        initComponent(params = {}) {
			this.succOrgList = params.succOrgList || [];
			this.failOrgList = params.failOrgList || [];
            
			this.getData();
        },
        getData() {
			this.succOrgList = _.chain(this.succOrgList)
								.orderBy('orgC', 'desc')
								.value();

			this.failOrgList = _.chain(this.failOrgList)
								.orderBy('orgC', 'desc')
								.value();
			
			this.getAllMyAssetInfoByFirst(); // 2024.01.09,sungchul,자산요구 직후 비정기 수집
			this.getMyBizRegInfo();
		},

		// 연결완료 또는 닫기 버튼 클릭
		fn_assetComplete() {
			this.fn_close({"mode": "complete"});
		},

		fn_assetReconnect() {
			this.fn_close({"mode": "reconnect"})
		},

		fn_close(response = {}) {
			this.close(response);
		},
		
    },

    components : {
		LottieAnimation
    },
}


</script>