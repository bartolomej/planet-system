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
      ctx.fillStyle = this.color(0.45);

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
    ctx.arc(this.position.x, this.position.y, this.mass * 2, 0, 2 * Math.PI);
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

    addListener('zoom-in', 'mousedown', this._setZoomIn, this);
    addListener('zoom-in', 'mouseup', this._setZoomIn, this);
    addListener('zoom-out', 'mousedown', this._setZoomOut, this);
    addListener('zoom-out', 'mouseup', this._setZoomOut, this);
    addListener('create-mode', 'click', this._onPlanetCreate, this);
    addListener('move-mode', 'click', this._onMoveMode, this);
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
    window.addEventListener('resize', this._resizeCanvas.bind(this));
  }

  _setZoomIn() {
    this.isZoomingIn = !this.isZoomingIn;
  }

  _setZoomOut() {
    this.isZoomingOut = !this.isZoomingOut;
  }

  _initViewElements() {
    let create = document.getElementById('create-mode');
    let move = document.getElementById('move-mode');

    if (create.classList.contains('selected')) {
      create.classList.remove('selected');
    }

    if (!move.classList.contains('selected')) {
      move.classList.add('selected');
    }
  }

  _onPlanetCreate() {
    invertSelection('create-mode');
    invertSelection('move-mode');
    document.getElementById('container').style.cursor = 'crosshair';
    this.editMode = EDIT_MODES.CREATE_PLANETS;
  }

  _onMoveMode() {
    invertSelection('create-mode');
    invertSelection('move-mode');
    document.getElementById('container').style.cursor = 'move';
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

      this.translate.x += (e.clientX - this.lastMousePos.x) * (1 / this.scale);
      this.translate.y += (e.clientY - this.lastMousePos.y) * (1 / this.scale);
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
    }
  }

  _onMouseUp(e) {
    this.mouseDown = false;

    if (this.editMode === EDIT_MODES.CREATE_PLANETS) {
      this.planets.push(new _planet__WEBPACK_IMPORTED_MODULE_0__["default"](this.params, Math.random() * 10, new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](this.lastDraw.START.x + -this.translate.x, this.lastDraw.START.y + -this.translate.y), new _vector__WEBPACK_IMPORTED_MODULE_1__["default"]( // scale down vector for better mouse drawing precision
      (this.lastDraw.END.x - this.lastDraw.START.x) / 4, (this.lastDraw.END.y - this.lastDraw.START.y) / 4)));
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

  destroy() {
    cancelAnimationFrame(this.animation);
  }

  start() {
    // randomly initialize planets based on planet count param
    for (let i = 0; i < this.params.planetsCount; i++) {
      this.planets.push(new _planet__WEBPACK_IMPORTED_MODULE_0__["default"](this.params, Math.random() * 10, new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](Math.random() * this.canvas.width, Math.random() * this.canvas.height)));
    }

    this.animation = requestAnimationFrame(this._simulate.bind(this));
  }

  _simulate() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.translate.x / 2, this.translate.y / 2);
    this.ctx.translate(this.translate.x, this.translate.y);
    this.ctx.transform(this.scale, 0, 0, this.scale, 0, 0);

    for (let i = 0; i < this.planets.length; i++) {
      let other = [...this.planets.slice(0, i - 1), ...this.planets.slice(i, this.planets.length)];
      this.planets[i].update(other, this.params.speedC);
      this.planets[i].draw(this.ctx, this.params.showPath, this.params.showVelocityVectors, this.params.showAccVectors);
    }

    this.ctx.restore(); // draw velocity vector

    this.ctx.moveTo(this.lastDraw.START.x, this.lastDraw.START.y);
    this.ctx.lineTo(this.lastDraw.END.x, this.lastDraw.END.y);
    this.ctx.stroke();
    if (this.isZoomingIn) this.scale += 0.005;
    if (this.isZoomingOut) this.scale -= 0.005;
    requestAnimationFrame(this._simulate.bind(this));
  }

}

