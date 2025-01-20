//rMateChart 사용자 정의 함수

var lazyLoadEventListener = null;
export const setLazyLoadEventListener = (vm, callbackFunc) => {
    if (callbackFunc == null) {
        lazyLoadEventListener = null;
        return;
    }
    lazyLoadEventListener = {callbackFunc: callbackFunc, vm: vm};
}  
  
var rMateFunction = {

    asip0002DataTipFunc: function(seriesId, seriesName, index, xName, yName, data, value) { // values
        if (seriesId == "AF")
        return "자산구간 : " + data["AF_Sclnm"] + "<br>" + "고객비율 : " + rMateFunction.asip0002InsertComma(data["AF_CusRto"]) + "%" + "<br>" + "고객수 : " + rMateFunction.asip0002InsertComma(data["AF_Cuscn"]) + "명";
        else if (seriesId == "EA")
        return "자산구간 : " + data["EA_Sclnm"] + "<br>" + "고객비율 : " + rMateFunction.asip0002InsertComma(data["EA_CusRto"]) + "%" +  "<br>" + "고객수 : " + rMateFunction.asip0002InsertComma(data["EA_Cuscn"]) + "명";
        else if (seriesId == "SA")
        return "자산구간 : " + data["SA_Sclnm"] + "<br>" + "고객비율 : " + rMateFunction.asip0002InsertComma(data["SA_CusRto"]) + "%" +  "<br>" + "고객수 : " + rMateFunction.asip0002InsertComma(data["SA_Cuscn"]) + "명";
        else if (seriesId == "ME")
        return "자산구간 : " + data["ME_Sclnm"] + "<br>" + "고객비율 : " + rMateFunction.asip0002InsertComma(data["ME_CusRto"]) + "%"+  "<br>" + "고객수 : " + rMateFunction.asip0002InsertComma(data["ME_Cuscn"]) + "명";
        else if (seriesId == "EU")
        return "자산구간 : " + data["EU_Sclnm"] + "<br>" + "고객비율 : " + rMateFunction.asip0002InsertComma(data["EU_CusRto"]) + "%" +  "<br>" + "고객수 : " + rMateFunction.asip0002InsertComma(data["EU_Cuscn"]) + "명";
        else if (seriesId == "AM")
        return "자산구간 : " + data["AM_Sclnm"] + "<br>" + "고객비율 : " + rMateFunction.asip0002InsertComma(data["AM_CusRto"]) + "%" +  "<br>" + "고객수 : " + rMateFunction.asip0002InsertComma(data["AM_Cuscn"]) + "명";
    },
    asip0002AxisLabelFunc: function (id, value) {
        return  rMateFunction.asip0002InsertComma(value) + "만원";
    },
    asip0002InsertComma: function(n) {
        var reg = /(^[+-]?\d+)(\d{3})/; // Regular expression
            n += "";
            while (reg.test(n))
            n = n.replace(reg, '$1' + "," + '$2');
        return n;
    },
    asiv1002DataTipFunc : function(seriesId, seriesName, index, xName, yName, data, value) { // values
        if (seriesName == "수익률")
            return data["nm"] + "<br>" + seriesName + " : <b>" + rMateFunction.asip0002InsertComma(data["strmPftrt"]) + "%</b>";
        else
            return data["nm"] + "<br>" + seriesName + " : <b>" + rMateFunction.asip0002InsertComma(data["am"]) + "만원</b>";
    },
    asiv1002LazyLoadFunc : function(id) {
        if (lazyLoadEventListener != null) {
            lazyLoadEventListener.callbackFunc(lazyLoadEventListener.vm, id);
        }
    },
    mama2001LabelJsFunction : function(seriesId, index, data, values) {
        return '<b>' + Math.round(values[1]) + "%</b>";
    },
    lcip1001UpLabelFunc : function(seriesId, index, data, values) {
        return '<font size="14"><b>'+rMateFunction.asip0002InsertComma(data.Amt) + "원</b></font>";
    },
    removeTabindex : function(seriesId) {
        $('#'+seriesId).find('div').removeAttr('tabindex');
    },
    lcipRemoveTabindex : function(seriesId) {
        $('#'+seriesId).find('div').removeAttr('tabindex');
    },
    asip1001ValueLabelFunc : function(value) {
        return value.toFixed(0) + "점";
    },
    asiv1003DataTipFunc : function(seriesId, seriesName, index, xName, yName, data, value) { // values
        return data["oriNm"] + "<br>" + seriesName + " : <b>" + rMateFunction.asip0002InsertComma(value[1]) + "만원</b>";
    },
    asln1002DataTipFunc : function(seriesId, seriesName, index, xName, yName, data, value) { // values
        return data["Month"] + "<br>" + seriesName + " : <b>" + rMateFunction.asip0002InsertComma(value[1]) + "만원</b>";
    },
    lcip1004TipTxt : function(seriesId, seriesName, index, xName, yName, data, values) {
        return seriesName + ' : ' + rMateFunction.asip0002InsertComma(Math.floor(values[1] / 10000 * 10) / 10) + '만원';
    },

    asac1006setUnit : function(seriesId, seriesName, index, xName, yName, data, values) {
        return data['Month'] + "<br>" + seriesName + " : <b>" + rMateFunction.asip0002InsertComma(values[1]) + "원</b>";
    },
    asac1006setData : function(seriesId, seriesName, index, xName, yName, data, values) {
        document.getElementById("hideIn_ASAC1006_inqDt").value=xName.orgMonth;

        document.getElementById("hideBtn_ASAC1006").click();
    },
    asac1006removeTabIndex : function(seriesId) {
        $('#'+seriesId).find('div').removeAttr("tabindex");
    },
    asac1006setDatatipColor : function(seriesId, index, data, values) {
        if(data.dtbyXpcBac >= 0) {
            return {"color" : "#23a0a5", "weight" : "0.7"}
        } else {
            return {"color" : "#ff0000", "weight" : "0.7"}
        }
    },
    /* 22-10-26 접근성 추가 */
    removeTabindex : function(seriesId) {
        $('#'+seriesId).find('div').removeAttr('tabindex');
    },
    asip2008DataTipFunc : function(seriesId, seriesName, index, xName, yName, data, values) {
        // console.log('dataTipFunc === '+seriesId, seriesName, index, xName, yName, data, values);
        var won = data["dtbyXpcBac"];
        var wons = won.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        var days = data["Month"].split('.');
        days = parseInt(days[0])+"월 "+parseInt(days[1])+"일";
        console.log(wons, days);
        $('.post_popup, .postPop').fadeOut(500);//안내 팝업, 첫번째 값 숨기기
        if(won < 0){
            $('.char_box01.chartArea').addClass('noAmt');
            $('.list_gray_box .amt').text(wons+'원');
            $('.list_gray_box .txt em').text(days);
        }else{
            $('.char_box01.chartArea').removeClass('noAmt');
            $('.list_gray_box .amt').text(wons+'원');
            $('.list_gray_box .txt em').text(days);
        }
        $('#selBalanceItem').val(data["Month"].replace('.',''))
        $('#selBalanceItem').click();
        return "<div class='postPop'>"
            +"<span class='day'>" + days + "</span>"
            //+"<span>" + values[0] + "</span>"
            +"<span class='won'>" + won.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "원</span>"
            +"</div>";
    },
    //예산잔액이 마이너스인 경우
    strokeJsFunc : function(seriesId, index, data, values) {
        // console.log('strokeJsFunc === '+seriesId, index, data, values);
        if(values[1] < 0)
            return {"color":"#ea4956", "weight":3};
        else
            return {"color":"#06b0b2", "weight":2};
    },
    getAriaLabelText : function(balanceList) {
        // 계좌별 예상 잔액 조회 - MM.DD amt, MM.DD amt, MM.DD amt...
        let ariaLabelText = "계좌별 예상 잔액 조회 - "

        for(let i=0; i<balanceList.length; i++) {
            if(i > 0) ariaLabelText += ', '

            ariaLabelText += dateFormat(balanceList[i].inqDt, "MM.DD") + ' '
            ariaLabelText += balanceList[i].dtbyXpcBac
        }

        ariaLabelText += " 지출하였습니다"

        return ariaLabelText
    },
    lcip2003TipTxt : function(seriesId, seriesName, index, xName, yName, data, values) {
        return seriesName +' : '+ values[1]+'만원';
    },
}

window.rMateFunction = rMateFunction