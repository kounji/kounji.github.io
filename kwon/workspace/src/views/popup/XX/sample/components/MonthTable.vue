<template>
  <table class="year">
    <caption>기간설정</caption>
    <colgroup>
      <col style="width:25%">
      <col style="width:25%">
      <col style="width:25%">
      <col style="width:25%">
    </colgroup>
    <thead>
      <tr>
        <th scope="col" colspan="4">{{year}}년</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td :class="getTdStyle(1)">
          <button
            type="button"
            @click="monthClick(1)"
            :disabled="isDisabled(1)">
            <span class="date">1월</span>
          </button>
        </td>
        <td :class="getTdStyle(2)">
          <button
            type="button"
            :disabled="isDisabled(2)"
            @click="monthClick(2)">
            <span class="date">2월</span>
          </button>
        </td>
        <td :class="getTdStyle(3)">
          <button
            type="button"
            :disabled="isDisabled(3)"
            @click="monthClick(3)">
            <span class="date">3월</span>
          </button>
        </td>
        <td :class="getTdStyle(4)">
          <button
            type="button"
            :disabled="isDisabled(4)"
            @click="monthClick(4)">
            <span class="date">4월</span>
          </button>
        </td>
      </tr>
      <tr>
        <td :class="getTdStyle(5)">
          <button
            type="button"
            :disabled="isDisabled(5)"
            @click="monthClick(5)">
            <span class="date">5월</span>
          </button>
        </td>
        <td :class="getTdStyle(6)">
          <button
            type="button"
            :disabled="isDisabled(6)"
            @click="monthClick(6)">
            <span class="date">6월</span>
          </button>
        </td>
        <td :class="getTdStyle(7)">
          <button
            type="button"
            :disabled="isDisabled(7)"
            @click="monthClick(7)">
            <span class="date">7월</span>
          </button>
        </td>
        <td :class="getTdStyle(8)">
          <button
            type="button"
            :disabled="isDisabled(8)"
            @click="monthClick(8)">
            <span class="date">8월</span>
          </button>
        </td>
      </tr>
      <tr>
        <td :class="getTdStyle(9)">
          <button
            type="button"
            :disabled="isDisabled(9)"
            @click="monthClick(9)">
            <span class="date">9월</span>
          </button>
        </td>
        <td :class="getTdStyle(10)">
          <button
            type="button"
            :disabled="isDisabled(10)"
            @click="monthClick(10)">
            <span class="date">10월</span>
          </button>
        </td>
        <td :class="getTdStyle(11)">
          <button
            type="button"
            :disabled="isDisabled(11)"
            @click="monthClick(11)">
            <span class="date">11월</span>
          </button>
        </td>
        <td :class="getTdStyle(12)">
          <button
            type="button"
            :disabled="isDisabled(12)"
            @click="monthClick(12)">
            <span class="date">12월</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import {numberFormat} from '@/utils/number'
  export default {
    name: 'MonthTable',
    props: {
      year: {
        type: String,
        default: ''
      },
      startDate: {
        type: String,
        default: ''
      },
      endDate: {
        type: String,
        default: ''
      },
      useMonthList: {
        type: Array,
        default: () => ([])
      }
    },
    computed: {
    },
    methods: {
      monthClick(mm) {
        const yyyymm = this.year + numberFormat(mm, '00')
        this.$emit('monthClick', yyyymm)
      },
      getTdStyle(mm) {
        const start = Number(this.startDate)
        const end = Number(this.endDate)
        const yyyymm = Number(this.year + numberFormat(mm, '00'))
        if (yyyymm === start) return 'start'
        if (yyyymm === end) return 'end'
        if (yyyymm > start && yyyymm < end) return 'term'
        return ''
      },
      isDisabled(mm) {
        const yyyymm = this.year + numberFormat(mm, '00')
        return !this.useMonthList.includes(yyyymm)
      }
    }
  }
</script>
