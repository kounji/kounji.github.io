<!--
/*************************************************************************
* @ 서비스경로 : 금융지식 > 금융지식조건별조회
* @ 페이지설명 : 금융지식 > 금융지식조건별조회
* @ 파일명     : src/views/page/CO/CT/COCT4001/COCT4001.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-02-12
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-12              CS541599              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view">
        <div id="content">
            <section class="fin_wrap">
                <div class="filter">
                    <strong aria-hidden="true">연령별 추천</strong>
                    <button type="button" @click.prevent="selectAge(ageCd)"><span class="blind">연령별 추천 필터, 현재 선택:</span>{{ageCnm}}</button>
                </div>
                <div class="category_tab">
                    <div class="scroller">
                        <ul role="tablist">
                            <!-- [D]: li에 메뉴별 클래스(menu01 ~ 12) 추가  -->
                            <li class="menu" id="all" ref="thme_00" @click.prevent="selectThme('00', 1)"><a href="javascript:void(0);" role="tab" aria-selected="true">전체</a></li>
                            <li class="menu01" :style="showYn('01')" ref="thme_01" @click.prevent="selectThme('01', 1)"><a href="javascript:void(0);" role="tab" aria-selected="false">부동산</a></li>
                            <li class="menu02" :style="showYn('02')" ref="thme_02" @click.prevent="selectThme('02', 1)"><a href="javascript:void(0);" role="tab" aria-selected="false">자동차</a></li>
                            <li class="menu03" :style="showYn('03')" ref="thme_03" @click.prevent="selectThme('03', 1)"><a href="javascript:void(0);" role="tab" aria-selected="false">투자</a></li>
                            <li class="menu04" :style="showYn('04')" ref="thme_04" @click.prevent="selectThme('04', 1)"><a href="javascript:void(0);" role="tab" aria-selected="false">건강정보</a></li>
                            <li class="menu05" :style="showYn('05')" ref="thme_05" @click.prevent="selectThme('05', 1)"><a href="javascript:void(0);" role="tab" aria-selected="false">아파트</a></li>
                            <li class="menu06" :style="showYn('06')" ref="thme_06" @click.prevent="selectThme('06', 1)"><a href="javascript:void(0);" role="tab" aria-selected="false">대출</a></li>
                            <li class="menu07" :style="showYn('07')" ref="thme_07" @click.prevent="selectThme('07', 1)"><a href="javascript:void(0);" role="tab" aria-selected="false">연금</a></li>
                            <li class="menu08" :style="showYn('08')" ref="thme_08" @click.prevent="selectThme('08', 1)"><a href="javascript:void(0);" role="tab" aria-selected="false">절세</a></li>
                            <li class="menu09" :style="showYn('09')" ref="thme_09" @click.prevent="selectThme('09', 1)"><a href="javascript:void(0);" role="tab" aria-selected="false">여행</a></li>
                            <li class="menu10" :style="showYn('10')" ref="thme_10" @click.prevent="selectThme('10', 1)"><a href="javascript:void(0);" role="tab" aria-selected="false">신용정보</a></li>
                            <li class="menu11" :style="showYn('11')" ref="thme_11" @click.prevent="selectThme('11', 1)"><a href="javascript:void(0);" role="tab" aria-selected="false">보안</a></li>
                            <li class="menu12" :style="showYn('12')" ref="thme_12" @click.prevent="selectThme('12', 1)"><a href="javascript:void(0);" role="tab" aria-selected="false">상식</a></li>
                            <!--25-05-13(통합메인에서 들어오면 건강정보를 띄워야하는데 v-for를 사용하면 ref를 사용할 수 없기 때문에 하드코딩으로 변경)
                            <li class="menu on" id="all" ref="thme_00" @click.prevent="selectThme('00', 1)"><a href="javascript:void(0);" role="tab" aria-selected="true">전체</a></li>
                            <template v-for="(item, idx) in thmeList">
                                <li :key="idx" :class="'menu'+item.comnCVal" :style="showYn(item.comnCVal)" :ref="'thme_'+item.comnCVal" @click.prevent="selectThme(item.comnCVal, 1)"><a href="javascript:void(0);" role="tab" aria-selected="false">{{item.comnCExpl}}</a></li>    
                            </template>
                            -->
                        </ul>
                    </div>
                </div>
                <!-- menu01 : 부동산, menu02 : 자동차, menu03 : 투자, menu04 : 건강정보, menu05 : 아파트, menu06 : 전세대출, 
                    menu07 : 연금, menu08 : 절세, menu09 : 여행, menu10 : 신용정보, menu11 : 대출한도, menu12 : 세액공제 -->
                <div :class="'menu'+item.thmeCd" v-for="(item, idx) in filterList" :key="idx">
                    <template  v-for="(row, i) in item.list">
                        <a href="javascript:void(0);" class="cont" :key="'thme_'+i" @click.prevent="fnOpenContents(row.cntzId)">
                            <img :src="`/assets/images/fin_cont/${row.menuImgnm}`" alt="" @error="emptyImg">
                            <div class="info">
                                <span>{{row.thmeDsnm}}</span>
                                <strong>{{row.cntzTinm}}</strong>
                                <span class="tag">#{{row.rcmKwrdCntn}}</span>
                            </div>
                        </a>
                        <a href="javascript:void(0);" @click.prevent="fnMoveBanner(item.thmeCd)" class="banner" v-if="((item.list.length == 1 && i == 0) || (item.list.length &gt;= 2 && i == 1)) && getUserMode != 'C' && getUserMode != 'U' && !isSBank" :key="'banner_'+i">
                            <template v-if="item.thmeCd =='01'">
                                <span>내 집 마련의 꿈</span>
                                <strong>목표를 시작으로 현실로!</strong>
                            </template>
                            <template v-if="item.thmeCd =='02'">
                                <span>차근차근 모아</span>
                                <strong>내 차고에 드림카 채워 넣기!</strong>
                            </template>
                            <template v-if="item.thmeCd =='03'">
                                <span>자산진단</span>
                                <strong>내 자산 연결하고 전문 재무진단 받기</strong>
                            </template>
                            <template v-if="item.thmeCd =='04'">
                                <span>건강보험 가입내역</span>
                                <strong>내 건강정보 가입 내역을 확인하세요</strong>
                            </template>
                            <template v-if="item.thmeCd =='05'">
                                <span>신용 · 아파트 · 전세대출</span>
                                <strong>최대한도와 최저금리를 한번에!</strong>
                            </template>
                            <template v-if="item.thmeCd =='06'">
                                <span>대출이자 계산기</span>
                                <strong>쉽고 빠르게 대출금 계산하기</strong>
                            </template>
                            <template v-if="item.thmeCd =='07'">
                                <span>나의 노후준비</span>
                                <strong>안정적인 은퇴를 준비하세요</strong>
                            </template>
                            <template v-if="item.thmeCd =='08'">
                                <span>세금납부 확인</span>
                                <strong>내가 낸 세금, 쉽게 확인하세요.</strong>
                            </template>
                            <template v-if="item.thmeCd =='09'">
                                <span>농촌여행</span>
                                <strong>시골로 떠나요, 농촌 힐링 여행</strong>
                            </template>
                            <template v-if="item.thmeCd =='10'">
                                <span>신용정보</span>
                                <strong>신용점수 관리는 이렇게~</strong>
                            </template>
                            <template v-if="item.thmeCd =='11'">
                                <span>나의보안수준</span>
                                <strong>지금 내 보안 수준 점수는?</strong>
                            </template>
                            <template v-if="item.thmeCd =='12'">
                                <span>또래 부자들의 인기상품은?</span>
                                <strong>부자들의 금융생활</strong>
                            </template>
                        </a>
                    </template>
                </div>
                <!-- <button v-if="nextYn == 'Y'" @click.prevent="selectThme(thmeDsc, pageNum+1)">더보기</button> -->
            </section>

        </div>
        <footersV2 type="co" />
    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011' // 금융지식 컨텐츠 상세
import COTP0010 from '@/views/page/CO/TP/COTP0010/COTP0010' // 금융지식 연령별 추천 선택

import apiService from '@/service/apiService'
import appService from '@/service/appService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'

import {mapActions, mapGetters} from 'vuex'
import {defineAsyncComponent} from 'vue'
import _ from 'lodash'
import Template from '../../../XX/template/template.vue'

export default {
    name : "COCT4001",
    data: () => {
        return {
            ageCd      : 0,   // 연령별 추천 선택
            ageCnm     : "", 
            thmeDsc    : "",  // 테마

            orgList    : [],  // 원본 데이터
			dataList   : [],  // 테마별 배열
            filterList : [],  // 연령 및 테마 필터된 데이터 배열
            ageList    : [],  // 연령대 전체 배열
            thmeList   : [],  // 테마 전체 배열
            eThmeList  : [],  // 연령 필터된 테마 배열

            bannerSrcn : {},  // 배너 이동 객체
            pageNum    : 1,   // 현재 페이지
            pageCount  : 10000, // 페이지당 조회건수
            nextYn     : 'N', // 다음 페이지 여부

            param      : {},  // 통합메인으로부터 받은 파라미터
        }
    },
	computed: {
        ...mapGetters('user', [
			'getUserMode', 'isSBank'
		]),
    },
    mounted() {
        this.initComponent(this.pageInfo.params) 
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
            // v4 통합메인에서 호출하는 경우
            console.log("param=====================", param);  // thmeDsc : "04"
            this.param = param
            
            /* 배너 이동 객체 */
            this.bannerSrcn = 
                {'01' : {scrId : 'PDMY4023',   popDsc : 'P'},
                 '02' : {scrId : 'PDMY4024',   popDsc : 'P'},
                 '03' : {scrId : 'ASIP2010',   popDsc : 'P'},
                 '04' : {scrId : 'PDSC4004',   popDsc : 'M'},
                 '05' : {scrId : 'PDPD1107',   popDsc : 'P'},
                 '06' : {scrId : 'PDPD4051',   popDsc : 'M'},
                 '07' : {scrId : 'PDRT4001',   popDsc : 'M'},
                 '08' : {scrId : 'PDTX4004',   popDsc : 'M'},
                 '09' : {scrId : 'RGAT4001',   popDsc : 'M'},
                 '10' : {scrId : 'ASCR4107',   popDsc : 'P'},
                 '11' : {scrId : 'CBCTP0001R', popDsc : 'C'}, /// 콕뱅크로 이동
                 '12' : {scrId : 'ASIP2009',   popDsc : 'P'}
            }

            // 테마, 연령 초기값 세팅
            this.thmeDsc  = "00";
            this.ageCd    = "00";
            this.ageCnm = "전체";

            /* 금융지식 컨텐츠 페이징 초기화 */
            this.pageNum   = 1
            this.pageCount = 10000
            this.nextYn    = 'N'

            // 청소년 없어져야 함
            if(this.getUserMode == 'C') { // 청소년 모드
                this.ageCd    = "21";
                this.ageCnm = "10대";
            }
            
            /* 공통코드 테마구분코드 목록 */
            const config = {
                url: '/co/co/00r01',
                data: {
                    comnCId   : "THME_DSC", // 테마구분코드
					delYn     : '0'         // 삭제여부
                }
            }

            apiService.call(config).then(response => {
                this.thmeList = response.comnCList
            })

            /* 공통코드 연령대구분코드 목록 */
            let tmpAge = []
            const config2 = {
                url: '/co/co/00r01',
                data: {
                    comnCId   : "FNKI_AG_LRG_DSC", // 연령대구분코드
					delYn     : '0'                // 삭제여부
                }
            }

            apiService.call(config2).then(response => {
                this.ageList = response.comnCList.filter(el => el.comnCVal.substr(0,1) == '2')
            })
            
            // 금융지식 컨텐츠 조회
            this.fnSearch(this.ageCd)
        },

        // 연령별 추천 선택 팝업 열기 이벤트
        selectAge(ageCd) {
            
            const config = {
                component: COTP0010,
                params   : ageCd
            }

            var tmpObj = {'00':'전체'}
            this.ageList.forEach((el, idx) => {
                tmpObj[el.comnCVal] = el.comnCExpl
            })


            const _this = this;
            modalService.openPopup(config).then((response) => {
                if(ageCd != response.ageCd) { // 같은 연령을 선택시 재조회가 안되게 함
                    this.ageCd = response.ageCd;
                    this.ageCnm = tmpObj[this.ageCd];

                    this.pageNum = 1   // 현재 페이지 초기화
                    this.nextYn  = 'N' // 더보기 여부 초기화
                    _this.fnSearch(response.ageCd);
                }
                
            })
        },

        // 선택한 테마 이벤트
        selectThme(selThme, pageNum) {
            this.param = {}
            this.thmeDsc = selThme
            /* 페이징 */
            this.pageNum = pageNum

            // 연령별 필터된 원본 배열에 선택한 테마 필터 배열
            let tmpList = []
            if(selThme == "00") { // 전체
                tmpList = this.orgList
            } else {
                tmpList = this.orgList.filter(el => el.thmeDsc == selThme)
            }
            
            let tmp = tmpList.slice((this.pageNum - 1) * this.pageCount, this.pageNum * this.pageCount) // 페이지당 조회건수만큼
            this.nextYn = tmpList.length / (this.pageNum * this.pageCount) > 1 ? 'Y' : 'N' // 다음 페이지 여부

            this.thmeList.forEach((el, idx) => {
                let ix = this.filterList.findIndex((e)=> e.thmeCd == el.comnCVal) // 현재 필터에 해당 테마구분코드의 index를 찾아옴
                
                if(pageNum == 1) {
                    this.filterList[idx].list = []
                    if(idx == ix) {
                        this.filterList[ix].list = tmp.filter((e) => e.thmeDsc == el.comnCVal)
                    }
                    
                } else {
                    let temp = this.filterList[ix].list                       // 기존에 있는 테마의 데이터
                    let newData = tmp.filter((e) => e.thmeDsc == el.comnCVal) // 새로운 테마별 데이터만 따로 추출
                    if(newData.length > 0) {                                  // 1.해당 테마의 데이터가 있는 경우
                        this.filterList[ix].list = [...temp, ...newData]      // 2.기존 테마의 데이터에 append
                    }
                }
            })
            if(selThme == "00") {
                this.$nextTick(() => {
                    const container = document.querySelector(".scroller");
                    const resultsSection = document.getElementById('all')

                    if(container && resultsSection) container.scrollLeft = resultsSection.offsetLeft - container.offsetLeft;
                });
            }
        },

        fnSearch(ageCd) {
            const config = {
                url: '/co/ct/01r01',
                data: {
                        ageDsc    : ageCd == "00" ? "" : ageCd
                      }
            };
            
			let tmpThme = ["01","02","03","04","05","06","07","08","09","10","11","12"]
			
            apiService.call(config).then(response => {
                let tmpThmeList = [] // 임시 테마 저장 배열

                if(response.klList.length > 0) {
                    this.dataList = [];   // 재조회시 테마 display 여부 초기화
                    this.filterList = []; // 재조회시 테마별 틀 생성
                    tmpThme.forEach((row, idx) => {
                        this.orgList = response.klList // 원본 데이터
                        this.dataList.push({thmeCd: row, list: this.orgList.filter((el) => el.thmeDsc == row)})
                        this.filterList.push({thmeCd: row, list: []})
                        if(this.dataList[idx].list.length > 0) {
                            tmpThmeList.push(row) // 데이터가 있는 테마만 담아줌
                        }
                    })
                    this.eThmeList = [...tmpThmeList] // 중복 제거된 테마만 담겨있는 배열
                    
                    if(!_.isEmpty(this.param)) { // 통합메인에서 들어온 경우
                        this.$refs.thme_04.click()
                        this.param = {}          // 재조회 시 전체를 선택하기 위해 param을 초기화함
                    } else {
                        this.$refs.thme_00.click()        // 재조회 => 연령이 바뀔 때만 데이터를 조회해옴 => 연령마다 해당되는 테마가 달라질 수 있으니 전체 테마로 선택
                    }
                    
                }
            });
        },

        // 금융지식 컨텐츠 상세 팝업
        fnOpenContents(cntzId) {
            const config = {
                component: COCT4011,
                params   : cntzId
            }
            
            modalService.openPopup(config).then(() => {})


        },
        // 배너 이동
        fnMoveBanner(thmeDsc) {
            if(this.getScrmode() == 'U') { // 미가입자인 경우 배너 못 띄움
                modalService.alert("서비스 가입 후 이용하실 수 있습니다.")
                return
            }

            let component = this.bannerSrcn[thmeDsc].scrId  // 화면명
            let popDsc    = this.bannerSrcn[thmeDsc].popDsc // 팝업구분코드(M:화면, P:팝업)

            if(popDsc == "M") { // 화면(M)
                this.fn_movePage(component);
            } else if(popDsc == 'P') {            // 팝업(P)
                if(component == "PDMY4023") {         // 버킷리스트 > 꿈에 그리던 내 집 마련
                    component = defineAsyncComponent(() => import("@/views/page/PD/MY/PDMY4023/PDMY4023"))
                } else if(component == "PDMY4024") {  // 버킷리스트 > 내 차고에 드림카 채우기
                    component = defineAsyncComponent(() => import("@/views/page/PD/MY/PDMY4024/PDMY4024"))
                } else if(component == "PDPD1107") {  // 금융생활 > 상품추천 > 최대한도와 최저금리를 한번에!
                    component = defineAsyncComponent(() => import("@/views/page/PD/PD/PDPD1107/PDPD1107"))
                } else if(component == "ASCR4107") {  // 신용정보 > 신용점수 관리는 이렇게~
                    component = defineAsyncComponent(() => import("@/views/page/AS/CR/ASCR4107/ASCR4107"))
                } else if(component == "ASIP2009") {  // 자산진단 > 부자들의 금융생활
                    component = defineAsyncComponent(() => import("@/views/page/AS/IP/ASIP2009/ASIP2009"))
                } else if(component == "ASIP2010") {  // 03ㅣ투자 
                    component = defineAsyncComponent(() => import("@/views/page/AS/IP/ASIP2010/ASIP2010"))
                } else {
                    modalService.alert("준비중입니다.").then((response) => {

                    })
                    return
                }

                const config = {
                    component: component
                }
                
				modalService.openPopup(config);
            } else {
                if(component == 'CBCTP0001R'){ // 콕뱅크 나의 보안수준
                    appService.cokBankGoMove(component)
                }
            }
        },

        fnNext() {
            this.pageNum += 1


        },

        fn_movePage(pageId, param) {
            if (pageId === '') {
                modalService.alert("페이지 정보 필요")
                return
            }

            let params = {}
            params = param
            
            const config = {
                name : pageId,
                params : params
            }
            //this.close()
            commonService.movePage(config);
        },

        emptyImg(e) {
            e.target.src = new URL("@/assets_v40/images/fin_cont/img_fin_noimg.png", import.meta.url).href
            e.target.alt = "이미지를 불러올 수 없어요"
        },

        // 데이터가 없는 테마 카테고리 숨김 여부
        showYn(thmeDsc) {
            return this.eThmeList.includes(thmeDsc) ? "" : "display : none"
        },

        isEmpty(value) {
            if(typeof(value) == 'object') {
                if(Array.isArray(value)) {
                    return value.length > 0 ? true : false
                } else {
                    return Object.keys(value).length > 0 ? true : false
                }
            }
            
            return (value === null || value === undefined || value.length < 1) ? true : false
        },
        
    },
    components : {
        Page,
        FootersV2,
    },
    
        Templatedestroyed() {
        //this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>