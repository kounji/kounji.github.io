<!--
/*************************************************************************
* @ 서비스경로 : PFM메인 > 메인 > 전체메뉴
* @ 페이지설명 : 자산현황 메인
* @ 파일명     : src/views/page/MR/MR/MRMR4001/MRMR4001.vue
* @ 작성자     : CS540683
* @ 작성일     : 2025-01-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-29              CS528063                 최초작성
* 2023-08-16              CS553461                 고도화 리네이밍(MRMR1001 -> MRMR2001)
* 2025-01-31              CS540683                 고도화 리네이밍(MRMR1001 -> MRMR2001)
* 2025-03-10              CS541597                 큰글, 청소년 모드별 메뉴 분기
*************************************************************************/
-->
<template>
    <div id="wrap" class="sticky-scroll">
		<!-- content -->
        <div class="content-view">
            <div id="content">
                <!-- 일반모드 Start -->
                <section class="allNavi">
                    <div class="personal saving">
						<a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO1130')">{{ getUserInfo("cusnm") }}님 안녕하세요!</a>
					</div>
                    <!--
						저축왕 : saving
						투자천재 :invest
						절약마스터 : economist
						보험수호자 : insure
						신용지킴이 : credit
						대출코치 : loan
					-->
					<ul class="service">
						<li><a href="javascript:void(0);" @click.prevent="fn_movePage('ASIP4001')"><span>자산진단</span></a></li>
						<li><a href="javascript:void(0);" @click.prevent="fn_movePage('LCIP4001')"><span>지출분석</span></a></li>
						<li><a href="javascript:void(0);" @click.prevent="fn_movePage('MRAM4001')"><span>연결기관관리</span></a></li>
					</ul>

					<div class="credit">
						<a href="javascript:void(0);" @click.prevent="fn_openPopup('ASCR4101')">신용점수 {{ getMyCreditInfo.psnCrdevlScrVal }}</a>
						<a href="javascript:void(0);" class="arrow" @click.prevent="fn_openPopup('ASCR1113')">신용점수 올리기</a>
					</div>

					<nav>
						<div class="category_tab">
							<div class="scroller">
								<ul role="tablist">
									<li><a href="#navi01" role="tab" aria-selected="false">자산</a></li>
                                    <!-- <li><router-link :path="'/'" :to="{hash:'#navi01'}">자산</router-link></li> -->
									<li><a href="#navi02" role="tab" aria-selected="false">지출</a></li>
									<li><a href="#navi03" role="tab" aria-selected="false">연금/절세</a></li>
									<li><a href="#navi04" role="tab" aria-selected="false">추천</a></li>
									<li><a href="#navi05" role="tab" aria-selected="false">금융지식</a></li>
                                    <!-- <li><a href="#navi06" role="tab" aria-selected="false">놀이터</a></li> -->
									<li><a href="#navi07" role="tab" aria-selected="false">도전 목표 챌린지</a></li>
									<li><a href="#navi08" role="tab" aria-selected="false">나의 신용점수 올리기</a></li>
									<li><a href="#navi09" role="tab" aria-selected="false">NH지역정보</a></li>
									<li><a href="#navi10" role="tab" aria-selected="false">NH콕마이카</a></li>
									<li><a href="#navi11" role="tab" aria-selected="false">NH콕부동산</a></li>
									<li><a href="#navi12" role="tab" aria-selected="false">이벤트/혜택</a></li>
                                    <li><a href="#navi13" role="tab" aria-selected="false">이용안내</a></li>
									<li><a href="#navi14" role="tab" aria-selected="false">콕마이데이터관리</a></li>
									<li><a href="#navi15" role="tab" aria-selected="false">타기관 마이데이터관리</a></li>
                                    <li><a href="#navi16" role="tab" aria-selected="false">설정관리</a></li>
                                    <li v-show="cbtType"><a href="#navi17" role="tab" aria-selected="false">CBT전용</a></li>
								</ul>
							</div>
						</div>
                        
						<div class="favorite">
							<h2 class="h_tit03">나의 관심서비스</h2>
							<button type="button" class="btn_add" @click.prevent="fn_openPopup('COCO4351')">관심서비스 담기</button>
							<ul class="attention_list" v-if="inteList.length &gt; 0">
								<li v-for="inte in inteList" :key="inte.psAmnScid" :class="inte.menuId"><a href="javascript:void(0);" @click.prevent="fnOpenPopYn(inte.psAmnScid)">{{inte.psAmnScrnm}}</a></li>
							</ul>
                            <!--등록된 관심서비스가 없을 경우-->
							<p class="h_tit01" v-else>나의 관심서비스로<br>담아 놓고<br>빠르게 이동하세요.</p>
						</div>

						<ul>
							<li id="navi01"><a href="javascript:void(0);" @click.prevent="fn_movePage('ASTA4001')">자산<span class="pin purple">NEW</span></a>
								<ul>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('ASAC4001')">자산현황</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('ASCD4001')">부채관리</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('ASIP4001')">자산진단<span class="pin orange">HOT</span></a></li>
                                    <li><a href="javascript:void(0);" @click.prevent="fn_movePage('ASTN4001')">숨은자산<span class="pin purple">NEW</span></a></li>
								</ul>
							</li>
							<li id="navi02"><a href="javascript:void(0);" @click.prevent="fn_movePage('LCTA4001')">지출<span class="pin purple">NEW</span></a>
								<ul>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('LCFD4001')">금융달력</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('LCLE4001')">지출내역</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('LCIP4001')">지출분석<span class="pin orange">HOT</span></a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO2128')">숨긴 지출내역</a></li>
								</ul>
							</li>
							<li id="navi03"><a href="javascript:void(0);" @click.prevent="fn_movePage('PDTA4001')">연금/절세<span class="pin purple">NEW</span></a>
								<ul>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('PDRT4001')">나의 노후준비</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('PDYT4002')">연말정산 공제금액</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('PDTX4004')">세금 납부 확인</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('PDSC4004')">건강보험 가입내역</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('PDBF4001')">데일리 금융브리핑</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('PDPD4001')">맞춤 상품추천</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('PDPD4051')">대출이자 계산기<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('PDPD4061')">대출한도 계산기<span class="pin purple">NEW</span></a></li>
								</ul>
							</li>
							<li id="navi04"><a href="javascript:void(0);" @click.prevent="fn_movePage('RETA4001')">추천<span class="pin purple">NEW</span></a></li>

							<li id="navi05"><a href="javascript:void(0);" @click.prevent="fn_movePage('COCT4001')">금융지식<span class="pin purple">NEW</span></a></li>
                            <!--
							<li id="navi06"><a href="javascript:void(0);">놀이터<span class="pin purple">NEW</span></a></li>
                            -->
							<li id="navi07" @click.prevent="fn_movePage('PDMY4001')"><span>도전 목표 챌린지</span>
								<ul>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('PDMY4001')">버킷리스트</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('PDMY4001', {type: 'goal'})">금융목표</a></li>
								</ul>
							</li>
							<li id="navi08"><a href="javascript:void(0);" @click.prevent="fn_openPopup('ASCR4101')">나의 신용점수 올리기</a>
								<div class="credit_txt" v-html="creditTxt">
								</div>
							</li>
							<li id="navi09"><a href="javascript:void(0);" @click.prevent="fn_movePage('RGTA4001')">NH지역정보<span class="pin orange">HOT</span></a>
								<ul>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('RGFT4001')">지역축제<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('RGCL4001')">지역문화/정보<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('RGAT4001')">농촌여행<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('RGBM4001')">자전거길 국토종주<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('RGDM4001')">전국 둘레길<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('RGMM4001')">군장병 TMO안내<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('ANFM4001')">귀농귀촌의 꿈</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('SZFC4101')">슬기로운 영농생활</a></li>
								</ul>
							</li>
							<li id="navi10"><a href="javascript:void(0);" @click.prevent="fn_movePage('ANCA4201')">NH콕마이카</a></li>
							<li id="navi11"><a href="javascript:void(0);" @click.prevent="fn_movePage('ANRE4201')">NH콕부동산</a></li>
							
							<li id="navi12"><span>이벤트/혜택</span>
								<ul>
									<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('MREV2000')">이벤트<span class="pin orange">HOT</span></a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('MRLO4001')">로또복권 번호만들기<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('MREV4041')">친구초대<span class="pin purple">NEW</span><span class="pin orange">HOT</span></a></li>
                                    <li><a href="javascript:void(0);">OX퀴즈<span class="pin purple">NEW</span><span class="pin gray">준비중</span></a></li><!-- 25-03-13 OX퀴즈 상태태그 추가 -->
                                    <!-- 
                                    <span class="pin gray">준비중</span>
                                    <span class="pin green">진행중</span>
                                     -->
								</ul>
							</li>
                            <li id="navi13"><span>이용안내</span>
								<ul>
									<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO1104')">새소식</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO1116')">자주하는 질문</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('MAGU4001')">서비스 소개<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('MAGU4S01')">큰글 서비스 소개<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('MAGU4C01')">청소년 서비스 소개<span class="pin purple">NEW</span></a></li>
								</ul>
							</li>
							<li id="navi14"><span>콕마이데이터관리</span>
								<ul>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('MRAM4001')">연결기관 관리</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('MRAT1001')">약관 및 동의서</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('COAT1104')">제3자 정보제공동의 설정</a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('MRCA2001')">서비스 해지</a></li>
                                    <li><a href="javascript:void(0);">대면상담 일회성 동의<span class="pin purple">NEW</span></a></li>
								</ul>
							</li>
							<li id="navi15"><span>타기관 마이데이터관리</span>
								<ul>
									<li><a href="javascript:void(0);" @click.prevent="fn_movePage('MRAM4001')">마이데이터 가입 조회 및 관리<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" @click.prevent="fn_openPopup('COAT1104')">제3자 정보제공 조회 및 관리<span class="pin purple">NEW</span></a></li>
								</ul>
							</li>
                            <li id="navi16"><span>설정&middot;관리</span>
                                <ul>
                                    <li><a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO4051')">모드 설정<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);">캐릭터 설정<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);">나의관심서비스 설정<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);">홈화면 편집<span class="pin purple">NEW</span></a></li>
                                </ul>
                            </li>
							<li id="navi17" v-show="cbtType"><span>CBT전용</span>
								<ul>
									<li><a href="javascript:void(0);" @click.prevent="moveCoco">데이터 조회</a></li>
									<li><a href="javascript:void(0);" @click.prevent="moveOtherPort">포트변경(현재: {{this.port}})</a></li>
                                    <li><a href="javascript:void(0);" @click.prevent="shareKakaoFn">카카오톡 공유</a></li>
                                    <li><a href="javascript:void(0);" @click.prevent="fn_Share()">공유하기</a></li>
                                    <li><a href="javascript:void(0);" @click.prevent="voiceFn">음성인식</a></li>
                                    <li><a href="javascript:void(0);" @click.prevent="excelExportFn">엑셀다운로드</a></li>
                                    <li><input type="text" id="productCode"><a href="javascript:void(0);" @click.prevent="moveProduct">상품이동</a></li>
								</ul>
							</li>
						</ul>
					</nav>

                </section>
                <!-- 일반모드 End -->
            </div>
            <!-- Footer 
            <footersV2 type="" />
            -->
        </div>
        <!--// content -->
    </div>
