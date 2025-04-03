<template>
  <span>{{ label }}</span>
</template>

<script>
  import constant from '@/common/config/constants'
  
  export default {
    name: 'SelectPopupRenderer',
    props: {
      data: {
        type: Object,
        default: () => ({})
      },
      config: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      labelField() {
        return this.config.labelField || constant.MODAL.SELECT_MODAL.LABEL_FIELD
      },
      label() {
        return this.data[this.labelField]
      } 
    }
  }
</script>
