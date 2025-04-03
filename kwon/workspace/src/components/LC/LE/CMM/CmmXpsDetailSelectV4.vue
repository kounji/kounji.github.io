<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 카드,페이머니,선불카드 지출내역 > 선택
* @ 페이지설명 : 지출 > 지출내역 > 카드,페이머니,선불카드 지출내역 > 선택 슬라이드팝업
* @ 파일명     : src/components/LC/LE/CMM/CmmXpsDetailSelect.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-07-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-19              CS533571                 최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- 슬라이드 팝업 시작 -->
        <div class="dimmed" style="display: block;" @click.prevent="close()"></div>
        <div class="popup_box renewal mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <strong v-if="type == TYPE_CARD" class="com_pop_tit01">카드 선택</strong>
                    <strong v-else-if="type == TYPE_PAY && subtype == SUBTYPE_PAYMONEY" class="com_pop_tit01">페이머니 선택</strong>
                    <strong v-else-if="type == TYPE_PAY && subtype == SUBTYPE_PPAYCARD" class="com_pop_tit01">선불카드 선택</strong>
                    <strong v-else-if="type == TYPE_PPAY" class="com_pop_tit01">선불 선택</strong>
                </div>
                <div class="popup_content">
                    <div class="radio_list noLine">
                        <div v-for="(item,index) in listAll" :key="index" @click.prevent="close(item)" class="btn_radio">
                            <!-- 페이머니 -->
                            <template v-if="type == TYPE_PAY && subtype == SUBTYPE_PAYMONEY">
                                <input type="radio" name="radio03" :id="'radio3-1' + index" :value="item.faceOnm + item.accIdVal" v-model="selectVal">
                                <label v-if="item.infOfrmnOrgC == ''" :for="'radio3-' + index">전체</label>
                                <label v-else :for="'radio3-' + index">{{item.faceOnm}}
                                    <template v-if="item.accIdVal && item.accIdVal !== 'NA'">
                                        <span class="common_bar"></span>
                                        {{item.accIdVal}}
                                    </template>
                                </label>
                            </template>

                            <!-- 카드, 선불카드 -->
                            <template v-else-if="type == TYPE_CARD || (type == TYPE_PAY && subtype == SUBTYPE_PPAYCARD)">
                                <input type="radio" name="radio03" :id="'radio3-' + index" :value="item.infOfrmnOrgC + item.mydtCdId" v-model="selectVal">
                                <label :for="'radio3-' + index">{{item.cdcoCdWrsnm}}</label>
                            </template>

                            <!-- 선불 -->
                            <template v-else-if="type == TYPE_PPAY">
                                <input type="radio" name="radio03" :id="'radio3-' + index" :value="item.infOfrmnOrgC + item.tfrTrkyVal" v-model="selectVal">
                                <label :for="'radio3-' + index">{{item.infOfrmnOrgCNm}}
                                    <template v-if="item.tfrTrkyVal && item.tfrTrkyVal !== 'NA'">
                                        <span class="common_bar"></span>
                                        {{item.tfrTrkyVal}}
                                    </template>
                                </label>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="popup_footer">
                </div>
                
                <a @click.prevent="close()" href="javascript:void(0);" role="button" class="btn_close"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// 슬라이드 팝업 종료 -->
    </div>
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

const TYPE_CARD = 'CARD'                // 카드 지출내역
const TYPE_PAY = 'PAY'                  // 페이 지출내역
const SUBTYPE_PAYMONEY = 'PAYMONEY'     // 페이 - 페이머니 지출내역
const SUBTYPE_PPAYCARD = 'PPAYCARD'     // 페이 - 선불카드 지출내역
const TYPE_PPAY = 'PPAY'                // 선불 결제내역

