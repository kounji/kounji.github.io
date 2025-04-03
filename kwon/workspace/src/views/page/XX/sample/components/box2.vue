<template>
	<div>
		box2
	</div>
</template>

<script>
	
	export default {
		name: 'box2',
		data: function() {
			return {
				component: null,
			}
		},
		computed: {
		},
		methods: {
			initComponent(data) {
				console.log(data)
			}
		},
		mixins: [
		],
		components: {
		},
	}
</script>
