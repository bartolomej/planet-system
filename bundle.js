/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _planet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./planet */ "./src/planet.js");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector */ "./src/vector.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_2__);



window.addEventListener('load', onLoadHandler);
window.addEventListener('resize', adjustSize);
getById('G-number').addEventListener('input', rerender);
getById('speed-number').addEventListener('input', rerender);
getById('planets-number').addEventListener('input', rerender);
getById('show-path').addEventListener('input', rerender);
/**
 * TODO: generate planets on mouse click
 * TODO: show grid
 */

let ctx;
let canvas;
let animation;
let planets = [];

function adjustSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function onLoadHandler() {
  window.G = 0.002;
  window.S = 0.1;
  window.showPath = true;
  window.planets = 10;
  getById('G-number').value = window.G;
  getById('speed-number').value = window.S;
  getById('planets-number').value = window.planets;
  getById('show-path').checked = window.showPath;
  canvas = document.getElementById('sketch');
  adjustSize();
  ctx = canvas.getContext('2d');
  init();
  animation = requestAnimationFrame(simulate);
}

function rerender() {
  let planets = Number.parseFloat(getById('planets-number').value);

  if (!isNaN(planets)) {
    window.planets = planets;
    getById('planets-number').value = window.planets;
  }

  let G = Number.parseFloat(getById('G-number').value);

  if (!isNaN(G)) {
    window.G = G;
    getById('G-number').value = window.G;
  }

  let S = Number.parseFloat(getById('speed-number').value);

  if (!isNaN(S)) {
    window.S = S;
    getById('speed-number').value = window.S;
  }

  window.showPath = getById('show-path').checked;
  cancelAnimationFrame(animation);
  init();
  animation = requestAnimationFrame(simulate);
}

function init() {
  planets = [];

  for (let i = 0; i < window.planets; i++) {
    planets.push(new _planet__WEBPACK_IMPORTED_MODULE_0__["default"](Math.random() * 10, new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](Math.random() * canvas.width, Math.random() * canvas.height)));
  }
}

function simulate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < planets.length; i++) {
    let other = [...planets.slice(0, i - 1), ...planets.slice(i, planets.length)];
    planets[i].update(other);
    planets[i].draw(ctx);
  }

  requestAnimationFrame(simulate);
}

function getById(id) {
  return document.getElementById(id);
}

/***/ }),

