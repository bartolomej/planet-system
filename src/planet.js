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
    this.path = [];
  }

  draw (ctx, showPath = true) {
    if (showPath) {
      ctx.beginPath();
      ctx.fillStyle = "#d9d9d9";
      for (let position of this.path) {
        ctx.moveTo(position.x , position.y);
        ctx.arc(position.x, position.y, 2, 0, 2 * Math.PI);
      }
      ctx.closePath();
      ctx.fill();
    }

    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.arc(this.position.x, this.position.y, this.mass, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  update (planets) {
    for (let planet of planets) {
      this.velocity = this.velocity.add(this.getAcceleration(planet));
    }
    this.position = this.position.add(this.velocity.dot(this.params.speedC));
    this.path.push(this.position);
    if (this.path.length > 100) {
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