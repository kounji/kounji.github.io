<!--
/*************************************************************************
* @ 서비스경로 : 콕마이데이터설정 > 대면상담 일회성동의
* @ 페이지설명 : 콕마이데이터설정 > 대면상담 일회성동의 > 대면상담 일회성동의 안내
* @ 파일명     : src/views/page/CO/OR/COOR4201/COOR4201.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-05-12
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-05-12              CS541013              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view">
        <!-- content -->
        <div id="content">
            <div class="face_consult">
                <template v-if="!isAgree">
                    <p class="txt">
                        <span class="item01"></span>
                        NH콕마이데이터 조회를 위한<br>대면상담 일회성 동의화면 입니다.
                    </p>
                    <div class="btns_wrap">
                        <button type="button" class="btns lg primary" @click.prevent="fnOpenAgree">대면상담 일회성 동의하기</button>
                    </div>
                </template>
                <template v-else>
                    <p class="txt">
                        <span class="item02"></span>
                        <strong>콕마이데이터 대면서비스<br>신청이 완료되었습니다.</strong>
                        마이데이터 담당자와 함께<br>체계적인 자산관리를 받아보세요.
                    </p>

                    <dl class="gray_box">
						<div>
							<dt>마이데이터 담당직원</dt>
							<dd>{{brnm}} {{rqrmnm}}</dd>
						</div>
						<div>
							<dt>대면상담일자</dt>
							<dd><span>{{sbpBasDt}}</span></dd>
						</div>
					</dl>
                    <div class="btns_wrap">
					    <button type="button" class="btns lg primary" @click.prevent="fnAssetUpdate">확인</button>
                    </div>
                </template>
            </div>
        </div>
        <!--// content -->

        <footersV2 type=""/> 
    </page>  
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import commonService from '@/service/commonService'
import {dateFormat, dayDiff} from '@/utils/date'
import _ from 'lodash'

import COOR4202 from '@/views/page/CO/OR/COOR4202/COOR4202'
import COOR4207 from '@/views/page/CO/OR/COOR4207/COOR4207'

export default {
    name : "COOR4201",
	data: () => {
        return {
            isAgree             : false,        // 업데이트 완료 여부 확인
            sbpBasDt            : '',           // 대면상담 일자

            brnm                : '',           // 사무소명
            rqrmnm              : '',           // 요청자명
		}
	},
	computed: {
		
	},
    mounted() {
        this.initComponent(this.pageInfo.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
	mixins: [
        commonMixin
    ],
	methods: {
        initComponent(param = {}) {
            console.log("$$$ param -> ", param)
            this.brnm = param.brnm
            this.rqrmnm = param.rqrmnm       
        },
		fnOpenAgree() {
            const config = {
                params : {},
                renderer : {
					component : COOR4202
				}
                // component : COOR4202
            }
            modalService.openSlidePagePopup(config).then((response) => {
                console.log("COOR4202 close popup", response)

                if(!_.isEmpty(response)) {
                    if(response.isAgree) {
                        this.isAgree = response.isAgree
                        this.sbpBasDt = dateFormat(new Date(), 'YYYY.MM.DD HH:mm')          // 대면상담 일자        
                    }
                }
            })
        },
        fnAssetUpdate() {
            const config = {
                params : {},
                component : COOR4207
                // 슬라이드 팝업으로 열 경우 자산연결화면에서 슬라이드 팝업 호출시 에러
                // renderer : {
				// 	component : COOR4207
				// }
            }
            // modalService.openSlidePagePopup(config).then((response) => {
            modalService.openPopup(config).then((response) => {
                console.log("COOR4207 close popup", response)
            })
		},
	},
    watch: {
        
    },
	components: {
		Page,
        FootersV2,
	}
}
</script>