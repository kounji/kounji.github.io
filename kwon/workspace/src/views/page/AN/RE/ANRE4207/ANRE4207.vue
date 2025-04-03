<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > NH콕부동산 > 부동산 자산관리 메인
* @ 페이지설명 : 더보기 > NH콕부동산 > 부동산 자산관리 메인 > 관심부동산 등록/수정
* @ 파일명     : src/views/page/AN/RE/ANRE4207/ANRE4207.vue
* @ 작성자     : CS528053
* @ 작성일     : 2022-08-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-18              CS528053              최초작성
* 2025-02-17              CS541015              고도화 파일명, UI 변경 및 고도화 개발(ANRE2207.vue -> ANRE4207.vue)
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>관심부동산 등록</h1>
		</div>
		
		<div class="popup_content">
			<div class="com_inner">
				<div class="com_input_type02" @click.prevent="openAptSrch()">
					<input type="search" id="txt01" class="inputClear" name="" v-model="aptNm" ref="aptNm" placeholder="동/단지 명으로 아파트 찾기" title="아파트 찾기" readonly>
					<a href="javascript:void(0);" role="button" class="com_btn_delete"><span class="blind">삭제</span></a>
					<a href="javascript:void(0);" role="button" class="com_btn_search"><span class="blind">검색</span></a>
				</div>
				<template v-if="isAptSrch || isUpt">
					<div class="com_btnselectbox_type01">
						<button type="button" class="com_btnselect_type01" title="면적 선택" @click.prevent="openRlestAreaPop()">
							<span>{{newPytpAreaCntn===""?"면적 선택하세요.":(newPytpAreaCntn+'㎡')}}</span>
						</button>
					</div>

					<div class="market_price_pointbox">
						시세 <strong v-html="fn_hanValue_classDiff(genDlAm, 'com_point_darkblue num')"></strong>
						<span class="txt_gray">한국부동산원</span>
					</div>
					<div class="com_btn_area">
						<a href="javascript:void(0);" role="button" class="com_btn_round" @click.prevent="openRlestDtlPop()">
							<span class="">해당 부동산 상세정보 보기</span>
						</a>
					</div>
				</template>
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" @click.prevent="intInteRlest()">저장</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>

	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import {numberFormat} from '@/utils/number'

import CORE1202 from '@/views/page/CO/RE/CORE1202/CORE1202'     // 아파트 검색 팝업
import CORE1203 from '@/views/page/CO/RE/CORE1203/CORE1203'     // 면적 선택 슬라이드 팝업
import ANRE2203 from '@/views/page/AN/RE/ANRE2203/ANRE2203'     // 부동산 상세(iframe)
import COET1002 from '@/views/page/CO/ET/COET1002/COET1002'     // 부동산 이벤트 슬라이드
import COET1003 from '@/views/page/CO/ET/COET1003/COET1003'     // 부동산 이벤트 응모팝업

