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
    <div class="content-view">
        <div id="content">
            <section class="promote_main">
                <!--이벤트-->
                <!--slick-->
                <div class="slick_event" v-if="eventList.length > 0 && eventList">
                    <div class="inner">
                        <a href="javascript:void(0);" role="button" v-for="(item, idx) in eventList" :key="idx" @click.prevent="fnEventDetail(item.mydtEvtSqno, item.evtStsc)">
                            <div class="event">
                                <!-- <img :src="`/assets/images/event/banner/${item.evtBnnrImgnm}`" :alt="'이벤트 ' + item.evtTinm + ' ' + item.stDt + '~' + item.edDt" /> -->
                                <img :src="`/assets/images/event/banner/${item.evtBnnrImgnm}.png`" :alt="'이벤트 ' + item.evtTinm + ' ' + item.stDt + '~' + item.edDt" />
                                <!-- <div class="info">
                                    <span>이벤트</span>
                                    <strong>{{item.evtTinm}}</strong>
                                    <span class="date">{{item.stDt | dateFilter("YYYY.MM.DD")}} ~ {{item.edDt | dateFilter("YYYY.MM.DD")}}</span>
                                </div> -->
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

                <!--친구초대-->
                <a href="javascript:void(0);" class="invite" role="button" @click.prevent="fnMoveService('MREV4041', 'P')">
                    <img src="@/assets_v40/images/banner/img_banner_invite.png" alt="NH콕마이데이터 친구 초대하기" />
                </a>

                <!--링크배너(고정)-->
                <div class="board_box_wrap banner">
                    <a href="javascript:void(0)" class="board_box alert" role="button" @click.prevent="fn_curc()">
                        관심환율 알림설정
                        <em>환율알림</em>
                    </a>
                    <a href="javascript:void(0)" class="board_box calc2" role="button" @click.prevent="fn_stockList()">
                        관심주식 확인하기
                        <em>주식설정</em>
                    </a>
                </div>

                <div class="bg_banner">
                    <a href="javascript:void(0)" class="mycar" role="button" @click.prevent="fnMoveService('ANCA4201','M')">
                        <div class="tit">
                            <span>스마트한 내차관리</span>
                            <strong>NH콕마이카</strong>
                        </div>
                    </a>
                    <a href="javascript:void(0)" class="house" role="button" @click.prevent="fnMoveService('ANRE4201','M')">
                        <div class="tit">
                            <span>내 집 마련의 시작</span>
                            <strong>NH콕부동산</strong>
                        </div>
                    </a>
                </div>

                <div class="board_box_wrap banner">
                    <a href="javascript:void(0)" class="board_box farm1" role="button" @click.prevent="fnMoveService('SZFC4101','M')">
                        영농일지로 관리
                        <em>슬기로운 영농생활</em>
                    </a>
                    <a href="javascript:void(0)" class="board_box farm2" role="button" @click.prevent="fnMoveService('ANFM4001','M')">
                        성공적인 농촌정착
                        <em>귀농귀촌의 꿈</em>
                    </a>
                </div>

                <!--지역 축제-->
                <div class="local_promotion">
                    <a href="javascript:void(0);" class="h_tit01" role="button" @click.prevent="fnMoveService('RGTA4001', 'M')">지역 축제 문화 Pick!</a> 
                    <ul>
                        <li v-for="(item, idx) in festList" :key="'fest_'+idx">
                            <a href="javascript:void(0);" role="button" @click.prevent="fnLocalDetail('1', festList[idx])">
                                <img :src="item.otxtImgUrlnm ? item.otxtImgUrlnm : emptyImg " alt="" @error="emptyImg"/> 
                                <div class="info">
                                    <span class="cate">지역축제</span>
                                    <div class="bg">    
                                        <strong>{{item.cntzTinm}}</strong>
                                        <span class="addr">{{item.adr}}</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li v-for="(item, idx) in cultureList" :key="'culture_'+idx" >
                            <a href="javascript:void(0);" role="button" @click.prevent="fnLocalDetail('2', cultureList[idx])">
                                <img v-if="idx == 0" src="@/assets_v40/images/img/img_local_promotion_03.png" alt="" @error="emptyImg" /> 
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
                            <a href="javascript:void(0);" role="button" v-for="(item, idx) in resultRcmList" :key="idx" @click.prevent="fnRcmDetail(item.wrsDtlUrlnm)">
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
                    <a href="javascript:void(0);" class="board_box rect asset" role="button" @click.prevent="fnMoveService('ASIP4001', 'M')">
                        <em>자산진단</em>
                        금융자산 유형을 알려드려요.
                    </a>

                    <a href="javascript:void(0);" class="board_box rect wallet" role="button" @click.prevent="fnMoveService('LCIP4001', 'M')">
                        <em>지출분석</em>
                        소비패턴을 분석했어요.
                    </a>

                    <a href="javascript:void(0);" class="board_box rect briefing" role="button" @click.prevent="fnMoveService('PDBF4001', 'M')">
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

            </section>
        </div>
        <footersV2 type="an" />
    </div>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"

