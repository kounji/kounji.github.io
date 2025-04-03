<!--
/*************************************************************************
* @ 서비스경로 : 서비스 가입 > 권유직원 검색
* @ 페이지설명 : 권유직원 검색
* @ 파일명     : src/views/page/CO/AS/COAS4008/COAS4008.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-02-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-17              CS541599              최초작성(COAS2008->COAS4008)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01">
		 
		<div class="popup_header">    
			<h1>권유직원 찾기</h1>
		</div>

		<div class="popup_content">
            <ul role="tablist" class="tablist">
                <li :class="isFirstTab ? 'on' : ''"><button type="button" role="tab" @click.prevent="fn_chngTab('1')" :aria-selected="isFirstTab">직원명</button></li>
                <li :class="!isFirstTab ? 'on' : ''"><button type="button" role="tab" @click.prevent="fn_chngTab('2')" :aria-selected="!isFirstTab">개인번호</button></li>
            </ul>

            <section class="find_staff flex_cont">

                <div class="formItem">
                    <div class="input">
                        <input type="text" name="" :title="isFirstTab ? '직원명':'개인번호'" v-model="keyword" :placeholder="isFirstTab ? '직원명':'개인번호'+'를 입력해주세요.'"/>
                        <button type="button" class="btn_search" @click.prevent="searchEmpInfo()"><span class="blind">검색</span></button>
                    </div>
                </div>

                <!--검색결과-->
                <div class="scroller">
                    <!--결과 있음-->
                    <div class="search_result" v-if="empList.length &gt; 0">
						<p class="sum">검색 결과 <em>{{empList.length}}</em>건</p>

						<ul>
							<li v-for="(item, idx) in empList" :key="idx">
                                <input type="radio" name="staff" :id="'staff'+idx" @change.prevent="setEmpInfo(item)"/>
                                <label :for="'staff'+idx">
                                    <span class="name">{{item.empnm | maskingFilter("name")}}<em class="num">({{maskingData(item.eno)}})</em></span>
                                    <span class="branch">{{item.brnm}}</span>
                                    <span>{{item.brAdr}}</span>
                                </label>
                            </li>
						</ul>

                        <button type="button" class="btn_more_txt" v-if="isNextDataYn==='Y'" @click.prevent="moreNextList()">더보기</button>
                    </div>

                    <!--결과 없음-->
                    <div class="no_result" v-else>
                        <p class="text">검색 결과가 없어요.</p><!-- [v4.0] 25-02-11 문구수정 -->
                        <!-- [v4.0] 배경이미지 로티json으로 변경 -->
						<div class="bg">
							<!--<lottie-player src="../../../../src/assets_v40/images/lottie/bg_no_result.json" loop="" autoplay="" aria-hidden="true" class="bg_no_result" background="transparent"></lottie-player>-->
						</div>
						<!-- //[v4.0] 배경이미지 로티json으로 변경 -->
                    </div>
                </div>
                <!--//검색결과-->                
            </section>
		</div>

        <div class="popup_footer fixed">
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" @click.prevent="rtnEmpInfo()">확인</button>
            </div>
        </div>
        
		<a href="#nolink" role="button" class="btn_close" @click.prevent="closePopup()"><span class="blind">팝업닫기</span></a>
		
	</div>
	<!--// full popup E -->
</template>

<script>
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {fncSlick_Terms} from '@/utils/slick'

export default {
    name: 'COAS4008',
    data: () => {
        return {
            isFirstTab      : true,  // 첫번째 탭 선택 여부
            empList         : [],    // 권유직원 리스트
            empType	        : "01",	 // 검색타입 01:성명, 02:사번
            keyword         : "",    // 검색 키워드
            isNextDataYn    : "N",   // 다음 데이터 존재 여부
            pageNo          : "",    // send 파라미터 내 페이지번호
            isSearchYn      : false, // 검색여부
            selEmpInfo      : "",    // 선택한 권유직원 정보
            initFlag        : true,  // 부모 검색어 세팅용
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
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: { 
        initComponent(param = {}) {
            this.keyword = param.invtEmpnm
            this.getData()
        },
        getData() {
            this.fn_chngTab('1')
        },

        /* Tab 변경 */
        fn_chngTab(tabIdx) {
            this.pageNo = 1

            if(this.initFlag) {
                this.initFlag = false
                this.searchEmpInfo()

            } else {
                this.keyword = ""
                this.isSearchYn = false
            }
            

            if(tabIdx === '1') {
                this.isFirstTab = true
                this.empType = '01'     // 검색타입 01 : 성명

                this.$nextTick(() => {
                    //this.$refs.tab_01.focus()
                })
            } else {
                this.isFirstTab = false
                this.empType = '02'     // 검색타입 02 : 사번

                this.$nextTick(() => {
                    //this.$refs.tab_02.focus()
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
        setEmpInfo(empInfo) {
            this.selEmpInfo = empInfo
        },

        /* 권유직원 리턴 */
        rtnEmpInfo() {
            this.close({empObj : this.selEmpInfo})
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