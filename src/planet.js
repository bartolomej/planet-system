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
      ctx.fillStyle = this.color(0.6);
      for (let position of this.path) {
        ctx.moveTo(position.x , position.y);
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