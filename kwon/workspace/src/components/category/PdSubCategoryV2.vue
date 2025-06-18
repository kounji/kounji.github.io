<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 서브카테고리
* @ 페이지설명 : 서브카테고리
* @ 파일명     : src/components/category/PdSubCategoryV2.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-08-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-25              CS515897                 최초작성
* 2022-09-19              CS528051                 나의 세금/사회보험료 추가
*************************************************************************/
-->
<template>
	<div class="lnb" id="category_sub_menu">
		<ul role="tablist">
			<li :class="[type === 'RT_' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'RT_' ? 'true' : 'false'" v-on:click.prevent="movePage('RT_')">노후준비</a></li>
			<li :class="[type === 'YT' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'YT' ? 'true' : 'false'" v-on:click.prevent="movePage('YT')">연말정산</a></li>
			<li :class="[type === 'TX' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'TX' ? 'true' : 'false'" v-on:click.prevent="movePage('TX')">세금현황</a></li>
			<li :class="[type === 'SC' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'SC' ? 'true' : 'false'" v-on:click.prevent="movePage('SC')">사회보험</a></li>
			<li :class="[type === 'NT' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'NT' ? 'true' : 'false'" v-on:click.prevent="movePage('NT')">국민연금</a></li>
			<li :class="[type === 'HL' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'HL' ? 'true' : 'false'" v-on:click.prevent="movePage('HL')">건강보험</a></li>
		</ul>
	</div>
</template>

<script>
	import commonService from '@/service/commonService'

	export default {
		name: 'PdSubCategoryV2',
		props: {
			type: {
				type: String,
				default: ''
			},
			typeDtl: {
				type: String,
				default: ''
			}
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
				if(type === 'CG') return 'PDCG0001'
				if(type === 'YT') return 'PDYT4002' //(PDYT1101 -> PDYT4002변경)
				//if(type === 'RT') return 'PDRT1012' // 은퇴준비진단 페이지 -> 팝업으로 변경되어 수정
				if(type === 'RT_') return 'PDRT4001' // (PDRT1001 -> PDRT4001변경)
				if(type === 'TX') return 'PDTX2004' // 세금 현황 PDTX1001
				if(type === 'SC') return 'PDSC4001' // 사회보험
				if(type === 'NT') return 'PDRT4001' // 국민연금 임시
				if(type === 'HL') return 'PDSC4004' // 건강보험
				return ''
			}

		},

		mounted() {
			$('.lnb ').each(function(){
				let width  = $(this).width()
				let length = $(this).find('li').length
				let index  = $(this).find('.on').index()

				$('.lnb').scrollLeft((width/length) * index);
			}) 
		},
		components: {

		},
	}
</script>