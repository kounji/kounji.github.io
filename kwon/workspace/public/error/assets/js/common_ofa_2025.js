﻿/*
* @업무명		: 	공통  
* @설명			:	
* @파일명		:	common_ofa.js
* @기존명		:
*********************************************************************
* 번호	작업자	작업일		변경내용
*--------------------------------------------------------------------
* 1    최준호  20241016     스뱅 네이티브 호출 함수명 변경
* 
*/

var _successCallbacks = {};
var _failCallbacks = {};
var seq = 0;  
var sViewTimeTest = "생성 시간 :::::: " + new Date().getTime();
var OF_ConsoleLog_Flag = true;
var getUserAgent = function() {
	var device = navigator.userAgent.toLowerCase();
	var return_value;
	if (OF.exeStatus == 2 || OF.exeStatus == 4) {
		return "else";
	}
	if (/android/.test(device)) {
		return_value = "android";
	} else if (/ipad|ipod|iphone/.test(device)) {
		return_value = "ios";
	} else {
		return_value = "else";
	}
	return return_value;
};
var OF = {
	  exeStatus: 0
	, callbackId: 0
    , isWebApp: function(){
		var userAgent = navigator.userAgent || navigator.vendor || window.ofa;
		if(userAgent.match(/Android/i)){
			this.exeStatus = userAgent.indexOf("AndroidWebKit") == -1 ? 2 : 3;
		}else{
			if(userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)){
				this.exeStatus = userAgent.indexOf("Safari", 0) != -1 ? 4 : 5;
			}else{
				this.exeStatus = 0;
			}
		}
    } //end: , isWebApp: function(){
	, log: function(){
		try{
			throw Error('');
		}catch(err){
			var args = [];
			for(var i = 0; i < arguments.length; i++){
				args.push(arguments[i]);
			}
		}
	} //end: , log: function(){
	, exec: function () {
	        try {
	            var index = 0;
	            var cb = arguments[index++];
	            if (typeof cb === "function") {
	                if (cb.name)
	                    cb = cb.name;
	                else
	                    cb = encodeURIComponent(cb.toString());
	            }
            
	            var info = {
		        	callback : cb,//"OF.callback"
		        	extension : arguments[index++],//service
		        	method : arguments[index++]//action
	            };
	            
	            if (!Array.isArray(arguments[index]) && typeof(arguments[index]) != "boolean") {
	            	info.callerId = arguments[index++];//callbackId
	            }
	            if (!Array.isArray(arguments[index]) && typeof(arguments[index]) == "boolean") {
	            	info.singleton = arguments[index++];//bOFSingleton
	            } 
	            
	            var params = [];
	            
				// 개인스뱅 TOBE Native PlugIn 호출시 object 타입으로 params를 받음
				if(index+1 == arguments.length && Array.isArray(arguments[index])) {
	            	params = arguments[index];
	            }else{
					params = !!arguments[index] ? [arguments[index]] : [];
	            }
	            
	            info["params"] = params;
	            
	            var json = JSON.stringify(info);
	            OF.execute_run(json);
	        } catch (e) {
	            var args = [];
	            for (var i = 0; i < arguments.length; i++) {
	                args.push(arguments[i]);
	            }
	            OF.log("execute : " + args + " = " + e);
	        }
	    }
	, execute_run: function(ofa_json){
		this.log(ofa_json);
		var status = this.exeStatus;
		switch(status){
			case 2: //안드로이드 웹
				break;
			case 3: //안드로이드 앱
				orchestraBridge.execute(ofa_json);
				break;
			case 4: //아이폰 웹
				break;
			case 5: //아이폰 앱
				var pluginMessage = "ofa:///#" + ofa_json;
				var isWK = false;
				try{
					if(typeof(webkit.messageHandlers.orchestraBridge) != "undefined") isWK = true;
				}catch(e){}
				if(isWK){
					// WKWebview
					webkit.messageHandlers.orchestraBridge.postMessage({"pluginMessage" : pluginMessage});
				}else{
					// UIWebView
					alert(pluginMessage);
				}
				break;
			default:
				break;
		}
	} //end: , execute: function(ofa_json){
}; //end: var ofa = {
OF.isWebApp();
var OFPDebugConsole = function(isDeprecated) {
	this.logLevel = OFPDebugConsole.INFO_LEVEL;
	this.isDeprecated = isDeprecated ? true : false;
};
OFPDebugConsole.ALL_LEVEL = 1;
OFPDebugConsole.INFO_LEVEL = 1;
OFPDebugConsole.WARN_LEVEL = 2;
OFPDebugConsole.ERROR_LEVEL = 4;
OFPDebugConsole.NONE_LEVEL = 8;
OFPDebugConsole.prototype.setLevel = function(level) {
	this.logLevel = level;
};
OFPDebugConsole.callbackCnt = 1;
OFPDebugConsole.prototype.processMessage = function(message, maxDepth) {
	if (maxDepth === undefined)
		maxDepth = 0;
	if (typeof (message) != 'object') {
		return (this.isDeprecated ? "WARNING: debug object is deprecated, please use console object \n"
				+ message
				: message);
	} else {
		function indent(str) {
			return str.replace(/^/mg, "    ");
		}
		function makeStructured(obj, depth) {
			var str = "";
			for ( var i in obj) {
				try {
					if (typeof (obj[i]) == 'object' && depth < maxDepth) {
						str += i + ":\n" + indent(makeStructured(obj[i]))
								+ "\n";
					} else {
						str += i
								+ " = "
								+ indent(String(obj[i])).replace(/^    /,
										"") + "\n";
					}
				} catch (e) {
					str += i + " = EXCEPTION: " + e.message + "\n";
				}
			}
			return str;
		}
		return ((this.isDeprecated ? "WARNING: debug object is deprecated, please use console object\n"
				: "")
				+ "Object:\n" + makeStructured(message, maxDepth));
	}
};
OFPDebugConsole.prototype.log = function(message, maxDepth) {
	if(OF_ConsoleLog_Flag){
		if (this.logLevel <= OFPDebugConsole.INFO_LEVEL) {
//			var message = this.processMessage(message,maxDepth);
			OF.exec(null,"OFPDebugConsole", "log", "OFPDebugConsole.log" + String(OFPDebugConsole.callbackCnt++), true, [message,'INFO']);
		}
		else {
			alert(message);
			console.log(message);
		}
	}
};
OFPDebugConsole.prototype.warn = function(message, maxDepth) {
	if(OF_ConsoleLog_Flag){
		if (this.logLevel <= OFPDebugConsole.WARN_LEVEL) {
			var message = this.processMessage(message,maxDepth);
			OF.exec(null, "OFPDebugConsole", "log", "OFPDebugConsole.log" + String(OFPDebugConsole.callbackCnt++), true, [message,'WARN']);
		}
		else {
			alert(message);
			console.log(message);
		}
	}
};

OFPDebugConsole.prototype.error = function(message, maxDepth) {
	if(OF_ConsoleLog_Flag){
		if (this.logLevel <= OFPDebugConsole.ERROR_LEVEL) {
			var message = this.processMessage(message,maxDepth);
			OF.exec(null, "OFPDebugConsole", "log", "OFPDebugConsole.log" + String(OFPDebugConsole.callbackCnt++), true, [message,'ERROR']);
		}
		else {
			alert(message);
			console.log(message);
		}
	}
};
var gConsole = {};
gConsole.log = function(){};
if (getUserAgent() != 'else') {
	// 주석풀면 안됨
//	gConsole = window.console;
	
	// 운영 반영시 주석 풀어야함
//	window.debug = new OFPDebugConsole(true);
//	window.console = new OFPDebugConsole();
}
function default_callback(){
	console.log("default callback");
}
/**
 *  공통기능
 * @class  공통기능
 * @author FINGER Inc.
 * @version 1.0
 * @since 2015.09
 */
var fg= {};
/**
 * xml 데이터를 파싱하는 모듈 init
 */
if(typeof X2JS == "function"){
	var x2js = new X2JS();	
}
/**
 * 안드로이드 버전 체크
 * IOS 일경우 iPhone 리턴
 * Android 버전 리턴 
 * @param ua
 * @returns
 */
function fg_getVersion(ua) {
	var ua = ua || navigator.userAgent,
		android = ua.match(/Android\s([0-9\.]*)/), 
		iphone = ua.match(/(iPad|iPhone|iPod)/g); 
	
	if(android == null && iphone == null) return false;
	return android ? android[1] : iphone[1];
};
/**
 * 오케스트라 플러그인 실행 관련 기능
 */
fg.of = {
	queue : {
        ready : true,
        commands : [],
        timer : null
    }
};
/**
 * View Type 정의
 */
fg.of.viewType = {
	MAIN   : 0,
	IFRAME : 1,
	POPUP  : 2
};
/**
 * 현재 View Type
 */
fg.of.curViewType = 0;

/**
 * 현재 View Type 셋팅
 */
fg.of.setViewType = function(){
	var bLocalHistoryId  = false;
	var bParentHistoryId = false;

	// 현재 페이지가 main인지 iframe인지 구분
	if (typeof historyId != "undefined" && historyId != "") {
		bLocalHistoryId = true;
	}
	if (typeof parent.historyId != "undefined") {
		bParentHistoryId = true;
	}
	if (bLocalHistoryId == true && bParentHistoryId == true) {	// main
		fg.of.curViewType = 0;
	} else if (bLocalHistoryId == false && bParentHistoryId == true) {	// iframe
		fg.of.curViewType = 1;
	} else {	// etc (popup)
		fg.of.curViewType = 2;
	}
};

fg.of.getViewType = function(){
	var retViewType = "MAIN";
	if (fg.of.curViewType == fg.of.viewType.IFRAME) {
		retViewType = "IFRAME";
	} else if (fg.of.curViewType == fg.of.viewType.POPUP) {
		retViewType = "POPUP";
	}
	return retViewType;
}
/**
 * 콜백시 프레임 접근 위한 prefix 가져오기
 */
fg.of.getViewPrefix = function(){
	var sPrefix	= "";
	if (fg.of.curViewType == fg.of.viewType.IFRAME) {	// iframe
		sPrefix = "shComm.allIFrameFindByTypeToId('" + parent.historyId +"').";
	}
	
	return sPrefix;
};
/**
 * 기본 View ID
 */
fg.of.defaultViewId = "contents";
/**
 * 기본 View ID 셋팅 (로그인 후 메인에서 웹뷰 사용시 구분위해 뷰아이디 셋팅)
 */
fg.of.setDefaultViewId = function(sViewId){
	fg.of.defaultViewId = sViewId;
	if (fg.of.curViewType == fg.of.viewType.IFRAME) {
		parent.fg.of.defaultViewId = sViewId;
	}
}
/**
 * 기본 View ID 가져오기
 */
fg.of.getDefaultViewId = function(){
	if (fg.of.curViewType == fg.of.viewType.IFRAME) {
		return parent.fg.of.defaultViewId;
	} else {
		return fg.of.defaultViewId;
	}
}
/**
 * 현재 View ID 가져오기
 */
fg.of.getCurViewId = function(){
	return typeof goCommPopupInfo == 'object' && goCommPopupInfo.curViewId != '' ? goCommPopupInfo.curViewId : fg.of.getDefaultViewId();
};
/**
 * main.html contents 가져오기 (웹에서 팝업 사용시 사용)
 */
fg.of.getMainView = function(oThis){
	if (typeof oThis == 'undefined') oThis = window;
	if (getUserAgent() != 'else') {
		return oThis.parent;
	}
	return oThis.fg.of.curViewType == fg.of.viewType.POPUP ? fg.of.getMainView(oThis.opener) : oThis.parent;
}
fg.of.setViewType();

