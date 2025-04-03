<template>
  <dd>
    <span class="cmm-select">
      <select id="year" title="연도선택" v-model="basYear" @change="updateValue">
          <option v-for="(item, index) in getYear" :key="index" :value="item.comnCId">
            {{item.comnCnm}}
          </option>
      </select>
    </span>
    <span class="cmm-select">
      <select id="month" title="월선택" v-model="basMonth" @change="updateValue">
          <option v-for="(item, index) in getMonth" :key="index" :value="item.comnCId">
            {{item.comnCnm}}
          </option>
      </select>
    </span>
    <span class="cmm-select">
      <select id="dd" title="일선택" v-model="basDd" @change="updateValue">
          <option v-for="(item, index) in getDay" :key="index" :value="item.comnCId">
            {{item.comnCnm}}
          </option>
      </select>
    </span>
    <span class="cmm-select">
      <select id="hour" title="시간선택" v-model="basHour" @change="updateValue">
          <option v-for="(item, index) in getHour" :key="index" :value="item.comnCId">
            {{item.comnCnm}}
          </option>
      </select>
    </span>
    <span class="cmm-select">
      <select id="minute" title="분선택" v-model="basMinute" @change="updateValue">
          <option v-for="(item, index) in getMinute" :key="index" :value="item.comnCId">
            {{item.comnCnm}}
          </option>
      </select>
    </span>
  </dd>
</template>

<script>
  import {dateFormat, getYearPeriod, getDaysInMonth, monthDiff, dayDiff} from '@/utils/date'
  import _ from 'lodash'
  
  export default {
    name: 'DateTimePicker',
    props: {
      date: String,
    },   
    data: () => {
      return {
        basYear: null,
        basMonth: null,
        basDd: null,
        basHour : null,
        basMinute: null,
      }
    },
    computed: {   
      // 해당 시점부터 5년 설정
      getYear() {
        let l_years = []
        l_years = getYearPeriod(2).map(d => {
          return { comnCnm: d.format('YYYY년'), comnCId: d.format('YYYY') }
        })
        return l_years
      },
      // 01월~12월까지 설정
      getMonth() {
        let l_months = []
        for (let i=0; i<12; i++) {

          // 현재 년월자 기준으로 입력가능 월 설정
          let l_todayMonthDiff =  monthDiff(this.basYear+dateFormat(i+1, 'MM', 'M'), dateFormat(new Date(), 'YYYYMM'))    
          
          if (l_todayMonthDiff > 0) {
            continue
          }

          l_months.push({
            comnCnm: dateFormat(i+1, 'MM월', 'M'), comnCId: dateFormat(i+1, 'MM', 'M')
          })
        }
        
        return l_months
      },
      // 년월이 기준으로 설정
      getDay() {       
        let l_dds = [] 
        let l_days = getDaysInMonth(this.basYear+this.basMonth)

        for (let i=0; i<l_days; i++) {

          // 현재 일자 기준으로 입력가능 월 설정
          let l_todayDayDiff =  dayDiff(this.basYear+this.basMonth+dateFormat(i+1, 'DD', 'D'), dateFormat(new Date(), 'YYYYMMDD'))    
          
          if (l_todayDayDiff > 0) {
            continue
          }

          l_dds.push({
            comnCnm : dateFormat(i+1, 'DD일', 'D'), comnCId : dateFormat(i+1, 'DD', 'D')
          })
        }

        return l_dds
      },
      // 00시~23시까지 설정
      getHour() {
        let l_hours = [{comnCnm: '00시', comnCId:'00'}]
        
        for (let i=1; i<24; i++) {          
          l_hours.push({
            comnCnm : dateFormat(i, 'HH시', 'H'), comnCId : dateFormat(i, 'HH', 'H')
          })
        }

        return l_hours
      },
      // 00분~59초까지 설정
      getMinute() {
        let l_minutes = [{comnCnm: '00분', comnCId:'00'}]

        for (let i=1; i<60; i++) {
          l_minutes.push({
            comnCnm : dateFormat(i, 'mm분', 'm'), comnCId : dateFormat(i, 'mm', 'm')
          })
        }

        return l_minutes
      },
    },
    methods: {
      initComponent() {
        let l_datetime = this.date ||  dateFormat(new Date(), 'YYYYMMDDHHmm')

        this.basYear = dateFormat(l_datetime, 'YYYY')
        this.basMonth = dateFormat(l_datetime, 'MM')
        this.basDd = dateFormat(l_datetime, 'DD')
        this.basHour = dateFormat(l_datetime, 'HH')
        this.basMinute= dateFormat(l_datetime, 'mm')
      },
      updateValue() {    

        // 해당 년이 변경시 월/일이 미 일치시 마지막 일자로 설정
        if (event.target.id === 'year' ||event.target.id ==='month') {
          if (_.findIndex(this.getMonth, d => d.comnCId === this.basMonth) < 0) {
            this.$set(this, 'basMonth', _.last(this.getMonth).comnCId)
          }

          if (_.findIndex(this.getDay, d => d.comnCId === this.basDd) < 0) {
            this.$set(this, 'basDd', _.last(this.getDay).comnCId)
          }
        }

        let l_dateTime =  this.basYear + this.basMonth + this.basDd + this.basHour + this.basMinute
        dateFormat(l_dateTime, 'YYYY-MM-DDTHH:mm', 'YYYYMMDDHHmm')

        this.$emit('input', l_dateTime)
      },
    },
    created() {     
      this.initComponent()
    },
    mounted() {
    }
  }
</script>
