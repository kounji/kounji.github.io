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

						<p class="txt">아직 가입하지 않으셨네요. <a href="javascript:void(0);" class="btns" @click.prevent="fn_openPopup('COAS4001')">가입</a></p>
					</div>

					<div class="board_box">
						<lottie-animation :animationData="require('@/assets_v40/images/lottie/plz_asset_join_2.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="plz_asset_join" ></lottie-animation>
						<p class="blind">NH콕마이데이터(자산관리) 이용 하면 자산변동 내역을 확인할 수 있어요.</p>
					</div>

					<div class="mystyle">
						<a href="javascript:void(0);" @click.prevent="fn_openPopup('COAS4001')"><em>효율적인 </em>자산관리 지금 시작하기</a>
					</div>
				</div>

				<!--가입유도-->
				<div class="plz_join">
					<div class="board_box">
						<h2>금융자산</h2>
						<p>든든한 친구같은 금융자산,<br>얼마나 모였을까요?</p>
						<a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openPopup('COAS4001')"><span class="icon_line_right">NH콕마이데이터(자산관리)시작하기</span></a>
					</div>

					<div class="board_box">
						<h2>실물자산</h2>
						<p>우리 집 실거래가, 관심 부동산<br>매매시세, 내 차 시세까지 한번에 관리</p>
						<a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openPopup('COAS4001')"><span class="icon_line_right">가입하고 시세맞춤 관리 시작하기</span></a>
					</div>

					<div class="board_box">
						<h2>기타자산</h2>
						<p>금, 외화, 현금, 농기계 모두 등록하면<br>자산진단이 더 정확해져요.</p>
						<a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openPopup('COAS4001')"><span class="icon_line_right">가입하고 자산진단 받아보기</span></a>
					</div>

					<div class="board_box">
						<h2>부채</h2>
						<p>부채는 잘 관리할 수록<br>안정된 경제생활을 할 수 있어요.</p>
						<a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openPopup('COAS4001')"><span class="icon_line_right">가입하고 체계적으로 관리하기</span></a>
					</div>

					<div class="board_box">
						<h2>월 납입 보험료</h2>
						<p>흩어진 보험, 한곳에모아<br>한눈에 관리해보세요.</p>
						<a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openPopup('COAS4001')"><span class="icon_line_right">가입하고 보험 보장내역까지 확인하기</span></a>
					</div>
				</div>

				<!--주목받는 콘텐츠-->
				<div class="staple_cont">
					<h2 class="h_tit01">추천 서비스</h2>

					<div class="board_box_wrap banner">
						<a href="javascript:void(0);" class="board_box staple1" @click.prevent="fn_openPopup('COTP0004')">
							<em>자금 흐름<br>진단</em>
						</a>
						<a href="javascript:void(0);" class="board_box staple2" @click.prevent="fn_movePage('LCTA4U01')"> 
							<em>버킷리스트<br>만들기</em>
						</a>
						<a href="javascript:void(0);" class="board_box staple3" @click.prevent="fn_movePage('PDTA4U01')"> 
							<em>안정적인<br>투자전략!</em>
						</a>
						<a href="javascript:void(0);" class="board_box staple4" @click.prevent="fn_openPopup('COTP0004')"> 
							<em>내 또래들은<br>얼만큼 쓸까?</em>
						</a>
					</div>

					<a href="javascript:void(0);" @click="fn_movePage('PDTA4U01')">
						<img src="@/assets_v40/images/banner/img_banner_asset_pensiton.png" alt="65세, 내가 받는 연금은 얼마일까요? 지금 바로 알아보세요." />
					</a>
				</div>

				<!--금융지식-->
				<div class="finlit" v-if="financeKlList.length > 0 && financeKlList">
					<a href="javascript:void(0);" class="h_tit01" @click.prevent="fn_movePage('COCT4001')">금융지식</a>

					<div class="scroller">
						<ul>
							<li v-for="(item, idx) in financeKlList" :key="idx">
								<a href="javascript:void(0);" @click.prevent="fn_openFncKlDtl(item.cntzId)">
									<img :src="`/assets/images/fin_cont/${item.thmnlImgUrlnm}`" alt="" @error="emptyImg">
									<strong>{{item.cntzTinm}}</strong>
									<span class="hash" v-if="!!item.rcmKwrdCntn">#{{item.rcmKwrdCntn}}</span>
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div class="bottom">
					<a href="javascript:void(0);" class="btn_connect left" @click.prevent="fn_openPopup('COAS4001')">NH콕마이데이터(자산관리) 가입</a><!-- 25-03-11 문구수정 -->
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

import COTP0004 from '@/views/page/CO/TP/COTP0004/COTP0004'
import COAS4001 from '@/views/page/CO/AS/COAS4001/COAS4001'
import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011'

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
			this.getFinanceKlList()
		},

		// 금융 지식 데이터 조회 
		getFinanceKlList() {       
			const config = {
			url: '/co/ct/01r03',
			data: {
					cntzTpc        : "N", // 화면모드(U 둘러보기/N 일반모드/S 큰글씨/C 청소년) >> 미가입자라하더라도 일반모드의 금융지식 노출
					scrnPsnEstCntn : "ASTA4001",  // 게시위치
					rowCnt         : 4,
					ageDsc         : "",          // 연령별구분여부코드
					}
			};

        	apiService.call(config).then(response => {
          		this.financeKlList = response.klList
        	})
		},

		// 금융지식 컨텐츠 상세 팝업오픈
		fn_openFncKlDtl(cntzId) {
			const config = {
				component: COCT4011,
				params: cntzId
			}
			modalService.openPopup(config)
		},
		
		emptyImg(e) {
			e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
		},
		// 화면이동
		fn_movePage(pageId) {
			const config = {
				name: pageId
			}
			commonService.movePage(config)
		},
		
 		// 팝업 호출
		fn_openPopup(compName) {
			let compenent = ''
			if(compName == "COAS4001") {  // 서비스 가입 약관 팝업
				compenent = COAS4001	
			} else if(compName == "COTP0004") { // 미가입자 가입필요 팝업
				compenent = COTP0004	
			} 
			
			const config = {
				component: compenent,
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