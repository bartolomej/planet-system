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
    this.editMode = EDIT_MODES.MOVE;
    this._initViewElements();
    // translation state
    this.translate = { x: 0, y: 0 };
    // zoom state
    this.isZoomingIn = false;
    this.isZoomingOut = false;
    // mouse state
    this.mouseDown = false;
    this.lastDraw = { START: { x: 0, y: 0 }, END: { x: 0, y: 0} };
    this.lastMousePos = null;
    // canvas initialization
    this.canvas = document.getElementById('sketch');
    this.ctx = this.canvas.getContext('2d');
    this._resizeCanvas();
    // canvas mouse events
    addListener('sketch', 'mousedown', this._onMouseDown, this);
    addListener('sketch', 'mouseup', this._onMouseUp, this);
    // zoom out/in buttons events
    addListener('zoom-in', 'mousedown', this._setZoomIn, this);
    addListener('zoom-in', 'mouseup', this._setZoomIn, this);
    addListener('zoom-out', 'mousedown', this._setZoomOut, this);
    addListener('zoom-out', 'mouseup', this._setZoomOut, this);
    addListener('create-mode', 'click', this._onPlanetCreate, this);
    addListener('move-mode', 'click', this._onMoveMode, this);
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
    window.addEventListener('resize', this._resizeCanvas.bind(this));
  }

  _setZoomIn () {
    this.isZoomingIn = !this.isZoomingIn;
  }

  _setZoomOut () {
    this.isZoomingOut = !this.isZoomingOut;
  }

  _initViewElements () {
    let create = document.getElementById('create-mode');
    let move = document.getElementById('move-mode');

    if (create.classList.contains('selected')) {
      create.classList.remove('selected');
    }
    if (!move.classList.contains('selected')) {
      move.classList.add('selected')
    }
  }

  _onPlanetCreate () {
    invertSelection('create-mode');
    invertSelection('move-mode');
    document.getElementById('container').style.cursor = 'crosshair';
    this.editMode = EDIT_MODES.CREATE_PLANETS;
  }

  _onMoveMode () {
    invertSelection('create-mode');
    invertSelection('move-mode');
    document.getElementById('container').style.cursor = 'move';
    this.editMode = EDIT_MODES.MOVE;
  }

  _onMouseMove (e) {
    // skip if mouse not pressed
    if (!this.mouseDown) return;

    if (this.editMode === EDIT_MODES.CREATE_PLANETS) {
      this.lastDraw.END = {
        x: e.clientX,
        y: e.clientY
      };
    }
    // if mouse position unset
    if (!this.lastMousePos) {
      this.lastMousePos = {
        x: e.clientX,
        y: e.clientY
      }
    }
    // calculate mouse position diff
    if (this.editMode === EDIT_MODES.MOVE) {
      if (!this.lastMousePos) {
        this.lastMousePos = { x: e.clientX, y: e.clientY }
      }
      this.translate.x += (e.clientX - this.lastMousePos.x) * (1/this.scale);
      this.translate.y += (e.clientY - this.lastMousePos.y) * (1/this.scale);
      this.lastMousePos = { x: e.clientX, y: e.clientY }
    }
  }

  _onMouseDown (e) {
    this.mouseDown = true;
    if (this.editMode === EDIT_MODES.CREATE_PLANETS) {
      let mousePos = { x: e.clientX, y: e.clientY };
      this.lastDraw.START = mousePos;
      this.lastDraw.END = mousePos;
    }
  }

  _onMouseUp (e) {
    this.mouseDown = false;
    if (this.editMode === EDIT_MODES.CREATE_PLANETS) {
      this.planets.push(new Planet(
        this.params,
        Math.random() * 10,
        new Vector(
          this.lastDraw.START.x + (-this.translate.x),
          this.lastDraw.START.y + (-this.translate.y)
        ),
        new Vector(
          // scale down vector for better mouse drawing precision
          (this.lastDraw.END.x - this.lastDraw.START.x) / 4,
          (this.lastDraw.END.y - this.lastDraw.START.y) / 4
        ),
      ));
    }
    this.lastMousePos = null;
    this.lastDraw = { START: { x: 0, y: 0 }, END: { x: 0, y: 0} }
  }

  _resizeCanvas () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  destroy () {
    cancelAnimationFrame(this.animation);
  }

  start () {
    // randomly initialize planets based on planet count param
    for (let i = 0; i < this.params.planetsCount; i++) {
      this.planets.push(new Planet(
        this.params,
        Math.random() * 10,
        new Vector(
          Math.random() * this.canvas.width,
          Math.random() * this.canvas.height
        )
      ))
    }
    this.animation = requestAnimationFrame(this._simulate.bind(this));
  }

  _simulate () {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    this.ctx.transform(this.scale, 0, 0, this.scale, 0, 0);
    this.ctx.translate(this.translate.x, this.translate.y);

    for (let i = 0; i < this.planets.length; i++) {
      let other = [...this.planets.slice(0, i - 1), ...this.planets.slice(i, this.planets.length)];
      this.planets[i].update(other, this.params.speedC);
      this.planets[i].draw(this.ctx, this.params.showPath, this.params.showVelocityVectors, this.params.showAccVectors);
    }
    this.ctx.restore();

    // draw velocity vector
    this.ctx.moveTo(this.lastDraw.START.x, this.lastDraw.START.y);
    this.ctx.lineTo(this.lastDraw.END.x, this.lastDraw.END.y);
    this.ctx.stroke();

    console.log(this.scale);
    console.log(this.translate)
    if (this.isZoomingIn) {
      this.scale += 0.005;
    }
    if (this.isZoomingOut) {
      this.scale -= 0.005;
    }

    requestAnimationFrame(this._simulate.bind(this));
  }

}

function invertSelection (id) {
  let ele = document.getElementById(id);
  if (ele.classList.contains('selected')) {
    ele.classList.remove('selected');
  } else {
    ele.classList.add('selected');
  }
}

function addListener (id, event, func, bind) {
  document.getElementById(id).addEventListener(event, func.bind(bind));
}