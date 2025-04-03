<template>
  <div class="inner-wrap select">
    <button 
			type="button"
			class="btn-close"
			@click="close()"
		>
			팝업닫기
		</button>
    <div class="content-wrap">
      <div class="content">
        <div class="select-wrap">
          <dl class="btn-box">
            <dt><span class="tit">{{ title }}</span></dt>
            <dd>
              <button
                v-for="(item, index) in options"
                :key="index"
                :class="{active: item.comnCId === selectVal}"
                type="button"
                @click="buttonClick(item)"
              >
                <component
                  :is="renderer"
                  :data="item"
                  :config="modalConfig.renderer"
                />
              </button>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import popupMixin from '@/common/mixins/popupMixin'
  import {mapGetters} from 'vuex'
  
  export default {
    name: 'SelectPopup',
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
      },
      getCodeOption() {
        const code = this.params.code
        const list = this.codeOptions
        return list.filter(d => d.comnCGrpId === code)
      }
    },
    mounted() {
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
    components: {
    },
		mixins: [
			popupMixin
		],
  }
</script>
