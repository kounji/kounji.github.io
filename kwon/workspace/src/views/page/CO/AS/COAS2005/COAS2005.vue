<!--
/*************************************************************************
* @ 서비스경로 : 자산관리 서비스 가입 > 거래농축협 선택 슬라이드 팝업
* @ 페이지설명 : 거래농축협 선택
* @ 파일명     : src/views/page/CO/AS/COAS2005/COAS2005.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-01              CS528069              최초작성
* 2023-08-23              CS533035              화면번호수정(COAS1005->COAS2005)
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click.prevent="closeSlide()"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>거래 농축협을 선택해 주세요</h1>
                    <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
                </div>
                <div class="popup_content">
                    <div class="com_txt_type02">
                        <div class="new_sec_box custom">
                            <ul class="list_round_box">
                                <li v-for="(item, idx) in brList" :key="idx">
                                    <input type="radio" name="com_check" :id="'com_check'+idx" :checked="item.checked" :value="item.brc" @change="fn_setBrcInfo(item)">
                                    <label :for="'com_check'+idx">
                                        <dl>
                                            <dt>{{item.brnm}}</dt>
                                            <dd>{{item.brAdr}}</dd>
                                        </dl>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div class="custom_box">
                            <div class="com_btn_area mb0">
                                <a href="javascript:void(0);" class="com_btn_round" @click.prevent="fn_directSrch()">
                                    <span class="btn_go">직접찾기</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="closeSlide()"><span class="">취소</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import {mapGetters} from 'vuex'
    import _ from 'lodash'

    import COAS2006 from '@/views/page/CO/AS/COAS2006/COAS2006'

    export default {
        name: 'COAS2005',
        data: () => {
            return {
                brList	  : [],  //거래지점 리스트
            }
        },
        computed: {
            ...mapGetters('user', [
                'userTermsInvtInfo',
                'userTermsAgreeList',
                'userRecvInfo'
            ]),
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        created() {
            
        },
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: { 
            initComponent() {
                console.log("this.userTermsAgreeList >> ", this.userTermsAgreeList)
                this.getData()
            },
            getData() {
                //////////////////////////////
                // 거래농축협 조회
                //////////////////////////////
                const config = {
                    url : '/co/as/05r01',
                    data : {
                        mydtCusno : this.getUserInfo('mydtCusno'),
                        eno : ""
                    }
                }
                apiService.call(config).then(response => {
                    this.brList = response.brList || []

                    for(let i=0; i < this.brList.length; i++) {
                        this.brList[i].checked = false
                    }
                })
            },

            /* 거래농축협 선택 */
            fn_setBrcInfo(brcObj) {
                for(let i=0; i < this.brList.length; i++) {
                    if(this.brList[i].brc === brcObj.brc) {
                        this.brList[i].checked = true
                    } else {
                        this.brList[i].checked = false
                    }
                }

                // 선택된 객체 모창 팝업으로 리턴
                // console.log({brcObj : (_.filter(this.brList, {checked : true}))[0]})
                this.close({brcObj : (_.filter(this.brList, {checked : true}))[0]})
            },

            /* 직접찾기 버튼 클릭 */
            fn_directSrch() {
                const config = {
                    component : COAS2006,
                }
                // 슬라이드팝업 -> 풀 팝업 호출 시 필수 코드
                config.renderer = this.modalConfig.renderer

                modalService.openPopup(config).then(response => {
                    this.close({brcObj : response.brcObj})
                })
            },

            /* 슬라이드 팝업 닫기 */
            closeSlide() {
                this.close()
            }
            
        },
        components: {      
            
        },
    }
    
</script>