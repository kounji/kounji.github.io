<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 금융진단 > 금융스타일
* @ 페이지설명 : 나의자산 > 금융진단 > 금융스타일
* @ 파일명     : src/views/page/AS/IP/ASIP1102/ASIP1102.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-19              CS515729              최초작성
* 2021-08-20              CS516033              2차개발
* 2022-09-15              CS529599              PDMY2005 -> PDMY2005, PDMY1001 -> PDMY2001
*************************************************************************/
-->
<template>
<div>
<!-- wrap S -->
	<div id="wrap">
		<div>
			<a href="javascript:void(0);" role="button" class="btn_pop_view" data-popup="full_popup_01">팝업보기</a>
		</div>
	</div>
	<!--// wrap E -->

	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>나의 자산 평가</h1>
			<!-- <a href="javascript:void(0);" role="button" class="btn_back" @click.prevent="close()"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 custom_box_total_price01">
				<div class="circle_raound_silver">
					<span>자산</span>
					<p>
						<strong class="num">{{asetSumAm | numberFilter}}</strong> 
						<span class="unit">원</span>
					</p>
				</div>
				<div class="circle_raound_silver">
					<span>부채</span>
					<p>
						<strong class="num">{{dbtSumAm | numberFilter}}</strong>
                        <!-- <strong class="num">{{dbTtAmNocshBacAm | numberFilter}}</strong> -->
						<span class="unit">원</span>
					</p>
				</div>
			</div>
			<div class="com_inner">
				<div class="tit_sub_top2 custom_box_tit_sub_top2">
					<!-- <strong>칭찬해요</strong>
					<p>
						자산은 늘고, 부채는 줄었어요.
					</p> -->
                    <strong>{{totAsetStsnm}}</strong>
					<p>
						{{totAsetSubTxt}}
					</p>

				<!--
					<strong>좋아졌어요</strong><br>
					부채보다 자산이 더 많이 늘었어요.

					<strong>좋아졌어요</strong><br>
					자산보다 부채가 더 많이 줄었어요. 
				-->
				<!--
					<strong>변화가 없어요</strong><br>
					자산과 부채 차이가 똑같아요.
				-->
				<!--
					<strong>힘을내요</strong><br>
					자산보다 부채가 더 많이 늘었어요

					<strong>힘을내요</strong><br>
					부채보다 자산이 더 많이 줄었어요
				-->
				<!--
					<strong>위험해요</strong><br>
					자산은 줄고, 부채는 늘었어요.
					-->

				</div>
				<!--
					칭찬해요 ~ 위험해요 케이스는 part div에 on 추가
					변화없음 : center div 에 on 추가
				--->
				<div class="my_fin_stat_wrap">
					<div class="top">
						<div class="area">
							<div class="part part01" :class="totAsetStsc === '1' ? 'on' : ''">
								<div class="content">
									<span class="img"></span>
									<p>칭찬해요</p>
								</div>
							</div>
						</div>
						<div class="area">
							<div class="part part02" :class="totAsetStsc === '2' ? 'on' : ''">
								<div class="content">
									<span class="img"></span>
									<p>좋아졌어요</p>
								</div>
							</div>
						</div>
					</div>
					<div class="bottom">
						<div class="area">
							<div class="part part03" :class="totAsetStsc === '4' ? 'on' : ''">
								<div class="content">
									<span class="img"></span>
									<p>힘을내요</p>
								</div>
							</div>
						</div>
						<div class="area">
							<div class="part part04" :class="totAsetStsc === '5' ? 'on' : ''">
								<div class="content">
									<span class="img"></span>
									<p>위험해요</p>
								</div>
							</div>
						</div>
					</div>
                    <!-- <div class="center on"> -->
					<div :class="totAsetStsc === '3' ? 'center on' : 'center'">
						변화가<br/>없어요
					</div>
				</div>
				<div class="com_box_type01 com_box_list custom_box_com_box_list">
					<div class="new_tit_area">
						<div class="tit"><span>자산 변동</span></div>
						<div class="total_price">
							<!-- <div class="raise" role="text">
								<span class="blind">상승</span><em class="num">123,465,000</em><em class="unit">원</em>
                            </div> -->
                            <div :class="raiseYn && Math.abs(astIndSum) != 0 ? (astIndSum > 0 ? 'raise' : 'decrease') : ''">
                                <em class="num">{{Math.abs(astIndSum) | numberFilter}}</em><em class="unit">원</em>
                            </div>
						</div>
					</div>
					<div class="asset_box" v-if="raiseYn && Math.abs(astIndSum) != 0">
						<div class="txt_real_estate">
							<!-- 자산 증가 1위는 <span>포인트</span> 입니다. -->
                            자산 증가 1위는 <span>{{asetTotDscNm}}</span>입니다.
						</div>
					</div>
					<div class="real_estate_list">
						<dl>
							<dt>계좌</dt>
							<dd>
								<span class="com_price" role="text"><!-- 22-10-20 접근성 role 추가 -->
									<!-- <span class="raise" role="text">
										<span class="blind">상승</span>
										<em class="num">1,560,000</em><em class="unit">원</em>
									</span> -->
                                    <!-- <span :class="raiseYn && Math.abs(astAccIndAm) != 0 ? (astAccIndAm > 0 ? 'raise' : 'decrease') : ''"> -->
                                        <!-- <span class="blind">상승</span> -->
                                        <template v-if="raiseYn && Math.abs(astAccIndAm) != 0 && astAccIndAm > 0">
                                            <span class="raise" role="text">
                                                <span class="blind">상승</span>
                                                <em class="num">{{Math.abs(astAccIndAm) | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </template>
                                        <template v-else-if="raiseYn && Math.abs(astAccIndAm) != 0 && astAccIndAm < 0">
                                            <span class="decrease">
                                                <span class="blind">하락</span>
                                                <em class="num">{{Math.abs(astAccIndAm) | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </template>
                                        <template v-else>
                                            <em class="num">0</em><em class="unit">원</em>
                                        </template>
                                    <!-- </span> -->
								</span>
							</dd>
						</dl>
						<dl>
							<dt>투자</dt>
							<dd>
								<span class="com_price" role="text"><!-- 22-10-20 접근성 role 추가 -->
									<!-- <span class="same"> -->
										<!-- <em class="num">300,000</em><em class="unit">원</em> -->
                                        <!-- <span :class="raiseYn && Math.abs(astInvIndAm) != 0 ? (astInvIndAm > 0 ? 'raise' : 'decrease') : ''"> -->
                                            <template v-if="raiseYn && Math.abs(astInvIndAm) != 0 && astInvIndAm > 0">
                                                <span class="raise" role="text">
                                                    <span class="blind">상승</span>
                                                    <em class="num">{{Math.abs(astInvIndAm) | numberFilter}}</em><em class="unit">원</em>
                                                </span>
                                            </template>
                                            <template v-else-if="raiseYn && Math.abs(astInvIndAm) != 0 && astInvIndAm < 0">
                                                <span class="decrease">
                                                    <span class="blind">하락</span>
                                                    <em class="num">{{Math.abs(astInvIndAm) | numberFilter}}</em><em class="unit">원</em>
                                                </span>
                                            </template>
                                            <template v-else>
                                                <em class="num">0</em><em class="unit">원</em>
                                            </template>
                                        <!-- </span> -->
									<!-- </span> -->
								</span>
							</dd>
						</dl>
						<dl>
                            <!-- 기존 선불 항목이 현재 포인트 항목으로 명칭 변경 동일한 항목임. 이문영부장 확인!!!--->
							<dt>포인트</dt>
							<dd>
								<span class="com_price" role="text"><!-- 22-10-20 접근성 role 추가 -->
									<!-- <span class="raise" role="text"> -->
                                    <!-- <span :class="raiseYn && Math.abs(astPayIndAm) != 0 ? (astPayIndAm > 0 ? 'raise' : 'decrease') : ''"> -->
										<!-- <span class="blind">상승</span> -->
										<!-- <em class="num">300,000</em><em class="unit">원</em> -->
                                        <template v-if="raiseYn && Math.abs(astPayIndAm) != 0 && astPayIndAm > 0">
                                            <span class="raise" role="text">
                                                <span class="blind">상승</span>
                                                <em class="num">{{Math.abs(astPayIndAm) | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </template>
                                        <template v-else-if="raiseYn && Math.abs(astPayIndAm) != 0 && astPayIndAm < 0">
                                            <span class="decrease">
                                                <span class="blind">하락</span>
                                                <em class="num">{{Math.abs(astPayIndAm) | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </template>
                                        <template v-else>
                                            <em class="num">0</em><em class="unit">원</em>
                                        </template>
                                        
									<!-- </span> -->
								</span>
							</dd>
						</dl>
					</div>
				</div>
				<div class="com_box_type01 com_box_list custom_box_com_box_list">
					<div class="new_tit_area">
						<div class="tit"><span>부채 변동</span></div>
						<div class="total_price" role="text"><!-- 22-10-20 접근성 role 추가 -->
							<!-- <div class="decrease">
								<span class="blind">하락</span>
								<em class="num">13,753,000</em><em class="unit">원</em></div> -->
                            <!-- <div :class="raiseYn && Math.abs(dbtIndSum) != 0 ? (dbtIndSum > 0 ? 'raise' : 'decrease') : ''"> -->
                                <template v-if="raiseYn && Math.abs(dbtIndSum) != 0 && dbtIndSum > 0">
                                    <span class="raise" role="text">
                                        <span class="blind">상승</span>
                                        <em class="num">{{Math.abs(dbtIndSum) | numberFilter}}</em><em class="unit">원</em>
                                    </span>
                                </template>
                                <template v-else-if="raiseYn && Math.abs(dbtIndSum) != 0 && dbtIndSum < 0">
                                    <span class="decrease">
                                        <span class="blind">하락</span>
                                        <em class="num">{{Math.abs(dbtIndSum) | numberFilter}}</em><em class="unit">원</em>
                                    </span>
                                </template>
                                <template v-else>
                                    <em class="num">0</em><em class="unit">원</em>
                                </template>
                            <!-- </div> -->
						</div>
					</div>
					<div class="real_estate_list">
						<dl>
							<dt>대출</dt>
							<dd>
								<span class="com_price" role="text"><!-- 22-10-20 접근성 role 추가 -->
									<!-- <span class="raise" role="text">
										<span class="blind">상승</span>
										<em class="num">1,560,000</em><em class="unit">원</em>
									</span> -->
                                    <!-- <span :class="raiseYn && Math.abs(dbtLonIndAm) != 0 ? (dbtLonIndAm > 0 ? 'raise' : 'decrease') : ''"> -->
                                        <template v-if="raiseYn && Math.abs(dbtLonIndAm) != 0 && dbtLonIndAm > 0">
                                            <span class="raise" role="text">
                                                <span class="blind">상승</span>
                                                <em class="num">{{Math.abs(dbtLonIndAm) | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </template>
                                        <template v-else-if="raiseYn && Math.abs(dbtLonIndAm) != 0 && dbtIndSum < 0">
                                            <span class="decrease">
                                                <span class="blind">하락</span>
                                                <em class="num">{{Math.abs(dbtLonIndAm) | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </template>
                                        <template v-else>
                                            <em class="num">0</em><em class="unit">원</em>
                                        </template>
                                    <!-- </span> -->
								</span>
							</dd>
						</dl>
						<dl>
							<dt>할부금융</dt>
							<dd>
								<span class="com_price" role="text"><!-- 22-10-20 접근성 role 추가 -->
									<!-- <span class="decrease">
										<em class="num">300,000</em><em class="unit">원</em>
									</span> -->
                                    <!-- <span :class="raiseYn && Math.abs(dbtEtcIndAm) != 0 ? (dbtEtcIndAm > 0 ? 'raise' : 'decrease') : ''"> -->
                                        <template v-if="raiseYn && Math.abs(dbtEtcIndAm) != 0 && dbtEtcIndAm > 0">
                                            <span class="raise" role="text">
                                                <span class="blind">상승</span>
                                                <em class="num">{{Math.abs(dbtEtcIndAm) | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </template>
                                        <template v-else-if="raiseYn && Math.abs(dbtEtcIndAm) != 0 && dbtEtcIndAm < 0">
                                            <span class="decrease">
                                                <span class="blind">하락</span>
                                                <em class="num">{{Math.abs(dbtEtcIndAm) | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </template>
                                        <template v-else>
                                            <em class="num">0</em><em class="unit">원</em>
                                        </template>
                                    <!-- </span> -->
								</span>
							</dd>
						</dl>
						<dl>
							<dt>자동차할부</dt>
							<dd>
								<span class="com_price" role="text"><!-- 22-10-20 접근성 role 추가 -->
									<!-- <span class="raise" role="text">
										<span class="blind">상승</span>
										<em class="num">200,000</em><em class="unit">원</em>
									</span> -->
                                    <!-- <span :class="raiseYn && Math.abs(dbtCarIndAm) != 0 ? (dbtCarIndAm > 0 ? 'raise' : 'decrease') : ''"> -->
                                        <template v-if="raiseYn && Math.abs(dbtCarIndAm) != 0 && dbtCarIndAm > 0">
                                            <span class="raise" role="text">
                                                <span class="blind">상승</span>
                                                <em class="num">{{Math.abs(dbtCarIndAm) | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </template>
                                        <template v-else-if="raiseYn && Math.abs(dbtCarIndAm) != 0 && dbtCarIndAm < 0">
                                            <span class="decrease">
                                                <span class="blind">하락</span>
                                                <em class="num">{{Math.abs(dbtCarIndAm) | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </template>
                                        <template v-else>
                                            <em class="num">0</em><em class="unit">원</em>
                                        </template>
                                        
                                    <!-- </span> -->
								</span>
							</dd>
						</dl>
						<dl>
							<dt>리스</dt>
							<dd>
								<span class="com_price" role="text"><!-- 22-10-20 접근성 role 추가 -->
									<!-- <span class="raise" role="text">
										<span class="blind">상승</span>
										<em class="num">200,000</em><em class="unit">원</em>
									</span> -->
                                    <!-- <span :class="raiseYn && Math.abs(dbtLesIndAm) != 0 ? (dbtLesIndAm > 0 ? 'raise' : 'decrease') : ''"> -->
                                        <template v-if="raiseYn && Math.abs(dbtLesIndAm) != 0 && dbtLesIndAm > 0">
                                            <span class="raise" role="text">
                                                <span class="blind">상승</span>
                                                <em class="num">{{Math.abs(dbtLesIndAm) | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </template>
                                        <template v-else-if="raiseYn && Math.abs(dbtLesIndAm) != 0 && dbtLesIndAm < 0">
                                            <span class="decrease">
                                                <span class="blind">하락</span>
                                                <em class="num">{{Math.abs(dbtLesIndAm) | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </template>
                                        <template v-else>
                                            <em class="num">0</em><em class="unit">원</em>
                                        </template>
                                        
                                    <!-- </span> -->
								</span>
							</dd>
						</dl>
					</div>
				</div>
			</div>

		</div>
		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</div>
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import commonService from '@/service/commonService'

    import PDMY2005 from '@/views/page/PD/MY/PDMY2005/PDMY2005'

    import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

    export default {
        name : "ASIP1002",
        data: () => {
            return {
                cusnm         : "",   // 로그인 사용자 이름
                selectedYm    : "",   // 조회년월
                tabPgflag     : "",   // 1:나의 금융 평가, 2:남들과 비교
                raiseYn       : true, // 증감표시여부

                // 나의 금융 평가
                totAsetStsc   : "",   // 총자산상태코드
                totAsetStsnm  : "",   // 총자산상태명
                totAsetSubc   : "",   // 총자산서브코드
                totAsetSubTxt : "",   // 총자산서브내용
                asetTotDsc    : "",   // 자산집계구분코드
                asetTotDscNm  : "",   // 자산집계구분명
                astIndSum     : 0,    // 자산증감합계
                astAccIndAm   : 0,    // 계좌증감액
                astInvIndAm   : 0,    // 투자증감액
                astPayIndAm   : 0,    // 페이머니증감액
                astRltIndAm   : 0,    // 부동산증감액
                dbtIndSum     : 0,    // 부채증감합계
                dbtLonIndAm   : 0,    // 대출증감액
                dbtEtcIndAm   : 0,    // 할부증감액
                dbtCarIndAm   : 0,    // 자동차할부증감액
                dbtLesIndAm   : 0,    // 금융리스증감액
                mt3DpzEntYn   : "",   // 3개월수신가입여부

                // 자산_부채 관련 추가
                // fnasTtAm    : 0,	//금융자산합계
                // acBacAm     : 0,	//계좌잔액금액
                // acCnt       : 0,	//계좌건수
                // ivBacAm     : 0,	//투자잔액금액
                // ivCnt       : 0,	//투자건수
                // paymAm      : 0,    //페이머니금액
                // paymCnt     : 0,    //페이머니건수
                // isrCnt      : 0,	//보험건수

                // dbTtAmNocshBacAm: 0,//부채합계(현금제외)
                // dbTtAm      : 0,	//부채합계
                // lnCnt       : 0,	//대출건수
                // lnBacAm     : 0,	//대출잔액금액
                // carItCnt    : 0,    //자동차할부건수 
                // carItAm     : 0,    //자동차할부합계
                // cdBacAm     : 0,	//카드잔액금액
                // cdCnt       : 0,	//카드건수
                // istBacAm    : 0,	//할부잔액금액
                // istCnt      : 0,	//할부건수
                // fncLesItCnt : 0,    //금융리스건수
                // fncLesItAm  : 0,    //금융리스합계
                // cshBacAm    : 0,	//현금잔액금액(현금차용)
                // cshCnt      : 0,	//현금건수(현금차용)


                // 남들과 비교
                sexDsc               : "", // 성별구분코드
                sexNm                : "", // 성별구분명
                peerGrpAgDsc         : "", // 피어그룹연령구분코드
                peerGrpAgnm          : "", // 피어그룹연령구분명
                peerGrpAsetSclDsc    : "", // 피어그룹자산규모구분코드
                peerGrpAsetSclnm     : "", // 피어그룹자산규모구분명
                toroAvgTotAsetAm     : 0,  // 또래평균총자산금액
                bmmTotMyAsetAm       : 0,  // 전월나의총자산금액
                sgrtPryOrdAsetDsc    : "", // 비중률우선순위자산코드
                sgrtPryOrdAsetNm     : "", // 비중률우선순위자산명
                sgrtPryOrdAsetSclDsc : "", // 비중률우선순위자산구간코드
                sgrtPryOrdAsetSclNm  : "", // 비중률우선순위자산구간명
                toroAvgLnAm          : 0,  // 또래평균대출금액
                bmmMyLnAm            : 0,  // 전월나의대출금액
                toroAsetCmprListCnt  : 0,  // 또래자산비교목록건수
                toroAsetCmprList     : [], // 또래자산비교목록
                toroAsetBublhListCnt : 0,  // 또래자산버블목록건수
                toroAsetBublhList    : [], // 또래자산버블목록

                peerGrpAsetCmprTxt   : "", // 피어그룹자산비교문구
                peerGrpLnCmprTxt     : "", // 피어그룹대출비교문구
                toroAsetAmBarH       : 0,
                myAsetAmBarH         : 0,
                toroLnAmBarH         : 0,
                myLnAmBarH           : 0,
                asetBublhList        : [],

                asetSumAm           : 0,    // 자산합계
                // newAsetSumAm        : 0,    // 자산합계
                dbtSumAm            : 0,    // 부채합계
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                this.tabPgflag  = '1';
                this.cusnm      = this.getUserInfo("cusnm");
                this.selectedYm = param.selectedYm;

                this.getData();
            },
            getData() {
                // if (this.tabPgflag == "1") {
                //     this.fn_getTab1Data(); // 나의 금융 평가
                // } else {
                //     this.fn_getTab2Data(); // 남들과 비교
                // }
                
                // kimhc_20221031 나의 금융 평가만 
                this.fn_getTab1Data(); // 나의 금융 평가
            },
            fn_getTab1Data() {
                // 나의 금융 평가 조회
                const config = {
                    url: '/as/ip/02ra1', // /as/ip/02ra1 IF-MOB-PFM-ASA18 PFMASIP02RA1  PFMASIP02RA1
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "basYm"     : this.selectedYm
                    }
                }

                apiService.call(config).then((response) =>{


                    console.log("======= 나의 금융 평가 조회 response ======= ", response)

                    this.totAsetStsc  = response.totAsetStsc;
                    this.totAsetStsnm = response.totAsetStsnm;
                    this.totAsetSubc  = response.totAsetSubc;
                    this.asetTotDsc   = response.asetTotDsc;
                    // this.asetTotDscNm = response.asetTotDscNm;
                    this.astIndSum    = response.astIndSum   || 0;
                    this.astAccIndAm  = response.astAccIndAm || 0;
                    this.astInvIndAm  = response.astInvIndAm || 0;
                    this.astPayIndAm  = response.astPayIndAm || 0;
                    this.astRltIndAm  = response.astRltIndAm || 0;
                    this.dbtIndSum    = response.dbtIndSum   || 0;
                    this.dbtLonIndAm  = response.dbtLonIndAm || 0;
                    this.dbtEtcIndAm  = response.dbtEtcIndAm || 0;
                    this.dbtCarIndAm  = response.dbtCarIndAm || 0;
                    this.dbtLesIndAm  = response.dbtLesIndAm || 0;
                    this.mt3DpzEntYn  = response.mt3DpzEntYn;

                    /* 금액 있는 경우 증감표시 노출하기로 함(2021.11.04)
                    // 최초 가입자 및 3개월 미만 사용자는 3개월(전전월) 이력이 누적되지 않았다면 증감표시 미노출
                    if (this.mt3DpzEntYn != "1") {
                        this.raiseYn = false;
                    }
                    */
                    this.asetSumAm = response.asetSumAm || 0   // 자산합계
                    // this.newAsetSumAm = response.newAsetSumAm || 0,   // 자산합계
                    this.dbtSumAm = response.dbtSumAm || 0     // 부채합계

                    if(this.asetTotDsc == '09') {
                        this.asetTotDscNm = '포인트'
                    } else if(this.asetTotDsc == '06') {
                        this.asetTotDscNm = '투자'
                    } else {
                        this.asetTotDscNm = '계좌'
                    }

                    this.fn_setTotAsetSts(); // 총자산상태
                    this.fn_setTotAsetSub(); // 총자산서브내용

                    // this.fn_fncAsetTotAm(); // 자산 부채 합계 
                })
            },
            fn_setTotAsetSts() {
                let totAsetStsList = [
                    {cd:'1', text:'칭찬해요'},
                    {cd:'2', text:'좋아졌어요'},
                    {cd:'3', text:'변화가 없어요'},
                    {cd:'4', text:'힘을내요'},
                    {cd:'5', text:'위험해요'}
                ];

                let totAsetStsIdx = this.totAsetStsc ? totAsetStsList.findIndex(x => x.cd === this.totAsetStsc) : -1;
                // this.totAsetStsnm = totAsetStsIdx && totAsetStsIdx > -1 ? totAsetStsList[totAsetStsIdx].text : '';

                this.totAsetStsnm =  Number(totAsetStsIdx && totAsetStsIdx) > -1 ? totAsetStsList[totAsetStsIdx].text : ''; // kimhc_20221031 숫자형식으로 변경 하여 비교
                
            },
            fn_fncAsetTotAm(){
                ///////////////////////////////////
                // 계좌목록 조회 
                const config = {
                    url: '/as/as/00ra1',
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config).then(response =>{
                    this.respInfo = response

                    this.rcnInqDtm  = this.respInfo.rcnInqDtm              //최근조회일시
                    this.asetTotAm  = Math.floor(this.respInfo.asetTotAm)  //자산합계

                    /// 금융자산
                    this.fnasTtAm   = this.respInfo.fnasTtAm            //금융자산합계
                    this.acBacAm    = this.respInfo.acBacAm             //계좌잔액금액
                    this.acCnt      = this.respInfo.acCnt               //계좌건수
                    this.ivBacAm    = this.respInfo.ivBacAm             //투자잔액금액
                    this.ivCnt      = this.respInfo.ivCnt               //투자건수
                    this.paymAm     = this.respInfo.paymAm              //페이머니금액
                    this.paymCnt    = this.respInfo.paymCnt             //페이머니건수
                    this.isrCnt     = this.respInfo.isrCnt              //보험건수

                    /// 부채
                    this.dbTtAm      = this.respInfo.dbTtAm             //부채합계
                    this.lnCnt       = this.respInfo.lnCnt              //대출건수
                    this.lnBacAm     = this.respInfo.lnBacAm            //대출잔액금액
                    this.carItCnt    = this.respInfo.carItCnt           //자동차할부건수 
                    this.carItAm     = this.respInfo.carItAm            //자동차할부합계
                    this.cdCnt       = this.respInfo.cdCnt              //카드건수
                    this.cdBacAm     = this.respInfo.cdBacAm            //카드잔액금액
                    this.istCnt      = this.respInfo.istCnt             //할부건수
                    this.istBacAm    = this.respInfo.istBacAm           //할부잔액금액
                    this.fncLesItCnt = this.respInfo.fncLesItCnt        //금융리스건수
                    this.fncLesItAm  = this.respInfo.fncLesItAm         //금융리스합계
                    this.cshCnt      = this.respInfo.cshCnt             //현금건수(현금차용)
                    this.cshBacAm    = this.respInfo.cshBacAm           //현금잔액금액(현금차용)

                    this.dbTtAmNocshBacAm = this.dbTtAm - this.cshBacAm // 현금잔액금액 빼기

                    // //현금(원화+외화)
                    // this.cshTtAm     = this.respInfo.cshTtAm            //현금합계(원화+외화)
                    // this.krwBacAm    = this.respInfo.krwBacAm           //원화잔액금액
                    // this.krwCnt      = this.respInfo.krwCnt             //원화건수
                    // this.fcBacAm     = this.respInfo.fcBacAm            //외화잔액금액
                    // this.fcCnt       = this.respInfo.fcCnt              //외화건수

                    // //기타
                    // this.othrAstCnt  = this.respInfo.othrAstCnt         //기타자산건수
                    // this.othrAstAm   = this.respInfo.othrAstAm          //기타자산합계

                    // //금
                    // this.goldAsetAm   = this.respInfo.goldAsetAm        //골드자산금액
                    
                    // //부동산
                    // this.rlestListCnt = this.respInfo.rlestListCnt      //부동산목록건수
                    // this.rlestTtAm    = this.respInfo.rlestTtAm         //부동산총금액
                    // this.rlestList    = this.respInfo.rlestList || []   //부동산리스트

                    // //자동차
                    // this.carListCnt   = this.respInfo.carListCnt        //자동차목록건수
                    // this.carTtAm      = this.respInfo.carTtAm           //자동차합계
                    // this.carList      = this.respInfo.carList || []     //자동차리스트

                    console.log('12345: ', this.carList)

                    /*
                    let plusRlestAm   = 0
                    for(let i=0; i<this.rlestList.length; i++) {
                        if(this.rlestList[i].rlestTngDsc == '6' || this.rlestList[i].rlestTngDsc == '7' || this.rlestList[i].rlestTngDsc == '9') {
                            plusRlestAm = Number(plusRlestAm) + Number(this.rlestList[i].rlestTrPr);
                        }
                    }
                    //console.log("토지 상가 기타 금액 합산 = " + plusRlestAm)
                    this.rlestTtAm    = Number(this.respInfo.rlestTtAm) + (Number(plusRlestAm)*10000)     //부동산총금액
                    this.asetTotAm    = Math.floor(Number(this.respInfo.asetTotAm) + (Number(plusRlestAm)*10000))  //자산합계
                    */

                    //총 금액 변경 이후 금액 Animate 처리 함수 호출
                    // amountCountAnimate("asetTotAm", this.asetTotAm)
                })
            },	
            fn_setTotAsetSub() {
                let totAsetSubList = [
                    {cd:'1', text:'자산은 늘고, 부채는 줄었어요.'},
                    {cd:'2', text:'부채보다 자산이 더 많이 늘었어요.'},
                    {cd:'3', text:'자산보다 부채가 더 많이 줄었어요.'},
                    {cd:'4', text:'자산과 부채 차이가 똑같아요.'},
                    {cd:'5', text:'자산과 부채 차이가 똑같아요.'},
                    {cd:'6', text:'자산보다 부채가 더 많이 늘었어요.'},
                    {cd:'7', text:'부채보다 자산이 더 많이 줄었어요.'},
                    {cd:'8', text:'자산은 줄고, 부채는 늘었어요.'}
                ];

                let totAsetSubIdx  = this.totAsetSubc ? totAsetSubList.findIndex(x => x.cd === this.totAsetSubc) : -1;
                // this.totAsetSubTxt = totAsetSubIdx && totAsetSubIdx > -1 ?totAsetSubList[totAsetSubIdx].text : ''; 
                this.totAsetSubTxt = Number(totAsetSubIdx && totAsetSubIdx) > -1 ?totAsetSubList[totAsetSubIdx].text : ''; // kimhc_20221031 숫자형식으로 변경 하여 비교

            },
            fn_getTab2Data() {
                this.asetBublhList = [];

                // 남들과 비교 조회
                const config = {
                    url: '/as/ss/01r01',
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "basYm"     : this.selectedYm
                    }
                }

                apiService.call(config).then((response) => {
                    this.sexDsc               = response.sexDsc;
                    this.sexNm                = response.sexNm;
                    this.peerGrpAgDsc         = response.peerGrpAgDsc;
                    this.peerGrpAgnm          = response.peerGrpAgnm;
                    this.peerGrpAsetSclDsc    = response.peerGrpAsetSclDsc;
                    this.peerGrpAsetSclnm     = response.peerGrpAsetSclnm;
                    this.toroAvgTotAsetAm     = response.toroAvgTotAsetAm     || 0;
                    this.bmmTotMyAsetAm       = response.bmmTotMyAsetAm       || 0;
                    this.sgrtPryOrdAsetDsc    = response.sgrtPryOrdAsetDsc;
                    this.sgrtPryOrdAsetNm     = response.sgrtPryOrdAsetNm;
                    this.sgrtPryOrdAsetSclDsc = response.sgrtPryOrdAsetSclDsc;
                    this.sgrtPryOrdAsetSclNm  = response.sgrtPryOrdAsetSclNm;
                    this.toroAvgLnAm          = response.toroAvgLnAm          || 0;
                    this.bmmMyLnAm            = response.bmmMyLnAm            || 0;
                    this.toroAsetCmprListCnt  = response.toroAsetCmprListCnt  || 0;
                    this.toroAsetCmprList     = response.toroAsetCmprList;
                    this.toroAsetBublhListCnt = response.toroAsetBublhListCnt || 0;
                    this.toroAsetBublhList    = response.toroAsetBublhList;

                    this.fn_setPeerGrpAsetCmpr(); // 자산비교
                    this.fn_setPeerGrpLnCmpr();   // 대출비교
                    this.fn_setAsetBublhList();   // 버블차트
                })
            },
            fn_setPeerGrpAsetCmpr() {
                /*
                 * 속해 있는 자산 그룹(연령대/성별)의 평균 보유 자산 - 전월 내 보유자산의 비교 메시지 노출
                 * + 인 경우 “금융자산 보유가 많으시네요.”
                 * 0 인 경우 “금융자산 보유가 동일하네요.”
                 * - 인 경우 “금융자산 보유가 적으시네요.”
                 * ※ 자산 비교 그래프에서 자산구간 구분없음, 전체 합산금액
                 */
                if (this.toroAvgTotAsetAm < this.bmmTotMyAsetAm) {
                    this.peerGrpAsetCmprTxt = "금융자산 보유가 많으시네요.";
                } else if (this.toroAvgTotAsetAm > this.bmmTotMyAsetAm) {
                    this.peerGrpAsetCmprTxt = "금융자산 보유가 적으시네요.";
                } else {
                    this.peerGrpAsetCmprTxt = "금융자산 보유가 동일하네요.";
                }

                // 지난달 자산 비교 그래프
                let bmmAm    = this.bmmTotMyAsetAm   < 0 ? 0 : this.bmmTotMyAsetAm;
                let toroAm   = this.toroAvgTotAsetAm < 0 ? 0 : this.toroAvgTotAsetAm;
                let totAm    = bmmAm + toroAm;
                let myBarH   = totAm == 0 ? 0 : bmmAm  / totAm * 100;
                let toroBarH = totAm == 0 ? 0 : toroAm / totAm * 100;
                
                this.myAsetAmBarH   = (myBarH   < 2 ? 2 : (myBarH   > 100 ? 100 : myBarH  ));
                this.toroAsetAmBarH = (toroBarH < 2 ? 2 : (toroBarH > 100 ? 100 : toroBarH));
            },
            fn_setPeerGrpLnCmpr() {
                /*
                 * 속해 있는 자산 그룹의 평균 보유 대출 – 전월 내 대출 비교 메시지 노출
                 * + 인 경우 “대출 보유가 많으시네요.”
                 * 0 인 경우 “대출 보유가 동일하네요.”
                 * - 인 경우 “대출 보유가 적으시네요.”
                 */
                if (this.toroAvgLnAm < this.bmmMyLnAm) {
                    this.peerGrpLnCmprTxt = "대출 보유가 많으시네요.";
                } else if (this.toroAvgLnAm > this.bmmMyLnAm) {
                    this.peerGrpLnCmprTxt = "대출 보유가 적으시네요.";
                } else {
                    this.peerGrpLnCmprTxt = "대출 보유가 동일하네요.";
                }

                // 지난달 대출 비교 그래프
                let totAm    = this.bmmMyLnAm + this.toroAvgLnAm;
                let myBarH   = totAm == 0 ? 0 : this.bmmMyLnAm   / totAm * 100;
                let toroBarH = totAm == 0 ? 0 : this.toroAvgLnAm / totAm * 100;

                this.myLnAmBarH   = (myBarH   < 2 ? 2 : (myBarH   > 100 ? 100 : myBarH  ));
                this.toroLnAmBarH = (toroBarH < 2 ? 2 : (toroBarH > 100 ? 100 : toroBarH));
            },
            fn_setAsetBublhList() {
                for (let i=1; i<=7; i++) {
                    let sclList = this.toroAsetBublhList.filter(d => Number(d.peerGrpAsetSclDsc) === i);
                    this.fn_setChartItem(sclList);
                }

                // 버블차트
                this.$nextTick(()=>{
                    this.getChart();
                })
            },
            fn_setChartItem(list) {
                if (list.length == 0) { return; }

                let asetDscA01 = list.filter(d => d.peerGrpAsetDsc === 'A01'); // 입출금
                let asetDscA02 = list.filter(d => d.peerGrpAsetDsc === 'A02'); // 예금
                let asetDscA03 = list.filter(d => d.peerGrpAsetDsc === 'A03'); // 적금
                let asetDscA04 = list.filter(d => d.peerGrpAsetDsc === 'A04'); // 외화
                let asetDscA05 = list.filter(d => d.peerGrpAsetDsc === 'A05'); // 청약

                this.asetBublhList.push({
                    "AF_SclDsc" : asetDscA01.length > 0 ? asetDscA01[0].peerGrpAsetSclDsc2 : '', // 피어그룹자산규모구분코드2
                    "AF_CusRto" : asetDscA01.length > 0 ? asetDscA01[0].cuscnRto           : '', // 고객비율
                    "AF_Cuscn"  : asetDscA01.length > 0 ? asetDscA01[0].cuscn              : '', // 고객수
                    "AF_Sclnm"  : asetDscA01.length > 0 ? asetDscA01[0].peerGrpAsetSclnm   : '', // 피어그룹자산규모구분명

                    "EA_SclDsc" : asetDscA02.length > 0 ? asetDscA02[0].peerGrpAsetSclDsc2 : '',
                    "EA_CusRto" : asetDscA02.length > 0 ? asetDscA02[0].cuscnRto           : '',
                    "EA_Cuscn"  : asetDscA02.length > 0 ? asetDscA02[0].cuscn              : '',
                    "EA_Sclnm"  : asetDscA02.length > 0 ? asetDscA02[0].peerGrpAsetSclnm   : '',

                    "SA_SclDsc" : asetDscA03.length > 0 ? asetDscA03[0].peerGrpAsetSclDsc2 : '',
                    "SA_CusRto" : asetDscA03.length > 0 ? asetDscA03[0].cuscnRto           : '',
                    "SA_Cuscn"  : asetDscA03.length > 0 ? asetDscA03[0].cuscn              : '',
                    "SA_Sclnm"  : asetDscA03.length > 0 ? asetDscA03[0].peerGrpAsetSclnm   : '',

                    "ME_SclDsc" : asetDscA04.length > 0 ? asetDscA04[0].peerGrpAsetSclDsc2 : '',
                    "ME_CusRto" : asetDscA04.length > 0 ? asetDscA04[0].cuscnRto           : '',
                    "ME_Cuscn"  : asetDscA04.length > 0 ? asetDscA04[0].cuscn              : '',
                    "ME_Sclnm"  : asetDscA04.length > 0 ? asetDscA04[0].peerGrpAsetSclnm   : '',

                    "EU_SclDsc" : asetDscA05.length > 0 ? asetDscA05[0].peerGrpAsetSclDsc2 : '',
                    "EU_CusRto" : asetDscA05.length > 0 ? asetDscA05[0].cuscnRto           : '',
                    "EU_Cuscn"  : asetDscA05.length > 0 ? asetDscA05[0].cuscn              : '',
                    "EU_Sclnm"  : asetDscA05.length > 0 ? asetDscA05[0].peerGrpAsetSclnm   : ''
                });
            },
            getChart() {
                // -----------------------차트 설정 시작-----------------------
                // rMateChart 를 생성합니다.
                // 파라메터 (순서대로)
                //  1. 차트의 id ( 임의로 지정하십시오. )
                //  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
                //  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
                //  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
                //  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
                rMateChartH5.create("chartASIP02", "chartHolderASIP02", "useContextMenu=false", "100%", "350rem")

                // 스트링 형식으로 레이아웃 정의.
                var layoutStr =
                    '<rMateChart backgroundColor="#FFFFFF" paddingTop="40" borderStyle="none">'
                        +'<Options>'
                            +'<Caption text="Life Expectancy vs. GDP per Capita" />'
                            +'<Legend useVisibleCheck="true"/>'
                        +'</Options>'
                        +'<NumberFormatter id="numFmt" precision="0" useThousandsSeparator="true"/>'
                        +'<Bubble3DChart showDataTips="true" minRadius="5" maxRadius="50" dataTipJsFunction="rMateFunction.ASIP1102DataTipFunc" >'
                            +'<verticalAxis>'
                                +'<LinearAxis id="vAxis" minimum="-10" maximum="90" tickCount="6" title="(단위 : %)"/>' // tickCount="6"
                            +'</verticalAxis>'
                            +'<verticalAxisRenderers>'
                                +'<Axis2DRenderer axis="{vAxis}" axisTitleStyleName="title" showLine="false" />'
                            +'</verticalAxisRenderers>'
                            +'<horizontalAxis>'
                                +'<LinearAxis id="hAxis" minimum="0" maximum="12000" labelJsFunction="rMateFunction.ASIP1102AxisLabelFunc" title="(단위 : 만원)"/>'
                            +'</horizontalAxis>'
                            +'<horizontalAxisRenderers>'
                                +'<Axis2DRenderer axis="{hAxis}" axisTitleStyleName="title" showLine="false" />'
                            +'</horizontalAxisRenderers>'
                            +'<series>'
                                +'<Bubble3DSeries id="AF" xField="AF_SclDsc" yField="AF_CusRto" radiusField="AF_Cuscn" displayName="입출금">'
                                    +'<fill>'
                                        +'<SolidColor color="#23a0a5" alpha="0.5"/>'
                                    +'</fill>'
                                    +'<showDataEffect>'
                                        +'<SeriesInterpolate/>'
                                    +'</showDataEffect>'
                                +'</Bubble3DSeries>'
                                +'<Bubble3DSeries id="EA" xField="EA_SclDsc" yField="EA_CusRto" radiusField="EA_Cuscn" displayName="예금">'
                                    +'<fill>'
                                        +'<SolidColor color="#fa7288" alpha="0.5"/>'
                                    +'</fill>'
                                    +'<showDataEffect>'
                                        +'<SeriesInterpolate/>'
                                    +'</showDataEffect>'
                                +'</Bubble3DSeries>'
                                +'<Bubble3DSeries id="SA" xField="SA_SclDsc" yField="SA_CusRto" radiusField="SA_Cuscn" displayName="적금">'
                                    +'<fill>'
                                        +'<SolidColor color="#84b0fc" alpha="0.5"/>'
                                    +'</fill>'
                                    +'<showDataEffect>'
                                        +'<SeriesInterpolate/>'
                                    +'</showDataEffect>'
                                +'</Bubble3DSeries>'
                                +'<Bubble3DSeries id="ME" xField="ME_SclDsc" yField="ME_CusRto" radiusField="ME_Cuscn" displayName="외화">'
                                        +'<fill>'
                                        +'<SolidColor color="#fdbb68" alpha="0.5"/>'
                                    +'</fill>'
                                    +'<showDataEffect>'
                                        +'<SeriesInterpolate/>'
                                    +'</showDataEffect>'
                                +'</Bubble3DSeries>'
                                +'<Bubble3DSeries id="EU" xField="EU_SclDsc" yField="EU_CusRto" radiusField="EU_Cuscn" displayName="청약">'
                                    +'<fill>'
                                        +'<SolidColor color="#57c9ae" alpha="0.5"/>'
                                    +'</fill>'
                                    +'<showDataEffect>'
                                        +'<SeriesInterpolate/>'
                                    +'</showDataEffect>'
                                +'</Bubble3DSeries>'
                            +'</series>'
                            +'<backgroundElements>'
                                +'<GridLines horizontalShowOrigin="false" verticalShowOrigin="false"/>'
                            +'</backgroundElements>'
                            +'<annotationElements>'
                                +'<CrossRangeZoomer zoomType="both" verticalLabelFormatter="{numFmt}" horizontalLabelFormatter="{numFmt}"/>'
                            +'</annotationElements>'
                        +'</Bubble3DChart>'
                    +'</rMateChart>';

                // 차트 데이터 // 범례+자산구간+고객비율(소수점절삭) + 고객수 입력순서
                var chartData = this.asetBublhList;

                // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
                //
                // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
                // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
                //
                // 아래 내용은
                // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
                // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
                rMateChartH5.calls("chartASIP02", {
                    "setLayout" : layoutStr,
                    "setData"   : chartData
                });
            },
            fn_setTabPgflag(gbn) {
                this.tabPgflag = gbn;
                this.getData();
            },
            fn_openPDPD1101() {
                const config = {
                    name   : "PDPD1001" // 상품추천
                }

                commonService.movePage(config);

                this.close();
            },
            fn_openExpensePop() {
                const config = {
                    component : PDMY2005
                };

                modalService.openPopup(config).then(response => {
                    // 배너이미지를 통하여 목표등록을 하였을 경우
                    // 나의목표로 이동
                    if(response == 'reSelect') {

                        this.closeAll()

                        const menu = {
                            name: 'PDMY2001',
                            params : {}
                        }
                        commonService.movePage(menu)
                    }
                });
            }
        }
    }
</script>