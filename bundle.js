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
  gravityC: 0.002,
  showPath: true,
  planetsCount: 10
};
window.addEventListener('load', onLoad);
getById('open-menu').addEventListener('click', openMenu);
getById('start-simulation').addEventListener('click', startSimulation); // params input change events

getById('gravity-const').addEventListener('input', onInputChange);
getById('speed-const').addEventListener('input', onSpeedChange);
getById('planets-count').addEventListener('input', onInputChange);
getById('show-path').addEventListener('input', onShowPathChange);
getById('show-v-vectors').addEventListener('input', onShowVelocityVectorsChange);
getById('show-a-vectors').addEventListener('input', onShowAccVectorsChange);

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
  params.showPath = getById('show-path').checked;
  startSimulation();
}

function onSpeedChange() {
  let speedCInput = Number.parseFloat(getById('speed-const').value);
  if (!isNaN(speedCInput)) params.speedC = speedCInput;
  simulation.params.speedC = params.speedC;
}

function onShowPathChange() {
  // if show-path input changes don't reinitialize simulation
  params.showPath = getById('show-path').checked;
  simulation.params.showPath = params.showPath;
}

function onShowVelocityVectorsChange() {
  params.showVelocityVectors = getById('show-v-vectors').checked;
  simulation.params.showVelocityVectors = params.showVelocityVectors;
}

