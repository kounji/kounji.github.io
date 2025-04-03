<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 농기계임대
* @ 페이지설명 : 농기계임대 메인-맞춤검색-업체 검색(POP)
* @ 파일명     : src/views/page/SZ/FL/SZFL2105/SZFL2105.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-07
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-07              		                최초작성
* 2021-07-14			  CS515897				화면수정
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01"> 
        <!--상단(Titley)-->	
        <div class="popup_header">    
            <h1>업체</h1>
        </div>
        <!--상단(Titley)-->	
        
        <!--메인(BODY)-->	
        <div class="popup_content com_bg_type00">

            <!--조건 검색(Start)-->	
            <div class="com_inner com_list_type01 com_line_type01 com_top_type02">
                <div class="com_input_type02">
                    <label for="txt01"></label>
                    <input type="search" id="txt01" placeholder="업체명을 입력하세요 (예: 대동공업)" title="업체명을 입력하세요 (예: 대동공업)" @focus="spyConm = ''" :value="spyConm" @keyup="fn_ValidChk, fn_checkWord($event, 30)" @keyup.enter="getSearchList" ref="spyConm">
                    <a href="javascript:void(0);" class="com_btn_delete"  @click.prevent="delteSearchWord"><span class="blind">삭제</span></a>
                    <a href="javascript:void(0);" class="com_btn_search"  @click.prevent="getSearchList"><span class="blind">검색</span></a>
                </div>
            </div>
            <!--조건 검색(End)-->	

            <!--조건내용(Start)-->	
            <template v-if="pageShowYn"> <!--검색결과가 true일 경우-->
                <template v-if="spyConmList.length == 0 && alertSearch != ''">
                    <div class="no_data_box">
                        <div class="no_data_list">
                            <p>검색 결과가 없습니다.</p>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="search_result_box store">
                        <ul class="com_checkbox_type01" data-ui-toggle="view">
                            <li  v-for="(spyConm, index) in spyConmList" :key="index">  
                                <input type="checkbox" :id="index" :value="spyConm.spyConm" v-model="selectedSpyConm" @click="fn_chkCnt($event)">
                                <label :for="index">
                                    <span>{{spyConm.spyConm}}</span>
                                </label>									
                            </li>
                        </ul>
                    </div>
                    <!-- 20211108 한별 접근성 role="button" 추가 S -->   
                    <div class="com_btn_area02" v-if="nxDataYn === 'Y'"><a href="javascript:void(0);" role="button" class="com_btn_more" @click.prevent="fn_showMore"><span>더보기</span></a></div>
                    <!--// 20211108 한별 접근성 role="button" 추가 E -->
                </template>
                <!---업체명 부분(End)-->
            </template>
            <!--조건내용(End)-->	
        </div>

        <!--하단(버튼)-->	
        <div class="popup_footer fixed">
            <div class="btn_half_box">
                <a href="javascript:void(0);" class="btn btn_grey" @click.prevent="reset">전체해제</a>
                <a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" v-on:click.prevent="applyList($event)">적용</a>
            </div>
        </div>
        <!--하단(버튼)-->	

        <a href="javascript:void(0);" @click.prevent="closePopup" class="btn_close txt_cancel"><span>닫기</span></a>
    </div>		
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import {checkWord} from '@/utils/data'

export default {
    name : 'SZFL2105',
    data: () => {
        return {
            spyConm         : "",   // 공급업체 검색명
            spyConmList     : [],   // 공급업체 리스트
            selectedSpyConm : [],   // 선택된 공급업체 리스트
            alertSearch     : "",
            pageShowYn      : false, // 페이지 표시에 대한 Y/N
            pageNo          : 1,    // 페이지 번호
            nxDataYn        : 'N',    // 다음페이지에 조회할 목록이 있는 경우 여부 (있음 : 1, 없음 : 0)

            chkTot : 0,
        }
    },

    created() {
        this.initComponent()
    },

    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },

    computed: {
        btnOnOff() {
            return this.selectedSpyConm.length > 0 ? "" : "btn_off"
        }
    },

    mixins: [
		commonMixin,
        popupMixin
	],

    methods: {
        initComponent() {
            
        },

        getData() {
        },

        //입력필드에서 값 입력후, '검색'이미지 클릭
        getSearchList() 
        {
            this.pageNo = 1 // 페이지번호 초기화

            //공백 검색에 대한 예외처리
            this.alertSearch = this.spyConm
            
            const config = {
                url : '/sz/fl/06r01',   
                data : {
                    spyConm : this.spyConm,     // (INPUT)공급업체명 = (변수)공급업체명
                    pageNo  : this.pageNo,      // 페이지번호
                }
            }
            apiService.call(config).then(response => {
                this.spyConmList = response.spyConmList || []
                this.nxDataYn = response.nxDataYn || 'N'

                this.pageShowYn = true

                this.$refs.spyConm.blur()
            })

        },

        //[닫기]버튼 클릭
        closePopup() {
            this.close("cancel");
        },

        //[적용]버튼 클릭
        applyList(e){
            if(e.target.className.indexOf("btn_off") != -1) {
                return false
            }

            let selectedList = []

            for(let i = 0; i < this.selectedSpyConm.length; i++) {
                selectedList.push({spyConm : this.selectedSpyConm[i]})   //공급업체 검색명 : 선택된 공급업체 리스트
            }

            const data = {
                name: 'SZFL2105',
                data: selectedList
            }
            this.close(data)
        },

        //[전체해제]버튼 클릭
        reset(){
            if(this.selectedSpyConm.length == 0) return

            const config = {
				content: ['선택항목을 전체 해제<br>하시겠습니까?'],
                title  : "",
            }
            modalService.confirm(config).then(text => {
                if(text === "예") {
                    this.selectedSpyConm.splice(0);   //선택된 공급업체 리스트 Array의 0번째데이틀 포함한 모든 요소 제거
                }
            })

        },

        //입력필드에서 값 입력후, 'X'이미지 클릭
        delteSearchWord(){
            this.spyConm = "";
        },

        // 입력필드에서 맨 앞 띄어쓰기 제거
        fn_ValidChk() {
            if(this.spyConm.length === 1 && this.spyConm.search(/\s/) === 0) {
                this.spyConm = ""
            }
        },

        // 체크요소 카운트
        fn_chkCnt(e) {
            if(e.target.checked) {
                if(this.selectedSpyConm.length > 4) {
                    modalService.alert("최대 5개까지만 선택가능합니다.").then(() => {
                        this.selectedSpyConm.pop()
                    })
                }
            }
        },

        // 글자수 체크 (검색란)
        fn_checkWord(event, maxByte) {
            let rtnObj = checkWord(event.target.value, maxByte)

            if(rtnObj.flag) {this.$refs.spyConm.blur()}   // 알럿 중복 방지

            event.target.value = rtnObj.value
            this.spyConm = event.target.value
        },

        // 더보기 버튼 클릭
        fn_showMore() {
            this.pageNo += 1    // 페이지 번호 증가

            const config = {
                url : '/sz/fl/06r01',   
                data : {
                    spyConm : this.alertSearch,     // (INPUT)공급업체명 = (변수)공급업체명
                    pageNo  : this.pageNo,          // 페이지번호
                }
            }
            apiService.call(config).then(response => {
                let pushList = response.spyConmList || []

                for(let i=0; i<pushList.length; i++) {
                    this.spyConmList.push(pushList[i])
                }

                this.nxDataYn = response.nxDataYn || 'N'
            })
        }

    },

    components : {
    }
}   
</script>