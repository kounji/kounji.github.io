var $SMNATIVE = {
	/**
	* 콜백함수
	*/
	CALLBACK_FUNCTION : [],
	/**
	* 호출쪽에서 지정한 콜백함수로 전달
	* @param response(JSON) : 결과값
	*/
	BRIDGE_CALLBACK : function(resObj){
		console.log('BRIDGE_CALLBACK', JSON.stringify(resObj));
		if(typeof resObj === "string")
			resObj = JSON.parse(resObj);

		//var bridgeObj = this.getOS("A") ? resObj : JSON.parse(resObj);
		var bridgeObj = resObj; //resObj.request Mydata용으로 수정됨

		console.log('bridgeObj ', bridgeObj);

		var _FUNCTION_INFO = "";
		var _FUNCTION = "";

		for(var i=0; i<$SMNATIVE.CALLBACK_FUNCTION.length; i++){
			_FUNCTION_INFO = $SMNATIVE.CALLBACK_FUNCTION[i];
			if($.trim(bridgeObj.method) == $.trim(_FUNCTION_INFO.method)){
				_FUNCTION = _FUNCTION_INFO.callBack;
				$SMNATIVE.CALLBACK_FUNCTION.splice(i, 1);
				break;
			}
		}

		if(!this.isNull(_FUNCTION)){
			if(typeof _FUNCTION === "function"){
				_FUNCTION(resObj);
			} else {
				try{
					window[_FUNCTION](resObj);
				}catch(e){
					eval(_FUNCTION)(resObj);
				}
			}
		}
	},
	/**
	* 네이티브 실행 함수
	* @param data
	* @param type : "I":iOS만 실행, "A":Android만 실행, 그외는 단말OS에 따라 실행
	*/
	execute : function(_data, _type){
		//window.MyData.runFunc("nhcokbank:///#" + _data);
		
		// 아이폰만 실행
		if($.trim(_type) == "I"){
			if (this.getOS(_type)){
			// 네이티브 호출함수 변경으로 인한 구분
			if(_data.indexOf("cokbankapp:") == -1) alert("nhcokbank:///#" +_data);
			else
				alert(_data);
			}
		} else if($.trim(_type) == "A") { // 안드로이드만 실행
			if (this.getOS(_type)) {
				// 네이티브 호출함수 변경으로 인한 구분
				if(_data.indexOf("cokbankapp:") == -1)
					window.MyData.runFunc("nhcokbank:///#" + _data);
				else
					window.MyData.runFunc(_data);
			}
		} else { // 단말OS에 따라 실행
			// 아이폰
			if (this.getOS("I")){
				// 네이티브 호출함수 변경으로 인한 구분
				if(_data.indexOf("cokbankapp:") == -1) alert("nhcokbank:///#" +_data);
				else
				alert(_data);
			} else if (this.getOS("A")){ // 안드로이드
				// 네이티브 호출함수 변경으로 인한 구분
				if(_data.indexOf("cokbankapp:") == -1)
					window.MyData.runFunc("nhcokbank:///#" + _data);
				else
					window.MyData.runFunc(_data);
			}
		}
	},
	/**
	 * NULL 체크
	 * @param obj
	 * @returns
	 */
	isNull : function (obj) {
		return (obj == undefined || obj == null || obj == "");
	},
	/**
	 * 단말 OS 구분
	 * @returns {Boolean}
	 */
	getOS : function(_os) {
		var agent = navigator.userAgent;
		// iOS
		if(_os.toUpperCase() == "I"){
			if (agent.match(/iPhone/) != null || agent.match(/iPod/) != null || agent.match(/iPad/) != null) 
				return true;
		}
		// Android
		else if(_os.toUpperCase() == "A") {
			if (agent.match(/Android/) != null)	
				return true;
		}
		return false;
	},	
	closeCommWebView : function() {
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"closeCommWebView","callBack": function(){}});
		$SMNATIVE.execute(JSON.stringify({method:"closeCommWebView", params:[{}], callback:"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// 인증서 가져오기.
	getCertList : function(callback){
		// console.log('getCertList', callback)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"getCertList","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"getCertList", params:[{}], "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// 키패드 호출
	showKeyboard : function(callback){
		// console.log('showKeyboard', callback)
		const keyParams = {
			type: 'text',
			maxLength: 64,
			title: '인증서 비밀번호',
			masking: 1,
			maxLengthOk: 'Y',
			name: 'certPasswd',
			length: 64,
			callbackFn: 'callback',
			locale: 'k',
			PublicKey : 'MDIwGhMABBYDA3yRveHjcoZZPx6FMrx5VD6+IN5TBBRMYCPlpZWOicwPEJEiGbnViUSHXw=='
		  }
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"showKeyboard","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"showKeyboard", params:keyParams, "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// 공인인증서 비밀번호 확인.
	getCertPassConfirm : function(callback, params){
		// console.log('getCertPassConfirm', callback)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"getCertPassConfirm","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"getCertPassConfirm", params:params, "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// 전자서명
	requestSign : function(callback, params){
		// console.log('requestSign', callback)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"requestSign","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"requestSign", params:params, "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// 사설인증 전자서명
	requestFinCert : function(callback, params){
		// console.log('requestSign', callback)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"requestSignFinCert","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"requestSignFinCert", params:params, "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// PASS 사설인증 전자서명
	requestFinCertPass : function(callback, params){
		// console.log('requestSign', callback)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"requestSignPass","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"requestSignPass", params:params, "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// PASS 앱 설치 링크 URL 
	requestPassMarketUrl : function(callback, params){
		// console.log('requestSign', callback)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"openMarket","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"openMarket", params:params, "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// 로딩바 show
	showProgress : function(callback){
		// console.log('showProgress', callback)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"showProgress","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"showProgress", params:[{}], "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// 로딩바 hide
	hideProgress : function(callback){
		// console.log('hideProgress', callback)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"hideProgress","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"hideProgress", params:[{}], "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// 콕뱅 홈으로 이동
	goHome : function(callback){
		console.log('goHome', callback)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"goHome","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"goHome", params:[{}], "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// 콕뱅 페이지 이동
	goMove : function(callback, url){
		console.log('goMove', callback, url)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"goMove","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"goMove", params:[url], "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},	
	// 웹뷰 띄우기
	openPopupWebView : function(callback, url){
		console.log('openPopupWebView', callback, url)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"openPopupWebView","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"openPopupWebView", params:[url], "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// 앱 띄우기(개별인증)
	authAppToApp : function(callback, params){
		console.log('authAppToApp', callback, params)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"authAppToApp","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"authAppToApp", params:params, "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// 웹뷰 띄우기
	openPopupWebBrowser : function(callback, url){
		console.log('openPopupWebBrowser', callback, url)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"openPopupWebBrowser","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"openPopupWebBrowser", params:[url], "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
	// 세션연장
	refreshSession : function(callback){
		console.log('refreshSession', callback)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"refreshSession","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"refreshSession", params:[{}], "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},	
	// 콕뱅 햄버거메뉴 이동
	showMenu : function(callback){
		console.log('showMenu', callback)
		$SMNATIVE.CALLBACK_FUNCTION.push({"method":"showMenu","callBack": callback});
		$SMNATIVE.execute(JSON.stringify({"method":"showMenu", params:[{}], "callback":"window.$SMNATIVE.BRIDGE_CALLBACK"}));
	},
}

window.$SMNATIVE = $SMNATIVE