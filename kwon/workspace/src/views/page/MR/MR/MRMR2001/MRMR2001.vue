<!--
/*************************************************************************
* @ 서비스경로 : PFM메인 > 메인 > 전체메뉴
* @ 페이지설명 : 자산현황 메인
* @ 파일명     : src/views/page/MR/MR/MRMR2001/MRMR2001.vue
* @ 작성자     : CS528063
* @ 작성일     : 2022-06-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-29              CS528063                 최초작성
* 2023-08-16              CS553461                 고도화 리네이밍(MRMR1001 -> MRMR2001)
*************************************************************************/
-->
<template>
    <div id="wrap" class="sticky-scroll">
        <header id="header" class="mydata2023">
            <!-- 개발 에서 접근했을 경우만 메뉴 보임-->
            <h1>더보기</h1>
            <a href="javascript:void(0);" class="btn_back" @click.prevent="movePrev"><span class="blind">이전화면</span></a>
            <div class="header_option">
                <a href="#nolink" class="btn_alert" :class="(anwAncYn==='1') ? 'on' : ''" @click.prevent="fn_openPopup('MRCO1001')"><span class="blind">{{anwAncYn==='1' ? '알림' : '새 알림이 있어요'}}</span></a>
                <!-- <a href="#nolink" v-show="isSBank || serviceType!='R'" class="btn_nav" @click.prevent="fn_toggleNativeMenu"><span class="blind">전체메뉴열기</span></a> -->
            </div>
        </header>
        <div id="content" class="mydata2023 allMenu">
			<div class="com_inner userInfo">
				<strong class="titH1"><span>{{ getUserInfo("cusnm") }}</span>님 안녕하세요!</strong>
				<a href="javascript:void(0);" class="link_arrow" @click.prevent="fn_openPopup('COCO1130')">내 프로필 보기</a>
				<div class="svcLinkBox">
					<a href="javascript:void(0);" class="svcItem fina" @click.prevent="fn_movePage('ASIP4001')">
						<span>재무진단</span>
					</a>
					<a href="javascript:void(0);" class="svcItem cons" @click.prevent="fn_movePage('LCIP4001')">
						<span>소비분석</span>
					</a>
					<a href="javascript:void(0);" class="svcItem agen" @click.prevent="fn_movePage('MRAM2001')">
						<span>기관관리</span>
					</a>
				</div>
				<ul class="layoutBox wAuto rBtn creditPoint">
					<li class="left"><strong>신용점수</strong></li>
					<li class="right">
						<a href="javascript:void(0);" class="link_arrow" @click.prevent="fn_openPopup('ASCR4101')">{{ getMyCreditInfo.psnCrdevlScrVal }}점</a>
					</li>
				</ul>
			</div>
			<hr class="hr02">
			<div class="com_inner menuListArea">
				<dl class="menuList asset">
					<dt>자산</dt>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('ASTA4001')">내 전체 자산</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('ASAC4001')">자산 보유현황</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('ASCD4001')">부채 관리</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('ASIP4001')">금융자산 진단</a></dd>
				</dl>
				<dl class="menuList expen">
					<dt>지출</dt>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('LCFD4001')">금융 달력</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('LCLE4001')">월 별 지출내역</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('LCIP4001')">이번 달 지출분석</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO2128')">숨긴 지출 내역</a></dd>
				</dl>
				<dl class="menuList fincLife">
					<dt>금융생활</dt>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('PDMY4001')">도전 목표 챌린지</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('PDPD4001')">맞춤 상품 추천</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('PDRT4001')">나의 노후 준비</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('PDYT4002')">연말정산 공제 금액</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('PDTX2004')">세금 납부 확인</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('PDSC4001')">사회보험료 가입 내역</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('PDBF4001')">데일리 금융브리핑</a></dd>
				</dl>
				<dl class="menuList alliSvc">
					<dt>제휴서비스</dt>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('ANCA4201')">NH콕자동차</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('ANRE4201')">NH콕부동산</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('ANFM2001')">귀농귀촌의 꿈</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('SZFC2101')">슬기로운 영농생활</a></dd>
				</dl>
				<dl class="menuList help">
					<dt>도움말</dt>
					<dd><a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO1104')">공지사항</a></dd>
                    <dd><a href="javascript:void(0);" @click.prevent="fn_openPopup('MREV2000')">이벤트</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO1116')">자주하는 질문</a></dd>
				</dl>
				<dl class="menuList setCtl">
					<dt>설정&middot;관리</dt>
					<dd><a href="javascript:void(0);" @click.prevent="fn_movePage('MRAM2001')">마이데이터 관리</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_openPopup('MRAT1001')">약관 및 동의서</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_openPopup('COAT1104')">제3자 정보제공동의 설정</a></dd>
					<dd><a href="javascript:void(0);" @click.prevent="fn_openPopup('MRCA2001')">서비스 해지</a></dd>
					
				</dl>
                <dl class="menuList setCtl" v-show="cbtType">
                    <dt>CBT전용</dt>
                    <dd><a href="javascript:void(0);" @click.prevent="moveCoco">데이터 조회</a></dd>
				    <dd><a href="javascript:void(0);" @click.prevent="moveOtherPort">포트변경(현재: {{this.port}})</a></dd>
                    <dd>build by Vite</dd>
                </dl>
			</div>
		</div>
        <!-- <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a> -->
    </div>
    <!-- 전체메뉴 영역 S -->
