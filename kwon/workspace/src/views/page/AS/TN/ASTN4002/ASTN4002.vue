<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 휴면계좌/휴면보험금 계좌 상세
* @ 페이지설명 : 자산 > 숨은 자산 > 휴면계좌/휴면보험금 계좌 상세
* @ 파일명     : src/views/page/AS/TN/ASTN4002/ASTN4002.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-10
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-10              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>상세내역</h1>
		</div>

		<div class="popup_content">
            <section class="sleep_details">
				<p class="inquiry_date">조회기준일 {{fnDateFormat(paramObj.rcnInqDtm)}}</p>
                <div class="board_box">
                    <h2 class="title">
                        <i :class="'ico_bank ' + paramObj.infOfrmnOrgC"><span class="blind">{{paramObj.infOfrmnOrgNm}}</span></i>
                        {{paramObj.infOfrmnOrgNm}} {{paramObj.acWrsnm}}
                    </h2>

                    <div class="outline">
                        <span class="account"><span class="blind">계좌번호</span>{{paramObj.mydtAcno}}</span>
                        <span class="num"><span class="blind">금액</span>{{paramObj.acNowBac | numberFilter}}{{paramObj.curc}}</span>
                        <div class="exe_btns">
                            <button type="button" @click.prevent="fnStltAgree(paramObj)" class="btns" v-if="isShowBtn && paramObj.dsc == '01'">
                                {{(paramObj.mydtAcStsc=='01'&& paramObj.acNowBac &lt;=1000000&&infInfo.includes(paramObj.infOfrmnOrgC))
                                                    ?'해지가능여부조회':(paramObj.mydtAcStsc)=='98'?'처리중':(paramObj.mydtAcStsc)=='99'?'해지완료':'해지불가'}}
                            </button>
                        </div>
                        
                    </div>

                    <ul class="sleep_list">
                        <li v-if="paramObj.dsc != '03'"><em>소멸시효완성일자</em><span>{{fnDateFormat(paramObj.xttPspPfnDt)}}</span></li>
                        <!-- <li><em>계좌관리점사무소코드</em><span>{{fnChgText(paramObj.acAmnbrBrc)}}</span></li> -->
                        <li v-if="paramObj.dsc != '01'"><em>거래메모</em><span>{{fnChgText(paramObj.recCntn)}}</span></li>
                    </ul>
                </div>
				<div class="gray_box">
					<p class="dotted_list">계좌에 연계된 자동납부 및 자동송금 내역은<br>08:00 ~ 24:00에만 조회 가능합니다.</p>
				</div>
            </section>
		</div>
        <!-- 25-03-07 추가 -->
		<div class="popup_footer fixed">
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" @click.prevent="close()">확인</button>
            </div>
        </div>
		<!-- 25-03-07 추가 -->
		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
		
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
import {defineAsyncComponent} from 'vue'
import {dateFormat} from '@/utils/date'

import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue
import plzLotteryJson from "@/assets_v40/images/lottie/bg_no_result.json"

import _ from 'lodash'