import RGFT4003 from '@/views/page/RG/FT/RGFT4003/RGFT4003' // 지역축제 상세 팝업  
import RGCL4003 from '@/views/page/RG/CL/RGCL4003/RGCL4003' // 지역문화 상세 팝업  
import PDPD1002 from '@/views/page/PD/PD/PDPD1002/PDPD1002' // 약관 슬라이드 팝업

import MREV2010 from '@/views/page/MR/EV/MREV2010/MREV2010' // 일반이벤트 상세팝업(신규가입)
import MREV2011 from '@/views/page/MR/EV/MREV2011/MREV2011' // 일반이벤트 상세팝업(추석소원빌기)
import MREV2012 from '@/views/page/MR/EV/MREV2012/MREV2012' // 일반이벤트 상세팝업(발렌타인)
import MREV2030 from '@/views/page/MR/EV/MREV2030/MREV2030' // 퀴즈이벤트 상세팝업(콕마이데이터)
import MREV2031 from '@/views/page/MR/EV/MREV2031/MREV2031' // 퀴즈이벤트 상세팝업(600만)

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

import RETA4002 from '@/views/page/RE/TA/RETA4002/RETA4002'  // 주식 선택 팝업
import PDBF4002 from '@/views/page/PD/BF/PDBF4002/PDBF4002' // 환율 팝업

