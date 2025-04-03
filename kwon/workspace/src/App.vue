<template>
  <Main />
</template>

<script>
  import Main from '@/views/layout/Main.vue'
  import apiService from '@/service/apiService'
  export default {
    name: 'App',
    created() {
      apiService.addLoading("App")      
      // sessionStorage.setItem('App', true)
      // $('body').css('background', "url('./gate01.png') no-repeat center 150px/276px auto")
    },
    components: {
      Main,
    },
  }
</script>