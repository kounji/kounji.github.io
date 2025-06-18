<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 자산진단
* @ 페이지설명 : 자산 > 자산진단 > 또래 자산 비교
* @ 파일명     : src\views\page\AS\IP\ASIP2009\ASIP2009.vue
* @ 작성자     : CS533437
* @ 작성일     : 2023-09-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________

* 2022-10-24              CS529599              최초작성
*************************************************************************/
-->
<template>
    <div>      

        <!-- full popup S -->
        <div class="full_popup renewal mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
		<div class="popup_header">
			<h1>또래 부자들의 금융생활</h1>
			<!-- <a href="#nolink" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
            <div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
                <div class="com_inner">
                    <div class="custom_box_chart peer">
                        <div class="text">
                            <div class="titH1">
                                나는 {{my_Best_Aset}} 자산이 많고<br>
                                또래는 {{peer_Best_Aset}} 자산이 많아요
                            </div>
                            
                            <p>#{{peerAge}} #{{peerJob}}</p>
                        </div>

                        <!-- 차트 -->
                        <div class="compare_chart_wrap"><!-- 1004 접근성 반영 -->
                            <div class="chart">
                                <div class="bg"></div>
                                <div class="bar_wrap">
                                    <div class="bars bar_saving">                                    
                                        <template v-if="peerRnkNm === 'DPIS'">
                                            <div class="bar bar01" :style="{height:peerAsetDpidpWgt+'%'}">
                                                <div class="chart_tooltip_wrap">
                                                    <span class="chart_tooltip"><em class="num">{{peerAsetDpidpWgt}}</em>%</span>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="bar bar01" :style="{height:peerAsetDpidpWgt+'%'}"></div>
                                        </template>
                                        <template v-if="myRnkNm === 'DPIS'">
                                            <div class="bar bar02" :style="{height:myAsetDpidpWgt+'%'}">
                                                <div class="chart_tooltip_wrap">
                                                    <span class="chart_tooltip"><em class="num">{{myAsetDpidpWgt}}</em>%</span>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="bar bar02" :style="{height:myAsetDpidpWgt+'%'}"></div>
                                        </template>
                                        <div class="title">예적금</div>
                                    </div>

                                    <div class="bars bar_investment">                                    
                                        <template v-if="peerRnkNm === 'IV'">
                                            <div class="bar bar01" :style="{height:peerAsetIvWgt+'%'}">
                                                <div class="chart_tooltip_wrap">
                                                    <span class="chart_tooltip"><em class="num">{{peerAsetIvWgt}}</em>%</span>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="bar bar01" :style="{height:peerAsetIvWgt+'%'}"></div>
                                        </template>
                                        <template v-if="myRnkNm === 'IV'">
                                            <div class="bar bar02" :style="{height:myAsetIvWgt+'%'}">
                                                <div class="chart_tooltip_wrap">
                                                    <span class="chart_tooltip"><em class="num">{{myAsetIvWgt}}</em>%</span>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="bar bar02" :style="{height:myAsetIvWgt+'%'}"></div>
                                        </template>
                                        <div class="title">투자</div>
                                    </div>

                                    <div class="bars bar_pension">                                    
                                        <template v-if="peerRnkNm === 'PNS'">
                                            <div class="bar bar01" :style="{height:peerAsetPnsWgt+'%'}">
                                                <div class="chart_tooltip_wrap">
                                                    <span class="chart_tooltip"><em class="num">{{peerAsetPnsWgt}}</em>%</span>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="bar bar01" :style="{height:peerAsetPnsWgt+'%'}"></div>
                                        </template>
                                        <template v-if="myRnkNm === 'PNS'">
                                            <div class="bar bar02" :style="{height:myAsetPnsWgt+'%'}">
                                                <div class="chart_tooltip_wrap">
                                                    <span class="chart_tooltip"><em class="num">{{myAsetPnsWgt}}</em>%</span>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="bar bar02" :style="{height:myAsetPnsWgt+'%'}"></div>
                                        </template>
                                        <div class="title">연금</div>
                                    </div>

                                    <div class="bars bar_deposit">                                    
                                        <template v-if="peerRnkNm === 'DPZ'">
                                            <div class="bar bar01" :style="{height:peerAsetDpzWgt+'%'}">
                                                <div class="chart_tooltip_wrap">
                                                    <span class="chart_tooltip"><em class="num">{{peerAsetDpzWgt}}</em>%</span>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="bar bar01" :style="{height:peerAsetDpzWgt+'%'}"></div>
                                        </template>
                                        <template v-if="myRnkNm === 'DPZ'">
                                            <div class="bar bar02" :style="{height:myAsetDpzWgt+'%'}">
                                                <div class="chart_tooltip_wrap">
                                                    <span class="chart_tooltip"><em class="num">{{myAsetDpzWgt}}</em>%</span>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="bar bar02" :style="{height:myAsetDpzWgt+'%'}"></div>
                                        </template>
                                        <div class="title">입출금</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="legend_item">
                            <span class="peer">또래</span>
                            <span class="me">나</span>
                        </div>
                        
                        <!--// 차트 -->
                    </div> 
                </div>

                <hr class="hr02">

                <div class="com_inner">
                    <strong class="titH3">또래 부자들이 가입한 상품</strong>

                    <div class="com_tabmenu_type03 switchType btn3 mt30">
                        <ul role="tablist">
                            <li class="on" role="presentation" aria-controls="tab_01"><a href="javascript:void(0);" role="tab" @click="checkTab('tab_01')"><span>예적금</span></a></li>
                            <li role="presentation" aria-controls="tab_02"><a href="javascript:void(0);" role="tab" @click="checkTab('tab_02')"><span>대출</span></a></li>
                            <li role="presentation" aria-controls="tab_03"><a href="javascript:void(0);" role="tab" @click="checkTab('tab_03')"><span>투자</span></a></li>
                        </ul>
                    </div>

                    <div id="tab_01" role="tabpanel" class="cmm-tab-panel on">                        
                        <ul class="list_product" v-if="peerList.length > 0">
                           <li v-for="(item1, index1) in peerList" :key="index1">
                                <!-- <ul :key="index1"> -->
                                    <i class="ico_bank" :class="item1.orgC">
                                        <span class="blind">{{item1.orgnm}}</span>
                                    </i>
                                    <strong class="unit">{{item1.fncWrsnm}}</strong>
                                <!-- </ul>					 -->
                                
                            </li>
                        </ul>

                    </div>

                    <div id="tab_02" role="tabpanel" class="cmm-tab-panel">                        
                        <ul class="list_product" v-if="peerList2.length > 0">
                           <li v-for="(item1, index1) in peerList2" :key="index1">
                                <!-- <ul :key="index1"> -->
                                    <i class="ico_bank" :class="item1.orgC">
                                        <span class="blind">{{item1.orgnm}}</span>
                                    </i>
                                    <strong class="unit">{{item1.fncWrsnm}}</strong>
                                <!-- </ul>					 -->
                                
                            </li>
                        </ul>

                    </div>

                    <div id="tab_03" role="tabpanel" class="cmm-tab-panel">                        
                        <ul class="list_product" v-if="iv_peerProductNHList.length > 0">
                           <li v-for="(item1, index1) in iv_peerProductNHList" :key="index1">
                                <!-- <ul :key="index1"> -->
                                    <i class="ico_bank" :class="item1.orgC">
                                        <span class="blind">{{item1.orgnm}}</span>
                                    </i>
                                    <strong class="unit">{{item1.fncWrsnm}}</strong>
                                <!-- </ul>					 -->
                                
                            </li>
                        </ul>

                    </div>

                    <hr>

                    <p class="exclude_switch">농축협 상품 제외
                        <span class="cmm-switch sm">
                            <input type="checkbox" id="check01" name="check01" role="switch" v-model="check01" @change="updateList">
                            <label for="check01"><em class="blind">금융자산 합계반영</em></label>
                        </span>
                    </p>

                </div>
                
            </div>		
            <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>	         
        </div>
    </div>
