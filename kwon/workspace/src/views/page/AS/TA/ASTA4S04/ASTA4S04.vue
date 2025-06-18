<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 연금
* @ 페이지설명 : 큰글모드 > 자산 > 연금
* @ 파일명     : src/views/page/AS/TA/ASTA4S04/ASTA4S04.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-13              CS541597              ASPS2001 -> ASTA4S04 연금 큰글씨모드 신규
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>연금</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">

				<div class="board_box" v-if="ntpsTotPayAm > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">국민연금</span>
							<span class="num"><em>{{ntpsTotPayAm | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
								<li>
									<a href="javascript:void(0);" @click.prevent="fn_viewNtpsBrk">
										<i class="ico_bank PBAAVM0000"></i>
										<div>
											<strong class="org">가입기간</strong>
											<strong class="account">총 가입기간 {{ntpsTotEntPrd | numberFilter}}개월</strong>
										</div>
									</a>
								</li>
							</ul>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="rtrpnsCn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">퇴직연금<em>{{rtrpnsCn | numberFilter}}</em></span>
							<span class="num"><em>{{rtrpnsTotAcEvlam | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
								<li v-for="(item, idx) in rtrPnsList" :key="idx">
                                    <!-- 퇴직연금 DC -->
                                    <template v-if="item.rtrPsnDsc === 'DC'">
                                        <a href="javascript:void(0);" @click.prevent="fn_openDetailPop('DC', item)">
                                            <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <div>
                                                <strong class="org">{{item.dcRtrpnsWrsnm}}</strong>
                                                <strong class="account">{{item.wrsAmnno}}</strong>
                                            </div>
                                            <strong class="num"><em>{{item.acEvlam| numberFilter}}</em>원</strong>
                                        </a>
                                    </template>
                                    <!-- // 퇴직연금 DC -->
                                    <!-- 퇴직연금 IRP -->
                                    <template v-else>
                                        <a href="javascript:void(0);" @click.prevent="fn_openDetailPop('IRP', item)">
                                            <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <div>
                                                <strong class="org">{{item.acWrsnm}}</strong>
                                                <strong class="account">{{item.mydtAcno}}</strong>
                                            </div>
                                            <strong class="num"><em>{{item.acEvlam| numberFilter}}</em>원</strong>
                                        </a>
                                    </template>
                                    <!-- // 퇴직연금 IRP -->
								</li>
							</ul>
                            <!-- <a href="javascript:void(0);" class="btns lg" v-if="rtrpnsCn > 3 && !moreRtrPnsYn" @click.prevent="fn_showMore('rtrPns')">더보기</a> -->
                            <div class="btns_wrap" v-if="rtrpnsCn > 3 && !moreRtrPnsYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('rtrPns')">퇴직연금계좌 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="pPnsCn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">개인연금<em>{{pPnsCn | numberFilter}}</em></span>
							<span class="num"><em>{{pPnsTotAcEvlam | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
								<li v-for="(item, idx) in pPnsList" :key="idx">
                                    <!-- 개인연금저축보험 -->
                                    <template v-if="item.pPnsDsc === 'PSIS'">
                                        <a href="javascript:void(0);" @click.prevent="fn_openDetailPop('PSIS', item)">
                                            <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <div>
                                                <strong class="org">{{item.isrcoWrsnm}}</strong>
                                                <strong class="account">{{item.isrSctsNo}}</strong>
                                            </div>
                                            <strong class="num"><em>{{item.isrTotPymAmt | numberFilter}}</em>원</strong>
                                            <span :class="getStatusClass(item.isrCtrStsc)">{{item.isrCtrStsnm}}</span>
                                        </a>
                                    </template>
                                    <!-- // 개인연금저축보험 -->
                                    <!-- 개인연금저축펀드 -->
                                    <template v-if="item.pPnsDsc === 'PSIV'">
                                        <a href="javascript:void(0);" @click.prevent="fn_openDetailPop('PSIV', item)">
                                            <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <div>
                                                <strong class="org">{{item.acWrsnm}}</strong>
                                                <strong class="account">{{item.mydtAcno}}</strong>
                                            </div>
                                            <strong class="num"><em>{{item.acNowBac | numberFilter}}</em>원</strong>
                                            <p class="latter" :class="item.strmPftrt === 0 ? '' : item.strmPftrt > 0 ? 'up' : 'down'">
                                                <i class="blind" :class="item.strmPftrt === 0 ? '' : item.strmPftrt > 0 ? 'up' : 'down'">
                                                    {{ item.strmPftrt === 0 ? '변동없음' : item.strmPftrt > 0 ? '상승' : '하락' }}
                                                </i>
                                                <em class="num">{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}</em>%
                                            </p>
                                        </a>
                                    </template>
                                    <!-- // 개인연금저축펀드 -->
                                    <!-- 연금신탁 -->
                                    <template v-if="item.pPnsDsc === 'PSTS'">
                                        <a href="javascript:void(0);" @click.prevent="fn_openDetailPop('PSTS', item)">
                                            <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <div>
                                                <strong class="org">{{item.acWrsnm}}</strong>
                                                <!-- asis) 계좌번호 미노출 확인필요 -->
                                                <!-- <strong class="account">{{item.mydtAcno}}</strong> -->
                                            </div>
                                            <strong class="num"><em>{{item.acEvlam | numberFilter}}</em>원</strong>
                                        </a>
                                    </template>
                                    <!-- // 연금신탁 -->
								</li>
							</ul>
                            <!-- <a href="javascript:void(0);" class="btns lg" v-if="pPnsCn > 3 && !morepPnsYn" @click.prevent="fn_showMore('pPns')">더보기</a> -->
                            <div class="btns_wrap" v-if="pPnsCn > 3 && !morepPnsYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('pPns')">개인연금계좌 더보기</button>
							</div>
						</div>
					</details>
				</div>

			</div>
		</div>

		<a href="javascript:void(0);" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'

    import PDSC4001 from '@/views/page/PD/SC/PDSC4001/PDSC4001'
    import ASPS2002 from '@/views/page/AS/PS/ASPS2002/ASPS2002'
    import ASPS2004 from '@/views/page/AS/PS/ASPS2004/ASPS2004'
    import ASIS4012 from '@/views/page/AS/IS/ASIS4012/ASIS4012'
    import ASIV2002 from '@/views/page/AS/IV/ASIV2002/ASIV2002'
    import ASIV2005 from '@/views/page/AS/IV/ASIV2005/ASIV2005'

	export default {
		name: 'ASTA4S04',
		data: () => {
			return {
                respInfo         : {},
                pnsTotAcEvlam    : 0,      // 연금총합산금액
                ntpsTotPayAm     : 0,      // 국민연금총납부금액
                ntpsTotEntPrd    : 0,      // 국민연금총가입기간
                rtrpnsTotAcEvlam : 0,      // 퇴직연금총평가금액 
                rtrpnsCn         : 0,      // 퇴직연금목록건수
                dcList           : [],     // DC퇴직연금목록
                irpList          : [],     // IRP퇴직연금목록
                pPnsTotAcEvlam   : 0,      // 개인연금총평가금액 
                pPnsCn           : 0,      // 개인연금목록건수
                pnsvInsuList     : [],     // 연금저축보험목록
                pnsvFundList     : [],     // 연금저축펀드목록
                pnsTsList        : [],     // 연금신탁목록
                rtrPnsList       : [],     // 퇴직연금목록 (DC + IRP)
                pPnsList         : [],     // 개인연금목록 (저축보험 + 저축펀드 + 신탁)

                moreRtrPnsYn     : false,  // 퇴직연금(DC/IRP 통합) 더보기 버튼 선택 여부
                morepPnsYn       : false,  // 개인연금(연금저축보험,연금저축펀드,연금신탁 통합) 더보기 버튼 선택 여부
			}
        },
		mixins: [
			commonMixin,
            popupMixin
		],        
		computed: {
            
        },
		mounted() {
            console.log('mounted')
            this.initComponent()

            // 자산수집 mutation 이벤트 감지 
            this.getGatheringListenSubscribe()

            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
		},        
		methods: {
            initComponent() {
                console.log('getData')
                this.getData()
            },
            getData() {
                ///////////////////////////////////
                // 계좌목록 조회 
                const config = {
                    url: '/as/ps/01r02',
					data: {
                        mydtCusno : this.getUserInfo('mydtCusno')
                        //mydtCusno : '2000003756'
                    }
                }
                apiService.call(config).then(response =>{

                    this.respInfo = response

                    // 2025.02.13 신규) 퇴직/개인연금 내 세부 리스트 별 컬럼이 달라 구분을 위한 응답데이터 세부리스트 내 구분값 추가
                    /////////////////////
                    // 퇴직연금
                    /////////////////////
                    this.respInfo.dcList.forEach(d => {
                        d.rtrPsnDsc = 'DC'
                    })
                    this.respInfo.irpList.forEach(d => {
                        d.rtrPsnDsc = 'IRP'
                    })
                    /////////////////////
                    // 개인연금
                    /////////////////////
                    this.respInfo.pnsvInsuList.forEach(d => {
                        d.pPnsDsc = 'PSIS'
                    })
                    this.respInfo.pnsvFundList.forEach(d => {
                        d.pPnsDsc = 'PSIV'
                    })
                    this.respInfo.pnsTsList.forEach(d => {
                        d.pPnsDsc = 'PSTS'
                    })

                    // 국민연금
                    this.ntpsTotPayAm     = this.respInfo.ntpsTotPayAm     // 국민연금총납부금액
                    this.ntpsTotEntPrd    = this.respInfo.ntpsTotEntPrd    // 국민연금총가입기간

                    // 퇴직연금
                    this.rtrPnsList       = []                               // 퇴직연금총목록
                    this.rtrpnsTotAcEvlam = this.respInfo.rtrpnsTotAcEvlam   // 퇴직연금총평가금액
                    this.rtrpnsCn         = this.respInfo.rtrpnsCn           // 퇴직연금목록건수
                    this.dcList           = this.respInfo.dcList || []       // DC퇴직연금 목록
                    this.irpList          = this.respInfo.irpList || []      // IRP퇴직연금 목록

                    // 개인연금
                    this.pPnsList         = []                               // 개인연금총목록
                    this.pPnsTotAcEvlam   = this.respInfo.pPnsTotAcEvlam     // 개인연금총평가금액 
                    this.pPnsCn           = this.respInfo.pPnsCn             // 개인연금목록건수
                    this.pnsvInsuList     = this.respInfo.pnsvInsuList || [] // 연금저축보험 목록
                    this.pnsvFundList     = this.respInfo.pnsvFundList || [] // 연금저축펀드 목록
                    this.pnsTsList        = this.respInfo.pnsTsList    || [] // 연금신탁 목록

                    // 연금 총합계금액 (국민연금 + 퇴직연금 + 개인연금)
                    this.pnsTotAcEvlam    = this.respInfo.pnsTotAcEvlam

                    // --- 퇴직연금 총 목록 생성 Start
                    this.rtrPnsList.push(...this.dcList)
                    this.rtrPnsList.push(...this.irpList)
                    // 첫 진입 시 퇴직연금 목록 개수 제한 (자산수집 mutation 이전 더보기 선택 시 펼침상태로 목록 새로고침)
                    this.rtrPnsList = this.rtrpnsCn > 3 && !this.moreRtrPnsYn
                                        ? this.rtrPnsList.slice(0, 3) : this.rtrPnsList
                    // --- 퇴직연금 총 목록 생성 End

                    // --- 개인연금 총 목록 생성 Start
                    this.pPnsList.push(...this.pnsvInsuList)
                    this.pPnsList.push(...this.pnsvFundList)
                    this.pPnsList.push(...this.pnsTsList)
                    // 첫 진입 시 개인연금 목록 개수 제한 (자산수집 mutation 이전 더보기 선택 시 펼침상태로 목록 새로고침)
                    this.pPnsList = this.pPnsCn > 3 && !this.morepPnsYn
                                        ? this.pPnsList.slice(0, 3) : this.pPnsList
                    // --- 개인연금 총 목록 생성 End
                    

                    // this.$nextTick(() => {
                    //     this.callJQueryFncExcute()
                    // })
                })
            },

            /**
             * 보험 상태에 따른 배지 class
             */
            getStatusClass(isrSctrStsc) {
                // 정상
                if(isrSctrStsc == '02') {
                    return ['pin', 'green']
                // 실효
                }else if(isrSctrStsc == '04') {
                    return ['pin', 'yellow']
                // 만기
                }else if(isrSctrStsc == '05') {
                    return ['pin', 'red']
                // 소멸
                }else if(isrSctrStsc == '06') {
                    return ['pin', '']
                }
            },

            /**
             * 더보기 선택 이벤트
             */
            fn_showMore(type) {
                switch(type) {
                    case 'rtrPns' : // 퇴직연금
                        this.rtrPnsList = []
                        this.rtrPnsList.push(...this.dcList)
                        this.rtrPnsList.push(...this.irpList)
                        this.moreRtrPnsYn = true
                        break
                    case 'pPns' :   // 개인연금
                        this.pPnsList = []
                        this.pPnsList.push(...this.pnsvInsuList)
                        this.pPnsList.push(...this.pnsvFundList)
                        this.pPnsList.push(...this.pnsTsList)
                        this.morepPnsYn = true
                        break
                    default :
                        break
                }
            },
            /**
             * 
             */
            fn_viewNtpsBrk() {
                const config = {
                    component: PDSC4001
                }
                modalService.openPopup(config).then(() => {
                    this.getData()
                })
            },
           /**
            * 상세화면이동
            */
            fn_openDetailPop(type, pension) {

                //let compName = ""
                let popupParam = pension
                popupParam.mydtCusno = this.getUserInfo('mydtCusno') //마이데이터고객번호

                let config = {}
                
                let compName = '' 
                let params = {}
                if(type == 'DC') {
                    compName = ASPS2002 // DC퇴직연금
                    params = {"objAccInfo": popupParam}
                } else if(type == 'IRP') {
                    compName = ASPS2004 // IRP
                    params = {"objAccInfo": popupParam}
                } else if(type == 'PSIS') {
                    compName = ASIS4012 // 연금저축보험
                    params = {
                        infOfrmnOrgC: pension.infOfrmnOrgC,
                        isrSctsNo: pension.isrSctsNo,
                        isrKdDsc: pension.isrKdDsc
                    }
                } else if(type == 'PSIV') {
                    compName = ASIV2002 // 연금저축펀드
                    params = {"objIvInfo": popupParam}
                } else if(type == 'PSTS') {
                    compName = ASIV2005 // 연금신탁
                    params = {"objIvInfo": popupParam}
                }

                config = {
                    component: compName,
                    params: params
                }
                modalService.openPopup(config).then(() => {
                    this.getData()
                })
            },         
		}
    }
    
</script>