</template>

<script>
    // import Page from '@/views/layout/Page.vue'
    import COCO1130 from '@/views/page/CO/CO/COCO1130/COCO1130' // 프로필 
    import COCO2128 from '@/views/page/CO/CO/COCO2128/COCO2128' // 숨긴 지출내역
    import COCO1104 from '@/views/page/CO/CO/COCO1104/COCO1104' // 공지사항
    import COCO1116 from '@/views/page/CO/CO/COCO1116/COCO1116' // 자주하는 질문
    import MREV2000 from '@/views/page/MR/EV/MREV2000/MREV2000' // 이벤트

    import ASCR4101 from '@/views/page/AS/CR/ASCR4101/ASCR4101'
    import COAT1104 from '@/views/page/CO/AT/COAT1104/COAT1104'
    import MRAT1001 from '@/views/page/MR/AT/MRAT1001/MRAT1001'
    import MRCA2001 from '@/views/page/MR/CA/MRCA2001/MRCA2001'
    import SZFC2101 from '@/views/page/SZ/FC/SZFC2101/SZFC2101' // 슬기로운 영농 생활
    import MRCO1001 from '@/views/page/MR/CO/MRCO1001/MRCO1001'   // 알림함

    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'
    import routerService from '@/service/routerService'
    // import userService from '@/service/userService'
    // import appService from '@/service/appService'
    import {mapGetters} from 'vuex'
    // import {dateFormat} from '@/utils/date'

    // import _ from 'lodash'

    export default {
        name : "MRMR2001",
        data: () => {
            return {
                cusnm       : "",	// 고객명
                cusNb       : "",   // 고객번호
                anwAncYn    : "",
                port        : ""
            }
        },
        computed: {
			...mapGetters('user', [
                'isMacoYn', // 조합원 여부
                'isMacoAuthYn', //조합원 권한여부
                'getMyCreditInfo',  //신용정보(점수/등급)
            ]),
            ...mapGetters('layout', [
				'pageTitle',
				'pageName',
				'isMainPage',
				'isFirstPage',
				'pageList'
			]),
            mydtCusno(){
                return this.getUserInfo('mydtCusno')
            },
            cbtType(){
                return this.getUserInfo('tobeType')
            }
        },
        created() {
            this.cusnm = this.getUserInfo("cusnm")
            this.cusNb = this.getUserInfo("mydtCusno")
        },
        mounted() {
            this.port = location.port

            this.initComponent()
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        methods: {
            initComponent() {
                //this.fn_newAlarm()  //신규알림여부
            },
            // 페이지 이동
            fn_movePage(pageId) {
                const config = {
                    name : pageId,
                }
                this.close()
                commonService.movePage(config);
            },
            fn_openPopup(pageId) {
                let compName = ''
                if(pageId === "COCO1130") {
					compName = COCO1130	// 프로필
                }else if(pageId === 'ASCR4101') {
                    compName = ASCR4101	//
                }else if(pageId === 'COAT1104') {
                    compName = COAT1104	//
                }else if(pageId === 'MRCA2001') {
                    compName = MRCA2001	//
                }else if(pageId === 'MRAT1001') {
                    compName = MRAT1001	//
                }else if(pageId === 'COCO2128') {
                    compName = COCO2128	//
                }else if(pageId === 'COCO1104') {
                    compName = COCO1104	// 공지사항
                }else if(pageId === 'COCO1116') {
                    compName = COCO1116	// 자주하는 질문
                }else if(pageId === 'MREV2000') {
                    compName = MREV2000	// 이벤트
                }else if(pageId === 'SZFC2101') {
                    compName = SZFC2101	// 슬기로운 영농 생활
                }else if(pageId === 'MRCO1001') {
                    compName = MRCO1001
                }
                
                const config = {
					component: compName,
                }
                // this.close()
				modalService.openPopup(config).then(() => {})
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
            closePopup(pageType, pageId) {
                /*팝업 종료시 강제 nscroll 제거*/
                $('.sticky-scroll').removeClass('nscroll');
                /*팝업 종료시 강제 nscroll 제거*/
                let param = {
                    "pageType" : pageType,
                    "pageId" : pageId
                }
                // this.close(param)
                this.closeAllMenu(param)
            },
            closeAllMenu(param){
                this.$emit('closeAllMenuMRMR2001', param )
            },
            movePrev() {
                routerService.movePrev()
            },
            moveCoco() {
                const config = {
                    name : 'COCO9999',
                }
                commonService.movePage(config);
            },
            moveOtherPort() {
                apiService.addLoading('port')
                let cus = "";
                let chnl = "";
				cus = this.$route.query.cus
				if (cus === undefined || cus === null)
				{
					const searchUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
					if(searchUserInfo != undefined){
						cus = searchUserInfo["cus"]
						chnl = searchUserInfo["chnl"]
					}
                }

                cus = cus.replace('+', '%2B');

                if ( location.port == '5090' ) {
                    location.href = location.href.substr(0, location.href.lastIndexOf(':')) + ":9090?cus=" + cus + "&chnl=" + chnl
                } else {
                    location.href = location.href.substr(0, location.href.lastIndexOf(':')) + ":5090?cus=" + cus + "&chnl=" + chnl
                }
            },
        },
        components : {
            // Page
        }
    }
</script>