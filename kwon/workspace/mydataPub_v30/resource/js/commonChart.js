var chartVars = "rMateOnLoadCallFunction=chartReadyHandler1";

/* 2022-10-27 : commonChart.js 에서 메인 페이지로 이동 */
// 도너츠형 차트
// function chartReadyHandler1(id) {
//     document.getElementById(id).setLayout(layoutDoughnut);
//     document.getElementById(id).setData(doughnutData);
// }
/*// 2022-10-27 : commonChart.js 에서 메인 페이지로 이동 */

// 도너츠형 차트 2
function chartReadyHandler01(id) {
    document.getElementById(id).setLayout(layoutDoughnut2);
    document.getElementById(id).setData(doughnutData2);
}

// 테스트형 차트 2
function test(id) {
    document.getElementById(id).setLayout(test);
    document.getElementById(id).setData(test);
}

// 선형 차트
function chartReadyHandler2(id) {
    document.getElementById(id).setLayout(layoutLineSegment);
    document.getElementById(id).setData(lineSegmentData);
}

// 세로 막대형 차트
function chartReadyHandler3(id) {
    document.getElementById(id).setLayout(layoutColumn);
    document.getElementById(id).setData(columnData);
}

// 왼쪽 바형 차트
function chartReadyHandler4(id) {
    document.getElementById(id).setLayout(layoutLeftColumn);
    document.getElementById(id).setData(leftColumnData);
}

// 스트링 형식으로 레이아웃 정의.




// 도너츠형 차트
var layoutDoughnut2 =
    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
        +'<Options>'
            +'<Caption text="Annual Report"/>'
            +'<Legend useVisibleCheck="true"/>'
        +'</Options>'
        +'<Pie2DChart innerRadius="0.7" showDataTips="true" selectionMode="single">'
    /*
    Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
    showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
    innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
    */
            +'<series>'
                +'<Pie2DSeries nameField="Month" field="Profit" startAngle="20" renderDirection="clockwise" labelPosition="inside" color="#ffffff">'
                    +'<fills>'
                        +'<SolidColor color="#20cbc2"/>'
                        +'<SolidColor color="#074d81"/>'
                        +'<SolidColor color="#40b2e6"/>'
                    +'</fills>'
                /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
                    +'<showDataEffect>'
                    /* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                        +'<SeriesZoom duration="1000"/>'
                        +'<SeriesInterpolate duration="1200" elementOffset="60" easingFunction="EaseOutElastic"/>'
    /*
    SeriesZoom 효과는 시리즈 데이터가 데이터로 표시될 때 특정 지점에서 점점 확대되어지며 나타나는 효과를 적용합니다
    - 공통속성 -
    elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
    minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
                이 값보다 짧은 시간에 effect가 실행되지 않습니다
    offset : effect개시의 지연시간을 설정합니다 default:0
    perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
    - SeriesZoom속성 -
    relativeTo : 이펙트의 기준을 어디로 잡을지에 대한 속성입니다. 유효값 : chart, series
    horizontalFocus : relativeTo를 기준으로 수평선 방향의 기준을 정합니다. 유효값 : left, center, right
    verticalFocus : relativeTo를 기준으로 수직선 방향의 기준을 정합니다. 유효값 : top, middle, bottom
    */
                    +'</showDataEffect>'
                +'</Pie2DSeries>'
            +'</series>'
            +'<backgroundElements>'
                +'<CanvasElement>'
                    +'<CanvasLabel text="2019" height="24" horizontalCenter="0" verticalCenter="-10" fontSize="19" color="#333333" backgroundAlpha="0"/>'
                    +'<CanvasLabel text="Annual Report" height="24" horizontalCenter="0" verticalCenter="10" fontSize="14" color="#666666" backgroundAlpha="0"/>'
                +'</CanvasElement>'
            +'</backgroundElements>'
        +'</Pie2DChart>'
    +'</rMateChart>';

