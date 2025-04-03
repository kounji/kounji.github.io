<template>
  <div class="full_popup" id="full_popup_01">
    <div class="popup_header">
        <h1>{{title}}</h1>
    </div>
    <div class="popup_content">
        <iframe :src="url" style="width:100%;height:100%"></iframe>
    </div>
    <a @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>
  </div>    
</template>

<script>
	import popupMixin from '@/common/mixins/popupMixin'
    
  export default {
    name: 'IframePopup',
    data: function() {
      return {
      }
    },
    computed: {
      title() {
        return this.params.title || ''
      },
      url() {
        return this.params.url || ''
      },
    },     
    methods: {
    
    },
    mounted() {

    },
    components: {
    },
		mixins: [
			popupMixin
		],
  }
</script>