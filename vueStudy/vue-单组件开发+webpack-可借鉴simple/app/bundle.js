/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(3)

/* template */
var __vue_template__ = __webpack_require__(5)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\Gits\\CUI\\vueStudy\\vue-单组件开发+webpack-可借鉴simple\\src\\components\\left-item.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e7ec1ee", __vue_options__)
  } else {
    hotAPI.reload("data-v-2e7ec1ee", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] left-item.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(4)

/* template */
var __vue_template__ = __webpack_require__(6)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\Gits\\CUI\\vueStudy\\vue-单组件开发+webpack-可借鉴simple\\src\\components\\right-item.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c66c99f", __vue_options__)
  } else {
    hotAPI.reload("data-v-4c66c99f", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] right-item.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(7))(0);

/***/ },
/* 3 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
  data: function data() {
    return {
      inputmsg: "haha"
    };
  },
  methods: {
    updatemsg: function updatemsg() {
      console.log("我促发啦~~");
      this.$emit('updatemsg1');
    },
    dragend2: function dragend2(x, y) {
      console.log("dragend!~~items");
      this.$emit('dragend', x, y);
    }
  }
};

/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

exports.default = {
  data: function data() {
    return {
      count: []
    };
  },
  mounted: function mounted() {
    var that = this;
    this.$parent.$on("updatemsg2", function () {
      console.log("我听到父组件的召唤了~~");
    });

    this.$parent.$on("dragend2right", function (x, y) {
      console.log("dragend!~~right");
      console.log(x, y);
      var pageP = getPageP(that.$el.getElementsByClassName("show")[0]);
      console.log(pageP);
      x = x - pageP.x;
      y = y - pageP.y;
      console.log(x, y);
      if (x >= 0 && y >= 0) {
        that.$data.count.push({
          x: x,
          y: y
        });
      }
    });
  }
};


function getPageP(e) {
  var x = e.offsetLeft;
  var y = e.offsetTop;
  while (e.offsetParent.offsetParent) {
    e = e.offsetParent;
    x += e.offsetLeft;
    x -= e.scrollLeft;
    y += e.offsetTop;
    y -= e.scrollTop;
  }
  return {
    x: x,
    y: y
  };
}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "left"
  }, [_h('div', {
    staticClass: "items"
  }, [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (inputmsg),
      expression: "inputmsg"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _s(inputmsg)
    },
    on: {
      "keyup": updatemsg,
      "input": function($event) {
        if ($event.target.composing) return;
        inputmsg = $event.target.value
      }
    }
  }), " ", _h('a-item', {
    on: {
      "dragend": dragend2
    }
  })])])
}},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2e7ec1ee", module.exports)
  }
}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "right"
  }, [_h('div', {
    staticClass: "show"
  }, [_l((count), function(a) {
    return _h('a-form', {
      attrs: {
        "x": a.x,
        "y": a.y
      }
    })
  })])])
}},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4c66c99f", module.exports)
  }
}

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = vendor;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _vue = __webpack_require__(2);

var _vue2 = _interopRequireDefault(_vue);

var _leftItem = __webpack_require__(0);

var _leftItem2 = _interopRequireDefault(_leftItem);

var _rightItem = __webpack_require__(1);

var _rightItem2 = _interopRequireDefault(_rightItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.debug = true;

//可拖拽的插件
var aItem = _vue2.default.extend({
  template: '#a-item',
  data: function data() {
    return {
      top: 0,
      left: 0
    };
  },
  mounted: function mounted() {
    var that = this;
    var div = this.$el;
    var startX;
    var startY;
    var startOffX;
    var startOffY;
    var startTop;
    var startLeft;
    div.addEventListener("mousedown", down);
    function down(e) {
      startTop = that.$data.top;
      startLeft = that.$data.left;
      startX = e.clientX;
      startY = e.clientY;
      startOffX = e.offsetX;
      startOffY = e.offsetY;
      div.removeEventListener("mousedown", down);
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", mouseup);
    }
    function move(e) {
      var endTop = startTop + e.clientY - startY;
      var endLeft = startLeft + e.clientX - startX;
      that.$data.top = endTop;
      that.$data.left = endLeft;
    }
    function mouseup(e) {
      console.log("dragend!~~item");
      that.$emit("dragend", e.pageX - startOffX, e.pageY - startOffY);
      document.removeEventListener("mouseup", mouseup);
      document.removeEventListener("mousemove", move);
      div.addEventListener("mousedown", down);
      that.$data.top = 0;
      that.$data.left = 0;
    }
  }
});
_vue2.default.component("a-item", aItem);

//注册左列表

_vue2.default.component("left-item", _leftItem2.default);

//注册右列表

_vue2.default.component("right-item", _rightItem2.default);

//注册表单项
var aForm = _vue2.default.extend({
  template: '#a-form',
  props: ['x', 'y']
});
_vue2.default.component("a-form", aForm);

var mainVM = new _vue2.default({
  el: "#main",
  methods: {
    getmsg: function getmsg(a, b, c) {
      console.log("我听到了子组件的召唤~~");
      this.$emit('updatemsg2');
    },
    dragend: function dragend(x, y) {
      console.log("dragend!~~main");
      this.$emit('dragend2right', x, y);
    }
  }
});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map