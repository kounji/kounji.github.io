<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 부동산
* @ 페이지설명 : 나의자산 > 자산 > 부동산 상세
* @ 파일명     : src/views/page/AS/RE/ASRE4001/ASRE4001.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-27
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-27              CS541013              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view hasLNB mydata2023">
        <!-- S :: 자산 카테고리 -->
        <!--
        <as-category-v2 type="AC"></as-category-v2>
        -->
        <!-- E :: 자산 카테고리 -->

        <!-- S :: 자산 서브 카테고리 -->
        <as-sub-category-v4 type="RA1"></as-sub-category-v4>
        <!-- E :: 자산 서브 카테고리 -->
        <!--
        <div id="content" class="renewal" v-if="rlestList.length > 0">
        -->
        <div id="content" v-if="rlestList.length > 0" class="renewal">

            <div class="com_inner">
                <div class="new_sub_info">
                    <div class="title">
                        <!-- <div class="text">
                            우리 집 시세<br>
                        <span class="fs-27">총 </span><strong><span class="num counter" :data-count="rlestTtAm">{{ rlestTtAm | numberFilter}}</span>원</strong>
                        </div> -->
                        <div class="text">
                            우리 집 시세<br>
                            <!-- [v4.0] 25-02-07 잔액숨김 기능추가 / 25-02-10 금액숨김 수정 -->
                            <div class="toggle_money" :class="hideYn === true ? 'on' : ''">
                                <div class="sum">
                                    <span class="hide">잔액숨김</span>
                                    <span class="show">{{rlestTtAm | numberFilter}}원</span>
                                </div>
                                <button type="button" class="btns" @click="fn_setHidden('RLEST', !hideYn)">
                                    <span class="blind">금액</span>
                                    <span class="hide">보기</span>
                                    <span class="show">숨김</span>
                                </button>
                            </div>

                            <!-- <div class="toggle_money">
                                <input type="checkbox" title="금액숨김" name="" id="sum_view_01"  v-model="hideYn" @change="fn_setHidden('RLEST', hideYn)">
                                <label for="sum_view_01" class="btns">
                                    <span class="hide" aria-hidden="true">보기</span>
                                    <span class="show" aria-hidden="true">숨김</span>
                                </label>
                                <div class="sum">
                                    <span class="hide">잔액숨김</span>
                                    <span class="show">총 <em>{{ rlestTtAm | numberFilter}}</em>원</span>
                                </div>
                            </div> -->
                            <!-- //[v4.0] 25-02-07 잔액숨김 기능추가 / 25-02-10 금액숨김 수정 -->
                        </div>
                    </div>
                </div>
            </div>  
            
            <hr class="hr02">

            <div class="com_inner"> 
                <!-- 보유한 부동산 정보 영역 --> 
                <div class="hold_info">
                    <div class="house_slide slide house_slick">
                        <div class="item" v-for="(rlest, idx) in rlestList" :key="'rlest_'+idx">
                            <div class="label_list">
                                <!-- 부동산물건구분코드(아파트, 주택, 오피스텔, 토지/농지, 상가, 기타) -->
                                <span class="mint_badge" v-if="rlestBasData.rlestTngDsc != '' && rlestBasData.rlestTngDsc != null">{{getComCodeNm('RLEST_TNG_DSC', rlestBasData.rlestTngDsc)}}</span>
                                <!-- 부동산거주형태구분코드(자가, 전세, 월세) -->
                                <span class="badge_2023 soft_gray" v-if="rlest.rlestRsdFormDsc != '' && rlest.rlestRsdFormDsc != null">{{getComCodeNm('RLEST_RSD_FORM_DSC', rlest.rlestRsdFormDsc)}}</span>
                                <span class="badge_2023 soft_gray" v-else>자가</span>
                                <!-- 임대여부 -->
                                <span class="badge_2023 soft_red" v-if="rlestBasData.revnMnEn == '1'">임대중</span>                                
                            </div>
                            <a href="javascript:void(0);" role="button">
                                <div class="title_area">	
                                    <template v-if="rlestBasData.rlestTngDsc == '1'">
                                        <p class="name" @click.prevent="openRlestFullPop('ANRE2203')">{{aptHcxnm}}</p>
                                        <p class="size">
                                            <!--[v4.0] 주택 별칭 추가 -->
                                            <strong class="nickname">{{rlestNm}}</strong>
                                            <!-- //[v4.0] 주택 별칭 추가 -->
                                            (<em class="num">{{rlest.newPytpAreaCntn}}</em>m<sup class="sup_text">2</sup>)<!-- //[v4.0] 괄호 추가 -->
                                        </p>
                                    </template>
                                    
                                    <template v-else>
                                            <!--[v4.0] 주택 별칭 추가 -->
                                            <strong class="nickname">{{rlestNm}}</strong>
                                            <!-- //[v4.0] 주택 별칭 추가 -->
                                            <template v-if="rlestBasData.rlestTngDsc == '6'"><p class="addr">{{rlestBasData.provnm}} {{rlestBasData.ccwnm}} {{rlestBasData.ttvnm}}</p></template>										
                                        
                                    </template>
                                </div>
                            </a>         
                            <div class="price_area">
                                <p class="price" v-html="fn_hanValue_classDiff((rlestBasData.genDlAm), '', 'won',rlestBasData)"></p>
                                <div v-if="rlestBasData.rlestTngDsc == '1' && rlestBasData.rlestRsdFormDsc == '1' && rlestBasData.genDlAm > 0">
                                    <span class="change_rate up" v-if="getProfitCalc(rlestBasData.genDlAm, rlestBasData.commQtart, rlestBasData.rlestTrPr) > 0">
                                        <em v-html="fn_hanValue_classDiff(getProfitCalc(rlestBasData.genDlAm, rlestBasData.commQtart, rlestBasData.rlestTrPr), 'num', 'txt_won')"></em>
                                    </span>	
                                    <span class="change_rate down" v-else-if="getProfitCalc(rlestBasData.genDlAm, rlestBasData.commQtart, rlestBasData.rlestTrPr) < 0">
                                        <em v-html="fn_hanValue_classDiff(Math.abs(getProfitCalc(rlestBasData.genDlAm, rlestBasData.commQtart, rlestBasData.rlestTrPr)), 'num', 'txt_won')"></em>
                                    </span>		
                                    <span class="change_rate" v-else>
                                        <em class="num">0</em><span class="txt_won">만원</span>
                                    </span>												                                    	
                                </div>
                                <p v-if="rlestBasData.rlestTngDsc == '1' && rlestBasData.rlestRsdFormDsc == '1' && rlestBasData.genDlAm <= 0" class="com_txtinfo_type01">최근 시세정보가 없습니다.</p>
                            </div>

                            <div class="graybox_link" v-if="rlestBasData.rlestTngDsc == '1'&& rlestBasData.genDlAm > 0" @click.prevent="openBannerLink('1')">
                                <a href="javascript:void(0);" role="button">{{rsdFormBannerTxtChg()}}</a>
                            </div>

                            <button class="menu_open"><span class="blind">메뉴열기</span></button>
                            <div class="menu_list_wrap">
                                <ul class="menu_list">
                                    <li><a href="javascript:void(0);" @click.prevent="updRlestBasData()" >부동산 수정</a></li>
                                    <li><a href="javascript:void(0);" @click.prevent="delRlestBasData()" >부동산 삭제</a></li>
                                </ul>
                                <button class="menu_close"><span class="blind">닫기</span></button>
                            </div>
                        </div>

                    </div>
                </div> 

                <!-- //보유한 부동산 정보 영역 -->  

                <!-- 기본정보 -->
                <div class="asset_more_list type_02 no_line">
                    <div class="list_title">기본정보</div>
                    <ul>
                        <li>
                            <!-- 매매인 경우 또는 토지/농지(6), 상가(7), 기타(9)일 때 표시 -->
                            <template v-if="rlestBasData.rlestRsdFormDsc == '1' || !rlestBasData.rlestRsdFormDsc ">
                            <!-- <template v-if="rlestBasData.rlestRsdFormDsc == '1' || rlestBasData.rlestTngDsc == '6' || rlestBasData.rlestTngDsc == '7' || rlestBasData.rlestTngDsc == '9'"> -->
                                <dl>
                                    <dt>매매금액</dt>

                                    <dd>
                                        <span v-html="fn_hanValue_classDiff(rlestBasData.rlestTrPr, 'num', 'unit')"></span>
                                    </dd>
                                </dl>

                                <dl>
                                    <dt>매매일</dt>
                                    <dd>
                                        <span>
                                            <em class="num">{{dateFormat(rlestBasData.dlDt, '. ') || '-'}}</em>
                                        </span>
                                    </dd>
                                </dl>
                            </template>

                            <!-- 전세/월세일 경우만 표시 -->
                            <template v-else-if="rlestBasData.rlestRsdFormDsc == '2' || rlestBasData.rlestRsdFormDsc == '3'">

                                <dl>
                                    <dt>보증금</dt>
                                    <dd>
                                        <span v-html="fn_hanValue_classDiff(rlestBasData.grmy, 'num', 'unit')"></span>
                                        <template v-if="rlestBasData.grmy == 0 || rlestBasData.grmy == ''">
                                            <span><em class="num">0</em><span class="unit">원</span></span>
                                        </template>
                                    </dd>
                                </dl>

                                <dl v-if="rlestBasData.rlestRsdFormDsc == '3'">
                                    <dt>월세</dt>
                                    <dd>
                                        <span v-html="fn_hanValue_classDiff(rlestBasData.mmr, 'num', 'unit')"></span>
                                    </dd>
                                </dl>

                                <dl>
                                    <dt>계약일</dt>
                                    <dd>
                                        <span>
                                            <em class="num">{{dateFormat(rlestBasData.ctrDt, '. ') || '-'}}</em>
                                        </span>
                                    </dd>
                                </dl>

                                <dl>
                                    <dt>만기일</dt>
                                    <dd>
                                        <span>
                                            <em class="num">{{dateFormat(rlestBasData.dueDt, '. ') || '-'}}</em>
                                        </span>
                                    </dd>
                                </dl>

                            </template>
							
                            <!-- 지분율 있을 경우는 그대로 표시 -->

                            <dl v-if="rlestBasData.commQtart > 0">
                                <dt>지분율</dt>
                                <dd>
                                    <span>
                                        <em class="num">{{rlestBasData.commQtart}}%</em>
                                    </span>
                                </dd>
                            </dl>

                            <!-- 지분율 0이고, 자가이거나 -->
                            <dl v-else-if="(rlestBasData.commQtart == 0) && rlestBasData.rlestRsdFormDsc == '1'">
                                <dt>지분율</dt>
                                <dd>
                                    <span>
                                        <em class="num">{{rlestBasData.commQtart}}%</em>
                                    </span>
                                </dd>
                            </dl>

                            <!-- 아파트일 경우만 표시 (수기입력여부 0일 경우 표시) -->
                            <dl v-if="rlestBasData.mmoInpYn == '0'">
                                <dt>면적</dt>
                                <dd>
                                    <em class="num">{{rlestBasData.newPytpAreaCntn}}</em>m<sup class="sup_text">2</sup>
                                </dd>
                            </dl>

                            <dl>
                                <dt>유형</dt>
                                <dd>{{getComCodeNm('RLEST_TNG_DSC', rlestBasData.rlestTngDsc)}}</dd>
                            </dl>
						
                            <!-- 아파트(1)/주택(5)/오피스텔(2)인 경우만 표시 -->

                            <!-- <dl v-if="rlestBasData.rlestTngDsc == '1' || rlestBasData.rlestTngDsc == '5' || rlestBasData.rlestTngDsc == '2'"> -->
                            <dl>
                                <dt>주거형태</dt>
								<dd v-if="rlestBasData.rlestRsdFormDsc !== '' && rlestBasData.rlestRsdFormDsc !== null">{{getComCodeNm('RLEST_RSD_FORM_DSC', rlestBasData.rlestRsdFormDsc)}}
                                    <template v-if="rlestBasData.revnMnEn == '1'">/임대</template>
                                    <!-- <template v-else-if="rlestBasData.revnMnEn == '0' && rlestBasData.rlestRsdFormDsc == '1'">/직접거주</template> -->
								</dd>									
                                <dd v-else>자가
                                    <template v-if="rlestBasData.revnMnEn == '1'">/임대</template>
                                    <!-- <template v-else-if="rlestBasData.revnMnEn == '0' && rlestBasData.rlestRsdFormDsc == '1'">/직접거주</template> -->
								</dd>	
                            </dl>
                        </li>
                    </ul>
                </div>
                <!-- // 기본정보 --> 

				<!-- 임대정보 -->
				<!-- 세입자 여부 있는 경우만 표시 -->
				<div class="asset_more_list type_02" v-if="rlestBasData.revnMnEn == '1'">
					<div class="list_title">임대정보</div>
					<ul>
						<li>
                            <dl>
                                <dt>임대형태</dt>
                                <dd>
                                    <template v-if="rlestBasData.mmr > 0">월세</template>
                                    <template v-else>전세</template>
                                </dd>
                            </dl>
							<dl>
								<dt>보증금</dt>
                                <dd>
                                    <span v-html="fn_hanValue_classDiff(rlestBasData.grmy, 'num', 'unit')"></span>
                                    <template v-if="rlestBasData.grmy == 0 || rlestBasData.grmy == ''">
                                        <em class="num">0원</em>
                                    </template>
                                </dd>
							</dl>
							<dl  v-if="rlestBasData.mmr > 0">
								<dt>월세</dt>
                                <dd>
                                    <span v-html="fn_hanValue_classDiff(rlestBasData.mmr, 'num', 'unit')"></span>
                                </dd>								
							</dl>
							<dl>
								<dt>계약일</dt>
								<dd class="num">{{dateFormat(rlestBasData.ctrDt, '. ') || '-'}}</dd>
							</dl>
							<dl>
								<dt>만기일</dt>
								<dd class="num">{{dateFormat(rlestBasData.dueDt, '. ') || '-'}}</dd>
							</dl>
						</li>
					</ul>
				</div>
				<!-- // 임대정보 -->   

                <button v-if="rlestBasData.rlestTngDsc == '1' && rlestBasData.rlestRsdFormDsc == '1'" 
                    type="button" class="stdBtn full" @click.prevent="openBannerLink('2')">재산세 계산하기
                </button>                                                      

            </div>  

            <hr class="hr02">   

            <div class="com_inner">

				<div class="list_line_type" v-if="rlestBasData.rlestCnctAcList != '' && rlestBasData.rlestCnctAcList != null">
					<div class="com_inner" v-for="(rlestAc, idx) in rlestBasData.rlestCnctAcList" :key="'rlestAc_'+idx">
						<strong class="title">관련 대출</strong>
	
						<div class="lists_area asset_type">
							<dl>
								<dt>
									{{rlestAc.acWrsnm}}
									<span class="num">{{rlestAc.mydtAcno}}</span>
								</dt>
								<dd><em class="num">{{rlestAc.acNowBac | numberFilter}}</em>원</dd>
							</dl>
						</div>
	
						<div class="link_area">
                            <a href="javascript:void(0);" v-on:click.prevent="fn_delCnctAc()"><span>삭제</span></a>
                            <a href="javascript:void(0);" v-on:click.prevent="fn_chgCnctAc()"><span>변경</span></a>
						</div>
					</div>
				</div>

                <div v-if="rlestBasData.rlestCnctAcList != '' && rlestBasData.rlestCnctAcList != null">
                    <div class="inner_banner mt30">
                        <a href="javascript:void(0);" role="button" v-on:click.prevent="openBannerLink('3')">
                            <img src="@/assets_v40/images/banner/img_banner_10_2023.png" alt="내 집 마련의 꿈 목표를 시작으로 현실로!">
                        </a>
                    </div>
                </div>                

                <div v-else>
                    <div class="inner_banner mt0">
                        <a href="javascript:void(0);" role="button" v-on:click.prevent="openBannerLink('3')" >
                            <img src="@/assets_v40/images/banner/img_banner_10_2023.png" alt="내 집 마련의 꿈 목표를 시작으로 현실로!">
                        </a>
                    </div>                
                </div>                

            </div>      

            <div class="new_add_register"><a href="javascript:void(0);" role="button" @click.prevent="insRlestBasData()"><span>추가할 부동산이 있으신가요?</span></a></div>
        </div>

        <!-- 등록된 부동산이 없는 경우 -->
        <div id="content" class="renewal" v-else>
		
			<div class="com_inner">
				<div class="no_data_box no_data_box01 grayExclamationType">
					<div class="no_data_list">
						<p class="txt_sub">조회된 정보가 없습니다.</p>
					</div>
				</div>
			</div>

            <div class="com_inner">
                <div class="inner_banner mt30">
                    <a href="javascript:void(0);" role="button" v-on:click.prevent="openBannerLink('3')" >
                        <img src="@/assets_v40/images/banner/img_banner_10_2023.png" alt="내 집 마련의 꿈 목표를 시작으로 현실로!">
                    </a>
                </div>
            </div>      

            <div class="new_add_register"><a href="javascript:void(0);" role="button" @click.prevent="insRlestBasData()"><span>추가할 부동산이 있으신가요?</span></a></div>
			
        </div>

        <footersV2 type="as"/>
    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
