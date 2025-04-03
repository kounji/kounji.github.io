<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 마이농가설정 > 계좌연동 설정
* @ 페이지설명 : 계좌연동 설정
* @ 파일명     : src/views/page/SZ/ST/SZST2113/SZST2113.vue
* @ 작성자     : CS523299
* @ 작성일     : 2021-08-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-06              CS523299                 
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>계좌연동 설정</h1>
		</div>
		<div class="popup_content com_bg_type00">
             <div class="com_inner com_top_type01">
                <div class="com_tabmenu_type03">
                    <ul role="tablist">
                        <li aria-controls="tab_01" :class="this.selItem === '0' ? 'on' : ''"><a href="javascript:void(0);" role="tab" :aria-selected="this.selItem === '0' ? 'true' : 'false'" @click="chngSelItem('0')"><span>등록된 계좌</span></a></li>
                        <li aria-controls="tab_02" :class="this.selItem === '1' ? 'on' : ''"><a href="javascript:void(0);" role="tab" :aria-selected="this.selItem === '1' ? 'true' : 'false'" @click="chngSelItem('1')"><span>계좌등록 하기</span></a></li>
                    </ul>
                </div>
            </div>
            <div role="tabpanel" id="tab_01" class="cmm-tab-panel on" v-show="acWrs">
                <div class="com_inner">
                    <strong class="com_box_tit02">등록된 계좌 편집</strong>
                    <!-- 계좌목록 R:기연동 -->
                    <!-- 20210901 한별 chk_list_type_02 클래스로 수정,dl dt dd 태그삭제 S -->
                    <template v-if="this.mydtAcList_R.length > 0">
                        <ul id="mydtAcList_R" class="list_type_01 chk_list_type_02">    
                            <li v-for="(listObj, idx) in this.mydtAcList_R" :key="idx">
                                <span class="btn_radio">
                                    <input type="checkbox" name="com_check_R_" :id="'com_check_R_'+idx" :value="listObj.mydtCusno+','+listObj.infOfrmnOrgC+','+listObj.mydtAcno+','+listObj.mydtScNo" @change="fn_delChkItem()">
                                    <label :for="'com_check_R_'+idx">
                                        <div>
                                            <i :class="listObj.infOfrmnOrgC"><span class="blind">농협</span></i>
                                            <em>{{listObj.acWrsnm}}</em>
                                            <span>{{listObj.mydtAcno}}</span>
                                        </div>
                                    </label>
                                </span>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <div class="no_data_box">
                            <div class="no_data_list">
                                <p>등록된 계좌가 없습니다.<br>계좌등록하기에서 계좌를 등록해 주세요</p>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div role="tabpanel" id="tab_02" class="cmm-tab-panel on" v-show="!acWrs">
                <div class="com_inner">
                    <strong class="com_box_tit02">등록 가능한 계좌</strong>
                    <!-- 계좌목록 N:미연동 -->
                    <!-- 20210901 한별 chk_list_type_02 클래스로 수정,dl dt dd 태그삭제 S -->
                    <template v-if="this.mydtAcList_N.length > 0">
                        <ul id="mydtAcList_N" class="list_type_01 chk_list_type_02">
                            <li v-for="(listObj, idx) in this.mydtAcList_N" :key="idx">
                                <span class="btn_radio">
                                    <input type="checkbox" name="com_check_N_" :id="'com_check_N_'+idx" :value="listObj.mydtCusno+','+listObj.infOfrmnOrgC+','+listObj.mydtAcno+','+listObj.mydtScNo" @change="fn_chkItem()">
                                    <label :for="'com_check_N_'+idx">
                                        <div>
                                            <i :class="listObj.infOfrmnOrgC"><span class="blind">농협</span></i>
                                            <em>{{listObj.acWrsnm}}</em>
                                            <span>{{listObj.mydtAcno}}</span>
                                        </div>
                                    </label>
                                </span>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <div class="no_data_box">
                            <div class="no_data_list">
                                <p>등록 가능한 계좌가 없습니다.</p>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_half_box">
            <a href="javascript:void(0);" role="button" @click="close()" class="btn btn_grey">취소</a>
            <template v-if="this.selItem === '0'">
                <a href="javascript:void(0);" role="button" @click="this.fn_delAcWrsInfo" class="btn btn_mint">삭제</a>
            </template>
            <template v-else>
                <a href="javascript:void(0);" role="button" @click="this.fn_saveAcWrsInfo" class="btn btn_mint">저장</a>
            </template>
			</div>
		</div>
		<a href="javascript:void(0);" role="button" @click="close" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>
