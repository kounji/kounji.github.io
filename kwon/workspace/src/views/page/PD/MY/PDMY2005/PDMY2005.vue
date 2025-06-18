<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표 > 목표등록
* @ 페이지설명 : 금융과생활 > 나의목표 > 목표등록
* @ 파일명     : src/views/page/PD/MY/PDMY2005/PDMY2005.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-05-27
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-27              CS516029                 최초작성
* 2023-07-31              CS533453              고도화 파일명, UI 변경 및 고도화 개발(PDMY1002.vue -> PDMY2005.vue)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
    <div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>목표등록</h1>
		</div>
		
        <div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner">
				<strong class="titH1">이루고 싶은 목표에 도전하세요</strong>

				<!-- 버킷리스트 -->
				<div class="bucketlist_wrap mt40">
					<div class="flex_title_area">
						<strong class="titH3">버킷리스트</strong>
						<a href="javascript:void(0);" class="link_arrow" @click.prevent="firstStepPop('10')">상품추천</a>
					</div>

					<div class="scroll_wrap">
						<ul class="listbox_scroll">
							<li class="mygoal_cont_box mint">
								<a href="javascript:void(0);" @click.prevent="firstStepPop('03')">
									<div class="assets_v40">
										<img src="@/assets_v40/images/img/bucketList_home_2023.png" alt="집 이미지" style="width:calc(20.3rem / 2.5);">
									</div>

									<div class="text">
										꿈에 그리던<br>
										내 집 마련!
									</div>
								</a>
							</li>
							<li class="mygoal_cont_box orange">
								<a href="javascript:void(0);" @click.prevent="firstStepPop('04')">
									<div class="assets_v40">
										<img src="@/assets_v40/images/img/bucketList_car_2023.png" alt="차 이미지" style="width:calc(27.1rem / 2.5);">
									</div>

									<div class="text">
										내 차고에<br> 
										드림카 채우기!
									</div>
								</a>
							</li>
							<li class="mygoal_cont_box lightgreen">
								<a href="javascript:void(0);" @click.prevent="firstStepPop('05')">
									<div class="assets_v40">
										<img src="@/assets_v40/images/img/bucketList_travel_2023.png" alt="비행기 이미지" style="width:calc(26.2rem / 2.5);">
									</div>

									<div class="text">
										나의 워라벨,<br> 
										설레는 여행!
									</div>
								</a>
							</li>
							<li class="mygoal_cont_box skyblue">
								<a href="javascript:void(0);" @click.prevent="firstStepPop('06')">
									<div class="assets_v40">
										<img src="@/assets_v40/images/img/bucketList_leisure_2023.png" alt="골프공과 골프장 카트 이미지" style="width:calc(21.9rem / 2.5);">
									</div>

									<div class="text">
										힐링 라이프,<br> 
										나의 여가생활!
									</div>
								</a>
							</li>
							<li class="mygoal_cont_box peach">
								<a href="javascript:void(0);" @click.prevent="firstStepPop('07')">
									<div class="assets_v40">
										<img src="@/assets_v40/images/img/bucketList_language_2023.png" alt="한자 文과 알파벳 A 이미지" style="width:calc(19.5rem / 2.5);">
									</div>

									<div class="text">
										새로운 도전,<br> 
										자기계발로 시작!
									</div>
								</a>
							</li>
							<li class="mygoal_cont_box purple">
								<a href="javascript:void(0);" @click.prevent="firstStepPop('08')">
									<div class="assets_v40">
										<img src="@/assets_v40/images/img/bucketList_pet_2023.png" alt="반려동물 강아지 이미지" style="width:calc(17.2rem / 2.5);">
									</div>

									<div class="text">
										또 다른 가족,<br>
										반려동물과 함께!
									</div>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<!-- //버킷리스트 -->

				<!-- 금융목표 -->
				<div class="finance_goal">
					<strong class="titH3">금융목표</strong>

					<ul class="list_link_type">
						<li>
							<a href="javascript:void(0);" class="spare" @click.prevent="firstStepPop('00')">
								<p>예산만큼 아껴쓰기</p>
								<template v-if="xpsAm !== null">
									<span class="mint_badge">진행중</span>
								</template>
							</a>
						</li>
						<li>
							<a href="javascript:void(0);" class="saving" @click.prevent="firstStepPop('01')">
								<p>차근차근 돈 모으기</p>
							</a>
						</li>
						<li>
							<a href="javascript:void(0);" class="investing" @click.prevent="firstStepPop('02')">
								<p>성공적인 투자 하기</p>
							</a>
						</li>
					</ul>
				</div>
				<!-- //금융목표 -->
			</div>
        </div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
    <!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import {fncSlick} from '@/utils/slick'
