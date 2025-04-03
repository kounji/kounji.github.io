<template>
  <div @focus="focusHandler">
    
    <br>
		<span>=========== Toggle ============</span>
		<br>
    type small 등록시 토글 텍스트 제외
    <br>
      <cmm-switch-box id="myFhsXps" v-model="isMyFhsXps" :checked="isMyFhsXps" text="마이농가 지출에 추가하기를 선택" type="" />
      <cmm-switch-box id="myFhsXps" v-model="isMyFhsXps" :checked="isMyFhsXps" text="마이농가 지출에 추가하기를 선택" type="small" />
    <br>
		<span>===========  ============</span>
		<br>

    <h5>string input</h5>
    <input v-model="stringValue" />
    stringValue : {{stringValue}}

    <h5>phone mask</h5>
    <input
      v-model="phone"
      placeholder="(###) ####-####"
    >
    
    <h5>select</h5>
		<button @click="selectedValue='value2'">change value</button>
		<button @click="changeItems">change items</button>
    <br>
		<select-box
			v-model="selectedValue"
			:items="items"
			@change="changeSelect"
		/>

    <h5>date picker</h5>
    <date-picker />
    <br>
    <br>
    <h5>input date</h5>
    <input type="date" pattern="\d{4}\d{2}\d{2}" value="" />
    <br>
    <br>
    <h5>number input</h5>
    <input v-model.number="number" />
    number : {{number}}
    
    <br><br>
    <h5>소수점 라운드</h5>
    <input v-model.number="roundNumber" />소수점자리수<input v-model.number="decimalPoint" />
    number : {{roundCalcNumber}}

    <br><br>
    <input type="text" v-model.number="number2" @input="handlerNum" style='ime-mode:disabled' />

    <br>
    <br>
    <h3>progress Component</h3>
    <span><p v-html="progressDesc"></p></span>
    <div class=top_box>
        <div class="box_head">
            <div class="info">
                <div class="ico">
                    <p class="bank_01"><span class="blind">카카오뱅크</span></p><!-- 카카오뱅크 -->
                </div>
                <div class="title">
                    주머니적금<div class="num">352210808677</div>
                </div>
            </div>
            <button class="refresh">
                <span class="refresh_ico"><span class="blind">새로고침</span></span>
            </button>
        </div>
        <div class="box_content">
            <div class="price">
                <div class="won"><span class="num counter" data-count="2800000">2,800,000</span><span>원</span></div>
                <div class="percent">이자율<span>1.05%</span></div>
            </div>
        </div>
        <cmm-progress :startDate='startDate' :endDate='endDate' />
    </div>
    <br>
    <br>
      <!--<div id="content" class="">-->
        <!--
            달력 컴퍼넌트에서 월을 변경하였을때 데이터 값 처리해야함 필수함수 추가 해야함
            setCalendarData(vYear, vMonth)
        -->        
      <h3>CmmCalendar Component </h3>
        <div class="select_dual">
          <div class="area">
            <button class="select_date" @click="openSlideMonthPop">
              <span class="num">{{currentYear}}</span>년 <span class="num">{{currentMonth}}</span>월 <span class="caret"></span>
            </button>
          </div>
        </div>
        <div class="calendar_wrap com_space_type01">
					<section><!-- class="calendar_box" -->
            <cmmCalendar :pRzsBas='rzsBas' :pYYYYMM='rszYYYYMM' @selectWeekDateEvent="callComponentEvent" />
					</section>
        </div>
      <!--</div>-->
    <br>
      <!--<div id="content" class="">-->
      <!-- <h3>CmmCalendar Component 마이농가</h3> -->
        <!-- <div class="calendar_wrap com_space_type01">
          <section>
            <div class="select_dual">
              <div class="area">
                <button class="select_date">
                  <span class="num">2021</span>년 <span class="num">4</span>월 <span class="caret"></span>
                </button>
              </div>
              <div class="area">
              <button class="select_date">
                나의농장 <span class="caret"></span>
              </button>
              </div>
            </div>
            <div class="cost_notice">
              <div class="cost in">수입<span class="num">1,200,000</span> </div>
              <span class="bar"></span>
              <div class="cost out">지출<span class="num">1,200,000</span> </div>
            </div> -->
            <!-- 마이농가 카렌다 컴퍼넌트 -->
            <!-- 달력을 선택하였을때 부모창의 함수 호출 임의로 만들 수 있음 callComponentEvent-->
            <!-- <CmmCalendarMy :pCredit=54000 :pRzsBas='rzsBas' @mySelectWeekDateEvent="callMyComponentEvent" /> -->
            <!-- 마이농가 카렌다 컴퍼넌트 -->
          <!-- </section>
        </div> -->
        
      <!--</div>-->
  </div>
