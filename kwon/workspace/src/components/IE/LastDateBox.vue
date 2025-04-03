<template>
  <div class="cmm-date">
    <em class="unit">마지막 업데이트</em>
    <em class="num">{{getDt}}</em>
    <em class="num">{{getTime}}</em>    
    <button type="button" class="cmm-icon-refresh" @click="clickGetData"><span>새로고침</span></button>
  </div>
</template>

<script>
  import {dateFormat} from '@/utils/date'
  
  export default {
    name: 'LastDateBox',
    props: {
      date: String,
    },   
    data: () => {
      return {
        dt: null,
        time: null,
      }
    },
    created() {      
    },
    computed: {   
      getDt() {
        return dateFormat(this.date, 'YYYY.MM.DD');
      },
      getTime() {
        return dateFormat(this.date, 'HH:mm');
      },
    },
    methods: {
      clickGetData() {        
        this.$emit('getData')
      },
    },
  }
</script>
