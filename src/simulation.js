import Planet from "./planet";
import Vector from "./vector";


export const EDIT_MODES = {
  MOVE: 1,
  CREATE_PLANETS: 2
};

export default class Simulation {

  constructor (params) {
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
    this._initViewElements();
    // translation state
    this.translate = { x: 0, y: 0 };
    // zoom state
    this.isZoomingIn = false;
    this.isZoomingOut = false;
    // mouse state
    this.mouseDown = false;
    this.lastDraw = { START: { x: 0, y: 0 }, END: { x: 0, y: 0 } };
    this.lastMousePos = null;
    // canvas initialization
    this.canvas = document.getElementById('sketch');
    this.ctx = this.canvas.getContext('2d');
    this._resizeCanvas();
    // canvas mouse events
    addListener('sketch', 'mousedown', this._onMouseDown, this);
    addListener('sketch', 'mouseup', this._onMouseUp, this);
    // zoom out/in buttons events
    addListener('zoom-in', 'mousedown', this._onZoomIn, this);
    addListener('zoom-in', 'mouseup', this._onZoomIn, this);
    addListener('zoom-out', 'mousedown', this._onZoomOut, this);
    addListener('zoom-out', 'mouseup', this._onZoomOut, this);
    addListener('create-mode', 'click', this._onPlanetCreate, this);
    addListener('move-mode', 'click', this._onMoveMode, this);
    addListener('show-path', 'click', this._onShowPath, this);
    addListener('show-v-vectors', 'click', this._onShowVVectors, this);
    addListener('show-a-vectors', 'click', this._onShowAVectors, this);
    // register info message listeners
    Info.register('Zoom in', 'zoom-in');
    Info.register('Zoom out', 'zoom-out');
    Info.register('Create planets', 'create-mode');
    Info.register('Move around', 'move-mode');
    Info.register('Show planet path', 'show-path');
    Info.register('Show velocity vectors', 'show-v-vectors');
    Info.register('Show acceleration vectors', 'show-a-vectors');
    // global mouse events
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
    window.addEventListener('resize', this._resizeCanvas.bind(this));
  }

  _onZoomIn () {
    this.isZoomingIn = !this.isZoomingIn;
  }

  _onZoomOut () {
    this.isZoomingOut = !this.isZoomingOut;
  }

  _onShowPath (e) {
    invertSelect('show-path', '#235bce');
    this.showPath = !this.showPath;
  }

  _onShowVVectors () {
    invertSelect('show-v-vectors', 'red');
    this.showVelocityVectors = !this.showVelocityVectors;
  }

  _onShowAVectors () {
    invertSelect('show-a-vectors', 'blue');
    this.showAccVectors = !this.showAccVectors;
  }

  _onPlanetCreate () {
    select('create-mode', '#235bce');
    unselect('move-mode');
    document.getElementById('container').style.cursor = 'crosshair';
    this.editMode = EDIT_MODES.CREATE_PLANETS;
  }

  _onMoveMode () {
    unselect('create-mode');
    select('move-mode', '#235bce');
    document.getElementById('container').style.cursor = 'grab';
    this.editMode = EDIT_MODES.MOVE;
  }

  _onMouseMove (e) {
    // skip if mouse not pressed
    if (!this.mouseDown) return;

    if (this.editMode === EDIT_MODES.CREATE_PLANETS) {
      this.lastDraw.END = { x: e.clientX, y: e.clientY };
    }
    // if mouse position unset
    if (!this.lastMousePos) {
      this.lastMousePos = { x: e.clientX, y: e.clientY }
    }
    // calculate mouse position diff
    if (this.editMode === EDIT_MODES.MOVE) {
      if (!this.lastMousePos) {
        this.lastMousePos = { x: e.clientX, y: e.clientY }
      }
      this.translate.x += (e.clientX - this.lastMousePos.x) * 2 / this._getScaleX();
      this.translate.y += (e.clientY - this.lastMousePos.y) * 2 / this._getScaleY();
      this.lastMousePos = { x: e.clientX, y: e.clientY };
    }
  }

  _onMouseDown (e) {
    this.mouseDown = true;
    if (this.editMode === EDIT_MODES.CREATE_PLANETS) {
      let mousePos = { x: e.clientX, y: e.clientY };
      this.lastDraw.START = mousePos;
      this.lastDraw.END = mousePos;
    } else if (this.editMode === EDIT_MODES.MOVE) {
      document.getElementById('container').style.cursor = 'grabbing';
    }
  }

