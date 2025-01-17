;$(function(){ 
	hanaUI.init();
	
});

const possibleChar = "[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ~!@#$%^&*()-_+=`:;'\"{}|<>?\ \u318D\u119E\u11A2\u2022\u2025\u00B7\uFE55가각간갇갈갉갊감갑값갓갔강갖갗같갚갛개객갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫났낭낮낯낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫달닭닮닯닳담답닷닸당닺닻닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많맏말맑맒맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바박밖밗반받발밝밞밟밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤샥샨샬샴샵샷샹섀섄섈섐섕서석섞섟선섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄업없엇었엉엊엌엎에엑엔엘엠엡엣엥여역엮연열엶엷염엽엾엿였영옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응읒읓읔읕읖읗의읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝]";
var hanaUI = {
		
	init : function(obj){

		function init(obj){
			/* Common UI */
			//hanaUI.bgGray();	//gray 배경 - 컨텐츠 짧을 때
			hanaUI.isFooter('.app-footer');	//푸터 영역 유무
			hanaUI.inputMulti('.input-multi');	//인풋 두줄
			hanaUI.inputAuto('[data-element=input-auto]');	//인풋 width 자동
			hanaUI.inputField('.input-inner'); //인풋필드 기능
			hanaUI.toggleItem('[data-element=toggle-item]'); //토글-싱글
			hanaUI.cardTypeCheked('.card-type .list-item');	//카드타입 리스트 class
			hanaUI.tabAvtive('.tab-menu');
			hanaUI.sliderTabWrap();	//가로 스크롤 탭
			hanaUI.switchBtn('[data-element=asSwitch]');
			hanaUI.inputAmount('.container-amount');
			hanaUI.toolTip('.icon-tooltip'); //tooltip
			hanaUI.transListReceipt('.trans-list .list-item');	//거래내역 영수증 이중링크 막기
			
			//2차
			hanaUI.toastPopup('[data-element=toast]');	//토스트팝업

			hanaUI.inputTextProc(); // input text 처리
			hanaUI.native.bottomInit(); //스크린리더 접근시 하단 버튼 고정 풀기
        };

        init(obj);
	},

	/****************************
		Common UI
	*****************************/
	inputTextProc : function(){
		$("input[type=text], input[type=email]").off("keyup.inputTextEnterProc").on("keyup.inputTextEnterProc", function(e){
			if(e.which === 13){
				$(this).blur();
			}
		});
		$("input[type=text], input[type=email]").off("keydown.inputTextEnterProc").on("keydown.inputTextEnterProc", function(e){
			if(e.which === 13){
				$(this).blur();
			}
		});
		
		$("input[type=text], input[type=email], textarea").off("change.inputTextRegProc").on("change.inputTextRegProc", function(e){
			//console.log("keydown : " + $(this).val()); 
			const possibleCharReg = new RegExp(possibleChar, "gi");
			$(this).val($(this).val().replace(possibleCharReg, ""));
		});
		$("textarea").off("change.inputTextRegProc").on("change.inputTextRegProc", function(e){
			const possibleCharReg = new RegExp(possibleChar.substring(0, possibleChar.length-1) + "\n]", "gi");
			$(this).val($(this).val().replace(possibleCharReg, ""));
		});
	},
	bgGray : function(){
		if($('body').find('.app-contents').hasClass('bg-gray')){
			$('body').addClass('bg-gray');
		}
	},
	isFooter : function(obj){
		var $el = null;
		var $cont = null;
        
        function init(obj){
            $el = $(obj);
            $cont = $('body').find('.app-contents');
            
            if(!$('body').find($el).length){
            	$cont.addClass('no-footer');
            }
        };

        init(obj);
	},
	keypad : function(target, setTime){
        $('.input-elem').removeClass('key');
        target.addClass('key');
        if($('body').is('.ios') || $('body').is('.isResize')){ return }
        
        if(typeof setTime === "undefined") { setTime = 300 } 

        var windowHeight = window.innerHeight;
        
        $(window).on('resize', function(){
            $('body').addClass('isResize');
            setTimeout(function(){
                if(windowHeight == window.innerHeight){
                    $('.input-elem').each(function(i,e){
                        if($(e).is('.key')){
                            $(e).removeClass('key').trigger('blur');
                        }
                    })
                    $('body').removeClass('isResize');
                    $(window).off('resize');
                }    
            }, setTime)
        })
    },
    
    inputField : function(obj){
        var $el = null;
        var $input = null;
        var $clear = null;
        var $search = null;
        var $native = null;
        var windowHeight = 0;
        var $parent = null;

        function init(obj){
            $el = $(obj);
            $input = $el.find('.input-elem');
            $clear = $el.find('.icon-del');
            $search = $el.find('.icon-sch');
            $native = $('.native-inner[role=button]');
            windowHeight = window.innerHeight;

            for(var i=0; i<$input.length; i++){
                var $btn = $input.eq(i).closest($el).find($clear);
                if($input.eq(i).val() == '' || $input.eq(i).prop('disabled') == true || $input.eq(i).prop('readonly') == true){
                    $btn.hide();
                }else if($input.eq(i).val() != "") {
                    $btn.hide();
                //}else if($input.eq(i).val() != "" && !$input.eq(i).closest($el).is('.input--on')) {
                	//$btn.hide();
                    //$input.eq(i).closest($el).addClass('input--on');
                }else{
                    $btn.show();
                    //$input.eq(i).closest($el).addClass('input--on');
                }
                if ($input.eq(i).prop('readonly') == true) {
                    if(!$input.eq(i).is('.input-date') && !$input.eq(i).closest('.input').is('.input--hybrid')){
                        $input.eq(i).closest(obj).addClass('readonly')
                    }

                }
                
                $input.attr({
                	'autocomplete':'off',
                	'autocorrect': 'off',
                	'autocapitalize': 'off',
                	'spellcheck': 'false',
                });
            }
        };

        function event(){
            input();
            util();
            stopEvent();
        };

        function input(){
            $el.off('input.ui-event blur.ui-event focus.ui-event', '.input-elem').on({
                'input.ui-event' : function(){
                    var $btn = $(this).closest($el).find($clear);
                    
                    if($(this).val() == ""){
                        $btn.hide();
                    }else{
                        $btn.show();
                        //$(this).closest($el).addClass('input--on input--focus');
                        $(this).closest($el).addClass('input--focus');
                        
                        $(this).removeAttr('data-remove');
                        
                        if($(this).closest('.input-wrap').attr('data-element') == 'reg-no'){
                        	//$(this).closest('.input-wrap').find($el).addClass('input--on input--focus');
                        	$(this).closest('.input-wrap').find($el).addClass('input--focus');
                        }
                    }
                },
                'blur.ui-event' : function(e){
                	var $target = $(e.target)
                                    	
                    if($(this).prop('readonly') == false){
                        setTimeout(function(){
                            if($('.input--focus:not([data-native=focus])').length == 0){
                                hanaUI.native.bottomShow();
                            }
                        },200);
                    }
                    
                    $(this).closest($el).removeClass('input--focus');
                    
                    $(this).removeAttr('data-remove');
                    
                    if($(this).closest('.input-wrap').attr('data-element') == 'reg-no'){
                    	$(this).closest('.input-wrap').find($el).removeClass('input--focus');
                    }
                    
                    if($('body').is('.ios')){
                        if($target.closest('.modal--slide').length){
                            setTimeout(function(){
                                if(!$target.closest('.modal--slide').find('.input--focus').length){
                                    window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
                                }
                            }, 1)
                        }else{
                            setTimeout(function(){
                                if(!$('body').find('.input--focus').length){
                                    window.scrollTo(document.body.scrollLeft, window.scrollY + 1);
                                }
                            }, 1)
                        }
                    }
                    
                    //ios 12 키보드 문제
                    window.scrollTo(0,0);
                    document.body.scrollTop = 0;
                    
                    setTimeout(function(){
                        $target.closest($el).find('.icon-del').hide();
                    },0)
                },
                'focus.ui-event' : function(e) {
                    var $target = $(e.target);
                    if($(this).prop('readonly') == true){
                        return
                    }else{
                        $(this).closest($el).addClass('input--focus');
                        if($(this).closest('.input-wrap').attr('data-element') == 'reg-no'){
                    		$(this).closest('.input-wrap').find($el).addClass('input--focus');
                        }
                        if($(this).val() !== ''){
                        	if($(this).closest('.input-wrap').attr('data-element') == 'reg-no'){
                            	$target.parent('.input-inner').find('.icon-del').show();
                            }else{
                            	$target.closest($el).find('.icon-del').show();
                            }
                        }
                        hanaUI.native.bottomHide();
                        hanaUI.keypad($target, 300);
                    }
                }
            }, '.input-elem');
            
            //add input amount 
            $el.off('click.ui-event').on('click.ui-event', function(){
            	if($(this).hasClass('input-amount')){
            		$(this).find('.input-elem').focus();
            	}
            });
            
            $native.off('click.ui-event').on('click.ui-event', function(){
                $(this).closest('.input').attr('data-native', 'focus');
            })
        };

        function util(){
            $clear.off('touchstart.ui-event focus.ui-event blur.ui-event click.ui-event').on({
                'touchstart.ui-event' : function(e){
                	//e.preventDefault();
                	$(this).closest($el).find('.input-elem');
                	
                	$(this).closest($el).find('.input-elem').each(function(){
                		if(this.setSelectionRange){
                			this.focus();
                			this.setSelectionRange(0, 0);
                		} else {
                			var range = this.createTextRange();
                			range.collapse(true);
                			range.moveEnd("character", 0);
                			range.moveStart("character", 0);
                			range.select();
                		}
                	});

                	const _this = this;
            		$(this).closest($el).addClass('input--focus');
        			setTimeout(function(){
        				$(_this).closest($el).find('.input-elem').val('').focus();
        			}, 200);
            		if($(this).closest($el).hasClass('input-amount')){
            			$(this).closest($el).find('.input-elem').css('width',"100%");
            		}
            		$(this).hide();
            		
                },
                'focus.ui-event' : function(){
                	//$(this).closest($el).addClass('input--focus');
                },
                'blur.ui-event' : function(){
                    if($(this).closest($el).is('.input--focus')){
                    	$(this).closest($el).removeClass('input--focus');
                    }
                },
                'click.ui-event' : function(e){
                	//e.preventDefault();
                	/*
                	if($(this).closest('.input-wrap').attr('data-element') == 'reg-no'){
                		$(this).closest($el).find('.input-elem').val('');
                		var $regFront = $('.input-wrap[data-element=reg-no]').find($input).eq(0);
                		var $regBack = $('.input-wrap[data-element=reg-no]').find($input).eq(1);
                    	if($regFront.val() == '' && $regBack.val() == ''){
                    		//$(this).closest('.input-wrap').find($el).removeClass('input--on');
	                	}
                    }else{
                    	//$(this).closest($el).find('.input-elem').val('').focus();
                    }
                	
                	if($(this).closest($el).hasClass('input-amount')){
                		$(this).closest($el).find('.input-elem').css('width',"100%");
                	}
                	$(this).siblings('.input-elem').focus();
                	$(this).siblings('.input-elem').trigger('focus');
                    //$(this).closest($el).removeClass('input--focus');
                    $(this).hide();
                    */
                }
            });
            $search.off('touchstart.ui-event focus.ui-event blur.ui-event').on({
                'touchstart.ui-event' : function(){
                    $(this).closest($el).addClass('input--focus');
                },
                'focus.ui-event' : function(){
                    $(this).closest($el).addClass('input--focus');
                },
                'blur.ui-event' : function(){
                    if($(this).closest($el).is('.input--focus')){
                        $(this).closest($el).removeClass('input--focus');
                    }
                }
            });
        };

        function stopEvent(){
            $('body').off('click.ui-event').on('click.ui-event', '.input-elem', function(e){
                if($(this).parent().is('.native-inner')){
                    if($(this).prop('readonly') == true){
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            })
        }

        init(obj);
        event();
    },
    
    // 스크롤이 긴 화면에서 inputField를 사용하여 initialize하는 경우 input focus아웃 시 스크롤이 탑으로 가는 현상이 발생(215line 때문),
    // 따라서 스크롤이 긴 화면용 ui function을 새로 정의
    inputLongField : function(obj){
    	var $el = null;
    	var $input = null;
    	var $clear = null;
    	var $search = null;
    	var $native = null;
    	var windowHeight = 0;
    	var $parent = null;
    	
    	function init(obj){
    		$el = $(obj);
    		$input = $el.find('.input-elem');
    		$clear = $el.find('.icon-del');
    		$search = $el.find('.icon-sch');
    		$native = $('.native-inner[role=button]');
    		windowHeight = window.innerHeight;
    		
    		for(var i=0; i<$input.length; i++){
    			var $btn = $input.eq(i).closest($el).find($clear);
    			if($input.eq(i).val() == '' || $input.eq(i).prop('disabled') == true || $input.eq(i).prop('readonly') == true){
    				$btn.hide();
    			}else if($input.eq(i).val() != "") {
    				$btn.hide();
    				//}else if($input.eq(i).val() != "" && !$input.eq(i).closest($el).is('.input--on')) {
    				//$btn.hide();
    				//$input.eq(i).closest($el).addClass('input--on');
    			}else{
    				$btn.show();
    				//$input.eq(i).closest($el).addClass('input--on');
    			}
    			if ($input.eq(i).prop('readonly') == true) {
    				if(!$input.eq(i).is('.input-date') && !$input.eq(i).closest('.input').is('.input--hybrid')){
    					$input.eq(i).closest(obj).addClass('readonly')
    				}
    				
    			}
    			
    			$input.attr({
    				'autocomplete':'off',
    				'autocorrect': 'off',
    				'autocapitalize': 'off',
    				'spellcheck': 'false',
    			});
    		}
    	};
    	
    	function event(){
    		input();
    		util();
    		stopEvent();
    	};
    	
    	function input(){
    		$el.off('input.ui-event blur.ui-event focus.ui-event', '.input-elem').on({
    			'input.ui-event' : function(){
    				var $btn = $(this).closest($el).find($clear);
    				
    				if($(this).val() == ""){
    					$btn.hide();
    				}else{
    					$btn.show();
    					//$(this).closest($el).addClass('input--on input--focus');
    					$(this).closest($el).addClass('input--focus');
    					
    					$(this).removeAttr('data-remove');
    					
    					if($(this).closest('.input-wrap').attr('data-element') == 'reg-no'){
    						//$(this).closest('.input-wrap').find($el).addClass('input--on input--focus');
    						$(this).closest('.input-wrap').find($el).addClass('input--focus');
    					}
    				}
    			},
    			'blur.ui-event' : function(e){
    				var $target = $(e.target)
    				
    				if($(this).prop('readonly') == false){
    					setTimeout(function(){
    						if($('.input--focus:not([data-native=focus])').length == 0){
    							hanaUI.native.bottomShow();
    						}
    					},200);
    				}
    				
    				$(this).closest($el).removeClass('input--focus');
    				
    				$(this).removeAttr('data-remove');
    				
    				if($(this).closest('.input-wrap').attr('data-element') == 'reg-no'){
    					$(this).closest('.input-wrap').find($el).removeClass('input--focus');
    				}
    				
    				if($('body').is('.ios')){
    					if($target.closest('.modal--slide').length){
    						setTimeout(function(){
    							if(!$target.closest('.modal--slide').find('.input--focus').length){
    								window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
    							}
    						}, 1)
    					}else{
    						setTimeout(function(){
    							if(!$('body').find('.input--focus').length){
    								window.scrollTo(document.body.scrollLeft, window.scrollY + 1);
    							}
    						}, 1)
    					}
    				}
    				
    				setTimeout(function(){
    					$target.closest($el).find('.icon-del').hide();
    				},0)
    			},
    			'focus.ui-event' : function(e) {
    				var $target = $(e.target);
    				if($(this).prop('readonly') == true){
    					return
    				}else{
    					$(this).closest($el).addClass('input--focus');
    					if($(this).closest('.input-wrap').attr('data-element') == 'reg-no'){
    						$(this).closest('.input-wrap').find($el).addClass('input--focus');
    					}
    					if($(this).val() !== ''){
    						if($(this).closest('.input-wrap').attr('data-element') == 'reg-no'){
    							$target.parent('.input-inner').find('.icon-del').show();
    						}else{
    							$target.closest($el).find('.icon-del').show();
    						}
    					}
    					hanaUI.native.bottomHide();
    					hanaUI.keypad($target, 300);
    				}
    			}
    		}, '.input-elem');
    		
    		//add input amount 
    		$el.off('click.ui-event').on('click.ui-event', function(){
    			if($(this).hasClass('input-amount')){
    				$(this).find('.input-elem').focus();
    			}
    		});
    		
    		$native.off('click.ui-event').on('click.ui-event', function(){
    			$(this).closest('.input').attr('data-native', 'focus');
    		})
    	};
    	
    	function util(){
    		$clear.off('touchstart.ui-event focus.ui-event blur.ui-event click.ui-event').on({
    			'touchstart.ui-event' : function(e){
    				//e.preventDefault();
    				$(this).closest($el).find('.input-elem');
    				
    				$(this).closest($el).find('.input-elem').each(function(){
    					if(this.setSelectionRange){
    						this.focus();
    						this.setSelectionRange(0, 0);
    					} else {
    						var range = this.createTextRange();
    						range.collapse(true);
    						range.moveEnd("character", 0);
    						range.moveStart("character", 0);
    						range.select();
    					}
    				});
    				
    				const _this = this;
    				$(this).closest($el).addClass('input--focus');
    				setTimeout(function(){
    					$(_this).closest($el).find('.input-elem').val('').focus();
    				}, 200);
    				if($(this).closest($el).hasClass('input-amount')){
    					$(this).closest($el).find('.input-elem').css('width',"100%");
    				}
    				$(this).hide();
    				
    			},
    			'focus.ui-event' : function(){
    				//$(this).closest($el).addClass('input--focus');
    			},
    			'blur.ui-event' : function(){
    				if($(this).closest($el).is('.input--focus')){
    					$(this).closest($el).removeClass('input--focus');
    				}
    			},
    			'click.ui-event' : function(e){
    				//e.preventDefault();
    				$(this).closest($el).find('.input-elem');
    				
    				$(this).closest($el).find('.input-elem').each(function(){
    					if(this.setSelectionRange){
    						this.focus();
    						this.setSelectionRange(0, 0);
    					} else {
    						var range = this.createTextRange();
    						range.collapse(true);
    						range.moveEnd("character", 0);
    						range.moveStart("character", 0);
    						range.select();
    					}
    				});
    				
    				const _this = this; 
    				$(this).closest($el).addClass('input--focus');
    				setTimeout(function(){
    					$(_this).closest($el).find('.input-elem').val('').focus();
    				}, 200);
    				if($(this).closest($el).hasClass('input-amount')){
    					$(this).closest($el).find('.input-elem').css('width',"100%");
    				}
    				$(this).hide();
    				
    			}
    		});
    		$search.off('touchstart.ui-event focus.ui-event blur.ui-event').on({
    			'touchstart.ui-event' : function(){
    				$(this).closest($el).addClass('input--focus');
    			},
    			'focus.ui-event' : function(){
    				$(this).closest($el).addClass('input--focus');
    			},
    			'blur.ui-event' : function(){
    				if($(this).closest($el).is('.input--focus')){
    					$(this).closest($el).removeClass('input--focus');
    				}
    			}
    		});
    	};
    	
    	function stopEvent(){
    		$('body').off('click.ui-event').on('click.ui-event', '.input-elem', function(e){
    			if($(this).parent().is('.native-inner')){
    				if($(this).prop('readonly') == true){
    					e.preventDefault();
    					e.stopPropagation();
    				}
    			}
    		})
    	}
    	
    	init(obj);
    	event();
    },
    
    inputMulti : function(obj){
        var $el = null;
        var $textarea = null;
        var extra = 0;

        function init(obj){
            $el = $(obj);
            
            for(var i=0; i<$el.length; i++){
            	if($el.eq(i).text() != '') {
            		if($el.eq(i).prop('scrollHeight') > 48) extra = 6;
            		$el.eq(i).css('height', $el.eq(i).prop('scrollHeight')+extra);
            	}
            }
        };

        function event(){
            input();
        };

        function input(){
            $el.off('input.ui-event', $el).on({
                'input.ui-event' : function() {
                	$(this).css('height', 1).css('height', $(this).prop('scrollHeight'));
                }
            }, $el);
        };

        init(obj);
        event();
    },
    inputAuto : function(obj){ 
        var $el = null;

        function init(obj){
            $el = $(obj);	//[data-element=input-auto]
            if($el.val() != ''){
            	setTimeout(function(){
	            	$el.width($el.prop('scrollWidth'));
            	},100);
            }
        };

        function event(){
            input();
        };

        function input(){
            $el.off('input.ui-event blur.ui-event', $el).on({
                'input.ui-event' : function() {
                	$(this).css('width', 0).css('width', $(this).prop('scrollWidth'));
                	if($(this).val()!=''){
                		$(this).parent().find('.txt-won').show();
                	}else{
                		$(this).parent().find('.txt-won').hide();
                	}
                },
                'blur.ui-event' : function() {
                	if($(this).val()==''){
                		if($(this).parent().hasClass('input-amount')){
                			$(this).css('width','100%');
                        }else{
                        	$(this).val(0);
                        }
                	}
                }
            }, $el);
        };

        init(obj);
        event();
    },
    native : {

        bottomUnfixed : function(){

            var $obj = null;

            function init(){
            	$obj = $('.app-footer, .modal-footer');
            }

            function event(){
                $obj.css('position', 'relative').addClass('unfixed');
            }

            init();
            event();
        },

        bottomFixed : function(){

            var $obj = null;

            function init(){
                $obj = $('.app-footer, .modal-footer');
            }

            function event(){
                $obj.css('position', 'fixed').removeClass('unfixed');;
            }

            init();
            event();
        },

        bottomHide : function(){

            if($('body').data('accessibility')){
                return
            }

            var $obj = null;

            function init(){
            	$obj = $('.app-footer, .modal-footer');
            }

            function event(){
                $obj.stop(true).hide();
            }

            init();
            event();
        },

        bottomShow : function(){

            if($('body').data('accessibility')){
                return
            }

            var $obj = null;

            function init(){
            	$obj = $('.app-footer, .modal-footer');
            }

            function event(){
                $obj.stop().fadeIn('50');
            }

            init();
            event();
        },

        bottomInit : function(){
            if(typeof HANA_READER_YN !== 'undefined'){
                if(HANA_READER_YN == 'Y'){
                    $('body').attr('data-accessibility', 'true');
                    hanaUI.native.bottomUnfixed();
                    hanaUI.native.errorText();
                }
            }
        },

        errorText : function(){
            $('body').off('click.ui-event', '.app-footer .btn-wrap .button:last').on('click.ui-event', '.app-footer .btn-wrap .button:last', function(){
                $('.input__error').each(function(i,e){
                    $(e).text($(e).text());
                })
                
            })
        }
    },
    toggleItem : function(obj){
        var $el = null;
        var $btn = null;
        var $cont = null;

        function init(obj){
            $el = $(obj);
            $btn = $($el).find('[role=button]');
            $cont = $($el).find('[role=content]');
        }

        function event(){
            $btn.off('click.ui-event').on('click.ui-event', function(){
            	if(!$el.hasClass('tooltip')){
            		var $activeCont = $(this).closest($el).find($cont);
	            	if($(this).closest($el).is('.is-active')){
	            		$(this).closest($el).removeClass('is-active');
	            		$activeCont.css('max-height',0);
	            		$('.tooltip-box').removeClass('on');
					} else {
						$(this).closest($el).addClass('is-active');
						$activeCont.css('max-height',$activeCont.prop('scrollHeight')+'px');
					}
	            	
                    
            	}else{
            		$(this).closest($el).toggleClass('is-active');
            		$(this).parents().siblings().find('.tooltip').removeClass('is-active');//2021-03-08 추가 :only 가족관리(매칭)
            		
            	}
            	
            });

         	$('body').on('click',function(e){
         		
         		if(!$(e.target).is(".tooltip .icon-dot-more") && !$(e.target).is(".tooltip-layer") && !$(e.target).is(".match-txt-list") && !$(e.target).is(".match-txt-list ul") && !$(e.target).is(".match-txt-list ul li") && !$(e.target).is(".match-txt-list ul li a")){
        	 		$('.tooltip').removeClass('is-active');
         		}
         		
         	});
            
        }

        init(obj);
        event();
    },
    cardTypeCheked : function(obj){
        var $obj = null;

        function init(obj){
            $obj = $(obj);
        }

        function event(){
            $obj.off('click.ui-event').on('click.ui-event', function(){
            	var $this = $(this);
            	var $objCheck = $this.find('.checkbox-elem');
            	if($objCheck.length > 0){
	            	if($objCheck.prop('checked')){
	            		$this.removeClass('is-active');
	            		$objCheck.prop('checked',false);
	            	}else{
	            		$this.addClass('is-active');
	            		$objCheck.prop('checked',true);
	            	}
            	}
            });
        }

        init(obj);
        event();
    },
    tabAvtive : function(obj){
        var $obj = null;
        var $objMenu = null;
        var $objPanel = null;
        var $type = null;

        function init(obj){
            $obj = $(obj);
            $objMenu = $obj.find('.tab-item[role=button]');
        	$objPanel = $obj.siblings('.tab-panel');
        }

        function event(){
            $objMenu.on('click.ui-event', function(){
            	var idx = $(this).index('.tab-item[role=button]');
            	$type = $(this).closest('.tab-wrap').length > 0 ? $(this).closest('.tab-wrap').attr('data-type') : null;
                
            	if($(this).closest('.horizon-slide').length == 0){
            		$(this).addClass('is-active').siblings($objMenu).removeClass('is-active');
            	}
            	if($type != 'data-load'){
            		$objPanel.eq(idx).addClass('is-active').siblings($objPanel).removeClass('is-active');
            	}
            });
        }
        init(obj);
        event();
    },
    sliderTabWrap : function(){
        var $slider = $('.horizon-slide');
        var $sliderTabs = $slider.find('[role=button]');
        var currentIndex = null;
        
        function init(){
            if($('body').find($slider).length){
	            if(!$('body').find('.horizon-slide-wrap').length){
		        	$slider.wrap('<div class="horizon-slide-wrap"></div>');
		        }
            }            
        }
        
        function event(){
	        $sliderTabs.on('click.ui-event', function(event) {
				$(this).addClass('is-active').siblings($sliderTabs).removeClass('is-active');
				
				$('.tab-item').attr("tabindex","");
				$(this).attr("tabindex","-1").focus();
	        });
        }
        
        init();
        event();
    },
    switchBtn : function(obj){
        var $obj = null;

        function init(obj){
        	var $obj = $(obj);
        	$obj.asSwitch();
        }
        init(obj);
    },
    inputAmount : function(obj){
        var $obj = null;
        var $key = null;
        var $output = null;
        var outputType = null;
        
        var $keyAmt = null;	//금액버튼

        function init(obj){
            $obj = $(obj);
            $key = $obj.find('.btn-num');
            $output = $obj.find('[data-value=result]');
            outputType = $output.data('type');
            
            $keyAmt = $obj.find('.btn-won');	//금액버튼
            
        } 

        function event(){
        	var inputVal = '';

    		if(outputType == 'input'){
    			/*inputVal = $output.val();
    			$key.off('click.ui-event');
    			$obj.delegate('.btn-num','click.ui-event', function(){
    				var $this = $(this);
	    			if($this.val() != 'del'){
	    				inputVal = inputVal + $(this).val();
	        		}else{
	        			if(inputVal.replace(/,/g,'').length <= 0){
	        				inputVal = 0;
	        			}else{
	        				if(inputVal != 0){
	        					inputVal = inputVal.replace(/,/g,'').slice(0,-1);
	        				}
	        			}
	        		}
	    			$output.val(Number(inputVal));
	    			$output.css('width', '2.5rem').css('width', $output.prop('scrollWidth'));
    			});*/
    		}else{
    			$key.off('click.ui-event').on('click.ui-event', function(){
            		var $this = $(this);
        			if($this.val() != 'del'){
        				inputVal = inputVal + $(this).val();
            		}else{
            			if($output.text().replace(/,/g,'').length <= 1){
            				inputVal = 0;
            			}else{
            				if(inputVal != 0){
            					inputVal = $output.text().replace(/,/g,'').slice(0,-1);
            				}
            			}
            		}
        			$output.text(Number(inputVal));
                });
    			
    			//금액버튼
    			$keyAmt.off('click.ui-event').on('click.ui-event', function(){
            		var $this = $(this);
            		inputVal = Number(inputVal) + Number($this.val());
        			$output.text(Number(inputVal));
                });
    		}
        }
        init(obj);
        event();
    },
    toolTip : function(obj){
        var $el = null;
        var $wrap = null;
        var $box = null;
        var $toolTipBox = null;

        function init(obj){
            $el = $(obj);
        }

        function event(){
        	$el.off('click.ui-event').on('click.ui-event',function(){
        		
        		$wrap = $(this).closest('.tooltip-wrap');
                $box = $wrap.find('.tooltip-box');
                
        		if($el.is('[data-content]')){
        			var html = "<ul class='dotted-list-small'>" + 
				        			"<li>'모으기'는 금융상품이 아니어서 이자가 지급되지 않아요.</li>" +
									"<li>해지(만기 또는 중도)시점에 용돈(돈통)이 꽉 찬 경우에는 만기금액이 용돈으로 들어오지 않을 수 있어요.</li>" + 
									"<li>용돈잔액이 부족할 경우 해당 회차의 모으기가 진행되지 않아요.</li>" + 
								"</ul>";
        			$box.html(html);
        		}
        		if($box.is(':visible') == true) {
        			$box.removeClass('on');
        			
        		} else {
        			//$('.tooltip-box').removeClass('on');
        			$box.addClass('on');
        			$(this).parents().siblings().find('.tooltip-box').removeClass('on');//2021-03-08 추가
        			$('.tooltip').removeClass('is-active');//2021-03-08 추가 
        		}
        	});
        	
        	$('body').off('click.ui-event').on('click.ui-event',function(e){
        		if($('body').find($el).length){
        			$box = $el.closest('.tooltip-wrap').find('.tooltip-box');
	        		if(!$(e.target).is($el) && !$(e.target).is(".tooltip-box") && !$(e.target).is(".dotted-list-small li")){//2021-03-08 추가
	        			if($box.is(':visible') == true) $box.removeClass('on');
	        		}
	        	}
         	});
        }
        init(obj);
        event();
    },
    transListReceipt : function(obj){
        var $el = null;
        var $link = null;
        var $box = null;
        var $toolTipBox = null;

        function init(obj){
            $el = $(obj);
            $link = $(obj).find('.amount a');
        }

        function event(){
        	$link.off('click.ui-event').on('click.ui-event',function(e){
        		e.stopPropagation();
        	});
        	$el.delegate($link, 'click.ui-event',function(e){
        		e.stopPropagation();
        	});
        }
        init(obj);
        event();
    },
    toastPopup : function(obj){
        var $el = null;
        var $target = null;
        var posTop = null;
        var posLeft = null;
        var targetHeight = null;
        
        function init(obj){
            $el = $(obj);
            if($el.length > 0){
	            if($el.attr('data-target') == 'header-tab'){
	            	$target = $('.header-tab').find('.tab-item');
	            	if($target.hasClass('is-active')){
	            		posTop = $target.not('.is-active').position().top;
	            		posLeft = $target.not('.is-active').position().left;
	                    targetHeight = $target.outerHeight();
	            	}
	            }else{
	            	$target = $('.'+ $el.attr('data-target'));
	            	posTop = $target.position().top;
	            	posLeft = $target.position().left;
	                targetHeight = $target.outerHeight();
	            }
	            
	            $el.css({
	            	'top': posTop + targetHeight,
	            	'left': posLeft
	            });
            }
            
        }

        function event(){
        	
        }
        init(obj);
        event();
    }
};




