<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 인증방법선택
* @ 페이지설명 : 인증방법선택
* @ 파일명     : src/views/page/CO/AR/COAR4003/COAR4003.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-03-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-10              CS540685              상호금융 NH콕마이데이터 4.0 추진 개발 (COAR2003 → COAR4003)
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01">

		<div class="popup_header">
			<h1>인증방법선택</h1>
		</div>

		<div class="popup_content">

			<div class="certi_cont">
				<h2 class="headline">
					{{parameters.subTitle}}<br>
					<strong>인증 방법을 선택해 주세요.</strong>
				</h2>

				<ul class="certi_list">
					<li v-for="(item, idx) in parameters.useCertList" :key="idx">
						<a href="javascript:void(0);" :class="'item ' + item" role="button" @click="fn_nextProcess(item)">
							<p class="title">{{certs[item].certNm}}</p>
							<span v-if="item == 'joint'" class="tag blue">{{jointCertGbnName}}</span>
							<span v-else-if="item == 'nh'" class="tag blue">{{nhMobileCertGbnName}}</span>
						</a>
					</li>
				</ul>
			</div>

		</div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click="fn_close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
/*eslint-disable */
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import {dateFormat} from '@/utils/date'

import _ from 'lodash'

import COAR2011 from '@/views/page/CO/AR/COAR2011/COAR2011.vue'
import COAR2012 from '@/views/page/CO/AR/COAR2012/COAR2012.vue'
import COAR2018 from '@/views/page/CO/AR/COAR2018/COAR2018.vue'
import COAR4037 from '@/views/page/CO/AR/COAR4037/COAR4037.vue'
import COAR4038 from '@/views/page/CO/AR/COAR4038/COAR4038.vue'

// import COAR4043 from '@/views/page/CO/AR/COAR4043/COAR4043.vue'

