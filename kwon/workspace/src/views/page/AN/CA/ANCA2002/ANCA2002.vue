<!--
/*************************************************************************
* @ 서비스경로 : 제휴서비스 > 마이카 > 신차 > 신차추천 
* @ 페이지설명 : 제휴서비스 > 마이카 > 신차 > 신차추천 팝업
* @ 파일명     : src\views\page\AN\CA\ANCA2002\ANCA2002.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-08-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-18              CS533571              최초작성
*************************************************************************/
-->
<template>
    <!-- .mydata2023 신규 or 수정 화면에 적용 일부 반영이 필요한 경우 컨텐츠 영역이나 부모계체에 사용 -->
    <!-- 전체 팝업 시작 -->
    <div class="full_popup renewal mydata2023" id="full_popup_01"> 
        <div class="popup_header">
            <h1>신차 검색</h1>
        </div>
        
        <div class="popup_content com_no_bottom allianceSvc"><!-- 하단 버튼 없을때 com_no_bottom -->
            <div class="com_inner">
                <ul class="layoutBox wAuto rBtn rTxt">
                    <li class="left">
                        <strong class="titH1">내가 원하는 드림카를<br>추천 받아 보세요!</strong>
                    </li>
                    <li class="right">
                        <span>시세출처 : <em>카동</em></span>
                    </li>
                </ul>
            </div>
            <hr class="hr02">
            <div class="custom_box myOldCar">
                <!-- slide -->
                <div class="vertical_car slick_refresh">
                    <div class="slider_wrap">
                        <template v-if="newCarTopPopList.length > 0">
                            <div class="tab_cont auto_play">
                                <div role="tabpanel" class="cmm-tab-panel" v-for="(carInfo, idx1) in newCarTopPopList" :key="idx1" @click.prevent="fn_goNewCarDetailPage(carInfo.carCtrimNo)">
                                    <div class="slide">
                                        <div class="top_info_box type02 noBG hasdetail">
                                            <div class="car_pic">
                                                <img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="setAlt(carInfo.carBrannm, carInfo.carModlnm, carInfo.carCtrimNm)">
                                                <img v-else :src="fn_setImgUrl(carInfo.carCtrimBscImgPathnm)" @error="emptyImg" :alt="setAlt(carInfo.carBrannm, carInfo.carModlnm, carInfo.carCtrimNm)">
                                            </div>
                                            <div class="car_top_wrap">
                                                <div class="car_name">
                                                    {{carInfo.carBrannm}} {{carInfo.carModlnm}} {{carInfo.carCtrimNm}}
                                                </div>
                                                <div class="date"><em class="num">{{carInfo.carModlMktgDt |dateFilter('YYYY')}}</em>년 <em class="num">{{carInfo.carModlMktgDt |dateFilter('MM')}}</em>월 기준</div>
                                            </div>
                                            <div class="car_bottom_wrap">
                                                <div class="price" v-html="fn_numberFormatKorAmt(carInfo.carCtrimSelAm)"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <!--// slide -->
            </div>
            <div class="com_inner">
                <!-- btn(휘발유 / 경유 / LPG / EV기타) -->
                <div class="custom_box mt20">
                    <template v-if="carOilCList.length > 0">
                        <div class="tab_radius">
                            <ul role="">
                                <li v-for="(tabInfo, tabIdx) in carOilCList" :key="'tab1_' + tabIdx">
                                    <a href="javascript:void(0);" :data-tab-tooltip="'tooltip' + tabInfo.comnCVal " role="button" 
                                        :class="selectTab == tabInfo.comnCVal ? 'active' : ''" 
                                        @click.prevent="fn_selectTab(tabInfo.comnCVal)"
                                    >{{tabInfo.comnCExpl}}</a>
                                </li>
                            </ul>
                        </div>
                    </template>

                    <div class="tab_tooltip_wrap tab_tooltip_wrap02">
                        <!-- 휘발유 -->
                        <div id="tooltipG" class="tab_tooltip">
                            <template v-if="Object.keys(condObj01).length > 0">
                                <div class="re_detail_list">
                                    <div class="re_flex" @click.prevent="fn_openSearch(condObj01)">
                                        <!-- 브랜드여부 선택(국산)(브랜드가 선택 된 경우 수입여부 표시 생략) -->
                                        <template v-if="condObj01.carBrandArr.filter((arr) => arr < 200).length > 0">
                                            <template v-for="(carBrandInfo, carBrandIdx) in carBrandList.filter((obj) => condObj01.carBrandArr.some((cond) => cond === obj.carBranNo) && obj.carBranNo < 200)">
                                                <strong class="text_info list_name" :key="carBrandIdx + 'carBrandKey1'">{{carBrandInfo.carBrannm}}</strong>
                                            </template>
                                        </template>
                                        <!-- 브랜드가 선택되지 않은 경우 수입여부 표시 -->
                                        <template v-else>
                                            <!-- 수입여부 선택 -->
                                            <template v-if="condObj01.carSelRgnCArr.filter((arr) => arr === '1').length > 0">
                                                <template v-for="(carSelRgnCInfo, carSelRgnCIdx) in carSelRgnCList.filter((obj) => condObj01.carSelRgnCArr.some((cond) => cond === obj.comnCVal && cond === '1'))">
                                                    <strong class="text_info list_name" :key="carSelRgnCIdx + 'carSelRgnCKey1'">{{carSelRgnCInfo.comnCExpl}}</strong>
                                                </template>
                                            </template>
                                        </template>

                                        <!-- 브랜드여부 선택(수입)(브랜드가 선택 된 경우 수입여부 표시 생략) -->
                                        <template v-if="condObj01.carBrandArr.filter((arr) => arr >= 200).length > 0">
                                            <template v-for="(carBrandInfo, carBrandIdx) in carBrandList.filter((obj) => condObj01.carBrandArr.some((cond) => cond === obj.carBranNo) && obj.carBranNo >= 200)">
                                                <strong class="text_info list_name" :key="carBrandIdx + 'carBrandKey11'">{{carBrandInfo.carBrannm}}</strong>
                                            </template>
                                        </template>
                                        <!-- 브랜드가 선택되지 않은 경우 수입여부 표시 -->
                                        <template v-else>
                                            <!-- 수입여부 선택 -->
                                            <template v-if="condObj01.carSelRgnCArr.filter((arr) => arr === '2').length > 0">
                                                <template v-for="(carSelRgnCInfo, carSelRgnCIdx) in carSelRgnCList.filter((obj) => condObj01.carSelRgnCArr.some((cond) => cond === obj.comnCVal && cond === '2'))">
                                                    <strong class="text_info list_name" :key="carSelRgnCIdx + 'carSelRgnCKey11'">{{carSelRgnCInfo.comnCExpl}}</strong>
                                                </template>
                                            </template>
                                        </template>

                                        <!-- 차종구분 선택 -->
                                        <template v-if="condObj01.cartpArr.length > 0">
                                            <template v-for="(cartpDsc, cartpIdx) in cartpDscGrpList.filter((cartp) => condObj01.cartpArr.some((cond) => cond === cartp.refCntn2))">
                                                <strong class="text_info list_name" :key="cartpIdx + 'cartpKey1'">{{cartpDsc.refCntn1}}</strong>
                                            </template>
                                        </template>

                                        <!-- 신차금액구분 선택 -->
                                        <template v-if="condObj01.ncarAmArr.length > 0">
                                            <template v-for="(ncarAmDsc, ncarAmIdx) in ncarAmDscList.filter((ncarAm) => condObj01.ncarAmArr.some((cond) => cond === ncarAm.comnCVal))">
                                                <strong class="text_info list_name" :key="ncarAmIdx + 'ncarAmKey1'">{{ncarAmDsc.comnCExpl}}</strong>
                                            </template>
                                        </template>																				
                                    </div>
                                </div>
                                <div class="com_btn_area">
                                    <a href="javascript:void(0);" class="com_btn_round" role="button" @click.prevent="fn_clearSearch()">
                                        <span class="btn_go">검색초기화</span>
                                    </a>
                                </div>
                            </template>
                            <template v-else>
                                <div class="com_btn_area com_btn_round_flex">
                                    <template v-if="srchGbn1 === 'keyword'">
                                        <div class="custom_box_search_area">
                                            <div class="com_input_type02">
                                                <input type="search" id="txt01" class="inputClear" v-model="carModlnmG" name="" value="" @keyup.enter="fn_srchKeyWdCarList('G', 'init')" placeholder="모델명을 입력해주세요" title="모델명을 입력">	
                                                <a href="javascript:void(0);" class="com_btn_delete" style="display: none;"><span class="blind">삭제</span></a>
                                                <a href="javascript:void(0);" class="com_btn_search" @click.prevent="fn_srchKeyWdCarList('G', 'init')"><span class="blind">검색</span></a>
                                            </div>
                                            <div class="custom_box_btn">
                                                <a href="javascript:void(0);" class="btn_search" role="button" @click.prevent="fn_srchCtrl('')"><span>취소</span></a>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <a href="javascript:void(0);" class="com_btn_round btn1" @click.prevent="fn_srchCtrl('keyword')">
                                            <span>키워드 검색 </span>
                                        </a>
                                        <a href="javascript:void(0);" class="com_btn_round btn2" @click.prevent="fn_openSearch()">
                                            <span>맞춤 검색</span>
                                        </a>
                                    </template>
                                </div>
                            </template>
                            <span class="arrow" ref="arrow01"></span>
                        </div>
                        <!-- 경유 -->
                        <div id="tooltipD" class="tab_tooltip">
                            <template v-if="Object.keys(condObj02).length > 0">
                                <div class="re_detail_list">
                                    <div class="re_flex" @click.prevent="fn_openSearch(condObj02)">
                                        <!-- 브랜드여부 선택(국산)(브랜드가 선택 된 경우 수입여부 표시 생략) -->
                                        <template v-if="condObj02.carBrandArr.filter((arr) => arr < 200).length > 0">
                                            <template v-for="(carBrandInfo, carBrandIdx) in carBrandList.filter((obj) => condObj02.carBrandArr.some((cond) => cond === obj.carBranNo) && obj.carBranNo < 200)">
                                                <strong class="text_info list_name" :key="carBrandIdx + 'carBrandKey2'">{{carBrandInfo.carBrannm}}</strong>
                                            </template>
                                        </template>
                                        <!-- 브랜드가 선택되지 않은 경우 수입여부 표시 -->
                                        <template v-else>
                                            <!-- 수입여부 선택 -->
                                            <template v-if="condObj02.carSelRgnCArr.filter((arr) => arr === '1').length > 0">
                                                <template v-for="(carSelRgnCInfo, carSelRgnCIdx) in carSelRgnCList.filter((obj) => condObj02.carSelRgnCArr.some((cond) => cond === obj.comnCVal && cond === '1'))">
                                                    <strong class="text_info list_name" :key="carSelRgnCIdx + 'carSelRgnCKey2'">{{carSelRgnCInfo.comnCExpl}}</strong>
                                                </template>
                                            </template>		
                                        </template>

                                        <!-- 브랜드여부 선택(수입)(브랜드가 선택 된 경우 수입여부 표시 생략) -->
                                        <template v-if="condObj02.carBrandArr.filter((arr) => arr >= 200).length > 0">
                                            <template v-for="(carBrandInfo, carBrandIdx) in carBrandList.filter((obj) => condObj02.carBrandArr.some((cond) => cond === obj.carBranNo) && obj.carBranNo >= 200)">
                                                <strong class="text_info list_name" :key="carBrandIdx + 'carBrandKey22'">{{carBrandInfo.carBrannm}}</strong>
                                            </template>
                                        </template>
                                        <!-- 브랜드가 선택되지 않은 경우 수입여부 표시 -->
                                        <template v-else>
                                            <!-- 수입여부 선택 -->
                                            <template v-if="condObj02.carSelRgnCArr.filter((arr) => arr === '2').length > 0">
                                                <template v-for="(carSelRgnCInfo, carSelRgnCIdx) in carSelRgnCList.filter((obj) => condObj02.carSelRgnCArr.some((cond) => cond === obj.comnCVal && cond === '2'))">
                                                    <strong class="text_info list_name" :key="carSelRgnCIdx + 'carSelRgnCKey22'">{{carSelRgnCInfo.comnCExpl}}</strong>
                                                </template>
                                            </template>		
                                        </template>

                                        <!-- 차종구분 선택 -->
                                        <template v-if="condObj02.cartpArr.length > 0">
                                            <template v-for="(cartpDsc, cartpIdx) in cartpDscGrpList.filter((cartp) => condObj02.cartpArr.some((cond) => cond === cartp.refCntn2))">
                                                <strong class="text_info list_name" :key="cartpIdx + 'cartpKey2'">{{cartpDsc.refCntn1}}</strong>
                                            </template>
                                        </template>
                                        <!-- 신차금액구분 선택 -->
                                        <template v-if="condObj02.ncarAmArr.length > 0">
                                            <template v-for="(ncarAmDsc, ncarAmIdx) in ncarAmDscList.filter((ncarAm) => condObj02.ncarAmArr.some((cond) => cond === ncarAm.comnCVal))">
                                                <strong class="text_info list_name" :key="ncarAmIdx + 'ncarAmKey2'">{{ncarAmDsc.comnCExpl}}</strong>
                                            </template>
                                        </template>																				
                                    </div>
                                </div>
                                <div class="com_btn_area">
                                    <a href="javascript:void(0);" class="com_btn_round" role="button" @click.prevent="fn_clearSearch()">
                                        <span class="btn_go">검색초기화</span>
                                    </a>
                                </div>
                            </template>
                            <template v-else>
                                <div class="com_btn_area com_btn_round_flex">
                                    <template v-if="srchGbn2 === 'keyword'">
                                        <div class="custom_box_search_area">
                                            <div class="com_input_type02">
                                                <input type="search" id="txt01" class="inputClear" v-model="carModlnmD" name="" value="" @keyup.enter="fn_srchKeyWdCarList('D', 'init')" placeholder="모델명을 입력해주세요" title="모델명을 입력">	
                                                <a href="javascript:void(0);" class="com_btn_delete" style="display: none;"><span class="blind">삭제</span></a>
                                                <a href="javascript:void(0);" class="com_btn_search" @click.prevent="fn_srchKeyWdCarList('D', 'init')"><span class="blind">검색</span></a>
                                            </div>
                                            <div class="custom_box_btn">
                                                <a href="javascript:void(0);" class="btn_search" role="button" @click.prevent="fn_srchCtrl('')"><span>취소</span></a>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <a href="javascript:void(0);" class="com_btn_round btn1" @click.prevent="fn_srchCtrl('keyword')">
                                            <span>키워드 검색 </span>
                                        </a>
                                        <a href="javascript:void(0);" class="com_btn_round btn2" @click.prevent="fn_openSearch()">
                                            <span>맞춤 검색</span>
                                        </a>
                                    </template>
                                </div>
                            </template>
                            <span class="arrow" ref="arrow02"></span>
                        </div>
                        <!-- LPG -->
                        <div id="tooltipL" class="tab_tooltip">
                            <template v-if="Object.keys(condObj03).length > 0">
                                <div class="re_detail_list">
                                    <div class="re_flex" @click.prevent="fn_openSearch(condObj03)">
                                        <!-- 브랜드여부 선택(국산)(브랜드가 선택 된 경우 수입여부 표시 생략) -->
                                        <template v-if="condObj03.carBrandArr.filter((arr) => arr < 200).length > 0">
                                            <template v-for="(carBrandInfo, carBrandIdx) in carBrandList.filter((obj) => condObj03.carBrandArr.some((cond) => cond === obj.carBranNo) && obj.carBranNo < 200)">
                                                <strong class="text_info list_name" :key="carBrandIdx + 'carBrandKey3'">{{carBrandInfo.carBrannm}}</strong>
                                            </template>
                                        </template>
                                        <!-- 브랜드가 선택되지 않은 경우 수입여부 표시 -->
                                        <template v-else>
                                            <!-- 수입여부 선택 -->
                                            <template v-if="condObj03.carSelRgnCArr.filter((arr) => arr === '1').length > 0">
                                                <template v-for="(carSelRgnCInfo, carSelRgnCIdx) in carSelRgnCList.filter((obj) => condObj03.carSelRgnCArr.some((cond) => cond === obj.comnCVal && cond === '1'))">
                                                    <strong class="text_info list_name" :key="carSelRgnCIdx + 'carSelRgnCKey3'">{{carSelRgnCInfo.comnCExpl}}</strong>
                                                </template>
                                            </template>	
                                        </template>

                                        <!-- 브랜드여부 선택(수입))(브랜드가 선택 된 경우 수입여부 표시 생략) -->
                                        <template v-if="condObj03.carBrandArr.filter((arr) => arr >= 200).length > 0">
                                            <template v-for="(carBrandInfo, carBrandIdx) in carBrandList.filter((obj) => condObj03.carBrandArr.some((cond) => cond === obj.carBranNo) && obj.carBranNo >= 200)">
                                                <strong class="text_info list_name" :key="carBrandIdx + 'carBrandKey33'">{{carBrandInfo.carBrannm}}</strong>
                                            </template>
                                        </template>
                                        <!-- 브랜드가 선택되지 않은 경우 수입여부 표시 -->
                                        <template v-else>
                                            <!-- 수입여부 선택 -->
                                            <template v-if="condObj03.carSelRgnCArr.filter((arr) => arr === '2').length > 0">
                                                <template v-for="(carSelRgnCInfo, carSelRgnCIdx) in carSelRgnCList.filter((obj) => condObj03.carSelRgnCArr.some((cond) => cond === obj.comnCVal && cond === '2'))">
                                                    <strong class="text_info list_name" :key="carSelRgnCIdx + 'carSelRgnCKey33'">{{carSelRgnCInfo.comnCExpl}}</strong>
                                                </template>
                                            </template>	
                                        </template>

                                        <!-- 차종구분 선택 -->
                                        <template v-if="condObj03.cartpArr.length > 0">
                                            <template v-for="(cartpDsc, cartpIdx) in cartpDscGrpList.filter((cartp) => condObj03.cartpArr.some((cond) => cond === cartp.refCntn2))">
                                                <strong class="text_info list_name" :key="cartpIdx + 'cartpKey3'">{{cartpDsc.refCntn1}}</strong>
                                            </template>
                                        </template>
                                        <!-- 신차금액구분 선택 -->
                                        <template v-if="condObj03.ncarAmArr.length > 0">
                                            <template v-for="(ncarAmDsc, ncarAmIdx) in ncarAmDscList.filter((ncarAm) => condObj03.ncarAmArr.some((cond) => cond === ncarAm.comnCVal))">
                                                <strong class="text_info list_name" :key="ncarAmIdx + 'ncarAmKey3'">{{ncarAmDsc.comnCExpl}}</strong>
                                            </template>
                                        </template>																				
                                    </div>
                                </div>
                                <div class="com_btn_area">
                                    <a href="javascript:void(0);" class="com_btn_round" role="button" @click.prevent="fn_clearSearch()">
                                        <span class="btn_go">검색초기화</span>
                                    </a>
                                </div>
                            </template>
                            <template v-else>
                                <div class="com_btn_area com_btn_round_flex">
                                    <template v-if="srchGbn3 === 'keyword'">
                                        <div class="custom_box_search_area">
                                            <div class="com_input_type02">
                                                <input type="search" id="txt01" class="inputClear" v-model="carModlnmL" name="" value="" @keyup.enter="fn_srchKeyWdCarList('L', 'init')" placeholder="모델명을 입력해주세요" title="모델명을 입력">	
                                                <a href="javascript:void(0);" class="com_btn_delete" style="display: none;"><span class="blind">삭제</span></a>
                                                <a href="javascript:void(0);" class="com_btn_search" @click.prevent="fn_srchKeyWdCarList('L', 'init')"><span class="blind">검색</span></a>
                                            </div>
                                            <div class="custom_box_btn">
                                                <a href="javascript:void(0);" class="btn_search" role="button" @click.prevent="fn_srchCtrl('')"><span>취소</span></a>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <a href="javascript:void(0);" class="com_btn_round btn1" @click.prevent="fn_srchCtrl('keyword')">
                                            <span>키워드 검색 </span>
                                        </a>
                                        <a href="javascript:void(0);" class="com_btn_round btn2" @click.prevent="fn_openSearch()">
                                            <span>맞춤 검색</span>
                                        </a>
                                    </template>
                                </div>
                            </template>
                            <span class="arrow" ref="arrow03"></span>
                        </div>
                        <!-- EV기타 -->
                        <div id="tooltipO" class="tab_tooltip">
                            <template v-if="Object.keys(condObj04).length > 0">
                                <div class="re_detail_list">
                                    <div class="re_flex" @click.prevent="fn_openSearch(condObj04)">
                                        <!-- 브랜드여부 선택(국산)(브랜드가 선택 된 경우 수입여부 표시 생략) -->
                                        <template v-if="condObj04.carBrandArr.filter((arr) => arr < 200).length > 0">
                                            <template v-for="(carBrandInfo, carBrandIdx) in carBrandList.filter((obj) => condObj04.carBrandArr.some((cond) => cond === obj.carBranNo) && obj.carBranNo < 200)">
                                                <strong class="text_info list_name" :key="carBrandIdx + 'carBrandKey4'">{{carBrandInfo.carBrannm}}</strong>
                                            </template>
                                        </template>
                                        <!-- 브랜드가 선택되지 않은 경우 수입여부 표시 -->
                                        <template v-else>
                                            <!-- 수입여부 선택 -->
                                            <template v-if="condObj04.carSelRgnCArr.filter((arr) => arr === '1').length > 0">
                                                <template v-for="(carSelRgnCInfo, carSelRgnCIdx) in carSelRgnCList.filter((obj) => condObj04.carSelRgnCArr.some((cond) => cond === obj.comnCVal && cond === '1'))">
                                                    <strong class="text_info list_name" :key="carSelRgnCIdx + 'carSelRgnCKey4'">{{carSelRgnCInfo.comnCExpl}}</strong>
                                                </template>
                                            </template>
                                        </template>

                                        <!-- 브랜드여부 선택(수입)(브랜드가 선택 된 경우 수입여부 표시 생략) -->
                                        <template v-if="condObj04.carBrandArr.filter((arr) => arr >= 200).length > 0">
                                            <template v-for="(carBrandInfo, carBrandIdx) in carBrandList.filter((obj) => condObj04.carBrandArr.some((cond) => cond === obj.carBranNo)  && obj.carBranNo >= 200 )">
                                                <strong class="text_info list_name" :key="carBrandIdx + 'carBrandKey44'">{{carBrandInfo.carBrannm}}</strong>
                                            </template>
                                        </template>
                                        <!-- 브랜드가 선택되지 않은 경우 수입여부 표시 -->
                                        <template v-else>
                                            <!-- 수입여부 선택 -->
                                            <template v-if="condObj04.carSelRgnCArr.filter((arr) => arr === '2').length > 0">
                                                <template v-for="(carSelRgnCInfo, carSelRgnCIdx) in carSelRgnCList.filter((obj) => condObj04.carSelRgnCArr.some((cond) => cond === obj.comnCVal && cond === '2'))">
                                                    <strong class="text_info list_name" :key="carSelRgnCIdx + 'carSelRgnCKey44'">{{carSelRgnCInfo.comnCExpl}}</strong>
                                                </template>
                                            </template>
                                        </template>

                                        <!-- 차종구분 선택 -->
                                        <template v-if="condObj04.cartpArr.length > 0">
                                            <template v-for="(cartpDsc, cartpIdx) in cartpDscGrpList.filter((cartp) => condObj04.cartpArr.some((cond) => cond === cartp.refCntn2))">
                                                <strong class="text_info list_name" :key="cartpIdx + 'cartpKey4'">{{cartpDsc.refCntn1}}</strong>
                                            </template>
                                        </template>
                                        <!-- 신차금액구분 선택 -->
                                        <template v-if="condObj04.ncarAmArr.length > 0">
                                            <template v-for="(ncarAmDsc, ncarAmIdx) in ncarAmDscList.filter((ncarAm) => condObj04.ncarAmArr.some((cond) => cond === ncarAm.comnCVal))">
                                                <strong class="text_info list_name" :key="ncarAmIdx + 'ncarAmKey4'">{{ncarAmDsc.comnCExpl}}</strong>
                                            </template>
                                        </template>																				
                                    </div>
                                </div>
                                <div class="com_btn_area">
                                    <a href="javascript:void(0);" class="com_btn_round" role="button" @click.prevent="fn_clearSearch()">
                                        <span class="btn_go">검색초기화</span>
                                    </a>
                                </div>
                            </template>
                            <template v-else>
                                <div class="com_btn_area com_btn_round_flex">
                                    <template v-if="srchGbn4 === 'keyword'">
                                        <div class="custom_box_search_area">
                                            <div class="com_input_type02">
                                                <input type="search" id="txt01" class="inputClear" v-model="carModlnmO" name="" value="" @keyup.enter="fn_srchKeyWdCarList('O', 'init')" placeholder="모델명을 입력해주세요" title="모델명을 입력">	
                                                <a href="javascript:void(0);" class="com_btn_delete" style="display: none;"><span class="blind">삭제</span></a>
                                                <a href="javascript:void(0);" class="com_btn_search" @click.prevent="fn_srchKeyWdCarList('O', 'init')"><span class="blind">검색</span></a>
                                            </div>
                                            <div class="custom_box_btn">
                                                <a href="javascript:void(0);" class="btn_search" role="button" @click.prevent="fn_srchCtrl('')"><span>취소</span></a>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <a href="javascript:void(0);" class="com_btn_round btn1" @click.prevent="fn_srchCtrl('keyword')">
                                            <span>키워드 검색 </span>
                                        </a>
                                        <a href="javascript:void(0);" class="com_btn_round btn2" @click.prevent="fn_openSearch()">
                                            <span>맞춤 검색</span>
                                        </a>
                                    </template>
                                </div>
                            </template>
                            <span class="arrow" ref="arrow04"></span>
                        </div>
                    </div>
                </div>
                <!--// btn(휘발유 / 경유 / LPG / EV기타) -->
                <div class="custom_box">
                    <div class="car-tab car-tab01 mt30">
                        <template v-if="addSrchCarList.length > 0">
                            <!-- 조건이 없는 경우만 수입여부 구분 및 타이틀 노출 있으면 비노출(조건 미선택시 국산4 수입4개 보여줌) -->
                            <template v-if="selectTab === 'G' && (Object.keys(condObj01).length > 0 || srchflag1 === 'keySrch')">
                                <ul class="carsearch_list">
                                    <template v-for="(newCarInfo, idx4) in addSrchCarList">
                                        <li :key="idx4">
                                            <a href="javascript:void(0);" role="button" @click.prevent="fn_goNewCarDetailPage(newCarInfo.carCtrimNo)">
                                                <dl>
                                                    <dt>
                                                        <p class="carname">
                                                            {{newCarInfo.carBrannm}}<br>{{newCarInfo.carModlnm}} {{newCarInfo.carCtrimNm}}
                                                        </p>
                                                        <p class="date"><em class="num">{{newCarInfo.carModlMktgDt |dateFilter('YYYY')}}</em>년 <em class="num">{{newCarInfo.carModlMktgDt |dateFilter('MM')}}</em>월 기준</p>
                                                        <p class="carprice" v-html="fn_numberFormatKorAmt(newCarInfo.carCtrimSelAm)"></p>
                                                    </dt>
                                                    <dd>
                                                        <img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="setAlt(newCarInfo.carBrannm, newCarInfo.carModlnm, newCarInfo.carCtrimNm)">
                                                        <img v-else :src="fn_setImgUrl(newCarInfo.carCtrimBscImgPathnm)" @error="emptyImg" :alt="setAlt(newCarInfo.carBrannm, newCarInfo.carModlnm, newCarInfo.carCtrimNm)">
                                                    </dd>	
                                                </dl>
                                            </a>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                            <template v-else-if="selectTab === 'D' && (Object.keys(condObj02).length > 0 || srchflag2 === 'keySrch')">
                                <ul class="carsearch_list">
                                    <template v-for="(newCarInfo, idx4) in addSrchCarList">
                                        <li :key="idx4">
                                            <a href="javascript:void(0);" role="button" @click.prevent="fn_goNewCarDetailPage(newCarInfo.carCtrimNo)">
                                                <dl>
                                                    <dt>
                                                        <p class="carname">
                                                            {{newCarInfo.carBrannm}}<br>{{newCarInfo.carModlnm}} {{newCarInfo.carCtrimNm}}
                                                        </p>
                                                        <p class="date"><em class="num">{{newCarInfo.carModlMktgDt |dateFilter('YYYY')}}</em>년 <em class="num">{{newCarInfo.carModlMktgDt |dateFilter('MM')}}</em>월 기준</p>
                                                        <p class="carprice" v-html="fn_numberFormatKorAmt(newCarInfo.carCtrimSelAm)"></p>
                                                    </dt>
                                                    <dd>
                                                        <img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="setAlt(newCarInfo.carBrannm, newCarInfo.carModlnm, newCarInfo.carCtrimNm)">
                                                        <img v-else :src="fn_setImgUrl(newCarInfo.carCtrimBscImgPathnm)" @error="emptyImg" :alt="setAlt(newCarInfo.carBrannm, newCarInfo.carModlnm, newCarInfo.carCtrimNm)">
                                                    </dd>	
                                                </dl>
                                            </a>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                            <template v-else-if="selectTab === 'L' && (Object.keys(condObj03).length > 0 || srchflag3 === 'keySrch')">
                                <ul class="carsearch_list">
                                    <template v-for="(newCarInfo, idx4) in addSrchCarList">
                                        <li :key="idx4">
                                            <a href="javascript:void(0);" role="button" @click.prevent="fn_goNewCarDetailPage(newCarInfo.carCtrimNo)">
                                                <dl>
                                                    <dt>
                                                        <p class="carname">
                                                            {{newCarInfo.carBrannm}}<br>{{newCarInfo.carModlnm}} {{newCarInfo.carCtrimNm}}
                                                        </p>
                                                        <p class="date"><em class="num">{{newCarInfo.carModlMktgDt |dateFilter('YYYY')}}</em>년 <em class="num">{{newCarInfo.carModlMktgDt |dateFilter('MM')}}</em>월 기준</p>
                                                        <p class="carprice" v-html="fn_numberFormatKorAmt(newCarInfo.carCtrimSelAm)"></p>
                                                    </dt>
                                                    <dd>
                                                        <img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="setAlt(newCarInfo.carBrannm, newCarInfo.carModlnm, newCarInfo.carCtrimNm)">
                                                        <img v-else :src="fn_setImgUrl(newCarInfo.carCtrimBscImgPathnm)" @error="emptyImg" :alt="setAlt(newCarInfo.carBrannm, newCarInfo.carModlnm, newCarInfo.carCtrimNm)">
                                                    </dd>	
                                                </dl>
                                            </a>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                            <template v-else-if="selectTab === 'O' && (Object.keys(condObj04).length > 0 || srchflag4 === 'keySrch')">
                                <ul class="carsearch_list">
                                    <template v-for="(newCarInfo, idx4) in addSrchCarList">
                                        <li :key="idx4">
                                            <a href="javascript:void(0);" role="button" @click.prevent="fn_goNewCarDetailPage(newCarInfo.carCtrimNo)">
                                                <dl>
                                                    <dt>
                                                        <p class="carname">
                                                            {{newCarInfo.carBrannm}}<br>{{newCarInfo.carModlnm}} {{newCarInfo.carCtrimNm}}
                                                        </p>
                                                        <p class="date"><em class="num">{{newCarInfo.carModlMktgDt |dateFilter('YYYY')}}</em>년 <em class="num">{{newCarInfo.carModlMktgDt |dateFilter('MM')}}</em>월 기준</p>
                                                        <p class="carprice" v-html="fn_numberFormatKorAmt(newCarInfo.carCtrimSelAm)"></p>
                                                    </dt>
                                                    <dd>
                                                        <img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="setAlt(newCarInfo.carBrannm, newCarInfo.carModlnm, newCarInfo.carCtrimNm)">
                                                        <img v-else :src="fn_setImgUrl(newCarInfo.carCtrimBscImgPathnm)" @error="emptyImg" :alt="setAlt(newCarInfo.carBrannm, newCarInfo.carModlnm, newCarInfo.carCtrimNm)">
                                                    </dd>	
                                                </dl>
                                            </a>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                            <template v-else>
                                <template v-if="addSrchCarList.filter(obj => obj.carSelRgnC === '1').length > 0">
                                    <strong class="com_pop_tit01">국산차</strong>
                                    <!-- 국산차 조회내역이 있을경우 S -->
                                        <ul class="carsearch_list">
                                            <template v-for="(newCarInfo, idx2) in addSrchCarList">
                                                <template v-if="newCarInfo.carSelRgnC === '1'">
                                                    <li :key="idx2">
                                                        <a href="javascript:void(0);" role="button" @click.prevent="fn_goNewCarDetailPage(newCarInfo.carCtrimNo)">
                                                            <dl>
                                                                <dt>
                                                                    <p class="carname">
                                                                        {{newCarInfo.carBrannm}}<br>{{newCarInfo.carModlnm}} {{newCarInfo.carCtrimNm}}
                                                                    </p>
                                                                    <p class="date"><em class="num">{{newCarInfo.carModlMktgDt |dateFilter('YYYY')}}</em>년 <em class="num">{{newCarInfo.carModlMktgDt |dateFilter('MM')}}</em>월 기준</p>
                                                                    <p class="carprice" v-html="fn_numberFormatKorAmt(newCarInfo.carCtrimSelAm)"></p>
                                                                </dt>
                                                                <dd>
                                                                    <img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="setAlt(newCarInfo.carBrannm, newCarInfo.carModlnm, newCarInfo.carCtrimNm)">
                                                                    <img v-else :src="fn_setImgUrl(newCarInfo.carCtrimBscImgPathnm)" @error="emptyImg" :alt="setAlt(newCarInfo.carBrannm, newCarInfo.carModlnm, newCarInfo.carCtrimNm)">
                                                                </dd>	
                                                            </dl>
                                                        </a>
                                                    </li>
                                                </template>
                                            </template>
                                        </ul>
                                    <!-- 국산차 조회내역이 있을경우 E -->
                                </template>

                                <template v-if="addSrchCarList.filter(obj => obj.carSelRgnC === '2').length > 0">
                                    <strong class="com_pop_tit01 mt40">수입차</strong>									
                                    <!-- 수입차 조회내역이 있을경우 S -->
                                    <ul class="carsearch_list">
                                        <template v-for="(newCarInfo, idx3) in addSrchCarList">
                                            <template v-if="newCarInfo.carSelRgnC === '2'">
                                                <li :key="idx3">
                                                    <a href="javascript:void(0);" role="button" @click.prevent="fn_goNewCarDetailPage(newCarInfo.carCtrimNo)">
                                                        <dl>
                                                            <dt>
                                                                <p class="carname">
                                                                    {{newCarInfo.carBrannm}}<br>{{newCarInfo.carModlnm}} {{newCarInfo.carCtrimNm}}
                                                                </p>
                                                                <p class="date"><em class="num">{{newCarInfo.carModlMktgDt |dateFilter('YYYY')}}</em>년 <em class="num">{{newCarInfo.carModlMktgDt |dateFilter('MM')}}</em>월 기준</p>
                                                                <p class="carprice" v-html="fn_numberFormatKorAmt(newCarInfo.carCtrimSelAm)"></p>
                                                            </dt>
                                                            <dd>
                                                                <img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="setAlt(newCarInfo.carBrannm, newCarInfo.carModlnm, newCarInfo.carCtrimNm)">
                                                                <img v-else :src="fn_setImgUrl(newCarInfo.carCtrimBscImgPathnm)" @error="emptyImg" :alt="setAlt(newCarInfo.carBrannm, newCarInfo.carModlnm, newCarInfo.carCtrimNm)">
                                                            </dd>	
                                                        </dl>
                                                    </a>
                                                </li>
                                            </template>
                                        </template>
                                    </ul>
                                    <!-- 수입차 조회내역이 있을경우 E -->
                                </template>								
                            </template>

                            <!-- 더보기 -->
                            <a href="javascript:void(0);" class="com_btn_more" @click.prevent="fn_showMoreList()" v-show="lsPageYn==='1'"><span>더보기</span></a>
                        </template>
                        <template v-else>
                            <div class="no_data_box grayExclamationType">
                                <div class="no_data_list">
                                    <p>조회된  정보가 없습니다.</p>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>

        </div>
        <a href="javascript:void(0);" class="btn_close" @click.prevent="close('reload')"><span class="blind">팝업닫기</span></a>		
    </div>
    <!--// 전체 팝업 종료 -->