export default {
    name : "RETA4001",
    data: () => {
        return {
            mydtCusno     : "",   // 마이데이터고객번호
            cusnm         : "",   // 이름
            curDt         : "",   // 현재일자
            inqMm		  : "",   // 테마이슈 현재월

            eventList      : [],   // 진행중인 이벤트 목록
            inteList       : [],   // 관심서비스 목록

            festList       : [],   // 지역축제 목록
            cultureList    : [],   // 지역문화 목록
           
            firEntDt         : '',       // 최초가입일자
            isFirst          : '',       // 최초가입여부
            resultRcmList    : [],       // 추천상품 출력 목록
            stltAgrYnList    : [],       // 약관 동의 여부 목록
            isShowStltAgrYn  : '',       // 약관 동의따른 show/hide
            
            inteRgnCultCd    : '',       // 관심지역 문화지역코드
            eventOxInfo      : {}        // OX 퀴즈
        }
    },
	computed: {
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
            
            this.getInterestRegion() //관심지역 조회
            this.getFestList()      // 관심축제목록 가져오기        
            this.getInteList()      // 관심서비스 가져오기
            
            this.getEventOXInfo()   // OX퀴즈
            this.getStltAgrYn()     // 약관 동의 여부 조회

        },

        // 진행중인 이벤트 목록 가져오기
        getEventList() {
            const config = {
                url: '/mr/ev/12r01', 
                data: {
                    "evtStsc" : '1',    // 전체 : 2 / 진행중 : 1 / 종료 : 0
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
        fnEventDetail(sqno, evtStsc) { //마이데이터 이벤트 일련번호, 이벤트상태코드
            console.log("이벤트 팝업 이동...")

            if(evtStsc != 0){
                let component = ''
                let evtComponent;

                // 'D':개발, 'T':테스트, 'R':운영
                if(import.meta.env.VITE_ENV === 'R'){
                    evtComponent = { '1' : 'MREV2010'     //일반(신규가입)
                                    , '4' : 'MREV2030'    //퀴즈(콕마이데이터)
                                    , '10' : 'MREV2011'   //일반(추석 소원)
                                    , '11' : 'MREV2012'   //일반(발렌타인)
                                    , '12' : 'MREV2031'   //일반(600만)
                    }
                }else{
                    evtComponent = { '1' : 'MREV2010'      //일반(신규가입)
                                    , '49' : 'MREV2030'    //퀴즈(콕마이데이터)
                                    , '50' : 'MREV2011'    //일반(추석 소원)
                                    , '51' : 'MREV2012'   //일반(발렌타인)
                                    , '60' : 'MREV2031'   //일반(600만)
                    }
                }

                if(evtComponent[sqno] === 'MREV2010'){
                    component = MREV2010
                }else if(evtComponent[sqno] === 'MREV2030'){
                    component = MREV2030
                }else if(evtComponent[sqno] === 'MREV2011'){
                    component = MREV2011
                }else if(evtComponent[sqno] === 'MREV2012'){
                    component = MREV2012
                }else if(evtComponent[sqno] === 'MREV2031'){
                    component = MREV2031
                }else{               
                    if(this.mydtCusno == "2000006853" && import.meta.env.VITE_ENV != 'R') { // 이벤트 팝업 노출 테스트 케이스: 조하천
                        component = MREV2010
                    } else {
                        modalService.alert('이벤트 준비중')
                        return;
                    }       
                }

                let config = {
                    component : component,
                    params : {'mydtEvtSqno' : sqno}
                }
                modalService.openPopup(config).then(() => {});
            }
        },

        // 지역축제 목록
        getFestList() {

            const config = {
                url: '/rg/ft/01r01',
                data: {		
                    "mydtCusno" : this.mydtCusno,
                    "rgnDsc" : this.getInteRgnInfo('01') == 1 ? "01" : '' //관심 지역 사용 유무
                }
            }

            apiService.call(config).then(response => {
                console.log("getFestList :: ",response)

                let tempList = this.fnMix(response.festivalList);

                console.log("tempList :: ",tempList)

                var tempReturn = tempList.some((item) => {   
                    if(item.otxtImgUrlnm != '' && item.otxtImgUrlnm != null) { 
                        this.festList.push(item)
                    }
                    return this.festList.length == 2
				})

                if(tempReturn) { // this.festList.length == 2
                    console.log("this.festList :: ", this.festList)

                    this.festList = this.festList.map(item=>({
                        ...item,
                        name : item.cntzTinm,
                        lttdCrdnVal : item.gpsYcdnNo,
                        lgtdCrdnVal : item.gpsXcdnNo,
                        evtStDt : this.formatDateSt(item.evtStDt),
                        evtEdDt : this.formatDateSt(item.evtEdDt),
                        otxtImgUrlnm : item.otxtImgUrlnm,
                    }))

                } else { // this.festList.length != 2 , 전국
                    this.getAllFestList()
                }
            })
        },

        // 지역축제전체 목록
        getAllFestList() {
            const config = {
                url: '/rg/ft/01r01',
                data: {		
                    "mydtCusno" : this.mydtCusno,
                    "rgnDsc" : '' //관심 지역 사용 유무
                }
            }

            apiService.call(config).then(response => {
                console.log("getAllFestList :: ",response)

                let tempAllList = this.fnMix(response.festivalList);
                
                var tempReturn = tempAllList.some((item) => {   
                    if(item.otxtImgUrlnm != '' && item.otxtImgUrlnm != null) { //
                        this.festList.push(item)
                    }
                    return this.festList.length == 2
				})

                this.festList = this.festList.map(item=>({
					...item,
					name : item.cntzTinm,
					lttdCrdnVal : item.gpsYcdnNo,
					lgtdCrdnVal : item.gpsXcdnNo,
					evtStDt : this.formatDateSt(item.evtStDt),
					evtEdDt : this.formatDateSt(item.evtEdDt),
					otxtImgUrlnm : item.otxtImgUrlnm,
				}))
            })
        },


        // 랜덤 정렬
        fnMix(list) {
            for(let i = list.length - 1; i>0; i--) {
                const j = Math.floor(Math.random()*(i+1))
                let temp  = list[i]
                list[i] = list[j]
                list[j] = temp
            }
            return list;
        },


        // 지역문화 목록
        getCultList() {         		
            const config = {
				url: '/rg/cl/01r01',
				data: {
					"orgnm" : "", // 시설 이름
					"ccwC" : this.getInteRgnInfo('01') == 1 ? this.inteRgnCultCd : ''  // 관심 지역 사용 유무 1 : 사용 => 지역코드사용
				}
			}

            console.log("config",  config )
            apiService.call(config).then(response => {
                console.log("getCultList :: ",response)
                if(response.cultureList && response.cultureList.length > 0) {
                    // 랜덤하게 지역문화 2개 택
                    for(var i = 0; i < 2 ; i++) {
                        let list = response.cultureList.splice(Math.floor(Math.random()*response.cultureList.length),1)[0]
                        this.cultureList.push(list)				
                    }
 
                }
            })
        },  

        // 지역축제/문화 상세 띄우기 
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
                    "name"  : list.orgnm,
                }
            }

			const config = {
				component: component,
				params : param
			}
			modalService.openPopup(config).then(() => {})

        },


        // 추천상품
        getRcmList() {
            const config = {
                url : "/pd/pd/02ra1",
                data : {
                    mydtCusno       : this.mydtCusno,        // 마이데이터 고객번호
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

        // OX퀴즈 정보 조회
        getEventOXInfo(){
            const config = {
                url: '/mr/ev/19r01', 
                data: {
                    "bltnDt" : dateFormat(new Date(), 'YYYYMMDD'),
                },
                disableLoading : true,
            }
            apiService.call(config).then(response =>{
                console.log('response : ', response)
                this.eventOxInfo = response

                const config2 = {
                    url: '/mr/ev/17r01', 
                    data: {
                        "mydtCusno" : this.mydtCusno,
                        "bltnDt" : dateFormat(new Date(), 'YYYYMMDD'),
                    },
                    // disableLoading : true,
                }
                apiService.call(config2).then(response =>{
                    console.log('response : ', response)
                    //오늘퀴즈참여여부
                    this.eventOxInfo.quizPrgYn = response.quizPrgYn
                })
            })
        },


        // 관심서비스 가져오기
        getInteList() {
            const config = {
                url : '/co/co/51r01',
                data : {
                    mydtCusno : this.mydtCusno,
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
                let param

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
                } else if(scrId == "OXTP0001") {  // OX퀴즈
                    if(!this.eventOxInfo.bltnDt){
                        modalService.alert("OX퀴즈를 준비하고 있어요.")
                        return
                    }else{
                        param = this.eventOxInfo
                        if(this.eventOxInfo.quizPrgYn === '1'){ // 도전현황
                            component = defineAsyncComponent(() => import("@/views/page/OX/TP/OXTP0006/OXTP0006"))
                        }else{                                  // OX퀴즈
                            component = defineAsyncComponent(() => import("@/views/page/OX/TP/OXTP0001/OXTP0001"))
                        } 
                    }

                } else {
                    modalService.alert("화면 준비중입니다.")
                    return
                }

                const config = {
                    component : component,
                    params   : param
                }
                
				modalService.openPopup(config).then((response) => {
                    if(scrId == "COCO4351") {
                        if(response == "refresh") {
                            this.getInteList()
                        }
                    } else if(scrId === "OXTP0001" && response === "ok"){
                        this.eventOxInfo.quizPrgYn = '1'    //참여
                        this.fnOpenPopYn("OXTP0001")
					}
                });
            }
        },

        // 약관 동의 여부 조회 (PDPD1001 -> PDPD4001)
        getStltAgrYn() {
            this.stltAgrYnList      = [];           // 약관 동의 여부 목록

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

        formatDateSt(resSt){
			const resData = `${resSt.substring(0,4)}.${resSt.substring(4,6) }.${resSt.substring(6,8)}`
			return resData;
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
                console.log("this.inteRgnCultCd:: ", this.inteRgnCultCd)
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
				"32" : "51", // 강원
				"33" : "43", // 충북
				"34" : "44", // 충남
				"35" : "47", // 경북
				"36" : "48", // 경남
				"37" : "52", // 전북
				"38" : "46", // 전남
				"39" : "50"  // 제주
			};
			const trimmedProvC = provC.toString().trim();
			return regionCodeMap[trimmedProvC] || trimmedProvC;
		},

        emptyImg(e) {
            e.target.src = new URL("@/assets_v40/images/img/img_local_promotion_empty.png", import.meta.url).href
        },
        // 관심 주식 종목 선택 팝업 
        fn_stockList() {
            const config = {
                component: RETA4002
            }
            modalService.openPopup(config).then((response) => {
                if(response == 'move') { // RETA4002 화면에서 등록 버튼을 누른 경우
                    const data = {
                        name : 'PDBF4001',
                    }			
                    commonService.movePage(data)
                }
            })
        },

        // 관심 국가 선택 팝업
        fn_curc() {
            const config = {
                component: PDBF4002
            }
            modalService.openPopup(config).then((response) => {
                if(response == 'success') { // PDBF4002 화면에서 등록 버튼을 누른 경우
                   const data = {
                        name : 'PDBF4001',

                    }			
                    commonService.movePage(data)
                }
            })
        },
        
    },
    components : {
        Page,
        FootersV2,
    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    },
}

</script>