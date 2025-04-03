<!--
/*************************************************************************
* @ 서비스경로 : 공통팝업
* @ 페이지설명 : 슬라이드 년/월 선택 페이지 팝업
* @ 파일명     : src/views/popup/common/SlideSelectPopupMonth.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-24
* @ 비고       : sample > sample modal 참조
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-24              작성자명                 최초작성
*************************************************************************/
-->
<template>
  <div>
    <!-- slide popup S -->
    <div class="dimmed" style="display:block;"></div>
    <div class="popup_box">
      <div aria-hidden="false" class="slide_popup" id="slide_select_popup_ym" style="display:block;">
        <div class="popup_header no_line">
          <span style="text-align:center"><h1>{{title}}</h1></span>
        </div>
        <div class="popup_content">
          <year-table
             @yearClick="yearClick"
          />
        </div>
        <a href="javascript:void(0);" class="btn_close" @click="close()"><span class="">닫기</span></a>
      </div>
    </div>
    <!--// slide popup E -->
  </div>
</template>
<script>
  import popupMixin from '@/common/mixins/popupMixin'
  import YearTable from './components/YearTable'
  import {mapGetters} from 'vuex'

  export default {
    name: 'SlideSelectPopupYear',
    props: {
      yyyymm: {
        type: String,
        default: ''
      }
    },    
    computed: {
      ...mapGetters('modal', [
				'modalList',
				'modalConfig',
				'modalComponent',
				'modalAriaHidden',
				'hasModal',
				'hasLoadingBackground',
				'hasLoading',
				'toastList',
				'toastMessage',
				'hasToast'
      ]),
      title() {
        return this.params.title || ''
      }
    },

    data: function() {
      return {
  
      }
    },
    methods: {
      initComponent() {
        this.getData()
      },
      getData(){
      },
      yearClick(value) {
        this.close(value)
      },      
    },
    mounted() {
      this.initComponent()
    },
    components: {
      YearTable,
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
      popupMixin,
      
		],
  }
</script>
