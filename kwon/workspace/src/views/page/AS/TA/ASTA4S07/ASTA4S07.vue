<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 자동차
* @ 페이지설명 : 큰글모드 > 자산 > 자동차
* @ 파일명     : src/views/page/AS/TA/ASTA4S07/ASTA4S07.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-21              CS541597              큰글모드 자산 자동차목록 신규(ASCA2001 -> ASTA4S07)
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>자동차</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">
                <div class="board_box car" v-for="(carInfo, idx) in carList" :key="'car_'+idx">
                    <a href="javascript:void(0);" class="name" @click.prevent="fn_openDetailPop(carInfo.vhcnoVal)">
                        <strong>{{carInfo.carModlnm}}</strong>
                        <span>{{carInfo.carGrdnm}}</span>
                    </a>
                    <p class="price" v-if="carInfo.odmtrDistMprAm > 0"><em class="num">{{fn_numberFormatKorAmt(carInfo.odmtrDistMprAm)}}</em></p>
                    <div class="car_pic">
                        <!-- 웹 -->
                        <img v-if="userAgent == 'else'" src="@/assets/images/icon/car_new06.png" :alt="fn_setAlt(carInfo)">
                        <!-- 디바이스(ios, aos) -->
                        <img v-else :src="carInfo.cartpRepImgUrlnm" @error="emptyImg" :alt="fn_setAlt(carInfo)">
                    </div>
                    <ul class="info_list">
                        <li>
                            <div class="tit">차량번호</div>
                            <div class="cont">{{carInfo.vhcnoVal}}</div>
                        </li>
                        <li>
                            <div class="tit">연식</div>
                            <div class="cont">{{carInfo.carMdyrYy}}</div>
                        </li>
                        <li>
                            <div class="tit">주행거리</div>
                            <div class="cont">{{fn_addKm(carInfo.comnCExpl)}}</div>
                        </li>
                    </ul>
                </div>
			</div>
		</div>

		<a href="javascript:void(0)" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import commonService from '@/service/commonService'
import {numberFormat} from '@/utils/number'
import {mapActions} from 'vuex'

import PDCA1102 from '@/views/page/PD/CA/PDCA1102/PDCA1102' // 자동차정보상세

export default {
    name : "ASTA4S07",
    data: () => {
        return {
            userAgent   : "", // 실행플랫폼 (ios, android, else)
            carList     : [], // 자동차목록
        }
    },
    mounted() {
        this.initComponent()

        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        ...mapActions('myassets', [
            'getAllMyAssetInfo'
        ]),

        // 초기화 처리
        initComponent() {
            // 실행플랫폼
            // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
            if(this.getUserInfo('chnl') === '385') {
                this.userAgent = appService.getUserAgent()
            } else if(this.getUserInfo('chnl') === '386') {
                // 기기로 접속하였을 경우는 true
                if((window.$SMNATIVE.getOS('A') == true && window.$SMNATIVE.getOS('I') == false) || (window.$SMNATIVE.getOS('A') == false && window.$SMNATIVE.getOS('I') == true)) {
                    this.userAgent = 'cok'
                } else {
                    this.userAgent = 'else'
                }
            }

            this.getData()
        },

        // 데이터 조회 API 호출
        getData() {
            this.carList = []

            const config = {
                url: '/as/ca/01r02',
                data: {
                    mydtCusno : this.getUserInfo('mydtCusno') // 고객번호
                }
            };

            apiService.call(config).then(response => {
                this.carList = response.carList || []

                // if (this.carList.length > 0) {
                //     // 1억 이상인 경우 억단위 한글 표기
                //     for (let i=0; i<this.carList.length; i++) {
                //         this.totOdmtrDistMprAm += this.carList[i].odmtrDistMprAm;
                //         this.carList[i].odmtrDistMprAm1 = Math.floor(this.carList[i].odmtrDistMprAm / 100000000);
                //         this.carList[i].odmtrDistMprAm2 = Math.floor((this.carList[i].odmtrDistMprAm - (this.carList[i].odmtrDistMprAm1 * 100000000)) / 10000);
                //     }

                //     // 상세조회
                //     if (this.paramVhcnoVal == "") {
                //         this.vhcnoVal = this.vhcnoVal == null || this.vhcnoVal == "" ? this.carList[0].vhcnoVal : this.vhcnoVal;
                //     } else {
                //         // 넘어온 자동차정보로 자동차상세정보 표기
                //         this.vhcnoVal = this.paramVhcnoVal;
                //         this.currIdx  = this.carList.findIndex(x => x.vhcnoVal === this.paramVhcnoVal);

                //         this.paramVhcnoVal = "";
                //     }
                //     this.fn_getDtlData();
                // }
            });
        },

        emptyImg(e) {
            e.target.src = new URL("@/assets/images/icon/car_new06.png", import.meta.url).href
        },

        /**
         * 이미지 alt 텍스트
         */
        fn_setAlt(carInfo) {
            return carInfo.carBrannm + " " + carInfo.carModlnm + " " + carInfo.carGrdnm;
        },

        /**
         * 금액 한글포맷
         */
        fn_numberFormatKorAmt(number) {
            const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length

            let resultArray = []
            let resultString = ""

            for(let i = 0; i < splitCnt; i++){
                let rst = (number % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
                rst = Math.floor(rst)

                if(rst > 0){
                    resultArray[i] = rst
                }
            }

            let strIdx = 0  // 최초시작지점에 '원' 추가가히위함

            for(let j = 0; j < resultArray.length; j++){
                if(!resultArray[j])  {
                    strIdx++
                    continue
                }

                if (j === strIdx) {
                    resultString = String(numberFormat(resultArray[j])) + unit[j] + '원' + resultString
                } else {
                    resultString = String(numberFormat(resultArray[j])) + unit[j] + resultString
                }
            }

            return resultString
        },
        /**
         * 주행거리 텍스트 변환
         */
        fn_addKm(text) {
            if(text) {
                return text.replaceAll("이상", "").replaceAll("초과", "").replaceAll("미만", "").replaceAll("이하", "") + "km";
            } else {
                return "";
            }
        },
        /**
         * 자동차 상세정보 팝업
         */
        fn_openDetailPop(carInfo) {
            let compName = PDCA1102
            let param = { vhcnoVal: carInfo }

            const config = {
                component: compName,
                params: param
            }
            modalService.openPopup(config).then(() => {

            })
        }
    },
    components : {
        
    }
}
</script>