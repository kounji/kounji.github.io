<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > 공지사항
* @ 페이지설명 : 더보기 > 공지사항 상세
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
	<!-- full popup S -->
	<div class="full_popup"> 
		<div class="popup_header">    
			<h1>새소식</h1>
		</div>

		<div class="popup_content com_no_bottom com_bg_type00">
            <!-- 리스트 상세-->
			<ul class="list_type_03 com_line_type01 com_noline">
				<li>
					<div>
						<!-- <div><em><strong class="com_point_darkblue">알림공지</strong>NH모바일바로 대출 신청 일시 중단 안내 (2020/9/02~00:10~01:10)</em></div> -->
                        <div><em>{{pofancTinm}}</em></div>
						<span>{{paplStDt | dateFilter('YYYY.MM.DD')}}</span>
					</div>
				</li>
			</ul>

            <div class="list_detail"> <!--공지사항 상세영역 내용 현재 pre스타일로 임시로 작업해놓았습니다. 추후 개발방향에 따라 대응 예정-->
                <!-- <div class="content">{{content}}</div> -->
                <div class="content" v-html="pofancCntn"></div>
            </div>
        </div>

        <!-- <a class="btn_close" @click.prevent="closeAll()"><span class="blind">팝업닫기</span></a> -->
        <a class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

export default {
    name : "COCO1105",
    data: () => {
        return {
            pofancId   : "",     //공지사항ID
            pofancTinm : "",     //공지사항제목명
            paplStDt   : "",     //적용시작일자
            pofancDtlSqno : "",  //공지사항상세일련번호
            pofancCntn : "",     //공지사항내용
        }
    },
    computed: {
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent() {
            this.getData();
        },
        getData() {
        
           this.pofancId   = this.params.ofancId

            const config = {
                url: '/co/co/05r01',
                data: {
                    ofancId   : this.pofancId,    // 공지사항ID
                }
            }
            apiService.call(config).then(response => {
                this.pofancCntn = response.ofancCntn || '';
                this.pofancTinm = response.ofancTinm || '';
                this.paplStDt   = response.aplStDt || '';
            });           
        },
    }
}
</script>