<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 카테고리
* @ 페이지설명 : 카테고리
* @ 파일명     : src/components/category/SzCategoryV2.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-05-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-21              CS515729                 최초작성
*************************************************************************/
-->
<template>
	<div class="lnb" id="category_sub_menu">
		<ul role="tablist">
			<li :class="[type === 'FC' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :title="type === 'FC' ? '선택됨' : '선택안됨'" :aria-selected="type === 'FC' ? 'true' : 'false'" v-on:click.prevent="movePage('FC')" >영농달력</a></li>
			<li :class="[type === 'FR' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :title="type === 'FR' ? '선택됨' : '선택안됨'" :aria-selected="type === 'FR' ? 'true' : 'false'" v-on:click.prevent="movePage('FR')" >영농일지</a></li>
			<li :class="[type === 'FL' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :title="type === 'FL' ? '선택됨' : '선택안됨'" :aria-selected="type === 'FL' ? 'true' : 'false'" v-on:click.prevent="movePage('FL')" >농기계임대</a></li>
			<li :class="[type === 'FP' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :title="type === 'FP' ? '선택됨' : '선택안됨'" :aria-selected="type === 'FP' ? 'true' : 'false'" v-on:click.prevent="movePage('FP')" >손익분석</a></li>
			<!--<li :class="[type === 'PC' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :title="type === 'PC' ? '선택됨' : '선택안됨'" :aria-selected="type === 'PC' ? 'true' : 'false'" v-on:click.prevent="movePage('PC')" >정책자금</a></li>-->
			<li :class="[type === 'UM' ? 'on' : '']" v-if="isMacoAuthYn === true" >
				<a href="javascript:void(0);" role="tab" :title="type === 'UM' ? '선택됨' : '선택안됨'" :aria-selected="type === 'UM' ? 'true' : 'false'" v-on:click.prevent="movePage('UM')" >조합원</a>
			</li>
			<li :class="[type === 'ST' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :title="type === 'ST' ? '선택됨' : '선택안됨'" :aria-selected="type === 'ST' ? 'true' : 'false'" v-on:click.prevent="movePage('ST')" >설정</a></li>
		</ul>
	</div>
</template>

<script>
	import commonService from '@/service/commonService'
	import {mapGetters} from 'vuex'

	export default {
		name: 'SzCategory',
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
				if (type === 'FC') return 'SZFC2101' // 영농캘린더
				// if (type === 'FR') return 'SZFR2101' // 영농일지
				if (type === 'FR') return 'ANSZ2002' // 영농일지
				if (type === 'FL') return 'SZFL2101' // 농기계임대
				if (type === 'FP') return 'SZFP2101' // 손익분석
				if (type === 'PC') return 'SZPC2101' // 정책자금
				if (type === 'UM') return 'SZUM2101' // 조합원
				if (type === 'ST') return 'SZST2101' // 마이농가설정
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