<template>
  <div class="new_box_footer mt30 p0side">
      <div class="progressBar">
          <div class="bar" :style="`width:${reMainDaysPer}%`">
              <div class="popover_wrap">
                  <span class="popover" :class="{end:reMainDaysPer===100}">
                      {{reMainDays}}
                      <span class="arrow"></span>
                  </span>
              </div>
          </div>
      </div>
      <div class="date">
          <div class="st">{{startDateConv}}</div>
          <div class="ed">{{endDateConv}}</div>
      </div>
  </div>
</template>
<script>

import {dayDiff, dateFormat} from '@/utils/date'

  export default {
    name: 'CmmProgress',
      data: () => {
      return {               
      }
    },
    props: {      
      data: {        
        type: Object,
        default: () => ({})
      },
      startDate: String,
      endDate  : String,
    },
    created() {
      
    },
    methods: {
    },
    computed : {
      startDateConv(){
        return '신규 ' + dateFormat(this.startDate, 'YYYY.MM.DD')
      },
      endDateConv(){
        return '만기 ' + dateFormat(this.endDate, 'YYYY.MM.DD')
      },
      reMainDays(){
        let toDate = dateFormat(new Date(), 'YYYYMMDD')

        if(this.endDate > toDate) {
          return 'D-' + dayDiff(this.endDate, toDate)
        } else {
          return '만기'
        }
      },
      reMainDaysPer(){
        let toDate = dateFormat(new Date(), 'YYYYMMDD')

        if(this.endDate > toDate) {
          let allgap = dayDiff(this.endDate, this.startDate)
          let nowgap = dayDiff(toDate, this.startDate)

          return Math.floor(nowgap/allgap * 100)

        } else {
          return 100
        }
      }
    }
  }
</script>

<style scoped>
</style>
