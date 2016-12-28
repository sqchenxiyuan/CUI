/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
eval("'use strict';\n\ndocument.ready = function (fun) {\n  var t = setInterval(a, 10); //设计一个定时器，循环调用a函数\n  function a() {\n    if (document && document.getElementsByTagName && document.getElementById && document.body) {\n      fun();\n      clearInterval(t);\n    }\n  }\n};\n\ndocument.ready(function () {\n  var items = Array.from(document.querySelectorAll('[data-scroll]'));\n  items.forEach(function (item) {\n    item.onclick = function () {\n      return false;\n    };\n    item.addEventListener('click', scrollEvent);\n  });\n});\n\nfunction scrollEvent() {\n  var to = this.getAttribute('href').replace(/^#/, '');\n\n  var todom = document.getElementById(to);\n  scrollTo(todom);\n}\n\nfunction scrollTo(dom) {\n  console.log(dom.offsetTop);\n  console.log(document.body.scrollTop);\n  setScroll(document.body, dom.offsetTop, 500);\n}\n\nfunction setScroll(dom, to, speed) {\n  var starttime = new Date().getTime();\n  var starttop = dom.scrollTop;\n  var delay = Math.abs(starttop - to) / (speed * window.screen.availHeight / 100) * 1000;\n\n  startScroll();\n\n  function startScroll() {\n    if (change()) {\n      setTimeout(startScroll, 10);\n    }\n  }\n\n  function change() {\n    var nowtime = new Date().getTime();\n    var p = (nowtime - starttime) / delay;\n    if (p > 1) p = 1;\n    dom.scrollTop = starttop + (to - starttop) * p;\n\n    if (p === 1) {\n      return false;\n    } else {\n      return true;\n    }\n  }\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJkb2N1bWVudCIsInJlYWR5IiwiZnVuIiwidCIsInNldEludGVydmFsIiwiYSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZ2V0RWxlbWVudEJ5SWQiLCJib2R5IiwiY2xlYXJJbnRlcnZhbCIsIml0ZW1zIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJpdGVtIiwib25jbGljayIsImFkZEV2ZW50TGlzdGVuZXIiLCJzY3JvbGxFdmVudCIsInRvIiwiZ2V0QXR0cmlidXRlIiwicmVwbGFjZSIsInRvZG9tIiwic2Nyb2xsVG8iLCJkb20iLCJjb25zb2xlIiwibG9nIiwib2Zmc2V0VG9wIiwic2Nyb2xsVG9wIiwic2V0U2Nyb2xsIiwic3BlZWQiLCJzdGFydHRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInN0YXJ0dG9wIiwiZGVsYXkiLCJNYXRoIiwiYWJzIiwid2luZG93Iiwic2NyZWVuIiwiYXZhaWxIZWlnaHQiLCJzdGFydFNjcm9sbCIsImNoYW5nZSIsInNldFRpbWVvdXQiLCJub3d0aW1lIiwicCJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsU0FBU0MsS0FBVCxHQUFlLFVBQVNDLEdBQVQsRUFBYTtBQUN4QixNQUFJQyxJQUFJQyxZQUFZQyxDQUFaLEVBQWMsRUFBZCxDQUFSLENBRHdCLENBQ0U7QUFDMUIsV0FBU0EsQ0FBVCxHQUFZO0FBQ1IsUUFBR0wsWUFBWUEsU0FBU00sb0JBQXJCLElBQTZDTixTQUFTTyxjQUF0RCxJQUF3RVAsU0FBU1EsSUFBcEYsRUFDQTtBQUNJTjtBQUNBTyxvQkFBY04sQ0FBZDtBQUNIO0FBQ0o7QUFDSixDQVREOztBQVdBSCxTQUFTQyxLQUFULENBQWUsWUFBVTtBQUN2QixNQUFJUyxRQUFNQyxNQUFNQyxJQUFOLENBQVdaLFNBQVNhLGdCQUFULENBQTBCLGVBQTFCLENBQVgsQ0FBVjtBQUNBSCxRQUFNSSxPQUFOLENBQWMsVUFBU0MsSUFBVCxFQUFjO0FBQzFCQSxTQUFLQyxPQUFMLEdBQWEsWUFBVTtBQUFDLGFBQU8sS0FBUDtBQUFjLEtBQXRDO0FBQ0FELFNBQUtFLGdCQUFMLENBQXNCLE9BQXRCLEVBQThCQyxXQUE5QjtBQUNELEdBSEQ7QUFJRCxDQU5EOztBQVNBLFNBQVNBLFdBQVQsR0FBc0I7QUFDcEIsTUFBSUMsS0FBRyxLQUFLQyxZQUFMLENBQWtCLE1BQWxCLEVBQTBCQyxPQUExQixDQUFrQyxJQUFsQyxFQUF1QyxFQUF2QyxDQUFQOztBQUVBLE1BQUlDLFFBQU10QixTQUFTTyxjQUFULENBQXdCWSxFQUF4QixDQUFWO0FBQ0FJLFdBQVNELEtBQVQ7QUFDRDs7QUFFRCxTQUFTQyxRQUFULENBQWtCQyxHQUFsQixFQUFzQjtBQUNwQkMsVUFBUUMsR0FBUixDQUFZRixJQUFJRyxTQUFoQjtBQUNBRixVQUFRQyxHQUFSLENBQVkxQixTQUFTUSxJQUFULENBQWNvQixTQUExQjtBQUNBQyxZQUFVN0IsU0FBU1EsSUFBbkIsRUFBd0JnQixJQUFJRyxTQUE1QixFQUFzQyxHQUF0QztBQUNEOztBQUVELFNBQVNFLFNBQVQsQ0FBbUJMLEdBQW5CLEVBQXVCTCxFQUF2QixFQUEwQlcsS0FBMUIsRUFBZ0M7QUFDOUIsTUFBSUMsWUFBVSxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFBZDtBQUNBLE1BQUlDLFdBQVNWLElBQUlJLFNBQWpCO0FBQ0EsTUFBSU8sUUFBTUMsS0FBS0MsR0FBTCxDQUFTSCxXQUFTZixFQUFsQixLQUF1QlcsUUFBTVEsT0FBT0MsTUFBUCxDQUFjQyxXQUFwQixHQUFnQyxHQUF2RCxJQUE0RCxJQUF0RTs7QUFFQUM7O0FBRUEsV0FBU0EsV0FBVCxHQUFzQjtBQUNwQixRQUFHQyxRQUFILEVBQVk7QUFDVkMsaUJBQVdGLFdBQVgsRUFBdUIsRUFBdkI7QUFDRDtBQUNGOztBQUVELFdBQVNDLE1BQVQsR0FBaUI7QUFDZixRQUFJRSxVQUFRLElBQUlaLElBQUosR0FBV0MsT0FBWCxFQUFaO0FBQ0EsUUFBSVksSUFBRSxDQUFDRCxVQUFRYixTQUFULElBQW9CSSxLQUExQjtBQUNBLFFBQUdVLElBQUUsQ0FBTCxFQUFPQSxJQUFFLENBQUY7QUFDUHJCLFFBQUlJLFNBQUosR0FBY00sV0FBUyxDQUFDZixLQUFHZSxRQUFKLElBQWNXLENBQXJDOztBQUVBLFFBQUdBLE1BQUksQ0FBUCxFQUFTO0FBQ1AsYUFBTyxLQUFQO0FBQ0QsS0FGRCxNQUVLO0FBQ0gsYUFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNGIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5yZWFkeT1mdW5jdGlvbihmdW4pe1xyXG4gICAgdmFyIHQgPSBzZXRJbnRlcnZhbChhLDEwKTsvL+iuvuiuoeS4gOS4quWumuaXtuWZqO+8jOW+queOr+iwg+eUqGHlh73mlbBcclxuICAgIGZ1bmN0aW9uIGEoKXtcclxuICAgICAgICBpZihkb2N1bWVudCAmJiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAmJiBkb2N1bWVudC5ib2R5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZnVuKCk7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZG9jdW1lbnQucmVhZHkoZnVuY3Rpb24oKXtcclxuICB2YXIgaXRlbXM9QXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zY3JvbGxdJykpO1xyXG4gIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICBpdGVtLm9uY2xpY2s9ZnVuY3Rpb24oKXtyZXR1cm4gZmFsc2U7fTtcclxuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLHNjcm9sbEV2ZW50KTtcclxuICB9KTtcclxufSk7XHJcblxyXG5cclxuZnVuY3Rpb24gc2Nyb2xsRXZlbnQoKXtcclxuICB2YXIgdG89dGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5yZXBsYWNlKC9eIy8sJycpO1xyXG5cclxuICB2YXIgdG9kb209ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodG8pO1xyXG4gIHNjcm9sbFRvKHRvZG9tKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2Nyb2xsVG8oZG9tKXtcclxuICBjb25zb2xlLmxvZyhkb20ub2Zmc2V0VG9wKTtcclxuICBjb25zb2xlLmxvZyhkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCk7XHJcbiAgc2V0U2Nyb2xsKGRvY3VtZW50LmJvZHksZG9tLm9mZnNldFRvcCw1MDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRTY3JvbGwoZG9tLHRvLHNwZWVkKXtcclxuICB2YXIgc3RhcnR0aW1lPW5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gIHZhciBzdGFydHRvcD1kb20uc2Nyb2xsVG9wO1xyXG4gIHZhciBkZWxheT1NYXRoLmFicyhzdGFydHRvcC10bykvKHNwZWVkKndpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQvMTAwKSoxMDAwO1xyXG5cclxuICBzdGFydFNjcm9sbCgpO1xyXG5cclxuICBmdW5jdGlvbiBzdGFydFNjcm9sbCgpe1xyXG4gICAgaWYoY2hhbmdlKCkpe1xyXG4gICAgICBzZXRUaW1lb3V0KHN0YXJ0U2Nyb2xsLDEwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNoYW5nZSgpe1xyXG4gICAgdmFyIG5vd3RpbWU9bmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB2YXIgcD0obm93dGltZS1zdGFydHRpbWUpL2RlbGF5O1xyXG4gICAgaWYocD4xKXA9MTtcclxuICAgIGRvbS5zY3JvbGxUb3A9c3RhcnR0b3ArKHRvLXN0YXJ0dG9wKSpwO1xyXG5cclxuICAgIGlmKHA9PT0xKXtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);