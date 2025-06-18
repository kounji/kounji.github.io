<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 부동산
* @ 페이지설명 : 큰글모드 > 자산 > 부동산
* @ 파일명     : src/views/page/AS/TA/ASTA4S06/ASTA4S06.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-14              CS541597              큰글모드 자산 부동산목록 신규(ASRE4001 -> ASTA4S06)
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
	<div class="full_popup mydata2023" id="full_popup_01">
		<div class="popup_header">
			<h1>부동산</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">
                <template v-for="(item, idx) in rlestList">
                    <a v-if="item.rlestTngDsc == '1'" href="javascript:void(0);" class="board_box house" :key="'rlEst_'+idx" @click.prevent="openRlestFullPop(item)">
                        <div class="cate">
                            <span>{{getComCodeNm('RLEST_TNG_DSC', item.rlestTngDsc)}}</span>
                            <template v-if="!isNull(item.rlestRsdFormDsc)">
                                <span>/{{getComCodeNm('RLEST_RSD_FORM_DSC', item.rlestRsdFormDsc)}}</span>
                            </template>
                            <template v-if="item.revnMnEn === '1'">
                                <span>/임대중</span>
                            </template>
                            <!-- 25-03-17 ico_bubble 아이콘 종류
                                apt : home 1
                                오피스텔 : officetel 2
                                상가 : downtown 3, 7
                                단독주택 : single_home 4, 5
                                농지나 토지일때 : ground 6
                                기타 : etc 9
                            -->
                            <i class="ico_bubble" :class="fn_setIconBubble(item.rlestTngDsc)"></i>
                        </div>
                        <p class="name">
                            <!-- 아파트 -->
                            <strong v-if="!isNull(item.aptHcxnm)">{{item.aptHcxnm}}</strong>
                            <strong v-if="!isNull(item.rlestNm)" class="nickname">{{item.rlestNm}}</strong>
                            <!-- // 아파트 -->
                        </p>
                        <!-- 면적은 아파트만 표기 -->
                        <p class="size" v-if="item.rlestTngDsc == '1'">
                            <em class="num">{{item.newPytpAreaCntn}}</em>m<sup class="sup_text">2</sup>
                        </p>

                        <!-- 시세정보 Start -->
                        <!-- 아파트 -->
                        <template v-if="item.rlestRsdFormDsc == '1'">
                            <!-- 자가 -->
                            <p v-if="item.genDlAm > 0" class="price" v-html="fn_hanValue_classDiff(item.genDlAm, '', 'won', '1', '1')"></p>
                            <p v-else-if="!!item.rlestTrPr" class="price" v-html="fn_hanValue_classDiff(item.rlestTrPr, '', 'won', '1', '2')"></p>
                        </template>
                        <template v-if="item.rlestRsdFormDsc == '2' || item.rlestRsdFormDsc == '3'">
                            <!-- 전세/월세 -->
                            <p v-if="!!item.grmy" class="price" v-html="fn_hanValue_classDiff(item.grmy, '', 'won', '2')"></p>
                        </template>
                        <!-- // 시세정보 End -->

                        <!-- 아파트, 자가, 시세정보 있을경우만 증감액 표기 -->
                        <template v-if="item.rlestTngDsc == '1' && item.rlestRsdFormDsc == '1' && item.genDlAm > 0">
                            <p class="latter up" v-if="getProfitCalc(item.genDlAm, item.commQtart, item.rlestTrPr) > 0">
                                {{fn_hanValue_classDiff(Math.abs(getProfitCalc(item.genDlAm, item.commQtart, item.rlestTrPr)), 'num', 'txt_won')}}
                            </p>
                            <p class="latter down" v-else-if="getProfitCalc(item.genDlAm, item.commQtart, item.rlestTrPr) < 0">
                                {{fn_hanValue_classDiff(Math.abs(getProfitCalc(item.genDlAm, item.commQtart, item.rlestTrPr)), 'num', 'txt_won')}}
                            </p>
                            <p class="latter" v-else>
                                <em class="num">0</em>만원
                            </p>
                        </template>
                        <template v-else-if="item.rlestTngDsc == '1' && item.rlestRsdFormDsc == '1' && !item.genDlAm">
                            <p class="txt_info">
                                최근 시세정보가 없습니다.
                            </p>
                        </template>
                    </a>

                    <div v-else class="board_box house" :key="'rlEst_'+idx">
                        <div class="cate">
                            <span>{{getComCodeNm('RLEST_TNG_DSC', item.rlestTngDsc)}}</span>
                            <template v-if="!isNull(item.rlestRsdFormDsc)">
                                <span>/{{getComCodeNm('RLEST_RSD_FORM_DSC', item.rlestRsdFormDsc)}}</span>
                            </template>
                            <template v-if="item.revnMnEn === '1'">
                                <span>/임대중</span>
                            </template>
                            <!-- 25-03-17 ico_bubble 아이콘 종류
                                apt : home 1
                                오피스텔 : officetel 2
                                상가 : downtown 3, 7
                                단독주택 : single_home 4, 5
                                농지나 토지일때 : ground 6
                                기타 : etc 9
                            -->
                            <i class="ico_bubble" :class="fn_setIconBubble(item.rlestTngDsc)"></i>
                        </div>
                        <p class="name">
                            <strong v-if="!isNull(item.rlestNm)">{{item.rlestNm}}</strong>
                            <!-- 토지/농지일 경우 주소지 표기 -->
                            <strong v-if="item.rlestTngDsc === '6'" class="nickname">{{item.provnm}} {{item.ccwnm}} {{item.ttvnm}}</strong>
                        </p>
                        
                        <template v-if="item.rlestRsdFormDsc == '1'">
                            <!-- 자가 -->
                            <p v-if="!!item.rlestTrPr" class="price" v-html="fn_hanValue_classDiff(item.rlestTrPr, '', 'won', '1', '2')"></p>
                        </template>
                        <template v-else>
                            <!-- 전세/월세 -->
                            <p v-if="!!item.grmy" class="price" v-html="fn_hanValue_classDiff(item.grmy, '', 'won', '2')"></p>
                        </template>
                    </div>
                </template>

                
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import {dayDiff} from '@/utils/date'
import {numberFormat} from '@/utils/number'
import _ from 'lodash'
import {mapActions} from 'vuex'

