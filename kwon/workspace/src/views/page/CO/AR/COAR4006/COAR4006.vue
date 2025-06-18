<!--
/*************************************************************************
* @ 서비스경로 : 자산연결 > 금융자산 > 한번에 > 공동인증서 선택 및 인증
* @ 페이지설명 : 공동인증서 선택 및 인증
* @ 파일명     : src/views/page/CO/AR/COAR4006/COAR4006.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-04-02
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-04-02              CS540685              상호금융 NH콕마이데이터 4.0 추진 개발
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>인증서 선택</h1>
		</div>
		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<strong class="titH1">
					자산을 가져오기 위해<br>
					공동인증서를 선택해 주세요.
				</strong>
			</div>
			<div class="com_inner">
				<a href="javascript:void(0)" role="button" class="cfc_box" v-for="(certItem, certIdx) in certList" :key="'cert_'+certIdx" @click="fn_certClick(certItem)" ref="certRadio">
					<strong class="name" v-if="certItem.subjectCn">{{userName}}</strong>
					<div class="cfc_detail_box">
						<span class="class_name">발급자</span>
						<strong class="class_detail">{{certItem.issuer}}</strong>
					</div>
					<div class="cfc_detail_box">
						<span class="class_name">용도</span>
						<strong class="class_detail">{{certItem.certPolicy}}</strong>
					</div>
					<div class="cfc_detail_box">
						<span class="class_name">만료일</span>
						<em class="class_detail">{{certItem.notAfter}}</em>
					</div>
				</a>

				<!-- LOCAL TEST -->
				<a href="javascript:void(0)" role="button" class="cfc_box" v-show="isLocal" @click="fn_test()">
					<strong class="name">김농협</strong>
					<div class="cfc_detail_box">
						<span class="class_name">발급자</span>
						<strong class="class_detail">금융결제원</strong>
					</div>
					<div class="cfc_detail_box">
						<span class="class_name">구분</span>
						<strong class="class_detail">은행개인</strong>
					</div>
					<div class="cfc_detail_box">
						<span class="class_name">만료일</span>
						<em class="class_detail">2027.04.05</em>
					</div>
				</a>
				<!-- LOCAL TEST -->

			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="fn_close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import {dateFormat} from '@/utils/date'
import _ from 'lodash'

export default {
    name : "COAR4006",
    data: () => {
        return {
			certList     	: [],	// 인증서리스트
			requestList  	: [],	// 전자서명 req 리스트
			
			////////////////////// 인증서 관련 파라미터 //////////////////////
			signListOne : [],	// 
			signListTwo : [],	//
			caOrgOne	: "",	// 
			caOrgTwo	: "",	//
			signedDataList : [],// 서명 데이터 리스트
			////////////////////////////////////////////////////////////////

			isLocal : window.location.host.indexOf('localhost') > -1 ? true : false,
			userName : '',
			chnl 		: "",	// 채널구분 (스뱅 : '385', 콕뱅 : '386')

        }
	},
    mounted() {
		this.initComponent(this.params);
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    mixins: [
		commonMixin,
        popupMixin
	],
	computed:{
		
	},
    methods: {
        initComponent(params = {}) {
			this.requestList = params.requestList || [];

			this.chnl = this.getUserInfo('chnl');
			this.userName = this.getUserInfo('cusnm') || '';

			this.getData();
        },

        getData() {
			this.getCertList();
		},

		// 핸드폰 인증서 호출
		getCertList(){              
            if(this.chnl === '385'){
                // 스뱅 
                appService.getCertList().then(response => {
					this.certList = response.result || [];
                    this.certList = this.filterCertList(this.certList) || [];
                });
            }else{ 
                // 콕뱅
				appService.cokBankGetCertList().then(response => {
                    this.certList = JSON.parse(response.result) || [];
                    this.certList = this.filterCertList(this.certList) || [];
				});
			}
		},

		// 인증서 필터링
		filterCertList(response) {
			const certList = response || [];						// APP에서 받은 인증서 리스트
			
			let filterList = certList.map(d => {
				return {
					...d,
					today: dateFormat(new Date(), 'YYYYMMDD'),
					expireDate: (d.notAfter || '')
				};
			}).filter(d => d.today <= d.expireDate);
            
			filterList = filterList.filter(d => (d.subjectDn || '').includes(this.userName)); // 본인 인증서 체크
			return filterList;
		},

		// 인증서 클릭
		fn_certClick(item) {
			this.showKeyboard(item)
		},

		// 보안 키패드 보이기
		showKeyboard(item) {
			if(this.chnl === "385") {
                appService.showKeyboard().then(                    
                    response => {
                        const params = {
                            subjectDn: item.subjectDn,	// 인증서 키
							password: response.result.plaintxt,	// 비밀번호
							aesencdata: response.result.aesencdata, // 스크래핑용 비밀번호
							notAfter: String(item.notAfter).replace(/[^0-9]/g, ''), // 인증서 만료일자(숫자만 추출)
						};

                        console.log(' 테스트테스트 스뱅 response : ', response.result)
                        console.log(' 테스트테스트 스뱅 subjectDn : ',  item.subjectDn)
                        console.log(' 테스트테스트 스뱅 password : ',  response.result.plaintxt)
                        console.log(' 테스트테스트 스뱅 aesencdata : ',  item.subjectDn.aesencdata)
                        console.log(' 테스트테스트 스뱅 notAfter : ',  String(item.notAfter).replace(/[^0-9]/g, ''))

						apiService.addLoading("keyboard");
                        console.log('테스트테스트 스뱅 보안 키패드호출 end');
						this.getCertPassConfirm(params, item);
					},
					() => {
                        console.log('테스트테스트 스뱅 보안 키패드호출오류 end');
					}
				)
			} else {
				appService.cokBankShowKeyboard().then(
					response => {
						const params = {
							subjectDn: item.subjectDn, // 인증서 키
                            password: JSON.parse(response.result).plaintxt, // 비밀번호
                            aesencdata: JSON.parse(response.result).aesencdata, // 스크래핑용 비밀번호
                            notAfter: String(item.notAfter).replace(/[^0-9]/g, ''), // 인증서 만료일자(숫자만 추출)
						};
                        console.log(' 테스트테스트 콕뱅 response : ', response.result)
                        console.log(' 테스트테스트 콕뱅 subjectDn : ',  item.subjectDn)
                        console.log(' 테스트테스트 콕뱅 password : ',  response.result.plaintxt)
                        console.log(' 테스트테스트 콕뱅 notAfter : ',  String(item.notAfter).replace(/[^0-9]/g, ''))
                        console.log(' 테스트테스트 콕뱅 보안 키패드호출 end')

						this.getCertPassConfirm(params, item);
					},
					() => {
                        console.log('테스트테스트 콕뱅 보안 키패드호출오류 end');
					}
				)
			}
		},

		// 공동인증서 비밀번호 확인
		getCertPassConfirm(params, item) {
			if(this.chnl === '385') {	// 스뱅
				appService.getCertPassConfirm(params).then(
					response => {
						apiService.removeLoading("keyboard");
                        this.goSign(item, params);
					},
					() => {
						apiService.removeLoading("keyboard");
                        modalService.alert('입력하신 인증서의 비밀번호가 맞지 않습니다.');
					}
				);
			} else {	// 콕뱅
				appService.cokBankGetCertPassConfirm(params).then(response =>{
                    let resultCode = JSON.parse(response.result).resultCode;
                    let resultMsg = JSON.parse(response.result).resultMsg;
                    if (resultCode === 'SUCCESS') {
                        this.goSign(item, params);
                    } else {
                        modalService.alert(resultMsg);
                        return false;
                    }
                })
			}
		},

		// 전자 서명 데이터 생성
		goSign(item, params) {
			this.cert = item;
			this.psnInfo = params;
            for (let i=0; i < this.requestList.length; i++) {
                const requestJson = {
                    "requestList" : this.requestList,
                    "subjectDn" : item.subjectDn,
                    "password" :  params.password
                };
                this.goNative(requestJson);
			}
		},

		// 인증서 전자서명 진행
		goNative(requestJson) {
			this.signListOne = [];
			this.signListTwo = [];
            console.log('테스트테스트 인증서 전자서명 콕뱅 스뱅 start');
			if (this.chnl === '385') {
				// 스뱅
				apiService.addLoading("sign");
				appService.requestSign(requestJson).then(response => {
						apiService.removeLoading("sign");
						this.signedDataList = response.result.signedDataList || [];
						for (let i=0; i < this.signedDataList.length; i++) {
							this.signListOne.push({"orgCode":this.signedDataList[i].orgCode, "signedPersonInfoReq":this.signedDataList[i].signedPersonInfoReq});
							this.signListTwo.push({"orgCode":this.signedDataList[i].orgCode,"signedConsent":this.signedDataList[i].signedConsent});
						}
						this.caOrgOne = response.result.caOrg || '';
						this.caOrgTwo = response.result.caOrg || '';
						this.fn_moveNext();
					},
					() => {
						apiService.removeLoading("sign");
						modalService.alert("해당 인증서에 전자서명 실패하였습니다.");
					}
				)
			} else {
				// 콕뱅
				appService.cokBankRequestSign(requestJson).then(response =>{
					if (response.errorMessage !== undefined) {
						modalService.alert("해당 인증서에 전자서명 실패하였습니다.");
						return false;
					}
					this.signedDataList = JSON.parse(response.result).signedDataList || [];
					for (let i=0; i < this.signedDataList.length; i++) {
						this.signListOne.push({"orgCode":this.signedDataList[i].orgCode,"signedPersonInfoReq":this.signedDataList[i].signedPersonInfoReq});
						this.signListTwo.push({"orgCode":this.signedDataList[i].orgCode,"signedConsent":this.signedDataList[i].signedConsent});
					}
					this.caOrgOne = JSON.parse(response.result).caOrg || '';
					this.caOrgTwo = JSON.parse(response.result).caOrg || '';
					this.fn_moveNext();
				});
			}
		},

		fn_moveNext() {
			this.fn_close({
				"requestList": this.requestList,
				"signListOne": this.signListOne,
				"signListTwo": this.signListTwo,
				"caOrgOne": this.caOrgOne,
				"caOrgTwo": this.caOrgTwo,
			});
		},

		fn_close(response = {}) {
			this.close(response);
		},

		fn_test() {
			this.signListOne = this.requestList.map(t => ({
				"orgCode": t.orgCode,
				"signedPersonInfoReq": "signedPersonInfoReq::" + this.userName,
			}));
			this.signListTwo = this.requestList.map(t => ({
				"orgCode": t.orgCode,
				"signedConsent": "signedConsent::" + JSON.stringify(t).substring(0, 100),
			}));
			this.caOrgOne = "CrossCert";
			this.caOrgTwo = "CrossCert";

			this.fn_close({
				"requestList": this.requestList,
				"signListOne": this.signListOne,
				"signListTwo": this.signListTwo,
				"caOrgOne": this.caOrgOne,
				"caOrgTwo": this.caOrgTwo,
			})
		},
		
    },
    components : {
    }
}


</script>