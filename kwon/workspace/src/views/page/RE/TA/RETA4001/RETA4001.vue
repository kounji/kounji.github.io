<!--
/*************************************************************************
* @ 서비스경로 : 추천 > 추천 서브메인
* @ 페이지설명 : 추천 > 추천 서브메인
* @ 파일명     : src/views/page/RE/TA/RETA4001/RETA4001.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-02-12
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-12              CS541599              최초작성
*************************************************************************/
-->
<template>
    <page id="content" class="content-view">
        <div>
            <section class="promote_main">
                <!--이벤트-->
                <!--slick-->
                <div class="slick_event" v-if="eventList.length > 0 && eventList">
                    <div class="inner">
                        <a href="#nolink" v-for="(item, idx) in eventList" :key="idx" @click.prevent="fnEventDetail(item.mydtEvtSqno, item.evtStsc)">
                            <div class="event">
                                <!-- <img src="@/assets_v40/images/banner/img_banner_event_01.png" alt="" @error="emptyImg"/>  -->
                                <img :src="`/assets_v40/images/event/banner/${item.evtBnnrImgnm}`" alt="" @error="emptyImg"/> 
                                <div class="info">
                                    <span>이벤트</span>
                                    <strong>{{item.evtTinm}}</strong>
                                    <span class="date">{{item.stDt | dateFilter("YYYY.MM.DD")}} ~ {{item.edDt | dateFilter("YYYY.MM.DD")}}</span>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="controls" v-if="eventList.length > 1 && eventList">
                        <p class="paging"></p>
                        <button type="button" class="prev"><span class="blind">이전</span></button>
                        <button type="button" class="next"><span class="blind">다음</span></button>
                    </div>
                </div>
                <!--//slick-->

                <!--링크배너(고정)-->
                <div class="board_box_wrap banner">
                    <a href="#nolink" class="board_box house" @click.prevent="fnMoveService('ANRE4201','M')">
                        내 집 마련의 시작
                        <em>NH콕부동산</em>
                    </a>
                    <a href="#nolink" class="board_box car" @click.prevent="fnMoveService('ANCA4201','M')">
                        스마트한 내 차 관리
                        <em>NH콕마이카</em>
                    </a>
                </div>
                
                <!-- [통합 배너] -->
                <div class="slick_exchange" :key="'key_'+itemIndex">
                    <div class="inner">
                        <!-- KOSPI 지수 배너 -->
                        <dl class="exchange" v-for="(item, idx) in kosIdxList" :key="'kosIdx_'+idx">
                            <dt>{{item.stprDsc}}</dt>
                            <dd class="factor">
                                <span class="num">{{addComma(item.stprIxEpr)}}</span>
                                <span class="range" :class="upDown(item.stprIxEpr)">{{Number(item.bdCmprRnf).toFixed(2)}}%&nbsp;(전일대비)</span>
                            </dd>
                            <dd class="basis">
                                <span>{{item.basDt | dateFilter('YYYY.MM.DD')}} 기준</span>
                            </dd>
                        </dl>

                        <!-- 선택한 주식종목 배너 -->
                        <!-- todo... 아직 정해지지 않았음... 3/18 문의답변...
                        <dl class="exchange stock">
                            <dt>삼성전자 한 줄 넘을 경우 말줄임 삼성전자 한 줄 넘을 경우 말줄임
                                <button type="button" class="btn_setting"><span class="blind">주식종목 설정</span></button>
                            </dt>
                            <dd class="factor">
                                <span class="num">75,000</span>
                                <span class="range down">8.64% (전일대비)</span>
                            </dd>
                            <dd class="basis">
                                <span>2025.02.04 기준</span>
                            </dd>
                        </dl>
                        -->
                        <!-- 통화환율 배너 -->
                        <dl class="exchange" v-for="(item, idx) in xcrtList" :key="'xcrt_'+idx">
                            <dt>
                                <!--기본(icon) 국기명클래스(ico_JPY, ico_USD)-->
                                <i class="ico" :class="'ico_'+item.curc"></i>
                                {{item.curcCont}} {{item.curc}}
                                <button type="button" class="btn_setting" @click.prevent="fn_curc()"><span class="blind">환율 알림 설정</span></button>
                            </dt>
                            <dd class="factor">
                                <span class="unit">KRW</span>
                                <span class="num">{{addComma(Number(item.dlbsrt))}}</span>
                                <span class="range" :class="upDown(item.subDlbsrt)">{{Number(item.subDlbsrt).toFixed(2)}}&nbsp;(전일대비)</span>
                            </dd>
                            <dd class="basis">
                                <span>{{item.rgDt | dateFilter('YYYY.MM.DD')}} 기준</span>
                            </dd>
                        </dl>

                    </div>
                    <div class="controls">
                        <p class="paging"></p>
                        <button type="button" class="prev"><span class="blind">이전</span></button>
                        <button type="button" class="next"><span class="blind">다음</span></button>
                        <button type="button" class="btn_play"><span class="blind">정지</span></button>
                    </div>
                </div>

                <!-- CASE Empty -->
				<!-- 
                <a href="#nolink" class="select_empty">
					<p>노출할 주식 종목을 선택해 주세요.</p>
				</a> 
                -->

                <!--지역 축제-->
                <div class="local_promotion">
                    <h2 class="h_tit01">지역 축제 문화 Pick!</h2>
                    <a href="#nolink" class="btn_lots"><span class="blind">더보기</span></a>

                    <ul>
                        <li v-for="(item, idx) in festList" :key="'fest_'+idx">
                            <a href="#nolink" @click.prevent="fnLocalDetail('1', festList[idx])">
                                <img :src="item.thmnlImgUrlnm ? item.thmnlImgUrlnm : emptyImg " alt="" @error="emptyImg"/> 
                                <div class="info">
                                    <span class="cate">지역축제</span>
                                    <strong>{{item.cntzTinm}}</strong>
                                    <span class="addr">{{item.adr}}</span>
                                </div>
                            </a>
                        </li>
                        <li v-for="(item, idx) in cultureList" :key="'culture_'+idx">
                            <a href="#nolink" @click.prevent="fnLocalDetail('2', cultureList[idx])">
                                <img v-if="idx == 0" src="@/assets_v40/images/img/img_local_promotion_03.png" alt="" @error="emptyImg"/> 
                                <img v-else src="@/assets_v40/images/img/img_local_promotion_04.png" alt= "" @error="emptyImg"/> 
                                <div class="info">
                                    <span class="cate">지역문화</span>
                                    <strong>{{item.orgnm}}</strong>
                                    <span class="addr">{{item.adr}}</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                
                <!-- [나에게 맞는 추천 상품] -->
                <div class="goods_for_you">
                    <h2 class="h_tit01">나에게 맞는 추천상품</h2>

                    <!--slick-->
                    <!-- <div class="slick_banner" v-if="resultRcmList.length > 0 && resultRcmList"> -->
                    <div class="slick_banner" v-if="isShowStltAgrYn">
                        <div class="inner">
                            <a href="javascript:void(0);" v-for="(item, idx) in resultRcmList" :key="idx" @click.prevent="fnRcmDetail(item.wrsDtlUrlnm)">
                                <dl class="deposit" :class="item.wrsGrTpc == 'DFFM' ? 'green' : item.wrsGrTpc == 'RVGTP' ? 'blue' : 'orange'"> 
                                    <dt>
                                        <strong>{{item.acWrsnm}}</strong>
                                    </dt>
                                    <dd class="txt">{{item.rcmWrsBrfCntn}}</dd>
                                    <dd class="tag" v-if="!!item.rcmKwrdCntn">
                                        <span v-for="(subItem, subIdx) in item.rcmKwrdCntn.split('^')" :key="subIdx">
                                            {{subItem}}&nbsp;
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </div>

                        <div class="controls">
                            <p class="paging"></p>
                            <button type="button" class="prev"><span class="blind">이전</span></button>
                            <button type="button" class="next"><span class="blind">다음</span></button>
                        </div>
                    </div>

                    <!-- CASE empty --> <!--[v4.0] 25-03-19 추가 -->
                    <div class="board_box empty" v-else>
                        <p>{{cusnm}}님!<br>꼭 맞는 상품<br>추천해 드려요.</p>
                        <button type="button" class="link" @click.prevent="openWrsStltPop()">상품추천 조회 동의</button>
                    </div>

                    <!--//slick-->
                </div>

                <!--여러가지 안내-->
                <div class="move_banner">
                    <a href="#nolink" class="board_box rect asset" @click.prevent="fnMoveService('ASIP2001', 'M')">
                        <em>자산진단</em>
                        금융자산 유형을 알려드려요.
                    </a>

                    <a href="#nolink" class="board_box rect wallet" @click.prevent="fnMoveService('LCIP2001', 'M')">
                        <em>지출분석</em>
                        소비패턴을 분석했어요.
                    </a>

                    <a href="#nolink" class="board_box rect briefing" @click.prevent="fnMoveService('PDBF4001', 'M')">
                        <em>데일리 금융브리핑</em>
                        금융 브리핑을 정리했어요.
                    </a>
                </div>

                <!--관심서비스-->
                <div class="board_box attention">
                    <h2 class="title">내가 담은 관심서비스</h2>
                    <button type="button" class="btn_add" @click.prevent="fnMoveService('COCO4351', 'P')">관심서비스 담기</button>

                    <!--관심서비스 있는 경우-->
                    <ul v-if="inteList.length &gt; 0">
                        <li :class="item.menuId" v-for="(item, idx) in inteList" :key="idx" @click.prevent="fnMoveService(item.psAmnScid)"><span class="txt">{{item.psAmnScrnm}}</span></li>
                    </ul>

                    <!--관심서비스 없는 경우-->
                    <p class="h_tit01" v-else>
                        나의 관심서비스로<br>담아 놓고<br>빠르게 이동하세요.
                    </p>
                </div>

                <!--친구초대-->
                <a href="#nolink" class="invite" @click.prevent="fnMoveService('MREV4041', 'P')">
                    <img src="@/assets_v40/images/banner/img_banner_invite.png" alt="" />
                </a>
            </section>
        </div>
        <footersV2 type="an" />
    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"

