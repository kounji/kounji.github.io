<!--
/*************************************************************************
* @ 서비스경로 : 서비스 가입 > 거래농축협검색 팝업
* @ 페이지설명 : 거래농축협검색 팝업
* @ 파일명     : src/views/page/CO/AS/COAS4006/COAS4006.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-04-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-04-23              CS541599              최초작성(COAS2006->COAS4006)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>거래 농축협 찾기</h1>
			<!--<button type="button" class="prev"><span class="blind">이전</span></button> -->
		</div>

		<div class="popup_content">
            <section class="find_spot">
                <div class="formItem">
                    <div class="input">
                        <input type="text" name="" title="영업점명 입력" placeholder="영업점명을 입력해 주세요."
                            :value="brnm" ref="brnm" @keyup.enter="searchBrc()" @keyup="fn_checkWord($event, 20)"/>
                        <button type="button" class="btn_search" @click.prevent="searchBrc()"><span class="blind">검색</span></button>
                    </div>
                </div>

				<!--검색결과-->
                <div class="scroller">
                    <!--결과 있음-->
                    <div class="search_result" v-if="isSrchYn">
						<ul>
							<li v-for="(item, idx) in brList" :key="idx">
                                <input type="radio" name="spot" :id="'spot'+idx" @click="seletBrc(idx)" aria-hidden="true" v-model="selectedBrc" :value="item.brc">
                                <label :for="'spot'+idx" role="radio" :aria-checked="selectedBrc == item.brc ? 'true':'false'">
                                    <span class="branch">{{item.brnm}}</span>
                                    <span>{{item.brAdr}}</span>
                                </label>
                            </li>
						</ul>

                        <button type="button" class="btn_more_txt" v-show="isNextDataYn==='Y'" @click.prevent="moreNextList()" >더보기</button>
                    </div>

                    <!--결과 없음-->
                    <div class="no_result" v-else>
                        <p class="text">검색 결과가 없어요.</p>
						<div class="bg">
                            <lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_no_result.json')" 
                                         ref="anim"
                                         :loop="true"
                                         :auto-play="true" 
                                         :speed="1"
                                         aria-hidden="true" 
                                         class="bg_no_result" 
                                         background="transparent"
                                         >
                        </lottie-animation>
						</div>
                    </div>
                </div>
                <!--//검색결과--> 
			</section>
		</div>

		<div class="popup_footer fixed">
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" :disabled="selectIdx < 0" @click.prevent="fnSelectBrc()">확인</button>
            </div>
        </div>
        
		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>	
	</div>
</template>

<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {checkWord} from '@/utils/data'

import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue

export default {
    name: 'COAS4006',
    data: () => {
        return {
            brList	    : [],    // 거래지점 리스트
            brnm        : "",    // 사무소명
            pageNo      : "",    // 페이지번호
            isNextDataYn: "N",   // 다음 데이터 여부
            isSrchYn    : false, // 검색 여부
            selectIdx   : -1,    // 선택한 거래지점 idx
            selectedBrc : null,    // 선택한 사무소
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
    },
    methods: { 
        initComponent(param = {}) {
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

                    this.$nextTick(() => {
                        $(function(){
                            $("input[type='radio']:checked").siblings("label").attr("aria-checked", true)
                        })
                    })

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
                this.selectIdx = idx
                // console.log(this.brList[idx])
                this.brList[idx].checked = true

                //this.close({brcObj : this.brList[idx]})
            },

            fnSelectBrc() {
                this.close({brcObj : this.brList[this.selectIdx]})
            },

            /* 입력 폼 내 'x' 버튼 클릭 */
            clearText() {
                this.brnm = ""
                this.pageNo = 1
                this.isSrchYn = false
            },

    },
    components: {      
        LottieAnimation
    },
}
</script>