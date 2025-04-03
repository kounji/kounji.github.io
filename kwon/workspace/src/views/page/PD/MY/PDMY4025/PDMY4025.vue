<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 도전목표챌린지 > 버킷리스트 > 여행 목표
* @ 페이지설명 : 전체메뉴 > 도전목표챌린지 > 버킷리스트 > 여행 목표 > 여행 목표 저장
* @ 파일명     : src\views\page\PD\MY\PDMY4025\PDMY4025.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-08-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-19              CS516033              최초작성
* 2025-01-10              CS541015              고도화 파일명, UI변경 및 고도화개발(PDMY2025.vue -> PDMY4025.vue)
*************************************************************************/
-->
<template>
    <div class="full_popup mydata2023" id="full_popup_01" style="display:block;">
		<div class="popup_header"> 
			<h1>버킷리스트</h1>
		</div>

		<div class="popup_content com_bg_type00">
			<div class="com_inner">
				<strong class="titH1">나의 워라벨, 설레는 여행!</strong>

				<div class="com_inputarea_type01">					
					<div class="com_input_type01">
                        <input type="text" ref="obtnm" v-model="obtnm" placeholder="목표 제목 입력" title="목표 제목">
						<label for="obtnm"><span class="txt_label_x">목표 제목</span></label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2"><span class="blind">삭제</span></a>
						</div>
					</div>

                    <!-- 여행지 검색 -->
					<div class="com_input_type01">
						<label for="PDMY2025_txt01"></label>
						<input type="search" id="PDMY2025_txt01" :value="PDMY2025_srchKwrd" ref="PDMY2025_srchKwrd" @keyup="fn_checkWord($event, 40)" @keyup.enter="fn_openTravelPopup('3', trvDsnC)" @keyup.delete="fn_infoClear" placeholder="여행지 검색" title="여행지 검색">
                        <a class="com_btn_delete" v-show="PDMY2025_srchKwrd.length>0" @click.prevent="del('PDMY2025_srchKwrd')" href="javascript:void(0);"><span class="blind">삭제</span></a>
                        <a class="com_btn_search" @click.prevent="fn_openTravelPopup('3', trvDsnC)" href="javascript:void(0);"><span class="blind">검색</span></a>
					</div>
					<!-- //여행지 검색 -->

					<!-- 인원 선택 -->
					<div class="com_btnselectbox_type01">
						<button type="button" class="com_btnselect_type01" @click.prevent="fn_openTravelPopup('1', pers)" ref="pers" title="인원 선택">
                            <span>{{pers===0?"인원선택":(pers+'명')}}</span>
						</button>
					</div>
					<!-- //인원 선택 -->

					<!-- 일정 선택 -->
					<div class="com_btnselectbox_type01">
						<button type="button" class="com_btnselect_type01" @click.prevent="fn_openTravelPopup('2', trvPrdDsc)" ref="trvPrdDsc" title="일정 선택">
                            <span>{{trvPrdDsc===''?"기간선택":(trvPrdDscNm)}}</span>
						</button>
					</div>
					<!-- //일정 선택 -->

                    <!-- 비용 -->
                    <template v-if="trvDsnC != '' && trvDsnNm != '' && trvAirfare != 0 && trvCost != 0 && pers != 0">
					<div class="cost_wrap">
						<strong class="titH4">{{trvDsnNm}} 여행 기준 경비(1인 기준)</strong>
						<div class="list_gray_box">
							<dl>
								<dt>왕복 항공료</dt>
								<dd><span class="num">{{trvAirfare | numberFilter}}</span>원</dd>
							</dl>
							<dl>
								<dt>하루 경비</dt>
								<dd><em class="num">{{trvCost | numberFilter}}</em>원</dd>
							</dl>
						</div>
					</div>
                    </template>
					<!-- //비용 -->

                    <!--[v4.0] 환율 추가-->
					<!--[v4.0] 2025-01-17 슬라이드 적용-->
					<div class="custom_box custom_box2" v-if="this.trvDsnC != '07'">
						<strong class="titH4">환율정보</strong>
						
						<div class="custom_box_info slick_refresh exchange_box_slick" :key="refKey">
							<div class="slide">
								<dl class="exchange_box" v-for="(curcItem, idx) in curcList" :key="idx">
									<dt>
										<i class="ico" :class="'ico_'+curcItem.curc"></i>
										<span>{{curcItem.curcCont.concat(' ', curcItem.curc)}}</span>
									</dt>
									<dd>
										<div class="com_price">
											<em class="unit">KRW</em><strong class="num counter" :data-count="curcItem.dlbsrt">{{curcAddComma(Number(curcItem.dlbsrt))}}</strong>								
											<template v-if="curcItem.subDlbsrt > 0">
                                                <span class="change_rate up" role="img" :aria-label="'상승 ' + curcAddComma(Math.abs(curcItem.subDlbsrt))">
                                                    <em>{{curcAddComma(Math.abs(curcItem.subDlbsrt))}}</em>
                                                </span>
											    (전일대비)
                                            </template>
                                            <template v-else-if="curcItem.subDlbsrt < 0">
                                                <span class="change_rate down" role="img" :aria-label="'하락 ' + curcAddComma(Math.abs(curcItem.subDlbsrt))">
                                                    <em>{{curcAddComma(Math.abs(curcItem.subDlbsrt))}}</em>
                                                </span>
											    (전일대비)
                                            </template>
										</div>
										<p class="date">기준일 : {{curcItem.rgDt | dateFilter('YYYY.MM.DD')}}</p>
									</dd>
								</dl>
							</div>
						</div>
					</div>
					<!--//[v4.0] 2025-01-17 슬라이드 적용-->
				
					<!--//[v4.0] 환율 추가-->

                    <!-- 목표금액 -->
					<div class="com_input_type01 com_won01">
						<input type="tel" class="input_right" ref="fncObtAm" placeholder="목표금액을 입력하세요" title="목표금액" :class="fncObtAm.length > 0 && foc_fncObtAm && !dis_fncObtAm ? 'focusON focusforce' : ''" v-model="fncObtAm" maxlength="12" @keyup="addComma($event)" required @focus="fn_focusOnOff('fncObtAm')" @blur="fn_setBacAm">
						<label for="fncObtAm"><span class="txt_label_x">목표금액</span></label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2 blur"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">원</span>
						</div>
						<div class="infoBox">
							<p class="com_sum" v-if="fncObtAm">{{fn_hanValue(fncObtAm)}}</p>
						</div>
					</div>
					<!--// 목표금액 -->

					<!-- 언제까지 모을까요 -->
					<div class="com_input_type01 readonly_ph" role="button" :aria-label="'필수입력, 최소6개월~10년사이, 목표기간 '+obtDtLabel+', 목표기간 선택'" @click="fn_popupCalendar($event)">
						<input type="text" class="input_cal_date input_right focusforce" ref="obtDt" v-model="obtDt" required readonly placeholder="언제까지 모을까요(최소6개월~10년사이)" title="언제까지 모을까요" aria-hidden="true" @focus="fn_focusOnOff('obtDt_on')" @blur="fn_focusOnOff('obtDt_off')"><div class="lineEF"></div>
						<label for="obtDt"><span class="txt_label_x">목표기간</span></label>
						<div class="del_txt">
							<a href="javascript:void(0);" role="button" class="com_btn_delete2 blur" style="display: none;"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2 type02"></span>
						</div>
					</div>
					<!-- //언제까지 모을까요 -->

                    <!-- 연결계좌 - 수정일때만 -->
                    <template v-if="this.insYn === 'U'">
                        <template v-if="subList.length > 0">
                            <ul class="account_list_2023 line_type">
                                <li v-for="(acctInfo, index) in subList" :key="index">
                                    <dl>
                                        <dt>
                                            <i class="ico_bank" :class="acctInfo.infOfrmnOrgC"><span class="blind">{{acctInfo.infOfrmnOrgNm}}</span></i>
                                            <span class="name">{{acctInfo.acWrsnm}}</span>
                                            <span class="num">{{acctInfo.mydtAcno}}</span>
                                        </dt>
                                        <dd>
                                            <em class="num">{{acctInfo.acNowBac | numberFilter}}</em>원
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                        </template>
                        <template v-else>
                            <p class="check_text">
                                예/적금계좌 및 요구불계좌를 연결 하고 목표금액에 필요한 금액을 확인하세요.
                            </p>
                        </template>

                        <div class="com_btn_area mt12" v-if="prgStsCd == '1'">
                            <a @click="openSlidePagePopupWithComponent" class="com_btnround_type02" href="javascript:void(0);">
                                <span class="btn_plus">
                                    <template v-if="subList.length > 0">연결계좌 다시 선택</template>
                                    <template v-else>연결계좌 선택</template>
                                </span>
                            </a>
                        </div>
                        
                        <!-- 계좌선택시 -->
                        <div class="mygoal_sub_text mt30">
                            <p class="point_line" v-if="subList.length > 0 && bacAm > 0 && remove(fncObtAm) > 0" v-html="fn_numberFormatKorAmt"></p>
                        </div>
                    </template>
                    <!-- //연결계좌 - 수정일때만 -->
				</div>
            </div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a @click.prevent="insertExpensePerpose()" class="btn btn_mint" href="javascript:void(0);">
					<template v-if="insYn === 'C'">저장</template>
					<template v-else>수정</template>
				</a>
			</div>
		</div>

        <a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll()"><span class="blind">팝업닫기</span></a>

        <!-- 초기 호출되는 함수를 해당 a태그에 숨김처리 하여 사용 -->
        <!-- <a style="display:block" @click.prevent="fn_openTravelPlaceSrch" ref="openTravelPlaceSrch"  href="javascript:void(0);"><span class="blind">검색</span></a> -->
    </div>
        
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {checkWord} from '@/utils/data'
    import {keyupNumFormat, numberFormat} from '@/utils/number'
    import {monthAdd, dateFormat, monthDiff, isValidDate} from '@/utils/date'
    import {fncSlick_briefing} from '@/utils/slick'
    import PDMY2047 from '@/views/page/PD/MY/PDMY2047/PDMY2047'
    import PDMY2046 from '@/views/page/PD/MY/PDMY2046/PDMY2046'
    import COCO1124 from '@/views/page/CO/CO/COCO1124/COCO1124'
    import PDMY4050 from '@/views/page/PD/MY/PDMY4050/PDMY4050' // 계좌연결 팝업
    import _ from 'lodash'

    export default {
        name : "PDMY4025",
        data: () => {
            return {
                mydtCusno         : '',   //마이데이터고객번호
                fncObtDsc         : '',   //금융목표구분코드 필수(05:여행)
                sqno              : '',   //일련번호(상세조회시 필수)
                fncObtAm          : 0,    //금융목표금액
                obtDt             : '',   //목표일자
                obtnm             : '',   //목표명
                rgDt              : '',   //등록일자
                subList           : [],   //연결계좌내역목록
                                    // mydtCusno        마이데이터고객번호
                                    // fncObtDsc        금융목표구분코드
                                    // sqno             일련번호
                                    // infOfrmnOrgC     정보제공자기관코드
                                    // infOfrmnOrgNm    정보제공자기관코드명
                                    // mydtAcno         마이데이터계좌번호
                                    // mydtScNo         마이데이터회차번호
                                    // lschgDtm         최종변경일시
                                    // acWrsnm          계좌상품명
                                    // acNowBac         계좌현재잔액
                subListIn         : [],
                accountList       : [],   // 계좌목록
                prgStsCd          : '',   // 진행여부
                insYn             : '',   // 등록/수정여부
                acNowBacTotAm     : 0,    // 계좌현재잔액총액
                bacAm             : 0,    // 남은금액
                fncObtAchvYn      : '',   // 목표달성여부
                trvDsnC           : '',   // 여행지코드
                trvDsnNm          : '',   // 여행지명
                trvAirfare        : 0,    // 여행왕복항공료
                trvCost           : 0,    // 여행1일경비
                pers              : 0,    // 인원수
                trvPrdDsc         : '',   // 여행기간구분코드
                trvPrdDscNm       : '',   // 여행기간구분코드명
                totTrvAirfare     : 0,    // 왕복항공료 합계
                totTrvCost        : 0,    // 1일경비 합계
                PDMY2025_srchKwrd : '',   // 여행지 검색어
                foc_fncObtAm      : false,// 목표금액 focus YN
                foc_obtDt         : false,// 목표기간 focus YN
                dis_fncObtAm      : true, // 목표금액 disabled여부
                obtDtLabel        : "",   // 선택한 날짜의 라벨
                today             : dateFormat(new Date(), "YYYY-MM-DD"),
                bannerPopYn       : "",
                curDt             : "",
                curcList          : [],
                refKey            : 0,
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        computed : {
            fn_numberFormatKorAmt() {

                const unit = ['', '만', '억', '조', '경']
                const splitAmt = 10000
                const splitCnt = unit.length

                let resultArray = []
                let resultString = ""

                for(let i = 0; i < splitCnt; i++){
                    let rst = (this.bacAm % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
                    rst = Math.floor(rst)

                    if(rst > 0){
                        resultArray[i] = rst
                    }
                }

                let strIdx = 0  // 최초시작지점에 '원' 추가하기위함

                for(let j = 0; j < resultArray.length; j++){
                    if(!resultArray[j])  {
                        strIdx++
                        continue
                    }

                    if(j === strIdx) {
                        resultString = '<span class="com_point_blue">'+String(numberFormat(resultArray[j])) +'</span>'+ unit[j] + '원' + resultString
                    } else {
                        resultString = '<span class="com_point_blue">'+String(numberFormat(resultArray[j])) +'</span>'+ unit[j] + ' ' + resultString
                    }
                }

                return '목표 달성을 위해 ' + resultString + '이 필요해요!'
            },
        },
        methods: {
            initComponent(params) {

                // 계좌목록 조회
                this.getAcctList()

				// 배너호출여부(배너가 팝업에서 위치한경우)
				this.bannerPopYn = this.fn_bannerPopYn() || ''
                this.mydtCusno = this.getUserInfo("mydtCusno")

                this.curDt = dateFormat(new Date(), 'YYYYMMDD')

                if (params !== undefined && params !== null 
                    && params.fncObtDsc !==undefined && params.fncObtDsc !== null && params.fncObtDsc === '04'
                    && params.sqno !==undefined && params.sqno !== null && params.sqno !== '')
                {
                    this.insYn = "U" // 수정
                    this.fncObtDsc = params.fncObtDsc
                    this.sqno = params.sqno
                    this.prgStsCd = params.prgStsCd

                    this.getData()
                    this.getCurcData()
                } else {
                    this.fncObtDsc = "04"
                    this.fncObtAm = ""
                    this.sqno = 0
                    this.obtDt = ""
                    this.subListIn = []
                    this.insYn = "C" // 등록
                    this.prgStsCd = "1" // 진행중

                    //신규등록처리를 위한 여행장소 검색 팝업 호출
                    this.fn_openTravelPlaceSrch()

                    // 해당 a태그는 숨김처리
                    // this.$refs.openTravelPlaceSrch.click()
                }
            },
            fn_openTravelPlaceSrch() {

                let compName = PDMY2046

				var param = {}
				const config = {
					component: compName,
					params : param
                }
                
                // 해당팝업(PDMY2046)에서 슬라이드 팝업 호출(기간선택 팝업)
                // 인원 및 여행지 선택완료시 리턴받아서 콤보박스에 세팅
				modalService.openPopup(config).then((response) => {
                    this.trvDsnC    = response.trvDsnC    // 여행장소코드
                    this.trvDsnNm   = response.trvDsnNm   // 여행장소명
                    this.pers       = response.pers       // 여행인원수
                    this.trvAirfare = response.trvAirfare // 왕복항공료
                    this.trvCost    = response.trvCost    // 1일경비
                    this.PDMY2025_srchKwrd = response.trvDsnNm
                    
                    this.getCurcData();
				})
            },
            getData() {

                const config = {
                    url: '/pd/my/31r01',        // /pd/my/19r01
                    data: {
                            "mydtCusno": this.mydtCusno // 마이데이터고객번호
                            ,"fncObtDsc" : this.fncObtDsc
                            ,"sqno" : this.sqno
                        }
                };

                apiService.call(config).then(response => {

                    this.respInfo = response;

                    this.obtnm = this.respInfo.obtnm
                    this.trvAirfare = this.respInfo.refCntn1 // 왕복항공료
                    this.trvCost = this.respInfo.refCntn2    // 1일경비
                    this.trvDsnC = this.respInfo.trvDsnC
                    this.trvDsnNm = this.respInfo.trvDsnNm
                    this.trvPrdDsc = this.respInfo.trvPrdDsc
                    this.trvPrdDscNm = this.respInfo.trvPrdDscNm
                    this.pers = this.respInfo.pers
                    this.PDMY2025_srchKwrd = this.respInfo.trvDsnNm
                    this.fncObtAm = keyupNumFormat(this.respInfo.fncObtAm)
                    this.obtDt = dateFormat(this.respInfo.obtDt, 'YYYY-MM-DD')
                    this.obtDtLabel = dateFormat(this.respInfo.obtDt, "YYYY년 MM월 DD일")
                    this.subList  = this.respInfo.subList || []
                    this.fncObtAchvYn = this.respInfo.fncObtAchvYn

                    this.acNowBacTotAm = _.sumBy(this.subList, item => {return item.acNowBac }) // 계좌현재잔액총액
                    this.bacAm = this.remove(this.fncObtAm) - this.acNowBacTotAm
                });
            },
            getCurcData() {
                this.curcList = [];
                const config = {
                    url: '/pd/my/31r02',
                    data: {
                            "mydtCusno": this.mydtCusno // 마이데이터고객번호
                           ,"rgDt"     : this.curDt
                        }
                };

                apiService.call(config).then(response => {
                    let result = response.curcList || [];

                    this.refKey += 1  // slick refresh(통화의 개수가 줄어들면 unslick이 되지 않아 key를 지정하여 새로 그려지게 함)

                    if(this.trvDsnC === '01'){ // 동남아,대만
                        this.curcList = result.filter(obj => ['IDR', 'PHP', 'SGD', 'THB', 'TWD'].includes(obj.curc))
                    } else if(this.trvDsnC === '02') { // 유럽
                        this.curcList = result.filter(obj => obj.curc === 'EUR')
                    } else if(this.trvDsnC === '03') { // 남태평양
                        this.curcList = result.filter(obj => ['AUD', 'NZD'].includes(obj.curc))
                    } else if(this.trvDsnC === '04') { // 호주/뉴질랜드
                        this.curcList = result.filter(obj => ['AUD', 'NZD'].includes(obj.curc))
                    } else if(this.trvDsnC === '05') { // 미주/하와이
                        this.curcList = result.filter(obj => obj.curc === 'USD')
                    } else if(this.trvDsnC === '06') { // 중국/일본/홍콩
                        this.curcList = result.filter(obj => ['CNY', 'JPY', 'HKD'].includes(obj.curc))
                    } else { // 제주도
                        this.curcList = [];
                    }

                    console.log("환율", this.curcList)
                    
                    this.$nextTick(()=>{
                        $('.custom_box_info .slide').filter('.slick-initialized').slick('unslick');	

                        setTimeout(()=>{
                            fncSlick_briefing();
                        }, 30)
                    });
                });
            },
            fn_openTravelPopup(gubn, val='') {

                // 여행인원 슬라이드 팝업 호출
                const popConfig = {
                    params : {
                        gubn : gubn, /* 1:인원, 2:기간, 3:장소 */
                        val  : val
                    },
                    renderer : {
                        component : PDMY2047
                    }
                }

                modalService.openSlidePagePopup(popConfig).then(response => {

                    this.dis_fncObtAm = true

                    if(response.gubn == '1') { // 인원
                        this.pers = response.comnCVal
                    } else if(response.gubn == '2') { // 기간
                        this.trvPrdDsc = response.comnCVal
                        this.trvPrdDscNm = response.comnCExpl
                    } else if(response.gubn == '3') { // 장소
                        this.trvDsnC = response.comnCVal
                        this.trvDsnNm = response.comnCExpl
                        this.trvAirfare = response.refCntn1
                        this.trvCost = response.refCntn2
                        this.PDMY2025_srchKwrd = this.trvDsnNm
                        
                        this.getCurcData();
                    }

                    this.bacAm = 0

                    // 인원/기간/장소 선택완료시 여행경비 div표출 및 목표금액 세팅
                    if(this.trvDsnC != '' && this.trvDsnNm != '' && this.trvAirfare != 0 && this.trvCost != 0 && this.trvPrdDsc != '' && this.pers != 0) {

                        this.totTrvAirfare = this.pers * this.trvAirfare
                        this.totTrvCost = this.pers * this.trvCost * Number(this.trvPrdDsc)

                        this.bacAm = this.totTrvAirfare + this.totTrvCost - this.acNowBacTotAm
                        this.fncObtAm = keyupNumFormat(this.totTrvAirfare + this.totTrvCost) // 목표금액
                    }
                });
            },
            del(type) {

                if(type === 'PDMY2025_srchKwrd') {
                    this.trvDsnC = ''
                    this.trvDsnNm = ''
                    this.PDMY2025_srchKwrd = ''
                    this.trvAirfare = 0
                    this.trvCost = 0
                    this.totTrvAirfare = 0
                    this.totTrvCost = 0
                    this.fncObtAm = ''
                    this.bacAm = 0
                    this.dis_fncObtAm = true
                    this.foc_fncObtAm = false
                } else if(type === 'fncObtAm') {
                    this.fncObtAm = ''
                    this.bacAm = 0
                } else if(type === 'obtDt') {
                    this.obtDt = ''
                }
            },
            // input 클릭 시 focus 관련
            fn_focusOnOff(type) {
                switch(type) {
                    case 'fncObtAm':
                        this.foc_fncObtAm = true
                        this.foc_obtDt    = false
                        break
                    case 'obtDt_on':
                        this.foc_fncObtAm = false
                        this.foc_obtDt    = true
                        break
                    case 'obtDt_off':
                        this.foc_fncObtAm = false
                        this.foc_obtDt    = false
                        break
                }
            },
            // 글자수 체크
            fn_checkWord(event, maxByte) {
                let rtnObj = checkWord(event.target.value, maxByte)

                if(rtnObj.flag) {this.$refs.PDMY2025_srchKwrd.blur()}   // 알럿 중복 방지

                event.target.value = rtnObj.value
                this.PDMY2025_srchKwrd = event.target.value
            },
            addComma() {

                this.bacAm = 0
                const selectionStartPos = this.$refs.fncObtAm.selectionStart
                const selectionEndPos = this.$refs.fncObtAm.selectionEnd

                if(this.fncObtAm.length == 1 && this.fncObtAm == 0) {
                    this.fncObtAm = this.fncObtAm.slice(0, -1)
                } else {
                    this.fncObtAm = this.fncObtAm.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                    this.fncObtAm = this.fncObtAm.split(",").join("")
                    this.fncObtAm = keyupNumFormat(this.fncObtAm)
                }

                if(event.keyCode === 8) {
                    this.$nextTick(()=>{
                        this.$refs.fncObtAm.focus()
                        this.$refs.fncObtAm.setSelectionRange(selectionStartPos,selectionEndPos)
                    })
                }
            },
            curcAddComma(nStr){
                return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
            },
            remove(value) {
                return (typeof value === "string") ? value.split(".").join("").split("-").join("").split(",").join("") : value
            },
            insertExpensePerpose() {

                // validation 체크
                if(this.obtnm.length == 0 || this.obtnm == '') {
                    modalService.alert("목표명은 필수입력항목입니다.").then(() => {});
                    return;
                }
                if(this.trvDsnC.length == 0 || this.trvDsnC == '') {
                    modalService.alert("여행목적지는 필수입력항목입니다.").then(() => {});
                    return;
                }

                if(this.trvPrdDsc.length == 0 || this.trvPrdDsc == '') {
                    modalService.alert("여행기간은 필수입력항목입니다.").then(() => {});
                    return;
                }

                if(this.pers.length == 0 || this.pers == 0) {
                    modalService.alert("인원수는 필수입력항목입니다.").then(() => {});
                    return;
                }

                if(this.obtDt.length == 0 || this.obtDt == "") {
                    modalService.alert("목표기간은 필수입력항목입니다.").then(() => {});
                    return;
                }

                if(!isValidDate(this.remove(this.obtDt))) {
                    modalService.alert("목표기간의 날짜형식을 확인바랍니다.").then(() => {});
                    return;
                }

                if(Number(dateFormat(new Date, 'YYYYMMDD')) >= Number(dateFormat(this.obtDt, 'YYYYMMDD'))) {
                    modalService.alert("목표기간을 현재년월 이후로 입력바랍니다.").then(() => {});
                    return;
                }

                if(monthDiff(dateFormat(dateFormat(this.remove(this.obtDt), 'YYYYMMDD'), 'YYYYMMDD'), dateFormat(new Date, 'YYYYMMDD')) < 6 ||
                   monthDiff(dateFormat(dateFormat(this.remove(this.obtDt), 'YYYYMMDD'), 'YYYYMMDD'), dateFormat(new Date, 'YYYYMMDD')) > (12 * 10)) {
                    modalService.alert("목표기간을 현재년월 이후 최소 6개월 ~ 10년 사이로 입력바랍니다.").then(() => {});
                    return;
                }

                // 수정
                let alertMsg
                if(this.insYn == "U") {
                    alertMsg = '여행 목표를 수정하시겠습니까?'
                }
                
                const configConfirm = {
                    content: [alertMsg],
                    title  : "",
                }
                if(this.insYn == "U") {
                    modalService.confirm(configConfirm).then(text => {
                        if(text == "예") {
                            this.fn_save();
                        }
                    });
                } else{
                    this.fn_save();
                }
            },
            fn_save() {
                this.subListIn = []
                var inputFncObtAm = Number(this.remove(this.fncObtAm))

				// 연결계좌를 선택했을 경우
				if(this.subList.length > 0) {

					if(this.acNowBacTotAm >= inputFncObtAm) {
						modalService.alert("계좌 잔액이 목표 금액을 초과하였습니다.<BR>연결계좌를 다시 선택하세요").then(() => {});
						return;
					}

					/*
					if(this.subList.length == 0) {
						modalService.alert("선택된 연결계좌가 없습니다.").then(() => {});
						return;
					}
					*/
				}
                // 등록 연결계좌내역 삽입
                this.subListIn = this.subList
                //this.subListIn = _.orderBy(this.subList, 'mydtAcno','asc')

                if(this.insYn == "C") {
                    this.rgDt = dateFormat(new Date, 'YYYYMMDD')
                }

                const config = {
                    url: '/pd/my/25s01',        // /pd/my/16s01

                    data: {"trDsc":this.insYn
                            ,"mydtCusno": this.mydtCusno // 마이데이터고객번호
                            ,"fncObtDsc" : this.fncObtDsc
                            ,"sqno": this.sqno
                            ,"trvDsnC":this.trvDsnC
                            ,"pers":this.pers
                            ,"trvPrdDsc":this.trvPrdDsc
                            ,"fncObtAm" : inputFncObtAm
                            ,"obtDt" : this.remove(this.obtDt)
                            ,"prgStsCd" : this.prgStsCd // 진행상태코드 0:전체, 1:진행중, 2:종료
                            ,"subListIn" : this.subListIn
                            ,"fncObtAchvYn":this.fncObtAchvYn
                            ,"obtnm":this.obtnm.trim()
                            ,"rgDt":this.rgDt
                            }
                };
                
                apiService.call(config).then(response => {

                    if(response.rspCd == '0000'){
                        if(this.insYn == "U"){ // 수정
                            modalService.alert("저장되었습니다.").then(() => {
                                // 전체페이지 닫기
                                if(this.bannerPopYn == "Y") {
                                    this.closeAllLeftMain('reSelect')
                                } else {
                                    this.closeAllData('reSelect')
                                }
                            });
                        } else{	// 등록		
                            // 전체페이지 닫기
                            if(this.bannerPopYn == "Y") {
                                this.closeAllLeftMain('reSelect')
                            } else {
                                this.close()
							
                                // 계좌연결 팝업 호출
                                const config = {
                                    component: PDMY4050,
                                    params : {
                                        accountList   : this.accountList,
                                        mydtCusno     : this.mydtCusno,
                                        fncObtDsc     : this.fncObtDsc,
                                        fncObtAm      : this.fncObtAm,
                                        acNowBacTotAm : this.acNowBacTotAm,
                                        bacAm         : this.bacAm,
                                        obtnm         : this.obtnm
                                    }
                                    
                                };
                                modalService.openPopup(config).then(() => {});
                            }
                        }
                    } else {
                        modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {
                            //this.close(response);
                        })
                    }
                });
            },
            fn_modifyFncObtAm() {

                this.dis_fncObtAm = false
                this.foc_fncObtAm = true
                setTimeout(() => {
                    this.$refs.fncObtAm.focus()
                }, 10)
            },
            getAcctList() {
                const config = {
                    url : "/co/co/07r01",
                    data : {
                        mydtCusno   : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
                        bnkAcDsc    : '11',                             // 은행계좌구분코드 (11:나의목표_수신상품, 21:나의목표_투자상품, 10 : 수신상품, 20 : 투자상품, 32: 담보대출(부동산) , 35: 할부금융(자동차)) 
                    }
                }

                apiService.call(config).then(response => {

                    this.accountList = response.accountList || []

                    // 빈계좌 세팅(테스트용)
                    /*
                    if(this.accountList.length == 0) {

                        let inputAcct1 = {}
                        inputAcct1.mydtCusno = this.getUserInfo("mydtCusno")
                        inputAcct1.infOfrmnOrgC = 'B2AAAL0000'
                        inputAcct1.mydtAcno = '111-11-11111'
                        inputAcct1.mydtScNo = '1'
                        inputAcct1.acWrsnm = '테스트계좌1'
                        inputAcct1.orgnm = '기관명1'
                        inputAcct1.acNowBac = 1230000

                        this.accountList.push(inputAcct1)

                        let inputAcct2 = {}
                        inputAcct2.mydtCusno = this.getUserInfo("mydtCusno")
                        inputAcct2.infOfrmnOrgC = 'B2AAAL0000'
                        inputAcct2.mydtAcno = '222-22-22222'
                        inputAcct2.mydtScNo = '2'
                        inputAcct2.acWrsnm = '테스트계좌2'
                        inputAcct2.orgnm = '기관명2'
                        inputAcct2.acNowBac = 120000

                        this.accountList.push(inputAcct2)

                        let inputAcct3 = {}
                        inputAcct3.mydtCusno = this.getUserInfo("mydtCusno")
                        inputAcct3.infOfrmnOrgC = 'B2AAAL0000'
                        inputAcct3.mydtAcno = '333-33-33333'
                        inputAcct3.mydtScNo = '2'
                        inputAcct3.acWrsnm = '테스트계좌3'
                        inputAcct3.orgnm = '기관명3'
                        inputAcct3.acNowBac = 111222

                        this.accountList.push(inputAcct3)
                    }
                    */
                })
            },
            // 연결계좌 팝업 오픈
            openSlidePagePopupWithComponent() {

                const acctPopList = []

                if(this.accountList.length > 0) {
                    for(let i=0; i<this.accountList.length; i++){

                        let acctInfo = this.accountList[i]

                        let inputInfo = {}
                        inputInfo.goodsCode  = acctInfo.mydtAcno
                        inputInfo.goodsName  = acctInfo.acWrsnm
                        inputInfo.goodsPrice = acctInfo.acNowBac
                        inputInfo.orgC  = acctInfo.infOfrmnOrgC
                        inputInfo.orgNm = acctInfo.orgnm
                        inputInfo.scNo  = acctInfo.mydtScNo

                        if(this.subList.length == 0) {
                            inputInfo.checked = false
                        } else {
                            // 조회된 연결계좌가 있으면 팝업호출시 체크된 상태로
                            inputInfo.checked = this.setAcctCheckedInfo(acctInfo.mydtAcno, acctInfo.mydtScNo)
                        }

                        acctPopList.push(inputInfo)
                    }
                }
                                
                const config = {
                    params: {
                        title: '계좌연결',
                    },
                    renderer: {
                        component: COCO1124,
                        cdata : {"title":'계좌연결',
                                "contentList":[
                                                {
                                                    'contentGubn':'01', 
                                                    'contentTitle':'계좌연결',
                                                    'contentData':acctPopList,
                                                }
                                            ],
                                "purposeYn":"Y",                            /* 화면구분(금융생활-목표등록) */
                                "fncObtAm": this.remove(this.fncObtAm) || 0 /* 목표금액 */
                                }
                    }
                }
                modalService.openSlidePagePopup(config).then(response => {

                    // 등록된 연결계좌 목록 초기화후 재세팅
                    let selectGoodsList = response || []

                    if(this.accountList.length > 0) {
                        if(selectGoodsList.length == 0) {
                            modalService.alert("선택된 연결계좌가 없습니다.").then(() => {});
                            return;
                        }
                    }

                    this.subList = []

					// 연결계좌를 선택하지 않은 경우도 있음
					if(selectGoodsList.length > 0) {
						for(let i=0; i<selectGoodsList.length; i++){
							var inputObj = {}

							if(selectGoodsList[i].checked) { 
								//let acctInfo = this.setAcctInfo(selectGoodsList[i].goodsCode) // 계좌정보

								inputObj.mydtCusno = this.mydtCusno
								inputObj.fncObtDsc = this.fncObtDsc               // 금융목표(돈모으기)
								inputObj.infOfrmnOrgC  = selectGoodsList[i].orgC  // 기관코드
								inputObj.infOfrmnOrgNm = selectGoodsList[i].orgNm // 기관명
								inputObj.mydtAcno = selectGoodsList[i].goodsCode  // 마이데이터계좌번호
								inputObj.mydtScNo = selectGoodsList[i].scNo       // 마이데이터회차번호
								inputObj.acWrsnm  = selectGoodsList[i].goodsName  // 계좌상품명
								inputObj.acNowBac = selectGoodsList[i].goodsPrice // 계좌현재잔액

								this.subList.push(inputObj)
							}
						}
					} else {
						this.subList = []
					}
                    this.acNowBacTotAm = _.sumBy(this.subList, item => {return item.acNowBac }) // 계좌현재잔액총액
                    this.bacAm = (this.remove(this.fncObtAm)) - this.acNowBacTotAm
                    
                })
            },
            setAcctCheckedInfo(mydtAcno, mydtScNo) {
                // 계좌번호
                let acctInfo = _.find(this.subList, {"mydtAcno":mydtAcno, "mydtScNo":mydtScNo})
                if(typeof acctInfo !== 'undefined') {
                    return true
                } else {
                    return false
                }
            },
            fn_infoClear() {

                this.trvDsnC = ''
                this.trvDsnNm = ''
                this.trvAirfare = 0
                this.trvCost = 0
                this.totTrvAirfare = 0
                this.totTrvCost = 0
                this.fncObtAm = 0
                this.bacAm = 0
                this.dis_fncObtAm = true
                this.foc_fncObtAm = false
            },
            fn_setBacAm() {
                if(this.fncObtAm.length == 1 && this.fncObtAm == 0) {
                    this.bacAm = 0
                } else {
                    this.bacAm = (this.remove(this.fncObtAm)) - this.acNowBacTotAm
                }
            },
            fn_popupCalendar(evt) {

                let tmpDt = ""
                let minDate = ''
                let maxDate = ''

                if(this.insYn == 'C') {
                    if(this.obtDt !== undefined && this.obtDt !== null && this.obtDt !== '') {
                        tmpDt = dateFormat(this.obtDt, 'YYYY-MM-DD')
                    } else {
                        tmpDt = dateFormat(monthAdd(6), 'YYYY-MM-DD')
                    } 
                    minDate = dateFormat(monthAdd(6), 'YYYY-MM-DD')
                    maxDate = dateFormat(monthAdd(120), 'YYYY-MM-DD')
                } else {
                    tmpDt = dateFormat(this.obtDt, 'YYYY-MM-DD')
                    minDate = dateFormat(monthAdd(6), 'YYYY-MM-DD')
                    maxDate = dateFormat(monthAdd(120), 'YYYY-MM-DD')
                }
                
                let config = {
                    pDate   : tmpDt,
                    minDate : minDate,
                    maxDate : maxDate
                }

                modalService.calendarPopup(config).then(response => {
                    
                    if(response !== undefined && response !== null && response !== '')
                    {
                        evt.target.value = dateFormat(response, "YYYY-MM-DD")
                        this.obtDt = evt.target.value
                        this.obtDtLabel =  dateFormat(response, "YYYY년 MM월 DD일")
                    }
                })
            },
            fn_bannerPopYn() {
                let modalInfo = this.$store.state.modal.modalList
                let modalLength = this.$store.state.modal.modalList.length

                let bannerPopYn = ""

                for(let i=0; i<modalLength; i++) {
                    if(modalInfo[i].component.name.indexOf("PDYT1105") !== -1 ||
                        modalInfo[i].component.name.indexOf("PDPD2110") !== -1 ||
                        modalInfo[i].component.name.indexOf("ASIP1102") !== -1) 
                    {
                        bannerPopYn = "Y"
                    }
                }
                return bannerPopYn
            },
            // 한글금액표시
            fn_hanValue(amount) {
                const koreanUnits = ['', '만', '억', '조']
                let han_amount = parseInt(amount.split(',').join(''))
                let answer     = ''
                let unit       = 10000
                let index      = 0
                let division   = Math.pow(unit, index)

                while (Math.floor(han_amount / division) > 0) {
                    const mod = Math.floor(han_amount % (division * unit) / division)
                    if (mod) {
                        const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                        answer = `${modToString}${koreanUnits[index]} ` + answer
                    }
                    division = Math.pow(unit, ++index)
                }
                return (answer + "원").replace(" 원", "원")
            }
        }
    }
</script>