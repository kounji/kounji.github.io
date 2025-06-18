<!--
/*************************************************************************
* @ 서비스경로 : 설정/관리 > 알림관리
* @ 페이지설명 : 설정/관리 > 알림관리
* @ 파일명     : src/views/page/MR/CO/MRCO2001/MRCO2001.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-10-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-18             CS528069                 최초작성
* 2023-08-08             CS533457              상호금융 마이데이터 확대 개발 MR/CO/MRCO1001/MRCO1001.vue -> MR/CO/MRCO2001/MRCO2001.vue 변경
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">알림함</h1>
		</div>
		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="custom_box custom_box_alrim mt5">
					
					<!-- 리스트 -->
					<template v-if="ancList.length > 0">
						<ul class="list_type_03">
							<li v-for="(ancItem, ancIdx) in ancList" :key="'anc_'+ancIdx">
								<template v-if="ancItem.apLkUrlnm1 == ''">
									<a href="javascript:void(0);" :class="fn_setAncClass(ancItem) + ' btn_off'" aria-disabled="true">
										<div>
											<span class="tit">{{fn_setAncTit(ancItem)}}</span>
											<em>
												{{ancItem.ancCntn}}
											</em>
											<span class="num">{{ancItem.dataCrtDt | dateFilter('YYYY.MM.DD')}}</span>
										</div>
									</a>
								</template>
								<template v-else>
									<a href="javascript:void(0);" :class="fn_setAncClass(ancItem)" @click.prevent="movePage(ancItem)">
										<div>
											<span class="tit">{{fn_setAncTit(ancItem)}}</span>
											<em>
												{{ancItem.ancCntn}}
											</em>
											<span class="num">{{ancItem.dataCrtDt | dateFilter('YYYY.MM.DD')}}</span>
										</div>
									</a>
								</template>
							</li>
						</ul>
						<div class="new_add_register infoTxt01 mt24">
							<p>
								<span>알림은 30일 동안 보관됩니다. </span>
							</p>
						</div>
					</template>
					
					<template v-else>
						<div class="custom_box">
							<div class="no_data_box">
								<div class="no_data_list">
									<p>보관된 알림이 없어요.</p>
								</div>
							</div>
						</div>
					</template>
					<!--// 리스트 -->

				</div>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll('MRCO2001')"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'

// import ASAC1003 from '@/views/page/AS/AC/ASAC1003/ASAC1003'
import ASCR4101 from '@/views/page/AS/CR/ASCR4101/ASCR4101'
import COCO1105 from '@/views/page/CO/CO/COCO1105/COCO1105'
import LCIP2007 from '@/views/page/LC/IP/LCIP2007/LCIP2007'

export default {
	name : "MRCO2001",
	data: () => {
		return {
			/*
			* asis)
			* 01 결제예정금액, 02 나의목표, 03 신용정보, 04 공지사항
			* 05 예적금만기, 06 자동차보험만기, 07 대출만기, 08 대출이자상환일
			*/
			/**
			 *  ==> 퍼블 아이콘 클래스 바탕
			 * 09 :: 자산연결
			 * 10 :: 연결기관관리
			 * 11 :: 공지사항
			 * 12 :: 금융자산
			 * 13 :: 부동산
			 * 14 :: 카드결제예정
			 * 15 :: 계좌예상잔액
			 * 16 :: 자산진단
			 * 17 :: 지출내역
			 * 18 :: 정기지출
			 * 19 :: 지출분석
			 * 20 :: 상품추천
			 * 21 :: 목표관리
			 * 22 :: 광고
			 * 23 :: 신용점수
			 */

			ancList     : [],    // 알림목록
			listCheckYn : false, // 체크 여부
			ancAllChkYn : false  // 전체 체크 여부
		}
	},
	mounted() {
		this.initComponent();

		// PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name);
	},
	mixins: [
		commonMixin,
		popupMixin
	],
	methods: {
		initComponent() {
			this.getData();
		},
		getData() {
			// 전체 체크 여부 초기화
			this.listCheckYn = false;
			this.ancAllChkYn = false;

			this.btnShowYn = false;

			const config = {
				url: '/co/co/01ra1',
				data: {
					mydtCusno : this.getMydataCusno(), // 마이데이터고객번호
				}
			}
			apiService.call(config).then(response => {
				let tmpAncList  = response.ancList || []

				// TOBE 이전 알림들 구분코드 일괄 변경
				for(let tmpAncItem of tmpAncList) {
					let numAncDsc = Number(tmpAncItem.asetAmnAncDsc)
					if(numAncDsc < 9 && numAncDsc !== 4 && numAncDsc !== 3) {
						/**
						 * TOBE 이전 알림 구분코드 99로 설정
						 * 단, 공지사항 및 신용점수는 유지
						 */
						tmpAncItem.asetAmnAncDsc = "99"
					}

					this.ancList.push(tmpAncItem)
				}
			})
		},

		// 알림 클래스 구분 설정
		fn_setAncClass(ancItem) {
			/**
			 *  ==> 퍼블 아이콘 클래스 바탕
			 * 09 :: 자산연결		=> bg_list bg01
			 * 10 :: 연결기관관리	=> bg_list bg02
			 * 11 :: 공지사항		=> bg_list bg03		< asis 유지 ("04")
			 * 12 :: 금융자산		=> bg_list bg04
			 * 13 :: 부동산			=> bg_list bg05
			 * 14 :: 카드결제예정	=> bg_list bg06
			 * 15 :: 계좌예상잔액	=> bg_list bg07
			 * 16 :: 자산진단		=> bg_list bg08
			 * 17 :: 지출내역		=> bg_list bg09
			 * 18 :: 정기지출		=> bg_list bg10
			 * 19 :: 지출분석		=> bg_list bg11
			 * 20 :: 상품추천		=> bg_list bg12
			 * 21 :: 목표관리		=> bg_list bg13
			 * 22 :: 광고			=> bg_list bg14
			 * 23 :: 신용점수		=> bg_list bg15		< asis 유지 ("03")
			 */
			let ancDsc = ancItem.asetAmnAncDsc
			let rtnClass = ""

			switch(ancDsc) {
				case "03" :
					rtnClass = "bg_list bg15"
					break;
				case "04" :
					rtnClass = "bg_list bg03"
					break;
				case "09" :
					rtnClass = "bg_list bg01"
					break;
				case "10" :
					rtnClass = "bg_list bg02"
					break;
				case "11" :
					rtnClass = "bg_list bg03"
					break;
				case "12" :
					rtnClass = "bg_list bg04"
					break;
				// case "13" :
				// 	rtnClass = "bg_list bg05"
				// 	break;
				case "14" :
					rtnClass = "bg_list bg06"
					break;
				// case "15" :
				// 	rtnClass = "bg_list bg07"
				// 	break;
				case "16" :
					rtnClass = "bg_list bg08"
					break;
				case "17" :
					rtnClass = "bg_list bg09"
					break;
				case "18" :
					rtnClass = "bg_list bg10"
					break;
				case "19" :
					rtnClass = "bg_list bg11"
					break;
				// case "20" :
				// 	rtnClass = "bg_list bg12"
				// 	break;
				case "21" :
					rtnClass = "bg_list bg13"
					break;
				case "22" :
					rtnClass = "bg_list bg14"
					break;
				case "23" :
					rtnClass = "bg_list bg15"
					break;
				case "99" :
					// asis) 별도 알림
					rtnClass = "bg_list bg03"
					break;
				default : 
					rtnClass = "bg_list bg03"
					break;
			}

			return rtnClass
		},

		// 알림 타이틀 구분 설정
		fn_setAncTit(ancItem) {
			let ancDsc = ancItem.asetAmnAncDsc
			let rtnTit = ""

			switch(ancDsc) {
				case "01" :
					rtnTit = "결제예정금액"
					break;
				case "02" :
					rtnTit = "나의목표"
					break;
				case "03" :
					rtnTit = "신용점수"
					break;
				case "04" :
					rtnTit = "공지사항"
					break;
				case "05" :
					rtnTit = "예적금만기"
					break;
				case "06" :
					rtnTit = "자동차보험만기"
					break;
				case "07" :
					rtnTit = "대출만기"
					break;
				case "08" :
					rtnTit = "대출이자상환일"
					break;
				case "09" :
					rtnTit = "자산연결"
					break;
				case "10" :
					rtnTit = "연결기관관리"
					break;
				case "11" :
					rtnTit = "공지사항"
					break;
				case "12" :
					rtnTit = "금융자산"
					break;
				// case "13" :
				// 	rtnTit = "부동산"
				// 	break;
				case "14" :
					rtnTit = "카드결제예정"
					break;
				// case "15" :
				// 	rtnTit = "계좌예상잔액"
				// 	break;
				case "16" :
					rtnTit = "자산진단"
					break;
				case "17" :
					rtnTit = "지출내역"
					break;
				case "18" :
					rtnTit = "정기지출"
					break;
				case "19" :
					rtnTit = "지출분석"
					break;
				// case "20" :
				// 	rtnTit = "상품추천"
				// 	break;
				case "21" :
					rtnTit = "목표관리"
					break;
				case "22" :
					rtnTit = "광고"
					break;
				case "23" :
					rtnTit = "신용점수"
					break;
				case "99" :
					// asis) 별도 알림
					rtnTit = "기존 알림 메시지"
					break;
				default : 
					rtnTit = ""
					break;
			}

			return rtnTit
		},

		movePage(anc) {
			/*
			* 01 결제예정금액, 02 나의목표, 03 신용정보, 04 공지사항
			* 05 예적금만기, 06 자동차보험만기, 07 대출만기, 08 대출이자상환일
			*/
			/**
			 *  ==> 퍼블 아이콘 클래스 바탕
			 * 09 :: 자산연결	
			 * 10 :: 연결기관관리
			 * 11 :: 공지사항		< asis 유지 ("04")
			 * 12 :: 금융자산	
			 * 13 :: 부동산		    < 삭제
			 * 14 :: 카드결제예정
			 * 15 :: 계좌예상잔액   < 삭제
			 * 16 :: 자산진단	
			 * 17 :: 지출내역	
			 * 18 :: 정기지출	
			 * 19 :: 지출분석	
			 * 20 :: 상품추천	    < 삭제
			 * 21 :: 목표관리	
			 * 22 :: 광고		
			 * 23 :: 신용점수		< asis 유지 ("03")
			 */
			if (anc.asetAmnAncDsc == "03" || anc.asetAmnAncDsc == "04" || anc.asetAmnAncDsc == "23" || anc.asetAmnAncDsc == "11") {
				// 알림구분 :: 신용점수 또는 공지사항일 경우
				let compName = ""
				if(anc.asetAmnAncDsc == "03" || anc.asetAmnAncDsc == "23") {
					compName = ASCR4101
				} else if(anc.asetAmnAncDsc == "04" || anc.asetAmnAncDsc == "11") {
					compName = COCO1105 //해당 공지 SEQ ????
				}

				const config = {
					component : compName,
					params    : {
						ofancId   : anc.ofancId,
						ofancTinm : anc.ancCntn,
						aplStDt   : anc.dataCrtDt
					}
				};
				console.log("config : ",config);
				modalService.openPopup(config).then(() => {
					Object.assign(this.$data, this.$options.data())
					this.getData();
				});
			// } else if(anc.asetAmnAncDsc == "15" || anc.asetAmnAncDsc == "18") {
			// 	// 계좌예상잔액 / 정기지출 알림일 경우 팝업 오픈
			// 	let compName = anc.asetAmnAncDsc == "15" ? ASAC1003 : LCIP1010TAB
			} else if(anc.asetAmnAncDsc == "18") {
				// 정기지출 알림일 경우 팝업 오픈
				let compName = LCIP2007

				const config = {
					component : compName,
				}
				modalService.openPopup(config).then(() => {
					Object.assign(this.$data, this.$options.data())
					this.getData();
				})
			} else {
				if(this.isNull(anc.apLkUrlnm1))  {
					return
				}
				const config = {
					name : anc.apLkUrlnm1
				};

				commonService.movePage(config);
				this.closeAll();
			}
		}
	}
}
</script>