</template>

<script>
    $('.scroller > ul').children('li').click(function(e){
        console.log('!')
    })
    import COCO1130 from '@/views/page/CO/CO/COCO1130/COCO1130' // 프로필 
    import COCO2128 from '@/views/page/CO/CO/COCO2128/COCO2128' // 숨긴 지출내역
    import COCO1104 from '@/views/page/CO/CO/COCO1104/COCO1104' // 공지사항
    import COCO1116 from '@/views/page/CO/CO/COCO1116/COCO1116' // 자주하는 질문
    import MREV2000 from '@/views/page/MR/EV/MREV2000/MREV2000' // 이벤트

    import ASCR4101 from '@/views/page/AS/CR/ASCR4101/ASCR4101' // 신용정보
    import ASCR1113 from '@/views/page/AS/CR/ASCR1113/ASCR1113' // 신용점수올리기
    import COAT1104 from '@/views/page/CO/AT/COAT1104/COAT1104'
    import MRAT1001 from '@/views/page/MR/AT/MRAT1001/MRAT1001'
    import MRCA2001 from '@/views/page/MR/CA/MRCA2001/MRCA2001'
    import SZFC4101 from '@/views/page/SZ/FC/SZFC4101/SZFC4101' // 슬기로운 영농 생활
    import MRCO1001 from '@/views/page/MR/CO/MRCO1001/MRCO1001' // 알림함
    import MRLO4001 from '@/views/page/MR/LO/MRLO4001/MRLO4001' // 로또복권 번호만들기
    import COCO4351 from '@/views/page/CO/CO/COCO4351/COCO4351' // 나의 관심서비스

    import COCO4051 from '@/views/page/CO/CO/COCO4051/COCO4051'
    import MAGU4001 from '@/views/page/MA/GU/MAGU4001/MAGU4001'
    import MAGU4S01 from '@/views/page/MA/GU/MAGU4S01/MAGU4S01'
    import MAGU4C01 from '@/views/page/MA/GU/MAGU4C01/MAGU4C01'
    import MREV4041 from '@/views/page/MR/EV/MREV4041/MREV4041'

    import FootersV2 from "@/views/layout/FootersV2.vue"

    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'
    import appService from '@/service/appService'
    import routerService from '@/service/routerService'
    import {mapGetters} from 'vuex'
    import {defineAsyncComponent} from 'vue'
    
    export default {
        name : "MRMR4001",
        data: () => {
            return {
                cusnm           : "",	// 고객명
                cusNb           : "",   // 고객번호
                anwAncYn        : "",
                port            : "",
                inteList        : [],   // 관심서비스 목록
                creditTxtList   : [     // 신용점수 문구 목록
                    '신용점수를 조회해도 신용점수는<br>떨어지지 않아요.',
                    'NICE와 KCB의 신용점수가 다른 이유는?',
                    '나의 신용점수가 떨어지는 이유는?'
                ],
                creditTxt       : '',
            }
        },
        computed: {
			...mapGetters('user', [
                'isMacoYn', // 조합원 여부
                'isMacoAuthYn', //조합원 권한여부
                'getMyCreditInfo',  //신용정보(점수/등급)
                'getUserMode',  // 유저모드 (N:일반, S:큰글, C:청소년)
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

                // 카테고리 선택 시 라우팅 오류 방지
                // $('.scroller > ul').children('li').on('click', function(e){
                //     e.preventDefault()
                // })

                // 신용점수 관련 문구 랜덤설정
                this.creditTxt = this.creditTxtList[Math.floor(Math.random() * this.creditTxtList.length)]

                this.getInteList(); // 나의 관심서비스 가져오기
            },
            // 페이지 이동
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
                this.close()
                commonService.movePage(config);
            },
            fn_openPopup(pageId) {
                let compName = ''
                if(pageId === "COCO1130") {
					compName = COCO1130	// 프로필
                }else if(pageId === 'ASCR4101') {
                    compName = ASCR4101	//
                }else if(pageId === 'ASCR1113') {
                    compName = ASCR1113   
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
                }else if(pageId === 'SZFC4101') {
                    compName = SZFC4101	// 슬기로운 영농 생활
                }else if(pageId === 'MRCO1001') {
                    compName = MRCO1001
                }else if(pageId === 'COCO4051') {
                    compName = COCO4051
                }else if(pageId === 'MRLO4001') {
                    compName = MRLO4001 // 로또복권 번호만들기
                }else if(pageId === 'COCO4351') {
                    compName = COCO4351 // 나의 관심서비스
                }else if(pageId === 'MAGU4001') {
                    compName = MAGU4001 // 서비스소개
                }else if(pageId === 'MAGU4S01') {
                    compName = MAGU4S01 // 큰글모드 서비스소개
                }else if(pageId === 'MAGU4C01') {
                    compName = MAGU4C01 // 청소년모드 서비스소개
                }else if(pageId === 'MREV4041') {
                    compName = MREV4041 // 친구 초대
                }
                
                const config = {
					component: compName,
                }
                // this.close()
				modalService.openPopup(config).then((response) => {
                    if(pageId === 'COCO4351') { // 관심서비스 추가된 경우 재조회
                        if(response == 'refresh') {
                            this.getInteList();
                        }
                    }
                })
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

            //공유하기 테스트 팝업 Web Share Api 
            fn_Share(){
                const config = {
                    params: { // 파라미터
                        title : "웹공유타이틀",
                        text  : "웹공유TEXT"
                    },
                }
                modalService.webSharePopup(config).then(response => {

                })
            } ,
            voiceFn(){
              this.voicePermission().then(res=>{
                  console.log('res:', res)
                  if(res.msg){
                    modalService.alert(res.msg)
                  }
              }).catch(error => {
                  console.log('error:', error)
              })
            },
            shareKakaoFn(){
                let data = {'title': '카카오 공유하기 제목',
                        'description': '카카오 공유하기 설명',
                        'img': 'img_nonMyTargetTitlbBe_2023-e115b3a9.png',
                        'screen': 'MRMR2001'
                    }

                this.shareKakao(data)
            },
            excelExportFn() {
                let data = [
                    {'이름' : '홍길동', '나이' : '45', '직업' : '백수'},
                    {'이름' : '김철수', '나이' : '35', '직업' : '백수2'},
                    {'이름' : '김영희', '나이' : '25', '직업' : '백수3'},
                    {'이름' : '김홍도', '나이' : '15', '직업' : '백수4'},
                ]
 
 //거래내역 출력 데이터
 data = {
		  header : {
					  title: "거래내역저장", 
					  trFrom:"2024.10.25",
					  trTo :"2024.11.25",
					  trGbn :"신용카드, 체크카드, 이체, 페이머니, 선불카드" 
					} , 
		  data:[
			{no:1  , trDt : "2024.11.25", trTm : "7:05:46"	, ctnt: "뮌헨1589울진후포점"   , amt: "-36,000" , cur : ""		, cardGbn : "카드(국내)"	, cardNm : "울진사랑카드A"			, trType : ""			, appStat : "승인"		, instYn : "일시불"	, cat : "미분류"	    , hiddenYn : ""    },
			{no:2  , trDt : "2024.11.25", trTm : "7:00:46"	, ctnt: "서울의원"			   , amt: "-40,200" , cur : ""		, cardGbn : "카드(국내)"	, cardNm : "울진사랑카드A"			, trType : ""			, appStat : "승인취소"		, instYn : "일시불"	, cat : "쇼핑"	    , hiddenYn : ""    },
			{no:3  , trDt : "2024.11.25", trTm : "11:32:33"	, ctnt: "BHC치킨후포점"		   , amt: "-24,000" , cur : ""		, cardGbn : "카드(해외)"	, cardNm : "울진사랑카드A"			, trType : ""			, appStat : "정정"		, instYn : "일시불"	, cat : "가구/침구"	, hiddenYn : ""    },
			{no:4  , trDt : "2024.11.25", trTm : "12:58:17"	, ctnt: "소망약국"			   , amt: "-2,400"  , cur : ""		, cardGbn : "선불"		, cardNm : "울진사랑카드A"			, trType : ""			, appStat : "무승인 매입"	, instYn : "일시불"	, cat : "외식"	    , hiddenYn : ""    },
			{no:5  , trDt : "2024.11.25", trTm : "7:05:46"	, ctnt: "해품돈"			   , amt: "-18,000" , cur : ""		, cardGbn : "수기"		, cardNm : "울진사랑카드A"			, trType : ""			, appStat : "승인"		, instYn : "일시불"	, cat : "카페/베이커리"	, hiddenYn : "숨김" },
			{no:6  , trDt : "2024.11.24", trTm : "7:00:46"	, ctnt: "주식회사 카카오"	   , amt: "-30,000" , cur : "KRW"	, cardGbn : "선불카드"		, cardNm : "카카오페이 머니"			, trType : ""			, appStat : "승인"		, instYn : "일시불"	, cat : "생활/마트"	, hiddenYn : ""    },
			{no:7  , trDt : "2024.11.24", trTm : "11:32:33"	, ctnt: "농협손해이자"		   , amt: "24,000"  , cur : "KRW"	, cardGbn : "계좌"		, cardNm : "자립예탁금"				, trType : "신규"			, appStat : ""			, instYn : ""		, cat : "생활/마트"	, hiddenYn : ""    },
			{no:8  , trDt : "2024.11.24", trTm : "12:58:17"	, ctnt: "농협손해이자"		   , amt: "-2,400"  , cur : "KRW"	, cardGbn : "계좌"		, cardNm : "자립예탁금"				, trType : "출금"			, appStat : ""			, instYn : ""		, cat : "생활/마트"	, hiddenYn : ""    },
			{no:9  , trDt : "2024.11.24", trTm : "7:05:46"	, ctnt: "농협손해이자"		   , amt: "18,000"  , cur : "KRW"	, cardGbn : "계좌"		, cardNm : "자립예탁금"				, trType : "입금"			, appStat : ""			, instYn : ""		, cat : "생활/마트"	, hiddenYn : ""    },
			{no:10 , trDt : "2024.11.24", trTm : "7:00:46"	, ctnt: "농협손해이자"		   , amt: "30,000"  , cur : "KRW"	, cardGbn : "계좌"		, cardNm : "자립예탁금"				, trType : "정정(입금)"	, appStat : ""			, instYn : ""		, cat : "카페/베이커리"	, hiddenYn : ""    },
			{no:11 , trDt : "2024.11.24", trTm : "11:32:33"	, ctnt: "농협손해이자"		   , amt: "24,000"  , cur : "KRW"	, cardGbn : "계좌"		, cardNm : "자립예탁금"				, trType : "정정(출금)"	, appStat : ""			, instYn : ""		, cat : "생활/마트"	, hiddenYn : ""    },
			{no:12 , trDt : "2024.11.24", trTm : "12:58:17"	, ctnt: "농협손해이자"		   , amt: "36,000"  , cur : "KRW"	, cardGbn : "계좌"		, cardNm : "자립예탁금"				, trType : "출금취소(입금)"	, appStat : ""			, instYn : ""		, cat : "생활/마트"	, hiddenYn : ""    },
			{no:13 , trDt : "2024.11.22", trTm : "7:05:46"	, ctnt: "농협손해이자"		   , amt: "-40,200" , cur : "KRW"	, cardGbn : "계좌"		, cardNm : "자립예탁금"				, trType : "입금취소(출금)"	, appStat : ""			, instYn : ""		, cat : "의료/건강"	, hiddenYn : ""    },
			{no:14 , trDt : "2024.11.22", trTm : "7:00:46"	, ctnt: "농협손해이자"		   , amt: "24,000"  , cur : "KRW"	, cardGbn : "계좌"		, cardNm : "자립예탁금"				, trType : "기타(입금)"	, appStat : ""			, instYn : ""		, cat : "의료/건강"	, hiddenYn : ""    },
			{no:15 , trDt : "2024.11.22", trTm : "11:32:33"	, ctnt: "농협손해이자"		   , amt: "-2,400"  , cur : "KRW"	, cardGbn : "계좌"		, cardNm : "자립예탁금"				, trType : "기타(출금)"	, appStat : ""			, instYn : ""		, cat : "생활/마트"	, hiddenYn : ""    },
			{no:16 , trDt : "2024.11.21", trTm : "7:00:46"	, ctnt: "농협손해이자"		   , amt: "-18,000" , cur : "KRW"	, cardGbn : "계좌"		, cardNm : "자립예탁금"				, trType : "기타(출금)"	, appStat : ""			, instYn : ""		, cat : "생활/마트"	, hiddenYn : ""    },
			{no:17 , trDt : "2024.11.19", trTm : "11:32:33"	, ctnt: "샵족발 울진후포점"	   , amt: "-30,000" , cur : ""		, cardGbn : "카드(국내)"	, cardNm : "울진사랑카드A"			, trType : ""			, appStat : "승인"		, instYn : "할부"		, cat : "자동차"	    , hiddenYn : ""    },
			{no:18 , trDt : "2024.10.20", trTm : "7:00:46"	, ctnt: "미래에셋단기채알파("	, amt: "-24,000" , cur : "KRW"	, cardGbn : "카드(국내)"	, cardNm : "우리 SUPER주거래 통장"	, trType : ""			, appStat : "승인"		, instYn : "일시불"	, cat : "교통"	    , hiddenYn : ""    },
			{no:19 , trDt : "2024.10.19", trTm : "11:32:33"	, ctnt: "쿠팡주식회사"		, amt: "-2,400"  , cur : "KRW"	, cardGbn : "카드(국내)"	, cardNm : "올바른NEW HAVE카드"		, trType : ""			, appStat : "승인"		, instYn : "일시불"	, cat : "여행/숙박"	, hiddenYn : ""    },
			{no:20 , trDt : "2024.10.18", trTm : "7:00:46"	, ctnt: "쿠팡주식회사"		, amt: "-18,000" , cur : "KRW"	, cardGbn : "카드(국내)"	, cardNm : "올바른NEW HAVE카드"		, trType : ""			, appStat : "승인"		, instYn : "일시불"	, cat : "문화/레저"	, hiddenYn : ""    },
			{no:21 , trDt : "2024.10.17", trTm : "11:32:33"	, ctnt: "쿠팡주식회사"		, amt: "-30,000" , cur : "KRW"	, cardGbn : "카드(국내)"	, cardNm : "올바른NEW HAVE카드"		, trType : ""			, appStat : "승인"		, instYn : "일시불"	, cat : "의료/건강"	, hiddenYn : ""    },
			{no:22 , trDt : "2024.10.16", trTm : "7:00:46"	, ctnt: "쿠팡주식회사"		, amt: "-24,000" , cur : "KRW"	, cardGbn : "카드(국내)"	, cardNm : "올바른NEW HAVE카드"		, trType : ""			, appStat : "승인"		, instYn : "일시불"	, cat : "뷰티/미용"	, hiddenYn : ""    },
			{no:23 , trDt : "2024.10.15", trTm : "11:32:33"	, ctnt: "쿠팡주식회사"		, amt: "-2,400"	 , cur : "KRW"	, cardGbn : "카드(국내)"	, cardNm : "올바른NEW HAVE카드"		, trType : ""			, appStat : "승인"		, instYn : "일시불"	, cat : "교육"	    , hiddenYn : ""    },
			{no:24 , trDt : "2024.10.12", trTm : "7:00:46"	, ctnt: "(주)티머니지하철"	, amt: "-18,000" , cur : "KRW"	, cardGbn : "선불카드"		, cardNm : "K-패스카드(채움)_체크"		, trType : ""			, appStat : "승인"		, instYn : "일시불"	, cat : "금융"	    , hiddenYn : ""    },
			{no:25 , trDt : "2025.10.12", trTm : "11:32:33"	, ctnt: "(주)티머니지하철"	, amt: "-2,400"	 , cur : "KRW"	, cardGbn : "선불카드"		, cardNm : "K-패스카드(채움)_체크"		, trType : ""			, appStat : "승인"		, instYn : "일시불"	, cat : "주거/통신"	, hiddenYn : ""    }
		  ]
		}  

                this.excelExport("exec_lcfd4009", data)
            },

            moveProduct(){
            let code = document.getElementById("productCode").value
            if(!code){
              modalService.alert("상품코드를 입력해주세요")
            }else{
              // 스뱅일경우
              if(this.getUserInfo('chnl') === '385') {
                // 스뱅
                let url = 'WEB=Y%26serviceId=SFBCA0020R%26psnFncWrsC=' + code + '%26naac_dsc=2%26nhType=2'
                console.log('url :::', url)
                appService.moveFinancialProductPage(url)
              } else {
                // 콕뱅
                let url = 'SFBCA0020R^'+ code
                console.log('url :::', url)
                appService.moveFinancialProductPage(url)
              }
            }
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

          isEmpty(value) {
            return (value === null || value === undefined || value.length < 1) ? true : false
          },

          // 관심서비스 이동 화면이 Page인지 Popup인지 구분해주는 함수
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

        },
        components : {
            // Page
            FootersV2,
        }
    }
</script>