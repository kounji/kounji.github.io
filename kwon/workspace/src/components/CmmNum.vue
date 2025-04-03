<template>
  <div class="cmm-num">
    <span v-if="isIst">      
      <em class="unit">{{unit}}</em>(
      <em class="num1">{{num1}}</em>/
      <em class="num2">{{num2}}</em>)
    </span>
    <span v-if="isCtgr">
      <em class="num">{{num1}}</em>
      <em class="unit">건</em>
      (<em class="num">{{num2}}</em>
      <em class="unit">%</em>)
    </span>
  </div>      
</template>

<script>
  export default {
    name: 'CmmNum',    
    data: () => {
      return {
        isChngDate: null,  // 최종 출력Data 일자    
      }
    },
    props: {     
      type: String,                   // 타입
      unit: String,                   // 단위
      num1: [String, Number],         // 숫자1
      num2: [String, Number],         // 숫자2
    },
    methods: {
      initComponent() {
        this.isChngDate = new Date()
        if (this.isEmpty(this.type)) this.type = 'ist'
      },     
      isEmpty(value) {
        
        if (value === null || value === undefined) return true
                
        if (typeof value === "string") {              
          if (value.trim().length < 1) return true          
        }
        
        return false          
      },
    },    
    created() {
      this.initComponent()
    },
    computed : {      
      isIst() {
        return this.type === 'ist'
      },
      isCtgr() {
        return this.type === 'ctgr'
      },
    },  
  }
</script>

<style scoped>
</style>
