<!--
/*************************************************************************
* @ 서비스경로 : 지출분석 > 카테고리
* @ 페이지설명 : 카테고리
* @ 파일명     : src/components/category/PdCategoryV2.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-06-02
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-02              CS516029                 최초작성
* 2023-07-17              CS533453                 div 클래스 변경 및 미사용  div 제거
*************************************************************************/
-->
<template>
	<div class="com_tabmenu_type01 menunum04" id="category_menu">
		<!-- <div id="category_menu"> -->
			<ul role="tablist">
				<li :class="[type === 'PDMY' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'PDMY' ? 'true' : 'false'" @click.prevent="movePage('PDMY')">나의목표</a></li>
				<li :class="[type === 'PDMY_' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'PDMY_' ? 'true' : 'false'" @click.prevent="movePage('PDMY_')">버킷리스트</a></li><!-- 임시 -->
				<li :class="[type === 'PDPD' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'PDPD' ? 'true' : 'false'" @click.prevent="movePage('PDPD')">상품추천</a></li>
				<li :class="[type === 'PDRT' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'PDRT' ? 'true' : 'false'" @click.prevent="movePage('PDRT')">금융통통</a></li>
				<li :class="[type === 'PDBF' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'PDBF' ? 'true' : 'false'" @click.prevent="movePage('PDBF')">금융브리핑</a></li>
				<!--
				<li :class="[type === 'PDCA' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'PDCA' ? 'true' : 'false'" @click.prevent="movePage('PDCA')">자동차관리</a></li>
				<li :class="[type === 'ANRE' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'ANRE' ? 'true' : 'false'" @click.prevent="movePage('ANRE')">부동산서비스</a></li>
				-->
			</ul>
		<!-- </div> -->
	</div>
</template>

<script>
	import commonService from '@/service/commonService'

	export default {
		name: 'PdCategoryV2',
		props: {
			type: {
				type: String,
				default: ''
			},
		},
		mounted() {

			//상단SUB탭메뉴 위치조정
			$('.com_tabmenu_type01 > div').each(function(){
				let width  = $(this).width()
				let length = $(this).find('li').length
				let index  = $(this).find('.on').index()
				$('.com_tabmenu_type01 > div').scrollLeft((width/length) * index);
			})
		},
		methods: {
			movePage(type) {
				const config = {
					name: this.getMovePageName(type)
				}

				commonService.movePage(config)
			},
			// 등록 버튼 눌러서 페이지 이동시 이동할 화면 이름 리턴
			getMovePageName(type) {
				if (type === 'PDMY') return 'PDMY4001' // 나의목표
				if (type === 'PDMY_') return 'PDMY4001' // 버킷임시
				if (type === 'PDPD') return 'PDPD4001' // 상품추천
				if (type === 'PDRT') return 'PDRT4001' // 노후준비
				if (type === 'PDCA') return 'PDCA1101' // 자동차관리
				if (type === 'ANRE') return 'ANRE4201' // 부동산서비스
				if (type === 'PDBF') return 'PDBF4001' // 금융브리핑
				return ''
			}
		},
		components: {

		},
	}
</script>