<!--
/*************************************************************************
* @ 서비스경로 : 홈 > 통합검색 > 검색결과
* @ 페이지설명 : 홈 > 통합검색 > 검색결과
* @ 파일명     : src/views/page/CO/CO/COCO4304/COCO4304.vue
* @ 작성자     : CS541817
* @ 작성일     : 2025-03-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-06              CS541817              최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup" id="full_popup_01">

		<div class="popup_header">
			<h1>검색</h1>
		</div>

		<div class="popup_content">

			<div class="search_all flex_cont">
				<div class="search_input">
					<div class="search">
						<label for="search_01"></label>
						<input type="search" id="search_01" class="inputClear" name="" value="" v-model="searchText" placeholder="검색어를 입력하세요." title="검색어를 입력하세요.">
						<button type="button" class="com_btn_delete" @click.prevent="fn_remove()"><span class="blind">삭제</span></button>
						<button type="button" class="btn_search" @click.prevent="fn_search()"><span class="blind">검색</span></button>
					</div>
					<button type="button" class="btn_mike" @click.prevent="fn_voiceSearch()"><span class="blind">음성검색 버튼</span></button>
				</div>
				
				<div class="scroller">
					<!-- 검색 결과 -->

					<div class="search_result" v-if="test">
						<p class="h_tit01">메뉴 <span class="primary">{{ searchList.length }}</span></p>
						<ul>
							<li v-for="item in searchList" :key="item">
								<a href="#nolink" class="item"><strong>테스트</strong> </a>
							</li>
						</ul>
					</div>

					<!-- 결과 없음 -->
					<div class="no_result" v-else>
						<p class="text">검색 결과가 없습니다.</p>
						<!-- [v4.0] 배경이미지 로티json으로 변경 -->
						<div class="bg">
							<lottie-player src="../../../../src/assets_v40/images/lottie/bg_no_result.json" loop="" autoplay="" aria-hidden="true" class="bg_no_result" background="transparent"></lottie-player>
						</div>
						<!-- //[v4.0] 배경이미지 로티json으로 변경 -->
					</div>
					<!-- //검색 결과 -->
				</div>
			</div>
			
		</div>

		<a href="#nolink" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>

	import modalService from '@/service/modalService'
	import apiService from '@/service/apiService'  
	import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
	import commonService from '@/service/commonService'
	
	import COCO4303 from '@/views/page/CO/CO/COCO4303/COCO4303' // 음성검색

	export default {
		name : "COCO4304",
		data: () => {
			return {
				searchText: '',
				searchList:[],
				// test : true
			}
		},
		computed: {
			
		},
		mounted() {
			//PFM로그 처리 화면접속이력 등록 POST
        	apiService.pfmLogSend(this.$options.name)
		},
		mixins: [
			popupMixin,
			commonMixin
		],
		methods: {
			
			// 검색
			fn_search() {				
				// 두 글자 미만 입력시 안내 팝업
				if (this.searchText.length < 2) {
					console.log("두 글자 이상으로 입력해주세요.")
					modalService.alert("두 글자 이상으로 입력해주세요.").then(() => {});
					return
				}

				const config = {
					method : 'post',
                	url : '/rg/bm/01r01',
                	data : {
                    	searchCond : this.searchText
                	}
            	}

            	apiService.call(config).then(response => {
                	this.searchList = response.pathList.sort((a, b) => a.bkphNm.toLowerCase() < b.bkphNm.toLowerCase() ? -1 : 1)
            	})

			},

			// 검색어 삭제
			fn_remove() {
				this.searchText = '';
				console.log("검색어 삭제")
			},

			// 음성인식
			fn_voiceSearch() {
				console.log("음성인식")				
				const config = {
					component: COCO4303
				}
				modalService.openPopup(config)

			},

		}
	}
</script>
