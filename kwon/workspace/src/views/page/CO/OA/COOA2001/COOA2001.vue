<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 현금
* @ 페이지설명 : 자산등록 > 현금 > step 1. 현금정보입력
* @ 파일명     : src/views/page/CO/OA/COOA2001/COOA2001.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-17
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-17              CS515897              최초작성
* 2021-06-15              CS515897              퍼블변경
* 2021-07-28              CS528061              고도화 및 파일명 변경(src/views/page/CO/OA/COOA1101/COOA1101.vue -> src/views/page/CO/OA/COOA2001/COOA2001.vue)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
    <div class="full_popup renewal" id="full_popup_01"> 
        <div class="popup_header">
            <h1>현금</h1>
            <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
        </div>
        
        <div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
            <div class="com_inner">
                <div class="com_inputarea_type07">
                    <div class="com_input_type01">
                        <input type="text" id="CO-OA-01-01" required="" placeholder="별칭 입력" title="별칭을 입력하세요." ref="astnm" :value="astnm" 
                                :class="astnm.length > 0 && foc_asetAm ? 'focusON focusforce' : ''" @focus="fn_focusOnOff('astnm')"
                                @keyup="fn_DelEmptySpace, moveNextTag($event), fn_checkWord($event, 40), fn_setVisible('asetAm')">
                        <label for="CO-OA-01-01">
                            <em><span class="blind">필수입력</span></em>
                            <span class="txt_label_x">별칭</span>
                        </label>
                        <div class="del_txt">
                            <a href="javascript:void(0);" class="com_btn_delete2" @click.prevent="del('astnm')" v-show="astnm.length > 0">
                                <span class="blind">삭제</span>
                            </a> <!-- style="display: none;" -->
                        </div>
                    </div>
                    <div class="com_input_type01 com_word1" v-show="vis_asetAm || isUpt">
                        <input type="tel" id="CO-OA-02-01" required="" placeholder="보유금액 입력" title="보유금액을 입력하세요." maxlength="17" 
                                :class="asetAm.length > 0 && foc_asetAm ? 'focusON focusforce' : ''"
                                @focus="fn_focusOnOff('asetAm')" v-model="asetAm" ref="asetAm" @keyup="addComma($event), moveNextTag($event), fn_setVisible('memoCntn')">
                        <label for="CO-OA-02-01">
                            <em><span class="blind">필수입력</span></em>
                            <span class="txt_label_x">보유금액</span>
                        </label>
                        <div class="del_txt">
                            <a href="javascript:void(0);" class="com_btn_delete2" @click.prevent="del('asetAm')" v-show="asetAm.length > 0">
                                <span class="blind">삭제</span>
                            </a> <!-- style="display: none;" -->
                            <span class="com_inputtxtright2">원</span>
                        </div>
                        <p class="com_sum">{{fn_hanValue(asetAm)}}</p>
                        <div class="btn_price_group">
                            <button type="button" class="btn_price" @click.prevent="addMoney(5)">+<strong>5</strong>만</button>
                            <button type="button" class="btn_price" @click.prevent="addMoney(10)">+<strong>10</strong>만</button>
                            <button type="button" class="btn_price" @click.prevent="addMoney(100)">+<strong>100</strong>만</button>
                            <button type="button" class="btn_price" @click.prevent="addMoney(1000)">+<strong>1000</strong>만</button>
                        </div>
                    </div>

                    <div class="com_textarea_type01 com_no_iconstar" v-show="vis_memoCntn || isUpt">
						<textarea id="CO-OA-03-01" class="com_txtarea_type01" cols="10" rows="5" required placeholder="메모를 입력하세요 (선택)"
                                 v-model="memoCntn" @keyup="moveNextTag($event), fn_checkWord($event, 100)" ref="memoCntn"></textarea>
						<label for="CO-OA-03-01"><span class="txt_label_x">메모</span></label>
					</div>
                </div>
            </div>
        </div>
        <a href="javascript:void(0);" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>

        <!-- footer S -->
        <div class="bottom_box">
            <div class="btn_full_box">
                <a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" @click.prevent="resistCash($event)">{{!isUpt?"등록":"수정"}}</a>
            </div>
        </div>
        <!--// footer E -->	
    </div>
    <!--// full popup E -->
