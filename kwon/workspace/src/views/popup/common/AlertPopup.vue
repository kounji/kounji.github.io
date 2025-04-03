<template>
  <div>
    <!-- alert pupop S -->
    <div class="dimmed" style="display:block;"></div>	
    <div class="alert_popup renewal" id="alert_popup"> <!-- 개발시 style="display:block;" 제거 -->
      <div class="popup_content">
        <p class="txt_normal" id='popup_content_detail'>
          <template v-for="(d, i) in contents">
            {{ d }}<br :key="'br_'+i"/>
          </template>
        </p>
      </div>
      <div class="popup_footer">
        <div class="btn_box">
              <a href="javascript:void(0);"
                v-for="(item, index) in buttons"
                :key="index"
                :class="item.class"
                @click="buttonClick(item.text)"
              >
                {{ item.text }}
              </a>
        </div>
      </div>
    </div>
    <!--// alert popup E -->
    <div v-show="false" class="btn_close" aria-hidden="true">팝업닫기</div>
  </div>
</template>

<script>
  
  import commonMixin from '@/common/mixins/commonMixin'
  import popupMixin from '@/common/mixins/popupMixin'
  import {mapGetters} from 'vuex'

  export default {
    name: 'AlertPopup',
    computed: {
      title() {
        return this.params.title || ''
      },
      content() {
        return this.params.content || ''
      },
      contents() {
        return Array.isArray(this.params.content.toString().split('<br>').join('<BR>').split('<BR>'))
          ? this.params.content.toString().split('<br>').join('<BR>').split('<BR>')
          : [this.params.content]
      },
      buttonText() {
        return this.params.buttonText || ''
      },
      buttons() {
        return this.params.buttons
      },
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
    },
    data:  () => {
      return {
      }
    },
    methods: {
      buttonClick(buttonText) {
        this.close(buttonText)
      }
    },
    mounted() {
    },
    components: {
    },
    created(){
    },    
    destroyed(){
    },
    updated(){
      
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
  }
</script>
