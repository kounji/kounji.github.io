<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 부동산 > 부동산 정보입력 > 소재지 설정
* @ 페이지설명 : 지역설정화면
* @ 파일명     : src/views/page/CO/RE/CORE2210/CORE2210.vue
* @ 작성자     : CS528053
* @ 작성일     : 2022-08-22
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-22              CS528053                 최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>소재지 설정</h1>			
		</div>

        <div class="popup_content com_no_bottom">
            <div class="custom_check_list">
                <div class="com_inner"> 
                    <ul class="com_radio_type01">
                        <template v-if="selProvC.length > 0">
                        <li>
                            <span class="btn_radio">
                                <input type="radio" name="com_checkCORE2210" id="com_checkCORE2210_01" checked="checked">
                                <label for="com_checkCORE2210_01">
                                    <span>{{selProvnm}}</span>   
                                </label>
                            </span>
                        </li>
                        </template>
                        <template v-if="selCcwC.length > 0">
                        <li>
                            <span class="btn_radio">
                                <input type="radio" name="com_checkCORE2210" id="com_checkCORE2210_02" checked="checked">
                                <label for="com_checkCORE2210_02">
                                    <span>{{selCcwnm}}</span>   
                                </label>
                            </span>
                        </li>
                        </template>
                    </ul>

                    <template v-if="selProvC.length === 0">
                        <strong class="com_cont_tit01">시/도 선택</strong>
                        <ul class="com_radio_type03">
                            <li v-for="(item, idx) in provnmList" :key="'prov_'+idx">
                                <div class="btn_radio">
                                    <input type="radio" name="prov" :id="'prov'+idx"  @change="fn_setProvInfo(item)">
                                    <label :for="'prov'+idx">
                                        <span>{{item.provnm}}</span>			
                                    </label>	
                                </div>	
                            </li>
                        </ul>
                    </template>

                    <template v-if="selProvC.length > 0 && selCcwC.length === 0">
                        <strong class="com_cont_tit01">시/군/구 선택</strong>
                        <ul class="com_radio_type03">
                            <li v-for="(item, idx) in ccwnmList" :key="'ccw_'+idx">
                                <div class="btn_radio" >
                                    <input type="radio" name="ccw" :id="'ccw'+idx" @change="fn_setCcwInfo(item)">
                                    <label :for="'ccw'+idx">
                                        <span>{{item.ccwnm}}</span>			
                                    </label>	
                                </div>	
                            </li>
                        </ul>
                    </template>

                    <template v-if="selProvC.length > 0 && selCcwC.length > 0">
                        <strong class="com_cont_tit01">읍/면/동 선택</strong>
                        <ul class="com_radio_type03">
                            <li v-for="(item, idx) in ttvnmList" :key="'ttv_'+idx">
                                <div class="btn_radio" >
                                    <input type="radio" name="ttv" :id="'ttv'+idx" @change="fn_setTtvInfo(item)">
                                    <label :for="'ttv'+idx">
                                        <span>{{item.ttvnm}}</span>			
                                    </label>	
                                </div>	
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
		</div>

        <a href="javascript:void(0);"  class="btn_back" v-on:click.prevent="fn_moveBack()" v-if="backYn"><span class="blind">이전화면</span></a>		
        <a href="javascript:void(0);"  class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'

    export default {
        name : "SZST2106",
        data: () => {
            return {
                respInfo    : {},   //응답결과
                provnmList  : [],   //시도
                ccwnmList   : [],   //시군구
                ttvnmList   : [],   //읍면동
                backYn   : false,

                selProvC  : "",  //선택한 시도코드
                selProvnm : "",  //선택한 시도명
                selCcwC   : "",  //선택한 시군구코드
                selCcwnm  : "",  //선택한 시군구명

                nowPage   : "",
            }
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
                this.nowPage = "prov"
				this.getData()
			},
            getData() {
				const config = {
                    url: '/sz/st/06r01',
                    data: {
                        "mydtCusno" : this.getUserInfo("mydtCusno"),
                        "provC"     : this.selProvC,
                        "ccwC"      : this.selCcwC,
					}
                }
                apiService.call(config).then(response => {
					this.respInfo   = response
                    this.provnmList = response.provnmList || []
                    this.ccwnmList  = response.ccwnmList || []
                    this.ttvnmList  = response.ttvnmList || []
				})
            },
            fn_setProvInfo(info) {
                this.selProvC = info.provC
                this.selProvnm = info.provnm
                this.backYn = true
                this.getData()

                this.nowPage = "ccw"
            },
            fn_setCcwInfo(info) {
                this.selCcwC = info.ccwC
                this.selCcwnm = info.ccwnm
                this.backYn = true
                this.getData()

                this.nowPage = "ttv"
            },
            fn_setTtvInfo(ttvInfo) {
                let param = {
                    "provC"  : this.selProvC,
                    "provnm" : this.selProvnm,
                    "ccwC"   : this.selCcwC,
                    "ccwnm"  : this.selCcwnm,
                    "ttvC"   : ttvInfo.ttvC,
                    "ttvnm"  : ttvInfo.ttvnm,
                    "culplRgnC" : ttvInfo.culplRgnC
                }
                this.close(param)
            }, 
            fn_moveBack() {
                if(this.nowPage === "ttv") {
                    this.nowPage = "ccw"
                    this.selCcwC  = ""
                    this.selCcwnm = ""
                    this.backYn = true
                    this.getData()
                } else if(this.nowPage === "ccw") {
                    this.nowPage = "prov"
                    this.selProvC  = ""
                    this.selProvnm = ""
                    this.getData()
                    this.backYn = false
                }
            }
        }
    }
</script>
