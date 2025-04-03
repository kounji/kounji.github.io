<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 서비스준비중
* @ 파일명     : src/views/page/CO/CO/COCO1115/COCO1115.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-18             CS515729                 최초작성
*************************************************************************/
-->
<template>
	<!-- <page>
		<div id="content" class="type_01 no_cont sub_main">
            <div class="dimmed" style="display:block;"></div>	
            <div class="alert_popup" id="alert_popup" style="display:block;">
							<div class="popup_header">    
								<h1></h1>
								<a @click.prevent="COCO1115_close()" class="btn_close"><span class="blind">팝업닫기</span></a>	
							</div>							
                <div class="popup_content">
                    <p class="txt_service">서비스 준비중입니다.</p>
                </div>
                <div class="popup_footer">
                    <div class="btn_box">
                        <a class="btn btn_mint btn_no"  v-on:click.prevent="move()">확인</a>
                    </div>
                </div>
            </div>
		</div>
	</page> -->
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1></h1>
            <a href="javascript:void(0);" @click.prevent="COCO1115_close()" class="btn_close"><span class="blind">팝업닫기</span></a>	
		</div>
			
		<div class="popup_content com_bg_type00">
       <div class="secede_box com_bg_type00">
				<p class="txt com_service">서비스 준비중입니다..</p>
			</div>  
		</div>
		
		<div class="popup_footer">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint btn_no" @click.prevent="moveSB()">메인으로 바로가기</a>
			</div>
		</div>

		<!-- <a href="javascript:void(0);" class="btn_close"><span class="blind">팝업닫기</span></a> -->
		
	</div>
	<!--// full popup E -->	
</template>
<script>
	import routerService from '@/service/routerService'
	import appService from '@/service/appService'
	export default {
		name: 'COCO1115',
		data: () => {
			return {
			}
		},
		methods: { 
			move() {
				routerService.moveMain()
			},
      moveSB() {
            appService.moveMain()
      },			
			COCO1115_close(){
					this.$router.go(-1)
			}			
		},
		mounted() {

		},
		components: {      
		},
	}
</script>