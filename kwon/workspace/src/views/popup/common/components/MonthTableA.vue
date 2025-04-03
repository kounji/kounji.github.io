<template>
  <div class="year_select_wrap">
    <template v-if="isShowYearSelect">
    <ul class="year_select">
      <li class="prev"><a href="javascript:void(0);" @click="prevYear"><span class="blind">이전</span></a></li>
      <li class="num">{{currentYYYY}}년</li>
      <li class="next"><a href="javascript:void(0);" @click="nextYear"><span class="blind">이후</span></a></li>
    </ul>
    </template>
    <div class="list">
      <ul class="com_radio_type03 com_radio_type03-4">
        <li v-for="(month, idx) in monthList" :key="idx">
          <template v-if="(isDisabled(month)!==true)">
            <button @click.prevent="selectMonth(month)">
                <span>{{month}}월</span>
            </button>
          </template>
          <template v-else>
            <button>
                <span :style="(isDisabled(month) === true)? 'color: #ddd' : ''">{{month}}월</span>
            </button>
          </template>
        </li>
      </ul>      
    </div>
  </div>
</template>

<script>
  import {numberFormat} from '@/utils/number'
  import {dateFormat, monthDiff} from '@/utils/date'

  export default {
    name: 'MonthTableA',
    props: {
      year: {
        type: String,
        default: ''
      },
      limit: {
        type: Number,
        default: 0
      },
      limitFromTo: {
        type: Object,
        default: () => ({})
      },
      includeCurYm: {
        type: String,
        default: 'Y'
      },
      showYearSelect: {
        type: String,
        default: 'Y'
      },
    },
    computed: {
      isShowYearSelect(){
        const vShowYearSelect = (this.showYearSelect === undefined)?'Y':this.showYearSelect
        if (vShowYearSelect === 'Y')
        {
          return true
        }else{
          return false
        }
      }
    },
    data: function() {
      return {
        currentYYYY      : "",
        currentFixYYYYMM : "",
        dumy             : "",
        setlimit         : 0 ,
        setlimitFromTo   : {},
        monthList        : [1,2,3,4,5,6,7,8,9,10,11,12]
      }
    },    
    methods: {
      initComponent() {
        this.currentYYYY      = this.year || dateFormat(new Date(), 'YYYY')
        this.currentFixYYYYMM = dateFormat(new Date(), 'YYYYMM')
        this.setlimit         = this.limit || 0
        this.setlimitFromTo   = this.limitFromTo || {}
      },
      selectMonth(mm) {
        const yyyymm = this.currentYYYY + numberFormat(mm, '00')
        this.$emit('cMonthClick', yyyymm)
      },
      getTdStyle(mm) {
        this.dumy = mm
        return ''
      },
      isDisabled(mm) {
        const yyyymm = this.currentYYYY + numberFormat(mm, '00')

        //제한이 존재할 경우
        if (this.setlimit > 0)
        {

          if(this.includeCurYm === 'N')
          {
            if(this.currentFixYYYYMM ===  yyyymm)
            {
              return true
            }
          }

          if ( this.currentFixYYYYMM <  yyyymm ) 
          {
              return true
          } else{
              if (monthDiff(this.currentFixYYYYMM, yyyymm)  > this.setlimit  ){
                return true
              }
          }

        }

        if (this.setlimitFromTo) {
          let minMonth = this.setlimitFromTo.minMonth
          let maxMonth = this.setlimitFromTo.maxMonth

          if (minMonth && maxMonth) {
            if (yyyymm < minMonth || yyyymm > maxMonth) return true
          }
        }
        return false
      },
      nextYear(){
        this.currentYYYY++
      },
      prevYear(){
        this.currentYYYY--
      }
    },
     mounted() {
      this.initComponent()
    },
  }
</script>
