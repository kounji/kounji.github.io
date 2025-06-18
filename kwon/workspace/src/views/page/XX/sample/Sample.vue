<template>
  <!--<page class="xx">-->
  <page class="content-view">
	<div id="content">
		<button
			v-for="(item, index) in items"
			:key="index"
			:style="buttonStyle(item)"
			@click="component = item.component"
		>
		{{ item.label }} / 
		</button>
		<hr/>
		<div id="content" class="type_01 sub_main">
			<component
				:is="component"
				v-if="component"
			/>
		</div>
	</div>
  </page>
</template>

<script>
	import Page from '@/views/layout/Page.vue'
	import commonMixin from '@/common/mixins/commonMixin'
	import SampleComponents from './components/SampleComponents'
	import SampleRSS from './components/SampleRSS'
	import SampleAxios from './components/SampleAxios'
	import SampleModal from './components/SampleModal'
	import SampleFilter from './components/SampleFilter'
	import SampleCert from './components/SampleCert'
	import SampleNative from './components/SampleNative'

	export default {
		name: 'Sample',
		data: function() {
			return {
				component: SampleRSS,
				items: [
					{label: 'Components', component: SampleComponents},
					{label: 'RSS', component: SampleRSS},
					{label: 'Axios', component: SampleAxios},
					{label: 'Modal', component: SampleModal},
					{label: 'Filter', component: SampleFilter},
					{label: 'Cert', component: SampleCert},
					{label: 'Native', component: SampleNative}
				],
			}
		},
		computed: {
		},
		methods: {
			buttonStyle(item) {
				return item.component == this.component
					? 'background: khaki'
					: ''
			}
		},
		beforeCreate() {
		},
		created() {
			console.log('sample created')
		},
		mounted() {
			this.box2Ref = this.$refs.box2Ref
		},
		mixins: [
			commonMixin
		],
		components: {
			Page
		},
	}
</script>
