<template>
  <div class="cmm-switch-box" >              
    <p class="label">{{label}}</p>
    <span class="cmm-switch" :class="(type==='small')?'sm':''">
        <input type="checkbox" 
          :id="id"            
          :checked="getChecked"
          :disabled="isDisabled"
          @change="updateSwitch">
        <label :for="id">
          <span class="txt">{{text||'선택'}}</span>
          <span role="img" class="on">포함</span>
          <span role="img" class="off">제외</span>
        </label>
    </span>    
  </div>
</template>

<script>
  export default {
    name: 'CmmSwitchBox',
      data: () => {
      return {               
        isChngDate: null,         // 최종 출력Data 일자    
      }
    },
    props: {      
      id: String,
      label: String,
      checked: [Boolean, String],
      text: String,
      disabled: Boolean,
      data: {        
        type: Object,
        default: () => ({})
      },
      type: String,
    },
    created() {
      this.initComponent()
    },
    methods: {
      initComponent() {   
        this.isChngDate = new Date()        
      },      
      updateSwitch(event) {
        this.$emit('input', event.target.checked)
      }
    },
    computed : {
      isDisabled() {
        return this.disabled != null && this.disabled?'disabled':null
      },
      getChecked() {
        return this.checked?'checked':''
      }
    }
  }
</script>

<style scoped>
</style>
