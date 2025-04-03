<template>
	<div class="chart-box">
		<chart
			chartId="yearChart"
			holderId="yearChartHolder"
			:layout="layout"
			:data="chartData"
		/>
	</div>
</template>

<script>
import Chart from '@/components/Chart.vue'
export default {
	name: 'SampleChart',
	props: {
		chartData:Array
	},
	data: function() { 
		return {
			layout: `
				<rMateChart backgroundColor="#FFFFFF" borderStyle="none">
					<Options>
						<Caption text="지난해비교"/>
						<SubCaption text="" textAlign="center" />
						<Legend defaultMouseOverAction="false" />
					</Options>
					<NumberFormatter id="numfmt" useThousandsSeparator="true"/>
					<Column2DChart showDataTips="true" columnWidthRatio="0.55" selectionMode="single">
						<horizontalAxis>
							<CategoryAxis categoryField="stYnEdYn"/>
						</horizontalAxis>
						<verticalAxis>
              <LinearAxis maximum="10000000" interval="1000000" formatter="{numfmt}" />
						</verticalAxis>
						<series>
							<Column2DSeries labelPosition="outside" yField="sum" displayName="수익비교" showValueLabels="[1]">
								<showDataEffect>
									<SeriesInterpolate/>
								</showDataEffect>
							</Column2DSeries>
						</series>
					</Column2DChart>
				</rMateChart>
			`,
			data: [],
		}
	},
	methods: { 
	},
	created(){
	},
	computed: {
		
	},
	mounted(){
	},
	components: {
		Chart,
	},
}
</script>