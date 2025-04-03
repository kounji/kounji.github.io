<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > NH콕마이카
* @ 페이지설명 : 금융생활 > NH콕마이카 > 신차 상세정보
* @ 파일명     : src\views\page\AN\CA\ANCA2204\ANCA2204.vue
* @ 작성자     : CS528043
* @ 작성일     : 2022-08-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-11              CS528043              최초작성(신규)
*************************************************************************/
-->

<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>신차 상세 정보</h1>
			<a href="javascript:void(0);" class="btn_back" @click.prevent="close()"><span class="blind">이전화면</span></a>
		</div>
		
		<div class="popup_content com_no_bottom pt0"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="custom_box">
					<div class="top_info_box type02 noBG hasdetail top-tit-info-box">
						<div class="car_top_wrap">
							<div class="car-detail-info">
								<div class="car_name">
                                    {{carBrannm}} {{carModlnm}}<br/>
                                    {{carCtrimNm}}
								</div>
								<div class="car_detail_stat">
									<span class="car_cate">
										{{cartpDscnm}}
										<dl class="date">
											<dt>기준일</dt>
											<!-- 
												2022-07-20 : 마크업 수정
												수정 전 : <dd>2022.10</dd>
												수정 후 : <dd><em class="num">2022.10</em></dd>
											-->
											<dd><em class="num">{{carModlMktgDt |dateFilter('YYYY.MM')}}</em></dd>
										</dl>
									</span>
									<span class="price" v-html="fn_numberFormatKorAmt">
										<!-- <em class="num">21</em>
										<em class="unit">억</em>
										<span class="num">2,280</span>
										<em class="unit">만원</em> -->
									</span>
									<!-- 20211130 한별 추가 S -->
									<!--// 20211130 한별 추가 E -->
								</div>
							</div>
							<div class="car_pic">
                                <img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new01.png" :alt="setAlt(carBrannm, carModlnm, carCtrimNm)">
                                <img v-else :src="fn_setImgUrl(carCtrimBscImgPathnm)" @error="emptyImg" :alt="setAlt(carBrannm, carModlnm, carCtrimNm)">	
							</div>
						</div>
					</div>
				</div>
				
				<div class="custom_box">
                    <!-- 엔진 -->
                    <!-- <template v-show="carEgneFomCntn !== '' || (carXhstqtCntn !== '' && Number(carXhstqtCntn) != 0) || carFuelCntn !== '' || carMaxPrtoCntn !== '' || carMaxTgueCntn !== '' || btrmCarMxPrtoCntn !== '' || btrmCarMaxTgueCntn !== '' || btrmCarBtryKdCntn !== '' || btrmCarOdmtrPsbDistCntn !== ''">                     -->
                        <!-- Toggle Box S -->
                        <div class="com_box_type01 com_box_list02 car-custom-box mt30">
                            <div class="list_type_box toggle_list_box2">							
                                <!-- Toggle Btn Title S -->
                                <div class="com_boxshadow_type01 open"  data-ui-toggle="box">
                                    <button type="button" class="view_btn" aria-expanded="true">
                                        <div class="new_tit_area">
                                            <div class="tit"><span>엔진</span></div>
                                        </div>
                                    </button>
                                </div>
                                <!-- Toggle Btn Title E -->
                                
                                <!-- Toggle Content S -->
                                <ul class="list_type_02 view_cont">
                                    <!-- <template v-if="carEgneFomCntn !== ''"> -->
                                        <li>
                                            <dl>
                                                <dt>
                                                    <em>엔진타입</em>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="unit">{{fn_isEmpty(carEgneFomCntn)}}</em>
                                                        <!-- <em class="num">4</em>
                                                        <em class="unit">기통</em> -->
                                                    </span>
                                                </dd>
                                            </dl>
                                        </li>
                                    <!-- </template>     -->
                                    <!-- <template v-if="carXhstqtCntn !== '' && Number(carXhstqtCntn) != 0"> -->
                                        <li>
                                            <dl>
                                                <dt>
                                                    <em>배기량</em>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="num">{{fn_isEmpty(carXhstqtCntn) | numberFilter}}</em>
                                                    </span>
                                                </dd>
                                            </dl>
                                        </li>
                                    <!-- </template>     -->
                                    <!-- <template v-if="carFuelCntn !== ''"> -->
                                        <li>
                                            <dl>
                                                <dt>
                                                    <em>연료</em>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="unit">{{fn_isEmpty(carFuelCntn)}}</em>
                                                    </span>
                                                </dd>
                                            </dl>
                                        </li>
                                    <!-- </template> -->

                                    <!-- 자동차가 전기/하이브리드가 아닌경우 -->
                                    <template v-if="carOilC !== 'E' && carOilC !== 'X'">
                                        <!-- 일반차 -->    
                                        <!-- <template v-if="carMaxPrtoCntn !== ''"> -->
                                            <li>
                                                <dl>
                                                    <dt>
                                                        <em>최고출력</em>
                                                    </dt>
                                                    <dd>
                                                        <span class="com_price">
                                                            <em class="num">{{fn_isEmpty(carMaxPrtoCntn)}}hp</em>
                                                        </span>
                                                    </dd>
                                                </dl>
                                            </li>
                                        <!-- </template>     -->
                                        <!-- <template v-if="carMaxTgueCntn !== ''"> -->
                                            <li>
                                                <dl>
                                                    <dt>
                                                        <em>최대토크</em>
                                                    </dt>
                                                    <dd>
                                                        <span class="com_price">
                                                            <em class="num">{{fn_isEmpty(carMaxTgueCntn)}}kg.m</em>
                                                        </span>
                                                    </dd>
                                                </dl>
                                            </li>
                                        <!-- </template> -->
                                    </template>
                                    <!-- 자동차가 전기/하이브리드 경우 -->
                                    <template v-else>
                                        <!-- 전기차 -->
                                        <!-- <template v-if="btrmCarMxPrtoCntn !== ''"> -->
                                            <li>
                                                <dl>
                                                    <dt>
                                                        <em>최고출력(전기)</em>
                                                    </dt>
                                                    <dd>
                                                        <span class="com_price">
                                                            <em class="num">{{fn_isEmpty(btrmCarMxPrtoCntn)}}kW</em>
                                                        </span>
                                                    </dd>
                                                </dl>
                                            </li>
                                        <!-- </template> -->
                                        <!-- <template v-if="btrmCarMaxTgueCntn !== ''"> -->
                                            <li>
                                                <dl>
                                                    <dt>
                                                        <em>최대토크(전기)</em>
                                                    </dt>
                                                    <dd>
                                                        <span class="com_price">
                                                            <em class="num">{{fn_isEmpty(btrmCarMaxTgueCntn)}}Nm</em>
                                                        </span>
                                                    </dd>
                                                </dl>
                                            </li>
                                        <!-- </template> -->
                                        <!-- <template v-if="btrmCarBtryKdCntn !== ''"> -->
                                            <li>
                                                <dl>
                                                    <dt>
                                                        <em>배터리종류(전기)</em>
                                                    </dt>
                                                    <dd>
                                                        <span class="com_price">
                                                            <em class="unit">{{fn_isEmpty(btrmCarBtryKdCntn)}}</em>
                                                        </span>
                                                    </dd>
                                                </dl>
                                            </li>
                                        <!-- </template> -->
                                        <!-- <template v-if="btrmCarOdmtrPsbDistCntn !== ''"> -->
                                            <li>
                                                <dl>
                                                    <dt>
                                                        <em>1회 완충 시 주행거리</em>
                                                    </dt>
                                                    <dd>
                                                        <span class="com_price">
                                                            <em class="num">{{fn_isEmpty(btrmCarOdmtrPsbDistCntn)}}km</em>
                                                        </span>
                                                    </dd>
                                                </dl>
                                            </li>
                                        <!-- </template>  -->

                                        
                                    </template>
                                </ul>
                                <!-- Toggle Content E -->
                            </div>
                        </div>
                        <!-- Toggle Box E -->
                    <!-- </template> -->

                    <!-- 성능(정보제공 안함) -->
                    <!-- <template v-show="carMxSpdCntn !== '' || carAcclPfrmCntn !== '' || trmCarMxSpdCntn !== '' || btrmCarAcclPfrmCntn !== ''"> -->
                        <!-- Toggle Box S -->
                        <div class="com_box_type01 com_box_list02 car-custom-box">
                            <div class="list_type_box toggle_list_box2">
                                
                                <!-- Toggle Btn Title S -->
                                <div class="com_boxshadow_type01 open"  data-ui-toggle="box">
                                    <button type="button" class="view_btn" aria-expanded="true">
                                        <div class="new_tit_area">
                                            <div class="tit"><span>성능</span></div>
                                        </div>
                                    </button>
                                </div>
                                <!-- Toggle Btn Title E -->
                                
                                <!-- Toggle Content S -->
                                <ul class="list_type_02 view_cont">
                                    <!-- <template v-if="carMxSpdCntn !== ''"> -->
                                    <!-- 자동차가 전기/하이브리드가 아닌경우 -->
                                    <template v-if="carOilC !== 'E' && carOilC !== 'X'">
                                        <li>
                                            <dl>
                                                <dt>
                                                    <em>최고속도</em>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="num">{{fn_isEmpty(carMxSpdCntn)}}km/h</em>
                                                    </span>
                                                </dd>
                                            </dl>
                                        </li>
                                    <!-- </template> -->
                                    <!-- <template v-if="carAcclPfrmCntn !== ''"> -->
                                        <li>
                                            <dl>	
                                                <dt>
                                                    <em>가속성능</em>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="num">{{fn_isEmpty(carAcclPfrmCntn)}}초</em>
                                                        <!-- <em class="unit">초</em> -->
                                                    </span>
                                                </dd>
                                            </dl>
                                        </li>
                                    </template>                                        
                                    <!-- </template> -->
                                    <!-- <template v-if="trmCarMxSpdCntn !== ''"> -->
                                    <template v-else>
                                        <li>
                                            <dl>
                                                <dt>
                                                    <em>최고속도(전기)</em>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="num">{{fn_isEmpty(trmCarMxSpdCntn)}}km/h</em>
                                                    </span>
                                                </dd>
                                            </dl>
                                        </li>
                                    <!-- </template> -->
                                    <!-- <template v-if="btrmCarAcclPfrmCntn !== ''"> -->
                                        <li>
                                            <dl>	
                                                <dt>
                                                    <em>가속성능(전기)</em>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="num">{{fn_isEmpty(btrmCarAcclPfrmCntn)}}초</em>
                                                        <!-- <em class="unit">초</em> -->
                                                    </span>
                                                </dd>
                                            </dl>
                                        </li>
                                    </template>    
                                    <!-- </template>-->
                                </ul>
                                <!-- Toggle Content E -->

                            </div>
                        </div>
                        <!-- Toggle Box E -->
                    <!-- </template> -->

                    <!-- 치수 -->
                    <!-- <template v-show="carAllLenCntn !== '' || carAllWidtCntn !== '' || fwhlWidtCntn !== ''  || rwhlWidtCntn !== ''"> -->
                        <!-- Toggle Box S -->
                        <div class="com_box_type01 com_box_list02 car-custom-box">
                            <div class="list_type_box toggle_list_box2">
                                
                                <!-- Toggle Btn Title S -->
                                <div class="com_boxshadow_type01 open"  data-ui-toggle="box">
                                    <button type="button" class="view_btn" aria-expanded="true">
                                        <div class="new_tit_area">
                                            <div class="tit"><span>치수</span></div>
                                        </div>
                                    </button>
                                </div>
                                <!-- Toggle Btn Title E -->

                                <!-- Toggle Content S -->
                                <ul class="list_type_02 view_cont">
                                    <!-- <template v-if="carAllLenCntn !== ''"> -->
                                        <li>
                                            <dl>
                                                <dt>
                                                    <em>전장</em>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="num">{{fn_isEmpty(carAllLenCntn)}}mm</em>
                                                    </span>
                                                </dd>
                                            </dl>
                                        </li>
                                    <!-- </template> -->
                                    <!-- <template v-if="carAllWidtCntn !== ''"> -->
                                        <li>
                                            <dl>	
                                                <dt>
                                                    <em>전폭</em>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="num">{{fn_isEmpty(carAllWidtCntn)}}mm</em>
                                                    </span>
                                                </dd>
                                            </dl>
                                        </li>
                                    <!-- </template> -->
                                    <!-- <template v-if="fwhlWidtCntn !== ''"> -->
                                        <li>
                                            <dl>	
                                                <dt>
                                                    <em>타이어(전)</em>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="num">{{fn_isEmpty(fwhlWidtCntn)}}</em>
                                                    </span>
                                                </dd>
                                            </dl>
                                        </li>
                                    <!-- </template> -->
                                    <!-- <template v-if="rwhlWidtCntn !== ''"> -->
                                        <li>
                                            <dl>	
                                                <dt>
                                                    <em>타이어(후)</em>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="num">{{fn_isEmpty(rwhlWidtCntn)}}</em>
                                                    </span>
                                                </dd>
                                            </dl>
                                        </li>
                                    <!-- </template> -->
                                </ul>
                                <!-- Toggle Content E -->

                            </div>
                        </div>
                        <!-- Toggle Box E -->
                    <!-- </template> -->

                    <!-- 섀시 -->
                    <!-- <template v-show="carDrveFomCntn !== '' || fwhlSspsnCntn !== '' || rwhlSspsnCntn !== ''"> -->
                    <!-- Toggle Box S -->
                    <div class="com_box_type01 com_box_list02 car-custom-box">
                        <div class="list_type_box toggle_list_box2">
                            
                            <!-- Toggle Btn Title S -->
                            <div class="com_boxshadow_type01 open"  data-ui-toggle="box">
                                <button type="button" class="view_btn" aria-expanded="true">
                                    <div class="new_tit_area">
                                        <div class="tit"><span>섀시</span></div>
                                    </div>
                                </button>
                            </div>
                            <!-- Toggle Btn Title E -->

                            <!-- Toggle Content S -->
                            <ul class="list_type_02 view_cont">
                                <!-- <template v-if="carDrveFomCntn !== ''"> -->
                                <li>
                                    <dl>
                                        <dt>
                                            <em>구동방식</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="unit">{{fn_isEmpty(carDrveFomCntn)}}</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </li>
                                <!-- </template> -->
                                <!-- <template v-if="fwhlSspsnCntn !== ''"> -->
                                <li>
                                    <dl>	
                                        <dt>
                                            <em>서스펜션(전)</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="unit">{{fn_isEmpty(fwhlSspsnCntn)}}</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </li>
                                <!-- </template> -->
                            <!-- <template v-if="rwhlSspsnCntn !== ''"> -->
                                <li>
                                    <dl>	
                                        <dt>
                                            <em>서스펜션(후)</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="unit">{{fn_isEmpty(fwhlSspsnCntn)}}</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </li>
                                <!-- </template> -->
                            </ul>
                            <!-- Toggle Content E -->
                        </div>
                    </div>
                    <!-- Toggle Box E -->
                    <!-- </template> -->
				</div>

				<!-- 
					기획서 12쪽 : NHMFM-PD-DS-03-UI 레이아웃-제휴서비스(AN)_v0.95(20220722)_취합본.pptx
					날짜 : 2022-07-22
					변경 : 마크업 추가
					기타 : 배너추가
				-->
				<div class="custom_box">
					<div class="inner_banner">
						<!-- 좋은 가격에 이차 탈래요 -->
						<a href="javascript:void(0);" role="button" title="링크" @click.prevent="fn_openBrowser()">
							<!-- 
								날짜 : 2022-07-28
								변경 전 : <div class="com_box_type03 bg24">
								변경 후 : <div class="com_box_type03 bg23">
                            -->
							<!-- <div class="com_box_type03 bg23">
								<div class="text">
									내가 원하는 맞춤 견적으로
									<span>좋은 가격에 이차 탈래요!</span>
								</div>
							</div> -->
							<!-- 2022-09-28 : 이미지로 교체 -->
							<img src="@/assets/images/banner/img_benner_06.png" alt="내가 원하는 맞춤 견적으로 좋은 가격에 이차 탈래요!">                            
						</a>
					</div>
				</div>
			</div>
        </div>
        <a href="javascript:void(0);" class="btn_close" @click.prevent="close('reload')"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->        
