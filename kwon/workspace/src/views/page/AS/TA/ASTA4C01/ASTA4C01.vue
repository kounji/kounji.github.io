<!--
/*************************************************************************
* @ 서비스경로 : 청소년모드 > 자산 메인
* @ 페이지설명 : 청소년모드 > 자산 메인
* @ 파일명     : src/views/page/AS/TA/ASTA4C01/ASTA4C01.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
________________________________________________________________________
* 2025-03-24             CS541597               최초작성
*************************************************************************/
-->
<template>
    <!-- content-view S -->
    <page class="content-view"><!-- lnb 존재시 class hasLNB -->
		<div id="content">
			<section class="assets_youth">
				<div class="update">
					<template v-if="!isMyAssetGathering">
						<span>{{ lastUpdateDtm }}</span>
						<button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
					</template>
					<span v-else class="ml5 num lsp0">자산 업데이트 중</span>
				</div>

				<!--개요-->
				<div class="board_box assets_net" v-if="asetFnAcTtcn + asetFnPayPntTtcn > 0" :class="ntAsetTotAm > bfNtAsetTotAm ? 'up' : ntAsetTotAm < bfNtAsetTotAm ? 'down' : ''"><!--늘은경우 up, ,줄은 경우 down class 추가-->
					<h2>순자산</h2>
					<p class="txt">{{ntAsetTotAm | numberFilter}}원</p>

					<div class="analysis">
						<template v-if="ntAsetTotAm > bfNtAsetTotAm || ntAsetTotAm < bfNtAsetTotAm">
							<span class="text">지난달보다</span><span class="num">{{Math.abs(indAsetTotAm) | numberFilter}}원</span> <em>{{ntAsetTotAm > bfNtAsetTotAm ? '늘었어요.' : '줄었어요.'}}</em>
						</template>
						<template v-else>
							<span class="text">지난달과</span> <em>동일해요.</em>
						</template>
						<div class="custom_tooltip">
							<div class="com_tooltip_type02 com_tooltip_type03">
								
								<a href="javascript:void(0);" class="com_btn_info" role="button">
									<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
								</a>
								<div class="com_ballon_type01 com_ballon_type02" style="display: none;">
									<div>
										<ul class="dotted_list">
											<li>마지막 업데이트 시점의 총 자산과 마지막 업데이트 전 월 말일 총자산을 비교했습니다.</li>
											<li>오늘 업데이트 하셨으면 전 월 말일 총 자산과 비교한 결과입니다.</li>
										</ul>
										<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-else class="board_box assets_net unconnected">
					<h2>순자산</h2>

					<p class="txt">연결한 자산이 없어요.<a href="javascript:void(0);" class="btns">연결</a></p>
					<p class="analysis">
						자산 연결하고<br>입출금, 페이/포인트<br>한곳에서 관리하세요.
					</p>
				</div>

				<!--예금-->
				<div class="board_box assets_detail">
					<template v-if="asetFnAcTtcn > 0">
						<h2>예금<span class="num">{{ asetFnAcTtcn | numberFilter }}</span></h2>
						<div class="analysis" :class="indAsetFnAcAmSum > 0 ? 'up' : indAsetFnAcAmSum < 0 ? 'down' : ''">
							<p class="num">{{ asetFnAcAmSum | numberFilter }}원</p>

							<!-- !!!!!!!!!!!!!!!!!!!!!!!! -->
							<p class="latter" v-if="indAsetFnAcAmSum > 0 || indAsetFnAcAmSum < 0">
								지난달보다 {{Math.abs(indAsetFnAcAmSum) | numberFilter}}원<em> {{indAsetFnAcAmSum > 0 ? '늘었어요.' : '줄었어요.'}}</em>
							</p>
							<p class="latter" v-else>
								지난달과 <em>동일해요.</em>
							</p>
						</div>
						<ul class="assets_list">
							<li v-for="(item, idx) in asetFnAcTtList" :key="idx">
								<a href="javascript:void(0);" @click.prevent="fn_openAcDetailPop(item)">
									<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
									<div>
										<strong class="org">{{item.acWrsnm}}</strong>
										<strong class="account">{{item.mydtAcno}}</strong>
									</div>
									<strong class="num">{{item.acNowBac | numberFilter}}원</strong>
								</a>
							</li>
						</ul>
					</template>
					<template v-else>
						<h2 class="title">예금</h2>
						<a href="javascript:void(0);" class="savings" @click.prevent="openAssetConPop('bank')">입출금, 예적금 확인하기</a>
					</template>
				</div>

				<!--페이/포인트-->
				<div class="board_box assets_detail">
					<template v-if="asetFnPayPntTtcn > 0">
						<h2>페이/포인트<span class="num">{{asetFnPayPntTtcn | numberFilter}}</span></h2>
						<div class="analysis" :class="indAsetFnPayPntAmSum > 0 ? 'up' : indAsetFnPayPntAmSum < 0 ? 'down' : ''">
							<p class="num">{{asetFnPayPntAmSum | numberFilter}}원</p>

							<!-- !!!!!!!!!!!!!!!!!!!!!!!! -->
							<p class="latter" v-if="indAsetFnPayPntAmSum > 0 || indAsetFnPayPntAmSum < 0">
								지난달보다 {{Math.abs(indAsetFnPayPntAmSum) | numberFilter}}원<em> {{indAsetFnPayPntAmSum > 0 ? '늘었어요.' : '줄었어요.'}}</em>
							</p>
							<p class="latter" v-else>
								지난달과 <em>동일해요.</em>
							</p>
						</div>

						<ul class="assets_list">
							<li v-for="(item, idx) in asetFnPayPntTtList" :key="idx">
								<a v-if="item.type != 'CD_PNT'" href="javascript:void(0);" @click.prevent="fn_openPayDetailPop(item)">
									<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
									<div>
										<strong class="org">{{item.pntNm}}</strong>
									</div>
									<strong class="num">{{item.pntAmt | numberFilter}}원</strong>
								</a>
								<div v-else>
									<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
									<div>
										<strong class="org">{{item.pntNm}}</strong>
									</div>
									<strong class="num">{{item.pntAmt | numberFilter}}원</strong>
								</div>
							</li>
						</ul>
					</template>
					<template v-else>
						<h2 class="title">페이/포인트</h2>
						<a href="javascript:void(0);" class="pay" @click.prevent="openAssetConPop('efin')">숨은 포인트 찾기</a>
					</template>
				</div>
			</section>
		</div>
		<!--// content E -->
					
		<footersV2 type="as" />
    </page>
    <!--// content-view E -->
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import {mapGetters, mapActions} from 'vuex'
import {dateFormat} from '@/utils/date'

