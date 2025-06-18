<!--
/*************************************************************************
* @ 서비스경로 : 공통팝업
* @ 페이지설명 : 슬라이드 페이지 Single 선택 팝업 (radio)
* @ 파일명     : src/views/popup/common/SelectSinglePopup.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515729                 최초작성
*************************************************************************/
-->
<template>
  <div>
    <div class="dimmed" style="display: block;" @click.prevent="close()"></div>
    <div class="popup_box">
      <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
        <div class="popup_header">
          <h1>{{ title }}</h1>          
        </div>
        <div class="popup_content">
          <div class="com_txt_type02">
              <ul class="com_radio_type01">
                  <li v-for="(item, index) in options" :key="index" @click="buttonClick(item)">
                      <span class="btn_radio">
                          <input type="radio" name="com_check" :id="'com_check'+index" :checked="(item.comnCId === selectVal)" aria-hidden="true">
                          <label :for="'com_check'+index" role="radio" :aria-checked="(item.comnCId === selectVal) ? true : false">
                              <component
                                :is="renderer"
                                :data="item"
                                :config="modalConfig.renderer"
                              />
                          </label>
                      </span>
                  </li>
              </ul>
          </div>
        </div>
        
        <a href="javascript:void(0);" @click="close()" class="btn_close"><span class="">취소</span></a>
      </div>
    </div>
  </div>
</template>

<script>
	import popupMixin from '@/common/mixins/popupMixin'
  import {mapGetters} from 'vuex'
  
  export default {
    name: 'SelectSinglePopup',
    computed: {
      ...mapGetters('modal', [
        'modalList',
				'modalComponent',
				'modalAriaHidden'
      ]),
      ...mapGetters('config', [
				'codeMap',
      ]),
      title() {
        return this.params.title || ''
      },
      codeOptions() {
        return this.codeMap.get(this.params.code)
      },
      options() {
        return this.codeOptions || this.params.list || []
      },
      renderer() {
        return this.modalConfig.renderer && this.modalConfig.renderer.component
      },
      selectVal() {
        return this.params.selectVal
      }
    },
    data: function() {
      return {
      }
    },
    methods: {
      buttonClick(item) {
        this.close(item)
      }
    },
    mounted() {
    },
    components: {
    },
    created(){
      //부모 style overflow hidden 처리
      // const parentModalId  = this.$parent.$el.firstElementChild
      // const parentModalChildNodes = parentModalId.childNodes[1].childNodes
      // for(let k=0; k <  parentModalChildNodes.length; k++)
      // {
      //   const childElement = parentModalChildNodes[k]
      //   if(childElement.className !== undefined && childElement.className.indexOf("popup_content") > -1)
      //   {
      //     childElement.style.overflow = "hidden"
      //     break
      //   }
      // }

      //popup Mix로 이관
      // let parentModalId  = document.getElementById("modal_" + (this.modalList.length - 1))

      // if(parentModalId === null) {
      //   parentModalId = this.$parent.$parent.$el.firstElementChild
      //   const parentModalChildNodes = parentModalId.childNodes[1]
      //   parentModalChildNodes.style.overflow = "hidden" 
      // }
      // else {
      //   const parentModalChildNodes = parentModalId.childNodes[1].childNodes
      //   for(let k=0; k <  parentModalChildNodes.length; k++)
      //   {
      //     const childElement = parentModalChildNodes[k]
      //     if(childElement.className !== undefined && childElement.className.indexOf("popup_content") > -1)
      //     {
      //       childElement.style.overflow = "hidden"
      //       break
      //     }
      //   }
      // }
    },    
    destroyed(){
      //부모 style overflow hidden 제거처리
      // const parentModalId  = this.$parent.$el.firstElementChild
      // const parentModalChildNodes = parentModalId.childNodes[1].childNodes
      // for(let k=0; k <  parentModalChildNodes.length; k++)
      // {
      //   const childElement = parentModalChildNodes[k]
      //   if(childElement.className !== undefined && childElement.className.indexOf("popup_content") > -1)
      //   {
      //     childElement.style.overflow = ""
      //     break
      //   }
      // }

      //popup Mix로 이관
      // let parentModalId  = document.getElementById("modal_" + (this.modalList.length))
      
      // if(parentModalId === null) {
      //   parentModalId = this.$parent.$parent.$el.firstElementChild
      //   const parentModalChildNodes = parentModalId.childNodes[1]
      //   parentModalChildNodes.style.overflow = "" 
      // }
      // else {
      //   const parentModalChildNodes = parentModalId.childNodes[1].childNodes
      //   for(let k=0; k <  parentModalChildNodes.length; k++)
      //   {
      //     const childElement = parentModalChildNodes[k]
      //     if(childElement.className !== undefined && childElement.className.indexOf("popup_content") > -1)
      //     {
      //       childElement.style.overflow = ""
      //       break
      //     }
      //   }
      // }
    },       
		mixins: [
			popupMixin
		],
  }
</script>
