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
	<nav class="navi">
		<div class="inner">
			<!--자산현황 3depth-->
			<ul role="navigation" aria-label="자산현황" class="depth1-1">
			<template v-if="type != 'LN'">
				<li><a href="javascript:void(0);" :aria-current="type === 'AC'  ? 'page' : ''" v-on:click.prevent="movePage('AC')">예금</a></li>
				<li><a href="javascript:void(0);" :aria-current="type === 'IV'  ? 'page' : ''" v-on:click.prevent="movePage('IV')">투자</a></li>
				<li><a href="javascript:void(0);" :aria-current="type === 'PS'  ? 'page' : ''" v-on:click.prevent="movePage('PS')">연금</a></li>
				<li><a href="javascript:void(0);" :aria-current="type === 'PAY' ? 'page' : ''" v-on:click.prevent="movePage('PAY')">페이/포인트</a></li>
				<li><a href="javascript:void(0);" :aria-current="type === 'IS'  ? 'page' : ''" v-on:click.prevent="movePage('IS')">보험</a></li>
				<li><a href="javascript:void(0);" :aria-current="type === 'RA1' ? 'page' : ''" v-on:click.prevent="movePage('RA1')">부동산</a></li>
				<li><a href="javascript:void(0);" :aria-current="type === 'RA2' ? 'page' : ''" v-on:click.prevent="movePage('RA2')">자동차</a></li>
				<li><a href="javascript:void(0);" :aria-current="type === 'RA3' ? 'page' : ''" v-on:click.prevent="movePage('RA3')">기타</a></li>
			</template>
			<template v-else-if="type == 'LN'">
				<li><a href="javascript:void(0);" :aria-current="typeDtl === '03' ? 'page' : ''" v-on:click.prevent="movePage('03')">카드</a></li>
				<li><a href="javascript:void(0);" :aria-current="typeDtl === '01' ? 'page' : ''" v-on:click.prevent="movePage('01')">대출</a></li>
				<li><a href="javascript:void(0);" :aria-current="typeDtl === '05' ? 'page' : ''" v-on:click.prevent="movePage('05')">할부금융</a></li>
				<li><a href="javascript:void(0);" :aria-current="typeDtl === '02' ? 'page' : ''" v-on:click.prevent="movePage('02')">자동차할부</a></li>
				<li><a href="javascript:void(0);" :aria-current="typeDtl === '08' ? 'page' : ''" v-on:click.prevent="movePage('08')">학자금대출</a></li>
				<li><a href="javascript:void(0);" :aria-current="typeDtl === '06' ? 'page' : ''" v-on:click.prevent="movePage('06')">리스</a></li>
				<li><a href="javascript:void(0);" :aria-current="typeDtl === '07' ? 'page' : ''" v-on:click.prevent="movePage('07')">빌린돈</a></li>
			</template>
			</ul>
		</div>
	</nav>
</template>

<script>
	import commonService from '@/service/commonService'
	export default {
		name: 'AsSubCategoryV4',
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
				if (type === 'AC') return 'ASAC4001' // 계좌(ASAC1101 -> ASAC2001로 변경 -> ASAC4001로 변경)
				if (type === 'IV') return 'ASIV4001' // 투자 (ASIV2001 -> ASIV4001)
				if (type === 'PAY') return 'ASPT4001' // 페이머니(=선불)
				if (type === 'PS') return 'ASPS4001' // 연금
				// if (type === 'AN') return 'ASAN0001' // 
				if (type === 'IS') return 'ASIS4001' // 보험
				if (type === 'RA1') return 'ASRE4001' // 부동산
				if (type === 'RA2') return 'ASCA4001' // 자동차(ASRA1103 -> ASCA2201 ->ASCA4001로 변경)
				if (type === 'RA3') return 'ASOA4001' // 기타

				///////////// 부채 //////////////////////
				if (type === '01') return 'ASLN4001'	// 대출 // ASIS - ASLN1101 - ASLN2001
				if (type === '02') return 'ASCL4001'	// 자동차
				if (type === '03') return 'ASCD4001'	// 카드(ASLN1103-> ASCD2001 -> ASCD4001로 변경)
				if (type === '05') return 'ASIT4001'	// ASIT2001 -> ASIT4001할부금융
				if (type === '06') return 'ASLS4001'	// ASLS2001 -> ASLS4001 리스
				if (type === '07') return 'ASBR4001'	// ASBR2001 -> ASBR4001 빌린돈
				if (type === '08') return 'ASEL4001'	// 학자금대출 20241230
				return ''
			}
		},
		mounted() {

		},
		components: {

		},
	}
</script>