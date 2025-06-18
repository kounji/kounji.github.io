<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표 > 목표등록
* @ 페이지설명 : 금융과생활 > 나의목표 > 목표등록 > 버킷리스트 > 여행지/기간선택
* @ 파일명     : src\views\page\PD\MY\PDMY2046\PDMY2046.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-08-20
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-20              CS516029              최초작성
* 2023-08-04              CS533453              고도화 파일명 변경(PDMY1115.vue -> PDMY2046.vue)
*************************************************************************/
-->
<template>
    <div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>버킷리스트</h1>
		</div>

        <div class="popup_content com_bg_type00">
			<div class="com_inner">
                <strong class="titH1">나의 워라밸, 설레는 여행!</strong>

                <ul class="com_slide_check_type02 place_link">
					<li v-for="(placeCommInfo, index) in placeCommList" :key="'key1_' + index">
                        <a @click.prevent="fn_goPDMY4025(index)" href="javascript:void(0);"><!-- 클릭시 PDMY4025 화면으로 return 여행장소코드/여행장소명/여행기간코드/여행기간명 -->
                            <dl>
                                <dt><i :class="setProgressBarClass(index)"><span class="blind">{{placeCommInfo.comnCExpl}}</span></i></dt>
                                <dd><span>{{placeCommInfo.comnCExpl}}</span></dd>
                            </dl>
                        </a>
                    </li>
                </ul>
			</div>
		</div>

        <a class="btn_close" @click.prevent="close()" href="javascript:void(0);"><span class="blind">팝업닫기</span></a>
    </div>

</template>
<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import PDMY2047 from '@/views/page/PD/MY/PDMY2047/PDMY2047' /* 버킷-여행(공통팝업) */
    import modalService from '@/service/modalService'

    export default {
        name : "PDMY2046",
        data: () => {
            return {
                placeCommList:[], // 여행지 공통코드 LIST
                pers:0,           // 인원수
                trvDsnC:'',       // 여행목적지코드
                trvDsnNm:'',      // 여행목적지명
                trvAirfare:'',    // 왕복항공료
                trvCost:'',       // 1일경비
                insYn:'C',
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent();

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent() {
                // 여행지조회 (공통코드)
                // 여행지(TRV_DSN_C)
                // 인원

                // 여행지 조회
                this.fn_getPlace()
            },
            fn_getPlace() {
                const config = {
                    url: '/co/co/00r01',
                    data: {
                            "comnCId": "TRV_DSN_C" // 공통코드 ID(여행지)
                            }
                };

                apiService.call(config).then(response => {
                    this.placeCommList = response.comnCList || []
                });
            },
            setProgressBarClass(index) {
                let setClass = 'icon_tour'

                if(Number(index + 1) >= 10) {
                    setClass += (index + 1)
                } else {
                    setClass += '0' + (index + 1)
                }

                return setClass
            },
            fn_goPDMY4025(index) {

                this.trvDsnC    = this.placeCommList[index].comnCVal  || ''
                this.trvDsnNm   = this.placeCommList[index].comnCExpl || ''
                this.trvAirfare = this.placeCommList[index].refCntn1  || '' // 왕복항공료
                this.trvCost    = this.placeCommList[index].refCntn2  || '' // 1일경비

                // 여행인원 슬라이드 팝업 호출
                const popConfig = {
                    params : {
                        gubn : '1', // 1:인원, 2:기간, 3:장소
                    },
                    renderer : {
                        component : PDMY2047
                    }
                }

                modalService.openSlidePagePopup(popConfig).then(response => {

                    this.pers = response.comnCVal || 0 // 인원수

                    // 인원수, 여행지 선택완료시 PDMY4025화면으로 이동
                    const rtnParam = {
                        trvDsnC    : this.trvDsnC    , // 여행장소코드
                        trvDsnNm   : this.trvDsnNm   , // 여행장소명
                        pers       : this.pers       , // 여행인원수
                        trvAirfare : this.trvAirfare , // 왕복항공료
                        trvCost    : this.trvCost    , // 1일경비
                    }
                    this.close(rtnParam)

                })
            },
        },
    }

</script>