export default {
    name : "ASTN4002",
    data: () => {
        return {
            param          : {},
            paramObj       : {
                    rcnInqDtm     : "",              // 조회기준일
                    infOfrmnOrgC  : "",              // 정보제공자기관코드
                    infOfrmnOrgNm : "조회 중입니다.", // 정보제공자기관코드명
                    acWrsnm       : "",              // 상품명
                    mydtAcno      : "조회 중입니다.", // 계좌번호
                    acNowBac      : 0,               // 잔액
                    curc          : "원",            // 통화코드명
            },
            infInfo        : [], // 제공기관 목록
            stltList       : [], // 약관목록
            dsc            : "", // 조회구분
            infOfrmnOrgC   : "", // 정보제공자기관코드
            infOfrmnOrgNm  : "", // 정보제공자기관명
            mydtAcno       : "", // 마이데이터계좌번호
            mydtScNo       : "", // 마이데이터회차번호
            acWrsnm        : "", // 계좌상품명
            acNowBac       : 0, // 계좌현재잔액
            curc           : "", // 통화코드
            xttPspPfnDt    : "", // 소멸시효완성일자
            mydtAcStsc     : "", // 마이데이터계좌상태코드
            acAmnbrBrc     : "", // 계좌관리점사무소코드
            recCntn        : "", // 기록내용
            dorDataDsc     : "", // 휴면자료구분코드
            rcnInqDtm      : "", // 최근조회일시

            mydtAcStscList : [], // 해지구분코드 목록

            isShowBtn      : false   // 버튼활성화 여부 (true:보임, false:숨김)
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
            this.getMydtAcStsc()
            this.getData(param)
        },
        /* 숨은자산 상세조회 */
        getData(param) {
            this.paramObj = param.paramObj
            this.infInfo  = param.infInfo
            this.stltList = param.stltList

        },
        /* 해지구분코드 목록 조회 */
        getMydtAcStsc() {
            /* 공통코드 해지구분코드 목록 */
            const config = {
                url: '/co/co/00r01',
                data: {
                    comnCId   : "MYDT_AC_STSC", // 테마구분코드
					delYn     : '0'         // 삭제여부
                }
            }

            apiService.call(config).then(response => {
                if(!_.isEmpty(response)) {
                    this.mydtAcStscList = response.comnCList
                }
            })
        },
        /* 약관동의 */
        fnStltAgree(item) {
            if(item.mydtAcStsc == "99") {
                // 2. 해지완료인 경우
                modalService.alert("해지 완료 되었어요. 자산연결 재 진행 시 목록에서 사라집니다.")
            } else if(item.mydtAcStsc == "98") {
                // 3. 잔고 이전 및 해지 신청하였으나 아직 완료 되지 않은 상태
                modalService.alert("처리 진행중이에요. 익일 다시 확인해 주세요.")
            } else if(item.acNowBac == 0) {
                // 4. 잔액이 0인 경우
                modalService.alert("잔액이 0원인 계좌는 NH콕마이데이터에서 해지가 어려워요. 해당 금융기관에서 해지하여 주세요.")
            } else if(item.acNowBac > 1000000
                    || this.mydtAcStscList.findIndex(el=>el.comnCVal != '01' && el.comnCVal != '98' && el.comnCVal != '99' && el.comnCVal == item.mydtAcStsc) >= 0
                    || !this.infInfo.includes(item.infOfrmnOrgC)
                    ) {
                // 5.계좌의 잔액이 100만원보다 큰 경우
                // 6. 해지여부조회 후 해지 불가 시
                // 7. 해지예상금액조회 후 해지 불가 시
                // 8. 잔고이전이 가능한 19개 은행을 제외한 계좌
                modalService.alert("NH콕마이데이터에서 해지가 어려운 계좌예요. 해당 금융기관에서 해지하여 주세요.")
            } else {
                // 09:00~22:00만 이용 가능
                let now = new Date()
                let hh  = this.fnLpad(now.getHours(),2,"0")
                let mi  = this.fnLpad(now.getMinutes(),2,"0")
                let sysdtm = hh+""+mi
                
                if(sysdtm < "0900" || sysdtm > "2200") {
                    modalService.alert("서비스 제공시간은 09:00 ~ 22:00입니다.").then(()=>{
                        // this.getData()
                        this.closeAll()
                    })
                    return
                }

                // 정보제공자기관코드를 입력값으로 넣어 은행코드를 가져옴
                const config1 = {
                    url: '/as/tn/01r03',
                    data: {
                        inqDsc  : '1',                           // 1:기관코드->은행코드, 2:은행코드->기관코드
                        inqCd   : item.infOfrmnOrgC              // 정보제공자기관코드
                    }
                }
                apiService.call(config1).then(response =>{
                    this.bankCode = response.bnkList[0].repNbnkC   // 은행코드

                    // 약관 팝업 호출
                    //let tmpMydtScno = item.mydtScNo.replaceAll("NULL", "") // 회차번호가 없으면 NULL이라는 문자로 들어오기 때문에 api 입력으로 쓰기위해 공백으로 치환
                    let tmpMydtScno = item.mydtScNo == "NULL" ? null : item.mydtScNo // 회차번호가 없으면 NULL이라는 문자로 들어오기 때문에 api 입력으로 쓰기위해 null으로 치환

                    let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4004/ASTN4004"))
                    const config = {
                        component: compName, 
                        params   : {
                                callDsc        : 'E',
                                eligibilityObj : {
                                        bankCode        : this.bankCode,     // 개설 금융회사 코드
                                        accountNum      : item.mydtAcno,     // 계좌 번호
                                        depositSequence : tmpMydtScno,       // 예금 회차 번호
                                        infOfrmnOrgC    : item.infOfrmnOrgC, // 정보제공자기관코드(계좌해지가능여부 조회 API 및 계좌해지 및 잔액이전 API에서 해지 비트를 업데이트 하기 위해 infOfrmnOrgC(PK)를 들고감)
                                        infOfrmnOrgNm   : item.infOfrmnOrgNm,// 정보제공자기관코드명
                                        acNowBac        : item.acNowBac      // 잔액이 0인 경우는 예상금액을 태우지 않아야하므로 들고 감
                                    },
                                stltList       : this.stltList
                            }
                    }

                    modalService.openPopup(config).then(response => {
                        // 해지가능여부 조회는 이미 약관에서 처리하고 돌아옴
                        if(!_.isEmpty(response)) { // 동의 완료
                            if(response.flag == 'success') {
                                // 계좌이체/기부로 이동
                                let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4006/ASTN4006")) // 계좌이체/기부

                                const config = {
                                    component : compName,
                                    params    : {
                                        infOfrmnOrgC    : item.infOfrmnOrgC,        // 정보제공자기관코드(계좌해지가능여부 조회 API 및 계좌해지 및 잔액이전 API에서 해지 비트를 업데이트 하기 위해 infOfrmnOrgC(PK)를 들고감)
                                        infOfrmnOrgNm   : item.infOfrmnOrgNm,       // 정보제공자기관코드명(해지결과안내에서 사용)
                                        accountType     : response.param.accountType,     // 계좌 종류(1:수시입출금, 2:예적금)
                                        acWrsnm         : item.acWrsnm,             // 계좌상품명
                                        mydtAcno        : item.mydtAcno,            // 계좌번호
                                        mydtScNo        : tmpMydtScno,              // 회차번호
                                        acNowBac        : item.acNowBac,            // 잔액
                                        curc            : item.curc,                // 통화코드
                                        terminationId   : response.param.terminationId,   // 거래검증ID
                                        bankCode        : this.bankCode             // 해지될 계좌 은행코드
                                    }
                                }
                                
                                modalService.openPopup(config).then((response) => {
                                    if(response == 'refresh') {
                                        this.closeAll('refresh')
                                    }

                                    if(response?.flag == 'refresh') {
                                        this.closeAll('refresh')
                                    }



                                    if(response.flag == 'impossible') { // 해지가 불가한 계좌
                                        modalService.alert(response.msg+"<br>해당 계좌 기관에 직접 문의<br>또는 해지 요청해 주세요.").then(()=>{
                                            this.closeAll('refresh')
                                        })
                                    } else if(response == 'svcOut') {
                                        // 09:00~22:00만 이용 가능
                                        modalService.alert("서비스 제공시간은 09:00 ~ 22:00입니다.").then(()=>{
                                            this.closeAll()
                                        })
                                        
                                        return
                                    }
                                });
                            } else if(response.flag == 'impossible') {
                                modalService.alert(response.msg+"<br>해당 계좌 기관에 직접 문의<br>또는 해지 요청해 주세요.").then(()=>{
                                    this.closeAll('refresh')
                                })
                            } else if(response.flag == 'clear' || response.flag == 'refresh') {
                                this.closeAll('refresh')
                            }
                            
                        }
                    })
                })
            }
        },

        fnDateFormat(dt) {
            if(_.isEmpty(dt) || dt == "00000000") {
                return "-"
            }

            return dateFormat(dt, 'YYYY.MM.DD')
        },

        /* 팝업 열기 */
        fnOpenPopup(scrId) {
            let compName = ''

            if(scrId == "ASTN4003") {         // 해지계좌목록
                compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4003/ASTN4003"))
            }

            const config = {
                component: compName
            }
            
            modalService.openPopup(config).then((response) => {
                /*
                if(scrId == "COCO4351") {
                    if(response == "refresh") {
                        this.getInteList()
                    }
                }
                */
            });

        },
        fnLpad(v, len, pv) {
            v = v + '';
            return v.length >= len ? v : new Array(len - v.length + 1 ).join(pv) + v;
        },

        fnChgText(txt) {
            let out = ""
            out = _.isEmpty(txt) ? "-" : txt

            return out
        },
    },
    components : {

    },
    destroyed() {
        //this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>