fg.of.callbackId = 0;
fg.of.callbacks = {};
fg.of.callbackStatus = {
	OK    : 0,
	ERROR : 999
};
fg.of.exec = function(callback, service, action, args, singletone){
	console.log(
		"[" + parent.sViewTimeTest + "][" + $(location.pathname.split("/")).last()[0] +
		"] fg.of.exec ::::: viewId : " + fg.of.getCurViewId() +
		" ::::: historyId : " + parent.historyId +
		" ::::: Class : " + service +
		" ::::: method : " + action
	);
	
	if (getUserAgent() == 'else') {
		console.log("[" + parent.sViewTimeTest + "][" + $(location.pathname.split("/")).last()[0] + "] fg.of.exec ::::: args ::::: " + JSON.stringify(args, null, 4));
	}
	var arguments2 = [callback, service, action, args, singletone];
	
    try {
    	fg.of.queue.commands.push(arguments2);
        if (fg.of.queue.timer == null)
        	fg.of.queue.timer = setTimeout(fg.of.run_command, 1);
    } catch (e) {
        console.log("fg.of Error(1): " + e);
    }
}
fg.of.run_command = function() {
    try {
        if (!fg.of.queue.ready) {
        	fg.of.queue.ready = true;
        	fg.of.queue.timer = setTimeout(fg.of.run_command, 1);
            return;
        }
        fg.of.queue.ready = false;
        
        var args = fg.of.queue.commands.shift();
        fg.of.run_command_inner(args);
        
        if (fg.of.queue.commands.length == 0) {
            clearTimeout(fg.of.queue.timer);
            fg.of.queue.timer = null;
        } else {
        	fg.of.queue.timer = setTimeout(fg.of.run_command, 1);
        }
    } catch (e) {
        console.log("fg.of Error(2): " + e);
    }
};

fg.of.run_command_inner = function(args) {
    try {
		var bLocalHistoryId  = false;
		var bParentHistoryId = false;

		var fncOFCallback	= "fg.of.callback";
    	var bOFSingleton	= true;
		
    	if (fg.of.curViewType == fg.of.viewType.IFRAME) {	// iframe
    		fncOFCallback = fg.of.getViewPrefix() + fncOFCallback;
    	}
		
		var callbackFn	= args[0];
		var service		= args[1] + "." + args[2];
		var sOFClass	= args[1];
		var sOFMethod	= args[2];
		var oOFParams	= args[3];
		
		if (typeof args[4] == 'boolean') {
			bOFSingleton = args[4];
		}
		
		var callbackId	= service + fg.of.callbackId++;
		if (callbackFn) {
			fg.of.callbacks[callbackId] = {
				callback : callbackFn
			};
		} else {
			// 콜백 없음
			fncOFCallback = "";
		}
		
		OF.exec(fncOFCallback, sOFClass, sOFMethod, callbackId, bOFSingleton,oOFParams);
	} catch (e) {
		console.log("fg.of Error: " + e);
	}
};
fg.of.callback = function(retParams) {
	console.log("[" + parent.sViewTimeTest + "][" + $(location.pathname.split("/")).last()[0] + "] fg.of.callback ::::: viewId : " + fg.of.getCurViewId() + " ::::: historyId : " + parent.historyId);
	var callbackId 	= retParams["callerId"];
	var callback;
	try{
		callback = fg.of.callbacks[callbackId].callback;
	}catch(e){
		console.log("callback no found ");
		return;
	}
	
	if (typeof callback == "function") {
		callback(retParams);
	} else {
		try {
			window[callback](retParams);
		} catch (e) {
			eval(callback)(retParams);
		}
	}
	//delete fg.of.callbacks[callbackId];  // 보안키패드 on key 이벤트 대응 위해 주석처리함.
};

// 기기 확인하기 위해 추가됨
fg.of.getUserAgent = getUserAgent;

/**
 * 네이티브 인터페이스 객체
 */
var $NS_OFA = {};



/****************************************************************************************************************
 * @type {object} SBView : 네이티브/웹뷰간 화면전환
 * **************************************************************************************************************/
$NS_OFA.SBView = {};

/**
@function SBView.setView : 네이티브 및 웹뷰 화면View 호출
@param {object} params
	{
  		viewMode : "LOGIN", "MAIN", "GNB", "PREV_NATIVE" ……..(AS-IS 동일 - 총19개)
  		nextServiceId: {jsonString} "이동할 서비스 ID관련 정보" 
  			{
				nextServiceId : '',
				nextService_PARARM
			}
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : ?
 */
$NS_OFA.SBView.setView = function(viewMode,nextServiceId,callback){
	var params = {viewMode:viewMode,nextServiceId:nextServiceId}
	fg.of.exec(callback,'SBView','setView',params);
};


/****************************************************************************************************************
 * @type {object} SBNativeUI : 네이티브 UI
 * **************************************************************************************************************/
$NS_OFA.SBNativeUI = {};

/**
@function SBNativeUI.nativePopup : 네이티브 팝업 호출
@param {object} params
	{
  		?
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : ?
 */
$NS_OFA.SBNativeUI.nativePopup = function(gubun, params,callback){
	fg.of.exec(callback, "SBNativeUI","nativePopup", [gubun,params]);
};


/****************************************************************************************************************
 * @type {object} SBSTT : STT
 * **************************************************************************************************************/
$NS_OFA.SBSTT = {};

/**
@function SBSTT.startSTT : STT 실행
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 
		{
		    code : "0",
		    msg : "모여라" STT결과
 		}
 */
$NS_OFA.SBSTT.startSTT = function(callback){
	fg.of.exec(callback, "SBSTT", "startSTT", null);
};


/****************************************************************************************************************
 * 카메라 관련
 * **************************************************************************************************************
 */
/**
 * Camera 
 * @class NPCamera
 * @author FINGER Inc.
 * @version 1.0
 * @since 2015. 09
 */
$NS_OFA.Camera = {};
/**
 * 카메라 앨범 호출
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.Camera.getPicture = function(size,callback){
	fg.of.exec(callback, "SBCamera", "getPicture",[size]);
};
/**
 * 카메라 화면 호출
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.Camera.takePicture = function(quality,returnType,callback){
	fg.of.exec(callback, "SBCamera", "takePicture",[quality,returnType]);
};

/**
 * 카메라 화면 호출
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.Camera.takePictureDefaultCamera = function(quality,callback) {
	fg.of.exec(callback, "SBCamera", "takePictureDefaultCamera",[quality]);
};
/**
 * 앨범 호출
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.Camera.photoAlbum = function(quality,srcType,returnType,callback){
	fg.of.exec(callback, "SBCamera", "photoAlbum",[quality,srcType,returnType]);
};
/**
 * 이미지 가져오기
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.Camera.getImage = function(quality,callback){
	fg.of.exec(callback, "SBCamera", "getImage",[quality]);
};
/**
 * 이미지 리사이즈
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.Camera.resizeImage = function(path,width,height,quality,callback){
	fg.of.exec(callback, "SBCamera", "resizeImage",[path,width,height,quality]);
};



/****************************************************************************************************************
 * NPCodeGuard
 * **************************************************************************************************************
 */
/**
 * NPCodeGuard
 * @class NPCodeGuard
 * @author FINGER Inc.
 * @version 1.0
 * @since 2018. 07
 */
$NS_OFA.NPCodeGuard = {};

/**
 * getToken 코드가드 토큰 획득 
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPCodeGuard.getToken = function(callback){
	fg.of.exec(callback, "SBCodeGuard", "getToken", []);
};

/****************************************************************************************************************
 * NPEverSafe
 * **************************************************************************************************************
 */
$NS_OFA.NPEverSafe = {};

$NS_OFA.NPEverSafe.getToken = function(callback){
	fg.of.exec(callback, "SBEverSafe", "getToken", []);
};

















/****************************************************************************************************************
 * PUSH
 * **************************************************************************************************************
 */
/**
 * NPPush
 * @class NPPush
 * @author FINGER Inc.
 * @version 1.0
 * @since 2018. 07
 */
$NS_OFA.NPPush = {};
/**
 * push 서비스 시작
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.pushStartService = function(name,userId,tel,callback){
	fg.of.exec(callback, "SBPush", "pushStartService", [name,userId,tel]);
};
/**
 * push 서비스 정지
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.pushStopService = function(callback){
	fg.of.exec(callback, "SBPush", "pushStopService", []);
};
/**
 * push 읽지 않은 푸시 메시지 개수
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.pushNotReadMsgCnt = function(callback){
	fg.of.exec(callback, "SBPush", "pushNotReadMsgCnt", []);
};
/**
 * push 메시지 리스트 가져오기
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.pushList = function(callback){
	fg.of.exec(callback, "SBPush", "pushList", []);
};
/**
 * push 메시지 읽음 처리
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.pushReadAck = function(msgId,callback){
	fg.of.exec(callback, "SBPush", "pushReadAck", [msgId]);
};
/**
 * push 알림 형태
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.pushNotiType = function(type,callback){
	fg.of.exec(callback, "SBPush", "pushNotiType", [type]);
};
/**
 * push 소리 알림 설정
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.pushSoundOnOff = function(set,callback){
	fg.of.exec(callback, "SBPush", "pushSoundOnOff", [set]);
};
/**
 * push 진동 알림 설정
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.pushVibeOnOff = function(set,callback){
	fg.of.exec(callback, "SBPush", "pushVibeOnOff", [set]);
};
/**
 * push 뱃지 설정
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.pushBadgeOnOff = function(set,callback){
	fg.of.exec(callback, "SBPush", "pushBadgeOnOff", [set]);
};
/**
 * push 설정 
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.setPushSetting = function(params,callback){
	fg.of.exec(callback, "SBPush", "setPushSetting", [params]);
};
/**
 * push 설정값 가져오기 
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.getPushSetting = function(params,callback){
	var sendParam = {
		"required": params[0]||"",
		"marketing": params[1]||"",
		"mOTP": params[2]||""
	};
	fg.of.exec(callback, "SBPush", "getPushSetting", sendParam);
};
/**
 * 푸시 설정창 값 
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.getMarketingPushSetting = function(callback){
	fg.of.exec(callback, "SBPush", "getMarketingPushSetting", []);
};
/**
 * 푸시 설정 : 진동,사운드 등 ( android only )  
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.setMarketingPushSetting = function(json,callback){
	fg.of.exec(callback, "SBPush", "setMarketingPushSetting", [json]);
};
/**
 * 푸시(알림) 메시지 읽음 처리 (카테고리별, 전체) 
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.pushReadAll = function(scd,callback){
	fg.of.exec(callback, "SBPush", "pushReadAll", [scd]);
};
/**
 * 현재 기기 알림 허용이 되어있는지 체크하는 메서드
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.isEnabledNotification = function(callback){
	fg.of.exec(callback, "SBPush", "isEnabledNotification", []);
};
/**
 * 알림 허용 설정 창을 표출해주는 메서드 
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPPush.goNotificationSettings = function(callback){
	fg.of.exec(callback, "SBPush", "goNotificationSettings", []);
};
/****************************************************************************************************************
 * 통장사본
 * **************************************************************************************************************
 */
/**
 * NPBankBook
 * @class NPBankBook
 * @author FINGER Inc.
 * @version 1.0
 * @since 2018. 07
 */
$NS_OFA.NPBankBook = {};
/**
 * 통장사본
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.NPBankBook.showBankBook = function(param,callback){
	fg.of.exec(callback, "SBBankBook", "showBankBook", [param]);
};



/****************************************************************************************************************
 * 위젯
 * **************************************************************************************************************
 */
/**
 * SBWidget
 * @class SBWidget
 * @author FINGER Inc.
 * @version 1.0
 * @since 2019. 07
 */
