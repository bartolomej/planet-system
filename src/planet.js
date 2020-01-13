import Vector from "./vector";

export default class Planet {

  /**
   * @param [params] {Object}
   * @param [mass = 1] {Number}
   * @param [position] {Vector}
   * @param [velocity] {Vector}
   */
  constructor (params, mass, position, velocity) {
    this.params = params;
    this.mass = mass ? mass : 1;
    this.position = Vector.is(position) ? position : new Vector();
    this.velocity = Vector.is(velocity) ? velocity : new Vector();
    this.acceleration = new Vector();
    this.c = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, x)`;
    this.path = [];
    this.tick = 0;
  }

  color (opacity) {
    return this.c.replace('x', opacity);
  }

  draw (ctx, showPath = true, showVVectors, showAVectors) {

    if (showPath) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(1, 1, 1, 0)";
      ctx.fillStyle = this.color(0.3);
      for (let position of this.path) {
        ctx.moveTo(position.x , position.y);
        ctx.arc(position.x, position.y, 2, 0, 2 * Math.PI);
      }
      ctx.closePath();
      ctx.fill();
    }

    if (showVVectors) {
      this._drawVector(ctx, "#FF0000",
        this.position.x,
        this.position.y,
        this.position.x + this.velocity.x,
        this.position.y + this.velocity.y
      );
    }
    if (showAVectors) {
      this._drawVector(ctx, "#0012ff",
        this.position.x,
        this.position.y,
        this.position.x + this.acceleration.x * 150,
        this.position.y + this.acceleration.y * 150
      );
    }

    ctx.beginPath();
    ctx.fillStyle = this.color(1);
    ctx.arc(this.position.x, this.position.y, this.mass, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    this.tick++;
  }

  _drawVector (ctx, color, x0, y0, x1, y1) {
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

  update (planets, speedC) {
    for (let planet of planets) {
      this.acceleration = this.getAcceleration(planet);
      this.velocity = this.velocity.add(this.acceleration);
    }
    this.position = this.position.add(this.velocity.dot(speedC));
    if (this.tick % 4 === 0) {
      this.path.push(this.position);
    }
    if (this.path.length > 150) {
      this.path.splice(0, 1)
    }
  }

  getAcceleration (planet) {
    let f = this.getForce(planet);
    let diff = this.position.diff(planet.position);
    return diff.dot( f / this.mass);
  }

  getForce (planet) {
    let G = this.params.gravityC ? this.params.gravityC : 1;
    return G * planet.mass * this.mass / Math.sqrt(this.position.dist(planet.position));
  }

}