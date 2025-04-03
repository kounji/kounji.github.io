<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > 새소식(공지사항)
* @ 페이지설명 : 더보기 > 새소식(공지사항) 목록
* @ 파일명     : src/views/page/CO/CO/COCO1101/COCO1105.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-18             CS515729                 최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup"> 
		<div class="popup_header">    
			<h1>새소식</h1>
		</div>

        <div class="popup_content com_no_bottom com_bg_type00">
            <!-- 리스트 -->
            <template v-if="noticsList.length > 0">
			<ul class="list_type_03">
				<li v-for="(item, dIdx) in noticsList" :key="'notics'+dIdx">
					<a href="javascript:void(0);" @click.prevent="openDetailPop(item.ofancId)" ref="notics">
						<!-- <div><em><strong class="com_point_darkblue">알림공지</strong>NH모바일바로 대출 신청 일시 중단 안내 (2020/9/02~00:10~01:10)</em></div> -->
                        <div><em>{{item.shotofancTinm || item.ofancTinm}}</em></div>
						<span>{{item.aplStDt | dateFilter('YYYY.MM.DD')}}</span>
					</a>
				</li>
			</ul>
            </template>
            <template v-else>
                <div class="no_data_box">
                    <div class="no_data_list">
                           <p class="tit">새소식이 없습니다.</p>
                    </div>
                </div>                
            </template>
		</div>
        <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import COCO1105 from '@/views/page/CO/CO/COCO1105/COCO1105'
import {stringCut} from '@/utils/data'

export default {
    name : "COCO1104",
    data: () => {
        return {
           noticsList: [],
           selSeq : ""
        }
    },
    props:{
    },    
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent(param = {}) {
            this.selSeq = param.selSeq || ""

            this.getData();
        },
        getData() {
            const config = {
                url: '/co/co/04r01',
                data: {}
            };
            
            apiService.call(config).then(response => {

                this.noticsList = response.ofancList || [];
                for(let i=0; i<this.noticsList.length; i++)
                {
                    if(this.noticsList[i].ofancTinm.length > 30) //제목 글자 수 30글자, 초과 시 말줄임(…)표시 노출
                    {
                        this.noticsList[i].shotofancTinm = stringCut(this.noticsList[i].ofancTinm, 30, 'N', 'Y')
                    }else{
                        this.noticsList[i].shotofancTinm = this.noticsList[i].ofancTinm
                    }
                }

                this.$nextTick(() => {
                    console.log(this.selSeq)
                    if(this.noticsList.length > 0 && !this.isNull(this.selSeq)) {
                        this.$refs['notics'][0].click()
                    }
                })

            });
        },
        openDetailPop(ofancId) {

            const noticsDetail = this.noticsList.filter(d => d.ofancId === ofancId) // 대상특성
            const config = {
                component: COCO1105,
                params   : noticsDetail[0]
            }
            if(!this.isNull(this.selSeq)) config.renderer = this.modalConfig.renderer
            modalService.openPopup(config).then(() => {
                this.getData();
            })
        }
    }
}
</script>