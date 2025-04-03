<template>
  <select
    v-model="selectedValue"
    @change="updateValue($event.target.value)"
  >
    <option
      v-for="(item, index) in items"
      :value="item[valueField]"
      :key="index"
    >
      {{item[labelField]}}
    </option>
  </select>
</template>

<script>
  import _ from 'lodash'
  
  export default {
    name: 'SelectBox',
    props: {
      labelField: { // items object의 label property
        type: String,
        default: 'label'
      },
      valueField: { // items object의 value property
        type: String,
        default: 'value'
      },
      items: {
        type: Array,
      },
      value: {
        type: [String, Number],
      },
      autoFirst: { // items 셋팅할때 자동으로 첫번째 값 선택 할지 유무
        type: Boolean,
        default: true
      },
      disableFirstChange: { // 최초에 change 이번트가 실행 않되게 하는 변수
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        isInitComponent: false,
        isFirstEvent: false,
        selectedValue: null,
      }
    },
    computed: {
      defaultValue() {
        const item = _.head(this.items) || {}
        return this.autoFirst
          ? item[this.valueField]
          : this.value
      },
      selectedItem() {
        const item = _.find(this.items, d => d[this.valueField] === this.selectedValue)
        return item || {}
      },
    },
    methods: {
      initComponent() {
        this.selectedValue = this.value || this.defaultValue
        this.emitChange()
      },
      updateValue() {
        this.emitChange()
      },
      emitChange() {
        const d = this.selectedItem
        const param = {
          label: d[this.labelField],
          value: d[this.valueField],
          item: d
        }
        this.$emit('input', this.selectedValue)
        this.$emit('change', param)
      },
      getInitValue(value) {
        return Number.isInteger(value)
          ? value
          : value || this.defaultValue
      },
    },
    watch: {
      items: {
        handler: function() {
          this.initComponent()
        },
        immediate: true
      },
      value(val) {
        this.selectedValue = val
      },
    }
  }
</script>
