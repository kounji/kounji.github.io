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
  2021-07-14              CS515731                bizType 에 따른 CSS 추가
  2021-07-15              CS515731                bizType 에 따른 DATA처리 수정
*************************************************************************/
-->
<template>
  <div class="calendar_wrap myfarm_calendar_wrap custom_calendar_wrap">
    <section class="cal_day_box">
      <table class="cal_tb SZ-month12 custom_box_cal_tb">
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
            <th v-for="day in days" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(date, idx) in dates" :key="idx" :id="'date_' + idx">
            <td v-for="(day, secondIdx) in date" :key="secondIdx" :id="'day_' + idx + '_'+ secondIdx" :class="[day.dayOfWeekClass , (day.ymd === today) ? 'today':'']">
                  <template v-if="(day.dayOfWeekClass !== 'pre')">
                    <a href="javascript:void(0);" :id="'sDate_'+day.ymd" :title="day.title" @click.prevent="(day.dayOfWeekClass !== 'pre') ? selectWeek(idx, day.dates, day.ymd):false">
                      <span class="date">{{ day.dates }}</span>
                      <template v-if="typeof day.rzs !== 'undefined'">
                        <div class="event_mark">
                          <template v-if="bizType !== 'FR'">
                            <p class="num com_point_red" v-if="typeof day.rzs.xpsAm !== 'undefined' && day.rzs.xpsAm != 0">{{day.rzs.xpsAm | numberFilter}}</p>
                            <p class="num com_point_blue" v-if="typeof day.rzs.revAm !== 'undefined' && day.rzs.revAm != 0">{{day.rzs.revAm | numberFilter}}</p>
                          </template>
                          <template v-else>
                            <!-- <span class="icon_mint" v-if="typeof day.rzs.naDataDsc !== 'undefined' && day.rzs.naDataDsc == 'diary'">{{day.rzs.transCn | numberFilter}}</span>
                            <span class="icon_grey" v-if="typeof day.rzs.naDataDsc !== 'undefined' && day.rzs.naDataDsc == 'na'">{{day.rzs.transCn | numberFilter}}</span> -->
                            <span class="icon_mint" v-if="typeof day.rzs.naDataDsc !== 'undefined' && day.rzs.cntSqno > 0">{{day.rzs.transCn | numberFilter}}</span>
                            <span class="icon_grey" v-if="typeof day.rzs.naDataDsc !== 'undefined' && day.rzs.cntSqno === 0">{{day.rzs.transCn | numberFilter}}</span>
                          </template>
                        </div>
                      </template>
                    </a>
                  </template>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
<!-- 
      <div class="calendar_open_wrap">
        <button type="button" class="view-btn">
          <em class="open blind">열기버튼</em>
        </button>
      </div> 
-->
  </div>
</template>

