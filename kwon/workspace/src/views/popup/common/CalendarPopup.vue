<template>
  <div>
    <!-- 20211015 한별 추가 S -->
    <!-- 달력 pupop S -->
    <div class="dimmed" aria-hidden="false" style="display:block;" @click="close()"></div><!-- 개발시 style="display:block;" 제거 -->	
    <div class="alert_popup cal_date_popup" id="alert_popup" aria-hidden="false"> <!-- 개발시 style="display:block;" 제거 -->
      <div class="calendar_wrap">
        <div class="popup_content">
          <div class="com_inner">
            <div class="select_dual_wrap hasNav">
              <div class="select_dual">
                <div class="area">
                  <div class="select_date">
                    <!--좌우 버튼에 disabled 클래스 추가 시 disabled 버튼 -->
                    <button class="cal_btn cal_prev" :class="!enablePreYear?'disabled':''" @click="preYear()" :disabled="!enablePreYear" :title="!enablePreYear ? '선택불가' : ''" aria-label="일년 전 이동"></button>
                    <span class="year_month"><span class="num">{{currentYear}}</span>년</span>
                    <button class="cal_btn cal_next" :class="!enableNextYear?'disabled':''" @click="nextYear()" :disabled="!enableNextYear" :title="!enableNextYear ? '선택불가' : ''" aria-label="일년 후 이동"></button>
                  </div>
                </div>
                <div class="area">
                  <div class="select_date">
                    <!--좌우 버튼에 disabled 클래스 추가 시 disabled 버튼 -->
                    <button class="cal_btn cal_prev" :class="!enablePreMonth?'disabled':''" @click="preMonth()" :disabled="!enablePreMonth" :title="!enablePreMonth ? '선택불가' : ''" aria-label="한달 전 이동"></button>
                    <span class="year_month"><span class="num">{{currentMonth}}</span>월</span>
                    <button class="cal_btn cal_next" :class="!enableNextMonth?'disabled':''" @click="nextMonth()" :disabled="!enableNextMonth" :title="!enableNextMonth ? '선택불가' : ''" aria-label="한달 후 이동"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table class="cal_tb">
            <caption>가계부 메인 달력에서 해당 요일 및 날짜에 대한 지출내용을 제공합니다.</caption>
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
                <th scope="col" v-for="day in days" :key="day">{{ day }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(date, idx) in dates" :key="idx" :id="'date_' + idx">
                <td v-for="(day, secondIdx) in date" :key="secondIdx" :id="'day_' + idx + '_'+ secondIdx" 
                  :class="[day.dayOfWeekClass , (day.month +''+ ('0' + day.dates).slice(-2)) === toDay ? 'today' : '', ( day.month +''+ ('0' + day.dates).slice(-2))===selectDay ? 'active':'' ]" 
                  >

                    <template v-if="day.alink=='yes'">
                      <a href="javascript:void(0);" :aria-disabled="day.dayOfWeekClass === 'pre'? true : false"
                        @click.prevent="(day.dayOfWeekClass !== 'pre') ? selectWeek(idx, day.dates) : false"
                        :title="(day.month +''+ ('0' + day.dates).slice(-2)) === toDay ? '오늘날짜 '+ day.selectTitle : '' + day.selectTitle"
                        >
                        <span class="date">{{ day.dates }}</span>
                      </a>
                    </template>

                    <!-- <template v-if="(day.dayOfWeekClass !== 'pre')">
                      <a href="javascript:void(0);"><span class="date">{{ day.dates }}</span></a>
                    </template> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--// 달력 popup E -->
    <!--// 20211015 한별 추가 E -->
     <a href="javascript:void(0);" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>
  </div>
</template>

<script>
	import popupMixin from '@/common/mixins/popupMixin'
  import {getDayDowC} from '@/utils/date'
  import {mapGetters} from 'vuex'

  export default {
    name: 'CalendarPopup',
    computed: {
      ...mapGetters('modal', [
				'modalList',
				'modalConfig',
				'modalComponent',
				'modalAriaHidden',
				'hasModal',
				'hasLoadingBackground',
				'hasLoading',
				'toastList',
				'toastMessage',
				'hasToast'
      ]),
      enablePreYear(){
        if(this.minDate !== null && this.minDate !== '')
        {
          const minYear  = this.minDate.substr(0,4)
          const currentYear = this.currentYear
          const minYm       = this.minDate.substr(0,6)
          const prevYm      = (Number(this.currentYear) - 1) + '' + this.currentMonth
          
          console.log('enableNextYear', prevYm , minYm)
          if(prevYm < minYm) return false

          console.log('min YEAR ', Number(currentYear) , Number(minYear) )
          if(Number(currentYear) <= Number(minYear)){
            return false
          }else{
            return true
          }
        }else{
          return true
        }
      },
      enableNextYear(){
        if(this.maxDate !== null && this.maxDate !== '')
        {
          console.log(this.maxDate)
          const maxYear     = this.maxDate.substr(0,4)
          const currentYear = this.currentYear
          const maxYm       = this.maxDate.substr(0,6)
          const nextYm      = (Number(this.currentYear) + 1) + '' + this.currentMonth

          console.log('enableNextYear', nextYm , maxYm)
          if(nextYm > maxYm) return false //년을 바꿀경우 체크

          console.log('min YEAR ', Number(currentYear) , Number(maxYear) )
          if( Number(currentYear) >= Number(maxYear)){
            return false
          }else{
            return true
          }
        }else{
          return true
        }
      },
      enablePreMonth(){
        if(this.minDate !== null && this.minDate !== '')
        {
          const minYear  = this.minDate.substr(0,4)
          const minMonth = this.minDate.substr(4,2)

          const minYm = minYear + '' + minMonth
          const currentYm = this.currentYear + '' +this.currentMonth
          
          console.log('min', Number(currentYm) , Number(minYm) )

          if(Number(currentYm) <= Number(minYm)){
            return false
          }else{
            return true
          }
        }else{
          return true
        }
      },      
      enableNextMonth(){
        if(this.maxDate !== null && this.maxDate !== '')
        {
          console.log(this.maxDate)
          const maxYear  = this.maxDate.substr(0,4)
          const maxMonth = this.maxDate.substr(4,2)

          const maxYm = maxYear + '' + maxMonth
          const currentYm = this.currentYear + '' +this.currentMonth

          console.log('min', Number(currentYm) , Number(maxYm) )
          if( Number(currentYm) >= Number(maxYm)){
            return false
          }else{
            return true
          }
        }else{
          return true
        }
      }
       
    },
    data: function() {
      return {
        days: ['일','월','화','수','목','금','토',],
        dates: [],
        currentYear: 0,
        currentMonth: 0,
        currentDay  : 0,
        year: 0,
        month: 0,
        toDay : "",       //실제일자
        selectDay : "",   //부모창에서 넘어온 일자
        currentWeek: null,
        minDate : "", //선택할 수 있는 최저 일자 YYYYMMDD
        maxDate : "", //선택할 수 있는 최고 일자 YYYYMMDD
        minMonth : "", //선택할 수 있는 최저 월
        maxMonth : "", //선택할 수 있는 최고 월
      }
    },
    methods: {
      initComponent(){
        this.getData()
      },
      getData(){
        //최초에 넘겨 받은 데이터
        console.log("params", this.params)
        if (this.params.pDate !== null && this.params.pDate!=="")
        {
          const pDate = this.params.pDate.split(".").join("").split("-").join("")
          this.selectDay = pDate
          if ( pDate !== null && pDate !=='')
          {
            if ( pDate.substr(0,6) !== this.currentYear + '' + this.currentMonth )
            {
              this.currentYear    =   pDate.substr(0,4)
              this.currentMonth   =   pDate.substr(4,2)
              this.currentDay     =   '01'
            }else{
              this.currentDay     =   pDate.substr(6,2)
            }
          }
        }

        if (this.params.minDate !== undefined && this.params.minDate !== null && this.params.minDate !== "")
        {
          this.minDate = this.params.minDate.split(".").join("").split("-").join("")
        }

        if (this.params.maxDate !== undefined && this.params.maxDate !== null && this.params.maxDate !== "")
        {
          this.maxDate = this.params.maxDate.split(".").join("").split("-").join("")
        }

        
        console.log('selectDay', this.selectDay)
        this.calendarDate()
      },
      calendarDate(){
        const [
          monthFirstDay,
          monthLastDate,
          lastYear, 
          lastMonth,          
          lastMonthLastDate,
        ] = this.getFirstDayLastDate(this.currentYear, this.currentMonth)


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
        console.log(firstDay, lastDate, lastYear, lastMonth, prevLastDate)
        return [firstDay, lastDate, lastYear, lastMonth, prevLastDate]
      },
      getMonthOfDays(monthFirstDay, monthLastDate,  lastYear, lastMonth, prevLastDate){

        let day = 1 //요일
        let prevDay = (prevLastDate - monthFirstDay) +1
        const dates = []
        let weekOfDays = []
        const preYmd = lastYear + "" + ("0" + lastMonth).slice(-2)
        let diffYmdClass =''

        while (day <= monthLastDate )
        {
          diffYmdClass =''
          if ( day === 1 ){
            
            //전월자처리
            for(let j =0; j < monthFirstDay; j ++)
            {
              const dayConf = {
                              month : preYmd,
                              dates : '',
                              //dates : prevDay,
                              day   : getDayDowC(preYmd + ("0" + prevDay).slice(-2)),
                              dayOfWeekClass :"pre",
                              alink : "no",  // add 2021.12.03 웹접근성. (전/차월 영역 a link 표시 불가요청)
                              selectTitle : "",
                            }
              weekOfDays.push( dayConf )
              prevDay +=1
            }
          }
          
          //현재월
          diffYmdClass =  this.getDayOfWeekClass(getDayDowC(this.currentYear+""+this.currentMonth + "" + ("0" + day).slice(-2)))

          if(this.minDate !== null && this.minDate !== '')
          {
                if (this.currentYear+""+this.currentMonth + "" + ("0" + day).slice(-2) < this.minDate){
                  diffYmdClass = "pre"
                }
          }

          if(this.maxDate !== null && this.maxDate !== '')
          {
                if (this.currentYear+""+this.currentMonth + "" + ("0" + day).slice(-2) >this.maxDate){
                  diffYmdClass = "pre"
                }
          }
          
          
          const dayConf = {
                              month : this.currentYear+""+this.currentMonth,
                              dates : day,
                              day   : getDayDowC(this.currentYear+""+this.currentMonth + "" + ("0" + day).slice(-2)),
                              //dayOfWeekClass : diffYmdClass + this.getDayOfWeekClass(getDayDowC(this.currentYear+""+this.currentMonth + "" + ("0" + day).slice(-2)))
                              dayOfWeekClass : diffYmdClass,
                              alink : "yes", // add 2021.12.03 웹접근성. (전/차월 영역 a link 표시 불가요청)
                              selectTitle : (this.currentYear+""+this.currentMonth+ "" + ("0" + day).slice(-2) === this.selectDay) ? '선택됨' : ''
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
          const nextYear  = (this.currentMonth==="12") ? (Number(this.currentYear) + 1) :this.currentYear
          const nextMonth = (this.currentMonth==="12") ? "01" : ("0" + (new Date().getMonth() +2)).slice(-2)

          for (let k = 1; k <=7-len ; k++)
          {
            const dayConf = {
                              month : nextYear+""+nextMonth,
                              //dates : k,
                              dates : '',
                              day   : getDayDowC(nextYear+""+nextMonth + "" + ("0" + k).slice(-2)),
                              dayOfWeekClass : "pre",
                              alink : "no",  // add 2021.12.03 웹접근성. (전/차월 영역 a link 표시 불가요청)
                              selectTitle : "",
                            }            
            weekOfDays.push(dayConf)
          }
        }

        if (weekOfDays.length > 0) dates.push(weekOfDays)
        return dates
      },
      selectWeek(idx, dates)
      {
          console.log(">>>>>>>>>>>   ", this.currentYear)
          console.log(idx, dates, this.currentWeek, this.currentYear + '' + this.currentMonth + '' + ("0" + dates).slice(-2))
          this.currentWeek = idx
          //부모창 합수를 호출한다.
          this.close(this.currentYear + '' + this.currentMonth + '' + ("0" + dates).slice(-2))
          
      },
      getDayOfWeekClass(dayofWeek){
        if(dayofWeek === 0)
        {
            return "sun"
        }else if(dayofWeek === 6)
        {
            return "sat"
        }else{
             return ""
        }
      },
      preYear(){
        this.currentYear = Number(this.currentYear) -1
        this.currentDay = '01'
        this.calendarDate()
      },
      nextYear(){
        this.currentYear = Number(this.currentYear) +1
        this.currentDay = '01'
        this.calendarDate()        
      },
      preMonth(){
        if (this.currentMonth === '01')
        {
          this.currentYear = Number(this.currentYear) -1
          this.currentMonth = '12'
        }else{
          this.currentMonth = ("0" + (Number(this.currentMonth) - 1)).slice(-2)
        }
        
        this.currentDay = '01'
        this.calendarDate()
        
      },
      nextMonth(){
        if (this.currentMonth === '12')
        {
          this.currentYear = Number(this.currentYear) + 1
          this.currentMonth = '01'
        }else{
          this.currentMonth = ("0" + (Number(this.currentMonth) + 1)).slice(-2)
        }
        this.currentDay = '01'
        this.calendarDate()
      }
    },
    created(){
      const date        = new Date()
      this.year         = date.getFullYear()   //현재년
      this.month        = ("0" + (date.getMonth() +1)).slice(-2)  //현재월 00
      this.toDay        = this.year + '' + this.month + '' + ("0" + (date.getDate())).slice(-2)
      this.currentDay   = ("0" + (date.getDate())).slice(-2)
      this.currentYear  = this.year
      this.currentMonth = this.month
    },
    destroyed(){
    },
    watch:{
    },
    mounted() {
      this.initComponent()
    },
    components: {
    },
		mixins: [
			popupMixin
		],
  }
</script>
