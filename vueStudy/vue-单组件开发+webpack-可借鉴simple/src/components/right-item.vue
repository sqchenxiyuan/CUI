<template>
  <div class="right">
    <div class="show">
      <a-form v-for="a in count" :x.sync="a.x" :y.sync="a.y"></a-form>
    </div>
  </div>
</template>

<script>
export default{
   data:function(){
     return {
       count:[],
     };
   },
   mounted:function(){
     var that=this;
     this.$parent.$on("updatemsg2",function(){
      console.log("我听到父组件的召唤了~~");
     });

     this.$parent.$on("dragend2right",function(x,y){
      console.log("dragend!~~right");
      console.log(x,y);
      var pageP=getPageP(that.$el.getElementsByClassName("show")[0]);
        console.log(pageP);
      x=x-pageP.x;
      y=y-pageP.y;
      console.log(x,y);
      if(x>=0&&y>=0){
        that.$data.count.push({
          x:x,
          y:y
        });
      }
     });
   },
}

function getPageP(e){
  var x=e.offsetLeft;
  var y=e.offsetTop;
  while(e.offsetParent.offsetParent){
    e=e.offsetParent;
    x+=e.offsetLeft;
    x-=e.scrollLeft;
    y+=e.offsetTop;
    y-=e.scrollTop;
  }
  return {
    x:x,
    y:y
  };
}

</script>
