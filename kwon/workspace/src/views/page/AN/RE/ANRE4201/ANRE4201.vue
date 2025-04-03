<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > NH콕부동산 > 부동산 자산관리 메인
* @ 페이지설명 : 더보기 > NH콕부동산 > 부동산 자산관리 메인 > 부동산 목록 조회
* @ 파일명     : src/views/page/AN/RE/ANRE4201/ANRE4201.vue
* @ 작성자     : CS528053
* @ 작성일     : 2022-07-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-25              CS528053              최초작성
* 2025-02-17              CS541015              고도화 파일명, UI 변경 및 고도화 개발(ANRE2201.vue -> ANRE4201.vue)
*************************************************************************/
-->
<template>
    <page class="content-view mydata2023">
        <!-- <an-category-v2 type="ANRE"></an-category-v2> -->

        <div id="content" class="sub_main renewal">
            <!-- 이벤트 페이지-->
            <template v-if="isJoin && isExEvt != 'false'">
                <template v-if="isSearch"> <!-- 조회된 이후부터 노출 -->
                    <div class="com_inner com_line_type01 com_line_round pt30">
                        <div class="event_page bg02">
                            <span class="icon_mint">NH콕부동산 오픈 이벤트</span>
                            <strong class="event_tit">이벤트에 응모하시면</strong><!-- 이벤트 응모 -->
                            <!-- <strong class="event_tit">부동산 추가하고 응모하면</strong> --><!-- 이벤트 부동산 추가 -->
                            <strong class="event_point_txt">
                                NH포인트 
                                <strong class="com_point_darkblue">10,000P</strong>
                                를 드려요!
                            </strong>
                        </div>
                        <div class="btn_flex_wrap">
                            <template v-if="rlestBasList.length > 0 || inteRlestList.length > 0">
                                <a href="javascript:void(0);" role="button" class="btn_round_new btn_mid_round bg_mint" @click.prevent="openEventPage()">응모하기</a>
                            </template>
                            <template v-else>
                                <a href="javascript:void(0);" role="button" class="btn_round_new btn_mid_round bg_mint" @click.prevent="openInsRlestPop()">나의부동산 등록</a>
                                <a href="javascript:void(0);" role="button" class="btn_round_new btn_mid_round bg_mint" @click.prevent="openInsInteRlestPop()">관심부동산 등록</a>
                            </template>
                        </div>
                    </div>
                </template>
            </template>

            <!-- 이미 응모를 했지만, 응모기한이 끝나지 않았고, 나의부동산/관심부동산 정보가 없을 경우 -->
            <template v-else-if="!isJoin && isExEvt != 'false' && rlestBasList.length == 0 && inteRlestList.length == 0">
                <template v-if="isSearch"> <!-- 조회된 이후부터 노출 -->
                    <div class="com_inner com_line_type01 com_line_round pt30">
                        <div class="event_page bg02">
                            <span class="icon_mint">NH콕부동산 오픈 이벤트</span>
                            <strong class="event_tit">이벤트에 응모하시면</strong><!-- 이벤트 응모 -->
                            <strong class="event_point_txt">
                                NH포인트 
                                <strong class="com_point_darkblue">10,000P</strong>
                                를 드려요!
                            </strong>
                        </div>
                        <div class="btn_flex_wrap">
                            <a href="javascript:void(0);" role="button" class="btn_round_new btn_mid_round bg_mint" @click.prevent="openInsRlestPop()">나의부동산 등록</a>
                            <a href="javascript:void(0);" role="button" class="btn_round_new btn_mid_round bg_mint" @click.prevent="openInsInteRlestPop()">관심부동산 등록</a>
                        </div>
                    </div>
                </template>
            </template>
            <!-- //이벤트 페이지 끝 -->

            <div class="com_inner">
                <!-- 자산 부동산 데이터 있을때 -->
                <template v-if="rlestBasList.length > 0">
                    <div class="house_info">
                        <strong class="com_cont_tit01">나의부동산</strong>
                        <!-- [v4.0] -->
                        <div class="house_slide slide house_slick">
                            <div class="item" v-for="(rlestBas, idx) in rlestBasList" :key="'rlest_'+idx">
                                <div class="bg_box">
                                    <a href="javascript:void(0);" class="com_cont_tit01" @click.prevent="openRlestFullPop('ANRE2203')">{{rlestBas.aptHcxnm}}</a>
                                    <p class="detail_size">
                                        <span>면적</span>
                                        <em>{{rlestBas.newPytpAreaCntn}}㎡</em>
                                    </p>
                                    <div class="label_list">
                                        <span class="icon_mint">아파트</span>
                                        <span class="icon_mint">{{getComCodeNm('RLEST_RSD_FORM_DSC', rlestBas.rlestRsdFormDsc)}}</span>
                                        <span class="icon_mint" v-if="rlestBas.revnMnEn == '1'">임대중</span>
                                    </div>
                                </div>
                                <div class="house_price">
                                    <span class="txt">매매시세</span>
                                    <span v-html="fn_hanValue_classDiff((rlestBas.genDlAm*10000), '', 'won')"></span>
                                    <strong class="txt_gray">한국부동산원</strong>
                                </div>
                                <div class="house_price">
                                    <!-- 위티거래ID(실거래가 정보)가 있을 경우에만 show -->
                                    <template v-if="rlestBas.uitiTrId != '' && rlestBas.uitiTrId != null">
                                        <p class="house_price_tit">최근 실거래가</p>
                                        <!-- <span class="txt">최근 {{getComCodeNm('UITI_TR_TPC', rlestBas.uitiTrTpnm || '')}} 실거래가</span> -->

                                        <!-- 매매일 경우 -->
                                        <template v-if="rlestBas.uitiTrTpnm == 'deal' && rlestBas.uitiDlPr > 0">
                                            <span class="txt">{{getComCodeNm('UITI_TR_TPC', rlestBas.uitiTrTpnm || '')}}<template v-if="Number(rlestBas.uitiLyno) != null && Number(rlestBas.uitiLyno) != undefined">({{rlestBas.uitiLyno}}층)</template></span>
                                            <strong v-html="fn_hanValue_classDiff(Number(rlestBas.uitiDlPr)*10000, 'com_point_darkblue', 'won')"></strong>
                                        </template>

                                        <!-- 전세일 경우 -->
                                        <template v-else-if="rlestBas.uitiTrTpnm == 'lease' && rlestBas.uitiGrmy > 0">
                                            <span class="txt">{{getComCodeNm('UITI_TR_TPC', rlestBas.uitiTrTpnm || '')}}<template v-if="Number(rlestBas.uitiLyno) != null && Number(rlestBas.uitiLyno) != undefined">({{rlestBas.uitiLyno}}층)</template></span>
                                            <strong v-html="fn_hanValue_classDiff(Number(rlestBas.uitiGrmy)*10000, 'com_point_darkblue', 'won')"></strong>
                                        </template>

                                        <!-- 월세일 경우 -->
                                        <template v-else-if="rlestBas.uitiTrTpnm == 'rent'">
                                            <span class="txt">{{getComCodeNm('UITI_TR_TPC', rlestBas.uitiTrTpnm || '')}}<template v-if="Number(rlestBas.uitiLyno) != null && Number(rlestBas.uitiLyno) != undefined">({{rlestBas.uitiLyno}}층)</template></span>
                                            <strong v-html="fn_hanValue_classDiff(Number(rlestBas.uitiGrmy)*10000, 'com_point_darkblue', 'won')"></strong>
                                            <template v-if="rlestBas.uitiGrmy == 0 || rlestBas.uitiGrmy == ''">
                                                <strong><em class="com_point_darkblue">0</em><span class="won">원</span></strong>
                                            </template>
                                            /
                                            <strong v-html="fn_hanValue_classDiff(Number(rlestBas.uitiMmr)*10000, 'com_point_darkblue', 'won')"></strong>
                                            <template v-if="rlestBas.uitiMmr == 0 || rlestBas.uitiMmr == ''">
                                                <strong><em class="com_point_darkblue">0</em><span class="won">원</span></strong>
                                            </template>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <p class="com_txtinfo_type01">최근 실거래가가 없습니다.</p>
                                    </template>

                                    <!-- 세입자가 있거나 전세/월세일 경우 표시 -->
                                    <template v-if="rlestBas.revnMnEn == '1' || rlestBas.rlestRsdFormDsc == '2' || rlestBas.rlestRsdFormDsc == '3'">
                                        <!-- 임대만료일이 4개월 이내일 때 -->
                                        <template v-if="calcContLimit(rlestBas.dueDt) <= 120 && calcContLimit(rlestBas.dueDt) > 0">
                                            <!-- <span class="txt">{{calcContLimit(rlestBas.dueDt)}}개월 뒤 임대계약이 만료될 예정이에요!</span> -->
                                            <p class="notice_txt">임대계약이 {{dateFormatKor(rlestBas.dueDt)}} 만료됩니다.</p>
                                        </template>
                                        <template v-else-if="calcContLimit(rlestBas.dueDt) <= 0">
                                            <p class="notice_txt">만료된 임대차계약정보를 수정하세요.</p>
                                        </template>
                                    </template>
                                </div>
                                <div class="menu_btns">
                                    <button type="button" class="stdBtn innerType01" @click.prevent="openUpdRlestPop()">수정</button>
                                    <button type="button" class="stdBtn innerType01" @click.prevent="openDelRlestPop()">삭제</button>
                                </div>  
                            </div>   
                        </div>
                        <div class="btn_option">
                            <button type="button" class="btn_round_new btn_mid_round line_gray i_plus" @click.prevent="openInsRlestPop()">부동산 등록</button>
                        </div>
                    </div>
                </template>

                <!-- 자산 부동산 데이터 없을때 -->
                <template v-else>
                    <div class="com_box_type01 no_data_wrap">
                        <div class="no_data_box">
                            <div class="no_data_list">
                                <p>등록된 나의 부동산이 없습니다.</p>
                                <span class="txt_sub">부동산을 등록하시면 다양한<br/>
                                    서비스를 제공받을 수 있습니다.</span>
                            </div>
                            <div class="btn_option">
                                <button type="button" class="btn_round_new btn_mid_round line_gray i_plus" @click.prevent="openInsRlestPop()">부동산 등록</button>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- 전세/월세일 경우에만 노출 -->
                <template v-if="currRlestRsdFormDsc == '2' || currRlestRsdFormDsc == '3'">
                    <div class="blue_link ico02" @click.prevent="openRlestFullPop('ANRE2202', 'rlest')">
                        <!-- Case 1: 시세 이상의 (금융자산 - 대출총액) 보유시 -->
                        <template v-if="(assetsTotAm - loanTotAm) >= rlestBasList[currIdx].genDlAm">
                            <p>축하드려요! 이 아파트를 <br>
                                현재 구입할 수 있는 조건을 갖추셨어요.
                            </p>
                        </template>

                        <!-- Case 2: 시세 이상의 (금융자산 - 대출총액)은 안되지만, 보유 부동산을 처분하면 시세 이상인 경우 -->
                        <template v-else-if="(assetsTotAm - loanTotAm + rlestTotAm) >= rlestBasList[currIdx].genDlAm">
                            <p>보유하신 순금융자산 외에 부동산 자금까지 활용하면 이 아파트를 지금 구입할 수 있는 조건을 갖추셨네요</p>
                        </template>

                        <!-- Case 3: 시세 이하의 (금융자산 - 대출총액 + 부동산자산) 보유시 -->
                        <template v-else>
                            <p>이 아파트를 지금 사시려면 {{fn_hanValue(calcBannerLackAm('rlest'))}} 정도가 필요해요!</p>
                        </template>
                        <a href="javascript:void(0)" role="burron" class="btn_icon_arrow"><span>나의 자산 살펴보기</span></a>
                    </div>
                </template>

                <!-- [v4.0] 부동산 청약 영역 추가 / 25-03-13 구조 전체적으로 변경 -->
                <hr class="hr04" aria-hidden="true">
                <div class="apart_info">
                    <div class="tit_area">
                        <div class="custom_tooltip">부동산 청약
                            <div class="com_tooltip_type02 com_tooltip_type03">
                                <a href="#nolink" class="com_btn_info">
                                    <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                </a>
                                <div class="com_ballon_type01 com_ballon_type02">
                                    <div>
                                        <p>선택하신 관심지역에 따라 한국부동산원 청약홈에 등록된 APT 1·2순위 청약 공고 및 신청일을 알려드립니다.
                                            (NH콕부동산에서는 공고일 기준 정보를 제공하여, 청약홈과 공고 내용이 다소 상이할 수 있습니다.)</p>
                                        <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="date">업데이트 <span>{{sbpBasDt}}</span></p>
                    </div>

                    <div class="push_noti">
                        <div class="btn_flex">
                            <a href="#nolink" class="btn_txt" @click.prevent="openAreaPop()">{{inteText}}</a>
                            <div class="switch">
                                <span class="txt">PUSH 알림</span>
                                <span class="cmm-switch sm">
                                    <input type="checkbox" id="check01" name="check01" role="switch">
                                    <label for="check01"><em class="blind">금융자산 합계반영</em></label>
                                </span>
                            </div>
                        </div>
                        <div class="gray_box">
                            <p class="com_txtinfo_type01">PUSH 알림은 설정지역의 아파트만 제공해요.</p>
                        </div>
                    </div>

                    <!-- 청약정보 있을 경우 -->
                    <div class="info_cont">
                        <div class="apart_slider" :key="'hse+'+refRcmKey">
                            <div class="tit_group">
                                <p class="h_tit02">청약정보 <span class="num">{{pubRlestCnt}}</span>건</p>
                                <a href="#nolink" role="button" class="btn_icon_arrow" v-if="rlestSbpList.length &gt; 0" @click.prevent="openPubRlestListPop()"><span>모두보기</span></a>
                            </div>
                            <div class="btn_wrap">
                                <button type="button" class="btn_wish_case" @click.prevent="openPubRlestTypePop()"><span class="blind">현재 선택된 공급유형</span> <em>{{localPubRlestText}}</em> <span class="blind">공급유형 선택</span></button>
                            </div>
                            <ul class="slick" v-if="rlestSbpList.length &gt; 0">
                                <li v-for="(rlestSbp, idx) in rlestSbpList.slice(0, 5)" :key="'sbp_'+idx">
                                    <div href="#nolink" class="item">
                                        <div class="top_info">
                                            <!-- badge 타입 구분
                                                badge + type01 : 아파트, 무순위/잔여세대, 계약취소주택
                                                badge + type02 : 도시형생활주택, 오피스텔, 민간임대, 공공지원민간임대
                                                badge + type03 : 임의공급
                                            -->
                                            <div class="cate">
                                                <span :class="typeMap[rlestSbp.hseKdDsc]">{{typeText[rlestSbp.hseKdDsc]}}</span>
                                            </div>
                                            <span class="date">{{convertToDate(rlestSbp.rcrtNtfyDt)}} 공고</span>				
                                        </div>
                                        <p class="title">{{rlestSbp.hsenm}}</p>
                                        <p class="price">분양가<strong>{{ numberToKorean(rlestSbp.minAm * 10000)}} ~ {{numberToKorean(rlestSbp.maxAm * 10000)}}</strong></p>
                                        <dl>
                                            <dt>청약 일정</dt>
                                            <dd>
                                                <p>1순위 모집</p>
                                                <p>{{convertToDate(rlestSbp.ord1CorRgnRcStDt)}} ~ {{convertToDate(rlestSbp.ord1CorRgnRcEdDt)}}</p>
                                            </dd>
                                            <dd>
                                                <p>2순위 모집</p>
                                                <p>{{convertToDate(rlestSbp.ord2CorRgnRcStDt)}} ~ {{convertToDate(rlestSbp.ord2CorRgnRcEdDt)}}</p>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                            <!-- 청약정보 없을 경우 -->
                            <div class="com_box_type01 no_data_wrap" v-else>
                                <div class="no_data_box">
                                    <div class="no_data_list">
                                        <p>현재 공고된 청약이 없어요.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                    <div class="inner_banner">
                        <a href="#nolink" role="button">
                            <img src="@/assets_v40/images/banner/img_banner_house_info.png" alt="내 집 마련의 모든 것 청약홈에서 쉽게 확인하세요.">
                        </a>
                    </div>
                </div>
                <hr class="hr04" aria-hidden="true">
                <!-- //[v4.0] 부동산 청약 영역 추가 / 25-03-13 구조 전체적으로 변경 -->

                <div class="box_border_link">
                    <a href="javascript:void(0)" role="button" class="ico05" @click.prevent="openRlestFullPop('ANRE2205')">
                        <strong>AI로 최적화된</strong>
                        <strong class="arrow">매물 추천 받기</strong>
                    </a>
                    <a href="javascript:void(0)" role="button" class="ico06" @click.prevent="openRlestFullPop('ANRE2204')">
                        <strong>관심지역 매물,</strong>
                        <strong class="arrow">시세 지도 찾기</strong>
                    </a>
                </div>

                <!-- 관심 부동산 데이터 있을때 -->
                <template v-if="inteRlestList.length > 0">
                    <div class="house_info">
                        <strong class="com_cont_tit01">관심부동산</strong>
                        <div class="house_slide slide house_slick2">
                            <div class="item" v-for="(inteRlest, idx) in inteRlestList" :key="'inteRlest_'+idx">
                                <div class="bg_box">
                                    <a href="javascript:void(0);" class="com_cont_tit01" @click.prevent="openInteRlestDet()">{{inteRlest.aptHcxnm}}</a>
                                    <p class="house_city">{{inteRlest.provnm || ''}} {{inteRlest.cwnm || ''}} {{inteRlest.dgnm || ''}}</p>
                                    <p class="detail_size">
                                        <span>면적</span>
                                        <em>{{inteRlest.newPytpAreaCntn}}㎡</em>
                                    </p>
                                    <div class="label_list">
                                        <!-- <span class="icon_mint">아파트</span> -->
                                    </div>
                                </div>
                                <div class="house_price">
                                    <span class="txt">매매시세</span>
                                    <span v-html="fn_hanValue_classDiff((inteRlest.genDlAm*10000), '', 'won')"></span>
                                    <strong class="txt_gray">한국부동산원</strong>
                                </div>
                                <div class="house_price">
                                    <!-- 위티거래ID(실거래가 정보)가 있을 경우에만 show -->
                                    <template v-if="isUitiShow(inteRlest.uitiList)">
                                        <div v-for="(uitiObj, idx) in inteRlest.uitiList" :key="'uiti_'+idx">
                                            <template v-if="idx == 0">
                                                <p class="house_price_tit">최근 실거래가</p>
                                            </template>
                                            <!-- <span class="txt">최근 {{getComCodeNm('UITI_TR_TPC', uitiObj.trTpnm || '')}} 실거래가</span> -->
                                        
                                            <!-- 매매일 경우 -->
                                            <template v-if="uitiObj.trTpnm == 'deal' && uitiObj.dlPr > 0">
                                                <span class="txt">{{getComCodeNm('UITI_TR_TPC', uitiObj.trTpnm || '')}}<template v-if="Number(uitiObj.lyno) != null && Number(uitiObj.lyno) != undefined">({{uitiObj.lyno}}층)</template></span>
                                                <strong v-html="fn_hanValue_classDiff(Number(uitiObj.dlPr)*10000, 'com_point_darkblue', 'won')"></strong>
                                            </template>

                                            <!-- 전세일 경우 -->
                                            <template v-if="uitiObj.trTpnm == 'lease' && uitiObj.grmy > 0">
                                                <span class="txt">{{getComCodeNm('UITI_TR_TPC', uitiObj.trTpnm || '')}}<template v-if="Number(uitiObj.lyno) != null && Number(uitiObj.lyno) != undefined">({{uitiObj.lyno}}층)</template></span>
                                                <strong v-html="fn_hanValue_classDiff(Number(uitiObj.grmy)*10000, 'com_point_darkblue', 'won')"></strong>
                                            </template>

                                            <!-- 월세일 경우 -->
                                            <template v-if="uitiObj.trTpnm == 'rent'">
                                                <span class="txt">{{getComCodeNm('UITI_TR_TPC', uitiObj.trTpnm || '')}}<template v-if="Number(uitiObj.lyno) != null && Number(uitiObj.lyno) != undefined">({{uitiObj.lyno}}층)</template></span>
                                                <strong v-html="fn_hanValue_classDiff(Number(uitiObj.grmy)*10000, 'com_point_darkblue', 'won')"></strong>
                                                <template v-if="uitiObj.grmy == 0 || uitiObj.grmy == ''">
                                                    <strong><em class="com_point_darkblue">0</em><span class="won">원</span></strong>
                                                </template>
                                                /
                                                <strong v-html="fn_hanValue_classDiff(Number(uitiObj.mmr)*10000, 'com_point_darkblue', 'won')"></strong>
                                                <template v-if="uitiObj.mmr == 0 || uitiObj.mmr == ''">
                                                    <strong><em class="com_point_darkblue">0</em><span class="won">원</span></strong>
                                                </template>
                                            </template>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <p class="com_txtinfo_type01">최근 실거래가가 없습니다.</p>
                                    </template>
                                    <div class="btn_area">
										<button type="button" class="btn_round_new btn_mid_round line_gray i_plus" @click.prevent="openInteInsRlestPop()">{{inteRlest.aptHcxnm}}을 나의 부동산으로 등록하기</button>
									</div>
                                </div>
                                <div class="menu_btns">
									<button type="button" class="stdBtn innerType01" @click.prevent="openUpdInteRlestPop()">수정</button>
									<button type="button" class="stdBtn innerType01" @click.prevent="delInteRlest()">삭제</button>
								</div>
                            </div>
                        </div>
                        <div class="btn_option">
                            <button type="button" class="btn_round_new btn_mid_round line_gray i_plus" @click.prevent="openInsInteRlestPop()">부동산 등록</button>
                        </div>
                    </div>
                </template>

                <!-- 관심 부동산 데이터 없을때 -->
                <template v-else>
                    <div class="com_box_type01 no_data_wrap">
                        <div class="no_data_box">
                            <div class="no_data_list">
                                <p>등록된 관심 부동산이 없습니다.</p>
                                <span class="txt_sub">관심부동산을 등록하시면 다양한<br/>
                                    서비스를 제공받을 수 있습니다.</span>
                            </div>
                            <div class="btn_option">
                                <button type="button" class="btn_round_new btn_mid_round line_gray i_plus" @click.prevent="openInsInteRlestPop()">부동산 등록</button>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="inteRlestList.length > 0">
                    <div class="blue_link ico02" @click.prevent="openRlestFullPop('ANRE2202', 'interest')">
                        <!-- Case 1: 시세 이상의 (금융자산 - 대출총액) 보유시 -->
                        <template v-if="(assetsTotAm - loanTotAm) >= inteRlestList[inteCurrIdx].genDlAm">
                            <p>축하드려요! 관심 아파트를 <br>
                                현재 구입할 수 있는 조건을 갖추셨어요.
                            </p>
                        </template>

                        <!-- Case 2: 시세 이상의 (금융자산 - 대출총액)은 안되지만, 보유 부동산을 처분하면 시세 이상인 경우 -->
                        <template v-else-if="(assetsTotAm - loanTotAm + rlestTotAm) >= inteRlestList[inteCurrIdx].genDlAm">
                            <p>보유하신 순금융자산 외에 부동산 자금까지 활용하면 이 아파트를 지금 구입할 수 있는 조건을 갖추셨네요</p>
                        </template>

                        <!-- Case 3: 시세 이하의 (금융자산 - 대출총액 + 부동산자산) 보유시 -->
                        <template v-else>
                            <p>이 아파트를 지금 사시려면 {{fn_hanValue(calcBannerLackAm('interest'))}} 정도가 필요해요!</p>
                        </template>
                        <a href="javascript:void(0)" role="burron" class="btn_icon_arrow"><span>나의 자산 살펴보기</span></a>
                    </div>
                </template>

                <div class="inner_banner">
                    <a href="javascript:void(0);" role="button" @click.prevent="openBannerLink()">
                        <div class="com_box_type03 exception bg24">
                            <div class="text">안전하고 편리한 매매서비스<br>
                                <span>수수료 반값까지 경험해 보세요.</span>
                            </div>
                            <span class="blue_arrow">서비스 받아보기</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <footersV2 type="an"/> <!-- asis 반영 시 as로 변경-->
    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