$NS_OFA.SBWidget = {};
/**
 * 위젯 설정 
 * @return callback(obj) : 
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.param : 
 *	obj.result : 결과데이터 
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.SBWidget.setData = function(param,callback){
	fg.of.exec(callback, "SBWidget", "setData", [param]);
};
/**
 * 위젯 설정값 
 * @return callback(obj) : 
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.param : 
 *	obj.result : 결과데이터 
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.SBWidget.getData = function(callback){
	fg.of.exec(callback, "SBWidget", "getData", []);
};

/****************************************************************************************************************
 * 모션뱅킹
 * **************************************************************************************************************
 */
/**
 * SBShake
 * @class SBShake
 * @author FINGER Inc.
 * @version 1.0
 * @since 2019. 07
 */
$NS_OFA.SBShake = {};
/**
 * 모션뱅킹 설정 
 * @return callback(obj) : 
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.param : 
 *	obj.result : 결과데이터 
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.SBShake.setData = function(param,callback){
	fg.of.exec(callback, "SBShake", "setData", [param]);
};
/**
 * 모션뱅킹 설정값 
 * @return callback(obj) : 
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.param : 
 *	obj.result : 결과데이터 
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.SBShake.getData = function(callback){
	fg.of.exec(callback, "SBShake", "getData", []);
};



/****************************************************************************************************************
 *  이체결과이미지 저장
 * **************************************************************************************************************
 */
/**
 * SBScreen
 * @class SBScreen
 * @author FINGER Inc.
 * @version 1.0
 * @since 2019. 07
 */
$NS_OFA.SBScreen = {};
/**
 * 이체결과이미지 저장
 * @return callback(obj) : 
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.param : 
 *	obj.result : 결과데이터 
 *	obj.errorMessage : 에러메시지
 *  네이티브에서 높이를 사용하지 않고, 소수점 높이가 들어올때 오류발생으로 모두 0으로 치환			
 */
$NS_OFA.SBScreen.saveScreenShot = function(params,callback){
	//params = !!params ? params : { height : '0' };
	fg.of.exec(callback,'SBScreen','saveScreenShot',params);
};
/**
 * 이체결과이미지 공유
 * @return callback(obj) : 
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.param : 
 *	obj.result : 결과데이터 
 *	obj.errorMessage : 에러메시지	
 *  네이티브에서 높이를 사용하지 않고, 소수점 높이가 들어올때 오류발생으로 모두 0으로 치환		
 */
$NS_OFA.SBScreen.sharing = function(params,callback){
	//params = !!params ? params : { height : '0' };
	fg.of.exec(callback, "SBScreen", "sharing", params);
};


/****************************************************************************************************************
 *  iOS 로딩이미지 지정
 * **************************************************************************************************************
 */
/**
 * 
 * @class SBOnlyIOS
 * @author FINGER Inc.
 * @version 1.0
 * @since 2019. 07
 */
$NS_OFA.SBOnlyIOS = {};
/**
 * iOS 로딩이미지 지정
 * @return callback(obj) : 
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.param : 
 *	obj.result : 결과데이터 
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.SBOnlyIOS.changeLoadingImage = function(idx,callback){
	fg.of.exec(callback, "SBOnlyIOS", "changeLoadingImage", [idx]);
};
/**
 * iOS 로딩이미지 값
 * @return callback(obj) : 
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.param : 
 *	obj.result : 결과데이터 
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.SBOnlyIOS.getLoadingImageIndex = function(callback){
	fg.of.exec(callback, "SBOnlyIOS", "getLoadingImageIndex", []);
};
/**
 * WKview 대응 네이티브 세션 동기화 
 * @return callback(obj) : 
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.param : 
 *	obj.result : 결과데이터 
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.SBOnlyIOS.sessionSync = function(nnServiceId,callback){
	fg.of.exec(callback, "SBOnlyIOS", "sessionSync", [nnServiceId]);
};







/****************************************************************************************************************
 * 네이티브 금액 입력 키보드
 * **************************************************************************************************************
 */
$NS_OFA.SBCustomKeyboard = {};
/** 
 * SBCustomKeyboard
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	
 *	obj.errorMessage : 에러메시지	 
 */

$NS_OFA.SBCustomKeyboard.showCustomKeyboard = function(params,callback){
	fg.of.exec(callback, "SBCustomKeyboard", "showCustomKeyboard", params);
};
// hide 추가
$NS_OFA.SBCustomKeyboard.hide = function(callback){
	fg.of.exec(callback, "SBCustomKeyboard", "hide", []);
};



/****************************************************************************************************************
 * 수어상담 url 호출창.
 * **************************************************************************************************************/
/**
 * @class SBSigntalk
 * @version 1.0
 * @since 2019. 12
 */
/*$NS_OFA.SBSigntalk = {};*/
/** 
 * SBSigntalk
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.url : 전달한 url
 *	obj.result : 결과데이터	
 *	obj.errorMessage : 에러메시지	 
 */
/*$NS_OFA.SBSigntalk.startSignTalk = function(url,callback){
	fg.of.exec(callback, "SBSigntalk", "startSignTalk", url);
};
*/












































/*
2024.07.01 
ASIS - TOBE 전환 완료 플러그인 호출 함수 하단 기재 
*/

/**************************************************************************************************************
 * @type {object} NHCApp : 앱
 **************************************************************************************************************/
$NS_OFA.NHCApp = {};

/**
@function NHCApp.getVersion : 앱 버전 조회
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
- AOS
	{
		androidCurrentVer : AOS 앱의 빌드 버전,
	  	androidCurrentVerDisplay : AOS 앱의 사용자를 위한 버전
	}
	
- IOS
	{
		iosCurrentVerDisplay : iOS 앱의 빌드 버전,
	}
	obj.errorMessage : 에러메시지
 */
$NS_OFA.NHCApp.getVersion = function(callback){
	fg.of.exec(callback,'NHCApp','getVersion'); 
}

/**
 * @function NHCApp.close : 앱종료
 */
$NS_OFA.NHCApp.close = function(){
	fg.of.exec(null,'NHCApp','close'); 
}

















/****************************************************************************************************************
 * 앱 관련
 * **************************************************************************************************************
 */
/**
 * NPAppManager 
 * @class OFAppManager
 * @author FINGER Inc.
 * @version 1.0
 * @since 2015. 09
 */
$NS_OFA.AppManager = {};
/**
 * 캐시 삭제
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.AppManager.onCacheClear = function(param,callback){
	fg.of.exec(callback, "SBAppManager", "onCacheClear",[param]);
};
/**
 * 앱 종료
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
/*$NS_OFA.AppManager.appClose = function(callback){
	fg.of.exec(callback, "SBAppManager", "appClose",[]);
};*/

/**
 * 웹뷰 팝업 열기
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.AppManager.openFullPopup = function(url,callback){
	fg.of.exec(callback, "SBAppManager", "openFullPopup",[url]);
};
/**
 * 웹뷰 팝업 닫기
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.AppManager.cancelFullPopup = function(callback){
	fg.of.exec(callback, "SBAppManager", "cancelFullPopup",[]);
};
/**
 * 외부앱에서 넘어온 수신 처리 관련 ( PUSH / SSO / ... )
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.AppManager.onStartPageCheck = function(callback){
	fg.of.exec(callback, "SBAppManager", "onStartPageCheck",[]);
};
/**
 * 앱테마 변경 이벤트
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.AppManager.setAppTheme = function() {
	fg.of.exec(null,'SBAppManager','setAppTheme',[]);
};
/**
 * 시스템 앱테마 가져오기
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.AppManager.getAppTheme = function(callback) {
	fg.of.exec(callback,'SBAppManager','getAppTheme',[]);
};
/**
 * 앱 버전 정보
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.AppManager.getAppVerInfo = function(callback){
	fg.of.exec(callback, "NHCApp", "getVersion",[]);
};
/**
 * 앱 보안체크 여부
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.AppManager.checkAppSecurity = function(callback){
	fg.of.exec(callback, "SBAppManager", "checkAppSecurity",[]);
};
/**
 * 키패드 타입 변경
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param ( in : 밀어올림 , out : 덮음 ) 
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.AppManager.setSoftInputMode = function(types,callback){
	fg.of.exec(callback, "SBAppManager", "setSoftInputMode",[types]);
};
/**
 * 웹 뷰 텍스트 크기 조정
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param ( 0 : 크기 고정( default )  , 1 : system text 크기와 동일하게 적용  ) 
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.AppManager.setWebTextZoom = function(types,callback){
	fg.of.exec(callback, "SBAppManager", "setWebTextZoom",[types]);
};
/**
 * 현재의 풀팝업창을 닫고 바닥에서 페이지 이동
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param ( 0 : 크기 고정( default )  , 1 : system text 크기와 동일하게 적용  ) 
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.AppManager.closeFullPopUpWithUrl = function(url,callback){
	fg.of.exec(callback, "SBAppManager", "closeFullPopUpWithUrl",[url]);
};
/**
 * 포인트 컬러 변경 이벤트
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지
 */
$NS_OFA.AppManager.setAppPointColor = function() {
	fg.of.exec(null,'SBAppManager','setAppPointColor',[]);
};


/****************************************************************************************************************
 * 앱 런치 관련
 * **************************************************************************************************************
 */
/**
 * OpenApp 
 * ASIS : SBOpenApp 사용불가 TOBE : NHCAppManager로 일괄변경 2024-09-26 우호철
 * @class NPOpenApp
 * @author FINGER Inc.
 * @version 1.0
 * @since 2015. 09
 */
$NS_OFA.OpenApp = {};
/**
 * 앱스토어 보내기
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.OpenApp.storeGo = function(url,callback){
	fg.of.exec(callback, "NHCAppManager", "storeGo",[url]);
};
/**
 * 패키지명 앱 설치 여부
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.OpenApp.isLaunch = function(params,callback){
	fg.of.exec(callback, "NHCAppManager", "isLaunch",params);
};
/**
 * 각 패키지명 앱 설치 여부
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.OpenApp.isLaunchArray = function(params,callback){
	fg.of.exec(callback, "NHCAppManager", "isLaunchArray",[params]);
};
/**
 * 앱 실행
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.OpenApp.openApp = function(param,callback){
	fg.of.exec(callback, "NHCAppManager", "openApp",param);
};
/**
 * 앱 실행
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.OpenApp.openAppWithURI = function(uri,downUri,callback){
	fg.of.exec(callback, "NHCAppManager", "openAppWithURI",[uri,downUri]);
};
/**
 * 앱 연동
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.OpenApp.appTOapp = function(packageName,marketUrl,arr,callback){
	fg.of.exec(callback, "NHCAppManager", "appTOapp",[packageName,marketUrl,arr]);
};
/**
 * 외부브라우저
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.OpenApp.openWebBrowser = function(url,callback){
	fg.of.exec(callback, "NHCAppManager", "openWebBrowser",[url]);
};
/**
 * scheme으로 다른 앱 실행
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.OpenApp.openSchemeApp = function(scheme,callback){
	fg.of.exec(callback, "NHCAppManager", "openSchemeApp",[scheme]);
};
/**
 * scheme으로 다른 앱 실행
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.OpenApp.openCustomSchemeApp = function(scheme,data,callback){
	fg.of.exec(callback, "NHCAppManager", "openCustomSchemeApp",[scheme,data]);
};
/** 
 * shareText  공유하기
 * @param {Function}			callback
 * @param text					String Text(공유할 텍스트)
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.errorMessage : 에러메시지	 
 */
$NS_OFA.OpenApp.shareText = function(text, callback){
	// fg.of.exec(callback, "NHCAppManager", "shareText",[text]);
	fg.of.exec(callback, "SBScreen", "shareText",[{text:text}]);
};


/**************************************************************************************************************
 * NHCApp : 타앱
 * @type {object}
 **************************************************************************************************************/
$NS_OFA.NHCAppManager = {};

