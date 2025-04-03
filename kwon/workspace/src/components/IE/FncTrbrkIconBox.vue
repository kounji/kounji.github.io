<template>     
  <a href="javascript:void(0);">    
    <component :is="type||'span'" class="tit">{{data.mchtHgnm||data.acKdnm||data.snsCntn||data.clntnm||data.bnmTinm}}</component>        
    <span class="txt">{{getTxt}}</span>
    <span class="txt">{{getIstPrdMtcn}}</span>
    <span class="txt">{{getCtgr}}</span>    
    <cmm-price
      :format="data.asetCtgrDsc+(data.asetAmnRndaDsc||'0')"     
      :curc="data.curc"
      :signColor="true"
      :price="data.tram"
      :fcprice="data.fcTram"
    />            
  </a>          
</template>

<script>
  import CmmPrice from '@/components/CmmPrice' 

  export default {
    name: 'FncTrbrkIconBox',
    props: {      
      data: {
        type: Object,
        default: () => ({})
      },
      isChngDate: null,                         // 최종 출력Data 일자
      type: [String],                           // 타입정의
    },
    methods: {
      initComponent() {
        this.getData()
      },
      isNmsTram() {        
        
        // 자산카테고리구분코드[1:수입, 2:지출, 3:이체]로 지출 구분
        if (this.data.asetCtgrDsc === '2')  return true

        // 자산카테고리구분코드 이체일 경우 자산관리입출금구분코드[1:입금, 2:출금]로 구분
        if (this.data.asetCtgrDsc === '3' && this.data.asetAmnRndaDsc === '2') return true

        return false
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
    },
    computed : {
      isIst() {
        return this.isNotEmpty(this.data.istPrdMtcn)
      },
      isStrong() {
        return this.type === 'strong'
      },
      setSign() {        
        return this.isNmsTram()? '-' : ''
      },
      getIstPrdMtcn() {
        
        let l_istPrdMtcn = null

        if (this.data.istPrdMtcn === null || this.data.istPrdMtcn === undefined) 
          return l_istPrdMtcn

        if (this.data.istPrdMtcn > 0)
          l_istPrdMtcn = '할부 ('.concat(this.data.istPrdMtcn).concat('개월)')

        return l_istPrdMtcn
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

        return this.data.cdWrsnm||this.data.trDsnm||this.data.stlMns
      },
      // getPrice() {

      //   let l_price = this.isEmpty(this.data.curc) || this.data.curc ==="KRW" ? 

      //   return this.isNmsTram()? new Number(l_price)*-1 : l_price
      // },
      getCtgr() {   
        let l_ctgrnm = null
        if (this.data.asetCtgrDsc === '3') {
          l_ctgrnm = this.isEmpty(this.data.asetAmnCtgrnm)? '미분류' : this.data.asetAmnCtgrnm
        }

        return l_ctgrnm
      },      
    },
    components: {    
      CmmPrice,      
    }
  }
</script>

<style scoped>
</style>
