<template>     
  <div class="cmm-checkbox">
    <input type="checkbox" :id="id" @change="chngValue">
    <label :for="id">
      <span class="icon"><img src="/" alt="data.clntnm"></span>
      <strong class="tit">{{data.clntnm}}</strong>
      <span class="txt">{{data.stlMns}}</span>      
      <cmm-price 
        :signColor="true"
        :sign="setSign"        
        :price= "data.tram" />
    </label>
  </div>  
</template>

<script>  
  import CmmPrice from '@/components/CmmPrice' 

  export default {
    name: 'FncTrbrkBox',
    props: {
      isChngDate: null,  // 최종 출력Data 일자
      id: [Number, String],
      data: {
        type: Object,
        default: () => ({})
      },
    },
    computed : {      
      isPlus() {
        return this.data.tram > 0;
      },
      istIstPrd() {
        return this.data.istPrdMtcn.length>0;
      },
      setSign() {
        return  this.data.tram < 0 ? '-':''
      },      
    },
    methods: {
      initComponent() {
        this.getData()
      },
      chngValue(event) {
        this.$emit('input', event.target.checked)
      },   
    },    
    components: {      
      CmmPrice,      
    }
  }
</script>

<style scoped>
</style>
