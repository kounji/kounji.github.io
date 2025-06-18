<template>
  <div>
    <!-- slide popup S -->
    <div class="dimmed" style="display:block;"></div>
    <div class="popup_box">
      <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
        <div class="popup_header">
          <h1>{{title}}</h1>
        </div>
        <div class="popup_content com_btn_bottom">
          <div class="com_txt_type03">
                    <!-- <ul class="com_radio_type05">
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="sPMRadio" id="sPMRadio04" v-model="selectMonth" value="1w" @change="monthClick('1w')">
                                <label for="sPMRadio04">
                                    <span>1주일</span>			
                                </label>
                            </div>	
                        </li>                      
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="sPMRadio" id="sPMRadio01" v-model="selectMonth" value="1m" @change="monthClick('1m')">
                                <label for="sPMRadio01">
                                    <span>1개월</span>			
                                </label>	
                            </div>	
                        </li>
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="sPMRadio" id="sPMRadio02" v-model="selectMonth" value="3m" @change="monthClick('3m')">
                                <label for="sPMRadio02">
                                    <span>3개월</span>							
                                </label>	
                            </div>	
                        </li>
                        <li>
                            <div class="btn_radio">
                                <input type="radio" name="sPMRadio" id="sPMRadio03" v-model="selectMonth" value="6m" @change="monthClick('6m')">
                                <label for="sPMRadio03">
                                    <span>6개월</span>							
                                </label>	
                            </div>	
                        </li>
                    </ul>             -->
                    <!-- v4 접근성 관련 UI변경 -->
                    <div class="box_radio_group">
                        <div class="btn_box_radio">
                            <button type="button" role="radio" @click.prevent="monthClick('1w')" aria-checked="false"><span>1주일</span></button>
                        </div>
                        <div class="btn_box_radio">
                            <button type="button" role="radio" @click.prevent="monthClick('1m')" aria-checked="false"><span>1개월</span></button>
                        </div>
                        <div class="btn_box_radio">
                            <button type="button" role="radio" @click.prevent="monthClick('3m')" aria-checked="false"><span>3개월</span></button>
                        </div>
                        <div class="btn_box_radio">
                            <button type="button" role="radio" @click.prevent="monthClick('6m')" aria-checked="false"><span>6개월</span></button>
                        </div>
                    </div>
                    <!-- 20211013 한별 수정 S -->
                    <div class="com_inputarea_type06">
                        <div class="com_inputnum2 input_date com_word1 ani-active">
                            <div class="com_input_type01" role="button" title="시작일 선택" @click="fn_popupCalendar($event, 'stDt')">
                                <input type="type" id="startDate" ref="startDate" data-popup="alert_popup" readonly class="input_cal_date com_txtright_type01" name="startDate" :value="startDate" required placeholder="년월일 8자리숫자">
                                <label for="startDate"></label>
                            </div>
                            <div class="com_input_type01" role="button" title="종료일 선택" @click="fn_popupCalendar($event, 'edDt')">
                                <input type="type" id="endDate" ref="endDate" data-popup="alert_popup" readonly class="input_cal_date com_txtright_type01" name="endDate" :value="endDate" required data-placeholder="년월일 8자리숫자">
                                <label for="endDate"></label>
                            </div>
                        </div>
                    </div>
          </div>

      </div>
        <div class="popup_footer">
          <div class="btn_full_box">
            <a href="javascript:void(0);" class="btn btn_mint" @click="confirmHandler()">확인</a>
          </div>
        </div>
        <a href="javascript:void(0);" class="btn_close" @click="close()"><span class="">닫기</span></a>
      </div>
    </div>
    <!--// slide popup E -->
  </div>
</template>

