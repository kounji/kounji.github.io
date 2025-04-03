<template>
  <div class="inner-wrap full">
    <div class="content-wrap">
      <div class="header">
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          <span>닫기</span>
        </button>
        <h1>팝업 타이틀</h1>
      </div>
      <div id="content">
        <div class="cmm-calendar-table">
          <div class="top-group">
            <button type="button" class="fixed">
              <span>시작 월 선택</span>
              <span class="cmm-date">
                <em class="unit">{{ startDateText }}</em>
              </span>
            </button>
            <button type="button" class="fixed">
              <span>종료 월 선택</span>
              <span class="cmm-date">
                <em class="unit">{{ endDateText }}</em>
              </span>
            </button>
          </div>
          <div>
            <button type="button" @click="resetHandler">초기화</button>
            <button type="button" @click="confirmHandler">확인</button>
          </div>
          <month-table
            v-for="(item, index) in yearList"
            :key="index"
            :year="item"
            :start-date="startDate"
            :end-date="endDate"
            :use-month-list="useMonthList"
            @monthClick="monthClick"
          />
        </div>
      </div>
    </div>
    <button 
      type="button"
      class="btn-close"
      @click="close"
    >
      팝업닫기
    </button>
  </div>
</template>

<script>
  import popupMixin from '@/common/mixins/popupMixin'
  import MonthTable from './components/MonthTable'
  import {dateFormat, getMonthPeriod, getYearPeriod} from '@/utils/date'
  
  export default {
    name: 'UISZ0104',
    computed: {
      startDateText() {
        return this.startDate
          ? dateFormat(this.startDate, 'YYYY년 MM월')
          : ''
      },
      endDateText() {
        return this.endDate
          ? dateFormat(this.endDate, 'YYYY년 MM월')
          : ''
      }
    },
    data: function() {
      return {
        yearList: null, // 5년치 년월 리스트
        monthList: [], // 5년치 년월 리스트 [YYYYMM]
        useMonthList: [], // 사용 가능한 년월 리스트 [YYYYMM]
        startDate: '', // 시작 년월 YYYYMM
        endDate: '', // 종료 년월 YYYYMM
      }
    },
    methods: {
      initComponent() {
        this.yearList = this.getYearList()
        this.useMonthList = this.getUseMonthList()
      },

      getYearList() {
        const month = Number(dateFormat(new Date(), 'MM'))
        const yearGap = month === 12 ? 4 : 3 // 12월인 경우만 4년치를 가져오고 나머지는 3년치를 가져온다
        const list = getYearPeriod(yearGap, new Date(), 'YYYY')
        return list.reverse()
      },
      
      // 사용 가능한 년월 리스트 (3년)
      getUseMonthList() {
        const yyyymm = dateFormat(new Date(), 'YYYYMM')
        const months = getMonthPeriod(36, yyyymm, 'YYYYMM', 'asc')
        return months
      },

      // 월 버튼 클릭
      monthClick(value) {
        if (!this.startDate && !this.endDate) {
          this.startDate = value
        } 
        else if (this.startDate && !this.endDate) {
          this.endDate = value
        }
      },

      // 유효성 체크
      validateConfirm() {
        // 시작 월 체크
        if (!this.startDate) {
          this.alert('시작 월을 선택하세요')
          return false
        }
        // 종료 월 체크
        if (!this.endDate) {
          this.alert('종료 월을 선택하세요')
          return false
        }
        return true
      },

      // 초기화
      resetHandler() {
        this.startDate = this.endDate = null
      },

      // 확인
      confirmHandler() {
        if (this.validateConfirm()) {
          const data = {
            startDate: this.startDate,
            endDate: this.endDate
          }
          this.close(data)
        }
      },

    },
    mounted() {
      this.initComponent()
    },
    components: {
      MonthTable
    },
    mixins: [
      popupMixin
    ],
  }
</script>