</template>
<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import {keyupNumFormat} from '@/utils/number'
import {checkWord} from '@/utils/data'

import COCO2201 from '@/views/page/CO/CO/COCO2201/COCO2201'

export default {
    name : "COOA2001",
    data: () => {
        return {
            astnm       : "",   // 현금제목
            asetAm      : "",   // 현금금액
            memoCntn    : "",   // 메모내용

            popId   : "",       // 부모창에서 띄운 팝업창id(추가등록용)
            isUpt   : false,    // 수정으로 넘어온 유무 확인
            sqno    : "",       // 일련번호(수정일때만)

            // 태그 visible 관련
            vis_asetAm      : false,
            vis_memoCntn    : false,

            // 포커스 on/off 관련
            foc_astnm   : false,
            foc_asetAm  : false,
        }
    },
    computed: {
        btnOnOff() {
            return (this.astnm == "" || this.asetAm == "") ? "btn_off" : ""
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.popInit(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

        setTimeout(() => {
            this.$refs.astnm.focus()
        }, 100)
    },
    methods: {
        popInit(param = {}) {
            this.popId = param.popId
            // 수정으로 넘어왔는지 확인
            this.isUpt = param.isUpt
            if(this.isUpt === true) {   // 수정하기 위한 데이터 조회
                this.sqno = param.sqno

                const config = {
                    url: '/as/ra/06r01',
                    data: {
                        "mydtCusno": this.getUserInfo('mydtCusno'),
                        "sqno": this.sqno
                    }
                }
                apiService.call(config).then(response => {
                    this.astnm      = response.astnm || ""              // 자산명
                    this.asetAm     = String(response.asetAm) || ""     // 자산금액
                    this.memoCntn   = response.memoCntn || ""           // 메모

                    this.addComma()

                    this.$refs.astnm.focus()    // 수정으로 넘어올시 별칭 포커스
                })
            }
        },
        // 금액 천단위 쉼표 표시
        addComma(e="") {
            const selectionStartPos = this.$refs.asetAm.selectionStart
            const selectionEndPos = this.$refs.asetAm.selectionEnd

            if(this.asetAm.length == 1 && this.asetAm == 0) {
                this.asetAm = this.asetAm.slice(0, -1)
            } else {
                this.asetAm = this.asetAm.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                this.asetAm = this.asetAm.split(",").join("")
                this.asetAm = keyupNumFormat(this.asetAm)
            }

            if(e.keyCode === 8) {
                this.$nextTick(()=>{
                    this.$refs.asetAm.focus()
                    this.$refs.asetAm.setSelectionRange(selectionStartPos,selectionEndPos)
                })
            }
        },
        // 현금등록
        resistCash(e) {
            if(e.target.className.indexOf("btn_off") != -1) return false

            const config = {
                url : "/co/oa/01s01",
                data : {
                    trDsc       : !this.isUpt?'1':'2',              // 거래구분코드(1: 저장, 2: 수정, 3: 삭제)
                    sqno        : this.sqno,                        // 일련번호(수정일때만 값 존재)
                    mydtCusno   : this.getUserInfo('mydtCusno'),    // 마이데이터고객번호
                    astnm       : this.astnm,                       // 자산명
                    asetAm      : this.asetAm.split(',').join(''),  // 자산금액
                    memoCntn    : this.memoCntn,                    // 메모내용
                }
            }
            apiService.call(config).then(response => {
                if(!this.isUpt) {
                    if(response.rspC == '0000'){
                        this.openSuccess()
                    }else if(response.rspC == '9998'){
                        this.openFail('기타자산의 최대 등록 건 수(5000건)를 초과하였습니다.')
                    }else{
                        this.openFail('저장 중 오류가 발생하였습니다.')   
                    }
                    // response.rspC == '0000' ? this.openSuccess() : this.openFail('저장 중 오류가 발생하였습니다.')
                } else {
                    this.closeAllLeftMain({uptCom:true})
                }
            })
        },
        // 현금 등록 성공시 다음 팝업 오픈
        openSuccess() {
            const config = {
                component : COCO2201,
                params : {
                    titlTxt     : "현금",
                    subTxt      : "현금",
                    isAdd       : false,
                    isRlAsset   : true,
                    // popId       : this.popId,
                    assetId     : "Cash",
                    stsDsc      : "I",
                }
            }
            modalService.openPopup(config).then(response => {
                console.log("현금 추가등록 ", response)
            })
        },
        // 현금 등록 실패시 실패알럿
        openFail(msg) {
            modalService.alert(msg)
            return false
        },
        closePage() {
            const config = {
                content: ['입력중인 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'],
                title  : "",
            }
            modalService.confirm(config).then(text => {
                if(text == "예") {
                    if(!this.isUpt) this.close(true)
                    else this.close()
                }
            })
        },
        // 입력 텍스트 삭제
        del(type) {
            switch(type) {
                case 'astnm':
                    this.astnm = ""
                    break
                case 'asetAm':
                    this.asetAm = ""
                    break
                case 'memoCntn':
                    this.memoCntn = ""
                    break
            }
        },
        // 현금 별칭항목 맨 앞 띄어쓰기 제거
        fn_DelEmptySpace() {
            if(this.astnm.length === 1 && this.astnm.search(/\s/) === 0) {
                this.astnm = ""
            }
        },
        // input 클릭 시 focus 관련
        fn_focusOnOff(type) {
            switch(type) {
                case 'astnm' :
                    this.foc_astnm  = true
                    this.foc_asetAm = false
                    break
                case 'asetAm' :
                    this.foc_astnm  = false
                    this.foc_asetAm = true
                    break
            }
        },
        // 글자수 체크
        fn_checkWord(event, maxByte) {
            let rtnObj = checkWord(event.target.value, maxByte)

            if(rtnObj.flag) {   // 알럿 중복 방지
                if(event.target.id === "CO-OA-01-01") this.$refs.astnm.blur()
                else if(event.target.id === "CO-OA-03-01") this.$refs.memoCntn.blur()
            }

            event.target.value = rtnObj.value

            if (event.target.id === "CO-OA-01-01") this.astnm = event.target.value
            else if(event.target.id === "CO-OA-03-01") this.memoCntn = event.target.value
        },
        // 태그 visible 처리
        fn_setVisible(mod) {
            switch(mod) {
                case "asetAm" :
                    this.vis_asetAm = true
                    break
                case "memoCntn" :
                    this.vis_memoCntn = true
                    break
                default :
                    break
            }
        },
        fn_hanValue(amount) {
            const koreanUnits = ['', '만', '억', '조']
            let han_amount = parseInt(amount.split(',').join(''))
            let answer = ''
            let unit = 10000
            let index = 0
            let division = Math.pow(unit, index)
            if(amount === "") return

            while(Math.floor(han_amount / division) > 0) {
                const mod = Math.floor(han_amount % (division * unit) / division)
                if(mod) {
                    const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    answer = `${modToString}${koreanUnits[index]} ` + answer
                }
                division = Math.pow(unit, ++index)
            }
            return (answer + "원").replace(" 원","원")
        },
        addMoney(money) {
            this.fn_setVisible('memoCntn') // 메모 입력칸 show
            let tmpAsetAm = Number(this.asetAm.split(",").join(""));
            
            tmpAsetAm += money * 10000;

            // 최대 금액 9,999,999,999,999 이상인 경우 최대값 고정
            if(tmpAsetAm >= 9999999999999) {
                tmpAsetAm = 9999999999999;
            }
            this.asetAm = String(tmpAsetAm);
            this.addComma();
            this.fn_focusOnOff('asetAm');
            
        }
    },
    

}
</script>