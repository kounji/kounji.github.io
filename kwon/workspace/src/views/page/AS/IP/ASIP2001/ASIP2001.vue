<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 금융진단 > 자산진단
* @ 페이지설명 : 나의자산 > 금융진단 > 자산진단 메인
* @ 파일명     : src/views/page/AS/IP/ASIP2001/ASIP2001.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-09-15
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-15              CS529599              최초작성(ASIP1101 -> ASIP2001 고도화 개발)
*************************************************************************/
-->
<template>
    <page class="content-view mydata2023 subMainWrap">
        <!-- S :: 금융진단 카테고리 -->
        <as-category-v2 type="IP"></as-category-v2>
        <!-- E :: 금융진단 카테고리 -->

      <div id="content">
			<div class="com_inner">
				<div class="com_box_type01">
					<ul class="layoutBox wAuto rBtn">
						<li class="left">
							<strong class="titH3" v-if="asetStsc=='NEGATIVE'">자산이 줄었어요</strong>
                            <strong class="titH3" v-else-if="asetStsc=='POSITIVE'">자산이 늘었어요</strong>
                            <strong class="titH3" v-else>변화가 없어요</strong>
							<div class="custom_tooltip">
								<div class="com_tooltip_type02 com_tooltip_type03">
									<a href="javascript:void(0)" class="com_btn_info" role="button">
										<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
									</a>
									<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
										<div>
											<p>자산진단 결과는 연결한 지난달 말일 자산과 현재 자산을 비교 분석한 결과예요.</p>
											<a href="javascript:void(0)" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> 
									</div>
								</div>
							</div>
						</li>
						<li class="right">
							<button class="btnLink" @click='fn_ASIP2002TAB()'><span class="blind">유형별 자산 이동</span></button>
						</li>
					</ul>
					<ul class="layoutBox half assetRateGrp"><!-- 1004 접근성 반영 -->
						<li class="left">
							<!-- 자산이 증가한 경우 -->
							<div class="grpBox assetPlus" v-if="asetStsc == 'POSITIVE'">
								<span class="tip">+{{acDeltaBac | numberFilter}}원</span>
							</div>
                            <!-- 자산이 하락한 경우 -->
							<div class="grpBox assetMinus" v-else-if="asetStsc == 'NEGATIVE'">
								<span class="tip">-{{Math.abs(acDeltaBac) | numberFilter}}원</span>
							</div>
                            <!-- 자산이 유지한 경우 -->
							<div class="grpBox assetSame" v-else>
								<span class="tip">{{Math.abs(acDeltaBac) | numberFilter}}원</span>
							</div>
						</li>
						<li class="right">
							<span class="rate">상위{{fnasOrdStno}}%</span>
							<span class="txt">금융자산</span>
							<span class="amt">{{acBac | numberFilter}}원</span>
						</li>
					</ul>
					<hr>
					<ul class="layoutBox wAuto rBtn">
						<li class="left">
							<div class="assetAnalyTxt">
								<p class="Txt">나의 금융자산 유형</p>
								<strong class="com_txt_sub01">{{prdStyCdNm}}</strong>
								<span class="potTxt">{{finStyCdNm}}형</span>
							</div>
						</li>
						<li class="right">
							<button class="btnLink" @click='fn_ASIP2010()'><span class="blind">금융스타일 진단 이동</span></button>
						</li>
					</ul>
				</div>
				<div class="com_box_type01" v-if ="hlthIsrEntYn == 'Y'">
					<ul class="layoutBox wAuto rBtn">
                        <li class="left">
                            <strong class="titH3">나의 재무 진단</strong>
                            <div class="custom_tooltip">
                                <div class="com_tooltip_type02 com_tooltip_type03">
                                    <a href="javascript:void(0)" class="com_btn_info" role="button">
                                        <em class="com_icon_info"><span class="blind">도움말 툴팁열기</span></em>
                                    </a>
                                    <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                        <div>
                                            <!-- 09/12 jlee 문구 수정 -->
                                            <p>가계재무 미래준비 및 부채관리 상태를 점검해 재무 전반 관리의 적정 여부를 확인할 수 있어요.</p>
                                            <p>가계재무, 미래준비 상태는 2개, 부채관리 상태는 3개의 세부 지표 충족 여부에 따라 적정 상태를 결정해요.</p>
											<!--// 09/12 jlee 문구 수정 -->
                                            <a href="javascript:void(0)" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="right">
                            <button class="btnLink" @click='fn_ASIP2005TAB(0)'><span class="blind">지표별 재무진단 이동</span></button>
                        </li>
                    </ul>
                    <p class="com_txt_sub inPotTxt" v-if="this.unsatIxC == 'SAFE'">안정된 재무관리 중이예요</p>
                    <p class="com_txt_sub inPotTxt" v-else><span class="pointTxt">{{this.unsatIxDscNm}} 중 {{this.unsatIxNm}}</span><br>관리가 가장 필요해요.</p><!-- 09/22 jlee 문구 수정, 구조변경 -->
					<div class="assetDoughnutGrp"><!-- 1004 접근성 반영 -->
                        <!--  safe전체적정, safeH일부적정, Nsafe개선, safeN일부개선, safeNon 개선0 -->
                        <template v-for="(item, index) in myFnaDgsList">
                            <div v-if="item.dgnRzt == '적정'" :key="index" :class="`donutBox ${item.ixSatC === 'S' ? 'safe' : item.ixSatC === 'H' ? 'safeH' : item.ixSatC === 'N' ? 'Nsafe' : ''}`">
                                <a href="javascript:void(0)" class="" title="지표별 재무 진단 이동" role="button" @click='fn_ASIP2005TAB(item.viewIndex)'>
                                    <div class="donutCh">
                                        <span>{{item.dgnRzt}}</span>
                                    </div>
                                </a>
                                <p>{{item.category}}</p>
                            </div>
                            <div v-else-if="item.dgnRzt == '개선'" :key="index" :class="`donutBox ${item.ixSatC === 'H' ? 'safeN' : item.ixSatC === 'N' ? 'Nsafe' : item.ixSatC === 'Z' ? 'safeNon' : ''}`">
                                <a href="javascript:void(0)" class="" title="지표별 재무 진단 이동" role="button" @click='fn_ASIP2005TAB(item.viewIndex)'>
                                    <div class="donutCh">
                                        <span>{{item.dgnRzt}}</span>
                                    </div>
                                </a>
                                <p>{{item.category}}</p>
                            </div>
                        </template>
                    </div>
					<hr>

					<div class="assetSolution">
						<div class="assetSolutionTitle">
							<p class="titH3">재무 관리 솔루션</p>
							<span>나를 위한 키워드&nbsp;</span><strong class="pointColor green">#{{fnalvKwrdCNm}}</strong>
						</div>
						<ul class="assetSolutionList">
                            <li class="list pensi">
								<a href="javascript:void(0);" role="button" @click.prevent="proxyPage('PDMY4032')">
									<span class="assetListIcon"></span>
									<strong class="txt">지출관리</strong>
									<p class="subTxt">{{fnaRcmSvcTxt1}}</p>
								</a>
							</li>
							<li class="list pensi">
								<a href="javascript:void(0);" role="button" @click.prevent="proxyPage(fnaRcmSvcType1)">
									<span class="assetListIcon"></span>
									<strong class="txt">{{fnaRcmSvcC1}}</strong>
									<p class="subTxt">{{fnaRcmSvcTxt1}}</p>
								</a>
							</li>
							<li class="list prodt">
								<a href="javascript:void(0);" role="button" @click.prevent="proxyPage(fnaRcmSvcType2)">
									<span class="assetListIcon"></span>
									<strong class="txt">{{fnaRcmSvcC2}}</strong>
									<p class="subTxt">{{fnaRcmSvcTxt2}}</p>
								</a>
							</li>
							<li class="list expen">
								<a href="javascript:void(0);" role="button" @click.prevent="proxyPage(fnaRcmSvcType3)">
									<span class="assetListIcon"></span>
									<strong class="txt">{{fnaRcmSvcC3}}</strong>
									<p class="subTxt">{{fnaRcmSvcTxt3}}</p>
								</a>
							</li>
						</ul>
					</div>
				</div>
                <!-- 보험공단 연결 안된 경우 -->
                <div class="com_box_type01" v-else>
                <div class="accountBanner imgType2" > 
                            <p class="com_txt_sub point">소득 및 자산을 연결하면<br>전문 재무 진단을 받을 수 있어요</p>
                        </div>
                        <div class="btn_half_box2">
                            <a href="javascript:void(0)" class="btn btn_gray_line" role="button" @click="fn_moveJoinPop() ">소득 정보 연결</a>
                            <a href="javascript:void(0)" class="btn btn_gray_line" role="button" @click="proxyPage('COAR2002')" >자산 연결</a>
                        </div> 
                        </div>
                 
				<!--// 보험공단 연결 안된 경우 -->

				<div class="com_box_type01" @click='fn_getASIP2007()'>
					<p class="titH3">계좌 잔액을 미리 알려드려요</p>
					<!-- 부족 자금 발생 -->
					<div class="accountAlert lack" v-if="asetStsc2 == 'NEGATIVE'">
						<div class="alertTit">
							<strong class="titH5">잔액이 부족할 것 같아요</strong>
							<p class="subTxt">연체를 미리 예방하세요</p>
						</div>
						<ul class="layoutBox wAuto alertAmt" >
							<li class="left"><span class="alt">잔액부족</span></li>
							<li class="right"><strong class="amt titH4">{{acDeltaAmt2 | numberFilter}}원</strong></li>
						</ul>
					</div>
					<!-- 여유 자금 발생 -->
					<div class="accountAlert spare" v-else-if="asetStsc2 == 'POSITIVE'" >
						<div class="alertTit">
							<strong class="titH5">여유자금이 있을 것 같아요</strong>
							<p class="subTxt">노는 돈을 불려보세요</p>
						</div>
						<ul class="layoutBox wAuto alertAmt">
							<li class="left"><span class="alt">잔액여유</span></li>
							<li class="right"><strong class="amt titH4">{{acDeltaAmt2 | numberFilter}}원</strong></li>
						</ul>
					</div>
					<!-- 예상 자금 없음 -->
					<div class="accountAlert maint" v-else>
						<div class="alertTit">
							<strong class="titH5">잔액 변동이 없어요</strong>
							<p class="subTxt">계좌 별 자금 흐름을 확인하세요</p>
						</div>
						<ul class="layoutBox wAuto alertAmt">
							<li class="left"><span class="alt">변동없음</span></li>
							<li class="right"><strong class="amt titH4">{{acDeltaAmt2 | numberFilter}}원</strong></li>
						</ul>
					</div>
				</div>
                <div class="com_box_type01">
                    <div class="accountBanner" @click='fn_getASIP2009()'>
                        <a href="javascript:void(0)" class="" title="또래 부자들의 금융생활 이동">
                            <p class="subTxt">또래 부자들의 인기상품은?</p>
                            <p class="titH5">부자들의 금융생활</p>
                        </a>
                    </div>
				</div>
			</div>
			<!--// com_inner -->
		</div>
        <footersV2 type="as" />
    </page>
