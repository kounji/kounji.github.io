<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농일지 > 
* @ 페이지설명 : 영농일지 등록
* @ 파일명     : src/views/page/SZ/FR/SZFR2103/SZFR2103.vue
* @ 작성자     : 
* @ 작성일     : 2021-07-05
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-07-05              			           최초 작업
* 2021-07-22              			           수정 작업(인터페이스 변경)
* 2021-08-02                                   수정 작업
*************************************************************************/
-->
<template>
    <!-- full popup S --> 
	<div class="full_popup" id="full_popup_01"> 
		<!--타이틀(Start)-->
		<div class="popup_header">    
			<h1>영농일지 등록</h1>
			<a class="btn_close" v-on:click.prevent="closePopup"><span class="blind">팝업닫기</span></a>	
		</div>
		<!--타이틀(End)-->
			
		<!--메인(Body)-->		
		<div class="popup_content com_bg_type00">

			<!--2021.11.29(월) 변경-->		
			<template v-if="prmCulplRgnC === null || prmCulplRgnC === '' "> <!--(변수)재배지지역코드가 존재하지 않을 경우-->
				<div class="weather_top_default">
					<strong class="com_box_tit">{{prmNaWrsSclfnm}}</strong>
					<!--strong class="com_box_tit">{{prmNaWrsSclfnm}}</!--strong-->  <!--(변수)상품분류명-->   
					<a v-on:click.prevent="fn_openCultPlotPop()">
						<div class="com_box_type01 mt15">
							<span class="add_btn_ico"></span>
							<strong class="com_box_tit">재배지를 등록해 주세요.</strong>
						</div>
					</a>
				</div>
			</template>
			<template v-else>	
				<div class="top_weather">
					<div class="title">{{prmNaWrsSclfnm}}</div>     <!--상품분류명-->   
					<!--2021.11.25(목) 변경-->
					<div  v-show="(prmCulplRgnNm !== '' || prmCulplRgnNm !== null) " class="sub_title">{{prmCulplRgnNm}}</div>  <!--재배지지역명-->
					<!--2021.11.25(목) 변경-->
					<!--날씨정보(Start)-->
					<div class="info_wrap">
						<div class="txt_weather">
							<div class="com_tooltip_type01">
								<p>
									<span>날씨정보</span>
									<a class="com_btn_info" v-on:click.prevent="toolTipOpenPopup()">
										<em class="com_icon_info2"><span class="blind">툴팁열기</span></em>                  
									</a>                  
								</p>                
								<div class="com_ballon_type01" :style="isTlTipYn == true ? 'display:block' : 'display:none' " >
									<div>
										현지사정이나 수신 상태에 의해 차이가 발생할 수 있습니다.<br>
										(제공: K-weather)
										<a href="javascript:void(0);" class="com_btn_close" v-on:click.prevent="toolTipClosePopup()">
											<span class="blind">툴팁닫기</span>
										</a>
									</div> 
								</div>
							</div>                                      
						</div>
					</div>
					<!--날씨정보(End)-->
				</div>
			</template>
			<!--2021.11.29(월) 변경-->		

			<!--기상관측지점코드가 존재할 경우, 기상정보내역을 보여줌~ -->
			<template v-if="prmCulplRgnC !== '' ">
				<div class="weather_top">
	
					<div class="weather_sel_wrap">
						<div class="weather_sel">
							<div :class=" 'weather weather'+weathMapIconC"></div> 
							<button class="select_date" title="날씨 선택">
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
									<input type="text" id="txt02" class="input_right com_txtright_type01 no-stroke" title="습도" disabled="true"  v-model="humidityCntn">
								</div>
							</div>
						</div>
						<div class="com_inner pair">                
							<div class="com_box_type01">
								<div class="com_input_type01 com_placeholder_right com_word2 m0">
									<label for="txt03">최저</label>
									<input type="text" id="txt03" class="input_right com_txtright_type01 no-stroke" title="최저기온" disabled="true"  v-model="lowsTptrCntn">
								</div>
							</div>
							<div class="com_box_type01">
								<div class="com_input_type01 com_placeholder_right com_word2 m0">
									<label for="txt04">강수량</label>
									<input type="text" id="txt04" class="input_right com_txtright_type01 no-stroke" title="강수량" disabled="true"  v-model="rainfCntn">
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>

			<!--입력0(Start)-->
			<div class="weather_input_wrap">
				
				<!--(prm)경제통합데이터구분코드가 DIRECT일 경우-입력 가능(T), 아닐 경우-입력 불가능(F)-->
				<div class="com_input_type01">
					<template v-if="culplAreaUntC === 'F' "> 	
						<input type="text" id="com_input01" class="input_left" name="" title="날짜선택" disabled required date-placeholder="" v-model="wkDt">
					</template> 	
					<template v-else>	

						<!--2021/10/19(화) 변경-->						
						<input type="text" data-popup="alert_popup" readonly id="com_input01" title="날짜선택" class="input_cal_date" name="" required date-placeholder="" ref="wkDt" v-model="wkDt" @click="fn_popupCalendar($event)">
						<!--2021/10/19(화) 변경-->						
					</template> 	
					<label for="com_input01"></label>
                </div>

				<!--(prm)경제통합데이터구분코드가 DIRECT일 경우-입력 가능(T), 아닐 경우-입력 불가능(F)-->
				<template v-if="culplAreaUntC === 'F' "> 	
					<div class="com_input_type01 ani-active">
						<label for="com_input01"></label>
						<input type="text" id="com_input01" class="" name="" value="" title="작업을 설정해주세요" readonly v-model="fangWkDsnm" placeholder="">
					</div>
				</template> 	
				<template v-else>							
					<div class="com_btnselectbox_type01 ani-active">
							<button type="button" class="com_btnselect_type01 com_iconstar"  title="작업을 설정해주세요" @click.prevent="fn_openSlidePop($event)">
								<span>{{fangWkDsnm.length > 0 ? fangWkDsnm : '작업을 설정해 주세요.'}}</span>
							</button>
					</div>  
				</template> 	

				<!--2021/10/22(금) 변경-->
				<div class="com_input_type01 ani-active">
					<input type="text" id="com_input21" class="" :value="fangWknm" ref="fangWknm" title="상세 작업명을 입력해 주세요" @keyup="fn_checkWord($event,150, 'fangWknm'), moveNextTag($event)"  name="" required="" placeholder="상세 작업명을 입력해 주세요.">
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
				<!--자가인력(남)(명/시/분)(Start)--->
				<div class="pair_input"> 
					<div class="com_input_type01 com_word1">
						<label for="com_input02"><span class="txt_label">남</span></label>
						<input type="tel" id="com_input02" class="" name="" value="" placeholder="" maxlength="3"  @focus="maleOwhsHmrsCn = ''" title="남" ref="maleOwhsHmrsCn" @input="fn_hourMinuteCheck('maleOwhsHmrsCn', '0')" @keyup="moveNextTag($event)" v-model="maleOwhsHmrsCn">
						<div class="del_txt">
							<a class="com_btn_delete2" v-on:click.prevent="delStr('maleOwhsHmrsCn')" v-if="maleOwhsHmrsCn.length > 0"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">명</span>
						</div>
					</div>

					<!--변경(2021.08.25)-->	
					<div>
						<div class="com_input_type01 com_placeholder_right com_word2">
							<label for="com_input03"></label>
							<input type="tel" id="com_input03" class="" name="" value="" placeholder="시간입력" title="시간입력" @focus="hour1 = ''" maxlength="2" ref="hour1" @input="fn_hourMinuteCheck('hour1', '1')" @keyup="moveNextTag($event)" v-model="hour1">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('hour1')" v-if="hour1.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">시간</span>
							</div>
						</div>
						<div class="com_input_type01 com_placeholder_right com_word1">
							<label for="com_input04"></label>
							<input type="tel" id="com_input04" class="" name="" value="" placeholder="분입력" title="분입력" @focus="minute1 = ''" ref="minute1" maxlength="2" @input="fn_hourMinuteCheck('minute1', '2')" @keyup="moveNextTag($event)" v-model="minute1">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('minute1')" v-if="minute1.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">분</span>
							</div>
						</div>
					</div>

				</div> 
				<!--자가인력(남/시분)(End)--->

				<!--자가인력(여)(명/시/분)(Start)--->
				<div class="pair_input">
					<div class="com_input_type01 com_word1">
						<label for="com_input05"><span class="txt_label">여</span></label>
						<input type="tel" id="com_input05" class="" name="" value="" placeholder="" maxlength="3" @focus="wmnOwhsHmrsCn = ''" title="여" ref="wmnOwhsHmrsCn" @input="fn_hourMinuteCheck('wmnOwhsHmrsCn', '0')" @keyup="moveNextTag($event)" v-model="wmnOwhsHmrsCn">
						
						<div class="del_txt">
							<a class="com_btn_delete2" v-on:click.prevent="delStr('wmnOwhsHmrsCn')" v-if="wmnOwhsHmrsCn.length > 0"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">명</span>
						</div>
					</div>
								
					<div>
						<div class="com_input_type01 com_placeholder_right com_word2">
							<label for="com_input06"></label>
							<input type="tel" id="com_input06" class="" name="" value="" placeholder="시간입력" title="시간입력" maxlength="2" @focus="hour2 = ''" ref="hour2" @input="fn_hourMinuteCheck('hour2', '1')" @keyup="moveNextTag($event)" v-model="hour2">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('hour2')" v-if="hour2.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">시간</span>
							</div>
						</div>
						<div class="com_input_type01 com_placeholder_right com_word1">
							<label for="com_input07"></label>
							<input type="tel" id="com_input07" class="" name="" value="" placeholder="분입력" title="분입력" maxlength="2" @focus="minute2 = ''" ref="minute2" @input="fn_hourMinuteCheck('minute2', '2')" @keyup="moveNextTag($event)" v-model="minute2">
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
						<label for="com_input08"><span class="txt_label">남</span></label>
						<input type="tel" id="com_input08" class="" name="" value="" placeholder="" maxlength="3" @focus="maleEmplHmrsCn = ''" title="남" ref="maleEmplHmrsCn" @input="fn_hourMinuteCheck('maleEmplHmrsCn', '0')" @keyup="moveNextTag($event)" v-model="maleEmplHmrsCn">
						<div class="del_txt">
							<a class="com_btn_delete2" v-on:click.prevent="delStr('maleEmplHmrsCn')" v-if="maleEmplHmrsCn.length > 0"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">명</span>
						</div>
					</div>					
					<div>
						<div class="com_input_type01 com_placeholder_right com_word2">
							<label for="com_input09"></label>
							<input type="tel" id="com_input09" class="" name="" value="" placeholder="시간입력" title="시간입력" maxlength="2" @focus="hour3 = ''" ref="hour3" @input="fn_hourMinuteCheck('hour3', '1')" @keyup="moveNextTag($event)" v-model="hour3">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('hour3')" v-if="hour3.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">시간</span>
							</div>
						</div>
						<div class="com_input_type01 com_placeholder_right com_word1">
							<label for="com_input10"></label>
							<input type="tel" id="com_input10" class="" name="" value="" placeholder="분입력" title="분입력" maxlength="2" @focus="minute3 = ''" ref="minute3" @input="fn_hourMinuteCheck('minute3', '2')" @keyup="moveNextTag($event)" v-model="minute3">
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
						<label for="com_input11"><span class="txt_label">여</span></label>
						<input type="tel" id="com_input11" class="" name="" value="" placeholder="" maxlength="3" title="여" @focus="wmnEmplHmrsCn = ''" ref="wmnEmplHmrsCn" @input="fn_hourMinuteCheck('wmnEmplHmrsCn', '0')" @keyup="moveNextTag($event)" v-model="wmnEmplHmrsCn">
						
						<div class="del_txt">
							<a class="com_btn_delete2" v-on:click.prevent="delStr('wmnEmplHmrsCn')" v-if="wmnEmplHmrsCn.length > 0"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">명</span>
						</div>
					</div>

					<div>
						<div class="com_input_type01 com_placeholder_right com_word2">
							<label for="com_input12"></label>
							<input type="tel" id="com_input12" class="" name="" value="" placeholder="시간입력" title="시간입력" maxlength="2" @focus="hour4 = ''" ref="hour4" @input="fn_hourMinuteCheck('hour4', '1')" @keyup="moveNextTag($event)" v-model="hour4">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('hour4')" v-if="hour4.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">시간</span>
							</div>
						</div>
						<div class="com_input_type01 com_placeholder_right com_word1">
							<label for="com_input13"></label>
							<input type="tel" id="com_input13" class="" name="" value="" placeholder="분입력" title="분입력" maxlength="2" @focus="minute4 = ''" ref="minute4" @input="fn_hourMinuteCheck('minute4', '2')"  @keyup="moveNextTag($event)" v-model="minute4">
							<div class="del_txt">
								<a class="com_btn_delete2" v-on:click.prevent="delStr('minute4')" v-if="minute4.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">분</span>
							</div>
						</div>
					</div>

				</div>
				<!--고용인력(여/시분)(End)--->

				<!--입력3-작업면적(Start)-->
				<div class="com_input_type01 ani-active mb20 com_word1">

					<input type="tel" id="com_input14" class="com_txtright_type01" :class="areaCntn.length>0?'focusON focusforce ':''" name="" maxlength="7" required=""  @input="addComma('areaCntn')"
							placeholder="작업면적(평수)을 입력해 주세요" title="작업면적(평수)을 입력해 주세요" v-model="areaCntn" @keyup="moveNextTag($event)" ref="areaCntn">

					<label for="com_input14">
						<span class="txt_label_x">작업면적</span>
					</label>

					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2">평</span>
					</div>

                </div>
				<!--입력3-작업면적(End)-->
				
				<template v-if="naDataDsc !=='DIRECT' ">
					<!--매출상세목록 자료가 존재할 경우만(Start)-->
					<div class="data_wrap" >
						<div class="gray_box">
							<div class="list" v-for="(slDtl, index) in slDtlList" :key="index">

                                <em>{{slDtl.naWrsSclfnm}}</em>   <!--작목명(경제통합상품소분류명)/2021.09.02 추가-->

								<!--경제통합데이터구분코드가 'B03(경제통합 로컬푸드) or B04(경제통합 판매출하) 인 경우 =>> 경제통합상품세분류명/경제통합상품약어명/상품규격중량/경제통합상품단위코드명/경제통합상품포장코드명/경제통합상품규격단위코드명  -->	
								<template v-if="naDataDsc ==='B02' || naDataDsc ==='B03' || naDataDsc ==='B04' "> 	 <!--상품규격중량/경제통합상품포장코드명-->			
									<div class="row">
										<span class="tit">(품명)</span><span>{{slDtl.naWrsDtcfnm}}</span>&nbsp;(&nbsp;{{slDtl.naWrsAbrNm}}&nbsp;)&nbsp;
									</div>  <!--경제통합상품세분류명/경제통합상품약어명-->

									<div class="row">
										<span class="tit">(수량)</span><span>{{slDtl.qt | numberFilter('0,0')}}</span>
									</div>

									<div class="row">
										<span class="tit">(금액)</span>{{slDtl.am | numberFilter('0,0')}}<span class="bar">원</span>
									</div>

									<template v-if="(myfhsNaIntfDsc ==='BM001' || myfhsNaIntfDsc ==='XO001') "> 
										<div class="row">
											<span class="tit">(규격)</span><span>{{slDtl.wrsStdWt | numberFilter('0,0')}}&nbsp;&nbsp;{{slDtl.naWrsUntCnm}}</span>
										</div>  
									</template>
								</template>

								<!--경제통합데이터구분코드가 'D03(경제통합 농사작업) 인 경우 =>> 농기계작업명/방제작업구분명/밪에작업상세구분명 -->	
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

							</div> <!--list(End)--> 
						</div> <!--gray_box(End)-->
					</div> <!--data_wrap(End)-->
				</template>
				<!--매출상세목록 자료가 존재할 경우만(End)-->

				<div class="com_textarea_type01 ani-active com_no_iconstar">
					<textarea name="" id="txt10" class="com_txtarea_type02" :value="memoCntn" ref="memoCntn" @keyup="fn_checkWord($event,100, 'memoCntn')"  
								cols="10" rows="3" required placeholder="메모를 입력하세요."></textarea> 
					<label for="txt00">
						<span class="txt_label_x">메모</span>
					</label>   
				</div>			
				<!--입력4-작업메모(End)-->
			</div> <!--weather_input_wrap(End)-->
			<!--입력0(End)-->
        </div> <!--popup_content(End)-->
		<!--메인(Body)-->
		
        <div class="popup_footer fixed">
			<div class="btn_half_box">
				<a href="javascript:void(0);" class="btn btn_grey" v-on:click.prevent="reset('1')">취소</a>
				<a href="javascript:void(0);" class="btn btn_mint" v-on:click.prevent="applyBtn()">저장</a>
				<!-- btn_off 제거시 활성화 -->
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="closePopup"><span class="blind">팝업닫기</span></a>	
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
import {checkWord} from '@/utils/data'

