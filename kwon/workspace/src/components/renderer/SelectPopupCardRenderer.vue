<template>
  <!-- <p>
    <span>{{ label }}</span>
    <span>{{ value }}</span>
  </p> -->
  <span v-if="label != '' && label != null">{{ label }} <br> {{ value }} </span>
  <span v-else> {{ value }} </span>
</template>

<script>
  import constant from '@/common/config/constants'

  export default {
    name: 'SelectPopupCardRenderer',
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
      valueField() {
        return this.config.valueField || ''
      },
      label() {
        return this.data[this.labelField]
      },
      value() {
        return this.data[this.valueField] == 'ALL' ? '' : this.data[this.valueField]
      }
    }
  }
</script>
