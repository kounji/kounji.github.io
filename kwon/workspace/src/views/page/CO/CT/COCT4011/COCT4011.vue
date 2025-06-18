<!--
/*************************************************************************
* @ 서비스경로 : 금융지식 > 금융지식 상세 조회
* @ 페이지설명 : 금융지식 > 금융지식 상세 조회
* @ 파일명     : src/views/page/CO/CT/COCT4011/COCT4011.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-02-12
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-12              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<!-- <h1>금융지식 상세</h1> -->
		</div>

		<div class="popup_content">
		
			<!-- <section class="fin_wrap detail" ref="content" v-html="fnTest()"> -->
            <section class="fin_wrap detail" ref="content" v-html="cntzCntn">
				
			</section>
			
		</div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
//import axios from 'axios'
import apiService from '@/service/apiService'
import {mapActions} from 'vuex'
import _ from 'lodash'

export default {
    name : "COCT4011",
    data: () => {
        return {
            cntzCntn      : '' // 본문 내용
        }
    },
	computed: {
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

        //this.cntzCntn = require('/finance/CO/UI-CO-CT-4012.html')

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        initComponent(param) {
            this.getData(param)
        },

        getData(cntzId) {
            const config = {
                url: '/co/ct/01r02',
                data: {
                        cntzId : cntzId
                      }
            };

            apiService.call(config).then(response => {
                let htmlFileName = response.cntzCntn
                let _this = this // ajax 안에 들어가면 this가 달라짐
                $.ajax({
                    url : "/assets/finance/"+htmlFileName,
                    type : "get",
                    success: function(response){
                        //console.log(response);
                        _this.cntzCntn = response
                    },
                    fail: function(error){
                        console.log("error" ,error)
                        reject(error)
                    },
                }) 
            })
        },
    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>