/**
@function NHCAppManager.launchApp : 타앱 실행
@param {object} params
	{
	  appName : 앱 패키지명(AOS) 또는 앱 Scheme(iOS),
	  appStoreUrl : 앱스토어 URL
	 }
@param {callback} callback
	?
@return 
	성공 -> 앱 실행
	실패 -> 앱스토어 이동	
*/
$NS_OFA.NHCAppManager.launchApp = function(params,callback){
	fg.of.exec(callback, 'NHCAppManager','launchApp',params);
}
/**
@function NHCAppManager.isInstalled : 타앱 설치여부 확인
@param {object} params
	{
		appName : 앱 패키지명(AOS) 또는 앱 Scheme(iOS)
	}
@param {callback} callback
@return callback(obj)
	obj.resultCode : 앱설치여부(0:설치됨, 1: 설치안됨)
*/
$NS_OFA.NHCAppManager.isInstalled = function(params,callback){
	fg.of.exec(callback, 'NHCAppManager','isInstalled',params);
}
/**
@function NHCAppManager.launchAppUri : 
	 params : {
	  	appName : 앱 패키지명(AOS) 또는 앱 Scheme(iOS)
	 }
	 ---------------------------------
		. 성공 -> 앱 실행
		. 실패 -> 앱 설치안됨
*/
$NS_OFA.NHCAppManager.launchAppUri = function(params,callback){
	fg.of.exec(callback, 'NHCAppManager','launchAppUri',params);
}
/*
	 params : {
	  	url : 앱스토어 URL
	 }
	 ---------------------------------
	  . 성공 -> 앱스토어 실행 성공
	  . 실패 -> 앱스토어 실행 실패
*/
$NS_OFA.NHCAppManager.openAppStore = function(params,callback){
	fg.of.exec(callback, 'NHCAppManager','openAppStore',params);
}
/**
 @function NHCAppManager.openCustomSchemeApp : openCustomSchemeApp
 @param {object} params
 {
	  appName : 앱 패키지명(AOS) 또는 앱 Scheme(iOS),
	  data : 추가 파라미터
	 }
 @param {callback} callback
 ?
 @return
 성공 -> 앱 실행
 실패 -> 앱스토어 이동
 */
$NS_OFA.NHCAppManager.openCustomSchemeApp = function(params,callback){
	fg.of.exec(callback, 'NHCAppManager','openCustomSchemeApp',params);
}
























/****************************************************************************************************************
 * @type {object} Device : 단말정보(SB)
 * @description 
 * 	NHCDevice.getInfo 와 Device.getDeviceInfo 로 가져올 수 있는 데이터가 상이하여 유지
 * **************************************************************************************************************/
$NS_OFA.Device = {};
/**
 * 디바이스 정보 가져오기 (asis 동일기능)
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.Device.getDeviceInfo = function(callback){
	fg.of.exec(callback,"SBDevice","getDeviceInfo",[]);
};


/****************************************************************************************************************
 * @type {object} NHCDevice : 단말정보
 * **************************************************************************************************************/
$NS_OFA.NHCDevice = {};

/**
@function NHCApp.getInfo : 기기 정보 조회
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
- AOS
	{
	    osName : "Android",
	    modelName : "SM-F907N",
	    osRelease : "12",
	    androidId : "01234abcd",
	    brandName : "samsung",
	    osVersion : 32,
	    packageName : "com.nonghyup.nhallonebank",
	    versionCode : 32,
	    versionName : "1.4.0",
	    phoneNumber : "+821011112222",
	    networkOperator : "45006",
	    networkOperatorName : "LG U+"
	}

- IOS
	{
	    systemName : "iOS"
	    modelName : "iPhone10,4",
	    osRelease : "12.4.1",
	    deviceToken : "TOKEN",
	    localizedModel : "iPhone",
	    model : "iPhone",
	}
*/
$NS_OFA.NHCDevice.getInfo = function(callback){
	fg.of.exec(callback,'NHCDevice','getInfo',[]);
}

/**
@function NHCApp.setClip : 클립보드로 복사
@param {object} params
	{
		text : 문자열
	}
*/
$NS_OFA.NHCDevice.setClip = function(params, callback){
	fg.of.exec(callback,'NHCDevice','setClip',params);
}

/**
@function NHCApp.getClip : 클립보드에서 가져오기
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result
		{
			text : 문자열
		}
*/
$NS_OFA.NHCDevice.getClip = function(callback){
	fg.of.exec(callback, 'NHCDevice','getClip');
}

/**
	GPS
	result {
	  lat : 위도,
	  long : 경도
	}
 */
$NS_OFA.NHCDevice.getGpsLocation = function(params,callback){
	fg.of.exec(callback,'NHCDevice','getGpsLocation',[]);
}

/**
- ASIS
$NS_OFA.Device.makingCall

@function NHCDevice.makeCall : 전화걸기
@param {object} params
	{
		phoneNumber : 전화번호
	}
 */
$NS_OFA.NHCDevice.makeCall = function(params){
	fg.of.exec(null,'NHCDevice','makeCall',params);
}

/**
-ASIS
$NS_OFA.AppManager.getApkHashCode

@function NHCDevice.getApkHashCode : 모바일 해쉬 코드 전달
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : hashCode
@description 
	[AOS] 전용
*/
$NS_OFA.NHCDevice.getApkHashCode = function(callback){
	fg.of.exec(callback,'NHCDevice','getApkHashCode',[]);
}


/****************************************************************************************************************
 * @type {object} NHCContacts : 연락처
 * **************************************************************************************************************/
$NS_OFA.NHCContacts = {};

/**
- ASIS
$NS_OFA.Device.importContacts

@function NHCContacts.pickContact : 연락처 선택
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result
		{
			name : 성명, 
			number : 전화번호
		}
*/
$NS_OFA.NHCContacts.pickContact = function(callback){
	fg.of.exec(callback,'NHCContacts','pickContact',[]);
};

/**
- ASIS
$NS_OFA.Device.getContactsList

@function NHCContacts.getContacts : 연락처 조회
@param {object} params
	{
		keyword : 검색 키워드
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result
		[
			{name : 성명,  number : 전화번호}
			{name : 성명,  number : 전화번호}
			...
		]
*/
$NS_OFA.NHCContacts.getContacts = function(params,callback){
	params = !!params ? params : { keyword : '' };
	fg.of.exec(callback,'NHCContacts','getContacts',params);
};


/****************************************************************************************************************
 * @type {object} SBUsim : USIM 정보
 ****************************************************************************************************************/
$NS_OFA.SBUsim = {};
/**
@function SBUsim.getUsimInfo : [AOS] MO 인증
@param {function} callback
@return callback(obj)
	obj.resultCode : SMS 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
	obj.errorMessage : 에러메시지
 */
$NS_OFA.SBUsim.getUsimInfo = function(callback){
	fg.of.exec(callback, 'SBUsim','getUsimInfo', []);
};















/****************************************************************************************************************
 * @type {object} NHCFds : FDS
 * **************************************************************************************************************/
//- ASIS $NS_OFA.NPFDS = {};
$NS_OFA.NHCFds = {};

/**
@function NHCFds.getData : FDS 데이터 조회
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터(string)
@description
	callback에 result로 전달되는 문자열은 'PLLAIN_' + [Json문자열]이므로 'PLLAIN_'을 제거후 json데이터로 파싱
*/
$NS_OFA.NHCFds.getData = function(callback){
	fg.of.exec(callback, 'NHCFds','getData',[]);
}

/*
- ASIS 
$NS_OFA.NPFDS.getFakeFinderFDSData = function(callback){
	fg.of.exec(callback, "SBFDS", "getFakeFinderFDSData", []);
};
*/






/****************************************************************************************************************
 *  @type {object} NHCSms : SMS
 * **************************************************************************************************************/

$NS_OFA.NHCSms = {};

/**
- ASIS 
$NS_OFA.NPSMS.sendSms

 @function NHCSms.sendMessage : SMS 발송
 @param {object} params
 	{
	  phoneNumber : 전화번호,
	  message : 메시지
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : ?
 */
$NS_OFA.NHCSms.sendMessage = function(params, callback){
	fg.of.exec(callback, 'NHCSms','sendMessage', params);
}

/**
 @function NHCSms.sendMoMessage : [IOS] MO 인증 SMS 발송
 @param {object} params
 	{
	  phoneNumber : 전화번호,
	  moId : 업무 ID
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 문자열
		- SMS 권한 없음 : "권한안내 설정 문구"
		- Device 토큰 값 없음 (pushToken 사용) :"디바이스 토큰 값 없음 문구"
		- SMS 발송 성공 & 실패 : sms 전송결과 상태
@description
	[IOS] 전용
 */
$NS_OFA.NHCSms.sendMoMessage = function(params, callback){
	fg.of.exec(callback, 'NHCSms','sendMoMessage', params);
}

/*
-ASIS
=> ASIS기준 네이티브 소스상에서 아무런 기능이 없어서 함수 제거

$NS_OFA.NPSMS.onSms = function(time,callback){
	fg.of.exec(callback, "SBSMS", "onSms",[time]);
};
*/









/****************************************************************************************************************
 * @type {object} NHCProgressView : 로딩
 * **************************************************************************************************************/
$NS_OFA.NHCProgressView = {};

/**
- ASIS 
$NS_OFA.NPProgress.showProgress

@function NHCProgressView.show : 로딩바 보이기
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
*/
$NS_OFA.NHCProgressView.show = function(callback){
	fg.of.exec(callback, 'NHCProgressView','show',[]);
}

/**
- ASIS 
$NS_OFA.NPProgress.hideProgress

@function NHCProgressView.hide : 로딩바 숨기기
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
*/
$NS_OFA.NHCProgressView.hide = function(callback){
	fg.of.exec(callback, 'NHCProgressView','hide',[]);
}

/*
- ASIS
$NS_OFA.NPProgress.closeIntro = function(callback){
	fg.of.exec(callback, "SBProgress", "closeIntro",[]);
};
closeIntro ( iOS Only )
 */







/****************************************************************************************************************
 * storage ( 영속성) 관련 
 * **************************************************************************************************************
 */
/**
 * UserPreference ( 영속성 데이터 저장 : 앱을 지우기 전까지 유지 된다 ) 
 * @class NPUserPreference
 * @author FINGER Inc.
 * @version 1.0
 * @since 2018. 04
 */
$NS_OFA.UserPreference = {};
/** 
 * 네이티브 저장소에 데이터를 저장한다.(앱을 지우기 전까지 유지 된다)
 * @param {Function}			callback	
 * @param {JSON}				param = {params:[{"key":"","value":""},{"key":"","value":""}.............], viewId : }
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지	
 */
$NS_OFA.UserPreference.setValue = function(param,callback){
	fg.of.exec(callback, "SBUserPreference", "setValue", [param]);
};
/** 
 * 네이티브 저장소에 데이터를 저장한다.
 * @param {Function}			callback	
 * @param {JSON}				param = [{"key":key,"value":val}];
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지	
 */
$NS_OFA.UserPreference.getValue = function(param,callback ){
	fg.of.exec(callback, "SBUserPreference", "getValue", [[{'type' : 'value', 'params' : param}]]);
};
/** 
 * 네이티브 저장소에 데이터를 삭제한다.
 * @param {Function}			callback	
 * @param {JSON}				param = params:["key","key2",.............]
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터	0:성공, 1:실패
 *	obj.errorMessage : 에러메시지	
 */
$NS_OFA.UserPreference.remove = function(param,callback){
	fg.of.exec(callback, "SBUserPreference", "remove", [param]);
};

/****************************************************************************************************************
 * @type {object} NHCAppDataStore : 영속성 데이터(앱이 삭제되기 전까지 유지)
 * **************************************************************************************************************/
$NS_OFA.NHCAppDataStore = {};

/**
@function NHCAppDataStore.setData : 키-값 영속성 데이터 조회
@param {object} params
	{
		key : 저장할키명
		value : 저장할값
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
 */
$NS_OFA.NHCAppDataStore.setData = function(params,callback){
	fg.of.exec(callback, 'NHCAppDataStore','setData',params);
}