export default {
	name : "ANRE4207",
    data: () => {
        return {
            beforeAptHscxIdvdc    : '', 	 // 아파트단지개별코드
			beforeNewPytpAreaCntn : '', 	 // 신평형면적내용
			aptHscxIdvdc 	      : '', 	 // 아파트단지개별코드
			newPytpAreaCntn       : '', 	 // 신평형면적내용
			aptNm			      : '', 	 // 아파트단지명
			genDlAm 	      	  : '',	 // 시세금액
			isAptSrch	 	      : false, // 아파트 검색 여부
            isUpt                 : false,    // 수정여부
        }
    },
    props : {
        
    },
    mixins: [
		popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
	},
	computed : {
		// 등록버튼 활성/비활성
        btnOnOff() {
            return (this.aptNm === "" || this.newPytpAreaCntn === "" || this.aptHscxIdvdc === "") ? "btn_off" : ""
        }
	},
    methods : {
		// 초기화
		initComponent(params) {
            this.isUpt = params.isUpt
            this.aptHscxIdvdc = params.aptHscxIdvdc
            this.newPytpAreaCntn = params.newPytpAreaCntn
            if(this.isUpt) {
                this.getUpdData()
            }
		},
        // 수정시 데이터 조회
        getUpdData() {
            const config = {
                url : "/an/re/02ra1",
				data: {
                    "mydtCusno"         : this.getUserInfo('mydtCusno'),        // 마이데이터고객번호
                    "aptHscxIdvdc"      : this.aptHscxIdvdc,                    // 아파트단지개별코드
                    "newPytpAreaCntn"   : this.newPytpAreaCntn                  // 신평형면적내용
				}
            }
            apiService.call(config).then(response => {
                let result                 = response.inteRlestList || []
				this.aptNm                 = result[0].aptHcxnm				// 아파트명
                this.beforeAptHscxIdvdc    = result[0].aptHscxIdvdc			// 아파트단지개별코드
				this.beforeNewPytpAreaCntn = result[0].newPytpAreaCntn		// 신평형면적내용
                
                this.getGenDlAm();
			})
        },
		// 관심부동산 등록
		intInteRlest() {
			const config = {
				url : "/an/re/07s01",
				data : {
					mydtCusno		      : this.getUserInfo('mydtCusno'),
                    beforeAptHscxIdvdc    : this.beforeAptHscxIdvdc,
					beforeNewPytpAreaCntn : this.beforeNewPytpAreaCntn,
					aptHscxIdvdc          : this.aptHscxIdvdc,
					newPytpAreaCntn       : this.newPytpAreaCntn
				}
			}
			apiService.call(config).then(response => {
				if (response.rspC == '0000') {
                    const config_evt = {
                        url : "/co/et/01ra1",
                        data : {
                            mydtCusno : this.getUserInfo("mydtCusno")
                        }
                    }
                    apiService.call(config_evt).then(response => {
                        let isJoin = response.isJoin === "true" ? true : false

                        if(isJoin) {
                            const config_evtSlide = {
                                params : {},
                                renderer : {
                                    component : COET1002
                                }
                            }
                            modalService.openSlidePagePopup(config_evtSlide).then(response => {
                                if(response === "evtYes") {
                                    const config_evtPop = {
                                        params : {},
                                        component : COET1003
                                    }
                                    modalService.openPopup(config_evtPop).then(response => {
                                        //바이패스 (응모 도중 팝업 닫을 시 완료팝업에서 팝업닫기 기능과 같은 역할)
                                        console.log("ANRE2207 close popup", response)
                                        this.closeAll('refresh')
                                    })
                                } else {
                                    modalService.alert("관심부동산이 저장되었습니다.").then(() => {
                                        //this.closeAllData('refresh');
                                        this.closeAll('refresh');
                                    });
                                }
                            })
                        } else {
                            modalService.alert("관심부동산이 저장되었습니다.").then(() => {
                                //this.closeAllData('refresh');
                                this.closeAll('refresh');
                            });
                        }
                    })

				} else if(response.rspC == '9998') {
					modalService.alert("이미 등록된 관심부동산이 있습니다.").then(() => {});
				} else {
					modalService.alert("등록 중 오류가 발생하였습니다.").then(() => {});
				}
			})
		},

		// 시세 조회
		getGenDlAm() {
			const config = {
				url : "/co/re/05r01",
				data : {
					aptHscxIdvdc    : this.aptHscxIdvdc,
					newPytpAreaCntn : this.newPytpAreaCntn,
				}
			}
			apiService.call(config).then(response => {
				this.genDlAm = response.genDlAm * 10000 || ""
			})
		},

        // 아파트 검색 팝업오픈
        openAptSrch() {
            let param = {
                srchKwrd : this.aptNm,
            }
            const config = {
                component: CORE1202,
                params : param
            }
            modalService.openPopup(config).then(response => {
                this.aptNm          	= response.aptNm				// 아파트명
                this.aptHscxIdvdc   	= response.aptHscxIdvdc			// 아파트단지개별코드
				this.newPytpAreaCntn 	= response.newPytpAreaCntn		// 신평형면적내용
				this.isAptSrch      	= true							// 아파트 검색 여부

                this.$nextTick(() => {
					this.getGenDlAm();
                })
            })
		},

		// 면적 선택 레이어 팝업 오픈
        openRlestAreaPop() {
            let rlestInfo = []
            // 면적 리스트
            const config0 = {
                url : "/co/re/03ra1",
                data : {
                    aptHscxIdvdc : this.aptHscxIdvdc
                }
            }
            apiService.call(config0).then(response => {
                
                if(response.pytpAreaList != null && response.pytpAreaList != undefined) {
                    if(response.pytpAreaList.length > 0) {
                        rlestInfo = response.pytpAreaList;
                    }
                }
                
                const config1 = {
                    params : {
                        rlestInfo : rlestInfo,
                        selArea : this.newPytpAreaCntn,
                    },
                    renderer : {
                        component : CORE1203
                    }
                }
                modalService.openSlidePagePopup(config1).then(response => {
                    this.newPytpAreaCntn = response.newPytpAreaCntn
                    this.aptHfisArea = response.aptHfisArea
                    this.getGenDlAm();
                })
            })
		},
		
		// iframe 부동산 상세 팝업 화면 오픈
        openRlestDtlPop() {
            let config = {
				component: ANRE2203,
				params : {}
			};
            
            modalService.openPopup(config).then(() => {

            });
        },
		
		// 금액 한글명, 한글/숫자 class 다르게 적용(시세)
		fn_hanValue_classDiff(value, numClass) {
			const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length

            let resultArray = []
            let resultString = ""

            for(let i=0; i<splitCnt; i++) {
                let rst = (value % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
                rst = Math.floor(rst)

                if(rst > 0) {
                    resultArray[i] = rst
                }
            }

            let strIdx = 0  // 최초시작지점에 '원' 추가하기위함

            for(let j=0; j<resultArray.length; j++) {
                if(!resultArray[j]) {
                    strIdx++
                    continue
                }

                if(j === strIdx) {
                    resultString = ' <span class="' + numClass + '">' + String(numberFormat(resultArray[j])) + '</span>' + unit[j] + '원' + resultString
                } else {
                    resultString = ' <span class="' + numClass + '">' + String(numberFormat(resultArray[j])) + '</span>' + unit[j] + ' ' + resultString
                }
            }

            return resultString;
        },

        // 화면 우상단 x버튼 클릭(모든 팝업창 close)
        closePage() {
            const config = {
                content: ['입력중인 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'],
                title  : "",
            }
            modalService.confirm(config).then(text => {
                if(text == "예") {
                    this.closeAll();
                }
            })
		},
	}
}
</script>