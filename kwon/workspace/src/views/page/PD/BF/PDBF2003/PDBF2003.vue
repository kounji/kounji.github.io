<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 금융브리핑
* @ 페이지설명 : 금융생활 > 금융브리핑 > 통화선택
* @ 파일명     : src\views\page\PD\BF\PDBF2003\PDBF2003.vue
* @ 작성자     : CS528061
* @ 작성일     : 2022-10-05
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-05              CS528061              최초작성
* 2023-10-06              CS533571              마이데이터 확대개발 화면ID만 변경
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>통화 선택</h1>
                </div>
                <div class="popup_content com_btn_bottom">
                    <div class="com_txt_type02">
                        <ul class="com_slide_check_type03 custom_nation">
                            <li v-for="(curc, idx) in tranCurList" :key="'curc_'+idx">
                                <div class="btn_radio"> <!-- @click.prevent="chkItem(idx, $event)" -->
                                    <input type="checkbox" name="currency" :id="'currency_'+idx" :value="curc.curc" v-model="curArr">
                                    <label :for="'currency_'+idx" name="000">
                                        <i :class="'ico_'+curc.curc"><span class="blind">{{curc.curcCont}}</span></i>
                                        <span><span>{{curc.curcCont}}<br><em>{{curc.curc}}</em></span></span>
                                    </label>	
                                </div>	
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="btn_full_box2">
                        <a href="javascript:void(0);" class="btn btn_mint" role="button" @click.prevent="insertCurList()">등록</a>
                    </div>
                </div>
                <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import {dateFormat} from '@/utils/date'
import apiService from '@/service/apiService'

export default {
    name : "PDBF2003",
    data: () => {
        return {
            mydtCusno   : "",   // 마이데이터고객번호
            myCurList   : [],   // 나의 선택통화 목록
            curList     : [],   // 전체 통화 목록
            xcrtBasDt   : "",   // 환율 기준일자
            curDt       : "",   // 현재일자

            tranCurList : [],   // 23개국 통화 목록
            curArr      : [],   // 통화 선택
        }
    },
    mixins: [
        popupMixin
    ],
    computed : {
    },
    created() {
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.mydtCusno = this.getUserInfo('mydtCusno')
            this.curDt = dateFormat(new Date(), 'YYYYMMDD')
            this.getData();
        },
        getData() {
            this.myCurList   = []
            this.tranCurList = []

            /* 저장된 나의 통화 목록 테스트 데이터 */
            /*
            this.myCurList.push({"curc":"AUD"})
            this.myCurList.push({"curc":"DKK"})
            this.myCurList.push({"curc":"JPY"})
            */
            const config = { // 나의 선택 통화 목록 조회
                url: '/pd/bf/02ra1',
                data: {
                    mydtCusno : this.mydtCusno,     // 마이데이터고객번호
                }
            }
            apiService.syncCall(config).then(response => {
                this.myCurList = response.myCurList || []
                // this.callJQueryFncExcute()
            })

            this.getTotalCurc()
        },
        /*
        chkItem(idx, e) {
            let selCurc = this.curcList[idx];
            e.target.checked = false;    // 체크 유지 x
            
            //this.close(selCurc);
        },
        */
        insertCurList() {
            if(this.curArr.length > 3) {
                modalService.alert("최대 3개까지 설정가능합니다.").then(() => {})
                return;
            } else if(this.curArr.length == 0) {
                modalService.alert("통화를 선택하지 않았습니다.").then(() => {})
                return;
            }

            let rtnData = []

            // return
            if(this.curArr.length  > 0) {
                this.curArr.map(d => rtnData.push({"curc" : d}))
            }else{
                rtnData = {}
            }


            /* 선택 통화 저장 */
            const config = {
                url: '/pd/bf/03sa1',

                data: {"mydtCusno"      : this.mydtCusno,    // 마이데이터고객번호
                       "selectCurList"  : rtnData            // 통화 선택 목록
                      }
            };
            apiService.call(config).then(response => {
                if(response.rspC == '0000'){
                    this.close('success');
                    //modalService.alert("저장되었습니다.").then(() => {
                    //});
                } else {
                    modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {
                        //this.close('refresh');
                    })
                }
            });
        },
        getTotalCurc() {
            const config = {
                url : "/pd/my/31r02",       // /pd/my/01ra1
                data: {
                    "mydtCusno" : this.getUserInfo("mydtCusno"), // 마이데이터고객번호
                    "rgDt"      : this.curDt                     // 환율등록일자
                }
            }
            apiService.call(config).then(response => {
                this.curList = response.curcList || [];

                for(let i = 0; i < this.curList.length; i++) { // 보여줄 통화만 필터
                    if(this.curList[i].curc != "MXN" && this.curList[i].curc != "VND" && this.curList[i].curc != "RUB" && this.curList[i].curc != "CNH"
                    && this.curList[i].curc != "INR" && this.curList[i].curc != "MYR" && this.curList[i].curc != "PLN" && this.curList[i].curc != "KRW"
                    && this.curList[i].curc != "BHD") {
                        /* 국가명 줄임 */
                        if(this.curList[i].curcCont == "사우디아라비아") {
                            this.curList[i].curcCont = "사우디"
                        } else if(this.curList[i].curcCont == "남아프리카공화국") {
                            this.curList[i].curcCont = "남아공"
                        }

                        this.tranCurList.push(this.curList[i])
                    }
                }

                let curVal =[] // 저장된 통화코드를 담을 배열
                this.myCurList.map(obj => curVal.push(obj.curc)) // 저장된 통화코드 배열에 담기
                this.curArr = curVal // v-model에 통화코드 담기
            })
        }
    },
}
</script>