<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 상품추천 > 은퇴력진단
* @ 페이지설명 : 금융과생활 > 상품추천 > 은퇴력진단 > step 4. 은퇴정보입력(준비자금)
* @ 파일명     : src\views\page\PD\RT\PDRT2010\PDRT2010.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-11              CS533541             최초작성(PDRT1011.vue -> PDRT2010.vue)
*************************************************************************/
-->
<template>

    <!-- 전체 팝업 시작 -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">은퇴 준비 진단</h1>
		</div>
        
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner progress_wrap">
				<strong class="titH1">준비 자금</strong>
				<span class="progress_num" aria-label="전체 3단계 중 3단계"><em class="pointColor green">3</em>/3</span>

				<!-- 은퇴까지 월 평균 예상수입 -->
				<div class="com_btnselectbox_type01">
					<button type="button" class="com_btnselect_type01" @click.prevent="fn_setExpMmAm()" title="은퇴까지 월 평균 예상수입" ref="expMmAm">
						<span>은퇴까지 월 평균 <template v-if="expMmAm == ''">예상 </template>수입
                                <template v-if="expMmAm != ''">  {{expMmAm}}<em>만원</em></template>
                        </span>
					</button>
				</div>
				<!--// 은퇴까지 월 평균 예상수입 -->
				
				<strong class="com_box_tit">은퇴 시점 준비 자금</strong>
				<!-- 국민연금 -->
				<div class="com_input_type01 com_word2">
					<input type="tel" class="com_right" id="com_ntnPnsAm" value="0"  required="" placeholder="국민연금을 입력하세요" ref="com_ntnPnsAm"
                           :class="ntnPnsAm.length > 0 && foc_ntnPnsAm ? 'focusON focusforce' : ''" maxlength="11" v-model="ntnPnsAm" 
                           @focus="fn_focusOnOff('ntnPnsAm')" @keyup="fn_chkAm('ntnPnsAm',ntnPnsAm)" @input="fn_chkAm('ntnPnsAm',ntnPnsAm)" @keyup.enter="moveNextTag($event)">
                           
					<label for="com_ntnPnsAm">
						<span class="txt_label_x">국민연금</span>
					</label>
					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;" v-if="ntnPnsAm.length > 0" @click.prevent="fn_delAm('ntnPnsAm')"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2">만원</span>
					</div>
					<div class="infoBox">
						<p class="com_sum" v-if="ntnPnsAm.length > 0">{{fn_hanValue(ntnPnsAm)}}</p>
                           
						<p class="txt_r" v-else>
							<a href="javascript:void(0);" class="link_arrow" @click.prevent="fn_moveJoinPop()"> 국민연금 알아보기</a>
						</p> <!--자산연결 안된 경우 -->
					</div>
				</div>
				<!-- 국민연금 -->


				<!-- 개인연금 -->
				<div class="com_input_type01 com_word2">
					<input type="tel" class="com_right" id="com_input02" value="0"  required="" placeholder="개인연금을 입력하세요" ref="com_psnPnsAm"
                           :class="psnPnsAm.length > 0 && foc_psnPnsAm ? 'focusON focusforce' : ''" maxlength="11" v-model="psnPnsAm" 
                           @focus="fn_focusOnOff('psnPnsAm')" @keyup="fn_chkAm('psnPnsAm',psnPnsAm)" @input="fn_chkAm('psnPnsAm',psnPnsAm)" @keyup.enter="moveNextTag($event)">
                    
					<label for="com_input02">
						<span class="txt_label_x">개인연금</span>
					</label>
					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;" v-if="psnPnsAm.length > 0" @click.prevent="fn_delAm('psnPnsAm')"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2">만원</span>
					</div>
					<div class="infoBox">
						<p class="com_sum" v-if="psnPnsAm.length > 0"> {{fn_hanValue(psnPnsAm)}} </p>
						<p class="txt_r" v-else>
							<a href="javascript:void(0);" class="link_arrow" @click.prevent="fn_movePopup()"> 개인연금 알아보기</a>
						</p> <!--자산연결 안된 경우 -->
					</div>
				</div>
				<!--// 개인연금 -->


				<!-- 예상 퇴직금 -->
				<div class="com_input_type01 com_word2">
					<input type="tel" class="com_right" id="com_input03" value="0"  required="" placeholder="예상 퇴직금을 입력하세요" ref="com_expRetAm"
                           :class="expRetAm.length > 0 && foc_expRetAm ? 'focusON focusforce' : ''" maxlength="11" v-model="expRetAm" 
                           @focus="fn_focusOnOff('expRetAm')" @keyup="fn_chkAm('expRetAm',expRetAm)" @input="fn_chkAm('expRetAm',expRetAm)" @keyup.enter="moveNextTag($event)">
                    
					<label for="com_input03">
						<span class="txt_label_x">예상 퇴직금</span>
					</label>
					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;" v-if="expRetAm.length > 0" @click.prevent="fn_delAm('expRetAm')"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2">만원</span>
					</div>
					<div class="infoBox">
						<p class="com_sum" v-if="expRetAm.length > 0" >  {{fn_hanValue(expRetAm)}}</p>
						<p class="txt_r" v-else>
							<a href="javascript:void(0);" @click.prevent="fn_movePopup()" class="link_arrow" >예상 퇴직금 알아보기</a>
						</p> <!--//자산연결 안된 경우 -->
					</div>
				</div>
				<!--// 예상 퇴직금 -->


				<!-- 기타 금융자산 -->
				<div class="com_input_type01 com_word2">
					<input type="tel" class="com_right" id="com_input04" value="0"  required="" placeholder="기타 금융자산을 입력하세요" ref="com_etcFnasAm"
                           :class="etcFnasAm.length > 0 && foc_etcFnasAm ? 'focusON focusforce' : ''" maxlength="11" v-model="etcFnasAm" 
                            @focus="fn_focusOnOff('etcFnasAm')" @keyup="fn_chkAm('etcFnasAm',etcFnasAm)" @input="fn_chkAm('etcFnasAm',etcFnasAm)" @keyup.enter="moveNextTag($event)">
                    
					<label for="com_input04">
						<span class="txt_label_x">기타 금융자산</span>
					</label>
					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;" v-if="etcFnasAm.length > 0" @click.prevent="fn_delAm('etcFnasAm')"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2">만원</span>
					</div>

					<div class="infoBox">
						<p class="com_sum" v-if="etcFnasAm.length > 0"> {{fn_hanValue(etcFnasAm)}}</p>
					</div>

				</div>
				<!--// 기타 금융자산 -->
                
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="com_btnhalfbox_type02">
				<a href="javascript:void(0);" class="btn btn_mint_gray" role="button" @click.prevent="close()">이전</a>
				<a href="javascript:void(0);" class="btn btn_mint" role="button" :class="!nextStepYn ? 'btn_off' : ''" @click.prevent="nextStepYn ? fn_nextStep() : ''">결과확인</a>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="fn_closeAllPage()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// 전체 팝업 종료 -->