/**
@function NHCAppDataStore.getData : 키-값 영속성 데이터 조회
@param {object} params
	{
		key : 키
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
		{
			key값 : value값
		}
 */
$NS_OFA.NHCAppDataStore.getData = function(params,callback){
	fg.of.exec(callback, 'NHCAppDataStore','getData',params);
}

/**
@function NHCAppDataStore.removeData : 영속성 데이터 지우기
@param {object} params
	{
		key : 키
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
		?
 */
$NS_OFA.NHCAppDataStore.removeData = function(params,callback){
	fg.of.exec(callback, 'NHCAppDataStore','removeData',params);
}


/****************************************************************************************************************
 *  @type {object} NHCMemoryDataStore : 휘발성 데이터(앱이 종료될때까지 유지)
 * **************************************************************************************************************/
$NS_OFA.NHCMemoryDataStore = {};


/**
@function NHCMemoryDataStore.setData : 키-값 휘발성 데이터 조회
@param {object} params
	{
		key : 저장할키명
		value : 저장할값
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
 */
$NS_OFA.NHCMemoryDataStore.setData = function(params,callback){
	fg.of.exec(callback,'NHCMemoryDataStore','setData',params);
}

/**
@function NHCMemoryDataStore.getData : 키-값 휘발성 데이터 조회
@param {object} params
	{
		key : 키
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
		{
			key값 : value값
		}
 */
$NS_OFA.NHCMemoryDataStore.getData = function(params,callback){
	fg.of.exec(callback,'NHCMemoryDataStore','getData',params);
}

/**
@function NHCMemoryDataStore.removeData : 휘발성 데이터 지우기
@param {object} params
	{
		key : 키
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
		?
 */
$NS_OFA.NHCMemoryDataStore.removeData = function(params,callback){
	fg.of.exec(callback,'NHCMemoryDataStore','removeData',params);
}


/**************************************************************************************************************
 * @type {object} NHCSafeKeyboard : 보안키패드
 *************************************************************************************************************/
// - ASIS    $NS_OFA.SafeKeyboard = {};
$NS_OFA.NHCSafeKeyboard = {};

/**
- ASIS
$NS_OFA.SafeKeyboard.getChangeEncData = function(params,callback){
	fg.of.exec(callback, "SBSafeKeyboard", "getChangeEncData", ["char",params]);
};

@function NHCSafeKeyboard.encryptData : 보안키패드 실행없이 데이터 암호화
@param {object} params 
	{
		type : 'char',
		value : 데이터,
		publicKey : 공개키(생략시 기본값 적용)
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : {string} 결과데이터( 암호화데이터)
	obj.errorMessage : 에러메시지
 */
$NS_OFA.NHCSafeKeyboard.encryptData = function(params,callback){
	fg.of.exec(callback,'NHCSafeKeyboard','encryptData',params);
}

/**
- ASIS
$NS_OFA.SafeKeyboard.showKeyboard = function(params,callback){
	fg.of.exec(callback, "SBSafeKeyboard", "showKeyboard", params);
};

@function NHCSafeKeyboard.show : 보안키패드 실행
@param {object} params
	{
		type : 키보드 형식(text/number),
		name : "",
		length : "",	// TODO:
		maxLength : 최대길이,
		masking : 마스킹 여부(Y/'N),
		autoClose : 최대길이 입력한 경우 닫기 여부 (Y/N),
		title : 제목,
		subTitle : 보조 제목,
		locale : "",
		publicKey : 공개키(생략시 기본값 적용)
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
	{
		channel : "EFNS",
	    plaintxt : 클라이언트에서 복호화 할 수 있는 암호문 데이터,,
	    dummydata : 입력 데이터 대신에 사용 가능한 더미 데이터,,
	    encdata : 서버로 전달하는 암호화 데이터,
	    name : 한 화면에서 여러 개의 입력항목 사용시 설정한 값,
	    maskingdata : 마스킹 데이터,
	    type : : (0:입력 중, 1:입력완료),
	    aesencdata : ""
	}
	obj.errorMessage : 에러메시지
@description
	키 입력시 마다 callback 함수가 호출됨
 */
$NS_OFA.NHCSafeKeyboard.show = function(params,callback){
	fg.of.exec(callback,'NHCSafeKeyboard','show',params);
}

/**
- ASIS
$NS_OFA.SafeKeyboard.hideKeyboard = function(callback){
	fg.of.exec(callback, "SBSafeKeyboard", "hideKeyboard", []);
};

@function NHCSafeKeyboard.hide : 보안키패드 닫기
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
 */

$NS_OFA.NHCSafeKeyboard.hide = function(callback){
	fg.of.exec(callback,'NHCSafeKeyboard','hide',[]);
	// ios 에서 아래처럼 호출해야 커스텀이 내려
	if(OF.exeStatus == 5) {
		fg.of.exec(callback, "SBCustomKeyboard", "hide", []);
	}
}


/****************************************************************************************************************
 * @type {object} NHCWeb : 웹 브라우저
 ***************************************************************************************************************/
 $NS_OFA.NHCWeb = {};
 
/**
@function NHCWeb.openPage : 외부 브라우저 open
@param {object} params
	{
	  url : URL
	}
 */
$NS_OFA.NHCWeb.openPage = function(params,callback){
	fg.of.exec(callback, 'NHCWeb','openPage',params);
}


/****************************************************************************************************************
 * @type {object} NHCHttp : HTTP 통신
 ****************************************************************************************************************/
$NS_OFA.NHCHttp = {};

/**
-ASIS
$NS_OFA.NPHttp.sendNativeRequest 

@function NHCHttp.post : HTTP post 통신
@param {function} params
	{
		url : 호출 url
		params : [
			{ key : key, value : value}
			...
		]
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : http 통신 결과에따라
1. {string} 문자열
2. {object} JSON데이터
 */
$NS_OFA.NHCHttp.post = function(params,callback){
	fg.of.exec(callback, 'NHCHttp','post',params);
}

/**
@function NHCHttp.postJson : HTTP post 통신(매개변수 JSON 타입)
@param {function} params
	{
		url : 호출 url
		params : JSON 타입
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : JSON데이터
 */
$NS_OFA.NHCHttp.postJson = function(params,callback){
	fg.of.exec(callback, 'NHCHttp','postJson',params);
}


















































/****************************************************************************************************************
 *  @type {object} NHCOcr : OCR 
 ***************************************************************************************************************/
$NS_OFA.NHCOcr = {};

/**
@function NHCOcr.start : OCR 촬영
@param {object} params
	{
		serviceUrl : OCR 결과를 업로드할 서비스 URL,
		brc : 결과의 암호화를 위한 값
	}
@param {function} callback
@return callback(obj)
		obj.resultCode
		obj.result
			{
			    resultCode : 결과 코드("0" : 정상, "9998" : 5분 경과시 OCR 강제 종료, "9999" : 사용자 취소)
			    OCR_DATA_FNAME : "",
			    OCR_IMG_FNAME : "",
			    OCR_TYPE : 신분증 종류,
			    truth_code : "",
			    truth_msg : "",
			    tr_natv_no : ""
			}
		obj.errorMessage
			{
			  errorCode : 오류 코드("77777" : 카메라 권한 거부)
			}
 */
$NS_OFA.NHCOcr.start = function(params,callback){
	fg.of.exec(callback,'NHCOcr','start',params);
}


/****************************************************************************************************************
 * @type {object} NHCQr : QR코드
 ****************************************************************************************************************/
$NS_OFA.NHCQr = {};

/**
- ASIS
$NS_OFA.QRCODE = {};
$NS_OFA.QRCODE.getQrCode = function(type, which, callback){
	fg.of.exec(callback, "SBQrScan", "getQrCode",[type, which]);
};

@function NHCQr.scanQrCode QR코드 읽기
@param {object} params
	{
		type: (GIRO, EWALLET, BIO, PIN 중 선택)
		which: (QRCODE, NUMBER 중 선택)
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result
		{
			resultCode: 결과코드(0:성공, 1:실패)
			result
			{
				value: "http://m.naver.com"
	      	}
		}
 */
$NS_OFA.NHCQr.scanQrCode = function(params,callback){
	fg.of.exec(callback,'NHCQr','scanQrCode',params);
}


/****************************************************************************************************************
 * @type {object} NHCMobileOtp : 모바일 OTP
 ****************************************************************************************************************/
$NS_OFA.NHCMobileOtp = {};

/**
-ASIS
$NS_OFA.SBMobileOTP.getAllInfo = function(callback){
	fg.of.exec(callback, "NHCMobileOtp", "getAllInfo", []);
};

@function NHCMobileOtp.getAllInfo : 발급된 모바일 OTP 정보 조회
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result
		{
			serialNumber : 시리얼번호
			taVersion : TA 라이브러리 버전
		}
 */
$NS_OFA.NHCMobileOtp.getAllInfo = function(callback){
	fg.of.exec(callback,'NHCMobileOtp','getAllInfo',[]);
}

/**
-ASIS
$NS_OFA.SBMobileOTP.getInfo = function(callback){
	fg.of.exec(callback, "NHCMobileOtp", "getInfo", []);
};

@function NHCMobileOtp.getInfo : 발급된 모바일 OTP 시리얼번호 조회
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result
		{
			serialNumber : 시리얼번호
		}
 */
$NS_OFA.NHCMobileOtp.getInfo = function(callback){
	fg.of.exec(callback,'NHCMobileOtp','getInfo',[]);
}

/**
-ASIS
$NS_OFA.SBMobileOTP.getTaVersion = function(callback){
	fg.of.exec(callback, "SBMobileOTP", "getTaVersion", []);
};

@function NHCMobileOtp.getTaVersion : 모바일 OTP TA 버전 조회
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result
		{
			taVersion : TA 버전
		}
 */
$NS_OFA.NHCMobileOtp.getTaVersion = function(callback){
	fg.of.exec(callback,'NHCMobileOtp','getTaVersion',[]);
};

/**
-ASIS
$NS_OFA.SBMobileOTP.getMOTP = function(SerialNum,time,hti,bool,callback){
	fg.of.exec(callback, "SBMobileOTP", "getMOTP", [SerialNum,time,hti,bool]);
};

@function NHCMobileOtp.generateOtp : 모바일 OTP 번호 생성
@param {object} params
	{
		serialNum : 시리얼번호
		time : TODO
		hit :TODO
		encrypt : TODO
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result
		{
			TODO
		}
 */
$NS_OFA.NHCMobileOtp.generateOtp = function(params,callback){
	fg.of.exec(callback,'NHCMobileOtp','generateOtp',params);
}

/**
-ASIS
$NS_OFA.SBMobileOTP.issue = function(SerialNum,regDate,otpKey1,otpKey2,callback){
	fg.of.exec(callback, "SBMobileOTP", "issue", [SerialNum,regDate,otpKey1,otpKey2]);
};

@function NHCMobileOtp.issue : 모바일 OTP 발급
@param {object} params
	{
		serialNum : 시리얼번호
		issueDate : 발급일자
		otpKey1 : 키값1
		otpKey2 : 키값2
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	?
 */
$NS_OFA.NHCMobileOtp.issue = function(params,callback){
	fg.of.exec(callback,'NHCMobileOtp','issue',params);
};

/**
-ASIS
$NS_OFA.SBMobileOTP.dissue = function(SerialNum,callback){
	fg.of.exec(callback, "SBMobileOTP", "dissue", [SerialNum]);
};

@function NHCMobileOtp.? : 모바일 OTP키 및 데이터 폐기
			TODO: 
 */
/*$NS_OFA.NHCMobileOtp. = function(){
	fg.of.exec(callback,'NHCMobileOtp','',params);
};*/


/****************************************************************************************************************
 * @type {object} NHCMobileId : 모바일 운전면허증
 ****************************************************************************************************************/
$NS_OFA.NHCMobileId = {};

