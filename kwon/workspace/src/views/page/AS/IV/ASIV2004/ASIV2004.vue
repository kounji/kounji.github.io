<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 투자 > 투자상세(증권) > 보유상품
* @ 페이지설명 : 나의자산 > 자산 > 투자 > 투자상세(증권) > 보유상품
* @ 파일명     : src/views/page/AS/IV/ASIV2004/ASIV2004.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-10-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-10-13             CS515729                 최초작성
* 2022-07-11             CS528205                 고도화 파일명, UI 변경 및 고도화 개발(ASIV1003.vue -> ASIV2004.vue)
*************************************************************************/
-->
<template>

    <div class="full_popup renewal mydata2023" id="full_popup_01"> 
        <div class="popup_header">
            <h1 class="">보유상품</h1>
        </div>
        
        <div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
                
            <div class="asset_info_box">
                <div class="com_inner">
                    <div class="asset_info_wrap">
                        <div class="asset_info">
                            <dl>
                                <dt>{{objIvInfo.fncIvAcOnm}}</dt>
                                <dd>
                                    <span class="account_num">{{objIvInfo.mydtAcno}}</span>
                                </dd>
                            </dl>
                            <div class="bank_icon">
                                <i :class="objIvInfo.infOfrmnOrgC"><span class="blind">{{objIvInfo.infOfrmnOrgnm}}</span></i>
                            </div>
                        </div>

                        <div class="asset_price_wrap">
                            <div class="amount">총 평가금액
                                <div class="custom_tooltip">
                                    <div class="com_tooltip_type02 com_tooltip_type03">
                                        <a href="javascript:void(0);" class="com_btn_info" @click.prevent="fn_openToolTip" role="button">
                                            <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                        </a>
                                        <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                                            <div>
                                                해외 거래 상품의 경우 전일자 환율 기준 
                                                원화로 환산한 금액이 반영되어 있어 조회 
                                                시점에 따라 실제 금액과 다를 수 있습니다.
                                                <a href="javascript:void(0);" class="com_btn_close" @click.prevent="fn_openToolTip"><span class="blind">툴팁닫기</span></a>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="asset_price">
                                <span class="num counter" :data-count="respInfo.totAcEvlam">{{respInfo.totAcEvlam | numberFilter}}</span>원
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="hr02">
            </div>
            
            <div class="com_inner">
                <div class="choice_option">
                    <button type="button" title="선택됨" v-bind:class="{active : chartDataSortMode === '1'}" @click.prevent="getChart('1')">평가금액</button>
                    <button type="button" title="선택안됨" v-bind:class="{active : chartDataSortMode === '2'}" @click.prevent="getChart('2')">수익률</button>
                    <button type="button" title="선택안됨" v-bind:class="{active : chartDataSortMode === '3'}" @click.prevent="getChart('3')">보유수량</button>
                </div>

                <div class="chart_box chart_full">
                    <p class="chart_sub_txt">[단위: 만원]</p>
                    <div id="chartHolder" role="img"></div>
                </div>
            </div>
            
            <div class="com_inner">   			
                <template v-if="holdItemsList.length > 0">			
                    <template v-for="(item, idx) in holdItemsList">

                        <div class="asset_more_list type_02" :key="idx "> 
                
                            <div class="list_title">
                                {{item.ivAcWrsnm}}
                                <span class="mint_badge">{{item.ivCrdDsnm}}</span>
                            </div>
                    
                            <ul>
                                <li>
                                    <dl>
                                        <dt>평가금액</dt>
                                        <dd :role="item.strmPftrt === 0 ? '' : 'text'">
                                            <span class="change_rate" v-if="item.strmPftrt === 0">
                                                <em>{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}</em>%
                                            </span>
                                            <span class="change_rate up" v-else-if="item.strmPftrt > 0">
                                                <span class="blind">상승</span>
                                                <em>{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}</em>%
                                            </span>
                                            <span class="change_rate down" v-else>
                                                <span class="blind">하락</span>
                                                <em>{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}</em>%
                                            </span>
                                            <span>
                                                <em class="num">{{item.acEvlam | numberFilter}}
                                                    <span class="unit">{{item.curc ==="KRW" ? '원' : item.curc}}</span>
                                                </em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>매입금액</dt>
                                        <dd>
                                            <span>
                                                <em class="num">{{item.ivByam | numberFilter}}
                                                    <span class="unit">{{item.curc ==="KRW" ? '원' : item.curc}}</span>
                                                </em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>    
                                        <dt>보유수량</dt>
                                        <dd>
                                            <span>
                                                <em class="num">{{item.ivHldQt | numberFilter}}
                                                    <span class="unit">{{item.fncIvQtUntnm}}</span>
                                                </em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>    
                                        <dt>세제혜택</dt>
                                        <dd>
                                            <span>
                                                <em class="listy_ty2_txt">{{item.txfrAplYn==='1' ? '적용' : '미적용'}}</em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl v-if="item.dvtvPztDsc">    
                                        <dt>파생상품포지션</dt>
                                        <dd>
                                            <span>
                                                <em class="listy_ty2_txt" >{{item.dvtvPztDsnm ? item.dvtvPztDsnm : item.dvtvPztDsc}}</em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>    
                                        <dt>체결기준여부</dt>
                                        <dd>
                                            <span>
                                                <em class="listy_ty2_txt">{{item.cnclBasYn==='1' ? '체결' : '미체결'}}</em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>    
                                        <dt>통화코드</dt>
                                        <dd>
                                            <span>
                                                <em class="listy_ty2_txt">{{item.curc}}
                                                    <span class="unit">{{item.curc ==="KRW" ? '(원)' : '' }}</span>
                                                </em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl v-if="item.frStkXchgC">    
                                        <dt>거래소</dt>
                                        
                                        <dd>
                                            <span>
                                                <em class="listy_ty2_txt">{{item.frStkXchgnm}}</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>  
                
                    </template>
                </template>
            
                <template v-else>
                    <div class="no_data_box no_data_box01 grayExclamationType">
                        <div class="no_data_list">
                            <p>조회된  정보가 없습니다.</p>
                        </div>
                    </div>
                </template>			
            
            </div> 
            
        </div>  

        <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
    </div>  
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import _ from 'lodash'
    import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

    export default {
        name : "ASIV2004",
        data: () => {
            return {
                objIvInfo   : {},   //전달파라미터
                respInfo    : {},   //응답결과 헤더
                isToolTip   : false,
                chartDataSortMode : "", // "1" : 평가금액, "2" : 수익률, "3" : 보유수량
                hasChartData : true,

                holdItemsList : [], //보유상품목록
                curcList : [],      //환율목록
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        computed : {
        },
        created() {
            this.objIvInfo = this.params.objIvInfo    //전달받은 파라미터
            this.chartDataSortMode = "1"              //차트 평가금액 기준 정렬
        },
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
                /**
                 * 증권계좌 보유상품 조회 
                 */
                const config = {
                    url: '/as/iv/04r02',
                    data: {
                        "mydtCusno"    : this.objIvInfo.mydtCusno,
                        "infOfrmnOrgC" : this.objIvInfo.infOfrmnOrgC,
                        "mydtAcno"     : this.objIvInfo.mydtAcno,
                    }
                }

                apiService.call(config).then(response => {

                    this.respInfo = response
                    this.holdItemsList = this.respInfo.holdItemsList || []

                    this.hasChartData = this.holdItemsList.length > 0 
                    if (!this.hasChartData)
                        return

                    var shouldExchangeAm = false;
                    // 통화코드 외화가 있는지 확인.
                    for (var i = 0; i < this.holdItemsList.length; i++) {
                        if (this.holdItemsList[i].curc !== 'KRW') {
                            shouldExchangeAm = true;
                            break;
                        }
                    }

                    // 외화있을 경우 환율 조회 서비스 호출
                    if (shouldExchangeAm) {
                        this.getExchangeRates()
                    } else {
                        setTimeout(this.getChart(this.chartDataSortMode), 10)
                    }
                })
            },
            /**
             * 환율 조회
             */
            getExchangeRates() {
                const config = {
                    url: '/as/iv/03ra1',
                    data: {
                    }
                }
                apiService.call(config).then(response => {
                    this.curcList = response.exchangeRateList || []
                    this.$nextTick(() => {

                        setTimeout(this.getChart(this.chartDataSortMode), 10)
                    })
                })
            },
            /**
            * Tooltip 표시
            */
            fn_openToolTip() {
                this.isToolTip = !this.isToolTip
            },
            /**
            * 차트 생성
            */
            getChart(sortMode) {
                this.chartDataSortMode = sortMode

                if (!this.hasChartData)
                    return
                
                var tranList = this.holdItemsList;
                let visibleItemMaxSize = 6;
                let isScrollable = tranList.length > visibleItemMaxSize; // 데이터가 6개 초과일때 스크롤 차트로 표현

                var nmMaxLength = this.getNameMaxLength(isScrollable, tranList.length)
                // 선택된 기준에 따라 정렬
                switch(sortMode) {
                    case "1": // 평가금액
                        tranList = _.orderBy(tranList, 'acEvlam', 'desc')
                        break;
                    case "2": // 수익률
                        tranList = _.orderBy(tranList, 'strmPftrt', 'desc')
                        break;
                    case "3": // 보유수량
                        tranList = _.orderBy(tranList, 'ivHldQt', 'desc')
                        break;
                }

                // 차트 데이터 포맷으로 변경
                var chartData = []
                var maxValue = 0        // 그래프 세로축에 max 값을 설정
                var minValue = 0        // 그래프 세로축에 min 값을 설정
                for (var i = 0; i < tranList.length; i++) {
                    var item = tranList[i]
                    var exchangeRate = 1    // 환율 (원화는 1)
                    if (item.curc !== 'KRW') {
                        exchangeRate = this.getRate(item.curc)
                    }

                    var acEvlam = item.acEvlam != 0 ? parseInt((item.acEvlam*exchangeRate)/10000) : 0 // 만원 미만 0원 절사처리, 만원 단위 표기
                    var ivByam = item.ivByam != 0 ? parseInt((item.ivByam*exchangeRate)/10000) : 0 // 만원 미만 0원 절사처리, 만원 단위 표기
                    var evgl = parseInt(((item.acEvlam-item.ivByam)*exchangeRate)/10000) // 평가손익. 만원 미만 0원 절사처리, 만원 단위 표기

                    minValue = Math.min(minValue, acEvlam, ivByam, evgl)
                    maxValue = Math.max(maxValue, acEvlam, ivByam, evgl)

                    var name = item.ivAcWrsnm
                    if (name.length > nmMaxLength) {
                        name = name.substring(0, nmMaxLength) + "..."
                    }

                    chartData.push({"nm":name, "byam":ivByam, "acEvlam":acEvlam, "evgl":evgl, "oriNm":item.ivAcWrsnm});
                }
                    
                // -----------------------차트 설정 시작-----------------------
                // rMateChart 를 생성합니다.
                // 파라메터 (순서대로)
                //  1. 차트의 id ( 임의로 지정하십시오. )
                //  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
                //  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
                //  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
                //  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
                rMateChartH5.create("chart1", "chartHolder", "useContextMenu=false", "100%", "220rem"); 
                
                // 스트링 형식으로 레이아웃 정의.
                let layoutStr =
                    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'	
                        +'<Stroke id="stroke" color="#cbcdd6" weight="1"/>'	
                        +'<Options>'
                            +'<Legend defaultMouseOverAction="false" fontSize="13" />'
                        +'</Options>'
                        +'<Column2DChart gutterLeft="0" showDataTips="true" columnWidthRatio=".75" selectionMode="single"  styleName="valueLabelStyle">'
                        +'<horizontalAxis>'
                                +'<CategoryAxis categoryField="nm"/>'
                            +'</horizontalAxis>'
                            +'<verticalAxis>'
                                +'<LinearAxis maximum="' + maxValue + '" minimum="' + minValue + '"/>'
                            +'</verticalAxis>'
                            +'<series>'
                                +'<Column2DSeries labelPosition="outside" yField="byam" displayName="매입금액" itemRenderer="SemiCircleColumnItemRenderer" showValueLabels="[]">'
                                    +'<fill>'
                                        +'<SolidColor color="#19b9be"/>'
                                    +'</fill>'
                                    +'<showDataEffect>'
                                        +'<SeriesInterpolate/>'
                                    +'</showDataEffect>'
                                +'</Column2DSeries>'
                                +'<Column2DSeries labelPosition="outside" yField="acEvlam" displayName="평가금액" itemRenderer="SemiCircleColumnItemRenderer" showValueLabels="[]">'
                                    +'<fill>'
                                        +'<SolidColor color="#fdbb68"/>'
                                    +'</fill>'
                                    +'<showDataEffect>'
                                        +'<SeriesInterpolate/>'
                                    +'</showDataEffect>'
                                +'</Column2DSeries>'
                                +'<Column2DSeries labelPosition="outside" yField="evgl" displayName="평가손익" itemRenderer="SemiCircleColumnItemRenderer" showValueLabels="[]">'
                                    +'<fill>'
                                        +'<SolidColor color="#688ee2"/>'
                                    +'</fill>'
                                    +'<showDataEffect>'
                                        +'<SeriesInterpolate/>'
                                    +'</showDataEffect>'
                                +'</Column2DSeries>'
                            +'</series>'
                            +'<backgroundElements>'
                            //+'<GridLines/>'
                            +'<AxisMarker>'
                                    +'<lines>'
                                        +'<AxisLine value="0" label="" labelAlign="left" stroke="{stroke}"/>'
                                        +'<AxisLine value="4" lineStyle="dashLine">'
                                            +'<stroke>'
                                                +'<Stroke color="#ced0d9" weight="1"/>'
                                            +'</stroke>'
                                        +'</AxisLine>'
                                        +'<AxisLine value="8" lineStyle="dashLine">'
                                            +'<stroke>'
                                                +'<Stroke color="#ced0d9" weight="1"/>'
                                            +'</stroke>'
                                        +'</AxisLine>'
                                    +'</lines> '
                                +'</AxisMarker>'
                            +'</backgroundElements>'
                                +'<horizontalAxis>'
                                    +(isScrollable ? 
                                        '<CategoryLinearAxis id="hAxis" padding="0.5" categoryField="nm"/>'
                                            /* Scroll_Line_2D챠트 생성시엔 horizontalAxis에 CategoryLinearAxis를 정의해야합니다 */
                                        +'</horizontalAxis>' 
                                        +'<horizontalAxisRenderers>'
                                            +'<ScrollableAxisRenderer axis="{hAxis}" visibleItemSize="' + visibleItemMaxSize + '"/>'
                                            /*
                                            Scroll_Line_2D챠트 생성시엔 horizontalAxisRenderers ScrollableAxisRenderer를 정의해야 합니다
                                            visibleItemSize : 스크롤 차트가 한번에 표시할 데이터의 개수입니다
                                                */
                                        +'</horizontalAxisRenderers>' 
                                            :'<CategoryAxis id="hAxis" padding="0.5" categoryField="nm"/>'
                                        +'</horizontalAxis>')
                        +'</Column2DChart>'
                        +'<Style>'
                    +'.valueLabelStyle{'
                        +'font-family:"Spoqa Han Sans Neo";'
                        +'fontSize:14;'
                        +'color:#333;'
                    +'}'					
                +'</Style>'
                    +'</rMateChart>';
        
                // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
                //
                // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
                // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
                // 
                // 아래 내용은 
                // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
                // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
                
                rMateChartH5.calls("chart1", {
                    "setLayout" : layoutStr,
                    "setData" : chartData
                });

                rMateChartH5.registerTheme(rMateChartH5.themes);
                // -----------------------차트 설정 끝 -----------------------
            },
            /**
             * 데이터 수에 따른 차트에 보여질 글자수 조정 (조정하지않으면 차트 깨짐 현상)
             */
            getNameMaxLength(isScrollable, itemCount) {
                if (isScrollable)
                    return 4
                else if (itemCount == 6)
                    return 4
                else if (itemCount == 5)
                    return 5
                else if (itemCount == 4)
                    return 7
                else if (itemCount == 3)
                    return 9
                else if (itemCount == 2)
                    return 10
            },
            /**
             * 환율 가져오기
             */
            getRate(curc) {
                for (var i = 0; i < this.curcList.length; i++) {
                    let item = this.curcList[i]
                    if (item.curc === curc) {
                        return item.rate
                    }
                }
                return 1
            } 
        }
    }
</script>