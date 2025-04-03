<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 마이농가설정 > 작목재배지 등록/수정 > 작목설정
* @ 페이지설명 : 작목설정
* @ 파일명     : src/views/page/SZ/ST/SZST2103/SZST2103.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-21              CS515729                 최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>작목 설정</h1>
		</div>
			
		<div class="popup_content com_no_bottom com_bg_type00">
            <template v-if="stepId === 'step0'">
                <div class="com_inner">
                    <strong class="com_box_tit04">작목 설정</strong>
                    <div class="com_input_type02">
                        <label for="txt01"></label>
                        <input type="search" id="txt01" class="" name="" :value="srchNm" ref="srchNm" @keyup="fn_checkWord($event, 10)" placeholder="작목 검색" 
                               title="작목 검색" @keyup.enter="fn_searchWrsInfo()">				
                        <a href="javascript:void(0);" @click="fn_delSrchNm()" class="com_btn_delete" v-if="srchNm.length > 0"><span class="blind">삭제</span></a>
                        <a href="javascript:void(0);" @click="fn_searchWrsInfo()" class="com_btn_search"><span class="blind">검색</span></a>
                    </div>

                    <div class="set_list">
                        <ul class="list_type_02">
                            <li v-for="(item, idx) in abiList" :key="idx">
                                <a href="javascript:void(0);" @click="fn_selectedWrsInfo(item)">
                                    <div class="depth_list">
                                        <span>{{item.naWrsLclfnm}}</span>
                                        <span>{{item.naWrsMclfnm}}</span>
                                        <span>{{item.naWrsSclfnm}}</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>

            <template v-if="searchFlag === false">

                <div class="com_bg_type00 com_top_type01">
                    <div class="com_inner">
                        <div class="com_title">
                            <div class="tit bold sm" v-if="stepId === 'step0'">대분류를 선택해 주세요.</div>
                            <div class="tit bold sm" v-if="stepId === 'step1'">중분류를 선택해 주세요.</div>
                            <div class="tit bold sm" v-if="stepId === 'step2'">소분류를 선택해 주세요.</div>
                        </div>
                        <div class="cate_wrap mt15">
                            <template v-if="stepId === 'step1'">
                                {{selNaWrsLclfnm}}
                            </template>
                            <template v-if="stepId === 'step2'">
                                {{selNaWrsLclfnm}} <span class="bar"></span> {{selNaWrsMclfnm}}
                            </template>
                        </div>
                    </div>
                </div> 

                <div class="com_inner com_bg_type00">
                    <template v-if="stepId === 'step0'">
                        <ul class="com_radio_type03">
                            <li v-for="(item, idx) in lclcList" :key="'wrsl'+idx">
                                <div class="btn_radio">
                                    <input type="radio" name="house" :id="'wrsl'+idx"  @change="fn_setWrslInfo(item)">
                                    <label :for="'wrsl'+idx">
                                        <span>{{item.naWrsLclfnm}}</span>			
                                    </label>	
                                </div>	
                            </li>
                        </ul>
                    </template>

                    <template v-if="stepId === 'step1'">
                        <ul class="com_radio_type03">
                            <li v-for="(item, idx) in mclcList" :key="'wrsm'+idx">
                                <div class="btn_radio">
                                    <input type="radio" name="house" :id="'wrsm'+idx"  @change="fn_setWrsmInfo(item)">
                                    <label :for="'wrsm'+idx">
                                        <span>{{item.naWrsMclfnm}}</span>			
                                    </label>	
                                </div>	
                            </li>
                        </ul>
                    </template>

                    <template v-if="stepId === 'step2'">
                        <ul class="com_radio_type03">
                            <li v-for="(item, idx) in sclcList" :key="'wrss'+idx">
                                <div class="btn_radio">
                                    <input type="radio" name="house" :id="'wrss'+idx"  @change="fn_setWrssInfo(item)">
                                    <label :for="'wrss'+idx">
                                        <span>{{item.naWrsSclfnm}}</span>			
                                    </label>	
                                </div>	
                            </li>
                        </ul>
                    </template>

                </div>
            </template>

		</div>

        <a href="javascript:void(0);" class="btn_back" v-on:click.prevent="fn_moveBack()" v-if="backYn"><span class="blind">이전화면</span></a>
		<a href="javascript:void(0);"  @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
	import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {checkWord} from '@/utils/data'
    
    export default {
        name : "SZST2103",
        data: () => {
            return {
                respInfo      : {}, //검색결과
                srchNm        : "", //검색어
                abiList       : [], //검색결과목록
                searchFlag    : false,

                respLInfo     : {}, //검색결과 대분류
                lclcList      : [], //대분류
                respMInfo     : {}, //검색결과 중분류
                mclcList      : [], //중분류
                respSInfo     : {}, //검색결과 소분류
                sclcList      : [], //소분류
                selNaWrsLclc : "",
                selnaWrsLclfnm : "",
                selNaWrsMclc : "",
                selNaWrsMclfnm : "",
                selNaWrsSclc : "",
                selnaWrsSclfnm : "",

                backYn   : false,
                stepId  : "step0",  //default page
            }
        },
		computed: {
            getSearchYn() {
				return (this.srchNm.length > 0) ? true : false
            },
        },
        mixins: [
            popupMixin,
            commonMixin
		],
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
		methods: {
			initComponent() {
				this.getData()
			},
			getData() {
                //작목대분류 조회
				const config = {
                    url: '/sz/st/03r02',
                    data: {
						"mydtCusno" : this.getUserInfo("mydtCusno")
					}
                }
                apiService.call(config).then(response => {
					this.respLInfo = response
                    this.lclcList = this.respLInfo.lclcList || []
				})
            },
            fn_checkWord(event, maxByte) {
				let rtnObj = checkWord(event.target.value, maxByte)

				if(rtnObj.flag) {this.$refs.srchNm.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.srchNm = event.target.value
			},
            fn_delSrchNm() {
                //검색어삭제
                this.srchNm = ""

                if(this.searchFlag === true) {
                    this.getData()
                    this.searchFlag = false
                    this.abiList = [] //검색결과초기화
                }
                
            },
            fn_searchWrsInfo() {
                if(this.srchNm === "") {
                    modalService.alert("검색어를 입력하세요.")
                    return
                }
				const config = {
                    url: '/sz/st/03r01',
                    data: {
                        "mydtCusno" : this.getUserInfo("mydtCusno"),
                        "srchNm" : this.srchNm
					}
                }
                apiService.call(config).then(response => {
					this.respInfo = response
                    this.abiList = this.respInfo.abiList || []
				})

                this.searchFlag = true

            },
            fn_selectedWrsInfo(info) {
                
                this.selNaWrsLclc = info.naWrsLclc
                this.selNaWrsLclfnm = info.naWrsLclfnm
                this.selNaWrsMclc = info.naWrsMclc
                this.selNaWrsMclfnm = info.naWrsMclfnm
                this.selNaWrsSclc = info.naWrsSclc
                this.selNaWrsSclfnm = info.naWrsSclfnm
                this.fn_closePopup()
            },
			fn_searchWrsMList() {
                //작목중분류 조회
				const config = {
                    url: '/sz/st/04r01',
                    data: {
                        "mydtCusno" : this.getUserInfo("mydtCusno"),
                        "naWrsLclc" : this.selNaWrsLclc
					}
                }
                apiService.call(config).then(response => {
					this.respMInfo = response
                    this.mclcList = this.respMInfo.mclcList || []
				})
            },
			fn_searchWrsSList() {
                //작목소분류 조회
				const config = {
                    url: '/sz/st/04r02',
                    data: {
                        "mydtCusno" : this.getUserInfo("mydtCusno"),
                        "naWrsLclc" : this.selNaWrsLclc,
                        "naWrsMclc" : this.selNaWrsMclc,
					}
                }
                apiService.call(config).then(response => {
					this.respSInfo = response
                    this.sclcList = this.respSInfo.sclcList || []
				})
            },
            fn_setWrslInfo(info) {
                this.selNaWrsLclc = info.naWrsLclc
                this.selNaWrsLclfnm = info.naWrsLclfnm
                this.stepId = "step1"
                this.backYn = true
                this.fn_searchWrsMList()
            },
            fn_setWrsmInfo(info) {
                this.selNaWrsMclc = info.naWrsMclc
                this.selNaWrsMclfnm = info.naWrsMclfnm
                this.stepId = "step2"
                this.backYn = true
                this.fn_searchWrsSList()
            },
            fn_setWrssInfo(info) {
                this.selNaWrsSclc = info.naWrsSclc
                this.selNaWrsSclfnm = info.naWrsSclfnm
                this.fn_closePopup()
            },
            fn_closePopup() {
                let popParam = {
                    "naWrsLclc" : this.selNaWrsLclc, "naWrsLclfnm" : this.selNaWrsLclfnm,
                    "naWrsMclc" : this.selNaWrsMclc, "naWrsMclfnm" : this.selNaWrsMclfnm,
                    "naWrsSclc" : this.selNaWrsSclc, "naWrsSclfnm" : this.selNaWrsSclfnm
                }
                this.close(popParam)
            },
            fn_moveBack() {
                if(this.stepId === "step2") {
                    this.stepId = "step1"
                    this.selNaWrsMclc  = ""
                    this.selNaWrsMclfnm = ""
                    this.backYn = true
                    this.fn_searchWrsMList()    //중분류조회
                } else if(this.stepId === "step1") {
                    this.stepId = "step0"
                    this.selNaWrsLclc   = ""
                    this.selNaWrsLclfnm = ""
                    this.getData()
                    this.backYn = false
                }
            }
        }
    }
</script>