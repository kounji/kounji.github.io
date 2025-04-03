<template>
    <div id="page-area" class="si_temp"> <!-- page-area S -->
<div id="view-wrap" aria-hidden="false"> <!-- view-wrap S --> <!-- 레이어 팝업 호출 시 aria-hidden="true" -->
        <div id="content">
            <div class="cmm-guide-wrap fixed01">
                <a
                    href="#"
                    class="prev"
                    @click.prevent="moveHome"
                >
                    <span>이전</span>
                </a>
                <p class="tit">정보제공자 선택</p>
                <div class="select-box">
                    <dl class="form-box icon">
                        <dt>
                            <span class="cmm-checkbox">
                                <input type="checkbox" id="temp01">
                                <label for="temp01">농협상호금융</label>
                            </span>
                        </dt>
                    </dl>
                    <!--dl class="form-box icon">
                        <dt>
                            <span class="cmm-checkbox">
                                <input type="checkbox" id="temp02">
                                <label for="temp02">농협상호금융2</label>
                            </span>
                        </dt>
                    </!--dl>
                    <dl-- class="form-box icon">
                        <dt>
                            <span class="cmm-checkbox">
                                <input type="checkbox" id="temp03">
                                <label for="temp03">농협상호금융3</label>
                            </span>
                        </dt>
                    </dl-->
                </div>
            </div>
        </div>
        <div class="cmm-btn-wrap bottom">
            <div class="full-box">
                <button type="button" class="cmm-btn-no"><span>취소</span></button>
                <a href="#" class="cmm-btn-yes"><span>확인</span></a>
            </div>
        </div>
    </div> <!-- view-wrap E -->
    </div> <!-- page-area E -->
</template>


<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import commonService from '@/service/commonService'

export default {
	name: 'PI0002',
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
			const config = {
				url: '/pi/0002r01',
				data: {"ofrmnAttcMeth" : this.routeParams.ofrmnAttcMeth}
			};
			apiService.call(config).then(response => {
				this.pensionObj = response;
				this.pnsDtl = response.pnsDtl;
			});
		},
		moveHome(){
            const menu = {
                name: 'PI0002'
            };
            commonService.movePage(menu);
		}
	},
	components: {
	}
}
</script>