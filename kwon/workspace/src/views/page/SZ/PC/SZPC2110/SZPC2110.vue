<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 정책자금 > 복지지원금
* @ 페이지설명 : 마이농가 > 정책자금 > 복지지원금 맞춤설정
* @ 파일명     : src/views/page/SZ/PC/SZPC2110/SZPC2110.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-05-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-31              CS516033              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>복지지원금 맞춤설정</h1>
        </div>
        <div class="popup_content com_bg_type00">
            <div class=" com_line_type01 com_bg_type00 com_top_type01">
                <div class="com_inner">
                    <div class="com_title">
                        <!-- <div class="tit mb10">생애주기, 대상특성 중 <span class="txt_mint bold">한 개 이상의 항목을</span> <br/>
                            선택하셔야 합니다.
                        </div> -->
                        <div class="tit mb10">생애주기 중 <span class="txt_mint bold">한 개 이상의 항목을</span> <br/>
                            선택하셔야 합니다.
                        </div>
                    </div>
                </div>
            </div>
            <div class="com_inner com_space_type01 chk_box_area">
                <strong class="com_cont_tit01">생애주기</strong>
                <div class="com_box_type01">
                    <span class="btn_checkbox">
                        <input type="checkbox" name="allagree" id="checkall1" v-model="lifeFqAllChkYn" @change="chkListAll('1')">
                        <label for="checkall1">
                            <span>생애주기 항목 한번에 선택</span>
                        </label>
                    </span>
                </div>
                <ul class="com_checkbox_type01">
                    <li v-for="(lifeFq, idx) in lifeFqList" :key="idx">
                        <input type="checkbox" name="agree" :id="'life_'+lifeFq.inteKwrdCntn" :checked="lifeFq.checked" @change="chgLifeFqValue">
                        <label :for="'life_'+lifeFq.inteKwrdCntn">
                            <span>{{lifeFq.inteKwrdCntnExpl}}</span>
                        </label>
                    </li>
                </ul>
            </div>
            <!-- 2021.12.16 대상특성 부분 주석처리 하기로 함
            <div class="com_inner chk_box_area">
                <strong class="com_cont_tit01">대상특성</strong>
                <div class="com_box_type01">
                    <span class="btn_checkbox">
                        <input type="checkbox" name="allagree" id="checkall2" v-model="objChrAllChkYn" @change="chkListAll('2')">
                        <label for="checkall2">
                            <span>대상특성  항목 한번에 선택</span>
                        </label>
                    </span>
                </div>
                <ul class="com_checkbox_type01">
                    <li v-for="(objChr, idx) in objChrList" :key="idx">
                        <input type="checkbox" name="agree" :id="'objC_'+objChr.inteKwrdCntn" :checked="objChr.checked" @change="chgObjChrValue">
                        <label :for="'objC_'+objChr.inteKwrdCntn">
                            <span>{{objChr.inteKwrdCntnExpl}}</span>
                        </label>
                    </li>
                </ul>
            </div> -->
        </div>
        <div class="popup_footer fixed">
            <div class="btn_half_box">
                <a href="javascript:void(0);" @click.prevent="reset()" class="btn btn_grey">전체해제</a>
                <a href="javascript:void(0);" @click.prevent="saveData()" class="btn btn_mint">저장</a>
            </div>
        </div>
        <a href="javascript:void(0);" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'
    import _ from 'lodash'

    export default {
        name : "SZPC2110",
        data : () => {
            return {
                lifeFqList      : [],    // 생애주기목록
                objChrList      : [],    // 대상특성목록
                listCheckYn     : false, // 체크 여부
                lifeFqAllChkYn  : false, // 생애주기 전체 체크 여부
                objChrAllChkYn  : false, // 대상특성 전체 체크 여부
                cusIntKwrdList  : [],    // 고객관심키워드목록 - 조회
                cusInteKwrdList : [],    // 고객관심키워드목록 - 저장
                cusLifeFqList   : [],
                cusObjChrList   : []
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
                // 전체 체크 여부 초기화
                this.lifeFqAllChkYn = false;
                this.objChrAllChkYn = false;
                this.listCheckYn    = false;

                const config = {
                    url: '/sz/pc/10r01',
                    data: {
                        cptDsc : '2' // 자금구분코드 - 2:복지지원금
                    }
                };

                apiService.call(config).then(response => {
                    this.lifeFqList = response.lifeFqList || [];
                    this.objChrList = response.objChrList || [];

                    this.getCusData();
                });
            },
            getCusData() {
                const config = {
                    url: '/sz/pc/14r02',
                    data: {
                        mydtCusno : this.getUserInfo('mydtCusno'), // 고객번호
                        cptDsc    : "2"                            // 자금구분코드 - 2:복지지원금
                    }
                };

                apiService.call(config).then(response => {
                    this.cusIntKwrdList = response.cusIntKwrdList || [];
					
					this.cusLifeFqList = this.cusIntKwrdList.filter(d => d.pycpInteKwrdDsc === '11');
					this.lifeFqList = this.setUserItem(this.lifeFqList, this.cusLifeFqList);
					
					this.cusObjChrList = this.cusIntKwrdList.filter(d => d.pycpInteKwrdDsc === '12');
					this.objChrList = this.setUserItem(this.objChrList, this.cusObjChrList);
                    
                    this.setChkListAll()
                });
            },
            // 저장된 맞춤설정 항목이 있을경우 checked
            setUserItem(codeList, userList) {
                codeList = _.chain(codeList).map(d => {
                    return{
                        inteKwrdCntn : d.inteKwrdCntn,
                        inteKwrdCntnExpl : d.inteKwrdCntnExpl,
                        checked : typeof _.find(userList, {'inteKwrdCntn':d.inteKwrdCntn}) !== 'undefined' ? true : false
                    }
                }).value()
                
                return codeList
            },
            // 한번에 선택
            chkListAll(gbn) {
                // 생애주기
                if (gbn == '1') {
                    for (let k=0; k < this.lifeFqList.length; k++) {
                        this.lifeFqList[k].checked = this.lifeFqAllChkYn;
                        $("#"+this.lifeFqList[k].inteKwrdCntn).prop("checked", this.lifeFqAllChkYn);
                    }
                }
                // 대상특성
                else {
                    for (let k=0; k < this.objChrList.length; k++) {
                        this.objChrList[k].checked = this.objChrAllChkYn;
                        $("#"+this.objChrList[k].inteKwrdCntn).prop("checked", this.objChrAllChkYn);
                    }
                }

                this.setChkListAll();
            },
            // 생애주기 개별 선택
            chgLifeFqValue(event) {
                for (let k=0; k < this.lifeFqList.length; k++) {
                    if (event.target.id == ('life_' + this.lifeFqList[k].inteKwrdCntn)) {
                        this.lifeFqList[k].checked = event.target.checked;
                        break;
                    }
                }

                this.setChkListAll();
            },
            // 대상특성 개별 선택
            chgObjChrValue(event) {
                for (let k=0; k < this.objChrList.length; k++) {
                    if (event.target.id === ('objC_' + this.objChrList[k].inteKwrdCntn)) {
                        this.objChrList[k].checked = event.target.checked;
                        break;
                    }
                }

                this.setChkListAll();
            },
            // 한번에 선택 체크 확인
            setChkListAll() {
                let lifeCnt = 0;
                let objCnt  = 0;
                let allCnt  = 0;

                this.listCheckYn = false;

                // 생애주기
                for (let k=0; k < this.lifeFqList.length; k++) {
                    if(this.lifeFqList[k].checked == true) {
                        lifeCnt++;
                    }
                }
                
                if (this.lifeFqList.length == lifeCnt) {
                    this.lifeFqAllChkYn = true;
                } else {
                    this.lifeFqAllChkYn = false;
                }

                // 대상특성
                for (let k=0; k < this.objChrList.length; k++) {
                    if(this.objChrList[k].checked == true) {
                        objCnt++;
                    }
                }
                
                if (this.objChrList.length == objCnt) {
                    this.objChrAllChkYn = true;
                } else {
                    this.objChrAllChkYn = false;
                }

                // 저장 버튼 활성화
                allCnt = lifeCnt + objCnt;
                if (allCnt > 0) {
                    this.listCheckYn = true;
                }
            },
            reset() {
                const config = {
                    content : ['선택을 전체 해제 하시겠습니까?'],
                    title   : ""
                };

                modalService.confirm(config).then(text => {
                    if(text == "예") {
                        this.lifeFqAllChkYn = false;
                        this.chkListAll('1');

                        this.objChrAllChkYn = false;
                        this.chkListAll('2');
                    }
                });
            },
            saveData() {
                // if (!this.listCheckYn) { return; }

                this.cusInteKwrdList = [];

                // 생애주기
                for (let k=0; k < this.lifeFqList.length; k++) {
                    if (this.lifeFqList[k].checked == true) {
                        this.lifeFqList[k].pycpInteKwrdDsc = "11";
                        this.cusInteKwrdList.push(this.lifeFqList[k]);
                    }
                }

                // 대상특성
                for (let k=0; k < this.objChrList.length; k++) {
                    if (this.objChrList[k].checked == true) {
                        this.objChrList[k].pycpInteKwrdDsc = "12";
                        this.cusInteKwrdList.push(this.objChrList[k]);
                    }
                }

                const config = {
                    url: '/sz/pc/10s01',
                    data: {
                        cptDsc          : '2',                           // 자금구분코드 - 2:복지지원금
                        mydtCusno       : this.getUserInfo('mydtCusno'), // 고객번호
                        cusInteKwrdList : this.cusInteKwrdList           // 고객관심키워드목록
                    }
                };

                apiService.call(config).then(response => {
                    let rspC = response.rspC;
                    let msg  = "";
                    rspC == "0000" ? msg = "저장되었습니다." : msg = "저장 중 오류가 발생하였습니다.";
                    modalService.alert(msg).then(() => {
                        if (rspC == "0000"){
                            this.close(rspC);
                        }
                    });
                });
            }
        }
    }
</script>