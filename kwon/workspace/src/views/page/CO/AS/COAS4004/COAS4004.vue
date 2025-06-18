<!--
/*************************************************************************
* @ 서비스경로 : 서비스 가입 > 약관동의_복수
* @ 페이지설명 : 약관동의_복수
* @ 파일명     : src/views/page/CO/AS/COAS4004/COAS4004.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-02-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-14              CS541599              최초작성(COAS2004->COAS4004)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">
			<h1>약관동의</h1>
			<!-- <button type="button" class="prev"><span class="blind">이전</span></button> -->
		</div>		
		<div class="popup_content"  id="terms_popup">
            <!-- 다건 약관 상세의 경우 stltArray가 있고 단건(개별)인 경우 stltArray가 비어있기 때문 -->
			<div class="terms_view slide" v-if="stltArray.length &gt; 0">
				<div v-for="(item, idx) in stltDtlArray" :key="idx">
					<strong class="terms_tit">{{item.stltTinm}}</strong>
					<div class="terms_cont" v-html="item.stltCntn"></div>
				</div>
			</div>
            <div class="terms_view" v-else>
            	<div v-for="(item, idx) in stltDtlArray" :key="idx">
					<strong class="terms_tit">{{item.stltTinm}}</strong>
					<div class="terms_cont" v-html="item.stltCntn"></div>
				</div>
			</div>
		</div>
		<div class="popup_footer fixed">
			<!-- 복수 : 전체동의 -->
			<div class="btns_wrap"  v-if="allYn" @click.prevent="fn_agreeAllTerms()">
				<button type="button" class="btns lg primary">전체 동의</button>
			</div>
			<!-- //복수 : 전체동의 -->
			<!-- 개별 -->
			<div class="btns_wrap" v-else @click.prevent="fn_agreeTerm()">
				<a href="javascript:void(0);" class="btns lg primary">동의</a>
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
        name: 'COAS4004',
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

                    this.$nextTick(() => {
                        this.fnSlick()
                    })
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

            fnSlick() {
                $('.terms_view.slide').slick({
                    dots:true, // [v4.0] dot nav 추가
                    slidesToShow: 1,
                    infinite: false,
                    adaptiveHeight:true,
                    height:'auto',
                    customPaging:function(slider,i){
                        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
                    }
                });
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