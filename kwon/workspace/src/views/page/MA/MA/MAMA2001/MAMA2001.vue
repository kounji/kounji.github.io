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
*************************************************************************/
-->
<template>
    <!-- <page id="main" class="main"> -->
    <!-- <div id="wrap" class="sticky-scroll"> -->
    <div class="content-view mydata2023">
        <!-- header 
        <header id="header" class="mainWrap mydata2023">
            <a href="javascript:void(0);" class="btn_back" @click.prevent="fn_movePrev"><span class="blind">이전화면</span></a>
            <div class="header_option">
                <a v-show="cbtType" style="color: red;">디지털 전환용</a>
                <a href="javascript:void(0);" class="btn_alert" :class="(anwAncYn==='1') ? 'on' : ''" @click="fn_moveOpenPage('MRCO1001')"><span class="blind">{{anwAncYn==='1' ? '새 알림이 있어요' : '알림'}}</span></a>
            </div>
        </header>
        -->
        <header id="header">
            <h1>리포트</h1>
            <button type="button" class="prev" @click.prevent="fn_movePrev"><span class="blind">이전</span></button>
            <div class="option">
                <a v-show="cbtType" style="color: red;">디지털 전환용</a>
                <button type="button" class="bank"   @click.prevent="fn_moveHome()"><span class="blind">홈</span></button>
                <button type="button" class="search" @click.prevent="fn_movePage('COCO4301')"><span class="blind">검색</span></button>
                <button type="button" class="menu"   @click.prevent="fn_movePage('MRMR4001')"><span class="blind">전체메뉴</span></button>
            </div>
        </header>        
        <!--// header -->
        <div id="content" class="mydata2023 mainWrap">
            <div class="com_inner">
                <div v-if="orgPrdCnt > 0 || isEndDate || cardPayDate" class="box_border_link iconType01">
                    <!-- <a href="javascript:void(0);" v-if="orgExprCnt > 0" role="button" @click="fn_movePage('MRAM2001')"><span class="arrow"><em class="num">{{ orgExprCnt }}</em>개 기관 자산 조회 기간이 만료됐어요</span></a> -->
                    <a href="javascript:void(0);" v-if="orgPrdCnt > 0" role="button" @click="fn_movePage('MRAM2001')"><span class="arrow"><em class="num">{{ orgPrdCnt }}</em>개 기관 자산 연결이 만료돼요</span></a>
                    <a href="javascript:void(0);" v-else-if="isEndDate" role="button" @click="fn_movePage('ASIP4001')"><span class="arrow">이번 달 자산을 진단해 드릴게요</span></a>
                    <a href="javascript:void(0);" v-else-if="!!closeCardPayDate" role="button" @click="fn_movePage('ASCD4001')"><span class="arrow">{{ closeCardPayDate | dateFilter('MM월DD일') }} 카드값 내는 날이에요</span></a>
                </div>
                <div class="layoutBox wAuto rBtn top">
                    <div class="left">
                        <div class="customerName">
                            <span>{{cusnm}}</span>님의 순자산
                            <div class="custom_tooltip">
                                <div class="com_tooltip_type02 com_tooltip_type03">
                                    <a href="#nolink" class="com_btn_info" role="button">
                                        <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                    </a>
                                    <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                        <div>
                                            <strong class="title">순자산이란?</strong>
                                            <p class="mt10">보유한 금융/실물/기타자산에서 부채를 제외한 실제 자산을 의미해요.</p>
                                            <p class="dot_msg mt10">금융자산 : 예금, 투자, 연금, 페이/포인트</p>
                                            <p class="dot_msg">실물자산 : 부동산 매매가 또는 보증금, 자동차 현재 시세</p>
                                            <p class="dot_msg">기타자산 : 직접 등록한 현금, 외화, 금, 기타 자산</p>
                                            <p class="dot_msg">부채 : 대출, 할부금융, 카드결제예정금액 등</p>
                                            <p class="mt10 pointColor gray3">자산 증감은 전월말 보유 자산과 현재 자산을 비교했어요.</p>
                                            <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <button type="button" class="stdBtn innerType02" @click="fn_openAssetPage()">자산연결</button>
                    </div>
                </div>
                <div class="asset_price">
                    <a href="javascript:void(0);" title="자산합계편집 팝업열기" role="button" @click.prevent="fn_openEditPage()">
                        <span class="num counter" :data-count="totAsetAm">{{ totAsetAm | numberFilter }}</span>원
                    </a>
                </div>
                <div class="updateTime" @click.prevent="fn_refreshApiCall()">
                    <template v-if="!isMyAssetGathering">
                        <!-- <span aria-live="polite" style="display: none">자산 업데이트가 완료되었습니다.</span> -->
                        <!--span>{{ lastUpdateDtm }}</span-->
                        <span>{{ assetUpdateDtm }}</span> <!-- V4.0 -->
                        <button class="btnreFresh"><span class="blind">새로고침</span></button>
                    </template>
                    <span v-else class="ml5 num lsp0">자산 업데이트 중입니다</span>
                </div>
                <!-- tab 정렬 -->
                <template v-for="tab in tabs" >
                    <!-- 자산영역 -->
                    <div v-if="tab.id === 'as'" class="com_box_type01" :key="tab.id">
                        <!-- <ul class="layoutBox wAuto rBtn">
                            <li class="left">
                                <strong v-if="astIndSum > 0" class="titH3">지난 달보다 자산이 늘었어요</strong>
                                <strong v-else-if="astIndSum < 0" class="titH3">지난 달보다 자산이 줄었어요</strong>
                                <strong v-else class="titH3">지난 달과 자산이 같아요</strong>
                            </li>
                            <li class="right">
                                <button class="btnLink" @click.prevent="fn_movePage('ASTA2001')"><span class="blind">전체자산</span></button>
                            </li>
                        </ul> -->
                        <a href="javascript:void(0);" class="btnLink blockType" title="전체자산 열기" @click.prevent="fn_movePage('ASTA4001')">
                            <strong v-if="astIndSum > 0" class="titH3">지난 달보다 자산이 늘었어요</strong>
                                <strong v-else-if="astIndSum < 0" class="titH3">지난 달보다 자산이 줄었어요</strong>
                                <strong v-else class="titH3">지난 달과 자산이 같아요</strong>
                        </a>
                        <p 
                            v-if="astIndSum && astIndSum !== 0" 
                            :class="`amount ${astIndSum > 0 ? 'up' : astIndSum < 0 ? 'down' : 'amount'}`">
                            <i role="img" :aria-label="`${astIndSum > 0 ? '자산 증가' : astIndSum < 0 ? '자산 감소' : '자산 동일'}`"></i>
                            <span>{{Math.abs(astIndSum) | numberFilter}} 원</span>
                        </p><!-- 증가amount up, 감소amount down, 증감없음amount -->
                        <div v-if="assetList.length > 0" :class="`layoutBox assetGrp ${assetList.reduce((acc, cur)=> acc+cur.amSum, 0) === 0 ? 'noData' : ''}`">
                            <div class="left">
                                <!-- <span v-for="assetList" :class="`${assetList[0].class} second`">{{assetList[0].per}}%</span> -->
                                <span :class="`${assetList[1].class} second`">{{assetList[1].per}}%</span>
                                <span :class="`${assetList[0].class} first`">{{assetList[0].per}}%</span>
                                <span :class="`${assetList[2].class} third`">{{assetList[2].per}}%</span>
                            </div>
                            <div class="right">
                                <ul class="assetIndex">
                                    <li :class="`${assetList.find(el=>el.class==='fin').class}`">{{ assetList.find(el=>el.class==='fin').name }}<i>{{assetList.find(el=>el.class==='fin').per}}%</i></li>
                                    <li :class="`${assetList.find(el=>el.class==='real').class}`">{{ assetList.find(el=>el.class==='real').name }}<i>{{assetList.find(el=>el.class==='real').per}}%</i></li>
                                    <li :class="`${assetList.find(el=>el.class==='etc').class}`">{{ assetList.find(el=>el.class==='etc').name }}<i>{{assetList.find(el=>el.class==='etc').per}}%</i></li>
                                </ul>
                            </div>
                        </div>
                        <a href="javascript:void(0);" v-if="prdStyCdNm && finStyCdNm" class="assetAnalyTxt btnLink blockType" @click="()=>{fn_movePage('ASIP4001'); fn_moveOpenPage('ASIP2010')}">
                            <p class="Txt">나의 금융자산 유형</p>
                            <strong class="com_txt_sub01">{{ prdStyCdNm }}</strong>
                            <span class="potTxt">{{ finStyCdNm }}형</span>
                        </a>
                        <!-- {{xpsStyle.xpsCtgrNm}}</b> 소비가 많은<br><em>{{xpsStyle.xpsRsnNm}} -->
                        <hr aria-hidden="true">
                        <!-- 재무진단 연결된 경우 -->
                        <div v-if="isConnectedAssetDigs" class="financAnalyBox connect">
                            <!-- <ul class="layoutBox wAuto rBtn">
                                <li class="left">
                                    <strong class="titH3">나의 재무진단</strong>
                                </li>
                                <li class="right">
                                    <button class="btnLink" @click="fn_movePage('ASIP4001')"><span class="blind">자산진단 연결</span></button>
                                </li>
                            </ul> -->
                            <a href="javascript:void(0);" class="btnLink blockType" title="자산진단 열기" @click="fn_movePage('ASIP4001')"><strong class="titH3">나의 재무진단</strong></a>
                            <div class="financGrp layoutBox">
                                <div class="left">
                                    <ul class="grp">
                                        <li v-for="(item, index) in myFnaDgnArray" :key="index" :class="`${item.dgnRzt === '개선' ? 'alert' : ''} ${item.ixSatC === 'H' ? 'mid' : item.ixSatC === 'N' ? 'bot' : item.ixSatC === 'S' ? 'full' : ''}`">
                                            <em v-if="item.dgnRzt === '개선'" class="alt">개선</em>
                                            <div class="grpBar">
                                                <span></span>
                                            </div>
                                            <em>{{item.category}}</em>
                                        </li>
                                    </ul>
                                </div>
                                <div v-if="myFnaDgnArray" class="right">
                                    <div v-if="myFnaDgnArray.find(el=>el.ixSatC === 'N')" class="finaneAnlyTxt alert">
                                        <strong>재무 상태 관리</strong>가<br>필요해요!
                                    </div>
                                    <div v-else class="finaneAnlyTxt alert">
                                        <strong>안정된 재무 관리</strong> 중이예요
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--// 재무진단 연결된 경우 -->
                        <!-- 재무진단 연결안된 경우 -->
                        <template v-else>
                            <div class="financAnalyBox nonConnect">
                                <div class="layoutBox">
                                    <p class="titH3">재무관리 잘 하고 있을까요?</p>
                                </div>
                                <div class="financGrp layoutBox">
                                    <div class="left">
                                        <div class="grp">
                                            <em class="alt">개선?</em>
                                            <div class="grpBar">
                                                <img src="@/assets_v40/images/img/img_nonGrpBarBg_2023.png" class="movQuestion" alt="물음표">                                            </div>
                                            <em>내 재무상태</em>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="finaneAnlyTxt">소득과 자산을 연결하면<br>진단해 드려요</div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="stdBtn full" @click="fn_moveOpenPage('COAR2002', {mramSelList: [{orgDiv:'public', orgObj:{infOfrmnOrgC:'PBAAVN0000'}}]})">연결하고 진단받기</button>
                        </template>
                        <!--// 재무진단 연결안된 경우 -->
                    </div>
                    <!--// 자산영역 -->
                    <!-- 지출영역 -->
                    <div v-if="tab.id === 'lc'" :class="`com_box_type01 ${fxtmList.length > 3 ? 'bottomBtnType' : ''}`" :key="tab.id">
                        <!-- <ul class="layoutBox wAuto rBtn">
                            <li class="left">
                                <strong class="titH3">{{ currMm }}월 쓴 돈</strong>
                            </li>
                            <li class="right">
                                <button class="btnLink" @click="fn_movePage('LCLE4001')"><span class="blind">지출내역 연결</span></button>
                            </li>
                        </ul> -->
                        <a href="javascript:void(0);" class="btnLink blockType" title="지출내역 열기" @click="fn_movePage('LCLE4001')"><strong class="titH3">{{ currMm }}월 쓴 돈</strong></a>
                        <p class="com_txt_sub">{{(cusMmtpXpsOut.bmmCmprXpsAm) > 0 ? '지난 달 보다 더 쓰고 있어요' : cusMmtpXpsOut.bmmCmprXpsAm === 0 ? '지난 달과 변화가 없어요' : '지난 달 보다 덜 쓰고 있어요'}}</p>
                        <p v-if="cusMmtpXpsOut.bmmCmprXpsAm && cusMmtpXpsOut.bmmCmprXpsAm != 0" :class="`amount ${(cusMmtpXpsOut.bmmCmprXpsAm) > 0 ? 'up' : cusMmtpXpsOut.bmmCmprXpsAm === 0 ? 'amount' : 'down'}`">{{Math.abs(cusMmtpXpsOut.bmmCmprXpsAm) | numberFilter}}원</p><!-- 증가amount up, 감소amount down, 증감없음amount -->
                        <!-- 차트영역 -->
                        <div class="chartArea">
                            <span class="monAmt" ><i>{{cusMmtpXpsOut.xpsAm0 | numberFilter}}</i>원</span>
                            <div id="chartMainHolder" role="img" :aria-label="`최근 6개월간 지출 추이입니다. ${cusMmtpXpsOut.bmYm5}월 ${cusMmtpXpsOut.xpsAm5}원, ${cusMmtpXpsOut.bmYm4}월 ${cusMmtpXpsOut.xpsAm4}원, ${cusMmtpXpsOut.bmYm3}월 ${cusMmtpXpsOut.xpsAm3}원, ${cusMmtpXpsOut.bmYm2}월 ${cusMmtpXpsOut.xpsAm2}원,${cusMmtpXpsOut.bmYm1}월 ${cusMmtpXpsOut.xpsAm1}원, 이번달 ${cusMmtpXpsOut.xpsAm0}원`"></div>
                        </div>
                        <!--// 차트영역 -->
                        <!-- <ul v-if="xpsStyle.xpsCtgrNm" class="layoutBox wAuto rBtn">
                            <li class="left">
                                <strong class="titH5"><span class="pointTxt">{{xpsStyle.xpsCtgrNm}}</span>에서 제일 많이 썼어요</strong>
                            </li>
                            <li class="right">
                                <button class="btnLink" @click="fn_movePage('LCIP4001')"><span class="blind">지출분석 연결</span></button>
                            </li>
                        </ul> -->
                        <a v-if="xpsStyle.xpsCtgrNm" href="javascript:void(0);" class="btnLink blockType" title="지출분석 열기" @click="fn_movePage('LCIP4001')"><p class="titH5"><strong class="pointTxt">{{xpsStyle.xpsCtgrNm}}</strong>에서 제일 많이 썼어요</p></a>
                        <hr aria-hidden="true">
                        <!-- 정기지출 정보가 없는 경우 -->
                        <template v-if="fxtmList.length < 1">
                            <!-- <ul class="layoutBox wAuto rBtn">
                                <li class="left">
                                    <strong class="titH3">다가올 지출 <i>{{fxtmList.length || 0}}</i>건</strong>
                                </li>
                                <li class="right">
                                    <button class="btnLink" @click="fn_moveOpenPage('LCIP2007')"><span class="blind">정기지출 연결</span></button>
                                </li>
                            </ul> -->
                            <a href="javascript:void(0);" class="btnLink blockType" title="정기지출 열기" @click="fn_movePage('LCIP4001', {openPopup: 'LCIP2007'})"><strong class="titH3">다가올 지출 <i>{{fxtmList.length || 0}}</i>건</strong></a>
                            <div class="gray_box_m">
                                <p>예상되는 정기지출을<br>찾을 수 없어요</p>
                            </div>
                        </template>
                        <!--// 정기지출 정보가 없는 경우 -->
                        <!-- 정기지출 정보가 있는 경우 -->
                        <template v-else-if="fxtmList.length > 0">
                            <a href="javascript:void(0);" class="btnLink blockType" title="정기지출 열기" @click="fn_movePage('LCIP4001', {openPopup: 'LCIP2007'})"><strong class="titH3">다가올 지출 <i>{{fxtmList.length || 0}}</i>건</strong></a>
                            <!-- <ul class="layoutBox wAuto rBtn">
                                <li class="left">
                                    <strong class="titH3">다가올 지출 <i>{{ fxtmList.length }}</i>건</strong>
                                </li>
                                <li class="right">
                                    <button class="btnLink" @click="() => {fn_movePage('LCIP4001'); fn_moveOpenPage('LCIP2007')}"><span class="blind">정기지출 연결</span></button>
                                </li>
                            </ul> -->
                            <!-- 정기지출목록 -->
                            <ul :class="`expenListBox ${fxtmList.length > 3 ? 'botmBtn' : ''} ${isOpenList ? 'open' : ''}`">
                                <template v-for="(fxtmInfo, idx) in fxtmList">
                                    <li :class="`expenList ${idx > 2 && !isOpenList? 'hidd' : ''}`" :key="idx">
                                        <span class="expIcon" :class="fxtmInfo.xpsCtgrC"></span>
                                        <strong class="expName">{{ fxtmInfo.wrsnm }}</strong>
                                        <span class="expTarget"><i>{{fxtmInfo.fxtmMmDd}}</i>{{fxtmInfo.prcMchtnm}}</span>
                                        <em class="expAmt">{{ fxtmInfo.xpsAm | numberFilter }}원</em>
                                    </li>
                                </template>
                            </ul>
                            <!--// 정기지출목록 -->
                            <button v-if="fxtmList.length > 3" :class="`bottomBtn ${isOpenList ? 'up' : ''}`" @click.prevent="() => isOpenList = !isOpenList">{{isOpenList ? '접기' : '더보기'}}</button>
                        </template>
                        <!--// 정기지출 정보가 있는 경우 -->
                    </div>
                    <!--// 지출영역 -->
                    <!-- 등록한 목표가 없는 경우 -->
                    <template v-if="tab.id === 'tg'">
                        <div v-if="expenseList.length < 1 && financialList.length < 1" class="com_box_type01" :key="tab.id">
                            <ul class="layoutBox wAuto">
                                <li class="left">
                                    <strong class="titH3"><i class="fwnormal">나의</i> 목표</strong>
                                </li>
                                <li class="right"></li>
                            </ul>
                            <p class="nonMyTargetTitle">이루고 싶은 목표를 정하고<br>도전하세요!</p>
                            <button type="button" class="stdBtn full" @click="fn_movePage('PDMY4001',{type: 'reg'})">도전 목표 정하기</button>
                        </div>
                        <!--// 등록한 목표가 없는 경우 -->
                        <!-- 나의 목표 -->
                        <div v-else class="com_box_type01" :key="tab.id">
                            <ul class="layoutBox wAuto progress_wrap">
                                <li class="left">
                                    <strong class="titH3"><em>{{ (expenseList.length > 0 ? 1 : 0) + financialList.length }}</em>개 목표<i class="fwnormal">에 도전</i></strong>
                                </li>
                                <!-- <li class="right progress_num"><em class="pointColor green">2</em>/3</li> -->
                            </ul>
                            <div class="myTargetRollArea">
                                <div class="slider slideBox">
                                    <!-- 지출 목표가 등록된 경우 노출-->
                                    <template v-if="expenseList.length > 0">
                                        <a href="javascript:void(0);" title="" class="slide slide01" @click="detailMove1(expenseList[0].stYm)">
                                            <div class="myTargetBox expTar">
                                                <span class="myTargetIcon"></span>
                                                <span class="myTarget"><b>{{currMm}}월</b> 목표예산</span>
                                                <strong class="myTargetName"><b>{{expenseList[0].xpsObtAm | numberFilter}}원</b><i class="day">{{setExpenseDday()}}</i></strong>
                                            </div>
                                            <ul class="layoutBox half gray_box_m">
                                                <li class="left">
                                                    <p class="myTargetMoneyName">남은돈</p>
                                                    <strong class="myTargetMoney">{{expenseList[0].xpsObtAm-xpsAm | numberFilter}}원</strong>
                                                </li>
                                                <li class="right">
                                                    <div class="progressBar">
                                                        <div class="bar">
                                                            <div class="popover_wrap">
                                                                <span class="popover">
                                                                    <em class="num">{{expenseList[0].obtRate}}</em>%
                                                                    <span class="arrow"></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </a>
                                    </template>
                                    <!--// 지출 목표가 등록된 경우 노출-->
                                    <a href="javascript:void(0);" title="" class="slide slide02" v-for="(financialInfo, index) in financialList" :key="'goal_'+index" @click="goalDetailMove(financialInfo.fncObtDsc, financialInfo.sqno, financialInfo.prgStsCd, financialInfo.carGrdNo, financialInfo.carCtrimNo, financialInfo.basyy, financialInfo.basmm)">
                                        <template v-if="financialList.length > 0">
                                            <div class="myTargetBox" :class="`${financialInfo.img}`">
                                                <span v-if="financialInfo.img" class="myTargetIcon" :class="financialInfo.img"></span>
                                                <!-- <img :src="require('@/assets_v30/images/img/bucketList_'+financialInfo.img+'_2023.png')" :alt="financialInfo.imgAlt" :style="financialInfo.imgStyle"/> -->
                                                <span class="myTarget">{{financialInfo.tit}}</span>
                                                <strong class="myTargetName"><b>{{financialInfo.obtnm}}</b><i class="day">{{ financialInfo.dday }}</i></strong>
                                                <!-- setDday(financialInfo.obtDt, financialInfo.fncObtAchvYn -->
                                            </div>
                                            <ul class="layoutBox half gray_box_m">
                                                <li class="left">
                                                    <p class="myTargetMoneyName">모은돈</p>
                                                    <strong class="myTargetMoney">{{financialInfo.acNowBacTotAm | numberFilter}}원</strong>
                                                </li>
                                                <li class="right">
                                                    <div class="progressBar">
                                                        <div class="bar">
                                                            <div class="popover_wrap">
                                                                <span class="popover">
                                                                    <em class="num">{{financialInfo.obtRate}}</em>%
                                                                    <span class="arrow"></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </template>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!--// 나의 목표 -->
                    </template>
                </template>
            </div>
            <!--// com_inner -->
            <!-- 부가 서비스 배너 -->
            <div v-if="banners.filter(el=> el.hidden === 'N')" class="subSvcBannerArea">
                <div v-for="(item, index) in banners.filter(el=> el.hidden === 'N')" :id="item.id" :key="`${item.id}_${index}`" :class="`com_box_type01 bannerCard ${item.class}`">
                    <a href="javascript:void(0);" @click="clickBanner(item)">
                        <strong>{{ item.name }}</strong>
                        <p>{{ item.desc }}</p>
                    </a>
                </div>
            </div>
            <!--// 부가 서비스 배너 -->
            <div class="setBtnBox">
                <button class="com_btn_round viewSet" @click="fn_moveOpenPage('MAMA4004')">화면 설정</button>
                <button class="com_btn_round linkSet" @click="fn_movePage('MRAM2001')">연결 관리</button>
            </div>
        </div>
        <footersV2 type="" mktBannerYN='Y' />
    </div>
    <!-- </page> -->
</template>

<script>
// import Page from '@/views/layout/Page.vue'
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
// import MAMA1007 from '@/views/page/MA/MA/MAMA1007/MAMA1007'   // 자산 내역 화면
import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'   // 자산 연결 화면
import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'   // 자산 연결 화면
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'   // 연결 기관 선택 화면

// import MAMA2001 from '@/views/page/MA/MA/MAMA2001/MAMA2001'   // 자산 영역 슬라이트 화면
// import MAMA1002 from '@/views/page/MA/MA/MAMA1002/MAMA1002'   // 지출 영역 슬라이트 화면
// import MAMA1003 from '@/views/page/MA/MA/MAMA1003/MAMA1003'   // 금융생활 영역 슬라이트 화면
// import MAMA1004 from '@/views/page/MA/MA/MAMA1004/MAMA1004'   // 제휴서비스 영역 슬라이트 화면

import ASCR4101 from '@/views/page/AS/CR/ASCR4101/ASCR4101'   // 신용정보
import ASAC1003 from '@/views/page/AS/AC/ASAC1003/ASAC1003'   // 계좌잔액예측 리포트
import ASIP2010 from '@/views/page/AS/IP/ASIP2010/ASIP2010'   // 금융스타일

import PDMY4005 from '@/views/page/PD/MY/PDMY4005/PDMY4005'   // 목표등록 메인
// import PDMY4033 from '@/views/page/PD/MY/PDMY4033/PDMY4033'   // 지출목표 상세
// import PDMY2039 from '@/views/page/PD/MY/PDMY2039/PDMY2039'   // 돈모으기 상세
// import PDMY2041 from '@/views/page/PD/MY/PDMY2041/PDMY2041'   // 투자목표 상세
// import PDMY2029 from '@/views/page/PD/MY/PDMY2029/PDMY2029'   // 내집마련 상세
// import PDMY2030 from '@/views/page/PD/MY/PDMY2030/PDMY2030'   // 내차사기 상세
// import PDMY2031 from '@/views/page/PD/MY/PDMY2031/PDMY2031'   // 여행목표 상세
// import PDMY2026 from '@/views/page/PD/MY/PDMY2026/PDMY2026'   // 여가생활 상세
// import PDMY2027 from '@/views/page/PD/MY/PDMY2027/PDMY2027'   // 자기계발 상세
// import PDMY2028 from '@/views/page/PD/MY/PDMY2028/PDMY2028'   // 반려동물 상세

import PDPD1107 from '@/views/page/PD/PD/PDPD1107/PDPD1107'   // 대출한도조회

import COCA2101 from '@/views/page/CO/CA/COCA2101/COCA2101'   // 자산등록(자동차)
import CORE4201 from '@/views/page/CO/RE/CORE4201/CORE4201'   // 자산등록(부동산)
// import LCIP2007 from '@/components/category/LCIP2007'   // 정기지출 리포트
import LCIP2007 from '@/views/page/LC/IP/LCIP2007/LCIP2007'   // 정기지출 리포트

import MAMA4002 from '@/views/page/MA/MA/MAMA4002/MAMA4002'   // 미존재 자산연결 팝업
import PDRT2009 from '@/views/page/PD/RT/PDRT2009/PDRT2009' // 은퇴준비 진단 추가(20230711)
import MAMA4004 from '@/views/page/MA/MA/MAMA4004/MAMA4004'
import MREV4001 from '@/views/page/MR/EV/MREV4001/MREV4001' // 오픈 이벤트 슬라이드 팝업
import STCK2001 from '@/views/page/MR/ST/STCK2001/STCK2001' // 시스템 점검 슬라이드 팝업

import MREV2010 from '@/views/page/MR/EV/MREV2010/MREV2010' // 일반이벤트 상세팝업(신규가입)
import MREV2011 from '@/views/page/MR/EV/MREV2011/MREV2011' // 일반이벤트 상세팝업(추석소원빌기)
import MREV2030 from '@/views/page/MR/EV/MREV2030/MREV2030' // 퀴즈이벤트 상세팝업(콕마이데이터)
// import MRAM2001 from '@/views/page/MR/AM/MRAM2001/MRAM2001'
import moment from 'moment'

import _ from 'lodash'

export default {
    name : "MAMA2001",
    data : () =>{
        return {
            currentDate   : new Date(), //금일
            addAssetYn    : "", // 자산등록 호출여부
            cusnm         : "", // 고객명
            currYm        : dateFormat(new Date(), "YYYYMM"), //현재년월
            currMm        : dateFormat(new Date(), "M"), //현재월
			anwAncYn      : "", // 새 알림 여부
            tabs          : [], // 상단 탭
            banners       : [], // 하단 배너

            // 자산
            respInfo: null, // 자산정보
            totAsetAm : 0, // 총자산금액

            psnCrdevlScrVal       : "",	 //신용점수
            crdevlUpAcmCsttRtoVal : "",  //신용등급
            popCORE4201Cnt        : 0,   //부동산 등록 카운트
            isDebugLog            : false,

            //////// 연결자산 관련 데이터
            userAsetList    : [], // 개인신용정보전송요구내역
            /* 은행 */
            bankList        : [], // 은행업권 데이터
            bankExprList    : [], // 은행업권 만료 데이터
            /* 카드 */
            cardList        : [], // 카드업권 데이터
            cardExprList    : [], // 카드업권 만료 데이터
            /* 증권 */
            investList      : [], // 금융투자업권 데이터
            investExprList  : [], // 금융투자업권 만료 데이터
            /* 보험 */
            insuList        : [], // 보험업권 데이터
            insuExprList    : [], // 보험업권 만료 데이터
            ginsuList       : [], // 보증보험업권 데이터
            ginsuExprList   : [], // 보증보험업권 만료 데이터
            /* 페이 */
            efinList        : [], // 전자금융업권 데이터
            efinExprList    : [], // 전자금융업권 만료 데이터
            /* 할부금융 */
            capitalList     : [], // 할부금융업권 데이터
            capitalExprList : [], // 할부금융업권 만료 데이터
            /* 기타금융 */
            telecomList     : [], // 통신업권 데이터
            telecomExprList : [], // 통신업권 만료 데이터
            usuryList       : [], // 대부 정보 데이터
            usuryExprList   : [], // 대부 정보 만료 데이터
            bondList        : [], // 인수채권 정보 데이터
            bondExprList    : [], // 인수채권 정보 만료 데이터
            p2pList         : [], // P2P 대출정보 데이터
            p2pExprList     : [], // P2P 대출정보 만료 데이터
            publicList      : [], // Public 대출정보 데이터
            publicExprList  : [], // Public 대출정보 만료 데이터
            // orgExprCnt      : 0,    // 만료된 기관 개수
            // orgPrdCnt       : 0,    // 만료 예정 기관 개수
            
            cardPayDate: '', // 카드결제 예정일
            cardPayDateList: [], // 카드결제 예정일 목록
            infOfrmnOrgC: '', // 정보제공자기관코드

            astIndSum     : 0,   // 자산증감합계

            // isConnectedAssetDigs: false, // 건강보험공단 연결 여부

            dbtSumAm: 0 , // 부채금액

            myInfoList         : null,
            expenseList        : [], // 지출목표목록
            tempExpenseList    : [], // 지출목표목록(임시)
            financialList      : [], // 금융목표, 버킷리스트
            preXpsAm           : 0,  // 현재지출금액
            xpsAm              : 0,
            ctgrPreXpsTotAm    : 0,  // 카테고리현재총지출금액

            ttAmnt: [], // 결제 예정인 돈
            ttCdLnBac: [], // 결제 예정인 대출 잔액                
            cardOut: [], // 이번달 결제예정금액
            cardLoanOut: [], // 남은 결제예정금액
            expeOut: [], // 청구내역
            claimOut: [], // 이번달 카드별 이용내역

            myFnaDgnArray: [], // 나의 재무 진단 도넛그래프 목록
            prdStyCdNm: '', // 금융자산 유형 1
            finStyCdNm: '', // 금융자산 유형 2

            editList: [], // 자산편집 목록

            indDbtTotAm: 0,// 부채 증감액
            indAsetFnAcSum: 0, // 증감금융자산금액
            indAsetRlthRlestAm: 0, // 증감실물자산부동산금액
            indAetRlthCarAm: 0, // 증감실물자산자동차금액
            indAsetEtcAmSum: 0, // 증감기타자산금액합계
            xpsInfo: {}, // 지출 정보
            isOpenList: false,

            nextPop : '',     //호출 팝업명
            screen : '',

            // V4
            finalUpdateDtm : ''
        }
    },
    computed : {
        ...mapGetters('layout', [
			'isMainPage','isAlreadyOpenMainPage'
        ]),
        ...mapGetters('myassets', [
            'isMyAssetGathering','lastUpdateDtm','myAssetsBzRgCnt','myAssetInfo'
        ]),
        ...mapGetters('user', [
            'isSBank'			// 스뱅, 콕뱅 여부 
          , 'userInfo'
        ]),

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
        // 월말일인지 확인
        isEndDate(){
            const curDate = new Date();
            curDate.setDate(curDate.getDate() + 1)
            return this.currentDate.getMonth() !== curDate.getMonth()
        },
        // 금융자산
        assetList() {
            let resultList = []
            
            let asetRlthRlestAm = 0
            let asetRlthCarAm = 0
            let asetEtcAmSum = 0

            let rlest = this.editList.find(el => el.asetAmnDsc === '03' && el.totYn === '1') //부동산
            if (rlest) asetRlthRlestAm = this.respInfo?.myAssetInfo?.asetRlthRlestAm
            let car = this.editList.find(el => el.asetAmnDsc === '04' && el.totYn === '1') //자동차
            if (car) asetRlthCarAm = this.respInfo?.myAssetInfo?.asetRlthCarAm
            let etc = this.editList.filter(el =>  ['02','05','06'].includes(el.asetAmnDsc) && el.totYn === '1') //기타
            if (etc.length > 2) asetEtcAmSum = this.respInfo?.myAssetInfo?.asetEtcAmSum

            // ## 금융자산 = 에금 + 투자 + 연금 + 페이/포인트
			// 예금 (입출금, 예금, 적금, 외화)
			// 투자 (증권, 펀드, 신탁, ISA)
			// 연금 (국민연금, 퇴직연금(DC형, IRP), 개인연금(연금저축(펀드/신탁), 연금보험))
			// 페이/포인트 (페이머니, 선불카드, 금융포인트)
            let finAssetTotAm = this.respInfo?.myAssetInfo?.asetFnAmSum || 0
            
            // ## 실물자산 = 부동산 + 자동차
			// [부동산 자산 기준]
			// [자동차 자산 기준] 현 내차 시세
            let realAssetTotAm = asetRlthCarAm + asetRlthRlestAm

            // ## 기타자산 = 현금 + 외화 + 금 + 기타 + 농기계
            // 기타
            let etcTotAm = asetEtcAmSum || 0
            
            let totalAm =  finAssetTotAm + realAssetTotAm + etcTotAm

            let finAssetPer = finAssetTotAm ? Math.round(finAssetTotAm / (totalAm) * 1000) / 10 : 0
            let realAssetPer = realAssetTotAm ? Math.round(realAssetTotAm / (totalAm) * 1000) / 10 : 0
            let etcAssetPer = etcTotAm ? Math.round(etcTotAm / (totalAm) * 1000) / 10 : 0
            // console.log('finAssetPer ### ', finAssetPer)
            // console.log('realAssetPer ### ', realAssetPer)
            // console.log('etcAssetPer ### ', etcAssetPer)
            // let floFinAssetPer = finAssetPer - Math.floor(finAssetPer)
            // let floRealAssetPer = realAssetPer - Math.floor(realAssetPer)
            // let floEtcAssetPer = etcAssetPer - Math.floor(etcAssetPer)

            // let checkTotPer = finAssetPer + realAssetPer + etcAssetPer
            // console.log('checkTotPer $$$$$ ', checkTotPer)
            // if (checkTotPer > 100) {
            //     let target = [floRealAssetPer, floEtcAssetPer].reduce((acc, cur, index) => {
            //         console.log('Over cur', cur)
            //         return acc.value < cur ? acc : {value: cur, index}
            //     }, floFinAssetPer)
            //     console.log('target', target)
            //     if (target.index === 1) floFinAssetPer - 0.1
            //     else if (target.index === 2) floRealAssetPer - 0.1
            //     else if (target.index === 3) floEtcAssetPer - 0.1
            // } else if (checkTotPer < 100) {
            //     let target = [floRealAssetPer, floEtcAssetPer].reduce((acc, cur, index) => {
            //         console.log('Over cur', cur)
            //         return acc.value > cur ? acc : {value: cur, index}
            //     }, floFinAssetPer)
            //     console.log('target', target)
            //     if (target.index === 1) floFinAssetPer + 0.1
            //     else if (target.index === 2) floRealAssetPer + 0.1
            //     else if (target.index === 3) floEtcAssetPer + 0.1
            // }

            // 정렬
            resultList.push(
            {
                name:'금융자산', class:'fin', per:finAssetPer.toFixed(1), amSum: finAssetTotAm,
            },{ 
                name:'실물자산', class:'real', per:realAssetPer.toFixed(1), amSum: realAssetTotAm,
            },{
                name:'기타자산', class:'etc', per:etcAssetPer.toFixed(1), amSum: etcTotAm,
            })
            return resultList.sort((a,b) => b.amSum-a.amSum)
        },
        
        // 다가올 카드 결제일
        closeCardPayDate() {
            console.log('this.cardPayDateList.length > 0', this.cardPayDateList.length > 0)
            if(this.cardPayDateList.length > 0) {
                return this.cardPayDateList.find(el => {
                    let now = new Date()
                    let tomrw = dateFormat(new Date(now.setDate(now.getDate() + 1)), 'YYYYMMDD')
                    console.log('tomrw', tomrw, el === tomrw)
                    return el === tomrw
                })
            }else {
                return false
            }
        },
        cbtType(){
            return this.getUserInfo('tobeType')
        },
        // 소비스타일
        xpsStyle () {
            return this.xpsInfo?.xpsStyle || {
                weekTimeTypC:"",
                weekTimeTypNM:"",
                xpsCtgrC:"",
                xpsCtgrNm:"",
                xpsOnOffC:"",
                xpsOnOffNm:"",
                xpsRsnC:"",
                xpsRsnNm:"",
            }
        },
        // 고객월별지출 정보
        cusMmtpXpsOut() {
            let now = new Date()
            let month0 = now.getMonth() + 1
            let month1 = now.getMonth(now.setMonth(now.getMonth() - 1)) + 1
            let month2 = now.getMonth(now.setMonth(now.getMonth() - 1)) + 1
            let month3 = now.getMonth(now.setMonth(now.getMonth() - 1)) + 1
            let month4 = now.getMonth(now.setMonth(now.getMonth() - 1)) + 1
            let month5 = now.getMonth(now.setMonth(now.getMonth() - 1)) + 1
            return this.xpsInfo?.cusMmtpXpsOut || {
                bmYm0:month0 ,
                bmYm1:month1 ,
                bmYm2:month2 ,
                bmYm3:month3 ,
                bmYm4:month4 ,
                bmYm5:month5 ,
                bmmCmprXpsAm:0 ,
                xps3mAvgAm:0 ,
                xps3mAvgRto:50 ,
                xpsAm0:0 ,
                xpsAm1:0 ,
                xpsAm2:0 ,
                xpsAm3:0 ,
                xpsAm4:0 ,
                xpsAm5:0 ,
                xpsRto0:0 ,
                xpsRto1:0 ,
                xpsRto2:0 ,
                xpsRto3:0 ,
                xpsRto4:0 ,
                xpsRto5:0 ,
            }
        },
        // 다가올 정기지출 목록
        fxtmList() {
            return this.xpsInfo?.fxtmList || []
        },
        // 건강보험공단 연결 여부
        isConnectedAssetDigs () {
            return true
            //return !!this.publicList.find(el => el.infOfrmnOrgC === 'PBAAVN0000')
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

    },
    watch: {
        isMyAssetGathering (value) {
            if(!value) this.fn_getMainData('2')
        },
        nextPop (value) {
            if(value == 'fix'){
                this.openCheckSystem() // 서비스 점검
            }else if(value == 'event'){
                this.fn_getEventData('1', 'slide') // 이벤트 정보 조회
            }else if(value == 'asset'){
                if(this.orgConCnt < 1) {
                        
                    //최초 사용자의 경우 자동 자산연결 기능이 존재하기 때문에 제외 사용자 전송요구리스트 조회
                    // if( this.addAssetYn !== "Y" && commonService.getStorage('noSeeAssets' + this.getUserInfo('chnl')) !== 'Y' ) {
                    if(commonService.getStorage('noSeeAssets' + this.getUserInfo('chnl')) !== 'Y' ) {
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
        $('body').css('background','#f2f4f6')
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

        //url param(screen)이 팝업페이지로 들어왔을경우
        this.screen = this.userInfo.screen
        if(this.userInfo.screen == 'ASCR4101'){     //신용정보 팝업
            const config = {
                component: ASCR4101,
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

            this.cusnm = this.getUserInfo("cusnm")
            // this.currYm = dateFormat(new Date(), "YYYYMM")  //현재년월
            // this.currMm = dateFormat(new Date(), "M")   //현재월 10월이전 1자리, 10월부턴 2자리

            this.fn_newAlarm()  //신규알림여부

            // 메인 데이터 조회
            this.getData()

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
        getData(mainFlag) {
            if(mainFlag === '' || mainFlag === undefined || mainFlag === null){
                mainFlag = '1'
			}
            Promise.all([
                this.fn_getMainData(mainFlag), // 전체 메인 정보 조회
                this.fn_getForeExprList(), // 자산연결 정보 조회
                this.fn_getCardPayInfo(), // 카드결제 예정 정보 조회 - 2023.07.19 by CS533461
                this.fn_getFinStyData(), // 나의 금융자산 유형 조회
                this.fn_getMyFnaDgsRzt(), // 재무 평가 조회
                this.fn_getGoalData(),  // 나의목표 조회
                this.fn_getXpsData(), // 지출 정보 조회
            ])
            
        },
        fn_getMainData(mainFlag) {
            const config = {
                // url: '/ma/ma/01ra1', // 인터페이스ID: IF-MOB-PFM-MAA01, 서비스코드: PFMMAMA01RA1
                url: '/ma/ma/01r02',
                data: {
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                    "basYm" : this.currYm,
                    "mainFlag" : mainFlag
                },
                // flag : 'main',
                disableLoading : true,
            }
            apiService.call(config).then(response =>{
                console.log('PFM Main API response done')
                this.respInfo = response

				this.rcnInqDtm             = this.respInfo.rcnInqDtm || ''    //최근조회일시
				
                this.totAsetAm             = Math.floor(this.respInfo?.totAsetAm || 0)	//총자산금액

                // 자산 증감 계산 start ############################################################
                this.indDbtTotAm = this.respInfo?.myAssetInfo?.indDbtTotAm || 0 // 부채 증감액
                this.indAsetFnAcSum = this.respInfo?.myAssetInfo?.indAsetFnAcSum || 0 // 증감금융자산금액
                this.indAsetRlthRlestAm = this.respInfo?.myAssetInfo?.indAsetRlthRlestAm || 0 // 증감실물자산부동산금액
                this.indAetRlthCarAm = this.respInfo?.myAssetInfo?.indAetRlthCarAm || 0 // 증감실물자산자동차금액
                this.indAsetEtcAmSum = this.respInfo?.myAssetInfo?.indAsetEtcAmSum || 0 // 증감기타자산금액합계
                
                this.astIndSum = 0
                this.astIndSum += this.indAsetFnAcSum
                this.editList = this.respInfo?.assetAmnIOList || [] // 자산편집 정보(부채:01, 현금:02, 부동산:03, 자동차:04, 금:05, 기타:06)
                let dbt = this.editList.find(el => el.asetAmnDsc === '01' && el.totYn === '1') //부채
                if (dbt) this.astIndSum -= this.indDbtTotAm
                let rlest = this.editList.find(el => el.asetAmnDsc === '03' && el.totYn === '1') //부동산
                if (rlest) this.astIndSum += this.indAsetRlthRlestAm
                let car = this.editList.find(el => el.asetAmnDsc === '04' && el.totYn === '1') //자동차
                if (car) this.astIndSum += this.indAetRlthCarAm
                let etc = this.editList.filter(el =>  ['02','05','06'].includes(el.asetAmnDsc) && el.totYn === '1') //자동차
                if (etc.length > 2) this.astIndSum += this.indAsetEtcAmSum
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
                    amountCountAnimate("totAsetAm", this.totAsetAm)
                    // 지출 차트 생성
                    // this.createChart(this.cusMmtpXpsOut)
                })
            })
        },
        fn_getXpsData() {
            // 지출 정보 조회
            // 나의목표 정보 조회
            const config = {
                url: '/lc/ip/01r03',  // 'pd/my/01ra2',
                data: {
                    mydtCusno: this.getUserInfo('mydtCusno'), // 마이데이터고객번호
                    basDt : dateFormat(new Date(), "YYYYMMDD") // 기준일자
                },
                disableLoading : true,
            };

            apiService.call(config).then(response => {
                console.log('response', response)
                this.xpsInfo = response
                this.createChart(this.cusMmtpXpsOut)
            })
        },
        fn_getGoalData() {
            // 나의목표 정보 조회
            const config = {
                url: '/pd/my/01r02',  // 'pd/my/01ra2',
                data: {
                        "mydtCusno": this.getUserInfo('mydtCusno') // 마이데이터고객번호
                        ,"prgStsCd" : '1'                // 진행상태코드
                        },
                disableLoading : true,
            };

            apiService.call(config).then(response => {
                $('.slider.slideBox').slick('unslick')
                this.financialList = []
                this.myInfoList = response

                // 지출목표는 당월 between stYm and edYm이 사이에 존재하는지 확인하고 화면처리
                this.tempExpenseList = this.myInfoList.expenseList || []
                if(this.tempExpenseList != null) {
                    if(this.tempExpenseList.length > 0) {
                        for(let i=0; i<this.tempExpenseList.length; i++) {
                            if(Number(this.currYm) >= Number(this.tempExpenseList[i].stYm)) {
                                let inputObj = this.tempExpenseList[i];

                                this.expenseList.push(inputObj)
                            }
                        }
                    }
                }
                this.preXpsAm        = this.myInfoList.preXpsAm
                this.xpsAm        = this.preXpsAm
                this.ctgrPreXpsTotAm = this.myInfoList.ctgrPreXpsTotAm
                this.financialList   = this.myInfoList.financialList || []

                // 지출목표 per width
                let widthCal = 0
                if(this.expenseList.length > 0) {
                    let today = new Date
                    this.expenseList[0].month = today.getMonth()+1;

                    if(typeof this.xpsAm == "undefined" || this.xpsAm == 0) {
                        this.expenseList[0].obtRate = 0
                    } else {
                        widthCal = round((this.xpsAm / this.expenseList[0].xpsObtAm) * 100, 1)
                        this.expenseList[0].obtRate = widthCal < 0 ? 0 : widthCal
                    }
                    // 지출목표 존재시 목표 건수 증가
                    this.goalCnt++
                }

                // 목표달성 List
                if(this.financialList.length > 0) {
                    let tmpFinList = [];
                    let obtRate    = 0;
                    for(let i=0; i<this.financialList.length; i++) {
                        if(this.financialList[i].bankListCnt > 0) {
                            // 목표달성률
                            if(typeof this.financialList[i].acNowBacTotAm == "undefined" ||this.financialList[i]. acNowBacTotAm == 0) {
                                obtRate = 0
                            } else {
                                obtRate = round((this.financialList[i].acNowBacTotAm / this.financialList[i].fncObtAm) * 100, 1)
                                if(obtRate >= 100) {
                                    obtRate = 100
                                } else if (obtRate < 0) {
                                    obtRate = 0
                                } 
                            }
                            this.financialList[i].obtRate = obtRate;
                            let setObj = this.setHtmlData(this.financialList[i])
                            this.financialList[i].tit       = setObj.tit
                            this.financialList[i].subTit    = setObj.subTit
                            this.financialList[i].divColor  = setObj.divColor
                            this.financialList[i].titClass  = setObj.titClass
                            this.financialList[i].dday      = setObj.dday
                            this.financialList[i].img       = setObj.img
                            this.financialList[i].imgAlt    = setObj.imgAlt
                            this.financialList[i].imgStyle  = setObj.imgStyle
                            tmpFinList.push(this.financialList[i]);
                            this.goalCnt++;  // 금융목표 총건수
                            
                        }
                    }
                    // 노출 순서 : 최근 등록한 지출목표 > 금융목표 > 버킷리스트 순으로 노출 (00, 01: 금융목표)
                    this.financialList = tmpFinList.sort((a,b)=>a.fncObtDsc - b.fncObtDsc);
                    // this.$nextTick(() => {
                        setTimeout(() => {
                            this.fn_goalSlide()
                            this.drawProgressbar()
                        }, 100)
                    // })
                }
            });
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
                            renderer : {component : MREV4001}
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
        //도전 목표 슬라이드
        fn_goalSlide() {
            $('.slider.slideBox').slick({
                speed : 500,
                dots : true,
                arrows : true, //11.14 접근성 이슈로 버튼 추가 추후 false로 수정
				prevArrow:"<button class='slick-prev slick-arrow' type='button'>이전</button>",
				nextArrow:"<button class='slick-next slick-arrow' type='button'>다음</button>",
                infinite:false,
                customPaging:function(slider,i){
                    return '<em><i>'+ (i+1) +'</i>/'+slider.$slides.length+'</em><span class="blind">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</span>';
                }
            });
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

            // let compName = PDMY4033

            let asetAmnCtgrId = this.expenseList[0].asetAmnCtgrId || ''
            let flag

            // 카테고리 미선택시
            if(asetAmnCtgrId == '' || asetAmnCtgrId == null) {
                flag = '1'
            } else {
                flag = '2'
            }

            let param = {type:'update', stYm:stYm, modifyYn:"Y", preXpsAm: this.xpsAm, flag : flag}

            this.fn_movePage('PDMY4001', param)
        },
        // 금융목표 상세이동
        goalDetailMove(fncObtDsc, sqno, prgStsCd, carGrdNo, carCtrimNo, basyy, basmm) {

            let param = {type:'update', "fncObtDsc":fncObtDsc, "sqno": sqno, "prgStsCd":prgStsCd, "carGrdNo":carGrdNo, "carCtrimNo":carCtrimNo, "basyy":basyy, "basmm":basmm}
            this.fn_movePage('PDMY4001', param)
            
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
            if (pageId == 'ANCA4201') {
                // if 내차관리 else 신차중고차
                if (param) {
                    params = { viewSvc: 'CARCARE', vhcnoVal: param }
                } else {
                    params = { viewSvc: 'CARDEAL', vhcnoVal: '' }
                }
            } else {
                params = param
            }
            //
            // if (pageId == 'MRAM2001') {
            //     params = {}
            // }

            // 연금진단: PDRT4001
            // 상품추천: PDPD4001
            // 신용점수: ASCR4101
            // 세금현황: PDTX2004
            // 콕부동산: ANRE4201
            // 콕마이카: ANCA4201
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

            // 알림함
            if (pageId === "COCO1101") {
                compName = COCO1101
            }

            // 알림함 (tobe)
            if (pageId === "MRCO1001") {
                compName = MRCO1001
            }

            // 신용정보
            if (pageId === "ASCR4101") {
                compName = ASCR4101
            }

            // 목표등록
            if (pageId === 'PDMY4005') {
                compName = PDMY4005
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
            if (pageId === "CORE4201") {
                compName = CORE4201
                popParams = {
                    isUpt : false,              // 등록
                    popId : 'ANRE4201',         // 자산완료화면에서 추가 등록 시 팝업 다시 열기 위함
                    isTitleHide : false         // 부동산 등록 시 아파트/직접입력 타이틀 hide 여부(true:숨김, false:보임)
                }
            }

            if (pageId === "COAR2001") {
                compName = COAR2001
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

            if (pageId === 'MAMA4004') {
                compName = MAMA4004
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
                // 알림 확인
                if (response === "COCO1101" && pageId === "COCO1101") {
                    this.fn_newAlarm()
                }

                if (response === "MRCO1001" && pageId === "MRCO1001") {
                    this.fn_newAlarm()
                }
                
                if(pageId === "PDMY4005" || pageId === "PDMY4033") {
                    console.log('PDMY4005 return response', response)
                    // this.fn_refreshApiCall()
                    if (response === 'reSelect') {
                        this.fn_getGoalData()
                    }
                }
                
                // 자동차 등록 완료 시
                if(pageId == "COCA2101") {
                    if (response.uptCom == true) {
                        this.fn_refreshApiCall()
                    }
                }

                // 화면 설정 후
                if(pageId == "MAMA4004") {
                    console.log('response.isSave ::: ', response?.isSave)
                    if (response?.isSave) {
                        this.banners = []
                        // $('.subSvcBannerArea').slick('unslick')
                        setTimeout(() => this.fn_setCompSortInfo(), 10)
                    }
                }
                
                // 부동산 등록 완료 시
                if(pageId === "CORE4201") {
                    if (response == 'refresh' || response.uptCom == true || this.popCORE4201Cnt > 0) {
                        this.popCORE4201Cnt = 0
                        this.fn_refreshApiCall()
                    } else if(response == 'ANRE4201') {
                        this.popCORE4201Cnt++
                        this.fn_moveOpenPage('CORE4201')
                    }
                }
            })
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
        /*
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
        /*
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
                        component : MAMA4002 //자산연결안내팝업
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
        fn_getForeExprList() {
            // 개인신용정보 전송요구내역 조회
            const config_con = {
                url : "/co/am/08r02", // "/co/am/05rb2", "/co/am/05ra1",
                data : {
                    "mydtCusno" : this.getUserInfo('mydtCusno')
                    // "mydtCusno" : "2000000842"
                    // "mydtCusno" : "2000002900"   // 민도울
                },
                disableLoading : true,
            }
            apiService.call(config_con).then(response => {
                this.userAsetList = response.bzrgList || []
                console.log("개인신용정보 데이터 확인(response) :: ", response)
                console.log("개인신용정보 데이터 확인(this.userAsetList) :: ", this.userAsetList)
                this.modifyTxt = "연결 변경"
                this.disconTxt = "연결 해제"

                // this.userAsetList[0].orgList[0].tmsEdDt = "20220901"
                // this.userAsetList[0].orgList[2].tmsEdDt = "20220829"

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

                // 카드업권
                let tmpCardList 	= (typeof _.find(this.userAsetList, {"comnCVal":"card"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"card"}).orgList : []
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
        // 카드 결제예정정보 데이터
        fn_getCardPayInfo() {
            // 카드 정보 목록
            const config1 = {
                url: '/as/cd/01r01',
                data: {
                    mydtCusno : this.getUserInfo('mydtCusno'),     // 자산관리고객번호 2000675950
                },
                disableLoading : true,
            }

            apiService.syncCall(config1).then(response => {
                this.ttAmnt      = response.ttAmnt || 0             // 결제 예정인 돈
                this.ttCdLnBac   = response.ttCdLnBac || 0          // 결제 예정인 대출 잔액                
                this.cardOut     = response.cardOut || []           // 이번달 결제예정금액
                this.cardLoanOut = response.cardLoanOut || []       // 남은 결제예정금액
                this.expeOut     = response.expeOut || []           // 청구내역
                this.claimOut    = response.claimOut || []          // 이번달 카드별 이용내역
                this.cardOut.forEach((cur) => {
                    if (cur.stlPlaDt) {
                        this.cardPayDateList.push(cur.stlPlaDt)
                    }
                })
            })
        },
        fn_setCompSortInfo() {
            // 상단 탭 영역 정보
            
            this.tabs = commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'tabsV2')
            if(!this.tabs || !this.tabs.length || this.tabs.length === 0 || this.tabs.length > 3) {
                // 최초 접속하는 경우 기본 값으로 설정 처리
                this.tabs = [ {id:'as', name:"자산", hidden:'N'}, {id:'lc', name:"지출", hidden:'N'}, {id:'tg', name:"목표", hidden:'N'} ]
                commonService.setStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'tabsV2', this.tabs)
            }

            // 하단 배너 영역 정보
            this.banners = commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'bannersV2')
            if(!this.banners || !this.banners.length || this.banners.length === 0) {
                // 최초 접속하는 경우 기본 값으로 설정 처리
                this.banners = [
                    {id:'rt', name: '연금진단', desc: '매월 내 연금은?', hidden: 'N', class: 'pens', pageId: 'PDRT4001', type: 'page'},
                    {id:'pd', name: '상품추천', desc: '맞춤 금융상품', hidden: 'N', class: 'prod', pageId: 'PDPD4001', type: 'page'},
                    {id:'cr', name: '신용점수', desc: '더 높일 수 있어요', hidden: 'N', class: 'cred', pageId: 'ASCR4101', type: 'popup'},
                    {id:'tx', name: '세금현황', desc: '꼼꼼한 세금 관리', hidden: 'N', class: 'tax', pageId: 'PDTX2004', type: 'page'},
                    {id:'re', name: '콕부동산', desc: '우리집 시세는 얼마?', hidden: 'N', class: 'cok', pageId: 'ANRE4201', type: 'page'},
                    {id:'ca', name: '콕마이카', desc: '종합 자동차관리', hidden: 'N', class: 'car', pageId: 'ANCA4201', type: 'page'},
                ]
                commonService.setStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'bannersV2', this.banners)
            }
            
            // setTimeout(() => {
            //     this.initSlide()
            // }, 10)
        },
        fn_getFinStyData() {
            // 나의 금융 평가 조회
            const config = {
                url: '/as/ip/10r01',
                data: {
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                    "basYmd"    : dateFormat(new Date(), "YYYYMMDD")
                },
                disableLoading : true,
            }

            apiService.call(config).then((response) =>{
                if(!response?.finStyCd || !response?.prdStyCd) {
                    return
                }

                if(response.finStyCd=="FS01"){
                    this.finStyCdNm = "금융새내기"
                }else if(response.finStyCd=='FS02'){
                    this.finStyCdNm = "현금중심"
                }else if(response.finStyCd=='FS03'){
                    this.finStyCdNm = "지출과다"
                }else if(response.finStyCd=='FS04'){
                    this.finStyCdNm = "부채과다 "
                }else if(response.finStyCd=='FS05'){
                    this.finStyCdNm = "부채위험"
                }else if(response.finStyCd=='FS06'){
                    this.finStyCdNm = "보장준비"
                }else if(response.finStyCd=='FS07'){
                    this.finStyCdNm = "노후준비"
                }else if(response.finStyCd=='FS08'){
                    this.finStyCdNm = "금융전문가"
                }

                if(response.prdStyCd=="PS01"){
                    this.prdStyCdNm = "분산관리성향이 강한"
                }else if(response.prdStyCd=='PS02'){
                    this.prdStyCdNm = "투자성향이 강한"
                }else if(response.prdStyCd=='PS03'){
                    this.prdStyCdNm = "저축성향이 강한"
                }

                
            });
        },

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
                this.myFnaDgnArray = []
                if (!response) return
                let MyFnaDgsList = [
                    {
                        dgnRzt: response.dbtAmnDgnRzt,
                        ixSatC: response.dbtAmnIxSatC,
                        cd: 'dbtAmn',
                        category: '부채',
                    },{
                        dgnRzt: response.futRsvDgnRzt,
                        ixSatC: response.futRsvIxSatC,
                        cd: 'futRsv',
                        category: '미래',
                    },{
                        dgnRzt: response.hseFnaDgnRzt,
                        ixSatC: response.hseFnaIxSatC,
                        cd: 'hseFna',
                        category: '가계',
                    }
                ]
                let cdArr = ['hseFna','futRsv','dbtAmn']
                cdArr.forEach((key) => {
                    let foundEl = MyFnaDgsList.find(el => el.cd === key)
                    if (foundEl) {
                        this.myFnaDgnArray.push(foundEl)
                    }
                })
            });
        },
        setHtmlData(obj) {
            let rtnObj = {}
            if(obj.fncObtDsc === '01') {
                rtnObj.tit       = "돈모으기"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.dday      = dday
                rtnObj.img       = "expTar"
            } else if(obj.fncObtDsc === '02') {
                rtnObj.tit       = "투자목표"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.dday      = dday
                rtnObj.img       = "expTar"
            } else if(obj.fncObtDsc === '03') {
                rtnObj.tit       = "내집마련"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.titClass  = dday === '실패' ? 'gray_badge' : 'mint_badge'
                rtnObj.dday      = dday
                rtnObj.img       = "house"
            } else if(obj.fncObtDsc === '04') {
                rtnObj.tit       = "여행목표"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.titClass  = dday === '실패' ? 'gray_badge' : 'green_badge'
                rtnObj.dday      = dday
                rtnObj.img       = "travel"
            } else if(obj.fncObtDsc === '05') {
                rtnObj.tit       = "내차사기"
                rtnObj.divColor  = "orange"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.dday      = dday
                rtnObj.img       = "car"
            } else if(obj.fncObtDsc === '06') {
                rtnObj.tit       = "여가생활"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.titClass  = dday === '실패' ? 'gray_badge' : 'blue_badge'
                rtnObj.dday      = dday
                if(obj.cstRkonDsc1 == '1000') {
                    rtnObj.img       = "sports"
                } else if(obj.cstRkonDsc1 == '2000') {
                    rtnObj.img       = "art"
                } else if(obj.cstRkonDsc1 == '3000') {
                    rtnObj.img       = "performance"
                }
            } else if(obj.fncObtDsc === '07') {
                rtnObj.tit       = "자기계발"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.dday      = dday
                if(obj.cstRkonDsc1 == '100') {
                    rtnObj.img       = "language"
                } else if(obj.cstRkonDsc1 == '200') {
                    rtnObj.img       = "certificate"
                } else if(obj.cstRkonDsc1 == '300') {
                    rtnObj.img       = "hobby"
                }
            } else if(obj.fncObtDsc === '08') {
                rtnObj.tit       = "반려동물"
                let dday = this.setDday(obj.obtDt, obj.fncObtAchvYn)
                rtnObj.dday      = dday
                if(obj.cstRkonDsc1 == '100') {
                    rtnObj.img       = "dog"
                } else if(obj.cstRkonDsc1 == '200') {
                    rtnObj.img       = "cat"
                } else if(obj.cstRkonDsc1 == '300') {
                    rtnObj.img       = "fish"
                } else if(obj.cstRkonDsc1 == '400') {
                    rtnObj.img       = "reptiles"
                }
            }
            return rtnObj
        },
        clickBanner(item) {
            console.log('clickBanner ### ', item)
            if (item.type === 'page') this.fn_movePage(item.pageId)
            else this.fn_moveOpenPage(item.pageId)
        },
        createChart(cusMmtpXpsOut) {
            rMateChartH5.create("mainChart1", "chartMainHolder", "useContextMenu=false", "100%", "170px");
            var layoutStr =
			'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
				+'<Stroke id="stroke1" color="#999" weight="2"/>'
				+'<Options>'
//					+'<Caption text="Global Temperature"/>'
//					+'<Legend />'
				+'</Options>'
				+'<NumberFormatter id="nft" precision="2"/>'
				+'<Area2DChart gutterLeft="0" showDataTips="false" dataTipDisplayMode="axis" styleName="valueLabelStyle">'
					+'<horizontalAxis>'
						+'<CategoryAxis id="hAxis" categoryField="Mon" padding="0.2"/>'
					+'</horizontalAxis>'
					+'<verticalAxis>'
						+'<LinearAxis id="vAxis" title=""/>'
					+'</verticalAxis>'
					+'<verticalAxisRenderers>'
						+'<Axis3DRenderer axis="{vAxis}" visible="false"/>'/* Y축 레이블을 visible속성을 false로 하여 Chart에서는 안보이게 한다 gutterLeft="0" 추가*/
					+'</verticalAxisRenderers>'
					+'<series>'
						+'<Area2DSeries yField="Five" form="curve" displayName="" fill="#fff" circleOffset="6" radius="5">'
							+'<areaFill>'
								+'<SolidColor color="#1dbfc1" alpha="0.1"/>'
							+'</areaFill>'
							+'<areaStroke>'
								+'<Stroke color="#0da3a8" weight="3"/>'
							+'</areaStroke>'
							//+'<areaDeclineStroke>'
							//	+'<Stroke color="#1dbfc1" weight="3"/>'
							//+'</areaDeclineStroke>'
							//+'<areaDeclineFill>'
							//	+'<SolidColor color="#1dbfc1" alpha="0.5"/>'
							//+'</areaDeclineFill>'
							+'<showDataEffect>'
								+'<SeriesInterpolate duration="1000"/>'
							+'</showDataEffect>'
							+'<lineStroke>'
								+'<Stroke color="#1dbfc1" weight="2"/>'
							+'</lineStroke>'
						+'</Area2DSeries>'
					+'</series>'
					+'<backgroundElements>'
//						+'<GridLines/>'
						+'<AxisMarker>'
							+'<lines>'
								+'<AxisLine value="이번달" label="" stroke="{stroke1}" color="#999" lineStyle="dashLine" horizontal="false"/>'
							+'</lines>'
						+'</AxisMarker>'
					+'</backgroundElements>'
				+'</Area2DChart>'
				+'<Style>'
					+'.valueLabelStyle{'
						+'font-family:"Spoqa Han Sans Neo";'
						+'fontSize:12;'
						+'color:#666;'
						//+'fontWeight:bold;'
					+'}'
				+'</Style>'
			+'</rMateChart>';


            // 차트 데이터
            var chartData = [
                {"Mon":`${cusMmtpXpsOut.bmYm5}월`, "Five":cusMmtpXpsOut.xpsAm5},
                {"Mon":`${cusMmtpXpsOut.bmYm4}월`, "Five":cusMmtpXpsOut.xpsAm4},
                {"Mon":`${cusMmtpXpsOut.bmYm3}월`, "Five":cusMmtpXpsOut.xpsAm3},
                {"Mon":`${cusMmtpXpsOut.bmYm2}월`, "Five":cusMmtpXpsOut.xpsAm2},
                {"Mon":`${cusMmtpXpsOut.bmYm1}월`, "Five":cusMmtpXpsOut.xpsAm1},
                {"Mon":"이번달", "Five":cusMmtpXpsOut.xpsAm0}
            ];
            
            // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
            //
            // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
            // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
            // 
            // 아래 내용은 
            // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
            // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
            rMateChartH5.calls("mainChart1", {
                "setLayout" : layoutStr,
                "setData" : chartData
            });
            
            /**
             * rMateChartH5 3.0이후 버전에서 제공하고 있는 테마기능을 사용하시려면 아래 내용을 설정하여 주십시오.
             * 테마 기능을 사용하지 않으시려면 아래 내용은 삭제 혹은 주석처리 하셔도 됩니다.
             *
             * -- rMateChartH5.themes에 등록되어있는 테마 목록 --
             * - simple
             * - cyber
             * - modern
             * - lovely
             * - pastel
             * -------------------------------------------------
             *
             * rMateChartH5.themes 변수는 theme.js에서 정의하고 있습니다.
             */
            rMateChartH5.registerTheme(rMateChartH5.themes);
            
            /**
             * 샘플 내의 테마 버튼 클릭 시 호출되는 함수입니다.
             * 접근하는 차트 객체의 테마를 변경합니다.
             * 파라메터로 넘어오는 값
             * - simple
             * - cyber
             * - modern
             * - lovely
             * - pastel
             * - default
             *
             * default : 테마를 적용하기 전 기본 형태를 출력합니다.
             */
        },
        rMateChartH5ChangeTheme(theme) {
                document.getElementById("chart1").setTheme(theme);
        },
    },

    mixins: [
        commonMixin,
        popupMixin
    ],
    components: { 
        FootersV2,
    }
    
}

</script>