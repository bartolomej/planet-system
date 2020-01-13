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
    this.massCenter = null;
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
    // calculate mass center
    const massCenter = this._calculateMassCenter();

    if (this.massCenter) {
      const massCenterDx = this.massCenter.x - massCenter.x;
      const massCenterDy = this.massCenter.y - massCenter.y;
      this.translate.x += massCenterDx;
      this.translate.y += massCenterDy;
    }

    this.massCenter = massCenter;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.scale(this._getScaleX(), this._getScaleY());
    this.ctx.translate(this.translate.x, this.translate.y);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wbGFuZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3IuanMiXSwibmFtZXMiOlsic2ltdWxhdGlvbiIsInBhcmFtcyIsInNwZWVkQyIsImdyYXZpdHlDIiwicGxhbmV0c0NvdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uTG9hZCIsImdldEJ5SWQiLCJvcGVuTWVudSIsInN0YXJ0U2ltdWxhdGlvbiIsIm9uSW5wdXRDaGFuZ2UiLCJvblNwZWVkQ2hhbmdlIiwidXBkYXRlVmlld0VsZW1lbnRzIiwicGxhbmV0c0NJbnB1dCIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJ2YWx1ZSIsImlzTmFOIiwiZ3Jhdml0eUNJbnB1dCIsInNwZWVkQ0lucHV0IiwiZGVzdHJveSIsIlNpbXVsYXRpb24iLCJzdGFydCIsImNoZWNrZWQiLCJzaG93UGF0aCIsIiQiLCJtb2RhbCIsImZhZGVEdXJhdGlvbiIsImlkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIlBsYW5ldCIsImNvbnN0cnVjdG9yIiwibWFzcyIsInBvc2l0aW9uIiwidmVsb2NpdHkiLCJWZWN0b3IiLCJpcyIsImFjY2VsZXJhdGlvbiIsImMiLCJNYXRoIiwicmFuZG9tIiwicGF0aCIsInRpY2siLCJjb2xvciIsIm9wYWNpdHkiLCJyZXBsYWNlIiwiZHJhdyIsImN0eCIsInNob3dWVmVjdG9ycyIsInNob3dBVmVjdG9ycyIsImJlZ2luUGF0aCIsInN0cm9rZVN0eWxlIiwiZmlsbFN0eWxlIiwibW92ZVRvIiwieCIsInkiLCJhcmMiLCJQSSIsImNsb3NlUGF0aCIsImZpbGwiLCJfZHJhd1ZlY3RvciIsIngwIiwieTAiLCJ4MSIsInkxIiwicyIsInciLCJkeCIsImR5IiwiYSIsImF0YW4iLCJsaW5lV2lkdGgiLCJsaW5lVG8iLCJjb3MiLCJzaW4iLCJzdHJva2UiLCJ1cGRhdGUiLCJwbGFuZXRzIiwicGxhbmV0IiwiZ2V0QWNjZWxlcmF0aW9uIiwiYWRkIiwiZG90IiwicHVzaCIsImxlbmd0aCIsInNwbGljZSIsImYiLCJnZXRGb3JjZSIsImRpZmYiLCJHIiwic3FydCIsImRpc3QiLCJFRElUX01PREVTIiwiTU9WRSIsIkNSRUFURV9QTEFORVRTIiwiYW5pbWF0aW9uIiwic2NhbGUiLCJzcGFuWCIsIm1hc3NDZW50ZXIiLCJzaG93VmVsb2NpdHlWZWN0b3JzIiwic2hvd0FjY1ZlY3RvcnMiLCJlZGl0TW9kZSIsIl9pbml0Vmlld0VsZW1lbnRzIiwidHJhbnNsYXRlIiwiaXNab29taW5nSW4iLCJpc1pvb21pbmdPdXQiLCJtb3VzZURvd24iLCJsYXN0RHJhdyIsIlNUQVJUIiwiRU5EIiwibGFzdE1vdXNlUG9zIiwiY2FudmFzIiwiZ2V0Q29udGV4dCIsIl9yZXNpemVDYW52YXMiLCJhZGRMaXN0ZW5lciIsIl9vbk1vdXNlRG93biIsIl9vbk1vdXNlVXAiLCJfb25ab29tSW4iLCJfb25ab29tT3V0IiwiX29uUGxhbmV0Q3JlYXRlIiwiX29uTW92ZU1vZGUiLCJfb25TaG93UGF0aCIsIl9vblNob3dWVmVjdG9ycyIsIl9vblNob3dBVmVjdG9ycyIsIl9vbk1vdXNlTW92ZSIsImJpbmQiLCJlIiwiaW52ZXJ0U2VsZWN0Iiwic2VsZWN0IiwidW5zZWxlY3QiLCJzdHlsZSIsImN1cnNvciIsImNsaWVudFgiLCJjbGllbnRZIiwiX2dldFNjYWxlWCIsIl9nZXRTY2FsZVkiLCJtb3VzZVBvcyIsIndpZHRoIiwiaGVpZ2h0IiwiY3JlYXRlIiwibW92ZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicmVtb3ZlIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiX2NhbGN1bGF0ZU1hc3NDZW50ZXIiLCJhdmciLCJpIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJfc2ltdWxhdGUiLCJtYXNzQ2VudGVyRHgiLCJtYXNzQ2VudGVyRHkiLCJzZXRUcmFuc2Zvcm0iLCJjbGVhclJlY3QiLCJzYXZlIiwib3RoZXIiLCJzbGljZSIsInJlc3RvcmUiLCJfZHJhd1ZlbG9jaXR5VmVjdG9yIiwiZWxlIiwiZXZlbnQiLCJmdW5jIiwibWFnbml0dWRlIiwicG93Iiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Q0FHQTs7QUFFQSxJQUFJQSxVQUFVLEdBQUcsSUFBakI7QUFDQSxJQUFJQyxNQUFNLEdBQUc7QUFDWEMsUUFBTSxFQUFFLEdBREc7QUFFWEMsVUFBUSxFQUFFLE1BRkM7QUFHWEMsY0FBWSxFQUFFO0FBSEgsQ0FBYjtBQU1BQyxNQUFNLENBQUNDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDQyxN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LEdBQUwsQ0FBUzdFLElBQUksQ0FBQ2hDLENBQWQsRUFBaUIsQ0FBakIsQ0FGSyxDQUFQO0FBSUQ7O0FBNUV5QixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCJcbmltcG9ydCBTaW11bGF0aW9uIGZyb20gXCIuL3NpbXVsYXRpb25cIjtcblxuLy8gVE9ETzogaW1wbGVtZW50IHN0YWJsZSBvcmJpdHMgZXhhbXBsZXM6IGh0dHBzOi8vbWF0aC5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvMTYxMzc2NS9zaW1wbGUtc3RhYmxlLW4tYm9keS1vcmJpdHMtaW4tdGhlLXBsYW5lLXdpdGgtc29tZS1maXhlZC1ib2RpZXMtYWxsb3dlZFxuXG5sZXQgc2ltdWxhdGlvbiA9IG51bGw7XG5sZXQgcGFyYW1zID0ge1xuICBzcGVlZEM6IDAuMSxcbiAgZ3Jhdml0eUM6IDAuMDAwNCxcbiAgcGxhbmV0c0NvdW50OiAxMCxcbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcbmdldEJ5SWQoJ29wZW4tbWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk1lbnUpO1xuZ2V0QnlJZCgnc3RhcnQtc2ltdWxhdGlvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRTaW11bGF0aW9uKTtcblxuLy8gcGFyYW1zIGlucHV0IGNoYW5nZSBldmVudHNcbmdldEJ5SWQoJ2dyYXZpdHktY29uc3QnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uSW5wdXRDaGFuZ2UpO1xuZ2V0QnlJZCgnc3BlZWQtY29uc3QnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uU3BlZWRDaGFuZ2UpO1xuZ2V0QnlJZCgncGxhbmV0cy1jb3VudCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25JbnB1dENoYW5nZSk7XG5cbmZ1bmN0aW9uIG9uTG9hZCAoKSB7XG4gIG9wZW5NZW51KCk7XG4gIHVwZGF0ZVZpZXdFbGVtZW50cygpO1xuICBzdGFydFNpbXVsYXRpb24oKTtcbn1cblxuZnVuY3Rpb24gb25JbnB1dENoYW5nZSAoKSB7XG4gIGxldCBwbGFuZXRzQ0lucHV0ID0gTnVtYmVyLnBhcnNlRmxvYXQoZ2V0QnlJZCgncGxhbmV0cy1jb3VudCcpLnZhbHVlKTtcbiAgaWYgKCFpc05hTihwbGFuZXRzQ0lucHV0KSkgcGFyYW1zLnBsYW5ldHNDb3VudCA9IHBsYW5ldHNDSW5wdXQ7XG5cbiAgbGV0IGdyYXZpdHlDSW5wdXQgPSBOdW1iZXIucGFyc2VGbG9hdChnZXRCeUlkKCdncmF2aXR5LWNvbnN0JykudmFsdWUpO1xuICBpZiAoIWlzTmFOKGdyYXZpdHlDSW5wdXQpKSBwYXJhbXMuZ3Jhdml0eUMgPSBncmF2aXR5Q0lucHV0O1xuXG4gIHN0YXJ0U2ltdWxhdGlvbigpO1xufVxuXG5mdW5jdGlvbiBvblNwZWVkQ2hhbmdlICgpIHtcbiAgbGV0IHNwZWVkQ0lucHV0ID0gTnVtYmVyLnBhcnNlRmxvYXQoZ2V0QnlJZCgnc3BlZWQtY29uc3QnKS52YWx1ZSk7XG4gIGlmICghaXNOYU4oc3BlZWRDSW5wdXQpKSBwYXJhbXMuc3BlZWRDID0gc3BlZWRDSW5wdXQ7XG4gIHNpbXVsYXRpb24ucGFyYW1zLnNwZWVkQyA9IHBhcmFtcy5zcGVlZEM7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0U2ltdWxhdGlvbiAoKSB7XG4gIGlmIChzaW11bGF0aW9uKSB7XG4gICAgc2ltdWxhdGlvbi5kZXN0cm95KCk7XG4gICAgc2ltdWxhdGlvbiA9IG5ldyBTaW11bGF0aW9uKHBhcmFtcyk7XG4gICAgc2ltdWxhdGlvbi5zdGFydCgpO1xuICB9IGVsc2Uge1xuICAgIHNpbXVsYXRpb24gPSBuZXcgU2ltdWxhdGlvbihwYXJhbXMpO1xuICAgIHNpbXVsYXRpb24uc3RhcnQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVWaWV3RWxlbWVudHMgKCkge1xuICBnZXRCeUlkKCdncmF2aXR5LWNvbnN0JykudmFsdWUgPSBwYXJhbXMuZ3Jhdml0eUM7XG4gIGdldEJ5SWQoJ3NwZWVkLWNvbnN0JykudmFsdWUgPSBwYXJhbXMuc3BlZWRDO1xuICBnZXRCeUlkKCdwbGFuZXRzLWNvdW50JykudmFsdWUgPSBwYXJhbXMucGxhbmV0c0NvdW50O1xuICBnZXRCeUlkKCdzaG93LXBhdGgnKS5jaGVja2VkID0gcGFyYW1zLnNob3dQYXRoO1xufVxuXG5mdW5jdGlvbiBvcGVuTWVudSAoKSB7XG4gICQoXCIjaW50cm8tbW9kYWxcIikubW9kYWwoe1xuICAgIGZhZGVEdXJhdGlvbjogMTAwXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRCeUlkIChpZCkge1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xufSIsImltcG9ydCBWZWN0b3IgZnJvbSBcIi4vdmVjdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYW5ldCB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBbcGFyYW1zXSB7T2JqZWN0fVxuICAgKiBAcGFyYW0gW21hc3MgPSAxXSB7TnVtYmVyfVxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXSB7VmVjdG9yfVxuICAgKiBAcGFyYW0gW3ZlbG9jaXR5XSB7VmVjdG9yfVxuICAgKi9cbiAgY29uc3RydWN0b3IgKHBhcmFtcywgbWFzcywgcG9zaXRpb24sIHZlbG9jaXR5KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgdGhpcy5tYXNzID0gbWFzcyA/IG1hc3MgOiAxO1xuICAgIHRoaXMucG9zaXRpb24gPSBWZWN0b3IuaXMocG9zaXRpb24pID8gcG9zaXRpb24gOiBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy52ZWxvY2l0eSA9IFZlY3Rvci5pcyh2ZWxvY2l0eSkgPyB2ZWxvY2l0eSA6IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmMgPSBgcmdiYSgke01hdGgucmFuZG9tKCkqMjU1fSwgJHtNYXRoLnJhbmRvbSgpKjI1NX0sICR7TWF0aC5yYW5kb20oKSoyNTV9LCB4KWA7XG4gICAgdGhpcy5wYXRoID0gW107XG4gICAgdGhpcy50aWNrID0gMDtcbiAgfVxuXG4gIGNvbG9yIChvcGFjaXR5KSB7XG4gICAgcmV0dXJuIHRoaXMuYy5yZXBsYWNlKCd4Jywgb3BhY2l0eSk7XG4gIH1cblxuICBkcmF3IChjdHgsIHNob3dQYXRoID0gdHJ1ZSwgc2hvd1ZWZWN0b3JzLCBzaG93QVZlY3RvcnMpIHtcblxuICAgIGlmIChzaG93UGF0aCkge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJyZ2JhKDEsIDEsIDEsIDApXCI7XG4gICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcigwLjMpO1xuICAgICAgZm9yIChsZXQgcG9zaXRpb24gb2YgdGhpcy5wYXRoKSB7XG4gICAgICAgIGN0eC5tb3ZlVG8ocG9zaXRpb24ueCAsIHBvc2l0aW9uLnkpO1xuICAgICAgICBjdHguYXJjKHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIDIsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgIH1cbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuXG4gICAgaWYgKHNob3dWVmVjdG9ycykge1xuICAgICAgdGhpcy5fZHJhd1ZlY3RvcihjdHgsIFwiI0ZGMDAwMFwiLFxuICAgICAgICB0aGlzLnBvc2l0aW9uLngsXG4gICAgICAgIHRoaXMucG9zaXRpb24ueSxcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ICsgdGhpcy52ZWxvY2l0eS54LFxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnZlbG9jaXR5LnlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChzaG93QVZlY3RvcnMpIHtcbiAgICAgIHRoaXMuX2RyYXdWZWN0b3IoY3R4LCBcIiMwMDEyZmZcIixcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICB0aGlzLnBvc2l0aW9uLnksXG4gICAgICAgIHRoaXMucG9zaXRpb24ueCArIHRoaXMuYWNjZWxlcmF0aW9uLnggKiAxNTAsXG4gICAgICAgIHRoaXMucG9zaXRpb24ueSArIHRoaXMuYWNjZWxlcmF0aW9uLnkgKiAxNTBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yKDEpO1xuICAgIGN0eC5hcmModGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMubWFzcywgMCwgMiAqIE1hdGguUEkpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgdGhpcy50aWNrKys7XG4gIH1cblxuICBfZHJhd1ZlY3RvciAoY3R4LCBjb2xvciwgeDAsIHkwLCB4MSwgeTEpIHtcbiAgICBjb25zdCBzID0gMztcbiAgICBjb25zdCB3ID0gMC40O1xuICAgIGxldCBkeCA9IHgxIC0geDA7XG4gICAgbGV0IGR5ID0geTEgLSB5MDtcbiAgICBsZXQgYSA9IE1hdGguYXRhbihkeSAvIGR4KTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgY3R4LmxpbmVXaWR0aCA9IHM7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oeDAsIHkwKTtcbiAgICBjdHgubGluZVRvKHgxLCB5MSk7XG4gICAgY3R4Lm1vdmVUbyh4MSwgeTEpO1xuICAgIGlmIChkeCA8IDApIHtcbiAgICAgIGN0eC5saW5lVG8oeDEgKyBNYXRoLmNvcyhhIC0gdykgKiBzLCB5MSArIE1hdGguc2luKGEgLSB3KSAqIHMpO1xuICAgICAgY3R4LmxpbmVUbyh4MSArIE1hdGguY29zKGEgKyB3KSAqIHMsIHkxICsgTWF0aC5zaW4oYSArIHcpICogcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5saW5lVG8oeDEgLSBNYXRoLmNvcyhhIC0gdykgKiBzLCB5MSAtIE1hdGguc2luKGEgLSB3KSAqIHMpO1xuICAgICAgY3R4LmxpbmVUbyh4MSAtIE1hdGguY29zKGEgKyB3KSAqIHMsIHkxIC0gTWF0aC5zaW4oYSArIHcpICogcyk7XG4gICAgfVxuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIHVwZGF0ZSAocGxhbmV0cywgc3BlZWRDKSB7XG4gICAgZm9yIChsZXQgcGxhbmV0IG9mIHBsYW5ldHMpIHtcbiAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gdGhpcy5nZXRBY2NlbGVyYXRpb24ocGxhbmV0KTtcbiAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5LmFkZCh0aGlzLmFjY2VsZXJhdGlvbik7XG4gICAgfVxuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnZlbG9jaXR5LmRvdChzcGVlZEMpKTtcbiAgICBpZiAodGhpcy50aWNrICUgNCA9PT0gMCkge1xuICAgICAgdGhpcy5wYXRoLnB1c2godGhpcy5wb3NpdGlvbik7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhdGgubGVuZ3RoID4gMTUwKSB7XG4gICAgICB0aGlzLnBhdGguc3BsaWNlKDAsIDEpXG4gICAgfVxuICB9XG5cbiAgZ2V0QWNjZWxlcmF0aW9uIChwbGFuZXQpIHtcbiAgICBsZXQgZiA9IHRoaXMuZ2V0Rm9yY2UocGxhbmV0KTtcbiAgICBsZXQgZGlmZiA9IHRoaXMucG9zaXRpb24uZGlmZihwbGFuZXQucG9zaXRpb24pO1xuICAgIHJldHVybiBkaWZmLmRvdCggZiAvIHRoaXMubWFzcyk7XG4gIH1cblxuICBnZXRGb3JjZSAocGxhbmV0KSB7XG4gICAgbGV0IEcgPSB0aGlzLnBhcmFtcy5ncmF2aXR5QyA/IHRoaXMucGFyYW1zLmdyYXZpdHlDIDogMTtcbiAgICByZXR1cm4gRyAqIHBsYW5ldC5tYXNzICogdGhpcy5tYXNzIC8gTWF0aC5zcXJ0KHRoaXMucG9zaXRpb24uZGlzdChwbGFuZXQucG9zaXRpb24pKTtcbiAgfVxuXG59IiwiaW1wb3J0IFBsYW5ldCBmcm9tIFwiLi9wbGFuZXRcIjtcbmltcG9ydCBWZWN0b3IgZnJvbSBcIi4vdmVjdG9yXCI7XG5cblxuZXhwb3J0IGNvbnN0IEVESVRfTU9ERVMgPSB7XG4gIE1PVkU6IDEsXG4gIENSRUFURV9QTEFORVRTOiAyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW11bGF0aW9uIHtcblxuICBjb25zdHJ1Y3RvciAocGFyYW1zKSB7XG4gICAgdGhpcy5hbmltYXRpb24gPSBudWxsO1xuICAgIHRoaXMucGxhbmV0cyA9IFtdO1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMuc3BhblggPSA1MDA7XG4gICAgdGhpcy5tYXNzQ2VudGVyID0gbnVsbDtcbiAgICB0aGlzLnNob3dWZWxvY2l0eVZlY3RvcnMgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0FjY1ZlY3RvcnMgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dQYXRoID0gdHJ1ZTtcbiAgICB0aGlzLmVkaXRNb2RlID0gRURJVF9NT0RFUy5NT1ZFO1xuICAgIHRoaXMuX2luaXRWaWV3RWxlbWVudHMoKTtcbiAgICAvLyB0cmFuc2xhdGlvbiBzdGF0ZVxuICAgIHRoaXMudHJhbnNsYXRlID0geyB4OiAwLCB5OiAwIH07XG4gICAgLy8gem9vbSBzdGF0ZVxuICAgIHRoaXMuaXNab29taW5nSW4gPSBmYWxzZTtcbiAgICB0aGlzLmlzWm9vbWluZ091dCA9IGZhbHNlO1xuICAgIC8vIG1vdXNlIHN0YXRlXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICB0aGlzLmxhc3REcmF3ID0geyBTVEFSVDogeyB4OiAwLCB5OiAwIH0sIEVORDogeyB4OiAwLCB5OiAwIH0gfTtcbiAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IG51bGw7XG4gICAgLy8gY2FudmFzIGluaXRpYWxpemF0aW9uXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2tldGNoJyk7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuX3Jlc2l6ZUNhbnZhcygpO1xuICAgIC8vIGNhbnZhcyBtb3VzZSBldmVudHNcbiAgICBhZGRMaXN0ZW5lcignc2tldGNoJywgJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignc2tldGNoJywgJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNlVXAsIHRoaXMpO1xuICAgIC8vIHpvb20gb3V0L2luIGJ1dHRvbnMgZXZlbnRzXG4gICAgYWRkTGlzdGVuZXIoJ3pvb20taW4nLCAnbW91c2Vkb3duJywgdGhpcy5fb25ab29tSW4sIHRoaXMpO1xuICAgIGFkZExpc3RlbmVyKCd6b29tLWluJywgJ21vdXNldXAnLCB0aGlzLl9vblpvb21JbiwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ3pvb20tb3V0JywgJ21vdXNlZG93bicsIHRoaXMuX29uWm9vbU91dCwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ3pvb20tb3V0JywgJ21vdXNldXAnLCB0aGlzLl9vblpvb21PdXQsIHRoaXMpO1xuICAgIGFkZExpc3RlbmVyKCdjcmVhdGUtbW9kZScsICdjbGljaycsIHRoaXMuX29uUGxhbmV0Q3JlYXRlLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignbW92ZS1tb2RlJywgJ2NsaWNrJywgdGhpcy5fb25Nb3ZlTW9kZSwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ3Nob3ctcGF0aCcsICdjbGljaycsIHRoaXMuX29uU2hvd1BhdGgsIHRoaXMpO1xuICAgIGFkZExpc3RlbmVyKCdzaG93LXYtdmVjdG9ycycsICdjbGljaycsIHRoaXMuX29uU2hvd1ZWZWN0b3JzLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignc2hvdy1hLXZlY3RvcnMnLCAnY2xpY2snLCB0aGlzLl9vblNob3dBVmVjdG9ycywgdGhpcyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9yZXNpemVDYW52YXMuYmluZCh0aGlzKSk7XG4gIH1cblxuICBfb25ab29tSW4gKCkge1xuICAgIHRoaXMuaXNab29taW5nSW4gPSAhdGhpcy5pc1pvb21pbmdJbjtcbiAgfVxuXG4gIF9vblpvb21PdXQgKCkge1xuICAgIHRoaXMuaXNab29taW5nT3V0ID0gIXRoaXMuaXNab29taW5nT3V0O1xuICB9XG5cbiAgX29uU2hvd1BhdGggKGUpIHtcbiAgICBpbnZlcnRTZWxlY3QoJ3Nob3ctcGF0aCcpO1xuICAgIHRoaXMuc2hvd1BhdGggPSAhdGhpcy5zaG93UGF0aDtcbiAgfVxuXG4gIF9vblNob3dWVmVjdG9ycyAoKSB7XG4gICAgaW52ZXJ0U2VsZWN0KCdzaG93LXYtdmVjdG9ycycpO1xuICAgIHRoaXMuc2hvd1ZlbG9jaXR5VmVjdG9ycyA9ICF0aGlzLnNob3dWZWxvY2l0eVZlY3RvcnM7XG4gIH1cblxuICBfb25TaG93QVZlY3RvcnMgKCkge1xuICAgIGludmVydFNlbGVjdCgnc2hvdy1hLXZlY3RvcnMnKTtcbiAgICB0aGlzLnNob3dBY2NWZWN0b3JzID0gIXRoaXMuc2hvd0FjY1ZlY3RvcnM7XG4gIH1cblxuICBfb25QbGFuZXRDcmVhdGUgKCkge1xuICAgIHNlbGVjdCgnY3JlYXRlLW1vZGUnKTtcbiAgICB1bnNlbGVjdCgnbW92ZS1tb2RlJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmN1cnNvciA9ICdjcm9zc2hhaXInO1xuICAgIHRoaXMuZWRpdE1vZGUgPSBFRElUX01PREVTLkNSRUFURV9QTEFORVRTO1xuICB9XG5cbiAgX29uTW92ZU1vZGUgKCkge1xuICAgIHVuc2VsZWN0KCdjcmVhdGUtbW9kZScpO1xuICAgIHNlbGVjdCgnbW92ZS1tb2RlJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmN1cnNvciA9ICdncmFiJztcbiAgICB0aGlzLmVkaXRNb2RlID0gRURJVF9NT0RFUy5NT1ZFO1xuICB9XG5cbiAgX29uTW91c2VNb3ZlIChlKSB7XG4gICAgLy8gc2tpcCBpZiBtb3VzZSBub3QgcHJlc3NlZFxuICAgIGlmICghdGhpcy5tb3VzZURvd24pIHJldHVybjtcblxuICAgIGlmICh0aGlzLmVkaXRNb2RlID09PSBFRElUX01PREVTLkNSRUFURV9QTEFORVRTKSB7XG4gICAgICB0aGlzLmxhc3REcmF3LkVORCA9IHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfTtcbiAgICB9XG4gICAgLy8gaWYgbW91c2UgcG9zaXRpb24gdW5zZXRcbiAgICBpZiAoIXRoaXMubGFzdE1vdXNlUG9zKSB7XG4gICAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfVxuICAgIH1cbiAgICAvLyBjYWxjdWxhdGUgbW91c2UgcG9zaXRpb24gZGlmZlxuICAgIGlmICh0aGlzLmVkaXRNb2RlID09PSBFRElUX01PREVTLk1PVkUpIHtcbiAgICAgIGlmICghdGhpcy5sYXN0TW91c2VQb3MpIHtcbiAgICAgICAgdGhpcy5sYXN0TW91c2VQb3MgPSB7IHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZIH1cbiAgICAgIH1cbiAgICAgIHRoaXMudHJhbnNsYXRlLnggKz0gKGUuY2xpZW50WCAtIHRoaXMubGFzdE1vdXNlUG9zLngpICogMiAvIHRoaXMuX2dldFNjYWxlWCgpO1xuICAgICAgdGhpcy50cmFuc2xhdGUueSArPSAoZS5jbGllbnRZIC0gdGhpcy5sYXN0TW91c2VQb3MueSkgKiAyIC8gdGhpcy5fZ2V0U2NhbGVZKCk7XG4gICAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfTtcbiAgICB9XG4gIH1cblxuICBfb25Nb3VzZURvd24gKGUpIHtcbiAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XG4gICAgaWYgKHRoaXMuZWRpdE1vZGUgPT09IEVESVRfTU9ERVMuQ1JFQVRFX1BMQU5FVFMpIHtcbiAgICAgIGxldCBtb3VzZVBvcyA9IHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfTtcbiAgICAgIHRoaXMubGFzdERyYXcuU1RBUlQgPSBtb3VzZVBvcztcbiAgICAgIHRoaXMubGFzdERyYXcuRU5EID0gbW91c2VQb3M7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVkaXRNb2RlID09PSBFRElUX01PREVTLk1PVkUpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5jdXJzb3IgPSAnZ3JhYmJpbmcnO1xuICAgIH1cbiAgfVxuXG4gIF9vbk1vdXNlVXAgKGUpIHtcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmVkaXRNb2RlID09PSBFRElUX01PREVTLkNSRUFURV9QTEFORVRTKSB7XG4gICAgICB0aGlzLnBsYW5ldHMucHVzaChuZXcgUGxhbmV0KFxuICAgICAgICB0aGlzLnBhcmFtcyxcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqIDEwICsgNSxcbiAgICAgICAgbmV3IFZlY3RvcihcbiAgICAgICAgICAoKHRoaXMubGFzdERyYXcuU1RBUlQueCAtICh0aGlzLmNhbnZhcy53aWR0aCAvIDIpKSAvIHRoaXMuX2dldFNjYWxlWCgpKSArICgtdGhpcy50cmFuc2xhdGUueCksXG4gICAgICAgICAgKCh0aGlzLmxhc3REcmF3LlNUQVJULnkgLSAodGhpcy5jYW52YXMuaGVpZ2h0IC8gMikpIC8gdGhpcy5fZ2V0U2NhbGVZKCkpICsgKC10aGlzLnRyYW5zbGF0ZS55KVxuICAgICAgICApLFxuICAgICAgICBuZXcgVmVjdG9yKFxuICAgICAgICAgIC8vIHNjYWxlIGRvd24gdmVjdG9yIGZvciBiZXR0ZXIgbW91c2UgZHJhd2luZyBwcmVjaXNpb25cbiAgICAgICAgICAodGhpcy5sYXN0RHJhdy5FTkQueCAtIHRoaXMubGFzdERyYXcuU1RBUlQueCksXG4gICAgICAgICAgKHRoaXMubGFzdERyYXcuRU5ELnkgLSB0aGlzLmxhc3REcmF3LlNUQVJULnkpXG4gICAgICAgICksXG4gICAgICApKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWRpdE1vZGUgPT09IEVESVRfTU9ERVMuTU9WRSkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmN1cnNvciA9ICdncmFiJztcbiAgICB9XG4gICAgdGhpcy5sYXN0TW91c2VQb3MgPSBudWxsO1xuICAgIHRoaXMubGFzdERyYXcgPSB7IFNUQVJUOiB7IHg6IDAsIHk6IDAgfSwgRU5EOiB7IHg6IDAsIHk6IDAgfSB9XG4gIH1cblxuICBfaW5pdFZpZXdFbGVtZW50cyAoKSB7XG4gICAgbGV0IGNyZWF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtbW9kZScpO1xuICAgIGxldCBtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtbW9kZScpO1xuICAgIGxldCBzaG93UGF0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LXBhdGgnKTtcbiAgICBsZXQgc2hvd1ZWZWN0b3JzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctdi12ZWN0b3JzJyk7XG5cbiAgICBpZiAoIXNob3dWVmVjdG9ycy5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcbiAgICAgIHNob3dWVmVjdG9ycy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIH1cbiAgICBpZiAoIXNob3dQYXRoLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuICAgICAgc2hvd1BhdGguY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgaWYgKGNyZWF0ZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcbiAgICAgIGNyZWF0ZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgIH1cbiAgICBpZiAoIW1vdmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgICBtb3ZlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuY3Vyc29yID0gJ2dyYWInO1xuICB9XG5cbiAgX3Jlc2l6ZUNhbnZhcyAoKSB7XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIH1cblxuICBfZ2V0U2NhbGVYICgpIHtcbiAgICByZXR1cm4gKHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy5zcGFuWCkgKiB0aGlzLnNjYWxlO1xuICB9XG5cbiAgX2dldFNjYWxlWSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFNjYWxlWCgpO1xuICB9XG5cbiAgX2NhbGN1bGF0ZU1hc3NDZW50ZXIgKCkge1xuICAgIGxldCBhdmcgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGxhbmV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXZnLnggKz0gdGhpcy5wbGFuZXRzW2ldLnBvc2l0aW9uLng7XG4gICAgICBhdmcueSArPSB0aGlzLnBsYW5ldHNbaV0ucG9zaXRpb24ueTtcbiAgICB9XG4gICAgYXZnLnggPSBhdmcueCAvIHRoaXMucGxhbmV0cy5sZW5ndGg7XG4gICAgYXZnLnkgPSBhdmcueSAvIHRoaXMucGxhbmV0cy5sZW5ndGg7XG4gICAgcmV0dXJuIGF2ZztcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uKTtcbiAgfVxuXG4gIHN0YXJ0ICgpIHtcbiAgICAvLyByYW5kb21seSBpbml0aWFsaXplIHBsYW5ldHMgYmFzZWQgb24gcGxhbmV0IGNvdW50IHBhcmFtXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcmFtcy5wbGFuZXRzQ291bnQ7IGkrKykge1xuICAgICAgdGhpcy5wbGFuZXRzLnB1c2gobmV3IFBsYW5ldChcbiAgICAgICAgdGhpcy5wYXJhbXMsXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKiAxMCArIDMsXG4gICAgICAgIG5ldyBWZWN0b3IoXG4gICAgICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogdGhpcy5zcGFuWCAvIDMsXG4gICAgICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogdGhpcy5zcGFuWCAvIDNcbiAgICAgICAgKVxuICAgICAgKSlcbiAgICB9XG4gICAgdGhpcy5hbmltYXRpb24gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fc2ltdWxhdGUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBfc2ltdWxhdGUgKCkge1xuICAgIC8vIGNhbGN1bGF0ZSBtYXNzIGNlbnRlclxuICAgIGNvbnN0IG1hc3NDZW50ZXIgPSB0aGlzLl9jYWxjdWxhdGVNYXNzQ2VudGVyKCk7XG4gICAgaWYgKHRoaXMubWFzc0NlbnRlcikge1xuICAgICAgY29uc3QgbWFzc0NlbnRlckR4ID0gdGhpcy5tYXNzQ2VudGVyLnggLSBtYXNzQ2VudGVyLng7XG4gICAgICBjb25zdCBtYXNzQ2VudGVyRHkgPSB0aGlzLm1hc3NDZW50ZXIueSAtIG1hc3NDZW50ZXIueTtcbiAgICAgIHRoaXMudHJhbnNsYXRlLnggKz0gbWFzc0NlbnRlckR4O1xuICAgICAgdGhpcy50cmFuc2xhdGUueSArPSBtYXNzQ2VudGVyRHk7XG4gICAgfVxuICAgIHRoaXMubWFzc0NlbnRlciA9IG1hc3NDZW50ZXI7XG5cbiAgICB0aGlzLmN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuY3R4LnNhdmUoKTtcblxuICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh0aGlzLmNhbnZhcy53aWR0aCAvIDIsIHRoaXMuY2FudmFzLmhlaWdodCAvIDIpO1xuICAgIHRoaXMuY3R4LnNjYWxlKHRoaXMuX2dldFNjYWxlWCgpLCB0aGlzLl9nZXRTY2FsZVkoKSk7XG4gICAgdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMudHJhbnNsYXRlLngsIHRoaXMudHJhbnNsYXRlLnkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBvdGhlciA9IFsuLi50aGlzLnBsYW5ldHMuc2xpY2UoMCwgaSAtIDEpLCAuLi50aGlzLnBsYW5ldHMuc2xpY2UoaSwgdGhpcy5wbGFuZXRzLmxlbmd0aCldO1xuICAgICAgdGhpcy5wbGFuZXRzW2ldLnVwZGF0ZShvdGhlciwgdGhpcy5wYXJhbXMuc3BlZWRDKTtcbiAgICAgIHRoaXMucGxhbmV0c1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLnNob3dQYXRoLCB0aGlzLnNob3dWZWxvY2l0eVZlY3RvcnMsIHRoaXMuc2hvd0FjY1ZlY3RvcnMpO1xuICAgIH1cbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG5cbiAgICB0aGlzLl9kcmF3VmVsb2NpdHlWZWN0b3IoXG4gICAgICB0aGlzLmxhc3REcmF3LlNUQVJULngsXG4gICAgICB0aGlzLmxhc3REcmF3LlNUQVJULnksXG4gICAgICB0aGlzLmxhc3REcmF3LkVORC54LFxuICAgICAgdGhpcy5sYXN0RHJhdy5FTkQueVxuICAgICk7XG5cbiAgICBpZiAodGhpcy5pc1pvb21pbmdJbikgdGhpcy5zY2FsZSArPSAwLjAwNTtcbiAgICBpZiAodGhpcy5pc1pvb21pbmdPdXQgJiYgdGhpcy5zY2FsZSA+IDApIHRoaXMuc2NhbGUgLT0gMC4wMDU7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fc2ltdWxhdGUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBfZHJhd1ZlbG9jaXR5VmVjdG9yICh4MCwgeTAsIHgxLCB5MSkge1xuICAgIGNvbnN0IHMgPSA3O1xuICAgIGNvbnN0IHcgPSAwLjc7XG4gICAgbGV0IGR4ID0geDEgLSB4MDtcbiAgICBsZXQgZHkgPSB5MSAtIHkwO1xuICAgIGxldCBhID0gTWF0aC5hdGFuKGR5IC8gZHgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHM7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHgubW92ZVRvKHgwLCB5MCk7XG4gICAgdGhpcy5jdHgubGluZVRvKHgxLCB5MSk7XG4gICAgdGhpcy5jdHgubW92ZVRvKHgxLCB5MSk7XG4gICAgaWYgKGR4IDwgMCkge1xuICAgICAgdGhpcy5jdHgubGluZVRvKHgxICsgTWF0aC5jb3MoYSAtIHcpICogcywgeTEgKyBNYXRoLnNpbihhIC0gdykgKiBzKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh4MSArIE1hdGguY29zKGEgKyB3KSAqIHMsIHkxICsgTWF0aC5zaW4oYSArIHcpICogcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh4MSAtIE1hdGguY29zKGEgLSB3KSAqIHMsIHkxIC0gTWF0aC5zaW4oYSAtIHcpICogcyk7XG4gICAgICB0aGlzLmN0eC5saW5lVG8oeDEgLSBNYXRoLmNvcyhhICsgdykgKiBzLCB5MSAtIE1hdGguc2luKGEgKyB3KSAqIHMpO1xuICAgIH1cbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBpbnZlcnRTZWxlY3QgKGlkKSB7XG4gIGxldCBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmIChlbGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgZWxlLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gIH0gZWxzZSB7XG4gICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5zZWxlY3QgKGlkKSB7XG4gIGxldCBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmIChlbGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgZWxlLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2VsZWN0IChpZCkge1xuICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBpZiAoIWVsZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcbiAgICBlbGUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRMaXN0ZW5lciAoaWQsIGV2ZW50LCBmdW5jLCBiaW5kKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jLmJpbmQoYmluZCkpO1xufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBbeCA9IDBdIHtOdW1iZXJ9XG4gICAqIEBwYXJhbSBbeSA9IDBdIHtOdW1iZXJ9XG4gICAqL1xuICBjb25zdHJ1Y3RvciAoeCwgeSkge1xuICAgIHRoaXMueCA9IHggPyB4IDogMDtcbiAgICB0aGlzLnkgPSB5ID8geSA6IDA7XG4gIH1cblxuICBnZXQgbWFnbml0dWRlICgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgTWF0aC5wb3codGhpcy54LCAyKSArXG4gICAgICBNYXRoLnBvdyh0aGlzLnksIDIpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBvYmplY3RcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXMgKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiBWZWN0b3I7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge051bWJlcn1cbiAgICogQHJldHVybnMge1ZlY3Rvcn1cbiAgICovXG4gIGRvdCAoYSkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgdGhpcy54ICogYSxcbiAgICAgIHRoaXMueSAqIGFcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge1ZlY3RvcnxOdW1iZXJ9XG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XG4gICAqL1xuICBhZGQgKGEpIHtcbiAgICBpZiAoVmVjdG9yLmlzKGEpKSB7XG4gICAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgdGhpcy54ICsgYS54LFxuICAgICAgICB0aGlzLnkgKyBhLnlcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgIHRoaXMueCArIGEsXG4gICAgICAgIHRoaXMueSArIGFcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge1ZlY3Rvcn1cbiAgICogQHJldHVybnMge1ZlY3Rvcn1cbiAgICovXG4gIGRpZmYgKGEpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgIGEueCAtIHRoaXMueCxcbiAgICAgIGEueSAtIHRoaXMueVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge1ZlY3Rvcn1cbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGRpc3QgKGEpIHtcbiAgICBsZXQgZGlmZiA9IHRoaXMuZGlmZihhKTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgTWF0aC5wb3coZGlmZi54LCAyKSArXG4gICAgICBNYXRoLnBvdyhkaWZmLnksIDIpXG4gICAgKVxuICB9XG5cbn0iXSwic291cmNlUm9vdCI6IiJ9