/**
- ASIS 
$NS_OFA.SBDrivingLicence = {};
$NS_OFA.SBDrivingLicence.requestFDidTransaction = function(params,callback){
	fg.of.exec(callback, "SBDrivingLicence", "requestFDidTransaction", params);
};

@function NHCMobileId.request : 모바일 운전면허증 모듈 호출
@param {object} params
	{
		method : 호출 메소드명 ("CHECK_INSTALL_MOBILEID" : 설치여부확인, requestM200 : 인증)
		data : 모바일신분증 앱 호출시의 암호화 데이터값(BASE64_DATA) 
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공(앱설치됨/인증성공), 1:실패(앱설치안됨/인증실패))
	?
 */
$NS_OFA.NHCMobileId.request = function(params,callback) {
	fg.of.exec(callback,'NHCMobileId','request',params);
}


/****************************************************************************************************************
 * @type {object} NHCFinCert : 금융인증서
 ****************************************************************************************************************/
$NS_OFA.NHCFinCert = {};

/**
@function NHCFinCert.request : 금융인증서 모듈 호출
@param {object} params
 1. 인증서 발급/재발급
	{
		"method":"issueCert",
		"params":
		{
			"refNum":"참조번호",
			"authCode":"인가번호"
		}
	}
2. 인증서 관리
	{
		"method":"manage"
	}
3. 로그인 			
	{
		"method":"login",
		"params" :
			{
				"polName":"LOGIN"
				"contents":[원문data]
			}
	}
4. 전자서명 
	{
		"method":"sign",
		"params":
		{
			"polName":"SIGN",
			"contents":[원문data],
			"certSeqNum":certSeqNum
			"type":"ETC",
		}
	}
5. 연결해제
	{
		"method":"disconnect"
	}
6. 연결확인
	{
		"method":"checkCloud"
	} 
7. 인증서 갱신
	{
		"method":"renewCert", 
		"params":
		{
			"certSeqNum":certSeqNum
		}
	}
8.  {} - 버전체크만  
@param {function} callback
@return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
	obj.errorMessage : 에러메시지
 */
$NS_OFA.NHCFinCert.request = function(params,callback){
	fg.of.exec(callback,'NHCFinCert','request',params);
};


/****************************************************************************************************************
 * @type {object} NHCJointCert : 공동인증서
 ****************************************************************************************************************/
$NS_OFA.NHCJointCert = {};

/**
- ASIS
$NS_OFA.Cert.getCertList = function(callback){
	fg.of.exec(callback, "SBCert", "getCertList",[]);
};

@function NHCJointCert.getCertificates : 공동인증서 리스트 가져오기
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result :
		[
			{
				subjectCn : 
				subjectDn : 
				certPolicy :
				serial :
				sigalgName :
				version :
				issuer :
				notBefore : 
				notAfter : 
				szCertStore : 10 / 11   (10 : 공용저장소 / 11 : 전용저장소)
				....
				인증서정보
			}
		]
 */
$NS_OFA.NHCJointCert.getCertificates = function(callback){
	fg.of.exec(callback,'NHCJointCert','getCertificates',[]); 
}

/**
-ASIS
$NS_OFA.Cert.getCertDetail = function(param , callback ){
	fg.of.exec(callback, "SBCert", "getCertDetail", {"subjectDn": param});
};

@function NHCJointCert.getCertDetail : 공동인증서 상세정보
@param {object} params
	{
		?
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	?
 */
$NS_OFA.NHCJointCert.getCertDetail = function(params,callback){
	fg.of.exec(callback,'NHCJointCert','getCertDetail',params); 
} 

// SBCertDetail 추가
$NS_OFA.NHCJointCert.getSBCertDetail = function(params,callback){
	fg.of.exec(callback,'NHCJointCert','getSBCertDetail',params); 
} 
/**
-ASIS
$NS_OFA.Cert.certLoginSign = function(iv, subjectDn, ppasswd , callback){
	fg.of.exec(callback, "SBCert", "certLoginSign", [iv,subjectDn,ppasswd]);
};

@function NHCJointCert.login : 공동인증서 로그인
@param {object} params
	{
		subjectDn : "",
		password : "",
		iv : "",
		data : ""
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 전자서명 값
 */
$NS_OFA.NHCJointCert.login = function(params,callback){
	fg.of.exec(callback,'NHCJointCert','login',params); 
}


/**
-ASIS
$NS_OFA.Cert.certSign = function(tbsData, subjectDn, ppasswd , callback){
	fg.of.exec(callback, "SBCert", "certSign", [tbsData,subjectDn,ppasswd,""]);
};
$NS_OFA.Cert.certSignSimple = function(tbsData, subjectDn, iv , callback){
	fg.of.exec(callback, "SBCert", "certSign", [tbsData,subjectDn,"",iv]);
};

@function NHCJointCert.sign : 공동인증서 전자서명
@param {object} params
	{
	  subjectDn : "cn=yessignCA,ou=AccreditedCA,o=yessign,c=kr",
	  data : "signData"
	  password : "pwd",			// 비간소화시 필수
	  iv : "iv",				// 간소화시 필수
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : {string} 결과데이터(전자서명값)
 */
$NS_OFA.NHCJointCert.sign = function(params,callback){
	fg.of.exec(callback,'NHCJointCert','sign',params); 
}

/**
-ASIS
$NS_OFA.Cert.certChangePassword = function(subjectDn, new_password , ppasswd, callback){
	fg.of.exec(callback, "SBCert", "certChangePassword", [subjectDn, new_password,ppasswd]);
};

@function NHCJointCert.certChangePassword : 공동인증서 비밀번호 변경
@param {object} params
	{
		?
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	?
 */
$NS_OFA.NHCJointCert.certChangePassword = function(params,callback){
	fg.of.exec(callback,'NHCJointCert','certChangePassword',params); 
}

/**
-ASIS
$NS_OFA.Cert.certChangePassword = function(subjectDn, new_password , ppasswd, callback){
	fg.of.exec(callback, "SBCert", "certChangePassword", [subjectDn, new_password,ppasswd]);
};

/**
-ASIS
$NS_OFA.Cert.getCertPassConfirm = function(subjectDn, ppasswd,callback){
	fg.of.exec(callback, "SBCert", "getCertPassConfirm", {"subjectDn": subjectDn, "ppasswd": ppasswd});
};

@function NHCJointCert.getCertPassConfirm : 공동인증서 비밀번호 확인
@param {object} params
	{
		subjectDn : 
		password : 
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 
		{
			resultCode : 패스워드 확인결과(SUCCESS:성공, FAIL:실패)
		}
 */
$NS_OFA.NHCJointCert.getCertPassConfirm = function(params,callback){
	fg.of.exec(callback,'NHCJointCert','getCertPassConfirm',params); 
}

/**
-ASIS
$NS_OFA.Cert.getCertIssueIn = function(password, caip, caport, refcode, passcode, regNum, signgate, callback){
	fg.of.exec(callback, "SBCert", "getCertIssueIn", [password, caip, caport, refcode, passcode, regNum, signgate]);
};

@function NHCJointCert.getCertIssueIn : 공동인증서 발급
@param {object} params
	{
		password :
		caIp :
		caPort :
		refCode :
		passCode :
		regNum   :
		signGate :
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	?
 */
$NS_OFA.NHCJointCert.getCertIssueIn = function(params,callback){
	fg.of.exec(callback,'NHCJointCert','getCertIssueIn',params); 
}


/**
-ASIS
$NS_OFA.Cert.getCertUpdate = function(subjectDn, password, new_pwd , caip, caport, callback){
	fg.of.exec(callback, "SBCert", "getCertUpdate", [subjectDn, password, new_pwd, caip , caport]);
};

@function NHCJointCert.getCertUpdate : 공동인증서 인증서 갱신
@param {object} params
	{
		?
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	?
 */
$NS_OFA.NHCJointCert.getCertUpdate = function(params,callback){
	fg.of.exec(callback,'NHCJointCert','getCertUpdate',params); 
}

/**
-ASIS
$NS_OFA.Cert.certDelete = function(param , callback ){
	fg.of.exec(callback, "SBCert", "certDelete", [param]);
};

@function NHCJointCert.certDelete : 공동인증서 삭제
@param {object} params
	{
		?
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	?
 */
$NS_OFA.NHCJointCert.certDelete = function(params,callback){
	fg.of.exec(callback,'NHCJointCert','certDelete',params); 
}

/**
-ASIS
*$NS_OFA.Cert.getRevokeCert = function(serial, cacode, callback){
	fg.of.exec(callback, "SBCert", "getRevokeCert",[serial,cacode]);
};

@function NHCJointCert.getRevokeCert : 공동인증서 폐기
@param {object} params
	{
		?
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	?
 */
$NS_OFA.NHCJointCert.getRevokeCert = function(params,callback){
	fg.of.exec(callback,'NHCJointCert','getRevokeCert',params); 
}

/**
-ASIS
$NS_OFA.Cert.certImport = function(password, authcode, downloadUrl, callback){
	fg.of.exec(callback, "SBCert", "certImport", [password, authcode,downloadUrl]);
};

@function NHCJointCert.certImport : 공동인증서 가져오기
@param {object} params
	{
		?
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	?
 */
$NS_OFA.NHCJointCert.certImport = function(params,callback){
	fg.of.exec(callback,'NHCJointCert','certImport',params); 
}

/**
-ASIS
$NS_OFA.Cert.certExport = function(subjectDn, password, authcode, uploadUrl, callback){
	fg.of.exec(callback, "SBCert", "certExport", [subjectDn, password, authcode, uploadUrl]);
};

@function NHCJointCert.certExport : 공동인증서 인증서 내보내기
@param {object} params
	{
		?
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	?
 */
$NS_OFA.NHCJointCert.certExport = function(params,callback){
	fg.of.exec(callback,'NHCJointCert','certExport',params); 
} 


/****************************************************************************************************************
 * @type {object}  SBPinCert : 간편뱅킹(PIN)
 ****************************************************************************************************************/
$NS_OFA.SBPinCert = {};

/**
- ASIS
$NS_OFA.NPPinCert.signByPin = function(encPin, loginSign, TBSData, type ,callback)

@function SBPinCert.signByPin :  간편뱅킹 전자서명
@param {object} params 
	{
		pinNumber : PIN암호화데이터
		loginSign : 
		tbsData : 
		simplifyType : 간소화처리플래그('Y'/'N')
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
	obj.errorMessage : 에러메시지
 */
$NS_OFA.SBPinCert.signByPin = function(params ,callback){
	fg.of.exec(callback,'SBPinCert','signByPin',params);
};

/**
@function SBPinCert.isInitBankCheck :  간편뱅킹 가입여부
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
	obj.errorMessage : 에러메시지
 */
$NS_OFA.SBPinCert.isInitBankCheck = function(callback){
	fg.of.exec(callback,"SBPinCert","isInitBankCheck",[]);
};

/**
- ASIS
$NS_OFA.SBPinCert.loginByPin = function(pinNumber,loginSign,callback)

@function SBPinCert.loginByPin :  간편뱅킹 로그인
@param {object} params 
	{
		pinNumber : PIN암호화데이터
		loginSign :
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
	obj.errorMessage : 에러메시지
 */
$NS_OFA.SBPinCert.loginByPin = function(params,callback){
	fg.of.exec(callback,"SBPinCert","loginByPin",params);
};

/**
@function SBPinCert.getPinKid : 간편뱅킹 KID 조회
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
	obj.errorMessage : 에러메시지
 */
$NS_OFA.SBPinCert.getPinKid = function(callback){
	fg.of.exec(callback,"SBPinCert","getPinKid",[]);
};

/**
@function SBPinCert.srpDelete : 간편뱅킹 인증서 삭제
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
	obj.errorMessage : 에러메시지
 */