</template>

<script>
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {dateFormat} from '@/utils/date'
import {numberFormat} from '@/utils/number'
import {fncSlick_carSrch} from '@/utils/slick'
import modalService from '@/service/modalService'

import ANCA2204 from '@/views/page/AN/CA/ANCA2204/ANCA2204'	// 신차 상세정보
import ANCA2205 from '@/views/page/AN/CA/ANCA2205/ANCA2205'	// 조건검색

export default {
    name : "ANCA2002",
    data: () => {
        return {
            // etc
            pdcaUserAgent       : "",		// 실행플랫폼 (ios, android, else)

            // input
            mydtCusno           : "",     	// 마이데이터고객번호
            carCtrimNo          : "",     	// 트림코드
            
            // output
            reqData             : [],       // 조회된 Data
            newCarPopCnt        : 0,		// 신차TOP10건수			
            newCarTopPopList    : [],      	// 신차TOP리스트

            srchCarCnt          : 0,		// 신차 검색건수			
            srchCarList			: [],		// 신차검색차종리스트			

            // selectTab
            selectTab           : "",		// 탭구분
            
            // 조회조건
            condObj01           : {},		// 탭01 조회조건
            condObj02           : {},		// 탭02 조회조건
            condObj03           : {},		// 탭03 조회조건
            condObj04           : {},		// 탭04 조회조건

            // 브랜드목록(리턴받음)
            carBrandList        : [],		// 자동차브랜드목록

            // 공통코드 리스트
            carOilCList         : [],		// 자동차유류코드
            carSelRgnCList      : [],		// 자동차판매지역코드
            ncarAmDscList       : [],		// 신차금액구분코드
            cartpDscList        : [],		// 차종구분코드
            cartpDscGrpList     : [],       // 차종구분코드GrpList(조건검색시 사용(크기/외형))
                
            pageNum             : 0,		// 페이지번호
            lsPageYn            : "",		// 다음페이지존재여부 '1':존재 , '0':미존재

            addSrchCarList      : [],		// 신차 조회목록 누적

            srchGbn1            : '',		// 검색구분1
            srchGbn2            : '',		// 검색구분2
            srchGbn3            : '',		// 검색구분3
            srchGbn4            : '',		// 검색구분4

            srchflag1            : '',		// 키워드조회구분1
            srchflag2            : '',		// 키워드조회구분2
            srchflag3            : '',		// 키워드조회구분3
            srchflag4            : '',		// 키워드조회구분4

            carModlnmG          : '',       // 자동차모델명(휘발유)
            carModlnmD          : '',       // 자동차모델명(경유)
            carModlnmL          : '',       // 자동차모델명(LPG)
            carModlnmO          : '',       // 자동차모델명(기타)
        }
    },
    mixins: [
        popupMixin
        ,commonMixin
    ],
    created() {
        this.pageNum     = 1   // 페이지번호

        this.carOilCList    = this.getCodeList("CAR_OIL_C")		// 자동차유류코드
        this.carSelRgnCList = this.getCodeList("CAR_SEL_RGN_C").filter((obj) => obj.comnCVal !== "0") // 자동차판매지역코드(전체제외)
        this.ncarAmDscList  = this.getCodeList("NCAR_AM_DSC")   // 신차금액구분코드
        this.cartpDscList  = this.getCodeList("CARTP_DSC")  	// 차종구분코드

        console.log("차종구분코드 : ", this.getCodeList("CARTP_DSC"))

        //G(가솔린), D(디젤), L(LPG), E(전기), H(수소), C(CNG), X(하이브리드)
        // 전기, 수소, CNG, 하이브리드의 경우 EV기타로 분류(O : Other)
        this.carOilCList = this.carOilCList.map((obj) => { return { comnCVal : obj.comnCVal === "E"  || obj.comnCVal === "H" || obj.comnCVal === "C" || obj.comnCVal === "X" ? 'O' : obj.comnCVal
                                                                ,  comnCExpl : obj.comnCVal === "E"  || obj.comnCVal === "H" || obj.comnCVal === "C" || obj.comnCVal === "X" ? 'EV · 기타' : obj.refCntn1
                                                                    }}
                                                ).filter((o, idx, arr) => { return arr.findIndex((i) => i.comnCVal === o.comnCVal && i.comnCExpl === o.comnCExpl) === idx })
        
        /* 2022.09.15 기획자 요청에 따른 차종구분코드 (CARTP_DSC) Grouping
         * Grouping ID  : CARTP_DSC(차종구분코드)
         * Grouping1    : P6(준대형), P7(대형) => P0(대형)
         * Grouping2	: R1(경형 SUV), R2(소형 SUV), R3(준중형 SUV), R5(중형 SUV), R7(대형 SUV) => R0(SUV)
         * Grouping방법	: 화면에서 보여주는 명칭은 REF_CNTN1, Grouping 참조코드는 REF_CNTN2
         * 실제로 DB조회 시 Grouping 해제 후 COMN_C_VAL로 넘김  
         */
        this.cartpDscGrpList = this.cartpDscList.map((obj) => { return { comnCVal : obj.comnCVal, comnCExpl : obj.comnCExpl, refCntn1 : obj.refCntn1, refCntn2 : obj.refCntn2}}
                                                ).filter((o, idx, arr) => { return arr.findIndex((i) => i.refCntn2 === o.refCntn2 && i.refCntn1 === o.refCntn1) === idx })
        
        console.log('차종구분코드Groupping Data : >>>>>>>>', this.cartpDscGrpList);
    },	
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

            console.log("params : ", params)

            // 파라미터 셋팅(임시)
            this.mydtCusno = this.getUserInfo('mydtCusno')    // 마이데이터 고객번호
            this.basYy     = dateFormat(new Date(), 'YYYY')   // 기준년도
            this.basYm     = dateFormat(new Date(), 'YYYYMM') // 기준년월
            this.selectTab = "G"	// 휘발유

            this.$nextTick(() => {
                this.fn_selectTab(this.selectTab)
            })	

            // 조회
            this.getData()
        },		
        getData() {		
            console.log("인기차종TOP10(신차)조회(POP) CALL!!")

            let carPplrtCndDsc = "01"
            const config = {
                url: '/an/ca/02r01',
                data: {"mydtCusno" : this.mydtCusno, // 마이데이터고객번호
                        "carPplrtCndDsc" : carPplrtCndDsc	// 자동차인기조건구분코드
                    }
            }

            apiService.call(config).then(response => {
                console.log("인기차종TOP10(신차)조회 response >>> : ", response)
                
                this.newCarPopCnt     = response.newCarCnt     || 0		// 신차건수
                this.reqData          = response.newCarTopList || [] 	// 인기차종리스트

                if(this.reqData.length > 0){
                    this.newCarTopPopList  = this.reqData.filter(item => item.carPplrtCndDsc === "03")		// 인기차종리스트(신차(03))

                    // 인기차종TOP10(신차)조회(POP)
                    this.$nextTick(() => {
                        fncSlick_carSrch(300, false, null, 0, null);
                    }, 10)
                }
            })			
            
            console.log("srchCarList : ", this.srchCarList)
        },
        // 더보기
        fn_showMoreList() {
            this.pageNum  = this.pageNum + 1
            this.fn_srchCarList(this.selectTab)
            //this.getData()
        },		
        fn_selectTab(gbn){

            if(this.selectTab != gbn){
                this.selectTab = gbn
            }

            this.$nextTick(() => {
                $('.tab_radius a').each(function(){
                    if($(this).hasClass('active')){
                        var $this = $(this),
                            _thisId = $this.attr('data-tab-tooltip'),
                            _thisleft = $this.outerWidth(true)/2 + $this.offset().left - 30;
                        $('#'+_thisId).show().find('.arrow').css('left',_thisleft);
                        $('#'+_thisId).siblings().hide();
                    }
                })			
            })

            console.log("탭에 따라서 조회!!!");
            this.fn_srchCarList(gbn, "init")

        },

        // 신차검색 목록조회
        fn_srchCarList(selTab, selMode){			
            console.log("신차검색 목록조회(POP) CALL!!")
            console.log("selTab :", selTab)

            let srchObj           = {}	// 검색조건obj
            let inDsc1            = ""	// 조회조건1
            let reqCarSelRgnCList = []	// 자동차판매지역코드
            let reqCartpDscList   = []  // 차종구분코드
            let reqNcarAmDscList  = []  // 신차금액구분
            let reqCarBrandList   = []  // 자동차브랜드목록						
            let carModlnm         = ""  // 자동차모델명

            // Tab 분기
            switch(selTab){
                case "G" : // 휘발유
                    srchObj = this.condObj01
                    carModlnm = this.carModlnmG
                    break
                case "D" : // 경유
                    srchObj = this.condObj02
                    carModlnm = this.carModlnmD
                    break
                case "L" : // LPG
                    srchObj = this.condObj03
                    carModlnm = this.carModlnmL
                    break
                case "O" : // EV.기타
                    srchObj = this.condObj04
                    carModlnm = this.carModlnmO
                    break
                default :
                    srchObj = "" 
                    break															
            }

            // 최초조회
            if(selMode === 'init'){
                this.pageNum = 1
                this.addSrchCarList = []
            }

            // 조회조건 값이 비었는지 검사
            if(Object.keys(srchObj).length > 0){

                inDsc1 = "02"		// 조회조건1(선택(02))

                // 자동차판매지역코드(수입여부) carSelRgnC
                if(srchObj.carSelRgnCArr.length > 0){
                    reqCarSelRgnCList = srchObj.carSelRgnCArr.map((item) => { return { "carSelRgnC" : item }})
                }

                // 차종구분(크기/외형) cartpDsc
                if(srchObj.cartpArr.length > 0){
                    srchObj.cartpArr.map((item) => {						
                        // P0(대형), R0(SUV)의 경우 Grouping 해제
                        if(item === "P0" || item === "R0"){
                            // Grouping 해제 후 실제 COMN_C_VAL로 넘김
                            this.cartpDscList.filter(obj => obj.refCntn2 === item).map((i) => {						
                                reqCartpDscList.push({ "cartpDsc" : i.comnCVal })
                            })
                        }else{
                            reqCartpDscList.push({ "cartpDsc" : item }) 
                        }
                    })
                }

                // 신차금액구분(금액) ncarAmDsc
                if(srchObj.ncarAmArr.length > 0){
                    reqNcarAmDscList = srchObj.ncarAmArr.map((item) => { return { "ncarAmDsc" : item }})
                }

                // 수입여부가 선택되어 있고 브랜드가 선택되지 않은 경우 전체로 처리
                console.log('조회조건1 : ', srchObj.carSelRgnCArr.includes('1'))
                console.log('조회조건2 : ', srchObj.carBrandArr.some((arr) => arr < 200))

                // 수입여부(국산) 선택, 브랜드 미선택 시 전체로 선택
                if(srchObj.carSelRgnCArr.includes('1') && srchObj.carBrandArr.some((arr) => arr < 200) === false){
                    srchObj.carBrandList.filter((arr) => arr.carBranNo < 200 ).map((item) => { reqCarBrandList.push({ "carBranNo" : item.carBranNo })})
                }
                
                // 수입여부(수입) 선택, 브랜드 미선택 시 전체로 선택
                if(srchObj.carSelRgnCArr.includes('2') && srchObj.carBrandArr.some((arr) => arr >= 200) === false){
                    srchObj.carBrandList.filter((arr) => arr.carBranNo >= 200 ).map((item) => { reqCarBrandList.push({ "carBranNo" : item.carBranNo })})
                }

                // 자동차브랜드번호(브랜드) carBranNo
                if(srchObj.carBrandArr.length > 0){
                    srchObj.carBrandArr.map((item) => { reqCarBrandList.push({ "carBranNo" : item })})
                }

                // 자동차브랜드목록(전체) copy
                if(srchObj.carBrandList.length > 0){
                    this.carBrandList = Object.assign([], srchObj.carBrandList)
                    console.log('copyResult : ', this.carBrandList)
                }
            }else if (carModlnm != ''){
                inDsc1 = "02"	// 조회조건1(조건선택(02))			
            }else{
                inDsc1 = "01"	// 조회조건1(조건미선택(01))				
            }

            const config = {
                url: '/an/ca/02r02',
                data: {"mydtCusno"		  : this.mydtCusno,								// 마이데이터고객번호
                        "inDsc1"          : inDsc1,	 									// 조회조건1(조건미선택(01), 선택(02))
                        "inDsc2"          : "",											// 조회조건2(미사용)
                        "carOilC"         : selTab,             						// 자동차유류코드(selectTab)
                        "pageNum"         : this.pageNum,								// 페이지번호
                        "carSelRgnCList"  : inDsc1 == '02' ? reqCarSelRgnCList : [],	// 자동차판매지역코드(수입여부)
                        "cartpDscList"    : inDsc1 == '02' ? reqCartpDscList   : [],	// 차종구분코드
                        "ncarAmDscList"   : inDsc1 == '02' ? reqNcarAmDscList  : [],	// 신차금액구분
                        "carBrandList"    : inDsc1 == '02' ? reqCarBrandList   : [],	// 자동차브랜드번호
                        "carModlnm"       : inDsc1 == '02' ? carModlnm         : ''		// 자동차모델명						
                    }
            }

            console.log('paramData : ', config);

            apiService.call(config).then(response => {
                console.log("신차검색 목록조회 response >>> : ", response)
                
                this.srchCarCnt  = response.srchCarCnt  || 0	// 신차 검색건수
                this.srchCarList = response.srchCarList || []	// 신차검색차종리스트
                this.lsPageYn    = response.lsPageYn    || ""	// 다음페이지 존재여부 (1:존재, 0:미존재)
                
                let tmpCarList = response.srchCarList || []
                if(this.addSrchCarList.length > 0) {
                    for(let i=0; i< tmpCarList.length; i++) {
                        this.addSrchCarList.push(tmpCarList[i])
                    }
                } else {
                    this.addSrchCarList = tmpCarList
                }
            })					
        },
        fn_srchKeyWdCarList(selTab, selMode){
            console.log("신차검색 목록조회(POP) CALL!!")
            console.log("selTab :", selTab)

            let inDsc1    = ""	// 조회조건1
            let carModlnm = ""  // 자동차모델명					

            // Tab 분기
            switch(selTab){
                case "G" : // 휘발유
                    carModlnm = this.carModlnmG
                    this.srchflag1 = 'keySrch'
                    break
                case "D" : // 경유
                    carModlnm = this.carModlnmD
                    this.srchflag2 = 'keySrch'
                    break
                case "L" : // LPG
                    carModlnm = this.carModlnmL
                    this.srchflag3 = 'keySrch'					
                    break
                case "O" : // EV.기타
                    carModlnm = this.carModlnmO
                    this.srchflag4 = 'keySrch'		
                    break
                default :
                    carModlnm = "" 
                    break															
            }

            // 최초조회
            if(selMode === 'init'){
                this.pageNum = 1
                this.addSrchCarList = []
            }

            if(carModlnm === ""){
                modalService.alert("모델명을 입력해주세요.").then(() => {})
                inDsc1 = "01"
                return	
            }else{
                inDsc1 = "02"		// 조회조건1(선택(02)

                const config = {
                    url: '/an/ca/02r02',
                    data: {"mydtCusno"		 : this.mydtCusno, // 마이데이터고객번호
                            "inDsc1"         : inDsc1,	 	   // 조회조건1(조건미선택(01), 선택(02))
                            "inDsc2"         : "",			   // 조회조건2(미사용)
                            "carOilC"        : selTab,         // 자동차유류코드(selectTab)
                            "pageNum"        : this.pageNum,   // 페이지번호
                            "carSelRgnCList" : [],	           // 자동차판매지역코드(수입여부)
                            "cartpDscList"   : [],	           // 차종구분코드
                            "ncarAmDscList"  : [],	           // 신차금액구분
                            "carBrandList"   : [],		       // 자동차브랜드번호
                            "carModlnm"		 : carModlnm       // 자동차모델명(검색어)						
                        }
            }

            console.log('paramData : ', config);

            apiService.call(config).then(response => {
                console.log("신차검색 목록조회 response >>> : ", response)
                
                this.srchCarCnt  = response.srchCarCnt  || 0	// 신차 검색건수
                this.srchCarList = response.srchCarList || []	// 신차검색차종리스트
                this.lsPageYn    = response.lsPageYn    || ""	// 다음페이지 존재여부 (1:존재, 0:미존재)
                
                let tmpCarList = response.srchCarList || []
                if(this.addSrchCarList.length > 0) {
                    for(let i=0; i< tmpCarList.length; i++) {
                        this.addSrchCarList.push(tmpCarList[i])
                    }
                } else {
                    this.addSrchCarList = tmpCarList
                }
            })					
            }
        },

        // 조건검색
        fn_openSearch(pCond = {}) {

            // 이미 선택 된 경우 조회 파라미터 셋팅
            console.log("paramSrch : ", pCond)
            console.log("paramSrch1 : ", Object.keys(pCond).length)
            console.log('1111111111>>>>')

            let param = { carSelRgnCList : this.carSelRgnCList		// 자동차판매지역코드(CAR_SEL_RGN_C)
                        , ncarAmDscList  : this.ncarAmDscList		// 신차금액구분코드(NCAR_AM_DSC)
                        , cartpDscList   : this.cartpDscGrpList		// 차종구분코드(CARTP_DSC)(크기/외형Grouping)
                        , pCarSelRgnCArr : (Object.keys(pCond).length > 0 && pCond.carSelRgnCArr.length > 0) ? pCond.carSelRgnCArr : []		// 자동차판매지역코드(조건param)
                        , pCartpArr      : (Object.keys(pCond).length > 0 && pCond.cartpArr.length      > 0) ? pCond.cartpArr      : []		// 차종구분코드		(조건param)
                        , pNcarAmArr     : (Object.keys(pCond).length > 0 && pCond.ncarAmArr.length     > 0) ? pCond.ncarAmArr     : []		// 신차금액구분코드	(조건param)
                        , pCarBrandArr   : (Object.keys(pCond).length > 0 && pCond.carBrandArr.length   > 0) ? pCond.carBrandArr   : []		// 자동차브랜드번호	(조건param)
                        }
        
            const popConfig = {
                params : param,
                renderer : {
                    component : ANCA2205
                }
            }

            modalService.openSlidePagePopup(popConfig).then(response => {
                console.log('팝업리턴 : ', response)

                switch(this.selectTab){
                    case "G" : // 휘발유
                        this.condObj01 = response.rtnData
                        //console.log('ddddddd = >', this.condObj01.carBrandArr.length)
                        //console.log('dddddddr = >', this.condObj01.carBrandArr)						
                        //console.log('ddddddd1 = >', this.condObj01.carBrandArr.filter((obj) => obj >= 200).length)
                        //console.log('ddddddd2 = >', this.condObj01.carBrandArr.filter((obj) => obj < 200).length)						
                        break
                    case "D" : // 경유
                        this.condObj02 = response.rtnData
                        break
                    case "L" : // LPG
                        this.condObj03 = response.rtnData
                        break
                    case "O" : // EV.기타
                        this.condObj04 = response.rtnData
                        break
                    default :
                        break															
                }
                
                // 콤보선택완료후 조회
                this.fn_srchCarList(this.selectTab, "init")
            });

        },
        // 키워드 검색
        fn_srchCtrl(gbn){
            switch(this.selectTab){
                case "G" : // 휘발유
                    if(this.srchGbn1 != gbn){
                        this.srchGbn1 = gbn
                    }
                    break
                case "D" : // 경유
                    if(this.srchGbn2 != gbn){
                        this.srchGbn2 = gbn
                    }
                    break
                case "L" : // LPG
                    if(this.srchGbn3 != gbn){
                        this.srchGbn3 = gbn
                    }
                    break
                case "O" : // EV.기타
                    if(this.srchGbn4 != gbn){
                        this.srchGbn4 = gbn
                    }
                    break
                default :
                    break															
            }

            // 취소를 선택한 경우 재조회
            if(gbn === ''){

                if(this.selectTab === "G"){
                    this.carModlnmG = ''
                    this.srchflag1  = ''
                }
                if(this.selectTab === "D"){
                    this.carModlnmD = ''
                    this.srchflag2  = ''
                }
                if(this.selectTab === "L"){
                    this.carModlnmL = ''
                    this.srchflag3  = ''
                }
                if(this.selectTab === "O"){
                    this.carModlnmO = ''
                    this.srchflag4  = ''
                }

                this.fn_srchCarList(this.selectTab, "init")
            }
        },

        // 검색초기화
        fn_clearSearch(){
            switch(this.selectTab){
                case "G" : // 휘발유
                    this.condObj01 = {}
                    break
                case "D" : // 경유
                    this.condObj02 = {}
                    break
                case "L" : // LPG
                    this.condObj03 = {}
                    break
                case "O" : // EV.기타
                    this.condObj04 = {}
                    break
                default :
                    break															
            }

            // 초기화 후 재조회
            this.fn_srchCarList(this.selectTab, "init")
        },

        fn_goNewCarDetailPage(carCtrimNo) {
            
            if(this.carCtrimNo != carCtrimNo){
                this.carCtrimNo = carCtrimNo
            }

            console.log('상세페이지로 이동!!')

            let compName = ANCA2204
            let param    = {carCtrimNo : this.carCtrimNo}

            const config = {
                component: compName,
                params : param
            }

            modalService.openPopup(config).then(() => {})
        },		
        setAlt(carBrannm, carModlnm, carCtrimNm) {
            return carBrannm + " " + carModlnm + " " + carCtrimNm
        },
        fn_numberFormatKorAmt(number, unitType) {
            const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length

            let resultArray = []
            let resultString = ""

            for(let i = 0; i < splitCnt; i++){
                let rst = (number % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
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
                        if(unitType) {
                            resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '원</em>' + resultString
                        }else{
                            resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em>'+ unit[j] + '원' + resultString
                        }
                    } else {
                        if(unitType) {
                            resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '</em>' + resultString
                        }else{
                            resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em>'+ unit[j] + resultString
                        }
                    }
                }else{
                    if(unitType) {
                        resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '원</em>'
                    }else{
                        resultString = '<em class="num">'+String(numberFormat(resultArray[j])) +'</em>'+ unit[j] + '원'
                    }
                }
            }

            return resultString
        },
        fn_setImgUrl(imgPathnm){
            // 24.07.05, sungchul, 해당 기관 서버 느려서 도메인 변경
			//return 'http://nhcok.cardong.co.kr/img/' + imgPathnm
			return 'https://www.carpan.co.kr/img/' + imgPathnm;
        },
        emptyImg(e) {
            e.target.src = new URL("@/assets/images/icon/car_new06.png", import.meta.url).href
        },			
    },
    computed : {						
    }
}
</script>
<!-- slick 처음로딩시 이미지 펼처보이는 증상 없애기 -->
<!--
<style scoped>
    .vertical_car .slider_wrap .tab_cont {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.1s ease;
        -webkit-transition: opacity 0.1s;
    }
    .vertical_car .slider_wrap .tab_cont.slick-initialized {
        visibility: visible;
        opacity: 1;
    }
</style>
-->