function onShowAccVectorsChange() {
  params.showAccVectors = getById('show-a-vectors').checked;
  simulation.params.showAccVectors = params.showAccVectors;
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
      ctx.strokeStyle = "#FF0000";
      ctx.beginPath();
      ctx.moveTo(this.position.x, this.position.y);
      ctx.lineTo(this.position.x + this.velocity.x, this.position.y + this.velocity.y);
      ctx.closePath();
      ctx.stroke();
    }

    if (showAVectors) {
      ctx.strokeStyle = "#0012ff";
      ctx.beginPath();
      ctx.moveTo(this.position.x, this.position.y);
      ctx.lineTo(this.position.x + this.acceleration.x * 100, this.position.y + this.acceleration.y * 100);
      ctx.closePath();
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.fillStyle = this.color(1);
    ctx.arc(this.position.x, this.position.y, this.mass, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    this.tick++;
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
    this.editMode = EDIT_MODES.MOVE;

    this._initViewElements(); // translation state


    this.translate = {
      x: 0,
      y: 0
    };
    this.lockPosition = true;
    this.alert = null; // zoom state

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

    addListener('zoom-in', 'mousedown', this._setZoomIn, this);
    addListener('zoom-in', 'mouseup', this._setZoomIn, this);
    addListener('zoom-out', 'mousedown', this._setZoomOut, this);
    addListener('zoom-out', 'mouseup', this._setZoomOut, this);
    addListener('create-mode', 'click', this._onPlanetCreate, this);
    addListener('move-mode', 'click', this._onMoveMode, this);
    addListener('lock-position', 'click', this._onPositionLock, this);
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
    window.addEventListener('resize', this._resizeCanvas.bind(this));
  }

  _setZoomIn() {
    this.isZoomingIn = !this.isZoomingIn;
  }

  _setZoomOut() {
    this.isZoomingOut = !this.isZoomingOut;
  }

  _getScaleX() {
    return this.canvas.width / this.spanX * this.scale;
  }

  _getScaleY() {
    return this._getScaleX();
  }

  _getSpanX() {
    return this.spanX;
  }

  _getSpanY() {
    return this.canvas.height / this.canvas.width * this._getSpanX();
  }

  _initViewElements() {
    let create = document.getElementById('create-mode');
    let move = document.getElementById('move-mode');
    let lock = document.getElementById('lock-position');

    if (!lock.classList.contains('selected')) {
      lock.classList.add('selected');
    }

    if (create.classList.contains('selected')) {
      create.classList.remove('selected');
    }

    if (!move.classList.contains('selected')) {
      move.classList.add('selected');
    }

    document.getElementById('container').style.cursor = 'grab';
  }

  _onPositionLock() {
    invertSelect('lock-position');
    this.lockPosition = !this.lockPosition;
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

  _resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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

    if (this.lockPosition) {
      const massCenter = this._calculateMassCenter();

      this.ctx.translate(-massCenter.x, -massCenter.y);
    }

    for (let i = 0; i < this.planets.length; i++) {
      let other = [...this.planets.slice(0, i - 1), ...this.planets.slice(i, this.planets.length)];
      this.planets[i].update(other, this.params.speedC);
      this.planets[i].draw(this.ctx, this.params.showPath, this.params.showVelocityVectors, this.params.showAccVectors);
    }

    this.ctx.restore(); // draw velocity vector

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastDraw.START.x, this.lastDraw.START.y);
    this.ctx.lineTo(this.lastDraw.END.x, this.lastDraw.END.y);
    this.ctx.closePath();
    this.ctx.stroke();
    if (this.isZoomingIn) this.scale += 0.005;
    if (this.isZoomingOut && this.scale > 0) this.scale -= 0.005;
    requestAnimationFrame(this._simulate.bind(this));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wbGFuZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3IuanMiXSwibmFtZXMiOlsic2ltdWxhdGlvbiIsInBhcmFtcyIsInNwZWVkQyIsImdyYXZpdHlDIiwic2hvd1BhdGgiLCJwbGFuZXRzQ291bnQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwib25Mb2FkIiwiZ2V0QnlJZCIsIm9wZW5NZW51Iiwic3RhcnRTaW11bGF0aW9uIiwib25JbnB1dENoYW5nZSIsIm9uU3BlZWRDaGFuZ2UiLCJvblNob3dQYXRoQ2hhbmdlIiwib25TaG93VmVsb2NpdHlWZWN0b3JzQ2hhbmdlIiwib25TaG93QWNjVmVjdG9yc0NoYW5nZSIsInVwZGF0ZVZpZXdFbGVtZW50cyIsInBsYW5ldHNDSW5wdXQiLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwidmFsdWUiLCJpc05hTiIsImdyYXZpdHlDSW5wdXQiLCJjaGVja2VkIiwic3BlZWRDSW5wdXQiLCJzaG93VmVsb2NpdHlWZWN0b3JzIiwic2hvd0FjY1ZlY3RvcnMiLCJkZXN0cm95IiwiU2ltdWxhdGlvbiIsInN0YXJ0IiwiJCIsIm1vZGFsIiwiZmFkZUR1cmF0aW9uIiwiaWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiUGxhbmV0IiwiY29uc3RydWN0b3IiLCJtYXNzIiwicG9zaXRpb24iLCJ2ZWxvY2l0eSIsIlZlY3RvciIsImlzIiwiYWNjZWxlcmF0aW9uIiwiYyIsIk1hdGgiLCJyYW5kb20iLCJwYXRoIiwidGljayIsImNvbG9yIiwib3BhY2l0eSIsInJlcGxhY2UiLCJkcmF3IiwiY3R4Iiwic2hvd1ZWZWN0b3JzIiwic2hvd0FWZWN0b3JzIiwiYmVnaW5QYXRoIiwic3Ryb2tlU3R5bGUiLCJmaWxsU3R5bGUiLCJtb3ZlVG8iLCJ4IiwieSIsImFyYyIsIlBJIiwiY2xvc2VQYXRoIiwiZmlsbCIsImxpbmVUbyIsInN0cm9rZSIsInVwZGF0ZSIsInBsYW5ldHMiLCJwbGFuZXQiLCJnZXRBY2NlbGVyYXRpb24iLCJhZGQiLCJkb3QiLCJwdXNoIiwibGVuZ3RoIiwic3BsaWNlIiwiZiIsImdldEZvcmNlIiwiZGlmZiIsIkciLCJzcXJ0IiwiZGlzdCIsIkVESVRfTU9ERVMiLCJNT1ZFIiwiQ1JFQVRFX1BMQU5FVFMiLCJhbmltYXRpb24iLCJzY2FsZSIsInNwYW5YIiwiZWRpdE1vZGUiLCJfaW5pdFZpZXdFbGVtZW50cyIsInRyYW5zbGF0ZSIsImxvY2tQb3NpdGlvbiIsImFsZXJ0IiwiaXNab29taW5nSW4iLCJpc1pvb21pbmdPdXQiLCJtb3VzZURvd24iLCJsYXN0RHJhdyIsIlNUQVJUIiwiRU5EIiwibGFzdE1vdXNlUG9zIiwiY2FudmFzIiwiZ2V0Q29udGV4dCIsIl9yZXNpemVDYW52YXMiLCJhZGRMaXN0ZW5lciIsIl9vbk1vdXNlRG93biIsIl9vbk1vdXNlVXAiLCJfc2V0Wm9vbUluIiwiX3NldFpvb21PdXQiLCJfb25QbGFuZXRDcmVhdGUiLCJfb25Nb3ZlTW9kZSIsIl9vblBvc2l0aW9uTG9jayIsIl9vbk1vdXNlTW92ZSIsImJpbmQiLCJfZ2V0U2NhbGVYIiwid2lkdGgiLCJfZ2V0U2NhbGVZIiwiX2dldFNwYW5YIiwiX2dldFNwYW5ZIiwiaGVpZ2h0IiwiY3JlYXRlIiwibW92ZSIsImxvY2siLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsInN0eWxlIiwiY3Vyc29yIiwiaW52ZXJ0U2VsZWN0Iiwic2VsZWN0IiwidW5zZWxlY3QiLCJlIiwiY2xpZW50WCIsImNsaWVudFkiLCJtb3VzZVBvcyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsIl9jYWxjdWxhdGVNYXNzQ2VudGVyIiwiYXZnIiwiaSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiX3NpbXVsYXRlIiwic2V0VHJhbnNmb3JtIiwiY2xlYXJSZWN0Iiwic2F2ZSIsIm1hc3NDZW50ZXIiLCJvdGhlciIsInNsaWNlIiwicmVzdG9yZSIsImVsZSIsImV2ZW50IiwiZnVuYyIsIm1hZ25pdHVkZSIsInBvdyIsIm9iamVjdCIsImEiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtDQUdBOztBQUVBLElBQUlBLFVBQVUsR0FBRyxJQUFqQjtBQUNBLElBQUlDLE1BQU0sR0FBRztBQUNYQyxRQUFNLEVBQUUsR0FERztBQUVYQyxVQUFRLEVBQUUsS0FGQztBQUdYQyxVQUFRLEVBQUUsSUFIQztBQUlYQyxjQUFZLEVBQUU7QUFKSCxDQUFiO0FBT0FDLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0NDLE1BQWhDO0FBQ0FDLE9BQU8s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RixDQUZOLENBQVA7QUFJRCxLQUxELE1BS087QUFDTCxhQUFPLElBQUlwQixNQUFKLENBQ0wsS0FBS21CLENBQUwsR0FBU2dHLENBREosRUFFTCxLQUFLL0YsQ0FBTCxHQUFTK0YsQ0FGSixDQUFQO0FBSUQ7QUFDRjtBQUVEOzs7Ozs7QUFJQTdFLE1BQUksQ0FBRTZFLENBQUYsRUFBSztBQUNQLFdBQU8sSUFBSW5ILE1BQUosQ0FDTG1ILENBQUMsQ0FBQ2hHLENBQUYsR0FBTSxLQUFLQSxDQUROLEVBRUxnRyxDQUFDLENBQUMvRixDQUFGLEdBQU0sS0FBS0EsQ0FGTixDQUFQO0FBSUQ7QUFFRDs7Ozs7O0FBSUFxQixNQUFJLENBQUUwRSxDQUFGLEVBQUs7QUFDUCxRQUFJN0UsSUFBSSxHQUFHLEtBQUtBLElBQUwsQ0FBVTZFLENBQVYsQ0FBWDtBQUNBLFdBQU8vRyxJQUFJLENBQUNvQyxJQUFMLENBQ0xwQyxJQUFJLENBQUM2RyxHQUFMLENBQVMzRSxJQUFJLENBQUNuQixDQUFkLEVBQWlCLENBQWpCLElBQ0FmLElBQUksQ0FBQzZHLEdBQUwsQ0FBUzNFLElBQUksQ0FBQ2xCLENBQWQsRUFBaUIsQ0FBakIsQ0FGSyxDQUFQO0FBSUQ7O0FBNUV5QixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCJcbmltcG9ydCBTaW11bGF0aW9uIGZyb20gXCIuL3NpbXVsYXRpb25cIjtcblxuLy8gVE9ETzogaW1wbGVtZW50IHN0YWJsZSBvcmJpdHMgZXhhbXBsZXM6IGh0dHBzOi8vbWF0aC5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvMTYxMzc2NS9zaW1wbGUtc3RhYmxlLW4tYm9keS1vcmJpdHMtaW4tdGhlLXBsYW5lLXdpdGgtc29tZS1maXhlZC1ib2RpZXMtYWxsb3dlZFxuXG5sZXQgc2ltdWxhdGlvbiA9IG51bGw7XG5sZXQgcGFyYW1zID0ge1xuICBzcGVlZEM6IDAuMSxcbiAgZ3Jhdml0eUM6IDAuMDAyLFxuICBzaG93UGF0aDogdHJ1ZSxcbiAgcGxhbmV0c0NvdW50OiAxMCxcbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcbmdldEJ5SWQoJ29wZW4tbWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk1lbnUpO1xuZ2V0QnlJZCgnc3RhcnQtc2ltdWxhdGlvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRTaW11bGF0aW9uKTtcblxuLy8gcGFyYW1zIGlucHV0IGNoYW5nZSBldmVudHNcbmdldEJ5SWQoJ2dyYXZpdHktY29uc3QnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uSW5wdXRDaGFuZ2UpO1xuZ2V0QnlJZCgnc3BlZWQtY29uc3QnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uU3BlZWRDaGFuZ2UpO1xuZ2V0QnlJZCgncGxhbmV0cy1jb3VudCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25JbnB1dENoYW5nZSk7XG5nZXRCeUlkKCdzaG93LXBhdGgnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uU2hvd1BhdGhDaGFuZ2UpO1xuZ2V0QnlJZCgnc2hvdy12LXZlY3RvcnMnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uU2hvd1ZlbG9jaXR5VmVjdG9yc0NoYW5nZSk7XG5nZXRCeUlkKCdzaG93LWEtdmVjdG9ycycpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25TaG93QWNjVmVjdG9yc0NoYW5nZSk7XG5cbmZ1bmN0aW9uIG9uTG9hZCAoKSB7XG4gIG9wZW5NZW51KCk7XG4gIHVwZGF0ZVZpZXdFbGVtZW50cygpO1xuICBzdGFydFNpbXVsYXRpb24oKTtcbn1cblxuXG5mdW5jdGlvbiBvbklucHV0Q2hhbmdlICgpIHtcbiAgbGV0IHBsYW5ldHNDSW5wdXQgPSBOdW1iZXIucGFyc2VGbG9hdChnZXRCeUlkKCdwbGFuZXRzLWNvdW50JykudmFsdWUpO1xuICBpZiAoIWlzTmFOKHBsYW5ldHNDSW5wdXQpKSBwYXJhbXMucGxhbmV0c0NvdW50ID0gcGxhbmV0c0NJbnB1dDtcblxuICBsZXQgZ3Jhdml0eUNJbnB1dCA9IE51bWJlci5wYXJzZUZsb2F0KGdldEJ5SWQoJ2dyYXZpdHktY29uc3QnKS52YWx1ZSk7XG4gIGlmICghaXNOYU4oZ3Jhdml0eUNJbnB1dCkpIHBhcmFtcy5ncmF2aXR5QyA9IGdyYXZpdHlDSW5wdXQ7XG5cbiAgcGFyYW1zLnNob3dQYXRoID0gZ2V0QnlJZCgnc2hvdy1wYXRoJykuY2hlY2tlZDtcblxuICBzdGFydFNpbXVsYXRpb24oKTtcbn1cblxuZnVuY3Rpb24gb25TcGVlZENoYW5nZSAoKSB7XG4gIGxldCBzcGVlZENJbnB1dCA9IE51bWJlci5wYXJzZUZsb2F0KGdldEJ5SWQoJ3NwZWVkLWNvbnN0JykudmFsdWUpO1xuICBpZiAoIWlzTmFOKHNwZWVkQ0lucHV0KSkgcGFyYW1zLnNwZWVkQyA9IHNwZWVkQ0lucHV0O1xuICBzaW11bGF0aW9uLnBhcmFtcy5zcGVlZEMgPSBwYXJhbXMuc3BlZWRDO1xufVxuXG5mdW5jdGlvbiBvblNob3dQYXRoQ2hhbmdlICgpIHtcbiAgLy8gaWYgc2hvdy1wYXRoIGlucHV0IGNoYW5nZXMgZG9uJ3QgcmVpbml0aWFsaXplIHNpbXVsYXRpb25cbiAgcGFyYW1zLnNob3dQYXRoID0gZ2V0QnlJZCgnc2hvdy1wYXRoJykuY2hlY2tlZDtcbiAgc2ltdWxhdGlvbi5wYXJhbXMuc2hvd1BhdGggPSBwYXJhbXMuc2hvd1BhdGg7XG59XG5cbmZ1bmN0aW9uIG9uU2hvd1ZlbG9jaXR5VmVjdG9yc0NoYW5nZSAoKSB7XG4gIHBhcmFtcy5zaG93VmVsb2NpdHlWZWN0b3JzID0gZ2V0QnlJZCgnc2hvdy12LXZlY3RvcnMnKS5jaGVja2VkO1xuICBzaW11bGF0aW9uLnBhcmFtcy5zaG93VmVsb2NpdHlWZWN0b3JzID0gcGFyYW1zLnNob3dWZWxvY2l0eVZlY3RvcnM7XG59XG5cbmZ1bmN0aW9uIG9uU2hvd0FjY1ZlY3RvcnNDaGFuZ2UgKCkge1xuICBwYXJhbXMuc2hvd0FjY1ZlY3RvcnMgPSBnZXRCeUlkKCdzaG93LWEtdmVjdG9ycycpLmNoZWNrZWQ7XG4gIHNpbXVsYXRpb24ucGFyYW1zLnNob3dBY2NWZWN0b3JzID0gcGFyYW1zLnNob3dBY2NWZWN0b3JzO1xufVxuXG5mdW5jdGlvbiBzdGFydFNpbXVsYXRpb24gKCkge1xuICBpZiAoc2ltdWxhdGlvbikge1xuICAgIHNpbXVsYXRpb24uZGVzdHJveSgpO1xuICAgIHNpbXVsYXRpb24gPSBuZXcgU2ltdWxhdGlvbihwYXJhbXMpO1xuICAgIHNpbXVsYXRpb24uc3RhcnQoKTtcbiAgfSBlbHNlIHtcbiAgICBzaW11bGF0aW9uID0gbmV3IFNpbXVsYXRpb24ocGFyYW1zKTtcbiAgICBzaW11bGF0aW9uLnN0YXJ0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlVmlld0VsZW1lbnRzICgpIHtcbiAgZ2V0QnlJZCgnZ3Jhdml0eS1jb25zdCcpLnZhbHVlID0gcGFyYW1zLmdyYXZpdHlDO1xuICBnZXRCeUlkKCdzcGVlZC1jb25zdCcpLnZhbHVlID0gcGFyYW1zLnNwZWVkQztcbiAgZ2V0QnlJZCgncGxhbmV0cy1jb3VudCcpLnZhbHVlID0gcGFyYW1zLnBsYW5ldHNDb3VudDtcbiAgZ2V0QnlJZCgnc2hvdy1wYXRoJykuY2hlY2tlZCA9IHBhcmFtcy5zaG93UGF0aDtcbn1cblxuZnVuY3Rpb24gb3Blbk1lbnUgKCkge1xuICAkKFwiI2ludHJvLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBmYWRlRHVyYXRpb246IDEwMFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0QnlJZCAoaWQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gXCIuL3ZlY3RvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGFuZXQge1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gW3BhcmFtc10ge09iamVjdH1cbiAgICogQHBhcmFtIFttYXNzID0gMV0ge051bWJlcn1cbiAgICogQHBhcmFtIFtwb3NpdGlvbl0ge1ZlY3Rvcn1cbiAgICogQHBhcmFtIFt2ZWxvY2l0eV0ge1ZlY3Rvcn1cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwYXJhbXMsIG1hc3MsIHBvc2l0aW9uLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMubWFzcyA9IG1hc3MgPyBtYXNzIDogMTtcbiAgICB0aGlzLnBvc2l0aW9uID0gVmVjdG9yLmlzKHBvc2l0aW9uKSA/IHBvc2l0aW9uIDogbmV3IFZlY3RvcigpO1xuICAgIHRoaXMudmVsb2NpdHkgPSBWZWN0b3IuaXModmVsb2NpdHkpID8gdmVsb2NpdHkgOiBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5hY2NlbGVyYXRpb24gPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5jID0gYHJnYmEoJHtNYXRoLnJhbmRvbSgpKjI1NX0sICR7TWF0aC5yYW5kb20oKSoyNTV9LCAke01hdGgucmFuZG9tKCkqMjU1fSwgeClgO1xuICAgIHRoaXMucGF0aCA9IFtdO1xuICAgIHRoaXMudGljayA9IDA7XG4gIH1cblxuICBjb2xvciAob3BhY2l0eSkge1xuICAgIHJldHVybiB0aGlzLmMucmVwbGFjZSgneCcsIG9wYWNpdHkpO1xuICB9XG5cbiAgZHJhdyAoY3R4LCBzaG93UGF0aCA9IHRydWUsIHNob3dWVmVjdG9ycywgc2hvd0FWZWN0b3JzKSB7XG5cbiAgICBpZiAoc2hvd1BhdGgpIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmdiYSgxLCAxLCAxLCAwKVwiO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3IoMC4zKTtcbiAgICAgIGZvciAobGV0IHBvc2l0aW9uIG9mIHRoaXMucGF0aCkge1xuICAgICAgICBjdHgubW92ZVRvKHBvc2l0aW9uLnggLCBwb3NpdGlvbi55KTtcbiAgICAgICAgY3R4LmFyYyhwb3NpdGlvbi54LCBwb3NpdGlvbi55LCAyLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICB9XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguZmlsbCgpO1xuICAgIH1cblxuICAgIGlmIChzaG93VlZlY3RvcnMpIHtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI0ZGMDAwMFwiO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgICBjdHgubGluZVRvKHRoaXMucG9zaXRpb24ueCArIHRoaXMudmVsb2NpdHkueCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy52ZWxvY2l0eS55KTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG4gICAgaWYgKHNob3dBVmVjdG9ycykge1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAxMmZmXCI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICAgIGN0eC5saW5lVG8odGhpcy5wb3NpdGlvbi54ICsgdGhpcy5hY2NlbGVyYXRpb24ueCAqIDEwMCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5hY2NlbGVyYXRpb24ueSAqIDEwMCk7XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yKDEpO1xuICAgIGN0eC5hcmModGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMubWFzcywgMCwgMiAqIE1hdGguUEkpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgdGhpcy50aWNrKys7XG4gIH1cblxuICB1cGRhdGUgKHBsYW5ldHMsIHNwZWVkQykge1xuICAgIGZvciAobGV0IHBsYW5ldCBvZiBwbGFuZXRzKSB7XG4gICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IHRoaXMuZ2V0QWNjZWxlcmF0aW9uKHBsYW5ldCk7XG4gICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5hZGQodGhpcy5hY2NlbGVyYXRpb24pO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy52ZWxvY2l0eS5kb3Qoc3BlZWRDKSk7XG4gICAgaWYgKHRoaXMudGljayAlIDQgPT09IDApIHtcbiAgICAgIHRoaXMucGF0aC5wdXNoKHRoaXMucG9zaXRpb24pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXRoLmxlbmd0aCA+IDE1MCkge1xuICAgICAgdGhpcy5wYXRoLnNwbGljZSgwLCAxKVxuICAgIH1cbiAgfVxuXG4gIGdldEFjY2VsZXJhdGlvbiAocGxhbmV0KSB7XG4gICAgbGV0IGYgPSB0aGlzLmdldEZvcmNlKHBsYW5ldCk7XG4gICAgbGV0IGRpZmYgPSB0aGlzLnBvc2l0aW9uLmRpZmYocGxhbmV0LnBvc2l0aW9uKTtcbiAgICByZXR1cm4gZGlmZi5kb3QoIGYgLyB0aGlzLm1hc3MpO1xuICB9XG5cbiAgZ2V0Rm9yY2UgKHBsYW5ldCkge1xuICAgIGxldCBHID0gdGhpcy5wYXJhbXMuZ3Jhdml0eUMgPyB0aGlzLnBhcmFtcy5ncmF2aXR5QyA6IDE7XG4gICAgcmV0dXJuIEcgKiBwbGFuZXQubWFzcyAqIHRoaXMubWFzcyAvIE1hdGguc3FydCh0aGlzLnBvc2l0aW9uLmRpc3QocGxhbmV0LnBvc2l0aW9uKSk7XG4gIH1cblxufSIsImltcG9ydCBQbGFuZXQgZnJvbSBcIi4vcGxhbmV0XCI7XG5pbXBvcnQgVmVjdG9yIGZyb20gXCIuL3ZlY3RvclwiO1xuXG5cbmV4cG9ydCBjb25zdCBFRElUX01PREVTID0ge1xuICBNT1ZFOiAxLFxuICBDUkVBVEVfUExBTkVUUzogMlxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltdWxhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IgKHBhcmFtcykge1xuICAgIHRoaXMuYW5pbWF0aW9uID0gbnVsbDtcbiAgICB0aGlzLnBsYW5ldHMgPSBbXTtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgICB0aGlzLnNwYW5YID0gNTAwO1xuICAgIHRoaXMuZWRpdE1vZGUgPSBFRElUX01PREVTLk1PVkU7XG4gICAgdGhpcy5faW5pdFZpZXdFbGVtZW50cygpO1xuICAgIC8vIHRyYW5zbGF0aW9uIHN0YXRlXG4gICAgdGhpcy50cmFuc2xhdGUgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICB0aGlzLmxvY2tQb3NpdGlvbiA9IHRydWU7XG4gICAgdGhpcy5hbGVydCA9IG51bGw7XG4gICAgLy8gem9vbSBzdGF0ZVxuICAgIHRoaXMuaXNab29taW5nSW4gPSBmYWxzZTtcbiAgICB0aGlzLmlzWm9vbWluZ091dCA9IGZhbHNlO1xuICAgIC8vIG1vdXNlIHN0YXRlXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICB0aGlzLmxhc3REcmF3ID0geyBTVEFSVDogeyB4OiAwLCB5OiAwIH0sIEVORDogeyB4OiAwLCB5OiAwIH0gfTtcbiAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IG51bGw7XG4gICAgLy8gY2FudmFzIGluaXRpYWxpemF0aW9uXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2tldGNoJyk7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuX3Jlc2l6ZUNhbnZhcygpO1xuICAgIC8vIGNhbnZhcyBtb3VzZSBldmVudHNcbiAgICBhZGRMaXN0ZW5lcignc2tldGNoJywgJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignc2tldGNoJywgJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNlVXAsIHRoaXMpO1xuICAgIC8vIHpvb20gb3V0L2luIGJ1dHRvbnMgZXZlbnRzXG4gICAgYWRkTGlzdGVuZXIoJ3pvb20taW4nLCAnbW91c2Vkb3duJywgdGhpcy5fc2V0Wm9vbUluLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignem9vbS1pbicsICdtb3VzZXVwJywgdGhpcy5fc2V0Wm9vbUluLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignem9vbS1vdXQnLCAnbW91c2Vkb3duJywgdGhpcy5fc2V0Wm9vbU91dCwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ3pvb20tb3V0JywgJ21vdXNldXAnLCB0aGlzLl9zZXRab29tT3V0LCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignY3JlYXRlLW1vZGUnLCAnY2xpY2snLCB0aGlzLl9vblBsYW5ldENyZWF0ZSwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ21vdmUtbW9kZScsICdjbGljaycsIHRoaXMuX29uTW92ZU1vZGUsIHRoaXMpO1xuICAgIGFkZExpc3RlbmVyKCdsb2NrLXBvc2l0aW9uJywgJ2NsaWNrJywgdGhpcy5fb25Qb3NpdGlvbkxvY2ssIHRoaXMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fcmVzaXplQ2FudmFzLmJpbmQodGhpcykpO1xuICB9XG5cbiAgX3NldFpvb21JbiAoKSB7XG4gICAgdGhpcy5pc1pvb21pbmdJbiA9ICF0aGlzLmlzWm9vbWluZ0luO1xuICB9XG5cbiAgX3NldFpvb21PdXQgKCkge1xuICAgIHRoaXMuaXNab29taW5nT3V0ID0gIXRoaXMuaXNab29taW5nT3V0O1xuICB9XG5cbiAgX2dldFNjYWxlWCAoKSB7XG4gICAgcmV0dXJuICh0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMuc3BhblgpICogdGhpcy5zY2FsZTtcbiAgfVxuXG4gIF9nZXRTY2FsZVkgKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRTY2FsZVgoKTtcbiAgfVxuXG4gIF9nZXRTcGFuWCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3Bhblg7XG4gIH1cblxuICBfZ2V0U3BhblkgKCkge1xuICAgIHJldHVybiB0aGlzLmNhbnZhcy5oZWlnaHQgLyB0aGlzLmNhbnZhcy53aWR0aCAqIHRoaXMuX2dldFNwYW5YKCk7XG4gIH1cblxuICBfaW5pdFZpZXdFbGVtZW50cyAoKSB7XG4gICAgbGV0IGNyZWF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtbW9kZScpO1xuICAgIGxldCBtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtbW9kZScpO1xuICAgIGxldCBsb2NrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2stcG9zaXRpb24nKTtcblxuICAgIGlmICghbG9jay5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcbiAgICAgIGxvY2suY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgaWYgKGNyZWF0ZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcbiAgICAgIGNyZWF0ZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgIH1cbiAgICBpZiAoIW1vdmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgICBtb3ZlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuY3Vyc29yID0gJ2dyYWInO1xuICB9XG5cbiAgX29uUG9zaXRpb25Mb2NrICgpIHtcbiAgICBpbnZlcnRTZWxlY3QoJ2xvY2stcG9zaXRpb24nKTtcbiAgICB0aGlzLmxvY2tQb3NpdGlvbiA9ICF0aGlzLmxvY2tQb3NpdGlvbjtcbiAgfVxuXG4gIF9vblBsYW5ldENyZWF0ZSAoKSB7XG4gICAgc2VsZWN0KCdjcmVhdGUtbW9kZScpO1xuICAgIHVuc2VsZWN0KCdtb3ZlLW1vZGUnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuY3Vyc29yID0gJ2Nyb3NzaGFpcic7XG4gICAgdGhpcy5lZGl0TW9kZSA9IEVESVRfTU9ERVMuQ1JFQVRFX1BMQU5FVFM7XG4gIH1cblxuICBfb25Nb3ZlTW9kZSAoKSB7XG4gICAgdW5zZWxlY3QoJ2NyZWF0ZS1tb2RlJyk7XG4gICAgc2VsZWN0KCdtb3ZlLW1vZGUnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuY3Vyc29yID0gJ2dyYWInO1xuICAgIHRoaXMuZWRpdE1vZGUgPSBFRElUX01PREVTLk1PVkU7XG4gIH1cblxuICBfb25Nb3VzZU1vdmUgKGUpIHtcbiAgICAvLyBza2lwIGlmIG1vdXNlIG5vdCBwcmVzc2VkXG4gICAgaWYgKCF0aGlzLm1vdXNlRG93bikgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuZWRpdE1vZGUgPT09IEVESVRfTU9ERVMuQ1JFQVRFX1BMQU5FVFMpIHtcbiAgICAgIHRoaXMubGFzdERyYXcuRU5EID0geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9O1xuICAgIH1cbiAgICAvLyBpZiBtb3VzZSBwb3NpdGlvbiB1bnNldFxuICAgIGlmICghdGhpcy5sYXN0TW91c2VQb3MpIHtcbiAgICAgIHRoaXMubGFzdE1vdXNlUG9zID0geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9XG4gICAgfVxuICAgIC8vIGNhbGN1bGF0ZSBtb3VzZSBwb3NpdGlvbiBkaWZmXG4gICAgaWYgKHRoaXMuZWRpdE1vZGUgPT09IEVESVRfTU9ERVMuTU9WRSkge1xuICAgICAgaWYgKCF0aGlzLmxhc3RNb3VzZVBvcykge1xuICAgICAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfVxuICAgICAgfVxuICAgICAgdGhpcy50cmFuc2xhdGUueCArPSAoZS5jbGllbnRYIC0gdGhpcy5sYXN0TW91c2VQb3MueCkgKiAyIC8gdGhpcy5fZ2V0U2NhbGVYKCk7XG4gICAgICB0aGlzLnRyYW5zbGF0ZS55ICs9IChlLmNsaWVudFkgLSB0aGlzLmxhc3RNb3VzZVBvcy55KSAqIDIgLyB0aGlzLl9nZXRTY2FsZVkoKTtcbiAgICAgIHRoaXMubGFzdE1vdXNlUG9zID0geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9O1xuICAgIH1cbiAgfVxuXG4gIF9vbk1vdXNlRG93biAoZSkge1xuICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5lZGl0TW9kZSA9PT0gRURJVF9NT0RFUy5DUkVBVEVfUExBTkVUUykge1xuICAgICAgbGV0IG1vdXNlUG9zID0geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9O1xuICAgICAgdGhpcy5sYXN0RHJhdy5TVEFSVCA9IG1vdXNlUG9zO1xuICAgICAgdGhpcy5sYXN0RHJhdy5FTkQgPSBtb3VzZVBvcztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWRpdE1vZGUgPT09IEVESVRfTU9ERVMuTU9WRSkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmN1cnNvciA9ICdncmFiYmluZyc7XG4gICAgfVxuICB9XG5cbiAgX29uTW91c2VVcCAoZSkge1xuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuZWRpdE1vZGUgPT09IEVESVRfTU9ERVMuQ1JFQVRFX1BMQU5FVFMpIHtcbiAgICAgIHRoaXMucGxhbmV0cy5wdXNoKG5ldyBQbGFuZXQoXG4gICAgICAgIHRoaXMucGFyYW1zLFxuICAgICAgICBNYXRoLnJhbmRvbSgpICogMTAgKyA1LFxuICAgICAgICBuZXcgVmVjdG9yKFxuICAgICAgICAgICgodGhpcy5sYXN0RHJhdy5TVEFSVC54IC0gKHRoaXMuY2FudmFzLndpZHRoIC8gMikpIC8gdGhpcy5fZ2V0U2NhbGVYKCkpICsgKC10aGlzLnRyYW5zbGF0ZS54KSxcbiAgICAgICAgICAoKHRoaXMubGFzdERyYXcuU1RBUlQueSAtICh0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKSkgLyB0aGlzLl9nZXRTY2FsZVkoKSkgKyAoLXRoaXMudHJhbnNsYXRlLnkpXG4gICAgICAgICksXG4gICAgICAgIG5ldyBWZWN0b3IoXG4gICAgICAgICAgLy8gc2NhbGUgZG93biB2ZWN0b3IgZm9yIGJldHRlciBtb3VzZSBkcmF3aW5nIHByZWNpc2lvblxuICAgICAgICAgICh0aGlzLmxhc3REcmF3LkVORC54IC0gdGhpcy5sYXN0RHJhdy5TVEFSVC54KSxcbiAgICAgICAgICAodGhpcy5sYXN0RHJhdy5FTkQueSAtIHRoaXMubGFzdERyYXcuU1RBUlQueSlcbiAgICAgICAgKSxcbiAgICAgICkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5lZGl0TW9kZSA9PT0gRURJVF9NT0RFUy5NT1ZFKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuY3Vyc29yID0gJ2dyYWInO1xuICAgIH1cbiAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IG51bGw7XG4gICAgdGhpcy5sYXN0RHJhdyA9IHsgU1RBUlQ6IHsgeDogMCwgeTogMCB9LCBFTkQ6IHsgeDogMCwgeTogMCB9IH1cbiAgfVxuXG4gIF9yZXNpemVDYW52YXMgKCkge1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICB9XG5cbiAgX2NhbGN1bGF0ZU1hc3NDZW50ZXIgKCkge1xuICAgIGxldCBhdmcgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGxhbmV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXZnLnggKz0gdGhpcy5wbGFuZXRzW2ldLnBvc2l0aW9uLng7XG4gICAgICBhdmcueSArPSB0aGlzLnBsYW5ldHNbaV0ucG9zaXRpb24ueTtcbiAgICB9XG4gICAgYXZnLnggPSBhdmcueCAvIHRoaXMucGxhbmV0cy5sZW5ndGg7XG4gICAgYXZnLnkgPSBhdmcueSAvIHRoaXMucGxhbmV0cy5sZW5ndGg7XG4gICAgcmV0dXJuIGF2ZztcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uKTtcbiAgfVxuXG4gIHN0YXJ0ICgpIHtcbiAgICAvLyByYW5kb21seSBpbml0aWFsaXplIHBsYW5ldHMgYmFzZWQgb24gcGxhbmV0IGNvdW50IHBhcmFtXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcmFtcy5wbGFuZXRzQ291bnQ7IGkrKykge1xuICAgICAgdGhpcy5wbGFuZXRzLnB1c2gobmV3IFBsYW5ldChcbiAgICAgICAgdGhpcy5wYXJhbXMsXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKiAxMCArIDMsXG4gICAgICAgIG5ldyBWZWN0b3IoXG4gICAgICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogdGhpcy5zcGFuWCAvIDMsXG4gICAgICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogdGhpcy5zcGFuWCAvIDNcbiAgICAgICAgKVxuICAgICAgKSlcbiAgICB9XG4gICAgdGhpcy5hbmltYXRpb24gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fc2ltdWxhdGUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBfc2ltdWxhdGUgKCkge1xuICAgIHRoaXMuY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuXG4gICAgdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMuY2FudmFzLndpZHRoIC8gMiwgdGhpcy5jYW52YXMuaGVpZ2h0IC8gMik7XG4gICAgdGhpcy5jdHguc2NhbGUodGhpcy5fZ2V0U2NhbGVYKCksIHRoaXMuX2dldFNjYWxlWSgpKTtcbiAgICB0aGlzLmN0eC50cmFuc2xhdGUodGhpcy50cmFuc2xhdGUueCwgdGhpcy50cmFuc2xhdGUueSk7XG5cbiAgICBpZiAodGhpcy5sb2NrUG9zaXRpb24pIHtcbiAgICAgIGNvbnN0IG1hc3NDZW50ZXIgPSB0aGlzLl9jYWxjdWxhdGVNYXNzQ2VudGVyKCk7XG4gICAgICB0aGlzLmN0eC50cmFuc2xhdGUoLW1hc3NDZW50ZXIueCwgLW1hc3NDZW50ZXIueSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBvdGhlciA9IFsuLi50aGlzLnBsYW5ldHMuc2xpY2UoMCwgaSAtIDEpLCAuLi50aGlzLnBsYW5ldHMuc2xpY2UoaSwgdGhpcy5wbGFuZXRzLmxlbmd0aCldO1xuICAgICAgdGhpcy5wbGFuZXRzW2ldLnVwZGF0ZShvdGhlciwgdGhpcy5wYXJhbXMuc3BlZWRDKTtcbiAgICAgIHRoaXMucGxhbmV0c1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLnBhcmFtcy5zaG93UGF0aCwgdGhpcy5wYXJhbXMuc2hvd1ZlbG9jaXR5VmVjdG9ycywgdGhpcy5wYXJhbXMuc2hvd0FjY1ZlY3RvcnMpO1xuICAgIH1cbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG5cbiAgICAvLyBkcmF3IHZlbG9jaXR5IHZlY3RvclxuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4Lm1vdmVUbyh0aGlzLmxhc3REcmF3LlNUQVJULngsIHRoaXMubGFzdERyYXcuU1RBUlQueSk7XG4gICAgdGhpcy5jdHgubGluZVRvKHRoaXMubGFzdERyYXcuRU5ELngsIHRoaXMubGFzdERyYXcuRU5ELnkpO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuXG4gICAgaWYgKHRoaXMuaXNab29taW5nSW4pIHRoaXMuc2NhbGUgKz0gMC4wMDU7XG4gICAgaWYgKHRoaXMuaXNab29taW5nT3V0ICYmIHRoaXMuc2NhbGUgPiAwKSB0aGlzLnNjYWxlIC09IDAuMDA1O1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3NpbXVsYXRlLmJpbmQodGhpcykpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gaW52ZXJ0U2VsZWN0IChpZCkge1xuICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBpZiAoZWxlLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICB9IGVsc2Uge1xuICAgIGVsZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0IChpZCkge1xuICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBpZiAoZWxlLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNlbGVjdCAoaWQpIHtcbiAgbGV0IGVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgaWYgKCFlbGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkTGlzdGVuZXIgKGlkLCBldmVudCwgZnVuYywgYmluZCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYy5iaW5kKGJpbmQpKTtcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3Ige1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gW3ggPSAwXSB7TnVtYmVyfVxuICAgKiBAcGFyYW0gW3kgPSAwXSB7TnVtYmVyfVxuICAgKi9cbiAgY29uc3RydWN0b3IgKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4ID8geCA6IDA7XG4gICAgdGhpcy55ID0geSA/IHkgOiAwO1xuICB9XG5cbiAgZ2V0IG1hZ25pdHVkZSAoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChcbiAgICAgIE1hdGgucG93KHRoaXMueCwgMikgK1xuICAgICAgTWF0aC5wb3codGhpcy55LCAyKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gb2JqZWN0XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzIChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgVmVjdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhIHtOdW1iZXJ9XG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XG4gICAqL1xuICBkb3QgKGEpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgIHRoaXMueCAqIGEsXG4gICAgICB0aGlzLnkgKiBhXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhIHtWZWN0b3J8TnVtYmVyfVxuICAgKiBAcmV0dXJucyB7VmVjdG9yfVxuICAgKi9cbiAgYWRkIChhKSB7XG4gICAgaWYgKFZlY3Rvci5pcyhhKSkge1xuICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgIHRoaXMueCArIGEueCxcbiAgICAgICAgdGhpcy55ICsgYS55XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICB0aGlzLnggKyBhLFxuICAgICAgICB0aGlzLnkgKyBhXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhIHtWZWN0b3J9XG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XG4gICAqL1xuICBkaWZmIChhKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICBhLnggLSB0aGlzLngsXG4gICAgICBhLnkgLSB0aGlzLnlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhIHtWZWN0b3J9XG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBkaXN0IChhKSB7XG4gICAgbGV0IGRpZmYgPSB0aGlzLmRpZmYoYSk7XG4gICAgcmV0dXJuIE1hdGguc3FydChcbiAgICAgIE1hdGgucG93KGRpZmYueCwgMikgK1xuICAgICAgTWF0aC5wb3coZGlmZi55LCAyKVxuICAgIClcbiAgfVxuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==