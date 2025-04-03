<template>
  <!--<page class="xx">-->
  <page>
	<div id='wrap' style='top:60px;'>
		<button
			v-for="(item, index) in items"
			:key="index"
			:style="buttonStyle(item)"
			@click="component = item.component"
		>
		{{ item.label }} / 
		</button>
		<!--<hr style="display:block; border: solid; border-color: lightblue;"/>-->
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
	import SampleAxios from './components/SampleAxios'
	import SampleComponents from './components/SampleComponents'
	import SampleScript from './components/SampleScript'
	import SampleModal from './components/SampleModal'
	import SampleChart from './components/SampleChart'
	import SampleChart2 from './components/SampleChart2'
	import SampleFilter from './components/SampleFilter'
	import SampleScraping from './components/SampleScraping'
	import SampleNative from './components/SampleNative'
	import commonMixin from '@/common/mixins/commonMixin'
	import SelectBox from '@/components/SelectBox'
	import SampleIndustry from './components/SampleIndustry'

	export default {
		name: 'Sample',
		data: function() {
			return {
				component: SampleScraping,
				items: [
					{label: 'Components', component: SampleComponents},
					{label: 'Axios', component: SampleAxios},
					{label: 'Scraping', component: SampleScraping},
					{label: 'Script', component: SampleScript},
					{label: 'Modal', component: SampleModal},
					{label: 'Chart', component: SampleChart},
					{label: 'Chart2', component: SampleChart2},
					{label: 'Filter', component: SampleFilter},
					{label: 'Native', component: SampleNative},
					{label: 'Industry', component: SampleIndustry},
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
			Page,
			SelectBox
		},
	}
</script>
