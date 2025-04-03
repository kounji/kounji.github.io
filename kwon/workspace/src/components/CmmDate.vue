<template>    
  <div class="cmm-date">
    <span>      
      <em class="num">{{date}}</em>
      <em class="unit">{{unit}}</em>
    </span>
  </div>      
</template>

<script>
  export default {
    name: 'CmmDate',    
    data: () => {
      return {
        isChngDate: null,  // 최종 출력Data 일자    
      }
    },
    props: {                        
      date: String,                    // 일자
      unit: String,                    // 단위
    },
    methods: {
      initComponent() {
        this.isChngDate = new Date()
      },     
    },    
    created() {
      this.initComponent()
    },
    computed : {      
    },
  }
</script>

<style scoped>
</style>