import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002'
import ASAC4102 from '@/views/page/AS/AC/ASAC4102/ASAC4102'
import ASAC1103 from '@/views/page/AS/AC/ASAC1103/ASAC1103'
import ASAC1104 from '@/views/page/AS/AC/ASAC1104/ASAC1104'
import ASAC1105 from '@/views/page/AS/AC/ASAC1105/ASAC1105'
import ASAC1106 from '@/views/page/AS/AC/ASAC1106/ASAC1106'
import ASPT2002 from '@/views/page/AS/PT/ASPT2002/ASPT2002'

export default {
	name : "ASTA4C01",
	data: () => {
		return {
			cusnm               : "",
			finalUpdateDtm  	: '',		// 최근 자산 업데이트 시기
			asetFnAcAmSum       : 0,		// 자산계좌 총금액
			asetFnAcTtcn        : 0,		// 자산계좌 총건수
			bfAsetFnAcAmSum     : 0,		// 이전계좌 총금액
			indAsetFnAcAmSum    : 0,		// 증감계좌 총금액

			asetFnPayPntAmSum   : 0,		// 자산페이/포인트 총금액
			asetFnPayPntTtcn    : 0,		// 자산페이/포인트 총건수
			bfAsetFnPayPntAmSum : 0,		// 이전페이/포인트 총금액
			indAsetFnPayPntAmSum: 0,		// 증감페이/포인트 총금액

			ntAsetTotAm 		: 0,		// 순자산금액
			bfNtAsetTotAm		: 0,		// 이전순자산금액
			indAsetTotAm		: 0,		// 증감순자산금액

			asetTabs			: [],	  	// 일반모드 설정 자산 영역 노출 순서

			///// 자산 노출 목록영역 /////
			asetFnAcTtList		: [],		// 예금리스트
			asetFnPayPntTtList	: [],		// 페이/포인트리스트
		}
	},
	computed : {
		...mapGetters('myassets', [
			'isMyAssetGathering','lastUpdateDtm'
		]),
	},
	mixins: [
		commonMixin
	],
	created() {
		//초기데이타 선언
		this.cusnm = this.getUserInfo("cusnm")
	},
	mounted() {
		this.initComponent()
		this.listenSubscribe() //자산수집 뮤테이션 처리용
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
	},
	methods: {
		...mapActions('myassets', [
			'getAllMyAssetInfo'
		]),            
		initComponent() {

			Promise.all([
				this.getData(),
				this.getMyAssetAdsv()
			])
		},
		getData() {
			///////////////////////////////////
			// 총자산 / 증감 (임시 사용)
			const config = {
				// url: '/as/as/00ra2',
				url: '/ma/ma/01r03',
				data: {
					mydtCusno : this.getUserInfo('mydtCusno'),
					basYm : dateFormat(new Date(), 'YYYYMM'),
					mainFlag : '0',
				}
			}
			apiService.call(config).then(async response =>{
				this.respInfo = response

				this.asetFnAcAmSum          = this.respInfo?.myAssetInfo?.asetFnAcAmSum         || 0 // 금융자산계좌금액합계
                this.asetFnAcTtcn           = this.respInfo?.myAssetInfo?.asetFnAcTtcn          || 0 // 금융자산계좌건수
                this.bfAsetFnAcAmSum        = this.respInfo?.myAssetInfo?.bfAsetFnAcAmSum       || 0 // 이전금융자산계좌금액
                this.indAsetFnAcAmSum       = this.respInfo?.myAssetInfo?.indAsetFnAcAmSum      || 0 // 증감금융자산계좌금액

				this.asetFnPayPntAmSum      = this.respInfo?.myAssetInfo?.asetFnPayPntAmSum     || 0 // 금융자산페이머니금액
				this.asetFnPayPntTtcn       = this.respInfo?.myAssetInfo?.asetFnPayPntTtcn      || 0 // 금융자산페이머니건수
				this.bfAsetFnPayPntAmSum    = this.respInfo?.myAssetInfo?.bfAsetFnPayPntAmSum   || 0 // 이전금융자산페이/포인트합계
				this.indAsetFnPayPntAmSum   = this.respInfo?.myAssetInfo?.indAsetFnPayPntAmSum  || 0 // 증감금융자산페이/포인트합계

				// 순자산
				// ** 청소년 : 예금 총 금액 + 페이/포인트 총 금액
				this.ntAsetTotAm 			= this.asetFnAcAmSum + this.asetFnPayPntAmSum		// 순자산
				this.bfNtAsetTotAm			= this.bfAsetFnAcAmSum + this.bfAsetFnPayPntAmSum	// 이전순자산
				this.indAsetTotAm			= this.indAsetFnAcAmSum + this.indAsetFnPayPntAmSum	// 증감순자산
			})
		},
		/**
		 * 계좌 목록조회 (NH콕마이데이터4.0 추가정보 조회)
		 */
		getMyAssetAdsv() {
			const config = {
				url: '/as/as/00ra3',
				data: {
					"mydtCusno" : this.getUserInfo('mydtCusno')
					// mydtCusno: '2000003756'
				}
			}
			apiService.call(config).then(response =>{
				//예금
				// this.asetFnAcTtcn 	= response.totAccn || 0		// 예금 총 건수
				// this.asetFnAcAmSum	= response.acBalttAm || 0	// 예금 총 금액
				response.rndaAcList?.forEach(item => {
					item.type = 'RNDA'
				})
				response.dpAcList?.forEach(item => {
					item.type = 'DPAC'
				})
				response.isAcList?.forEach(item => {
					item.type = 'ISAC'
				})
				response.fcAcList?.forEach(item => {
					item.type = 'FCAC'
				})
				this.asetFnAcTtList = [...response.rndaAcList || [], ...response.dpAcList || [], ...response.isAcList || [], ...response.fcAcList || []]

				// 페이/포인트
				// this.asetFnPayPntTtcn = response.payMnyAccn + response.ppaycdcn + response.cardPntcn || 0	// 페이/포인트 총 건수
				// this.asetFnPayPntAmSum = response.payMnyAcBaltt + response.ppaycdBaltt + response.cardPntBaltt || 0	// 페이/포인트 총 금액
				response.payMnyAcList?.forEach(item => {
					item.pntNm = item.faceOnm // 포인트명
					item.pntAmt = item.eltfncTotBac // 포인트금액
					item.type = 'PAY' // 타입
				})
				response.ppaycdList?.forEach(item => {
					item.pntNm = item.ppayCdnm // 포인트명
					item.pntAmt = item.ppaycdTotBac // 포인트금액
					item.type = 'CARD' // 타입
				})
				response.cardPntList?.forEach(item => {
					item.pntNm = item.pntnm // 포인트명
					item.pntAmt = item.rmPnt // 포인트금액
					item.type = 'CD_PNT'
				})

				this.asetFnPayPntTtList = [...response.payMnyAcList || [], ...response.ppaycdList || [], ...response.cardPntList || []]

				// 순자산
				// ** 청소년 : 예금 총 금액 + 페이/포인트 총 금액
				// this.ntAsetTotAm = this.asetFnAcAmSum + this.asetFnPayPntAmSum

			})
		},
		/**
		 * 예금 상세화면이동
		 */
		fn_openAcDetailPop(item) {
			let compName = ''
			switch(item.type) {
				case 'RNDA':
					compName = ASAC4102	// 입출금
					break
				case 'DPAC':
					compName = ASAC1103	// 예금
					break
				case 'ISAC':
					compName = ASAC1104	// 적금
					break
				case 'FCAC':
					compName = ASAC1105	// 외화
					break
				default: return
			}

			// 전달파라미터 세팅
			let popupParam = item
			popupParam.mydtCusno = this.getUserInfo('mydtCusno')

			const config = {
				component: compName,
				params: {"objAccInfo": popupParam}
			}
			modalService.openPopup(config)
		},
		/**
		 * 페이/포인트 상세화면이동
		 */
		fn_openPayDetailPop(item) {
			let component = null
			let popupParam = {}
			if(item.type == 'PAY') {
				// 페이머니
				popupParam = {
					mydtCusno 	: this.getUserInfo('mydtCusno'),	// 마이데이터고객번호
					infOfrmnOrgC: item.infOfrmnOrgC,				// 기관코드
					faceNo 		: item.faceNo,						// 권면번호
					accIdVal 	: item.accIdVal						// 계정식별값
				}
				component = ASAC1106
			} else {
				// 선불카드
				popupParam = {
					mydtCusno 	: this.getUserInfo('mydtCusno'),	// 마이데이터고객번호
					infOfrmnOrgC: item.infOfrmnOrgC,				// 기관코드
					mydtCdIdVal : item.mydtCdIdVal					// 카드식별자
				}
				component = ASPT2002
			}

			const config = {
				component: component,
				params : {objAccInfo: popupParam}
			}
			modalService.openPopup(config)
		},

		/**
		 * 화면이동
		 */
		fn_movePage(menu) {
			const config = {
				name: menu
			}
			
			if (menu === 'ASRE4001') {
				config.params = {
					rlestTtAm : this.asetRlthRlestAm
				}
			}	
			//console.log('## config ##', config)			
			commonService.movePage(config)
		},

		/*
		* 자산 수집 호출 (기관코드 0000000000은 ==> 전체 수집 의미)
		*/
		fn_refreshApiCall() {
			this.getAllMyAssetInfo()
		},
		// 자산수집 mutation 이벤트 감지 
		listenSubscribe() {
			this.getGatheringListenSubscribe()
			// this.subscribe = this.$store.subscribe((mutation, state) => {
			//     const isMyAssetGathering = mutation.type === 'myassets/completeMyAssetGatherData'
			//     // 예금 전체조회
			//     if (isMyAssetGathering) {
			//         console.log('자산수집 subscribe  ###############################', mutation, state)
			//         this.getData()
			//     }
			// })
		},
		/**
		 * 자산연결팝업 호출
		 */
		openAssetConPop(orgDsc) {
			const config = {
				component: COAR4002,
				params: {
					isExternal: true,
					orgDsc: orgDsc
				}
			}
			modalService.openPopup(config).then(() => {
				if(response === 'move' || response === true) {
					this.initComponent()
				}
			})
		}
	},
	components : {
		Page,
		FootersV2
	}
}
</script>