<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 약관/동의 > 이용약관
* @ 파일명     : src/views/page/MR/AT/MRAT1001/MRAT1001.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-18             CS515729                 최초작성
* 2022-08-01             CS528061                 고도화 및 파일명 변경(src/views/page/CO/AT/COAT1101/COAT1101.vue -> src/views/page/MR/AT/MRAT1001/MRAT1001.vue)  
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>약관 및 동의서</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="terms_list_arrow" v-for="(item, index) in stltList" :key="index">
					<strong class="com_pop_tit01">{{item.stltDsc == "2" ? "선택 동의" : "이용 약관"}}</strong>
					<ul>
						<li v-for="(subItem, subIndex) in item.stltList" :key="subIndex">
							<a href="javascript:void(0)" role="button" class="arrow" @click="openDetailPopup(subItem)">{{subItem.asetAmnStltTinm}}</a>
						</li>
					</ul>
				</div>
				<div class="terms_list_arrow">
					<strong class="com_pop_tit01">개인 정보</strong>
					<ul>
						<li>
							<a href="javascript:void(0)" role="button" class="arrow" @click="openPersonalInfo()">개인정보 처리방침</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import COAT1102 from '@/views/page/CO/AT/COAT1102/COAT1102'
import COAT1103 from '@/views/page/CO/AT/COAT1103/COAT1103' // 개인정보처리방침
import MRAT1002 from '@/views/page/MR/AT/MRAT1002/MRAT1002' // 경제쪽 제공약관 동의화면. add 2021.11.24
import _ from 'lodash'

export default {
    name : "MRAT1001",
    data: () => {
        return {
            respInfo  : {},
            stltList  : [],
            tranList  : [],
        }
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
            const config = {
                url: '/co/at/01r01',
                data: {}
            }
            apiService.call(config).then(response => {
                this.respInfo = response;
                this.stltList = this.fn_filterList(this.respInfo.stltList || [])
            })
        },
        /* 약관 및 동의서 상세 팝업 열기 */
        openDetailPopup(obj) {
            let config = {}
            if(obj.stltDsc === 2) {     // 1 : 이용약관, 2 : 선택동의(obj.stltTpc === "PFM007"에서 stltDsc로 변경)
                //경제쪽 제공약관 분기처리. add 2021.11.24
                config = {
                    component: MRAT1002, 
                    params : { "objStltInfo" : obj }
                }

            } else {
                config = {
                    component: COAT1102, 
                    params : {
                        "objStltInfo" : obj,
                        "callGbn" : "list"
                    }
                }
            }
            modalService.openPopup(config).then(() => {})
        },
        /* 약관 및 동의서 성격별 그룹핑 함수 */
        fn_filterList(objList) {
            this.tranList  = [];

            if(objList.length > 0) {
                let stltDsc = "";       // 약관 및 동의서 성격별 그룹핑 변수(1 : 이용약관, 2 : 선택동의)
                for(let i = 0; i < objList.length; i++) {
                    if(objList[i].stltTpc === "PFM006" || objList[i].stltTpc === "PFM007") stltDsc = 2;
                    else stltDsc = 1;

                    objList[i].stltDsc = stltDsc;
                    this.tranList.push(objList[i])
                }
            } else {
                this.tranList = []      // 응답 결과가 없을 때 초기화
            }

            // 이용약관, 선택동의 그룹핑 작업
            let resultList = _.chain(this.tranList)
						.uniqBy('stltDsc')
						.map(d => {
							return {
								stltDsc : d.stltDsc,
								stltList : _.filter(this.tranList, {stltDsc : d.stltDsc})
							}
						})
                        .value()
            return resultList
        },
        /* 개인정보 처리 방침 팝업 열기*/
        openPersonalInfo() {
            const config = {
                component: COAT1103,
            }
            modalService.openPopup(config).then(() => {})
        }
    },
    components: {
    }
}
</script>