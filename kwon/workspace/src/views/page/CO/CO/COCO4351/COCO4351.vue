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
                    <p class="em">관심서비스를 선택해 주세요</p>
                    <p>최대 <em>6개</em>까지 선택할 수 있어요</p>
                </div>

                <div class="cate">
                    <h2>추천 관심서비스</h2>
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="EB101000-2" :checked="inteList.findIndex(el=>el.psAmnScid == 'LCFD4001') &gt; -1" @change.prevent="chkValidate($event, 'LCFD4001')" />
                            <label for="EB101000-2" class="EB101000">
                                <span class="txt">금융달력</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AB102000-2" :checked="inteList.findIndex(el=>el.psAmnScid == 'ASCD4001') &gt; -1" @change.prevent="chkValidate($event, 'ASCD4001')" />
                            <label for="AB102000-2" class="AB102000">
                                <span class="txt">부채관리</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="GA100000-2" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDMY4001') &gt; -1" @change.prevent="chkValidate($event, 'PDMY4001')" />
                            <label for="GA100000-2" class="GA100000">
                                <span class="txt">도전 목표 챌린지</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="TB107000-2" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDPD4051') &gt; -1" @change.prevent="chkValidate($event, 'PDPD4051')" />
                            <label for="TB107000-2" class="TB107000">
                                <span class="txt">대출이자 계산기</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RE100000-2" :checked="inteList.findIndex(el=>el.psAmnScid == 'ANRE4201') &gt; -1" @change.prevent="chkValidate($event, 'ANRE4201')" />
                            <label for="RE100000-2" class="RE100000">
                                <span class="txt">NH콕부동산</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RB101000-2" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGFT4001') &gt; -1" @change.prevent="chkValidate($event, 'RGFT4001')" />
                            <label for="RB101000-2" class="RB101000">
                                <span class="txt">지역축제</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">

                    <h2>자산</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AB100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ASTA4001') &gt; -1" ref="ASTA4001" @change.prevent="chkValidate($event, 'ASTA4001')" />
                            <label for="AB100000" class="AB100000">
                                <span class="txt">나의 자산</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AB101000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ASAC4001') &gt; -1" ref="ASAC4001" @change.prevent="chkValidate($event, 'ASAC4001')" />
                            <label for="AB101000" class="AB101000">
                                <span class="txt">자산현황</span>
                            </label>
                        </span>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AB102000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ASCD4001') &gt; -1" ref="ASCD4001" @change.prevent="chkValidate($event, 'ASCD4001')" />
                            <label for="AB102000" class="AB102000">
                                <span class="txt">부채관리</span>
                            </label>
                        </span>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="AB103000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ASIP4001') &gt; -1" ref="ASIP4001" @change.prevent="chkValidate($event, 'ASIP4001')" />
                            <label for="AB103000" class="AB103000">
                                <span class="txt">자산진단</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>지출</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="EB100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'LCTA4001') &gt; -1" ref="LCTA4001" @change.prevent="chkValidate($event, 'LCTA4001')" />
                            <label for="EB100000" class="EB100000">
                                <span class="txt">나의 지출</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="EB101000" :checked="inteList.findIndex(el=>el.psAmnScid == 'LCFD4001') &gt; -1" ref="LCFD4001" @change.prevent="chkValidate($event, 'LCFD4001')" />
                            <label for="EB101000" class="EB101000">
                                <span class="txt">금융달력</span>
                            </label>
                        </span>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="EB102000" :checked="inteList.findIndex(el=>el.psAmnScid == 'LCLE4001') &gt; -1" ref="LCLE4001" @change.prevent="chkValidate($event, 'LCLE4001')" />
                            <label for="EB102000" class="EB102000">
                                <span class="txt">지출내역</span>
                            </label>
                        </span>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="EB103000" :checked="inteList.findIndex(el=>el.psAmnScid == 'LCIP4001') &gt; -1" ref="LCIP4001" @change.prevent="chkValidate($event, 'LCIP4001')" />
                            <label for="EB103000" class="EB103000">
                                <span class="txt">지출분석</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>연금/절세</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="TB100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDTA4001') &gt; -1" ref="PDTA4001" @change.prevent="chkValidate($event, 'PDTA4001')" />
                            <label for="TB100000" class="TB100000">
                                <span class="txt">나의 연금/절세</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="TB101000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDRT4001') &gt; -1" ref="PDRT4001" @change.prevent="chkValidate($event, 'PDRT4001')" />
                            <label for="TB101000" class="TB101000">
                                <span class="txt">나의 노후준비</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="TB102000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDYT4002') &gt; -1" ref="PDYT4002" @change.prevent="chkValidate($event, 'PDYT4002')" />
                            <label for="TB102000" class="TB102000">
                                <span class="txt">연말정산 공제금액</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="TB103000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDTX4004') &gt; -1" ref="PDTX4004" @change.prevent="chkValidate($event, 'PDTX4004')" />
                            <label for="TB103000" class="TB103000">
                                <span class="txt">세금 납부 확인</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="TB104000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDSC4004') &gt; -1" ref="PDSC4004" @change.prevent="chkValidate($event, 'PDSC4004')" />
                            <label for="TB104000" class="TB104000">
                                <span class="txt">건강보험 가입내역</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="TB105000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDBF4001') &gt; -1" ref="PDBF4001" @change.prevent="chkValidate($event, 'PDBF4001')" />
                            <label for="TB105000" class="TB105000">
                                <span class="txt">데일리 금융브리핑</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="TB106000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDPD4001') &gt; -1" ref="PDPD4001" @change.prevent="chkValidate($event, 'PDPD4001')" />
                            <label for="TB106000" class="TB106000">
                                <span class="txt">맞춤 상품추천</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="TB107000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDPD4051') &gt; -1" ref="PDPD4051" @change.prevent="chkValidate($event, 'PDPD4051')" />
                            <label for="TB107000" class="TB107000">
                                <span class="txt">대출이자 계산기</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="TB108000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDPD4061') &gt; -1" ref="PDPD4061" @change.prevent="chkValidate($event, 'PDPD4061')" />
                            <label for="TB108000" class="TB108000">
                                <span class="txt">대출한도 계산기</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>추천</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RC100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RETA4001') &gt; -1" ref="RETA4001" @change.prevent="chkValidate($event, 'RETA4001')" />
                            <label for="RC100000" class="RC100000">
                                <span class="txt">추천</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>금융지식</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="FK100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'COCT4001') &gt; -1" ref="COCT4001" @change.prevent="chkValidate($event, 'COCT4001')" />
                            <label for="FK100000" class="FK100000">
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
                            <input type="checkbox" name="favorite_cate" id="GA100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'PDMY4001') &gt; -1" ref="PDMY4001" @change.prevent="chkValidate($event, 'PDMY4001')" />
                            <label for="GA100000" class="GA100000">
                                <span class="txt">도전 목표 챌린지</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>나의 신용점수 올리기</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="CS100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ASCR4101') &gt; -1" ref="ASCR4101" @change.prevent="chkValidate($event, 'ASCR4101')" />
                            <label for="CS100000" class="CS100000">
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
                            <input type="checkbox" name="favorite_cate" id="RB100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGTA4001') &gt; -1" ref="RGTA4001" @change.prevent="chkValidate($event, 'RGTA4001')" />
                            <label for="RB100000" class="RB100000">
                                <span class="txt">NH지역정보</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RB101000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGFT4001') &gt; -1" ref="RGFT4001" @change.prevent="chkValidate($event, 'RGFT4001')" />
                            <label for="RB101000" class="RB101000">
                                <span class="txt">지역축제</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RB102000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGCL4001') &gt; -1" ref="RGCL4001" @change.prevent="chkValidate($event, 'RGCL4001')" />
                            <label for="RB102000" class="RB102000">
                                <span class="txt">지역문화시설</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RB103000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGAT4001') &gt; -1" ref="RGAT4001" @change.prevent="chkValidate($event, 'RGAT4001')" />
                            <label for="RB103000" class="RB103000">
                                <span class="txt">농촌여행</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RB104000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGBM4001') &gt; -1" ref="RGBM4001" @change.prevent="chkValidate($event, 'RGBM4001')" />
                            <label for="RB104000" class="RB104000">
                                <span class="txt">자전거길 국토종주</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RB105000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGDM4001') &gt; -1" ref="RGDM4001" @change.prevent="chkValidate($event, 'RGDM4001')" />
                            <label for="RB105000" class="RB105000">
                                <span class="txt">전국 둘레길</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RB106000" :checked="inteList.findIndex(el=>el.psAmnScid == 'RGMM4001') &gt; -1" ref="RGMM4001" @change.prevent="chkValidate($event, 'RGMM4001')" />
                            <label for="RB106000" class="RB106000">
                                <span class="txt">군장병 TMO 안내</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RB107000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ANFM4001') &gt; -1" ref="ANFM4001" @change.prevent="chkValidate($event, 'ANFM4001')" />
                            <label for="RB107000" class="RB107000">
                                <span class="txt">귀농 귀촌의 꿈</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RB108000" :checked="inteList.findIndex(el=>el.psAmnScid == 'SZFC4101') &gt; -1" ref="SZFC4101" @change.prevent="chkValidate($event, 'SZFC4101')" />
                            <label for="RB108000" class="RB108000">
                                <span class="txt">슬기로운 영농생활</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>NH콕마이카</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="MC100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ANCA4201') &gt; -1" ref="ANCA4201" @change.prevent="chkValidate($event, 'ANCA4201')" />
                            <label for="MC100000" class="MC100000">
                                <span class="txt">NH콕마이카</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>NH콕부동산</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="RE100000" :checked="inteList.findIndex(el=>el.psAmnScid == 'ANRE4201') &gt; -1" ref="ANRE4201" @change.prevent="chkValidate($event, 'ANRE4201')" />
                            <label for="RE100000" class="RE100000">
                                <span class="txt">NH콕부동산</span>
                            </label>
                        </span>
                    </div>
                </div>

                <div class="cate">
                    <h2>이벤트/이용안내</h2>
                    
                    <div>
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="EV102000" :checked="inteList.findIndex(el=>el.psAmnScid == 'MRLO4001') &gt; -1" ref="MRLO4001" @change.prevent="chkValidate($event, 'MRLO4001')" />
                            <label for="EV102000" class="EV102000">
                                <span class="txt">로또복권 번호만들기</span>
                            </label>
                        </span>

                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="EV103000" :checked="inteList.findIndex(el=>el.psAmnScid == 'MREV4041') &gt; -1" ref="MREV4041" @change.prevent="chkValidate($event, 'MREV4041')" />
                            <label for="EV103000" class="EV103000">
                                <span class="txt">친구초대</span>
                            </label>
                        </span>
                        
                        <span class="checkbox">
                            <input type="checkbox" name="favorite_cate" id="EV104000" :checked="inteList.findIndex(el=>el.psAmnScid == 'OXTP0001') &gt; -1" ref="OXTP0001" @change.prevent="chkValidate($event, 'OXTP0001')" />
                            <label for="EV104000" class="EV104000">
                                <span class="txt">OX퀴즈</span>
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
		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
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

            if(tmp == 1) { // 체크한 경우
                if(this.inteList.findIndex(el=>el.psAmnScid == targetId) < 0) { // 기존 조회된 서비스는 push 안되게 막음
                    this.inteList.push({
                                            psAmnScid  : targetId,
                                            //psAmnScrnm : cateObj[targetId],
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
                    //pgmnm     : "PFMCOCO51S01", // 서비스에서 처리
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