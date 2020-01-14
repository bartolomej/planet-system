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
  document.getElementById('btn-container').classList.add('animate-in');
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
    addListener('show-a-vectors', 'click', this._onShowAVectors, this); // register info message listeners

    Info.register('Zoom in', 'zoom-in');
    Info.register('Zoom out', 'zoom-out');
    Info.register('Create planets', 'create-mode');
    Info.register('Move around', 'move-mode');
    Info.register('Show planet path', 'show-path');
    Info.register('Show velocity vectors', 'show-v-vectors');
    Info.register('Show acceleration vectors', 'show-a-vectors'); // global mouse events

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
    invertSelect('show-path', '#235bce');
    this.showPath = !this.showPath;
  }

  _onShowVVectors() {
    invertSelect('show-v-vectors', 'red');
    this.showVelocityVectors = !this.showVelocityVectors;
  }

  _onShowAVectors() {
    invertSelect('show-a-vectors', 'blue');
    this.showAccVectors = !this.showAccVectors;
  }

  _onPlanetCreate() {
    select('create-mode', '#235bce');
    unselect('move-mode');
    document.getElementById('container').style.cursor = 'crosshair';
    this.editMode = EDIT_MODES.CREATE_PLANETS;
  }

  _onMoveMode() {
    unselect('create-mode');
    select('move-mode', '#235bce');
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
      (this.lastDraw.END.x - this.lastDraw.START.x) / 3, (this.lastDraw.END.y - this.lastDraw.START.y) / 3)));
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
    select('move-mode', '#235bce');
    select('show-path', '#235bce');
    select('show-v-vectors', 'red');
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

function invertSelect(id, color) {
  let ele = document.getElementById(id);
  let svg = getSvgChild(ele);

  if (svg.style.fill === '') {
    svg.style.fill = color;
  } else {
    svg.style.fill = '';
  }

  if (ele.classList.contains('selected')) {
    ele.classList.remove('selected');
  } else {
    ele.classList.add('selected');
  }
}

function unselect(id) {
  let ele = document.getElementById(id);
  let svg = getSvgChild(ele);

  if (svg.style.fill !== '') {
    svg.style.fill = '';
  }

  if (ele.classList.contains('selected')) {
    ele.classList.remove('selected');
  }
}

function select(id, color) {
  let ele = document.getElementById(id);
  let svg = getSvgChild(ele);

  if (svg.style.fill === '') {
    svg.style.fill = color;
  }

  if (!ele.classList.contains('selected')) {
    ele.classList.add('selected');
  }
}

function getSvgChild(object) {
  let children = object.childNodes[0].contentDocument.children;

  for (let child of children) {
    if (child.tagName === 'svg') return child;
  }
}

function addListener(id, event, func, bind) {
  document.getElementById(id).addEventListener(event, func.bind(bind));
}

class Info {
  constructor(message, target) {
    this.message = message;
    this.target = target;
    this.element = null;
    this.target.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    this.target.addEventListener('mouseover', this.onMouseOver.bind(this));
    this.createElement();
  }

  static register(message, id) {
    let ele = document.getElementById(id);
    return new Info(message, ele);
  }

  createElement() {
    let pos = this.target.getBoundingClientRect();
    const container = document.createElement('div');
    container.classList.add('message');
    container.innerText = this.message;
    container.style.zIndex = '-1';
    container.style.position = 'absolute';
    container.style.top = pos.top + 10 + 'px';
    container.style.left = pos.left - 170 + 'px';
    container.style.width = '100px';
    container.style.color = 'black';

    if (!this.element) {
      document.body.appendChild(container);
      this.element = container;
    }
  }

  onMouseOver() {
    this.element.classList.add('message-in');
  }

  destroy() {
    document.body.removeChild(this.element);
  }

