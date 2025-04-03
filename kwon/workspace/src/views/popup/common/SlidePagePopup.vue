<!--
/*************************************************************************
* @ 서비스경로 : 공통팝업
* @ 페이지설명 : 슬라이드 페이지 팝업
* @ 파일명     : src/views/popup/common/SlidePagePopup.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-10
* @ 비고       : sample > sample modal 참조
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              작성자명                 최초작성
*************************************************************************/
-->
<template>
    <component
      :is="renderer"
      :config="modalConfig.renderer"
      :cdata="modalConfig.renderer ? modalConfig.renderer.cdata : {}"
    />
</template>

<script>
	import popupMixin from '@/common/mixins/popupMixin'
  import {mapGetters} from 'vuex'
  
  export default {
    name: 'SlidePagePopup',
    computed: {
      ...mapGetters('modal', [
        'modalList',
				'modalComponent',
				'modalAriaHidden'
      ]),
			...mapGetters('layout', [
				'isMainPage',
				'isFirstPage',
			]),
      title() {
        return this.params.title || ''
      },
      renderer() {
        return this.modalConfig.renderer && this.modalConfig.renderer.component
      },
    },
    data: function() {
      return {
      }
    },
    methods: {
    },
    mounted() {
  
    },
    components: {
    },
    created(){
      console.log('slidePagePopup creeated')
    },    
    destroyed(){
      console.log('slidePagePopup destoryed')
    },
		mixins: [
			popupMixin
		],
  }
</script>