<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import _ from 'lodash'

    export default {
        name : "SZST2113",
        data: () => {
            return {
				selItem         : "0",
                acWrs           : true,
                mydtAcList_R    : [],   // 기연동 목록
                mydtAcList_N    : [],   // 미연동 목록
                addDataList     : [],
                delDataList     : [],
			}
		},
        mixins: [
            popupMixin,
            commonMixin
        ],
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
				this.getMydtAcListInfo()
            },// 개인신용정보 전송요구내역 조회
			getMydtAcListInfo(){
				const config_R = {
                    url: '/sz/st/13r01',
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "inqDsc"    : "R"    // R:기연동, N:미연동
					}
                }
                
                const config_N = {
                    url: '/sz/st/13r01',
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "inqDsc"    : "N"    // R:기연동, N:미연동
					}
				}

				// console.log("config_N=", config_N)
				apiService.call(config_R).then(response => {
                    this.mydtAcList_R = response.mydtAcList || []
                })
                
                apiService.call(config_N).then(response => {
                    this.mydtAcList_N = response.mydtAcList || []
                })
                
            },
            // 라디오 버튼 변경 이벤트
            chngSelItem(val) {

                // 탭 변경시 초기화
                $("input[name='com_check_N_']").prop("checked", false);
                this.addDataList = [];
                $("input[name='com_check_R_']").prop("checked", false);
                this.delDataList = [];
                this.selItem = val
                if(this.selItem == '0') {   // 아파트 클릭
                    this.acWrs              = true
                } else {                    // 직접입력 클릭
                    this.acWrs              = false
                }
            },
            // 아이템 선택
            fn_delChkItem() {

                let temp = event.target.value.split(',')
                if(event.target.checked) {
                    this.delDataList.push({mydtCusno : temp[0], infOfrmnOrgC : temp[1], mydtAcno : temp[2], mydtScNo : temp[3]})
                } 
                else {
                    const idx = this.delDataList.indexOf(_.find(this.delDataList, {"mydtCusno":temp[0]}))
                    this.delDataList.splice(idx, 1)
                }
            },
            // 아이템 선택
            fn_chkItem() {

                let zongbugCnt = 0;
                let listZongbugCnt = 0;
                let temp = [];
                temp = event.target.value.split(',')
                if(event.target.checked) {
                    // 등록된 계좌에서 중복 추가 여부 체크
                    zongbugCnt = 0;
                    for(let i=0; i<this.mydtAcList_R.length; i++) {
                        if(this.mydtAcList_R[i].mydtCusno == temp[0] && this.mydtAcList_R[i].infOfrmnOrgC == temp[1] && this.mydtAcList_R[i].mydtAcno == temp[2] && this.mydtAcList_R[i].mydtScNo == temp[3]){
                            zongbugCnt++;
                        }
                    }

                    if(zongbugCnt > 0){
                        modalService.alert("이미 등록된 계좌 입니다").then(() => {});
                        event.target.checked = false;
                        return
                    }// 여기서 추가 하면 안되고 아래 판단까지 하고 추가 해야함.

                    // 현재 선택 중 중복건 존재 여부 체크
                    listZongbugCnt = 0;
                    for(let i=0; i<this.addDataList.length; i++) {
                        if(this.addDataList[i].mydtCusno == temp[0] && this.addDataList[i].infOfrmnOrgC == temp[1] && this.addDataList[i].mydtAcno == temp[2] && this.addDataList[i].mydtScNo == temp[3]){
                            listZongbugCnt++;
                        }
                    }

                    if(listZongbugCnt > 0){
                        modalService.alert("이미 선택된 중복되는 계좌 입니다").then(() => {});
                        event.target.checked = false;
                        return
                    }else if(zongbugCnt == 0 && listZongbugCnt == 0) {
                        this.addDataList.push({mydtCusno : temp[0], infOfrmnOrgC : temp[1], mydtAcno : temp[2], mydtScNo : temp[3]})
                    }

                } 
                else {
                    const idx = this.addDataList.indexOf(_.find(this.addDataList, {"mydtAcno":temp[2]}))
                    this.addDataList.splice(idx, 1)
                }

            },
            // 저장 처리
            fn_saveAcWrsInfo() {
                
                // 선택 여부 체크
                if(this.addDataList.length == 0){
                    modalService.alert("선택된 계좌가 없습니다.").then(() => {})
                    return;
                }

                const configYn = {
                    content: ['선택한 계좌를 연동 하시겠습니까?'],
                    title  : "",
                    // 예-아니요 순서 변경을 위해 아래 내용 추가
                    buttons: [
                        {text: "아니오", class: 'btn btn_grey btn_no'}, // 아니오(취소)
                        {text: "예", class: 'btn btn_mint'},            // 예(확인)
                    ]
                }
                // modalService.confirm(configYn).then(text => {
                modalService.alert(configYn).then(text => {
                    if(text === "예") {
                        let successCnt = 0;
                        for(let i=0; i<this.addDataList.length; i++) {

                            const config = {
                                url : '/sz/st/13s01',
                                data: {
                                    mydtCusno       : this.addDataList[i].mydtCusno,       // 마이데이터고객번호    
                                    infOfrmnOrgC    : this.addDataList[i].infOfrmnOrgC,    // 정보제공자기관코드                           
                                    mydtAcno        : this.addDataList[i].mydtAcno,        // 마이데이터계좌번호                         
                                    mydtScNo        : this.addDataList[i].mydtScNo,        // 마이데이터회차번호 
                                }
                            }

                            // console.log("config", config)
                            apiService.call(config).then(response => {
                                //저장 성공시
                                if(response.rspC == "0000") {
                                    successCnt++;
                                    if(this.addDataList.length === successCnt){
                                        modalService.alert("저장되었습니다.").then(() => {
                                            if(this.addDataList.length === successCnt){
                                                // 체크 상태 초기화
                                                $("input[name='com_check_N_']").prop("checked", false);
                                                this.addDataList = [];
                                            }
                                        });
                                        // 등록된 계좌 탭 이동
                                        this.selItem  = "0";
                                        this.acWrs = true;
                                        // 새로 고침
                                        this.getData();
                                    }
                                }
                            })
                        }

                    }
                })
            },
            // 삭제 처리
            fn_delAcWrsInfo() {

                // 선택 여부 체크
                if(this.delDataList.length == 0){
                    modalService.alert("선택된 계좌가 없습니다.").then(() => {})
                    return;
                }

                const configYn = {
                    content: ['선택한 계좌를 삭제 하시겠습니까?'],
                    title  : "",
                    // 예-아니요 순서 변경을 위해 아래 내용 추가
                    buttons: [
                        {text: "아니오", class: 'btn btn_grey btn_no'}, // 아니오(취소)
                        {text: "예", class: 'btn btn_mint'},            // 예(확인)
                    ]
                }
                // modalService.confirm(configYn).then(text => {
                modalService.alert(configYn).then(text => {
                    if(text === "예") {

                        let successCnt = 0;
                        for(let i=0; i<this.delDataList.length; i++) {

                            const config = {
                                url : '/sz/st/13d01',
                                data: {
                                    mydtCusno       : this.delDataList[i].mydtCusno,       // 마이데이터고객번호    
                                    infOfrmnOrgC    : this.delDataList[i].infOfrmnOrgC,    // 정보제공자기관코드                           
                                    mydtAcno        : this.delDataList[i].mydtAcno,        // 마이데이터계좌번호                         
                                    mydtScNo        : this.delDataList[i].mydtScNo,        // 마이데이터회차번호 
                                }
                            }

                            // console.log("config", config)
                            apiService.call(config).then(response => {
                                //저장 성공시
                                if(response.rspC == "0000") {
                                    successCnt++;
                                    if(this.delDataList.length === successCnt){
                                        modalService.alert("삭제되었습니다.").then(() => {
                                            if(this.delDataList.length === successCnt){
                                                // 체크 상태 초기화
                                                $("input[name='com_check_R_']").prop("checked", false);
                                                this.delDataList = [];
                                            }
                                        });
                                        this.getData()
                                    }
                                }
                            })

                        }

                    }
                })
            }
        }
    }
</script>