<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농캘린더 > [팝업]지출 상세(수정)
* @ 페이지설명 : [팝업]지출 상세(수정)
* @ 파일명     : src/views/page/SZ/FC/SZFC2107/SZFC2107.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-22
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-06-22                                 
* 2021-07-26                                   수정 작업(삭제가능여부 추가)
* 2021-08-24                                   퍼블 일부사항 변경
* 2021-09-01                                   퍼블 일부사항 변경
*************************************************************************/
-->
<template>
<div class="full_popup" id="full_popup_01">
    <!--[타이틀(Start)]-->
    <div class="popup_header">    
        <h1>지출상세</h1> 
    </div>
    <!--[타이틀(End)]-->
        
    <!--메인(Body)-->	
    <div class="popup_content com_bg_type00">

        <!--상단(Start)--->	
        <div class="com_inner com_line_type01">
            <div class="top_info_box">
                <!-- <button class="num fs16 bold">
                    {{trDt | dateFilter('YYYY.MM.DD')}}&nbsp;&nbsp;{{IMGRBRIT}}{{trDtDownm}}{{IMGLBRIT}} 
                </button> -->
                <button class="select_date">
                    {{trDt | dateFilter('YYYY.MM.DD')}}&nbsp;&nbsp;{{IMGRBRIT}}{{trDtDownm}}{{IMGLBRIT}} <!--거래일자/요일명-->
                </button>
                <div class="bill">
                    <!-- <span class="num counter" data-count="120000" :class="prmAsetCtgrDsc === '1' ? 'com_point_blue' : 'com_point_red' ">{{am | numberFilter}}</span>원 -->
                    <!--2021/10/20(수) 변경-->
                    <span class="num counter" data-count="120000">{{am | numberFilter}}</span>원
                    <!--2021/10/20(수) 변경-->
                </div>
                <div class="sub_txt fs16 mt15">
                    {{dsc}} 
                </div>

                <!--정산일자가 존재할 경우-->
                <template v-if="adjDt !== '' "> 
                    <b>정산예정일</b> &nbsp;&nbsp;<span class="num">{{adjDt| dateFilter('YYYY.MM.DD')}}</span>
                </template> 
            </div>
        </div>
        <!--상단(End)--->	

        <!--Body(Start)--->	            
        <div class="com_inner com_inputarea_type07">
            <!--카테고리-->   
            <div class="com_btnselectbox_type01">
                <!--카테고리변경가능여부가 Y인 경우-->
                <button type="button" class="com_btnselect_type01" :disabled="ctgrChgPsbYn === 'N' " @click.prevent="fn_openSlidePop1($event)" title="주산물">
                    <i :class="ctgrIconFlnm !== '' ? ctgrIconFlnm: '' "></i>
                    <span>{{asetCtgrDsc}}</span>                      
                </button>
			</div>    
                
            <!--작목-->   
            <div class="com_btnselectbox_type01 ani-active">
                 <!--경제통합상품변경가능여부가 Y인 경우-->
				<button type="button" class="com_btnselect_type01" title="나의농장 선택" :disabled="naWrsChgPsbYn === 'N' " @click.prevent="fn_openSlidePop2($event)">
                     <span>{{naWrsSclfnm}}</span>
                </button>
			</div>

            <!--거래내용-->   
            <div class="com_input_type01 ani-active mb20">
                <!-- <input type="text" id="txt01" class="com_iconwrite" name="" :disabled="trCntnChgPsbYn === 'N' " :value="trCntn" ref="trCntn" @input="fn_checkWord($event,20, 'trCntn')" @keyup="moveNextTag($event)" required  placeholder="">   -->

                <!--2021/10/19(화) 변경-->
                <input type="text" id="txt01" class="com_txtright_type01" :class="trCntn.length>0?'focusON focusforce ':''"  name="" :disabled="trCntnChgPsbYn === 'N' " :value="trCntn" ref="trCntn" 
                       @keyup="fn_checkWord($event,50, 'trCntn') ,moveNextTag($event)" required  placeholder="거래처명 또는 입금자명을 입력해 주세요." title="거래처명" 
                       @focus="trCntnChgPsbYn === 'Y' ? fn_focusOnOff('Y') : fn_focusOnOff('N')" @blur="fn_focusOnOff('N')">

                <label for="txt01">
                    <span v-if="trCntnChgPsbYn === 'Y' "  class="txt_label_x">거래처명</span>
                </label>

                <!-- <div class="del_txt" v-show="focusTf === true" > 
                    <a class="com_btn_delete2" v-on:click.prevent="delStr('trCntn')">
                       <span class="blind">삭제</span>
                    </a>
                </div> -->
            </div>

            <!--거래처(사무소)-->   
            <!-- <div class="com_input_type01">
                <label for="com_input04"></label>  
                <input type="text" id="com_input04" class="com_txtindent0"  :disabled="memoCntnChgPsbYn === 'N' " placeholder="" v-model="memoCntn">
            </div> -->

            <!--하단(Start)--->	            
            <!--경제통합상품약어명이 존재할 경우에만-->
            <div class="data_wrap">
                <template v-if="naWrsAbrNm !== '' ">
                        <div class="gray_box">
                            <div class="list">
                                <div class="row"><span class="tit">(품명)</span>{{naWrsAbrNm}}</div>
                                <div class="row"><span class="tit">(수량)</span>{{naWrsAbrQt | numberFilter}}<span class="bar"></span><span class="tit">(금액)</span>{{naWrsAbrAm | numberFilter}}</div>
                            </div>
                        </div>
                </template>
                <!--농기계임대료가 존재할 경우에만-->
                <template v-if="fmachRent  > 0 ">
                        <div class="gray_box">
                            <div class="list">
                                <div class="row"><span class="tit">(농기계임대료)</span>{{fmachRent | numberFilter}}</div>
                                <div class="row"><span class="tit">(지체이자)</span>{{dlayInt | numberFilter}}</div>
                                <div class="row"><span class="tit">(분할회차)</span>{{pttSc | numberFilter}}</div>
                            </div>
                        </div>
                </template>
                <!--농기계작업구분명이 존재할 경우만-->
                <template v-if="fmachWkDsnm !== ''  ">
                        <div class="gray_box">
                            <div class="list">
                                <div class="row"><span class="tit">(작업명)</span>{{fmachWkDsnm}}</div>
                                <div class="row"><span class="tit">(면적)</span>{{asgAreaCntn | numberFilter('0,00') }}</div>
                                <div class="row"><span class="tit">(방제작업)</span>{{pvdsWkMethDsnm}}</div>
                                <div class="row"><span class="tit">(방제작업상세명)</span>{{pvdsWkDtlDsnm}}</div>
                            </div>
                        </div>
                </template>
            </div>

            <div class="com_textarea_type01 ani-active com_no_iconstar">
                <!--메모내용변경여부 = N인 경우--> 
                <textarea name="" id="txt10" class="com_txtarea_type02" :disabled="memoCntnChgPsbYn === 'N' " :value="memoCntn" ref="memoCntn" 
                          @keyup="fn_checkWord($event,100, 'memoCntn')"  cols="10" rows="3" required placeholder="메모를 입력하세요."></textarea> 
                <label for="txt00">
                    <span class="txt_label_x">메모</span>
                </label>				
            </div>				
        </div>
        <!--Body(End)--->	            
        <!--하단(End)--->	            

    </div>
    <!--메인(Body)-->	

    <!--버튼(Start)-->	
    <div class="popup_footer fixed">
        <div class="btn_half_box">
            <!--(변수)거래구분코드 = U AND (변수)삭제여부 = Y AND 매출상세수 = 0인 경우-->
            <template v-if="prmTrDsc==='U' && prmDelPsbYn==='Y' && prmSlDtlCn === 0 ">
                <a href="javascript:void(0);"  class="btn btn_grey" v-on:click.prevent="applyDel()">삭제</a>
            </template>  
            <template v-else>          
                <a href="javascript:void(0);"  class="btn btn_grey" v-on:click.prevent="reset('9')">취소</a>
            </template>  
            <a href="javascript:void(0);"  class="btn btn_mint" v-on:click.prevent="applyBtn()">확인</a>
        </div>
    </div>
    <!--버튼(End)-->	

    <a href="javascript:void(0);"   class="btn_close" v-on:click.prevent="closePopup"><span class="blind">팝업닫기</span></a>		
