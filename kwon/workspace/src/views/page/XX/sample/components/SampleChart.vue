<template>
<div class="cmm-chart-wrap">
	<div class="chart-box" role="img" :aria-label="chartArrayText">
		<h4>chart</h4>
			<!--
			<chart-Sample
				:layout="layout"
				:data="data2"
			/>
			-->
		<span>=========== Toggle ============</span>
		<br>
		<div>	
				<chart-sample
					:chartId="'sampleChart'"
					:holderId="'sampleChartHolder'"
					:layout="layout"
					:data="data2"
				/>
		</div>
		<!--<div id="sampleChartHolder2"></div>-->
	</div>
</div>
</template>
<script>
	import chartSample from '@/components/Chart.vue' 

	export default {
		name: 'SampleChart',
		props: {
		},
		data: function() { 
			return {
				layout: {
					rMateChart: {
						backgroundColor: "#ffffff",
						borderStyle: "none",
						Options: {
							Caption: {
								text: "World Top 10 - Fastest Growing Economies (2017)"
							},
							SubCaption: {
								text: "GDP Growth (In %)",
								textAlign: "center"
							}
						},
						SeriesInterpolate: {
							id: "ss"
						},
						Column2DChart: {
							showDataTips: true,
							selectionMode: "multiple",
							columnWidthRatio: 0.48,
							horizontalAxis: {
								CategoryAxis: {
									categoryField: "Country"
								}
							},
							itemClickJsFunction: this.clickHandler,
							verticalAxis: {
								LinearAxis: {
									maximum: 100,
									interval: 10
								}
							},
							series: [{
								Column2DSeries: {
									labelPosition: "outside",
									yField: "GDP",
									displayName: "GDP Growth (In %)",
									showDataEffect: "{ss}",
									showValueLabels: [4]
								}
							}]
						}
					}
				},
				data:null,
				data2: [
					{"Country":"South Sudan", "GDP":20},
					{"Country":"Libya", "GDP":30},
					{"Country":"Sierra Leone", "GDP":51.2},
					{"Country":"Mongolia", "GDP":44.5},
					{"Country":"Paraguay", "GDP":62.35}
				],
				chartArrayText : "1월 총자산:0원, 2월 총자산:0원, 3월 총자산:1,295,952,305원, 4월 총자산:4,215,276,677원, 5월 총자산:4,215,348,081원",
			}
		},
	created(){

	},
    methods: {
			initComponent() {
				this.getData()
				//this.makeSampleChart3()
			},
			getData(){

			},
			clickHandler(seriesId, displayText, index, data, values) {
				console.log(seriesId, displayText, index, data, values)
			},
			/*
			makeSampleChart3(){
				setTimeout(function(){
					rMateChartH5.create("sampleChart2", "sampleChartHolder2", "", "100%", "100%")
					const chartData =  [{"Month":"Jan", "Rainfall":21},
										{"Month":"Feb", "Rainfall":29},
										{"Month":"Mar", "Rainfall":48},
										{"Month":"Apr", "Rainfall":38},
										{"Month":"May", "Rainfall":59},
										{"Month":"Jun", "Rainfall":77.2},
										{"Month":"Jul", "Rainfall":68},
										{"Month":"Aug", "Rainfall":58},
										{"Month":"Sep", "Rainfall":44},
										{"Month":"Oct", "Rainfall":23}
										]
					const layoutStr =
								'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
									+'<Options>'
										+'<Caption text="Monthly Rainfall in Vancouver" />'
										+'<SubCaption text="( mm )" textAlign="right" />'
									+'</Options>'
									+'<Bar2DChart showDataTips="true">'
										+'<horizontalAxis>'
											+'<LinearAxis maximum="100"/>'
											+'</horizontalAxis>'
										+'<verticalAxis>'
											+'<CategoryAxis categoryField="Month"/>'
										+'</verticalAxis>'
											+'<series>'
											+'<Bar2DSeries labelPosition="inside" xField="Rainfall" displayName="Rainfall" showValueLabels="[6,7]" color="#ffffff" insideLabelYOffset="-2">'
												+'<showDataEffect>'
													+'<SeriesInterpolate/>'
												+'</showDataEffect>'
											+'</Bar2DSeries>'
										+'</series>'
									+'</Bar2DChart>'
								+'</rMateChart>'

					rMateChartH5.calls("sampleChart2", {
									"setLayout" : layoutStr,
									"setData" : chartData
									})

					rMateChartH5.registerTheme(rMateChartH5.themes);
				}, 5)
			}
			*/
    },
    mounted() {
			this.initComponent()
    },
    components: {
      chartSample,
    },
  }
</script>