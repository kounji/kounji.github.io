<template>
  <div class="inner-wrap loading">
      <!-- <img :src="require(`@/assets/images/common/loading.gif`)" alt=""> -->
    <h1>loading</h1>
      <div id="loadingArea">
				<div title="로딩중" role="img" class="loadingWrap">
					<div class="loadingChaWrap">
						<span class="cha1"></span>
						<span class="cha2"></span>
						<span class="cha3"></span>
					</div>
					<div class="loadingDotWrap">
						<span class="dotC"></span>
						<span class="dotL"></span>
						<span class="dotR"></span>
					</div>
				</div>
			</div>
  </div>
</template>

<script>
	import popupMixin from '@/common/mixins/popupMixin'

  export default {
    name: 'LoadingPopup',
    computed: {
      title() {
        return this.params.title || ''
      },
    },
    data: function() {
      return {
      }
    },
    methods: {
    },
    mounted() {
      setTimeout(() => {
        this.close()
      }, 3000)
    },
    components: {
    },
		mixins: [
			popupMixin
		],
  }
</script>
