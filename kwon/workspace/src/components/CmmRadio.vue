<template>       
  <div class="cmm-radio" :class="{checked: checked}">
    <span class="icon" :class="{cat01:isIcon}" v-if="isIcon">
      {{iconFlnm}}
    </span>
    
    <input type="radio" 
      :name="groupId" 
      :id="id"     
      :disabled="isDisabled" 
      :checked="checked"
      @change="chngValue">
    
    <label :for="id" :class="{'t-hidden':txtNact}">
      {{name}}
    </label>
  </div>    
</template>

<script>
  export default {
    name: 'CmmRadio',    
    data: () => {
      return {        
        isChngDate: null,   // 최종 출력Data 일자    
      }
    },
    props: {
      checked: Boolean,
      txtNact: Boolean,
      groupId: String,
      id: String,
      name: String,
      value: String,
      iconId: String,     
      iconFlnm: String,    
      disabled: Boolean,  
    },
    methods: {
      initComponent() {
        this.isChngDate = new Date()                
        // document.getElementById(this.id).setAttribute("checked", this.checked);
      },
      chngValue(event) {
        this.$emit('input', event.target.id)
      },
      isEmpty(value) {
        
        if (value === null || value === undefined) return true
        
        if (typeof value === 'string') {
          if (value.trim().length<1) return true
        }
                
        return false          
      },
      isNotEmpty(value) {
        return !this.isEmpty(value)
      },
      
    },    
    created() {
      this.initComponent()
    },
    computed : {        
      isIcon() {
        return this.isNotEmpty(this.iconId)
      },
      isDisabled() {
        return this.disabled != null && this.disabled?'disabled':null
      },
    },
  }
</script>

<style scoped>
</style>
