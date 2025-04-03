/**
 * 각 화면 개발에 필요한 엑셀 다운로드 함수 스크립트.
 * 각 화면마다 데이터는 달라질 수 있음.
 * data = {
            header : {
                        title:String, 
                        exgbn:String, 
                        tr_from:String,
                        tr_to :String,
                        tr_gbn :String 
                    } , 
                    data:[{array}]
        } 
 */

import * as XLSX from 'xlsx'
import {dateFormat, getDayDowCName} from '@/utils/date'

/**
 * 거래내역저장
 * @param {Json} data 엑셀 내역을 처리하기 위한 Json Data
 * @return {worksheet} 엑셀 worksheet
 */
export const ex_lcfd4009 = (data) => {

    const headers = [["No","거래일","거래시간","내용(가맹점)","금액","통화","거래구분","결제(거래)수단","거래유형(계좌)","승인상태(카드)","결제방법(카드)","지출카테고리","숨긴내역 여부"]];
   
    const worksheet = XLSX.utils.json_to_sheet([]); //빈엑셀
    
    //워크쉬트 텍스트 입력
    setCellText(worksheet, "■ 다운로드 일자 : " + getDateHangul(), 0);
    setCellText(worksheet, "■ 조회조건" , 2);
    setCellText(worksheet,  "거래기간 : " + data.header.trFrom + "~" + data.header.trTo, 3);
    setCellText(worksheet,  "거래구분 : " + data.header.trGbn, 4);
    setCellText(worksheet,  "■ 거래내역 (총" + data.data.length + "건)", 6);

    //변경된 헤더
    XLSX.utils.sheet_add_aoa(worksheet, headers, {origin: 7} )

    //실제 데이터
    XLSX.utils.sheet_add_json(worksheet, data.data , {skipHeader: true, origin: 8})

    return worksheet;
}

/**
 * 워크쉬트 추가 텍스트 입력
 * @param {worksheet} worksheet 엑셀워크쉬트
 * @param {String} txt 해당로우의 0번째 셀의 텍스트
 * @param {Number} row 텍스트 로우
 * @return 
 */
function setCellText(worksheet, txt, row){
   XLSX.utils.sheet_add_aoa(worksheet, [[txt]], {origin: row} )
}

/**
 * 현재일자 요일 한글 표혐
 * @param 
 * @return {String} 현재일자 표시 한글요일
 */
function getDateHangul(){
    const yyyymmdd = dateFormat(new Date(),'YYYY.MM.DD');
    const dayName = getDayDowCName(new Date());
    const hh24miss = dateFormat(new Date(),'hh:mm:ss');
    return yyyymmdd + "(" + dayName + ") " + hh24miss;
}

export const ex_sample = (data) => {
}