<!--
/*************************************************************************
* @ 서비스경로 : NH 지역정보 >	군장병 지원정보
* @ 페이지설명 : NH지역정보 > 군장병 지원정보
* @ 파일명     : src/views/page/RG/MM/RGMM4001/RGMM4001.vue
* @ 작성자     : CS541601
* @ 작성일     : 2025-02-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-12             CS541601                 신규
*************************************************************************/
-->
<template>
	<div id="wrap" class="sticky-scroll">
		
		
		<div class="content-view">

			<div id="content">
				
				<section class="local_info army">
					<div class="mylocal">
						<p class="txt">장병을 위한 <br>안내를 해드릴게요!</p>
						<p>국방부가 함께합니다.</p>
						<!--<lottie-player src="@/assets_v40/images/lottie/bg_local_army.json"  loop autoplay aria-hidden="true" class="local_lottie" ></lottie-player>-->
						<lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_local_army.json')" 
                                         ref="anim"
                                         :loop="true"
                                         :auto-play="true" 
                                         aria-hidden="true" 
                                         class="local_lottie" 
                                         >
                    	</lottie-animation>
					</div>

					<div class="local_search">
						<input type="search" id="local_search_01" class="inputClear" name="" value="" @keyup.enter="fn_search" placeholder="검색어를 입력하세요" title="검색어를 입력하세요" v-model="searchCond" ref="searchRef">
						<button type="button" class="com_btn_delete" @click="clearSearch()"><span class="blind">삭제</span></button>
						<button type="button" class="btn_search" @click="fn_search"><span class="blind">검색</span></button>
					</div>

					<div class="board_box">
						<p class="sum">검색결과 <span class="num">{{ tmoList.length }}</span>개</p>
						<ul class="cate_list ty_local">
							<!--
							<li>
								<a href="javascript:void(0);" class="item" @click.prevent="fn_goPopDetailPage()">
									<p class="name">서울 <span class="tel">033-641-9690</span></p>
									<p class="text">3번 출구2시 방향 여자화장실 옆</p>
								</a>
							</li>
							-->
							<li v-for="(item, index) in tmoList" :key="index">
								<a href="javascript:void(0);" class="item" @click.prevent="fn_goPopDetailPage(item)">
									<p class="name">{{ item.plcnm }}<span class="tel" v-if="item.ctcplTelno !== '없음'">{{ item.ctcplTelno !== '없음' ? item.ctcplTelno : ''}}</span></p>
									<p class="text">{{ item.plcCntn }}</p>
								</a>
							</li>
							
						</ul>

						<div class="no_result" v-if="tmoList.length == 0">
							<p class="text">검색결과가 없습니다.</p>
						</div>
					</div>

				</section>

			</div>

			<!-- Footer -->
            <footersV2 type="" />

		</div>
	</div>
	



</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import RGMM4002 from '@/views/page/RG/MM/RGMM4002/RGMM4002' // 군장병 TMO 상세 팝업  
import modalService  from '@/service/modalService'
import LottieAnimation from 'lottie-web-vue'

export default {
        name : "RGMM4001",
        data: () => {
			return {
				searchCond: '',
				tmoList: [],
			}
		},
        mounted() {
        	this.initComponent()

        	//PFM로그 처리 화면접속이력 등록 POST
       		apiService.pfmLogSend(this.$options.name)
    	},

		mixins: [
        	commonMixin
    	],
		methods: {
			
			initComponent() {
				const apiConfig = {
					method : 'post',
                	url : '/rg/mm/01r01',
                	data : {
						searchCond: ''
                	}
            	}

				apiService.call(apiConfig).then(response => {
					if (!!response.tmoList) {
						this.tmoList = response.tmoList
					}
				})
			},

			clearSearch() {
				this.searchCond = ''
			},
		  	/* 군장병 TMO 상세 팝업 */
        	fn_goPopDetailPage(p) {
				
				let compName = RGMM4002
				let param    = p;

				const config = {
					component: compName,
					params: param
				}
				modalService.openPopup(config).then(() => {})	 
			},


			fn_search() {
				
				this.$refs.searchRef.blur()
				
				const apiConfig = {
					method : 'post',
                	url : '/rg/mm/01r01',
                	data : {
						searchCond: this.searchCond
                	}
            	}

				apiService.call(apiConfig).then(response => {
					if (!!response.tmoList) {
						this.tmoList = response.tmoList
					}
				})
			},
		},

       
        components : {
            Page,
            FootersV2,
			LottieAnimation,
        }
    }



</script>