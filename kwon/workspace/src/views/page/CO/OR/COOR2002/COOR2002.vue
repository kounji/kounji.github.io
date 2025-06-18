<!--
/*************************************************************************
* @ 서비스경로 : 더보기>타기관 마이데이터 관리>마이데이터 가입·조회 및 관리
* @ 페이지설명 : 마이데이터 가입 조회 및 관리 안내
* @ 파일명     : src/views/page/CO/OR/COOR2002/COOR2002.vue
* @ 작성자     : CS530689
* @ 작성일     : 2024-11-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-25              CS530689                 최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- 팝업 시작 -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal mydata2023 other_mydata"><!-- 2024-11 : 타기관마이데이터 other_mydata 추가 -->
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <strong class="com_pop_tit01">안내</strong>
                </div>
                <div class="popup_content com_btn_bottom">
                    <div class="last_date">
                        <p class="com_txt_sub">마지막으로 조회한 결과를 불러옵니다.<br>
                            <!-- 갱신을 원하실 경우 아래 '갱신' 버튼을 눌러주세요 -->
                        </p>
                        <div class="list_gray_box">
                            <div class="date_info" v-if="rcnInqDtm">
                                <strong class="num">{{rcnInqDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</strong>
                                <p>(조회일시)</p>
                            </div>
                            <div class="date_info" v-else>
                                <strong class="num">조회일시 없음</strong>
                                <!-- <p>(조회일시)</p> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="popup_footer fixed">
                    <div class="btn_box">
                        <a href="javascript:void(0);" class="btn btn_mint" role="button" @click="moveAgree">조회</a>
                        <!-- btn_off 제거시 활성화 -->
                    </div>
                </div>
                <a href="javascript:void(0)" @click="close()" role="button" class="btn_close"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// 전체 팝업 종료 -->
    </div>
</template>

<script>
    // import Page from '@/views/layout/Page.vue'

    import apiService from '@/service/apiService'
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import routerService from '@/service/routerService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    import {mapGetters} from 'vuex'
    
    import COOR2003 from '@/views/page/CO/OR/COOR2003/COOR2003'
    import COOR2004 from '@/views/page/CO/OR/COOR2004/COOR2004'

    // import _ from 'lodash'

    export default {
        name : "COOR2002",
        data: () => {
            return {
                rcnInqDtm : null
            }
        },
        computed: {
        },
        created() {
        },
        mounted() {

            this.initComponent()
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        methods: {
            initComponent() {
                this.getData()
            },
            getData() {
                // const config = {
                //     url: '/co/or/01r01',
                //     data: {
                //         "mydtCusno" : this.getUserInfo('mydtCusno'),
                //     },
                //     disableLoading : true,
                // }

                // apiService.call(config).then(res =>{
                //     this.rcnInqDtm = res.rcnInqDtm
                // })
            },
            moveAgree() {
                const config = {
					component: COOR2003,
                }
                
				modalService.openPopup(config).then((res) => {
                    if(res === "ok"){
                        this.moveSearch()
                    }
                })
            },
            moveSearch() {
                const config = {
					component: COOR2004,
                }
                
				modalService.openPopup(config).then((res) => {
                    if(res){
                        this.moveSearchResult(res)
                    }
                })
            },
            moveSearchResult(res) {
                const config = {
                    name : 'COOR2005',
                    params : res
                }
                commonService.movePage(config)
                this.close()
            },
            movePrev() {
                routerService.movePrev()
            },
        },
        components : {
            // Page
        }
    }
</script>