import PDMY4023 from '@/views/page/PD/MY/PDMY4023/PDMY4023' // 버킷리스트(내집사기 등록)
import PDMY4024 from '@/views/page/PD/MY/PDMY4024/PDMY4024' // 버킷리스트(내차사기 등록)
import PDMY4025 from '@/views/page/PD/MY/PDMY4025/PDMY4025' // 버킷리스트(여행목표 등록)
import PDMY4006 from '@/views/page/PD/MY/PDMY4006/PDMY4006' // 버킷리스트(여가생활 등록)
import PDMY4015 from '@/views/page/PD/MY/PDMY4015/PDMY4015' // 버킷리스트(자기계발 등록)
import PDMY4020 from '@/views/page/PD/MY/PDMY4020/PDMY4020' // 버킷리스트(반려동물 등록)
import PDMY4032 from '@/views/page/PD/MY/PDMY4032/PDMY4032' // 금융목표(지출목표 등록)
import PDMY2038 from '@/views/page/PD/MY/PDMY2038/PDMY2038' // 금융목표(돈모으기 등록)
import PDMY2040 from '@/views/page/PD/MY/PDMY2040/PDMY2040' // 금융목표(투자목표 등록)
import PDPD4001 from '@/views/page/PD/PD/PDPD4001/PDPD4001' // 상품추천 페이지

import {dateFormat} from '@/utils/date'

    export default {
        name : "PDMY2005",
        data: () => {
            return {
				stYm				:"",
				xpsAm              	: 0,  	// 실지출금액(preXpsAm, ctgrPreXpsTotAm중 하나 표현)
            }
        },
        mixins: [
            popupMixin
           ,commonMixin
        ],
        methods: {

			firstStepPop(gubn) {
				let compName;

				if(gubn == '00') {
					if(this.xpsAm !== null) {

						const configConfirm = {
							content: ["지출목표가 이미 등록되어 있습니다.<BR>등록된 지출 목표를 수정하시겠습니까?"],
							title  : "",
						}

						modalService.confirm(configConfirm).then(text => {

							if(text == "예") {

								// 수정화면으로 이동

								var compName = PDMY4032

								// modifyYn 상세조회(수정) 여부
								var param = {
									modifyYn:"Y", 
									stYm:this.stYm, 
									preXpsAm: this.xpsAm, 
								}
								const config = {
									component: compName,
									params : param
								}

								modalService.openPopup(config).then(() => {

								})
							} else if(text == "아니오") {
								// 팝업 close후 재조회
								this.closeAll("reSelect")
							}

						})
					} else {
						compName = PDMY4032 // 지출목표

						const config = {
							component: compName,
							params : {}
						}
						modalService.openPopup(config).then(() => {

						})
					}
				} else if(gubn == '10') {
					compName = PDPD4001;

					const config = {
						name: 'PDPD4001',
					}
					commonService.movePage(config)
					this.closeAll()

				} else {
					if(gubn == '01') {
						compName = PDMY2038; // 금융목표(돈모으기)
					} else if(gubn == '02') {
						compName = PDMY2040 // 금융목표(투자목표)
					} else if(gubn == '03') {
						compName = PDMY4023 // 버킷리스트(내집사기)
					} else if(gubn == '04') {
						compName = PDMY4024 // 버킷리스트(내차사기)
					} else if(gubn == '05') {
						compName = PDMY4025 // 버킷리스트(여행목표)
					} else if(gubn == '06') {
						compName = PDMY4006 // 버킷리스트(여가생활)
					} else if(gubn == '07') {
						compName = PDMY4015 // 버킷리스트(자기계발)
					} else if(gubn == '08') {
						compName = PDMY4020 // 버킷리스트(반려동물)
					}

					var param1 = {}
					const config = {
						component: compName,
						params : param1
					}
					modalService.openPopup(config).then(() => {

					})
				} 
			},
			initComponent() {

				// 등록된 지출목표가 있을경우 등록불가 처리
				this.stYm = dateFormat(new Date, 'YYYYMM') // 당월

				this.getData()
			},
			getData() {
				// 지출목표 조회
				const config = {
					// url: '/pd/my/01r03',		// /pd/my/01r01
					url: '/pd/my/33r01',
					data: {
							"mydtCusno": this.getUserInfo('mydtCusno') // 마이데이터고객번호
							,"stYm": dateFormat(new Date(), 'YYYYMM')	// 현재년월
							}
				};

				apiService.call(config).then(response => {
					this.myInfoList = response
					this.xpsAm = response.preXpsAm
				});

				this.$nextTick(() => {
					//this.callJQueryFncExcute();
					fncSlick();
				})
			},

        },
        mounted() {
			this.initComponent()
			
			//PFM로그 처리 화면접속이력 등록 POST
			apiService.pfmLogSend(this.$options.name)
        },
    }
</script>