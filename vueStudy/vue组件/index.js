import Vue from 'vue';

import modal from './模态框/modal.vue';

new Vue({
  el:"#main",
  data:{
    modelstate:false
  },
  methods:{
    openModel(){
      this.modelstate=true;
    },
    closeModel(){
      this.modelstate=false;
    }
  },
  components:{
    modal
  }
});
