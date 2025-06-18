/**
 * 각 화면 개발에 필요한 공통함수 중 날짜 관련 함수 스크립트.
 */
import 'moment/locale/ko'
import moment from 'moment'
import Constant from '@/common/config/constants'
import appService from '@/service/appService'

import store from '@/store'
import modalService from '@/service/modalService'

// 세션 체크 타이머
let sessionTimer
sessionTimer = setTimeout(() => {

}, (import.meta.env.VITE_ENV === 'D' ? Constant.DEV_SESSION_TIME   : Constant.SESSION_TIME))

/**
 * method description
 * @param {*} parameter
 * @return {Object}
 */
export const methodName = (parameter) => {
  return parameter
}

/**
 * date format
 * @param {date} 기준 Date
 * @param {format} return date format
 * @return {String}
 */
export const dateFormat = (date=new Date(), format=Constant.FORMAT.DATE, inputFormat=null) => {
  date = date || new Date()
  return moment(date, inputFormat || getFormat(date)).format(format)
}

/**
 * moment input format
 * 다양한 date 형식을 moment 형식으로 변환하기 위헤 input format 리턴
 * @param {value} 변환할 date string
 * @return {String}
 */
const getFormat = (value='') => {
  switch (value.length) {
    case 4: return 'YYYY'
    case 6: return 'YYYYMM'
    case 8: return 'YYYYMMDD'
    case 10: return 'YYYYMMDDhh'
    case 12: return 'YYYYMMDDhhmm'
    case 14: return 'YYYYMMDDhhmmss'
    default: return ''
  }
}

/**
 * 특정 기간동안 (월) date 객체를 생성해준다.
 * @param {Number} gap : 계산할 월 수
 * @param {Number} date : 기준일
 * @param {String} format : format
 * @param {String} orderBy : 정렬
 * @return {Array}
 */
export const getMonthPeriod = (gap=12, date=new Date(), format=null, orderBy='desc') => {
  const list = []
  for (let i=0; i<gap; i++) {
    const d = moment(date).add((i*-1), 'M')
    const v = format ? d.format(format) : d
    list.push(v)
  }
  return orderBy === 'desc' ? list : list.reverse()
}


/**
 * 특정 기간동안 (년) date 객체를 생성해준다.
 * @param {Number} gap : 계산할 월 수
 * @param {Number} date : 기준일
 * @param {String} format : format
 * @param {String} orderBy : 정렬
 * @return {Array}
 */
export const getYearPeriod = (gap=5, date=new Date(), format=null, orderBy='desc') => {
  const list = []
  for (let i=0; i<gap; i++) {
    const d = moment(date).add((i*-1), 'Y')
    const v = format ? d.format(format) : d
    list.push(v)
  }
  return orderBy === 'desc' ? list : list.reverse()
}

/**
 * 당월 잔여일수 
 * @return {Number}}
 */
export const getTmmRmDds = () => {  
  return moment().endOf('month').diff(new Date() , 'days')
}

/**
 * 해당 월의 일 수
 * @param {date} 기준 Date
 * @return {Number}}
 */
export const getDaysInMonth = (date=new Date()) => {
  return  moment(date).daysInMonth()
}

/**
 * 해당 일자의 요일코드
 * @param {date} 기준 Date
 * @return {Number}}
 */
export const getDayDowC = (date=new Date()) => {
  return moment(date).day()
}

/**
 * 해당 일자의 요일코드명
 * @param {date} 기준 Date
 * @return {Number}}
 */
export const getDayDowCName = (date=new Date()) => {
  const days = ['일','월','화','수','목','금','토',]
  return days[moment(date).day()]
}

/**
 * 해당 월의 첫 일자
 * @param {date} 기준 Date
 * @return {Moment}}
 */
export const getFirstDay = (date=new Date()) => {
  return moment(date).startOf('month')
}

/**
 * 해당 월의 마지막 일자
 * @param {date} 기준 Date
 * @return {Moment}}
 */
export const getLastDay = (date=new Date()) => {
  return moment(date).endOf('month')
}

/**
 * 해당 월의 첫일자의 요일코드
 * @param {date} 기준 Date
 * @return {Number}}
 */
export const getFirstDayDowC = (date=new Date()) => {
  return getFirstDay(date).day()
}

/**
 * 입력된 month의 기간 개월수 리턴
 * @param {from} 시작월
 * @param {to} 종려월
 * @return {Number}
 */
export const monthDiff = (from ,to) => {
  return moment(from).diff(moment(to), 'month')
}

/**
 * 입력된 일자의 기간 일수 리턴
 * @param {from} 시작월
 * @param {to} 종려월
 * @return {Number}
 */
export const dayDiff = (from ,to) => {
  return moment(from).diff(moment(to), 'day')
}

/**
 * 변경된 month의 date format 리턴
 * @param {Number} 변경월수
 * @param {date} 기준 Date
 * @param {format} return date format
 * @param {format} input date format
 * @return {String}
 */
export const monthAdd = (months ,date=new Date(), format=Constant.FORMAT.DATE, inputFormat=null) => {
  return moment(date, inputFormat || getFormat(date)).add(months, 'month').format(format)
}

/**
 * 기준일자 +- 날짜 리턴
 * @param {String} gap: 일수 (-3, 7)
 * @param {date} 기준 Date 
 * @return {Moment}}
 */
export const dayAdd = ( gap=0, date=new Date(),format='YYYYMMDD') => {
  return moment(date).add(gap, 'd').format(format)
}