<script>
import {getDayDowC} from '@/utils/date'
import modalService from '@/service/modalService'
import {cmmCalendarClear} from '@/utils/jUtils'

  export default {
    name: 'CmmCalendar',
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
              currentRzsBas : [],
              bizType : '', //금융(LC), 영농캐린더(SZ), 영농일지(SF)
              srDataList : [], //영농일지(SF) 영농일지 가공
              sDate : "", //선택한 일자 add 2021.11.19
              today : "", //오늘날짜 add 2021.11.19
      }
    },
    props: {      
      data: {        
        type: Object,
        default: () => ({})
      },
      startDate: String,
      endDate  : String,
      pRzsBas  :  {},
      pYYYYMM  : String,
      pBizType : String,
    },
    created() {
      const date        = new Date()
      this.year         = date.getFullYear()   //현재년
      this.month        = ("0" + (date.getMonth() +1)).slice(-2)  //현재월 00
      this.currentDay   = date.getDate()
      this.currentYear  = this.year
      this.currentMonth = this.month
      this.bizType      = (this.pBizType !== undefined && this.pBizType !== null && this.pBizType !== '')? this.pBizType : 'LC'
      this.today        = this.year +''+ this.month +''+ ("0" + date.getDate()).slice(-2) //add 2021.11.19
    },
    computed : {
      getBizType() {
        if (this.bizType === 'FR')
        {
          return 'SZ-month'+ this.currentMonth
        }else{
          return this.bizType +'-month'+ this.currentMonth
        }
        
      }
    },
    mounted(){
        this.initComponent()
    },
    methods: {
      initComponent() {
        this.getData();
      },
      getData() {
        //최초에 넘겨 받은 데이터
        console.log("pYYYYMM", this.pYYYYMM)
        this.currentRzsBas = this.pRzsBas
        
        if (this.pYYYYMM !== this.currentYear + '' + this.currentMonth)
        {
          this.currentYear    = this.pYYYYMM.substr(0,4)
          this.currentMonth   = this.pYYYYMM.substr(4,2)
          this.currentDay     = ''
        }

        if (this.bizType === 'FR')
        {
          this.srDataList = this.makeSRData(this.currentRzsBas)
        }

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
            for(let j =0; j < monthFirstDay; j ++) {
              const dayConf = {
                              month : preYmd,
                              dates : prevDay,
                              day   : getDayDowC(preYmd + ("0" + prevDay).slice(-2)),
                              dayOfWeekClass :"pre",
                              ymd : preYmd +''+ ("0" + prevDay).slice(-2),  //add 2021.11.19
                              title : ""  //add 2021.11.19
                            }
              weekOfDays.push( dayConf )
              prevDay +=1
            }

            //달력의 선택된 월과 현재날짜의 월이 틀릴 경우 1일은 기본 디폴트로 Active상태로 둔다.
            // if( (this.year + '' + this.month) !==  this.currentYear+""+this.currentMonth)
            // {
            //   diffYmdClass = 'active ' //공백필수
            // }
          }
          
          let nowYmd = this.currentYear+""+this.currentMonth +""+("0" + day).slice(-2)  //add 2021.11.19

          //현재월
          const dayConf = {
                              month : this.currentYear+""+this.currentMonth,
                              dates : day,
                              day   : getDayDowC(this.currentYear+""+this.currentMonth + "" + ("0" + day).slice(-2)),
                              dayOfWeekClass : diffYmdClass + this.getDayOfWeekClass(getDayDowC(this.currentYear+""+this.currentMonth + "" + ("0" + day).slice(-2))),
                              ymd : nowYmd, //add 2021.11.19
                              title : (nowYmd === this.today) ? "오늘날짜" : "" //add 2021.11.19
                          }

          if (this.bizType !== 'FR')
          {
            //현재월 실적처리 (금융, 영농캘린더)
            for(let i=0 ; i < this.currentRzsBas.length ; i++)
            {
              if( (this.currentYear+""+this.currentMonth + "" + ("0" + day).slice(-2)) === this.currentRzsBas[i].rzsDt ){
                const rzs = { revAm : this.currentRzsBas[i].revAm, 
                              xpsAm : this.currentRzsBas[i].xpsAm
                            }
                dayConf.rzs = rzs                          
              }
            }
          }else{
            
            //현재월 영농일지 처리
            for(let i=0 ; i < this.srDataList.length ; i++)
            {
              if( (this.currentYear+""+this.currentMonth + "" + ("0" + day).slice(-2)) === this.srDataList[i].trday ){
                
                const rzs = { naDataDsc  : this.srDataList[i].naDataDsc, 
                              transCn : this.srDataList[i].transCn,
                              cntSqno : this.srDataList[i].cntSqno,
                            }
                dayConf.rzs = rzs
              }
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
          const nextYear  = (this.currentMonth==="12") ? Number(this.currentYear) +1 :this.currentYear
          const nextMonth = (this.currentMonth==="12") ? "01" : ("0" + (new Date().getMonth() +2)).slice(-2)

          for (let k = 1; k <=7-len ; k++)
          {
            const dayConf = {
                              month : nextYear+""+nextMonth,
                              dates : k,
                              day   : getDayDowC(nextYear+""+nextMonth + "" + ("0" + k).slice(-2)),
                              dayOfWeekClass : "pre",
                              ymd : nextYear+""+nextMonth +""+ ("0" + k).slice(-2),   //add 2021.11.19
                              title : ""  //add 2021.11.19
                            }            
            weekOfDays.push(dayConf)
          }
        }

        if (weekOfDays.length > 0) dates.push(weekOfDays)
        return dates
      },
      selectWeek(idx, dates, ymd)
      {
          //console.log(idx, dates, this.currentWeek)
          this.currentWeek = idx

          this.sDate = ymd

          //부모창 합수를 호출한다.
          this.$emit('selectWeekDateEvent', dates)
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
      },

      openSlideMonthPop(){
				const config = {
					params: {
						title: '년월 선택',
						yyyymm : this.currentYear + "" +this.currentMonth,
					},
				}
				modalService.openSlideSelectMonth(config).then(response => {
          //console.log(response)
          //달이 바뀔 경우 부모에서 데이터를 다시 가져와야함
          const resYYYY = response.substr(0,4)
          const resMM = response.substr(4,2)

          if ( (this.currentYear + "" +this.currentMonth) !== response )
          {
              this.currentYear = resYYYY
              this.currentMonth = resMM
              
              this.currentRzsBas = this.$parent.setCalendarData(this.currentYear, this.currentMonth) || []

              //부모창 함수 호출
              this.calendarDate()
          }

				})
      },
      makeSRData(dtbyInqList){ //영농일지 일자별 조회목록
        let resultList = []
        for (let i=0; i<dtbyInqList.length;i++)
        {
          const tmpTransList = dtbyInqList[i].transList

          let naDataDsc = ''
          let cntSqno = 0
          let transCn = (tmpTransList === undefined) ? 0 : tmpTransList.length

          if (tmpTransList !== undefined && tmpTransList.length > 0)
          {
            for(let j=0; j<tmpTransList.length;j++)
            {
              if(tmpTransList[j].sqno > 0) {
                cntSqno++
              }

              if(tmpTransList[j].naDataDsc === 'DIRECT')
              {
                naDataDsc = 'diary'
                break
              }else{
                if(naDataDsc === 'diary')
                {
                    naDataDsc = 'diary' //영농일지
                    break
                }else{
                  naDataDsc = 'na' //경제통합
                }
              }
            }
          }
          if(transCn > 0){
            resultList.push({trday : this.currentYear + '' + this.currentMonth + '' + dtbyInqList[i].trday, naDataDsc: naDataDsc, transCn: transCn, cntSqno : cntSqno })
          }
        }
        
        return resultList
      }
    },
    watch:{
      pYYYYMM: function(newVal, oldVal)
      {

        console.log("pYYYYMM", newVal, oldVal)
        const date        = new Date()
        if (newVal != oldVal)
        {
          this.currentYear    =   newVal.substr(0,4)
          this.currentMonth   =   newVal.substr(4,2)
          if (newVal !==date.getFullYear() + '' + ("0" + (date.getMonth() +1)).slice(-2))
          {
            this.currentDay     =   ''
          }else{
            this.currentDay     =   date.getDate()
          }

          this.sDate = "" //선택날짜값 초기화 add 2021.11.19

          //CSS초기화
          cmmCalendarClear()
          this.calendarDate()

        }
      },
      pRzsBas: function(newVal, oldVal)
      {
        if(newVal !== oldVal)
        {
          this.currentRzsBas = newVal

          //영농일지(SR)의 경우 SR데이터로 변경 해야함
          if (this.bizType === 'FR')
          {
            this.srDataList = this.makeSRData(this.currentRzsBas)
          }
          this.calendarDate()
        }
      },

      /*
      * 날짜 변경시 웹접근성 title 처리. add 2021.11.19
      */
      sDate: function(newVal, oldVal) {
        // console.log("newVal=["+ newVal +"], oldVal=["+ oldVal +"]")

        // oldVal ==="" : (최초로드/월변경)후 날짜 변경시
        if(oldVal ==="" ) {

          if (newVal !=="") {
            $("#sDate_"+newVal).attr("title", (newVal === this.today ) ? "오늘날짜 선택됨" : "선택됨")
            $("#sDate_"+newVal).parents("td").addClass("active")
          }
        } else {

          if (newVal !== "") {
            // newVal !== "" : 날짜를 변경한 경우

            $("#sDate_"+oldVal).attr("title", (oldVal === this.today ) ? "오늘날짜" : "")
            $("#sDate_"+oldVal).parents("td").removeClass("active")

            $("#sDate_"+newVal).attr("title", (newVal === this.today ) ? "오늘날짜 선택됨" : "선택됨")
            $("#sDate_"+newVal).parents("td").addClass("active")

          } else {
            // newVal === "" : 월을 변경된 경우
            // 별도 처리 안함.
          }
        }
      }
    }
  }
</script>
