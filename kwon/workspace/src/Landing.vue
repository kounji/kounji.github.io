<template>
  <div>
    <h1>Landing Page</h1>
  </div>
</template>

<script>
  export default {
    name: 'Landing',
    data: function() {
      return {
      }
    },
    methods: {
      moveJoinPage() {
        location.href = `/?cus=${this.id}`
      }
    }
  } 
</script>