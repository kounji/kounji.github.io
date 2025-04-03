<!--
/*************************************************************************
* @ 서비스경로 : 홈 > 나의 관심서비스
* @ 페이지설명 : 홈 > 나의 관심서비스
* @ 파일명     : src/views/page/CO/CO/COCO4351/COCO4351.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-02-10
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-10              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>나의 관심서비스 담기</h1>
		</div>

		<div class="popup_content">
            <section class="favorite_wrap">
                <div class="begining">
                    <p class="em">관심서비스를 선택해주세요</p>
                    <p>최대 <em>6개</em>까지 선택할 수 있어요</p>
                </div>

                <div class="cate">
                    <h2>추천 관심서비스</h2>
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AS100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ASTA4001') &gt; -1" @change.prevent="chkValidate($event, 'ASTA4001')" />
                            <label for="AS100000" class="AS100000">
                                <span class="txt">나의 자산</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AS104000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ASIP4001') &gt; -1" @change.prevent="chkValidate($event, 'ASIP4001')" />
                            <label for="AS104000" class="AS104000">
                                <span class="txt">자산진단</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="LC103000" :checked="inteList.findIndex(el=>el.psAmnScid == 'LCIP4001') &gt; -1" @change.prevent="chkValidate($event, 'LCIP4001')" />
                            <label for="LC103000" class="LC103000">
                                <span class="txt">지출분석</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RG101000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGFT4001') &gt; -1" @change.prevent="chkValidate($event, 'RGFT4001')" />
                            <label for="RG101000" class="RG101000">
                                <span class="txt">지역축제</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RG103000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGAT4001') &gt; -1" @change.prevent="chkValidate($event, 'RGAT4001')" />
                            <label for="RG103000" class="RG103000">
                                <span class="txt">농촌여행</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RG104000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGBM4001') &gt; -1" @change.prevent="chkValidate($event, 'RGBM4001')" />
                            <label for="RG104000" class="RG104000">
                                <span class="txt">자전거길 국토종주</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">

                    <h2>자산</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AS100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ASTA4001') &gt; -1" ref="ASTA4001" @change.prevent="chkValidate($event, 'ASTA4001')" />
                            <label for="AS100000" class="AS100000">
                                <span class="txt">나의 자산</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AS101001" :checked="inteList.findIndex(el=>el.psAmnScid == 'ASAC4001') &gt; -1" ref="ASAC4001" @change.prevent="chkValidate($event, 'ASAC4001')" />
                            <label for="AS101001" class="AS101001">
                                <span class="txt">자산현황</span>
                            </label>
                        </span>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AS102001" :checked="inteList.findIndex(el=>el.psAmnScid == 'ASCD4001') &gt; -1" ref="ASCD4001" @change.prevent="chkValidate($event, 'ASCD4001')" />
                            <label for="AS102001" class="AS102001">
                                <span class="txt">부채관리</span>
                            </label>
                        </span>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AS104000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ASIP4001') &gt; -1" ref="ASIP4001" @change.prevent="chkValidate($event, 'ASIP4001')" />
                            <label for="AS104000" class="AS104000">
                                <span class="txt">자산진단</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>지출</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="LC100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'LCTA4001') &gt; -1" ref="LCTA4001" @change.prevent="chkValidate($event, 'LCTA4001')" />
                            <label for="LC100000" class="LC100000">
                                <span class="txt">나의 지출</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="LC101000" :checked="inteList.findIndex(el=>el.psAmnScid == 'LCFD4001') &gt; -1" ref="LCFD4001" @change.prevent="chkValidate($event, 'LCFD4001')" />
                            <label for="LC101000" class="LC101000">
                                <span class="txt">금융달력</span>
                            </label>
                        </span>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="LC102000" :checked="inteList.findIndex(el=>el.psAmnScid == 'LCLE4002') &gt; -1" ref="LCLE4002" @change.prevent="chkValidate($event, 'LCLE4002')" />
                            <label for="LC102000" class="LC102000">
                                <span class="txt">지출내역</span>
                            </label>
                        </span>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="LC103000" :checked="inteList.findIndex(el=>el.psAmnScid == 'LCIP2001') &gt; -1" ref="LCIP2001" @change.prevent="chkValidate($event, 'LCIP2001')" />
                            <label for="LC103000" class="LC103000">
                                <span class="txt">지출분석</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>연금/절세</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="PD100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDTA4001') &gt; -1" ref="PDTA4001" @change.prevent="chkValidate($event, 'PDTA4001')" />
                            <label for="PD100000" class="PD100000">
                                <span class="txt">나의 연금/절세</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="PD101000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDRT4001') &gt; -1" ref="PDRT4001" @change.prevent="chkValidate($event, 'PDRT4001')" />
                            <label for="PD101000" class="PD101000">
                                <span class="txt">나의 노후준비</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="PD102000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDYT2002') &gt; -1" ref="PDYT2002" @change.prevent="chkValidate($event, 'PDYT2002')" />
                            <label for="PD102000" class="PD102000">
                                <span class="txt">연말정산 공제금액</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="PD103000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDTX2004') &gt; -1" ref="PDTX2004" @change.prevent="chkValidate($event, 'PDTX2004')" />
                            <label for="PD103000" class="PD103000">
                                <span class="txt">세금 납부 확인</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="PD104000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDSC4004') &gt; -1" ref="PDSC4004" @change.prevent="chkValidate($event, 'PDSC4004')" />
                            <label for="PD104000" class="PD104000">
                                <span class="txt">건강보험 가입내역</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="PD105000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDBF2001') &gt; -1" ref="PDBF2001" @change.prevent="chkValidate($event, 'PDBF2001')" />
                            <label for="PD105000" class="PD105000">
                                <span class="txt">데일리 금융브리핑</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="PD106000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDPD1001') &gt; -1" ref="PDPD1001" @change.prevent="chkValidate($event, 'PDPD1001')" />
                            <label for="PD106000" class="PD106000">
                                <span class="txt">맞춤 상품추천</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="PD107000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDPD4051') &gt; -1" ref="PDPD4051" @change.prevent="chkValidate($event, 'PDPD4051')" />
                            <label for="PD107000" class="PD107000">
                                <span class="txt">대출이자 계산기</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="PD108000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDPD4061') &gt; -1" ref="PDPD4061" @change.prevent="chkValidate($event, 'PDPD4061')" />
                            <label for="PD108000" class="PD108000">
                                <span class="txt">대출한도 계산기</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>추천</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RE100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RETA4001') &gt; -1" ref="RETA4001" @change.prevent="chkValidate($event, 'RETA4001')" />
                            <label for="RE100000" class="RE100000">
                                <span class="txt">추천</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>금융지식</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="CO100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'COCT4001') &gt; -1" ref="COCT4001" @change.prevent="chkValidate($event, 'COCT4001')" />
                            <label for="CO100000" class="CO100000">
                                <span class="txt">금융지식</span>
                            </label>
                        </span>
                    </div>
                </div>
                <!--
                <div class="cate">
                    <h2>놀이터</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="UI-MR-PG-4001" :checked="inteList.findIndex(el=>el.psAmnScid == 'MRPG4001') &gt; -1" ref="MRPG4001" @change.prevent="chkValidate($event, 'MRPG4001')" />
                            <label for="UI-MR-PG-4001" class="UI-MR-PG-4001">
                                <span class="txt">놀이터</span>
                            </label>
                        </span>
                    </div>
                </div>
                -->
                <div class="cate">
                    <h2>도전 목표 챌린지</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="PD201000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDMY4001') &gt; -1" ref="PDMY4001" @change.prevent="chkValidate($event, 'PDMY4001')" />
                            <label for="PD201000" class="PD201000">
                                <span class="txt">버킷리스트</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="PD202000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDMY4003') &gt; -1" ref="PDMY4003" @change.prevent="chkValidate($event, 'PDMY4003')" />
                            <label for="PD202000" class="PD202000">
                                <span class="txt">금융목표</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>나의 신용점수 올리기</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AS200000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ASCR4101') &gt; -1" ref="ASCR4101" @change.prevent="chkValidate($event, 'ASCR4101')" />
                            <label for="AS200000" class="AS200000">
                                <span class="txt">나의 신용점수 올리기</span>
                            </label>
                        </span>
<!-- 
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="cate_6_2" />
                            <label for="cate_6_2">
                                <span class="img"><img src="../../../../src/assets_v40/images/icon/favorite/icon_credit_2.png" alt="" /></span>
                                <span class="txt">신용정보 조회건수</span>
                            </label>
                        </span> -->
                    </div>
                </div>

                <div class="cate">
                    <h2>NH지역정보</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RG100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGTA4001') &gt; -1" ref="RGTA4001" @change.prevent="chkValidate($event, 'RGTA4001')" />
                            <label for="RG100000" class="RG100000">
                                <span class="txt">NH지역정보</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RG101000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGFT4001') &gt; -1" ref="RGFT4001" @change.prevent="chkValidate($event, 'RGFT4001')" />
                            <label for="RG101000" class="RG101000">
                                <span class="txt">지역축제</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RG102000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGCL4001') &gt; -1" ref="RGCL4001" @change.prevent="chkValidate($event, 'RGCL4001')" />
                            <label for="RG102000" class="RG102000">
                                <span class="txt">지역문화/정보</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RG103000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGAT4001') &gt; -1" ref="RGAT4001" @change.prevent="chkValidate($event, 'RGAT4001')" />
                            <label for="RG103000" class="RG103000">
                                <span class="txt">농촌여행</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RG104000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGBM4001') &gt; -1" ref="RGBM4001" @change.prevent="chkValidate($event, 'RGBM4001')" />
                            <label for="RG104000" class="RG104000">
                                <span class="txt">자전거길 국토종주</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RG105000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGDM4001') &gt; -1" ref="RGDM4001" @change.prevent="chkValidate($event, 'RGDM4001')" />
                            <label for="RG105000" class="RG105000">
                                <span class="txt">전국 둘레길</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RG106000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGMM4001') &gt; -1" ref="RGMM4001" @change.prevent="chkValidate($event, 'RGMM4001')" />
                            <label for="RG106000" class="RG106000">
                                <span class="txt">군장병 TMO 안내</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RG107000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ANFM4001') &gt; -1" ref="ANFM4001" @change.prevent="chkValidate($event, 'ANFM4001')" />
                            <label for="RG107000" class="RG107000">
                                <span class="txt">귀농 귀촌의 꿈</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RG108000" :checked="inteList.findIndex(el=>el.psAmnScid == 'SZFC4101') &gt; -1" ref="SZFC4101" @change.prevent="chkValidate($event, 'SZFC4101')" />
                            <label for="RG108000" class="RG108000">
                                <span class="txt">슬기로운 영농생활</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>NH콕마이카</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AN100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ANCA4201') &gt; -1" ref="ANCA4201" @change.prevent="chkValidate($event, 'ANCA4201')" />
                            <label for="AN100000" class="AN100000">
                                <span class="txt">NH콕마이카</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>NH콕부동산</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AN200000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ANRE4201') &gt; -1" ref="ANRE4201" @change.prevent="chkValidate($event, 'ANRE4201')" />
                            <label for="AN200000" class="AN200000">
                                <span class="txt">NH콕부동산</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>이벤트/이용안내</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="MR104000" :checked="inteList.findIndex(el=>el.psAmnScid == 'MRLO4001') &gt; -1" ref="MRLO4001" @change.prevent="chkValidate($event, 'MRLO4001')" />
                            <label for="MR104000" class="MR104000">
                                <span class="txt">로또복권 번호만들기</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="MR105000" :checked="inteList.findIndex(el=>el.psAmnScid == 'MREV4041') &gt; -1" ref="MREV4041" @change.prevent="chkValidate($event, 'MREV4041')" />
                            <label for="MR105000" class="MR105000">
                                <span class="txt">친구초대</span>
                            </label>
                        </span>
                    </div>
                </div>

                
            </section>
		</div>

        <div class="popup_footer fixed">
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" @click.prevent="putFavorite()">담기</button>
            </div>
        </div>
        
		<!-- 20211108 한별 접근성 role="button" 추가 S -->
		<a href="#nolink" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
		<!--// 20211108 한별 접근성 role="button" 추가 E -->			
		
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'

import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import {mapActions} from 'vuex'
import _ from 'lodash'

export default {
    name : "COCO4351",
    data: () => {
        return {
            fvrList  : [],       // 선택된 관심서비스
            inteList : [],

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
            this.getCusInteList() // 나의 관심서비스 조회
        },
        // 나의 관심서비스 조회
        getCusInteList() {
            const config = {
                url : '/co/co/51r01',
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno"),
                    vernm     : "V4"                           // 버전명(고도화4.0->V4)
                }
            }
            apiService.call(config).then(response => {
                this.inteList = response.fvrList
            })
            
        },

        // 선택 항목 6개 초과 체크
        chkValidate(e, targetId, _this) {
            let tmp = e.target.checked ? 1 : -1; // 1:체크,-1:체크해제
            
            if(this.inteList.length + tmp > 6) {
                modalService.alert("나의 관심서비스는 최대 6개까지 선택할 수 있습니다.").then(() => {e.target.checked = false});
                return;
            }

            let cateObj = {"ASTA4001":"나의 자산", "ASAC4001":"자산현황", "ASCD4001":"부채관리", "ASIP4001":"자산진단",
                           "LCTA4001":"나의 지출", "LCFD4001":"금융달력", "LCLE4002":"지출내역", "LCIP4001":"지출분석",
                           "PDTA4001":"나의 연금/절세", "PDRT4001":"나의 노후준비", "PDYT2002":"연말정산 공제금액", "PDTX2004":"세금 납부 확인",
                           "PDSC4004":"건강보험 가입내역", "PDBF2001":"데일리 금융브리핑", "PDPD1001":"맞춤 상품추천", "PDPD4220":"대출이자 계산기",
                           "PDPD4221":"대출한도 계산기", "RETA4001":"추천", "COCT4001":"금융지식", "MRPG4001":"놀이터", "PDMY4001":"버킷리스트",
                           "PDMY4003":"금융목표", "ASCR4101":"나의 신용점수 올리기", "RGTA4001":"NH지역정보", "RGFT4001":"지역축제",
                           "RGCL4001":"지역문화/정보", "RGAT4001":"농촌여행", "RGBM4001":"자전거길 국토종주", "RGDM4001":"전국 둘레길",
                           "RGMM4001":"군장병 TMO 안내", "ANFM4001":"귀농 귀촌의 꿈", "SZFC4101":"슬기로운 영농생활", "ANCA4201":"NH콕마이카",
                           "ANRE4201":"NH콕부동산", "MRLO4001":"로또복권 번호만들기", "MREV4041":"친구초대"};
            
            if(tmp == 1) { // 체크한 경우
                if(this.inteList.findIndex(el=>el.psAmnScid == targetId) < 0) { // 기존 조회된 서비스는 push 안되게 막음
                    this.inteList.push({
                                            psAmnScid  : targetId,
                                            psAmnScrnm : cateObj[targetId],
                                            prtoSq     :-1
                                       })
                }
            } else {
                this.inteList.splice(this.inteList.findIndex(el=>el.psAmnScid == targetId), 1)
            }
        },
        // 선택한 관심 서비스 담기
        putFavorite() {
            if(this.inteList.length > 6) {
                modalService.alert("나의 관심서비스는 최대 6개까지 선택할 수 있습니다.").then(() => {});
                return;
            }
            // 메뉴 테이블 참고
            this.inteList.forEach((el, idx) => {
                this.inteList[idx].psAmnScid  = el.psAmnScid
                this.inteList[idx].psAmnScrnm = el.psAmnScrnm
                this.inteList[idx].prtoSq     = idx+1
            })

            const config = {
                url : '/co/co/51s01',
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno"),
                    pgmnm     : "PFMCOCO51S01",
                    vernm     : "V4",
                    fvrList   : this.inteList
                }
            }
            apiService.call(config).then(response => {
                if(response.rspC == "0000") { // 정상 처리된 경우
                    this.close("refresh")
                }
            })
            /*
            let localKey = "inteScrn" + this.getUserInfo('mydtCusno') + "V4";
            commonService.setStorage(localKey, inteScrnList);
            */
            //this.close("refresh");
        },

        isEmpty(value) {
            return (value === null || value === undefined || value.length < 1) ? true : false
        },
    },
    components : {

    },
    destroyed() {
        //this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>