<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 자동차
* @ 페이지설명 : 자산등록 > 자동차> step 2-2. 차량주행거리선택
* @ 파일명     : src/views/page/CO/CA/COCA1104/COCA1104.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-06-21
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-06-21              CS515897              최초작성
*************************************************************************/
-->
<template>
<div>
    <div class="dimmed" style="display:block;" @click.prevent="close()"></div>
	<div class="popup_box">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<h1>주행거리(단위 Km)</h1>          
			</div>
			<div class="popup_content">
                <div class="com_txt_type03">
                    <ul class="com_radio_type01">
                        <li v-for="(item, idx) in list" :key="'car_dist_'+idx">
                            <span class="btn_radio">
                                <input type="radio" :name="'car_dist_'+idx" :id="'car_dist_'+idx" @click.prevent="itemSelect(item)" :checked="item.checked">
                                <label :for="'car_dist_'+idx">
                                    <span>{{item.comnCExpl}}</span>
                                </label>
                            </span>
                        </li>
                    </ul>
                </div>
			</div>
			<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
		</div>
	</div>
</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'

export default {
    name : "COCA1104",
    data: () => {
        return {
            list : [],
        }

    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        // 화면 초기화
        initComponent(param = {}) {
            this.getData()
            this.list = param.list
            
            if(param.selectVal != "") {
                for(let i=0; i<this.list.length; i++) {
                    if(this.list[i].comnCVal == param.selectVal) {
                        this.list[i].checked = true
                    } else {
                        this.list[i].checked = false
                    }
                }
            }
        },
        getData() {
            
        },
        itemSelect(data) {
            const rtnParam = {
                comnCVal : data.comnCVal,
                comnCExpl : data.comnCExpl
            }
            this.close(rtnParam)
        }
    },
    components : {
    }
}
</script>