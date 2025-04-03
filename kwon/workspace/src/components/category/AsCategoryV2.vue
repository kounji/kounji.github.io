<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 카테고리
* @ 페이지설명 : 카테고리
* @ 파일명     : src/components/category/AsCategoryV2.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515729                 최초작성
* 2022-07-15              CS528043                 고도화 적용.
*************************************************************************/
-->
<template>
	<div class="com_tabmenu_type01 menunum04" id="category_menu">
		<ul role="tablist">
			<li :class="[type === 'ALL' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'ALL' ? 'true' : 'false'" @click="movePage('ALL')">전체자산</a></li>
			<li :class="[type === 'AC'  ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'AC'  ? 'true' : 'false'" @click="movePage('AC')">자산현황</a></li>
			<li :class="[type === 'LN'  ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'LN'  ? 'true' : 'false'" @click="movePage('LN')">부채관리</a></li>
			<li :class="[type === 'IP'  ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'IP'  ? 'true' : 'false'" @click="movePage('IP')">자산진단</a></li>
		</ul>
	</div>
</template>

<script>
	import commonService from '@/service/commonService'

	export default {
		name: 'AsCategoryV2',
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
			// 2022.07.15 NH콕마이데이터2.0 자산관리 고도화 UI ID변경으로 일부 변경(CS528043)
			// 등록 버튼 눌러서 페이지 이동시 이동할 화면 이름 리턴
			getMovePageName(type) {
				if (type === 'ALL') return 'ASTA2001' // 전체(ASAS0001 -> ASAC1001 변경) => ASTA2001 변경
				if (type === 'AC')  return 'ASAC4001' // 자산(ASAC1101 -> ASAC2001 변경)
				// :: S modify 21.07.20  부채메인변경 ( 대출 -> 카드)
				if (type === 'LN')  return 'ASCD2001' // 부채(카드) (ASLN1103 -> ASCD2001 변경)
				// :: E modify 21.07.20  부채메인변경 ( 대출 -> 카드)
				if (type === 'IP')  return 'ASIP2001' // 자산진단
				return ''
			}
		},
		components: {

		},
	}
</script>