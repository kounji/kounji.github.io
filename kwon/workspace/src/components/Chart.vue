<template>
  <div :id="holderId" class="chartHolder"></div>
</template>

<script>
  export default {
    name: 'Chart',
    props: {
			chartId: { // 차트 아이디
				type : String,
				default : "chart",
			},
			holderId: { // 차트가 그려질 객체 아이디
				type : String,
				default : "chartHolder"
			},
			chartVars: {
				type : String,
				default : "useContextMenu=false"
			},
			layout : [String, Object], // 차트 레이아웃
			data : [Array, Object] // 차트 데이터
		},
		data: function() {
			return {}
		},
    methods: { 
      /**
			 * rMateChartH5 객체 생성
			 */
			create() {
				rMateChartH5.create(this.chartId, this.holderId, this.chartVars)
			},
			call(...params) {
				rMateChartH5.call(this.chartId, ...params)
			},
			/**
			 * 레이아웃 설정
			 */
			setLayout(layout) {
				this.call("setLayout", layout)
			},
			/**
			 * 데이터 설정
			 */
			setData(data) {
				this.call("setData", data)
			},
			/**
			 * 프리로더 출력
			 */
			showAdditionalPreloader() {
				this.call("showAdditionalPreloader")
			},
			/**
			 * 프리로더 삭제
			 */
			removeAdditionalPreloader() {
				this.call("removeAdditionalPreloader")
			}
    },
    mounted() {
			this.create()
			this.setLayout(this.layout)
			this.setData(this.data)
    },
    components: {
		},
    watch: {
      data(val) {
        this.setData(val)
      },
    }
  }
</script>

<style scoped>
	.chartHolder {
		width: 100%;
		height: 100%;
		background: '#FFFFFF';
	}
</style>