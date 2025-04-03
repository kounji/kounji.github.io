<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > NH콕마이카
* @ 페이지설명 : 금융생활 > NH콕마이카 > 신차 검색 > 조건 검색(슬라이드POP)
* @ 파일명     : src\views\page\AN\CA\ANCA1205\ANCA1205.vue
* @ 작성자     : CS528043
* @ 작성일     : 2022-08-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-12              CS528043              최초작성(신규)
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click="close()"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>조건 검색</h1>
                    <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
                </div>
                <div class="popup_content">
                    <div class="custom_check_list custom_check_list01">
                        <!-- 수입여부 -->
                        <strong class="com_cont_tit01">수입여부</strong>
                        <template v-if="carSelRgnCList.length > 0">
                            <ul class="com_radio_type02">                         
                                <li v-for="(carSelRgnCInfo, idx0) in carSelRgnCList" :key="idx0">
                                    <div class="btn_radio">
                                        <input type="checkbox" :name="'carSelRgnC_' + carSelRgnCInfo.comnCVal" :id="'carSelRgnC_' + carSelRgnCInfo.comnCVal" v-model="carSelRgnCArr" :value="carSelRgnCInfo.comnCVal" @change="fn_brandSet('CARSEL','', carSelRgnCInfo.comnCVal)">
                                        <label :for="'carSelRgnC_' + carSelRgnCInfo.comnCVal">
                                            <span>{{carSelRgnCInfo.comnCExpl}}</span>
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </template>

                        <!-- 브랜드 -->
                        <template v-if="carBrandSetList.length > 0">
                            <strong class="com_cont_tit01">브랜드</strong>
                            <div class="com_txt_type02">
                                <ul class="com_slide_check_type03 custom_nation custom_car_logo">
                                    <li v-for="(carBrand, idx3) in carBrandSetList" :key="idx3">
                                        <div class="btn_radio">
                                            <input type="checkbox" :name="'carBrand_' + carBrand.carBranNo" :id="'carBrand_' + carBrand.carBranNo"  v-model="carBrandArr" :value="carBrand.carBranNo"  @change="fn_brandSet('BRANSEL', carBrand.carBranNo, carBrand.carSelRgnC)">
                                            <label :for="'carBrand_' + carBrand.carBranNo">
                                                <i :class="'brand_' + carBrand.carBranNo"><span class="blind">{{carBrand.carBrannm}}</span></i>
                                                <span><span>{{carBrand.carBrannm}}<br></span></span>
                                            </label>	
                                        </div>	
                                    </li>
                                </ul>
                            </div>
                        </template>                    
                        <!--// 브랜드 -->

                        <!-- 크기/외형 -->
                        <strong class="com_cont_tit01">크기/외형</strong>
                        <template v-if="cartpDscList.length > 0">
                            <ul class="com_radio_type03">                         
                                <li v-for="(cartpInfo, idx1) in cartpDscList" :key="idx1">
                                    <div class="btn_radio">
                                        <input type="checkbox" :name="'cartp_' + cartpInfo.refCntn2" :id="'cartp_' + cartpInfo.refCntn2"  v-model="cartpArr" :value="cartpInfo.refCntn2">
                                        <label :for="'cartp_' + cartpInfo.refCntn2">
                                            <span>{{cartpInfo.refCntn1}}</span>
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <!-- 금액 -->
                        <strong class="com_cont_tit01">금액</strong>
                        <ul class="com_radio_type03">                         
                            <li v-for="(ncarAmInfo, idx2) in ncarAmDscList" :key="idx2">
                                <div class="btn_radio">
                                        <input type="checkbox" :name="'ncarAm_' + ncarAmInfo.comnCVal" :id="'ncarAm_' + ncarAmInfo.comnCVal"  v-model="ncarAmArr" :value="ncarAmInfo.comnCVal" @change="fn_ncarAmSet(ncarAmInfo.comnCVal)">
                                        <label :for="'ncarAm_' + ncarAmInfo.comnCVal">
                                            <span>{{ncarAmInfo.comnCExpl}}</span>
                                        </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="popup_footer fixed">
                    <div class="com_btnhalfbox_type02">
                        <a href="javascript:void(0);" role="button" class="btn btn_mint_gray" @click="fn_selectClear()">초기화</a>
                        <a href="javascript:void(0);" role="button" class="btn btn_mint" @click="fn_apply()">적용</a>
                    </div>
                </div>
                <a href="javascript:void(0);" class="btn_close" role="button" @click="close()"><span class="">취소</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

