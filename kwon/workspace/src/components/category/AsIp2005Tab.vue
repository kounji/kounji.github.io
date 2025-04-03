<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 자산분석
* @ 페이지설명 : 자산 > 자산분석 > 카테고리별 분석 - 유형별 금융자산
* @ 파일명     : src\components\category\AsIp2002Tab.vue
* @ 작성자     : CS533437
* @ 작성일     : 2023-07-12 
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-12              CS533437              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01">
		<div class="popup_header">
			<h1>지표별 재무 진단</h1>
		</div>
		<div class="popup_content com_no_bottom">
			<div class="com_inner">
                <!-- 1011 수정 -->
				<div class="fi_title">
					<strong class="titH1"><em>{{cusnm}}</em>님의 재무 상태를<br>전문적으로 진단해 드려요</strong>
					<p><a href="#nolink" class="link_arrow" @click='fn_ASIP2011()'>재무설계 안내</a></p>
				</div>
                <!-- //1011 수정 -->
                <!-- <div class="customTooltipBox">
                    <strong class="titH1"><em>{{cusnm}}</em>님의 재무 상태를<br>전문적으로 진단해 드려요</strong>
                        <div class="custom_tooltip">
                        <div class="com_tooltip_type02 com_tooltip_type03">
                            <a href="javascript:void(0);" class="com_btn_info" role="button">
                                <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                            </a>
                            <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                <div>
                                    <p>재무설계는 9개 지표를 활용해 가계재무, 미래준비, 부채관리로 나누어 재무 상태를 진단하는 서비스예요.</p><br>
                                    <p>재무 진단을 위한 지표는 한국FP학회가 고안한 가계재무상태평가지표와, 학회의 다수 최신 연구 논문을 기반으로 객관적으로 선정하였어요.</p>
                                    <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>-->
               
                <div class="com_tabmenu_type03 switchType btn3">
					<ul role="tablist">
						<li role="presentation" :aria-selected="viewIndex == 0 ? true : false" aria-controls="tab_01" :class="viewIndex == 0 ? 'on' : ''"><a href="javascript:void(0);" @click.prevent="tabChangeEvent(0)"><span>가계재무</span></a></li>
						<li role="presentation" :aria-selected="viewIndex == 1 ? true : false" aria-controls="tab_02" :class="viewIndex == 1 ? 'on' : ''"><a href="javascript:void(0);" @click.prevent="tabChangeEvent(1)"><span>미래준비</span></a></li>
                        <li role="presentation" :aria-selected="viewIndex == 2 ? true : false" aria-controls="tab_02" :class="viewIndex == 2 ? 'on' : ''"><a href="javascript:void(0);" @click.prevent="tabChangeEvent(2)"><span>부채관리</span></a></li>
					</ul>
				</div>                

            </div>

            <ASIP2005 v-if="viewIndex == 0"></ASIP2005>
            <ASIP2006 v-if="viewIndex == 1"></ASIP2006>
            <ASIP2004 v-if="viewIndex == 2"></ASIP2004>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService' 
import apiService from '@/service/apiService'

import ASIP2004 from '@/views/page/AS/IP/ASIP2004/ASIP2004'
import ASIP2005 from '@/views/page/AS/IP/ASIP2005/ASIP2005'
import ASIP2006 from '@/views/page/AS/IP/ASIP2006/ASIP2006'

import ASIP2011 from '@/views/page/AS/IP/ASIP2011/ASIP2011'

export default {
    name : "ASIP2005TAB",
    data: () => {
        return {
            viewIndex: null,
            cusnm    : "",
        }
    },
    computed : {
    },
    created() {
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)


        this.$nextTick(() => {
                roundTabWidth();
            })

        this.viewIndex = this.params.viewIndex
        
        },
    methods: {
        initComponent() {
            this.getData();
            this.cusnm 		= this.getUserInfo('cusnm')
        },
        getData() {
        },
        tabChangeEvent(idx) {
            this.viewIndex = idx
        },
        // 재무설계 안내 팝업 호출
        fn_ASIP2011() {
            
            const config = {
                component : ASIP2011
            };

            modalService.openPopup(config).then(() => {
            });
        }
    },
    mixins: [
        commonMixin,
        popupMixin,
    ],
    components: {      
        ASIP2004,
        ASIP2005,
        ASIP2006
    }
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