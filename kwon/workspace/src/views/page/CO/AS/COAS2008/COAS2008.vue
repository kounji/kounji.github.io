<!--
/*************************************************************************
* @ 서비스경로 : 자산관리 서비스 가입 > 권유직원 선택 팝업
* @ 페이지설명 : 권유직원 선택
* @ 파일명     : src/views/page/CO/AS/COAS2008/COAS2008.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-07-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-04              CS528069              최초작성
* 2023-08-23              CS533035              화면번호수정(COAS1008->COAS2008)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>권유직원 찾기</h1>
		</div>
		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->

			<!-- 검색 영역 S -->
            <div class="com_inner com_line_type01">
                <div class="com_tabmenu_type03 custom_tab">
                    <ul role="tablist">
                        <li role="presentation" aria-controls="tab_01" :class="isFirstTab ? 'on' : ''" @click.prevent="fn_chngTab('1')"><a href="javascript:void(0);" role="tab" :aria-selected="isFirstTab"><span>직원명</span></a></li>
                        <li role="presentation" aria-controls="tab_02" :class="!isFirstTab ? 'on' : ''" @click.prevent="fn_chngTab('2')"><a href="javascript:void(0);" role="tab" :aria-selected="!isFirstTab"><span>사원번호</span></a></li>
                    </ul>
                </div>
                <div class="tab_wrap">
                    <div role="tabpanel" id="tab_01" class="cmm-tab-panel" :class="isFirstTab? 'on' : ''">
                        <div class="com_input_type02" v-if="isFirstTab">
                            <input type="search" id="txt01" class="inputClear" name="" value="" v-model="keyword" placeholder="직원을 검색하세요" title="직원을 검색" @keyup.enter="searchEmpInfo()" ref="tab_01">
                            <a href="javascript:void(0);" role="button" class="com_btn_delete" v-if="keyword.length > 0" @click="clearText()"><span class="blind">삭제</span></a>
                            <a href="javascript:void(0);" role="button" class="com_btn_search" @click.prevent="searchEmpInfo()"><span class="blind">검색</span></a>
                        </div>
                    </div>
                    <div role="tabpanel" id="tab_02" class="cmm-tab-panel" :class="!isFirstTab? 'on' : ''">
                        <div class="com_input_type02" v-if="!isFirstTab">
                            <input type="search" id="txt01" class="inputClear" name="" value="" v-model="keyword" placeholder="사원번호 검색하세요" title="사원번호 검색" @keyup.enter="searchEmpInfo()" ref="tab_02">
                            <a href="javascript:void(0);" role="button" class="com_btn_delete" v-if="keyword.length > 0" @click="clearText()"><span class="blind">삭제</span></a>
                            <a href="javascript:void(0);" role="button" class="com_btn_search" @click.prevent="searchEmpInfo()"><span class="blind">검색</span></a>
                        </div>
                    </div>
                </div>
            </div>
			<!-- 검색 영역 E -->

			<!-- 결과 영역 S -->
			<div class="com_inner" v-if="isSearchYn">
                <template v-if="empList.length > 0">
                    <ul class="staff_result custom">
                        <li v-for="(item, idx) in empList" :key="idx">
                            <a href="javascript:void(0);" role="button" @click.prevent="setEmpInfo(item)">
                                <dl>
                                    <dt>{{item.empnm | maskingFilter("name")}}</dt>
                                    <dd class="num">{{maskingData(item.eno)}}</dd>
                                </dl>
                                <p class="branch">{{item.brnm}}</p>
                            </a>
                        </li>
                    </ul>
                    <div class="com_btn_area02" v-show="isNextDataYn==='Y'"><a href="javascript:void(0);" @click="moreNextList()" class="com_btn_more"><span>더보기</span></a></div>
                </template>
                <template v-else>
                    <div class="no_data_list">
                        <p>검색 결과가 없습니다.</p>
                    </div>
                </template>
			</div>
			<!-- 결과 영역 E -->
		</div>

		<!-- <a href="javascript:void(0);" class="btn_close"><span class="blind">팝업닫기</span></a> -->
		<a href="javascript:void(0);" class="btn_close txt_cancel" @click.prevent="closePopup()"><span>취소</span></a>		

	</div>
	<!--// full popup E -->
</template>

<script>
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    export default {
        name: 'COAS2008',
        data: () => {
            return {
                isFirstTab      : true, // 첫번째 탭 선택 여부
                empList         : [],   // 권유직원 리스트
                empType	        : "01",	// 검색타입 01:성명, 02:사번
                keyword         : "",   // 검색 키워드
                isNextDataYn    : "N",  // 다음 데이터 존재 여부
                pageNo          : "",   // send 파라미터 내 페이지번호
                isSearchYn      : false,// 검색여부
            }
        },
        computed: {
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        created() {
            
        },
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
                this.fn_chngTab('1')
            },

            /* Tab 변경 */
            fn_chngTab(tabIdx) {
                this.keyword = ""
                this.isSearchYn = false
                this.pageNo = 1

                if(tabIdx === '1') {
                    this.isFirstTab = true
                    this.empType = '01'     // 검색타입 01 : 성명

                    this.$nextTick(() => {
                        this.$refs.tab_01.focus()
                    })
                } else {
                    this.isFirstTab = false
                    this.empType = '02'     // 검색타입 02 : 사번

                    this.$nextTick(() => {
                        this.$refs.tab_02.focus()
                    })
                }
            },

            /* 'x'버튼 클릭 */
            clearText() {
                this.isSearchYn = false
                this.pageNo = 1
                this.keyword = ""
            },

            /* 권유직원 검색 */
            searchEmpInfo() {
                if(this.keyword === "") {
                    if(this.empType === '01') {
                        // 성명검색
                        modalService.alert("권유직원을 입력해주세요.", "", "확인")
                        return
                    } else {
                        // 사번검색
                        modalService.alert("사번을 입력해주세요.", "", "확인")
                        return
                    }
                }

                this.empList   = [] //초기화

                const config = {
                    url : '/co/as/04r01',
                    data : {
                        pageNo  : this.pageNo,  // 페이지번호
                        empType : this.empType, // 검색타입 01 : 이름, 02 : 사번
                        keyword : this.keyword, // 검색키워드
                    }
                }
                apiService.call(config).then(response => {
                    this.isSearchYn = true

                    this.empList = response.empList || []

                    this.isNextDataYn = response.nxDataYn || "N"
                    
                })
            },

            /* 더보기 */
            moreNextList() {
				this.pageNo = this.pageNo +1

				const config = {
                    url: '/co/as/04r01',
                    data : {
						pageNo  	: this.pageNo,		//페이지번호
						empType 	: this.empType,		//검색타입 01:이름, 02:사번
                        keyword   	: this.keyword,		//검색키워드
                    }
                }
                apiService.call(config).then(response => {
					let tmpEmpList = response.empList || []

					this.isNextDataYn = response.nxDataYn

					if(this.empList.length > 0) {
                        for(let i=0; i< tmpEmpList.length; i++) {
                            this.empList.push(tmpEmpList[i])
                        }
                    } else {
                        this.empList = tmpEmpList
                    }
                })
			},

            /* 사번 마스킹 */
            maskingData(sVal) {
				if(sVal && sVal.length >= 2){
					if(sVal.length == 2) {
						return sVal.slice(0,-1) + "*"
					} else {
						var maskText2 = ""
						for(var j=2 ; j<sVal.length-2 ; j++){
							maskText2 += "*"
						}
						return sVal.substr(0,2) + maskText2 + sVal.substr(sVal.length-2);
					}
				} else {
					return;
				}
            },
            
            /* 권유직원 선택 */
            setEmpInfo(enoInfo) {
                this.close({selectEno : enoInfo})
            },

            /* 팝업닫기 */
            closePopup() {
                this.close()
            }
        },
        components: {      
            
        },
    }
    
</script>