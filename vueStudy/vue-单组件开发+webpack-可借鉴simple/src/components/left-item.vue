<template>
  <div class="left">
    <div class="items">
      <input type="text" v-model="inputmsg" v-on:keyup="updatemsg">
      <a-item v-on:dragend="dragend2"></a-item>
    </div>
  </div>
</template>

<script>
export default {
  data:function(){
    return {
      inputmsg:"haha
    };
  },
  methods:{
    updatemsg:function(){
      console.log("我促发啦~~");
      this.$emit('updatemsg1');
    },
    dragend2:function(x,y){
      console.log("dragend!~~items");
      this.$emit('dragend',x,y);
    }
  }
}
</script>