// import PdCategory from '@/components/category/PdCategory.vue'    // asis 반영 시 주석 해제
import AnCategoryV2 from '@/components/category/AnCategoryV2.vue'
import modalService from '@/service/modalService'
import appService from '@/service/appService'
import commonService from '@/service/commonService'
import apiService from '@/service/apiService'
import {numberFormat} from '@/utils/number'
import {dateFormat, dayDiff} from '@/utils/date'
import {fncSlick_house1, fncSlick_house2} from '@/utils/slick'

import ANRE2202 from '@/views/page/AN/RE/ANRE2202/ANRE2202'     // 나의 자산 조회
import ANRE2203 from '@/views/page/AN/RE/ANRE2203/ANRE2203'     // 부동산 상세(iframe)
import ANRE2204 from '@/views/page/AN/RE/ANRE2204/ANRE2204'     // 지도검색(iframe)
import ANRE2205 from '@/views/page/AN/RE/ANRE2205/ANRE2205'     // 부동산 추천(iframe)
import CORE4201 from '@/views/page/CO/RE/CORE4201/CORE4201'     // 자산 > 부동산 등록
import ANRE4208 from '@/views/page/AN/RE/ANRE4208/ANRE4208' 	// 관심지역 설정 팝업
import ANRE4209 from '@/views/page/AN/RE/ANRE4209/ANRE4209' 	// 부동산 청약리스트 조회 팝업
import ANRE4207 from '@/views/page/AN/RE/ANRE4207/ANRE4207'     // 관심부동산 등록
import ANRE4211 from '@/views/page/AN/RE/ANRE4211/ANRE4211' 	// 청약 공급유형 선택 팝업
import COET1003 from '@/views/page/CO/ET/COET1003/COET1003'     // 부동산 이벤트 응모팝업
import Template from '../../../XX/template/template.vue'

