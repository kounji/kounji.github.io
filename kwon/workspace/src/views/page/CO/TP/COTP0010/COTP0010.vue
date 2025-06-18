<!--
/*************************************************************************
* @ 서비스경로 : 금융지식 > 연령별 추천 선택
* @ 페이지설명 : 금융지식 > 연령별 추천 선택
* @ 파일명     : src/views/page/CO/TP/COTP0010/COTP0010.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-02-12
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-12              CS541599              최초작성
*************************************************************************/
-->
<template>
	<div>
		<div class="dimmed" style="display: block;"></div>
		<div class="popup_box">
			<div aria-hidden="false" class="slide_popup">
				<div class="popup_header">
					<h1>연령별 추천 선택</h1>
				</div>
				<div class="popup_content">
					
					<ul class="age_list">
						<li v-for="(item, index) in ageList" :key="index">
							<input type="radio" name="age_rdo" :id="mappingIcon(item.comnCVal)" v-model="ageCd" :value="item.comnCVal" :checked="ageCd==='21'" @click.prevent="selectAge(item.comnCVal)">
							<label :for="mappingIcon(item.comnCVal)">{{item.comnCExpl}}</label>
						</li>
					</ul>

				</div>

				<a href="#nolink" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
			</div>
			
		</div>
	</div>
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import {mapActions} from 'vuex'
import _ from 'lodash'

export default {
    name : "COCT4001",
    data: () => {
        return {
            ageCd    : '', // 연령별 추천 선택
			ageList  : [], // 공통코드 연령별 List
        }
    },
	computed: {
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
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        initComponent(param) {
			this.getData()

            console.log("파라미터 =>",param)
            this.ageCd = param;

			

        },
		getData() {
			this.ageList.push({'comnCId':'FNKI_AG_LRG_DSC', 'comnCVal':'00', 'comnCExpl':'전체', 'sortSq':0, 'delYn':'0'})

			const config = {
                url: '/co/co/00r01',
                data: {
                    comnCId   : "FNKI_AG_LRG_DSC", // 금융지식연령대구분코드(연령대)
					delYn     : '0'                // 삭제여부
                }
            }
			let tmpAgeList = []

            apiService.call(config).then(response => {
				// 21,22,23,24,25,26 만 쓰기 때문에 substr(0,1) == '2'인 공통코드 상세 데이터만 가져와 전체에 붙여줌
				this.ageList = [...this.ageList, ...response.comnCList.filter((el) => { return el.comnCVal.substr(0,1) == '2'})]
			})

		},
        selectAge(num) {
            this.close({
                ageCd : num
            });
        },
		// 연령과 icon 맵핑
		mappingIcon(el) {
			return "age_rdo_0" + (Number(el.substr(1,1))+1)
		}
        
        
    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>