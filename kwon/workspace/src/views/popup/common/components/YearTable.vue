<template>
  <table class="year" border=1>
    <caption>기간설정</caption>
    <colgroup>
      <col style="width:25%">
      <col style="width:25%">
      <col style="width:25%">
      <col style="width:25%">
    </colgroup>
    <thead>
      <tr>
        <th scope="col" ><button type="button" @click="prevYear">&lt;</button></th>
        <th scope="col" colspan="2">{{yearPriod}}</th>
        <th scope="col" ><button type="button" @click="nextYear">&gt;</button></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(year, index) in yearList" :key = index>
        <td :class="getTdStyle(1)" v-for="(years, subIndex) in year" :key =subIndex>
          <button
            type="button"
            @click="yearClick(years.year)"
            :disabled="years.isDisabled">
            <span class="date">{{years.year}}</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import {dateFormat} from '@/utils/date'

  export default {
    name: 'YearTable',
    props: {
      year: {
        type: String,
        default: ''
      }
    },
    computed: {
      yearPriod(){
        return this.yearPriodFrom + " ~ " + this.yearPriodTo
      }
    },
    data: function() {
      return {
        currentYYYY  : "",
        yearPriodFrom : "",
        yearPriodTo   : "",
        yearList      : [],
        yearPriodCnt  : 16,
        dumy          : "",
      }
    },    
    methods: {
      initComponent() {
        this.getData()  
      },
      getData(){
        this.currentYYYY = this.year || dateFormat(new Date(), 'YYYY')
        this.yearPriodFrom =  Math.floor(this.currentYYYY/10) *10
        this.yearPriodTo   =  this.yearPriodFrom + 10 -1
        
        this.yearLayOut()
      },
      yearClick(year) {
        this.$emit('yearClick', year)
      },
      getTdStyle(year) {
        this.dumy = year
        //console.log(mm)
        /*
        const start = Number(this.startDate)
        const end = Number(this.endDate)
        const yyyymm = Number(this.year + numberFormat(mm, '00'))
        if (yyyymm === start) return 'start'
        if (yyyymm === end) return 'end'
        if (yyyymm > start && yyyymm < end) return 'term'
        */
        return ''
      },
      isDisabled(mm) {
        this.dumy = mm
       return false
      },
      nextYear(){
        this.yearPriodFrom = this.yearPriodFrom + 10
        this.yearPriodTo   = this.yearPriodFrom + 10 -1
        this.yearLayOut()
      },
      prevYear(){
        this.yearPriodFrom = this.yearPriodFrom - 10
        this.yearPriodTo   = this.yearPriodFrom + 10 -1
        this.yearLayOut()
      },
      yearLayOut(){

        let preYear = this.yearPriodFrom % 4
        //0일 경우는 첫라인에 마지막 처리
        
        let prtYearPriodFrom = this.yearPriodFrom + (preYear + 1) - 4
        let prtYearPriodTo   = prtYearPriodFrom + 16

        this.yearList = []
        let groupOfYear = []

        while (prtYearPriodFrom <= prtYearPriodTo)
        {
           let yearConf  = {}
           if(  prtYearPriodFrom >= this.yearPriodFrom && prtYearPriodFrom <= this.yearPriodTo )
            {
              yearConf = {"year" : prtYearPriodFrom, isDisabled: false}
            }else{
              yearConf = {"year" : prtYearPriodFrom, isDisabled: true}
            }

          groupOfYear.push(yearConf)
          if(groupOfYear.length== 4)
          {
            this.yearList.push(groupOfYear)
            groupOfYear = []
          }
          prtYearPriodFrom++
        }

      }

    },
     mounted() {
      this.initComponent()
    },
  }
</script>