  _onMouseUp (e) {
    this.mouseDown = false;
    if (this.editMode === EDIT_MODES.CREATE_PLANETS) {
      this.planets.push(new Planet(
        this.params,
        Math.random() * 10 + 5,
        new Vector(
          ((this.lastDraw.START.x - (this.canvas.width / 2)) / this._getScaleX()) + (-this.translate.x),
          ((this.lastDraw.START.y - (this.canvas.height / 2)) / this._getScaleY()) + (-this.translate.y)
        ),
        new Vector(
          // scale down vector for better mouse drawing precision
          (this.lastDraw.END.x - this.lastDraw.START.x) / 3,
          (this.lastDraw.END.y - this.lastDraw.START.y) / 3
        ),
      ));
    } else if (this.editMode === EDIT_MODES.MOVE) {
      document.getElementById('container').style.cursor = 'grab';
    }
    this.lastMousePos = null;
    this.lastDraw = { START: { x: 0, y: 0 }, END: { x: 0, y: 0 } }
  }

  _initViewElements () {
    select('move-mode', '#235bce');
    select('show-path', '#235bce');
    select('show-v-vectors', 'red');

    document.getElementById('container').style.cursor = 'grab';
  }

  _resizeCanvas () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _getScaleX () {
    return (this.canvas.width / this.spanX) * this.scale;
  }

  _getScaleY () {
    return this._getScaleX();
  }

  _calculateMassCenter () {
    let avg = { x: 0, y: 0 };
    for (let i = 0; i < this.planets.length; i++) {
      avg.x += this.planets[i].position.x;
      avg.y += this.planets[i].position.y;
    }
    avg.x = avg.x / this.planets.length;
    avg.y = avg.y / this.planets.length;
    return avg;
  }

  destroy () {
    cancelAnimationFrame(this.animation);
  }

  start () {
    // randomly initialize planets based on planet count param
    for (let i = 0; i < this.params.planetsCount; i++) {
      this.planets.push(new Planet(
        this.params,
        Math.random() * 10 + 3,
        new Vector(
          (Math.random() - 0.5) * this.spanX / 3,
          (Math.random() - 0.5) * this.spanX / 3
        )
      ))
    }
    this.animation = requestAnimationFrame(this._simulate.bind(this));
  }

  _simulate () {
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

    this._drawVelocityVector(
      this.lastDraw.START.x,
      this.lastDraw.START.y,
      this.lastDraw.END.x,
      this.lastDraw.END.y
    );

    if (this.isZoomingIn) this.scale += 0.005;
    if (this.isZoomingOut && this.scale > 0) this.scale -= 0.005;

    requestAnimationFrame(this._simulate.bind(this));
  }

  _drawVelocityVector (x0, y0, x1, y1) {
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

function invertSelect (id, color) {
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

function unselect (id) {
  let ele = document.getElementById(id);
  let svg = getSvgChild(ele);
  if (svg.style.fill !== '') {
    svg.style.fill = '';
  }
  if (ele.classList.contains('selected')) {
    ele.classList.remove('selected');
  }
}

function select (id, color) {
  let ele = document.getElementById(id);
  let svg = getSvgChild(ele);
  if (svg.style.fill === '') {
    svg.style.fill = color;
  }
  if (!ele.classList.contains('selected')) {
    ele.classList.add('selected');
  }
}

function getSvgChild (object) {
  let children = object.childNodes[0].contentDocument.children;
  for (let child of children) {
    if (child.tagName === 'svg') return child;
  }
}

function addListener (id, event, func, bind) {
  document.getElementById(id).addEventListener(event, func.bind(bind));
}

class Info {

  constructor (message, target) {
    this.message = message;
    this.target = target;
    this.element = null;
    this.target.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    this.target.addEventListener('mouseover', this.onMouseOver.bind(this));
    this.createElement();
  }

  static register (message, id) {
    let ele = document.getElementById(id);
    return new Info(message, ele);
  }

  createElement () {
    let pos = this.target.getBoundingClientRect();
    const container = document.createElement('div');

    container.classList.add('message');
    container.innerText = this.message;

    container.style.zIndex = '-1';
    container.style.position = 'absolute';
    container.style.top = (pos.top + 10) + 'px';
    container.style.left = (pos.left - 170) + 'px';
    container.style.width = '100px';
    container.style.color = 'black';

    if (!this.element) {
      document.body.appendChild(container);
      this.element = container;
    }
  }

  onMouseOver () {
    this.element.classList.add('message-in');
  }

  destroy () {
    document.body.removeChild(this.element);
  }

  onMouseLeave () {
    setTimeout(() => {
      this.element.classList.remove('message-in');
    }, 250);
  }

}