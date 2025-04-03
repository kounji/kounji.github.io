<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 휴면계좌/휴면보험금 목록
* @ 페이지설명 : 자산 > 숨은 자산 > 휴면계좌/휴면보험금 목록
* @ 파일명     : src/views/page/AS/TN/ASTN4001/ASTN4001.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-10
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-10              CS541599              최초작성
*************************************************************************/
-->
<template>
    
    <page class="content-view">
        <nav class="navi">
            <div class="inner">
                <ul role="navigation" aria-label="숨은자산" class="depth1-4">
                    <li><a href="#" :aria-current="tabIdx == 0 ? 'page' : ''" @click.prevent="fnTab(0)"><span>휴면계좌</span></a></li>
                    <li><a href="#" :aria-current="tabIdx == 1 ? 'page' : ''" @click.prevent="fnTab(1)"><span>휴면보험금</span></a></li>
                </ul>
            </div>
        </nav>

        <div id="content">
            <section class="sleep_account">
                <!--update-->
                <div class="update">
                    <span>2025.07.31 15:02</span>
                    <!-- <button type="button" class="btn_update" @click.prevent="getData()"><span class="blind">업데이트</span></button> -->
                    <button type="button" class="btn_update" @click.prevent="fnTest()"><span class="blind">업데이트</span></button>
                </div>
                <template v-if="tabIdx == 0">
                    <h2>휴면예금이란?</h2>
                    <div class="custom_tooltip up">
                        <div class="com_tooltip_type02 com_tooltip_type03">
                            <a href="#nolink" class="com_btn_info" role="button">
                                <em class="tooltip_icon_gray"><span class="blind">툴팁열기</span></em>
                            </a>
                        </div>
                        <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                            <div>
                                <ul class="bl_dot_list">
                                    <li>1년 이상 사용하지 않은 잔액이 있는 비활동성 계좌 중 소액(100만원 이하)에 해당하는 계좌만 조회 가능합니다.</li>
                                    <li>계좌를 해지하여 잔액을 이전하거나, 서민금융진흥원에 기부할 수 있습니다.</li>
                                    <li>해지 처리가 완료된 이후 취소가 불가능합니다. </li>
                                </ul>

                                <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                            </div> 
                        </div>
                    </div>
                    
                    <!-- 25-03-10 숨은예금 조회하기 링크 추가/25-03-11 하단으로 이동 
                    <div class="top_area">
                        <a href="#nolink" class="btn_connect">자산연결 추가</a>
                    </div>
                    -->
                    <!-- //25-03-10 숨은예금 조회하기 링크 추가 -->

                    <!--계좌가 있을경우-->
                    <template  v-if="hdAcList.length &gt; 0">
                        <div class="board_box">
                            <ul class="assets_list">
                                <li v-for="(item, idx) in hdAcList" :key="idx">
                                    <a href="#nolink" @click.prevent="fnOpenDtl(1,item)">
                                        <i :class="'ico_bank '+item.infOfrmnOrgC"></i>
                                        <div>
                                            <strong class="org">{{item.infOfrmnOrgC}} {{item.acWrsnm}}</strong>
                                            <div class="account">{{item.mydtAcno}}</div>
                                            <strong class="num">{{item.acNowBac | numberFilter}}{{item.curc}}</strong>
                                        </div>
                                    </a>
                                    <!-- 25-03-10 버튼 추가 / 25-03-11 해지불가 버튼 케이스 추가 -->
                                    <div class="btn_area">
                                        <button type="button" @click.prevent="fnStltAgree(item)" class="btns" :disabled="item.mydtAcStsc == '03' ? true:false">{{item.mydtAcStsc =='01' ? '해지가능여부조회':'해지불가'}}</button>
                                    </div>
                                    <!-- //25-03-10 버튼 추가 / 25-03-11 해지불가 버튼 케이스 추가 -->
                                </li>
                            </ul>
                            <!-- 25-03-11 자산 연결 추가 버튼 하단으로 이동  -->
                            <div class="btn_wrap">
                                <button type="button" class="btns gray md" @click.prevent="fnNewAsset()"><span class="icon_line_right">자산연결 추가</span></button>
                            </div>
                            <!-- //25-03-11 자산 연결 추가 버튼 하단으로 이동  -->
                        </div>

                        <div class="bottom">
                            <a href="#" class="btns_txt"><span>해지계좌조회</span></a>
                        </div>
                    </template>
                    <template v-else>
                        <div class="board_box">
						<div class="no_result">
							<p class="text">조회 결과가 없어요.</p>
							<div class="bg">
								<lottie-player src="@/assets_v40/images/lottie/bg_no_result.json" loop="" autoplay="" aria-hidden="true" class="bg_no_result" background="transparent"></lottie-player>
							</div>
							<div class="btn_wrap">
								<button type="button" class="btns md gray" @click.prevent="fnNewAsset()"><span class="icon_line_right">자산연결 다시하기</span></button>
							</div>
						</div>
					</div>
                    </template>
                </template>
                <!-- tabIdx == 1 휴면보험금 -->
                <template v-else>
                    <h2>휴면보험금이란?</h2>
                    <div class="custom_tooltip up">
                        <div class="com_tooltip_type02 com_tooltip_type03">
                            <a href="#nolink" class="com_btn_info" role="button">
                                <em class="tooltip_icon_gray"><span class="blind">툴팁열기</span></em>
                            </a>
                        </div>
                        <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                            <div>
                                <p>소멸시효가 경과되어 서민금융진흥원으로 출연 예정에 있으나, 아직 출연되지 않아 *금융기관에서 보유 중인 예금, 보험금 계좌입니다.</p><br>
                                <p>소멸시효는 반기 또는 연에 1번 소멸시효가 완성된 계좌를 출연하므로, 최대 1년 이내로 금융기관에서 보유한 상태를 의미합니다.</p>
    
                                <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                            </div> 
                        </div>
                    </div>
    
                    <!--계좌가 있을경우-->
                    <div class="board_box" v-if="isrList.length &gt; 0">
                        <!-- 25-03-11 삭제 <h3 class="title">휴면보험금</h3> -->
                        <ul class="assets_list">
                            <li v-for="(item, idx) in isrList" :key="idx">
                                <a href="#nolink" @click.prevent="fnOpenDtl(item)">
                                    <i :class="'ico_bank '+item.infOfrmnOrgC"></i>
                                    <div>
                                        <strong class="org">{{item.infOfrmnOrgNm}} {{item.isrcoWrsnm}}</strong>
                                        <div class="account">{{item.isrSctsNo}}<span v-if="item.dsc == '01'">휴면보험금</span></div><!--  25-03-11 문구변경 -->
                                        <strong class="num">{{isrCtrAm | numberFilter}}{{item.curc}}</strong>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <!-- 25-03-11 자산 연결 추가 버튼 추가  -->
                        <div class="btn_wrap">
                            <button type="button" class="btns gray md"><span class="icon_line_right">자산연결 추가</span></button>
                        </div>
                        <!-- //25-03-11 자산 연결 추가 버튼 추가  -->
                    </div>
                    <div class="board_box" v-else>
						<div class="no_result">
							<p class="text">조회 결과가 없어요.</p>
							<div class="bg">
								<lottie-player src="@/assets_v40/images/lottie/bg_no_result.json" loop="" autoplay="" aria-hidden="true" class="bg_no_result" background="transparent"></lottie-player>
							</div>
							<div class="btn_wrap">
								<button type="button" class="btns md gray"><span class="icon_line_right">자산연결 다시하기</span></button>
							</div>
						</div>
					</div>
                </template>
            </section>
        </div>
        <footersV2 type="as" />
    </page>
    
    
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'

