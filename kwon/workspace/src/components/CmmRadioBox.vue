<template> 

  <button :id="id" type="button" class="cmm-radio" :class="isActive" @click="clickItem" :aria-selected="checked?'true':'false'">
    <span class="tit">{{name}}</span>
    <!-- <span class="icon"><img :src="require(`@/assets/img/icon/${getFlnm||'out_off_45'}.png`)" alt=""></span> -->
  </button>

  <!-- <span class="cmm-radio" :class="{checked: checked}" >
    <span class="icon"><img :src="require(`@/assets/img/icon/${iconFlnm||'out_off_45'}.png`)" :alt="name"></span>
          
    <input type="radio" 
      :name="groupId" 
      :id="id"      
      @change="chngValue">
    
    <label :for="id" :class="{'t-hidden':txtNact}">
      {{name}}
    </label>
  </span> -->
</template>

<script>
  export default {
    name: 'CmmRadioBox',    
    data: () => {
      return {        
        isChngDate: null,   // 최종 출력Data 일자    
      }
    },
    props: {
      checked: Boolean,
      txtNact: Boolean,
      groupId: String,
      id: String,
      name: String,
      iconFlnm: String,      
    },
    methods: {
      initComponent() {
        this.isChngDate = new Date()         
      },
      clickItem() {
        // this.$emit('input', event.target.id)
        this.$emit('clickItem')
      },
    },    
    created() {
      this.initComponent()
    },
    computed : {
      getFlnm() {
        if (this.iconFlnm === null) {
          return 'out_off_45'
        }
        
        return this.checked?this.iconFlnm.replace("off", "on"):this.iconFlnm
      },
      isActive() {
        return {
          active: this.checked
        }
      },
    },
  }
</script>

<style scoped>
</style>
