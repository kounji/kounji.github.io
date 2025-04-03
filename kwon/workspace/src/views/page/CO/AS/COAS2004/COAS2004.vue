<!--
/*************************************************************************
* @ 서비스경로 : 자산관리서비스 소개 > 약관상세
* @ 페이지설명 : 자산관리서비스 약관동의
* @ 파일명     : src/views/page/CO/AS/COAS2004/COAS2004.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-06-28              CS528069              최초작성
* 2023-08-23              CS533035              화면번호수정(COAS1004->COAS2004)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>약관동의</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>		
		<div class="popup_content" id="terms_popup"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="terms_view slide slick_refresh" style="padding:0 2rem">
                <div v-for="(item, idx) in stltDtlArray" :key="idx">
                    <strong class="terms_tit">{{item.stltTinm}}</strong>
                    <div class="terms_cont" v-html="item.stltCntn"></div>
                </div>
			</div>
		</div>
		<div class="popup_footer fixed">
			<!-- 전체동의 -->
			<div class="btn_full_box" v-if="allYn" @click.prevent="fn_agreeAllTerms()">
				<a href="javascript:void(0);" class="btn btn_mint">전체 동의</a>
			</div>
			<!-- //전체동의 -->
			<!-- 개별 -->
			<div class="btn_full_box" v-else @click.prevent="fn_agreeTerm()">
				<a href="javascript:void(0);" class="btn btn_mint">동의</a>
			</div>
			<!-- //개별 -->
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="closePopup()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
    import apiService from '@/service/apiService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import {fncSlick_Terms} from '@/utils/slick'

    export default {
        name: 'COAS2004',
        data: () => {
            return {
                isPDPD1108          : false,// PDPD1108 화면에서 넘어온 플래그
                allYn               : "",   // true : 전체확인, false : 개별확인
                num                 : 0,    // 현재약관
                maxNum              : 0,    // 약관총개수
                stltTinm            : "",   // 약관제목
                stltCntn            : "",   // 약관상세
                stltArray           : [],   // 약관목록
                stltDtlArray        : [],   // 약관상세목록
                slickIdx            : 0,    // slick 인덱스

                agreeStltIdArray    : [],   // 동의한 약관ID Array
                isShowAgreeBtn      : false,// 동의버튼활성화 여부
            }
        },
        computed: {
           
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        created() {
            // 전달파라미터 전체확인일때
            if(this.params.flag === "all") {
                this.allYn  = true
                this.maxNum = this.params.stltArray.length
            } else {
                this.allYn  = false
            }
        },
        mounted() {
            this.initComponent(this.params)
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: { 
            initComponent(param = {}) {
                this.isPDPD1108 = param.flag === "select" ? true : false

                this.getData()
            },
            getData() {
                if(!this.isPDPD1108) {
                    this.stltArray      = this.params.stltArray || []       // 약관목록
                    this.stltDtlArray   = this.params.stltDtlArray || []    // 약관상세목록

                    setTimeout(() => {
                        this.slickIdx = 0
                        fncSlick_Terms(500, this.fn_slickCallBack, this.slickIdx)
                    }, 500)
                } else {
                    let stltTpc     = this.params.stltTpc || ""
                    let sqno        = this.params.sqno || ""        
                    
                    const config_api = {
                        url : '/co/as/03r01',
                        data : {
                            "stltTpc"   : stltTpc,  //약관유형코드
                            "sqno"      : sqno,     //일련번호
                            "mydtCusno" : this.getUserInfo('mydtCusno'),
                        }
                    }
                    apiService.call(config_api).then(response => {
                        this.stltDtlArray.push({
                            stltTinm : response.asetAmnStltTinm,
                            stltCntn : response.asetAmnStltCntn
                        })
                    })

                }
            },

            /* Slick Callback */
            fn_slickCallBack() {
                // $('.terms_view').slick('refresh')
                // 스크롤 최상단 위치
                let $content = $("#terms_popup")

                $content[0].scrollTop = 0
            },

            /* 전체동의 */
            fn_agreeAllTerms() {
                // 동의한 약관 ID 저장
                for(let i=0; i < this.stltArray.length; i++) {
                    this.agreeStltIdArray.push({stltKeyNo : this.stltArray[i].stltKeyNo})
                }
                
                this.closeParams = {
                    agreeStltIdArray : this.agreeStltIdArray
                }
                console.log(this.closeParams.agreeStltIdArray)

                this.close(this.closeParams)
            },

            /* 개별동의 */
            fn_agreeTerm() {
                this.close({agreeYn : 'Y'})
            },

            /* 팝업닫기 */
            closePopup() {
                this.close({agreeYn : 'N'})
            }
        },
        components: {      
            
        },
    }
    
</script>