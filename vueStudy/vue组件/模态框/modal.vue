<template lang="html">
  <div>
    <div class="modal-dialog" :style="dialogStyle">
      <div class="header">
        <slot name="header">
          <span>{{title}}</span>
          <span class="close" @click="closeModal">X</span>
        </slot>
      </div>
      <div class="body" :style="bodyStyle">
        <slot>
          <h1>请放入内容</h1>
        </slot>
      </div>
    </div>
    <div v-if="mask" class="modal-mask"></div>
  </div>
</template>

<script>
export default {
  props:{
    mask:{
      default:true,
      type:Boolean
    },
    autosize:{
      default:false,
      type:Boolean
    },
    width:{
      default:400,
      type:Number
    },
    height:{
      default:300,
      type:Number
    },
    title:{
      default:'Model',
      type:String
    }
  },
  data(){
    return {
      maxHeight:0,
      maxWeight:0,
    }
  },
  computed:{
    dialogStyle(){
      if(this.autosize){
        return {};
      }
      return {
        height:this.height+'px',
        width:this.width+'px',
      };
    },
    bodyStyle(){
      console.log(this.maxHeight,this.maxWidth)
      return {
        'max-height':this.maxHeight-40+'px',
        'max-width':this.maxWidth+'px',
      };
    }
  },
  mounted(){
    this.autoSize();
  },
  methods:{
    autoSize(){
      if(this.autosize){
        this.maxHeight=document.documentElement.clientHeight-20;
        this.maxWidth=document.documentElement.clientWidth;
      }else{
        this.maxHeight=this.height;
        this.maxWidth=this.width;
      }
      console.log(this.maxWidth)
    },
    closeModal(){
      this.$emit('close');
    }
  }
}
</script>

<style lang="css">

.modal{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.modal-dialog{
  z-index: 101;
  position: fixed;
  top:50%;
  left: 50%;
  min-height: 300px;
  min-width: 400px;
  transform: translate(-50%,-50%);
  background-color:white;
}

.modal-mask{
  z-index: 100;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color:rgba(0,0,0,0.5);
}

.modal-bg{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}

.header{
  height: 40px;
  line-height: 40px;
  padding: 0px 10px;
  background: black;
  color: white;
}

.close{
  cursor: pointer;
  float:right;
}


.body{
  min-height: 200px;
  overflow: auto;
}

</style>
