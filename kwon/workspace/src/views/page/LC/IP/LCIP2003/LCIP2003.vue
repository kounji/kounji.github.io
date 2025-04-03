<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 전월비교
* @ 파일명     : src\views\page\LC\IP\LCIP2003\LCIP2003.vue
* @ 작성자     : CS533045
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533045              최초작성
*************************************************************************/
-->
<template>
    <div id="tab_02" role="tabpanel" class="cmm-tab-panel on">
        <div class="com_inner">
            <strong class="titH1">지난달 보다 <em>{{bmmCmprXpsCtgrNm}}</em> 에서<br>지출이 가장 많이 늘었어요</strong>
            <br><br><br>
            <!-- 차트영역 -->
            <!-- <div id="chartHolder" class="monComp" role="img" :aria-label="getAriaLabelText"></div> -->
            <div id="chartHolder" class="monComp"></div><!-- 1004 접근성 반영 -->
            <!--// 차트영역 -->
        </div>
        <hr class="hr02">
        <div class="com_inner">
            <ul class="expenListBox LRdivType">
                <li class="expenList" v-for="(item, idx) in ctgrList" :key="'list_' + idx">                    
                    <span class="expIcon" :class="item.xpsCtgrC"></span>
                    <div class="left">
                        <strong class="expName">{{item.xpsCtgrNm}}</strong>
                        <span class="expTarget">{{item.xpsRto}}%</span>
                    </div>
                    <div class="right">
                        <em class="expAmt">{{item.xpsAm | numberFilter}}원</em>                        
                        <span :class="`amount ${item.bmmCmprXpsAm >= 0 ? 'up' : 'down'}`">{{Math.abs(item.bmmCmprXpsAm) | numberFilter}}원</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// import '@/assets/js/rMateChartH5/JS/rMateFunction.js'
// import '@/assets_v30/js/rMateChartH5/JS/rMateFunction.js'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import {dateFormat} from '@/utils/date'