</template>

<script>
    import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

    import Page from '@/views/layout/Page.vue'
    import FootersV2 from "@/views/layout/FootersV2.vue"
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import commonService from '@/service/commonService'
    import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
    //import AsSubCategoryV2 from '@/components/category/AsSubCategoryV2.vue'
    import {dateFormat, monthAdd, dayAdd} from '@/utils/date'

    // import ASIP1102 from '@/views/page/AS/IP/ASIP1102/ASIP1102'
    // import ASIP1002 from '@/views/page/AS/IP/ASIP1002/ASIP1002'
    import ASIP2002TAB from '@/components/category/AsIp2002Tab'
    import ASIP2005TAB from '@/components/category/AsIp2005Tab'

    
    import ASIP2009 from '@/views/page/AS/IP/ASIP2009/ASIP2009'
    import ASIP2010 from '@/views/page/AS/IP/ASIP2010/ASIP2010'
    import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'
    import ASIP2007 from '@/views/page/AS/IP/ASIP2007/ASIP2007' 
    import PDRT4001 from '@/views/page/PD/RT/PDRT4001/PDRT4001'
    import PDPD4001 from '@/views/page/PD/PD/PDPD4001/PDPD4001'
    // import PDMY4032 from '@/views/page/PD/MY/PDMY4032/PDMY4032'
    // import PDMY4001 from '@/views/page/PD/MY/PDMY4001/PDMY4001'
    // import PDMY2038 from '@/views/page/PD/MY/PDMY2038/PDMY2038'
    import PDMY2040 from '@/views/page/PD/MY/PDMY2040/PDMY2040'

    import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'
    import COAR2003 from '@/views/page/CO/AR/COAR2003/COAR2003'
    import COAR2005 from '@/views/page/CO/AR/COAR2005/COAR2005'
    import { mapGetters } from 'vuex'

    export default {
        name : "ASIP2001",
        data: () => {
            return {
                acDeltaBac : 0,
                fnasOrdStno : 0,
                acBac : 0,
                asetStsc : "",

                finStyCd  : "",
                finStyDtlCd : "",
                finStyValCd  :"",
                finIdx : "",
                prdStyCd :  "",
                prdStyDtlCd :  "",
                finStyCdNm  : "",
                prdStyCdNm : "",

                acDeltaAmt2 : 0,
                asetStsc2 : "",

                /* 나의 재무진단 결과 */
                unsatIxC : "",
                unsatIxNm : "",
                unsatIxDsc : "",
                unsatIxDscNm : "",
                dbtAmnDgnRzt : "",
                hseFnaDgnRzt : "",
                futRsvDgnRzt : "",
                dbtAmnIxSatC : "",
                hseFnaIxSatC : "",
                futRsvIxSatC : "",
                myFnaDgnArray  : [], // 나의 재무 진단 도넛그래프 목록
                myFnaDgsList : [], // 나의 재무 진단 도넛그래프 목록
                hlthIsrEntYn : 'N',
                viewIndex : "",
                
                /* 재무관리 솔루션*/
                fnalvKwrd : "",
                fnaRcmSvcOrd : "",
                fnaRcmSvcC1 : "",
                fnaRcmSvcC2 : "",
                fnaRcmSvcC3 : "",
                fnaRcmSvcCNm1 : "",
                fnaRcmSvcCNm2 : "",
                fnaRcmSvcCNm3 : "",
                fnalvKwrdCNm : "",
                fnaRcmSvcTxt1 : "",
                fnaRcmSvcTxt2 : "",
                fnaRcmSvcTxt3 : "",
                fnaRcmSvcType1 : "",
                fnaRcmSvcType2 : "",
                fnaRcmSvcType3 : "",
                
            }
        },
        mixins: [
            commonMixin
        ],
        computed: {
            ...mapGetters('myassets', [
                'myAssetsBzrgList'
            ]),
        },
        mounted() {
            this.initComponent();

            // 자산수집 mutation 이벤트 감지 
            this.getGatheringListenSubscribe()
            
            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent() {
                this.currYmd    = dateFormat(new Date(), 'YYYYMMDD');
                
                // this.baseDt = dayAdd(14, this.currYmd)	// 기준일자
                this.baseDt = dayAdd(13, this.currYmd)	// 기준일자
                this.showBaseMm = this.baseDt.slice(4, 6).replace(/(^0+)/,"")	// 기준일자 월 (좌측 '0'포함시 '0'제거)
                this.showBaseDd = this.baseDt.slice(6).replace(/(^0+)/,"")		// 기준일자 일 (좌측 '0'포함시 '0'제거)
                this.cusnm      = this.getUserInfo("cusnm");
                this.currYm     = dateFormat(new Date(), 'YYYYMM');
                this.currMm     = dateFormat(new Date(), 'MM');
                this.toDay      = dateFormat(dayAdd(-1, new Date()), 'YYYYMM')

                this.showNowMm = this.currYmd.slice(4, 6).replace(/(^0+)/,"")	// 현재일자 월
                this.showNowDd = this.currYmd.slice(6).replace(/(^0+)/,"")		// 현재일자 일

                /**
                 * 1) +14일이 익월인 경우 문구 노출 :: ex) 11월 말일 ~
                 * 2) +14일이 익월이 아닌경우 문구 노출 :: ex) 11월 xx일 ~
                 */
                if(this.showNowMm !== this.showBaseMm) {
                    // +14일이 익월인 경우
                    this.showBaseMm = this.showNowMm
                    this.showBaseDd = "말"
                }

                // this.selectedYm = monthAdd(-1, this.currYm, "YYYYMM"); // 전월
                this.selectedYm = dateFormat(dayAdd(-1, new Date()), 'YYYYMMDD')

                // 최초가입일+1 부터 자산진단 가능
                this.baseDtOne = dayAdd(1, this.getUserInfo('firEntDt'))                    // 최초가입일 +1일
                this.showBaseMmOne = this.baseDtOne.slice(4, 6).replace(/(^0+)/,"")	        // 기준일자 월 (좌측 '0'포함시 '0'제거)
                this.showBaseDdOne = this.baseDtOne.slice(6).replace(/(^0+)/,"")		    // 기준일자 일 (좌측 '0'포함시 '0'제거) 

                console.log("======= 최초가입일 +1일(자산진단 가능일) =======", this.baseDtOne)
                console.log("======= 현재일 dayAdd(0)=======", dayAdd(0))
                console.log("======= 진단 가능일 this.baseDtOne =======", this.baseDtOne)

                if(dayAdd(0) < this.baseDtOne){
                    this.showPageFlag = 'N'
                }else{
                    this.showPageFlag = 'Y'
                    this.getData();
                    // this.showPageFlag = 'N' // 자산진단일 미도래 화면 테스트(우에 2라인 주석처리 하고 테스트)
                }

                if(typeof this.myAssetsBzrgList != "undefined") {

				let publicAsset = this.myAssetsBzrgList?.filter(item => item.comnCVal === 'public') || []

				if(publicAsset.length > 0) {

					let publicAssetList = this.myAssetsBzrgList.find(item => item.comnCVal === 'public').orgList || []

					if(publicAssetList.length > 0){

						this.hlthIsrEntYn = publicAssetList.find(item => item.infOfrmnOrgC === 'PBAAVN0000') ? 'Y' : 'N'		// 건강보험공단

                    }
				}
			} else {

				this.hlthIsrEntYn = 'N'
			}

            },
            getData() {
                // 금융진단 정보 조회
                const config = {
                    url: '/as/ip/01r02', // 인터페이스ID: IF-MOB-PFM-ASIP01R02, 서비스코드: PFMASIP01R02
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "basDt"     : this.currYmd
                    }
                };


                this.executeCnt++
                apiService.call(config).then(response => {
                    console.log("======= 금융진단 정보 조회/as/ip/01r02 response =======", response)

                    this.acBac        = response.acBac;
                    this.acBf1mBac    = response.acBf1mBac;
                    this.acDeltaBac   = response.acDeltaBac;
                    this.asetStsc     = response.asetStsc;
                    this.fnasOrdStno  = response.fnasOrdStno;

                    if(this.monLimit > 12) this.monLimit = 12;

                    this.monPrev = false;
                    this.monNext = false;
                    if (this.monLimit > 0) {
                        let minMonth = monthAdd(-(this.monLimit), this.currYm, "YYYYMM");
                        // let maxMonth = monthAdd(-1, this.currYm, "YYYYMM");
                        let maxMonth = this.currYm;

                        if (this.selectedYm > minMonth) {
                            this.monPrev = true;
                        }

                        if (this.selectedYm < maxMonth) {
                            this.monNext = true;
                        }
                    }

                    // 나의 금융 평가 조회
                    this.fn_getTab1Data();
                    
                    // 나의 재무진단 결과 조회
                    this.fn_getMyFnaDgsRzt();

                     // 재무 관리 솔루션
                    this.fn_getFnaAmnSluData();

                    // 통합자금흐름통계 조회
                    this.fn_getTab3Data();

                });
            },
            
            /* 나의 금융 평가 조회 */
            fn_getTab1Data() {
                const config = {
                    url: '/as/ip/10r01',
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "basYmd"     : this.currYmd
                    }
                }

                apiService.call(config).then((response) =>{


                    console.log("======= 나의 금융평가 조회/as/ip/10r01 response ======= ", response)

                    this.finStyCd    = response.finStyCd;
                    this.finStyDtlCd = response.finStyDtlCd;
                    this.finStyValCd = response.finStyValCd;
                    this.finIdx      = response.finIdx;
                    this.prdStyCd    = response.prdStyCd;
                    this.prdStyDtlCd = response.prdStyDtlCd;

                    if(this.finStyCd=="FS01"){
                        this.finStyCdNm = "금융새내기"
                    }else if(this.finStyCd=='FS02'){
                        this.finStyCdNm = "현금중심"
                    }else if(this.finStyCd=='FS03'){
                        this.finStyCdNm = "지출과다"
                    }else if(this.finStyCd=='FS04'){
                        this.finStyCdNm = "부채과다 "
                    }else if(this.finStyCd=='FS05'){
                        this.finStyCdNm = "부채위험"
                    }else if(this.finStyCd=='FS06'){
                        this.finStyCdNm = "보장준비"
                    }else if(this.finStyCd=='FS07'){
                        this.finStyCdNm = "노후준비"
                    }else if(this.finStyCd=='FS08'){
                        this.finStyCdNm = "금융전문가"
                    }

                    if(this.prdStyCd=="PS01"){
                        this.prdStyCdNm = "분산관리성향이 강한"
                    }else if(this.prdStyCd=='PS02'){
                        this.prdStyCdNm = "투자성향이 강한"
                    }else if(this.prdStyCd=='PS03'){
                        this.prdStyCdNm = "저축성향이 강한"
                    }

                    
                });
            },

            /* 나의 재무진단 결과 */
            fn_getMyFnaDgsRzt() {
                const config = {
                    url: '/as/ip/01r04',
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "basDt"     : this.currYmd
                    }
                }
                 apiService.call(config).then((response) =>{
                   this.myFnaDgnArray = []
                    
                    console.log("======= 나의 재무진단 결과 조회/as/ip/01r04 response ======= ", response)
                    
                    this.unsatIxC = response.unsatIxC 
                    
                    if(this.unsatIxC == "CSM_LFE_DBT_RPY_IX"){
                        this.unsatIxNm = "소비생활부채상환율"
                    } else if (this.unsatIxC == "TOT_DBT_BDN_IX"){
                        this.unsatIxNm = "부채비율"
                    } else if (this.unsatIxC == "TOT_DBT_RPY_IX"){
                        this.unsatIxNm = "부채상환비율"
                    } else if (this.unsatIxC == "XPS_WGT_IX"){
                        this.unsatIxNm = "지출비율"
                    } else if (this.unsatIxC == "FNAS_WGT_IX"){
                        this.unsatIxNm = "금융자산비율"
                    } else if (this.unsatIxC == "SV_IV_WGT_IX"){
                        this.unsatIxNm = "저축투자비율"
                    } else if (this.unsatIxC == "GRNTP_ISR_BDN_IX"){
                        this.unsatIxNm = "보장보험부담비율"
                    } else if (this.unsatIxC == "EMCY_RSR_CPT_IX"){
                        this.unsatIxNm = "예비자금준비율"
                    } else if (this.unsatIxC == "PNS_ASET_WGT_IX"){
                        this.unsatIxNm = "연금자산준비율"
                    } 

                    this.unsatIxDsc = response.unsatIxDsc 

                    if(this.unsatIxDsc == "DBT"){
                        this.unsatIxDscNm = "부채관리"
                    } else if (this.unsatIxDsc == "HSE"){
                        this.unsatIxDscNm = "가계재무"
                    } else if (this.unsatIxDsc == "FUT"){
                        this.unsatIxDscNm = "미래준비"
                    } 

                    this.myFnaDgsList = [
                        {
                            dgnRzt: response.hseFnaDgnRzt,
                            ixSatC: response.hseFnaIxSatC,
                            cd: 'hseFna',
                            category: '가계재무',
                            viewIndex : 0
                        },{
                            dgnRzt: response.futRsvDgnRzt,
                            ixSatC: response.futRsvIxSatC,
                            cd: 'futRsv',
                            category: '미래준비',
                            viewIndex : 1
                        },{
                            dgnRzt: response.dbtAmnDgnRzt,
                            ixSatC: response.dbtAmnIxSatC,
                            cd: 'dbtAmn',
                            category: '부채관리',
                            viewIndex : 2
                        },
                    ]

                    this.myFnaDgsList = this.myFnaDgsList.sort((a, b) => a.viewIndex - b.viewIndex)

                });

            },

            /* 재무관리 솔루션 */
            fn_getFnaAmnSluData() {
                
                const config = {
                    url: '/as/ip/01r05',
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "basDt"     : this.currYmd
                    }
                }

                apiService.call(config).then((response) =>{


                    console.log("======= 재무 관리 솔루션 조회/as/ip/01r05 response ======= ", response)

                    this.fnalvKwrdC  = response.fnalvKwrdC;
                    this.fnaRcmSvcC1  = response.fnaRcmSvcC1;
                    this.fnaRcmSvcC2   = response.fnaRcmSvcC2;
                    this.fnaRcmSvcC3   = response.fnaRcmSvcC3;
                    this.fnaRcmSvcTxt1 = response.fnaRcmSvcTxt1;
                    this.fnaRcmSvcTxt2 = response.fnaRcmSvcTxt2;
                    this.fnaRcmSvcTxt3 = response.fnaRcmSvcTxt3;
                    this.fnaRcmSvcType1 = response.fnaRcmSvcType1;
                    this.fnaRcmSvcType2 = response.fnaRcmSvcType2;
                    this.fnaRcmSvcType3 = response.fnaRcmSvcType3;


                    if(this.fnalvKwrdC=="FNALV01"){
                        this.fnalvKwrdCNm = "재무 관리 초보"
                    }else if(this.fnalvKwrdC=='FNALV02'){
                        this.fnalvKwrdCNm = "부채 상황 점검"
                    }else if(this.fnalvKwrdC=='FNALV03'){
                        this.fnalvKwrdCNm = "재무 성장 준비"
                    }else if(this.fnalvKwrdC=='FNALV04'){
                        this.fnalvKwrdCNm = "더 나은 미래준비"
                    }else if(this.fnalvKwrdC=='FNALV05'){
                        this.fnalvKwrdCNm = "재무 관리 고수"
                    }
                });

            },

            
            proxyPage(pageId) {
                // 페이지 정의
                let cdArr = [{
                    id:'PDRT4001', type:'page'  // 재무관리솔루션 [노후준비]
                },{
                    id:'PDPD4001', type:'page'  // 재무관리솔루션 [맞춤상품]
                },{
                    id:'PDMY4032', type:'page'  // 재무관리솔루션 [지출관리]
                },{
                    id:'PDMY2038', type:'page'  // 재무관리솔루션 [투자설계]
                },{
                    id:'PDMY2040', type:'page'  // 재무관리솔루션 [목돈마련]
                },{
                    id:'COAR2001', type:'popup' // 자산등록
                },{
                    id:'COAR2002', type:'popup' // 신규 자산 연결
                }]
                // 호출된 페이지 정보 가져오기
                let result = cdArr.find(el=> el.id === pageId)

                // 해당 페이지 호출
                if (result.type === 'page') {
                    this.fn_movePage(pageId)
                } else {
                    this.fn_movePopup(pageId)
                }
            },

            fn_movePage(pageId) {
                console.log('fn_movePage pageId ### ', pageId)
                let params = {}
                let config = {
                    name: pageId,
                    params: params
                }
            
                if(pageId == "PDRT4001"){
                    config.component = PDRT4001;
				} else if (pageId == "PDPD4001"){
                    config.component = PDPD4001;
				} else if (pageId == "PDMY4032"){
                    config.name = 'PDMY4001'
                    config.params.type = "00"; // 지출관리
				} else if (pageId == "PDMY2038"){
                    config.name = 'PDMY4001'
                    config.params.type = "01"; // 목돈마련
				} else if (pageId == "PDMY2040"){
                    config.name = 'PDMY4001'
                    config.params.type = "02"; // 투자설계
                }  
                // console.log(config)
                commonService.movePage(config);
            },

            fn_movePopup(pageId) {

                console.log('fn_movePopup pageId ### ', pageId)

                let config = {}
                var param = {}

                if (pageId == "PDMY2040"){ 
                    config = {
                        component : PDMY2040,
                        params : param 
                    }
                } else if (pageId == "COAR2001"){
                    config = {
                        component : COAR2001,
                    }
                } else if (pageId == "COAR2002"){
                    config = {
                        component : COAR2002,
                    }
                } else if (pageId == "ASIP2002TAB"){
                    config = {
                        component : ASIP2002TAB,
                    }
                } else if (pageId == "ASIP2010"){
                    config = {
                        component : ASIP2010,
                    }
                } 

                console.log(config)
                
                // modalService.openPopup(config).then(() => {});
                modalService.openPopup(config).then(response => {

                    // 배너이미지를 통하여 목표등록을 하였을 경우
                    // 나의목표로 이동
                    if(response == 'reSelect') {
                        const menu = {
                            name: 'PDMY4001',
                            params : {}
                        }
                        commonService.movePage(menu)
                    }
                })
            },

            fn_getTab3Data() {
                // 통합자금흐름통계 조회
                const config = {
                    url: '/as/ip/01r06',
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "basDt"     : this.currYmd
                    }
                }

                apiService.call(config).then((response) =>{


                    console.log("======= 통합자금흐름통계 조회/as/ip/01r06 response ======= ", response)
                    this.expXpsAmt  = response.expXpsAmt;
                    this.acDeltaAmt2  = response.acDeltaAmt;
                    this.asetStsc2   = response.asetStsc;
                });

            },

            // 자산> 자가진단 >계좌 잔액 예측 리포트 팝업 호출
            fn_getASIP2007() {
                
                const config = {
                    component : ASIP2007
                };

                modalService.openPopup(config).then(() => {
                // modalService.openSlidePagePopup(config).then(() => {
                    this.getData();
                });
            },
            fn_ASIP2002TAB() {
                // 금융유형별자산
                const config = {
                    component : ASIP2002TAB
                }

                modalService.openPopup(config).then(() => {
                    this.getData();
                });
            },
            // 또래엿보기
            fn_getASIP2009() {
                const config = {
                    component : ASIP2009,
                    params : {
                        peerNo : this.peerNo,
                        basYm : this.currYmd
                    }
                };

                modalService.openPopup(config).then(() => {
                // modalService.openSlidePagePopup(config).then(() => {
                    this.getData();
                });
            },
            fn_ASIP2010() {
                // 금융스타일진단
                const config = {
                    component : ASIP2010
                }

                modalService.openPopup(config).then(() => {
                    this.getData();
                });
            },
            //나의 재무진단
            fn_ASIP2005TAB(idx) {
                const config = {
                    component : ASIP2005TAB,
                    params : {
                        basYm : this.currYmd,
                        viewIndex : idx
                    }
                };

                modalService.openPopup(config).then(() => {
                // modalService.openSlidePagePopup(config).then(() => {
                    this.getData();
                });
            },

            fn_getCOAR2003(orgDsc) {
                
                const config = {
                    component : COAR2003,
                    params : {
                        isMramNew : true,
                        orgDsc : orgDsc
                    }
                };

                modalService.openPopup(config).then(() => {
                    this.getData();
                });
            },

            fn_moveJoinPop() {
			let compName = COAR2005;

			let param = {}
			let moduleList = []
			let moduleParam = {}
			if(this.hlthIsrEntYn == 'N') {
				moduleParam.orgC		= "PBAAVN0000"
				moduleParam.orgBzrgC	= "public"
				moduleParam.orgnm		= "국민건강보험공단"
				moduleList.push(moduleParam)
			}
			param.moduleList = moduleList
			param.isOnlyPublic = true

            const config = {
                component: compName,
                params : param
			}
			console.log(config)
            modalService.openPopup(config).then(() => {});
			
		}



        },
        components : {
            Page,
            FootersV2,
            AsCategoryV2,
            //AsSubCategoryV2,
        }
    }
</script>