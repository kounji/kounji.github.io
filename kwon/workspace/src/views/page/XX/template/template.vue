<!--
/*************************************************************************
* @ 서비스경로 : 경로
* @ 페이지설명 : 템플릿
* @ 파일명     : src/views/page/XX/template/template.vue
* @ 작성자     : 작성자명
* @ 작성일     : 2021-04-30
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-04-30              작성자명                 최초작성
*************************************************************************/
-->

<template>
    <page>
        <div>템플릿</div>
        <!-- <footers type="as" /> -->
    </page>
</template>

<script>

import Page from '@/views/layout/Page.vue'
// import Footers from '@/views/layout/Footers.vue'
import commonMixin from '@/common/mixins/commonMixin'


export default {
    name : "template",
    data: () => {
		return {
            imsi : null
        }
    },
    computed : {
        
    },
    methods: {
      initComponent() {
        this.getData()
      },
      getData() {
        console.log("getDate()---")
      }
    },
    mounted() {
        this.initComponent()
    },
    mixins: [
        commonMixin
    ],
    created() {

    },
    components: {      
        Page,
        // Footers,
    }

}
</script>