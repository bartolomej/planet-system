import Vector from "./vector";

export default class Planet {

  /**
   * @param [mass = 1] {Number}
   * @param [position] {Vector}
   * @param [velocity] {Vector}
   */
  constructor (mass, position, velocity) {
    this.mass = mass ? mass : 1;
    this.position = Vector.is(position) ? position : new Vector();
    this.velocity = Vector.is(velocity) ? velocity : new Vector();
  }

  update (planets) {
    for (let planet of planets) {
      this.velocity = this.velocity.add(this.getAcceleration(planet));
    }
    this.position = this.position.add(this.velocity);
  }

  getAcceleration (planet) {
    let f = this.getForce(planet);
    let diff = this.position.diff(planet.position);
    return diff.dot( f / this.mass);
  }

  getForce (planet) {
    return planet.mass * this.mass / Math.sqrt(this.position.dist(planet.position));
  }

}