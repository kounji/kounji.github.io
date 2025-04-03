<!--
/*************************************************************************
* @ 서비스경로 : 자산관리 서비스 가입 > 거래농축협검색 팝업
* @ 페이지설명 : 거래농축협검색
* @ 파일명     : src/views/page/CO/AS/COAS2006/COAS2006.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-01              CS528069              최초작성
* 2023-08-23              CS533035              화면번호수정(COAS1006->COAS2006)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>거래 농축협 찾기</h1>
		</div>
		
		<div class="popup_content com_bg_type00 com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<!-- 검색 영역 S -->
			<div class="custom_box">
				<div class="com_inner com_list_type01 com_line_type01 com_top_type02">
					<div class="com_input_type02">
						<input type="search" id="txt01" class="inputClear" name="" placeholder="영업점명을 입력하세요" title="영업점명 입력"
                            :value="brnm" ref="brnm" @keyup.enter="searchBrc()" @keyup="fn_checkWord($event, 20)">	
						<a href="javascript:void(0);" class="com_btn_delete" @click="clearText()" v-if="brnm.length > 0"><span class="blind">삭제</span></a>
						<a href="javascript:void(0);" class="com_btn_search" @click="searchBrc()"><span class="blind">검색</span></a>
					</div>
				</div>
			</div>
			<!-- 검색 영역 E -->

			<!-- 결과 영역 S -->
			<div class="custom_box" v-if="isSrchYn">
				<ul class="search_list">
                    <li v-for="(item, idx) in brList" :key="idx">
                        <input type="radio" name="area" :id="idx" @click="seletBrc(idx)">
                        <label :for="idx">
                            <dl>
                                <dt>{{item.brnm}}</dt>
                                <dd>{{item.brAdr}}</dd>
                            </dl>
                        </label>
                    </li>
				</ul>
                <div class="com_btn_area02" v-show="isNextDataYn==='Y'"><a href="javascript:void(0);" @click="moreNextList()" class="com_btn_more"><span>더보기</span></a></div>
			</div>
			<!-- 결과 영역 E -->
		</div>

		<a href="javascript:void(0);" class="btn_close txt_cancel" @click.prevent="closePopup()"><span>취소</span></a>		

	</div>
	<!--// full popup E -->
</template>

<script>
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import {checkWord} from '@/utils/data'

    export default {
        name: 'COAS2006',
        data: () => {
            return {
                brList	    : [],   // 거래지점 리스트
                brnm        : "",   // 사무소명
                pageNo      : "",   // 페이지번호
                isNextDataYn: "N",  // 다음 데이터 여부
                isSrchYn    : false,// 검색 여부
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
                this.pageNo = 1

                setTimeout(() => {
                    this.$refs.brnm.focus()
                }, 10);
            },
            fn_checkWord(event, maxByte) {
				let rtnObj = checkWord(event.target.value, maxByte)

				if(rtnObj.flag) {this.$refs.brnm.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.brnm = event.target.value
			},

            /* 거래지점 검색 */
            searchBrc() {
                if(this.brnm == null || this.brnm == "") {
                    modalService.alert("거래지점명을 입력해주세요.","","확인")
                    return
                }

                if(this.brnm.length < 2) {
                    modalService.alert("거래지점명을 2글자 이상 입력해주세요.","","확인")
                    return
                }

                this.brList = []    // 검색 거래지점 리스트 초기화
                
                const config = {
                    url : "/co/as/06r01",
                    data : {
                        brnm    : this.brnm,    // 입력 지점명
                        pageNo  : this.pageNo,  // 페이지번호
                    }
                }
                apiService.call(config).then(response => {
                    this.isSrchYn = true

                    this.isNextDataYn = response.nxDataYn || "N"
                    this.brList = response.brList || []

                    this.$refs.brnm.blur()
                })
            },

            /* 더보기 */
            moreNextList() {
                this.pageNo = this.pageNo + 1

                const config = {
                    url : "/co/as/06r01",
                    data : {
                        brnm    : this.brnm,    // 입력 지점명
                        pageNo  : this.pageNo,  // 페이지번호
                    }
                }
                apiService.call(config).then(response => {
                    this.isNextDataYn = response.nxDataYn || "N"

                    let tmpList = response.brList || []
                    if(this.brList.length > 0) {
                        for(let i=0; i < tmpList.length; i++) {
                            this.brList.push(tmpList[i])
                        }
                    } else {
                        this.brList = tmpList
                    }
                    // this.brList = response.brList || []
                })
            },

            /* 조회 목록 선택 */
            seletBrc(idx) {
                // console.log(this.brList[idx])
                this.brList[idx].checked = true

                this.close({brcObj : this.brList[idx]})
            },

            /* 입력 폼 내 'x' 버튼 클릭 */
            clearText() {
                this.brnm = ""
                this.pageNo = 1
                this.isSrchYn = false
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