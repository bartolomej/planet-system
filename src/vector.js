export default class Vector {

  /**
   * @param [x = 0] {Number}
   * @param [y = 0] {Number}
   */
  constructor (x, y) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
  }

  get magnitude () {
    return Math.sqrt(
      Math.pow(this.x, 2) +
      Math.pow(this.y, 2)
    )
  }

  /**
   * @param object
   * @returns {boolean}
   */
  static is (object) {
    return object instanceof Vector;
  }

  /**
   * @param a {Number}
   * @returns {Vector}
   */
  dot (a) {
    return new Vector(
      this.x * a,
      this.y * a
    )
  }

  /**
   * @param a {Vector|Number}
   * @returns {Vector}
   */
  add (a) {
    if (Vector.is(a)) {
      return new Vector(
        this.x + a.x,
        this.y + a.y
      )
    } else {
      return new Vector(
        this.x + a,
        this.y + a
      )
    }
  }

  /**
   * @param a {Vector}
   * @returns {Vector}
   */
  diff (a) {
    return new Vector(
      a.x - this.x,
      a.y - this.y
    );
  }

  /**
   * @param a {Vector}
   * @returns {Number}
   */
  dist (a) {
    let diff = this.diff(a);
    return Math.sqrt(
      Math.pow(diff.x, 2) +
      Math.pow(diff.y, 2)
    )
  }

}