import PDBF4002 from '@/views/page/PD/BF/PDBF4002/PDBF4002'
import RGFT4003 from '@/views/page/RG/FT/RGFT4003/RGFT4003' // 지역축제 상세 팝업  
import RGCL4003 from '@/views/page/RG/CL/RGCL4003/RGCL4003' // 지역문화 상세 팝업  
import PDPD1002 from '@/views/page/PD/PD/PDPD1002/PDPD1002' // 약관 슬라이드 팝업

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import appService from '@/service/appService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import {dateFormat} from '@/utils/date'
import {mapActions} from 'vuex'
import {defineAsyncComponent, nextTick} from 'vue'
import {fncSlick_briefing, fncSlick_briefing2} from '@/utils/slick'
import _ from 'lodash'

export default {
    name : "RETA4001",
    data: () => {
        return {
            mydtCusno     : "",   // 마이데이터고객번호
            cusnm         : "",   // 이름
            curDt         : "",   // 현재일자
            inqMm		  : "",   // 테마이슈 현재월

            eventList      : [],   // 진행중인 이벤트 목록
            kosIdxList     : [],   // 코스피,코스닥 지수 목록
            inteList       : [],   // 관심서비스 목록
            xcrtList       : [],   // 나의통화환율 목록

            festList       : [],   // 지역축제 목록
            cultureList    : [],   // 지역문화 목록
           
            firEntDt         : '',       // 최초가입일자
            isFirst          : '',       // 최초가입여부
            resultRcmList    : [],       // 추천상품 출력 목록
            stltAgrYnList    : [],       // 약관 동의 여부 목록
            isShowStltAgrYn  : '',       // 약관 동의따른 show/hide
            
            inteRgnCultCd    : ''   // 관심지역 문화지역코드

        }
    },
	computed: {
        itemIndex() {
            return this.isNull(this.kosIdxList.length + this.xcrtList.length) ? 0 : this.kosIdxList.length + this.xcrtList.length
        }
    },
    mounted() {
        this.initComponent()
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
            this.mydtCusno = this.getUserInfo('mydtCusno')
            this.cusnm = this.getUserInfo("cusnm")
            this.curDt = dateFormat(new Date(), 'YYYYMMDD')
            this.inqMm = dateFormat(new Date(), 'MM')

            this.getEventList()     // 이벤트목록 가져오기
            this.getKosIdxList()    // 코스피코스닥 지수 가져오기
            this.getInteList()      // 관심서비스 가져오기
            this.getXcrtList()      // 추천상품 및 통화환율 가져오기        
            
            this.getInterestRegion() //관심지역 조회
            this.getFestList()      // 관심축제목록 가져오기
            
            this.getStltAgrYn()     // 약관 동의 여부 조회

        },

        // 진행중인 이벤트 목록 가져오기
        getEventList() {
            const config = {
                url: '/mr/ev/12r01', 
                data: {
                    "evtStsc" : '1',    //전체 : 2 / 진행중 : 1 / 종료 : 0
                    "pageNo"  : 3 ,     // 3개씩 call
                    "isGetWinner" : "0",
                },
            }

            apiService.call(config).then(response => {
                console.log("getEventList :: ", response)
                this.eventList = response.evtList;
                
                this.$nextTick(() => {
                    this.slickEvent()
                })
            })      
        },

        // 이벤트 이동
        fnEventDetail(sqno, evtStsc) {
            console.log("이벤트 팝업 이동...")

            if(evtStsc != 0){
                let component = ''
                let evtComponent;

                // 'D':개발, 'T':테스트, 'R':운영
                if(import.meta.env.VITE_ENV === 'R'){
                    evtComponent = { '1' : 'MREV2010'     //일반(신규가입)
                                    , '4' : 'MREV2030'    //퀴즈(콕마이데이터)
                                    , '10' : 'MREV2011'   //일반(추석 소원)
                    }
                }else{
                    evtComponent = { '1' : 'MREV2010'      //일반(신규가입)
                                    , '49' : 'MREV2030'    //퀴즈(콕마이데이터)
                                    , '50' : 'MREV2011'    //일반(추석 소원)
                    }
                }

                if(evtComponent[sqno] === 'MREV2010'){
                    component = MREV2010
                }else if(evtComponent[sqno] === 'MREV2030'){
                    component = MREV2030
                }else if(evtComponent[sqno] === 'MREV2011'){
                    component = MREV2011
                }else{
                    modalService.alert('이벤트 준비중')
                    return;
                }

                let config = {
                    component : component,
                    params : {'mydtEvtSqno' : sqno}
                }
                modalService.openPopup(config).then(() => {});
            }
        },


        // 코스피, 코스닥 지수목록 가져오기
        getKosIdxList() {
            const config = {
                url: '/re/si/01r01', 
                data: {
                    "basDt" : '20250318', //오늘 날짜   
                },
            }

            apiService.call(config).then(response => {
                console.log("getKosIdxList :: ", response)
                this.kosIdxList = response.korStcIdxList;               
                this.$nextTick(() => {
                    $('.slick_exchange').filter('.slick-initialized').slick('unslick');	
                    this.slick(); 
                })
            })
        },
        
        // 지수 상승하락 확인
        upDown(index) {
            return Number(index) > 0 ? 'up' : Number(index) == 0 ? '0' : 'down'
        },

        // 지역축제 목록
        getFestList() {
            const config = {
                url: '/rg/ft/01r01',
                data: {		
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                    "rgnDsc" : this.getInteRgnInfo('01') == 1 ? "01" : '' //관심 지역 사용 유무
                }
            }

            apiService.call(config).then(response => {
                console.log("getFestList :: ",response)
                this.festList = response.festivalList.slice(0,2)
            })
        },

        // 지역문화 목록
        getCultList() {         		
            const config = {
				url: '/rg/cl/01r01',
				data: {
					"orgnm" : "", // 시설 이름
					"ccwC" : this.inteRgnCultCd ? this.inteRgnCultCd : ''  //관심 지역 사용 유무
				}
			}
            apiService.call(config).then(response => {
                console.log("getCultList :: ",response)
                if(response && response.cultureList) {
                    // 랜덤하게 지역문화 2개 택
                    for(var i = 0; i < 2 ; i++) {
                        let list = response.cultureList.splice(Math.floor(Math.random()*response.cultureList.length),1)[0]
                        this.cultureList.push(list)				
                    }
                }
            })
        },  

        // 지역축제/문화 상세 띄우기 (todo... 문화)
        fnLocalDetail(flag, list) {
            // flag 1:축제, 2:문화
            let component = flag == 1 ? RGFT4003 : RGCL4003
			let param = ''

            if(flag == 1 ) {
                param = {
                    "festivalCntzId" : list.cntzId,
                    "resFestivalList" : list
                }
            } else {
                param = {
                    "orgnm" : list.orgnm,
				    "adr"   : list.adr,
				    "pbcYy" : list.pbcYy,
                }
            }

			const config = {
				component: component,
				params : param
			}
			modalService.openPopup(config).then(() => {})

        },

        // 통화환율
        getXcrtList() {

            const config = {
                url: '/pd/bf/01r02',
                data: {
                    "mydtCusno": this.mydtCusno           // 마이데이터고객번호
                    ,"rgDt"    : this.curDt               // 현재일자
                    ,"chnl"    : this.getUserInfo('chnl') // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
                    ,"inqMm"   : this.inqMm               // 기준월
                }
            };
            
            apiService.call(config).then(response => {
                console.log("getXcrtList :: ", response)
                this.xcrtList = response.xcrtList ?  response.xcrtList : []     
                /**
			    * wrsGrTpd(상품군유형코드) 에 따라 필터링
			    * RVGTP :: 적금(적립식)
			    * DFFM	:: 예금(거치식)
                * LN    ::대출
			    */
                this.$nextTick(() => {
                    $('.slick_exchange').filter('.slick-initialized').slick('unslick');	
                    this.slick()
                })
                
            });
        },

        // 추천상품
        getRcmList() {
            const config = {
                url : "/pd/pd/02ra1",
                data : {
                    mydtCusno       : this.getUserInfo('mydtCusno'),        // 마이데이터 고객번호
                    chnl            : this.getUserInfo('chnl')              // 채널구분
                }
            }
            apiService.call(config).then(response => {
                console.log("getRcmList :: ", response)
                this.resultRcmList = response.wrsRcmList || []  
                this.$nextTick(() => {
                    $('.slick_banner').filter('.slick-initialized').slick('unslick');	
                    this.slickBanner()           
                })
                
            });
        },

        // 추천상품 상세
        fnRcmDetail(url) {
            console.log("url ::", url)
            appService.moveFinancialProductPage(url)
        },

        // 관심서비스 가져오기
        getInteList() {
            const config = {
                url : '/co/co/51r01',
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno"),
                    vernm     : "V4"                           // 버전명
                }
            }

            apiService.call(config).then(response => {
                this.inteList = response.fvrList || []
            })
        }, 

        // 관심서비스 이동(관심서비스는 화면,팝업이 나뉘어 화면구분코드를 가지고 있음)
        fnMoveService(scrId, flag, param) {
            //flag '':관심서비스 대상, 'M':화면, 'P':팝업
            let popDsc      // 화면구분코드
            let params = {}
            params = param

            if(flag == '' || flag == null || flag == undefined) {
                popDsc = this.inteList.find(el=>el.psAmnScid == scrId).scrnDsc
            } else if(flag == 'M') {
                popDsc = "M"
            } else {
                popDsc = "P"
            }
            
            let type = ""; // 버킷리스트와 금융목표는 scrId가 같으므로 {type:"goal"}을 param으로 넘겨줘야 함.

            if(popDsc == "M") { // 화면(M)
                if(scrId == "PDMY4003") { // 버킷리스트, 금융목표는 PDMY4001로 화면이 같고 type:'goal'로 구분되는데 ID를 동일하게 적을 수 없어 금융목표를 PDMY4003으로 하기로 함(메뉴_기본 테이블의 데이터 또한 동일)
                    scrId  = "PDMY4001";
                    params = {type : "goal"};
                }               
                
                const config = {
                    name : scrId,
                    params : params
                }
                //this.close()
                commonService.movePage(config);
            } else {            // 팝업(P)
                let component
                
                if(scrId == "MRLO4001") {         // 로또복권번호만들기
                    component = defineAsyncComponent(() => import("@/views/page/MR/LO/MRLO4001/MRLO4001"))
                } else if(scrId == "ASCR4101") {  // 나의신용점수올리기
                    component = defineAsyncComponent(() => import("@/views/page/AS/CR/ASCR4101/ASCR4101"))
                } else if(scrId == "MREV4041") {  // 친구초대
                    component = defineAsyncComponent(() => import("@/views/page/MR/EV/MREV4041/MREV4041"))
                } else if(scrId == "COCO4351") {  // 나의 관심서비스
                    component = defineAsyncComponent(() => import("@/views/page/CO/CO/COCO4351/COCO4351"))
                }  else if(scrId == "MREV2000") {  // 이벤트
                    component = defineAsyncComponent(() => import("@/views/page/MR/EV/MREV2000/MREV2000"))
                }

                const config = {
                    component: component
                }
                
				modalService.openPopup(config).then((response) => {
                    if(scrId == "COCO4351") {
                        if(response == "refresh") {
                            this.getInteList()
                        }
                    }
                });
            }
        },

        fn_curc() {
            const config = {
                component: PDBF4002
            }
            modalService.openPopup(config).then((response) => {
                if(response == 'success') { // PDBF4002 화면에서 등록 버튼을 누른 경우
                    this.getXcrtList();
                }
            })
        },

        // 약관 동의 여부 조회 (PDPD1001 -> PDPD4001)
       getStltAgrYn() {
            this.stltAgrYnList      = [];           // 약관 동의 여부 목록

            // 개인자산관리_약관동의_기본 테이블에서 약관 동의 여부 조회
            /* const config = {
                url : "/pd/pd/01ra1",
                data : {
                    mydtCusno       : this.getUserInfo('mydtCusno'),        // 마이데이터 고객번호
                    stltTpc         : 'PFM006',                             // 약관유형코드(상품추천 약관유형코드 : PFM006)
                    agrYn           : '1'                                   // 동의여부(0:미동의, 1:동의)
                }
            }
            apiService.call(config).then(response => {
                //console.log("약관동의여부 조회 ", response)
                this.stltAgrYnList = response.stltAgrYnList || [];          // 약관 동의 여부 목록

                if(this.stltAgrYnList.length > 0) {
                    this.isShowStltAgrYn = true;                            // 약관 동의따른 show/hide
                } else {
                    this.isShowStltAgrYn = false;                           // 약관 동의따른 show/hide
                }

                this.$nextTick(() => {
                    this.getWrsRcmList();       // 상품추천 금융상품 추천 목록 조회
                });
            }) */

            // 개인자산관리_정보_제공_동의_내역 테이블에서 약관 동의 여부 조회
            const config = {
                url: '/co/at/01r01',
                data: {}
            }
            apiService.call(config).then(response => {
                const stltList = response.stltList || [];
                const wrsStlt = stltList.find((tmp) => tmp.stltTpc == 'PFM006') || [];

                const config2 = {
                    url : '/co/at/02ra1',
                    data : {
                        "stltTpc"   : wrsStlt.stltTpc,                          // 약관유형코드
                        "sqno"      : wrsStlt.sqno,                             // 일련번호
                        "mydtCusno" : this.getUserInfo('mydtCusno'),            // 마이데이터고객번호
                    }
                }
                apiService.call(config2).then(response => {
                    this.stltAgrYnList = response || [];                        // 약관 동의 여부 목록

                    if(this.stltAgrYnList.agrDtm) {                             // As-Is에서 동의 여부를 동의일시 데이터 있는지에 따라 판단함(COAT0005 참조)
                        this.isShowStltAgrYn = true;                            // 약관 동의따른 show/hide
                    } else {
                        this.isShowStltAgrYn = false;                           // 약관 동의따른 show/hide
                    }
    
                    if(this.isShowStltAgrYn) {
                        this.getRcmList();       // 상품추천 금융상품 추천 목록 조회
                    }
                })
            })
        },

        // 약관 슬라이드 팝업 오픈
        openWrsStltPop() {
            console.log("이용약관 동의...")
            const config = {
                component: PDPD1002,        // 약관 팝업
                params : {
                }
            }
            modalService.openPopup(config).then((response) => {           
                if(response == 'refresh') {
                    this.isShowStltAgrYn = true;       
                    this.getRcmList(); 
                }
            });
        },

        addComma(nStr){
            return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        },

        slick() {
            $(".slick_exchange").each(function(){
                let $this = $(this);

                $(".inner", $this).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
                    var i = (currentSlide ? currentSlide : 0 ) + 1 ;
                    $(".paging", $this).html('<em>'+i + '</em> / ' + slick.slideCount);  
                });

                $(".inner", $this).slick({
                    speed : 300,
                    dots : false,
                    adaptiveHeight: true,
                    autoplay:true,
                    infinite: true,
                    draggable: true,
                    accessibility:true,
                    arrows : true,
                    cssEase:'linear',
                    prevArrow:$(".controls .prev", $this),
                    nextArrow:$(".controls .next", $this),
                });

                const constrols  = $(".btn_play", $this);

                constrols.click(function(){
                    if($(this).hasClass('paused')){//정지상태
                        $(".inner", $this).slick('slickPlay');
                        $(this).removeClass('paused');
                        $(".blind", $(this)).text('정지');
                    }else{//자동재생 중
                        $(".inner", $this).slick('slickPause');
                        $(this).addClass('paused');
                        $(".blind", $(this)).text('재생');
                    }
                });

                $(".slick-arrow", $this).click(function(){
                    if(constrols.hasClass('paused')){}else{
                        $(".inner", $this).slick('slickPause');
                        constrols.addClass('paused');
                        $(".blind", constrols).text('재생');
                    }
                })

           });

        },



        slickBanner() {
            $(".slick_banner").each(function(){
				let $this = $(this);

				$(".inner", $this).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
					var i = (currentSlide ? currentSlide : 0 ) + 1 ;
					$(".paging", $this).html('<em>'+i + '</em> / ' + slick.slideCount);  
				});

				$(".inner", $this).slick({
					speed : 300,
					dots : false,
					adaptiveHeight: true,
					infinite: true,
					draggable: true,
					accessibility:true,
					arrows : true,
					cssEase:'linear',
					prevArrow:$(".controls .prev", $this),
					nextArrow:$(".controls .next", $this),
				});
			});
            
        },

        slickEvent() {
            $(".slick_event").each(function(){
                let $this = $(this);

                $(".inner", $this).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
                    var i = (currentSlide ? currentSlide : 0 ) + 1 ;
                    $(".paging", $this).html('<em>'+i + '</em> / ' + slick.slideCount);  

                    /*25-02-17 event slick - centerMode:true_infinite:false 버그 해결*/
                    $(slick.$slides[i-1]).attr("aria-hidden", false);
                    /*//25-02-17 event slick - centerMode:true_infinite:false 버그 해결*/
                });

                $(".inner", $this).slick({
                    speed : 300,
                    dots : false,
                    adaptiveHeight: false, //
                    infinite: false, //
                    draggable: true,
                    accessibility:false,
                    arrows : true,
                    cssEase:'linear',
                    slidesToShow: 1,
                    centerMode: true,
                    variableWidth: true,
                    prevArrow:$(".controls .prev", $this),
                    nextArrow:$(".controls .next", $this),
                });
           });
        },
        movePage(url) {
            const config = {
                name   : url
            }

            commonService.movePage(config);
        },

        // 나의 관심지역 조회 
		getInterestRegion() {
			const config = {
				url: 'rg/ft/02r02',
				data: {
					mydtCusno: this.mydtCusno,
					rgnDsc: "01",    // 관심지역 축제 : 01, 지역문화 : 02, 부동산: 03
				}
			};

			apiService.call(config).then(response => {
				this.inteRgnCultCd = this.changeRegionCode(response.provC);				
			}).then(() => {
                this.getCultList();
			});
		},

        // 관심지역 코드 변환 
		changeRegionCode(provC) {
			if(!provC) return "";

			// 지역축제(01), 지역문화시설(02)에서 동일한 지역의 코드가 다르기 때문에 변환해줘야함
			// provC -> lwdgC
			const regionCodeMap = {
				"1"  : "11", // 서울
				"2"  : "28", // 인천
				"3"  : "30", // 대전
				"4"  : "27", // 대구
				"5"  : "29", // 광주
				"6"  : "26", // 부산
				"7"  : "31", // 울산
				"8"  : "36", // 세종
				"31" : "41", // 경기
				"32" : "42", // 강원
				"33" : "43", // 충북
				"34" : "44", // 충남
				"35" : "47", // 경북
				"36" : "48", // 경남
				"37" : "45", // 전북
				"38" : "46", // 전남
				"39" : "50"  // 제주
			};
			const trimmedProvC = provC.toString().trim();
			return regionCodeMap[trimmedProvC] || trimmedProvC;
		},

        emptyImg(e) {
            e.target.src = new URL("@/assets_v40/images/img/img_local_promotion_empty.png", import.meta.url).href            
        },
        
    },
    components : {
        Page,
        FootersV2,
    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>