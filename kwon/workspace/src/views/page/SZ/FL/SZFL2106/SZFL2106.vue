<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 농기계임대
* @ 페이지설명 : 농기계임대 메인-농기계구입 자금 설계(POP)
* @ 파일명     : src/views/page/SZ/FL/SZFL2106/SZFL2106.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-04              		                최초작성
* 2021-07-14			  CS515897				화면수정
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01"> 
        <!--상단(Titley)-->	
        <div class="popup_header">    
            <h1>농기계구입 자금 설계</h1>
        </div>
        <!--상단(Titley)-->	

        <!--메인(BODY)-->	
        <div class="popup_content com_bg_type00 com_no_bottom" ref="popup_content"> 
            <!--Tab이전(Start)-->
            <div class="com_inner com_line_type01">
                <div class="msg_list_box">

                    <div class="new_tit_area">
                        <div class="tit"><span>{{fmach.fmachWrsnm}}</span></div>
                    </div>
                    <ul class="list_type_02">
                        <li>
                            <dl>
                                <dt>
                                    <em>업체</em>
                                </dt>
                                <dd>
                                    <span>
                                        <em>{{fmach.spyConm}}</em>
                                    </span>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>
                                    <em>상품코드</em>
                                </dt>
                                <dd>
                                    <span>
                                        <em class="roboto">{{fmach.fmachWrsIdvdc}}</em>
                                    </span>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>
                                    <em>형식명</em>
                                </dt>
                                <dd>
                                    <span>
                                        <em class="roboto">{{fmach.fmachFomnm}}</em>
                                    </span>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>
                                    <em>규격</em>
                                </dt>
                                <dd>
                                    <span>
                                        <em class="roboto">{{fmach.fmachStdCntn}} / {{fmach.fmachStdnm}}</em>
                                    </span>
                                </dd>
                            </dl>
                        </li>
                    </ul>

                    <!--대출한도 금액이 존재할 경우-->
                    <template  v-if="lnLmtAm != 0">
                        <div class="com_gray_box">
                            대출한도<em class="roboto">{{lnLmtAm | numberFilter}}</em><span>만원</span>
                        </div>
                        <p class="dot_msg mt18">농기계정보 및 대출한도는 영업점으로 문의하시기 바랍니다.</p>
                    </template>
                    <!--대출한도 금액이 존재하지 않을 경우-->
                    <template v-else>
                        <div class="com_gray_box">
                            대출한도<em>별도문의</em>
                        </div>
                        <p class="dot_msg mt18">농기계정보 및 대출한도는 영업점으로 문의하시기 바랍니다.</p>
                    </template>
                </div>
            </div>
            <!--Tab이전(End)-->

            <!--대출한도 금액이 존재할 경우-->
            <template  v-if="lnLmtAm != 0">
                <!--Tab(Start)-->
                <div class="com_inner pt30">
                    <div id="tabs" class="com_tabmenu_type03" style="padding-top:3rem;">
                        <ul>
                            <li v-for="(tab, index) in tabs" :key="index" :class="[currentTab===index?'on':'']">
                                <a href="javascript:void(0);" v-on:click.prevent="TabSel(index)">{{tab}}</a></li>
                        </ul>
                    </div>
                </div>
                <!--Tab(End)-->

                <!--Tab0(대출받기)-->
                <div v-show="currentTab == 0" class="cmm-tab-panel on">   
                    <div class="com_inner">
                        <ul class="list_type_02 bl_dot_list">                    
                            <li>
                                <dl>
                                    <dt>
                                        <em>상환방식</em>
                                    </dt>
                                    <dd>
                                        <span>
                                            <em>원금균등상환</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>금리</em>
                                    </dt>
                                    <dd class="space_top">
                                        <span>
                                            고정<em class="roboto">2.0</em>%
                                        </span>
                                        <div class="txt_s">(변동금리는 대출 상담시 선택가능)</div>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <em>거치기간</em>
                                    </dt>
                                    <dd>
                                        <span>
                                            <em class="roboto">1</em>년
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                        </ul>

                        <div class="com_input_type01" :class="rpybtnYn ? 'com_word3' : 'com_word1'">
                            <input required type="tel" id="com_input01" class="" :value="rpyPyrcn" @click="fn_openSZFL2107" readonly title="상환기간을 선택하세요.">
                            <label for="com_input01" class="necessary">
                                <em><span class="blind">필수입력</span></em>
                                <span class="com_txtrequired txt_label_x">상환기간</span>
                            </label>
                            <a href="javascript:void(0);" class="com_btn_call" @click.prevent="fn_openSZFL2107" v-show="rpybtnYn"><span class="blind">팝업열기</span></a>
                            <span class="com_inputtxtright" :class="rpybtnYn ? 'type03' : ''">년</span>
                        </div>

                        <div class="com_input_type01 ani-active com_word2 new_mb45">
                            <input required type="tel" id="com_input02" class="" placeholder="보조금을 입력하세요." title="보조금을 입력하세요."
                                    maxlength="10" autocomplete="off" v-on:blur="numberFilterCheck(), fmachBuyAstmny = (fmachBuyAstmny == '' ? '' : fmachBuyAstmny)" 
                                    @keyup="numberCheck($event, '보조금')" @focus="fmachBuyAstmny = ''" v-model="fmachBuyAstmny" ref="fmachBuyAstmny"/>
                            <label for="com_input02" class="necessary">
                                <em><span class="blind">필수입력</span></em>
                                <span class="txt_label_x">보조금</span>
                            </label>
                            <div class="del_txt">
                                <a href="javascript:void(0);" class="com_btn_delete2"><span class="blind">삭제</span></a>
                                <span class="com_inputtxtright2 style01">만원</span>
                            </div>
                            <p class="com_sum">{{fn_hanValue(fmachBuyAstmny)}}</p><!-- 20211108 한별 추가 -->
                        </div>

                        <div class="tit_dot_box">
                            <div class="pop_tit"><span>대출제한</span></div>
                            <ul class="bl_dot_list">
                                <li>보조금이 있는 경우 대출한도에서 차감됩니다.</li>
                                <li>조사료용 보조금이 있는 경우 대출이 불가합니다.</li>
                                <li>공급가격이 70만원 미만인 경우 대상에서 제외합니다.</li>
                            </ul>
                        </div>
                        <div class="com_btn_area00">
                            <a href="javascript:void(0);" class="com_btn_more" v-on:click.prevent="calLoan" >
                                <span>계산하기</span>
                            </a>
                        </div>
                    </div>

                    <!--[계산하기]하단 부분-->
                    <div v-show="calYN1">
                        <div id="loan_layer" class="result_cont">
                            <div class="com_inner">
                                <div class="available_money">
                                    대출한도<em class="roboto">{{lnPsbAm/10000 | numberFilter}}</em><span>만원</span>
                                </div>
                            </div>
                        </div>
                        <ul class="toggle_list_area loan_toggle_list_area">
                            <!--대출상세 Toggle-->
                            <li>
                                <div class="toggle_list_box ">
                                    <div data-ui-toggle="box" class="">
                                        <button type="button" class="view_btn" aria-expanded="false">
                                            <span class="tit">대출상세</span>
                                            <em class="open">열기</em><em class="close">닫기</em>
                                        </button>
                                    </div>
                                    <ul class="view_list_box ">
                                        <li>
                                            <ul class="bl_dot_list">
                                                <li>농축산식품부에서 정한 대출지원 한도액과 농기계
                                                    실판매가격 중에 적은 금액 이내로 대출이 가능합니다.</li>
                                                <li>트렉터, 관리기, 이양기 등의 부속작업기는 70만원 미만인
                                                    모델을 본체와 동시에 구입할 경우 대출이 가능합니다.</li>
                                                <li>대출기간이 같은 농기계를 동시에 구매하는 경우에는
                                                    동일건으로 처리가 가능합니다.</li>
                                                <li>부속작업기를 본체와 같이 구매할 경우는 대출기간은 
                                                    본체의 대출기간을 적용합니다.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <!--대출상세 Toggle-->

                            <!--대출상환계획 Toggle-->
                            <li>
                                <div class="toggle_list_box ">
                                    <div data-ui-toggle="box" class="">
                                        <button type="button" class="view_btn" aria-expanded="false">
                                            <span class="tit">대출금 상환 계획</span>
                                            <em class="open">열기</em><em class="close">닫기</em>
                                        </button>
                                    </div>
                                    <ul class="view_list_box ">
                                        <li>
                                            <p class="notice pb10">[단위: 원]</p>
                                            <div class="com_tablearea_type01">
                                                <table class="com_tbl com_tbl2">
                                                    <colgroup>
                                                        <col style="width:13%">
                                                        <col style="width:30%">
                                                        <col style="width:10%">
                                                        <col style="width:20%">
                                                        <col style="width:30%">
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th>구분</th>
                                                            <th>납입금액</th>
                                                            <th>원금</th>
                                                            <th>이자</th>
                                                            <th>잔액</th>
                                                        </tr>
                                                    </thead>
                                                    <tfoot>
                                                        <tr class="com_bg_type01">
                                                            <td colspan="1">총 이자액</td>
                                                            <td colspan="4" class="com_point_blue">
                                                                <em class="roboto">{{totInt | numberFilter}}</em><span>원</span>
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                    <tbody>
                                                        <tr v-for="(rpln, index) in rplnList" :key="index">
                                                            <td>{{rpln.pymSc}}</td>
                                                            <td>{{rpln.mmPymAm | numberFilter}}</td>
                                                            <td v-if="rpln.mmPymPrn == 0">-</td>
                                                            <td v-else>{{numberFormat(rpln.mmPymPrn)}}</td>
                                                            <td>{{rpln.mmPymInt | numberFilter}}</td>
                                                            <td>{{rpln.lnBac | numberFilter}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </li>     
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <!--대출상환계획 Toggle-->

                        <!--대출방법-->
                        <div class="com_inner">
                            <div class="loan_step_list_box">
                                <div class="pop_tit"><span>대출방법</span></div>
                                <div class="loan_step_list">
                                    <ul>
                                        <li class="ico_step_01"><span>가까운 농협 방문</span></li>
                                        <li class="ico_step_02"><span>농기계구입 자금대출 신청서 작성</span></li>
                                        <li class="ico_step_03"><span>대출 심사</span></li>
                                        <li class="ico_step_04"><span>대출금지불위임장 및<br>
                                            기대인수확인서 제출</span></li>
                                        <li class="ico_step_05"><span>공급 확인</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>                        
                        <!--대출방법-->
                    </div>
                    <!--[계산하기]하단 부분-->
                </div>
                <!--Tab0(대출 받기)-->
                
                <!--Tab1(목돈모으기)-->
                <div v-show="currentTab == 1">
                    <div class="com_inner">

                        <div class="com_gray_box big_money">
                            <strong><em><span>{{lnLmtAm | numberFilter }}</span>만원</em> 을 모으고 싶다면</strong>
                            <span>농기계 실판매가격은 대출 한도액을 초과할 수 있습니다.</span>
                        </div>

                        <!--추후 이부분 수정~~-->
                        <div class="com_inputarea_type00">
                            <div class="com_input_type01 com_word2">
                                <input required type="tel" id="com_input03" class="" autocomplete="off" maxlength="10" 
                                    v-on:blur="numberFilterCheck" @focus="mnPy = ''" 
                                    @keyup="numberCheck($event, '납입금')" @keyup.enter="moveNextTag($event)" placeholder="" v-model="mnPy" ref="mnPy">
                                <label for="com_input03">
                                    <em><span class="blind">필수입력</span></em>
                                    <span class="txt_label_o">매월납입금액</span>
                                </label>
                                <div class="del_txt">
                                    <span class="com_inputtxtright2">만원</span>
                                </div>
                            </div>

                            <div class="com_input_type01 ani-active com_word1">
                                <input required type="tel" id="com_input04" class="" autocomplete="off" maxlength="5" 
                                    v-on:blur="numberFilterCheck($event, '이자율')" @focus="pmiIntrt = ''" @keyup="floatCheck" @input="floatCheck"
                                    placeholder="" v-model="pmiIntrt">
                                <label for="com_input04">
                                    <em><span class="blind">필수입력</span></em>
                                    <span class="txt_label_o">연 이자율</span>
                                </label>
                                <span class="com_inputtxtright">%</span>
                            </div>

                            <div class="com_input_type04 ani-active">
                                <div class="">
                                    <em><span class="blind">필수입력</span></em>
                                    <span class="com_txtrequired02">금리방식</span>
                                    <ul class="com_radio_chk">
                                        <li>
                                            <span class="btn_radio">
                                                <input type="radio" name="com_check01" value="1" v-model="itrDsc" id="com_check01" checked="checked">
                                                <label for="com_check01">
                                                    <span>단리</span>
                                                </label>
                                            </span>
                                        </li>
                                        <li>
                                            <span class="btn_radio">
                                                <input type="radio" name="com_check02" value="2" v-model="itrDsc" id="com_check02">
                                                <label for="com_check02">
                                                    <span>복리</span>
                                                </label>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="com_btn_area00">
                            <a href="javascript:void(0);" class="com_btn_more" v-on:click.prevent="callNeckMoney" >
                                <span>계산하기</span>
                            </a>
                        </div>
                    </div>

                    <!--[계산하기]하단 부분-->
                    <div class="result_cont">
                        <div class="com_inner" v-show="calYN2">
                            <div class="com_top">
                                <div class="title_infomation">
                                    <h1>납입 기간</h1>
                                    <h2 class="mt10"><span class="num">{{pymPrd}}</span>개월</h2>
                                </div>
                                <div class="com_box_type01 fin_info_wrap mt10 mb30">
                                    <div class="box_head">
                                        <div class="fin_info">
                                            <div class="section cate01">
                                                <span class="ico"></span>
                                                <p>월<b>{{outputMmPymAm | numberFilter}}</b>만원</p>
                                            </div>
                                        </div>
                                        <div class="fin_info">
                                            <div class="section cate02">
                                                <span class="ico"></span>
                                                <p>적립기간</p>
                                                <p><b>{{pymPrd}}</b>개월</p>
                                            </div>
                                        </div>
                                        <div class="fin_info">
                                            <div class="section cate03">
                                                <span class="ico"></span>
                                                <p>이자율</p>
                                                <p><b>{{outputPmiIntrt}}</b>% {{itrDscSentence}}</p> <!--약정이율%-->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="one_list">
                                        모이는 금액  <span class="color">{{numberToKorea(dueXpcPyAm)}}</span>원
                                    </div>  
                                </div>
                            </div>
                            <div class="tbl_box mt0">
                                <div class="pop_tit"><span>만기시 지급액</span></div>
                                <table class="com_tbl com_tbl">
                                    <colgroup>
                                        <col style="width:40%">
                                        <col style="width:60%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>구분</th>
                                            <th class="txt_r"><em>금액</em></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr class="com_bg_type01">
                                            <td>만기지급액</td>
                                            <td class="txt_r com_point_blue"><em class="">{{numberToKorea(dueXpcPyAm)}}</em><span>원</span></td>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            <td>원금</td>
                                            <td class="txt_r"><em class="">{{numberToKorea(dueAvtPrntt)}}</em><span>원</span></td>
                                        </tr>
                                        <tr>
                                            <td>세전이자</td>
                                            <td class="txt_r"><em class="">{{numberToKorea(txbfInt)}}</em><span>원</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p class="dot_msg pb25">일반과세, 비과세. 세금우대의 이자과세에 따라 실제 수령액은 달라질 수 있습니다.</p> 
                        </div>
                    </div>
                    <!--[계산하기]하단 부분-->
                </div>
                <!--Tab1(목돈모으기)-->
            </template>
            <!--대출한도 금액이 존재하지 않을 경우-->
            <template v-else>
                <!-- 문의처 목록이 존재할 경우 -->
                <div class="inq_box" v-if="fmach.inqplList != null">
                    <div class="pop_tit"><span>문의처</span></div>
                    <ul class="bl_dot_list">
                        <li v-for="(inqpl, index) in fmach.inqplList" :key="index">
                            <dl>
                                <dt>{{inqpl.brnm}}</dt>
                                <dd>{{inqpl.cusuzTelno}}</dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <!-- // 문의처 목록이 존재할 경우 -->
                <!-- 문의처 목록이 존재하지 않을 경우 -->
                <div class="inq_box com_bg_type02" v-else>
                    <div class="pop_tit"><span>문의처</span></div>
                    <div class="no_data_box com_bg_type02">
                        <div class="no_data_list">
                            <p>가까운 농축협 영업점에 문의하세요.</p>
                        </div>
                    </div>
                </div>
                <!-- // 문의처 목록이 존재하지 않을 경우 -->
            </template>
        </div>
        <!--메인(BODY)-->	
        
        <a href="javascript:void(0);" @click.prevent="closePopup" class="btn_close"><span class="blind">팝업닫기</span></a>	
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import {keyupNumFormat} from '@/utils/number'

import SZFL2107 from '@/views/page/SZ/FL/SZFL2107/SZFL2107'

export default {
    name : 'SZFL2106',
    data: () => {
        return {
            fmachBuyAstmny  : ""        , //보조금
            lnLmtAm         : 0         , //대출한도 쉼표단위
            lnLmtAmNumber   : 0         , //대출한도 숫자단위
            selectLoan      : true      , //대출받기 텝 버튼
            selectMoney     : false     , //목돈모으기 텝 버튼
            lnPsbAm         : ""        , //대출가능 금액
            rplnList        : []        , //계획목록
            totInt          : ""        , //총이자
            loanBtnChecked  : false     , //대출받기에서 계산하기 버튼 클릭확인
            neckMoneyChecked: false     , //목돈모으기에서 계산하기 버튼 클릭확인
            mmPymAm         : ""        , //대출 월납입금액
            itrDsc          : 1         , //금리구분코드
            pmiIntrt        : 1.5       , //연이자율
            outputPmiIntrt  : ""        , //연이자율 결과 출력
            dueAvtPrntt     : 0         , //만기도래원금합계
            txbfInt         : 0         , //세전이자
            dueXpcPyAm      : 0         , //만기예상지급금액
            mnPy            : 30        , //목돈모으기 월납입금액
            outputMmPymAm   : 0         , //목돈모으기 출력용 월납입금액
            rpyPyrcn        : 4         , //상환기간 (0년이면 default 4년)
            rpybtnYn        : true      , //상환기간 버튼 사용가능여부
            itrDscSentence  : ""        , //단리, 복리 문장
            calYN1          : false     , //대출받기-계산하기
            calYN2          : false     , //목돈모으기-계산하기
            pymPrd          : 0,              

            //Tab관련사항 
            currentTab  : 0, 
            tabs        : ['대출받기','목돈모으기'],
            fmach       : {}
        }
    },

    //새로고침
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },

    mixins: [
        popupMixin,
        commonMixin
    ],

    methods: {
        initComponent() {
            this.fmach = this.params.fmach    //부모프로그램에서 전달된 Param.fmach값을 fmach로 변환
            
            this.getData()
        },

        getData() 
        {
            this.lnLmtAm = this.numberFormat(this.fmach.lnLmtAm/10000)   //대출한도금액 / 10000
            this.lnLmtAmNumber = this.fmach.lnLmtAm;

            this.rpyPyrcn = this.fmach.rpyPyrcn || ""   // 부모창에서 전달된 상환기간 설정(없으면 default 4년)
            if(this.rpyPyrcn === "") {
                this.rpyPyrcn = 4
                this.rpybtnYn = true
            } else {
                this.rpybtnYn = false
            }
        },

        //1000단위마다 금액 쉼표처리
        numberFormat(number){
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },

        //대출한도 입력에 대해서 숫자만 입력가능
        numberCheck(e, name) {
            let selectionStartPos = (name === "보조금") ? this.$refs.fmachBuyAstmny.selectionStart : this.$refs.mnPy.selectionStart
            let selectionEndPos = (name === "보조금") ? this.$refs.fmachBuyAstmny.selectionEnd : this.$refs.mnPy.selectionEnd

            let rtnVal = e.target.value
            rtnVal = rtnVal.replace(/[^0-9]/g, '').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'') //숫자만 입력 가능하도록
            if(name == '보조금') {
                if(rtnVal.length > 1 && rtnVal[0] == 0 && rtnVal[1] == 0) {
                    rtnVal = rtnVal.slice(0, -1)
                } else if(rtnVal.length > 1 && rtnVal[0] == 0 && rtnVal[1] != 0) {
                    rtnVal = rtnVal.slice(1)
                }
            } else {
                rtnVal = rtnVal.replace(/(^0+)/, '') //숫자만 입력 가능하도록
            }
            rtnVal = rtnVal.split(",").join("")
            rtnVal = rtnVal === "0" ? rtnVal : keyupNumFormat(rtnVal) //1000단위마다 ',' 설정
            
            if (name == '보조금'){
               this.fmachBuyAstmny = rtnVal;
            } else if(name == '납입금'){
               this.mnPy = rtnVal;
            }

            if(e.keyCode === 8) {
                this.$nextTick(() => {
                    if(name === "보조금") {
                        this.$refs.fmachBuyAstmny.focus()
                        this.$refs.fmachBuyAstmny.setSelectionRange(selectionStartPos, selectionEndPos)
                    } else if(name === "납입금") {
                        this.$refs.mnPy.focus()
                        this.$refs.mnPy.setSelectionRange(selectionStartPos, selectionEndPos)
                    }
                })
            }
        },

        floatCheck(e) {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '') //숫자만 입력 가능하도록

            if (e.target.value.substr(0,1) == '0' && e.target.value.substr(0,2) != "0."){
                e.target.value = e.target.value.replace(/(^0+)/, '')
                e.target.value = '0'
            } else if(e.target.value.substr(0,1) == '.'){
                e.target.value = ''
            }

            if(e.target.value.split('.').length > 2) {
                e.target.value = e.target.value.slice(0, -1)
            }
        },

        numberFilterCheck(e, name) {
            if(name == '이자율' && e.target.value != '') {
                if(e.target.value > 100){
                    modalService.alert("입력한 연 이자율을 확인하세요.").then(() => {});
                    this.pmiIntrt = ""
                    return;
                }
                e.target.value = parseFloat(e.target.value).toFixed(2)
                this.pmiIntrt = parseFloat(e.target.value).toFixed(2)
            }
        },

        //금액에 대해 한글 원 단위로 변환
        numberToKorea(money){ 
            let inputMoney = money < 0 ? false : money
            let unitWords = ['', '만', '억', '조', '경']
            let splitUnit = 10000
            let splitCount = unitWords.length
            let resultArray = []
            let resultString = ""

            for(var i = 0; i < splitCount; i++){
                let unitResult = (inputMoney % Math.pow(splitUnit, i+1)) / Math.pow(splitUnit, i)
                unitResult = Math.floor(unitResult)

                if(unitResult > 0){
                    resultArray[i] = unitResult
                }
            }
            for(var j = 0; j < resultArray.length; j++){
                if(!resultArray[j]) continue
                resultString = " "+String(this.numberFormat(resultArray[j])) + unitWords[j] + resultString
            }

            return resultString
        },

        TabSel(idx) {
            this.currentTab = idx
        },

        //대출받기 Tab-[계산하기]버튼 클릭
         calLoan(){
             let t_fmachBuyAstmny = ""

             //대출한도 초과 입력에 대한 예외처리
            if(String(this.fmachBuyAstmny).indexOf(",") > -1){
                t_fmachBuyAstmny = this.fmachBuyAstmny.split(",").join("")
            } else {
                t_fmachBuyAstmny = this.fmachBuyAstmny
            }

            if(t_fmachBuyAstmny.length < 1) {
                modalService.alert("보조금을 입력하세요.").then(() => {})
                return
            } else if(t_fmachBuyAstmny*10000 > this.lnLmtAmNumber){
                modalService.alert("보조금은 대출한도를 초과할 수 없습니다.").then(() => {})
                this.fmachBuyAstmny = ""
                return
            }

            const config ={
                url:'/sz/fl/05r01',
                data : {
                    fmachPchCptSqno : this.fmach.fmachPchCptSqno,    //(입력)농기계구입자금 일련번호
                    fmachBuyAstmny  : t_fmachBuyAstmny*10000,        //(입력)농기계기구매보조금
                    dfprdYrcn       : 1,                             //(입력)거치기간수
                    rpyPyrcn        : this.rpyPyrcn,                 //(입력)상한기간년수
                    lnAplItr        : 2,                             //(입력)대출적용금리
                }
            }

            this.loanBtnChecked = false;  //대출받기에서 계산하기 버튼 클릭확인 =  false
            apiService.call(config).then(response => {
                this.rplnList = response.rplnList    //상환계획목록

                this.lnPsbAm        = response.lnPsbAm                          //(변수)대출가능금액
                this.totInt         = this.numberToKorea(response.totInt)       //(변수)총이자액
                this.fmachBuyAstmny = this.numberFormat(this.fmachBuyAstmny)    //(변수)농기계기구매보조금
                this.loanBtnChecked = true                                      //대출받기에서 계산하기 버튼 클릭확인 =  true
                
                this.calYN = true

                // 버튼 이벤트 후 스크롤 위치 이동
                this.$refs.popup_content.scrollTop = this.$refs.popup_content.offsetHeight
            })

            this.calYN1 = true
        },

        //목돈모으기 Tab-[계산하기]버튼 클릭
        callNeckMoney(){
            //납입금액 미입력시에 대한 예외처리
            let t_mnPy = ""

            if (String(this.mnPy).indexOf(",") > -1){
                t_mnPy = this.mnPy.split(",").join("")
            } else {
                t_mnPy = this.mnPy
            }

            if(this.lnLmtAmNumber < t_mnPy*10000){
                modalService.alert("매월 납입 금액은 대출한도를 초과할 수 없습니다.").then(() => {})
                this.mnPy = ""
                return
            } else if(this.mnPy == 0){
                modalService.alert("매월 납입 금액을 입력하세요.").then(() => {})
                return
            } else if(this.pmiIntrt == 0){
                modalService.alert("연 이자율을 입력하세요.").then(() => {})
                return
            }

            const config ={
                url:'/sz/fl/05r02',
                data : {
                    fmachPchCptSqno : this.fmach.fmachPchCptSqno,   //(입력)농기계구입자금 일련번호
                    mmPymAm         : t_mnPy * 10000,               //(입력)월납입금액
                    pmiIntrt        : this.pmiIntrt,                //(입력)약정이율 = (변수)약정이율
                    itrDsc          : this.itrDsc                   //(입력)금리구분코드 = (변수)금리구분코드(1;단리,2;복리)
                }
            }
            apiService.call(config).then(response => {
                this.pymPrd      = response.pymPrd;       // (변수)만기월수(납입개월수)  = (출력)납입기간
                this.dueAvtPrntt = response.dueAvtPrntt;  // (변수)만기도래원급합계 = (출력)만기도래원급합계
                this.txbfInt     = response.txbfInt;      // (변수)세전이자  = (출력)세전이자
                this.dueXpcPyAm  = response.dueXpcPyAm;   // (변수)만기예상지급금액 = (출력)만기예상지급금액

                this.neckMoneyChecked   = true                          //목돈모으기에서 계산하기 버튼 클릭확인 = true
                this.outputMmPymAm      = this.numberFormat(this.mnPy)  //(변수)목돈모으기 출력용 월납입금액 = (변수)매월납입금액

                this.mnPy           = this.numberFormat(this.mnPy)  //(변수)매월납입금액 = (변수)매월납입금액
                this.outputPmiIntrt = this.pmiIntrt                 //(변수)연이자율 결과 출력 = (변수)약정이율

                if(this.itrDsc == 1) this.itrDscSentence = "단리방식"
                else if(this.itrDsc == 2) this.itrDscSentence = "복리방식"

                // 버튼 이벤트 후 스크롤 위치 이동
                this.$refs.popup_content.scrollTop = this.$refs.popup_content.offsetHeight
            })

            this.calYN2 = true
        },

        //[닫기]버튼 클릭
        closePopup() {
            this.close("cancel")
        },

        // 상환기간 선택 레이어 팝업 오픈
        fn_openSZFL2107() {
            if(!this.rpybtnYn) return false // 상환기간이 정해져있다면 레이어팝업 오픈 불가

            const listData = [
                {rpyPyrcn : 4, rpyDscNm : "4년"},
                {rpyPyrcn : 5, rpyDscNm : "5년"},
                {rpyPyrcn : 6, rpyDscNm : "6년"},
                {rpyPyrcn : 7, rpyDscNm : "7년"},
            ]
            
            const config = {
                params : {
                    selectVal   : this.rpyPyrcn,
                    list        : listData
                },
                renderer : {
                    component : SZFL2107
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.rpyPyrcn = response.rpyPyrcn
            })
        },

        fn_hanValue(amount) {
            const koreanUnits = ['', '만', '억', '조']
            let han_amount = parseInt(amount.split(',').join('')) * 10000   // 만원 단위 화면
            let answer = ''
            let unit = 10000
            let index = 0
            let division = Math.pow(unit, index)
            if(amount === "") return

            while(Math.floor(han_amount / division) > 0) {
                const mod = Math.floor(han_amount % (division * unit) / division)
                if(mod) {
                    const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    answer = `${modToString}${koreanUnits[index]} ` + answer
                }
                division = Math.pow(unit, ++index)
            }
            return (answer + "원").replace(" 원","원")
        },
    },
    components : {
    }
}   
</script>