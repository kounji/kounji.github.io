<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > NH지역정보 > 슬기로운영농생활 > 카테고리
* @ 페이지설명 : 카테고리
* @ 파일명     : src/components/category/AnSubCategoryV4.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-05-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-21              CS515729              최초작성
* 2025-03-04              CS540683              상호금융 NH콕마이데이터 4.0 추진 개발 AnSubCategoryV2 → AnSubCategoryV4 
*************************************************************************/
-->
<template>
	<nav class="navi">
		<div class="inner">
			<ul role="navigation" aria-label="슬기로운영농생활" class="depth1-1">
				<li><a href="javascript:void(0);" :aria-current="type === 'FC' ? 'page' : ''" v-on:click.prevent="movePage('FC')" >영농달력</a></li>
				<li><a href="javascript:void(0);" :aria-current="type === 'FR' ? 'page' : ''" v-on:click.prevent="movePage('FR')" >영농일지</a></li>
				<li><a href="javascript:void(0);" :aria-current="type === 'FL' ? 'page' : ''" v-on:click.prevent="movePage('FL')" >농기계임대</a></li>
				<li><a href="javascript:void(0);" :aria-current="type === 'FP' ? 'page' : ''" v-on:click.prevent="movePage('FP')" >손익분석</a></li>
				<li v-if="isMacoAuthYn === true" >
					<a href="javascript:void(0);" :aria-current="type === 'UM' ? 'page' : ''" v-on:click.prevent="movePage('UM')" >조합원</a>
				</li>
				<li><a href="javascript:void(0);" :aria-current="type === 'ST' ? 'page' : ''" v-on:click.prevent="movePage('ST')" >설정</a></li>
			</ul>
		</div>
	</nav>
</template>

<script>
	import commonService from '@/service/commonService'
	import {mapGetters} from 'vuex'

	export default {
		name: 'AnSubCategoryV4',
		props: {
			type: {
				type: String,
				default: ''
			}
		},
		computed: {
			...mapGetters('user', [
				'isMacoYn', // 조합원 여부
				'isMacoAuthYn', //조합원 권한여부
			])
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
				if (type === 'FC') return 'SZFC4101' // 영농캘린더
				if (type === 'FR') return 'ANSZ4002' // 영농일지
				if (type === 'FL') return 'SZFL4101' // 농기계임대
				if (type === 'FP') return 'SZFP4101' // 손익분석
				if (type === 'PC') return 'SZPC4101' // 정책자금
				if (type === 'UM') return 'SZUM4101' // 조합원
				if (type === 'ST') return 'SZST4101' // 마이농가설정
				return ''
			}
		},
		mounted() {

			//상단SUB탭메뉴 위치조정
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