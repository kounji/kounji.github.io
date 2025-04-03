<template>
	<div>
		box1
		<button @click="clickHandler">click</button>
	</div>
</template>

<script>
	
	export default {
		name: 'box1',
		data: function() {
			return {
				component: null,
			}
		},
		computed: {
		},
		methods: {
			clickHandler() {
				this.$emit('change', {item: 'xxx'})
			}
		},
		mixins: [
		],
		components: {
		},
	}
</script>
