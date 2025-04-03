<!--
/*************************************************************************
* @ 서비스경로 : 자산관리서비스 소개
* @ 페이지설명 : 자산관리서비스 소개 화면
* @ 파일명     : src/views/page/CO/AS/COAS2001/COAS2001.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-23              CS533038             최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
    <div class="full_popup mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
        <div class="popup_header" >
            <!-- <h1>자산연결</h1> -->
            <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
        </div>
        <div class="popup_content" @scroll="handleScroll"><!-- 하단 버튼 없을때 com_no_bottom --> 
            <div class="new_info" id="info_COAS2001">
                <div class="intro">
                    <strong class="tit">
                        새로워진<br>
                        NH콕마이데이터
                    </strong>
                    <p class="desc">
                        보다 전문적인 자산진단<br>
                        공공 정보까지 담은 폭 넓은 정보<br>
                        더 다양하고 정교해진 목표관리
                    </p>

                    <div class="img_wrap">
                        <img src="@/assets_v40/images/img/new_intro_2023.png" alt="">
                        <!-- 인트로 인터렉션 08/22 추가 -->
                        <div class="ani_img">		
                            <span class="img01"></span>		
                            <span class="img02"></span>		
                            <span class="img03"></span>		
                            <span class="img04"></span>		
                            <span class="img05"></span>		
                        </div>
                        <!-- 인트로 인터렉션 08/22 추가 -->
                    </div>

                    <div class="btn_dwon_wrap">
                        <div class="btn_down" role="button">아래로 스크롤<span class="down_arrow"></span></div>
                    </div>
                </div>

                <div class="page_01">
                    <div class="text_info_area">
                        <span class="mint_badge">보다 전문적인</span>
                        <strong class="tit">나만을 위한 자산진단 서비스!</strong>
                        <p class="desc">전문 재무진단은 물론 소비 분석까지</p>
                    </div>

                    <div class="info_slider_wrap">
                        <div class="info_slider01">
                            <div>
                                <img src="@/assets_v40/images/img/new_info01_2023.png" alt="">
                            </div>
                            <div>
                                <img src="@/assets_v40/images/img/new_info02_2023.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="page_02">
                    <div class="text_info_area">
                        <span class="mint_badge">보다 폭 넓은</span>
                        <strong class="tit">흩어진 공공 정보를 한 눈에!</strong>
                        <p class="desc">연금, 세금, 사회보험 납부내역 모아보기</p>
                    </div>
                    <div class="info_slider_wrap">
                        <div class="info_slider02">
                            <div>
                                <div>
                                    <img src="@/assets_v40/images/img/new_info03_2023.png" alt="">
                                    <p class="slider_title">나의 노후 준비 진단</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src="@/assets_v40/images/img/new_info04_2023.png" alt="">
                                    <p class="slider_title">세금 납부 현황 확인</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                <img src="@/assets_v40/images/img/new_info05_2023.png" alt="">
                                <p class="slider_title">사회보험 정보 확인</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="page_03">
                    <div class="text_info_area">
                        <span class="mint_badge">보다 다양한</span>
                        <strong class="tit">계획적인 저축/소비 습관 기르기!</strong>
                        <p class="desc">목적에 맞게 모으고, 예산에 맞춰 쓰기</p>
                    </div>
                    <div class="bg_img"></div>
                    <div class="info_slider_wrap">
                        <div class="info_slider03">
                            <div>
                                <img src="@/assets_v40/images/img/new_infoCard01_2023.png" alt="">
                            </div>
                            <div>
                                <img src="@/assets_v40/images/img/new_infoCard02_2023.png" alt="">
                            </div>
                            <div>
                                <img src="@/assets_v40/images/img/new_infoCard03_2023.png" alt="">
                            </div>
                            <div>
                                <img src="@/assets_v40/images/img/new_infoCard04_2023.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom_box com_bg_type00">
            <div class="btn_full_box">
                <a class="btn btn_mint" role="button" v-on:click.prevent="movePage()">마이데이터 가입하기</a>
            </div>
        </div>
        <a href="javascript:void(0);" class="btn_close" @click.prevent="closePage()"><span class="blind">팝업닫기</span></a>
    </div>
    <!--// 전체 팝업 종료 -->
</template>    

<script>
// import Page from '@/views/layout/Page.vue'
import modalService from '@/service/modalService'
import appService from '@/service/appService'
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import {fncSlick} from '@/utils/slick'
import COAS2002 from '@/views/page/CO/AS/COAS2002/COAS2002'

export default {
    name: 'COAS2001',
    data: () => {
        return {
            scrollPosition : null
        }
    },
    mixins: [
        commonMixin
    ],
    mounted() {
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: { 
        initComponent() {
            this.initSlick()
            fncSlick()
        },
        initSlick() {
            $('.info_slider01').slick({
				dots:true,
				arrows:false,
				slidesToShow: 1,
				infinite: false,
				customPaging:function(slider,i){
					console.log("1 : "  + i);
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				
				}
			});

			$('.info_slider02').slick({
				dots:false,
				arrows:false,
				slidesToShow: 1,
				infinite: true,
				//autoplaySpeed:3000,
				customPaging:function(slider,i){
					console.log("2 : "  + i);
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});

			$('.info_slider03').slick({
				// centerMode:true,
				dots : false,
				arrows : false,
				infinite: true,
				//autoplaySpeed:3000,
				customPaging:function(slider,i){
					console.log("3 : "  + i);
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});
  
			// 인트로 인터렉션 08/22 추가
			$('.intro .tit').css('opacity','0');
			$('.intro .desc').css('opacity','0');
			$('.ani_img .img01').css('opacity','0');
			$('.ani_img .img02').css('opacity','0');
			$('.ani_img .img03').css('opacity','0');
			$('.ani_img .img04').css('opacity','0');
			$('.ani_img .img05').css('opacity','0');
			setTimeout(function(){$('.intro .tit').animate({opacity: '1'},500)},500);
			setTimeout(function(){$('.intro .desc').animate({opacity: '1'},500)},1000);
			setTimeout(function(){$('.ani_img .img01').animate({opacity: '1'},500)},1200);
			setTimeout(function(){$('.ani_img .img02').animate({opacity: '1'},500)},1500);
			setTimeout(function(){$('.ani_img .img03').animate({opacity: '1'},500)},1800);
			setTimeout(function(){$('.ani_img .img04').animate({opacity: '1'},500)},2100);
			setTimeout(function(){$('.ani_img .img05').animate({opacity: '1'},500)},2400);
			

			//페이지 인터렉션
			$('.text_info_area .mint_badge').css('opacity','0');
			$('.text_info_area .tit').css('opacity','0');
            $('.text_info_area .desc').css('opacity','0');

        },
        movePage() {
            const config = {
                component : COAS2002 // 가입 > 약관동의
            }
            modalService.openPopup(config)
        },
        closePage() { 
                appService.moveMain(); // 메인으로
        },
        handleScroll(){ // 스크롤 이벤트
            const divSelectors = ['.page_01','.page_02','.page_03']
            divSelectors.forEach(selector => {
                const targetDiv = this.$el.querySelector(selector)
                if(targetDiv){
                    const rect = targetDiv.getBoundingClientRect();
                    if(rect.top < window.innerHeight){
                        let badge =   $(targetDiv).find(".mint_badge")
                        let tit =   $(targetDiv).find(".tit")
                        let desc =   $(targetDiv).find(".desc")
                        setTimeout(function(){badge.animate({opacity:'1'},500)},500);
                        setTimeout(function(){tit.animate({opacity:'1'},500)},800);
                        setTimeout(function(){desc.animate({opacity:'1'},500)},1100);

                        let index = selector.substring(6,9);
                        $('.info_slider'+index).slick('slickPlay');
                    }
                }
            })
        }
    }
}
</script>