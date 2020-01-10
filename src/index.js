import Planet from "./planet";
import Vector from "./vector";
import "./style.css"

window.addEventListener('load', onLoadHandler);
window.addEventListener('resize', adjustSize);
getById('G-number').addEventListener('input', rerender);
getById('speed-number').addEventListener('input', rerender);
getById('planets-number').addEventListener('input', rerender);
getById('show-path').addEventListener('input', rerender);

/**
 * TODO: generate planets on mouse click
 * TODO: show grid
 */

let ctx;
let canvas;
let animation;
let planets = [];

function adjustSize () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function onLoadHandler () {
  window.G = 0.002;
  window.S = 0.1;
  window.showPath = true;
  window.planets = 10;
  getById('G-number').value = window.G;
  getById('speed-number').value = window.S;
  getById('planets-number').value = window.planets;
  getById('show-path').checked = window.showPath;
  canvas = document.getElementById('sketch');
  adjustSize();
  ctx = canvas.getContext('2d');
  init();
  animation = requestAnimationFrame(simulate);
}

function rerender () {
  let planets = Number.parseFloat(getById('planets-number').value);
  if (!isNaN(planets)) {
    window.planets = planets;
    getById('planets-number').value = window.planets;
  }
  let G = Number.parseFloat(getById('G-number').value);
  if (!isNaN(G)) {
    window.G = G;
    getById('G-number').value = window.G;
  }
  let S = Number.parseFloat(getById('speed-number').value);
  if (!isNaN(S)) {
    window.S = S;
    getById('speed-number').value = window.S;
  }
  window.showPath = getById('show-path').checked;
  cancelAnimationFrame(animation);
  init();
  animation = requestAnimationFrame(simulate);
}

function init () {
  planets = [];
  for (let i = 0; i < window.planets; i++) {
    planets.push(new Planet(
      Math.random() * 10,
      new Vector(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      )
    ))
  }
}

function simulate () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < planets.length; i++) {
    let other = [...planets.slice(0, i - 1), ...planets.slice(i, planets.length)];
    planets[i].update(other);
    planets[i].draw(ctx);
  }
  requestAnimationFrame(simulate);
}

function getById (id) {
  return document.getElementById(id);
}