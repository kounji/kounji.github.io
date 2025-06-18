<!--
/*************************************************************************
* @ 서비스경로 : 더보기>타기관 마이데이터 관리>마이데이터 가입·조회 및 관리>개인(신용)정보제공 동의서
* @ 페이지설명 : 개인(신용)정보제공 동의서
* @ 파일명     : src/views/page/CO/OR/COOR2003/COOR2003.vue
* @ 작성자     : CS530689
* @ 작성일     : 2024-11-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-25              CS530689                 최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
	<div class="full_popup renewal mydata2023 other_mydata" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동--><!-- 2024-11 : 타기관마이데이터 other_mydata 추가 -->
		<div class="popup_header">
			<h1>개인(신용)정보 제공 동의서</h1>
			<!--<a href="javascript:void(0)" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>		
		<div class="popup_content" id="term_scroll" ref="term_scroll"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="terms_view">
				<div>
					<div class="terms_cont">
						<strong class="terms_tit">개인(신용)정보 제공 동의서</strong>
						<p class="terms_txt">귀하는 개인(신용)정보 제3자 제공에 관한 동의를 거부하실 수 있습니다. 다만, 개인(신용)정보의 제공에 관한 동의는 마이데이터 서비스 가입현황 안내 및 전송요구내역 통합조회 서비스 이용과 직접적으로 관련된 필수적 사항이므로 아래의 사항에 동의하셔야만 마이데이터 서비스 가입현황 안내 및 전송요구내역 통합조회 서비스의 제공이 가능합니다.</p>
						<dl>
							<dt>제공하는 자</dt>
							<dd>
                                <strong class="terms_txt_point">
                                    {{providers}}    
                                </strong>
                            </dd>

							<dt>제공받는 자의 목적</dt>
							<dd><strong class="terms_txt_point">API DATA 노출 영역, 마이데이터 서비스 가입현황 안내 및 전송요구내역 통합조회</strong></dd>

							<dt>보유 및 이용기간</dt>
							<dd><strong class="terms_txt_point">API DATA 노출 영역, 마이데이터 서비스 가입현황 안내 및 전송요구내역 통합조회 목적 달성 시까지</strong></dd>

							<dt>제공항목</dt>
							<dd><strong class="terms_txt_point">API DATA 노출 영역, CI</strong></dd>
						</dl>
					</div>
					<div class="custom_terms error mt50" :class="fn_chkAgree"><!-- 필수입력 미체크시 class error -->
						<div class="new_check_all">
							<span class="btn_check">
								<input type="checkbox" name="allagree" id="checkall" v-model="chkAgree" @change="chkNext = true">
								<label for="checkall">
									<span>[필수] 개인정보 수집&middot;이용동의</span>
								</label>
								<!-- <button type="button" class="btn_arrow">상세보기</button> -->
							</span>
						</div>

						<!-- <div class="error_message" aria-live="assertive" role="alert" >
							<p>체크해 주세요</p>
						</div> -->
					</div>
                    <p class="error_meg" aria-live="assertive" role="alert" v-if="!this.chkNext">동의가 꼭 필요해요</p>
				</div>
			</div>
			
		</div>
		<div class="popup_footer fixed last_move">
			<div class="btn_full_box">
				<a href="javascript:void(0)" class="btn btn_mint btn_move_hide" id="term_btn"><span class="btn_down_arrow">끝까지 내려 보기</span></a>
				<a href="javascript:void(0)" class="btn btn_mint" id="term_agree_btn" @click="moveNext()">동의하고 다음</a>
			</div>
		</div>
		<a href="javascript:void(0)" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
    // import Page from '@/views/layout/Page.vue'

    import apiService from '@/service/apiService'
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import routerService from '@/service/routerService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import {dateFormat} from '@/utils/date'
    
    import {mapGetters} from 'vuex'
    
    // import _ from 'lodash'

    export default {
        name : "COOR2003",
        data: () => {
            return {
                chkAgree : false,
                chkNext : true,
                providers : "",      
            }
        },
        computed:{
            fn_chkAgree() {
                return !this.chkAgree && !this.chkNext ? 'error' : ''
            }
        },
        created() {
        },
        mounted() {
            this.initComponent()
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        methods: {
            initComponent() {
                //내용이 짧은경우 S
                let termDiv = document.getElementsByClassName("terms_view")
                let termLength = 0
                let popHeight = document.getElementById("term_scroll").offsetHeight

                for(let i=0; i<termDiv.length; i++){
                    termLength += termDiv[i].offsetHeight
                }

                if(termLength < popHeight){
                    document.getElementById("term_btn").style.display = "none"
                    document.getElementById("term_agree_btn").style.display = "block"
                }
                //내용이 짧은경우 E

                this.getData()
            },
            getData() {
                const config = {
                    url: '/co/or/01r01',
                    data: {
                        "ofrmnDsc" : "03",
                    },
                }

                apiService.call(config).then(res =>{
                    console.log('res : ', res)
                    if(res){
                        this.providers = res.ofrmnList.reduce((acc, curr) => acc + ", " + curr)
                    }
                })
            },
            movePrev() {
                routerService.movePrev()
            },
            moveNext() {
                const today = new Date()
                const todayH = dateFormat(today, "HH")
                const day = today.getDay()
                
                if(day !==0 && day !== 6 && todayH >= 10 && todayH < 16){
                    // console.log('state.userInfo : ', this.$store.state.user.userInfo)
                    if(this.chkAgree){
                        const config = {
                            url : "/co/or/01i01",
                            data : {
                                mydtCusno       : this.getUserInfo("mydtCusno"),
                                ofrHdngC        : "000004",                     // 제공항목코드 (000001 : 카드/자동차, 000002 : 경제데이터, 000003 : 상품정보) 
                                agrYn           : "1",                // 동의여부 ("1" : 동의, "0" : 미동의)
                                firEntPathVal   : this.getUserInfo('chnlGbn'),
                                lginInfVal      : this.getUserInfo('lginInfVal'),
                                lginDtm         : this.getUserInfo('lginDtm')
                            }
                        }
                        apiService.call(config).then(response => {
                            if(response.rspC === "0000") {
                                this.close('ok')
                            }
                        })
                    }else{
                        this.chkNext = false
                        document.getElementById("term_btn").click()
                    }
                }else{
                    modalService.alert("서비스에 불편을 드려 죄송합니다. 정부 정책에 따른 서비스 이용 가능 시간이 아닙니다.<br>( 조회 가능 시간 : 평일 오전 10시~ 오후 16시)")
                }
            },
        },
        components : {
            // Page
        }
    }
</script>