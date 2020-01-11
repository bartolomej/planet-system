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
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _simulation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./simulation */ "./src/simulation.js");

 // TODO: zoom in/out feature

window.addEventListener('load', onLoad);
getById('open-menu').addEventListener('click', openMenu);
getById('start-simulation').addEventListener('click', startSimulation); // params input change events

getById('gravity-const').addEventListener('input', onInputChange);
getById('speed-const').addEventListener('input', onInputChange);
getById('planets-count').addEventListener('input', onInputChange);
getById('show-path').addEventListener('input', onShowPathChange);

function onLoad() {
  openMenu();
  updateViewElements();
  startSimulation();
}

let simulation = null;
let params = {
  speedC: 0.1,
  gravityC: 0.002,
  showPath: true,
  planetsCount: 10
};

function onInputChange() {
  let planetsCInput = Number.parseFloat(getById('planets-count').value);
  if (!isNaN(planetsCInput)) params.planetsCount = planetsCInput;
  let gravityCInput = Number.parseFloat(getById('gravity-const').value);
  if (!isNaN(gravityCInput)) params.gravityC = gravityCInput;
  let speedCInput = Number.parseFloat(getById('speed-const').value);
  if (!isNaN(speedCInput)) params.speedC = speedCInput;
  params.showPath = getById('show-path').checked;
  startSimulation();
}

function onShowPathChange() {
  // if show-path input changes don't reinitialize simulation
  params.showPath = getById('show-path').checked;
  simulation.params.showPath = params.showPath;
}

function startSimulation() {
  if (simulation) {
    simulation.destroy();
    simulation = new _simulation__WEBPACK_IMPORTED_MODULE_1__["default"](params);
    simulation.start();
  } else {
    simulation = new _simulation__WEBPACK_IMPORTED_MODULE_1__["default"](params);
    simulation.start();
  }
}

function updateViewElements() {
  getById('gravity-const').value = params.gravityC;
  getById('speed-const').value = params.speedC;
  getById('planets-count').value = params.planetsCount;
  getById('show-path').checked = params.showPath;
}

function openMenu() {
  $("#intro-modal").modal({
    fadeDuration: 100
  });
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
   * @param [params] {Object}
   * @param [mass = 1] {Number}
   * @param [position] {Vector}
   * @param [velocity] {Vector}
   */
  constructor(params, mass, position, velocity) {
    this.params = params;
    this.mass = mass ? mass : 1;
    this.position = _vector__WEBPACK_IMPORTED_MODULE_0__["default"].is(position) ? position : new _vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.velocity = _vector__WEBPACK_IMPORTED_MODULE_0__["default"].is(velocity) ? velocity : new _vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.path = [];
  }

  draw(ctx, showPath = true) {
    if (showPath) {
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

    this.position = this.position.add(this.velocity.dot(this.params.speedC));
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
    let G = this.params.gravityC ? this.params.gravityC : 1;
    return G * planet.mass * this.mass / Math.sqrt(this.position.dist(planet.position));
  }

}

/***/ }),

/***/ "./src/simulation.js":
/*!***************************!*\
  !*** ./src/simulation.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Simulation; });
/* harmony import */ var _planet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./planet */ "./src/planet.js");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector */ "./src/vector.js");


class Simulation {
  constructor(params) {
    this.animation = null;
    this.planets = [];
    this.params = params;
    this.coordinateSpan = 1; // speed vector draw

    this.enableDraw = false;
    this.mouseDown = false;
    this.lastDraw = this._startLastDraw(); // canvas initialization

    this.canvas = document.getElementById('sketch');
    this.ctx = this.canvas.getContext('2d');

    this._resizeCanvas(); // canvas mouse events


    addListener('sketch', 'mousedown', this._onMouseDown, this);
    addListener('sketch', 'mouseup', this._onMouseUp, this);
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
    window.addEventListener('resize', this._resizeCanvas.bind(this));
  }

  _onMouseMove(e) {
    if (this.mouseDown && this.enableDraw) {
      this.lastDraw.END = {
        x: e.clientX,
        y: e.clientY
      };
    }
  }

