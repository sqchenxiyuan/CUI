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
       console.log(this.$data.inputmsg);
       this.$emit('change-msg',"123","223","323");
     }
   }
});
Vue.component("left-item",leftItem);


var rightItem=Vue.extend({
   template: '#right-item'
});
Vue.component("right-item",rightItem);


var mainVM=new Vue({
  el:"#main",
  methods:{
    'getmsg':function(a,b,c){
       console.log(a,b,c);
    }
  }
});
