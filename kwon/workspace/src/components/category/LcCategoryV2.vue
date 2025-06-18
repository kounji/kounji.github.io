<!--
/*************************************************************************
* @ 서비스경로 : 지출분석 > 카테고리
* @ 페이지설명 : 카테고리
* @ 파일명     : src/components/category/LcCategoryV2.vue
* @ 작성자     : CS515901
* @ 작성일     : 2021-06-02
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-02              CS515901                 최초작성
*************************************************************************/
-->
<template>
	<div class="com_tabmenu_type01 menunum03" id="category_menu">
		<ul role="tablist">
			<li :class="[type === 'LCFD' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'LCFD' ? 'true' : 'false'" @click="movePage('LCFD')">금융달력</a></li>
			<li :class="[type === 'LCLE' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'LCLE' ? 'true' : 'false'" @click="movePage('LCLE')">지출내역</a></li>
			<li :class="[type === 'LCIP' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'LCIP' ? 'true' : 'false'" @click="movePage('LCIP')">지출분석</a></li>
		</ul>
	</div>
</template>

<script>
	import commonService from '@/service/commonService'

	export default {
		name: 'LcCategoryV2',
		props: {
			type: {
				type: String,
				default: ''
			},
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
				if (type === 'LCFD') return 'LCFD4001' // 금융캘린더
				if (type === 'LCLE') return 'LCLE4001' // 지출내역
				if (type === 'LCIP') return 'LCIP4001' // 지출분석
				return ''
			}
		},
		components: {

		},
	}
</script>