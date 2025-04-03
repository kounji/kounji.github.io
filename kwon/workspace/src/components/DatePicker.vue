<template>
  <input
    type="date"
    @change="changeHandler"
  />
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'DatePicker',
    props: {
      msg: String
    },
    data: function() {
      return {

      }
    },
    computed: {

    },
    methods: {
      changeHandler(e) {
        // console.log(moment(new Date(e.timeStamp)).format('YYYYMMDD'))
        console.log(moment(e.timeStamp).calendar())
      }
    }
  }
</script>
