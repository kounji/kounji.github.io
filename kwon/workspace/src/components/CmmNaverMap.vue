<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 네이버맵연동
* @ 파일명     : src/components/CmmNaverMap.vue
* @ 작성자     : CS540683
* @ 작성일     : 2025-03-13
* @ 비고       : 
* @param {String} mapMode retina|polyLine|geocoder 레티나(마커)|폴리라인|geocoder
* @param {Array}  mapInfoList Y,X 좌표 리스트 | 위치정보
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-13              CS540683                 최초작성
************************************************************************/
-->
<template>
    <div id="map" ref="map" class="map_area"></div>
</template>

<script>

export default {
  name: 'CmmNaverMap',
  props: {
      mapMode: {
          type: String,
          required: true
      },    
      mapInfoList: {
          type: Array,
          required: true,
          default: () => ([])
      },
  },
  data: function() {
    return {
      mapDataList: this.mapInfoList,
      naverMap: null,
      mapDiv : null
    }
  },
  mixins: [
  ],
  computed: {
  },
  created() {
    
  },
  beforeUpdated(){
  },
  mounted() {
    this.initComponent();
  },
  beforeDestroy(){
    const naverMapScr = document.getElementById("naverMapScr");
    naverMapScr.parentElement.removeChild(naverMapScr);
    this.naverMap  = null;
  },
  methods: {
    initComponent() {
      this.mapDiv = this.$refs.map;
      this.addScript()
    },
    /**
     * 네이버지도 연동 스크립트 호출
     */
    addScript(){
      setTimeout(() => {
        const script = document.createElement("script");
        script.setAttribute("type", "text/javaScript");
        script.setAttribute("src",  "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" + import.meta.env.VITE_NAVER_MAP_APPKEY + "&submodules=drawing,geocoder");
        script.setAttribute("id",   "naverMapScr");
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () =>{
          if (this.mapMode == "polyLine") {
            this.drawPolyLine();
          } else if (this.mapMode == "retina") {
            this.drawRetina();
          } else if (this.mapMode == "geocoder") {
            this.drawGeocoder();
          }
        }
      }, 300)
    },
    /**
     * 네이버지도 레티나 그리기
     */
    drawRetina(){
      
      //센터포지선 설정
      let centerPosY = this.mapDataList[0].lttdCrdnVal;
      let centerPosX = this.mapDataList[0].lgtdCrdnVal; 
      
      this.naverMap = new naver.maps.Map(this.mapDiv, {
                              center: new naver.maps.LatLng(parseFloat(centerPosX), parseFloat(centerPosY) ),
                              zoom: 10
                          });

      
      this.mapDataList.forEach((item) => {
          let centerPosY = item.lttdCrdnVal
          let centerPosX = item.lgtdCrdnVal

          let markerOptions = {
              position: new naver.maps.LatLng(parseFloat(centerPosX), parseFloat(centerPosY)),
              map: this.naverMap,
              icon: {
                url: "@/assets/images/img/ico_pin.jpg"
            }
          };
          new naver.maps.Marker(markerOptions);
      })

    },
    /**
     * 네이버지도 폴리라인 그리기
     */
    drawPolyLine(){
      
      let polyLineList = [];
  
      if ( this.mapDataList.length > 0) {

        //센터포지선 설정 (시작점으로 변경)
        let centerPosY = this.mapDataList[0].lttdCrdnVal;
        let centerPosX = this.mapDataList[0].lgtdCrdnVal;

        this.naverMap = new naver.maps.Map(this.mapDiv, {
                            center: new naver.maps.LatLng( parseFloat(centerPosY), parseFloat(centerPosX)),
                            zoom : 15, //지도의 초기 줌 레벨
                        });

        
        let i = 0;

        for (i=0; i < this.mapDataList.length ; i++){
            let PosY = this.mapDataList[i].lttdCrdnVal;
            let PosX = this.mapDataList[i].lgtdCrdnVal; 
            polyLineList.push(new naver.maps.LatLng( parseFloat(PosY), parseFloat(PosX)))
        }

        new naver.maps.Polyline({
              map: this.naverMap,
              path: polyLineList
        });
        

       //네이버 자전거길 셋팅
      //const bicycleLayer = new naver.maps.BicycleLayer();
      //bicycleLayer.setMap(this.naverMap);

      } 
    },
    /**
     * 네이버지도 주소기반
     */
    drawGeocoder(){
      
      //디폴트 맵 설정
      this.naverMap = new naver.maps.Map(this.mapDiv, {
                        center: new naver.maps.LatLng(37.3595316, 127.1052133),
                        zoom: 15
                    });

      naver.maps.Service.geocode({
        query: this.mapDataList[0]
      }, function(status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
              return alert('Something Wrong!');
          }

          if (response.v2.meta.totalCount === 0) {
              return alert('totalCount' + response.v2.meta.totalCount);
          }

          let htmlAddresses = [],
              item = response.v2.addresses[0],
              point = new naver.maps.Point(item.x, item.y);

          if (item.roadAddress) {
              htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
          }

          if (item.jibunAddress) {
              htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
          }

          if (item.englishAddress) {
              htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
          }

          this.naverMap.setCenter(point);

      });
      }
  },
  watch:{

  }    
}
</script>