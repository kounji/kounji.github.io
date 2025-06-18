<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 자동차
* @ 페이지설명 : 자산등록 > 자동차> step 1-1. 서비스 이용 동의
* @ 파일명     : src/views/page/CO/CA/COCA2107/COCA2107.vue
* @ 작성자     : CS530689
* @ 작성일     : 2022-03-22
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2022-03-22             CS530689              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup">
        <div class="popup_header">    
			<h1>서비스 이용 동의</h1>		
        </div>
        <div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<strong class="com_cont_tit02">개인정보 제공 동의를 하시면<br/>
					이용할 수 있는 서비스
				</strong>
				<div class="com_box_type03 bg13 com_box_banner">
					<div class="text f16">
						차량번호 등록만으로<br />차랑시세, 세금, 리콜정보를 통한<br /><strong>자동차관리 서비스 제공</strong>
					</div>
				</div>
				<div class="agree_cont pt10"><em class="mb0">서비스 이용을 위해 동의가 필요합니다.</em></div>
				<div class="custom_terms mt10">
					<ul class="mt20 mb10">
						<li v-for="(stlt, idx) in stltList" :key="idx">
							<span class="btn_check">
								<input type="checkbox" name="agree1" ref="agrChk" :id="'check'+idx" @click.prevent="fn_openCertPopup($event, stlt)">
								<label :for="'check'+idx">
									<span>{{stlt.asetAmnStltTinm.replace('[선택] ', '')}}</span>
								</label>
								<button type="button" class="btn_arrow">상세보기</button>
							</span>
						</li>
					</ul>
				</div>
				<p class="dot_msg mt15">위의 내용은 자동차관리 서비스 동의 절차를 통해 이용 하실 수 있습니다.</p>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" @click.prevent="fn_useService($event)">서비스 이용하기</a>
				<!-- btn_off 제거시 활성화 -->
			</div>
		</div>

        <a href="javascript:void(0);" class="btn_close" @click.prevent="fn_closePopup()"><span class="blind">팝업닫기</span></a>	
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import routerService from '@/service/routerService'

import COCO1135 from '@/views/page/CO/CO/COCO1135/COCO1135'

export default {
    name : "COCA2107",
    data: () => {
        return {
            popId       : "",       // call 페이지 ID
            certAgrYn   : false,    // 동의여부
            stltList     : [],       // 약관유형정보 리스트
        }
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    computed : {
        btnOnOff() {
            return this.certAgrYn ? "" : "btn_off"
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        // 화면 초기화
        initComponent(param = {}) {
            this.popId = param.popId || ""
            this.certAgrYn = param.certAgrYn || false
            this.stltList = param.stltList || []
        },
        // 약관 팝업 오픈
        fn_openCertPopup(e, stlt) {
            e.target.checked = false
            this.certAgrYn = false

            const config = {
                url : "/co/at/02r01",
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno"),
                    stltTpc : stlt.stltTpc,
                    sqno : stlt.sqno,
                }
            }
            apiService.call(config).then(response => {
                const pConfig = {
                    component : COCO1135,
                    params : {
                        asetAmnStltTinm : response.asetAmnStltTinm || "",   // 약관제목
                        asetAmnStltCntn : response.asetAmnStltCntn || ""   // 약관내용
                    }
                }
                modalService.openPopup(pConfig).then(response => {
                    if(response === "true") {
                        e.target.checked = true
                        let agrChkList = this.$refs['agrChk'].filter(d => d.checked==true)	// 체크 목록

                        if(agrChkList.length === this.stltList.length) this.certAgrYn = true
                    } else {
                        e.target.checked = false
                    }
                })
            })

            
        },
        // 서비스 이용하기 버튼 클릭
        fn_useService(e) {
            if(e.target.className.indexOf("btn_off") > -1) return false

            const config = {
                url : "/co/as/07ua1",
                data : {
                    mydtCusno       : this.getUserInfo("mydtCusno"),
                }
            }
            apiService.call(config).then(response => {
                if(response.rspC === "0000") {
                    this.close("true")
                }
            })
        },
        fn_closePopup() {
            if(this.popId === "COCA2101") this.close("false")
            else if(this.popId === "PDCG0001") {
                this.close()
                routerService.movePrev()
            }
        }
        
    },
    components : {
    }
}
</script>