export default {
    name : "LCIP2003",
    data: () => {
        return {
            cusNb: '',              // 마이데이터고객번호
            basYm: '',				// 기준년월
            basMm: '',              // 조회 기준월   MM

            bmmCmprXpsCtgrNm: "",          // 최고증가 카테고리
            ctgrTop5List : [], 	    // 카테고리지출목록
            ctgrTop5ListView : [],	// 카테고리지출목록(상위5개+이외) - 파이차트
            ctgrList : [], 	        // 카테고리상세지출목록
        }
    },
    computed : {
    },
    created() {
        this.cusNb = this.getUserInfo("mydtCusno")
        this.basDt = dateFormat(new Date(), "YYYYMMDD")
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.basYm = this.params.pBasYm
            this.basMm = dateFormat(this.basYm, "M")

            this.getData();
        },
        getData() {
            const config = {
                url: '/lc/ip/03r02', 
                data: {
                    "mydtCusno": this.cusNb,
                    "basDt": '20241231' //this.basDt
                }
            }			
            apiService.call(config).then(response =>{
                console.log('response', JSON.parse(JSON.stringify(response)))

                this.bmmCmprXpsCtgrNm = response.bmmCmprXpsCtgrNm
                this.ctgrTop5List = response.ctgrTop5List || []

                let ctgrListLen = response.ctgrList.length || 0
                this.ctgrList = []
                for(let i=0 ; i < ctgrListLen; i++){
                    if(response.ctgrList[i].xpsAm != 0 || response.ctgrList[i].bmmCmprXpsAm != 0){
                        this.ctgrList.push({ 
                            "xpsCtgrC"      : response.ctgrList[i].xpsCtgrC,
                            "xpsCtgrNm"     : response.ctgrList[i].xpsCtgrNm,
                            "xpsAm"         : response.ctgrList[i].xpsAm,
                            "bmmCmprXpsAm"  : response.ctgrList[i].bmmCmprXpsAm,
                            "xpsRto"        : response.ctgrList[i].xpsRto
                        })
                    }                    
                }
                this.ctgrTop5ListView = []

                for (let i = 0; i < this.ctgrTop5List.length; i++) {
                    this.ctgrTop5ListView.push({ 
                        "name": this.ctgrTop5List[i].xpsCtgrNm,
                        "prev": this.ctgrTop5List[i].bmmXpsRto,
                        "next": this.ctgrTop5List[i].xpsRto
                    })
                }

                this.$nextTick(()=>{
                    this.makeChart()
                })
            })
        },
        // getAriaLabelText() {
        //     let list = this.ctgrTop5List
        //     if (list.length == 0) return ''

        //     let ariaLabelText1 = '카테고리별 지출 - '

        //     for (let i = 0; i < list.length; i++) {
        //         if (i > 0) ariaLabelText1 += ', '

        //         ariaLabelText1 += list[i].xpsCtgrNm + ' '
        //         ariaLabelText1 += '지난달 ' + this.numberFormat(Math.floor(list[i].bmmXpsAm - list[i].bmmCmprXpsAm / 10000 * 10) / 10) + '만원 / '
        //         ariaLabelText1 += '이번달 ' + this.numberFormat(Math.floor(list[i].bmmXpsAm / 10000 * 10) / 10) + '만원'
        //     }

        //     ariaLabelText1 += ' 입니다.'

        //     return ariaLabelText1
        // },
        makeChart() {
            // -----------------------차트 설정 시작-----------------------
		
            // rMateChart 를 생성합니다.
            // 파라메터 (순서대로)
            //  1. 차트의 id ( 임의로 지정하십시오. )
            //  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
            //  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
            //  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
            //  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
            rMateChartH5.create("chart1", "chartHolder", "useContextMenu=false", "100%", "170rem");//useContextMenu=false 차트메뉴 숨김

            let maxNum = this.ctgrTop5ListView.reduce((acc,cur) => {
                let curNum = cur.next > cur.prev ? cur.next : cur.prev
                return acc > curNum ? acc : curNum
            }, 0)
            let maxLine = maxNum
            let avgLine = maxNum / 2
            
            // 스트링 형식으로 레이아웃 정의.
            var layoutStr =
                '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
                    +'<Stroke id="stroke" color="#cbcdd6" weight="1"/>'
                    +'<Options>'
                        //+'<Caption text="GDP Growth of the BRICS Countries"/>'
                        +'<Legend defaultMouseOverAction="false" />'
                    +'</Options>'
                    /* displayCompleteCallFunction="removeTabindex" */
                    +'<Column2DChart gutterLeft="0" showDataTips="true" columnWidthRatio=".6" selectionMode="single" dataTipJsFunction="rMateFunction.lcip2003TipTxt" displayCompleteCallFunction="rMateFunction.removeTabindex">'
                        +'<horizontalAxis>'
                            +'<CategoryAxis categoryField="name"/>'
                        +'</horizontalAxis>'
                        +'<verticalAxis>'
                            +'<LinearAxis maximum="' + maxNum + '"/>'
                        +'</verticalAxis>'
                        +'<series>'
                            /*그래프 둥글게 옵션 SemiCircleColumnItemRenderer */
                            +'<Column2DSeries labelPosition="outside" yField="prev" displayName="지난달" itemRenderer="SemiCircleColumnItemRenderer" showValueLabels="[]">'
                                +'<showDataEffect>'
                                    +'<SeriesInterpolate/>'
                                +'</showDataEffect>'
                                +'<fills>'
                                    /*컬러 변경*/
                                    +'<SolidColor color="#eee"/>'
                                +'</fills>'
                            +'</Column2DSeries>'
                            +'<Column2DSeries labelPosition="outside" yField="next" displayName="이번달" itemRenderer="SemiCircleColumnItemRenderer" showValueLabels="[]">'
                                +'<showDataEffect>'
                                    +'<SeriesInterpolate/>'
                                +'</showDataEffect>'
                                +'<fills>'
                                    +'<SolidColor color="#19b9be"/>'
                                +'</fills>'
                            +'</Column2DSeries>'
                        +'</series>'
                        +'<backgroundElements>'
                            //+'<GridLines/>'
                            +'<AxisMarker>'
                                +'<lines>'
                                    +'<AxisLine value="0" label="" labelAlign="left" stroke="{stroke}"/>'
                                    +'<AxisLine value="' + avgLine + '" lineStyle="dashLine">'
                                        +'<stroke>'
                                            +'<Stroke color="#ced0d9" weight="1"/>'
                                        +'</stroke>'
                                    +'</AxisLine>'
                                    +'<AxisLine value="' + maxLine + '" lineStyle="dashLine">'
                                        +'<stroke>'
                                            +'<Stroke color="#ced0d9" weight="1"/>'
                                        +'</stroke>'
                                    +'</AxisLine>'
                                +'</lines> '
                            +'</AxisMarker>'
                        +'</backgroundElements>'
                        +'<horizontalAxis>'
                            +'<CategoryLinearAxis id="hAxis" padding="0.5" categoryField="name"/>'
                        +'</horizontalAxis>'
                        +'<horizontalAxisRenderers>'
                            +'<Axis2DRenderer axis="{hAxis}" styleName="axisLabel"/>'
                        +'</horizontalAxisRenderers>'
                    +'</Column2DChart>'
                    +'<Style>'
                        +'.axisLabel{fontSize:1.2rem;color:#333333;}'
                    +'</Style>'
                +'</rMateChart>';
            
            // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
            //
            // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
            // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
            // 
            // 아래 내용은 
            // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
            // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
            rMateChartH5.calls("chart1", {
                "setLayout" : layoutStr,
                "setData" : this.ctgrTop5ListView
            });
           
            /**
             * rMateChartH5 3.0이후 버전에서 제공하고 있는 테마기능을 사용하시려면 아래 내용을 설정하여 주십시오.
             * 테마 기능을 사용하지 않으시려면 아래 내용은 삭제 혹은 주석처리 하셔도 됩니다.
             *
             * -- rMateChartH5.themes에 등록되어있는 테마 목록 --
             * - simple
             * - cyber
             * - modern
             * - lovely
             * - pastel
             * -------------------------------------------------
             *
             * rMateChartH5.themes 변수는 theme.js에서 정의하고 있습니다.
             */
            rMateChartH5.registerTheme(rMateChartH5.themes);
            
            
            // -----------------------차트 설정 끝 -----------------------
        },
        //1000단위마다 금액 쉼표처리
        numberFormat(number){
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        getRtoTxt(rto) {
            if(rto == 0) {
                return rto + "%"
            }else if(rto > 0) {
                return "+" + rto + "%"
            }else{
                return "-" + rto + "%"
            }
        },
        getCmprClass(cmpr) {
            if(cmpr > 0) {
                return "up"
            }else if(cmpr < 0) {
                return "down"
            }else{
                return ""
            }
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>