import SZST2105 from '@/views/page/SZ/ST/SZST2105/SZST2105'
import SZFR2105 from '@/views/page/SZ/FR/SZFR2105/SZFR2105'

export default {
    name : "SZFR2103",
    data: () => {
        return {
			objAreaInfo  : {},   //전달파라미터		

			//*Param 변수			
            prmTrDsc 	   : "",   //거래구분코드	 
            prmNaWrsLclc   : "",   //경제통합상품대분류코드	 
            prmNaWrsMclc   : "",   //경제통합상품중분류코드	 
            prmNaWrsSclc   : "",   //경제통합상품소분류코드
            prmNaWrsSclfnm : "",   //상품분류명	 
            prmCulplRgnC   : "",   //재배지지역코드 
            prmCulplRgnNm  : "",   //재배지지역명 
            prmNaDataDsc   : "",   //경제통합데이터구분코드	 
			prmWkDt        : "",   //작업일자 = 영농일지작업일자 
			prmMyfhsNalntfDsc : "",   //마이농가경제통합인터페이스구분코드
			prmBrc        : "",    //사무소코드
			prmNaSlpno    : "",    //경제통합번호
			prmSqno       : "",    //영농일지번호
			prmTrDt       : "",    //거래일자

			//**
			isbackYn 	 : false, 	
			isTlTipYn    : false, 	
			isReadYn     : false, 	
			selItem      : "", 
			msg 		 : "",
			restMsg 	 : "",
			varNaWrs     : "",		
			currentYear  : "",		
			currentMonth : "",		
			currentDay   : "",		
			shnHrCntn    : "",   //일조시간내용
			culplAreaUntC  : "",

			slDtlList    : [], 	

			//** (영농일지)등록
            hour1      : "",
			minute1    : "",
			hour2      : "",
			minute2    : "",
            hour3      : "",
			minute3    : "",
			hour4      : "",
			minute4    : "",

			fangWkDsnm : "",
			fangWknm   : "", 

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
            maleEmplHmrsCn 	: "",		//남자고용인력수
            wmnEmplHmrsCn  	: "",		//여자고용인력수
            emplHmrsWkHr   	: "",		//고용인력작업시간

			maleOwhsHmrsWkHr : "",     //남자자가인력작업시분
			wmnOwhsHmrsWkHr  : "",     //여자자가인력작업시분
			maleEmplHmrsWkHr : "",     //남자고용인력작업시분
			wmnEmplHmrsWkHr  : "",     //여자고용인력작업시분

            areaCntn       	: "",		//면적내용
            memoCntn       	: "",		//메모내용
            mxTptrCntn     	: "",		//최고기온내용
            lowsTptrCntn   	: "",		//최저기온내용
            humidityCntn   	: "",		//습도내용
            rainfCntn      	: "",		//강수량내용
            culplRgnC      	: "",		//재배지지역코드
            culpJuso       	: "",		//재배지주소
            weathIconC     	: "",		//기상코드
			weathCntn     	: "",		//기상상태명
			weathMapIconC   : "",       //날씨아이콘코드
			weathMapCntn    : "",        //날씨내용
			trDt            : "",	    //거래일자
			myfhsNaIntfDsc  : "",       //마이농가경제통합인터페이스구분코드
			brc             : "",	    //사무소코드
			naSlpno         : "",	    //경제통합전표번호
			naDataDsc       : "",

			tmpType         : "",
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
      this.currentDay   = date.getDate()   //현재일
    }, 

    mounted() {
		this.initComponent();

		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)     
    },   

	methods: {
		initComponent() {
			this.getInit()   //초기화
		},

		//기상조회 리스트 	
		getWeathList() {

			console.log(">>> [SZFR2103]getWeathList(Start) <<< ")    

			console.log("[SZFR2103]getWeathList/(param변수)재배지지역코드 =>>> ", this.prmCulplRgnC )    
			console.log("[SZFR2103]getWeathList/(param변수)작업일자 =>>> ", this.prmWkDt )    

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

                //*실제 부분(Start)			
				console.log('(getWeathList)최고기온내용1=>> '+response.mxTptrCntn);	
				console.log('(getWeathList)최저기온내용1=>> '+response.lowsTptrCntn);	
				console.log('(getWeathList)습도내용1=>> '+response.humidityCntn);	
				console.log('(getWeathList)강수량내용1=>> '+response.rainfCntn);	

				this.mxTptrCntn    = (response.mxTptrCntn !== null)?response.mxTptrCntn+'˚': '-';      //최고기온내용
				this.lowsTptrCntn  = (response.lowsTptrCntn !== null)?response.lowsTptrCntn+'˚': '-';  //최저기온내용
				this.humidityCntn  = (response.humidityCntn !== null)?response.humidityCntn+'%' : '-'; //습도내용
				this.rainfCntn     = (response.rainfCntn !== null)?response.rainfCntn+'mm' : '-';	   //강수량내용
				this.weathIconC    = response.weathIconC;    //날씨아이콘코드
				this.weathCntn     = response.weathCntn;     //날씨내용
				this.weathMapIconC = response.weathMapIconC; //날씨아이콘코드
				this.weathMapCntn  = response.weathMapCntn;  //날씨내용

				console.log('(getWeathList)최고기온내용=>> '+this.mxTptrCntn);	
				console.log('(getWeathList)최저기온내용=>> '+this.lowsTptrCntn);	
				console.log('(getWeathList)습도내용=>> '+this.humidityCntn);	
				console.log('(getWeathList)강수량내용=>> '+this.rainfCntn);	
				console.log('(getWeathList)날씨아이콘코드=>> '+this.weathIconC);	
				console.log('(getWeathList)날씨내용=>> '+this.weathCntn);	
				console.log('(getWeathList)날씨매핑아이콘코드=>> '+this.weathMapIconC);	
				console.log('(getWeathList)날씨매핑내용=>> '+this.weathMapCntn);	
				//*실제 부분(End) 				
            })    

			console.log(">>> [SZFR2103]getWeathList(End) <<< ")    

		},	

		//'초기화
		getInit() {
			this.objAreaInfo = this.params.objAreaInfo

			console.log(">>> [SZFR2103]getInit(Start) <<< ")    

            console.log('[SZFR2103]params.objAreaInfo=>> '+this.params.objAreaInfo);	
            console.log('[SZFR2103]objAreaInfo=>> '+this.objAreaInfo);	

			//*Param부분
            this.prmTrDsc 	    = this.objAreaInfo.trDsc;       //거래구분코드	 
            this.prmNaWrsLclc   = this.objAreaInfo.naWrsLclc;   //경제통합상품대분류코드	 
            this.prmNaWrsMclc   = this.objAreaInfo.naWrsMclc;   //경제통합상품중분류코드	 
            this.prmNaWrsSclc   = this.objAreaInfo.naWrsSclc;   //경제통합상품소분류코드
            this.prmNaWrsSclfnm = this.objAreaInfo.naWrsSclfnm; //상품분류명	 
            this.prmCulplRgnC   = this.objAreaInfo.culplRgnC;   //재배지지역코드 
			this.prmCulplRgnNm  = this.objAreaInfo.culplRgnNm;  //재배지지역명 
			this.prmMyfhsNalntfDsc  = this.objAreaInfo.myfhsNalntfDsc;   //마이농가경제통합인터페이스구분코드 *  myfhsNalntfDsc
            this.prmNaDataDsc   = this.objAreaInfo.naDataDsc;   //경제통합데이터구분코드	 
			
            console.log('[SZFR2103](Param)objAreaInfo.wkDt=>> '+this.objAreaInfo.wkDt);	
			if (this.objAreaInfo.wkDt === "" ||this.objAreaInfo.wkDt === null) {
				this.prmWkDt    = this.objAreaInfo.trDt;       	//작업일자 = 거래일자 
			} else {
				this.prmWkDt    = this.objAreaInfo.wkDt;       	//작업일자 = 영농일지작업일자 
			}
			this.prmBrc         = this.objAreaInfo.brc;         //사무소코드 *
			this.prmNaSlpno     = this.objAreaInfo.naSlpno;     //경제통합번호 *
			this.prmSqno        = this.objAreaInfo.sqno;        //영농일지번호 *
			this.prmTrDt        = this.objAreaInfo.trDt;        //거래일자 *
			
            console.log('[SZFR2103](Param변수)-1.거래구분코드=>> '+this.prmTrDsc);	
            console.log('[SZFR2103](Param변수)-2.경제통합상품대분류코드=>> '+this.prmNaWrsLclc);	
            console.log('[SZFR2103](Param변수)-3.경제통합상품중분류코드=>> '+this.prmNaWrsMclc);	
            console.log('[SZFR2103](Param변수)-4.경제통합상품소분류코드=>> '+this.prmNaWrsSclc);	
            console.log('[SZFR2103](Param변수)-5.상품분류명=>> '+this.prmNaWrsSclfnm);	
            console.log('[SZFR2103](Param변수)-6.재배지지역코드=>> '+this.prmCulplRgnC);	
            console.log('[SZFR2103](Param변수)-7.재배지지역명=>> '+this.prmCulplRgnNm);	
            console.log('[SZFR2103](Param변수)-8.경제통합데이터구분코드=>> '+this.prmNaDataDsc);	
            console.log('[SZFR2103](Param변수)-9.작업일자=>> '+this.prmWkDt);	
            console.log('[SZFR2103](Param변수)-10.마이농가경제통합인터페이스구분코드=>> '+this.prmMyfhsNalntfDsc);	
            console.log('[SZFR2103](Param변수)-11.사무소코드=>> '+this.prmBrc);	
            console.log('[SZFR2103](Param변수)-12.경제통합번호=>> '+this.prmNaSlpno);	
            console.log('[SZFR2103](Param변수)-13.영농일지번호=>> '+this.prmSqno);	
            console.log('[SZFR2103](Param변수)-14.거래일자=>> '+this.prmTrDt);	

			this.varNaWrs = this.prmNaWrsLclc+this.prmNaWrsMclc+this.prmNaWrsSclc
            console.log('[SZFR2103](변수)경제통합상품(합)=>> '+this.varNaWrs);	

            console.log('[SZFR2103]getUserInfo(마이데타번호)=>> '+this.getUserInfo('mydtCusno'));	
            console.log('[SZFR2103]getUserInfo(성별)=>> '+this.getUserInfo('sexDsc'));	

			//*입력필드 초기값 부분
			if (this.getUserInfo('sexDsc') === "0" ) {   //여자일 경우

				this.wmnOwhsHmrsCn	= "1"  //자가인력-여
				this.hour2	 = "8"   //자가인력(여)-시
				this.minute2 = "00"  //자가인력(여)-분
				console.log("[SZFR2103]getInit/(필드)자가인력/여(명) =>>> ", this.wmnOwhsHmrsCn )    
				console.log("[SZFR2103]getInit/(필드)자가인력/여(시/분) =>>> ", this.hour2, this.minute2 )    
			} else if (this.getUserInfo('sexDsc') === "1" ) { 
				this.maleOwhsHmrsCn	= "1"  //자가인력-남
				this.hour1	 = "8"   //자가인력(남)-시
				this.minute1 = "00"  //자가인력(남)-분
				console.log("[SZFR2103]getInit/(필드)자가인력/남(명) =>>> ", this.maleOwhsHmrsCn )    
				console.log("[SZFR2103]getInit/(필드)자가인력/남(시/분) =>>> ", this.hour1, this.minute1 )    
			}

			//this.maleEmplHmrsCn	= "1"  //고용인력-남 
			//this.wmnEmplHmrsCn	= "1"  //고용인력-여
			//this.hour3	 = "8"   //고용인력(남)-시
			//this.minute3 = "00"  //고용인력(남)-분
			//this.hour4	 = "8"   //고용인력(여)-시
			//this.minute4 = "00"  //고용인력(여)-분

			//console.log("[SZFR2103]getInit/(필드)고용인력/남-여 =>>> ", this.maleEmplHmrsCn, this.wmnEmplHmrsCn )    
			//console.log("[SZFR2103]getInit/(필드)고용인력/남(시/분) =>>> ", this.hour3, this.minute3 )    
			//console.log("[SZFR2103]getInit/(필드)고용인력/여(시/분) =>>> ", this.hour4, this.minute4 )    

			//*(param)경제통합데이터구분코드 = DIRECT인 경우
			if (this.prmNaDataDsc === "DIRECT") {
				this.isReadYn = true
				this.culplAreaUntC = 'T'
			} else {
				this.isReadYn = false
				this.culplAreaUntC = 'F'
			}
			console.log("[SZFR2103]getInit/readYn=>>> ", this.isReadYn )    
			console.log("[SZFR2103]getInit/culplAreaUntC=>>> ", this.culplAreaUntC )    

			//*재배지지역코드가 존재할 경우
			if (this.prmCulplRgnC !== null && this.prmCulplRgnC !== '') {
				
				//(param)경제통합데이터구분코드 = DIRECT인 경우

				//2021.12.01(수) 오픈때 사용하지 못함~ 차후, 업체와의 협의에 따라 사용할수 있음
				if (this.prmNaDataDsc === "DIRECT") {
					console.log(" >>> (param)경제통합데이터구분코드 = DIRECT인 경우 <<< ")    
					this.getWeathList()   

				} else {
					console.log(" >>> (param)경제통합데이터구분코드 != DIRECT인 경우 <<< ")    

					this.getSearchList()
				}

			}

			//*기타
			this.wkDt = dateFormat(this.prmTrDt, 'YYYY-MM-DD')
			// this.wkDt = dateFormat(this.prmWkDt, 'YYYY-MM-DD')  //작업일자 = (Param변수)-9.작업일자
			console.log("[SZFR2103]getInit/(필드)작업일자 =>>> ", this.wkDt )    

			console.log(">>> [SZFR2103]getInit(End) <<< ")    
        },

        //**************
        // [조회]
        //***************/
		getSearchList() {

			console.log(">>> [SZFR2103]getSearchList(Start) <<< ")    

			const config = {
                url: '/sz/fr/03r02',
                //url : "/co/at/01r01",
                data: {
                    mydtCusno    : this.getUserInfo('mydtCusno'),  //마이고객데이타고객번호 = (변수)마이고객데이타고객번호
                    naWrsLclc    : this.prmNaWrsLclc,   	//경제통합상품대분류코드 = (prm변수)경제통합상품대분류코드
                    naWrsMclc    : this.prmNaWrsMclc,   	//경제통합상품중분류코드 = (prm변수)경제통합상품중분류코드
                    naWrsSclc    : this.prmNaWrsSclc,   	//경제통합상품소분류코드 = (prm변수)경제통합상품소분류코드
                    naDataDsc    : this.prmNaDataDsc,   	//경제통합데이터구분코드 = (prm변수)경제통합데이터구분코드
					trDt         : (this.prmNaDataDsc !=="DIRECT")?this.prmTrDt:"", 	  //거래일자 = (prm변수)작업일자
					myfhsNaIntfDsc : (this.prmMyfhsNalntfDsc !=="DIRECT")?this.prmMyfhsNalntfDsc:"",  //마이농가경제통합인터페이스구분코드 = (prm변수)마이농가경제통합인터페이스구분코드
                    brc 		 : (this.prmNaDataDsc !=="DIRECT")?this.prmBrc:"", 		 //사무소코드 = (prm변수)사무소코드
					naSlpno		 : (this.prmNaDataDsc !=="DIRECT")?this.prmNaSlpno:"", 	 //경제통합전표번호 = (prm변수)경제통합전표번호
					wkDt 	  	 : (this.prmNaDataDsc !=="DIRECT")?this.prmWkDt:"",  	 //영농일지작업일자 = (prm변수)영농일지작업일자
					sqno 		 : (this.prmNaDataDsc !=="DIRECT")?this.prmSqno:""   	 //영농일지일련번호 = (prm변수)영농일지일련번호
                }
            } 
            apiService.call(config).then(response => {
			console.log(response)

                this.mydtCusno  = response.mydtCusno;	 //마이데이터고객번호
				this.fangWkDsnm = response.title;	     //영농작업구분명 <<-타이틀 
				this.fangWknm   = (response.subtitle === undefined)?'':response.subtitle;   //영농작업명     <<-부제목

				console.log('[SZFR2103](변수)마이데이터고객번호=>> '+this.mydtCusno);	
				console.log('[SZFR2103](입력)영농작업구분명(타이틀)=>> '+this.fangWkDsnm);	
				console.log('[SZFR2103](입력)영농작업명(부제목)=>> '+this.fangWknm);	

				this.naDataDsc = (response.naDataDsc ==='')?'':response.naDataDsc;	//경제통합데이터구분코드
				console.log('[SZFR2103](입력)경제통합데이터구분코드=>> '+this.naDataDsc);	

				//경제통합데이터구분코드가 'DIRECT'가 아닌  경우에~
				if (response.naDataDsc !== "DIRECT" && response.naDataDsc !== null) {

					console.log('[SZFR2103](resp)거래일자=>> '+response.trDt);	
					console.log('[SZFR2103](resp)마이농가경제통합인터페이스구분코드=>> '+response.myfhsNaIntfDsc);	
					console.log('[SZFR2103](resp)사무소코드=>> '+response.brc);	
					console.log('[SZFR2103](resp)경제통합전표번호=>> '+response.naSlpno);	

					this.trDt      = (response.trDt ==='')?'':response.trDt.split("-").join("");	   //거래일자
					this.myfhsNaIntfDsc = (response.myfhsNaIntfDsc === undefined)?'':response.myfhsNaIntfDsc;  //마이농가경제통합인터페이스구분코드
					this.brc       = (response.brc ==='')?'':response.brc;	          //사무소코드
					this.naSlpno   = (response.naSlpno === null)?'':response.naSlpno;	 //경제통합전표번호

					console.log('[SZFR2103](입력)거래일자=>> '+this.trDt);	
					console.log('[SZFR2103](입력)마이농가경제통합인터페이스구분코드=>> '+this.myfhsNaIntfDsc);	
					console.log('[SZFR2103](입력)사무소코드=>> '+this.brc);	
					console.log('[SZFR2103](입력)경제통합전표번호=>> '+this.naSlpno);	
				}

				console.log('[SZFR2103](resp)이전-작업일자=>> '+response.wkDt);	

				if (response.naDataDsc !== "DIRECT" && response.naDataDsc !== null) {
					this.wkDt   	  = dateFormat(this.trDt, "YYYY-MM-DD");   //거래일자 
				} else {
					this.wkDt   	  = (response.wkDt ==='')?'':dateFormat(response.wkDt, "YYYY-MM-DD");  //작업일자
				}	
				console.log('[SZFR2103](resp)이후-작업일자=>> '+this.wkDt);	

				this.varbefWkDt	  = this.wkDt    //(변수)이전작업일자 = response.작업일자
				this.sqno         = Number(response.sqno);	        //일련번호*

				console.log('[SZFR2103](입력)작업일자=>> '+this.wkDt);	
				console.log('[SZFR2103](변수)이전작업일자=>> '+this.varbefWkDt);	
				console.log('[SZFR2103](resp)영농일지일련번호=>> '+response.sqno);	
				console.log('[SZFR2103](입력)영농일지일련번호=>> '+this.sqno);	

				console.log('[SZFR2103](입력)최고기온내용1=>> '+response.mxTptrCntn);	
				console.log('[SZFR2103](입력)최저기온내용1=>> '+response.lowsTptrCntn);	
				console.log('[SZFR2103](입력)습도내용1=>> '+response.humidityCntn);	
				console.log('[SZFR2103](입력)강수량내용1=>> '+response.rainfCntn);	

                this.mxTptrCntn   = (response.mxTptrCntn !== null)?response.mxTptrCntn+'˚': '-';   //최고기온내용
                this.lowsTptrCntn = (response.lowsTptrCntn !== null)?response.lowsTptrCntn+'˚': '-';   //최저기온내용
                this.humidityCntn = (response.humidityCntn !== null)?response.humidityCntn+'%' : '-';  //습도내용
                this.rainfCntn    = (response.rainfCntn !== null)?response.rainfCntn+'mm' : '-';	  //강수량내용

				console.log('[SZFR2103](입력)최고기온내용=>> '+this.mxTptrCntn);	
				console.log('[SZFR2103](입력)최저기온내용=>> '+this.lowsTptrCntn);	
				console.log('[SZFR2103](입력)습도내용=>> '+this.humidityCntn);	
				console.log('[SZFR2103](입력)강수량내용=>> '+this.rainfCntn);	

				this.culplRgnC    = response.culplRgnC;	    //재배지지역코드
                this.culpJuso     = response.culpJuso;	    //재배지주소

				console.log('[SZFR2103]재배지지역코드=>> '+this.culplRgnC);	
				console.log('[SZFR2103]재배지주소=>> '+this.culpJuso);	

				this.weathIconC   = response.weathCd;	    //기상코드
				this.weathCntn    = response.weathStsNm;	//기상상태명
				this.weathMapIconC = response.weathCd; //기상매핑코드
				this.weathMapCntn  = response.weathStsNm;  //기상매핑명

				console.log('[SZFR2103](변수)기상코드=>> '+this.weathIconC);	
				console.log('[SZFR2103](변수)기상상태명=>> '+this.weathCntn);	
				console.log('[SZFR2103](변수)기상매핑코드=>> '+this.weathMapIconC);	
				console.log('[SZFR2103](변수)기상매핑명=>> '+this.weathMapCntn);	
				
				this.slDtlList = response.slDtlList || []; //거래상세목록 조회
				console.log("[SZFR2103]slDtlList/거래상세목록 조회 =>>"+JSON.stringify(this.slDtlList))	

			});    

			console.log(">>> [SZFR2103]getSearchList(End) <<< ")    
		},

        //**************
        // [취소]버튼 클릭
        //***************/
        reset(flag) {
			this.selItem = flag

			if (this.selItem === '1' ) {   
				this.restMsg = '영농일지 등록'
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
			} else if (this.selItem === '9') {   
				this.close('complete')
			}
        },

        //선택 시 부모창으로 넘겨줄 파라미터 설정
        fn_setRstInfo(str1,str2) {

			this.closeParam = {
				saveFlag : "complete",
				naWrs    : str1,    //대중소분류
				wkDt     : str2,    //영농일지작업이자
			}
			this.close(this.closeParam)
         }, 

        //**************
        // [저장]버튼 클릭
        //***************/
        applyBtn() {

			console.log(">>>>>>> [SZFR2103]applyBtn(저장)-Start <<<<<<<")

			//*** validation 체크
            console.log('[SZFR2103]applyBtn(저장)/여기(1)~~~');	

			//2021.10.27(수) 추가 
			//작목재배지코드가 미존재할 경우
			if (this.prmCulplRgnC === "") {
				modalService.alert("선택상단의 재배지 등록을 선작업 하시기 바랍니다.").then(() => {
				});
				return;
			}
			//2021.10.27(수) 추가 

			if (this.fangWkDsnm.length == 0 || this.fangWkDsnm.trim() == "") {
               modalService.alert("작업명은 필수입력항목입니다.").then(() => {
					this.$refs.fangWkDsnm.focus()
				});
               return;
			}
            console.log('[SZFR2103]applyBtn(저장)/필수-작업명=>> '+this.fangWkDsnm);	

			if (this.fangWknm.length == 0 || this.fangWknm.trim() == "") {
				modalService.alert("상세작업명은 필수입력항목입니다.").then(() => {
					this.$refs.fangWknm.focus()
				});
				return;
			}
            console.log('[SZFR2103]applyBtn(저장)/필수-상세작업명=>> '+this.fangWknm);	

            console.log('[SZFR2103]applyBtn(저장)/필수-(resp)작업일자=>> '+this.wkDt);	
            console.log('[SZFR2103]applyBtn(저장)/DIRECT값(T/F)=>> '+this.culplAreaUntC);	

			if (this.culplAreaUntC === 'T' ) { //직접입력(DIRECT)인 경우

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

            console.log('~~~~~~~[SZFR2103]applyBtn(저장)/여기(2)~~~~~~~');	

			//남자자가인력수(남)
			if (this.maleOwhsHmrsCn.length === 0) {
				this.maleOwhsHmrsCn = "00"  
			} 
			console.log("[SZFR2103](변수)자가인력(남) 인원수=>> "+ this.maleOwhsHmrsCn)

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
			console.log("[SZFR2103](변수)자가인력작업(남)-시=>> "+ this.hour2)
			console.log("[SZFR2103](변수)자가인력작업(남)-분=>> "+ this.minute2)
			console.log("[SZFR2103](변수)자가인력작업(남) 시간=>> "+ this.maleOwhsHmrsWkHr)

			//자가인력작업시간(여)
			if (this.wmnOwhsHmrsCn === 0) {
			this.wmnOwhsHmrsCn = "00"  //자가인력작업시간 =  (변수)시간+(변수)분
			}
			console.log("[SZFR2103](변수)자가인력(여) 인원수=>> "+ this.maleOwhsHmrsCn)
			
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

			console.log("[SZFR2103](변수)자가인력작업(여)-시=>> "+ this.hour2)
			console.log("[SZFR2103](변수)자가인력작업(여)-분=>> "+ this.minute2)
			console.log("[SZFR2103](변수)자가인력작업(여) 시간=>> "+ this.maleOwhsHmrsWkHr)

            console.log('~~~~~~~[SZFR2103]applyBtn(저장)/여기(3)~~~~~~~');	

			//고용인력수(남)
			if (this.maleEmplHmrsCn === 0) {
			this.maleEmplHmrsCn = "00"  //자가인력작업시간 =  (변수)시간+(변수)분
			}
			console.log("[SZFR2103](변수)고용인력(남) 인원수=>> "+ this.maleEmplHmrsCn)

			if (this.hour3.length === 1) {
				this.hour3 = ("0" + this.hour3 ).slice(-2)
			} else if (this.hour3.length === 0) {
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

			console.log("[SZFR2103](변수)고용인력작업(남)-시=>> "+ this.hour3)
			console.log("[SZFR2103](변수)고용인력작업(남)-분=>> "+ this.minute3)
			console.log("[SZFR2103](변수)고용인력작업(남)-시간=>> "+ this.maleEmplHmrsWkHr)

			//고용인력수(여)
			if (this.wmnEmplHmrsCn === 0) {
				this.wmnEmplHmrsCn = "00"  //자가인력작업시간 =  (변수)시간+(변수)분
			} 
			console.log("[SZFR2104](변수)고용인력(여) 인원수=>> "+ this.wmnEmplHmrsCn)

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
			console.log("[SZFR2103](변수)고용인력작업(여)-시=>> "+ this.hour4)
			console.log("[SZFR2103](변수)고용인력작업(여)-분=>> "+ this.minute4)
			console.log("[SZFR2103](변수)고용인력작업(여)-시간=>> "+ this.wmnEmplHmrsWkHr)

			console.log('~~~~~~~[SZFR2103]applyBtn(저장)/여기(4)~~~~~~~');	

			console.log('[SZFR2103]applyBtn(저장)/필수-(변수)경제통합데이터구분코드=>> '+this.prmNaDataDsc);	
            console.log('[SZFR2103]applyBtn(저장)/필수-(변수)재배지지역코드=>> '+this.prmCulplRgnC);	

			console.log('~~~~~~~[SZFR2103]applyBtn(저장)/여기(5)~~~~~~~');	

			const config = {
				url : "/sz/fr/03s01",
				//url : "/co/at/01r01",
				data : {
					trDsc 	         : this.prmTrDsc,           //*필수-거래구분코드(C:등록,U:수정,D:삭제)
					naDataDsc        : this.prmNaDataDsc,       //*필수-경제통합데이터구분코드 = (resp)경제통합데이터구분코드
					mydtCusno        : this.getUserInfo('mydtCusno'),        //*필수-마이데이터고객번호
					wkDt 	         : dateFormat(this.wkDt, 'YYYYMMDD'),	 //*필수-영농일지작업일자 = (입력)작업일자
					befWkDt	         : this.varbefWkDt, 	    //*필수-영농일지이전작업일자 = (변수)영농일지이전작업일자
					sqno 	         : (this.prmNaDataDsc === "DIRECT")?0:this.sqno,  //*필수-영농일지일련번호(업구분명이 DIRECT(영농일지 직접등록)인 경우는, 0값을 저장) = (resp)일련번호 0
					naWrsLclc        : this.prmNaWrsLclc,       //상품분류코드(대분류) = (resp)상품분류코드(대분류)
					naWrsMclc        : this.prmNaWrsMclc,       //상품분류코드(중분류) = (resp)상품분류코드(중분류)
					naWrsSclc        : this.prmNaWrsSclc,       //상품분류코드(소분류) = (resp)상품분류코드(소분류)
					fangWkDsnm       : this.fangWkDsnm, 	    //영농작업구분명   = (입력)영농작업구분명
					fangWknm         : this.fangWknm, 	        //영농작업명       = (입력)영농작업명
					maleOwhsHmrsCn   : this.maleOwhsHmrsCn, 	//남자자가인력수   = (변수)남자자가인력수
					wmnOwhsHmrsCn    : this.wmnOwhsHmrsCn,      //여자자가인력수   = (변수)여자자가인력수
					maleOwhsHmrsWkHr : this.maleOwhsHmrsWkHr,   //남자자가인력작업시분
					wmnOwhsHmrsWkHr  : this.wmnOwhsHmrsWkHr,    //여자자가인력작업시분
					maleEmplHmrsCn   : this.maleEmplHmrsCn, 	//남자고용인력수   = (변수)남자고용인력수
					wmnEmplHmrsCn    : this.wmnEmplHmrsCn,  	//여자고용인력수   = (변수)여자고용인력수
					maleEmplHmrsWkHr : this.maleEmplHmrsWkHr,   //남자고용인력작업시분
					wmnEmplHmrsWkHr  : this.wmnEmplHmrsWkHr,    //여자고용인력작업시분
					areaCntn         : (this.areaCntn ==='')?'':this.areaCntn,     //면적내용   = (입력)면적내용
					memoCntn         : (this.memoCntn ==='')?'':this.memoCntn,     //메모내용   = (입력)메모내용
					culplRgnC        : this.prmCulplRgnC,    //재배지지역코드(입력) = (prm변수)재배지지역코드
					naLedUyn         : (this.prmNaDataDsc === "DIRECT")?"0":"1",      //경제통합원장사용여부(업구분명이 DIRECT(영농일지 직접등록)인 경우는 0(미사용)값을 저장) = (변수)경제통합원장사용여부 0

					//경제부분 B02(경제통합 구매배출),B03(경제통합 로컬푸드),B04(경제통합 판매출하),D03(경제통합 농사작업)일때만~~~~
					trDt             : (this.prmNaDataDsc !== "DIRECT")?this.prmTrDt:"",           //거래일자 = (resp)거래일자
					myfhsNaIntfDsc   : (this.prmNaDataDsc !== "DIRECT")?this.prmMyfhsNalntfDsc:"", //마이농가경제통합인터페이스구분코드 = (resp)마이농가경제통합인터페이스구분코드
					brc              : (this.prmNaDataDsc !== "DIRECT")?this.prmBrc:"",            //사무소코드 = (resp)사무소코드
					naSlpno          : (this.prmNaDataDsc !== "DIRECT")?this.prmNaSlpno:"",        //경제통합전표번호 = (resp)경제통합전표번호
				}
			}

			console.log('SZFR2103', config)
			apiService.call(config).then(response => {
				//response.rspC == '0000' ? this.openSuccess('자료가 저장 되었습니다.') : this.openFail1('저장 중 오류가 발생하였습니다.')

				if (response.rspC == '0000') { 
					modalService.alert("자료가 저장(등록) 완료되었습니다.").then(() => {
						this.close('complete')

						// let naWrs= this.prmNaWrsLclc+this.prmNaWrsMclc+this.prmNaWrsSclc   //대중소분류
						// let wkDt= this.prmWkDt   //영농일지작업일자
						// console.log("대중소분류 =>>"+ naWrs )
						// console.log("영농일지작업일자 =>>"+ wkDt )

						// this.fn_setRstInfo(naWrs, wkDt)			
					})
				} else {
					modalService.alert("자료 저장(등록))시, 오류가 발생하였습니다.")
				}	 
			})
			console.log(">>>>>>> [SZFR2103]applyBtn(저장)-End <<<<<<<")

        },

        //**************
        // [닫기]버튼 클릭
        //***************/
        closePopup() {

			console.log(" >>> 닫기 <<<")

			this.reset('9')
		}, 

		//입력 텍스트 삭제
        delStr(colNm) {

			if (colNm == "fangWknm") {
				this.fangWknm = ''   //상세 작업명
				
			} else if (colNm == "maleOwhsHmrsCn") {
				this.maleOwhsHmrsCn = ''   //자가인력-남자고용인력수

			} else if (colNm == "wmnOwhsHmrsCn") {
				this.wmnOwhsHmrsCn = ''    //자가인력-여자고용인력수

			} else if (colNm == "hour1") {
				this.hour1 = ''    //자가인력(남)-시

			} else if (colNm == "minute1") {
				this.minute1 = ''    //자가인력(남)-분

			} else if (colNm == "hour2") {
				this.hour2 = ''    //자가인력(여)-시

			} else if (colNm == "minute2") {
				this.minute2 = ''    //자가인력(여)-분

			} else if (colNm == "maleEmplHmrsCn") {
				this.maleEmplHmrsCn = ''   //고용인력-남자고용인력수

			} else if (colNm == "wmnEmplHmrsCn") {
				this.wmnEmplHmrsCn = ''    //고용인력-여자고용인력수

			} else if (colNm == "hour3") {
				this.hour3 = ''    //고용인력(남)-시

			} else if (colNm == "minute3") {
				this.minute3 = ''    //고용인력(남)-분

			} else if (colNm == "hour4") {
				this.hour4 = ''    //고용인력(여)-시

			} else if (colNm == "minute2") {
				this.minute2 = ''    //고용인력(여)-분

			} else if (colNm == "areaCntn") {
				this.areaCntn = ''   //작업면적
				this.$refs.areaCntn.focus()

			} else if (colNm == "memoCntn") {
				this.memoCntn = ''   //메모내용
			} 

        },

        //**************
        // [재배지등록]버튼 클릭
        //***************/
        fn_openCultPlotPop() {
			let popParams = {}

			console.log(">>> [SZFR2103]fn_openCultPlotPop(Start) <<<")

			popParams.callType  = "INSERT2"
			popParams.mydtCusno = this.getUserInfo('mydtCusno')  //마이데이타고객번호
			popParams.naWrsLclc = "000"  //경제통합상품대분류코드
			popParams.naWrsMclc = "000"  //경제통합상품중분류코드
			popParams.naWrsSclc = "000"  //경제통합상품소분류코드
			popParams.wrsPathTxt = this.prmNaWrsSclfnm

            console.log("[SZFR2103]fn_openCultPlotPop/(popParams)callType =>> " ,popParams.callType)
            console.log("[SZFR2103]fn_openCultPlotPop/(popParams)마이데이타고객번호 =>> " ,popParams.mydtCusno)
            console.log("[SZFR2103]fn_openCultPlotPop/(popParams)경제통합상품대분류코드 =>> " ,popParams.naWrsLclc)
            console.log("[SZFR2103]fn_openCultPlotPop/(popParams)경제통합상품중분류코드 =>> " ,popParams.naWrsMclc)
            console.log("[SZFR2103]fn_openCultPlotPop/(popParams)경제통합상품소분류코드 =>> " ,popParams.naWrsSclc)
            console.log("[SZFR2103]fn_openCultPlotPop/(param)작목명 =>> " ,this.prmNaWrsSclfnm)
            console.log("[SZFR2103]fn_openCultPlotPop/(popParams)작목명 =>> " ,popParams.wrsPathTxt)

            const config = {
				component : SZST2105, //작목재배지관리(POP)
				params : {"objAreaInfo" : popParams}
			}	    

			modalService.openPopup(config).then(response => {

				console.log("[SZFR2103]fn_openCultPlotPop/(response)flag=>> " ,response.flag)

				if (response.flag === "DONE") {
					//this.getData()

					this.prmCulplRgnC  = response.culplRgnC   //(변수)재배지지역코드 = (response)재배지지역코드
					this.prmCulplRgnNm = response.provnm+' '+response.ccwnm+' '+response.ttvnm  //(변수)재배지지역명 = (response)시도명+(response)시군구명+(response)읍면동명

					console.log("[SZFR2103]fn_openCultPlotPop/(response)재배지지역코드=>> " ,response.culplRgnC)
					console.log("[SZFR2103]fn_openCultPlotPop/(response)시도명|시군구명|읍면동명=>> " ,response.provnm, response.ccwnm, response.ttvnm)
					//	
					
					this.getWeathList()    //기상정보 조회
				}
			})

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

			console.log(" >>> [SZFR2103]작업설정(Start) <<<")

			console.log(" >>> [SZFR2103]fn_openSlidePop/이전-(변수)상품분류코드(대분류)=>> "+ this.prmNaWrsLclc)
			console.log(" >>> [SZFR2103]fn_openSlidePop/이전-(변수)상품분류코드(중분류)=>> "+ this.prmNaWrsMclc)
			console.log(" >>> [SZFR2103]fn_openSlidePop/이전-(변수)상품분류코드(소분류)=>> "+ this.prmNaWrsSclc)
			console.log(" >>> [SZFR2103]fn_openSlidePop/이전-(변수)재배지지역코드=>> "+ this.prmCulplRgnC)

			//상품분류코드(대분류) and 상품분류코드(중분류) and 상품분류코드(소분류)의 값이 빈값일 경우
			if (this.prmNaWrsLclc === '' && this.prmNaWrsMclc === '' && this.prmNaWrsSclc === '' ) {
                this.prmNaWrsLclc = '000'
                this.prmNaWrsMclc = '000'
                this.prmNaWrsSclc = '000'
			}	

			console.log(" >>> [SZFR2103]fn_openSlidePop/이후-(변수)상품분류코드(대분류)=>> "+ this.prmNaWrsLclc)
			console.log(" >>> [SZFR2103]fn_openSlidePop/이후-(변수)상품분류코드(중분류)=>> "+ this.prmNaWrsMclc)
			console.log(" >>> [SZFR2103]fn_openSlidePop/이후-(변수)상품분류코드(소분류)=>> "+ this.prmNaWrsSclc)

			const config = {
				params: { // 파라미터
					naWrsLclc      : this.prmNaWrsLclc, 	//상품분류코드(대분류)   
					naWrsMclc      : this.prmNaWrsMclc, 	//상품분류코드(중분류)
					naWrsSclc      : this.prmNaWrsSclc, 	//상품분류코드(소분류)
					culplRgnC      : this.prmCulplRgnC,     //재배지지역코드 = (변수)재배지지역코드
                 },

                 renderer : {
                      component : SZFR2105 //작업설정 POP
                 }
             };

             modalService.openSlidePagePopup(config).then(response => {

				this.fangWkDsnm = response.fangWkDsnm    //(입력필드)영농작업구분명 = response.영농작업구분명
				this.fangWknm 	= response.fangWkDsExpl  //(입력필드)영농작업구분설명 = response.영농작업구분설명

				console.log(" >>> [SZFR2103]fn_openSlidePop/영농작업구분명=>> "+ this.fangWkDsnm)
				console.log(" >>> [SZFR2103]fn_openSlidePop/영농작업구분설명=>> "+ this.fangWknm)

				// 다음 항목 이동
                this.$nextTick(()=>{
                    if(e !== null) this.moveNextTag(e)
				})
				
             })

			console.log(" >>> [SZFR2103]작업설정(End) <<<")
		},

        //**************
        // [날씨정보 툴팁열기]버튼 클릭
        //***************/
		toolTipOpenPopup() {

			this.isTlTipYn = true
		},

        //**************
        // [날씨정보 툴팁닫기]버튼 클릭
        //***************/
		toolTipClosePopup() {

			this.isTlTipYn = false
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

		fn_abc(e)
		{
			//this.ymd = this.currentYear+""+this.currentMonth+""+this.currentDay

			let changeDt = e.target.value
			changeDt = changeDt.split("-").join("");
	
			//if ( this.ymd !== changeDt) {
				this.prmWkDt = changeDt

                this.getWeathList()  //기상정보 조회
			//}
 
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

					if (Number(this.hour1) > 23) {
						this.alert("자가인력(남)-시간은 "+Msg_hour).then(()=>{
							this.hour1 = ""
							this.$refs.hour1.focus()
						})
						return false
					}  

				} else if (str === "hour2") {

					this.hour2 = this.hour2.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.hour2) > 23) {
						this.alert("자가인력(여)-시간은 "+Msg_hour).then(()=>{
							this.hour2 = ""
							this.$refs.hour2.focus()
						})
						return false
					}  

				} else if (str === "hour3") {

					this.hour3 = this.hour3.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.hour3) > 23) {
						this.alert("고용인력(남)-시간은 "+Msg_hour).then(()=>{
							this.hour3 = ""
							this.$refs.hour2.focus()
						})
						return false
					}  

				} else if (str === "hour4") {

					this.hour4 = this.hour4.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

					if (Number(this.hour4) > 23) {
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

		/*
		* [달력] 선택시
		*/
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
					
					//작목재배지코드가 미존재할 경우
					if (this.prmCulplRgnC === "") {
						modalService.alert("선택상단의 재배지 등록을 선작업 하시기 바랍니다.").then(() => {
						});
						return;
					}

					this.fn_abc(evt)
					this.moveNextTag(evt)
                }            
            })

        },		
    },

}
</script>