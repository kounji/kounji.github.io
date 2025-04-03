/**
 * 각 화면 개발에 필요한 공통함수 중 데이터 가공을 위한 스크립트.
 */
import modalService from '@/service/modalService'
import {numberFormat} from '@/utils/number'

/**
 * generate UUID
 * @return {String}
 */
export const uuid = (isHiphen=false) => {
  const patten = isHiphen
    ? [1e7]+-1e3+-4e3+-8e3+-1e11
    : [1e7]+1e3+4e3+8e3+1e11
  return (patten).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

/**
 * json parse
 * @param {Object} data
 * @return {Object} 
*/
export const parseJson = (data={}) => {
  try {
    return JSON.parse(data)
  } catch(e) {
    return data
  }
}

/**
 * json stringify
 * @param {Object} data
 * @return {Object} 
*/
export const stringify = (data={}) => {
  try {
    return JSON.stringify(data)
  } catch(e) {
    return data
  }
}

/**
 * get byte size
 */
export const betBytes = (str) => {
	const bytes = []
	for (let i=0; i<str.length; i++) {
		let char = str.charCodeAt(i)
		bytes.push(char >>> 8)
		bytes.push(char & 0xFF)
	}
	return bytes
}


/**
 * masking
 */
export const setMasking = (format, str, ch="*", startPosition=1, endPosition=str.length) => {

  str = $.trim(str)
  let temp = ""

  if (format === "account")
  {
    startPosition = 6
    endPosition   = 16

    if (endPosition >= str.length) endPosition = str.length -4

    temp = str.substring(0, startPosition)

    for (let i=startPosition; i< endPosition; i++)
    {
      temp += ch
    }
    temp += str.substring(endPosition, str.length)
  }

	return temp
}

export const maskingformat = (str, format, ch="*", startPosition=1, endPosition=str.length) => {
  str = $.trim(str)
  let temp = ""

  //계좌번호마스킹
  if (format === "account")
  {
    startPosition = 6
    endPosition   = 16

    if (endPosition >= str.length) endPosition = str.length -4

    temp = str.substring(0, startPosition)

    for (let i=startPosition; i< endPosition; i++)
    {
      temp += ch
    }
    temp += str.substring(endPosition, str.length)
  }

  //전화번호마스킹
  if (format === "phone")
  {
    
    // str = $.trim(str).replaceAll("-","")
    str = $.trim(str).split("-").join("")
    

    if(str.length < 11)
    {
      temp = str.replace(/(\d{3})(\d{1})\d{2}(\d{1,2})\d{2}$/,'$1-$2**-$3**')

    }else{
      temp = str.replace(/(\d{3})(\d{1,2})\d{2}(\d{1,2})\d{2}$/,'$1-$2**-$3**')
    }
  }

  //이름마스킹
  if (format === "name")
  {
    let firstName  = ""
    let middleName = ""
    let lastName   = ""
    let lastNameStartPoint = 0

    if (str !== ""  || str !== null)
    {
      if (str.length > 1) 
      {
        firstName = str.substring(0,1)
        lastNameStartPoint = str.indexOf(firstName)
        if(str.length >2)
        {
          middleName = str.substring(lastNameStartPoint + 1, str.length-1)
          lastName   = str.substring(lastNameStartPoint + (str.length -1), str.length)
        }else{
          middleName = str.substring(lastNameStartPoint + 1, str.length)
        }
        let markers = ""
        for(let i=0; i< middleName.length;i++)
        {
          markers +="*"
        }

        lastName = middleName.replace(middleName, markers) + lastName
        temp = firstName + lastName
      }else
      {
        temp = str
      }
    }
  }  
  
  //카드번호마스킹
  if (format === "card")
  {
    const masterCardPattern 	  = /^5[1-5]\d{14}/
    const visaPattern 			    = /^4\d{12}(\d{3})?/
    const amexCardPattern 	    = /^3[47]\d{13}/
    const discoverCardPattern	  = /^6011\d{12}$/
    const dinersClubCardPattern = /^3(?:0[012345]|[68]\d)\d{11}$/
    const bcCardPattern         = /^94\d{14}/
    const jcbCardPattern        = /^(?:2131|1800|35\d{3})\d{11}$/

    //  let cardNum = $.trim(str).replaceAll("-","")
     let cardNum = $.trim(str).split("-").join("")
     

     if (masterCardPattern.exec(cardNum)) {
       temp = cardNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})$/,'$1-****-****-$4')
     }else if (visaPattern.exec(cardNum)) {
       temp = cardNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})$/,'$1-****-****-$4')
       if (cardNum.length ==13)
       {
         temp = cardNum.replace(/(\d{4})(\d{3})(\d{3})(\d{3})$/,'$1-***-***-$4')
       }
     }else if (amexCardPattern.exec(cardNum)) {
       temp = cardNum.replace(/(\d{4})(\d{6})(\d{5})$/, '$1-******-$3')
     }else if (discoverCardPattern.exec(cardNum)) {
       temp = cardNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})$/,'$1-****-****-$4')
     }else if (dinersClubCardPattern.exec(cardNum)) {
       temp = cardNum.replace(/(\d{4})(\d{6})(\d{4})$/,'$1-******-$3')
     }else if (bcCardPattern.exec(cardNum)) {
       temp = cardNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})$/,'$1-****-****-$4')
     }else if (jcbCardPattern.exec(cardNum)) {
       temp = cardNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})$/,'$1-****-****-$4')
       if (cardNum.length == 15)
       {
         temp = cardNum.replace(/(\d{4})(\d{6})(\d{5})$/,'$1-******-$3')
       }
     }else{
       temp = cardNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})$/,'$1-****-****-$4')
       if (cardNum.length == 15)
       {
         temp = cardNum.replace(/(\d{4})(\d{6})(\d{5})$/,'$1-******-$3')
       }
     }     
  }

  // 마이데이터4.0) 금액 마스킹
  if (format === "amt")
  {
    let fmtStr = numberFormat(str)
    let tmpStrList = []
    let rsltStr = ''
    
    fmtStr = fmtStr.split(',')
    
    for(let i=0; i<fmtStr.length; i++) {
      let markers = ''
      let targetStr = fmtStr[i]
      for(let j=0; j<targetStr.length; j++) {
        markers += ch
      }
      tmpStrList[i] = targetStr.replace(targetStr, markers)
    }
    rsltStr = tmpStrList.join(',')

    temp = rsltStr
  }

	return temp
}

