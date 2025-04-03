<template>
	<div class="inner-wrap">
		<!-- content-wrap -->
		<slot></slot>
		<!-- <button 
			type="button"
			class="btn-close"
			@click="closeModal"
		>
			팝업닫기
		</button> -->
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import types from '@/common/config/types'

	export default {
		name: 'Modal',
		props: {
			title: {
        type: String,
        default: ''
      },
		},
		computed: {
      ...mapGetters('modal', [
        'modalConfig',
			]),
			isFullType() {
				return this.modalConfig.type === types.MODAL.TYPE.FULL
			}
		},
		data: function() {
			return {
			}
		},
		methods: {
			...mapActions('modal', [
				'closeModal',
			])
		},
		components: {
		},
		created() {
			// console.log('modal :: created')
		},
		beforeDestroy() {
			// console.log('modal :: beforeDestroy', this.modalInfo)
			// this.closeModal()
		},
		destroyed() {
			// console.log('modal :: destroyed')
		}
	}
</script>