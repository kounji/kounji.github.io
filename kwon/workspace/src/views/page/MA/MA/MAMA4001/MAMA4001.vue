<!--
/*************************************************************************
* @ 서비스경로 : PFM메인 > 메인
* @ 페이지설명 : 자산현황 메인
* @ 파일명     : src/views/page/MA/MAMA1008/MAMA1008.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-04-30
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
  2022-07-26              CS528063                 고도화 파일명, UI 변경 및 고도화 개발(MAMA0001.vue -> MAMA1008.vue)
  2023-07-18              CS533461                 상호 금융 고도화(MAMA1008.vue -> MAMA2001.vue)
  2023-07-18              CS540683                 상호금융 NH콕마이데이터 4.0 추진 개발 MAMA2001.vue -> MAMA4001.vue)
*************************************************************************/
-->
<template>
    <div class="content-view">
        <div id="content">
            <section class="main_united">
                <!-- [배너] -->
                <cmm-flot-banner bnnrExpsDsVal="41" addClass="ty01"/>
                <!-- [안내문구 및 최근 업데이트일시] -->
                <div class="info">
                    <p class="title"><span>{{cusnm}}</span> 고객님께 드리는<br><em>{{currMm}}월 자산관리 리포트입니다.</em></p>
                    <div class="update" @click.prevent="fn_refreshApiCall()">
                        <template v-if="!isMyAssetGathering">
                            <span>{{ assetUpdateDtm }}</span> <!-- V4.0 -->
                            <button class="btn_update"><span class="blind">새로고침</span></button>
                        </template>
                        <span v-else class="ml5 num lsp0">자산 업데이트 중입니다</span>
                    </div>                    
                    <a href="javascript:void(0);" class="char_set" @click="fn_moveOpenPage('MAMA4004')" > <!--[v4.0] 2025-03-17 a구조로 변경 -->
                        <lottie-animation v-show="fn_setAvatarInfo === 'myAvatarId01'" :animationData="require('@/assets_v40/images/lottie/icon_united_mento.json')" ref="anim"  :loop="true" :auto-play="true"  :speed="1" aria-hidden="true" class="icon_united_me" ></lottie-animation>
                        <lottie-animation v-show="fn_setAvatarInfo === 'myAvatarId02'" :animationData="require('@/assets_v40/images/lottie/icon_united_swell.json')" ref="anim"  :loop="true" :auto-play="true"  :speed="1" aria-hidden="true" class="icon_united_me" ></lottie-animation> 
                        <lottie-animation v-show="fn_setAvatarInfo === 'myAvatarId03'" :animationData="require('@/assets_v40/images/lottie/icon_united_savings_king.json')" ref="anim"  :loop="true" :auto-play="true"  :speed="1" aria-hidden="true" class="icon_united_me" ></lottie-animation> 
                        <lottie-animation v-show="fn_setAvatarInfo === 'myAvatarId04'" :animationData="require('@/assets_v40/images/lottie/icon_united_investment_genius.json')" ref="anim"  :loop="true" :auto-play="true"  :speed="1" aria-hidden="true" class="icon_united_me" ></lottie-animation> 
                        <lottie-animation v-show="fn_setAvatarInfo === 'myAvatarId05'" :animationData="require('@/assets_v40/images/lottie/icon_united_saving_master.json')" ref="anim"  :loop="true" :auto-play="true"  :speed="1" aria-hidden="true" class="icon_united_me" ></lottie-animation> 
                        <lottie-animation v-show="fn_setAvatarInfo === 'myAvatarId06'" :animationData="require('@/assets_v40/images/lottie/icon_united_insurance_guardian.json')" ref="anim"  :loop="true" :auto-play="true"  :speed="1" aria-hidden="true" class="icon_united_me" ></lottie-animation> 
                        <lottie-animation v-show="fn_setAvatarInfo === 'myAvatarId08'" :animationData="require('@/assets_v40/images/lottie/icon_united_credit_keeper.json')" ref="anim"  :loop="true" :auto-play="true"  :speed="1" aria-hidden="true" class="icon_united_me" ></lottie-animation> 
                        <lottie-animation v-show="fn_setAvatarInfo === 'myAvatarId09'" :animationData="require('@/assets_v40/images/lottie/icon_united_loan_coach.json')" ref="anim"  :loop="true" :auto-play="true"  :speed="1" aria-hidden="true" class="icon_united_me" ></lottie-animation> 
                        <!-- 140 x 130
                            금융멘토 icon_united_mento.json
                            디지털금융달인 icon_united_swell.json
                            저축왕 icon_united_savings_king.json
                            투자천재 icon_united_investment_genius.json
                            절약마스터 icon_united_saving_master.json
                            보험수호자 icon_united_insurance_guardian.json
                            신용지킴이 icon_united_credit_keeper.json
                            대출코치 icon_united_loan_coach.json
                        -->
                    </a>                        
                </div>   

                <!-- [나의 재무진단, 나의 금융스타일] -->
                <div class="finance_sheet" >
                    <div class="board_box">
                        <ul role="tablist" class="inner_tab green">
                            <li role="tab" aria-controls="tab_01" :class="selectTab === 'FNA' ? 'on' : ''"><button type="button" role="tab" :aria-selected="selectTab === 'FNA' ? 'true' : 'false'" @click.prevent="fn_selectTab('FNA')">나의 재무 진단</button></li>
                            <li role="tab" aria-controls="tab_02" :class="selectTab === 'FNC' ? 'on' : ''"><button type="button" role="tab" :aria-selected="selectTab === 'FNC' ? 'true' : 'false'" @click.prevent="fn_selectTab('FNC')">나의 금융스타일</button></li>                            
                        </ul>

                        <!-- Tab 01 나의 재무진단 -->
                        <div class="analysis" v-if="selectTab == 'FNA'">
                            <ul>
                                <li :class="`${hseFnaIxSatRate}`" >
                                    <a href="#nolink">
                                        <div class="graph"></div>
                                        <strong>가계재무</strong>
                                        <span class="bubble"></span>
                                    </a>
                                </li>
                                <li :class="`${futRsvIxSatRate}`">
                                    <a href="#nolink">
                                        <div class="graph"></div>
                                        <strong>미래준비</strong>
                                        <span class="bubble"></span>
                                    </a>
                                </li>
                                <li :class="`${dbtAmnIxSatRate}`">
                                    <a href="#nolink">
                                        <div class="graph"></div>
                                        <strong>부채관리</strong>
                                        <span class="bubble"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <!-- Tab 02 나의 금융스타일 -->
                        <div class="style" v-if="selectTab == 'FNC'">
                            <a href="#nolink">
                                <p class="name">{{prdStyCdNm}}</p>
                                <div class="info">
                                    <p>{{prdStyDtlPhr1}}</p>
                                    <div class="label">
                                        <span>저축 {{svRto}}%</span>
                                        <span>투자 {{ivRto}}%</span>
                                    </div>
                                </div>
                                <canvas id="finance_style"></canvas>
                            </a>
                            <!--script>
                                    const colors =[
                                        [
                                            [0,'#3fd999']
                                        ],
                                        [
                                            [0,'#6b75ff']
                                        ]
                                    ]
                                
                                    const data = {
                                        parts:{"pt": [75 , 25]},//percentage of each parts
                                        colors:{"cs": colors }//color of each part
                                    };
            
                                    var canvas  = document.getElementById("finance_style");
                                    var chart = canvas.getContext("2d");									
                                    var drawDount = new drawdountChart(chart);
                            
                                    drawDount.set(50, 50, 40, false, Math.PI*0.5, Math.PI*2.5, 16, "#ebf1f9", 2, 1.5, "round");/*x, y, radius, counterclockwise, from, to, lineWidth, strockStyle, circle, dir, lineCap*/
                                
                                    chart.clearRect(0, 0, 100, 100);
                                    drawDount.draw(data);
                            </script-->
                            <!-- CANVAS 공통콤퍼넌트로 변경 -->
                            <cmm-canvas canvaMode="mama4001" :cycledata=cycleData :cycleIdx=cycleIdx :pos="[50, 50, 40, false, Math.PI*0.5, Math.PI*2.5, 16, '#ebf1f9', 2, 1.5, 'round']" ></cmm-canvas>
                        </div>
                    </div>
                    
                    <details>
                        <summary>
                            <!-- case1 증가 -->
                            <div v-if="indNtAsetTotAm > 0" class="head">
                                <p>지난달보다 <strong>자산이 <em>늘었어요</em></strong></p>
                                <lottie-animation :animationData="require('@/assets_v40/images/lottie/icon_united_up.json')" 
                                                ref="anim"
                                                :loop="true"
                                                :auto-play="true" 
                                                :speed="1"
                                                aria-hidden="true" 
                                                class="icon_range" 
                                                >
                                </lottie-animation>     
                            </div>

                            <!-- case2 감소 -->
                            <div v-else-if="indNtAsetTotAm < 0" class="head">
                                <p>지난달보다 <strong>자산이 <em>줄었어요</em></strong></p>
                                <lottie-animation :animationData="require('@/assets_v40/images/lottie/icon_united_down.json')" 
                                                ref="anim"
                                                :loop="true"
                                                :auto-play="true" 
                                                :speed="1"
                                                aria-hidden="true" 
                                                class="icon_range" 
                                                >
                                </lottie-animation>  
                            </div>

                            <!-- case3 동일 -->
                            <div v-else class="head">
                                <p>지난달과 <em>동일해요</em></p>
                            </div>                                                      
                            
                            <lottie-animation :animationData="require('@/assets_v40/images/lottie/icon_united_arrow.json')" 
                                            ref="anim"
                                            :loop="true"
                                            :auto-play="true" 
                                            aria-hidden="true" 
                                            class="icon_arrow" 
                                            >
                            </lottie-animation>                            
                            <!--<lottie-player src="@/assets_v40/images/lottie/icon_united_arrow.json" loop autoplay aria-hidden="true" class="icon_arrow"></lottie-player>-->
                        </summary>
                        <div class="cont">
                            <p class="sum_tit">총 자산</p>
                            <a href="#nolink" class="sum_select">{{ ntAsetTotAm | numberFilter }}<span>원</span></a><!-- totAsetAm astIndSum-->
                            <div class="tooltip">
                                <p class="latter up" v-if="indNtAsetTotAm > 0">지난달보다 <span class="num">{{ indNtAsetTotAm | numberFilter }}원</span> <em>늘었어요.</em></p>
                                <p class="latter latter down" v-else-if="indNtAsetTotAm < 0">지난달보다 <span class="num">{{ indNtAsetTotAm | numberFilter }}원</span> <em>줄었어요.</em></p>
                                <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                <div class="custom_tooltip top">
                                    <div class="com_tooltip_type02">
                                        <a href="#nolink" class="com_btn_info" role="button">
                                            <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                        </a>
                                        <div class="com_ballon_type01 com_ballon_type02">
                                            <div>
                                                <ul class="dotted_list">
                                                    <li>마지막 업데이트 시점의 총 자산과 마지막 업데이트 전 월 말일의 총자산을 비교했습니다.</li>
                                                    <li>오늘 업데이트 하셨으면 전 월 말일 총 자산과 비교한 결과입니다.</li>
                                                </ul>
                                                <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </details>
                </div>                  
                <!-- tab 정렬 -->
                <template v-for="tab in tabs" >  

                    <!-- [주가지수] -->
                    <div class="stock_sheet" v-if="tab.id === 'item01'" :key="tab.id">
                        <div class="slick_exchange" :key="'key_'+itemIndex">
                            <div class="inner">
                                <!-- KOSPI 지수 배너 -->
                                <dl class="exchange" v-for="(item, idx) in kosIdxList" :key="'kosIdx_'+idx">
                                    <dt>{{item.stprDsc}}</dt>
                                    <dd class="factor">
                                        <span class="num">{{addComma(item.stprIxEpr)}}</span>
                                        <span class="range" :class="upDown(item.stprIxEpr)">{{item.bdCmprRnf}}% (전일대비)</span>
                                    </dd>
                                    <dd class="basis">
                                        <span>{{item.basDt | dateFilter('YYYY.MM.DD')}} 기준</span>
                                    </dd>
                                </dl>

                                <!-- 통화환율 배너 -->
                                <dl class="exchange" v-for="(item, idx) in xcrtList" :key="'xcrt_'+idx">
                                    <dt>
                                        <!--기본(icon) 국기명클래스(ico_JPY, ico_USD)-->
                                        <i class="ico" :class="'ico_'+item.curc"></i>
                                        {{item.curcCont}} {{item.curc}}
                                    </dt>
                                    <dd class="factor">
                                        <span class="unit">KRW</span>
                                        <span class="num">{{addComma(Number(item.dlbsrt))}}</span>
                                        <span class="range" :class="upDown(item.subDlbsrt)">{{item.subDlbsrt}}(전일대비)</span>
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
                    </div>    
                   
                    <!-- [추천서비스] -->
                    <div class="promote_sheet" v-if="tab.id === 'item02'" :key="tab.id">
                        <div class="scroller">
                            <ul>
                                <li>
                                <a href="javascript:void(0);"  @click="fn_moveOpenPage('MAMA4003')">
                                        <span>콕 자산관리서비스</span>
                                        <strong>사용방법을 알려드려요</strong>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);"  @click="fn_movePage('RGFT4001')">
                                        <span>신나는 축제 한가득!</span>
                                        <strong>지역별 특별한<br>문화 체험 소개</strong>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);"  @click="fn_moveOpenPage('MRLO4001')">
                                        <span>하루 다섯 번!</span>
                                        <strong>로또복권 번호만들기</strong>
                                    </a>
                                </li>
                                <li>
                                    <a href="#nolink">
                                        <span>숨은 돈 찾기</span>
                                        <strong>숨은예금,보험금 찾아볼까요?</strong>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <!-- [주요자산 변동내역] -->
                    <div class="asset_sheet" v-if="tab.id === 'item03'" :key="tab.id">
                        <strong class="h_tit01">주요자산 변동내역</strong>                
                        <button type="button" class="toggle_btn">전체열기</button>
                        <ul class="asset_list">
                            <!-- CASE 기본 : li에 메뉴별 클래스 추가
                                
                                "menu01" 예금, "menu02" 부동산, "menu03" 투자, "menu04" 연금, "menu05" 페이/포인트,
                                "menu06" 보험, "menu07" 카드, "menu08" 대출, "menu09" 자동차, "menu10" 기타자산, 
                                "menu11" 할부금융, "menu12" 자동차할부, "menu13" 학자금대출, "menu14" 리스, "menu15" 빌린돈 -->

                            <!-- CASE 미등록 : li에 "nodata" 클래스 추가 -->
                            <!-- menu01 예금 -->
                            <li v-if="menu01Able == 'Y'" class="menu01">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASAC4001')">
                                    <strong>예금<span class="num">{{ asetFnAcTtcn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu01Class">
                                    <p class="price"><span>{{ asetFnAcAmSum | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indAsetFnAcAmSum > 0">지난달보다 <span>{{ indAsetFnAcAmSum | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indAsetFnAcAmSum < 0">지난달보다 <span>{{ indAsetFnAcAmSum | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu02 부동산 -->                        
                            <li v-if="menu02Able == 'Y'" class="menu02">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASRE4001')">
                                    <strong>부동산<span class="num">{{ asetRlthRlestCn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu02Class">
                                    <p class="price"><span>{{ asetRlthRlestAm | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indAsetRlthRlestAm > 0">지난달보다 <span>{{ indAsetRlthRlestAm | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indAsetRlthRlestAm < 0">지난달보다 <span>{{ indAsetRlthRlestAm | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu03 투자 -->                        
                            <li v-if="menu03Able == 'Y'" class="menu03">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASIV4001')">
                                    <strong>투자<span class="num">{{ asetFnIvTtcn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu03Class">
                                    <p class="price"><span>{{ asetFnIvAmSum | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indAsetFnIvAmSum > 0">지난달보다 <span>{{ indAsetFnIvAmSum | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indAsetFnIvAmSum < 0">지난달보다 <span>{{ indAsetFnIvAmSum | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu04 연금 -->                        
                            <li v-if="menu04Able == 'Y'" class="menu04">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASPS4001')">
                                    <strong>연금<span class="num">{{ asetFnPnsTtcn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu04Class">
                                    <p class="price"><span>{{ asetFnPnsAmSum | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indAsetFnPnsAmSum > 0">지난달보다 <span>{{ indAsetFnPnsAmSum | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indAsetFnPnsAmSum < 0">지난달보다 <span>{{ indAsetFnPnsAmSum | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu05 페이/포인트 -->                        
                            <li v-if="menu05Able == 'Y'" class="menu05">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASPT4001')">
                                    <strong>페이/포인트<span class="num">{{ asetFnPayPntTtcn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu05Class">
                                    <p class="price"><span>{{ asetFnPayPntAmSum | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indAsetFnPayPntAmSum > 0">지난달보다 <span>{{ indAsetFnPayPntAmSum | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indAsetFnPayPntAmSum < 0">지난달보다 <span>{{ indAsetFnPayPntAmSum | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu06 보험 -->                        
                            <li v-if="menu06Able == 'Y'" class="menu06">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASIS4001')">
                                    <strong>보험<span class="num">{{ isrTtcn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu06Class">
                                    <p class="price"><span>{{ isrPymIsrfeTt | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indAsetFnPayPntAmSum > 0">지난달보다 <span>{{ isrPymIsrfeTt | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indAsetFnPayPntAmSum < 0">지난달보다 <span>{{ isrPymIsrfeTt | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu07 카드 -->                        
                            <li v-if="menu07Able == 'Y'" class="menu07">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASCD4001')">
                                    <strong>카드<span class="num">{{ dbtCdTcn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu07Class">
                                    <p class="price"><span>{{ dbtCdAmSum | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indDbtCdAmSum > 0">지난달보다 <span>{{ indDbtCdAmSum | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indDbtCdAmSum < 0">지난달보다 <span>{{ indDbtCdAmSum | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu08 대출 -->                        
                            <li v-if="menu08Able == 'Y'" class="menu08">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASLN4001')">
                                    <strong>대출<span class="num">{{ dbtLonTtcn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu08Class">
                                    <p class="price"><span>{{ dbtLonAmSum | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indDbtLonAmSum > 0">지난달보다 <span>{{ indDbtLonAmSum | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indDbtLonAmSum < 0">지난달보다 <span>{{ indDbtLonAmSum | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu09 자동차 -->                        
                            <li v-if="menu09Able == 'Y'" class="menu09">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASCA4001')">
                                    <strong>자동차<span class="num">{{ asetRlthCarCn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu09Class">
                                    <p class="price"><span>{{ asetRlthCarAm | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indAetRlthCarAm > 0">지난달보다 <span>{{ indAetRlthCarAm | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indAetRlthCarAm < 0">지난달보다 <span>{{ indAetRlthCarAm | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu10 기타자산 -->                        
                            <li v-if="menu10Able == 'Y'" class="menu10">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASOA4001')">
                                    <strong>기타자산<span class="num">{{ asetEtcTtcn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu10Class">
                                    <p class="price"><span>{{ asetEtcAmSum | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indAsetEtcAmSum > 0">지난달보다 <span>{{ indAsetEtcAmSum | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indAsetEtcAmSum < 0">지난달보다 <span>{{ indAsetEtcAmSum | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu11 할부금융 -->                        
                            <li v-if="menu11Able == 'Y'" class="menu11">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASIT4001')">
                                    <strong>할부금융<span class="num">{{ dbtIstCn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu11Class">
                                    <p class="price"><span>{{ dbtIstAm | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indDbtIstAmSum > 0">지난달보다 <span>{{ indDbtIstAmSum | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indDbtIstAmSum < 0">지난달보다 <span>{{ indDbtIstAmSum | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu12 자동차할부 -->                        
                            <li v-if="menu12Able == 'Y'" class="menu12">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASCL4001')">
                                    <strong>자동차할부<span class="num">{{ dbtCarIstCn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu12Class">
                                    <p class="price"><span>{{ dbtCarIstAm | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indDbtCarIstAmSum > 0">지난달보다 <span>{{ indDbtCarIstAmSum | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indDbtCarIstAmSum < 0">지난달보다 <span>{{ indDbtCarIstAmSum | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu13 학자금대출 -->                        
                            <li v-if="menu13Able == 'Y'" class="menu13">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASEL4001')">
                                    <strong>학자금대출<span class="num">{{ dbtEdufdTcn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu13Class">
                                    <p class="price"><span>{{ dbtEdufdAmSum | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indDbtEdufdAmSum > 0">지난달보다 <span>{{ indDbtEdufdAmSum | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indDbtEdufdAmSum < 0">지난달보다 <span>{{ indDbtEdufdAmSum | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu14 리스 -->                        
                            <li v-if="menu14Able == 'Y'" class="menu14">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASLS4001')">
                                    <strong>리스<span class="num">{{ dbtLeasCn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu14Class">
                                    <p class="price"><span>{{ dbtLeasAm | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indDbtLeasAmSum > 0">지난달보다 <span>{{ indDbtLeasAmSum | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indDbtLeasAmSum < 0">지난달보다 <span>{{ indDbtLeasAmSum | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                            <!-- menu15 빌린돈 -->                        
                            <li v-if="menu15Able == 'Y'" class="menu15">
                                <a href="javascript:void(0);" class="head" @click="fn_movePage('ASBR4001')">
                                    <strong>빌린돈<span class="num">{{ dbtCshCn | numberFilter }}</span></strong>
                                    <span class="txt"></span>
                                </a>
                                <div :class="menu15Class">
                                    <p class="price"><span>{{ dbtCshAm | numberFilter }}</span>원</p>
                                    <p class="latter" v-if="indDbtCshAm > 0">지난달보다 <span>{{ indDbtCshAm | numberFilter }}</span>원 <em>늘었어요.</em></p>
                                    <p class="latter" v-else-if="indDbtCshAm < 0">지난달보다 <span>{{ indDbtCshAm | numberFilter }}</span>원 <em>줄었어요.</em></p>
                                    <p class="latter" v-else>지난달과 <em>동일해요.</em></p>
                                </div>
                            </li>
                        </ul>
                    </div>                

                    <!-- [자산분석을 통한 제안] -->
                    <div class="suggest_sheet" v-if="tab.id === 'item04'" :key="tab.id"> <!--[v4.0] 2025-03-13 분류별 클래스 정리 -->
                        <div class="sheet">
                            <!-- dl에 메뉴별 클래스 추가
                                "item01" 예상연금, "item02" 연금진단, "item03" 지출

                                "item03" 분류별 추가 클래스
                                AS20000000 미분류
                                AS20000001 쇼핑
                                AS20000002 가구/침구
                                AS20000003 외식
                                AS20000004 카페/베이커리
                                AS20000005 생활/마트
                                AS20000006 자동차
                                AS20000007 교통
                                AS20000008 여행/숙박
                                AS20000009 문화/레저
                                AS20000010 의료/건강
                                AS20000011 뷰티/미용
                                AS20000012 교육
                                AS20000013 금융
                                AS20000014 주거/통신
                                AS20000015 자녀/육아
                                AS20000016 기타
                            -->
                            <dl class="item01">
                                <dt>
                                    <span>{{currMm}}월 자산분석을 통한 제안1</span>
                                    <strong v-if="sMmLfecs >  mmPnsTts">연금이 적은편이예요.</strong>
                                    <strong v-else>꾸준한 유지가 필요해요.</strong>                                
                                </dt>
                                <dd>
                                    <p class="txt">내 예상 연금은<br>월 <strong>{{ fn_hanValue(String(mmPnsTts))}}</strong>만원이예요.</p>
                                </dd>
                                <dd>
                                    <a href="javascript:void(0);" class="link" @click="fn_movePage('PDRT4001')">나의 노후준비</a>
                                </dd>
                            </dl>


                            <dl class="item02">
                                <div v-if="cusAmSvYn == 'N'">  <!-- 시뮬레이션 미 실행(화면 첫 진입) -->
                                    <div v-if="cusMmAm > 0"> <!-- // 노후 연금 시뮬레이션 월 생활비 -->
                                        <dt>
                                            <span>{{currMm}}월 자산분석을 통한 제안2</span>
                                            <strong>추가 저축이 필요해요.</strong>
                                        </dt>
                                        <dd>
                                            <p class="txt">월 <a href="#nolink" class="sel_btn">{{fn_hanValue(smltMmAm.toString())}}만원</a>
                                                을 받으려면<br>60세까지 월 <strong>{{cusMmAm| numberFilter}}</strong>원이 필요해요.</p>
                                        </dd>
                                        <dd>
                                            <a href="javascript:void(0);" class="link" @click="fn_movePage('PDRT4001')">나의 노후준비</a>
                                        </dd>                         
                                    </div>
                                    <div v-else>
                                        <dt>
                                            <span>{{currMm}}월 자산분석을 통한 제안2</span>
                                            <strong>여유로운 노후생활 </strong>
                                        </dt>
                                        <dd>
                                            <p class="txt">이미 월 <strong>{{mmPnsTts - sMmLfecs  | numberFilter}}</strong>원 여유가 있어요.</p>
                                        </dd>
                                        <dd>
                                            <a href="javascript:void(0);" class="link" @click="fn_movePage('PDRT4001')">나의 노후준비</a>
                                        </dd>                               
                                    </div>    
                                </div>
                                <div v-else> <!-- 시뮬레이션 실행 -->
                                    <div v-if="cusMmAm > 0"> <!-- // 노후 연금 시뮬레이션 월 생활비 -->
                                        <dt>
                                            <span>{{currMm}}월 자산분석을 통한 제안2</span>
                                            <strong>추가 저축이 필요해요.</strong>
                                        </dt>
                                        <dd>
                                            <p class="txt">월 <a href="#nolink" class="sel_btn">{{fn_hanValue(smltMmAm.toString())}}만원</a>
                                                을 받으려면<br>60세까지 월 <strong>{{cusMmAm| numberFilter}}</strong>원이 필요해요.</p>
                                        </dd> 
                                        <dd>
                                            <a href="javascript:void(0);" class="link" @click="fn_movePage('PDRT4001')">나의 노후준비</a>
                                        </dd>                                                                     
                                    </div>
                                    <div v-else>
                                        <dt>
                                            <span>{{currMm}}월 자산분석을 통한 제안3</span>
                                            <strong>여유로운 노후생활 </strong>
                                        </dt>
                                        <dd>
                                            <p class="txt">이미 월 <strong>{{mmPnsTts - sMmLfecs  | numberFilter}}</strong>원 여유가 있어요.</p>
                                        </dd>    
                                        <dd>
                                            <a href="javascript:void(0);" class="link" @click="fn_movePage('PDRT4001')">나의 노후준비</a>
                                        </dd>                                                                  
                                    </div>                               
                                </div>
                            </dl>
                            <!--<dl class="item03 AS20000002">-->
                            <dl class="item03 AS20000002">
                                <dt>
                                    <span>{{currMm}}월 자산분석을 통한 제안3</span>
                                    <strong>지출 1위는, 카페/베이커리</strong>
                                </dt>
                                <dd>
                                    <p class="txt">지출내역을 확인하고<br>예산에 맞는 소비를 계획하세요.</p>
                                </dd>
                                <dd>
                                    <a href="javascript:void(0);" class="link" @click="fn_movePage('LCIP4001')">지출분석</a>
                                </dd>
                            </dl>
                        </div>
                    </div>
                
                    <!-- [신용과 건강] -->
                    <div class="credit_sheet" v-if="tab.id === 'item05'" :key="tab.id">
                        <strong class="h_tit01">신용과 건강</strong>
                        <div class="board">
                            <a href="javascript:void(0);" @click="fn_openPopup('ASCR4101')"> 
                                <strong>신용점수</strong>

                                <!-- CASE1 신용점수 데이터 있을 경우 -->
                                <div class="cont data">
                                    <span>KCB</span>
                                    <strong>{{ psnCrdevlScrVal }}</strong>
                                    <p>상위 {{ crdevlUpAcmCsttRtoVal }}%</p>
                                </div>

                                <!-- CASE2 신용점수 데이터 없을 경우 -->
                                <!-- <div class="cont">
                                    <p>나의 신용점수를<br>알아보세요.</p>
                                </div> -->

                            </a>
                            <a href="#nolink">
                                <strong>건강정보</strong>
                                <div class="cont">
                                    <p>매일의 건강한 습관<br>함께 만들어가요.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    
                    <!-- [건강, 연금/절세] -->                                
                    <div class="health_sheet" v-if="tab.id === 'item06'" :key="tab.id">
                        <div class="sheet">
                            <!-- dl에 메뉴별 클래스 추가
                                "item01" 건강, "item02" 연말정산, "item03" 세금
                            -->
                            <dl class="item01">
                                <dt>
                                    <span>건강에 대한 이야기</span>
                                    <strong>건강보험료 납부내역을<br>확인하실 수 있어요.</strong>
                                </dt>
                                <dd>
                                    <p class="txt">연도별 건강보험료 납부<br>금액을 확인해보세요.</p> <!--[v4.0] 2025-03-13 문구수정 -->
                                </dd>
                                <dd>
                                    <a href="#nolink" class="link" @click.prevent="fn_movePage('PDSC4004')">건강보험료 납부내역보기</a>
                                </dd>
                            </dl>
                            <dl class="item02">
                                <dt>
                                    <span>연말정산 이야기</span>
                                    <strong>13월의 급여<br>나도 받을 수 있을까요?</strong>
                                </dt>
                                <dd>
                                    <p class="txt">세금도 아끼고<br>소득공제까지</p>
                                </dd>
                                <dd>
                                    <a href="#nolink" class="link"  @click.prevent="fn_movePage('PDYT4002')">내가 받는 공제 알아보기</a>
                                </dd>
                            </dl>
                            <dl class="item03">
                                <dt>
                                    <span>세금 현황 알아보기</span>
                                    <strong>지방세, 국세, 관세<br>납부현황을 확인해 보세요.</strong>
                                </dt>
                                <dd>
                                    <p class="txt">세목별 납세증명을<br>확인할 수 있어요.</p>
                                </dd>
                                <dd>
                                    <a href="#nolink" class="link" @click.prevent="fn_movePage('PDTX4004')">세금 납부 확인하기</a>
                                </dd>
                            </dl>
                        </div>
                    </div>

                    <!-- [내가 연결한 자산] -->
                    <div class="connect_sheet" v-if="tab.id === 'item07'" :key="tab.id">
                        <strong class="h_tit01">내가 연결한 자산</strong>
                        <div class="board_box">
                            <p class="txt"><strong>총 {{orgConCntNacf}}개</strong> 기관에 연결되었습니다.</p>
                            <ul class="organ_list">
                                <li>
                                    <div class="tit_area">
                                        <strong class="tit">은행</strong>
                                        <strong class="status">{{nacfAccList.length > 0 ? 1 + Number(bankList.length) : Number(bankList.length)}}</strong>
                                    </div>
                                    <div v-if="nacfAccList.length > 0">
                                        <div class="organ"><!-- 기관 2개까지 노출 -->
                                            <span class="item"><i :class="nacfAccList[0].infOfrmnOrgC"></i><span class="blind">농협중앙회</span></span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div v-if="bankList.length > 0">
                                            <div class="organ" v-for="(item, index) in bankList.filter((el,idx)=>idx < bankListCnt)" :key="`item1_${index}`"><!-- 기관 2개까지 노출 -->
                                                <span class="item"><i :class="item.infOfrmnOrgC"></i><span class="blind">{{item.orgnm}}</span></span>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div class="organ" ><!-- 기관 2개까지 노출 -->
                                                <span class="item nodata"><span class="blind">기관없음</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="tit_area">
                                        <strong class="tit">카드</strong>
                                        <strong class="status">{{cardList.length}}</strong>
                                    </div>
                                    <div v-if="cardList.length > 0">
                                        <div class="organ" v-for="(item, index) in cardList.filter((el,idx)=>idx < 3)" :key="`item1_${index}`"><!-- 기관 2개까지 노출 -->
                                            <span class="item"><i :class="item.infOfrmnOrgC"></i><span class="blind">{{item.orgnm}}</span></span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="organ" ><!-- 기관 2개까지 노출 -->
                                            <span class="item nodata"><span class="blind">기관없음</span></span>
                                        </div>
                                    </div>     
                                </li>
                            </ul>
                            <button type="button" class="btns md" @click="fn_movePage('MRAM4001')"><span class="icon_line_right">연결 기관 전체보기</span></button>
                        </div>
                    </div>
                    
                    <!-- [자산진단] -->
                    <div class="diagnosis_sheet" v-if="tab.id === 'item08'" :key="tab.id">
                        <a href="#nolink" class="banner">
                            <p>한눈에 모아보는<br>자산 흐름 분석과 나의 자산진단</p>
                            <!--<lottie-player src="@/assets_v40/images/lottie/bg_united_banner_01.json" loop autoplay aria-hidden="true" class="lottie_bg"></lottie-player>-->
                            <lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_united_banner_01.json')" 
                                            ref="anim"
                                            :loop="true"
                                            :auto-play="true" 
                                            aria-hidden="true" 
                                            class="lottie_bg" 
                                            >
                            </lottie-animation>                               
                        </a>
                    </div>

                    <!-- [나의 관심서비스] -->
                    <div class="favorite" v-if="tab.id === 'item09'" :key="tab.id">
                        <h2 class="h_tit03">나의 관심서비스</h2>
                        <button type="button" class="btn_add" @click.prevent="fn_openPopup('COCO4351')">관심서비스 담기</button>
                        <ul class="attention_list" v-if="inteList.length &gt; 0">
                            <li v-for="inte in inteList" :key="inte.psAmnScid" :class="inte.menuId"><a href="#nolink" @click.prevent="fnOpenPopYn(inte.psAmnScid)">{{inte.psAmnScrnm}}</a></li>
                        </ul>
                        <!--등록된 관심서비스가 없을 경우-->
                        <p class="h_tit01" v-else>나의 관심서비스로<br>담아 놓고<br>빠르게 이동하세요.</p>
                    </div>
                </template>

                <!-- [홈편집/자산연결] -->
                <div class="setting">
                    <button type="button" @click="fn_moveOpenPage('MAMA4005')">홈편집</button>
                    <button type="button" @click.prevent="fn_openAssetPage()">자산연결</button>
                </div>

                <!-- [플로팅 배너] --> <!--[v4.0] 2025-03-17 플로팅 배너 추가 -->
                <cmm-flot-icon />               
            </section>
        </div>
        <footersV2 type="" mktBannerYN='Y' />
    </div>
    <!-- </page> -->
</template>

<script>
// import Page from '@/views/layout/Page.vue'
// import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

import FootersV2 from '@/views/layout/FootersV2.vue'

import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

import apiService from '@/service/apiService'
import appService from '@/service/appService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import routerService from '@/service/routerService'

// import {stringify} from '@/utils/data'
import {dateFormat, monthAdd, dayDiff, getTmmRmDds} from '@/utils/date'
import {amountCountAnimate} from '@/utils/jUtils'
import {round} from '@/utils/number'

// import _ from 'lodash'
import {mapActions, mapGetters} from 'vuex'

import COCO1101 from '@/views/page/CO/CO/COCO1101/COCO1101'   // 알림함
import MRCO1001 from '@/views/page/MR/CO/MRCO1001/MRCO1001'   // 알림함(tobe)
import MAMA2003 from '@/views/page/MA/MA/MAMA2003/MAMA2003'   // 메인 화면 편집 팝업
import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'   // 자산 연결 화면
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'   // 연결 기관 선택 화면

import ASCR1101 from '@/views/page/AS/CR/ASCR1101/ASCR1101'   // 신용정보
import ASAC1003 from '@/views/page/AS/AC/ASAC1003/ASAC1003'   // 계좌잔액예측 리포트
import ASIP2010 from '@/views/page/AS/IP/ASIP2010/ASIP2010'   // 금융스타일

import PDMY2005 from '@/views/page/PD/MY/PDMY2005/PDMY2005'   // 목표등록 메인

import PDPD1107 from '@/views/page/PD/PD/PDPD1107/PDPD1107'   // 대출한도조회

import COCA2101 from '@/views/page/CO/CA/COCA2101/COCA2101'   // 자산등록(자동차)
import CORE2201 from '@/views/page/CO/RE/CORE2201/CORE2201'   // 자산등록(부동산)
import LCIP2007 from '@/views/page/LC/IP/LCIP2007/LCIP2007'   // 정기지출 리포트

import MAMA2002 from '@/views/page/MA/MA/MAMA2002/MAMA2002'   // 미존재 자산연결 팝업
import PDRT2009 from '@/views/page/PD/RT/PDRT2009/PDRT2009' // 은퇴준비 진단 추가(20230711)
import MAMA2004 from '@/views/page/MA/MA/MAMA2004/MAMA2004'
import MREV2001 from '@/views/page/MR/EV/MREV2001/MREV2001' // 오픈 이벤트 슬라이드 팝업
import STCK2001 from '@/views/page/MR/ST/STCK2001/STCK2001' // 시스템 점검 슬라이드 팝업

import MREV2010 from '@/views/page/MR/EV/MREV2010/MREV2010' // 일반이벤트 상세팝업(신규가입)
import MREV2011 from '@/views/page/MR/EV/MREV2011/MREV2011' // 일반이벤트 상세팝업(추석소원빌기)
import MREV2030 from '@/views/page/MR/EV/MREV2030/MREV2030' // 퀴즈이벤트 상세팝업(콕마이데이터)

import COCO4351 from '@/views/page/CO/CO/COCO4351/COCO4351' // v4 나의 관심서비스
import ASCR4101 from '@/views/page/AS/CR/ASCR4101/ASCR4101' // v4 신용정보

import MAMA4003 from '@/views/page/MA/MA/MAMA4003/MAMA4003' // v4 서비스소개
import MAMA4004 from '@/views/page/MA/MA/MAMA4004/MAMA4004' // v4 캐릭터 설정
import MAMA4005 from '@/views/page/MA/MA/MAMA4005/MAMA4005' // v4 홈화면 편집
import MRLO4001 from '@/views/page/MR/LO/MRLO4001/MRLO4001' // v4 로또복권 번호만들기

import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue
import CmmCanvas from '@/components/CmmCanvas.vue' //canvas 공통컴퍼넌트
import CmmFlotBanner from '@/components/CmmFlotBanner.vue'  // 플로팅배너
import CmmFlotIcon from '@/components/CmmFlotIcon.vue'  // 플로팅배너

import {defineAsyncComponent, nextTick} from 'vue'
import {fncSlick_briefing, fncSlick_briefing2} from '@/utils/slick'

import moment from 'moment'
import _ from 'lodash'
import Template from '../../../XX/template/template.vue'

export default {
    name : "MAMA4001",
    data : () =>{
        return {
            currentDate         : new Date(),   //금일
            addAssetYn          : "",           // 자산등록 호출여부
            cusnm               : "",           // 고객명
            currYm              : dateFormat(new Date(), "YYYYMM"),     //현재년월
            currMm              : dateFormat(new Date(), "M"),          //현재월
            currYmd             : dateFormat(new Date(), "YYYYMMDD"),   //현재년월일
			anwAncYn            : "",       // 새 알림 여부
            tabs                : [],       // 상단 탭
            banners             : [],       // 하단 배너
            myAvatarId          : '',       // 나의캐릭터
            myAssetWrsList      : [],       // 주요자산 변동내역 선택 목록

            // 자산
            respInfo            : null,     // 자산정보
            //totAsetAm           : 0,        // 총자산금액
            //astIndSum           : 0,        // 자산증감합계

            psnCrdevlScrVal       : "",	    //신용점수
            crdevlUpAcmCsttRtoVal : "",     //신용등급
            popCORE2201Cnt        : 0,      //부동산 등록 카운트
            isDebugLog            : false,


            //////// 연결자산 관련 데이터            
            nacfAccList         : [],       // v4 농.축협 계좌 리스트
            userAsetList        : [],       // 개인신용정보전송요구내역
            /* 은행 */
            bankList            : [],       // 은행업권 데이터
            bankExprList        : [],       // 은행업권 만료 데이터
            /* 카드 */
            cardList            : [],       // 카드업권 데이터
            cardExprList        : [],       // 카드업권 만료 데이터
            /* 증권 */
            investList          : [],       // 금융투자업권 데이터
            investExprList      : [],       // 금융투자업권 만료 데이터
            /* 보험 */
            insuList            : [],       // 보험업권 데이터
            insuExprList        : [],       // 보험업권 만료 데이터
            ginsuList           : [],       // 보증보험업권 데이터
            ginsuExprList       : [],       // 보증보험업권 만료 데이터
            /* 페이 */
            efinList            : [],       // 전자금융업권 데이터
            efinExprList        : [],       // 전자금융업권 만료 데이터
            /* 할부금융 */
            capitalList         : [],       // 할부금융업권 데이터
            capitalExprList     : [],       // 할부금융업권 만료 데이터
            /* 기타금융 */
            telecomList         : [],       // 통신업권 데이터
            telecomExprList     : [],       // 통신업권 만료 데이터
            usuryList           : [],       // 대부 정보 데이터
            usuryExprList       : [],       // 대부 정보 만료 데이터
            bondList            : [],       // 인수채권 정보 데이터
            bondExprList        : [],       // 인수채권 정보 만료 데이터
            p2pList             : [],       // P2P 대출정보 데이터
            p2pExprList         : [],       // P2P 대출정보 만료 데이터
            publicList          : [],       // Public 대출정보 데이터
            publicExprList      : [],       // Public 대출정보 만료 데이터
            // orgExprCnt      : 0,         // 만료된 기관 개수
            // orgPrdCnt       : 0,         // 만료 예정 기관 개수
            bankListCnt         : 0,        // v4 은행 연결기관 개수

            cardPayDate         : '',       // 카드결제 예정일
            cardPayDateList     : [],       // 카드결제 예정일 목록
            infOfrmnOrgC        : '',       // 정보제공자기관코드

            

            // isConnectedAssetDigs: false, // 건강보험공단 연결 여부

            dbtSumAm            : 0 ,       // 부채금액

            myInfoList         : null,
            expenseList        : [],        // 지출목표목록
            tempExpenseList    : [],        // 지출목표목록(임시)
            financialList      : [],        // 금융목표, 버킷리스트
            preXpsAm           : 0,         // 현재지출금액
            xpsAm              : 0,
            ctgrPreXpsTotAm    : 0,         // 카테고리현재총지출금액

            ttAmnt              : [],       // 결제 예정인 돈
            ttCdLnBac           : [],       // 결제 예정인 대출 잔액                
            cardOut             : [],       // 이번달 결제예정금액
            cardLoanOut         : [],       // 남은 결제예정금액
            expeOut             : [],       // 청구내역
            claimOut            : [],       // 이번달 카드별 이용내역

            myFnaDgnArray       : [],       // 나의 재무 진단 도넛그래프 목록

            editList            : [],       // 자산편집 목록

            xpsInfo             : {},       // 지출 정보
            isOpenList          : false,

            nextPop             : '',       //호출 팝업명
            screen              : '',

            //////////////////// V4 ////////////////////
            // 자산 변동 내역
            // indDbtTotAm             : 0,    // 부채 증감액
            // indAsetFnAcAmSum        : 0,    // 증감금융자산계좌금액
            // indAsetRlthRlestAm      : 0,    // 증감실물자산부동산금액
            // indAetRlthCarAm         : 0,    // 증감실물자산자동차금액
            // indAsetEtcAmSum         : 0,    // 증감기타자산금액합계

            ntAsetTotAm             : 0,    // 순자산총금액
            bfNtAsetTotAm           : 0,    // 이전순자산총금액
            indNtAsetTotAm          : 0,    // 증감순자산총금액
            asetTotAm               : 0,    // 총자산금액
            bfAsetTotAm             : 0,    // 이전총자산금액
            indAsetTotAm            : 0,    // 증감총자산금액

            asetFnAcAmSum           : 0,    // 금융자산계좌금액합계
            asetFnAcTtcn            : 0,    // 금융자산계좌건수
            bfAsetFnAcAmSum         : 0,    // 이전금융자산계좌금액
            indAsetFnAcAmSum        : 0,    // 증감금융자산계좌금액
            asetFnIvAmSum           : 0,    // 금융자산투자금액합계
            asetFnIvTtcn            : 0,    // 금융자산투자건수
            bfAsetFnIvAmSum         : 0,    // 이전금융자산투자금액
            indAsetFnIvAmSum        : 0,    // 증감금융자산투자금액
            asetFnPnsAmSum          : 0,    // 금융자산연금금액합계
            asetFnPnsTtcn           : 0,    // 금융자산연금건수
            bfAsetFnPnsAmSum        : 0,    // 이전금융자산연금금액
            indAsetFnPnsAmSum       : 0,    // 증감금융자산연금금액
            asetFnPayPntAmSum       : 0,    // 금융자산페이머니금액
            asetFnPayPntTtcn        : 0,    // 금융자산페이머니건수
            bfAsetFnPayPntAmSum     : 0,    // 이전금융자산페이/포인트합계
            indAsetFnPayPntAmSum    : 0,    // 증감금융자산페이/포인트합계
            asetRlthAmSum           : 0,    // 실물자산금액합계
            bfAsetRlthAmSum         : 0,    // 이전실물자산금액합계
            indAsetRlthAmSum        : 0,    // 증감실물자산금액합계
            asetRlthRlestAm         : 0,    // 실물자산부동산금액
            asetRlthRlestCn         : 0,    // 실물자산부동산건수
            bfAsetRlthRlestAm       : 0,    // 이전실물자산부동산금액
            indAsetRlthRlestAm      : 0,    // 증감실물자산부동산금액
            asetRlthCarAm           : 0,    // 실물자산자동차금액
            asetRlthCarCn           : 0,    // 실물자산자동자건수
            bfAsetRlthCarAm         : 0,    // 이전실물자산자동차금액
            indAetRlthCarAm         : 0,    // 증감실물자산자동차금액
            asetEtcAmSum            : 0,    // 기타자산금액합계
            asetEtcTtcn             : 0,    // 기타자산건수
            bfAsetEtcAmSum          : 0,    // 이전기타자산금액합계
            indAsetEtcAmSum         : 0,    // 증감기타자산금액합계
            asetEtcCshAmSum         : 0,    // 기타자산현금합계
            asetEtcCshCn            : 0,    // 기타자산현금건수
            bfAsetEtcCshAmSum       : 0,    // 이전기타자산현금합계
            indAsetEtcCshAmSum      : 0,    // 증감기타자산현금합계
            asetEtcKrwCshAm         : 0,    // 기타자산원화현금금액
            asetEtcKrwCshCn         : 0,    // 기타자산원화현금건수
            asetEtcFcCshAm          : 0,    // 기타자산외화현금금액
            asetEtcFcCshCn          : 0,    // 기타자산외화현금건수
            asetEtcGoldAm           : 0,    // 기타자산골드금액
            asetEtcGoldCn           : 0,    // 기타자산골드건수
            bfAsetEtcGoldAm         : 0,    // 이전기타자산골드금액
            indAsetEtcGoldAm        : 0,    // 증감기타자산골드금액
            asetEtcEtcAm            : 0,    // 기타자산기타금액
            asetEtcEtcCn            : 0,    // 기타자산기타건수
            bfAsetEtcEtcAm          : 0,    // 이전기타자산기타금액
            indAsetEtcEtcAm         : 0,    // 증감기타자산기타금액
            
            dbtTotAm                : 0,    // 총부채금액
            dbtTtcn                 : 0,    // 부채총건수
            bfDbtTotAm              : 0,    // 이전총부채금액
            indDbtTotAm             : 0,    // 증감총부채금액 *
            dbtLonAmSum             : 0,    // 부채대출금액합계
            dbtLonTtcn              : 0,    // 부채대출건수
            bfDbtLonAmSum           : 0,    // 이전부채대출금액
            indDbtLonAmSum          : 0,    // 증감부채대출금액
            dbtCdAmSum              : 0,    // 부채카드금액합계
            dbtCdTcn                : 0,    // 부채카드총건수
            bfDbtCdAmSum            : 0,    // 이전부채카드합계금액
            indDbtCdAmSum           : 0,    // 증감부채카드합계금액
            dbtIstAm                : 0,    // 부채할부금액
            dbtIstCn                : 0,    // 부채할부건수
            bfDbtIstAmSum           : 0,    // 이전부채할부금액
            indDbtIstAmSum          : 0,    // 증감부채할부금액
            dbtCarIstAm             : 0,    // 부채자동차할부금액
            dbtCarIstCn             : 0,    // 부채자동차할부건수
            bfDbtCarIstAmSum        : 0,    // 이전부채자동차할부금액
            indDbtCarIstAmSum       : 0,    // 증감부채자동차할부금액
            dbtLeasAm               : 0,    // 부채금융리스금액
            dbtLeasCn               : 0,    // 부채금융리스건수
            bfDbtLeasAmSum          : 0,    // 이전부채할부금액
            indDbtLeasAmSum         : 0,    // 증감부채할부금액
            dbtEdufdAmSum           : 0,    // 부채학자금금액합계
            dbtEdufdTcn             : 0,    // 부채학자금총건수
            bfDbtEdufdAmSum         : 0,    // 이전부채학자금대출금액
            indDbtEdufdAmSum        : 0,    // 증감부채학자금대출금액
            dbtCshAm                : 0,    // 부채현금금액
            dbtCshCn                : 0,    // 부채현금건수
            bfDbtCshAm              : 0,    // 이전부채현금금액
            indDbtCshAm             : 0,    // 증감부채현금금액

            // 보험
            isrPymIsrfeTt           : 0,    // 보험납입보험료합계
            isrTtcn                 : 0,    // 보험건수합계
            isrMnTotPymIsrfe        : 0,    // 인보험납입총보험료
            isrMnInsuCn             : 0,    // 인보험납입건수
            isrTngTotPymIsrfe       : 0,    // 물보험월납입총보험료
            isrTngInsuCn            : 0,    // 물보험납입건수


            menu01Class             : "cont",
            menu02Class             : "cont",
            menu03Class             : "cont",
            menu04Class             : "cont",
            menu05Class             : "cont",
            menu06Class             : "cont",
            menu07Class             : "cont",
            menu08Class             : "cont",
            menu09Class             : "cont",
            menu10Class             : "cont",
            menu11Class             : "cont",
            menu12Class             : "cont",
            menu13Class             : "cont",
            menu14Class             : "cont",
            menu15Class             : "cont",

            menu01Able              : "Y",
            menu02Able              : "Y",
            menu03Able              : "Y",
            menu04Able              : "Y",
            menu05Able              : "Y",
            menu06Able              : "N",
            menu07Able              : "N",
            menu08Able              : "N",
            menu09Able              : "N",
            menu10Able              : "N",
            menu11Able              : "N",
            menu12Able              : "N",
            menu13Able              : "N",
            menu14Able              : "N",
            menu15Able              : "N",

            floatYn                 : "Y",
            ////////////////////////////////////////////
            finalUpdateDtm      : '',

            //// 재무진단 ////
            selectTab		    : "FNA",	// Tab(FNA : 나의재무진단, FNC : 나의금융스타일 )

            dbtAmnDgnRzt        : "적정",   //부채관리진단결과 : 적정, 개선
            dbtAmnIxSatC        : "Z",      //부채관리충족지수코드
            dbtAmnIxSatRate     : '',       //부채관리충족지수비율
            
            futRsvDgnRzt        : "적정",   //미래준비진단결과 : 적정, 개선
            futRsvIxSatC        : "Z",      //미래준비충족지수코드
            futRsvIxSatRate     : '',       //미래준비충족지수비율
            
            hseFnaDgnRzt        : "적정",   //가계재무진단결과 : 적정, 개선
            hseFnaIxSatC        : "Z",      //가계재무충족지수코드
            hseFnaIxSatRate     : '',       //가계재무충족지수비율

            // 금융스타일
            assetsUpDown        : 'up',     // 자산증감(up / down)

            prdStyCd            : '',       // 보유스타일코드
            prdStyCdNm          : '',       // 보유스타일코드명
            prdStyDtlCd         : '',       // 보유스타일상세코드
            prdStyDtlPhr1       : '',       // 보유스타일문구1
            prdStyDtlPhr2       : '',       // 보유스타일문구2
            hldWrsToolTipMsg    : '',       // 보유상품툴팁                      
            svRto               : '',       // 저축비율
            ivRto               : '',       // 투자비율     

            // v4 연금정보
            pnsRespInfo         : {},
            sAgYrcn             : 0,        //연령년수(연금맞춤설정)
            sAgCmprOprtC        : "",       //연령비교연산자코드(연금맞춤설정)
            sTotEntPrdVal       : "",       //총가입기간값(연금맞춤설정)
            totEntPrdVal        : 0,        //총가입기간값
            sDcyrMmLfecsNedAm   : 0,        //노후월생활비필요금액
            sMmLfecs            : 0,        //월생활비(관리자)
            sPnsStrtAg          : 0,        //연금개시연령(관리자)
            sPnsXpcAm           : 0,        //연금예상금액(국민연금(예상연금월액표))
            sNtpsTotAm          : 0,        //국민연금총금액
            sNtpsTotPrdCn       : 0,        //국민연금총가입기간
            sRtrpnsTotAcEvlam   : 0,        //퇴직연금DC_퇴직연금DC총평가금액
            sDcList             : [],       //퇴직연금
            pnsvInsuList        : [],       //연금저축보험목록
            pnsvFundList        : [],       //연금저축펀드목록
            cusnm               : "",       //마이데이터 사용자명
            birYy               : 0,        //고객출생연도
            sNtpsMmAm           : 0,        //국민연금 월금액
            sRtronsMmAm         : 0,        //퇴직연금 월금액
            sPpnsMmAm           : 0,        //개인연금 월금액
            sPpnsTts            : 0,        //개인연금 총 금액
            cusMmAm             : 0,        //노후 연금 시뮬레이션 월 생활비
            cusAmSvYn           : "N",      //노후 연금 시뮬레이션 클릭 후 확인여부
            prtoDsc             : "",       //조건값에 따른 레이아웃 출력여부 변수
            cusAge              : 0,        //고객나이
            nowYear             : 0,        //현재년도
            mmPnsTts            : 0,        //월 연금 총합계
            allPnsTts           : 0,        //연금총 합계
            pnsJstYn            : "N",      //연금적정여부
            ntpsPct             : 0,        //국민연금%
            rtrpnsPct           : 0,        //퇴직연금%
            ppnsPct             : 0,        //개인연금%
            ntpsAssetYn         : "N",      //국민연금 연결 여부
            smltMmAm            : 0,        //시뮬레이션 월 금액

            inteList            : [],       // 관심서비스 목록
            /* 임시 변수  (삭제 대상) */
            hlthIsrEntYn        : 'Y',
            unsatIxC            : 'SAFE',

            cycleData           : {},       // chart data
            cycleIdx            : 0,        // chart select Idx

            kosIdxList          : [],       // 주가지수(코스피, 코스닥)
            xcrtList            : [],       // 주요환율(USD, JPY)

        }
    },
    computed : {
        ...mapGetters('layout', [
			'isMainPage','isAlreadyOpenMainPage'
        ]),
        ...mapGetters('myassets', [
            'isMyAssetGathering','lastUpdateDtm','myAssetsBzRgCnt','myAssetInfo','myAssetsBzrgList','getMyCreditInfo',  //신용정보(점수/등급)
        ]),
        ...mapGetters('user', [
            'isSBank'			// 스뱅, 콕뱅 여부 
          , 'userInfo'
        ]),

        /* [v4] 나의 캐릭터 변경 */
        fn_setAvatarInfo() {
            // 나의 캐릭터 2025.03.24 할일
            this.myAvatarId = this.getMyAvatar()            
            //this.myAvatarId = commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'myAvatarId') 

            if (this.myAvatarId == 'myAvatarId01' || this.myAvatarId == 'myAvatarId02' || this.myAvatarId == 'myAvatarId03' ||
                this.myAvatarId == 'myAvatarId04' || this.myAvatarId == 'myAvatarId05' || this.myAvatarId == 'myAvatarId06' || 
                this.myAvatarId == 'myAvatarId08' || this.myAvatarId == 'myAvatarId09') {

                this.myAvatarId = this.myAvatarId
            } else {
                commonService.setStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'myAvatarId', 'myAvatarId01') 
                this.myAvatarId = commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'myAvatarId')                 
            }
            return this.myAvatarId
        },

        /*
        * 보안계좌 여부 add 2021.12.10
        */
        isSecurityAccYn() {
            if(this.dpCntSum === null) {
                return false
            } else {
                return this.dpCntSum > 0 ? false : true
            }
        },

        mydtCusno(){
            return this.getUserInfo('mydtCusno')
        },
        crmCusno(){
            return this.getUserInfo('mydtCusno')
        },
        serviceType(){
            return import.meta.env.VITE_ENV
        },
        // 만료 예정 기관 개수 계산
        orgPrdCnt(){
            let prdCnt = 0
            for(let i=0; i<this.userAsetList.length; i++) {
                // 개인신용정보전송요구내역 루프 start
                for(let j=0; j<this.userAsetList[i].orgList.length; j++) {
                    // 각 업권목록 루프 start
                    let tmpTmsEdDt = this.userAsetList[i].orgList[j].tmsEdDt || ""
                    let acsTknDusDtm = this.userAsetList[i].orgList[j].acsTokenDusDtm || ''
                    if(acsTknDusDtm === '0' && dayDiff(tmpTmsEdDt, this.currentDate) >= 0 && dayDiff(tmpTmsEdDt, this.currentDate) <= 30) {
                        // 전송요구종료일자가 30일 이내일 경우 만료예정으로 구분
                        prdCnt++
                    }
                }
            }
            return prdCnt
        },
        // 만료된 기관 개수 계산
        orgExprCnt(){
            let tmpExprCnt = 0
            tmpExprCnt = this.bankExprList.length + this.cardExprList.length + this.investExprList.length + this.insuExprList.length + 
                         this.ginsuExprList.length + this.efinExprList.length + this.capitalExprList.length + this.telecomExprList.length + 
                         this.usuryExprList.length + this.bondExprList.length + this.p2pExprList.length + this.publicExprList.length
            return tmpExprCnt
        },
        // 자산연결 기관 개수
        orgConCnt(){
            let tmpCnt = 0
            tmpCnt = this.bankList.length + this.cardList.length + this.investList.length + this.insuList.length + 
                     this.ginsuList.length + this.efinList.length + this.capitalList.length + this.telecomList.length + 
                     this.usuryList.length + this.bondList.length + this.p2pList.length + this.publicList.length
            return tmpCnt || 0
        },
        // 자산연결 기관 개수 + 농협 중앙회 추가
        orgConCntNacf(){
            let tmpCnt = 0
            tmpCnt = (this.nacfAccList.length > 0 ? 1 : 0) +   // v4 농협중앙회 건수 추가
                     this.bankList.length + this.cardList.length + this.investList.length + this.insuList.length + 
                     this.ginsuList.length + this.efinList.length + this.capitalList.length + this.telecomList.length + 
                     this.usuryList.length + this.bondList.length + this.p2pList.length + this.publicList.length
            return tmpCnt || 0
        },
        
        cbtType(){
            return this.getUserInfo('tobeType')
        },
        
        // 건강보험공단 연결 여부
        isConnectedAssetDigs () {
            return !!this.publicList.find(el => el.infOfrmnOrgC === 'PBAAVN0000')
        },
        assetUpdateDtm(){
            /* 자산 업데이트 5분 체크 start */

            let currDate = new Date()
            let lastDate = new Date(this.lastUpdateDtm)
            let diffSec = currDate.getTime() - lastDate.getTime()

            let diffMm = Math.floor(diffSec %(1000*60*60)) / (1000*60)

            if (diffMm < 1) {
                this.finalUpdateDtm = '조금전'
            } else {
                this.finalUpdateDtm = this.lastUpdateDtm
            }
            
            console.log("diffMm --------------------- ", diffMm)
            /* 자산 업데이트 5분 체크  end */
            return this.finalUpdateDtm
        }, 
        itemIndex() {
            return this.isNull(this.kosIdxList.length + this.xcrtList.length) ? 0 : this.kosIdxList.length + this.xcrtList.length
        },

    },
    watch: {
        isMyAssetGathering (value) {
            if(!value) this.fn_getMainData('2')
        },
        nextPop (value) {
            console.log("nextPop @@@@@@@@@@@@@@@@@@@@@@@@@@@@ ", value + this.orgConCnt + commonService.getStorage('noSeeAssets' + this.getUserInfo('chnl')))
            if(value == 'fix'){
                this.openCheckSystem() // 서비스 점검
            }else if(value == 'event'){
                this.fn_getEventData('1', 'slide') // 이벤트 정보 조회
            }else if(value == 'asset'){
                if(this.orgConCnt < 1) {
                        
                    //최초 사용자의 경우 자동 자산연결 기능이 존재하기 때문에 제외 사용자 전송요구리스트 조회
                    // if( this.addAssetYn !== "Y" && commonService.getStorage('noSeeAssets' + this.getUserInfo('chnl')) !== 'Y' ) {
                    if(commonService.getStorage('noSeeAssets' + this.getUserInfo('chnl')) !== 'Y' ) {
                        console.log("call fn_getAssetList() @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                        this.fn_getAssetList()   //사용자 전송요구리스트 조회
                    }
                }
            }
        },
    },
    created() {
        // 메인 컴포넌트(slide) 정의 및 정렬
        this.fn_setCompSortInfo()        
    },
    mounted() {
        //$('body').css('background','#f2f4f6')
        //// S : 자산등록호출여부 /////////////
        // 가입or재동의완료 후 넘어오는 인자값. 
        // addAssetYn = Y : 자산등록팝업호출 ,  N OR '' : 팝업호출 안함.
        this.addAssetYn = this.routeParams.addAssetYn || ""
        if(this.addAssetYn === "Y") {
            this.closeAll()

            this.$refs.addAssetBtn.click()
            this.routeParams.addAssetYn = "N"    // 팝업을 띄우면 초기화
        }
        //// E : 자산등록호출여부 /////////////        
        this.initComponent()
        this.listenSubscribe()
        //this.slick() //슬릭

        //url param(screen)이 팝업페이지로 들어왔을경우
        this.screen = this.userInfo.screen
        if(this.userInfo.screen == 'ASCR1101'){     //신용정보 팝업
            const config = {
                component: ASCR1101,
                params : {}
            }
            modalService.openPopup(config).then(() => {
            })
        } else if(this.userInfo.screen == 'MREV2010' || this.userInfo.screen == 'MREV2030' || this.userInfo.screen == 'MREV2011'){
            let evtComponent;
                
            if(import.meta.env.VITE_ENV === 'R'){
                evtComponent = { 'MREV2010' : '1'      //일반(신규가입)
                                , 'MREV2030' : '4'    //퀴즈(콕마이데이터)
                                , 'MREV2011' : '10'   //일반(추석 소원)
                }
            }else{
                evtComponent = { 'MREV2010' : '1'      //일반(신규가입)
                                , 'MREV2030' : '49'    //퀴즈(콕마이데이터)
                                , 'MREV2011' : '50'   //일반(추석 소원)
                }
            }

            this.fn_getEventData(evtComponent[this.userInfo.screen], 'pop')    //이벤트 정보조회
            delete this.userInfo.screen
        }


        //url param(evtSeq : 이벤트번호)로 들어왔을경우
        // if(this.userInfo.evtSeq){     
        //     this.fn_getEventData(this.userInfo.evtSeq, 'pop')    //이벤트 정보조회
        //     delete this.userInfo.evtSeq     //조회 후 userInfo 삭제 
        // }

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    updated() {
    },
    destroyed() {
        $('body').css('background','')
    },
    methods : {
        ...mapActions('myassets', [
            'getAllMyAssetInfo',
            'getMyAssetInfo'
        ]),
        ...mapActions('layout', [
            'setMainFirstOpen',
            'setTobePage'
        ]),
        ...mapActions('user', [
            'setMyCreditInfo'   //신용정보(점수/등급) add. 2021.11.22
        ]),
        initComponent() {
            console.log("isMainPage:{}",this.isMainPage)

            // 플로팅배너           
            this.floatYn = commonService.getStorage('noSeeMainFloat'+this.getUserInfo('chnl')) !== this.currYmd ? 'N' : 'Y'
            
            this.cusnm = this.getUserInfo("cusnm")
            // this.currYm = dateFormat(new Date(), "YYYYMM")  //현재년월
            // this.currMm = dateFormat(new Date(), "M")   //현재월 10월이전 1자리, 10월부턴 2자리

            this.fn_newAlarm()  //신규알림여부

            // 메인 데이터 조회
            this.getData()

            // 나의 재무 진단 선택
            this.fn_selectTab("FNA")

            if(this.userInfo.screen !== 'MREV2010' && this.userInfo.screen !== 'MREV2030' && this.userInfo.screen !== 'MREV2011'){
                this.fn_slidePop()
            }
            //자산수집요청 최초 1회만 사용함 20210105
            if(!this.isAlreadyOpenMainPage){
                // console.log('자산수집요청!')

                this.fn_refreshApiCall()
                this.setMainFirstOpen(true)

                //서비스팀 요청으로 제휴정보(KCB, NICE자동차) 수집 호출 추가 20211222
                this.getAllianceInfo('01') // 제휴정보 KCB수집 호출
                this.getAllianceInfo('02') // 제휴정보 NICE자동차 수집 호출                
            } 
        },
        initSlide() {
            $('.subSvcBannerArea').slick({
				speed : 100,
				slidesToShow: 2.3,
				slidesToScroll: 1,
				dots : false,
				arrows : false,
                infinite: false,
                accessibility:false,//09/26 jlee 접근성 반영 tabindex제거 스크린 리더 접근
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
            });
        },
       
        /* v4 자산진단 Tab선택 */
        fn_selectTab(gbn){
            if(this.selectTab != gbn) {
                this.selectTab = gbn
            }	

            if (gbn == "FNA")	{

                this.assetsUpDown = 'up'

            } else if (gbn == "FNC") {

                this.assetsUpDown = 'down'

            }

        },   

        // v4 플로팅 배너
        fn_setFloatBannerYn(){            
            //commonService.setStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'noSeeMainFloat', this.currYmd)
            localStorage.setItem("noSeeMainFloat"+this.getUserInfo("chnl"), this.currYmd)
            this.close()

        },               
        getData(mainFlag) {
            if(mainFlag === '' || mainFlag === undefined || mainFlag === null){
                mainFlag = '1'
			}
            Promise.all([
                // 1.전체 메인 정보 조회 : 총자산
                // 4.자산변동내역
                this.fn_getMainData(mainFlag),  

                // 2.자산진단 : 나의재무진단 
                this.fn_getMyFnaDgsRzt(),       
                
                // 2.자산진단 : 나의 금융스타일
                this.fn_getFinStyleDGS(),        

                // 3.주식환율 : KOSPI / KOSDAQ, USD / JPY
                //this.fn_stockXcrt(),            
                                
                // 5.연금                             
                this.fn_getPension(),
                
                // 6.신용점수
                //this.fn_creditPoint(),

                // 8.내가 연결한 자산
                this.fn_getForeExprList(),      // 자산연결 정보 조회   

                // 9.관심서비스
                this.fn_getInteList(),        

            ])
            
        },
        /* [v4] 1.총자산 / 증감 */
        fn_getMainData(mainFlag) {
            const config = {
                // url: '/ma/ma/01ra1', // 인터페이스ID: IF-MOB-PFM-MAA01, 서비스코드: PFMMAMA01RA1
                url: '/ma/ma/01r03',
                data: {
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                    "basYm"     : this.currYm,
                    "mainFlag"  : mainFlag
                },
                // flag : 'main',
                disableLoading : true,
            }
            apiService.call(config).then(response =>{
                console.log('PFM Main API response done', response)

                this.respInfo           = response
				this.rcnInqDtm          = this.respInfo.rcnInqDtm || ''    //최근조회일시				
                //this.totAsetAm          = Math.floor(this.respInfo?.totAsetAm || 0)	//자산금액
                //this.astIndSum          = Math.floor(this.respInfo?.indNtAsetTotAm || 0)

                // 자산 증감 계산 start ############################################################
                // this.indDbtTotAm        = this.respInfo?.myAssetInfo?.indDbtTotAm        || 0 // 부채 증감액
                // this.indAsetFnAcAmSum   = this.respInfo?.myAssetInfo?.indAsetFnAcAmSum   || 0 // 증감금융자산금액
                // this.indAsetRlthRlestAm = this.respInfo?.myAssetInfo?.indAsetRlthRlestAm || 0 // 증감실물자산부동산금액
                // this.indAetRlthCarAm    = this.respInfo?.myAssetInfo?.indAetRlthCarAm    || 0 // 증감실물자산자동차금액
                // this.indAsetEtcAmSum    = this.respInfo?.myAssetInfo?.indAsetEtcAmSum    || 0 // 증감기타자산금액합계

                this.ntAsetTotAm            = this.respInfo?.myAssetInfo?.ntAsetTotAm    || 0    // 순자산총금액
                this.bfNtAsetTotAm          = this.respInfo?.myAssetInfo?.bfNtAsetTotAm  || 0    // 이전순자산총금액
                this.indNtAsetTotAm         = this.respInfo?.myAssetInfo?.indNtAsetTotAm || 0    // 증감순자산총금액
                this.asetTotAm              = this.respInfo?.myAssetInfo?.asetTotAm      || 0    // 총자산금액
                this.bfAsetTotAm            = this.respInfo?.myAssetInfo?.bfAsetTotAm    || 0    // 이전총자산금액
                this.indAsetTotAm           = this.respInfo?.myAssetInfo?.indAsetTotAm   || 0    // 증감총자산금액
                

                this.asetFnAcAmSum          = this.respInfo?.myAssetInfo?.asetFnAcAmSum          || 0 // 금융자산계좌금액합계
                this.asetFnAcTtcn           = this.respInfo?.myAssetInfo?.asetFnAcTtcn           || 0 // 금융자산계좌건수
                this.bfAsetFnAcAmSum        = this.respInfo?.myAssetInfo?.bfAsetFnAcAmSum        || 0 // 이전금융자산계좌금액
                this.indAsetFnAcAmSum       = this.respInfo?.myAssetInfo?.indAsetFnAcAmSum       || 0 // 증감금융자산계좌금액
                this.asetFnIvAmSum          = this.respInfo?.myAssetInfo?.asetFnIvAmSum          || 0 // 금융자산투자금액합계
                this.asetFnIvTtcn           = this.respInfo?.myAssetInfo?.asetFnIvTtcn           || 0 // 금융자산투자건수
                this.bfAsetFnIvAmSum        = this.respInfo?.myAssetInfo?.bfAsetFnIvAmSum        || 0 // 이전금융자산투자금액
                this.indAsetFnIvAmSum       = this.respInfo?.myAssetInfo?.indAsetFnIvAmSum       || 0 // 증감금융자산투자금액
                this.asetFnPnsAmSum         = this.respInfo?.myAssetInfo?.asetFnPnsAmSum         || 0 // 금융자산연금금액합계
                this.asetFnPnsTtcn          = this.respInfo?.myAssetInfo?.asetFnPnsTtcn          || 0 // 금융자산연금건수
                this.bfAsetFnPnsAmSum       = this.respInfo?.myAssetInfo?.bfAsetFnPnsAmSum       || 0 // 이전금융자산연금금액
                this.indAsetFnPnsAmSum      = this.respInfo?.myAssetInfo?.indAsetFnPnsAmSum      || 0 // 증감금융자산연금금액
                this.asetFnPayPntAmSum      = this.respInfo?.myAssetInfo?.asetFnPayPntAmSum      || 0 // 금융자산페이머니금액
                this.asetFnPayPntTtcn       = this.respInfo?.myAssetInfo?.asetFnPayPntTtcn       || 0 // 금융자산페이머니건수
                this.bfAsetFnPayPntAmSum    = this.respInfo?.myAssetInfo?.bfAsetFnPayPntAmSum    || 0 // 이전금융자산페이/포인트합계
                this.indAsetFnPayPntAmSum   = this.respInfo?.myAssetInfo?.indAsetFnPayPntAmSum   || 0 // 증감금융자산페이/포인트합계
                this.asetRlthAmSum          = this.respInfo?.myAssetInfo?.asetRlthAmSum          || 0 // 실물자산금액합계
                this.bfAsetRlthAmSum        = this.respInfo?.myAssetInfo?.bfAsetRlthAmSum        || 0 // 이전실물자산금액합계
                this.indAsetRlthAmSum       = this.respInfo?.myAssetInfo?.indAsetRlthAmSum       || 0 // 증감실물자산금액합계
                this.asetRlthRlestAm        = this.respInfo?.myAssetInfo?.asetRlthRlestAm        || 0 // 실물자산부동산금액
                this.asetRlthRlestCn        = this.respInfo?.myAssetInfo?.asetRlthRlestCn        || 0 // 실물자산부동산건수
                this.bfAsetRlthRlestAm      = this.respInfo?.myAssetInfo?.bfAsetRlthRlestAm      || 0 // 이전실물자산부동산금액
                this.indAsetRlthRlestAm     = this.respInfo?.myAssetInfo?.indAsetRlthRlestAm     || 0 // 증감실물자산부동산금액
                this.asetRlthCarAm          = this.respInfo?.myAssetInfo?.asetRlthCarAm          || 0 // 실물자산자동차금액
                this.asetRlthCarCn          = this.respInfo?.myAssetInfo?.asetRlthCarCn          || 0 // 실물자산자동자건수
                this.bfAsetRlthCarAm        = this.respInfo?.myAssetInfo?.bfAsetRlthCarAm        || 0 // 이전실물자산자동차금액
                this.indAetRlthCarAm        = this.respInfo?.myAssetInfo?.indAetRlthCarAm        || 0 // 증감실물자산자동차금액
                this.asetEtcAmSum           = this.respInfo?.myAssetInfo?.asetEtcAmSum           || 0 // 기타자산금액합계
                this.asetEtcTtcn            = this.respInfo?.myAssetInfo?.asetEtcTtcn            || 0 // 기타자산건수
                this.bfAsetEtcAmSum         = this.respInfo?.myAssetInfo?.bfAsetEtcAmSum         || 0 // 이전기타자산금액합계
                this.indAsetEtcAmSum        = this.respInfo?.myAssetInfo?.indAsetEtcAmSum        || 0 // 증감기타자산금액합계
                this.asetEtcCshAmSum        = this.respInfo?.myAssetInfo?.asetEtcCshAmSum        || 0 // 기타자산현금합계
                this.asetEtcCshCn           = this.respInfo?.myAssetInfo?.asetEtcCshCn           || 0 // 기타자산현금건수
                this.bfAsetEtcCshAmSum      = this.respInfo?.myAssetInfo?.bfAsetEtcCshAmSum      || 0 // 이전기타자산현금합계
                this.indAsetEtcCshAmSum     = this.respInfo?.myAssetInfo?.indAsetEtcCshAmSum     || 0 // 증감기타자산현금합계
                this.asetEtcKrwCshAm        = this.respInfo?.myAssetInfo?.asetEtcKrwCshAm        || 0 // 기타자산원화현금금액
                this.asetEtcKrwCshCn        = this.respInfo?.myAssetInfo?.asetEtcKrwCshCn        || 0 // 기타자산원화현금건수
                this.asetEtcFcCshAm         = this.respInfo?.myAssetInfo?.asetEtcFcCshAm         || 0 // 기타자산외화현금금액
                this.asetEtcFcCshCn         = this.respInfo?.myAssetInfo?.asetEtcFcCshCn         || 0 // 기타자산외화현금건수
                this.asetEtcGoldAm          = this.respInfo?.myAssetInfo?.asetEtcGoldAm          || 0 // 기타자산골드금액
                this.asetEtcGoldCn          = this.respInfo?.myAssetInfo?.asetEtcGoldCn          || 0 // 기타자산골드건수
                this.bfAsetEtcGoldAm        = this.respInfo?.myAssetInfo?.bfAsetEtcGoldAm        || 0 // 이전기타자산골드금액
                this.indAsetEtcGoldAm       = this.respInfo?.myAssetInfo?.indAsetEtcGoldAm       || 0 // 증감기타자산골드금액
                this.asetEtcEtcAm           = this.respInfo?.myAssetInfo?.asetEtcEtcAm           || 0 // 기타자산기타금액
                this.asetEtcEtcCn           = this.respInfo?.myAssetInfo?.asetEtcEtcCn           || 0 // 기타자산기타건수
                this.bfAsetEtcEtcAm         = this.respInfo?.myAssetInfo?.bfAsetEtcEtcAm         || 0 // 이전기타자산기타금액
                this.indAsetEtcEtcAm        = this.respInfo?.myAssetInfo?.indAsetEtcEtcAm        || 0 // 증감기타자산기타금액
                                                                                                 
                this.dbtTotAm               = this.respInfo?.myAssetInfo?.dbtTotAm               || 0 // 총부채금액
                this.dbtTtcn                = this.respInfo?.myAssetInfo?.dbtTtcn                || 0 // 부채총건수
                this.bfDbtTotAm             = this.respInfo?.myAssetInfo?.bfDbtTotAm             || 0 // 이전총부채금액
                this.indDbtTotAm            = this.respInfo?.myAssetInfo?.indDbtTotAm            || 0 // 증감총부채금액
                this.dbtLonAmSum            = this.respInfo?.myAssetInfo?.dbtLonAmSum            || 0 // 부채대출금액합계
                this.dbtLonTtcn             = this.respInfo?.myAssetInfo?.dbtLonTtcn             || 0 // 부채대출건수
                this.bfDbtLonAmSum          = this.respInfo?.myAssetInfo?.bfDbtLonAmSum          || 0 // 이전부채대출금액
                this.indDbtLonAmSum         = this.respInfo?.myAssetInfo?.indDbtLonAmSum         || 0 // 증감부채대출금액
                this.dbtCdAmSum             = this.respInfo?.myAssetInfo?.dbtCdAmSum             || 0 // 부채카드금액합계
                this.dbtCdTcn               = this.respInfo?.myAssetInfo?.dbtCdTcn               || 0 // 부채카드총건수
                this.bfDbtCdAmSum           = this.respInfo?.myAssetInfo?.bfDbtCdAmSum           || 0 // 이전부채카드합계금액
                this.indDbtCdAmSum          = this.respInfo?.myAssetInfo?.indDbtCdAmSum          || 0 // 증감부채카드합계금액
                this.dbtIstAm               = this.respInfo?.myAssetInfo?.dbtIstAm               || 0 // 부채할부금액
                this.dbtIstCn               = this.respInfo?.myAssetInfo?.dbtIstCn               || 0 // 부채할부건수
                this.bfDbtIstAmSum          = this.respInfo?.myAssetInfo?.bfDbtIstAmSum          || 0 // 이전부채할부금액
                this.indDbtIstAmSum         = this.respInfo?.myAssetInfo?.indDbtIstAmSum         || 0 // 증감부채할부금액
                this.dbtCarIstAm            = this.respInfo?.myAssetInfo?.dbtCarIstAm            || 0 // 부채자동차할부금액
                this.dbtCarIstCn            = this.respInfo?.myAssetInfo?.dbtCarIstCn            || 0 // 부채자동차할부건수
                this.bfDbtCarIstAmSum       = this.respInfo?.myAssetInfo?.bfDbtCarIstAmSum       || 0 // 이전부채자동차할부금액
                this.indDbtCarIstAmSum      = this.respInfo?.myAssetInfo?.indDbtCarIstAmSum      || 0 // 증감부채자동차할부금액
                this.dbtLeasAm              = this.respInfo?.myAssetInfo?.dbtLeasAm              || 0 // 부채금융리스금액
                this.dbtLeasCn              = this.respInfo?.myAssetInfo?.dbtLeasCn              || 0 // 부채금융리스건수
                this.bfDbtLeasAmSum         = this.respInfo?.myAssetInfo?.bfDbtLeasAmSum         || 0 // 이전부채할부금액
                this.indDbtLeasAmSum        = this.respInfo?.myAssetInfo?.indDbtLeasAmSum        || 0 // 증감부채할부금액
                this.dbtEdufdAmSum          = this.respInfo?.myAssetInfo?.dbtEdufdAmSum          || 0 // 부채학자금금액합계
                this.dbtEdufdTcn            = this.respInfo?.myAssetInfo?.dbtEdufdTcn            || 0 // 부채학자금총건수
                this.bfDbtEdufdAmSum        = this.respInfo?.myAssetInfo?.bfDbtEdufdAmSum        || 0 // 이전부채학자금대출금액
                this.indDbtEdufdAmSum       = this.respInfo?.myAssetInfo?.indDbtEdufdAmSum       || 0 // 증감부채학자금대출금액
                this.dbtCshAm               = this.respInfo?.myAssetInfo?.dbtCshAm               || 0 // 부채현금금액
                this.dbtCshCn               = this.respInfo?.myAssetInfo?.dbtCshCn               || 0 // 부채현금건수
                this.bfDbtCshAm             = this.respInfo?.myAssetInfo?.bfDbtCshAm             || 0 // 이전부채현금금액
                this.indDbtCshAm            = this.respInfo?.myAssetInfo?.indDbtCshAm            || 0 // 증감부채현금금액

                // 보험
                this.isrPymIsrfeTt          = this.respInfo?.myAssetInfo?.isrPymIsrfeTt         || 0 // 보험납입보험료합계
                this.isrTtcn                = this.respInfo?.myAssetInfo?.isrTtcn               || 0 // 보험건수합계
                this.isrMnTotPymIsrfe       = this.respInfo?.myAssetInfo?.isrMnTotPymIsrfe      || 0 // 인보험납입총보험료
                this.isrMnInsuCn            = this.respInfo?.myAssetInfo?.isrMnInsuCn           || 0 // 인보험납입건수
                this.isrTngTotPymIsrfe      = this.respInfo?.myAssetInfo?.isrTngTotPymIsrfe     || 0 // 물보험월납입총보험료
                this.isrTngInsuCn           = this.respInfo?.myAssetInfo?.isrTngInsuCn          || 0 // 물보험납입건수

                // 주가지수 / 환율
                this.kosIdxList             = this.respInfo.korStcIdxList || []     // 주가지수(코스피, 코스닥)
                this.xcrtList               = this.respInfo.mainXcrtList  || []     // 주요환율(USD, JPY)

                this.menu01Class = this.assetsUpDownClass(this.indAsetFnAcAmSum)  // 예금
                this.menu02Class = this.assetsUpDownClass(this.indAsetRlthRlestAm)  // 부동산
                this.menu03Class = this.assetsUpDownClass(this.indAsetFnIvAmSum)  // 투자
                this.menu04Class = this.assetsUpDownClass(this.indAsetFnPnsAmSum)  // 연금
                this.menu05Class = this.assetsUpDownClass(this.indAsetFnPayPntAmSum)  // 페이/포인트
                this.menu06Class = 'cont' //assetsUpDown()  // 보험
                this.menu07Class = this.assetsUpDownClass(this.indDbtCdAmSum)  // 카드
                this.menu08Class = this.assetsUpDownClass(this.indDbtLonAmSum)  // 대출
                this.menu09Class = this.assetsUpDownClass(this.indAetRlthCarAm)  // 자동차
                this.menu10Class = this.assetsUpDownClass(this.indAsetEtcEtcAm)  // 기타자산
                this.menu11Class = this.assetsUpDownClass(this.indDbtIstAmSum)  // 할부금융
                this.menu12Class = this.assetsUpDownClass(this.indDbtCarIstAmSum)  // 자동차할부
                this.menu13Class = this.assetsUpDownClass(this.indDbtEdufdAmSum)  // 학자금대출
                this.menu14Class = this.assetsUpDownClass(this.indDbtLeasAmSum)  // 리스
                this.menu15Class = this.assetsUpDownClass(this.indDbtCshAm)  // 빌린돈               
                
                
                // 자산 증감 계산 end ##############################################################                
                this.psnCrdevlScrVal       = this.respInfo.psnCrdevlScrVal	|| '0'      //신용점수
                this.crdevlUpAcmCsttRtoVal = this.respInfo.crdevlUpAcmCsttRtoVal || '0'	//신용등급


                /*
                * 신용정보(신용점수,신용등급) add 2021.11.22
                * :: 전체메뉴에 보여주기 위함. store 처리.
                */
                let creditInfo = {
                    "psnCrdevlScrVal" :  this.psnCrdevlScrVal,              //신용점수
                    "crdevlUpAcmCsttRtoVal" : this.crdevlUpAcmCsttRtoVal    //신용등급(비율)
                }
                this.getMyAssetInfo(this.respInfo) // 자산정보 store 저장
                this.setMyCreditInfo(creditInfo) // 신용정보 store 저장

                this.$nextTick(() => {
                    // 총 금액 변경 이후 금액 Animate 처리 함수 호출
                    //amountCountAnimate("ntAsetTotAm", this.ntAsetTotAm);

                    $('.suggest_sheet').filter('.slick-initialized').slick('unslick');	
                    $('.health_sheet').filter('.slick-initialized').slick('unslick');	
                    $('.slick_exchange').filter('.slick-initialized').slick('unslick');	
                    setTimeout(()=>{
                        this.slick();
                    }, 30)
                    

                })
             
            })
        },   
        // v4
        assetsUpDownClass(indAm){
            let upDownClass

            if(indAm > 0) {
                upDownClass = 'cont up'
            } else if(indAm < 0) {
                upDownClass = 'cont down'
            } else if(indAm == 0) {
                upDownClass = 'cont'
            }

            return upDownClass
        }, 
        /* [v4] 연금정보 */
        fn_getPension(){

			//노후준비 조회
			const config = {
				url: '/pd/rt/01r02',

				data: {
					mydtCusno : this.getUserInfo('mydtCusno') // 마이데이터고객번호
				}
			};

			apiService.call(config).then(response => {

			this.pnsRespInfo = response

			this.sAgYrcn       = this.pnsRespInfo.agYrcn;      //연령년수(연금맞춤설정)
			this.sAgCmprOprtC  = this.pnsRespInfo.agCmprOprtC; //연령비교연산자코드(연금맞춤설정)
			this.sTotEntPrdVal = this.pnsRespInfo.totEntPrdVal; //총가입기간값(연금맞춤설정)
			this.sDcyrMmLfecsNedAm	= this.pnsRespInfo.dcyrMmLfecsNedAm; //노후월생활비필요금액(연금맞춤설정)

			if(this.pnsRespInfo.mmLfecs > 0){
				this.sMmLfecs = this.pnsRespInfo.mmLfecs;			//월생활비(관리자) 	
			}else{
				this.sMmLfecs = 1770000;
			}
			this.sPnsStrtAg			= this.pnsRespInfo.pnsStrtAg;		//연금개시연령(관리자)
			this.sPnsXpcAm          = this.pnsRespInfo.pnsXpcAm;		//연금예상금액(국민연금(예상연금월액표))
			this.cusAge    			= this.pnsRespInfo.mydtCusAge;   	//고객만나이
			this.birYy  		  	= this.pnsRespInfo.birYy   		//고객출생연도
			this.sNtpsTotAm			= this.pnsRespInfo.ntpsTotAm;		//국민연금총금액
			this.sNtpsTotPrdCn		= this.pnsRespInfo.ntpsTotPrdCn;	//국민연금총가입기간
			this.sRtrpnsTotAcEvlam 	= this.pnsRespInfo.rtrpnsTotAcEvlam //퇴직연금DC_퇴직연금DC총평가금액
			this.sDcList  		  	= this.pnsRespInfo.dcList || []  	  //퇴직연금DC_리스트

			this.sPpnsTts   		= this.pnsRespInfo.pPnsTotAcEvlam     // 개인연금총평가금액 
            this.pnsvInsuList     	= this.pnsRespInfo.pnsvInsuList || [] // 연금저축보험 목록
			this.pnsvFundList     	= this.pnsRespInfo.pnsvFundList || [] // 연금저축펀드 목록

			console.log("pnsvInsuList", this.pnsRespInfo.pnsvInsuList)
			console.log("pnsvFundList", this.pnsRespInfo.pnsvFundList)
			console.log("sDcList", this.sDcList)
			
			this.smltMmAm  			= this.sMmLfecs;//어드민 월 생활비를 시뮬레이션 월 생활비로 Set

			this.allPnsTts 	= this.sNtpsTotAm	+ this.sRtrpnsTotAcEvlam + this.sPpnsTts //국민연금 + 퇴직연금+개인연금 총 합계

			if(this.sNtpsTotAm > 0){
				this.ntpsPct  	= this.fn_PnsPct(this.sNtpsTotAm);// 국민연금%
			}

			if(this.sRtrpnsTotAcEvlam > 0){
				this.rtrpnsPct  =  this.fn_PnsPct(this.sRtrpnsTotAcEvlam);//퇴직연금%
			}

			if(this.sPpnsTts > 0){
				this.ppnsPct  	= this.fn_PnsPct(this.sPpnsTts);//개인연금%
			}

			let  sumTotYear = 0;
			if(this.sTotEntPrdVal != "" &&  this.sTotEntPrdVal != undefined){ //연금맞춤설정에 저장된 기간 선택시 
				sumTotYear = 	Number(this.sTotEntPrdVal);
			}else{
				sumTotYear = 20; //디폴트 20년
			}

			//국민연금 월금액 구하기
			if( this.sPnsXpcAm > 0){
				let ntpsMmAm = Math.round(Number(this.sPnsXpcAm)/10000) *10000;			// //연금예상금액(국민연금(예상연금월액표))

				let sumNtpsMmAm = 0;

				if(this.sAgCmprOprtC == "01"){ //조기이면

					if( this.sPnsStrtAg == 64){
						sumNtpsMmAm = Math.floor( (ntpsMmAm - (ntpsMmAm * 0.015 )) /10000 ) *10000;
						this.sNtpsMmAm = sumNtpsMmAm;
					}else if( this.sPnsStrtAg == 65 ){

						sumNtpsMmAm = Math.floor( (ntpsMmAm - ( ntpsMmAm * 0.020)) /10000) * 10000;
						this.sNtpsMmAm = sumNtpsMmAm;
					}
					
				}else if( this.sAgCmprOprtC == "03"){ //지연이면

					sumNtpsMmAm = Math.round( (ntpsMmAm +  (ntpsMmAm * 0.030)) /10000 ) *10000;
					this.sNtpsMmAm = sumNtpsMmAm;

				}else{//정상이면
					this.sNtpsMmAm = ntpsMmAm;
				}

			}else{
				this.sNtpsMmAm = 0;
			}
			console.log("ntpsMmAm=== 111", this.sNtpsMmAm);

			/*
			if( this.sDcyrMmLfecsNedAm > 0 ){
				this.sNtpsMmAm = Math.round( Number(this.sDcyrMmLfecsNedAm)/10000 ) *10000;	 //노후월생활비필요금액(연금맞춤설정)
			}else{
				this.sNtpsMmAm = Math.round(Number(this.sPnsXpcAm)/10000) *10000;			// //연금예상금액(국민연금(예상연금월액표))
			}*/

			this.totEntPrdVal = sumTotYear;

			//퇴직연금 월금액 구하기
			if(this.sRtrpnsTotAcEvlam > 0){
				this.sRtronsMmAm =  Math.round( (Number(this.sRtrpnsTotAcEvlam) / (sumTotYear*12) ) / 10000) *10000;	
			}else{
				this.sRtronsMmAm = 0;	
			}

			//개인연금 월금액 구하기
			if( this.sPpnsTts > 0 ){
				this.sPpnsMmAm = Math.round( (Number(this.sPpnsTts) / (sumTotYear*12)) /10000) * 10000;	
			}else{
				this.sPpnsMmAm = 0;
			}

			this.mmPnsTts = this.sNtpsMmAm + this.sRtronsMmAm + this.sPpnsMmAm;//월 총연금액   v4

			let pnsYn      = 'N'; //국민연금 납입 10년이상여부
			let sNptsAgeYn = 'N'; //국민연금 연금수령여부
			
			//국민연금 총가입기간이 10(120)년이상이면
			if(this.sNtpsTotPrdCn >= 120 ){
				pnsYn = 'Y';
			}else if( this.sNtpsTotPrdCn > 0 && this.sNtpsTotPrdCn <120){ //가입기간이 10년이 안되면 (총가입기간/12) + (60-만나이 *12)
				let sTotTt = ( this.sNtpsTotPrdCn/12) + (60- this.cusAge)*12 ;
				if(sTotTt >= 120){
					pnsYn = 'Y';
				}
			}else{
				pnsYn = 'N';
			}


			//if(this.birYy >= this.s1962Yy ){
		
			if( this.sPnsStrtAg > this.cusAge  ){ //관리자에 등록된 연금개시연령보다 적으면
				sNptsAgeYn = 'Y';	
			}
			//}

			//국민연금 월 수령액 , 국민연금 가입, 10년이상 납부, 연금수령전
			if(this.sNtpsMmAm > 0 && this.ntpsAssetYn == 'Y' && pnsYn == 'Y' && sNptsAgeYn == 'Y'){
				this.prtoDsc = 1;

			//국민연금 미가입	
			}else if(this.ntpsAssetYn == 'N' ){
				this.prtoDsc = 2;
			//국민연금 수령자	
			}else if(this.sNtpsTotAm > 0 && this.ntpsAssetYn == 'Y' && sNptsAgeYn == 'N'){
				this.prtoDsc = 3;
			//국민연금 가입 및 납부 10년 이하	
			}else if(this.sNtpsTotAm > 0 && this.ntpsAssetYn == 'Y' && pnsYn == 'N' && sNptsAgeYn == 'Y'){
				this.prtoDsc = 4;
			}else{
				this.prtoDsc = 1;
			}	

			this.getEsgSmltData();

			});

		},
		//노후연금 초기 시뮬레이션
		getEsgSmltData(){
			/*
				(목표생활비-월 수령예상금액) * 240
				(60-만나이)) * 12 
				20년간 부족금액 / 노동 가능 개월
            */
			console.log("getEsgSmltData totEntPrdVal ***************" ,this.totEntPrdVal)
			console.log("getEsgSmltData totEntPrdVal ***************" ,this.sMmLfecs)
			console.log("getEsgSmltData totEntPrdVal ***************" ,this.mmPnsTts)
			console.log("getEsgSmltData totEntPrdVal ***************" ,this.cusAge)
			let cusAm  		= (this.sMmLfecs - this.mmPnsTts ) * (this.totEntPrdVal*12);//월생활비(관리자) - 월 연금합계
			let workMon 	= (60 - this.cusAge) *12;
			this.cusMmAm  = Math.floor(cusAm / workMon);
		},        
		// v4 한글금액표시
		fn_hanValue(amount) {
			const koreanUnits = ['', '만', '억', '조']
			let han_amount = parseInt(amount.split(',').join('')) // 만원 단위 화면
			let answer     = ''
			let unit       = 10000
			let index      = 1 //만단위로 출력으로 1로 변경
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
        },             
 
		fn_PnsPct(amount){
			return Math.round( (amount/ this.allPnsTts) * 100) ;
		},        

        // v4 관심서비스 가져오기
        fn_getInteList() {
            const config = {
                url : '/co/co/51r01',
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno"),
                    vernm     : "V4"                           // 버전명
                }
            }
console.log("fn_getInteList.................config", config)
            apiService.call(config).then(response => {
console.log("fn_getInteList.................response", response)                
                this.inteList = response.fvrList || []
            })
        },         

        // v4 나의 관심서비스
        fn_openPopup(pageId) {
            let compName = ''
            if(pageId === 'COCO4351') {
                compName = COCO4351 // 나의 관심서비스
            }else if(pageId === 'ASCR4101') {
                compName = ASCR4101	//                    
            }
            
            const config = {
                component: compName,
            }
            // this.close()
            modalService.openPopup(config).then((response) => {
                if(pageId === 'COCO4351') { // 관심서비스 추가된 경우 재조회
                    if(response == 'refresh') {
                        this.fn_getInteList();
                    }
                }
            })
        },
        // 지수 상승하락 확인
        upDown(index) {
            return Number(index) > 0 ? 'up' : Number(index) == 0 ? '0' : "down"
        },

        addComma(nStr){
            return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        }, 

        // v4 관심서비스 이동 화면이 Page인지 Popup인지 구분해주는 함수
        fnOpenPopYn(scrId) {
            let popDsc = this.inteList.find(el=>el.psAmnScid == scrId).scrnDsc
            let type = ""; // 버킷리스트와 금융목표는 scrId가 같으므로 {type:"goal"}을 param으로 넘겨줘야 함.

            if(popDsc == "M") { // 화면(M)
                if(scrId == "PDMY4003") {
                    scrId = "PDMY4001";
                    type  = {type : "goal"};
                }
                
                this.fn_movePage(scrId, type);
            } else {            // 팝업(P)
                let component
                
                if(scrId == "MRLO4001") {         // 로또복권번호만들기
                    component = defineAsyncComponent(() => import("@/views/page/MR/LO/MRLO4001/MRLO4001"))
                } else if(scrId == "ASCR4101") {  // 나의신용점수올리기
                    component = defineAsyncComponent(() => import("@/views/page/AS/CR/ASCR4101/ASCR4101"))
                }
                /*
                } else if(scrId == "MREV4041") {  // 친구초대
                    component = defineAsyncComponent(() => import("@/views/page/MR/EV/MREV4041/MREV4041"))
                }
                */

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

        fn_slidePop(){
            //서비스 점검 체크
            const today = new Date()
            const savedDate = today.getDate()
            const curTime = moment(new Date()).format('YYYYMMDDHHmm')

            if (curTime >= '202311162200' && curTime <= '202311170100') {
                // 오늘 하루 안보기 체크
                if(commonService.getStorage('noSeeFixed'+this.getUserInfo('chnl')) !== savedDate) {
                    this.nextPop = 'fix' //서비스점검 팝업 호출
                }else{
                    this.nextPop = 'event' //이벤트 조회
                }
            }else{
                this.nextPop = 'event' //이벤트 조회
            }
        },
        // 이벤트 정보 조회
        fn_getEventData(sqno, type) {
            const today = dateFormat(new Date(), "YYYYMMDDHHmm")
            const savedDate = new Date().getDate()

            if(type === "pop"){     //새창
                const config = {
                    url: '/mr/ev/11r01', 
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "mydtEvtSqno" : sqno,
                    },
                    disableLoading : true,
                }
                apiService.call(config).then(res =>{
                    if((res.uyn === "1"  //사용여부
                        && today >= (res.stDt + res.stHr) && today <= (res.edDt + res.edHr)) || this.getUserInfo('tobeType')){     //이벤트기간
                        this.fn_moveOpenPage(this.screen, {mydtEvtSqno : sqno})    //이벤트 상세페이지 이동
                    }else{
                        modalService.alert("기간 지난 이벤트이거나 존재하지 않는 이벤트입니다.").then(()=>{this.nextPop = 'asset'})
                    }
                })
            }else if(type === "slide"){     //슬라이드

                const config = {
                    url: '/mr/ev/12r01', 
                    data: {
                        "evtStsc" : '1',
                        "pageNo" : 10,
                        "isGetWinner" : "0",
                    },
                    disableLoading : true,
                }
                apiService.call(config).then(res =>{
                    if(commonService.getStorage('noSeeEventExp'+this.getUserInfo('chnl')) !== savedDate && res.evtList.length > 0) {      //쿠키체크
                        const config_evt = {
                            params : res.evtList,
                            renderer : {component : MREV2001}
                        }
                        modalService.openSlidePagePopup(config_evt).then(response => {
                            console.log('response', response)
                            this.nextPop = 'asset'  //자산연결 조회
                        })
                    }else{
                        this.nextPop = 'asset'  //자산연결 조회
                    }
                })   
            }

        },
        openCheckSystem() {
            const config_evt = {
                renderer : {component : STCK2001}
            }
            modalService.openSlidePagePopup(config_evt).then(response => {
                console.log('response', response)
                this.nextPop = 'event'  //이벤트 조회
            })
        },
        // 프로그래스바
        drawProgressbar() {
            console.log('drawProgressbar start')
            var progressBar = $('.progressBar .bar');
			
			progressBar.each(function(){
				var progressNum = $(this).children().find('.popover .num').text();
				var popoverWrap = $(this).children('.popover_wrap');

				if(progressNum >= 100) {
					progressNum = 100;
					$(this).addClass('over');
					popoverWrap.css('transform','translateX(-100%)');
					popoverWrap.animate({
						left: progressNum + "%"
					},2000,function(){
						popoverWrap.addClass('full');
					});
				} else if(progressNum == 0) {
					popoverWrap.addClass('zero');
				} else {
					popoverWrap.animate({
						left: progressNum +'%'
					},2000);
				}

				progressBar.css('width','0');
                popoverWrap.css('left','0');
                console.log('drawProgressbar end')
				$(this).animate({
					width: progressNum + '%',
				},2000);
				
			});
        },
        // 버킷리스트 D-day
        setDday(obtDt, fncObtAchvYn) {
            
            let rtn
            const today = dateFormat(new Date(), 'YYYYMMDD')
            let diffDays = Number(dayDiff(dateFormat(obtDt, 'YYYYMMDD'), today) + 1) // 남은일자

            if(fncObtAchvYn === "0") {
                if(diffDays > 0) {
                    rtn = "D-" + diffDays
                } else {
                    rtn = "실패"
                }
            } else {
                rtn = "달성"
            }
            
            return rtn
        },
        // 금융목표 D-day
        setExpenseDday() {
            return "D-" + Number(getTmmRmDds() + 1)   // 남은일자(당월 잔여일수)
        },
        // 지출목표 상세이동
        detailMove1(stYm) {

            // let compName = PDMY2033

            let asetAmnCtgrId = this.expenseList[0].asetAmnCtgrId || ''
            let flag

            // 카테고리 미선택시
            if(asetAmnCtgrId == '' || asetAmnCtgrId == null) {
                flag = '1'
            } else {
                flag = '2'
            }

            let param = {type:'update', stYm:stYm, modifyYn:"Y", preXpsAm: this.xpsAm, flag : flag}

            this.fn_movePage('PDMY2001', param)
        },
        // 금융목표 상세이동
        goalDetailMove(fncObtDsc, sqno, prgStsCd, carGrdNo, carCtrimNo, basyy, basmm) {

            let param = {type:'update', "fncObtDsc":fncObtDsc, "sqno": sqno, "prgStsCd":prgStsCd, "carGrdNo":carGrdNo, "carCtrimNo":carCtrimNo, "basyy":basyy, "basmm":basmm}
            this.fn_movePage('PDMY2001', param)
            
        },

        /**
         * 홈 클릭 (네이티브 홈)
         */
        fn_moveHome() {
            this.isMainPage // 현재 페이지가 메인 페이지이면
                ? appService.moveMain() // 스뱅 홈
                : routerService.moveMain() // 자산관리 홈
        },
        /**
         * 이전버튼
         */
        fn_movePrev(){
            appService.moveMain()
		},

		/**
		 * 페이지 이동
		 */

		fn_movePage(pageId, param) {
            if (pageId === '') {
                modalService.alert("페이지 정보 필요")
                return
            }
			console.log("MAMA2001 Move page pageId: ", pageId)

            let params = {}
            
            // if 신차중고차 및 내차관리
            if (pageId == 'ANCA2201') {
                // if 내차관리 else 신차중고차
                if (param) {
                    params = { viewSvc: 'CARCARE', vhcnoVal: param }
                } else {
                    params = { viewSvc: 'CARDEAL', vhcnoVal: '' }
                }
            } else {
                params = param
            }
            // 연금진단: PDRT2001
            // 상품추천: PDPD1001
            // 신용점수: ASCR1101
            // 세금현황: PDTX2004
            // 콕부동산: ANRE2201
            // 콕마이카: ANCA2201
            const config = {
                name : pageId,
                params : params
            }
			commonService.movePage(config);
		},


        fn_subMenuBtnIdChange(id) {
            let obj = { as: 'menu00', lc: 'menu01', pd: 'menu02', an: 'menu03'}
            return obj[id]
        },

		/**
		 * 팝업 페이지 이동
		 */
        fn_moveOpenPage(pageId, param) {
            // this.fn_console("mama1008 pageId: " + pageId + ', param: ' + JSON.stringify(param))
            if(pageId === '') {
                modalService.alert("미 적용")
                return
            }
            // 팝업
            let compName = ""
            let popParams = {}



            // 로또
            if (pageId === "MRLO4001") {
                compName = MRLO4001
            }
            // 서비스소개
            if (pageId === "MAMA4003") {
                compName = MAMA4003
            }
            // 캐릭터설정
            if (pageId === "MAMA4004") {
                compName = MAMA4004
            }            
            // 홈화면편집
            if (pageId === "MAMA4005") {
                compName = MAMA4005
            }

            // 알림함
            if (pageId === "COCO1101") {
                compName = COCO1101
            }

            // 알림함 (tobe)
            if (pageId === "MRCO1001") {
                compName = MRCO1001
            }

            // 신용정보
            if (pageId === "ASCR1101") {
                compName = ASCR1101
            }

            // 목표등록
            if (pageId === 'PDMY2005') {
                compName = PDMY2005
            }

            // 대출한도 조회
            if (pageId === "PDPD1107") {
                compName = PDPD1107
            }

            // 자산등록(자동차)
            if (pageId === "COCA2101") {
                compName = COCA2101
            }

            // 자산등록(부동산)
            if (pageId === "CORE2201") {
                compName = CORE2201
                popParams = {
                    isUpt : false,              // 등록
                    popId : 'ANRE2201',         // 자산완료화면에서 추가 등록 시 팝업 다시 열기 위함
                    isTitleHide : false         // 부동산 등록 시 아파트/직접입력 타이틀 hide 여부(true:숨김, false:보임)
                }
            }

            if (pageId === "COAR4001") {
                compName = COAR4001
            }

            // 정기지출 리포트
            if (pageId === "LCIP2007") {
                compName = LCIP2007
                popParams = {"pBasYm" : monthAdd(0, new Date(), "YYYYMM")}
            }

            // 계좌잔액예측리포트
            if (pageId === "ASAC1003") {
                compName = ASAC1003
            }
            
            // 은퇴준비 진단 추가(20230711)
            if (pageId === "PDRT2009") {
                compName = PDRT2009
            }

            if (pageId === 'MAMA2004') {
                compName = MAMA2004
            }
            if (pageId === 'COAR2002') {
                compName = COAR2002
                popParams = param
            }
            if (pageId === 'ASIP2010') {
                compName = ASIP2010
            }

            if (pageId === 'MREV2010') {
                compName = MREV2010
                popParams = param
            }

            if (pageId === 'MREV2030') {
                compName = MREV2030
                popParams = param
            }

            if (pageId === 'MREV2011') {
                compName = MREV2011
                popParams = param
            }

            let config = {
                component: compName,
                params : popParams
            }

            modalService.openPopup(config).then((response) => {
                console.log('openPopup response ' + pageId, JSON.stringify(response))

                // v4 화면 설정 후
                if(pageId == "MAMA4005") {
                    console.log('MAMA4005 response.isSave ::: ', response?.isSave)
                    if (response?.isSave) {
                        this.banners = []
                        setTimeout(() => this.fn_setCompSortInfo(), 10)
                    }
                }

                // v4 캐릭터 설정 후
                if(pageId == "MAMA4004") {
                    console.log('MAMA4004 response.isSave ::: ', response?.isSave)
                    
                    if (response?.isSave) {                        
                        this.myAvatarId = commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'myAvatarId') 
                        console.log('MAMA4004 response.isSave2 ::: ', myAvatarId)
                    }
                }


                // 알림 확인
                if (response === "COCO1101" && pageId === "COCO1101") {
                     setTimeout(() => this.fn_newAlarm(), 10)
                }

                if (response === "MRCO1001" && pageId === "MRCO1001") {
                    setTimeout(() => this.fn_newAlarm(), 10)
                }
                
                // 자동차 등록 완료 시
                if(pageId == "COCA2101") {
                    if (response.uptCom == true) {
                        setTimeout(() => this.fn_refreshApiCall(), 10)
                    }
                }


                
                // 부동산 등록 완료 시
                if(pageId === "CORE2201") {
                    if (response == 'refresh' || response.uptCom == true || this.popCORE2201Cnt > 0) {
                        this.popCORE2201Cnt = 0
                        this.fn_refreshApiCall()
                    } else if(response == 'ANRE2201') {
                        this.popCORE2201Cnt++
                        this.fn_moveOpenPage('CORE2201')
                    }
                }
            })
        },


        // v4 좌우 스클롤
		slick() {
			// 자산분석을 통한 제안
			var $suggest =  $('.main_united .suggest_sheet');
			$suggest.each(function(){
				let $this = $(this);

				$(".sheet", $this).not('.slick-initialized').slick({
					infinite: true,
					speed: 300,
					arrows:false,
					dots:true,
					centerPadding: '40px',
				});
			});

			// 건강, 연금/절세
			var $health =  $('.main_united .health_sheet');
			$health.each(function(){
				let $this = $(this);

				$(".sheet", $this).not('.slick-initialized').slick({
					infinite: true,
					speed: 300,
					arrows:false,
					dots:true,
					centerPadding: '40px',
				});
			});

			// 주가지수
			var $exchange =  $('.main_united .slick_exchange');
			$exchange.each(function(){
				let $this = $(this);

				$(".inner", $this).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
					var i = (currentSlide ? currentSlide : 0 ) + 1 ;
					$(".paging", $this).html('<em>'+i + '</em> / ' + slick.slideCount);  
				});

				$(".inner", $this).not('.slick-initialized').slick({
					speed : 300,
					dots : false,
					adaptiveHeight: true,
					autoplay: true,
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



        /**
         * 메뉴 클릭 (네이티브 메뉴)
         */
        fn_toggleNativeMenu() {
            // 'D':개발, 'T':테스트, 'R':운영
            // 개발환경이고 로컬일||콕뱅인 경우만 로그인 페이지처리 2021-11-02
            if (import.meta.env.VITE_ENV !== 'R' && (window.location.host.indexOf('localhost') > -1 || !this.isSBank)) {
                //임시로 로그아웃으로 변경 처리
                sessionStorage.clear()
                location.replace('/login.html')
            }else{
                appService.showMenu()
            }
        },
        /* [v4] 자산연결
        * 자산등록화면이동
        */
        fn_openAssetPage() {
            //자산등록
            const config = {
                component: COAR4001,
                params : {}
            }
            modalService.openPopup(config).then(response => {
                console.log(JSON.stringify(response))
                if(response === 'move' || response === true){
                  this.getData()
                }
            })
        },
        /* [v4] 홈편집
        * 자산편집화면
        */
        fn_openEditPage() {
            const popConfig = {
				params : {
                    //금융자산, 부채, 부동산, 자동차, 기타자산
                    asetFnAmSum: this.respInfo?.myAssetInfo?.asetFnAmSum || 0,         // 금융자산 
                    dbtTotAm: this.respInfo?.myAssetInfo?.dbtTotAm || 0,               // 부채   
                    asetEtcCshAmSum: this.respInfo?.myAssetInfo?.asetEtcCshAmSum || 0, // 현금   
                    asetRlthRlestAm: this.respInfo?.myAssetInfo?.asetRlthRlestAm || 0, // 부동산  
                    asetRlthCarAm: this.respInfo?.myAssetInfo?.asetRlthCarAm || 0,     // 자동차  
                    asetEtcGoldAm: this.respInfo?.myAssetInfo?.asetEtcGoldAm || 0,     // 골드(금)
                    asetEtcEtcAm: this.respInfo?.myAssetInfo?.asetEtcEtcAm || 0,       // 기타자산 
                },
				renderer : {
                    component : MAMA2003,
				}
			}
            // 풀 팝업 형식으로 변경 필요
            modalService.openSlidePagePopup(popConfig).then(res => {
                console.log('자산 합계 편집 response', res)
                if (res === 'reloadAsset') {
                    // this.fn_refreshApiCall()
                    this.fn_getMainData('2')
                }
            })
        },
        /**
         * 수집갱신 처리
         */
        async fn_refreshApiCall() {
           //Vuex Store로 변경
           // 20220422 두번 클릭 방지 
           if(!this.isMyAssetGathering){
               this.getAllMyAssetInfo()
           }
        },
        /**
         * 신규알람 체크
         */
        fn_newAlarm(){
            const config = {
                url: '/co/co/00r06', // /co/co/00r02
                data: {
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                },
                disableLoading : true,
            }
            apiService.call(config).then(response =>{
                this.anwAncYn = response.anwAncYn
            })
        },
		// 개인신용정보 전송요구내역 조회
		fn_getAssetList(){
            //전송요구 내역이 없을 경우 자산연결하기 팝업 호출
            if(this.myAssetsBzRgCnt === 0) {
                const config = {
                    params: { // 파라미터
                    },
                    renderer : {
                        component : MAMA2002 //자산연결안내팝업
                    }
                }
                modalService.openSlidePagePopup(config).then(response => {
                    if(response === 'noSeeAssets') {
                        commonService.setStorage('noSeeAssets' + this.getUserInfo('chnl') , 'Y')
                    }

                    if(response === 'goAssets') {
                        this.fn_openAssetPage()
                    }
                })
            }
		},
        // 자산수집 mutation 이벤트 감지 
        listenSubscribe() {
            this.subscribe = this.$store.subscribe((mutation, state) => {
                const isMyAssetGathering = mutation.type === 'myassets/completeMyAssetGatherData'
                // 예금 전체조회
                if (isMyAssetGathering) {
                    this.fn_console('자산수집 subscribe  ###############################', mutation, state)
                    setTimeout(() => {
                        // this.fn_console('자산수집 after getData() ')
                        let mainFlag = '1'
                        this.getData(mainFlag)
                    }, 1000)
                }
            })
        },
        // 제휴정보 (KCB, NICE자동차)수집 요청
        getAllianceInfo(mydtTupSvcC){
            const config = {
            url: '/co/co/99sa1',
            disableLoading: true,
            data: {
                "mydtCusno" : this.getUserInfo('mydtCusno'), // 마이데이터고객번호
                "mydtTupSvcC": mydtTupSvcC, // 제휴서비스구분 KCB 01, NICE자동차 02
            },
            }
            apiService.call(config).then(() => {
                if(mydtTupSvcC === '02'){
                    this.getCarTaxInfo()
                }
            })
        },
        //NICE자동차 세금정보 조회
        getCarTaxInfo(){
            // const config = {
            // url: '/co/co/99sa3',
            // disableLoading: true,
            // data: {
            //     "mydtCusno" : this.getUserInfo('mydtCusno'), // 마이데이터고객번호
            // },
            // }
            // apiService.callWithNoPromise(config)
        },
        fn_console(msg1, msg2) {
            if (this.isDebugLog) {
                if (msg2) {
                    console.log(msg1, msg2)
                } else {
                    console.log(msg1)
                }
            }
        },
        /* [v4] 내가 연결한 자산 */
        fn_getForeExprList() {
            // 사용자 중앙회 계좌 조회
            const config = {
                url : "/co/am/08r03", //"/co/am/05rb3", ///co/am/05ra2
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
            }
            apiService.call(config).then(response => {
                console.log("nacfAccList===========>",response)
                this.nacfAccList = response.nacfAccList || []

                //this.fn_setNacfAccList(this.nacfAccList)

                // 농.축협 보유계좌가 하나일 경우 숨김버튼 히든처리
                // if(this.nacfAccList.length === 1) this.nacfAccTogYn = false
                // else this.nacfAccTogYn = true
            })

            // 개인신용정보 전송요구내역 조회
            const config_con = {
                url : "/co/am/08r02", 
                data : {
                    "mydtCusno" : this.getUserInfo('mydtCusno')
                },
                disableLoading : true,
            }
            apiService.call(config_con).then(response => {
                this.userAsetList = response.bzrgList || []
                console.log("개인신용정보 데이터 확인(response) :: ", response)
                console.log("개인신용정보 데이터 확인(this.userAsetList) :: ", this.userAsetList)
                this.modifyTxt = "연결 변경"
                this.disconTxt = "연결 해제"

                // 은행업권
                let tmpBankList	= (typeof _.find(this.userAsetList, {"comnCVal":"bank"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"bank"}).orgList : []

                console.log("은행업권 ::: ", tmpBankList)

                for(let i=0; i<tmpBankList.length; i++) {
                    tmpBankList[i].orgBizDsc = "bank"
                    if(tmpBankList[i].acsTokenDusDtm == '0' && dayDiff(tmpBankList[i].tmsEdDt, this.currentDate) >= 0) {
                        // 토큰만료일자가 0이고, 전송종료일자가 현재일자보다 크거나 같을경우 연결목록에 포함
                        this.bankList.push(tmpBankList[i])
                    } else {
                        // 그 외 경우 만료로 판단
                        this.bankExprList.push(tmpBankList[i])
                    }
                }

                let bankCnt = (this.nacfAccList.length > 0 ? 1 : 0) + this.bankList.length
                if ( this.nacfAccList.length > 0 ) {
                    this.bankListCnt = 2
                } else {
                    this.bankListCnt = 3
                }
                 

                // 카드업권
                let tmpCardList 	= (typeof _.find(this.userAsetList, {"comnCVal":"card"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"card"}).orgList : []
                
                console.log("카드업권 ::: ", tmpCardList)
                for(let i=0; i<tmpCardList.length; i++) {
                    tmpCardList[i].orgBizDsc = "card"
                    if(tmpCardList[i].acsTokenDusDtm == '0' && dayDiff(tmpCardList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.cardList.push(tmpCardList[i])
                    } else {
                        this.cardExprList.push(tmpCardList[i])
                    }
                }

                // 증권업권
                let tmpInvestList 	= (typeof _.find(this.userAsetList, {"comnCVal":"invest"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"invest"}).orgList : []
                for(let i=0; i<tmpInvestList.length; i++) {
                    tmpInvestList[i].orgBizDsc = "invest"
                    if(tmpInvestList[i].acsTokenDusDtm == '0' && dayDiff(tmpInvestList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.investList.push(tmpInvestList[i])
                    } else {
                        this.investExprList.push(tmpInvestList[i])
                    }
                }

                // 보험업권
                let tmpInsuList		= (typeof _.find(this.userAsetList, {"comnCVal":"insu"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"insu"}).orgList : []
                for(let i=0; i<tmpInsuList.length; i++) {
                    tmpInsuList[i].orgBizDsc = "insu"
                    if(tmpInsuList[i].acsTokenDusDtm == '0' && dayDiff(tmpInsuList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.insuList.push(tmpInsuList[i])
                    } else {
                        this.insuExprList.push(tmpInsuList[i])
                    }
                }

                // 보증보헙엄권
                let tmpGinsuList	= (typeof _.find(this.userAsetList, {"comnCVal":"ginsu"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"ginsu"}).orgList : []
                for(let i=0; i<tmpGinsuList.length; i++) {
                    tmpGinsuList[i].orgBizDsc = "ginsu"
                    if(tmpGinsuList[i].acsTokenDusDtm == '0' && dayDiff(tmpGinsuList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.ginsuList.push(tmpGinsuList[i])
                    } else {
                        this.ginsuExprList.push(tmpGinsuList[i])
                    }
                }

                // 전자금융업권
                let tmpEfinList 	= (typeof _.find(this.userAsetList, {"comnCVal":"efin"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"efin"}).orgList : []
                for(let i=0; i<tmpEfinList.length; i++) {
                    tmpEfinList[i].orgBizDsc = "efin"
                    if(tmpEfinList[i].acsTokenDusDtm == '0' && dayDiff(tmpEfinList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.efinList.push(tmpEfinList[i])
                    } else {
                        this.efinExprList.push(tmpEfinList[i])
                    }
                }

                // 할부금융업권
                let tmpCapitalList 	= (typeof _.find(this.userAsetList, {"comnCVal":"capital"}) !== "undefined")? _.find(this.userAsetList, {"comnCVal":"capital"}).orgList : []
                for(let i=0; i<tmpCapitalList.length; i++) {
                    tmpCapitalList[i].orgBizDsc = "capital"
                    if(tmpCapitalList[i].acsTokenDusDtm == '0' && dayDiff(tmpCapitalList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.capitalList.push(tmpCapitalList[i])
                    } else {
                        this.capitalExprList.push(tmpCapitalList[i])
                    }
                }

                // 통신업권
                let tmpTelecomList	= (typeof _.find(this.userAsetList, {"comnCVal":"telecom"}) !== "undefined")? _.find(this.userAsetList, {"comnCVal":"telecom"}).orgList : []
                for(let i=0; i<tmpTelecomList.length; i++) {
                    tmpTelecomList[i].orgBizDsc = "telecom"
                    if(tmpTelecomList[i].acsTokenDusDtm == '0' && dayDiff(tmpTelecomList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.telecomList.push(tmpTelecomList[i])
                    } else {
                        this.telecomExprList.push(tmpTelecomList[i])
                    }
                }
                
                // 대부업권
                let tmpUsuryList	= (typeof _.find(this.userAsetList, {"comnCVal":"usury"}) !== "undefined")	? _.find(this.userAsetList, {"comnCVal":"usury"}).orgList : []
                for(let i=0; i<tmpUsuryList.length; i++) {
                    tmpUsuryList[i].orgBizDsc = "usury"
                    if(tmpUsuryList[i].acsTokenDusDtm == '0' && dayDiff(tmpUsuryList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.usuryList.push(tmpUsuryList[i])
                    } else {
                        this.usuryExprList.push(tmpUsuryList[i])
                    }
                }

                // 채권업권
                let tmpBondList		= (typeof _.find(this.userAsetList, {"comnCVal":"bond"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"bond"}).orgList : []
                for(let i=0; i<tmpBondList.length; i++) {
                    tmpBondList[i].orgBizDsc = "bond"
                    if(tmpBondList[i].acsTokenDusDtm == '0' && dayDiff(tmpBondList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.bondList.push(tmpBondList[i])
                    } else {
                        this.bondExprList.push(tmpBondList[i])
                    }
                }

                // P2P업권
                let tmpP2pList 		= (typeof _.find(this.userAsetList, {"comnCVal":"p2p"}) !== "undefined")	? _.find(this.userAsetList, {"comnCVal":"p2p"}).orgList : []
                for(let i=0; i<tmpP2pList.length; i++) {
                    tmpP2pList[i].orgBizDsc = "p2p"
                    if(tmpP2pList[i].acsTokenDusDtm == '0' && dayDiff(tmpP2pList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.p2pList.push(tmpP2pList[i])
                    } else {
                        this.p2pExprList.push(tmpP2pList[i])
                    }
                }

                // 공공 업권 연결 목록
                let tmpPublicList 		= (typeof _.find(this.userAsetList, {"comnCVal":"public"}) !== "undefined")	? _.find(this.userAsetList, {"comnCVal":"public"}).orgList : []
                for(let i=0; i<tmpPublicList.length; i++) {
                    tmpPublicList[i].orgBizDsc = "public"
                    if(tmpPublicList[i].acsTokenDusDtm == '0' && dayDiff(tmpPublicList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.publicList.push(tmpPublicList[i])
                    } else {
                        this.publicExprList.push(tmpPublicList[i])
                    }
                }
            })
        },
    
        /* [v4] 자산 순서 편집에 따른 Tab 구분 */
        fn_setCompSortInfo() {
            // 상단 탭 영역 정보
            
            this.tabs = commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'tabsV4')
            if(!this.tabs || !this.tabs.length || this.tabs.length === 0 || this.tabs.length > 9) {
                // 최초 접속하는 경우 기본 값으로 설정 처리
                this.tabs = [   {id:'item01', hidden:'N', name: '주가지수'},
                                {id:'item02', hidden:'N', name: '추천서비스'},
                                {id:'item03', hidden:'N', name: '주요자산 변동내역'},
                                {id:'item04', hidden:'N', name: '자산분석을 통한 제안'},
                                {id:'item05', hidden:'N', name: '신용과 건강'},
                                {id:'item06', hidden:'N', name: '건강, 연금/절세'},
                                {id:'item07', hidden:'N', name: '내가 연결한 자산'},
                                {id:'item08', hidden:'N', name: '자산진단'},
                                {id:'item09', hidden:'N', name: '나의 관심서비스'},                            
                            ]
                commonService.setStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'tabsV4', this.tabs)
            }

            this.myAssetWrsList  = commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'myAssetWrs')

            if(!this.myAssetWrsList || !this.myAssetWrsList.length || this.myAssetWrsList.length === 0)  //  || this.myAssetWrsList.length > 6
            {
                // 최초 접속하는 경우 기본 값으로 설정 처리
                this.menu01Able = 'Y';    this.menu02Able = 'Y';    this.menu03Able = 'Y';    this.menu04Able = 'Y';
                this.menu05Able = 'Y';    this.menu06Able = 'N';    this.menu07Able = 'N';    this.menu08Able = 'N';
                this.menu09Able = 'N';    this.menu10Able = 'N';    this.menu11Able = 'N';    this.menu12Able = 'N';
                this.menu13Able = 'N';    this.menu14Able = 'N';    this.menu15Able = 'N';

                this.myAssetWrsList = ['ASAC4001','ASRE4001','ASIV4001','ASPS4001','ASPT4001']
                commonService.setStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'myAssetWrs', this.myAssetWrsList)
            } else {

                // 초기화
                this.menu01Able = 'N';    this.menu02Able = 'N';    this.menu03Able = 'N';    this.menu04Able = 'N';
                this.menu05Able = 'N';    this.menu06Able = 'N';    this.menu07Able = 'N';    this.menu08Able = 'N';
                this.menu09Able = 'N';    this.menu10Able = 'N';    this.menu11Able = 'N';    this.menu12Able = 'N';
                this.menu13Able = 'N';    this.menu14Able = 'N';    this.menu15Able = 'N';

                for(let i=0 ; i < this.myAssetWrsList.length ; i++) {
                    if      (this.myAssetWrsList[i] == 'ASAC4001')  this.menu01Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASRE4001')  this.menu02Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASIV4001')  this.menu03Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASPS4001')  this.menu04Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASPT4001')  this.menu05Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASIS4001')  this.menu06Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASCD4001')  this.menu07Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASLN4001')  this.menu08Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASCA4001')  this.menu09Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASOA4001')  this.menu10Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASIT4001')  this.menu11Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASCL4001')  this.menu12Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASEL4001')  this.menu13Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASLS4001')  this.menu14Able = 'Y'
                    else if (this.myAssetWrsList[i] == 'ASBR4001')  this.menu15Able = 'Y'
                }
            }

        },
      

        /* [v4].1-1 나의 재무진단 결과 */
        /* 나의 재무진단 결과 */
        fn_getMyFnaDgsRzt() {
            const config = {
                url: '/as/ip/01r04',
                data: {
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                    "basDt"     : dateFormat(new Date(), "YYYYMMDD")
                },
                disableLoading : true,
            }
            apiService.call(config).then((response) =>{
                console.log("fn_getMyFnaDgsRzt : ", response)
              
                this.hseFnaDgnRzt    = response.hseFnaDgnRzt || ''              //가계재무진단결과 : 적정, 개선
                this.hseFnaIxSatC    = response.hseFnaIxSatC || ''              //가계재무충족지수코드
                this.hseFnaIxSatRate = this.fn_ixSatRate(this.hseFnaDgnRzt, this.hseFnaIxSatC)      //가계재무충족지수비율
                
                this.futRsvDgnRzt    = response.futRsvDgnRzt || ''              //미래준비진단결과 : 적정, 개선
                this.futRsvIxSatC    = response.futRsvIxSatC || ''              //미래준비충족지수코드
                this.futRsvIxSatRate = this.fn_ixSatRate(response.futRsvDgnRzt, response.futRsvIxSatC)      //미래준비충족지수비율

                this.dbtAmnDgnRzt    = response.dbtAmnDgnRzt || ''              //부채관리진단결과 : 적정, 개선
                this.dbtAmnIxSatC    = response.dbtAmnIxSatC || ''              //부채관리충족지수코드
                this.dbtAmnIxSatRate = this.fn_ixSatRate(response.dbtAmnDgnRzt, response.dbtAmnIxSatC)      //부채관리충족지수비율
            });
        },
        fn_ixSatRate(dgnRzt, ixSatC) {

            /* CASE 0% : 클래스 없음                
                CASE1 적정
                1-1. 34%  : N : li에 "up_01" 클래스 추가
                1-2. 67%  : H : li에 "up_02" 클래스 추가
                1-3. 100% : S : li에 "up" 클래스 추가

                CASE2 개선
                2-1. 34%  : N : li에 "down_01" 클래스 추가
                2-2. 67%  : H : li에 "down_02" 클래스 추가
                2-3. 100% : S : li에 "down" 클래스 추가
                2-4.  0%  : Z
            */  

            let rzt = ''
            let ixSatRate
            if ( dgnRzt === "적정") {
                if (ixSatC == "S") {
                    ixSatRate = "up"
                } else if (ixSatC == "H") {
                    ixSatRate = "up_02"
                } else if (ixSatC == "N") {
                    ixSatRate = "up_01"
                } else {
                    ixSatRate = ""
                }
            } else if ( dgnRzt === "개선") {
                
                if (ixSatC == "S") {
                    ixSatRate = "down"
                } else if (ixSatC == "H") {
                    ixSatRate = "down_02"
                } else if (ixSatC == "N") {
                    ixSatRate = "down_01"
                } else {
                    ixSatRate = ""
                }                
            } else {
                ixSatRate = "";
            }

            return ixSatRate
        },

        /* [v4].1-2나의 금융스타일 */
        fn_getFinStyleDGS() {

            const config = {
                url: '/as/ip/10r01', // 인터페이스ID: IF-MOB-PFM-ASIP10R01, 서비스코드: PFMASIP10R01
                data: {
                    "mydtCusno"  : this.getUserInfo('mydtCusno'),	
                    "basYmd"     : this.currYmd
                }
            }
            console.log('======= fn_getFinStyleDGS.config =======', config)

            apiService.call(config).then(response =>{
                console.log('======= fn_getFinStyleDGS./as/ip/10r01 =======', response)

                /*************/
                this.ivRto          = response.ivRto;       // 투자
                this.svRto          = response.svRto;       // 저축
                this.prdStyCd       = response.prdStyCd;    // *
                this.prdStyDtlCd    = response.prdStyDtlCd;
                
                // canvas 서클데이터
                this.$nextTick(() => {
                    const colors =[
										[
											[0,'#3fd999']
										],
										[
											[0,'#6b75ff']
										]
									]

                    this.cycleData = {
                        parts:{"pt": [this.ivRto , this.svRto]},//percentage of each parts 
                        colors:{"cs": colors }//color of each part
                    };
                    this.cycleIdx = 0;
                })

                if(this.prdStyCd === 'PS01')
                {   
                    this.prdStyCdNm = '분산관리성향'    
                    this.hldWrsToolTipMsg = "저축성 상품과 투자성 상품을 각각 1개 이상 보유하며, 자산을 다양하게 분산해서 관리하는 성향"
                }
                else if(this.prdStyCd === 'PS02')
                {   
                    this.prdStyCdNm = '투자성향'    
                    this.hldWrsToolTipMsg = "저축성 상품은 없지만 투자성 상품은 가진, 수익을 추구하는 성향"
                }
                else 
                {   
                    this.prdStyCdNm = '저축성향'    
                    this.hldWrsToolTipMsg = "저축성 상품은 있지만, 투자성 상품은 없는, 안전 지향적인 성향"
                }


                if(this.prdStyDtlCd === 'PSDTL01')
                {   
                    this.prdStyDtlPhr1 = '저축 및 투자 상품을 최소 1개씩 보유한'  
                    // this.prdStyDtlPhr2 = ''  
                }
                else if(this.prdStyDtlCd === 'PSDTL02')
                {   
                    this.prdStyDtlPhr1 = '투자 상품 비중이 높은'                                    
                }
                else 
                {   this.prdStyDtlPhr1 = '저축 상품 비중이 높은'                 }

            })
        },              
        
        clickBanner(item) {
            console.log('clickBanner ### ', item)
            if (item.type === 'page') this.fn_movePage(item.pageId)
            else this.fn_moveOpenPage(item.pageId)
        },
   
    },

    mixins: [
        commonMixin,
        popupMixin
    ],
    components: { 
        FootersV2,
        CmmCanvas,
        LottieAnimation,
        CmmFlotBanner,
        CmmFlotIcon
    }
    
}

</script>