export default {
    name : "CmmXpsDetailSelectV4",
    data: () => {
        return {
            TYPE_CARD,
            TYPE_PAY,
            SUBTYPE_PAYMONEY,
            SUBTYPE_PPAYCARD,
            TYPE_PPAY,
            type     : "",          // 지출내역 종류
            subtype  : "",          // 지출내역 하위종류
            mydtCusno   : "",       // 마이데이터고객번호
            inqYm       : "",       // 조회년월
            mydtCdId    : "",       // 마이데이터카드식별자
            count       : 0,        // 목록 건수
            list        : [],       // 목록
            listAll     : [],       // 전체포함 목록
            calledId    : "",       // 호출한 화면 ID
            selectVal   : ""        // 부모창에서 넘어온 선택값
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)
    },
    methods: {
        initComponent(param) {
            this.mydtCusno = param.mydtCusno
            this.inqYm = param.inqYm
            this.selectVal = param.selectVal
            this.calledId = param.calledId
            this.type = param.type
            this.subtype = param.subtype

            console.log("____________________________________________")
            console.log("this.selectVal : ",this.selectVal)
            console.log("this.calledId : ",this.calledId)
            console.log("this.type : ",this.type)
            console.log("this.subtype : ",this.subtype)
            console.log("____________________________________________")


            if(this.type == TYPE_PAY && this.subtype == SUBTYPE_PAYMONEY && this.selectVal == '') {
                this.selectVal = "전체"
            }

            this.getData();
        },
        getData() {
            const config = {
                url : this.getDataUrl(),
                data : {
                    mydtCusno : this.mydtCusno,
                    inqYm     : this.inqYm,
                }
            }
            apiService.call(config).then(response => {
                this.assignData(response)

                //sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                setTimeout(() => {
                    //this.callJQueryFncExcute()
                }, 100)
            })
        },
        // response의 값들을 data에 매핑
        assignData(obj) {
            // 페이머니
            if(this.type == TYPE_PAY && this.subtype == SUBTYPE_PAYMONEY) {
                this.count = obj.faceOnmCn
                this.list = obj.faceOnmList
                
                // 목록의 처음에 출력될 항목 추가
                this.listAll.push({
                    mydtCusno : this.mydtCusno,
                    infOfrmnOrgC : "",
                    faceNo : "",
                    faceOnm : "전체",
                    accIdVal : "",
                    infOfrmnOrgCNm : "",
                })

            // 카드
            } else if(this.type == TYPE_CARD){
                this.count = obj.cardCn
                this.list = obj.cardList

                // 목록의 처음에 출력될 항목 추가
                this.listAll.push({
                    mydtCusno : this.mydtCusno,
                    infOfrmnOrgC : "",
                    mydtCdId : "",
                    cdcoCdNo : "",
                    cdcoCdWrsnm : "전체카드"
                })

            // 선불카드
            } else if(this.type == TYPE_PAY && this.subtype == SUBTYPE_PPAYCARD) {
                this.count = obj.ppayCdCn
                this.list = obj.ppayCdList

                // 목록의 처음에 출력될 항목 추가
                this.listAll.push({
                    mydtCusno : this.mydtCusno,
                    infOfrmnOrgC : "",
                    mydtCdId : "",
                    cdcoCdNo : "",
                    cdcoCdWrsnm : "전체"
                })

            // 선불(선불카드 아님)
            } else if(this.type == TYPE_PPAY) {
                this.count = obj.prepaidCn
                this.list = obj.prepaidList
            }


            // 리스트가 있을 경우 리스트를 전체포함 리스트에 삽입
            if(this.list.length > 0) {
                for(var i=0;i<this.list.length;i++) {
                    this.listAll.push(this.list[i])
                }
            }


console.log("this.list########################", this.list)


        },
        // 지출내역 수단별(카드, 페이(페이머니, 선불카드)) 호출 URL
        getDataUrl() {
            let url = ''
            switch(this.type) {
                // 카드일 경우
                case TYPE_CARD:
                    url = "/lc/le/12r01"
                    break

                // 페이일 경우
                case TYPE_PAY:
                    switch(this.subtype) {
                        // 페이머니일 경우
                        case SUBTYPE_PAYMONEY:
                            // 페이머니 지출내역에서 호출된 경우
                            if(this.calledId == "LCLE4003") {
                                url = "/lc/le/09r02"
                            // 선불(선불카드 아님) 지출내역에서 호출된 경우
                            }else if(this.calledId == "LCLE4006") {
                                url = "/lc/le/06r03"
                            }
                            break

                        // 선불카드일 경우
                        case SUBTYPE_PPAYCARD:
                            url = "/lc/le/11r02"
                            break
                    }
                    break

                // 선불일 경우
                case TYPE_PPAY:
                    url = "/lc/le/14r01"
                    break
            }

            return url
        }
    }
}
</script>
