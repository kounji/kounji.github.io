<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 정책자금 > 농업정책자금
* @ 페이지설명 : 마이농가 > 정책자금 > 농업정책자금 목록
* @ 파일명     : src/views/page/SZ/PC/SZPC2116/SZPC2116.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-05-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-31              CS516033              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>농업정책자금</h1>
        </div>

        <div class="com_tabmenu_type01 menunum02">
            <ul role="tablist">
                <li aria-controls="tab_01" :class="tabPgflag === '1' ? 'on' : ''"><a href="javascript:void(0);" role="tab" :aria-selected="tabPgflag === '1' ? 'true' : 'false'" @click.prevent="fn_setTabflag('1')"><span>농업정책자금 목록</span></a></li>
                <li aria-controls="tab_02" :class="tabPgflag === '2' ? 'on' : ''"><a href="javascript:void(0);" role="tab" :aria-selected="tabPgflag === '2' ? 'true' : 'false'" @click.prevent="fn_setTabflag('2')"><span>농업금융컨설팅 소개</span></a></li>
            </ul>
        </div>

        <!-- 농업정책자금 목록 -->
        <div role="tabpanel" id="tab_01" class="cmm-tab-panel" :class="tabPgflag === '1' ? 'on' : ''">
            <div class="popup_content com_bg_type00 com_no_bottom">
                <div class="com_inner intro_cont_list">
                    <p class="">
                        <strong class="com_myfarm_tit01">농업정책자금</strong>
                        <a href="javascript:void(0);" @click.prevent="openSlidePop()" class="com_btn_info">
                            <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                        </a>
                        <span class="txt_total">총<em>{{ttcn}}</em>건</span>
                    </p>
                    <div class="com_box_type01 com_box_list" v-for="(agrcPlyFd, idx) in agrcPlyFdList" :key="idx">
                        <div class="list_type_box">
                            <a href="javascript:void(0);" @click.prevent="openDetailPop(agrcPlyFd)">
                                <div class="new_tit_area">
                                    <div class="tit"><span>{{agrcPlyFd.cfcnm}}</span></div>
                                </div>
                            </a>
                            <p class="txt_exp">{{agrcPlyFd.agrcPycpBrfCntn}}</p>
                            <ul class="bl_dot_list bl_dot_list_etc">
                                <li>
                                    <dl>
                                        <dt>대출한도</dt>
                                        <dd>{{agrcPlyFd.lnLmtCntn}}</dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>대출금리</dt>
                                        <dd>{{agrcPlyFd.lnitrCntn}}</dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>상환방법</dt>
                                        <dd>{{agrcPlyFd.rpyMcnt}}</dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 농업금융컨설팅 소개 -->
        <div role="tabpanel" id="tab_02" class="cmm-tab-panel" :class="tabPgflag === '2' ? 'on' : ''">
            <ul class="tab_scroll">
                <li class="on"><a href="#tit01">정의</a></li>
                <li><a href="#tit02">지원분야</a></li>
                <li><a href="#tit03">컨설팅 단계</a></li>
                <li><a href="#tit04">진행절차</a></li>
            </ul>
            <div class="popup_content com_bg_type00 com_no_bottom">
                <div class="com_inner intro_cont">
                    <strong class="tit01 target">농업금융컨설팅이란?</strong>
                    <div class="cont01">
                        <p>농업금융컨설팅은 농업인의 영농목표 달성을<br>
                            지원하는 경영·금융 Total Solution입니다.</p>
                        <div class="gray_box">
                            농업경영체의 경영상태를 정확히 진단하여 경영
                            활동을 계량적으로 분석·평가하여 개선책을 제시
                            하고, 경영진단 결과에 따른 최적의 자금을 지속적
                            으로 연계지원 함으로써 농업경영체의 지속성장을
                            견인하는 전문 컨설팅
                        </div>

                        <div class="tit"><span>농업금융컨설팅이란?</span></div>
                        <div class="intro_list00">
                            <div class="img"></div>
                            <div class="blind">
                                <dl>
                                    <dt>경영컨설팅</dt>
                                    <dd>대출농가에<br>최적 경영해법 제시</dd>
                                </dl>
                            </div>
                            <div class="blind">
                                <dl>
                                    <dt>자금관리컨설팅</dt>
                                    <dd>경영현황과 연계한<br>자금관리 지도</dd>
                                </dl>
                            </div>
                            <div class="blind">
                                <dl>
                                    <dt></dt>
                                    <dd>영농목표 달성을 지원하는<br>경영·금융 <span>Total Solution</span></dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <strong class="tit02 target">지원분야</strong>
                    <div class="cont02">
                        <p>농업금융컨설팅 지원 서비스 분야는 5개 분야입니다.</p>
                        <div class="gray_box">
                            <ul>
                                <li>1. 경영진단·처방(회계지도) : 경영성과에 기초한 매출·비용 적정성 평가</li>
                                <li>2. 자금관리 : 경영현황과 연계한 대출금 상환계획 수립 및 대출안내</li>
                                <li>3. 영농계획수립 : 농가의 농업경영계획 수립 및 검토</li>
                                <li>4. 투자경제성 분석 : 농가의 신규·재투자 계획에 대한 투자경제성 분석</li>
                                <li>5. 기술자문 : 평균농가 대비 기술수준 파악 후 전문가 동행하여 기술적 조언</li>
                            </ul>
                        </div>
                        <div class="tit"><span>농업금융컨설팅 분야</span></div>
                        <div class="intro_list01">
                            <div class="img"></div>
                            <ul class="blind">
                                <li>
                                    <dl>
                                        <dt>영농계획수립</dt>
                                        <dd>농업인 수립계획 수립검토<br>및 수립방법 지도</dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>경영자문</dt>
                                        <dd>경영진단·처방(회계지도)</dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>대출상담</dt>
                                        <dd>자금관리 컨설팅 지원</dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>신규·재투자</dt>
                                        <dd>투자경제성 분석 제공</dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>기술자문</dt>
                                        <dd>전문가 동행하여 기술적<br>조언 </dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <strong class="tit03 target">컨설팅 단계</strong>
                    <div class="cont03">
                        <p>농업금융컨설팅은 농가 성장단계별 맞춤형으로<br>지속적으로 지원합니다.</p>
                        <div class="gray_box">
                            <ul>
                                <li>1. 신규 진입 : 사업타당성 분석과 경영계획 수립에 대해 조언, 영농초기에 필요한 시설자금 대출지원</li>
                                <li>2. 정상궤도 진입 : 경영진단 및 경영관리 지도를 통해 운전자금 대출 지원</li>
                                <li>3. 재투자 : 투자 후 사업성과를 분석, 시설·개보수 자금 대출 지원</li>
                                <li>4. 운영·유지 : 재투자 후 농장 경영진단과 자금관리를 지도, 운영자금증분 조달을 위한 대출</li>
                            </ul>
                        </div>
                        <div class="tit"><span>농가 성장단계별 맞춤형 컨설팅</span></div>
                        <div class="intro_list02">
                            <div class="img"></div>
                            <dl class="blind">
                                <dt>농가 성장단계</dt>
                                <dl>
                                    <ul>
                                        <li>신규진입</li>
                                        <li>시설완료</li>
                                        <li>정상궤도 진입</li>
                                        <li>재투자</li>
                                        <li>운영/유지</li>
                                    </ul>
                                </dl>
                            </dl>
                        </div>
                        <div class="intro_list03">
                            <div class="img"></div>
                            <dl class="blind">
                                <dt>농가성장단계</dt>
                                <dl>
                                    <ul>
                                        <li>투융자자금<br>조달</li>
                                        <li>운영자금 조달</li>
                                        <li>증투자금 조달</li>
                                        <li>운영자금증분<br>조달</li>
                                    </ul>
                                </dl>
                            </dl>
                            <dl class="blind">
                                <dt>컨설팅</dt>
                                <dl>
                                    <ul>
                                        <li>사업타당성<br>분석 및 경영<br>계획 수립</li>
                                        <li>경영 진단 및<br>경영관리 지도</li>
                                        <li>투자 후<br>사업성과 분석</li>
                                        <li>경영 진단 및<br>자금관리 지도</li>
                                    </ul>
                                </dl>
                            </dl>
                            <dl class="blind">
                                <dt>자금지원</dt>
                                <dl>
                                    <ul>
                                        <li>시설자금대출</li>
                                        <li>운전자금대출</li>
                                        <li>시설·개보수<br>자금대출</li>
                                        <li>운전자금대출</li>
                                    </ul>
                                </dl>
                            </dl>
                        </div>
                    </div>
                    <strong class="tit04 target">진행 절차</strong>
                    <div class="cont04">
                        <p>농업금융컨설팅은 농협은행 또는 농축협 영업점을<br>방문하여 신청하면 됩니다.</p>
                        <div class="gray_box">
                            컨설팅을 신청하면 컨설턴트가 농가를 방문해 현장
                            컨설팅을 실시합니다. 컨설팅 이후에도 영농성과
                            점검, 시설 점검, 애로사항 확인 등 사후관리까지
                            수행하며 모든 과정은 무료입니다.
                        </div>
                        <div class="tit"><span>농업금융컨설팅 진행절차</span></div>
                        <div class="intro_list04">
                            <div class="img"></div>
                            <ul class="blind">
                                <li class="list_01">
                                    <dl>
                                        <dt>컨설팅 신청</dt>
                                        <dd>
                                            <span>농민</span>
                                            <span>농협</span>
                                        </dd>
                                    </dl>
                                </li>
                                <li class="list_02">
                                    <dl>
                                        <dt>일정 협의</dt>
                                        <dd>농민 컨설턴트</dd>
                                    </dl>
                                </li>
                                <li class="list_03">
                                    <dl>
                                        <dt>사전 준비</dt>
                                        <dd>컨설턴트</dd>
                                    </dl>
                                </li>
                                <li class="list_04">
                                    <dl>
                                        <dt>농가 방문 및<br>컨설팅 실시</dt>
                                        <dd class="blind"></dd>
                                    </dl>
                                </li>
                                <li class="list_05">
                                    <dl>
                                        <dt>보고서 작성</dt>
                                        <dd>컨설턴트</dd>
                                    </dl>
                                </li>
                                <li class="list_06">
                                    <dl>
                                        <dt>보고서 송부</dt>
                                        <dd>
                                            <span>농협</span>
                                            <span>농민</span>
                                        </dd>
                                    </dl>
                                </li>
                                <li class="list_07">
                                    <dl>
                                        <dt>사후 관리</dt>
                                        <dd>컨설턴트</dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <button class="com_top_btn"><span class="blind">위로이동</span></button>
        </div>
        <a href="javascript:void(0);" @click.prevent="close()" class="btn_close"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'

    import SZPC2117 from '@/views/page/SZ/PC/SZPC2117/SZPC2117'
    import SZPC2118 from '@/views/page/SZ/PC/SZPC2118/SZPC2118'

    export default {
        name : "SZPC2116",
        data: () => {
            return {
                tabPgflag     : "",
                hdScrollYn    : true,
                ttcn          : 0, // 총건수
                agrcPlyFdList : [] // 농업정책자금목록
            }
        },
        mounted() {
            this.initComponent();

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        methods: {
            initComponent() {
                this.tabPgflag  = "1";
                this.hdScrollYn = true;

                this.getData();
            },
            getData() {
                this.ttcn = 0;
                this.agrcPlyFdList = [];

                const config = {
                    url: '/sz/pc/16r01'
                };

                apiService.call(config).then(response => {
                    this.ttcn          = response.ttcn;
                    this.agrcPlyFdList = response.agrcPlyFdList || [];
                });
            },
            openSlidePop() {
                const config = {
                    renderer : {
                        component : SZPC2118
                    },
                    params   : {
                        infoTitl    : "농업정책자금",
                        infoSubTitl : "농업정책자금",
                        infoCn      : "농협은 영농자금 금리인하 제도개선, 영농우대 특별 저리 대출지원 등 농업인 조합원에 대한 차별화된 금융 서비스를 통해 영농자금과 가계 자금을 제공함으로써 농업인이 안정적인 농업 활동을 할 수 있도록 지원합니다"
                    }
                };

                modalService.openSlidePagePopup(config).then(() => {
                });
            },
            openDetailPop(agrcPlyFd) {
                const config = {
                    component : SZPC2117, // 농업정책자금 상세
                    params    : agrcPlyFd
                };

                modalService.openPopup(config).then(() => {
                });
            },
            fn_setTabflag(gbn) {
                this.tabPgflag = gbn;
                
                if (this.tabPgflag == "1") {
                    this.getData();
                } else if (this.tabPgflag == "2") {
                    $('.com_top_btn').click();
                    $('.tab_scroll li:nth-child(1)').addClass('on').siblings().removeClass('on');

                    if (this.hdScrollYn) {
                        this.$nextTick(()=>{
                            this.fn_handleScroll();
                        })
                    }
                }
            },
            fn_handleScroll() {
                this.hdScrollYn = false;

                $('.popup_content').scroll(function(){
                    if($(this).scrollTop()>0){
                        $('.com_top_btn').fadeIn(500);
                        $('.tab_scroll').addClass('com_boxshadow_type01');
                    } else {
                        $('.com_top_btn').fadeOut(500);
                        $('.tab_scroll').removeClass('com_boxshadow_type01');
                    }
                });
                $('.com_top_btn').click(function(e){
                    e.preventDefault();
                    $('.popup_content').animate({scrollTop:0},200);
                });
                $('.tab_scroll li').click(function(e){
                    e.preventDefault();
                    $(this).parent().addClass('on');
                    $(this).parent().siblings().removeClass('on');
                });

                var $menu     = $('.tab_scroll li'),
                    $contents = $('.target'),
                    $doc      = $('.popup_content'),
                    headerH   = $('.com_tabmenu_type01').outerHeight(),
                    tabH      = $('.tab_scroll').outerHeight();
                    
                $menu.on('click','a', function(){
                    var $target = $(this).parent(),
                        idx     = $target.index(),
                        section = $contents.eq(idx),
                        offsetTop = section[0].offsetTop - (headerH + tabH) - 10;

                    $doc.stop().animate({
                        scrollTop : offsetTop
                    }, 800);

                    return false;
                });

                $('.popup_content').scroll(function(){
                    var scltop = $(this).parent().children('.popup_content').scrollTop() + 20;
                    $.each($contents, function(idx){
                        var $target   = $contents.eq(idx),
                            targetTop = $target[0].offsetTop - (headerH + tabH) - 10;
                            targetTop = Math.floor(targetTop);
                            
                        if (targetTop <= scltop) {
                            $menu.removeClass('on');
                            $menu.eq(idx).addClass('on');
                        }
                    })
                });
            }
        }
    }
</script>