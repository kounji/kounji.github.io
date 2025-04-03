<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 카렌다
* @ 파일명     : src/components/CmmCalendar.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-24
* @ 비고       : sample > sample modal 참조
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-24              작성자명                 최초작성
*************************************************************************/
-->
<template>
  <div>
      <div class="calendar_top">
        <div class="title">농축협 외상</div>
        <button class="link"><span class="num">{{pCredit | numberFilter }}</span></button>
      </div>      
      <table class="cal_tb">
        <caption>지출분석 메인 달력에서 해당 요일 및 날짜에 대한 지출내용을 제공합니다.</caption>
        <colgroup>
          <col style="width:15%">
          <col style="width:14%">
          <col style="width:14%">
          <col style="width:14%">
          <col style="width:14%">
          <col style="width:14%">
          <col style="width:15%">
        </colgroup>
        <thead>
          <tr>
            <th v-for="day in days" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(date, idx) in dates" :key="idx" :id="'date_' + idx" :class="(currentWeek !== null && currentWeek !== idx)?'off':''">
            <td v-for="(day, secondIdx) in date" :key="secondIdx" :id="'day_' + idx + '_'+ secondIdx" :class="[day.dayOfWeekClass , ( day.month === year +''+month && day.dates===currentDay)?'today':'']" @click="selectWeek(idx, day.dates)">
              <a href="javascript:void(0);">
                <span class="date">{{ day.dates }}</span>
              </a>
                <template v-if="typeof day.rzs !== 'undefined'">
                  <div class="event_mark">
										<p class="num com_point_red" v-if="typeof day.rzs.revAm !== 'undefined'">{{day.rzs.revAm | numberFilter}}</p>
										<p class="num com_point_blue" v-if="typeof day.rzs.xpsAm !== 'undefined'">{{day.rzs.xpsAm | numberFilter}}</p>
										<!--<em class="mark_gr" ></em>-->
                  </div>
                </template>
            </td>
          </tr>
            </tbody>
      </table>
  </div>
</template>

<script>
import {getDayDowC} from '@/utils/date'

  export default {
    name: 'CmmCalendarMy',
      data: () => {
      return {
              days: ['일','월','화','수','목','금','토',],
              dates: [],
              currentYear: 0,
              currentMonth: 0,
              currentDay  : 0,
              year: 0,
              month: 0,
              currentWeek: null,
      }
    },
    props: {      
      data: {        
        type: Object,
        default: () => ({})
      },
      startDate: String,
      endDate  : String,
      pCredit  : Number,
      pRzsBas  :  {}
    },
    created() {
      const date = new Date()
      this.year = date.getFullYear()   //현재년
      this.month = ("0" + (date.getMonth() +1)).slice(-2)  //현재월 00
      this.currentDay = date.getDate()
      
    },
    mounted(){
        //console.log("this.pRzsBas" ,  this.pRzsBas)
        this.calendarDate()
    },
    methods: {

      calendarDate(){
        const [
          monthFirstDay,
          monthLastDate,
          lastYear, 
          lastMonth,          
          lastMonthLastDate,
        ] = this.getFirstDayLastDate(this.year, this.month)

        this.dates = this.getMonthOfDays(
          monthFirstDay,
          monthLastDate,
          lastYear, 
          lastMonth,
          lastMonthLastDate,
        )

      },

      getFirstDayLastDate(year, month){

        const firstDay = new Date(year, month -1, 1).getDay()
        const lastDate = new Date(year, month, 0).getDate()

        let lastYear = year
        let lastMonth = month -1
        if(month === 1)
        {
          lastMonth = 12
          lastYear -= 1
        }

        const prevLastDate = new Date(lastYear, lastMonth, 0).getDate()
        return [firstDay, lastDate, lastYear, lastMonth, prevLastDate]
        
      },

      getMonthOfDays(monthFirstDay, monthLastDate,  lastYear, lastMonth, prevLastDate){

        let day = 1 //요일
        let prevDay = (prevLastDate - monthFirstDay) +1
        const dates = []
        let weekOfDays = []
        const preYmd = lastYear + "" + ("0" + lastMonth).slice(-2)

        while (day <= monthLastDate )
        {
          if ( day === 1 ){
            
            //전월자처리
            for(let j =0; j < monthFirstDay; j ++)
            {

              const dayConf = {
                              month : preYmd,
                              dates : prevDay,
                              day   : getDayDowC(preYmd + ("0" + prevDay).slice(-2)),
                              dayOfWeekClass :"pre"
                            }
              weekOfDays.push( dayConf )
              prevDay +=1
            }
          }
          
          //현재월
          const dayConf = {
                              month : this.year+""+this.month,
                              dates : day,
                              day   : getDayDowC(this.year+""+this.month + "" + ("0" + day).slice(-2)),
                              dayOfWeekClass : this.getDayOfWeekClass(getDayDowC(this.year+""+this.month + "" + ("0" + day).slice(-2)))
                          }

          //현재월 실적처리
          for(let i=0 ; i < this.pRzsBas.length ; i++)
          {
            if( (this.year+""+this.month + "" + ("0" + day).slice(-2)) === this.pRzsBas[i].rzsDt ){
              const rzs = { revAm : this.pRzsBas[i].revAm, 
                            xpsAm : this.pRzsBas[i].xpsAm
                          }
              dayConf.rzs = rzs                          
            }
          }

          weekOfDays.push(dayConf)
          if ( weekOfDays.length === 7 )
          {
            dates.push(weekOfDays)
            weekOfDays = []
          }

          day +=1
        }

        //차월처리
        const len = weekOfDays.length
        if ( len > 0 && len < 7 )
        {
          const nextYear  = (this.month==="12") ? this.year +1 :this.year
          const nextMonth = (this.month==="12") ? "01" : ("0" + (new Date().getMonth() +2)).slice(-2)

          for (let k = 1; k <=7-len ; k++)
          {
            const dayConf = {
                              month : nextYear+""+nextMonth,
                              dates : k,
                              day   : getDayDowC(nextYear+""+nextMonth + "" + ("0" + k).slice(-2)),
                              dayOfWeekClass : "pre"
                            }            
            weekOfDays.push(dayConf)
          }
        }

        if (weekOfDays.length > 0) dates.push(weekOfDays)


        //console.log("dates", dates)
        return dates

      },
      selectWeek(idx, dates)
      {
          console.log(idx, dates)
          if (this.currentWeek === null)
          {
            this.currentWeek = idx

            //부모창 합수를 호출한다.
            this.$emit('mySelectWeekDateEvent', dates)

          }else{
            this.currentWeek = null
          }
          
      },
      getDayOfWeekClass(dayofWeek){
        //console.log("getDayOfWeekClass" ,dayofWeek)
        if(dayofWeek === 0)
        {
            return "sun"
        }else if(dayofWeek === 6)
        {
            return "sat"
        }else{
             return ""
        }
      }
    },
    computed : {

    }
  }
</script>

<style scoped>
.cal_tb tbody tr.off{height:0;transition:.2s;visibility: collapse;}
.cal_tb tbody tr.off td{height:0;transition:.2s;padding:0;overflow: hidden;}
.cal_tb tbody tr.off td *{height:0;padding:0;}
.cal_tb tbody tr.on{display: table-row;}
</style>