// 테스트형 차트2
var layoutTest =
    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
        +'<Options>'
            +'<Caption text="World Top 10 - Fastest Growing Economies (2017)" />'
            +'<SubCaption text="GDP Growth (In %)" textAlign="center" />'
        +'</Options>'
        +'<SeriesInterpolate id="ss"/>'
        +'<Column2DChart showDataTips="true" selectionMode="multiple" columnWidthRatio="0.48">'
            +'<horizontalAxis>'
                +'<CategoryAxis categoryField="Country"/>'
            +'</horizontalAxis>'
            +'<verticalAxis>'
                +'<LinearAxis maximum="100" interval="10"/>'
            +'</verticalAxis>'
            +'<series>'
                +'<Column2DSeries labelPosition="outside" yField="GDP" displayName="GDP Growth (In %)" showDataEffect="{ss}" showValueLabels="[4]">'
                    +'<fills>'
                        +'<LinearGradient angle="45">'
                            +'<entries>'
                                +'<GradientEntry color="red" ratio="0.5"/>'
                                +'<GradientEntry color="blue" ratio="0.2"/>'
                                +'<GradientEntry color="yellow" ratio="0.8"/>'
                                +'<GradientEntry color="green" ratio="1"/>'
                            +'</entries>'
                        +'</LinearGradient>'
                        +'<LinearGradient angle="90">'
                            +'<entries>'
                                +'<GradientEntry color="#000" ratio="0"/>'
                                +'<GradientEntry color="#ee7f8f" ratio="0.2"/>'
                                +'<GradientEntry color="#f69890" ratio="0.8"/>'
                                +'<GradientEntry color="#ffb88e" ratio="1"/>'
                            +'</entries>'
                        +'</LinearGradient>'
                    +'</fills>'
                +'</Column2DSeries>'
            +'</series>'
        +'</Column2DChart>'
    +'</rMateChart>';


// 선형 차트
var layoutLineSegment =
    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
        +'<Options>'
            +'<Caption text="Annual Report"/>'
            +'<Legend useVisibleCheck="true"/>'
        +'</Options>'
        +'<NumberFormatter id="numFmt" useThousandsSeparator="true"/>'
        +'<Line2DChart id="chart" showDataTips="true">'
            +'<horizontalAxis>'
                +'<CategoryAxis id="hAxis" categoryField="Month"/>'
            +'</horizontalAxis>'
            +'<verticalAxis>'
                +'<LinearAxis id="vAxis" formatter="{numFmt}" />'
            +'</verticalAxis>'
            +'<series>'
                +'<Line2DSeries yField="Profit" displayName="Profit">'
                    +'<showDataEffect>'
                        +'<SeriesSlide direction="up" duration="1000"/>'
                    +'</showDataEffect>'
                +'</Line2DSeries>'
                +'<Line2DSeries yField="Cost" displayName="Cost">'
                    +'<showDataEffect>'
                        +'<SeriesSlide direction="up" duration="1000"/>'
                    +'</showDataEffect>'
                +'</Line2DSeries>'
            +'</series>'
            +'<horizontalAxisRenderers>'
                +'<Axis2DRenderer axis="{hAxis}" showLine="true"/>'
            +'</horizontalAxisRenderers>'
            +'<verticalAxisRenderers>'
                +'<Axis2DRenderer axis="{vAxis}" showLine="true"/>'
            +'</verticalAxisRenderers>'
            +'<backgroundElements>'
                +'<GridLines direction="none" showBorderStroke="false"/>'
            +'</backgroundElements>'
        +'</Line2DChart>'
    +'</rMateChart>';


// 세로 막대형 차트
var layoutColumn =
    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
        +'<Options>'
            +'<Caption text="World Top 10 - Fastest Growing Economies (2017)" />'
            +'<SubCaption text="GDP Growth (In %)" textAlign="center" />'
        +'</Options>'
        +'<SeriesInterpolate id="ss" duration="1200" elementOffset="60" easingFunction="EaseOutElastic"/>'
        +'<Column2DChart showDataTips="true" selectionMode="multiple" columnWidthRatio="0.48">'
            +'<horizontalAxis>'
                +'<CategoryAxis categoryField="Country"/>'
            +'</horizontalAxis>'
            +'<verticalAxis>'
                +'<LinearAxis maximum="100" interval="10"/>'
            +'</verticalAxis>'
            +'<series>'
                +'<Column2DSeries labelPosition="outside" yField="GDP" displayName="GDP Growth (In %)" showDataEffect="{ss}" showValueLabels="[4]" strokeJsFunction="strokeFunction"/>'
            +'</series>'
        +'</Column2DChart>'
    +'</rMateChart>';

