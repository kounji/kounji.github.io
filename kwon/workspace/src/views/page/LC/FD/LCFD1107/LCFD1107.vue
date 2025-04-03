<!--
/*************************************************************************
* @ 서비스경로 : 하단메뉴 > 지출분석 > 금융달력 > 수입/지출 상세 > 마이농가 수입/지출에 추가
* @ 페이지설명 : 하단메뉴 > 지출분석 > 금융달력 > 수입/지출 상세 > 마이농가 수입/지출에 추가
* @ 파일명     : src/views/page/LC/FD/LCFD1107/LCFD1107.vue
* @ 작성자     : CS515901
* @ 작성일     : 2021-05-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515901                 최초작성
*************************************************************************/
-->
<template>
    <div>
        <div class="dimmed" style="display:block;" @click.prevent="close()"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>마이농가 {{asetCtgrDsc === '1'?'수입':'지출'}}에 추가</h1>          
                </div>
                <div class="popup_content pop_btn_box">
                    <div class="pop_tit_item_box">
                        <div class="com_title">
                            <div class="tit">{{asetCtgrDsc === '1'?'수입':'지출'}}카테고리 선택</div>
                        </div>
                        <ul class="com_slide_check_type03" v-if="categoryCn > 0">
                            <li v-for="(item, idx) in categoryList" :key="idx">
                                <div class="btn_chk">
                                    <input type="radio" name="icom_caregory" :id="'icom_caregory_'+idx" :value="item" v-model="category" @change="btn_control()"/>
                                    <label :for="'icom_caregory_'+idx">
                                        <i :class="item.asetAmnCtgrId"><span class="blind">{{item.ctgrnm}}</span></i>
                                        <span>{{item.ctgrnm}}</span>			
                                    </label>	
                                </div>	
                            </li>
                        </ul>
                        <div class="com_title">
                            <div class="tit">작목 선택</div>
                        </div>
                        <ul class="com_radio_type03" v-if="abiCn > 0">
                            <li v-for="(item, idx) in abiList" :key="idx">
                                <div class="btn_radio">
                                    <input type="radio" name="crop" :id="'crop_' + idx" :value="item" v-model="abi" @change="btn_control()"/>
                                    <label :for="'crop_' + idx">
                                        <span>{{item.naWrsSclfnm}}</span>			
                                    </label>	
                                </div>	
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="btn_full_box">
                        <a href="javascript:void(0);" class="btn btn_mint" :class="{btn_off: btnViewYn}" @click="fn_confirm()">확인</a>
                    </div>
                </div>
                <a href="javascript:void(0);" class="btn_close" @click="fn_cancel()"><span class="">취소</span></a>
            </div>
        </div>
    </div>
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
// import apiService from '@/service/apiService'


export default {
    name : "LCFD1107",
    data: () => {
        return {
            asetCtgrDsc : "",
            categoryCn      : 0,    //카테고리건수
            categoryList    : [],   //마이농가카테고리목록
            abiCn           : 0,    //작목건수
            abiList         : [],   //마이농가작목목록
            category        : [],
            abi             : [],

            btnViewYn       : true,
        }
    },
    props: {
        cdata: {
            type: Object,
            default: () => ({})
        },
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
            this.asetCtgrDsc  = this.cdata.asetCtgrDsc	 || ''	//자산카테고리구분코드   1:수입, 2:지출, 3:이체
            const config = {
				url : "/lc/fd/07r01",
				data : {
                    mydtCusno : this.getUserInfo('mydtCusno'),
                    asetCtgrLclc : "2",                  //자산카테고리대분류코드 1:지출, 2:마이농가
                    asetCtgrDsc : this.asetCtgrDsc       //자산카테고리구분코드   1:수입, 2:지출, 3:이체
                }

			}
			apiService.call(config).then(response => {
                console.log(response)
                if(response.rspMsgC === "0000"){
                    this.categoryCn     = response.categoryCn   || 0
                    this.categoryList   = response.categoryList || []
                    this.abiCn          = response.abiCn        || 0
                    this.abiList        = response.abiList      || []
                }
			})
        },
        fn_cancel(){
            this.close('close')
        },
        fn_confirm(){
            if(this.btnViewYn){
                return false
            }
            if(this.category.length === 0){
                console.log('카테고리 아무것도 없다.')
                modalService.alert("카테고리를 선택해주세요.")
                return false
            }
            if(this.abi.length === 0){
                console.log('작목 아무것도 없다.')
                modalService.alert("작목을 선택해주세요.")
                return false
            }
            this.close({"myCategory":this.category, "myAbi":this.abi})
        },
        btn_control(){
            console.log('btn_control')
            if(this.category.length !== 0 && this.abi.length !== 0){
                this.btnViewYn = false
            }else{
                this.btnViewYn = true
            }
        }
    }
}
</script>