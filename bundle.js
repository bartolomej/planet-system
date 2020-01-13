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
getById('open-menu').addEventListener('click', openMenu); // params input change events

getById('gravity-const').addEventListener('input', onGChange);
getById('speed-const').addEventListener('input', onSpeedChange);
getById('planets-count').addEventListener('input', onPlanetsChange);

function onLoad() {
  openMenu();
  updateViewElements();
  startSimulation();
}

function onPlanetsChange() {
  let planetsCInput = Number.parseFloat(getById('planets-count').value);
  if (!isNaN(planetsCInput)) params.planetsCount = planetsCInput;
  startSimulation();
}

function onSpeedChange() {
  let speedCInput = Number.parseFloat(getById('speed-const').value);
  if (!isNaN(speedCInput)) params.speedC = speedCInput;
  simulation.params.speedC = params.speedC;
}

function onGChange() {
  let gravityInput = Number.parseFloat(getById('gravity-const').value);
  if (!isNaN(gravityInput)) params.gravityC = gravityInput;
  simulation.params.gravityC = params.gravityC;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wbGFuZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3IuanMiXSwibmFtZXMiOlsic2ltdWxhdGlvbiIsInBhcmFtcyIsInNwZWVkQyIsImdyYXZpdHlDIiwicGxhbmV0c0NvdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uTG9hZCIsImdldEJ5SWQiLCJvcGVuTWVudSIsIm9uR0NoYW5nZSIsIm9uU3BlZWRDaGFuZ2UiLCJvblBsYW5ldHNDaGFuZ2UiLCJ1cGRhdGVWaWV3RWxlbWVudHMiLCJzdGFydFNpbXVsYXRpb24iLCJwbGFuZXRzQ0lucHV0IiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsInZhbHVlIiwiaXNOYU4iLCJzcGVlZENJbnB1dCIsImdyYXZpdHlJbnB1dCIsImRlc3Ryb3kiLCJTaW11bGF0aW9uIiwic3RhcnQiLCJjaGVja2VkIiwic2hvd1BhdGgiLCIkIiwibW9kYWwiLCJmYWRlRHVyYXRpb24iLCJpZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJQbGFuZXQiLCJjb25zdHJ1Y3RvciIsIm1hc3MiLCJwb3NpdGlvbiIsInZlbG9jaXR5IiwiVmVjdG9yIiwiaXMiLCJhY2NlbGVyYXRpb24iLCJjIiwiTWF0aCIsInJhbmRvbSIsInBhdGgiLCJ0aWNrIiwiY29sb3IiLCJvcGFjaXR5IiwicmVwbGFjZSIsImRyYXciLCJjdHgiLCJzaG93VlZlY3RvcnMiLCJzaG93QVZlY3RvcnMiLCJiZWdpblBhdGgiLCJzdHJva2VTdHlsZSIsImZpbGxTdHlsZSIsIm1vdmVUbyIsIngiLCJ5IiwiYXJjIiwiUEkiLCJjbG9zZVBhdGgiLCJmaWxsIiwiX2RyYXdWZWN0b3IiLCJ4MCIsInkwIiwieDEiLCJ5MSIsInMiLCJ3IiwiZHgiLCJkeSIsImEiLCJhdGFuIiwibGluZVdpZHRoIiwibGluZVRvIiwiY29zIiwic2luIiwic3Ryb2tlIiwidXBkYXRlIiwicGxhbmV0cyIsInBsYW5ldCIsImdldEFjY2VsZXJhdGlvbiIsImFkZCIsImRvdCIsInB1c2giLCJsZW5ndGgiLCJzcGxpY2UiLCJmIiwiZ2V0Rm9yY2UiLCJkaWZmIiwiRyIsInNxcnQiLCJkaXN0IiwiRURJVF9NT0RFUyIsIk1PVkUiLCJDUkVBVEVfUExBTkVUUyIsImFuaW1hdGlvbiIsInNjYWxlIiwic3BhblgiLCJtYXNzQ2VudGVyIiwic2hvd1ZlbG9jaXR5VmVjdG9ycyIsInNob3dBY2NWZWN0b3JzIiwiZWRpdE1vZGUiLCJfaW5pdFZpZXdFbGVtZW50cyIsInRyYW5zbGF0ZSIsImlzWm9vbWluZ0luIiwiaXNab29taW5nT3V0IiwibW91c2VEb3duIiwibGFzdERyYXciLCJTVEFSVCIsIkVORCIsImxhc3RNb3VzZVBvcyIsImNhbnZhcyIsImdldENvbnRleHQiLCJfcmVzaXplQ2FudmFzIiwiYWRkTGlzdGVuZXIiLCJfb25Nb3VzZURvd24iLCJfb25Nb3VzZVVwIiwiX29uWm9vbUluIiwiX29uWm9vbU91dCIsIl9vblBsYW5ldENyZWF0ZSIsIl9vbk1vdmVNb2RlIiwiX29uU2hvd1BhdGgiLCJfb25TaG93VlZlY3RvcnMiLCJfb25TaG93QVZlY3RvcnMiLCJfb25Nb3VzZU1vdmUiLCJiaW5kIiwiZSIsImludmVydFNlbGVjdCIsInNlbGVjdCIsInVuc2VsZWN0Iiwic3R5bGUiLCJjdXJzb3IiLCJjbGllbnRYIiwiY2xpZW50WSIsIl9nZXRTY2FsZVgiLCJfZ2V0U2NhbGVZIiwibW91c2VQb3MiLCJ3aWR0aCIsImhlaWdodCIsImNyZWF0ZSIsIm1vdmUiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsIl9jYWxjdWxhdGVNYXNzQ2VudGVyIiwiYXZnIiwiaSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiX3NpbXVsYXRlIiwibWFzc0NlbnRlckR4IiwibWFzc0NlbnRlckR5Iiwic2V0VHJhbnNmb3JtIiwiY2xlYXJSZWN0Iiwic2F2ZSIsIm90aGVyIiwic2xpY2UiLCJyZXN0b3JlIiwiX2RyYXdWZWxvY2l0eVZlY3RvciIsImVsZSIsImV2ZW50IiwiZnVuYyIsIm1hZ25pdHVkZSIsInBvdyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0NBR0E7O0FBRUEsSUFBSUEsVUFBVSxHQUFHLElBQWpCO0FBQ0EsSUFBSUMsTUFBTSxHQUFHO0FBQ1hDLFFBQU0sRUFBRSxHQURHO0FBRVhDLFVBQVEsRUFBRSxNQUZDO0FBR1hDLGNBQVksRUFBRTtBQUhILENBQWI7QUFNQUMsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixN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QyxDQUFkLEVBQWlCLENBQWpCLElBQ0FmLElBQUksQ0FBQzZILEdBQUwsQ0FBUzdFLElBQUksQ0FBQ2hDLENBQWQsRUFBaUIsQ0FBakIsQ0FGSyxDQUFQO0FBSUQ7O0FBNUV5QixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCJcbmltcG9ydCBTaW11bGF0aW9uIGZyb20gXCIuL3NpbXVsYXRpb25cIjtcblxuLy8gVE9ETzogaW1wbGVtZW50IHN0YWJsZSBvcmJpdHMgZXhhbXBsZXM6IGh0dHBzOi8vbWF0aC5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvMTYxMzc2NS9zaW1wbGUtc3RhYmxlLW4tYm9keS1vcmJpdHMtaW4tdGhlLXBsYW5lLXdpdGgtc29tZS1maXhlZC1ib2RpZXMtYWxsb3dlZFxuXG5sZXQgc2ltdWxhdGlvbiA9IG51bGw7XG5sZXQgcGFyYW1zID0ge1xuICBzcGVlZEM6IDAuMSxcbiAgZ3Jhdml0eUM6IDAuMDAwNCxcbiAgcGxhbmV0c0NvdW50OiAxMCxcbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcbmdldEJ5SWQoJ29wZW4tbWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk1lbnUpO1xuXG4vLyBwYXJhbXMgaW5wdXQgY2hhbmdlIGV2ZW50c1xuZ2V0QnlJZCgnZ3Jhdml0eS1jb25zdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25HQ2hhbmdlKTtcbmdldEJ5SWQoJ3NwZWVkLWNvbnN0JykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvblNwZWVkQ2hhbmdlKTtcbmdldEJ5SWQoJ3BsYW5ldHMtY291bnQnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uUGxhbmV0c0NoYW5nZSk7XG5cbmZ1bmN0aW9uIG9uTG9hZCAoKSB7XG4gIG9wZW5NZW51KCk7XG4gIHVwZGF0ZVZpZXdFbGVtZW50cygpO1xuICBzdGFydFNpbXVsYXRpb24oKTtcbn1cblxuZnVuY3Rpb24gb25QbGFuZXRzQ2hhbmdlICgpIHtcbiAgbGV0IHBsYW5ldHNDSW5wdXQgPSBOdW1iZXIucGFyc2VGbG9hdChnZXRCeUlkKCdwbGFuZXRzLWNvdW50JykudmFsdWUpO1xuICBpZiAoIWlzTmFOKHBsYW5ldHNDSW5wdXQpKSBwYXJhbXMucGxhbmV0c0NvdW50ID0gcGxhbmV0c0NJbnB1dDtcblxuICBzdGFydFNpbXVsYXRpb24oKTtcbn1cblxuZnVuY3Rpb24gb25TcGVlZENoYW5nZSAoKSB7XG4gIGxldCBzcGVlZENJbnB1dCA9IE51bWJlci5wYXJzZUZsb2F0KGdldEJ5SWQoJ3NwZWVkLWNvbnN0JykudmFsdWUpO1xuICBpZiAoIWlzTmFOKHNwZWVkQ0lucHV0KSkgcGFyYW1zLnNwZWVkQyA9IHNwZWVkQ0lucHV0O1xuICBzaW11bGF0aW9uLnBhcmFtcy5zcGVlZEMgPSBwYXJhbXMuc3BlZWRDO1xufVxuXG5mdW5jdGlvbiBvbkdDaGFuZ2UgKCkge1xuICBsZXQgZ3Jhdml0eUlucHV0ID0gTnVtYmVyLnBhcnNlRmxvYXQoZ2V0QnlJZCgnZ3Jhdml0eS1jb25zdCcpLnZhbHVlKTtcbiAgaWYgKCFpc05hTihncmF2aXR5SW5wdXQpKSBwYXJhbXMuZ3Jhdml0eUMgPSBncmF2aXR5SW5wdXQ7XG4gIHNpbXVsYXRpb24ucGFyYW1zLmdyYXZpdHlDID0gcGFyYW1zLmdyYXZpdHlDO1xufVxuXG5mdW5jdGlvbiBzdGFydFNpbXVsYXRpb24gKCkge1xuICBpZiAoc2ltdWxhdGlvbikge1xuICAgIHNpbXVsYXRpb24uZGVzdHJveSgpO1xuICAgIHNpbXVsYXRpb24gPSBuZXcgU2ltdWxhdGlvbihwYXJhbXMpO1xuICAgIHNpbXVsYXRpb24uc3RhcnQoKTtcbiAgfSBlbHNlIHtcbiAgICBzaW11bGF0aW9uID0gbmV3IFNpbXVsYXRpb24ocGFyYW1zKTtcbiAgICBzaW11bGF0aW9uLnN0YXJ0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlVmlld0VsZW1lbnRzICgpIHtcbiAgZ2V0QnlJZCgnZ3Jhdml0eS1jb25zdCcpLnZhbHVlID0gcGFyYW1zLmdyYXZpdHlDO1xuICBnZXRCeUlkKCdzcGVlZC1jb25zdCcpLnZhbHVlID0gcGFyYW1zLnNwZWVkQztcbiAgZ2V0QnlJZCgncGxhbmV0cy1jb3VudCcpLnZhbHVlID0gcGFyYW1zLnBsYW5ldHNDb3VudDtcbiAgZ2V0QnlJZCgnc2hvdy1wYXRoJykuY2hlY2tlZCA9IHBhcmFtcy5zaG93UGF0aDtcbn1cblxuZnVuY3Rpb24gb3Blbk1lbnUgKCkge1xuICAkKFwiI2ludHJvLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBmYWRlRHVyYXRpb246IDEwMFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0QnlJZCAoaWQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuL3ZlY3RvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGFuZXQge1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gW3BhcmFtc10ge09iamVjdH1cbiAgICogQHBhcmFtIFttYXNzID0gMV0ge051bWJlcn1cbiAgICogQHBhcmFtIFtwb3NpdGlvbl0ge1ZlY3Rvcn1cbiAgICogQHBhcmFtIFt2ZWxvY2l0eV0ge1ZlY3Rvcn1cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwYXJhbXMsIG1hc3MsIHBvc2l0aW9uLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMubWFzcyA9IG1hc3MgPyBtYXNzIDogMTtcbiAgICB0aGlzLnBvc2l0aW9uID0gVmVjdG9yLmlzKHBvc2l0aW9uKSA/IHBvc2l0aW9uIDogbmV3IFZlY3RvcigpO1xuICAgIHRoaXMudmVsb2NpdHkgPSBWZWN0b3IuaXModmVsb2NpdHkpID8gdmVsb2NpdHkgOiBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5hY2NlbGVyYXRpb24gPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5jID0gYHJnYmEoJHtNYXRoLnJhbmRvbSgpKjI1NX0sICR7TWF0aC5yYW5kb20oKSoyNTV9LCAke01hdGgucmFuZG9tKCkqMjU1fSwgeClgO1xuICAgIHRoaXMucGF0aCA9IFtdO1xuICAgIHRoaXMudGljayA9IDA7XG4gIH1cblxuICBjb2xvciAob3BhY2l0eSkge1xuICAgIHJldHVybiB0aGlzLmMucmVwbGFjZSgneCcsIG9wYWNpdHkpO1xuICB9XG5cbiAgZHJhdyAoY3R4LCBzaG93UGF0aCA9IHRydWUsIHNob3dWVmVjdG9ycywgc2hvd0FWZWN0b3JzKSB7XG5cbiAgICBpZiAoc2hvd1BhdGgpIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmdiYSgxLCAxLCAxLCAwKVwiO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3IoMC4zKTtcbiAgICAgIGZvciAobGV0IHBvc2l0aW9uIG9mIHRoaXMucGF0aCkge1xuICAgICAgICBjdHgubW92ZVRvKHBvc2l0aW9uLnggLCBwb3NpdGlvbi55KTtcbiAgICAgICAgY3R4LmFyYyhwb3NpdGlvbi54LCBwb3NpdGlvbi55LCAyLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICB9XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguZmlsbCgpO1xuICAgIH1cblxuICAgIGlmIChzaG93VlZlY3RvcnMpIHtcbiAgICAgIHRoaXMuX2RyYXdWZWN0b3IoY3R4LCBcIiNGRjAwMDBcIixcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICB0aGlzLnBvc2l0aW9uLnksXG4gICAgICAgIHRoaXMucG9zaXRpb24ueCArIHRoaXMudmVsb2NpdHkueCxcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy52ZWxvY2l0eS55XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoc2hvd0FWZWN0b3JzKSB7XG4gICAgICB0aGlzLl9kcmF3VmVjdG9yKGN0eCwgXCIjMDAxMmZmXCIsXG4gICAgICAgIHRoaXMucG9zaXRpb24ueCxcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55LFxuICAgICAgICB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLmFjY2VsZXJhdGlvbi54ICogMTUwLFxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmFjY2VsZXJhdGlvbi55ICogMTUwXG4gICAgICApO1xuICAgIH1cblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcigxKTtcbiAgICBjdHguYXJjKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLm1hc3MsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIHRoaXMudGljaysrO1xuICB9XG5cbiAgX2RyYXdWZWN0b3IgKGN0eCwgY29sb3IsIHgwLCB5MCwgeDEsIHkxKSB7XG4gICAgY29uc3QgcyA9IDM7XG4gICAgY29uc3QgdyA9IDAuNDtcbiAgICBsZXQgZHggPSB4MSAtIHgwO1xuICAgIGxldCBkeSA9IHkxIC0geTA7XG4gICAgbGV0IGEgPSBNYXRoLmF0YW4oZHkgLyBkeCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIGN0eC5saW5lV2lkdGggPSBzO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHgwLCB5MCk7XG4gICAgY3R4LmxpbmVUbyh4MSwgeTEpO1xuICAgIGN0eC5tb3ZlVG8oeDEsIHkxKTtcbiAgICBpZiAoZHggPCAwKSB7XG4gICAgICBjdHgubGluZVRvKHgxICsgTWF0aC5jb3MoYSAtIHcpICogcywgeTEgKyBNYXRoLnNpbihhIC0gdykgKiBzKTtcbiAgICAgIGN0eC5saW5lVG8oeDEgKyBNYXRoLmNvcyhhICsgdykgKiBzLCB5MSArIE1hdGguc2luKGEgKyB3KSAqIHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHgubGluZVRvKHgxIC0gTWF0aC5jb3MoYSAtIHcpICogcywgeTEgLSBNYXRoLnNpbihhIC0gdykgKiBzKTtcbiAgICAgIGN0eC5saW5lVG8oeDEgLSBNYXRoLmNvcyhhICsgdykgKiBzLCB5MSAtIE1hdGguc2luKGEgKyB3KSAqIHMpO1xuICAgIH1cbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cblxuICB1cGRhdGUgKHBsYW5ldHMsIHNwZWVkQykge1xuICAgIGZvciAobGV0IHBsYW5ldCBvZiBwbGFuZXRzKSB7XG4gICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IHRoaXMuZ2V0QWNjZWxlcmF0aW9uKHBsYW5ldCk7XG4gICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5hZGQodGhpcy5hY2NlbGVyYXRpb24pO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy52ZWxvY2l0eS5kb3Qoc3BlZWRDKSk7XG4gICAgaWYgKHRoaXMudGljayAlIDQgPT09IDApIHtcbiAgICAgIHRoaXMucGF0aC5wdXNoKHRoaXMucG9zaXRpb24pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXRoLmxlbmd0aCA+IDE1MCkge1xuICAgICAgdGhpcy5wYXRoLnNwbGljZSgwLCAxKVxuICAgIH1cbiAgfVxuXG4gIGdldEFjY2VsZXJhdGlvbiAocGxhbmV0KSB7XG4gICAgbGV0IGYgPSB0aGlzLmdldEZvcmNlKHBsYW5ldCk7XG4gICAgbGV0IGRpZmYgPSB0aGlzLnBvc2l0aW9uLmRpZmYocGxhbmV0LnBvc2l0aW9uKTtcbiAgICByZXR1cm4gZGlmZi5kb3QoIGYgLyB0aGlzLm1hc3MpO1xuICB9XG5cbiAgZ2V0Rm9yY2UgKHBsYW5ldCkge1xuICAgIGxldCBHID0gdGhpcy5wYXJhbXMuZ3Jhdml0eUMgPyB0aGlzLnBhcmFtcy5ncmF2aXR5QyA6IDE7XG4gICAgcmV0dXJuIEcgKiBwbGFuZXQubWFzcyAqIHRoaXMubWFzcyAvIE1hdGguc3FydCh0aGlzLnBvc2l0aW9uLmRpc3QocGxhbmV0LnBvc2l0aW9uKSk7XG4gIH1cblxufSIsImltcG9ydCBQbGFuZXQgZnJvbSBcIi4vcGxhbmV0XCI7XG5pbXBvcnQgVmVjdG9yIGZyb20gXCIuL3ZlY3RvclwiO1xuXG5cbmV4cG9ydCBjb25zdCBFRElUX01PREVTID0ge1xuICBNT1ZFOiAxLFxuICBDUkVBVEVfUExBTkVUUzogMlxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltdWxhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IgKHBhcmFtcykge1xuICAgIHRoaXMuYW5pbWF0aW9uID0gbnVsbDtcbiAgICB0aGlzLnBsYW5ldHMgPSBbXTtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgICB0aGlzLnNwYW5YID0gNTAwO1xuICAgIHRoaXMubWFzc0NlbnRlciA9IG51bGw7XG4gICAgdGhpcy5zaG93VmVsb2NpdHlWZWN0b3JzID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dBY2NWZWN0b3JzID0gZmFsc2U7XG4gICAgdGhpcy5zaG93UGF0aCA9IHRydWU7XG4gICAgdGhpcy5lZGl0TW9kZSA9IEVESVRfTU9ERVMuTU9WRTtcbiAgICB0aGlzLl9pbml0Vmlld0VsZW1lbnRzKCk7XG4gICAgLy8gdHJhbnNsYXRpb24gc3RhdGVcbiAgICB0aGlzLnRyYW5zbGF0ZSA9IHsgeDogMCwgeTogMCB9O1xuICAgIC8vIHpvb20gc3RhdGVcbiAgICB0aGlzLmlzWm9vbWluZ0luID0gZmFsc2U7XG4gICAgdGhpcy5pc1pvb21pbmdPdXQgPSBmYWxzZTtcbiAgICAvLyBtb3VzZSBzdGF0ZVxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gICAgdGhpcy5sYXN0RHJhdyA9IHsgU1RBUlQ6IHsgeDogMCwgeTogMCB9LCBFTkQ6IHsgeDogMCwgeTogMCB9IH07XG4gICAgdGhpcy5sYXN0TW91c2VQb3MgPSBudWxsO1xuICAgIC8vIGNhbnZhcyBpbml0aWFsaXphdGlvblxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NrZXRjaCcpO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLl9yZXNpemVDYW52YXMoKTtcbiAgICAvLyBjYW52YXMgbW91c2UgZXZlbnRzXG4gICAgYWRkTGlzdGVuZXIoJ3NrZXRjaCcsICdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93biwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ3NrZXRjaCcsICdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwLCB0aGlzKTtcbiAgICAvLyB6b29tIG91dC9pbiBidXR0b25zIGV2ZW50c1xuICAgIGFkZExpc3RlbmVyKCd6b29tLWluJywgJ21vdXNlZG93bicsIHRoaXMuX29uWm9vbUluLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignem9vbS1pbicsICdtb3VzZXVwJywgdGhpcy5fb25ab29tSW4sIHRoaXMpO1xuICAgIGFkZExpc3RlbmVyKCd6b29tLW91dCcsICdtb3VzZWRvd24nLCB0aGlzLl9vblpvb21PdXQsIHRoaXMpO1xuICAgIGFkZExpc3RlbmVyKCd6b29tLW91dCcsICdtb3VzZXVwJywgdGhpcy5fb25ab29tT3V0LCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignY3JlYXRlLW1vZGUnLCAnY2xpY2snLCB0aGlzLl9vblBsYW5ldENyZWF0ZSwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ21vdmUtbW9kZScsICdjbGljaycsIHRoaXMuX29uTW92ZU1vZGUsIHRoaXMpO1xuICAgIGFkZExpc3RlbmVyKCdzaG93LXBhdGgnLCAnY2xpY2snLCB0aGlzLl9vblNob3dQYXRoLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignc2hvdy12LXZlY3RvcnMnLCAnY2xpY2snLCB0aGlzLl9vblNob3dWVmVjdG9ycywgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ3Nob3ctYS12ZWN0b3JzJywgJ2NsaWNrJywgdGhpcy5fb25TaG93QVZlY3RvcnMsIHRoaXMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fcmVzaXplQ2FudmFzLmJpbmQodGhpcykpO1xuICB9XG5cbiAgX29uWm9vbUluICgpIHtcbiAgICB0aGlzLmlzWm9vbWluZ0luID0gIXRoaXMuaXNab29taW5nSW47XG4gIH1cblxuICBfb25ab29tT3V0ICgpIHtcbiAgICB0aGlzLmlzWm9vbWluZ091dCA9ICF0aGlzLmlzWm9vbWluZ091dDtcbiAgfVxuXG4gIF9vblNob3dQYXRoIChlKSB7XG4gICAgaW52ZXJ0U2VsZWN0KCdzaG93LXBhdGgnKTtcbiAgICB0aGlzLnNob3dQYXRoID0gIXRoaXMuc2hvd1BhdGg7XG4gIH1cblxuICBfb25TaG93VlZlY3RvcnMgKCkge1xuICAgIGludmVydFNlbGVjdCgnc2hvdy12LXZlY3RvcnMnKTtcbiAgICB0aGlzLnNob3dWZWxvY2l0eVZlY3RvcnMgPSAhdGhpcy5zaG93VmVsb2NpdHlWZWN0b3JzO1xuICB9XG5cbiAgX29uU2hvd0FWZWN0b3JzICgpIHtcbiAgICBpbnZlcnRTZWxlY3QoJ3Nob3ctYS12ZWN0b3JzJyk7XG4gICAgdGhpcy5zaG93QWNjVmVjdG9ycyA9ICF0aGlzLnNob3dBY2NWZWN0b3JzO1xuICB9XG5cbiAgX29uUGxhbmV0Q3JlYXRlICgpIHtcbiAgICBzZWxlY3QoJ2NyZWF0ZS1tb2RlJyk7XG4gICAgdW5zZWxlY3QoJ21vdmUtbW9kZScpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5jdXJzb3IgPSAnY3Jvc3NoYWlyJztcbiAgICB0aGlzLmVkaXRNb2RlID0gRURJVF9NT0RFUy5DUkVBVEVfUExBTkVUUztcbiAgfVxuXG4gIF9vbk1vdmVNb2RlICgpIHtcbiAgICB1bnNlbGVjdCgnY3JlYXRlLW1vZGUnKTtcbiAgICBzZWxlY3QoJ21vdmUtbW9kZScpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5jdXJzb3IgPSAnZ3JhYic7XG4gICAgdGhpcy5lZGl0TW9kZSA9IEVESVRfTU9ERVMuTU9WRTtcbiAgfVxuXG4gIF9vbk1vdXNlTW92ZSAoZSkge1xuICAgIC8vIHNraXAgaWYgbW91c2Ugbm90IHByZXNzZWRcbiAgICBpZiAoIXRoaXMubW91c2VEb3duKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5lZGl0TW9kZSA9PT0gRURJVF9NT0RFUy5DUkVBVEVfUExBTkVUUykge1xuICAgICAgdGhpcy5sYXN0RHJhdy5FTkQgPSB7IHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZIH07XG4gICAgfVxuICAgIC8vIGlmIG1vdXNlIHBvc2l0aW9uIHVuc2V0XG4gICAgaWYgKCF0aGlzLmxhc3RNb3VzZVBvcykge1xuICAgICAgdGhpcy5sYXN0TW91c2VQb3MgPSB7IHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZIH1cbiAgICB9XG4gICAgLy8gY2FsY3VsYXRlIG1vdXNlIHBvc2l0aW9uIGRpZmZcbiAgICBpZiAodGhpcy5lZGl0TW9kZSA9PT0gRURJVF9NT0RFUy5NT1ZFKSB7XG4gICAgICBpZiAoIXRoaXMubGFzdE1vdXNlUG9zKSB7XG4gICAgICAgIHRoaXMubGFzdE1vdXNlUG9zID0geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9XG4gICAgICB9XG4gICAgICB0aGlzLnRyYW5zbGF0ZS54ICs9IChlLmNsaWVudFggLSB0aGlzLmxhc3RNb3VzZVBvcy54KSAqIDIgLyB0aGlzLl9nZXRTY2FsZVgoKTtcbiAgICAgIHRoaXMudHJhbnNsYXRlLnkgKz0gKGUuY2xpZW50WSAtIHRoaXMubGFzdE1vdXNlUG9zLnkpICogMiAvIHRoaXMuX2dldFNjYWxlWSgpO1xuICAgICAgdGhpcy5sYXN0TW91c2VQb3MgPSB7IHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZIH07XG4gICAgfVxuICB9XG5cbiAgX29uTW91c2VEb3duIChlKSB7XG4gICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xuICAgIGlmICh0aGlzLmVkaXRNb2RlID09PSBFRElUX01PREVTLkNSRUFURV9QTEFORVRTKSB7XG4gICAgICBsZXQgbW91c2VQb3MgPSB7IHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZIH07XG4gICAgICB0aGlzLmxhc3REcmF3LlNUQVJUID0gbW91c2VQb3M7XG4gICAgICB0aGlzLmxhc3REcmF3LkVORCA9IG1vdXNlUG9zO1xuICAgIH0gZWxzZSBpZiAodGhpcy5lZGl0TW9kZSA9PT0gRURJVF9NT0RFUy5NT1ZFKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuY3Vyc29yID0gJ2dyYWJiaW5nJztcbiAgICB9XG4gIH1cblxuICBfb25Nb3VzZVVwIChlKSB7XG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICBpZiAodGhpcy5lZGl0TW9kZSA9PT0gRURJVF9NT0RFUy5DUkVBVEVfUExBTkVUUykge1xuICAgICAgdGhpcy5wbGFuZXRzLnB1c2gobmV3IFBsYW5ldChcbiAgICAgICAgdGhpcy5wYXJhbXMsXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKiAxMCArIDUsXG4gICAgICAgIG5ldyBWZWN0b3IoXG4gICAgICAgICAgKCh0aGlzLmxhc3REcmF3LlNUQVJULnggLSAodGhpcy5jYW52YXMud2lkdGggLyAyKSkgLyB0aGlzLl9nZXRTY2FsZVgoKSkgKyAoLXRoaXMudHJhbnNsYXRlLngpLFxuICAgICAgICAgICgodGhpcy5sYXN0RHJhdy5TVEFSVC55IC0gKHRoaXMuY2FudmFzLmhlaWdodCAvIDIpKSAvIHRoaXMuX2dldFNjYWxlWSgpKSArICgtdGhpcy50cmFuc2xhdGUueSlcbiAgICAgICAgKSxcbiAgICAgICAgbmV3IFZlY3RvcihcbiAgICAgICAgICAvLyBzY2FsZSBkb3duIHZlY3RvciBmb3IgYmV0dGVyIG1vdXNlIGRyYXdpbmcgcHJlY2lzaW9uXG4gICAgICAgICAgKHRoaXMubGFzdERyYXcuRU5ELnggLSB0aGlzLmxhc3REcmF3LlNUQVJULngpLFxuICAgICAgICAgICh0aGlzLmxhc3REcmF3LkVORC55IC0gdGhpcy5sYXN0RHJhdy5TVEFSVC55KVxuICAgICAgICApLFxuICAgICAgKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVkaXRNb2RlID09PSBFRElUX01PREVTLk1PVkUpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5jdXJzb3IgPSAnZ3JhYic7XG4gICAgfVxuICAgIHRoaXMubGFzdE1vdXNlUG9zID0gbnVsbDtcbiAgICB0aGlzLmxhc3REcmF3ID0geyBTVEFSVDogeyB4OiAwLCB5OiAwIH0sIEVORDogeyB4OiAwLCB5OiAwIH0gfVxuICB9XG5cbiAgX2luaXRWaWV3RWxlbWVudHMgKCkge1xuICAgIGxldCBjcmVhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLW1vZGUnKTtcbiAgICBsZXQgbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLW1vZGUnKTtcbiAgICBsZXQgc2hvd1BhdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1wYXRoJyk7XG4gICAgbGV0IHNob3dWVmVjdG9ycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LXYtdmVjdG9ycycpO1xuXG4gICAgaWYgKCFzaG93VlZlY3RvcnMuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgICBzaG93VlZlY3RvcnMuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgaWYgKCFzaG93UGF0aC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcbiAgICAgIHNob3dQYXRoLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgfVxuICAgIGlmIChjcmVhdGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgICBjcmVhdGUuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgaWYgKCFtb3ZlLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuICAgICAgbW92ZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmN1cnNvciA9ICdncmFiJztcbiAgfVxuXG4gIF9yZXNpemVDYW52YXMgKCkge1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICB9XG5cbiAgX2dldFNjYWxlWCAoKSB7XG4gICAgcmV0dXJuICh0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMuc3BhblgpICogdGhpcy5zY2FsZTtcbiAgfVxuXG4gIF9nZXRTY2FsZVkgKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRTY2FsZVgoKTtcbiAgfVxuXG4gIF9jYWxjdWxhdGVNYXNzQ2VudGVyICgpIHtcbiAgICBsZXQgYXZnID0geyB4OiAwLCB5OiAwIH07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF2Zy54ICs9IHRoaXMucGxhbmV0c1tpXS5wb3NpdGlvbi54O1xuICAgICAgYXZnLnkgKz0gdGhpcy5wbGFuZXRzW2ldLnBvc2l0aW9uLnk7XG4gICAgfVxuICAgIGF2Zy54ID0gYXZnLnggLyB0aGlzLnBsYW5ldHMubGVuZ3RoO1xuICAgIGF2Zy55ID0gYXZnLnkgLyB0aGlzLnBsYW5ldHMubGVuZ3RoO1xuICAgIHJldHVybiBhdmc7XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbik7XG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgLy8gcmFuZG9tbHkgaW5pdGlhbGl6ZSBwbGFuZXRzIGJhc2VkIG9uIHBsYW5ldCBjb3VudCBwYXJhbVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYXJhbXMucGxhbmV0c0NvdW50OyBpKyspIHtcbiAgICAgIHRoaXMucGxhbmV0cy5wdXNoKG5ldyBQbGFuZXQoXG4gICAgICAgIHRoaXMucGFyYW1zLFxuICAgICAgICBNYXRoLnJhbmRvbSgpICogMTAgKyAzLFxuICAgICAgICBuZXcgVmVjdG9yKFxuICAgICAgICAgIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIHRoaXMuc3BhblggLyAzLFxuICAgICAgICAgIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIHRoaXMuc3BhblggLyAzXG4gICAgICAgIClcbiAgICAgICkpXG4gICAgfVxuICAgIHRoaXMuYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3NpbXVsYXRlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgX3NpbXVsYXRlICgpIHtcbiAgICAvLyBjYWxjdWxhdGUgbWFzcyBjZW50ZXJcbiAgICBjb25zdCBtYXNzQ2VudGVyID0gdGhpcy5fY2FsY3VsYXRlTWFzc0NlbnRlcigpO1xuICAgIGlmICh0aGlzLm1hc3NDZW50ZXIpIHtcbiAgICAgIGNvbnN0IG1hc3NDZW50ZXJEeCA9IHRoaXMubWFzc0NlbnRlci54IC0gbWFzc0NlbnRlci54O1xuICAgICAgY29uc3QgbWFzc0NlbnRlckR5ID0gdGhpcy5tYXNzQ2VudGVyLnkgLSBtYXNzQ2VudGVyLnk7XG4gICAgICB0aGlzLnRyYW5zbGF0ZS54ICs9IG1hc3NDZW50ZXJEeDtcbiAgICAgIHRoaXMudHJhbnNsYXRlLnkgKz0gbWFzc0NlbnRlckR5O1xuICAgIH1cbiAgICB0aGlzLm1hc3NDZW50ZXIgPSBtYXNzQ2VudGVyO1xuXG4gICAgdGhpcy5jdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLmN0eC5zYXZlKCk7XG5cbiAgICB0aGlzLmN0eC50cmFuc2xhdGUodGhpcy5jYW52YXMud2lkdGggLyAyLCB0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKTtcbiAgICB0aGlzLmN0eC5zY2FsZSh0aGlzLl9nZXRTY2FsZVgoKSwgdGhpcy5fZ2V0U2NhbGVZKCkpO1xuICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh0aGlzLnRyYW5zbGF0ZS54LCB0aGlzLnRyYW5zbGF0ZS55KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgb3RoZXIgPSBbLi4udGhpcy5wbGFuZXRzLnNsaWNlKDAsIGkgLSAxKSwgLi4udGhpcy5wbGFuZXRzLnNsaWNlKGksIHRoaXMucGxhbmV0cy5sZW5ndGgpXTtcbiAgICAgIHRoaXMucGxhbmV0c1tpXS51cGRhdGUob3RoZXIsIHRoaXMucGFyYW1zLnNwZWVkQyk7XG4gICAgICB0aGlzLnBsYW5ldHNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy5zaG93UGF0aCwgdGhpcy5zaG93VmVsb2NpdHlWZWN0b3JzLCB0aGlzLnNob3dBY2NWZWN0b3JzKTtcbiAgICB9XG4gICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuXG4gICAgdGhpcy5fZHJhd1ZlbG9jaXR5VmVjdG9yKFxuICAgICAgdGhpcy5sYXN0RHJhdy5TVEFSVC54LFxuICAgICAgdGhpcy5sYXN0RHJhdy5TVEFSVC55LFxuICAgICAgdGhpcy5sYXN0RHJhdy5FTkQueCxcbiAgICAgIHRoaXMubGFzdERyYXcuRU5ELnlcbiAgICApO1xuXG4gICAgaWYgKHRoaXMuaXNab29taW5nSW4pIHRoaXMuc2NhbGUgKz0gMC4wMDU7XG4gICAgaWYgKHRoaXMuaXNab29taW5nT3V0ICYmIHRoaXMuc2NhbGUgPiAwKSB0aGlzLnNjYWxlIC09IDAuMDA1O1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3NpbXVsYXRlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgX2RyYXdWZWxvY2l0eVZlY3RvciAoeDAsIHkwLCB4MSwgeTEpIHtcbiAgICBjb25zdCBzID0gNztcbiAgICBjb25zdCB3ID0gMC43O1xuICAgIGxldCBkeCA9IHgxIC0geDA7XG4gICAgbGV0IGR5ID0geTEgLSB5MDtcbiAgICBsZXQgYSA9IE1hdGguYXRhbihkeSAvIGR4KTtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9ICdibGFjayc7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSBzO1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4Lm1vdmVUbyh4MCwgeTApO1xuICAgIHRoaXMuY3R4LmxpbmVUbyh4MSwgeTEpO1xuICAgIHRoaXMuY3R4Lm1vdmVUbyh4MSwgeTEpO1xuICAgIGlmIChkeCA8IDApIHtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh4MSArIE1hdGguY29zKGEgLSB3KSAqIHMsIHkxICsgTWF0aC5zaW4oYSAtIHcpICogcyk7XG4gICAgICB0aGlzLmN0eC5saW5lVG8oeDEgKyBNYXRoLmNvcyhhICsgdykgKiBzLCB5MSArIE1hdGguc2luKGEgKyB3KSAqIHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN0eC5saW5lVG8oeDEgLSBNYXRoLmNvcyhhIC0gdykgKiBzLCB5MSAtIE1hdGguc2luKGEgLSB3KSAqIHMpO1xuICAgICAgdGhpcy5jdHgubGluZVRvKHgxIC0gTWF0aC5jb3MoYSArIHcpICogcywgeTEgLSBNYXRoLnNpbihhICsgdykgKiBzKTtcbiAgICB9XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gaW52ZXJ0U2VsZWN0IChpZCkge1xuICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBpZiAoZWxlLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICB9IGVsc2Uge1xuICAgIGVsZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0IChpZCkge1xuICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBpZiAoZWxlLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNlbGVjdCAoaWQpIHtcbiAgbGV0IGVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgaWYgKCFlbGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkTGlzdGVuZXIgKGlkLCBldmVudCwgZnVuYywgYmluZCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYy5iaW5kKGJpbmQpKTtcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3Ige1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gW3ggPSAwXSB7TnVtYmVyfVxuICAgKiBAcGFyYW0gW3kgPSAwXSB7TnVtYmVyfVxuICAgKi9cbiAgY29uc3RydWN0b3IgKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4ID8geCA6IDA7XG4gICAgdGhpcy55ID0geSA/IHkgOiAwO1xuICB9XG5cbiAgZ2V0IG1hZ25pdHVkZSAoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChcbiAgICAgIE1hdGgucG93KHRoaXMueCwgMikgK1xuICAgICAgTWF0aC5wb3codGhpcy55LCAyKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gb2JqZWN0XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzIChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgVmVjdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhIHtOdW1iZXJ9XG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XG4gICAqL1xuICBkb3QgKGEpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgIHRoaXMueCAqIGEsXG4gICAgICB0aGlzLnkgKiBhXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhIHtWZWN0b3J8TnVtYmVyfVxuICAgKiBAcmV0dXJucyB7VmVjdG9yfVxuICAgKi9cbiAgYWRkIChhKSB7XG4gICAgaWYgKFZlY3Rvci5pcyhhKSkge1xuICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgIHRoaXMueCArIGEueCxcbiAgICAgICAgdGhpcy55ICsgYS55XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICB0aGlzLnggKyBhLFxuICAgICAgICB0aGlzLnkgKyBhXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhIHtWZWN0b3J9XG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XG4gICAqL1xuICBkaWZmIChhKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICBhLnggLSB0aGlzLngsXG4gICAgICBhLnkgLSB0aGlzLnlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhIHtWZWN0b3J9XG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBkaXN0IChhKSB7XG4gICAgbGV0IGRpZmYgPSB0aGlzLmRpZmYoYSk7XG4gICAgcmV0dXJuIE1hdGguc3FydChcbiAgICAgIE1hdGgucG93KGRpZmYueCwgMikgK1xuICAgICAgTWF0aC5wb3coZGlmZi55LCAyKVxuICAgIClcbiAgfVxuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==