<template>       
  <div v-if="isCurrency" class="cmm-input">
    <input autocomplete="off" type="tel" class="t-right" :maxlength="maxLen||'15'" :id="id" :title="title" :placeholder="placeholder" :value="value" @keyup="numValidation" @focus="cFocus" @input="chngValue">   
  </div> 
  <div v-else class="cmm-input">
    <input autocomplete="off" type="text" :ref="id" :id="id" :title="title" :placeholder="placeholder" :value="value" :maxlength="maxLen||20"  style="ime-mode:active" @input="chngValue">   
  </div> 
</template>

<script>
  import {keyupNumFormat} from '@/utils/number'

  export default {
    name: 'CmmInput',    
    data: () => {
      return {
        price: null,
        isChngDate: null,   // 최종 출력Data 일자    
      }
    },
    props: {     
      type: String,   
      title: String,
      id: String,
      name: String,
      value: [String, Number],
      maxLen: Number,
      minLen: Number,
      placeholder: String,
    },
    methods: {
      initComponent() {             
        this.isChngDate = new Date()
      },
      chngValue(event) {        
        console.log("value data : " + event.target.value )  
        
        if (this.type != 'currency') {
          event.target.value = this.lengthChk()        
          console.log("value data af : " + event.target.value )  
        }
        
        this.$emit('input', event.target.value)
      },
      lengthChk() {
        // let l_value = document.querySelector("#"+this.id).value

        // console.log("txtInput data : " + l_value)  
        if ($("#"+this.id).val().length > (this.maxLen||20)){
          $("#"+this.id).val($("#"+this.id).val().substr(0, (this.maxLen||20)));
        } 

        // if (l_value.length > (this.maxLen||20)){
        //   l_value = l_value.substr(0, (this.maxLen||20))
        // } 

        return $("#"+this.id).val()
      },
      numValidation(e){			

        let l_price = e.target.value

        if (l_price.length == 1) {        
          if (l_price == 0) {
            l_price = l_price.slice(0, -1);
          } 
          else {
            l_price = l_price.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'');
            l_price = l_price.split(",").join("");
            l_price = keyupNumFormat(l_price);
          }
        } else {
          l_price = l_price.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'');
          l_price = l_price.split(",").join("");
          l_price = keyupNumFormat(l_price);
        }

        this.$emit('input', l_price)
      },
      cFocus() {
        this.$emit('input', null)
      },
      cBlur() {
        let l_price = keyupNumFormat(event.target.value)
        this.$emit('input', l_price)
      },
		},
    created() {
      this.initComponent()
    },
    computed : {        
      isIcon() {
        return this.isNotEmpty(this.iconId)
      },
      isCurrency() {
        return this.type === 'currency'
      },
    },
    mounted() {                
    },
    updated() {
    },
  }
</script>

<style scoped>
</style>>
  

