<!--
/*************************************************************************
* @ 서비스경로 : 설정/관리 > 서비스해지
* @ 페이지설명 : 설정/관리 > 서비스해지
* @ 파일명     : src/views/page/CO/CO/COCO1102/COCO1102.vue
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
            <h1>서비스탈퇴</h1>
        </div>

        <div class="popup_content com_bg_type00">
            <div class="com_inner com_line_type01 com_top_type02">
                <div class="com_txt_tit01">
                    <strong class="com_point_darkblue">마이데이터 서비스를 <a href="javascript:void(0)" @click.prevent="goMain">탈퇴</a></strong>하시겠습니까?
                </div>
                <p class="com_txt_sub01">저장된 개인정보와 설정이 모두 삭제되고,<br>
                    혜택 정보도 사라집니다.<br>
                    재 가입 시 기존 정보를 불러올 수 없습니다.
                </p>
            </div>
            <div class="com_inner mt30">
                <template v-if="assetList.length > 0">
                    <div class="com_box_type03 com_bg_type02 serviceout_box">
                        <template v-for="(item, idx) in assetList" >
                            <template v-for="(item1, idx1) in item" >
                                <div class="tit" :key="'bank_'+idx+'_'+idx1">{{item1.orgnm}}</div>
                                <dl class="new_accountlist02" v-for="(item2, idx2) in item1.wrsList" :key="'wrs_'+idx+'_'+idx1+'_'+idx2">
                                    <dt>{{item2.wrsnm}}</dt>
                                    <dd class="com_point_darkblue">
                                        <template v-for="(item3) in item2.accList">
                                            {{item3.wrsCntn}}
                                        </template>
                                    </dd>
                                </dl>
                            </template>
                        </template>
                    </div>
                </template>
                <p class="dot_msg mt15">
                    위 기관 의 정보 수집이 철회되며 수집된 신용정보가 삭제합니다.
                </p>
            </div>
        </div>

        <div class="popup_footer fixed">
            <div class="com_btnhalfbox_type02">
                <a href="javascript:void(0);" @click.prevent="close()" class="btn btn_grey">취소</a>
                <a href="javascript:void(0);" @click.prevent="fn_withdrawService()" class="btn btn_mint">서비스탈퇴</a>
            </div>
        </div>
        <a href="javascript:void(0);" @click.prevent="close()" class="btn_close"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'

    import COCO1103 from '@/views/page/CO/CO/COCO1103/COCO1103'
    import _ from 'lodash'

    export default {
        name : "COCO1102",
        data: () => {
            return {
                assetList : [],  //연결된 자산목록
                btnClickCnt : 0, //버튼클릭 카운트
            }
        },
        mounted() {
            this.initComponent();

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
                const config = {
                    url: '/co/am/08r01', //'/co/am/05r01', 
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                    },
                    disableLoading : true,
                };
                apiService.call(config).then(response => {
                    this.userAsetList = response.bzrgList || []

                    let bankList 	= (typeof _.find(this.userAsetList, {"comnCVal":"bank"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"bank"}).orgList : []
                    let investList 	= (typeof _.find(this.userAsetList, {"comnCVal":"invest"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"invest"}).orgList : []
                    let cardList 	= (typeof _.find(this.userAsetList, {"comnCVal":"card"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"card"}).orgList : []
                    let insuList	= (typeof _.find(this.userAsetList, {"comnCVal":"insu"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"insu"}).orgList : []
                    let efinList 	= (typeof _.find(this.userAsetList, {"comnCVal":"efin"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"efin"}).orgList : []
                    let capitalList = (typeof _.find(this.userAsetList, {"comnCVal":"capital"}) !== "undefined")? _.find(this.userAsetList, {"comnCVal":"capital"}).orgList : []
                    let ginsuList 	= (typeof _.find(this.userAsetList, {"comnCVal":"ginsu"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"ginsu"}).orgList : []
                    let telecomList	= (typeof _.find(this.userAsetList, {"comnCVal":"telecom"}) !== "undefined")? _.find(this.userAsetList, {"comnCVal":"telecom"}).orgList : []

                    if(bankList.length > 0) this.assetList.push(bankList)
                    if(investList.length > 0) this.assetList.push(investList)
                    if(cardList.length > 0) this.assetList.push(cardList)
                    if(insuList.length > 0) this.assetList.push(insuList)
                    if(efinList.length > 0) this.assetList.push(efinList)
                    if(capitalList.length > 0) this.assetList.push(capitalList)
                    if(ginsuList.length > 0) this.assetList.push(ginsuList)
                    if(telecomList.length > 0) this.assetList.push(telecomList)

                })
            },
            /*
            * 마이데이타 고객 탈퇴 및 수집DATA Delete 처리 API
            */
            fn_withdrawService() {
                const config = {
                    url: '/co/co/02s03',
                    data: {
                        mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                        tmsBrkDelDsc : "1",  //전송내역삭제구분코드 : "1" 탈회, "2" 철회
                        clientId     : this.getUserInfo('svcClientId')
                    }
                }
                apiService.call(config).then(response => {
                    if(response.rsp_code === "00000" || response.rsp_code === "6001" || response.rsp_code === "00001") {
                        //let crmCusno = response.crmCusno
                        this.fn_withdrawPFMService()
                    }
                })
            },

            /*
            * PFM 서비스 해지 API
            */
            fn_withdrawPFMService() {
                const config = {
                    url: '/co/co/02s02',
                    data: {
                        mydtCusno : this.getUserInfo('mydtCusno'),  //마데고객번호
                        cusno     : this.getUserInfo('crmCusno')    //CRM고객번호
                    }
                }
                apiService.call(config).then(response => {
                    let rspC = response.rspC;
                    if (rspC  === "0000") {
                        this.movePage()
                    }
                })
            },

            movePage() {
                const config = {
                    component : COCO1103
                };
                modalService.openPopup(config).then(() => {
                });
            },
            goMain(){
					this.btnClickCnt++
					if(this.btnClickCnt === 5)
					{
						if(import.meta.env.VITE_ENV !== 'R') {
							sessionStorage.clear()
                            location.href = '/login.html'
                        }
                        this.btnClickCnt = 0
					}
			}            
        }
    }
</script>