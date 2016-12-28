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
eval("'use strict';\n\n(function () {\n  window.easyScroll = function () {\n    var easyScroll = {};\n    var label = 'data-scroll';\n    var hashStart = 'scrollS=';\n    var hashEnd = '=scrollE';\n    var reg = null;\n\n    easyScroll.init = function () {\n      reg = new RegExp(hashStart + '(\\\\S+)' + hashEnd, 'g');\n      var items = Array.from(document.querySelectorAll('[' + label + ']'));\n      items.forEach(function (item) {\n        item.onclick = function () {\n          return false;\n        };\n        item.removeEventListener('click', scrollEvent);\n        item.addEventListener('click', scrollEvent);\n      });\n      initScroll();\n    };\n\n    function initScroll() {\n      var id = null;\n      if (id = URL2ID()) {\n        scrollTo(id);\n      }\n    }\n\n    function scrollEvent() {\n      var to = null;\n      if (!(to = this.getAttribute(label))) {\n        to = this.getAttribute('href');\n      }\n      if (URL2ID() === to) return;\n      ID2URL(to);\n      scrollTo(to);\n    }\n\n    function scrollTo(to) {\n      var todom = document.querySelector(to);\n      var offsetparent = todom.offsetParent;\n\n      //\n      var x = 0,\n          y = 0;\n      var e = todom;\n      while (e) {\n        console.log(e.offsetTop);\n        x += e.offsetTop;\n        e = e.offsetParent;\n      }\n\n      e = todom.parentElement;\n      while (e) {\n        console.log(e.scrollHeight - e.clientHeight);\n        var h = e.scrollHeight - e.clientHeight;\n        y += e.scrollHeight - e.clientHeight;\n\n        var bbb = void 0;\n        if (x > y) {\n          setScroll(e, h, 500);\n        } else {\n          setScroll(e, h - y + x, 500);\n        }\n\n        e = e.parentElement;\n      }\n\n      console.log(x, y);\n      //\n      // setScroll(document.body,todom.offsetTop,500);\n    }\n\n    function setScroll(dom, to, speed) {\n      var starttime = new Date().getTime();\n      var starttop = dom.scrollTop;\n      var delay = Math.abs(starttop - to) / (speed * window.screen.availHeight / 100) * 1000;\n\n      startScroll();\n\n      function startScroll() {\n        if (change()) {\n          setTimeout(startScroll, 15);\n        }\n      }\n\n      function change() {\n        var nowtime = new Date().getTime();\n        var p = (nowtime - starttime) / delay;\n        if (p > 1) p = 1;\n        dom.scrollTop = starttop + (to - starttop) * p;\n\n        if (p === 1) {\n          return false;\n        } else {\n          return true;\n        }\n      }\n    }\n\n    function URL2ID() {\n      var hash = location.hash;\n      if (hash.match(reg)) {\n        return hash.match(reg)[0].replace(hashStart, '').replace(hashEnd, '');\n      }\n      return false;\n    }\n\n    function ID2URL(id) {\n      var hash = location.hash;\n      if (reg.test(hash)) {\n        hash = hash.replace(reg, '' + hashStart + id + hashEnd);\n      } else {\n        hash += '' + hashStart + id + hashEnd;\n      }\n      location.hash = hash;\n    }\n\n    return easyScroll;\n  }();\n})();\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJlYXN5U2Nyb2xsIiwibGFiZWwiLCJoYXNoU3RhcnQiLCJoYXNoRW5kIiwicmVnIiwiaW5pdCIsIlJlZ0V4cCIsIml0ZW1zIiwiQXJyYXkiLCJmcm9tIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIml0ZW0iLCJvbmNsaWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNjcm9sbEV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXRTY3JvbGwiLCJpZCIsIlVSTDJJRCIsInNjcm9sbFRvIiwidG8iLCJnZXRBdHRyaWJ1dGUiLCJJRDJVUkwiLCJ0b2RvbSIsInF1ZXJ5U2VsZWN0b3IiLCJvZmZzZXRwYXJlbnQiLCJvZmZzZXRQYXJlbnQiLCJ4IiwieSIsImUiLCJjb25zb2xlIiwibG9nIiwib2Zmc2V0VG9wIiwicGFyZW50RWxlbWVudCIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsImgiLCJiYmIiLCJzZXRTY3JvbGwiLCJkb20iLCJzcGVlZCIsInN0YXJ0dGltZSIsIkRhdGUiLCJnZXRUaW1lIiwic3RhcnR0b3AiLCJzY3JvbGxUb3AiLCJkZWxheSIsIk1hdGgiLCJhYnMiLCJzY3JlZW4iLCJhdmFpbEhlaWdodCIsInN0YXJ0U2Nyb2xsIiwiY2hhbmdlIiwic2V0VGltZW91dCIsIm5vd3RpbWUiLCJwIiwiaGFzaCIsImxvY2F0aW9uIiwibWF0Y2giLCJyZXBsYWNlIiwidGVzdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQyxhQUFVO0FBQ1RBLFNBQU9DLFVBQVAsR0FBa0IsWUFBVTtBQUMxQixRQUFJQSxhQUFXLEVBQWY7QUFDQSxRQUFJQyxRQUFNLGFBQVY7QUFDQSxRQUFJQyxZQUFVLFVBQWQ7QUFDQSxRQUFJQyxVQUFRLFVBQVo7QUFDQSxRQUFJQyxNQUFJLElBQVI7O0FBRUFKLGVBQVdLLElBQVgsR0FBZ0IsWUFBVTtBQUN4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QUUsQ0FBQ0QsVUFBUWIsU0FBVCxJQUFvQkssS0FBMUI7QUFDQSxZQUFHUyxJQUFFLENBQUwsRUFBT0EsSUFBRSxDQUFGO0FBQ1BoQixZQUFJTSxTQUFKLEdBQWNELFdBQVMsQ0FBQ3hCLEtBQUd3QixRQUFKLElBQWNXLENBQXJDOztBQUVBLFlBQUdBLE1BQUksQ0FBUCxFQUFTO0FBQ1AsaUJBQU8sS0FBUDtBQUNELFNBRkQsTUFFSztBQUNILGlCQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0Y7O0FBR0QsYUFBU3JDLE1BQVQsR0FBaUI7QUFDZixVQUFJc0MsT0FBS0MsU0FBU0QsSUFBbEI7QUFDQSxVQUFHQSxLQUFLRSxLQUFMLENBQVd4RCxHQUFYLENBQUgsRUFBbUI7QUFDakIsZUFBT3NELEtBQUtFLEtBQUwsQ0FBV3hELEdBQVgsRUFBZ0IsQ0FBaEIsRUFBbUJ5RCxPQUFuQixDQUEyQjNELFNBQTNCLEVBQXFDLEVBQXJDLEVBQXlDMkQsT0FBekMsQ0FBaUQxRCxPQUFqRCxFQUF5RCxFQUF6RCxDQUFQO0FBQ0Q7QUFDRCxhQUFPLEtBQVA7QUFDRDs7QUFFRCxhQUFTcUIsTUFBVCxDQUFnQkwsRUFBaEIsRUFBbUI7QUFDakIsVUFBSXVDLE9BQUtDLFNBQVNELElBQWxCO0FBQ0EsVUFBR3RELElBQUkwRCxJQUFKLENBQVNKLElBQVQsQ0FBSCxFQUFrQjtBQUNoQkEsZUFBS0EsS0FBS0csT0FBTCxDQUFhekQsR0FBYixPQUFvQkYsU0FBcEIsR0FBZ0NpQixFQUFoQyxHQUFxQ2hCLE9BQXJDLENBQUw7QUFDRCxPQUZELE1BRUs7QUFDSHVELHFCQUFTeEQsU0FBVCxHQUFxQmlCLEVBQXJCLEdBQTBCaEIsT0FBMUI7QUFDRDtBQUNEd0QsZUFBU0QsSUFBVCxHQUFjQSxJQUFkO0FBQ0Q7O0FBRUQsV0FBTzFELFVBQVA7QUFDRCxHQXRIaUIsRUFBbEI7QUF1SEQsQ0F4SEEsR0FBRCIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XHJcbiAgd2luZG93LmVhc3lTY3JvbGw9ZnVuY3Rpb24oKXtcclxuICAgIHZhciBlYXN5U2Nyb2xsPXt9O1xyXG4gICAgdmFyIGxhYmVsPSdkYXRhLXNjcm9sbCc7XHJcbiAgICB2YXIgaGFzaFN0YXJ0PSdzY3JvbGxTPSc7XHJcbiAgICB2YXIgaGFzaEVuZD0nPXNjcm9sbEUnO1xyXG4gICAgdmFyIHJlZz1udWxsO1xyXG5cclxuICAgIGVhc3lTY3JvbGwuaW5pdD1mdW5jdGlvbigpe1xyXG4gICAgICByZWc9bmV3IFJlZ0V4cChoYXNoU3RhcnQrJyhcXFxcUyspJytoYXNoRW5kLCdnJyk7XHJcbiAgICAgIHZhciBpdGVtcz1BcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFske2xhYmVsfV1gKSk7XHJcbiAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgaXRlbS5vbmNsaWNrPWZ1bmN0aW9uKCl7cmV0dXJuIGZhbHNlO307XHJcbiAgICAgICAgaXRlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsc2Nyb2xsRXZlbnQpO1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLHNjcm9sbEV2ZW50KTtcclxuICAgICAgfSk7XHJcbiAgICAgIGluaXRTY3JvbGwoKTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFNjcm9sbCgpe1xyXG4gICAgICB2YXIgaWQ9bnVsbDtcclxuICAgICAgaWYoKGlkPVVSTDJJRCgpKSl7XHJcbiAgICAgICAgc2Nyb2xsVG8oaWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHNjcm9sbEV2ZW50KCl7XHJcbiAgICAgIHZhciB0bz1udWxsO1xyXG4gICAgICBpZighKHRvPXRoaXMuZ2V0QXR0cmlidXRlKGxhYmVsKSkpe1xyXG4gICAgICAgIHRvPXRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYoVVJMMklEKCk9PT10bylyZXR1cm47XHJcbiAgICAgIElEMlVSTCh0byk7XHJcbiAgICAgIHNjcm9sbFRvKHRvKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzY3JvbGxUbyh0byl7XHJcbiAgICAgIHZhciB0b2RvbT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRvKTtcclxuICAgICAgdmFyIG9mZnNldHBhcmVudD10b2RvbS5vZmZzZXRQYXJlbnQ7XHJcblxyXG4gICAgICAvL1xyXG4gICAgICB2YXIgeD0wLHk9MDtcclxuICAgICAgdmFyIGU9dG9kb207XHJcbiAgICAgIHdoaWxlKGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUub2Zmc2V0VG9wKTtcclxuICAgICAgICB4Kz1lLm9mZnNldFRvcDtcclxuICAgICAgICBlPWUub2Zmc2V0UGFyZW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlPXRvZG9tLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgIHdoaWxlKGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUuc2Nyb2xsSGVpZ2h0LWUuY2xpZW50SGVpZ2h0KTtcclxuICAgICAgICBsZXQgaD1lLnNjcm9sbEhlaWdodC1lLmNsaWVudEhlaWdodDtcclxuICAgICAgICB5Kz1lLnNjcm9sbEhlaWdodC1lLmNsaWVudEhlaWdodDtcclxuXHJcbiAgICAgICAgbGV0IGJiYjtcclxuICAgICAgICBpZih4Pnkpe1xyXG4gICAgICAgICAgc2V0U2Nyb2xsKGUsaCw1MDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgc2V0U2Nyb2xsKGUsaC15K3gsNTAwKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBlPWUucGFyZW50RWxlbWVudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coeCx5KTtcclxuICAgICAgLy9cclxuICAgICAgLy8gc2V0U2Nyb2xsKGRvY3VtZW50LmJvZHksdG9kb20ub2Zmc2V0VG9wLDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0U2Nyb2xsKGRvbSx0byxzcGVlZCl7XHJcbiAgICAgIHZhciBzdGFydHRpbWU9bmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgIHZhciBzdGFydHRvcD1kb20uc2Nyb2xsVG9wO1xyXG4gICAgICB2YXIgZGVsYXk9TWF0aC5hYnMoc3RhcnR0b3AtdG8pLyhzcGVlZCp3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0LzEwMCkqMTAwMDtcclxuXHJcbiAgICAgIHN0YXJ0U2Nyb2xsKCk7XHJcblxyXG4gICAgICBmdW5jdGlvbiBzdGFydFNjcm9sbCgpe1xyXG4gICAgICAgIGlmKGNoYW5nZSgpKXtcclxuICAgICAgICAgIHNldFRpbWVvdXQoc3RhcnRTY3JvbGwsMTUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gY2hhbmdlKCl7XHJcbiAgICAgICAgdmFyIG5vd3RpbWU9bmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdmFyIHA9KG5vd3RpbWUtc3RhcnR0aW1lKS9kZWxheTtcclxuICAgICAgICBpZihwPjEpcD0xO1xyXG4gICAgICAgIGRvbS5zY3JvbGxUb3A9c3RhcnR0b3ArKHRvLXN0YXJ0dG9wKSpwO1xyXG5cclxuICAgICAgICBpZihwPT09MSl7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gVVJMMklEKCl7XHJcbiAgICAgIHZhciBoYXNoPWxvY2F0aW9uLmhhc2g7XHJcbiAgICAgIGlmKGhhc2gubWF0Y2gocmVnKSl7XHJcbiAgICAgICAgcmV0dXJuIGhhc2gubWF0Y2gocmVnKVswXS5yZXBsYWNlKGhhc2hTdGFydCwnJykucmVwbGFjZShoYXNoRW5kLCcnKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gSUQyVVJMKGlkKXtcclxuICAgICAgdmFyIGhhc2g9bG9jYXRpb24uaGFzaDtcclxuICAgICAgaWYocmVnLnRlc3QoaGFzaCkpe1xyXG4gICAgICAgIGhhc2g9aGFzaC5yZXBsYWNlKHJlZyxgJHtoYXNoU3RhcnR9JHtpZH0ke2hhc2hFbmR9YCk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGhhc2grPWAke2hhc2hTdGFydH0ke2lkfSR7aGFzaEVuZH1gO1xyXG4gICAgICB9XHJcbiAgICAgIGxvY2F0aW9uLmhhc2g9aGFzaDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWFzeVNjcm9sbDtcclxuICB9KCk7XHJcbn0oKSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);