<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농일지 > 
* @ 페이지설명 : 영농일지 상세(수정)
* @ 파일명     : src/views/page/SZ/FR/SZFR2104/SZFR2104.vue
* @ 작성자     : 
* @ 작성일     : 2021-07-08
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-07-08              			           최초 작업
* 2021-07-14              			           수정 작업
* 2021-08-02                                   수정 작업
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01"> 
		<!--타이틀(Start)-->
		<div class="popup_header">    
			<h1>영농일지 상세</h1>
			<a href="javascript:void(0);" class="btn_close" v-on:click.prevent="closePopup"><span class="blind">팝업닫기</span></a>	
		</div>
		<!--타이틀(End)-->
			
		<!--메인(Body)-->		
		<div class="popup_content com_bg_type00">

			<div class="top_weather">
				<div class="title">{{prmNaWrsSclfnm}}</div>      <!--상품분류명-->   
				<!--2021.11.25(목) 변경-->
				<div  v-show="(prmCulplRgnNm !== '' || prmCulplRgnNm !== null) " class="sub_title">{{prmCulplRgnNm}}</div>   <!--재배지지역명-->
				<!--2021.11.25(목) 변경-->
				
				<!--날씨정보(Start)-->
				<div class="info_wrap">
					<div class="txt_weather">
						<div class="com_tooltip_type01">
							<p>
								<span>날씨정보</span>
								<a class="com_btn_info"  v-on:click.prevent="toolTipOpenPopup()">
									<em class="com_icon_info2"><span class="blind">툴팁열기</span></em>                  
								</a>                  
							</p>                
							<div class="com_ballon_type01" :style="isTlTipYn == true ? 'display:block' : 'display:none' " >
								<div>
									현지사정이나 수신 상태에 의해 차이가 발생할 수 있습니다.<br>
									(제공: K-weather)
									<a class="com_btn_close"  v-on:click.prevent="toolTipClosePopup()"><span class="blind">툴팁닫기</span></a>
								</div> 
							</div>
						</div>                                      
					</div>
				</div>
				<!--날씨정보(End)-->
			</div>

			<!--기상정보내역을 보여줌~ -->
			<div class="weather_top">
	
				<div class="weather_sel_wrap">
					<div class="weather_sel">
						<div :class=" 'weather weather'+weathMapIconC"></div> 
						<button class="select_date">
							{{weathMapCntn}} 
						</button>
					</div>
				</div>

				<div class="weather_detail mt10">
					<div class="com_box_title">                
						<div class="tt">기온</div>
						<div class="tt">강수</div>
					</div>
					<div class="com_inner pair">                
						<div class="com_box_type01">
							<div class="com_input_type01 com_placeholder_right com_word2 m0">
								<label for="txt01">최고</label>
								<input type="text" id="txt01" class="input_right com_txtright_type01 no-stroke" title="최고기온" disabled="true" v-model="mxTptrCntn">
							</div>
						</div>
						<div class="com_box_type01">
							<div class="com_input_type01 com_placeholder_right com_word2 m0">
								<label for="txt02">습도</label>
								<input type="text" id="txt02" class="input_right com_txtright_type01 no-stroke" title="습도" disabled="true" v-model="humidityCntn">
							</div>
						</div>
					</div>
					<div class="com_inner pair">                
						<div class="com_box_type01">
							<div class="com_input_type01 com_placeholder_right com_word2 m0">
								<label for="txt03">최저</label>
								<input type="text" id="txt03" class="input_right com_txtright_type01 no-stroke" title="최저기온" disabled="true" v-model="lowsTptrCntn">
							</div>
						</div>
						<div class="com_box_type01">
							<div class="com_input_type01 com_placeholder_right com_word2 m0">
								<label for="txt04">강수량</label>
								<input type="text" id="txt04" class="input_right com_txtright_type01 no-stroke" title="강수량" disabled="true" v-model="rainfCntn">
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--입력0(Start)-->
			<div class="weather_input_wrap">
				<div class="com_input_type01">   
                    <template v-if="naDataDsc !== 'DIRECT' ">
						<input type="text" id="com_input01"  class="input_left" name="" value="" title="날짜선택" disabled required date-placeholder="" v-model="wkDt">
					</template>
					<template v-else> 
						<!-- <input type="date" id="txt01" pattern="[0-9]*" class=""  ref="wkDt" :max="today" name="" value="" required date-placeholder="" @keyup="moveNextTag($event)" v-model="wkDt"> -->

						<!--2021/10/19(화) 변경-->						
						<input type="text" data-popup="alert_popup" readonly id="txt01" title="날짜선택" class="input_cal_date"  ref="wkDt" name="" value="" required date-placeholder="" v-model="wkDt" @click="fn_popupCalendar($event)">
						<!--2021/10/19(화) 변경-->						
					</template>
					<label for="com_input01"></label>
                </div>

				<div class="com_input_type01">
					<label for="com_input02"></label>
                    <template v-if="naDataDsc !== 'DIRECT' ">
						<input type="text" id="com_input01" class="" name="" value="" title="작업을 설정해주세요" :disabled="naDataDsc !== 'DIRECT' " ref="fangWkDsnm" v-model="fangWkDsnm" placeholder="">
					</template>
					<template v-else> 
						<div class="com_btnselectbox_type01 ani-active">
							<button type="button" class="com_btnselect_type01 com_iconstar"  title="작업을 설정해주세요" @click.prevent="fn_openSlidePop($event)">
								<span>{{fangWkDsnm.length > 0 ? fangWkDsnm : '작업을 설정해 주세요.'}}</span>
							</button>
						</div>  
					</template>
				</div>
  
				<!--2021/10/22(금) 변경-->
				<div class="com_input_type01 ani-active">
					<input type="text" id="com_input21" class="" :value="fangWknm" ref="fangWknm" @keyup="fn_checkWord($event,150, 'fangWknm'), moveNextTag($event)"  name="" required="" title="상세 작업명을 입력해 주세요" placeholder="상세 작업명을 입력해 주세요.">
					<label for="com_input21">
						<em><span class="blind">필수입력</span></em>
						<span class="txt_label_x">상세 작업명</span>
					</label>
                </div>
				<!--2021/10/22(금) 변경-->

				<!--입력1-자가입력(Start)-->
				<div class="title mt30">
					자가인력
				</div>
				<!--자가인력(남/시분)(Start)--->
				<div class="pair_input">
					<div class="com_input_type01 com_word1">
						<label for="com_input021"><span class="txt_label">남</span></label>
						<input type="tel" id="com_input021" class="" name="" value="" placeholder="" maxlength="3"  ref="maleOwhsHmrsCn" title="남" @input="fn_hourMinuteCheck('maleOwhsHmrsCn', '0')"  @keyup="moveNextTag($event)" v-model="maleOwhsHmrsCn">
						<div class="del_txt">
							<a class="com_btn_delete2" v-on:click.prevent="delStr('maleOwhsHmrsCn')" v-if="maleOwhsHmrsCn.length > 0"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">명</span>
						</div>
					</div>

					<div>
						<div class="com_input_type01 com_placeholder_right com_word2">
							<label for="com_input03"></label>
							<input type="tel" id="com_input03" class="" name="" value="" placeholder="시간입력" title="시간입력" maxlength="2"  ref="hour1"  @input="fn_hourMinuteCheck('hour1', '1')" @keyup="moveNextTag($event)" v-model="hour1">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('hour1')" v-if="hour1.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">시간</span>
							</div>
						</div>
						<div class="com_input_type01 com_placeholder_right com_word1">
							<label for="com_input04"></label>
							<input type="tel" id="com_input04" class="" name="" value="" placeholder="분입력"  title="분입력" ref="minute1" maxlength="2" @input="fn_hourMinuteCheck('minute1', '2')" @keyup="moveNextTag($event)" v-model="minute1">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('minute1')" v-if="minute1.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">분</span>
							</div>
						</div>
					</div>
				</div>
				<!--자가인력(남/시분)(End)--->

				<!--자가인력(여/시분)(Start)--->
				<div class="pair_input">
					<div class="com_input_type01 com_word1">
						<label for="com_input041"><span class="txt_label">여</span></label>
						<input type="tel" id="com_input041" class="" name="" value="" placeholder="" maxlength="3"  ref="wmnOwhsHmrsCn" title="여" @input="fn_hourMinuteCheck('wmnOwhsHmrsCn', '0')" @keyup="moveNextTag($event)" v-model="wmnOwhsHmrsCn">
						
						<div class="del_txt">
							<a class="com_btn_delete2" v-on:click.prevent="delStr('wmnOwhsHmrsCn')" v-if="wmnOwhsHmrsCn.length > 0"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">명</span>
						</div>
					</div>
			
					<div>
						<div class="com_input_type01 com_placeholder_right com_word2">
							<label for="com_input06"></label>
							<input type="tel" id="com_input06" class="" name="" value="" placeholder="시간입력" title="시간입력" maxlength="2" ref="hour2" @input="fn_hourMinuteCheck('hour2', '1')" @keyup="moveNextTag($event)" v-model="hour2">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('hour2')" v-if="hour2.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">시간</span>
							</div>
						</div>
						<div class="com_input_type01 com_placeholder_right com_word1">
							<label for="com_input07"></label>
							<input type="tel" id="com_input07" class="" name="" value="" placeholder="분입력"  title="분입력" ref="minute2" maxlength="2" @input="fn_hourMinuteCheck('minute2', '2')" @keyup="moveNextTag($event)" v-model="minute2">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('minute2')" v-if="minute2.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">분</span>
							</div>
						</div>
					</div>

				</div>
				<!--자가인력(여/시분)(End)--->

				<!--입력2-고용입력(Start)-->
				<div class="title mt17">
					고용인력
				</div>

				<!--고용인력(남/시분)(Start)--->
				<div class="pair_input"> 
					<div class="com_input_type01 com_word1">
						<label for="com_input071"><span class="txt_label">남</span></label>
						<input type="tel" id="com_input071" class="" name="" value="" placeholder="" maxlength="3"  ref="maleEmplHmrsCn" title="남" @input="fn_hourMinuteCheck('maleEmplHmrsCn', '0')"  @keyup="moveNextTag($event)" v-model="maleEmplHmrsCn">
						<div class="del_txt">
							<a class="com_btn_delete2" v-on:click.prevent="delStr('maleEmplHmrsCn')" v-if="maleEmplHmrsCn.length > 0"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">명</span>
						</div>
					</div>

					<div>
						<div class="com_input_type01 com_placeholder_right com_word2">
							<label for="com_input09"></label>
							<input type="tel" id="com_input09" class="" name="" value="" placeholder="시간입력" title="시간입력" maxlength="2"  ref="hour3" @input="fn_hourMinuteCheck('hour3', '1')"  @keyup="moveNextTag($event)" v-model="hour3">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('hour3')" v-if="hour3.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">시간</span>
							</div>
						</div>
						<div class="com_input_type01 com_placeholder_right com_word1">
							<label for="com_input10"></label>
							<input type="tel" id="com_input10" class="" name="" value="" placeholder="분입력"  title="분입력" ref="minute3" maxlength="2" @input="fn_hourMinuteCheck('minute3', '2')" @keyup="moveNextTag($event)" v-model="minute3">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('minute3')" v-if="minute3.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">분</span>
							</div>
						</div>					
					</div>					
				</div> 
				<!--고용인력(남/시분)(End)--->

				<!--고용인력(여/시분)(Start)--->
				<div class="pair_input">
					<div class="com_input_type01 com_word1">
						<label for="com_input05"><span class="txt_label">여</span></label>
						<input type="tel" id="com_input05" class="" name="" value="" placeholder="" maxlength="3" title="여" ref="wmnEmplHmrsCn" @input="fn_hourMinuteCheck('wmnEmplHmrsCn', '0')" @keyup="moveNextTag($event)" v-model="wmnEmplHmrsCn">
						
						<div class="del_txt">
							<a class="com_btn_delete2" v-on:click.prevent="delStr('wmnEmplHmrsCn')" v-if="wmnEmplHmrsCn.length > 0"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">명</span>
						</div>
					</div>
			
					<div>
						<div class="com_input_type01 com_placeholder_right com_word2">
							<label for="com_input12"></label>
							<input type="tel" id="com_input12" class="" name="" value="" placeholder="시간입력" title="시간입력" maxlength="2" ref="hour4" @input="fn_hourMinuteCheck('hour4', '1')" @keyup="moveNextTag($event)" v-model="hour4">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('hour4')" v-if="hour4.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">시간</span>
							</div>
						</div>
						<div class="com_input_type01 com_placeholder_right com_word1">
							<label for="com_input13"></label>
							<input type="tel" id="com_input13" class="" name="" value="" placeholder="분입력" title="분입력" ref="minute4" maxlength="2" @input="fn_hourMinuteCheck('minute4', '2')"  @keyup="moveNextTag($event)" v-model="minute4">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('minute4')" v-if="minute4.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">분</span>
							</div>
						</div>
					</div>
				</div>
				<!--고용인력(여/시분)(End)--->

				<!-- <div class="com_input_type01 com_placeholder_right com_word1 mt30"> -->
				<div class="com_input_type01 ani-active mb20 com_word1">
					<input type="tel" id="com_input061" class="com_txtright_type01" :class="areaCntn.length>0?'focusON focusforce ':''" name="" maxlength="7" 
							required="" @input="addComma('areaCntn')" placeholder="작업면적(평수)을 입력해 주세요" title="작업면적(평수)을 입력해 주세요" v-model="areaCntn" @keyup="moveNextTag($event)" 
							ref="areaCntn">
					<label for="com_input05">
						<span class="txt_label_x">작업면적</span>
					</label>

					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2">평</span>
					</div>

                </div>

				<!--입력3-작업면적(End)-->

				<!--(resp)경제통합데이터구분코드가 'DIRECT'가 아닐 경우에만 보여줌~ -->
				<template v-if="naDataDsc !=='DIRECT' ">
					<!--매출상세목록 자료가 존재할 경우만(Start)-->
					<div class="data_wrap" v-for="(slDtl, index) in slDtlList" :key="index">
						<div class="gray_box">
							<div class="list">

                                <em>{{slDtl.naWrsSclfnm}}</em>   <!--작목명(경제통합상품소분류명)/2021.09.02 추가-->

								<!--(resp)경제통합데이터구분코드가 'B03(경제통합 로컬푸드) or B04(경제통합 판매출하) 인 경우 =>> 경제통합상품세분류명/경제통합상품약어명/상품규격중량/경제통합상품단위코드명/경제통합상품포장코드명/경제통합상품규격단위코드명  -->	
								<template v-if="naDataDsc ==='B02' || naDataDsc ==='B03' || naDataDsc ==='B04' "> 	 	
									<div class="row">
										<span class="tit">(품명)</span><span>{{slDtl.naWrsDtcfnm}}</span>&nbsp;(&nbsp;{{slDtl.naWrsAbrNm}}&nbsp;)&nbsp;
									</div>  <!--경제통합상품세분류명/경제통합상품약어명-->

									<div class="row">
										<!-- <span class="tit">(수량)</span><span>{{slDtl.qt | numberFilter('0,0')}}<span class="bar">개</span></span> -->
										<span class="tit">(수량)</span><span>{{slDtl.qt | numberFilter('0,0')}}</span>
									</div>

									<div class="row">
										<span class="tit">(금액)</span><span>{{slDtl.am | numberFilter('0,0')}}<span class="bar">원</span></span>
									</div>

									<template v-if="(myfhsNaIntfDsc ==='BM001' || myfhsNaIntfDsc ==='XO001') "> 
										<div class="row">
											<span class="tit">(규격)</span><span>{{slDtl.wrsStdWt | numberFilter('0,0')}}&nbsp;&nbsp;{{slDtl.naWrsUntCnm}}</span>
										</div>  
									</template>

								</template>

								<!--(resp)경제통합데이터구분코드가 'D03(경제통합 농사작업) 인 경우 =>> 농기계작업명/방제작업구분명/밪에작업상세구분명 -->	
								<template v-if="naDataDsc ==='D03' "> 	
									<div class="row">
										<span class="tit">(농작업명)</span><span>{{slDtl.fmachWkDsnm}}</span>
									</div>
									<div class="row">
										<span class="tit">(방제작업)</span><span>{{slDtl.pvdsWkMethDsnm}}</span>
									</div>
									<div class="row">
										<span class="tit">(방제내용)</span><span>{{slDtl.pvdsWkDtlDsnm}}</span>
									</div>
								</template>
							</div>
						</div>
					</div>
					<!--매출상세목록 자료가 존재할 경우만(End)-->
				</template>

				<div class="com_textarea_type01 ani-active com_no_iconstar">
					<!-- <textarea name="" id="txt10" class="com_txtarea_type02" cols="10" rows="5" maxlength="300" required placeholder="메모를 입력하세요." v-model="memoCntn"></textarea>  -->
                    <textarea name="" id="txt10" class="com_txtarea_type02" :value="memoCntn" ref="memoCntn" @input="fn_checkWord($event,100, 'memoCntn')"  
								cols="10" rows="3" required placeholder="메모를 입력하세요."></textarea> 
					<label for="txt00"><span class="txt_label_x">메모</span></label>
				</div>				

				<!--입력4-작업메모(End)-->
			</div>
			<!--입력0(End)-->
        </div>
		<!--메인(Body)-->		

        <div class="popup_footer fixed">
			<div class="btn_half_box"> 
				<!--(param)거래구분코드 = U AND (resp)경제통합데이터구분코드 = DIRRECT -->
				<template v-if="prmTrDsc==='U' && naDataDsc==='DIRECT'">
					<a href="javascript:void(0);" class="btn btn_grey" v-on:click.prevent="applyDel()">삭제</a>
				</template>
				<template v-else>
					<a href="javascript:void(0);" class="btn btn_grey" v-on:click.prevent="reset('9')">취소</a>
				</template>
				<a href="javascript:void(0);" class="btn btn_mint" v-on:click.prevent="applyBtn()">저장</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" v-on:click.prevent="closePopup"><span class="blind">팝업닫기</span></a>	
	</div>
	<!--// full popup E -->
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import {keyupNumFormat} from '@/utils/number'
import {dateFormat} from '@/utils/date'
import apiService from '@/service/apiService'
import '@/service/apiService'
import {checkWord} from '@/utils/data'

