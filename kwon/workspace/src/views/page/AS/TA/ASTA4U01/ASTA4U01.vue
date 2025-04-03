<!--
/*************************************************************************
* @ 서비스경로 : 미가입자모드 > 자산
* @ 페이지설명 : 미가입자모드 > 자산
* @ 파일명     : src/views/page/AS/TA/ASTA4U01/ASTA4U01.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
________________________________________________________________________
* 2025-03-19             CS541597               최초작성
*************************************************************************/
-->
<template>
    <!-- content-view S -->
    <page class="content-view mydata2023"><!-- lnb 존재시 class hasLNB -->
		<div id="content">
			<section class="assets_main">
				<!--순자산-->
				<div class="assets_net not">
					<div class="outline">
						<h2>순자산</h2>

						<div class="custom_tooltip up">
							<div class="com_tooltip_type02 com_tooltip_type03">
								<a href="javascript:void(0);" class="com_btn_info" role="button">
									<em class="tooltip_icon_gray"><span class="blind">툴팁열기</span></em>
								</a>
							</div>
							<div class="com_ballon_type01 com_ballon_type02" style="display: none;">
								<div>
									<h3 class="h_tit03">순자산이란?</h3>
									<p>보유한 금융/실물/기타자산에 부채를 제외한 실제 자산을 의미해요.</p>
									
									<ul class="bl_dot_list">
										<li>금융자산: 예금,투자,연금,페이/포인트</li>
										<li>실물자산: 부동산 매매가 또는 보증금, 자동차 현재 시세</li>
										<li>기타자산: 직접 등록한 현금,외화,금,기타자산</li>
										<li>부채: 대출,할부금융,카드결제예정금액 등</li>
									</ul>
									<p>자산 증감은 전월말 보유 자산과 현재 자산을 비교했어요.</p>
									

									<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
								</div> 
							</div>
						</div>

						<p class="txt">아직 가입하지 않으셨네요. <a href="javascript:void(0);" class="btns" @click.prevent="fn_regService">연결</a></p>
					</div>

					<div class="board_box">
						<lottie-animation :animationData="require('@/assets_v40/images/lottie/plz_asset_join.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="plz_asset_join" ></lottie-animation>
					</div>

					<div class="mystyle">
						<a href="javascript:void(0);" @click.prevent="fn_regService"><em>한번에 등록</em>하고 쉽게 관리해보세요</a>
					</div>
				</div>

				<!--가입유도-->
				<div class="plz_join">
					<div class="board_box">
						<h2>금융자산</h2>
						<p>나는 얼마의 자산을<br>가지고 있을까요?</p>
						<a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_regService"><span class="icon_line_right">흩어진 자산을 모아보세요.</span></a>
					</div>

					<div class="board_box">
						<h2>실물자산</h2>
						<p>우리 집과 내차<br>시세를 알아보세요.</p>
						<a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_regService"><span class="icon_line_right">시세에 맞추어 관리해 보세요.</span></a>
					</div>

					<div class="board_box">
						<h2>기타자산</h2>
						<p>흩어져 있는 내 자산<br>한번에 모아볼까요?</p>
						<a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_regService"><span class="icon_line_right">똑똑한 자산관리 시작해 보세요.</span></a>
					</div>

					<div class="board_box">
						<h2>부채</h2>
						<p>결제 예정인 돈,<br>잊어서는 안되겠죠?</p>
						<a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_regService"><span class="icon_line_right">항목별로 관리할 수 있어요.</span></a>
					</div>

					<div class="board_box">
						<h2>보험료 월 납입료</h2>
						<p>이번달 보험료<br>잊지 않고 챙기세요.</p>
						<a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_regService"><span class="icon_line_right">보장내역도 바로 확인 가능해요.</span></a>
					</div>
				</div>

				<!--주목받는 콘텐츠-->
				<div class="staple_cont">
					<h2 class="h_tit01">추천 서비스</h2>

					<div class="board_box_wrap banner">
						<a href="javascript:void(0);" class="board_box staple1">
							<em>자금 흐름<br>진단</em>
						</a>
						<a href="javascript:void(0);" class="board_box staple2">
							<em>버킷리스트<br>만들기</em>
						</a>
						<a href="javascript:void(0);" class="board_box staple3">
							<em>안정적인<br>투자전략!</em>
						</a>
						<a href="javascript:void(0);" class="board_box staple4">
							<em>내 또래들은<br>얼만큼 쓸까?</em>
						</a>
					</div>

					<a href="javascript:void(0);" @click="fn_movePage('PDTA4U01')">
						<img src="@/assets_v40/images/banner/img_banner_asset_pensiton.png" alt="65세, 내가 받는 연금은 얼마일까요? 지금 바로 알아보세요." />
					</a>
				</div>

				<!--금융지식-->
				<div class="finlit">
					<h2 class="h_tit01">금융지식</h2>
					<a href="javascript:void(0);" class="btn_lots" @click.prevent="fn_movePage('COCT4001')"><span class="blind">더보기</span></a>

					<div class="scroller">
						<ul>
							<li v-for="(item, idx) in financeKlList" :key="idx">
								<a href="javascript:void(0);">
									<img :src="item.thmnlImgUrlnm" alt="" @error="emptyImg">
									<strong>{{item.cntzTinm}}</strong>
									<span class="hash" v-if="!!item.rcmKwrdCntn">#{{item.rcmKwrdCntn}}</span>
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div class="bottom">
					<a href="javascript:void(0);" class="btn_asset_edit">
						새로워진 NH콕뱅크 자산홈
						<strong>관심자산별로 구성해보세요</strong>
					</a>
					<a href="javascript:void(0);" class="btn_connect left" @click.prevent="fn_regService">NH콕마이데이터(자산관리) 가입</a><!-- 25-03-11 문구수정 -->
				</div>
				
			</section>
		</div>
		<!--// content E -->
					
		<footersV2 type="as" />
    </page>
    <!--// content-view E -->
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import LottieAnimation from 'lottie-web-vue' 

import COGU4001 from '@/views/page/CO/GU/COGU4001/COGU4001'

export default {
	name : "ASTA4U01",
	data: () => {
		return {
			financeKlList: [],	// 금융지식 목록
		}
	},
	computed : {
		
	},
	mixins: [
		commonMixin
	],
	created() {
		
	},
	mounted() {
		this.initComponent()
		
		apiService.pfmLogSend(this.$options.name)
	},
	methods: {        
		initComponent() {
			Promise.all[
				this.getFinanceKlList()
			]
		},

		getFinanceKlList() {
			this.getFinanInfo('ASTA4001', 4, false).then(response => {
                this.financeKlList = response
                // *출력값
                // -썸네일이미지URL명  = thmnlImgUrlnm
                // -글번호 = cntzId
                // -컨텐츠제목 = cntzTinm
                // -추천연령 = asetAgLrgDsnm
            })
		},
		emptyImg(e) {
			e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
		},
		/**
		 * 화면이동
		 */
		fn_movePage(pageId) {
			const config = {
				name: pageId
			}
			commonService.movePage(config)
		},
		/**
		 * 서비스 가입 팝업
		 */
		fn_regService() {
			const config = {
				component: COGU4001
			}
			modalService.openPopup(config)
		},
		
	},
	components : {
		Page,
		FootersV2,
		LottieAnimation
	}
}
</script>