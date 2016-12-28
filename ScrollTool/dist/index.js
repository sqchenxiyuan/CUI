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
eval("'use strict';\n\n(function () {\n  window.easyScroll = function () {\n    var easyScroll = {};\n    var label = 'data-scroll';\n    var hashStart = 'scrollS=';\n    var hashEnd = '=scrollE';\n    var reg = null;\n\n    easyScroll.init = function () {\n      reg = new RegExp(hashStart + '(\\\\S+)' + hashEnd, 'g');\n      var items = Array.from(document.querySelectorAll('[' + label + ']'));\n      items.forEach(function (item) {\n        item.onclick = function () {\n          return false;\n        };\n        item.removeEventListener('click', scrollEvent);\n        item.addEventListener('click', scrollEvent);\n      });\n      initScroll();\n    };\n\n    function initScroll() {\n      var id = null;\n      if (id = URL2ID()) {\n        scrollTo(id);\n      }\n    }\n\n    function scrollEvent() {\n      var to = null;\n      if (!(to = this.getAttribute(label))) {\n        to = this.getAttribute('href');\n      }\n      ID2URL(to);\n      scrollTo(to);\n    }\n\n    function scrollTo(to) {\n      var todom = document.querySelector(to);\n      setScroll(document.body, todom.offsetTop, 500);\n    }\n\n    function setScroll(dom, to, speed) {\n      var starttime = new Date().getTime();\n      var starttop = dom.scrollTop;\n      var delay = Math.abs(starttop - to) / (speed * window.screen.availHeight / 100) * 1000;\n\n      startScroll();\n\n      function startScroll() {\n        if (change()) {\n          setTimeout(startScroll, 15);\n        }\n      }\n\n      function change() {\n        var nowtime = new Date().getTime();\n        var p = (nowtime - starttime) / delay;\n        if (p > 1) p = 1;\n        dom.scrollTop = starttop + (to - starttop) * p;\n\n        if (p === 1) {\n          return false;\n        } else {\n          return true;\n        }\n      }\n    }\n\n    function URL2ID() {\n      var hash = location.hash;\n      if (hash.match(reg)[0]) {\n        return hash.match(reg)[0].replace(hashStart, '').replace(hashEnd, '');\n      }\n      return false;\n    }\n\n    function ID2URL(id) {\n      var hash = location.hash;\n      if (reg.test(hash)) {\n        hash = hash.replace(reg, '' + hashStart + id + hashEnd);\n      } else {\n        hash += '' + hashStart + id + hashEnd;\n      }\n      location.hash = hash;\n    }\n\n    return easyScroll;\n  }();\n})();\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJlYXN5U2Nyb2xsIiwibGFiZWwiLCJoYXNoU3RhcnQiLCJoYXNoRW5kIiwicmVnIiwiaW5pdCIsIlJlZ0V4cCIsIml0ZW1zIiwiQXJyYXkiLCJmcm9tIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIml0ZW0iLCJvbmNsaWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNjcm9sbEV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXRTY3JvbGwiLCJpZCIsIlVSTDJJRCIsInNjcm9sbFRvIiwidG8iLCJnZXRBdHRyaWJ1dGUiLCJJRDJVUkwiLCJ0b2RvbSIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRTY3JvbGwiLCJib2R5Iiwib2Zmc2V0VG9wIiwiZG9tIiwic3BlZWQiLCJzdGFydHRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInN0YXJ0dG9wIiwic2Nyb2xsVG9wIiwiZGVsYXkiLCJNYXRoIiwiYWJzIiwic2NyZWVuIiwiYXZhaWxIZWlnaHQiLCJzdGFydFNjcm9sbCIsImNoYW5nZSIsInNldFRpbWVvdXQiLCJub3d0aW1lIiwicCIsImhhc2giLCJsb2NhdGlvbiIsIm1hdGNoIiwicmVwbGFjZSIsInRlc3QiXSwibWFwcGluZ3MiOiI7O0FBQUMsYUFBVTtBQUNUQSxTQUFPQyxVQUFQLEdBQWtCLFlBQVU7QUFDMUIsUUFBSUEsYUFBVyxFQUFmO0FBQ0EsUUFBSUMsUUFBTSxhQUFWO0FBQ0EsUUFBSUMsWUFBVSxVQUFkO0FBQ0EsUUFBSUMsVUFBUSxVQUFaO0FBQ0EsUUFBSUMsTUFBSSxJQUFSOztBQUVBSixlQUFXSyxJQUFYLEdBQWdCLFlBQVU7QUFDeEJELFlBQUksSUFBSUUsTUFBSixDQUFXSixZQUFVLFFBQVYsR0FBbUJDLE9BQTlCLEVBQXNDLEdBQXRDLENBQUo7QUFDQSxVQUFJSSxRQUFNQyxNQUFNQyxJQUFOLENBQVdDLFNBQVNDLGdC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QVQsR0FBcUJpQixFQUFyQixHQUEwQmhCLE9BQTFCO0FBQ0Q7QUFDRDZDLGVBQVNELElBQVQsR0FBY0EsSUFBZDtBQUNEOztBQUVELFdBQU8vQyxVQUFQO0FBQ0QsR0F2RmlCLEVBQWxCO0FBd0ZELENBekZBLEdBQUQiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xyXG4gIHdpbmRvdy5lYXN5U2Nyb2xsPWZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgZWFzeVNjcm9sbD17fTtcclxuICAgIHZhciBsYWJlbD0nZGF0YS1zY3JvbGwnO1xyXG4gICAgdmFyIGhhc2hTdGFydD0nc2Nyb2xsUz0nO1xyXG4gICAgdmFyIGhhc2hFbmQ9Jz1zY3JvbGxFJztcclxuICAgIHZhciByZWc9bnVsbDtcclxuXHJcbiAgICBlYXN5U2Nyb2xsLmluaXQ9ZnVuY3Rpb24oKXtcclxuICAgICAgcmVnPW5ldyBSZWdFeHAoaGFzaFN0YXJ0KycoXFxcXFMrKScraGFzaEVuZCwnZycpO1xyXG4gICAgICB2YXIgaXRlbXM9QXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbJHtsYWJlbH1dYCkpO1xyXG4gICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgIGl0ZW0ub25jbGljaz1mdW5jdGlvbigpe3JldHVybiBmYWxzZTt9O1xyXG4gICAgICAgIGl0ZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLHNjcm9sbEV2ZW50KTtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxzY3JvbGxFdmVudCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpbml0U2Nyb2xsKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTY3JvbGwoKXtcclxuICAgICAgdmFyIGlkPW51bGw7XHJcbiAgICAgIGlmKChpZD1VUkwySUQoKSkpe1xyXG4gICAgICAgIHNjcm9sbFRvKGlkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBzY3JvbGxFdmVudCgpe1xyXG4gICAgICB2YXIgdG89bnVsbDtcclxuICAgICAgaWYoISh0bz10aGlzLmdldEF0dHJpYnV0ZShsYWJlbCkpKXtcclxuICAgICAgICB0bz10aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG4gICAgICB9XHJcbiAgICAgIElEMlVSTCh0byk7XHJcbiAgICAgIHNjcm9sbFRvKHRvKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzY3JvbGxUbyh0byl7XHJcbiAgICAgIHZhciB0b2RvbT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRvKTtcclxuICAgICAgc2V0U2Nyb2xsKGRvY3VtZW50LmJvZHksdG9kb20ub2Zmc2V0VG9wLDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0U2Nyb2xsKGRvbSx0byxzcGVlZCl7XHJcbiAgICAgIHZhciBzdGFydHRpbWU9bmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgIHZhciBzdGFydHRvcD1kb20uc2Nyb2xsVG9wO1xyXG4gICAgICB2YXIgZGVsYXk9TWF0aC5hYnMoc3RhcnR0b3AtdG8pLyhzcGVlZCp3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0LzEwMCkqMTAwMDtcclxuXHJcbiAgICAgIHN0YXJ0U2Nyb2xsKCk7XHJcblxyXG4gICAgICBmdW5jdGlvbiBzdGFydFNjcm9sbCgpe1xyXG4gICAgICAgIGlmKGNoYW5nZSgpKXtcclxuICAgICAgICAgIHNldFRpbWVvdXQoc3RhcnRTY3JvbGwsMTUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gY2hhbmdlKCl7XHJcbiAgICAgICAgdmFyIG5vd3RpbWU9bmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdmFyIHA9KG5vd3RpbWUtc3RhcnR0aW1lKS9kZWxheTtcclxuICAgICAgICBpZihwPjEpcD0xO1xyXG4gICAgICAgIGRvbS5zY3JvbGxUb3A9c3RhcnR0b3ArKHRvLXN0YXJ0dG9wKSpwO1xyXG5cclxuICAgICAgICBpZihwPT09MSl7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gVVJMMklEKCl7XHJcbiAgICAgIHZhciBoYXNoPWxvY2F0aW9uLmhhc2g7XHJcbiAgICAgIGlmKGhhc2gubWF0Y2gocmVnKVswXSl7XHJcbiAgICAgICAgcmV0dXJuIGhhc2gubWF0Y2gocmVnKVswXS5yZXBsYWNlKGhhc2hTdGFydCwnJykucmVwbGFjZShoYXNoRW5kLCcnKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gSUQyVVJMKGlkKXtcclxuICAgICAgdmFyIGhhc2g9bG9jYXRpb24uaGFzaDtcclxuICAgICAgaWYocmVnLnRlc3QoaGFzaCkpe1xyXG4gICAgICAgIGhhc2g9aGFzaC5yZXBsYWNlKHJlZyxgJHtoYXNoU3RhcnR9JHtpZH0ke2hhc2hFbmR9YCk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGhhc2grPWAke2hhc2hTdGFydH0ke2lkfSR7aGFzaEVuZH1gO1xyXG4gICAgICB9XHJcbiAgICAgIGxvY2F0aW9uLmhhc2g9aGFzaDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWFzeVNjcm9sbDtcclxuICB9KCk7XHJcbn0oKSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);