export default {
    name : "ANRE4201",
    data: () => {
        return {
            rlestBasList 		: [],	        // 부동산 보유 기본 목록
            currIdx             : 0,            // 현재 선택된 부동산 목록 인덱스(slick)
            currRlestRsdFormDsc : '',           // 현재 선택된 부동산 거주형태구분코드
            rlestHldSqno        : '',           // 부동산 보유 일련번호

            inteRlestList       : [],           // 관심부동산 목록
            inteCurrIdx         : 0,            // 현재 선택된 관심부동산 목록 인덱스

            rlestSbpList        : [],           // 청약 목록
            dsc                 : '0',          // 공급지역 탭
            sbpCurrIdx          : 0,            // 현재 선택된 청약 목록 인덱스
            sbpBasDt            : '',           // 청약 업데이트 일자
            sbpCtg              : '전체',       // 청약 카테고리명
            mydtSpyRgnC         : '',           // 공급지역코드

            inteList            : [],           // 관심지역코드목록
            inteNmList          : [],           // 관심지역목록
            inteText            : '서울',       // 관심지역 목록 문자열

            /* 나의부동산/관심부동산 하위 텍스트 배너 조건 계산 */
            rlestTotAm			: 0, 	        // 부동산 총 금액(지분율 포함된 금액)
            assetsTotAm         : 0,            // 금융자산 총 금액
            nhTotAm		        : 0,			// 농축협계좌합계
            othTotAm		    : 0,			// 타은행계좌합계
            loanTotAm           : 0,            // 대출 총 금액

            // 이벤트 관련 변수
            isJoin              : false,        // 이벤트 응모여부(true:응모가능, false:응모불가능)
            isExEvt             : '',           // 이벤트 종료여부(종료되었으면 false, 나머지는 null)
            isSearch            : false,        // 조회 여부(조회 전에 이벤트 화면 노출하지 않기 위함)

            refKey              : 0,
            refRcmKey           : 0,

            endIdx              : 0,            // 메인 화면에서 보여줄 청약 정보 갯수

            selectedCodeList	: [],           // 공급유형 배열(매개변수)
            localPubRlestList   : [],           // 공급유형 객체형태
            localPubRlestText   : '',           // 현재 공급유형버튼 문자열

            pageCount           : 20,           // 한번에 보여줄 목록 갯수
            page			    : 1 ,		    // 페이지 번호
            pubRlestCnt         : 0,            // 청약 부동산 총갯수

            regionMap: {
				100 : "서울",
				200 : "강원",
				300 : "대전",
				312 : "충남",
				338 : "세종",
				360 : "충북",
				400 : "인천",
				410 : "경기",
				500 : "광주",
				513 : "전남",
				560 : "전북",
				600 : "부산",
				621 : "경남",
				680 : "울산",
				690 : "제주",
				700 : "대구",
				712 : "경북",
			},
            typeMap: {'01':'badge type01',
					'09':'badge type01',
					'10':'badge type01',
					'04':'badge type01',
					'06':'badge type01',
					'02':'badge type02',
					'03':'badge type02',
					'11':'badge type03',
            },
            typeText: {'01':'아파트',
					'09':'아파트',
					'10':'아파트',
					'04':'아파트',
					'06':'아파트',
					'02':'도시형생활주택',
					'03':'도시형생활주택',
					'11':'임의공급',
            },
            mapping : {'1':[{'hseKdDsc':'01'},{'hseKdDsc':'09'},{'hseKdDsc':'10'}],
                           '2':[{'hseKdDsc':'02'}],
                           '3':[{'hseKdDsc':'04'}, {'hseKdDsc':'06'}],
                           '4':[{'hseKdDsc':'03'}],
                           '5':[{'hseKdDsc':'11'}]
            },
        }
    },
    props : {
        
    },
    mixins: [
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    computed : {
        
    },
    methods : {
        // 초기화
        initComponent() {   // 파라미터 필요 시 추가, param = {}
            let localKey = "rlest" + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + "V4";
            this.selectedCodeList = commonService.getStorage(localKey);

            // 등록한 부동산청약 공급유형이 없는 경우
            if(Object.keys(this.selectedCodeList).length == 0) {
                this.selectedCodeList.code = []
            }

            this.getInteRegions();
            this.getRlestBasList();     // 부동산 보유기본 목록 조회
            //this.getRlestSbpList();

            let codeMap = {'1':'APT',
                            '2':'도시형/오피스텔/생활숙박시설/민간임대',
                            '3':'APT 무순위/잔여세대',
                            '4':'공공지원 민간임대',
                            '5':'임의공급'}
            
            if(this.selectedCodeList.code.length == 0) {
                console.log("@@@ codeList.length == 0")
                this.localPubRlestText = codeMap[1] + "외 4개"
            } else {
                this.localPubRlestText = ""
                this.localPubRlestText += codeMap[this.selectedCodeList.code[0]]
                if(this.selectedCodeList.code.length > 1) this.localPubRlestText += "외 " + (this.selectedCodeList.code.length-1) + "개"
            }

            this.sbpBasDt = dateFormat(new Date(), 'YYYY.MM.DD hh:mm')
        },

        // 부동산 보유 기본 목록 조회
		getRlestBasList() {
            this.rlestBasList = [];
            this.currIdx = 0;
            this.currRlestRsdFormDsc = '';
            this.isSearch  = false;
            
			const config = {
				url : "/co/re/02ra1",
				data: {
					"mydtCusno" : this.getUserInfo('mydtCusno'),
					"mmoInpYn"	: "0"		// 0:아파트, 1:직접입력, '':전체
				}
			};
			apiService.call(config).then(response =>{
                this.rlestBasList = response.rlestBasList || [];		// 부동산 보유 기본 목록
                this.rlestTotAm = 0;
                //console.log("나의부동산 목록 json ", JSON.stringify(this.rlestBasList))
				
				// 부동산 총 금액 계산(팔때 사용금액, 보증금)
				for(let i=0; i<this.rlestBasList.length; i++) {
					let calcGenDlAm = 0;		                        // 실거래가
					let calcCommQtart = 0;								// 공동지분율
					let calcGrmy = 0;									// 세입자 보증금
					let calcTot = 0;									// 총금액

                    calcCommQtart = this.rlestBasList[i].commQtart > 0 ? this.rlestBasList[i].commQtart : 100;
                    
                    // 위티 실거래가 있을 경우 실거래가로, 없을 경우 한국부동산 시세로
					if(this.rlestBasList[i].uitiTrId) {
						calcGenDlAm = this.rlestBasList[i].uitiDlPr;
					} else {
						calcGenDlAm = this.rlestBasList[i].genDlAm;
					}

					// 세입자여부로 보증금 값 세팅
					if(this.rlestBasList[i].revnMnEn == '1')	calcGrmy = this.rlestBasList[i].grmy;
					else calcGrmy = 0;

					if(this.rlestBasList[i].rlestRsdFormDsc == "1") {
						// 자가일 때는 실거래가로 계산 (실거래가 * 지분율 - 보증금)
						calcTot = calcGenDlAm * (calcCommQtart / 100) - calcGrmy;
					} else {
						// 전세/월세일 때는 보증금으로 계산
						calcTot = this.rlestBasList[i].grmy;
					}
                    this.rlestTotAm += Number(calcTot);

                    this.rlestHldSqno = this.rlestHldSqno == null || this.rlestHldSqno == "" ? this.rlestBasList[0].rlestHldSqno : this.rlestHldSqno;
                }
                console.log("부동산 총금액 = ", this.rlestTotAm)

                // 부동산 보유 기본 목록 있을 경우, 첫번째 값으로 배너 값 적용
                if(this.rlestBasList.length > 0) {
                    this.currRlestRsdFormDsc = this.rlestBasList[this.currIdx].rlestRsdFormDsc;
                }

                // 금융자산 총액 계산
                this.getAssetsAcToAmData();
                
                this.$nextTick(() => {
                    this.callJQueryFncExcute();

                    $('.house_slick').filter('.slick-initialized').slick('unslick');	
                    fncSlick_house1(500, false, this.slick_getRlestBasList, this.currIdx);
                    
                    
                    //[v4.0]메뉴 열기
                    var menuBtn = $('.menu_open');
                    menuBtn.on('click', function(){
                        $(this).siblings('.menu_list_wrap').removeClass('close').addClass('open');
                    });
                    $('.menu_list_wrap .menu_close').on('click', function(){
                        $('.menu_list_wrap').removeClass('open').addClass('close');
                    });
                });
			});
        },

        // slick call back - 부동산 보유 기본 조회
        slick_getRlestBasList(idx) {
            this.currIdx = idx;
            this.currRlestRsdFormDsc = this.rlestBasList[this.currIdx].rlestRsdFormDsc;
            this.rlestHldSqno = this.rlestBasList[idx].rlestHldSqno;
        },

        // 금융 및 대출 계좌 합계 조회
		getAssetsAcToAmData() {
			const config = {
				url : "/an/re/01ra1",
				data: {
					"mydtCusno" : this.getUserInfo('mydtCusno')
				}
			};
			apiService.call(config).then(response =>{
				this.nhTotAm		= response.nhTotAm || 0;			// 농축협계좌합계
				this.othTotAm		= response.othTotAm || 0;			// 타은행계좌합계
                //this.minusAcTotAm	= response.minusAcTotAm || 0;		// 마이너스대출계좌합계
                this.getInvestData();
			});
		},

		// 투자 잔액 합계 조회(펀드/증권)
		getInvestData() {
            this.assetsTotAm = 0;   // 금융자산 총금액

			const config = {
				url : "/as/iv/01r01",
				data: {
					"mydtCusno" : this.getUserInfo('mydtCusno')
				}
			};
			apiService.call(config).then(response =>{
				this.respInfo = response;

				this.bankIvAcBaltt = this.respInfo.bankIvAcBaltt || 0;   // 펀드 잔액 합계
				this.efinIvAcBaltt = this.respInfo.efinIvAcBaltt || 0;   // 증권 잔액 합계

                // 금융자산 총금액 계산
                this.assetsTotAm = (Number(this.nhTotAm) + Number(this.othTotAm) + Number(this.bankIvAcBaltt) + Number(this.efinIvAcBaltt)) / 10000;
                console.log("금융자산 총금액 = ", this.assetsTotAm)

                this.getLoanData();         // 대출 총액 조회
			});
        },

        // 대출 잔액 합계 조회(신용대출, 담보대출)
		getLoanData() {
            let creditAmnt = 0;             // 신용대출 잔액 합계
            let mortagageOutAmnt = 0;       // 담보대출 잔액 합계
            this.loanTotAm = 0;             // 대출 총 금액

			const config = {
                url: '/as/ln/01r01',
                data: {
					"mydtCusno" : this.getUserInfo('mydtCusno')
                }
            };
            apiService.call(config).then(response => {
                creditAmnt         = response.creditAmnt || 0			// 신용대출 잔액 합계
				mortagageOutAmnt   = response.mortagageOutAmnt || 0	    // 담보대출 잔액 합계

                this.callJQueryFncExcute()

                // 대출 총 금액 계산
                this.loanTotAm = (Number(creditAmnt) + Number(mortagageOutAmnt)) / 10000;
                console.log("대출 총 금액 = " + this.loanTotAm);

                this.getInteRlestList();    // 관심부동산 목록 조회
            });
		},

        // 부동산 등록 팝업 오픈
        openInsRlestPop() {
            const config = {
                component: CORE4201,        // 나의자산 > 부동산 등록
                params : {
                    isUpt : false,          // 등록
                    popId : 'ANRE4201',     // 자산완료화면에서 추가 등록 시 팝업 다시 열기 위함
                    isTitleHide : true      // 부동산 등록 시 아파트/직접입력 타이틀 hide 여부(true:숨김, false:보임)
                }
            }

            modalService.openPopup(config).then((response) => {
                // asis '|| response == true' 추가
                if(response == 'refresh') {     // 자산 등록완료
                    this.currIdx = 0;
                    this.getRlestBasList();
                } else if(response == 'ANRE4201') {
                    this.currIdx = 0;
                    this.getRlestBasList();
                    this.openInsRlestPop();
                }
            });
        },

        // 부동산 수정
        openUpdRlestPop() {
            const config = {
                component : CORE4201, // 부동산정보입력
                params    : {
                    mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                    rlestHldSqno : this.rlestHldSqno,             // 부동산보유일련번호
                    isUpt        : true                           // 수정
                }
                
            };

            modalService.openPopup(config).then((response) => {
                if (response.uptCom == true) { // 수정완료
                    this.getRlestBasList();
                }
            });
        },
        // 부동산 삭제
        openDelRlestPop() {
            const config = {
                content : ['자산을 삭제하시면 더 이상 나의 자산 금액에 반영되지 않습니다.'],
                title   : ""
            };

            modalService.confirm(config).then(text => {
                if(text == "예") {
                    const config_d = {
                        //url  : '/as/ra/02d01',
                        url : "/co/re/01da1",
                        data : {
                            mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                            rlestHldSqno : this.rlestHldSqno              // 부동산보유일련번호
                        }
                    };

                    apiService.call(config_d).then(response => {
                        if (response.rspC == '0000') {
                            modalService.alert("부동산 자산이 삭제되었습니다.").then(() => {
                                this.currIdx      = 0;
                                this.rlestHldSqno = "";

                                this.getRlestBasList();
                                //this.getAllMyAssetInfo(); // vuex 수집갱신 처리
                            });
                        } else {
                            modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {});
                        }
                    });
                }
            });
        },
        
        // 관심부동산 자산등록 팝업 오픈
        openInteInsRlestPop() {
            const config = {
                component: CORE4201,        // 나의자산 > 부동산 등록
                params : {
                    isUpt               : false,                                                // 등록
                    isData              : true,                                                 // 넘겨주는 데이터 있는지 여부
                    aptHscxIdvdc        : this.inteRlestList[this.inteCurrIdx].aptHscxIdvdc,    // 아파트단지개별코드
                    aptNm               : this.inteRlestList[this.inteCurrIdx].aptHcxnm,        // 아파트단지명
                    newPytpAreaCntn     : this.inteRlestList[this.inteCurrIdx].newPytpAreaCntn, // 신평형면적내용
                    popId               : 'ANRE4201',                                           // 자산완료화면에서 추가 등록 시 팝업 다시 열기 위함
                    isTitleHide         : true,                                                 // 부동산 등록 시 아파트/직접입력 타이틀 hide 여부
                    isInterest          : true                                                  // 관심부동산에서 자산등록하는지 여부
                }
                
            };
            modalService.openPopup(config).then((response) => {
                // asis '|| response == true' 추가
                if(response == 'refresh') {     // 자산 등록완료
                    this.inteCurrIdx = 0;
                    this.getRlestBasList();
                } else if(response == 'ANRE4201') {
                    this.inteCurrIdx = 0;
                    this.getRlestBasList();
                    this.openInsRlestPop();
                }
                this.$nextTick(() => {
                    this.callJQueryFncExcute();

                    $('.house_slick').filter('.slick-initialized').slick('unslick');	
                    fncSlick_house1(500, false, this.slick_getRlestBasList, this.currIdx);
                });
            });
        },
        
        // 관심부동산 목록 조회
        getInteRlestList() {
            this.inteRlestList = [];
            this.inteCurrIdx = 0;

            const config = {
                url : "/an/re/02ra1",
				data: {
                    "mydtCusno"         : this.getUserInfo('mydtCusno'),        // 마이데이터고객번호
                    "aptHscxIdvdc"      : '',                                   // 아파트단지개별코드(다건 조회 시 생략)
                    "newPytpAreaCntn"   : ''                                    // 신평형면적내용(다건 조회 시 생략)
				}
            };
            apiService.call(config).then(response =>{
                this.inteRlestList = response.inteRlestList || [];
                // this.refKey += 1;

                this.$nextTick(() => {
                    this.callJQueryFncExcute();
                    this.getEventRgYn();        // 이벤트 응모여부 조회

                    $('.house_slick2').filter('.slick-initialized').slick('unslick');	
                    fncSlick_house2(500, false, this.slick_getInteRlestList, this.inteCurrIdx);

                    //[v4.0]메뉴 열기
                    var menuBtn = $('.menu_open');
                    menuBtn.on('click', function(){
                        $(this).siblings('.menu_list_wrap').removeClass('close').addClass('open');
                    });
                    $('.menu_list_wrap .menu_close').on('click', function(){
                        $('.menu_list_wrap').removeClass('open').addClass('close');
                    });
                });
            });
        },

        // slick call back - 관심부동산 목록 조회
        slick_getInteRlestList(idx) {
            this.inteCurrIdx = idx;
        },

        // 관심부동산 등록 팝업 오픈
        openInsInteRlestPop() {
            const config = {
                component: ANRE4207,
                params : {
                    isUpt : false,
                }
            };
            modalService.openPopup(config).then((response) => {
                if(response == 'refresh') {     // 관심부동산 등록 완료 후 재조회
                    this.inteCurrIdx      = 0;

                    this.getInteRlestList();
                }
            });
        },

        // 관심부동산 수정
        openUpdInteRlestPop() {
            const config = {
                component: ANRE4207,
                params : {
                    mydtCusno       : this.getUserInfo('mydtCusno'),
                    aptHscxIdvdc    : this.inteRlestList[this.inteCurrIdx].aptHscxIdvdc,
                    newPytpAreaCntn : this.inteRlestList[this.inteCurrIdx].newPytpAreaCntn,
                    isUpt           : true
                }
            };
            modalService.openPopup(config).then((response) => {
                if(response == 'refresh') {     // 관심부동산 수정 완료 후 재조회
                    this.inteCurrIdx      = 0;

                    this.getInteRlestList();
                }
            });
        },

        // 관심부동산 삭제
        delInteRlest() {
            const config = {
                content : ['관심부동산에서 삭제됩니다.'],
                title   : ""
            };

            modalService.confirm(config).then(text => {
                if(text == "예") {
                    const config_d = {
                        url  : '/an/re/02da1',
                        data : {
                            mydtCusno           : this.getUserInfo('mydtCusno'),                        // 고객번호
                            aptHscxIdvdc        : this.inteRlestList[this.inteCurrIdx].aptHscxIdvdc,    // 아파트단지개별코드
                            newPytpAreaCntn     : this.inteRlestList[this.inteCurrIdx].newPytpAreaCntn  // 신평형면적내용
                        }
                    };

                    apiService.call(config_d).then(response => {
                        if (response.rspC == '0000') {
                            modalService.alert("관심부동산이 삭제되었습니다.").then(() => {
                                this.inteCurrIdx      = 0;

                                this.getInteRlestList();
                            });
                        } else {
                            modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {});
                        }
                    });
                }
            });
        },

        // 부동산청약 목록 조회
        getRlestSbpList() {
            this.localPubRlestText = ""

            let localPubRlestListTmp = []

            for(let i = 0; i < this.selectedCodeList.code.length; i++){
                let temp = localPubRlestListTmp
                localPubRlestListTmp = [...temp, ...this.mapping[this.selectedCodeList.code[i]]]
            }

            this.localPubRlestList = localPubRlestListTmp // 서비스 보낼 입력값
            
            this.rlestSbpList = [];
            this.sbpCurrIdx = 0;

            if(this.inteList.length > 0) {  
                if(this.inteList.length == 17) this.inteText = "전국";
                else {
                    this.inteText = "";
                    this.inteText = this.regionMap[this.inteList[0]];

                    if(this.inteList.length > 1) {
                        this.inteText += " 외 "
                        this.inteText += this.inteList.length - 1
                        this.inteText += "개 지역"
                    }
                }
            }
            
            const config = {
                url : "/an/re/01r01",
                data : {
                    mydtCusno       : this.getUserInfo("mydtCusno"),
                    hseKdDsc        : this.localPubRlestList.length == 0 ? [] : this.localPubRlestList,
                    pageCount       : this.pageCount,
                    pageNo		    : this.page,	
                    inqDsc          : "Y",
                }
            };
            apiService.call(config).then(response =>{
                console.log("========/an/re/01r01=======",response)
                this.rlestSbpList = []
                this.rlestSbpList = response.resultList || [];
                this.endIdx = this.rlestSbpList.length < 5 ? this.rlestSbpList.length : 5;
                this.pubRlestCnt = response.totalCnt;
                this.refRcmKey += 1;
                
                this.$nextTick(() => {
                    this.callJQueryFncExcute();
                    $('.apart_slider .slick').filter('.slick-initialized').slick('unslick');
                    this.slick();
                });
            });

        },
        // 부동산청약 탭선택
        tabSbpList(code) {
            
        },
        
        // 팝업 화면 오픈
        openRlestFullPop(pageId, dsc='') {
            let config = '';
            let tradetype = '';

            if(pageId == 'ANRE2202') {              // 나의 자산 조회
                let isLowPrice = this.calcBannerLackAm(dsc) > 0 ? true : false;

                config = {
                    component: ANRE2202,
                    params : {
                        isLowPrice : isLowPrice
                    }
                };
            } else if(pageId == 'ANRE2203') {       // iframe 부동산 상세
                if(this.rlestBasList[this.currIdx].rlestRsdFormDsc == '1' && this.rlestBasList[this.currIdx].rlestTngDsc == '1')     tradetype = 'deal';
                else if(this.rlestBasList[this.currIdx].rlestTngDsc == '1')    tradetype = 'lease';
                config = {
                    component: ANRE2203,
                    params : {
                        id 		    : this.rlestBasList[this.currIdx].aptHscxIdvdc || '', 		// 아파트단지개별코드
                        tradetype 	: tradetype || '', 			                                // 부동산거주형태구분코드(위티 전달용)
                        space 		: this.rlestBasList[this.currIdx].aptHfisArea || '' 		// 아파트분양면적
                    }
                };
            } else if(pageId == 'ANRE2204') {       // iframe 지도 검색
                let mapAptId = '';

                // 관심부동산 있는 경우에만 아파트 ID 담아서 전달
                if(this.inteRlestList.length > 0) {
                    mapAptId = this.inteRlestList[0].aptHscxIdvdc;
                }
                config = {
                    component: ANRE2204,
                    params : {
                        id      : mapAptId
                    }
                };
            } else if(pageId == 'ANRE2205') {       // iframe 부동산추천
                config = {
                    component: ANRE2205,
                    params : {}
                };
            }
            modalService.openPopup(config).then(() => {

            });
        },

        // 관심부동산에서 위티 상세 팝업 연결
        openInteRlestDet() {
            let config = '';
            let pytpList = [];
            let selectPytp = '';
            // 아파트 분양면적 조회
            const config_pytp = {
                url  : '/co/re/03ra1',
                data : {
                    aptHscxIdvdc        : this.inteRlestList[this.inteCurrIdx].aptHscxIdvdc,    // 아파트단지개별코드
                }
            };
            
            apiService.call(config_pytp).then(response => {
                pytpList = response.pytpAreaList;
                selectPytp = pytpList.find((pytp) => pytp.newPytpAreaCntn == this.inteRlestList[this.inteCurrIdx].newPytpAreaCntn);

                config = {
                    component: ANRE2203,
                    params : {
                        id 		    : this.inteRlestList[this.inteCurrIdx].aptHscxIdvdc || '', 		// 아파트단지개별코드
                        tradetype 	: 'deal', 			                                            // 부동산거주형태구분코드(위티 전달용)
                        space 		: selectPytp.aptHfisArea || '' 		// 아파트분양면적
                    }
                };
                
                modalService.openPopup(config).then(() => {

                });
            });
        },

        // 공통코드 명칭 변환
        getComCodeNm(code, codeValue, refDsc='') {
            const codeList = this.getCodeList(code);
            let codeObj = '';

            if(codeList.length > 0) {
                codeObj = codeList.find((codeTmp) => codeTmp.comnCVal == codeValue);

                if(codeObj == 'undefined' || codeObj == null) {
                    return codeObj;
                }
            } else {
                return codeObj;
            }

            // 공통코드에서 참고내용1 출력 시 사용
            if(refDsc == '1') {
                return codeObj.refCntn1;
            }

            return codeObj.comnCExpl;
        },
        
        // 임대계약 만기 계산(동작잘되면 이 함수 대신에 monthDiff만 사용)
        calcContLimit(dueDt) {
            const today = dateFormat(new Date(), "YYYY-MM-DD") // 오늘 일자
            let leftLimit = dayDiff(dueDt, today);
            return leftLimit;
        },

        // 금액 한글명, 한글/숫자 class 다르게 적용(시세)
		fn_hanValue_classDiff(value, numClass, txtClass) {
			const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length

            let resultArray = []
            let resultString = ""

            for(let i=0; i<splitCnt; i++) {
                let rst = (value % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
                rst = Math.floor(rst)

                if(rst > 0) {
                    resultArray[i] = rst
                }
            }

            let strIdx = 0  // 최초시작지점에 '원' 추가하기위함

            for(let j=0; j<resultArray.length; j++) {
                if(!resultArray[j]) {
                    strIdx++
                    continue
                }

                if(j === strIdx) {
                    resultString = ' <em class="' + numClass + '">' + String(numberFormat(resultArray[j])) + '</em><span class="' + txtClass + '">' + unit[j] + '원</span>' + resultString
                } else {
                    resultString = ' <em class="' + numClass + '">' + String(numberFormat(resultArray[j])) + '</em><span class="' + txtClass + '">' + unit[j] + '</span> ' + resultString
                }
            }

            return resultString;
        },

        // 한글금액표시
        fn_hanValue(amount) {
            const koreanUnits = ['', '만', '억', '조']
            let han_amount = parseInt((String(amount).replace(/[,]/g, '')) || 0) * 10000 // 만원 단위 화면
            let answer     = ''
            let unit       = 10000
            let index      = 0
            let division   = Math.pow(unit, index)

            while (Math.floor(han_amount / division) > 0) {
                const mod = Math.floor(han_amount % (division * unit) / division)
                if (mod) {
                    const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    answer = `${modToString}${koreanUnits[index]} ` + answer
                }
                division = Math.pow(unit, ++index)
            }
            return (answer + "원").replace(" 원", "원")
        },

        // 배너 금액 계산
        calcBannerLackAm(dsc) {
            let result = 0;

            if(dsc == 'rlest') {
                result = (Number(this.rlestBasList[this.currIdx].genDlAm) - (Number(this.assetsTotAm) - Number(this.loanTotAm) + Number(this.rlestTotAm)));
            } else if(dsc == 'interest') {
                result = (Number(this.inteRlestList[this.inteCurrIdx].genDlAm) - (Number(this.assetsTotAm) - Number(this.loanTotAm) + Number(this.rlestTotAm)));
            }

            return result;
        },

        // 위티 랜딩페이지(제로 중개앱 다운로드 화면) 연결
        openBannerLink() {
            if (this.getUserInfo('chnl') === '385') {
                appService.executeBrowser("https://btalk.me/download");
            } else {
                appService.cokBankOpenPopupWebBrowser("https://btalk.me/download");
            }
            //window.open("https://smartcard.nonghyup.com");
            //return;
        },

        // 위티 실거래가 정보 관련 레이아웃 노출 여부
        isUitiShow(list) {
            if(list == undefined) {
                return false;
            } else{
                if(list.length < 1)     return false;
            }

            return true;
        },

        // 날짜 형식 변경
        dateFormatKor(value) {
            if(value == '' || value == null)
                return '';

            const year = value.substring(0, 4);
            const month = value.substring(4, 6);
            const day = value.substring(6);
            let result = year + "년 " + month + "월 " + day + "일";
            
            return result;
        },

        // 이벤트 응모여부 조회
        getEventRgYn() {
            /* const config = {
                url : "/co/et/01ra1",
                data : {
                    mydtCusno    : this.getUserInfo("mydtCusno") // 고객번호
                }
            };

            apiService.call(config).then(response => {
                this.isJoin = response.isJoin === "true" ? true : false;    // 이벤트 응모여부
                this.isExEvt = response.isExEvt || '';                      // 이벤트 종료여부(종료되었으면 false, 나머지는 null)
                this.isSearch = true;                                       // 조회 여부(조회 전에 이벤트 화면 노출하지 않기 위함)
                console.log("응모여부 = " + this.isJoin)
                console.log("종료여부 = " + this.isExEvt)
            }); */
        },

        // 이벤트 응모페이지 이동
        openEventPage() {
            const config_evtPop = {
                params : {},
                component : COET1003
            }
            modalService.openPopup(config_evtPop).then(response => {
                //바이패스 (응모 도중 팝업 닫을 시 완료팝업에서 팝업닫기 기능과 같은 역할)
                console.log("CORE4201 close popup", response)

                if(response == 'refresh') {
                    this.initComponent();
                }
            });
        },
        slick() {
            var $apart =  $('.apart_slider .slick');

            $apart.not('.slick-initialized').slick({          
                dots : true,
                infinite : false,
                arrows : false,
                customPaging:function(slider,i){
                    return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
                }
            });
        },
        openWebBrowser(url) {
            if (this.getUserInfo('chnl') === '385') {
                appService.executeBrowser(url);
            } else {
                appService.cokBankOpenPopupWebBrowser(url);
            }
        },
        convertToDate(dateStr) {
            if(!dateStr) return '';
            
            const year = dateStr.slice(2, 4);
			const month = dateStr.slice(4, 6);
			const day = dateStr.slice(6, 8);
			
			let result = year + "." + month + "." + day;

			return result;
        },
        // 입력받은 금액을 한글로 변환
		numberToKorean(num) {
			if(!num) return '';
			
			const units = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
			const levels = ['', '십', '백', '천'];
			let number = Number(num);
			let result = '';
			let temp = '';
			let level = 0;
			
            number = Math.round(number / (100 * 10000)) * 100 * 10000;
            number /= 10000;
			if(number >= 10000){	// 억 이상 단위
				let tempNumber = Math.floor(number / 10000);
				
				while(tempNumber){
					if(tempNumber % 10){
						temp = (tempNumber % 10) + levels[level] + temp;
					}

					tempNumber = Math.floor(tempNumber / 10);
					level++;
				}
				temp += '억'

				result += temp;
				number %= 10000;
			}

			temp = '';
			level = 0;

			if(number){
				let tempNumber = number;

				while(tempNumber){
					if(tempNumber % 10){
						temp = (tempNumber % 10) + levels[level] + temp;
					}

					tempNumber = Math.floor(tempNumber / 10);
					level++;
				}
				temp += '만'

				result += temp;
			}

			result += '원';
			return result;
        },
        openPubRlestListPop() {
            let hseSpyaaStaC = []
            this.inteList.forEach(el=>{hseSpyaaStaC.push({hseSpyaaStaC:el})})
            this.inteNmList.forEach(el=>{inteNmList.push(this.regionMap[this.inteList[el]])})

            let localPubRlestListTmp = []

            for(let i = 0; i < this.selectedCodeList.code.length; i++){
                let temp = localPubRlestListTmp
                localPubRlestListTmp = [...temp, ...this.mapping[this.selectedCodeList.code[i]]]
            }

            this.localPubRlestList = localPubRlestListTmp // 서비스 보낼 입력값

            const config = {
				component: ANRE4209,
				params   : {
                    // rlestSbpList : this.rlestSbpList
                    hseKdDsc : this.localPubRlestList,
                    hseSpyaaStaC : hseSpyaaStaC
                }
			}
			
			modalService.openPopup(config).then(response => {
				
			})
        },
        openAreaPop() {
            const config = {
                component : ANRE4208
            }
            modalService.openPopup(config).then(response => {
                if(response == 'refresh') {
                    // 재조회 관심지역
                    // 재조회 anre01r01
                    this.getInteRegions() // 관심지역 조회

                    // this.getRlestSbpList()
                }
            })
        },
        openPubRlestTypePop() {
            const config = {
                component : ANRE4211
            }
            modalService.openPopup(config).then(response => {
                if(response == 'refresh') {
                    let localKey = "rlest" + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + "V4";
                    this.selectedCodeList = commonService.getStorage(localKey);

                    let codeMap = {'1':'APT',
                                '2':'도시형/오피스텔/생활숙박시설/민간임대',
                                '3':'APT 무순위/잔여세대',
                                '4':'공공지원 민간임대',
                                '5':'임의공급'}
                
                    if(this.selectedCodeList.code.length == 0) {
                        this.localPubRlestText = codeMap[1] + "외 4개"
                    } else {
                        this.localPubRlestText = ""
                        this.localPubRlestText += codeMap[this.selectedCodeList.code[0]]
                        if(this.selectedCodeList.code.length > 1) this.localPubRlestText += "외 " + (this.selectedCodeList.code.length-1) + "개"
                    }

                    let localPubRlestListTmp = []
                    for(let i = 0; i < this.selectedCodeList.code.length; i++) {
                        let temp = localPubRlestListTmp
                        localPubRlestListTmp = [...temp, ...this.mapping[this.selectedCodeList.code[i]]]
                    }

                    this.localPubRlestList = localPubRlestListTmp // 서비스 보낼 입력값

                    if(this.inteList.length > 0) {   
                        if(this.inteList.length == 17) this.inteText = "전국";
                        else {
                            this.inteText = "";
                            this.inteText = this.regionMap[this.inteList[0]];

                            if(this.inteList.length > 1) {
                                this.inteText += " 외 "
                                this.inteText += this.inteList.length - 1
                                this.inteText += "개 지역"
                            }
                        }
                    }
                    const config = {
                        url : "/an/re/01r01",
                        data : {
                            mydtCusno       : this.getUserInfo("mydtCusno"),
                            hseKdDsc        : this.localPubRlestList.length == 0 ? [] : this.localPubRlestList,
                            pageCount       : this.pageCount,
                            pageNo		    : this.page,
                            inqDsc          : "Y",	
                        }
                    };
                    apiService.call(config).then(response =>{
                        console.log("========/an/re/01r01=======",response)
                        
                        // this.rlestSbpList.splice(0, this.rlestSbpList.length);
                        
                        // if(Array.isArray(response.resultList)) {
                        //     this.rlestSbpList.splice(0, this.rlestSbpList.length, ...response.resultList);
                        // } else {
                        //     this.rlestSbpList.splice(0, this.rlestSbpList.length);
                        // }
                        // this.endIdx = this.rlestSbpList.length < 5 ? this.rlestSbpList.length : 5;
                        this.rlestSbpList = []
                        this.rlestSbpList = response.resultList || [];
                        this.endIdx = this.rlestSbpList.length < 5 ? this.rlestSbpList.length : 5;
                        this.pubRlestCnt = response.totalCnt;
                        this.refRcmKey += 1;
                        
                        this.$nextTick(() => {
                            this.callJQueryFncExcute();

                            $('.apart_slider .slick').filter('.slick-initialized').slick('unslick');
                            this.slick();
                        });
                    });
                }
            })
        },
        getInteRegions() {
            const config = {
                url: '/an/re/01r02',
                data: {
                    mydtCusno : this.getUserInfo("mydtCusno"),
					rgnDsc     : '03'
                }
            }
            apiService.call(config).then(response => {
				if(response.inteList.length > 0) {
                    this.inteList = [];
					response.inteList.forEach((el) => {
						this.inteList.push(el.hseSpyaaStaCntn)
					})
                    let localKey = "rlest" + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + "V4";
                    this.selectedCodeList = commonService.getStorage(localKey) || {};

                    // if(Object.keys(this.selectedCodeList).length == 0) {
                    //     this.selectedCodeList = {
                    //         code : []
                    //     }
                    // }

                    // 등록한 부동산청약 공급유형이 없는 경우
                    if(Object.keys(this.selectedCodeList).length == 0) {
                        this.selectedCodeList.code = []
                    }

                    let localPubRlestListTmp = []
                    for(let i = 0; i < this.selectedCodeList.code.length; i++){
                        let temp = localPubRlestListTmp
                        localPubRlestListTmp = [...temp, ...this.mapping[this.selectedCodeList.code[i]]]
                    }
                    this.localPubRlestList = localPubRlestListTmp // 서비스 보낼 입력값

                    if(this.inteList.length > 0) {   
                        if(this.inteList.length == 17) this.inteText = "전국";
                        else{
                            this.inteText = "";
                            this.inteText = this.regionMap[this.inteList[0]];

                            if(this.inteList.length > 1) {
                                this.inteText += " 외 "
                                this.inteText += this.inteList.length - 1
                                this.inteText += "개 지역"
                            }
                        }
                    }
                    // const config1 = {
                    //     url : "/an/re/01r01",
                    //     data : {
                    //         mydtCusno       : this.getUserInfo("mydtCusno"),
                    //         hseKdDsc        : this.localPubRlestList.length == 0 ? [] : this.localPubRlestList,
                    //         pageCount       : this.pageCount,
                    //         pageNo		    : this.page,	
                    //         inqDsc          : "Y",
                    //     }
                    // };
                    // apiService.call(config1).then(response =>{
                    //     console.log("========/an/re/01r01=======",response)
                        
                    //     this.rlestSbpList = []
                    //     this.rlestSbpList = response.resultList || [];
                    //     this.endIdx = this.rlestSbpList.length < 5 ? this.rlestSbpList.length : 5;
                    //     this.pubRlestCnt = response.totalCnt;
                    //     this.refRcmKey += 1;
                        
                    //     this.$nextTick(() => {
                    //         this.callJQueryFncExcute();

                    //         $('.apart_slider .slick').filter('.slick-initialized').slick('unslick');
                    //         this.slick();
                    //     });
                    // });
				} else {
					this.inteList = []
                    this.inteNmList = []
				}
                const config1 = {
                        url : "/an/re/01r01",
                        data : {
                            mydtCusno       : this.getUserInfo("mydtCusno"),
                            hseKdDsc        : this.localPubRlestList.length == 0 ? [] : this.localPubRlestList,
                            pageCount       : this.pageCount,
                            pageNo		    : this.page,	
                            inqDsc          : "Y",
                        }
                    };
                    apiService.call(config1).then(response =>{
                        console.log("========/an/re/01r01=======",response)
                        
                        this.rlestSbpList = []
                        this.rlestSbpList = response.resultList || [];
                        this.endIdx = this.rlestSbpList.length < 5 ? this.rlestSbpList.length : 5;
                        this.pubRlestCnt = response.totalCnt;
                        this.refRcmKey += 1;
                        
                        this.$nextTick(() => {
                            this.callJQueryFncExcute();

                            $('.apart_slider .slick').filter('.slick-initialized').slick('unslick');
                            this.slick();
                        });
                    });
            })
        },
    },
    components: {
        Page,
        FootersV2,
        AnCategoryV2,
        Template
        //,PdCategory //asis 반영 시 주석 해제
    }
}
</script>
<style scoped>
	.house_slick, .house_slick2, .slick {
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.1s ease;
		-webkit-transition: opacity 0.1s;
	}
	.house_slick.slick-initialized, .house_slick2.slick-initialized, .slick.slick-initialized {
		visibility: visible;
		opacity: 1;
	}
    
</style>