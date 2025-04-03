<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 통신요금
* @ 페이지설명 : 지출 > 지출내역 > 통신요금 > 통신사선택 슬라이드 팝업
* @ 파일명     : src/views/page/LC/LE/LCLE4109/LCLE4109.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-06-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-03              CS515937              최초작성
* 2025-01-31              CS540687              마이데이터 v4.0
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
	<div class="dimmed" style="display: block;" @click.prevent="close()"></div>
	<div class="popup_box">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<h1>가입자번호 선택</h1>          
			</div>
			<div class="popup_content">
                <div class="com_txt_type02">
                    <ul class="com_radio_type01">
                        <li v-for="(item,index) in holdList" :key="index" @click.prevent="close(item)">
                            <span class="btn_radio">
                                <input type="radio" :name="'com_check' + index" :id="'com_check' + index" :value="item.comuCtrAmnNo" v-model="selectedAmnNo">
                                <label :for="'com_check' + index">
                                    <span>{{item.infOfrmnOrgCNm}}({{item.comuCtrEntNo | maskingFilter('phone')}})</span>
                                </label>
                            </span>
                        </li>
                    </ul>
                </div>
			</div>
			
			<a href="javascript:void(0);" @click.prevent="close()" class="btn_close"><span class="">취소</span></a>
		</div>
	</div>
	<!--// slide popup E -->
    </div>
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
// import _ from 'lodash'
  
export default {
    name: 'LCLE4109',
    data: () => {
        return {
            mydtCusno       : "",
            inqYm           : "",
            holdCn          : 0,
            holdList        : [],
            selectedAmnNo   : "",
        }
    },

    created() {
        this.initComponent(this.params)
    },
    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    computed : {
        // 가입관리번호 오름차순 정렬
        // 20211203 정렬기준 변경으로 미사용
        // sortedHoldList : function() {
        //     return _.orderBy(this.holdList, 'comuCtrAmnNo','asc')
        // }
    },

    mixins: [
        popupMixin,
        commonMixin,
    ],    
    
    methods: {
        initComponent(param) {
            this.mydtCusno      = param.mydtCusno || ''
            this.inqYm          = param.inqYm || ''
            this.selectedAmnNo  = param.selectedAmnNo || ''

            this.getData()
        },

        getData() {
            const config = {
                url : '/lc/le/09r01',
                data : {
                    mydtCusno   : this.mydtCusno,
                    inqYm       : this.inqYm,
                }
            }
            apiService.call(config).then(response => {
                this.holdCn     = response.holdCn || ''
                this.holdList   = response.holdList || ''

                // sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
                setTimeout(() => {
                    this.callJQueryFncExcute()
                }, 100)
            })

        },
    }
}
</script>