//import _ from 'lodash'

export default {
    name : "ANCA2205",
    data: () => {
		return {      
            // input
            // carBranNo      : "",    // 자동차브랜드번호

            // output
            carBrandList    : [],       // 자동차브랜드목록
            carBrandCnt     : 0,        // 자동차브랜드건수

            // 공통코드			
            carSelRgnCList  : [],       // 자동차판매지역코드
			cartpDscList    : [],       // 차종구분코드            
			ncarAmDscList   : [],       // 신차금액구분코드

            // 브랜드 제어
            carBrandSetList : [],       // 자동차브랜드SetList
            brandAllChk1    : false,    // 브랜드 전체선택(국산)
            brandAllChk2    : false,    // 브랜드 전체선택(수입)

            // Return
            carSelRgnCArr   : [],       // 자동차판매지역코드 선택
            cartpArr        : [],       // 차종구분 선택
            ncarAmArr       : [],       // 신차금액구분 선택
            carBrandArr     : [],       // 자동차브랜드번호 선택
        }
	},
    mixins: [
        popupMixin
        ,commonMixin
	],
	created() {
	},	
    mounted() {
		this.initComponent(this.params)
		
        //PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(params) {
            /* 공통코드는 호출화면에서 넘기고, 조회가 필요한 데이터는 본화면에서 직접 호출 */            
            console.log('화면에서 넘어온 코드 : ', params)

            // 화면에서 넘어온 파라미터 셋팅
            // 공통코드 List
            this.carSelRgnCList = params.carSelRgnCList  // 자동차판매지역코드
            this.cartpDscList   = params.cartpDscList    // 차종구분코드 
            this.ncarAmDscList  = params.ncarAmDscList   // 신차금액구분코드

            // 기 Set된 조회조건
            this.carSelRgnCArr   = params.pCarSelRgnCArr || []  // 자동차판매지역코드 (조건param)
            this.cartpArr        = params.pCartpArr      || []  // 차종구분 (조건param)
            this.ncarAmArr       = params.pNcarAmArr     || []  // 신차금액구분 (조건param)
            this.carBrandArr     = params.pCarBrandArr   || []  // 자동차브랜드번호 (조건param)

			// 자동차브랜드 목록 조회
			this.getData()            
        },

        getData() {		
			console.log("신차 자동차브랜드목록조회(POP) CALL!!")

            // 최초 전체 조회 후 필터처리
			const config = {
				url: '/an/ca/05ra1',
				data: {"carSelRgnC" : "9" // 자동차판매지역코드(국산수입구분1.국산, 2.수입, 9.전체)
					}
			}

			apiService.call(config).then(response => {
				console.log("신차 자동차브랜드목록조회 response >>> : ", response)
				
				this.carBrandCnt  = response.carBrandCnt  || 0		// 자동차브랜드건수
				this.carBrandList = response.carBrandList || [] 	// 자동차브랜드목록

                console.log("carBrandList : ", this.carBrandList)

                // 기 set된 조회 조건 중 수입여부가 선택되어 있으면 브랜드setting
                console.log("화면에서 넘어온 carSelRgnCArr : ", this.carSelRgnCArr)

                if(this.carSelRgnCArr.length > 0){
                    // 자동차브랜드SetList에 삽입
                    this.carBrandList.filter((obj) => this.carSelRgnCArr.some((cond) => cond === obj.carSelRgnC)).map((item) => {
                        this.carBrandSetList.push({"carBranNo" : item.carBranNo, "carBrannm" : item.carBrannm, "carSelRgnC" : item.carSelRgnC})
                    })
                }
                
                console.log("set된 리스트 : ", this.carBrandSetList)
			})
        },
        // 수입여부 선택 후 브랜드 설정(CARSEL:수입여부 선택 시, BRANSEL:브랜드 선택 시)
        fn_brandSet(selGbn, selCarBranNo, selCarSelRgnC){
            // 수입여부 선택 시 브랜드Setting
            if(selGbn === "CARSEL"){
                console.log("CARSELIN >>>>>", selGbn)
                // 초기화
                this.carBrandSetList = []       // 자동차브랜드SetList
                //this.carBrandArr     = []       // 자동차브랜드번호 선택
                this.brandAllChk1    = false    // 브랜드 전체선택(국산)
                this.brandAllChk2    = false    // 브랜드 전체선택(수입)
                
                let tempCarBrandArr = []

                // select 값 temp복사
                tempCarBrandArr = Object.assign([], this.carBrandArr)    

                this.carBrandArr     = []       // 자동차브랜드번호 선택

                // 수입여부 선택 확인
                if(!this.fn_branSetVaild()){
                    return false
                }

                // 자동차브랜드SetList에 삽입
                this.carBrandList.filter((obj) => this.carSelRgnCArr.some((cond) => cond === obj.carSelRgnC)).map((item) => {
                    this.carBrandSetList.push({"carBranNo" : item.carBranNo, "carBrannm" : item.carBrannm, "carSelRgnC" : item.carSelRgnC})
                })

                // 단건 선택 시
                if(this.carSelRgnCArr.length ==  1){
                     //let tempCarBrandArr = []

                    // 수입여부 선택에 따른 전체선택 체크
                    if(this.carSelRgnCArr.includes('1')){   // 국산
                        console.log('[1] : 국산선택됨!!!')

                        //this.$nextTick(() => {
                            // select 값 temp복사
                            //tempCarBrandArr = Object.assign([], this.carBrandArr)
                            
                            // 국산 브랜드 선택여부 체크(개별)
                            if(tempCarBrandArr.some((arr) => arr < 200) === true && this.carBrandSetList.filter((i) => i.carSelRgnC === '1').length > tempCarBrandArr.filter((arr) => arr < 200).length){
                                console.log('count리스트 : ', this.carBrandSetList.filter((i) => i.carSelRgnC === '1').length)
                                console.log('count선택 : ', tempCarBrandArr.filter((arr) => arr < 200).length)

                                // 국산브랜드 선택값 유지
                                tempCarBrandArr.filter((arr) => arr < 200).map((obj) => {
                                    this.carBrandArr.push(obj)
                                }) 
                                this.brandAllChk1 = false    // 브랜드 전체선택(국산)                                                                 
                                console.log('11111')
                            }else{
                                //this.carBrandArr     = []       // 자동차브랜드번호 선택
                                console.log('22222')
                                console.log('브랜드 선택체크1 : ', tempCarBrandArr.filter((arr) => arr < 200).length)
                                console.log('수입 클릭체크1 : ', selCarSelRgnC)

                                // 다중선택case에서 수입브랜드 체크해제시 기 선택되어 있는 국산브랜드가 선택되어 있는지 체크
                                if(selCarSelRgnC === '2' && tempCarBrandArr.some((arr) => arr < 200) === false){
                                    console.log('개별국산브랜드제외!!!')
                                     this.brandAllChk1 = false    // 브랜드 전체선택(국산)
                                    return false
                                }
                                    console.log('개별국산브랜드전체선택!!!')
                                    // 자동차브랜드번호 전체선택
                                    this.carBrandSetList.map((item) => { this.carBrandArr.push(item.carBranNo) })
                                    this.brandAllChk1 = true    // 브랜드 전체선택(국산)
                            }

                            console.log('복사!!! : ', tempCarBrandArr)
                            console.log('국산포함여부? : ', tempCarBrandArr.some((arr) => arr < 200) )
                        //})



                    //    this.$nextTick(() => {
                    //        this.carBrandArr.push(selCarBranNo) // 수입 선택 데이터 체크
                            // 국산브랜드 선택값 유지
                    //        tempCarBrandArr.filter((arr) => arr < 200).map((obj) => {
                    //            this.carBrandArr.push(obj)
                    //        })                       
                    //    })
                        

                        // this.brandAllChk1 = true    // 브랜드 전체선택(국산)
                    }else{
                        console.log('[2] : 국산선택해제!!!')
                        this.brandAllChk1 = false   // 브랜드 전체선택(국산해제)
                    }

                    if(this.carSelRgnCArr.includes('2')){   // 수입
                        console.log('[2] : 수입선택됨!!!')
                        
                        // 수입 브랜드 선택여부 체크
                        if(tempCarBrandArr.some((arr) => arr >= 200) === true && this.carBrandSetList.filter((i) => i.carSelRgnC === '2').length > tempCarBrandArr.filter((arr) => arr >= 200).length){
                            console.log('count리스트 : ', this.carBrandSetList.filter((i) => i.carSelRgnC === '1').length)
                            console.log('count선택 : ', tempCarBrandArr.filter((arr) => arr < 200).length)                            
                            // 수입브랜드 선택값 유지
                            tempCarBrandArr.filter((arr) => arr >= 200).map((obj) => {
                                this.carBrandArr.push(obj)
                            }) 

                            this.brandAllChk2 = false    // 브랜드 전체선택(수입)                                                                 
                            console.log('222222')
                        }else{
                            //this.carBrandArr     = []       // 자동차브랜드번호 선택
                            console.log('33333333')
                            console.log('브랜드 선택체크2 : ', tempCarBrandArr.filter((arr) => arr >= 200).length)
                            console.log('수입 클릭체크2 : ', selCarSelRgnC)

                            // 다중선택case에서 국산브랜드 체크해제시 기 선택되어 있는 수입브랜드가 선택되어 있는지 체크
                            if(selCarSelRgnC === '1' && tempCarBrandArr.some((arr) => arr >= 200) === false){
                                console.log('개별수입브랜드제외!!!')
                                this.brandAllChk2 = false    // 브랜드 전체선택(수입)
                                return false
                            }

                            console.log('개별수입브랜드전체선택!!!')
                            // 자동차브랜드번호 전체선택
                            this.carBrandSetList.map((item) => { this.carBrandArr.push(item.carBranNo) })
                            this.brandAllChk2 = true    // 브랜드 전체선택(수입)
                        }

                        console.log('복사!!! : ', tempCarBrandArr)
                        console.log('수입포함여부? : ', tempCarBrandArr.some((arr) => arr >= 200) )

                        //this.brandAllChk2 = true    // 브랜드 전체선택(수입)
                    }else{
                        console.log('[2] : 수입선택해제!!!')
                        this.brandAllChk2 = false   // 브랜드 전체선택(수입해제)
                    }

                    // 자동차브랜드번호 전체선택
                    //this.carBrandSetList.map((item) => { this.carBrandArr.push(item.carBranNo) })
                }

                // 다건 선택 시
                if(this.carSelRgnCArr.length >  1){
                    if(this.carSelRgnCArr.includes('1') && this.carSelRgnCArr.includes('2')){   // 국산&수입 둘다 선택

                        console.log('전체1 : ', tempCarBrandArr.some((arr) => arr >= 200) === true)
                        console.log('전체2 : ', this.carBrandSetList.filter((i) => i.carSelRgnC === '2').length)
                        console.log('전체3 : ', tempCarBrandArr.filter((arr) => arr >= 200).length)

                        console.log('전체11 : ', tempCarBrandArr.some((arr) => arr < 200) === true)
                        console.log('전체22 : ', this.carBrandSetList.filter((i) => i.carSelRgnC === '1').length)
                        console.log('전체33 : ', tempCarBrandArr.filter((arr) => arr < 200).length)
                        
                        // 수입 브랜드 선택여부 체크
                        if(tempCarBrandArr.some((arr) => arr >= 200) === true && this.carBrandSetList.filter((i) => i.carSelRgnC === '2').length > tempCarBrandArr.filter((arr) => arr >= 200).length){
                           console.log('1234')
                           // 수입브랜드 선택값 유지
                            tempCarBrandArr.filter((arr) => arr >= 200).map((obj) => {
                                this.carBrandArr.push(obj)
                            })

                            // 국산브랜드 선택
                            this.carBrandSetList.filter((arr) => arr.carSelRgnC === '1').map((obj) => {
                                this.carBrandArr.push(obj.carBranNo)
                            })

                            this.brandAllChk1 = true     // 브랜드 전체선택(국산)   
                            this.brandAllChk2 = false    // 브랜드 전체선택(수입)                                                                 
                            console.log('222222@@@')
                            
                            //국산 브랜드 선택여부 체크(개별)
                        }else if(tempCarBrandArr.some((arr) => arr < 200) === true && this.carBrandSetList.filter((i) => i.carSelRgnC === '1').length > tempCarBrandArr.filter((arr) => arr < 200).length){
                            console.log('1236')
                            // 국산브랜드 선택값 유지
                            tempCarBrandArr.filter((arr) => arr < 200).map((obj) => {
                                this.carBrandArr.push(obj)
                            })

                            // 수입브랜드 선택
                            this.carBrandSetList.filter((arr) => arr.carSelRgnC === '2').map((obj) => {
                                this.carBrandArr.push(obj.carBranNo)
                            })                        

                            this.brandAllChk1 = false    // 브랜드 전체선택(국산)
                            this.brandAllChk2 = true    // 브랜드 전체선택(국산)                                                                                     
                            console.log('11111@@@')
                        }else{
                            console.log('12345')

                            console.log('버튼선택 : ', selCarSelRgnC)
                            
                            // 국산선택 후 수입브랜드 선택이 되어 있지 않으면(수입 제외 선택)
                            if(selCarSelRgnC === '1' && tempCarBrandArr.some((arr) => arr >= 200) === false){
                                console.log("수입제외!!")
                                // 자동차브랜드번호 전체선택(수입제외)
                                this.carBrandSetList.filter((arr) => arr.carBranNo < 200).map((item) => { this.carBrandArr.push(item.carBranNo) })

                                this.brandAllChk1 = true    // 브랜드 전체선택(국산)                              
                                this.brandAllChk2 = false   // 브랜드 전체선택(수입)                          
                            // 수입선택 후 국산브랜드 선택이 되어 있지 않으면(국산 제외 선택)    
                            }else if(selCarSelRgnC === '2' && tempCarBrandArr.some((arr) => arr < 200) === false){
                                console.log("국산제외!!")

                                // 자동차브랜드번호 전체선택(국산제외)
                                this.carBrandSetList.filter((arr) => arr.carBranNo >= 200).map((item) => { this.carBrandArr.push(item.carBranNo) })

                                this.brandAllChk1 = false   // 브랜드 전체선택(국산)                              
                                this.brandAllChk2 = true    // 브랜드 전체선택(수입)  

                            }else{
                                // 자동차브랜드번호 전체선택
                                this.carBrandSetList.map((item) => { this.carBrandArr.push(item.carBranNo) })
                                this.brandAllChk1 = true    // 브랜드 전체선택(국산)                              
                                this.brandAllChk2 = true    // 브랜드 전체선택(수입)   
                            }


                            // 자동차브랜드번호 전체선택
                            //this.carBrandSetList.map((item) => { this.carBrandArr.push(item.carBranNo) })
                            //this.brandAllChk1 = true    // 브랜드 전체선택(국산)                              
                            //this.brandAllChk2 = true    // 브랜드 전체선택(수입)                        
                        }

                        console.log('[12] : 국산수입선택됨!!!')
                    }else{
                        this.brandAllChk1 = false   // 브랜드 전체선택(국산)
                        this.brandAllChk2 = false   // 브랜드 전체선택(수입)
                        console.log('[12] : 국산수입선택해제!!!')                       
                    }

                    // 자동차브랜드번호 전체선택
                    //this.carBrandSetList.map((item) => { this.carBrandArr.push(item.carBranNo) })                
                }

                console.log('국산선택[1chk] : ', this.carSelRgnCArr.includes('1'))
                console.log('수입선택[2chk] : ', this.carSelRgnCArr.includes('2'))        
                console.log('브랜드 선택 in>>>>>>')
                console.log('수입여부 선택 값    :', this.carSelRgnCArr)
                console.log("브랜드 필터링 리스트 : ",  this.carBrandSetList)

                console.log("국산브랜드 전체체크 : ", this.brandAllChk1)
                console.log("수입브랜드 전체체크 : ", this.brandAllChk2)
                console.log("브랜드 선택리스트   : ", this.carBrandArr)
            
            // 브랜드 선택 시 단건 Setting
            }else{
                console.log("BRANSELIN >>>>>", selGbn)
                console.log("brandAllChk1 >>>>>", this.brandAllChk1)
                console.log("brandAllChk2 >>>>>", this.brandAllChk2)
                console.log("selCarBranNo >>>>>", selCarBranNo)
                console.log("selCarSelRgnC >>>>>", selCarSelRgnC)

                // 국산 브랜드 선택시
                if(selCarSelRgnC === '1'){
                    // 국산(ALL) and 수입(ALL)
                    if( this.brandAllChk1 == true && this.brandAllChk2 == true){
                        console.log('AAAAAA')
                        this.carBrandArr  = []      // 자동차브랜드번호 선택 초기화
                        this.brandAllChk1 = false   // 브랜드 전체선택(국산) 해제
                        this.brandAllChk2 = true    // 브랜드 전체선택(수입) 유지
                    
                        // 데이터 선택
                        this.$nextTick(() => {
                            this.carBrandArr.push(selCarBranNo) // 국산브랜드 선택 데이터 체크
                            // 수입브랜드 선택 유지
                            this.carBrandSetList.filter((arr) => arr.carSelRgnC === '2').map((obj) => {
                                this.carBrandArr.push(obj.carBranNo)
                            })                       
                        })
                    // 국산(ALL) and 수입(개별)
                    }else if(this.brandAllChk1 == true && this.brandAllChk2 == false){
                        console.log('BBBBBBB')
                        // select 값 temp복사
                        let tempCarBrandArr = Object.assign([], this.carBrandArr)
                        this.carBrandArr  = []      // 자동차브랜드번호 선택 초기화
                        this.brandAllChk1 = false   // 브랜드 전체선택(국산) 해제
                        this.brandAllChk2 = false   // 브랜드 전체선택(수입) 해제

                        console.log('복사 된 값(국산)? : ', tempCarBrandArr.filter((arr) => arr >= 200))

                        // 데이터 선택
                        this.$nextTick(() => {
                            this.carBrandArr.push(selCarBranNo) // 국산브랜드 선택 데이터 체크
                            // 수입브랜드 선택값 유지
                            tempCarBrandArr.filter((arr) => arr >= 200).map((obj) => {
                                this.carBrandArr.push(obj)
                            })                       
                        })
                    // 국산(개별) and 수입(개별)
                    }else if(this.brandAllChk1 == false && this.brandAllChk2 == false){
                        console.log('CCCCCCC')
                        // select 값 temp복사
                        let tempCarBrandArr = Object.assign([], this.carBrandArr)
                        this.carBrandArr  = []      // 자동차브랜드번호 선택 초기화
                        this.brandAllChk1 = false   // 브랜드 전체선택(국산) 해제
                        this.brandAllChk2 = false   // 브랜드 전체선택(수입) 해제

                        // 데이터 선택
                        this.$nextTick(() => {
                            //this.carBrandArr.push(selCarBranNo) // 국산브랜드 선택 데이터 체크

                            // 국산브랜드 선택값 유지(선택값 제외)
                            tempCarBrandArr.filter((arr) => arr < 200).map((obj) => {
                                console.log('bbbbb >>', obj)
                                this.carBrandArr.push(obj)
                            })

                            // 수입브랜드 선택값 유지
                            tempCarBrandArr.filter((arr) => arr >= 200).map((obj) => {
                                this.carBrandArr.push(obj)
                            })
                            
                            console.log('선택된 브랜드 번호 : ', selCarBranNo)
                            console.log('1111 : ', tempCarBrandArr.filter((arr) => arr < 200))
                            console.log('2222 : ', tempCarBrandArr.filter((arr) => arr >= 200))                            
                            console.log('nnnnn : ', this.carBrandArr)
                        })            
                    }else{
                        console.log('DDDDDDD')
                        console.log("(국산)미체크상태!!")
                        //this.brandAllChk1 = false  // 브랜드 전체선택(국산) 해제
                        //this.brandAllChk2 = false  // 브랜드 전체선택(수입) 해제                       
                    }
                    console.log("국산브랜드!!")
                }else if(selCarSelRgnC === '2'){
                    if( this.brandAllChk1 == true && this.brandAllChk2 == true){
                        console.log('EEEEEEE')
                        this.carBrandArr  = []      // 자동차브랜드번호 선택 초기화
                        this.brandAllChk1 = true    // 브랜드 전체선택(국산) 유지
                        this.brandAllChk2 = false   // 브랜드 전체선택(수입) 해제 
                    
                        // 데이터 선택
                        this.$nextTick(() => {
                            this.carBrandArr.push(selCarBranNo) // 수입브랜드 선택 데이터 체크
                            // 국산브랜드 선택 유지
                            this.carBrandSetList.filter((arr) => arr.carSelRgnC === '1').map((obj) => {
                                this.carBrandArr.push(obj.carBranNo)
                            })                       
                        })
                    // 국산(개별) and 수입(ALL)
                    }else if(this.brandAllChk1 == false && this.brandAllChk2 == true){
                        console.log('FFFFF')
                        // select 값 temp복사
                        let tempCarBrandArr = Object.assign([], this.carBrandArr)
                        this.carBrandArr  = []      // 자동차브랜드번호 선택 초기화
                        this.brandAllChk1 = false   // 브랜드 전체선택(국산) 해제
                        this.brandAllChk2 = false   // 브랜드 전체선택(수입) 해제

                        console.log('복사 된 값(수입)? : ', tempCarBrandArr.filter((arr) => arr < 200))

                        // 데이터 선택
                        this.$nextTick(() => {
                            this.carBrandArr.push(selCarBranNo) // 수입 선택 데이터 체크
                            // 국산브랜드 선택값 유지
                            tempCarBrandArr.filter((arr) => arr < 200).map((obj) => {
                                this.carBrandArr.push(obj)
                            })                       
                        })

                    // 국산(개별) and 수입(개별)
                    }else if(this.brandAllChk1 == false && this.brandAllChk2 == false){
                        console.log('HHHHHHHHHH')
                        // select 값 temp복사
                        let tempCarBrandArr = Object.assign([], this.carBrandArr)
                        this.carBrandArr  = []      // 자동차브랜드번호 선택 초기화
                        this.brandAllChk1 = false   // 브랜드 전체선택(국산) 해제
                        this.brandAllChk2 = false   // 브랜드 전체선택(수입) 해제
                        
                        // 데이터 선택
                        this.$nextTick(() => {
                            //this.carBrandArr.push(selCarBranNo) // 수입브랜드 선택 데이터 체크

                            // 수입브랜드 선택값 유지(선택 값 제외)
                            tempCarBrandArr.filter((arr) => arr >= 200).map((obj) => {
                                this.carBrandArr.push(obj)
                            })

                            // 국산브랜드 선택값 유지
                            tempCarBrandArr.filter((arr) => arr < 200).map((obj) => {
                                this.carBrandArr.push(obj)
                            })
                        })
                        
                    }else{
                        console.log('GGGGG')                        
                        console.log("(국산)미체크상태!!")
                        //this.brandAllChk1 = false  // 브랜드 전체선택(국산) 해제
                        //this.brandAllChk2 = false  // 브랜드 전체선택(수입) 해제                       
                    }
                    console.log("수입브랜드!!")
                }else{
                    console.log("미체크상태!!")
                    this.brandAllChk1 = false  // 브랜드 전체선택(국산) 해제
                    this.brandAllChk2 = false  // 브랜드 전체선택(수입) 해제                      
                } 

                // 국산 또는 수입브랜드 전체 선택여부 체크 후 데이터 삽입
                // if(this.brandAllChk1 === true || this.brandAllChk2 === true){
                //     console.log("체크상태!!")
                //     this.carBrandArr = []   // 자동차브랜드번호 선택

                //     this.$nextTick(() => {
                //         this.carBrandArr.push(selCarBranNo) // 선택 데이터 체크                        
                //     })

                //     // 전체선택 해제
                //     this.brandAllChk1 = false   // 브랜드 전체선택(국산)
                //     this.brandAllChk2 = false   // 브랜드 전체선택(수입)
                // }else{
                //     console.log("미체크상태!!")                   
                // }              
            }
                console.log('수입여부선택(최종2) : ', this.carSelRgnCArr)
                console.log('브랜드선택(최종2) : ', this.carBrandArr)
                console.log('국산전체(최종2) : ', this.brandAllChk1)
                console.log('수입전체(최종2) : ', this.brandAllChk2)              
        },
        fn_branSetVaild(){
            console.log("1111 : ", this.carSelRgnCArr)
            if(this.carSelRgnCArr.length === 0 ){
                console.log('수입여부 선택되지 않았음!!!')
                console.log("no국산브랜드 전체체크 : ", this.brandAllChk1)
                console.log("no수입브랜드 전체체크 : ", this.brandAllChk2)
                console.log("no브랜드 선택리스트   : ", this.carBrandArr)

                return false
            }
            if(this.carSelRgnCArr.length > 0 ){
                console.log('수입여부 선택!!!')
                return true
            }
        },

        // 적용버튼
        fn_apply() {
            console.log('carSelRgnCArr : ', this.carSelRgnCArr)
            console.log('cartpArr      : ', this.cartpArr)            
            console.log('ncarAmArr     : ', this.ncarAmArr)
            console.log('carBrandArr   : ', this.carBrandArr)

            let rtnData = {}

            // return
            if(this.carSelRgnCArr.length  > 0 || this.cartpArr.length > 0 ||  this.ncarAmArr.length > 0 || this.carBrandArr.length > 0){
                rtnData = {
                    carSelRgnCArr  : this.carSelRgnCArr     // 자동차판매지역코드
                    , cartpArr     : this.cartpArr          // 차종구분코드
                    , ncarAmArr    : this.ncarAmArr         // 신차금액구분코드
                    , carBrandArr  : this.carBrandArr       // 자동차브랜드번호 선택
                    , carBrandList : this.carBrandList      // 자동차브랜드목록(전체)
                }
            }else{
                rtnData = {}
            }
            
            console.log('rtnInfo : ', {"rtnData" : rtnData})

            // 팝업닫기
            this.close({"rtnData" : rtnData})
        },
        fn_ncarAmSet(ncarAmDsc){
            // 기존 값 초기화(금액구분)
            this.ncarAmArr = []
            this.ncarAmArr.push(ncarAmDsc)
        },        
        // 초기화버튼
        fn_selectClear(){
            this.carSelRgnCArr = []     // 자동차판매지역 초기화
            this.cartpArr      = []     // 차종구분 초기화
            this.ncarAmArr     = []     // 신차금액구분 초기화
            this.carBrandArr   = []     // 자동차브랜드번호 초기화

            // 브랜드목록 삭제 및 전체체크 해제
            this.carBrandSetList = []       // 자동차브랜드SetList
            this.brandAllChk1    = false    // 브랜드 전체선택(국산)
            this.brandAllChk2    = false    // 브랜드 전체선택(수입)            
        }
	},
	computed : {						
	}
}

</script>