<script>
  import popupMixin from '@/common/mixins/popupMixin'
  import commonMixin from '@/common/mixins/commonMixin'
  import {dateFormat, monthAdd, dayAdd, isValidDate} from '@/utils/date'
  import modalService from '@/service/modalService'
  import {mapGetters} from 'vuex'

  export default {
    name: 'SelectPopupMonth',
    computed: {
      ...mapGetters('modal', [
				'modalList',
				'modalConfig',
				'modalComponent',
				'modalAriaHidden',
				'hasModal',
				'hasLoadingBackground',
				'hasLoading',
				'toastList',
				'toastMessage',
				'hasToast'
      ]),
      title() {
        return this.params.title || '기간설정'
      },
      cStartDate(){
        return (this.startDate !== '')? dateFormat(this.startDate, 'YYYY.MM.DD') : ''
      },
      cEndDate(){
        return (this.endDate !== '')?dateFormat(this.endDate, 'YYYY.MM.DD') : ''
      },
      renderer() {
        return this.modalConfig.renderer && this.modalConfig.renderer.component
      }
    },
    data: function() {
      return {
        startDate: '', // 시작 년월 YYYYMM
        endDate: '', // 종료 년월 YYYYMM
        directInputYn: false,
        directInputDate: '',
        selectMonth : '',
        today : dateFormat(new Date(), "YYYY-MM-DD")
      }
    },
    methods: {
      initComponent() {
        this.startDate = dateFormat(this.params.startDate, 'YYYY.MM.DD') || ''
        this.endDate   = dateFormat(this.params.endDate, 'YYYY.MM.DD') || ''

        // v4 접근성 수정관련 JQuery 추가
        $(document).off('click.btn_box_radio').on('click.btn_box_radio', '.btn_box_radio button', function(){
            $(this).parent().siblings().find('>button').removeClass('on');
            $(this).parent().siblings().find('>button').attr('aria-checked', 'false');
            $(this).addClass('on');
            $(this).attr('aria-checked', 'true');
        });
      },
      // 확인
      confirmHandler() {
        if (this.validateConfirm()) {
          const data = {
            startDate : this.startDate.split(".").join(""),
            endDate   : this.endDate.split(".").join(""),
          }
          this.close(data)
        }
      },
      // 유효성 체크
      validateConfirm() {
        // 시작 월 체크
        if (!this.startDate) {
          this.alert('시작 일을 선택하세요')
          this.$refs.startDate.focus()
          return false
        }
        
        if(!isValidDate(this.startDate.split(".").join("")))
        {
          this.alert('비정상적인 시작일 입니다.')
          this.$refs.startDate.focus()
          return false
        }

        // 종료 월 체크
        if (!this.endDate) {
          this.alert('종료 일을 선택하세요')
          this.$refs.endDate.focus()
          return false
        }

        if(!isValidDate(this.endDate.split(".").join("")))
        {
          this.alert('비정상적인 종료일 입니다.')
          this.$refs.endDate.focus()
          return false
        }

        if(this.startDate.split(".").join("") > this.endDate.split(".").join(""))
        {
          this.alert('시작일은 종료일보다 클수 없습니다.')
          this.$refs.startDate.focus()
          return false
        }

        return true
      },
      // 월 버튼 클릭
      monthClick(value) {

        if(this.endDate === "" || !isValidDate(this.endDate.split(".").join("")))
        {
          this.alert('종료 일을 확인해 주십시오')
          this.$refs.endDate.focus()
          return false
        }else{
          //value == 0 직접입력
          if(value === '1w')
          {
            this.startDate = dayAdd(-7, this.endDate.split(".").join(""),'YYYY.MM.DD')
            this.selectMonth = '1w'
          }else if(value === '1m')
          {
            this.startDate = monthAdd(-1, this.endDate.split(".").join(""), 'YYYY.MM.DD')
            this.selectMonth = '1m'
          }else if(value === '3m')
          {
            this.startDate = monthAdd(-3, this.endDate.split(".").join(""), 'YYYY.MM.DD')
            this.selectMonth = '3m'
          }else if(value === '6m')
          {
            this.startDate = monthAdd(-6, this.endDate.split(".").join(""), 'YYYY.MM.DD')
            this.selectMonth = '6m'
          }
        }
      },
      // 날짜단위로 표현 변경 (YYYY.MM.DD)
      addDate(e) {
          
          //수동으로 날짜를 변경하였을 경우 기간선택 리셋
          if (this.selectMonth !== '') this.clearSelectMonth()

          let tmpDateValue = e.target.value.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣][a-z][A-Z][.]/g,'')

          if(tmpDateValue.length > 4 && tmpDateValue.length <= 6){
            tmpDateValue = tmpDateValue.substr(0,4) + "." + tmpDateValue.substr(4)
          } else if(tmpDateValue.length > 6){
            tmpDateValue= tmpDateValue.substr(0,4) + "." + tmpDateValue.substr(4, 2) + "." + tmpDateValue.substr(6)
          }

          if (e.target.id === "startDate")
          {
            this.startDate = tmpDateValue
          }else{
            this.endDate   = tmpDateValue
          }
      },
      delDateValue(target)
      {
        this.clearSelectMonth()
        if (target=== "startDate")
        {
          this.startDate = ''
          this.$refs.startDate.focus()
        }else{
          this.endDate   = ''
          this.$refs.endDate.focus()
        }
      },
      //기간선택 Radio 제거
      clearSelectMonth(){
        this.selectMonth = ''
      },
      fn_popupCalendar(evt, type) {
            let tmpDt = ""
            let config = {}
            if(type === 'stDt')
            {
                if(this.startDate !== null && this.startDate !== '')
                {
                  tmpDt = this.startDate.split(".").join("")
                }

                let edDtTmp = ''
                if(this.endDate !== null && this.endDate !== '')
                {
                  edDtTmp = this.endDate.split(".").join("")
                }

                config = {
                    pDate   : tmpDt,
                    minDate : '',
                    maxDate : edDtTmp
                }
            }else{
                if(this.endDate !== null && this.endDate !== '')
                {
                  tmpDt = this.endDate.split(".").join("")
                }
                
                let stDtTmp = ''
                if(this.startDate !== null && this.startDate !== '')
                {
                  stDtTmp = this.startDate.split(".").join("")
                }

                config = {
                        pDate   : tmpDt,
                        minDate : stDtTmp,
                        maxDate : this.today
                    }
            }
            modalService.calendarPopup(config).then(response => {
                console.log('response ==> ', response)
                if(response !== undefined && response !== null && response!=='')
                {
                    evt.target.value = dateFormat(response, "YYYY-MM-DD").split("-").join(".")
                    if(type === 'stDt')
                    {
                        this.startDate = evt.target.value
                    }else{
                        this.endDate = evt.target.value
                    }
                }
            })

        },      
    },
    mounted() {
      this.initComponent()
    },
    created(){

      //부모 style overflow hidden 처리
      // const parentModalId  = this.$parent.$el.firstElementChild
      // const parentModalChildNodes = parentModalId.childNodes[1].childNodes
      // for(let k=0; k <  parentModalChildNodes.length; k++)
      // {
      //   const childElement = parentModalChildNodes[k]
      //   if(childElement.className !== undefined && childElement.className.indexOf("popup_content") > -1)
      //   {
      //     childElement.style.overflow = "hidden"
      //     break
      //   }
      // }

      let parentModalId  = document.getElementById("modal_" + (this.modalList.length - 1))

      if(parentModalId === null) {
        parentModalId = this.$parent.$parent.$el.firstElementChild
        const parentModalChildNodes = parentModalId.childNodes[1]
        parentModalChildNodes.style.overflow = "hidden" 
      }
      else {
        const parentModalChildNodes = parentModalId.childNodes[1].childNodes
        for(let k=0; k <  parentModalChildNodes.length; k++)
        {
          const childElement = parentModalChildNodes[k]
          if(childElement.className !== undefined && childElement.className.indexOf("popup_content") > -1)
          {
            childElement.style.overflow = "hidden"
            break
          }
        }
      }

    },
    destroyed(){
      //부모 style overflow hidden 제거처리
      // const parentModalId  = this.$parent.$el.firstElementChild
      // const parentModalChildNodes = parentModalId.childNodes[1].childNodes
      // for(let k=0; k <  parentModalChildNodes.length; k++)
      // {
      //   const childElement = parentModalChildNodes[k]
      //   if(childElement.className !== undefined && childElement.className.indexOf("popup_content") > -1)
      //   {
      //     childElement.style.overflow = ""
      //     break
      //   }
      // }

      let parentModalId  = document.getElementById("modal_" + (this.modalList.length))
      
      if(parentModalId === null) {
        parentModalId = this.$parent.$parent.$el.firstElementChild
        const parentModalChildNodes = parentModalId.childNodes[1]
        parentModalChildNodes.style.overflow = "" 
      }
      else {
        const parentModalChildNodes = parentModalId.childNodes[1].childNodes
        for(let k=0; k <  parentModalChildNodes.length; k++)
        {
          const childElement = parentModalChildNodes[k]
          if(childElement.className !== undefined && childElement.className.indexOf("popup_content") > -1)
          {
            childElement.style.overflow = ""
            break
          }
        }
      }
    },    
    components: {
    },
		mixins: [
      popupMixin,
      commonMixin
		],
  }
</script>