<template>
    <div class="admin_banner_area" v-if="bnnrWrsCn > 0">
        <template v-for="(item, idx) in bnnrWrsList.slice(0,1)">
        <a :key="idx" href="javascript:void(0);" role="button" @click.prevent="fn_moveFinancialProductPage(item)">
            <img :src="`/assets/images/banner/${item.cntzActlImgFlnm}.${item.cntzImgFlXcrnm}`" :alt="item.psnFncWrsnm + ', ' + item.wrsBrfCntn">
        </a>
        </template>
    </div>
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import appService from '@/service/appService'
    
	export default {
		name: 'CmmFinancialBanner',
		props: {
			asdbDsc: String
        },
		data: () => {
            return {
				bnnrWrsList   : [],     //배너리스트 add 2021.11.01
                bnnrWrsCn     : 0,      //배너갯수 add 2021.11.01
			}
        },
		mixins: [
			commonMixin
        ],
		mounted() {
            this.fn_getBanner()
        },
		methods: {
            /*
            * 상품배너정보 조회. add 2021.11.01
            */
            fn_getBanner() {
                const config = {
                    url: '/pd/pd/00r01',
					data: {"asdbDsc": this.asdbDsc }    //자산부채구분코드
                    ///////////////////////////////
                    // asdbDsc : 자산부채구분코드
                    ///////////////////////////////
                    // 자산 > 01:계좌,02:투자,03:선불,04:보험,05:부동산,06:자동차,07:기타
                    // 부채 > 08:대출,09:자동차할부,10:카드,11:할부금융,12:리스,13:빌린돈
                }
                apiService.call(config).then(response =>{
                    this.bnnrWrsCn   = response.bnnrWrsCn || 0
                    this.bnnrWrsList = response.bnnrWrsList || []
                })
            },

            /**
            *  금융상품페이지이동. add 2021.11.01
            */
            fn_moveFinancialProductPage(item){
                appService.moveFinancialProductPage(item.wrsDtlUrlnm)
            },
        }
    }
</script>