/**
 * Custorm 에러 메세지 
 * @param {String} ErrorCode
 * @param {String} ErrorMessage
 * @return {Object} 
*/
export const makeErrorMessage = (errCode="", errMsg="") => {
  return {data : {rspMsg : [{rspMsgC: errCode, rspMsgCntn: errMsg, nmlActMsgCntn: "서비스 오류가 발생하였습니다."}]}}
}

/**
 * 문자열자르기
 * @param {String} 문자열
 * @param {number} 자를길이
 * @param {String} Revers 역순
 * @param {String}} 추가문자열사용여부
 * @param {String}} 추가문자열
 * @return {String} 
*/

export const stringCut = (str, len, revers="N", addStringYn="N", addString="...") => {
  
  let tempStr = ""
  let tempStrLength = 0

  if (revers === 'N')
  {
    for( let i=0; i<str.length; i++)
    {
      if(tempStrLength == len) break
      //tempStrLength += (str.charCodeAt(i) >128) ? 2:1
      //UTF-8이기 때문에 1글자로 취급해서 계산
      tempStrLength++
      tempStr += str[i]
    }
    if(addStringYn === "Y") tempStr+=addString

  }else{
    tempStr = str.slice( (-1)*len, str.length)
  }

  return tempStr
}

/**
 * checkWord 글자수 체크
 * @param {String} 입력글자
 * @param {Number} 최대길이 (Byte)
 * @return {key:value} "value" : 반환문자열, "flag" : focus in/out
*/
export const checkWord = (str, maxByte) => {
  var strValue = str
  var strLen = strValue.length
  var totalByte = 0
  var len = 0
  var oneChar = ""
  var rtnStr = ""
  var flag = false

  for(let i=0; i<strLen; i++) {
    oneChar = strValue.charAt(i)
    if(escape(oneChar).length > 4) {
      totalByte += 2
    } else {
      totalByte += 1
    }

    if(totalByte <= maxByte) {
      len = i + 1
    }
  }

  if(totalByte > maxByte) {
    let alertMessage = "입력가능 글자수를 초과하였습니다.<BR>(영문, 숫자, 일반 특수문자 : "+ maxByte +" 글자 / 한글 : " + parseInt(maxByte / 2, 10)+" 글자)"
    modalService.alert(alertMessage)
    rtnStr = strValue.substring(0, len)
    str = rtnStr
    flag = true

    return {"value" : str, "flag" : flag}
  }
  
  return {"value" : str, "flag" : flag}
}

