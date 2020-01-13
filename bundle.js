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

 // TODO: implement stable orbits examples: https://math.stackexchange.com/questions/1613765/simple-stable-n-body-orbits-in-the-plane-with-some-fixed-bodies-allowed

let simulation = null;
let params = {
  speedC: 0.1,
  gravityC: 0.0004,
  planetsCount: 10
};
window.addEventListener('load', onLoad);
getById('open-menu').addEventListener('click', openMenu);
getById('start-simulation').addEventListener('click', startSimulation); // params input change events

getById('gravity-const').addEventListener('input', onInputChange);
getById('speed-const').addEventListener('input', onSpeedChange);
getById('planets-count').addEventListener('input', onInputChange);

function onLoad() {
  openMenu();
  updateViewElements();
  startSimulation();
}

function onInputChange() {
  let planetsCInput = Number.parseFloat(getById('planets-count').value);
  if (!isNaN(planetsCInput)) params.planetsCount = planetsCInput;
  let gravityCInput = Number.parseFloat(getById('gravity-const').value);
  if (!isNaN(gravityCInput)) params.gravityC = gravityCInput;
  startSimulation();
}

function onSpeedChange() {
  let speedCInput = Number.parseFloat(getById('speed-const').value);
  if (!isNaN(speedCInput)) params.speedC = speedCInput;
  simulation.params.speedC = params.speedC;
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
    this.acceleration = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.c = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, x)`;
    this.path = [];
    this.tick = 0;
  }

  color(opacity) {
    return this.c.replace('x', opacity);
  }

  draw(ctx, showPath = true, showVVectors, showAVectors) {
    if (showPath) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(1, 1, 1, 0)";
      ctx.fillStyle = this.color(0.3);

      for (let position of this.path) {
        ctx.moveTo(position.x, position.y);
        ctx.arc(position.x, position.y, 2, 0, 2 * Math.PI);
      }

      ctx.closePath();
      ctx.fill();
    }

    if (showVVectors) {
      this._drawVector(ctx, "#FF0000", this.position.x, this.position.y, this.position.x + this.velocity.x, this.position.y + this.velocity.y);
    }

    if (showAVectors) {
      this._drawVector(ctx, "#0012ff", this.position.x, this.position.y, this.position.x + this.acceleration.x * 150, this.position.y + this.acceleration.y * 150);
    }

    ctx.beginPath();
    ctx.fillStyle = this.color(1);
    ctx.arc(this.position.x, this.position.y, this.mass, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    this.tick++;
  }

  _drawVector(ctx, color, x0, y0, x1, y1) {
    const s = 3;
    const w = 0.4;
    let dx = x1 - x0;
    let dy = y1 - y0;
    let a = Math.atan(dy / dx);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = s;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.moveTo(x1, y1);

    if (dx < 0) {
      ctx.lineTo(x1 + Math.cos(a - w) * s, y1 + Math.sin(a - w) * s);
      ctx.lineTo(x1 + Math.cos(a + w) * s, y1 + Math.sin(a + w) * s);
    } else {
      ctx.lineTo(x1 - Math.cos(a - w) * s, y1 - Math.sin(a - w) * s);
      ctx.lineTo(x1 - Math.cos(a + w) * s, y1 - Math.sin(a + w) * s);
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  update(planets, speedC) {
    for (let planet of planets) {
      this.acceleration = this.getAcceleration(planet);
      this.velocity = this.velocity.add(this.acceleration);
    }

    this.position = this.position.add(this.velocity.dot(speedC));

    if (this.tick % 4 === 0) {
      this.path.push(this.position);
    }

    if (this.path.length > 150) {
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
/*! exports provided: EDIT_MODES, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_MODES", function() { return EDIT_MODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Simulation; });
/* harmony import */ var _planet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./planet */ "./src/planet.js");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector */ "./src/vector.js");


const EDIT_MODES = {
  MOVE: 1,
  CREATE_PLANETS: 2
};
class Simulation {
  constructor(params) {
    this.animation = null;
    this.planets = [];
    this.params = params;
    this.scale = 1;
    this.spanX = 500;
    this.showVelocityVectors = true;
    this.showAccVectors = false;
    this.showPath = true;
    this.editMode = EDIT_MODES.MOVE;

    this._initViewElements(); // translation state


    this.translate = {
      x: 0,
      y: 0
    }; // zoom state

    this.isZoomingIn = false;
    this.isZoomingOut = false; // mouse state

    this.mouseDown = false;
    this.lastDraw = {
      START: {
        x: 0,
        y: 0
      },
      END: {
        x: 0,
        y: 0
      }
    };
    this.lastMousePos = null; // canvas initialization

    this.canvas = document.getElementById('sketch');
    this.ctx = this.canvas.getContext('2d');

    this._resizeCanvas(); // canvas mouse events


    addListener('sketch', 'mousedown', this._onMouseDown, this);
    addListener('sketch', 'mouseup', this._onMouseUp, this); // zoom out/in buttons events

    addListener('zoom-in', 'mousedown', this._onZoomIn, this);
    addListener('zoom-in', 'mouseup', this._onZoomIn, this);
    addListener('zoom-out', 'mousedown', this._onZoomOut, this);
    addListener('zoom-out', 'mouseup', this._onZoomOut, this);
    addListener('create-mode', 'click', this._onPlanetCreate, this);
    addListener('move-mode', 'click', this._onMoveMode, this);
    addListener('show-path', 'click', this._onShowPath, this);
    addListener('show-v-vectors', 'click', this._onShowVVectors, this);
    addListener('show-a-vectors', 'click', this._onShowAVectors, this);
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
    window.addEventListener('resize', this._resizeCanvas.bind(this));
  }

  _onZoomIn() {
    this.isZoomingIn = !this.isZoomingIn;
  }

  _onZoomOut() {
    this.isZoomingOut = !this.isZoomingOut;
  }

  _onShowPath(e) {
    invertSelect('show-path');
    this.showPath = !this.showPath;
  }

  _onShowVVectors() {
    invertSelect('show-v-vectors');
    this.showVelocityVectors = !this.showVelocityVectors;
  }

  _onShowAVectors() {
    invertSelect('show-a-vectors');
    this.showAccVectors = !this.showAccVectors;
  }

  _onPlanetCreate() {
    select('create-mode');
    unselect('move-mode');
    document.getElementById('container').style.cursor = 'crosshair';
    this.editMode = EDIT_MODES.CREATE_PLANETS;
  }

  _onMoveMode() {
    unselect('create-mode');
    select('move-mode');
    document.getElementById('container').style.cursor = 'grab';
    this.editMode = EDIT_MODES.MOVE;
  }

  _onMouseMove(e) {
    // skip if mouse not pressed
    if (!this.mouseDown) return;

    if (this.editMode === EDIT_MODES.CREATE_PLANETS) {
      this.lastDraw.END = {
        x: e.clientX,
        y: e.clientY
      };
    } // if mouse position unset


    if (!this.lastMousePos) {
      this.lastMousePos = {
        x: e.clientX,
        y: e.clientY
      };
    } // calculate mouse position diff


    if (this.editMode === EDIT_MODES.MOVE) {
      if (!this.lastMousePos) {
        this.lastMousePos = {
          x: e.clientX,
          y: e.clientY
        };
      }

      this.translate.x += (e.clientX - this.lastMousePos.x) * 2 / this._getScaleX();
      this.translate.y += (e.clientY - this.lastMousePos.y) * 2 / this._getScaleY();
      this.lastMousePos = {
        x: e.clientX,
        y: e.clientY
      };
    }
  }

  _onMouseDown(e) {
    this.mouseDown = true;

    if (this.editMode === EDIT_MODES.CREATE_PLANETS) {
      let mousePos = {
        x: e.clientX,
        y: e.clientY
      };
      this.lastDraw.START = mousePos;
      this.lastDraw.END = mousePos;
    } else if (this.editMode === EDIT_MODES.MOVE) {
      document.getElementById('container').style.cursor = 'grabbing';
    }
  }

  _onMouseUp(e) {
    this.mouseDown = false;

    if (this.editMode === EDIT_MODES.CREATE_PLANETS) {
      this.planets.push(new _planet__WEBPACK_IMPORTED_MODULE_0__["default"](this.params, Math.random() * 10 + 5, new _vector__WEBPACK_IMPORTED_MODULE_1__["default"]((this.lastDraw.START.x - this.canvas.width / 2) / this._getScaleX() + -this.translate.x, (this.lastDraw.START.y - this.canvas.height / 2) / this._getScaleY() + -this.translate.y), new _vector__WEBPACK_IMPORTED_MODULE_1__["default"]( // scale down vector for better mouse drawing precision
      this.lastDraw.END.x - this.lastDraw.START.x, this.lastDraw.END.y - this.lastDraw.START.y)));
    } else if (this.editMode === EDIT_MODES.MOVE) {
      document.getElementById('container').style.cursor = 'grab';
    }

    this.lastMousePos = null;
    this.lastDraw = {
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

  _initViewElements() {
    let create = document.getElementById('create-mode');
    let move = document.getElementById('move-mode');
    let showPath = document.getElementById('show-path');
    let showVVectors = document.getElementById('show-v-vectors');

    if (!showVVectors.classList.contains('selected')) {
      showVVectors.classList.add('selected');
    }

    if (!showPath.classList.contains('selected')) {
      showPath.classList.add('selected');
    }

    if (create.classList.contains('selected')) {
      create.classList.remove('selected');
    }

    if (!move.classList.contains('selected')) {
      move.classList.add('selected');
    }

    document.getElementById('container').style.cursor = 'grab';
  }

  _resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _getScaleX() {
    return this.canvas.width / this.spanX * this.scale;
  }

  _getScaleY() {
    return this._getScaleX();
  }

  _calculateMassCenter() {
    let avg = {
      x: 0,
      y: 0
    };

    for (let i = 0; i < this.planets.length; i++) {
      avg.x += this.planets[i].position.x;
      avg.y += this.planets[i].position.y;
    }

    avg.x = avg.x / this.planets.length;
    avg.y = avg.y / this.planets.length;
    return avg;
  }

  destroy() {
    cancelAnimationFrame(this.animation);
  }

  start() {
    // randomly initialize planets based on planet count param
    for (let i = 0; i < this.params.planetsCount; i++) {
      this.planets.push(new _planet__WEBPACK_IMPORTED_MODULE_0__["default"](this.params, Math.random() * 10 + 3, new _vector__WEBPACK_IMPORTED_MODULE_1__["default"]((Math.random() - 0.5) * this.spanX / 3, (Math.random() - 0.5) * this.spanX / 3)));
    }

    this.animation = requestAnimationFrame(this._simulate.bind(this));
  }

  _simulate() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.scale(this._getScaleX(), this._getScaleY());
    this.ctx.translate(this.translate.x, this.translate.y);

    const massCenter = this._calculateMassCenter();

    this.ctx.translate(-massCenter.x, -massCenter.y);

    for (let i = 0; i < this.planets.length; i++) {
      let other = [...this.planets.slice(0, i - 1), ...this.planets.slice(i, this.planets.length)];
      this.planets[i].update(other, this.params.speedC);
      this.planets[i].draw(this.ctx, this.showPath, this.showVelocityVectors, this.showAccVectors);
    }

    this.ctx.restore();

    this._drawVelocityVector(this.lastDraw.START.x, this.lastDraw.START.y, this.lastDraw.END.x, this.lastDraw.END.y);

    if (this.isZoomingIn) this.scale += 0.005;
    if (this.isZoomingOut && this.scale > 0) this.scale -= 0.005;
    requestAnimationFrame(this._simulate.bind(this));
  }

  _drawVelocityVector(x0, y0, x1, y1) {
    const s = 7;
    const w = 0.7;
    let dx = x1 - x0;
    let dy = y1 - y0;
    let a = Math.atan(dy / dx);
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'black';
    this.ctx.lineWidth = s;
    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.moveTo(x1, y1);

    if (dx < 0) {
      this.ctx.lineTo(x1 + Math.cos(a - w) * s, y1 + Math.sin(a - w) * s);
      this.ctx.lineTo(x1 + Math.cos(a + w) * s, y1 + Math.sin(a + w) * s);
    } else {
      this.ctx.lineTo(x1 - Math.cos(a - w) * s, y1 - Math.sin(a - w) * s);
      this.ctx.lineTo(x1 - Math.cos(a + w) * s, y1 - Math.sin(a + w) * s);
    }

    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

}

function invertSelect(id) {
  let ele = document.getElementById(id);

  if (ele.classList.contains('selected')) {
    ele.classList.remove('selected');
  } else {
    ele.classList.add('selected');
  }
}

function unselect(id) {
  let ele = document.getElementById(id);

  if (ele.classList.contains('selected')) {
    ele.classList.remove('selected');
  }
}

function select(id) {
  let ele = document.getElementById(id);

  if (!ele.classList.contains('selected')) {
    ele.classList.add('selected');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wbGFuZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3IuanMiXSwibmFtZXMiOlsic2ltdWxhdGlvbiIsInBhcmFtcyIsInNwZWVkQyIsImdyYXZpdHlDIiwicGxhbmV0c0NvdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uTG9hZCIsImdldEJ5SWQiLCJvcGVuTWVudSIsInN0YXJ0U2ltdWxhdGlvbiIsIm9uSW5wdXRDaGFuZ2UiLCJvblNwZWVkQ2hhbmdlIiwidXBkYXRlVmlld0VsZW1lbnRzIiwicGxhbmV0c0NJbnB1dCIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJ2YWx1ZSIsImlzTmFOIiwiZ3Jhdml0eUNJbnB1dCIsInNwZWVkQ0lucHV0IiwiZGVzdHJveSIsIlNpbXVsYXRpb24iLCJzdGFydCIsImNoZWNrZWQiLCJzaG93UGF0aCIsIiQiLCJtb2RhbCIsImZhZGVEdXJhdGlvbiIsImlkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIlBsYW5ldCIsImNvbnN0cnVjdG9yIiwibWFzcyIsInBvc2l0aW9uIiwidmVsb2NpdHkiLCJWZWN0b3IiLCJpcyIsImFjY2VsZXJhdGlvbiIsImMiLCJNYXRoIiwicmFuZG9tIiwicGF0aCIsInRpY2siLCJjb2xvciIsIm9wYWNpdHkiLCJyZXBsYWNlIiwiZHJhdyIsImN0eCIsInNob3dWVmVjdG9ycyIsInNob3dBVmVjdG9ycyIsImJlZ2luUGF0aCIsInN0cm9rZVN0eWxlIiwiZmlsbFN0eWxlIiwibW92ZVRvIiwieCIsInkiLCJhcmMiLCJQSSIsImNsb3NlUGF0aCIsImZpbGwiLCJfZHJhd1ZlY3RvciIsIngwIiwieTAiLCJ4MSIsInkxIiwicyIsInciLCJkeCIsImR5IiwiYSIsImF0YW4iLCJsaW5lV2lkdGgiLCJsaW5lVG8iLCJjb3MiLCJzaW4iLCJzdHJva2UiLCJ1cGRhdGUiLCJwbGFuZXRzIiwicGxhbmV0IiwiZ2V0QWNjZWxlcmF0aW9uIiwiYWRkIiwiZG90IiwicHVzaCIsImxlbmd0aCIsInNwbGljZSIsImYiLCJnZXRGb3JjZSIsImRpZmYiLCJHIiwic3FydCIsImRpc3QiLCJFRElUX01PREVTIiwiTU9WRSIsIkNSRUFURV9QTEFORVRTIiwiYW5pbWF0aW9uIiwic2NhbGUiLCJzcGFuWCIsInNob3dWZWxvY2l0eVZlY3RvcnMiLCJzaG93QWNjVmVjdG9ycyIsImVkaXRNb2RlIiwiX2luaXRWaWV3RWxlbWVudHMiLCJ0cmFuc2xhdGUiLCJpc1pvb21pbmdJbiIsImlzWm9vbWluZ091dCIsIm1vdXNlRG93biIsImxhc3REcmF3IiwiU1RBUlQiLCJFTkQiLCJsYXN0TW91c2VQb3MiLCJjYW52YXMiLCJnZXRDb250ZXh0IiwiX3Jlc2l6ZUNhbnZhcyIsImFkZExpc3RlbmVyIiwiX29uTW91c2VEb3duIiwiX29uTW91c2VVcCIsIl9vblpvb21JbiIsIl9vblpvb21PdXQiLCJfb25QbGFuZXRDcmVhdGUiLCJfb25Nb3ZlTW9kZSIsIl9vblNob3dQYXRoIiwiX29uU2hvd1ZWZWN0b3JzIiwiX29uU2hvd0FWZWN0b3JzIiwiX29uTW91c2VNb3ZlIiwiYmluZCIsImUiLCJpbnZlcnRTZWxlY3QiLCJzZWxlY3QiLCJ1bnNlbGVjdCIsInN0eWxlIiwiY3Vyc29yIiwiY2xpZW50WCIsImNsaWVudFkiLCJfZ2V0U2NhbGVYIiwiX2dldFNjYWxlWSIsIm1vdXNlUG9zIiwid2lkdGgiLCJoZWlnaHQiLCJjcmVhdGUiLCJtb3ZlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJyZW1vdmUiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJfY2FsY3VsYXRlTWFzc0NlbnRlciIsImF2ZyIsImkiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIl9zaW11bGF0ZSIsInNldFRyYW5zZm9ybSIsImNsZWFyUmVjdCIsInNhdmUiLCJtYXNzQ2VudGVyIiwib3RoZXIiLCJzbGljZSIsInJlc3RvcmUiLCJfZHJhd1ZlbG9jaXR5VmVjdG9yIiwiZWxlIiwiZXZlbnQiLCJmdW5jIiwibWFnbml0dWRlIiwicG93Iiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Q0FHQTs7QUFFQSxJQUFJQSxVQUFVLEdBQUcsSUFBakI7QUFDQSxJQUFJQyxNQUFNLEdBQUc7QUFDWEMsUUFBTSxFQUFFLEdBREc7QUFFWEMsVUFBUSxFQUFFLE1BRkM7QUFHWEMsY0FBWSxFQUFFO0FBSEgsQ0FBYjtBQU1BQyxNQUFNLENBQUNDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDQyxNQUFoQztBQUNBQyxPQUFPLENBQUMsV0FBRCxDQUFQ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LEtBQUcsQ0FBRVgsQ0FBRixFQUFLO0FBQ04sUUFBSWxDLE1BQU0sQ0FBQ0MsRUFBUCxDQUFVaUMsQ0FBVixDQUFKLEVBQWtCO0FBQ2hCLGFBQU8sSUFBSWxDLE1BQUosQ0FDTCxLQUFLbUIsQ0FBTCxHQUFTZSxDQUFDLENBQUNmLENBRE4sRUFFTCxLQUFLQyxDQUFMLEdBQVNjLENBQUMsQ0FBQ2QsQ0FGTixDQUFQO0FBSUQsS0FMRCxNQUtPO0FBQ0wsYUFBTyxJQUFJcEIsTUFBSixDQUNMLEtBQUttQixDQUFMLEdBQVNlLENBREosRUFFTCxLQUFLZCxDQUFMLEdBQVNjLENBRkosQ0FBUDtBQUlEO0FBQ0Y7QUFFRDs7Ozs7O0FBSUFrQixNQUFJLENBQUVsQixDQUFGLEVBQUs7QUFDUCxXQUFPLElBQUlsQyxNQUFKLENBQ0xrQyxDQUFDLENBQUNmLENBQUYsR0FBTSxLQUFLQSxDQUROLEVBRUxlLENBQUMsQ0FBQ2QsQ0FBRixHQUFNLEtBQUtBLENBRk4sQ0FBUDtBQUlEO0FBRUQ7Ozs7OztBQUlBbUMsTUFBSSxDQUFFckIsQ0FBRixFQUFLO0FBQ1AsUUFBSWtCLElBQUksR0FBRyxLQUFLQSxJQUFMLENBQVVsQixDQUFWLENBQVg7QUFDQSxXQUFPOUIsSUFBSSxDQUFDa0QsSUFBTCxDQUNMbEQsSUFBSSxDQUFDMkgsR0FBTCxDQUFTM0UsSUFBSSxDQUFDakMsQ0FBZCxFQUFpQixDQUFqQixJQUNBZixJQUFJLENBQUMySCxHQUFMLENBQVMzRSxJQUFJLENBQUNoQyxDQUFkLEVBQWlCLENBQWpCLENBRkssQ0FBUDtBQUlEOztBQTVFeUIsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiXG5pbXBvcnQgU2ltdWxhdGlvbiBmcm9tIFwiLi9zaW11bGF0aW9uXCI7XG5cbi8vIFRPRE86IGltcGxlbWVudCBzdGFibGUgb3JiaXRzIGV4YW1wbGVzOiBodHRwczovL21hdGguc3RhY2tleGNoYW5nZS5jb20vcXVlc3Rpb25zLzE2MTM3NjUvc2ltcGxlLXN0YWJsZS1uLWJvZHktb3JiaXRzLWluLXRoZS1wbGFuZS13aXRoLXNvbWUtZml4ZWQtYm9kaWVzLWFsbG93ZWRcblxubGV0IHNpbXVsYXRpb24gPSBudWxsO1xubGV0IHBhcmFtcyA9IHtcbiAgc3BlZWRDOiAwLjEsXG4gIGdyYXZpdHlDOiAwLjAwMDQsXG4gIHBsYW5ldHNDb3VudDogMTAsXG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XG5nZXRCeUlkKCdvcGVuLW1lbnUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5NZW51KTtcbmdldEJ5SWQoJ3N0YXJ0LXNpbXVsYXRpb24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0U2ltdWxhdGlvbik7XG5cbi8vIHBhcmFtcyBpbnB1dCBjaGFuZ2UgZXZlbnRzXG5nZXRCeUlkKCdncmF2aXR5LWNvbnN0JykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbklucHV0Q2hhbmdlKTtcbmdldEJ5SWQoJ3NwZWVkLWNvbnN0JykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvblNwZWVkQ2hhbmdlKTtcbmdldEJ5SWQoJ3BsYW5ldHMtY291bnQnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uSW5wdXRDaGFuZ2UpO1xuXG5mdW5jdGlvbiBvbkxvYWQgKCkge1xuICBvcGVuTWVudSgpO1xuICB1cGRhdGVWaWV3RWxlbWVudHMoKTtcbiAgc3RhcnRTaW11bGF0aW9uKCk7XG59XG5cbmZ1bmN0aW9uIG9uSW5wdXRDaGFuZ2UgKCkge1xuICBsZXQgcGxhbmV0c0NJbnB1dCA9IE51bWJlci5wYXJzZUZsb2F0KGdldEJ5SWQoJ3BsYW5ldHMtY291bnQnKS52YWx1ZSk7XG4gIGlmICghaXNOYU4ocGxhbmV0c0NJbnB1dCkpIHBhcmFtcy5wbGFuZXRzQ291bnQgPSBwbGFuZXRzQ0lucHV0O1xuXG4gIGxldCBncmF2aXR5Q0lucHV0ID0gTnVtYmVyLnBhcnNlRmxvYXQoZ2V0QnlJZCgnZ3Jhdml0eS1jb25zdCcpLnZhbHVlKTtcbiAgaWYgKCFpc05hTihncmF2aXR5Q0lucHV0KSkgcGFyYW1zLmdyYXZpdHlDID0gZ3Jhdml0eUNJbnB1dDtcblxuICBzdGFydFNpbXVsYXRpb24oKTtcbn1cblxuZnVuY3Rpb24gb25TcGVlZENoYW5nZSAoKSB7XG4gIGxldCBzcGVlZENJbnB1dCA9IE51bWJlci5wYXJzZUZsb2F0KGdldEJ5SWQoJ3NwZWVkLWNvbnN0JykudmFsdWUpO1xuICBpZiAoIWlzTmFOKHNwZWVkQ0lucHV0KSkgcGFyYW1zLnNwZWVkQyA9IHNwZWVkQ0lucHV0O1xuICBzaW11bGF0aW9uLnBhcmFtcy5zcGVlZEMgPSBwYXJhbXMuc3BlZWRDO1xufVxuXG5mdW5jdGlvbiBzdGFydFNpbXVsYXRpb24gKCkge1xuICBpZiAoc2ltdWxhdGlvbikge1xuICAgIHNpbXVsYXRpb24uZGVzdHJveSgpO1xuICAgIHNpbXVsYXRpb24gPSBuZXcgU2ltdWxhdGlvbihwYXJhbXMpO1xuICAgIHNpbXVsYXRpb24uc3RhcnQoKTtcbiAgfSBlbHNlIHtcbiAgICBzaW11bGF0aW9uID0gbmV3IFNpbXVsYXRpb24ocGFyYW1zKTtcbiAgICBzaW11bGF0aW9uLnN0YXJ0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlVmlld0VsZW1lbnRzICgpIHtcbiAgZ2V0QnlJZCgnZ3Jhdml0eS1jb25zdCcpLnZhbHVlID0gcGFyYW1zLmdyYXZpdHlDO1xuICBnZXRCeUlkKCdzcGVlZC1jb25zdCcpLnZhbHVlID0gcGFyYW1zLnNwZWVkQztcbiAgZ2V0QnlJZCgncGxhbmV0cy1jb3VudCcpLnZhbHVlID0gcGFyYW1zLnBsYW5ldHNDb3VudDtcbiAgZ2V0QnlJZCgnc2hvdy1wYXRoJykuY2hlY2tlZCA9IHBhcmFtcy5zaG93UGF0aDtcbn1cblxuZnVuY3Rpb24gb3Blbk1lbnUgKCkge1xuICAkKFwiI2ludHJvLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBmYWRlRHVyYXRpb246IDEwMFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0QnlJZCAoaWQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuL3ZlY3RvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGFuZXQge1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gW3BhcmFtc10ge09iamVjdH1cbiAgICogQHBhcmFtIFttYXNzID0gMV0ge051bWJlcn1cbiAgICogQHBhcmFtIFtwb3NpdGlvbl0ge1ZlY3Rvcn1cbiAgICogQHBhcmFtIFt2ZWxvY2l0eV0ge1ZlY3Rvcn1cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwYXJhbXMsIG1hc3MsIHBvc2l0aW9uLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMubWFzcyA9IG1hc3MgPyBtYXNzIDogMTtcbiAgICB0aGlzLnBvc2l0aW9uID0gVmVjdG9yLmlzKHBvc2l0aW9uKSA/IHBvc2l0aW9uIDogbmV3IFZlY3RvcigpO1xuICAgIHRoaXMudmVsb2NpdHkgPSBWZWN0b3IuaXModmVsb2NpdHkpID8gdmVsb2NpdHkgOiBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5hY2NlbGVyYXRpb24gPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5jID0gYHJnYmEoJHtNYXRoLnJhbmRvbSgpKjI1NX0sICR7TWF0aC5yYW5kb20oKSoyNTV9LCAke01hdGgucmFuZG9tKCkqMjU1fSwgeClgO1xuICAgIHRoaXMucGF0aCA9IFtdO1xuICAgIHRoaXMudGljayA9IDA7XG4gIH1cblxuICBjb2xvciAob3BhY2l0eSkge1xuICAgIHJldHVybiB0aGlzLmMucmVwbGFjZSgneCcsIG9wYWNpdHkpO1xuICB9XG5cbiAgZHJhdyAoY3R4LCBzaG93UGF0aCA9IHRydWUsIHNob3dWVmVjdG9ycywgc2hvd0FWZWN0b3JzKSB7XG5cbiAgICBpZiAoc2hvd1BhdGgpIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmdiYSgxLCAxLCAxLCAwKVwiO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3IoMC4zKTtcbiAgICAgIGZvciAobGV0IHBvc2l0aW9uIG9mIHRoaXMucGF0aCkge1xuICAgICAgICBjdHgubW92ZVRvKHBvc2l0aW9uLnggLCBwb3NpdGlvbi55KTtcbiAgICAgICAgY3R4LmFyYyhwb3NpdGlvbi54LCBwb3NpdGlvbi55LCAyLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICB9XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguZmlsbCgpO1xuICAgIH1cblxuICAgIGlmIChzaG93VlZlY3RvcnMpIHtcbiAgICAgIHRoaXMuX2RyYXdWZWN0b3IoY3R4LCBcIiNGRjAwMDBcIixcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICB0aGlzLnBvc2l0aW9uLnksXG4gICAgICAgIHRoaXMucG9zaXRpb24ueCArIHRoaXMudmVsb2NpdHkueCxcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy52ZWxvY2l0eS55XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoc2hvd0FWZWN0b3JzKSB7XG4gICAgICB0aGlzLl9kcmF3VmVjdG9yKGN0eCwgXCIjMDAxMmZmXCIsXG4gICAgICAgIHRoaXMucG9zaXRpb24ueCxcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55LFxuICAgICAgICB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLmFjY2VsZXJhdGlvbi54ICogMTUwLFxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmFjY2VsZXJhdGlvbi55ICogMTUwXG4gICAgICApO1xuICAgIH1cblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcigxKTtcbiAgICBjdHguYXJjKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLm1hc3MsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIHRoaXMudGljaysrO1xuICB9XG5cbiAgX2RyYXdWZWN0b3IgKGN0eCwgY29sb3IsIHgwLCB5MCwgeDEsIHkxKSB7XG4gICAgY29uc3QgcyA9IDM7XG4gICAgY29uc3QgdyA9IDAuNDtcbiAgICBsZXQgZHggPSB4MSAtIHgwO1xuICAgIGxldCBkeSA9IHkxIC0geTA7XG4gICAgbGV0IGEgPSBNYXRoLmF0YW4oZHkgLyBkeCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIGN0eC5saW5lV2lkdGggPSBzO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHgwLCB5MCk7XG4gICAgY3R4LmxpbmVUbyh4MSwgeTEpO1xuICAgIGN0eC5tb3ZlVG8oeDEsIHkxKTtcbiAgICBpZiAoZHggPCAwKSB7XG4gICAgICBjdHgubGluZVRvKHgxICsgTWF0aC5jb3MoYSAtIHcpICogcywgeTEgKyBNYXRoLnNpbihhIC0gdykgKiBzKTtcbiAgICAgIGN0eC5saW5lVG8oeDEgKyBNYXRoLmNvcyhhICsgdykgKiBzLCB5MSArIE1hdGguc2luKGEgKyB3KSAqIHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHgubGluZVRvKHgxIC0gTWF0aC5jb3MoYSAtIHcpICogcywgeTEgLSBNYXRoLnNpbihhIC0gdykgKiBzKTtcbiAgICAgIGN0eC5saW5lVG8oeDEgLSBNYXRoLmNvcyhhICsgdykgKiBzLCB5MSAtIE1hdGguc2luKGEgKyB3KSAqIHMpO1xuICAgIH1cbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cblxuICB1cGRhdGUgKHBsYW5ldHMsIHNwZWVkQykge1xuICAgIGZvciAobGV0IHBsYW5ldCBvZiBwbGFuZXRzKSB7XG4gICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IHRoaXMuZ2V0QWNjZWxlcmF0aW9uKHBsYW5ldCk7XG4gICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5hZGQodGhpcy5hY2NlbGVyYXRpb24pO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy52ZWxvY2l0eS5kb3Qoc3BlZWRDKSk7XG4gICAgaWYgKHRoaXMudGljayAlIDQgPT09IDApIHtcbiAgICAgIHRoaXMucGF0aC5wdXNoKHRoaXMucG9zaXRpb24pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXRoLmxlbmd0aCA+IDE1MCkge1xuICAgICAgdGhpcy5wYXRoLnNwbGljZSgwLCAxKVxuICAgIH1cbiAgfVxuXG4gIGdldEFjY2VsZXJhdGlvbiAocGxhbmV0KSB7XG4gICAgbGV0IGYgPSB0aGlzLmdldEZvcmNlKHBsYW5ldCk7XG4gICAgbGV0IGRpZmYgPSB0aGlzLnBvc2l0aW9uLmRpZmYocGxhbmV0LnBvc2l0aW9uKTtcbiAgICByZXR1cm4gZGlmZi5kb3QoIGYgLyB0aGlzLm1hc3MpO1xuICB9XG5cbiAgZ2V0Rm9yY2UgKHBsYW5ldCkge1xuICAgIGxldCBHID0gdGhpcy5wYXJhbXMuZ3Jhdml0eUMgPyB0aGlzLnBhcmFtcy5ncmF2aXR5QyA6IDE7XG4gICAgcmV0dXJuIEcgKiBwbGFuZXQubWFzcyAqIHRoaXMubWFzcyAvIE1hdGguc3FydCh0aGlzLnBvc2l0aW9uLmRpc3QocGxhbmV0LnBvc2l0aW9uKSk7XG4gIH1cblxufSIsImltcG9ydCBQbGFuZXQgZnJvbSBcIi4vcGxhbmV0XCI7XG5pbXBvcnQgVmVjdG9yIGZyb20gXCIuL3ZlY3RvclwiO1xuXG5cbmV4cG9ydCBjb25zdCBFRElUX01PREVTID0ge1xuICBNT1ZFOiAxLFxuICBDUkVBVEVfUExBTkVUUzogMlxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltdWxhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IgKHBhcmFtcykge1xuICAgIHRoaXMuYW5pbWF0aW9uID0gbnVsbDtcbiAgICB0aGlzLnBsYW5ldHMgPSBbXTtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgICB0aGlzLnNwYW5YID0gNTAwO1xuICAgIHRoaXMuc2hvd1ZlbG9jaXR5VmVjdG9ycyA9IHRydWU7XG4gICAgdGhpcy5zaG93QWNjVmVjdG9ycyA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd1BhdGggPSB0cnVlO1xuICAgIHRoaXMuZWRpdE1vZGUgPSBFRElUX01PREVTLk1PVkU7XG4gICAgdGhpcy5faW5pdFZpZXdFbGVtZW50cygpO1xuICAgIC8vIHRyYW5zbGF0aW9uIHN0YXRlXG4gICAgdGhpcy50cmFuc2xhdGUgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAvLyB6b29tIHN0YXRlXG4gICAgdGhpcy5pc1pvb21pbmdJbiA9IGZhbHNlO1xuICAgIHRoaXMuaXNab29taW5nT3V0ID0gZmFsc2U7XG4gICAgLy8gbW91c2Ugc3RhdGVcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xuICAgIHRoaXMubGFzdERyYXcgPSB7IFNUQVJUOiB7IHg6IDAsIHk6IDAgfSwgRU5EOiB7IHg6IDAsIHk6IDAgfSB9O1xuICAgIHRoaXMubGFzdE1vdXNlUG9zID0gbnVsbDtcbiAgICAvLyBjYW52YXMgaW5pdGlhbGl6YXRpb25cbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdza2V0Y2gnKTtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5fcmVzaXplQ2FudmFzKCk7XG4gICAgLy8gY2FudmFzIG1vdXNlIGV2ZW50c1xuICAgIGFkZExpc3RlbmVyKCdza2V0Y2gnLCAnbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRoaXMpO1xuICAgIGFkZExpc3RlbmVyKCdza2V0Y2gnLCAnbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcCwgdGhpcyk7XG4gICAgLy8gem9vbSBvdXQvaW4gYnV0dG9ucyBldmVudHNcbiAgICBhZGRMaXN0ZW5lcignem9vbS1pbicsICdtb3VzZWRvd24nLCB0aGlzLl9vblpvb21JbiwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ3pvb20taW4nLCAnbW91c2V1cCcsIHRoaXMuX29uWm9vbUluLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignem9vbS1vdXQnLCAnbW91c2Vkb3duJywgdGhpcy5fb25ab29tT3V0LCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignem9vbS1vdXQnLCAnbW91c2V1cCcsIHRoaXMuX29uWm9vbU91dCwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ2NyZWF0ZS1tb2RlJywgJ2NsaWNrJywgdGhpcy5fb25QbGFuZXRDcmVhdGUsIHRoaXMpO1xuICAgIGFkZExpc3RlbmVyKCdtb3ZlLW1vZGUnLCAnY2xpY2snLCB0aGlzLl9vbk1vdmVNb2RlLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignc2hvdy1wYXRoJywgJ2NsaWNrJywgdGhpcy5fb25TaG93UGF0aCwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ3Nob3ctdi12ZWN0b3JzJywgJ2NsaWNrJywgdGhpcy5fb25TaG93VlZlY3RvcnMsIHRoaXMpO1xuICAgIGFkZExpc3RlbmVyKCdzaG93LWEtdmVjdG9ycycsICdjbGljaycsIHRoaXMuX29uU2hvd0FWZWN0b3JzLCB0aGlzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3Jlc2l6ZUNhbnZhcy5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIF9vblpvb21JbiAoKSB7XG4gICAgdGhpcy5pc1pvb21pbmdJbiA9ICF0aGlzLmlzWm9vbWluZ0luO1xuICB9XG5cbiAgX29uWm9vbU91dCAoKSB7XG4gICAgdGhpcy5pc1pvb21pbmdPdXQgPSAhdGhpcy5pc1pvb21pbmdPdXQ7XG4gIH1cblxuICBfb25TaG93UGF0aCAoZSkge1xuICAgIGludmVydFNlbGVjdCgnc2hvdy1wYXRoJyk7XG4gICAgdGhpcy5zaG93UGF0aCA9ICF0aGlzLnNob3dQYXRoO1xuICB9XG5cbiAgX29uU2hvd1ZWZWN0b3JzICgpIHtcbiAgICBpbnZlcnRTZWxlY3QoJ3Nob3ctdi12ZWN0b3JzJyk7XG4gICAgdGhpcy5zaG93VmVsb2NpdHlWZWN0b3JzID0gIXRoaXMuc2hvd1ZlbG9jaXR5VmVjdG9ycztcbiAgfVxuXG4gIF9vblNob3dBVmVjdG9ycyAoKSB7XG4gICAgaW52ZXJ0U2VsZWN0KCdzaG93LWEtdmVjdG9ycycpO1xuICAgIHRoaXMuc2hvd0FjY1ZlY3RvcnMgPSAhdGhpcy5zaG93QWNjVmVjdG9ycztcbiAgfVxuXG4gIF9vblBsYW5ldENyZWF0ZSAoKSB7XG4gICAgc2VsZWN0KCdjcmVhdGUtbW9kZScpO1xuICAgIHVuc2VsZWN0KCdtb3ZlLW1vZGUnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuY3Vyc29yID0gJ2Nyb3NzaGFpcic7XG4gICAgdGhpcy5lZGl0TW9kZSA9IEVESVRfTU9ERVMuQ1JFQVRFX1BMQU5FVFM7XG4gIH1cblxuICBfb25Nb3ZlTW9kZSAoKSB7XG4gICAgdW5zZWxlY3QoJ2NyZWF0ZS1tb2RlJyk7XG4gICAgc2VsZWN0KCdtb3ZlLW1vZGUnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuY3Vyc29yID0gJ2dyYWInO1xuICAgIHRoaXMuZWRpdE1vZGUgPSBFRElUX01PREVTLk1PVkU7XG4gIH1cblxuICBfb25Nb3VzZU1vdmUgKGUpIHtcbiAgICAvLyBza2lwIGlmIG1vdXNlIG5vdCBwcmVzc2VkXG4gICAgaWYgKCF0aGlzLm1vdXNlRG93bikgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuZWRpdE1vZGUgPT09IEVESVRfTU9ERVMuQ1JFQVRFX1BMQU5FVFMpIHtcbiAgICAgIHRoaXMubGFzdERyYXcuRU5EID0geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9O1xuICAgIH1cbiAgICAvLyBpZiBtb3VzZSBwb3NpdGlvbiB1bnNldFxuICAgIGlmICghdGhpcy5sYXN0TW91c2VQb3MpIHtcbiAgICAgIHRoaXMubGFzdE1vdXNlUG9zID0geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9XG4gICAgfVxuICAgIC8vIGNhbGN1bGF0ZSBtb3VzZSBwb3NpdGlvbiBkaWZmXG4gICAgaWYgKHRoaXMuZWRpdE1vZGUgPT09IEVESVRfTU9ERVMuTU9WRSkge1xuICAgICAgaWYgKCF0aGlzLmxhc3RNb3VzZVBvcykge1xuICAgICAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfVxuICAgICAgfVxuICAgICAgdGhpcy50cmFuc2xhdGUueCArPSAoZS5jbGllbnRYIC0gdGhpcy5sYXN0TW91c2VQb3MueCkgKiAyIC8gdGhpcy5fZ2V0U2NhbGVYKCk7XG4gICAgICB0aGlzLnRyYW5zbGF0ZS55ICs9IChlLmNsaWVudFkgLSB0aGlzLmxhc3RNb3VzZVBvcy55KSAqIDIgLyB0aGlzLl9nZXRTY2FsZVkoKTtcbiAgICAgIHRoaXMubGFzdE1vdXNlUG9zID0geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9O1xuICAgIH1cbiAgfVxuXG4gIF9vbk1vdXNlRG93biAoZSkge1xuICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5lZGl0TW9kZSA9PT0gRURJVF9NT0RFUy5DUkVBVEVfUExBTkVUUykge1xuICAgICAgbGV0IG1vdXNlUG9zID0geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9O1xuICAgICAgdGhpcy5sYXN0RHJhdy5TVEFSVCA9IG1vdXNlUG9zO1xuICAgICAgdGhpcy5sYXN0RHJhdy5FTkQgPSBtb3VzZVBvcztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWRpdE1vZGUgPT09IEVESVRfTU9ERVMuTU9WRSkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmN1cnNvciA9ICdncmFiYmluZyc7XG4gICAgfVxuICB9XG5cbiAgX29uTW91c2VVcCAoZSkge1xuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuZWRpdE1vZGUgPT09IEVESVRfTU9ERVMuQ1JFQVRFX1BMQU5FVFMpIHtcbiAgICAgIHRoaXMucGxhbmV0cy5wdXNoKG5ldyBQbGFuZXQoXG4gICAgICAgIHRoaXMucGFyYW1zLFxuICAgICAgICBNYXRoLnJhbmRvbSgpICogMTAgKyA1LFxuICAgICAgICBuZXcgVmVjdG9yKFxuICAgICAgICAgICgodGhpcy5sYXN0RHJhdy5TVEFSVC54IC0gKHRoaXMuY2FudmFzLndpZHRoIC8gMikpIC8gdGhpcy5fZ2V0U2NhbGVYKCkpICsgKC10aGlzLnRyYW5zbGF0ZS54KSxcbiAgICAgICAgICAoKHRoaXMubGFzdERyYXcuU1RBUlQueSAtICh0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKSkgLyB0aGlzLl9nZXRTY2FsZVkoKSkgKyAoLXRoaXMudHJhbnNsYXRlLnkpXG4gICAgICAgICksXG4gICAgICAgIG5ldyBWZWN0b3IoXG4gICAgICAgICAgLy8gc2NhbGUgZG93biB2ZWN0b3IgZm9yIGJldHRlciBtb3VzZSBkcmF3aW5nIHByZWNpc2lvblxuICAgICAgICAgICh0aGlzLmxhc3REcmF3LkVORC54IC0gdGhpcy5sYXN0RHJhdy5TVEFSVC54KSxcbiAgICAgICAgICAodGhpcy5sYXN0RHJhdy5FTkQueSAtIHRoaXMubGFzdERyYXcuU1RBUlQueSlcbiAgICAgICAgKSxcbiAgICAgICkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5lZGl0TW9kZSA9PT0gRURJVF9NT0RFUy5NT1ZFKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuY3Vyc29yID0gJ2dyYWInO1xuICAgIH1cbiAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IG51bGw7XG4gICAgdGhpcy5sYXN0RHJhdyA9IHsgU1RBUlQ6IHsgeDogMCwgeTogMCB9LCBFTkQ6IHsgeDogMCwgeTogMCB9IH1cbiAgfVxuXG4gIF9pbml0Vmlld0VsZW1lbnRzICgpIHtcbiAgICBsZXQgY3JlYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1tb2RlJyk7XG4gICAgbGV0IG1vdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW92ZS1tb2RlJyk7XG4gICAgbGV0IHNob3dQYXRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctcGF0aCcpO1xuICAgIGxldCBzaG93VlZlY3RvcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy12LXZlY3RvcnMnKTtcblxuICAgIGlmICghc2hvd1ZWZWN0b3JzLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuICAgICAgc2hvd1ZWZWN0b3JzLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgfVxuICAgIGlmICghc2hvd1BhdGguY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgICBzaG93UGF0aC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIH1cbiAgICBpZiAoY3JlYXRlLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuICAgICAgY3JlYXRlLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgfVxuICAgIGlmICghbW92ZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcbiAgICAgIG1vdmUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIH1cblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5jdXJzb3IgPSAnZ3JhYic7XG4gIH1cblxuICBfcmVzaXplQ2FudmFzICgpIHtcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgfVxuXG4gIF9nZXRTY2FsZVggKCkge1xuICAgIHJldHVybiAodGhpcy5jYW52YXMud2lkdGggLyB0aGlzLnNwYW5YKSAqIHRoaXMuc2NhbGU7XG4gIH1cblxuICBfZ2V0U2NhbGVZICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0U2NhbGVYKCk7XG4gIH1cblxuICBfY2FsY3VsYXRlTWFzc0NlbnRlciAoKSB7XG4gICAgbGV0IGF2ZyA9IHsgeDogMCwgeTogMCB9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdmcueCArPSB0aGlzLnBsYW5ldHNbaV0ucG9zaXRpb24ueDtcbiAgICAgIGF2Zy55ICs9IHRoaXMucGxhbmV0c1tpXS5wb3NpdGlvbi55O1xuICAgIH1cbiAgICBhdmcueCA9IGF2Zy54IC8gdGhpcy5wbGFuZXRzLmxlbmd0aDtcbiAgICBhdmcueSA9IGF2Zy55IC8gdGhpcy5wbGFuZXRzLmxlbmd0aDtcbiAgICByZXR1cm4gYXZnO1xuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb24pO1xuICB9XG5cbiAgc3RhcnQgKCkge1xuICAgIC8vIHJhbmRvbWx5IGluaXRpYWxpemUgcGxhbmV0cyBiYXNlZCBvbiBwbGFuZXQgY291bnQgcGFyYW1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFyYW1zLnBsYW5ldHNDb3VudDsgaSsrKSB7XG4gICAgICB0aGlzLnBsYW5ldHMucHVzaChuZXcgUGxhbmV0KFxuICAgICAgICB0aGlzLnBhcmFtcyxcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqIDEwICsgMyxcbiAgICAgICAgbmV3IFZlY3RvcihcbiAgICAgICAgICAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiB0aGlzLnNwYW5YIC8gMyxcbiAgICAgICAgICAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiB0aGlzLnNwYW5YIC8gM1xuICAgICAgICApXG4gICAgICApKVxuICAgIH1cbiAgICB0aGlzLmFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9zaW11bGF0ZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIF9zaW11bGF0ZSAoKSB7XG4gICAgdGhpcy5jdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLmN0eC5zYXZlKCk7XG5cbiAgICB0aGlzLmN0eC50cmFuc2xhdGUodGhpcy5jYW52YXMud2lkdGggLyAyLCB0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKTtcbiAgICB0aGlzLmN0eC5zY2FsZSh0aGlzLl9nZXRTY2FsZVgoKSwgdGhpcy5fZ2V0U2NhbGVZKCkpO1xuICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh0aGlzLnRyYW5zbGF0ZS54LCB0aGlzLnRyYW5zbGF0ZS55KTtcblxuICAgIGNvbnN0IG1hc3NDZW50ZXIgPSB0aGlzLl9jYWxjdWxhdGVNYXNzQ2VudGVyKCk7XG4gICAgdGhpcy5jdHgudHJhbnNsYXRlKC1tYXNzQ2VudGVyLngsIC1tYXNzQ2VudGVyLnkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBvdGhlciA9IFsuLi50aGlzLnBsYW5ldHMuc2xpY2UoMCwgaSAtIDEpLCAuLi50aGlzLnBsYW5ldHMuc2xpY2UoaSwgdGhpcy5wbGFuZXRzLmxlbmd0aCldO1xuICAgICAgdGhpcy5wbGFuZXRzW2ldLnVwZGF0ZShvdGhlciwgdGhpcy5wYXJhbXMuc3BlZWRDKTtcbiAgICAgIHRoaXMucGxhbmV0c1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLnNob3dQYXRoLCB0aGlzLnNob3dWZWxvY2l0eVZlY3RvcnMsIHRoaXMuc2hvd0FjY1ZlY3RvcnMpO1xuICAgIH1cbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG5cbiAgICB0aGlzLl9kcmF3VmVsb2NpdHlWZWN0b3IoXG4gICAgICB0aGlzLmxhc3REcmF3LlNUQVJULngsXG4gICAgICB0aGlzLmxhc3REcmF3LlNUQVJULnksXG4gICAgICB0aGlzLmxhc3REcmF3LkVORC54LFxuICAgICAgdGhpcy5sYXN0RHJhdy5FTkQueVxuICAgICk7XG5cbiAgICBpZiAodGhpcy5pc1pvb21pbmdJbikgdGhpcy5zY2FsZSArPSAwLjAwNTtcbiAgICBpZiAodGhpcy5pc1pvb21pbmdPdXQgJiYgdGhpcy5zY2FsZSA+IDApIHRoaXMuc2NhbGUgLT0gMC4wMDU7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fc2ltdWxhdGUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBfZHJhd1ZlbG9jaXR5VmVjdG9yICh4MCwgeTAsIHgxLCB5MSkge1xuICAgIGNvbnN0IHMgPSA3O1xuICAgIGNvbnN0IHcgPSAwLjc7XG4gICAgbGV0IGR4ID0geDEgLSB4MDtcbiAgICBsZXQgZHkgPSB5MSAtIHkwO1xuICAgIGxldCBhID0gTWF0aC5hdGFuKGR5IC8gZHgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHM7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHgubW92ZVRvKHgwLCB5MCk7XG4gICAgdGhpcy5jdHgubGluZVRvKHgxLCB5MSk7XG4gICAgdGhpcy5jdHgubW92ZVRvKHgxLCB5MSk7XG4gICAgaWYgKGR4IDwgMCkge1xuICAgICAgdGhpcy5jdHgubGluZVRvKHgxICsgTWF0aC5jb3MoYSAtIHcpICogcywgeTEgKyBNYXRoLnNpbihhIC0gdykgKiBzKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh4MSArIE1hdGguY29zKGEgKyB3KSAqIHMsIHkxICsgTWF0aC5zaW4oYSArIHcpICogcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh4MSAtIE1hdGguY29zKGEgLSB3KSAqIHMsIHkxIC0gTWF0aC5zaW4oYSAtIHcpICogcyk7XG4gICAgICB0aGlzLmN0eC5saW5lVG8oeDEgLSBNYXRoLmNvcyhhICsgdykgKiBzLCB5MSAtIE1hdGguc2luKGEgKyB3KSAqIHMpO1xuICAgIH1cbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBpbnZlcnRTZWxlY3QgKGlkKSB7XG4gIGxldCBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmIChlbGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgZWxlLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gIH0gZWxzZSB7XG4gICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5zZWxlY3QgKGlkKSB7XG4gIGxldCBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmIChlbGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgZWxlLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2VsZWN0IChpZCkge1xuICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBpZiAoIWVsZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcbiAgICBlbGUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRMaXN0ZW5lciAoaWQsIGV2ZW50LCBmdW5jLCBiaW5kKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jLmJpbmQoYmluZCkpO1xufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBbeCA9IDBdIHtOdW1iZXJ9XG4gICAqIEBwYXJhbSBbeSA9IDBdIHtOdW1iZXJ9XG4gICAqL1xuICBjb25zdHJ1Y3RvciAoeCwgeSkge1xuICAgIHRoaXMueCA9IHggPyB4IDogMDtcbiAgICB0aGlzLnkgPSB5ID8geSA6IDA7XG4gIH1cblxuICBnZXQgbWFnbml0dWRlICgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgTWF0aC5wb3codGhpcy54LCAyKSArXG4gICAgICBNYXRoLnBvdyh0aGlzLnksIDIpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBvYmplY3RcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXMgKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiBWZWN0b3I7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge051bWJlcn1cbiAgICogQHJldHVybnMge1ZlY3Rvcn1cbiAgICovXG4gIGRvdCAoYSkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgdGhpcy54ICogYSxcbiAgICAgIHRoaXMueSAqIGFcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge1ZlY3RvcnxOdW1iZXJ9XG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XG4gICAqL1xuICBhZGQgKGEpIHtcbiAgICBpZiAoVmVjdG9yLmlzKGEpKSB7XG4gICAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgdGhpcy54ICsgYS54LFxuICAgICAgICB0aGlzLnkgKyBhLnlcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgIHRoaXMueCArIGEsXG4gICAgICAgIHRoaXMueSArIGFcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge1ZlY3Rvcn1cbiAgICogQHJldHVybnMge1ZlY3Rvcn1cbiAgICovXG4gIGRpZmYgKGEpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgIGEueCAtIHRoaXMueCxcbiAgICAgIGEueSAtIHRoaXMueVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge1ZlY3Rvcn1cbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGRpc3QgKGEpIHtcbiAgICBsZXQgZGlmZiA9IHRoaXMuZGlmZihhKTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgTWF0aC5wb3coZGlmZi54LCAyKSArXG4gICAgICBNYXRoLnBvdyhkaWZmLnksIDIpXG4gICAgKVxuICB9XG5cbn0iXSwic291cmNlUm9vdCI6IiJ9