<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 자동차
* @ 페이지설명 : 자산등록 > 자동차> step 3. 시세조회&할부금융선택
* @ 파일명     : src/views/page/CO/CA/COCA2105/COCA2105.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-13
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-13              CS515897              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup">
        <div class="popup_header">    
			<h1>자동차</h1>		
            <a href="javascript:void(0);" class="btn_back" @click.prevent="close()">
				<span class="blind">이전화면</span>
            </a>
            <a href="javascript:void(0);" class="btn_close" @click.prevent="closeAllPage"><span class="blind">팝업닫기</span></a>	
        </div>
        <div class="popup_content com_bg_type00">
            <div class="com_inner com_line_type01 com_top_type02 com_no_line">
                <strong class="com_pop_tit01">{{carModlnm}}<span class="common_bar"></span><span class="fw_normal fs16">{{vhcnoVal}}</span></strong>
                <div class="gadgets mt10">
                    <span class="car_badge">{{carMdyrYy}}년식</span>
                    <span class="car_badge">{{carGrdnm}}</span><br/>
                    <span class="car_badge">주행거리 {{odmtrDistNm}} km</span>
                </div>
                <div class="market_price_pointbox mt10" v-html="numberToKorea">
                
                </div>
                <p class="dot_msg mt15">시세 출처 : 컨슈머인사이트</p>
            </div>
            <div class="com_inner com_boxarea_type01">
                <div class="card_list_box card_list_box_etc">
                    <template v-if="chkFlag > 0">
                        <ul class="list_type_01">
                            <template v-for="(item, idx1) in loanList">
                                <li :key="'loan_'+idx1" v-if="item.checked == true">
                                    <dl>
                                        <dt>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.orgnm}}</span></i>
                                            <div>
                                                <em>{{item.loanNm}}</em>
                                                <span>{{item.loanAcct}}</span>
                                            </div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{item.loanAmt | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </li>
                            </template>
                        </ul>
                    </template>
                </div>
                <p class="com_txtinfo_type01" v-if="chkFlag<1">
					자동차 대출이 있으시다면 대출상품을 선택하세요.
				</p>
                <div class="com_btn_area" @click="openCarInstGbn()"><a class="com_btn_round"><span class="btn_go">{{chkFlag>0 ? "자동차 할부/대출 다시선택" : "자동차 할부/대출 선택"}}</span></a></div>
            </div>
        </div>
		<div class="bottom_box">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="registCarInfo($event)">{{!isUpt? "등록" : "수정"}}</a>
			</div>
		</div>
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import {numberFormat} from '@/utils/number'
import _ from 'lodash'

import COCO2201 from '@/views/page/CO/CO/COCO2201/COCO2201'
import COCO1124 from '@/views/page/CO/CO/COCO1124/COCO1124'

export default {
    name : "COCA2105",
    data: () => {
        return {
            carModlnm       : "",   // 자동차모델명
            vhcnoVal        : "",   // 차량번호값
            carGrdNo        : "",   // 자동차등급번호
            carGrdnm        : "",   // 자동차등급명
            carMdyrYy       : "",   // 자동차연식년도
            odmtrDistDsc    : "",   // 차량주행거리코드
            odmtrDistNm     : "",   // 차량주행거리명
            odmtrDistMprAm  : "",   // 차량시세
            loanList        : [],   // 자동차할부리스트(화면용)
            cnctAcList      : [],   // 자동차할부리스트(저장용)
            chkFlag         : 0,    // 리스트 표현 여부 flag

            popId       : "",     // 부모창에서 띄운 팝업창id(추가등록용)
            isUpt       : false,  // 수정으로 넘어왔는지 확인하기위한 파라미터
            isUptFirst  : false,  // 수정으로 진입 후 자동차할부/대출 선택 첫진입 여부
            chkSelect   : false,  // 자동차할부 선택 여부
        }
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    computed : {
        numberToKorea() {
            const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length

            let resultArray = []
            let resultString = ""

            for(let i=0; i<splitCnt; i++) {
                let rst = (this.odmtrDistMprAm % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
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
                    resultString = ' <span class="com_point_blue num">' + String(numberFormat(resultArray[j])) + '</span>' + unit[j] + '원' + resultString
                } else {
                    resultString = ' <span class="com_point_blue num">' + String(numberFormat(resultArray[j])) + '</span>' + unit[j] + ' ' + resultString
                }
            }

            return '시세 ' + resultString
        },
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        // 화면 초기화
        initComponent(param) {
            this.popId = param.popId

            this.odmtrDistDsc   = param.odmtrDistDsc        // 차량주행거리구분코드
            this.odmtrDistNm    = param.odmtrDistNm         // 차량주행거리구분명
            this.carModlnm      = param.carModlnm           // 차량모델명
            this.vhcnoVal       = param.vhcnoVal            // 차량번호
            this.carMdyrYy      = param.carMdyrYy           // 차량연식년도
            this.carGrdNo       = param.carGrdNo            // 차량등급번호
            this.carGrdnm       = param.carGrdnm            // 차량등급명
            this.isUpt          = param.isUpt || false      // 수정으로 넘어온 구분값(true/false)
            this.isUptFirst     = false

            this.getData()
        },
        getData() {
            // 자동차 시세 조회
            const config = {
                url : "/co/ca/05r01",
                data : {
                    mydtCusno       : this.getUserInfo("mydtCusno"),
                    vhcnoVal        : this.vhcnoVal,
                    carGrdNo        : this.carGrdNo,
                    odmtrDistDsc    : this.odmtrDistDsc
                }
            }
            apiService.call(config).then(response => {
                this.odmtrDistMprAm = response.odmtrDistMprAm || ""
            })

            if(this.isUpt) {
                // 등록한 자동차 할부 상품 조회(수정 진입시)
                const config_inst = {
                    url : "/as/ra/04r01",
                    data : {
                        mydtCusno   : this.getUserInfo("mydtCusno"),
                        vhcnoVal    : this.vhcnoVal,
                    }
                }
                apiService.call(config_inst).then(response => {
                    let istFncList = response.istFncList || []
                    let tmpArr = {}
                    this.chkFlag = 0

                    for(let i=0; i<istFncList.length; i++) {
                        tmpArr = {
                            "infOfrmnOrgC"  : istFncList[i].infOfrmnOrgC,   // 정보제공자기관코드
                            "orgnm"         : istFncList[i].trOrgnm,        // 거래기관명
                            "loanNm"        : istFncList[i].istFncWrsnm,    // 할부금융상품명
                            "loanAcct"      : istFncList[i].mydtAcno,       // 마이데이터계좌번호
                            "loanScNo"      : istFncList[i].mydtScNo,       // 마이데이터회차번호
                            "loanAmt"       : istFncList[i].lnAcBac,        // 대출계좌잔액
                            "checked"       : true
                        }
                        this.loanList.push(tmpArr)
                        this.chkFlag++
                    }
                })
            }
        },
        // 차량 할부금융 상품 slide 팝업 오픈 전 구분처리
        openCarInstGbn() {
            let contentData1 = []
            let uptList = []
            
            if(this.isUpt) {uptList = this.loanList}
            
            if((this.loanList.length < 1 || uptList.length > 0) && !this.chkSelect) {
                // 첫 진입
                this.selCarInst(contentData1)
            } else {
                for(let i=0; i<this.loanList.length; i++) {
                    const tmpArr1 = {
                        "orgC"          : this.loanList[i].infOfrmnOrgC,    // 정보제공자기관코드
                        "orgNm"         : this.loanList[i].orgnm,           // 기관명
                        "goodsCode"     : this.loanList[i].loanAcct,        // 계좌번호
                        "scNo"          : this.loanList[i].loanScNo,        // 회차번호
                        "goodsName"     : this.loanList[i].loanNm,          // 할부금융상품명
                        "goodsPrice"    : this.loanList[i].loanAmt,         // 대출계좌잔액
                        "checked"       : this.loanList[i].checked          // 체크여부
                    }
                    contentData1.push(tmpArr1)
                }
                this.openCarInstPop(contentData1)
            }
        },
        // 차량 할부금융 상품 리스트 조회
        selCarInst(contData) {
            const config = {
                url : "/co/co/07r01",
                data : {
                    bnkAcDsc    : "41",     // 10:수신상품, 20:투자상품, 31:신용대출, 32:담보대출, 35:할부금융, 37:리스, 39:기타, 41:자동차(신차할부, 중고차할부, 금융리스)
                    mydtCusno   : this.getUserInfo("mydtCusno"),
                }
            }
            apiService.call(config).then(response => {
                let rawList = response.accountList || []
                for(let i=0; i<rawList.length; i++) {
                    const tmpArr0 = {
                        "orgC"      : rawList[i].infOfrmnOrgC,
                        "orgNm"     : rawList[i].trOrgnm,
                        "goodsCode" : rawList[i].mydtAcno,
                        "scNo"      : rawList[i].mydtScNo,
                        "goodsName" : rawList[i].acWrsnm,
                        "goodsPrice": rawList[i].acNowBac,
                        "checked"   : (this.isUpt && (typeof _.find(this.loanList, {"loanAcct":rawList[i].mydtAcno, "loanNm":rawList[i].acWrsnm}) != "undefined")) ? true : false
                    }
                    contData.push(tmpArr0)
                }
                this.openCarInstPop(contData || [])
            })
        },
        // 차량 할부금융 상품 slide 팝업 오픈
        openCarInstPop(data) {
            const config = {
                params : {
                    title : "대출상품 선택"
                },
                renderer : {
                    component : COCO1124,
                    cdata : {
                        "title":"자동차할부/대출 선택",
                        "contentList":[{"contentGubn":'01',"contentData":data}]
                    }
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.loanList = []
                this.chkFlag = 0

                for(let i=0; i<response.length; i++) {
                    if(response[i].contentGubn == '01') {
                        const tmpArray1 = {
                            "infOfrmnOrgC"  : response[i].orgC,
                            "orgnm"         : response[i].orgNm,
                            "loanNm"        : response[i].goodsName, 
                            "loanAcct"      : response[i].goodsCode, 
                            "loanScNo"      : response[i].scNo,
                            "loanAmt"       : response[i].goodsPrice,
                            "checked"       : response[i].checked
                        }
                        this.loanList.push(tmpArray1)
                        if(tmpArray1.checked == true) {this.chkFlag++}
                    } 
                }
                this.chkSelect = true
            })
        },
        // 차량정보 등록
        registCarInfo(e) {
            if(e.target.className.indexOf("btn_off") != -1) return false

            // 화면용 할부금융리스트 내 데이터 필터링(체크된 데이터만)
            for(let i=0; i<this.loanList.length; i++) {
                if(this.loanList[i].checked) {
                    const tmpArr = {
                        "infOfrmnOrgC"  : this.loanList[i].infOfrmnOrgC,
                        "mydtAcno"      : this.loanList[i].loanAcct,
                        "mydtScNo"      : this.loanList[i].loanScNo
                    }
                    this.cnctAcList.push(tmpArr)
                }
            }

            const config_s = {
                url : "/co/ca/05s01",
                data : {
                    mydtCusno       : this.getUserInfo("mydtCusno"),
                    vhcnoVal        : this.vhcnoVal,
                    carGrdNo        : this.carGrdNo,
                    odmtrDistDsc    : this.odmtrDistDsc,
                    istFncList      : this.cnctAcList,
                }
            }
            apiService.call(config_s).then(response => {
                if(!this.isUpt) {
                    if(response.rspC === "0000") {
                        const config = {
                            component: COCO2201,
                            params : {
                                titlTxt     : "자동차",
                                subTxt      : "자동차",
                                isAdd       : false,
                                isRlAsset   : true,
                                popId       : this.popId
                            }
                        }
                        modalService.openPopup(config).then((response) => {
                            // 바이패스
                            console.log(response)
                        })
                    }
                } else {
                    this.closeAll({uptCom:true})
                }
            })
        },
        // 우측 상단 x버튼 클릭(모든 팝업 close)
        closeAllPage() {
            const config = {
                content: ['입력중인 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'],
                title  : "",
            }
            modalService.confirm(config).then(text => {
                if(text == "예") {
                    if(!this.isUpt) this.closeAll(true)
                    else this.closeAll()
                }
            })
        },
    },
    components : {
    }
}
</script>