</div>
</template>
<script>
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
//import SelectPopupCardRenderer from '@/components/renderer/SelectPopupCardRenderer'
import {checkWord} from '@/utils/data'

import SZFC2103 from '@/views/page/SZ/FC/SZFC2103/SZFC2103'
import SZFC2108 from '@/views/page/SZ/FC/SZFC2108/SZFC2108'

export default {
    name : "SZFC2107",
    data: () => {
        return {

            //param 변수
			prmMydtCusno  : "",      //자산관리고객번호
			prmBsnDscm    : "",      //업무구분코드명 
			prmDtlInqKey  : "",      //상세조회키 
			prmTrSqno     : "",      //거래일련번호 
			prmTrDsc      : "",      //거래구분코드 
            prmDelPsbYn   : "",      //삭제여부    
            prmSlDtlCn    : "",      //매출상세수

            prmAsetCtgrDsc :  "",

            //
            mydtCusno      : "",     //마이데이터고객번호
            bsnDscnm       : "",     //업무구분코드명
            updateKey      : "",     //updateKey
            adjDt          : "",     //정산일자
            trDt           : "",     //거래일자
            trDtDownm      : "",     //거래일자요일명
            am             : "",     //금액 
            dsc            : "",     //description 
            ctgrid         : "",     //카테고리ID
            ctgrnm         : "",     //카테고리명
            ctgrChgPsbYn   : "",     //카테고리변경가능여부
            naWrsLclc      : "",     //상품분류코드(대분류)
            naWrsMclc      : "",     //상품분류코드(중분류)
            naWrsSclc      : "",     //상품분류코드(소분류)
            naWrsSclfnm    : "",     //상품소분류명
            naWrs          : "",
            naWrsChgPsbYn  : "",     //경제통합상품변경가능여부
            memoCntn       : "",     //메모내용
            memoCntnChgPsbYn  : "",  //메모내용변경가능여부
            trCntn         : "",     //거래내용
            trCntnChgPsbYn : "",     //거래내용변경가능여부
            naWrsAbrNm     : "",     //경제통합상품약어명
            naWrsAbrQt     : "",     //경제통합상품수량
            naWrsAbrAm     : "",     //경제통합상품금액
            fmachRent      : "",     //농기계임대료
            dlayInt        : "",     //지체이자
            pttSc          : "",     //분할회차
            fmachWkDsnm    : "",     //농기계작업구분명
            asgAreaCntn    : "",     //배정면적내용
            pvdsWkMethDsnm : "",     //방제작업방법구분명
            pvdsWkDtlDsnm  : "",     //방제작업상세구분명
            myfhsCtrgInqDsc : "",    //마이농가카테고리조회구분코드 (1, 2)
            slpCntn         : "",  
            //delPsbYn       : "",     //삭제가능여부 
            //
            asetCtgrDsc    : "",    //자산카테고리구분코드
            ctgrIconFlnm   : "", 
            asetAmnCtgrId  : "",     

            IMGRBRIT       : "(",
            IMGLBRIT       : ")",      
            focusTf        : false
        }
    },

    mixins: [
		commonMixin,
        popupMixin
	],

    computed:{
	},
	
    mounted() {
        this.initComponent(this.params);
        
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)     
    },

	methods: {

		initComponent() {

			this.prmMydtCusno  = this.params.mydtCusno;    //(변수)자산관리고객번호 = 부모프로그램 변수(자산관리고객번호)
			this.prmBsnDscm    = this.params.bsnDscnm;     //(변수)업무구분코드명   = 부모프로그램 변수(업무구분코드명)
			this.prmDtlInqKey  = this.params.dtlInqKey;    //(변수)상세조회키   = 부모프로그램 변수(상세조회키)
			this.prmTrSqno     = this.params.trSqno;       //(변수)거래일련번호 = 부모프로그램 변수(거래일련번호)
			this.prmTrDsc      = this.params.trDsc;        //(변수)거래구분코드 = 부모프로그램 변수(거래구분코드)
			this.prmDelPsbYn   = this.params.delPsbYn;     //(변수)삭제여부     = 부모프로그램 변수(삭제여부)
            this.prmSlDtlCn    = this.params.slDtlCn;      //(변수)매출상세수  = 부모프로그램 변수(매출상세수)

            console.log('[SZFC2107](변수)1.자산관리고객번호=>> '+this.prmMydtCusno);	
            console.log('[SZFC2107](변수)2.업무구분코드명=>> '+this.prmBsnDscm);	
            console.log('[SZFC2107](변수)3.상세조회키=>> '+this.prmDtlInqKey);	
            console.log('[SZFC2107](변수)4.거래일련번호=>> '+this.prmTrSqno);	
            console.log('[SZFC2107](변수)5.거래구분코드=>> '+this.prmTrDsc);	
            console.log('[SZFC2107](변수)6.삭제여부=>> '+this.prmDelPsbYn);	
            console.log('[SZFC2106](변수)7.매출상세수=>> '+this.prmSlDtlCn);	
            //
            this.getSearchList()
        },

		//입력필드에서 값 입력후, '검색'이미지 클릭
		getSearchList() {

            console.log('>>> [SZFC2107]getSearchList(Start) <<<');	
     
            this.prmAsetCtgrDsc  = "2";                      //*(변수)자산카테고리구분코드 = 부모프로그램 변수(자산카테고리구분코드)(2;고정)
            
            console.log('[SZFC2107](변수-Param)자산관리고객번호=>>'+this.prmMydtCusno);	
            console.log('[SZFC2107](변수-Param)업무구분코드명=>>'+this.prmBsnDscm);	
            console.log('[SZFC2107](변수-Param)상세조회키=>>'+this.prmDtlInqKey);	
            console.log('[SZFC2107](변수-Param)거래일련번호=>>'+this.prmTrSqno);	
            console.log('[SZFC2107](변수-Param)자산카테고리구분코드=>>'+this.prmAsetCtgrDsc);

            const config = {
                url: '/sz/fc/07r01',
                //url : "/co/at/01r01",
                data: {
                    mydtCusno   : this.prmMydtCusno  ,   //(입력)자산관리고객번호 = (변수)자산관리고객번호 
                    bsnDscnm    : this.prmBsnDscm    ,   //(입력)업무구분코드명   = (변수)업무구분코드명
                    dtlInqKey   : this.prmDtlInqKey  ,   //(입력)상세조회키       = (변수)상세조회키
                    trSqno      : this.prmTrSqno     ,   //(입력)거래일련번호     = (변수)거래일련번호
                    asetCtgrDsc : this.prmAsetCtgrDsc,   //(입력)자산카테고리구분코드 = (변수)자산카테고리구분코드(1;고정)
                }
            } 
            apiService.call(config).then(response => {
                                
            /* 테스트 자료 부분 */	
         // "mydtCusno"  : "",       //마이데이터고객번호
         // "inqYm"      :"202106",  //조회년월
         // "asetCtgrDsc":"1",       //자산카테고리구분코드(1:수입,2:지출)
         // "ttAm"       :"1200000", //합계금액
         // "dtbyInqCn"  : 2,        //일자별조회건수
                
    
                 //* 살제 자료 부분 */						
                this.mydtCusno      = response.mydtCusno;	   //마이데이터고객번호
                this.bsnDscnm       = response.bsnDscnm;	   //업무구분코드명
                this.updateKey      = response.updateKey;	   //UpdateKe
                this.trDt           = response.trDt;	       //거래일자
                this.trDtDownm      = response.trDtDownm;	   //거래일자요일명
                this.adjDt          = (response.adjDt === undefined)?'':response.adjDt;	       //정산일자

                console.log('[SZFC2107](response)거래일자=>>'+response.trDt);	
                console.log('[SZFC2107](response)거래일자요일명=>>'+response.trDtDownm);	
                console.log('[SZFC2107](response)정산일자=>>'+response.adjDt);	
                console.log('[SZFC2107](변수)정산일자=>>'+this.adjDt);	

                this.am             = response.am;	           //금액
                console.log('[SZFC2107](response)금액=>>'+response.am);	
                console.log('[SZFC2107](변수)금액=>>'+this.am);	
                this.dsc            = response.dsc;	           //description
                this.ctgrid         = response.ctgrid;	       //카테고리ID
                this.asetCtgrDsc    = response.ctgrnm;	       //카테고리명
                this.ctgrChgPsbYn   = response.ctgrChgPsbYn;   //카테고리변경가능여부
                this.ctgrIconFlnm   = response.ctgrIconFlnm;   //카테고리아이콘파일명

                console.log('[SZFC2107](response)카테고리ID=>>'+response.ctgrid);	
                console.log('[SZFC2107](response)카테고리명=>>'+response.ctgrnm);	
                console.log('[SZFC2107](변수)카테고리명=>>'+this.asetCtgrDsc);	
                console.log('[SZFC2107](response)카테고리변경가능여부=>>'+response.ctgrChgPsbYn);	
                console.log('[SZFC2107](response)카테고리아이콘파일명=>>'+response.ctgrIconFlnm);	

                this.naWrsLclc      = response.naWrsLclc;	   //경제통합상품대분류코드
                this.naWrsMclc      = response.naWrsMclc;  	   //경제통합상품중분류코드
                this.naWrsSclc      = response.naWrsSclc;	   //경제통합상품소분류코드
                this.naWrsSclfnm    = response.naWrsSclfnm;	   //경제통합상품소분류명
                this.naWrsChgPsbYn  = response.naWrsChgPsbYn;  //경제통합상품변경가능여부

                console.log('[SZFC2107](response)경제통합상품대분류코드=>>'+this.naWrsLclc);	
                console.log('[SZFC2107](response)경제통합상품중분류코드=>>'+this.naWrsMclc);	
                console.log('[SZFC2107](response)경제통합상품소분류코드=>>'+this.naWrsSclc);	
                console.log('[SZFC2107](response)경제통합상품소분류명=>>'+this.naWrsSclfnm);	
                console.log('[SZFC2107](response)경제통합상품변경가능여부=>>'+this.naWrsChgPsbYn);	

                this.memoCntn       = (response.memoCntn === undefined)?'':response.memoCntn;     //메모내용
                console.log('[SZFC2107](response)메모내용=>>'+this.memoCntn);	
                this.memoCntnChgPsbYn = (response.memoCntnChgPsbYn === undefined)?'':response.memoCntnChgPsbYn;     //메모내용변경가능여부
                console.log('[SZFC2107](response)메모내용변경가능여부=>>'+this.memoCntnChgPsbYn);	

                this.trCntn       = (response.trCntn === undefined)?'':response.trCntn;     //거래내용
                console.log('[SZFC2107](response)거래내용=>>'+this.trCntn);	
                this.trCntnChgPsbYn = (response.trCntnChgPsbYn === undefined)?'':response.trCntnChgPsbYn;     //거래내용변경가능여부
                console.log('[SZFC2107](response)거래내용변경가능여부=>>'+this.trCntnChgPsbYn);	

                this.naWrsAbrNm     = (response.naWrsAbrNm === undefined)?'':response.naWrsAbrNm;	//경제통합상품약어명(품명)
                this.naWrsAbrQt     = response.naWrsAbrQt;	   //경제통합상품수량(수량)
                this.naWrsAbrAm     = response.naWrsAbrAm;	   //경제통합상품금액(금액)
                this.fmachRent      = (response.fmachRent === undefined)?0:response.fmachRent;	    //농기계임대료
                this.dlayInt        = response.dlayInt;	       //지체이자
                this.pttSc          = response.pttSc;	       //분할회차
                this.fmachWkDsnm    = (response.fmachWkDsnm === undefined)?'':response.fmachWkDsnm; //농기계작업구분명(작업명)
                this.asgAreaCntn    = response.asgAreaCntn;	   //배정면적내용(면적)
                this.pvdsWkMethDsnm = response.pvdsWkMethDsnm; //방제작업방법구분명(방제작업)
                this.pvdsWkDtlDsnm  = response.pvdsWkDtlDsnm;  //방제작업상세구분명(방제작업상세명)

                //*2021.11.24(수) (현업)홍준규부장에 요청에 의하여 추가
                this.myfhsCtrgInqDsc  = (response.myfhsCtrgInqDsc === undefined)?'': response.myfhsCtrgInqDsc;  //마이농가카테고리조회구분코드
                //this.slpCntn  = (response.slpCntn === undefined)?'': response.slpCntn;   //전표내용
                //*2021.11.24(수) (현업)홍준규부장에 요청에 의하여 추가

                console.log('[SZFC2107](response)경제통합상품약어명(품명)=>> '+this.naWrsAbrNm);	
                console.log('[SZFC2107](response)경제통합상품수량(수량)=>> '+this.naWrsAbrQt);	
                console.log('[SZFC2107](response)경제통합상품금액(금액)=>> '+this.naWrsAbrAm);	
                console.log('[SZFC2107](response)농기계임대료=>> '+this.fmachRent);	
                console.log('[SZFC2107](response)지체이자=>> '+this.dlayInt);	
                console.log('[SZFC2107](response)분할회차=>> '+this.pttSc);	
                console.log('[SZFC2107](response)농기계작업구분명(작업명)=>> '+this.fmachWkDsnm);	
                console.log('[SZFC2107](response)배정면적내용(면적)=>> '+this.asgAreaCntn);	
                console.log('[SZFC2107](response)방제작업방법구분명(방제작업)=>> '+this.pvdsWkMethDsnm);	
                console.log('[SZFC2107](response)방제작업상세구분명(방제작업상세명)=>> '+this.pvdsWkDtlDsnm);	
                console.log('[SZFC2107](response)마이농가카테고리조회구분코드=>>'+this.myfhsCtrgInqDsc);	
                //console.log('[SZFC2107](response)전표내용=>>'+this.slpCntn);	

                //this.delPsbYn       = response.delPsbYn;       //삭제가능여부(07.23 기획 추가)
            });    

            console.log('>>> [SZFC2107]getSearchList(End) <<<');	

        },

		//[확인]버튼 클릭
        applyBtn() {

            console.log('>>> [SZFC2107]applyBtn(Start) <<<');	

            //*** validation 체크
            if (this.asetCtgrDsc.length == 0 || this.asetCtgrDsc.trim() == "") {
                modalService.alert("자산카테고리구분명은 필수입력항목입니다.").then(() => {});
                return;
            }

            if (this.naWrsSclfnm.length == 0 || this.naWrsSclfnm.trim() == "") {
                modalService.alert("품목명는 필수입력항목입니다.").then(() => {});
                return;
            }

            console.log("[SZFC2107]applyBtn()/업무구분코드명=>>"+this.bsnDscnm)  
            console.log("[SZFC2107]applyBtn()/updateKey=>>"+this.updateKey)  
            console.log("[SZFC2107]applyBtn()/마이농가카테고리ID=>>"+this.ctgrid)  
            console.log("[SZFC2107]applyBtn()/상품분류코드(대분류)=>>"+this.naWrsLclc)  
            console.log("[SZFC2107]applyBtn()/상품분류코드(중분류)=>>"+this.naWrsMclc)  
            console.log("[SZFC2107]applyBtn()/상품분류코드(소분류)=>>"+this.naWrsSclc)  
            console.log("[SZFC2107]applyBtn()/거래내용=>>"+this.trCntn)  
            console.log("[SZFC2107]applyBtn()/메모내용=>>"+this.memoCntn)  
            console.log("[SZFC2107]applyBtn()/자산카테고리구분명=>>"+this.ctgrnm)  

            const config = {
                url : "/sz/fc/07u01",
                //url : "/co/at/01r01",
                data : {
                    mydtCusno    : this.getUserInfo('mydtCusno'),             // 마이데이터고객번호
                    bsnDscnm 	 : this.bsnDscnm,				  //업무구분코드명	
                    updateKey    : this.updateKey,                //updateKey
                    myFhsCtgrid  : this.ctgrid,	                  //마이농가카테고리ID([팝업]품목에서 값 넣어오는거 넣을 것)   주산물(SZ10000001),부산물(SZ10000002),기타외수익(SZ10000000)
                    naWrsLclc    : this.naWrsLclc,				  //상품분류코드(대분류)
                    naWrsMclc    : this.naWrsMclc,				  //상품분류코드(중분류)
                    naWrsSclc    : this.naWrsSclc,	 			  //상품분류코드(소분류)
                    memoCntn     : this.memoCntn,                 //메모내용
                    trCntn       : this.trCntn,                   //거래내용
                    asetCtgrDsnm : this.ctgrnm     		          //자산카테고리구분명
                }
            }
            apiService.call(config).then(response => {
                //response.rspC == '0000' ? this.openSuccess('지출 데이타가 저장(수정) 되었습니다.') : this.openFail1('지출 데이타 저장(수정) 중 오류가 발생하였습니다.')
                
                if(response.rspC == '0000'){
                    modalService.alert("지출 데이타가 저장(수정) 되었습니다.").then(() => {
                        console.log("reg")
                        this.close('complete')
                    })
                }else{
                    modalService.alert("지출 데이타 저장(수정) 중 오류가 발생하였습니다")
                }
            })

            console.log('>>> [SZFC2107]applyBtn(End) <<<');	

        },

        //[취소]버튼 클릭
        reset(flag) {
            console.log('>>> [SZFC2107]reset(Start) <<<');	

			console.log("[SZFC2107]reset/selItem=>>"+flag)

            if (flag === '9' ) { 
                this.restMsg = "지출상세"
                this.msg = this.restMsg+' 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'

                const config = {
                    content: [this.msg],
                    title  : "",
                }
                modalService.confirm(config).then(text => {
                    if(text == "예") {
                         this.close('complete')
                    }
                })
            } else  if (flag === '0' ) { 
                  this.close('complete')
            } 

            console.log('>>> [SZFC2107]reset(End) <<<');	
        },

       //[닫기]버튼 클릭
        closePopup() {

            console.log(" >>> 닫기 <<<")

			this.reset('0')

            //this.close("cancel");
        },

		//[카테고리] Slide 선택시
		fn_openSlidePop1(e) {

            console.log('>>> [SZFC2107]fn_openSlidePop1(Start) <<<');	

			console.log("[SZFC2107]fn_openSlidePop1/마이농가카테고리조회구분코드=>>"+this.myfhsCtrgInqDsc)

			const config = {
				params: { // 파라미터
                    // asetCtgrDsc  : this.prmAsetCtgrDsc,   //자산카테고리구분코드 = (변수)자산카테고리구분코드(1;수입,2;지출)	
                    asetCtgrDsc  : this.myfhsCtrgInqDsc,   //자산카테고리구분코드 = (변수)마이농가카테고리조회구분코드)	
                },

                renderer : {
                     component : SZFC2108 //수입/지출 카테고리 선택)(POP)
                }
            };

            modalService.openSlidePagePopup(config).then(response => {

                this.ctgrid        = response.asetAmnCtgrId  //response자산관리카테고리ID
                this.asetCtgrDsc   = response.ctgrnm         //(입력필드)카테고리 = response.카테고리명
				this.ctgrIconFlnm  = response.ctgrIconFlnm   //(입력필드)카테고리아이콘파일명 = response.카테고리아이콘명

				console.log("[SZFC2107]fn_openSlidePop1()/(response)자산관리카테고리ID=>>"+response.asetAmnCtgrId)  
				console.log("[SZFC2107]fn_openSlidePop1()/(변수)자산관리카테고리ID=>>"+this.ctgrid)  
				console.log("[SZFC2107]fn_openSlidePop1()/(response)카테고리명=>>"+response.ctgrnm)  
				console.log("[SZFC2107]fn_openSlidePop1()/(변수)카테고리명=>>"+this.asetCtgrDsc)  
                console.log("[SZFC2107]fn_openSlidePop1()/(response)카테고리아이콘명=>>"+response.ctgrIconFlnm)  
                console.log("[SZFC2107]fn_openSlidePop1()/(변수)카테고리아이콘명=>>"+this.ctgrIconFlnm)  
                
                // 다음 항목 이동
				this.$nextTick(()=>{
					if(e !== null) this.moveNextTag(e)
				})                
            })
            console.log('>>> [SZFC2107]fn_openSlidePop1(End) <<<');	
        },


        //[품목] Slide 선택시
        fn_openSlidePop2(e) {

            console.log('>>> [SZFC2107]fn_openSlidePop2(Start) <<<');	

            const config = {
				params : {
					mydtCusno : this.getUserInfo('mydtCusno'),   //this.mydtCusno  //마이데이터고객번호
				},
                renderer: {
                    component: SZFC2103,
                }
			}
            modalService.openSlidePagePopup(config).then(response => {

                this.naWrsLclc   = response.naWrsLclc    //상품분류코드(대분류)
                this.naWrsMclc   = response.naWrsMclc    //상품분류코드(중분류)
                this.naWrsSclc   = response.naWrsSclc    //상품분류코드(소분류)
				console.log("[SZFC2107]fn_slidmyFarmPopOpen/(변수)상품분류코드(대/중/소)=>>"+this.naWrsLclc+this.naWrsMclc+this.naWrsSclc)  

                this.naWrsSclfnm = response.naWrsSclfnm  //상품분류명
				console.log("[SZFC2107]fn_slidmyFarmPopOpen/(변수)상품분류명=>>"+this.naWrsSclfnm)  

				// this.$refs.naWrs.value = this.naWrsSclfnm //(입력필드)품목 = (변수)상품분류명(소분류명)
				this.naWrs = this.naWrsSclfnm //(입력필드)품목 = (변수)상품분류명(소분류명)
				console.log("[SZFC2107]fn_slidmyFarmPopOpen/(변수)상품분류코드(합)=>>"+this.naWrs)  

                // 다음 항목 이동
				this.$nextTick(()=>{
					if(e !== null) this.moveNextTag(e)
				})                

            })
            
            console.log('>>> [SZFC2107]fn_openSlidePop2(End) <<<');	
		},

        //입력 텍스트 삭제
        delStr(colNm) {

			if (colNm == "trCntn") {
				this.trCntn = ''   //거래내용(거래처명)
                this.$refs.trCntn.focus()
			}
        },

		fn_checkWord(event, maxByte, str) {

			if (str === "trCntn") {  //거래처	
				let rtnObj = checkWord(event.target.value, maxByte)

				if(rtnObj.flag) {this.$refs.trCntn.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.trCntn = event.target.value
			} else if (str === "memoCntn") {  //메모	
				let rtnObj = checkWord(event.target.value, maxByte)

				if(rtnObj.flag) {this.$refs.memoCntn.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.memoCntn = event.target.value
			}
		},

        //[삭제]버튼 선택
		applyDel() {

			console.log(">>> [SZFCR0007]applyDel(Start) <<<")

            console.log('[SZFCR0007]applyDel/자산관리고객번호=>> '+this.prmMydtCusno);	
            console.log('[SZFCR0007]applyDel/업무구분코드명=>> '+this.prmBsnDscm);	
            console.log('[SZFCR0007]applyDel/상세조회키=>> '+this.prmDtlInqKey);	

			this.msg = '영농달력을 삭제하시겠습니까?'
			const config = {
				content: [this.msg],
				title  : "",
			}
			modalService.confirm(config).then(text => {

				if(text == "예") {
					const config = {
                        url : "/sz/fc/09d01",
						data : {
                            mydtCusno    : this.prmMydtCusno,   //마이데이터고객번호 = (변수)마이데이터고객번호     //this.getUserInfo('mydtCusno')
                            bsnDscnm 	 : this.prmBsnDscm,	    //업무구분코드명 = (변수)업무구분코드명
                            deleteKey    : this.prmDtlInqKey,   //상세조회키 = (변수)상세조회키
                        }
					}

					apiService.call(config).then(response => {
						console.log("[SZFCR0007]applyDel/response.rspC =>> "+response.rspC)
					
						if (response.rspC == '0000') { 
							modalService.alert("자료가 삭제 완료되었습니다.").then(() => {
								this.close('complete')
							})
						} else {
							modalService.alert("자료 삭제 저장시, 오류가 발생하였습니다.")
						}	 
					})					

				}else{
					return false
				}
			})

			console.log(">>> [SZFCR0007]applyDel(End) <<<")

        },        
        
        // input 클릭 시 focus on/off
        fn_focusOnOff(str) {
            if (str === 'Y') {
               this.focusTf  = true
            } else if (str === 'N') {
               setTimeout(() => {
                    this.focusTf  = false
               }, 10);
            }	
        },

     },

    components : {
    }
}   
</script>