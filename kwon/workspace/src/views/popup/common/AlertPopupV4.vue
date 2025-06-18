<template>
  <div>
    <!-- alert pupop S -->
    <div class="dimmed" style="display:block;"></div>	
    <div class="center_popup" id="center_popup"> <!-- 개발시 style="display:block;" 제거 -->
      <div class="popup_content">
        <p class="tit" id="popup_content_title" v-if="titles.length > 0">
          <template v-for="(d, i) in titles">
            {{ d }}<br :key="'br_'+i"/>
          </template>
        </p>
        <p class="txt" id='popup_content_detail'>
          <template v-for="(d, i) in contents">
            {{ d }}<br :key="'br_'+i"/>
          </template>
        </p>
      </div>
      <div class="popup_footer">
        <div class="btns_wrap">
              <!-- <a href="javascript:void(0);"
                v-for="(item, index) in buttons"
                :key="index"
                :class="item.class"
                @click="buttonClick(item.text)"
              >
                {{ item.text }}
              </a> -->
              <button type="button" 
                v-for="(item, idx) in buttons" 
                :key="idx" 
                :class="item.class" 
                @click="buttonClick(item.text)"
              >
                {{ item.text }}
              </button>
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
    name: 'AlertPopupV4',
    computed: {
      title() {
        return this.params?.title || ''
      },
      titles() {
        let rtnArr = this.params?.title?.toString().split('<br>').join('<BR>').split('<BR>') || []
        if(rtnArr.length == 1) {
          if(this.isNull(rtnArr[0])) rtnArr = []
          else rtnArr = [this.params?.title]
        }

        // return Array.isArray(this.params.title.toString().split('<br>').join('<BR>').split('<BR>'))
        //   ? this.params.title.toString().split('<br>').join('<BR>').split('<BR>')
        //   : [this.params.title]
        return rtnArr
      },
      content() {
        return this.params.content || ''
      },
      contents() {
        let rtnArr = this.params?.content || []
        let rtnStr = ''
        if(Array.isArray(rtnArr)) {
          rtnArr.forEach((item, idx) => {
            rtnArr[idx] = idx != rtnArr.length-1 ? rtnArr[idx] + '<br>' : rtnArr[idx]
          })
          rtnStr = rtnArr.toString().split(',').join('')
        } else {
          rtnStr = rtnArr
        }

        return Array.isArray(rtnStr.toString().split('<br>').join('<BR>').split('<BR>'))
          ? rtnStr.toString().split('<br>').join('<BR>').split('<BR>')
          : [rtnStr]

        // return Array.isArray(this.params.content.toString().split('<br>').join('<BR>').split('<BR>'))
        //   ? this.params.content.toString().split('<br>').join('<BR>').split('<BR>')
        //   : [this.params.content]
      },
      buttonText() {
        return this.params.buttonText || ''
      },
      buttons() {
        let rtnBtn = this.params.buttons || []
        rtnBtn.forEach(item => {
          if(item.class.includes('btn_mint')) item.class = 'btns lg primary'
          if(item.class.includes('btn_grey')) item.class = 'btns lg'
        })

        return rtnBtn
        // return this.params.buttons
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
