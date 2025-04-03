<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 예금
* @ 페이지설명 : 큰글모드 > 자산 > 예금
* @ 파일명     : src/views/page/AS/TA/ASTA4S02/ASTA4S02.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-12             CS541597               ASAC2001 -> ASTA4S02 예금 큰글씨모드 신규
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>예금</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">

				<div class="board_box" v-if="rndaAccn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">입출금<em>{{rndaAccn | numberFilter}}</em></span>
							<span class="num"><em>{{rndaAcBaltt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
								<li v-for="(item, idx) in rndaAcList" :key="idx">
									<a href="javascript:void(0);" @click.prevent="fn_openDetailPop('RNDA', item)">
										<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
										<div>
											<strong class="org">{{item.acWrsnm}}</strong>
											<strong class="account">{{item.mydtAcno}}</strong>
										</div>
										<strong class="num"><em>{{item.acNowBac | numberFilter}}</em>원</strong>
									</a>
									<span v-if="item.acNowBac < 0" class="txt_info">마이너스 통장 대출잔액은 대출에서만 합산됩니다.</span>
								</li>
							</ul>
							<!-- <a href="javascript:void(0);" class="btns lg" v-if="rndaAccn > 3 && !moreRndaAcYn" @click.prevent="fn_showMore('RNDA')">더보기</a> -->
							<div class="btns_wrap" v-if="rndaAccn > 3 && !moreRndaAcYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('RNDA')">입출금계좌 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="dpAccn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">예금<em>{{dpAccn | numberFilter}}</em></span>
							<span class="num"><em>{{dpAcBaltt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
								<li v-for="(item, idx) in dpAcList" :key="idx">
									<a href="javascript:void(0);" @click.prevent="fn_openDetailPop('DPAC', item)">
										<i class="ico_bank" :class="item.infOfrmnOrgC"></i>
										<div>
											<strong class="org">{{item.acWrsnm}}</strong>
											<div class="inbox">
												<strong class="account">{{item.mydtAcno}}</strong>
												<span class="pin green" v-if="item.dueDt !== null">{{item.dueDds > 0 ? 'D-'+item.dueDds : '만기'}}</span>
											</div>
										</div>
										<strong class="num"><em>{{item.acNowBac | numberFilter}}</em>원</strong>
									</a>
								</li>
							</ul>
                            <!-- <a href="javascript:void(0);" class="btns lg" v-if="dpAccn > 3 && !moreDpAcYn" @click.prevent="fn_showMore('DPAC')">더보기</a> -->
							<div class="btns_wrap" v-if="dpAccn > 3 && !moreDpAcYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('DPAC')">예금계좌 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="isAccn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">적금<em>{{isAccn | numberFilter}}</em></span>
							<span class="num"><em>{{isAcBaltt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
								<li v-for="(item, idx) in isAcList" :key="idx">
									<a href="javascript:void(0);" @click.prevent="fn_openDetailPop('ISAC', item)">
										<i class="ico_bank" :class="item.infOfrmnOrgC"></i>
										<div>
											<strong class="org">{{item.acWrsnm}}</strong>
											<div class="inbox">
												<strong class="account">{{item.mydtAcno}}</strong>
												<span class="pin green" v-if="item.dueDt !== null">{{item.dueDds > 0 ? 'D-'+item.dueDds : '만기'}}</span>
											</div>
										</div>
										<strong class="num"><em>{{item.acNowBac | numberFilter}}</em>원</strong>
									</a>
								</li>
							</ul>
                            <!-- <a href="javascript:void(0);" class="btns lg" v-if="isAccn > 3 && !moreIsAcYn" @click.prevent="fn_showMore('ISAC')">더보기</a> -->
							<div class="btns_wrap" v-if="isAccn > 3 && !moreIsAcYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('ISAC')">적금계좌 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="fcAccn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">외화<em>{{fcAccn | numberFilter}}</em></span>
							<span class="num"><em>{{fcAcBaltt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
								<li v-for="(item, idx) in fcAcList" :key="idx">
									<a href="javascript:void(0);" @click.prevent="fn_openDetailPop('FCAC', item)">
										<i class="ico_bank" :class="item.infOfrmnOrgC"></i>
										<div>
											<strong class="org">{{item.acWrsnm}}</strong>
											<strong class="account">{{item.mydtAcno}}</strong>
										</div>
										<strong class="num"><em>{{item.acNowBac | numberFilter}}</em>원</strong>
									</a>
								</li>
							</ul>
                            <!-- <a href="javascript:void(0);" class="btns lg" v-if="fcAccn > 3 && !moreFcAcYn" @click.prevent="fn_showMore('FCAC')">더보기</a> -->
							<div class="btns_wrap" v-if="fcAccn > 3 && !moreFcAcYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('FCAC')">외화계좌 더보기</button>
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

	import ASAC4102 from '@/views/page/AS/AC/ASAC4102/ASAC4102'
    import ASAC1103 from '@/views/page/AS/AC/ASAC1103/ASAC1103'
    import ASAC1104 from '@/views/page/AS/AC/ASAC1104/ASAC1104'
    import ASAC1105 from '@/views/page/AS/AC/ASAC1105/ASAC1105'

	export default {
		name: 'ASTA4S02',
		data: () => {
			return {
                respInfo      : {},

                rcnInqDtm     : 0,      //최근조회일시
                acBalttAm     : 0,      //계좌잔액합계금액
                totAccn       : 0,      //전체계좌수
                rndaAccn      : 0,      //입출금계좌수
                rndaAcBaltt   : 0,      //입출금계좌잔액합계
                rndaAcList    : [],     //입출금리스트
                dpAccn        : 0,      //예금계좌수
                dpAcBaltt     : 0,      //예금계좌잔액합계
                dpAcList      : [],     //예금리스트
                isAccn        : 0,      //적금계좌수
                isAcBaltt     : 0,      //적금계좌잔액합계
                isAcList      : [],     //적금리스트
                fcAccn        : 0,      //외화계좌수
                fcAcBaltt     : 0,      //외화계좌잔액합계
                fcAcList      : [],		//외화리스트

                moreRndaAcYn  : false,  //입출금계좌 더보기 선택여부
                moreDpAcYn    : false,  //예금계좌 더보기 선택여부
                moreIsAcYn    : false,  //적금계좌 더보기 선택여부
                moreFcAcYn    : false,  //외화계좌 더보기 선택여부
			}
        },
		mixins: [
			commonMixin,
            popupMixin
		],        
		computed: {
                   
        },
		created() {
            
		},
		mounted() {
            this.initComponent()

            // 자산수집 mutation 이벤트 감지 
            this.getGatheringListenSubscribe()

            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
		},        
		methods: {
            initComponent() {
                this.getData()
            },
            getData() {
                ///////////////////////////////////
                // 계좌목록 조회 
                const config = {
                    url: '/as/ac/01r03', 
					data: {
                        mydtCusno : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config).then(response =>{
                    this.respInfo = response

                    //입출금
                    this.rndaAccn    = this.respInfo.rndaAccn     //입출금계좌수
                    this.rndaAcBaltt = this.respInfo.rndaAcBaltt  //입출금계좌합계
                    this.rndaAcList  = this.respInfo.rndaAcList || []  //입출금계좌목록
                    this.rndaAcList  = this.rndaAccn > 3 && !this.moreRndaAcYn 
										? this.rndaAcList.slice(0, 3) : this.rndaAcList    // 첫 진입시 입출금계좌목록 보여주기 개수제한

                    //예금
                    this.dpAccn    = this.respInfo.dpAccn     //예금계좌수
                    this.dpAcBaltt = this.respInfo.dpAcBaltt  //예금계좌잔액합계
                    this.dpAcList  = this.respInfo.dpAcList || []   //예금계좌목록
                    this.dpAcList  = this.dpAccn > 3 && !this.moreDpAcYn
										? this.dpAcList.slice(0, 3) : this.dpAcList    // 첫 진입시 예금계좌목록 보여주기 개수제한

                    //적금
                    this.isAccn    = this.respInfo.isAccn     //적금계좌수
                    this.isAcBaltt = this.respInfo.isAcBaltt  //적금계좌잔액합계
                    this.isAcList  = this.respInfo.isAcList || []   //적금계좌목록
                    this.isAcList  = this.isAccn > 3 && !this.moreIsAcYn 
										? this.isAcList.slice(0, 3) : this.isAcList    // 첫 진입시 적금계좌목록 보여주기 개수제한

                    //외화
                    this.fcAccn    = this.respInfo.fcAccn     //외화계좌수
                    this.fcAcBaltt = this.respInfo.fcAcBaltt  //외화계좌잔액합계
                    this.fcAcList  = this.respInfo.fcAcList || []   //외화계좌목록
                    this.fcAcList  = this.fcAccn > 3 && !this.moreFcAcYn 
										? this.fcAcList.slice(0, 3) : this.fcAcList    // 첫 진입시 외화계좌목록 보여주기 개수제한

                    //전체계좌잔액 합계금액
                    this.totAccn   = this.respInfo.totAccn
                    this.acBalttAm = this.respInfo.acBalttAm
                })
            },

            /**
             * 더보기 선택 이벤트
             */
            fn_showMore(type) {
                if(type === 'RNDA') {   // 입출금
                    this.rndaAcList = this.respInfo.rndaAcList
                    this.moreRndaAcYn = true
                } else if(type === 'DPAC') {    // 예금
                    this.dpAcList = this.respInfo.dpAcList
                    this.moreDpAcYn = true
                } else if(type === 'ISAC') {    // 적금
                    this.isAcList = this.respInfo.isAcList
                    this.moreIsAcYn = true
                } else if(type === 'FCAC') {    // 외화
                    this.fcAcList = this.respInfo.fcAcList
                    this.moreFcAcYn = true
                }
            },

            /*
            * 상세화면이동.
            */
            fn_openDetailPop(type, deposit) {

                let compName = ""
                if(type == "RNDA") { 
                    compName = ASAC4102 //입출금
                } else if(type == "DPAC") {
                    compName = ASAC1103 //예금
                } else if(type == "ISAC") {
                    compName = ASAC1104 //적금
                } else if(type == "FCAC") {
                    compName = ASAC1105 //외화
                }

                // 전달파라미터 세팅
                let popupParam = deposit
                popupParam.mydtCusno = this.getUserInfo('mydtCusno') //마이데이터고객번호

                const config = {
                    component: compName,
                    params : {"objAccInfo" : popupParam}
                }
				modalService.openPopup(config).then(() => {
                    this.getData()
                })

				////////////////
                // 일반모드 연결 필요
                ////////////////
				// let popNm = ''
				// if (type === 'RNDA') {
				// 	popNm = '입출금'
				// } else if (type === 'DPAC') {
				// 	popNm = '예금'
				// } else if (type === 'ISAC') {
				// 	popNm = '적금'
				// } else if (type === 'FCAC') {
				// 	popNm = '외화'
				// }
				// console.log('asis 팝업 파라미터 >> ', popupParam)
				// this.alert(popNm + '(일반모드) 상세 팝업 연결예정')
            },

		}
    }
    
</script>

