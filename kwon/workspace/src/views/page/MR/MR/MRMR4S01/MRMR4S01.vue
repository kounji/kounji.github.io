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
                <!-- 큰글모드 Start -->
                <section class="allNavi senior">
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
                    <nav>
                        <ul>
                            <li id="navi01"><a href="javascript:void(0);" @click.prevent="fn_movePage('ASTA4S01')">나의 자산<span class="pin purple">NEW</span></a></li>
                            <li id="navi02"><a href="javascript:void(0);" @click.prevent="fn_movePage('LCTA4S01')">나의 지출<span class="pin purple">NEW</span></a></li>
                            <li id="navi03"><a href="javascript:void(0);" @click.prevent="fn_movePage('PDTA4S01')">나의 연금/절세<span class="pin purple">NEW</span></a></li>
                            <li id="navi05"><a href="javascript:void(0);" @click.prevent="fn_movePage('COCT4001')">금융지식<span class="pin purple">NEW</span></a></li>
                            <li id="navi17"><a href="javascript:void(0);">OX퀴즈<span class="pin purple">NEW</span><span class="pin gray">준비중</span></a></li>
                            <!-- 
                            <span class="pin gray">준비중</span>
                            <span class="pin green">진행중</span>
                                -->
                            <li id="navi13"><span>이용안내</span>
                                <ul>
                                    <li><a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO1104')">새소식</a></li>
                                    <li><a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO1116')">자주하는 질문</a></li>
                                    <li><a href="javascript:void(0);" @click.prevent="fn_openPopup('MAGU4S01')">큰글 서비스 소개<span class="pin purple">NEW</span></a></li>
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
                            <li id="navi16"><span>설정&middot;관리</span>
                                <ul>
                                    <li><a href="javascript:void(0);" @click.prevent="changeMode">모드 설정<span class="pin purple">NEW</span></a></li>
                                    <li><a href="javascript:void(0);">캐릭터 설정<span class="pin purple">NEW</span></a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </section>
                <!-- 큰글모드 End -->
            </div>
            <!-- Footer 
            <footersV2 type="" />
            -->
        </div>
        <!--// content -->
    </div>
</template>

<script>
    import COCO1104 from '@/views/page/CO/CO/COCO1104/COCO1104' // 공지사항
    import COCO1116 from '@/views/page/CO/CO/COCO1116/COCO1116' // 자주하는 질문
    import COAT1104 from '@/views/page/CO/AT/COAT1104/COAT1104'
    import MRAT1001 from '@/views/page/MR/AT/MRAT1001/MRAT1001'
    import MRCA2001 from '@/views/page/MR/CA/MRCA2001/MRCA2001'
    import MAGU4S01 from '@/views/page/MA/GU/MAGU4S01/MAGU4S01'
    import COCO4051 from '@/views/page/CO/CO/COCO4051/COCO4051'
    import COCO1130 from '@/views/page/CO/CO/COCO1130/COCO1130'

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
        name : "MRMR4S01",
        data: () => {
            return {
                cusnm       : "",	// 고객명
                cusNb       : "",   // 고객번호
                anwAncYn    : "",
                port        : "",
                inteList    : [],   // 관심서비스 목록
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
                if(pageId === 'COAT1104') {
                    compName = COAT1104	//
                }else if(pageId === 'MRCA2001') {
                    compName = MRCA2001	//
                }else if(pageId === 'MRAT1001') {
                    compName = MRAT1001	//
                }else if(pageId === 'COCO1104') {
                    compName = COCO1104	// 공지사항
                }else if(pageId === 'COCO1116') {
                    compName = COCO1116	// 자주하는 질문
                }else if(pageId === 'COCO1130') {
                    compName = COCO1130 // 프로필
                }else if(pageId === 'MAGU4S01') {
                    compName = MAGU4S01 // 큰글모드 서비스소개
                }
                
                const config = {
					component: compName,
                }
                // this.close()
				modalService.openPopup(config).then((response) => {
                    
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
            movePrev() {
                routerService.movePrev()
            },
            /**
             * 모드변경 팝업 호출
             */
            changeMode() {
                const config = {
                    component: COCO4051
                }
                modalService.openPopup(config).then(() => {

                })
            },

        },
        components : {
            // Page
            FootersV2,
        }
    }
</script>