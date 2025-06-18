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
                <!-- 청소년모드 Start -->
                <section class="allNavi youth">
                    <div class="personal" :class="avatarImg">
                        <span class="char" :aria-label="getCharName(avatarImg)+' 캐릭터'" role="img"></span>
                        <a href="javascript:void(0);" @click.prevent="fn_openPopup('COCO1130')">{{ getUserInfo("cusnm") }}님 안녕하세요!</a>
                    </div>
                    <!--
						금융멘토 : mentor
                        디지털금융달인 : master
						저축왕 : saving
						투자천재 :invest
						절약마스터 : economist
						보험수호자 : insure
						신용지킴이 : credit
						대출코치 : loan
					-->
                    <nav>
                        <ul>
                            <li id="navi01"><a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('ASTA4C01')">나의 자산<span class="pin purple">NEW</span></a></li>
                            <li id="navi02"><a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('LCTA4C01')">나의 지출<span class="pin purple">NEW</span></a></li>
                            <li id="navi05"><a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('COCT4001')">금융지식<span class="pin purple">NEW</span></a></li>
                            <li id="navi17">
                                <a href="javascript:void(0);" role="button" @click.prevent="getEventOXJoin()">OX퀴즈
                                    <span class="pin purple">NEW</span>
                                    <span :class="`pin ${eventOxInfo.bltnDt ? 'green' : 'gray'}`">{{eventOxInfo.bltnDt ? '진행중' : '준비중'}}</span>
                                </a>
                            </li>
                            <li id="navi09" class=""><a href="javascript:void(0);" role="button">NH지역정보<span class="pin red">HOT</span></a>
								<ul>
									<li><a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('RGFT4001')">지역축제<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('RGCL4001')">지역문화시설<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('RGAT4001')">농촌여행<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('RGBM4001')">자전거길 국토종주<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('RGDM4001')">전국 둘레길<span class="pin purple">NEW</span></a></li>
								</ul>
							</li>
                            <li id="navi13"><span>이용안내</span>
								<ul>
									<li><a href="javascript:void(0);" role="button" @click.prevent="fn_openPopup('COCO1104')">새소식</a></li>
									<!-- <li><a href="javascript:void(0);" role="button" @click.prevent="fn_openPopup('COCO4116')">자주하는 질문</a></li> -->
									<li><a href="javascript:void(0);" role="button" @click.prevent="fn_openPopup('MAGU4C01')">청소년 서비스 소개<span class="pin purple">NEW</span></a></li>
								</ul>
							</li>

							<li id="navi14"><span>콕마이데이터관리</span>
								<ul>
									<li><a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('MRAM4001')">연결기관 관리</a></li>
                                    <li><a href="javascript:void(0);" role="button" @click.prevent="fn_openPopup('MRAT4001')">약관 및 동의서</a></li>
                                    <li><a href="javascript:void(0);" role="button" @click.prevent="fn_openPopup('COAT1104')">제3자 정보제공동의 설정</a></li>
                                    <li><a href="javascript:void(0);" role="button" @click.prevent="fn_openPopup('MRCA4001')">서비스 해지</a></li>
								</ul>
							</li>

							<li id="navi16"><span>설정&middot;관리</span>
								<ul>
									<li><a href="javascript:void(0);" role="button" @click.prevent="changeMode">모드 설정<span class="pin purple">NEW</span></a></li>
									<li><a href="javascript:void(0);" role="button" @click.prevent="fn_openPopup('MAMA4005')">캐릭터 설정<span class="pin purple">NEW</span></a></li>
								</ul>
							</li>
                        </ul>
                    </nav>
                </section>
                <!-- 청소년모드 End -->
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
    import COCO4116 from '@/views/page/CO/CO/COCO4116/COCO4116' // 자주하는 질문
    import COAT1104 from '@/views/page/CO/AT/COAT1104/COAT1104'
    import MRAT4001 from '@/views/page/MR/AT/MRAT4001/MRAT4001'
    import MRCA4001 from '@/views/page/MR/CA/MRCA4001/MRCA4001'
    import MAGU4C01 from '@/views/page/MA/GU/MAGU4C01/MAGU4C01'
    import COCO4051 from '@/views/page/CO/CO/COCO4051/COCO4051'
    import COCO1130 from '@/views/page/CO/CO/COCO1130/COCO1130'
    import MAMA4005 from '@/views/page/MA/MA/MAMA4005/MAMA4005'
    import OXTP0001 from '@/views/page/OX/TP/OXTP0001/OXTP0001'
    import OXTP0006 from '@/views/page/OX/TP/OXTP0006/OXTP0006'

    import FootersV2 from "@/views/layout/FootersV2.vue"

    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'
    import appService from '@/service/appService'
    import routerService from '@/service/routerService'
    import {mapGetters} from 'vuex'
    import {dateFormat} from '@/utils/date'
    
    export default {
        name : "MRMR4C01",
        data: () => {
            return {
                cusnm       : "",	// 고객명
                cusNb       : "",   // 고객번호
                anwAncYn    : "",
                port        : "",
                inteList    : [],   // 관심서비스 목록
                avatarImg   : '',   // 캐릭터 이미지
                avatarList  : [
                    {id: 'myAvatarId01', class: 'mentor'},
                    {id: 'myAvatarId02', class: 'master'},
                    {id: 'myAvatarId03', class: 'saving'},
                    {id: 'myAvatarId04', class: 'invest'},
                    {id: 'myAvatarId05', class: 'economist'},
                    {id: 'myAvatarId06', class: 'insure'},
                    {id: 'myAvatarId07', class: 'credit'},
                    {id: 'myAvatarId08', class: 'loan'},
                ],
                eventOxInfo : {},
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
                // 캐릭터 아이콘 설정
                this.avatarImg = this.avatarList.find(item => item.id == this.getMyAvatar())?.class || 'mentor'

                this.getEventOXInfo()
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
            fn_openPopup(pageId, param) {
                let compName = ''
                if(pageId === 'COAT1104') {
                    compName = COAT1104	//
                }else if(pageId === 'MRCA4001') {
                    compName = MRCA4001	//
                }else if(pageId === 'MRAT4001') {
                    compName = MRAT4001	//
                }else if(pageId === 'COCO1104') {
                    compName = COCO1104	// 공지사항
                }else if(pageId === 'COCO4116') {
                    compName = COCO4116	// 자주하는 질문
                }else if(pageId === 'COCO1130') {
                    compName = COCO1130 // 프로필
                }else if(pageId === 'MAGU4C01') {
                    compName = MAGU4C01 // 청소년모드 서비스소개
                }else if(pageId === 'MAMA4005') {
                    compName = MAMA4005 // 캐릭터설정
                }
                
                const config = {
					component: compName,
                    params: param,
                }
                // this.close()
				modalService.openPopup(config).then((response) => {
                    if(pageId === 'MAMA4005') {
                        if(response?.isSave) {
                            // 캐릭터 아이콘 설정
                            this.avatarImg = this.avatarList.find(item => item.id == this.getMyAvatar())?.class || 'mentor'
                        }
                    }else if(pageId === 'OXTP0001' && response === 'ok'){
                        this.eventOxInfo.quizPrgYn = '1'    //참여
                        this.fn_openPopup('OXTP0006', this.eventOxInfo)   //도전현황
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
            // 캐릭터 명칭 설정
            getCharName(avatarImg) {
                /**
                 *  금융멘토 : mentor
                 *  디지털금융달인 : master
                 *  저축왕 : saving
                 *  투자천재 :invest
                 *  절약마스터 : economist
                 *  보험수호자 : insure
                 *  신용지킴이 : credit
                 *  대출코치 : loan
                 */
                let rtnStr = ''
                switch(avatarImg) {
                    case 'mentor': 
                        rtnStr = '금융멘토'
                        break
                    case 'master':
                        rtnStr = '디지털금융달인'
                        break
                    case 'invest':
                        rtnStr = '투자천재'
                        break
                    case 'economist':
                        rtnStr = '절약마스터'
                        break
                    case 'insure':
                        rtnStr = '보험수호자'
                        break
                    case 'credit':
                        rtnStr = '신용지킴이'
                        break
                    case 'loan':
                        rtnStr = '대출코치'
                        break
                    default: 
                        rtnStr = '금융멘토'
                        break
                }

                return rtnStr
            },
            //ox퀴즈 정보 조회
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
                            "mydtCusno" : this.getUserInfo("mydtCusno"),
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
            //ox퀴즈 참여여부 조회
            getEventOXJoin(){
                if(!this.eventOxInfo.bltnDt){
                    modalService.alert("OX퀴즈를 준비하고 있어요.")
                }else{
                    if(this.eventOxInfo.quizPrgYn === '1'){
                        this.fn_openPopup('OXTP0006', this.eventOxInfo)   //도전현황
                    }else{
                        this.fn_openPopup('OXTP0001', this.eventOxInfo)   //ox문제
                    } 
                }
            },
        },
        components : {
            // Page
            FootersV2,
        }
    }
</script>