//import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
import AsSubCategoryV4 from '@/components/category/AsSubCategoryV4.vue'
import {fncSlick_house1} from '@/utils/slick'
import commonService from '@/service/commonService'
import {dayDiff} from '@/utils/date'
import {numberFormat} from '@/utils/number'
import _ from 'lodash'
import {mapActions} from 'vuex'

import CORE4201 from '@/views/page/CO/RE/CORE4201/CORE4201'     // 부동산 등록 팝업
import PDMY4005 from '@/views/page/PD/MY/PDMY4005/PDMY4005'     // 목표등록 메인
//import PDMY1102 from '@/views/page/PD/MY/PDMY1102/PDMY1102'     // 나의목표 > 목표등록 팝업(AS-IS)
import ASRE1203 from '@/views/page/AS/RE/ASRE1203/ASRE1203'     // 재산세 계산기
import COCO1124 from '@/views/page/CO/CO/COCO1124/COCO1124'     // 계좌목록 팝업
import COCO1002 from '@/views/page/CO/CO/COCO1002/COCO1002'     // 계좌 없을 때의 슬라이드 팝업
import ANRE2203 from '@/views/page/AN/RE/ANRE2203/ANRE2203'     // 부동산 상세(iframe)
import COET1003 from '@/views/page/CO/ET/COET1003/COET1003'     // 부동산 이벤트 응모팝업

