<template>
  <button type="button" class="cmm-btn-select" data-popup="monthPop" title="조회년도와 월을 선택할 수 있습니다." @click="openMonthPop()">
    <span><em>{{getYear}}</em>년 <em>{{getMonth}}</em>월</span>
  </button>

</template>

<script>
  import {dateFormat, getMonthPeriod} from '@/utils/date'
  import modalService from '@/service/modalService'

  export default {
    name: 'MonthPicker',
    props: {
      date: String,
    },   
    data: () => {
      return {
        year: null,
        mm: null,
      }
    },
    created() {      
    },
    computed: {   
      getYear() {
        return dateFormat(this.date, 'YYYY');
      },
      getMonth() {
        return dateFormat(this.date, 'M');
      },
    },
    methods: {
      openMonthPop() {
        const config = {
          params: {
            title: '기간 선택',
            selectVal : this.date,
            list: getMonthPeriod(12).map(d => {
              return { comnCnm : d.format('YYYY년 M월'), comnCId : d.format('YYYYMM') }
            })
          },
        }
        
        modalService.openSelect(config).then(response => {
          if(response.comnCId != "" && response.comnCId != null && response.comnCId != undefined) {
            this.$emit('input', response.comnCId)
            this.$emit('getData')
          }
        })
      },

    },
  }
</script>