$NS_OFA.SBPinCert.srpDelete = function(callback){
	fg.of.exec(callback,"SBPinCert","srpDelete",[]);
};

/**
@function SBPinCert.registerByPin :  간편뱅킹 가입
@param {object} params 
	{
		userId : 사용자id
		pinNumber = 간편비밀번호
		invtEmpEno = 권유직원
		amnBrc = 관리영업점
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result : 결과데이터
	obj.errorMessage : 에러메시지			
 */
$NS_OFA.SBPinCert.registerByPin = function(params,callback){
	fg.of.exec(callback,"SBPinCert","registerByPin",params);
};


/**************************************************************************************************************
 * @type {object} ? : 뱅크ID	// TODO : NHC 전환대상
 **************************************************************************************************************/
/*$NS_OFA.SBBankID = {};
$NS_OFA.SBBankID.requestFDidTransaction = function(params,callback){
	fg.of.exec(callback, "SBBankID", "requestFDidTransaction", params);
};*/

/****************************************************************************************************************
 * 뱅크아이디 모듈 호출
 * **************************************************************************************************************
 */
$NS_OFA.SBBankID = {};
$NS_OFA.SBBankID.requestFDidTransaction = function(params,callback){
	fg.of.exec(callback, "SBBankID", "requestFDidTransaction", params);
};


































/** 
 * checkPattern 가입여부확인 패턴
 * @param {Function}			callback	
 * @param {JSON}				{}
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.result : 결과데이터 {}	
 *	obj.errorMessage : 에러메시지	  
 */
/*$NS_OFA.NHMobileCert.checkPattern = function(params,callback){
	fg.of.exec(callback, "NHMobileCert", "checkPattern", [params]);
};
*/
/** 
 * checkBio 지문인증지원여부 서비스 등록여부
 * @param {Function}			callback	
 * @param {JSON}				{}
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.result : 결과데이터 {}	
 *	obj.errorMessage : 에러메시지	 
 */
/*$NS_OFA.NHMobileCert.checkBio = function(params,callback){
	fg.of.exec(callback, "NHMobileCert", "checkBio", [params]);
};
*/

/** 
 * authCust 사용자인증
 * @param {Function}			callback	
 * @param {JSON}				{"CRTC_PTRN_DCD":"인증유형구분코드(10:PIN)"
 *                               , "CRTC_PTRN_DATA_CON":"인증유형데이터내용(Nfilter에서 암호화된 PIN번호)"
 *                               }
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.result : 결과데이터 {"CERT_VRFC_SUCC_YN":"인증서검증성공여부"
 *						, "CERT_STTS_DCD":"인증서상태구분코드(10:발급, 50:폐기)"
 *						, "PIN_EROR_CNT":"핀오류횟수"
 *						, "PIN_MAX_EROR_ALWN_CNT":"핀최대오류허용건수"
 *						, "PTN_USE_YN":"패턴사용여부"
 *						, "PTN_EROR_CNT":"패턴오류횟수"
 *						, "PTN_MAX_EROR_ALWN_CNT":"패턴최대오류허용건수"
 *						, "BIO_USE_YN":"BIO사용여부"
 *						, "BIO_EROR_CNT":"BIO오류횟수"
 *						, "BIO_MAX_EROR_ALWN_CNT":"BIO최대오류허용건수"
 *						}	
 *	obj.errorMessage : 에러메시지	 
 */
/*$NS_OFA.NHMobileCert.authCust = function(params,callback){
	//RA인증서구분코드, 요청채널구분코드설정
	$.extend(params, $NS_OFA.NHMobileCert.initParam);
	fg.of.exec(callback, "NHMobileCert", "authCust", [params]);
};
*/
/** 
 * registPattern 패턴등록
 * @param {Function}			callback	
 * @param {JSON}				{"PTN_DATA_CON":"패턴데이터내용"
 *                               , "pthPbkdf2Data":"패턴데이터 Hash 값"
 *                               , "pinPbkdf2Data":"PIN데이터 Hash 값"
 *                               }
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.result : 결과데이터 {"CERT_VRFC_SUCC_YN":"인증서검증성공여부"
 *						, "CERT_STTS_DCD":"인증서상태구분코드(10:발급, 50:폐기)"
 *						}	
 *	obj.errorMessage : 에러메시지	 
 */
/*$NS_OFA.NHMobileCert.registPattern = function(params,callback){
	//RA인증서구분코드, 요청채널구분코드설정
	$.extend(params, $NS_OFA.NHMobileCert.initParam);
	fg.of.exec(callback, "NHMobileCert", "registPattern", [params]);
};
*/
/** 
 * registBio BIO등록
 * @param {Function}			callback	
 * @param {JSON}				{"pinPbkdf2Data":"PIN데이터 Hash 값"
 *                               }
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.result : 결과데이터 {"CERT_VRFC_SUCC_YN":"인증서검증성공여부"
 *						, "CERT_STTS_DCD":"인증서상태구분코드(10:발급, 50:폐기)"
 *						}	
 *	obj.errorMessage : 에러메시지	 
 */
/*$NS_OFA.NHMobileCert.registBio = function(params,callback){
	//RA인증서구분코드, 요청채널구분코드설정
	$.extend(params, $NS_OFA.NHMobileCert.initParam);
	fg.of.exec(callback, "NHMobileCert", "registBio", [params]);
};*/

/** 
 * changePin 핀 변경
 * @param {Function}			callback	
 * @param {JSON}				{"PIN_DATA_CON":"PIN데이터내용"
 *                               , "FMTS_PIN_DATA_CON":"이전PIN데이터내용"
 *                               , "pinPbkdf2Data":"PIN데이터 Hash 값"
 *                               , "fmtsPinPbkdf2Data":"이전 PIN데이터 Hash 값"
 *                               }
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.result : 결과데이터 {"CERT_VRFC_SUCC_YN":"인증서검증성공여부"
 *						, "CERT_STTS_DCD":"인증서상태구분코드(10:발급, 50:폐기)"
 *						}	
 *	obj.errorMessage : 에러메시지	 	 
 */
/*$NS_OFA.NHMobileCert.changePin = function(params,callback){
	//RA인증서구분코드, 요청채널구분코드설정
	$.extend(params, $NS_OFA.NHMobileCert.initParam);
	fg.of.exec(callback, "NHMobileCert", "changePin", [params]);
};*/

/** 
 * disusePattern 폐기(해지) 패턴
 * @param {JSON}				{"pinPbkdf2Data":"PIN데이터 Hash 값"
 *                               }
 * @param {Function}			callback	
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.errorMessage : 에러메시지	 
 */
/*$NS_OFA.NHMobileCert.disusePattern = function(params,callback){
	//RA인증서구분코드, 요청채널구분코드설정
	$.extend(params, $NS_OFA.NHMobileCert.initParam);
	fg.of.exec(callback, "NHMobileCert", "disusePattern", [params]);
};*/

/** 
 * disuseBio 폐기(해지) 지문
 * @param {JSON}				{"pinPbkdf2Data":"PIN데이터 Hash 값"
 *                               }
 * @param {Function}			callback	
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.errorMessage : 에러메시지	
 */
/*$NS_OFA.NHMobileCert.disuseBio = function(params,callback){
	//RA인증서구분코드, 요청채널구분코드설정
	$.extend(params, $NS_OFA.NHMobileCert.initParam);
	fg.of.exec(callback, "NHMobileCert", "disuseBio", [params]);
};*/

/** 
 * revokeCert 인증서 폐기
 * @param {JSON}				{"CUST_NO":"고객번호"
 *                               , "CUST_ID":"고객ID"
 *                               , "DCRD_DCD":"폐기사유구분코드"
 *                               , "CRTC_PTRN_DCD":"인증유형구분코드(10:PIN)"
 *                               , "CRTC_PTRN_DATA_CON":"인증유형데이터내용(Nfilter에서 암호화된 PIN번호)"
 *                               }
 * @param {Function}			callback	
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.errorMessage : 에러메시지	 
 */
/*$NS_OFA.NHMobileCert.revokeCert = function(params,callback){
	//RA인증서구분코드, 요청채널구분코드설정
	$.extend(params, $NS_OFA.NHMobileCert.initParam);
	fg.of.exec(callback, "NHMobileCert", "revokeCert", [params]);
};*/

/** 
 * sign 전자서명(바이오)
 * @param {Function}			callback	
 * @param {JSON}				{"SIGN_DATA":"전자서명 원문 데이터"
 *                               }
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.result : 결과데이터 {"pkcs7Data":"전자서명 데이터"
 *						, "bioSign":"Bio 검증 결과값"
 *						}	
 *	obj.errorMessage : 에러메시지	  
 */
/*$NS_OFA.NHMobileCert.signBio = function(params,callback){
	//RA인증서구분코드, 요청채널구분코드설정
	$.extend(params, $NS_OFA.NHMobileCert.initParam);
	fg.of.exec(callback, "NHMobileCert", "signBio", [params]);
};
*/

/** 
 * showRaKeyboard Nfilter 키보드 호출(RA 세션키)
 * @param {Function}			callback	
 * @param {JSON}				{	"name": test",
									"type":"text or number",
									"maxLength":50,
									"length":10,
									"masking":0(none), 1(default), 2(전부 마스킹)
									"callbackFn" : "keyboardCallback"
									"title":"now is testing",
									"maxLengthOk" : "Y"(default 자동off) "N"(자동off 안함)
									"locale" : 'ko'
								}
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.result : 결과데이터 {"dummydata":더미데이터,"plaintxt":"","encdata":"", "aesencdata":""}	
 *	obj.errorMessage : 에러메시지	 
 */
/*$NS_OFA.NHMobileCert.showRaKeyboard = function(params,callback){
	fg.of.exec(callback, "NHMobileCert", "showRaKeyboard", [params]);
};*/

/** 
 * showRaPatternLock  Nfilter 패턴락 호출(RA 세션키)
 * @param {JSON}				{	"name": test",
									"minLength":4,
									"callbackFn" : "patternCallback"
								}
 * @param {Function}			callback	
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.result : 결과데이터 {"encData":""}	
 *	obj.errorMessage : 에러메시지	 
 */
/*$NS_OFA.NHMobileCert.showRaPatternLock = function(params,callback){
	fg.of.exec(callback, "NHMobileCert", "showRaPatternLock", [params]);
};
*/
/** 
 * hideRaKeyboard  Nfilter 키보드 닫기
 * @param {Function}			callback
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.errorMessage : 에러메시지	 
 */
/*$NS_OFA.NHMobileCert.hideRaKeyboard = function(params,callback){
	if(params == undefined){params={};}
	fg.of.exec(callback, "NHMobileCert", "hideRaKeyboard",[params]);
};*/

/** 
 * hideRaPatternLock  Nfilter 패턴락 닫기
 * @param {Function}			callback
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.errorMessage : 에러메시지	 
 */
/*$NS_OFA.NHMobileCert.hideRaPatternLock = function(params,callback){
	if(params == undefined){params={};}
	fg.of.exec(callback, "NHMobileCert", "hideRaPatternLock",[params]);
};*/


/**************************************************************************************************************
 * @type {object} SBNHMobileCert : NH모바일인증서
 **************************************************************************************************************/
$NS_OFA.SBNHMobileCert = {};

/**
@type {object} SBNHMobileCert.initParam : 모바일 인증서 관련 상수 정의
@description 
	RA_CERT_DCD:RA인증서구분코드
	RQST_CHNL_DCD:요청채널구분코드
 */
$NS_OFA.SBNHMobileCert.initParam = {
	RA_CERT_DCD : "001"
	, RQST_CHNL_DCD : "NHSP"
};