  onMouseLeave() {
    setTimeout(() => {
      this.element.classList.remove('message-in');
    }, 250);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wbGFuZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3IuanMiXSwibmFtZXMiOlsic2ltdWxhdGlvbiIsInBhcmFtcyIsInNwZWVkQyIsImdyYXZpdHlDIiwicGxhbmV0c0NvdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uTG9hZCIsImdldEJ5SWQiLCJvcGVuTWVudSIsIm9uR0NoYW5nZSIsIm9uU3BlZWRDaGFuZ2UiLCJvblBsYW5ldHNDaGFuZ2UiLCJ1cGRhdGVWaWV3RWxlbWVudHMiLCJzdGFydFNpbXVsYXRpb24iLCJwbGFuZXRzQ0lucHV0IiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsInZhbHVlIiwiaXNOYU4iLCJzcGVlZENJbnB1dCIsImdyYXZpdHlJbnB1dCIsImRlc3Ryb3kiLCJTaW11bGF0aW9uIiwic3RhcnQiLCJjaGVja2VkIiwic2hvd1BhdGgiLCIkIiwibW9kYWwiLCJmYWRlRHVyYXRpb24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2xhc3NMaXN0IiwiYWRkIiwiaWQiLCJQbGFuZXQiLCJjb25zdHJ1Y3RvciIsIm1hc3MiLCJwb3NpdGlvbiIsInZlbG9jaXR5IiwiVmVjdG9yIiwiaXMiLCJhY2NlbGVyYXRpb24iLCJjIiwiTWF0aCIsInJhbmRvbSIsInBhdGgiLCJ0aWNrIiwiY29sb3IiLCJvcGFjaXR5IiwicmVwbGFjZSIsImRyYXciLCJjdHgiLCJzaG93VlZlY3RvcnMiLCJzaG93QVZlY3RvcnMiLCJiZWdpblBhdGgiLCJzdHJva2VTdHlsZSIsImZpbGxTdHlsZSIsIm1vdmVUbyIsIngiLCJ5IiwiYXJjIiwiUEkiLCJjbG9zZVBhdGgiLCJmaWxsIiwiX2RyYXdWZWN0b3IiLCJ4MCIsInkwIiwieDEiLCJ5MSIsInMiLCJ3IiwiZHgiLCJkeSIsImEiLCJhdGFuIiwibGluZVdpZHRoIiwibGluZVRvIiwiY29zIiwic2luIiwic3Ryb2tlIiwidXBkYXRlIiwicGxhbmV0cyIsInBsYW5ldCIsImdldEFjY2VsZXJhdGlvbiIsImRvdCIsInB1c2giLCJsZW5ndGgiLCJzcGxpY2UiLCJmIiwiZ2V0Rm9yY2UiLCJkaWZmIiwiRyIsInNxcnQiLCJkaXN0IiwiRURJVF9NT0RFUyIsIk1PVkUiLCJDUkVBVEVfUExBTkVUUyIsImFuaW1hdGlvbiIsInNjYWxlIiwic3BhblgiLCJtYXNzQ2VudGVyIiwic2hvd1ZlbG9jaXR5VmVjdG9ycyIsInNob3dBY2NWZWN0b3JzIiwiZWRpdE1vZGUiLCJfaW5pdFZpZXdFbGVtZW50cyIsInRyYW5zbGF0ZSIsImlzWm9vbWluZ0luIiwiaXNab29taW5nT3V0IiwibW91c2VEb3duIiwibGFzdERyYXciLCJTVEFSVCIsIkVORCIsImxhc3RNb3VzZVBvcyIsImNhbnZhcyIsImdldENvbnRleHQiLCJfcmVzaXplQ2FudmFzIiwiYWRkTGlzdGVuZXIiLCJfb25Nb3VzZURvd24iLCJfb25Nb3VzZVVwIiwiX29uWm9vbUluIiwiX29uWm9vbU91dCIsIl9vblBsYW5ldENyZWF0ZSIsIl9vbk1vdmVNb2RlIiwiX29uU2hvd1BhdGgiLCJfb25TaG93VlZlY3RvcnMiLCJfb25TaG93QVZlY3RvcnMiLCJJbmZvIiwicmVnaXN0ZXIiLCJfb25Nb3VzZU1vdmUiLCJiaW5kIiwiZSIsImludmVydFNlbGVjdCIsInNlbGVjdCIsInVuc2VsZWN0Iiwic3R5bGUiLCJjdXJzb3IiLCJjbGllbnRYIiwiY2xpZW50WSIsIl9nZXRTY2FsZVgiLCJfZ2V0U2NhbGVZIiwibW91c2VQb3MiLCJ3aWR0aCIsImhlaWdodCIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsIl9jYWxjdWxhdGVNYXNzQ2VudGVyIiwiYXZnIiwiaSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiX3NpbXVsYXRlIiwibWFzc0NlbnRlckR4IiwibWFzc0NlbnRlckR5Iiwic2V0VHJhbnNmb3JtIiwiY2xlYXJSZWN0Iiwic2F2ZSIsIm90aGVyIiwic2xpY2UiLCJyZXN0b3JlIiwiX2RyYXdWZWxvY2l0eVZlY3RvciIsImVsZSIsInN2ZyIsImdldFN2Z0NoaWxkIiwiY29udGFpbnMiLCJyZW1vdmUiLCJvYmplY3QiLCJjaGlsZHJlbiIsImNoaWxkTm9kZXMiLCJjb250ZW50RG9jdW1lbnQiLCJjaGlsZCIsInRhZ05hbWUiLCJldmVudCIsImZ1bmMiLCJtZXNzYWdlIiwidGFyZ2V0IiwiZWxlbWVudCIsIm9uTW91c2VMZWF2ZSIsIm9uTW91c2VPdmVyIiwiY3JlYXRlRWxlbWVudCIsInBvcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNvbnRhaW5lciIsImlubmVyVGV4dCIsInpJbmRleCIsInRvcCIsImxlZnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVDaGlsZCIsInNldFRpbWVvdXQiLCJtYWduaXR1ZGUiLCJwb3ciXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEw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QVNlLENBREosRUFFTCxLQUFLZCxDQUFMLEdBQVNjLENBRkosQ0FBUDtBQUlEO0FBRUQ7Ozs7OztBQUlBekMsS0FBRyxDQUFFeUMsQ0FBRixFQUFLO0FBQ04sUUFBSWxDLE1BQU0sQ0FBQ0MsRUFBUCxDQUFVaUMsQ0FBVixDQUFKLEVBQWtCO0FBQ2hCLGFBQU8sSUFBSWxDLE1BQUosQ0FDTCxLQUFLbUIsQ0FBTCxHQUFTZSxDQUFDLENBQUNmLENBRE4sRUFFTCxLQUFLQyxDQUFMLEdBQVNjLENBQUMsQ0FBQ2QsQ0FGTixDQUFQO0FBSUQsS0FMRCxNQUtPO0FBQ0wsYUFBTyxJQUFJcEIsTUFBSixDQUNMLEtBQUttQixDQUFMLEdBQVNlLENBREosRUFFTCxLQUFLZCxDQUFMLEdBQVNjLENBRkosQ0FBUDtBQUlEO0FBQ0Y7QUFFRDs7Ozs7O0FBSUFpQixNQUFJLENBQUVqQixDQUFGLEVBQUs7QUFDUCxXQUFPLElBQUlsQyxNQUFKLENBQ0xrQyxDQUFDLENBQUNmLENBQUYsR0FBTSxLQUFLQSxDQUROLEVBRUxlLENBQUMsQ0FBQ2QsQ0FBRixHQUFNLEtBQUtBLENBRk4sQ0FBUDtBQUlEO0FBRUQ7Ozs7OztBQUlBa0MsTUFBSSxDQUFFcEIsQ0FBRixFQUFLO0FBQ1AsUUFBSWlCLElBQUksR0FBRyxLQUFLQSxJQUFMLENBQVVqQixDQUFWLENBQVg7QUFDQSxXQUFPOUIsSUFBSSxDQUFDaUQsSUFBTCxDQUNMakQsSUFBSSxDQUFDb0osR0FBTCxDQUFTckcsSUFBSSxDQUFDaEMsQ0FBZCxFQUFpQixDQUFqQixJQUNBZixJQUFJLENBQUNvSixHQUFMLENBQVNyRyxJQUFJLENBQUMvQixDQUFkLEVBQWlCLENBQWpCLENBRkssQ0FBUDtBQUlEOztBQTVFeUIsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiXG5pbXBvcnQgU2ltdWxhdGlvbiBmcm9tIFwiLi9zaW11bGF0aW9uXCI7XG5cbi8vIFRPRE86IGltcGxlbWVudCBzdGFibGUgb3JiaXRzIGV4YW1wbGVzOiBodHRwczovL21hdGguc3RhY2tleGNoYW5nZS5jb20vcXVlc3Rpb25zLzE2MTM3NjUvc2ltcGxlLXN0YWJsZS1uLWJvZHktb3JiaXRzLWluLXRoZS1wbGFuZS13aXRoLXNvbWUtZml4ZWQtYm9kaWVzLWFsbG93ZWRcblxubGV0IHNpbXVsYXRpb24gPSBudWxsO1xubGV0IHBhcmFtcyA9IHtcbiAgc3BlZWRDOiAwLjEsXG4gIGdyYXZpdHlDOiAwLjAwMDQsXG4gIHBsYW5ldHNDb3VudDogMTAsXG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XG5nZXRCeUlkKCdvcGVuLW1lbnUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5NZW51KTtcblxuLy8gcGFyYW1zIGlucHV0IGNoYW5nZSBldmVudHNcbmdldEJ5SWQoJ2dyYXZpdHktY29uc3QnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uR0NoYW5nZSk7XG5nZXRCeUlkKCdzcGVlZC1jb25zdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25TcGVlZENoYW5nZSk7XG5nZXRCeUlkKCdwbGFuZXRzLWNvdW50JykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvblBsYW5ldHNDaGFuZ2UpO1xuXG5mdW5jdGlvbiBvbkxvYWQgKCkge1xuICBvcGVuTWVudSgpO1xuICB1cGRhdGVWaWV3RWxlbWVudHMoKTtcbiAgc3RhcnRTaW11bGF0aW9uKCk7XG59XG5cbmZ1bmN0aW9uIG9uUGxhbmV0c0NoYW5nZSAoKSB7XG4gIGxldCBwbGFuZXRzQ0lucHV0ID0gTnVtYmVyLnBhcnNlRmxvYXQoZ2V0QnlJZCgncGxhbmV0cy1jb3VudCcpLnZhbHVlKTtcbiAgaWYgKCFpc05hTihwbGFuZXRzQ0lucHV0KSkgcGFyYW1zLnBsYW5ldHNDb3VudCA9IHBsYW5ldHNDSW5wdXQ7XG5cbiAgc3RhcnRTaW11bGF0aW9uKCk7XG59XG5cbmZ1bmN0aW9uIG9uU3BlZWRDaGFuZ2UgKCkge1xuICBsZXQgc3BlZWRDSW5wdXQgPSBOdW1iZXIucGFyc2VGbG9hdChnZXRCeUlkKCdzcGVlZC1jb25zdCcpLnZhbHVlKTtcbiAgaWYgKCFpc05hTihzcGVlZENJbnB1dCkpIHBhcmFtcy5zcGVlZEMgPSBzcGVlZENJbnB1dDtcbiAgc2ltdWxhdGlvbi5wYXJhbXMuc3BlZWRDID0gcGFyYW1zLnNwZWVkQztcbn1cblxuZnVuY3Rpb24gb25HQ2hhbmdlICgpIHtcbiAgbGV0IGdyYXZpdHlJbnB1dCA9IE51bWJlci5wYXJzZUZsb2F0KGdldEJ5SWQoJ2dyYXZpdHktY29uc3QnKS52YWx1ZSk7XG4gIGlmICghaXNOYU4oZ3Jhdml0eUlucHV0KSkgcGFyYW1zLmdyYXZpdHlDID0gZ3Jhdml0eUlucHV0O1xuICBzaW11bGF0aW9uLnBhcmFtcy5ncmF2aXR5QyA9IHBhcmFtcy5ncmF2aXR5Qztcbn1cblxuZnVuY3Rpb24gc3RhcnRTaW11bGF0aW9uICgpIHtcbiAgaWYgKHNpbXVsYXRpb24pIHtcbiAgICBzaW11bGF0aW9uLmRlc3Ryb3koKTtcbiAgICBzaW11bGF0aW9uID0gbmV3IFNpbXVsYXRpb24ocGFyYW1zKTtcbiAgICBzaW11bGF0aW9uLnN0YXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgc2ltdWxhdGlvbiA9IG5ldyBTaW11bGF0aW9uKHBhcmFtcyk7XG4gICAgc2ltdWxhdGlvbi5zdGFydCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVZpZXdFbGVtZW50cyAoKSB7XG4gIGdldEJ5SWQoJ2dyYXZpdHktY29uc3QnKS52YWx1ZSA9IHBhcmFtcy5ncmF2aXR5QztcbiAgZ2V0QnlJZCgnc3BlZWQtY29uc3QnKS52YWx1ZSA9IHBhcmFtcy5zcGVlZEM7XG4gIGdldEJ5SWQoJ3BsYW5ldHMtY291bnQnKS52YWx1ZSA9IHBhcmFtcy5wbGFuZXRzQ291bnQ7XG4gIGdldEJ5SWQoJ3Nob3ctcGF0aCcpLmNoZWNrZWQgPSBwYXJhbXMuc2hvd1BhdGg7XG59XG5cbmZ1bmN0aW9uIG9wZW5NZW51ICgpIHtcbiAgJChcIiNpbnRyby1tb2RhbFwiKS5tb2RhbCh7XG4gICAgZmFkZUR1cmF0aW9uOiAxMDBcbiAgfSk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tY29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS1pbicpO1xufVxuXG5mdW5jdGlvbiBnZXRCeUlkIChpZCkge1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xufSIsImltcG9ydCBWZWN0b3IgZnJvbSBcIi4vdmVjdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYW5ldCB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBbcGFyYW1zXSB7T2JqZWN0fVxuICAgKiBAcGFyYW0gW21hc3MgPSAxXSB7TnVtYmVyfVxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXSB7VmVjdG9yfVxuICAgKiBAcGFyYW0gW3ZlbG9jaXR5XSB7VmVjdG9yfVxuICAgKi9cbiAgY29uc3RydWN0b3IgKHBhcmFtcywgbWFzcywgcG9zaXRpb24sIHZlbG9jaXR5KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgdGhpcy5tYXNzID0gbWFzcyA/IG1hc3MgOiAxO1xuICAgIHRoaXMucG9zaXRpb24gPSBWZWN0b3IuaXMocG9zaXRpb24pID8gcG9zaXRpb24gOiBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy52ZWxvY2l0eSA9IFZlY3Rvci5pcyh2ZWxvY2l0eSkgPyB2ZWxvY2l0eSA6IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmMgPSBgcmdiYSgke01hdGgucmFuZG9tKCkqMjU1fSwgJHtNYXRoLnJhbmRvbSgpKjI1NX0sICR7TWF0aC5yYW5kb20oKSoyNTV9LCB4KWA7XG4gICAgdGhpcy5wYXRoID0gW107XG4gICAgdGhpcy50aWNrID0gMDtcbiAgfVxuXG4gIGNvbG9yIChvcGFjaXR5KSB7XG4gICAgcmV0dXJuIHRoaXMuYy5yZXBsYWNlKCd4Jywgb3BhY2l0eSk7XG4gIH1cblxuICBkcmF3IChjdHgsIHNob3dQYXRoID0gdHJ1ZSwgc2hvd1ZWZWN0b3JzLCBzaG93QVZlY3RvcnMpIHtcblxuICAgIGlmIChzaG93UGF0aCkge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJyZ2JhKDEsIDEsIDEsIDApXCI7XG4gICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcigwLjMpO1xuICAgICAgZm9yIChsZXQgcG9zaXRpb24gb2YgdGhpcy5wYXRoKSB7XG4gICAgICAgIGN0eC5tb3ZlVG8ocG9zaXRpb24ueCAsIHBvc2l0aW9uLnkpO1xuICAgICAgICBjdHguYXJjKHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIDIsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgIH1cbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuXG4gICAgaWYgKHNob3dWVmVjdG9ycykge1xuICAgICAgdGhpcy5fZHJhd1ZlY3RvcihjdHgsIFwiI0ZGMDAwMFwiLFxuICAgICAgICB0aGlzLnBvc2l0aW9uLngsXG4gICAgICAgIHRoaXMucG9zaXRpb24ueSxcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ICsgdGhpcy52ZWxvY2l0eS54LFxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnZlbG9jaXR5LnlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChzaG93QVZlY3RvcnMpIHtcbiAgICAgIHRoaXMuX2RyYXdWZWN0b3IoY3R4LCBcIiMwMDEyZmZcIixcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICB0aGlzLnBvc2l0aW9uLnksXG4gICAgICAgIHRoaXMucG9zaXRpb24ueCArIHRoaXMuYWNjZWxlcmF0aW9uLnggKiAxNTAsXG4gICAgICAgIHRoaXMucG9zaXRpb24ueSArIHRoaXMuYWNjZWxlcmF0aW9uLnkgKiAxNTBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yKDEpO1xuICAgIGN0eC5hcmModGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMubWFzcywgMCwgMiAqIE1hdGguUEkpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgdGhpcy50aWNrKys7XG4gIH1cblxuICBfZHJhd1ZlY3RvciAoY3R4LCBjb2xvciwgeDAsIHkwLCB4MSwgeTEpIHtcbiAgICBjb25zdCBzID0gMztcbiAgICBjb25zdCB3ID0gMC40O1xuICAgIGxldCBkeCA9IHgxIC0geDA7XG4gICAgbGV0IGR5ID0geTEgLSB5MDtcbiAgICBsZXQgYSA9IE1hdGguYXRhbihkeSAvIGR4KTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgY3R4LmxpbmVXaWR0aCA9IHM7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oeDAsIHkwKTtcbiAgICBjdHgubGluZVRvKHgxLCB5MSk7XG4gICAgY3R4Lm1vdmVUbyh4MSwgeTEpO1xuICAgIGlmIChkeCA8IDApIHtcbiAgICAgIGN0eC5saW5lVG8oeDEgKyBNYXRoLmNvcyhhIC0gdykgKiBzLCB5MSArIE1hdGguc2luKGEgLSB3KSAqIHMpO1xuICAgICAgY3R4LmxpbmVUbyh4MSArIE1hdGguY29zKGEgKyB3KSAqIHMsIHkxICsgTWF0aC5zaW4oYSArIHcpICogcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5saW5lVG8oeDEgLSBNYXRoLmNvcyhhIC0gdykgKiBzLCB5MSAtIE1hdGguc2luKGEgLSB3KSAqIHMpO1xuICAgICAgY3R4LmxpbmVUbyh4MSAtIE1hdGguY29zKGEgKyB3KSAqIHMsIHkxIC0gTWF0aC5zaW4oYSArIHcpICogcyk7XG4gICAgfVxuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIHVwZGF0ZSAocGxhbmV0cywgc3BlZWRDKSB7XG4gICAgZm9yIChsZXQgcGxhbmV0IG9mIHBsYW5ldHMpIHtcbiAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gdGhpcy5nZXRBY2NlbGVyYXRpb24ocGxhbmV0KTtcbiAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5LmFkZCh0aGlzLmFjY2VsZXJhdGlvbik7XG4gICAgfVxuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnZlbG9jaXR5LmRvdChzcGVlZEMpKTtcbiAgICBpZiAodGhpcy50aWNrICUgNCA9PT0gMCkge1xuICAgICAgdGhpcy5wYXRoLnB1c2godGhpcy5wb3NpdGlvbik7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhdGgubGVuZ3RoID4gMTUwKSB7XG4gICAgICB0aGlzLnBhdGguc3BsaWNlKDAsIDEpXG4gICAgfVxuICB9XG5cbiAgZ2V0QWNjZWxlcmF0aW9uIChwbGFuZXQpIHtcbiAgICBsZXQgZiA9IHRoaXMuZ2V0Rm9yY2UocGxhbmV0KTtcbiAgICBsZXQgZGlmZiA9IHRoaXMucG9zaXRpb24uZGlmZihwbGFuZXQucG9zaXRpb24pO1xuICAgIHJldHVybiBkaWZmLmRvdCggZiAvIHRoaXMubWFzcyk7XG4gIH1cblxuICBnZXRGb3JjZSAocGxhbmV0KSB7XG4gICAgbGV0IEcgPSB0aGlzLnBhcmFtcy5ncmF2aXR5QyA/IHRoaXMucGFyYW1zLmdyYXZpdHlDIDogMTtcbiAgICByZXR1cm4gRyAqIHBsYW5ldC5tYXNzICogdGhpcy5tYXNzIC8gTWF0aC5zcXJ0KHRoaXMucG9zaXRpb24uZGlzdChwbGFuZXQucG9zaXRpb24pKTtcbiAgfVxuXG59IiwiaW1wb3J0IFBsYW5ldCBmcm9tIFwiLi9wbGFuZXRcIjtcbmltcG9ydCBWZWN0b3IgZnJvbSBcIi4vdmVjdG9yXCI7XG5cblxuZXhwb3J0IGNvbnN0IEVESVRfTU9ERVMgPSB7XG4gIE1PVkU6IDEsXG4gIENSRUFURV9QTEFORVRTOiAyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW11bGF0aW9uIHtcblxuICBjb25zdHJ1Y3RvciAocGFyYW1zKSB7XG4gICAgdGhpcy5hbmltYXRpb24gPSBudWxsO1xuICAgIHRoaXMucGxhbmV0cyA9IFtdO1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMuc3BhblggPSA1MDA7XG4gICAgdGhpcy5tYXNzQ2VudGVyID0gbnVsbDtcbiAgICB0aGlzLnNob3dWZWxvY2l0eVZlY3RvcnMgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0FjY1ZlY3RvcnMgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dQYXRoID0gdHJ1ZTtcbiAgICB0aGlzLmVkaXRNb2RlID0gRURJVF9NT0RFUy5NT1ZFO1xuICAgIHRoaXMuX2luaXRWaWV3RWxlbWVudHMoKTtcbiAgICAvLyB0cmFuc2xhdGlvbiBzdGF0ZVxuICAgIHRoaXMudHJhbnNsYXRlID0geyB4OiAwLCB5OiAwIH07XG4gICAgLy8gem9vbSBzdGF0ZVxuICAgIHRoaXMuaXNab29taW5nSW4gPSBmYWxzZTtcbiAgICB0aGlzLmlzWm9vbWluZ091dCA9IGZhbHNlO1xuICAgIC8vIG1vdXNlIHN0YXRlXG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICB0aGlzLmxhc3REcmF3ID0geyBTVEFSVDogeyB4OiAwLCB5OiAwIH0sIEVORDogeyB4OiAwLCB5OiAwIH0gfTtcbiAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IG51bGw7XG4gICAgLy8gY2FudmFzIGluaXRpYWxpemF0aW9uXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2tldGNoJyk7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuX3Jlc2l6ZUNhbnZhcygpO1xuICAgIC8vIGNhbnZhcyBtb3VzZSBldmVudHNcbiAgICBhZGRMaXN0ZW5lcignc2tldGNoJywgJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignc2tldGNoJywgJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNlVXAsIHRoaXMpO1xuICAgIC8vIHpvb20gb3V0L2luIGJ1dHRvbnMgZXZlbnRzXG4gICAgYWRkTGlzdGVuZXIoJ3pvb20taW4nLCAnbW91c2Vkb3duJywgdGhpcy5fb25ab29tSW4sIHRoaXMpO1xuICAgIGFkZExpc3RlbmVyKCd6b29tLWluJywgJ21vdXNldXAnLCB0aGlzLl9vblpvb21JbiwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ3pvb20tb3V0JywgJ21vdXNlZG93bicsIHRoaXMuX29uWm9vbU91dCwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ3pvb20tb3V0JywgJ21vdXNldXAnLCB0aGlzLl9vblpvb21PdXQsIHRoaXMpO1xuICAgIGFkZExpc3RlbmVyKCdjcmVhdGUtbW9kZScsICdjbGljaycsIHRoaXMuX29uUGxhbmV0Q3JlYXRlLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignbW92ZS1tb2RlJywgJ2NsaWNrJywgdGhpcy5fb25Nb3ZlTW9kZSwgdGhpcyk7XG4gICAgYWRkTGlzdGVuZXIoJ3Nob3ctcGF0aCcsICdjbGljaycsIHRoaXMuX29uU2hvd1BhdGgsIHRoaXMpO1xuICAgIGFkZExpc3RlbmVyKCdzaG93LXYtdmVjdG9ycycsICdjbGljaycsIHRoaXMuX29uU2hvd1ZWZWN0b3JzLCB0aGlzKTtcbiAgICBhZGRMaXN0ZW5lcignc2hvdy1hLXZlY3RvcnMnLCAnY2xpY2snLCB0aGlzLl9vblNob3dBVmVjdG9ycywgdGhpcyk7XG4gICAgLy8gcmVnaXN0ZXIgaW5mbyBtZXNzYWdlIGxpc3RlbmVyc1xuICAgIEluZm8ucmVnaXN0ZXIoJ1pvb20gaW4nLCAnem9vbS1pbicpO1xuICAgIEluZm8ucmVnaXN0ZXIoJ1pvb20gb3V0JywgJ3pvb20tb3V0Jyk7XG4gICAgSW5mby5yZWdpc3RlcignQ3JlYXRlIHBsYW5ldHMnLCAnY3JlYXRlLW1vZGUnKTtcbiAgICBJbmZvLnJlZ2lzdGVyKCdNb3ZlIGFyb3VuZCcsICdtb3ZlLW1vZGUnKTtcbiAgICBJbmZvLnJlZ2lzdGVyKCdTaG93IHBsYW5ldCBwYXRoJywgJ3Nob3ctcGF0aCcpO1xuICAgIEluZm8ucmVnaXN0ZXIoJ1Nob3cgdmVsb2NpdHkgdmVjdG9ycycsICdzaG93LXYtdmVjdG9ycycpO1xuICAgIEluZm8ucmVnaXN0ZXIoJ1Nob3cgYWNjZWxlcmF0aW9uIHZlY3RvcnMnLCAnc2hvdy1hLXZlY3RvcnMnKTtcbiAgICAvLyBnbG9iYWwgbW91c2UgZXZlbnRzXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9yZXNpemVDYW52YXMuYmluZCh0aGlzKSk7XG4gIH1cblxuICBfb25ab29tSW4gKCkge1xuICAgIHRoaXMuaXNab29taW5nSW4gPSAhdGhpcy5pc1pvb21pbmdJbjtcbiAgfVxuXG4gIF9vblpvb21PdXQgKCkge1xuICAgIHRoaXMuaXNab29taW5nT3V0ID0gIXRoaXMuaXNab29taW5nT3V0O1xuICB9XG5cbiAgX29uU2hvd1BhdGggKGUpIHtcbiAgICBpbnZlcnRTZWxlY3QoJ3Nob3ctcGF0aCcsICcjMjM1YmNlJyk7XG4gICAgdGhpcy5zaG93UGF0aCA9ICF0aGlzLnNob3dQYXRoO1xuICB9XG5cbiAgX29uU2hvd1ZWZWN0b3JzICgpIHtcbiAgICBpbnZlcnRTZWxlY3QoJ3Nob3ctdi12ZWN0b3JzJywgJ3JlZCcpO1xuICAgIHRoaXMuc2hvd1ZlbG9jaXR5VmVjdG9ycyA9ICF0aGlzLnNob3dWZWxvY2l0eVZlY3RvcnM7XG4gIH1cblxuICBfb25TaG93QVZlY3RvcnMgKCkge1xuICAgIGludmVydFNlbGVjdCgnc2hvdy1hLXZlY3RvcnMnLCAnYmx1ZScpO1xuICAgIHRoaXMuc2hvd0FjY1ZlY3RvcnMgPSAhdGhpcy5zaG93QWNjVmVjdG9ycztcbiAgfVxuXG4gIF9vblBsYW5ldENyZWF0ZSAoKSB7XG4gICAgc2VsZWN0KCdjcmVhdGUtbW9kZScsICcjMjM1YmNlJyk7XG4gICAgdW5zZWxlY3QoJ21vdmUtbW9kZScpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5jdXJzb3IgPSAnY3Jvc3NoYWlyJztcbiAgICB0aGlzLmVkaXRNb2RlID0gRURJVF9NT0RFUy5DUkVBVEVfUExBTkVUUztcbiAgfVxuXG4gIF9vbk1vdmVNb2RlICgpIHtcbiAgICB1bnNlbGVjdCgnY3JlYXRlLW1vZGUnKTtcbiAgICBzZWxlY3QoJ21vdmUtbW9kZScsICcjMjM1YmNlJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmN1cnNvciA9ICdncmFiJztcbiAgICB0aGlzLmVkaXRNb2RlID0gRURJVF9NT0RFUy5NT1ZFO1xuICB9XG5cbiAgX29uTW91c2VNb3ZlIChlKSB7XG4gICAgLy8gc2tpcCBpZiBtb3VzZSBub3QgcHJlc3NlZFxuICAgIGlmICghdGhpcy5tb3VzZURvd24pIHJldHVybjtcblxuICAgIGlmICh0aGlzLmVkaXRNb2RlID09PSBFRElUX01PREVTLkNSRUFURV9QTEFORVRTKSB7XG4gICAgICB0aGlzLmxhc3REcmF3LkVORCA9IHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfTtcbiAgICB9XG4gICAgLy8gaWYgbW91c2UgcG9zaXRpb24gdW5zZXRcbiAgICBpZiAoIXRoaXMubGFzdE1vdXNlUG9zKSB7XG4gICAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfVxuICAgIH1cbiAgICAvLyBjYWxjdWxhdGUgbW91c2UgcG9zaXRpb24gZGlmZlxuICAgIGlmICh0aGlzLmVkaXRNb2RlID09PSBFRElUX01PREVTLk1PVkUpIHtcbiAgICAgIGlmICghdGhpcy5sYXN0TW91c2VQb3MpIHtcbiAgICAgICAgdGhpcy5sYXN0TW91c2VQb3MgPSB7IHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZIH1cbiAgICAgIH1cbiAgICAgIHRoaXMudHJhbnNsYXRlLnggKz0gKGUuY2xpZW50WCAtIHRoaXMubGFzdE1vdXNlUG9zLngpICogMiAvIHRoaXMuX2dldFNjYWxlWCgpO1xuICAgICAgdGhpcy50cmFuc2xhdGUueSArPSAoZS5jbGllbnRZIC0gdGhpcy5sYXN0TW91c2VQb3MueSkgKiAyIC8gdGhpcy5fZ2V0U2NhbGVZKCk7XG4gICAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfTtcbiAgICB9XG4gIH1cblxuICBfb25Nb3VzZURvd24gKGUpIHtcbiAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XG4gICAgaWYgKHRoaXMuZWRpdE1vZGUgPT09IEVESVRfTU9ERVMuQ1JFQVRFX1BMQU5FVFMpIHtcbiAgICAgIGxldCBtb3VzZVBvcyA9IHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfTtcbiAgICAgIHRoaXMubGFzdERyYXcuU1RBUlQgPSBtb3VzZVBvcztcbiAgICAgIHRoaXMubGFzdERyYXcuRU5EID0gbW91c2VQb3M7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVkaXRNb2RlID09PSBFRElUX01PREVTLk1PVkUpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5jdXJzb3IgPSAnZ3JhYmJpbmcnO1xuICAgIH1cbiAgfVxuXG4gIF9vbk1vdXNlVXAgKGUpIHtcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmVkaXRNb2RlID09PSBFRElUX01PREVTLkNSRUFURV9QTEFORVRTKSB7XG4gICAgICB0aGlzLnBsYW5ldHMucHVzaChuZXcgUGxhbmV0KFxuICAgICAgICB0aGlzLnBhcmFtcyxcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqIDEwICsgNSxcbiAgICAgICAgbmV3IFZlY3RvcihcbiAgICAgICAgICAoKHRoaXMubGFzdERyYXcuU1RBUlQueCAtICh0aGlzLmNhbnZhcy53aWR0aCAvIDIpKSAvIHRoaXMuX2dldFNjYWxlWCgpKSArICgtdGhpcy50cmFuc2xhdGUueCksXG4gICAgICAgICAgKCh0aGlzLmxhc3REcmF3LlNUQVJULnkgLSAodGhpcy5jYW52YXMuaGVpZ2h0IC8gMikpIC8gdGhpcy5fZ2V0U2NhbGVZKCkpICsgKC10aGlzLnRyYW5zbGF0ZS55KVxuICAgICAgICApLFxuICAgICAgICBuZXcgVmVjdG9yKFxuICAgICAgICAgIC8vIHNjYWxlIGRvd24gdmVjdG9yIGZvciBiZXR0ZXIgbW91c2UgZHJhd2luZyBwcmVjaXNpb25cbiAgICAgICAgICAodGhpcy5sYXN0RHJhdy5FTkQueCAtIHRoaXMubGFzdERyYXcuU1RBUlQueCkgLyAzLFxuICAgICAgICAgICh0aGlzLmxhc3REcmF3LkVORC55IC0gdGhpcy5sYXN0RHJhdy5TVEFSVC55KSAvIDNcbiAgICAgICAgKSxcbiAgICAgICkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5lZGl0TW9kZSA9PT0gRURJVF9NT0RFUy5NT1ZFKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuY3Vyc29yID0gJ2dyYWInO1xuICAgIH1cbiAgICB0aGlzLmxhc3RNb3VzZVBvcyA9IG51bGw7XG4gICAgdGhpcy5sYXN0RHJhdyA9IHsgU1RBUlQ6IHsgeDogMCwgeTogMCB9LCBFTkQ6IHsgeDogMCwgeTogMCB9IH1cbiAgfVxuXG4gIF9pbml0Vmlld0VsZW1lbnRzICgpIHtcbiAgICBzZWxlY3QoJ21vdmUtbW9kZScsICcjMjM1YmNlJyk7XG4gICAgc2VsZWN0KCdzaG93LXBhdGgnLCAnIzIzNWJjZScpO1xuICAgIHNlbGVjdCgnc2hvdy12LXZlY3RvcnMnLCAncmVkJyk7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuY3Vyc29yID0gJ2dyYWInO1xuICB9XG5cbiAgX3Jlc2l6ZUNhbnZhcyAoKSB7XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIH1cblxuICBfZ2V0U2NhbGVYICgpIHtcbiAgICByZXR1cm4gKHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy5zcGFuWCkgKiB0aGlzLnNjYWxlO1xuICB9XG5cbiAgX2dldFNjYWxlWSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFNjYWxlWCgpO1xuICB9XG5cbiAgX2NhbGN1bGF0ZU1hc3NDZW50ZXIgKCkge1xuICAgIGxldCBhdmcgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGxhbmV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXZnLnggKz0gdGhpcy5wbGFuZXRzW2ldLnBvc2l0aW9uLng7XG4gICAgICBhdmcueSArPSB0aGlzLnBsYW5ldHNbaV0ucG9zaXRpb24ueTtcbiAgICB9XG4gICAgYXZnLnggPSBhdmcueCAvIHRoaXMucGxhbmV0cy5sZW5ndGg7XG4gICAgYXZnLnkgPSBhdmcueSAvIHRoaXMucGxhbmV0cy5sZW5ndGg7XG4gICAgcmV0dXJuIGF2ZztcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uKTtcbiAgfVxuXG4gIHN0YXJ0ICgpIHtcbiAgICAvLyByYW5kb21seSBpbml0aWFsaXplIHBsYW5ldHMgYmFzZWQgb24gcGxhbmV0IGNvdW50IHBhcmFtXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcmFtcy5wbGFuZXRzQ291bnQ7IGkrKykge1xuICAgICAgdGhpcy5wbGFuZXRzLnB1c2gobmV3IFBsYW5ldChcbiAgICAgICAgdGhpcy5wYXJhbXMsXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKiAxMCArIDMsXG4gICAgICAgIG5ldyBWZWN0b3IoXG4gICAgICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogdGhpcy5zcGFuWCAvIDMsXG4gICAgICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogdGhpcy5zcGFuWCAvIDNcbiAgICAgICAgKVxuICAgICAgKSlcbiAgICB9XG4gICAgdGhpcy5hbmltYXRpb24gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fc2ltdWxhdGUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBfc2ltdWxhdGUgKCkge1xuICAgIC8vIGNhbGN1bGF0ZSBtYXNzIGNlbnRlclxuICAgIGNvbnN0IG1hc3NDZW50ZXIgPSB0aGlzLl9jYWxjdWxhdGVNYXNzQ2VudGVyKCk7XG4gICAgaWYgKHRoaXMubWFzc0NlbnRlcikge1xuICAgICAgY29uc3QgbWFzc0NlbnRlckR4ID0gdGhpcy5tYXNzQ2VudGVyLnggLSBtYXNzQ2VudGVyLng7XG4gICAgICBjb25zdCBtYXNzQ2VudGVyRHkgPSB0aGlzLm1hc3NDZW50ZXIueSAtIG1hc3NDZW50ZXIueTtcbiAgICAgIHRoaXMudHJhbnNsYXRlLnggKz0gbWFzc0NlbnRlckR4O1xuICAgICAgdGhpcy50cmFuc2xhdGUueSArPSBtYXNzQ2VudGVyRHk7XG4gICAgfVxuICAgIHRoaXMubWFzc0NlbnRlciA9IG1hc3NDZW50ZXI7XG5cbiAgICB0aGlzLmN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuY3R4LnNhdmUoKTtcblxuICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh0aGlzLmNhbnZhcy53aWR0aCAvIDIsIHRoaXMuY2FudmFzLmhlaWdodCAvIDIpO1xuICAgIHRoaXMuY3R4LnNjYWxlKHRoaXMuX2dldFNjYWxlWCgpLCB0aGlzLl9nZXRTY2FsZVkoKSk7XG4gICAgdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMudHJhbnNsYXRlLngsIHRoaXMudHJhbnNsYXRlLnkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBvdGhlciA9IFsuLi50aGlzLnBsYW5ldHMuc2xpY2UoMCwgaSAtIDEpLCAuLi50aGlzLnBsYW5ldHMuc2xpY2UoaSwgdGhpcy5wbGFuZXRzLmxlbmd0aCldO1xuICAgICAgdGhpcy5wbGFuZXRzW2ldLnVwZGF0ZShvdGhlciwgdGhpcy5wYXJhbXMuc3BlZWRDKTtcbiAgICAgIHRoaXMucGxhbmV0c1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLnNob3dQYXRoLCB0aGlzLnNob3dWZWxvY2l0eVZlY3RvcnMsIHRoaXMuc2hvd0FjY1ZlY3RvcnMpO1xuICAgIH1cbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG5cbiAgICB0aGlzLl9kcmF3VmVsb2NpdHlWZWN0b3IoXG4gICAgICB0aGlzLmxhc3REcmF3LlNUQVJULngsXG4gICAgICB0aGlzLmxhc3REcmF3LlNUQVJULnksXG4gICAgICB0aGlzLmxhc3REcmF3LkVORC54LFxuICAgICAgdGhpcy5sYXN0RHJhdy5FTkQueVxuICAgICk7XG5cbiAgICBpZiAodGhpcy5pc1pvb21pbmdJbikgdGhpcy5zY2FsZSArPSAwLjAwNTtcbiAgICBpZiAodGhpcy5pc1pvb21pbmdPdXQgJiYgdGhpcy5zY2FsZSA+IDApIHRoaXMuc2NhbGUgLT0gMC4wMDU7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fc2ltdWxhdGUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBfZHJhd1ZlbG9jaXR5VmVjdG9yICh4MCwgeTAsIHgxLCB5MSkge1xuICAgIGNvbnN0IHMgPSA3O1xuICAgIGNvbnN0IHcgPSAwLjc7XG4gICAgbGV0IGR4ID0geDEgLSB4MDtcbiAgICBsZXQgZHkgPSB5MSAtIHkwO1xuICAgIGxldCBhID0gTWF0aC5hdGFuKGR5IC8gZHgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHM7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHgubW92ZVRvKHgwLCB5MCk7XG4gICAgdGhpcy5jdHgubGluZVRvKHgxLCB5MSk7XG4gICAgdGhpcy5jdHgubW92ZVRvKHgxLCB5MSk7XG4gICAgaWYgKGR4IDwgMCkge1xuICAgICAgdGhpcy5jdHgubGluZVRvKHgxICsgTWF0aC5jb3MoYSAtIHcpICogcywgeTEgKyBNYXRoLnNpbihhIC0gdykgKiBzKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh4MSArIE1hdGguY29zKGEgKyB3KSAqIHMsIHkxICsgTWF0aC5zaW4oYSArIHcpICogcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh4MSAtIE1hdGguY29zKGEgLSB3KSAqIHMsIHkxIC0gTWF0aC5zaW4oYSAtIHcpICogcyk7XG4gICAgICB0aGlzLmN0eC5saW5lVG8oeDEgLSBNYXRoLmNvcyhhICsgdykgKiBzLCB5MSAtIE1hdGguc2luKGEgKyB3KSAqIHMpO1xuICAgIH1cbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBpbnZlcnRTZWxlY3QgKGlkLCBjb2xvcikge1xuICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBsZXQgc3ZnID0gZ2V0U3ZnQ2hpbGQoZWxlKTtcbiAgaWYgKHN2Zy5zdHlsZS5maWxsID09PSAnJykge1xuICAgIHN2Zy5zdHlsZS5maWxsID0gY29sb3I7XG4gIH0gZWxzZSB7XG4gICAgc3ZnLnN0eWxlLmZpbGwgPSAnJztcbiAgfVxuICBpZiAoZWxlLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICB9IGVsc2Uge1xuICAgIGVsZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0IChpZCkge1xuICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBsZXQgc3ZnID0gZ2V0U3ZnQ2hpbGQoZWxlKTtcbiAgaWYgKHN2Zy5zdHlsZS5maWxsICE9PSAnJykge1xuICAgIHN2Zy5zdHlsZS5maWxsID0gJyc7XG4gIH1cbiAgaWYgKGVsZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcbiAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZWxlY3QgKGlkLCBjb2xvcikge1xuICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBsZXQgc3ZnID0gZ2V0U3ZnQ2hpbGQoZWxlKTtcbiAgaWYgKHN2Zy5zdHlsZS5maWxsID09PSAnJykge1xuICAgIHN2Zy5zdHlsZS5maWxsID0gY29sb3I7XG4gIH1cbiAgaWYgKCFlbGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0U3ZnQ2hpbGQgKG9iamVjdCkge1xuICBsZXQgY2hpbGRyZW4gPSBvYmplY3QuY2hpbGROb2Rlc1swXS5jb250ZW50RG9jdW1lbnQuY2hpbGRyZW47XG4gIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgaWYgKGNoaWxkLnRhZ05hbWUgPT09ICdzdmcnKSByZXR1cm4gY2hpbGQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkTGlzdGVuZXIgKGlkLCBldmVudCwgZnVuYywgYmluZCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYy5iaW5kKGJpbmQpKTtcbn1cblxuY2xhc3MgSW5mbyB7XG5cbiAgY29uc3RydWN0b3IgKG1lc3NhZ2UsIHRhcmdldCkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vbk1vdXNlTGVhdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5vbk1vdXNlT3Zlci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoKTtcbiAgfVxuXG4gIHN0YXRpYyByZWdpc3RlciAobWVzc2FnZSwgaWQpIHtcbiAgICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIHJldHVybiBuZXcgSW5mbyhtZXNzYWdlLCBlbGUpO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudCAoKSB7XG4gICAgbGV0IHBvcyA9IHRoaXMudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2UnKTtcbiAgICBjb250YWluZXIuaW5uZXJUZXh0ID0gdGhpcy5tZXNzYWdlO1xuXG4gICAgY29udGFpbmVyLnN0eWxlLnpJbmRleCA9ICctMSc7XG4gICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBjb250YWluZXIuc3R5bGUudG9wID0gKHBvcy50b3AgKyAxMCkgKyAncHgnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gKHBvcy5sZWZ0IC0gMTcwKSArICdweCc7XG4gICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMHB4JztcbiAgICBjb250YWluZXIuc3R5bGUuY29sb3IgPSAnYmxhY2snO1xuXG4gICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgIHRoaXMuZWxlbWVudCA9IGNvbnRhaW5lcjtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlT3ZlciAoKSB7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2UtaW4nKTtcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIG9uTW91c2VMZWF2ZSAoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWVzc2FnZS1pbicpO1xuICAgIH0sIDI1MCk7XG4gIH1cblxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBbeCA9IDBdIHtOdW1iZXJ9XG4gICAqIEBwYXJhbSBbeSA9IDBdIHtOdW1iZXJ9XG4gICAqL1xuICBjb25zdHJ1Y3RvciAoeCwgeSkge1xuICAgIHRoaXMueCA9IHggPyB4IDogMDtcbiAgICB0aGlzLnkgPSB5ID8geSA6IDA7XG4gIH1cblxuICBnZXQgbWFnbml0dWRlICgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgTWF0aC5wb3codGhpcy54LCAyKSArXG4gICAgICBNYXRoLnBvdyh0aGlzLnksIDIpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBvYmplY3RcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXMgKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiBWZWN0b3I7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge051bWJlcn1cbiAgICogQHJldHVybnMge1ZlY3Rvcn1cbiAgICovXG4gIGRvdCAoYSkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgdGhpcy54ICogYSxcbiAgICAgIHRoaXMueSAqIGFcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge1ZlY3RvcnxOdW1iZXJ9XG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XG4gICAqL1xuICBhZGQgKGEpIHtcbiAgICBpZiAoVmVjdG9yLmlzKGEpKSB7XG4gICAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgdGhpcy54ICsgYS54LFxuICAgICAgICB0aGlzLnkgKyBhLnlcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgIHRoaXMueCArIGEsXG4gICAgICAgIHRoaXMueSArIGFcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge1ZlY3Rvcn1cbiAgICogQHJldHVybnMge1ZlY3Rvcn1cbiAgICovXG4gIGRpZmYgKGEpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgIGEueCAtIHRoaXMueCxcbiAgICAgIGEueSAtIHRoaXMueVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGEge1ZlY3Rvcn1cbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGRpc3QgKGEpIHtcbiAgICBsZXQgZGlmZiA9IHRoaXMuZGlmZihhKTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgTWF0aC5wb3coZGlmZi54LCAyKSArXG4gICAgICBNYXRoLnBvdyhkaWZmLnksIDIpXG4gICAgKVxuICB9XG5cbn0iXSwic291cmNlUm9vdCI6IiJ9