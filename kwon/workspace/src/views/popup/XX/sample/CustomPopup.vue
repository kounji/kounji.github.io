<template>
  <div>
    <h4>Custom Popup X</h4>
    <button @click="buttonClick">button click</button>
    <button @click="$emit('close')">close</button>
    <button @click="closeHandler()">closeHandler</button>
  </div>
</template>

<script>
  export default {
    name: 'customPopup',
    props: ['params'],
    methods: {
      buttonClick() {
        console.log(this.params)
      },
      closeHandler() {
        this.$emit('close')
      }
    },
    mounted() {
        console.log('customPopup : mounted')
    }
  }
</script>