</template>

<script>

/*eslint-disable */ 
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import ASIP2009 from '@/views/page/AS/IP/ASIP2009/ASIP2009'
import {dateFormat} from '@/utils/date'

export default {
    name : "ASIP2009",
    data: () => {
        return {
            pPeerNo: '',            // 선택된 또래번호
            basYmd : '',

            peerAge: "",
            peerJob: "",
            myAsetDpidpWgt: 0,
            myAsetDpzWgt: 0,
            myAsetIvWgt: 0,
            myAsetPnsWgt: 0,            
            peerAsetDpidpWgt: 0,
            peerAsetDpzWgt: 0,
            peerAsetIvWgt: 0,
            peerAsetPnsWgt: 0,

            my_Saving_Best : "N",       
            my_Investment_Best : "Y",
            my_Pension_Best : "N",
            my_Deposit_Best : "N",

            peer_Saving_Best : "N",            
            peer_Investment_Best : "N",
            peer_Pension_Best : "Y",
            peer_Deposit_Best : "N",

            my_Best_Aset : "입출금",
            peer_Best_Aset : "입출금",

            myRnkNm        : "",      // 나의 탑 랭크
            peerRnkNm      : "",      // 또래 탑 랭크

           ///////////////////////
            
            peerAttr        : '',   // 또래속성
            
            peerNo          : '',
                        
            cusNb           : '',   // 마이데이터고객번호
            cusnm           : '',
            basYm           : null, // 조회 기준년월 YYYYMM

            peerList            : [],
            peerList2            : [],

            peerProductNHList   : [],    // 또래가 많이 가입한 상품(농협 포함)            
            dp_peerProductNHList: [],   // 예금
            ln_peerProductNHList: [],   // 대출
            iv_peerProductNHList: [],   // 투자            

            dp_peerProductList: [],   // 예금
            ln_peerProductList: [],   // 대출
            iv_peerProductList: [],   // 투자        
           
            valMinNm            : "",

            testValMinNm        : "A1AAHJ0000",

            check01             : "",



        }
    },
    computed : {
    },
    created() {

        this.cusNb = this.getUserInfo("mydtCusno")
        this.cusnm = this.getUserInfo("cusnm")
        // this.peerNo = this.params.peerNo                                // 선택된 또래번호
        // this.basYm  = this.params.basYm                                 // 선택된 년월

    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.basYmd = dateFormat(new Date(), "YYYYMMDD")
            this.getData();
            // this.peerProductList();
            this.type = "1"
        },
        
        checkTab(tab) {
            console.log(tab)    

            if(tab === "tab_01"){
                $(".exclude_switch").show();
            }                
            else if(tab === "tab_02"){
                $(".exclude_switch").show();
            }
            else{
                $(".exclude_switch").hide();
            }

           
        },

        getData() {
           
            if(this.peerNo.length == 6){
                this.peerAttr = this.getCodeName('PEER_AG_STN_C', (this.peerNo).substr(0, 2)) + '^' + this.getCodeName('PEER_JOBGR_C', (this.peerNo).substr(2, 2))
            }

            this.fn_getMyPeerAsetRtoList();

        },         
        
        fn_getMyPeerAsetRtoList() {

            // 초기화
            // this.getDataInt();

            const config = {
                url: '/as/ip/09r01', // 인터페이스ID: IF-MOB-PFM-ASIP09R01, 서비스코드: PFMASIP09R01
                data: {
                    "mydtCusno" : this.cusNb,  
                    "basYmd"    : this.basYmd
                }
            }          

            apiService.call(config).then(response =>{

                console.log('======= response ======= ', response)
                

                this.peerAge = response.peerAge;
                this.peerJob = response.peerJob;
                this.myAsetDpidpWgt = response.myAsetDpidpWgt;
                this.myAsetDpzWgt = response.myAsetDpzWgt;
                this.myAsetIvWgt = response.myAsetIvWgt;
                this.myAsetPnsWgt = response.myAsetPnsWgt;         
                this.peerAsetDpidpWgt = response.peerAsetDpidpWgt;
                this.peerAsetDpzWgt = response.peerAsetDpzWgt;
                this.peerAsetIvWgt = response.peerAsetIvWgt;
                this.peerAsetPnsWgt = response.peerAsetPnsWgt;

                this.myRnkNm        = response.myRnkNm;
                this.peerRnkNm        = response.peerRnkNm;


                if(this.myRnkNm === "DPIS")
                { this.my_Best_Aset = "예적금"}
                else if(this.myRnkNm === "IV")
                { this.my_Best_Aset = "투자"}
                else if(this.myRnkNm === "PNS")
                { this.my_Best_Aset = "연금"}
                else
                { this.my_Best_Aset = "입출금"}


                if(this.peerRnkNm === "DPIS")
                { this.peer_Best_Aset = "예적금"}
                else if(this.peerRnkNm === "IV")
                { this.peer_Best_Aset = "투자"}
                else if(this.peerRnkNm === "PNS")
                { this.peer_Best_Aset = "연금"}
                else
                { this.peer_Best_Aset = "입출금"}
                

                // 또래가 많이 가입한 상품(농협 포함)
                this.peerProductNHList = response.peerProductNHList || []                

                // 또래가 많이 가입한 상품(농협 포함)
                let dp_yNhCnt = 0;
                let ln_yNhCnt = 0;
                let iv_yNhCnt = 0;

                // 또래가 많이 가입한 상품(농협 제외)
                let dp_yCnt = 0;
                let ln_yCnt = 0;
                let iv_yCnt = 0;

                //let cd_yNhCnt = 0;
                
                this.dp_peerProductNHList = []  // 초기화
                this.ln_peerProductNHList = []  // 초기화
                this.iv_peerProductNHList = []  // 초기화
                //this.cd_peerProductNHList = []  // 초기화                

                for(let i=0;i<this.peerProductNHList.length;i++){
                    // 예금
                    if(this.peerProductNHList[i].trWrsTpc == 'DPIS'){
                        if(dp_yNhCnt<4){
                            this.dp_peerProductNHList.push(this.peerProductNHList[i])
                            dp_yNhCnt++
                        }
                    }
                    // 대출
                    if(this.peerProductNHList[i].trWrsTpc == 'LN'){
                        if(ln_yNhCnt<4){
                            this.ln_peerProductNHList.push(this.peerProductNHList[i])
                            ln_yNhCnt++
                        }
                    }
                    // 투자
                    if(this.peerProductNHList[i].trWrsTpc == 'IV'){
                        if(iv_yNhCnt<4){
                            this.iv_peerProductNHList.push(this.peerProductNHList[i])
                            iv_yNhCnt++
                        }
                    }         

                    // 농협 제외
                    if(this.peerProductNHList[i].orgC != 'A4AAAZ0000')
                    {
                        // 예금
                        if(this.peerProductNHList[i].trWrsTpc == 'DPIS'){
                        if(dp_yCnt<4){
                            this.dp_peerProductList.push(this.peerProductNHList[i])
                            dp_yCnt++
                        }
                        }
                        // 대출
                        if(this.peerProductNHList[i].trWrsTpc == 'LN'){
                            if(ln_yCnt<4){
                                this.ln_peerProductList.push(this.peerProductNHList[i])
                                ln_yCnt++
                            }
                        }
                        // 투자
                        if(this.peerProductNHList[i].trWrsTpc == 'IV'){
                            if(iv_yCnt<4){
                                this.iv_peerProductList.push(this.peerProductNHList[i])
                                iv_yCnt++
                            }
                        }         
                    }
                }

                this.peerList = this.dp_peerProductNHList
                this.peerList2 = this.ln_peerProductNHList

                console.log("======= this.dp_peerProductNHList =======", this.dp_peerProductNHList)
                console.log("======= this.ln_peerProductNHList =======", this.ln_peerProductNHList)
                console.log("======= this.iv_peerProductNHList =======", this.iv_peerProductNHList)

                console.log("======= this.dp_peerProductList =======", this.dp_peerProductList)
                console.log("======= this.ln_peerProductList =======", this.ln_peerProductList)
                console.log("======= this.iv_peerProductList =======", this.iv_peerProductList)


                

                // // 또래가 많이 가입한 상품 (농협 제외)
                // let dp_nNhCnt = 0;
                // let ln_nNhCnt = 0;
                // let iv_nNhCnt = 0;
                // let cd_nNhCnt = 0;
                
                // this.dp_peerProductList = []  // 초기화
                // this.ln_peerProductList = []  // 초기화
                // this.iv_peerProductList = []  // 초기화
                // this.cd_peerProductList = []  // 초기화

                // for(let i=0;i<this.peerProductList.length;i++){
                //     // 예금
                //     if(this.peerProductList[i].trWrsTpc == 'DP'){
                //         if(dp_nNhCnt<=5){
                //             this.dp_peerProductList.push(this.peerProductList[i])
                //             dp_nNhCnt++;
                //         }
                //     }
                //     // 대출
                //     if(this.peerProductList[i].trWrsTpc == 'LN'){
                //         if(ln_nNhCnt<=5){
                //             this.ln_peerProductList.push(this.peerProductList[i])
                //             ln_nNhCnt++;
                //         }
                //     }
                //     // 투자
                //     if(this.peerProductList[i].trWrsTpc == 'IV'){
                //         if(iv_nNhCnt<=5){
                //             this.iv_peerProductList.push(this.peerProductList[i])
                //             iv_nNhCnt++;
                //         }
                //     }
                //     // 카드
                //     if(this.peerProductList[i].trWrsTpc == 'CD'){
                //         if(cd_nNhCnt<=5){
                //             this.cd_peerProductList.push(this.peerProductList[i])
                //             cd_nNhCnt++;
                //         }
                //     }
                // }

                // console.log("======= this.dp_peerProductList =======", this.dp_peerProductList)
                // console.log("======= this.ln_peerProductList =======", this.ln_peerProductList)
                // console.log("======= this.iv_peerProductList =======", this.iv_peerProductList)
                // console.log("======= this.cd_peerProductList =======", this.cd_peerProductList)

                roundTabWidth();

            })
        },

        // 농축협 상품 제외 버튼 처리
        fn_checkboxChange(obj){
            this.chkBoxFlag = obj.target.checked
            console.log("======= fn_checkboxChange =======", this.chkBoxFlag)
            // this.tab_buttonClick('tooltip01')
            // this.peerProductList();
        },
        // 링크 연결
		connectLink(pageId) {
            if(pageId == 'PDPD4001') {	// 맞춤상품추천
				const config = {
					name: pageId
				}
                commonService.movePage(config);
				this.closeAll();
            }else if(pageId == 'ANCA4201'){// NH콕마이카 화면 UI-AN-CA-1001 연결
                const config = {
					name: pageId
				}
                commonService.movePage(config);
                // modalService.openPopup(config).then(() => {
				// });
				this.closeAll();
            }
        },
        getCodeName(grpCd, cd) {
            let ret = ''
            let codeList = this.getCodeList(grpCd)
            for (let i = 0; i < codeList.length; i++) {
                if (cd == codeList[i].comnCVal) {
                    ret = codeList[i].comnCExpl
                    break
                }
            }
            return ret
        },
        updateList(){
            console.log("UPDATE="+this.check01)
            if(this.check01) {
                this.peerList = this.dp_peerProductList
                this.peerList2 = this.ln_peerProductList
            }else{
                this.peerList = this.dp_peerProductNHList
                this.peerList2 = this.ln_peerProductNHList
            }
        }

    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}

// 라운드탭 사이즈(가장큰 탭사이즈를 기준으로 각탭 및 전체 적용하기)
function roundTabWidth(){
	var arr = [],
			_tabList = $('.switchType li');
	_tabList.each(function(e){
		arr[e] = $(this).outerWidth();
	});
	_tabList.css('width',Math.max(...arr)); //탭 사이즈 적용
	_tabList.parent().parent().css('width',Math.max(...arr)*arr.length); //탭전체 사이즈 적용
	//console.log('값 = '+arr+', 갯수 = '+arr.length+', 최고값 = '+Math.max(...arr));
}



</script>