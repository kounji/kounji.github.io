<template>
  <div class="custom_box">
    <div class="content_wrap">
      <div class="progressBar_wrapper">
        <div class="progressBar">
          <div class="bar">
            <div class="popover_wrap">
              <span class="popover">
                <em>D-<span class="num">{{reMainDays}}</span></em>
                <em class="num percent blind">{{reMainDaysPer}}</em>
                <span class="arrow"></span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="loan_date">
        <span>신규<em class="num">{{startDateConv}}</em></span>
        <span>만기<em class="num">{{endDateConv}}</em></span>
      </div>
    </div>
  </div>
</template>
<script>

import {dayDiff, dateFormat} from '@/utils/date'

  export default {
    name: 'CmmProgress',
      data: () => {
      return {               
      }
    },
    props: {      
      data: {        
        type: Object,
        default: () => ({})
      },
      startDate: String,
      endDate  : String,
    },
    created() {
      
    },
    methods: {
      initAnimation() {
        this.$nextTick(() => {

          var progressBar = $('.progressBar .bar');
        
          progressBar.each(function(){
            var progressNum = $(this).children().find('.popover .percent').text();
            var popoverWrap = $(this).children('.popover_wrap');
            // var popoverWidth = $(this).children().find('.popover').outerWidth() / 2;
            // var transformXWidth = popoverWidth * 0.1;
            // var transformXWidthOver = $(this).children().find('.popover').outerWidth() * 0.1;
            
            // console.log(transformXWidth);
            // console.log(transformXWidthOver);
  
            if(progressNum >= 100) {
              progressNum = 100;
              // $(this).addClass('over');
              popoverWrap.css('transform','translateX(-100%)');
              popoverWrap.animate({
                left: progressNum + "%"
              },2000,function(){
                popoverWrap.addClass('full');
              });
            } else if(progressNum == 0) {
              popoverWrap.addClass('zero');
            } else {
              popoverWrap.animate({
                left: progressNum +'%'
              },2000);
              // popoverWrap.css('transform','translateX(-'+transformXWidth+'rem)');
            }
  
            progressBar.css('width','0');
            popoverWrap.css('left','0');	
            //console.log('progressNum', progressNum)			
            $(this).animate({					
              width: progressNum + '%',
            },2000);
            
          });
        })
      }
    },
    watch: {
      endDate(after) {
        if(after) this.initAnimation()
      },
    },
    computed : {
      startDateConv(){
        return dateFormat(this.startDate, 'YYYY.MM.DD')
      },
      endDateConv(){
        return dateFormat(this.endDate, 'YYYY.MM.DD')
      },
      reMainDays(){
        let toDate = dateFormat(new Date(), 'YYYYMMDD')

        if(this.endDate > toDate) {
          return dayDiff(this.endDate, toDate)
        } else {
          return ''
        }
      },
      reMainDaysPer(){
        let toDate = dateFormat(new Date(), 'YYYYMMDD')

        if(this.endDate > toDate) {
          let allgap = dayDiff(this.endDate, this.startDate)
          let nowgap = dayDiff(toDate, this.startDate)

          return Math.floor(nowgap/allgap * 100)

        } else {
          return 100
        }
      }
    }
  }
</script>

<style scoped>
</style>