import SZFR2105 from '@/views/page/SZ/FR/SZFR2105/SZFR2105'

export default {
    name : "SZFR2104",
    data: () => {
        return {
			objAreaInfo  : {},   //전달파라미터		
			
			//*Param 변수			
			prmTrDsc 	   : "", 	 //거래구분코드	
            prmNaWrsLclc   : "",     //경제통합상품대분류코드	 
            prmNaWrsMclc   : "",  	 //경제통합상품중분류코드	 
            prmNaWrsSclc   : "",   	 //경제통합상품소분류코드
			prmNaWrsSclfnm : "",     //상품분류명	
            prmCulplRgnC   : "",     //재배지지역코드 
			prmCulplRgnNm  : "",     //재배지지역명 			
			prmMyfhsNalntfDsc  : "", //마이농가경제통합인터페이스구분코드 
			prmNaDataDsc   : "",     //경제통합데이터구분코드 
			prmBrc         : "",   	 //사무소코드 			
			prmNaSlpno     : "",     //경제통합전표번호 
			prmWkDt        : "",  	 //영농일지작업일자 
			prmSqno        : "",   	 //영농일지일련번호 
			prmTrDt        : "", 	 //거래일자 
			
			//일반변수
			isbackYn 	 	: false, 	
			isTlTipYn    	: false, 	
			isRdonlyYn   	: false,
			selItem      	: "", 
			msg 		 	: "",
			restMsg 	 	: "",
			varNaWrs     	: "",		//경제통합상품코드(대중소) 
			
			currentYear  	: "",		//현재년	
			currentMonth 	: "",		//현재월
			currentDay   	: "",		//현재일
			varSqno      	: 0,		//일련번호
			shnHrCntn    	: "",		//일조시간내용
			//varNaLedUyn  	: "",		//경제통합원장사용여부	
			varbefWkDt		: "",		//이전작업일자

			tmpMaleOwhsHmrsWkHr : "",
			tmpWmnOwhsHmrsWkHr  : "", 
			tmpMaleEmplHmrsWkHr : "",
			tmpWmnEmplHmrsWkHr  : "",

			//리스트
			slDtlList    	: [], 	

			//가입력 필드
            hour1      		: "",   	//자가인력작업시간-시
			minute1    		: "",   	//자가인력작업시간-분
			hour2      		: "",   	//고용인력작업시간-시 
			minute2    		: "",   	//고용인력작업시간-분  
            hour3      		: "",   	//자가인력작업시간-시
			minute3    		: "",   	//자가인력작업시간-분
			hour4      		: "",   	//고용인력작업시간-시 
			minute4    		: "",   	//고용인력작업시간-분  

			//실입력 필드
			mydtCusno  		: "",   	//마이데이터고객번호
            title      		: "",   	//타이틀
            subTitle  		: "",   	//부제목
            naWrsLclc  		: "",   	//경제통합상품대분류코드
            naWrsMclc  		: "",   	//경제통합상품중분류코드
            naWrsSclc  		: "",   	//경제통합상품소분류코드
			naWrsAbrNm 		: "",   	//경제통합상품소분류명
			wkDt 	   		: "",   	//작업일자 //
			sqno      		: 0,      	//영농일지일련번호
            maleOwhsHmrsCn 	: "",		//남자자가인력수
            wmnOwhsHmrsCn  	: "",		//여자자가인력수
            owhsHmrsWkHr   	: "",		//자가인력작업시간

            maleOwhsHmrsWkHr : "",		//남자자가인력작업시간  
            wmnOwhsHmrsWkHr  : "",		//여자자가인력작업시간
			
            maleEmplHmrsCn 	: "",		//남자고용인력수
            wmnEmplHmrsCn  	: "",		//여자고용인력수
            emplHmrsWkHr   	: "",		//고용인력작업시간

            maleEmplHmrsWkHr : "",		//남자고용인력작업시간  
            wmnEmplHmrsWkHr  : "",		//여자고용인력작업시간

            areaCntn       	: "",		//면적내용
            memoCntn       	: "",		//메모내용
            mxTptrCntn     	: "",		//최고기온내용
            lowsTptrCntn   	: "",		//최저기온내용
            humidityCntn   	: "",		//습도내용
            rainfCntn      	: "",		//강수량내용
            weathIconC     	: "",		//기상코드
			weathCntn     	: "",		//기상상태명
			weathMapIconC   : "",	    //날씨아이콘코드
			weathMapCntn    : "",	    //날씨내용
			trDt            : "",	    //거래일자
			myfhsNaIntfDsc  : "",       //마이농가경제통합인터페이스구분코드
			brc             : "",	    //사무소코드
			naSlpno         : "",	    //경제통합전표번호
			fangWkDsnm      : "",	
			fangWknm        : "",
			naDataDsc       : "",
			//
			tmpType         : "",
            focusTf        : false,
			today : dateFormat(new Date(), "YYYY-MM-DD")
        }
    },

    mixins: [
		commonMixin,
        popupMixin
	],
	
    created() {
		const date        = new Date()

		this.currentYear  = date.getFullYear()   //현재년
		this.currentMonth = ("0" + (date.getMonth() +1)).slice(-2)  //현재월 00
		this.currentDay   = date.getDate()
	
		//this.wkDt  = dateFormat(date, 'YYYYMMDD')
    }, 

    mounted() {
		this.initComponent();

		//PFM로그 처리 화면접속이력 등록 POST(2021.07.21(수) 추가~/전체사항)
		apiService.pfmLogSend(this.$options.name)     
    },   
	methods: {
		initComponent() {
			this.objAreaInfo = this.params.objAreaInfo

			console.log('>>>>>>> [SZFR2104]initComponent(Start) <<<<<<<');			

            console.log('[SZFR2104]params.objAreaInfo=>> '+this.params.objAreaInfo);	
            console.log('[SZFR2104]objAreaInfo=>> '+this.objAreaInfo);	

			this.prmTrDsc 	    = this.objAreaInfo.trDsc;   	 //0.거래구분코드	
            this.prmNaWrsLclc   = this.objAreaInfo.naWrsLclc;    //1.경제통합상품대분류코드	 
            this.prmNaWrsMclc   = this.objAreaInfo.naWrsMclc;    //2.경제통합상품중분류코드	 
            this.prmNaWrsSclc   = this.objAreaInfo.naWrsSclc;    //3.경제통합상품소분류코드
			this.prmNaWrsSclfnm = this.objAreaInfo.naWrsSclfnm;  //4.상품분류명	
            this.prmCulplRgnC   = this.objAreaInfo.culplRgnC;    //5.재배지지역코드 
			this.prmCulplRgnNm  = this.objAreaInfo.culplRgnNm;   //6.재배지지역명 			
			this.prmMyfhsNalntfDsc  = this.objAreaInfo.myfhsNaIntfDsc;   //7.마이농가경제통합인터페이스구분코드 
			this.prmNaDataDsc   = this.objAreaInfo.naDataDsc;    //8.경제통합데이터구분코드 
			this.prmBrc         = this.objAreaInfo.brc;   	 	 //9.사무소코드 			
			this.prmNaSlpno     = this.objAreaInfo.naSlpno;   	 //10.경제통합전표번호 
			this.prmWkDt        = this.objAreaInfo.wkDt;   	 	 //11.영농일지작업일자 
			this.prmSqno        = this.objAreaInfo.sqno;   	 	 //12.영농일지일련번호 
			this.prmTrDt        = this.objAreaInfo.trDt;   	 	 //13.거래일자 		

            console.log('[SZFR2104](변수-Param)0.거래구분코드=>>'+this.prmTrDsc);	
            console.log('[SZFR2104](변수-Param)0.마이고객데이타고객번호=>>'+this.getUserInfo('mydtCusno'));	
            console.log('[SZFR2104](변수-Param)1.경제통합상품대분류코드=>>'+this.prmNaWrsLclc);	
            console.log('[SZFR2104](변수-Param)2.경제통합상품중분류코드=>>'+this.prmNaWrsMclc);	
            console.log('[SZFR2104](변수-Param)3.경제통합상품소분류코드=>>'+this.prmNaWrsSclc);	
            console.log('[SZFR2104](변수-Param)4.상품분류명=>>'+this.prmNaWrsSclfnm);	
            console.log('[SZFR2104](변수-Param)5.재배지지역코드=>>'+this.prmCulplRgnC);	
            console.log('[SZFR2104](변수-Param)6.재배지지역명=>>'+this.prmCulplRgnNm);	
            console.log('[SZFR2104](변수-Param)마이농가경제통합인터페이스구분코드=>>'+this.objAreaInfo.myfhsNaIntfDsc);	
            console.log('[SZFR2104](변수-Param)7.마이농가경제통합인터페이스구분코드=>>'+this.prmMyfhsNalntfDsc);	
            console.log('[SZFR2104](변수-Param)8.경제통합데이터구분코드=>>'+this.prmNaDataDsc);	
            console.log('[SZFR2104](변수-Param)9.사무소코드=>>'+this.prmBrc);	
            console.log('[SZFR2104](변수-Param)10.경제통합전표번호=>>'+this.prmNaSlpno);	
            console.log('[SZFR2104](변수-Param)11.영농일지작업일자=>>'+this.prmWkDt);	
            console.log('[SZFR2104](변수-Param)12.영농일지일련번호=>>'+this.prmSqno);	
            console.log('[SZFR2104](변수-Param)13.거래일자=>>'+this.prmTrDt);	

			this.varNaWrs = this.prmNaWrsLclc+this.prmNaWrsMclc+this.prmNaWrsSclc
            console.log('[SZFR2104](변수)경제통합상품(합)=>>'+this.varNaWrs);	

			console.log('>>>>>>> [SZFR2104]initComponent(End) <<<<<<<');			
			//
			this.getSearchList()
		},

		//'검색'
		getSearchList() {

            console.log('>>> [SZFR2104]getSearchList(Start) <<<');	

			const config = {
                url: '/sz/fr/03r02',
                //url : "/co/at/01r01",
                data: {
                    mydtCusno    : this.getUserInfo('mydtCusno'),  //마이고객데이타고객번호 = (변수)마이고객데이타고객번호
                    naWrsLclc    : this.prmNaWrsLclc,   //경제통합상품대분류코드 = (변수)경제통합상품대분류코드
                    naWrsMclc    : this.prmNaWrsMclc,   //경제통합상품중분류코드 = (변수)경제통합상품중분류코드
                    naWrsSclc    : this.prmNaWrsSclc,   //경제통합상품소분류코드 = (변수)경제통합상품소분류코드
                    naDataDsc    : this.prmNaDataDsc,   //경제통합데이터구분코드 = (변수)
					trDt         : this.prmTrDt, 	    //거래일자 = (변수)거래일자
					myfhsNaIntfDsc : this.prmMyfhsNalntfDsc,  //마이농가경제통합인터페이스구분코드 = (변수)마이농가경제통합인터페이스구분코드
                    brc 		 : this.prmBrc, 		//사무소코드 = (변수)사무소코드
					naSlpno		 : this.prmNaSlpno, 	//경제통합전표번호 = (변수)경제통합전표번호
					wkDt 	  	 : this.prmWkDt,  	    //영농일지작업일자 = (변수)영농일지작업일자
					sqno 		 : this.prmSqno  		//영농일지일련번호 = (변수)영농일지일련번호
                }
            } 
            apiService.call(config).then(response => {

				console.log("[SZFR2104]getSearchList/response=>> "+response)

                this.mydtCusno  = response.mydtCusno;	        //마이데이터고객번호
				this.fangWkDsnm = response.title;	            //영농작업구분명<<-타이틀
				this.fangWknm   = (response.subtitle === null)?"":response.subtitle;     //영농작업명<<-부제목

				console.log('[SZFR2104](변수)마이데이터고객번호=>> '+this.mydtCusno);	
				console.log('[SZFR2104](입력)영농작업구분명(타이틀)=>> '+this.fangWkDsnm);	
				console.log('[SZFR2104](입력)영농작업명(부제목)=>> '+this.fangWknm);	

				this.naWrsLclc    = response.naWrsLclc;	        //경제통합상품대분류코드
                this.naWrsMclc    = response.naWrsMclc;  	    //경제통합상품중분류코드
                this.naWrsSclc    = response.naWrsSclc;	        //경제통합상품소분류코드
				this.naWrsSclfnm  = response.naWrsSclfnm;	    //경제통합상품소분류명

				console.log('[SZFR2104](입력)경제통합상품(대/중/소)=>> '+this.naWrsLclc, this.naWrsMclc, this.naWrsSclc);	
				console.log('[SZFR2104](입력)경제통합상품소분류명=>> '+this.nnaWrsSclfnm);	

				this.wkDt   	  = dateFormat(response.wkDt, 'YYYY-MM-DD')  //작업일자
				this.varbefWkDt	  = dateFormat(response.wkDt, 'YYYYMMDD')  //(변수)이전작업일자 = response.작업일자
				this.sqno         = response.sqno;	            //일련번호*

				console.log('[SZFR2104]/(입력)작업일자=>> '+this.wkDt);	
				console.log('[SZFR2104]/(변수)이전작업일자=>> '+this.varbefWkDt);	
				console.log('[SZFR2104]/(입력)일련번호=>> '+this.sqno);	

				//*------------------------	

                console.log('[SZFR2104]/(resp)남자자가인력수=>> '+response.maleOwhsHmrsCn);	
                this.maleOwhsHmrsCn = (response.maleOwhsHmrsCn ==='')?'0':response.maleOwhsHmrsCn   //남자자가인력수
				this.maleOwhsHmrsWkHr = response.maleOwhsHmrsWkHr;    //남자자가인력작업시분

				console.log('[SZFR2104]/(입력)남자자가인력수=>> '+this.maleOwhsHmrsCn);	
				console.log('[SZFR2104]/(입력)남자자가인력작업시분=>> '+this.maleOwhsHmrsWkHr);	

				this.tmpMaleOwhsHmrsWkHr = this.maleOwhsHmrsWkHr.split(":").join("")
				this.hour1   = (this.tmpMaleOwhsHmrsWkHr.substr(0,2)==='00')?'00':this.tmpMaleOwhsHmrsWkHr.substr(0,2)     //자가입력시간(남)-시
				//this.hour1   = (Number(this.hour1) === 0)?0:Number(this.hour1)	  
				this.minute1 = (this.tmpMaleOwhsHmrsWkHr.substr(2,2)==='00')?'00':this.tmpMaleOwhsHmrsWkHr.substr(2,2)     //자가입력시간(남)-분
				//this.minute1 = (Number(this.minute1) === 0)?0:Number(this.minute1)	

				console.log('[SZFR2104]/(변수)자가인력작업시간(남)=>> '+this.tmpMaleOwhsHmrsWkHr);	
				console.log('[SZFR2104]/(변수)자가입력시간(남)-시=>> '+this.hour1);	
				console.log('[SZFR2104]/자가입력시간(남)-분=>> '+this.minute1);	

				//*
				console.log('[SZFR2104]/(resp)여자자가인력수=>> '+response.wmnOwhsHmrsCn);	
                this.wmnOwhsHmrsCn = (response.wmnOwhsHmrsCn ==='')?'0':response.wmnOwhsHmrsCn   //여자자가인력수
				this.wmnOwhsHmrsWkHr = response.wmnOwhsHmrsWkHr;    //여자자가인력작업시분

				console.log('[SZFR2104]/(입력)여자자가인력수=>> '+this.wmnOwhsHmrsCn);	
				console.log('[SZFR2104]/(입력)여자자가인력작업시분=>> '+this.wmnOwhsHmrsWkHr);	

				this.tmpWmnOwhsHmrsWkHr = this.wmnOwhsHmrsWkHr.split(":").join("")
				this.hour2   = (this.tmpWmnOwhsHmrsWkHr.substr(0,2)==='00')?'00':this.tmpWmnOwhsHmrsWkHr.substr(0,2)     //자가입력시간(남)-시
				//this.hour2   = (Number(this.hour2) === 0)?0:Number(this.hour2)	  
				this.minute2 = (this.tmpWmnOwhsHmrsWkHr.substr(2,2)==='00')?'00':this.tmpWmnOwhsHmrsWkHr.substr(2,2)     //자가입력시간(남)-분
				//this.minute2 = (Number(this.minute2) === 0)?0:Number(this.minute2)	

				console.log('[SZFR2104]/(변수)자가인력작업시간(여)=>> '+this.tmpWmnOwhsHmrsWkHr);	
				console.log('[SZFR2104]/(변수)자가입력시간(여)-시=>> '+this.hour2);	
				console.log('[SZFR2104]/자가입력시간(여)-분=>> '+this.minute2);	

				//*
				console.log('[SZFR2104]/(resp)남자자가인력수=>> '+response.maleEmplHmrsCn);	
                this.maleEmplHmrsCn = (response.maleEmplHmrsCn ==='')?'0':response.maleEmplHmrsCn   //남자자가인력수
				this.maleEmplHmrsWkHr = response.maleEmplHmrsWkHr;    //여자자가인력작업시분

				console.log('[SZFR2104]/(입력)남자자가인력수=>> '+this.maleEmplHmrsCn);	
				console.log('[SZFR2104]/(입력)남자고용인력작업시분=>> '+this.maleEmplHmrsWkHr);	

				this.tmpMaleEmplHmrsWkHr = this.maleEmplHmrsWkHr.split(":").join("")
				this.hour3   = (this.tmpMaleEmplHmrsWkHr.substr(0,2)==='00')?'00':this.tmpMaleEmplHmrsWkHr.substr(0,2)     //고용입력시간(남)-시
				//this.hour3  = (Number(this.hour3) === 0)?0:Number(this.hour3)	  
				this.minute3 = (this.tmpMaleEmplHmrsWkHr.substr(2,2)==='00')?'00':this.tmpMaleEmplHmrsWkHr.substr(2,2)     //고용입력시간(남)-분
				//this.minute3 = (Number(this.minute3) === 0)?0:Number(this.minute3)	

				console.log('[SZFR2104]/(변수)고용인력작업시분(남)=>> '+this.tmpMaleEmplHmrsWkHr);	
				console.log('[SZFR2104]/(변수)고용입력시간(남)-시=>> '+this.hour3);	
				console.log('[SZFR2104]/고용입력시간(남)-분=>> '+this.minute3);	

				//*
				console.log('[SZFR2104]/(resp)여자고용인력수=>> '+response.wmnEmplHmrsCn);	

                this.wmnEmplHmrsCn = (response.wmnEmplHmrsCn ==='')?'0':response.wmnEmplHmrsCn   //여자고용인력수
				this.wmnEmplHmrsWkHr = response.wmnEmplHmrsWkHr;    //여자고용인력작업시분

				console.log('[SZFR2104]/(입력)여자고용인력수=>> '+this.wmnEmplHmrsCn);	
				console.log('[SZFR2104]/(입력)여자고용인력작업시분=>> '+this.wmnEmplHmrsWkHr);	

				this.tmpWmnEmplHmrsWkHr = this.wmnEmplHmrsWkHr.split(":").join("")
				this.hour4   = (this.tmpWmnEmplHmrsWkHr.substr(0,2)==='00')?'00':this.tmpWmnEmplHmrsWkHr.substr(0,2)     //고용입력시간(여)-시
				//this.hour4  = (Number(this.hour4) === 0)?0:Number(this.hour4)	  
				this.minute4 = (this.tmpWmnEmplHmrsWkHr.substr(2,2)==='00')?'00':this.tmpWmnEmplHmrsWkHr.substr(2,2)     //고용입력시간(여)-분
				//this.minute4 = (Number(this.minute4) === 0)?0:Number(this.minute4)	

				console.log('[SZFR2104]/(변수)고용인력작업시분(여)=>> '+this.tmpWmnEmplHmrsWkHr);	
				console.log('[SZFR2104]/(변수)고용입력시간(여)-시=>> '+this.hour4);	
				console.log('[SZFR2104]/고용입력시간(여)-분=>> '+this.minute4);	

				//*
				this.areaCntn   = (response.areaCntn === null)?'':response.areaCntn    //면적내용
				this.memoCntn   = (response.memoCntn === null)?'':response.memoCntn    //메모내용

				console.log('[SZFR2104](입력)면적내용=>> '+this.areaCntn);	
				console.log('[SZFR2104](입력)메모내용=>> '+this.memoCntn);	

				console.log('[SZFR2104](resp)최고기온내용1=>> '+response.mxTptrCntn);	
				console.log('[SZFR2104](resp)최저기온내용1=>> '+response.lowsTptrCntn);	
				console.log('[SZFR2104](resp)습도내용1=>> '+response.humidityCntn);	
				console.log('[SZFR2104](resp)강수량내용1=>> '+response.rainfCntn);	

                this.mxTptrCntn   = (response.mxTptrCntn !== null)?response.mxTptrCntn+'˚': '-';   //최고기온내용
                this.lowsTptrCntn = (response.lowsTptrCntn !== null)?response.lowsTptrCntn+'˚': '-';   //최저기온내용
                this.humidityCntn = (response.humidityCntn !== null)?response.humidityCntn+'%' : '-';  //습도내용
                this.rainfCntn    = (response.rainfCntn !== null)?response.rainfCntn+'mm' : '-';	  //강수량내용

				console.log('[SZFR2104](입력)최고기온내용=>> '+this.mxTptrCntn);	
				console.log('[SZFR2104](입력)최저기온내용=>> '+this.lowsTptrCntn);	
				console.log('[SZFR2104](입력)습도내용=>> '+this.humidityCntn);	
				console.log('[SZFR2104](입력)강수량내용=>> '+this.rainfCntn);	

				//2021.10.28(목) 변경
				this.prmCulplRgnC    = response.culplRgnC;	     //재배지지역코드
				this.prmCulplRgnNm     = response.culpJuso;	     //재배지주소
				//2021.10.28(목) 변경

				console.log('[SZFR2104](입력)재배지지역코드=>> '+this.prmCulplRgnC);	
				console.log('[SZFR2104](입력)재배지주소=>> '+this.prmCulplRgnNm);	

				this.weathIconC    = response.weathCd;	    //기상코드
				this.weathCntn     = response.weathStsNm;	//기상상태명
				this.weathMapIconC = response.weathCd; //기상매핑코드
				this.weathMapCntn  = response.weathStsNm;  //기상상태매핑명

				console.log('[SZFR2104](입력)기상코드=>> '+this.weathIconC);	
				console.log('[SZFR2104](입력)기상상태명=>> '+this.weathCntn);	
				console.log('[SZFR2104]기상매핑코드=>> '+this.weathMapIconC);	
				console.log('[SZFR2104]기상상태매핑명=>> '+this.weathMapCntn);	

				this.naDataDsc = (response.naDataDsc ==='')?'':response.naDataDsc;	//경제통합데이터구분코드
				console.log('[SZFR2104](입력)경제통합데이터구분코드=>> '+this.naDataDsc);	
				
				//경제통합데이터구분코드가 'DIRECT'가 아닌  경우에~
				if (response.naDataDsc !== "DIRECT" && response.naDataDsc !== null) {
					this.trDt      = (response.trDt ==='')?'':response.trDt.split("-").join("");	   //거래일자
					this.myfhsNaIntfDsc = (response.myfhsNaIntfDsc ==='')?'':response.myfhsNaIntfDsc;  //마이농가경제통합인터페이스구분코드
					this.brc       = (response.brc ==='')?'':response.brc;	          //사무소코드
					this.naSlpno   = (response.naSlpno ==='')?'':response.naSlpno;	 //경제통합전표번호

					console.log('[SZFR2104](입력)거래일자=>> '+this.trDt);	
					console.log('[SZFR2104](입력)마이농가경제통합인터페이스구분코드=>> '+this.myfhsNaIntfDsc);	
					console.log('[SZFR2104](입력)사무소코드=>> '+this.brc);	
					console.log('[SZFR2104](입력)경제통합전표번호=>> '+this.naSlpno);	
				}
				
				this.slDtlList = (response.slDtlList === undefined)?'':response.slDtlList || []; //거래상세목록 조회
				console.log("[SZFR2104]slDtlList/거래상세목록 조회 =>>"+JSON.stringify(this.slDtlList))	

            });    

           console.log('>>> [SZFR2104]getSearchList(End) <<<');	

        },

		//[삭제]버튼 선택
		applyDel(){

			this.msg = '영농일지를 삭제하시겠습니까?'
			const config = {
				content: [this.msg],
				title  : "",
			}
			modalService.confirm(config).then(text => {

				if(text == "예") {
					const config = {
						url : "/sz/fr/03s01",
						data : {
							trDsc 	       : 'D',     				//*필수-거래구분코드(C:등록,U:수정,D:삭제)
							naDataDsc      : this.naDataDsc,        //*필수-경제통합데이터구분코드
							mydtCusno      : this.getUserInfo('mydtCusno'),     //*필수-마이데이터고객번호
							wkDt 	       : dateFormat(this.wkDt, 'YYYYMMDD'),	//*필수-영농일지작업일자	 
							befWkDt        : (this.naDataDsc === "DIRECT")?this.varbefWkDt:'', //이전작업일자(DIRECT 수정시만 필수)
							sqno 	       : this.sqno,	  			//*영농일지일련번호(업구분명이 DIRECT(영농일지 직접등록)인 경우는, 0값을 저장) = (변수)일련번호 0
						}
					}
					console.log("[SZFR2104]applyDel/config=>> "+config)

					apiService.call(config).then(response => {
					
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

		},

		//[취소]버튼 클릭
        reset(flag) {
			this.selItem = flag

			if (this.selItem === '9' ) {   
				this.restMsg = '영농일지 상세'
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
			} else  if (this.selItem === '0' ) {  
				this.close('complete')
			}
		},
		
		//[닫기]버튼 클릭
        closePopup() {
            //this.close("cancel");

			this.reset('0')

        },

		//[저장]버튼 클릭
        applyBtn() {

			//*** validation 체크
			if (this.fangWkDsnm.length == 0 || this.fangWkDsnm.trim() == "") {
               modalService.alert("작업명은 필수입력항목입니다.").then(() => {
					this.$refs.fangWkDsnm.focus()
				});
               return;
			}

			if (this.fangWknm.length == 0 || this.fangWknm.trim() == "") {
				modalService.alert("상세작업명은 필수입력항목입니다.").then(() => {
					this.$refs.fangWknm.focus()
				})
				return;
			}

			if (this.naDataDsc === 'T' ) { //직접입력(DIRECT)인 경우

				if (this.wkDt.length == 0 || this.wkDt.trim() == "") {
					modalService.alert("작업일자는 필수입력항목입니다.").then(() => {
						this.$refs.wkDt.focus()
					});
					return;
				}

				if (!this.isDateValid(this.wkDt)) {
					modalService.alert("작업일자의 날짜형식을 확인바랍니다.").then(() => {
						this.$refs.wkDt.focus()
					});
				return;
				}

				if (Number(dateFormat(new Date, 'YYYYMMDD')) < Number(dateFormat(this.wkDt, 'YYYYMMDD'))) {
					modalService.alert("작업일자는 현재일과 동일하거나, 적어야 합니다.").then(() => {
						this.$refs.wkDt.focus()
					});
					return;
				}			
			}

			//남자자가인력수(남)
			if (this.maleOwhsHmrsCn.length === 0) {
				this.maleOwhsHmrsCn = "00"  
			} 

			if (this.hour1.length === 1) {
				this.hour1 = ("0" + this.hour1 ).slice(-2)
			} else if (this.hour1.length === 0) {
				this.hour1 = "00"
			} 
			
			if (this.minute1.length === 1) {
				this.minute1 = ("0" + this.minute1).slice(-2)  //자가인력작업시간(남자)
			} else if (this.minute1.length === 0) {
				this.minute1 = "00"
			// } else {
			// 	this.maleOwhsHmrsWkHr = this.hour1+":"+this.minute1 //자가인력작업시간(남자)
			}
			this.maleOwhsHmrsWkHr = this.hour1+":"+this.minute1 //자가인력작업시간(남자)

			//자가인력작업시간(여)
			if (this.wmnOwhsHmrsCn === 0) {
				this.wmnOwhsHmrsCn = "00"  //자가인력작업시간 =  (변수)시간+(변수)분
			}
			
			if (this.hour2.length === 1) {
				this.hour2 = ("0" + this.hour2 ).slice(-2)
			} else if (this.hour2.length === 0) {
				this.hour2 = "00"
			} 
			
			if (this.minute2.length === 1) {
				this.minute2 = ("0" + this.minute2).slice(-2)  //자가인력작업시간(남자)
			} else if (this.minute2.length === 0) {
				this.minute2 = "00"  
			// } else {
			// 	this.wmnOwhsHmrsWkHr = this.hour2+":"+this.minute2 //자가인력작업시간(남자)
			}
			this.wmnOwhsHmrsWkHr = this.hour2+":"+this.minute2 //자가인력작업시간(남자)

			//고용인력수(남)
			if (this.maleEmplHmrsCn === 0) {
				this.maleEmplHmrsCn = "00"  //자가인력작업시간 =  (변수)시간+(변수)분
			}

			if (this.hour3.length === 1) {
				this.hour3 = ("0" + this.hour3 ).slice(-2)
			}else if (this.hour3.length === 0) {
				this.hour3 = "00"
			} 
			
			if (this.minute3.length === 1) {
				this.minute3 = ("0" + this.minute3).slice(-2)  //자가인력작업시간(남자)
			} else if (this.minute3.length === 0) {
				this.minute3 = "00"
			// } else {
			// 	this.maleEmplHmrsWkHr = this.hour3+":"+this.minute3 //자가인력작업시간(남자)
			}
			this.maleEmplHmrsWkHr = this.hour3+":"+this.minute3 //자가인력작업시간(남자)

			//고용인력수(여)
			if (this.wmnEmplHmrsCn === 0) {
				this.wmnEmplHmrsCn = "00"  //자가인력작업시간 =  (변수)시간+(변수)분
			} 

			if (this.hour4.length === 1) {
				this.hour4 = ("0" + this.hour4 ).slice(-2)
			} else if (this.hour4.length === 0) {
				this.hour4 = "00"
			} 
			
			if (this.minute4.length === 1) {
				this.minute4 = ("0" + this.minute4).slice(-2)  //자가인력작업시간(남자)
			} else if (this.minute4.length === 0) {
				this.minute4 = "00"
			// } else {
			// 	this.wmnEmplHmrsWkHr = this.hour4+":"+this.minute4 //자가인력작업시간(남자)
			}
			this.wmnEmplHmrsWkHr = this.hour4+":"+this.minute4 //자가인력작업시간(남자)

			const config = {
				url : "/sz/fr/03s01",
				data : {
					trDsc 	       : this.prmTrDsc,        //*필수-거래구분코드(C:등록,U:수정,D:삭제)
					naDataDsc      : this.naDataDsc,       //*필수-경제통합데이터구분코드 = (param변수)경제통합데이터구분코드
					mydtCusno      : this.getUserInfo('mydtCusno'),        //*필수-마이데이터고객번호
					wkDt 	       : dateFormat(this.wkDt, 'YYYYMMDD'),	   //*필수-영농일지작업일자 = (입력)작업일자
					befWkDt	       : this.varbefWkDt, 	   //*필수-영농일지이전작업일자 = (변수)영농일지이전작업일자
					sqno 	       : (this.prmTrDsc !== "U")?0:this.sqno,  //*필수-영농일지일련번호(업구분명이 DIRECT(영농일지 직접등록)인 경우는, 0값을 저장) = (변수)일련번호 0
					naWrsLclc      : this.naWrsLclc,       //상품분류코드(대분류) = (입력)상품분류코드(대분류)
					naWrsMclc      : this.naWrsMclc,       //상품분류코드(중분류) = (입력)상품분류코드(중분류)
					naWrsSclc      : this.naWrsSclc,       //상품분류코드(소분류) = (입력)상품분류코드(소분류)
					fangWkDsnm     : this.fangWkDsnm, 	   //영농작업구분명   = (입력)영농작업구분명
					fangWknm       : this.fangWknm, 	   //영농작업명       = (입력)영농작업명
					maleOwhsHmrsCn   : this.maleOwhsHmrsCn, 	//남자자가인력수   = (변수)남자자가인력수
					wmnOwhsHmrsCn    : this.wmnOwhsHmrsCn,      //여자자가인력수   = (변수)여자자가인력수
					maleOwhsHmrsWkHr : this.maleOwhsHmrsWkHr,   //남자자가인력작업시분
					wmnOwhsHmrsWkHr  : this.wmnOwhsHmrsWkHr,    //여자자가인력작업시분
					maleEmplHmrsCn   : this.maleEmplHmrsCn, 	//남자고용인력수   = (변수)남자고용인력수
					wmnEmplHmrsCn    : this.wmnEmplHmrsCn,  	//여자고용인력수   = (변수)여자고용인력수
					maleEmplHmrsWkHr : this.maleEmplHmrsWkHr,   //남자고용인력작업시분
					wmnEmplHmrsWkHr  : this.wmnEmplHmrsWkHr,    //여자고용인력작업시분
					areaCntn       : this.areaCntn,        //면적내용        = (입력)면적내용
					memoCntn       : this.memoCntn,        //메모내용        = (입력)메모내용
					naLedUyn       : (this.naDataDsc === "DIRECT")?"0":"1",   //경제통합원장사용여부(업구분명이 DIRECT(영농일지 직접등록)인 경우는 0(미사용)값을 저장) = (변수)경제통합원장사용여부 0
					culplRgnC      : this.prmCulplRgnC,    //재배지지역코드(입력) = (변수)재배지지역코드
					trDt           : (this.naDataDsc !== "DIRECT")?this.trDt.toString().split("-").join(""):"",  //거래일자
					myfhsNaIntfDsc : (this.naDataDsc !== "DIRECT")?this.myfhsNaIntfDsc:"", //마이농가경제통합인터페이스구분코드
					brc            : (this.naDataDsc !== "DIRECT")?this.brc:"",            //사무소코드
					naSlpno        : (this.naDataDsc !== "DIRECT")?this.naSlpno:"",        //경제통합전표번호
				}
			}
			apiService.call(config).then(response => {
				if (response.rspC == '0000') { 
					modalService.alert("자료가 저장(수정) 완료되었습니다.").then(() => {
						this.closeAll('complete')
					})
				} else {
					modalService.alert("자료 저장(수정)시, 오류가 발생하였습니다.")
				}	 
			})

        },

		//입력 텍스트 삭제
        delStr(colNm) {

			if (colNm == "fangWknm") {
				this.fangWknm = ''   //상세 작업명
				
			} else if (colNm == "maleOwhsHmrsCn") {
				this.maleOwhsHmrsCn = ''   //자가인력-남자고용인력수

			} else if (colNm == "wmnOwhsHmrsCn") {
				this.wmnOwhsHmrsCn = ''    //자가인력-여자고용인력수

			} else if (colNm == "maleEmplHmrsCn") {
				this.maleEmplHmrsCn = ''   //고용인력-남자고용인력수

			} else if (colNm == "wmnEmplHmrsCn") {
				this.wmnEmplHmrsCn = ''    //고용인력-여자고용인력수

			} else if (colNm == "areaCntn") {
				this.areaCntn = ''   //작업면적
				this.$refs.areaCntn.focus()

			} else if (colNm == "memoCntn") {
				this.memoCntn = ''   //메모내용
			} 

        },
		
		isDateValid(chkDt){ // 날짜체크(날짜형식 및 현재날짜 이후인지)

				//날짜 형식 변경으로 인하여 변경함
				let chkDt2 = this.removeDot(chkDt).toString().split("-").join("")
				
                let year = Number(chkDt2.substr(0,4))
                let month = Number(chkDt2.substr(4,2))
                let day = Number(chkDt2.substr(6,2))
                let today = new Date()
                let currentYear = today.getFullYear()

                if (chkDt2.length <= 8)
                {
                    if ( 2000 > year || year > currentYear )
                    {
                        return false
                    }

                    if ( 1 > month || month > 12 )
                    {
                        return false
                    }

                    if ( 1 > day || day > 31 )
                    {
                        return false
                    }

                    if ((month == 4 || month == 6 || month == 9 || month == 11) && day ==31)
                    {
                        return false
                    }

                    if(month ==2)
                    {
                        //윤달
                        let isleep = (year%4==0 && (year%100 !=0 || year%400 ==0))
                         if ( day > 29 || (day==29 && !isleep) )
                        {
                            return false
                        }
                    }
                    return true
                }else{
                    return false
                }
		},
		
		//금액 단위 , 표시
        addComma(str) {
            switch(str) {
                case "maleOwhsHmrsCn" :   //자가인력-남
                    if(this.maleOwhsHmrsCn.length == 1 && this.maleOwhsHmrsCn == 0) {
                        this.maleOwhsHmrsCn = this.maleOwhsHmrsCn.slice(0, -1)
                    } else {
                        this.maleOwhsHmrsCn = this.maleOwhsHmrsCn.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.maleOwhsHmrsCn = this.maleOwhsHmrsCn.split(",").join("")
                        this.maleOwhsHmrsCn = keyupNumFormat(this.maleOwhsHmrsCn)
                    }
					break
					
                case "wmnOwhsHmrsCn" :   //자가인력-여
                    if(this.wmnOwhsHmrsCn.length == 1 && this.wmnOwhsHmrsCn == 0) {
                        this.wmnOwhsHmrsCn = this.wmnOwhsHmrsCn.slice(0, -1)
                    } else {
                        this.wmnOwhsHmrsCn = this.wmnOwhsHmrsCn.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.wmnOwhsHmrsCn = this.wmnOwhsHmrsCn.split(",").join("")
                        this.wmnOwhsHmrsCn = keyupNumFormat(this.wmnOwhsHmrsCn)
                    }
					break
                case "maleEmplHmrsCn" :   //고용인력-남
                    if(this.maleEmplHmrsCn.length == 1 && this.maleEmplHmrsCn == 0) {
                        this.maleEmplHmrsCn = this.maleEmplHmrsCn.slice(0, -1)
                    } else {
                        this.maleEmplHmrsCn = this.maleEmplHmrsCn.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.maleEmplHmrsCn = this.maleEmplHmrsCn.split(",").join("")
                        this.maleEmplHmrsCn = keyupNumFormat(this.maleEmplHmrsCn)
                    }
					break
					
                case "wmnEmplHmrsCn" :   //고용인력-여
                    if(this.wmnEmplHmrsCn.length == 1 && this.wmnEmplHmrsCn == 0) {
                        this.wmnEmplHmrsCn = this.wmnOwhsHmrsCn.slice(0, -1)
                    } else {
                        this.wmnEmplHmrsCn = this.wmnEmplHmrsCn.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.wmnEmplHmrsCn = this.wmnEmplHmrsCn.split(",").join("")
                        this.wmnEmplHmrsCn = keyupNumFormat(this.wmnEmplHmrsCn)
                    }
					break
                case "areaCntn" :   //작업면적
                    if(this.areaCntn.length == 1 && this.areaCntn == 0) {
                        this.areaCntn = this.areaCntn.slice(0, -1)
                    } else {
                        this.areaCntn = this.areaCntn.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.areaCntn = this.areaCntn.split(",").join("")
                        this.areaCntn = keyupNumFormat(this.areaCntn)
                    }
					break					
			}
        },		

		//[작업설정] Slide 선택시
		fn_openSlidePop(e) {

			const config = {
				params: { // 파라미터
					naWrsLclc      : this.prmNaWrsLclc, 	//상품분류코드(대분류) = (param)상품분류코드(대분류)
					naWrsMclc      : this.prmNaWrsMclc, 	//상품분류코드(중분류) = (param)상품분류코드(중분류)
					naWrsSclc      : this.prmNaWrsSclc, 	//상품분류코드(소분류) = (param)상품분류코드(소분류)
					culplRgnC      : this.prmCulplRgnC,     //재배지지역코드 = (param)재배지지역코드
                 },

                 renderer : {
                      component : SZFR2105 //작업설정 POP
                 }
             };

             modalService.openSlidePagePopup(config).then(response => {

				this.fangWkDsnm = response.fangWkDsnm   //(입력필드)영농작업구분명 = response.영농작업구분명
				this.fangWknm 	= response.fangWkDsExpl	//(입력필드)영농작업구분설명 = response.영농작업구분설명

				// 다음 항목 이동
				this.$nextTick(()=>{
					if(e !== null) this.moveNextTag(e)
				})

             })

		},

		//[날씨정보 툴팁열기] 클릭시
		toolTipOpenPopup() {

			this.isTlTipYn = true
		},

		//[날씨정보 툴팁닫기] 클릭시
		toolTipClosePopup() {

			this.isTlTipYn = false
		},

		// 시분 체크
		fn_hourMinuteCheck(str, flag) {

			let Msg_cn     = "1명부터 999명까지 입력이 가능합니다. 재입력 바랍니다."
			let Msg_hour   = "1시간부터 24시간이전을 초과 입력할 수 없습니다. 재입력 바랍니다."
			let Msg_minute = "00분에서 59분이후를 초과 입력할 수 없습니다. 재입력 바랍니다."

			if (flag === "0") {

				if (str === "maleOwhsHmrsCn") {

					this.maleOwhsHmrsCn = this.maleOwhsHmrsCn.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.maleOwhsHmrsCn) > 999) {
						this.alert("자가인력(남)-명은 "+Msg_cn).then(()=>{
							this.maleOwhsHmrsCn = ""
							this.$refs.maleOwhsHmrsCn.focus()
						})
						return false
					}  

				} else if (str === "wmnOwhsHmrsCn") {

					this.wmnOwhsHmrsCn = this.wmnOwhsHmrsCn.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.wmnOwhsHmrsCn) > 999) {
						this.alert("자가인력(여)-명은 "+Msg_cn).then(()=>{
							this.wmnOwhsHmrsCn = ""
							this.$refs.wmnOwhsHmrsCn.focus()
						})
						return false
					}  

				} else if (str === "maleEmplHmrsCn") {

					this.maleEmplHmrsCn = this.maleEmplHmrsCn.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.maleEmplHmrsCn) > 999) {
						this.alert("고용인력(남)-명은 "+Msg_cn).then(()=>{
							this.maleEmplHmrsCn = ""
							this.$refs.maleEmplHmrsCn.focus()
						})
						return false
					}  

				} else if (str === "wmnEmplHmrsCn") {

					this.wmnEmplHmrsCn = this.wmnEmplHmrsCn.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.wmnEmplHmrsCn) > 999) {
						this.alert("고용인력(여)-명은 "+Msg_cn).then(()=>{
							this.wmnEmplHmrsCn = ""
							this.$refs.wmnEmplHmrsCn.focus()
						})
						return false
					}  
				} 
				
			} else if (flag === "1") {   //시

				if (str === "hour1") {

					this.hour1 = this.hour1.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.hour1) > 24) {
						this.alert("자가인력(남)-시간은 "+Msg_hour).then(()=>{
							this.hour1 = ""
							this.$refs.hour1.focus()
						})
						return false
					}  

				} else if (str === "hour2") {

					this.hour2 = this.hour2.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.hour2) > 24) {
						this.alert("자가인력(여)-시간은 "+Msg_hour).then(()=>{
							this.hour2 = ""
							this.$refs.hour2.focus()
						})
						return false
					}  

				} else if (str === "hour3") {

					this.hour3 = this.hour3.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.hour3) > 24) {
						this.alert("고용인력(남)-시간은 "+Msg_hour).then(()=>{
							this.hour3 = ""
							this.$refs.hour3.focus()
						})
						return false
					}  

				} else if (str === "hour4") {

					this.hour4 = this.hour4.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.hour4) > 24) {
						this.alert("고용인력(여)-시간은 "+Msg_hour).then(()=>{
							this.hour4 = ""
							this.$refs.hour4.focus()
						})
						return false
					}  
				} 

			} else if (flag === "2") {   //분

				if (str === "minute1") {

					this.minute1 = this.minute1.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.minute1) > 59) {
						this.alert("자가인력(남)-분은 "+Msg_minute).then(()=>{
							this.minute1 = ""
							this.$refs.minute1.focus()
						})
						return false
					}  

				} else if (str === "minute2") {
					this.minute2 = this.minute2.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.minute2) > 59) {
						this.alert("자가인력(여)-분은 "+Msg_minute).then(()=>{
							this.minute2 = ""
							this.$refs.minute2.focus()
						})
						return false
					}

				} else if (str === "minute3") {
					this.minute3 = this.minute3.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.minute3) > 59) {
						this.alert("고용인력(남)-분은 "+Msg_minute).then(()=>{
							this.minute3 = ""
							this.$refs.minute3.focus()
						})
						return false
					}

				} else if (str === "minute4") {
					this.minute4 = this.minute4.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.minute4) > 59) {
						this.alert("고용인력(여)-분은 "+Msg_minute).then(()=>{
							this.minute4 = ""
							this.$refs.minute4.focus()
						})
						return false
					}
				}	
			}		
		},

		fn_checkWord(event, maxByte, str) {

			if (str === "fangWknm") {  //상세작업명	
				let rtnObj = checkWord(event.target.value, maxByte)

				if(rtnObj.flag) {this.$refs.fangWknm.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.fangWknm = event.target.value
			} else if (str === "memoCntn") {  //메모	
				let rtnObj = checkWord(event.target.value, maxByte)

				if(rtnObj.flag) {this.$refs.memoCntn.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.memoCntn = event.target.value
			}
		},

		fn_popupCalendar(evt) {
            
            let config = {
				pDate	: evt.target.value, //this.wkDt,
				minDate : '',
				maxDate : this.today

			}
            modalService.calendarPopup(config).then(response => {
                
                if(response !== undefined && response !== null && response !== '')
                {
					evt.target.value = dateFormat(response, "YYYY-MM-DD")
					this.wkDt = evt.target.value

					this.fn_abc(evt)
					this.moveNextTag(evt)
                }            
            })

        },		

		fn_abc(e)
		{
             console.log(">>> [SZFR2104]fn_abc() <<<")  

			//this.ymd = this.currentYear+""+this.currentMonth+""+this.currentDay

			let changeDt = e.target.value
			changeDt = changeDt.split("-").join("");
	
			//if ( this.ymd !== changeDt) {
				this.prmWkDt = changeDt
				console.log(">>> [SZFR2104]this.ymd =>>"+ this.prmWkDt)  
	
				this.getWeathList()  //기상정보 조회
			//}
 
		}, 		

		//기상조회 리스트 	
		getWeathList() {

            const config = {
                url: '/sz/fr/03r01',
                //url : "/co/at/01r01",
                data: {
                    mpaAddgC : this.prmCulplRgnC,  //행안부행정동코드 = (param)재배지지역코드
                    aplDt    : this.prmWkDt,       //적용일자 = (param)작업일자
                }
            } 
            console.log(config);

            apiService.call(config).then(response => {

				this.mxTptrCntn    = (response.mxTptrCntn !== null)?response.mxTptrCntn+'˚': '-';      //최고기온내용
				this.lowsTptrCntn  = (response.lowsTptrCntn !== null)?response.lowsTptrCntn+'˚': '-';  //최저기온내용
				this.humidityCntn  = (response.humidityCntn !== null)?response.humidityCntn+'%' : '-'; //습도내용
				this.rainfCntn     = (response.rainfCntn !== null)?response.rainfCntn+'mm' : '-';	   //강수량내용
				this.weathIconC    = response.weathIconC;    //날씨아이콘코드
				this.weathCntn     = response.weathCntn;     //날씨내용
				this.weathMapIconC = response.weathMapIconC; //기상매핑코드
				this.weathMapCntn  = response.weathMapCntn;  //기상상태매핑명

            })    

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

}
</script>