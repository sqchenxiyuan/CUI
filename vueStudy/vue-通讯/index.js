Vue.config.debug = true;

//可拖拽的插件
var aItem=Vue.extend({
   template: '#a-item',
   data:function(){
     return {
       top:0,
       left:0
     };
   },
   mounted:function(){
     var that=this;
     var div=this.$el;
     var startX;
     var startY;
     var startOffX;
     var startOffY;
     var startTop;
     var startLeft;
     div.addEventListener("mousedown",down);
     function down(e){
       startTop=that.$data.top;
       startLeft=that.$data.left;
       startX=e.clientX;
       startY=e.clientY;
       startOffX=e.offsetX;
       startOffY=e.offsetY;
       div.removeEventListener("mousedown",down);
       document.addEventListener("mousemove",move);
       document.addEventListener("mouseup",mouseup);
     }
     function move(e){
         var endTop=startTop+e.clientY-startY;
         var endLeft=startLeft+e.clientX-startX;
         that.$data.top=endTop;
         that.$data.left=endLeft;
      }
     function mouseup(e){
       console.log("dragend!~~item");
       that.$emit("dragend",e.pageX-startOffX,e.pageY-startOffY);
       document.removeEventListener("mouseup",mouseup);
       document.removeEventListener("mousemove",move);
       div.addEventListener("mousedown",down);
       that.$data.top=0;
       that.$data.left=0;
     }
   }
});
Vue.component("a-item",aItem);

//注册左列表
var leftItem=Vue.extend({
   template: '#left-item',
   data:function(){
     return {
       inputmsg:"haha"
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
});
Vue.component("left-item",leftItem);


//注册右列表
var rightItem=Vue.extend({
   template: '#right-item',
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
});
Vue.component("right-item",rightItem);

//注册表单项
var aForm=Vue.extend({
   template: '#a-form',
   props: ['x','y']
});
Vue.component("a-form",aForm);


var mainVM=new Vue({
  el:"#main",
  methods:{
    'getmsg':function(a,b,c){
      console.log("我听到了子组件的召唤~~");
      this.$emit('updatemsg2');
    },
    dragend:function(x,y){
      console.log("dragend!~~main");
      this.$emit('dragend2right',x,y);
    }
  }
});





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
