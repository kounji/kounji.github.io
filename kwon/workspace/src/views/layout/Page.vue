<template>
	<!--<div id="content" class="type_01 no_cont sub_main">-->
	<div>
		<slot></slot>
	</div>
</template>

<script>
  import appService from '@/service/appService'
	import { mapActions } from 'vuex'
	
	export default {
		name: 'Page',
		props: {
			previous: { // 이전 버튼 눌렀을때 history back 개수
				type: String,
			},
			disableLoadingBackground: { // 로딩바 백그라운드 사용 여부
				type: Boolean,
				default: false,
			}
		},
		computed: {

		},
		data: function() {
			return {
			}
		},
		created() {
			if (!this.disableLoadingBackground) {
				this.setLoadingBackground(true)
			}
		},
		methods: {
			...mapActions('modal', [
				'removeAllLoading',
				'setLoadingBackground',
			])
		},
		mounted() {
			appService.setSoftInputMode()
		},
	}
</script>