import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import {mapActions} from 'vuex'
import {defineAsyncComponent} from 'vue'

import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue
import plzLotteryJson from "@/assets_v40/images/lottie/bg_no_result.json"

import _ from 'lodash'
import Template from '../../../XX/template/template.vue'

export default {
    name : "ASTN4001",
    data: () => {
        return {
            tabIdx          : 0,  // 탭 index
            hdAcList        : [], // 숨은자산 휴면계좌
            hdIsList        : [], // 숨은자산 휴면보험
            bnkList         : [], // 숨은자산 휴면계좌 목록
            isrList         : [], // 숨은자산 휴면보험금 목록

            apiOrgCode      : '', // 이용기관코드
            bankCode        : '', // 은행코드
        }
    },
	computed: {
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        initComponent(param) {
            this.apiOrgCode = "A4AAAZ0000"
            this.getData()
        },
        fnTest() {
            let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4010/ASTN4010"))
            const config = {
                component: compName
            }

            modalService.openPopup(config)
        },
        /* 숨은자산 조회 */
        getData() {
            // 0 : 휴면계좌
            // 1 : 휴면보험금
            this.hdAcList.push(this.fnChgAcObj(1, 'A1AAJB0000', 'K뱅크', '18291072182207', 14523, '01',''))
            this.hdAcList.push(this.fnChgAcObj(2, 'A1AAHJ0000', '카카오뱅크', '2530872909523', 234000, '03',1))

            /*
            const config = {
                url: '/as/tn/01r01',
                data: {
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
            }
            apiService.call(config).then(response =>{
                console.log("@@@ response=>", response)
            })
            */
        },
        /* 테스트 함수 */
        fnChgAcObj(val0, val1, val2, val3, val4, val5, val6) {
            let rtn = {
                sqno          : val0, // 순서
                infOfrmnOrgC  : val1, // 기관코드
                acWrsnm       : val2, // 상품명
                mydtAcno      : val3, // 계좌번호
                acNowBac      : val4, // 잔액
                mydtAcStsc    : val5, // 해지구분코드 
                curc          : "원",
                mydtScno      : val6, // 예금회차
            }

            return rtn
        },

        fnTab(idx) {
            this.tabIdx = idx
        },
        /* 약관동의 */
        fnStltAgree(item) {
            // 09:00~22:00만 이용 가능
            let now = new Date()
            let sysdtm = now.getHours()+""+now.getMinutes()

            console.log("@@@ 현재 시간 =>",sysdtm)

            if(sysdtm < "0900" || sysdtm > "2200") {
                modalService.alert("서비스 제공시간은 09:00 ~ 22:00입니다.")
                return
            }

            // 정보제공자기관코드를 입력값으로 넣어 은행코드를 가져옴
            const config1 = {
                url: '/as/tn/01r04',
                data: {
                    inqDsc  : '1',                           // 1:기관코드->은행코드, 2:은행코드->기관코드
                    inqCd   : item.infOfrmnOrgC              // 정보제공자기관코드
                }
            }
            apiService.call(config1).then(response =>{
                this.bankCode = response.repNbnkC   // 은행코드
                //response.repNbnkCNm // 은행코드명

                let stltList = [
                    {stltTinm : '약관내용 1번 제목', stltCntn : '약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용'},
                    {stltTinm : '약관내용 2번 제목', stltCntn : '약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용'},
                    {stltTinm : '약관내용 3번 제목', stltCntn : '약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용'},
                    {stltTinm : '약관내용 4번 제목', stltCntn : '약관내용 4번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용'}
                ]

                // 약관 팝업 호출
                let tmpMydtScno = item.mydtScno.replaceAll("NULL", "") // 회차번호가 없으면 NULL이라는 문자로 들어오기 때문에 api 입력으로 쓰기위해 공백으로 치환

                let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4004/ASTN4004"))
                const config = {
                    component: compName, 
                    params   : {
                            callDsc        : 'E',
                            eligibilityObj : {
                                    apiOrgCode      : this.apiOrgCode,   // 이용기관코드
                                    bankCode        : this.bankCode,     // 개설 금융회사 코드
                                    accountNum      : item.mydtAcno,     // 계좌 번호
                                    depositSequence : tmpMydtScno,       // 예금 회차 번호
                                    infOfrmnOrgC    : item.infOfrmnOrgC  // 정보제공자기관코드(계좌해지가능여부 조회 API 및 계좌해지 및 잔액이전 API에서 해지 비트를 업데이트 하기 위해 infOfrmnOrgC(PK)를 들고감)
                                },
                            stltList       : stltList
                        }
                }

                modalService.openPopup(config).then(response => {
                    // 해지가능여부 조회는 이미 약관에서 처리하고 돌아옴
                    if(!this.isEmpty(response)) { // 동의 완료
                        // 계좌이체/기부로 이동
                        let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4006/ASTN4006")) // 계좌이체/기부

                        const config = {
                            component : compName,
                            params    : {
                                apiOrgCode      : response.apiOrgCode,      // 이용기관코드
                                infOfrmnOrgC    : item.infOfrmnOrgC,        // 정보제공자기관코드(계좌해지가능여부 조회 API 및 계좌해지 및 잔액이전 API에서 해지 비트를 업데이트 하기 위해 infOfrmnOrgC(PK)를 들고감)
                                infOfrmnOrgNm   : item.infOfrmnOrgNm,       // 정보제공자기관코드명(해지결과안내에서 사용)
                                accountType     : response.accountType      // 계좌 종류(1:수시입출금, 2:예적금)
                            }
                        }
                        
                        modalService.openPopup(config).then((response) => {
                            if(response == 'impossible') { // 해지가 불가한 계좌

                            } else if(response == 'svcOut') {
                                // 09:00~22:00만 이용 가능
                                modalService.alert("서비스 제공시간은 09:00 ~ 22:00입니다.")
                                return
                            }
                        });
                    }
                })
            })

        },
        /* 팝업 열기 */
        fnOpenDtl(idx, item) {
            // idx 1:상세 2:해지계좌목록
            let compName = ''

            if(idx == 1) {                // 숨은자산 휴면예금/휴면보험금 상세 팝업
                compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4002/ASTN4002"))

                const config = {
                    component: compName,
                    params   : {
                        param : item
                    }
                }
                modalService.openPopup(config).then((response) => {

                });
            } else if(idx == 2) {         // 해지계좌목록
                compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4003/ASTN4003"))

                const config = {
                    component: compName
                }

                modalService.openPopup(config).then((response) => {


                });
            }
        },
        // 신규 자산 연결
        fnNewAsset() {
            let compName = defineAsyncComponent(() => import("@/views/page/CO/AR/COAR2002/COAR2002"))
            const config = {
                component : compName,
                params : {
                    isMramNew : true,
                    orgDsc : orgDsc
                }
            }
            modalService.openPopup(config).then(() => {
                //this.getData();
            })
        },

        isEmpty(value) {
            if(typeof(value) == 'object') {
                if(Array.isArray(value)) {
                    return value.length < 1 ? true : false
                } else {
                    return Object.keys(value).length < 1 ? true : false
                }
            }
            
            return (value === null || value === undefined || value.length < 1) ? true : false
        },
    },
    components : {
        Page,
        FootersV2
    },
    destroyed() {
        //this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>