/**
 * 오늘 기준 1일과 마지막 날짜를 리턴
 * @param {String} format: format string
 * @return {Object}
 */
export const firstAndToday = (format='YYYYMMDD') => {
  return {
    startDate: moment().startOf('month').format(format),
    endDate: dateFormat(new Date(), format),
  }
}

/**
 * 정상적인 일자 체크
 * @param {date} 기준 Date 
 * @return {Moment}}
 */
export const isValidDate = (date=new Date()) => {
  return moment(date, 'YYYYMMDD', true).isValid()
}

/**
 * N 개월 전 첫번째 날짜와 오늘 날짜를 리턴
 * '20201122' 기준 2개월전 = 시작: 20200901, 종료: 20201122
 * @param {String} gap: 시작 개월 수
 * @param {String} format: format string
 * @return {Object}
 */
export const scrapingPeriod = (gap= -2, format='YYYYMMDD') => {
  const start = moment().add(gap, 'month')
  return {
    startDate: getFirstDay(start).format(format), // 2개월전 첫번째 일자
    endDate: dateFormat(new Date(), format), // 오늘 일자
  }
}

/**
 * N 개월 전 첫번째 날짜와 오늘 날짜를 리턴
 * '20201122' 기준 2개월전 = 시작: 20200901, 종료: 20201122
 * @param {String} gap: 시작 개월 수
 * @param {String} format: format string
 * @return {Object}
 */
export const scrapingDate = (gap= 0, format='YYYYMMDD') => {
  const today = moment().add(gap, 'month')
  return gap === 0
    ? {
      startDate: getFirstDay(today).format(format), // 이번달 첫번째 일자
      endDate: dateFormat(new Date(), format), // 오늘 일자
    }
    : {
      startDate: getFirstDay(today).format(format), // N개월전 첫번째 일자
      endDate: getLastDay(today).format(format), // 마지막 날짜
    }
}

/**
 * 19세 미만 체크
 * @param {String} format: format string
 * @return {Object}
 */
export const isChild = (value='') => {
  // 값이 없으면 false (어른)
  if (!value) return false

  const today = new Date()
  const yyyy = String(today.getFullYear())
  const mm = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
  const dd = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()

  return parseInt(yyyy + mm + dd) - parseInt(value) - 190000 < 0
 }

 /**
 * 14세 미만 체크
 * @param {String} format: format string
 * @return {Object}
 */
export const isChildV4 = (value='') => {
  // 값이 없으면 false (어른)
  if (!value) return false

  const today = new Date()
  const yyyy = String(today.getFullYear())
  const mm = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
  const dd = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()

  return parseInt(yyyy + mm + dd) - parseInt(value) - 140000 < 0
 }

 /**
  * 청소년(만14세 ~ 만17세) 여부 확인
  */
 export const isTolda = (value='') => {
  // 값이 없으면 false (not 청소년)
  if (!value) return false

  const today = new Date()
  const yyyy = String(today.getFullYear())
  const mm = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
  const dd = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()

  return (parseInt(yyyy + mm + dd) - parseInt(value)) >= 140000 && (parseInt(yyyy + mm + dd) - parseInt(value)) < 180000
 }

 /**
  * 세션 체크 타이머
  */
export const startSessionTimer = () => {
  console.log('세션타이머 확인용 >>>>> ', sessionTimer)
  if (sessionTimer) {
    clearTimeout(sessionTimer)

    if(!appService.applicationSessionCheck())
    {
      //
      console.log('startSessionTimer Call Session Log OUT ######')
      sessionStorage.clear()
      modalService.alert("장시간 미사용으로 종료되었습니다.<br>재로그인 해주시기 바랍니다.").then(()=>{
        clearSessionTimer()
        appService.moveMain()
      })
    }else{
      //init Session Time Reset
      store.dispatch('config/initialSessionTime')
    }
  }
  if(store.state.user.userInfo.chnl === '385'){
    sessionTimer = setTimeout(() => {
    console.log('=====================스뱅 로그인 연장 팝업 호출==============================')
      // console.log('timer execute')
      // 스뱅 로그인 연장 팝업 호출
      appService.openPopupExtendLoginSession()
    }, (import.meta.env.VITE_ENV === 'D' ? Constant.DEV_SESSION_TIMER   : Constant.SESSION_TIME))
  }
  
}

 /**
  * 세션 체크 타이머 클리어 (메모리 관리)
  */
export const clearSessionTimer=() =>{
  if (sessionTimer) {
    clearTimeout(sessionTimer)
  }
}

/**
 * 시스템 점검시간 체크 00:00 ~ 00:30
 */
export const checkMaintenanceTime = () => {
  const HHmm = dateFormat(new Date(), 'HHmm')
  return HHmm >= "0000" && HHmm <= "0015"
}

/**
 * Grand Open Time Check
 * 20211130 : 18:00 ~ 20211201 15:50
 */
export const granOpenDateCheck = () => {
    const currentTimeStamp            = moment().valueOf()
    const grandOpenTimeFromTimeStamp  = moment('2024-06-19 00:00:00').valueOf()
    const grandOpenTimeToTimeStamp    = moment('2024-06-19 09:00:00').valueOf()
    if (currentTimeStamp >= grandOpenTimeFromTimeStamp && currentTimeStamp <= grandOpenTimeToTimeStamp)
    {
      return true
    }else{
      return false
    }

}