/**
 * getOrgnm 기관코드명 Replace
 * @param {String} 기관코드명
 * @return {String} 
*/
export const getOrgnm = (str = '') =>{

  if (str === undefined || str === null || str === '' || str.length == 0 ){
    return str
  }
  // return str.replaceAll('㈜', '').replaceAll('(주)', '').replaceAll('주식회사', '').trim()
  return str.split("㈜").join("").split("(주)").join("").split("주식회사").join("").trim()
  
}

/**
 * getOrgnmList 기관코드명 Replace
 * @param {Object} 기관리스트
 * @param {String} 기관코드명컬럼
 * @return {String} 
*/
export const getOrgnmList = (list = [], colNm) =>{

  if (list === undefined || list === null || list.length == 0 ){
    return ''
  }
  for(let i=0; i< list.length ;i++)
  {
    let tmpOrgnm = getOrgnm(list[i][colNm])
    list[i][colNm] = tmpOrgnm
  }
  return list
}

/**
 * isValidEmailAddr 이메일주소 체크
 * @param {String} 이메일주소
 * @return {String} 
*/
export const isValidEmailAddr = (email) => {
  let re = /^([0-9a-zA-Z_\\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return re.test(email)
}

/**
 * 한글 초성 추출
 */
export const getHangulInitial = (src) => {
  let str = ''
  for (let i = 0; i < src.length; i++) {
      let idx = ((src.charCodeAt(i) - 44032) / 28) / 21
      if (idx >= 0) {
          str += String.fromCharCode(idx + 4352)
      }
  }
  return str
}

/**
 * 한글 중성 추출
 */
export const getHangulNeutral = (src) => {
  let str = ''
  for (let i = 0; i < src.length; i++) {
      let idx = ((src.charCodeAt(i) - 44032) / 28) % 21
      if (idx >= 0) {
          str += String.fromCharCode(idx + 4449)
      }
  }
  return str
}

/**
 * 한글 종성 추출
 */
export const getHangulFinal = (src) => {
  let str = ''
  for (let i = 0; i < src.length; i++) {
      let idx = (src.charCodeAt(i) - 44032) % 28
      if (idx > 0) {
          str += String.fromCharCode(idx + 4519)
      }
  }
  return str
}

/**
 * 한글 종성으로 '이' 혹은 '가' 판단
 */
export const getHangulIga = (src) => {
  if (!src) return ""

  let ret = '가'
  let str = ''
  let hanCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
  let engCheck = /[a-zA-Z]/
  let numCheck = /[0-9]/

  for (let i = src.length - 1; i >= 0; i--) {
      str = src[i]
      if (hanCheck.test(str) || engCheck.test(str) || numCheck.test(str)) { // 한글과 영문자, 숫자 중에서 제일 마지막 글자를 찾는다.
          if (hanCheck.test(str)) ret = getHangulFinal(str) ? '이' : '가' // 한글은 받침 여부에 따라 '이' 혹은' '가'를 출력한다.
          if (engCheck.test(str)) ret = str.toUpperCase() == 'M' || str.toUpperCase() == 'N' ? '이' : '가' // 영문자는 M과 N의 경우만 '이' 나머지는 '가'로 출력한다.
          if (numCheck.test(str)) ret = str == '2' || str == '4' || str == '5' || str == '9' ? '가' : '이' // 숫자 2, 4, 5, 9는 '가' 나머지는 '이'로 출력한다.
          break;
      }
  }
  return ret
}
