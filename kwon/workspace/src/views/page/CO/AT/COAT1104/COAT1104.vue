<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 약관/동의 > 제3자제공동의설정
* @ 파일명     : src/views/page/CO/AT/COAT1104/COAT1104.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-18             CS515729                 최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
		<div class="popup_header">    
			<h1>제3자 정보제공동의 설정</h1>			
		</div>
        <div class="popup_content com_bg_type00">
            <div class="info_agree_wrap">
                <div class="new_refresh_wrap com_line_type01">
                    <button class="refresh" @click="fn_refreshBrcInfo()">
                        영업점<span class="refresh_ico"><span class="blind">새로고침</span></span>
                    </button>
                </div>
                <div class="list_area">
                    <ul class="view_box view_link_list2 chkbox_list">
                        <li v-for="(item, idx) in brList" :key="idx">
                            <a href="javascript:void(0);">
                                <dl>
                                    <dt>
                                        <em>{{item.brnm}}</em>
                                    </dt>
                                    <dd>
                                        <span class="date num" v-if="item.agrYn === '1'">{{item.aplDtm}}</span>
                                        <span class="cmm-switch sm">
                                            <input type="checkbox" :id="item.agrBrc" :apldtm="item.aplDtm" :checked="item.agrYn === '1'" v-on:click="fn_checkAgree" >
                                            <label :for="item.agrBrc">
                                                <span class="txt">선택</span>
                                                <span role="img" class="on">포함</span>
                                                <span role="img" class="off">제외</span>
                                            </label>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="popup_footer fixed">
            <div class="btn_full_box">
                <a href="javascript:void(0);" v-on:click.prevent="fn_saveAgree()" class="btn btn_mint" :class="hasUpdate === true ? '' : 'btn_off'">저장</a>
            </div>
        </div>

        <a href="javascript:void(0);" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>

    </div>
</template>
<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import _ from 'lodash'

    import COAT1102 from '@/views/page/CO/AT/COAT1102/COAT1102'

    export default {
        name : "COAT1104",
        data: () => {
            return {
                respInfo  : {}, //응답결과
                brList    : [], //응답결과 사무소리스트
                checkList : [], //체크리스트
                hasUpdate : false
            }
        },
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
                //this.brList = []
                this.checkList = []
                this.hasUpdate = false

                //거래내역 조회
                const config = {
					url: '/co/at/04r01',
                    data: {"mydtCusno" : this.getUserInfo("mydtCusno")}
				}
				apiService.call(config).then(response => {
                    this.respInfo = response;
                    this.brList = this.respInfo.brList || []
                });
            },
            fn_refreshBrcInfo() {
                //영업점갱신요청 
                this.brList = []
                this.checkList = []
                this.hasUpdate = false

                //(BXI에서 EAI CALL, INSERT 후 SELECT RETURN)
                const config = {
					url: '/co/at/04s02', // url 변경필요.
                    data: {"mydtCusno" : this.getUserInfo("mydtCusno")}
				}
				apiService.call(config).then(response => {
                    this.respInfo = response;
                    this.brList = this.respInfo.brList || []
                })
            },
            /**
             * 
             */
            fn_checkAgree(e) {
                
                let agrBrc     = e.target.id
                let agrBrcNm   = this.brList[this.brList.findIndex(i => i.agrBrc === agrBrc)].brnm
                let aplDtm     = e.target.getAttribute("apldtm") || ""  // 적용일자
                let agrChecked = e.target.checked
                
                // 적용일자 없는건만 제3자약관 팝업호출
                if(aplDtm.length === 0 ) {
                    // 동의체크
                    if(agrChecked === true) {

                        // 제3자 약관상세 버전조회용
                        let param = {
                            "stltTpc" : "PFM005", //약관동의종류코드
                        }

                        // 약관 버전목록 조회.
                        const config2 = {
                            url : '/co/at/02r02',
                            data : param
                        }
                        apiService.call(config2).then(response => {
                            if (response.stltVerList != null) {

                                let stltVerList = _.chain(response.stltVerList).orderBy(['efocDt'],['desc']).value()
                                param.stltTpc = stltVerList[0].stltTpc
                                param.sqno    = stltVerList[0].sqno

                                // 약관팝업 조회
                                const config3 = {
                                    component : COAT1102,
                                    params : {
                                        "objStltInfo" : param,
                                        "callGbn" : "third",
                                        "mobrList" : [
                                            {"mobrC":agrBrc, "mobrnm":agrBrcNm}
                                        ]
                                    }
                                }

                                modalService.openPopup(config3).then(response => {
                                    //response : agree, cancel
                                    if (response === "agree") {
                                        this.checkList.push({"brc": e.target.id, "agrYn" :"1"})
                                        this.fn_saveAgree()
                                    } else {
                                        e.target.checked = false
                                    }
                                })
                            }
                        })
                    } else {
                        this.checkList.splice(this.checkList.findIndex(i => i.brc === agrBrc), 1)
                        this.fn_setHasUpdate()
                    }
                } else {
                    // 동의체크
                    if(agrChecked === true) {
                        this.checkList.splice(this.checkList.findIndex(i => i.brc === agrBrc), 1)
                    } else {
                        this.checkList.push({"brc": e.target.id, "agrYn" :"0"})
                    }

                    this.fn_setHasUpdate()
                }
            },
            /*
            * 버튼활성화
            */
            fn_setHasUpdate() {
                this.hasUpdate = (this.checkList.length > 0) ? true : false
            },

            /*
            * 제3자 제공동의 저장
            */
            fn_saveAgree() {
                // 저장건이 존재할경우 
                if(this.checkList.length > 0 ) {

                    //변경내역 저장
                    const config = {
                        url : '/co/at/04s01',
                        data : {
                            "mydtCusno" : this.getUserInfo("mydtCusno"),
                            "brAgrList" : this.checkList
                        }
                    }
                    apiService.call(config).then(response => {
                        if(response.rspC !== "0000") {
                            modalService.alert("저장 중 오류가 발생했습니다.")
                        } else {
                            modalService.alert("저장되었습니다.").then(() => {
                                this.getData()
                            })
                        }
                    })
                }
            },
        },
        components : {
        }
    }
</script>