<!--
/*************************************************************************
* @ 서비스경로 : 서비스 가입 > 거래 지점 선택
* @ 페이지설명 : 거래 지점 선택
* @ 파일명     : src/views/page/CO/AS/COAS4005/COAS4005.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-02-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-17              CS541599              최초작성(COAS2005->COAS4005)
*************************************************************************/
-->
<template>
    <div>
        <div class="dimmed" style="display: block;"></div>
	<div class="popup_box">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<h1>거래농축협</h1>
				<!-- <a href="#nolink" class="btn_back"><span class="blind">이전화면</span></a> -->
			</div>
			<div class="popup_content">
				<div class="radio_shadow_group">
                    <!--
					<div class="top_desc">
						<button type="button" class="btns">직접찾기</button>
					</div>
                    -->
					<div class="radio border" v-for="(item, idx) in brList" :key="idx">
						<input type="radio" name="position_chk" :id="'position_chk'+idx" :checked="item.checked" :value="item.brc" v-model="chkBrc">
						<label :for="'position_chk'+idx">
							<strong class="tit">{{item.brnm}}</strong>
							<p class="txt">{{item.brAdr}}</p>
						</label>
					</div>
				</div>
			</div>
			<div class="popup_footer fixed">
				<div class="btns_wrap">
					<button type="button" class="btns lg primary" @click.prevent="rtnInvtBrc()">확인</button>
				</div>
			</div>
			
			<a href="#nolink" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
		</div>
	</div>
	<!--// slide popup E -->
    </div>
</template>

<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

import {mapGetters} from 'vuex'
import _ from 'lodash'

export default {
    name: 'COAS4005',
    data: () => {
        return {
            brList  : [], // 거래 지점 목록
            chkBrc  : "", // 선택한 거래 지점
        }
    },
    computed: {
        ...mapGetters('user', [
            'userTermsInvtInfo',
            'userTermsAgreeList',
            'userRecvInfo'
        ]),
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    created() {

    },
    mounted() {
        this.initComponent()
    },
    methods: { 
        initComponent(param = {}) {
            console.log("this.userTermsAgreeList >> ", this.userTermsAgreeList)
            this.getData()
        },
        getData() {
            //////////////////////////////
            // 거래농축협 조회
            //////////////////////////////
            const config = {
                url : '/co/as/05r01',
                data : {
                    mydtCusno : this.getUserInfo('mydtCusno'),
                    eno : ""
                }
            }
            apiService.call(config).then(response => {
                this.brList = response.brList || []
                console.log("@@@ => ", this.brList)

                for(let i=0; i < this.brList.length; i++) {
                    this.brList[i].checked = false
                }
            })
        },
        // 선택한 거래지점 리턴
        rtnInvtBrc() {
            this.close({brcObj : this.brList.filter(el => el.brc == this.chkBrc)[0]})
        }

       

    },
    components: {      
        
    },
}
</script>