// 왼쪽 바형 차트
var layoutLeftColumn =
'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
    +'<Options>'
        +'<Caption text="Sales by Month"/>'
        +'<SubCaption text="( $M )" textAlign="right" />'
        +'<Legend defaultMouseOverAction="false" useVisibleCheck="true" markerWidth="12" markerHeight="12" />'
    +'</Options>'
    +'<CurrencyFormatter id="nft" precision="1" rounding="nearest" currencySymbol="%" alignSymbol="right"/>'
    +'<Bar2DChart showDataTips="true">'
        +'<verticalAxis>'
            +'<CategoryAxis categoryField="Month"/>'
        +'</verticalAxis>'
        +'<horizontalAxis>'
            +'<LinearAxis labelJsFunction="labelFunc"/>'
        +'</horizontalAxis>'
        +'<series>'
            /*
            type 속성을 stacked로 변경
            type속성으로는
            clustered : 일반적인 다중데이터(차트의 멀티시리즈)방식으로 데이터를 표현합니다.(Default)
            stacked : 데이터를 위에 쌓아 올린 방식으로 표현 합니다.
            overlaid : 수치 데이터 값을 겹쳐서 표현 합니다. 주로 목표 위치와 현재 위치를 나타낼 때 많이 쓰입니다.
            100% : 차트의 수치 데이터를 퍼센티지로 계산 후 값을 퍼센티지로 나타냅니다.
            */
            +'<Bar2DSet type="100%">'
                +'<series>'
                    /* Bar2D Stacked 를 생성시에는 Bar2DSeries를 최소 2개 정의합니다 */
                    +'<Bar2DSeries labelPosition="inside" showValueLabels="[6]" xField="tablet" displayName="Tablet" formatter="{nft}" color="#ffffff">'
                        +'<showDataEffect>'
                            +'<SeriesInterpolate/>'
                        +'</showDataEffect>'
                    +'</Bar2DSeries>'
                    +'<Bar2DSeries labelPosition="inside" showValueLabels="[6]" xField="phone" displayName="Cell Phone" formatter="{nft}" color="#ffffff">'
                        +'<showDataEffect>'
                            +'<SeriesInterpolate/>'
                        +'</showDataEffect>'
                    +'</Bar2DSeries>'
                +'</series>'
            +'</Bar2DSet>'
        +'</series>'
    +'</Bar2DChart>'
+'</rMateChart>';
    
    // 왼쪽 바형 차트
    // function labelFunc(id,value){
    //     return value+"%";
    // }

    /* 2022-10-27 : 삭제 */
    // checkData(layoutDoughnut); // 데이터가 존재하는지 판별한다.
 
    // 데이터를 체크하여 length를 기준으로 데이터를 판별한다.
    // function checkData(data){
    // if(data.length <= 0) // 데이터가 없을 경우 hasNoData함수를 실행하여 메세지창을 출력한다.
    //     rMateChartH5.call("chart1", "hasNoData", true);
    //     // hasNoData(false); - 데이터가 존재하지 않으므로 차트의 기본 구조도 보이지 않아야 한다면 false로 주어 차트 전체의 visible을 false로 설정합니다.
    //     // hasNoData(true);  - 데이터가 존재하지 않아도 차트의 기본 구조는 보여야 한다면 true로 주어 visible을 true로 설정합니다.
    // }

    // $(document).ready(function() {
    //     $('#ID_Doughnut').load(function() {
    //         $('.rMateH5__DataTip').addClass('show');
    //     });
    // });
    /*// 2022-10-27 : 삭제 */
