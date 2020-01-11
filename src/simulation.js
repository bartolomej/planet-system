import Planet from "./planet";
import Vector from "./vector";


export default class Simulation {

  constructor (params) {
    this.animation = null;
    this.planets = [];
    this.params = params;
    this.coordinateSpan = 1;
    // speed vector draw
    this.enableDraw = false;
    this.mouseDown = false;
    this.lastDraw = this._startLastDraw();
    // canvas initialization
    this.canvas = document.getElementById('sketch');
    this.ctx = this.canvas.getContext('2d');
    this._resizeCanvas();
    // canvas mouse events
    addListener('sketch', 'mousedown', this._onMouseDown, this);
    addListener('sketch', 'mouseup', this._onMouseUp, this);
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
    window.addEventListener('resize', this._resizeCanvas.bind(this));

  }

  _onMouseMove (e) {
    if (this.mouseDown && this.enableDraw) {
      this.lastDraw.END = {
        x: e.clientX,
        y: e.clientY
      }
    }
  }

  _onMouseDown (e) {
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

  _onMouseUp (e) {
    this.mouseDown = false;
    if (this.enableDraw) {
      this.planets.push(new Planet(
        this.params,
        Math.random() * 10,
        new Vector(
          this.lastDraw.START.x,
          this.lastDraw.START.y
        ),
        new Vector(
          // scale down vector for better mouse drawing precision
          (this.lastDraw.END.x - this.lastDraw.START.x) / 4,
          (this.lastDraw.END.y - this.lastDraw.START.y) / 4
        ),
      ));
    }
    this.lastDraw = this._startLastDraw();
  }

  _startLastDraw () {
    return {
      START: { x: 0, y: 0 },
      END: { x: 0, y: 0}
    }
  }

  _resizeCanvas () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  destroy () {
    cancelAnimationFrame(this.animation);
  }

  start () {
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
    this.enableDraw = true;
    this.animation = requestAnimationFrame(this._simulate.bind(this));
  }

  _simulate () {
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

function addListener (id, event, func, bind) {
  document.getElementById(id).addEventListener(event, func.bind(bind));
}