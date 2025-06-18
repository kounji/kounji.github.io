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
      mapDiv: null,
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
      document.body.scrollTo(0, 0); // 네이버 지도 줌인/아웃 튐 현상 방지
      this.mapDiv = this.$refs.map;
      this.addScript();
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
          } else if (this.mapMode == "bicycle") {
            this.drawBicycle();
          }
        }

        script.onerror = () => {
          console.error("네이버 지도 api 에러");
          this.$emit("map-error");
        };
      }, 300)
    },
    /**
     * 네이버지도 레티나 그리기
     */
    drawRetina(){
      /* 
        TB_MY_CO_FM_MOIS_BKPH_CRDN(자전거길 주변시설) 데이터의 gpsX, gpsY값이 바껴있어서, 
        isReverse 값으로 바뀐 여부를 판단한다.
        이 부분이 (x, y)로 되어있다. 원래는 (y, x)가 맞다.
      */
      if(this.mapDataList.length > 0 && this.mapDataList[0].isReverse) {
        this.mapDataList.map(data => {
          var temp = data.lttdCrdnVal;
          data.lttdCrdnVal = data.lgtdCrdnVal;
          data.lgtdCrdnVal = temp;
        });
      }

      // 좌표값이 이상한 데이터가 전달될 경우
      this.mapDataList = this.mapDataList.filter(data => this.checkRangeInKorea(data.lttdCrdnVal, data.lgtdCrdnVal));
      if(this.mapDataList.length <= 0) {
        this.mapDataList = this.mapInfoList;
        if(!naver?.maps?.Service) {
          setTimeout(() => {
            // 좌표가 아닌 주소로 검색해서 지도 표시
            this.drawGeocoder();
          }, 200);
        }
        return;
      }
      
      //센터포지선 설정
      let centerPosY = this.mapDataList[0].lttdCrdnVal,
          centerPosX = this.mapDataList[0].lgtdCrdnVal; 

      let zoomSize, isList;
      if(this.mapDataList.length > 2) { // 나타낼 위치의 대상이 다건인 경우
        zoomSize = 13;
        isList = true;
      } else {
        zoomSize = 15;
        isList = false;
      }
      
      var naverMap = new naver.maps.Map(this.mapDiv, {
                      center: new naver.maps.LatLng(parseFloat(centerPosY), parseFloat(centerPosX)),
                      zoom: zoomSize,
                      zoomControl: true,
                      zoomControlOptions: {
                        style: naver.maps.ZoomControlStyle.SMALL,
                        position: naver.maps.Position.RIGHT_CENTER,
                      },
                      scaleControl: false, // 축척 표시
                      logoControl: true, // 네이버 로고
                      logoControlOptions: {
                        position: naver.maps.Position.LEFT_BOTTOM,
                      },
                      mapDataControl: false, // @NAVER Corp 문구
                      minZoom: 6,
                    });

      this.mapDataList.forEach((item) => {
        let centerPosY = item.lttdCrdnVal,
            centerPosX = item.lgtdCrdnVal; 

        let markerOptions = {
            position: new naver.maps.LatLng(parseFloat(centerPosY), parseFloat(centerPosX)),
            map: naverMap,
          };
        var marker = new naver.maps.Marker(markerOptions);

        if(!isList && item.name) { // 다건인 경우 인포윈도우를 설정하지 않음
          let contentHtml = `
            <div class="map_bubble">
              <h2>${item.name}</h2>
          `;

          if(item.adr) {
            contentHtml += `<p>${item.adr}</p>`;
          }
          contentHtml += '</div>';

          let infoWindow = new naver.maps.InfoWindow({
            content: contentHtml,
            disableAnchor: true,
            borderwidth: 0,
            borderColor: "transparent",
            backgroundColor: "transparent",
            pixelOffset: new naver.maps.Point(0, -20),
          });

          // 마커 클릭 시 정보창 열기
          naver.maps.Event.addListener(marker, "click", function(e) {
            if(infoWindow.getMap()) {
              infoWindow.close();
            } else {
              infoWindow.open(naverMap, marker);
            }
          });

          setTimeout(() => {
            infoWindow.open(naverMap, marker);
          }, 300);
        }
      });
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

        var naverMap = new naver.maps.Map(this.mapDiv, {
                            center: new naver.maps.LatLng( parseFloat(centerPosY), parseFloat(centerPosX)),
                            zoom : 13, //지도의 초기 줌 레벨
                            zoomControl: true,
                            zoomControlOptions: {
                              style: naver.maps.ZoomControlStyle.SMALL,
                              position: naver.maps.Position.RIGHT_CENTER,
                            },
                            scaleControl: false, // 축척 표시
                            logoControl: true, // 네이버 로고
                            logoControlOptions: {
                              position: naver.maps.Position.LEFT_BOTTOM,
                            },
                            mapDataControl: false, // @NAVER Corp 문구
                            minZoom: 6,
                        });

        let i = 1;

        polyLineList.push(new naver.maps.LatLng( parseFloat(centerPosY), parseFloat(centerPosX)))

        for (i=1; i < this.mapDataList.length ; i++){
            let PrevY = parseFloat(this.mapDataList[i - 1].lttdCrdnVal);
            let PrevX = parseFloat(this.mapDataList[i - 1].lgtdCrdnVal);
            let PosY = parseFloat(this.mapDataList[i].lttdCrdnVal);
            let PosX = parseFloat(this.mapDataList[i].lgtdCrdnVal); 

            if (Math.abs(PosY - PrevY) >= 100 || Math.abs(PosX - PrevX) >= 100) {
              new naver.maps.Polyline({
                map: naverMap,
                path: polyLineList
              });

              polyLineList = []
              polyLineList.push(new naver.maps.LatLng(PosY, PosX))
            } else {
              polyLineList.push(new naver.maps.LatLng(PosY, PosX))
            }
        }

        if (polyLineList.length > 0) {
          new naver.maps.Polyline({
              map: naverMap,
              path: polyLineList
          });
        }
        

       //네이버 자전거길 셋팅
      //const bicycleLayer = new naver.maps.BicycleLayer();
      //bicycleLayer.setMap(naverMap);

      } 
    },

    drawBicycle() {
      
      if ( this.mapDataList.length > 0) {
        // 값이 이상한 데이터 거르기 => 한반도 위도, 경도 범위 안에 데이터만 사용
        this.mapDataList = this.mapDataList.filter((data) => {
          return this.checkRangeInKorea(data.lttdCrdnVal, data.lgtdCrdnVal);
        });

        //센터포지선 설정 (시작점으로 변경)
        let middleIndex = Math.floor(this.mapDataList.length / 2);
        let centerData = this.mapDataList[middleIndex];
        if(!centerData || !centerData.lttdCrdnVal || !centerData.lgtdCrdnVal) {
          console.warn('지도 좌표가 비어있습니다.');
          middleIndex = 0;
        }
        let centerPosY = this.mapDataList[middleIndex].lttdCrdnVal;
        let centerPosX = this.mapDataList[middleIndex].lgtdCrdnVal;

        var naverMap = new naver.maps.Map(this.mapDiv, {
                            center: new naver.maps.LatLng( parseFloat(centerPosY), parseFloat(centerPosX)),
                            zoom : 13, //지도의 초기 줌 레벨
                            zoomControl: true,
                            zoomControlOptions: {
                              style: naver.maps.ZoomControlStyle.SMALL,
                              position: naver.maps.Position.RIGHT_CENTER,
                            },
                            scaleControl: false, // 축척 표시
                            logoControl: true, // 네이버 로고
                            logoControlOptions: {
                              position: naver.maps.Position.LEFT_BOTTOM,
                            },
                            mapDataControl: false, // @NAVER Corp 문구
                            minZoom: 6,
                        });

        const bicycleLayer = new naver.maps.BicycleLayer();
        bicycleLayer.setMap(naverMap);
      } 
    },
    /**
     * 네이버지도 주소기반
     */
    drawGeocoder(retryCount = 0){
      if(!window.naver || !naver.maps || !naver.maps.Service) {
        if(retryCount < 5) {
          console.warn(`[naverMap] drawGeocoder 지도 API 준비 안됨, 재시도 횟수 : ${retryCount + 1}`);
          setTimeout(() => this.drawGeocoder(retryCount + 1), 200);
        } else {
          console.error("[naverMap] drawGeocoder 지도 API 로딩 실패");
          this.$emit("map-error");
        }
        return;
      }

      //디폴트 맵 설정
      var naverMap = new naver.maps.Map(this.mapDiv, {
                        center: new naver.maps.LatLng(37.3595316, 127.1052133),
                        zoom: 15,
                        zoomControl: true,
                        zoomControlOptions: {
                          style: naver.maps.ZoomControlStyle.SMALL,
                          position: naver.maps.Position.RIGHT_CENTER,
                        },
                        scaleControl: false, // 축척 표시
                        logoControl: true, // 네이버 로고
                        logoControlOptions: {
                          position: naver.maps.Position.LEFT_BOTTOM,
                        },
                        mapDataControl: false, // @NAVER Corp 문구
                        minZoom: 6,
                    });

      naver.maps.Service.geocode(
        { query: this.mapDataList[0].adr },
        ( status, response ) => {
          if (status === naver.maps.Service.Status.ERROR) {
            this.$emit("map-error");
            return;
          }

          if (response.v2.meta.totalCount === 0) {
            this.$emit("map-error");
            return;
          }

          let item = response.v2.addresses[0],
              point = new naver.maps.Point(item.x, item.y);

          if(!this.checkRangeInKorea(item.y, item.x)) {
            this.$emit("map-error");
            return;
          }

          naverMap.setCenter(point);

          //센터포지선 설정
          let centerPosY = item.y;
          let centerPosX = item.x; 

          let lat = parseFloat(centerPosY);
          let lng = parseFloat(centerPosX);
          
          // 마커 생성
          let markerOptions = {
            position: new naver.maps.LatLng(lat, lng),
            map: naverMap,
          };
          var marker = new naver.maps.Marker(markerOptions);

          if(this.mapDataList[0].name) {
            let contentHtml = `
              <div class="map_bubble">
                <h2>${this.mapDataList[0].name}</h2>
            `;
  
            if(this.mapDataList[0].adr) {
              contentHtml += `<p>${this.mapDataList[0].adr}</p>`;
            }
            contentHtml += '</div>';

            let infoWindow = new naver.maps.InfoWindow({
              content: contentHtml,
              disableAnchor: true,
              borderwidth: 0,
              borderColor: "transparent",
              backgroundColor: "transparent",
              pixelOffset: new naver.maps.Point(0, -20),
            });
            
            // 마커 클릭 시 정보창 열기
            naver.maps.Event.addListener(marker, "click", function(e) {
              if(infoWindow.getMap()) {
                infoWindow.close();
              } else {
                infoWindow.open(naverMap, marker);
              }
            });

            setTimeout(() => {
              infoWindow.open(naverMap, marker);
            }, 300);
          }
        });
    },
    /* 위도 경도가 한반도 범위내에 있는 값인지 확인 */
    checkRangeInKorea(lat, lng) {
      return lat >= 33 && lat <= 43 && lng >= 125 && lng <= 134;
    }
  },
  watch:{

  }    
}
</script>