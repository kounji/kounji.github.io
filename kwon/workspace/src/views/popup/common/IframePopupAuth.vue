<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>{{title}}</h1>
        </div>
        <div class="popup_content">
            <iframe :src="url" style="width:100%;height:100%" @load="iframeOnload" ref="iframe"></iframe>
        </div>
        <a href="javascript:void(0);" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>
    </div>    
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name: 'IframePopupAuth',
    data: function() {
        return {
            iframeLocationCnt : 0,
        }
    },
    computed: {
        title() {
            return this.params.title || ''
        },
    url() {
        return this.params.url || ''
    },
    },     
    methods: {
        iframeComplete(response){
            // console.log(data)
            //this.$emit('test2', response)
            this.close(response)
        },
        iframeReceivedMesssage(e){
            console.log("window.addEventListener" , e.data.functionName)
            if (e.data.functionName === "iframeComplete")
            {
                this.iframeComplete(e.data.response)
            }
        },
        iframeOnload(){

        },
        closeP(){
        this.close()
        }
    },
    mounted() {
        window.addEventListener('message', this.iframeReceivedMesssage, false)
    },

    destroyed(){
        window.removeEventListener('message', this.iframeReceivedMesssage, false)
    },
    components: {
    },
    mixins: [
        popupMixin
    ],
}
</script>