/***/ "./src/planet.js":
/*!***********************!*\
  !*** ./src/planet.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Planet; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/vector.js");

class Planet {
  /**
   * @param [mass = 1] {Number}
   * @param [position] {Vector}
   * @param [velocity] {Vector}
   */
  constructor(mass, position, velocity) {
    this.mass = mass ? mass : 1;
    this.position = _vector__WEBPACK_IMPORTED_MODULE_0__["default"].is(position) ? position : new _vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.velocity = _vector__WEBPACK_IMPORTED_MODULE_0__["default"].is(velocity) ? velocity : new _vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.path = [];
  }

  draw(ctx) {
    if (window.showPath) {
      ctx.beginPath();
      ctx.fillStyle = "#d9d9d9";

      for (let position of this.path) {
        ctx.moveTo(position.x, position.y);
        ctx.arc(position.x, position.y, 2, 0, 2 * Math.PI);
      }

      ctx.closePath();
      ctx.fill();
    }

    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.arc(this.position.x, this.position.y, this.mass, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  update(planets) {
    for (let planet of planets) {
      this.velocity = this.velocity.add(this.getAcceleration(planet));
    }

    this.position = this.position.add(this.velocity.dot(window.S));
    this.path.push(this.position);

    if (this.path.length > 100) {
      this.path.splice(0, 1);
    }
  }

  getAcceleration(planet) {
    let f = this.getForce(planet);
    let diff = this.position.diff(planet.position);
    return diff.dot(f / this.mass);
  }

  getForce(planet) {
    let G = window.G ? window.G : 1;
    return G * planet.mass * this.mass / Math.sqrt(this.position.dist(planet.position));
  }

}

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/vector.js":
/*!***********************!*\
  !*** ./src/vector.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vector; });
class Vector {
  /**
   * @param [x = 0] {Number}
   * @param [y = 0] {Number}
   */
  constructor(x, y) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
  }

  get magnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  /**
   * @param object
   * @returns {boolean}
   */


  static is(object) {
    return object instanceof Vector;
  }
  /**
   * @param a {Number}
   * @returns {Vector}
   */


  dot(a) {
    return new Vector(this.x * a, this.y * a);
  }
  /**
   * @param a {Vector|Number}
   * @returns {Vector}
   */


  add(a) {
    if (Vector.is(a)) {
      return new Vector(this.x + a.x, this.y + a.y);
    } else {
      return new Vector(this.x + a, this.y + a);
    }
  }
  /**
   * @param a {Vector}
   * @returns {Vector}
   */


  diff(a) {
    return new Vector(a.x - this.x, a.y - this.y);
  }
  /**
   * @param a {Vector}
   * @returns {Number}
   */


  dist(a) {
    let diff = this.diff(a);
    return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));
  }

}

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/bartolomejkozorog/WebstormProjects/planet-system/src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wbGFuZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3IuanMiXSwibmFtZXMiOlsid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uTG9hZEhhbmRsZXIiLCJhZGp1c3RTaXplIiwiZ2V0QnlJZCIsInJlcmVuZGVyIiwiY3R4IiwiY2FudmFzIiwiYW5pbWF0aW9uIiwicGxhbmV0cyIsIndpZHRoIiwiaW5uZXJXaWR0aCIsImhlaWdodCIsImlubmVySGVpZ2h0IiwiRyIsIlMiLCJzaG93UGF0aCIsInZhbHVlIiwiY2hlY2tlZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0IiwiaW5pdCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNpbXVsYXRlIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsImlzTmFOIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJpIiwicHVzaCIsIlBsYW5ldCIsIk1hdGgiLCJyYW5kb20iLCJWZWN0b3IiLCJjbGVhclJlY3QiLCJsZW5ndGgiLCJvdGhlciIsInNsaWNlIiwidXBkYXRlIiwiZHJhdyIsImlkIiwiY29uc3RydWN0b3IiLCJtYXNzIiwicG9zaXRpb24iLCJ2ZWxvY2l0eSIsImlzIiwicGF0aCIsImJlZ2luUGF0aCIsImZpbGxTdHlsZSIsIm1vdmVUbyIsIngiLCJ5IiwiYXJjIiwiUEkiLCJjbG9zZVBhdGgiLCJmaWxsIiwic3Ryb2tlIiwicGxhbmV0IiwiYWRkIiwiZ2V0QWNjZWxlcmF0aW9uIiwiZG90Iiwic3BsaWNlIiwiZiIsImdldEZvcmNlIiwiZGlmZiIsInNxcnQiLCJkaXN0IiwibWFnbml0dWRlIiwicG93Iiwib2JqZWN0IiwiYSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0NDLGFBQWhDO0FBQ0FGLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0NFLFVBQWxDO0FBQ0FDLE9BQU8sQ0FBQyxVQUFELENBQVAsQ0FBb0JILGdCQUFwQixDQUFxQyxPQUFyQyxFQUE4Q0ksUUFBOUM7QUFDQUQsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QkgsZ0JBQXhCLENBQXlDLE9BQXpDLEVBQWtESSxRQUFsRDtBQUNBRCxPQUFPLENBQUMsZ0JBQUQsQ0FBUCxDQUEwQkgsZ0JBQTFCLENBQTJDLE9BQTNDLEVBQW9ESSxRQUFwRDtBQUNBRCxPQUFPLENBQUMsV0FBRCxDQUFQLENBQXFCSCxnQkFBckIsQ0FBc0MsT0FBdEMsRUFBK0NJLFFBQS9DO0FBRUE7Ozs7O0FBS0EsSUFBSUMsR0FBSjtBQUNBLElBQUlDLE1BQUo7QUFDQSxJQUFJQyxTQUFKO0FBQ0EsSUFBSUMsT0FBTyxHQUFHLEVBQWQ7O0FBRUEsU0FBU04sVUFBVCxHQUF1QjtBQUNyQkksUUFBTSxDQUFDRyxLQUFQLEdBQWVWLE1BQU0sQ0FBQ1csVUFBdEI7QUFDQUosUUFBTSxDQUFDSyxNQUFQLEdBQWdCWixNQUFNLENBQUNhLFdBQXZCO0FBQ0Q7O0FBRUQsU0FBU1gsYUFBVCxHQUEwQjtBQUN4QkYsUUFBTSxDQUFDYyxDQUFQLEdBQVcsS0FBWDtBQUNBZCxRQUFNLENBQUNlLENBQVAsR0FBVyxHQUFYO0FBQ0FmLFFBQU0sQ0FBQ2dCLFFBQVAsR0FBa0IsSUFBbEI7QUFDQWhCLFFBQU0sQ0FBQ1MsT0FBUCxHQUFpQixFQUFqQjtBQUNBTCxTQUFPLENBQUMsVUFBRCxDQUFQLENBQW9CYSxLQUFwQixHQUE0QmpCLE1BQU0sQ0FBQ2MsQ0FBbkM7QUFDQVYsU0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QmEsS0FBeEIsR0FBZ0NqQixNQUFNLENBQUNlLENBQXZDO0FBQ0FYLFNBQU8sQ0FBQyxnQkFBRCxDQUFQLENBQTBCYSxLQUExQixHQUFrQ2pCLE1BQU0sQ0FBQ1MsT0FBekM7QUFDQUwsU0FBTyxDQUFDLFdBQUQsQ0FBUCxDQUFxQmMsT0FBckIsR0FBK0JsQixNQUFNLENBQUNnQixRQUF0QztBQUNBVCxRQUFNLEdBQUdZLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFUO0FBQ0FqQixZQUFVO0FBQ1ZHLEtBQUcsR0FBR0MsTUFBTSxDQUFDYyxVQUFQLENBQWtCLElBQWxCLENBQU47QUFDQUMsTUFBSTtBQUNKZCxXQUFTLEdBQUdlLHFCQUFxQixDQUFDQyxRQUFELENBQWpDO0FBQ0Q7O0FBRUQsU0FBU25CLFFBQVQsR0FBcUI7QUFDbkIsTUFBSUksT0FBTyxHQUFHZ0IsTUFBTSxDQUFDQyxVQUFQLENBQWtCdEIsT0FBTyxDQUFDLGdCQUFELENBQVAsQ0FBMEJhLEtBQTVDLENBQWQ7O0FBQ0EsTUFBSSxDQUFDVSxLQUFLLENBQUNsQixPQUFELENBQVYsRUFBcUI7QUFDbkJULFVBQU0sQ0FBQ1MsT0FBUCxHQUFpQkEsT0FBakI7QUFDQUwsV0FBTyxDQUFDLGdCQUFELENBQVAsQ0FBMEJhLEtBQTFCLEdBQWtDakIsTUFBTSxDQUFDUyxPQUF6QztBQUNEOztBQUNELE1BQUlLLENBQUMsR0FBR1csTUFBTSxDQUFDQyxVQUFQLENBQWtCdEIsT0FBTyxDQUFDLFVBQUQsQ0FBUCxDQUFvQmEsS0FBdEMsQ0FBUjs7QUFDQSxNQUFJLENBQUNVLEtBQUssQ0FBQ2IsQ0FBRCxDQUFWLEVBQWU7QUFDYmQsVUFBTSxDQUFDYyxDQUFQLEdBQVdBLENBQVg7QUFDQVYsV0FBTyxDQUFDLFVBQUQsQ0FBUCxDQUFvQmEsS0FBcEIsR0FBNEJqQixNQUFNLENBQUNjLENBQW5DO0FBQ0Q7O0FBQ0QsTUFBSUMsQ0FBQyxHQUFHVSxNQUFNLENBQUNDLFVBQVAsQ0FBa0J0QixPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCYSxLQUExQyxDQUFSOztBQUNBLE1BQUksQ0FBQ1UsS0FBSyxDQUFDWixDQUFELENBQVYsRUFBZTtBQUNiZixVQUFNLENBQUNlLENBQVAsR0FBV0EsQ0FBWDtBQUNBWCxXQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCYSxLQUF4QixHQUFnQ2pCLE1BQU0sQ0FBQ2UsQ0FBdkM7QUFDRDs7QUFDRGYsUUFBTSxDQUFDZ0IsUUFBUCxHQUFrQlosT0FBTyxDQUFDLFdBQUQsQ0FBUCxDQUFxQmMsT0FBdkM7QUFDQVUsc0JBQW9CLENBQUNwQixTQUFELENBQXBCO0FBQ0FjLE1BQUk7QUFDSmQsV0FBUyxHQUFHZSxxQkFBcUIsQ0FBQ0MsUUFBRCxDQUFqQztBQUNEOztBQUVELFNBQVNGLElBQVQsR0FBaUI7QUFDZmIsU0FBTyxHQUFHLEVBQVY7O0FBQ0EsT0FBSyxJQUFJb0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzdCLE1BQU0sQ0FBQ1MsT0FBM0IsRUFBb0NvQixDQUFDLEVBQXJDLEVBQXlDO0FBQ3ZDcEIsV0FBTyxDQUFDcUIsSUFBUixDQUFhLElBQUlDLCtDQUFKLENBQ1hDLElBQUksQ0FBQ0MsTUFBTCxLQUFnQixFQURMLEVBRVgsSUFBSUMsK0NBQUosQ0FDRUYsSUFBSSxDQUFDQyxNQUFMLEtBQWdCMUIsTUFBTSxDQUFDRyxLQUR6QixFQUVFc0IsSUFBSSxDQUFDQyxNQUFMLEtBQWdCMUIsTUFBTSxDQUFDSyxNQUZ6QixDQUZXLENBQWI7QUFPRDtBQUNGOztBQUVELFNBQVNZLFFBQVQsR0FBcUI7QUFDbkJsQixLQUFHLENBQUM2QixTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQjVCLE1BQU0sQ0FBQ0csS0FBM0IsRUFBa0NILE1BQU0sQ0FBQ0ssTUFBekM7O0FBQ0EsT0FBSyxJQUFJaUIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3BCLE9BQU8sQ0FBQzJCLE1BQTVCLEVBQW9DUCxDQUFDLEVBQXJDLEVBQXlDO0FBQ3ZDLFFBQUlRLEtBQUssR0FBRyxDQUFDLEdBQUc1QixPQUFPLENBQUM2QixLQUFSLENBQWMsQ0FBZCxFQUFpQlQsQ0FBQyxHQUFHLENBQXJCLENBQUosRUFBNkIsR0FBR3BCLE9BQU8sQ0FBQzZCLEtBQVIsQ0FBY1QsQ0FBZCxFQUFpQnBCLE9BQU8sQ0FBQzJCLE1BQXpCLENBQWhDLENBQVo7QUFDQTNCLFdBQU8sQ0FBQ29CLENBQUQsQ0FBUCxDQUFXVSxNQUFYLENBQWtCRixLQUFsQjtBQUNBNUIsV0FBTyxDQUFDb0IsQ0FBRCxDQUFQLENBQVdXLElBQVgsQ0FBZ0JsQyxHQUFoQjtBQUNEOztBQUNEaUIsdUJBQXFCLENBQUNDLFFBQUQsQ0FBckI7QUFDRDs7QUFFRCxTQUFTcEIsT0FBVCxDQUFrQnFDLEVBQWxCLEVBQXNCO0FBQ3BCLFNBQU90QixRQUFRLENBQUNDLGNBQVQsQ0FBd0JxQixFQUF4QixDQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7O0FDekZEO0FBQUE7QUFBQTtBQUFBO0FBRWUsTUFBTVYsTUFBTixDQUFhO0FBRTFCOzs7OztBQUtBVyxhQUFXLENBQUVDLElBQUYsRUFBUUMsUUFBUixFQUFrQkMsUUFBbEIsRUFBNEI7QUFDckMsU0FBS0YsSUFBTCxHQUFZQSxJQUFJLEdBQUdBLElBQUgsR0FBVSxDQUExQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JWLCtDQUFNLENBQUNZLEVBQVAsQ0FBVUYsUUFBVixJQUFzQkEsUUFBdEIsR0FBaUMsSUFBSVYsK0NBQUosRUFBakQ7QUFDQSxTQUFLVyxRQUFMLEdBQWdCWCwrQ0FBTSxDQUFDWSxFQUFQLENBQVVELFFBQVYsSUFBc0JBLFFBQXRCLEdBQWlDLElBQUlYLCtDQUFKLEVBQWpEO0FBQ0EsU0FBS2EsSUFBTCxHQUFZLEVBQVo7QUFDRDs7QUFFRFAsTUFBSSxDQUFFbEMsR0FBRixFQUFPO0FBQ1QsUUFBSU4sTUFBTSxDQUFDZ0IsUUFBWCxFQUFxQjtBQUNuQlYsU0FBRyxDQUFDMEMsU0FBSjtBQUNBMUMsU0FBRyxDQUFDMkMsU0FBSixHQUFnQixTQUFoQjs7QUFDQSxXQUFLLElBQUlMLFFBQVQsSUFBcUIsS0FBS0csSUFBMUIsRUFBZ0M7QUFDOUJ6QyxXQUFHLENBQUM0QyxNQUFKLENBQVdOLFFBQVEsQ0FBQ08sQ0FBcEIsRUFBd0JQLFFBQVEsQ0FBQ1EsQ0FBakM7QUFDQTlDLFdBQUcsQ0FBQytDLEdBQUosQ0FBUVQsUUFBUSxDQUFDTyxDQUFqQixFQUFvQlAsUUFBUSxDQUFDUSxDQUE3QixFQUFnQyxDQUFoQyxFQUFtQyxDQUFuQyxFQUFzQyxJQUFJcEIsSUFBSSxDQUFDc0IsRUFBL0M7QUFDRDs7QUFDRGhELFNBQUcsQ0FBQ2lELFNBQUo7QUFDQWpELFNBQUcsQ0FBQ2tELElBQUo7QUFDRDs7QUFFRGxELE9BQUcsQ0FBQzBDLFNBQUo7QUFDQTFDLE9BQUcsQ0FBQzJDLFNBQUosR0FBZ0IsU0FBaEI7QUFDQTNDLE9BQUcsQ0FBQytDLEdBQUosQ0FBUSxLQUFLVCxRQUFMLENBQWNPLENBQXRCLEVBQXlCLEtBQUtQLFFBQUwsQ0FBY1EsQ0FBdkMsRUFBMEMsS0FBS1QsSUFBL0MsRUFBcUQsQ0FBckQsRUFBd0QsSUFBSVgsSUFBSSxDQUFDc0IsRUFBakU7QUFDQWhELE9BQUcsQ0FBQ2lELFNBQUo7QUFDQWpELE9BQUcsQ0FBQ2tELElBQUo7QUFDQWxELE9BQUcsQ0FBQ21ELE1BQUo7QUFDRDs7QUFFRGxCLFFBQU0sQ0FBRTlCLE9BQUYsRUFBVztBQUNmLFNBQUssSUFBSWlELE1BQVQsSUFBbUJqRCxPQUFuQixFQUE0QjtBQUMxQixXQUFLb0MsUUFBTCxHQUFnQixLQUFLQSxRQUFMLENBQWNjLEdBQWQsQ0FBa0IsS0FBS0MsZUFBTCxDQUFxQkYsTUFBckIsQ0FBbEIsQ0FBaEI7QUFDRDs7QUFDRCxTQUFLZCxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY2UsR0FBZCxDQUFrQixLQUFLZCxRQUFMLENBQWNnQixHQUFkLENBQWtCN0QsTUFBTSxDQUFDZSxDQUF6QixDQUFsQixDQUFoQjtBQUNBLFNBQUtnQyxJQUFMLENBQVVqQixJQUFWLENBQWUsS0FBS2MsUUFBcEI7O0FBQ0EsUUFBSSxLQUFLRyxJQUFMLENBQVVYLE1BQVYsR0FBbUIsR0FBdkIsRUFBNEI7QUFDMUIsV0FBS1csSUFBTCxDQUFVZSxNQUFWLENBQWlCLENBQWpCLEVBQW9CLENBQXBCO0FBQ0Q7QUFDRjs7QUFFREYsaUJBQWUsQ0FBRUYsTUFBRixFQUFVO0FBQ3ZCLFFBQUlLLENBQUMsR0FBRyxLQUFLQyxRQUFMLENBQWNOLE1BQWQsQ0FBUjtBQUNBLFFBQUlPLElBQUksR0FBRyxLQUFLckIsUUFBTCxDQUFjcUIsSUFBZCxDQUFtQlAsTUFBTSxDQUFDZCxRQUExQixDQUFYO0FBQ0EsV0FBT3FCLElBQUksQ0FBQ0osR0FBTCxDQUFVRSxDQUFDLEdBQUcsS0FBS3BCLElBQW5CLENBQVA7QUFDRDs7QUFFRHFCLFVBQVEsQ0FBRU4sTUFBRixFQUFVO0FBQ2hCLFFBQUk1QyxDQUFDLEdBQUdkLE1BQU0sQ0FBQ2MsQ0FBUCxHQUFXZCxNQUFNLENBQUNjLENBQWxCLEdBQXNCLENBQTlCO0FBQ0EsV0FBT0EsQ0FBQyxHQUFHNEMsTUFBTSxDQUFDZixJQUFYLEdBQWtCLEtBQUtBLElBQXZCLEdBQThCWCxJQUFJLENBQUNrQyxJQUFMLENBQVUsS0FBS3RCLFFBQUwsQ0FBY3VCLElBQWQsQ0FBbUJULE1BQU0sQ0FBQ2QsUUFBMUIsQ0FBVixDQUFyQztBQUNEOztBQXREeUIsQzs7Ozs7Ozs7Ozs7QUNGNUIsdUM7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBZSxNQUFNVixNQUFOLENBQWE7QUFFMUI7Ozs7QUFJQVEsYUFBVyxDQUFFUyxDQUFGLEVBQUtDLENBQUwsRUFBUTtBQUNqQixTQUFLRCxDQUFMLEdBQVNBLENBQUMsR0FBR0EsQ0FBSCxHQUFPLENBQWpCO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTQSxDQUFDLEdBQUdBLENBQUgsR0FBTyxDQUFqQjtBQUNEOztBQUVELE1BQUlnQixTQUFKLEdBQWlCO0FBQ2YsV0FBT3BDLElBQUksQ0FBQ2tDLElBQUwsQ0FDTGxDLElBQUksQ0FBQ3FDLEdBQUwsQ0FBUyxLQUFLbEIsQ0FBZCxFQUFpQixDQUFqQixJQUNBbkIsSUFBSSxDQUFDcUMsR0FBTCxDQUFTLEtBQUtqQixDQUFkLEVBQWlCLENBQWpCLENBRkssQ0FBUDtBQUlEO0FBRUQ7Ozs7OztBQUlBLFNBQU9OLEVBQVAsQ0FBV3dCLE1BQVgsRUFBbUI7QUFDakIsV0FBT0EsTUFBTSxZQUFZcEMsTUFBekI7QUFDRDtBQUVEOzs7Ozs7QUFJQTJCLEtBQUcsQ0FBRVUsQ0FBRixFQUFLO0FBQ04sV0FBTyxJQUFJckMsTUFBSixDQUNMLEtBQUtpQixDQUFMLEdBQVNvQixDQURKLEVBRUwsS0FBS25CLENBQUwsR0FBU21CLENBRkosQ0FBUDtBQUlEO0FBRUQ7Ozs7OztBQUlBWixLQUFHLENBQUVZLENBQUYsRUFBSztBQUNOLFFBQUlyQyxNQUFNLENBQUNZLEVBQVAsQ0FBVXlCLENBQVYsQ0FBSixFQUFrQjtBQUNoQixhQUFPLElBQUlyQyxNQUFKLENBQ0wsS0FBS2lCLENBQUwsR0FBU29CLENBQUMsQ0FBQ3BCLENBRE4sRUFFTCxLQUFLQyxDQUFMLEdBQVNtQixDQUFDLENBQUNuQixDQUZOLENBQVA7QUFJRCxLQUxELE1BS087QUFDTCxhQUFPLElBQUlsQixNQUFKLENBQ0wsS0FBS2lCLENBQUwsR0FBU29CLENBREosRUFFTCxLQUFLbkIsQ0FBTCxHQUFTbUIsQ0FGSixDQUFQO0FBSUQ7QUFDRjtBQUVEOzs7Ozs7QUFJQU4sTUFBSSxDQUFFTSxDQUFGLEVBQUs7QUFDUCxXQUFPLElBQUlyQyxNQUFKLENBQ0xxQyxDQUFDLENBQUNwQixDQUFGLEdBQU0sS0FBS0EsQ0FETixFQUVMb0IsQ0FBQyxDQUFDbkIsQ0FBRixHQUFNLEtBQUtBLENBRk4sQ0FBUDtBQUlEO0FBRUQ7Ozs7OztBQUlBZSxNQUFJLENBQUVJLENBQUYsRUFBSztBQUNQLFFBQUlOLElBQUksR0FBRyxLQUFLQSxJQUFMLENBQVVNLENBQVYsQ0FBWDtBQUNBLFdBQU92QyxJQUFJLENBQUNrQyxJQUFMLENBQ0xsQyxJQUFJLENBQUNxQyxHQUFMLENBQVNKLElBQUksQ0FBQ2QsQ0FBZCxFQUFpQixDQUFqQixJQUNBbkIsSUFBSSxDQUFDcUMsR0FBTCxDQUFTSixJQUFJLENBQUNiLENBQWQsRUFBaUIsQ0FBakIsQ0FGSyxDQUFQO0FBSUQ7O0FBNUV5QixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCBQbGFuZXQgZnJvbSBcIi4vcGxhbmV0XCI7XG5pbXBvcnQgVmVjdG9yIGZyb20gXCIuL3ZlY3RvclwiO1xuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIlxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZEhhbmRsZXIpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGFkanVzdFNpemUpO1xuZ2V0QnlJZCgnRy1udW1iZXInKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHJlcmVuZGVyKTtcbmdldEJ5SWQoJ3NwZWVkLW51bWJlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgcmVyZW5kZXIpO1xuZ2V0QnlJZCgncGxhbmV0cy1udW1iZXInKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHJlcmVuZGVyKTtcbmdldEJ5SWQoJ3Nob3ctcGF0aCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgcmVyZW5kZXIpO1xuXG4vKipcbiAqIFRPRE86IGdlbmVyYXRlIHBsYW5ldHMgb24gbW91c2UgY2xpY2tcbiAqIFRPRE86IHNob3cgZ3JpZFxuICovXG5cbmxldCBjdHg7XG5sZXQgY2FudmFzO1xubGV0IGFuaW1hdGlvbjtcbmxldCBwbGFuZXRzID0gW107XG5cbmZ1bmN0aW9uIGFkanVzdFNpemUgKCkge1xuICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbn1cblxuZnVuY3Rpb24gb25Mb2FkSGFuZGxlciAoKSB7XG4gIHdpbmRvdy5HID0gMC4wMDI7XG4gIHdpbmRvdy5TID0gMC4xO1xuICB3aW5kb3cuc2hvd1BhdGggPSB0cnVlO1xuICB3aW5kb3cucGxhbmV0cyA9IDEwO1xuICBnZXRCeUlkKCdHLW51bWJlcicpLnZhbHVlID0gd2luZG93Lkc7XG4gIGdldEJ5SWQoJ3NwZWVkLW51bWJlcicpLnZhbHVlID0gd2luZG93LlM7XG4gIGdldEJ5SWQoJ3BsYW5ldHMtbnVtYmVyJykudmFsdWUgPSB3aW5kb3cucGxhbmV0cztcbiAgZ2V0QnlJZCgnc2hvdy1wYXRoJykuY2hlY2tlZCA9IHdpbmRvdy5zaG93UGF0aDtcbiAgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NrZXRjaCcpO1xuICBhZGp1c3RTaXplKCk7XG4gIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICBpbml0KCk7XG4gIGFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzaW11bGF0ZSk7XG59XG5cbmZ1bmN0aW9uIHJlcmVuZGVyICgpIHtcbiAgbGV0IHBsYW5ldHMgPSBOdW1iZXIucGFyc2VGbG9hdChnZXRCeUlkKCdwbGFuZXRzLW51bWJlcicpLnZhbHVlKTtcbiAgaWYgKCFpc05hTihwbGFuZXRzKSkge1xuICAgIHdpbmRvdy5wbGFuZXRzID0gcGxhbmV0cztcbiAgICBnZXRCeUlkKCdwbGFuZXRzLW51bWJlcicpLnZhbHVlID0gd2luZG93LnBsYW5ldHM7XG4gIH1cbiAgbGV0IEcgPSBOdW1iZXIucGFyc2VGbG9hdChnZXRCeUlkKCdHLW51bWJlcicpLnZhbHVlKTtcbiAgaWYgKCFpc05hTihHKSkge1xuICAgIHdpbmRvdy5HID0gRztcbiAgICBnZXRCeUlkKCdHLW51bWJlcicpLnZhbHVlID0gd2luZG93Lkc7XG4gIH1cbiAgbGV0IFMgPSBOdW1iZXIucGFyc2VGbG9hdChnZXRCeUlkKCdzcGVlZC1udW1iZXInKS52YWx1ZSk7XG4gIGlmICghaXNOYU4oUykpIHtcbiAgICB3aW5kb3cuUyA9IFM7XG4gICAgZ2V0QnlJZCgnc3BlZWQtbnVtYmVyJykudmFsdWUgPSB3aW5kb3cuUztcbiAgfVxuICB3aW5kb3cuc2hvd1BhdGggPSBnZXRCeUlkKCdzaG93LXBhdGgnKS5jaGVja2VkO1xuICBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb24pO1xuICBpbml0KCk7XG4gIGFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzaW11bGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGluaXQgKCkge1xuICBwbGFuZXRzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgd2luZG93LnBsYW5ldHM7IGkrKykge1xuICAgIHBsYW5ldHMucHVzaChuZXcgUGxhbmV0KFxuICAgICAgTWF0aC5yYW5kb20oKSAqIDEwLFxuICAgICAgbmV3IFZlY3RvcihcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqIGNhbnZhcy53aWR0aCxcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqIGNhbnZhcy5oZWlnaHRcbiAgICAgIClcbiAgICApKVxuICB9XG59XG5cbmZ1bmN0aW9uIHNpbXVsYXRlICgpIHtcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYW5ldHMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgb3RoZXIgPSBbLi4ucGxhbmV0cy5zbGljZSgwLCBpIC0gMSksIC4uLnBsYW5ldHMuc2xpY2UoaSwgcGxhbmV0cy5sZW5ndGgpXTtcbiAgICBwbGFuZXRzW2ldLnVwZGF0ZShvdGhlcik7XG4gICAgcGxhbmV0c1tpXS5kcmF3KGN0eCk7XG4gIH1cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNpbXVsYXRlKTtcbn1cblxuZnVuY3Rpb24gZ2V0QnlJZCAoaWQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuL3ZlY3RvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGFuZXQge1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gW21hc3MgPSAxXSB7TnVtYmVyfVxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXSB7VmVjdG9yfVxuICAgKiBAcGFyYW0gW3ZlbG9jaXR5XSB7VmVjdG9yfVxuICAgKi9cbiAgY29uc3RydWN0b3IgKG1hc3MsIHBvc2l0aW9uLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMubWFzcyA9IG1hc3MgPyBtYXNzIDogMTtcbiAgICB0aGlzLnBvc2l0aW9uID0gVmVjdG9yLmlzKHBvc2l0aW9uKSA/IHBvc2l0aW9uIDogbmV3IFZlY3RvcigpO1xuICAgIHRoaXMudmVsb2NpdHkgPSBWZWN0b3IuaXModmVsb2NpdHkpID8gdmVsb2NpdHkgOiBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5wYXRoID0gW107XG4gIH1cblxuICBkcmF3IChjdHgpIHtcbiAgICBpZiAod2luZG93LnNob3dQYXRoKSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCIjZDlkOWQ5XCI7XG4gICAgICBmb3IgKGxldCBwb3NpdGlvbiBvZiB0aGlzLnBhdGgpIHtcbiAgICAgICAgY3R4Lm1vdmVUbyhwb3NpdGlvbi54ICwgcG9zaXRpb24ueSk7XG4gICAgICAgIGN0eC5hcmMocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgMiwgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgfVxuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xuICAgIGN0eC5hcmModGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMubWFzcywgMCwgMiAqIE1hdGguUEkpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIHVwZGF0ZSAocGxhbmV0cykge1xuICAgIGZvciAobGV0IHBsYW5ldCBvZiBwbGFuZXRzKSB7XG4gICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5hZGQodGhpcy5nZXRBY2NlbGVyYXRpb24ocGxhbmV0KSk7XG4gICAgfVxuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnZlbG9jaXR5LmRvdCh3aW5kb3cuUykpO1xuICAgIHRoaXMucGF0aC5wdXNoKHRoaXMucG9zaXRpb24pO1xuICAgIGlmICh0aGlzLnBhdGgubGVuZ3RoID4gMTAwKSB7XG4gICAgICB0aGlzLnBhdGguc3BsaWNlKDAsIDEpXG4gICAgfVxuICB9XG5cbiAgZ2V0QWNjZWxlcmF0aW9uIChwbGFuZXQpIHtcbiAgICBsZXQgZiA9IHRoaXMuZ2V0Rm9yY2UocGxhbmV0KTtcbiAgICBsZXQgZGlmZiA9IHRoaXMucG9zaXRpb24uZGlmZihwbGFuZXQucG9zaXRpb24pO1xuICAgIHJldHVybiBkaWZmLmRvdCggZiAvIHRoaXMubWFzcyk7XG4gIH1cblxuICBnZXRGb3JjZSAocGxhbmV0KSB7XG4gICAgbGV0IEcgPSB3aW5kb3cuRyA/IHdpbmRvdy5HIDogMTtcbiAgICByZXR1cm4gRyAqIHBsYW5ldC5tYXNzICogdGhpcy5tYXNzIC8gTWF0aC5zcXJ0KHRoaXMucG9zaXRpb24uZGlzdChwbGFuZXQucG9zaXRpb24pKTtcbiAgfVxuXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcblxuICAvKipcbiAgICogQHBhcmFtIFt4ID0gMF0ge051bWJlcn1cbiAgICogQHBhcmFtIFt5ID0gMF0ge051bWJlcn1cbiAgICovXG4gIGNvbnN0cnVjdG9yICh4LCB5KSB7XG4gICAgdGhpcy54ID0geCA/IHggOiAwO1xuICAgIHRoaXMueSA9IHkgPyB5IDogMDtcbiAgfVxuXG4gIGdldCBtYWduaXR1ZGUgKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQoXG4gICAgICBNYXRoLnBvdyh0aGlzLngsIDIpICtcbiAgICAgIE1hdGgucG93KHRoaXMueSwgMilcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIG9iamVjdFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpcyAob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCBpbnN0YW5jZW9mIFZlY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gYSB7TnVtYmVyfVxuICAgKiBAcmV0dXJucyB7VmVjdG9yfVxuICAgKi9cbiAgZG90IChhKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICB0aGlzLnggKiBhLFxuICAgICAgdGhpcy55ICogYVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gYSB7VmVjdG9yfE51bWJlcn1cbiAgICogQHJldHVybnMge1ZlY3Rvcn1cbiAgICovXG4gIGFkZCAoYSkge1xuICAgIGlmIChWZWN0b3IuaXMoYSkpIHtcbiAgICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICB0aGlzLnggKyBhLngsXG4gICAgICAgIHRoaXMueSArIGEueVxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgdGhpcy54ICsgYSxcbiAgICAgICAgdGhpcy55ICsgYVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gYSB7VmVjdG9yfVxuICAgKiBAcmV0dXJucyB7VmVjdG9yfVxuICAgKi9cbiAgZGlmZiAoYSkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgYS54IC0gdGhpcy54LFxuICAgICAgYS55IC0gdGhpcy55XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gYSB7VmVjdG9yfVxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZGlzdCAoYSkge1xuICAgIGxldCBkaWZmID0gdGhpcy5kaWZmKGEpO1xuICAgIHJldHVybiBNYXRoLnNxcnQoXG4gICAgICBNYXRoLnBvdyhkaWZmLngsIDIpICtcbiAgICAgIE1hdGgucG93KGRpZmYueSwgMilcbiAgICApXG4gIH1cblxufSJdLCJzb3VyY2VSb290IjoiIn0=