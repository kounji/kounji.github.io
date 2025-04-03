<template>
  <component :is="tag||'span'" class="cmm-price" :class="classObj">
    
    <!-- 원화일 경우 -->
    <slot v-if="isKrw">
      <em v-if="isSign" class="unit">{{getSign}}</em>    
      <component :is="type||'em'" class="num">{{Math.abs(price) | numberFilter}}</component>
      <component :is="type||'em'" class="unit"> 원</component>  
    </slot>

    <!-- 외화일 경우 -->
    <slot v-else>
      <component :is="type||'em'" class="unit">{{curc}}</component>  
      <em v-if="isSign" class="unit">{{getSign}}</em>    
      <component :is="type||'em'" class="num">{{Math.abs(fcprice) | numberFilter('0,0.00', {precision: 2})}}</component>    
    </slot>
    
    <em v-if="isIst" class="block">할부 ({{getIst}})</em>
    <em v-if="isCtgr" class="block">{{ctgr}}</em>
    <em class="plus" v-if="plus">입금</em>
    <em class="minus" v-if="minus">출금</em>
  </component>
</template>

<script> 

  export default {
    name: 'CmmPrice',    
    data: () => {
      return {
        isChngDate: null,  // 최종 출력Data 일자    
      }
    },
    props: {       
      tag: [String],                            // 태그선언 [p/div/span]
      format: [String],                         // 포맷[10:수입(컬러on이면 plus) 20:지출(컬러ond이면 minus), 21:지출(컬러&-부호필수), 30:이체, 31:이체입금(컬러&-부호필수), 32:이체출금(컬러)]
      curc: [String],                           // 외화구분
      signColor: [Boolean],                     // 부호색
      sign: [String],                           // 부호
      unit: [String],                           // 단위
      istPrdMtcn: [String, Number],             // 할부기간개월수
      istSc: [String, Number],                  // 할부회차
      price: [String, Number],                  // 금액
      fcprice: [String, Number],                // 외화금액
      ctgr: [String],                           // 카테고리
      type: [String],                           // 타입정의
      plus: [Boolean],                          
      minus: [Boolean],
    },
    methods: {
      initComponent() {
        this.isChngDate = new Date()        
      },
      isEmpty(value) {
        
        if (value === null || value === undefined) return true
                
        if (typeof value === "string") {              
          if (value.trim().length < 1) return true          
        }
        
        return false          
      },
      isNotEmpty(value) {
        return !this.isEmpty(value)
      },
      isMinus(value) {
        return value<0?true:false
      },
    },    
    created() {
      this.initComponent()
    },
    computed : { 
      classObj() {

        let l_price = (this.isEmpty(this.curc) || this.curc ==="KRW") ? this.price : this.fcprice
        let l_isPlus = false
        let l_isMinus = false
      
        // 색상 활성화 시만 처리
        if (this.signColor === true) {
          
          // 지출&이체출금만 마이너스 처리
          if (this.isNotEmpty(this.format)) {
            if (this.format.charAt(0) === '2' || this.format === '32') {
              l_isMinus = true
            }
            else {
              l_isPlus = true
            }
          }
          else {
            if (l_price < 0) {
              l_isMinus = true
            }
            else {
              l_isPlus = true
            }
          }
        }
          
        return {
          plus: l_isPlus,
          minus: l_isMinus,
        }
      },
      isUnit() {
        return this.isNotEmpty(this.unit)
      },
      isIst() {
        return this.isNotEmpty(this.istPrdMtcn)
      },
      isCtgr() {
        return this.isNotEmpty(this.ctgr)
      },
      // 부호 입력여부
      isSign() {
        // 부호 입력시 활성
        if (this.isNotEmpty(this.sign)) {
          return true
        }

        // 포맷 입력시 활성시 해당 포맷일 경우[21:지출(컬러&-부호필수), 32:이체출금(컬러)]
        if (this.isNotEmpty(this.format) && (this.format.charAt(0) === '2' || this.format==='32')) {
          return true
        }

        return false
      },      
      isStrong() {
        return this.type === 'strong'
      },
      isKrw() {
        return (this.isEmpty(this.curc) || this.curc ==="KRW")? true:false
      },
      // 부호 입력처리
      getSign() {
        let l_sign = this.sign

        // 입력된 부호가 있을 경우 최우선 처리
        if (this.isNotEmpty(l_sign)) {
          return l_sign
        }

        // 그외에 부호 여부가 있을 경우 0원이 아니면 '-'처리한다.
        if (this.isSign)  {
          if (this.fcprice != 0 || this.price != 0) {
            l_sign = "-"  
          }
        }
        
        return l_sign
      },
    },
  }
</script>

<style scoped>
</style>