  _onMouseDown(e) {
    this.mouseDown = true;

    if (this.enableDraw) {
      let mousePos = {
        x: e.clientX,
        y: e.clientY
      };
      this.lastDraw.START = mousePos;
      this.lastDraw.END = mousePos;
    }
  }

  _onMouseUp(e) {
    this.mouseDown = false;

    if (this.enableDraw) {
      this.planets.push(new _planet__WEBPACK_IMPORTED_MODULE_0__["default"](this.params, Math.random() * 10, new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](this.lastDraw.START.x, this.lastDraw.START.y), new _vector__WEBPACK_IMPORTED_MODULE_1__["default"]( // scale down vector for better mouse drawing precision
      (this.lastDraw.END.x - this.lastDraw.START.x) / 4, (this.lastDraw.END.y - this.lastDraw.START.y) / 4)));
    }

    this.lastDraw = this._startLastDraw();
  }

  _startLastDraw() {
    return {
      START: {
        x: 0,
        y: 0
      },
      END: {
        x: 0,
        y: 0
      }
    };
  }

  _resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  destroy() {
    cancelAnimationFrame(this.animation);
  }

  start() {
    for (let i = 0; i < this.params.planetsCount; i++) {
      this.planets.push(new _planet__WEBPACK_IMPORTED_MODULE_0__["default"](this.params, Math.random() * 10, new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](Math.random() * this.canvas.width, Math.random() * this.canvas.height)));
    }

    this.enableDraw = true;
    this.animation = requestAnimationFrame(this._simulate.bind(this));
  }

  _simulate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.planets.length; i++) {
      let other = [...this.planets.slice(0, i - 1), ...this.planets.slice(i, this.planets.length)];
      this.planets[i].update(other);
      this.planets[i].draw(this.ctx, this.params.showPath);
    }

    this.ctx.moveTo(this.lastDraw.START.x, this.lastDraw.START.y);
    this.ctx.lineTo(this.lastDraw.END.x, this.lastDraw.END.y);
    this.ctx.stroke();
    requestAnimationFrame(this._simulate.bind(this));
  }

}

