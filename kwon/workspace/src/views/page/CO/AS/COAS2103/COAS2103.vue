<!--
/*************************************************************************
* @ 서비스경로 : 자산관리서비스 소개/재동의 > 약관동의 > 약관상세(POP)
* @ 페이지설명 : 자산관리서비스 약관동의
* @ 파일명     : src/views/page/CO/AS/COAS2103/COAS2103.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-11              CS515729                 최초작성
* 2023-08-23              CS533035              화면번호수정(COAS1103->COAS2103)
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>약관동의</h1>			
		</div>
		<div class="popup_content com_bg_type00 separate_scroll">
            <div class="com_inner com_line_type01 new_agree_box">
				<div class="step_list"  v-if="allYn">
					<ul>
						<li v-for="(stltObj, index) in params.stltArray" :key="index" :class="(index === num) ? 'active' : ''"><span>{{index+1}}</span></li>
					</ul>
				</div>
				<!-- <h3>{{ params.flag === "all" ? params.stltArray[num].asetAmnStltAgrNm : params.asetAmnStltAgrNm}}</h3> -->
                <h3>{{stltTinm}}</h3>
            </div>

            <div class="com_inner agree_cont terms_text_wrap" ref="stltCntn" @scroll="stltCntnScroll">
                <div class="terms_text" v-html="stltCntn">
                </div>
                
                <div class="store_notice_wrap" v-if="mobrList.length > 0">
                    <div class="head">영업점</div>
                    <div class="content">{{getMobrList}}</div>
                </div>
            </div>
        </div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" v-on:click.prevent="isShowAgreeBtn ? agreeNextStep() : '' " 
                    class="btn btn_mint" :class="{btn_off: isShowAgreeBtn === false}">
                    동의
                </a>
			</div>
		</div>	

		<a href="javascript:void(0);" v-on:click.prevent="closePopup()" class="btn_close txt_cancel"><span>취소</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
    import apiService from '@/service/apiService'
    import popupMixin from '@/common/mixins/popupMixin'

    export default {
        name: 'COAS2103',
        props : ["flag", "stltArray", "stltTpc", "sqno"],
        data: () => {
            return {
                allYn            : false,   //true : 전체확인, false : 개별확인
                num              : 0,       //현재약관
                maxNum           : 0,       //약관총갯수
                stltTinm         : "",      //약관제목
                stltCntn         : "",      //약관상세

                agreeStltIdArray : [],      //동의한 약관ID array
                mobrList         : [],      // 사무소정보

                isShowAgreeBtn   : false,   //동의버튼활성화여부
            }
        },
		computed: {
			getMobrList () {
				let mobrNms = ""
				for(let i=0; i < this.mobrList.length; i++) {
					mobrNms += this.mobrList[i].mobrnm + ","
				}
				return mobrNms.slice(0, -1)
			}
		},
        mixins: [
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
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {
            initComponent() {
                this.getData()
            },
            getData() {
                let stltTpc = ""  //약관유형코드
                let sqno    = ""  //일련번호

                if(this.allYn === true) {
                    stltTpc = this.params.stltArray[this.num].stltTpc
                    sqno    = this.params.stltArray[this.num].sqno
                } else {
                    stltTpc = this.params.stltTpc
                    sqno    = this.params.sqno
                }

                const config = {
                    url : '/co/as/03r01',
                    data : {
                        "stltTpc"   : stltTpc,  //약관유형코드
                        "sqno"      : sqno,     //일련번호
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                    }
                }
                apiService.call(config).then(response => {
                    this.stltTinm = response.asetAmnStltTinm || ""  //자산관리약관제목명
                    this.stltCntn = response.asetAmnStltCntn || ""  //자산관리약관내용
                    this.mobrList = response.mobrList || []   // mobrC, mobrnm

                    this.$nextTick(() => {
                        this.stltCntnScroll()
                    }) 
                })

            },
            closePopup() {
                this.closeParams = {
                    agreeStltIdArray : this.agreeStltIdArray
                }
                this.close(this.closeParams)
            },
            agreeNextStep() {
                if (this.allYn === true) {
                    //동의한 약관ID 저장
                    const checkParams = {
                        stltKeyNo : this.params.stltArray[this.num].stltKeyNo
                    }
                    this.agreeStltIdArray.push(checkParams)

                    this.num = this.num + 1

                    if (this.num < this.maxNum) {
                        this.initComponent()

                        // 약관내용 스크롤 위치 최상단 조정
                        this.$refs.stltCntn.scrollTop = 0

                        // 동의버튼 비활성화
                        this.isShowAgreeBtn = false
                    } else {
                        this.closePopup()   //전체 동의한경우 
                    }
                } else {
                    this.closeParams = {
                        agreeYn : "Y"
                    }
                    this.close(this.closeParams);
                }
            },

            /*
            * 약관내용 스크롤 이벤트
            */
            stltCntnScroll() {
                let scrollHeight = this.$refs.stltCntn.scrollHeight
                let clientHeight = this.$refs.stltCntn.clientHeight
                let scrollTop    = this.$refs.stltCntn.scrollTop

                if(Math.ceil(clientHeight + scrollTop + 50) >= scrollHeight) {
                    // 동의버튼 활성화
                    this.isShowAgreeBtn = true
                }
            }
        },
    }
</script>