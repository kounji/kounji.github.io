<template>
    <div id="page-area" class="si_temp"> <!-- page-area S -->
        <div id="view-wrap" aria-hidden="false"> <!-- view-wrap S --> <!-- 레이어 팝업 호출 시 aria-hidden="true" -->
            <div id="content">
                <div class="cmm-guide-wrap">
                    <p class="tit">본인인증 방식 선택</p>
                    <div class="btn-box">
                        <a href="#" class="cmm-btn-border" @click.prevent="moveNextPage('01')"><span>개별인증</span></a>
                        <a href="#" class="cmm-btn-border dis " @click.prevent="moveNextPage('03')"><span>통합인증</span></a>
                    </div>
                </div>
            </div>
        </div> <!-- view-wrap E -->
    </div> <!-- page-area E -->
</template>


<script>
//import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import commonService from '@/service/commonService'

export default {
	name: 'PI0001',
	computed: {
	},
	data: () => {
		return {
		}
	},
	created() {
		this.initComponent()
	},
	mixins: [
		commonMixin
	],
	methods: {
		initComponent() {
			this.getData();
		},
		getData() {
		},
		moveNextPage(selCode) {
				var param = {
					"ofrmnAttcMeth" : selCode  							//예상연금액조회일련번호
				};
				const menu = {
					name: 'PI0002',
					params : param
				};
				commonService.movePage(menu);
		},
	},
	components: {
	}
}
</script>