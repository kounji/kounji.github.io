<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 약관/동의 > 이용약관 > 경제 제공약관 상세(팝업)
* @ 파일명     : src/views/page/CO/AT/COAT1105/COAT1105.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-11-24             CS515729                 최초작성
* 2021-12-07             CS515729                 동의안함 버튼 관련 숨김처리
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>약관 및 동의서</h1>		
		</div>
        <div class="popup_content com_sub_type01 com_bg_type00 separate_scroll" 
            :class="{'com_space_bottom' : !isLastVerStlt || agrDtm, 'pb70' : isLastVerStlt && !agrDtm}">
            <div class="com_inner com_line_type01">
                <div class="pop_tit"><span>{{stltTinm}}</span></div>
            </div>

            <div class="terms_text_wrap">
				<div class="select_wrapper">
					<button class="select_date" @click="selectStltVerClick()">
						<span class="num">{{currentEfocDt | dateFilter("YYYY.MM.DD")}} 시행</span><span class="caret"></span>
					</button>
				</div>
				<div class="content" v-html="stltCntn"></div>
            </div>

            <!-- ::S:: 동의일자 제거요청. 2021.12.06 -->
            <!-- <template v-if="agrDtm">
                <div class="com_inner_type02 com_linetop pt15">
                    <p class="dot_msg">{{agrDtm | dateFilter('YYYY년 MM월 DD일')}}에 동의하셨습니다.</p>	
                </div>
            </template> -->
            <!-- ::S:: 동의일자 제거요청. 2021.12.06 -->
        </div>

        
		<div class="popup_footer fixed" v-show="isLastVerStlt">
            <!-- ::S:: 선택동의 동의안함 버튼 제거요청. 2021.12.06 -->
            <!-- <div class="btn_half_box">
                <a href="javascript:void(0);" role="button" class="btn btn_grey" @click.prevent="close()">취소</a>
                <template v-if="agrDtm">
                    <a href="javascript:void(0);" role="button" class="btn btn_grey" @click.prevent="fn_saveAgree('N')">동의 안함</a>
                </template>
                <template v-else>
                    <a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="fn_saveAgree('Y')">동의</a>
                </template>
            </div> -->
            <!-- ::E:: 선택동의 동의안함 버튼 제거요청. 2021.12.06 -->

            <div class="btn_full_box">
                <template v-if="!agrDtm">
                    <a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="fn_saveAgree('Y')">동의</a>
                </template>
            </div>
		</div>
        


		<a href="javascript:void(0);" role="button" @click="close()" class="btn_close"><span class="blind">닫기</span></a>
	</div>
</template>

<script>
	import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {dateFormat} from '@/utils/date'
    import _ from 'lodash'
    
    export default {
		name : "COAT1105",
		data: () => {
			return {
                objStltInfo   : {},	//전달파라미터
                selectStltTpc : "",	//약관유형코드
                selectSqno    : "",	//일련번호
                respInfo      : {}, //응답결과
                respVerInfo   : {}, //응답결과(버전)
                stltTinm      : "",	//약관제목
                stltCntn      : "",	//약관내용
                stltVerList   : [],	//변경이력
                agrDtm        : "", //동의일시
                currentEfocDt : "", //시행일자

                lastVerSqno   : "", // 최종이력 약관일련번호
			}
		},
		mixins: [
			commonMixin,
			popupMixin
        ],
        computed: {
            /*
            * 최종버전약관 여부(약관일련번호 비교)
            */
            isLastVerStlt() {
                if(this.selectSqno == ""  && this.lastVerSqno == "") {
                    return false
                } else {
                    return this.selectSqno === this.lastVerSqno
                }
            }
        },
        created() {
            this.objStltInfo   = this.params.objStltInfo	//전달파라미터
			this.selectStltTpc = this.objStltInfo.stltTpc	//약관유형코드
			this.selectSqno    = String(this.objStltInfo.sqno)	//일련번호
        },
        mounted() {
            this.initComponent()
			//PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
		},
		methods: {
			initComponent() {
                this.getData()	// 상세조회
                this.getStltVerList()	//이력조회
            },
            getData() {
				////////////////
				// 약관상세조회
				///////
				const config = {
					url : '/co/at/02r01',
					data : {
						"stltTpc"   : this.selectStltTpc,   //약관유형코드
						"sqno"      : this.selectSqno,  //일련번호
						"mydtCusno" : this.getUserInfo('mydtCusno'),    //마이데이터고객번호
					}
				}
				apiService.call(config).then(response => {
					this.respInfo = response
					this.stltTinm = this.respInfo.asetAmnStltTinm || "" 
                    this.stltCntn = this.respInfo.asetAmnStltCntn || ""
                    this.agrDtm   = this.respInfo.agrDtm || ""  //동의일시
                    this.currentEfocDt = this.respInfo.efocDt || ""	//조회된 약관의 시행일자
				})
            },

            getStltVerList() {
				////////////////
				// 약관변경이력
				///////
				const config2 = {
					url : '/co/at/02r02',
					data : {
						"stltTpc" : this.selectStltTpc,	//약관유형코드
					}
				}
				apiService.call(config2).then(response => {
					this.respVerInfo = response
					this.stltVerList = this.respVerInfo.stltVerList
                    this.stltVerList = _.chain(this.stltVerList).orderBy(['efocDt'],['desc']).value()

                    //최종버전 약관일련번호
                    this.lastVerSqno = String(this.stltVerList[0].sqno)
				})
            },
            /*
            * 약관 시행일 팝업
            */
            selectStltVerClick() {
				const config = {
					params : {
						title : "시행날짜",
						list : [], 
						selectVal : this.selectStltTpc + "_" + this.selectSqno
					}
                }

				for (let i=0; i<this.stltVerList.length; i++) {
					let info={}
					info.comnCnm = dateFormat(this.stltVerList[i].efocDt)
					info.comnCId = this.stltVerList[i].stltTpc + "_" + this.stltVerList[i].sqno
					config.params.list.push(info)
                }
                
				modalService.openSelectSingle(config).then(response => {
					if (typeof response.comnCId !== "undefined") {
						let comnCId = response.comnCId.split("_")

						this.selectStltTpc = comnCId[0]	//약관유형코드
						this.selectSqno    = comnCId[1]	//일련번호
						
						this.getData()
					}
				})
			},

            /*
            * 경제쪽 제공약관 동의처리.
            */
            fn_saveAgree(flagYN) {
                const config = {
					url : '/co/co/00i02',
					data : {
                        mydtCusno     : this.getUserInfo('mydtCusno'),   //마이데이터고객번호
                        ofrHdngC      : "000002",  //제공항목코드 : 값 고정 (000001 : 카드/자동차, 000002 : 경제데이터, 000003 : 상품추천활용동의)
                        agrYn         : (flagYN === "Y") ? "1" : "0",    //동의여부
                        firEntPathVal : this.getUserInfo('chnlGbn'),     //최초가입경로값 
                        lginInfVal    : this.getUserInfo('lginInfVal'),  //로그인정보값
                        lginDtm       : this.getUserInfo('lginDtm'),     //로그인일시(14자리)
					}
                }
                
                apiService.call(config).then(response => {
                    if(response.rspC === "0000") {
                        let message = (flagYN ==="Y") ? "약관의 동의처리가 완료되었습니다." : "약관의 동의처리가 철회되었습니다."
                        modalService.alert(message).then(() => {
                            this.close()
                        })
                    }
                })

            }
        }
    }
</script>