import ANRE2203 from '@/views/page/AN/RE/ANRE2203/ANRE2203'

export default {
    name : "ASTA4S06",
    data: () => {
        return {
            rlestList               : [],   // 부동산목록
        }
    },
    mounted() {
        this.init()

        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        // 초기 실행항목
        init() {
            
            this.getData()  // 부동산 리스트 조회
        },
        // 부동산 목록 조회(다건)
        getData() {
            this.rlestList = []

            const config = {
                // url: '/as/re/01r01',    // ASIS
                url: '/co/re/02ra1',    // 시세증감, 부동산유형 등 데이터 확보를 위해 콕부동산 목록조회 api 사용
                data: {
                    mydtCusno : this.getUserInfo('mydtCusno') // 고객번호
                }
            }

            apiService.call(config).then(response => {
                this.rlestList = response.rlestBasList || []
            })
        },
        // 공통코드 명칭 변환
        getComCodeNm(code, codeValue) {
            const codeList = this.getCodeList(code)
            let codeObj = ''

            if(codeList.length > 0) {
                codeObj = codeList.find((codeTmp) => codeTmp.comnCVal == codeValue)

                if(codeObj == 'undefined' || codeObj == null) {
                    return codeObj
                }
            } else {
                return codeObj
            }

            return codeObj.comnCExpl
        },
        // 금액 한글명, 한글/숫자 class 다르게 적용(시세)
		fn_hanValue_classDiff(value, numClass, txtClass, rlestRsdFormDsc="", trprDsc="") {
			const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length

            let resultArray = []
            let resultString = ""

            for(let i=0; i<splitCnt; i++) {
                let rst = ((value*10000) % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
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
                    resultString = String(numberFormat(resultArray[j])) + unit[j] + '원' + resultString
                } else {
                    resultString = String(numberFormat(resultArray[j])) + unit[j] + ' ' + resultString
                }
            }

            // 텍스트 추가 시
            if(rlestRsdFormDsc == '1') {
                resultString = resultString + (trprDsc == '1' ? '<span class="desc">한국부동산원</span>' : '<span class="desc">매매금액</span>')
            } else if(rlestRsdFormDsc == '2' || rlestRsdFormDsc == '3') {
                resultString = resultString + '<span class="desc">보증금</span>'
            }

            return resultString
        },
        // 시세수익 창출식
        getProfitCalc(genDlAm, commQtart, rlestTrPr) {
            // 매매시세 * 지분율 - 매매금액
            let tmpGenDlAm = String(genDlAm).replace(/[,]/g, '') || 0      // 매매시세
            let tmpCommQtart = String(commQtart).replace(/[,]/g, '') || 100  // 지분율
            let tmpRlestTrPr = String(rlestTrPr).replace(/[,]/g, '') || 0  // 매매금액
            let result = 0

            // 지분율을 소수점 형식으로 변환
            tmpCommQtart = tmpCommQtart == 0 ? 100 : tmpCommQtart
            tmpCommQtart /= 100

            result = (tmpGenDlAm - tmpRlestTrPr) * tmpCommQtart
            result = Math.floor(result)    // 값이 만원단위라서 소수점 아래 내림
            
            return result
        },
        /**
         * 버블아이콘 설정
         */
        fn_setIconBubble(rlestTngDsc) {
            // apt : home 1
            // 오피스텔 : officetel 2
            // 상가 : downtown 3, 7
            // 단독주택 : single_home 4, 5
            // 농지나 토지일때 : ground 6
            // 기타 : etc 9
            let rtnClass = ''
            if(rlestTngDsc == '1') {
                rtnClass = 'home' 
            } else if(rlestTngDsc == '2') {
                rtnClass = 'officetel'
            } else if(rlestTngDsc == '3' || rlestTngDsc == '7') {
                rtnClass = 'downtown'
            } else if(rlestTngDsc == '4' || rlestTngDsc == '5') {
                rtnClass = 'single_home'
            } else if(rlestTngDsc == '6') {
                rtnClass = 'ground'
            } else {
                rtnClass = 'etc'
            }

            return rtnClass
        },
        /**
         * 아파트 상세팝업 오픈
         */
        openRlestFullPop(item) {
            // 아파트 아닐경우 리턴
            if(item.rlestTngDsc != '1') return
            console.log(item)

            let tradeType = ''
            if(item.rlestRsdFormDsc == '1') tradeType = 'deal'
            else tradeType = 'lease'

            const config = {
                component: ANRE2203,
                params: {
                    id:         item.aptHscxIdvdc || '',// 아파트단지개별코드
                    tradetype:  tradeType,              // 부동산거주형태구분(위티 전달용)
                    space:      item.aptHfisArea,       // 아파트분양면적
                }
            }
            console.log('부동산 상세 파라미터 >> ', config)
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        }
    }
}
</script>