<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 자동차
* @ 페이지설명 : 자산등록 > 자동차> step 1. 차량정보입력
* @ 파일명     : src/views/page/CO/CA/COCA2101/COCA2101.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-13
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-13              CS515897              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup">
        <div class="popup_header">    
			<h1>자동차</h1>		
            <a href="javascript:void(0);" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>	
        </div>
        <div class="popup_content com_bg_type00" v-show="certAgrYn">
            <div class="com_inner com_line_type01">
                <strong class="com_cont_tit01">차량 번호를 입력하세요</strong>
            </div>
            <div class="com_inner com_inputarea_type07">
                <div class="com_input_type01 mb0">
                    <label for="CO-CA-01-01"></label>
                    <input type="text" id="CO-CA-01-01" maxlength="12" class="com_txtright_type01" placeholder="000가0000" title="000가0000" @keyup="fn_checkWord($event, 12)" :value="vhcnoVal" ref="vhcnoVal"/>
                    <div class="del_txt type01">
                        <a href="javascript:void(0);" class="com_btn_delete2 blur" v-show="vhcnoVal.length>0" @click.prevent="del"><span class="blind">삭제</span></a>	
                    </div>
                </div>
                <p class="dot_msg mt18">본인소유 차량만 등록 가능합니다.</p>
            </div>
        </div>
    
        <!-- footer S -->
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" @click.prevent="nextPage($event)" ref="nextProcess">다음</a>
			</div>
        </div>
        <!--// footer E -->
    </div>
</template>

<script>
import store from '@/store'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import commonService from '@/service/commonService'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {checkWord} from '@/utils/data'

import COCA2102 from '@/views/page/CO/CA/COCA2102/COCA2102'
//import COCA2106 from '@/views/page/CO/CA/COCA2106/COCA2106'
import COCA2107 from '@/views/page/CO/CA/COCA2107/COCA2107'

