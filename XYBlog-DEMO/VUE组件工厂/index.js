let layout={
	template:"<div>\
  						<keep-alive>\
    						<router-view></router-view>\
  						</keep-alive> \
            </div>"
}



let componentA={
	template:"<div @click='out'>this is A</div>",
	methods:{
		out(){
			this.$emit('event-out','a');
		}
	}
};
let componentB={
	template:"<div @click='out'>this is B</div>",
	methods:{
		out(){
			this.$emit('event-out','b');
		}
	}
};
let componentC={
	template:"<div @click='out'>this is C</div>",
	methods:{
		out(){
			this.$emit('event-out','c');
		}
	}
};

let factory={
	functional: true,
	render: function (createElement, context) {
		console.log(context.data)
		console.log(context.props)
	    function appropriateListComponent () {
			switch (context.props.type){
  			  case '1':return componentA;
  			  case '2':return componentB;
  			  case '3':return componentC;
  			  default: return componentA;
  		  }
	    }
	    return createElement(
	      appropriateListComponent(),
	      context,
		  context.data,
		  context.children
	    )
	  },
	props:{
		type:{
			type:String,
			default:'componentA'
		}
	},
    components:{
        componentA,
        componentB,
        componentC
    }
}


new Vue({
	el:"#app",
	template:'<div><factory :type="type" @event-out="out"></factory><input v-model="type" /></div>',
    data:{
  	  type:''
    },
	methods:{
		out(data){
			alert(data);
		}
	},
    components:{
  	  factory
    }
})
