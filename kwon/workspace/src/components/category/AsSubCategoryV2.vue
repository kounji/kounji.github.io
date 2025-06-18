<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 서브카테고리
* @ 페이지설명 : 서브카테고리
* @ 파일명     : src/components/category/AsSubCategoryV2.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515729                 최초작성
* 2021-12-22              CS515729                 메뉴명변경(선불->포인트). 카테고리만 대상.
* 2022-07-14              CS528043                 고도화 적용.
*************************************************************************/
-->
<template>
	<div class="lnb" id="category_sub_menu">
		<ul role="tablist">
			<template v-if="type != 'LN'">
				<li :class="[type === 'AC'  ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'AC'  ? 'true' : 'false'" v-on:click.prevent="movePage('AC')">예금</a></li>
				<li :class="[type === 'IV'  ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'IV'  ? 'true' : 'false'" v-on:click.prevent="movePage('IV')">투자</a></li>
				<li :class="[type === 'PS'  ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'PS'  ? 'true' : 'false'" v-on:click.prevent="movePage('PS')">연금</a></li>
				<li :class="[type === 'PAY' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'PAY' ? 'true' : 'false'" v-on:click.prevent="movePage('PAY')">페이/포인트</a></li>
				<li :class="[type === 'IS'  ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'IS'  ? 'true' : 'false'" v-on:click.prevent="movePage('IS')">보험</a></li>
				<li :class="[type === 'RA1' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'RA1' ? 'true' : 'false'" v-on:click.prevent="movePage('RA1')">부동산</a></li>
				<li :class="[type === 'RA2' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'RA2' ? 'true' : 'false'" v-on:click.prevent="movePage('RA2')">자동차</a></li>
				<li :class="[type === 'RA3' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'RA3' ? 'true' : 'false'" v-on:click.prevent="movePage('RA3')">기타</a></li>
			</template>
			<template v-else-if="type == 'LN'">
				<li :class="[typeDtl === '03' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="typeDtl === '03' ? 'true' : 'false'" v-on:click.prevent="movePage('03')">카드</a></li>
				<li :class="[typeDtl === '01' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="typeDtl === '01' ? 'true' : 'false'" v-on:click.prevent="movePage('01')">대출</a></li>
				<li :class="[typeDtl === '05' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="typeDtl === '05' ? 'true' : 'false'" v-on:click.prevent="movePage('05')">할부금융</a></li>
				<li :class="[typeDtl === '02' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="typeDtl === '02' ? 'true' : 'false'" v-on:click.prevent="movePage('02')">자동차할부</a></li>
				<li :class="[typeDtl === '06' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="typeDtl === '06' ? 'true' : 'false'" v-on:click.prevent="movePage('06')">리스</a></li>
				<li :class="[typeDtl === '07' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="typeDtl === '07' ? 'true' : 'false'" v-on:click.prevent="movePage('07')">빌린돈</a></li>
			</template>
		</ul>
	</div>
</template>

<script>
	import commonService from '@/service/commonService'
// import CmmInsuDetailCoveragesVue from '../IS/CMM/CmmInsuDetailCoverages.vue'

	export default {
		name: 'AsSubCategoryV2',
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
				console.log('config ::: ', config)
				commonService.movePage(config)
			},
			// 등록 버튼 눌러서 페이지 이동시 이동할 화면 이름 리턴
			getMovePageName(type) {
				console.log('getMovePageName type ::: ', type)
				///////////// 자산 //////////////////////
				if (type === 'AC') return 'ASAC4001' // 계좌(ASAC1101 -> ASAC2001 -> ASAC4001로 변경)
				if (type === 'IV') return 'ASIV4001' // 투자
				if (type === 'PAY') return 'ASPT4001' // 페이머니(=선불)
				if (type === 'PS') return 'ASPS4001' // 연금
				// if (type === 'AN') return 'ASAN0001' // 
				if (type === 'IS') return 'ASIS4001' // 보험
				if (type === 'RA1') return 'ASRE4001' // 부동산
				if (type === 'RA2') return 'ASCA4001' // 자동차(ASRA1103 -> ASCA2201로 변경)
				if (type === 'RA3') return 'ASOA4001' // 기타

				///////////// 부채 //////////////////////
				if (type === '01') return 'ASLN4001'	// 대출 // ASIS - ASLN1101
				if (type === '02') return 'ASCL4001'	// 자동차
				if (type === '03') return 'ASCD4001'	// 카드(ASLN1103-> ASCD4001로 변경)
				if (type === '05') return 'ASIT4001'	// 할부금융
				if (type === '06') return 'ASLS4001'	// 리스
				if (type === '07') return 'ASBR4001'	// 빌린돈
				return ''
			}
		},
		mounted() {
			$('.lnb').each(function(){
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