<template>  
  <a href="#" v-if="link" @click.prevent="click">

    <!-- 거래일자 -->
    <span class="cmm-date">
      <em class="num">{{getDate(data.trDt||data.basYm)}}</em>
      <em class="unit">{{getFormat}}</em>
    </span>    

    <!-- 거래처 -->  
    <span class="tit">{{data.clntnm||data.mchtHgnm||''}}</span>

    <!-- 거래금액 -->
    <cmm-price 
      :format="format||'20'"
      :sign="sign"
      :curc="data.curc"
      :price="data.tram||data.istAm||data.rqsAm||0" 
      :fcprice="data.fcTram||0" 
    />           

    <!-- 거래수단 -->
    <span class="txt">{{getTxt}}</span>

    <!-- 할부 -->
    <cmm-num  v-if="isIst"
      type="ist"
      unit="할부" 
      :num1="data.istSc"
      :num2="data.istPrdMtcn" 
    />    
  </a>          

  <div v-else class="link">
    <!-- 거래일자 -->
    <span class="cmm-date">
      <em class="num">{{getDate(data.trDt||data.basYm)}}</em>
      <em class="unit">{{getFormat}}</em>
    </span>    

    <!-- 거래처 -->  
    <span class="tit">{{data.clntnm||data.mchtHgnm||''}}</span>
    
    <!-- 거래수단 -->
    <span class="txt">{{getTxt}}</span>
    
    <!-- 할부 -->
    <span>할부({{data.istSc}}/{{data.istPrdMtcn}})</span>

    <!-- 거래금액 -->
    <cmm-price       
      :format="format||'20'"
      :sign="sign"
      :curc="data.curc"
      :price="data.tram||data.istAm||data.rqsAm||0" 
      :fcprice="data.fcTram||0" 
    />       

  </div>  
</template>

<script>
  import {dateFormat} from '@/utils/date'
  // import CmmDate from '@/components/CmmDate' 
  import CmmPrice from '@/components/CmmPrice' 
  import CmmNum from '@/components/CmmNum' 
  
  export default {
    name: 'XpsBrkBox',
    props: {
      dateFormat: String,
      format: String,
      sign: String,
      link: Boolean,
      isChngDate: null,  // 최종 출력Data 일자
      data: {
        type: Object,
        default: () => ({})
      },
    },
    methods: {
      initComponent() {        
      },
      isEmpty(value) {
        
        if (value === null || value === undefined) return true
        
        if (typeof value === "string") {
          if (value.trim().length<1) return true
        }
        
        return false          
      },
      isNotEmpty(value) {
        return !this.isEmpty(value)
      },
      getDate(date) {
        return dateFormat(date, this.isEmpty(this.dateFormat)?'D':this.dateFormat)
      },
      click() {
        this.$emit('click')
      },
    },
    created() {
      this.initComponent()
    },
    computed : {
      isIst() {
        return !this.isEmpty(this.data.istPrdMtcn)
      },
      getFormat() {
        return this.dateFormat==='M'?'월':'일'
      },
      /**
       *  자산카테고리구분코드별 거래처명
       */      
      getTxt() {                
        /* 이체거래일 경우 변경 */        
        if (this.data.asetCtgrDsc === '3') {        
          // 자산관리입출금구분코드[1:입금, 2:출금]
          return this.data.asetAmnRndaDsc === '1' 
                  ? this.data.cdWrsnm.concat(' ← 입금')
                  : this.data.cdWrsnm.concat(' → 출금')                    
        }
        
        /* 수기등록 항목은 고정 데이터 */
        if (this.data.dataSrcDsc === '04')  return '현금'

        return this.data.cdWrsnm||this.data.stlMns||this.data.asetAmnFncorgCnm||this.data.trDsnm
      },
    },
    components: {      
      // CmmDate,
      CmmPrice,
      CmmNum,
    }

  }
</script>

<style scoped>
</style>