export default {
    name : "COCA2101",
    data: () => {
        return {
            certAgrYn   : false,    // 정보제공동의여부
            popId       : "",       // 부모창에서 띄운 팝업창id(추가등록용)
            vhcnoVal    : "",       // 차량번호값
            carModlnm   : "",       // 자동차모델명
            carMdyrYy   : "",       // 자동차연식년도
        
            carList     : [],       // 사용자 등록 자동차 데이터 리스트(중복차량번호 검사 후 상세 이동용)

            isRegClick      : false,    // 부동산 등록/수정 버튼 클릭 여부(20211203 추가) - api중복방지

            isShowBanner          : false,  //CBT
        }

    },
    computed: {
         btnOnOff(){
            return this.vhcnoVal === "" ? "btn_off" : ""
        }
    },
    mounted() {
        this.initComponent(this.params)

         //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
        
        setTimeout(() => {
            this.$refs.vhcnoVal.focus()
        }, 100)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        // 화면 초기화
        initComponent(param = {}) {
            // this.isShowBanner = commonService.getOpenMenu()
            // if(!this.isShowBanner){
            //     modalService.alert("제휴사와 계약만료로 인한<br>시스템 변경 작업으로<br>NH콕마이카 서비스가 일시 중단됩니다.", "", "확인").then(text => {
            //         if(text === "확인") {
            //             this.close()
            //         }
            //     })
            // }

            this.popId = param.popId

            // 정보제공동의여부 조회
            // const config = {
            //     url     : "/co/co/00r03",
            //     data    : {
            //         mydtCusno   : this.getUserInfo("mydtCusno"),
            //         ofrHdngC    : "000001",  // 000001 : 카드/자동차, 000002 : 경제데이터
            //     }
            // }
            // apiService.call(config).then(response => {
            //     let agrYn   = response.agrYn    // "0" : 미동의 , "1" : 동의
            //     let stltTpc = response.stltTpc || ""
            //     let sqno    = response.sqno || ""
            //     this.certAgrYn = agrYn === "0" ? false : true

            //     if(!this.certAgrYn) {
            //         const config_pop = {
            //             component: COCA2106,
            //             params : {
            //                 certAgrYn   : this.certAgrYn || false,
            //                 stltTpc     : stltTpc,
            //                 sqno        : sqno,
            //                 popId       : "COCA2101",
            //             }
            //         }
            //         modalService.openPopup(config_pop).then(response => {
            //             if(response === "true") {
            //                 this.getData()
            //             }
            //         })
            //     } else {
            //         this.getData()
            //     }
            // })

             //자동차 약관정보 조회
            const config = {
                url     : "/co/as/07ra1",
                data    : {
                    mydtCusno   : this.getUserInfo("mydtCusno"),
                }
            }
            apiService.call(config).then(response => {
                let agrYn   = response.agrYn    // "0" : 미동의 , "1" : 동의
                let stltList = response.stltList || []
                this.certAgrYn = agrYn === "0" ? false : true

                if(!this.certAgrYn) {
                    const config_pop = {
                        component: COCA2107,
                        params : {
                            certAgrYn   : this.certAgrYn || false,
                            stltList     : stltList,
                            popId       : "COCA2101",
                        }
                    }
                    modalService.openPopup(config_pop).then(response => {
                        if(response === "true") {
                            this.getData()
                        }
                    })
                } else {
                    this.getData()
                }
            })
        },
        getData() {
            this.certAgrYn = true

            const config = {
                url     : "/as/ra/04r02",
                data    : {
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
            }
            apiService.call(config).then(response => {
                this.carList = response.carList || []
            
                this.$refs.vhcnoVal.focus()
            })
        },
        // 텍스트 삭제버튼 클릭
        del() {
            this.vhcnoVal = ""
        },
        // 다음 이동
        nextPage(e) {
            if(e.target.className.indexOf("btn_off") != -1 || this.isRegClick) return false

            this.isRegClick = true

            let mydtCusno = this.getUserInfo("mydtCusno")

            // NICE 자동차 조회 후 자동차테이블에 데이터 저장
            const config_s = {
                url : "/co/ca/01sa1",
                data : {
                    mydtCusno   : mydtCusno,   
                    vhcnoVal    : this.vhcnoVal,
                }
            }
            apiService.call(config_s).then(response => {
                if(response.resultCode == "0000" || response.resultCode == "5000") {    
                    // resultCode   0000 : NICE 자동차 조회 성공 후 자동차테이블에 저장 완료
                    //              5000 : 자동차테이블 내 해당 정보가 등록되어있는 상태
                    this.searchCarInfo(mydtCusno, this.vhcnoVal)
                } else {
                    modalService.alert("본인 소유의 차량만<br>등록 가능합니다.", "", "확인").then(text => {
                        if(text === "확인") {
                            this.vhcnoVal = ""
                            this.isRegClick = false // 버튼 재클릭 가능
                        }
                    })
                }
            })
        },
        // 자동차 테이블 조회
        searchCarInfo(cusNo, vhcNo) {
            const config = {
                url : "/co/ca/02r01",
                data : {
                    mydtCusno   : cusNo,
                    vhcnoVal    : vhcNo,
                }
            }
            apiService.call(config).then(response => {
                this.carModlnm = response.carModlnm || ""
                this.carMdyrYy = response.carMdyrYy || ""
                
                // 등록데이터 여부 확인
                this.dataExistGbn()
            })
        },
        // 등록데이터 여부 확인후 다음 로직 구분처리
        dataExistGbn() {
            // 등록한 자동차 정보인지 확인
            let isExist = false
            for(let i=0; i<this.carList.length; i++) {
                if(this.carList[i].vhcnoVal === this.vhcnoVal) {
                    isExist = true
                    break
                }
            }

            // 등록한 번호일 경우 팝업 닫고 해당 상세, 아니면 다음 팝업
            if(!isExist) {
                // 차량 상세정보 입력 팝업 오픈
                const config = {
                    component: COCA2102,
                    params : {
                        vhcnoVal    : this.vhcnoVal,
                        carModlnm   : this.carModlnm,
                        carMdyrYy   : this.carMdyrYy,
                        popId       : this.popId,
                    }
                }
                modalService.openPopup(config).then((response) => {
                    console.log("자동차 추가등록 ", response)
                })
            } else {
                modalService.alert("이미 등록된 자동차 번호입니다.").then(() => {
                    this.closeAll()
    
                    const menu = {
                        name: 'ASCA2001',
                        params : {"vhcnoVal" : this.vhcnoVal}
                    }
                    const currentPage = store.getters['layout/pageInfo']
                    if(currentPage.name !== menu.name) {
                        commonService.movePage(menu)
                    }
                })
            }
        },
        // 우측 상단 x 버튼 클릭(모든 팝업창 close)
        closePage() {
            const config = {
                content: ['입력중인 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'],
                title  : "",
            }
            modalService.confirm(config).then(text => {
                if(text == "예") {
                    this.closeAllData(true)
                }
            })
        },
        // 글자수 체크
        fn_checkWord(event, maxByte) {
            let rtnObj = checkWord(event.target.value, maxByte)

            if(rtnObj.flag) {this.$refs.vhcnoVal.blur()}   // 알럿 중복 방지

            event.target.value = rtnObj.value
            this.vhcnoVal = event.target.value
        }
    },
    components : {
    }
}
</script>