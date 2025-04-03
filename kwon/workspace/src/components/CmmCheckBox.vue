<template>    
  <!--
  <span class="cmm-checkbox" :class="{checked: checked}">
    <input type="checkbox" 
      :id="id" 
      :checked="checked"
      :disabled="isDisabled"
      @change="chngValue"
    >
    <label :for="id">
      {{name}}
    </label>
  </span>  
-->
  <span class="btn_checkbox" :class="{checked: checked}">
    <input type="checkbox" 
      :id="id" 
      :checked="checked"
      :disabled="isDisabled"
      @change="chngValue"
    >
    <label :for="id">
      {{name}}
    </label>
  </span>  
</template>

<script>
  export default {
    name: 'CmmCheckBox',    
    data: () => {
      return {
        isChngDate: null,  // 최종 출력Data 일자    
      }
    },
    props: {
      checked: Boolean,
      id: String,
      name: String,
      disabled: Boolean,
    },
    methods: {
      initComponent() {
        this.isChngDate = new Date()
      },
      chngValue(event) {
        this.$emit('input', event.target.checked)
      },
    },    
    created() {
      this.initComponent()
    },
    computed : {   
      isDisabled() {
        return this.disabled != null && this.disabled?'disabled':null
      },     
    },
  }
</script>

<style scoped>
</style>
