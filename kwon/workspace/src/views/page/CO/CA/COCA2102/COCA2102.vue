<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 자동차
* @ 페이지설명 : 자산등록 > 자동차> step 2. 차량상세정보입력
* @ 파일명     : src/views/page/CO/CA/COCA2102/COCA2102.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-06-21
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-06-21              CS515897              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup">
        <div class="popup_header">    
			<h1>자동차</h1>		
            <a href="javascript:void(0);" class="btn_back" @click.prevent="close()" v-if="!isUpt"><span class="blind">이전화면</span></a>
            <a href="javascript:void(0);" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>	
        </div>
        <div class="popup_content com_bg_type00">
            <div class="com_inner com_line_type01 com_top_type02">
                <strong class="com_pop_tit01">{{carModlnm}}<span class="common_bar"></span><span class="fw_normal fs16">{{vhcnoVal}}</span></strong>
                <p class="com_txt_sub01">차량의 세부 유형과 주행거리를 선택하세요.</p>
            </div>
            <div class="com_inner com_inputarea_type07">
                <div class="com_btnselectbox_type01">
                    <button type="button" class="com_btnselect_type01" @click.prevent="selCarDtl" title="세부유형선택"><span>{{carGrdNo.length>0?carGrdnm:'세부유형'}}</span></button>
                </div>
                <div class="com_btnselectbox_type01" v-show="carGrdNo.length > 0 && carGrdnm.length > 0">
                    <button type="button" class="com_btnselect_type01" @click.prevent="selCarDst" title="주행거리선택"><span>{{odmtrDistNm.length>0?odmtrDistNm:'주행거리(단위 : km)'}}</span></button>
                </div>
            </div>
        </div>
    
		<div class="bottom_box">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" @click.prevent="nextPage($event)" ref="nextProcess">다음</a>
			</div>
        </div>
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

import COCA1103 from '@/views/page/CO/CA/COCA1103/COCA1103'
import COCA1104 from '@/views/page/CO/CA/COCA1104/COCA1104'
import COCA2105 from '@/views/page/CO/CA/COCA2105/COCA2105'

export default {
    name : "COCA2102",
    data: () => {
        return {
            // 임시 파라미터
            vhcnoVal        : "",     // 차량번호
            carModlnm       : "",     // 차량모델
            carMdyrYy       : "",     // 차량연식년도
            carGrdNo        : "",     // 차량세부유형
            carGrdnm        : "",     // 차량세부유형명
            odmtrDistDsc    : "",     // 주행거리코드
            odmtrDistNm     : "",     // 주행거리명

            popId : "",     // 부모창에서 띄운 팝업창id(추가등록용)
            isUpt : false,  // 수정으로 넘어왔는지 확인하기위한 파라미터
        }

    },
    computed: {
         btnOnOff(){
            return (this.carGrdNo==="" || this.odmtrDistDsc==="") ? "btn_off" : ""
        }
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        // 화면 초기화
        initComponent(param = {}) {
            this.popId          = param.popId
            this.isUpt          = param.isUpt || false
            this.vhcnoVal       = param.vhcnoVal || ""      // 차량번호
            this.carModlnm      = param.carModlnm || ""     // 차량모델
            this.carMdyrYy      = param.carMdyrYy || ""     // 차량연식년도
            this.carGrdNo       = param.carGrdNo || ""      // 차량세부유형
            this.carGrdnm       = param.carGrdnm || ""      // 차량세부유형명
            this.odmtrDistDsc   = param.odmtrDistDsc || ""  // 주행거리코드
            this.odmtrDistNm    = param.comnCExpl || ""     // 주행거리명

            this.getData()
        },
        getData() {
            if(this.isUpt) {
                // 수정으로 넘어올경우 자동차기본정보 조회
                const config = {
                    url : "/co/ca/02r01",
                    data : {
                        mydtCusno   : this.getUserInfo("mydtCusno"),
                        vhcnoVal    : this.vhcnoVal
                    }
                }
                apiService.call(config).then(response => {
                    this.carModlnm = response.carModlnm
                    this.carMdyrYy = response.carMdyrYy
                })
            } else {
                // 등록으로 넘어올경우 세부유형 선택부터 시작
                this.selCarDtl()
            }
        },
        // 차량세부유형선택 리스트 생성 후 슬라이드팝업 오픈
        selCarDtl() {
            // 임시 리스트 데이터
            let listData = []

            const config_r0 = {
                url : "/co/ca/03r01",
                data : {
                    mydtCusno   : this.getUserInfo("mydtCusno"),
                    vhcnoVal    : this.vhcnoVal,
                }
            }
            apiService.call(config_r0).then(response => {
                listData = response.carGrdList || []

                this.openCarDtl(listData)
            })

            
        },
        openCarDtl(list) {
            const config = {
                params : {
                    selectVal   : this.carGrdNo,
                    list        : list
                },
                renderer : {
                    component : COCA1103
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.carGrdNo = response.carGrdNo
                this.carGrdnm = response.carGrdnm

                // 주행거리 선택 슬라이드팝업 자동 오픈
                this.selCarDst()
            })
        },
        // 주행거리 선택 슬라이드팝업 오픈
        selCarDst() {
            let comnDstList = this.getCodeList("ODMTR_DIST_DSC") // (공통코드) 주행거리
            // 리스트 내 기본 checked가 true인 데이터 false로 변경
            for(let i=0; i<comnDstList.length; i++) {
                comnDstList[i].checked = false
            }

            const config = {
                params : {
                    selectVal   : this.odmtrDistDsc,
                    list        : comnDstList,
                },
                renderer : {
                    component : COCA1104
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.odmtrDistDsc   = response.comnCVal
                this.odmtrDistNm    = response.comnCExpl

                // 주행거리 까지 선택 완료 시 다음 팝업 오픈
                this.$refs.nextProcess.click()
            })
        },
        // 다음 이동
        nextPage(e) {
            if(e.target.className.indexOf("btn_off") != -1) return false

            let param = {
                vhcnoVal        : this.vhcnoVal,        // 자동차번호값
                carModlnm       : this.carModlnm,       // 자동차모델명
                carMdyrYy       : this.carMdyrYy,       // 자동차연식
                carGrdNo        : this.carGrdNo,        // 자동차등급번호
                carGrdnm        : this.carGrdnm,        // 자동차등급명
                odmtrDistDsc    : this.odmtrDistDsc,    // 주행거리구분코드
                odmtrDistNm     : this.odmtrDistNm,     // 주행거리구분명
                popId : this.popId,
                isUpt : this.isUpt
            }
            const config = {
                component: COCA2105,
                params : param
            }
            modalService.openPopup(config).then((response) => {
                console.log("pass ", response)
            })
        },
        // 우측 상단 x 버튼 클릭(모든 팝업창 close)
        closePage() {
            const config = {
                content: ['입력중인 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'],
                title  : "",
            }
            modalService.confirm(config).then(text => {
                if(text == "예") {
                    if(!this.isUpt) this.closeAll(true)
                    else this.closeAll()
                }
            })
        }
    },
    components : {
    }
}
</script>