export default {
    name : "COAR4003",
    data: () => {
        return {

			parameters: {
				title: "",
				subTitle: "",
				useCertList: ["joint", "nh", "finance", "pass"],
			},

			certs: {
				"joint": {"certDsc": "joint", "certNm": "공동인증서"},
				"nh": {"certDsc": "nh", "certNm": "NH모바일인증서"},
				"finance": {"certDsc": "finance", "certNm": "금융인증서"},
				"pass": {"certDsc": "pass", "certNm": "PASS인증서"},
			},

			jointCertList: [],
			jointCertGbn: "2",	// 인증서 보유 여부에 따른 구분 (1 : 보유중, 2 : 미보유, 3 : 기간만료) - 20221114 아이폰 인증서 오류 대응으로 default 미보유 설정

			nhMobileCertGbn: "2",
			nhMobileCustNo: "",	// NH모바일인증용 고객번호

			certDsc: "",

			isLocal : window.location.host.indexOf('localhost') > -1 ? true : false,
        }
	},
	beforeMount() {
		
	},
    mounted() {
		this.initComponent(this.params);
        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    mixins: [
		commonMixin,
        popupMixin
	],
	computed:{
		jointCertGbnName() {
			let r = "";
			switch (this.jointCertGbn) {
				case "1":
					r = "보유중";
					break;
				case "2":
					r = "미보유";
					break;
				default:
					r = "기간만료";
					break;
			}
			return r;
		},

		nhMobileCertGbnName() {
			let r = "";
			switch (this.nhMobileCertGbn) {
				case "1":
					r = "보유중";
					break;
				case "2":
					r = "미보유";
					break;
				default:
					r = "기간만료";
					break;
			}
			return r;
		},
	},
    methods: {
        initComponent(params = {}) {
			this.parameters = {...this.parameters, ...params};

			this.getData();
        },

        getData() {
			if (this.parameters.useCertList.includes("joint")) {
				this.fn_getCertList();
			}
			if (this.parameters.useCertList.includes("nh")) {
				this.fn_checkNhMobileCert();
			}
		},

		fn_getCertList() {
			if (window.location.host.indexOf('localhost') > -1) {
				this.jointCertList = [
				];

				// 인증서 보유 여부 판단
				this.jointCertGbn = (this.jointCertList.length > 0) ? "1" : "2";
				
				// 전체 인증서 만료 판단
				if (this.jointCertList.length > 0) {
					let certExprCnt = 0;
					for (const certItem of this.jointCertList) {
						if (certItem.today >= certItem.expireDate) {
							certExprCnt++;
						}
					}
					this.jointCertGbn = (certExprCnt === this.jointCertList.length) ? "3" : this.jointCertGbn;
				}
			} else {
				if (this.getUserInfo('chnl') === '385') {
					// 스뱅
					appService.getCertList().then(response => {
						this.jointCertList = response.result || [];
						this.jointCertList = this.fn_filterMyCert(this.jointCertList) || [];
						if (this.jointCertList.length > 0) {
							for (let i=0; i<this.jointCertList.length; i++) {
								this.jointCertList[i].notAfter = dateFormat(this.jointCertList[i].notAfter.replace(/[^0-9]/gi, ''), 'YYYY년 MM월 DD일' );
							}
						}
						this.jointCertGbn = (this.jointCertList.length > 0) ? "1" : "2";
						
						// 전체 인증서 만료 판단
						if (this.jointCertList.length > 0) {
							let certExprCnt = 0;
							for (const certItem of this.jointCertList) {
								if (certItem.today >= certItem.expireDate) {
									certExprCnt++;
								}
							}
							this.jointCertGbn = (certExprCnt === this.jointCertList.length) ? "3" : this.jointCertGbn;
						}
					});
				} else {
					// 콕뱅
					appService.cokBankGetCertList().then(response => {
						this.jointCertList = JSON.parse(response.result) || [];
						this.jointCertList = this.fn_filterMyCert(this.jointCertList) || [];
						this.jointCertGbn = (this.jointCertList.length > 0) ? "1" : "2";
						
						// 전체 인증서 만료 판단
						if (this.jointCertList.length > 0) {
							let certExprCnt = 0;
							for (const certItem of this.jointCertList) {
								if (certItem.today >= certItem.expireDate) {
									certExprCnt++;
								}
							}
							this.jointCertGbn = (certExprCnt === this.jointCertList.length) ? "3" : this.jointCertGbn;
						}
					});
				}
			}
		},
		
		fn_filterMyCert(response) {
            const isProduct = import.meta.env.VITE_ENV === 'R';	// 운영
            const jointCertList = response || []; // App 에서 받은 인증서 리스트
            const userName = this.getUserInfo('cusnm') || ''; // 로그인 사용자 이름
			let filterList = [];
			
			if (isProduct) {
				// 운영
				filterList = jointCertList
				.map(d => {
					return {
						...d,
						today: dateFormat(new Date(), 'YYYYMMDD'),
						expireDate: (d.notAfter || '').replace(/[^0-9]/gi, '') // '2020년 09월 11일' -> '20200911'
					}
				})
				.filter(d => (d.subjectDn || '').includes(userName)); // 본인 인증서 체크
			} else {
				filterList = jointCertList
				.map(d => {
					return {
						...d,
						today: dateFormat(new Date(), 'YYYYMMDD'),
						expireDate: (d.notAfter || '').replace(/[^0-9]/gi, '') // '2020년 09월 11일' -> '20200911'
					}
				});
			}

            return filterList;
		},

		fn_checkNhMobileCert() {
			if (window.location.host.indexOf('localhost') > -1) {

			} else {
				const params = {
					"RA_CERT_DCD" : "001",
					"RQST_CHNL_DCD": this.getUserInfo('chnl') === '385'? "NHSP" : "NHSB",
				};
	
				if(this.getUserInfo('chnl') === '385') { // 스뱅
					appService.checkNHCert(params).then(response => {
						let result = response.result.result;
						// AOS는 파싱이 필요하고, IOS는 파싱이 불필요함
						// AOS는 될거고, IOS는 catch로 빠짐
						// 스뱅만 result로 한번 더 묶여 있음
						try { result = JSON.parse(response.result.result); } catch (e) { }
	
						if (response.result.resultCode === 0 ) {
							this.nhMobileCertGbn = "1";
							this.nhMobileCustNo = result?.CUST_NO || this.getUserInfo('crmCusno')
							// modalService.alert("존재 > " + result.CUST_NAME);
						} else {
							// 실제 사용할때는 resultCode가 '1'면 모두 '인증서가 없습니다' 팝업으로 찍으세요~
							// modalService.alert("appService::(SB)checkNHCert error > " + result.msg);
						}
						
					});
				} else { // 콕뱅
					appService.cokBankCheckNHCert(params).then(response => {
						let result = response.result;
						// AOS는 파싱이 필요하고, IOS는 파싱이 불필요함
						// AOS는 될거고, IOS는 catch로 빠짐
						try { result = JSON.parse(response.result); } catch (e) { }
	
						if ( response.resultCode == 0 ) {
							this.nhMobileCertGbn = "1";
							this.nhMobileCustNo = result?.CUST_NO || this.getUserInfo('crmCusno')
							// modalService.alert("존재 > " + result.CUST_NAME);
						} else {
							// 실제 사용할때는 resultCode가 '1'면 모두 '인증서가 없습니다' 팝업으로 찍으세요~
							// modalService.alert("appService::(CB)checkNHCert error > " + result.msg);
						}
					});
				}
				
			}
		},

		fn_close(response = {}) {
			this.close(response);
		},

		fn_nextProcess(certDsc) {
			this.certDsc = certDsc;
			let component = "";
			switch (certDsc) {
				case "nh": 
					if(this.nhMobileCertGbn == '1') {
						component = COAR4038;
					} else {
						component = COAR4037;
					}

					break;
				case "joint":
					if (this.jointCertGbn == "1") {
						component = COAR2011;
					} else {
						if (this.isLocal) {
							component = COAR2011;
						} else {
							component = COAR2018;
						}
					}
					break;
				case "finance":
					component = COAR2011;
					break;
				case "pass":
					component = COAR2012;
					break;
				default:
					break;

			}
			this.fn_openCertTermSlide({
				"renderer": {"component": component},
				"params": {"certDsc": certDsc},
			});
		},

		fn_openCertTermSlide(config) {
			modalService.openSlidePagePopup(config).then(response => {
				if (this.certDsc == "joint" || this.certDsc == "finance") {
					if (response == "OK") {
						this.fn_close({ "certDsc": this.certDsc });
					}
				} else if(this.certDsc == "nh") {
					if (response == "OK") {
						this.fn_close({ "certDsc": this.certDsc, "custNo": this.nhMobileCustNo });
					}
				} else if (this.certDsc == "pass") {
					if (response == "agree") {
						this.fn_close({ "certDsc": this.certDsc });
					}
				}
			});
		},

    },

    components : {
		
    },
}


</script>