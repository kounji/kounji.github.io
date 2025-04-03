<!--
/*************************************************************************
* @ 서비스경로 : 제휴서비스 > 카테고리
* @ 페이지설명 : 카테고리
* @ 파일명     : src/components/category/AnCategoryV2.vue
* @ 작성자     : CS528205
* @ 작성일     : 2022-08-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-16             CS528205                 최초작성
*************************************************************************/
-->
<template>
	<div class="com_tabmenu_type02 menunum04" id="category_menu">
		<div>
			<ul role="tablist">
				<li :class="[type === 'ANCA' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'ANCA' ? 'true' : 'false'" @click="movePage('ANCA')">NH콕마이카</a></li>
				<li :class="[type === 'ANRE' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'ANRE' ? 'true' : 'false'" @click="movePage('ANRE')">NH콕부동산</a></li>
				<li :class="[type === 'ANFM' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'ANFM' ? 'true' : 'false'" @click="movePage('ANFM')">귀농귀촌</a></li>
				<li :class="[type === 'SZFC' ? 'on' : '']"><a href="javascript:void(0);" role="tab" :aria-selected="type === 'SZFC' ? 'true' : 'false'" @click="movePage('SZFC')">마이농가</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import commonService from '@/service/commonService'

	export default {
		name: 'AnCategoryV2',
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
				if (type === 'ANCA') return 'ANCA2201' // 콕마이카
				if (type === 'ANRE') return 'ANRE2201' // 콕부동산
				if (type === 'ANFM') return 'ANFM2001' // 귀농귀촌
				if (type === 'SZFC') return 'SZFC2101' // 마이농가
				return ''
			},
			fn_movePage(menu) {
				const config = {
					name: menu
                }
                
                commonService.movePage(config)
            },
		},		
		mounted() {

			//상단SUB탭메뉴 위치조정
			$('.com_tabmenu_type02 > div').each(function(){
				let width  = $(this).width()
				let length = $(this).find('li').length
				let index  = $(this).find('.on').index()
				$('.com_tabmenu_type02 > div').scrollLeft((width/length) * index);
			})
		},
		components: {

		},
	}
</script>