import Planet from "./planet";
import Vector from "./vector";


test('Should sum two values', function () {
  const p1 = new Planet(3, new Vector(1,3));
  const p2 = new Planet(2, new Vector(2,2));
  const p3 = new Planet(1, new Vector(3,4));

  p1.update([p2, p3]);

  expect(p1.velocity.x).toBe(3.019273440460273);
  expect(p1.velocity.y).toBe(-1.013052525531007);
});