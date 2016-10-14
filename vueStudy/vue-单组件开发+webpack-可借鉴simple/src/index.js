//import Vue from 'vue';

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
import leftItem from "./components/left-item.vue";
Vue.component("left-item",leftItem);

//注册右列表
import rightItem from "./components/right-item.vue";
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
