<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표 > 목표등록
* @ 페이지설명 : 금융과생활 > 나의목표 > 목표등록 > 버킷리스트 > 자동차 검색
* @ 파일명     : src\views\page\PD\MY\PDMY2048\PDMY2048.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-08-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-19              CS516033              최초작성
* 2022-09-21              CS528061              고도화 개발
* 2023-08-04              CS533453              고도화 파일명 변경(PDMY1113.vue -> PDMY2048.vue)
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>자동차 검색</h1>
        </div>
        <div class="popup_content com_no_bottom com_bg_type00">
            <div class="com_inner com_line_type01 com_top_type02">
                <div class="com_input_type02">
                    <label for="PDMY2048_txt01"></label>
                    <input type="search" id="PDMY2048_txt01" :value="PDMY2048_srchKwrd" ref="PDMY2048_srchKwrd" @keyup="fn_checkWord($event, 40)" @keyup.enter="fn_searchCarList(PDMY2048_srchKwrd)" @keyup.delete="fn_clearData" placeholder="브랜드명으로 찾기" title="브랜드명으로 찾기">
                    <a v-show="PDMY2048_srchKwrd.length>0" @click.prevent="del('PDMY2048_srchKwrd')" class="com_btn_delete" href="javascript:void(0);"><span class="blind">삭제</span></a>
                    <a @click.prevent="fn_searchCarList(PDMY2048_srchKwrd)" class="com_btn_search" href="javascript:void(0);"><span class="blind">검색</span></a>
                </div>
                <div class="com_btnarea_top limit2">
                    <a @click.prevent="fn_searchCarList('현대')"    class="com_btn_txtsearch" href="javascript:void(0);"><span>#현대</span></a>
                    <a @click.prevent="fn_searchCarList('기아')"    class="com_btn_txtsearch" href="javascript:void(0);"><span>#기아</span></a>
                    <a @click.prevent="fn_searchCarList('벤츠')"    class="com_btn_txtsearch" href="javascript:void(0);"><span>#벤츠</span></a>
                    <a @click.prevent="fn_searchCarList('BMW')"     class="com_btn_txtsearch" href="javascript:void(0);"><span>#BMW</span></a>
                    <a @click.prevent="fn_searchCarList('아우디')"   class="com_btn_txtsearch" href="javascript:void(0);"><span>#아우디</span></a>
                    <a @click.prevent="fn_searchCarList('폭스바겐')" class="com_btn_txtsearch" href="javascript:void(0);"><span>#폭스바겐</span></a>
                    <a @click.prevent="fn_searchCarList('볼보')"    class="com_btn_txtsearch" href="javascript:void(0);"><span>#볼보</span></a>
                    <a @click.prevent="fn_searchCarList('테슬라')"  class="com_btn_txtsearch" href="javascript:void(0);"><span>#테슬라</span></a>
                </div>
            </div>
            <template v-if="brandList.length > 0">
                <div class="com_inner com_boxarea_type01">
                    <ul class="com_slide_check_type01">
                        <li v-for="(brandInfo, index) in brandList" :key="index">
                            <a @click.prevent="fn_searchGradeList(brandInfo.carBrannm, brandInfo.carSrisNo, brandInfo.carSrisNm, brandInfo.carModlNo, brandInfo.vhcModlnm)" href="javascript:void(0);">
                                <dl>
                                    <dt>{{brandInfo.carBrannm}} {{brandInfo.vhcModlnm}}</dt>
                                    <dd v-if="pdmyUserAgent == 'else'"><img src="@/assets/images/icon/car_new06.png" :alt="brandInfo.carBrannm.concat(' ', brandInfo.vhcModlnm)"></dd>
                                    <dd v-else>
                                        <img v-if="brandInfo.carCtrimBscImgPathnm != null || brandInfo.carCtrimBscImgPathnm != ''" :src="fn_setImgUrl(brandInfo.carCtrimBscImgPathnm)" :alt="brandInfo.carBrannm + ' ' + brandInfo.vhcModlnm" @error="emptyImg">
                                        <img v-else src="@/assets/images/icon/car_new06.png" :alt="brandInfo.carBrannm + ' ' + brandInfo.vhcModlnm">
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
            </template>
			<template v-else-if="isSrch">
				<div class="no_data_box">
					<div class="no_data_list">
						<p>조회된 정보가 없습니다.</p>
					</div>
				</div>
			</template>
        </div>

        <a class="btn_close" @click.prevent="close()" href="javascript:void(0);"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import appService from '@/service/appService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {checkWord} from '@/utils/data'
    import PDMY2049 from '@/views/page/PD/MY/PDMY2049/PDMY2049'

    export default {
        name : "PDMY2048",
        data: () => {
            return {
                pdmyUserAgent       : "",       // 실행플랫폼 (ios, android, else)
                carBrannm           : "",       // 브랜드명
                carSrisNo           : "",       // 자동차시리즈번호
                carSrisNm           : "",       // 자동차시리즈명
                vhcModlnm           : "",       // 차량모델명
                brandList           : [],       // 신차기본목록
                gradeList           : [],       // 신차등급목록
                PDMY2048_srchKwrd   : "",       // 검색어
                carModlNo           : "",       // 자동차모델번호
                carCtrimNo          : "",       // 자동차트림번호
                carLineupNm         : "",       // 자동차라인업명
                carCtrimNm          : "",       // 자동차트림명
                carCtrimSelAm       : "",       // 자동차트림판매금액
                carLineupMdyrNm     : "",       // 자동차라인업연식명
                isSrch	            : false,    // 검색유무flag

                basyy:"", // 기준년도
                basmm:"", // 기준월
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent();

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);

            setTimeout(() => {
                this.$refs.PDMY2048_srchKwrd.focus()
            }, 100)
        },
        methods: {
            initComponent() {

                // 실행플랫폼
                // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
                if(this.getUserInfo('chnl') === '385') {
                    this.pdmyUserAgent = appService.getUserAgent()
                } else if(this.getUserInfo('chnl') === '386') {
                    // 기기로 접속하였을 경우는 true
                    if((window.$SMNATIVE.getOS('A') == true && window.$SMNATIVE.getOS('I') == false) || (window.$SMNATIVE.getOS('A') == false && window.$SMNATIVE.getOS('I') == true)) {
                        this.pdmyUserAgent = 'cok'
                    } else {
                        this.pdmyUserAgent = 'else'
                    }
                }
            },
            getData() {
                const config = {
                    url: '/pd/my/30r02',  // '/pd/my/13r01',
                    data: {"carBrannm": this.carBrannm}
                };

                apiService.call(config).then(response => {
                    this.isSrch = true
                    this.brandList = response.brandList || []

                    this.$refs.PDMY2048_srchKwrd.blur()
                });
            },
            // 신차등급목록 조회
            fn_searchGradeList(carBrannm, carSrisNo, carSrisNm, carModlNo, vhcModlnm) {
                
                this.carBrannm = carBrannm
                this.carSrisNo = carSrisNo
                this.carSrisNm = carSrisNm
                this.carModlNo = carModlNo
                this.vhcModlnm = vhcModlnm

                const config = {
                    url: '/pd/my/30r03',  // '/pd/my/20ra1',
                    data: {"carModlNo": this.carModlNo}
                };

                apiService.call(config).then(response => {
                    this.gradeList = response.gradeList || []

                    if(this.gradeList.length > 0) {

                        const popConfig = {
                            params : {
                                gradeList : this.gradeList,
                            },
                            renderer : {
                                component : PDMY2049
                            }
                        }

                        modalService.openSlidePagePopup(popConfig).then(response => {

                            this.carCtrimNo    = response.carCtrimNo
                            this.carCtrimNm    = response.carCtrimNm
                            this.carLineupNm   = response.carLineupNm
                            this.carCtrimSelAm = response.carCtrimSelAm
                            this.basyy         = response.basyy
                            this.basmm         = response.basmm

                            const rtnParam = {
                                carBrannm     : this.carBrannm,                                   // 자동차브랜드명
                                carSrisNo     : this.carSrisNo,                                   // 자동차시리즈번호
                                carSrisNm     : this.carSrisNm,                                   // 자동차시리즈명
                                vhcModlnm     : this.vhcModlnm,                                   // 차량모델명
                                carCtrimNo    : this.carCtrimNo,                                  // 자동차트림번호
                                carModlNo     : this.carModlNo,                                   // 자동차모델번호
                                carCtrimNm    : this.carLineupNm.concat(' ', this.carCtrimNm),    // 자동차트림명
                                carCtrimSelAm : this.carCtrimSelAm,                               // 자동차판매가격
                                basyy         : this.basyy,                                       // 기준년도
                                basmm         : this.basmm,                                       // 기준월
                            }
                            this.close(rtnParam)
                        })
                    }
                });
            },
            // 글자수 체크
            fn_checkWord(event, maxByte) {
                let rtnObj = checkWord(event.target.value, maxByte)

                if(rtnObj.flag) {this.$refs.PDMY2048_srchKwrd.blur()}   // 알럿 중복 방지

                event.target.value = rtnObj.value
                this.PDMY2048_srchKwrd = event.target.value
            },
            fn_searchCarList(carBrannm) {

                this.carBrannm = carBrannm
                this.PDMY2048_srchKwrd = carBrannm

                if(this.PDMY2048_srchKwrd.length < 1) {
                    modalService.alert("브랜드명을 입력해주세요.")
                    this.$refs.PDMY2048_srchKwrd.blur()
                    return false
                }

                // 신차목록 조회
                this.getData()
            },
            del(type) {
                if(type === 'PDMY2048_srchKwrd') {
                    this.carBrannm = ''
                    this.PDMY2048_srchKwrd = ''
                    this.isSrch = false
                    this.brandList = []
                    this.gradeList = []
                }
            },
            fn_clearData() {
                this.isSrch = false
                this.brandList = []
                this.gradeList = []
            },
            fn_setImgUrl(imgPathnm){
			    return 'http://nhcok.cardong.co.kr/img/' + imgPathnm
		    },
            emptyImg(e, idx) {
                e.target.src = new URL("@/assets/images/icon/car_new06.png", import.meta.url).href
            },
        }
    }
</script>