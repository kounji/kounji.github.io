/**
 * 각 화면 개발에 필요한 공통함수 중 숫자 타입의 함수 스크립트.
 */
import numeral from 'numeral'
import Constant from '@/common/config/constants' 

/**
 * method description
 * @param {*} parameter
 * @return {Object}
 */
export const methodName = (parameter) => {
  return parameter
}

/**
 * number format
 * @param {Number} number
 * @param {String} format : 표현할 format 기본값은 Constant.FORMAT.NUMBER
 * @param {Object} options : {precision: 2}
 * @return {Number}
 */
export const numberFormat = (number, format=Constant.FORMAT.NUMBER, options={}) => {
  if (options.precision) {
    number = floor(number, options.precision)
  }
  return numeral(number).format(format)
}

/**
 * number format
 * @param {Number} number
 * @param {String} format : 표현할 format 기본값은 Constant.FORMAT.NUMBER
 * @param {Object} options : {precision: 2}
 * @param {Boolean} Option값 전체 강제 적용여부 
 * @return {Number}
 */
export const numberFormatAuto = (number, format=Constant.FORMAT.NUMBER, options={}, applyAll=true) => {
  if (options.precision) {
    if (applyAll) {
       number = floor(number, options.precision)
    }else{
      const tmpNumStr = (number).toString()
      if(tmpNumStr.indexOf('.') > -1)
      {
        number = floor(number, options.precision)
      }else{
        format = Constant.FORMAT.NUMBER
      }
     }
  }
  return numeral(number).format(format)
}

/**
 * floor : 소수점 자리수를 반올림 하지 않고 자른다
 * @param {Number} number
 * @param {Number} precision - 소수점 자리수
 * @return {Number}
 */
export const floor = (number, precision) => {
  const factor = Math.pow(10, precision)
  const tempNumber = Math.round(number * factor)
  const roundedNumber = Math.floor(tempNumber)
  return roundedNumber / factor
}

/**
 * round : 소수점 자리수를 반올림 하고 자른다
 * @param {Number} number
 * @param {Number} precision - 소수점 자리수
 * @return {Number}
 */
export const round = (number, precision) => {
  const factor = Math.pow(10, precision)
  const tempNumber = Math.round(number * factor)
  const roundedNumber = Math.round(tempNumber)
  return roundedNumber / factor
}

/**
 * roundNumberWithDot : 소수점 자리수를 반올림 하고 자른후 콤마추가
 * @param {Number} number
 * @param {Number} precision - 소수점 자리수
 * @return {Number}
 */
export const roundNumberWithDot = (number, precision) => {
  const factor = Math.pow(10, precision)
  const tempNumber = Math.round(number * factor)
  const roundedNumber = Math.round(tempNumber) /factor

  let format ="#,###"
  let padStr =""
  if(precision>0)
  {
    format +="."
    for (let i=0; i<precision;i++ )
    {
      padStr +="#"  
    }
    format += padStr
  }
  return numeral(roundedNumber).format(format)
}

/**
 * keyup number format
 * @param {Number} number
 * @param {String} format : 표현할 format 기본값은 Constant.FORMAT.NUMBER
 * @param {Object} options : {precision: 2}
 * @return {Number}
 */
export const keyupNumFormat = (number, format=Constant.FORMAT.NUMBER, options={}) => {
  if (options.precision) {
    number = floor(number, options.precision)
  }
  if(numeral(number).format(format) == 0){
    return "";
  } else {
    return numeral(number).format(format)
  }
}