</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {keyupNumFormat} from '@/utils/number'
    
    import PDRT2016 from '@/views/page/PD/RT/PDRT2016/PDRT2016'
    import PDRT2013 from '@/views/page/PD/RT/PDRT2013/PDRT2013'
    import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'
    import COAR2005 from '@/views/page/CO/AR/COAR2005/COAR2005' // 개인신용정보제공동의
    

    export default {
        name : "PDRT2010",
        data: () => {
            return {
                // 기본정보
                mydtCusAge    : 0,  // 마이데이터고객나이
                retExpAge     : 0,  // 은퇴예상나이
                lifeExpAge    : 0,  // 기대수명

                // 필요자금
                retMmLivAm    : "", // 은퇴 후 월 생활비
                retYyMdcAm    : "", // 은퇴 후 의료비(연간)
                chdrEduAm     : "", // 자녀교육 비용
                chdrWeddAm    : "", // 자녀결혼 비용
                etcYyAm       : "", // 기타비용(연간)

                // 준비자금
                expMmAm       : "", // 월예상수입
                ntnPnsAm      : 0, // 국민연금
                psnPnsAm      : 0, // 개인연금
                expRetAm      : 0, // 예상퇴직금
                etcFnasAm     : 0, // 기타금융자산

                foc_expMmAm   : false,
                foc_ntnPnsAm  : false,
                foc_psnPnsAm  : false,
                foc_expRetAm  : false,
                foc_etcFnasAm : false,
                nextStepYn    : false
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                // 기본정보
                this.mydtCusAge = param.mydtCusAge;
                this.retExpAge  = param.retExpAge;
                this.lifeExpAge = param.lifeExpAge;

                // 필요자금
                this.retMmLivAm = param.retMmLivAm;
                this.retYyMdcAm = param.retYyMdcAm;
                this.chdrEduAm  = param.chdrEduAm;
                this.chdrWeddAm = param.chdrWeddAm;
                this.etcYyAm    = param.etcYyAm;

                // 은퇴까지 월 평균 예상수입
                this.$refs.expMmAm.click();
                this.getData();
            },
            getData() {
                // 은퇴 준비연금 조회
                const config = {
                    url: '/pd/rt/10r01',  //IF-MOB-PFM-PDRT10R01 (ProductSvcV2.getRetirementPensionV2)
                    //url: '/pd/pd/06ra1',
                    data: {
                        mydtCusno : this.getUserInfo('mydtCusno') // 마이데이터고객번호
                    }
                };
                
                apiService.call(config).then(response => {
                      
                    let payNtnPnsAm  = response.ntpsTotAm;   // 국민연금 

                    if( payNtnPnsAm >= 10000){ // 기 납입된 국미연금이 있으면 만원단위로 나눈 후 출력
                        let sPayNtnPnsAm = Math.round(payNtnPnsAm / 10000);
                        this.ntnPnsAm = keyupNumFormat(sPayNtnPnsAm);
                    }

                    let acBaltAm     = response.acBaltAm;    // 개인연금
                    
                    if( acBaltAm >= 10000){ // 기 납입된 개인연금이 있으면 만원단위로 나눈 후 출력

                        let sAcBaltAm = Math.round(acBaltAm / 10000) ;
                        this.psnPnsAm = keyupNumFormat(sAcBaltAm);
                    }

                    let ipAcBacttAm  = response.ipAcBacttAm; // irp

                    if( ipAcBacttAm >= 10000){ // 기 납입된 irp이 있으면 만원단위로 나눈 후 출력
                        let sIpAcBacttAm = Math.round(ipAcBacttAm / 10000);
                        this.expRetAm = keyupNumFormat(sIpAcBacttAm);
                    }

                });
                
            },
            
            fn_closeAllPage() {

                const config = {
                    content : ['입력중인 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'],
                    title   : "",
                }
                modalService.confirm(config).then(text => {
                    if(text == "예") {
                        this.closeAll();
                    }
                })
            },
            fn_setExpMmAm() {
                const config = {
                    renderer : {
                        component : PDRT2013
                    },
                    params : {
                        expMmAm : this.expMmAm
                    }
                }

                modalService.openSlidePagePopup(config).then((response) => {
                    this.expMmAm = response;
                    this.nextStepYn = this.expMmAm != '' ? true : false;

                });
            },
            // input 클릭 시 focus 관련
            fn_focusOnOff(type) {

                if(this.$refs[`com_${type}`].value == 0) {
                    this.$refs[`com_${type}`].value = this.$refs[`com_${type}`].value.slice(0, -1)
                    this[`${type}`] = ''
                }

                switch(type) {
                    case 'expMmAm':
                        this.foc_expMmAm   = true
                        this.foc_ntnPnsAm  = false
                        this.foc_psnPnsAm  = false
                        this.foc_expRetAm  = false
                        this.foc_etcFnasAm = false
                        break
                    case 'ntnPnsAm':
                        this.foc_expMmAm   = false
                        this.foc_ntnPnsAm  = true
                        this.foc_psnPnsAm  = false
                        this.foc_expRetAm  = false
                        this.foc_etcFnasAm = false
                        break
                    case 'psnPnsAm':
                        this.foc_expMmAm   = false
                        this.foc_ntnPnsAm  = false
                        this.foc_psnPnsAm  = true
                        this.foc_expRetAm  = false
                        this.foc_etcFnasAm = false
                        break
                    case 'expRetAm':
                        this.foc_expMmAm   = false
                        this.foc_ntnPnsAm  = false
                        this.foc_psnPnsAm  = false
                        this.foc_expRetAm  = true
                        this.foc_etcFnasAm = false
                        break
                    case 'etcFnasAm':
                        this.foc_expMmAm   = false
                        this.foc_ntnPnsAm  = false
                        this.foc_psnPnsAm  = false
                        this.foc_expRetAm  = false
                        this.foc_etcFnasAm = true
                        break
                }
            },
            fn_chkAm(colNm, am) {

                if(am != null && am != '') {
                    let chkLeng = (colNm == "expMmAm") ? 6 : 9

                    am = am.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                    am = Number(am.split(",").join(""))
                     
                    if(am > 0) {
                        if (am.length > chkLeng) {
                            am = am.slice(0, -1)
                        }
                        am = keyupNumFormat(am.toString());
                    }

                    if (colNm == "ntnPnsAm") {
                        this.ntnPnsAm   = am
                        this.$refs.com_ntnPnsAm = this.ntnPnsAm

                    } else if (colNm == "psnPnsAm") {
                        this.psnPnsAm   = am
                        this.$refs.com_psnPnsAm = this.psnPnsAm

                    } else if (colNm == "expRetAm") {
                        this.expRetAm   = am
                        this.$refs.com_expRetAm = this.expRetAm
                    } else if (colNm == "etcFnasAm") {
                        this.etcFnasAm  = am
                        this.$refs.com_etcFnasAm = this.etcFnasAm
                    }
                }
            },
            // 한글금액표시
            fn_hanValue(amount) {
                const koreanUnits = ['', '만', '억', '조']
                let han_amount = parseInt(amount.split(',').join('')) * 10000 // 만원 단위 화면
                let answer     = ''
                let unit       = 10000
                let index      = 0
                let division   = Math.pow(unit, index)

                while (Math.floor(han_amount / division) > 0) {
                    const mod = Math.floor(han_amount % (division * unit) / division)
                    if (mod) {
                        const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                        answer = `${modToString}${koreanUnits[index]} ` + answer
                    }
                    division = Math.pow(unit, ++index)
                }
                return (answer + "원").replace(" 원", "원")
            },
            fn_delAm(colNm) {
                
                if (colNm == "expMmAm") {
                    this.expMmAm    = "";
                    this.nextStepYn = false;
                } else if (colNm == "ntnPnsAm") {
                    this.ntnPnsAm   = "";
                } else if (colNm == "psnPnsAm") {
                    this.psnPnsAm   = "";
                } else if (colNm == "expRetAm") {
                    this.expRetAm   = "";
                } else if (colNm == "etcFnasAm") {
                    this.etcFnasAm  = "";
                }
            },
            fn_nextStep() {
                const config = {
                    component : PDRT2016,
                    params : {
                        // 기본정보
                        mydtCusAge : this.mydtCusAge, // 마이데이터고객나이
                        retExpAge  : this.retExpAge,  // 은퇴예상나이
                        lifeExpAge : this.lifeExpAge, // 기대수명

                        // 필요자금
                        retMmLivAm : this.retMmLivAm, // 은퇴 후 월 생활비
                        retYyMdcAm : this.retYyMdcAm, // 은퇴 후 의료비(연간)
                        chdrEduAm  : this.chdrEduAm,  // 자녀교육 비용
                        chdrWeddAm : this.chdrWeddAm, // 자녀결혼 비용
                        etcYyAm    : this.etcYyAm,    // 기타비용(연간)

                        // 준비자금
                        expMmAm    : this.expMmAm,          // 월예상수입
                        ntnPnsAm   : this.ntnPnsAm  || "0", // 국민연금
                        psnPnsAm   : this.psnPnsAm  || "0", // 개인연금
                        expRetAm   : this.expRetAm  || "0", // 예상퇴직금
                        etcFnasAm  : this.etcFnasAm || "0"  // 기타금융자산
                        
                    }
                    
                }   
                modalService.openPopup(config).then(() => {});
            },

             // 화면 이동
            fn_movePopup() {

                let compName = COAR2002;
                let param    = { isExternal : true ,
                                  orgDsc : 'bank'
                               }

                let config = {
                    component : compName,
                    params : param
                }
                modalService.openPopup(config).then(() => {});
            },

           fn_moveJoinPop() {

			let compName = COAR2005;

			let param = {}
			let moduleParam = {}
			let moduleList  = []
			
			moduleParam.orgC		= "PBAAVM0000"
			moduleParam.orgBzrgC	= "public"
			moduleParam.orgnm		= "국민연금공단"
			moduleList.push(moduleParam)
			
			param.moduleList = moduleList
			param.isOnlyPublic = true

            const config = {
                component: compName,
                params : param
			}
			console.log(config)
			modalService.openPopup(config).then(() => {});
			
            }

        }
    }
</script>