</template>
<script>
	import SelectBox from '@/components/SelectBox'
	import DatePicker from '@/components/DatePicker'
  import commonMixin from '@/common/mixins/commonMixin'
  import CmmProgress from '@/components/CmmProgress'
  import {roundNumberWithDot} from '@/utils/number'
  import CmmSwitchBox from '@/components/CmmSwitchBox'
  import CmmCalendar from '@/components/CmmCalendar'
  //import CmmCalendarMy from '@/components/CmmCalendarMy'
  import modalService from '@/service/modalService'

  export default {
    name: 'SampleComponents',
    data: function() {
      return {
        stringValue: null,
        phone: null,
        items: null,
        selectedValue: null,
        number: 1.23,
        number2: 0,
        startDate : '20210501',
        endDate   : '20211231',
        progressDesc : "사용법 <br> import CmmProgress from '@/components/CmmProgressDate' <br> &lt;cmmProgressDate :startDate='startDate' :endDate='endDate' /&gt;",
        roundNumber: 3333333.141592625,
        decimalPoint : 2,
        isMyFhsXps: false,          // 마이농가지출여부
        isFixXps: false,            // 고정지출여부
        isXpsBrkNact: false,        // 지출내역비활성여부   
        rzsBas     :  [
                        {rzsDt:"20210604",revAm:-6000,xpsAm:1000},
                        {rzsDt:"20210611",revAm:-54000},
                        {rzsDt:"20210612",revAm:-60000},
                      ], // 수입지출실적목록
        rszYYYYMM     : '',
        currentYear: 0,
        currentMonth: 0,
        currentDay  : 0,
      }
    },
    computed: {
      roundCalcNumber(){
        return  roundNumberWithDot(this.roundNumber , this.decimalPoint)
      }
    },    
    methods: {
      focusHandler() {
        console.log('focus ###############')
      },
      focusHandler2() {
        console.log('focus ccccccccccc')
      },
      test() {
      },
      changeSelect(event) {
        console.log(event)
        /*
          event = {
            label: 선택한 option label
            value: 선택한 option value
            item: 선택한 option object 
          }
        */
      },
      changeItems() {
      },

      //달력 컴퍼넌트에서 월을 변경하였을때 데이터 값 처리해야함 필수
      setCalendarData(vYear, vMonth){
        const yyyymm = vYear +""+ vMonth
        const config = [
                        {rzsDt:yyyymm+""+"04",revAm:-6000,xpsAm:1000},
                        {rzsDt:yyyymm+""+"15",revAm:-54000},
                        {rzsDt:yyyymm+""+"18",revAm:-60000},
                        ] // 수입지출실적목록
        return config
      },
      //카렌다에서 Event가 발생할 경우 부모창에서 호출되는 함수
      callComponentEvent(dates){
        console.log("calendar Select Date", dates)
      },
      callMyComponentEvent(dates){
        console.log("My calendar Select Date", dates)
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

          this.currentYear = resYYYY
          this.currentMonth = resMM
          this.rszYYYYMM = resYYYY + '' +resMM
          console.log('rszYYYYMM', this.rszYYYYMM)

          this.rzsBas = [
                        {rzsDt:this.rszYYYYMM+""+"04",revAm:-6000,xpsAm:1000},
                        {rzsDt:this.rszYYYYMM+""+"15",revAm:-54000},
                        {rzsDt:this.rszYYYYMM+""+"18",revAm:-60000},
                        ] // 수입지출실적목록
          console.log("rzsBas", this.rzsBas)
				})
      },
      fn_keyPress(evt){
        console.log('fn_keyPress', evt)
        if (evt.keyCode > 47 && evt.keyCode < 58)
        {
          return
        }else{
          return false
        }
      },
      fn_keyUp(evt){
        console.log('fn_keyUp', evt, evt.key)
       
        
      },
      handlerNum(evt)
      {
        console.log('handlerNum', evt)
        evt.target.value = evt.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
      }
    },
    created() {
      const date        = new Date()
      this.currentDay   = date.getDate()
      this.currentYear  = date.getFullYear()   //현재년
      this.currentMonth = ("0" + (date.getMonth() +1)).slice(-2)  //현재월 00
      this.rszYYYYMM    = this.currentYear + '' + this.currentMonth
    },    
    mounted() {
      //this.$set(this, 'isMyFhsXps', false)                  // 마이농가지출여부
    },
		mixins: [
			commonMixin
		],
    components: {
      SelectBox,
      DatePicker,
      CmmProgress,
      CmmSwitchBox,
      CmmCalendar,
      //CmmCalendarMy
    }
  }
</script>