</template>

<script>
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {numberFormat} from '@/utils/number'
import {dateFormat}  from '@/utils/date'

export default {
    name : "ANCA2204",
    data: () => {
		return {
			// etc
            pdcaUserAgent            : "",        // 실행플랫폼 (ios, android, else)
            basYm                    : "",        // 기준년월

            // input
			mydtCusno                : "",        // 마이데이터고객번호
			carCtrimNo               : "",        // 자동차트림번호
            
            // output(기본)
            carCtrimNm               : "",        // 자동차트림명
            carBranNo                : "",        // 자동차브랜드번호
            carBrannm                : "",        // 자동차브랜드명
            carModlNo                : "",        // 자동차모델번호
            carModlnm                : "",        // 자동차모델명
            carLineupMdyrNm          : "",        // 자동차라인업연식명
            carCtrimSelAm            : 0,         // 자동차트림판매금액
            carCtrimBscImgPathnm     : "",        // 자동차트림기본이미지경로명
			carCtrimCvrImgPathnm     : "",        // 자동차트림커버이미지경로명
			carCtrimElgtImgPathnm    : "",        // 자동차트림확대이미지경로명
            cartpDsc                 : "",        // 차종구분코드
            cartpDscnm               : "",        // 차종구분명
            carOilC                  : "",        // 자동차유류코드
            carOilCnm                : "",        // 자동차유류코드명
            carSelRgnC               : "",        // 자동차판매지역코드  
            carSelRgnCnm             : "",        // 자동차판매지역코드명
            carModlMktgDt            : "",        // 자동차모델출시일자 

            // output(제원)
            carAllHghtCntn           : "",        // 자동차전체높이내용
            carCdstCntn              : "",        // 자동차축간거리내용
            fwhlRradCntn             : "",        // 전륜윤간거리내용
            rwhlRradCntn             : "",        // 후륜윤간거리내용
            carCboxLenCntn           : "",        // 자동차적재함길이내용
            carCboxWidtCntn          : "",        // 자동차적재함폭내용
            carCboxHghtCntn	         : "",        // 자동차적재함높이내용
            carUshetCntn             : "",        // 자동차상면고내용
            loadCapCntn	             : "",        // 적재용량내용
            carTrunkCapCntn          : "",        // 자동차트렁크용량내용
            carEgneMxPrtoCrpmCntn    : "",        // 자동차엔진최고출력CRPM내용
            carEgneMaxTgueCrpmCntn   : "",        // 자동차엔진최대토크CRPM내용
            carFuelCapCntn           : "",        // 자동차연료용량내용
            carCmpoMilCntn           : "",        // 자동차복합연비내용
            carDwntnMilCntn          : "",        // 자동차도심연비내용
            carExwyMilCntn           : "",        // 자동차고속도로연비내용
            carCo2DcgCapCntn         : "",        // 자동차CO2배출용량내용
            vcarWtCntn               : "",        // 공차중량내용
            carTrsmsCntn             : "",        // 자동차변속기내용
            carRideFxdnoCntn         : "",        // 자동차승차정원내용
            carGrnOdmdsCntn          : "",        // 자동차보증주행거리내용
            carDrvsyGrnPrdCntn       : "",        // 자동차구동계보증기간내용
            carDcgGasCatlytGrnCntn   : "",        // 자동차배출가스촉매보증내용
            carEtcDcgGasGrnCntn      : "",        // 자동차기타배출가스보증내용
            emvBtryCapCntn           : "",        // 전기차배터리용량내용
            btrmCarRtngVoltCntn      : "",        // 전기자동차정격전압내용
            btrmCarElccrCapCntn      : "",        // 전기자동차전류용량내용
            emvTm1ChggDwntnOdmdsCntn : "",        // 전기차1회충전도심주행거리내용
            emvTm1ChggExwyOdmdsCntn  : "",        // 전기차1회충전고속도로주행거리내용
            dataStsc                 : "",        // 데이터상태코드
            chgDt                    : "",        // 변경일자

            // 화면에 표시되는 정보
            carEgneFomCntn           : "",        // 자동차엔진형식내용(엔진타입)
            carXhstqtCntn            : "",        // 자동차배기량내용(배기량)
            carFuelCntn              : "",        // 자동차연료내용(연료)
            
            // 일반차
            carMaxPrtoCntn           : "",        // 자동차최대출력내용(최고출력)
            carMaxTgueCntn           : "",        // 자동차최대토크내용(최대토크)
            
            // 전기차
            btrmCarMxPrtoCntn        : "",        // 전기자동차최고출력내용(최고출력(전기))
            btrmCarMaxTgueCntn       : "",        // 전기자동차최대토크내용(최대토크(전기))
            btrmCarBtryKdCntn        : "",        // 전기자동차배터리종류내용(배터리종류(전기))
            btrmCarOdmtrPsbDistCntn  : "",        // 전기자동차주행가능거리내용(1회 완충시 주행거리)
                        
            // 치수
            carAllLenCntn            : "",        // 자동차전체길이내용(전장)
            carAllWidtCntn           : "",        // 자동차전체폭내용(전폭)
            fwhlWidtCntn             : "",        // 전륜폭내용
            rwhlWidtCntn             : "",        // 후륜폭내용

            // 아래정보는 카동에서 제공안함
            fwhlFltrtCntn            : "",        // 전륜편평비내용(타이어)
            fwhlGaugCntn             : "",        // 전륜내경내용(타이어)
            rwhlFltrtCntn            : "",        // 후륜편평비내용(타이어)
            rwhlGaugCntn             : "",        // 후륜내경내용(타이어)

            // 성능
            carMxSpdCntn             : "",        // 자동차최고속도내용(최고속도)
            carAcclPfrmCntn          : "",        // 자동차가속성능내용(가속성능)
            trmCarMxSpdCntn          : "",        // 전기자동차최고속도내용(최고속도(전기))
            btrmCarAcclPfrmCntn      : "",        // 전기자동차가속성능내용(가속성능(전기))

            // 섀시
            carDrveFomCntn           : "",        // 자동차구동형식내용(구동방식)
            fwhlSspsnCntn            : "",        // 전륜서스펜션내용(서스펜션(전))
            rwhlSspsnCntn            : "",        // 후륜서스펜션내용(서스펜션(후))
        }
	},
    mixins: [
        popupMixin
        ,commonMixin
	],
    mounted() {
		this.initComponent(this.params)
		
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(params) {

			// 실행플랫폼
			// chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
			if(this.getUserInfo('chnl') === '385') {
				this.pdcaUserAgent = appService.getUserAgent()
			} else if(this.getUserInfo('chnl') === '386') {

				// 기기로 접속하였을 경우는 true
				if((window.$SMNATIVE.getOS('A') == true && window.$SMNATIVE.getOS('I') == false) || (window.$SMNATIVE.getOS('A') == false && window.$SMNATIVE.getOS('I') == true)) {
					this.pdcaUserAgent = 'cok'
				} else {
					this.pdcaUserAgent = 'else'
				}
			}

			// 파라미터 셋팅(임시)
            this.mydtCusno   = this.getUserInfo('mydtCusno')      // 마이데이터 고객번호
            this.carCtrimNo  = params.carCtrimNo                  // 자동차트림번호
			this.basYm       = dateFormat(new Date(), 'YYYYMM') // 기준년월
            console.log("파라미터 트림코드 : ", this.carCtrimNo)

			// 조회
			this.getData()
		},		
        getData() {
			const config = {
				url: '/an/ca/04ra1',
                data: {"mydtCusno":this.mydtCusno // 마이데이터 고객번호
                      ,"carCtrimNo":this.carCtrimNo // 자동차트림번호
					}
            }

            apiService.call(config).then(response => {
                console.log('응답값 : ', response)

                // 기본정보
                this.carCtrimNm               = response.carCtrimNm               || ""     // 자동차트림명
                this.carBranNo                = response.carBranNo                || ""     // 자동차브랜드번호
                this.carBrannm                = response.carBrannm                || ""     // 자동차브랜드명
                this.carModlNo                = response.carModlNo                || ""     // 자동차모델번호
                this.carModlnm                = response.carModlnm                || ""     // 자동차모델명
                this.carLineupMdyrNm          = response.carLineupMdyrNm          || ""     // 자동차라인업연식명
                this.carCtrimSelAm            = response.carCtrimSelAm            || 0      // 자동차트림판매금액
                this.carCtrimBscImgPathnm     = response.carCtrimBscImgPathnm     || ""     // 자동차트림기본이미지경로명
                this.carCtrimCvrImgPathnm     = response.carCtrimCvrImgPathnm     || ""     // 자동차트림커버이미지경로명
                this.carCtrimElgtImgPathnm    = response.carCtrimElgtImgPathnm    || ""     // 자동차트림확대이미지경로명
                this.cartpDsc                 = response.cartpDsc                 || ""     // 차종구분코드
                this.cartpDscnm               = response.cartpDscnm               || ""     // 차종구분명             
                this.carOilC                  = response.carOilC                  || ""     // 자동차유류코드
                this.carOilCnm                = response.carOilCnm                || ""     // 자동차유류코드명                
                this.carSelRgnC               = response.carSelRgnC               || ""     // 자동차판매지역코드  
                this.carSelRgnCnm             = response.carSelRgnCnm             || ""     // 자동차판매지역코드명
                this.carModlMktgDt            = response.carModlMktgDt            || ""     // 자동차모델출시일자

                // 상세정보
                this.carAllHghtCntn           = response.carAllHghtCntn           || ""     // 자동차전체높이내용
                this.carCdstCntn              = response.carCdstCntn              || ""     // 자동차축간거리내용
                this.fwhlRradCntn             = response.fwhlRradCntn             || ""     // 전륜윤간거리내용
                this.rwhlRradCntn             = response.rwhlRradCntn             || ""     // 후륜윤간거리내용
                this.carCboxLenCntn           = response.carCboxLenCntn           || ""     // 자동차적재함길이내용
                this.carCboxWidtCntn          = response.carCboxWidtCntn          || ""     // 자동차적재함폭내용
                this.carCboxHghtCntn	      = response.carCboxHghtCntn          || ""     // 자동차적재함높이내용
                this.carUshetCntn             = response.carUshetCntn             || ""     // 자동차상면고내용
                this.loadCapCntn	          = response.loadCapCntn              || ""     // 적재용량내용
                this.carTrunkCapCntn          = response.carTrunkCapCntn          || ""     // 자동차트렁크용량내용
                this.carEgneMxPrtoCrpmCntn    = response.carEgneMxPrtoCrpmCntn    || ""     // 자동차엔진최고출력CRPM내용
                this.carEgneMaxTgueCrpmCntn   = response.carEgneMaxTgueCrpmCntn   || ""     // 자동차엔진최대토크CRPM내용
                this.carFuelCapCntn           = response.carFuelCapCntn           || ""     // 자동차연료용량내용
                this.carCmpoMilCntn           = response.carCmpoMilCntn           || ""     // 자동차복합연비내용
                this.carDwntnMilCntn          = response.carDwntnMilCntn          || ""     // 자동차도심연비내용
                this.carExwyMilCntn           = response.carExwyMilCntn           || ""     // 자동차고속도로연비내용
                this.carCo2DcgCapCntn         = response.carCo2DcgCapCntn         || ""     // 자동차CO2배출용량내용
                this.vcarWtCntn               = response.vcarWtCntn               || ""     // 공차중량내용
                this.carTrsmsCntn             = response.carTrsmsCntn             || ""     // 자동차변속기내용
                this.carRideFxdnoCntn         = response.carRideFxdnoCntn         || ""     // 자동차승차정원내용
                this.carGrnOdmdsCntn          = response.carGrnOdmdsCntn          || ""     // 자동차보증주행거리내용
                this.carDrvsyGrnPrdCntn       = response.carDrvsyGrnPrdCntn       || ""     // 자동차구동계보증기간내용
                this.carDcgGasCatlytGrnCntn   = response.carDcgGasCatlytGrnCntn   || ""     // 자동차배출가스촉매보증내용
                this.carEtcDcgGasGrnCntn      = response.carEtcDcgGasGrnCntn      || ""     // 자동차기타배출가스보증내용
                this.emvBtryCapCntn           = response.emvBtryCapCntn           || ""     // 전기차배터리용량내용
                this.btrmCarRtngVoltCntn      = response.btrmCarRtngVoltCntn      || ""     // 전기자동차정격전압내용
                this.btrmCarElccrCapCntn      = response.btrmCarElccrCapCntn      || ""     // 전기자동차전류용량내용
                this.emvTm1ChggDwntnOdmdsCntn = response.emvTm1ChggDwntnOdmdsCntn || ""     // 전기차1회충전도심주행거리내용
                this.emvTm1ChggExwyOdmdsCntn  = response.emvTm1ChggExwyOdmdsCntn  || ""     // 전기차1회충전고속도로주행거리내용
                this.dataStsc                 = response.dataStsc                 || ""     // 데이터상태코드
                this.chgDt                    = response.chgDt                    || ""     // 변경일자

                // 화면에 표시되는 정보
                this.carEgneFomCntn           = response.carEgneFomCntn           || ""     // 자동차엔진형식내용(엔진타입)
                this.carXhstqtCntn            = response.carXhstqtCntn            || ""     // 자동차배기량내용(배기량)
                this.carFuelCntn              = response.carFuelCntn              || ""     // 자동차연료내용(연료)
            
                 // 일반차
                this.carMaxPrtoCntn           = response.carMaxPrtoCntn           || ""     // 자동차최대출력내용(최고출력)
                this.carMaxTgueCntn           = response.carMaxTgueCntn           || ""     // 자동차최대토크내용(최대토크)
            
                // 전기차
                this.btrmCarMxPrtoCntn        = response.btrmCarMxPrtoCntn        || ""     // 전기자동차최고출력내용(최고출력(전기))
                this.btrmCarMaxTgueCntn       = response.btrmCarMaxTgueCntn       || ""     // 전기자동차최대토크내용(최대토크(전기))
                this.btrmCarBtryKdCntn        = response.btrmCarBtryKdCntn        || ""     // 전기자동차배터리종류내용(배터리종류(전기))
                this.btrmCarOdmtrPsbDistCntn  = response.btrmCarOdmtrPsbDistCntn  || ""     // 전기자동차주행가능거리내용(1회 완충시 주행거리)
                        
                // 치수
                this.carAllLenCntn            = response.carAllLenCntn            || ""     // 자동차전체길이내용(전장)
                this.carAllWidtCntn           = response.carAllWidtCntn           || ""     // 자동차전체폭내용(전폭)
                this.fwhlWidtCntn             = response.fwhlWidtCntn             || ""     // 전륜폭내용
                this.rwhlWidtCntn             = response.rwhlWidtCntn             || ""     // 후륜폭내용

                // 아래정보는 카동에서 제공안함
                this.fwhlFltrtCntn            = response.fwhlFltrtCntn            || ""     // 전륜편평비내용(타이어)
                this.fwhlGaugCntn             = response.fwhlGaugCntn             || ""     // 전륜내경내용(타이어)
                this.rwhlFltrtCntn            = response.rwhlFltrtCntn            || ""     // 후륜편평비내용(타이어)
                this.rwhlGaugCntn             = response.rwhlGaugCntn             || ""     // 후륜내경내용(타이어)
                
                // 성능(빈칸으로 표시)
                this.carMxSpdCntn             = response.carMxSpdCntn             || ""     // 자동차최고속도내용(최고속도)
                this.carAcclPfrmCntn          = response.carAcclPfrmCntn          || ""     // 자동차가속성능내용(가속성능)
                this.trmCarMxSpdCntn          = response.trmCarMxSpdCntn          || ""     // 전기자동차최고속도내용(최고속도(전기))
                this.btrmCarAcclPfrmCntn      = response.btrmCarAcclPfrmCntn      || ""     // 전기자동차가속성능내용(가속성능(전기))
                
                // 섀시(빈칸으로 표시)
                this.carDrveFomCntn           = response.carDrveFomCntn           ||  ""     // 자동차구동형식내용(구동방식)
                this.fwhlSspsnCntn            = response.fwhlSspsnCntn            ||  ""     // 전륜서스펜션내용(서스펜션(전))
                this.rwhlSspsnCntn            = response.rwhlSspsnCntn            ||  ""     // 후륜서스펜션내용(서스펜션(후))


                // test
                let test1 = this.fn_isEmpty(1234)
                let test2 = this.fn_isEmpty('5678')
                let test3 = this.fn_isEmpty("")
                let test4 = this.fn_isEmpty(null)
                let test5 = this.fn_isEmpty(undefined)
                let test6 = this.fn_isEmpty("undefined")
                let test7 = this.fn_isEmpty("TESTDATA")

                console.log("test1 : ", test1)
                console.log("test2 : ", test2)
                console.log("test3 : ", test3)
                console.log("test4 : ", test4)
                console.log("test5 : ", test5)
                console.log("test6 : ", test6)
                console.log("test7 : ", test7)



            })
        },

        fn_openBrowser() {

            // 외부 브라우저 링크 오픈 
            // url = "https://nhcok.cardong.co.kr/estimate/start"
            //2025.02.03 사업부서 요청 url 수정
            let url = "https://nhcok.cardong.co.kr/home"

            // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
            if(this.getUserInfo('chnl') === '385') {
                // 스뱅
                appService.executeBrowser(url)
            } else {
                // 콕뱅
                appService.cokBankOpenPopupWebBrowser(url)
            }
        },

        fn_numberFormat(num) {
            return numberFormat(num)
        },

		setAlt(carBrannm, carModlnm, carCtrimNm) {
			return carBrannm + " " + carModlnm + " " + carCtrimNm
        },
		
		// 신차 및 중고차 검색
		fn_isEmpty(str){
			if(typeof str === "undefined" || str === null || str === ""){
				return "-"
            }

			if(typeof str !== "undefined" || str !== null || str !== ""){
				return !isNaN(str) ? this.fn_numberFormat(str) : str
            }
        },
		fn_setImgUrl(imgPathnm){
			return 'http://nhcok.cardong.co.kr/img/' + imgPathnm
		},
        emptyImg(e) {
            e.target.src = new URL("@/assets/images/icon/car_new01.png", import.meta.url).href
        },
    },
    computed : {
		fn_numberFormatKorAmt() {
			const unit = ['', '만', '억', '조', '경']
			const splitAmt = 10000
			const splitCnt = unit.length

			let resultArray = []
			let resultString = ""

			for(let i = 0; i < splitCnt; i++){
				let rst = (this.carCtrimSelAm % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
				rst = Math.floor(rst)

				if(rst > 0){
					resultArray[i] = rst
				}
			}

			let strIdx = 0  // 최초시작지점에 '원' 추가가히위함

			for(let j = 0; j < resultArray.length; j++){
				if(!resultArray[j])  {
					strIdx++
					continue
				}

				// 1만원 미만 절삭처리
				if(strIdx > 0){
                    if(j === strIdx) {
                        resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '원</em>' + resultString
                    } else {
                        resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '</em>' + resultString
                    }                
                }else{
                    resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '원</em>'
                }
			}
			return resultString
		}
    }
}

</script>