/**
-ASIS
$NS_OFA.NHMobileCert.issue = function(params,callback){
	//RA인증서구분코드, 요청채널구분코드설정
	$.extend(params, $NS_OFA.NHMobileCert.initParam);
	fg.of.exec(callback, "NHMobileCert", "issue", [params]);
};

@function SBNHMobileCert.openNHCert : 모바일인증서 발급공통시스템 연동
@param {object} params
	{
		type : ?
		uid : ?
		accessToken : ?
		chn : ?
		locale : ?
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	?
 */
$NS_OFA.SBNHMobileCert.openNHCert = function(params, callback){
	fg.of.exec(callback, "SBNHMobileCert", "openNHCert", params);
};

/**
-ASIS
$NS_OFA.NHMobileCert.sign = function(params,callback){
	//RA인증서구분코드, 요청채널구분코드설정
	$.extend(params, $NS_OFA.NHMobileCert.initParam);
	fg.of.exec(callback, "NHMobileCert", "sign", [params]);
};

$NS_OFA.NHMobileCert.verifyCertTran = function(params,callback){
	//RA인증서구분코드, 요청채널구분코드설정
	$.extend(params, $NS_OFA.NHMobileCert.initParam);
	fg.of.exec(callback, "NHMobileCert", "verifyCertTran", [params]);
};


@function SBNHMobileCert.openSignView : 모바일인증서 로그인/전자서명
@param {object} params
	{
		RA_CERT_DCD : RA인증서구분코드
		RQST_CHNL_DCD : 요청채널구분코드
		SIGN_DATA : 서명값
		sessionEncKeyYn : ?
		locale : 언어
		?
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result
		{
			resultCode : 결과코드(0:성공, 1:실패)
			result
			{
				"CUST_CCTN_MCTL_OPSS_DCD":"01"
		        ,"CUST_ID": 고객아이디
		         ,"DCRD_TS":" "
		         ,"BIO_MAX_EROR_ALWN_CNT":"0"
		         ,"CERT_TP_CD":"10"
		         ,"BIO_EROR_CNT":"0"
		         ,"PTN_MAX_EROR_ALWN_CNT":"0"
		         ,"LAST_CERT_VRFC_TS":"20240625095043396"
		         ,"CERT_SEQ_NO":"001000467503"
		         ,"MSB_VRSN_VL":"f8ae755e13d8ab49"
		         ,"PTN_USE_YN": 패턴 인증 여부
		         ,"pkcs7Data": 전자서명 암호화 값
		         ,"LAST_CERT_TRAN_VRFC_TS":" "
		         ,"RA_CERT_DCD":"001"
		         ,"encdata": 핀/패턴 암호화 데이터
		         ,"CERT_STTS_DCD":"10"
		         ,"CRTC_PTRN_DCD":"10"
		         ,"BIO_USE_YN": 바이오 인증 여부
		         ,"CUST_CCTN_MCTL_MDL_NM": 고객 기기 모델
		         ,"CUST_NAME": 고객 성명
		         ,"PIN_EROR_CNT":"0"
		         ,"CUST_NO": 고객번호
		         ,"DCRD_YN":"N"
		         ,"PTN_EROR_CNT":"0"
		         ,"OFFICE_CD":"001183"
		         ,"ISNC_TS":"20240624182612571"
		         ,"VLTE_EXPY_YMD":"20270624"
		         ,"PIN_MAX_EROR_ALWN_CNT":"5"
		         ,"CUST_CCTN_MCTL_ID": 기기 정보
		         ,"NH_CERT_DCD":"B"
		         ,"CUST_CCTN_MCTL_OPSS_VRSN_VL":"16.7.7"
		         ,"CUST_HP": 전화번호
		         ,"VLTE_STTG_YMD":"20240624"
			}
		}
 */
$NS_OFA.SBNHMobileCert.openSignView = function(params, callback){
	fg.of.exec(callback, "SBNHMobileCert", "openSignView", params);
};

/**
-ASIS
$NS_OFA.NHMobileCert.simplifySign = function(params,callback){
	//RA인증서구분코드, 요청채널구분코드설정
	$.extend(params, $NS_OFA.NHMobileCert.initParam);
	fg.of.exec(callback, "NHMobileCert", "simplifySign", [params]);
};

@function SBNHMobileCert.simplifyNHSign : 모바일인증서 전자서명 간소화
@param {object} params
	{
		RA_CERT_DCD : RA인증서구분코드
		RQST_CHNL_DCD : 요청채널구분코드
		SIGN_DATA : 전자서명값
		
		ASIS
		"CRTC_PTRN_DCD":"인증유형구분코드(10:PIN, 20:패턴, 30:BIO)"
 	      "signData":"전자서명 원문 데이터"
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result
		{
			pkcs7Data : 전자서명 암호화 데이터
			?
		}
 */
$NS_OFA.SBNHMobileCert.simplifyNHSign = function(params, callback){
	fg.of.exec(callback, "SBNHMobileCert", "simplifyNHSign", params);
};

/**
-ASIS
$NS_OFA.NHMobileCert.checkCert = function(params,callback){
	//RA인증서구분코드, 요청채널구분코드설정
	$.extend(params, $NS_OFA.NHMobileCert.initParam);
	fg.of.exec(callback, "NHMobileCert", "checkCert", [params]);
};

@function SBNHMobileCert.checkCert : 모바일인증서 인증 체크
@param {object} params
	{
		RA_CERT_DCD : RA인증서구분코드
		RQST_CHNL_DCD : 요청채널구분코드
	}
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
	obj.result
		{
			"CERT_SEQ_NO":"인증서일련번호"
			"MSB_VRSN_VL":"MSB버전값"
			"CUST_CCTN_MCTL_ID":"고객접속기기ID"
			"CUST_NO":"고객번호"
			"CUST_ID":"고객ID"
			"CERT_STTS_DCD":"인증서상태구분코드(10:발급, 50:폐기)"
			"VLTE_STTG_YMD":"유효기간시작년월일"
			"VLTE_EXPY_YMD":"유효기간만료년월일"
			"ISNC_TS":"발급일시"
			"DCRD_TS":"폐기일시"
			"LAST_CERT_VRFC_TS":"최종인증서검증일시"
			"LAST_CERT_TRAN_VRFC_TS":"최종인증서거래검증일시"
			"CUST_CCTN_MCTL_OPSS_DCD":"고객접속기기OS구분코드"
			"CUST_CCTN_MCTL_OPSS_VRSN_VL":"고객접속기기OS버전값"
			"CUST_CCTN_MCTL_MDL_NM":"고객접속기기모델명"
			"PIN_EROR_CNT":"핀오류횟수"
			"PIN_MAX_EROR_ALWN_CNT":"핀최대오류허용건수"
			"PTN_USE_YN":"패턴사용여부"
			"PTN_EROR_CNT":"패턴오류횟수"
			"PTN_MAX_EROR_ALWN_CNT":"패턴최대오류허용건수"
			"BIO_USE_YN":"BIO사용여부"
			"BIO_EROR_CNT":"BIO오류횟수"
			"BIO_MAX_EROR_ALWN_CNT":"BIO최대오류허용건수"
		}
	obj.errorMessage : 에러메시지
 */
$NS_OFA.SBNHMobileCert.checkCert = function(params,callback){
	params = Object.Assign(params,$NS_OFA.SBNHMobileCert.initParam);
	fg.of.exec(callback, "SBNHMobileCert", "checkCert", params);
};

/**
@function SBNHMobileCert.checkPattern : 모바일인증서 패턴인증 사용가능 여부
@param ?
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공, 1:실패)
 */
/*$NS_OFA.SBNHMobileCert.checkPattern = function(params,callback){
	fg.of.exec(callback, "SBNHMobileCert", "checkPattern", params);
}*/

/**
TOBE 라이브러리 미지원으로 인한 삭제 => CheckCert?????

@function SBNHMobileCert.checkBio : 모바일인증서 바이오인증 사용가능 여부
@param ?
@param {function} callback
@return callback(obj)
	obj.resultCode : 결과코드(0:성공/바이오인증정보있음, 1:실패/바이오인증정보없음)
 */
/*$NS_OFA.SBNHMobileCert.checkBio = function(params,callback){
	fg.of.exec(callback, "SBNHMobileCert", "checkBio", params);
};*/



/****************************************************************************************************************
 * Scrapping
 * **************************************************************************************************************
 */

/**
 * MFSAS
 * @class MFSAS
 * @author FINGER Inc.
 * @version 1.0
 * @since 2018. 08
 */
$NS_OFA.MFSAS = {};
/**
 * 스크래핑 호출
 * @return callback(obj) : 스크래핑 요청 정보
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터 
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.MFSAS.runSAS = function(param,callback){
	fg.of.exec(callback, "MFSAS", "runSAS", param);
};

/**
 * SBMainUI
 * @class SBMainUI
 * @version 1.0
 * @since 2024. 09
 */
$NS_OFA.SBMainUI = {};

/**
 * 잔액 응답 처리
 * @return callback(obj) : 변경 잔액 파라미터와 잔액조회 결과값
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 결과데이터 
 *	obj.errorMessage : 에러메시지			
 */
$NS_OFA.SBMainUI.switchValance = function(param,callback){
	fg.of.exec(callback, "SBMainUI", "switchValance", param);
};

$NS_OFA.PFMSign = {};
/** 
 * Cert 인증서 리스트 가져오기
 * @param {Function}			callback	
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 인증서 리스트
 *	obj.errorMessage : 에러메시지	 
 */
$NS_OFA.PFMSign.requestSign = function(requestJson, subjectDn, certKey,callback){
	fg.of.exec(callback, "mydata.PFMSign", "requestSign",{"requestJson" : requestJson, "subjectDn" :subjectDn, "certKey" : certKey});
};
/** 
 * 네이버 사설인증 진행
 * @param {Function}			callback	
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 */
$NS_OFA.PFMSign.requestSignAppToApp = function(requestJson, callback){
	fg.of.exec(callback, "mydata.PFMSign", "requestSignAppToApp",{"requestJson" : requestJson});
};

/** 
 * 사설인증 웹뷰 진행
 * @param {Function}			callback	
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 */
$NS_OFA.PFMSign.requestSignFinCert = function(params, callback){
	fg.of.exec(callback, "mydata.PFMSign", "requestSignFinCert", params);
};

/** 
 * PASS 사설인증 웹뷰 진행
 * @param {Function}			callback	
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 */
$NS_OFA.PFMSign.requestSignPass = function(params, callback){
	fg.of.exec(callback, "mydata.PFMSign", "requestSignPass", params);
};
/** 
 * PASS 신규웹뷰 앱 설치 링크 호출
 * @param {Function}			callback	
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 */
$NS_OFA.PFMSign.openMarket = function(params, callback){
	fg.of.exec(callback, "mydata.PFMSign", "openMarket", params);
};

/****************************************************************************************************************
 * 네이티브 웹뷰 추가
 * **************************************************************************************************************
 */
$NS_OFA.PFMView = {};
/** 
 * 웹뷰 띄우기
 * @param {Function}		callback	
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 인증서 리스트
 *	obj.errorMessage : 에러메시지	 
 */
$NS_OFA.PFMView.openPopupWebView = function(url,callback){
	fg.of.exec(callback, "mydata.PFMView", "openPopupWebView", [url]);
};
/** 
 * App 띄우기
 * @param {Function}		callback	
 * @return callback(obj) : 정의한 callback 함수에 JSON형식의 결과값 전달
 * 	obj.resultCode : 결과코드 	 0:성공, 1:실패
 *	obj.request.params : 전달한 param
 *	obj.result : 인증서 리스트
 *	obj.errorMessage : 에러메시지	 
 */
$NS_OFA.PFMView.authAppToApp = function(app_scheme_android, install_url_android,app_scheme_iOS,install_url_iOS,callback){
	fg.of.exec(callback, "mydata.PFMView", "authAppToApp", {"app_scheme_android":app_scheme_android, "install_url_android":install_url_android,"app_scheme_iOS":app_scheme_iOS,"install_url_iOS":install_url_iOS});
};

window.fg = fg