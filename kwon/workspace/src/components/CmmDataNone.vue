<template>
  <div class="cmm-data-none" v-if="isVisible">
    <p class="tit">조회된 정보가 없습니다.</p> 
  </div>  
</template>

<script>
  export default {
    name: 'CmmDataNone',    
    data: () => {
      return {
        isChngDate: null,  // 최종 출력Data 일자    
      }
    },
    props: {     
      data: Array,                   // 타입
    },
    methods: {
      initComponent() {
        this.isChngDate = new Date()        
      },     
      isEmpty(value) {
        return (value === null || value === undefined || value.length < 1) ? true : false
      },
    },    
    created() {
      this.initComponent()
    },
    computed : {      
      isVisible() {        
        return this.isEmpty(this.data)
      },
    },  
  }
</script>