function addListener(id, event, func, bind) {
  document.getElementById(id).addEventListener(event, func.bind(bind));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wbGFuZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3IuanMiXSwibmFtZXMiOlsid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uTG9hZCIsImdldEJ5SWQiLCJvcGVuTWVudSIsInN0YXJ0U2ltdWxhdGlvbiIsIm9uSW5wdXRDaGFuZ2UiLCJvblNob3dQYXRoQ2hhbmdlIiwidXBkYXRlVmlld0VsZW1lbnRzIiwic2ltdWxhdGlvbiIsInBhcmFtcyIsInNwZWVkQyIsImdyYXZpdHlDIiwic2hvd1BhdGgiLCJwbGFuZXRzQ291bnQiLCJwbGFuZXRzQ0lucHV0IiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsInZhbHVlIiwiaXNOYU4iLCJncmF2aXR5Q0lucHV0Iiwic3BlZWRDSW5wdXQiLCJjaGVja2VkIiwiZGVzdHJveSIsIlNpbXVsYXRpb24iLCJzdGFydCIsIiQiLCJtb2RhbCIsImZhZGVEdXJhdGlvbiIsImlkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIlBsYW5ldCIsImNvbnN0cnVjdG9yIiwibWFzcyIsInBvc2l0aW9uIiwidmVsb2NpdHkiLCJWZWN0b3IiLCJpcyIsInBhdGgiLCJkcmF3IiwiY3R4IiwiYmVnaW5QYXRoIiwiZmlsbFN0eWxlIiwibW92ZVRvIiwieCIsInkiLCJhcmMiLCJNYXRoIiwiUEkiLCJjbG9zZVBhdGgiLCJmaWxsIiwic3Ryb2tlIiwidXBkYXRlIiwicGxhbmV0cyIsInBsYW5ldCIsImFkZCIsImdldEFjY2VsZXJhdGlvbiIsImRvdCIsInB1c2giLCJsZW5ndGgiLCJzcGxpY2UiLCJmIiwiZ2V0Rm9yY2UiLCJkaWZmIiwiRyIsInNxcnQiLCJkaXN0IiwiYW5pbWF0aW9uIiwiY29vcmRpbmF0ZVNwYW4iLCJlbmFibGVEcmF3IiwibW91c2VEb3duIiwibGFzdERyYXciLCJfc3RhcnRMYXN0RHJhdyIsImNhbnZhcyIsImdldENvbnRleHQiLCJfcmVzaXplQ2FudmFzIiwiYWRkTGlzdGVuZXIiLCJfb25Nb3VzZURvd24iLCJfb25Nb3VzZVVwIiwiX29uTW91c2VNb3ZlIiwiYmluZCIsImUiLCJFTkQiLCJjbGllbnRYIiwiY2xpZW50WSIsIm1vdXNlUG9zIiwiU1RBUlQiLCJyYW5kb20iLCJ3aWR0aCIsImlubmVyV2lkdGgiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiaSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIl9zaW11bGF0ZSIsImNsZWFyUmVjdCIsIm90aGVyIiwic2xpY2UiLCJsaW5lVG8iLCJldmVudCIsImZ1bmMiLCJtYWduaXR1ZGUiLCJwb3ciLCJvYmplY3QiLCJhIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztR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LEtBQUtBLENBRk4sQ0FBUDtBQUlEO0FBRUQ7Ozs7OztBQUlBcUIsTUFBSSxDQUFFdUMsQ0FBRixFQUFLO0FBQ1AsUUFBSTFDLElBQUksR0FBRyxLQUFLQSxJQUFMLENBQVUwQyxDQUFWLENBQVg7QUFDQSxXQUFPMUQsSUFBSSxDQUFDa0IsSUFBTCxDQUNMbEIsSUFBSSxDQUFDd0QsR0FBTCxDQUFTeEMsSUFBSSxDQUFDbkIsQ0FBZCxFQUFpQixDQUFqQixJQUNBRyxJQUFJLENBQUN3RCxHQUFMLENBQVN4QyxJQUFJLENBQUNsQixDQUFkLEVBQWlCLENBQWpCLENBRkssQ0FBUDtBQUlEOztBQTVFeUIsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiXG5pbXBvcnQgU2ltdWxhdGlvbiBmcm9tIFwiLi9zaW11bGF0aW9uXCI7XG5cbi8vIFRPRE86IHpvb20gaW4vb3V0IGZlYXR1cmVcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xuZ2V0QnlJZCgnb3Blbi1tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTWVudSk7XG5nZXRCeUlkKCdzdGFydC1zaW11bGF0aW9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydFNpbXVsYXRpb24pO1xuXG4vLyBwYXJhbXMgaW5wdXQgY2hhbmdlIGV2ZW50c1xuZ2V0QnlJZCgnZ3Jhdml0eS1jb25zdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25JbnB1dENoYW5nZSk7XG5nZXRCeUlkKCdzcGVlZC1jb25zdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25JbnB1dENoYW5nZSk7XG5nZXRCeUlkKCdwbGFuZXRzLWNvdW50JykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbklucHV0Q2hhbmdlKTtcbmdldEJ5SWQoJ3Nob3ctcGF0aCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25TaG93UGF0aENoYW5nZSk7XG5cbmZ1bmN0aW9uIG9uTG9hZCAoKSB7XG4gIG9wZW5NZW51KCk7XG4gIHVwZGF0ZVZpZXdFbGVtZW50cygpO1xuICBzdGFydFNpbXVsYXRpb24oKTtcbn1cblxubGV0IHNpbXVsYXRpb24gPSBudWxsO1xubGV0IHBhcmFtcyA9IHtcbiAgc3BlZWRDOiAwLjEsXG4gIGdyYXZpdHlDOiAwLjAwMixcbiAgc2hvd1BhdGg6IHRydWUsXG4gIHBsYW5ldHNDb3VudDogMTAsXG59O1xuXG5mdW5jdGlvbiBvbklucHV0Q2hhbmdlICgpIHtcbiAgbGV0IHBsYW5ldHNDSW5wdXQgPSBOdW1iZXIucGFyc2VGbG9hdChnZXRCeUlkKCdwbGFuZXRzLWNvdW50JykudmFsdWUpO1xuICBpZiAoIWlzTmFOKHBsYW5ldHNDSW5wdXQpKSBwYXJhbXMucGxhbmV0c0NvdW50ID0gcGxhbmV0c0NJbnB1dDtcblxuICBsZXQgZ3Jhdml0eUNJbnB1dCA9IE51bWJlci5wYXJzZUZsb2F0KGdldEJ5SWQoJ2dyYXZpdHktY29uc3QnKS52YWx1ZSk7XG4gIGlmICghaXNOYU4oZ3Jhdml0eUNJbnB1dCkpIHBhcmFtcy5ncmF2aXR5QyA9IGdyYXZpdHlDSW5wdXQ7XG5cbiAgbGV0IHNwZWVkQ0lucHV0ID0gTnVtYmVyLnBhcnNlRmxvYXQoZ2V0QnlJZCgnc3BlZWQtY29uc3QnKS52YWx1ZSk7XG4gIGlmICghaXNOYU4oc3BlZWRDSW5wdXQpKSBwYXJhbXMuc3BlZWRDID0gc3BlZWRDSW5wdXQ7XG5cbiAgcGFyYW1zLnNob3dQYXRoID0gZ2V0QnlJZCgnc2hvdy1wYXRoJykuY2hlY2tlZDtcblxuICBzdGFydFNpbXVsYXRpb24oKTtcbn1cblxuZnVuY3Rpb24gb25TaG93UGF0aENoYW5nZSAoKSB7XG4gIC8vIGlmIHNob3ctcGF0aCBpbnB1dCBjaGFuZ2VzIGRvbid0IHJlaW5pdGlhbGl6ZSBzaW11bGF0aW9uXG4gIHBhcmFtcy5zaG93UGF0aCA9IGdldEJ5SWQoJ3Nob3ctcGF0aCcpLmNoZWNrZWQ7XG4gIHNpbXVsYXRpb24ucGFyYW1zLnNob3dQYXRoID0gcGFyYW1zLnNob3dQYXRoO1xufVxuXG5mdW5jdGlvbiBzdGFydFNpbXVsYXRpb24gKCkge1xuICBpZiAoc2ltdWxhdGlvbikge1xuICAgIHNpbXVsYXRpb24uZGVzdHJveSgpO1xuICAgIHNpbXVsYXRpb24gPSBuZXcgU2ltdWxhdGlvbihwYXJhbXMpO1xuICAgIHNpbXVsYXRpb24uc3RhcnQoKTtcbiAgfSBlbHNlIHtcbiAgICBzaW11bGF0aW9uID0gbmV3IFNpbXVsYXRpb24ocGFyYW1zKTtcbiAgICBzaW11bGF0aW9uLnN0YXJ0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlVmlld0VsZW1lbnRzICgpIHtcbiAgZ2V0QnlJZCgnZ3Jhdml0eS1jb25zdCcpLnZhbHVlID0gcGFyYW1zLmdyYXZpdHlDO1xuICBnZXRCeUlkKCdzcGVlZC1jb25zdCcpLnZhbHVlID0gcGFyYW1zLnNwZWVkQztcbiAgZ2V0QnlJZCgncGxhbmV0cy1jb3VudCcpLnZhbHVlID0gcGFyYW1zLnBsYW5ldHNDb3VudDtcbiAgZ2V0QnlJZCgnc2hvdy1wYXRoJykuY2hlY2tlZCA9IHBhcmFtcy5zaG93UGF0aDtcbn1cblxuZnVuY3Rpb24gb3Blbk1lbnUgKCkge1xuICAkKFwiI2ludHJvLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBmYWRlRHVyYXRpb246IDEwMFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0QnlJZCAoaWQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuL3ZlY3RvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGFuZXQge1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gW3BhcmFtc10ge09iamVjdH1cbiAgICogQHBhcmFtIFttYXNzID0gMV0ge051bWJlcn1cbiAgICogQHBhcmFtIFtwb3NpdGlvbl0ge1ZlY3Rvcn1cbiAgICogQHBhcmFtIFt2ZWxvY2l0eV0ge1ZlY3Rvcn1cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwYXJhbXMsIG1hc3MsIHBvc2l0aW9uLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMubWFzcyA9IG1hc3MgPyBtYXNzIDogMTtcbiAgICB0aGlzLnBvc2l0aW9uID0gVmVjdG9yLmlzKHBvc2l0aW9uKSA/IHBvc2l0aW9uIDogbmV3IFZlY3RvcigpO1xuICAgIHRoaXMudmVsb2NpdHkgPSBWZWN0b3IuaXModmVsb2NpdHkpID8gdmVsb2NpdHkgOiBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5wYXRoID0gW107XG4gIH1cblxuICBkcmF3IChjdHgsIHNob3dQYXRoID0gdHJ1ZSkge1xuICAgIGlmIChzaG93UGF0aCkge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2Q5ZDlkOVwiO1xuICAgICAgZm9yIChsZXQgcG9zaXRpb24gb2YgdGhpcy5wYXRoKSB7XG4gICAgICAgIGN0eC5tb3ZlVG8ocG9zaXRpb24ueCAsIHBvc2l0aW9uLnkpO1xuICAgICAgICBjdHguYXJjKHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIDIsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgIH1cbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcbiAgICBjdHguYXJjKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLm1hc3MsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cblxuICB1cGRhdGUgKHBsYW5ldHMpIHtcbiAgICBmb3IgKGxldCBwbGFuZXQgb2YgcGxhbmV0cykge1xuICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHkuYWRkKHRoaXMuZ2V0QWNjZWxlcmF0aW9uKHBsYW5ldCkpO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy52ZWxvY2l0eS5kb3QodGhpcy5wYXJhbXMuc3BlZWRDKSk7XG4gICAgdGhpcy5wYXRoLnB1c2godGhpcy5wb3NpdGlvbik7XG4gICAgaWYgKHRoaXMucGF0aC5sZW5ndGggPiAxMDApIHtcbiAgICAgIHRoaXMucGF0aC5zcGxpY2UoMCwgMSlcbiAgICB9XG4gIH1cblxuICBnZXRBY2NlbGVyYXRpb24gKHBsYW5ldCkge1xuICAgIGxldCBmID0gdGhpcy5nZXRGb3JjZShwbGFuZXQpO1xuICAgIGxldCBkaWZmID0gdGhpcy5wb3NpdGlvbi5kaWZmKHBsYW5ldC5wb3NpdGlvbik7XG4gICAgcmV0dXJuIGRpZmYuZG90KCBmIC8gdGhpcy5tYXNzKTtcbiAgfVxuXG4gIGdldEZvcmNlIChwbGFuZXQpIHtcbiAgICBsZXQgRyA9IHRoaXMucGFyYW1zLmdyYXZpdHlDID8gdGhpcy5wYXJhbXMuZ3Jhdml0eUMgOiAxO1xuICAgIHJldHVybiBHICogcGxhbmV0Lm1hc3MgKiB0aGlzLm1hc3MgLyBNYXRoLnNxcnQodGhpcy5wb3NpdGlvbi5kaXN0KHBsYW5ldC5wb3NpdGlvbikpO1xuICB9XG5cbn0iLCJpbXBvcnQgUGxhbmV0IGZyb20gXCIuL3BsYW5ldFwiO1xuaW1wb3J0IFZlY3RvciBmcm9tIFwiLi92ZWN0b3JcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW11bGF0aW9uIHtcblxuICBjb25zdHJ1Y3RvciAocGFyYW1zKSB7XG4gICAgdGhpcy5hbmltYXRpb24gPSBudWxsO1xuICAgIHRoaXMucGxhbmV0cyA9IFtdO1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuY29vcmRpbmF0ZVNwYW4gPSAxO1xuICAgIC8vIHNwZWVkIHZlY3RvciBkcmF3XG4gICAgdGhpcy5lbmFibGVEcmF3ID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICB0aGlzLmxhc3REcmF3ID0gdGhpcy5fc3RhcnRMYXN0RHJhdygpO1xuICAgIC8vIGNhbnZhcyBpbml0aWFsaXphdGlvblxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NrZXRjaCcpO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLl9yZXNpemVDYW52YXMoKTtcbiAgICAvLyBjYW52YXMgbW91c2UgZXZlbnRzXG4gICAgYWRkTGlzdGVuZXIoJ3NrZXRjaCcsICdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93biwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ3NrZXRjaCcsICdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwLCB0aGlzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3Jlc2l6ZUNhbnZhcy5iaW5kKHRoaXMpKTtcblxuICB9XG5cbiAgX29uTW91c2VNb3ZlIChlKSB7XG4gICAgaWYgKHRoaXMubW91c2VEb3duICYmIHRoaXMuZW5hYmxlRHJhdykge1xuICAgICAgdGhpcy5sYXN0RHJhdy5FTkQgPSB7XG4gICAgICAgIHg6IGUuY2xpZW50WCxcbiAgICAgICAgeTogZS5jbGllbnRZXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX29uTW91c2VEb3duIChlKSB7XG4gICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xuICAgIGlmICh0aGlzLmVuYWJsZURyYXcpIHtcbiAgICAgIGxldCBtb3VzZVBvcyA9IHtcbiAgICAgICAgeDogZS5jbGllbnRYLFxuICAgICAgICB5OiBlLmNsaWVudFlcbiAgICAgIH07XG4gICAgICB0aGlzLmxhc3REcmF3LlNUQVJUID0gbW91c2VQb3M7XG4gICAgICB0aGlzLmxhc3REcmF3LkVORCA9IG1vdXNlUG9zO1xuICAgIH1cbiAgfVxuXG4gIF9vbk1vdXNlVXAgKGUpIHtcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmVuYWJsZURyYXcpIHtcbiAgICAgIHRoaXMucGxhbmV0cy5wdXNoKG5ldyBQbGFuZXQoXG4gICAgICAgIHRoaXMucGFyYW1zLFxuICAgICAgICBNYXRoLnJhbmRvbSgpICogMTAsXG4gICAgICAgIG5ldyBWZWN0b3IoXG4gICAgICAgICAgdGhpcy5sYXN0RHJhdy5TVEFSVC54LFxuICAgICAgICAgIHRoaXMubGFzdERyYXcuU1RBUlQueVxuICAgICAgICApLFxuICAgICAgICBuZXcgVmVjdG9yKFxuICAgICAgICAgIC8vIHNjYWxlIGRvd24gdmVjdG9yIGZvciBiZXR0ZXIgbW91c2UgZHJhd2luZyBwcmVjaXNpb25cbiAgICAgICAgICAodGhpcy5sYXN0RHJhdy5FTkQueCAtIHRoaXMubGFzdERyYXcuU1RBUlQueCkgLyA0LFxuICAgICAgICAgICh0aGlzLmxhc3REcmF3LkVORC55IC0gdGhpcy5sYXN0RHJhdy5TVEFSVC55KSAvIDRcbiAgICAgICAgKSxcbiAgICAgICkpO1xuICAgIH1cbiAgICB0aGlzLmxhc3REcmF3ID0gdGhpcy5fc3RhcnRMYXN0RHJhdygpO1xuICB9XG5cbiAgX3N0YXJ0TGFzdERyYXcgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBTVEFSVDogeyB4OiAwLCB5OiAwIH0sXG4gICAgICBFTkQ6IHsgeDogMCwgeTogMH1cbiAgICB9XG4gIH1cblxuICBfcmVzaXplQ2FudmFzICgpIHtcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uKTtcbiAgfVxuXG4gIHN0YXJ0ICgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFyYW1zLnBsYW5ldHNDb3VudDsgaSsrKSB7XG4gICAgICB0aGlzLnBsYW5ldHMucHVzaChuZXcgUGxhbmV0KFxuICAgICAgICB0aGlzLnBhcmFtcyxcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqIDEwLFxuICAgICAgICBuZXcgVmVjdG9yKFxuICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiB0aGlzLmNhbnZhcy53aWR0aCxcbiAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy5jYW52YXMuaGVpZ2h0XG4gICAgICAgIClcbiAgICAgICkpXG4gICAgfVxuICAgIHRoaXMuZW5hYmxlRHJhdyA9IHRydWU7XG4gICAgdGhpcy5hbmltYXRpb24gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fc2ltdWxhdGUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBfc2ltdWxhdGUgKCkge1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgb3RoZXIgPSBbLi4udGhpcy5wbGFuZXRzLnNsaWNlKDAsIGkgLSAxKSwgLi4udGhpcy5wbGFuZXRzLnNsaWNlKGksIHRoaXMucGxhbmV0cy5sZW5ndGgpXTtcbiAgICAgIHRoaXMucGxhbmV0c1tpXS51cGRhdGUob3RoZXIpO1xuICAgICAgdGhpcy5wbGFuZXRzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMucGFyYW1zLnNob3dQYXRoKTtcbiAgICB9XG5cbiAgICB0aGlzLmN0eC5tb3ZlVG8odGhpcy5sYXN0RHJhdy5TVEFSVC54LCB0aGlzLmxhc3REcmF3LlNUQVJULnkpO1xuICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLmxhc3REcmF3LkVORC54LCB0aGlzLmxhc3REcmF3LkVORC55KTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9zaW11bGF0ZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG5cbn1cblxuZnVuY3Rpb24gYWRkTGlzdGVuZXIgKGlkLCBldmVudCwgZnVuYywgYmluZCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYy5iaW5kKGJpbmQpKTtcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3Ige1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gW3ggPSAwXSB7TnVtYmVyfVxuICAgKiBAcGFyYW0gW3kgPSAwXSB7TnVtYmVyfVxuICAgKi9cbiAgY29uc3RydWN0b3IgKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4ID8geCA6IDA7XG4gICAgdGhpcy55ID0geSA/IHkgOiAwO1xuICB9XG5cbiAgZ2V0IG1hZ25pdHVkZSAoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChcbiAgICAgIE1hdGgucG93KHRoaXMueCwgMikgK1xuICAgICAgTWF0aC5wb3codGhpcy55LCAyKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gb2JqZWN0XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzIChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgVmVjdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhIHtOdW1iZXJ9XG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XG4gICAqL1xuICBkb3QgKGEpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgIHRoaXMueCAqIGEsXG4gICAgICB0aGlzLnkgKiBhXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhIHtWZWN0b3J8TnVtYmVyfVxuICAgKiBAcmV0dXJucyB7VmVjdG9yfVxuICAgKi9cbiAgYWRkIChhKSB7XG4gICAgaWYgKFZlY3Rvci5pcyhhKSkge1xuICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgIHRoaXMueCArIGEueCxcbiAgICAgICAgdGhpcy55ICsgYS55XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICB0aGlzLnggKyBhLFxuICAgICAgICB0aGlzLnkgKyBhXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhIHtWZWN0b3J9XG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XG4gICAqL1xuICBkaWZmIChhKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICBhLnggLSB0aGlzLngsXG4gICAgICBhLnkgLSB0aGlzLnlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhIHtWZWN0b3J9XG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBkaXN0IChhKSB7XG4gICAgbGV0IGRpZmYgPSB0aGlzLmRpZmYoYSk7XG4gICAgcmV0dXJuIE1hdGguc3FydChcbiAgICAgIE1hdGgucG93KGRpZmYueCwgMikgK1xuICAgICAgTWF0aC5wb3coZGlmZi55LCAyKVxuICAgIClcbiAgfVxuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==