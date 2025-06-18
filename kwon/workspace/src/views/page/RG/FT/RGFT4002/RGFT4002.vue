<!--
/*************************************************************************
* @ 서비스경로 : NH 지역정보 >	지역축제 >	관심지역 설정 팝업
* @ 페이지설명 : NH지역정보 > 지역축제 > 관심지역 설정 팝업
* @ 파일명     : src/views/page/RG/FT/RGFT4002/RGFT4002.vue
* @ 작성자     : CS541601
* @ 작성일     : 2025-02-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-11             CS541601                 신규
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>관심지역 설정</h1>
        </div>

        <div class="popup_content">
            <div class="local_select">
                <div class="mylocal">
                    <p class="txt"><span>관심지역</span>을<br>설정해보세요.</p>
                    <p>한 지역만 설정할 수 있어요.</p>
                </div>
                <ul class="sel_list">
                    <li :class="regionMap[rgn.rgnC]" v-for="(rgn, index) in resInterstRegionList" :key="index">
                        <input 
                            type="radio" 
                            v-model="selectedLocal"
                            :value="rgn.rgnC" 
                            name="local_rdo" 
                            :id="'local_rdo_' + rgn.rgnC"
                        >
                        <label :for="'local_rdo_' + rgn.rgnC">{{rgn.rgnCnm}}</label>
                    </li>
                </ul>
            </div>
        </div>

        <div class="popup_footer fixed">
            <div class="btn_full_box">
                <button type="button" 
                :disabled="!selectedLocal" 
                :class="{ 'primary': selectedLocal, 'gray': !selectedLocal }" 
                class="btns lg"
                @click.prevent="register()"
                >설정완료</button>
            </div>
        </div>
        <a href="javascript:void(0);" @click.prevent="close('exit')" role="button" class="btn_close"><span class="blind">팝업닫기</span></a>
    </div>
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'

export default {
    name : "RGFT4002",
    data: () => {
        return {
			selectedLocal: null,
            resInterstRegionList : [], 
            regionMap: {
                1: "seoul",
                2: "incheon",
                3: "daejeon",
                4: "daegu",
                5: "gwangju",
                6: "busan",
                7: "ulsan",
                8: "sejong",
                31: "gyeonggi",
                32: "gangwon",
                33: "chungbuk",
                34: "chungnam",
                35: "gyeongbuk",
                36: "gyeongnam",
                37: "jeonbuk",
                38: "jeonnam",
                39: "jeju",
            }
        }
    },
    mixins: [
            popupMixin
           ,commonMixin
        ],
    mounted() {
        this.initComponent();

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    mixins: [
        commonMixin
        ,popupMixin
    ],
    methods:{
        getData() {
            console.log("관심지역 목록 조회!!")
            this.searchResultCnt = 0;
        
            const config = {
                url: '/rg/ft/02r01',
                data: {
                        uyn : "1",
                    }
            }
            console.log("getData()===========>",config)
            apiService.call(config).then(response => {
                console.log("관심지역 목록 조회111 response >>> : ", response)
                this.resInterstRegionList = response.regionInfoList
            })
        },
        getInterestRegion() {
            // 나의 관심지역 조회
            const config = {
                url: 'rg/ft/02r02',
                data: {
                    mydtCusno: this.getUserInfo("mydtCusno"),
                    rgnDsc: "01",    // 관심지역 축제 : 01, 지역문화 : 02, 부동산: 03
                }
            }

            apiService.call(config).then(response => {
                console.log("나의 관심지역 조회 response >>> : ", response)
                this.selectedLocal = response.provC.toString().trim()
            })
        },
        register() {
            console.log("관심지역 저장!!")
            const config = {
                url: 'rg/ft/02s01',
                data: {
                    mydtCusno: this.getUserInfo("mydtCusno"),
                    rgnDsc : "01", // 관심지역 축제 : 01, 지역문화 : 02, 부동산: 03
                    provC : this.selectedLocal,
                },
            }
            
            apiService.call(config).then(response => {
                if(response.rspC == "0000") { // 정상 처리
                    this.setInteRgnInfo("01", "1", "관심지역 설정") // rgnDsc, uYn, Desc
                    this.close("refresh")
                }
            })
        },
        initComponent() {
            this.mydtCusno = this.getUserInfo('mydtCusno')

            // 목록조회
            this.getData();
            
            // 나의 관심지역 조회
            this.getInterestRegion();
        },
    },
}

</script>