export default {
    name : "ASRE4001",
    data: () => {
        return {
            rlestList               : [],       // 부동산목록
            rlestBasData            : [],       // 부동산 보유 기본 정보(전체 데이터 조회 값)
            currIdx                 : 0,        // 현재 선택된 부동산 목록 인덱스

            // 부동산 데이터
            rlestHldSqno            : '',       // 부동산보유일련번호
            rlestCnctAcList         : [],       // 연결계좌목록

            // 자산 부동산금액
            asetRlthRlestAm         : 0,      // 실물자산부동산금액  

            // 공통코드 목록
            rlestTngDscList         : [],       // 부동산 유형(부동산물건구분코드) (아파트:1, 주택:5, 오피스텔:2, 토지/농지:6, 상가:7, 기타:9)
            rlestRsdFormDscList     : [],       // 부동산거주형태구분코드 (자가:1, 전세:2, 월세:3)

            // 이벤트 관련 변수
            isJoin                  : false,    // 이벤트 응모여부(true:응모가능, false:응모불가능)
            isExEvt                 : '',       // 이벤트 종료여부(종료되었으면 false, 나머지는 null)
            isInApt                 : false,    // 아파트 있는지 여부(true:아파트있음, false:아파트없음)
            inteRlestList           : [],       // 관심부동산 목록(이벤트 체크 위함)
            isSearch                : false,     // 조회 여부(조회 전에 이벤트 화면 노출하지 않기 위함)
            hideYn		: false,  // 숨김 여부
            rlestNm     :   "",
            aptHcxnm    :   "",
        }
    },
    mounted() {
        this.init();

        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    mixins: [
        commonMixin
    ],
    computed: {
        rlestTtAm () {

            if(this.pageInfo.params.rlestTtAm>0){
                return this.pageInfo.params.rlestTtAm || 0
            } else {
                return this.asetRlthRlestAm || 0
            }
        }
    },
    methods: {
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        // 초기 실행항목
        init() {
            this.currIdx = 0;
            //this.rlestTngDscList = this.getCodeList("RLEST_TNG_DSC");           // 부동산 유형(부동산물건구분코드)
            //this.rlestRsdFormDscList = this.getCodeList("RLEST_RSD_FORM_DSC");  // 부동산거주형태구분코드
            this.hideYn = this.getSecretAmInfo().includes('RLEST')
            this.getData();             // 부동산 리스트 조회
            this.getInteRlestList();    // 관심부동산 목록 조회
        },
        // 부동산 목록 조회(다건)
        getData() {
            this.prcCn     = 0;
            this.rlestList = [];
            this.isSearch  = false;

            const config = {
                //url: '/as/ra/02r02', //ASIS
                url: '/as/re/01r01',                
                data: {
                    mydtCusno : this.getUserInfo('mydtCusno') // 고객번호
                }
            };

            apiService.call(config).then(response => {
                //this.prcCn     = response.prcCn;

                this.rlestList = response.rlestList || [];

                this.asetRlthRlestAm = response.rlestTotAm
                
                if (this.rlestList.length > 0) {
                    // 목록 중에 아파트 있는지 여부 체크(이벤트)
                    let tmpRlestList = this.rlestList.find((obj) => obj.mmoInpYn == '0');
                    if(tmpRlestList != null)     this.isInApt = true;
                    else                         this.isInApt = false;
                    
                    // 상세조회
                    this.rlestHldSqno = this.rlestHldSqno == null || this.rlestHldSqno == "" ? this.rlestList[0].rlestHldSqno : this.rlestHldSqno;
                    this.getRlestBasData();
                }

                this.$nextTick(() => {
                    this.callJQueryFncExcute();
                    // this.getRlestBasData();     // 부동산 보유 기본 조회 -- 부동산 미보유도 call 하여 삭제

                    $('.house_slick').filter('.slick-initialized').slick('unslick');
                    fncSlick_house1(100, false, this.slick_getRlestBasData, this.currIdx);
                    this.fn_menuOpen()
                    this.fn_menuList()
                })
            });
        },
        // slick call back 시 부동산 보유 기본 조회
        slick_getRlestBasData(idx) {
            this.currIdx = idx;
            this.rlestHldSqno = this.rlestList[idx].rlestHldSqno;

            this.getRlestBasData();     // 부동산 보유 기본 조회
        },
        // 부동산 보유 기본 조회(관련 데이터 전체 출력)
        getRlestBasData() {
            this.rlestBasData = [];
            this.rlestCnctAcList = [];

            const config = {
                url  : '/co/re/01ra1',
                data : {
                    mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                    rlestHldSqno : this.rlestHldSqno              // 부동산보유일련번호
                },
                disableLoading : true,
            };

            apiService.call(config).then(response => {
                //console.log("부동산 상세 데이터 ", response)
                this.rlestBasData = response;
                this.rlestCnctAcList = response.rlestCnctAcList;
                console.log("this.rlestBasData>>>>>",this.rlestBasData)
                this.rlestNm = this.rlestBasData.rlestNm
                this.aptHcxnm = this.rlestBasData.aptHcxnm
                

                this.getEventRgYn();        // 이벤트 응모여부 조회
            });
        },
        // 등록(자산추가)
        insRlestBasData(isTitleHide=false) {
            const config = {
                component : CORE4201, // 부동산정보입력
                params    : {
                    isUpt : false,              // 등록
                    popId : 'ANRE4201',         // 자산완료화면에서 추가 등록 시 팝업 다시 열기 위함
                    isTitleHide : isTitleHide   // 부동산 등록 시 아파트/직접입력 타이틀 hide 여부(true:숨김, false:보임)
                }
            }

            modalService.openPopup(config).then((response) => {
                // asis '|| response == true' 추가
                if(response == 'refresh') {     // 자산 등록완료
                    this.currIdx      = 0;
                    this.rlestHldSqno = "";

                    this.getData();
                } else if(response == 'ANRE4201') {
                    this.currIdx      = 0;
                    this.rlestHldSqno = "";

                    this.getData();
                    this.insRlestBasData(isTitleHide);
                }
            })
        },
        // 수정
        updRlestBasData() {
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
                    this.getData();
                }
            });
        },
        // 삭제
        delRlestBasData() {
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

                                this.getData();
                                // v4 사용자 요청이아닌 수집갱신 주석처리
                                // this.getAllMyAssetInfo(); // vuex 수집갱신 처리
                            });
                        } else {
                            modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {});
                        }
                    });
                }
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
            });
        },
        // 공통코드 명칭 변환
        getComCodeNm(code, codeValue) {
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
            //console.log("codeList = ", codeList);
            //console.log("codeObj = ", codeObj);

            return codeObj.comnCExpl;
        },
        // 금액 한글명, 한글/숫자 class 다르게 적용(시세)
		fn_hanValue_classDiff(value, numClass, txtClass, rlestBasData) {
			const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length
        
            if(rlestBasData){
                if(rlestBasData.rlestTngDsc ==='1' && rlestBasData.rlestRsdFormDsc ==='1' && value <= 0){
                    value = rlestBasData.rlestTrPr
                }else if(rlestBasData.rlestTngDsc ==='1' && rlestBasData.rlestRsdFormDsc ==='1' && value > 0){
                    value = value
                }else if((rlestBasData.rlestTngDsc !=='1' && rlestBasData.rlestRsdFormDsc ==='1') || !rlestBasData.rlestRsdFormDsc){
                    value = rlestBasData.rlestTrPr
                }else{
                    value = rlestBasData.grmy
                }
            }

            let resultArray = []
            let resultString = ""

            for(let i=0; i<splitCnt; i++) {
                let rst = ((value*10000) % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
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
                    resultString = String(numberFormat(resultArray[j])) + unit[j] + '원' + resultString
                } else {
                    resultString = String(numberFormat(resultArray[j])) + unit[j] + ' ' + resultString
                }
            }
            console.log("resultString>>>",resultString)

            // 부동산원 텍스트 추가 시
            if(rlestBasData){
                if(rlestBasData.rlestTngDsc ==='1' && rlestBasData.rlestRsdFormDsc ==='1' && value <= 0){
                    resultString = resultString + '<span>(매매금액)</span>'
                }else if(rlestBasData.rlestTngDsc ==='1' && rlestBasData.rlestRsdFormDsc ==='1' && value > 0){
                    resultString = resultString === '' ? '0원 <span>(한국부동산원)</span>' : resultString + '<span>(한국부동산원)</span>'
                }else if((rlestBasData.rlestTngDsc !=='1' && rlestBasData.rlestRsdFormDsc ==='1') || !rlestBasData.rlestRsdFormDsc){ // !rlestBasData.rlestRsdFormDsc 처리한 이유는 v4고도화 전에 데이터 등록한 사용자를 위해
                    resultString = resultString === '' ? '0원 <span>(매매금액)</span>' : resultString + '<span>(매매금액)</span>'
                }else{
                    resultString = resultString === '' ? '0원 <span>(보증금)</span>' : resultString + '<span>(보증금)</span>'
                }
            }

            return resultString;
        },
        // 시세수익 창출식
        getProfitCalc(genDlAm, commQtart, rlestTrPr) {
            // 매매시세 * 지분율 - 매매금액
            let tmpGenDlAm = String(genDlAm).replace(/[,]/g, '') || 0;      // 매매시세
            let tmpCommQtart = String(commQtart).replace(/[,]/g, '') || 100;  // 지분율
            let tmpRlestTrPr = String(rlestTrPr).replace(/[,]/g, '') || 0;  // 매매금액
            let result = 0;

            // 지분율을 소수점 형식으로 변환
            tmpCommQtart = tmpCommQtart == 0 ? 100 : tmpCommQtart;
            tmpCommQtart /= 100;

            result = (tmpGenDlAm - tmpRlestTrPr) * tmpCommQtart;
            result = Math.floor(result);    // 값이 만원단위라서 소수점 아래 내림
            
            return result;
        },
        // 화면 이동(배너 및 재산세 계산기)
        openBannerLink(dsc) {
            if(dsc == '1') {    // 제휴서비스 > 부동산 화면 이동(ANRE4201)
                const config = {
                    name: 'ANRE4201',
                    param : {
                        aptIdx : this.currIdx
                    }
                }
                commonService.movePage(config);
            } else if(dsc == '2') {     // 재산세 계산기
                const config = {
                    component: ASRE1203,
                    params : {}
                };
                modalService.openPopup(config).then(() => {

                });
            } else if(dsc == '3') {     // 나의 목표 > 목표등록
                const config = {
                    component: PDMY4005,
                    //component : PDMY1102,   // AS-IS 소스 이관 시 AS-IS 소스 연결
                    params : {}
                };
                modalService.openPopup(config).then(() => {

                });
            }
        },
        // 날짜 구분자 추가
        dateFormat(value, format) {
            if(value == '' || value == null)
                return '';

            const year = value.substring(0, 4);
            const month = value.substring(4, 6);
            const day = value.substring(6);
            let result = year + format + month + format + day;
            
            return result;
        },
        // 대출 등록/수정 시 로직(대출 조회 -> 팝업 오픈 -> 저장)
        fn_chgCnctAc() {
            const config = {
                //url  : "/co/co/07r01", // 부동산 담보대출 상품 리스트 조회
                url  : "/an/re/05ra1", // 부동산 통합 계좌 목록 조회(은행/보험의 신용/담보대출)
                data : {
                    //bnkAcDsc  : "32",  // 32:담보대출(부동산)
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
            };

            apiService.call(config).then(response => {
                let contData = [];
                //let rawList  = response.accountList || [];
                let rawList  = response.cnctAcList || [];

                for (let i=0; i<rawList.length; i++) {
                    const tmpArr = {
                        "orgC"      : rawList[i].infOfrmnOrgC,
                        "orgNm"     : rawList[i].trOrgnm,
                        "goodsCode" : rawList[i].mydtAcno,
                        "scNo"      : rawList[i].mydtScNo,
                        "goodsName" : rawList[i].acWrsnm,
                        "goodsPrice": rawList[i].acNowBac,
                        "checked"   : (typeof _.find(this.rlestCnctAcList, {"mydtAcno":rawList[i].mydtAcno, "acWrsnm":rawList[i].acWrsnm}) != "undefined") ? true : false
                    }
                    contData.push(tmpArr);
                }

                this.fn_openRlestCnctPop(contData || []);
            });
        },
        // 부동산 담보대출 상품 slide 팝업 오픈
        fn_openRlestCnctPop(data) {
            if(data.length > 0) {
                const config = {
                    params : {
                        title : "대출상품 선택"
                    },
                    renderer : {
                        component : COCO1124,
                        cdata : {
                            "title":"대출상품 선택",
                            "contentList":[{"contentData":data}]
                        }
                    }
                };

                modalService.openSlidePagePopup(config).then(response => {
                    let saveList = [];

                    for (let i=0; i<response.length; i++) {
                        if (response[i].checked) {
                            const tmpArray = {
                                "infOfrmnOrgC"  :response[i].orgC,
                                "orgnm"         :response[i].orgNm,
                                "mydtScNo"      :response[i].scNo,
                                "mydtAcno"      :response[i].goodsCode,
                                "acWrsnm"       :response[i].goodsName,
                                "acNowBac"      :response[i].goodsPrice,
                                "checked"       :response[i].checked
                            };
                            saveList.push(tmpArray);
                        }
                    }

                    if (!(this.rlestCnctAcList.length == 0 && saveList.length == 0)) {
                        this.fn_saveCnctAc(saveList); // 저장
                    }
                });
            } else {
                const config = {
                    component: COCO1002,
                    params : {}
                }
                modalService.openPopup(config).then((response) => {
                    //바이패스
                    console.log("CORE1202 close popup", response)
                })
            }
        },
        // 대출 저장
        fn_saveCnctAc(saveList) {
            const config = {
                //url : "/as/ra/10s01",
                url : "/an/re/05sa1",
                data : {
                    mydtCusno    : this.getUserInfo("mydtCusno"), // 고객번호
                    rlestHldSqno : this.rlestHldSqno,             // 부동산보유일련번호
                    cnctAcList   : saveList
                }
            };

            apiService.call(config).then(response => {
                if (response.rspC == '0000') {
                    modalService.alert("저장되었습니다.").then(() => {
                        this.getData();
                    });
                } else {
                    modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {});
                }
            });
        },
        // 대출 삭제
        fn_delCnctAc() {
            const config = {
                content : ['연결된 대출 상품을 삭제하시겠습니까?'],
                title   : ""
            };

            modalService.confirm(config).then(text => {
                if(text == "예") {
                    const config_d = {
                        //url : "/as/ra/02d02",
                        url : "/an/re/05da1",
                        data : {
                            mydtCusno    : this.getUserInfo("mydtCusno"), // 고객번호
                            rlestHldSqno : this.rlestHldSqno              // 부동산보유일련번호
                        }
                    };

                    apiService.call(config_d).then(response => {
                        if (response.rspC == '0000') {
                            modalService.alert("삭제되었습니다.").then(() => {
                                this.getData();
                            });
                        } else {
                            modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {});
                        }
                    });
                }
            });
        },

        // 주거형태 따른 배너 텍스트 변경
        rsdFormBannerTxtChg() {
            //내가 활용할 수 있는 돈으로 살 수 있는 부동산을 찾고 싶다면 요기 꾹
            if(this.rlestList.length < 1)   return;

            const tmpRlestRsdFormDsc = this.rlestList[this.currIdx].rlestRsdFormDsc;    // 부동산 거주형태 구분코드
            const tmpRevnMnEn =  this.rlestList[this.currIdx].revnMnEn; // 세입자여부
            let resultTxt = '';
            
            if(tmpRlestRsdFormDsc == '1') {             // 자가
                if(tmpRevnMnEn == '1') {                // 임대중(세입자 존재)
                    const tmpDueDt = this.rlestList[this.currIdx].dueDt; // 만기일
                    let dateDif = dayDiff(tmpDueDt, new Date()) // 시작, 종료

                    if(dateDif < 120) {     // 4개월 이전일 시 노출
                        resultTxt = '내 아파트 적정 전세가를 알려드릴게요'
                    } else {
                        resultTxt = '내 아파트 주변 시세를 알려드릴게요'
                    }
                } else {                                // 직접거주
                    resultTxt = '내 아파트 주변 시세를 알려드릴게요'
                }
            } else if(tmpRlestRsdFormDsc == '2' || tmpRlestRsdFormDsc == '3') {      // 전세/월세
                const tmpDueDt = this.rlestList[this.currIdx].dueDt; // 만기일
                let dateDif = dayDiff(tmpDueDt, new Date()) // 시작, 종료

                if(dateDif < 120) {     // 4개월 이전일 시 노출
                    resultTxt = '내가 사는 아파트 사는데 추가로 필요한 금액을 알려드릴게요'
                } else {
                    resultTxt = '내가 사는 아파트 주변 시세를 알려드릴게요'
                }
            } else {
                //resultTxt = '내가 활용할 수 있는 돈으로 살 수 있는 부동산을 찾고 싶다면 요기 꾹';
                //resultTxt = '관심아파트 등록하시고 다양한 정보를 확인해 보세요'
            }

            return resultTxt;
        },
        // 팝업 화면 오픈
        openRlestFullPop(pageId) {
            // 아파트 아닐 경우 리턴
            if(this.rlestBasData.rlestTngDsc != '1')    return;

            let config = '';
            let tradetype = '';

            if(this.rlestBasData.rlestRsdFormDsc == '1' && this.rlestBasData.rlestTngDsc == '1')     tradetype = 'deal';
            else if(this.rlestBasData.rlestTngDsc == '1')    tradetype = 'lease';

            if(pageId == 'ANRE2203') {       // iframe 부동산 상세
                config = {
                    component: ANRE2203,
                    params : {
                        id 		    : this.rlestBasData.aptHscxIdvdc || '', 		// 아파트단지개별코드
                        tradetype 	: tradetype || '', 			                    // 부동산거주형태구분코드(위티 전달용)
                        space 		: this.rlestBasData.aptHfisArea || '' 			// 아파트분양면적
                    }
                };
                console.log("부동산 상세 파라미터 ", config)
            }
            modalService.openPopup(config).then(() => {
                this.getData();
            });
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
                console.log("응모여부(true:응모가능, false:응모불가능) = " + this.isJoin + ", 종료여부 = " + this.isExEvt)
                console.log("@@@@ " + (this.isJoin && this.isExEvt != 'false'))
                console.log("조회여부 = " + this.isSearch);
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
                    this.init();
                }
            });
        },
        //메뉴열기
        fn_menuOpen() {
				$('.menu_open').on('click', function(){
					$(this).siblings('.menu_list_wrap').removeClass('close').addClass('open');
				});
        },
        fn_menuList() {
				$('.menu_list_wrap .menu_close').on('click', function(){
					$('.menu_list_wrap').removeClass('open').addClass('close');
				});
        },
        /*
            숨김여부
        */
        fn_setHidden(flag, type) {
            this.hideYn = type
            this.setSecretAmInfo(flag, type)
        },

    },
    components: {
        Page,
        FootersV2,
        //AsCategoryV2,
        AsSubCategoryV4
    }
}
</script>
<style scoped>
	.house_slick {
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.1s ease;
		-webkit-transition: opacity 0.1s;
	}
	.house_slick.slick-initialized {
		visibility: visible;
		opacity: 1;
	}
</style>