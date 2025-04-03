import Vue from 'vue'
import {numberFormat, numberFormatAuto} from '@/utils/number'
import {dateFormat} from '@/utils/date'
import {maskingformat, stringCut} from '@/utils/data'

Vue.filter('numberFilter', (value, format, options={}) => {
  return numberFormat(value, format, options)
})

Vue.filter('numberFilterAuto', (value, format, options={}, allyAll=true) => {
  return numberFormatAuto(value, format, options, allyAll)
})

Vue.filter('dateFilter', (value, format, input) => {
  return dateFormat(value, format, input)
})

Vue.filter('maskingFilter', (value, format, input) => {
  return maskingformat(value, format, input)
})

Vue.filter('stringCutFilter', (str, len, revers="N", addStringYn="N", addString="...") => {
  return stringCut(str, len, revers, addStringYn, addString)
})

Vue.filter('fncorgNmFilter', (value) => {
  if(value == '농협중앙회(상호금융)'){
    return '농축협'
  } else {
    return value
  }
})