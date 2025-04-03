<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 캔버스
* @ 파일명     : src/components/CmmCanvas.vue
* @ 작성자     : CS54068/3
* @ 작성일     : 2025-02-25
* @ 비고       : canva element 오류로 인한 수정
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-25              CS540683                 최초작성
************************************************************************/
-->
<template>
    <div>
      <canvas v-show="canvaMode == 'mama4001'" id="finance_style" ref=circle_mama4001></canvas>
      <canvas v-show="canvaMode == 'pdta4001'" id="cate_outline_chart" ref=circle_pdta4001></canvas>
      <canvas v-show="canvaMode == 'line'" id=staple_spend ref=staple_spend></canvas>
    </div>
</template>

<script>

import {drawlineChart, drawdountChart}  from '@/utils/canvas' //Import 선언

export default {
  name: 'cmmCanvas',
  props: {
    
      canvaMode: {
          type: String,
          required: false
      },
      cycleIdx: {
          type: Number,
          default: 0,
          required: false
      },
      cycledata: {        
          type: Object,
          default: () => ({})
      },      
      linedata: {        
          type: Array,
          default: () => ([])
      },
      pos: {
          type: Array,
          default: () => ([])
      }
  },
  data: function() {
    return {
      conText : null,
      canvas  : null,
      drawDount : null,
      drawline : null,
    }
  },
  mixins: [
  ],
  computed: {

  },
  created() {
  },
  mounted() {
      this.initComponent()
  },    
  methods: {
    initComponent() {
      if (this.canvas == null || this.conText == null) {

        if ( this.canvaMode == "line") {
          this.canvas = this.$refs.staple_spend; //CANVA ELEMENT
          this.conText = this.canvas.getContext("2d");
          this.canvasDrawLineBg();

          if ( this.linedata.length > 0){
            this.canvasDrawLine();
          }

        } else if ( this.canvaMode == "pdta4001") {
          this.canvas = this.$refs.circle_pdta4001; //CANVA ELEMENT
          this.conText = this.canvas.getContext("2d");
          this.canvasDrawDountBgChartPDTA4001();
          if ( this.cycledata.parts != undefined && this.cycledata.parts.pt.length > 0) {
              this.canvasDrawDountChartPDTA4001();
          }
        }else if ( this.canvaMode == "mama4001") {
          this.canvas = this.$refs.circle_mama4001; //CANVA ELEMENT
          this.conText = this.canvas.getContext("2d");
          this.canvasDrawDountBgChartMAMA4001();
          if ( this.cycledata.parts.pt.length > 0) {
              this.canvasDrawDountChartMAMA4001();
          }
        }

      }
    },

    canvasDrawLineBg(){
      this.drawline = new drawlineChart(this.conText); //canvas 인스턴스생성
      this.drawline.set(this.canvas, this.pos[0], this.pos[1], this.pos[2], this.pos[3], this.pos[4]) ; //cavas 위치지정
    },
    canvasDrawLine(){
      this.drawline.draw(this.linedata);  //그리기
    },
    canvasDrawDountBgChartPDTA4001(){
      this.drawDount = new drawdountChart(this.conText);
      this.drawDount.set(this.pos[0], this.pos[1], this.pos[2], this.pos[3], this.pos[4],this.pos[5], this.pos[6], this.pos[7], this.pos[8]);
      this.drawDount.bgdraw();
    },

    canvasDrawDountBgChartMAMA4001(){
      this.drawDount = new drawdountChart(this.conText);
      this.drawDount.set(this.pos[0], this.pos[1], this.pos[2], this.pos[3], this.pos[4],this.pos[5], this.pos[6], this.pos[7], this.pos[8], this.pos[9], this.pos[10]);
      this.drawDount.bgdraw();
    },

    canvasDrawDountChartPDTA4001(){
      //PDTA4001일 경우만 해당
      const colors =[
          [
              [
                  [0,'#FF929D'],
                  [0.5,'#FFB67C'],
                  [1,'#FF7459']
              ],   
              [
                  [0, 'transparent'],
                  [1, 'transparent']
                  
              ], 
              [
                  [0, 'transparent'],
                  [1, 'transparent']
              ],
          ],

          [
              [
                  [0,'transparent'],
                  [1,'transparent']
              ],   
              [
                  [1, '#72c8ff'],
                  [0, '#4579FF']
                  
              ], 
              [
                  [0, 'transparent'],
                  [1, 'transparent']
              ],
          ],

          [
              [
                  [0,'transparent'],
                  [1,'transparent']
              ],   
              [
                  [0, 'transparent'],
                  [1, 'transparent']
                  
              ], 
              [
                  [0.7, '#6D64F1'],
                  [0, '#7B96FF'],
              ],
          ]
      ]

      this.conText.clearRect(0, 0, 300, 300);
      this.cycledata.colors.cs = colors[this.cycleIdx || 0];
      this.drawDount.draw(this.cycledata);
    },

    canvasDrawDountChartMAMA4001(){
      //MAMA4001일 경우만 해당
      this.conText.clearRect(0, 0, 100, 100);
      this.drawDount.draw(this.cycledata);
    }    
  },
  watch:{
    cycleIdx: function(newVal, oldVal){
      if (newVal != oldVal){
        if ( this.canvaMode == "pdta4001") {
          this.canvasDrawDountChartPDTA4001();
        }else if ( this.canvaMode == "mama4001") {
          this.canvasDrawDountChartMAMA4001();
        }
      }
    },
    cycledata: function(newVal, oldVal){
      if (newVal != oldVal){
        if ( this.canvaMode == "pdta4001") {
          this.canvasDrawDountChartPDTA4001();
        }else if ( this.canvaMode == "mama4001") {
          this.canvasDrawDountChartMAMA4001();
        }
      }      
    },
    linedata: function(newVal, oldVal){
      if (newVal != oldVal){
        this.canvasDrawLine();
      }
    }
  }
}
</script>