function invertSelection(id) {
  let ele = document.getElementById(id);

  if (ele.classList.contains('selected')) {
    ele.classList.remove('selected');
  } else {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wbGFuZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3IuanMiXSwibmFtZXMiOlsic2ltdWxhdGlvbiIsInBhcmFtcyIsInNwZWVkQyIsImdyYXZpdHlDIiwic2hvd1BhdGgiLCJwbGFuZXRzQ291bnQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwib25Mb2FkIiwiZ2V0QnlJZCIsIm9wZW5NZW51Iiwic3RhcnRTaW11bGF0aW9uIiwib25JbnB1dENoYW5nZSIsIm9uU3BlZWRDaGFuZ2UiLCJvblNob3dQYXRoQ2hhbmdlIiwib25TaG93VmVsb2NpdHlWZWN0b3JzQ2hhbmdlIiwib25TaG93QWNjVmVjdG9yc0NoYW5nZSIsInVwZGF0ZVZpZXdFbGVtZW50cyIsInBsYW5ldHNDSW5wdXQiLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwidmFsdWUiLCJpc05hTiIsImdyYXZpdHlDSW5wdXQiLCJjaGVja2VkIiwic3BlZWRDSW5wdXQiLCJzaG93VmVsb2NpdHlWZWN0b3JzIiwic2hvd0FjY1ZlY3RvcnMiLCJkZXN0cm95IiwiU2ltdWxhdGlvbiIsInN0YXJ0IiwiJCIsIm1vZGFsIiwiZmFkZUR1cmF0aW9uIiwiaWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiUGxhbmV0IiwiY29uc3RydWN0b3IiLCJtYXNzIiwicG9zaXRpb24iLCJ2ZWxvY2l0eSIsIlZlY3RvciIsImlzIiwiYWNjZWxlcmF0aW9uIiwiYyIsIk1hdGgiLCJyYW5kb20iLCJwYXRoIiwidGljayIsImNvbG9yIiwib3BhY2l0eSIsInJlcGxhY2UiLCJkcmF3IiwiY3R4Iiwic2hvd1ZWZWN0b3JzIiwic2hvd0FWZWN0b3JzIiwiYmVnaW5QYXRoIiwic3Ryb2tlU3R5bGUiLCJmaWxsU3R5bGUiLCJtb3ZlVG8iLCJ4IiwieSIsImFyYyIsIlBJIiwiY2xvc2VQYXRoIiwiZmlsbCIsImxpbmVUbyIsInN0cm9rZSIsInVwZGF0ZSIsInBsYW5ldHMiLCJwbGFuZXQiLCJnZXRBY2NlbGVyYXRpb24iLCJhZGQiLCJkb3QiLCJwdXNoIiwibGVuZ3RoIiwic3BsaWNlIiwiZiIsImdldEZvcmNlIiwiZGlmZiIsIkciLCJzcXJ0IiwiZGlzdCIsIkVESVRfTU9ERVMiLCJNT1ZFIiwiQ1JFQVRFX1BMQU5FVFMiLCJhbmltYXRpb24iLCJzY2FsZSIsImVkaXRNb2RlIiwiX2luaXRWaWV3RWxlbWVudHMiLCJ0cmFuc2xhdGUiLCJpc1pvb21pbmdJbiIsImlzWm9vbWluZ091dCIsIm1vdXNlRG93biIsImxhc3REcmF3IiwiU1RBUlQiLCJFTkQiLCJsYXN0TW91c2VQb3MiLCJjYW52YXMiLCJnZXRDb250ZXh0IiwiX3Jlc2l6ZUNhbnZhcyIsImFkZExpc3RlbmVyIiwiX29uTW91c2VEb3duIiwiX29uTW91c2VVcCIsIl9zZXRab29tSW4iLCJfc2V0Wm9vbU91dCIsIl9vblBsYW5ldENyZWF0ZSIsIl9vbk1vdmVNb2RlIiwiX29uTW91c2VNb3ZlIiwiYmluZCIsImNyZWF0ZSIsIm1vdmUiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsImludmVydFNlbGVjdGlvbiIsInN0eWxlIiwiY3Vyc29yIiwiZSIsImNsaWVudFgiLCJjbGllbnRZIiwibW91c2VQb3MiLCJ3aWR0aCIsImlubmVyV2lkdGgiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiaSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIl9zaW11bGF0ZSIsInNldFRyYW5zZm9ybSIsImNsZWFyUmVjdCIsInNhdmUiLCJ0cmFuc2Zvcm0iLCJvdGhlciIsInNsaWNlIiwicmVzdG9yZSIsImVsZSIsImV2ZW50IiwiZnVuYyIsIm1hZ25pdHVkZSIsInBv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SXRHLE1BQU0sQ0FBQ0MsRUFBUCxDQUFVcUcsQ0FBVixDQUFKLEVBQWtCO0FBQ2hCLGFBQU8sSUFBSXRHLE1BQUosQ0FDTCxLQUFLbUIsQ0FBTCxHQUFTbUYsQ0FBQyxDQUFDbkYsQ0FETixFQUVMLEtBQUtDLENBQUwsR0FBU2tGLENBQUMsQ0FBQ2xGLENBRk4sQ0FBUDtBQUlELEtBTEQsTUFLTztBQUNMLGFBQU8sSUFBSXBCLE1BQUosQ0FDTCxLQUFLbUIsQ0FBTCxHQUFTbUYsQ0FESixFQUVMLEtBQUtsRixDQUFMLEdBQVNrRixDQUZKLENBQVA7QUFJRDtBQUNGO0FBRUQ7Ozs7OztBQUlBaEUsTUFBSSxDQUFFZ0UsQ0FBRixFQUFLO0FBQ1AsV0FBTyxJQUFJdEcsTUFBSixDQUNMc0csQ0FBQyxDQUFDbkYsQ0FBRixHQUFNLEtBQUtBLENBRE4sRUFFTG1GLENBQUMsQ0FBQ2xGLENBQUYsR0FBTSxLQUFLQSxDQUZOLENBQVA7QUFJRDtBQUVEOzs7Ozs7QUFJQXFCLE1BQUksQ0FBRTZELENBQUYsRUFBSztBQUNQLFFBQUloRSxJQUFJLEdBQUcsS0FBS0EsSUFBTCxDQUFVZ0UsQ0FBVixDQUFYO0FBQ0EsV0FBT2xHLElBQUksQ0FBQ29DLElBQUwsQ0FDTHBDLElBQUksQ0FBQ2dHLEdBQUwsQ0FBUzlELElBQUksQ0FBQ25CLENBQWQsRUFBaUIsQ0FBakIsSUFDQWYsSUFBSSxDQUFDZ0csR0FBTCxDQUFTOUQsSUFBSSxDQUFDbEIsQ0FBZCxFQUFpQixDQUFqQixDQUZLLENBQVA7QUFJRDs7QUE1RXlCLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIlxuaW1wb3J0IFNpbXVsYXRpb24gZnJvbSBcIi4vc2ltdWxhdGlvblwiO1xuXG4vLyBUT0RPOiBpbXBsZW1lbnQgc3RhYmxlIG9yYml0cyBleGFtcGxlczogaHR0cHM6Ly9tYXRoLnN0YWNrZXhjaGFuZ2UuY29tL3F1ZXN0aW9ucy8xNjEzNzY1L3NpbXBsZS1zdGFibGUtbi1ib2R5LW9yYml0cy1pbi10aGUtcGxhbmUtd2l0aC1zb21lLWZpeGVkLWJvZGllcy1hbGxvd2VkXG5cbmxldCBzaW11bGF0aW9uID0gbnVsbDtcbmxldCBwYXJhbXMgPSB7XG4gIHNwZWVkQzogMC4xLFxuICBncmF2aXR5QzogMC4wMDIsXG4gIHNob3dQYXRoOiB0cnVlLFxuICBwbGFuZXRzQ291bnQ6IDEwLFxufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xuZ2V0QnlJZCgnb3Blbi1tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTWVudSk7XG5nZXRCeUlkKCdzdGFydC1zaW11bGF0aW9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydFNpbXVsYXRpb24pO1xuXG4vLyBwYXJhbXMgaW5wdXQgY2hhbmdlIGV2ZW50c1xuZ2V0QnlJZCgnZ3Jhdml0eS1jb25zdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25JbnB1dENoYW5nZSk7XG5nZXRCeUlkKCdzcGVlZC1jb25zdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25TcGVlZENoYW5nZSk7XG5nZXRCeUlkKCdwbGFuZXRzLWNvdW50JykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbklucHV0Q2hhbmdlKTtcbmdldEJ5SWQoJ3Nob3ctcGF0aCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25TaG93UGF0aENoYW5nZSk7XG5nZXRCeUlkKCdzaG93LXYtdmVjdG9ycycpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25TaG93VmVsb2NpdHlWZWN0b3JzQ2hhbmdlKTtcbmdldEJ5SWQoJ3Nob3ctYS12ZWN0b3JzJykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvblNob3dBY2NWZWN0b3JzQ2hhbmdlKTtcblxuZnVuY3Rpb24gb25Mb2FkICgpIHtcbiAgb3Blbk1lbnUoKTtcbiAgdXBkYXRlVmlld0VsZW1lbnRzKCk7XG4gIHN0YXJ0U2ltdWxhdGlvbigpO1xufVxuXG5cbmZ1bmN0aW9uIG9uSW5wdXRDaGFuZ2UgKCkge1xuICBsZXQgcGxhbmV0c0NJbnB1dCA9IE51bWJlci5wYXJzZUZsb2F0KGdldEJ5SWQoJ3BsYW5ldHMtY291bnQnKS52YWx1ZSk7XG4gIGlmICghaXNOYU4ocGxhbmV0c0NJbnB1dCkpIHBhcmFtcy5wbGFuZXRzQ291bnQgPSBwbGFuZXRzQ0lucHV0O1xuXG4gIGxldCBncmF2aXR5Q0lucHV0ID0gTnVtYmVyLnBhcnNlRmxvYXQoZ2V0QnlJZCgnZ3Jhdml0eS1jb25zdCcpLnZhbHVlKTtcbiAgaWYgKCFpc05hTihncmF2aXR5Q0lucHV0KSkgcGFyYW1zLmdyYXZpdHlDID0gZ3Jhdml0eUNJbnB1dDtcblxuICBwYXJhbXMuc2hvd1BhdGggPSBnZXRCeUlkKCdzaG93LXBhdGgnKS5jaGVja2VkO1xuXG4gIHN0YXJ0U2ltdWxhdGlvbigpO1xufVxuXG5mdW5jdGlvbiBvblNwZWVkQ2hhbmdlICgpIHtcbiAgbGV0IHNwZWVkQ0lucHV0ID0gTnVtYmVyLnBhcnNlRmxvYXQoZ2V0QnlJZCgnc3BlZWQtY29uc3QnKS52YWx1ZSk7XG4gIGlmICghaXNOYU4oc3BlZWRDSW5wdXQpKSBwYXJhbXMuc3BlZWRDID0gc3BlZWRDSW5wdXQ7XG4gIHNpbXVsYXRpb24ucGFyYW1zLnNwZWVkQyA9IHBhcmFtcy5zcGVlZEM7XG59XG5cbmZ1bmN0aW9uIG9uU2hvd1BhdGhDaGFuZ2UgKCkge1xuICAvLyBpZiBzaG93LXBhdGggaW5wdXQgY2hhbmdlcyBkb24ndCByZWluaXRpYWxpemUgc2ltdWxhdGlvblxuICBwYXJhbXMuc2hvd1BhdGggPSBnZXRCeUlkKCdzaG93LXBhdGgnKS5jaGVja2VkO1xuICBzaW11bGF0aW9uLnBhcmFtcy5zaG93UGF0aCA9IHBhcmFtcy5zaG93UGF0aDtcbn1cblxuZnVuY3Rpb24gb25TaG93VmVsb2NpdHlWZWN0b3JzQ2hhbmdlICgpIHtcbiAgcGFyYW1zLnNob3dWZWxvY2l0eVZlY3RvcnMgPSBnZXRCeUlkKCdzaG93LXYtdmVjdG9ycycpLmNoZWNrZWQ7XG4gIHNpbXVsYXRpb24ucGFyYW1zLnNob3dWZWxvY2l0eVZlY3RvcnMgPSBwYXJhbXMuc2hvd1ZlbG9jaXR5VmVjdG9ycztcbn1cblxuZnVuY3Rpb24gb25TaG93QWNjVmVjdG9yc0NoYW5nZSAoKSB7XG4gIHBhcmFtcy5zaG93QWNjVmVjdG9ycyA9IGdldEJ5SWQoJ3Nob3ctYS12ZWN0b3JzJykuY2hlY2tlZDtcbiAgc2ltdWxhdGlvbi5wYXJhbXMuc2hvd0FjY1ZlY3RvcnMgPSBwYXJhbXMuc2hvd0FjY1ZlY3RvcnM7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0U2ltdWxhdGlvbiAoKSB7XG4gIGlmIChzaW11bGF0aW9uKSB7XG4gICAgc2ltdWxhdGlvbi5kZXN0cm95KCk7XG4gICAgc2ltdWxhdGlvbiA9IG5ldyBTaW11bGF0aW9uKHBhcmFtcyk7XG4gICAgc2ltdWxhdGlvbi5zdGFydCgpO1xuICB9IGVsc2Uge1xuICAgIHNpbXVsYXRpb24gPSBuZXcgU2ltdWxhdGlvbihwYXJhbXMpO1xuICAgIHNpbXVsYXRpb24uc3RhcnQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVWaWV3RWxlbWVudHMgKCkge1xuICBnZXRCeUlkKCdncmF2aXR5LWNvbnN0JykudmFsdWUgPSBwYXJhbXMuZ3Jhdml0eUM7XG4gIGdldEJ5SWQoJ3NwZWVkLWNvbnN0JykudmFsdWUgPSBwYXJhbXMuc3BlZWRDO1xuICBnZXRCeUlkKCdwbGFuZXRzLWNvdW50JykudmFsdWUgPSBwYXJhbXMucGxhbmV0c0NvdW50O1xuICBnZXRCeUlkKCdzaG93LXBhdGgnKS5jaGVja2VkID0gcGFyYW1zLnNob3dQYXRoO1xufVxuXG5mdW5jdGlvbiBvcGVuTWVudSAoKSB7XG4gICQoXCIjaW50cm8tbW9kYWxcIikubW9kYWwoe1xuICAgIGZhZGVEdXJhdGlvbjogMTAwXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRCeUlkIChpZCkge1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xufSIsImltcG9ydCBWZWN0b3IgZnJvbSBcIi4vdmVjdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYW5ldCB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBbcGFyYW1zXSB7T2JqZWN0fVxuICAgKiBAcGFyYW0gW21hc3MgPSAxXSB7TnVtYmVyfVxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXSB7VmVjdG9yfVxuICAgKiBAcGFyYW0gW3ZlbG9jaXR5XSB7VmVjdG9yfVxuICAgKi9cbiAgY29uc3RydWN0b3IgKHBhcmFtcywgbWFzcywgcG9zaXRpb24sIHZlbG9jaXR5KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgdGhpcy5tYXNzID0gbWFzcyA/IG1hc3MgOiAxO1xuICAgIHRoaXMucG9zaXRpb24gPSBWZWN0b3IuaXMocG9zaXRpb24pID8gcG9zaXRpb24gOiBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy52ZWxvY2l0eSA9IFZlY3Rvci5pcyh2ZWxvY2l0eSkgPyB2ZWxvY2l0eSA6IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmMgPSBgcmdiYSgke01hdGgucmFuZG9tKCkqMjU1fSwgJHtNYXRoLnJhbmRvbSgpKjI1NX0sICR7TWF0aC5yYW5kb20oKSoyNTV9LCB4KWA7XG4gICAgdGhpcy5wYXRoID0gW107XG4gICAgdGhpcy50aWNrID0gMDtcbiAgfVxuXG4gIGNvbG9yIChvcGFjaXR5KSB7XG4gICAgcmV0dXJuIHRoaXMuYy5yZXBsYWNlKCd4Jywgb3BhY2l0eSk7XG4gIH1cblxuICBkcmF3IChjdHgsIHNob3dQYXRoID0gdHJ1ZSwgc2hvd1ZWZWN0b3JzLCBzaG93QVZlY3RvcnMpIHtcblxuICAgIGlmIChzaG93UGF0aCkge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJyZ2JhKDEsIDEsIDEsIDApXCI7XG4gICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcigwLjQ1KTtcbiAgICAgIGZvciAobGV0IHBvc2l0aW9uIG9mIHRoaXMucGF0aCkge1xuICAgICAgICBjdHgubW92ZVRvKHBvc2l0aW9uLnggLCBwb3NpdGlvbi55KTtcbiAgICAgICAgY3R4LmFyYyhwb3NpdGlvbi54LCBwb3NpdGlvbi55LCAyLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICB9XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguZmlsbCgpO1xuICAgIH1cblxuICAgIGlmIChzaG93VlZlY3RvcnMpIHtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI0ZGMDAwMFwiO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgICBjdHgubGluZVRvKHRoaXMucG9zaXRpb24ueCArIHRoaXMudmVsb2NpdHkueCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy52ZWxvY2l0eS55KTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG4gICAgaWYgKHNob3dBVmVjdG9ycykge1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAxMmZmXCI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICAgIGN0eC5saW5lVG8odGhpcy5wb3NpdGlvbi54ICsgdGhpcy5hY2NlbGVyYXRpb24ueCAqIDEwMCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5hY2NlbGVyYXRpb24ueSAqIDEwMCk7XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yKDEpO1xuICAgIGN0eC5hcmModGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMubWFzcyAqIDIsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIHRoaXMudGljaysrO1xuICB9XG5cbiAgdXBkYXRlIChwbGFuZXRzLCBzcGVlZEMpIHtcbiAgICBmb3IgKGxldCBwbGFuZXQgb2YgcGxhbmV0cykge1xuICAgICAgdGhpcy5hY2NlbGVyYXRpb24gPSB0aGlzLmdldEFjY2VsZXJhdGlvbihwbGFuZXQpO1xuICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHkuYWRkKHRoaXMuYWNjZWxlcmF0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uYWRkKHRoaXMudmVsb2NpdHkuZG90KHNwZWVkQykpO1xuICAgIGlmICh0aGlzLnRpY2sgJSA0ID09PSAwKSB7XG4gICAgICB0aGlzLnBhdGgucHVzaCh0aGlzLnBvc2l0aW9uKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGF0aC5sZW5ndGggPiAxNTApIHtcbiAgICAgIHRoaXMucGF0aC5zcGxpY2UoMCwgMSlcbiAgICB9XG4gIH1cblxuICBnZXRBY2NlbGVyYXRpb24gKHBsYW5ldCkge1xuICAgIGxldCBmID0gdGhpcy5nZXRGb3JjZShwbGFuZXQpO1xuICAgIGxldCBkaWZmID0gdGhpcy5wb3NpdGlvbi5kaWZmKHBsYW5ldC5wb3NpdGlvbik7XG4gICAgcmV0dXJuIGRpZmYuZG90KCBmIC8gdGhpcy5tYXNzKTtcbiAgfVxuXG4gIGdldEZvcmNlIChwbGFuZXQpIHtcbiAgICBsZXQgRyA9IHRoaXMucGFyYW1zLmdyYXZpdHlDID8gdGhpcy5wYXJhbXMuZ3Jhdml0eUMgOiAxO1xuICAgIHJldHVybiBHICogcGxhbmV0Lm1hc3MgKiB0aGlzLm1hc3MgLyBNYXRoLnNxcnQodGhpcy5wb3NpdGlvbi5kaXN0KHBsYW5ldC5wb3NpdGlvbikpO1xuICB9XG5cbn0iLCJpbXBvcnQgUGxhbmV0IGZyb20gXCIuL3BsYW5ldFwiO1xuaW1wb3J0IFZlY3RvciBmcm9tIFwiLi92ZWN0b3JcIjtcblxuXG5leHBvcnQgY29uc3QgRURJVF9NT0RFUyA9IHtcbiAgTU9WRTogMSxcbiAgQ1JFQVRFX1BMQU5FVFM6IDJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXVsYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yIChwYXJhbXMpIHtcbiAgICB0aGlzLmFuaW1hdGlvbiA9IG51bGw7XG4gICAgdGhpcy5wbGFuZXRzID0gW107XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgdGhpcy5lZGl0TW9kZSA9IEVESVRfTU9ERVMuTU9WRTtcbiAgICB0aGlzLl9pbml0Vmlld0VsZW1lbnRzKCk7XG4gICAgLy8gdHJhbnNsYXRpb24gc3RhdGVcbiAgICB0aGlzLnRyYW5zbGF0ZSA9IHsgeDogMCwgeTogMCB9O1xuICAgIC8vIHpvb20gc3RhdGVcbiAgICB0aGlzLmlzWm9vbWluZ0luID0gZmFsc2U7XG4gICAgdGhpcy5pc1pvb21pbmdPdXQgPSBmYWxzZTtcbiAgICAvLyBtb3VzZSBzdGF0ZVxuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gICAgdGhpcy5sYXN0RHJhdyA9IHsgU1RBUlQ6IHsgeDogMCwgeTogMCB9LCBFTkQ6IHsgeDogMCwgeTogMH0gfTtcbiAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IG51bGw7XG4gICAgLy8gY2FudmFzIGluaXRpYWxpemF0aW9uXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2tldGNoJyk7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuX3Jlc2l6ZUNhbnZhcygpO1xuICAgIC8vIGNhbnZhcyBtb3VzZSBldmVudHNcbiAgICBhZGRMaXN0ZW5lcignc2tldGNoJywgJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignc2tldGNoJywgJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNlVXAsIHRoaXMpO1xuICAgIC8vIHpvb20gb3V0L2luIGJ1dHRvbnMgZXZlbnRzXG4gICAgYWRkTGlzdGVuZXIoJ3pvb20taW4nLCAnbW91c2Vkb3duJywgdGhpcy5fc2V0Wm9vbUluLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignem9vbS1pbicsICdtb3VzZXVwJywgdGhpcy5fc2V0Wm9vbUluLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignem9vbS1vdXQnLCAnbW91c2Vkb3duJywgdGhpcy5fc2V0Wm9vbU91dCwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ3pvb20tb3V0JywgJ21vdXNldXAnLCB0aGlzLl9zZXRab29tT3V0LCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignY3JlYXRlLW1vZGUnLCAnY2xpY2snLCB0aGlzLl9vblBsYW5ldENyZWF0ZSwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ21vdmUtbW9kZScsICdjbGljaycsIHRoaXMuX29uTW92ZU1vZGUsIHRoaXMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fcmVzaXplQ2FudmFzLmJpbmQodGhpcykpO1xuICB9XG5cbiAgX3NldFpvb21JbiAoKSB7XG4gICAgdGhpcy5pc1pvb21pbmdJbiA9ICF0aGlzLmlzWm9vbWluZ0luO1xuICB9XG5cbiAgX3NldFpvb21PdXQgKCkge1xuICAgIHRoaXMuaXNab29taW5nT3V0ID0gIXRoaXMuaXNab29taW5nT3V0O1xuICB9XG5cbiAgX2luaXRWaWV3RWxlbWVudHMgKCkge1xuICAgIGxldCBjcmVhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLW1vZGUnKTtcbiAgICBsZXQgbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlLW1vZGUnKTtcblxuICAgIGlmIChjcmVhdGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgICBjcmVhdGUuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgaWYgKCFtb3ZlLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuICAgICAgbW92ZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgfVxuICB9XG5cbiAgX29uUGxhbmV0Q3JlYXRlICgpIHtcbiAgICBpbnZlcnRTZWxlY3Rpb24oJ2NyZWF0ZS1tb2RlJyk7XG4gICAgaW52ZXJ0U2VsZWN0aW9uKCdtb3ZlLW1vZGUnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuY3Vyc29yID0gJ2Nyb3NzaGFpcic7XG4gICAgdGhpcy5lZGl0TW9kZSA9IEVESVRfTU9ERVMuQ1JFQVRFX1BMQU5FVFM7XG4gIH1cblxuICBfb25Nb3ZlTW9kZSAoKSB7XG4gICAgaW52ZXJ0U2VsZWN0aW9uKCdjcmVhdGUtbW9kZScpO1xuICAgIGludmVydFNlbGVjdGlvbignbW92ZS1tb2RlJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmN1cnNvciA9ICdtb3ZlJztcbiAgICB0aGlzLmVkaXRNb2RlID0gRURJVF9NT0RFUy5NT1ZFO1xuICB9XG5cbiAgX29uTW91c2VNb3ZlIChlKSB7XG4gICAgLy8gc2tpcCBpZiBtb3VzZSBub3QgcHJlc3NlZFxuICAgIGlmICghdGhpcy5tb3VzZURvd24pIHJldHVybjtcblxuICAgIGlmICh0aGlzLmVkaXRNb2RlID09PSBFRElUX01PREVTLkNSRUFURV9QTEFORVRTKSB7XG4gICAgICB0aGlzLmxhc3REcmF3LkVORCA9IHtcbiAgICAgICAgeDogZS5jbGllbnRYLFxuICAgICAgICB5OiBlLmNsaWVudFlcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGlmIG1vdXNlIHBvc2l0aW9uIHVuc2V0XG4gICAgaWYgKCF0aGlzLmxhc3RNb3VzZVBvcykge1xuICAgICAgdGhpcy5sYXN0TW91c2VQb3MgPSB7XG4gICAgICAgIHg6IGUuY2xpZW50WCxcbiAgICAgICAgeTogZS5jbGllbnRZXG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNhbGN1bGF0ZSBtb3VzZSBwb3NpdGlvbiBkaWZmXG4gICAgaWYgKHRoaXMuZWRpdE1vZGUgPT09IEVESVRfTU9ERVMuTU9WRSkge1xuICAgICAgaWYgKCF0aGlzLmxhc3RNb3VzZVBvcykge1xuICAgICAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfVxuICAgICAgfVxuICAgICAgdGhpcy50cmFuc2xhdGUueCArPSAoZS5jbGllbnRYIC0gdGhpcy5sYXN0TW91c2VQb3MueCkgKiAoMS90aGlzLnNjYWxlKTtcbiAgICAgIHRoaXMudHJhbnNsYXRlLnkgKz0gKGUuY2xpZW50WSAtIHRoaXMubGFzdE1vdXNlUG9zLnkpICogKDEvdGhpcy5zY2FsZSk7XG4gICAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfVxuICAgIH1cbiAgfVxuXG4gIF9vbk1vdXNlRG93biAoZSkge1xuICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5lZGl0TW9kZSA9PT0gRURJVF9NT0RFUy5DUkVBVEVfUExBTkVUUykge1xuICAgICAgbGV0IG1vdXNlUG9zID0geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9O1xuICAgICAgdGhpcy5sYXN0RHJhdy5TVEFSVCA9IG1vdXNlUG9zO1xuICAgICAgdGhpcy5sYXN0RHJhdy5FTkQgPSBtb3VzZVBvcztcbiAgICB9XG4gIH1cblxuICBfb25Nb3VzZVVwIChlKSB7XG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICBpZiAodGhpcy5lZGl0TW9kZSA9PT0gRURJVF9NT0RFUy5DUkVBVEVfUExBTkVUUykge1xuICAgICAgdGhpcy5wbGFuZXRzLnB1c2gobmV3IFBsYW5ldChcbiAgICAgICAgdGhpcy5wYXJhbXMsXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKiAxMCxcbiAgICAgICAgbmV3IFZlY3RvcihcbiAgICAgICAgICB0aGlzLmxhc3REcmF3LlNUQVJULnggKyAoLXRoaXMudHJhbnNsYXRlLngpLFxuICAgICAgICAgIHRoaXMubGFzdERyYXcuU1RBUlQueSArICgtdGhpcy50cmFuc2xhdGUueSlcbiAgICAgICAgKSxcbiAgICAgICAgbmV3IFZlY3RvcihcbiAgICAgICAgICAvLyBzY2FsZSBkb3duIHZlY3RvciBmb3IgYmV0dGVyIG1vdXNlIGRyYXdpbmcgcHJlY2lzaW9uXG4gICAgICAgICAgKHRoaXMubGFzdERyYXcuRU5ELnggLSB0aGlzLmxhc3REcmF3LlNUQVJULngpIC8gNCxcbiAgICAgICAgICAodGhpcy5sYXN0RHJhdy5FTkQueSAtIHRoaXMubGFzdERyYXcuU1RBUlQueSkgLyA0XG4gICAgICAgICksXG4gICAgICApKTtcbiAgICB9XG4gICAgdGhpcy5sYXN0TW91c2VQb3MgPSBudWxsO1xuICAgIHRoaXMubGFzdERyYXcgPSB7IFNUQVJUOiB7IHg6IDAsIHk6IDAgfSwgRU5EOiB7IHg6IDAsIHk6IDB9IH1cbiAgfVxuXG4gIF9yZXNpemVDYW52YXMgKCkge1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb24pO1xuICB9XG5cbiAgc3RhcnQgKCkge1xuICAgIC8vIHJhbmRvbWx5IGluaXRpYWxpemUgcGxhbmV0cyBiYXNlZCBvbiBwbGFuZXQgY291bnQgcGFyYW1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFyYW1zLnBsYW5ldHNDb3VudDsgaSsrKSB7XG4gICAgICB0aGlzLnBsYW5ldHMucHVzaChuZXcgUGxhbmV0KFxuICAgICAgICB0aGlzLnBhcmFtcyxcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqIDEwLFxuICAgICAgICBuZXcgVmVjdG9yKFxuICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiB0aGlzLmNhbnZhcy53aWR0aCxcbiAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy5jYW52YXMuaGVpZ2h0XG4gICAgICAgIClcbiAgICAgICkpXG4gICAgfVxuICAgIHRoaXMuYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3NpbXVsYXRlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgX3NpbXVsYXRlICgpIHtcbiAgICB0aGlzLmN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuY3R4LnNhdmUoKTtcblxuICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh0aGlzLnRyYW5zbGF0ZS54LzIsIHRoaXMudHJhbnNsYXRlLnkvMik7XG4gICAgdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMudHJhbnNsYXRlLngsIHRoaXMudHJhbnNsYXRlLnkpO1xuICAgIHRoaXMuY3R4LnRyYW5zZm9ybSh0aGlzLnNjYWxlLCAwLCAwLCB0aGlzLnNjYWxlLCAwLCAwKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgb3RoZXIgPSBbLi4udGhpcy5wbGFuZXRzLnNsaWNlKDAsIGkgLSAxKSwgLi4udGhpcy5wbGFuZXRzLnNsaWNlKGksIHRoaXMucGxhbmV0cy5sZW5ndGgpXTtcbiAgICAgIHRoaXMucGxhbmV0c1tpXS51cGRhdGUob3RoZXIsIHRoaXMucGFyYW1zLnNwZWVkQyk7XG4gICAgICB0aGlzLnBsYW5ldHNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy5wYXJhbXMuc2hvd1BhdGgsIHRoaXMucGFyYW1zLnNob3dWZWxvY2l0eVZlY3RvcnMsIHRoaXMucGFyYW1zLnNob3dBY2NWZWN0b3JzKTtcbiAgICB9XG4gICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuXG4gICAgLy8gZHJhdyB2ZWxvY2l0eSB2ZWN0b3JcbiAgICB0aGlzLmN0eC5tb3ZlVG8odGhpcy5sYXN0RHJhdy5TVEFSVC54LCB0aGlzLmxhc3REcmF3LlNUQVJULnkpO1xuICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLmxhc3REcmF3LkVORC54LCB0aGlzLmxhc3REcmF3LkVORC55KTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcblxuICAgIGlmICh0aGlzLmlzWm9vbWluZ0luKSB0aGlzLnNjYWxlICs9IDAuMDA1O1xuICAgIGlmICh0aGlzLmlzWm9vbWluZ091dCkgdGhpcy5zY2FsZSAtPSAwLjAwNTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9zaW11bGF0ZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIGludmVydFNlbGVjdGlvbiAoaWQpIHtcbiAgbGV0IGVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgaWYgKGVsZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcbiAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgfSBlbHNlIHtcbiAgICBlbGUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRMaXN0ZW5lciAoaWQsIGV2ZW50LCBmdW5jLCBiaW5kKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jLmJpbmQoYmluZCkpO1xufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBbeCA9IDBdIHtOdW1iZXJ9XG4gICAqIEBwYXJhbSBbeSA9IDBdIHtOdW1iZXJ9XG4gICAqL1xuICBjb25zdHJ1Y3RvciAoeCwgeSkge1xuICAgIHRoaXMueCA9IHggPyB4IDogMDtcbiAgICB0aGlzLnkgPSB5ID8geSA6IDA7XG4gIH1cblxuICBnZXQgbWFnbml0dWRlICgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgTWF0aC5wb3codGhpcy54LCAyKSArXG4gICAgICBNYXRoLnBvdyh0aGlzLnksIDIpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBvYmplY3RcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXMgKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiBWZWN0b3I7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge051bWJlcn1cbiAgICogQHJldHVybnMge1ZlY3Rvcn1cbiAgICovXG4gIGRvdCAoYSkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgdGhpcy54ICogYSxcbiAgICAgIHRoaXMueSAqIGFcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge1ZlY3RvcnxOdW1iZXJ9XG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XG4gICAqL1xuICBhZGQgKGEpIHtcbiAgICBpZiAoVmVjdG9yLmlzKGEpKSB7XG4gICAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgdGhpcy54ICsgYS54LFxuICAgICAgICB0aGlzLnkgKyBhLnlcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgIHRoaXMueCArIGEsXG4gICAgICAgIHRoaXMueSArIGFcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge1ZlY3Rvcn1cbiAgICogQHJldHVybnMge1ZlY3Rvcn1cbiAgICovXG4gIGRpZmYgKGEpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgIGEueCAtIHRoaXMueCxcbiAgICAgIGEueSAtIHRoaXMueVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge1ZlY3Rvcn1cbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGRpc3QgKGEpIHtcbiAgICBsZXQgZGlmZiA9IHRoaXMuZGlmZihhKTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgTWF0aC5wb3coZGlmZi54LCAyKSArXG4gICAgICBNYXRoLnBvdyhkaWZmLnksIDIpXG4gICAgKVxuICB9XG5cbn0iXSwic291cmNlUm9vdCI6IiJ9