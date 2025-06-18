<!--
/*************************************************************************
* @ 서비스경로 : 콕마이데이터설정 > 대면상담 일회성동의
* @ 페이지설명 : 콕마이데이터설정 > 대면상담 일회성동의 > 약관동의
* @ 파일명     : src/views/page/CO/OR/COOR4202/COOR4202.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-05-12
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-05-12              CS541013              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- 전체 팝업 시작 -->
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup">
                <div class="popup_header">
                    <h1>약관 동의</h1>
                </div>
                <div class="popup_content">
                    <div class="agree_wrap active open">
                        <!-- <div class="check_all">
                            <div class="checkbox border">
                                <input type="checkbox" name="allagree1" id="checkall1" required="" title="전체동의">
                                <button type="button" class="btn_detail">전체동의<span class="blind">상세보기</span></button>
                            </div>
                        </div>
                        <div class="view_cont">
                            <ul class="agree_list">
                                <li>
                                    <div class="checkbox">
                                        <input type="checkbox" name="agree1" id="check01_1" required="" title="제3자 이용약관 동의">
                                        <button type="button" class="btn_detail ico_arrow">[필수] 제3자 이용약관 동의<span
                                                class="blind">상세보기</span></button>
                                    </div>
                                </li>
                                <li>
                                    <div class="checkbox">
                                        <input type="checkbox" name="agree1" id="check01_2" required="" title="상품추천 동의">
                                        <button type="button" class="btn_detail ico_arrow">[필수] 상품추천 동의<span
                                                class="blind">상세보기</span></button>
                                    </div>
                                </li>
                            </ul>
                        </div> -->

                        <div class="check_all">
                            <div class="checkbox border">
                                <input type="checkbox" name="allagree1" id="stlt_all" ref="stlt_all" required="" v-model="allChk" @change="fnChgAllAgree($event)">
                                <label for="stlt_all" class="label">전체동의</label>
                            </div>
                        </div>
                        <div class="view_cont">
                            <ul class="agree_list">
                                <li v-for="(item, idx) in stltArray" :key="idx">
                                    <div class="checkbox">
                                        <input type="checkbox" name="agree1" :title="item.stltTinm" v-model="agreeList" :value="item.sqno" @change="fnChgOneAgree($event, item)">
                                        <button type="button" class="btn_detail ico_arrow" @click.prevent="fnOpenDtlPop(item.sqno)">{{item.stltTinm}}<span class="blind">상세보기</span></button>
                                    </div>
                                </li>
                            </ul>
                        </div>


                    </div>
                </div>

                <div class="popup_footer">
                    <div class="btn_group">
                        <button type="button" class="btns lg primary" :disabled="!allChk" @click.prevent="fnNextAgree">동의하고 다음</button>
                    </div>
                </div>
                <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
            </div>

        </div>
        <!--// 전체 팝업 종료 -->
    </div>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import commonService from '@/service/commonService'
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import routerService from '@/service/routerService'
import _ from 'lodash'

import COOR4203 from '@/views/page/CO/OR/COOR4203/COOR4203'

export default {
    name : "COOR4202",
	data: () => {
        return {
            rqrDtm           : '',          // 요청일시
            agreeList        : [],          // 약관 동의여부 목록
            allChk           : false,       // 모두 동의여부

            brnm             : '',          // 사무소명
            rqrmnm           : '',          // 요청자명

            stltArray : [                   // 약관목록 array
                {sqno: '1', dsc: "OFFLN1", stltTinm : '[필수] 제3자 이용약관 동의', stltCntn : '약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용'},
                {sqno: '2', dsc: "OFFLN2", stltTinm : '[필수] 상품추천 동의', stltCntn : '약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용'},
            ],
		}
	},
    mounted() {
        this.initComponent(this.params)
		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
	computed: {
		
	},
	mixins: [
        commonMixin,
        popupMixin
    ],
	methods: {
        initComponent(param) {
			
		},
        /* 전체 동의 */
        fnChgAllAgree(e) {
            let flag = e.target.checked

			if(flag) { // 전체 동의
                this.agreeList = []
                this.stltArray.forEach((el, idx)=> this.agreeList.push(el.sqno))
                this.allChk = true
			}
			else {     // 전체 동의 해제
                this.agreeList = []
			}

            this.fnSetChk()
        },
        /* 개별 동의 */
        fnChgOneAgree(e, item) {
            let chk = e.target.checked
            
            if(chk) { // 체크하려는 경우
                this.fnSetChk()
            } else {  // 체크해제하려는 경우
                this.fnSetChk()
            }
        },
        /* 전체 체크 세팅 */
        fnSetChk() {
            /* 동의 버튼 비활성화 여부 */
            if(this.stltArray.length == this.agreeList.length) {
                this.isAgree = true
                this.allChk = true
            } else {
                this.isAgree = false
                this.allChk = false
            }
        },
        fnOpenDtlPop(sqno, btnYn) {
            let row = this.stltArray.find(el=>el.sqno == sqno)

            const config = {
                component : COOR4203,
                params : {
                    title   : row.stltTinm,
                    content : row.stltCntn,
                    sqno    : row.sqno
                }
            }

			config.renderer = this.modalConfig.renderer

            modalService.openPopup(config).then(response => {
                console.log("@@@@@@ response -> ", response)
                if(response.agreeYn === "Y") {
                    if(this.agreeList.findIndex(el => el == sqno) < 0) this.agreeList.push(sqno)
                } 
                else {  // response.agreeYn === "N"
                    let idx = this.agreeList.findIndex(el => el == sqno)
                    if(idx >= 0) this.agreeList.splice(idx, 1) // 해당 약관 체크 해제
                }
                
                this.fnSetChk() // 전체 동의 체크박스 셋팅
            })
        },
        fnNextAgree() {
            let agree = []
            this.agreeList.forEach((el) => {
                let row = this.stltArray.find(ell => ell.sqno == el)
                
                if(!_.isEmpty(row)) {
                    agree.push({sqno : row.sqno, offlnStltTpc : row.dsc})
                }
                
            })

            const config = {
                url : "/co/or/01s01",
                data : {
                    mydtCusno           : this.getUserInfo("mydtCusno"),            // 마이데이터고객번호
                    offlnStltTpcList    : agree,                                    // 동의약관 목록
                }
            }
            apiService.call(config).then(response => {
                console.log("########### response -> ", response)
                if(!_.isEmpty(response)) {
                    this.brnm = response.brnm
                    this.rqrmnm = response.rqrmnm

                    if(response.rspC == "0000") {
                        let param = {
                            brnm : this.brnm,
                            rqrmnm : this.rqrmnm,
                            isAgree : true,
                            flag : true
                        }
                        this.close(param)
                    } else {
                        console.log("대면상담 약관동의 동의 실패!!!!!");
                        this.closeAll();
					    routerService.moveMain();
                    }
                } else {
                    this.closeAll();
					routerService.moveMain();
                }
            })
        },
	},
    watch: {
        
    },
	components: {
		Page,
        FootersV2
	}
}
</script>