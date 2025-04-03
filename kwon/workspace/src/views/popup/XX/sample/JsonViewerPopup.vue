<template>
  <div class="inner-wrap full">
    <div class="content-wrap">
      <div class="header">
				<button
					type="button"
					class="btn-close"
					@click="close"
				>
					<span>닫기</span>
				</button>
				<h1>Json Viewer</h1>
			</div>
      <div class="content">
        <vue-json-pretty
          :path="'res'"
          :data="jsonData"
        >
        </vue-json-pretty>
      </div>
    </div>
    <button 
			type="button"
			class="btn-close"
			@click="close"
		>
			팝업닫기
		</button>
  </div>
</template>

<script>
  import popupMixin from '@/common/mixins/popupMixin'
  import VueJsonPretty from 'vue-json-pretty'
  import 'vue-json-pretty/lib/styles.css'
  
  export default {
    name: 'JsonViewerPopup',
    data: function() {
      return {
        jsonData: {}
      }
    },
    methods: {
      test() {
        console.log('test', this.params)
      },
    },
    mounted() {
      console.log('JsonViewerPopup : mounted', this.params)
      this.jsonData = this.params.json
    },
    components: {
      VueJsonPretty
    },
		mixins: [
      popupMixin,
		],
  }
</script>
