<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 마이농가설정 > 작목재배지 등록/수정
* @ 페이지설명 : 작목/재배지 등록/수정
* @ 파일명     : src/views/page/SZ/ST/SZST2105/SZST2105.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-21              CS515729                 최초작성
* 2021-09-09                                       수정 작업
* 2021-09-16                                       수정 작업
*************************************************************************/
-->
<template>
	<div class="full_popup" > 
		<div class="popup_header">    
			<h1>작목/재배지 관리</h1>			
		</div>

		<div class="popup_content com_bg_type00"> <!--2021/09/16(목) 변경-->
        <!-- <div id="content" class="com_sub">     -->
			<div class="com_inner">    
				<strong class="com_box_tit style01">설정한 작목</strong>
				<div class="com_inputarea_type05">

                    <!--2021/10/29(금) 변경/추가 -->
                    <!--callLType = INSERT -->
                    <template v-if="callType === 'INSERT'">
                        <div class="com_btnselectbox_type01">
                            <button type="button" class="com_btnselect_type01 com_iconstar" title="작목을 설정해 주세요" @click.prevent="fn_openNaWrcPop($event)">
                                <em class="blind">필수입력</em><span>{{wrsPathTxt === undefined ? '작목을 설정해 주세요.' : wrsPathTxt}}</span>
                                 <!-- <em class="blind">필수입력</em><span>{{'작목을 설정해 주세요.'}}</span>  -->
                            </button>
                        </div>
                    </template>
                    <!--callLType = INSERT  AND 대중소 = 00000000(나의농장)인 경우-->
                    <template v-if="callType === 'INSERT2' " >
                        <div class="com_btnselectbox_type01">
                            <input type="text" id="com_input01" class="input_left" name="" disabled required date-placeholder="" v-model="wrsPathTxt">
                        </div>
                    </template>
                    <!--callLType = MODIFY -->
                    <template v-if="callType === 'MODIFY'">
                        <div class="com_btnselectbox_type01">
                            <button type="button" class="com_btnselect_type01 notype" :disabled="wrsPathTxt.length > 0" >
                                <span>{{wrsPathTxt.length > 0 ? wrsPathTxt : '작목을 설정해 주세요.'}}</span>
                            </button>
                        </div>
                    </template>
                    <!--2021/10/29(금) 변경/추가 -->
				</div>			
				
                <strong class="com_box_tit style01">재배지 설정</strong>
				<div class="com_inputarea_type05">
                    <div class="com_btnselectbox_type01">
						<button type="button" class="com_btnselect_type01 com_iconstar" @click.prevent="fn_openAddressPop($event)">
                            <em class="blind">필수입력</em><span>{{areaPathTxt.length > 0 ? areaPathTxt : '지역을 설정해 주세요.'}}</span>
                        </button>
					</div>

                    <div class="com_input_type01">
                        <!-- <input type="tel" id="txt03" class="" name="" value="" required="" maxlength="5" @input="addComma('culplDongCn')" @keyup="moveNextTag($event)" v-model="culplDongCn" placeholder="동(개)수 정보를 입력해 주세요."> -->
                        <!-- <input type="tel" id="txt03" class="com_txtright_type01" :class="culplDongCn.length>0?'focusON focusforce ':''" name="" value="" required="" 
                               maxlength="3" @input="addComma('culplDongCn')"  @keyup="moveNextTag($event)" v-model="culplDongCn" ref="culplDongCn" placeholder="동(개)수 정보를 입력해 주세요." > -->

                        <!--2021/10/19(화) /2021/10/20(수) 변경-->
                        <input type="tel" id="txt03" class="com_txtright_type01" :class="culplDongCn.length>0?'focusON focusforce ':''" name="" value="" required="" 
                               maxlength="3" @input="addComma('culplDongCn')"  @keyup="moveNextTag($event)" v-model="culplDongCn" ref="culplDongCn" placeholder="동(개)수 정보를 입력해 주세요."
                               title="동(개)수 정보를 입력해 주세요." @focus="culplDongCn.length>0 ? fn_focusOnOff('Y','culplDongCn') : fn_focusOnOff('N','culplDongCn')" >
                               <!-- @focus="culplDongCn.length>0 ? fn_focusOnOff('Y','culplDongCn') : fn_focusOnOff('N','culplDongCn')" @blur="fn_focusOnOff('N','culplDongCn')" > -->
						<label for="txt01">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">동(개)수 정보</span>
						</label>
						<!-- <div class="del_txt type01" v-show="culplDongCn.length > 0">
							<a @click="fn_delDongCn()" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
						</div> -->
						<div class="del_txt type01" v-show="focusTf === true">
							<!-- <a class="com_btn_delete2" v-on:click.prevent="delStr('culplDongCn')" style="display: none;" v-if="culplDongCn.length > 0"> -->
							<a class="com_btn_delete2" v-on:click.prevent="delStr('culplDongCn')">
                               <span class="blind">삭제</span>
                            </a>
						</div>
                        <!--2021/10/19(화) /2021/10/20(수) 변경-->
                        
					</div>                    
				</div>
				
                <strong class="com_box_tit style01">동(개)당 면적</strong>
                <ul class="com_radio_type02 mb15">
					<li>
						<div :title="culplAreaUntC==='1'? '평':'' " class="btn_radio" >
							<input type="radio" name="yymm" id="radio11" :checked="culplAreaUntC==='1'" @change="fn_culplAreaUntC('1')">
							<label for="radio11">
								<span>평</span>											
							</label>	
						</div>						
					</li>
					<li>
						<div :title="culplAreaUntC==='2'? '㎡':'' " class="btn_radio" >
							<input type="radio" name="yymm" id="radio12" :checked="culplAreaUntC==='2'" @change="fn_culplAreaUntC('2')">
							<label for="radio12">
								<span>㎡</span>	
							</label>	
						</div>
					</li>
				</ul>

				<div class="com_inputarea_type10">
					<div class="com_input_type01 ani-active com_word1">  
                        <!-- <input type="tel" id="txt02" class="" name="" value="" required="" maxlength="9" @input="addComma('culplArea')" v-model="culplArea" @keyup="moveNextTag($event)" placeholder="면적 정보를 입력해 주세요."> -->

                        <!-- <input type="tel" id="txt03" class="com_txtright_type01" :class="culplArea.length>0?'focusON focusforce ':''" name="" value="" required="" 
                               maxlength="7" @input="addComma('culplArea')" @keyup="moveNextTag($event)" v-model="culplArea" ref="culplArea" placeholder="면적 정보를 입력해 주세요."> -->
                       
                        <!-- <input type="tel" id="com_input03" class="com_txtright_type01" :class="culplArea.length>0?'focusON focusforce ':''" name="" value="" required="" 
                               maxlength="7" @input="addComma('culplArea')" @keyup="moveNextTag($event)" v-model="culplArea" ref="culplArea" placeholder="면적 정보를 입력해 주세요.">
						<label for="com_input03">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">면적 정보</span>
						</label>   
						<div class="del_txt">
							<a class="com_btn_delete2" v-on:click.prevent="delStr('culplArea')">
                               <span class="blind">삭제</span>
                            </a>
                            <span class="com_inputtxtright2 style01">{{culplAreaUntCNm}}</span>
						</div> -->

                        <!--2021/10/28(목)-->
                        <input type="tel" id="txt04" class="com_txtright_type01" :class="(callType === 'INSERT' || callType === 'MODIFY')?'focusON focusforce ':''" name="" value="" required="" 
                                maxlength="7" @input="addComma('culplArea')" @keyup="moveNextTag($event)" v-model="culplArea" ref="culplArea" placeholder="면적 정보를 입력해 주세요."
                                title="면적 정보를 입력해 주세요." @focus="focusTf1 === '' || focusTf1 === '1' ? fn_focusOnOff('Y','culplArea') : fn_focusOnOff('N','culplArea')" > 
                                <!-- 부모창에서 데이터가 없이 넘어오면 focusTf1이 공백으로 넘어오기 때문에 평으로 바꾸기 위해 조건 추가 2022.07.27 -->
                        <!--2021/10/28(목)-->

                        <!-- <div class="del_txt type01" v-show="(focusTf1 === '1' || focusTf1 === '2') "> 
                            <a class="com_btn_delete2" v-on:click.prevent="delStr('culplArea')">
                            <span class="blind">삭제</span>
                            </a>
                            <span class="com_inputtxtright2">{{culplAreaUntCNm}}</span> 
                        </div> -->

                        <!-- <label for="txt01">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">면적 정보</span> 
                             <span class="com_inputtxtright2">{{culplAreaUntCNm}}</span> 
						</label> -->

                        <!--2021/11/01(월) 변경-->
                        <label for="txt01">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">면적 정보</span>
						</label>
						<div class="del_txt type01 ani-active">
							<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">{{culplAreaUntCNm}}</span>
						</div>                        
                        <!--2021/11/01(월) 변경-->

					</div>
				</div>

				<div class="com_textarea_type01 com_no_iconstar">
					<!-- <textarea name="" id="txt00" class="com_txtarea_type01" cols="10" rows="5" v-model="memoCntn" @input="fn_memoCntnChkLength()" required placeholder="상세내역을 입력해 주세요"></textarea> -->
                    <textarea name="" id="txt00" class="com_txtarea_type02" cols="10" rows="3" v-model="memoCntn" ref="memoCntn" @input="fn_checkWord($event,100, 'memoCntn')" required placeholder="상세내용을 입력해 주세요"></textarea>
					<label for="txt00"><span class="txt_label_x">상세내용</span></label>                    
				</div>
            </div>  <!--com_inner(End)-->
		</div> <!--content(End)-->

		<div class="popup_footer fixed">
			<div class="btn_half_box">
                <a href="javascript:void(0);" @click.prevent="close()" class="btn btn_grey" v-if="getBtnDelYn === false">취소</a>
                <a href="javascript:void(0);" @click.prevent="fn_delInfo()" class="btn btn_grey" v-if="getBtnDelYn === true">삭제</a>
				<a href="javascript:void(0);" @click.prevent="fn_saveInfo()" class="btn btn_mint">저장</a>
			</div>
		</div>	

        <a href="javascript:void(0);" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {keyupNumFormat} from '@/utils/number'
    import {checkWord} from '@/utils/data'

    import SZST2103 from '@/views/page/SZ/ST/SZST2103/SZST2103'		//작목설정
    import SZST2106 from '@/views/page/SZ/ST/SZST2106/SZST2106'		//지역설정
    
    export default {
		name : "SZST2105",
        data: () => {
            return {
                objAreaInfo  : {},   //전달파라미터
                callType     : "",   //화면호출유형 (INSERT, MODIFY)
                respInfo     : {},   //응답결과
                chkMyFarmCd  : "000000000", //나의농장 비교위한값

                wrsPathTxt   : "",  //선택 작목명
                selNaWrsLclc : "",  //선택 작목대분류
                selNaWrsMclc : "",  //선택 작목중분류
                selNaWrsSclc : "",  //선택 작목소분류
                
                areaPathTxt  : "",  //선택지역정보명

                selProvC     : "",  //시도코드
                selProvnm    : "",  //시도 명
                selCcwC      : "",  //시군구코드
                selCcwnm     : "",  //시군구명
                selTtvC      : "",  //읍면동코드
                selTtvnm     : "",  //읍면동명
                selCulplRgnC : "",  //재배지지역코드

                culplDongCn  : "",  //재배지동수
                culplArea    : "",  //재배지면적
                memoCntn     : "",  //메모
                culplAreaUntC : "",    //면적구분. 1:평, 2:m

                objA_naWrsLclc : "",
                objA_naWrsMclc : "",
                objA_naWrsSclc : "",

                isMyFram     : false,   // 나의농장여부
                isInsert     : false,   // 신규등록여부
                focusTf      : false,
                focusTf1     : "",

                culplAreaUntCNm : "", 
            }
        },
        computed: {
            getBtnDelYn() {
                let delYn = true
                if(this.isMyFram === true) {    
                    //나의농장은 삭제불가
                    delYn = false
                } else {
                    if(this.isInsert === true) {
                        //초기등록일때 삭제불가
                        delYn = false    
                    }
                }
                return delYn
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
		methods: {
			initComponent() {
                this.objAreaInfo = this.params.objAreaInfo

                console.log("this.objAreaInfo", this.objAreaInfo)
                this.callType = this.objAreaInfo.callType
                this.wrsPathTxt = this.objAreaInfo.wrsPathTxt

                console.log(" ~~~~ [SZST2105]initComponent()/callType=>>"+this.callType)
                console.log(" ~~~~ [SZST2105]initComponent()/wrsPathTxt=>>"+this.wrsPathTxt)

                //2021.11.01(월) 변경    
                this.objA_naWrsLclc = this.objAreaInfo.naWrsLclc || ""
                this.objA_naWrsMclc = this.objAreaInfo.naWrsMclc || ""
                this.objA_naWrsSclc = this.objAreaInfo.naWrsSclc || ""
                //2021.11.01(월) 변경    

                console.log(" ~~~~ [SZST2105]initComponent()/objA_naWrsLclc=>>"+this.objA_naWrsLclc)
                console.log(" ~~~~ [SZST2105]initComponent()/objA_naWrsMclc=>>"+this.objA_naWrsMclc)
                console.log(" ~~~~ [SZST2105]initComponent()/objA_naWrsSclc=>>"+this.objA_naWrsSclc)

                // this.culplAreaUntC = "1" // 초기 면적구분 "평" 세팅
                // this.culplAreaUntCNm = "평" // 초기 면적구분 "평" 세팅

                //수정모드 일때만 호출
                if(this.callType === "MODIFY" ) {
                    this.getData()
                } else {
                    this.isInsert = true  //등록진입
                    this.culplAreaUntC = "1" // 초기 면적구분 "평" 세팅
                    this.culplAreaUntCNm = "평" // 초기 면적구분 "평" 세팅
                    this.focusTf1 = "1"
                    console.log(" ~~~~ [SZST2105]initComponent()/초기 면적구분=>>"+this.culplAreaUntC)
                    console.log(" ~~~~ [SZST2105]initComponent()/초기 면적구분명=>>"+this.culplAreaUntCNm)
                    console.log(" ~~~~ [SZST2105]initComponent()/focusTf1=>>"+this.focusTf1)
                }
            },

            fn_chkNumber(e, type){
                if(type==="DONG") {
                    e.target.value = e.target.value.replace(/[^0-9.]/gi,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi,'').slice(0,3)
                    this.culplDongCn = e.target.value
                } else {
                    e.target.value = e.target.value.replace(/[^0-9.]/gi,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi,'').slice(0,10)
                    this.culplArea = e.target.value
                }
            },

			getData() {

                console.log(">>> [SZST2105]조회(getData)(Start))) <<<")

                const config = {
                    url: '/sz/st/05r01',
                    data: {
                        "mydtCusno" : this.getUserInfo("mydtCusno"),  //sexDsc: "0"
                        "naWrsLclc" : this.objAreaInfo.naWrsLclc,
                        "naWrsMclc" : this.objAreaInfo.naWrsMclc,
                        "naWrsSclc" : this.objAreaInfo.naWrsSclc
                    }
                }
                apiService.call(config).then(response => {
                    this.respInfo = response || {}

                console.log(" ~~~~ [SZST2105]getData()/naWrsLclfnm=>>"+this.respInfo.naWrsLclfnm)
                console.log(" ~~~~ [SZST2105]getData()/naWrsMclfnm=>>"+this.respInfo.naWrsMclfnm)
                console.log(" ~~~~ [SZST2105]getData()/naWrsSclfnm=>>"+this.respInfo.naWrsSclfnm)

                    //작목 PATH
                    this.wrsPathTxt = this.respInfo.naWrsLclfnm + " > " + this.respInfo.naWrsMclfnm + " > " + this.respInfo.naWrsSclfnm

                    this.selCulplRgnC = this.respInfo.culplRgnC //재배지지역코드
                    this.selProvC  = this.respInfo.provC || "" //지역 시/도 코드
                    this.selProvnm = this.respInfo.provnm || "" //지역 시/도 코드
                    this.selCcwC   = this.respInfo.ccwC || ""  //지역 시/군/구 코드
                    this.selCcwnm  = this.respInfo.ccwnm || ""  //지역 시/군/구 코드
                    this.selTtvC   = this.respInfo.ttvC || ""  //지역 읍면동코드
                    this.selTtvnm  = this.respInfo.ttvnm || ""  //지역 읍면동코드
                    //주소 PATH
                    this.areaPathTxt  = this.respInfo.provnm + " > " + this.respInfo.ccwnm + " > " + this.respInfo.ttvnm

                    //*변경(09.09)
                    this.culplDongCn  = (this.respInfo.culplDongCn === null)?'':keyupNumFormat(this.respInfo.culplDongCn) //재배동수
                    this.culplArea    = (this.respInfo.culplArea === null)?'':keyupNumFormat(this.respInfo.culplArea)  //재배면적
                    console.log('[SZST2105](변수)재배동수=>> '+this.culplDongCn);	
                    console.log('[SZST2105](변수)재배면적=>> '+this.culplArea);	

                    //*변경(09.09)
                    this.culplAreaUntC = this.respInfo.culplAreaUntC //재배면적구분
                    console.log('[SZST2105](변수)재배면적구분=>> '+this.culplAreaUntC);	

                    if (this.culplAreaUntC === '1') {
                        this.culplAreaUntCNm = "평" // 초기 면적구분 "평" 세팅       
                        this.focusTf1  = '1'
                    } else if (this.culplAreaUntC === '2') {
                        this.culplAreaUntCNm = "㎡" // 초기 면적구분 "평" 세팅             
                        this.focusTf1  = '2'      
                    } 
                    console.log('[SZST2105](변수)재배면적구분명=>> '+this.culplAreaUntCNm);	

                    this.memoCntn = this.respInfo.memoCntn  //메모 

                    // 나의농장여부 체크
                    let tempWrsClc = this.objA_naWrsLclc +""+ this.objA_naWrsMclc +""+ this.objA_naWrsSclc

                    if(tempWrsClc === this.chkMyFarmCd) {
                        this.isMyFram = true

                        //작목PATH 영역
                        this.wrsPathTxt = this.respInfo.naWrsSclfnm //소분류명만

                        //재배지지역정보 없을경우
                        if(this.selCulplRgnC === null) {
                            this.areaPathTxt = ""   //지역PATH 
                            this.culplDongCn = ""
                            this.culplArea   = ""
                            this.culplAreaUntC = "1"    //기본 '평'세팅
                        }
                    }
                })

                console.log(">>> [SZST2105]조회(getData)(End))) <<<")

            },

            /*
            * 작목설정 팝업호출
            */
            fn_openNaWrcPop(e) {
				const config = {
					component: SZST2103,
				}
				modalService.openPopup(config).then(response => {
                    let info = response

                    this.wrsPathTxt  = info.naWrsLclfnm + " > " + info.naWrsMclfnm + " > "  + info.naWrsSclfnm
                    this.objA_naWrsLclc = info.naWrsLclc    //대분류코드
                    this.objA_naWrsMclc = info.naWrsMclc    //중분류코드
                    this.objA_naWrsSclc = info.naWrsSclc    //소분류코드

                    console.log('[SZST2105]fn_openNaWrcPop/wrsPathTxt=>> '+this.wrsPathTxt);	
                    console.log('[SZST2105]fn_openNaWrcPop/objA_naWrsLclc=>> '+this.objA_naWrsLclc);	
                    console.log('[SZST2105]fn_openNaWrcPop/objA_naWrsMclc=>> '+this.objA_naWrsMclc);	
                    console.log('[SZST2105]fn_openNaWrcPop/objA_naWrsSclc=>> '+this.objA_naWrsSclc);	

                    // 다음 항목 이동
                    this.$nextTick(()=>{
                        if(e !== null) this.moveNextTag(e)
                    })

				})
            },

            /*
            * 재배지설정 팝업호출
            */
            fn_openAddressPop(e) {
				const config = {
					component: SZST2106,
				}
				modalService.openPopup(config).then(response => {
                    let info = response

                    this.areaPathTxt  = info.provnm + " > " + info.ccwnm + " > "  + info.ttvnm
                    this.selProvC     = info.provC  //시도코드
                    this.selCcwC      = info.ccwC   //군구코드
                    this.selTtvC      = info.ttvC   //읍면동코드
                    this.selCulplRgnC = info.culplRgnC //재배지지역코드

                    this.selProvC     = info.provC  || "" //지역 시/도 코드
                    this.selProvnm    = info.provnm || "" //지역 시/도 명
                    this.selCcwC      = info.ccwC   || "" //지역 시/군/구 코드
                    this.selCcwnm     = info.ccwnm  || "" //지역 시/군/구 명
                    this.selTtvC      = info.ttvC   || "" //지역 읍면동코드
                    this.selTtvnm     = info.ttvnm  || "" //지역 읍면동명

                    // 다음 항목 이동
                    this.$nextTick(()=>{
                        if(e !== null) this.moveNextTag(e)
                    })

				})
            },

            //입력 텍스트 삭제 및 focus(2021/10/19(화) 추가)
            delStr(colNm) {

                if (colNm == "culplDongCn") {
                    this.culplDongCn = ''   //재배동수
                    this.$refs.culplDongCn.focus()
                } else if ( colNm == "culplArea") { 
                    this.culplArea = ''  //면적구분 동,㎡
                    this.$refs.culplArea.focus()
                }
            },

            //면적구분 선택 처리
            fn_culplAreaUntC(value) {
                //면적구분 동,㎡
                this.culplAreaUntC = value

                console.log(" ~~~~ [SZST2105]fn_culplAreaUntC/value=>>"+value)

                if (value === '1') {
                   this.culplAreaUntCNm = "평"
                   this.focusTf1  = '1'
                } else if (value === '2') {
                   this.culplAreaUntCNm = "㎡"
                   this.focusTf1  = '2'      
                }    
                console.log(" ~~~~ [SZST2105]fn_culplAreaUntC/this.culplAreaUntCNm=>>"+this.culplAreaUntCNm)
                console.log(" ~~~~ [SZST2105]fn_culplAreaUntC/this.focusTf1=>>"+this.focusTf1)

            },

            fn_showHide(value) {
                this.imsiShowHide = value
            },
            
            fn_memoCntnChkLength() {
                let len = 200
                let val = this.memoCntn || ""

                if(val.length > len) {
                    this.memoCntn = val.substring(0, len)
                }
            },

            //**************
            // [저장]버튼
            //***************/
            fn_saveInfo() {
                console.log(">>> [SZST2105]저장(fn_saveInfo)(Start))) <<<")

                console.log(" ~~~~ [SZST2105]fn_saveInfo()/callType=>> "+this.callType)
                console.log(" ~~~~ [SZST2105]fn_saveInfo()/작목(대분류)=>> "+this.objA_naWrsLclc)
                console.log(" ~~~~ [SZST2105]fn_saveInfo()/작목(중분류)=>> "+this.objA_naWrsMclc)
                console.log(" ~~~~ [SZST2105]fn_saveInfo()/작목(소분류)=>> "+this.objA_naWrsSclc)

                if(this.callType === "INSERT" || this.callType === "MODIFY") {
                    if(this.objA_naWrsLclc === "" || this.objA_naWrsMclc === "" || this.objA_naWrsSclc === "") {
                        modalService.alert("작목을 설정해 주세요.")
                        return    
                    }
                }

                console.log(" ~~~~ [SZST2105]fn_saveInfo()/지역=>> "+this.areaPathTxt)

                if(this.areaPathTxt === "") {
                    modalService.alert("지역을 설정해 주세요.")
                    return
                }

                console.log(" ~~~~ [SZST2105]fn_saveInfo()/재배지 동(개)수=>> "+this.culplDongCn)

                if(this.culplDongCn === "") {
                    modalService.alert("재배지 동(개)수를 입력하여 주세요.")
                    return
                }

                console.log(" ~~~~ [SZST2105]fn_saveInfo()/재배지면적단위코드=>> "+this.culplAreaUntC)
                console.log(" ~~~~ [SZST2105]fn_saveInfo()/면적정보=>> "+this.culplArea)

                //2021.11.01(월) 변경
                //재배지면적단위코드가 존재할 경우    
                if (this.culplAreaUntC !== "") {

                    if(this.culplArea === "") {
                        modalService.alert("면적 정보를 입력하여 주세요.")
                        return
                    }
                }
                //2021.11.01(월) 변경

                console.log(" ~~~~ [SZST2105]fn_saveInfo(1))) ~~~~ ")

                /// 작목/재배지 등록
				const config = {
                    url: '/sz/st/05s01',
                    data: {
                        "mydtCusno"     : this.getUserInfo("mydtCusno"),
                        "naWrsLclc"     : this.objA_naWrsLclc,
                        "naWrsMclc"     : this.objA_naWrsMclc,
                        "naWrsSclc"     : this.objA_naWrsSclc,
                        "culplDongCn"   : this.culplDongCn.split(",").join(""), //재배지동수
                        "culplArea"     : this.culplArea.split(",").join(""),   //재배지면적
                        "culplAreaUntC" : this.culplAreaUntC,                   //재배지면적단위코드(1:평,2::m2)
                        "memoCntn"      : this.memoCntn,
                        "provC"         : this.selProvC,
                        "ccwC"          : this.selCcwC,
                        "ttvC"          : this.selTtvC,
                        "culplRgnC"     : this.selCulplRgnC,                   //재배지지역코드
                        "trDsc"         : (this.callType ==="MODIFY")?"2":"1"  //거래구분코드(1:저장,2:수정,3:삭제)
					}
                }

                apiService.call(config).then(response => {

                    console.log(" ~~~~ [SZST2105]fn_saveInfo(2))) ~~~~ ")
                    console.log(" ~~~~ [SZST2105]response.rspC=>>"+response.rspC)

                    if(response.rspC == "0000") {

                        console.log(" ~~~~ [SZST2105]fn_saveInfo(2-1)) ~~~~ ")

                        modalService.alert("저장되었습니다.").then(() => {

                        console.log(" ~~~~ [SZST2105]fn_saveInfo(3))) ~~~~ ")

                            //영농일지 등록화면 위한 리턴 파라미터
                            let returnObj = {
                                "flag"      : "DONE",
                                "culplRgnC" : this.selCulplRgnC,    //지역코드
                                "provnm"    : this.selProvnm,       //시도명
                                "ccwnm"     : this.selCcwnm,        //시군구명
                                "ttvnm"     : this.selTtvnm,        //읍면동명
                            }

                        console.log(" ~~~~ [SZST2105]fn_saveInfo(4))) ~~~~ ")

                            // 닫기
                            this.close(returnObj)
                        });
                    } else {
                        modalService.alert("자료 저장(수정)시, 오류가 발생하였습니다.")
                    }
				})

                console.log(">>> [SZST2105]저장(fn_saveInfo)(End))) <<<")

            }, 

            //**************
            // [삭제]버튼
            //***************/
            fn_delInfo() {
                /// 작목/재배지 삭제
				const config = {
                    url: '/sz/st/05s01',
                    data: {
                        "mydtCusno"     : this.getUserInfo("mydtCusno"),
                        "naWrsLclc"     : this.objA_naWrsLclc,
                        "naWrsMclc"     : this.objA_naWrsMclc,
                        "naWrsSclc"     : this.objA_naWrsSclc,
                        "culplDongCn"   : this.culplDongCn.split(",").join(""),
                        "culplArea"     : this.culplArea.split(",").join(""),
                        "culplAreaUntC" : this.culplAreaUntC,
                        "memoCntn"      : this.memoCntn,
                        "provC"         : this.selProvC,
                        "ccwC"          : this.selCcwC,
                        "ttvC"          : this.selTtvC,
                        "culplRgnC"     : this.selCulplRgnC,
                        "trDsc"         : "3"   //삭제

					}
                }
                apiService.call(config).then(response => {
                    if(response.rspC == "0000") {
                        modalService.alert("삭제되었습니다.").then(() => {
                            let returnObj = {
                                "flag"      : "DONE",
                            }
                            // 닫기
                            this.close(returnObj)
                        });
                    }
				})
            },

            //금액 단위 , 표시
            addComma(str) {
                switch(str) {

                case "culplArea" :   //작업면적
                    if(this.culplArea.length == 1 && this.culplArea == 0) {
                        this.culplArea = this.culplArea.slice(0, -1)
                    } else {
                        this.culplArea = this.culplArea.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.culplArea = this.culplArea.split(",").join("")
                        this.culplArea = keyupNumFormat(this.culplArea)
                    }
					break					

                case "culplDongCn" :   //동개수
                    if(this.culplDongCn.length == 1 && this.culplDongCn == 0) {
                        this.culplDongCn = this.culplDongCn.slice(0, -1)
                    } else {
                        this.culplDongCn = this.culplDongCn.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.culplDongCn = this.culplDongCn.split(",").join("")
                        this.culplDongCn = keyupNumFormat(this.culplDongCn)
                    }

                    break 
                }
            },

            fn_checkWord(event, maxByte, str) {

                if (str === "memoCntn") {  //메모	
                    let rtnObj = checkWord(event.target.value, maxByte)

                    if(rtnObj.flag) {this.$refs.memoCntn.blur()}   // 알럿 중복 방지
                    event.target.value = rtnObj.value
                    this.memoCntn = event.target.value
                }
            },   

            // input 클릭 시 focus on/off
           fn_focusOnOff(str1, str2) {

                if (str1 === 'Y') {
                    if (str2 === 'culplDongCn') {
                        this.focusTf  = true
                    } else if (str2 === 'culplArea') {
                       this.focusTf1  = '1'
                       this.culplAreaUntCNm = "평"
                    }
                } else if (str1 === 'N') {
                    if (str2 === 'culplDongCn') {
                       this.focusTf  = false
                    } else if (str2 === 'culplArea') {
                        this.focusTf1  = '2'
                       this.culplAreaUntCNm = "㎡"
                    }
                }	
            },          

        },

    }
</script>